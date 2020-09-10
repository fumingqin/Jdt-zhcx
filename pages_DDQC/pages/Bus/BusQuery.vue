<template>
	<view class="myView">
		<!-- 顶部背景图 -->
		<view class="topImage">
			<image style="width: 100%;" lazy-load="true" src="../../static/busBac.png"></image>
		</view>
		<!-- 起终点 -->
		<view class="station">
			<u-cell-group title="起点" :border="false">
				<u-cell-item @click="pickStation('起点')" :title="startStation" :arrow="false" :title-style="{'fontSize': '34rpx','color':'#2D2E2E'}">
					<u-icon slot="right-icon" size="40" name="map"></u-icon>
				</u-cell-item>
			</u-cell-group>
			
			<u-cell-group title="终点" :border="false">
				<u-cell-item @click="pickStation('终点')" :title="endStation" :arrow="false" right-icon="map" :title-style="{'fontSize': '34rpx','color':'#2D2E2E'}">
					<u-icon slot="right-icon" size="40" name="reload"></u-icon>
				</u-cell-item>
			</u-cell-group>
			
			<view class="queryButton" @click="queryClick">查询</view>
		</view>
		
		<view class="around" v-if="stationList.length > 0">附近</view>
		
		<view class="aroundView" v-if="stationList.length > 0">
			<block v-for="(stationItem,stationIndex) in stationList" :key='stationIndex'>
				<view class="aroundViewTop" @click="stationClick(stationList[stationIndex])">
					<image src="../../static/Bus/aroundStation.png" class="aroundImage"></image>
					<view class="aroundStation">{{stationItem.stationName}}</view>
					<view class="distance">距离{{numFilter(stationItem.distance * 100)}}米 > </view>
				</view>
				<view v-if="stationID == stationItem.stationID">
					<block v-for="(item,index) in showLineList" :key='index'>
						<view @click="routeClick(item)" style="border-bottom: 1rpx solid #eeeeee;padding-bottom: 20rpx;margin-left: 77rpx;margin-right: 30rpx;">
							<view class="lineView">
								<view style="font-weight: 900;font-size: 30rpx;color: #343434;">{{item.lineName}}</view>
								<!-- <view class="lineText" style="font-weight: 900;font-size: 30rpx;color: #4282FF;">{{item.arriveTime}}</view> -->
							</view>
							<view class="lineView">
								<view class="lineText">{{item.endName}}</view>
								<!-- <view class="lineText">{{item.distance}}</view> -->
							</view>
						</view>
					</block>
					<view class="bottomView">
						<view class="more" @click="moreClick"  v-if="isMoreClick == false">展开</view>
						<view class="more" @click="packUp"  v-if="isMoreClick == true">收起</view>
					</view>
				</view>
				
			</block>
			
		</view>
	</view>
</template>

<script>
	var _self,encryption;
	import $BusInterface from '@/common/Bus.js'
	//导航栏的背景色是在pages设置
	export default {
		data() {
			return {
				startStation:'请选择',//起点
				endStation:'请选择',//终点
				stationList:[],//存放所有站点列表的数组
				stationID:'',//站点ID
				isMoreClick:false,
				allLineList:[],//用来存放所有线路的数组，点击展开时显示需要显示所有线路
				shortLineList:[],//用来存放部分线路的数组，因为有展开功能，所以只展示三条线路，点击展开时显示所有线路
				showLineList:[],//遍历时用到的数组，这个数组不要去动
				currentLongitude:'',//纬度
				currentLatitude:'',//经度
				lineDetail:[],
			}
		},
		//--------------------------------------监听索框点击事件--------------------------------------
		onNavigationBarSearchInputClicked:function(){
			//注意：这里的搜索框是在pages页面设置的，只有当disabled为true的时候搜索框的点击事件才可以触发
			//点击搜索框跳转到公交查询页面
			uni.navigateTo({
				url:"./TransitSearch"
			})
		},
		onLoad() {
			_self = this;
			encryption = $BusInterface.BusInterface.publicCode.encryption;
			_self.getMyLocation();
			uni.getStorage({
				key:'queryBusStation',
				success(data) {
					if(data){
						_self.startStation = data.data.startStation,
						_self.endStation = data.data.endStation
					}
				}
			})
		},
		methods: {
			
			//--------------------------------------获取当前位置的经纬度--------------------------------------
			getMyLocation: function() {
				var that = this;
				uni.getLocation({
					//type默认为wgs84返回gps坐标,gcj02返回国测局坐标,可用于uni.openLocation的坐标
					type: "gcj02",
					//是否解析地址信息，默认false
					geocode: true,
					success: function(res) {
						_self.currentLongitude = res.longitude; //--纬度
						_self.currentLatitude = res.latitude; //--经度
						//请求附近站点信息放在得到坐标之后，避免在发请求之前无坐标信息
						_self.getAroundStationData();
					},
					fail(res) {
						that.isLocation = false;
						uni.showModal({
							title: '温馨提示',
							content: '获取位置失败，请打开定位',
							showCancel: false
						})
					}
				});
			},
			
//——————————————————————————————————————网络请求开始——————————————————————————————————————


			//--------------------------------------根据坐标获取站点数据--------------------------------------
			getAroundStationData:function(){
				
				uni.request({
					url:$BusInterface.BusInterface.getBusStationInfoByLonLat.Url,
					method:$BusInterface.BusInterface.getBusStationInfoByLonLat.method,
					data:{
						lon:_self.currentLongitude,//纬度
						lat:_self.currentLatitude,//纬度
						// lon:117.765241,
						// lat:24.457463,
						encryption: encryption,//编码
					},
					success(res) {
						// console.log('请求成功',res)
						if(res.data.status == true){
							_self.stationList = res.data.data
						}
					},
					fail(res) {
						console.log('请求失败',res)
					}
				})
			},
			//--------------------------------------根据站点请求线路数据--------------------------------------
			getLineData:function(stationName){
				uni.showLoading()
				uni.request({
					url:$BusInterface.BusInterface.getBusLineInfoByStationName.Url,
					method:$BusInterface.BusInterface.getBusLineInfoByStationName.method,
					data:{
						stationName:stationName,
						encryption:encryption,//编码
					},
					success(res) {
						uni.hideLoading()
						console.log('请求成功',res)
						if(res.data.status == true){
							//先清空存放部分线路的数组，避免数据叠加---存放显示部分线路的数组（当前是显示三条数据）
							_self.shortLineList = [];
							//将所有的线路数据存放在allLineList里面，点击展开的时候用到----这个数组不要去动
							_self.allLineList = res.data.data;
							//判断数组长度，如果长度小于3就显示所有数据，如果长度大于3就显示3条数据
							var num = res.data.data.length;
							if(num < 3){
								num = res.data.data.length
							}else {
								num = 3;
							}
							//取不多于三条线路数据展示
							for(var i = 0; i < num; i++){
								_self.shortLineList.push(res.data.data[i])
							}
							_self.showLineList = _self.shortLineList
							// for(var i = 0; i < res.data.data.length; i++){
							// 	// console.log(i)
							// 	_self.getLineDetailInfo(res.data.data[i].lineID,res.data.data[i].lineDirection,stationName,res.data.data)
							// }
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							});
						}
					},
					fail(res) {
						uni.hideLoading()
						console.log('请求失败',res)
					}
				})
			},
			//--------------------------------------根据站点名称获取某条线路距离某个站点即将到站车辆信息--------------------------------------
			getLineDetailInfo:function(lineId,direction,stationName,lineData){
				uni.request({
					url:$BusInterface.BusInterface.getBusLineArriveLeaveStationInfoByLineIdDirectionStationName.Url,
					method:$BusInterface.BusInterface.getBusLineArriveLeaveStationInfoByLineIdDirectionStationName.method,
					data:{
						lineId:lineId,
						direction:direction,
						stationName:stationName,
						encryption:encryption,
					},
					success(res) {
						console.log('请求成功',res)
						if(res.data.status == true){
							_self.lineDetail.push(res.data.data[0])
							console.log('线路详情',_self.lineDetail)
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							});
						}
					},
					fail(res) {
						console.log('请求失败',res)
					}
				})
			},
//——————————————————————————————————————网络请求结束——————————————————————————————————————
			
			
			
//**************************************事件写在这里（开始）**************************************
			
			
			//--------------------------------------查询点击事件--------------------------------------
			queryClick:function(){
				if(_self.startStation == '请选择' || _self.endStation == '请选择'){
					uni.showToast({
						title:'起点或终点不能为空',
						icon:'none'
					})
				}else {
					uni.setStorage({
						key:'queryBusStation',
						data:{
							startStation : _self.startStation,
							endStation : _self.endStation
						},
						complete() {
							//跳转到线路规划页面
							uni.navigateTo({
								// url:'./BusLocation'
								url:'./RoutePlan?startStation=' + _self.startStation + '&endStation=' + _self.endStation
							})
						}
					})
				}
			},
			//--------------------------------------站点点击事件--------------------------------------
			stationClick:function(item){
				//取出站点ID用来判断当前点击的是哪个站点，判断是否可以展开
				_self.stationID = item.stationID;
				//请求线路数据，将站点名称跟下标传过去
				_self.getLineData(item.stationName);
			},
			//--------------------------------------展开点击事件--------------------------------------
			//这里的展开收起功能的原理是一开始只取三组数据赋值给showLineList，点击展开的时候将所有的数据全部赋值给showLineList
			moreClick:function(){
				_self.isMoreClick = !_self.isMoreClick;
				if(_self.isMoreClick == true){
					//显示所有线路
					_self.showLineList = _self.allLineList
				}else {
					//显示部分线路
					_self.showLineList = _self.shortLineList
				}
			},
			
			//--------------------------------------收起点击事件--------------------------------------
			packUp:function(){
				_self.isMoreClick = !_self.isMoreClick;
				//显示部分线路
				_self.showLineList = _self.shortLineList
			},
			//--------------------------------------点击线路跳转到公交位置时间轴页面--------------------------------------
			routeClick:function(option){
				//数组字段统一
				var item = {
					StartName           : option.startName,
					EndName             : option.endName,
					lineID              : option.lineID,
					firstLastTime       : option.firstLastTime,
					LineRouteDirection  : option.lineDirection,
					lineName            : option.lineName,
				}
				//encodeURIComponent较长的字符串传输方式，lastPage这个字段用来给下一个页面判断是从哪个进去的
				uni.navigateTo({
					url:'./BusLocation?lineRoute=' + encodeURIComponent(JSON.stringify(item)) + '&lastPage=' + 'BusQuery'
				})
			},
			//--------------------------------------点击起点/终点--------------------------------------
			pickStation:function(option){
				console.log(option)
				if(option == '起点'){
					//监听事件,监听下个页面返回的值
					uni.$on('busStartStaionChange', function(data) {
					    // data即为传过来的值，给上车点赋值
						_self.startStation = data.data;
					    //清除监听，不清除会消耗资源
					    uni.$off('busStartStaionChange');
					});
				}else if(option == '终点'){
					//监听事件,监听下个页面返回的值
					uni.$on('busEndStaionChange', function(data) {
					    // data即为传过来的值，给上车点赋值
						_self.endStation = data.data;
					    //清除监听，不清除会消耗资源
					    uni.$off('busEndStaionChange');
					});
				}
				
				uni.navigateTo({
					url:'./TransitSearch?type=' + option + '&current=' + 'BusQuery',
					
				})
			},
			
//**************************************事件写在这里（结束）**************************************
			
			
			//---------------------------------------其他方法---------------------------------------
			numFilter(value){
				if(value.length < 5){
					//如果传过来的经纬度长度小于8位就返回原来的
					return value
				}else {
					//截取当前位数到小数点后2位
					let tempVal = parseFloat(value).toFixed(2)
					let realVal = tempVal.substring(0,tempVal.length-1)
					return realVal
				}
			}
		},
		
	}
	
</script>

<style>
	page,
	.myView {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}
	/* 顶部背景图 */
	.topImage{
		margin-top: -1rpx;
	}
	/* 起终点的view */
	.station {
		position: relative;
		background-color: #FFFFFF;
		margin-top: -100rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-radius: 12rpx;
		padding-bottom: 40rpx;
	}
	/* 查询按钮 */
	.queryButton{
		margin-top: 30rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #4282FF;
		color: #FFFFFF;
		border-radius: 12rpx;
		height: 90rpx;
		font-size: 38rpx;
	}
	/* 标题：附近 */
	.around{
		font-size: 32rpx;
		color: #343434;
		margin-left: 40rpx;
		margin-top: 20rpx;
		font-weight: 900;
	}
	/* 显示附近的站点的view */
	.aroundView{
		margin-top: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		padding-bottom: 20rpx;
	}
	.aroundViewTop{
		height: 100rpx;
		width: 100%;
		display: flex;
		flex-direction: row; 
		align-items: center;
	}
	.aroundImage{
		width: 27rpx;
		height: 32rpx;
		margin-left: 36rpx;
	}
	.aroundStation{
		margin-left: 20rpx;
		font-size: 32rpx;
		font-weight: 900;
	}
	.distance{
		margin-left: 20rpx;
		font-size: 24rpx;
		font-weight: 300;
		color: #343434;
	}
	.lineView{
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.lineText{
		font-weight: 300;
		font-size: 26rpx;
		color: #343434;
	}
	.bottomView{
		height: 60rpx;
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.more{
		color: #888888;
		font-size: 28rpx;
		font-weight: 300;
	}
</style>
