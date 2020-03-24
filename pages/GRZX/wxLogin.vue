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
								var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
									uni.getStorage({
										key:'userInfo',
										success:function(res1){
											res1.data.phoneNumber=phone;
											console.log(res1.data,"...res1")
											uni.setStorage({
												key:'userInfo',
												data:res1.data
											})
											uni.setStorage({
												key:'Grxx',
												data:res1.data
											})
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
			getCodeClick(e){	//获取验证码
				var self=this;
				const {phoneNumber, captchaCode} = this;		
				if(self.judgeNum(self.phoneNumber)){
					var timer=null,second=59; //倒计时的时间
					if(self.textCode == "获取验证码"){
					  //获取6位随机数
					  var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
					  //短信接口
					  uni.setStorage({
							key:'captchaCode',
							data:randomNum
					  })
					  self.textCode = second+"秒后重发";
					  if(self.textCode == "59秒后重发"){
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
										second=59;	
									}
									else{			
										//self.disabled = true;
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



    
