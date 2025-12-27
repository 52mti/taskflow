// 1. 还原模块引用 (Vant Toast)
import Toast from '@vant/weapp/toast/toast'

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
      wx.request({
        url: 'https://admin.sh-zktx.com/apit/user/user/login',
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
        success: (res) => {
          const resData = res.data

          // 状态码 200 表示成功
          if (resData.status === 200) {
            const user = resData.data.user

            // 持久化存储 Token 和用户信息
            wx.setStorageSync('token', resData.data.token)
            wx.setStorageSync('tokenName', resData.data.tokenName)
            wx.setStorageSync('userInfo', {
              id: user.id,
              name: user.name,
              role: user.roleCode,
              avatar:
                user.avatar ||
                'https://admin.sh-zktx.com/fuxit/assets/header-MoI1THJb.jpg',
            })

            // 跳转到首页（任务列表）
            wx.switchTab({
              url: '/pages/taskList/taskList',
            })
          } else {
            // 登录失败提示后端返回的错误信息
            wx.showToast({
              title: resData.msg,
              icon: 'error',
            })
          }
        },
        fail: (err) => {
          console.error('请求失败：', err)
          wx.showToast({
            title: '网络错误',
            icon: 'error',
          })
        },
        complete: () => {
          // 无论成功失败都关闭 Loading
          wx.hideLoading()
        },
      })
    } else {
      // 输入为空时的提示
      Toast.fail('请填写账号密码')
    }
  },
})
