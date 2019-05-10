
module.exports = {
  devServer: {
    https: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
