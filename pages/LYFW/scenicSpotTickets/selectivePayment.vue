<template>
	<view>
		<!-- 顶部背景 -->
		<view class="ob_background">
			<image src="../../../static/LYFW/scenicSpotTickets/addOrder/orderBackground.png" mode="aspectFit"></image>
		</view>


		<view class="cover-container">
			<view class="MP_information1">
				<view class="MP_title">{{ticket.title}}</view>
				<text class="MP_text">费用包含：{{ticket.contain}}</text>

				<view class="MP_selectionDate">
					<view class="MP_title">使用时间</view>
					<text class="MP_text">{{date}} &nbsp; {{dateReminder}} &nbsp; 仅限当天</text>
				</view>

				<view class="MP_selectionDate">
					<view class="MP_title">购票人信息</view>
					<view class="MP_userInformation" v-for="(item,index) in addressData" :key="index">
						<text>{{item.name}}</text>
						<text class="Mp_sex">{{item.sex}}</text>
						<text class="Mp_square">{{item.ticketType}}</text>
						<text class="Mp_square" v-if="item.default == true">本人</text>
						<text class="Mp_square" v-if="item.emergencyContact == true">紧急联系人</text>
						<text class="Mp_text">身份证：{{item.codeNum}}</text>
						<text class="Mp_text">手机号：{{item.phoneNum}}</text>
					</view>
				</view>

				<view class="MP_selectionDate">
					<view class="MP_title">费用详情</view>
					<view class="MP_cost" v-if="adultIndex>=1">
						<text>成人票</text>
						<text class="MP_number">×{{adultIndex}}</text>
						<text class="MP_userCost">{{ticket.adultPrice}}</text>
					</view>
					<view class="MP_cost" v-if="childrenIndex>=1">
						<text>儿童票</text>
						<text class="MP_number">×{{childrenIndex}}</text>
						<text class="MP_userCost">¥{{ticket.childPrice}}</text>
					</view>

					<!-- 优惠券 -->
					<view class="MP_cost" v-if="coupon.price>0">
						<text>{{coupon.title}}</text>
						<text class="MP_number">×1</text>
						<text class="MP_total">-&nbsp;¥{{coupon.price}}</text>
					</view>

					<view class="MP_cost">
						<text class="MP_total">共计&nbsp;¥{{actualPayment}}</text>
					</view>
				</view>

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
				立即支付
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				channel: [{
					name: '微信'
				}, {
					name: '支付宝'
				}],
				orderNumber: '', //订单编号
				channeIndex: 0, //选择支付方式
				ticket: '', //门票信息
				addressData: '', //购票人信息
				adultIndex: '', //成人票人数
				childrenIndex: '', //儿童票人数
				actualPayment: '', //实际付款金额
				dateReminder: '', //时间表达（今天，明天，星期X）
				date: '', //数字时间
				coupon: '', //优惠券信息

			}
		},
		onLoad: function(options) {
			// console.log(JSON.parse(options.orderNumber));
			this.orderNumber = options.orderNumber;
			this.lyfwData();
			
			// uni.request({
			// 	url:'',
			// 	data:{
			// 		orderNumber : this.orderNumber
			// 	},
			// 	success: (res) => {
			// 		this.ticket = res.data.ticket;
			// 		this.addressData = res.data.addressData;
			// 		this.actualPayment = res.data.actualPayment;
			// 		this.coupon = res.data.coupon;
			// 		this.date = res.data.date;
			// 		this.dateReminder = res.data.dateReminder;
			// 	}
			// })
		},
		methods: {
			async lyfwData() {
				let res = await this.$api.lyfwfmq('orderInfo');
				this.ticket = res.data.ticket;
				this.addressData = res.data.addressData;
				this.actualPayment = res.data.actualPayment;
				this.coupon = res.data.coupon;
				this.date = res.data.date;
				this.dateReminder = res.data.dateReminder;
				this.screenUser();
			},
			
			//同意购买-点击事件
			Selection: function() {
				if (this.channeIndex == 0) {
					this.channeIndex = 1;
				} else {
					this.channeIndex = 0;
				}
			},

			//数组提取
			screenUser: function() {
				let adult = this.addressData.filter(item => {
					return item.ticketType == '成人';
				})
				let children = this.addressData.filter(item => {
					return item.ticketType == '儿童';
				})
				
				this.adultIndex = adult.length;
				this.childrenIndex = children.length;
			},

			//调起支付
			payment() {
				// uni.requestPayment({
				// 	provider: 'alipay',
				// 	orderInfo: {
				// 		"orderNumber": this.orderNumber,
				// 		"ticket": this.ticket,
				// 		"date": this.date,
				// 		"dateReminder": this.dateReminder,
				// 		"addressData": this.addressData,
				// 		"actualPayment": this.actualPayment,
				// 		"coupon": this.coupon,
				// 		"channe": this.channel[this.channeIndex],
				// 	},
				// 	success: function(res) {
				// 		console.log('success:' + JSON.stringify(res));
				// 	},
				// 	fail: function(err) {
				// 		console.log('fail:' + JSON.stringify(err));
				// 	}
				// })
				
				uni.redirectTo({
					url: '/pages/LYFW/scenicSpotTickets/successfulPayment'
				})
				
			}
			
			
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
		padding: 64upx 30upx;
		position: relative;
		padding-bottom: 32upx;
	}

	//公共样式 - 适用多个数据框
	.MP_information1 {
		border-radius: 16upx;
		background: #FFFFFF;
		padding: 44upx 32upx;
		padding-bottom: 80upx;
		font-size: 32upx;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 24upx;

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
