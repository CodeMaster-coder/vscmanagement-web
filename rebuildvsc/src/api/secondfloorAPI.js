import request from '../utils/request'

const secondFloorAPI = {
    getAllIdleEquipmentStorag(data) {   //获取所有耗材库存
        return request({
            method: 'POST',
            url: '/secondfloor/',
            data
        })
    },
    getTotalWeight(data) {   //获取所有耗材库存
        return request({
            method: 'POST',
            url: '/secondfloor/get_total_storage_weight/',
            data
        })
    },
    addOutboundApply(data) {   //提交出库申请
        return request({
            method: 'POST',
            url: '/secondfloor/add_outbound_apply/',
            data
        })
    },
    editEquipment(data) {   //编辑老设备属性
        return request({
            method: 'POST',
            url: '/secondfloor/edit_equipment/',
            data
        })
    },
    addInboundApply(data){    //提交入库申请
        return request({
            method: 'POST',
            url: '/secondfloor/inbound_equipment/',
            data
        })
    },
    getInboundApply(data){    //获取入库申请
        return request({
            method: 'POST',
            url: '/secondfloor/get_need_inbound_approve/',
            data
        })
    },
    inboundApprove(data){    //批准入库申请
        return request({
            method: 'POST',
            url: '/secondfloor/approve_inbound/',
            data
        })
    },
    deleteInboundApply(data){    //驳回入库申请
        return request({
            method: 'POST',
            url: '/secondfloor/delete_inbound_apply/',
            data
        })
    },
    getOutboundApply(data){    //获取出库申请
        return request({
            method: 'POST',
            url: '/secondfloor/get_need_outbound_approve/',
            data
        })
    },
    outboundApprove(data){    //批准出库申请
        return request({
            method: 'POST',
            url: '/secondfloor/approve_outbound/',
            data
        })
    },
    deleteOutboundApply(data){    //驳回出库申请
        return request({
            method: 'POST',
            url: '/secondfloor/delete_outbound_apply/',
            data
        })
    },
    getAllInboundApprove(data){    //获取所有已批准的入库记录
        return request({
            method: 'POST',
            url: '/secondfloor/get_all_inbound_approve/',
            data
        })
    },
    deleteInboundRecord(data){    //删除有已批准的入库记录
        return request({
            method: 'POST',
            url: '/secondfloor/delete_inbound/',
            data
        })
    },
    getAllOutboundApprove(data){    //获取所有已批准的出库记录
        return request({
            method: 'POST',
            url: '/secondfloor/get_all_outbound_approve/',
            data
        })
    },
    deleteOutboundRecord(data){    //删除有已批准的出库记录
        return request({
            method: 'POST',
            url: '/secondfloor/delete_outbound/',
            data
        })
    },
}

export default secondFloorAPI