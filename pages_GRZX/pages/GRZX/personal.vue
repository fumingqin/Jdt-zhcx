<template>
	<view class="Cr_background">
		<form @submit="formSubmit" >
			<!-- #ifdef H5 -->
			<image class="bg" :src="backImg||'/static/GRZX/login1.png'" mode="aspectFill" name="backImg"></image>
			<image class="tx" :src="portrait||'/static/GRZX/missing-face.png'" name="portrait"></image>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<image class="bg" :src="backImg||'/static/GRZX/backImg.png'" mode="aspectFill" name="backImg"></image>
			<image class="tx" :src="portrait||'/static/GRZX/missing-face.png'" name="portrait" @click="getPhoto"></image>
			<button class="xgbg"  plain="" @click="reviseBackground">修改背景</button>
			<!-- #endif -->
			<view class="Cr_slk1">
				<text class="bz">姓&nbsp;名：</text>
				<input class="slk"  name="nickname"  placeholder="请输入" v-model="nickname" adjust-position="" />
			</view>
			<view class="Cr_slk2">
				<text class="bz">性&nbsp;别：</text>
				<!-- <picker @change="selectorChange" mode = "selector" :range="aim" name="aim" :value="user.aim"> -->
				<picker class="slk1" name="gender"  mode="selector" @change="genderChange" :range="genderSex" :value="gender">
					{{selector}}
				</picker>
			</view>
			<view class="Cr_slk2"> 
				<text class="bz">生&nbsp;日：</text>
				<picker class="slk1" name="birthday"  mode="date" @change="dateChange" v-model="birthday"  :start="startDate" :end="endDate" placeholder="请选择"  >
					{{birthday}}
				</picker>
			</view>
			<view class="Cr_slk2">
				<text class="bz">地&nbsp;址：</text>
				<input class="slk" name="address"  disabled="disabled" @tap="toggleTab"  placeholder="你的常住地" v-model="address" />
				<w-picker
					mode="region"
					:areaCode="['35', '3507', '350782']"
					:hideArea="false"
					@confirm="onConfirm" 
					ref="region"
					:timeout="true"
				></w-picker>
			</view>
			<view class="Cr_slk2">
				<text class="bz">签&nbsp;名：</text>
				<input class="slk" name="autograph" placeholder="你想要说的话"  v-model="autograph" />
			</view>
			<button class="an" type="warn" form-type="submit">保存</button>
		</form>
	</view>
	 
</template>
<script>
	import { pathToBase64, base64ToPath } from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	import wPicker from "@/components/GRZX/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				mode:"region",
				genderSex:['','男','女'], 
				selector:'请选择',
				/* 载入数据 */
				portrait : '',
				backImg:'',
				nickname : '',
				gender:'',
				birthday : '请选择',
				address : '',
				autograph : '',
				userId:'',
				openId_qq:'',
				openId_wx:'',
				phoneNumber:'',
				port:'',
			};
		},
		onLoad:function(){
			this.loadUserInfo();
			
		},
		computed:{
			
			startDate() {
			            return this.getDate('start');
			        }, 
			endDate() {
			            return this.getDate('end');
			        }
		},
		components:{
		     wPicker
		},
		methods:{
			loadUserInfo(){
				console.log(1)
				uni.showLoading({
					title:'加载中...'
				})
				var theself=this;
				uni.getStorage({
					key:'backUrl',
					success:function(res1){
						theself.backImg=res1.data;
					}
				})
				uni.getStorage({
					key:'userInfo',
					success(res){
						var phone=res.data.phoneNumber;
						if(phone!=""&&phone!=null&&res.data!=""){
							uni.request({
								//url:'http://111.231.109.113:8002/api/person/login',
								url:theself.$GrzxInter.Interface.login.value,
								data:{
									phoneNumber:res.data.phoneNumber,
								},
								method:theself.$GrzxInter.Interface.login.method,
								success(res1) {
									console.log(res1,"108")
									// uni.setStorageSync('userInfo',res1.data.data)
									// ------------1.头像-------------
									var base64=res1.data.data.portrait;
									theself.port=res1.data.data.portrait;
									if(theself.isBase64(base64)){
										base64ToPath(base64)
										  .then(path => {
										    theself.portrait=path;
										  })
										  .catch(error => {
										    console.error(error)
										  })
									}else{
										theself.portrait=base64;
									}
									console.log(theself.portrait,"128")
									// ------------2.昵称-------------
									if(res1.data.data.nickname==null||res1.data.data.nickname==""){
										theself.nickname="";
									}else{
										theself.nickname =res1.data.data.nickname;
									}
									// ------------3.性别-------------
									if(res1.data.data.gender==null||res1.data.data.gender==""){
										theself.selector="请选择";
									}else{
										theself.selector=theself.genderSex[res1.data.data.gender];
									}
									// ------------4.生日-------------
									if(res1.data.data.birthday==null||res1.data.data.birthday==""){
										theself.birthday="请选择";
									}else{
										theself.birthday =res1.data.data.birthday.substring(0,10);
									}
									// ------------5.地址-------------
									if(res1.data.data.address==null||res1.data.data.address==""){
										theself.address="";
									}else{
										theself.address =res1.data.data.address;
									}
									// ------------6.签名-------------
									if(res1.data.data.autograph==null||res1.data.data.autograph==""){
										theself.autograph="";
									}else{
										theself.autograph =res1.data.data.autograph;
									}
									// ------------7.用户Id-------------
									theself.userId=res1.data.data.userId;
									// ------------8.openId_qq-------------
									theself.openId_qq=res1.data.data.openId_qq;
									// ------------9.openId_wx-------------
									theself.openId_wx=res1.data.data.openId_wx;
									// ------------10.手机号-------------
									theself.phoneNumber=res1.data.data.phoneNumber;
									uni.hideLoading();
								}
							})
						}else{
							uni.showToast({
								title:'信息获取失败',
								icon:'none'
							})
						}
					}
				})	
			},
			// --------性别---------
			genderChange : function(e){
				//console.log(e.detail.value,"sex")
				if(e.detail.value==0){
					this.selector="请选择";
				}else{
					this.selector =this.genderSex[e.detail.value]; 
				}
				this.gender=e.detail.value;
			},
			// --------日期---------
			dateChange : function(e){
				this.birthday = e.detail.value;
			},
			// --------获得日期---------
			getDate(type) {
						const date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let day = date.getDate();

						if (type === 'start') {
							year = year - 60;
						} else if (type === 'end') {
							year = year + 2;
						}
						month = month > 9 ? month : '0' + month;;
						day = day > 9 ? day : '0' + day;
						return `${year}-${month}-${day}`;
					},
			// --------地址切换---------
			toggleTab(e){
				this.$refs[this.mode].show(); 
			},
			onConfirm(e){
				this.address=e.result;
			},
			// --------背景图---------
			reviseBackground(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						console.log(res,"res11");
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							var savedFilePath = res1.savedFilePath;
							uni.setStorage({
								key:'backUrl',
								data:savedFilePath
							})
							uni.getStorage({
								key:'backUrl',
								success:function(res){
									that.backImg=res.data;
									console.log(res.data,"res..data")
								}
							})
						  }
						});
						 
					}
				})
			},
			// --------提交数据---------
			formSubmit: function(e) {
				uni.showLoading({
					title:'保存中...'
				})
				console.log(this.userId)
				console.log(this.nickname)
				// console.log(this.portrait)
				// console.log(this.port,"port")
				console.log(this.openId_qq)
				console.log(this.openId_wx)
				if(this.selector=='男'){
					this.gender=1;
				}
				if(this.selector=='女'){
					this.gender=2;
				}
				console.log(this.gender)
				console.log(this.address)
				console.log(this.nickname)
				console.log(this.birthday)
				console.log(this.phoneNumber)
				var that=this;
				uni.request({
					//url:'http://111.231.109.113:8002/api/person/changeInfo',
					url:that.$GrzxInter.Interface.changeInfo.value,
					data:{
						//portrait:this.port,
						userId:that.userId,
						gender:that.gender,
						openId_qq:that.openId_qq,
						openId_wx:that.openId_wx,
						address:that.address,
						nickname:that.nickname,
						birthday:that.birthday,
						autograph:that.autograph,
						phoneNumber:that.phoneNumber,
					},
					method:that.$GrzxInter.Interface.changeInfo.method,
					success(res) {
						console.log(res,"286")
						uni.request({
							url:that.$GrzxInter.Interface.changeInfoPortrait.value,
							data:{
								portrait:that.port,
								userId:that.userId,
							},
							method:that.$GrzxInter.Interface.changeInfoPortrait.method,
							success(res1) {
								console.log(res1,"290")
								uni.hideLoading();
								uni.navigateBack();
							}
						})
					}
				})				
			},
			// --------获得头像---------
			getPhoto(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							 that.portrait=res1.savedFilePath;
							 pathToBase64(res1.savedFilePath)
							 .then(base64 => {
								 that.port=base64;
							 })
						  }
						}); 
					}
				})	
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
	}
}
</script>
<style lang="scss">	
	.Cr_background{
		widows: 100%;
		height: 100%;
		.bg{
			width: 100%;
			height: 500upx;
			filter: blur(0.5px);
			// opacity: .7;
		}
		.tx{
			position: absolute;
			width: 200upx;
			height: 200upx; 
			left: 250upx;
			top: 52upx;
			border-radius: 50%;
			margin: 20upx;
		}
		.xgbg{
			position: absolute;
			width:220upx;
			font-size:32upx;
			left: 242upx;
			top: 294upx;
			margin: 20upx;
			border-radius: 40upx;
			line-height: 74upx;
			border-color: #FFFFFF;
			color: #FFFFFF;
		}
		.Cr_slk1{
			margin-top: -20upx;
		}
		.Cr_slk2{
			margin-top: -8upx;
		}
		.bz{
			position: relative;
			left: 36upx;
			top: 74upx;
			color: #AAAAAA;
		}
		.slk{
			position: relative;
			width: 90%;
			height: 104upx;
			left: 36upx;
			text-align: right;
			border-bottom:#F5F5F5 1px solid;
			border-left-width:0px;
			border-right-width:0px;
			border-top-width:0px;
		}
		.slk1{
			position: relative;
			width: 90%;
			height: 72upx;
			left: 36upx;
			text-align: right;
			padding-top: 24upx;
			padding-bottom: 4upx;
			border-bottom:#F5F5F5 1px solid;
			border-left-width:0px;
			border-right-width:0px;
			border-top-width:0px;
		}
		.an{
			width: 90%;
			height: 104upx;
			line-height: 104upx;
			font-size: 40upx;
			margin-top: 48upx; 
			margin-bottom: 48upx;
		}
	}

</style>