<template>
	<view class="contentView">
		<view class="top u-f-jsb" style="background-color: #FC4646; width: 100%; height: 180rpx;">
			<view style="color: #FFFFFF; font-size: 35rpx; margin-left: 20rpx;">已完成</view>
			<view style="color: #FFFFFF; font-size: 30rpx; margin-right: 20rpx;">￥49.5</view>
		</view>
		<!-- 头部视图 -->
		<view class="head">
			<!-- 起始站/价格 -->
			<view class="u-f-jsb">
				<view>泉州客运中心 — 安溪  x2</view>
			</view>
			<!-- 发车时间 -->
			<view> 发车时间：2020-03-08  20:00</view>
		</view>
		<!-- 乘客信息 -->
		<scroll-view class="scrollBox" scroll-y="true">
			<block v-for="(item,index) in passageInfo" :key="index">
				<view class="infoCotent" style="text-align: center;">
					<view class="passageInfo u-f-ac">
						<!-- 标题 -->
						<view class="title">
							<!-- 出行人 -->
							<view>出行人</view>
							<!-- 身份证 -->
							<view>身份证</view>
							<!-- 联系电话 -->
							<view>联系电话</view>
							<!-- 退改规则 -->
							<view>退改规则</view>
							<!-- 附加保险 -->
							<view>附加保险</view>
						</view>
						<view class="detailInfo">
							<!-- 出行人 -->
							<view>{{item.name}}</view>
							<!-- 身份证 -->
							<view>{{item.IDCard}}</view>
							<!-- 联系电话 -->
							<view>{{item.phoneNum}}</view>
							<!-- 退改规则 -->
							<view>{{item.role}}</view>
							<!-- 附加保险 -->
							<view>{{item.insurance}}</view>
						</view>
					</view>
					<!-- 二维码 -->
					<view class="QRImage">
						<image style="width: 300rpx; height: 300rpx;" src="../../static/LYFW/scenicSpotTickets/orderDetails/erweima.png" lazy-load mode="aspectFill"></image>
					</view>
					<view style="color: #2C2D2D;font-size: 32rpx;font-weight: 300; padding-bottom: 10rpx;">
						  取票号 16565446
					</view>
					<view style="color: #999999;font-size: 28rpx;font-weight: 300; padding-bottom: 50rpx;">
						出示二维码，检票上车
					</view>
					
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				passageInfo:[
					{
						name:'张小娴  (成人票)',
						IDCard:'129097475652621',
						phoneNum:'1234567890',
						role:'当前时间申请退款  损失为32.5元',
						insurance:'中国人寿意外保险  经济款 x1'
					},
					{
						name:'张小娴  (成人票)',
						IDCard:'129097475652621',
						phoneNum:'1234567890',
						role:'当前时间申请退款  损失为32.5元',
						insurance:'中国人寿意外保险  经济款 x1'
					},
					{
						name:'张小娴  (成人票)',
						IDCard:'129097475652621',
						phoneNum:'1234567890',
						role:'当前时间申请退款  损失为32.5元',
						insurance:'中国人寿意外保险  经济款 x1'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	/* flex布局 */
	.u-f,.u-f-ac,.u-f-jsb,.u-f-ajc {
		display: flex;
	}

	.u-f-ac,.u-f-jsb,.u-f-ajc {
		align-items: center;
	}

	.u-f-ajc {
		justify-content: center;
	}

	.u-f-jsb {
		justify-content: space-between;
	}

	.paddingTLR {
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	
	/* 内容 */
	page,.contentView {
		background: #F5F9FC;
		display: block;
	}
	/* 头部视图 */
	.head {
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx;
		margin-top: -60rpx;
	}
	/* 起始站/价格 */
	.head>view:first-child {
		padding: 20rpx;
		font-size: 30rpx;
		color: #2C2D2D;
		font-weight: 500;
	}
	/* 发车时间 */
	.head>view:last-child {
		padding: 10rpx 20rpx;
		font-size: 25rpx;
		color: #666666;
		font-weight: 300;
	}
	/* 滚动区域 */
	.scrollBox {
		height: 100%;
	}
	.infoCotent {
		border-radius: 20rpx;
		background: #FFFFFF;
		margin: 0 20rpx;
		margin-bottom: 20rpx;
	}
	/* 乘客信息 */
	.passageInfo {
	}
	/* 标题 */
	.title {
		text-align: left;
		color: #666666;
		display: block;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		font-size: 30rpx;
		font-weight: 300;
	}
	.title view {
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}
	.detailInfo {
		text-align: left;
		color: #2C2D2D;
		display: block;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		font-size: 30rpx;
		font-weight: 500;
	}
	.detailInfo view {
		margin-bottom: 20rpx;
		margin-left: 60rpx;
	}
	.QRImage {
		display: flex;
		width: 100%;
		justify-content: center;
		margin-bottom: 20rpx;
	}
</style>
