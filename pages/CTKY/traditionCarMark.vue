<template>
	<view class="content">
		<!-- 创建地图组件: -->
		<map class="map" :longitude="longitude" :latitude="latitude" :scale="scale"
		:markers="markers" :polyline="polyline" :show-location="showLlocation">
		    <view class="info">
				<view class="title">{{info.station}}</view>
				<view>
					<view>{{info.time}}</view>
					<view>上车点：{{info.startStation}}</view>
					<view>下车点：{{info.endStation}}</view>
				</view>
			</view>
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					station:"泉州客运中心 — 安溪",
					time:"08月31日    12:30出发",
					startStation:"泉州客运中心站",
					endStation:"安溪"
				},
				longitude:"",//地图中心点经度
				latitude:"",//地图中心点纬度
				scale:12,//地图缩放比例
				markers:[
					{
						id: 0,
						latitude:'24.8906763700',
						longitude:'118.5991555300',
						iconPath:'../../static/CTKY/Start.png',
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
						id: 0,
						latitude:'24.9102214500',
						longitude:'118.6143540000',
						iconPath:'../../static/CTKY/end.png',
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
				],//标记点
				polyline:[{
					points:[
						{latitude:24.8906763700,longitude:118.5991555300},
						{latitude:24.8956956900,longitude:118.6019855900},
						{latitude:24.8937906600,longitude:118.6079971900},
						{latitude:24.9014643600,longitude:118.6111359200},
						{latitude:24.9102214500,longitude:118.6143540000},
					],
					color:"#669253",
					width:2,
					arrowLine: true,
				}],//规划的线
				showLlocation:true,//是否显示当前位置
			}
		},
		onLoad() {
			var that = this;
			//获取自身位置
			that.getMyLocation();
		},
		methods: {
			//获取自身位置
			getMyLocation:function(){
				var that = this;
				uni.getLocation({
					type:"gcj02",
					geocode:true,
					success:function(res){
						//获取当前位置成功之后，给当前位置的经纬度赋值
						if(that.longitude == "" && that.latitude == "") {
							that.longitude = res.longitude;
							that.latitude = res.latitude;
						}
					}
				})
			}
		}
	}
</script>

<style>
	page,.content {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.map {
		width: 100%;
		height: 100%;
		position: fixed;
		margin: 0;
		padding: 0;
	}
	.info {
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
	.title {
		margin-top: 20rpx;
		margin-left: 20rpx;
		font-size: 30rpx;
		color: #2C2D2D;
	}
	.info>view:last-child {
		margin-top: 10rpx;
		margin-left: 20rpx;
		font-size: 26rpx;
		color: #999999;
		margin-bottom: 20rpx;
		font-weight: 300;
	}
	.info>view:last-child>view {
		margin-top: 10rpx;
	}
</style>