// pages/task-edit/index.js
import { configs, apiPathMap } from './formConfigs'
import { findChildrenByCode } from '../../utils/https'
import { PaymentOrderBusinessType } from '../../utils/const'
import request from '../../utils/request'

Page({
  data: {
    formItems: [], // 存储当前任务的表单配置
    formData: {}, // 存储表单实际的值
    showPicker: false,
    currentColumns: [],
    businessType: '',
    currentPickerKey: '', // 记录当前点击的是哪个字段
    pickerMap: {},
  },

  async onLoad(options) {
    const taskType = options.type // 从跳转参数获取任务类型
    this.__taskType = taskType
    const config = JSON.parse(JSON.stringify(configs[taskType] || [])) // 深拷贝防止污染原始配置
    const keys = config.map((item) => item.key)

    // 2. 解析路由传来的初始数据
    const formData = JSON.parse(decodeURIComponent(options.initialData))
    this.__formData = formData
    const initialFormData = {}
    if (options.initialData) {
      try {
        keys.forEach((key) => {
          initialFormData[key] = formData[key]
        })
      } catch (e) {
        console.error('初始数据解析失败', e)
      }
    }

    this.setData({
      businessType: formData.businessType,
      formItems: config,
      // 如果是编辑已有任务，这里可以从后端加载初始化数据
      formData: initialFormData,
    })

    // 异步加载所有需要接口数据的 Picker 选项
    await this.initDynamicColumns()
  },

  async initDynamicColumns() {
    const { formItems } = this.data

    // 找出所有需要动态获取数据的配置项
    const updatedItems = await Promise.all(
      formItems.map(async (item) => {
        if (item.type === 'picker' && item.apiKey) {
          try {
            const data = await this.fetchDataByApi(item.apiKey)
            const pickerMap = data.reduce((result, current) => {
              return { ...result, [current.id]: current.value }
            }, {})
            this.setData({
              pickerMap: { ...this.data.pickerMap, ...pickerMap },
            })
            item.columns = data.map((item) => ({
              key: item.id,
              value: item.value,
            })) // 将接口返回的数据注入配置
          } catch (err) {
            console.error(`加载 ${item.label} 选项失败`, err)
          }
        }
        return item
      })
    )

    this.setData({ formItems: updatedItems })
  },

  // 模拟接口分发器
  async fetchDataByApi(apiKey) {
    if (apiKey === 'PAYMENT_TYPE') {
      const res = await findChildrenByCode(apiKey)
      const options = res.data

      return options.filter((item) => {
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
    }
    // 其他接口...
    return []
  },

  // 处理输入框变化
  onInputChange(e) {
    const { key } = e.currentTarget.dataset
    this.setData({ [`formData.${key}`]: e.detail.value })
  },

  // 展示选择器
  showPicker(e) {
    const { key } = e.currentTarget.dataset
    const item = this.data.formItems.find((i) => i.key === key)

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
    this.setData({
      [`formData.${key}`]: keyValuePair.key,
      showPicker: false,
    })
  },

  // 1. 选择并上传文件
  chooseAndUpload(e) {
    const { key, config } = e.currentTarget.dataset

    wx.chooseMessageFile({
      count: config.maxCount - (this.data.formData[key]?.length || 0),
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
        const newList = this.data.formData[key] || []
        newList.push({
          name: file.name,
          path: serverPath,
        })

        this.setData({ [`formData.${key}`]: newList })
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
    const ext = path.slice(path.lastIndexOf(".") + 1).toLowerCase()
    const isTxt = path.toLowerCase().endsWith('.txt')

    const imgExts = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

    if (imgExts.includes(ext)) {
      wx.previewImage({ current: path, urls: [path] });
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
    const list = this.data.formData[key]

    wx.showModal({
      title: '提示',
      content: '确定删除该文件吗？',
      success: (res) => {
        if (res.confirm) {
          list.splice(index, 1)
          this.setData({ [`formData.${key}`]: list })
        }
      },
    })
  },

  // 核心校验函数
  validateForm() {
    const { formItems, formData } = this.data

    for (let item of formItems) {
      // 只有配置了 required: true 的才校验
      if (item.required) {
        const value = formData[item.key]

        // 1. 针对数组（如文件列表）的校验
        if (Array.isArray(value)) {
          if (value.length === 0) {
            this.showError(`请上传${item.label}`)
            return false
          }
        }
        // 2. 针对字符串或基本类型的校验
        else if (
          value === undefined ||
          value === null ||
          String(value).trim() === ''
        ) {
          const action = item.type === 'picker' ? '选择' : '输入'
          this.showError(`请${action}${item.label}`)
          return false
        }
      }
    }
    return true // 所有校验通过
  },

  // 统一错误提示
  showError(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
    })
  },

  // 提交按钮触发
  async submitForm() {
    // 执行校验
    if (!this.validateForm()) {
      return // 校验失败，中断提交
    }

    // 校验通过，执行提交逻辑
    wx.showLoading({ title: '提交中...', mask: true })

    try {
      const config = JSON.parse(JSON.stringify(configs[this.__taskType] || []))
      const keys = config.map((item) => item.key)

      const response = await request({
        url: apiPathMap[this.__taskType],
        method: 'POST',
        data: {
          ...this.data.formData,
          editFieldList: keys,
          auditStatus: null,
          formKey: this.__formData.formKey,
          id: this.__formData.id,
        }
      })
      wx.hideLoading()
      wx.showToast({
        title: response.msg,
        icon: 'success',
        success: () => {
          // 提交成功后延迟返回上一页
          const pages = getCurrentPages();
          if (pages.length > 1) {
            // 通知上2页需要刷新
            pages[pages.length - 3].setData({ refreshWhenShow: true });
          }
          setTimeout(() => wx.navigateBack({ delta: 2 }), 1500)
        },
      })
    } catch (err) {
      wx.hideLoading()
      this.showError('提交失败，请稍后重试')
    }
  },
})
