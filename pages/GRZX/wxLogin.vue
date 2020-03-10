<template>
    <view class="content">
        <image src="" class="headPortrait"></image>
		<button type="primary" @click="wxLogin">授权登录</button>
    </view>
</template>

<script>
	
	export default {
	    data() {
	        return {
	            title: 'Hello'
	        }
	    },
	    onLoad() {
			uni.getUserInfo({
				success:function(res){
					console.log(res,"res")
					/* this.url=""; */
				}
			})
	    },
	    methods: {
			/* async */
			wxLogin(){
				
			}
	    }
	}
	
</script>

<style lang="scss">
	
	.headPortrait{
		margin: 20upx 0upx 0upx 300upx;
		width: 100upx;
		height: 100upx;
		border: 1upx solid #2F9BFE;
	}
</style>



    
