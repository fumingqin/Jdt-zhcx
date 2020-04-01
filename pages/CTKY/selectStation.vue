<template>
	<view class="contentView">
		<view class="colorView"></view>
		
		<!-- 上车点 -->
		<view class="stationContentView">
			
			<!-- 标题：当前上车点 -->
			<view class="titleView">当前上车点</view>
			<!-- 放置站点的view -->
			<view class="stationView">
				<view class="deSelect" :class="{'select':startSelectIndex == index}" @tap="startStationClick(startStationList[index])" v-for="(item,index) in startStationList" :key="index">
					<text class="deSelectColor" :class="{'selectColor' : startSelectIndex == index}">{{item.stationName}}</text>
				</view>
			</view>
			
		</view>
		
		<!-- 选择下车点 -->
		<view class="stationContentView" style="margin-top: 20rpx;">
			<!-- 标题：选择下车点 -->
			<view class="titleView">选择下车点</view>
			<!-- 放置站点的view -->
			<view class="stationView">
				<view class="deSelect" :class="{'select':endSelectIndex == index}" @tap="endStationClick(endStationList[index])" v-for="(item,index) in endStationList" :key="index">
					<text class="deSelectColor" :class="{'selectColor' : endSelectIndex == index}">{{item.stationName}}</text>
				</view>
			</view>
		</view>
		
		<!-- 完成 -->
		<view class="doneView" @tap="doneClick">
			<text style="font-size: 36rpx;line-height: 100rpx;">完成</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startSelectIndex:-1,//记录上车点点击的下标
				endSelectIndex:-1,//记录下车点点击下标
				startStationList:[],//上车点数组
				endStationList:[],//下车点数组
				startStation:'',//上车点
				endStation:'',//下车点
			}
		},
		onLoad(param) {
			//加载数据提示菊花
			uni.showLoading();
			// 获取站点数据
			uni.request({
				url:'http://111.231.109.113:8000/api/MyTest/GetBusLineStation',
				method:'GET',
				header:{'content-type':'application/json'},
				data:{
					LineCode:1
				},
				success: (res) => {
					//请求成功取消菊花
					uni.hideLoading()
					// console.log(res.data);
					for (var i = 0; i < res.data.length; i++) {
						var that = this;
						var stationInfo = {
							// 站点名称
							stationName : res.data[i].Bls_StationName,
							index : i,
						}
						//保存上车点数组
						that.startStationList.push(stationInfo);
						//保存下车点数组
						that.endStationList.push(stationInfo);
						//定位已选择的上车点
						that.startSelectIndex = param.startStaionIndex;
						//定位已选择的下车点
						that.endSelectIndex = param.endStationIndex;
					}
				},
			})
		},
		methods: {
			//--------------------------选中上车点--------------------------
			startStationClick(e){
				var that = this;
				//给选择的下标赋值
				that.startSelectIndex = e.index;
				//取出上车站点
				this.startStation = that.startStationList[e.index].stationName;
			},
			//--------------------------选中下车点---------------------------
			endStationClick(e){
				var that = this;
				//给选择的下标赋值
				that.endSelectIndex = e.index;
				//取出下车站点
				this.endStation = that.endStationList[e.index].stationName;
			},
			//---------------------------点击完成---------------------------
			doneClick(){
				var that = this;
				let startSelectIndex = that.startSelectIndex;
				let endSelectIndex = that.endSelectIndex;
				if(that.startStation == '') {
					that.startStation = that.startStationList[startSelectIndex].stationName;
				}
				if(that.endStation == '') {
					that.endStation = that.endStationList[endSelectIndex].stationName;
				} 
				//将上下车点放到一个数组中
				var stationArray = {
					startStation:that.startStation,
					startStationIndex:startSelectIndex,
					
					endStation:that.endStation,
					endStationIndex:endSelectIndex,
				}
				//将上下车点数组保存到缓存
				uni.setStorage({
					key:"CTKYStationList",
					data:stationArray,
					success() {
						uni.navigateBack()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page,.content {
		background-color: #F5F9FC;
		width: 100%;
		height: 100%;
	}
	/* 顶部显示颜色的view */
	.colorView {
		width: 100%;
		height: 100rpx;
		background-color: #FE6C66;
		
	}
	/* 站点容器 */
	.stationContentView {
		margin-top: -50rpx;
		margin-left: 2%;
		margin-right: 2%;
		border-radius: 20rpx;
		width: 96%;
		background-color: #FFFFFF;
	}
	/* 标题view */
	.titleView {
		padding-top: 20rpx;
		padding-left: 32rpx;
		color: #333333;
		font-size: 34rpx;
		font-weight: 400;
	}
	/* 放置站点的view */
	.stationView {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin: 12rpx 20rpx;
		margin-bottom: 20rpx;
	}
	/* 站点名：未选中 */
	.deSelect {
		border: #e5e5e5 solid 2rpx;
		border-radius: 8rpx;
		justify-content: center;
		padding-bottom: 8rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin: 12rpx 20rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
	}
	/* 未选中文字样式 */
	.deSelectColor {
		color: #333333;
		font-size: 26rpx;
		font-weight: 300;
		font-family:Source Han Sans SC;
	}
	/* 选中样式 */
	.select {
		border: #FC4646 solid 2rpx;
		border-radius: 8rpx;
		justify-content: center;
		padding-bottom: 8rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin: 12rpx 20rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
	}
	/* 选中文字样式 */
	.selectColor {
		color: #FC4646;
		font-size: 26rpx;
		font-weight: 300;
		font-family:Source Han Sans SC;
	}
	// 完成
	.doneView {
		text-align: center;
		align-items: center;
		border-radius: 12rpx;
		background-color: #FA5E6E;
		color: #FFFFFF;
		height: 100rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		font-size: 36rpx;
	}
</style>
