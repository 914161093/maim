<template>
	<view class="container">
		<view class="pages">
			<view class="mate_success" v-if="mate">
				<view class="scroll_box">
					<image src="../../static/luck_bg.png" class="scroll_bg"></image>
					<view class="scroll_text">
						<text>已匹配以下服务机构稍后将与您联系，</text><text class="tips">请注意接听电话</text>
					</view>
				</view>
				<view class="info">
					<view class="top" @click="listApplyBtn(myApplyList[0].name.url,myApplyList[0].name.id)">
						<view class="info_l">
							<view class="name">{{myApplyList[0].name}}</view>
							<view class="xiey">《信息推送授权协议》</view>
						</view>
						<view class="jg_box"><image :src="myApplyList[0].business_license" class="jg_logo"></image></view>
					</view>
				</view>
			</view>
			<view class="mate_error" v-else>
				<image src="../../static/pip_fail.png" class="icon"></image>
				<view class="tips">匹配失败，您所在地区暂无相关服务</view>
				<button class="gotohome" @click="goToHome('/pages/index/index')">去首页</button>
			</view>
			<view class="list">
				<view class="title">优选机构</view>
				<view class="item" v-for="(item,indx) in productList">
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
						<button class="jig_applyNow" @click="listApplyBtn(item.url,item.id)">立即申请</button>
					</view>
				</view>
			</view>
			<!-- layer -->
			<view class="alert_box" v-if="tjLayer">
				<view class="small_win">
					<view class="alert_box_title"><image src="../../static/close.svg" class="close" @click="closeLayer"></image></view>
					<view class="tip"><image src="../../static/tip_ico.png" class="icon"></image>没有合适的产品，试试这款123</view>
					<view class="alert_box_content">
						<image :src="myApplyList[0].business_license" class="img"></image>
						<view class="info">
							<view class="title">{{myApplyList[0].name}}</view>
							<image src="../../static/zstj_ico.png" class="icon"></image>
						</view>
					</view>
					<button class="tosee"  @click="listApplyBtn(myApplyList[0].url,myApplyList[0].id)">去看看</button>
				</view>
			</view>
			<!-- layer -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myApplyList:[],
				productList:[],
				mate:false,
				clickNum:0,
				tjLayer:false,
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			uni.request({
				url: 'https://api.maimangbox.cn/mate',
				header: {
					'content-type': 'application/json',
					'api-token': token
				},
				method: 'POST',
				success: (res) => {
					if(res.data.resultCode ==10000){console.log(res.data.resultMsg)
						this.myApplyList = res.data.resultMsg.myApplyList;
						this.productList = res.data.resultMsg.productList;
						if(res.data.resultMsg.myApplyList.length >= 1){
							this.mate = true;
						}
					}else{
						uni.navigateTo({
							url: '/pages/login/login'+'?next=mate'
						});
					}
				}
			});
		},
		methods: {
			goToHome(url){
				if(this.clickNum == 0){
					this.tjLayer = true;
				}else{
					uni.switchTab({
						url: url
					});
				}
			},
			goToKnowledgeDetail(id){
				uni.navigateTo({
					url: '/pages/knowledgedetail/knowledgedetail?id='+ id
				});
			},
			listApplyBtn(url,id){
				uni.request({
					url: 'https://api.maimangbox.cn/click',
					data: {
						productId:id
					},
					header: {
						'content-type': 'application/json',
						'api-token': uni.getStorageSync('token')
					},
					method: 'POST',
					success: (res) => {console.log(url)
						uni.setStorageSync('clickUrl', url) 
						if(res.data.resultCode ==10000){
							this.clickNum = 1;
							uni.navigateTo({
								url: '/pages/webview/webview?url=' + res.data.applyUrl
							})
						}else{
							uni.navigateTo({
								url: '/pages/login'+res.data.applyUrl
							});
						}
					}
				});
			},
			closeLayer(){
				this.tjLayer = false;
			},
		}
	}
</script>

<style lang="scss">
	.container {
		font-size: 14px;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		line-height: 24px;
		background:#fff;
		.radius_bg{
			height: 330rpx;
			background: #487dfd;
			border-bottom-left-radius: 40rpx;
			border-bottom-right-radius: 40rpx;
		}
		.pages{
			padding: 0 46rpx;
			position: relative;
			.mate_success{
				.scroll_box{
					height:48rpx;
					margin-top: 20rpx;
					margin-bottom: 26.6667rpx;
					text-align: center;
					font-size: 24rpx;
					position: relative;
					.scroll_bg{
						position: absolute;
						width:100%;
						height:48rpx;
						left:0;
					}
					.scroll_text{
						width: 100%;
						line-height:48rpx;
						position: absolute;
						left:0;
						top:0;
						z-index: 9999;
						text-align: center;
						.tips{
							color:#ff8b0d;
						}
						.notification{
							width: 15.3333rpx;
							height: 18rpx;
							vertical-align: middle;
							margin-right: 7.3333rpx;
						}
					}
				}
				.info{
					text-align: left;
					color: #fff;
					background:url(../../static/jigou_bg.png) no-repeat;
					background-size: cover;
					height:246.6667rpx;
					padding:0 40rpx;
					.top{
						display: flex;
						justify-content: space-between;
						padding-top:66rpx;
						.info_l{
							.name{
								color:#f3d3a0;
								font-size:36rpx;
								height: 60rpx;
								line-height: 60rpx;
							}
							.xiey{
								color:#f2d2a1;
								font-size:22rpx;
							}
						}
						.jg_box{
							width: 140rpx;
							height: 140rpx;
							border-radius: 32rpx;
							.jg_logo{
								width: 140rpx;
								height: 140rpx;
								border-radius: 32rpx;
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
						color:#2360f9;
						background: #fff;
						margin:0;
						font-weight: bold;
					}
				}
			}
			.mate_error{
				text-align: center;
				.icon{
					width: 386.6667rpx;
					height: 386.6667rpx;
					margin:0 auto;
				}
				.tips{
					font-size:30rpx;
					font-weight: bold;
					margin:10rpx 0 50rpx;
				}
				.gotohome{
					width: 173.3333rpx;
					height: 58.6667rpx;
					line-height: 58.6667rpx;
					background: #245ff9;
					font-size:26rpx;
					color:#fff;
					margin-bottom:50rpx;
					text-align:center;
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
					box-shadow: 2px 5px 9px 6px #eee;
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
			.alert_box {
				width: 100%;
				height: 100%;
				position: fixed;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.5);
				.small_win {
					background: #f4ebdc;
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
					.tip{
						display: flex;
						justify-content: center;
						height: 34.6667rpx;
						line-height: 34.6667rpx;
						margin:20rpx 0 40rpx;
						font-size:28rpx;
						.icon{
							width: 34.6667rpx;
							height:34.6667rpx;
							margin-right: 13.3333rpx;
						}
					}
					.alert_box_content {
						width: 80%;
						margin: 0 auto;
						padding: 5%;
						display: flex;
						align-items: center;
						background: url(../../static/zstj_bg.png) no-repeat;
						background-size: contain;
						.img{
							width: 100rpx;
							height: 100rpx;
							margin-right: 20rpx;
							border-radius: 20rpx;
						}
						.info{
							.title{
								height: 53.3333rpx;
								line-height: 53.3333rpx;
								color:#f3d49e;
							}
							.icon{
								width: 133.3333rpx;
								height: 33.3333rpx;
							}
						}
					}
					.tosee{
						width: 283.3333rpx;
						height: 54.6667rpx;
						line-height: 54.6667rpx;
						background: #3d3832;
						color:#fff5e9;
						border-radius: 30rpx;
						margin: 46.6667rpx auto;
						font-size: 26rpx;
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
		
	}
</style>
