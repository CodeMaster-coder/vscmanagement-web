import request from '../utils/request'

const sparepartAPI = {
    getAllSparepartStorag(data) {   //获取所有备件库存
        return request({
            method: 'POST',
            url: '/sparepart/',
            data
        })
    },
    querySingleStorage(data){   //获取单个备件库存
        return request({
            method: 'POST',
            url: '/sparepart/single_sparepart_storage/',
            data
        })
    },
    addOutboundApply(data){     //提交出库申请
        return request({
            method: 'POST',
            url: '/sparepart/add_outbound_apply/',
            data
        })
    },
    editSparepart(data){     //编辑老备件属性
        return request({
            method: 'POST',
            url: '/sparepart/edit_sparepart/',
            data
        })
    },
    addNewSparepart(data){     //添加新备件
        return request({
            method: 'POST',
            url: '/sparepart/add_new_sparepart/',
            data
        })
    },
    inboundSparepart(data){     //备件补库
        return request({
            method: 'POST',
            url: '/sparepart/inbound_sparepart/',
            data
        })
    },
    queryOutboundSparepartApply(data){   //获取所有未被审批的出库申请
        return request({
            method: 'POST',
            url: '/sparepart/get_need_approve_outbound/',
            data
        })
    },
    approveOutbound(data){   //批准出库
        return request({
            method: 'POST',
            url: '/sparepart/approve_outbound/',
            data
        })
    },
    deleteApply(data){   //删除出库申请
        return request({
            method: 'POST',
            url: '/sparepart/delete_apply/',
            data
        })
    },
    getInbound(data){   //获取所有入库记录
        return request({
            method: 'POST',
            url: '/sparepart/get_all_inbound/',
            data
        })
    },
    deteleInbound(data){   //删除入库记录
        return request({
            method: 'POST',
            url: '/sparepart/delete_inbound/',
            data
        })
    },
    getOutbound(data){   //获取已批准的出库记录
        return request({
            method: 'POST',
            url: '/sparepart/get_all_outbound_approve/',
            data
        })
    },
    deleteOutbound(data){   //删除已批准的出库记录
        return request({
            method: 'POST',
            url: '/sparepart/delete_outbound/',
            data
        })
    }
}

export default sparepartAPI