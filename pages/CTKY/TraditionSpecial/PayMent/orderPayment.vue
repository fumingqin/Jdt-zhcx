<template>
	<!-- 订单支付页面 -->
	<view>
		<!-- <view style="color: #000000; font-size: 26upx; position: absolute; right: 32upx; z-index: 1; top: 24upx;">倒计时：{{countDownDate}}秒</view> -->
		<view class="cover-container">
			<view class="MP_information1">
				<view class="MP_title">{{orderInfo.startStaion}} - {{orderInfo.endStation}}</view>
				<text class="MP_text">费用包含：车票 {{insurance}}</text>

				<view class="MP_selectionDate">
					<view class="MP_title">使用时间</view>
					<text class="MP_text">{{turnDate(orderInfo.setTime)}} &nbsp; 仅限当天</text>
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

			<view class="MP_information2" v-if="false">
				<view class="MP_optionBar">
					<text class="Mp-icon jdticon icon-alipay"></text>
					<text class="Mp_title">支付宝</text>
					<radio class="Mp_box" :checked="channeIndex===1" :color="'#01aaef'" @click="Selection"></radio>
				</view>
			</view>

			<view class="MP_information3" @click="payment">支付{{totalPrice}}元
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
				idNameTypeStr: '', //乘车人信息字符串（发送请求需要）（小叶接口）
				ticketNum: '0', //总票数
				adultNum: '0', //成人数量
				childrenNum: '0', //儿童数量	
				adultTotalPrice: '', //成人总价
				childrenTotalPrice: '', //儿童总价
				totalPrice: '0', //总价格
				paymentData: [], //保存支付参数
				timer: '', //定时器数据
				isPayEnable: false, //当前是否可以点击支付
				orderNum: '', //订单编号
				ticketInfo:[],
				specialStartStation:'',//定制班车上车点
				specialEndStation:'',//定制班车下车点
				tickettype :'',//班车类型
				ctkyOpenID :'',
			}
		},
		onLoad: function(param) {
			var that = this;
			that.ticketInfo = JSON.parse(param.array);
			//定制班车上车点
			that.specialStartStation = that.ticketInfo.getOnPoint;
			//定制班车下车点
			that.specialEndStation = that.ticketInfo.getOffPoint;
			//班车类型
			that.tickettype = that.ticketInfo.shuttleType;
			
			uni.showLoading();
			that.totalPrice = param.totalPrice;
			if (param.isInsurance == 1) {
				that.insurance = '保险';
				that.isInsurance = true;
			} else {
				that.insurance = '';
				that.isInsurance = false;
			}
			//读取车票信息
			this.getTickerInfo();
			//读取用户信息
			this.getUserInfo();
			//读取乘车人信息
			this.getPassengerInfo();
		},
		onShow() {
			
		},
		onUnload() {
			clearInterval(this.timer);
		},
		//--------------------------监听页面返回--------------------------
		onBackPress(options) {
			var that = this;
			// console.log('from:' + options.from);
			clearInterval(that.timer);
			if (options.from == 'backbutton') {
				console.log('that.timer', that.timer);
				if (that.timer) {
					clearInterval(that.timer);
				}

				//当页面返回的时候取消订单
				// var that = this;
				// console.log('param',param);
				// uni.request({
				// 	url:'http://218.67.107.93:9210/api/app/returnCpxsOrder',
				// 	method:'POST',
				// 	header:{'content-type':'application/x-www-form-urlencoded'},
				// 	data:{
				// 		id : param
				// 	},
				// 	success: (res) => {
				// 		uni.showToast({
				// 			title:res.data.msg,
				// 			icon:'none'
				// 		})
				// 		//刷新
				// 		this.info = [];
				// 		//景区订单数据
				// 		this.toFinished(); 
				// 		//客运订单数据
				// 		this.getUserInfo();
				// 	},
				// 	fail(res) {
				// 		console.log('错误',res);
				// 	}
				// })

			}
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
						// console.log('订单数据', that.orderInfo)
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
					}
				})
			},
			//-------------------------------时间转换-------------------------------
			turnDate(date) {
				if(date) {
					var setTime = date.replace('T',' ');
					return setTime;
				}
			},
			//--------------------------读取乘车人信息--------------------------
			getPassengerInfo() {
				var that = this;
				//读取乘车人信息
				uni.getStorage({
					key: 'passengerList',
					success: function(data) {
						that.passengerInfo = data.data;
						if (that.passengerInfo.length > 0) {
							for (let i = 0; i < that.passengerInfo.length; i++) {
								var type = '';
								if (data.data[i].userType == '儿童') {
									type = 0;
								} else if (data.data[i].userType == '成人') {
									type = 2;
								}
								//拼接id name type
								that.idNameTypeStr += data.data[i].userCodeNum + ',' + data.data[i].userName + ',' + type + '|';

								that.ticketNum++;
								//把儿童票筛选出来
								if (that.passengerInfo.userType == '儿童') {
									that.childrenNum++;
								} else {
									that.adultNum++;
								}
							}
							//把最后面的'｜'去掉
							that.idNameTypeStr = that.idNameTypeStr.substring(0, that.idNameTypeStr.length - 1);
						}
						//-------------------------------读取用户openID-------------------------------
						that.getOpenID();
						
						
						//-------------------------------下单-------------------------------
						// that.getOrder();
					},
					fail() {
						uni.showToast({
							title: '获取信息失败',
							icon: 'none'
						})
					}
					
				})
			},
			//--------------------------读取公众号openid--------------------------
			getOpenID() {
				var that = this;
				uni.getStorageSync({
					key:'scenicSpotOpenId',
					success:function(response){
						alert('获取id成功');
						that.ctkyOpenID = response.data
						//等待读取用户缓存成功之后再请求接口数据
						that.getOrder();
					},
					fail:function(fail){
						// alert(fail);
						uni.showModal({
							content:'用户未授权',
						})
						// that.getOrder();
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
			getOrder: function() {
				var that = this;
				var timer = null;
				var setTime = that.orderInfo.setTime.replace('T', ' ');
				var companyCode = '';
				// #ifdef H5
				companyCode = '泉运公司综合出行H5';
				// #endif
				// #ifdef APP-PLUS
				companyCode = '泉运公司综合出行APP';
				// #endif
				alert(that.ctkyOpenID);
				//--------------------------发起下单请求-----------------------
				uni.request({
					url: 'http://111.231.109.113:8002/api/ky/SellTicket_NoBill_Booking',
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					data: {
						companyCode: companyCode,
						clientID: that.userInfo.userId, //用户ID
						clientName: that.userInfo.nickname, //用户名
						phoneNumber: that.userInfo.phoneNumber, //手机号码

						scheduleCompanyCode: that.orderInfo.scheduleCompanyCode, //班次代码
						executeScheduleID: that.orderInfo.executeScheduleID, //班次ID
						startSiteID: that.orderInfo.startSiteID, //上车点ID
						endSiteID: that.orderInfo.endSiteID, //下车点ID
						startSiteName: that.orderInfo.startStaion, //起点站
						endSiteName: that.orderInfo.endStation, //终点站
						priceID: that.orderInfo.priceID, //价格ID
						setOutTime: setTime, //发车时间
						insuredPrice: that.orderInfo.insurePrice, //保险价格
						carType: that.orderInfo.shuttleType, //班车类型

						fullTicket: that.adultNum, //全票人数
						halfTicket: that.childrenNum, //半票人数
						carryChild: that.childrenNum, //携童人数
						idNameType: that.idNameTypeStr, //乘车人信息
						insured: that.isInsurance, //是否选择了保险
						openId: that.ctkyOpenID,
						totalPrice: that.totalPrice, //总价格
						payParameter: '', //不需要的参数，传空
						
						getOnPoint: that.specialStartStation,//定制班车上车点
						getOffPoint: that.specialEndStation,//定制班车下车点
					},
					
					success: (res) => {
						alert(res);
						console.log('成功回调', res);
						if (res.data) {
							if (res.data.status == true) {
								// console.log('订单编号', res.data.data);
								uni.showToast({
									title:res.data.status,
									icon:'none'
								})
								that.orderNum = res.data.data;
								that.getTicketPaymentInfo(res.data.data);
							}else if(res.data.status == false) {
								uni.hideLoading();
								uni.showModal({
									content:res.data.msg,
									success: (res) => {
										if(res.confirm) {
											uni.switchTab({
												url:'../../../order/OrderList'
											})
										}else if(res.cancel) {
											uni.navigateBack()
										}
									}
								})
							}
						}
					},
					fail(res) {
						console.log('失败', res);
						uni.hideLoading();
					}
				})
			},
			//--------------------------获取车票支付参数--------------------------
			getTicketPaymentInfo: function(res) {
				// console.log(res);
				var that = this;
				var timer = null;
				that.timer = timer;
				timer = setInterval(function() {
				// uni.showLoading();
				uni.request({
					url: 'http://111.231.109.113:8002/api/ky/SellTicket_Flow',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						//订单编号
						orderNumber: res
					},
					success: (res) => {
						console.log(res.data);
						if (res.data) {
							if (res.data.status == true) {
								var msgArray = JSON.parse(res.data.msg);
								console.log('msgArray', msgArray);
								if(msgArray.oldState == '结束') {
									uni.hideLoading();
									uni.showToast({
										title: msgArray.message,
										icon: 'none'
									})
									clearInterval(timer);
								} else if (msgArray.oldState == '支付系统申请支付订单') {
									that.paymentData = msgArray;
									// console.log('paymentData', that.paymentData);
									uni.hideLoading();
									uni.showModal({
										content:'请在2分钟内完成支付',
										showCancel:false
									})
									//回调失败，取消定时器
									clearInterval(timer);
								}
							}else if(res.data.status == false) {
								var msgArray = JSON.parse(res.data.msg);
								uni.hideLoading();
								uni.showToast({
									title: msgArray.message,
									icon: 'none'
								})
								//回调失败，取消定时器
								clearInterval(timer);
							}
						}
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
				var that = this;
				console.log('111111',that.paymentData);
				// #ifdef H5
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"appId": that.paymentData.jsapi.AppId, //公众号名称，由商户传入
					"timeStamp": that.paymentData.jsapi.TimeStamp, //时间戳
					"nonceStr": that.paymentData.jsapi.NonceStr, //随机串
					"package": that.paymentData.jsapi.Package, //扩展包
					"signType": that.paymentData.jsapi.SignType, //微信签名方式:MD5
					"paySign": that.paymentData.jsapi.PaySign //微信签名
				}, function(res) {
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						//支付成功再进计时器查询状态
						// location.href = "/Order/BaseCallback/" + flowID;
						alert("支付成功");
						uni.redirectTo({
							url:'./CTKYPaySuccess?&orderNum=' + that.orderNum,
						})
					} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
						alert("您取消了支付，请重新支付");
						uni.redirectTo({
							url:'./CTKYPayFail?&orderNum=' + that.orderNum,
						})
					} else if (res.err_msg == "get_brand_wcpay_request:faile") {
						alert("支付失败，请重新支付");
						uni.redirectTo({
							url:'./CTKYPayFail?&orderNum=' + that.orderNum,
						})
					} else {
						// location.href = "/Coach/GetCoach";
					}
				});
				// #endif
				
				
				// #ifdef APP-PLUS
				console.log('进入app支付',that.paymentData);
				uni.hideLoading()
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: {
						appid: that.paymentData.jsapi.AppId,
						timestamp: that.paymentData.jsapi.TimeStamp,
						noncestr: that.paymentData.jsapi.NonceStr,
						package: 'Sign=WXPay',
						sign: that.paymentData.jsapi.PaySign,
						partnerid: that.paymentData.jsapi.PartnerId, 
						prepayid: that.paymentData.jsapi.PrepayId,
					},
					success:function(res){
						console.log(res)
						uni.showModal({
							title:'提示',
							content:res,
							showCancel:false
						})
						if(res.errCode == 0) {//成功
							uni.showToast({
								title: '支付成功',
								icon: 'none'
							})
							uni.redirectTo({
								url:'./CTKYPaySuccess?&orderNum=' + that.orderNum,
							})
						}else if(res.errCode == -1) {//错误
							uni.showToast({
								title: '支付失败，请重新支付',
								icon: 'none'
							})
							uni.redirectTo({
								url:'./CTKYPayFail?&orderNum=' + that.orderNum,
							})
						}else if(res.errCode == -2) {//用户取消
							uni.showToast({
								title: '您取消了支付',
								icon: 'none'
							})
						}
					},
										
					fail: function(ee) {
						console.log(ee)
						uni.showModal({
							title:'提示',
							content:ee,
							showCancel:false
						})
						uni.showToast({
							title: '拉起支付失败，请检查网络后重试',
							icon: 'none',
							duration: 3000
						})
					}
				})
				// #endif
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
