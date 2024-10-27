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
                                        <el-form-item size="mini" :label="$t('messages.storage.inputQueryContent')">
                                            <el-select v-model="userName" filterable placeholder="请选择用户名">
                                                <el-option v-for="item in tableData" :key="item.id" :label="item.name"
                                                    :value="item.name">
                                                </el-option>
                                                <el-option>
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button-group size="mini">
                                            <el-button type="primary" icon="el-icon-search" size="mini"
                                                @click="querySingleUser()">{{ $t('messages.storage.query')
                                                }}</el-button>
                                            <el-button type="primary" icon="el-icon-document" size="mini"
                                                @click="getAllData()">{{ $t('messages.storage.all') }}</el-button>
                                        </el-button-group>
                                    </el-col>

                                    <el-col :span="6" size="mini">
                                        <el-button-group size="mini">
                                            <el-button type="primary" size="mini">{{ $t('messages.storage.exprotExcel')
                                                }}</el-button>

                                        </el-button-group>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="pageData" width='100%'>
                                <el-table-column prop="name" label="姓名" align="center" min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="workshop__name" label="部门" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="email" label="邮箱" align="center" min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="auth__comment" label="权限" align="center" min-width='15%'>
                                </el-table-column>
                                <el-table-column :label="$t('messages.storage.edit')" size="mini" align="center"
                                    min-width='18%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                            @click="applyBtn(scope.row)">
                                            编辑
                                        </el-button>
                                        <el-button type="primary" icon="el-icon-delete" size="mini"
                                            @click="editBtn(scope.row)">
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
                            <!-- 领用弹出框 -->
                            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%"
                                @close="cancelDialog()">
                                <el-form :model="singleMaterial" :rules="rules" ref="dialogForm">
                                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                                        <el-input :disabled="isEdit" v-model="singleMaterial.name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="部门" :label-width="formLabelWidth" prop="workshop__id">
                                        <el-select v-model="singleMaterial.workshop__id" placeholder="请选择部门">
                                            <el-option v-for="item in workshopOptions" :key="item.name"
                                                :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                                        <el-input :disabled="isEdit" v-model="singleMaterial.email"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="权限" :label-width="formLabelWidth" prop="auth__id">
                                        <el-select v-model="singleMaterial.auth__id" placeholder="请选择权限">
                                            <el-option v-for="item in authOptions" :key="item.code"
                                                :label="item.comment" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="cancelDialog()">{{ $t('messages.storage.cancel') }}</el-button>
                                    <el-button type="primary" @click="submitDialog()" v-preventReClick="1000">{{
                                        $t('messages.storage.submit')
                                        }}</el-button>
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
            userName: null,
            allMaterialName: [],
            dialogFormVisible: false,
            dialogTitle: null,//弹出框标题
            isEdit: true,
            singleMaterial: {
                name: null,
                workshop__id: null,
                email: null,
                auth__id: null,
            },
            rules: {
                name: [
                    { required: true, message: '用户姓名不能为空', trigger: 'blur' }
                ],
                workshop__id: [
                    {
                        required: true,
                        validator: (rules, value, callback) => {
                            if (!this.singleMaterial.workshop__id) {
                                callback(new Error('请选择部门！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
                email: [
                    { required: true, message: '用户邮箱不能为空', trigger: 'blur' }
                ],
                auth__id: [
                    {
                        required: true,
                        validator: (rules, value, callback) => {
                            if (!this.singleMaterial.auth__id) {
                                callback(new Error('请选择权限！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
            },
            formLabelWidth: '180px',
            value: '',
            userInfo: {},
            applyRow: {},
            workshopOptions: [],
            authOptions: []

        }
    },
    async mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllUserInfo()
        this.getAllWorkshop()
        this.getAllAuth()
    },
    methods: {
        //获取所有部门
        getAllWorkshop() {
            let that = this
            that.$api.userAPI.getAllWorkshop()
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success('获取部门信息成功')
                            that.workshopOptions = res.data.data
                            console.log(that.workshopOptions)
                        }
                        else {
                            that.$message.error(res.data.msg)
                        }
                    }
                )
                .catch(function (err) {
                    console.log(err)
                }

                )
        },
        //获取所有权限
        getAllAuth() {
            let that = this
            that.$api.userAPI.getAllAuth()
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success('获取权限信息成功')
                            that.authOptions = res.data.data
                            console.log(that.authOptions)
                        }
                        else {
                            that.$message.error(res.data.msg)
                        }
                    }
                )
                .catch(function (err) {
                    console.log(err)
                }

                )
        },
        //修改每页的分页行数
        handleSizeChange(size) {
            //修改当前每页分页行数
            this.pageSize = size
            //数据重新加载
            this.getPagesMaterialStorage()
        },
        //调整当前页码
        handleCurrentChange(pageNumber) {
            //修改当前页码
            this.currentPage = pageNumber
            //数据重新加载
            this.getPagesMaterialStorage()
        },
        //获取所有用户信息
        getAllUserInfo() {
            let that = this
            this.$api.userAPI.getAllUser()
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success(that.$t('messages.storage.getStorageSuccess'))
                        that.tableData = res.data.data
                        console.log(that.tableData)
                        //获取返回记录的总行数
                        that.dataTotalLength = res.data.data.length
                        //获取当前页的数据
                        that.getPagesMaterialStorage()

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
        getPagesMaterialStorage() {
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
        //获取单个用户信息
        querySingleUser() {
            let that = this
            console.log(that.userName)
            this.$api.userAPI.getSingleUser({ userName: that.userName })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success(that.$t('messages.storage.getStorageSuccess'))
                            that.tableData = res.data.data
                            console.log(res.data.data)
                            //获取返回记录的总行数
                            that.dataTotalLength = res.data.data.length
                            //获取当前页的数据
                            that.getPagesMaterialStorage()
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
            this.userName = null
            this.getAllUserInfo()
        },

        //领用申请按钮
        applyBtn(row) {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 9).then(
                res => {
                    if (res) {
                        that.dialogFormVisible = true;
                        that.dialogTitle = '编辑用户'
                        that.isEdit = false
                        that.singleMaterial = JSON.parse(JSON.stringify(row));

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
        //清空弹出框内容
        cleanDialog() {
            let that = this
            that.$refs.dialogForm.resetFields();
            Object.keys(that.singleMaterial).forEach(key => {
                that.singleMaterial[key] = null; // 或者使用 undefined
            });

            that.applyRow = {}
            this.dialogFormVisible = false
        },
        //添加新耗材
        editBtn(row) {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 9).then(
                res => {
                    if (res) {
                        this.$api.userAPI.deleteUser({ singleMaterial: JSON.parse(JSON.stringify(row)) })
                            .then(function (res) {
                                console.log(res)
                                if (res.data.code == 1) {
                                    that.$message.success('用户信息删除成功！')
                                    that.getAllUserInfo()
                                    that.cancelDialog()
                                } else {
                                    that.$message.error(res.data.msg)
                                }

                            }
                            ).catch(function (err) {
                                console.log(err)
                            })
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
                    if (!that.isEdit) {
                        this.$api.userAPI.updateUser({ singleMaterial: that.singleMaterial })
                            .then(function (res) {
                                console.log(res)
                                if (res.data.code == 1) {
                                    that.$message.success('用户信息更新成功！')
                                    that.getAllUserInfo()
                                    that.cancelDialog()
                                } else {
                                    that.$message.error(res.data.msg)
                                }

                            }
                            ).catch(function (err) {
                                console.log(err)
                            })
                    } else {
                        this.$api.materialAPI.editMaterial({ singleMaterial: that.singleMaterial, workshop: JSON.parse(sessionStorage.getItem('userInfo')).key.workshop, username__id: JSON.parse(sessionStorage.getItem('userInfo')).key.id })
                            .then(function (res) {
                                if (res.data.code == 1) {
                                    that.$message.success(res.data.msg)
                                    that.getAllMaterialStorage(that.workshop)
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
