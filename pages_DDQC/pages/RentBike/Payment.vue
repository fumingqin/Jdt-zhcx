<template>
	<view>
		<view style="margin: 0 40rpx;">
			<view style="display: flex;justify-content: center;padding-top: 40rpx;">
				<text style="font-size: 60rpx;font-weight: bold;">￥{{money}}元</text>
			</view>
			<view style="padding-top: 20rpx;">
				<text style="font-size: 32rpx;">租车点：{{HireStationName}}</text>
			</view>
			<view style="padding-top: 20rpx;">
				<text style="font-size: 32rpx;">还车点：{{RestoreStationName}}</text>
			</view>
			<view style="padding-top: 20rpx;">
				<text style="font-size: 32rpx;">骑行时间：{{Time}}</text>
			</view>
			<!-- <view style="padding-top: 20rpx;">
				<text style="font-size: 36rpx;font-weight: bold;">支付方式</text>
			</view>
			<view style="padding-top: 20rpx;">
				<u-radio-group v-model="payType" style="display: block;" size="40" active-color="#19BE6B">
					<view v-for="(item, index) in PayArr" :key="index" style="padding: 20rpx 0;display: flex;align-items: center;margin-top: 20rpx;justify-content: space-between;border-bottom:1rpx solid #eee;">
						<view style="display: flex;align-items: center;">
							<image :src="item.ImageUrl" style="width: 60rpx;height: 60rpx;"></image>
							<view style="font-size: 36rpx;margin-left: 10rpx;">{{item.name}}</view>
						</view>
						<u-radio :name="item.name" :disabled="item.disabled" icon-size="40"></u-radio>
					</view>
				</u-radio-group>
			</view> -->
			<view style="padding-top: 40rpx;display: flex;justify-content: space-between;">
				<button style="background:linear-gradient(270deg,rgba(83,175,59,1),rgba(40,204,40,1));width: 320rpx;border-radius: 60px; "
				 @click="payNow">
					<text style="color: #FFF;">{{buttonName}}</text>
				</button>
				<button style="background:#BCBCBC;width: 320rpx;border-radius: 60px;" @click="NotPay">
					<text style="color: #FFF;">暂不支付</text>
				</button>
			</view>
			<view style="position: fixed;bottom:100rpx;left: 0;right: 0;">
				<view style="text-align: center;">
					<view>
						<text style="color: #333;font-size: 30rpx;">对费用有疑问？请联系</text>
						<text style="color:#F35A46;font-size: 30rpx;font-weight: 300;" @click="makePhone">客服</text>
					</view>
					<text style="color: #007AFF;font-size: 30rpx;">{{phoneNumber}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				money: 0,
				beginTime: '',
				endTime: '',
				Time: '',
				orderId: '',
				buttonName: '立即支付',
				payTime: '',
				userInfo: '',
				HireStationName: '',
				RestoreStationName: '',
				phoneNumber: '', //客服热线
				PayArr: [{
						name: '钱包',
						disabled: false,
						ImageUrl: '../../static/GRZY/touxiang.png'
					},
					{
						name: '微信',
						disabled: false,
						ImageUrl: '../../static/GRZY/wechat.png'
					}
				],
				payType: '钱包',
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || '';
			this.GetOrderByUserID();
			// this.getOrderInfo();

		},
		onShow() {
			var that = this;
			//获取客服热线
			uni.getStorage({
				key: 'ConsumerHotline',
				success(res) {
					that.phoneNumber = res.data.Phone1
				}
			})
		},
		onBackPress() { //禁用手机返回键
			return true;
		},
		onNavigationBarButtonTap() {
			this.updateOrder();
		},
		methods: {
			makePhone: function() {
				uni.makePhoneCall({
					phoneNumber: this.phoneNumber
				})
			},
			payNow: function() { //立即支付  
				// uni.showLoading({
				// 	title: '支付中',
				// 	mask: true
				// })
				if (this.money > 0) {
					if (this.payType == "钱包") {
						this.walletPayment();
					} else if (this.payType == "微信") {
						this.getPaymentInformation();
					}
				} else {
					uni.redirectTo({
						url: "../GRZY/zy_homepage"
					})
				}
			},
			NotPay: function() { //暂不支付
				uni.redirectTo({
					url: "../GRZY/zy_homepage"
				})
			},
			//---------------------------------钱包支付---------------------------------
			//每次调钱包接口都要调一次钱包消费接口
			walletPayment: function() {
				let that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetTransaction.Url,
					method: $DDTInterface.DDTInterface.GetTransaction.method,
					header: {
						'content-type': 'application/json'
					},
					data: {
						phoneNumber: that.userInfo.phoneNumber,
						orderId: that.orderId,
						amount: (that.money) * 100,
						// amount: 10,
						transTime: that.getNowTiem(), //交易时间
						transType: 1, //1自行车消费，2公交车消费
						extra: '',
						userID: that.userInfo.userID,
					},
					success(res) {
						uni.hideLoading();
						console.log('钱包消费返回数据', res)
						if (res.data.status == true) {
							//消费成功之后不需要调消费记录接口，后台已经调了
							uni.showToast({
								title: '支付成功'
							})
							setTimeout(function() {
								uni.redirectTo({
									url: '../GRZY/zy_homepage'
								})
							}, 1500)
						} else if (res.data.msg == '退款失败未交押金或者余额不足' || res.data.msg == '不支持该请求' || res.data.msg == '系统内部错误' || res.data
							.msg == '余额不足' || res.data.msg == '该订单已支付过，无需重复支付' || res.data.msg == '没有该用户的钱包信息') {
							uni.showModal({
								title: res.data.msg,
								success(res) {
									if (res.confirm) {
										setTimeout(function() {
											uni.redirectTo({
												url: '../GRZY/zy_homepage'
											})
										}, 1500)
									}
								}
							})
						} else {
							uni.showModal({
								title: "支付失败",
								success(res) {}
							})
						}
					},
					fail(res) {
						uni.hideLoading();
						uni.showToast({
							title: "网络连接失败",
							icon: 'none'
						})
					}
				})
			},
			GetBizStatus: function() {
				uni.request({
					url: $DDTInterface.DDTInterface.GetBizStatus.Url,
					method: $DDTInterface.DDTInterface.GetBizStatus.method,
					header: {
						'content-type': 'application/json'
					},
					data: {
						loginname: that.userInfo.phoneNumber,
						userID: that.userInfo.userID,
					},
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			getNowTiem: function() { //获取当前时间,消费时要用
				var date = new Date();
				var year = date.getFullYear();
				var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				this.payTime = year + month + day + hours + minutes + seconds;
				return year + month + day + hours + minutes + seconds;
			},
			GetOrderByUserID: function() {
				var that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				setTimeout(function() {
					uni.request({
						url: $DDTInterface.DDTInterface.GetOrderByUserID.Url,
						method: $DDTInterface.DDTInterface.GetOrderByUserID.method,
						data: {
							UserID: that.userInfo.userId,
						},
						success(res) {
							console.log(res)
							uni.hideLoading();
							if (res.data.status) {
								if (res.data.data[0].PayState == 1) {
									uni.showToast({
										title: '订单已支付',
										icon: 'none'
									})
									setTimeout(function() {
										uni.redirectTo({
											 url: '../GRZY/zy_homepage'
										})
									}, 1500)
								} else {
									that.beginTime = res.data.data[0].HireTime;
									that.endTime = res.data.data[0].RestoreTime;
									that.money = (res.data.data[0].Money) / 100;
									that.HireStationName = res.data.data[0].HireStationName
									that.RestoreStationName = res.data.data[0].RestoreStationName;
									if (that.money == 0) {
										that.buttonName = '立即完成';
									}
									that.StrokeID = res.data.data[0].StrokeID;
									that.orderId = res.data.data[0].OrderId;
									that.timeConcer(that.beginTime, that.endTime);
								}
							}
						},
						fail() {
							console.log(res)
							uni.hideLoading();
						}
					})
				}, 1500)
			},
			getOrderInfo: function() { //查询最后一条行程信息
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetOrder.Url,
					method: $DDTInterface.DDTInterface.GetOrder.method,
					header: {
						'content-type': 'application/json'
					},
					data: {
						phoneNo: that.userInfo.phoneNumber,
						startIndex: 0,
						retcount: 1,
						userID: that.userInfo.userID,
					},
					success(res) {
						if (res.data.status == true) {
							console.log(res);
							that.beginTime = res.data.data[0].HireAction.Time;
							that.endTime = res.data.data[0].RestoreAction.Time;
							that.money = (res.data.data[0].Money) / 100;
							if (that.money == 0) {
								that.buttonName = '立即完成';
							}
							that.HireStationName = res.data.data[0].HireAction.StationName
							that.RestoreStationName = res.data.data[0].RestoreAction.StationName;
							that.orderId = res.data.data[0].OrderId;
							that.timeConcer(that.beginTime, that.endTime);
						}
						console.log(res)
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			timeConcer: function(value, value2) { //时间转换
				var that = this;
				var value = value.replace(" ", "T")
				var value2 = value2.replace(" ", "T")
				var begindate = new Date(value + "+08:00").getTime();
				var enddate = new Date(value2 + "+08:00").getTime();
				var date = parseInt((enddate - begindate) / 1000);
				if (date > 60) {
					that.Time = that.Timechange(date);
				} else {
					that.Time = date + "秒"
				}
			},
			Timechange: function(time) { //时间转换
				var that = this;
				var date = parseInt(time / 3600 / 24);
				var hours = 0;
				var minutes = 0;
				var seconds = 0;
				if (date >= 1) {
					hours = parseInt((time - date * 24 * 3600) / 3600);
					if (hours >= 1) {
						minutes = Math.ceil((time - date * 24 * 3600 - hours * 3600) / 60);
						if (minutes >= 1) {
							// seconds = time -date*24*3600-  hours * 3600 - minutes * 60
							return date + "天" + hours + "小时" + minutes + "分钟";
						} else {
							return date + "天" + hours + "小时";
							// seconds = time -date*24*3600-  hours * 3600;
						}
					} else {
						minutes = Math.ceil(time / 60);
						if (minutes >= 1) {
							return date + "天" + minutes + "分钟";
							// seconds = time -date*24*3600-minutes * 60
						} else {
							return date + "天";
							// seconds = time-date*24*3600;
						}
					}
				} else {
					hours = parseInt(time / 3600)
					if (hours >= 1) {
						minutes = Math.ceil((time - hours * 3600) / 60);
						if (minutes >= 1) {
							// seconds = time - hours * 3600 - minutes * 60
							return hours + "小时" + minutes + "分钟";
						} else {
							return hours + "小时";
							// seconds = time - hours * 3600;
						}
					} else {
						minutes = Math.ceil(time / 60);
						if (minutes >= 1) {
							return minutes + "分钟";
							// seconds = time - minutes * 60
						} else {
							// seconds = time;
						}
					}
				}
			},
			updateOrder: function() {
				var that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				uni.request({
					url: $DDTInterface.DDTInterface.UpdateOrder.Url,
					method: $DDTInterface.DDTInterface.UpdateOrder.method,
					header: {
						'content-type': 'application/json'
					},
					data: {
						PhoneNo: that.userInfo.phoneNumber,
						StrokeID: that.StrokeID,
					},
					success(res) {
						console.log(res)
						that.GetOrderByUserID();
					}
				})
			},


			getPaymentInformation: function() { //获取支付信息
				let that = this;
				var payPlatform = 3;
				uni.request({
					url: 'https://zntc.145u.net:9099/api/Pay/getCommonPayparameter',
					method: "POST",
					header: {
						'content-type': 'application/json'
					},
					data: {
						payType: 3,
						price: that.money,
						orderNumber: that.orderId,
						goodsName: that.phoneNumber,
						billDescript: "自行车费用", 
					},
					success(res) {
						console.log(res)
						that.payment(res.data.data)
					},
					fail(err) {
						console.log(err)
					}
					
				})
			},
			showToast: function(msg) {
				uni.showToast({
					title: msg,
					icon: "none",
					mask: true
				})
			},
			payment: function(orderInfo) { //支付
				let that = this;
				uni.requestPayment({
					//#ifdef MP-WEIXIN
					timeStamp: orderInfo.timeStamp,
					nonceStr: orderInfo.nonceStr,
					package: orderInfo.package,
					signType: orderInfo.signType,
					paySign: orderInfo.paySign,
					// #endif
					// #ifdef APP-VUE
					provider: "wxpay",
					orderInfo: orderInfo,
					// #endif
					success(res) {

					},
					fail(res) {
						var msg = "requestPayment:fail canceled";
						// #ifdef MP-WEIXIN
						msg = "requestPayment:fail cancel";
						// #endif
						if (res.errMsg == msg) {
							setTimeout(function() {
								that.showToast("支付失败，请重新支付")
							}, 1000)
						} else {
							that.showToast("网络连接失败")
						}
					}
				})
			},


		}
	}
</script>

<style>
	uni-button:after {
		border: unset
	}

	button::after {
		border: none;
	}
</style>
