module.exports = {
  devServer: {
    proxy: {
      '/api': {  // 代理路径前缀
        target: 'http://47.95.208.71:80', // 后端地址
        changeOrigin: true, // 修改请求头 Origin
        pathRewrite: {
          '^/api': '' // 重写路径（去掉 /api 前缀）
        }
      }
    }
  }
}