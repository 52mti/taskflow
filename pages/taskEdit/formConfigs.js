export const configs = {
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
}

export const apiPathMap = {
  KEY_PAYMENT_ORDER: '/project/paymentOrder/saveAndStartUpProcess',
  KEY_AUDIT_FEE: '/project/auditFee/saveAndStartUpProcess',
  KEY_INVOICE: '/project/invoice/saveAndStartUpProcess',
  KEY_DEPOSIT: '/project/deposit/saveAndStartUpProcess',
}
