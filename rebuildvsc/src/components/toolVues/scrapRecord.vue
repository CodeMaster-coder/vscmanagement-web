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
                            <el-table border size="mini" :row-style="{ height: '0' }" :data="pageData" width='100%'>
                                <el-table-column
                                    prop="apply_record__TPM_apply_record__approve_record__apply_record__tool__name"
                                    label="工具名称" align="center" min-width='17.5%'>
                                </el-table-column>
                                <el-table-column
                                    prop="apply_record__TPM_apply_record__approve_record__apply_record__tool__type"
                                    label="工具型号" align="center" min-width='17.5%'>
                                </el-table-column>
                                <el-table-column
                                    prop="apply_record__TPM_apply_record__approve_record__apply_record__tool__unit"
                                    label="单位" align="center" min-width='5%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__TPM_apply_record__apply_quantity" label="申请数量"
                                    align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__TPM_apply_record__apply_date" label="申请时间"
                                    align="center" min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__TPM_approve_date" label="TPM批准时间" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__TPM_approve_comments" label="TPM批准备注"
                                    align="center" min-width='20%'>
                                </el-table-column>
                                <el-table-column prop="apply_record__TPM_approve_date" label="终批准时间" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column prop="approve_username__name" label="终批准人" align="center"
                                    min-width='9%'>
                                </el-table-column>
                                <el-table-column label="操作" size="mini" align="center" min-width='9%'>
                                    <template slot-scope="scope">
                                        <el-button type="primary" icon="el-icon-more-outline" size="mini"
                                            @click="detailBtn(scope.row)">
                                            详情
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
                                        <el-input :disabled="true"
                                            v-model="singleTool.apply_record__TPM_apply_record__approve_record__apply_record__tool__name"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="工具型号：" :label-width="formLabelWidth">
                                        <el-input :disabled="true"
                                            v-model="singleTool.apply_record__TPM_apply_record__approve_record__apply_record__tool__type"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="单位：" :label-width="formLabelWidth">
                                        <el-input :disabled="true"
                                            v-model="singleTool.apply_record__TPM_apply_record__approve_record__apply_record__tool__unit"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="出库时间：" :label-width="formLabelWidth">
                                        <el-input :disabled="true"
                                            v-model.number="singleTool.apply_record__TPM_apply_record__approve_record__approve_date"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="批准出库人：" :label-width="formLabelWidth">
                                        <el-input
                                            v-model.number="singleTool.apply_record__TPM_apply_record__approve_record__approve_username__name"
                                            :disabled="true" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请报废数量：" :label-width="formLabelWidth">
                                        <el-input :disabled="true"
                                            v-model.number="singleTool.apply_record__TPM_apply_record__apply_quantity"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请报废时间：" :label-width="formLabelWidth">
                                        <el-input :disabled="true"
                                            v-model.number="singleTool.apply_record__TPM_apply_record__apply_date"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请报废人：" :label-width="formLabelWidth">
                                        <el-input
                                            v-model.number="singleTool.apply_record__TPM_apply_record__approve_record__apply_record__apply_userName__name"
                                            :disabled="true" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="终审批时间：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" v-model.number="singleTool.approve_date"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="终审批人：" :label-width="formLabelWidth">
                                        <el-input v-model.number="singleTool.approve_username__name" :disabled="true"
                                            autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请报废备注：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" type="textarea"
                                            v-model="singleTool.apply_record__TPM_apply_record__apply_comments"
                                            :rows="8" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="申请报废图片：" :label-width="formLabelWidth">

                                        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                                        <div class="demo-image__preview">
                                            <el-image style="width: 180px; height: 180px" :src="imageUrl"
                                                :preview-src-list="srcList">
                                            </el-image>
                                        </div>

                                    </el-form-item>
                                    <el-form-item label="TPM批准备注：" :label-width="formLabelWidth">
                                        <el-input :disabled="true" type="textarea"
                                            v-model="singleTool.apply_record__TPM_approve_comments" :rows="8"
                                            autocomplete="off"></el-input>
                                    </el-form-item>


                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteBtn()">
                                        删除
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
            singleTool: {
                TPMapproveComments: null
            },
            rules: {
                TPMapproveComments: [
                    { required: true, message: '审批备注不能为空！', trigger: 'blur' },
                ],
            }

        }
    },
    mounted() {
        this.userId = JSON.parse(sessionStorage.getItem('userInfo')).key.id;
        console.log(JSON.parse(sessionStorage.getItem('userInfo')).key)
        this.getAllToolStorage(this.userId)
    },
    methods: {
        exportToExcel(){
            let that=this
            that.$exportToExcel(that.tableData,'工具报废记录.xlsx')
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
        getAllToolStorage(userId) {
            let that = this
            // console.log(workshop_id)
            this.$api.toolAPI.getScrapRecord({ workshopId: JSON.parse(sessionStorage.getItem('userInfo')).key.workshop })
                .then(function (res) {
                    if (res.data.code == 1) {
                        that.$message.success('获取报废工具成功！')
                        that.tableData = res.data.data
                        console.log(that.tableData)
                        //获取返回记录的总行数
                        that.dataTotalLength = res.data.data.length
                        //获取当前页的数据
                        that.getPagesToolStorage()
                        // that.allToolName = res.data.data.map(item => {
                        //     return {
                        //         value: item.tool__name
                        //     };
                        // });
                        // that.allToolName = res.data.data.map(item => item.tool__name)
                        // console.log(that.allToolName)
                    } else {
                        console.log(res.data.msg)
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
            this.dialogFormVisible = true;
            this.dialogTitle = "报废详情"
            this.singleTool = JSON.parse(JSON.stringify(row));
            this.imageUrl = this.baseUrl + 'media/' + this.singleTool.apply_record__TPM_apply_record__apply_img
            console.log(this.imageUrl)
            this.srcList.push(this.imageUrl)
        },
        //TPM批准按钮
        approveBtn() {
            console.log(this.singleTool)
            let that = this
            that.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    that.$api.toolAPI.scrapFinalApprove({ singleTool: that.singleTool, userId: that.userId })
                        .then(function (res) {
                            console.log(res)
                            if (res.data.code == 1) {
                                that.$message.success('报废终审批成功！')
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
            this.$checkUserAuth(JSON.parse(sessionStorage.getItem('userInfo')).key.id, 5).then(
                res => {
                    if (res) {
                        that.$api.toolAPI.deleteScrapApply({
                            singleTool: {
                                id: that.singleTool.apply_record__TPM_apply_record__id,
                                approve_record__apply_record__id: that.singleTool.apply_record__TPM_apply_record__approve_record__apply_record__id,
                                apply_quantity: that.singleTool.apply_record__TPM_apply_record__apply_quantity,
                                apply_img: that.singleTool.apply_record__TPM_apply_record__apply_img
                            }
                        })
                            .then(function (res) {
                                // console.log(res)
                                if (res.data.code == 1) {
                                    that.$message.success('报废记录删除成功！')
                                    that.cancelDialog()
                                    that.getAllToolStorage(that.userId)
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
            that.$refs.dialogForm.resetFields();
            Object.keys(that.singleTool).forEach(key => {
                that.singleTool[key] = null; // 或者使用 undefined
            });

            that.applyRow = {}
            this.dialogFormVisible = false
            that.imageUrl = null
            that.srcList = []
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
        //选择图片后点击确定
        imgUploadPost(file) {
            let that = this
            //定义一个formdata类
            let fileReq = new FormData()
            //把照片传进去
            fileReq.append('avatar', file.file)
            that.$api.toolAPI.uploadScrapImg(fileReq)
                .then(res => {
                    console.log(res)
                    if (res.data.code == 1) {
                        //把照片给image
                        that.singleTool.image = res.data.name
                        //拼接imageUrl
                        that.singleTool.imageUrl = that.baseUrl + "media/" + res.data.name;
                        console.log(that.baseUrl + "media/" + res.data.name)
                        this.$forceUpdate() // 触发强制刷新
                        that.tempSrapImg.push(res.data.name)
                    } else {
                        that.$message.error(res.data.msg)
                    }
                })
                .catch(err => {
                    console.log(err)
                    that.$message.error('上传图片失败！')
                })
        },
        //弹出框确定按钮
        submitDialog() {
            console.log(this.applyRow)
            let that = this
            that.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    if (that.isEdit) {
                        // 步骤 1: 去重  
                        let uniqueTempSrapImg = [...new Set(that.tempSrapImg)];

                        // 步骤 2: 移除特定元素  
                        let filteredTempSrapImg = uniqueTempSrapImg.filter(item => item !== that.singleTool.image);
                        console.log(filteredTempSrapImg)
                        this.$api.toolAPI.scrapApply({ outboundApproveId: that.applyRow.id, singleTool: that.singleTool, nousedImgList: filteredTempSrapImg, outboundApplyId: that.applyRow.apply_record__id })
                            .then(function (res) {
                                console.log(res)
                                if (res.data.code == 1) {
                                    that.$message.success('报废申请提交成功！')
                                    that.cancelDialog()
                                    that.getAllToolStorage(that.userId)
                                } else {
                                    that.$message.error(res.data.msg)
                                }

                            }
                            ).catch(function (err) {
                                console.log(err)
                            })
                    } else {
                        this.$api.toolAPI.toolLost({ singleTool: that.singleTool, outboundApproveId: that.applyRow.id, outboundApplyId: that.applyRow.apply_record__id })
                            .then(function (res) {
                                if (res.data.code == 1) {
                                    that.$message.success(res.data.msg)
                                    that.cancelDialog()
                                    that.getAllToolStorage(that.userId)
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
