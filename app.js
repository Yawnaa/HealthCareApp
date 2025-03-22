<<<<<<< HEAD
App({
	globalData: {
		userInfo: null,
		baseUrl: 'https://your-api-domain.com/api'
	},
	
	onLaunch() {
		// 检查网络状态
		wx.getNetworkType({
			success: (res) => {
				console.log('当前网络类型：', res.networkType)
			}
		})
		
		// 监听网络状态变化
		wx.onNetworkStatusChange((res) => {
			console.log('网络状态变化：', res.isConnected)
			if (!res.isConnected) {
				wx.showToast({
					title: '网络连接已断开',
					icon: 'none'
				})
			}
		})
	},
	
	// 封装请求方法
	request(options) {
		return new Promise((resolve, reject) => {
			wx.request({
				url: this.globalData.baseUrl + options.url,
				method: options.method || 'GET',
				data: options.data,
				header: {
					'content-type': 'application/json',
					...options.header
				},
				success: (res) => {
					if (res.statusCode === 200) {
						resolve(res.data)
					} else {
						reject(res)
					}
				},
				fail: reject
			})
		})
	}
=======
App({
	globalData: {
		userInfo: null,
		baseUrl: 'https://your-api-domain.com/api'
	},
	
	onLaunch() {
		// 检查网络状态
		wx.getNetworkType({
			success: (res) => {
				console.log('当前网络类型：', res.networkType)
			}
		})
		
		// 监听网络状态变化
		wx.onNetworkStatusChange((res) => {
			console.log('网络状态变化：', res.isConnected)
			if (!res.isConnected) {
				wx.showToast({
					title: '网络连接已断开',
					icon: 'none'
				})
			}
		})
	},
	
	// 封装请求方法
	request(options) {
		return new Promise((resolve, reject) => {
			wx.request({
				url: this.globalData.baseUrl + options.url,
				method: options.method || 'GET',
				data: options.data,
				header: {
					'content-type': 'application/json',
					...options.header
				},
				success: (res) => {
					if (res.statusCode === 200) {
						resolve(res.data)
					} else {
						reject(res)
					}
				},
				fail: reject
			})
		})
	}
>>>>>>> a673eed6f587a92e71200540c14c3c62dd06cbc5
}) 