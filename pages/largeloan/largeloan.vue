<template>
	<view class="container" v-if="pageShow">
		<form @submit="formSubmit" @reset="formReset">
			<view class="info">
				<view class="comon_title"><image src="../../static/info_title_icon.png" class="comon_icon"></image>基本信息</view>
				<view class="box">
					<view class="form_item">
						<view class="title">姓名</view>
						<input class="uni-input form_input" name="name" v-model="name" placeholder="请输入您的姓名" />
					</view>
					<view class="form_item">
						<view class="title">手机号</view>
						<input class="uni-input form_input" name="phone" v-model="phone" placeholder="请输入您的手机号" />
					</view>
					<view class="form_item">
						<view class="title">身份证号</view>
						<input class="uni-input form_input" name="id_card" v-model="id_card" phoneplaceholder="请输入您的身份证号" />
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
						<view class="title">期望金额</view>
						<view class="checkbox-group">
							<radio-group @change="checkboxChange($event,expectMoney,1)" class="radio-group-list" name="money">
								<label v-for="(item, index) in expectMoney" :key="item.value"
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
				</view>
			</view>
			<view class="info">
				<view class="comon_title"><image src="../../static/info_title_icon.png" class="comon_icon"></image>贷款信息</view>
				<view class="box">
					<view class="form_item noflex">
						<view class="title">芝麻分</view>
						<view class="checkbox-group">
							<radio-group @change="checkboxChange($event,zhimaList,2)" class="radio-group-list" name="sesame">
								<label v-for="(item, index) in zhimaList" :key="item.value"
									:class="sesame == item.value ?'option_default checkCss':'option_default'">
									<view class="checkboxHidden">
										<radio :value="item.value" :checked="sesame == item.value" />
										<input name="sesame_val" :value="sesame_val"/>
									</view>
									<view class="checkTxt">{{item.title}}</view>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form_item noflex">
						<view class="title">信用情况</view>
						<view class="checkbox-group">
							<radio-group @change="checkboxChange($event,creditLst,3)" class="radio-group-list" name="credit">
								<label v-for="(item, index) in creditLst" :key="item.value"
									:class="credit == item.value ?'option_default checkCss':'option_default'">
									<view class="checkboxHidden">
										<radio :value="item.value" :checked="credit == item.value" />
										<input name="credit_val" :value="credit_val"/>
									</view>
									<view class="checkTxt">{{item.title}}</view>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form_item noflex">
						<view class="title">逾期时长</view>
						<view class="checkbox-group">
							<radio-group @change="checkboxChange($event,overdueTimeList,4)" class="radio-group-list" name="overdue_time">
								<label v-for="(item, index) in overdueTimeList"
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
					<view class="form_item noflex">
						<view class="title">逾期金额</view>
						<view class="checkbox-group">
							<radio-group @change="checkboxChange($event,overdueMoneyList,5)" class="radio-group-list" name="overdue_money">
								<label v-for="(item, index) in overdueMoneyList"
									:class="overdue_money == item.value ?'option_default checkCss':'option_default'">
									<view class="checkboxHidden">
										<radio :value="item.value" :checked="overdue_money == item.value" />
										<input name="overdue_money_val" :value="overdue_money_val"/>
									</view>
									<view class="checkTxt">{{item.title}}</view>
								</label>
							</radio-group>
						</view>
					</view>
				</view>
			</view>
			<view class="muti" >
				<view class="title">完成下列选项有助于提升通过率（多选,选填）</view>
				<view class="checkbox-group">
					<checkbox-group @change="checkboxChange($event,mutiList,6)" class="radio-group-list">
						<label v-for="(item, index) in mutiList" :key="item.value"
							:class="item.checked ?'option_default checkCss':'option_default'">
							<view class="checkboxHidden">
								<checkbox :value="item.value" :checked="checked"/>
							</view>
							<view class="checkTxt">{{item.title}}</view>
						</label>
					</checkbox-group>
				</view>
			</view>
			<agree @isAgree="agreeChange"></agree>
			<view class="uni-btn-v">
				<button form-type="submit" class="next_btn">下一步</button>
			</view>
		</form>
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
				expectMoney: [{
						value: '1',
						title: '5万以内',
					},
					{
						value: '2',
						title: '5-10万元',
					},
					{
						value: '3',
						title: '5-10万元',
					},
					{
						value: '4',
						title: '5-10万元',
					},
					{
						value: '5',
						title: '100万元以上',
					}
				],
				zhimaList: [{
						value: '1',
						title: '0-350元',
					},
					{
						value: '2',
						title: '350-550',
					},
					{
						value: '3',
						title: '550-600',
					},
					{
						value: '4',
						title: '600-650',
					},
					{
						value: '5',
						title: '650-700',
					},
					{
						value: '6',
						title: '700-950',
					}
				],
				creditLst: [{
						value: '1',
						title: '优秀',
					},
					{
						value: '2',
						title: '良好',
					},
					{
						value: '3',
						title: '一般',
					},
					{
						value: '4',
						title: '较差',
					}
				],
				overdueTimeList: [
					{
						value: '0',
						title: '无',
					},
					{
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
					},
					{
						value: '5',
						title: '12个月以上',
					}
				],
				overdueMoneyList: [
					{
						value: '0',
						title: '无',
					},
					{
						value: '1',
						title: '1000-5000元',
					},
					{
						value: '2',
						title: '5000-10000元',
					},
					{
						value: '3',
						title: '10000-50000元',
					},
					{
						value: '4',
						title: '50000-100000元',
					},
					{
						value: '5',
						title: '10万元以上',
					}
				],
				mutiList: [{
						value: '1',
						title: '有房',
					},
					{
						value: '2',
						title: '有车',
					},
					{
						value: '3',
						title: '有公积金',
					},
					{
						value: '4',
						title: '有社保',
					},
					{
						value: '5',
						title: '有公司',
					},
					{
						value: '6',
						title: '有保金',
					}
				],
				backData:'',
				name:'',
				phone:'',
				id_card:'',
				city:'',
				we_chat:'',
				money:'',
				money_val:'',
				sesame:'',
				sesame_val:'',
				credit:'',
				credit_val:'',
				overdue_time:'',
				overdue_time_val:'',
				overdue_money:'',
				overdue_money_val:'',
				msInstance:null,
				selectedVal:'',
				selectedText:'',
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
				url: 'https://api.maimangbox.cn/largeloan',
				header: {
					'content-type': 'application/json',
					'api-token': token
				},
				method: 'POST',
				success: (res) => {
					if(res.data.resultCode ==10000){
						this.pageShow = true;
						this.backData = res.data.data.userInfo;
						this.name = res.data.data.userInfo?.name;
						this.phone = res.data.data.userInfo?.phone;
						this.id_card = res.data.data.userInfo?.id_card;
						this.city = res.data.data.userInfo?.city;
						this.city_code = res.data.data.userInfo?.city_code;
						this.we_chat = res.data.data.userInfo?.we_chat;
						this.money = res.data.data.userInfo?.money;
						this.money_val = res.data.data.userInfo?.money_val;
						this.sesame = res.data.data.userInfo?.sesame;
						this.sesame_val = res.data.data.userInfo?.sesame_val;
						this.credit = res.data.data.userInfo?.credit;
						this.credit_val = res.data.data.userInfo?.credit_val;
						this.overdue_time = res.data.data.userInfo?.overdue_time;
						this.overdue_time_val = res.data.data.userInfo?.overdue_time_val;
						this.overdue_money = res.data.data.userInfo?.overdue_money;
						this.overdue_money_val = res.data.data.userInfo?.overdue_money_val;
					}else{console.log('wdl')
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				}
			});
		},
		methods: {
			formSubmit: function(e) {console.log(e)
				//定义表单规则
				var rule = [
                       {name:"name", checkType : "notnull", checkRule:"",  errorMsg:"姓名不能为空"},
                       {name:"phone", checkType : "phoneno", checkRule:"",  errorMsg:"手机号不能为空"},
                       {name:"id_card", checkType : "notnull", checkRule:"",  errorMsg:"请输入您的身份证号"},
                       {name:"city", checkType : "notnull", checkRule:"",  errorMsg:"所在城市不能为空"},
                       {name:"we_chat", checkType : "notnull", checkRule:"",  errorMsg:"微信不能为空"},
                       {name:"money", checkType : "in", checkRule:"1,2,3,4,5",  errorMsg:"请选择期望金额"},
                       {name:"sesame", checkType : "in", checkRule:"1,2,3,4,5,6",  errorMsg:"请选择芝麻分"},
                       {name:"credit", checkType : "in", checkRule:"1,2,3,4",  errorMsg:"请选择信用情况"},
                       {name:"overdue_time", checkType : "in", checkRule:"0,1,2,3,4,5",  errorMsg:"请选择逾期时长"},
                       {name:"overdue_money", checkType : "in", checkRule:"0,1,2,3,4,5",  errorMsg:"请选择逾期金额"},
				];
				//进行表单检查
				var formData = e.detail.value;
				if(this.city_code == undefined){
					formData.city_code = '010'
				}
				formData= Object.assign({}, this.backData, formData);
				formData.is_house = 0;
				formData.is_car = 0;
				formData.accumulation = 0;
				formData.social = 0;
				formData.company_name = 0;
				formData.insurance = 0;
				this.mutiList.find(item => {console.log(item)
					if(item.value==1 && item.checked==true){
						formData.is_house = 2
					}if(item.value==2 && item.checked==true){
						formData.is_car = 2
					}if(item.value==3 && item.checked==true){
						formData.accumulation = 2
					}if(item.value==4 && item.checked==true){
						formData.social = 2
					}if(item.value==5 && item.checked==true){
						formData.company_name = 2
					}if(item.value==6 && item.checked==true){
						formData.insurance = 2
					}
				})
				var checkRes = graceChecker.check(formData, rule);
				if(this.isAgree != true){
					uni.showToast({title:"请勾选用户协议和隐私协议", icon:"none"});
					return;
				}
				console.log(formData)
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
							this.sesame = values
							this.sesame_val = item.title;
						}
						if(type==3){
							this.credit = values
							this.credit_val = item.title;
						}
						if(type==4){
							this.overdue_time = values
							this.overdue_time_val = item.title;
						}
						if(type==5){
							this.overdue_money = values
							this.overdue_money_val = item.title;
						}
						if(type==6){
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
	background: #f9f9f9;
	padding: 13.3333rpx 46rpx;
	.info{
		.comon_title{
			color:#262626;
			font-size: 33.3333rpx;
			font-weight: bold;
			margin: 34.6667rpx 0;
			.comon_icon{
				width:6rpx;
				height:22rpx;
				margin-right: 9.3333rpx;
			}
		}
		.box{
			background: #fff;
			border-radius: 13.3333rpx;
			box-shadow:0 8px 26px rgba(0, 0, 0, 0.1);
			padding: 13.3333rpx 35rpx;
			.form_item{
				line-height:  60rpx;
				display: flex;
				margin-bottom: 40rpx;
				.title{
					width: 130rpx;
					font-size: 24rpx;
				}
				.cityIpt{
					text-align:right;
					flex:1;
					font-size: 24rpx;
					line-height: 60rpx;
					height: 60rpx;
					color: gray;
					border-bottom:1px solid #eee;
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
					display: flex;
					justify-content: space-between;
					flex-flow: row wrap;
					align-content: flex-start;
					.radio-group-list{
						display: flex;
						flex-flow: row wrap;
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
	.muti{
		margin: 40rpx 0 0;
		.title{
			color:#ffa800;
			margin-bottom: 30rpx;
			font-size:30rpx;
		}
		.checkbox-group{
			.radio-group-list{
			display: flex;
			flex-flow: row wrap;
			align-content: flex-start;
				.option_default{
				width:30%;
				height: 63.3333rpx;
				line-height:63.3333rpx;
				background: #fff;
				padding:0;
				margin-right: 14.6667rpx;
				margin-bottom: 30rpx;
				color:#ffa800;
				border-radius: 6.6667rpx;
				text-align:center;
				border:solid 1rpx #ffa800;
					.checkboxHidden{
						display: none;
					}
					.checkTxt{
						height: 60rpx;
						line-height: 60rpx;
						font-size: 22rpx;
					}
				}
				.checkCss{
					border:solid 2rpx #ffa800;
					background: #ffa800;
					color:#fff;
					.checkTxt{
						color:#fff;
					}
				}
			}
		}
	}
	.noflex{
		display: block;
		margin-bottom: .8rem;
	}
}
</style>
