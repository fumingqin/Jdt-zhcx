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
			uni.switchTab({
				url:'Index'
			});
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
			// #ifdef MP-WEIXIN
			uni.getStorage({
				key:'userInfo',
				success(res){
					if(res.data.openId_xcx==""||res.data.openId_xcx==null){
						uni.navigateTo({
							url:'/pages/Home/wxAuthorize'
						})
					}
				},
				fail(){
					uni.navigateTo({
						url:'/pages/Home/wxAuthorize'
					})
				}
			})
			// #endif
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
