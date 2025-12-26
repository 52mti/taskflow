/**
 * 通用表格组件
 * 支持功能：数据展示、图片点击预览、文档点击下载打开
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 表头列表，例如：[{ title: "名称", key: "name" }]
    tableHeadList: {
      type: Array,
      value: [],
    },
    // 表行数据列表，例如：[{ name: "项目A", file: "http://..." }]
    tableBodyList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击单元格处理函数
     * 逻辑：如果内容是 http 链接，则判定为附件，执行预览或打开操作
     */
    onClickCell: function (e) {
      const cellValue = e.currentTarget.dataset.value

      // 1. 判断是否为远程链接
      if (
        cellValue &&
        typeof cellValue === 'string' &&
        cellValue.startsWith('http')
      ) {
        const fileUrl = cellValue
        // 获取文件后缀名
        const extension = fileUrl
          .slice(fileUrl.lastIndexOf('.') + 1)
          .toLowerCase()

        // 2. 图片类文件直接调用微信预览
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']

        if (imageExtensions.includes(extension)) {
          wx.previewImage({
            current: fileUrl,
            urls: [fileUrl],
          })
        } else {
          // 3. 非图片类文件（如PDF, Doc, Excel等），下载后打开文档
          wx.showLoading({
            title: '加载中...',
          })

          wx.downloadFile({
            url: fileUrl,
            success: function (res) {
              if (res.statusCode === 200) {
                const tempFilePath = res.tempFilePath
                // 打开文档（支持显示右上角菜单以供转发或保存）
                wx.openDocument({
                  filePath: tempFilePath,
                  showMenu: true,
                  fail: function () {
                    wx.showToast({
                      title: '暂不支持打开此格式',
                      icon: 'none',
                    })
                  },
                })
              }
            },
            fail: function () {
              wx.showToast({
                title: '下载失败',
                icon: 'none',
              })
            },
            complete: function () {
              wx.hideLoading()
            },
          })
        }
      }
    },
  },
})
