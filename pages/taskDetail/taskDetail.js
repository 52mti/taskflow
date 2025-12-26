var t = require("../../@babel/runtime/helpers/defineProperty");
require("../../@babel/runtime/helpers/Arrayincludes");
var e = s(require("@vant/weapp/toast/toast")),
  a = s(require("../../utils/request")),
  i = s(require("./config")),
  n = s(require("@vant/weapp/dialog/dialog"));

function s(t) {
  return t && t.__esModule ? t : {
    default: t
  }
}
Page({
  data: {
    status: "",
    tabTableList: [],
    activeTab: 0,
    detailKeyList: [],
    btnList: [],
    rejectReason: "",
    handleBeforeClose: null,
    rejectDialogFocus: !1,
    showRejectDialog: !1,
    showApprovalDialog: !1,
    entityId: "",
    taskKey: "",
    formKey: "",
    processInstanceId: "",
    showFlow: !1,
    steps: [],
    activeStep: 1
  },
  clickButton: function(t) {
    var e = t.currentTarget.dataset.index,
      a = this.data.btnList[e];
    this[a.action](a.actionPayload)
  },
  onLoad: function(t) {
    this.setData({
      status: t.status
    }), "0" === t.status ? (this.setData({
      entityId: t.id
    }), this.fetchTaskDetail(t.id, t.processDefinitionId)) : this.fetchWorkflow(t.processInstanceId), this.setData({
      formKey: t.formKey
    })
  },
  fetchTaskDetail: function(t, e) {
    var n = this;
    (0, a.default)({
      url: i.default[e].url,
      method: "POST",
      data: {
        id: t
      }
    }).then((function(t) {
      var a = i.default[e].title || "详情";
      wx.setNavigationBarTitle({
        title: a
      });
      var s = i.default[e].btnList.filter((function(e) {
          return e.isVisible(t.data)
        })),
        o = s.find((function(t) {
          return "驳回" === t.text
        }));
      n.setData({
        handleBeforeClose: o ? n.handleBeforeClose.bind(n, o.actionPayload.url) : null,
        btnList: s
      });
      var l, r;
      n.setData({
        taskKey: t.data.taskKey,
        processInstanceId: t.data.processInstanceId,
        detailKeyList: (r = [], i.default[e].formField.forEach((function(e) {
          if (e.label) r.push({
            title: e.label,
            list: []
          });
          else {
            var a = t.data[e.key] || "",
              i = String(a).startsWith("http");
            r[r.length - 1].list.push({
              title: e.title,
              value: e.valueFormatter(a),
              fileValue: i ? a.split(",") : ""
            })
          }
        })), r),
        tabTableList: (l = [], i.default[e].tabList ? (i.default[e].tabList.forEach((function(e) {
          var a = t.data[e.key];
          l.push({
            title: e.title,
            tableHeadList: e.headerList,
            tableBodyList: a
          })
        })), l) : [])
      })
    }))
  },
  fetchWorkflow: function(t) {
    var e = this;
    (0, a.default)({
      url: "/task/workflowTask/getTaskTimeline/".concat(t),
      method: "POST"
    }).then((function(t) {
      wx.setNavigationBarTitle({
        title: "流程详情"
      });
      var a = t.data.map((function(t) {
        return {
          text: t.name,
          desc: "".concat(t.updated, "\n").concat(t.executorName)
        }
      }));
      t.data[t.data.length - 1].finishTime && a.push({
        text: "已完成"
      }), e.setData({
        steps: a,
        activeStep: a.length - 1
      })
    }))
  },
  onClickFile: function(t) {
    var e = t.currentTarget.dataset.file,
      a = e.slice(e.lastIndexOf(".") + 1).toLowerCase();
    ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(a) ? wx.previewImage({
      current: e,
      urls: [e]
    }) : (wx.showLoading({
      title: "加载中..."
    }), wx.downloadFile({
      url: e,
      success: function(t) {
        if (200 === t.statusCode) {
          var e = t.tempFilePath;
          wx.openDocument({
            filePath: e,
            showMenu: !0,
            fail: function(t) {
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
  },
  navigateBack: function() {
    var t = getCurrentPages();
    t.length > 1 && t[t.length - 2].setData({
      refreshWhenShow: !0
    });
    wx.navigateBack()
  },
  showWorkflow: function() {
    this.fetchWorkflow(this.data.processInstanceId), this.setData({
      showFlow: !0
    })
  },
  closeWorkflow: function() {
    this.setData({
      showFlow: !1
    })
  },
  handleApprove: function(t) {
    var i = this,
      s = t.url;
    n.default.confirm({
      title: "确定通过吗？",
      beforeClose: function(t) {
        return new Promise((function(n) {
          "cancel" !== t ? (0, a.default)({
            url: s,
            method: "POST",
            data: {
              id: i.data.entityId,
              auditStatus: 1,
              formKey: i.data.formKey,
              taskKey: i.data.taskKey
            }
          }).then((function() {
            n(!0), e.default.success("已通过"), i.navigateBack()
          })).catch((function() {
            n(!1), e.default.fail("审批失败")
          })) : n(!0)
        }))
      }
    }).catch((function() {}))
  },
  handleBeforeClose: function(t, i) {
    var n = this;
    return "cancel" === i ? Promise.resolve(!0) : this.data.rejectReason ? new Promise((function(i) {
      (0, a.default)({
        url: t,
        method: "POST",
        data: {
          id: n.data.entityId,
          auditStatus: 2,
          formKey: n.data.formKey,
          taskKey: n.data.taskKey,
          auditRemarks: n.data.rejectReason
        }
      }).then((function() {
        e.default.success("已驳回"), i(!0), n.navigateBack()
      })).catch((function(t) {
        e.default.fail(t.msg), i(!0)
      }))
    })) : (wx.showToast({
      title: "请输入内容",
      icon: "none"
    }), Promise.resolve(!1))
  },
  handleReject: function() {
    var t = this;
    this.setData({
      showRejectDialog: !0
    }), setTimeout((function() {
      t.setData({
        rejectDialogFocus: !0
      })
    }), 200)
  },
  uploadFiles: function(i) {
    var n = this,
      s = i.url,
      o = i.field;
    wx.chooseMedia({
      count: 100,
      mediaType: ["image", "video"],
      sourceType: ["album", "camera"],
      success: function(i) {
        var l = wx.getStorageSync("token"),
          r = wx.getStorageSync("tokenName"),
          u = e.default.loading({
            duration: 0,
            forbidClick: !0,
            message: "上传中...",
            selector: "#custom-selector"
          }),
          c = i.tempFiles.map((function(a) {
            return function(a, i, n) {
              return new Promise((function(s) {
                wx.uploadFile({
                  url: "https://admin.sh-zktx.com/apit/general/file/upload",
                  filePath: a,
                  name: "file",
                  header: t({}, n, i),
                  success: function(t) {
                    e.default.clear();
                    var a = JSON.parse(t.data);
                    200 === a.code ? s(a.data) : s("")
                  },
                  fail: function() {
                    s("")
                  }
                })
              }))
            }(a.tempFilePath, l, r)
          }));
        Promise.all(c).then((function(t) {
          return t.filter(Boolean)
        })).then((function(i) {
          return e.default.clear(), 0 === i.length ? (u.setData({
            message: "上传失败"
          }), void e.default.clear()) : (c.length > i.length && (0, e.default)("部分上传成功"), c.length === i.length && (0, e.default)("上传成功"), u.setData({
            message: "保存中..."
          }), (0, a.default)({
            url: s,
            method: "POST",
            data: t({
              id: n.data.entityId,
              formKey: n.data.formKey,
              taskKey: n.data.taskKey
            }, o, i.join(","))
          }), c.length === i.length)
        })).then((function(t) {
          t && n.navigateBack()
        }))
      }
    })
  }
});