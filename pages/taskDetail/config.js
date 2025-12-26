Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0, require("../../@babel/runtime/helpers/Arrayincludes");
var e = function(e) {
    return e && "0" !== e ? "￥".concat(e.toLocaleString()) : "￥0"
  },
  t = function(e) {
    return e && "0" !== e ? "".concat(e, "%") : "0%"
  },
  a = function(e) {
    return e || "-"
  },
  r = function(e) {
    return e ? e.split(",").map((function(e) {
      return e.split("_").pop()
    })).join("\n") : "-"
  },
  i = {
    KEY_SUPPLIER: {
      url: "/user/supplier/get",
      title: "供应商[审批]",
      formField: [{
        label: "基础信息"
      }, {
        key: "code",
        title: "供应商编号",
        valueFormatter: a
      }, {
        key: "name",
        title: "供应商名称",
        valueFormatter: a
      }, {
        key: "shortName",
        title: "供应商简称",
        valueFormatter: a
      }, {
        key: "typeName",
        title: "供应商类型",
        valueFormatter: a
      }, {
        key: "linkman",
        title: "联系人",
        valueFormatter: a
      }, {
        key: "linkPhone",
        title: "联系方式",
        valueFormatter: a
      }, {
        key: "remarks",
        title: "备注",
        valueFormatter: a
      }, {
        label: "收款信息",
        valueFormatter: a
      }, {
        key: "enterpriseName",
        title: "企业全称",
        valueFormatter: a
      }, {
        key: "bankAccount",
        title: "对公银行账号",
        valueFormatter: a
      }, {
        key: "bankName",
        title: "对公银行名称",
        valueFormatter: a
      }, {
        key: "contactPhone",
        title: "联系电话",
        valueFormatter: a
      }, {
        key: "contactAddress",
        title: "联系地址",
        valueFormatter: a
      }, {
        key: "files",
        title: "文件资料",
        valueFormatter: r
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/user/supplier/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/user/supplier/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }]
    },
    KEY_CONSTRUCTION_TEAM: {
      url: "/user/constructionTeam/get",
      title: "施工队[审批]",
      formField: [{
        label: "基础信息"
      }, {
        key: "code",
        title: "施工队编号",
        valueFormatter: a
      }, {
        key: "name",
        title: "施工队名称",
        valueFormatter: a
      }, {
        key: "chargePersonName",
        title: "负责人",
        valueFormatter: a
      }, {
        key: "chargePersonPhone",
        title: "负责人联系方式",
        valueFormatter: a
      }, {
        key: "remarks",
        title: "备注",
        valueFormatter: a
      }, {
        label: "收款信息",
        valueFormatter: a
      }, {
        key: "enterpriseName",
        title: "企业全称",
        valueFormatter: a
      }, {
        key: "bankAccount",
        title: "对公银行账户",
        valueFormatter: a
      }, {
        key: "bankName",
        title: "对公银行名称",
        valueFormatter: a
      }, {
        key: "contactPhone",
        title: "联系电话",
        valueFormatter: a
      }, {
        key: "contactAddress",
        title: "联系地址",
        valueFormatter: a
      }],
      tabList: [{
        key: "constructionUserList",
        title: "人员信息",
        headerList: [{
          key: "name",
          value: "姓名",
          width: 120,
          valueType: "string"
        }, {
          key: "sexName",
          value: "性别",
          width: 80,
          valueType: "string"
        }, {
          key: "educationName",
          value: "学历",
          width: 120,
          valueType: "string"
        }, {
          key: "idNo",
          value: "证件号码",
          width: 220,
          valueType: "string"
        }, {
          key: "linkPhone",
          value: "联系方式",
          valueType: "string"
        }, {
          key: "workTypeName",
          value: "工种",
          width: 120,
          valueType: "string"
        }, {
          key: "certificateFile",
          value: "证书文件",
          width: 220,
          valueType: "url"
        }, {
          key: "certificateTypeName",
          value: "证书类型",
          width: 120,
          valueType: "string"
        }, {
          key: "certificateNameName",
          value: "证书文件",
          width: 120,
          valueType: "string"
        }, {
          key: "certificateValidity",
          value: "证书有效期",
          valueType: "string"
        }]
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/user/constructionTeam/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/user/constructionTeam/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }]
    },
    KEY_DISTRIBUTION_PROJECT: {
      url: "/project/frameworkProject/get",
      title: "项目",
      formField: [{
        label: "详情"
      }, {
        key: "biddingName",
        title: "招投标名称",
        valueFormatter: a
      }, {
        key: "customerName",
        title: "客户名称",
        valueFormatter: a
      }, {
        key: "projectTypeName",
        title: "项目类型",
        valueFormatter: a
      }, {
        key: "name",
        title: "项目名称",
        valueFormatter: a
      }, {
        key: "assignOrganizationName",
        title: "负责项目组",
        valueFormatter: a
      }],
      tabList: [{
        key: "contractList",
        title: "项目合同",
        headerList: [{
          key: "code",
          value: "合同编号",
          valueType: "string"
        }, {
          key: "name",
          value: "合同名称",
          valueType: "string"
        }, {
          key: "contractTypeName",
          value: "合同类型",
          valueType: "string"
        }, {
          key: "signDate",
          value: "合同签订日期",
          valueType: "string"
        }, {
          key: "amountWithTax",
          value: "合同含税金额",
          valueType: "amount"
        }, {
          key: "amountWithoutTax",
          value: "合同不含税金额",
          valueType: "amount"
        }, {
          key: "professionalCategoryName",
          value: "专业类别",
          valueType: "string"
        }, {
          key: "projectLocationName",
          value: "工程所在地",
          valueType: "string"
        }, {
          key: "taxRate",
          value: "税率",
          valueType: "rate"
        }]
      }, {
        key: "depositList",
        title: "保证金（履约保证金）",
        headerList: [{
          key: "depositTypeName",
          value: "保证金类型",
          valueType: "string"
        }, {
          key: "applyUserName",
          value: "申请人",
          valueType: "string"
        }, {
          key: "applyTime",
          value: "申请时间",
          valueType: "string"
        }, {
          key: "amount",
          value: "保证金金额",
          valueType: "amount"
        }, {
          key: "refundDate",
          value: "返还日期",
          valueType: "string"
        }, {
          key: "isPayName",
          value: "付款状态",
          valueType: "string"
        }, {
          key: "isRecycleName",
          value: "回收状态",
          valueType: "string"
        }, {
          key: "remark",
          value: "备注",
          valueType: "string"
        }, {
          key: "entityAuditStatusName",
          value: "审核状态",
          valueType: "string"
        }, {
          key: "auditTime",
          value: "审核时间",
          valueType: "string"
        }]
      }, {
        key: "paymentOrderList",
        title: "用款申请",
        headerList: [{
          key: "businessTypeName",
          value: "用款类型",
          valueType: "string"
        }, {
          key: "typeName",
          value: "用款用途",
          valueType: "string"
        }, {
          key: "amount",
          value: "用款金额",
          valueType: "amount"
        }, {
          key: "purpose",
          value: "用款说明",
          valueType: "string"
        }, {
          key: "applyUserName",
          value: "申请人",
          valueType: "string"
        }, {
          key: "applyTime",
          value: "申请时间",
          valueType: "string"
        }, {
          key: "entityAuditStatusName",
          value: "状态",
          valueType: "string"
        }, {
          key: "auditRemarks",
          value: "驳回原因",
          valueType: "string"
        }, {
          key: "auditTime",
          value: "审核时间",
          valueType: "string"
        }, {
          key: "remark",
          value: "备注",
          valueType: "string"
        }]
      }, {
        key: "projectList",
        title: "订单",
        headerList: [{
          key: "code",
          value: "订单编号",
          valueType: "string"
        }, {
          key: "name",
          value: "订单名称",
          valueType: "string"
        }, {
          key: "amountWithTax",
          value: "合同含税金额",
          valueType: "amount"
        }, {
          key: "amountWithoutTax",
          value: "合同不含税金额",
          valueType: "amount"
        }, {
          key: "orderActualAmount",
          value: "目标回款金额",
          valueType: "amount"
        }, {
          key: "invoiceAmount",
          value: "已回款金额",
          valueType: "amount"
        }, {
          key: "unInvoiceAmount",
          value: "未回款金额",
          valueType: "amount"
        }, {
          key: "orderCostAmount",
          value: "总成本费",
          valueType: "amount"
        }, {
          key: "grossProfit",
          value: "利润",
          valueType: "amount"
        }, {
          key: "grossProfitMargin",
          value: "毛利率",
          valueType: "rate"
        }, {
          key: "projectStatusName",
          value: "进度",
          valueType: "string"
        }, {
          key: "organizationName",
          value: "负责项目组",
          valueType: "string"
        }, {
          key: "created",
          value: "创建时间",
          valueType: "string"
        }, {
          key: "createUserName",
          value: "创建人",
          valueType: "string"
        }]
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/frameworkProject/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/frameworkProject/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }]
    },
    KEY_FRAMEWORK_PROJECT: {
      url: "/project/frameworkProject/get",
      title: "项目",
      formField: [{
        label: "详情"
      }, {
        key: "biddingName",
        title: "招投标名称",
        valueFormatter: a
      }, {
        key: "customerName",
        title: "客户名称",
        valueFormatter: a
      }, {
        key: "projectTypeName",
        title: "项目类型",
        valueFormatter: a
      }, {
        key: "name",
        title: "项目名称",
        valueFormatter: a
      }, {
        key: "assignOrganizationName",
        title: "负责项目组",
        valueFormatter: a
      }],
      tabList: [{
        key: "contractList",
        title: "项目合同",
        headerList: [{
          key: "code",
          value: "合同编号",
          valueType: "string"
        }, {
          key: "name",
          value: "合同名称",
          valueType: "string"
        }, {
          key: "contractTypeName",
          value: "合同类型",
          valueType: "string"
        }, {
          key: "signDate",
          value: "合同签订日期",
          valueType: "string"
        }, {
          key: "amountWithTax",
          value: "合同含税金额",
          valueType: "amount"
        }, {
          key: "amountWithoutTax",
          value: "合同不含税金额",
          valueType: "amount"
        }, {
          key: "professionalCategoryName",
          value: "专业类别",
          valueType: "string"
        }, {
          key: "projectLocationName",
          value: "工程所在地",
          valueType: "string"
        }, {
          key: "taxRate",
          value: "税率",
          valueType: "rate"
        }]
      }, {
        key: "depositList",
        title: "保证金（履约保证金）",
        headerList: [{
          key: "depositTypeName",
          value: "保证金类型",
          valueType: "string"
        }, {
          key: "applyUserName",
          value: "申请人",
          valueType: "string"
        }, {
          key: "applyTime",
          value: "申请时间",
          valueType: "string"
        }, {
          key: "amount",
          value: "保证金金额",
          valueType: "amount"
        }, {
          key: "refundDate",
          value: "返还日期",
          valueType: "string"
        }, {
          key: "isPayName",
          value: "付款状态",
          valueType: "string"
        }, {
          key: "isRecycleName",
          value: "回收状态",
          valueType: "string"
        }, {
          key: "remark",
          value: "备注",
          valueType: "string"
        }, {
          key: "entityAuditStatusName",
          value: "审核状态",
          valueType: "string"
        }, {
          key: "auditTime",
          value: "审核时间",
          valueType: "string"
        }]
      }, {
        key: "paymentOrderList",
        title: "用款申请",
        headerList: [{
          key: "businessTypeName",
          value: "用款类型",
          valueType: "string"
        }, {
          key: "typeName",
          value: "用款用途",
          valueType: "string"
        }, {
          key: "amount",
          value: "用款金额",
          valueType: "amount"
        }, {
          key: "purpose",
          value: "用款说明",
          valueType: "string"
        }, {
          key: "applyUserName",
          value: "申请人",
          valueType: "string"
        }, {
          key: "applyTime",
          value: "申请时间",
          valueType: "string"
        }, {
          key: "entityAuditStatusName",
          value: "状态",
          valueType: "string"
        }, {
          key: "auditRemarks",
          value: "驳回原因",
          valueType: "string"
        }, {
          key: "auditTime",
          value: "审核时间",
          valueType: "string"
        }, {
          key: "remark",
          value: "备注",
          valueType: "string"
        }]
      }, {
        key: "projectList",
        title: "订单",
        headerList: [{
          key: "code",
          value: "订单编号",
          valueType: "string"
        }, {
          key: "name",
          value: "订单名称",
          valueType: "string"
        }, {
          key: "amountWithTax",
          value: "合同含税金额",
          valueType: "amount"
        }, {
          key: "amountWithoutTax",
          value: "合同不含税金额",
          valueType: "amount"
        }, {
          key: "orderActualAmount",
          value: "目标回款金额",
          valueType: "amount"
        }, {
          key: "invoiceAmount",
          value: "已回款金额",
          valueType: "amount"
        }, {
          key: "unInvoiceAmount",
          value: "未回款金额",
          valueType: "amount"
        }, {
          key: "orderCostAmount",
          value: "总成本费",
          valueType: "amount"
        }, {
          key: "grossProfit",
          value: "利润",
          valueType: "amount"
        }, {
          key: "grossProfitMargin",
          value: "毛利率",
          valueType: "rate"
        }, {
          key: "projectStatusName",
          value: "进度",
          valueType: "string"
        }, {
          key: "organizationName",
          value: "负责项目组",
          valueType: "string"
        }, {
          key: "created",
          value: "创建时间",
          valueType: "string"
        }, {
          key: "createUserName",
          value: "创建人",
          valueType: "string"
        }]
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/frameworkProject/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/frameworkProject/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }]
    },
    KEY_PROJECT_CO_OPERATION: {
      url: "/project/constructionTeamCooperate/get",
      title: "施工队合作[审批]",
      formField: [{
        label: "详情"
      }, {
        key: "constructionTeamCode",
        title: "施工队编号",
        valueFormatter: a
      }, {
        key: "constructionTeamName",
        title: "施工队名称",
        valueFormatter: a
      }, {
        key: "chargePersonName",
        title: "负责人",
        valueFormatter: a
      }, {
        key: "chargePersonPhone",
        title: "负责人联系方式",
        valueFormatter: a
      }, {
        key: "workerNumber",
        title: "工人数量",
        valueFormatter: a
      }, {
        key: "collaborativeProjectNumber",
        title: "合作项目数量",
        valueFormatter: a
      }, {
        key: "createUserName",
        title: "申请人",
        valueFormatter: a
      }, {
        key: "created",
        title: "申请时间",
        valueFormatter: a
      }, {
        key: "projectName",
        title: "申请合作订单",
        valueFormatter: a
      }, {
        key: "unitDetailCount",
        title: "申请合作单位明细",
        valueFormatter: a
      }, {
        key: "constructionContractFile",
        title: "施工合同文件",
        valueFormatter: a
      }, {
        key: "remarks",
        title: "备注",
        valueFormatter: a
      }, {
        key: "entityAuditStatusName",
        title: "审核状态",
        valueFormatter: a
      }, {
        key: "auditRemarks",
        title: "驳回原因",
        valueFormatter: a
      }, {
        key: "auditTime",
        title: "审核时间",
        valueFormatter: a
      }],
      tabList: [{
        key: "unitDetailList",
        title: "单位明细",
        headerList: [{
          key: "name",
          value: "单项名称",
          width: 120,
          valueType: "string"
        }, {
          key: "district",
          value: "行政区",
          width: 120,
          valueType: "string"
        }, {
          key: "constructionFee",
          value: "施工费",
          width: 120,
          valueType: "amount"
        }, {
          key: "constructionTeamName",
          value: "合作施工队",
          width: 180,
          valueType: "string"
        }]
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/constructionTeamCooperate/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/constructionTeamCooperate/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return !0
        }
      }]
    },
    KEY_AUDIT_FEE: {
      url: "/project/auditFee/get",
      title: "审计费[审批]",
      formField: [{
        label: "详情"
      }, {
        key: "projectName",
        title: "订单名称",
        valueFormatter: a
      }, {
        key: "typeName",
        title: "用款类型",
        valueFormatter: a
      }, {
        key: "amount",
        title: "用款金额",
        valueFormatter: e
      }, {
        key: "purpose",
        title: "用款用途",
        valueFormatter: a
      }, {
        key: "remark",
        title: "备注",
        valueFormatter: a
      }, {
        key: "paymentVoucher",
        title: "打款凭证",
        valueFormatter: r
      }, {
        key: "invoiceFile",
        title: "发票",
        valueFormatter: r
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/auditFee/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return ["form_audit_fee_cwb_audit", "form_audit_fee_zjl_audit", "form_audit_fee_dsz_audit"].includes(e.formKey)
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/auditFee/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return ["form_audit_fee_cwb_audit", "form_audit_fee_zjl_audit", "form_audit_fee_dsz_audit"].includes(e.formKey)
        }
      }, {
        text: "上传打款凭证",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/auditFee/process",
          field: "paymentVoucher"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_audit_fee_cwb_upload_payment_voucher" === e.formKey
        }
      }, {
        text: "上传发票",
        action: "uploadFiles",
        actionPayload: {},
        type: "primary",
        plain: !1,
        url: "/project/auditFee/process",
        field: "invoiceFile",
        isVisible: function(e) {
          return "form_audit_fee_zlb_upload_payment_voucher" === e.formKey
        }
      }]
    },
    KEY_PURCHASE_ORDER: {
      url: "/project/purchaseOrder/get",
      title: "采购单[审批]",
      formField: [{
        label: "详情"
      }, {
        key: "code",
        title: "采购单号",
        valueFormatter: a
      }, {
        key: "name",
        title: "采购单名称",
        valueFormatter: a
      }, {
        key: "totalCost",
        title: "采购单金额",
        valueFormatter: e
      }, {
        key: "projectName",
        title: "所属订单",
        valueFormatter: a
      }, {
        key: "applyUserName",
        title: "申请人",
        valueFormatter: a
      }, {
        key: "belongToDepartmentName",
        title: "申请项目组",
        valueFormatter: a
      }, {
        key: "invoice",
        title: "开票信息",
        valueFormatter: r
      }, {
        key: "paymentVoucher",
        title: "打款凭证",
        valueFormatter: r
      }, {
        key: "entityAuditStatusName",
        title: "状态",
        valueFormatter: a
      }, {
        key: "auditRemarks",
        title: "驳回原因",
        valueFormatter: a
      }, {
        key: "auditTime",
        title: "审核时间",
        valueFormatter: a
      }],
      tabList: [{
        key: "purchaseOrderItemList",
        title: "",
        headerList: [{
          key: "materialName",
          value: "物料名称",
          valueType: "string"
        }, {
          key: "specification",
          value: "物料规格",
          valueType: "string"
        }, {
          key: "unit",
          value: "计量单位",
          valueType: "string"
        }, {
          key: "price",
          value: "物料单价",
          valueType: "amount"
        }, {
          key: "quantity",
          value: "物料数量",
          valueType: "string"
        }, {
          key: "amount",
          value: "费用",
          valueType: "amount"
        }, {
          key: "supplierName",
          value: "供应商",
          valueType: "string"
        }, {
          key: "isSpecialName",
          value: "是否专项材料",
          valueType: "string"
        }]
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/purchaseOrder/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return ["form_purchase_order_dsz_audit", "form_purchase_order_tkb_audit", "form_purchase_order_ld_audit"].includes(e.formKey)
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/purchaseOrder/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return ["form_purchase_order_dsz_audit", "form_purchase_order_tkb_audit", "form_purchase_order_ld_audit"].includes(e.formKey)
        }
      }, {
        text: "上传开票信息",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/purchaseOrder/process",
          field: "invoice"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_purchase_order_tkb_upload" === e.formKey
        }
      }, {
        text: "上传打款凭证",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/purchaseOrder/process",
          field: "paymentVoucher"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_purchase_order_cwb_upload_voucher" === e.formKey
        }
      }, {
        text: "确认收货",
        action: "confirmReceived",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function(e) {
          return "form_purchase_order_ckb_receipt" === e.formKey
        }
      }]
    },
    KEY_PAYMENT_ORDER: {
      url: "/project/paymentOrder/get",
      title: "用款[审批]",
      formField: [{
        label: "详情"
      }, {
        key: "businessTypeName",
        title: "用款类型",
        valueFormatter: a
      }, {
        key: "biddingName",
        title: "招投标名称",
        valueFormatter: a
      }, {
        key: "frameworkProjectName",
        title: "项目名称",
        valueFormatter: a
      }, {
        key: "projectName",
        title: "订单名称",
        valueFormatter: a
      }, {
        key: "customerName",
        title: "客户名称",
        valueFormatter: a
      }, {
        key: "typeName",
        title: "用款用途",
        valueFormatter: a
      }, {
        key: "amount",
        title: "用款金额",
        valueFormatter: e
      }, {
        key: "purpose",
        title: "用款说明",
        valueFormatter: a
      }, {
        key: "remark",
        title: "备注",
        valueFormatter: a
      }, {
        key: "paymentVoucher",
        title: "打款凭证",
        valueFormatter: r
      }, {
        key: "receiveVoucher",
        title: "领用凭证",
        valueFormatter: r
      }, {
        key: "invoiceFile",
        title: "发票",
        valueFormatter: r
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/paymentOrder/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return ["form_payment_order_zlb_audit", "form_payment_order_zdb_audit", "form_payment_order_cwb_audit", "form_payment_order_dsz_audit", "form_payment_order_start", "form_payment_order_zjl_audit"].includes(e.formKey)
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/paymentOrder/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return ["form_payment_order_zlb_audit", "form_payment_order_zdb_audit", "form_payment_order_cwb_audit", "form_payment_order_dsz_audit", "form_payment_order_start", "form_payment_order_zjl_audit"].includes(e.formKey)
        }
      }, {
        text: "上传打款凭证",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/paymentOrder/process",
          field: "paymentVoucher"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_payment_order_cwb_upload_payment_proof" === e.formKey
        }
      }, {
        text: "上传领用凭证",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/paymentOrder/process",
          field: "receiveVoucher"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_payment_order_issue_voucher" === e.formKey
        }
      }, {
        text: "上传发票",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/paymentOrder/process",
          field: "invoiceFile"
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          return ["form_payment_order_cwb_upload_invoice", "form_payment_order_tkb_upload_invoice"].includes(e.formKey)
        }
      }]
    },
    KEY_INVOICE: {
      url: "/project/invoice/get",
      title: "开票[审批]",
      formField: [{
        label: "详情"
      }, {
        key: "projectName",
        title: "订单名称",
        valueFormatter: a
      }, {
        key: "customerName",
        title: "客户名称",
        valueFormatter: a
      }, {
        key: "settlementNo",
        title: "结算单号",
        valueFormatter: a
      }, {
        key: "taxpayerIdentificationNumber",
        title: "纳税人识别号",
        valueFormatter: a
      }, {
        key: "orderActualAmount",
        title: "订单应开票金额",
        valueFormatter: e
      }, {
        key: "invoiceAmount",
        title: "订单已开票金额",
        valueFormatter: e
      }, {
        key: "unInvoiceAmount",
        title: "订单未开票金额",
        valueFormatter: e
      }, {
        key: "currentInvoiceAmountWithoutTaxTotal",
        title: "本次开票申请不含税金额",
        valueFormatter: e
      }, {
        key: "currentInvoiceRate",
        title: "本次开票申请税额",
        valueFormatter: t
      }, {
        key: "currentInvoiceExcludingTaxTotal",
        title: "本次开票申请含税金额",
        valueFormatter: e
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/invoice/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return "form_invoice_cwb_audit" === e.formKey
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/invoice/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_invoice_cwb_audit" === e.formKey
        }
      }, {
        text: "上传开票信息",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/invoice/process",
          field: "attachment"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_invoice_cwb_upload" === e.formKey
        }
      }]
    },
    KEY_DEPOSIT: {
      url: "/project/deposit/get",
      title: "保证金[审批]",
      formField: [{
        label: "详情"
      }, {
        key: "belongProjectName",
        title: "保证金所属",
        valueFormatter: a
      }, {
        key: "depositTypeName",
        title: "保证金类型",
        valueFormatter: a
      }, {
        key: "applyUserName",
        title: "申请人",
        valueFormatter: a
      }, {
        key: "applyTime",
        title: "申请时间",
        valueFormatter: a
      }, {
        key: "amount",
        title: "保证金金额",
        valueFormatter: e
      }, {
        key: "refundDate",
        title: "返还日期",
        valueFormatter: a
      }, {
        key: "isPayName",
        title: "付款状态",
        valueFormatter: a
      }, {
        key: "isRecycleName",
        title: "回收状态",
        valueFormatter: a
      }, {
        key: "remark",
        title: "备注",
        valueFormatter: a
      }, {
        key: "entityAuditStatusName",
        title: "审核状态",
        valueFormatter: a
      }, {
        key: "auditTime",
        title: "审核时间",
        valueFormatter: a
      }, {
        key: "paymentVoucher",
        title: "打款凭证",
        valueFormatter: r
      }, {
        key: "recycleVoucher",
        title: "回收凭证",
        valueFormatter: r
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/deposit/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return ["form_deposit_cwb_audit", "form_deposit_zjl_audit", "form_deposit_dsz_audit"].includes(e.formKey)
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/deposit/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return ["form_deposit_cwb_audit", "form_deposit_zjl_audit", "form_deposit_dsz_audit"].includes(e.formKey)
        }
      }, {
        text: "上传打款凭证",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/deposit/process",
          field: "paymentVoucher"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_deposit_pay" === e.formKey
        }
      }, {
        text: "上传回收凭证",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/deposit/process",
          field: "recycleVoucher"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_deposit_recycle" === e.formKey
        }
      }]
    },
    KEY_SETTLEMENT: {
      url: "/project/settlement/get",
      title: "施工队结算[审批]",
      formField: [{
        label: "详情"
      }, {
        key: "frameworkProjectName",
        title: "项目名称",
        valueFormatter: a
      }, {
        key: "projectName",
        title: "订单名称",
        valueFormatter: a
      }, {
        key: "constructionTeamName",
        title: "施工队名称",
        valueFormatter: a
      }, {
        key: "discountRate",
        title: "折扣率",
        valueFormatter: t
      }, {
        key: "shouldSettlementAmount",
        title: "应结算金额",
        valueFormatter: e
      }, {
        key: "alreadySettlementAmount",
        title: "已结算金额",
        valueFormatter: e
      }, {
        key: "applySettlementAmount",
        title: "本次申请结算金额",
        valueFormatter: e
      }, {
        key: "finalSettlementAmount",
        title: "本次最终结算金额",
        valueFormatter: e
      }, {
        key: "remarks",
        title: "备注",
        valueFormatter: a
      }, {
        key: "engineeringAcceptanceStatusName",
        title: "工程验收",
        valueFormatter: a
      }, {
        key: "materialReturnStatusName",
        title: "材料是否退库",
        valueFormatter: a
      }, {
        key: "entityAuditStatusName",
        title: "审核状态",
        valueFormatter: a
      }, {
        key: "auditRemarks",
        title: "驳回原因",
        valueFormatter: a
      }, {
        key: "auditTime",
        title: "审核时间",
        valueFormatter: a
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/settlement/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return ["form_settlement_tkb_audit", "form_settlement_cwb_audit", "form_settlement_ld_audit"].includes(e.formKey)
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/settlement/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return ["form_settlement_tkb_audit", "form_settlement_cwb_audit", "form_settlement_ld_audit"].includes(e.formKey)
        }
      }, {
        text: "上传发票",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/settlement/process",
          field: "invoiceVoucher"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_settlement_xmb_upload" === e.formKey
        }
      }, {
        text: "上传打款凭证",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/settlement/process",
          field: "paymentVoucher"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_settlement_cwb_upload" === e.formKey
        }
      }]
    },
    KEY_COMPLETION: {
      url: "/project/completionData/get",
      title: "竣工资料[审批]",
      formField: [{
        label: "详情"
      }, {
        key: "biddingName",
        title: "招投标名称",
        valueFormatter: a
      }, {
        key: "frameworkProjectName",
        title: "项目名称",
        valueFormatter: a
      }, {
        key: "projectName",
        title: "订单名称",
        valueFormatter: a
      }, {
        key: "name",
        title: "资料名称",
        valueFormatter: a
      }, {
        key: "initFile",
        title: "初始竣工资料",
        valueFormatter: r
      }, {
        key: "improveFile",
        title: "完善竣工资料",
        valueFormatter: r
      }, {
        key: "auditFile",
        title: "审定单",
        valueFormatter: a
      }, {
        key: "entityAuditStatusName",
        title: "状态",
        valueFormatter: a
      }, {
        key: "auditRemarks",
        title: "驳回原因",
        valueFormatter: a
      }, {
        key: "auditTime",
        title: "审核时间",
        valueFormatter: a
      }],
      btnList: [{
        text: "重新提交",
        action: "handleReapply",
        actionPayload: {
          path: ""
        },
        type: "default",
        plain: !0,
        isVisible: function(e) {
          var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
          return 0 === e.state && e.firstFormKey === e.formKey && [e.executor].includes(a)
        }
      }, {
        text: "流程",
        action: "showWorkflow",
        actionPayload: {},
        type: "default",
        plain: !0,
        isVisible: function() {
          return !0
        }
      }, {
        text: "驳回",
        action: "handleReject",
        actionPayload: {
          url: "/project/completionData/audit"
        },
        type: "danger",
        plain: !1,
        isVisible: function(e) {
          return ["form_data_xmb_audit", "form_data_zlb_audit"].includes(e.formKey)
        }
      }, {
        text: "通过",
        action: "handleApprove",
        actionPayload: {
          url: "/project/completionData/audit"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return ["form_data_xmb_audit", "form_data_zlb_audit"].includes(e.formKey)
        }
      }, {
        text: "上传审定单",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/completionData/process",
          field: "auditFile"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_data_xmb_upload_audit_file" === e.formKey
        }
      }, {
        text: "重新上传初始竣工资料",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/completionData/process",
          field: "initFile"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_data_start" === e.formKey
        }
      }, {
        text: "上传完善竣工资料",
        action: "uploadFiles",
        actionPayload: {
          url: "/project/completionData/process",
          field: "improveFile"
        },
        type: "primary",
        plain: !1,
        isVisible: function(e) {
          return "form_data_xmb_upload_approval_order" === e.formKey
        }
      }]
    }
  };
exports.default = i;