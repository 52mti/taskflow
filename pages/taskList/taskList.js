import request from '../../utils/request'
import { getDayRange } from '../../utils/util'

Page({
  data: {
    userId: '',
    keyword: '',
    startDate: '',
    endDate: '',
    statusLabel: '', // 过滤状态：待办、已办、全部
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: new Date().getTime(),
    formatedDate: '',
    showCalendar: false,
    showPicker: false,
    statusColumns: ['全部', '待办', '已办'],
    refreshWhenShow: false, // 详情页返回时是否触发刷新
    taskList: [],
    page: 1,
    loading: false,
    finished: false,
  },

  _searchTimer: null,

  onShow: function () {
    // 处理自定义 TabBar 选中态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }

    wx.setNavigationBarTitle({ title: '任务列表' })

    // 检查是否需要刷新（通常由详情页操作后触发）
    if (this.data.refreshWhenShow) {
      this.fetchTasks(true)
      this.setData({ refreshWhenShow: false })
    }
  },

  onLoad: function () {
    const userInfo = wx.getStorageSync('userInfo')
    const userId = (userInfo && userInfo.id) || ''

    this.setData({ userId })
    this.fetchTasks(true) // 首次进入加载
  },

  /**
   * 获取任务列表数据
   * @param {Boolean} isRefresh 是否重置列表（用于搜索、筛选、下拉刷新）
   */
  fetchTasks: function (isRefresh = false) {
    if (this.data.loading) return

    if (isRefresh) {
      this.setData({
        page: 1,
        finished: false,
        taskList: [],
      })
    }

    if (this.data.finished) return

    this.setData({ loading: true })

    // 状态标签转为后端 API 定义的 state (0: 待办, 1: 已办)
    const statusMap = { 待办: 0, 已办: 1 }

    request({
      url: '/task/workflowTask',
      method: 'POST',
      data: {
        executor: this.data.userId,
        page: this.data.page,
        pageSize: 10,
        state: statusMap[this.data.statusLabel],
        name: this.data.keyword || undefined,
        // 日期范围查询
        rangeQueryDtoList: this.data.startDate
          ? [
              {
                name: 'created',
                startValue: getDayRange(this.data.startDate).startTime,
                endValue: getDayRange(this.data.endDate).endTime,
              },
            ]
          : undefined,
      },
    })
      .then((res) => {
        const newList = res.data.list
        const total = res.data.total

        this.setData({
          taskList: this.data.taskList.concat(newList),
          page: this.data.page + 1,
          // 判断是否已加载全部
          finished: 10 * this.data.page >= total,
        })
      })
      .catch(() => {
        this.setData({ finished: false })
      })
      .finally(() => {
        this.setData({ loading: false })
      })
  },

  /**
   * 搜索框确认搜索
   */
  onSearch: function (e) {
    this.setData({ keyword: e.detail })
    this.fetchTasks(true)
  },

  /**
   * 搜索框输入时触发（带 500ms 防抖）
   */
  onSearchChange: function (e) {
    const value = e.detail
    this.setData({ keyword: value })

    if (this._searchTimer) clearTimeout(this._searchTimer)

    this._searchTimer = setTimeout(() => {
      this.onSearch(e)
    }, 500)
  },

  /**
   * 日期筛选相关逻辑
   */
  showCalendar: function () {
    this.setData({ showCalendar: true })
    // 弹出日历时隐藏 TabBar 防止遮挡
    if (this.getTabBar()) this.getTabBar().setData({ showTab: false })
  },

  onClearDate: function () {
    this.setData({
      startDate: '',
      endDate: '',
      formatedDate: '',
    })
    this.fetchTasks(true)
  },

  onCalendarClose: function () {
    this.setData({ showCalendar: false })
    if (this.getTabBar()) this.getTabBar().setData({ showTab: true })
  },

  onCalendarConfirm: function (e) {
    const [start, end] = e.detail
    this.setData({
      showCalendar: false,
      startDate: start,
      endDate: end,
    })
    this.setData({ formatedDate: this.deriveFormatedDate() })
    this.fetchTasks(true)
    if (this.getTabBar()) this.getTabBar().setData({ showTab: true })
  },

  formatDate: (date) => `${date.getMonth() + 1}/${date.getDate()}`,

  deriveFormatedDate: function () {
    const { startDate, endDate } = this.data
    return startDate && endDate
      ? `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`
      : ''
  },

  /**
   * 状态筛选相关逻辑 (待办/已办)
   */
  showStatusPicker: function () {
    this.setData({ showPicker: true })
  },

  onPickerConfirm: function (e) {
    const value = e.detail.value
    this.setData({
      showPicker: false,
      statusLabel: value === '全部' ? '' : value,
    })
    this.fetchTasks(true)
  },

  onPickerClose: function () {
    this.setData({ showPicker: false })
  },

  /**
   * 列表触底加载更多
   */
  loadMore: function () {
    this.fetchTasks()
  },

  /**
   * 跳转至详情页
   */
  goToDetail: function (e) {
    const { id, status, processDefinitionId, processInstanceId, formKey } =
      e.currentTarget.dataset

    // 注意：processDefinitionId 在 URL 传参时截取了冒号前的内容，与 config.js 的 Key 对应
    const configKey = processDefinitionId.split(':')[0]

    const url = `/pages/taskDetail/taskDetail?id=${id}&status=${status}&processDefinitionId=${configKey}&processInstanceId=${processInstanceId}&formKey=${formKey}`

    wx.navigateTo({ url })
  },
})
