<!-- 公交搜索 -->
<template>
	<view>
		<view class="header-view">
			<u-search placeholder="搜索线路/站点" v-model="keyword" height="80" @search="busSearch" @custom="busSearch" @change="keyWordChange"></u-search>
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
					<view v-for="(item,index) in historyArr" :key="index" hover-class="view_hover" @click="itemClick(item)">
						<!--begin 搜索线路显示结果 -->
						<view class="history-content-detial" v-if="item.endName&&IsHome">
							<view class="history-content-name">
								<image src="../../static/Bus/bus.png" class="history-content-img"></image>
							</view>
							<view class="history-content-name">{{item.lineName}} </view>
							<view class="history-content-name" v-if="item.endName">方向</view>
							<view v-if="item.endName">{{item.endName}}</view>
						</view>
						<!--end 搜索线路显示结果 -->

						<!--begin 搜索站点显示结果 -->
						<view class="history-content-detial" v-if="!item.endName">
							<view class="history-content-name">
								<image src="../../static/Bus/site.png" class="history-content-img"></image>
							</view>
							<view class="history-content-name">{{item.stationName}} </view>
						</view>
						<!--end 搜索站点显示结果  -->
					</view>
				</view>
			</view>
		</view>
		<view class="search-content" v-if="IsSearch">
			<view v-for="(item,index) in searchArr" :key="index" hover-class="view_hover">
				<view class="search-content-font" @click="itemClick(item)" v-if="!item.endName">
					{{item.stationName}}
				</view>
				<view class="search-content-font" @click="itemClick(item)" v-if="item.endName&&IsHome">
					{{item.lineName +" 方向 "+item.endName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				keyword: '',
				IsSearch: false, //是否点击搜索
				historyArr: [],
				searchArr: [],
				currnet: '', //当前是从哪个页面进来
				type: '', //起点/终点
				IsHome: true,
			}
		},
		onLoad(option) {
			that = this;
			this.historyArr = uni.getStorageSync("history") || [];
			this.currnet = option.current
			if (option.type) {
				this.type = option.type;
				this.IsHome = false;
			}
		},
		methods: {
			//——————————————————————————————————————方法区——————————————————————————————————————
			//--------------------------------------清除历史记录--------------------------------------
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
			//--------------------------------------搜索框值变化时触发--------------------------------------
			keyWordChange: function(value) {
				if (this.keyword == "") {
					//当输入框里面的值为空时清空数组
					this.searchArr = [];
					this.IsSearch = false;
				} else {
					//当输入框里面的值发生变化的时候时时搜索
					that.keyword = value;
					that.busSearch();
				}
			},
			//——————————————————————————————————————方法区结束——————————————————————————————————————



			//——————————————————————————————————————网络请求开始——————————————————————————————————————

			//--------------------------------------公交查询--------------------------------------
			busSearch: function() {
				let that = this;
				that.searchArr = [];
				uni.showLoading({
					title: "搜索中...",
					mask: true
				})
				if (that.keyword != "") {
					uni.request({
						url: that.$Bus.BusInterface.getBusLineInfoByLineName.Url,
						method: that.$Bus.BusInterface.getBusLineInfoByLineName.method,
						data: {
							lineName: that.keyword,
							encryption: that.$Bus.BusInterface.publicCode.encryption,
						},
						success(res) {
							if (res.data.status) {
								that.searchArr = res.data.data;
							}
						},
						complete(res) {
							uni.request({
								url: that.$Bus.BusInterface.getBusStationInfoByStationName.Url,
								method: that.$Bus.BusInterface.getBusStationInfoByStationName.method,
								data: {
									stationName: that.keyword,
									encryption: that.$Bus.BusInterface.publicCode.encryption,
								},
								success(res) {
									console.log(res.data.data)
									if (res.data.data.length > 0) {
										if (that.searchArr == []) {
											that.searchArr = res.data.data;
										} else {
											for (var i = 0; i < res.data.data.length; i++) {
												that.searchArr.push(res.data.data[i]);
											}
										}
									}
								},
								complete() {
									that.IsSearch = true;
									uni.hideLoading();
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
			//--------------------------------------点击查询的结果--------------------------------------
			itemClick: function(item) {
				let that = this;
				that.IsSearch = false;
				//如果是从公交首页进来的话
				if (that.currnet == 'BusQuery') {
					if (that.type == '起点') {
						//当前是起点
						uni.$emit('busStartStaionChange', {
							data: item.stationName
						});
						uni.navigateBack();
					} else if (that.type == '终点') {
						//当前是终点
						uni.$emit('busEndStaionChange', {
							data: item.stationName
						});
						uni.navigateBack();
					}
				} else {
					if (item.stationName) {
						uni.navigateTo({
							url: "./SearchDetail?stationName=" + item.stationName,
						})
					} else {
						//数组字段统一
						var itemArray = {
							StartName: item.startName,
							EndName: item.endName,
							lineID: item.lineID,
							firstLastTime: item.firstLastTime,
							LineRouteDirection: item.lineDirection,
							lineName: item.lineName,
							ChangStation: item.startName,
						}
						uni.navigateTo({
							url: './BusLocation?lineRoute=' + encodeURIComponent(JSON.stringify(itemArray)) + '&lastPage=' +
								'SearchDetail'
						})
					}
				}
				for (var i = 0; i < that.historyArr.length; i++) {
					if (item.lineName && item.lineName == that.historyArr[i].lineName && item.endName == that.historyArr[i].endName) {
						that.historyArr.splice(i, 1);
					}
					if (item.stationName && item.stationName == that.historyArr[i].stationName) {
						that.historyArr.splice(i, 1);
					}
				}
				that.historyArr.unshift(item);
				uni.setStorageSync("history", that.historyArr);
			},
			//——————————————————————————————————————网络请求结束——————————————————————————————————————
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

	.view_hover {
		transition: all .3s; //过度
		opacity: 0.9;
		background: #bdbdbd;
	}
</style>
