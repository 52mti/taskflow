export const configs = {
  KEY_PAYMENT_ORDER: [
    {
      label: '用款用途',
      key: 'typeId',
      type: 'picker',
      columns: [],
      required: true,
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
}

export const apiPathMap = {
  KEY_PAYMENT_ORDER: '/project/paymentOrder/saveAndStartUpProcess',
}
