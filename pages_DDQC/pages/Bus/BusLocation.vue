<template>
	<view class="myView">
		<!-- 头部显示信息的view -->
		<view class="topContentInfo">
			<view class="topHead">
				<view>
					<view class="topStation">
						<view class="marginR">{{startStation}}</view>
						<view class="marginR">--></view>
						<view>{{endStation}}</view>
					</view>
					<view class="topStation topTime">
						<view class="marginR">首 {{startTime}}</view>
						<view class="marginR">末 {{endTime}}</view>
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
			<BusTimeSteps :list="stationList" :current="3" :direction="direction"></BusTimeSteps>
		</scroll-view>
		
		<view class="bottomView">
			<view>公交实时位置</view>
			<view @click="turnDirection">转换方向</view>
		</view>
		
	</view>
</template>

<script>
	var _self;
	import BusTimeSteps from '../../../components/BUS/BUS.vue'
	export default {
		components:{
			BusTimeSteps
		},
		data() {
			return {
				startStation:'客运西站',
				endStation:'龙海公交总站',
				startTime:'06:30',
				endTime:'22:00',
				price:'1元',
				direction:'row',
				isClickTurnButton:false,
				stationList:[
					{
						name:'龙海站',
					},
					{
						name:'公交站(1)',
					},
					{
						name:'公交站(2)'
					},
					{
						name:'公交站3'
					},
					{
						name:'公交站4'
					},
					{
						name:'公交站5'
					},
					{
						name:'公交站5'
					},
					{
						name:'公交站5'
					},
					{
						name:'公交站5'
					},
					{
						name:'公交总站'
					},
					
				]
			}
		},
		onLoad(option) {
			_self = this;
		},
		methods: {
			turnDirection:function(){
				_self.isClickTurnButton = !_self.isClickTurnButton;
				if(_self.isClickTurnButton) {
					_self.direction = 'column'
				}else {
					_self.direction = 'row'
				}
				
			}
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
