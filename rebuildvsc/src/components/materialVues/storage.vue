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
                                            <el-select v-model="materialName" filterable
                                                :placeholder="$t('messages.storage.selectName')">
                                                <el-option v-for="(value, index) in allMaterialName" :key="index"
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
                                                @click="querySingleStorage()">{{ $t('messages.storage.query') }}</el-button>
                                            <el-button type="primary" icon="el-icon-document" size="mini"
                                                @click="getAllData()">{{ $t('messages.storage.all') }}</el-button>
                                        </el-button-group>
                                    </el-col>

                                    <el-col :span="6" size="mini">
                                        <el-button-group size="mini">
                                            <el-button type="primary"
                                                size="mini" @click="exportToExcel()">{{ $t('messages.storage.exprotExcel') }}</el-button>

                                        </el-button-group>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="pageData" width='100%'>
                                <el-table-column prop="material__name" :label="$t('messages.storage.materialName')"
                                    align="center" min-width='25%'>
                                </el-table-column>
                                <el-table-column prop="material__type" :label="$t('messages.storage.materialType')"
                                    align="center" min-width='25%'>
                                </el-table-column>
                                <el-table-column prop="material__unit" :label="$t('messages.storage.materialUnit')"
                                    align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="quantity" :label="$t('messages.storage.inventoryQuantity')"
                                    align="center" min-width='9%'>
                                    <template slot-scope="scope">
                                        <span
                                            :style="{ backgroundColor: scope.row.quantity < scope.row.safety_quantity ? '#ffdc60' : 'white' }">
                                            {{ scope.row.quantity }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="safety_quantity" :label="$t('messages.storage.safetyQuantity')"
                                    align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column :label="$t('messages.storage.edit')" size="mini" align="center"
                                    min-width='18%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-s-finance" size="mini"
                                            @click="applyBtn(scope.row)">
                                            {{ $t('messages.storage.apply') }}
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
                                <el-form :model="singleMaterial" :rules="rules" ref="dialogForm">
                                    <el-form-item :label="$t('messages.storage.materialName')"
                                        :label-width="formLabelWidth" prop="material__name">
                                        <el-input :disabled="isEdit" v-model="singleMaterial.material__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('messages.storage.materialType')"
                                        :label-width="formLabelWidth" prop="material__type">
                                        <el-input :disabled="isEdit" v-model="singleMaterial.material__type"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('messages.storage.materialUnit')"
                                        :label-width="formLabelWidth" prop="material__unit">
                                        <el-input :disabled="isEdit" v-model="singleMaterial.material__unit"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('messages.storage.inventoryQuantity')"
                                        :label-width="formLabelWidth" prop="quantity">
                                        <el-input :disabled="isEdit" v-model.number="singleMaterial.quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('messages.storage.safetyQuantity')"
                                        :label-width="formLabelWidth" prop="safety_quantity">
                                        <el-input :disabled="isEdit" v-model.number="singleMaterial.safety_quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('messages.storage.applyQuatity')"
                                        :label-width="formLabelWidth" v-if="isEdit" prop="applyQuatity">
                                        <el-input v-model.number="singleMaterial.applyQuatity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="cancelDialog()">{{ $t('messages.storage.cancel') }}</el-button>
                                    <el-button type="primary" @click="submitDialog()"
                                        v-preventReClick="1000">{{ $t('messages.storage.submit') }}</el-button>
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
            materialName: null,
            allMaterialName: [],
            dialogFormVisible: false,
            dialogTitle: null,//弹出框标题
            isEdit: false,
            singleMaterial: {
                material__name: null,
                material__type: null,
                material__unit: null,
                quantity: null,
                safety_quantity: null,
                applyQuatity: null
            },
            rules: {
                material__name: [
                    { required: true, message: this.$t('messages.storage.nameUnEmpty'), trigger: 'blur' }
                ],
                material__type: [
                    { required: true, message: this.$t('messages.storage.typeUnEmpty'), trigger: 'blur' }
                ],
                material__unit: [
                    { required: true, message: this.$t('messages.storage.unitUnEmpty'), trigger: 'blur' }
                ],
                quantity: [
                    { required: true, message: this.$t('messages.storage.quantityUnEmpty'), trigger: 'blur' },
                    { type: 'number', message: this.$t('messages.storage.quantityIsInt') }
                ],
                safety_quantity: [
                    { required: true, message: this.$t('messages.storage.saftyLimitUnEmpty'), trigger: 'blur' },
                    { type: 'number', message: this.$t('messages.storage.saftyLimitIsInt') }
                ],
                applyQuatity: [
                    { required: true, message: this.$t('messages.storage.quantityUnEmpty'), trigger: 'blur' },
                    { type: 'number', message: this.$t('messages.storage.quantityIsInt') },
                    {
                        validator: (rules, value, callback) => {
                            if (value > this.singleMaterial.quantity) {
                                callback(new Error(this.$t('messages.storage.applyLowerThanStorage')));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }

                ],
            },
            formLabelWidth: '180px',
            value: '',
            userInfo: {},
            applyRow: {}

        }
    },
    async mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllMaterialStorage(this.workshop)
    },
    methods: {
        exportToExcel(){
            let that=this
            that.$exportToExcel(that.tableData,'耗材库存.xlsx')
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
        //获取所有耗材库存
        async getAllMaterialStorage(workshop_id) {
            let that = this
            console.log(workshop_id)
            const res = await this.$api.materialAPI.getAllMaterialStorag({ workshop: workshop_id })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success(that.$t('messages.storage.getStorageSuccess'))
                        that.tableData = res.data.data
                        console.log(that.tableData)
                        //获取返回记录的总行数
                        that.dataTotalLength = res.data.data.length
                        //获取当前页的数据
                        that.getPagesMaterialStorage()
                        // that.allMaterialName = res.data.data.map(item => {
                        //     return {
                        //         value: item.material__name
                        //     };
                        // });
                        that.allMaterialName = res.data.data.map(item => item.material__name)
                        // console.log(that.allMaterialName)
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
        //获取单个耗材库存
        querySingleStorage() {
            let that = this
            console.log(that.materialName)
            this.$api.materialAPI.querySingleStorage({ material__name: that.materialName, workshop: that.workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success(that.$t('messages.storage.getStorageSuccess'))
                            that.tableData = res.data.data
                            //获取返回记录的总行数
                            that.dataTotalLength = res.data.data.length
                            //获取当前页的数据
                            // that.getPagesMaterialStorage()
                            // console.log(that.currentPage)
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
            this.materialName = null
            this.getAllMaterialStorage(this.workshop)
        },

        //领用申请按钮
        applyBtn(row) {

            this.dialogFormVisible = true;
            this.dialogTitle = this.$t('messages.storage.applyDialogTitle')
            this.isEdit = true
            this.singleMaterial = JSON.parse(JSON.stringify(row));

            this.applyRow = row
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
            this.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 4 ).then(
                res=>{
                    if (res) {
                            that.dialogFormVisible = true;
                            that.dialogTitle = '耗材编辑'
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
                    this.$api.materialAPI.addOutboundApply({ material: that.applyRow.material__id, apply_userName: JSON.parse(sessionStorage.getItem('userInfo')).key.id, apply_quantity: that.singleMaterial.applyQuatity, workshop: that.workshop })
                        .then(function (res) {
                            console.log(res)
                            if (res.data.code == 1) {
                                that.$message.success(that.$t('messages.storage.applySubmitSuccess'))
                                that.getAllMaterialStorage(that.workshop)
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
