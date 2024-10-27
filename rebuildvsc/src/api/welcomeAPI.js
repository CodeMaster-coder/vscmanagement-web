import request from '../utils/request'

const welcomeAPI = {
    getConsumableStatus(data) {
        return request({   //获取耗材状态
            method: 'POST',
            url: '/blog/get_consumable_storage_status/',
            data
        })
    },
    getToolStatus(data) {
        return request({   //获取工具状态
            method: 'POST',
            url: '/tool/get_tool_storage_status/',
            data
        })
    },
    getSparepartStatus(data) {
        return request({   //获取备件状态
            method: 'POST',
            url: '/sparepart/get_sparepart_storage_status/',
            data
        })
    },
    getEquipmentStatus(data) {
        return request({   //获取设备状态
            method: 'POST',
            url: '/equipment/get_equipment_storage_status/',
            data
        })
    },
    getSecondfloorStatus(data) {
        return request({   //获取二层状态
            method: 'POST',
            url: '/secondfloor/get_secondfloor_weight_status/',
            data
        })
    },
}

export default welcomeAPI