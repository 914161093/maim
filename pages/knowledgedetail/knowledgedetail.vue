<template>
	<view class="container">
		<view class="top">
			<view class="sources">
				<image :src="detailData.source_logo" class="img"></image>
				<view class="name">
					<view class="title">{{detailData.source_name}}</view>
					<view class="time">{{detailData.source_date}}</view>
				</view>
			</view>
			<view class="follow" @click="shareFn(detailData.source_title)">分享</view>
		</view>
		<view class="detail">
			<view class="title">{{detailData.source_title}}</view>
			<rich-text :nodes="detailData.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData:'',
				content:''
			};
		},
		onLoad(option) {
			
			// #ifdef  WEB
			const url = window.location.href;
			const regex = /[?&]channel(?:=([^&#]*)|&|#|$)/;
			const matches = regex.exec(url);
			const channelText = matches && matches[1] ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : null;
			uni.setStorageSync('channel', channelText);
			// #endif
			
			
			let key = option.key;
			let token = uni.getStorageSync('token');
			//发送请求获取 token
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
				uni.request({
					url: 'https://api.maimangbox.cn/content',
					data:{
						key:key
					},
					header: {
						'content-type': 'application/json',
						'api-token': token
					},
					method: 'POST',
					success: (res) => {console.log(res)
						if(res.data.resultCode ==10000){
							this.detailData = res.data.data;
							console.log(this.detailData)
						}else{
							uni.showToast({title:res.data.resultMsg, icon:"none"});
						}
					}
				});
			  } catch (err) {
			    console.error(err);
			  }
			}
			
			
			if(token == ''){
				getToken();
			}else{
				uni.request({
					url: 'https://api.maimangbox.cn/content',
					data:{
						key:key
					},
					header: {
						'content-type': 'application/json',
						'api-token': token
					},
					method: 'POST',
					success: (res) => {console.log(res)
						if(res.data.resultCode ==10000){
							this.detailData = res.data.data;
							console.log(this.detailData)
						}else{
							uni.showToast({title:res.data.resultMsg, icon:"none"});
						}
					}
				});
			}
		},
		methods: {
			shareFn(title){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: title,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.container{
	padding: 26.6667rpx 45.3333rpx;
	.top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.sources{
			display: flex;
			justify-content: space-between;
			.img{
				width: 76.6667rpx;
				height: 76.6667rpx;
				border-radius: 50%;
			}
			.name{
				margin-left: 16.6667rpx;
				.title{
					font-size: 26.6667rpx;
					color:#272727;
					margin-bottom: 10rpx;
				}
				.time{
					font-size: 20rpx;
					color:#b1b1b1;
				}
			}
		}
		.follow{
			padding:0 35rpx;
			height: 40rpx;
			line-height:40rpx;
			text-align: center;
			background: #ffa800;
			color:#fff;
			font-size: 26rpx;
			border-radius:30rpx;
		}
	}
	.detail{
		margin-top: 36.6667rpx;
		border-radius: 18rpx;
		background:#fff;
		padding: 40rpx;
		box-shadow: 8px 10px 12px #ddd;
		.title{
			font-size:40rpx;
			font-weight:600;
			margin-bottom: 40rpx;
		}
		.text{
			font-size:30rpx;
			img{
				max-width:100%;
			}
		}
		p{
			margin:20rpx 0;
		}
		h4{
			margin:20rpx 0;
		}
	}
}	
</style>
