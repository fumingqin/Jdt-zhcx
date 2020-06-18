<template>
	<view>
		<!-- 顶部滑动 -->
		<view class="screen">
			<view class="screenView">
				<view class="screenText" :class="{current:type===0}" @click="tabClick(0)">
					骑行权益
				</view>
				<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
					骑行记录
				</view>
			</view>
		</view>

		<!-- 骑车权益 -->
		<view v-if="type==0">
			<!-- 信息 -->
			<view class="hp_view">
				<view class="ve_view">
					<!-- 金额 -->
					<view class="ve_Text" @click="natTo(1)">
						<view class="tx_text1">金额</view>
						<view class="tx_text2">{{balance}}<text class="tx_text3">元</text></view>
					</view>
					<!-- 卡券 -->
					<view class="ve_Text" @click="Jump">
						<view class="tx_text1">骑行数</view>
						<view class="tx_text2">{{personalHomepage.coupon}}<text class="tx_text3">次</text></view>
					</view>
					<!-- 押金 -->
					<view class="ve_Text" v-if="depositStatus==0" @click="open1">
						<image class="tx_img" src="../../static/GRZY/chongzhi.png"></image>
						<view class="tx_text1">押金</view>
						<view class="tx_text2">0<text class="tx_text3">元</text></view>
					</view>

					<view class="ve_Text" v-if="depositStatus==1" @click="open2">
						<view class="tx_text1">押金</view>
						<view class="tx_text2">{{deposit}}<text class="tx_text3">元</text></view>
					</view>
				</view>
			</view>

			<!-- 套餐 -->
			<!-- <view class="ve_view2" @click="natTo('/pages_DDQC/pages/GRZY/combo')">
				<image class="vi_image" src="../../static/GRZY/taocan.png" mode="aspectFill"></image>
			</view> -->

			<!-- 电话客服 -->
			<view class="ve_view3" @click="makePhone">
				<text class="vi_text">电话客服</text>
				<text class="jdticon icon-you"></text>
			</view>
			<!-- 我要投诉 -->
			<view class="ve_view4" @click="natTo('/pages_GRZX/pages/GRZX/gz_complaintList')">
				<text class="vi_text2">我要投诉</text>
				<text class="jdticon icon-you"></text>
			</view>
			<!-- 我的反馈 -->
			<!-- <view class="ve_view4">
				<text class="vi_text2">我的反馈</text>
				<text class="jdticon icon-you"></text>
			</view> -->
			<!-- 充值金额 -->
			<view class="ve_view4" @click="natTo(2)">
				<text class="vi_text2">充值金额</text>
				<text class="jdticon icon-you"></text>
			</view>
			<!-- 二维码 -->
			<view class="ve_view4" @click="QRCodeData">
				<text class="vi_text2">公交二维码</text>
				<text class="jdticon icon-you"></text>
			</view>
			<!-- 二维码 -->
			<uni-popup ref="popup1" type="bottom">
				<view class="po_boxVlew" style="align-items: center;">
					<view class="bv_topText">
						<text class="tt_text">二维码</text>
						<text class="tt_icon jdticon icon-fork " @click="close(1)"></text>
					</view>
					<view style=" width: 300rpx;margin-left: 230rpx;">
						<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
					</view>
				</view>
			</uni-popup>
			<!-- 押金支付弹框 -->
			<uni-popup ref="popup" type="bottom">
				<view class="po_boxVlew">
					<view class="bv_topText">
						<text class="tt_text">押金充值</text>
						<text class="tt_icon jdticon icon-fork " @click="close(1)"></text>
					</view>
					<!-- 充值金额 -->
					<view class="bv_rechargeAmount">
						<text class="ra_text">充值金额:</text>
						<text class="ra_text2">&nbsp;￥{{personalHomepage.deposit}}</text>
					</view>
					<!-- 支付方式 -->
					<view class="bv_rechargeAmount2">
						<text class="ra_text">支付方式:</text>
						<image class="ra_img" src="../../static/GRZY/weixin.png"></image>
						<text class="ra_text2">微信支付</text>
					</view>
					<view class="tjButton" @click="GetRefund">确认支付</view>
					<view class="vi_bottom"></view>
				</view>
			</uni-popup>

			<!-- 押金退款弹框 -->
			<uni-popup ref="popup2" type="bottom">
				<view class="po_boxVlew">
					<view class="bv_topText">
						<text class="tt_text">押金退款</text>
						<text class="tt_icon jdticon icon-fork " @click="close2(1)"></text>
					</view>
					<!-- 退押金 -->
					<view class="bv_rechargeAmount">
						<text class="ra_text">退款金额:</text>
						<text class="ra_text2">&nbsp;￥{{deposit}}</text>
					</view>
					<view class="tjButton2" @click="GetRefund2">确认退款</view>
					<view class="vi_bottom"></view>
				</view>
			</uni-popup>
		</view>

		<!-- 骑行记录 -->
		<view v-if="type==1">
			<!-- 顶部里程 -->
			<view class="ve_top">
				<view class="ve_view">
					<!-- 里程 -->
					<view class="ve_Text">
						<view class="tx_text1">里程</view>
						<view class="tx_text2">{{personalHomepage.mileage}}</view>
					</view>
					<!-- 减排 -->
					<view class="ve_Text">
						<view class="tx_text1">减排(千克)</view>
						<view class="tx_text2">{{personalHomepage.emissionReduction}}</view>
					</view>
					<!-- 消耗 -->
					<view class="ve_Text">
						<view class="tx_text1">消耗(千克)</view>
						<view class="tx_text2">{{personalHomepage.consume}}</view>
					</view>
				</view>
			</view>

			<!-- 行车记录 -->
			<view class="ve_record" v-for="(item,index) in drivingRecord" :key="index" @click="Jump2(index)">
				<view>
					<text v-if="item.RentType==0" class="rc_text">有桩车</text>
					<text v-if="item.RentType==1" class="rc_text">无桩车</text>
					<!-- <text class="rc_text">{{item.model}}</text> -->
				</view>
				<view style="display: flex;">
					<text class="rc_text2">{{item.HireTime}}</text>
					<!-- <text class="rc_text3">{{item.time}}</text> -->
					<!-- <text class="rc_text3">{{item.timeUse}}分钟</text> -->
				</view>

				<view style="display: flex;position: absolute;right: 0;top: 41%;padding-right: 30upx;">
					<text class="rc_text4">{{item.PayPrice/100}}<text class="rc_text5">元</text></text>
					<text class="jdticon icon-you"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	import uniPopup from '@/pages_DDQC/components/GRZY/uni-popup/uni-popup.vue';
	import uQRCode from '@/pages_DDQC/components/GRZY/uni-qrcode/uqrcode.js';
	export default {
		components: {
			uniPopup,
		},
		data() {
			return {
				userInfo: [], //用户信息
				type: 0,
				balance: 0, //钱包金额
				deposit: '', //押金金额
				depositStatus: '', //押金状态
				id: '',
				status: '',
				order_no: '',
				personalHomepage: {
					cost: 0.8, //价格
					coupon: 10, //卡券数量
					deposit: 2, //押金
					depositBalance: 0,

					mileage: 20, //总里程
					emissionReduction: 0.6, //减排
					consume: 689, //消耗
				},

				drivingRecord: '', //行车记录
				HireCoord:'',//租车经纬度
				RestoreCoord:'',//还车经纬度
				bicycleOrderInfo:'',
				
				qrcodeText: 'uQRCode',
				qrcodeSize: 150,
				qrcodeSrc: '',
				paymentData: [], //支付参数
			}
		},
		onLoad() {
			// this.lunBoInit();

		},
		onShow() {
			var that = this;
			that.getUserInfo();
		},
		methods: {
			
			//--------------------------读取用户信息--------------------------
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						console.log('用户数据', data)
						that.userInfo = data.data;
						//钱包注册
						// that.GetEnrollment();
						//获取钱包数据
						that.GetUserByUserID();
						// that.GetPurseDetail();
						//获取自行车订单数据
						that.GetOrderByUserID();
					},
					fail(data) {}
				})
			},
			//--------------------------二维码--------------------------
			QRCodeData:function(){
				var that = this;
				uni.request({
					url:$DDTInterface.DDTInterface.GetBusCodeGen.Url,
					method:$DDTInterface.DDTInterface.GetBusCodeGen.method,
					data:{
						phoneNumber:13906963039,
						userID:that.userInfo.userId,
					},
					success(res) {
						console.log('二维码',res)
						if(res.data.status == true){
							that.QRCodeClick(res.data.data.qr)
						}
					},
					fail(res) {
						console.log('获取钱包数据失败',res)
					}
				})
			},
			QRCodeClick:function(param){
				var that = this;
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})
				
				uQRCode.make({
					canvasId: 'qrcode',
					text: param,
					size: that.qrcodeSize,
					margin: 10,
					success: res => {
						that.qrcodeSrc = res
					},
					complete: () => {
						uni.hideLoading()
					}
				})
				that.$refs.popup1.open()
			},
			//--------------------------获取钱包数据--------------------------
			GetEnrollment: function() {
				var that = this;
				console.log(that.userInfo.phoneNumber)
				uni.request({
					url: 'http://111.231.109.113:8004/api/Purse/GetEnrollment',
					method: 'POST',
					data: {
						phoneNumber: that.userInfo.phoneNumber,
						userID: that.userInfo.userId,
						userName: that.userInfo.nickname,
						uuid: that.userInfo.userId,
						userId: '350322199109101514'
					},
					success(res) {
						console.log('钱包注册成功数据', res)
						if (res.msg == '请求成功') {
							uni.showToast({
								title: '请求成功',
								icon: 'none'
							})
						}
					},
					fail(res) {
						console.log('钱包注册失败数据', res)
					}
				})
			},
			GetPurseDetail: function() {
				var that = this;
				uni.showLoading({
					title:'加载中...',
					
				})
				console.log(that.userInfo.phoneNumber);
				console.log(that.userInfo.userId);
				uni.request({
					url: $DDTInterface.DDTInterface.GetPurseDetail.Url,
					method: $DDTInterface.DDTInterface.GetPurseDetail.method,
					data: {
						phoneNumber: that.userInfo.phoneNumber,
						userID: that.userInfo.userId,
					},
					success(res) {
						uni.hideLoading()
						console.log('获取钱包数据成功', res)
						if (res.data.status == true && res.data.msg == '请求成功') {
							that.walletData=res.data.data;
							that.balance = res.data.data.balance/100;
							that.deposit = res.data.data.deposit/100;
							that.depositStatus = res.data.data.depositStatus;
							console.log("测试"+that.depositStatus); 
							that.id = res.data.data.id;
							that.order_no = res.data.data.order_no;
							that.status = res.data.data.status;
						}
						console.log('获取押金状态', that.walletData)
					},
					fail(res) {
						uni.hideLoading()
						console.log('获取钱包数据失败', res)
					}
				})
			},

			//--------------------------押金充值--------------------------
			GetRefund: function() {
				uni.showLoading({
					title: '正在交押金...'
				})
				var that = this;
				that.$refs.popup.close()
				const now = new Date();
				const next = new Date(now.getTime() + 31536000000);
				// console.log(now.toDateString());
				// console.log(next.toDateString());
				uni.request({
					url: $DDTInterface.DDTInterface.GetRecharge.Url,
					method: $DDTInterface.DDTInterface.GetRecharge.method,
					data: {
						channel: 'wechat_app', //微信
						title: '押金充值',
						body: '押金充值',
						phoneNumber: that.userInfo.phoneNumber,
						userID: that.userInfo.userId,
						// timeExpire:timestemp,//过期时间(时间戳)
						chargeType: 0, //0:充值押金 1充值钱包
						totalPrice: that.personalHomepage.deposit, //金额
					},
					success(res) {
						uni.hideLoading();
						console.log('押金充值返回支付参数成功结果', res)
						if (res.data.status == true) {
							let obj = {
								appid: res.data.data.credential.wechat_app.appid,
								noncestr: res.data.data.credential.wechat_app.noncestr,
								package: 'Sign=WXPay', // 固定值，以微信支付文档为主
								partnerid: res.data.data.credential.wechat_app.partnerid,
								prepayid: res.data.data.credential.wechat_app.prepayid,
								timestamp: res.data.data.credential.wechat_app.timestamp,
								sign: res.data.data.credential.wechat_app.sign // 根据签名算法生成签名
							}
							// that.paymentData = res.data.data.credential;
							that.payment(obj);
						}
					},
					fail(res) {
						uni.hideLoading();
						console.log('押金充值返回支付参数失败', res)
					}
				})
			},

			//--------------------------调起支付--------------------------
			payment: function(orderInfo) {
				var that = this;
				// #ifdef APP-PLUS
				console.log(that.paymentData)
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: orderInfo,
					success: function(res) {
						console.log(res)
						if (res.errMsg == 'requestPayment:ok') { //成功
							uni.showToast({
								title: '支付成功'
							})
							that.WirteRechargeLog(1); 
						}else if (res.errMsg == 'requestPayment:fail errors') { //错误
							uni.showToast({
								title: '支付失败，请重新支付',
								icon: 'none'
							})
							that.WirteRechargeLog(0);
						} else if (res.errMsg == 'requestPayment:fail canceled') { //用户取消
							uni.showToast({
								title: '您取消了支付',
								icon: 'none'
							})
							that.WirteRechargeLog(2);
						}
					},

					fail: function(ee) {
						if (res.errMsg == 'requestPayment:errors') { //错误
							uni.showToast({
								title: '支付失败，请重新支付',
								icon: 'none'
								
							})
							that.WirteRechargeLog(0);
						} else if (res.errMsg == 'requestPayment:fail') { //用户取消
							uni.showToast({
								title: '您取消了支付',
								icon: 'none'
							})
							that.WirteRechargeLog(2);
						}
					}
				})
				// #endif
			},

			//--------------------------钱包消费接口--------------------------
			GetTransaction: function() {
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetTransaction.Url,
					method: $DDTInterface.DDTInterface.GetTransaction.method,
					data: {

					},
					success(res) {
						console.log('钱包消费', res)
						if (res.status == true) {
							that.paymentData = res.data.credential;
							that.payment();
						}
					},
					fail(res) {
						console.log('钱包消费', res)
					}
				})
			},

			//------------------押金充值记录---------------------------------

			WirteRechargeLog: function(state) {
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.WirteRechargeLog.Url,
					method: $DDTInterface.DDTInterface.WirteRechargeLog.method,
					data: {
						channel: 'wechat_app',
						title: '押金充值记录',
						body: "钱包充值记录测试",
						phoneNumber: that.userInfo.phoneNumber,
						// timeExpire
						chargeType: 0,
						totalPrice: that.personalHomepage.deposit,
						userID: that.userInfo.userId,
						state: state,
						id: that.id,
					},
					success(res) {
						console.log('押金充值记录成功', res);
						uni.showLoading()
						setTimeout(function(){
							that.GetPurseDetail();
						},3000)
						
					},
					fail(res) {
						console.log('押金充值记录失败', res)
						uni.showLoading()
						setTimeout(function(){
							that.GetPurseDetail();
						},3000)
					}
				})
			},

			//--------------------------钱包退押金--------------------------
			GetRefund2: function() {
				var that = this;
				uni.showLoading({
					title: '正在退押金...'
				})
				that.$refs.popup2.close()
				uni.request({
					url: $DDTInterface.DDTInterface.GetRefund.Url,
					method: $DDTInterface.DDTInterface.GetRefund.method,
					data: {
						userMobileNumber: that.userInfo.phoneNumber,
						userID: that.userInfo.userId,
						requestType: 2, // 2:退款押金
					},
					success(res) {
						uni.hideLoading();
						console.log('钱包退押金成功', res)
						if (res.data.status == true) {
							uni.showToast({
								title: '押金退款成功',
								icon: 'none',
							})
							that.GetUserByUserID();
							that.WriteRefundLog();
						} else if (res.data.status == false) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							that.WriteRefundLog();
						}
					},
					fail(res) {
						uni.hideLoading();
						console.log('钱包退押金失败', res)
					}
				})
			},

			//--------------------------查询自行车订单--------------------------

			GetOrderByUserID: function() {
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetOrderByUserID.Url,
					method: $DDTInterface.DDTInterface.GetOrderByUserID.method,
					data: {
						UserID: that.userInfo.userId,
					},
					success(res) {
						console.log('查询自行车订单', res)
						that.drivingRecord = res.data.data;
					},
				})
			},

			//--------------------------押金退款记录--------------------------

			WriteRefundLog: function() {
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.WriteRefundLog.Url,
					method: $DDTInterface.DDTInterface.WriteRefundLog.method,
					data: {
						userMobileNumber: that.userInfo.phoneNumber,
						requestType: 2,
						userID: that.userInfo.userId,
						state: that.status,
						id: that.id,
						order_no: that.order_no
					},
					success(res) {
						console.log('押金退款记录成功', res);
						if(res.data.status==true){
							// that.deposit=0;
							// that.depositStatus=0;
							// uni.showLoading()
							// setTimeout(function(){
							// 	that.GetPurseDetail();
							// },3000)
							
						}
					},
					fail(res) {
						console.log('押金退款记录失败', res)
						// uni.showLoading()
						// setTimeout(function(){
						// 	that.GetPurseDetail();
						// },3000)
						
					}
				})
			},

			//------------------------模拟数据----------------------------------------------

			// async lunBoInit() {
			// 	let drivingRecord = await this.$api.lyfwcwd('drivingRecord');
			// 	this.drivingRecord = drivingRecord.data;
			// },

			//------------------------------弹框事件-----------------------------------------

			open1() {
				this.checkRealName(3)
			},
			//关闭
			close(e) {
				if (e == 1) {
					this.$refs.popup.close()
				}
			},

			//退款弹框
			open2() {
				this.checkRealName(4);
			},
			//关闭
			close2(e) {
				if (e == 1) {
					this.$refs.popup2.close()
				}
			},

			//-----------------tab事件---------------------------------------
			tabClick(e) {
				if (e == 0) {
					this.type = 0;
				} else if (e == 1) {
					this.type = 1;
				} else if (e == 2) {
					this.type = 2;
				} else if (e == 3) {
					this.type = 3;
				}

			},

			natTo: function(e) {
				if (e == 1) {
					this.checkRealName(e);
				} else if (e == 2) {
					this.checkRealName(e);
				} else {
					uni.navigateTo({
						url: e
					})
				}
			},

			//-------------------------------------检查是否实名----------------------------------
			checkRealName(e) {
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetUserByUserID.Url,
					method: $DDTInterface.DDTInterface.GetUserByUserID.method,
					data: {
						userID: that.userInfo.userId,
					},
					success(res) {
						console.log(res)
						if(that.userInfo!==''){
							if (res.data.data == "" || res.data.data.UserName == "" || res.data.data.UserIDNumber == "") {
								//实名认证
								uni.navigateTo({
									url: that.$GrzxInter.Route.realName.url,
								})
							} else if (res.data.data.RealNameStatus !== 1) {
								//上传图片
								uni.navigateTo({
									url: that.$GrzxInter.Route.uploadPhoto.url,
								})
							} else {
								if (e == 1) {
									uni.navigateTo({
										url: './wallet'
									})
								} else if (e == 2) {
									uni.navigateTo({
										url: './topUp'
									})
								} else if (e == 3) {
									// 需要在 popup 组件，指定 ref 为 popup
									that.$refs.popup.open()
								} else if (e == 4) {
									// 需要在 popup 组件，指定 ref 为 popup
									that.$refs.popup2.open()
								} else if (DepositType == 2) {
									uni.showToast({
										title: '免押金用户',
										icon: 'none'
									})
								}
							}
						}else{
							uni.navigateTo({
								url:'../../../pages/GRZX/userLogin'
							})
						}
					}
				})
			},
			
			//--------------------读取信息-------------------------
			GetUserByUserID:function(){  
				var that = this;
				console.log(that.userInfo)
				uni.request({
					url: $DDTInterface.DDTInterface.GetUserByUserID.Url,
					method: $DDTInterface.DDTInterface.GetUserByUserID.method,
					data: {
						userID: that.userInfo.userId,
					},
					success(res) {
						console.log('呀呀呀'+JSON.stringify(res) )
						that.depositStatus=res.data.data.DepositType;
						console.log(that.depositStatus);
						if(that.depositStatus){
							that.GetPurseDetail();
						}
					},
					fail(err) {
						console.log('读取信息',err)
					}
				})
			},

			makePhone: function() {
				uni.makePhoneCall({
					phoneNumber: '17764540647'
				})
			},

			Jump() {
				this.type = 1
			},

			Jump2: function(e) {
				var that = this;
				uni.setStorage({
					key: 'bicycleOrderInfo',
					data: that.drivingRecord[e],
					success: () => {
						uni.navigateTo({
							url: './zy_details'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f5f9fc;
	}

	//筛选样式
	.screen {
		height: 87upx;
		background-color: #f5f9fc;
		position: sticky;
		top: 0;
		z-index: 1;

		.screenView {
			left: 0;
			display: flex;
			width: 50%;
			height: 87upx;
			z-index: 10;
			position: sticky;
			top: 0;
			// background-color: #F5F5F5;
			margin-top: 20upx;

			.screenText {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30upx;
				color: #888;
				position: relative;



				&.current {
					color: #70c778;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 104upx;
						height: 0;
						border-bottom: 4upx solid #70c778;
					}
				}
			}
		}
	}

	//顶部信息
	.hp_view {
		position: relative;
		background: linear-gradient(left, #ebd1b0, #c59a7a);
		width: 694upx;
		height: 246upx;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 50upx;
		border-radius: 10px;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);

		.ve_view {
			position: absolute;
			display: flex;
			width: 694upx;
			height: 246upx;
			left: 0;
			top: 0;

			.ve_Text {
				width: 33%;
				height: 246upx;
				text-align: center;
				font-family: Source Han Sans SC;

				.tx_img {
					position: absolute;
					width: 64upx;
					height: 40upx;
					padding-top: 109upx;
				}

				.tx_text1 {
					font-size: 32upx;
					color: #78482a;
					margin-top: 62upx;
					font-family: Source Han Sans SC;
				}

				.tx_text2 {
					font-size: 51upx;
					color: #78482a;
					font-weight: bold;
					margin-top: 23upx;
					font-family: Source Han Sans SC;

					.tx_text3 {
						font-size: 31upx;
						color: #78482a;
						font-family: Source Han Sans SC;
					}
				}
			}
		}
	}

	//套餐
	.ve_view2 {
		width: 694upx;
		height: 246upx;
		border-radius: 10px;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 20upx;

		.vi_image {
			width: 694upx;
			height: 284upx;
			overflow: hidden;
			margin: 0 auto;
		}
	}

	//套餐
	.ve_view3 {
		display: flex;
		position: relative;
		width: 629upx;
		height: 100%;
		border-radius: 10px;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 48upx;
		padding: 33upx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		background-color: #FFFFFF;

		.vi_text {
			font-size: 32upx;
		}

		.jdticon {
			padding-right: 33upx;
			position: absolute;
			padding-top: 7upx;
			text-align: center;
			right: 0;
		}
	}

	.ve_view4 {
		display: flex;
		position: relative;
		width: 629upx;
		height: 100%;
		border-radius: 10px;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 36upx;
		padding: 33upx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		background-color: #FFFFFF;

		.vi_text2 {
			font-size: 32upx;
		}

		.jdticon {
			padding-right: 33upx;
			position: absolute;
			padding-top: 7upx;
			text-align: center;
			right: 0;
		}
	}

	//---支付弹框样式-----
	//顶部
	.po_boxVlew {
		z-index: 999;
		background-color: #FFFFFF;
		border-radius: 28upx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.bv_topText {
		display: flex;
		position: relative;
		padding-top: 48upx;
		padding-left: 42upx;
		padding-right: 42upx;

		.tt_text {
			font-size: 38upx;
			margin: 0 auto;
		}

		.tt_icon {
			position: absolute;
			font-size: 32upx;
			right: 0;
			padding-right: 42upx;
		}
	}

	//充值价格
	.bv_rechargeAmount {
		padding-top: 83upx;
		padding-left: 112upx;

		.ra_text {
			font-size: 34upx;
		}

		.ra_text2 {
			font-size: 34upx;
			color: #F35A46;
			padding-left: 18upx;
		}
	}

	//支付方式
	.bv_rechargeAmount2 {
		padding-top: 50upx;
		padding-left: 112upx;

		.ra_text {
			font-size: 34upx;
		}

		.ra_img {
			width: 30upx;
			height: 27upx;
			padding-left: 18upx;
		}

		.ra_text2 {
			font-size: 34upx;
			padding-left: 10upx;
		}
	}

	//底部按钮
	.tjButton {
		padding: 24upx 0;
		border-radius: 64upx;
		margin: 62upx 40upx 0 40upx;
		background: #70c778;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}

	//底部按钮
	.tjButton2 {
		padding: 24upx 0;
		border-radius: 64upx;
		margin: 62upx 40upx 0 40upx;
		background: #ffaa15;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}

	.vi_bottom {
		padding-top: 40upx;
	}

	//总里程表
	.ve_top {
		position: relative;
		background: #FFFFFF;
		width: 694upx;
		height: 246upx;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 50upx;
		border-radius: 10px;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);

		.ve_view {
			position: absolute;
			display: flex;
			width: 694upx;
			height: 246upx;
			left: 0;
			top: 0;

			.ve_Text {
				width: 33%;
				height: 246upx;
				text-align: center;
				font-family: Source Han Sans SC;

				.tx_img {
					position: absolute;
					width: 64upx;
					height: 40upx;
					padding-top: 109upx;
				}

				.tx_text1 {
					font-size: 32upx;
					color: #666666;
					margin-top: 62upx;
					font-family: Source Han Sans SC;
				}

				.tx_text2 {
					font-size: 51upx;
					// color: #78482a;
					font-weight: bold;
					margin-top: 23upx;
					font-family: Source Han Sans SC;

				}
			}
		}
	}

	//行车记录
	.ve_record {
		position: relative;
		background: #FFFFFF;
		width: 642upx;
		height: 100%;
		margin-left: 29upx;
		margin-right: 29upx;
		margin-top: 20upx;
		padding: 41upx 26upx;
		border-radius: 10px;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);

		.rc_text {
			font-size: 34upx;
			font-weight: bold;
		}

		.rc_text2 {
			font-size: 32upx;
			color: #666666;
			padding-top: 20upx;
		}

		.rc_text3 {
			font-size: 32upx;
			color: #666666;
			padding-top: 20upx;
			padding-left: 20upx;
		}

		.rc_text4 {
			font-size: 34upx;
			font-weight: bold;

			.rc_text5 {
				font-size: 32upx;
				font-weight: bold;
			}
		}

		.jdticon {
			font-size: 34upx;
			padding-left: 4upx;
			padding-top: 9upx;
		}
	}
</style>
