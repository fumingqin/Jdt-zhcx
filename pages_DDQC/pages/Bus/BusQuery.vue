<template>
	<view class="myView">
		<!-- 顶部背景图 -->
		<view class="topImage">
			<image style="width: 100%;" lazy-load="true" src="../../static/busBac.png"></image>
		</view>
		<!-- 起终点 -->
		<view class="station">
			<u-cell-group title="起点" :border="false">
				<u-cell-item  title="我的位置"  :arrow="false" :title-style="{'fontSize': '34rpx','color':'#2D2E2E'}">
					<u-icon slot="right-icon" size="40" name="map"></u-icon>
				</u-cell-item>
			</u-cell-group>
			
			<u-cell-group title="终点" :border="false">
				<u-cell-item title="南平高铁动车站" :arrow="false" right-icon="map" :title-style="{'fontSize': '34rpx','color':'#2D2E2E'}">
					<u-icon slot="right-icon" size="40" name="reload"></u-icon>
				</u-cell-item>
			</u-cell-group>
			
			<view class="queryButton">查询</view>
		</view>
		
	</view>
</template>

<script>
	//导航栏的背景色是在pages设置
	export default {
		data() {
			return {
				
			}
		},
		//--------------------------------------监听索框点击事件--------------------------------------
		onNavigationBarSearchInputClicked:function(){
			//注意：这里的搜索框是在pages页面设置的，只有当disabled为true的时候搜索框的点击事件才可以触发
			//点击搜索框跳转到公交查询页面
			uni.navigateTo({
				url:"./TransitSearch"
			})
		},
		onLoad() {
			
		},
		methods: {
			
		},
		
	}
	
</script>

<style>
	page,
	.myView {
		position: fixed;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}
	/* 顶部背景图 */
	.topImage{
		margin-top: -1rpx;
	}
	/* 起终点 */
	.station {
		position: relative;
		background-color: #FFFFFF;
		margin-top: -100rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-radius: 12rpx;
		padding-bottom: 40rpx;
	}
	/* 查询按钮 */
	.queryButton{
		margin-top: 30rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #4282FF;
		color: #FFFFFF;
		border-radius: 12rpx;
		height: 90rpx;
		font-size: 38rpx;
	}
</style>
