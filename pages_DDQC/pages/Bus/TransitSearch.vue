<!-- 公交搜索 -->
<template>
	<view>
		<view class="header-view">
			<u-search placeholder="搜索线路/站点" v-model="keyword" height="80" @search="busSearch" @custom="busSearch" @change="clear"></u-search>
		</view>
		<view class="history-main" v-if="!IsSearch">
			<view class="history-main-view">
				<view class="history-main-font">
					搜索历史
				</view>
				<view>
					<image class="history-main-img" src="../../static/Bus/delete.png" @click="deleteHistory" v-if="historyArr.length>0"></image>
				</view>
			</view>
			<view class="history-content" v-if="historyArr.length>0">
				<view class="history-content-view">
					<view v-for="(item,index) in historyArr" :key="index">
						<view class="history-content-detial" v-if="item.endName"> 
							<view class="history-content-name">
								<image src="../../static/Bus/bus.png" class="history-content-img"></image>
							</view>
							<view class="history-content-name">{{item.lineName}} </view>
							<view class="history-content-name" v-if="item.endName">方向</view>
							<view v-if="item.endName">{{item.endName}}</view>
						</view>
						<view class="history-content-detial" v-if="!item.endName">
							<view class="history-content-name">
								<image src="../../static/Bus/site.png" class="history-content-img"></image>
							</view>
							<view class="history-content-name">{{item.stationName}} </view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="search-content" v-if="IsSearch">
			<view v-for="(item,index) in searchArr" :key="index">
				<view class="search-content-font" @click="itemClick(item)">
					{{item.lineName?item.lineName:item.stationName}}{{item.endName?" 方向 "+item.endName :""}}
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
				IsSearch: false, //是否点击搜索
				historyArr: [],
				searchArr: [],
			}
		},
		onLoad() {
			this.historyArr = uni.getStorageSync("history") || [];
		},
		methods: {
			//清除历史记录
			deleteHistory: function() {
				let that = this;
				uni.showModal({
					title: "提示",
					content: "您是否要清空搜索历史",
					success(res) {
						if (res.confirm) {
							that.historyArr = [];
							uni.removeStorageSync('history')
						}
					}
				})
			},
			//公交查询
			busSearch: function() {
				let that = this;
				that.searchArr = [];
				if (that.keyword != "") {
					uni.request({
						url: "http://36.250.234.10:60040/api/Bus/getBusLineInfoByLineName",
						method: 'GET',
						data: {
							lineName: that.keyword,
							encryption: "XMJDTzzbusxmjdt"
						},
						success(res) {
							if (res.data != "未将对象引用设置到对象的实例。") {
								console.log(res)
								that.searchArr = res.data;
							}
						},
						complete(res) {
							uni.request({
								url: "http://36.250.234.10:60040/api/Bus/getBusStationInfoByStationName",
								method: 'GET',
								data: {
									stationName: that.keyword,
									encryption: "XMJDTzzbusxmjdt"
								},
								success(res) {
									if (res.data.length > 0) {
										if (that.searchArr = []) {
											that.searchArr = res.data;
										} else {
											that.searchArr.push(res.data);
										}
										console.log(that.searchArr);
									}
								},
								complete() {
									that.IsSearch = true;
								}
							})
						}
					})
				} else {
					uni.showToast({
						title: '请输入内容',
						icon: "none"
					})
				}
			},
			//点击查询的结果
			itemClick: function(item) {
				let that = this;
				that.IsSearch = false;
				for (var i = 0; i < that.historyArr.length; i++) {
					if (item.lineName&&item.lineName == that.historyArr[i].lineName && item.endName == that.historyArr[i].endName) {
						that.historyArr.splice(i,1);
					}
					if(item.stationName&&item.stationName== that.historyArr[i].stationName){
						that.historyArr.splice(i,1);
					}
				}
				that.historyArr.unshift(item)
				uni.setStorageSync("history", that.historyArr)
			},
			//搜索框清空时触发
			clear: function() {
				if (this.keyword == "") {
					this.searchArr = [];
					this.IsSearch = false;
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.header-view {
		background-color: #FFF;
		padding: 30rpx 30rpx;
	}

	.history-main {
		padding: 30rpx 30rpx;
	}

	.history-main-view {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.history-main-font {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.history-main-img {
		width: 36rpx;
		height: 36rpx;
	}

	.history-content {
		margin-top: 30rpx;
		background-color: #FFF;
		border-radius: 12rpx;
	}

	.history-content-view {
		padding: 40rpx 30rpx;
		font-size: 30rpx;
	}

	.history-content-detial {
		display: flex;
		align-items: center;
		padding: 15rpx 0;
	}
 
	.history-content-name {
		padding-right: 15rpx;
	}
 
	.history-content-img {
		width: 32rpx;
		height: 32rpx;
	}

	.search-content {
		background-color: #FFF;
		padding: 30rpx;
	}

	.search-content-font {
		padding: 20rpx 0 30rpx 0;
		border-bottom: solid 1rpx #F5F5F5;
		font-size: 30rpx;
	}
</style>
