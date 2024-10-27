import editOldUser from '../components/userVues/editOldUser.vue'
import userApprove from '../components/userVues/userApprove.vue'


const router = [
    {
        name:'userApprove',
        path:'/userVues/userApprove',
        component:userApprove,
        name:'用户审批',
        meta:{title:'用户审批'}
    },
    {
        name:'editOldUser',
        path:'/userVues/editOldUser',
        component:editOldUser,
        name:'编辑老用户',
        meta:{title:'编辑老用户'}
    },
]


export default router