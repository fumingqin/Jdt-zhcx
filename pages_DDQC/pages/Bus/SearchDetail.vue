<template>
	<view style="padding: 30rpx 30rpx;">
		<view style="background-color: #FFF;padding: 40rpx 35rpx;border-radius: 12rpx;margin-bottom: 20rpx;" v-for="(item,index) in lineArr"
		 :key="index">
			<view style="display: flex;color: #343434;font-size: 30rpx;align-items: center;justify-content: space-between;">
				<view>
					<view style="color: #4282FF;font-size: 36rpx;">{{item.lineName}}</view>
					<view style="padding-top:20rpx ;">方向&nbsp;&nbsp;{{item.endName}}</view>
				</view>
				<view style="color: #4282FF;font-size: 30`rpx;">
					查看线路
				</view>
			</view>
			<!-- <view style="padding-top: 30rpx;display: flex;align-items: center;justify-content: space-between;">
				<view>{{item.endName}}</view>
				<view style="display: flex;">
					<view style="padding-right: 15rpx;">3分</view>
					<view>600米</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lineArr: []
			}
		},
		onLoad(option) {
			if(option.stationName){
				this.getLineByStationName(option.stationName);
				uni.setNavigationBarTitle({
					title:option.stationName
				})
			}
		},
		methods: {
			//根据站点查询线路
			getLineByStationName: function(stationName) {
				let that=this;
				uni.request({
					url: that.$Bus.BusInterface.getBusLineInfoByStationName.Url,
					method: 'GET',
					data: {
						stationName: stationName,
						encryption: that.$Bus.BusInterface.publicCode.encryption,
					},
					success(res) {
						if (res.data.status) {
							that.lineArr=res.data.data;
						}
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
</style>
