import { name } from 'file-loader'
import storage from '../components/toolVues/storage.vue'
import inbound from '../components/toolVues/inbound.vue'
import outbound from '../components/toolVues/outbound.vue'
import inboundRecord from '../components/toolVues/inboundRecord.vue'
import outboundRecord from '../components/toolVues/outboundRecord.vue'
import personalTool from '../components/toolVues/personalTools.vue'
import scrapTPMApprove from '../components/toolVues/scrapTPMApprove.vue'
import scrapFinalApprove from '../components/toolVues/scrapFinalApprove.vue'
import scrapRecord from '../components/toolVues/scrapRecord.vue'
import lostRecord from '../components/toolVues/lostRecord.vue'

const router = [
    {
        name:'toolStorage',
        path:'/tool/toolStorage',
        component:storage,
        name:'工具库存',
        meta:{title:'工具库存'}
    },
    {
        name:'toolInbound',
        path:'/tool/toolInbound',
        component:inbound,
        name:'工具补库',
        meta:{title:'工具补库'}
    },
    {
        name:'toolOutbound',
        path:'/tool/toolOutbound',
        component:outbound,
        name:'工具出库',
        meta:{title:'工具出库'} 
    },
    {
        name:'inboundRecord',
        path:'/tool/inboundRecord',
        component:inboundRecord,
        name:'入库记录',
        meta:{title:'入库记录'} 
    },
    {
        name:'outboundRecord',
        path:'/tool/outboundRecord',
        component:outboundRecord,
        name:'出库记录',
        meta:{title:'出库记录'} 
    },
    {
        name:'personalTool',
        path:'/tool/personalTool',
        component:personalTool,
        name:'个人工具',
        meta:{title:'个人工具'} 
    }
    ,
    {
        name:'scrapTPMApprove',
        path:'/tool/scrapTPMApprove',
        component:scrapTPMApprove,
        name:'工具报废TPM审批',
        meta:{title:'工具报废TPM审批'} 
    },
    {
        name:'scrapFinalApprove',
        path:'/tool/scrapFinalApprove',
        component:scrapFinalApprove,
        name:'工具报废终审批',
        meta:{title:'工具报废终审批'} 
    },
    {
        name:'scrapRecord',
        path:'/tool/scrapRecord',
        component:scrapRecord,
        name:'工具报废记录',
        meta:{title:'工具报废记录'} 
    },
    {
        name:'lostRecord',
        path:'/tool/lostRecord',
        component:lostRecord,
        name:'工具丢失记录',
        meta:{title:'工具丢失记录'} 
    }
]


export default router