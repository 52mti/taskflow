Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../@babel/runtime/helpers/objectSpread2"),
  t = function(e) {
    wx.showToast({
      title: e,
      icon: "none",
      duration: 2e3
    })
  },
  o = function() {
    wx.showModal({
      title: "提示",
      content: "登录已过期，请重新登录",
      showCancel: !1,
      success: function() {
        wx.clearStorageSync(), wx.reLaunch({
          url: "/pages/login/login"
        })
      }
    })
  },
  n = function(n) {
    var a = n.url.startsWith("http") ? n.url : "https://admin.sh-zktx.com/apit" + n.url,
      i = wx.getStorageSync("token"),
      c = wx.getStorageSync("tokenName"),
      r = e({
        "content-type": "application/json"
      }, n.header);
    return i && (r[c] = i), new Promise((function(e, i) {
      !0 === n.loading && wx.showLoading({
        title: "加载中...",
        mask: !0
      }), wx.request({
        url: a,
        method: n.method || "GET",
        data: n.data || {},
        header: r,
        timeout: 3e4,
        success: function(n) {
          var a = n.statusCode,
            c = n.data;
          a >= 200 && a < 300 ? 0 === c.code || 200 === c.code ? e(c) : 25000007 === c.code ? (o(), i(n)) : (t(c.msg || "业务逻辑错误"), i(c)) : 401 === a ? (o(), i(n)) : (t("服务器开小差了(".concat(a, ")")), i(n))
        },
        fail: function(e) {
          t("网络连接异常，请检查网络"), i(e)
        },
        complete: function() {
          !0 === n.loading && wx.hideLoading()
        }
      })
    }))
  };
exports.default = n;