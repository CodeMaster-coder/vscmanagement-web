import request from '../utils/request'

const userAPI = {
    loginAPI(data) {
        return request({   //用户登录
            method: 'POST',
            url: '/user/authenticate_user/',
            data
        })
    },
    checkAuth(data) {
        return request({   //用户确权
            method: 'POST',
            url: '/user/check_auth/',
            data
        })
    },
    getAllUser() {
        return request({   //获取所有用户信息
            method: 'POST',
            url: '/user/get_all_user/',
        })
    },
    getSingleUser(data) {    //获取单个用户信息
        return request({
            method: 'POST',
            url: '/user/get_single_user/',
            data
        })
    },
    getAllWorkshop() {    //获取所有部门信息
        return request({
            method: 'POST',
            url: '/user/get_all_wokshop/',
        })
    },
    getAllAuth() {
        return request({   //获取所有权限信息
            method: 'POST',
            url: '/user/get_all_auth/',
        })
    },
    updateUser(data) {     //更新用户信息
        return request({
            method: 'POST',
            url: '/user/update_user/',
            data
        })
    },
    deleteUser(data) {   //删除用户
        return request({
            method: 'POST',
            url: '/user/delete_user/',
            data
        })
    },
    userRegister(data) {   //用户注册
        return request({
            method: 'POST',
            url: '/user/user_register/',
            data
        })
    },
    resetPassword(data) {   //密码重置
        return request({
            method: 'POST',
            url: '/user/password_reset/',
            data
        })
    },
    getNeedApproveUser() {   //获取所有需要审批的用户
        return request({
            method: 'POST',
            url: '/user/get_need_approve_user/',
        })
    },
}

export default userAPI