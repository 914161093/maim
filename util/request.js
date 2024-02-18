// let isRefreshing = true;
// let subscribers = [];

// function onAccessTokenFetched() {
// 	subscribers.forEach((callback) => {
// 		callback();
// 	})
// 	subscribers = [];
// }

// function addSubscriber(callback) {
// 	subscribers.push(callback)
// }

// export class Http {
// 	constructor() {}

// 	request({
// 		url,
// 		data = {},
// 		method,
// 		header,
// 		callback = ''
// 	} = {}) {
// 		let baseUrl = "https://api.maimangbox.cn" //后台请求接口的公共部分
// 		let _this = this;
// 		return new Promise((resolve, reject) => {
// 			uni.request({
// 				url: baseUrl + url,
// 				data,
// 				method,
// 				header: {
// 					"api-token": uni.getStorageSync('token'),
// 					"content-type": method == 'post' || method == 'POST' ?
// 						'application/x-www-form-urlencoded' : 'application/json; charset=utf-8'
// 				},
// 				callback,
// 				fail(res) {
// 					reject(res)
// 				},
// 				complete: res => {
// 					// callback token过期后重新请求接口，接口返回的数据
// 					if (callback) return callback(res.data);
// 					let statusCode = res.resultCode;
// 					let errText = res.data.msg;
// 					// console.log(statusCode, 'statusCode')
// 					if (statusCode == 404) {
// 						console.log('接口不存在')
// 					} else if (statusCode != 10000 ) {
// 						// 将需要重新执行的接口缓存到一个队列中
// 						addSubscriber(() => {
// 							_this.request({
// 								url,
// 								data,
// 								method,
// 								header,
// 								callback: resolve
// 							})
// 						})

// 						if (isRefreshing) {
// 							getNewToken(`${baseUrl}/getToken`, url, data).then(() => {
// 								// 依次去执行缓存的接口
// 								onAccessTokenFetched();
// 								isRefreshing = true;
// 							})
// 						}
// 						isRefreshing = false;
// 					} else if (statusCode == 10000) {
// 						// 登录成功，抛出数据
// 						resolve(res.data)
// 					}
// 					// else if (statusCode == 10004) {
// 					// 	reject(res.data)
// 					// }
// 					// else if(statusCode == 30001 || statusCode == 30002){
// 					// 	// 提示用户登录信息不全，需要获取用户信息
// 					// 	uni.navigateTo({
// 					// 		url:"/pages/login/login"
// 					// 	})
// 					// }
// 					// else if (statusCode.startsWith('5')) {
// 					// 	uni.showModal({
// 					// 		content: '服务器报错，请重试！',
// 					// 		showCancel: false
// 					// 	});
// 					// }
// 				}
// 			})
// 		})
// 	}
// }

// // 获取token，token请求的接口通过形参传进来
// const getNewToken = (url) => {
// 	return new Promise((resolve, reject) => {
// 		uni.request({
// 			url: 'https://api.maimangbox.cn/getToken',
// 			data: {
// 				platform: 3,
// 				channel: window.location.href.split('channel=')[1],
// 			},
// 			header: {
// 				'custom-header': 'hello' //自定义请求头信息
// 			},
// 			method: 'POST',
// 			success: (res) => {
// 				if(res.data.resultCode == 10000){
// 					uni.setStorageSync('token', res.data.data) 
// 				}else{
// 					uni.navigateTo({
// 						url: '/pages/login/login'
// 					});
// 				}
// 			},
// 			fail(err) {
// 				reject()
// 				console.error('uni login fail', err);
// 			}
// 		});
// 		// uni.login({
// 		// 	success(res) {
// 		// 		console.log(res)
// 		// 		uni.request({
// 		// 			url: url,
// 		// 			method: 'POST',
// 		// 			header: {
// 		// 				"content-type": "application/x-www-form-urlencoded"
// 		// 			},
// 		// 			data: {
// 		// 				code: res.code
// 		// 			},
// 		// 			success(res) {
// 		// 				console.log(res, 'token')
// 		// 				let r = res.data;
// 		// 				console.log(r, 'r')
// 		// 				// 将所有存储到观察者数组中的请求重新执行。
// 		// 				if (r.code == 0) {
// 		// 					const token = r.data;
// 		// 					// 使用本地缓存，把token存起来
// 		// 					uni.setStorageSync('token', token);
// 		// 					resolve(res);
// 		// 				}
// 		// 			}
// 		// 		})
// 		// 	},
// 		// 	fail(err) {
// 		// 		reject()
// 		// 		console.error('uni login fail', err);
// 		// 	}
// 		// });
// 	})
// }

// export const request = (options) => {
// 	return new Promise((resolve, reject) => {
// 		let token = uni.getStorageSync('token');
		
// 		// #ifdef  WEB
// 		const url = window.location.href;
// 		const regex = /[?&]channel(?:=([^&#]*)|&|#|$)/;
// 		const matches = regex.exec(url);
// 		const channelText = matches && matches[1] ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : null;
// 		uni.setStorageSync('channel', channelText) 
// 		// #endif
		
// 		// 在登录的时候需要储存 token uni.setStorageSync("authorization","这里是登录获取的token值")
// 		uni.$request({
// 			url: 'https://api.maimangbox.cn/getToken',
// 			method: 'POST',
// 			data:{
// 				// #ifdef APP-PLUS
// 				platform:1
// 				// #endif
// 				// #ifdef  WEB
// 				platform:3,
// 				channel: channelText,
// 				// #endif
// 			},
// 			header: {
// 				'content-type': 'application/json',
// 			},
// 			success: (res) => {
// 				console.log(res.data); // 控制台显示数据信息
// 				resolve(res.data)
// 			},
// 			fail: (err) => {
// 				// 页面中弹框显示失败
// 				uni.showToast({
// 					title: '请求接口失败'
// 				})
// 				// 返回错误消息
// 				reject(err)
// 			},
// 			catch: (e) => {
// 				console.log(e);
// 			}
// 		})
// 	})
// }
// // 将对象导出外部引入使用
// export default {
// 	request
// }

// const baseURL='https://api.maimangbox.cn'
// export const http=(options)=>{
// 	const token=uni.getStorageSync('token')
// 	//如果token不存在就跳转到个人页面，让用户登录
// 	if(!token){
// 		uni.navigateTo({
// 			url:'/pages/login/login'
// 		})
// 		return ;
// 	}else{
// 		return new Promise((resolve,reject)=>{
// 			uni.request({
// 				url:baseURL+options.url,
// 				//请求url中如果没有method，默认是get
// 				method:options.method||'GET',
// 				//请求url中如果没有data，默认为空
// 				data: options.data || {},
// 				header: {'api-token':token},
// 				success:res=>{
// 					if(!res){
// 						return uni.showToast({icon:'loading',title:'获取数据失败'})
// 					}
// 					console.log(res.data)
// 					resolve(res)
// 				},
// 				fail:err=>{
// 					return uni.showToast({
// 						icon:'loading',
// 						title:'请求失败'
// 					})
// 					reject(err)
// 				}
// 			})
// 		})
// 	}
// } 
// export default {
// 	http
// }

// // 公共请求处理函数  
// function handleRequest(url, method, data) {  
//   // 检查token是否为空  
//   const token = uni.getStorageSync('token');  
//   if (!token) {  
//     // 重新获取token的逻辑  
//     uni.request({
// 		url: "https://api.maimangbox.cn/getToken",
// 		header: {
// 			'content-type': 'application/json',
// 		},
// 		data: {
// 			// #ifdef APP-PLUS
// 			platform:1
// 			// #endif
// 			// #ifdef  WEB
// 			platform:3
// 			// #endif
// 		},
// 		method: 'POST',
// 	});
// 	if(res.data.resultCode == 10000){
// 		 uni.setStorageSync('token', res.data.data) 
// 	}else{
// 		 uni.showToast({title:res.data.resultMsg, icon:"none"});
// 	}
//   }  
  
//   const config = {  
//     url: url,  
//     method: method,  
//     data: data,  
//     header: {  
//       'api-token': token, // 将token添加到header中  
//     },  
//   };  
  
//   return uni.request(config); // 发送请求并返回promise  
// }  
// export const checkAndRefreshToken=(options)=>{
//   // 检查token是否为空  
//   const token = uni.getStorageSync('token');  
//   if (!token) {  
// 	uni.request({
// 		url: "https://api.maimangbox.cn/getToken",
// 		header: {
// 			'content-type': 'application/json',
// 		},
// 		data: {
// 			// #ifdef APP-PLUS
// 			platform:1
// 			// #endif
// 			// #ifdef  WEB
// 			platform:3
// 			// #endif
// 		},
// 		method: 'POST',
// 	}).then(res){
// 		console.log(res)
// 	}
// 	// if(res.data.resultCode == 10000){
// 	// 	 uni.setStorageSync('token', res.data.data) 
// 	// }else{
// 	// 	uni.showToast({title:res.data.resultMsg, icon:"none"});
// 	// }
//   }
// } 
// export default {
// 	checkAndRefreshToken
// }