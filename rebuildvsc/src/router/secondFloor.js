import { name } from 'file-loader'
import storage from '../components/secondFloor/storage.vue'
import inbound from '../components/secondFloor/inbound.vue'
import inboundApprove from '../components/secondFloor/inboundApprove.vue'
import outboundApprove from '../components/secondFloor/outboundApprove.vue'
import inboundRecord from '../components/secondFloor/inboundRecord.vue'
import outboundRecord from '../components/secondFloor/outboundRecord.vue'


const router = [
    {
        path:'/secondFloor/secondFloorStorage',
        component:storage,
        name:'二层库存',
        meta:{componentName:'storage',title:'二层库存'}
    },
    {
        path:'/secondFloor/secondFloorInbound',
        component:inbound,
        name:'二层入库',
        meta:{componentName:'inbound',title:'二层入库'}
    },
    {
        path:'/secondFloor/inboundApprove',
        component:inboundApprove,
        name:'二层入库审批',
        meta:{componentName:'inboundApprove',title:'二层入库审批'}
    },
    {
        path:'/secondFloor/outboundApprove',
        component:outboundApprove,
        name:'二层出库审批',
        meta:{componentName:'outboundApprove',title:'二层出库审批'}
    },
    {
        path:'/secondFloor/inboundRecord',
        component:inboundRecord,
        name:'二层入库记录',
        meta:{componentName:'inboundRecord',title:'二层入库记录'}
    },
    {
        path:'/secondFloor/outboundRecord',
        component:outboundRecord,
        name:'二层出库记录',
        meta:{componentName:'outboundRecord',title:'二层出库记录'}
    },

]


export default router