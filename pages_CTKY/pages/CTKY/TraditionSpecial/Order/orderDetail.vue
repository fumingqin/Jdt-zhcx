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
				<view>{{orderInfo.carType}}:{{orderInfo.startSiteName}} — {{orderInfo.endSiteName}}  x{{getTicketNum(orderInfo)}}</view>
			</view>
			<!-- 发车时间 -->
			<view class="headText"> 发车时间：{{orderInfo.setOutTime}}</view>
			<view class="headText"> 司机姓名：{{getDetailInfo(orderInfo.driverName)}}</view>
			<!-- <view class="headText"> 随车手机号：{{getDetailInfo(orderInfo.driverPhone)}}</view> -->
			<view class="headText"> 车牌号：{{getDetailInfo(orderInfo.vehicleNumber)}}</view>
			<view class="headText"> 检票口：未知</view>
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
							<!-- <view>联系电话</view> -->
							<!-- 退改规则 -->
							<view>退改规则</view>
							<!-- 附加保险 -->
							<view>附加保险</view>
						</view>
						<view class="detailInfo">
							<!-- 出行人 -->
							<view>{{item.userName}}</view>
							<!-- 身份证 -->
							<view>{{userCodeNumChange(item.userCodeNum)}}</view>
							<!-- 联系电话 -->
							<!-- <view>{{orderInfo.phoneNumber}}</view> -->
							<!-- 退改规则 -->
							<view>{{role}}</view>
							<!-- 附加保险 -->
							<view>{{isInsured(orderInfo.insured)}}</view>
						</view>
					</view>
					<!-- 二维码 -->
					<view style="justify-content: center; align-items: center;display: flex;">
						<view class="QRImage">
							<canvas v-if="isShowQrcode == true" :canvas-id="'ctkyQrcode' + index" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
							<!-- <image style="width: 300rpx; height: 300rpx;" :src="qrcodeSrc"  ></image> -->
							<!-- 如果没有取票号就显示相应的状态 -->
							<view v-if="isShowQrcode == false" style="font-weight: 300;color: #2C2D2D;font-size: 32rpx;justify-content: center; align-items: center;">{{getQRCodeStatus(orderInfo.state)}}</view>
						</view>
					</view>
					
					<view v-if="orderInfo.carType != '定制巴士'" style="color: #2C2D2D;font-size: 32rpx;font-weight: 300; padding-bottom: 10rpx;">
						  取票号 {{getOneTicketNum(orderInfo.ticketNumber,index)}}
					</view>
					<!-- <view v-if="orderInfo.carType == '定制巴士'" style="width: 100%;text-overflow: ellipsis;white-space: nowrap;overflow: hidden; color: #2C2D2D;font-size: 32rpx;font-weight: 300; padding-bottom: 10rpx;">
						  取票号 {{getSpecialOneTicketNum(specialCodeArray,index)}}
					</view> -->
					<view style="color: #999999;font-size: 28rpx;font-weight: 300; padding-bottom: 50rpx;">
						出示二维码，检票上车
					</view>
					
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import uQRCode from '@/pages_CTKY/components/CTKY/uni-qrcode/uqrcode.js'
	export default {
		
		data() {
			return {
				orderID:'',
				role:'过发车时间将无法退票',
				orderInfo:[],//订单数据
				passageInfo:[],
				ticketNum:0,
				qrcodeSrc: '',//二维码
				qrcodeText: 'uQRCode',
				qrcodeSize: 150,
				ticketNumber:'',
				ticktIndex:'',//车票下标
				specialCodeArray:[],
				isShowQrcode:'',
			}
		},
		onLoad(res) {
			var that = this;
			var orderInfo = JSON.parse(res.orderInfo);
			that.orderInfo = orderInfo;
			this.specialCodeArray = orderInfo.CheckInfoList;
			// console.log(orderInfo);
			// console.log(orderInfo.CheckInfoList);
			that.stringTurnArray(orderInfo.iDNameType);
			//检票号---生成二维码
			if(orderInfo.carType != '定制巴士'){
				// for(let i = 0;i < orderInfo.passageInfo.length;i++){
				// 	this.ticketNumber = orderInfo.ticketNumber;
				// 	that.make(this.orderInfo.ticketNumber,i);
				// }
			}else {
				for(let i = 0;i < orderInfo.CheckInfoList.length;i++){
					this.ticketNumber = orderInfo.CheckInfoList[i].CheckCode;
					that.make(this.ticketNumber,i);
				}
			}
			
			that.getTicketNum(orderInfo);
			
			that.getOneTicketNum();
		},
		methods: {
			//-------------------------------生成二维码-------------------------------
			make(param,index) {
				if(param) {
					// console.log(param);
					uQRCode.make({
						canvasId: 'ctkyQrcode' + index,
						text: param,
						size: this.qrcodeSize,
						margin: 20,
						success: res => {
							console.log(res);
							// console.log('完成')
							this.qrcodeSrc = res
						},
						complete: () => {
							// uni.hideLoading()
							// console.log('完成')
						}
					})
				}
			},
			//-------------------------------身份证-------------------------------
			userCodeNumChange:function(userCodeNum){
				return (userCodeNum.substr(0,6))+'******'+(userCodeNum.substr(16,18))
			},
			//-------------------------------判断是否有保险-------------------------------
			isInsured:function(param) {
				if(param == 'False') {
					return '无保险'
				}else {
					return '乘车险 x1'
				}
			},
			//-------------------------------报班信息-------------------------------
			getDetailInfo(param){
				if(!param) {
					return '该车未报班，无法获取详细信息'
				}else{
					return param
				}
			},
			//-------------------------------获取乘车人信息-------------------------------
			stringTurnArray(param){
				var that = this;
				
				let a = param.indexOf('|')
				var singleArray = [];
				if(a == -1) {//不存在'|' 只有一张车票
					var array = param.split(',');
					var passenger = {
						userName:array[1],
						userCodeNum:array[0],
					}
					that.passageInfo.push(passenger);
					
					this.ticketNumber = that.orderInfo.ticketNumber;
					that.make(this.orderInfo.ticketNumber);
				}else {//多人订票
					//存在'|'
					var array = param.split('|');
					for(let i = 0;i < array.length; i++) {
						singleArray = array[i].split(',');
						var passenger = {
							userName:singleArray[1],
							userCodeNum:singleArray[0],
						}
						that.passageInfo.push(passenger);
						
						this.ticketNumber = that.orderInfo.ticketNumber;
						that.make(this.orderInfo.ticketNumber,i);
					}
				}
			},
			//-------------------------------获取取票号-------------------------------
			getOneTicketNum(ticketNum,index){
				if(ticketNum) {
					let a = ticketNum.indexOf(',')
					if(a == -1) {
						return ticketNum;
					}else {
						var array = ticketNum.split('-');
						let ticketHeader = array[0];
						var array2 = array[1];
						var array3 = array2.split(',');
						return ticketHeader + '-' + array3[index];
					}
				}
			},
			//-------------------------------获取定制巴士取票号-------------------------------
			getSpecialOneTicketNum(res,index){
				if(this.orderInfo.carType == '定制巴士'){
					return res[index].CheckCode
				}
			},
			//-------------------------------计算车票数量-------------------------------
			getTicketNum(param) {
				return Number(param.fullTicket) + Number(param.halfTicket) + Number(param.carryChild)
			},
			//-------------------------判断订单状态-------------------------
			getCtkyOrderStatus(param) {
				if (!(/(^[1-9]\d*$)/.test(param))){//如果不是数字
				    if(param == '尚未支付'){
						this.isShowQrcode = false;
					}else if(param == '作废'){
						this.isShowQrcode = false;
					}else if(param == '已退票'){
						this.isShowQrcode = false;
					}else {
						this.isShowQrcode = true;
					}
					return param
				}else if (param == 4) {
					this.isShowQrcode = true;
					return '进行中'
				} else if (param == 5) {
					this.isShowQrcode = true;
					return '已完成'
				} else if (param == 6) {
					this.isShowQrcode = false;
					return '已退票'
				} else if (param == 7) {
					this.isShowQrcode = false;
					return '未支付'
				} else if (param == 9) {
					this.isShowQrcode = false;
					return '已撤销'
				} else if (param == 22) {
					this.isShowQrcode = true;
					return '已改签'
				}
			},
			//-------------------------判断订单状态-------------------------
			getQRCodeStatus(param) {
				if (param == 6) {//已退票
					return '订单已退票'
				} else if (param == 7) {//未支付
					return '订单未支付'
				} else if (param == 9) {//已撤销
					return '订单已撤销'
				}else if (param == '已退票') {//已退票-----定制巴士
					return '订单已退票'
				}else if (param == '尚未支付') {//作废
					return '尚未支付'
				}else if (param == '作废') {//作废
					return '订单已作废'
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
	.headText {
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
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
		width: 300rpx;
		height: 300rpx;
	}
	
</style>
