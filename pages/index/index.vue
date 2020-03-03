<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view>
			<button class="buttonClass" @click="godetail('/pages/CZC/Index')">出租车地图</button>
			<button class="buttonClass" @click="godetail('/pages/LYFW/scenicSpotTickets/ticketsList')">景区门票</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				test : '',
			}
		},
		onLoad() {
			this.testData();
		},
		methods: {
			//调用模拟接口数据的方式
			async testData() {
				let userInfo = await this.$api.lyfwcwd('userInfo');
				this.test = userInfo;
				console.log(this.test.data.autograph);
				} ,
			
			//路由统一事件
			godetail : function(url){
				uni.navigateTo({
					url
				})
			}
				
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.buttonClass{
		margin: 32upx 0;
		width: 272upx;
	}
</style>
