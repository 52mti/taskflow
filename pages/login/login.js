var a, t = (a = require("@vant/weapp/toast/toast")) && a.__esModule ? a : {
  default: a
};
Page({
  data: {
    username: "",
    password: ""
  },
  onUserChange: function(a) {
    this.setData({
      username: a.detail
    })
  },
  onPwdChange: function(a) {
    this.setData({
      password: a.detail
    })
  },
  handleLogin: function() {
    this.data.username && this.data.password ? (t.default.loading({
      message: "登录中...",
      forbidClick: !0
    }), wx.request({
      url: "https://admin.sh-zktx.com/apit/user/user/login",
      method: "POST",
      data: {
        username: this.data.username,
        password: this.data.password,
        userType: 1,
        device: "Mini App"
      },
      header: {
        "content-type": "application/json"
      },
      success: function(a) {
        var t = a.data;
        if (200 === t.status) {
          var e = t.data.user;
          wx.setStorageSync("token", t.data.token), wx.setStorageSync("tokenName", t.data.tokenName), wx.setStorageSync("userInfo", {
            id: e.id,
            name: e.name,
            role: e.roleCode,
            avatar: e.avatar || "https://admin.sh-zktx.com/fuxit/assets/header-MoI1THJb.jpg"
          }), wx.switchTab({
            url: "/pages/taskList/taskList"
          })
        } else wx.showToast({
          title: t.msg,
          icon: "error"
        })
      },
      fail: function(a) {
        console.error("请求失败：", a), wx.showToast({
          title: "网络错误",
          icon: "error"
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })) : t.default.fail("请填写账号密码")
  }
});