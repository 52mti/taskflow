// config.js
const accountInfo = wx.getAccountInfoSync()
const env = accountInfo.miniProgram.envVersion // develop, trial, release

const baseConfig = {
  develop: {
    baseUrl: 'https://admin.sh-zktx.com/apit',
  },
  trial: {
    baseUrl: 'https://admin.sh-zktx.com/apit',
  },
  release: {
    baseUrl: 'https://admin.sh-zktx.com/apit',
  },
}

export default baseConfig[env]
