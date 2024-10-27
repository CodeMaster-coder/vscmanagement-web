import request from '../utils/request'

const materialAPI = {
    getAllMaterialStorag(data) {   //获取所有耗材库存
        return request({
            method: 'POST',
            url: '/blog/',
            data
        })
    },
    querySingleStorage(data){   //获取单个耗材库存
        return request({
            method: 'POST',
            url: '/blog/single_material_storage/',
            data
        })
    },
    addOutboundApply(data){     //提交出库申请
        return request({
            method: 'POST',
            url: '/blog/add_outbound_apply/',
            data
        })
    },
    editMaterial(data){     //编辑老耗材
        return request({
            method: 'POST',
            url: '/blog/edit_material/',
            data
        })
    },
    addNewMaterial(data){     //添加新耗材
        return request({
            method: 'POST',
            url: '/blog/add_new_material/',
            data
        })
    },
    inboundMaterial(data){     //耗材补库
        return request({
            method: 'POST',
            url: '/blog/inbound_material/',
            data
        })
    },
    queryOutboundMaterialApply(data){   //获取所有未被审批的出库申请
        return request({
            method: 'POST',
            url: '/blog/get_need_approve_outbound/',
            data
        })
    },
    approveOutbound(data){   //批准出库
        return request({
            method: 'POST',
            url: '/blog/approve_outbound/',
            data
        })
    },
    deleteApply(data){   //删除出库申请
        return request({
            method: 'POST',
            url: '/blog/delete_apply/',
            data
        })
    },
    getInbound(data){   //获取所有入库记录
        return request({
            method: 'POST',
            url: '/blog/get_all_inbound/',
            data
        })
    },
    deteleInbound(data){   //删除入库记录
        return request({
            method: 'POST',
            url: '/blog/delete_inbound/',
            data
        })
    },
    getOutbound(data){   //获取已批准的出库记录
        return request({
            method: 'POST',
            url: '/blog/get_all_outbound_approve/',
            data
        })
    },
    deleteOutbound(data){   //删除已批准的出库记录
        return request({
            method: 'POST',
            url: '/blog/delete_outbound/',
            data
        })
    }
}

export default materialAPI