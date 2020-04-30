<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			// #ifndef APP-PLUS
			// uni.switchTab({
			// 	url:'Index'
			// });
			uni.reLaunch({
				url:'../LYFW/scenicSpotTickets/ticketsList'
			})
			// #endif
			// #ifdef APP-PLUS
			const value = uni.getStorageSync('launchFlag');
			if(value){
				uni.switchTab({
					url:'Index'
				});
			}else{
				uni.setStorage({
					key:'launchFlag',
					data:true,
					success:function(){
						uni.redirectTo({
							url:'guidePage'
						})
					}
				})
				
			}
			// #endif
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
