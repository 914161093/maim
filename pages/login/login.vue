
<template>
	<view class="container">
		<view class="img-a">
			<view class="t-b">
				<image src="../../static/login_bg.png" class="logo" mode="widthFix"></image>
				<view>
					<view class="title">智能管家服务</view>
					<view class="subtitle">麦麦</view>
				</view>
			</view>
		</view>
		<view class="login-view" style="">
			<view class="t-login">
				<form class="cl">
					<view class="t-a">
						<text class="txt">手机号</text>
						<input type="number" name="phone" placeholder="请输入您的手机号" maxlength="11" v-model="phone" />
					</view>
					<view class="t-a" v-show="isCode">
						<text class="txt">验证码</text>
						<input type="number" name="code" maxlength="18" placeholder="请输入您的密码" v-model="code" />
						<view v-if="showText" class="t-c" @tap="getCode()">发送验证码</view>
						<view v-else class="t-c" style="background-color: #A7A7A7;">重新发送({{ second }})</view>
					</view>
					<view class="t-a">
						<agree @isAgree="agreeChange" :showTip="showTip"></agree>
					</view>
					<button @tap="login()" class="login_btn">登 录</button>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			phone: '', //手机号码
			pwd: '' ,//密码
			second: 60, //默认60秒
			interval:null,
			showText: true, //判断短信是否发送
			code:'',
			isCode:false,
			isAgree:false,
			showTip:false
		};
	},
	onShow() {
		// #ifdef  WEB
		const url = window.location.href;
		const regex = /[?&]channel(?:=([^&#]*)|&|#|$)/;
		const matches = regex.exec(url);
		const channelText = matches && matches[1] ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : null;
		uni.setStorageSync('channel', channelText);
		// #endif
		
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
			  console.log(1234)
			  console.log(num)
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
		    if(res.data.resultCode == 10000){console.log("10000")
				 uni.setStorageSync('token', res.data.data);
				 uni.request({
				 	url: 'https://api.maimangbox.cn/login/page',
				 	data: {
				 	},
				 	header: {
						'content-type': 'application/json',
				 		'api-token': res.data.data
				 	},
				 	method: 'POST',
				 	success: (res) => {console.log(res)
				 		let isCodeNum = res.data.data.isCode;
				 		if(isCodeNum == 2){
				 			this.isCode = true;
				 		}
				 	}
				 });
			}else{console.log(res)
				 uni.setStorageSync('token', '');
				 uni.hideTabBar();
				 uni.showToast({title:res.data.resultMsg, icon:"none"});
			}
		  } catch (err) {
		    console.error(err);
		  }
		}
			
		if(uni.getStorageSync('token')==''){
			getToken()
		}else{
			uni.request({
				url: 'https://api.maimangbox.cn/login/page',
				data: {
				},
				header: {
					'content-type': 'application/json',
					'api-token': uni.getStorageSync('token')
				},
				method: 'POST',
				success: (res) => {console.log(res)
					let isCodeNum = res.data.data.isCode;
					if(isCodeNum == 2){
						this.isCode = true;
					}
				}
			});
		}
	},
	methods: {
		agreeChange(e){
			this.isAgree = e;
		},
		startCountdown() {
			let that = this;
		  that.interval = setInterval(() => {
			// second减1
			this.second--;
			// 如果倒计时为0，清除定时器
			if(that.second === 0) {
			  clearInterval(that.interval);
			  this.showText = true;
			  this.second = 60;
			}
		  }, 1000);
		},
		//当前登录按钮操作
		login() {
			
			// #ifdef  WEB
			const url = window.location.href;
			const regex = /[?&]next(?:=([^&#]*)|&|#|$)/;
			const matches = regex.exec(url);
			const paramValue = matches && matches[1] ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : null;
			const next = paramValue;
			// #endif
			var that = this;
			if (!that.phone) {
				uni.showToast({ title: '请输入您的手机号', icon: 'none' });
				return;
			}
			if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.phone)) {
				uni.showToast({ title: '请输入正确手机号', icon: 'none' });
				return;
			}
			if(this.isCode && this.code==''){
				uni.showToast({ title: '请输入验证码', icon: 'none' });
				return;
			}
			
			if(this.isAgree != true){
			    uni.showToast({title:"请勾选用户协议和隐私协议", icon:"none"});
				return;
			}
			uni.request({
				url: 'https://api.maimangbox.cn/login',
				data: {
					phone:this.phone,
					code:this.code,
					next:'login'
				},
				header: {
					'content-type': 'application/json',
					'api-token': uni.getStorageSync('token')
				},
				method: 'POST',
				success: (res) => {
					if(res.data.resultCode == 10000){
						uni.showToast({ title: '登录成功！', icon: 'none' });
						console.log(res.data.data)
						//uni.removeStorageSync('token');
						uni.setStorageSync('token', res.data.data);
						console.log(uni.getStorageSync('token'))
							uni.navigateBack();
					}else{
						uni.showToast({ title: res.data.resultMsg, icon: 'none' });
					}
				}
			});
		},
		
		getCode(){
			if (!this.phone) {
				uni.showToast({ title: '请输入您的手机号', icon: 'none' });
				return;
			}
			if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)) {
				uni.showToast({ title: '请输入正确手机号', icon: 'none' });
				return;
			}
			let token = uni.getStorageSync('token');
			uni.request({
				url: 'https://api.maimangbox.cn/sendMsg',
				data: {
					phone:this.phone
				},
				header: {
					'content-type': 'application/json',
					'api-token': uni.getStorageSync('token')
				},
				method: 'POST',
				success: (res) => {
					uni.showToast({ title: res.data.resultMsg, icon: 'none' });
					if(res.data.resultCode == 10000){
						this.showText = false;
						this.startCountdown();
					}
				}
			});
		}
	}
};
</script>
<style>
.agree_box{
	display: none;
}
.container{
		background-color: #f9f9f9;
	}
.txt {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
}
.img-a {
	width: 100%;
	height: 450rpx;
	background-size: 100%;
}
.reg {
	font-size: 28rpx;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
	background: #f5f6fa;
	color: #000000;
	text-align: center;
	margin-top: 30rpx;
}

.login-view {
	position: relative;
}

.t-login {
	padding:0 45.3333rpx;
	margin: 0 auto;
	font-size: 28rpx;
	padding-top: 140rpx;
}

.t-login .login_btn {
	font-size: 28rpx;
	background: #ffa800;
	color: #fff;
	height: 104rpx;
	line-height: 104rpx;
	border-radius: 50rpx;
	font-weight: bold;
}

.t-login input {
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	border-bottom: 1px solid #e9e9e9;
	font-size: 28rpx;
}
.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #ffa800;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}
.t-login .t-a {
	position: relative;
}

.t-b {
	text-align: center;
}
.logo{
	width: 100%;
}
.title{
	font-size: 35rpx;
	font-weight: bold;
	color:#3d3d3d;
	margin-bottom: 21.3333rpx;
}
.subtitle{
	font-size: 30rpx;
	font-weight: bold;
	color:#aaa;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 150rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #aeaeae;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
