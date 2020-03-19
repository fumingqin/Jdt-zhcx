<template>
	<view class="content">
		<view class="title" @click="returnClick">
			<image src="../../static/GRZX/btnReturn.png" class="returnClass"></image>
			<text class="textClass">常用信息设置</text>
		</view>
		<form @submit="formSubmit">
			<view class="box1">
				<view class="itemClass">
					<view class="fontStyle">姓名	</view>
					<input placeholder="与证件姓名一致" class="inputClass" :value="user.chineseName" name="chineseName" /> 
				</view>
				<view class="itemClass">
					<view class="fontStyle">性别</view>
					<radio-group class="inputClass" name="sex">
						<label v-for="(item, index) in sexMode" :key="index" @click="radioClick(index)" > 
							<radio style="transform: scale(0.7)" :value="user.sex" :checked="index===user.sex" />{{item.title}}
						</label>  
					</radio-group>
				</view>
				<view class="itemClass">
					<view class="fontStyle">手机号码</view>
					<input
						type="number"
						placeholder="请输入手机号码"
						maxlength="11"
						class="inputClass"
						:value="user.phoneNum"
						name="phoneNum"
					/>				
				</view>
			</view>
			<view class="codeClass">证件</view>
			<view class="box2">
				<view class="itemClass">
					<view class="fontStyle" style="font">身份证</view>
				</view>
				<view class="itemClass">
					<view class="fontStyle">证件号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						:value="user.codeNum"
						name="codeNum"
						type="idcard"
					/>				
				</view>
				
				<view class="itemClass">
					<view class="fontStyle">有效期至</view>
					<view class="inputClass">
						<picker mode="date" :value="user.date" :start="startDate" :end="endDate" @change="bindDateChange" name="date">
							<view>{{user.date}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="personClass">
				<view class="fontStyle">设置为本人</view>
				<view class="checkBox">
					<checkbox-group name="default" @change="checkChange">
						<label>
							<checkbox :checked="user.default" :value="user.default" />
						</label>
					</checkbox-group>
				</view>
			</view>
			<view v-if="user.show" class="emergencyClass">
				<view class="fontStyle">紧急联系人</view>
				<view class="checkBox">
					<checkbox-group name="emergencyContact">
						<label>
							<checkbox :checked="user.emergencyContact" :value="user.emergencyContact"/>
						</label>
					</checkbox-group>
				</view>
			</view>
			
			<button form-type="reset" class="btndelete" @click="resetClick">删除</button>
			<button form-type="submit" class="btnsubmit">保存</button>		
		</form>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				sexMode :[
					{title:'男'},
					{title:'女'}
				],
				user:{
					chineseName:'',	
					englishSurname:'',
					englishName:'',
					sex:0,
					phoneNum:'',
					codeNum:'',
					date:'',
					default:false,
					show:true,
					emergencyContact:false,
					date:'请选择 >',
				}
			}
		},
		onLoad (options){
			if(options.type=="edit"){
				this.loadData();
				
			}
		},
		methods:{
			async loadData(){
				var that=this;
				uni.getStorage({
					key:'editPassenger',
					success:function(res){
						console.log(res,"res")
						that.user.chineseName=res.data.name;
						/* that.user.englishSurname=res.data.englishSurname;
						that.user.englishName=res.data.englishName; */
						if(res.data.sex=="男"){
							that.user.sex=0;
						}else{
							that.user.sex=1;
						}
						that.user.codeNum=res.data.codeNum;
						//that.user.date=res.data.date;
						that.user.default=res.data.default;
						that.user.show=!res.data.default;
						that.user.emergencyContact=res.data.emergencyContact;
						that.user.phoneNum=res.data.phoneNum;
					}
				})
				/* this.user.chineseName=userInfo.data.chineseName;
				this.user.englishSurname=userInfo.data.englishSurname;
				this.user.englishName=userInfo.data.englishName;
				this.user.sex=userInfo.data.sex;
				this.user.codeNum=userInfo.data.codeNum;
				this.user.date=userInfo.data.date;
				if(userInfo.data.person==0){
					this.user.person=false;
				}else{
					this.user.person=true;
				}
				this.user.phoneNum=userInfo.data.phoneNum; */
			}, 
			radioClick:function(e){
				this.user.sex = e;
			},
			formSubmit:function(e){
				var data=e.target.value;
				data.date=this.user.date;
				data.sex=this.user.sex;
				if(data.default==null||data.default==""){
					data.default=false;
				}else{
					data.default=true;
				}
				if(this.user.show){
					if(data.emergencyContact==null||data.emergencyContact==""){
						data.emergencyContact=false;
					}else{
						data.emergencyContact=true;
					}
				}else{
					data.emergencyContact=false;
				}
				var codeNum=data.codeNum;
				var birth=codeNum.substring(6, 10) + "-" + codeNum.substring(10, 12) + "-" + codeNum.substring(12, 14);			
				var  r=birth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
				var  d=new Date(r[1],r[3]-1,r[4]);     
				if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])   
				{   
				    var Y=new  Date().getFullYear();   
				    var age=Y-r[1];
				} 
				if(age>=18){
					data.ticketType="成人";
				}else{
					data.ticketType="儿童";
				}
				//console.log(age);
				console.log(data);
			},
			bindDateChange:function(e){
				 this.user.date = e.target.value;
			},
			resetClick:function(e){
				this.user.date="请选择 >";
			},
			checkChange:function(e){
				if(e.detail.value=="false"){ //选中
					this.user.show=false;
				}else{	//未选中
					this.user.show=true;
				}
			},
			returnClick(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F8FC;
	}
	.content {
		position: relative;
		width: 100%;
	}
	.title{
		width: 40%;
		height: 44upx;
		position: absolute;
		left: 3.47%;
		top: 95upx;
	}
	.returnClass{
		width: 22upx;
		height: 40upx;
		position: absolute;
		top: 5upx;
	}
	.textClass{
		color: #333333;
		font-size: 38upx;
		height: 44upx;
		line-height: 44upx;
		position: absolute;
		left: 36upx;
		top: 1upx;
	}
	
	.box1{
		display: flex;
		flex-direction: column;
		width: 93.07%;
		height: 330upx;
		position: absolute;
		left: 3.47%;
		top:170upx;
		background-color: #FFFFFF;
		border-radius: 25upx;
	}
	.box2{
		display: flex;
		flex-direction: column;
		width: 93.07%;
		height: 330upx;
		position: absolute;
		left: 3.47%;
		top:603upx;
		background-color: #FFFFFF;
		border-radius: 25upx;
	}
	.itemClass{  //
		width: 618upx;
		height: 110upx;
		margin-left: 40upx;
		margin-top: 0upx;
		
	}
	.codeClass{  //证件
		position: absolute;
		left: 3.33%;
		top:530upx;
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
		left: 6%;
		line-height: 108upx;
	}

	.personClass{
		width: 93.07%;
		height: 110upx;
		background-color: #FFFFFF;
		position: absolute;
		//top:1068upx;
		top:957upx;
		left:3.47%;
		margin-bottom: 150upx;
		border-radius: 25upx;
	}
	.emergencyClass{
		width: 93.07%;
		height: 110upx;
		background-color: #FFFFFF;
		position: absolute;
		left:3.47%;
		//top:1176upx;
		top:1090upx;
		margin-bottom: 150upx;
		border-radius: 25upx;
	}
	.btndelete{
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
	.btnsubmit{
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
		right: 6%;
		line-height: 108upx;
		text-align: right;
	}
	.checkBox{
		line-height: 108upx;
		position: absolute;
		right: 6%;
	}
</style>
