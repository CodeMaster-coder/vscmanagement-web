<template>
    <div id="app">

        <el-container>

            <el-container>

                <el-container width="100%">

                    <el-container width="80%">

                        <el-main>

                            <!-- 表单 -->
                            <el-form :inline="true" style=" align-items: center;">
                                <el-row>
                                    <h3>欢迎来到EVK耗材工具管理系统！/Welcome to the EVK consumable & tool management system</h3>

                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item>
                                            <el-button type="primary" plain @click="getEVKBstatus()">EVKB</el-button>
                                            <el-button type="primary" plain @click="getEVKPstatus()">EVKP</el-button>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button-group size="mini">

                                        </el-button-group>
                                    </el-col>

                                    <el-col :span="6" size="mini">
                                        <el-button-group size="mini">



                                        </el-button-group>
                                    </el-col>
                                </el-row>
                                <el-row :inline="true" style="  width:100%; height: 50%; align-items: center;">
                                    <el-col :span="12">
                                        <v-chart :option="consumableOption"
                                            style="width: 550px; height: 550px"></v-chart>
                                    </el-col>
                                    <el-col :span="12">
                                        <v-chart :option="toolOption" style="width: 550px; height: 550px"></v-chart>
                                    </el-col>
                                </el-row>
                                <el-row :inline="true" style="  width:100%; height: 50%; align-items: center;">
                                    <el-col :span="12">
                                        <v-chart :option="sparepartOption"
                                            style="width: 550px; height: 550px"></v-chart>
                                    </el-col>
                                    <el-col :span="12">
                                        <v-chart :option="equipmentOption" style="width: 550px; height: 550px"></v-chart>
                                    </el-col>
                                </el-row>
                                <el-row v-if="isShow" :inline="true" style="  width:100%; height: 50%; align-items: center;">
                                    <el-col :span="12">
                                        <v-chart :option="secondFloorOption"
                                            style="width: 550px; height: 550px"></v-chart>
                                    </el-col>
                                </el-row>


                            </el-form>
                        </el-main>
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
            consumableOption: {
                title: {
                    text: '耗材',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                color: [
                    "#fac858",
                    "#5470c6",
                ]
            },
            toolOption: {
                title: {
                    text: '工具',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                color: [
                    "#fac858",
                    "#5470c6",
                ]
            },
            sparepartOption: {
                title: {
                    text: '备件',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                color: [
                    "#fac858",
                    "#5470c6",
                ]
            },
            equipmentOption: {
                title: {
                    text: '设备',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                color: [
                    "#fac858",
                    "#5470c6",
                ]
            },
            secondFloorOption: {
                title: {
                    text: '二层平台',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                color: [
                    "#5470c6",
                    "#fac858",
                    
                ]
            },
            isShow:true
        }
    },
    mounted() {

        this.getConsumableStatus(1)
        this.getToolStatus(1)
        this.getEquipmentStatus(1)
        this.getSparepartStatus(1)
        this.getSecondfloorStatus(1)

    },
    methods: {
        getEVKBstatus(){
            this.getConsumableStatus(1)
        this.getToolStatus(1)
        this.getEquipmentStatus(1)
        this.getSparepartStatus(1)
        this.getSecondfloorStatus(1)
        this.isShow = true
        },
        getEVKPstatus(){
            this.getConsumableStatus(2)
        this.getToolStatus(2)
        this.getEquipmentStatus(2)
        this.getSparepartStatus(2)
        this.isShow = false
        },
        //获取耗材状态
        getConsumableStatus(workshop) {
            let that = this
            that.$api.welcomeAPI.getConsumableStatus({ workshop: workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            // console.log(res.data)
                            that.consumableOption.series[0].data = res.data.data
                            that.consumableOption.title.subtext = '总种类:' + (res.data.data[0].value + res.data.data[1].value)
                        }
                        else {
                            that.$message.error(res.data.msg)
                        }
                    }
                )
                .catch(function (err) {
                    console.log(err)
                }

                )
        },
        //获取工具状态
        getToolStatus(workshop) {
            let that = this
            that.$api.welcomeAPI.getToolStatus({ workshop: workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            // console.log(res.data)
                            that.toolOption.series[0].data = res.data.data
                            that.toolOption.title.subtext = '总种类:' + (res.data.data[0].value + res.data.data[1].value)
                        }
                        else {
                            that.$message.error(res.data.msg)
                        }
                    }
                )
                .catch(function (err) {
                    console.log(err)
                }

                )
        },
        //获取备件状态
        getSparepartStatus(workshop) {
            let that = this
            that.$api.welcomeAPI.getSparepartStatus({ workshop: workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            // console.log(res.data)
                            that.sparepartOption.series[0].data = res.data.data
                            that.sparepartOption.title.subtext = '总种类:' + (res.data.data[0].value + res.data.data[1].value)
                        }
                        else {
                            that.$message.error(res.data.msg)
                        }
                    }
                )
                .catch(function (err) {
                    console.log(err)
                }

                )
        },
        //获取设备状态
        getEquipmentStatus(workshop) {
            let that = this
            that.$api.welcomeAPI.getEquipmentStatus({ workshop: workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            // console.log(res.data)
                            that.equipmentOption.series[0].data = res.data.data
                            that.equipmentOption.title.subtext = '总设备数量:' + (res.data.data[0].value + res.data.data[1].value)
                        }
                        else {
                            that.$message.error(res.data.msg)
                        }
                    }
                )
                .catch(function (err) {
                    console.log(err)
                }

                )
        },
        //获取二层平台状态
        getSecondfloorStatus(workshop) {
            let that = this
            that.$api.welcomeAPI.getSecondfloorStatus({ workshop: workshop })
                .then(
                    function (res) {
                        if (res.data.code == 1) {
                            // console.log(res.data)
                            that.secondFloorOption.series[0].data = res.data.data
                            that.secondFloorOption.title.subtext = '总重量:' + (res.data.data[0].value + res.data.data[1].value) +' t'
                        }
                        else {
                            that.$message.error(res.data.msg)
                        }
                    }
                )
                .catch(function (err) {
                    console.log(err)
                }

                )
        },
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

.el-main {
    background-color: #E9EEF3;
    color: #333;
    width: 100%;
    /* text-align: center; */
    /* line-height: 160px; */
}


.consumable {
    width: 450px;
    height: 400px;
    margin: auto;
    // border: 1px solid #8080ff;
}

#tool {
    width: 450px;
    height: 400px;
    margin: auto;
    // border: 1px solid #8080ff;
}

#equipment {
    width: 450px;
    height: 400px;
    margin: auto;
}

#sparepart {
    width: 450px;
    height: 400px;
    margin: auto;
}

// #secondfloor {
//     width: 450px;
//     height: 400px;
//     margin: auto;
// }



#consumablep {
    width: 450px;
    height: 400px;
    margin: auto;
    // border: 1px solid #8080ff;
}

#toolp {
    width: 450px;
    height: 400px;
    margin: auto;
    // border: 1px solid #8080ff;
}

#equipmentp {
    width: 450px;
    height: 400px;
    margin: auto;
}

#sparepartp {
    width: 450px;
    height: 400px;
    margin: auto;
}
</style>