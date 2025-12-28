// pages/task-edit/index.js
import { configs, apiPathMap } from './formConfigs'
import { findChildrenByCode, getCustomer, getMaterial, getSupplier } from '../../utils/https'
import { PaymentOrderBusinessType } from '../../utils/const'
import request from '../../utils/request'

Page({
  data: {
    formItems: [], // 存储当前任务的表单配置
    formData: {}, // 存储表单实际的值
    businessType: '',
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
        if (item.type === 'dynamicPicker' && item.apiType) {
          try {
            const data = await this.fetchDataByApi(item.apiType, item.apiKey)
            const pickerMap = data.reduce((result, current) => {
              return { ...result, [current.key]: current.value }
            }, {})
            this.setData({
              pickerMap: { ...this.data.pickerMap, ...pickerMap },
            })
            item.columns = data // 将接口返回的数据注入配置
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
  async fetchDataByApi(apiType, apiKey) {
    if (apiType === 'dictionary') {
      const res = await findChildrenByCode(apiKey)
      const options = res.data

      if (apiKey === 'PAYMENT_TYPE') {
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
        }).map(option => ({ key: option.id, value: option.value }))
      }
    }

    if (apiType === 'customer') {
      const res = await getCustomer()
      const options = res.data?.list || []
      return options.map(option => ({ key: option.id, value: option.name }))
    }
    if (apiType === 'material') {
      const res = await getMaterial()
      const options = res.data?.list || []
      return options.map(option => ({ key: option.id, value: option.name }))
    }
    if (apiType === 'supplier') {
      const res = await getSupplier()
      const options = res.data?.list || []
      return options.map(option => ({ key: option.id, value: option.name }))
    }
    // 其他接口...
    return []
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

  onCancel() {
    wx.navigateBack()
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

      const payload = {}
      keys.forEach(key => {
        const currentConfig = config.find(i => i.key === key)
        if (currentConfig.type === 'number') {
          payload[key] = Number.parseFloat(this.data.formData[key])
        } else {
          payload[key] = this.data.formData[key]
        }
      })

      const response = await request({
        url: apiPathMap[this.__taskType],
        method: 'POST',
        data: {
          ...payload,
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
      console.error(err)
      wx.hideLoading()
      this.showError('提交失败，请稍后重试')
    }
  },
})
