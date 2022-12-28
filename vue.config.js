const debug = process.env.NODE_ENV !== 'production'
const path = require('path');
const webpack = require('webpack');

module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "/src/styles/modifyvant.less";`,
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/styles/global.less')
      ]
    }
  },
  configureWebpack: config => {
    if (debug) { // 开发环境配置
      config.devtool = 'source-map'
    } else {
      // 去除console.log和debugger
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      // 限制moment.js需要用到的语言包
      config.plugins.push(
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/, // 这个参数表明了我们要改变的打包上下文
            /zh-cn|en/ // 这个参数表示我们只想打包这个正则匹配的文件
        )
      );
    }
  },
  chainWebpack: config => {
    if (!debug) {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件
        config.plugins.delete('preload');
    }
   },
  devServer: {
    port: 8080, // 端口号
    host: '0.0.0.0'
  }
}
