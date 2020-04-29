<template>
	<view class="contentView">
		<view class="top u-f-jsb" style="background-color: #FC4646; width: 100%; height: 180rpx;">
			<view style="color: #FFFFFF; font-size: 35rpx; margin-left: 20rpx;">{{getCtkyOrderStatus(orderInfo.state)}}</view>
			<view style="color: #FFFFFF; font-size: 30rpx; margin-right: 20rpx;">￥{{orderInfo.totalPrice}}</view>
		</view>
		<!-- 头部视图 -->
		<view class="head">
			<!-- 起始站/价格 -->
			<view class="u-f-jsb">
				<view>{{orderInfo.startSiteName}} — {{orderInfo.endSiteName}}  x{{getTicketNum(orderInfo)}}</view>
			</view>
			<!-- 发车时间 -->
			<view> 发车时间：{{orderInfo.setOutTime}}</view>
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
							<view>{{orderInfo.phoneNumber}}</view>
							<!-- 退改规则 -->
							<view>{{role}}</view>
							<!-- 附加保险 -->
							<view>乘车险</view>
						</view>
					</view>
					<!-- 二维码 -->
					<view class="QRImage">
						<canvas canvas-id="ctkyQrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
						<!-- <image style="width: 300rpx; height: 300rpx;" :src="qrcodeSrc"  ></image> -->
					</view>
					<view style="color: #2C2D2D;font-size: 32rpx;font-weight: 300; padding-bottom: 10rpx;">
						  取票号 {{orderInfo.orderNumber}}
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
	import uQRCode from '../../../../components/CTKY/uni-qrcode/uqrcode.js'
	export default {
		
		data() {
			return {
				orderID:'',
				role:'暂不支持在线退票',
				orderInfo:[],//订单数据
				passageInfo:[],
				ticketNum:0,
				qrcodeSrc: '',//二维码
				qrcodeText: 'uQRCode',
				qrcodeSize: 150,
			}
		},
		onLoad(res) {
			var that = this;
			var orderInfo = JSON.parse(res.orderInfo);
			that.orderInfo = orderInfo;
			console.log(orderInfo);
			that.stringTurnArray(orderInfo.iDNameType);
			that.getTicketNum(orderInfo);
			that.make(this.orderInfo.orderNumber);
		},
		methods: {
			//-------------------------------生成二维码-------------------------------
			make(param) {
				if(param) {
					console.log(param);
					uQRCode.make({
						canvasId: 'ctkyQrcode',
						text: param,
						size: this.qrcodeSize,
						margin: 10,
						success: res => {
							console.log('完成')
							this.qrcodeSrc = res
						},
						complete: () => {
							// uni.hideLoading()
							console.log('完成')
						}
					})
				}
			},
			//-------------------------------获取乘车人信息-------------------------------
			stringTurnArray(param){
				var that = this;
				let a = param.indexOf('|')
				if(a == -1) {//不存在'|'
					var array = param.split(',');
					var passenger = {
						userName:array[1],
						userCodeNum:array[0],
					}
					that.passageInfo.push(passenger);
				}else {//存在'|'
					var array = param.split('|');
					for(let i = 0;i < array.length; i++) {
						var passenger = {
							userName:array[i][1],
							userCodeNum:array[i][0],
						}
						that.passageInfo.push(passenger);
					}
				}
			},
			//-------------------------------计算车票数量-------------------------------
			getTicketNum(param) {
				return Number(param.fullTicket) + Number(param.halfTicket) + Number(param.carryChild)
			},
			//-------------------------判断订单状态-------------------------
			getCtkyOrderStatus(param) {
				if (param == 4) {
					return '进行中'
				} else if (param == 5) {
					return '已完成'
				} else if (param == 6) {
					return '已退票'
				} else if (param == 7) {
					return '未支付'
				} else if (param == 9) {
					return '已撤销'
				} else if (param == 22) {
					return '已改签'
				}
			},
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
