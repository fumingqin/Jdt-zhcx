<template>
	<view>
		<!-- 顶部背景 -->
		<view class="ob_background">
			<image src="../../../static/LYFW/scenicSpotTickets/addOrder/orderBackground.png" mode="aspectFit"></image>
		
		<!-- 顶部信息
		命名：Dx -->
		<view class="Dx_View">
			<text class="Dx_title">预订成功</text>
			<text class="Dx_text">查看进度&nbsp;></text>
			<text class="Dx_priceIcon">¥</text>
			<text class="Dx_price">320</text>
			<image class="Dx_image" src="../../../static/LYFW/scenicSpotTickets/orderDetails/gantan.png"></image>
			<text class="Dx_remarks">预订成功，祝您旅途愉快！</text>
		</view>
		</view>
		
		<!-- 信息详情 -->
		<!-- 命名：Xx -->
		<view class="Xx_view">
			<view class="Xx_titleView">
				<text class="Xx_title">南平武夷山三日游</text>
				<text class="Xx_titleIcon"> > </text>
			</view>
			<view class="Xx_contentView"> 
				<text class="Xx_contentTitle" >使用日期</text>
				<text class="Xx_contentTitle2">2019-11-05 星期二</text>
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >入园时间</text>
					<text class="Xx_contentTitle2">09:00 - 18:00</text>
				</view>
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >使用方法</text>
					<text class="Xx_contentTitle2">凭身份证或订单二维码扫码入园</text>
				</view>
			
				<!-- 二维码 -->
				<view class="Xx_QRcodeView">
					<text class="Xx_QRcodeTitle">﹊&nbsp;&nbsp;&nbsp;武夷山成人票&nbsp;&nbsp;&nbsp;﹊</text>
					<view class="Xx_QRcodeBlock1">
						<text class="Xx_QRcodeContentTitle">入园辅助码</text>
					</view>
					<view class="Xx_QRcodeBlock2">
						<text class="Xx_QRcodeContent">T8718283713</text>
					</view>
					<view class="Xx_QRcodeBlock2">
						<image class="Xx_QRcodeImage" src="../../../static/LYFW/scenicSpotTickets/orderDetails/erweima.png" mode="aspectFill"></image>
					</view>
					<view class="Xx_QRcodeBlock2">
						<text class="Xx_QRcodeTips">出示二维码，检票入园</text>
					</view>
				</view>
				
				<!-- 出行人+退改+保险 -->
				<text class="Xx_contentTitle" >出行人</text>
				<text class="Xx_contentTitle2">李*亚</text>
				<view></view>
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >身份证</text>
					<text class="Xx_contentTitle2">3505**********889</text>
				</view>
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >手机号</text>
					<text class="Xx_contentTitle2">+86177******12</text>
				</view>
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >退改规则</text>
					<text class="Xx_contentTitle2">当前时间申请退款，退款损失...</text>
					<text class="Xx_contentTitle2">＞</text>
				</view>
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >附加保险</text>
					<text class="Xx_contentTitle2">太平洋门票意外险 经济款×1份</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>	 

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		padding-bottom: 40upx;
	}
	
	//背景图样式
	.ob_background {
		width: 100%;
		height: 320upx;
		image {
			width: 100%;
			height: 100%;
		}
		.Dx_View{
			position: absolute;
			width: 100%;
			top: 180upx;
			color: #FFFFFF;
			right: 0;
			.Dx_title{
				margin-left: 32upx;
				font-size: 48upx;
				font-weight: 300;
			}
			.Dx_text{
				margin-left: 32upx;
				font-size: 30upx;
			}
			.Dx_image{
				position: relative;
				width: 28upx;
				height: 28upx;
				left: 168upx;			
			}
			.Dx_price{
				position: relative;
				font-size: 52upx;
				margin-right: 8upx;
				text-align: right;
				left: 168upx;
				// right: 72upx;
				// bottom: 0upx;
			}
			.Dx_priceIcon{
				position: relative;
				margin-right: 0upx;
				left: 168upx;
				// right: 168upx;
				// bottom: 0upx;
			}
			.Dx_remarks{
				display: block;
				margin: 20upx 32upx;
				font-size: 28upx;
			}
		}
	}
	
	//信息详情
	.Xx_view{
		position: relative;
		margin: 0upx 32upx;
		margin-top: 32upx;
		border-radius: 16upx;
		background: #FFFFFF;
		.Xx_titleView{
			padding: 32upx;
			// border-top: 1px #F5F5F5 dashed;
			border-bottom: 1px #F5F5F5 dashed;
			.Xx_title{
				font-size: 34upx;
				font-weight: bold;
			}
			.Xx_titleIcon{
				position: absolute;
				right: 32upx;
			}
		}
		.Xx_contentView{
			margin-top: 2upx;
			padding: 32upx;
			font-size: 30upx;
			.Xx_contentTitle{
				color: #888;
			}
			.Xx_contentTitle2{
				margin-left: 24upx;
				color: #333;
			}
			.Xx_contentBlock{
				margin-top: 20upx;
			}
		}
		
		.Xx_QRcodeView{
			margin: 56upx 0;
			text-align: center;
			.Xx_QRcodeBlock1{
				margin-top: 40upx;
			}
			.Xx_QRcodeBlock2{
				margin-top: 12upx;
			}
			.Xx_QRcodeTitle{
				color: #888;
				font-weight: 300;
			}
			.Xx_QRcodeContentTitle{
				color: #888;
				font-size: 28upx;
			}
			.Xx_QRcodeContent{
				color: #333;
				font-size: 34upx;
				font-weight: bold;
			}
			.Xx_QRcodeImage{
				width: 320upx;
				height: 320upx;
			}
			.Xx_QRcodeTips{
				color: #0BA7E8;
				font-size: 28upx;
			}
		}
		
		
	}
	
	
</style>
