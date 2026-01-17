import { getConstructionTeam, getUnitDetailList } from '../../utils/https'

Page({
  data: {
    // --- 单选数据 ---
    showSingle: false,
    loadingSingle: false,
    singleColumns: [], // 格式: [{text:'施工队名称', id: '123'}, ...]
    selectedTeamId: '', // 选中的施工队ID

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
    tableBodyList: [], // 表格数据
    selectedIds: [], // 表格选中的行ID
  },

  async onLoad(options) {
    // 1. 解析路由传来的初始数据
    let initialData = {}
    if (options.initialData) {
      try {
        initialData = JSON.parse(decodeURIComponent(options.initialData))
        this.__initialData = initialData
      } catch (e) {
        console.error('初始数据解析失败', e)
      }
    }

    // 2. 处理 picker 的列表数据 - 来自 getConstructionTeam
    let constructionTeams = []
    try {
      const res = await getConstructionTeam()
      constructionTeams = res.data?.list || []
    } catch (err) {
      console.error('获取施工队列表失败', err)
    }

    const singleColumns = constructionTeams.map((item) => ({
      text: item.name,
      id: item.id,
      ...item,
    }))

    // 3. 加载表格数据 - 来自 getUnitDetailList
    let tableBodyList = []
    try {
      const res = await getUnitDetailList(initialData.projectId)
      tableBodyList = res.data?.list || []
    } catch (err) {
      console.error('获取施工队列表失败', err)
    }

    // 4. 处理回显逻辑
    // 回显选中的施工队名称
    const selectedTeamId = initialData.constructionTeamId || ''

    // 回显表格选中项 - 根据已有的合作施工队ID列表
    const selectedIds = initialData.unitDetailList.map(unit => unit.id) || []

    this.setData({
      singleColumns,
      tableBodyList,
      selectedTeamId,
      selectedIds,
    })
  },

  // =========================
  // 单选 Picker 逻辑
  // =========================
  onOpenSinglePicker() {
    this.setData({ showSingle: true })
  },

  onCloseSinglePicker() {
    this.setData({ showSingle: false })
  },

  // =========================
  // 表格选择逻辑
  // =========================
  onSelectionChange(event) {
    const { selectedIds, selectedRows } = event.detail
    console.log('表格选择变化，选中ID列表：', selectedIds)
    console.log('表格选择变化，选中行数据：', selectedRows)
    this.setData({ selectedIds })
  },

  onConfirmSingle(event) {
    const { value } = event.detail // value 包含 {text, id, ...}
    this.setData({
      selectedTeamId: value.id,
      showSingle: false,
    })
    console.log('单选结果：', value)
  },
})
