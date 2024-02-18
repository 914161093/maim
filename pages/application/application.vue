<template>
	<view class="container">
		<view class="info">
			<view class="name">我的申请</view>
			<view class="desc">查看您的申请情况</view>
		</view>
		<view class="noData_tips" v-if="noData">暂无数据</view>
		<view class="list" v-else v-for="(item,index) in myApplyList">
			<view class="gsinfo">
				<image :src="item.business_license" class="logo"></image>
				<view class="gs_text">
					<view class="name">{{item.name}}</view>
					<view class="time">申请时间：{{item.date}}</view>
				</view>
			</view>
			<view class="item" @click="openLayer(item.business_license)">
				<view class="item_l">营业执照</view>
				<view class="viewBtn">
					<text>查看</text>
					<image src="../../static/dingw_arrow.png" class="arrow"></image>
				</view>
			</view>
			<view class="item" @click="openLayer(item.compliance_commitment)">
				<view class="item_l">业务合规承诺</view>
				<view class="viewBtn">
					<text>查看</text>
					<image src="../../static/dingw_arrow.png" class="arrow"></image>
				</view>
			</view>
			<view class="item" @click="goToPage('/pages/knowledgedetail/knowledgedetail?key=6')">
				<view class="item_l">个人信息推送服务授权协议</view>
				<view class="viewBtn">
					<text>查看</text>
					<image src="../../static/dingw_arrow.png" class="arrow"></image>
				</view>
			</view>
		</view>
		<!-- layer -->
		<view class="alert_box" v-if="isShow">
			<view class="small_win">
				<view class="alert_box_title"><image src="../../static/close.svg" class="close" @click="closeLayer"></image></view>
				<view class="alert_box_content">
					<image :src="imgUrl" class="alert_img"></image>
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
				noData:false,
				myApplyList:[],
				isShow:false,
				imgUrl:''
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			uni.request({
				url: 'https://api.maimangbox.cn/myApply',
				header: {
					'content-type': 'application/json',
					'api-token': token
				},
				method: 'POST',
				success: (res) => {
					if(res.data.resultCode == 10000){
						this.myApplyList = res.data.data.myApplyList;
						if(this.myApplyList.length == 0){
							this.noData = true
						}
					}else{console.log(res)
						uni.navigateTo({
							url: '/pages/login/login?next=myApply'
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
			openLayer(url){
				this.isShow = true;
				this.imgUrl = url;
			},
			closeLayer(url){
				this.isShow = false;
			},
		}
	}
</script>

<style lang="scss">
body{background: #f9f9f9;}
.container{
	padding: 40rpx;
	background: url(../../static/my_sq_bg.png) no-repeat #f9f9f9 top right;
	background-size: contain;
	.noData_tips{
		padding-top:200rpx;
		text-align: center;
	}
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
		.gsinfo{
			display: flex;
			border-bottom:1px solid #ededed;
			padding-top:30rpx;
			padding-bottom: 30rpx;
			margin-bottom: 10rpx;
			.logo{
				width: 63.3333rpx;
				height: 63.3333rpx;
				border-radius: 16rpx;
				margin-right:25rpx;
			}
			.gs_text{
				.name{
					color:#333;
					font-size:32rpx;
					margin-bottom: 6rpx;
				}
				.time{
					color:#bbb;
					font-size:22rpx;
				}
			}
		}
		.item{
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
				height: 800rpx;
				margin: 0 auto;
				padding: 5%;
				display: flex;
				align-items: center;
				background: url(../../static/upload_ywhg.png) no-repeat;
				background-size: contain;
				.alert_img{
					border-radius: 40rpx;
					max-width:100%;
					max-height:720rpx;
				}
			}
			.alert_box_sure {
				text-align: right;
				margin: .4rem 0;
			}
			.alert_box_btn {
			  width: 40%;
			  margin-right: 5px;
			  outline: none;
			  height: 0.5rem;
			  line-height: 0.5rem;
			  font-size: 30px;
			}
			.cancel{
			  border: 1px solid #dedede;
			  background-color: #fff;
			  color: #333;
			}
			.confim{
			  border-color: #c7000b;
			  background: #c7000b;
			  color: #fff;
			  border:none;
			}
		}
	}
}
.noData{
	padding: 40rpx;
	background-color: #f9f9f9 !important;
	background: url(../../static/no_sq.png) no-repeat #f9f9f9 top right;
	background-size: contain;
	.noData_tips{
		padding:200rpx 0 0;
		text-align: center;
		display: block;
	}
	.list{
		display: none;
	}
}
</style>
