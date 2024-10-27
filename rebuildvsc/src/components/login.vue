<template>
    <div id="app" class="login_container">
        <div class="language-switcher">
            <el-button type="primary" plain @click="changeToZH()">
                中
            </el-button>
            <el-button type="primary" plain @click="changeToEN()">
                en
            </el-button>
        </div>
        <div class="login_box" :style="{ height: currentHeight }">
            <div class="avatar_box">
                <img src="../assets/vsc.png" alt="">
                <div class="title">{{ title }}</div>
            </div>

            <el-form ref="loginFormRef" label-width="80px" class="login_form" :model="loginForm"
                :rules="loginFormRules">
                <el-form-item label-width="140px" :label="$t('messages.login.username')" prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="register" label-width="140px" label="邮箱" prop="email">
                    <el-input v-model="loginForm.email" prefix-icon="el-icon-message" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="register" label="部门" label-width="140px" prop="workshop__id">
                    <el-select v-model="loginForm.workshop__id" placeholder="请选择部门">
                        <el-option v-for="item in workshopOptions" :key="item.name" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="140px" label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" clearable
                        show-password></el-input>
                </el-form-item>
                <el-form-item v-if="register" label-width="140px" label="再次输入密码" prop="confirmRegisterPassword">
                    <el-input type="password" v-model="loginForm.confirmRegisterPassword" prefix-icon="el-icon-lock"
                        clearable show-password></el-input>
                </el-form-item>
                <el-form-item v-if="resetPassword" label-width="140px" label="新密码" prop="newPassword">
                    <el-input type="password" v-model="loginForm.newPassword" prefix-icon="el-icon-lock" clearable
                        show-password></el-input>
                </el-form-item>
                <el-form-item v-if="resetPassword" label-width="140px" label="再次输入新密码" prop="confirmNewPassword">
                    <el-input type="password" v-model="loginForm.confirmNewPassword" prefix-icon="el-icon-lock"
                        clearable show-password></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button v-if="!register & !resetPassword" type="primary" plain @click="login()">登录</el-button>
                    <el-button v-if="register || resetPassword" type="primary" plain @click="submitBtn()">确认</el-button>
                    <el-button v-if="register || resetPassword" type="primary" plain @click="login()">取消</el-button>
                    <div style="display: flex; flex-direction: row;">
                        <div style="color: #6cc3ff; " @click="loginBtn()">登录</div>
                        <div style="color: #6cc3ff; margin-left: 10px;" @click="registerBtn()">注册</div>
                        <div style="color: #6cc3ff; margin-left: 10px;" @click="resetPasswordBtn()">重置密码</div>
                    </div>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            loginForm: {
                username: '',
                email: '',
                workshop__id: '',
                password: '',
                confirmRegisterPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            },
            loginFormRules: {
                username: [
                    { required: true, message: this.$t('messages.login.inputusername'), trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱！', trigger: 'blur' }
                ],
                workshop__id: [
                    {
                        required: true,
                        validator: (rules, value, callback) => {
                            if (!this.loginForm.workshop__id) {
                                callback(new Error('请选择部门！'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
                password: [
                    { required: true, message: this.$t('messages.login.inputpassword'), trigger: 'blur' }
                ],
                confirmRegisterPassword: [
                    { required: true, validator: this.comparePasswords, trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码！', trigger: 'blur' }
                ],
                confirmNewPassword: [
                    { required: true, validator: this.confirmNewPasswords, trigger: 'blur' }
                ]
            },
            register: false,
            resetPassword: false,
            currentHeight: "350px",
            title: "登录",
            workshopOptions: []

        }
    },
    mounted() {
        this.getAllWorkshop()
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
        //注册密码二次输入确认
        comparePasswords(rule, value, callback) {
            if (this.register && value !== this.loginForm.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        },
        //重置密码二次输入确认
        confirmNewPasswords(rule, value, callback) {
            if (this.resetPassword && value !== this.loginForm.newPassword) {
                callback(new Error('两次输入的新密码不一致'));
            } else {
                callback();
            }
        },
        //重置登陆表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
            // this.$api.materialAPI.querySingleStorage({"material__name":'透明双面胶'}).then(function(res){
            //     console.log(res)
            // })
        },
        registerBtn() {
            this.register = true
            this.resetPassword = false
            this.currentHeight = "550px"
            this.title = "注册"
            // console.log((!this.register) & (!this.resetPassword))
        },
        resetPasswordBtn() {
            this.resetPassword = true
            this.register = false
            this.currentHeight = "500px"
            this.title = "重置密码"

        },
        loginBtn() {
            this.resetPassword = false
            this.register = false
            this.currentHeight = "350px"
            this.title = "登录"
        },
        //表单校验
        login() {
            let that = this
            let loginForm = that.loginForm
            that.$refs.loginFormRef.validate(async (valid) => {
                if (valid) {
                    await this.$api.userAPI.loginAPI({ loginForm })
                        .then(function (res) {
                            if (res.data.code == 1) {
                                that.$message.success('登录成功！')

                                // 用户数据储存到sessionStorage中
                                window.sessionStorage.setItem('userInfo', JSON.stringify({ key: res.data.data }))
                                that.$router.push('/home')

                            } 
                            else if(res.data.code == 3){
                                that.$message('用户已存在，请等待审批！')
                            }
                            else {
                                that.$message.error(res.data.msg)
                            }
                        }
                        )
                } else {
                    this.$message.error('请正确输入用户名或密码！')
                }
            });
        },
        //表单清理
        cleanForm(){
            let that = this
            that.$refs.loginFormRef.resetFields();
            Object.keys(that.loginForm).forEach(key => {
                that.loginForm[key] = null; // 或者使用 undefined
            });
        },
        //表单提交
        submitBtn() {
            let that = this
            console.log(this.loginForm)
            that.$refs.loginFormRef.validate((valid) => {
                if (valid) {
                    if (that.register) {
                        that.$api.userAPI.userRegister({userInfo: that.loginForm})
                            .then(
                                function (res) {
                                    if (res.data.code == 1) {
                                        that.$message.success('注册成功，请耐心等待审批通过！')
                                        that.cleanForm()
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
                    }
                    else{
                        that.$api.userAPI.resetPassword({userInfo: that.loginForm})
                            .then(
                                function (res) {
                                    if (res.data.code == 1) {
                                        that.$message.success('密码重置成功！')
                                        that.cleanForm()
                                    }
                                    else {
                                        that.$message.error(res.data.msg)
                                        console.log(res.data)
                                    }
                                }
                            )
                            .catch(function (err) {
                                console.log(err)
                            }

                            )
                    }
                }
            })
        },
        changeToZH() {
            localStorage.setItem("locale", "zh");
            this.$i18n.locale = localStorage.getItem("locale");
            this.$refs.loginFormRef.resetFields()
            this.$message({
                message: "切换为中文！",
                type: "success"
            });
        },
        changeToEN() {
            localStorage.setItem("locale", "en");
            this.$i18n.locale = localStorage.getItem("locale");
            this.$refs.loginFormRef.resetFields()
            this.$message({
                message: "Change to english！",
                type: "success"
            });
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 450px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }

        .title {
            margin-top: 10px;
            margin-bottom: 20px;
            font-size: 24px;
            color: #001d50;
            margin-bottom: 20px;
            text-align: center;
        }

    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.language-switcher {
    position: absolute;
    top: 10px;
    /* 根据需要调整 */
    right: 10px;
    /* 根据需要调整 */
}
</style>