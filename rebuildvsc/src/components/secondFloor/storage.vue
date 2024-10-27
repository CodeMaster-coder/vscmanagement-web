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
                                    <el-col :span="18">
                                        <el-form-item size="mini">
                                            <el-statistic group-separator="," :precision="2" :value="totalWeight"
                                                :title="title"></el-statistic>
                                        </el-form-item>
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
                                <el-table-column prop="equipment__name" label="设备名称" align="center" min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="equipment__type" label="设备型号" align="center" min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="equipment__unit" label="单位" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="equipment__single_weight" label="单个重量(吨)" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="quantity" label="库存数量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column label="操作" size="mini" align="center" min-width='16%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-s-finance" size="mini"
                                            @click="applyBtn(scope.row)">
                                            出库
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
                            <!-- 出库弹出框 -->
                            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%"
                                @close="cancelDialog()">
                                <el-form :model="singleSparepart" :rules="rules" ref="dialogForm">
                                    <el-form-item label="设备名称：" :label-width="formLabelWidth" prop="equipment__name">
                                        <el-input :disabled="isEdit" v-model="singleSparepart.equipment__name"
                                            autocomplete="off"></el-input>
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
                                    <el-form-item label="库存数量：" :label-width="formLabelWidth" prop="quantity">
                                        <el-input :disabled="isEdit" v-model.number="singleSparepart.quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="出库数量：" :label-width="formLabelWidth" v-if="isEdit"
                                        prop="applyQuatity">
                                        <el-input v-model.number="singleSparepart.applyQuatity"
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

            title: '总重量(吨)',
            totalWeight: null,
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
                equipment__name: null,
                equipment__type: null,
                equipment__unit: null,
                equipment__single_weight: null,
                quantity: null,
                applyQuatity: null,
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
                ],
                quantity: [
                    { required: true, message: '设备库存数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '设备库存数量必须为整数' }
                ],
                applyQuatity: [
                    { required: true, message: '出库数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '出库数量必须为整数' },
                    {
                        validator: (rules, value, callback) => {
                            if (value > this.singleSparepart.quantity) {
                                callback(new Error('出库数量不能大于库存数量！'));
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
            applyRow: {},
            areaOptions: []

        }
    },
    mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllSecondFloorStorage(this.workshop)
        this.getTotalWeight(this.workshop)
    },
    methods: {
        exportToExcel(){
            let that=this
            that.$exportToExcel(that.tableData,'二层平台库存.xlsx')
        },
        //获取所有区域
        getTotalWeight(workshop_id) {
            let that = this
            that.$api.secondFloorAPI.getTotalWeight({ workshop: workshop_id })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success('获取总重量成功！')
                            console.log(res.data.total_weight)
                            that.totalWeight = parseFloat(res.data.total_weight)
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
        getAllSecondFloorStorage(workshop_id) {
            let that = this
            console.log(workshop_id)
            this.$api.secondFloorAPI.getAllIdleEquipmentStorag({ workshop: workshop_id })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('获取二层平台库存成功！')
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
        //获取单个设备库存
        querySingleStorage() {
            let that = this
            console.log(that.sparepartName)
            this.$api.sparepartAPI.querySingleStorage({ sparepart__name: that.sparepartName, workshop: that.workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success('获取设备库存成功！')
                            that.tableData = res.data.data
                            //获取返回记录的总行数
                            that.dataTotalLength = res.data.data.length
                            //获取当前页的数据
                            that.getPagesSparepartStorage()
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
            this.sparepartName = null
            this.getAllSparepartStorage(this.workshop)
        },
        //将库存整理成级联数据

        //出库申请按钮
        applyBtn(row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "出库申请"
            this.isEdit = true
            this.singleSparepart = JSON.parse(JSON.stringify(row));

            this.applyRow = row
        },
        //编辑设备属性
        editBtn(row) {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 2).then(
                res => {
                    if (res) {
                        that.dialogFormVisible = true;
                        that.dialogTitle = '设备编辑'
                        that.isEdit = false
                        that.singleSparepart = JSON.parse(JSON.stringify(row));

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
            Object.keys(that.singleSparepart).forEach(key => {
                that.singleSparepart[key] = null; // 或者使用 undefined
            });

            that.applyRow = {}
            this.dialogFormVisible = false
        },
        //添加新设备
        addNewSparepart() {
            this.dialogFormVisible = true;
            this.dialogTitle = "添加新设备"
            this.isEdit = false
        },
        //弹出框取消按钮
        cancelDialog() {

            this.cleanDialog()
        },
        //弹出框确定按钮
        submitDialog() {
            console.log(this.singleSparepart)
            let that = this
            that.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    if (that.isEdit) {
                        this.$api.secondFloorAPI.addOutboundApply({ equipment: that.applyRow.equipment__id, apply_userName: JSON.parse(sessionStorage.getItem('userInfo')).key.id, apply_quantity: that.singleSparepart.applyQuatity, equipment__workshop__name: that.applyRow.equipment__workshop__name })
                            .then(function (res) {
                                console.log(res)
                                if (res.data.code == 1) {
                                    that.$message.success('出库申请提交成功！')
                                    that.getAllSecondFloorStorage(that.workshop)
                                    that.getTotalWeight(that.workshop)
                                    that.cancelDialog(that.workshop)
                                } else {
                                    that.$message.error(res.data.msg)
                                }

                            }
                            ).catch(function (err) {
                                console.log(err)
                            })
                    } else {
                        this.$api.secondFloorAPI.editEquipment({ singleEquipment: that.singleSparepart, workshop: JSON.parse(sessionStorage.getItem('userInfo')).key.workshop, username__id: JSON.parse(sessionStorage.getItem('userInfo')).key.id })
                            .then(function (res) {
                                if (res.data.code == 1) {
                                    that.$message.success(res.data.msg)
                                    that.getAllSecondFloorStorage(that.workshop)
                                    that.getTotalWeight(that.workshop)
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
