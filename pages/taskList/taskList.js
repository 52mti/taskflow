var t, a = require("../../@babel/runtime/helpers/slicedToArray"),
  e = (t = require("../../utils/request")) && t.__esModule ? t : {
    default: t
  },
  s = require("../../utils/util");
Page({
  data: {
    userId: "",
    keyword: "",
    startDate: "",
    endDate: "",
    statusLabel: "",
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: (new Date).getTime(),
    formatedDate: "",
    showCalendar: !1,
    showPicker: !1,
    statusColumns: ["全部", "待处理", "已处理"],
    refreshWhenShow: !1,
    taskList: [],
    page: 1,
    loading: !1,
    finished: !1
  },
  _searchTimer: null,
  onShow: function() {
    "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
      selected: 0
    }), wx.setNavigationBarTitle({
      title: "任务列表"
    }), this.data.refreshWhenShow && (this.fetchTasks(!0), this.setData({
      refreshWhenShow: !1
    }))
  },
  onLoad: function() {
    var t, a = (null === (t = wx.getStorageSync("userInfo")) || void 0 === t ? void 0 : t.id) || "";
    this.setData({
      userId: a
    }), this.fetchTasks(!0)
  },
  fetchTasks: function() {
    var t = this,
      a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    if (!this.data.loading && (a && this.setData({
        page: 1,
        finished: !1,
        taskList: []
      }), !this.data.finished)) {
      this.setData({
        loading: !0
      });
      var i = {
        "待处理": 0,
        "已处理": 1
      };
      (0, e.default)({
        url: "/task/workflowTask",
        method: "POST",
        data: {
          executor: this.data.userId,
          page: this.data.page,
          pageSize: 10,
          state: i[this.data.statusLabel],
          name: this.data.keyword || void 0,
          rangeQueryDtoList: this.data.startDate ? [{
            name: "created",
            startValue: (0, s.getDayRange)(this.data.startDate).startTime,
            endValue: (0, s.getDayRange)(this.data.endDate).endTime
          }] : void 0
        }
      }).then((function(a) {
        t.setData({
          taskList: t.data.taskList.concat(a.data.list),
          page: t.data.page + 1,
          finished: 10 * t.data.page >= a.data.total
        })
      })).catch((function() {
        t.data.finished = !1
      })).finally((function() {
        t.setData({
          loading: !1
        })
      }))
    }
  },
  onSearch: function(t) {
    this.setData({
      keyword: t.detail
    }), this.fetchTasks(!0)
  },
  onSearchChange: function(t) {
    var a = this,
      e = t.detail;
    this.setData({
      keyword: e
    }), this._searchTimer && clearTimeout(this._searchTimer), this._searchTimer = setTimeout((function() {
      a.onSearch(t)
    }), 500)
  },
  showCalendar: function() {
    this.setData({
      showCalendar: !0
    }), "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
      showTab: !1
    })
  },
  onClearDate: function() {
    this.setData({
      startDate: "",
      endDate: "",
      formatedDate: ""
    }), this.fetchTasks(!0)
  },
  onCalendarClose: function() {
    this.setData({
      showCalendar: !1
    }), "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
      showTab: !0
    })
  },
  onCalendarConfirm: function(t) {
    var e = a(t.detail, 2),
      s = e[0],
      i = e[1];
    this.setData({
      showCalendar: !1,
      startDate: s,
      endDate: i
    }), this.setData({
      formatedDate: this.deriveFormatedDate()
    }), this.fetchTasks(!0), "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
      showTab: !0
    })
  },
  formatDate: function(t) {
    return "".concat(t.getMonth() + 1, "/").concat(t.getDate())
  },
  deriveFormatedDate: function() {
    var t = this.data.startDate,
      a = this.data.endDate;
    return t && a ? "".concat(this.formatDate(t), " - ").concat(this.formatDate(a)) : ""
  },
  showStatusPicker: function() {
    this.setData({
      showPicker: !0
    })
  },
  onPickerClose: function() {
    this.setData({
      showPicker: !1
    })
  },
  onPickerConfirm: function(t) {
    var a = t.detail.value;
    this.setData({
      showPicker: !1,
      statusLabel: "全部" === a ? "" : a
    }), this.fetchTasks(!0)
  },
  loadMore: function() {
    this.fetchTasks()
  },
  goToDetail: function(t) {
    var a = t.currentTarget.dataset,
      e = a.id,
      s = a.status,
      i = a.processDefinitionId,
      n = a.processInstanceId,
      o = a.formKey;
    wx.navigateTo({
      url: "/pages/taskDetail/taskDetail?id=".concat(e, "&status=").concat(s, "&processDefinitionId=").concat(i.split(":")[0], "&processInstanceId=").concat(n, "&formKey=").concat(o)
    })
  }
});