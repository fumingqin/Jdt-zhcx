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
			const value = uni.getStorageSync('launchFlag');
			if(value){
				uni.switchTab({
					url:'Index'
				});
			}else{
				uni.setStorage({
					key:'launchFlag',
					data:true
				})
				uni.redirectTo({
					url:'guidePage'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
