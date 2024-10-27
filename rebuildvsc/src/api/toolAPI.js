import request from '../utils/request'

const toolAPI = {
    getAllToolStorage(data) {   //获取所有耗材库存
        return request({
            method: 'POST',
            url: '/tool/',
            data
        })
    },
    querySingleStorage(data){   //获取单个耗材库存
        return request({
            method: 'POST',
            url: '/tool/single_tool_storage/',
            data
        })
    },
    addOutboundApply(data){     //提交出库申请
        return request({
            method: 'POST',
            url: '/tool/add_outbound_apply/',
            data
        })
    },
    editTool(data){     //编辑老工具
        return request({
            method: 'POST',
            url: '/tool/edit_tool/',
            data
        })
    },
    addNewTool(data){     //添加新耗材
        return request({
            method: 'POST',
            url: '/tool/add_new_tool/',
            data
        })
    },
    inboundTool(data){     //耗材补库
        return request({
            method: 'POST',
            url: '/tool/inbound_tool/',
            data
        })
    },
    queryOutboundToolApply(data){   //获取所有未被审批的出库申请
        return request({
            method: 'POST',
            url: '/tool/get_need_approve_outbound/',
            data
        })
    },
    approveOutbound(data){   //批准出库
        return request({
            method: 'POST',
            url: '/tool/approve_outbound/',
            data
        })
    },
    deleteApply(data){   //删除出库申请
        return request({
            method: 'POST',
            url: '/tool/delete_apply/',
            data
        })
    },
    getInbound(data){   //获取所有入库记录
        return request({
            method: 'POST',
            url: '/tool/get_all_inbound/',
            data
        })
    },
    deteleInbound(data){   //删除入库记录
        return request({
            method: 'POST',
            url: '/tool/delete_inbound/',
            data
        })
    },
    getOutbound(data){   //获取已批准的出库记录
        return request({
            method: 'POST',
            url: '/tool/get_all_outbound_approve/',
            data
        })
    },
    deleteOutbound(data){   //删除已批准的出库记录
        return request({
            method: 'POST',
            url: '/tool/delete_outbound/',
            data
        })
    },
    getPersonalTool(data){    //获取个人名下工具
        return request({
            method: 'POST',
            url: '/tool/get_personal_tool/',
            data
        })
    },
    uploadScrapImg(img){     //上传报废照片
        return request({
            method: 'POST',
            url: '/tool/upload_scrap_img/',
            data:img
        })
    },
    scrapApply(data){     //上传报废申请
        return request({
            method: 'POST',
            url: '/tool/scrap_apply/',
            data
        })
    },
    toolLost(data){     //上传丢失记录
        return request({
            method: 'POST',
            url: '/tool/tool_lost/',
            data
        })
    },
    getScrapApply(data){     //获取所有需要TPM审批的报废申请
        return request({
            method: 'POST',
            url: '/tool/get_scrap_apply/',
            data
        })
    },
    scrapTPMapprove(data){      //TPM批准报废申请
        return request({
            method: 'POST',
            url: '/tool/scrap_TPM_approve/',
            data
        })
    },
    deleteScrapApply(data){    //删除报废申请
        return request({
            method: 'POST',
            url: '/tool/scrap_TPM_delete/',
            data
        })
    },
    scrapTPMapply(data){    //获取所有需要终审批的报废申请
        return request({
            method: 'POST',
            url: '/tool/get_TPM_scrap_apply/',
            data
        })
    },
    scrapFinalApprove(data){   //报废终审批
        return request({
            method: 'POST',
            url: '/tool/scrap_final_approve/',
            data
        })
    },
    deleteTPMapprove(data){   //删除TPM申请
        return request({
            method: 'POST',
            url: '/tool/scrap_final_delete/',
            data
        })
    },
    getScrapRecord(data){   //获取报废记录
        return request({
            method: 'POST',
            url: '/tool/scrap_record/',
            data
        })
    },
    getLostRecord(data){   //获取报废记录
        return request({
            method: 'POST',
            url: '/tool/lost_record/',
            data
        })
    },
    deleteLostRecord(data){   //删除报废记录
        return request({
            method: 'POST',
            url: '/tool/lost_record_delete/',
            data
        })
    },
    getPersonLostRecord(data){   //删除报废记录
        return request({
            method: 'POST',
            url: '/tool/person_lost_record/',
            data
        })
    }
}

export default toolAPI