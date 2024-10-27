import { name } from 'file-loader'
import storage from '../components/materialVues/storage.vue'
import inbound from '../components/materialVues/inbound.vue'
import outbound from '../components/materialVues/outbound.vue'
import inboundRecord from '../components/materialVues/inboundRecord.vue'
import outboundRecord from '../components/materialVues/outboundRecord.vue'



const router = [
    {
        path:'/material/materialStorage',
        component:storage,
        
        name:'耗材库存',
        meta:{componentName:'storage',title:'耗材库存'}
    },
    {
        name:'materialInbound',
        path:'/material/materialInbound',
        component:inbound,
        componentName:'inbound',
        name:'耗材补库',
        meta:{title:'耗材补库'}
    },
    {
        name:'materialOutbound',
        path:'/material/materialOutbound',
        component:outbound,
        componentName:'outbound',
        name:'耗材出库',
        meta:{title:'耗材出库'} 
    },
    {
        name:'inboundRecord',
        path:'/material/inboundRecord',
        component:inboundRecord,
        componentName:'inboundRecord',
        name:'入库记录',
        meta:{title:'入库记录'} 
    },
    {
        name:'outboundRecord',
        path:'/material/outboundRecord',
        component:outboundRecord,
        componentName:'outboundRecord',
        name:'出库记录',
        meta:{title:'出库记录'} 
    }

]




export default router