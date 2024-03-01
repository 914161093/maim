<template>
	<view class="container">
		<view class="detail">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData:'',
				content:'<div class=\"detail_text\">\r\n  <h3>服务协议</h3>\r\n<p>尊敬的用户，您同意“XXXX公司 “收集、保存、使用、存储、分享、披露及保护您的个人信息，为您提供相关咨询服务。如果您不同意授权，请勿进行下一步操作。</p><br>\r\n一、我们收集和使用您的个人信息类型和目的<br><br>\r\n1.为给您提供完整的服务，需要您向我们提供一些信息，我们收集您的个人信息的最终目的是为了向您提供更好的咨询服务，优化并丰富你的用户体验，这些个人信息系能够单独或者与其他信息结合识别的您的个人身份的信息，包括但不限于：<br><br>\r\n1)姓名<br>\r\n2)手机号码<br>\r\n3)所在城市<br>\r\n4)您在服务提供方所建页面输入或上传的其他个人信息。<br><br>\r\n2.以上个人信息均是您自愿提供，如果您拒绝同意提供，将无法使用该产品功能。<br><br><br>\r\n二、我们如何使用及共享您的个人信息<br><br>\r\n1.您同意我们通过如下方式使用及对外共享您个人信息的情况（包含对于个人信息的存储与处理）<br>\r\n1)咨询服务提供方为满足您的需求，可能会通过您提供的信息与您联系；<br>\r\n2)您授权范围内的服务提供方可能定期或不定期向您发送有关产品、服务或相关活动的信息，您同意接收上述信息。当我们超出与本声明所声称的目的具有直接或合理关联的范围后使用您的个人信息的，我们会再次向您告知并征得您的同意。您同意除上述个人信息的接收和/或使用方在按照本声明所述情形下进行信息披露和使用而导致的或可能导致的所有索赔、责任和损失。<br>\r\n三、我们的声明<br><br>\r\n我们将严格保护您的个人信息安全。我们将采用适当制度、安全技术和程序等措施来保护您的个人信息不被未经授权的访问、使用或泄漏。我们亦将促使本声明所述各接收和使用方尽力保护和不予泄露您的个人信息。 <br>\r\n\r\n我们将要求并敦促个人信息接收方遵循本声明和法律法规的规定，谨慎使用其接收到的个人信息，如其发生超越本声明范围使用您的个人信息，进而侵害您合法权益的情形，我们将协助您追究该接收方的法律责任。<br>\r\n</div>'
			};
		},
		onLoad(option) {
			
		},
		methods: {
			shareFn(title){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: title,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.container{
	padding: 26.6667rpx 45.3333rpx;
	.top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.sources{
			display: flex;
			justify-content: space-between;
			.img{
				width: 76.6667rpx;
				height: 76.6667rpx;
				border-radius: 50%;
			}
			.name{
				margin-left: 16.6667rpx;
				.title{
					font-size: 26.6667rpx;
					color:#272727;
					margin-bottom: 10rpx;
				}
				.time{
					font-size: 20rpx;
					color:#b1b1b1;
				}
			}
		}
		.follow{
			padding:0 35rpx;
			height: 40rpx;
			line-height:40rpx;
			text-align: center;
			background: #ffa800;
			color:#fff;
			font-size: 26rpx;
			border-radius:30rpx;
		}
	}
	.detail{
		margin-top: 36.6667rpx;
		border-radius: 18rpx;
		background:#fff;
		padding: 40rpx;
		box-shadow: 8px 10px 12px #ddd;
		.title{
			font-size:40rpx;
			font-weight:600;
			margin-bottom: 40rpx;
		}
		.text{
			font-size:30rpx;
			img{
				max-width:100%;
			}
		}
		p{
			margin:20rpx 0;
		}
		h4{
			margin:20rpx 0;
		}
	}
}	
</style>
