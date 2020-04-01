<template>
	<view class="Cr_background">
		<form @submit="formSubmit" >
			<image class="bg" :src="background" mode="aspectFill" name="background"></image>
			<image class="tx" :src="avatarUrl" name="avatarUrl" @click="getPhoto"></image>
			<button class="xgbg"  plain="" @click="reviseBackground">修改背景</button>
			<view class="Cr_slk1">
				<text class="bz">姓&nbsp;名：</text>
				<input class="slk"  name="nickName"  placeholder="请输入" v-model="detailInfo.nickName" adjust-position="" />
			</view>
			<view class="Cr_slk2">
				<text class="bz">性&nbsp;别：</text>
				<!-- <picker @change="selectorChange" mode = "selector" :range="aim" name="aim" :value="user.aim"> -->
				<picker class="slk1" name="gender"  mode="selector" @change="genderChange" :range="genderSex" :value="detailInfo.gender">
					{{selector}}
				</picker>
			</view>
			<view class="Cr_slk2"> 
				<text class="bz">生&nbsp;日：</text>
				<picker class="slk1" name="birthday"  mode="date" @change="dateChange" v-model="detailInfo.birthday"  :start="startDate" :end="endDate" placeholder="请选择"  >
					{{detailInfo.birthday}}
				</picker>
			</view>
			<view class="Cr_slk2">
				<text class="bz">地&nbsp;址：</text>
				<input class="slk" name="address"  disabled="disabled" @tap="toggleTab"  placeholder="你的常住地" v-model="detailInfo.address" />
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
				<input class="slk" name="autograph"   placeholder="你想要说的话"  v-model="detailInfo.autograph" />
			</view>
			<button class="an" type="primary" form-type="submit">保存</button>
			
		</form>
	</view>
	 
</template>
<script>
	import { pathToBase64, base64ToPath } from '../../components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js'
	import wPicker from "@/components/GRZX/w-picker/w-picker.vue";
	import {
	    mapState,  
	    mapMutations  
	} from 'vuex'; 
	export default {
		data() {
			return {
				avatarUrl : '../../static/GRZX/missing-face.png',
				background:'../../static/GRZX/banner3.jpg',
				mode:"region",
				genderSex:['','男','女'], 
				selector:'请选择',
				detailInfo : { 
					nickName : '',
					gender:'',
					birthday : '请选择',
					address : '',
					autograph : '',
					background:'',
				},
				phoneNumber:'',
			};
		},
		onLoad:function(){
			this.loadUserInfo();
			
		},
		onNavigationBarButtonTap : function() {
			 uni.showModal({
				 content: '表单数据内容：' + JSON.stringify(this.detailInfo),
				 showCancel: false
			 });
			 uni.setStorage({
			 	key:"userInfo",
				data:this.detailInfo
			 })
		},
		computed:{
			//...mapState(['userInfo']),
			
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
			...mapMutations(['login']),
			async loadUserInfo(){
				var theself=this;
				uni.getStorage({
					key: 'userInfo',			
					success: function (res) {
						console.log(res.data,"res")
						
						if(res.data.birthday==null||res.data.birthday==""){
							
						}else{
							theself.detailInfo.birthday=res.data.birthday;
						}
						if(res.data.gender==null||res.data.gender==""){
							theself.selector ="请选择";
						}else{
							theself.detailInfo.gender=res.data.gender;
							theself.selector =theself.genderSex[res.data.gender];
						}
						if(res.data.avatarUrl==null||res.data.avatarUrl==""){
							theself.avatarUrl ="../../static/GRZX/missing-face.png";
						}else{
							theself.avatarUrl = res.data.avatarUrl;	
						}
						if(res.data.background==null||res.data.background==""){
							theself.background ="../../static/GRZX/banner3.jpg";
						}else{
							theself.background=res.data.background;
						}
						theself.detailInfo.autograph=res.data.autograph;
						theself.detailInfo.nickName = res.data.nickName; 
						theself.detailInfo.address= res.data.address;
						theself.phoneNumber= res.data.phoneNumber;
						//console.log(res,"res")
					}
				});	
			},
			genderChange : function(e){
				//console.log(e.detail.value,"sex")
				this.selector =this.genderSex[e.detail.value]; 
			},
			dateChange : function(e){
				this.detailInfo.birthday = e.detail.value;
			},
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
			toggleTab(e){
				this.$refs[this.mode].show(); 
			},
			onConfirm(e){
				this.detailInfo.address=e.result;
			},
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
									that.background=res.data;
									console.log(res.data,"res..data")
								}
							})
						  }
						});
						// pathToBase64(res.tempFilePaths[0])
						// .then(base64 => {
						// 	
						// })
						 
					}
				})
			},
			formSubmit: function(e) {
				/* uni.showModal({
					content: '表单数据内容：' + JSON.stringify(this.detailInfo),
					showCancel: false
				});		 */	
				if(this.avatarUrl==null||this.avatarUrl==undefined){
					e.target.value.avatarUrl="../../static/GRZX/missing-face.png";
				}else{
					e.target.value.avatarUrl=this.avatarUrl;
				}
				if(this.background==null||this.background==undefined){
					e.target.value.background="../../static/GRZX/banner3.jpg";
				}else{
					e.target.value.background=this.background;
				}
				if(this.selector=="男"){
					e.target.value.gender=1;
				}
				else if(this.selector=="女"){
					e.target.value.gender=2;
				}else{
					e.target.value.gender=0;
				}
				e.target.value.birthday=this.detailInfo.birthday;
				e.target.value.phoneNumber=this.phoneNumber;
				uni.setStorage({
					key:"userInfo",
					data:e.target.value
				})
				this.login(e.target.value);
				//console.log(e.target.value,"555")
				uni.navigateBack();
			},
			getPhoto(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						//console.log(res,"res11");
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							//var savedFilePath = res1.savedFilePath;
							that.avatarUrl=res1.savedFilePath;
							// uni.setStorage({
							// 	key:'headUrl',
							// 	data:savedFilePath
							// })
							// uni.getStorage({
							// 	key:'headUrl',
							// 	success:function(res){
							// 		that.avatarUrl=res.data;
							// 		console.log(res.data,"res..data")
							// 	}
							// })
						  }
						});
						// pathToBase64(res.tempFilePaths[0])
						// .then(base64 => {
						// 	
						// })
						 
					}
				})
				
				
			},
			
	},
}
</script>
<style lang="scss">	
	.Cr_background{
		widows: 100%;
		height: 100%;
		.bg{
			width: 100%;
			height: 464upx;
			filter: blur(0.5px);
			opacity: .7;
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
			padding-top: 12upx;
			font-size: 40upx;
			margin-top: 48upx; 
			margin-bottom: 48upx;
		}
	}

</style>