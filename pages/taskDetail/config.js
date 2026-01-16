const showFlowActionBtn = (record) => {
  const userInfo = wx.getStorageSync('userInfo') || {}
  const currentUserId = userInfo.id || ''
  // 仅当状态为0(待审批)、是初始表单、且当前操作人为自己时可见
  return (
    record.processInstanceId &&
    record.state === 0 &&
    record.firstFormKey === record.formKey &&
    [record.executor]?.includes(currentUserId)
  )
}

const showWorkflowBtn = (record) => {
  return Boolean(record.processInstanceId)
}

/**
 * --- 格式化工具函数 ---
 */

// 默认值处理 (原变量 a)：空值显示 "-"
const formatDefault = (val) => {
  return val || '-'
}

// 格式化金额 (原变量 e)：数字转为 ￥1,234 格式
const formatCurrency = (val) => {
  return val && val !== '0' ? '￥'.concat(val.toLocaleString()) : '￥0'
}

// 格式化百分比 (原变量 t)：数字转为 10% 格式
const formatPercent = (val) => {
  return val && val !== '0' ? ''.concat(val, '%') : '0%'
}

// 格式化文件列表 (原变量 r)：将长路径文件名切分并换行显示
const formatFileList = (val) => {
  if (!val) return '-'
  return val
    .split(',')
    .map((item) => {
      return item.split('_').pop()
    })
    .join('\n')
}

/**
 * --- 核心配置对象还原 ---
 */
const CONFIG_MAP = {
  // 1. 供应商审批
  KEY_SUPPLIER: {
    url: '/user/supplier/get',
    title: '供应商[审批]',
    formField: [
      { label: '基础信息' },
      { key: 'code', title: '供应商编号', valueFormatter: formatDefault },
      { key: 'name', title: '供应商名称', valueFormatter: formatDefault },
      {
        key: 'shortName',
        title: '供应商简称',
        valueFormatter: formatDefault,
      },
      {
        key: 'typeName',
        title: '供应商类型',
        valueFormatter: formatDefault,
      },
      { key: 'linkman', title: '联系人', valueFormatter: formatDefault },
      {
        key: 'linkPhone',
        title: '联系方式',
        valueFormatter: formatDefault,
      },
      { key: 'remarks', title: '备注', valueFormatter: formatDefault },
      { label: '收款信息', valueFormatter: formatDefault },
      {
        key: 'enterpriseName',
        title: '企业全称',
        valueFormatter: formatDefault,
      },
      {
        key: 'bankAccount',
        title: '对公银行账号',
        valueFormatter: formatDefault,
      },
      {
        key: 'bankName',
        title: '对公银行名称',
        valueFormatter: formatDefault,
      },
      {
        key: 'contactPhone',
        title: '联系电话',
        valueFormatter: formatDefault,
      },
      {
        key: 'contactAddress',
        title: '联系地址',
        valueFormatter: formatDefault,
      },
      { key: 'files', title: '文件资料', valueFormatter: formatFileList },
    ],
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { type: 'KEY_SUPPLIER' },
        type: 'default',
        plain: true,
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/user/supplier/audit' },
        type: 'danger',
        plain: false,
        isVisible: showFlowActionBtn,
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/user/supplier/audit' },
        type: 'primary',
        plain: false,
        isVisible: showFlowActionBtn,
      },
    ],
  },

  // 2. 施工队审批
  KEY_CONSTRUCTION_TEAM: {
    url: '/user/constructionTeam/get',
    title: '施工队[审批]',
    formField: [
      { label: '基础信息' },
      { key: 'code', title: '施工队编号', valueFormatter: formatDefault },
      { key: 'name', title: '施工队名称', valueFormatter: formatDefault },
      {
        key: 'chargePersonName',
        title: '负责人',
        valueFormatter: formatDefault,
      },
      {
        key: 'chargePersonPhone',
        title: '负责人联系方式',
        valueFormatter: formatDefault,
      },
      { key: 'remarks', title: '备注', valueFormatter: formatDefault },
      { label: '收款信息', valueFormatter: formatDefault },
      {
        key: 'enterpriseName',
        title: '企业全称',
        valueFormatter: formatDefault,
      },
      {
        key: 'bankAccount',
        title: '对公银行账户',
        valueFormatter: formatDefault,
      },
      {
        key: 'bankName',
        title: '对公银行名称',
        valueFormatter: formatDefault,
      },
      {
        key: 'contactPhone',
        title: '联系电话',
        valueFormatter: formatDefault,
      },
      {
        key: 'contactAddress',
        title: '联系地址',
        valueFormatter: formatDefault,
      },
    ],
    tabList: [
      {
        key: 'constructionUserList',
        title: '人员信息',
        headerList: [
          { key: 'name', value: '姓名', width: 120, valueType: 'string' },
          { key: 'sexName', value: '性别', width: 80, valueType: 'string' },
          {
            key: 'educationName',
            value: '学历',
            width: 120,
            valueType: 'string',
          },
          { key: 'idNo', value: '证件号码', width: 220, valueType: 'string' },
          { key: 'linkPhone', value: '联系方式', valueType: 'string' },
          {
            key: 'workTypeName',
            value: '工种',
            width: 120,
            valueType: 'string',
          },
          {
            key: 'certificateFile',
            value: '证书文件',
            width: 220,
            valueType: 'url',
          },
          {
            key: 'certificateTypeName',
            value: '证书类型',
            width: 120,
            valueType: 'string',
          },
          {
            key: 'certificateNameName',
            value: '证书文件',
            width: 120,
            valueType: 'string',
          },
          {
            key: 'certificateValidity',
            value: '证书有效期',
            valueType: 'string',
          },
        ],
      },
    ],
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { type: 'KEY_CONSTRUCTION_TEAM' },
        type: 'default',
        plain: true,
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/user/constructionTeam/audit' },
        type: 'danger',
        plain: false,
        isVisible: showFlowActionBtn,
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/user/constructionTeam/audit' },
        type: 'primary',
        plain: false,
        isVisible: showFlowActionBtn,
      },
    ],
  },

  // 3. 项目分包/框架项目审批
  KEY_DISTRIBUTION_PROJECT: {
    url: '/project/frameworkProject/get',
    title: '项目',

    // 1. 基础详情字段
    formField: [
      { label: '详情' },
      {
        key: 'biddingName',
        title: '招投标名称',
        valueFormatter: formatDefault,
      },
      { key: 'customerName', title: '客户名称', valueFormatter: formatDefault },
      {
        key: 'projectTypeName',
        title: '项目类型',
        valueFormatter: formatDefault,
      },
      { key: 'name', title: '项目名称', valueFormatter: formatDefault },
      {
        key: 'assignOrganizationName',
        title: '负责项目组',
        valueFormatter: formatDefault,
      },
    ],

    // 2. 选项卡列表（关联数据）
    tabList: [
      {
        key: 'contractList',
        title: '项目合同',
        headerList: [
          { key: 'code', value: '合同编号', valueType: 'string' },
          { key: 'name', value: '合同名称', valueType: 'string' },
          { key: 'contractTypeName', value: '合同类型', valueType: 'string' },
          { key: 'signDate', value: '合同签订日期', valueType: 'string' },
          { key: 'amountWithTax', value: '合同含税金额', valueType: 'amount' },
          {
            key: 'amountWithoutTax',
            value: '合同不含税金额',
            valueType: 'amount',
          },
          {
            key: 'professionalCategoryName',
            value: '专业类别',
            valueType: 'string',
          },
          {
            key: 'projectLocationName',
            value: '工程所在地',
            valueType: 'string',
          },
          { key: 'taxRate', value: '税率', valueType: 'rate' },
        ],
      },
      {
        key: 'depositList',
        title: '保证金（履约保证金）',
        headerList: [
          { key: 'depositTypeName', value: '保证金类型', valueType: 'string' },
          { key: 'applyUserName', value: '申请人', valueType: 'string' },
          { key: 'applyTime', value: '申请时间', valueType: 'string' },
          { key: 'amount', value: '保证金金额', valueType: 'amount' },
          { key: 'refundDate', value: '返还日期', valueType: 'string' },
          { key: 'isPayName', value: '付款状态', valueType: 'string' },
          { key: 'isRecycleName', value: '回收状态', valueType: 'string' },
          { key: 'remark', value: '备注', valueType: 'string' },
          {
            key: 'entityAuditStatusName',
            value: '审核状态',
            valueType: 'string',
          },
          { key: 'auditTime', value: '审核时间', valueType: 'string' },
        ],
      },
      {
        key: 'paymentOrderList',
        title: '用款申请',
        headerList: [
          { key: 'businessTypeName', value: '用款类型', valueType: 'string' },
          { key: 'typeName', value: '用款用途', valueType: 'string' },
          { key: 'amount', value: '用款金额', valueType: 'amount' },
          { key: 'purpose', value: '用款说明', valueType: 'string' },
          { key: 'applyUserName', value: '申请人', valueType: 'string' },
          { key: 'applyTime', value: '申请时间', valueType: 'string' },
          { key: 'entityAuditStatusName', value: '状态', valueType: 'string' },
          { key: 'auditRemarks', value: '驳回原因', valueType: 'string' },
          { key: 'auditTime', value: '审核时间', valueType: 'string' },
          { key: 'remark', value: '备注', valueType: 'string' },
        ],
      },
      {
        key: 'projectList',
        title: '订单',
        headerList: [
          { key: 'code', value: '订单编号', valueType: 'string' },
          { key: 'name', value: '订单名称', valueType: 'string' },
          { key: 'amountWithTax', value: '合同含税金额', valueType: 'amount' },
          {
            key: 'amountWithoutTax',
            value: '合同不含税金额',
            valueType: 'amount',
          },
          {
            key: 'orderActualAmount',
            value: '目标回款金额',
            valueType: 'amount',
          },
          { key: 'invoiceAmount', value: '已回款金额', valueType: 'amount' },
          { key: 'unInvoiceAmount', value: '未回款金额', valueType: 'amount' },
          { key: 'orderCostAmount', value: '总成本费', valueType: 'amount' },
          { key: 'grossProfit', value: '利润', valueType: 'amount' },
          { key: 'grossProfitMargin', value: '毛利率', valueType: 'rate' },
          { key: 'projectStatusName', value: '进度', valueType: 'string' },
          { key: 'organizationName', value: '负责项目组', valueType: 'string' },
          { key: 'created', value: '创建时间', valueType: 'string' },
          { key: 'createUserName', value: '创建人', valueType: 'string' },
        ],
      },
    ],

    // 3. 操作按钮逻辑
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { type: 'KEY_DISTRIBUTION_PROJECT' },
        type: 'default',
        plain: true,
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/frameworkProject/audit' },
        type: 'danger',
        plain: false,
        isVisible: showFlowActionBtn,
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/frameworkProject/audit' },
        type: 'primary',
        plain: false,
        isVisible: showFlowActionBtn,
      },
    ],
  },
  get KEY_FRAMEWORK_PROJECT() {
    return this.KEY_DISTRIBUTION_PROJECT
  },

  // 4. 施工队合作审批
  KEY_PROJECT_CO_OPERATION: {
    url: '/project/constructionTeamCooperate/get',
    title: '施工队合作[审批]',

    // 1. 详情表单字段映射
    formField: [
      { label: '详情' },
      {
        key: 'constructionTeamCode',
        title: '施工队编号',
        valueFormatter: formatDefault,
      },
      {
        key: 'constructionTeamName',
        title: '施工队名称',
        valueFormatter: formatDefault,
      },
      {
        key: 'chargePersonName',
        title: '负责人',
        valueFormatter: formatDefault,
      },
      {
        key: 'chargePersonPhone',
        title: '负责人联系方式',
        valueFormatter: formatDefault,
      },
      { key: 'workerNumber', title: '工人数量', valueFormatter: formatDefault },
      {
        key: 'collaborativeProjectNumber',
        title: '合作项目数量',
        valueFormatter: formatDefault,
      },
      { key: 'createUserName', title: '申请人', valueFormatter: formatDefault },
      { key: 'created', title: '申请时间', valueFormatter: formatDefault },
      {
        key: 'projectName',
        title: '申请合作订单',
        valueFormatter: formatDefault,
      },
      {
        key: 'unitDetailCount',
        title: '申请合作单位明细',
        valueFormatter: formatDefault,
      },
      {
        key: 'constructionContractFile',
        title: '施工合同文件',
        valueFormatter: formatDefault,
      },
      { key: 'remarks', title: '备注', valueFormatter: formatDefault },
      {
        key: 'entityAuditStatusName',
        title: '审核状态',
        valueFormatter: formatDefault,
      },
      { key: 'auditRemarks', title: '驳回原因', valueFormatter: formatDefault },
      { key: 'auditTime', title: '审核时间', valueFormatter: formatDefault },
    ],

    // 2. 数据列表/选项卡（单位明细）
    tabList: [
      {
        key: 'unitDetailList',
        title: '单位明细',
        headerList: [
          { key: 'name', value: '单项名称', width: 120, valueType: 'string' },
          { key: 'district', value: '行政区', width: 120, valueType: 'string' },
          {
            key: 'constructionFee',
            value: '施工费',
            width: 120,
            valueType: 'amount',
          },
          {
            key: 'constructionTeamName',
            value: '合作施工队',
            width: 180,
            valueType: 'string',
          },
        ],
      },
    ],

    // 3. 底部操作按钮逻辑
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { type: 'KEY_PROJECT_CO_OPERATION' },
        type: 'default',
        plain: true,
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/constructionTeamCooperate/audit' },
        type: 'danger',
        plain: false,
        isVisible: showFlowActionBtn,
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/constructionTeamCooperate/audit' },
        type: 'primary',
        plain: false,
        isVisible: showFlowActionBtn,
      },
    ],
  },

  // 5. 审计费审批 (关键权限控制节点)
  KEY_AUDIT_FEE: {
    url: '/project/auditFee/get',
    title: '审计费[审批]',

    // 1. 字段定义
    formField: [
      { label: '详情' },
      { key: 'projectName', title: '订单名称', valueFormatter: formatDefault },
      { key: 'typeName', title: '用款类型', valueFormatter: formatDefault },
      { key: 'amount', title: '用款金额', valueFormatter: formatCurrency },
      { key: 'purpose', title: '用款用途', valueFormatter: formatDefault },
      { key: 'remark', title: '备注', valueFormatter: formatDefault },
      {
        key: 'paymentVoucher',
        title: '打款凭证',
        valueFormatter: formatFileList,
      },
      { key: 'invoiceFile', title: '发票', valueFormatter: formatFileList },
    ],

    // 2. 动态操作按钮列表
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { type: 'KEY_AUDIT_FEE' },
        type: 'default',
        plain: true,
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/auditFee/audit' },
        type: 'danger',
        plain: false,
        isVisible: (data) =>
          showFlowActionBtn(data) &&
          [
            'form_audit_fee_cwb_audit', // 财务部审核环节
            'form_audit_fee_zjl_audit', // 总经理审核环节
            'form_audit_fee_dsz_audit', // 董事长审核环节
          ].includes(data.formKey),
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/auditFee/audit' },
        type: 'primary',
        plain: false,
        isVisible: (data) =>
          showFlowActionBtn(data) &&
          [
            'form_audit_fee_cwb_audit',
            'form_audit_fee_zjl_audit',
            'form_audit_fee_dsz_audit',
          ].includes(data.formKey),
      },
      {
        text: '上传打款凭证',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/auditFee/process',
          field: 'paymentVoucher',
        },
        type: 'primary',
        plain: false,
        isVisible: (data) =>
          data.formKey === 'form_audit_fee_cwb_upload_payment_voucher',
      },
      {
        text: '上传发票',
        action: 'uploadFiles',
        actionPayload: {},
        type: 'primary',
        plain: false,
        url: '/project/auditFee/process',
        field: 'invoiceFile',
        isVisible: (data) =>
          data.formKey === 'form_audit_fee_zlb_upload_payment_voucher',
      },
    ],
  },

  // 6. 采购单审批
  KEY_PURCHASE_ORDER: {
    url: '/project/purchaseOrder/get',
    title: '采购单[审批]',

    // 1. 基础详情字段
    formField: [
      { label: '详情' },
      { key: 'code', title: '采购单号', valueFormatter: formatDefault },
      { key: 'name', title: '采购单名称', valueFormatter: formatDefault },
      { key: 'totalCost', title: '采购单金额', valueFormatter: formatCurrency },
      {
        key: 'projectName',
        title: '所属订单',
        valueFormatter: formatDefault,
      },
      {
        key: 'applyUserName',
        title: '申请人',
        valueFormatter: formatDefault,
      },
      {
        key: 'belongToDepartmentName',
        title: '申请项目组',
        valueFormatter: formatDefault,
      },
      { key: 'invoice', title: '开票信息', valueFormatter: formatFileList },
      {
        key: 'paymentVoucher',
        title: '打款凭证',
        valueFormatter: formatFileList,
      },
      {
        key: 'entityAuditStatusName',
        title: '状态',
        valueFormatter: formatDefault,
      },
      {
        key: 'auditRemarks',
        title: '驳回原因',
        valueFormatter: formatDefault,
      },
      {
        key: 'auditTime',
        title: '审核时间',
        valueFormatter: formatDefault,
      },
    ],

    // 2. 采购物料明细清单
    tabList: [
      {
        key: 'purchaseOrderItemList',
        title: '物料明细',
        headerList: [
          { key: 'materialName', value: '物料名称', valueType: 'string' },
          { key: 'specification', value: '物料规格', valueType: 'string' },
          { key: 'unit', value: '计量单位', valueType: 'string' },
          { key: 'price', value: '物料单价', valueType: 'amount' },
          { key: 'quantity', value: '物料数量', valueType: 'string' },
          { key: 'amount', value: '费用', valueType: 'amount' },
          { key: 'supplierName', value: '供应商', valueType: 'string' },
          { key: 'isSpecialName', value: '是否专项材料', valueType: 'string' },
        ],
      },
    ],

    // 3. 动态业务操作按钮
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { type: 'KEY_PURCHASE_ORDER' },
        type: 'default',
        plain: true,
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/purchaseOrder/audit' },
        type: 'danger',
        plain: false,
        isVisible: (data) =>
          showFlowActionBtn(data) &&
          [
            'form_purchase_order_dsz_audit', // 董事长
            'form_purchase_order_tkb_audit', // 调控部
            'form_purchase_order_ld_audit', // 领导层
          ].includes(data.formKey),
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/purchaseOrder/audit' },
        type: 'primary',
        plain: false,
        isVisible: (data) =>
          showFlowActionBtn(data) &&
          [
            'form_purchase_order_dsz_audit',
            'form_purchase_order_tkb_audit',
            'form_purchase_order_ld_audit',
          ].includes(data.formKey),
      },
      {
        text: '上传开票信息',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/purchaseOrder/process',
          field: 'invoice',
        },
        type: 'primary',
        plain: false,
        isVisible: (data) => data.formKey === 'form_purchase_order_tkb_upload',
      },
      {
        text: '上传打款凭证',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/purchaseOrder/process',
          field: 'paymentVoucher',
        },
        type: 'primary',
        plain: false,
        isVisible: (data) =>
          data.formKey === 'form_purchase_order_cwb_upload_voucher',
      },
      {
        text: '确认收货',
        action: 'confirmReceived',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: (data) => data.formKey === 'form_purchase_order_ckb_receipt', // 仓库部收货
      },
    ],
  },

  // 7. 用款审批
  KEY_PAYMENT_ORDER: {
    url: '/project/paymentOrder/get',
    title: '用款[审批]',

    // 1. 详情表单字段
    formField: [
      { label: '详情' },
      {
        key: 'businessTypeName',
        title: '用款类型',
        valueFormatter: formatDefault,
      },
      {
        key: 'biddingName',
        title: '招投标名称',
        valueFormatter: formatDefault,
      },
      {
        key: 'frameworkProjectName',
        title: '项目名称',
        valueFormatter: formatDefault,
      },
      { key: 'projectName', title: '订单名称', valueFormatter: formatDefault },
      { key: 'customerName', title: '客户名称', valueFormatter: formatDefault },
      { key: 'typeName', title: '用款用途', valueFormatter: formatDefault },
      { key: 'amount', title: '用款金额', valueFormatter: formatCurrency },
      { key: 'purpose', title: '用款说明', valueFormatter: formatDefault },
      { key: 'remark', title: '备注', valueFormatter: formatDefault },
      {
        key: 'paymentVoucher',
        title: '打款凭证',
        valueFormatter: formatFileList,
      },
      {
        key: 'receiveVoucher',
        title: '领用凭证',
        valueFormatter: formatFileList,
      },
      { key: 'invoiceFile', title: '发票', valueFormatter: formatFileList },
    ],

    // 2. 动态按钮与权限控制
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: {
          type: 'KEY_PAYMENT_ORDER',
        },
        type: 'default',
        plain: true,
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/paymentOrder/audit' },
        type: 'danger',
        plain: false,
        isVisible: (data) =>
          showFlowActionBtn(data) &&
          [
            'form_payment_order_zlb_audit', // 总办审核
            'form_payment_order_zdb_audit', // 总部审核
            'form_payment_order_cwb_audit', // 财务审核
            'form_payment_order_dsz_audit', // 董事长审核
            'form_payment_order_zjl_audit', // 总经理审核
          ].includes(data.formKey),
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/paymentOrder/audit' },
        type: 'primary',
        plain: false,
        isVisible: (data) =>
          showFlowActionBtn(data) &&
          [
            'form_payment_order_zlb_audit',
            'form_payment_order_zdb_audit',
            'form_payment_order_cwb_audit',
            'form_payment_order_dsz_audit',
            'form_payment_order_zjl_audit',
          ].includes(data.formKey),
      },
      {
        text: '上传打款凭证',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/paymentOrder/process',
          field: 'paymentVoucher',
        },
        type: 'primary',
        plain: false,
        isVisible: (data) =>
          data.formKey === 'form_payment_order_cwb_upload_payment_proof',
      },
      {
        text: '上传领用凭证',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/paymentOrder/process',
          field: 'receiveVoucher',
        },
        type: 'primary',
        plain: false,
        isVisible: (data) =>
          data.formKey === 'form_payment_order_issue_voucher',
      },
      {
        text: '上传发票',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/paymentOrder/process',
          field: 'invoiceFile',
        },
        type: 'default',
        plain: true,
        isVisible: (data) =>
          [
            'form_payment_order_cwb_upload_invoice',
            'form_payment_order_tkb_upload_invoice',
          ].includes(data.formKey),
      },
    ],
  },

  // 8. 开票审批模块
  KEY_INVOICE: {
    url: '/project/invoice/get',
    title: '开票[审批]',
    formField: [
      { label: '详情' },
      { key: 'projectName', title: '订单名称', valueFormatter: formatDefault },
      { key: 'customerName', title: '客户名称', valueFormatter: formatDefault },
      { key: 'settlementNo', title: '结算单号', valueFormatter: formatDefault },
      {
        key: 'taxpayerIdentificationNumber',
        title: '纳税人识别号',
        valueFormatter: formatDefault,
      },
      {
        key: 'orderActualAmount',
        title: '订单应开票金额',
        valueFormatter: formatCurrency,
      },
      {
        key: 'invoiceAmount',
        title: '订单已开票金额',
        valueFormatter: formatCurrency,
      },
      {
        key: 'unInvoiceAmount',
        title: '订单未开票金额',
        valueFormatter: formatCurrency,
      },
      {
        key: 'currentInvoiceAmountWithoutTaxTotal',
        title: '本次开票申请不含税金额',
        valueFormatter: formatCurrency,
      },
      {
        key: 'currentInvoiceRate',
        title: '本次开票申请税额',
        valueFormatter: formatPercent,
      },
      {
        key: 'currentInvoiceExcludingTaxTotal',
        title: '本次开票申请含税金额',
        valueFormatter: formatCurrency,
      },
    ],
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { type: 'KEY_INVOICE' },
        type: 'default',
        plain: true,
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/invoice/audit' },
        type: 'danger',
        isVisible: function (data) {
          return showFlowActionBtn(data) && 'form_invoice_cwb_audit' === data.formKey
        },
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/invoice/audit' },
        type: 'primary',
        isVisible: function (data) {
          return showFlowActionBtn(data) && 'form_invoice_cwb_audit' === data.formKey
        },
      },
      {
        text: '上传开票信息',
        action: 'uploadFiles',
        actionPayload: { url: '/project/invoice/process', field: 'attachment' },
        type: 'primary',
        isVisible: function (data) {
          return 'form_invoice_cwb_upload' === data.formKey
        },
      },
    ],
  },

  // 9. 保证金审批模块
  KEY_DEPOSIT: {
    url: '/project/deposit/get',
    title: '保证金[审批]',
    formField: [
      { label: '详情' },
      {
        key: 'belongProjectName',
        title: '保证金所属',
        valueFormatter: formatDefault,
      },
      {
        key: 'depositTypeName',
        title: '保证金类型',
        valueFormatter: formatDefault,
      },
      { key: 'applyUserName', title: '申请人', valueFormatter: formatDefault },
      { key: 'applyTime', title: '申请时间', valueFormatter: formatDefault },
      { key: 'amount', title: '保证金金额', valueFormatter: formatCurrency },
      { key: 'refundDate', title: '返还日期', valueFormatter: formatDefault },
      { key: 'isPayName', title: '付款状态', valueFormatter: formatDefault },
      {
        key: 'isRecycleName',
        title: '回收状态',
        valueFormatter: formatDefault,
      },
      { key: 'remark', title: '备注', valueFormatter: formatDefault },
      {
        key: 'entityAuditStatusName',
        title: '审核状态',
        valueFormatter: formatDefault,
      },
      { key: 'auditTime', title: '审核时间', valueFormatter: formatDefault },
      {
        key: 'paymentVoucher',
        title: '打款凭证',
        valueFormatter: formatFileList,
      },
      {
        key: 'recycleVoucher',
        title: '回收凭证',
        valueFormatter: formatFileList,
      },
    ],
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: {
          type: 'KEY_DEPOSIT',
        },
        plain: true,
        type: 'default',
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        plain: true,
        type: 'default',
        action: 'showWorkflow',
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/deposit/audit' },
        type: 'danger',
        isVisible: function (data) {
          return (
            showFlowActionBtn(data) &&
            [
              'form_deposit_cwb_audit',
              'form_deposit_zjl_audit',
              'form_deposit_dsz_audit',
            ].includes(data.formKey)
          )
        },
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/deposit/audit' },
        type: 'primary',
        isVisible: function (data) {
          return (
            showFlowActionBtn(data) &&
            [
              'form_deposit_cwb_audit',
              'form_deposit_zjl_audit',
              'form_deposit_dsz_audit',
            ].includes(data.formKey)
          )
        },
      },
      {
        text: '上传打款凭证',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/deposit/process',
          field: 'paymentVoucher',
        },
        type: 'primary',
        isVisible: function (data) {
          return 'form_deposit_pay' === data.formKey
        },
      },
      {
        text: '上传回收凭证',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/deposit/process',
          field: 'recycleVoucher',
        },
        type: 'primary',
        isVisible: function (data) {
          return 'form_deposit_recycle' === data.formKey
        },
      },
    ],
  },

  // 10. 施工队结算审批模块
  KEY_SETTLEMENT: {
    url: '/project/settlement/get',
    title: '施工队结算[审批]',
    formField: [
      { label: '详情' },
      {
        key: 'frameworkProjectName',
        title: '项目名称',
        valueFormatter: formatDefault,
      },
      { key: 'projectName', title: '订单名称', valueFormatter: formatDefault },
      {
        key: 'constructionTeamName',
        title: '施工队名称',
        valueFormatter: formatDefault,
      },
      { key: 'discountRate', title: '折扣率', valueFormatter: formatPercent },
      {
        key: 'shouldSettlementAmount',
        title: '应结算金额',
        valueFormatter: formatCurrency,
      },
      {
        key: 'alreadySettlementAmount',
        title: '已结算金额',
        valueFormatter: formatCurrency,
      },
      {
        key: 'applySettlementAmount',
        title: '本次申请结算金额',
        valueFormatter: formatCurrency,
      },
      {
        key: 'finalSettlementAmount',
        title: '本次最终结算金额',
        valueFormatter: formatCurrency,
      },
      { key: 'remarks', title: '备注', valueFormatter: formatDefault },
      {
        key: 'engineeringAcceptanceStatusName',
        title: '工程验收',
        valueFormatter: formatDefault,
      },
      {
        key: 'materialReturnStatusName',
        title: '材料是否退库',
        valueFormatter: formatDefault,
      },
      {
        key: 'entityAuditStatusName',
        title: '审核状态',
        valueFormatter: formatDefault,
      },
      { key: 'auditRemarks', title: '驳回原因', valueFormatter: formatDefault },
      { key: 'auditTime', title: '审核时间', valueFormatter: formatDefault },
    ],
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { type: 'KEY_PAYMENT_ORDER' },
        plain: true,
        type: 'default',
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        plain: true,
        type: 'default',
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/settlement/audit' },
        type: 'danger',
        isVisible: function (data) {
          return (
            showFlowActionBtn(data) &&
            [
              'form_settlement_tkb_audit',
              'form_settlement_cwb_audit',
              'form_settlement_ld_audit',
            ].includes(data.formKey)
          )
        },
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/settlement/audit' },
        type: 'primary',
        isVisible: function (data) {
          return (
            showFlowActionBtn(data) &&
            [
              'form_settlement_tkb_audit',
              'form_settlement_cwb_audit',
              'form_settlement_ld_audit',
            ].includes(data.formKey)
          )
        },
      },
      {
        text: '上传发票',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/settlement/process',
          field: 'invoiceVoucher',
        },
        type: 'primary',
        isVisible: function (data) {
          return 'form_settlement_xmb_upload' === data.formKey
        },
      },
      {
        text: '上传打款凭证',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/settlement/process',
          field: 'paymentVoucher',
        },
        type: 'primary',
        isVisible: function (data) {
          return 'form_settlement_cwb_upload' === data.formKey
        },
      },
    ],
  },

  // 11. 竣工资料审批
  KEY_COMPLETION: {
    url: '/project/completionData/get',
    title: '竣工资料[审批]',

    // 1. 表单字段定义
    formField: [
      { label: '详情' },
      {
        key: 'biddingName',
        title: '招投标名称',
        valueFormatter: formatDefault,
      },
      {
        key: 'frameworkProjectName',
        title: '项目名称',
        valueFormatter: formatDefault,
      },
      {
        key: 'projectName',
        title: '订单名称',
        valueFormatter: formatDefault,
      },
      { key: 'name', title: '资料名称', valueFormatter: formatDefault },
      {
        key: 'initFile',
        title: '初始竣工资料',
        valueFormatter: formatFileList,
      },
      {
        key: 'improveFile',
        title: '完善竣工资料',
        valueFormatter: formatFileList,
      },
      { key: 'auditFile', title: '审定单', valueFormatter: formatDefault },
      {
        key: 'entityAuditStatusName',
        title: '状态',
        valueFormatter: formatDefault,
      },
      {
        key: 'auditRemarks',
        title: '驳回原因',
        valueFormatter: formatDefault,
      },
      {
        key: 'auditTime',
        title: '审核时间',
        valueFormatter: formatDefault,
      },
    ],

    // 2. 底部操作按钮逻辑
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { type: 'KEY_COMPLETION' },
        type: 'default',
        plain: true,
        isVisible: showFlowActionBtn,
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: showWorkflowBtn,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/completionData/audit' },
        type: 'danger',
        plain: false,
        isVisible: (data) =>
          showFlowActionBtn(data) &&
          [
            'form_data_xmb_audit', // 项目部审核
            'form_data_zlb_audit', // 总办/质量部审核
          ].includes(data.formKey),
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/completionData/audit' },
        type: 'primary',
        plain: false,
        isVisible: (data) =>
          showFlowActionBtn(data) &&
          ['form_data_xmb_audit', 'form_data_zlb_audit'].includes(data.formKey),
      },
      {
        text: '上传审定单',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/completionData/process',
          field: 'auditFile',
        },
        type: 'primary',
        plain: false,
        isVisible: (data) => data.formKey === 'form_data_xmb_upload_audit_file',
      },
      {
        text: '重新上传初始竣工资料',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/completionData/process',
          field: 'initFile',
        },
        type: 'primary',
        plain: false,
        isVisible: (data) => data.formKey === 'form_data_start',
      },
      {
        text: '上传完善竣工资料',
        action: 'uploadFiles',
        actionPayload: {
          url: '/project/completionData/process',
          field: 'improveFile',
        },
        type: 'primary',
        plain: false,
        isVisible: (data) =>
          data.formKey === 'form_data_xmb_upload_approval_order',
      },
    ],
  },
}

export default CONFIG_MAP
