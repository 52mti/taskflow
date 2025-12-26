require("../../@babel/runtime/helpers/Arrayincludes"), Component({
  properties: {
    tableHeadList: {
      type: Array,
      value: []
    },
    tableBodyList: {
      type: Array,
      value: []
    }
  },
  data: {},
  methods: {
    onClickCell: function(e) {
      var t = e.currentTarget.dataset.value;
      if (t.startsWith("http")) {
        var a = t.slice(t.lastIndexOf(".") + 1).toLowerCase();
        ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(a) ? wx.previewImage({
          current: t,
          urls: [t]
        }) : (wx.showLoading({
          title: "加载中..."
        }), wx.downloadFile({
          url: t,
          success: function(e) {
            if (200 === e.statusCode) {
              var t = e.tempFilePath;
              wx.openDocument({
                filePath: t,
                showMenu: !0,
                fail: function(e) {
                  wx.showToast({
                    title: "打开失败",
                    icon: "none"
                  })
                }
              })
            }
          },
          complete: function() {
            return wx.hideLoading()
          }
        }))
      }
    }
  }
});