<template>
	<view class="content">
		<view>当前绑定的手机号为：{{phone}}</view>
	</view>
</template>

<script>
	export default {
		data(){	
			return{			
				userInfo:[],
				phone:'',
			}	
		},
		onLoad (){
			this.loadUserInfo();
		},
		methods:{
			//--------------------加载用户信息-------------------that.userInfo.phoneNumber.substring(0,3)+'****'+
			loadUserInfo:function(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success(res) {
						that.userInfo=res.data;
						that.phone=that.userInfo.phoneNumber.substring(0,3)+'****'+that.userInfo.phoneNumber.substring(7,11);
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
