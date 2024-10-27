<template>
    <div id="app">
        <el-container>
            <el-container>
                <el-container width="100%">

                    <el-container width="80%">
                        <el-main>

                            <!-- 表单 -->
                            <el-row style="margin-top: 10px; text-align: right;">
                                <el-button type="primary" icon="el-icon-document" 
                                size="mini" @click="exportToExcel()">
                                    导出excel
                                </el-button>
                            </el-row>
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="pageData" width='100%'
                                style="margin-top: 10px;">
                                <el-table-column prop="apply_record__equipment__name" label="设备名称" align="center"
                                    min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__equipment__type" label="设备型号" align="center"
                                    min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__equipment__unit" label="单位" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__equipment__single_weight" label="单个重量(吨)"
                                    align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__apply_quantity" label="出库数量" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__apply_userName__name" label="申请人" align="center"
                                    min-width='10%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__apply_date" label="申请时间" align="center"
                                    min-width='13%'>
                                </el-table-column>
                                <el-table-column prop="approve_username__name" label="审批人" align="center"
                                    min-width='10%'>
                                </el-table-column>
                                <el-table-column prop="approve_date" label="审批时间" align="center" min-width='13%'>
                                </el-table-column>
                                <el-table-column label="操作" size="mini" align="center" min-width='9%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-delete" size="mini"
                                            @click="deleteBtn(scope.$index)">
                                            删除
                                        </el-button>
                                    </template>

                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-row style="margin-top: 10px;">
                                <el-col :span="24" style="text-align: right;">
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                        :current-page="currentPage" :page-sizes="[15, 30, 60, 120]" :page-size="10"
                                        layout="total, sizes, prev, pager, next, jumper" :total="dataTotalLength">
                                    </el-pagination>
                                </el-col>
                            </el-row>
                        </el-main>
                    </el-container>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {

            msg: 'hello, vue',
            tableData: [],
            pageData: [],  //分页后当前页信息 
            baseURL: "http://192.168.242.130/",
            currentPage: 1,
            pageSize: 15,
            dataTotalLength: 0,  //返回记录的总行数
            workshop__id: 1,
            sparepartName: null,
            allSparepartName: [],
            dialogFormVisible: false,
            dialogTitle: null,//弹出框标题
            isEdit: false,
            singleSparepart: {
                sparepart__name: null,
                sparepart__type: null,
                sparepart__unit: null,
                quantity: null,
                safety_quantity: null,
                applyQuatity: null
            },
            rules: {
                sparepart__name: [
                    { required: true, message: '设备名称不能为空！', trigger: 'blur' }
                ],
                sparepart__type: [
                    { required: true, message: '设备型号不能为空！', trigger: 'blur' }
                ],
                sparepart__unit: [
                    { required: true, message: '设备单位不能为空！', trigger: 'blur' }
                ],
                quantity: [
                    { required: true, message: '设备库存数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '设备库存数量必须为整数' }
                ],
                safety_quantity: [
                    { required: true, message: '设备安全量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '设备安全量必须为整数' }
                ],
                applyQuatity: [
                    { required: true, message: '领用数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '领用数量必须为整数' },
                    {
                        validator: (rules, value, callback) => {
                            if (value > this.singleSparepart.quantity) {
                                callback(new Error('领用数量不能大于库存数量！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }

                ],
            },
            formLabelWidth: '120px',
            value: '',
            userInfo: {},
            applyRow: {}

        }
    },
    mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllSparepartStorage(this.workshop)
    },
    methods: {
        exportToExcel(){
            let that=this
            that.$exportToExcel(that.tableData,'二层平台出库记录.xlsx')
        },
        //修改每页的分页行数
        handleSizeChange(size) {
            //修改当前每页分页行数
            this.pageSize = size
            //数据重新加载
            this.getPagesSparepartStorage()
        },
        //调整当前页码
        handleCurrentChange(pageNumber) {
            //修改当前页码
            this.currentPage = pageNumber
            //数据重新加载
            this.getPagesSparepartStorage()
        },
        //获取所有设备库存
        getAllSparepartStorage(workshop_id) {
            let that = this
            console.log(workshop_id)
            this.$api.secondFloorAPI.getAllOutboundApprove({ workshop: workshop_id })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('获取设备出库记录成功！')
                        that.tableData = res.data.data
                        console.log(that.tableData)
                        //获取返回记录的总行数
                        that.dataTotalLength = res.data.data.length
                        //获取当前页的数据
                        that.getPagesSparepartStorage()

                    } else {
                        that.$message.error(res.data.msg)
                    }

                }

                )
                .catch(function (err) {
                    console.log(err)
                }

                )
        },
        //获取分页库存
        getPagesSparepartStorage() {
            //清空当前页数据
            this.pageData = []
            //获取当前页数据
            for (let i = (this.currentPage - 1) * this.pageSize; i < this.dataTotalLength; i++) {
                // 遍历数据添加到pageData中
                this.pageData.push(this.tableData[i])
                // 判断是否达到一页的要求
                if (this.pageData.length == this.pageSize) break;
            }
        },
        //展示全部库存按钮实现
        getAllData() {
            this.sparepartName = null
            this.getAllSparepartStorage(this.workshop)
        },
        //删除出库记录
        deleteBtn(index) {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 2).then(
                res => {
                    if (res) {
                        this.$api.secondFloorAPI.deleteOutboundRecord({ singleOutbound: that.pageData[index] })
                            .then(function (res) {
                                if (res.data.code == 1) {
                                    that.$message.success('删除设备出库记录成功！')
                                    that.getAllSparepartStorage(that.workshop)

                                } else {
                                    that.$message.error(res.data.msg)
                                }
                            })
                            .catch(function (err) {
                                console.log(err)
                            }

                            )
                    } else {
                        that.$message.error('您没有权限！！！')
                    }
                }
            ).catch(
                function (err) {
                    console.log(err)
                }
            )
        }
    }


}

</script>

<style lang="less" scoped>
.el-container {
    margin: 0px;
    padding: 0px;
    height: 100%;
    /* font-family: 'Times New Roman', Times, serif; */
}

.el-header {
    background-color: #ffffff;
    color: #121313;
    /* text-align: center; */
    line-height: 100px;
    font-size: 40px;
    border-bottom: 1px solid #dcdfe6;
    font-weight: 600;
    /* font-family: 'Times New Roman', Times, serif; */
}

.el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 20px;
    border-top: 1px solid #dcdfe6;
    font-size: 10px;
}

.el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: left;
    line-height: 200px;
    border-right: 1px solid #dcdfe6;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    width: 100%;
    /* text-align: center; */
    /* line-height: 160px; */
}
</style>
