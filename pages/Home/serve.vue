<template>
	<view class="se_view">
		<view class="sv_view">
			<image class="sv_image" :src="imageIndex[0].imageUrl"></image>
		</view>

		<view class="sv_view2">
			<view class="sv_title">出行</view>
			<view style="display: flex; flex-wrap: wrap;">
				<view class="sv_view3" @click="natTo('/pages_CTKY/pages/CTKY/TraditionSpecial/Home/ctkyIndex')">
					<image class="sv_print" src="../../static/Home/serve/cpdinggou.png" mode="aspectFit"></image>
					<text class="sv_text">车票订购</text>
				</view>

				<view class="sv_view3" @click="natTo2('/pages/Home/ChooseSite?current=2')">
					<image class="sv_print" src="../../static/Home/serve/wlyueche.png" mode="aspectFit"></image>
					<text class="sv_text">网络约车</text>
				</view>

				<view class="sv_view3" @click="natTo('/pages_GJCX/pages/GJCX/busH5')">
					<image class="sv_print" src="../../static/Home/serve/gjchaxun.png" mode="aspectFit"></image>
					<text class="sv_text">公交查询</text>
				</view>

				<view class="sv_view3" @click="natTo('/pages_BCFW/pages/BCFW/bf_chartered')">
					<image class="sv_print" src="../../static/Home/serve/bcfuwu.png" mode="aspectFit"></image>
					<text class="sv_text">包车服务</text>
				</view>
				<view class="sv_view3" @click="natTo('/pages_CTKY/pages/CTKY/SpecialBus/Home/specialBusHome')">
					<image class="sv_print" src="../../static/Home/serve/dzbashi.png" mode="aspectFit"></image>
					<text class="sv_text">定制巴士</text>
				</view>
				</view>
		</view>

		<view class="sv_view2">
			<view class="sv_title">旅游</view>
			<view style="display: flex; flex-wrap: wrap;">
			<view class="sv_view3" @click="natTo('/pages_LYFW/pages/LYFW/independentTravel/it_list')">
				<image class="sv_print" src="../../static/Home/serve/ziyouxing.png" mode="aspectFit"></image>
				<text class="sv_text">自由行</text>
			</view>
			<view class="sv_view3" @click="natTo('/pages_LYFW/pages/LYFW/groupTour/groupTourList')">
				<image class="sv_print" src="../../static/Home/serve/gentuanyou.png" mode="aspectFit"></image>
				<text class="sv_text">跟团游</text>
			</view>
			<view class="sv_view3" @click="natTo3('/pages_LYFW/pages/LYFW/scenicSpotTickets/ticketsList')">
				<image class="sv_print" src="../../static/Home/serve/jqgoupiao.png" mode="aspectFit"></image>
				<text class="sv_text">景区购票</text>
			</view>
			<view class="sv_view3" @click="natTo3('/pages_LYFW/pages/LYFW/tourismProducts/tp_ticketsList')" >
				<image class="sv_print" src="../../static/Home/lvyouchanping.png" mode="aspectFit"></image>
				<text class="sv_text">旅游产品</text>
			</view>
			</view>
		</view>
		<!-- <view class="sv_view2">
			<view class="sv_title">防控</view>
			<view style="display: flex; flex-wrap: wrap;">
			<view class="sv_view3">
				<image class="sv_print" src="../../static/Home/serve/cxshenqing.png" mode="aspectFit"></image>
				<text class="sv_text">出行申请</text>
			</view>
			<view class="sv_view3">
				<image class="sv_print" src="../../static/Home/serve/qyrenzheng.png" mode="aspectFit"></image>
				<text class="sv_text">企业认证</text>
			</view>
			<view class="sv_view3">
				<image class="sv_print" src="../../static/Home/serve/zfchaxun.png" mode="aspectFit"></image>
				<text class="sv_text">政府查询</text>
			</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				imageIndex : '',//首页图片
			}
		},
		onLoad:function(){
			uni.request({
				url:$lyfw.Interface.qg_GetImage.value,
				method:$lyfw.Interface.qg_GetImage.method,
				data:{ 
					model : 6,
					type:'服务banner'
				},
				success:(res) => { 
					console.log(res)
					this.imageIndex = res.data.data
					
				},
			})
		},
		methods: {
			natTo: function(url) {
				if(url == '/pages_GJCX/pages/GJCX/busH5'){
					// #ifdef MP-WEIXIN
					uni.showToast({
						title:'公交查询仅支持公众号和APP',
						icon:'none'
					})
					// #endif
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: url
					});
					// #endif
				}else{
					uni.navigateTo({
						url: url
					});
				}
				
			},
			natTo2: function(url) {
				// #ifdef H5
				uni.showToast({
					title:'网络约车仅支持小程序或APP!',
					icon:'none'
				})
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url
				})
				// #endif
				
			},
			natTo3: function(url) {
				uni.navigateTo({
					url
				})
			},
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

		.sv_view {
			width: 698upx;
			height: 320upx;
			border-radius: 20upx;
			display: flex;
			margin-left: 26upx;
			margin-top: 43upx;

			.sv_image {
				width: 100%;
				height: 100%;
			}

		}

		.sv_title {
			font-size: 36upx;
			font-weight: bold;
			padding-top: 41upx;
			padding-left: 44upx;
		}

		.sv_view2 {
			width: 698upx;
			background: #FFFFFF;
			margin-left: 26upx;
			margin-top: 43upx;
			padding-bottom: 56upx;
			border-radius: 20upx;

			.sv_view3 {
				width: 20%;
				text-align: center;
				margin-top: 45upx;

				.sv_print {
					width: 56upx;
					height: 56upx;
				}

				.sv_text {
					font-size: 24upx;
					font-weight: 400;
					padding-top: 24upx;
					display: block;
				}
			}
		}
	}
</style>
