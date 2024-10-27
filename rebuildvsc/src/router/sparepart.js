import { name } from 'file-loader'
import storage from '../components/sparepartVues/storage.vue'
import inbound from '../components/sparepartVues/inbound.vue'
import outbound from '../components/sparepartVues/outbound.vue'
import inboundRecord from '../components/sparepartVues/inboundRecord.vue'
import outboundRecord from '../components/sparepartVues/outboundRecord.vue'


const router = [
    {
        name:'sparepartStorage',
        path:'/sparepart/sparepartStorage',
        component:storage,
        name:'备件库存',
        meta:{title:'备件库存'}
    },
    {
        name:'sparepartInbound',
        path:'/sparepart/sparepartInbound',
        component:inbound,
        name:'备件补库',
        meta:{title:'备件补库'}
    },
    {
        name:'sparepartOutbound',
        path:'/sparepart/sparepartOutbound',
        component:outbound,
        name:'备件出库',
        meta:{title:'备件出库'} 
    },
    {
        name:'inboundRecord',
        path:'/sparepart/inboundRecord',
        component:inboundRecord,
        name:'入库记录',
        meta:{title:'入库记录'} 
    },
    {
        name:'outboundRecord',
        path:'/sparepart/outboundRecord',
        component:outboundRecord,
        name:'出库记录',
        meta:{title:'出库记录'} 
    }

]


export default router