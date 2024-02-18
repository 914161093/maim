<template>
	<view class="container">
		<view class="tips"><image src="../../static/jingao.png" class="icon"></image>请确认注销的账号及影响</view>
		<view class="list">
			<view class="title">即将注销的账号</view>
			<view class="box">
				<view class="user">
					<image src="../../static/car.png" class="avatar"></image>名称
				</view>
				<image src="../../static/zx_bg1.png" class="bg1"></image>
			</view>
		</view>
		<view class="list">
			<view class="title">请注意，注销后你将</view>
			<view class="box">
				<view class="tips_list">
					<view class="items">
						<image src="../../static/jingao.png" class="icon"></image>永久不可登录和使用账号
					</view>
					<view class="items">
						<image src="../../static/jingao.png" class="icon"></image>身份、账号和申请信息将被清空
					</view>
					<view class="items">
						<image src="../../static/jingao.png" class="icon"></image>不可享受app提供的相关服务
					</view>
				</view>
				<image src="../../static/zx_bg2.png" class="bg2"></image>
			</view>
		</view>
		<button  class="next_btn" @click="confim">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 inputText: '',
				 num: 0,
			}
		},
		methods: {
			confim(){
				uni.setStorageSync('token', '');
				setTimeout(function(){
					uni.switchTab({
						url: '/pages/index/index'
					});
				},3000)
			},
		}
	}
</script>

<style lang="scss">
body{background: #fff;}
.container{
	background:#fff;
	padding:33.3333rpx;
	.tips{
		font-size:36rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		margin: 86.6667rpx 0;
		.icon{
			width:50rpx;
			height:50rpx;
			margin-right:20rpx;
		}
	}
	.list{
		margin-bottom:30rpx;
		.title{
			font-zie:32rpx;
		}
		.box{
			border-radius: 15rpx;
			margin-top:20rpx;
			height: 220rpx;
			position: relative;
			background: #ececec;
			.user{
				display: flex;
				align-items: center;
				.avatar{
					width:133.3333rpx;
					height: 133.3333rpx;
					border: 20rpx;
					vertical-align: middle;
					margin:30rpx 20rpx 0;
				}
			}
			.tips_list{
				padding:40rpx 0 0 30rpx;
				font-size:26rpx;
				.items{
					margin-bottom: 25rpx;
					display: flex;
					align-items: center;
					.icon{
						width: 30rpx;
						height:30rpx;
						margin-right:20rpx;
					}
				}
			}
			.bg1{
				width: 213.3333rpx;
				height: 140rpx;
				position: absolute;
				right:0;
				top:40rpx;
			}
			.bg2{
				width: 180rpx;
				height: 180rpx;
				position: absolute;
				right:0;
				bottom:0;
			}
		}
	}
	.next_btn{
		margin-top:100rpx;
		background: #ffa800;
		color:#fff;
		height: 70rpx;
		line-height: 70rpx;
	}
}
</style>
