import config from "../../config"

Component({
  properties: {
    // 存储当前任务的表单配置
    formItems: {
      type: Array,
      value: [],
    },

    // 存储表单实际的值
    formData: {
      type: Object,
      value: {},
    },

    pickerMap: {
      type: Object,
      value: {}
    },

    // 商业类型
    businessType: {
      type: String,
      value: '',
    },

    taskType: {
      type: String,
      value: '',
    },
  },

  data: {
    // picker数据
    showPicker: false,
    currentColumns: [],
    currentPickerKey: '', // 记录当前点击的是哪个字段

    // calendar数据
    currentCalendarKey: '',
    showCalendar: false,

    activeTab: 0,

    // popup数据
    showPopup: false,
  },

  methods: {
    handleAddForm() {
      this.setData({
        showPopup: true,
      })
    },

    onPopupClose() {
      this.setData({ showPopup: false })
    },

    // 处理输入框变化
    onInputChange(e) {
      const { key } = e.currentTarget.dataset
      const value = e.detail.value
      this.triggerEvent('changeFormData', {
        ...this.properties.formData,
        [key]: value,
      })
    },

    handleChildEvent(e) {
      this.triggerEvent('changeFormItems', e.detail)
    },

    // 展示选择器
    showPicker(e) {
      const { key } = e.currentTarget.dataset
      const item = this.properties.formItems.find((i) => i.key === key)

      // 检查数据是否已加载
      if (!item.columns || item.columns.length === 0) {
        wx.showToast({ title: '选项加载中...', icon: 'none' })
        return
      }

      this.setData({
        showPicker: true,
        currentColumns: item.columns,
        currentPickerKey: key,
      })
    },

    onPickerClose() {
      this.setData({ showPicker: false })
    },

    // 确认选择
    onPickerConfirm(e) {
      const keyValuePair = e.detail.value
      const key = this.data.currentPickerKey
      const item = this.properties.formItems.find((i) => i.key === key)

      this.setData({
        showPicker: false,
      })

      const newFormData = {
        ...this.properties.formData,
        [key]: keyValuePair.key,
      }

      // 调用配置中的 onPickerConfirm 回调
      if (item && typeof item.onPickerConfirm === 'function') {
        item.onPickerConfirm(keyValuePair, newFormData)
      }

      this.triggerEvent('changeFormData', newFormData)
    },

    formatDate(date) {
      date = new Date(date)
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`
    },

    // 打开日历选择器
    onCalendarDisplay(e) {
      const { key } = e.currentTarget.dataset
      this.setData({
        showCalendar: true,
        currentCalendarKey: key,
      })
    },

    onCalendarClose() {
      this.setData({
        showCalendar: false,
      })
    },

    // 日历选择确认
    onCalendarConfirm(e) {
      const value = e.detail
      const key = this.data.currentCalendarKey

      const formatDate = (validDate) => {
        const date = new Date(validDate)
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(date.getDate()).padStart(2, '0')}`
      }
      this.setData({
        showCalendar: false,
      })
      this.triggerEvent('changeFormData', {
        ...this.properties.formData,
        [key]: formatDate(value),
      })
    },

    // 1. 选择并上传文件
    chooseAndUpload(e) {
      const { key, config } = e.currentTarget.dataset
      const maxCount = config.maxCount || 9 // 默认最多9个文件
      const currentFileList = this.properties.formData[key]
      // 计算当前已有文件数量（支持字符串和数组两种格式）
      let currentCount = 0
      if (typeof currentFileList === 'string' && currentFileList) {
        currentCount = currentFileList.split(',').filter(Boolean).length
      } else if (Array.isArray(currentFileList)) {
        currentCount = currentFileList.length
      }
      const remainCount = maxCount - currentCount

      if (remainCount <= 0) {
        wx.showToast({ title: '已达到最大文件数量', icon: 'none' })
        return
      }

      wx.chooseMessageFile({
        count: remainCount,
        type: config.fileType || 'all',
        success: (res) => {
          const tempFiles = res.tempFiles
          this.uploadOneByOne(tempFiles, key)
        },
      })
    },

    // 递归上传（处理多文件）
    uploadOneByOne(files, key) {
      if (files.length === 0) return
      const file = files.shift()
      const token = wx.getStorageSync('token')
      const tokenName = wx.getStorageSync('tokenName')
      wx.showLoading({ title: '上传中...' })

      wx.uploadFile({
        url: `${config.baseUrl}/general/file/upload`, // 你的上传接口
        filePath: file.path,
        name: 'file',
        header: { [tokenName]: token },
        success: (res) => {
          const data = JSON.parse(res.data)
          if (data.code !== 200) {
            wx.showToast({
              title: data.msg,
              icon: 'error',
            })
            return
          }
          const serverPath = data.data // 服务器返回的远程路径

          // 更新数据层 - 使用逗号分隔的字符串格式
          const currentValue = this.properties.formData[key] || ''
          const newValue = currentValue ? `${currentValue},${serverPath}` : serverPath

          this.triggerEvent('changeFormData', {
            ...this.properties.formData,
            [key]: newValue,
          })
        },
        complete: () => {
          wx.hideLoading()
          this.uploadOneByOne(files, key) // 继续下一个
        },
      })
    },

    // 2. 预览文件（集成 TXT 乱码修复逻辑）
    previewFile(e) {
      const { path } = e.currentTarget.dataset
      const ext = path.slice(path.lastIndexOf('.') + 1).toLowerCase()
      const isTxt = path.toLowerCase().endsWith('.txt')

      const imgExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']

      if (imgExts.includes(ext)) {
        wx.previewImage({ current: path, urls: [path] })
        return
      }

      wx.downloadFile({
        url: path,
        success: (res) => {
          const filePath = res.tempFilePath

          if (isTxt) {
            // 如果是 TXT，先进行本地转码（GBK -> UTF8）
            const fs = wx.getFileSystemManager()
            fs.readFile({
              filePath: filePath,
              encoding: 'gbk', // 解决 Safari 乱码的核心
              success: (data) => {
                const newPath = `${
                  wx.env.USER_DATA_PATH
                }/preview_${Date.now()}.txt`
                fs.writeFile({
                  filePath: newPath,
                  data: data.data,
                  encoding: 'utf8',
                  success: () => {
                    wx.openDocument({ filePath: newPath, fileType: 'txt' })
                  },
                })
              },
              fail: () => {
                // 读取失败则尝试直接打开
                wx.openDocument({ filePath, fileType: 'txt' })
              },
            })
          } else {
            // 非 TXT 文件直接打开
            wx.openDocument({
              filePath,
              fileType: ext,
              fail: (err) => {
                wx.showToast({
                  title: '无法打开此格式文档',
                  icon: 'error',
                })
              },
            })
          }
        },
      })
    },

    // 3. 删除文件
    deleteFile(e) {
      const { key, index } = e.currentTarget.dataset
      const currentValue = this.properties.formData[key]

      wx.showModal({
        title: '提示',
        content: '确定删除该文件吗？',
        success: (res) => {
          if (res.confirm) {
            // 将字符串转为数组，删除指定项后再转回字符串
            const list = currentValue ? currentValue.split(',').filter(Boolean) : []
            list.splice(index, 1)
            const newValue = list.join(',')

            this.triggerEvent('changeFormData', {
              ...this.properties.formData,
              [key]: newValue,
            })
          }
        },
      })
    },
  },
})
