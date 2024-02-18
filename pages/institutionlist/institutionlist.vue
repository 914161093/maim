<template>
	<view class="container">
		<view class="radius_bg"></view>
		<view class="pages">
			<view class="info">
				<view class="top">
					<view class="edu">最高可获得额度(元)</view>
					<view class="jg_box">{{productList[0]?.title}}<image :src="productList[0]?.icon" class="jg_logo"></image></view>
				</view>
				<view class="money">{{productList[0]?.max_price}}00,000</view>
				<view class="lirunl">
					<view class="yearlr">年化利润率：{{productList[0]?.day_rate * 365}}%</view>
					<button class="applyNow" @click="handleApply(productList[0].url)">立即申请</button>
				</view>
			</view>
			<view class="list">
				<view class="title">优选机构</view>
				<view class="item" v-for="(item,indx) in productList.slice(1)">
					<image src="../../static/kangkk.png" class="tag_bg"></image>
					<view class="jig_name">
						<image :src="item.icon" class="img"></image>
						{{item.title}}
					</view>
					<view class="jig_info">
						<view class="money_box">
							<view class="money"><text class="currency">￥</text>{{item.max_price}}0,000</view>
							<view class="bottom_title">最高可借(元)</view>
						</view>
						<view class="rate_box">
							<view class="rate">{{item.day_rate * 365}}%</view>
							<view class="bottom_title">年利率</view>
						</view>
						<button class="jig_applyNow" @click="handleApply(item.url)">立即申请</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList:[]
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			uni.request({
				url: 'https://api.maimangbox.cn/list',
				header: {
					'content-type': 'application/json',
					'api-token': token
				},
				method: 'POST',
				success: (res) => {
					if(res.data.resultCode ==10000){
						this.productList = res.data.data.productList;
						console.log(this.productList)
					}else{
						uni.navigateTo({
							url: '/pages/login'+res.data.applyUrl
						});
					}
				}
			});
		},
		methods: {
			goToLoanPage(url){
				uni.navigateTo({
					url: url
				});
			},
			goToKnowledgeDetail(id){
				uni.navigateTo({
					url: '/pages/knowledgedetail/knowledgedetail?id='+ id
				});
			},
			handleApply(url){
				uni.navigateTo({
					url: '/pages/webview/webview?url=' + url
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		font-size: 14px;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		line-height: 24px;
		background:#f9f9f9;
		.radius_bg{
			height: 330rpx;
			background: #ffaf2c;
			border-bottom-left-radius: 40rpx;
			border-bottom-right-radius: 40rpx;
		}
		.pages{
			padding: 0 46rpx;
			position: relative;
			margin-top: -217.3333rpx;
			.info{
				text-align: center;
				color: #fff;
				background: linear-gradient(to right, #fdcc7c, #feb235, #fdcc7c);
				border-radius: 14.6667rpx;
				padding: 30rpx 34.6667rpx;
				.top{
					height: 58.6667rpx;
					line-height: 58.6667rpx;
					display: flex;
					justify-content: space-between;
					margin-bottom: 10rpx;
					.edu{
						font-size: 30.6667rpx;
						margin-bottom: 17.3333rpx;
					}
					.jg_box{
						display: flex;
						.jg_logo{
							width: 58.6667rpx;
							height: 58.6667rpx;
							margin-left: 12rpx;
							border-radius: 15.3333rpx;
							vertical-align: middle;
						}
					}
				}
				.subtitle{
					font-size: 30.6667rpx;
					font-weight: bold;
					margin-bottom: 12.6667rpx;
				}
				.money{
					height: 105.3333rpx;
					line-height: 105.3333rpx;
					font-size: 100rpx;
					font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
					padding: 10rpx 0;
					text-align: left;
				}
				.lirunl{
					height: 53.3333rpx;
					display: flex;
					justify-content: space-between;
				}
				.applyNow{
					border-radius: 40rpx;
					padding:0 30.3333rpx;
					font-size: 26rpx;
					height: 53.3333rpx;
					line-height:53.3333rpx;
					color:#ffa800;
					background: #fff;
					margin:0;
					font-weight: bold;
				}
			}
			.list{
				padding-bottom: 20rpx;
				.title{
					font-size: 32rpx;
					font-weight:bold;
					padding: 20rpx 0;
				}
				.item{
					background: url(../../static/jigou_list_bg.png) no-repeat bottom right #fff;
					background-size:contain;
					margin-bottom: 26.6667rpx;
					padding:0 36.6667rpx;
					border-radius: 22rpx;
					.tag_bg{
						width :136.6667rpx;
						height: 30rpx;
						margin-left: 450rpx;
						display: flex;
					}
					.jig_name{
						height:37.3333rpx;
						.img{
							width: 37.3333rpx;
							height: 37.3333rpx;
							margin-right: 8rpx;
							border-radius: 20rpx;
							vertical-align:middle;
						}
					}
					.jig_info{
						padding-top: 33.3333rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-bottom: 33.3333rpx;
						.money_box{
							.money{
								color:#2360f9;
								font-weight:bold;
								font-size: 28.6667rpx;
							}
							.bottom_title{
								color:#bbb;
							}
						}
						.rate_box{
							.rate{
								color:#373737;
								font-weight:bold;
								font-size: 28.6667rpx;
							}
							.bottom_title{
								color:#bbb;
							}
						}
						.jig_applyNow{
							height: 56rpx;
							line-height: 56rpx;
							margin: 0;
							padding:0 40rpx;
							color:#fff;
							font-size:30rpx;
							border-radius: 30rpx;
							background: linear-gradient(to right, #265ff7, #3f75fc, #5a89fd);
						}
					}
				}
			}
		}
		
	}
</style>
