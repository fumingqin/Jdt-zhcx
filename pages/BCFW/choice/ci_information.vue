<template>
	<view class="ci_view" >
		<view class="ci_titleView">
		</view>
		<view class="ci_siteView" >
			<text class="sv_depart">出发地</text>
			<text class="sv_departName">{{charteredBus.departName}}</text>
			<text class="sv_borun">目的地</text>
			<text class="sv_borunName">{{charteredBus.borunName}}</text>
			<text class="sv_go">出发时间</text>
			<text class="sv_date">{{charteredBus.date}}</text>
			<text class="sv_days">包车天数</text>
			<text class="sv_number">{{charteredBus.number}}天</text>
		</view>
		<view class="ci_carModelView">
			<text class="cmv_selected">已选车型</text>
			<image class="cmv_car" :src="charteredBus.car"></image>
			<text class="cmv_carName">{{charteredBus.carName}}</text>
			<text class="cmv_carType">{{charteredBus.carType}}</text>
			<text class="cmv_carMoney">{{charteredBus.carMoney}}</text>
		</view>
		<view class="ci_charteredBusView">
			<text class="cbv_charteredBusMessage">包车人信息</text>
			<text class="cbv_explain">仅需填写一人信息，填写后自动保存至通讯录</text>
			<text class="cbv_tripMan">出行人</text>
			<text class="cbv_name">{{charteredBus.tripName}}</text>
			<text class="cbv_idCord">身份证</text>
			<text class="cbv_id">{{charteredBus.tripId}}</text>
			<text class="cbv_mobile">联系电话</text>
			<text class="cbv_phone">{{charteredBus.tripPhone}}</text>
		</view>
		<view class="ci_couponView" @click="toggleMask('show')">
			<text class="cv_coupon">优惠券</text>
			<text class="cv_noUsable">无可用</text>
		</view>
		<!-- 呼出优惠券面板 -->
		<!-- <view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<!-- <view class="couponTitle">
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
		</view> -->
		<view class="ci_noticeView">
			<text class="nv_charteredBusNotice" >包车须知</text>
			<text class="nv_all" @click="open()">点击查看全部</text>
			  <label class="nv_radio"><radio/></label>
		</view>
		<uni-popup ref="popup2" type="bottom">
			<view class="boxVlew">
			<view class="titleView">
				<text class="Nb_text1">包车须知</text>
				<text class="Nb_text2 jdticon icon-fork " @click="close()"></text>
			</view>
			<scroll-view class="noticeBox" scroll-y="ture">
				<text class="Nb_text4">
					1111111111111111111111111111111
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
		</view>
	</view>
</template>

<script>
	import uniPopup from "../../../components/LYFW/scenicSpotTickets/uni-popup/uni-popup.vue"
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		data() {
			return {
				charteredBus:[],
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
					}]
			}
		},
		onLoad() {
			this.getcharteredBus();
		},
		methods: {
			async getcharteredBus() {
			 let charteredBus = await this.$api.bcfwzyx('charteredBus');
			 this.charteredBus = charteredBus.data;
			 console.log(charteredBus)
			},
			open() {
					this.$refs.popup2.open()

			},
			
			close() {
					this.$refs.popup2.close()
			},
			//显示优惠券面板
			// toggleMask(type) {
			// 	let timer = type === 'show' ? 10 : 300;
			// 	let state = type === 'show' ? 1 : 0;
			// 	this.maskState = 2;
			// 	setTimeout(() => {
			// 		this.maskState = state;
			// 	}, timer)
			// },
			
			// //优惠券赋值
			// couponEvent: function(index) {
			// 	if (this.actualPayment >= this.couponList[index].condition) {
			// 		this.couponIndex = '-' + this.couponList[index].price;
			// 		this.couponColor = this.couponList[index].couponID;
			// 		this.couponCondition = this.couponList[index].condition;
			// 		this.numberChange();
			// 		this.toggleMask();
			// 	} else {
			// 		uni.showToast({
			// 			title: '您的实付款未达到条件，请重新选择',
			// 			icon: 'none'
			// 		})
			// 	}
			
			// },
			
			// //取消优惠券
			// couponReset: function(index) {
			// 	this.couponIndex = '请选择优惠券';
			// 	this.couponColor = '';
			// 	this.numberChange();
			// 	this.toggleMask();
			// },
			
			// //仿穿透事件
			// stopPrevent() {}

		}
	} 
</script>

<style lang="scss">
	page{
		background-color: #f6f6f6;
	}
	.ci_view {
			width:100%;
			height:1620upx;
	}
	.ci_titleView{
		width:100%;
		height: 253upx;
		background: #FC4646;
		text-align: center;
	}
	
	.ci_siteView{
		width: 700upx;
		height: 180upx;
		position: absolute;
		background: #FFFFFF;
		left: 25upx;
		top: 180upx;
		border-radius: 20upx;
		.sv_depart{
			font-size: 30upx;
			font-weight:300;
			color:#808080;
			position: absolute;
			left: 40upx;
			top:40upx
		}
		.sv_departName{
			width: 280upx;
			font-size:30upx;
			font-weight:300;
			color:#333333;
			text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
			white-space: nowrap;
			overflow: hidden;
			position: absolute;
			left: 160upx;
			top:40upx
		}
		.sv_borun{
			font-size: 30upx;
			font-weight:300;
			color: #808080;
			position: absolute;
			left: 440upx;
			top:40upx
		}
		.sv_borunName{
			width: 150upx;
			font-size: 30upx;
			color: #333333;
			font-weight:300;
			text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
			white-space: nowrap;
			overflow: hidden;
			position: absolute;
			left: 560upx;
			top: 40upx;
		}
		.sv_go{
			font-size: 30upx;
			font-weight:300;
			color:#808080;
			position: absolute;
			left: 40upx;
			top:110upx
		}
		.sv_date{
			font-size:30upx;
			font-weight:300;
			color:#333333;
			position: absolute;
			left: 200upx;
			top:110upx
		}
		.sv_days{
			font-size: 30upx;
			font-weight:300;
			color: #808080;
			position: absolute;
			left: 440upx;
			top:110upx
		}
		.sv_number{
			width: 100upx;
			font-size: 30upx;
			font-weight:300;
			color: #333333;
			text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
			white-space: nowrap;
			overflow: hidden;
			position: absolute;
			left: 590upx;
			top: 110upx;
		}
	}
	
	
	.ci_carModelView{
		width: 700upx;
		height: 440upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 380upx;
		.cmv_selected{
			font-size: 36upx;
			color: #333333;
			font-weight: 800;
			position: absolute;
			left: 70upx;
			top: 30upx;
		}
		.cmv_car{
			width: 345upx;
			height: 185upx;
			position: absolute;
			left: 180upx;
			top: 100upx;
		}
		.cmv_carName{
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 300upx;
			top: 290upx;
		}
		.cmv_carType{
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 180upx;
			top: 350upx;
		}
		.cmv_carMoney{
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 400upx;
			top: 350upx;
		}
	}
	
	.ci_charteredBusView{
		width: 700upx;
		height: 430upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 840upx;
		.cbv_charteredBusMessage{
			font-size: 32upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 33upx;
			top: 20upx;
		}
		.cbv_explain{
			font-size: 26upx;
			color: #808080;
			font-weight:300;
			position: absolute;
			left: 33upx;
			top:80upx;
		}
		.cbv_tripMan{
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 33upx;
			top: 170upx;
		}
		.cbv_name{
			font-size: 30upx;
			color: #333333;
			font-weight: 300;
			position: absolute;
			left: 200upx;
			top: 170upx;
		}
		.cbv_idCord{
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 33upx;
			top: 270upx;
		}
		.cbv_id{
			font-size: 30upx;
			color: #333333;
			font-weight: 300;
			position: absolute;
			left: 200upx;
			top: 270upx;
		}
		.cbv_mobile{
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left:33upx;
			top: 370upx;
		}
		.cbv_phone{
			font-size: 30upx;
			color: #333333;
			font-weight: 300;
			position: absolute;
			left:200upx;
			top:370upx;
		}
		
	}
	
	.ci_couponView{
		width: 700upx;
		height: 100upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 1290upx;
		.cv_coupon{
			font-size:30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 33upx;
			top: 28upx;
		}
		.cv_noUsable{
			font-size: 28upx;
			color:#C0C0C0;
			font-weight: 300;
			position: absolute;
			left: 540upx;
			top: 28upx;
		}
	}
	
	.ci_noticeView{
		width: 700upx;
		height: 100upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 1410upx;
		.nv_charteredBusNotice{
			font-size: 30upx;
			color: #333333;
			font-weight: 400;
			position: absolute;
			left: 33upx;
			top: 28upx;
		}
		.nv_all{

			font-size: 30upx;
			color: #19A0FF;
			font-weight: 400;
			position: absolute;
			left:200upx;
			top: 30upx;
		}
		.nv_radio{
			color: #FC4646;
			position: absolute;
			left:620upx;
			top: 30upx;
		}
	}
	
	.ci_affirmView{
		width: 750upx;
		height: 100upx;
		background: #FFFFFF;
		position: absolute;
		top: 1520upx;
		.av_money{
			font-size: 26upx;
			color: #FC4646;
			font-weight: 400;
			position: absolute;
			left:17upx;
			top: 30upx;
		}
		.av_atOnceView{
			width: 310upx;
			height: 100upx;
			background: #FC4B4B;
			position: absolute;
			right: 0upx;
		}
		.aov_atOnce{
			font-size:34upx;
			color: #FFFFFF;
			font-weight: 400;
			position: absolute;
			top: 25upx;
			left: 80upx;
		}
	}
	.boxVlew {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;
		.titleView{
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
	
	
</style>
