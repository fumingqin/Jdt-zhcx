<template>
	<view class="myView">
		<view style="margin: 32upx;">
			<text style="font-size: 34upx; font-weight: bold;" v-if="originIndex == 0">选择出发班次</text>
			<text style="font-size: 34upx; font-weight: bold;" v-if="originIndex == 1">选择返程班次</text>
		</view>
		
		<!-- 班车信息 -->
		<view class="ctky_View" :class="{ctky_ViewBorder : index==statusIndex}"  v-for="(item,index) in departureData" :key="index" @click="selection(item,index)" >
			<view class="ctky_View_Left">
				<view style="display: flex;align-items: center;margin:20upx 25upx;">
					<view class="markType" style="border:#1EA2FF solid 1px;color:#1EA2FF;" >返程</view>
					<view style="margin-left:19upx ;font-family: SourceHanSansSC-Bold;font-weight: bold;">{{item.setOutDate}}</view>
				</view>
				<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
					<image src="../../../static/LYFW/tourismProducts/startDot.png" style="width: 10upx ;height: 10upx;"></image>
					<view style="margin-left: 16upx; font-size: 30upx;font-style:SourceHanSansSC-Regular ;color: #333333;">{{item.startStation}}</view>
				</view>
				<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
					<image src="../../../static/LYFW/tourismProducts/endDot.png" style="width: 10upx ;height: 10upx;"></image>
					<view style="margin-left: 16upx;font-size: 30upx;font-style:SourceHanSansSC-Regular ;color: #333333;">{{item.endStation}}</view>
				</view>
				<view style="margin-left: 25upx;margin-bottom: 20upx;font-style: SourceHanSansSC-Light;font-weight: lighter;font-size: 28upx;color: #666666;">{{item.lineContent}}</view>
			</view>
			<view class="ctky_View_Right">
				<view>
					<view style="margin-right: 28upx;margin-top: 20upx;font-size: 24upx;font-style:SourceHanSansSC-Light; color: #FF6600;">余{{item.count}}座</view>
				</view>
			</view>
		</view>
		
		<view class="MP_information3" @click="paymentSatas">选中此班次</view>
		
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				originIndex : 0,//页面传参 0是出发班车 1是返程班车
				statusIndex : 0, //选中状态值
				selectionData: '',//选中的班次信息
				orderNumber : '',//订单编号
				departureData :'', //循环班次列表
				setOutDate : '',//时间
				startStation : '',//起始站
				endStation : '',//终点站
			}
		},
		onLoad:function(options){
			this.originIndex = options.originIndex;
			uni.getStorage({
				key:'chooseShuttleData',
				success: (res) => {
					this.orderNumber = res.data.orderNumber;
					this.setOutDate = res.data.orderDate;
					this.startStation = res.data.planEnd;
					this.endStation = res.data.planStart;
					this.GetSchedule();
				}
			})
		},
		methods: {
			selection:function(item,index){
				this.statusIndex = index;
				this.selectionData = item;
			},
			//提交绑定班次
			paymentSatas: function(){
				var that = this;
					uni.request({
						url: $lyfw.Interface.lyky_BindBackInfo.value,
						method: $lyfw.Interface.lyky_BindBackInfo.method,
						data:{
							orderNumber : this.orderNumber,
							scheduleID : this.departureData[that.statusIndex].scheduleID
						},
						success: (res) => {
							console.log(res)
							uni.showToast({
								title:'选择返程班次成功',
								success: () => {
									uni.switchTab({
										url:'../../../../pages/order/OrderList'
									})
								}
							})
						},
						fail: (ee) => {
							uni.showToast({
								title:'网络异常，请检查网络后重试',
								icon:'none'
							})
						}
					})
				
				
			},
			
			//获取班次发车信息
			GetSchedule:function(){
				uni.request({
						url: $lyfw.Interface.lyky_GetScheduleByDateStartStationEndStation.value,
						method: $lyfw.Interface.lyky_GetScheduleByDateStartStationEndStation.method,
						data:{
							setOutDate : this.setOutDate,
							startStation : this.startStation,
							endStation : this.endStation,
						},
						success: (res) => {
							// console.log(res)
							this.departureData = res.data.data;
						}
				})
			}
		}
	}
</script>

<style lang="scss">
	page,
	.myView {
			flex-direction: column;
			width: 100%;
			height: 100%;
			background: #F1F1F1;
	}
	.markType {
		width: 65upx;
		height: 37upx;
		line-height: 37rpx;
		border-radius: 14upx;
		text-align: center;
		align-items: center;
		font-size: 24upx;
		font-family: SourceHanSansSC-Light;
	}
	.ctky_View {
		width: 94%;
		background: #FFFFFF;
		margin: 16upx 3%;
		border-radius: 20upx;
		display: flex;
		justify-content: space-between;
		&.ctky_ViewBorder{
			border: 4upx solid #06B4FD;
		}
	}
	
	
	
	.ctky_View_Left {
		text-align: left;
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	.ctky_View_Right {
		display: flex;
		text-align: right;
		align-items: center;
		padding: 0;
	}
	
	.MP_information3 {
		position: fixed;
		bottom: 32upx;
		left: 0;
		right: 0;
		padding: 24upx 0;
		border-radius: 64upx;
		margin: 0 40upx;
		background: #1EA2FF;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}
</style>
