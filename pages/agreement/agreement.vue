<template>
	<view class="container">
		<view class="info">
			<view class="name">平台协议</view>
			<view class="desc">查看您的协议</view>
		</view>
		<view class="list">
			<view class="item" @click="goToKnowledgeDetail('3')">
				<view class="item_l">注册协议</view>
				<image src="../../static/dingw_arrow.png" class="arrow"></image>
			</view>
			<view class="item">
				<view class="item_l" @click="goToKnowledgeDetail('4')">隐私协议</view>
				<image src="../../static/dingw_arrow.png" class="arrow"></image>
			</view>
			<view class="item" @click="goToKnowledgeDetail('5')">
				<view class="item_l">咨询服务授权协议</view>
				<image src="../../static/dingw_arrow.png" class="arrow"></image>
			</view>
			<view class="item" @click="goToKnowledgeDetail('6')">
				<view class="item_l">个人信息推送服务授权协议</view>
				<image src="../../static/dingw_arrow.png" class="arrow"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goToKnowledgeDetail(key){
				uni.navigateTo({
					url: '/pages/knowledgedetail/knowledgedetail?key='+ key
				});
			},
		}
	}
</script>

<style lang="scss">
	body{background: #fff;;}
.container{
	padding: 40rpx;
	background: url(../../static/pingtxy_bg.png) no-repeat #f9f9f9 top right;
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
