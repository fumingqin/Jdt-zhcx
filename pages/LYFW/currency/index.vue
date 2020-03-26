<template>
	<view>
		<button class="buttonClass" type="primary" @click="godetail('/pages/LYFW/scenicSpotTickets/ticketsList')">景区门票</button>
		<button class="buttonClass" type="primary" @click="godetail('/pages/LYFW/ouristRoute/SceneryTable')">旅游路线</button>
		<button class="buttonClass" type="primary" @click="godetail('/pages/LYFW/peripheralTourism/peripheralTourism')">周边旅游</button>
	</view>
</template>

<script>
	export default {
		data() { 
			return {
				
			}
		},
		onLoad() {
			this.a();
		},
		methods: {
			//路由统一事件
			godetail : function(url){
				uni.navigateTo({
					url
				})
			},
			a:function(){ 
				uni.request({
					url:'http://218.67.107.93:9266/travelImage/getRotationPicture',
					method:'POST',
					success:function(e){ 
						console.log(e)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.buttonClass{
	width: 240upx;
	margin: 20upx;
}
</style>
