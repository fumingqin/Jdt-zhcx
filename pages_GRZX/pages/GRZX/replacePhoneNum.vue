<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		data(){	
			return{			
				userInfo:[],
			}	
		},
		onLoad (){
			this.loadUserInfo();
		},
		methods:{
			//--------------------加载用户信息-------------------
			loadUserInfo:function(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success(res) {
						that.userInfo=res.data;	
					},
					fail() {
						uni.showToast({
							title:'请先登录',
							icon:'none'
						})
					}
				})
			},
			
		}	
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8; //页面背景色
	}
	.content { 
		width: 100%;
		display: flex;
		flex-direction: column;//column：纵向排列 row：横向排列
	}
	
</style>
