Page({
  data: {
    userInfo: {}
  },
  onShow: function() {
    "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
      selected: 1
    });
    var e = wx.getStorageSync("userInfo") || {
      name: "游客",
      role: "未知",
      avatar: ""
    };
    this.setData({
      userInfo: e
    })
  },
  handleLogout: function() {
    wx.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      success: function(e) {
        e.confirm && (wx.removeStorageSync("token"), wx.removeStorageSync("userInfo"), wx.reLaunch({
          url: "/pages/login/login"
        }))
      }
    })
  }
});