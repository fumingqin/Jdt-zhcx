<template>
    <view class="content">
        <image :src="avatarUrl" class="headPortrait"></image>
		<button type="primary" @click="wxLogin">授权登录</button>
    </view>
</template>

<script>
	import {
		mapState,
	    mapMutations  
	} from 'vuex';
	export default {
	    data() {
	        return {
	            title: 'Hello',
				avatarUrl:''
	        }
	    },
	    onLoad() {	
			this.loadAvatar();
	    },
	    methods: {
			...mapMutations(['login']),
			async loadAvatar(){
				var theSelf=this;
				uni.getUserInfo({
					success:function(res){
						console.log(res.userInfo.avatarUrl,"res")
						 theSelf.avatarUrl=res.userInfo.avatarUrl;
					}
				})
			},
			wxLogin(){
				uni.getUserInfo({
					success:function(res){
						uni.setStorage({
							key:"userInfo",
							data:res.userInfo
						});
						uni.showToast({
						    title: '授权成功',
						    icon:"none"
						});
						if(res!=null||res!=""){
							
							
						}
						uni.navigateBack({
							delta: 2
						});
						/* uni.navigateTo({
							url:'/pages/GRZX/user'
						}) */
					}
				})
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



    
