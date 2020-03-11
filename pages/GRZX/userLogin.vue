<template>
	<view class="content">
		<view class="headTitle">欢迎回来！</view>
		<view class="inputContent">
			<view class="inputItem phoneNum">
				<text class="titleCss">手机号码</text>
				 <input
					type="number" 
					placeholder="请输入手机号码"
					maxlength="11"
					class="inputClass"
					data-key="phoneNumber"
					@input="inputChange"
				/> 
			</view>
			<view class="inputItem Captcha">
				<text class="titleCss">验证码</text>
				<input
					type="number" 
					placeholder="请输入验证码"
					class="inputClass"
					@input="inputChange"
					data-key="captchaCode"
				/>
				<view class="getCode" @click="getCodeClick" id="Code">{{textCode}}</view>
			</view>
			<button type="warn" class="btnLogin" @click="loginClick" >登 录</button>
		</view>
		<!-- <view class="wxClass" @click="wxClick"></view>
		<view class="qqClass" @click="qqClick"></view> -->
		<view class="loginMode">第三方登录</view>
		<image src="../../static/GRZX/qq.png" class="qqClass" @click="qqClick"></image>
		<image src="../../static/GRZX/wx.png" class="wxClass" @click="wxClick"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textCode:"获取验证码",
				phoneNumber:'',
				captchaCode:''
			}
		},
		onLoad() {

		},
		methods: {
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			loginClick(){
				
				const {phoneNumber, captchaCode} = this;
				console.log(this.phoneNumber)
				console.log(this.captchaCode);
			},
			wxClick(){
				uni.navigateTo({
					url:'/pages/GRZX/wxLogin'
				})
			},
			qqClick(){
				uni.navigateTo({
					url:'/pages/GRZX/wxLogin'
				})
			},
			getCodeClick(e){
				var self=this;
				var timer=null,second=60; //倒计时的时间
				if(self.textCode == "获取验证码"){
					timer=setInterval(function(){
					second--;
					if(second<=0){
						self.textCode = "获取验证码";
						clearInterval(timer);
						second=60;
						//e.disabled = false;
					}
					else{			//加短信接口
						self.disabled = true;
						self.textCode = second+"秒后重发";
					}},1000)	
				}
			}
		}
	}
</script>

<style lang="scss">
	//该界面的全局样式
	.content {
		width: 100%;
		height: 1200upx;
		position: relative;
	}
	.headTitle{
		font-size: 50upx;
		font-weight: bold;
		position: absolute;
		left: 5%;
		top:100upx;
	}
	.inputContent{
		width: 100%;
		height: 500upx;
		position: absolute;
		top:200upx;
		background-color: white;
	}
	.inputItem{
		border-radius: 10upx;
		width: 90%;
		height: 120upx;
		background-color: #F8F6FC;
		
	}
	.phoneNum{
		position: absolute;
		top:60upx;
		left: 5%;
	}
	.Captcha{
		position: absolute;
		top:230upx;
		left: 5%;
	}
	.titleCss{
		height: 50upx;
		line-height: 56upx;
		font-size: 30upx;
		color: black;
		position: absolute;
		left: 4%;
	}
	.inputClass{
		position: absolute;
		left: 4%;
		top:60upx;
	}
	.btnLogin{
		position: absolute;
		top:400upx;
		left: 5%;
		width: 90%;
		height: 80upx;
		border-radius: 80upx;
		line-height: 80upx;
	}
	.wxClass{
		position: absolute;
		left: 28%;
		top:880upx;
		/* border:1px solid red ; */
		width: 15%;
		height: 100upx;
		text-align: center;
		
	}
	.qqClass{
		position: absolute;
		left: 58%;
		top:880upx;
		/* border:1px solid red ; */
		width: 15%;
		height: 100upx;
		text-align: center;
		
	}
	.loginMode{
		position: absolute;
		top:760upx;
		left: 40%;
	}
	.getCode{
		position: absolute;
		top:58upx;
		left: 70%;
		width:40%;
		font-size: 35upx;
		/* border:1px solid red ; */
	}
</style>
