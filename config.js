// config.js
const accountInfo = wx.getAccountInfoSync()
const env = accountInfo.miniProgram.envVersion // develop, trial, release

const baseConfig = {
  develop: {
    baseUrl: 'https://admin.sh-zktx.com/apit',
  },
  trial: {
    baseUrl: 'https://admin.sh-zktx.com/api',
  },
  release: {
    baseUrl: 'https://admin.sh-zktx.com/api',
  },
}

export default baseConfig[env]
