module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
    },
  },
}

