<template>
    <div id="app">
        <el-container>
            <el-container>
                <el-container width="100%">

                    <el-container width="80%">
                        <el-main>

                            <!-- 表单 -->
                            <!-- <el-form :inline="true" style="margin-top: 20px; align-items: center;"> -->
                            <!-- <el-row> -->


                            <el-col :span="6" size="mini" style="margin-bottom: 10px;">
                                <el-button-group size="mini">

                                    <el-button type="primary" size="large" @click="addInboundMaterial()">{{
                                        $t('messages.inbound.consumbaleInbound') }}</el-button>
                                    <el-button type="primary" size="large" @click="addNewMaterial()">{{
                                        $t('messages.storage.addNewMaterial') }}</el-button>
                                </el-button-group>
                            </el-col>
                            <!-- </el-row> -->
                            <!-- </el-form> -->
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="inboundMaterialList"
                                width='100%'>
                                <el-table-column prop="material__name" :label="$t('messages.storage.materialName')"
                                    align="center" min-width='30%'>
                                </el-table-column>
                                <el-table-column prop="material__type" :label="$t('messages.storage.materialType')"
                                    align="center" min-width='30%'>
                                </el-table-column>
                                <el-table-column prop="material__unit" :label="$t('messages.storage.materialUnit')"
                                    align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="inboundQuatity" :label="$t('messages.inbound.inboundQuantity')"
                                    align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="safety_quantity" :label="$t('messages.storage.safetyQuantity')"
                                    align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column :label="$t('messages.storage.edit')" size="mini" align="center"
                                    min-width='9%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-delete" size="mini"
                                            @click="deleteBtn(scope.$index)">
                                            {{ $t('messages.inbound.delete') }}
                                        </el-button>
                                    </template>

                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-row style="margin-top: 10px; text-align: right;">
                                <el-button type="primary" icon="el-icon-upload" size="larger" style=""
                                    @click="inboundMaterial()" v-preventReClick="1000">
                                    {{ $t('messages.inbound.inboundSubmit') }}
                                </el-button>
                                <el-button type="primary" icon="el-icon-delete-solid" size="larger"
                                    @click="deleteAllBtn()">
                                    {{ $t('messages.inbound.deleteAll') }}
                                </el-button>
                            </el-row>
                            <!-- 领用弹出框 -->
                            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%"
                                @close="cancelDialog()">
                                <el-form :model="singleMaterial" :rules="rules" ref="dialogForm">
                                    <el-form-item :label="$t('messages.storage.materialName')"
                                        :label-width="formLabelWidth" prop="material__name">
                                        <el-cascader ref="cascader" style="width: 250px;" v-if="!isEdit"
                                            :v-model="singleMaterial.material__name" :options="nameOptions"
                                            :props="{ expandTrigger: 'hover' }" @change="handleChange" filterable
                                            clearable=""></el-cascader>
                                        <el-input v-if="isEdit" :disabled="!isEdit"
                                            v-model="singleMaterial.material__name" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('messages.storage.materialType')"
                                        :label-width="formLabelWidth" prop="material__type">
                                        <el-input :disabled="!isEdit" v-model="singleMaterial.material__type"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('messages.storage.materialUnit')"
                                        :label-width="formLabelWidth" prop="material__unit">
                                        <el-input :disabled="!isEdit" v-model="singleMaterial.material__unit"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="!isEdit" :label="$t('messages.storage.inventoryQuantity')"
                                        :label-width="formLabelWidth" prop="quantity">
                                        <el-input :disabled="!isEdit" v-model.number="singleMaterial.quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('messages.storage.safetyQuantity')"
                                        :label-width="formLabelWidth" prop="safety_quantity">
                                        <el-input :disabled="!isEdit" v-model.number="singleMaterial.safety_quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('messages.inbound.inboundQuantity')"
                                        :label-width="formLabelWidth" prop="inboundQuatity">
                                        <el-input v-model.number="singleMaterial.inboundQuatity" autocomplete="on"
                                            :min="1"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="cancelDialog()">{{ $t('messages.storage.cancel') }}</el-button>
                                    <el-button type="primary" @click="submitDialog()">{{ $t('messages.storage.submit')
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
            // tableData: [],
            // pageData: [],  //分页后当前页信息 
            baseURL: "http://192.168.242.130/",
            // currentPage: 1,
            // pageSize: 15,
            dataTotalLength: 0,  //返回记录的总行数
            workshop__id: 1,
            materialName: null,
            allMaterialName: [],
            dialogFormVisible: false,
            dialogTitle: null,//弹出框标题
            // isEdit: true,
            singleMaterial: {
                material__name: null,
                material__type: null,
                material__unit: null,
                quantity: null,
                safety_quantity: null,
                inboundQuatity: null
            },
            rules: {
                material__name: [
                    { required: true, message: this.$t('messages.storage.nameUnEmpty'), trigger: 'blur' },
                    { type: 'string' }
                ],
                material__type: [
                    { required: true, message: this.$t('messages.storage.typeUnEmpty'), trigger: 'blur' },
                    { type: 'string' }
                ],
                material__unit: [
                    { required: true, message: this.$t('messages.storage.unitUnEmpty'), trigger: 'blur' },
                    { type: 'string' }
                ],
                quantity: [
                    { required: true, message: this.$t('messages.storage.quantityUnEmpty'), trigger: 'blur' },
                    { type: 'number', message: this.$t('messages.storage.quantityIsInt') }
                ],
                safety_quantity: [
                    { required: true, message: this.$t('messages.storage.saftyLimitUnEmpty'), trigger: 'blur' },
                    { type: 'number', message: this.$t('messages.storage.saftyLimitIsInt') }
                ],
                inboundQuatity: [
                    { required: true, message: this.$t('messages.storage.quantityUnEmpty'), trigger: 'blur' },
                    { type: 'number', message: this.$t('messages.storage.quantityIsInt') },
                    {
                        validator: (rules, value, callback) => {
                            if (value <= 0) {
                                callback(new Error(this.$t('messages.inbound.inboundGreaterThan0')));
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
            applyRow: {},
            inboundMaterialList: [],   //所有需要提交的补库清单
            isEdit: false,       //编辑按钮生效变量
            rowIndex: null,      //行编辑索引
            nameOptions: []
        }
    },
    async mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        await this.getAllMaterialStorage(this.workshop)
        this.nameOptions = this.dataOrganize(this.tableData)
        console.log(this.nameOptions)
    },
    methods: {
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
        //将所有库存数据整理成级联数据
        dataOrganize(storageData) {
            const options = storageData.map(item => {
                return {
                    value: item.id,
                    label: item.material__name,
                    children: item.material__type ? [{
                        value: item.id,
                        label: item.material__type
                    }] : []
                };
            });

            // 将一级菜单聚合，去重
            const aggregatedOptions = options.reduce((acc, curr) => {
                const existingItem = acc.find(item => item.label === curr.label);
                if (existingItem) {
                    // 如果已存在，则合并 children
                    existingItem.children = existingItem.children.concat(curr.children);
                } else {
                    // 否则，添加新的项
                    acc.push(curr);
                }
                return acc;
            }, []);

            return aggregatedOptions;
        },
        //展示全部库存按钮实现
        getAllData() {
            this.materialName = null
            this.getAllMaterialStorage(this.workshop)
        },
        //行编辑按钮
        editBtn(index) {
            // console.log(index)
            this.isEdit = true
            this.dialogFormVisible = true
            this.singleMaterial = this.inboundMaterialList[index]
            this.rowIndex = index
        },
        //行删除按钮
        deleteBtn(index) {
            this.inboundMaterialList.splice(index, 1)
        },
        //清空弹出框内容
        cleanDialog() {
            Object.keys(this.singleMaterial).forEach(key => {
                this.singleMaterial[key] = null; // 或者使用 undefined
            });
            this.$refs.dialogForm.resetFields();
            this.$refs.cascader.$refs.panel.clearCheckedNodes()

        },
        //添加入库耗材
        addInboundMaterial() {
            this.dialogFormVisible = true;
            this.isEdit = false;
            this.dialogTitle = this.$t('messages.inbound.consumbaleInbound')
        },
        //添加新耗材
        addNewMaterial() {
            this.dialogFormVisible = true;
            this.isEdit = true;
            this.dialogTitle = "添加新耗材"
        },
        //弹出框取消按钮
        cancelDialog() {
            this.dialogFormVisible = false
            this.cleanDialog()
        },
        //弹出框确定按钮
        submitDialog() {
            // console.log(this.singleMaterial)
            let that = this
            that.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    let inboundSingleMaterial = JSON.parse(JSON.stringify(that.singleMaterial))
                    that.inboundMaterialList.push(inboundSingleMaterial)
                    that.cleanDialog()
                }

            });
        },
        //选择框耗材名称变化
        materialNameChange(e) {

            this.singleMaterial = JSON.parse(JSON.stringify(e))
        },
        handleChange(value) {
            // console.log(value)
            let that = this
            this.singleMaterial = JSON.parse(JSON.stringify(that.tableData.find(item => item.id === value[1])))
            // console.log(this.singleMaterial)
        },
        //提交所有耗材刀后端
        inboundMaterial() {
            let that = this
            this.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 4 ).then(
                res=>{
                    if (res) {
            if (that.inboundMaterialList.length == 0) {
                that.$message.error(that.$t('messages.inbound.atLeastOne'))
            } else {
                console.log(that.inboundMaterialList)
                that.$api.materialAPI.inboundMaterial({ inboundMaterialList: that.inboundMaterialList, username__id: JSON.parse(sessionStorage.getItem('userInfo')).key.id, workshop__id: JSON.parse(sessionStorage.getItem('userInfo')).key.workshop })
                    .then(function (res) {
                        if (res.data.code == 1) {
                            that.$message.success(that.$t('messages.storage.applySubmitSuccess'))
                            that.inboundMaterialList = []
                        } else {
                            that.$message.error(res.data.msg)
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }} else {
                            that.$message.error('您没有权限！！！')
                        }
                    }
                )
                .catch(
                    function (err) {
                        console.log(err)
                    }
                )
        },
        //一件清除所有补库数据
        deleteAllBtn() {
            this.inboundMaterialList = []
        },
        //真正深拷贝
        deepCopy(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }
            let copy = Array.isArray(obj) ? [] : {};
            for (const attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = deepCopy(obj[attr]);
                }
            }
            return copy;
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
