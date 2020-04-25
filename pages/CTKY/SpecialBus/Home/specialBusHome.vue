<template>
	<view class="content">
		<!-- 头部背景图 -->
		<view>
			<image class="banner" src="../../../../static/CTKY/specialBus.png" lazy-load mode="aspectFit"></image>
		</view>
		<!-- 内容 -->
		<view class="center">
			
			<!-- 标题 -->
			<view class="title">专线名称</view>
			<!-- 专线名称 -->
			<view class="textContent" @tap="lineTap">厦门国际机场</view>
			
			<!-- 标题 -->
			<view class="title">时间</view>
			<!-- 时间 -->
			<view class="textContent" @tap="timeTap">3月20日    周五    14:30</view>
			
			<!-- 下一步按钮 -->
			<view class="nextView">
				<button class="nextButton" @tap="nextTap">下一步</button>
			</view>
			<!-- 底部步骤提示 -->
			<view>
				<image class="tip" src="../../../../static/CTKY/specialBusTip.png" lazy-load mode="aspectFit"></image>
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
			//------------------------------线路点击------------------------------
			lineTap() {
				console.log('点击了线路');
			},
			//------------------------------时间点击------------------------------
			timeTap() {
				console.log('点击了时间');
			},
			//------------------------------下一步点击------------------------------
			nextTap() {
				console.log('点击了下一步');
			}
			
		}
	}
</script>

<style>
	page,.content{
		flex-direction: column;
		background-color: #F4F9FC;
		width: 100%;
		height: 100%;
	}
	.banner {
		width: 100%;
		height: 480rpx;
	}
	.center {
		background-color: #FFFFFF;
		padding: 10rpx 40rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		position: relative;
		top: -90rpx;
	}
	
	.title {
		color: #999999;
		font-size: 32rpx;
		font-weight: 300;
		margin-top: 30rpx;
	}
	.textContent {
		color: #2C2D2D;
		font-size: 36rpx;
		margin-top: 30rpx;
		border-bottom: 0.5rpx solid #EAEAEA;
		padding-bottom: 20rpx;
	}
	.next {
		text-align: center;
		justify-content: center;
		background-color: #FC4646;
		border-radius: 12rpx;
		color: #FFFFFF;
		font-size: 34rpx;
		height: 94rpx;
	}
	.nextView {
		margin-top: 43upx;
	}
	.nextButton {
		width: 100%;
		height: 96upx;
		background: #FC4646;
		color: #FFFFFF;
		font-size: 38upx;
		border-radius: 10upx;
	}
	.tip {
		height: 60rpx;
		margin-top: 40rpx;
		margin-bottom: 60rpx;
	}
</style>
