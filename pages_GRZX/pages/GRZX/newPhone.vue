<template>
	<view class="content">
		<view class="itemClass bt">
			<view class="phoneClass1">新的手机号码</view>
			<input type="number" placeholder="输入新的手机号" maxlength="11" class="phoneClass2" v-model="phone" />
		</view>
		<view class="itemClass">
			<view class="codeClass1">验证码</view>
			<input type="number" placeholder="输入验证码" maxlength="4" class="codeClass2" v-model="code" />
		</view>
		<view class="itemClass">
			<view class="codeClass3">{{textCode}}</view>
		</view>
		<view class="btnClass">确定</view>
	</view>
</template>

<script>
	export default {
		data(){	
			return{			
				userInfo:[],
				phone:'',
				code:'',
				textCode:"点击获取验证码",
				type:1,
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
		background-color: #F2F2F2; //页面背景色
	}
	.content { 
		width: 100%;
		display: flex;
		flex-direction: column;//column：纵向排列 row：横向排列
	}
	.bt{
		border-top: 1upx solid #DBDBDB;
		margin-top: 50upx;
	}
	.itemClass{
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #DBDBDB;
		position: relative;
	}
	
	.phoneClass1{ //绑定的手机号
		font-size: 32upx;
		color: #333333;
		position: absolute;
		left: 5%;
		line-height: 100upx;
	}
	.phoneClass2{ //绑定的手机号
		font-size: 32upx;
		color: #333333;
		position: absolute;
		right: 5%;
		line-height: 100upx;
	}
	.codeClass1{
		font-size: 32upx;
		color: #333333;
		position: absolute;
		left: 5%;
		line-height: 100upx;
	}
	.codeClass2{
		font-size: 32upx;
		color: #333333;
		position: absolute;
		right: 5%;
		top:25upx;
		text-align: right;
	}
	.codeClass3{
		font-size: 32upx;
		color: #333333;
		width: 100%;
		text-align: center;
		line-height: 100upx;
	}
	
	.btnClass{ //按钮样式
		margin-top: 110upx;
		width: 90%;
		text-align: center;
		margin-left: 5%;
		color: #FFFFFF;
		padding: 20upx 0;
		font-size: 32upx;
		background-color: #ff0000;
		border-radius: 100upx;
	}
	.cancellationClass{
		width: 100%;
		font-size: 30upx;
		text-align: center;
		margin-top: 22upx;
		color: #55aaff;
	}
</style>
