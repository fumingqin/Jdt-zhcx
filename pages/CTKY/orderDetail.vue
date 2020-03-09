<template>
	<view class="content">
		<!-- 顶部订单信息 -->
		<view class="orderInfo">
			<!-- 线路/时间 -->
			<view class="orderInfoHead u-f-ac">
				<view>路线：南平北站 - 顺昌</view>
				<view>04月01日</view>
			</view>
			<!-- 上车点/价格 -->
			<view class="station u-f-jsb">
				<view>南平北站</view>
				<view>¥117.00</view>
			</view>
			<!-- 下车点/时间 -->
			<view class="station u-f-jsb">
				<view>顺昌</view>
				<view>09:30发车</view>
			</view>
		</view>

		<!-- 乘客信息 -->
		<view class="passagerInfo">
			<!-- 标题 -->
			<view class="titleView">乘客信息</view>
			<block v-for="(item,index) in passagerList" :key="index" v-model="passagerList">
				<view class="passegerContent">
					<!-- 姓名 -->
					<view class="name u-f-jsb paddingTLR">
						<view>{{item.name}}</view>
						<view @tap="deletePassager(index)">删除</view>
					</view>
					<!-- 手机号码 -->
					<view class="phoneNumber u-f-jsb paddingTLR">
						<view>手机号码</view>
						<view>{{item.phoneNumber}}</view>
					</view>
					<!-- 身份证 -->
					<view class="phoneNumber u-f-jsb paddingTLR">
						<view>身份证</view>
						<view>{{item.IDCardNumber}}</view>
					</view>
				</view>
			</block>
			<!-- 添加乘客/添加携童 -->
			<view class="AddPassagerView u-f-ajc">
				<button class="addPassager" @click="addPassager">添加乘客</button>
				<button class="addPassager" @click="addPassager">添加携童</button>
			</view>
		</view>

		<!-- 底部 -->
		<view class="bottomView u-f-jsb">
			<!-- 金额 -->
			<view style="font-size: 28rpx; color: #2C2D2D; padding-left: 32rpx;">总计：</view>
			<text class="priceText">{{money}}</text>
			<!-- 去支付 -->
			<button class="payButton" @click="payClick">去支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '¥117.00',
				passagerList: [{
						name: '张三丰',
						phoneNumber: '1234567890',
						IDCardNumber: '1234567890123'
					},
					{
						name: 'ajhkah',
						phoneNumber: '1234567890',
						IDCardNumber: '1234567890123'
					},
					{
						name: '小花',
						phoneNumber: '1234567890',
						IDCardNumber: '1234567890123'
					}
				]
			}
		},
		methods: {
			//删除乘客
			deletePassager(e) {
				//必须定义一个'指针'指向this才可以在下面调用那个数组
				var that = this;
				uni.showModal({
				    title: '提示',
				    content: '是否要删除该乘客',
				    success: function (res) {
				        if (res.confirm) {
							that.passagerList.splice(e,1);
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			//添加乘客
			addPassager() {
				console.log('点击添加乘客');
			},
			// 支付
			payClick() {
				console.log('需要支付', this.money);
			}
		}
	}
</script>

<style>
	/* flex布局 */
	.u-f,
	.u-f-ac,
	.u-f-jsb,
	.u-f-ajc {
		display: flex;
	}

	.u-f-ac,
	.u-f-jsb,
	.u-f-ajc {
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

	page,
	.content {
		height: 100%;
		background: #F5F9FC;
	}

	/* 顶部订单信息 */
	.orderInfo {
		background: #FFFFFF;
		border-radius: 12rpx;
		margin: 20rpx;
	}

	/* 路线/时间 */
	.orderInfoHead {
		font-size: 26rpx;
		color: #2C2D2D;
		padding: 20rpx;
		border-bottom: 1rpx solid #ECECEC;
	}

	/* 时间 */
	.orderInfoHead>view:last-child {
		padding-left: 60rpx;
	}

	/* 上车点/价格 */
	.station {
		font-size: 28rpx;
		font-weight: 300;
		padding: 20rpx;
	}

	.orderInfo>view:last-child {
		padding-top: 0rpx;
	}

	/* 乘客信息 */
	.passagerInfo {
		margin: 20rpx;
		border-radius: 12rpx;
		background: #FFFFFF;
	}

	.titleView {
		font-size: 26rpx;
		color: #2C2D2D;
		padding: 20rpx;
		border-bottom: 1rpx solid #ECECEC;
	}

	/* 姓名 */
	.name {
		font-size: 28rpx;
		color: #2C2D2D;
	}

	/* 手机号码 */
	.phoneNumber {
		font-size: 26rpx;
		color: #999999;
		font-weight: 300;
	}

	/* 添加乘客/携童 */
	.AddPassagerView {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.addPassager {
		width: 39.2%;
		height: 78rpx;
		line-height: 78rpx;
		font-size: 28rpx;
		color: #2C2D2D;
		border-radius: 12rpx;
		border: 1rpx solid #FC4646;
		background: #FFFFFF;
		font-weight: 300;
	}

	/* 底部view */
	.bottomView {
		width: 100%;
		height: 130rpx;
		background: #FFFFFF;
		margin-bottom: 0rpx;
		position: fixed;
		bottom: 0;
	}

	/* 价格 */
	.priceText {
		font-size: 32rpx;
		color: #FC4646;
	}

	/* 支付按钮 */
	.payButton {
		color: #FFFFFF;
		font-size: 32rpx;
		height: 78rpx;
		width: 37%;
		border-radius: 39rpx;
		background: #FC4646;
		font-weight: 300;
		margin-right: 32rpx;
	}
</style>
