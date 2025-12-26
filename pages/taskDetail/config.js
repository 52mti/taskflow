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
      { key: 'shortName', title: '供应商简称', valueFormatter: formatDefault },
      { key: 'typeName', title: '供应商类型', valueFormatter: formatDefault },
      { key: 'linkman', title: '联系人', valueFormatter: formatDefault },
      { key: 'linkPhone', title: '联系方式', valueFormatter: formatDefault },
      { key: 'remarks', title: '备注', valueFormatter: formatDefault },
      { label: '收款信息', valueFormatter: formatDefault },
      { key: 'enterpriseName', title: '企业全称', valueFormatter: formatDefault },
      { key: 'bankAccount', title: '对公银行账号', valueFormatter: formatDefault },
      { key: 'bankName', title: '对公银行名称', valueFormatter: formatDefault },
      { key: 'contactPhone', title: '联系电话', valueFormatter: formatDefault },
      { key: 'contactAddress', title: '联系地址', valueFormatter: formatDefault },
      { key: 'files', title: '文件资料', valueFormatter: formatFileList },
    ],
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        actionPayload: { path: '' },
        type: 'default',
        plain: true,
        isVisible: function (data) {
          const userId = wx.getStorageSync('userInfo')?.id || ''
          return (
            0 === data.state &&
            data.firstFormKey === data.formKey &&
            [data.executor].includes(userId)
          )
        },
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: () => true,
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/user/supplier/audit' },
        type: 'danger',
        isVisible: () => true,
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/user/supplier/audit' },
        type: 'primary',
        isVisible: () => true,
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
      { key: 'chargePersonName', title: '负责人', valueFormatter: formatDefault },
      {
        key: 'chargePersonPhone',
        title: '负责人联系方式',
        valueFormatter: formatDefault,
      },
      { key: 'remarks', title: '备注', valueFormatter: formatDefault },
      { label: '收款信息', valueFormatter: formatDefault },
      { key: 'enterpriseName', title: '企业全称', valueFormatter: formatDefault },
      { key: 'bankAccount', title: '对公银行账户', valueFormatter: formatDefault },
      { key: 'bankName', title: '对公银行名称', valueFormatter: formatDefault },
      { key: 'contactPhone', title: '联系电话', valueFormatter: formatDefault },
      { key: 'contactAddress', title: '联系地址', valueFormatter: formatDefault },
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
        isVisible: function (data) {
          const userId = wx.getStorageSync('userInfo')?.id || ''
          return (
            0 === data.state &&
            data.firstFormKey === data.formKey &&
            [data.executor].includes(userId)
          )
        },
      },
      { text: '流程', action: 'showWorkflow', isVisible: () => true },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/user/constructionTeam/audit' },
        type: 'danger',
        isVisible: () => true,
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/user/constructionTeam/audit' },
        type: 'primary',
        isVisible: () => true,
      },
    ],
  },

  // 3. 项目分包/框架项目审批
  KEY_DISTRIBUTION_PROJECT: {
    url: '/project/frameworkProject/get',
    title: '项目',
    formField: [
      { label: '详情' },
      { key: 'biddingName', title: '招投标名称', valueFormatter: formatDefault },
      { key: 'customerName', title: '客户名称', valueFormatter: formatDefault },
      { key: 'projectTypeName', title: '项目类型', valueFormatter: formatDefault },
      { key: 'name', title: '项目名称', valueFormatter: formatDefault },
      {
        key: 'assignOrganizationName',
        title: '负责项目组',
        valueFormatter: formatDefault,
      },
    ],
    tabList: [
      {
        key: 'contractList',
        title: '项目合同',
        headerList: [
          /* 合同列表配置 */
        ],
      },
      {
        key: 'depositList',
        title: '保证金（履约保证金）',
        headerList: [
          /* 保证金列表配置 */
        ],
      },
      {
        key: 'paymentOrderList',
        title: '用款申请',
        headerList: [
          /* 用款列表配置 */
        ],
      },
      {
        key: 'projectList',
        title: '订单',
        headerList: [
          /* 订单列表配置 */
        ],
      },
    ],
    btnList: [
      {
        text: '重新提交',
        action: 'handleReapply',
        isVisible: function (data) {
          /* 逻辑同上 */
        },
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/frameworkProject/audit' },
        type: 'danger',
        isVisible: () => true,
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/frameworkProject/audit' },
        type: 'primary',
        isVisible: () => true,
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
    formField: [
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
      { key: 'projectName', title: '申请合作订单', valueFormatter: formatDefault },
      {
        key: 'constructionContractFile',
        title: '施工合同文件',
        valueFormatter: formatDefault,
      },
    ],
    btnList: [
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/constructionTeamCooperate/audit' },
        type: 'danger',
        isVisible: () => true,
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/constructionTeamCooperate/audit' },
        type: 'primary',
        isVisible: () => true,
      },
    ],
  },

  // 5. 审计费审批 (关键权限控制节点)
  KEY_AUDIT_FEE: {
    url: '/project/auditFee/get',
    title: '审计费[审批]',
    formField: [
      { key: 'projectName', title: '订单名称', valueFormatter: formatDefault },
      { key: 'amount', title: '用款金额', valueFormatter: formatCurrency },
      {
        key: 'paymentVoucher',
        title: '打款凭证',
        valueFormatter: formatFileList,
      },
      { key: 'invoiceFile', title: '发票', valueFormatter: formatFileList },
    ],
    btnList: [
      {
        text: '驳回',
        action: 'handleReject',
        isVisible: function (e) {
          // 财务、总经理、董事长可见
          return [
            'form_audit_fee_cwb_audit',
            'form_audit_fee_zjl_audit',
            'form_audit_fee_dsz_audit',
          ].includes(e.formKey)
        },
      },
      {
        text: '通过',
        action: 'handleApprove',
        isVisible: function (e) {
          return [
            'form_audit_fee_cwb_audit',
            'form_audit_fee_zjl_audit',
            'form_audit_fee_dsz_audit',
          ].includes(e.formKey)
        },
      },
      {
        text: '上传打款凭证',
        action: 'uploadFiles',
        isVisible: (e) =>
          e.formKey === 'form_audit_fee_cwb_upload_payment_voucher',
      },
    ],
  },

  // 6. 采购单审批
  KEY_PURCHASE_ORDER: {
    url: '/project/purchaseOrder/get',
    title: '采购单[审批]',
    formField: [
      { key: 'totalCost', title: '采购单金额', valueFormatter: formatCurrency },
      { key: 'invoice', title: '开票信息', valueFormatter: formatFileList },
      {
        key: 'paymentVoucher',
        title: '打款凭证',
        valueFormatter: formatFileList,
      },
    ],
    btnList: [
      {
        text: '驳回',
        action: 'handleReject',
        isVisible: (e) =>
          [
            'form_purchase_order_dsz_audit',
            'form_purchase_order_tkb_audit',
            'form_purchase_order_ld_audit',
          ].includes(e.formKey),
      },
      {
        text: '通过',
        action: 'handleApprove',
        isVisible: (e) =>
          [
            'form_purchase_order_dsz_audit',
            'form_purchase_order_tkb_audit',
            'form_purchase_order_ld_audit',
          ].includes(e.formKey),
      },
      {
        text: '上传打款凭证',
        action: 'uploadFiles',
        isVisible: (e) =>
          e.formKey === 'form_purchase_order_cwb_upload_voucher',
      },
    ],
  },

  // 7. 用款审批 (全场景覆盖)
  KEY_PAYMENT_ORDER: {
    url: '/project/paymentOrder/get',
    title: '用款[审批]',
    formField: [
      { key: 'amount', title: '用款金额', valueFormatter: formatCurrency },
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
    btnList: [
      {
        text: '通过',
        action: 'handleApprove',
        isVisible: (e) =>
          [
            'form_payment_order_zlb_audit',
            'form_payment_order_zdb_audit',
            'form_payment_order_cwb_audit',
            'form_payment_order_dsz_audit',
            'form_payment_order_start',
            'form_payment_order_zjl_audit',
          ].includes(e.formKey),
      },
      {
        text: '上传打款凭证',
        action: 'uploadFiles',
        actionPayload: { field: 'paymentVoucher' },
        isVisible: (e) =>
          e.formKey === 'form_payment_order_cwb_upload_payment_proof',
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
        actionPayload: { path: '' },
        type: 'default',
        plain: true,
        isVisible: function (data) {
          var user = wx.getStorageSync('userInfo')
          var userId = (user ? user.id : '') || ''
          return (
            0 === data.state &&
            data.firstFormKey === data.formKey &&
            [data.executor].includes(userId)
          )
        },
      },
      {
        text: '流程',
        action: 'showWorkflow',
        actionPayload: {},
        type: 'default',
        plain: true,
        isVisible: function () {
          return true
        },
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/invoice/audit' },
        type: 'danger',
        isVisible: function (data) {
          return 'form_invoice_cwb_audit' === data.formKey
        },
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/invoice/audit' },
        type: 'primary',
        isVisible: function (data) {
          return 'form_invoice_cwb_audit' === data.formKey
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
        isVisible: function (data) {
          var user = wx.getStorageSync('userInfo')
          var userId = (user ? user.id : '') || ''
          return (
            0 === data.state &&
            data.firstFormKey === data.formKey &&
            [data.executor].includes(userId)
          )
        },
      },
      {
        text: '流程',
        action: 'showWorkflow',
        isVisible: function () {
          return true
        },
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/deposit/audit' },
        type: 'danger',
        isVisible: function (data) {
          return [
            'form_deposit_cwb_audit',
            'form_deposit_zjl_audit',
            'form_deposit_dsz_audit',
          ].includes(data.formKey)
        },
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/deposit/audit' },
        type: 'primary',
        isVisible: function (data) {
          return [
            'form_deposit_cwb_audit',
            'form_deposit_zjl_audit',
            'form_deposit_dsz_audit',
          ].includes(data.formKey)
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
        isVisible: function (data) {
          var user = wx.getStorageSync('userInfo')
          var userId = (user ? user.id : '') || ''
          return (
            0 === data.state &&
            data.firstFormKey === data.formKey &&
            [data.executor].includes(userId)
          )
        },
      },
      {
        text: '流程',
        action: 'showWorkflow',
        isVisible: function () {
          return true
        },
      },
      {
        text: '驳回',
        action: 'handleReject',
        actionPayload: { url: '/project/settlement/audit' },
        type: 'danger',
        isVisible: function (data) {
          return [
            'form_settlement_tkb_audit',
            'form_settlement_cwb_audit',
            'form_settlement_ld_audit',
          ].includes(data.formKey)
        },
      },
      {
        text: '通过',
        action: 'handleApprove',
        actionPayload: { url: '/project/settlement/audit' },
        type: 'primary',
        isVisible: function (data) {
          return [
            'form_settlement_tkb_audit',
            'form_settlement_cwb_audit',
            'form_settlement_ld_audit',
          ].includes(data.formKey)
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

  // 11. 竣工资料审批 (文件末尾配置)
  KEY_COMPLETION: {
    url: '/project/completionData/get',
    title: '竣工资料[审批]',
    formField: [
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
    ],
    btnList: [
      {
        text: '驳回',
        action: 'handleReject',
        isVisible: (e) =>
          ['form_data_xmb_audit', 'form_data_zlb_audit'].includes(e.formKey),
      },
      {
        text: '通过',
        action: 'handleApprove',
        isVisible: (e) =>
          ['form_data_xmb_audit', 'form_data_zlb_audit'].includes(e.formKey),
      },
      {
        text: '上传审定单',
        action: 'uploadFiles',
        actionPayload: { field: 'auditFile' },
        isVisible: (e) => e.formKey === 'form_data_xmb_upload_audit_file',
      },
      {
        text: '上传完善资料',
        action: 'uploadFiles',
        actionPayload: { field: 'improveFile' },
        isVisible: (e) => e.formKey === 'form_data_xmb_upload_approval_order',
      },
    ],
  },
}

export default CONFIG_MAP
