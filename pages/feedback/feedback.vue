<template>
	<view class="container">
		<view class="submitBefor" v-if="!success">
			<view class="info">
				<view class="name">意见反馈</view>
				<view class="desc">获得您的意见反馈并改进</view>
			</view>
			<view class="box">
				<view class="title">问题与建议</view>
				<textarea class="text" maxlength="200" @input="writeComments" v-model="inputText"></textarea>
				<view class="num">{{num}}/200</view>
			</view>
			<!-- <image src="../../static/add_coments.png" class="add"></image> -->
			<button class="btn" @click="handleClick()">提交</button>
		</view>
		<view class="success_box" v-else>
			<image src="../../static/feedback_success.png" class="success_icon"></image>
			<view class="success_text">我们会认真评估您的建议，如您有问题，可联系官方客服处理，客服电话：<text class="phone">400 0000 8888</text></view>
			<button class="btn" @click="back()">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 inputText: '',
				 num: 0,
				 success:false
			}
		},
		methods: {
			writeComments(){
				this.num = this.inputText.length;
				if(this.num >= 200){
					return;
				}
			},
			handleClick(){
				let token = uni.getStorageSync('token');
				uni.request({
					url: 'https://api.maimangbox.cn/problem',
					data: {
						desc:this.inputText
					},
					header: {
						'content-type': 'application/json',
						'api-token': token
					},
					method: 'POST',
					success: (res) => {
						if(res.data.resultCode == 10000){
							uni.showToast({ title: res.data.resultMsg, icon: 'none' });
							this.success = true;
						}
					}
				});
			},
			back(){
				uni.switchTab({
					url: '/pages/my/my'
				});
			}
		}
	}
</script>

<style lang="scss">
body{background: #f9f9f9;}
.container{
	.submitBefor{
		background: url(../../static/feedback_bg.png) no-repeat #f9f9f9 top right;
		background-size: contain;
		padding: 40rpx;
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
		.box{
			margin-bottom: 33.3333rpx;
			background: #f9f9f9;
			border-radius: 20rpx;
			padding:13.3333rpx 36.6667rpx;
			box-shadow:0 8px 26px rgba(0, 0, 0, 0.1);
			.title{
				height:66.6667rpx;
				line-height:66.6667rpx;
				border-bottom: 0.6667rpx solid #d9d9d9;
			}
			.text{
				width:100%;
				height:300rpx;
				padding: 13.3333rpx 0;
				border:solid 0.6667rpx #f9f9f9;
				background: #f9f9f9;
				color:#d9d9d9;
				font-size: 26rpx;
			}
			.num{
				text-align: right;
				color:#d9d9d9;
				font-size: 26rpx;
			}
		}
		.add{
			margin-top: 6.6667rpx;
			width: 156.6667rpx;
			height: 156.6667rpx;
		}
		.btn{
			text-align: center;
			border-radius: 30rpx;
			background: #ffa800;
			color:#fff;
			height: 61.3333rpx;
			line-height: 61.3333rpx;
			margin-top: 40rpx;
			position: fixed;
			bottom: 30px;
			width: 670rpx;
		}
	}
	.success_box{
		padding: 40rpx;
		.success_icon{
			margin:0 auto;
			display: block;
			width: 100rpx;
			height:113.3333rpx;
			padding: 90rpx 0 66.6667rpx;
		}
		.success_text{
			font-size: 36.6667rpx;
			padding:0 40rpx;
			.phone{
				color:#316bf3;
			}
		}
		.btn{
			text-align: center;
			border-radius: 30rpx;
			background: #245ff9;
			color:#fff;
			height: 61.3333rpx;
			line-height: 61.3333rpx;
			margin-top: 40rpx;
			width: 670rpx;
		}
		
	}
		
}
</style>
