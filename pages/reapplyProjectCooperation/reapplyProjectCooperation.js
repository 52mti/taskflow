Page({
  data: {
    // --- 单选数据 ---
    showSingle: false,
    loadingSingle: false,
    singleColumns: [], // 格式: ['北京', '上海'] 或 [{text:'北京'}, ...]
    selectedCity: '',

    // --- 多选数据 ---
    loadingMulti: false,
    multiOptions: [], // 格式: [{id: 1, name: '篮球'}, ...]

    // --- 表格 ---
    headerList: [
      { key: 'name', value: '单项名称', valueType: 'string' },
      { key: 'district', value: '行政区', valueType: 'string' },
      { key: 'constructionFee', value: '施工费', valueType: 'amount' },
      {
        key: 'constructionTeamCooperateName',
        value: '合作施工队',
        valueType: 'string',
      },
    ],
  },

  onLoad() {
    // 页面加载时，可以预加载数据，或者点击时再加载
  },

  // =========================
  // 1. 单选 Picker 逻辑
  // =========================
  onOpenSinglePicker() {
    this.setData({ showSingle: true })
    // 如果没有数据，请求接口
    if (this.data.singleColumns.length === 0) {
      this.fetchSingleData()
    }
  },

  onSelectionChange(event) {
    const { selectedIds, selectedRows } = event.detail;
    console.log('表格选择变化，选中ID列表：', selectedIds);
    console.log('表格选择变化，选中行数据：', selectedRows);
  },

  onCloseSinglePicker() {
    this.setData({ showSingle: false })
  },

  // 模拟 API 请求城市数据
  fetchSingleData() {
    this.setData({ loadingSingle: true })
    // 模拟网络延迟
    setTimeout(() => {
      const apiData = [
        { text: '北京市', id: 101 },
        { text: '上海市', id: 102 },
        { text: '广州市', id: 103 },
        { text: '深圳市', id: 104 },
      ]
      this.setData({
        singleColumns: apiData,
        loadingSingle: false,
      })
    }, 1000)
  },

  onConfirmSingle(event) {
    const { value } = event.detail // value 包含 {text, id}
    this.setData({
      selectedCity: value.text,
      showSingle: false,
    })
    console.log('单选结果：', value)
  },

  // 模拟 API 请求兴趣数据
  fetchMultiData() {
    this.setData({ loadingMulti: true })
    setTimeout(() => {
      const apiData = [
        { id: '1', name: '编程' },
        { id: '2', name: '阅读' },
        { id: '3', name: '健身' },
        { id: '4', name: '旅行' },
        { id: '5', name: '摄影' },
      ]
      this.setData({
        multiOptions: apiData,
        loadingMulti: false,
      })
    }, 800)
  },
})
