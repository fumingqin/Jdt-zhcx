<template>
	<view style="text-align: center;">
		<image class="wl_img" src="../../static/GRZY/zhu.png"></image>
		<view class="wl_balance">账户余额</view>
		<view class="wl_money">0.00元</view>
		<view class="wl_btn">
			<view class="wl_text" @click="topUp()">充值</view>
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
			topUp(){
				uni.navigateTo({
					url:'./topUp'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f9fc;
	}
.wl_img{
	width: 193upx;
	height: 175upx;
	margin-top: 167upx;
}
.wl_balance{
	margin-top: 69upx;
	font-size: 36upx;
	font-weight: 500;
	}
.wl_money{
	margin-top: 43upx;
	font-size: 32upx;
	font-weight: 500;
}
.wl_btn{
	width: 654upx;
	height: 106upx;
	margin-top: 138upx;
	border-radius: 69upx;
	background: #65C36D;
	color: #FFFFFF;
	margin-left: 47upx;
	.wl_text{
		padding-top: 30upx;
		
	}
}
</style>
