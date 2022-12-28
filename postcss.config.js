module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android >= 4.0',
        'iOS >= 7',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ],
      grid: true
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList: ['pxtovh'],// 过滤掉.pxtovh开头的class，不进行rem转换
    },
    'postcss-px-to-viewport': {
      viewportWidth: 812,
      propList: ["*"],
      fontViewportUnit: 'vh',
      viewportUnit: 'vh',
    },
  }
}
