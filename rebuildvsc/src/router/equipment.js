import { name } from 'file-loader'
import storage from '../components/equipmentVues/storage.vue'
import maintainStatus from '../components/equipmentVues/maintainStatus.vue'
import maintainApply from '../components/equipmentVues/maintainApply.vue'
import maintainConfirm from '../components/equipmentVues/maintainConfirm.vue'
import maintainRecord from '../components/equipmentVues/maintainRecord.vue'



const router = [
    {
        name:'equipmentStorage',
        path:'/equipment/equipmentStorage',
        component:storage,
        name:'设备库存',
        meta:{title:'设备库存'}
    },
    {
        name:'maintainStatus',
        path:'/equipment/maintainStatus',
        component:maintainStatus,
        name:'设备维修',
        meta:{title:'设备维修'}
    },
    {
        name:'maintainApply',
        path:'/equipment/maintainApply',
        component:maintainApply,
        name:'维修申请',
        meta:{title:'维修申请'}
    },
    {
        name:'maintainConfirm',
        path:'/equipment/maintainConfirm',
        component:maintainConfirm,
        name:'维修确认',
        meta:{title:'维修确认'}
    },
    {
        name:'maintainRecord',
        path:'/equipment/maintainRecord',
        component:maintainRecord,
        name:'维修记录',
        meta:{title:'维修记录'}
    },


]


export default router