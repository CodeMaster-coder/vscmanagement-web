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

                                    <el-button type="primary" size="large"
                                        @click="addInboundEquipment()">设备补库</el-button>
                                    <el-button type="primary" size="large" @click="addNewEquipment()">入库新设备</el-button>
                                </el-button-group>
                            </el-col>
                            <!-- </el-row> -->
                            <!-- </el-form> -->
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="inboundSparepartList"
                                width='100%'>
                                <el-table-column prop="equipment__name" label="设备名称" align="center" min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="equipment__type" label="设备型号" align="center" min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="equipment__unit" label="单位" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="equipment__single_weight" label="单个重量(吨)" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="inboundQuatity" label="补库数量" align="center" min-width='9%'>
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
                            <el-row style="margin-top: 10px; text-align: right;">
                                <el-button type="primary" icon="el-icon-upload" size="larger" style=""
                                    @click="inboundSparepart()" v-preventReClick="1000">
                                    补库提交
                                </el-button>
                                <el-button type="primary" icon="el-icon-delete-solid" size="larger"
                                    @click="deleteAllBtn()">
                                    全部删除
                                </el-button>
                            </el-row>
                            <!-- 领用弹出框 -->
                            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%"
                                @close="cancelDialog()">
                                <el-form :model="singleSparepart" :rules="rules" ref="dialogForm">
                                    <el-form-item label="设备名称：" :label-width="formLabelWidth" prop="equipment__name">
                                        <!-- <el-select v-if="isEdit" v-model="singleSparepart.equipment__name" filterable
                                            placeholder="请选择设备">
                                            <el-option v-for="item in allSparepartName" :key="item.id"
                                                :label="item.equipment__name" :value="item.equipment__name"
                                                @click.native="equipmentNameChange(item)">
                                            </el-option>
                                        </el-select> -->
                                        <el-cascader ref="cascader" style="width: 250px;" v-if="isEdit"
                                            :v-model="singleSparepart.equipment__name" :options="nameOptions"
                                            :props="{ expandTrigger: 'hover' }" @change="handleChange" filterable
                                            clearable=""></el-cascader>
                                        <el-input v-if="!isEdit" :disabled="isEdit"
                                            v-model="singleSparepart.equipment__name" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="设备型号：" :label-width="formLabelWidth" prop="equipment__type">
                                        <el-input :disabled="isEdit" v-model="singleSparepart.equipment__type"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="库存单位：" :label-width="formLabelWidth" prop="equipment__unit">
                                        <el-input :disabled="isEdit" v-model="singleSparepart.equipment__unit"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="单位重量(吨)：" :label-width="formLabelWidth"
                                        prop="equipment__single_weight">
                                        <el-input :disabled="isEdit" v-model="singleSparepart.equipment__single_weight"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="isEdit" label="库存数量：" :label-width="formLabelWidth"
                                        prop="quantity">
                                        <el-input :disabled="isEdit" v-model.number="singleSparepart.quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="补库数量：" :label-width="formLabelWidth" prop="inboundQuatity">
                                        <el-input v-model.number="singleSparepart.inboundQuatity" autocomplete="on"
                                            :min="1"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="cancelDialog()">取 消</el-button>
                                    <el-button type="primary" @click="submitDialog()">确
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
            // pageData: [],  //分页后当前页信息 
            baseURL: "http://192.168.242.130/",
            // currentPage: 1,
            // pageSize: 15,
            dataTotalLength: 0,  //返回记录的总行数
            workshop__id: 1,
            equipmentName: null,
            allSparepartName: [],
            dialogFormVisible: false,
            dialogTitle: null,//弹出框标题
            // isEdit: true,
            singleSparepart: {
                equipment__name: null,
                equipment__type: null,
                equipment__unit: null,
                quantity: null,
                safety_quantity: null,
                inboundQuatity: null,
                equipment__single_weight: null
            },
            rules: {
                equipment__name: [
                    { required: true, message: '设备名称不能为空！', trigger: 'blur' },
                    { type: 'string' }
                ],
                equipment__type: [
                    { required: true, message: '设备型号不能为空！', trigger: 'blur' },
                    { type: 'string' }
                ],
                equipment__unit: [
                    { required: true, message: '设备单位不能为空！', trigger: 'blur' },
                    { type: 'string' }
                ],
                quantity: [
                    { required: true, message: '设备库存数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '设备库存数量必须为整数' }
                ],
                safety_quantity: [
                    { required: true, message: '设备安全量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '设备安全量必须为整数' }
                ],
                inboundQuatity: [
                    { required: true, message: '补库数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '补库数量必须为整数' },
                    {
                        validator: (rules, value, callback) => {
                            if (value <= 0) {
                                callback(new Error('入库数量不能小于或等于0！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                equipment__single_weight: [
                    { required: true, message: '设备重量不能为空！', trigger: 'blur' },
                    {
                        validator: (rules, value, callback) => {
                            if (!value.replace(/^(0+)|[^\d]+/g, "")) {
                                callback(new Error('设备重量必须为正数！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            },
            formLabelWidth: '120px',
            value: '',
            userInfo: {},
            applyRow: {},
            inboundSparepartList: [],   //所有需要提交的补库清单
            isEdit: false,       //编辑按钮生效变量
            rowIndex: null,      //行编辑索引
            nameOptions: []
        }
    },
    mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllSparepartStorage(this.workshop)
    },
    methods: {
        //获取所有设备库存
        getAllSparepartStorage(workshop_id) {
            let that = this
            // console.log(workshop_id)
            this.$api.secondFloorAPI.getAllIdleEquipmentStorag({ workshop: workshop_id })
                .then(function (res) {
                    if (res.data.code == 1) {
                        // that.$message.success('获取设备库存成功！')

                        //获取返回记录的总行数
                        that.dataTotalLength = res.data.data.length
                        that.nameOptions = that.dataOrganize(res.data.data)
                        that.tableData = res.data.data
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
                    label: item.equipment__name,
                    children: item.equipment__type ? [{
                        value: item.id,
                        label: item.equipment__type
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
        handleChange(value) {
            // console.log(value)
            let that = this
            this.singleSparepart = JSON.parse(JSON.stringify(that.tableData.find(item => item.id === value[1])))
            // console.log(this.singleMaterial)
        },
        //展示全部库存按钮实现
        getAllData() {
            this.equipmentName = null
            this.getAllSparepartStorage(this.workshop)
        },
        //行编辑按钮
        editBtn(index) {
            // console.log(index)
            this.isEdit = true
            this.dialogFormVisible = true
            this.singleSparepart = this.inboundSparepartList[index]
            this.rowIndex = index
        },
        //行删除按钮
        deleteBtn(index) {
            this.inboundSparepartList.splice(index, 1)
        },
        //清空弹出框内容
        cleanDialog() {
            Object.keys(this.singleSparepart).forEach(key => {
                this.singleSparepart[key] = null; // 或者使用 undefined
            });
            this.$refs.dialogForm.resetFields();
            this.$refs.cascader.$refs.panel.clearCheckedNodes()
        },
        //添加新设备
        addInboundEquipment() {
            this.dialogFormVisible = true;
            this.isEdit = true;
            this.dialogTitle = "二层设备补库"
        },
        addNewEquipment() {
            this.dialogFormVisible = true;
            this.isEdit = false;
            this.dialogTitle = "二层新设备"
        },
        //弹出框取消按钮
        cancelDialog() {
            this.dialogFormVisible = false
            this.cleanDialog()
        },
        //弹出框确定按钮
        submitDialog() {
            // console.log(this.singleSparepart)
            let that = this
            that.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    //补库清单新增行
                    let inboundSingleSparepart = JSON.parse(JSON.stringify(that.singleSparepart))
                    that.inboundSparepartList.push(inboundSingleSparepart)
                    that.cleanDialog()



                }

            });
        },
        //选择框设备名称变化
        equipmentNameChange(e) {

            this.singleSparepart = JSON.parse(JSON.stringify(e))
        },
        //计算提交的总重量
        inboundToatlWeight(inboundSparepartList) {
            let totalSum = 0
            inboundSparepartList.forEach(item => {
                // 将字符串转换为数字  
                const inboundQuantity = parseInt(item.inboundQuatity);
                const singleWeight = parseFloat(item.equipment__single_weight);

                // 计算每个元素的inboundQuantity乘以equipment__single_weight  
                const currentSum = inboundQuantity * singleWeight;

                // 将当前计算结果加到总和中  
                totalSum += currentSum;
            })
            return totalSum
        },
        //提交所有设备刀后端
        inboundSparepart() {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 2).then(
                res => {
                    if (res) {
                        console.log(that.inboundToatlWeight(that.inboundSparepartList))
                        if (that.inboundSparepartList.length == 0) {
                            that.$message.error('请至少添加一条入库记录！')
                        } else {
                            that.$api.secondFloorAPI.addInboundApply({ inboundWeight: that.inboundToatlWeight(that.inboundSparepartList), inboundSparepartList: that.inboundSparepartList, username__id: JSON.parse(sessionStorage.getItem('userInfo')).key.id, workshop__id: JSON.parse(sessionStorage.getItem('userInfo')).key.workshop })
                                .then(function (res) {
                                    if (res.data.code == 1) {
                                        that.$message.success('入库数据提交成功！')
                                        that.inboundSparepartList = []
                                    } else {
                                        that.$message.error(res.data.msg)
                                    }
                                })
                                .catch(function (err) {
                                    console.log(err)
                                })
                        }
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
        //一件清除所有补库数据
        deleteAllBtn() {
            this.inboundSparepartList = []
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
