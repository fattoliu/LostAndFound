const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  baseUrl: './',
  outputDir: '/Users/fattoliu/workspace/CordovaProjects/lostAndFound/www',
  configureWebpack: config => {
    require('vux-loader').merge(config, {
      options: {},
      plugins: [
        'vux-ui',
        'duplicate-style',
        {
          name: 'less-theme',
          path: 'src/index.less'
        }
      ]
    })
    // if (process.env.NODE_ENV === 'production') {
    //   config.plugins.push(
    //     new CompressionPlugin({
    //       algorithm: 'gzip',
    //       test: new RegExp('\\.(css|js|html)$'),
    //       threshold: 0,
    //       minRatio: 0.8
    //     })
    //   )
    // }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://10.80.12.43:8080/swzl/',
        target: 'http://119.23.233.219:8080/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/' // 重写接口
        }
      }
    }
  }
}
