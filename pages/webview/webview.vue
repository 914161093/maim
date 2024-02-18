
<template>
	<view class="container">
		<web-view :src="url"></web-view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(item) {
		    this.url = decodeURIComponent(item.url)
		    // 传入需要跳转的链接 使用web-view标签进行跳转
		  },
		methods: {
			
		}
	}
</script>
 
<style>
 .container{
	 width: 100%;
	 height: 100vh;
 }
</style>