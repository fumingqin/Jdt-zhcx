<template>
	<view class="myView">
		<!-- 头部显示信息的view -->
		<view class="topContentInfo">
			<view class="topHead">
				<view>
					<view class="topStation">
						<view class="marginR">{{stationInfoArray.StartName}}</view>
						<view class="marginR">→</view>
						<view>{{stationInfoArray.EndName}}</view>
					</view>
					<view class="topStation topTime">
						<view class="marginR">首 {{firstLastTimeArray[0]}}</view>
						<view class="marginR">末 {{firstLastTimeArray[1]}}</view>
						<view class="marginR">票价：{{price}}</view>
					</view>
				</view>
				<image class="turnImage" src="../../static/Bus/bus.png"></image>
			</view>
			<!-- 暂时没有数据，先隐藏 -->
			<view class="topBottom" v-if="false">
				<view class="topBottomLeft">
					<view class="topBottomText">下一站/3分600米</view>
					<view class="topBottomText">预计到达</view>
				</view>
				<view style="width: 50%;">
					<view class="topBottomText">10:00</view>
					<view class="topBottomText">预计起点发车</view>
				</view>
			</view>
		</view>
		
		<!-- 时间轴 -->
		<scroll-view scroll-x="true" class="busTimeStep">
			<!-- <u-steps :list="stationList" :current="2" active-color="#4281FF" mode="number" direction="row"></u-steps> -->
			<BusTimeSteps :list="stationList" :current="stationInfoArray.StartName" :direction="direction" :carLocationArray="carLocationArray"></BusTimeSteps>
		</scroll-view>
		
		<view class="bottomView">
			<view @click="getBusLocationOntime">公交实时位置</view>
			<view @click="turnDirection">转换方向</view>
		</view>
		
	</view>
</template>

<script>
	var _self;
	import BusTimeSteps from '../../../components/BUS/BUS.vue';
	export default {
		components:{
			BusTimeSteps
		},
		data() {
			return {
				startStation:'',
				endStation:'',
				price:'1元',
				direction:'row',//默认横向排列
				isClickTurnButton:false,
				stationInfoArray:[],//接收上一个页面传过来的数据
				firstLastTimeArray:[],//时间
				lineDirection:'',//公交上下行方向0:上行 1:下行
				lineID:'',//线路ID
				stationList:[],//站点数组
				carLocationArray:[],//车辆位置数组
				serverTime:'',//服务器时间
			}
		},
		onLoad(option) {
			_self = this;
			_self.stationInfoArray = JSON.parse(decodeURIComponent(option.lineRoute))
			//从上个页面获取该条线路是上行还是下行
			if(_self.stationInfoArray.LineRoute1Direction == '上行'){
				_self.lineDirection = 0;
			}else {
				_self.lineDirection = 1;
			}
			//获取服务器时间
			_self.getServerTime();
			//根据站点查询线路信息（时间、线路ID）
			_self.getBusLineInfoByStationName();
		},
		methods: {
//-------------------------------------------功能方法模块开始-------------------------------------------
			
			
			
			//-------------------------------------------获取车辆实时位置-------------------------------------------
			getBusLocationOntime:function(){
				_self.getBusLocationByStation();
			},
			//-------------------------------------------调换线路显示的方向-------------------------------------------
			turnDirection:function(){
				_self.isClickTurnButton = !_self.isClickTurnButton;
				if(_self.isClickTurnButton) {
					_self.direction = 'column'
				}else {
					_self.direction = 'row'
				}
			},
			getLine:function(lineRoute){
				return lineRoute.substring(0,lineRoute.indexOf('('));
			},
			
			
//-------------------------------------------功能方法模块结束-------------------------------------------
			
			
			
			
//-------------------------------------------请求方法模块开始-------------------------------------------
			
			
			//----------------------------------根据站点查询线路信息（时间、线路ID）----------------------------------
			getBusLineInfoByStationName:function(){
				uni.request({
					url:_self.$Bus.BusInterface.getBusLineInfoByStationName.Url,
					method:_self.$Bus.BusInterface.getBusLineInfoByStationName.method,
					data:{
						stationName :  _self.stationInfoArray.StartName,
						Encryption  :  _self.$Bus.BusInterface.publicCode.encryption
					},
					success(res) {
						// console.log('请求成功',res)
						if(res.data.status){
							//截取出线路方案的站点名称
							var stationName = _self.getLine(_self.stationInfoArray.LineRoute1)
							//遍历数组，取出与当前站点相对应的时间
							for(var i = 0; i < res.data.data.length; i++) {
								if(stationName == res.data.data[i].lineName && _self.lineDirection == res.data.data[i].lineDirection){
									//取到时间，转成数组
									_self.firstLastTimeArray = res.data.data[i].firstLastTime.split('-')
									//取出线路ID
									_self.lineID = res.data.data[i].lineID
									//请求：根据线路查询改线路的所有站点信息，这个接口需要用到线路ID，线路方向
									_self.getStationByLine();
									//请求：根据线路查询车辆实时位置信息，这个接口需要用到线路ID，线路方向
									_self.getBusLocationByStation();
								}
							}
						}
					},
					fail(res) {
						console.log('请求失败',res)
					}
				})
			},
			//----------------------------------根据线路查询改线路的所有站点信息----------------------------------
			getStationByLine:function(){
				uni.showLoading({
					title:'加载中...'
				})
				uni.request({
					url: _self.$Bus.BusInterface.getBusLineStationInfoByLineIdDirection.Url,
					method: _self.$Bus.BusInterface.getBusLineStationInfoByLineIdDirection.method,
					data:{
						lineId     : _self.lineID,
						direction  : _self.lineDirection,
						Encryption : _self.$Bus.BusInterface.publicCode.encryption
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status){
							_self.stationList = res.data.data
						}
					},
					fail(res) {
						uni.hideLoading()
						console.log('请求失败',res)
					}
				})
			},
			//----------------------------------根据线路编号和运行方向获取某条线路即将到站的车辆信息----------------------------------
			getBusLocationByStation:function(){
				uni.request({
					url: _self.$Bus.BusInterface.getBusArriveLeaveStationInfoByLineIdDirection.Url,
					method: _self.$Bus.BusInterface.getBusArriveLeaveStationInfoByLineIdDirection.method,
					data:{
						lineId      : _self.lineID,
						direction   : _self.lineDirection,
						Encryption  : _self.$Bus.BusInterface.publicCode.encryption
					},
					success(res) {
						console.log('请求实时到站信息成功',res)
						if(res.data.status){
							for(var i = 0; i < res.data.data.length; i++){
								//车辆时时到站时间戳
								var arriveTime = new Date(res.data.data[i].generationTime).getTime()
								//用服务器时间戳减去车辆到站的时间戳
								var date = _self.serverTime - arriveTime
								//得到的时间差是分钟（车辆到站与服务器的时间差），如果时间超过30分钟就不显示
								var miun = date / (60*60)
								if(miun >= 30){
									res.data.data.splice(i,1)
								}
							}
							_self.carLocationArray = res.data.data
						}
					},
					fail(res) {
						console.log('请求实时到站信息失败',res)
					}
				})
			},
			//----------------------------------获取服务器时间----------------------------------
			getServerTime:function(){
				uni.request({
					url: _self.$Bus.BusInterface.getServerTime.Url,
					method: _self.$Bus.BusInterface.getServerTime.method,
					data:{
						Encryption  : _self.$Bus.BusInterface.publicCode.encryption
					},
					success(res) {
						if(res.data.status){
							_self.serverTime = new Date(res.data.data).getTime()
						}
					},
					fail(res) {
						console.log('请求实时到站信息失败',res)
					}
				})
			},
			
			
//-------------------------------------------请求方法模块结束-------------------------------------------
		}
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
	.topContentInfo{
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
		background-color: #4281FF;
	}
	.topHead {
		margin-left: 30rpx;
		margin-right: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.topStation{
		display: flex;
		align-items: center;
		color: #FFFFFF;
		font-size: 30rpx;
	}
	.topTime{
		margin-top: 20rpx;
		font-size: 26rpx;
		margin-bottom: 30rpx;
	}
	.marginR {
		margin-right: 20rpx;
	}
	.turnImage{
		height: 43rpx;
		width: 52rpx;
		margin-right: 40rpx;
	}
	.topBottom{
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.topBottomLeft{
		width: 50%;
		border-right: 1rpx solid #FFFFFF;
	}
	.topBottomText{
		text-align: center;
		color: #FFFFFF;
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}
	.busTimeStep{
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		width: 710rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		padding-top: 50rpx;
	}
	.bottomView{
		position: fixed;
		bottom: 0;
		height: 100rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		text-align: center;
	}
	.bottomView>view:first-child{
		width: 50%;
		font-size: 30rpx;
	}
	.bottomView>view:last-child{
		width: 50%;
		font-size: 30rpx;
	}
</style>
