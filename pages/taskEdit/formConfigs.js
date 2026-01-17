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
                  formModel.materialName = row.label
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
                  formModel.supplierName = row.label
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
  KEY_CONSTRUCTION_TEAM: [],
  // 8. 分配项目/框架项目审批
  KEY_DISTRIBUTION_PROJECT: [],
  get KEY_FRAMEWORK_PROJECT() {
    return this.KEY_DISTRIBUTION_PROJECT
  },
  // 9. 施工队合作审批（额外调转页面）
  KEY_PROJECT_CO_OPERATION: [],
  // 10. 施工队结算审批模块
  KEY_SETTLEMENT: [],
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
