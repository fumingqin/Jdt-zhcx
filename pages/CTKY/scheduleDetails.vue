<template>
	<view class="myView">
		<scroll-view scroll-y="true" style="margin-bottom: 112upx;">
			<view class="headerClass">
			</view>
			<!-- 内容 -->
			<view class="orderCommonClass" style="margin-top: -110upx;">
				<!-- 顶部订单信息 -->
				<view class="ticketInfoClass">
					<view>
						<view class="textCLass" style="font-size: 28upx;color: #333333;display: block;padding: 0;">
							{{utils.timeTodate('Y-m-d H:i',ticketDetail.setTime)}}出发</view>
						<view class="textCLass" style="font-size: 32upx;color: #333333;margin-top:21upx ;display: block;padding: 0;">{{ticketDetail.startStaion}}
							→ {{ticketDetail.endStation}}</view>
						<view class="textCLass" style="font-size: 24upx;color: #999999; margin-top:18upx ;display: block;padding: 0;">{{ticketDetail.carType}}  儿童半票</view>
					</view>
					<view style="display: flex; flex-direction: column;">
						<view class="textCLass" style="font-size: 34upx;color: #FC4646;">￥{{ticketDetail.fare}}</view>
						<view style="margin-right: 28upx;margin-top: 20upx;font-size: 24upx;font-style:
		       SourceHanSansSC-Light; color: #666666;">余{{ticketDetail.remainingVotes}}张</view>
					</view>
				</view>
			</view>
			
			<!-- 地图标点 -->
			<view class="orderCommonClass">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">地图标点</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view @tap="checkLocation" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">查看班次信息</view>
					<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view>
			</view>
			
			<!-- 上下车点选择,0是普通购票不显示上下车点选择 -->
			<view class="stationContentView" v-if="ticketDetail.shuttleType == '定制班车'">
				<view class="boarding" style="border-bottom:#EAEAEA solid 1px;" @tap="startStationTap">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">上车点</view>
					<view style="display: flex;align-items: center;">
						<view @tap="startStationTap" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;text-align: right;">{{startStation}}</view>
						<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
				<view class="boarding" @tap="endStationTap">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">下车点</view>
					<view style="display: flex;align-items: center;">
						<view @tap="endStationTap" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;text-align: right;">{{endStation}}</view>
						<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
			</view>
			
			<!-- 乘车人信息 -->
			<view class="orderCommonClass" style="flex-direction: column;padding-bottom: 25upx;">
				<view style="margin-top: 35upx;margin-bottom: 35upx;margin-left: 41upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">乘车人信息</view>
				<view style="display: flex;margin-left: 165upx;margin-right: 165upx;margin-bottom: 35upx;">
					<button @tap="addPassenger" style="width: 150upx;height: 66upx;align-items: center;font-size: 28upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">添加</button>
					<button @tap="pickPassenger" style="width: 150upx;height: 66upx;align-items: center;font-size: 28upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">选择</button>
				</view>
				<view style="flex-direction: column;background: #FFFFFF; " v-for="(items,index) in passengerInfo" :key=index v-model="passengerInfo">
					<view class="passengerInfoDetail">
						<view style="display: flex;text-align: center;align-items: center;">
							<view style="width: 73upx;">
								<image src="../../static/CTKY/delete.png" style="width: 34upx;height: 34upx;" @click="deleteInfo(index)"></image>
							</view>
							<view style="height: 100%;">
								<view style="display: flex;margin-top: 18upx;margin-bottom: 18upx;">
									<text style="font-size:32upx ;color: #333333;padding:0;padding-right: 24upx;">{{items.userName}}</text>
									<view style="background:#EBEBEB ; font-size:18upx ;border-radius: 24upx;width: 100upx;height: 37upx;line-height:37upx ;text-align: center;">{{items.userType}}</view>
								</view>
								<view style="display: flex;font-size: 28upx;color:#999999 ;margin-top: 18upx;margin-bottom: 18upx;">
									<text style="margin-right: 20upx;">身份证</text><text>{{items.userCodeNum}}</text>
								</view>
							</view>
						</view>
						<view>
							<image src="../../static/CTKY/right.png" style="width:12upx ;height: 21upx;"></image>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 优惠券 -->
			<view class="orderCommonClass" @click="toggleMask" v-if="false">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">优惠券</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">{{couponIndex}}</view>
					<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view>
			</view>
			
			<!-- 呼出优惠券面板 -->
			<popup type="bottom" ref="popup">
				<view class="discountView">
					<!-- 头部 -->
					<view class="couponTitle">
						<text class="Co_text1">优惠券</text>
						<text class="Co_text2" @click="couponReset">不使用优惠券</text>
					</view>
					
					<!-- 优惠券列表 -->
					<scroll-view scroll-y="true" class="discountScroll">
						
						<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @tap="couponEvent">
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
						
					</scroll-view>
					
				</view>
			</popup>
			
			<!-- 乘车险 -->
			<view class="orderCommonClass" v-if="ticketDetail.insurePrice != 0">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">购买乘车险</view>
					<view style="margin-left: 16upx;color:#FC4B4B ; font-size:30upx ;">{{ticketDetail.insurePrice}}元</view>
				</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="isInsurance===1 ? true : false" @click="insuranceTap"></radio>
				</view>
			</view>
			
			<!-- 购票须知 -->
			<view class="orderCommonClass">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">同意购票须知</view>
					<view @tap="checkAttention" style="margin-left: 16upx;color:#19A0FF ; font-size:30upx ;">点击查看须知</view>
				</view>
				<!-- 查看须知popup -->
				<popup ref="popup2" type="bottom">
					<view class="boxView">
						<view class="titleView">
							<text class="Nb_text1">用户须知</text>
							<text class="Nb_text2 jdticon icon-fork " @click="close(2)"></text>
						</view>
						<scroll-view class="noticeBox" scroll-y="ture">
							<text class="Nb_text4">
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
								用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知用户须知
							</text>
						</scroll-view>
					</view>
				</popup>
				
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<radio class="Mp_box" value="1" :color="'#01aaef'" :checked="selectedValue===1 ? true : false" @click="Selection"></radio>
				</view>
			</view>
		</scroll-view>
		<view class="toPayClass">
			<view style="display: flex;align-items: center;margin-left: 32upx;">
				<text style="font-size: 38upx;color: #FC4646;padding: 0;">￥{{totalPrice}}</text>
				<text style="font-size: 28upx;margin-left: 9upx;font-family:SourceHanSansSC-Light; font-weight: lighter;color: #666666;padding: 0;">共2人</text>
			</view>
			<view @tap="reserveTap" class="orderReserve" :class="{tapColor:selectedValue == 1}">立即预定</view>
		</view>
	</view>
</template>

<script>
	import popup from "../../components/CTKY/uni-popup/uni-popup.vue";
	import utils from "@/components/CTKY/shoyu-date/utils.filter.js";
	export default {
		components:{
			popup
			},
		data() {
			return {
				utils: utils,
				title: '',
				isNormal:0,//判断是普通购票还是定制班车:1是普通0是定制
				count: 1,
				startStation:'',//上车点
				endStation:'',//下车点
				indexArray:[],//下标数组
				startStaionIndex:'',
				endStationIndex:'',
				passengerInfo: [],//乘车人数组
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
					}],
				couponIndex: '请选择优惠券', //优惠券默认内容
				couponColor: '', //优惠券couponID，大于等于0触发价格判断事件
				selectedValue: 0, //同意须知的选中值
				couponCondition: '', //优惠券的满足条件值
				isInsurance:1,//默认选择乘车险
				maskState: 0, //优惠券面板显示状态
				ticketDate:'',
				ticketDetail: [],
				totalPrice:'',//车票总价格
			}
		},
		
		onLoad(e) {
			var that = this;
			//给车票类型赋值，0：普通购票，不显示上下车点选择 1:定制班车，显示上下车点选择
			this.isNormal = e.isNormal;
			
			uni.setNavigationBarTitle({
				title: '填写订单'
			});
			//读取订单数据
			uni.getStorage({
				key: 'ticketDate',
				success:function(data){
					that.ticketDetail = data.data
					that.totalPrice = data.data.fare
					console.log(that.ticketDetail)
				}
			})
			
		},
		onShow() {
			//读取乘车人信息
			this.userData();
		},
		onReady() {

		},
		onUnload() {
			uni.removeStorage({
			    key: 'ticketDate',
			    success: function (res) {
			        console.log('success');
			    }
			});
		},
		methods: {
			//乘客数据读取
			userData(){ 
				var that = this;
				uni.getStorage({
				    key: 'passList',
				    success: (res) => {
				        that.passengerInfo = res.data;
						//计算价格
						that.calculateTotalPrice();
				    }
				});
				//读取上下车点缓存
				uni.getStorage({
					key:'CTKYStationList',
					success: (res) =>{
						that.startStation = res.data.startStation;
						that.startStaionIndex = res.data.startStationIndex;
						that.endStation = res.data.endStation;
						that.endStationIndex = res.data.endStationIndex;
						if(that.startStation == '') {
							that.startStation = "请选择上车点"
						}
						if(that.endStation == '') {
							that.endStation = "请选择下车点"
						}
					}
				})
			},
			//-------------------------------点击上车点-----------------------------
			startStationTap() {
				var that = this;
				//跳转到选择上车点页面
				uni.navigateTo({
					url:'/pages/CTKY/selectStation?startStaionIndex=' + that.startStaionIndex + '&endStationIndex=' + that.endStationIndex
				})
			},
			//-------------------------------点击下车点-----------------------------
			endStationTap() {
				var that = this;
				//跳转到选择下车点页面
				uni.navigateTo({
					url:'/pages/CTKY/selectStation?startStaionIndex=' + that.startStaionIndex + '&endStationIndex=' + that.endStationIndex
				})
			},
			//-------------------------------删除乘车人-----------------------------
			deleteInfo(e) {
				console.log(e)
				this.passengerInfo.splice(e, 1)
				uni.setStorage({
					key:"passengerList",
					data:this.passengerInfo,
				})
			},
			//-------------------------------显示优惠券面板-----------------------------
			toggleMask() {
				this.$refs.popup.open();
			},
			//-------------------------------优惠券赋值-----------------------------
			couponEvent(){
				console.log('1111111')
			},
			//-------------------------------取消优惠券-----------------------------
			couponReset: function(index) {
				this.couponIndex = '请选择优惠券';
				this.couponColor = '';
				this.$refs.popup.close()
				// this.numberChange();
				// this.toggleMask();
			},
			Selection: function() {
				if (this.selectedValue == 0) {
					this.selectedValue = 1;
				} else {
					this.selectedValue = 0;
				}
			},
			//-------------------------------选择保险-----------------------------
			insuranceTap: function() {
				if (this.isInsurance == 0) {
					this.isInsurance = 1;
					this.calculateTotalPrice();
				} else {
					this.isInsurance = 0;
					this.calculateTotalPrice();
				}
			},
			//-------------------------------查看须知-----------------------------
			checkAttention() {
				this.$refs.popup2.open()
			},
			close(e) {
				this.$refs.popup2.close()
			},
			//-------------------------------跳转到地图标点-----------------------------
			checkLocation() {
				if (this.ticketDetail.shuttleType == '普通班车') {
					uni.navigateTo({
						url:'/pages/CTKY/traditionCarMark'
					})
				}else if (this.ticketDetail.shuttleType == '定制班车') {
					uni.navigateTo({
						url:'/pages/CTKY/specialMark'
					})
				}
			},
			//-------------------------------选择乘客-----------------------------
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
			//-------------------------------计算总价格-----------------------------
			calculateTotalPrice() {
				var that = this;
				//儿童票数量
				let childNum = 0;
				//成年票数量
				let adultNum = 0;
				//儿童数组
				let childArray = [];
				//成年数组
				let adultArray = [];
				//车票单价
				let price = that.ticketDetail.fare;
				//半价票单价
				let halfPrice = that.ticketDetail.halfTicket;
				let insurePrice = that.ticketDetail.insurePrice;
				if (that.isInsurance == 0) {//不选择保险
					insurePrice = 0;
				}
				//查看乘车人个数
				if(that.passengerInfo.length > 0) {
					for(var i = 0; i < that.passengerInfo.length; i ++){
						//把儿童票筛选出来
						if(that.passengerInfo.userType == '儿童'){
							//将儿童票加入数组
							childArray.push(that.passengerInfo[i]);
							childNum ++;
						}else {
							//将成人票加入数组
							adultArray.push(that.passengerInfo[i]);
							adultNum ++;
						}
					}
					//计算总价
					that.totalPrice = Number(price) * adultNum + Number(halfPrice) * childNum + insurePrice
			     }else {
					 //计算总价
					that.totalPrice = Number(price) * adultNum + Number(halfPrice) * childNum + insurePrice
				 }
			},
			
			//-------------------------------点击订单预定-----------------------------
			reserveTap() {
				var that = this;
				//当选中用户须知且选择了上下车点和乘客之后发送请求
				if (that.ticketDetail.shuttleType == '定制班车') {
					if(that.startStation.length == 0 || that.endStation.length == 0) {
						uni.showToast({
							title: '请选择上下车点',
							icon: 'none'
						})
					}
				}else if(that.passengerInfo.length==0) {
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
					//计算价格
					that.calculateTotalPrice();
					//发送请求
					// uni.request({
					// 	url:'',
					// 	method:'POST',
					// 	header:{'content-type':'application/json'},
					// 	data:{
					// 		CompanyCode : '南平旅游APP',
					// 		ClientID : '用户ID',
					// 		ClientName : '用户名',
					// 		ScheduleCompanyCode : '班次代码',
					// 		ExecuteScheduleID :'班次ID',
					// 		StartSiteID :'上车站点ID',
					// 		EndSiteID : '下车站点ID',
					// 		StartSiteName : '上车站点名',
					// 		EndSiteName : '下车站点名',
					// 		PriceID : ' 票价ID',
					// 		PhoneNumber : '手机号',
					// 		FullTicket : ''
							
					// 	}
					// })
					
					//请求成功之后跳转到支付页面,传是否选择保险1:选择 0:未选择
					uni.navigateTo({
						url:'/pages/CTKY/orderPayment?isInsurance=' + that.isInsurance
					})
				}
				

			}
		}
	}
</script>

<style lang="scss">
	page,.myView {
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
	//订单提交通用块
	.orderCommonClass {
		background: #FFFFFF;
		border-radius: 14upx;
		margin: 0 26upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: space-between;
	}
	// 上下车点选择
	.stationContentView {
		flex-direction: column;
		background: #FFFFFF;
		margin: 0 26upx; 
		margin-bottom: 20upx;
		border-radius: 14upx;
	}
	
	/* 优惠券面板 */
	.discountView {
		min-height: 30vh;
		max-height: 70vh;
		width: 100%;
		background: #f3f3f3;
		margin-bottom: 100rpx;
	}
	//优惠券
	.discountScroll {
		min-height: 30vh;
		max-height: 60vh;
		width: 100%;
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
//须知弹框
	.boxView {
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
			min-height: 30vh;
			max-height: 70vh;
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
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		bottom: 100rpx;
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
