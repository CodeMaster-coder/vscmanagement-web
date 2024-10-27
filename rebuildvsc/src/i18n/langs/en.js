const login = {
    user:"user",
    username:'username',
    password:'password',
    login:"login",
    reset:'reset',
    inputusername:"Please enter username!",
    inputpassword:"Please enter password!",
    date:"date"
}

const home = {
    consumable:"consumable",
    inOutbound:"inOutbound",
    storage:"storage",
    inbound:"inbound ",
    outbound:"outbound",
    inboundRecord:"inboundRecord",
    outboundRecord:"outboundRecord",
    tool:"tool",
    personalTool:"personalTool",
    approve:"approve",
    scrapTPMApprove:"scrapTPMApprove",
    scrapFinalApprove:"scrapFinalApprove",
    record:"record",
    scrapRecord:"scrapRecord",
    lostRecord:"lostRecord",
    equipment:"equipment",
    maintain:"maintain",
    maintainApply:"maintainApply",
    maintainStatus:"maintainStatus",
    maintainConfirm:"maintainConfirm",
    maintainRecord:"maintainRecord",
    sparepart:"sparepart",
    
}

const storage = {
    inputQueryContent:"Please enter criteria",
    selectName:"Please select  consumable name",
    query:"query",
    all:"all",
    exprotExcel:"export excel",
    addNewMaterial:"add new consumable",
    materialName:"consumable name",
    materialType:"consumable type",
    materialUnit:"unit",
    inventoryQuantity:"inventory",
    safetyQuantity:"safe quantity",
    edit:"edit",
    apply:"apply",
    applyQuatity:"apply quantity",
    cancel:"cancel",
    submit:"submit",
    nameUnEmpty:"The name cannot be empty!",
    typeUnEmpty:"The model cannot be empty!",
    unitUnEmpty:"The unit cannot be empty!",
    quantityUnEmpty:"The quantity cannot be empty!",
    quantityIsInt:"The quantity must be an integer!",
    saftyLimitUnEmpty:"The safety limit cannot be empty!",
    saftyLimitIsInt:"The safety limit must be an integer!",
    applyLowerThanStorage:"The apply quantity cannot exceed the inventory quantity!",
    getStorageSuccess:"Successfully obtained inventory!",
    applyDialogTitle:"apply consumable",
    addNewDialogTitle:"add new consumable",
    applySubmitSuccess:"Successfully submitted application!",
}

const inbound = {
    consumbaleInbound:"consumable inbound",
    delete:"delete",
    inboundSubmit:"submit inbound",
    deleteAll:"delete all",
    inboundQuantity:"inbound quantity",
    inboundGreaterThan0:"The inbound quantity cannot be less than 1!",
    atLeastOne:"Please add at least one inbound record!",
}

const outbound = {
    applyDate:"apply date",
    applyUser:"apply user",
    approve:"approve",
    reject:"reject",
    approveApplySuccess:"Successfully approved application!",
    rejectApplySuccess:"Successfully rejected application!",
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