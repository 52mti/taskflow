// 1. 还原模块引用 (Vant Toast)
import Toast from '@vant/weapp/toast/toast'
import request from '../../utils/request'

Page({
  data: {
    username: '',
    password: '',
  },

  // 监听用户名输入
  onUserChange: function (event) {
    this.setData({
      username: event.detail,
    })
  },

  // 监听密码输入
  onPwdChange: function (event) {
    this.setData({
      password: event.detail,
    })
  },

  // 登录处理逻辑
  handleLogin: function () {
    const { username, password } = this.data

    // 验证非空
    if (username && password) {
      // 显示加载中状态
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
      })

      // 发起登录请求
      request({
        url: '/user/user/login',
        method: 'POST',
        data: {
          username: username,
          password: password,
          userType: 1,
          device: 'Mini App',
        },
        header: {
          'content-type': 'application/json',
        },
      })
        .then((res) => {
          const user = res.data.user

          // 持久化存储 Token 和用户信息
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('tokenName', res.data.tokenName)
          wx.setStorageSync('userInfo', {
            id: user.id,
            name: user.name,
            role: user.roleCode,
            avatar:
              user.avatar ||
              'https://admin.sh-zktx.com/fuxi/assets/header-MoI1THJb.jpg',
          })

          // 跳转到首页（任务列表）
          wx.switchTab({
            url: '/pages/taskList/taskList',
          })
        })
        .catch((err) => {
          console.error('请求失败：', err)
        })
        .finally(() => {
          // 无论成功失败都关闭 Loading
          Toast.clear()
        })
    } else {
      // 输入为空时的提示
      Toast.fail('请填写账号密码')
    }
  },
})
