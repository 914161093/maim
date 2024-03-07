
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	
	
	
	// #ifdef  WEB
	const url = window.location.href;
	const regex = /[?&]channel(?:=([^&#]*)|&|#|$)/;
	const matches = regex.exec(url);
	const channelText = matches && matches[1] ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : null;
	uni.setStorageSync('channel', channelText);
	// #endif
	
	 let token = uni.getStorageSync('token');
	// //发送请求获取 token
	async function getToken() {
		// // #ifdef  APP-PLUS
		let num = '';
		if(uni.getSystemInfoSync().platform == "ios"){
			console.log('我是ios')
			num=2
		}else if(uni.getSystemInfoSync().platform == "android"){
			console.log('我是安卓')
			num=1
		}
		// // #endif
	  try {
	    var res = await uni.request({
			url: "https://api.maimangbox.cn/getToken",
			header: {
				'content-type': 'application/json',
			},
			data: {
				// #ifdef  APP-PLUS
				platform:num
				// #endif
				// #ifdef  H5
				platform: 3,
				channel: channelText,
				// #endif
			},
			method: 'POST',
	    });
	    // 此处的 res 参数，与使用默认方式调用时 success 回调中的 res 参数一致
	    if(res.data.resultCode == 10000){
			 uni.setStorageSync('token', res.data.data);
		}else{console.log(res)
			 uni.setStorageSync('token', '');
			 uni.hideTabBar();
			 uni.showToast({title:res.data.resultMsg, icon:"none"});
		}
	  } catch (err) {
	    console.error(err);
	  }
	}	
	
	if(token == ''){
		getToken();
	}
	
	// // #ifdef  WEB
	// const url = window.location.href;
	// const regex = /[?&]channel(?:=([^&#]*)|&|#|$)/;
	// const matches = regex.exec(url);
	// const channelText = matches && matches[1] ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : null;
	// uni.setStorageSync('channel', channelText) 
	// // #endif
	
	
	// let platform = {};
	// if(uni.getSystemInfoSync().platform == "ios"){
	// 	console.log('我是ios')
	// 	platform = {platform:1}
	// }else if(uni.getSystemInfoSync().platform == "android"){
	// 	console.log('我是安卓')
	// 	platform = {platform:2}
	// }
	// uni.getSystemInfoSync().platform
	// 发送请求获取 token
	// async function getToken() {
	//   try {
	//     var res = await uni.request({
	// 		url: "https://api.maimangbox.cn/getToken",
	// 		header: {
	// 			'content-type': 'application/json',
	// 		},
	// 		data: {
	// 			// #ifdef APP-PLUS
	// 			platform
	// 			// #endif
	// 			// #ifdef  WEB
	// 			channel: channelText,
	// 			// #endif
	// 		},
	// 		method: 'POST',
	//     });
	//     // 此处的 res 参数，与使用默认方式调用时 success 回调中的 res 参数一致
	//     if(res.data.resultCode == 10000){
	// 		console.log(res.data.data)
	// 		 uni.setStorageSync('token', res.data.data) 
	// 	}else{
	// 		 uni.setStorageSync('token', '');
	// 		 uni.hideTabBar();
	// 		 uni.showToast({title:res.data.resultMsg, icon:"none"});
	// 	}
	//   } catch (err) {
	//     // 此处的 err 参数，与使用默认方式调用时 fail 回调中的 err 参数一致
	//     console.error(err);
	//   }
	// }
	// if(uni.getStorageSync('token')==''){
	// 	getToken();
	// }
	
	// console.log(11112222)
	// const url = window.location.href;
	// const regex = /[?&]channel(?:=([^&#]*)|&|#|$)/;
	// const matches = regex.exec(url);
	// const paramValue = matches && matches[1] ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : null;
	// console.log(paramValue)
	// uni.request({
	// 	url: 'https://api.maimangbox.cn/getToken',
	// 	data: {
	// 		platform: 3,
	// 		channel: window.location.href.split('channel=')[1],
	// 	},
	// 	header: {
	// 		'custom-header': 'hello' //自定义请求头信息
	// 	},
	// 	method: 'POST',
	// 	success: (res) => {
	// 		if(res.data.resultCode == 10000){
	// 			uni.setStorageSync('token', res.data.data) 
	// 		}else{
	// 			uni.setStorageSync('token', '');
	// 			uni.showToast({title:res.data.resultMsg, icon:"none"});
	// 			// setTimeout(function(){
	// 			// 	uni.navigateTo({
	// 			// 		url: '/pages/login/login'
	// 			// 	});
	// 			// },3000)
	// 		}
	// 	}
	// });
	// 使用 Promise then/catch 方式调用
	// uni
	//   .request({
	//     url: 'https://api.maimangbox.cn/getToken',
	// 	data: {
	// 		platform: 3,
	// 		channel: window.location.href.split('channel=')[1],
	// 	},
	// 	method: 'POST',
	//   })
	//   .then((res) => {getApp().globalData.t = 'test'
	// 			uni.setStorageSync('token', res.data.data) 
	//     // 此处的 res 参数，与使用默认方式调用时 success 回调中的 res 参数一致
	//     if(res.data.resultCode==10000){
	// 		uni.setStorageSync('token', res.data.data) 
	// 	}else{
	// 			uni.showToast({title:res.data.resultMsg, icon:"none"});
	// 	}
	//   })
	//   .catch((err) => {
	//     // 此处的 err 参数，与使用默认方式调用时 fail 回调中的 err 参数一致
	//     console.error(err);
	//   });
  return {
	app
  }
}
// #endif