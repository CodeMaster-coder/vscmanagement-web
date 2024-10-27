<template>
    <div id="app">
        <el-container>
            <el-container>
                <el-header height="100px">
                    EVK信息管理系统-EVK Consumable & Tool Management
                </el-header>
                <el-container width="100%">
                    <el-aside width="20%">
                        <el-menu active-text-color="#864ae8" default-active="1" class="el-menu-vertical-demo"
                            @open="handleOpen" @close="handleClose" :router="true" @select="handleSelect" >
                            <el-submenu :index='firstItem.path' v-for="firstItem in menuList" :key="firstItem.id" v-if="firstItem.permissionCode ==1 || firstItem.permissionCode == userAuth">
                                <template slot="title" >
                                    <i class="el-icon-s-shop"></i>
                                    <span>{{ $t(firstItem.title) }}</span>
                                </template>
                                <el-submenu :index='secondItem.path' :key="secondItem.id"
                                    v-for="secondItem in firstItem.children" v-if="secondItem.permissionCode ==1 || secondItem.permissionCode == userAuth">
                                    <template slot="title">
                                        {{ $t(secondItem.title) }}
                                    </template>
                                    <!-- 注意这里的引用改为 secondItem.children -->
                                    <el-menu-item :index='thirdItem.path' v-for="thirdItem in secondItem.children"
                                        :key="thirdItem.id" v-if="thirdItem.permissionCode ==1 || thirdItem.permissionCode == userAuth">
                                        {{ $t(thirdItem.title) }}
                                    </el-menu-item>
                                </el-submenu>
                            </el-submenu>
                        </el-menu>
                    </el-aside>
                    <el-container width="80%">
                        <el-main>
                            <div class="breadcrumb-and-lang-switcher">
                                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-part">
                                    <el-breadcrumb-item :to="{ path: '/home' }">首页/mainpage</el-breadcrumb-item>
                                    <el-breadcrumb-item >{{ firstLevel }}</el-breadcrumb-item>
                                    <el-breadcrumb-item>{{ secondLevel }}</el-breadcrumb-item>
                                    <el-breadcrumb-item>{{ thirdLevel }}</el-breadcrumb-item>
                                </el-breadcrumb>
                                <div class="lang-switcher-part">
                                    <el-button type="primary" plain @click="changeToZH()">
                                        中
                                    </el-button>
                                    <el-button type="primary" plain @click="changeToEN()">
                                        en
                                    </el-button>
                                </div>
                            </div>
                            <router-view></router-view>
                        </el-main>
                        <el-footer height="20px">EVK信息管理系统-EVK Consumable & Tool Management | 版本2.0
                            2024-7-24</el-footer>
                    </el-container>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuList: [
                // 菜单栏数组
                {
                    id: 1,
                    title: 'messages.home.consumable',
                    path: '耗材/consumable',
                    permissionCode: 1,
                    children: [
                        {
                            id: 1 - 1,
                            title: 'messages.home.inOutbound',
                            permissionCode: 1,
                            path: '耗材出入库/in/outbound',
                            children: [
                                {
                                    id: '1 - 1 - 1',
                                    title: 'messages.home.storage',
                                    permissionCode: 1,
                                    path: '/material/materialStorage'
                                },
                                {
                                    id: '1 - 1 - 2',
                                    title: 'messages.home.inbound',
                                    permissionCode: 4,
                                    path: '/material/materialInbound'
                                },
                                {
                                    id: '1 - 1 - 3',
                                    title: 'messages.home.outbound',
                                    permissionCode: 1,
                                    path: '/material/materialOutbound'
                                },
                            ]
                        },
                        {
                            id: 1 - 2,
                            title: 'messages.home.record',
                            permissionCode: 1,
                            path: '耗材记录',
                            children: [
                                {
                                    id: '2 - 1 - 1',
                                    title: 'messages.home.inboundRecord',
                                    permissionCode: 1,
                                    path: '/material/inboundRecord'
                                },
                                {
                                    id: '2 - 1 - 2',
                                    title: 'messages.home.outboundRecord',
                                    permissionCode: 1,
                                    path: '/material/outboundRecord'
                                },
                            ]
                        }
                    ]

                },
                {
                    id: 2,
                    title: 'messages.home.tool',
                    permissionCode: 1,
                    path: '工具/tool',
                    children: [
                        {
                            id: 2 - 1,
                            title: 'messages.home.inOutbound',
                            permissionCode: 1,
                            path: '工具出入库/in/outbound',
                            children: [
                                {
                                    id: '2 - 1 - 1',
                                    title: 'messages.home.storage',
                                    permissionCode: 1,
                                    path: '/tool/toolStorage'
                                },
                                {
                                    id: '2 - 1 - 2',
                                    title: 'messages.home.inbound',
                                    permissionCode: 5,
                                    path: '/tool/toolInbound'
                                },
                                {
                                    id: '2 - 1 - 3',
                                    title: 'messages.home.outbound',
                                    permissionCode: 1,
                                    path: '/tool/toolOutbound'
                                },
                                {
                                    id: '2 - 1 - 4',
                                    title: 'messages.home.personalTool',
                                    permissionCode: 1,
                                    path: '/tool/personalTool'
                                },
                            ]
                        },
                        {
                            id: 2 - 2,
                            title: 'messages.home.approve',
                            permissionCode: 1,
                            path: '工具审批/approve',
                            children: [
                                {
                                    id: '2 - 2 - 1',
                                    title: 'messages.home.scrapTPMApprove',
                                    permissionCode: 1,
                                    path: '/tool/scrapTPMApprove'
                                },
                                {
                                    id: '2 - 2 - 2',
                                    title: 'messages.home.scrapFinalApprove',
                                    permissionCode: 1,
                                    path: '/tool/scrapFinalApprove'
                                }
                            ]
                        },
                        {
                            id: 2 - 3,
                            title: 'messages.home.record',
                            permissionCode: 1,
                            path: '工具记录/record',
                            children: [
                                {
                                    id: '2 - 3 - 1',
                                    title: 'messages.home.inboundRecord',
                                    permissionCode: 1,
                                    path: '/tool/inboundRecord'
                                },
                                {
                                    id: '2 - 3 - 2',
                                    title: 'messages.home.outboundRecord',
                                    permissionCode: 1,
                                    path: '/tool/outboundRecord'
                                },
                                {
                                    id: '2 - 3 - 3',
                                    title: 'messages.home.scrapRecord',
                                    permissionCode: 1,
                                    path: '/tool/scrapRecord'
                                },
                                {
                                    id: '2 - 3 - 4',
                                    title: 'messages.home.lostRecord',
                                    permissionCode: 1,
                                    path: '/tool/lostRecord'
                                },
                            ]
                        }
                    ]

                },
                {
                    id: 3,
                    title: 'messages.home.equipment',
                    permissionCode: 1,
                    path: '设备/equipment',
                    children: [
                        {
                            id: 3 - 1,
                            title: 'messages.home.storage',
                            permissionCode: 1,
                            path: '设备库存/storage',
                            children: [
                                {
                                    id: '3 - 1 - 1',
                                    title: 'messages.home.storage',
                                    permissionCode: 1,
                                    path: '/equipment/equipmentStorage'
                                }
                            ]
                        },
                        {
                            id: 3 - 2,
                            title: 'messages.home.maintain',
                            permissionCode: 1,
                            path: '设备维修/maintain',
                            children: [
                                {
                                    id: '3 - 2 - 1',
                                    title: 'messages.home.maintainApply',
                                    permissionCode: 1,
                                    path: '/equipment/maintainApply'
                                },
                                {
                                    id: '3 - 2 - 2',
                                    title: 'messages.home.maintainStatus',
                                    permissionCode: 1,
                                    path: '/equipment/maintainStatus'
                                }
                            ]
                        },
                        {
                            id: 3 - 3,
                            title: 'messages.home.maintainConfirm',
                            permissionCode: 6,
                            path: '维修确认/confirm',
                            children: [
                                {
                                    id: '3 - 3 - 1',
                                    title: 'messages.home.maintainConfirm',
                                    permissionCode: 6,
                                    path: '/equipment/maintainConfirm'
                                },

                            ]
                        },
                        {
                            id: 3 - 4,
                            title: 'messages.home.record',
                            permissionCode: 1,
                            path: '设备记录/record',
                            children: [
                                {
                                    id: '3 - 4 - 1',
                                    title: 'messages.home.maintainRecord',
                                    permissionCode: 1,
                                    path: '/equipment/maintainRecord'
                                },

                            ]
                        }
                    ]

                },
                {
                    id: 4,
                    title: 'messages.home.sparepart',
                    permissionCode: 1,
                    path: '备件/sparepart',
                    children: [
                        {
                            id: 4 - 1,
                            title: 'messages.home.inOutbound',
                            permissionCode: 1,
                            path: '备件出入库/in/outbound',
                            children: [
                                {
                                    id: '4 - 1 - 1',
                                    title: 'messages.home.storage',
                                    permissionCode: 1,
                                    path: '/sparepart/sparepartStorage'
                                },
                                {
                                    id: '4 - 1 - 2',
                                    title: 'messages.home.inbound',
                                    permissionCode: 8,
                                    path: '/sparepart/sparepartInbound'
                                },
                                {
                                    id: '4 - 1 - 3',
                                    title: 'messages.home.outbound',
                                    permissionCode: 1,
                                    path: '/sparepart/sparepartOutbound'
                                },
                            ]
                        },
                        {
                            id: 4 - 2,
                            title: 'messages.home.record',
                            permissionCode: 1,
                            path: '备件记录/record',
                            children: [
                                {
                                    id: '4 - 2 - 1',
                                    title: 'messages.home.inboundRecord',
                                    permissionCode: 1,
                                    path: '/sparepart/inboundRecord'
                                },
                                {
                                    id: '4 - 2 - 2',
                                    title: 'messages.home.outboundRecord',
                                    permissionCode: 1,
                                    path: '/sparepart/outboundRecord'
                                },
                            ]
                        }
                    ]

                },
                {
                    id: 5,
                    title: '二层平台',
                    permissionCode: 1,
                    path: '二层平台',
                    children: [
                        {
                            id: 4 - 1,
                            title: '出入库',
                            permissionCode: 1,
                            path: '二层平台出入库',
                            children: [
                                {
                                    id: '4 - 1 - 1',
                                    title: '库存',
                                    permissionCode: 1,
                                    path: '/secondFloor/secondFloorStorage'
                                },
                                {
                                    id: '4 - 1 - 2',
                                    title: '入库',
                                    permissionCode: 2,
                                    path: '/secondFloor/secondFloorInbound'
                                }
                            ]
                        },
                        {
                            id: 4 - 2,
                            title: 'messages.home.approve',
                            permissionCode: 2,
                            path: '二层审批/approve',
                            children: [
                                {
                                    id: '4 - 2 - 1',
                                    title: '入库审批',
                                    permissionCode: 2,
                                    path: '/secondFloor/inboundApprove'
                                },
                                {
                                    id: '4 - 2 - 2',
                                    title: '出库审批',
                                    permissionCode: 2,
                                    path: '/secondFloor/outboundApprove'
                                }
                            ]
                        },
                        {
                            id: 4 - 3,
                            title: '记录',
                            permissionCode: 1,
                            path: '二层平台记录',
                            children: [
                                {
                                    id: '4 - 3 - 1',
                                    title: '入库记录',
                                    permissionCode: 1,
                                    path: '/secondFloor/inboundRecord'
                                },
                                {
                                    id: '4 - 3 - 2',
                                    title: '出库记录',
                                    permissionCode: 1,
                                    path: '/secondFloor/outboundRecord'
                                },
                            ]
                        }
                    ]

                },
                {
                    id: 6,
                    title: '用户',
                    permissionCode: 9,
                    path: '用户',
                    children: [
                        {
                            id: 6 - 1,
                            title: '用户编辑',
                            permissionCode: 9,
                            path: '用户编辑',
                            children: [
                                {
                                    id: '5 - 1 - 1',
                                    title: '编辑老用户',
                                    permissionCode: 9,
                                    path: '/userVues/editOldUser'
                                }
                            ]
                        },
                        {
                            id: 6 - 2,
                            title: '用户审批',
                            permissionCode: 9,
                            path: '用户审批',
                            children: [
                                {
                                    id: '6 - 2 - 1',
                                    title: '用户权限审批',
                                    permissionCode: 9,
                                    path: '/userVues/userApprove'
                                }
                            ]
                        }
                    ]

                },
            ],

            firstLevel: '',   //面包屑变量
            secondLevel: '',
            thirdLevel: '',
            userAuth:null



        }
    },
    mounted() {
        this.$i18n.locale = localStorage.getItem("locale");
        this.getUserAuth()

    },
    methods: {
        
        getUserAuth(){
            let that = this
            this.$api.userAPI.getSingleUser({userName:JSON.parse(sessionStorage.getItem('userInfo')).key.name})
            .then(
                    function (res) {
                        if (res.data.code == 1) {
                            that.userAuth = res.data.data[0].auth__id;
                            console.log(that.userAuth)
                        } else {
                            that.$message.error('未查询到权限')
                        }
                    }
                )
                .catch(
                    function (err) {
                        console.log(err)
                    }
                )
        },
        handleOpen(key, keyPath) {
            console.log(keyPath);
            this.firstLevel = keyPath[0]
            this.secondLevel = keyPath[1]
        },
        handleClose(key, keyPath) {
            // console.log(key);
        },
        handleSelect(index, indexPath) {
            // index 是选中菜单项的 index 属性值
            // indexPath 是选中菜单项的路径数组
            // console.log('选中的菜单项路径：', indexPath);
            // 可以在这里获取跳转信息，并执行其他逻辑
            this.thirdLevel = this.getPathName(index)
        },


        getPathName(path) {
            //获取router path对应的name
            const route = this.$router.getRoutes().find(route => route.path === path);
            return route ? route.meta.title + '/' + route.meta.componentName : null;
        },
        changeToZH() {
            localStorage.setItem("locale", "zh");
            this.$i18n.locale = localStorage.getItem("locale");
            this.$message({
                message: "切换为中文！",
                type: "success"
            });
        },
        changeToEN() {
            localStorage.setItem("locale", "en");
            this.$i18n.locale = localStorage.getItem("locale");
            this.$message({
                message: "Change to english！",
                type: "success"
            });
        }
    }
}
</script>

<style lang="less" scoped>
.el-container {
    margin: 0px;
    padding: 0px;
    height: 100%;
    /* font-family: 'Times New Roman', Times, serif; */
}

.el-header {
    background-color: #B3C0D1;
    color: #121313;
    /* text-align: center; */
    line-height: 100px;
    font-size: 40px;
    border-bottom: 1px solid #dcdfe6;
    font-weight: 600;
    /* font-family: 'Times New Roman', Times, serif; */
}

.el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 20px;
    border-top: 1px solid #B3C0D1;
    font-size: 10px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 200px;
    border-right: 1px solid #dcdfe6;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    width: 100%;
    /* text-align: center; */
    /* line-height: 160px; */
}

.breadcrumb-and-lang-switcher {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.breadcrumb-part {
    flex: 1;
    /* 使面包屑占据剩余空间 */
}
</style>
