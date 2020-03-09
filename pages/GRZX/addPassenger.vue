<template>
	<view>
		<form @submit="formSubmit">
			
			<view class="nameClass">姓名</view>
			<view class="chineseClass">
				<view class="fontStyle">中文姓名	</view>
				<input placeholder="与证件姓名一致" class="inputClass" :value="user.chineseName" name="chineseName" /> 
			</view>
			
			<view class="englishClass1">
				<view class="fontStyle">英文姓</view>
				<input placeholder="如王小明填写为'WANG'" class="inputClass" :value="user.englishSurname" name="englishSurname" /> 
			</view>
			
			<view class="englishClass2">
				<view class="fontStyle">英文名</view>
				<input placeholder="如王小明填写为'XIAOMING'" class="inputClass" :value="user.englishName" name="englishName" />
			</view>
			
			<view class="sexClass">
				<view class="fontStyle">性别</view>
				<radio-group class="inputClass" name="trip">
					<label v-for="(item, index) in sexMode" :key="index" @click="radioClick(index)" > 
						<radio style="transform: scale(0.7)" :value="user.sex" :checked="index===user.sex" />{{item.title}}
					</label>  
				</radio-group>
			</view>
			
			<view class="phoneClass">
				<view class="fontStyle">手机号码</view>
				<input
					type="number"
					placeholder="手机号码"
					maxlength="11"
					class="inputClass"
					:value="user.phoneNum"
					name="phoneNum"
				/> 				
			</view>
			
			<view class="codeClass">证件</view>
			<view class="codeType">
				<view class="fontStyle" style="font">身份证</view>
			</view>
			<view class="codeNumClass">
				<view class="fontStyle">证件号码</view>
				<input
					placeholder="请保持与证件号码一致"
					class="inputClass"
					:value="user.codeNum"
					name="codeNum"
					type="idcard"
				/>				
			</view>
			
			<view class="termClass">
				<view class="fontStyle">有效期至</view>
				<view class="inputClass">
					<picker mode="date" :value="user.date" :start="startDate" :end="endDate" @change="bindDateChange" name="date">
						<view>{{user.date}}</view>
					</picker>
				</view>
			</view>
			
			<view class="personClass">
				<view class="fontStyle">设置为本人</view>
				<view class="checkBox">
					<checkbox-group name="person">
						<label>
							<checkbox :checked="user.person" :value="user.person"/>
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
					sex:1,
					phoneNum:'',
					codeNum:'',
					date:'',
					person:true,
					date:'请选择 >',
				}
			}
		},
		onLoad (){
			this.loadData();
		},
		methods:{
			async loadData(){
				let userInfo = await this.$api.grzx('user');
				console.log(userInfo)
				this.user.chineseName=userInfo.data.chineseName;
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
				this.user.phoneNum=userInfo.data.phoneNum;
			},
			radioClick:function(e){
				this.user.sex = e;
			},
			formSubmit:function(e){
				var data=e.target.value;
				if(data.person.length==0){
					data.person=0;
				}else{
					data.person=1;
				}
				data.date=this.user.date;
				data.sex=this.user.sex;
				console.log(data)
			},
			bindDateChange:function(e){
				 this.user.date = e.target.value;
			},
			resetClick:function(e){
				this.user.date="请选择 >";
			},
			personClick:function(e){
				
			},
			changePerson:function(e){
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.content {
		width: 100%;
		position: relative;
	}
	.nameClass{
		position: absolute;
		left: 6%;
		top: 20upx;
		font-size:28upx;
		font-family:Source Han Sans SC;
		font-weight:400;
		color:rgba(170,170,170,1);
	}
	.codeClass{
		position: absolute;
		left: 6%;
		top: 644upx;
		font-size:28upx;
		font-family:Source Han Sans SC;
		font-weight:400;
		color:rgba(170,170,170,1);
	}
	.chineseClass{ //定位
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;
		position: absolute;
		top:80upx;
	}
	.englishClass1{
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;
		position: absolute;
		top:188upx;
		border-top: 1upx solid #F5F5F5;
	}
	.englishClass2{
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;
		position: absolute;
		top:296upx;
		border-top: 1upx solid #F5F5F5;
	}
	.sexClass{
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;
		position: absolute;
		top:404upx;
		border-top: 1upx solid #F5F5F5;
	}
	.phoneClass{
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;
		position: absolute;
		top:512upx;
		border-top: 1upx solid #F5F5F5;
	}
	.fontStyle{   //文字样式
		color: #424242;
		font-size: 32upx;
		position: absolute;
		left: 6%;
		line-height: 108upx;
	}
	.codeType{
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;
		position: absolute;
		top:703upx;
	}
	.codeNumClass{
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;
		position: absolute;
		top:811upx;
		border-top: 1upx solid #DDDDDD;
	}
	.termClass{
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;
		position: absolute;
		top:919upx;
		border-top: 1upx solid #F5F5F5;
	}
	.personClass{
		width: 100%;
		height: 108upx;
		background-color: #FFFFFF;
		position: absolute;
		top:1068upx;
		margin-bottom: 150upx;
	}
	.btndelete{
		width: 40%;
		height: 108upx;
		background-color: #FFFFFF;
		color: #F75674;
		margin-bottom: 0upx;
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
		background-color: #46A5FE;
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
	.imageClass{
		width: 50%;
		height: 108upx;
		border: 1px solid red;
	}
	.checkBox{
		line-height: 108upx;
		position: absolute;
		right: 6%;
	}
</style>
