<template>
	<view class="content">
		<!-- 姓名 -->
		<view class="boxClass">
			<text class="fontClass">姓名</text>
			<input class="inputClass" name="name" placeholder="与证件姓名一致" v-model="name" @blur="nameBlur" />
		</view>
		
		<!-- 身份证号 -->
		<view class="boxClass">
			<text class="fontClass">身份证号</text>
			<input class="inputClass" type="idcard" maxlength="18" name="codeNum" placeholder="请保持与证件号码一致" v-model="codeNum" @blur="codeBlur" />
		</view>
		
		<!-- 有效期至 -->
		<view class="boxClass">
			<text class="fontClass">有效期至</text>
			<picker class="inputClass" name="validityTerm"  mode="date" @change="dateChange" v-model="validityTerm"  :start="startDate" :end="endDate" placeholder="请选择"  >
				{{validityTerm}}
			</picker>
		</view>
		
		<!-- 上传身份证正面 -->
		<view class="boxClass heightClass" @click="chooseFrontImg">
			<view v-if="state1==0" class="flexDirection">
				<image src="../../../static/GRZX/addImg.png" class="addClass"></image>
				<text class="textClass">点击上传证件的正面(带头像)</text>
			</view>
			<view v-if="state1==1" style="width: 100%;height: 100%;">
				<image :src="front" style="width: 100%;height: 100%;" name="front" mode="aspectFit"></image>
			</view>
		</view>
		
		<!-- 上传身份证背面 -->
		<view class="boxClass heightClass mb" @click="chooseBackImg">
			<view v-if="state2==0" class="flexDirection">
				<image src="../../../static/GRZX/addImg.png" class="addClass"></image>
				<text class="textClass">点击上传证件的背面(带国徽)</text>
			</view>
			<view v-if="state2==1" style="width: 100%;height: 100%;">
				<image :src="back" style="width: 100%;height: 100%;" name="back" mode="aspectFit"></image>
			</view>
		</view>
		
		<!-- 提交按钮 -->
		<view class="bottomClass">
			<button type="warn" class="btnClass" @click="submitClick">提交</button>
		</view>
		
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	export default {
		data(){	
			return{			
				name:'',
				codeNum:'',
				validityTerm:'请选择 >',
				frontImg:'',
				backImg:'',
				state1:0,
				state2:0,
				front:'',
				back:'',
				userInfo:[],
			}	
		},
		onLoad (){
			this.loadUserInfo();
		},
		computed:{
			startDate() {
			    return this.getDate('start');
			}, 
			endDate() {
			    return this.getDate('end');
			},
		},
		methods:{
			//--------------------加载用户信息-------------------
			loadUserInfo:function(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success(res) {
						that.userInfo=res.data;	
					},
					fail() {
						uni.showToast({
							title:'请先登录',
							icon:'none'
						})
					}
				})
			},
			//--------------------校验姓名-------------------
			nameBlur:function(e){
				if(e.detail.value==""){
					console.log("空的")
				}else if(e.detail.value.length>=2){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的姓名不能少于2位',
						icon:'none'
					})
				}
			},
			//--------------------校验身份证号-------------------
			codeBlur:function(e){
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
			},
			//--------------------提交数据-------------------
			submitClick:function(){
				console.log(this.name)
				console.log(this.codeNum)
				console.log(this.validityTerm)
			},
			//--------------------有效期-------------------
			dateChange : function(e){
				this.validityTerm = e.detail.value;
			},
			//--------------------获得日期-------------------
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 10;
				} else if (type === 'end') {
					year = year + 60;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//--------------------上传身份证正面-------------------
			chooseFrontImg:function(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						var size=1.5*1024*1000;
						if(res.tempFiles[0].size>size){
							uni.showToast({
								title:'图片大小建议不要超过 1.5M',
								icon:'none',
							})
						}
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							 that.state1=1;
							 that.front=res1.savedFilePath;
							 console.log(that.front)
							 pathToBase64(res1.savedFilePath)
							 .then(base64 => {
								 that.frontImg=base64;
							 })
						  }
						}); 
					}
				})	
			},
			//--------------------上传身份证背面-------------------
			chooseBackImg:function(){
				var that=this;
				uni.chooseImage({
					count:1,
					//sourceType:['album'],
					success(res) {
						var size=1.5*1024*1000;
						if(res.tempFiles[0].size>size){
							uni.showToast({
								title:'图片大小建议不要超过 1.5M',
								icon:'none',
							})
						}
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
						  success: function (res1) {
							 that.state2=1;
							 that.back=res1.savedFilePath;
							 console.log(that.back)
							 pathToBase64(res1.savedFilePath)
							 .then(base64 => {
								 that.backImg=base64;
							 })
						  }
						}); 
					}
				})
			},
		}	
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8; //页面背景色
	}
	.content { 
		width: 100%;
		display: flex;
		flex-direction: column;//column：纵向排列 row：横向排列
	}
	//每行的样式
	.boxClass{
		width: 90%;
		margin-top: 20upx;
		margin-left: 5%;
		background-color: #FFFFFF;
		border-radius: 20upx;
		display: flex;
		flex-direction: row;//column：纵向排列 row：横向排列
	}
	.flexDirection{
		width: 100%;
		display: flex;
		flex-direction: column;//column：纵向排列 row：横向排列
	}
	//姓名，身份证号，有效期
	.fontClass{
		color: #2C2D2D;
		font-size: 30upx;
		padding: 35upx 2% 35upx 5%;
		width: 30%;
	}
	//输入框的样式
	.inputClass{
		width: 70%;
		font-size: 32upx;
		padding: 35upx 5% 35upx 5%;
		text-align: right;
	}
	//上传照片的高度
	.heightClass{
		height: 400upx;
	}
	//添加图片
	.addClass{	
		width: 150upx;
		height: 150upx;
		margin-left: 40%;
		margin-top: 90upx;
	}
	.textClass{
		font-size: 32upx;
		margin-top: 25upx;
		color:#cdcdcd;
		width: 100%;
		text-align: center;
	}
	//距离底部的高度
	.mb{
		margin-bottom: 150upx;
	}
	.bottomClass{
		background-color: #F8F8F8;
		width: 100%;
		position: fixed;
		bottom: 0upx;
		height: 120upx;
	}
	//按钮的样式	
	.btnClass{
		width: 90%;
		position: absolute;
		top: 10upx;
		left: 5%;
	}
</style>
