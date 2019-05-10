const SentryCliPlugin = require('@sentry/webpack-plugin')
console.log(process.env.NODE_ENV)
const plugins = []
if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_COMMIT_HASH) {
  plugins.push(
    new SentryCliPlugin({
      release: process.env.VUE_APP_COMMIT_HASH,
      include: '.',
      ignore: ['node_modules']
    })
  )
}

module.exports = {
  devServer: {
    https: false,
    disableHostCheck: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins
  }
  /*
  chainWebpack: config => {
    config.module
      .rule('js')
      .exclude
      .add('handlebars')
  }
  */
}
