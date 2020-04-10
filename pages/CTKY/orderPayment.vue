<template>
	<!-- 订单支付页面 -->
	<view>
		<view style="color: #000000; font-size: 26upx; position: absolute; right: 32upx; z-index: 1; top: 24upx;">倒计时：{{countDownDate}}秒</view>
		<view class="cover-container">
			<view class="MP_information1">
				<view class="MP_title">{{orderInfo.startStaion}} - {{orderInfo.endStation}}</view>
				<text class="MP_text">费用包含：车票 {{insurance}}</text>

				<view class="MP_selectionDate">
					<view class="MP_title">使用时间</view>
					<text class="MP_text">{{utils.timeTodate('Y-m-d H:i',orderInfo.setTime)}} &nbsp; 仅限当天</text>
				</view>

				<view class="MP_selectionDate" :hidden="hiddenValues==0">
					<view class="MP_title">购票人信息</view>
					<view class="MP_userInformation" v-for="(item,index) in passengerInfo" :key="index">
						<text>{{item.userName}}</text>
						<text class="Mp_sex">{{item.userSex}}</text>
						<text class="Mp_square">{{item.userType}}</text>
						<text class="Mp_square" v-if="item.userDefault == true">本人</text>
						<text class="Mp_square" v-if="item.userEmergencyContact == true">紧急联系人</text>
						<text class="Mp_text">身份证：{{item.userCodeNum}}</text>
						<text class="Mp_text">手机号：{{item.userPhoneNum}}</text>
					</view>
				</view>

				<view class="MP_selectionDate" :hidden="hiddenValues==0">
					<view class="MP_title">费用详情</view>
					<view class="MP_cost" v-if="adultNum>=1">
						<text>成人票</text>
						<text class="MP_number">×{{adultNum}}</text>
						<text class="MP_userCost">¥{{orderInfo.fare}}</text>
					</view>

					<view class="MP_cost" v-if="childrenNum>=1">
						<text>儿童票</text>
						<text class="MP_number">×{{childrenNum}}</text>
						<text class="MP_userCost">¥{{orderInfo.halfTicket}}</text>
					</view>

					<!-- 保险 -->
					<view class="MP_cost" v-if="isInsurance == 1 ">
						<text>保险</text>
						<text class="MP_number">×{{ticketNum}}</text>
						<text class="MP_total">¥{{orderInfo.insurePrice}}</text>
					</view>

					<!-- 优惠券 -->
					<!-- <view class="MP_cost" v-if="orderInfo[0].couponPrice>0" v-if="false">
						<text>{{orderInfo[0].couponTitle}}</text>
						<text class="MP_number">×1</text>
						<text class="MP_total">-&nbsp;¥{{orderInfo[0].couponPrice}}</text>
					</view> -->

					<!-- <view class="MP_cost">
						<text class="MP_total">共计&nbsp;¥{{orderInfo[0].orderActualPayment}}</text>
					</view> -->

				</view>

				<view class="jdticon icon-xia" style="padding: 24upx 0upx; text-align: center; margin-top: 64upx;" @click="hide(0)"
				 :hidden="hiddenValues==1"></view>
				<view class="jdticon icon-shang" style="padding: 24upx 0upx; text-align: center; margin-top: 64upx;" @click="hide(1)"
				 :hidden="hiddenValues==0"></view>

			</view>

			<view class="MP_information2">
				<view class="MP_optionBar">
					<text class="Mp-icon jdticon icon-weixinzhifu"></text>
					<text class="Mp_title">微信</text>
					<radio class="Mp_box" :checked="channeIndex===0" :color="'#36cb59'" @click="Selection"></radio>
				</view>
			</view>

			<view class="MP_information2">
				<view class="MP_optionBar">
					<text class="Mp-icon jdticon icon-alipay"></text>
					<text class="Mp_title">支付宝</text>
					<radio class="Mp_box" :checked="channeIndex===1" :color="'#01aaef'" @click="Selection"></radio>
				</view>
			</view>

			<view class="MP_information3" @click="payment">
				支付{{totalPrice}}元
			</view>

		</view>

	</view>
</template>

<script>
	import utils from "@/components/CTKY/shoyu-date/utils.filter.js";
	export default {
		data() {
			return {
				countDownDate: 120, //倒计时时间
				utils: utils,
				userInfo: [], //用户信息
				hiddenValues: '0', //隐藏状态值
				channel: [{
					name: '微信'
				}, {
					name: '支付宝'
				}],
				insurance: '', //保险
				isInsurance: '', //是否有保险
				channeIndex: 0, //选择支付方式
				orderInfo: [], //订单数据
				passengerInfo: [], //乘车人信息
				idNameType: [], //乘车人数组（发送请求需要）
				ticketNum: 0, //总票数
				adultNum: 0, //成人数量
				childrenNum: 0, //儿童数量	
				adultTotalPrice: '', //成人总价
				childrenTotalPrice: '', //儿童总价
				totalPrice: '', //总价格
				paymentData:[],//保存支付参数
				timer:'',//定时器数据
			}
		},
		onLoad: function(param) {
			
			this.totalPrice = param.totalPrice;
			//读取车票信息
			this.getTickerInfo();
			//读取用户信息
			this.getUserInfo();
			//读取乘车人信息
			this.getPassengerInfo();

			if (param.isInsurance == 1) {
				this.insurance = '保险';
				this.isInsurance = true;
			} else {
				this.insurance = '';
				this.isInsurance = false;
			}
			console.log('是否有保险', this.isInsurance)
			//--------------------------计时器--------------------------
			uni.getStorage({
				key: 'keYunCountDown',
				success: (res) => {
					this.countDownDate = res.data;
					this.countDown();
				},
				fail: () => {
					this.countDown();
				}
			})
			
		},
		onUnload() {
			clearInterval(this.timer);
		},
		methods: {
			//--------------------------读取车票信息--------------------------
			getTickerInfo() {
				var that = this;
				//读取车票信息
				uni.getStorage({
					key: 'ticketDate',
					success: function(data) {
						that.orderInfo = data.data;
						console.log('订单数据',that.orderInfo)
					},
					fail() {
						uni.showToast({
							title: '获取信息失败',
							icon: 'none'
						})
					}
				})
			},
			//--------------------------读取用户信息--------------------------
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						that.userInfo = data.data;
						// console.log('用户信息', that.userInfo);
					}
				})
			},
			//--------------------------读取乘车人信息--------------------------
			getPassengerInfo() {
				var that = this;
				//读取乘车人信息
				uni.getStorage({
					key: 'passengerList',
					success: function(data) {
						that.passengerInfo = data.data;
						for (let i = 0; i < that.passengerInfo.length; i++) {
							let array = {
								userCodeNum: data.data[i].userCodeNum,
								userDefault: data.data[i].userDefault,
								userEmergencyContact: data.data[i].userEmergencyContact,
								userID: data.data[i].userID,
								userName: data.data[i].userName,
								userPhoneNum: data.data[i].userPhoneNum,
								userSex: data.data[i].userSex,
								userType: data.data[i].userType,
							}
							that.idNameType.push(array);
							// console.log('idNameType', that.idNameType);
							that.ticketNum++;
							//把儿童票筛选出来
							if (that.passengerInfo.userType == '儿童') {
								that.childrenNum++;
								// console.log('idNameType', that.childrenNum);
							} else {
								that.adultNum++;
								// console.log('idNameType', that.adultNum);
							}
						}
					},
					fail() {
						uni.showToast({
							title: '获取信息失败',
							icon: 'none'
						})
					}
				})
			},

			//--------------------------隐藏操作--------------------------
			hide(e) {
				if (e == 0) {
					this.hiddenValues = 1;
				} else {
					this.hiddenValues = 0;
				}
			},

			//--------------------------同意购买-点击事件--------------------------
			Selection: function() {
				if (this.channeIndex == 0) {
					this.channeIndex = 1;
				} else {
					this.channeIndex = 0;
				}
			},

			//--------------------------数组提取--------------------------
			screenUser: function() {
				let adult = this.orderInfo.filter(item => {
					return item.userType == '成人';
				})
				let children = this.orderInfo.filter(item => {
					return item.userType == '儿童';
				})

				this.adultIndex = adult.length;
				this.childrenIndex = children.length;
				this.adultTotalPrice = adult.length * this.orderInfo[0].ticketAdultPrice;
				this.childrenTotalPrice = children.length * this.orderInfo[0].ticketChildPrice;
			},
			//--------------------------计时器--------------------------
			countDown: function() {
				// var interval = setInterval(() => {
				// 	--this.countDownDate;
				// 	uni.setStorage({
				// 		key: 'keYunCountDown',
				// 		data: this.countDownDate,
				// 	})
				// }, 1000)
				var that = this;
				// clearInterval(interval)
				uni.removeStorage({
					key: 'keYunCountDown',
					data: this.countDownDate,
				})
				// console.log('用户信息',that.userInfo);
				// console.log('订单信息',that.orderInfo);
				// console.log('idNameType',that.idNameType);
				//--------------------------发起下单请求-----------------------
				uni.showLoading();
				uni.request({
					url: 'http://218.67.107.93:9210/api/app/addOrder',
					method: 'POST',
					header: {
						'content-type': 'application/json'
					},
					data: {
						companyCode: '泉运公司综合出行',
						clientID: that.userInfo.unid,
						clientName: that.userInfo.username,
						scheduleCompanyCode: that.orderInfo.scheduleCompanyCode,
						executeScheduleID: that.orderInfo.executeScheduleID,
						startSiteID: that.orderInfo.startSiteID,//上车点ID
						endSiteID: that.orderInfo.endSiteID,//下车点ID
						startSiteName: that.orderInfo.startStaion,//起点站
						endSiteName: that.orderInfo.endStation,//终点站
						priceID: that.orderInfo.priceID,//价格ID
						phoneNumber: that.userInfo.phoneNumber,//手机号码
						fullTicket: that.adultNum,//全票人数
						halfTicket: that.childrenNum,//半票人数
						carryChild: that.childrenNum,//携童人数
						idNameType: that.idNameType,
						insured: that.isInsurance,//是否选择了保险
						insuredPrice: that.orderInfo.insurePrice,//保险价格
						openId: 'oMluguFoTfQ7YajiqYVxj3YzxhMI',
						totalPrice: that.totalPrice,//总价格
						setOutTime: that.orderInfo.setTime,//订单时间
						carType: that.orderInfo.shuttleType,//班车类型
					},
					success: (res) => {
						uni.hideLoading();
						
						let that = this;
						// console.log('订单返回数据',res);
						//获取车票支付参数
						that.getTicketPaymentInfo(res);
					},
					fail(res) {
						uni.hideLoading();
					}
				})
			},
			//--------------------------获取车票支付参数--------------------------
			getTicketPaymentInfo: function(res) {
				console.log(res);
				var that = this;
				var timer=null;
				that.timer = timer;
				timer=setInterval(function(){
					uni.showLoading();
					uni.request({
						url: 'http://218.67.107.93:9210/api/app/getPayParam',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							resultStr: res.data.data.resultStr,
							id: res.data.data.id
						},
						success: (res) => {
							uni.hideLoading();
							if (res.data.msg != '') {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
								clearInterval(timer);
							}
							if(res.data.data != null) {
								// console.log('有数据了',res.data.data);
								clearInterval(timer);
								that.paymentData = JSON.parse(res.data.data);
							}
							// console.log('支付参数返回数据', res);
						},
						fail(res) {
							uni.hideLoading();
							console.log('失败');
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//--------------------------调起支付--------------------------
			payment: function() {
				console.log('点击了支付');
				
				var that = this;
				console.log('点击了支付',that.paymentData);
				// uni.showToast({
				// 	title: that.paymentData.AppId + that.paymentData.TimeStamp + that.paymentData.NonceStr + that.paymentData.Package + that.paymentData.SignType + that.paymentData.PaySign,
				// 	icon: 'none'
				// }),
				// history.pushState(null, null, "/");
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"appId": that.paymentData.AppId,//公众号名称，由商户传入
					"timeStamp": that.paymentData.TimeStamp, //时间戳
					"nonceStr": that.paymentData.NonceStr, //随机串
					"package": that.paymentData.Package, //扩展包
					"signType": that.paymentData.SignType, //微信签名方式:MD5
					"paySign": that.paymentData.PaySign //微信签名
				}, function(res) {
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						//支付成功再进计时器查询状态
						// location.href = "/Order/BaseCallback/" + flowID;
						alert("支付成功");
					}
					else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
					   alert("您取消了支付，请重新支付");
					}
					else if(res.err_msg == "get_brand_wcpay_request:faile" ){
					   alert("支付失败，请重新支付");
					}
					else {
						// location.href = "/Coach/GetCoach";
					}
				});
					//威富通
				// 	if (res.jsapi.TokenID != null) {
				// 		window.location.href = "https://pay.swiftpass.cn/pay/jspay?showwxtitle=1&token_id=" + result.jsapi.TokenID;
				// 	} else {
						
				// }
				// 	uni.requestPayment({
				// 		provider: 'alipay',
				// 		orderInfo: {
				// 			"orderNumber": res.data.data.orderNumber,
				// 			"ticket": this.ticket,
				// 			"date": this.date,
				// 			"dateReminder": this.dateReminder,
				// 			"addressData": this.addressData,
				// 			"actualPayment": this.actualPayment,
				// 			"coupon": this.coupon,
				// 			"channe": this.channel[this.channeIndex],
				// 		},
				// 		success: function(res) {
				// 			console.log('success:' + JSON.stringify(res));
				// 		},
				// 		fail: function(err) {
				// 			console.log('fail:' + JSON.stringify(err));
				// 		}
				// 	})

				// 	uni.redirectTo({
				// 		url: '/pages/LYFW/scenicSpotTickets/successfulPayment?orderNumber='+JSON.stringify(this.orderInfo[0].orderNumber)
				// 	})

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		padding-bottom: 40upx;
	}

	//背景图样式
	.ob_background {
		position: absolute;
		width: 100%;
		height: 320upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	//整体容器样式
	.cover-container {
		position: relative;
		top: 30upx;
		padding: 32upx 30upx;
	}

	//公共样式 - 适用多个数据框
	.MP_information1 {
		border-radius: 16upx;
		background: #FFFFFF;
		padding: 44upx 32upx;
		padding-bottom: 24upx;
		font-size: 32upx;
		box-shadow: 0px 0.2px 0px #aaa;

		.MP_title {
			font-size: 34upx;
			display: flex;
			font-weight: bold;
			// margin-top: 20upx;
		}

		.MP_text {
			color: #888;
			font-size: 28upx;
			margin-top: 20upx;
			display: block; // 让字体换行
		}
	}

	//公共样式2 - 适用单选框
	.MP_information2 {
		border-radius: 16upx;
		background: #FFFFFF;
		padding: 36upx 32upx;
		font-size: 32upx;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 24upx;

		.kj {
			font-size: 34upx;
			display: flex;
			font-weight: bold;
			margin-top: 8upx;
		}

		.MP_text {
			font-size: 26upx;
			margin-top: 20upx;
			display: block; // 让字体换行
		}

		//选项框样式
		.MP_optionBar {
			.Mp_title {
				font-size: 32upx;
				margin-left: 20upx;
			}

			.Mp_text {
				margin-top: 6upx;
				float: right;
				font-size: 28upx;
				color: #f85e52;
			}

			.Mp_textBlue {
				margin-left: 16upx;
				font-size: 26upx;
				color: #3EABFC;
			}

			.Mp_box {
				float: right;
				position: relative;
				bottom: 6upx;
				right: -12upx;
			}

			.Mp_icon {
				width: 100upx;
				font-size: 52upx;
			}

			.icon-weixinzhifu {
				color: #36cb59;
			}

			.icon-alipay {
				color: #01aaef;
			}
		}
	}

	//公共样式3 - 适用按钮
	.MP_information3 {
		padding: 24upx 0;
		border-radius: 64upx;
		background: #FF6600;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 80upx;
	}

	//使用时间/费用详情
	.MP_selectionDate {
		margin-top: 24upx;
		margin-bottom: 24upx;
		border-top: 1px #F5F5F5 dashed;

		.MP_title {
			margin-top: 24upx;
			font-size: 34upx;
			display: flex;
			font-weight: bold;
		}

		.MP_text {
			color: #888;
			font-size: 28upx;
			display: block; // 让字体换行
		}

		.MP_cost {
			display: block; // 让字体换行
			margin: 20upx 0;
			font-size: 28upx;
			color: #888;

			.MP_number {
				margin-left: 16upx;
			}

			.MP_userCost {
				float: right;
			}

			.MP_total {
				color: #f85e52;
				float: right;
			}
		}
	}

	// 出行人信息
	.MP_userInformation {
		margin-top: 32upx;

		.Mp_sex {
			margin-left: 24upx;
		}

		.Mp_text {
			font-size: 28upx;
			display: block;
			color: #888;
			margin-top: 20upx;
		}

		.Mp_square {
			margin-left: 24upx;
			padding: 2upx 20upx;
			background: #3DABFC;
			font-size: 26upx;
			color: #fff;
			text-align: center;
			border-radius: 8upx;
		}

		.Mp_delete {
			float: right;
			color: #f85e52;
			font-size: 34upx;
		}

		.Mp_addTo {
			float: left;
			font-size: 30upx;
			margin-left: 64upx;
			width: 200upx;
		}

		.Mp_Selection {
			font-size: 30upx;
			margin-right: 64upx;
			width: 200upx;
		}
	}
</style>
