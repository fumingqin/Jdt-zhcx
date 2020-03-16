<template>
	<view class="content">
		<map id="map1" class="map" :latitude="centerLatitude" :longitude="centerLongitude" :markers="latLonArray" :show-location="showLocation"
		:scale="scale" :polyline="polyline" :controls="controls">
			<view class="orderInfo">
				<view style="font-size:32rpx; margin: 20rpx 30rpx;">{{orderInfo.station}}</view>
				<view class="textView">出发时间：{{orderInfo.time}}</view>
				<view class="textView">当前所在站点：{{orderInfo.currentStation}}</view>
				<view class="textView">预计到站：{{orderInfo.stationNum}}</view>
				<view class="textView">预计时间：{{orderInfo.dowStation}}</view>
				<view class="buttonView">
					<button>查看司机</button>
					<button>联系司机</button>
				</view>
			</view>
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo:{
					station:'泉州客运中心 — 安溪',
					time:'12:30',
					currentStation:'茶叶大厦',
					stationNum:'3个站点',
					dowStation:'15分钟'
				},
				scale:9,
				centerLatitude:"",//地图中心点纬度
				centerLongitude:"",//地图中心点经度
				lon:0,//当前位置经度
				lat:0,//当前位置纬度
				points:[],
				polyline:[{
					points:[
						{latitude:24.8998255600,longitude:118.6296674400},
						{latitude:24.9088735900,longitude:118.5369914600},
						{latitude:24.9512072300,longitude:118.4188855500},
						{latitude:25.0395798900,longitude:118.1991594400},
					],
					color:"#669253",
					width:2,
					arrowLine: true,
				}],//线
				interval:0,//定时器值
				markers: [], //标记点
				showLocation:true,
				mapContext: '', //mapContext对象
				index: 0,
				latLonArray:[
					{
						id: 0,
						latitude:'24.8998255600',
						longitude:'118.6296674400',
						iconPath:'../../static/CZC/Start',
						callout: { //自定义标记点上方的气泡窗口 点击有效
							content: '丰泽区', //文本
							color: '#FC4646', //文字颜色
							fontSize: 10, //文本大小
							borderRadius: 2, //边框圆角
							bgColor: '#FFFFFF', //背景颜色
							display: 'ALWAYS', //常显
							padding:1,
						},
					},
					{
						id: 1,
						latitude:'24.9088735900',
						longitude:'118.5369914600',
						iconPath:'../../static/CZC/Start',
						callout: { //自定义标记点上方的气泡窗口 点击有效
							content: '鲤城区', //文本
							color: '#FC4646', //文字颜色
							fontSize: 14, //文本大小
							borderRadius: 2, //边框圆角
							bgColor: '#FFFFFF', //背景颜色
							display: 'ALWAYS', //常显
							padding:1,
						},
					},
					{
						id: 2,
						latitude:'24.9512072300',
						longitude:'118.4188855500',
						iconPath:'../../static/CZC/Start',
						callout: { //自定义标记点上方的气泡窗口 点击有效
							content: '南安市', //文本
							color: '#FC4646', //文字颜色
							fontSize: 14, //文本大小
							borderRadius: 2, //边框圆角
							bgColor: '#FFFFFF', //背景颜色
							display: 'ALWAYS', //常显
							padding:1,
						},
					},
					{
						id: 3,
						latitude:'25.0395798900',
						longitude:'118.1991594400',
						iconPath:'../../static/CZC/end',
						callout: { //自定义标记点上方的气泡窗口 点击有效
							content: '安溪县', //文本
							color: '#FC4646', //文字颜色
							fontSize: 14, //文本大小
							borderRadius: 2, //边框圆角
							bgColor: '#FFFFFF', //背景颜色
							display: 'ALWAYS', //常显
							padding:1,
						},
					}
				]
			}
		},
		onLoad() {
			var that = this;
			// 获取自身位置
			that.getMyLocation();
			// console.log('这是点的数组',pointArray);
			//获取坐标，绘制路线
			that.getPoint();
			
		},
		methods: {
			//获取坐标，绘制路线
			getPoint:function() {
				var that = this;
				var points = [];
				points:[
					{latitude:24.8998255600,longitude:118.6296674400},
					{latitude:24.9088735900,longitude:118.5369914600},
					{latitude:24.9512072300,longitude:118.4188855500},
					{latitude:25.0395798900,longitude:118.1991594400}
				];
				var obj = {
					points : points,
					color:"#669253",
					width:2,
					arrowLine: true,
				};
				that.polyline.push(obj);//给线数组赋值
			},
			//获取自身位置
			getMyLocation:function() {
				console.log('自身定位');
				var that = this;
				uni.getLocation({
					//type默认为wgs84返回gps坐标,gcj02返回国测局坐标,可用于uni.openLocation的坐标
					type:"gcj02",
					//是否解析地址信息，默认false
					geocode:true,
					success:function(res) {
						//获取当前位置信息成功后，给当前位置赋值
						that.lon = res.longitude;
						that.lat = res.latitude;
						//如果地图中心位置坐标为空，将当前位置坐标设置为地图中心坐标
						if(that.centerLatitude == "" && that.centerLongitude == ""){
							that.centerLongitude = that.lon;
							that.centerLatitude = that.lat;
						}
					}
				});
			},
		}
	}
</script>

<style>
	page,.content {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.map{
		width: 100%;
		height: 100%;
		position: fixed;
		margin: 0;
		padding: 0;
	}
	.orderInfo {
		background: #FFFFFF;
		width: 90%;
		height: auto;
		position: fixed;
		bottom: 60rpx;
		left: 5%;
		right: 5%;
		border-radius: 20rpx;
		display: block;
	}
	.textView {
		font-size: 28rpx;
		color: #666666;
		font-weight: 300;
		line-height: 26rpx;
		margin: 20rpx 30rpx;
	}
	.buttonView {
		width: 90%;
		margin: 20rpx 30rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
	}
	.buttonView button {
		border-radius: 12rpx;
		width: 45%;
		height: 84rpx;
		font-size: 34rpx;
		color: #FFFFFF;
		font-weight: 300;
	}
	.buttonView>button:first-child {
		background: #06B4FD;
	}
	.buttonView>button:last-child {
		background: #FC4646;
	}
</style>
