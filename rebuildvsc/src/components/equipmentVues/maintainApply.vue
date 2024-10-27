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
                                    <el-col :span="12">
                                        <el-form-item size="mini">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button-group size="mini">

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
                            <el-table border size="mini" :row-style="{ height: '40px' }" :data="pageData" width='100%'>
                                <el-table-column prop="equipment__name" label="工具名称" align="center" min-width='23%'>
                                </el-table-column>
                                <el-table-column prop="equipment__type" label="工具型号" align="center" min-width='22%'>
                                </el-table-column>
                                <el-table-column prop="equipment__unit" label="单位" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="aplly_quantity" label="申请数量" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_date" label="申请时间" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="problem_detail" label="申请备注" align="center" min-width='25%'>
                                </el-table-column>
                                <el-table-column label="操作" size="mini" align="center" min-width='18%'>
                                    <template slot-scope="scope">
                                        <el-button v-if="!scope.row.TPM_approve_or_not" type="primary"
                                            icon="el-icon-more-outline" size="mini" @click="detailBtn(scope.row)">
                                            审批
                                        </el-button>
                                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                            @click="updateBtn(scope.row)">
                                            更新
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
                            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="50%"
                                @close="cancelDialog()">
                                <el-form :model="singleTool" :rules="rules" ref="dialogForm" :inline="true">
                                    <el-form-item label="工具名称：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model="singleTool.equipment__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="工具型号：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model="singleTool.equipment__type"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="单位：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model="singleTool.equipment__unit"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请时间：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model.number="singleTool.apply_date"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请人：" :label-width="formLabelWidth">
                                        <el-input v-model.number="singleTool.apply_name__name" :disabled="true"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请维修数量：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model.number="singleTool.aplly_quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="!isEdit" label="区域：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model.number="singleTool.area__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="isEdit" label="区域：" :label-width="formLabelWidth" prop="area">
                                        <el-select v-model="singleTool.area" placeholder="请选择区域">
                                            <el-option v-for="item in areaOptions" :key="item.value" :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="故障详情：" :label-width="formLabelWidth" prop="problem_detail">
                                        <el-input :disabled="!isEdit" type="textarea"
                                            v-model="singleTool.problem_detail" :rows="8" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="!isEdit" label="故障图片：" :label-width="formLabelWidth">
                                        <div class="demo-image__preview">
                                            <el-image style="width: 180px; height: 180px" :src="imageUrl"
                                                :preview-src-list="srcList">
                                            </el-image>
                                        </div>
                                    </el-form-item>

                                    <el-form-item v-if="isEdit" label="故障图片：" :label-width="formLabelWidth"
                                        prop="files">
                                        <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card" :http-request="uploadSubmit" :auto-upload="false"
                                            :file-list="fileList" :on-change="handleChange" multiple :limit="imgLimit"
                                            :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove" ref='upload' v-model="singleTool.files">
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
                                    <el-button v-if="!isEdit" type="primary" size="mini" @click="deleteBtn()">
                                        删除
                                    </el-button>
                                    <el-button v-if="!isEdit" type="primary" size="mini" @click="approveBtn()">
                                        批准
                                    </el-button>
                                    <el-button v-if="isEdit" type="primary" size="mini" @click="submitDialog()">
                                        确认
                                    </el-button>
                                    <el-button v-if="isEdit" type="primary" size="mini" @click="cancelDialog()">
                                        取消
                                    </el-button>
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
            // baseURL: "http://192.168.40.131/",
            currentPage: 1,
            pageSize: 15,
            dataTotalLength: 0,  //返回记录的总行数
            workshop__id: 1,
            toolName: null,
            allToolName: [],
            tempSrapImg: [],
            dialogFormVisible: false,
            dialogTitle: null,//弹出框标题
            quantityLabel: null, // 弹出框数量标签
            isEdit: false,
            imageUrl: "",
            singleTool: {},
            formLabelWidth: '160px',
            value: '',
            userInfo: {},
            applyRow: {},
            srcList: [],
            fileList: [],
            imgDialogVisible: false,
            dialogImageUrl: null,
            imgLimit: 5,
            singleTool: {
                equipment__name: null,
                equipment__type: null,
                equipment__unit: null,
                quantity: null,
                safety_quantity: null,
                applyQuatity: null,
                area: null,
                image: null,
                imageUrl: null,
                problem_detail: null,
                files: [],
                value: null,
                TPM_approve_or_not: null
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
                            if (value > this.singleTool.quantity) {
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
                            if (!this.singleTool.area) {
                                callback(new Error('请选择区域！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
                problem_detail: [
                    { required: true, message: '故障描述不能为空！', trigger: 'blur' },
                ],
                files: [
                    {
                        required: true,
                        validator: (rules, value, callback) => {
                            if (this.singleTool.files.length == 0) {
                                callback(new Error('请添加图片！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
            }

        }
    },
    mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        // console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllToolStorage(this.workshop)
        this.getAllArea(this.workshop)
    },
    methods: {
        exportToExcel(){
            let that=this
            that.$exportToExcel(that.tableData,'设备维修申请记录.xlsx')
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
            console.log('handleChange', uploadFile, uploadFiles)
            this.singleTool.files = uploadFiles
            // console.log(this.singleTool.files)
        },
        handlePictureCardPreview(file) {
            console.log(file)
            this.imgDialogVisible = true;
            this.dialogImageUrl = file.url;

        },
        handleRemove(uploadFile, uploadFiles) {
            console.log('handleRemove', uploadFile, uploadFiles)
            this.singleTool.files = uploadFiles
            let that = this
            if (uploadFile.status == 'success') {
                this.$api.equipmentAPI.deleteApplyImg({ imgPath: uploadFile.imgName })
                    .then(function (res) {
                        if (res.data.code == 1) {
                            that.$message.success('删除维修申请照片成功！')

                        } else {
                            that.$message.error(res.data.msg)
                        }

                    }

                    )
                    .catch(function (err) {
                        console.log(err)
                    }

                    )
            }

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
        getAllToolStorage(workshop) {
            let that = this
            // console.log(workshop_id)
            this.$api.equipmentAPI.getAllMaintainApply({ workshop: workshop })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('获取维修申请成功！')
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
        //展示全部库存按钮实现
        getAllData() {
            this.toolName = null
            this.getAllToolStorage(this.workshop)
        },
        //拼接得到图片路径
        getFullImageUrl(baseUrl, imgPath) {
            return `${baseUrl}${imgPath}`;
        },
        //详情按钮
        detailBtn(row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "维修申请详情"
            this.singleTool = JSON.parse(JSON.stringify(row));
            this.imageUrl = this.baseUrl + 'media/' + this.singleTool.apply_imgs[0]
            console.log(this.imageUrl)
            this.srcList = this.singleTool.apply_imgs.map(
                img => { return this.baseUrl + 'media/' + img }
            )
        },
        //更新申请
        updateBtn(row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "维修申请更新"
            this.isEdit = true
            this.singleTool = JSON.parse(JSON.stringify(row));
            this.singleTool.apply_imgs.forEach(item => {
                this.fileList.push({
                    url: this.baseUrl + 'media/' + item,
                    imgName: item
                })
            })
            this.singleTool.files = this.fileList

        },
        //TPM批准按钮
        approveBtn() {
            console.log(this.singleTool)
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 6).then(
                res => {
                    if (res) {
                        that.$refs.dialogForm.validate(async (valid) => {
                            if (valid) {
                                that.$api.equipmentAPI.TPMApproveMaintainApply({ singleTool: that.singleTool, userId: JSON.parse(sessionStorage.getItem('userInfo')).key.id })
                                    .then(function (res) {
                                        console.log(res)
                                        if (res.data.code == 1) {
                                            that.$message.success('TPM审批成功！')
                                            that.cancelDialog()
                                            that.getAllToolStorage(that.workshop)
                                        } else {
                                            that.$message.error(res.data.msg)
                                        }

                                    }
                                    ).catch(function (err) {
                                        console.log(err)
                                    })
                            }
                        })
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
        deleteBtn() {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 6).then(
                res => {
                    if (res) {
                        that.$api.equipmentAPI.deleteMaintainApply({ singleTool: that.singleTool })
                            .then(function (res) {
                                // console.log(res)
                                if (res.data.code == 1) {
                                    that.$message.success('申请删除成功！')
                                    that.cancelDialog()
                                    that.getAllToolStorage(that.workshop)
                                } else {
                                    that.$message.error(res.data.msg)
                                }

                            }
                            ).catch(function (err) {
                                console.log(err)
                            })
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
            // that.$refs.dialogForm.resetFields();
            Object.keys(that.singleTool).forEach(key => {
                that.singleTool[key] = null; // 或者使用 undefined
            });

            that.applyRow = {}
            this.dialogFormVisible = false
            that.imageUrl = null
            that.srcList = []
            this.isEdit = false
            // that.$refs.upload.clearFiles();
            that.fileList = []
            that.applyRow = {}

        },
        //添加新工具
        lostBtn(row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "丢失申请"
            this.isEdit = false
            this.singleTool = JSON.parse(JSON.stringify(row));
            this.quantityLabel = '丢失数量：'
            this.applyRow = row
        },
        //弹出框取消按钮
        cancelDialog() {

            this.cleanDialog()
        },
        //弹出框确定按钮
        submitDialog() {

            let that = this
            console.log('提交数据', that.singleTool)
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 6).then(
                res => {
                    if (res) {
                        that.$refs.dialogForm.validate(
                            async (valid) => {
                                if (valid) {
                                    let fileReq = new FormData()
                                    fileReq.append('faultDetail', JSON.stringify(that.singleTool))
                                    that.singleTool.files.forEach((ele) => {
                                        fileReq.append('avatar', ele.raw)
                                    })
                                    fileReq.append('userId', JSON.parse(sessionStorage.getItem('userInfo')).key.id)
                                    that.$api.equipmentAPI.updateMaintainApply(fileReq)
                                        .then(res => {
                                            if (res.data.code == 1) {
                                                that.$message.success(res.data.msg)
                                                that.cancelDialog()
                                                that.getAllToolStorage(JSON.parse(sessionStorage.getItem('userInfo')).key.workshop)
                                            } else {
                                                that.$message.error(res.data.msg)
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            that.$message.error('上传图片失败！')
                                        })
                                }
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

.image-box {
    display: flex;
    flex-direction: row;
}

.image-container {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    // margin-bottom: 10px;
    /* 每个图片容器之间的间距 */
    flex-direction: column;
}

.image-preview {
    margin-right: 10px;
    /* 图片与按钮之间的间距 */
    flex-shrink: 0;
    /* 防止图片被压缩 */
    /* 根据需要设置图片的最大宽度 */
    max-width: 200px;
    /* 示例值 */
    height: auto;
    /* 保持图片原始宽高比 */
}

.button-group {
    display: flex;
    align-items: center;
    /* 垂直居中按钮 */
}
</style>
