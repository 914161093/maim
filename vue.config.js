module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/getToken': {
        target: 'http://api.uat.wqsxnnnx.com',
        ws: true,
        changeOrigin: true,
      },
	  '/getToken': {
		target: 'http://api.uat.wqsxnnnx.com',
		ws: true,
		changeOrigin: true,
		pathRewrite: {
			'^/getToken': ''
		}
	  },
	  '/wpi': {
	  		target: 'https://xt.t.com/',
	  		ws: true,
	  		changeOrigin: true,
	  		pathRewrite: {
	  			'^/wpi': ''
	  		}
	  },
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}