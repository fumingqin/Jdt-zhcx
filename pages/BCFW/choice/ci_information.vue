<template>
	<view class="ci_view">
		<view class="ci_titleView">
		</view>

		<!-- 出发信息 -->
		<view class="ci_siteView">
			<view class="cs_departureContents1">
				<view class="cs_depart">出发地 &nbsp;<text class="cs_departName">{{charteredBus.departName}}</text></view>
				<view class="cs_borun">目的地 &nbsp;<text class="cs_borunName">{{charteredBus.borunName}}</text></view>
			</view>
			<view class="cs_departureContents2">
				<view class="cs_go">出发时间 &nbsp;<text class="cs_date">{{charteredBus.date}}</text></view>
				<view class="cs_days">包车天数 &nbsp;<text class="cs_number">{{charteredBus.number}}天</text></view>
			</view>
		</view>

		<!-- 车型信息 -->
		<view class="ci_carModelView">
			<text class="cmv_selected">已选车型</text>
			<image class="cmv_car" :src="charteredBus.car"></image>
			<text class="cmv_carName">{{charteredBus.carName}}</text>
			<text class="cmv_carType">{{charteredBus.carType}}</text>
			<text class="cmv_carMoney">{{charteredBus.carMoney}}元</text>
		</view>

		<!-- 包车人信息 -->
		<view class="ci_charteredBusView">
			<text class="cbv_charteredBusMessage">包车人信息</text>
			<text class="cbv_explain">仅需填写一人信息，填写后自动保存至通讯录</text>
			<view class="phoneClass">
				<text class="cbv_tripMan">出行人</text>
				<input placeholder="请输入姓名" class="cbv_name" name="nickName" maxlength="4" v-model="nickName" />
				<image class="cbv_addressBook" src="../../../static/BCFW/choice/tongxun.png" @click="choiceUser(1)"></image>
			</view>
			<view class="idView">
				<view class="cbv_idCord">身份证</view>
				<input placeholder="请输入身份证件号" class="cbv_id" name="nickeId" type="number" maxlength="18" v-model="nickId" />
			</view>
			<view class="phoneView">
				<view class="cbv_mobile">联系电话</view>
				<input placeholder="常用手机号" class="cbv_phone" name="nickPhone" type="number" maxlength="11" v-model="nickPhone" />
			</view>
		</view>

		<view class="ci_couponView" @click="toggleMask('show')">
			<text class="cv_coupon">优惠券</text>
			<text class="cv_noUsable">无可用</text>
			<text class="cv_symbol">></text>
		</view>
		<!-- 呼出优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="couponTitle">
					<text class="Co_text1">优惠券</text>
					<text class="Co_text2" @click="couponReset">不使用优惠券</text>
				</view>

				<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @click="couponEvent(index)">
					<view class="con">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期至2019-06-30</text>
						</view>

						<view class="right">
							<text class="price">{{item.price}}</text>
							<text>满{{couponList[index].condition}}可用</text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">限新用户使用</text>
				</view>
			</view>
		</view>

		<!-- 包车须知 -->
		<view class="ci_noticeView">
			<text class="nv_charteredBusNotice">包车须知</text>
			<text class="nv_all" @click="open()">点击查看全部</text>
			<radio class="nv_radio" value="1" :color="'#ffaa7f'" :checked="selectedValue===1 ? true : false" @click="Selection"></radio>
		</view>

		<!-- 须知弹窗 -->
		<uni-popup ref="popup2" type="bottom">
			<view class="boxVlew">
				<view class="titleView">
					<text class="Nb_text1">包车须知</text>
					<text class="Nb_text2 jdticon icon-fork " @click="close()"></text>
				</view>
				<scroll-view class="noticeBox" scroll-y="ture">
					<text class="Nb_text4">
						{{charteredBus.security}}
					</text>
				</scroll-view>
			</view>
		</uni-popup>
		<view class="ci_affirmView">
			<text class="av_money">￥{{charteredBus.carMoney}}</text>
			<view class="av_atOnceView">
				<text class="aov_atOnce">立即包车</text>
			</view>
		</view>
		<!-- 	<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{actualPayment}}</text>
				<text class="people">共{{addressData.length}}人</text>
			</view>
		
			<view class="submitChange" :class="{submitColor: selectedValue===1 && addressData.length>0}" @click="submit">
				<text class="submit">立即预订</text>
			</view>
		</view> -->
	</view>
	</view>
</template>

<script>
	import uniPopup from "../../../components/BCFW/choice/uni-popup/uni-popup.vue"
	var name;
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		data() {
			return {
				charteredBus: [],
				nickName: '', //包车人姓名
				nickId: '', //包车人证件号
				nickPhone: '', //包车人联系方式
				maskState: 0, //优惠券面板显示状态
				couponIndex: '请选择优惠券', //优惠券默认内容
				couponColor: '', //优惠券couponID
				couponCondition: '', //优惠券的满足条件值
				admissionTicket: '', //门票内容
				notice: '', //须知内容
				selectedValue: 0, //同意须知的选中值

				couponList: [{
						couponID: '0',
						title: '新用户专享优惠券',
						price: 5,
						condition: 10,
					},
					{
						couponID: '1',
						title: '春节限时限量优惠券',
						price: 50,
						condition: 400,
					},
					{
						couponID: '2',
						title: '大型团购优惠券-今点通限量版',
						price: 100,
						condition: 800,
					},
					{
						couponID: '3',
						title: '大型团购优惠券-今点通限量版',
						price: 200,
						condition: 1000,
					}
				],
			}
		},
		onLoad() {
			this.getcharteredBus();
		},
		onShow : function() {
			uni.getStorage({
				key: 'userInfo',
				fail() {
					uni.showToast({
						icon: 'none',
						title: '未登录无法添加乘车人,请先登录'
					})
					setTimeout(function() {
						uni.navigateTo({
							//loginType=1,泉运登录界面
							//loginType=2,今点通登录界面
							//loginType=3,武夷股份登录界面
							url: '../../GRZX/userLogin?loginType=1'
						})
					}, 500);
				},
				success :() =>{
					uni.getStorage({
						key: 'passengerList',
						success: (res) =>{
							this.nickName=res.data[0].userName;
							this.nickId=res.data[0].userCodeNum;
							this.nickPhone=res.data[0].userPhoneNum;
							 console.log(res.data[0]);						
						}
					})
				}
			})
			
		},
		methods: {
			//获取模拟数据
			async getcharteredBus() {
				let charteredBus = await this.$api.bcfwzyx('charteredBus');
				this.charteredBus = charteredBus.data;
				// console.log(charteredBus)
			},
			// async getnotice() {
			// let notice = await this.$api.bcfwzyx('notice');
			// this.notice = notice.data;
			//  console.log(notice)
			// },

			//查看是否登入
			choiceUser: function(e) {
				if (e == 0) {
					uni.getStorage({
						key: 'userInfo',
						fail() {
							uni.showToast({
								icon: 'none',
								title: '未登录无法添加乘车人,请先登录'
							})
							setTimeout(function() {
								uni.navigateTo({
									//loginType=1,泉运登录界面
									//loginType=2,今点通登录界面
									//loginType=3,武夷股份登录界面
									url: '../../GRZX/userLogin?loginType=1'
								})
							}, 500);
						},
						success() {
							uni.navigateTo({
								url: '../../GRZX/addPassenger?type=add',
							})
						}
					})
				} else if (e == 1) {
					uni.navigateTo({
						url: '../../GRZX/passengerInfo?submitType=1',
					});
				}
			},



			//打开弹窗
			open() {
				this.$refs.popup2.open()
			},
			close() {
				this.$refs.popup2.close()
			},

			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},

			//优惠券赋值
			couponEvent: function(index) {
				if (this.actualPayment >= this.couponList[index].condition) {
					this.couponIndex = '-' + this.couponList[index].price;
					this.couponColor = this.couponList[index].couponID;
					this.couponCondition = this.couponList[index].condition;
					this.numberChange();
					this.toggleMask();
				} else {
					uni.showToast({
						title: '您的实付款未达到条件，请重新选择',
						icon: 'none'
					})
				}

			},

			//取消优惠券
			couponReset: function(index) {
				this.couponIndex = '请选择优惠券';
				this.couponColor = '';
				this.numberChange();
				this.toggleMask();
			},

			//仿穿透事件
			stopPrevent() {},

			numberChange() {
				const a = (this.admissionTicket.ticketAdultPrice * this.adultIndex) + (this.admissionTicket.ticketChildPrice * this
					.childrenIndex);
				if (this.couponColor == '') {
					this.actualPayment = a;
				} else if (a >= this.couponCondition) {
					var total = a - this.couponList[this.couponColor].price;
					this.actualPayment = total;
				} else if (a < this.couponCondition) {
					uni.showToast({
						title: '您的金额不满足优惠券条件，已取消优惠券',
						icon: 'none',
						duration: 2000
					})
					this.couponIndex = '请选择优惠券';
					this.couponColor = '';
					this.couponCondition = 0;
					this.actualPayment = a;
				}
			},
			//同意购买-点击事件
			Selection: function() {
				console.log(this.selectedValue);
				if (this.selectedValue == 0) {
					this.selectedValue = 1;
				} else {
					this.selectedValue = 0;
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}

	.ci_view {
		width: 100%;
		height: 1720upx;
	}

	//顶部背景
	.ci_titleView {
		width: 100%;
		height: 253upx;
		background: #FC4646;
		text-align: center;
	}

	//出发内容
	.ci_siteView {
		position: absolute;
		top: 180upx;
		width: 698upx;
		margin: 0 26upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 13px;

		//内容样式
		.cs_departureContents1 {
			display: flex;
			padding-top: 40upx;
			padding-left: 40upx;

			.cs_depart {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 320upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.cs_departName {
					width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}

			.cs_borun {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 240upx;
				padding-left: 68upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.cs_borunName {
					width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
		}

		//内容样式
		.cs_departureContents2 {
			display: flex;
			padding-top: 40upx;
			padding-left: 40upx;
			padding-bottom: 40upx;

			.cs_go {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 320upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.cs_date {
					width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}

			.cs_days {
				color: rgba(102, 102, 102, 1);
				font-size: 30upx;
				width: 225upx;
				padding-left: 68upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				.cs_number {
					width: 200upx;
					font-size: 30upx;
					color: rgba(44, 45, 45, 1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
		}
	}

	//包车车型信息
	.ci_carModelView {
		width: 700upx;
		height: 440upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 13upx;
		left: 25upx;
		top: 400upx;

		.cmv_selected {
			font-size: 36upx;
			color: #333333;
			font-weight: 800;
			position: absolute;
			left: 40upx;
			top: 30upx;
		}

		.cmv_car {
			width: 345upx;
			height: 185upx;
			position: absolute;
			left: 180upx;
			top: 100upx;
		}

		.cmv_carName {
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 300upx;
			top: 290upx;
		}

		.cmv_carType {
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 180upx;
			top: 350upx;
		}

		.cmv_carMoney {
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 400upx;
			top: 350upx;
		}
	}

	//包车人信息
	.ci_charteredBusView {
		width: 700upx;
		height: 520upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 860upx;

		.cbv_charteredBusMessage {
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 40upx;
			top: 20upx;
		}

		.cbv_explain {
			font-size: 26upx;
			color: #808080;
			font-weight: 300;
			position: absolute;
			left: 40upx;
			top: 80upx;
		}

		.cbv_tripMan {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 40upx;
			top: 170upx;
		}

		.cbv_name {
			font-size: 30upx;
			color: #333333;
			font-weight: 300;
			position: absolute;
			left: 200upx;
			top: 170upx;
		}

		.cbv_addressBook {
			width: 50upx;
			height: 50upx;
			position: absolute;
			left: 625upx;
			top: 165upx;

		}

		.cbv_idCord {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 40upx;
			top: 300upx;
		}

		.cbv_id {
			font-size: 30upx;
			color: #333333;
			font-weight: 300;
			position: absolute;
			left: 200upx;
			top: 300upx;
		}

		.cbv_mobile {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 40upx;
			top: 430upx;
		}

		.cbv_phone {
			font-size: 30upx;
			color: #333333;
			font-weight: 300;
			position: absolute;
			left: 200upx;
			top: 430upx;
		}

	}

	//优惠券信息
	.ci_couponView {
		width: 700upx;
		height: 100upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 1400upx;

		.cv_coupon {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 40upx;
			top: 28upx;
		}

		.cv_noUsable {
			font-size: 28upx;
			color: #C0C0C0;
			font-weight: 300;
			position: absolute;
			left: 540upx;
			top: 28upx;
		}

		.cv_symbol {
			font-size: 28upx;
			color: #999999;
			position: absolute;
			left: 650upx;
			top: 28upx;
		}
	}

	//包车须知信息
	.ci_noticeView {
		width: 700upx;
		height: 100upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 1520upx;

		.nv_charteredBusNotice {
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 40upx;
			top: 28upx;
		}

		.nv_all {

			font-size: 26upx;
			color: #19A0FF;
			font-weight: 400;
			position: absolute;
			left: 200upx;
			top: 30upx;
		}

		.nv_radio {
			color: #FC4646;
			position: absolute;
			left: 620upx;
			top: 30upx;
		}
	}

	//底部信息
	.ci_affirmView {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background: #fff;
		z-index: 998;
		color: #f85e52;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.av_money {
			font-size: 26upx;
			color: #FC4646;
			font-weight: 400;
			position: absolute;
			left: 17upx;
			top: 30upx;
		}

		.av_atOnceView {
			width: 310upx;
			height: 100upx;
			background: #FC4B4B;
			position: absolute;
			right: 0upx;
		}

		.aov_atOnce {
			font-size: 34upx;
			color: #FFFFFF;
			font-weight: 400;
			position: absolute;
			top: 25upx;
			left: 80upx;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background: #fff;
		z-index: 998;
		color: #f85e52;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: #f85e52;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: #f85e52;
		}

		.people {
			font-size: 28upx;
			margin-left: 24upx;
			color: #999999;
		}

		.submitChange {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			background: #aaa;

			.submit {
				color: #fff;
				font-size: 32upx;
			}

			&.submitColor {
				background: #06B4FD;
			}
		}
	}

	.boxVlew {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;

		.titleView {
			margin: 24upx 0;

			//弹框标题
			.Nb_text1 {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}

			//弹框关闭按钮
			.Nb_text2 {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}

		.noticeBox {
			height: 800upx;
			line-height: 32upx;

			.Nb_text3 {
				display: block;
				margin-top: 32upx;
				font-size: 34upx;
				font-weight: bold;
			}

			.Nb_text4 {
				display: block;
				line-height: 64upx;
				margin: 32upx 0;
				font-size: 30upx;
			}
		}
	}

	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */

	//下弹框标题
	.couponTitle {
		padding: 40upx;
		padding-bottom: 16upx;

		.Co_text1 {
			font-size: 38upx;
			font-weight: bold;
		}

		.Co_text2 {
			margin-top: 8upx;
			float: right;
			color: #f85e52;
			font-size: 28upx;
		}
	}


	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: #f85e52;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: #999999;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999999;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: #f85e52;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: #999999;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}
</style>
