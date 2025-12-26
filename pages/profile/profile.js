Page({
  data: {
    userInfo: {}
  },

  /**
   * 页面显示时触发
   */
  onShow: function() {
    // 1. 同步自定义 TabBar 的选中状态
    // 如果存在自定义 TabBar，则将其选中索引设为 1 (个人中心)
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }

    // 2. 获取并展示用户信息
    // 优先从本地缓存读取，若无缓存则显示默认的“游客”信息
    const cachedUser = wx.getStorageSync("userInfo") || {
      name: "游客",
      role: "未知",
      avatar: ""
    };

    this.setData({
      userInfo: cachedUser
    });
  },

  /**
   * 退出登录逻辑
   */
  handleLogout: function() {
    wx.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      success: function(res) {
        // 用户点击确定
        if (res.confirm) {
          // 清除本地存储的鉴权 Token 和用户信息
          wx.removeStorageSync("token");
          wx.removeStorageSync("userInfo");

          // 重定向跳转回登录页面
          wx.reLaunch({
            url: "/pages/login/login"
          });
        }
      }
    });
  }
});