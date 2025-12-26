/**
 * 封装微信小程序 request 请求
 */

// 提示工具函数：统一显示轻提示
const showToast = (msg) => {
  wx.showToast({
    title: msg,
    icon: "none",
    duration: 2000
  });
};

// 登录失效处理：跳转至登录页
const handleLoginExpired = () => {
  wx.showModal({
    title: "提示",
    content: "登录已过期，请重新登录",
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        wx.clearStorageSync(); // 清除本地缓存的 Token
        wx.reLaunch({
          url: "/pages/login/login"
        });
      }
    }
  });
};

/**
 * 核心请求函数
 * @param {Object} options 请求配置项
 */
const request = (options) => {
  // 1. 拼接 URL (自动处理基础路径)
  const baseUrl = "https://admin.sh-zktx.com/apit";
  const finalUrl = options.url.startsWith("http") ? options.url : baseUrl + options.url;

  // 2. 获取鉴权信息
  const token = wx.getStorageSync("token");
  const tokenName = wx.getStorageSync("tokenName") || "Authorization";

  // 3. 设置请求头 (合并自定义 header)
  let header = {
    "content-type": "application/json",
    ...options.header
  };
  if (token) {
    header[tokenName] = token;
  }

  // 4. 返回 Promise
  return new Promise((resolve, reject) => {
    // 是否显示加载动画
    if (options.loading === true) {
      wx.showLoading({
        title: "加载中...",
        mask: true
      });
    }

    wx.request({
      url: finalUrl,
      method: options.method || "GET",
      data: options.data || {},
      header: header,
      timeout: 30000, // 30秒超时

      success: (res) => {
        const { statusCode, data } = res;

        // A. HTTP 状态码成功 (200-299)
        if (statusCode >= 200 && statusCode < 300) {
          // 业务逻辑成功判断 (后端返回的 code)
          if (data.code === 0 || data.code === 200) {
            resolve(data);
          } 
          // 25000007 可能代表特定的 Token 失效业务码
          else if (data.code === 25000007) {
            handleLoginExpired();
            reject(res);
          } 
          else {
            showToast(data.msg || "业务逻辑错误");
            reject(data);
          }
        } 
        // B. 鉴权失败 (401)
        else if (statusCode === 401) {
          handleLoginExpired();
          reject(res);
        } 
        // C. 其他错误
        else {
          showToast(`服务器开小差了(${statusCode})`);
          reject(res);
        }
      },

      fail: (err) => {
        showToast("网络连接异常，请检查网络");
        reject(err);
      },

      complete: () => {
        // 隐藏加载动画
        if (options.loading === true) {
          wx.hideLoading();
        }
      }
    });
  });
};

export default request;