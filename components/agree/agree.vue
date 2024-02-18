<template>
	<view>
		<view class="agree_box" v-if="showTip">
			同意，平台顾问将向您提供专业1对一咨询服务， 不同意仅将信息保存为个人信息。
		</view>
		<checkbox-group  @change="handleChange">
			<label class="agree_check">
				<view :class="isAgree ? 'agree checked' : 'agree unchecked'"></view>
				<checkbox hidden />
				<view >我已阅读并同意
				<text class="col-g" @click="goToKnowledgeDetail('3')">《用户协议》</text>
				<text class="col-g" @click="goToKnowledgeDetail('4')">《隐私协议》</text>
				</view>
			</label>
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		name:"agree",
		data() {
			return {
				showTip:true,
				isAgree:false
			};
		},
		props:['showTip'],
		methods: {
			handleChange(e) {
				let _this = this;
				_this.value = e.detail.value;
				console.log(_this.value);
				if(_this.value.length == 0){
			        uni.showToast({ title: '请勾选用户协议和隐私协议!', icon: "none" });
					_this.isAgree = false;
					_this.$emit('isAgree', false);
				}else{
					_this.isAgree = true;
					_this.$emit('isAgree', true);
				}
			},
			goToKnowledgeDetail(key){
				uni.navigateTo({
					url: '/pages/knowledgedetail/knowledgedetail?key='+ key
				});
			},
		}
	}
</script>

<style lang="scss">
.agree_box{
	line-height:40rpx;
	font-size: 26rpx;
	color:#ffa800;
	padding: 13.3333rpx 6.6667rpx 0;
}
.agree_check{
	margin: 20rpx 0;
	display: flex;
	color:#ffa800;
	font-size: 17.3333rpx;
	line-height:50rpx;
}
.agree_check{
	margin: 20rpx 0 30rpx;
	display: flex;
	align-items: center;
	color:#969696;
	font-size: 17.3333rpx;
	line-height:50rpx;
	.agree{
		width:40rpx;
		height:40rpx;
		margin-right:15rpx;
	}
	.unchecked{
		background: url(../../static/unchecked.png) no-repeat;
		background-size: cover;
	}
	.checked{
		background: url(../../static/checked.png) no-repeat;
		background-size: cover;
	}
}
</style>