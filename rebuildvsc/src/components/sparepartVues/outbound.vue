<template>
    <div id="app">
        <el-container>
            <el-container>
                <el-container width="100%">

                    <el-container width="80%">
                        <el-main>

                            <!-- 表单 -->
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="pageData" width='100%'>
                                <el-table-column prop="sparepart__name" label="备件名称" align="center" min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="sparepart__type" label="备件型号" align="center" min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="sparepart__brand" label="品牌" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="sparepart__unit" label="单位" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="sparepart__area__name" label="区域" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="sparepart__location" label="位置" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="sparepart__comment" label="备注" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_quantity" label="领用数量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_date" label="领用时间" align="center" min-width='15%'>
                                </el-table-column>
                                <el-table-column prop="apply_userName__name" label="领用人" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column label="操作" size="mini" align="center" min-width='15%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-finished" size="mini"
                                            @click="approveBtn(scope.$index)" v-preventReClick="1000">
                                            批准
                                        </el-button>
                                        <el-button type="primary" icon="el-icon-delete" size="mini"
                                            @click="deleteBtn(scope.$index)" v-preventReClick="1000">
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
                    { required: true, message: '备件名称不能为空！', trigger: 'blur' }
                ],
                sparepart__type: [
                    { required: true, message: '备件型号不能为空！', trigger: 'blur' }
                ],
                sparepart__unit: [
                    { required: true, message: '备件单位不能为空！', trigger: 'blur' }
                ],
                quantity: [
                    { required: true, message: '备件库存数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '备件库存数量必须为整数' }
                ],
                safety_quantity: [
                    { required: true, message: '备件安全量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '备件安全量必须为整数' }
                ],
                applyQuatity: [
                    { required: true, message: '领用数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '领用数量必须为整数' }
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
        //获取所有备件申请记录
        getAllSparepartStorage(workshop_id) {
            let that = this
            console.log(workshop_id)
            this.$api.sparepartAPI.queryOutboundSparepartApply({ workshop: workshop_id })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('获取备件出库申请成功！')
                        that.tableData = res.data.data
                        console.log(that.tableData)
                        //获取返回记录的总行数
                        that.dataTotalLength = res.data.data.length
                        //获取当前页的数据
                        that.getPagesSparepartStorage()
                        // that.allSparepartName = res.data.data.map(item => {
                        //     return {
                        //         value: item.sparepart__name
                        //     };
                        // });
                        // that.allSparepartName = res.data.data.map(item => item.sparepart__name)
                        // console.log(that.allSparepartName)
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
        //批准按钮
        approveBtn(index) {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 8).then(
                res => {
                    if (res) {
                        this.$api.sparepartAPI.approveOutbound({ approveOutbound: that.pageData[index], userNameId: JSON.parse(sessionStorage.getItem('userInfo')).key.id })
                            .then(function (res) {
                                if (res.data.code == 1) {
                                    that.getAllSparepartStorage(that.workshop)
                                    that.$message.success('获取备件出库批准成功！')

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
        },
        //删除按钮
        deleteBtn(index) {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 8).then(
                res => {
                    if (res) {
                        this.$api.sparepartAPI.deleteApply({ approveOutbound: that.pageData[index] })
                            .then(function (res) {
                                if (res.data.code == 1) {
                                    that.getAllSparepartStorage(that.workshop)
                                    that.$message.success('删除备件出库申请成功！')
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
