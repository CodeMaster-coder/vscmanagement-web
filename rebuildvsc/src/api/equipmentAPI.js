import request from '../utils/request'

const equipmentAPI = {
    getAllEquipmentlStorag(data) {   //获取所有设备库存
        return request({
            method: 'POST',
            url: '/equipment/',
            data
        })
    },
    getSingleEquipmentlStorag(data) {   //获取单个设备库存
        return request({
            method: 'POST',
            url: '/equipment/get_single_equipment/',
            data
        })
    },
    getAllArea(data) {   //获取所有区域
        return request({
            method: 'POST',
            url: '/equipment/get_area/',
            data
        })
    },
    uploadFaultDetail(data) {   //上传故障详情
        return request({
            method: 'POST',
            url: '/equipment/upload_fault_detail/',
            data
        })
    },
    editEquipment(data) {   //编辑设备属性
        return request({
            method: 'POST',
            url: '/equipment/edit_equipment/',
            data
        })
    },
    getAllMaintainApply(data) {   //获取所有维修申请
        return request({
            method: 'POST',
            url: '/equipment/get_all_maintain_apply/',
            data
        })
    },
    deleteMaintainApply(data){    //删除维修申请
        return request({
            method: 'POST',
            url: '/equipment/delete_maintain_apply/',
            data
        })
    },
    TPMApproveMaintainApply(data){    //批准维修申请
        return request({
            method: 'POST',
            url: '/equipment/TPM_approve_apply/',
            data
        })
    },
    deleteApplyImg(data){   //删除维修申请照片
        return request({
            method: 'POST',
            url: '/equipment/delete_apply_img/',
            data
        })
    },
    updateMaintainApply(data){   //更新维修申请
        return request({
            method: 'POST',
            url: '/equipment/update_maintain_apply/',
            data
        })
    },
    getAllMaintainStatus(data){   //获取维修状态
        return request({
            method: 'POST',
            url: '/equipment/get_all_maintain_status/',
            data
        })
    },
    updateMaintainStatus(data){   //更新维修状态
        return request({
            method: 'POST',
            url: '/equipment/update_maintain_status/',
            data
        })
    },
    getAllFinishMaintain(data){   //获取所有结束的维修
        return request({
            method: 'POST',
            url: '/equipment/get_all_finish_maintain/',
            data
        })
    },
    approveMaintainFinish(data){   //审批结束的维修
        return request({
            method: 'POST',
            url: '/equipment/confirm_maintain_finished/',
            data
        })
    },
    rejectMaintainFinish(data){   //驳回结束的维修
        return request({
            method: 'POST',
            url: '/equipment/reject_maintain_finished/',
            data
        })
    },
    getAllConfirmMaintain(data){   //获取所有已确认的维修记录
        return request({
            method: 'POST',
            url: '/equipment/get_all_confirm_finish_maintain/',
            data
        })
    },
    deleteConfirmMaintain(data){   //删除已确认的维修记录
        return request({
            method: 'POST',
            url: '/equipment/delete_confirm_finish_maintain/',
            data
        })
    },

}

export default equipmentAPI