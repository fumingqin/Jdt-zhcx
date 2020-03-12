<template>
    <view class="content">
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
	        }
	    },
	    onLoad() {	
			this.wxLogin();
	    },
	    methods: {
			...mapMutations(['login']),
			wxLogin(){
				this.logining=true;
				var theSelf=this;
				uni.login({
					provider:'weixin',
					success:function(loginRes){
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
									theSelf.login(res.userInfo);						
								}
								/* uni.navigateBack({
									delta: 2
								}); */
							},
							fail:function(){
								theSelf.logining=false;
							}
				})
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



    
