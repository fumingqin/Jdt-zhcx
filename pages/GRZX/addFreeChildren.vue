<template>
	<view class="content">
		<form @submit="formSubmit" style="width: 100%;">
			<view class="box1">
				<view class="itemClass">
					<view class="fontStyle">姓名	</view>
					<input placeholder="与证件姓名一致" class="inputClass"  name="userName" v-model="user.userName"/> 
				</view>
				<view class="itemClass borderTop">
					<view class="fontStyle">性别</view>
					<radio-group class="inputClass" name="userSex">
						<label v-for="(item, index) in sexMode" :key="index" @click="radioClick(index)" > 
							<radio style="transform: scale(0.7)" :value="user.userSex" :checked="index===user.userSex" />{{item.title}}
						</label>  
					</radio-group>
				</view>
			</view>
			<view class="codeClass">证件</view>
			<view class="box2">
				<view class="itemClass">
					<view class="fontStyle" style="font-weight: bold;">证件类型</view>
					<view class="inputClass">
						<picker name="codeType"  mode="selector" @change="codeChange" :range="selectCode" :value="code">
							{{codeType}}
						</picker>	
					</view>
				</view>
				<!-- 身份证 -->
				<view v-if="code==0" class="itemClass borderTop">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						v-model="user.userCodeNum"
						name="userCodeNum"
						type="idcard"
						maxlength="18"
						@blur="checkCodeNum1"
					/>	
				</view>
				<!-- 出生证 -->
				<view v-if="code==1" class="itemClass borderTop">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						v-model="user.userCodeNum"
						name="userCodeNum"
						@blur="checkCodeNum2"
					/>	
				</view>
				<!-- 临时乘车编号 -->
				<view v-if="code==2" class="itemClass borderTop">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						v-model="user.userCodeNum"
						name="userCodeNum"
						@blur="checkCodeNum3"
					/>	
				</view>
				
				<view class="itemClass">
					<view class="fontStyle">陪同乘车</view>
					<view class="inputClass">
						<picker name="codeType"  mode="selector" @change="accompanyChange" :range="accompanyList" :value="user.accompany">
							{{accompanyPeople}}
						</picker>	
					</view>
				</view>
			</view>
			<view class="box3">
				①6周岁及以下或1.2米及以下的儿童可免费登记乘车（无座位）;</br>
				②每一名成人可携带一位免童;</br>
				③乘车时需出示有效证件证明儿童年龄。
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
				sexMode :[
					{title:'男'},
					{title:'女'}
				],
				selectCode:['身份证','出生证','临时乘车编号'],
				codeType:'身份证 >',
				accompanyList:[],
				phoneList:[],
				accompanyPeople:'',
				user:{
					passengerId:'',//乘车人id
					userName:'',	
					userSex:0,
					userPhoneNum:'',
					userCodeNum:'',
					prove:0,
					accompany:0,
				},
				userType:'',
				userId:'', //账号id
				code:0,
				list:[],
			}
		},
		onLoad (){	
			this.loadUnid();
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
						the.loadList(the.userId);
					},
					fail(){
						uni.showToast({
							icon:'none',
							title:'暂未登录,请登录后查看'
						})
						uni.stopPullDownRefresh();
						//#ifdef APP-PLUS
						setTimeout(function(){
							uni.navigateTo({	
								url  : '/pages/GRZX/userLogin'
							}) 
						},500);
						//#endif
						//#ifdef MP-WEIXIN
						setTimeout(function(){
							uni.navigateTo({
								url:'/pages/Home/wxAuthorize',
							})
						},1500);
						// #endif
					}
				})
			},
			//------------------加载选择列表----------------
			loadList(id){
				var that=this;
				uni.request({
					//url:'http://111.231.109.113:8002/api/person/userInfoList',
					url:that.$GrzxInter.Interface.userInfoList.value,
					data:{
						userId:id,
					},
					method:that.$GrzxInter.Interface.userInfoList.method,
					success(res){
						console.log(res,'res')
						var data=res.data.data;
						for(var i=0;i<data.length;i++){
							if(data[i].userauditState!="半票儿童"&&data[i].userauditState!="免票儿童"){
								that.list.push(data[i]);
								if(data[i].userDefault){
									that.accompanyPeople=data[i].userName+" >";
									that.user.userPhoneNum=data[i].userPhoneNum;
								}
							}
						}
						for(var n=0;n<that.list.length;n++){
							if(that.list[n].userDefault==true){
								that.accompanyList.unshift(that.list[n].userName);
								that.phoneList.unshift(that.list[n].userPhoneNum)
							}else{
								that.accompanyList.push(that.list[n].userName);
								that.phoneList.push(that.list[n].userPhoneNum);
							}
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
				// -------证件类型----------
				data1.userType = "免票儿童";
				data1.userauditState=that.codeType;
				data1.userauditState = data1.userauditState.substring(0,data1.userauditState.length-2);
				data1.userPhoneNum=that.user.userPhoneNum;
				console.log(that.userId)
				console.log(data1.userType)
				console.log(data1.userName)
				console.log(data1.userCodeNum)
				console.log(data1.userPhoneNum)
				console.log(data1.userauditState)
				console.log(data1.userSex)
				if(data1.userName==""||data1.userName==null){
					uni.showToast({
						title:'请输入姓名',
						icon:'none',
					})
				}else if(data1.userauditState=="请选择证件类型"){
					uni.showToast({
						title:'请选择证件类型',
						icon:'none',
					})
				}else if(data1.userCodeNum==""||data1.userCodeNum==null){
					uni.showToast({
						title:'请输入证件号',
						icon:'none',
					})
				}else if(data1.userauditState=="身份证"&&!that.checkIDCard(data1.userCodeNum)){
					uni.showToast({
						title:'输入的身份证号有误，请检查',
						icon:'none',
					})
				}else if(data1.userauditState=="出生证"&&!that.checkPass1(data1.userCodeNum)){
					uni.showToast({
						title:'输入的证件号有误，请检查',
						icon:'none',
					})
				}else if(data1.userauditState=="临时乘车编号"&&!that.checkPass2(data1.userCodeNum)){
					uni.showToast({
						title:'输入的证件号有误，请检查',
						icon:'none',
					})
				}else{
					uni.showLoading({
						title:'保存中...'
					})
					uni.request({
						url:that.$GrzxInter.Interface.changeUserInfo.value,
						data:{
							userId:that.userId, //账号id
							passengerId:'', //乘车人id   
							userType:data1.userType,   //用户类别 成人/儿童 
							userName:data1.userName,   //用户姓名   
							userSex:data1.userSex,   //用户性别   
						  	userCodeNum:data1.userCodeNum,   //用户身份证   
						  	userPhoneNum:data1.userPhoneNum,   //用户手机号   
						  	userDefault:'false',   //用户是否本人 true/false 
						  	userEmergencyContact:'false',   //是否设置为紧急联系人 true/false
							userfrontImg:'',  	//证件正面
							userbackImg:'',		//证件主页
							userauditState:data1.userauditState,  
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
										uni.setStorageSync('passengerList',passList);
										setTimeout(function(){
											uni.navigateBack();
										},500);	
									}
								})
								
							}
						},
					})
				}
			},
			//------------------选择证件类型----------------
			codeChange:function(e){
				this.code=e.detail.value;
				this.user.userCodeNum="";
				this.codeType=this.selectCode[e.detail.value]+" >";
			},
			//------------------选择陪同乘客----------------
			accompanyChange:function(e){
				this.accompanyPeople=this.accompanyList[e.detail.value]+" >";
				this.user.userPhoneNum=this.phoneList[e.detail.value];
			},
			//------------------重置信息----------------
			resetClick:function(e){
				console.log(e)
				this.user.userSex=0;
				this.user.userName="";
				this.user.userCodeNum="";
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
			checkCodeNum1:function(e){
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
			checkCodeNum2:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkPass1(e.detail.value)){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的出生证号有误，请检查',
						icon:'none'
					})
				}
			},
			checkCodeNum3:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkPass2(e.detail.value)){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的临时乘车编号有误，请检查',
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
			},
			//------------------校验出生证----------------
			checkPass1:function(e){
				var reg= /^[a-zA-Z0-9]{5,21}$/.test(e);
				return reg;
			},
			//------------------校验临时乘车编号----------------
			checkPass2:function(e){
				// var reg=/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(e);
				return true;
			},
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
		height: 225upx;
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

	.box3{	
		width: 85%;
		// height: 110upx;
		// background-color: #FFFFFF;
		margin-top: 40upx;
		margin-left: 7.47%;
		margin-bottom: 150upx;
		border-radius: 25upx;
	}
	.txtClass{
		width: 82%;
		margin-left: 9%;
		margin-right: 9%;
		margin-top:20upx ;
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
