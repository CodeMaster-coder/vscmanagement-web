const login = {
    user:"人",
    username:'用户名',
    password:'密码',
    login:"登录",
    reset:'重置',
    inputusername:"请输入用户名！",
    inputpassword:"请输入密码！",
    date:"日期"

}

const home = {
    consumable:"耗材",
    inOutbound:"出入库",
    storage:"仓库库存",
    inbound:"仓库补库",
    outbound:"仓库出库",
    inboundRecord:"入库记录",
    outboundRecord:"出库记录",
    tool:"工具",
    personalTool:"个人工具",
    approve:"审批",
    scrapTPMApprove:"报废TPM审批",
    scrapFinalApprove:"报废终审批",
    record:"记录",
    scrapRecord:"报废记录",
    lostRecord:"丢失记录",
    equipment:"设备",
    maintain:"维修",
    maintainApply:"维修申请",
    maintainStatus:"维修更新",
    maintainConfirm:"维修确认",
    maintainRecord:"维修记录",
    sparepart:"备件",

}


const storage = {
    inputQueryContent:"请输入查询条件:",
    selectName:"请选择耗材名称",
    query:"查询",
    all:"全部",
    exprotExcel:"导出Excel",
    addNewMaterial:"添加新耗材",
    materialName:"耗材名称",
    materialType:"耗材型号",
    materialUnit:"单位",
    inventoryQuantity:"库存数量",
    safetyQuantity:"安全量",
    edit:"操作",
    apply:"领用",
    applyQuatity:"领用数量",
    cancel:"取消",
    submit:"确定",
    nameUnEmpty:"名称不能为空!",
    typeUnEmpty:"型号不能为空！",
    unitUnEmpty:"耗材单位不能为空！",
    quantityUnEmpty:"数量不能为空！",
    quantityIsInt:"数量必须为整数",
    saftyLimitUnEmpty:"安全量不能为空！",
    saftyLimitIsInt:"安全量必须为整数!",
    applyLowerThanStorage:"领用数量不能大于库存数量！",
    getStorageSuccess:"获取库存成功！",
    applyDialogTitle:"领用申请",
    addNewDialogTitle:"添加新耗材",
    applySubmitSuccess:"领用申请提交成功！",

}


const inbound = {
    consumbaleInbound:"耗材补库",
    delete:"删除",
    inboundSubmit:"补库提交",
    deleteAll:"全部删除",
    inboundQuantity:"补库数量",
    inboundGreaterThan0:"入库数量不能小于或等于0！",
    atLeastOne:"请至少添加一条补库记录！",
}

const outbound = {
    applyDate:"申请日期",
    applyUser:"申请人",
    approve:"批准",
    reject:"驳回",
    approveApplySuccess:"批准申请成功!",
    rejectApplySuccess:"驳回申请成功!",
}



export default {
    messages: {
        login,
        home,
        storage,
        inbound,
        outbound
    }
}