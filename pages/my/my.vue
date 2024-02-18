<template>
	<view class="container">
		<view class="info" @click="goToPage('/pages/personalinfo/personalinfo?next=userInfo')">
			<view class="my_info">
				<image src="../../static/car.png" class="avatar"></image>
				<view class="info_r">
					<view class="name">{{name}}，来了</view>
					<image src="../../static/renz.png" class="renz" mode="heightFix"></image>
				</view>
			</view>
			<image src="../../static/info_r_arrow.png" class="arrow"></image>
		</view>
		<view class="list">
			<view class="item" @click="goToPage('/pages/application/application?next=myApply')">
				<view class="item_l">
					<image src="../../static/wdsq_icon.png" class="icons" mode="widthFix"></image>我的申请
				</view>
				<image src="../../static/info_r_arrow.png" class="arrow"></image>
			</view>
			<view class="item" @click="goToPage('/pages/feedback/feedback')">
				<view class="item_l">
					<image src="../../static/yjfk_icon.png" class="icons" mode="widthFix"></image>意见与反馈
				</view>
				<image src="../../static/info_r_arrow.png" class="arrow"></image>
			</view>
			<view class="item" @click="goToPage('/pages/setting/setting')">
				<view class="item_l">
					<image src="../../static/set_icon.png" class="icons" mode="widthFix"></image>设置
				</view>
				<image src="../../static/info_r_arrow.png" class="arrow"></image>
			</view>
		</view>
		<view class="logout" @click="logout">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				channel:''
			}
		},
		onShow() {
			console.log('my')
			let token = uni.getStorageSync('token');
			console.log(uni.getStorageSync('token'))
			uni.request({
				url: 'https://api.maimangbox.cn/userinfo',
				header: {
					'content-type': 'application/json',
					'api-token': token
				},
				method: 'POST',
				success: (res) => {
					if(res.data.resultCode ==10000){
						this.name = res.data.data.userInfo.name;
						this.channel = res.data.data.channel;
					}else{
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				}
			});
		},
		methods: {
			goToPage(url){
				uni.navigateTo({
					url: url
				});
			},
			logout(url){
				uni.setStorageSync('token',''),
				uni.reLaunch({
					url: '/pages/index/index?channel='+ this.channel
				});
			}
		}
	}
</script>

<style lang="scss">
	body{background: #fff;;}
.container{
	padding: 40rpx;
	background: url(../../static/my_bg.png) no-repeat #fff top right;
	background-size: contain;
	.info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.my_info{
			display: flex;
			.avatar{
				width:116.6667rpx;
				height: 116.6667rpx;
				border-radius: 50%;
				border:solid 2px #fff;
			}
			.info_r{
				margin-left: 20rpx;
				.name{
					font-weight: bold;
					height: 66.6667rpx;
					line-height: 66.6667rpx;
				}
				.renz{
					width: 120rpx;
					height:50.3333rpx;
				}
			}
		}
		.arrow{
			width: 16.6667rpx;
			height: 23.3333rpx;
		}
	}
	.list{
		margin-top: 80rpx;
		.item{
			margin-bottom: 53.3333rpx;
			display: flex;
			align-items:center;
			justify-content: space-between;
			.item_l{
				display: flex;
				.icons{
					width: 63.3333rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}
			}
			.arrow{
				width: 16.6667rpx;
				height: 23.3333rpx;
			}
		}
	}
	.logout{
		margin:66.6667rpx 86.6667rpx;
		color:#fff;
		font-size: 26rpx;
		text-align: center;
		border-radius: 28rpx;
		background:#245ff9;
		height: 57.3333rpx;
		line-height: 57.3333rpx;
	}
}
</style>
