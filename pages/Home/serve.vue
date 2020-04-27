<template>
	<view class="se_view">
		<view class="sv_view">
			<image class="sv_image" src="../../static/Home/serve/guanggao.png"></image>
		</view>
		<view class="sv_view2">
			<text class="sv_title">出行</text>
			<image class="sv_fare" src="../../static/Home/serve/cpdinggou.png"></image>
			<text class="sv_fareText">车票订购</text>
			<image class="sv_taxi" src="../../static/Home/serve/wlyueche.png"></image>
			<text class="sv_taxiText">网络约车</text>
			<image class="sv_bus" src="../../static/Home/serve/gjchaxun.png"></image>
			<text class="sv_busText">公交查询</text>
			<image class="sv_charteredBus" src="../../static/Home/serve/bcfuwu.png"></image>
			<text class="sv_charteredBusText">包车服务</text>
			<image class="sv_customMade" src="../../static/Home/serve/dzbashi.png"></image>
			<text class="sv_customMadeText">定制巴士</text>
		</view>
		<view class="sv_view3">
			<text class="sv_title">旅游</text>
			<image class="sv_independentTravel" src="../../static/Home/serve/ziyouxing.png"></image>
			<text class="sv_independentTravelText">自由行</text>
			<image class="sv_packageTour" src="../../static/Home/serve/gentuanyou.png"></image>
			<text class="sv_packageTourText">跟团游</text>
			<image class="sv_ticket" src="../../static/Home/serve/jqgoupiao.png"></image>
			<text class="sv_ticketText">景区购票</text>
			<image class="sv_goods" src="../../static/Home/serve/jqshangpun.png"></image>
			<text class="sv_goodsText">景区商品</text>
		</view>
		<view class="sv_view4">
			<text class="sv_title">防控</text>
			<image class="sv_applyFor" src="../../static/Home/serve/cxshenqing.png"></image>
			<text class="sv_applyForText">出行申请</text>
			<image class="sv_frim" src="../../static/Home/serve/qyrenzheng.png"></image>
			<text class="sv_frimText">企业认证</text>
			<image class="sv_query" src="../../static/Home/serve/zfchaxun.png"></image>
			<text class="sv_queryText">政府查询</text>
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
		background-color: #f6f6f6;
	}

	.se_view {
		width: 100%;
		height: 100%;
		
		.sv_view{
			width: 698upx;
			height: 220upx;
			border-radius:20upx;
			position: absolute;
			left: 26upx;
			top: 43upx;
			.sv_image{
				width: 698upx;
				height: 220upx;
			}
			
		}
		.sv_title{
			font-size:36upx;
			font-weight:bold;
			position: absolute;
			left: 44upx;
			top: 41upx;
		}
		.sv_view2{
			width: 698upx;
			height: 265upx;
			background: #FFFFFF;
			border-radius:20upx;
			position: absolute;
			left: 26upx;
			top: 284upx;
			
			.sv_fare{
				width: 60upx;
				height: 60upx;
				position: absolute;
				left: 43upx;
				top: 109upx;
			}
			.sv_fareText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 26upx;
				top: 186upx;
			}
			.sv_taxi{
				width: 60upx;
				height: 60upx;
				position: absolute;
				left: 178upx;
				top: 109upx;
			}
			.sv_taxiText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 161upx;
				top: 186upx;
			}
			.sv_bus{
				width: 60upx;
				height: 60upx;
				position: absolute;
				left: 314upx;
				top: 109upx;
			}
			.sv_busText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 297upx;
				top: 186upx;
			}
			.sv_charteredBus{
				width: 60upx;
				height: 60upx;
				position: absolute;
				left: 452upx;
				top: 109upx;
			}
			.sv_charteredBusText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 435upx;
				top: 186upx;
			}
			.sv_customMade{
				width: 50upx;
				height: 50upx;
				position: absolute;
				left: 596upx;
				top: 109upx;
			}
			.sv_customMadeText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 575upx;
				top: 186upx;
			}
			
		}
		.sv_view3{
			width: 698upx;
			height: 265upx;
			background: #FFFFFF;
			border-radius:20upx;
			position: absolute;
			left: 26upx;
			top: 569upx;
			.sv_travel{
				font-size:36upx;
				font-weight:bold;
				position: absolute;
				left: 44upx;
				top: 41upx;
			}
			.sv_independentTravel{
				width: 47upx;
				height: 47upx;
				position: absolute;
				left: 54upx;
				top: 116upx;
			}
			.sv_independentTravelText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 43upx;
				top: 190upx;
			}
			.sv_packageTour{
				width: 57upx;
				height:50upx;
				position: absolute;
				left: 170upx;
				top: 113upx;
			}
			.sv_packageTourText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 163upx;
				top: 190upx;
			}
			.sv_ticket{
				width: 52upx;
				height: 41upx;
				position: absolute;
				left: 309upx;
				top: 118upx;
			}
			.sv_ticketText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 287upx;
				top: 190upx;
			}
			.sv_goods{
				width: 45upx;
				height: 47upx;
				position: absolute;
				left: 459upx;
				top: 117upx;
			}
			.sv_goodsText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 435upx;
				top: 190upx;
			}
			
		}
		.sv_view4{
			width: 698upx;
			height: 265upx;
			background: #FFFFFF;
			border-radius:20upx;
			position: absolute;
			left: 26upx;
			top: 854upx;
			.sv_applyFor{
				width: 39upx;
				height: 45upx;
				position: absolute;
				left: 56upx;
				top: 117upx;
			}
			.sv_applyForText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 29upx;
				top: 189upx;
			}
			.sv_frim{
				width: 51upx;
				height: 51upx;
				position: absolute;
				left: 181upx;
				top: 115upx;
			}
			.sv_frimText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 160upx;
				top: 189upx;
			}
			.sv_query{
				width: 46upx;
				height: 46upx;
				position: absolute;
				left: 325upx;
				top: 117upx;
			}
			.sv_queryText{
				font-size:24upx;
				font-weight:400;
				position: absolute;
				left: 301upx;
				top: 189upx;
			}
		}
	}
</style>
