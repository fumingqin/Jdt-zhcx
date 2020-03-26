<template>
	<view class="myView">
		<scroll-view scroll-y="true" style="margin-bottom: 112upx;">
			<view class="headerClass">
			</view>
			<view class="orderCommonClass" style="margin-top: -110upx;">
				<view class="ticketInfoClass">
					<view>
						<view class="textCLass" style="font-size: 28upx;color: #333333;display: block;padding: 0;">{{ticketDate}}
							{{ticketDetail.SetTime}}出发</view>
						<view class="textCLass" style="font-size: 32upx;color: #333333;margin-top:21upx ;display: block;padding: 0;">{{ticketDetail.StartStaion}}
							→ {{ticketDetail.EndStation}}</view>
						<view class="textCLass" style="font-size: 24upx;color: #999999; margin-top:18upx ;display: block;padding: 0;">{{ticketDetail.CarType}}
							 儿童半票</view>

					</view>
					<view style="display: flex; flex-direction: column;">
						<view class="textCLass" style="font-size: 34upx;color: #FC4646;">￥{{ticketDetail.Price}}</view>
						<view style="margin-right: 28upx;margin-top: 20upx;font-size: 24upx;font-style:
		       SourceHanSansSC-Light; color: #666666;">余{{ticketDetail.Seat}}张</view>
					</view>
				</view>
			</view>
			<view class="orderCommonClass">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">地图标点</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view @tap="checkLocation" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">查看班次信息</view>
					<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view>
			</view>
			<view style="flex-direction: column;background: #FFFFFF;margin: 0 26upx; 
		margin-bottom: 20upx;border-radius: 14upx;">
				<view class="boarding" style="border-bottom:#EAEAEA solid 1px ;">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">上车点</view>
					<view style="display: flex;align-items: center;">
						<input :value="startStation" @tap="startStationTap" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;text-align: right;" placeholder="请选择上车点"/>
						<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
				<view class="boarding">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">下车点</view>
					<view style="display: flex;align-items: center;">
						<input :value="endStation" @tap="endStationTap" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;text-align: right;" placeholder="请选择下车点"/>
						<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
			</view>
			<view class="orderCommonClass" style="flex-direction: column;padding-bottom: 25upx;">
				<view style="margin-top: 35upx;margin-bottom: 35upx;margin-left: 41upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">乘车人信息</view>
				<view style="display: flex;margin-left: 165upx;margin-right: 165upx;margin-bottom: 35upx;">
					<button @tap="addPassenger" style="width: 150upx;height: 66upx;align-items: center;font-size: 28upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">添加</button>
					<button @tap="pickPassenger" style="width: 150upx;height: 66upx;align-items: center;font-size: 28upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">选择</button>
				</view>
				<view style="flex-direction: column;background: #FFFFFF; " v-for="(items,index) in info" :key=index v-model="info">
					<view class="passengerInfoDetail">
						<view style="display: flex;text-align: center;align-items: center;">
							<view style="width: 73upx;">
								<image src="../../static/CTKY/delete.png" style="width: 34upx;height: 34upx;" @click="deleteInfo(index)"></image>
							</view>
							<view style="height: 100%;">
								<view style="display: flex;margin-top: 18upx;margin-bottom: 18upx;">
									<text style="font-size:32upx ;color: #333333;padding:0;padding-right: 24upx;">{{items.name}}</text>
									<view style="background:#EBEBEB ; font-size:18upx ;border-radius: 24upx;width: 100upx;height: 37upx;line-height:37upx ;text-align: center;">成人票</view>
								</view>
								<view style="display: flex;font-size: 28upx;color:#999999 ;margin-top: 18upx;margin-bottom: 18upx;">
									<text style="margin-right: 20upx;">身份证</text><text>{{items.id}}</text>
								</view>
							</view>
						</view>
						<view>
							<image src="../../static/CTKY/right.png" style="width:12upx ;height: 21upx;"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="orderCommonClass">
				<!-- 优惠券 -->
				<view class="MP_information2" @click="toggleMask('show')">
					<view class="MP_optionBar">
						<text class="Mp_title">优惠券</text>
						<text class="Mp_arrow"> > </text>
						<text class="Mp_text">{{couponIndex}}</text>
					</view>
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
				<!-- <view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">优惠券</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">无可用</view>
					<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view> -->
			</view>
			<view class="orderCommonClass">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">购买乘车险</view>
					<view style="margin-left: 16upx;color:#FC4B4B ; font-size:30upx ;">2元</view>
				</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="isInsurance===1 ? true : false" @click="insuranceTap"></radio>
				</view>
			</view>
			<view class="orderCommonClass">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">同意购票须知</view>
					<view style="margin-left: 16upx;color:#19A0FF ; font-size:30upx ;">点击查看须知</view>
				</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="selectedValue===1 ? true : false" @click="Selection"></radio>
				</view>
			</view>
		</scroll-view>
		<view class="toPayClass">
			<view style="display: flex;align-items: center;margin-left: 32upx;">
				<text style="font-size: 38upx;color: #FC4646;padding: 0;">￥30</text>
				<text style="font-size: 28upx;margin-left: 9upx;font-family:SourceHanSansSC-Light ; font-weight: lighter;color: #666666;padding: 0;">共2人</text>
			</view>
			<view @tap="reserveTap" class="orderReserve" :class="{tapColor:selectedValue == 1}">立即预定</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		data() {
			return {
				title: '',
				count: 1,
				startStation:'泉州',
				endStation:'惠安',
				info: [{
						name: '小花',
						id: '22555555555555555555'
					},
					{
						name: '小明',
						id: '22555555555555555555'
					},
					{
						name: '小红',
						id: '22555555555555555555'
					}
				],
				couponIndex: '请选择优惠券', //优惠券默认内容
				selectedValue: 0, //同意须知的选中值
				isInsurance:0,
				 ticketDate:'',
				// ticketSettime:'',
				// ticketPrice:'',
				// ticketCount:'',
				// ticketStart:'',
				// ticketEnd:'',
				// carType:'',
				// ticketType:'',
				ticketDetail: []
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: '填写订单'
			});
			var that = this;
			uni.getStorage({
				key: 'selectedTicket',
				success: function(res) {
					// that.ticketSettime=res.data[0].ticketSettime;
					// that.ticketPrice=res.data[0].ticketPrice;
					// that.ticketCount=res.data[0].ticketCount;
					// that.ticketStart=res.data[0].ticketStart;
					// that.ticketEnd=res.data[0].ticketEnd;
					// that.carType=res.data[0].carType;
					// that.ticketType=res.data[0].ticketType
					that.ticketDetail = res.data;
				}
			});
			uni.getStorage({
				key: 'shiftDate',
				success: function(res) {
                     that.ticketDate=res.data;
				}
			});

		},
		onReady() {

		},
		methods: {
			Add() {

			},
			deleteInfo(e) {
				console.log(e)
				this.info.splice(e, 1)
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
			
			Selection: function() {
				if (this.selectedValue == 0) {
					this.selectedValue = 1;
				} else {
					this.selectedValue = 0;
				}
			},
			//选择保险
			insuranceTap: function() {
				if (this.isInsurance == 0) {
					this.isInsurance = 1;
				} else {
					this.isInsurance = 0;
				}
			},
			//跳转到地图标点
			checkLocation() {
				uni.navigateTo({
					url:'/pages/CTKY/specialMark'
				})
			},
			//选择乘客
			pickPassenger() {
				//跳转到选择乘客页面
				uni.navigateTo({
					url: '/pages/GRZX/passengerInfo?submitType=1',
				})
			},
			//点击添加乘客
			addPassenger(){
				uni.navigateTo({
					url: '/pages/GRZX/addPassenger',
				})
			},
			//点击上车点
			startStationTap() {
				//跳转到选择上车点页面
				console.log('点击了上车点')
			},
			//点击下车点
			endStationTap() {
				//跳转到选择下车点页面
				console.log('点击了下车点')
			},
			
			
			//-------------------------------点击订单预定-----------------------------
			reserveTap() {
				var that = this;
				//当选中用户须知且选择了上下车点和乘客之后发送请求
				if(that.startStation.length == 0 || that.endStation.length == 0) {
					uni.showToast({
						title: '请选择上下车点',
						icon: 'none'
					})
				}else if(that.info.length==0) {
					uni.showToast({
						title: '请选择乘车人',
						icon: 'none'
					})
				}else if(that.selectedValue == 0) {
					uni.showToast({
						title: '请同意购买须知',
						icon: 'none'
					})
				}else {
					//请求成功之后跳转到支付页面
					uni.navigateTo({
						url:'/pages/CTKY/orderPayment'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.myView {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}

	.headerClass {
		width: 100%;
		height: 140upx;
		background: #FC4646;
	}
	//公共样式2 - 适用单选框
	.MP_information2 {
		border-radius: 16upx;
		background: #FFFFFF;
		padding: 36upx 32upx;
		font-size: 32upx;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 24upx;
		.kj{
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
	}
	//选项框样式
	.MP_optionBar {
		.Mp_title {
			font-size: 32upx;
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
	
		.Mp_arrow {
			margin-top: 6upx;
			margin-left: 24upx;
			float: right;
			font-size: 28upx;
			color: #aaa;
		}
	}
	/* 优惠券面板 */
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
	.ticketInfoClass {
		height: 181upx;
		width: 652upx;
		text-align: left;
		padding-left: 29upx;
		padding-right: 29upx;
		padding-top: 28upx;
		display: flex;
		justify-content: space-between;
	}

	.textCLass {
		font-family: MicrosoftYaHei;
		font-weight: 400;
		// padding-top: 10upx;
		// padding-bottom: 10upx;
	}


	.passengerInfoDetail {
		border-bottom: 1upx solid #DADADA;
		margin-left: 33upx;
		margin-right: 33upx;
		//position: absolute;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	//取票电话、优惠券、购买乘车险通用块
	.commonClass {
		margin-top: 10upx;
		margin-bottom: 10upx;
		width: 100%;
		height: 110upx;
		padding-left: 31upx;
		padding-right: 31upx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}

	.toPayClass {
		width: 100%;
		height: 112upx;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		z-index: 1010;
		background: #FFFFFF;
		justify-content: space-between;
	}

	//订单提交通用块
	.orderCommonClass {
		background: #FFFFFF;
		border-radius: 14upx;
		margin: 0 26upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: space-between;
	}

	//上下车点
	.boarding {
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 41upx;
		margin-right: 41upx;
	}
	.Mp_box {
		float: right;
		position: relative;
		bottom: 6upx;
		right: -12upx;
	}
	//预定
	.orderReserve {
		width: 45%;
		height: 112upx;
		color: #FFFFFF;
		background:#aaa;
		font-size: 32upx;
		line-height: 112upx;
		text-align: center;
			
		&.tapColor {
			background:#FC4646;
		}
	}
</style>
