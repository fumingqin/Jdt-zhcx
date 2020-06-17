<template>
	<view class="content" v-bind:style="{height:imgHeight+'px'}">
		<!-- 背景图 -->
		<image :src="background" class="backClass"></image>
		<image src="../../static/GRZX/loginReturn.png" class="returnClass" @click="returnClick"></image>
		<view class="inputContent">
			<view class="inputItem phoneNum">
				<image src="../../static/GRZX/shouji.png" class="iconClass1"></image>
				<input type="number" placeholder="手机号码" maxlength="11" class="inputClass" data-key="phoneNumber" @input="inputChange1" />
			</view>
			<view class="inputItem Captcha">
				<image src="../../static/GRZX/yanzhengma.png" class="iconClass2"></image>
				<input type="number" placeholder="输入验证码" maxlength="4" class="inputClass" data-key="captchaCode" @input="inputChange2" />
			</view>
			
			<!-- 按钮颜色和发送验证码的样式 -->
			<view class="getCode style1" @click="getCodeClick" id="Code">{{textCode}}</view>
			<text class="fontStyle" @click="loginClick">确定</text>
			<!-- <text class="fontStyle" @click="checkRealName('1000067')">确定</text> -->
		</view>
		
		<!-- logo -->
		<image :src="logo" class="logoClass"></image>

		<!-- <view class="loginMode">第三方登录</view>
		<view class="leftLine"></view>
		<view class="rightLine"></view> -->
		<!-- <image src="../../static/GRZX/qqLogo.png" class="qqClass" @click="qqLogin"></image> -->
		<!-- <image src="../../static/GRZX/wxLogo.png" class="wxClass" @click="wxLogin"></image> -->
		<!-- <image src="../../static/GRZX/wxLogo.png" class="wxClass1" @click="wxLogin"></image> -->
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	export default {
		data() {
			return {
				textCode:"获取验证码",
				phoneNumber:'',
				captchaCode:'',
				imgHeight:'',
				loginType:'',
				urlData:'',
				background:'',
				logo:'',
			}
		},
		onLoad(options) {
			this.loadImg();
			this.urlData=options.urlData;
			this.load(options.loginType);
		},
		methods: {
			//---------------加载图片----------------
			loadImg(){
				var that=this;
				console.log(that.$GrzxInter.GetImage.url,"144")
				uni.request({
					url:that.$GrzxInter.GetImage.url,
					data:{
						model:5,
					},
					method:'POST',
					success(res) {
						var image1=res.data.data.filter(item => {
							return item.type=='南平背景图';
						})
						that.background=image1[0].imageUrl;
						var image2=res.data.data.filter(item => {
							return item.type=='nanpinglogo';
						})
						that.logo=image2[0].imageUrl;
						// console.log(that.logo,'that.logo')
					}
				})
			},
			async load(e){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight;
				       }
				});
				that.loginType=e;
				// console.log(e)
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
			loginClick(){	 //登录按钮
				uni.showLoading({
					title:'登录中...'
				})
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
								if(captcha==res.data.code&&phone==res.data.phone){
									uni.request({
										// url:'http://111.231.109.113:8002/api/person/login',
										url:that.$GrzxInter.Interface.login.value,
										data:{
											phoneNumber:phone,
										},
										method:that.$GrzxInter.Interface.login.method,
										success(res) {
											console.log(res)
											uni.removeStorageSync('captchaCode');
											uni.setStorageSync('userInfo',res.data.data);
											uni.hideLoading();
											
											that.registerBike(res.data.data.userId,res.data.data.phoneNumber)  //注册自行车用户
											// if(that.urlData==1){
											// 	uni.switchTab({  //返回首页
											// 		url:'/pages/Home/Index',
											// 	}) 
											// }else if(that.urlData==2){
											// 	uni.switchTab({  //返回订单页
											// 		url:'/pages/order/OrderList',
											// 	}) 
											// }else{
											// 	console.log("返回上一页")
											// 	uni.navigateBack();//返回上一页
											// }
										}
									})
									
								}else{
									uni.showToast({
										title:"验证码错误",
										icon:"none"
									})
								}
							},
							fail(){
								uni.showToast({
									title:"验证码已过期，请重新获取",
									icon:"none"
								})	
							}
						})
					}
				}
			},
			//-------------------------------------用户注册自行车----------------------------------
			registerBike(id,phone){
				var that=this;
				uni.request({
					url:that.$GrzxInter.Interface.RegistUser.value,
					method:that.$GrzxInter.Interface.RegistUser.method,
					data:{
						userID:id,
						phone:phone,
					},
					success(res) {
						// console.log(res)
						that.checkRealName(res.data.data.UserID);
					},
					fail() {
						
					}
				})
			},
			//-------------------------------------检查是否实名----------------------------------
			checkRealName(id){
				// uni.showLoading({
				// 	title:'登录中...'
				// })
				console.log(id,'checkRealName')
				var that=this;
				uni.request({
					url:that.$GrzxInter.Interface.GetUserByUserID.value,
					data:{
						userID:id,
					},
					method:that.$GrzxInter.Interface.GetUserByUserID.method,
					success(res) {
						console.log(res)
						uni.hideLoading();
						if(res.data.data==""||res.data.data.UserName==""||res.data.data.UserIDNumber==""){
							//实名认证
							uni.redirectTo({
								url:that.$GrzxInter.Route.realName.url,
							})
						}else if(res.data.data.RealNameStatus!==1){
							//上传图片
							uni.redirectTo({
								url:that.$GrzxInter.Route.uploadPhoto.url,
							})
						}else{
							uni.setStorageSync('RealNameInfo',res.data.data)
							uni.showToast({
								title:"登录成功!",
								icon:"none"
							})
							if(that.urlData==1){
								uni.switchTab({  //返回首页
									url:'/pages/Home/Index',
								}) 
							}else if(that.urlData==2){
								uni.switchTab({  //返回订单页
									url:'/pages/order/OrderList',
								}) 
							}else{
								console.log("返回上一页")
								uni.navigateBack();//返回上一页
							}
						}
					}
				})
			},
			wxLogin(){		//微信授权登录
				var theSelf=this;
				uni.login({
					provider:'weixin',
					success:function(loginRes){
						uni.getUserInfo({	
							provider: 'weixin',
							success:function(res){			
								res.userInfo.phoneNumber="";
								uni.setStorage({
									key:"userInfo",
									data:res.userInfo
								});
								uni.showToast({
									title: '授权成功',
									icon:"none"
								});
								//绑定手机号
								uni.getStorage({
									key:'userInfo',
									success:function(res1){
										if(res1.data.phoneNumber==""||res1.data.phoneNumber==null){
											uni.showToast({
												title : '请绑定手机号',
												icon : 'none',
											})
											setTimeout(function(){
												uni.navigateTo({	
													url  : '/pages/GRZX/wxLogin'
												}) 
											},500);
										}
									}
								})
							},
							fail:function(){
								
							}
						})
					}
				})
				
			},
			qqLogin(){		//QQ授权登录
				var theSelf=this;
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
				        if (~res.provider.indexOf('qq')) {
				            uni.login({
				                provider: 'qq',
				                success: function (loginRes) {
				                    uni.getUserInfo({
				                    	provider: 'qq',
										success(logRes) {
											console.log(logRes,"logRes")
											var sex;
											if(logRes.userInfo.gender=="男"){
												sex=1;
											}
											if(logRes.userInfo.gender=="女"){
												sex=2;
											}
											var list={
												nickName:logRes.userInfo.nickname,
												openId:logRes.userInfo.openid,
												avatarUrl:logRes.userInfo.figureurl_qq_2,
												gender:sex,
											}
											console.log(list,"list")
											uni.setStorage({
												key:'userInfo',
												data:list
											})
											
											if(list!=null||list!=""){
												theSelf.login(list);						
											}
											uni.showToast({
												title: '授权成功',
												icon:"none"
											});
											uni.switchTab({
												//url:'/pages/GRZX/user',
												url:theSelf.$GrzxInter.Route.user.url,
											})
											
										}
				                    })
				                }
				            });
				        }
				    }
				})
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
						  console.log(self.phoneNumber)
						 uni.request({
							// url:'http://218.67.107.93:9210/api/app/getLoginCode?phoneNumber='+self.phoneNumber,
							//url:'http://111.231.109.113:8002/api/person/getLoginCode',
							url:self.$GrzxInter.Interface.getLoginCode.value,
						    data:{
								phoneNumber:self.phoneNumber,
							},
							method:self.$GrzxInter.Interface.getLoginCode.method,
							success:(res)=>{
								console.log(res,"340");
						 		console.log(res.data.data);
								uni.setStorage({
									key:'captchaCode',
									data:{
										code:res.data.data,
										phone:self.phoneNumber,
									}
								})
								uni.showToast({
									title:"验证码已发送，仅在5分钟内有效!",
									icon:"none"
								})
								setTimeout(function(){
									uni.removeStorage({
										key:'captchaCode',
									})
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
			returnClick(){		//返回个人中心
				// uni.switchTab({
				// 	url:'/pages/GRZX/user'
				// })
				if(this.urlData==2){
					uni.switchTab({  //返回首页
						url:'/pages/Home/Index',
					}) 
				}else{
					uni.navigateBack();
				}
			},
			//------------判断是否为base64格式-----------
			isBase64:function(str) {
			    if (str ==='' || str.trim() ===''){ return false; }
			    try {
			        return btoa(atob(str)) == str;
			    } catch (err) {
			        return false;
			    }
			},
			//------------获得7日后的日期-----------
			getSpecialTime() {
				var date=new Date();
				var currentDate=JSON.stringify(date).substring(1,11);
				var arry  = currentDate.split("-");
				var year = parseInt(arry[0],10);
				var month = parseInt(arry[1],10);
				var day = parseInt(arry[2],10); 
				//月份的方法：getMonth()从 Date 对象返回月份 (0 ~ 11)。
				var structDate = new Date(year , month - 1, day);
				var num  = parseInt(7,10);
				//setDate增减天数
				structDate.setDate(structDate.getDate()+num); 
				 //如果月份长度少于2，则前加 0 补位   
				 if((structDate.getMonth() + 1).toString().length == 1) {  
					month = 0 + "" + (structDate.getMonth() + 1).toString();  
				 } else {    
					 month = (structDate.getMonth() + 1).toString();  
				 }   
				 //如果天数长度少于2，则前加 0 补位   
				 if (structDate.getDate().toString().length == 1) {   
					day = 0 + "" + structDate.getDate().toString();   
				 } else {    
					 day = structDate.getDate().toString();   
				 }    
				 var newDate = structDate.getFullYear() + "-" + month + "-" + day;   
			}
		}
	}
</script>

<style lang="scss">
	//该界面的全局样式
	page{
		margin: 0;
		padding: 0;
	}
	.content {
		width: 100%;
		position: relative;
	}
	.backClass{  //背景图
		position: absolute;
		bottom:0px; 
		width: 100%;
		height: 100%;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 80upx;
		left: 4.13%;
		position: absolute;
	}
	.logoClass{		//logo的样式
		width: 32.4%;
		height: 233upx;
		top: 200upx;
		left: 33.87%;
		position: absolute;
	}
	.iconClass1{   //手机图标
		width: 26upx;
		height: 36upx;
		top: 58upx;
		left:2%;
		position: absolute;
	}
	.iconClass2{	//验证码图标
		width: 31upx;
		height: 38upx;
		top: 56upx;
		left: 2%;
		position: absolute;
	}
	.inputContent{  //登录区域的样式
		width: 90.4%;
		//height: 874upx;
		height: 700upx;
		position: absolute;
		top:324upx;
		left: 4.8%;
		background-color: white;
		border-radius: 20upx;
	}
	.inputItem{		//输入区域的样式
		width: 87.6%;
		height: 140upx;
		border-bottom: 1upx solid #EAEAEA;
	}
	.phoneNum{
		position: absolute;
		top:130upx;
		left: 6.19%;
	}
	.Captcha{
		position: absolute;
		top:272upx;
		left: 6.19%;
	}
	.inputClass{	//输入框的位置
		position: absolute;
		left: 12%;
		top:51upx;
		font-size: 32upx;
		height: 50upx;
		line-height: 50upx;
		color: #999999;
	}
	.btnLogin{ //按钮
		position: absolute;
		top:421upx;
		width: 100%;
		height: 180upx;
	}
	.wxClass{  //微信
		position: absolute;
		left: 33%;
		top:1015upx;
		width: 67upx;
		height: 54upx;	
	}
	.wxClass1{  //微信1
		position: absolute;
		left: 44%;
		top:1015upx;
		width: 67upx;
		height: 54upx;	
	}
	.qqClass{  //QQ
		position: absolute;
		left: 60%;
		top:1015upx;
		width: 47upx;
		height: 50upx;
	}
	.loginMode{ //第三方登录
		position: absolute;
		top:900upx;
		width: 100%;
		text-align: center;
		font-size: 30upx;
		color: #999999;
	}
	.leftLine{
		border-top: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top:920upx;
		left: 12.73%;
	}
	.rightLine{
		border-top: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top: 920upx;
		left: 64.78%;
	}
	.getCode{  //获取验证码
		position: absolute;
		top:308upx;
		left: 64%;
		width:30%;
		font-size: 28upx;
		border-radius: 12upx;
		text-align: center;
		line-height: 64upx;
		height: 64upx;
	}
	.style1{	//获取验证码
		border:1px solid #FF971E;
		color: #FF971E;
	}	
	.style2{
		border:1px solid #1D2087;
		color: #1D2087;
	}	
	.style3{
		border:1px solid #FF971E;
		color: #FF971E;
	}	
	.fontStyle{		//确定字体样式
		position: absolute;
		top: 480upx;
		left: 5%;
		text-align: center;
		font-size: 36upx;
		color: #FFFFFF;
		width: 90%;
		padding: 25upx 0;
		border-radius: 20upx;
		background:linear-gradient(54deg,rgba(255,128,8,1) 0%,rgba(255,200,55,1) 100%);
	}
</style>
