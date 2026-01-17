/**
 * 通用表格组件
 * 支持功能：数据展示、图片点击预览、文档点击下载打开
 */

Component({
  options: {
    multipleSlots: true // 启用多 slot 支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否开启选择模式
    selectable: {
      type: Boolean,
      value: false
    },
    // 数据行的唯一标识字段名，默认是 'id'
    rowKey: {
      type: String,
      value: 'id'
    },
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
  data: {
    selectedList: [], // 存储被选中的 ID 数组
    isAllSelected: false // 全选状态
  },

  // 监听数据变化，当列表数据变动时，需要重新计算全选状态
  observers: {
    'tableBodyList': function(list) {
      this.reCheckSelectAllStatus();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 空函数，用于阻止冒泡
    noop() {},

    // 单行选中切换
    onSelectRow(e) {
      const id = e.currentTarget.dataset.id;
      let list = this.data.selectedList;
      const index = list.indexOf(id);

      if (index > -1) {
        // 已存在，移除
        list.splice(index, 1);
      } else {
        // 不存在，添加
        list.push(id);
      }

      this.setData({
        selectedList: list
      });
      
      this.reCheckSelectAllStatus();
      this.triggerSelection();
    },

    // 全选/取消全选
    onSelectAll(e) {
      const isSelected = e.detail; // true or false
      let newList = [];

      if (isSelected) {
        // 全选：把所有行的 ID 拿出来
        const key = this.data.rowKey;
        newList = this.data.tableBodyList.map(item => item[key]);
      } else {
        // 取消全选
        newList = [];
      }

      this.setData({
        selectedList: newList,
        isAllSelected: isSelected
      });

      this.triggerSelection();
    },

    // 重新计算“全选”按钮的状态
    reCheckSelectAllStatus() {
      const total = this.data.tableBodyList.length;
      const selected = this.data.selectedList.length;
      
      // 如果列表为空，全选状态也为 false
      if (total === 0) {
        this.setData({ isAllSelected: false });
        return;
      }

      this.setData({
        isAllSelected: total === selected
      });
    },
    // 向父组件抛出事件
    triggerSelection() {
      this.triggerEvent('selectionChange', {
        selectedIds: this.data.selectedList,
        // 如果需要返回完整的行对象，可以在这里计算
        selectedRows: this.data.tableBodyList.filter(item => 
          this.data.selectedList.indexOf(item[this.data.rowKey]) > -1
        )
      });
    },
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
