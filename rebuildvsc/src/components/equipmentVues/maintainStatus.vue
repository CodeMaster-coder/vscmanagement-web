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
                                        <el-form-item>
                                            <el-button type="primary" plain
                                                @click="getAllToolStorage(workshop = 1)">EVKB</el-button>
                                            <el-button type="primary" plain
                                                @click="getAllToolStorage(workshop = 2)">EVKP</el-button>

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
                                <el-table-column prop="apply_record__equipment__name" label="工具名称" align="center"
                                    min-width='23%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__equipment__type" label="工具型号" align="center"
                                    min-width='22%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__equipment__unit" label="单位" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__aplly_quantity" label="申请数量" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__apply_date" label="申请时间" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__problem_detail" label="申请备注" align="center"
                                    min-width='25%'>
                                </el-table-column>
                                <el-table-column prop="maintain_name__name" label="维修人员" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="deadline" label="截止日期" align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column label="操作" size="mini" align="center" min-width='18%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-more-outline" size="mini"
                                            @click="detailBtn(scope.row)">
                                            详情
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
                                        <el-input :disabled="true" v-model="singleTool.apply_record__equipment__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="工具型号：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model="singleTool.apply_record__equipment__type"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="单位：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model="singleTool.apply_record__equipment__unit"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请时间：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model.number="singleTool.apply_record__apply_date"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请人：" :label-width="formLabelWidth">
                                        <el-input v-model.number="singleTool.apply_record__apply_name__name"
                                            :disabled="true" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请维修数量：" :label-width="formLabelWidth">
                                        <el-input :disabled="true"
                                            v-model.number="singleTool.apply_record__aplly_quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="区域：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model.number="singleTool.apply_record__area__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="维修人员：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model="singleTool.maintain_name__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="故障详情：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" type="textarea"
                                            v-model="singleTool.apply_record__problem_detail" :rows="8"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="故障图片：" :label-width="formLabelWidth">
                                        <div class="demo-image__preview">
                                            <el-image style="width: 180px; height: 180px" :src="imageUrl"
                                                :preview-src-list="srcList">
                                            </el-image>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="维修措施：" :label-width="formLabelWidth" prop="solution">
                                        <el-input :disabled="!isEdit" v-model="singleTool.solution" autocomplete="off"
                                            type="textarea" :rows="8"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="!isEdit" label="维修图片：" :label-width="formLabelWidth">
                                        <div class="demo-image__preview">
                                            <el-image style="width: 180px; height: 180px" :src="maintainImageUrl"
                                                :preview-src-list="maintainSrcList">
                                            </el-image>
                                        </div>
                                    </el-form-item>
                                    <el-form-item v-if="isEdit" label="维修图片：" :label-width="formLabelWidth"
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
                                    <el-form-item label="更换备件：" :label-width="formLabelWidth">
                                        <template>
                                            <el-radio :disabled="!isEdit" v-model="singleTool.part_change"
                                                :label="true">是</el-radio>
                                            <el-radio :disabled="!isEdit" v-model="singleTool.part_change"
                                                :label="false">否</el-radio>
                                        </template>
                                    </el-form-item>
                                    <el-form-item label="截止日期：" :label-width="formLabelWidth" prop="deadline">
                                        <div class="block">
                                            <el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                                :disabled="!isEdit" v-model="singleTool.deadline" type="date"
                                                placeholder="选择截止日期">
                                            </el-date-picker>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="是否修复：" :label-width="formLabelWidth">
                                        <template>
                                            <el-radio :disabled="!isEdit" v-model="singleTool.repaired_or_not"
                                                :label="true">是</el-radio>
                                            <el-radio :disabled="!isEdit" v-model="singleTool.repaired_or_not"
                                                :label="false">否</el-radio>
                                        </template>
                                    </el-form-item>
                                    <el-form-item label="修复日期：" :label-width="formLabelWidth" prop="repaired_date">
                                        <div class="block">
                                            <el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                                :disabled="!singleTool.repaired_or_not"
                                                v-model="singleTool.repaired_date" type="date" placeholder="选择修复日期">
                                            </el-date-picker>
                                        </div>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
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
            dialogImageUrl: null,
            dialogTitle: null,//弹出框标题
            quantityLabel: null, // 弹出框数量标签
            isEdit: false,
            imageUrl: "",
            maintainImageUrl: "",
            singleTool: {},
            formLabelWidth: '160px',
            value: '',
            userInfo: {},
            applyRow: {},
            srcList: [],
            fileList: [],
            imgLimit: 5,
            imgDialogVisible: false,
            maintainSrcList: [],
            singleTool: {
                files: [],
                solution: null,
                deadline: null,
                repaired_or_not: null,
                repaired_date: null,
            },
            rules: {
                solution: [
                    { required: true, message: '维修措施不能为空！', trigger: 'blur' },
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
                deadline: [
                    { validator: this.validateDeadline, trigger: 'change' }
                ],
                repaired_date: [
                    { validator: this.validateRepairedDate, trigger: 'change', },

                ],
            }

        }
    },
    mounted() {
        this.workshop = JSON.parse(sessionStorage.getItem('userInfo')).key.workshop;
        // console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllToolStorage(this.workshop)
    },
    methods: {
        exportToExcel(){
            let that=this
            that.$exportToExcel(that.tableData,'设备维修状态(EZ).xlsx')
        },
        //截止日期校验
        validateDeadline(rule, value, callback) {
            if (!value) {
                return callback(new Error('请选择截止日期'));
            }
            // 这里可以添加更复杂的校验逻辑，比如检查日期是否为未来日期  
            const now = new Date();
            const selectedDate = new Date(value);
            if (selectedDate < now) {
                callback(new Error('截止日期不能是过去的日期'));
            } else {
                callback();
            }
        },
        //修复日期校验
        validateRepairedDate(rule, value, callback) {
            const now = new Date();
            const selectedDate = new Date(value);
            // console.log(value,this.singleTool.repaired_or_not)
            if (this.singleTool.repaired_or_not && !value) {
                callback(new Error('修复日期不能为空'));
            } else if (this.singleTool.repaired_or_not && selectedDate < now) {
                callback(new Error('截止日期不能是过去的日期'));
            }
            else {

                callback();
            }
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
            console.log(workshop)
            this.$api.equipmentAPI.getAllMaintainStatus({ workshop: workshop })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('获取申请记录成功！')
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
        //拼接得到图片路径
        getFullImageUrl(baseUrl, imgPath) {
            return `${baseUrl}${imgPath}`;
        },
        //详情按钮
        detailBtn(row) {
            let that = this
            this.dialogFormVisible = true;
            this.dialogTitle = "维修状态详情"
            this.singleTool = JSON.parse(JSON.stringify(row));
            this.imageUrl = this.baseUrl + 'media/' + this.singleTool.apply_record__apply_imgs[0]
            this.srcList = this.singleTool.apply_record__apply_imgs.map(
                img => { return this.baseUrl + 'media/' + img }
            )
            this.maintainImageUrl = that.getImageSrc(that.singleTool.maintain_imgs)
            this.maintainSrcList = that.getPreviewSrcList(that.singleTool.maintain_imgs)
        },
        //拼接得到图片路径
        getImageSrc(imgs) {
            return imgs.length > 0 ? `${this.baseUrl}media/${imgs[0]}` : null;
        },
        getPreviewSrcList(imgs) {
            return imgs.map(img => `${this.baseUrl}media/${img}`);
        },
        //TPM批准按钮
        approveBtn() {
            console.log(this.singleTool)
            let that = this
            that.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    that.$api.toolAPI.scrapTPMapprove({ singleTool: that.singleTool, userId: that.userId })
                        .then(function (res) {
                            console.log(res)
                            if (res.data.code == 1) {
                                that.$message.success('TPM审批成功！')
                                that.cancelDialog()
                                that.getAllToolStorage(that.userId)
                            } else {
                                that.$message.error(res.data.msg)
                            }

                        }
                        ).catch(function (err) {
                            console.log(err)
                        })
                }
            })
        },
        //删除按钮
        deleteBtn() {
            let that = this

            that.$api.toolAPI.deleteScrapApply({ singleTool: that.singleTool })
                .then(function (res) {
                    // console.log(res)
                    if (res.data.code == 1) {
                        that.$message.success('申请删除成功！')
                        that.cancelDialog()
                        that.getAllToolStorage(that.userId)
                    } else {
                        that.$message.error(res.data.msg)
                    }

                }
                ).catch(function (err) {
                    console.log(err)
                })
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
        //更新申请
        updateBtn(row) {
            let that = this
            that.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 6).then(
                res => {
                    if (res) {
                        that.dialogFormVisible = true;
                        that.dialogTitle = "维修申请更新"
                        that.isEdit = true
                        that.singleTool = JSON.parse(JSON.stringify(row));
                        that.imageUrl = that.baseUrl + 'media/' + that.singleTool.apply_record__apply_imgs[0]
                        that.srcList = that.singleTool.apply_record__apply_imgs.map(
                            img => { return that.baseUrl + 'media/' + img }
                        )
                        that.singleTool.maintain_imgs
                            .forEach(item => {
                                that.fileList.push({
                                    url: that.baseUrl + 'media/' + item,
                                    imgName: item
                                })
                            })
                        that.singleTool.files = that.fileList
                    } else {
                        that.$message.error('您没有权限！！！')
                    }
                }
            ).catch(
                function (err) {
                    console.log(err)
                }
            )
            // console.log(this.fileList)

        },
        //弹出框取消按钮
        cancelDialog() {

            this.cleanDialog()
        },
        //弹出框确定按钮
        submitDialog() {

            let that = this
            console.log('提交数据', that.singleTool)
            that.$refs.dialogForm.validate(
                async (valid) => {
                    if (valid) {
                        let fileReq = new FormData()
                        fileReq.append('maintainStatus', JSON.stringify(that.singleTool))
                        that.singleTool.files.forEach((ele) => {
                            fileReq.append('avatar', ele.raw)
                        })
                        fileReq.append('userId', JSON.parse(sessionStorage.getItem('userInfo')).key.id)
                        fileReq.append('workshop', JSON.parse(sessionStorage.getItem('userInfo')).key.workshop)
                        that.$api.equipmentAPI.updateMaintainStatus(fileReq)
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


        },

    },
    watch: {
        'singleTool.repaired_or_not'(newVal) {
            if (!newVal) {
                this.singleTool.repaired_date = null;
            }
        },
    },


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
