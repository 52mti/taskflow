export const configs = {
  // 1. 用款审批
  KEY_PAYMENT_ORDER: [
    {
      label: '用款用途',
      key: 'typeId',
      type: 'dynamicPicker',
      columns: [],
      required: true,
      apiType: 'dictionary',
      apiKey: 'PAYMENT_TYPE',
    },
    {
      label: '用款金额',
      key: 'amount',
      type: 'number',
      placeholder: '请输入用款金额',
      required: true,
    },
    {
      label: '用款说明',
      key: 'purpose',
      type: 'textarea',
      placeholder: '请输入用款说明',
    },
    {
      label: '备注',
      key: 'remark',
      type: 'textarea',
      placeholder: '请输入备注',
    },
  ],
  // 2. 审计费审批
  KEY_AUDIT_FEE: [
    {
      label: '用款类型',
      key: 'typeId',
      type: 'dynamicPicker',
      columns: [],
      required: true,
      apiType: 'dictionary',
      apiKey: 'AUDIT_FEES',
    },
    {
      label: '用款金额',
      key: 'amount',
      type: 'number',
      placeholder: '请输入用款金额',
      required: true,
    },
    {
      label: '用款用途',
      key: 'purpose',
      type: 'textarea',
      placeholder: '请输入用款用途',
    },
    {
      label: '备注',
      key: 'remark',
      type: 'textarea',
      placeholder: '请输入备注',
    },
  ],
  // 3. 开票审批模块
  KEY_INVOICE: [
    {
      required: true,
      type: 'dynamicPicker',
      key: 'customerId',
      apiType: 'customer',
      label: '客户名称',
      columns: [],
    },
    {
      required: true,
      label: '结算单号',
      key: 'settlementNo',
      type: 'text',
    },
    {
      required: true,
      label: '纳税人识别号',
      key: 'taxpayerIdentificationNumber',
      type: 'text',
    },
    {
      type: 'number',
      disabled: true,
      label: '订单应开票金额',
      key: 'orderActualAmount',
    },
    {
      type: 'number',
      disabled: true,
      label: '订单已开票金额',
      key: 'invoiceAmount',
    },
    {
      type: 'number',
      disabled: true,
      label: '订单未开票金额',
      key: 'unInvoiceAmount',
    },
    {
      type: 'number',
      width: 200,
      label: '本次开票申请不含税金额',
      key: 'currentInvoiceAmountWithoutTaxTotal',
    },
    {
      type: 'number',
      label: '本次开票申请税率',
      key: 'currentInvoiceRate',
    },
    {
      type: 'number',
      disabled: true,
      label: '本次开票申请含税金额',
      key: 'currentInvoiceExcludingTaxTotal',
    },
  ],
  // 4. 保证金审批模块
  KEY_DEPOSIT: [
    {
      type: 'number',
      required: true,
      label: '保证金金额',
      key: 'amount',
    },
    {
      type: 'date',
      label: '返还日期',
      key: 'refundDate',
    },
    {
      label: '备注',
      key: 'remark',
      type: 'textarea',
      placeholder: '请输入备注',
    },
  ],
  // 5. 采购单审批
  KEY_PURCHASE_ORDER: [
    {
      label: '基础信息',
      type: 'divider',
    },
    {
      width: 200,
      label: '采购单号',
      key: 'code',
      type: 'text',
      disabled: true,
    },
    {
      label: '采购单名称',
      key: 'name',
      type: 'text',
    },
    {
      type: 'number',
      required: true,
      label: '采购单金额',
      key: 'totalCost',
    },
    {
      label: '采购明细',
      type: 'divider',
    },
    {
      type: 'tableForm',
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
            {
              key: 'isSpecialName',
              value: '是否专项材料',
              valueType: 'string',
            },
            { key: '', value: '操作', useSlot: true },
          ],
          formSchema: [
            {
              type: 'dynamicPicker',
              columns: [],
              label: '物料名称',
              key: 'materialId',
              apiType: 'material',
              onPickerConfirm: (row, formModel) => {
                if (formModel) {
                  formModel.specification = row.specification
                  formModel.unit = row.unit
                  formModel.materialName = row.value || row.name || row.label
                  formModel.price = row.price
                }
              },
            },
            {
              placeholder: '选择物料名称后带出',
              disabled: true,
              label: '物料规格',
              key: 'specification',
              type: 'text',
            },
            {
              disabled: true,
              placeholder: '选择物料名称后带出',
              label: '计量单位',
              key: 'unit',
              type: 'text',
            },
            {
              type: 'number',
              required: true,
              label: '物料数量',
              key: 'quantity',
            },
            {
              type: 'number',
              label: '物料单价',
              key: 'price',
            },
            {
              type: 'number',
              label: '费用',
              key: 'amount',
            },
            {
              type: 'dynamicPicker',
              label: '供应商',
              key: 'supplierId',
              columns: [],
              apiType: 'supplier',
              onPickerConfirm: (row, formModel) => {
                if (formModel) {
                  formModel.supplierName = row.value || row.name || row.label
                }
              },
            },
            {
              title: '是否专项材料',
              type: 'picker',
              label: '是否专项材料',
              key: 'isSpecial',
              columns: [
                {
                  key: 0,
                  value: '否',
                },
                {
                  key: 1,
                  value: '是',
                },
              ],
              defaultValue: 0,
            },
          ],
        },
      ],
      label: '采购明细',
      key: 'purchaseOrderItemList',
    },
  ],
  // 6. 供应商审批
  KEY_SUPPLIER: [
    {
      label: '基础信息',
      type: 'divider',
    },
    {
      label: '供应商编号',
      key: 'code',
      type: 'text',
      disabled: true,
    },
    {
      label: '供应商名称',
      key: 'name',
      type: 'text',
      required: true,
    },
    {
      label: '供应商简称',
      key: 'shortName',
      type: 'text',
    },
    {
      label: '供应商类型',
      key: 'typeId',
      type: 'dynamicPicker',
      apiType: 'dictionary',
      apiKey: 'supplier-type',
      columns: [],
    },
    {
      label: '联系人',
      key: 'linkman',
      type: 'text',
      required: true,
    },
    {
      label: '联系方式',
      key: 'linkPhone',
      type: 'text',
    },
    {
      label: '备注',
      key: 'remarks',
      type: 'textarea',
    },
    {
      label: '收款信息',
      type: 'divider',
    },
    {
      label: '企业全称',
      key: 'enterpriseName',
      type: 'text',
    },
    {
      label: '对公银行账号',
      key: 'bankAccount',
      type: 'text',
    },
    {
      label: '对公银行名称',
      key: 'bankName',
      type: 'text',
    },
    {
      label: '联系电话',
      key: 'contactPhone',
      type: 'text',
    },
    {
      label: '联系地址',
      key: 'contactAddress',
      type: 'text',
    },
    {
      label: '文件资料',
      key: 'files',
      type: 'file',
    },
  ],
  // 7. 施工队审批
  KEY_CONSTRUCTION_TEAM: [
    {
      label: '基础信息',
      type: 'divider',
    },
    {
      label: '施工队编号',
      key: 'code',
      type: 'text',
      disabled: true,
      placeholder: '自动生成',
    },
    {
      label: '施工队名称',
      key: 'name',
      type: 'text',
      required: true,
    },
    {
      label: '负责人',
      key: 'chargePersonName',
      type: 'text',
      required: true,
    },
    {
      label: '负责人联系方式',
      key: 'chargePersonPhone',
      type: 'text',
      required: true,
    },
    {
      label: '备注',
      key: 'remarks',
      type: 'textarea',
      placeholder: '请输入备注',
    },
    {
      label: '收款信息',
      type: 'divider',
    },
    {
      label: '企业全称',
      key: 'enterpriseName',
      type: 'text',
    },
    {
      label: '对公银行账户',
      key: 'bankAccount',
      type: 'text',
    },
    {
      label: '对公银行名称',
      key: 'bankName',
      type: 'text',
    },
    {
      label: '联系电话',
      key: 'contactPhone',
      type: 'text',
    },
    {
      label: '联系地址',
      key: 'contactAddress',
      type: 'text',
    },
    {
      label: '人员信息',
      type: 'divider',
    },
    {
      type: 'tableForm',
      tabList: [
        {
          key: 'constructionUserList',
          title: '人员信息',
          headerList: [
            { key: 'name', value: '姓名', valueType: 'string' },
            { key: 'sexId', value: '性别', valueType: 'string' },
            { key: 'educationName', value: '学历', valueType: 'string' },
            { key: 'idNo', value: '证件号码', valueType: 'string' },
            { key: 'linkPhone', value: '联系方式', valueType: 'string' },
            { key: 'workTypeName', value: '工种', valueType: 'string' },
            { key: 'certificateTypeName', value: '证书类型', valueType: 'string' },
            { key: 'certificateName', value: '证书名称', valueType: 'string' },
            { key: 'certificateValidity', value: '证书有效期', valueType: 'string' },
            { key: '', value: '操作', useSlot: true },
          ],
          formSchema: [
            {
              label: '姓名',
              key: 'name',
              type: 'text',
              required: true,
            },
            {
              label: '性别',
              key: 'sexId',
              type: 'dynamicPicker',
              columns: [],
              apiType: 'dictionary',
              apiKey: 'FACULTY_GENDER',
            },
            {
              label: '学历',
              key: 'education',
              type: 'dynamicPicker',
              columns: [],
              apiType: 'dictionary',
              apiKey: 'EDUCATION_TYPE',
            },
            {
              label: '证件号码',
              key: 'idNo',
              type: 'text',
            },
            {
              label: '联系方式',
              key: 'linkPhone',
              type: 'text',
              required: true,
            },
            {
              label: '工种',
              key: 'workType',
              type: 'dynamicPicker',
              columns: [],
              apiType: 'dictionary',
              apiKey: 'trade',
            },
            {
              label: '证书类型',
              key: 'certificateType',
              type: 'dynamicPicker',
              columns: [],
              apiType: 'dictionary',
              apiKey: 'CERTIFICATE_TYPE',
            },
            {
              label: '证书名称',
              key: 'certificateName',
              type: 'dynamicPicker',
              columns: [],
              apiType: 'dictionary',
              apiKey: 'QUALIFICATION_CERTIFICATE',
            },
            {
              label: '证书有效期',
              key: 'certificateValidity',
              type: 'date',
            },
            {
              label: '证书文件',
              key: 'certificateFile',
              type: 'file',
            },
          ],
        },
      ],
      label: '人员信息',
      key: 'constructionUserList',
    },
  ],
  // 8. 分配项目/框架项目审批
  KEY_DISTRIBUTION_PROJECT: [
    {
      label: '招投标名称',
      key: 'biddingId',
      type: 'dynamicPicker',
      columns: [],
      apiType: 'bidding',
    },
    {
      label: '客户名称',
      key: 'customerId',
      type: 'dynamicPicker',
      columns: [],
      required: true,
      apiType: 'customer',
    },
    {
      label: '项目类型',
      key: 'projectType',
      type: 'picker',
      required: true,
      columns: [
        { key: 0, value: '框架项目' },
        { key: 1, value: '单项项目' },
      ],
    },
    {
      label: '项目名称',
      key: 'name',
      type: 'text',
      required: true,
    },
    {
      label: '备注',
      key: 'remark',
      type: 'textarea',
      placeholder: '请输入备注',
    },
  ],
  get KEY_FRAMEWORK_PROJECT() {
    return this.KEY_DISTRIBUTION_PROJECT
  },
  // 9. 施工队合作审批（额外调转页面）
  KEY_PROJECT_CO_OPERATION: [],
  // 10. 施工队结算审批模块
  KEY_SETTLEMENT: [
    {
      label: '施工队名称',
      key: 'constructionTeamId',
      type: 'dynamicPicker',
      columns: [],
      required: true,
      apiType: 'constructionTeamCooperate',
      onPickerConfirm: (row, formModel) => {
        if (formModel) {
          formModel.constructionTeamName = row.value || row.name || row.label
          formModel.discountRate = row.discountRate
        }
      },
    },
    {
      label: '折扣率',
      key: 'discountRate',
      type: 'number',
      disabled: true,
    },
    {
      label: '应结算金额',
      key: 'shouldSettlementAmount',
      type: 'number',
      disabled: true,
    },
    {
      label: '已结算金额',
      key: 'alreadySettlementAmount',
      type: 'number',
      disabled: true,
    },
    {
      label: '本次最终结算金额',
      key: 'finalSettlementAmount',
      type: 'number',
      disabled: true,
    },
    {
      label: '本次申请结算金额',
      key: 'applySettlementAmount',
      type: 'number',
    },
    {
      type: 'tableForm',
      tabList: [
        {
          key: 'unitDetailSettlementList',
          title: '结算明细',
          headerList: [
            { key: 'unitDetailId', value: '单位明细', valueType: 'string' },
            { key: 'constructionFee', value: '单位明细费用', valueType: 'amount' },
            { key: 'discountRate', value: '折扣率', valueType: 'percent' },
            { key: 'shouldSettlementAmount', value: '单位应结算金额', valueType: 'amount' },
            { key: 'alreadySettlementAmount', value: '已结算金额', valueType: 'amount' },
            { key: 'unsettledAmount', value: '未结算金额', valueType: 'amount' },
            { key: 'applySettlementAmount', value: '本次申请结算金额', valueType: 'amount' },
            { key: '', value: '操作', useSlot: true },
          ],
          formSchema: [
            {
              label: '单位明细',
              key: 'unitDetailId',
              type: 'dynamicPicker',
              columns: [],
              required: true,
              apiType: 'unitDetailSettlement',
              onPickerConfirm: (row, formModel) => {
                if (formModel) {
                  formModel.unitDetailName = row.value || row.name || row.label
                  formModel.constructionFee = row.constructionFee
                  formModel.discountRate = row.discountRate
                  formModel.settlementAmount = row.settlementAmount || 0
                  formModel.alreadySettlementAmount = row.alreadySettlementAmount
                  formModel.shouldSettlementAmount = row.shouldSettlementAmount
                  formModel.unsettledAmount = row.unsettledAmount
                }
              },
            },
            {
              label: '单位明细费用',
              key: 'constructionFee',
              type: 'number',
              disabled: true,
            },
            {
              label: '折扣率',
              key: 'discountRate',
              type: 'number',
              required: true,
            },
            {
              label: '单位应结算金额',
              key: 'shouldSettlementAmount',
              type: 'number',
              disabled: true,
            },
            {
              label: '已结算金额',
              key: 'alreadySettlementAmount',
              type: 'number',
              disabled: true,
            },
            {
              label: '未结算金额',
              key: 'unsettledAmount',
              type: 'number',
              disabled: true,
            },
            {
              label: '本次申请结算金额',
              key: 'applySettlementAmount',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
      label: '结算明细',
      key: 'unitDetailSettlementList',
    },
  ],
  // 11. 竣工资料审批
  KEY_COMPLETION: [
    {
      label: '初始竣工资料',
      key: 'initFile',
      type: 'file',
    },
  ],
}

export const apiPathMap = {
  KEY_PAYMENT_ORDER: '/project/paymentOrder/saveAndStartUpProcess',
  KEY_AUDIT_FEE: '/project/auditFee/saveAndStartUpProcess',
  KEY_INVOICE: '/project/invoice/saveAndStartUpProcess',
  KEY_DEPOSIT: '/project/deposit/saveAndStartUpProcess',
  KEY_PURCHASE_ORDER: '/project/purchaseOrder/saveAndStartUpProcess',
  KEY_SUPPLIER: '/project/supplier/saveAndStartUpProcess',
  KEY_CONSTRUCTION_TEAM: '/project/constructionTeam/saveAndStartUpProcess',
  KEY_DISTRIBUTION_PROJECT: '/project/frameworkProject/saveAndStartUpProcess',
  KEY_FRAMEWORK_PROJECT: '/project/frameworkProject/saveAndStartUpProcess',
  KEY_PROJECT_CO_OPERATION: '/project/constructionTeamCooperate/saveAndStartUpProcess',
  KEY_SETTLEMENT: '/project/settlement/saveAndStartUpProcess',
  KEY_COMPLETION: '/project/completionData/saveAndStartUpProcess',
}
