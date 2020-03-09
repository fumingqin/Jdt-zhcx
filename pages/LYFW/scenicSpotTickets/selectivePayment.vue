<template>
	<view>
		<!-- 顶部背景 -->
		<view class="ob_background">
			<image src="../../../static/LYFW/scenicSpotTickets/addOrder/orderBackground.png" mode="aspectFit"></image>
		</view>


		<view class="cover-container">
			<view class="MP_information1">
				<view class="MP_title">南平武夷山三日游路线</view>
				<text class="MP_text" @click="open2(1)">一码通 | 可订明日票 | 儿童半票 &nbsp; > </text>

				<view class="MP_selectionDate">
					<text>使用日期</text>
					<text class="MP_textDate" @click="open">2020-03-07&nbsp;> </text>
					<text class="MP_textReminder">今天</text>
				</view>
			</view>

			<view class="MP_information2">
				<view class="MP_optionBar" >
					<text class="Mp-icon jdticon icon-weixinzhifu"></text>
					<text class="Mp_title">微信</text>
					<radio class="Mp_box" :checked="channeIndex===0" @click="Selection"></radio>
				</view>
			</view>
			
			<view class="MP_information2">
				<view class="MP_optionBar" >
					<text class="Mp-icon jdticon icon-alipay"></text>
					<text class="Mp_title">支付宝</text>
					<radio class="Mp_box" :checked="channeIndex===1" @click="Selection"></radio>
				</view>
			</view>
		</view>
		
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				channel : [{
						name:'微信'
					},{
						name:'支付宝'
					}],
				channeIndex : 0, //选择支付方式
			}
		},
		onLoad: function(options) {
			console.log(JSON.parse(decodeURIComponent(options.ticket)))
			console.log(JSON.parse(decodeURIComponent(options.addressData)))
			console.log(JSON.parse(options.actualPayment))
			console.log(JSON.parse(options.dateReminder))
			console.log(JSON.parse(options.date))
			console.log(JSON.parse(decodeURIComponent(options.coupon)))
		},

		methods: {
			//同意购买-点击事件
			Selection: function() {
				if (this.channeIndex == 0) {
					this.channeIndex = 1;
				} else {
					this.channeIndex = 0;
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		padding-bottom: 100upx;
	}

	//背景图样式
	.ob_background {
		position: absolute;
		width: 100%;
		height: 320upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	//整体容器样式
	.cover-container {
		padding: 64upx 30upx;
		position: relative;
		padding-bottom: 32upx;
	}
	
	//公共样式 - 适用多个数据框
	.MP_information1 {
		border-radius: 16upx;
		background: #FFFFFF;
		padding: 24upx 32upx;
		font-size: 32upx;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 24upx;
		.MP_title {
			font-size: 34upx;
			display: flex;
			font-weight: bold;
			margin-top: 20upx;
		}
		.MP_text {
			color: #3EABFC;
			font-size: 28upx;
			margin-top: 20upx;
			display: block; // 让字体换行
		}
	}
	
	//公共样式2 - 适用单选框
	.MP_information2 {
		border-radius: 16upx;
		background: #FFFFFF;
		padding: 36upx 32upx;
		font-size: 32upx;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 24upx;
		.kj{
			font-size: 34upx;
			display: flex;
			font-weight: bold;
			margin-top: 8upx;
		}
		.MP_text {
			font-size: 26upx;
			margin-top: 20upx;
			display: block; // 让字体换行
		}
		//选项框样式
		.MP_optionBar {
			.Mp_title {
				font-size: 32upx;
				margin-left: 20upx;
			}
		
			.Mp_text {
				margin-top: 6upx;
				float: right;
				font-size: 28upx;
				color: #f85e52;
			}
		
			.Mp_textBlue {
				margin-left: 16upx;
				font-size: 26upx;
				color: #3EABFC;
			}
			.Mp_box {
				float: right;
				position: relative;
				bottom: 6upx;
				right: -12upx;
			}
			
			.Mp_icon{
				width: 100upx;
				font-size: 52upx;
			}
			.icon-weixinzhifu {
				color: #36cb59;
			}
			.icon-alipay {
				color: #01aaef;
			}
		}
	}

	//使用日期
	.MP_selectionDate {
		width: 100%;
		line-height: 120upx;
		margin-top: 46upx;
		border-top: 1px #F5F5F5 dashed;
	
		.MP_textDate{
			float: right;
		}
	
		.MP_textReminder{
			font-size: 26upx;
			color: #aaa;
			float: right;
			margin-right: 24upx;
		}
	}
	
	
</style>
