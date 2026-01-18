module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    // 微信小程序全局变量
    wx: 'readonly',
    App: 'readonly',
    Page: 'readonly',
    Component: 'readonly',
    Behavior: 'readonly',
    getApp: 'readonly',
    getCurrentPages: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    // 禁止未使用的变量
    'no-unused-vars': ['error', {
      vars: 'all',           // 检查所有变量
      args: 'after-used',    // 只检查最后一个使用的参数之后的参数
      ignoreRestSiblings: true,  // 忽略解构中的剩余兄弟属性
      argsIgnorePattern: '^_',   // 忽略以 _ 开头的参数
      varsIgnorePattern: '^_'    // 忽略以 _ 开头的变量
    }]
  }
};
