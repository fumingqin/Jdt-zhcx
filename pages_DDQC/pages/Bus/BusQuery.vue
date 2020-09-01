<template>
	<view>
		<view class="topImage">
			<image src="../../static/busBac.png"></image>
		</view>
		
	</view>
</template>

<script>
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
			
		}
	}
</script>

<style>

</style>
