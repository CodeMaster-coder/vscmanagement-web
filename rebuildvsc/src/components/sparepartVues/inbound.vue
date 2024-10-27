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
                                        @click="addInboundSparepart()">备件补库</el-button>
                                    <el-button type="primary" size="large" @click="addNewSparepart()">添加新备件</el-button>
                                </el-button-group>
                            </el-col>
                            <!-- </el-row> -->
                            <!-- </el-form> -->
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="inboundSparepartList"
                                width='100%'>
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
                                <el-table-column prop="quantity" label="库存数量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="safety_quantity" label="安全量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="sparepart__location" label="位置" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="sparepart__comment" label="备注" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="inboundQuatity" label="补库数量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column label="操作" size="mini" align="center" min-width='18%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                            @click="editBtn(scope.$index)">
                                            编辑
                                        </el-button>
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
                                    <el-form-item label="备件名称：" :label-width="formLabelWidth" prop="sparepart__name">
                                        <!-- <el-select v-if="!isEdit" v-model="singleSparepart.sparepart__name" filterable
                                            placeholder="请选择备件">
                                            <el-option v-for="item in allSparepartName" :key="item.id"
                                                :label="item.sparepart__name" :value="item.sparepart__name"
                                                @click.native="sparepartNameChange(item)">
                                            </el-option>
                                        </el-select> -->
                                        <el-cascader ref="cascader" style="width: 250px;" v-if="!isEdit"
                                            :v-model="singleSparepart.sparepart__name" :options="nameOptions"
                                            :props="{ expandTrigger: 'hover' }" @change="handleChange" filterable
                                            clearable=""></el-cascader>
                                        <el-input v-if="isEdit" :disabled="!isEdit"
                                            v-model="singleSparepart.sparepart__name" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="备件型号：" :label-width="formLabelWidth" prop="sparepart__type">
                                        <el-input :disabled="!isEdit" v-model="singleSparepart.sparepart__type"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="品牌：" :label-width="formLabelWidth" prop="sparepart__brand">
                                        <el-input :disabled="!isEdit" v-model="singleSparepart.sparepart__brand"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="库存单位：" :label-width="formLabelWidth" prop="sparepart__unit">
                                        <el-input :disabled="!isEdit" v-model="singleSparepart.sparepart__unit"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="!isEdit" label="区域：" :label-width="formLabelWidth"
                                        prop="sparepart__area__name">
                                        <el-input :disabled="!isEdit" v-model="singleSparepart.sparepart__area__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="isEdit" label="区域：" :label-width="formLabelWidth" prop="area">
                                        <el-select v-model="singleSparepart.area" placeholder="请选择区域">
                                            <el-option v-for="item in areaOptions" :key="item.value" :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item v-if="!isEdit" label="库存数量：" :label-width="formLabelWidth"
                                        prop="quantity">
                                        <el-input :disabled="!isEdit" v-model.number="singleSparepart.quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="安全量：" :label-width="formLabelWidth" prop="safety_quantity">
                                        <el-input :disabled="!isEdit" v-model.number="singleSparepart.safety_quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="位置：" :label-width="formLabelWidth" prop="sparepart__location">
                                        <el-input :disabled="!isEdit" v-model="singleSparepart.sparepart__location"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="备注：" :label-width="formLabelWidth" prop="sparepart__comment">
                                        <el-input :disabled="!isEdit" v-model="singleSparepart.sparepart__comment"
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
            sparepartName: null,
            allSparepartName: [],
            dialogFormVisible: false,
            dialogTitle: null,//弹出框标题
            // isEdit: true,
            singleSparepart: {
                sparepart__id: null,
                sparepart__name: null,
                sparepart__type: null,
                sparepart__unit: null,
                quantity: null,
                safety_quantity: null,
                inboundQuatity: null
            },
            rules: {
                sparepart__name: [
                    { required: true, message: '备件名称不能为空！', trigger: 'blur' },
                    { type: 'string' }
                ],
                // sparepart__type: [
                //     { required: true, message: '备件型号不能为空！', trigger: 'blur' },
                //     { type: 'string' }
                // ],
                sparepart__unit: [
                    { required: true, message: '备件单位不能为空！', trigger: 'blur' },
                    { type: 'string' }
                ],
                quantity: [
                    { required: true, message: '备件库存数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '备件库存数量必须为整数' }
                ],
                safety_quantity: [
                    { required: true, message: '备件安全量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '备件安全量必须为整数' }
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
                // sparepart__brand: [
                //     { required: true, message: '备件品牌不能为空！', trigger: 'blur' }
                // ],
                area: [
                    {
                        required: true,
                        validator: (rules, value, callback) => {
                            if (!this.singleSparepart.area) {
                                callback(new Error('请选择区域！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
                sparepart__location: [
                    { required: true, message: '备件位置不能为空！', trigger: 'blur' }
                ]
            },
            formLabelWidth: '120px',
            value: '',
            userInfo: {},
            applyRow: {},
            inboundSparepartList: [],   //所有需要提交的补库清单
            isEdit: false,       //编辑按钮生效变量
            rowIndex: null,      //行编辑索引
            areaOptions: [],
            nameOptions: []
        }
    },
    mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllSparepartStorage(this.workshop)
        this.getAllArea(this.workshop)
    },
    methods: {
        //获取所有区域
        getAllArea(workshop_id) {
            let that = this
            that.$api.equipmentAPI.getAllArea({ workshop: workshop_id })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success('获取区域成功！')
                            that.areaOptions = res.data.data
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
        //获取所有备件库存
        getAllSparepartStorage(workshop_id) {
            let that = this
            // console.log(workshop_id)
            this.$api.sparepartAPI.getAllSparepartStorag({ workshop: workshop_id })
                .then(function (res) {
                    if (res.data.code == 1) {
                        // that.$message.success('获取备件库存成功！')

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
                    label: item.sparepart__name,
                    children: item.sparepart__type ? [{
                        value: item.id,
                        label: item.sparepart__type
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
            this.sparepartName = null
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
        //老备件补库
        addInboundSparepart() {
            this.dialogFormVisible = true;
            this.isEdit = false;
            this.dialogTitle = "备件补库"
        },
        //添加新备件
        addNewSparepart() {
            this.dialogFormVisible = true;
            this.isEdit = true;
            this.dialogTitle = "添加新备件"
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
                    let inboundSingleSparepart = JSON.parse(JSON.stringify(that.singleSparepart))
                    that.inboundSparepartList.push(inboundSingleSparepart)
                    that.cleanDialog()
                }

            });
        },
        //选择框备件名称变化
        sparepartNameChange(e) {

            this.singleSparepart = JSON.parse(JSON.stringify(e))
        },
        //提交所有备件刀后端
        inboundSparepart() {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 8).then(
                res => {
                    if (res) {
                        if (that.inboundSparepartList.length == 0) {
                            that.$message.error('请至少添加一条补库记录！')
                        } else {
                            that.$api.sparepartAPI.inboundSparepart({ inboundSparepartList: that.inboundSparepartList, username__id: JSON.parse(sessionStorage.getItem('userInfo')).key.id, workshop__id: JSON.parse(sessionStorage.getItem('userInfo')).key.workshop })
                                .then(function (res) {
                                    if (res.data.code == 1) {
                                        that.$message.success('补库数据提交成功！')
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
