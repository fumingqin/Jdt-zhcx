<template>
	<view class="contentView">
		<view class="top u-f-jsb" style="background-color: #FC4646; width: 100%; height: 180rpx;">
			<view style="color: #FFFFFF; font-size: 35rpx; margin-left: 20rpx;">{{orderInfo.orderState}}</view>
			<view style="color: #FFFFFF; font-size: 30rpx; margin-right: 20rpx;">￥{{orderInfo.price}}</view>
		</view>
		<!-- 头部视图 -->
		<view class="head">
			<!-- 起始站/价格 -->
			<view class="u-f-jsb">
				<view>{{orderInfo.startStation}} — {{orderInfo.endStation}}  x{{passageInfo.length}}</view>
			</view>
			<!-- 发车时间 -->
			<view> 发车时间：{{orderInfo.setTime}}</view>
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
							<view>{{item.userName}}</view>
							<!-- 身份证 -->
							<view>{{item.userCodeNum}}</view>
							<!-- 联系电话 -->
							<view>{{item.userPhoneNum}}</view>
							<!-- 退改规则 -->
							<view>{{role}}</view>
							<!-- 附加保险 -->
							<view>乘车险</view>
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
				orderID:'',
				role:'暂不支持在线退票',
				orderInfo:[],//订单数据
				passageInfo:[]
			}
		},
		onLoad(res) {
			var that = this;
			var orderInfo = JSON.parse(res.orderInfo);
			// that.orderID = orderInfo.orderId;
			console.log(orderInfo);
			that.getOrderDetailInfo(orderInfo.orderId);
		},
		methods: {
			//-------------------------------请求数据-------------------------------
			getOrderDetailInfo:function(param){
				var that = this;
				console.log(param)
				uni.request({
					url:'http://218.67.107.93:9210/api/app/getCpxsOrderDetail',
					method:'POST',
					// header:{'content-type':'application/json'},
					header:{'content-type':'application/x-www-form-urlencoded'},
					data: {
						orderId:param
					},
					success: (res) => {
						console.log('详情数据',res)
						//订单数据
						that.orderInfo = res.data.data
						//乘车人信息
						that.passageInfo = res.data.data.appUserInfoList
					},
					fail: (res) => {
						console.log(res)
					}
				})
			}
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
