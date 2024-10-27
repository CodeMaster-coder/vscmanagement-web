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
                                            <el-select v-model="toolName" filterable placeholder="请选择工具名称">
                                                <el-option v-for="(value, index) in allToolName" :key="index"
                                                    :value="value">
                                                </el-option>
                                                <el-option>
                                                </el-option>
                                            </el-select>
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
                                            <el-button type="primary" size="mini" 
                                            @click="exportToExcel()">导出Excel</el-button>

                                        </el-button-group>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="pageData" width='100%'>
                                <el-table-column prop="tool__name" label="工具名称" align="center" min-width='25%'>
                                </el-table-column>
                                <el-table-column prop="tool__type" label="工具型号" align="center" min-width='25%'>
                                </el-table-column>
                                <el-table-column prop="tool__unit" label="单位" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="quantity" label="库存数量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="safety_quantity" label="安全量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column label="操作" size="mini" align="center" min-width='18%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-s-finance" size="mini"
                                            @click="applyBtn(scope.row)">
                                            领用
                                        </el-button>
                                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                            @click="editBtn(scope.row)">
                                            编辑
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
                            <!-- 领用弹出框 -->
                            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%"
                                @close="cancelDialog()">
                                <el-form :model="singleTool" :rules="rules" ref="dialogForm">
                                    <el-form-item label="工具名称：" :label-width="formLabelWidth" prop="tool__name">
                                        <el-input :disabled="isEdit" v-model="singleTool.tool__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="工具型号：" :label-width="formLabelWidth" prop="tool__type">
                                        <el-input :disabled="isEdit" v-model="singleTool.tool__type"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="库存单位：" :label-width="formLabelWidth" prop="tool__unit">
                                        <el-input :disabled="isEdit" v-model="singleTool.tool__unit"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="库存数量：" :label-width="formLabelWidth" prop="quantity">
                                        <el-input :disabled="isEdit" v-model.number="singleTool.quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="安全量：" :label-width="formLabelWidth" prop="safety_quantity">
                                        <el-input :disabled="isEdit" v-model.number="singleTool.safety_quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="领用数量：" :label-width="formLabelWidth" v-if="isEdit"
                                        prop="applyQuatity">
                                        <el-input v-model.number="singleTool.applyQuatity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="cancelDialog()">取 消</el-button>
                                    <el-button type="primary" @click="submitDialog()" v-preventReClick="1000">确
                                        定</el-button>
                                </div>
                            </el-dialog>
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
            that.$exportToExcel(that.tableData,'工具库存.xlsx')
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
            this.$api.toolAPI.getAllToolStorage({ workshop: workshop_id })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('获取工具库存成功！')
                        that.tableData = res.data.data
                        // console.log(that.tableData)
                        //获取返回记录的总行数
                        that.dataTotalLength = res.data.data.length
                        //获取当前页的数据
                        that.getPagesToolStorage()
                        // that.allToolName = res.data.data.map(item => {
                        //     return {
                        //         value: item.tool__name
                        //     };
                        // });
                        that.allToolName = res.data.data.map(item => item.tool__name)
                        // console.log(that.allToolName)
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
        //获取单个工具库存
        querySingleStorage() {
            let that = this
            console.log(that.toolName)
            this.$api.toolAPI.querySingleStorage({ tool__name: that.toolName, workshop: that.workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success('获取工具库存成功！')
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
        //展示全部库存按钮实现
        getAllData() {
            this.toolName = null
            this.getAllToolStorage(this.workshop)
        },
        //领用申请按钮
        applyBtn(row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "领用申请"
            this.isEdit = true
            this.singleTool = JSON.parse(JSON.stringify(row));

            this.applyRow = row
        },
        //清空弹出框内容
        cleanDialog() {
            let that = this
            that.$refs.dialogForm.resetFields();
            Object.keys(that.singleTool).forEach(key => {
                that.singleTool[key] = null; // 或者使用 undefined
            });

            that.applyRow = {}
            this.dialogFormVisible = false
        },
        //编辑老工具
        editBtn(row) {
            let that = this
            this.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 5).then(
                res => {
                    if (res) {
                        that.dialogFormVisible = true;
                        that.dialogTitle = "编辑工具"
                        that.isEdit = false
                        that.singleTool = JSON.parse(JSON.stringify(row));

                        that.applyRow = row
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
        //弹出框取消按钮
        cancelDialog() {

            this.cleanDialog()
        },
        //弹出框确定按钮
        submitDialog() {
            console.log(this.applyRow)
            let that = this
            that.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    if (that.isEdit) {
                        this.$api.toolAPI.addOutboundApply({ tool: that.applyRow.tool__id, apply_userName: JSON.parse(sessionStorage.getItem('userInfo')).key.id, apply_quantity: that.singleTool.applyQuatity, workshop: that.workshop })
                            .then(function (res) {
                                console.log(res)
                                if (res.data.code == 1) {
                                    that.$message.success('领用申请提交成功！')
                                    that.getAllToolStorage(that.workshop)
                                    that.cancelDialog()
                                } else {
                                    that.$message.error(res.data.msg)
                                }

                            }
                            ).catch(function (err) {
                                console.log(err)
                            })
                    } else {
                        this.$api.toolAPI.editTool({ singleTool: that.singleTool, workshop: JSON.parse(sessionStorage.getItem('userInfo')).key.workshop, username__id: JSON.parse(sessionStorage.getItem('userInfo')).key.id })
                            .then(function (res) {
                                if (res.data.code == 1) {
                                    that.$message.success(res.data.msg)
                                    that.getAllToolStorage(that.workshop)
                                    that.cancelDialog()
                                } else {
                                    that.$message.error(res.data.msg)
                                }
                            })
                            .catch(function (err) {
                                console.log(err)
                            })
                    }
                }

            });
        },
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
