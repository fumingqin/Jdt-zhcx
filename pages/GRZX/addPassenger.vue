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
						@blur="checkPhone"
					/>				
				</view>
			</view>
			<view class="codeClass">证件</view>
			<view class="box2">
				<view class="itemClass">
					<view class="fontStyle" style="font-weight: bold;">身份证</view>
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
						@blur="checkCodeNum"
					/>	
				</view>
				
				<view class="itemClass borderTop">
					<view class="fontStyle">类型</view>
					<view class="inputClass">
						<picker name="type"  mode="selector" @change="typeChange" :range="selectType" :value="user.type">
							{{ticketType}}
						</picker>	
					</view>
					<!-- <view class="inputClass">
						<picker mode="date" :value="user.date" @change="bindDateChange" name="date">
							<view>{{user.date}}</view>
						</picker>
					</view> -->
				</view>
				
				<view class="itemClass borderTop">
					<picker class="proveClass" name="prove"  mode="selector" @change="proveChange" :range="proveType" :value="user.prove">
						{{selector}}
					</picker>
				</view>
			</view>
			
			<!-- 上传证件 -->
			<view class="frontClass" v-if="selector=='军人' || selector=='教师' || selector=='学生'" @click="getPhoto1">
				<view v-if="auditState1=='待提交'">
					<image src="../../static/GRZX/addImg.png" class="addClass"></image>
					<text class="fontClass">点击上传证件的正面</text>
				</view>
				<view v-if="auditState1=='待审核'">
					<image class="imgClass" :src="user.userfrontImg" name="userfrontImg"  mode="aspectFill"></image>
					<!-- <image class="auditClass" src="../../static/GRZX/auditImg.png"></image> -->
					<text class="stateClass">待审核</text>
				</view>
				<view v-if="auditState1=='审核通过'">
					<image class="imgClass" :src="user.userfrontImg" name="userfrontImg"  mode="aspectFill"></image>
					<text class="stateClass">审核通过</text>
				</view>
				<view v-if="auditState1=='审核未通过'">
					<image class="imgClass" :src="user.userfrontImg" name="userfrontImg"  mode="aspectFill"></image>
					<text class="stateClass">审核未通过</text>
				</view>
			</view>
			<view class="backClass" v-if="selector=='军人' || selector=='教师' || selector=='学生'" @click="getPhoto2">
				<view v-if="auditState2=='待提交'">
					<image src="../../static/GRZX/addImg.png" class="addClass"></image>
					<text class="fontClass">点击上传证件的主页</text>
				</view>
				<view v-if="auditState2=='待审核'">
					<image class="imgClass" :src="user.userbackImg" name="userbackImg"  mode="aspectFill"></image>
					<text class="stateClass">待审核</text>
				</view>
				<view v-if="auditState2=='审核通过'">
					<image class="imgClass" :src="user.userbackImg" name="userbackImg"  mode="aspectFill"></image>
					<text class="stateClass">审核通过</text>
				</view>
				<view v-if="auditState2=='审核未通过'">
					<image class="imgClass" :src="user.userbackImg" name="userbackImg"  mode="aspectFill"></image>
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
			<view v-if="false" class="emergencyClass">
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
	import { pathToBase64, base64ToPath } from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
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
				selectType:['请选择','成人','半票儿童','全票儿童'],
				ticketType:'请选择购票类型 >',
				selector:'请添加额外凭证 >',
				user:{
					passengerId:'',//乘车人id
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
					type:0,
					userfrontImg:'',
					userbackImg:'',
					fImg:'',
					bfmg:'',
				},
				userType:'',
				address:'',
				userId:'', //账号id
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
			//------------------加载账号id----------------
			loadUnid(){
				var the=this;
				uni.getStorage({
					key:'userInfo',
					success(res){
						the.userId=res.data.userId;
					}
				})
			},
			//------------------加载乘车人信息----------------
			loadData(type){
				uni.showLoading({
					title:'加载中...'
				})
				var that=this;
				uni.getStorage({
					key:'editPassenger',
					success:function(res){
						console.log(res,"res")
					//----------加载passengerId--------
						that.user.passengerId=res.data.passengerId;
					//----------加载姓名--------
						that.user.userName=res.data.userName;
					//----------加载性别--------
						if(res.data.userSex=="男"){
							that.user.userSex=0;
						}else{
							that.user.userSex=1;
						}
					//----------加载身份证--------
						that.user.userCodeNum =res.data.userCodeNum ;
					//----------是否为本人--------
						that.user.userDefault=res.data.userDefault;
						that.user.show=!that.user.userDefault;
					//----------是否为紧急联系人--------
						that.user.userEmergencyContact=res.data.userEmergencyContact;
					//----------加载电话号码--------
						that.user.userPhoneNum=res.data.userPhoneNum;
					//----------加载证件信息--------
						if(res.data.userType=="军人"||res.data.userType=="教师"||res.data.userType=="学生"){
							that.selector=res.data.userType;
							uni.request({
								//url:'http://111.231.109.113:8002/api/person/userInfoListDetail',
								url:that.$GrzxInter.Interface.userInfoListDetail.value,
								data:{
									userId:that.userId,
									passengerId:that.user.passengerId,
								},
								method:that.$GrzxInter.Interface.userInfoListDetail.method,
								success(res1) {
									that.fImg= res1.data.data[0].userfrontImg;
									that.bImg= res1.data.data[0].userbackImg;
									//---------base64转图片-----------
									var front= res1.data.data[0].userfrontImg;
									base64ToPath(front)
									  .then(path => {
									    that.user.userfrontImg=path;
									})
									var back= res1.data.data[0].userbackImg;
									base64ToPath(back)
									  .then(path2 => {
										that.user.userbackImg=path2;
										uni.hideLoading();
									})
									that.auditState1=res1.data.data[0].userauditState;
									that.auditState2=res1.data.data[0].userauditState;
								}
							})
						}else{
							uni.hideLoading();
						}
					}
				})
			}, 
			//------------------选择性别----------------
			radioClick:function(e){
				this.user.userSex = e;
			},
			//------------------上传乘车人信息----------------
			formSubmit(e){
				var data1=e.target.value;
				var that=this;
				data1.userId=that.userId;
				data1.passengerId=that.user.passengerId; 
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
				data1.fImg=this.fImg;
				data1.bImg=this.bImg;
				data1.userauditState=that.auditState2;
				console.log(that.ticketType,"that.ticketType")
				data1.userType=that.ticketType;
				var codeNum=data1.userCodeNum;
				if(data1.userName!=null&&data1.userName!=""&&data1.userPhoneNum!=null&&data1.userPhoneNum!=""&&data1.userCodeNum!=null&&data1.userCodeNum!=""){
					//--------额外凭证--------
					if((that.selector!="请添加额外凭证 >"&&that.fImg!=""&&that.fImg!=null&&that.bImg!=""&&that.bImg!=null)||(that.selector=="请添加额外凭证 >")){
						var reg=(/^1(3|4|5|6|7|8|9)\d{9}$/);
						if(data1.userPhoneNum.length!=11||!reg.test(data1.userPhoneNum)){
							uni.showToast({
								icon:'none',
								title:'输入的手机号有误，请检查'
							})
						}else if(!that.checkIDCard(codeNum)){
								uni.showToast({
									icon:'none',
									title:'输入的身份证有误，请检查'
								})
							}else{
								if(data1.userType=="请选择购票类型 >"){
									uni.showToast({
										title:'请选择购票类型',
										icon:'none'
									})
								}else {
									uni.showLoading({
										title:'保存中...'
									})
									uni.request({
										// url:'http://111.231.109.113:8002/api/person/userInfoList',
										url:that.$GrzxInter.Interface.userInfoList.value,
										data:{
											userId:that.userId,
										},
										method:that.$GrzxInter.Interface.userInfoList.method,
										success(listRes) {
											//判断是否有本人
											if(data1.userDefault&&listRes.data.data!=null&&listRes.data.data!=""){
												var defaultList=listRes.data.data.filter(item => {
													return item.userDefault == true;
												})
												if(defaultList.length>0){
													uni.request({
														//url:'http://111.231.109.113:8002/api/person/changeUserInfo',
														url:that.$GrzxInter.Interface.changeUserInfo.value,
														data:{
															userId:defaultList[0].userId, //账号id
															passengerId:defaultList[0].passengerId, //乘车人id
															userType:defaultList[0].userType,   //用户类别 成人/儿童 
															userName:defaultList[0].userName,   //用户姓名   
															userSex:defaultList[0].userSex,   //用户性别   
														  	userCodeNum:defaultList[0].userCodeNum,   //用户身份证   
														  	userPhoneNum:defaultList[0].userPhoneNum,   //用户手机号   
														  	userDefault:'false',   //用户是否本人 true/false 
														  	userEmergencyContact:defaultList[0].userEmergencyContact,   //是否设置为紧急联系人 true/false
														},
														method:that.$GrzxInter.Interface.changeUserInfo.method,
														success(resd) {
															console.log(resd,"315")
														}
													})
												}	
											}
											//判断是否有紧急联系人
											if(data1.userEmergencyContact&&listRes.data.data!=null&&listRes.data.data!=""){
												var defaultList=listRes.data.data.filter(item => {
													return item.userEmergencyContact == true;
												})
												if(defaultList.length>0){
													uni.request({
														//url:'http://111.231.109.113:8002/api/person/changeUserInfo',
														url:that.$GrzxInter.Interface.changeUserInfo.value,
														data:{
															userId:defaultList[0].userId, //账号id
															passengerId:defaultList[0].passengerId, //乘车人id  
															userType:defaultList[0].userType,   //用户类别 成人/儿童 
															userName:defaultList[0].userName,   //用户姓名   
															userSex:defaultList[0].userSex,   //用户性别   
														  	userCodeNum:defaultList[0].userCodeNum,   //用户身份证   
														  	userPhoneNum:defaultList[0].userPhoneNum,   //用户手机号   
														  	userDefault:defaultList[0].userDefault,   //用户是否本人 true/false 
														  	userEmergencyContact:'false',   //是否设置为紧急联系人 true/false
														},
														method:that.$GrzxInter.Interface.changeUserInfo.method,
														success(resd) {
															console.log(resd,"315")
														}
													})
												}
											} 
											uni.request({
												// url:'http://111.231.109.113:8002/api/person/changeUserInfo',
												url:that.$GrzxInter.Interface.changeUserInfo.value,
												data:{
													userId:data1.userId, //账号id
													passengerId:data1.passengerId, //乘车人id   
													userType:data1.userType,   //用户类别 成人/儿童 
													userName:data1.userName,   //用户姓名   
													userSex:data1.userSex,   //用户性别   
												  	userCodeNum:data1.userCodeNum,   //用户身份证   
												  	userPhoneNum:data1.userPhoneNum,   //用户手机号   
												  	userDefault:data1.userDefault,   //用户是否本人 true/false 
												  	userEmergencyContact:data1.userEmergencyContact,   //是否设置为紧急联系人 true/false
													userfrontImg:data1.fImg,  	//证件正面
													userbackImg:data1.bImg,		//证件主页
													userauditState:data1.userauditState,   //审核状态
												},
												method:that.$GrzxInter.Interface.changeUserInfo.method,
												success(res) {
													console.log(res,"370")
													if(res.data.msg!=""&&res.data.msg!=null){
														uni.showToast({
															icon:'none',
															title:res.data.msg
														})
													}else{
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
																	if(res.data.data.userSex==0){
																		res.data.data.userSex="男";
																	}else{
																		res.data.data.userSex="女";
																	}
																	var list1={
																		passengerId:res.data.data.passengerId, //乘车人id
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
													}
												},
											})
										}
									})
								}
							}
					}else{
						uni.showToast({
							icon:'none',
							title:'请上传额外凭证'
						})
					}
				}else{
					uni.showToast({
						icon:'none',
						title:'姓名，电话号码，身份证号未填完整，请检查'
					})
				}
				
			},
			//------------------绑定日期----------------
			bindDateChange:function(e){
				this.user.date = e.target.value;
			},
			//------------------添加额外凭证----------------
			proveChange:function(e){
				if(e.detail.value==0){
					this.selector="请添加额外凭证 >";
					this.auditState1="";
					this.auditState2="";
				}else{
					this.selector=this.proveType[e.detail.value];
				}
				if(this.selector=='军人' || this.selector=='教师' || this.selector=='学生'){
					this.auditState1="待提交";
					this.auditState2="待提交";
					this.user.userfrontImg="";
					this.user.userbackImg="";
				}
			},
			//------------------选择购票类型----------------
			typeChange:function(e){
				console.log(e)
				this.ticketType=this.selectType[e.detail.value];
			},
			//------------------重置信息----------------
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
			//------------------是否选中本人----------------
			checkChange:function(e){
				//console.log(e.detail.value,"xuanzhong");
				if(e.detail.value=="false"||e.detail.value=="true"){ //选中
					this.user.show=false;
				}else{	//未选中
					this.user.show=true;
					this.user.userEmergencyContact=false;
				}
			},
			//------------------返回按钮----------------
			returnClick(){
				uni.navigateBack();
			},
			//------------------证件正面----------------
			getPhoto1(){  
				var that=this;
				uni.chooseImage({
					count:1,
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
							success: function (res1) {
								that.user.userfrontImg=res1.savedFilePath;
								that.auditState1="待审核";
								pathToBase64(res1.savedFilePath)
									.then(base64 => {
									that.fImg=base64;	
								})
							}
						});
					}
				})
			},
			//------------------证件主页----------------
			getPhoto2(){
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
								that.user.userbackImg=res1.savedFilePath;
								that.auditState2="待审核";
								pathToBase64(res1.savedFilePath)
									.then(base64 => {
									that.bImg=base64;	
								})
							}
						});
					}
				})
			},
			//------------------校验手机号----------------
			checkPhone:function(e){
				var reg=(/^1(3|4|5|6|7|8|9)\d{9}$/);
				if(e.detail.value==""){
					console.log("空的")
				}else if(reg.test(e.detail.value)){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的手机号有误，请检查',
						icon:'none'
					})
				}
			},
			//------------------校验身份证号----------------
			checkCodeNum:function(e){
				console.log(e)
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkIDCard(e.detail.value)){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的身份证有误，请检查',
						icon:'none'
					})
				}
			},
			checkIDCard:function(idcode){
			    // 加权因子
			    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
			    // 校验码
			    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
			    var code = idcode + "";
			    var last = idcode[17];//最后一位
			    var seventeen = code.substring(0,17);
			    // 判断最后一位校验码是否正确
			    var arr = seventeen.split("");
			    var len = arr.length;
			    var num = 0;
			    for(var i = 0; i < len; i++){
			        num = num + arr[i] * weight_factor[i];
			    }
			    // 获取余数
			    var resisue = num%11;
			    var last_no = check_code[resisue];
				var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				// 判断格式是否正确
				var format = idcard_patter.test(idcode);
				// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				return last === last_no && format ? true : false;
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
		/* #ifdef H5 */
		height: 74upx;
		/* #endif */
		/* #ifndef H5 */
		height: 144upx;
		/* #endif */
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
		/* #ifdef H5 */
		top: 30upx;
		/* #endif */
		/* #ifndef H5 */
		top: 100upx;
		/* #endif */
	}
	.textClass{
		color: #333333;
		font-size: 38upx;
		height: 44upx;
		line-height: 44upx;
		position: absolute;
		left: 36upx;
		/* #ifdef H5 */
		top: 25upx;
		/* #endif */
		/* #ifndef H5 */
		top: 95upx;
		/* #endif */
	}
	
	.box1{ //姓名，性别，手机号
		display: flex;
		flex-direction: column;
		width: 93.07%;
		height: 330upx;
		/* #ifdef H5 */
		margin-top: 100upx;
		/* #endif */
		/* #ifndef H5 */
		margin-top: 170upx;
		/* #endif */
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
