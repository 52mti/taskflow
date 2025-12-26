/**
 * 自定义底部导航栏组件
 */
Component({
  /**
   * 组件的初始数据
   */
  data: {
    showTab: true, // 控制 TabBar 的显示与隐藏（常用于全屏弹窗时隐藏）
    selected: 0, // 当前选中的 Tab 索引
    color: '#7d7e80', // 未选中时的文字颜色
    selectedColor: '#1989fa', // 选中时的文字颜色

    // 导航列表配置
    list: [
      {
        pagePath: '/pages/taskList/taskList',
        iconPath: '/images/task.png',
        selectedIconPath: '/images/task-active.png',
        text: '任务',
      },
      {
        pagePath: '/pages/profile/profile',
        iconPath: '/images/user.png',
        selectedIconPath: '/images/user-active.png',
        text: '我的',
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 切换标签页
     * @param {Object} e 微信原生事件对象，e.detail 通常为点击的索引
     */
    switchTab: function (e) {
      const index = e.detail // 获取点击的下标
      const path = this.data.list[index].pagePath

      // 调用微信原生 switchTab 接口跳转页面
      wx.switchTab({
        url: path,
      })
    },
  },
})
