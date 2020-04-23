<template>
	<view>
		<map id="map1" ref="map1" class="map" :style="{height:mapHeight}" :scale="scale" :longitude="longitude" :latitude="latitude"
		 :polyline="polyline" :markers="markers" :show-location="true">
		</map>
		<image @click="back" src="../../../static/BCFW/choice/charterMap/back1.png" style="width: 120rpx;height: 120rpx;position: fixed;top: 40px;left: 1px;"></image>
		<view style="position: fixed;bottom: 0upx; ">
			<image src="../../../static/BCFW/choice/charterMap/police.png" style="width: 120rpx;height: 120rpx;margin-left: 10rpx;" @click="callPolice"></image>
			<!-- 行程信息  v-if="status === 0" -->
			<scroll-view class="cm_content" scroll-y="true">
				<view class="ct_state">
					<text class="sa_text">待发车</text>
				</view>
				<!-- 司机信息 -->
				<view class="ct_information">
					<text class="if_topTitle">司机信息</text>
					<view class="if_text">
						<text class="te_text">车牌号:{{driverInformation.licensePlate}}</text>
						<text class="te_text">车型:{{driverInformation.vehicleType}}</text>
					</view>
					<view class="if_text">
						<text class="te_text">姓名:{{driverInformation.name}}</text>
						<text class="te_text">驾龄:{{driverInformation.age}}</text>
					</view>
					<view class="if_text">
						<text class="te_text">电话:{{driverInformation.telephone}}</text>
					</view>
					<view class="if_button">
						<button class="bt_remind" type="warn">提醒支付</button>
						<button class="bt_remind" type="default">联系司机</button>
					</view>
				</view>
				<!-- 费用详情 -->
				<view class="ct_feeDetails">
					<text class="if_topTitle2">费用详情</text>
					<view class="if_text">
						<text class="te_text">包车天数:{{driverInformation.day}}</text>
						<text class="te_text">已包时长:{{driverInformation.duration}}</text>
					</view>
					<view class="if_text">
						<text class="te_text">包车费用:{{driverInformation.cost}}</text>
						<text class="te_text">超时费用:{{driverInformation.overtimeCharge}}</text>
					</view>
					<view class="if_text">
						<text class="te_text">总计:{{driverInformation.totalCost}}</text>
					</view>
				</view>
				<!-- 路线信息 -->
				<view class="ct_routeInformation">
					<text class="if_topTitle3">路线信息</text>
					<view class="if_text">
						<text class="te_text">上车点:{{driverInformation.boardingPoint}}</text>
						<text class="te_text">目的地:{{driverInformation.destination}}</text>
					</view>
					<view class="if_text">
						<text class="te_text">总里程:{{driverInformation.totalLi}}</text>
						<text class="te_text">总时长:{{driverInformation.totalDuration}}</text>
					</view>
				</view>
			</scroll-view>
			<!-- <view style="width: 698rpx;height: 223rpx; background-color: #FFFFFF;margin-left: 28rpx; border-radius:20rpx;">
				<view style="margin-top: 36rpx;margin-left: 38rpx;display: flex;flex-direction: row;">
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">预计里程:</text>
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{estimateMileage}}</text>
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx; margin-left: 40rpx;">预计时长:</text>
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{estimateHour}}</text>
				</view>
				<view style="margin-top: 20rpx;margin-left: 40rpx;display: flex;flex-direction: row;">
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">等待时长:</text>
					<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{waitHour}}</text>
				</view>
				<view style="margin-top: 20rpx;margin-left: 36rpx;display: flex;flex-direction: row;">
					<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">上车点:</text>
					<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{beginAddress}}</text>
				</view>
			</view> -->
			<!-- 联系电话 -->
			<!-- <view style="width: 698rpx;height: 105rpx; background-color: #FFFFFF;margin-left: 28rpx; border-radius:20rpx; padding: 34rpx;display: flex;flex-direction: row;margin-top: 20rpx;">
				<view>
					<text style="width:140rpx;height:36rpx;font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(51,51,51,1);line-height:36rpx; margin-left: 10rpx;">乘客电话:</text>
				</view>
				<view>
					<text style="width:200rpx;height:36rpx;font-size:30rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(51,51,51,1);line-height:36rpx;">{{passengerPhone}}</text>
				</view>
				<image style="width: 60rpx;height: 60rpx; left: 220rpx; top: -12rpx;" src="../../../static/BCFW/choice/charterMap/phone.png" @click="call"></image>
			</view>
			<view>
				<button style="width: 698rpx;height: 105rpx;background-color: #FC6A6C;border-color:#FC6A6C;color: #FFFFFF;margin-left: 28rpx; border-radius:20rpx; position: fixed; padding: 6rpx;bottom: 90rpx;"
				 @longpress="confirmgetonCar">
					<text style="color: #FFFFFF;">长按确认乘客已上车</text>
				</button>
			</view> -->
		</view>
		<!-- <view v-if="status === 1" style="position: fixed;bottom: 220rpx; ">
			<image src="../../../static/BCFW/choice/charterMap/police.png" style="width: 120rpx;height: 120rpx;margin-left: 10rpx;" @click="callPolice"></image> -->
			<!-- 行程信息 -->
			<!-- <view style="width: 698rpx;height: 164rpx; background-color: #FFFFFF;margin-left: 28rpx; border-radius:20rpx;">
				<view style="margin-top: 36rpx;margin-left: 38rpx;display: flex;flex-direction: row;">
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">预计里程:</text>
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{estimateMileage}}</text>
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx; margin-left: 40rpx;">预计时长:</text>
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{estimateHour}}</text>
				</view>
				<view style="margin-top: 20rpx;margin-left: 40rpx;display: flex;flex-direction: row;">
					<text style="width:120rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">下车点:</text>
					<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{endAddress}}</text>
				</view>
			</view>
			<view style="width: 698rpx;height: 164rpx; background-color: #FFFFFF;margin-left: 28rpx; border-radius:20rpx; margin-top: 30rpx;">
				<view style="margin-top: 36rpx;margin-left: 38rpx;display: flex;flex-direction: row;">
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">已驶里程:</text>
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{alreadyMileage}}</text>
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx; margin-left: 40rpx;">已驶时长:</text>
					<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{alreadyHour}}</text>
				</view>
				<view style="margin-top: 20rpx;margin-left: 40rpx;display: flex;flex-direction: row;">
					<text style="width:120rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">总费用:</text>
					<text style="width:400rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{totalCost}}元</text>
				</view>
			</view>
			<view>
				<button style="width: 698rpx;height: 105rpx;background-color: #FC6A6C;border-color:#FC6A6C;margin-left: 28rpx; border-radius:20rpx; position: fixed; padding: 6rpx;bottom: 90rpx;"
				 @longpress="confirmGetToDestination">
					<text style="color: #FFFFFF;">长按确认到达目的地</text>
				</button>
			</view>
		</view> -->
		
		<uni-popup ref='callPolice' :animation='true' type='center' :maskClick='false'>
			<!--一键报警-->
			<view class="popupBlock" style="margin: 0 auto;">
				<view class="popupTitle">
					<view style="width: 72rpx;"></view>
					<text class="popupTitleFont">一键报警</text>
					<uni-icons @click="cancle" color='#999999' size='24' type='closeempty'></uni-icons>
				</view>
				<view>
					<picker @change='pickerChange' mode="selector" :value="pickerValue"  :range='callPoliceArr' style="align-items: center;">
						<text class="popupTitleFont">{{reason}}</text>
					</picker>
					<textarea name='remark' v-model="remark" placeholder="备注,可不填"></textarea>
					<button @click="sendCall" class="popupButtonOk">
						<text class="popupButtonOkFont">确定</text>
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import taxi from '../../../components/BCFW/Czc.js';
	import uniIcons from "../../../components/BCFW/uni-icons/uni-icons.vue";
	import Map from '../../../components/BCFW/my-openMap/openMap.js';
	import uniPopup from "../../../components/BCFW/choice/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniIcons,
			uniPopup
		},
		data() {
			return {
				scale: 14,
				longitude: "118.600608", //地图中心点经度
				latitude: "24.889217", //地图中心点纬度
				points: [],
				polyline: [],
				markers: [],
				mapHeight: '',
				viewHeight: '',
				estimateMileage: '44 km',
				alreadyMileage: '44 km',
				estimateHour: '2小时',
				alreadyHour: '2.5小时',
				waitHour: '5分钟',
				beginAddress: '茶叶大厦',
				endAddress: '晋江机场',
				passengerPhone: '15255066261',
				totalCost: '32.05',
				resultData: {},
				status: 0,
				directionInterval: 0,
				orderInterval:0,
				callPoliceArr:[
					'车辆损坏',
					'身体不适'
				],
				reason:'请选择报警原因',
				pickerValue:-1,
				remark:'',
				driverInformation:[],
			}
		},
		onLoad() {
			var that = this;
			that.routeInit();
			that.setMarker(1, 118.600608, 24.889217, '../../../static/CTKY/start.png');
			that.setMarker(2, 118.613688, 24.912702, '../../../static/CZC/End.png');
			that.getDirectionDriving(that.longitude + ',' + that.latitude, '118.613688,24.912702');
			uni.getSystemInfo({
				//设置地图高度为可使用的高度
				success: function(res) {
					that.mapHeight = res.windowHeight + 'px';
					that.viewHeight = (res.windowHeight * 0.4) + 'px'
				}
			});
			that.getOrderDetail();
		},
		methods: {
			//---------------------------------模拟接口数据---------------------------------
			async routeInit() {
				let driverInformation = await this.$api.lyfwcwd('driverInformation');
				this.driverInformation = driverInformation.data;
			},
			
			//订单查询方法，第一次进入时调用。
			getOrderDetail:function(){
				
				let that = this;
				that.status = 0;
				if(that.status == 0){
					/* Map.openMap(24.943068, 118.609035, '清源山', 'gcj02'); */
				}else if(that.status == 1){
					
					
					
				}else if(that.status == 2){
					
				}
			},
			realGetOrderDetail:function(){
				let that = this;
				that.orderInterval = setInterval(function(){
					that.status = 0;
					if(that.status == -1){
						clearInterval(that.orderInterval);
						uni.showToast({
							title:'用户已取消订单',
							icon:'none'
						})
					}
				},10000);
			},
			
			confirmgetonCar:function() { //确认乘客上车
				this.status = 1;
				var that = this;
				that.markers = [];
				that.polyline = [];
				that.setMarker(1, 118.613688, 24.912702, '../../static/driver/Start.png');
				that.setMarker(2, 118.611339, 24.885683, '../../static/driver/End.png');
				that.getDirectionDriving('118.613688, 24.912702', '118.611339, 24.885683');
				that.directionInterval = setInterval(function() { //获取司机的实时位置并规划到终点的路线
					that.markers = [];
					that.polyline = [];
					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							that.longitude = res.longitude;
							that.latitude = res.latitude;
						}
					})
					that.setMarker(1, that.longitude, that.latitude, '../../static/driver/Start.png');
					that.setMarker(2, 118.611339, 24.885683, '../../static/driver/End.png');
					that.getDirectionDriving(that.longitude + ',' + that.latitude, '118.611339, 24.885683');
				}, 10000);
				Map.openMap(24.943068, 118.609035, '清源山', 'gcj02');
			},
			confirmGetToDestination:function() {
				//取消由 setInterval 设置的定时器
				clearInterval(this.directionInterval);
				uni.redirectTo({
					url: '/pages/driver/otherExpenses',
				})
			},
			call: function() {
				//呼叫乘客
				let that = this;
				uni.makePhoneCall({
					phoneNumber: that.passengerPhone
				});
			},
			
			//picker相关
			callPolice: function() {
				let that = this;
				that.$refs.callPolice.open();
			},
			cancle:function(){
				let that = this;
				that.$refs.callPolice.close();
			},
			pickerChange:function(e){
				let that = this;
				console.log(e);
				that.pickerValue = e.detail.value;
				that.reason = that.callPoliceArr[e.detail.value];
			},
			sendCall:function(){
				let that = this;
				if(that.pickerValue < 0){
					uni.showToast({
						title:'请选择一个原因',
						icon:'none'
					});
					return;
				}
				//发送
				console.log(that.reason);
				console.log(that.remark);
				uni.showToast({
					title:'发送成功',
					icon:'none',
					success:function(){
						that.cancle();
					}
				})
			},
			
			back: function() {
				var that = this;
				uni.navigateBack({});
			},
			
			setMarker: function(id, lon, lat, iconPath) {
				var width = 20;
				var height = 20;
				//描绘点的方法
				var that = this;
				var marker = new Object();
				//画终点经纬度
				marker = {
					id: id,
					latitude: lat,
					longitude: lon,
					iconPath: iconPath,
					width: width,
					height: height
				};
				that.markers.push(marker);
			},
			getDirectionDriving: function(startLonLat, endLonLat) {
				//调用高德api取得路径规划并绘制线路 
				var that = this;
				uni.request({
					url: taxi.InterfaceAddress[0],
					data: {
						startLonLat: startLonLat,
						endLonLat: endLonLat,
					},
					method: "GET",
					success: function(res) {
						//日后会加入定时，此处需清空
						that.points = [];
						that.polyline = [];

						var polylineArr = [];
						var points = [];

						polylineArr = res.data.Polyline;

						for (var i = 0; i < polylineArr.length; i++) {
							var arr = polylineArr[i].split(';');
							for (var j = 0; j < arr.length; j++) {
								points.push(arr[j]);
							}
						}
						//根据文件建设对象经纬度数组
						for (var i = 0; i < points.length; i++) {
							var arr = points[i].split(',');
							var obj = {
								longitude: arr[0],
								latitude: arr[1]
							}
							that.points.push(obj);
						}
						var obj = {
							points: that.points,
							color: "#4BDD25",
							arrowLine: true,
							width: 5
						};
						that.polyline.push(obj);
					},
					fail: function(res) {
						console.log(res);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.map {
		width: 750rpx;
	}
	
	.popupBlock {
		width: 650rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
	}
	
	.popupTitle {
		margin-bottom: 50rpx;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.popupTitleFont {
		font-size: 38rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #333333;
	}
	
	.popupButtonChoose {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-color: #AAAAAA;
		border-width: 1rpx;
		border-radius: 12rpx;
	}
	
	.popupButtonChooseFont {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #333333;
	}
	
	.popupButtonOk {
		margin-top: 50rpx;
		padding: 30rpx;
		background-color: #FC6A6C;
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
		border-radius: 12rpx;
	}
	
	.popupButtonOkFont {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	
	.cm_content{
		margin: 28upx 25upx 28upx 25upx;
		display: flex;
		width: 698upx;
		height: 600upx;
		
		.ct_state{
			width:100%;
			border-radius:10px;
			background:#fff;
			
			.sa_text{
				display: flex;
				font-size: 30upx;
				text-align: left;
				padding-top: 30upx;
				padding-bottom: 30upx;
				padding-left: 31upx;
			}
		}
		.ct_information{
			width: 100%;
			border-radius:10px;
			background:#fff;
			padding: 30upx 0;
			margin: 20upx 0;
			
			.if_topTitle{
				padding-left: 31upx;
				font-size:36upx;
				font-weight: bold;
			}
			.if_button{
				display: flex;
				padding-top: 37upx;
				.bt_remind{
					width:305upx;
					font-size:34upx;
				}
			}
		}
		
		//内容公共样式
		.if_text{
			display: flex;
			padding-left: 31upx;
			padding-top: 33upx;
			
			.te_text{
				display: flex;
				font-size:30upx;
				width: 320upx;
			}
		}
		
		
		.ct_feeDetails{
			width: 100%;
			border-radius:10px;
			background:#fff;
			margin-bottom: 20upx;
			padding: 30upx 0;
			
			.if_topTitle2{
				padding-left: 31upx;
				font-size:36upx;
				font-weight: bold;
			}
		}
		
		.ct_routeInformation{
			width: 100%;
			border-radius:10px;
			background:#fff;
			margin-bottom: 20upx;
			padding: 30upx 0;
			
			.if_topTitle3{
				padding-left: 31upx;
				font-size:36upx;
				font-weight: bold;
				padding-bottom: 20upx;
			}
		}
	}
</style>
