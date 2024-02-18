<template>
	<view class="welcome">
		<image src="../../static/welcome.png" class="welcome_img" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			uni.hideTabBar();
			setTimeout(function(){
				uni.switchTab({
					url: '/pages/index/index'
				});
			},3000)
		}
	}
</script>

<style lang="scss">
	.welcome{
		width:100%;
		height:100%;
		.welcome_img{
			width:100%;
		}
	}
</style>
