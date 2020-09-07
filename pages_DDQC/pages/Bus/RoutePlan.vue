<template>
	<view>
		<!-- <view style="padding: 30rpx 30rpx 0 30rpx;">
			<view class="title-block">
				<view  style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 100%;">
					<view>
						<view>
							<text class="site-name-font site-name-color">南平汽车站</text>
							<u-icon name="arrow-rightward" class="icon-block" color="#FFFFFF" size="28"></u-icon>
							<text class="site-name-font site-name-color">南平动车站</text>
						</view>
						<view style="margin-top: 20rpx;">
							<text class="site-name-font site-name-color">发车时间：15:00</text>
						</view>
					</view>
					<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
					 style="float: right;width: 100rpx;height: 100rpx;" mode="aspectFill"></image>
				</view>
			</view>
		</view> -->


		<!-- <u-card class="title-block" :show-head='false' :show-foot='false' :foot-border-top='false' :border='false' :head-border-bottom='false'>
				<view slot='body' class="title-block">
					<view class="u-body-item u-flex u-col-between u-p-t-0" >
						<view class="u-body-item-title u-line-2">
							<view>
								<text class="site-name-font">南平汽车站</text>
								<u-icon name="arrow-rightward" class="icon-block" color="#FFFFFF" size="28"></u-icon>
								<text class="site-name-font">南平动车站</text>
							</view>
							<view style="margin-top: 20rpx;">
								<text class="site-name-font">发车时间：15:00</text>
							</view>
						</view>
						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" style="width: 20rpx;height: 20rpx;" mode="aspectFill"></image>
					</view>
				</view>
			</u-card> -->

		<u-card v-for="(item,index) in planArr" :key='index' :border='false'>
			<view slot='head'>
				<view style="display: inline-block;">
					<text class="item-title-font">{{getLine(item.LineRoute1)}}</text>
					<u-icon v-if="item.ChangeType == 1 || item.ChangeType == 2" name="arrow-rightward" class="icon-block" color="#343434" size="28"></u-icon>
					<text v-if="item.ChangeType == 1 || item.ChangeType == 2" class="item-title-font">{{getLine(item.LineRoute2)}}</text>
					<u-icon v-if="item.ChangeType == 2" name="arrow-rightward" class="icon-block" color="#343434" size="28"></u-icon>
					<text v-if="item.ChangeType == 2" class="item-title-font">{{getLine(item.LineRoute3)}}</text>
				</view>
				<view v-show="item.ChangeType == 0" style="float: right;">
					<view style="border: #4282FF solid 1px;border-radius: 10rpx;padding: 0 10rpx;">
						<text class="item-subtitle-font">直达</text>
					</view>
				</view>
			</view>

			<view slot='body'>
				<!--起点-->
				<view>
					<text class="plan-detail-font">{{item.StartName}}</text>
				</view>
				<view class="detail-margin-top detail-margin-left">
					<text class="plan-detail-font">乘坐</text>
					<text @click="toLineDetail(item)" class="plan-detail-font title-margin-left attention">{{item.LineRoute1}}</text>
				</view>
				<!--第一次换乘信息-->
				<view v-show="item.ChangeType == 1 || item.ChangeType == 2" class="detail-margin-top detail-margin-left">
					<text class="plan-detail-font attention">{{item.ChangStation1}}</text>
					<text class="plan-detail-font title-margin-left ">换乘</text>
				</view>
				<view v-show="item.ChangeType == 1 || item.ChangeType == 2" class="detail-margin-top detail-margin-left">
					<text class="plan-detail-font">乘坐</text>
					<text class="plan-detail-font title-margin-left attention">{{item.LineRoute2}}</text>
				</view>
				<!--第二次换乘信息-->
				<view v-show="item.ChangeType == 2" class="detail-margin-top detail-margin-left">
					<text class="plan-detail-font attention">{{item.ChangStation2}}</text>
					<text class="plan-detail-font title-margin-left">换乘</text>
				</view>
				<view v-show="item.ChangeType == 2" class="detail-margin-top detail-margin-left">
					<text class="plan-detail-font">乘坐</text>
					<text class="plan-detail-font title-margin-left attention">{{item.LineRoute3}}</text>
				</view>
				<!--终点-->
				<view class="detail-margin-top">
					<text class="plan-detail-font">{{item.EndName}}</text>
				</view>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startStation:'',
				endStation:'',
				planArr:[],
			}
		},
		onLoad(option) {
			let that = this;
			that.startStation = option.startStation;
			that.endStation = option.endStation;
			that.getBusChange();
		},
		methods: {
			getBusChange:function(){
				let that = this;
				uni.showLoading({
					mask:true,
					title:'加载中'
				});
				uni.request({
					url:that.$Bus.BusInterface.getBusChange.Url,
					data:{
						Encryption:that.$Bus.BusInterface.publicCode.encryption,
						StartStation:that.startStation,
						EndStation:that.endStation
					},
					method:that.$Bus.BusInterface.getBusChange.method,
					success:function(res){
						uni.hideLoading(); 
						if(res.data.status){
							that.planArr = res.data.data;
						}
						else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							});
						}
					},
					fail:function(res){
						uni.showToast({
							title:'网络连接失败',
							icon:'none'
						});
					}
				});
			},
		
			getLine:function(lineRoute){
				return lineRoute.substring(0,lineRoute.indexOf('('));
			},
			
			toLineDetail:function(lineRoute){
				uni.navigateTo({
					url:'./BusLocation?lineRoute=' + JSON.stringify(lineRoute)
				});
			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.title-block {
		//想名字是真NM的头疼
		margin-bottom: 20rpx;
		padding: 40rpx 40rpx;
		background-color: #4282FF;
		display: flex;
		flex-direction: row;
		border-radius: 16rpx;
	}
`
	.site-name-font {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
	}
	
	.site-name-color{
		color: #FFFFFF;
	}

	.icon-block {
		margin: 0 20rpx;
	}

	.item-title-font {
		font-size: 32rpx;
		font-family: Source Han Sans SC;
		font-weight: 500;
		color: #343434;
	}

	.title-margin-left {
		margin-left: 20rpx;
	}

	.item-subtitle-font {
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: #4282FF;
	}

	.plan-explain-font {
		font-size: 32rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #4282FF;
	}

	.plan-detail-font {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: #343434;
	}

	.detail-margin-top {
		margin-top: 20rpx;
	}
	
	.detail-margin-left {
		margin-left: 40rpx;
	}
	
	.attention{
		color: #4282FF;
		font-weight: bold;
	}
</style>
