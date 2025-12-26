App({
  onLaunch: function() {
    wx.getStorageSync("token") && wx.redirectTo("/pages/taskList/taskList")
  },
  globalData: {
    userInfo: null,
    user: null
  }
});