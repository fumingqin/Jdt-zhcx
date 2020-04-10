<template>
	<view class="content">
		<form @submit="formSubmit" style="width: 100%;">
			<view class="box1">
				<view class="itemClass">
					<view class="fontStyle">姓名	</view>
					<input placeholder="与证件姓名一致" class="inputClass" :value="user.userName" name="userName" /> 
				</view>
				<view class="itemClass borderTop">
					<view class="fontStyle">性别</view>
					<radio-group class="inputClass" name="userSex">
						<label v-for="(item, index) in sexMode" :key="index" @click="radioClick(index)" > 
							<radio style="transform: scale(0.7)" :value="user.userSex" :checked="index===user.userSex" />{{item.title}}
						</label>  
					</radio-group>
				</view>
				<view class="itemClass borderTop">
					<view class="fontStyle">手机号码</view>
					<input
						type="number"
						placeholder="请输入手机号码"
						maxlength="11"
						class="inputClass"
						:value="user.userPhoneNum"
						name="userPhoneNum"
					/>				
				</view>
			</view>
			<view class="codeClass">证件</view>
			<view class="box2">
				<view class="itemClass">
					<view class="fontStyle" style="font">身份证</view>
				</view>
				<view class="itemClass borderTop">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						:value="user.userCodeNum"
						name="userCodeNum"
						type="idcard"
						maxlength="18"
					/>	
				</view>
				
				<!-- <view class="itemClass borderTop">
					<view class="fontStyle">有效期至</view>
					<view class="inputClass">
						<picker mode="date" :value="user.date" @change="bindDateChange" name="date">
							<view>{{user.date}}</view>
						</picker>
					</view>
				</view> -->
				
				<!-- <view class="itemClass borderTop">
					<picker class="proveClass" name="prove"  mode="selector" @change="proveChange" :range="proveType" :value="user.prove">
						{{selector}}
					</picker>
				</view> -->
			</view>
			
			<!-- 上传证件 -->
			<view class="frontClass" v-if="selector=='军人' || selector=='教师' || selector=='学生'" @click="getPhoto1">
				<view v-if="auditState1==0">
					<image src="../../static/GRZX/addImg.png" class="addClass"></image>
					<text class="fontClass">点击上传证件的正面</text>
				</view>
				<view v-if="auditState1==1">
					<image class="imgClass" :src="user.frontImg" name="frontImg"  mode="aspectFill"></image>
					<!-- <image class="auditClass" src="../../static/GRZX/auditImg.png"></image> -->
					<text class="stateClass">待审核</text>
				</view>
				<view v-if="auditState1==2">
					<image class="imgClass" :src="user.frontImg" name="frontImg"  mode="aspectFill"></image>
					<text class="stateClass">审核通过</text>
				</view>
				<view v-if="auditState1==3">
					<image class="imgClass" :src="user.frontImg" name="frontImg"  mode="aspectFill"></image>
					<text class="stateClass">审核未通过</text>
				</view>
			</view>
			<view class="backClass" v-if="selector=='军人' || selector=='教师' || selector=='学生'" @click="getPhoto2">
				<view v-if="auditState2==0">
					<image src="../../static/GRZX/addImg.png" class="addClass"></image>
					<text class="fontClass">点击上传证件的主页</text>
				</view>
				<view v-if="auditState2==1">
					<image class="imgClass" :src="user.backImg" name="backImg"  mode="aspectFill"></image>
					<text class="stateClass">待审核</text>
				</view>
				<view v-if="auditState2==2">
					<image class="imgClass" :src="user.backImg" name="backImg"  mode="aspectFill"></image>
					<text class="stateClass">审核通过</text>
				</view>
				<view v-if="auditState2==3">
					<image class="imgClass" :src="user.backImg" name="backImg"  mode="aspectFill"></image>
					<text class="stateClass">审核未通过</text>
				</view>
			</view>
			
			
			<view class="personClass">
				<view class="fontStyle">设置为本人</view>
				<view class="checkBox">
					<checkbox-group name="userDefault" @change="checkChange">
						<label>
							<checkbox :checked="user.userDefault" :value="user.userDefault"  />
						</label>
					</checkbox-group>
				</view>
			</view>
			<view v-if="!user.show" style="margin-bottom: 150upx;"></view>
			<view v-if="user.show" class="emergencyClass">
				<view class="fontStyle">紧急联系人</view>
				<view class="checkBox">
					<checkbox-group name="userEmergencyContact">
						<label>
							<checkbox :checked="user.userEmergencyContact" :value="user.userEmergencyContact" />
						</label>
					</checkbox-group>
				</view>
			</view>
			<button  class="btndelete" @click="resetClick">重置</button>
			<button form-type="submit" class="btnsubmit">保存</button>		
		</form>
		<view class="title">
			<image src="../../static/GRZX/btnReturn.png" class="returnClass" @click="returnClick"></image>
			<text class="textClass" @click="returnClick">常用信息设置</text>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/GRZX/w-picker/w-picker.vue";
	export default {
		data(){
			return{
				auditState1:'',
				auditState2:'',
				//add:1,
				sexMode :[
					{title:'男'},
					{title:'女'}
				],
				proveType:['请选择','军人','教师','学生'],
				selector:'添加额外凭证',
				user:{
					userID:'',
					userName:'',	
					userSex:0,
					userPhoneNum:'',
					userCodeNum:'',
					date:'',
					userDefault:false,
					show:true,
					userEmergencyContact:false,
					date:'请选择',
					prove:0,
					frontImg:'',
					backImg:'',
				},
				userType:'',
				address:'',
				unid:'',
			}
		},
		onLoad (options){	
			this.loadUnid();
			var type=options.type;
			this.type=options.type;
			if(options.type=="edit"){
				this.loadData(type);
			}
		},
		components:{
		     wPicker
		},
		methods:{
			async loadUnid(){
				var the=this;
				uni.getStorage({
					key:'userInfo',
					success(res){
						the.unid=res.data.unid;
					}
				})
			},
			async loadData(type){
				var that=this;
				uni.getStorage({
					key:'editPassenger',
					success:function(res){
						console.log(res,"res")
						that.user.userName=res.data.userName;
						if(res.data.userSex=="男"){
							that.user.userSex=0;
						}else{
							that.user.userSex=1;
						}
						that.user.userCodeNum =res.data.userCodeNum ;
						that.user.date=res.data.date;
						if(res.data.userDefault=="true"){
							that.user.userDefault=true;
						}else{
							that.user.userDefault=false;
						}
						that.user.show=!that.user.userDefault;
						if(res.data.userEmergencyContact=="true"){
							that.user.userEmergencyContact=true;
						}else{
							that.user.userEmergencyContact=false;
						}
						that.user.userPhoneNum=res.data.userPhoneNum;
						that.user.userID=res.data.userID;
						// if(res.data.userType=="军人"||res.data.userType=="教师"||res.data.userType=="学生"){
						// 	that.selector=res.data.userType;
						// 	that.user.frontImg=res.data.frontImg;
						// 	that.user.backImg=res.data.backImg;
						// 	that.auditState1=res.data.auditState;
						// 	that.auditState2=res.data.auditState;
							// that.auditState1=2;  //测试
							// that.auditState2=2;	//测试
						//}
						
					}
				})
			}, 
			radioClick:function(e){
				this.user.userSex = e;
			},
			formSubmit(e){
				var data1=e.target.value;
				var that=this;
				data1.userID=that.user.userID;
				// console.log(this.type,"235");
				if(this.user.userSex==1){
					data1.userSex="女";
				}else{
					data1.userSex="男";
				}
				if(data1.userDefault==null||data1.userDefault==""){
					data1.userDefault=false;
				}else{
					data1.userDefault=true;
				}
				if(this.user.show){
					if(data1.userEmergencyContact==null||data1.userEmergencyContact==""){
						data1.userEmergencyContact=false;
					}else{
						data1.userEmergencyContact=true;
					}
				}else{
					data1.userEmergencyContact=false;
				}
				var codeNum=data1.userCodeNum;
				if(data1.userName!=null&&data1.userName!=""&&data1.userPhoneNum!=null&&data1.userPhoneNum!=""&&data1.userCodeNum!=null&&data1.userCodeNum!=""){
					var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if(data1.userPhoneNum.length!=11){
						uni.showToast({
							icon:'none',
							title:'输入的手机号有误，请检查'
						})
					}else if(!regIdNo.test(codeNum)){ 
							uni.showToast({
								icon:'none',
								title:'输入的身份证有误，请检查'
							})
						}else{
							var birth=codeNum.substring(6, 10) + "-" + codeNum.substring(10, 12) + "-" + codeNum.substring(12, 14);
							var  r=birth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
							var  d=new Date(r[1],r[3]-1,r[4]); 
							var age=0;
							if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])   
							{   
								var Y=new  Date().getFullYear();   
								age=Y-r[1];
								console.log(age,"age")
							}
							if(age<=0){
								uni.showToast({
									icon:'none',
									title:'输入的身份证有误，请检查'
								})
							}else if(age<18){
								data1.userType="儿童";
							}else{
								data1.userType="成人";
							}
							if(data1.userType=="儿童"||data1.userType=="成人"){
								uni.request({
									url:'http://218.67.107.93:9210/api/app/userInfoList?id='+that.unid,
									method:'POST',
									success(listRes) {
										//判断是否有本人
										if(data1.userDefault){
											var defaultList=listRes.data.data.filter(item => {
												return item.userDefault == "true";
											})
											if(defaultList.length>0){
												uni.request({
													url:'http://218.67.107.93:9210/api/app/changeUserInfo?id='+that.unid,
													data:{
														userID:defaultList[0].userID,  
														userType:defaultList[0].userType,   //用户类别 成人/儿童 
														userName:defaultList[0].userName,   //用户姓名   
														userSex:defaultList[0].userSex,   //用户性别   
													  	userCodeNum:defaultList[0].userCodeNum,   //用户身份证   
													  	userPhoneNum:defaultList[0].userPhoneNum,   //用户手机号   
													  	userDefault:'false',   //用户是否本人 true/false 
													  	userEmergencyContact:defaultList[0].userEmergencyContact,   //是否设置为紧急联系人 true/false
													},
													method:'POST',
													success(resd) {
														console.log(resd,"315")
													}
												})
											}
											
										}
										//判断是否有紧急联系人
										if(data1.userEmergencyContact){
											var defaultList=listRes.data.data.filter(item => {
												return item.userEmergencyContact == "true";
											})
											if(defaultList.length>0){
												uni.request({
													url:'http://218.67.107.93:9210/api/app/changeUserInfo?id='+that.unid,
													data:{
														userID:defaultList[0].userID,  
														userType:defaultList[0].userType,   //用户类别 成人/儿童 
														userName:defaultList[0].userName,   //用户姓名   
														userSex:defaultList[0].userSex,   //用户性别   
													  	userCodeNum:defaultList[0].userCodeNum,   //用户身份证   
													  	userPhoneNum:defaultList[0].userPhoneNum,   //用户手机号   
													  	userDefault:defaultList[0].userDefault,   //用户是否本人 true/false 
													  	userEmergencyContact:'false',   //是否设置为紧急联系人 true/false
													},
													method:'POST',
													success(resd) {
														console.log(resd,"315")
													}
												})
											}
											
										}
										// 判断身份证号是否存在乘车人列表
										var code=listRes.data.data.filter(item => {
											return item.userCodeNum == data1.userCodeNum;
										})
										if(code.length>0&&(that.type=="add"||that.type=="ad")){
											uni.showToast({
												icon:'none',
												title:'乘车人已存在，请重新输入'
											})
										}else{
											uni.request({
												url:'http://218.67.107.93:9210/api/app/changeUserInfo?id='+that.unid,
												data:{
													userID:data1.userID,  
													userType:data1.userType,   //用户类别 成人/儿童 
													userName:data1.userName,   //用户姓名   
													userSex:data1.userSex,   //用户性别   
												  	userCodeNum:data1.userCodeNum,   //用户身份证   
												  	userPhoneNum:data1.userPhoneNum,   //用户手机号   
												  	userDefault:data1.userDefault,   //用户是否本人 true/false 
												  	userEmergencyContact:data1.userEmergencyContact,   //是否设置为紧急联系人 true/false
												},
												method:'POST',
												success(res) {
													console.log(res,"370")
													uni.showToast({
														icon:'success',
														title:'完成'
													})
													if(that.type=="add"){
														uni.getStorage({
															key:'passengerList',
															success(list){
																console.log(list,"378")
																var passList=[];
																for(var i=0;i<list.data.length;i++){
																	passList.push(list.data[i]);
																}
																var list1={
																	userID:res.data.data.userID,
																	userType:res.data.data.userType,   //用户类别 成人/儿童 
																	userName:res.data.data.userName,   //用户姓名   
																	userSex:res.data.data.userSex,   //用户性别   
																  	userCodeNum:res.data.data.userCodeNum,   //用户身份证   
																  	userPhoneNum:res.data.data.userPhoneNum,   //用户手机号   
																  	userDefault:res.data.data.userDefault,   //用户是否本人 true/false 
																  	userEmergencyContact:res.data.data.userEmergencyContact, //是否设置为紧急联系人 true/false
																	hiddenIndex:1,  //1代表选中
																}
																passList.push(list1);
																uni.setStorage({
																	key:'passengerList',
																	data:passList
																})
															}
														})
														
													}
													setTimeout(function(){
														uni.navigateBack();
													},500);
													// console.log(res,"2111")
												},
											})
										}
									}
								})
							}
						}
				}else{
					uni.showToast({
						icon:'none',
						title:'姓名，电话号码，身份证号未填完整，请检查'
					})
				}
				
			},
			// uni.request({
			// 	url:'http://218.67.107.93:9210/api/app/changeUserInfo?id=26',
			// 	data:{
			// 		userID:'',  
			// 		userType:'成人',   //用户类别 成人/儿童 
			// 		userName:'data1.userName',   //用户姓名   
			// 		userSex:'男',   //用户性别   
			// 	  	userCodeNum:'350821199610122411',   //用户身份证   
			// 	  	userPhoneNum:'15260179755',   //用户手机号   
			// 	  	userDefault:true,   //用户是否本人 true/false 
			// 	  	userEmergencyContact:false,   //是否设置为紧急联系人 true/false
			// 	},
			// 	method:'POST',
			// 	success(res) {
			// 		console.log(res,"2222")
			// 	},
			// })
			// formSubmit1:function(e){
			// 	if(that.selector=="军人"){
			// 		data1.userType="军人";
			// 		data1.frontImg=that.user.frontImg;
			// 		data1.backImg=that.user.backImg;
			// 		data1.auditState=that.auditState1;
			// 	}else if(that.selector=="教师"){
			// 		data1.userType="教师";
			// 		data1.frontImg=that.user.frontImg;
			// 		data1.backImg=that.user.backImg;
			// 		data1.auditState=that.auditState1;
			// 	}else if(that.selector=="学生"){
			// 		data1.userType="学生";
			// 		data1.frontImg=that.user.frontImg;
			// 		data1.backImg=that.user.backImg;
			// 		data1.auditState=that.auditState1;
			// 	}else if(age>=65){
			// 		data1.userType="老人";
			// 	}else if(age>=18&&age<65){
			// 		data1.userType="成人";
			// 	}else{
			// 		data1.userType="儿童";
			// 	}
			// },
			bindDateChange:function(e){
				this.user.date = e.target.value;
			},
			proveChange:function(e){
				if(e.detail.value==0){
					this.selector="添加额外凭证";
				}else{
					this.selector=this.proveType[e.detail.value];
				}
				// console.log(this.user.frontImg,"1")
				// console.log(this.user.backImg,"2")
				if(this.selector=='军人' || this.selector=='教师' || this.selector=='学生'){
					this.auditState1=0;
					this.auditState2=0;
					this.user.frontImg="";
					this.user.backImg="";
				}
			},
			resetClick:function(e){
				this.user.date="请选择";
				this.user.userSex=0;
				this.user.show=true;
				this.user.userName="";
				this.user.userPhoneNum="";
				this.user.userCodeNum="";
				this.user.userDefault=false;
				this.user.userEmergencyContact=false;
			},
			checkChange:function(e){
				//console.log(e.detail.value,"xuanzhong");
				if(e.detail.value=="false"||e.detail.value=="true"){ //选中
					this.user.show=false;
				}else{	//未选中
					this.user.show=true;
					this.user.userEmergencyContact=false;
				}
			},
			returnClick(){
				uni.navigateBack();
			},
			getPhoto1(){  	//证件正面
				var that=this;
				
				uni.chooseImage({
					count:1,
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
							success: function (res1) {
								that.user.frontImg=res1.savedFilePath;
								that.auditState1=1;
							}
						});
					}
				})
			},
			getPhoto2(){	//证件主页
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
								that.user.backImg=res1.savedFilePath;
								that.auditState2=1;
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F8FC;
	}
	.content {
		// position: relative;
		display: flex;
		width: 100%;
	}
	.title{
		width: 100%;
		height: 144upx;
		position: fixed;
		left: 3.47%;
		top: 0upx;
		background-color: #F6F8FC;
	}
	.returnClass{
		width: 22upx;
		height: 40upx;
		display: flex;
		flex-direction: row;
		position: absolute;
		top: 100upx;
	}
	.textClass{
		color: #333333;
		font-size: 38upx;
		height: 44upx;
		line-height: 44upx;
		margin-top: 0upx;
		margin-left: 0upx;
		position: absolute;
		left: 36upx;
		top: 95upx;
	}
	
	.box1{ //姓名，性别，手机号
		display: flex;
		flex-direction: column;
		width: 93.07%;
		height: 330upx;
		margin-top: 170upx;
		margin-left: 3.47%;
		background-color: #FFFFFF;
		border-radius: 25upx;
	}
	.box2{		//证件相关信息
		display: flex;
		flex-direction: column;
		width: 93.07%;
		margin-top: 20upx;
		margin-left: 3.47%;
		background-color: #FFFFFF;
		border-radius: 25upx;
	}
	.itemClass{  
		width: 618upx;
		height: 110upx;
		margin-left: 40upx;
		margin-top: 0upx;
		
	}
	.codeClass{  //证件
		margin-top: 20upx;
		margin-left: 3.33%;
		font-size:32upx;
		font-family:Source Han Sans SC;
		font-weight:400;
		color:#2C2D2D;
		//font-weight: bold;
	}
	
	.fontStyle{   //文字样式
		color: #2C2D2D;
		font-size: 30upx;
		position: absolute;
		left: 9%;
		line-height: 108upx;
	}

	.personClass{	//是否为本人
		width: 93.07%;
		height: 110upx;
		background-color: #FFFFFF;
		margin-top: 20upx;
		margin-left: 3.47%;
		//margin-bottom: 150upx;
		border-radius: 25upx;
	}
	.emergencyClass{	//是否为紧急联系人
		width: 93.07%;
		height: 110upx;
		background-color: #FFFFFF;
		margin-top: 20upx;
		margin-left: 3.47%;
		margin-bottom: 150upx;
		border-radius: 25upx;
	}
	.btndelete{	//重置
		width: 40%;
		height: 108upx;
		background-color: #FFFFFF;
		color: #F75674;
		position: fixed;
		bottom: 0upx;
		left: 0%;
		border-radius: 0upx;
		text-align: center;
		line-height: 108upx;
		font-size: 35upx;
	}
	.btnsubmit{		//保存
		width: 60%;
		height: 108upx;
		background-color: #FC4B4B;
		color: #FFFFFF;
		position: fixed;
		bottom: 0upx;
		left: 40%;
		border-radius: 0upx;
		text-align: center;
		line-height: 108upx;
		font-size: 35upx;
	}
	.inputClass{
		position: absolute;
		width: 50%;
		height: 108upx;
		font-size: 32upx;
		right: 9%;
		line-height: 108upx;
		text-align: right;
	}
	.checkBox{ 
		line-height: 108upx;
		position: absolute;
		right: 9%;
	}
	//checkBox样式
	/* #ifdef APP-PLUS*/
	// uni-checkbox-group{ 
	// 	width:50% !important; 
	// }
	// uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
	// 	//background: #ff0000;
	// 	border-color:#ff0000;
	// }
	// uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked::before{
	// 	border-color:#ff0000 ;
	// }
	/* #endif */
	.borderTop{  
		border-top: 1upx solid #F5F5F5;
	}
	.frontClass{  //证件正面
		width: 93.07%;
		height: 440upx;
		margin-top: 20upx;
		margin-left: 3.47%;
		// border: 1upx solid #EAEAEA;
		background-color: #FFFFFF;
		border-radius: 25upx;
		position: relative;
	}
	.backClass{ //证件主页
		width: 93.07%;
		height:	440upx;
		margin-top: 20upx;
		margin-left: 3.47%;
		// border: 1upx solid #EAEAEA;
		background-color: #FFFFFF;
		border-radius: 25upx;
		position: relative;
	}
	.addClass{	//添加图片
		width: 100upx;
		height: 100upx;
		position: absolute;
		left: 42%;
		top:150upx;
	}
	.fontClass{		//字体（证件）
		text-align: center;
		width: 100%;
		font-size: 32upx;
		position: absolute;
		top:270upx;
		color:#cdcdcd;
	}
	.proveClass{	//额外凭证
		font-size: 32upx;
		height: 108upx;
		line-height: 108upx;
		// margin-top: -53upx;
		// margin-left: 39%;
		//color: #ff0000;
		text-align: center;
	}
	.imgClass{
		width: 100%;
		height: 440upx;
		border-radius: 25upx;
	}
	.auditClass{ //审核的背景图
		position: absolute;
		right: 0upx;
		top: 0;
		width: 100upx;
		height: 30upx;
	}
	.stateClass{	//审核状态的文字样式
		position: absolute;
		left: 20upx;
		top: 0;
		//width: 112upx;
		height: 52upx;
		line-height: 52upx;
		font-size: 32upx;
		color: #ff0000;
	}
</style>
