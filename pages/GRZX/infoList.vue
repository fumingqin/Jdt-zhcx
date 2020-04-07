<template>
	<view>	
		<!-- 常用乘车人 -->
		<view v-if="type==1 && state==1" class="mt">
			<view class="boxClass" v-for="(item, index) in passengerList" :key="index" @click="editPassenger(item)">  <!--个人中心页面进入 -->
				<view class="nameClass">{{item.userName}}</view>
				<view class="sexClass">{{item.userSex}}</view>
				<view class="typeClass">{{item.userType}}</view>
				<view class="codeClass fontStyle">身份证</view>
				<view class="codeNumClass fontStyle">{{item.userCodeNum}}</view>
				<view class="phoneClass fontStyle">联系电话</view>
				<view class="phoneNumClass fontStyle">{{item.userPhoneNum}}</view>
				<view class="redBox">
					<text v-if="item.userDefault=='true'" class="fontClass" style="width: 80upx;">本人</text>
					<text v-if="item.userEmergencyContact=='true'" class="fontClass" style="width: 80upx;">联系人</text>
					<text v-if="item.auditState==1" class="fontClass" style="width: 80upx;">待审核</text>
					<text v-if="item.auditState==2" class="fontClass" style="width: 100upx;">审核通过</text>
					<text v-if="item.auditState==3" class="fontClass" style="width: 120upx;">审核未通过</text>	
				</view>
				<view class="btnRight">
					<image src="../../static/GRZX/btnRight.png" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
		</view>
		<view v-if="type==1 && state==1" class="btnBox">
			<button type="warn" @click="addPassenger" class="btnAdd">+添加乘客</button>
		</view>	
		
		<view v-if="type==1 && state==2" class="mt">
			<view class="boxClass" v-for="(item, index) in passengerList" :key="index" @click="selete(item)">  <!--个人中心页面进入 -->
				<view class="nameClass">{{item.userName}}</view>
				<view class="sexClass">{{item.userSex}}</view>
				<view class="typeClass">{{item.userType}}</view>
				<view class="codeClass fontStyle">身份证</view>
				<view class="codeNumClass fontStyle">{{item.userCodeNum}}</view>
				<view class="phoneClass fontStyle">联系电话</view>
				<view class="phoneNumClass fontStyle">{{item.userPhoneNum}}</view>
				<view class="redBox">
					<text v-if="item.userDefault=='true'" class="fontClass" style="width: 80upx;">本人</text>
					<text v-if="item.userEmergencyContact=='true'" class="fontClass" style="width: 80upx;">联系人</text>
					<text v-if="item.auditState==1" class="fontClass" style="width: 80upx;">待审核</text>
					<text v-if="item.auditState==2" class="fontClass" style="width: 100upx;">审核通过</text>
					<text v-if="item.auditState==3" class="fontClass" style="width: 120upx;">审核未通过</text>	
				</view>
				<view v-if="item.hiddenIndex==0" class="btnCheck"> 
					<image src="../../static/GRZX/btnUncheck.png" style="width: 100%;height: 100%;"></image>
				</view>
				<view v-if="item.hiddenIndex==1" class="btnCheck"> 
					<image src="../../static/GRZX/btnCheck.png" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
		</view>
		<view v-if="type==1 && state==2" class="btnBox">
			<button type="warn" @click="deletePassenger" class="btnAdd">删除</button>
		</view>
		
		<!-- <view v-if="type==1" class="navClass" >
			<view class="passengerClass1" @click="passengerClick">
				<text class="textClass">常用出行人</text>
				<view class="lineClass"></view>
			</view>
			<view class="addressClass1" @click="addressClick"><text class="textClass">常用地址</text></view>
		</view> -->
		
		<!-- 常用地址 -->
		
		<view v-if="type==2 && state==1" class="m-l">
			<view class="boxClass1" v-for="(item, index) in addressList" :key="index" @click="editAddress(item)">  <!--非个人中心页面进入 -->
				<view class="nameClass1">{{item.receiver}}</view>
				<view class="postalCodeClass">{{item.postalCode}}</view>
				<view class="fontStyle1" style="top:101upx;">手机号码：{{item.phoneNum}}</view>
				<view class="fontStyle1" style="top:158upx;">所在地区：{{item.district}}</view>
				<view class="fontStyle1" style="top:216upx;">详细地址：{{item.detailAddress}}</view>
				<view class="editClass">
					<image src="../../static/GRZX/btnRight.png" class="btnRight1"></image>
				</view>
				
				<view v-if="item.default">
					<image src="../../static/GRZX/defaultAddress.png" class="defaultClass"></image>
				</view>
			</view>
		</view>	
		<view v-if="type==2 && state==1" class="btnBox"> 
			<button type="warn" @click="addAddress" class="btnAdd">+添加邮寄地址</button>
		</view>	
		
		<view v-if="type==2 && state==2" class="m-l">
			<view class="boxClass1" v-for="(item, index) in addressList" :key="index" @click="selete(item)">  <!--非个人中心页面进入 -->
				<view class="nameClass1">{{item.receiver}}</view>
				<view class="postalCodeClass">{{item.postalCode}}</view>
				<view class="fontStyle1" style="top:101upx;">手机号码：{{item.phoneNum}}</view>
				<view class="fontStyle1" style="top:158upx;">所在地区：{{item.district}}</view>
				<view class="fontStyle1" style="top:216upx;">详细地址：{{item.detailAddress}}</view>
				<view v-if="item.hiddenIndex==0" class="btnCheck1">
					<image src="../../static/GRZX/btnUncheck.png" style="width: 100%;height: 100%;"></image>
				</view>
				<view v-if="item.hiddenIndex==1" class="btnCheck1"> 
					<image src="../../static/GRZX/btnCheck.png" style="width: 100%;height: 100%;"></image>
				</view>
				
				<view v-if="item.default">
					<image src="../../static/GRZX/defaultAddress.png" class="defaultClass"></image>
				</view>
			</view>
		</view>	
		<view v-if="type==2 && state==2" class="btnBox">
			<button type="warn" @click="deleteAddress" class="btnAdd">删除</button>
		</view>
		<view v-if="type==2" class="navClass" >
			<view class="passengerClass2" @click="passengerClick"><text class="textClass">常用出行人</text></view>
			<view class="addressClass2" @click="addressClick">
				<text class="textClass">常用地址</text>
				<view class="lineClass"></view>
			</view>
		</view>
		<view class="topClass">
			<text class="titleClass">常用信息设置</text>
			<image src="../../static/GRZX/btnReturn.png" class="returnClass" @click="returnClick"></image>
			<view v-if="state==1" class="dfClass" @click="deleteClick">管理</view>
			<view v-if="state==2" class="dfClass" @click="finishClick">完成</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				type:'1',
				state:'1', //1管理， 2完成
				passengerList:[],
				addressList:[],
				unid:'',
			}
	    },
		onLoad(){
			
		},
		onShow(){
			this.loadData();
		},
	    methods: {	
			async loadData(){
				var array=[];
				uni.getStorage({
					key:'userInfo',
					success(res){
						uni.request({
							url:'http://218.67.107.93:9210/api/app/userInfoList?id='+res.data.unid,
							method:'POST',
							success(res1) {
								console.log(res1,'111')
								for(var i=0;i<res1.data.data.length;i++){
									res1.data.data[i].hiddenIndex=0;
									array.push(res1.data.data[i]);
								}
							}
						})
					}
				})
				
				var address=[];
				uni.getStorage({
					key:'addressList',
					success(res1) {
						console.log(res1)
						for(var i=0;i<res1.data.length;i++){
							address.push(res1.data[i]);
						}
					}
				})
				this.passengerList=array;
				this.addressList=address;
			},
			//乘车人管理
			passengerClick(){
				this.type=1;
			},
			addressClick(){
				this.type=2;
			},
	        editPassenger(e){   //编辑乘车人信息
	        	uni.setStorage({
	        		key:'editPassenger',
	        		data:e
	        	})
	        	uni.navigateTo({
	        		url:'/pages/GRZX/addPassenger?type=edit'
	        	})
	        },
			addPassenger(){
				uni.navigateTo({
					url:'/pages/GRZX/addPassenger?type=add'
				})
			},
			//地址管理
			addAddress(){
				uni.redirectTo({
					url:'/pages/GRZX/addAddress?type=add'
				})
			},
			chooseAddress(e){
				// uni.setStorage({
				// 	key:'chooseAddress',
				// 	data:e
				// })
				console.log(2222)
			},
			editAddress(e){   //
			//console.log(3333)
				uni.setStorage({
					key:'editAddress',
					data:e
				})
				uni.redirectTo({
					url:'/pages/GRZX/addAddress?type=edit'
				})
			},
			deletePassenger(){ //删除乘车人信息
				var data=this.passengerList;
				var deleteList=[];
				for(var i=0;i<data.length;i++){
					if(data[i].hiddenIndex==1){
						deleteList.push(data[i]);
					}
				}
				console.log(deleteList,"deleteList")
				if(deleteList.length==0){
					uni.showToast({
						title: '请选择',
						icon:"none"
					})
				}else{
					console.log(deleteList.length,"111")
					for(var j=0;j<deleteList.length;j++){
						uni.request({
							url:'http://218.67.107.93:9210/api/app/deleteUserInfo?userId='+deleteList[j].userID,
							method:'POST',
							success(res) {
								console.log(res,"res")
							}
						})
					}
					
					this.state=1;
					uni.redirectTo({
						url:'/pages/GRZX/infoList'
					})
				}
				
				
			},
			deleteAddress(){
				var data=this.addressList;
				var array=[];
				for(var i=0;i<data.length;i++){
					if(data[i].hiddenIndex==0){
						array.push(data[i]);
					}
				}
				if(array.length==0){
					uni.showToast({
						title: '请选择',
						icon:"none"
					})
				}else{
					uni.setStorage({
						key:"addressList",
						data:array
					})	
				}
				this.state=1;
				uni.redirectTo({
					url:'/pages/GRZX/infoList'
				})
			},
			selete(e){
				if(e.hiddenIndex==0){
					e.hiddenIndex=1;
				}else{
					e.hiddenIndex=0;
				}
			},
			returnClick(){
				uni.switchTab({
					url:'/pages/GRZX/user'
				})
			},
			deleteClick(){
				this.state=2;
			},
			finishClick(){
				this.state=1;
			},
			checkClick(){
				this.checkState=1;
			},
			uncheckClick(){
				this.checkState=0;
			},
	    }
	};
</script>

<style lang="scss">
	page{
		background-color: #F6F8FC;
	}
	//导航栏
	.navClass{
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		position: fixed;
		top:170upx;
		display: flex;
	}
	.textClass{
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		font-size:32upx ;
	}
	.passengerClass1{
		color: #ff0000;
		width: 50%;
		text-align: center;
	}
	.passengerClass2{
		color: #AAAAAA;
		width: 50%;
		text-align: center;
	}
	.addressClass1{
		color: #AAAAAA;
		width: 50%;
		text-align: center;
	}
	.addressClass2{
		color: #ff0000;
		width: 50%;
		text-align: center;
	}
	.lineClass{
		height: 5upx;
		width: 100%;
		background-color: #ff0000;
	}
	//乘车人管理
	.mt{
		width: 100%;
		//margin-top: 292upx;
		margin-top: 185upx;
		margin-bottom: 160upx;
	}
	.boxClass{
		background-color: #FFFFFF;
		width: 94%;
		margin-top: 20upx;
		margin-left: 3%;
		height: 230upx;
		font-size:28upx;
		color: #666666;
		position: relative;
		border-radius:20upx;
		// display: flex;
	}
	.nameClass{
		font-size: 36upx;
		color: #2C2D2D;
		position: absolute;
		left: 4%;
		top:30upx;
		font-weight: bold;
	}
	.sexClass{
		position: absolute;
		left: 25%;
		top:47upx;
		font-size: 24upx;
		color: #2C2D2D;
	}
	.fontStyle{
		color: #666666;
		font-size: 27upx;
	}
	.typeClass{
		font-size: 24upx;
		color: #2C2D2D;
		position: absolute;
		left: 33%;
		top:47upx;
	}
	.codeClass{
		position: absolute;
		left: 4%;
		top:108upx;
	}
	.codeNumClass{
		position: absolute;
		left: 25%;
		top:108upx;
	}
	.phoneClass{
		position: absolute;
		left: 4%;
		top:163upx;
	}
	.phoneNumClass{
		position: absolute;
		left: 25%;
		top:163upx;
	}
	.redBox{
		position: absolute;
		left:40%;
		top: 34upx;
		display: flex;
	}
	.fontClass{ //本人,紧急联系人,待审核,审核通过,审核未通过
		height: 40upx;
		line-height: 40upx;
		font-size: 24upx;
		color: #ff0000;
		margin-left: 20upx;
		border: 1upx solid #ff0000;
		border-radius: 10upx;
		text-align: center;
	}
	.btnRight{ //进入编辑的箭头
		width:60upx;
		height: 60upx; 
		position: absolute;
		left: 90%;
		top:80upx;
	}
	//通用
	.btnBox{ //按钮位置样式
		position: fixed;
		display: flex;
		flex-direction: row;
		bottom: 0upx;
		width: 100%;
		height: 158upx;
		background-color: #F6F8FC;
		/* border: 1px solid #4CD964; */
	}
	.btnAdd{ //添加按钮（乘车人）（地址）
		width: 92%;
		height: 90upx;
		line-height: 90upx;
		border-radius: 12upx;
		background-color: #FC4646;
		margin-top: 30upx;
	}
	
	//地址管理
	.m-l{ //列表样式
		width: 100%;
		margin-top: 292upx;
		margin-bottom: 160upx;
	}
	.btnRight1{ //进入编辑的箭头
		width:60upx;
		height: 60upx; 
		position: absolute;
		left: 45%;
		top:116upx;
	}
	.nameClass1{
		font-size: 34upx;
		color: #424242;
		position: absolute;
		left: 5.56%;
		top:30upx;
		font-weight: bold;
	}
	.fontStyle1{
		position: absolute;
		left: 5.56%;
		font-size:26upx;
		color: #888888;
	}
	.postalCodeClass{
		position: absolute;
		left: 24.93%;
		top:40upx;
		color: #888888;
		font-size: 26upx;
	}
	.btnBox{ //按钮位置样式
		position: fixed;
		display: flex;
		flex-direction: row;
		bottom: 0upx;
		width: 100%;
		height: 158upx;
		background-color: #F6F8FC;
	}
	.defaultClass{
		position: absolute;
		right: 0upx;
		top:0upx;
		width: 90upx;
		height: 90upx;
	}
	.editClass{
		position: absolute;
		left: 80%;
		height: 282upx;
		width: 20%;
		/* background-color: #007AFF; */
	}
	.boxClass1{
		background-color: #FFFFFF;
		width: 94%;
		margin-top: 20upx;
		margin-left: 3%;
		height: 282upx;
		font-size:28upx;
		color: #666666;
		position: relative;
		border-radius:20upx ;
	}
	.topClass{   //顶部
		position: fixed;
		top: 0upx;
		width: 100%;
		height: 170upx;
		border-bottom: 1upx solid #F5F5F5;
		background-color: #FFFFFF;
	}
	.returnClass{
		width: 25upx;
		height: 40upx;
		position: absolute;
		top: 100upx;
		left: 25upx;
	}
	.titleClass{  //常用信息设置
		position: absolute;
		top: 90upx;
		width: 100%;
		text-align: center;
		color: #232323;
		font-size: 38upx;
	}
	.dfClass{	//管理和完成
		position: absolute;
		top: 90upx;
		left: 85%;
		color: #232323;
		font-size: 38upx;
	} 
	.btnCheck{
		width:50upx;
		height: 50upx; 
		position: absolute;
		left: 88%;
		top:80upx;
	}
	.btnCheck1{
		width:50upx;
		height: 50upx; 
		position: absolute;
		left: 88%;
		top:115upx;
	}
</style>
