<template>
	<view class="container" v-if="pageShow">
		<view class="banner_box">
			<image class="banner" src="../../static/yqsa_bg.png" mode="widthFix"></image>
		</view>
		<view class="box">
				<view class="notics">
					<image src="../../static/notic_write_icon.png" class="notics_icon"></image>
					<text class="notics_text">为了更好的为您进行融资咨询服务，请认真填写本业信息</text>
				</view>
				<view class="form_box">
					<form @submit="formSubmit" @reset="formReset">
						<view class="form_shadow">
							<view class="form_item">
								<view class="title">姓名</view>
								<input class="uni-input form_input" name="name" v-model="name" placeholder="请输入您的姓名" />
							</view>
							<view class="form_item">
								<view class="title">手机号</view>
								<input class="uni-input form_input" name="phone" v-model="phone" placeholder="请输入您的手机号" />
							</view>
							<view class="form_item">
								<view class="title">微信</view>
								<input class="uni-input form_input" name="we_chat" v-model="we_chat" placeholder="请输入您的微信号" />
							</view>
							<view class="form_item">
								<view class="title">所在城市</view>
									<input class="uni-input form_input" v-model="city" placeholder="请选择省市区" name="city" :readonly="true" @tap="openPicker"/>
									<input class="uni-input form_input" v-model="city_code" hidden name="city_code"/>
							</view>
							<view class="form_item noflex">
								<view class="title">逾期类型</view>
								<view class="checkbox-group">
									<radio-group @change="checkboxChange($event,checkboxList1,1)" class="radio-group-list" name="overdue">
										<label v-for="(item, index) in checkboxList1" :key="item.value"
											:class="overdue == item.value ? 'option_default checkCss':'option_default'">
											<view class="checkboxHidden">
												<radio :value="item.value" :checked="overdue == item.value" />
												<input name="overdue_val" :value="overdue_val"/>
											</view>
											<view class="checkTxt">{{item.title}}</view>
										</label>
									</radio-group>
								</view>
							</view>
							<view class="form_item noflex">
								<view class="title">逾期时长</view>
								<view class="checkbox-group">
									<radio-group @change="checkboxChange($event,checkboxList2,2)" class="radio-group-list" name="overdue_time">
										<label v-for="(item, index) in checkboxList2" :key="item.value"
											:class="overdue_time == item.value ?'option_default checkCss':'option_default'">
											<view class="checkboxHidden">
												<radio :value="item.value" :checked="overdue_time == item.value" />
												<input name="overdue_time_val" :value="overdue_time_val"/>
											</view>
											<view class="checkTxt">{{item.title}}</view>
										</label>
									</radio-group>
								</view>
							</view>
						</view>
						<agree @isAgree="agreeChange"></agree>
						<view class="uni-btn-v">
							<button form-type="submit" class="next_btn">下一步</button>
						</view>
					</form>
				</view>
		</view>
		<!-- 省市区选择 province city area初始省市区设置 show:是否显示  @sureSelectArea：确认事件 @hideShow：隐藏事件-->
		<cc-selectDity :province="province" :city="cityData" :provinceid="provinceid" :cityid="cityid" :show="show" @changeClick="changeClick" @sureSelectArea="onsetCity"
				@hideShow="onhideShow" :readonly="true"></cc-selectDity>
	</view>
</template>
<script>
	import graceChecker from "../../common/graceChecker.js"
	import agree from "../../components/agree/agree.vue"
	export default {
		components: {
			agree
		},
		data() {
			return {
				checkboxList1: [{
						value: '1',
						title: '信用卡逾期',
					},
					{
						value: '2',
						title: '网贷逾期',
					},
					{
						value: '3',
						title: '信用卡+网贷逾期',
					},
					{
						value: '4',
						title: '银行信用贷逾期',
					}
				],
				checkboxList2: [
					{
						value: '0',
						title: '无',
					},{
						value: '1',
						title: '1个月以内',
					},
					{
						value: '2',
						title: '1-3个月',
					},
					{
						value: '3',
						title: '3-6个月',
					},
					{
						value: '4',
						title: '6-12个月',
					},
					{
						value: '5',
						title: '12个月以上',
					}
				],
				treaty:false,
				backData:'',
				name:'',
				phone:'',
				we_chat:'',
				overdue_val:'',
				overdue:'',
				overdue_time:'',
				overdue_time_val:'',
				isAgree:false,
				// 地区
				province:"北京市",
				cityData:"北京市",
				provinceid:"",
				cityid:"",
				city_code:'',
				cityCode:'',
				address: '',
				show: false,
				pageShow:false
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			uni.request({
				url: 'https://api.maimangbox.cn/overdue',
				header: {
					'content-type': 'application/json',
					'api-token': token
				},
				method: 'POST',
				success: (res) => {console.log(res)
					if(res.data.resultCode ==10000){
						this.pageShow = true;
						this.backData = res.data.data.userInfo;
						this.name = res.data.data.userInfo?.name;
						this.phone = res.data.data.userInfo?.phone;
						this.we_chat = res.data.data.userInfo?.we_chat;
						this.city = res.data.data.userInfo?.city;
						this.city_code = res.data.data.userInfo?.city_code;
						this.overdue = res.data.data.userInfo?.overdue;
						this.overdue_val = res.data.data.userInfo?.overdue_val;
						this.overdue_time = res.data.data.userInfo?.overdue_time;
						this.overdue_time_val = res.data.data.userInfo?.overdue_time_val;
					}else{
						uni.navigateTo({
							url: '/pages/login/login'+'?next=overdue'
						})
					}
				}
			});
		},
		methods: {
			formSubmit: function(e) {
                //定义表单规则
                var rule = [
                       {name:"name", checkType : "notnull", checkRule:"",  errorMsg:"姓名不能为空"},
                       {name:"phone", checkType : "phoneno", checkRule:"",  errorMsg:"手机号不能为空"},
                       {name:"we_chat", checkType : "notnull", checkRule:"",  errorMsg:"微信不能为空"},
                       {name:"city", checkType : "notnull", checkRule:"",  errorMsg:"所在城市不能为空"},
                       {name:"overdue", checkType : "in", checkRule:"1,2,3,4",  errorMsg:"请选择逾期类型"},
                       {name:"overdue_time", checkType : "in", checkRule:"0,1,2,3,4,5",  errorMsg:"请选择逾期时长"},
                ];
                //进行表单检查
                var formData = e.detail.value;
				if(this.city_code == undefined){
					formData.city_code = '010'
				}
				formData= Object.assign({}, this.backData, formData);
				console.log(formData)
                var checkRes = graceChecker.check(formData, rule);
				if(this.isAgree != true){
                    uni.showToast({title:"请勾选用户协议和隐私协议", icon:"none"});
					return;
				}
                if(checkRes){
					uni.request({
						url: 'https://api.maimangbox.cn/form',
						data: {
							formData
						},
						header: {
							'content-type': 'application/json',
							'api-token': uni.getStorageSync('token')
						},
						method: 'POST',
						success: (res) => {
							if(res.data.resultCode == 10000){
								uni.showToast({title:"提交成功", icon:"none"});
								setTimeout(function(){
									uni.navigateTo({
										url: '/pages/mate/mate?next=' + 'mate'
									})
								},3000)
							}else{
								uni.showToast({title:res.data.resultMsg, icon:"none"});
							}
						}
					});
                }else{
                    uni.showToast({ title: graceChecker.error, icon: "none" });
                }
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			checkboxChange(e,checkboxList,type) {
				var items = checkboxList,
					values = e.detail.value,
					name = e.currentTarget.dataset.name;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true);
						if(type==1){
							this.overdue = values
							this.overdue_val = item.title;
						}
						if(type==2){
							this.overdue_time = values
							this.overdue_time_val = item.title;
						}
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
			agreeChange(e){
				this.isAgree = e;
			},
			openPicker() {
				console.log('执行打开地址选择器')
				this.show = true
			},
			
			changeClick(value, value2, value3, value4){
				
				console.log('地址选择器 = ' + value + value2 + value3 + value4);
				
				this.province = value;
				this.cityData = value3;
				this.provinceid = value2;
				this.cityid = value4;
				this.cityCode = value4;
				this.city_code = value4
				//this.area = value3;
				
			},
			onhideShow() {
				this.show = false
				console.log('执行了关闭地址选择器')
			},
			//选中省市区
			onsetCity(e) {console.log(e)
				let data = e.detail.target.dataset;
				let address = data.province + data.city;
				this.show = false
				this.city = address
			},
			// 
			switchChange(e) {
		
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background: #fff;
		.uni-form-item .title {
			padding: 20rpx 0;
		}
		.banner_box{
			height: 400rpx;
		}
		.banner{
			width: 750rpx;
			height: 400rpx;
		}
		.box{
			margin: -30rpx 33.3333rpx 0;
			position: relative;
			background: #ffa800;
			border-radius: 16rpx;
			.dk_info{
				display: flex;
				justify-content:space-between;
				margin:0 43.3333rpx;
				border-bottom:1rpx #fff solid;
				.item{
					text-align: center;
					margin: 30rpx 0;
					.title{
						color:#ddeefe;
						margin-bottom:23.3333rpx;
					}
					.text{
						color:#fcde02
					}
				}
				.rightborder{
					padding-right: 23.3333rpx;
					border-right:1px solid #fff;
				}
			}
		}
		.notics{
			height:56rpx;
			line-height: 56rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.notics_icon{
				width:22rpx;
				height:22rpx;
				margin-right: 5.3333rpx;
			}
			.notics_text{
				font-size: 22rpx;
				color:#fff;
			}
		}
		.form_box{
			background:#fff;
			border-radius: 16rpx;
			padding-bottom:30rpx;
			padding-bottom:30rpx;
			.form_shadow{
				box-shadow:0 8px 26px rgba(0, 0, 0, 0.1);
				padding:20rpx 40rpx;
				margin-bottom: 26.6667rpx;
				border-radius: 0.5rem;
				.form_item{
					line-height:  60rpx;
					display: flex;
					margin-bottom: 40rpx;
					.title{
						width: 130rpx;
						font-size: 24rpx;
					}
					.form_input{
						text-align:right;
						flex:1;
						font-size: 24rpx;
						line-height: 60rpx;
						height: 60rpx;
						border-bottom:1px solid #eee;
					}
					.checkbox-group{
						display: block;
						.radio-group-list{
							display: block;
							.option_default{
								border:solid 2rpx #ffa800;
								background: #fff;
								color:#ffa800;
								border-radius: 6.6667rpx;
								display: inline-block;
								margin-right: 14.6667rpx;
								margin-bottom: 14.6667rpx;
								.checkboxHidden{
									display: none;
								}
								.checkTxt{
									padding:0 24rpx;
									height: 60rpx;
									line-height: 60rpx;
									font-size: 22rpx;
								}
							}
							.checkCss{
								border:solid 2rpx #ffa800;
								background: #ffa800;
								color:#fff;
							}
						}
					}
				}
				.noflex{
					display: block;
					margin-bottom: .8rem;
				}
			}
			.agree_box{
				line-height:40rpx;
				font-size: 26rpx;
				color:#2360f9;
				padding:0 6.6667rpx
			}
			.uni-btn-v{
				.next_btn{
					background: #ffa800;
					color:#fff;
					height: 70rpx;
					line-height: 70rpx;
					margin-bottom:30rpx;
				}
			}
		}
		.info{
			background: #fff;
			border-radius: 16rpx;
		}
	}
</style>
