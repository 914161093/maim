<template>
	<view class="container" v-if="pageShow">
		<view class="banner_box">
			<image class="banner" src="../../static/qydk_bg.png" mode="widthFix"></image>
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
								<view class="title">企业名称</view>
								<input class="uni-input form_input" name="company_name" v-model="company_name" placeholder="请输入企业名称" />
							</view>
							<view class="form_item">
								<view class="title">姓名</view>
								<input class="uni-input form_input" name="name" v-model="name" placeholder="请输入您的姓名" />
							</view>
							<view class="form_item">
								<view class="title">手机号</view>
								<input class="uni-input form_input" name="phone" v-model="phone" placeholder="请输入您的手机号" />
							</view>
							<view class="form_item">
								<view class="title">所在城市</view>
									<input class="uni-input form_input" placeholder="请选择省市区" name="city" :readonly="true" @tap="openPicker" v-model="city" />
									<input class="uni-input form_input" hidden name="city_code" v-model="city_code"/>
							</view>
							<view class="form_item">
								<view class="title">微信</view>
								<input class="uni-input form_input" name="we_chat" v-model="we_chat" placeholder="请输入您的微信号" />
							</view>
							<view class="form_item noflex">
								<view class="title">所需资金</view>
								<view class="checkbox-group">
									<radio-group @change="checkboxChange($event,checkboxList1,1)" class="radio-group-list" name="money">
										<label v-for="(item, index) in checkboxList1" :key="item.value"
											:class="money == item.value ?'option_default checkCss':'option_default'">
											<view class="checkboxHidden">
												<radio :value="item.value" :checked="money == item.value" />
												<input name="money_val" :value="money_val"/>
											</view>
											<view class="checkTxt">{{item.title}}</view>
										</label>
									</radio-group>
								</view>
							</view>
							<view class="form_item noflex">
								<view class="title">经营年限</view>
								<view class="checkbox-group">
									<radio-group @change="checkboxChange($event,checkboxList2,2)" class="radio-group-list" name="experience_years">
										<label v-for="(item, index) in checkboxList2" :key="item.value"
											:class="experience_years == item.value ?'option_default checkCss':'option_default'">
											<view class="checkboxHidden">
												<radio :value="item.value" :checked="experience_years == item.value" />
												<input name="experience_years_val" :value="experience_years_val"/>
											</view>
											<view class="checkTxt">{{item.title}}</view>
										</label>
									</radio-group>
								</view>
							</view>
							<view class="form_item noflex">
								<view class="title">企业性质</view>
								<view class="checkbox-group">
									<radio-group @change="checkboxChange($event,checkboxList3,3)" class="radio-group-list" name="company_nature">
										<label v-for="(item, index) in checkboxList3" :key="item.value"
											:class="company_nature == item.value ?'option_default checkCss':'option_default'">
											<view class="checkboxHidden">
												<radio :value="item.value" :checked="company_nature == item.value" />
												<input name="company_nature_val" :value="company_nature_val"/>
											</view>
											<view class="checkTxt">{{item.title}}</view>
										</label>
									</radio-group>
								</view>
							</view>
							<view class="form_item noflex">
								<view class="title">注册资金</view>
								<view class="checkbox-group">
									<radio-group @change="checkboxChange($event,checkboxList4,4)" class="radio-group-list" name="registered_capital">
										<label v-for="(item, index) in checkboxList4" :key="item.value"
											:class="registered_capital == item.value ?'option_default checkCss':'option_default'">
											<view class="checkboxHidden">
												<radio :value="item.value" :checked="registered_capital == item.value" />
												<input name="registered_capital_val" :value="registered_capital_val"/>
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
		<cc-selectDity :province="province" :city="cityData" :provinceid="provinceidData" :cityid="cityidData" :show="show" @changeClick="changeClick" @sureSelectArea="onsetCity"
				@hideShow="onhideShow"></cc-selectDity>
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
						title: '5万以内',
					},
					{
						value: '2',
						title: '5-10万元',
					},
					{
						value: '3',
						title: '10-50万元',
					},
					{
						value: '4',
						title: '50-100万元',
					},
					{
						value: '5',
						title: '100万元以上',
					}
				],
				checkboxList2: [{
						value: '1',
						title: '1年以内',
					},
					{
						value: '2',
						title: '1-3年',
					},
					{
						value: '3',
						title: '3-5年',
					},
					{
						value: '4',
						title: '5-10年',
					},
					{
						value: '5',
						title: '10年以上',
					}
				],
				checkboxList3: [{
						value: '1',
						title: '国有企业',
					},
					{
						value: '2',
						title: '国有控股',
					},
					{
						value: '3',
						title: '外资',
					},
					{
						value: '4',
						title: '合资',
					},
					{
						value: '5',
						title: '民营',
					},
					{
						value: '6',
						title: '事业单位',
					},
					{
						value: '7',
						title: '政府机关',
					},
					{
						value: '8',
						title: '个体户',
					},
					{
						value: '9',
						title: '自由职业',
					}
				],
				checkboxList4: [{
						value: '1',
						title: '50万以内',
					},
					{
						value: '2',
						title: '50-100万',
					},
					{
						value: '3',
						title: '100-500万',
					},
					{
						value: '4',
						title: '500万-1000万',
					},
					{
						value: '5',
						title: '1000万以上',
					}
				],
				treaty:false,
				value: '',
				backData:'',
				company_name:'',
				name:'',
				phone:'',
				we_chat:'',
				backData:'',
				backData:'',
				
				money:'',
				money_val:'',
				experience_years:'',
				experience_years_val:'',
				company_nature:'',
				company_nature_val:'',
				registered_capital:'',
				registered_capital_val:'',
				isAgree:false,
				// 地区
				province:"北京市",
				cityData:"北京市",
				provinceid:"",
				cityid:"",
				city_code:'010',
				cityCode:'',
				address: '',
				show: false,
				pageShow:false
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			
			// #ifdef  WEB
			const url = window.location.href;
			//const regex1 = /[?&]next(?:=([^&#]*)|&|#|$)/;
			const regex2 = /[?&]channel(?:=([^&#]*)|&|#|$)/;
			//const matches1 = regex1.exec(url);
			const matches2 = regex2.exec(url);
			//const nextParam = matches1 && matches1[1] ? decodeURIComponent(matches1[1].replace(/\+/g, ' ')) : null;
			const channelParam = matches2 && matches2[1] ? decodeURIComponent(matches2[1].replace(/\+/g, ' ')) : null;
			// #endif
			
			uni.request({
				url: 'https://api.maimangbox.cn/corporateloan',
				header: {
					'content-type': 'application/json',
					'api-token': token
				},
				method: 'POST',
				success: (res) => {
					if(res.data.resultCode ==10000){
						this.pageShow = true;
						this.backData = res.data.data.userInfo;
						this.company_name = res.data.data.userInfo?.company_name;
						this.name = res.data.data.userInfo?.name;
						this.phone = res.data.data.userInfo?.phone;
						this.city = res.data.data.userInfo?.city;
						this.city_code = res.data.data.userInfo?.city_code;
						this.we_chat = res.data.data.userInfo?.we_chat;
						this.money = res.data.data.userInfo?.money;
						this.money_val = res.data.data.userInfo?.money_val;
						this.experience_years = res.data.data.userInfo?.experience_years;
						this.experience_years_val = res.data.data.userInfo?.experience_years_val;
						this.company_nature = res.data.data.userInfo?.company_nature;
						this.company_nature_val = res.data.data.userInfo?.company_nature_val;
						this.registered_capital = res.data.data.userInfo?.registered_capital;
						this.registered_capital_val = res.data.data.userInfo?.registered_capital_val;
					}else{
						uni.navigateTo({
							url: '/pages/login'+res.data.applyUrl||'?next='+nextParam
						});
					}
				}
			});
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                //定义表单规则
                var rule = [
                    {name:"company_name", checkType : "notnull", checkRule:"",  errorMsg:"企业名称不能为空"},
                    {name:"name", checkType : "notnull", checkRule:"",  errorMsg:"姓名不能为空"},
                    {name:"phone", checkType : "phoneno", checkRule:"",  errorMsg:"手机号不能为空"},
                    {name:"we_chat", checkType : "notnull", checkRule:"",  errorMsg:"微信不能为空"},
                    {name:"money", checkType : "in", checkRule:"1,2,3,4,5",  errorMsg:"请选择所需资金"},
                    {name:"experience_years", checkType : "in", checkRule:"1,2,3,4,5",  errorMsg:"请选择经营年限"},
                    {name:"company_nature", checkType : "in", checkRule:"1,2,3,4,5,6,7,8,9",  errorMsg:"请选择企业性质"},
                    {name:"registered_capital", checkType : "in", checkRule:"1,2,3,4,5",  errorMsg:"请选择注册资金"},
                ];
                //进行表单检查
                var formData = e.detail.value;
				if(this.city_code == undefined){
					formData.city_code = '010'
				}
				console.log(formData)
				formData= Object.assign({}, this.backData, formData);
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
							this.money = values
							this.money_val = item.title;
						}
						if(type==2){
							this.experience_years = values
							this.experience_years_val = item.title;
						}
						if(type==3){
							this.company_nature = values
							this.company_nature_val = item.title;
						}
						if(type==4){
							this.registered_capital = values
							this.registered_capital_val = item.title;
						}
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
			handleChange(e) {
				this.backData.car = '';
				this.value = e.detail.value;
				console.log(this.value);
				if(this.value.length == 0){
                    uni.showToast({title:"请勾选已同意用户协议和隐私协议!", icon:"none"});
				}else{
					this.agree = true;
					console.log('勾选成功')
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
				this.city_code = value4;
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
			margin: -26.6667rpx 33.3333rpx 0;
			position: relative;
			background: #ffa800;
			border-radius: 16rpx;

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
								border:solid 1rpx #ffa800;
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
								border:solid 1rpx #ffa800;
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
			.agree_check{
				margin: 20rpx 0;
				display: flex;
				color:#969696;
				font-size: 17.3333rpx;
				line-height:50rpx;
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
