<template>
    <div id="app">
        <el-container>
            <el-container>
                <el-container width="100%">

                    <el-container width="80%">
                        <el-main>

                            <!-- 表单 -->
                            <el-form :inline="true" style="margin-top: 20px; align-items: center;">
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item size="mini" label="请输入查询条件:">
                                            <el-input v-model="personName" placeholder="请输入归属人"
                                            autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button-group size="mini">
                                            <el-button type="primary" icon="el-icon-search" size="mini"
                                                @click="querySingleStorage()">查询</el-button>
                                            <el-button type="primary" icon="el-icon-document" size="mini"
                                                @click="getAllData()">全部</el-button>
                                        </el-button-group>
                                    </el-col>

                                    <el-col :span="6" size="mini">
                                        <el-button-group size="mini">
                                            <el-button type="primary" size="mini" @click="exportToExcel()">导出Excel</el-button>
                                          
                                        </el-button-group>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="pageData" width='100%'
                                style="margin-top: 10px;">
                                <el-table-column prop="approve_record__apply_record__tool__name" label="工具名称" align="center" 
                                min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="approve_record__apply_record__tool__type" label="工具型号" align="center" 
                                min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="approve_record__apply_record__tool__unit" label="单位" align="center" 
                                min-width='8%'>
                                </el-table-column>
                                <el-table-column prop="lost_quantity" label="丢失数量" align="center" 
                                min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="approve_record__apply_record__apply_userName__name" label="归属人" align="center"
                                    min-width='10%'>
                                </el-table-column>
                                <el-table-column prop="approve_record__approve_date" label="出库时间" align="center"
                                    min-width='13%'>
                                </el-table-column>
                                <el-table-column prop="lost_date" label="丢失时间" align="center"
                                    min-width='13%'>
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
            personName:null,
            msg: 'hello, vue',
            tableData: [],
            pageData: [],  //分页后当前页信息 
            baseURL: "http://192.168.242.130/",
            currentPage: 1,
            pageSize: 15,
            dataTotalLength: 0,  //返回记录的总行数
            workshop__id: 1,
            toolName: null,
            allToolName: [],
            dialogFormVisible: false,
            dialogTitle: null,//弹出框标题
            isEdit: false,
            singleTool: {
                tool__name: null,
                tool__type: null,
                tool__unit: null,
                quantity: null,
                safety_quantity: null,
                applyQuatity: null
            },
            rules: {
                tool__name: [
                    { required: true, message: '工具名称不能为空！', trigger: 'blur' }
                ],
                tool__type: [
                    { required: true, message: '工具型号不能为空！', trigger: 'blur' }
                ],
                tool__unit: [
                    { required: true, message: '工具单位不能为空！', trigger: 'blur' }
                ],
                quantity: [
                    { required: true, message: '工具库存数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '工具库存数量必须为整数' }
                ],
                safety_quantity: [
                    { required: true, message: '工具安全量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '工具安全量必须为整数' }
                ],
                applyQuatity: [
                    { required: true, message: '领用数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '领用数量必须为整数' },
                    {
                        validator: (rules, value, callback) => {
                            if (value > this.singleTool.quantity) {
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
        this.getAllToolStorage(this.workshop)
    },
    methods: {
        exportToExcel(){
            let that=this
            that.$exportToExcel(that.tableData,'工具丢失记录.xlsx')
        },
        //修改每页的分页行数
        handleSizeChange(size) {
            //修改当前每页分页行数
            this.pageSize = size
            //数据重新加载
            this.getPagesToolStorage()
        },
        //调整当前页码
        handleCurrentChange(pageNumber) {
            //修改当前页码
            this.currentPage = pageNumber
            //数据重新加载
            this.getPagesToolStorage()
        },
        //获取所有工具库存
        getAllToolStorage(workshop_id) {
            let that = this
            console.log(workshop_id)
            this.$api.toolAPI.getLostRecord({ workshopId: workshop_id })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('获取丢失记录成功！')
                        that.tableData = res.data.data
                        console.log(that.tableData)
                        //获取返回记录的总行数
                        that.dataTotalLength = res.data.data.length
                        //获取当前页的数据
                        that.getPagesToolStorage()

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
        getPagesToolStorage() {
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
            this.toolName = null
            this.getAllToolStorage(this.workshop)
        },
        //获取个人工具丢失记录
        querySingleStorage() {
            let that = this
            console.log(that.toolName)
            this.$api.toolAPI.getPersonLostRecord({ personName: that.personName, workshopId: that.workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success('获取个人工具丢失记录成功！')
                            that.tableData = res.data.data
                            //获取返回记录的总行数
                            that.dataTotalLength = res.data.data.length
                            //获取当前页的数据
                            that.handleCurrentChange(1)
                        } else {
                            that.$message.error(res.data.msg)
                        }
                    }
                )
                .catch(
                    function (err) {
                        console.log(err)
                    }
                )
        },
        //删除入库记录
        deleteBtn(index) {
            let that = this
            this.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 5).then(
                res => {
                    if (res) {
            this.$api.toolAPI.deleteLostRecord({ lostTool: that.pageData[index] })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('删除工具丢失记录成功！')
                        that.getAllToolStorage(that.workshop)

                    } else {
                        that.$message.error(res.data.msg)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                }

                )} else {
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
