module.exports = {

  transpileDependencies: ['@qiun/ucharts'],
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: tag => tag.startsWith('qiun-')
        }
        return options
      })
  }
}
