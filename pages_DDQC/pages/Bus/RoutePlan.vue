<template>
	<view>
		<view style="padding: 30rpx 30rpx 0 30rpx;">
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
		</view>


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

		<u-card v-for="(item,index) in array" :key='index' :border='false'>
			<view slot='head'>
				<view style="display: inline-block;">
					<text class="item-title-font">{{item.time}}</text>
					<text class="item-title-font title-margin-left">{{item.title}}</text>
				</view>
				<view v-show="item.nonstop" style="float: right;">
					<view style="border: #4282FF solid 1px;border-radius: 10rpx;padding: 0 10rpx;">
						<text class="item-subtitle-font">直达</text>
					</view>
				</view>
			</view>

			<view slot='body'>
				<view>
					<text class="plan-explain-font">{{item.explain}}</text>
				</view>
				<view v-for="(detail,detailIndex) in item.detail" :key='detailIndex'>
					<view class="detail-margin-top">
						<text class="plan-detail-font">{{detail.stationNum}}</text>
						<text class="plan-detail-font title-margin-left">{{detail.stationName}}</text>
					</view>
				</view>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [{
					time: '1小时',
					title: ' 步行1.1公里',
					nonstop: true,
					explain: '40路',
					detail: [{
							stationNum: '29站',
							stationName: '机场路口站上车'
						},
						{
							stationNum: '40路',
							stationName: '约8分钟/趟'
						}
					]
				},
				{
					time: '1小时10分钟',
					title: ' 步行900米',
					nonstop: false,
					explain: '31路 -> 602路',
					detail: [{
							stationNum: '29站',
							stationName: '湖心街东段'
						},
						{
							stationNum: '40路',
							stationName: '约20分钟/趟'
						}
					]
				}],
			}
		},
		onLoad(option) {
			
		},
		methods: {

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
</style>
