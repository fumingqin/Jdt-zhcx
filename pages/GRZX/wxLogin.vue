<template>
    <view class="content">
		<!-- <image src="../../static/GRZX/btnReturn.png" class="returnClass" @click="returnClick"></image> -->
		<view class="inputItem phoneNum">
			<image src="../../static/GRZX/shouji.png" class="iconClass1"></image>
			<input type="number" placeholder="手机号码" maxlength="11" class="inputClass" data-key="phoneNumber" @input="inputChange1" />
		</view>
		<view class="inputItem Captcha">
			<image src="../../static/GRZX/yanzhengma.png" class="iconClass2"></image>
			<input type="number" placeholder="输入验证码" maxlength="6" class="inputClass" data-key="captchaCode" @input="inputChange2" />
		</view>
		<view class="getCode style" @click="getCodeClick" id="Code">{{textCode}}</view>
		<button type="warn" @click="bindPhone" class="btnClass">确定</button>
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
				captchaCode:'',
	        }
	    },
	    onLoad() {	
			
	    },
	    methods: {
			...mapMutations(['login']),
			returnClick(){		//返回个人中心
				uni.switchTab({
					url:'/pages/GRZX/user'
				})
			},
			judgeNum(val){  //只能输入数字
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
			bindPhone(){	 //绑定手机
				var that=this;
				var list=uni.getStorageSync('captchaCode')	//验证码和手机号
				console.log(list,"list")
				var openid=uni.getStorageSync('scenicSpotOpenId')	//openid
				console.log(openid,"openid")
				var userInfo=uni.getStorageSync('wxuserInfo') //微信授权获取到的微信的个人信息
				console.log(userInfo,"userInfo")
				var phone=this.phoneNumber;
				var code=this.captchaCode;
				if(phone==null||phone==""){
					uni.showToast({
						title:"请输入手机号码",
						icon:"none"
					})
				}else if(code==null||code==""){
					uni.showToast({
						title:"请输入验证码",
						icon:"none"
					})
				}else if(list==null||list==""){
					uni.showToast({
						title:"验证码已过期，请重新获取",
						icon:"none"
					})
				}else if(phone==list.phone&&code==list.code){
					//调用绑定手机号接口
					uni.request({
						url:that.$GrzxInter.Interface.login.value,
						data:{
							phoneNumber:phone,
						},
						method:that.$GrzxInter.Interface.login.method,
						success(res1) {
							uni.request({
								//url:'http://zntc.145u.net/api/person/BindPersonInfoOpenID_wxAndPhoneNumber',
								//url:that.$GrzxInter.Interface.BindPersonInfoOpenID_wxAndPhoneNumber.value,
								url:that.$GrzxInter.Interface.changeInfo.value,
								data:{
									userId:res1.data.data.userId,
									phoneNumber:phone,
									nickname:userInfo.nickname,
									address:userInfo.province+userInfo.city,
									openId_wx:userInfo.openid,
									portrait:userInfo.portrait,
									//wxOpenid:openid,
								},
								method:that.$GrzxInter.Interface.changeInfo.method,
								success(res) {
									console.log(res,"res")
									uni.showToast({
										title:'绑定成功！',
										icon:'success',
									})
									uni.setStorageSync('userInfo',res.data.data)
									that.logining=true;
									that.login(res.data.data)
									setTimeout(function(){
										uni.switchTab({
											url:'/pages/Home/Index'
										})
									},500);
								}
							})	
						}
					})
					
				}else{
					uni.showToast({
						title:"验证码输入错误，请重新输入",
						icon:"none"
					})
				}
			},
			getCodeClick(e){	//获取验证码
				var self=this;
				const {phoneNumber, captchaCode} = this;		
				if(self.judgeNum(self.phoneNumber)){
					var timer=null,second=59; //倒计时的时间
					if(self.textCode == "获取验证码"){
					  self.textCode = second+"秒后重发";
					  if(self.textCode == "59秒后重发"){
						  timer=setInterval(function(){
						  second--;
						  if(second<=0){	
						  	self.textCode = "获取验证码";
						  	clearInterval(timer);
						  	second=59;	
						  }
						  else{			
						  	self.textCode = second+"秒后重发";
						  }},1000)
						 uni.request({
							url:self.$GrzxInter.Interface.getLoginCode.value,
							data:{
								phoneNumber:self.phoneNumber,
							},
							method:self.$GrzxInter.Interface.getLoginCode.method,
							
							success:(res)=>{
						 		console.log(res.data.data,'158');
								var listCode={
										phone:self.phoneNumber,
										code:res.data.data,
									};
								uni.setStorageSync('captchaCode',listCode)
								uni.showToast({
									title:"验证码已发送，仅在5分钟内有效!",
									icon:"none"
								})
								//定时删除手机验证码（用于登录使用）
								setTimeout(function(){
									uni.removeStorage({
										key:'captchaCode',
									})
									console.log('删除成功！')
								},300000);
						    }
						 }) 
					  }
							
					}
				}else{
					uni.showToast({
						title : '请输入正确的手机号码',
						icon : 'none',
					})
				}
			},
		}
	}
	
</script>

<style lang="scss">
	.iconClass1{   //手机图标
		width: 26upx;
		height: 36upx;
		top: 57upx;
		left:2%;
		position: absolute;
	}
	.iconClass2{	//验证码图标
		width: 31upx;
		height: 38upx;
		top: 54upx;
		left: 2%;
		position: absolute;
	}
	.inputItem{		//输入区域的样式
		width: 87.6%;
		height: 140upx;
		border-bottom: 1upx solid #EAEAEA;
	}
	.phoneNum{
		position: absolute;
		top:125upx;
		left: 6.19%;
	}
	.Captcha{
		position: absolute;
		top:275upx;
		left: 6.19%;
	}
	.inputClass{	//输入框的位置
		position: absolute;
		left: 12%;
		top:51upx;
		font-size: 32upx;
		height: 30upx;
		line-height: 30upx;
		color: #999999;
	}
	.getCode{  //获取验证码
		position: absolute;
		top:320upx;
		left: 64%;
		width:30%;
		font-size: 28upx;
		border-radius: 12upx;
		text-align: center;
		line-height: 64upx;
		height: 64upx;
	}
	.style{
		border:1px solid #ED1C24;
		color: #ED1C24;
	}
	.btnClass{
		position: absolute;
		top:495upx;
		left: 5%;
		width: 90%;
		height: 100upx;
		line-height: 100upx;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 80upx;
		left: 5.13%;
		position: absolute;
	}
</style>



    
