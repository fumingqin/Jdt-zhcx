<template>
	<view>
		<!-- 顶部图片 -->
		<view>
			<image class="ed_image" src="../../static/GRZY/zixingche.png"></image>
		</view>
		
		<view class="ed_view">
			<view>
				<text class="vi_text">达达通助力车</text>
				<view class="te_view">
					<text class="te_text">{{expenseDetail.date}}</text>
					<text class="te_text2">{{expenseDetail.time}}</text>
				</view>
			</view>
		</view>
		
		<view class="ed_view2">
			<view>
				<text class="vi_text">骑行费用</text>
			</view>
			<view>
				<text class="te_text3">起步价(15分钟)</text>
				<text class="te_text4">{{expenseDetail.startCost}}元</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				expenseDetail: '', //行车记录
			}
		},
		onLoad() {
			this.lunBoInit();
		},
		methods: {
			//------------------------模拟数据----------------------------------------------
			
			async lunBoInit() {
				let expenseDetail = await this.$api.lyfwcwd('expenseDetail');
				this.expenseDetail = expenseDetail.data;
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f5f9fc;
	}
	
	.ed_image{
		width: 318upx;
		height: 164upx;
		padding-top: 72upx;
		padding-left: 216upx;
	}
	
	//详情
	.ed_view{
		position: relative;
		background: #FFFFFF;
		width: 642upx;
		height: 100%;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 60upx;
		padding: 39upx 26upx;
		border-radius: 10px;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		
		.vi_text{
			font-size: 34upx;
			font-weight: bold;
		}
		
		.te_view{
			display: flex;
			padding-top: 28upx;
			
			.te_text{
				font-size: 32upx;
				color: #666666;
			}
			
			.te_text2{
				font-size: 32upx;
				color: #666666;
				padding-left: 10upx;
			}
		}
	}
	
	//骑行费用
	.ed_view2{
		position: relative;
		background: #FFFFFF;
		width: 642upx;
		height: 100%;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 20upx;
		padding: 39upx 26upx;
		border-radius: 10px;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		
		.vi_text{
			font-size: 34upx;
			font-weight: bold;
		}
		
		.te_text3{
			padding-left: 29upx;
			padding-top: 20upx;
			font-size: 32upx;
			color: #666666;
			left: 0;
		}
		
		.te_text4{
			padding-right: 29upx;
			padding-top: 20upx;
			font-size: 32upx;
			color: #666666;
			right: 0;
		}
	}
</style>
