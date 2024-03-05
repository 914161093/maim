<template>
	<view class="page">
	<view class="container" v-if="showHome">
		<image src="../../static/0185065a6dbe99a80120a123847aad.jpg" style="width:100%;border-radius: 20rpx;"></image>
		<!-- <view class="top-info">
			<view class="title"><image src="../../static/xin_logo.png" class="xin_logo"></image>麦麦 | 一站式咨询服务</view>
			<view class="subtitle">个人大额信贷</view>
			<view class="edu">最高可获得额度(元)</view>
			<view class="money">200,000</view>
			<view class="">年化利润率：6~18%</view>
			<button class="applyNow" @click="goToLoanPage('/pages/largeloan/largeloan')">立即申请</button>
			<view class="kouh">额度高 | 利息低 | 放款快</view>
		</view> -->
		<view class="scroll_box">
			<image src="../../static/luck_bg.png" class="scroll_bg"></image>
			<view class="scroll_text">
				<image src="../../static/notification.png" class="notification"></image>
				<text>恭喜尾号8903的用户获得500元优惠卷红包</text>
			</view>
		</view>
		<view class="tab_box">
			<view class="tab_list" @click="goToTb('https://ku.m.taobao.com/general.html?ali_trackid=19_46a4ee98e18285caa2ec3108ca3d178d')">
				<image src="../../static/enterprise.png" class="tab_pic"></image>
				<text class="tab_name">今日上新</text>
			</view>
			<view class="tab_list" @click="goToTb('https://main.m.taobao.com/security-h5-detail/home?id=570446831774&xstChannel=1&item_type=ad&ali_refid=a3_430776_1007%3A56370379%3AU%3A56370379_0_5201591442%3A148de39f4db96d7bed3ac55aa5a29186&ali_trackid=174_148de39f4db96d7bed3ac55aa5a29186&spm=a2e3d.26023335.0.0&bxsign=tanu5JrTHznkqQvR3ND05FR_zgnLevq2l_EMLj7iBBA2ok5HPo8JLfGREbkAafxsRbHs6A6KqIdwJAGB8HAzVNO_wl3lLqhvBDT29TnNrDaNYw&fromNormal=true')">
				<image src="../../static/house.png" class="tab_pic"></image>
				<text class="tab_name">今日爆款</text>
			</view>
			<view class="tab_list" @click="goToTb('https://main.m.taobao.com/security-h5-detail/home?id=674444092933&xstChannel=1&item_type=ad&ali_refid=a3_430776_1007:2873990182:U:2873990182_0_3650541620:b2469ffc9ca6c8dc5c6697b8c7d42fb4&ali_trackid=149_b2469ffc9ca6c8dc5c6697b8c7d42fb4&spm=a2e3d.26023335.0.0&bxsign=tanYgZc0BZjqBf2hSgyTAqERxe_ak2LQlFvQOO6VB1qP_peFJEe8TE2S0eWu_U5uJ5xEdwuibQDjFqCaZXDDI8TrkyqFD5BlOr3emWggFHvHOU&fromNormal=true')">
				<image src="../../static/car.png" class="tab_pic"></image>
				<text class="tab_name">今日秒杀</text>
			</view>
			<view class="tab_list" @click="goToTb('https://main.m.taobao.com/security-h5-detail/home?id=734139031697&xstChannel=1&item_type=ad&ali_refid=a3_430776_1007:30264906:U:30264906_0_10645694943:a997224b25eac5b2d5a500eefa8dd354&ali_trackid=174_a997224b25eac5b2d5a500eefa8dd354&spm=a2e3d.26023335.0.0&bxsign=taneuB1cVnhOYXDlZYuPNdkTHfKI3bvoj6Occ86VmvmaWWeZ5X-tc5OXl1MrqlR-BAcCsFOtmwhZGt1pOljk0uDMgqP8WV2tH7gTXL1FO8LJ6o&fromNormal=true')">
				<image src="../../static/overdue.png" class="tab_pic"></image>
				<text class="tab_name">今日特价</text>
			</view>
		</view>
		<view class="jig_box">
			<view class="com_title">
				<text class="title_text">优选产品</text>
			</view>
			<view class="jig_list">
				<view class="jig_item" v-for="item in productList"  @click="goToTb('https://main.m.taobao.com/security-h5-detail/home?id=674444092933&xstChannel=1&item_type=ad&ali_refid=a3_430776_1007:2873990182:U:2873990182_0_3650541620:b2469ffc9ca6c8dc5c6697b8c7d42fb4&ali_trackid=149_b2469ffc9ca6c8dc5c6697b8c7d42fb4&spm=a2e3d.26023335.0.0&bxsign=tanYgZc0BZjqBf2hSgyTAqERxe_ak2LQlFvQOO6VB1qP_peFJEe8TE2S0eWu_U5uJ5xEdwuibQDjFqCaZXDDI8TrkyqFD5BlOr3emWggFHvHOU&fromNormal=true')">
					<view class="jig_info">
						<view class="jig_left">
							<view class="jig_title">{{item.title}}</view>
						</view>
						<view class="jig_logo">
							<image :src="item.icon" class="jig_logo_img"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="knows">
			<view class="com_title">
				<text class="title_text">常见问题</text>
			</view>
			<view class="knows_list">
				<view class="item" @click="goToKnowledgeDetail1()">
					<view class="item_info">
						<view class="item_title">网络购物五大问题及应对方法</view>
						<view class="item_time">2023/12/20</view>
					</view>
				</view>
				<view class="item" @click="goToKnowledgeDetail2()">
					<view class="item_info">
						<view class="item_title">韩国购物常见问题你遇到几个?</view>
						<view class="item_time">2023/12/20</view>
					</view>
				</view>
			</view>
		</view>
		<view class="advantage">
			<view class="title">我们的优势</view>
			<view class="list">
				<view class="item">
					<image src="../../static/yous_01.png" class="img"></image>
					<view class="text">专业服务体系<br>多年从业经验</view>
				</view>
				<view class="item">
					<image src="../../static/yous_02.png" class="img"></image>
					<view class="text">省心高效<br>专业资深团队</view>
				</view>
				<view class="item">
					<image src="../../static/yous_03.png" class="img"></image>
					<view class="text">专业细致<br>一对一服务</view>
				</view>
				<view class="item">
					<image src="../../static/yous_04.png" class="img"></image>
					<view class="text">保障安全<br>保密个人信息安全</view>
				</view>
			</view>
		</view>
		<view class="advantage">
			<view class="title">服务流程</view>
			<view class="process_list">
				<view class="item">
					<image src="../../static/flow_01.png" class="img"></image>
					<view class="text">了解客户<br>需求情况</view>
				</view>
				<image src="../../static/arrow_r_h.png" class="arrow"></image>
				<view class="item">
					<image src="../../static/flow_02.png" class="img"></image>
					<view class="text">签收正规<br>授权合同</view>
				</view>
				<image src="../../static/arrow_r_h.png" class="arrow"></image>
				<view class="item">
					<image src="../../static/flow_03.png" class="img"></image>
					<view class="text">专业服务<br>制定方案</view>
				</view>
				<image src="../../static/arrow_r_h.png" class="arrow"></image>
				<view class="item">
					<image src="../../static/flow_04.png" class="img"></image>
					<view class="text">协助指导<br>完成购物</view>
				</view>
			</view>
		</view>
	</view>
	<view class="noData" v-if="noData">
		<image src="../../static/pip_fail.png" class="icon"></image>
		<view class="tips">获取信息失败</view>
		<button class="gotohome" @click="getData()">获取信息</button>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList:[],
				articleList:[],
				showHome:false,
				approved:false,
				noData:false
			}
		},
		onShow() {
			let _this=this;
			
			// #ifdef  WEB
			const url = window.location.href;
			const regex = /[?&]channel(?:=([^&#]*)|&|#|$)/;
			const matches = regex.exec(url);
			const channelText = matches && matches[1] ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : null;
			uni.setStorageSync('channel', channelText);
			// #endif
			
			
			
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
			    // 此处的 res 参数，与使用默认方式调用时 success 回调中的 res 参数一致
			    if(res.data.resultCode == 10000){
					 uni.setStorageSync('token', res.data.data);
					 var res1 = await uni.request({
					 	url: 'https://api.maimangbox.cn/home',
					 	data: {
					 	},
					 	header: {
							'content-type': 'application/json',
					 		'api-token': uni.getStorageSync('token')
					 	},
					 	method: 'POST',
					 });
					 if(res1.data.resultCode == 10000){
						 _this.noData = false;
						_this.showHome = true;
						_this.productList = res1.data.data.productList;
						_this.articleList = res1.data.data.article;
					 }else{
					 	uni.showToast({title:res1.data.resultMsg, icon:"none"});
					 	_this.showHome = false;
					 }
				}else{
					if(uni.getSystemInfoSync().platform == "ios"){
						uni.getNetworkType({
							success: function (res) {
								if(res.networkType!='none'){
									_this.noData=true;
								}
							}
						});
						uni.onNetworkStatusChange(function (res) {
							if(res.isConnected != false){
								_this.noData=true;
							}
						});
					}
					 uni.setStorageSync('token', '');
					 uni.hideTabBar();
					 uni.showToast({title:res.data.resultMsg, icon:"none"});
				}
			  } catch (err) {
			    console.error(err);
			  }
			}
			
			async function getHome(){console.log('111222')
				var res = await uni.request({
					url: 'https://api.maimangbox.cn/home',
					data: {
					},
					header: {
						'content-type': 'application/json',
						'api-token': token
					},
					method: 'POST',
				});
				if(res.data.resultCode == 10000){
					_this.showHome = true;
					_this.noData = false;
					_this.productList = res.data.data.productList;
					_this.articleList = res.data.data.article;
				}else{
					uni.showToast({title:res.data.resultMsg, icon:"none"});
					getToken();
				}
			}
			
			
				
			if(token == ''){
				getToken();
				
				// #ifdef  APP-PLUS
				if(uni.getSystemInfoSync().platform == "ios"){
					uni.getNetworkType({
						success: function (res) {
							if(res.networkType=='none'){
								uni.showToast({title:'请检查您的网络', icon:"none"});
								_this.noData = true;
							}
						}
					});
					uni.onNetworkStatusChange(function (res) {
						if(res.isConnected == false){
							_this.noData = true;
						}
					});
				}
				// #endif

				var res = await uni.request({
					url: 'https://api.maimangbox.cn/system',
					data: {},
					header: {
						'content-type': 'application/json',
						'api-token': uni.getStorageSync('token')
					},
					method: 'POST',
				});
				 console.log(res1)
				// if(res.data.resultCode == 10000){
				// 	_this.showHome = true;
				// 	_this.noData = false;
				// 	_this.productList = res.data.data.productList;
				// 	_this.articleList = res.data.data.article;
				// }else{
				// 	uni.showToast({title:res.data.resultMsg, icon:"none"});
				// 	getToken();
				// }
				
			}else{
				getHome()
			}
			 // getToken().then(res){
				//  console.log(res)
			 // }
			// //getHome();
			// if(token == ''){
			// 	// 初始化时获取 token
			// 	getToken();
			// }
			//else{
			// 	getHome();
			// 	// _this.showHome = false;
			// 	// _this.productList = '';
			// 	// _this.articleList = '';
			// }
			
			
		},
		methods: {
			getData(){
				this.getToken()
			},
			
			//发送请求获取 token
			async getToken() {
				
				let _this=this;
				// #ifdef  WEB
				const url = window.location.href;
				const regex = /[?&]channel(?:=([^&#]*)|&|#|$)/;
				const matches = regex.exec(url);
				const channelText = matches && matches[1] ? decodeURIComponent(matches[1].replace(/\+/g, ' ')) : null;
				uni.setStorageSync('channel', channelText);
				// #endif
				
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
			    // 此处的 res 参数，与使用默认方式调用时 success 回调中的 res 参数一致
			    if(res.data.resultCode == 10000){console.log(res.data.data)
					 uni.setStorageSync('token', res.data.data);
					 var res1 = await uni.request({
					 	url: 'https://api.maimangbox.cn/home',
					 	data: {
					 	},
					 	header: {
							'content-type': 'application/json',
					 		'api-token': uni.getStorageSync('token')
					 	},
					 	method: 'POST',
					 });
					 if(res1.data.resultCode == 10000){console.log('获取成功')
						_this.showHome = true;
						_this.productList = res1.data.data.productList;
						_this.articleList = res1.data.data.article;
					 }else{
					 	uni.showToast({title:res1.data.resultMsg, icon:"none"});
					 	_this.showHome = false;
					 }
				}else{
					 uni.setStorageSync('token', '');
					 uni.hideTabBar();
					 uni.showToast({title:res.data.resultMsg, icon:"none"});
				}
			  } catch (err) {
			    console.error(err);
			  }
			},
			
			goToLoanPage(url){
				uni.navigateTo({
					url: url
				});
			},
			goToKnowledgeDetail1(key){
				uni.navigateTo({
					url: '/pages/knowledgedetail1/knowledgedetail'
				});
			},
			goToKnowledgeDetail2(key){
				uni.navigateTo({
					url: '/pages/knowledgedetail2/knowledgedetail'
				});
			},
			goToTb(url){
				uni.navigateTo({
					url: '/pages/webview/webview?url=' + url
				})
			},
			listApplyBtn(url,id){
				uni.request({
					url: 'https://api.maimangbox.cn/click',
					data: {
						productId:id
					},
					header: {
						'api-token': uni.getStorageSync('token')
					},
					method: 'POST',
					success: (res) => {console.log(res.data.applyUrl)
						uni.setStorageSync('clickUrl', url) 
						if(res.data.resultCode ==10000){
							uni.navigateTo({
								url: '/pages/webview/webview?url=' + res.data.applyUrl
							})
						}else{
							uni.showToast({title:res.data.resultMsg, icon:"none"});
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.page{
		height:866.6667rpx;
		background: #fff;
	}
	.container {
		padding: 46rpx;
		font-size: 14px;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		line-height: 24px;
		background:#f9f9f9;
		.top-info{
			text-align: center;
			height:548rpx;
			color: #fff;
			background: linear-gradient(to bottom, #ffa632, #ffc93c);
			border-radius: 14.6667rpx;
			padding:46.6667rpx 86.6667rpx;
			.title{
				font-size: 30.6667rpx;
				font-weight: bold;
				margin-bottom: 30rpx;
				.xin_logo{
					width: 50rpx;
					height: 50rpx;
					margin-right: 12rpx;
					vertical-align: middle;
				}
			}
			.subtitle{
				font-size: 30.6667rpx;
				font-weight: bold;
				margin-bottom: 12.6667rpx;
			}
			.edu{
				font-size: 30.6667rpx;
				margin-bottom: 17.3333rpx;
			}
			.money{
				height: 105.3333rpx;
				line-height: 105.3333rpx;
				font-size: 120rpx;
				font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
				padding: 20rpx 0;
			}
			.applyNow{
				font-size: 30rpx;
				height:78.6667rpx;
				line-height:78.6667rpx;
				color:#ffa800;
				margin-top: 28rpx;
				margin-bottom: 28rpx;
				background: linear-gradient(to right, #fafbff, #fff0c8);
			}
			.kouh{
			}
		}
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
				.notification{
					width: 15.3333rpx;
					height: 18rpx;
					vertical-align: middle;
					margin-right: 7.3333rpx;
				}
			}
		}
		.tab_box{
			display: flex;
			.tab_list{
				width: 25%;
				text-align: center;
				.tab_pic{
					width:110rpx;
					height:110rpx;
					display: block;
					margin:0 auto;
				}
				.tab_name{
					height: 50rpx;
					line-height: 50rpx;
					font-size: 22.6667rpx;
				}
			}
		}
		.jig_box{
			padding-top: 34.6667rpx;
			.com_title{
				height: 25.3333rpx;
				line-height: 25.3333rpx;
				font-size: 30rpx;
				margin-bottom: 25.3333rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				.title_text{
					font-weight:bold;
				}
				.title_more{
					font-weight:normal;
				font-size: 24rpx;
				}
			}
			.jig_list{
				margin-top: 6.6667rpx;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				justify-content: space-between;
				.jig_item{
					width: 260rpx;
					margin-bottom: 33.3333rpx;
					border-radius: 13.3333rpx;
					padding:25.3333rpx 22rpx 16.6667rpx 26.6667rpx;
					background: linear-gradient(to right, #ffa632, #ffc93c);
					.jig_info{
						display: flex;
						justify-content: space-between;
						.jig_left{
							.jig_title{
								font-weight:bold;
								height:28rpx;
								line-height: 28rpx;
								color:#fff;
								margin-bottom: 9.3333rpx;
							}
							.jig_highest{
								font-size: 16rpx;
								color:#fff;
								margin-bottom: 6rpx;
							}
							.jig_price{
								.currency{
									font-size: 20rpx;
									color:#fff;
								}
								.price{
									color:#fff;
									font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
								}
							}
						}
						.jig_logo{
							width: 110rpx;
							height:110rpx;
							border-radius: 13.3333rpx;
							.jig_logo_img{
								width: 110rpx;
								height:110rpx;
								border-radius: 26rpx;
							}
						}
					}
					.jig_apply{
						margin-top: 23.3333rpx;
						background:#fff;
						color:#ffa800;
						height: 40rpx;
						line-height: 40rpx;
						font-size: 22rpx;
					}
				}
			}
		}
		.knows{
			.com_title{
				height: 25.3333rpx;
				line-height: 25.3333rpx;
				font-size: 30rpx;
				margin-bottom: 25.3333rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				.title_text{
					font-weight:bold;
				}
				.title_more{
					font-weight:normal;
				}
			}
			.knows_list{
				.item{
					display: flex;
					justify-content: space-between;
					margin-bottom: 36.6667rpx;
					.item_info{
						margin-right: 23.3333rpx;
						.item_title{
							margin-bottom: 23.3333rpx;
						}
						.item_time{
							color:#bbb;
						}
					}
					.item_img{
						width: 260rpx;
						height: 140rpx;
						border-radius: 13.3333rpx;
					}
				}
			}
		}
		.advantage{
			padding: 36.6667rpx 0;
			background: #fff;
			border-radius: 13.3333rpx;
			margin-bottom: 29.3333rpx;
			.title{
				font-size: 33.3333rpx;
				color:#353535;
				text-align: center;
				margin-bottom: 45.3333rpx;
			}
			.list{
				display: flex;
				.item{
					width:25%;
					text-align: center;
					.img{
						width: 96.6667rpx;
						height: 96.6667rpx;
					}
					.text{
						font-size: 20rpx;
						line-height:26rpx;
						color:#3d3125;
					}
				}
			}
			.process_list{
				display: flex;
				.item{
					width: 20%;
					text-align: center;
					.img{
						width: 70.6667rpx;
						height: 70.6667rpx;
					}
					.text{
						font-size:20rpx;
						line-height:26rpx;
					}
				}
				.arrow{
					width: 26rpx;
					height: 26rpx;
					margin: 22rpx 32.6667rpx 0;
				}
			}
		}
		.foot{
			color:#bbb;
			text-align: center;
			.title{
				font-size: 33.3333rpx;
				margin: 45.3333rpx 0 16rpx;
			}
			.text{
				font-size: 20rpx;
			}
		}
	}
	
	.noData{
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
</style>
