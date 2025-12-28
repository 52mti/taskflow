import { PaymentOrderBusinessType } from '../../utils/const'
import {
  findChildrenByCode,
  getCustomer,
  getMaterial,
  getSupplier,
} from '../../utils/https'

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
    pickerMap: {},

    // calendar数据
    currentCalendarKey: '',
    showCalendar: false,

    // popup数据
    showPopup: false,
  },

  attached() {
    this.initDynamicColumns()
  },

  methods: {
    async initDynamicColumns() {
      const { formItems } = this.properties

      // 找出所有需要动态获取数据的配置项
      const updatedItems = await Promise.all(
        formItems.map(async (item) => {
          if (item.type === 'dynamicPicker' && item.apiType) {
            try {
              const data = await this.fetchDataByApi(item.apiType, item.apiKey)
              const pickerMap = data.reduce((result, current) => {
                return { ...result, [current.key]: current.value }
              }, {})
              this.setData({
                pickerMap: { ...this.data.pickerMap, ...pickerMap },
              })
              return { ...item, columns: data } // 将接口返回的数据注入配置
            } catch (err) {
              console.error(`加载 ${item.label} 选项失败`, err)
            }
          }
          return item
        })
      )

      this.triggerEvent('changeFormItems', updatedItems)
    },

    // 模拟接口分发器
    async fetchDataByApi(apiType, apiKey) {
      if (apiType === 'dictionary') {
        const res = await findChildrenByCode(apiKey)
        const options = res.data

        if (apiKey === 'PAYMENT_TYPE') {
          return options
            .filter((item) => {
              return {
                [PaymentOrderBusinessType.BIDDING]: [
                  '601332103946174464',
                  '600090772762525696',
                  '601332632537530368',
                  '598675867320713216',
                ],
                [PaymentOrderBusinessType.PROJECT]: ['600090772762525696'],
                [PaymentOrderBusinessType.ORDER]: ['600090880992346112'],
                [PaymentOrderBusinessType.CUSTOMER]: ['600090772762525696'],
                [PaymentOrderBusinessType.EXPENSE]: ['610560086649077760'],
              }[this.data.businessType]?.includes(item.id)
            })
            .map((option) => ({ key: option.id, value: option.value }))
        }
      }

      if (apiType === 'customer') {
        const res = await getCustomer()
        const options = res.data?.list || []
        return options.map((option) => ({ key: option.id, value: option.name }))
      }
      if (apiType === 'material') {
        const res = await getMaterial()
        const options = res.data?.list || []
        return options.map((option) => ({ key: option.id, value: option.name }))
      }
      if (apiType === 'supplier') {
        const res = await getSupplier()
        const options = res.data?.list || []
        return options.map((option) => ({ key: option.id, value: option.name }))
      }
      // 其他接口...
      return []
    },

    handleAddForm() {
      this.setData({
        show
      })
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

    // 展示选择器
    showPicker(e) {
      const { key } = e.currentTarget.dataset
      const item = this.properties.formItems.find((i) => i.key === key)

      // 检查数据是否已加载
      if (!item.columns || item.columns.length === 0) {
        wx.showToast({ title: '选项加载中...', icon: 'none' })
        this.initDynamicColumns()
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
      this.setData({
        showPicker: false,
      })
      this.triggerEvent('changeFormData', {
        ...this.properties.formData,
        [key]: keyValuePair.key,
      })
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

      wx.chooseMessageFile({
        count: config.maxCount - (this.properties.formData[key]?.length || 0),
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
        url: 'https://admin.sh-zktx.com/apit/general/file/upload', // 你的上传接口
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

          // 更新数据层
          const newList = this.properties.formData[key] || []
          newList.push({
            name: file.name,
            path: serverPath,
          })

          this.triggerEvent('changeFormData', {
            ...this.properties.formData,
            [key]: newList,
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
      const list = this.properties.formData[key]

      wx.showModal({
        title: '提示',
        content: '确定删除该文件吗？',
        success: (res) => {
          if (res.confirm) {
            list.splice(index, 1)
            this.triggerEvent('changeFormData', {
              ...this.properties.formData,
              [key]: list,
            })
          }
        },
      })
    },
  },
})
