<template>
	<view>
		<view style="background-color: #FFF;padding: 30rpx 30rpx;">
			<u-search placeholder="搜索线路/站点/地点" v-model="keyword"  height="80" @search="busSearch" @custom="busSearch"></u-search> 
		</view>
		<view style="padding: 30rpx 30rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="color: #333333;font-weight: bold;font-size: 32rpx;">
					搜索历史
				</view>
				<view>
					<image src="../../static/Bus/delete.png" style="width: 36rpx;height: 36rpx;" @click="deleteHistory"  v-if="historyArr.length>0"></image>
				</view>
			</view>
			<view style="margin-top: 30rpx;background-color: #FFF;border-radius: 12rpx;" v-if="historyArr.length>0">
				<view style="padding: 40rpx 30rpx;font-size: 30rpx;">
					<view v-for="(item,index) in historyArr" :key="index" style="display: flex;align-items: center;padding:10rpx 0;">
						<view style="padding-right: 15rpx;">
							<image src="../../static/Bus/bus.png" style="width: 32rpx;height: 32rpx;"></image>
						</view>
						<view style="width: 110rpx;">{{item.lineName}} </view>
						<view style="padding-right: 15rpx;">方向</view>
						<view>{{item.endStation}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				historyArr:[
					{
						lineName:'42路',
						endStation:'五金机电产业园（亚伦站）'
					},
					{
						lineName:'42路',
						endStation:'五金机电产业园（亚伦站）'
					},
					{
						lineName:'42路',
						endStation:'五金机电产业园（亚伦站）'
					},
					{
						lineName:'k402路',
						endStation:'五金机电产业园（亚伦站）'
					}
				]
			}
		},
		methods: {
			//清除历史记录
			deleteHistory:function(){
				uni.showToast({
					title:'这是清除历史记录'
				})
			},
			//公交查询
			busSearch:function(){
				uni.showToast({
					title:'这是公交查询事件'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
</style>
