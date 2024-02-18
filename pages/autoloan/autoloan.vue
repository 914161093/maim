<template>
	<view class="container" v-if="pageShow">
		<view class="banner_box">
			<image class="banner" src="../../static/qcdk_bg.png" mode="widthFix"></image>
		</view>
		<view class="box">
				<view class="dk_info">
					<view class="item rightborder">
						<view class="title">最长可分</view>
						<view class="text">96期</view>
					</view>
					<view class="item rightborder">
						<view class="title">最高可贷</view>
						<view class="text">估值9成</view>
					</view>
					<view class="item">
						<view class="title">最快放款</view>
						<view class="text">1小时</view>
					</view>
				</view>
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
								<view class="title">品牌和型号</view>
								<input class="uni-input form_input" name="car_brand" v-model="car_brand" placeholder="请填项您的车辆品牌和型号" />
							</view>
							<view class="form_item">
								<view class="title">所在城市</view>
									<input class="uni-input form_input" placeholder="请选择省市区" name="city" readonly="readonly" @tap="openPicker" v-model="city" />
									<input class="uni-input form_input" hidden name="city_code" v-model="city_code"/>
							</view>
							<view class="form_item noflex">
								<view class="title">车辆类型</view>
								<view class="checkbox-group">
									<radio-group @change="checkboxChange($event,checkboxList1,1)" class="radio-group-list" name="car">
										<label  v-for="(item, index) in checkboxList1"
											:class="car == item.value ?'option_default checkCss':'option_default'">
											<view class="checkboxHidden">
												<radio :value="item.value" :checked="car == item.value" />
												<input name="car_val" :value="car_val"/>
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
						title: '轿车',
					},
					{
						value: '2',
						title: 'suv',
					},
					{
						value: '3',
						title: '商务车',
					},
					{
						value: '4',
						title: '其他',
					}
				],
				value: '',
				agree:false,
				backData:'',
				name:'',
				phone:'',
				we_chat:'',
				car_brand:'',
				car:'',
				car_val:'',
				isAgree:false,
				// 地区
				province:"北京市",
				cityData:"北京市",
				provinceid:"",
				cityid:"",
				city:'',
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
				url: 'https://api.maimangbox.cn/autoloan',
				header: {
					'content-type': 'application/json',
					'api-token': token
				},
				method: 'POST',
				success: (res) => {
					if(res.data.resultCode ==10000){
						this.pageShow=true;
						this.backData = res.data.data.userInfo;
						this.name =  res.data.data.userInfo?.name;
						this.phone =  res.data.data.userInfo?.phone;
						this.we_chat =  res.data.data.userInfo?.we_chat;
						this.car_brand =  res.data.data.userInfo?.car_brand;
						this.city = res.data.data.userInfo?.city;
						this.city_code = res.data.data.userInfo?.city_code;
						this.car =  res.data.data.userInfo?.car;
						this.car_val =  res.data.data.userInfo?.car_val;
					}else{
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				}
			});
		},
		methods: {
			formSubmit: function(e) {
				let that =this;
				let token = uni.getStorageSync('token');
                //定义表单规则
                 var rule = [
                    {name:"name", checkType : "notnull", checkRule:"",  errorMsg:"姓名不能为空"},
                    {name:"phone", checkType : "phoneno", checkRule:"",  errorMsg:"手机号不能为空"},
                    {name:"we_chat", checkType : "notnull", checkRule:"",  errorMsg:"微信不能为空"},
                    {name:"car_brand", checkType : "notnull", checkRule:"",  errorMsg:"品牌和型号不能为空"},
                    {name:"city", checkType : "notnull", checkRule:"",  errorMsg:"所在城市不能为空"},
                    {name:"car", checkType : "in", checkRule:"1,2,3,4",  errorMsg:"请选择车辆类型"},
                 ];
                //进行表单检查
                var formData = e.detail.value;
				if(this.city_code == undefined){
					formData.city_code = '010'
				}
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
						'api-token': token
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
						this.car = values
						this.$set(item, 'checked', true);
						this.car_val = item.title;
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
			height: 446.6667rpx;
		}
		.banner{
			width: 750rpx;
			height: 446.6667rpx;
		}
		.box{
			margin: -116.6667rpx 33.3333rpx 0;
			position: relative;
			border-radius: 16rpx;
			.dk_info{
				display: flex;
				justify-content:space-between;
				padding:0 43.3333rpx;
				font-weight:bold;
				border-radius:15rpx;
				background: linear-gradient(to bottom, #faca30, #ffa64b);
				.item{
					text-align: center;
					margin: 30rpx 0;
					.title{
						color:#fffbf3;
						margin-bottom:23.3333rpx;
					}
					.text{
						color:#b14f00
					}
				}
				.rightborder{
					padding-right: 60rpx;
					border-right:1px solid #fff;
				}
			}
		}
		.notics{
			margin-top:16rpx;
			height:56rpx;
			line-height: 56rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #fda700;
			border-top-left-radius: 15rpx;
			border-top-right-radius: 15rpx;
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
			padding-bottom:20rpx;
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
