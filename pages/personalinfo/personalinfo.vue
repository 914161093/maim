<template>
	<view class="container">
		<view class="info">
			<view class="name">个人信息</view>
			<view class="desc">您的个人信息</view>
		</view>
		<view class="list">
			<view class="item">
				<view class="item_l">实名认证</view>
				<view class="item_r">{{userInfo.name}}</view>
			</view>
			<view class="item">
				<view class="item_l">身份证号</view>
				<view class="item_r">{{userInfo.id_card}}</view>
			</view>
			<view class="item">
				<view class="item_l">登录手机号</view>
				<view class="item_r">{{userInfo.phone}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:'',
				channel:''				
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			uni.request({
				url: 'https://api.maimangbox.cn/userinfo',
				header: {
					'content-type': 'application/json',
					'api-token': token
				},
				method: 'POST',
				success: (res) => {
					if(res.data.resultCode ==10000){
						this.userInfo = res.data.data.userInfo;
						this.channel = res.data.data.channel;
					}else{
						uni.navigateTo({
							url: '/pages/my/my/'+this.channel
						});
					}
				}
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	body{background: #fff;;}
.container{
	padding: 40rpx;
	background: url(../../static/grxx_bg.png) no-repeat #f9f9f9 top right;
	background-size: contain;
	.info{
		padding-top: 120rpx;
		padding-bottom: 150rpx;
		.name{
			font-weight: bold;
			display: block;
			font-size: 50rpx;
			margin-bottom: 16rpx;
		}
		.desc{
			color:#ccc;
			font-size:30rpx;
		}
	}
	.list{
		margin-bottom: 33.3333rpx;
		background: #fff;
		border-radius: 20rpx;
		padding:13.3333rpx 36.6667rpx;
		box-shadow:0 8px 26px rgba(0, 0, 0, 0.1);
		.item{
			border-bottom: 1px solid #ededed;
			padding: 36.6667rpx 0;
			display: flex;
			align-items:center;
			justify-content: space-between;
			.item_l{
				color:#000;
				font-size: 30rpx;
			}
			.arrow{
				width: 20rpx;
				height: 32rpx;
			}
		}
		:last-child{
			border-bottom: none;
		}
	}
}
</style>
