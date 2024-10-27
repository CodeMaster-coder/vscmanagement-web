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
                                            <el-select v-model="materialName" filterable placeholder="请选择设备名称">
                                                <el-option v-for="item in tableData" :key="item.id"
                                                    :label="item.equipment__name" :value="item.equipment__name">
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
                                            <el-button type="primary" size="mini"
                                                @click="addNewMaterial()">添加新设备</el-button>
                                        </el-button-group>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="pageData" width='100%'>
                                <el-table-column prop="equipment__name" label="设备名称" align="center" min-width='25%'>
                                </el-table-column>
                                <el-table-column prop="equipment__type" label="设备型号" align="center" min-width='25%'>
                                </el-table-column>
                                <el-table-column prop="equipment__unit" label="单位" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="quantity" label="库存数量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="safety_quantity" label="安全量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column label="操作" size="mini" align="center" min-width='18%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-setting" size="mini"
                                            @click="applyBtn(scope.row)">
                                            维修
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
                            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="45%"
                                @close="cancelDialog()">
                                <el-form :model="singleMaterial" :rules="rules" ref="dialogForm" :inline="true">
                                    <el-form-item label="设备名称：" :label-width="formLabelWidth" prop="equipment__name">
                                        <el-input :disabled="isEdit" v-model="singleMaterial.equipment__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="设备型号：" :label-width="formLabelWidth" prop="equipment__type">
                                        <el-input :disabled="isEdit" v-model="singleMaterial.equipment__type"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="库存单位：" :label-width="formLabelWidth" prop="equipment__unit">
                                        <el-input :disabled="isEdit" v-model="singleMaterial.equipment__unit"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="库存数量：" :label-width="formLabelWidth" prop="quantity">
                                        <el-input :disabled="isEdit" v-model.number="singleMaterial.quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="安全量：" :label-width="formLabelWidth" prop="safety_quantity">
                                        <el-input :disabled="isEdit" v-model.number="singleMaterial.safety_quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="维修数量：" :label-width="formLabelWidth" v-if="isEdit"
                                        prop="applyQuatity">
                                        <el-input v-model.number="singleMaterial.applyQuatity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="isEdit" label="所属区域：" :label-width="formLabelWidth" prop="area">
                                        <el-select v-model="singleMaterial.area" placeholder="请选择区域">
                                            <el-option v-for="item in areaOptions" :key="item.value" :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item v-if="isEdit" label="故障详情：" :label-width="formLabelWidth"
                                        prop="problemDetail">
                                        <el-input type="textarea" :rows="5" v-model="singleMaterial.problemDetail"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="isEdit" label="故障图片：" :label-width="formLabelWidth"
                                        prop="files">
                                        <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card" :http-request="uploadSubmit" :auto-upload="false"
                                            :file-list="fileList" :on-change="handleChange" multiple :limit="5"
                                            :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove" v-model="singleMaterial.files" ref='upload'>
                                            <i class="el-icon-plus"></i>
                                            <div class="el-upload__tip" slot="tip" style="font-weight: bold">
                                                建议大小不超过5M,数量不超过5张
                                            </div>
                                        </el-upload>

                                        <el-dialog :visible.sync="imgDialogVisible">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
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
            materialName: null,
            allMaterialName: [],
            dialogFormVisible: false,
            dialogTitle: null,//弹出框标题
            isEdit: false,
            singleMaterial: {
                equipment__name: null,
                equipment__type: null,
                equipment__unit: null,
                quantity: null,
                safety_quantity: null,
                applyQuatity: null,
                area: null,
                image: null,
                imageUrl: null,
                problemDetail: null,
                files: [],
                value: null
            },
            rules: {
                equipment__name: [
                    { required: true, message: '设备名称不能为空！', trigger: 'blur' }
                ],
                equipment__type: [
                    { required: true, message: '设备型号不能为空！', trigger: 'blur' }
                ],
                equipment__unit: [
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
                    { required: true, message: '申请数量不能为空！', trigger: 'blur' },
                    { type: 'number', message: '申请数量必须为整数' },
                    {
                        validator: (rules, value, callback) => {
                            if (value > this.singleMaterial.quantity) {
                                callback(new Error('申请数量不能大于库存数量！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }

                ],
                area: [
                    {
                        required: true,
                        validator: (rules, value, callback) => {
                            if (!this.singleMaterial.area) {
                                callback(new Error('请选择区域！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
                problemDetail: [
                    { required: true, message: '故障描述不能为空！', trigger: 'blur' },
                ],
                files: [
                    {
                        required: true,
                        validator: (rules, value, callback) => {
                            if (!this.singleMaterial.files) {
                                callback(new Error('请添加图片！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
            },
            areaOptions: [],
            formLabelWidth: '120px',
            value: '',
            userInfo: {},
            applyRow: {},
            dialogImageUrl: '',
            imgDialogVisible: false,

            fileList: []

        }
    },
    mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        // console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllMaterialStorage(this.workshop)
        this.getAllArea(this.workshop)
    },
    methods: {
        exportToExcel(){
            let that=this
            that.$exportToExcel(that.tableData,'设备库存.xlsx')
        },
        uploadSubmit() {
            console.log('打开图片')
        },
        beforeAvatarUpload(file) {

            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isLt5M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }

        },


        handleChange(uploadFile, uploadFiles) {
            // console.log(uploadFile, uploadFiles)
            this.singleMaterial.files = uploadFiles
            // console.log(this.files)
        },
        handlePictureCardPreview(file) {
            this.imgDialogVisible = true;
            this.dialogImageUrl = file.url;

        },
        handleRemove(uploadFile, uploadFiles) {
            // console.log(uploadFile, uploadFiles)
            this.singleMaterial.files = uploadFiles
            // console.log(this.files)
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
        //获取所有设备库存
        getAllMaterialStorage(workshop_id) {
            let that = this
            // console.log(workshop_id)
            this.$api.equipmentAPI.getAllEquipmentlStorag({ workshop: workshop_id })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('获取设备库存成功！')
                        that.tableData = res.data.data
                        // console.log(that.tableData)
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
        //获取单个设备库存
        querySingleStorage() {
            let that = this
            // console.log(that.materialName)
            this.$api.equipmentAPI.getSingleEquipmentlStorag({ equipment__name: that.materialName, workshop: that.workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.$message.success('获取设备库存成功！')
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
            this.materialName = null
            this.getAllMaterialStorage(this.workshop)
        },
        //领用申请按钮
        applyBtn(row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "维修申请"
            this.isEdit = true
            this.singleMaterial = JSON.parse(JSON.stringify(row));

            this.applyRow = row
        },
        //编辑设备属性
        editBtn(row) {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 6).then(
                res => {
                    if (res) {
                        that.dialogFormVisible = true;
                        that.dialogTitle = "编辑设备"
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
            this.$refs.upload.clearFiles();
        },
        //添加新设备
        addNewMaterial() {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 6).then(
                res => {
                    if (res) {
                        that.dialogFormVisible = true;
                        that.dialogTitle = "添加新设备"
                        that.isEdit = false
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

            let that = this
            console.log(that.singleMaterial)
            that.$refs.dialogForm.validate(
                async (valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            let fileReq = new FormData()
                            fileReq.append('faultDetail', JSON.stringify(that.singleMaterial))
                            that.singleMaterial.files.forEach((ele) => {
                                if (ele.status === 'ready') fileReq.append('avatar', ele.raw)
                            })
                            fileReq.append('userId', JSON.parse(sessionStorage.getItem('userInfo')).key.id)
                            that.$api.equipmentAPI.uploadFaultDetail(fileReq)
                                .then(res => {
                                    if (res.data.code == 1) {
                                        that.$message.success(res.data.msg)
                                        that.cancelDialog()
                                        that.getAllMaterialStorage(JSON.parse(sessionStorage.getItem('userInfo')).key.workshop)
                                    } else {
                                        that.$message.error(res.data.msg)
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                    that.$message.error('上传图片失败！')
                                })
                        }
                        else {
                            this.$api.equipmentAPI.editEquipment({ singleEquipment: that.singleMaterial, workshop: JSON.parse(sessionStorage.getItem('userInfo')).key.workshop, username__id: JSON.parse(sessionStorage.getItem('userInfo')).key.id })
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
                }
            )


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

.avatar-uploader .el-upload {
    border: 1px dashed #f5f1f1;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
