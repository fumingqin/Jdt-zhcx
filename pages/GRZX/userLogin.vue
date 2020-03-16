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
					@input="inputChange1"
				/> 
			</view>
			<view class="inputItem Captcha">
				<text class="titleCss">验证码</text>
				<input
					type="number" 
					placeholder="请输入验证码"
					class="inputClass"
					maxlength="6"
					@input="inputChange2"
					data-key="captchaCode"
				/>
				<view class="getCode" @click="getCodeClick" id="Code">{{textCode}}</view>
			</view>
			<button type="warn" class="btnLogin" @click="loginClick" >登 录</button>
		</view>
		<!-- <view class="wxClass" @click="wxClick"></view>
		<view class="qqClass" @click="qqClick"></view> -->
		<view class="loginMode">第三方登录</view>
		<image src="../../static/GRZX/qq.png" class="qqClass" @click="qqLogin"></image>
		<image src="../../static/GRZX/wx.png" class="wxClass" @click="wxLogin"></image>
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
				textCode:"获取验证码",
				phoneNumber:'',
				captchaCode:''
			}
		},
		onLoad() {
			
		},
		methods: {
			...mapMutations(['login']),
			judgeNum(val){
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				    if(regPos.test(val) || regNeg.test(val)) {
				        return true;
				    } else {
				        return false;
				    }
			},
			inputChange1(e){
				var num=e.detail.value;
				if(this.judgeNum(num)){
					
				}else{
					uni.showToast({
						title : '请输入正确的手机号码',
						icon : 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			inputChange2(e){
				var num=e.detail.value;
				if(this.judgeNum(num)){
					
				}else{
					uni.showToast({
						title : '请输入正确的验证码',
						icon : 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			loginClick(){	
				this.logining=true;
				var that=this;
				const {phoneNumber, captchaCode} = this;		
				var phone=this.phoneNumber;
				var captcha=this.captchaCode;
				if(phone==null||phone==""){
					uni.showToast({
						title:"请输入手机号码",
						icon:"none"
					})
				}else{
					if(captcha==null||captcha==""){
						uni.showToast({
							title:"请输入验证码",
							icon:"none"
						})
					}else{
						uni.getStorage({
							key:'captchaCode',
							success(res) {
								if(captcha==res.data){
									
									uni.setStorage({
										key:'userInfo',
										data:{
											phoneNumber:phone,
											nickName:phone
										}
									})
									uni.getStorage({
										key:'userInfo',
										success:function(user){
											that.login(user.data);
										}
									})
									 uni.switchTab({
										url:'/pages/Home/Index',
									}) 
								}else{
									uni.showToast({
										title:"验证码错误",
										icon:"none"
									})
								}
							}
						})
					}
				}
				
			},
			wxLogin(){
				this.logining=true;
				var theSelf=this;
				var getChina = require('../../components/GRZX/wfgo-getChina/getChina.js');
				var address;
				uni.login({
					provider:'weixin',
					success:function(loginRes){
						uni.getUserInfo({	
							provider: 'weixin',
							success:function(res){			
								address=getChina.pinyin(res.userInfo.province)+" "+getChina.pinyin(res.userInfo.city);
								res.userInfo.address=address;
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
								setTimeout(function(){
									uni.navigateBack({
										delta: 2
									})
								},1000);	
							},
							fail:function(){
								theSelf.logining=false;
							}
				})
					}
				})
				
			},
			qqLogin(){
				uni.navigateTo({
					url:'/pages/GRZX/wxLogin'
				})
			},
			getCodeClick(e){
				var self=this;
				const {phoneNumber, captchaCode} = this;		
				if(self.judgeNum(self.phoneNumber)){
					var timer=null,second=60; //倒计时的时间
					if(self.textCode == "获取验证码"){
					  //短信接口
					  var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
					  uni.setStorage({
							key:'captchaCode',
							data:randomNum
					  })
						uni.request({
						   url: 'http://111.231.109.113:8000/api/MyTest/SendMessage',
						   data:{
							  phoneNumber:self.phoneNumber,
							  text:'动态验证码：'+randomNum+',如果不是本人请忽略此短信。'
						   },
						   method:"GET",
						   success: function (res) {
								console.log(res);
								if(res.data){
									timer=setInterval(function(){
									second--;
									if(second<=0){	
										self.textCode = "获取验证码";
										clearInterval(timer);
										second=60;	
									}
									else{			
										self.disabled = true;
										self.textCode = second+"秒后重发";
									}},1000)
								}else{
									uni.showToast({
										title : '手机号码有误',
										icon : 'none',
									})
								}
						   }
						})	
					}
				}else{
					uni.showToast({
						title : '请输入正确的手机号码',
						icon : 'none',
					})
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
		height: 110upx;
		text-align: center;
		
	}
	.qqClass{
		position: absolute;
		left: 58%;
		top:880upx;
		/* border:1px solid red ; */
		width: 15%;
		height: 110upx;
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
