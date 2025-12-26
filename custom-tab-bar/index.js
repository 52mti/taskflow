Component({
  data: {
    showTab: !0,
    selected: 0,
    color: "#7d7e80",
    selectedColor: "#1989fa",
    list: [{
      pagePath: "/pages/taskList/taskList",
      iconPath: "/images/task.png",
      selectedIconPath: "/images/task-active.png",
      text: "任务"
    }, {
      pagePath: "/pages/profile/profile",
      iconPath: "/images/user.png",
      selectedIconPath: "/images/user-active.png",
      text: "我的"
    }]
  },
  methods: {
    switchTab: function(t) {
      var e = t.detail,
        a = this.data.list[e].pagePath;
      wx.switchTab({
        url: a
      })
    }
  }
});