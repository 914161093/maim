<template>
	<view class="container">
		<view class="info">
			<view class="name">隐私设置</view>
			<view class="desc">访问您的位置并提供服务</view>
		</view>
		<view class="list">
			<view class="item" @click="goToSetting()">
				<view class="item_l">定位服务</view>
				<view class="viewBtn">
					<text>去设置</text>
					<image src="../../static/dingw_arrow.png" class="arrow"></image>
				</view>
			</view>
		</view>
		<!-- layer -->
		<view class="alert_box" v-if="isShow">
			<view class="small_win">
				<view class="alert_box_content">
					<image src="../../static/dingw_layer_bg.png" class="alert_img"></image>
					<view class="text-tit">开启定位服务</view>
					<view class="text-p">为判断您的地区是否可提供相关服务，“麦芒”需要访问您的位置，点击“去设置”开启</view>
				</view>
				<view class="alert_box_btn">
					<button class="cancel"  @click="closeFn()">取消</button>
					<button class="confim"  @click="nextFn()">下一步</button>
				</view>
			</view>
		</view>
		<!-- layer -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
			}
		},
		methods: {
			goToSetting(key){
				this.isShow = true;
			},
			closeFn(){
				this.isShow = false;
			},
			nextFn(){
				this.isShow = false;
			}
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
			.viewBtn{
				font-size:26rpx;
				color:#bbb;
				.arrow{
					width: 20rpx;
					height: 32rpx;
					vertical-align: middle;
					margin-left:20rpx;
				}
			}
		}
		:last-child{
			border-bottom: none;
		}
	}
	
	.alert_box {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		.small_win {
			background: #fff;
			width: 90%;
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			border-radius: 14rpx;
			overflow: hidden;
			.alert_box_title {
				line-height:50rpx;
				text-align: left;
				font-size: 42px;
				height:50rpx;
				padding-left:20rpx;
				display: flex;
				margin-bottom: 40rpx;
				justify-content: flex-end;
				.close{
				  width: 50rpx;
				  height: 50rpx;
				  margin: 10rpx 10rpx 0 0;
				}
			}
			.alert_box_content {
				width: 80%;
				margin: 0 auto;
				padding: 5%;
				text-align: center;
				.alert_img{
					width:400rpx;
					height:400rpx;
					display: block;
					margin:0 auto;
				}
				.text-tit{
					font-weight: bold;
					margin-bottom:30rpx;
				}
				.text-p{
					color:#999;
				}
			}
			.alert_box_sure {
				text-align: right;
				margin: .4rem 0;
			}
			.alert_box_btn {
			  outline: none;
			  display: flex;
			  font-size: 30px;
			  padding:30rpx 0;
			.cancel{
			  background-color: #bbbbbb;
			  padding:0 70rpx;
			  color: #fff;
			  height:80rpx;
			  line-height:80rpx;
			  border-radius: 50rpx;
			}
			.confim{
			  background: #ffa800;
			  padding:0 70rpx;
			  color: #fff;
			  height:80rpx;
			  line-height:80rpx;
			  border-radius: 50rpx;
			}
			}
		}
	}
	
}
</style>
