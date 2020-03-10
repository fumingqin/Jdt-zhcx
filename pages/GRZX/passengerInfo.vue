<template>
	<view class="content">	
		<view class="passengerList">
			<view class="boxClass" v-if="submitType == 1 || submitType == 2" v-for="(item, index) in passengerList" :key="index" @click="choosePassenger(item)">  <!--非个人中心页面进入 -->
				<view class="nameClass">{{item.name}}</view>
				<view class="sexClass" name="sex">{{item.sex}}</view>
				<view class="typeClass">{{item.ticketType}}</view>
				<view class="codeClass fontStyle">身份证</view>
				<view class="codeNumClass fontStyle">{{item.codeNum}}</view>
				<view class="phoneClass fontStyle">联系电话</view>
				<view class="phoneNumClass fontStyle">{{item.phoneNum}}</view>
				<view>
					<image v-if="item.hiddenIndex == 1"  class="checkClass" src="../../static/GRZX/checked.png"></image>
				</view>
			</view>
			<view class="boxClass" v-if="submitType == 0" v-for="(item, index) in passengerList" :key="index" @click="editPassenger(item)">  <!--个人中心页面进入 -->
				<view class="nameClass">{{item.name}}</view>
				<view class="sexClass">{{item.sex}}</view>
				<view class="typeClass">{{item.ticketType}}</view>
				<view class="codeClass fontStyle">身份证</view>
				<view class="codeNumClass fontStyle">{{item.codeNum}}</view>
				<view class="phoneClass fontStyle">联系电话</view>
				<view class="phoneNumClass fontStyle">{{item.phoneNum}}</view>
				<image src="../../static/GRZX/btnRight.png" class="btnRight"></image>
			</view>
		</view>	
		<view v-if="submitType == 1 || submitType == 2" class="btnBox">  <!--非个人中心页面进入 -->
			<button type="warn" @click="addPassenger" class="btnAdd1">+添加乘客</button>
			<button type="primary" @click="definite" class="btnDefinite">确定</button>
		</view>
		<view v-if="submitType == 0" class="btnBox">  <!--个人中心页面进入-->
			<button type="warn" @click="addPassenger" class="btnAdd2">+添加乘客</button>
		</view>	
		<view class="returnBox" @click="returnPages">
			<image class="returnClass" src="../../static/GRZX/btnReturn.png"></image>
			<view class="titleClass">返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				passengerList:[{
					name:'张小娴',
					sex:'女',
					ticketType:'成人票',
					codeNum:'3505***********645',
					phoneNum:'136*****645',
					hiddenIndex:0,
				},{
					name:'黄小新1',
					sex:'男',
					ticketType:'儿童票',
					codeNum:'3505***********645',
					phoneNum:'136*****645',
					hiddenIndex:0,
				},{
					name:'黄小新2',
					sex:'男',
					ticketType:'儿童票',
					codeNum:'3505***********645',
					phoneNum:'136*****645',
					hiddenIndex:0,
				},{
					name:'黄小新3',
					sex:'男',
					ticketType:'儿童票',
					codeNum:'3505***********645',
					phoneNum:'136*****645',
					hiddenIndex:0,
				},{
					name:'黄小新4',
					sex:'男',
					ticketType:'儿童票',
					codeNum:'3505***********645',
					phoneNum:'136*****645',
					hiddenIndex:0,
				},{
					name:'黄小新5',
					sex:'男',
					ticketType:'儿童票',
					codeNum:'3505***********645',
					phoneNum:'136*****645',
					hiddenIndex:0,
				}
				],
				submitType:'',
			}
		},
		onLoad(options){
			this.getType(options.submitType);
		},
		methods:{
			async getType(e){
				this.submitType=e;
			},
			addPassenger(){
				uni.navigateTo({
					url:'/pages/GRZX/addPassenger'
				})
			},
			returnPages(){
				uni.navigateBack();
			},
			editPassenger(){   //编辑乘车人信息
				
			},
			choosePassenger(e){  //选择乘车人				
				var list=this.passengerList;
				var count=0;
				for(var i=0;i<list.length;i++){
					if(list[i].hiddenIndex==1){
						count++;
					}
				}
				 if(e.hiddenIndex==1){
					e.hiddenIndex=0;
				}else if(count>3 && this.submitType==1){
					uni.showToast({
					    title: '乘客最多只能添加4名',
					    icon:"none"
					});
				}else{
					e.hiddenIndex=1;
				}
			},
			definite(){ //提交array
				var data=this.passengerList;
				var array=[];
				for(var i=0;i<data.length;i++){
					if(data[i].hiddenIndex==1){
						array.push(data[i]);
					}
				}
				if(array.length==0){
					uni.showToast({
					    title: '请选择乘客',
					    icon:"none"
					});
				}else{
					uni.setStorage({
						key:"passengerList",
						data:array
					})
					uni.navigateBack();	
				}
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F8FC;
	}
	.content {
		width: 100%;
	}
	.checkClass{	//勾选
		position: absolute;
		left: 89.26%;
		top:90upx;
		width: 6.45%;
		height:46upx ;
	}
	.returnClass{ //返回按钮
		width: 18upx;
		height: 40upx;
		margin-top: 103upx;
		margin-left: 3.47%;
	}
	.btnRight{ //进入编辑的箭头
		width:60upx;
		height: 60upx; 
		position: absolute;
		left: 90%;
		top:80upx;
	}
	.titleClass{
		margin-left: 20upx;
		font-size: 38upx;
		/*font-weight: bold; */
		margin-top: 97upx;
	}
	.passengerList{ //列表样式
		width: 100%;
		margin-top: 180upx;
		margin-bottom: 160upx;
	}
	.btnAdd1{
		border-radius: 12upx;
		width: 45%;
		height: 90upx;
		margin-top: 30upx;
	}
	.btnDefinite{
		border-radius: 12upx;
		width: 45%;
		height: 90upx;
		margin-top: 30upx;
	}
	.btnAdd2{ //添加按钮
		width: 92%;
		height: 90upx;
		border-radius: 12upx;
		background-color: #FC4646;
		margin-top: 30upx;
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
		border-radius:20upx ;
	}
	.nameClass{
		font-size: 36upx;
		color: #2C2D2D;
		position: absolute;
		left: 4%;
		top:20upx;
		font-weight: bold;
	}
	.sexClass{
		position: absolute;
		left: 25%;
		top:37upx;
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
		top:37upx;
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
	.returnBox{
		width: 100%;
		height: 160upx;
		position: fixed;
		top: 0upx;
		display: flex;
		flex-direction: row;
		background-color: #F6F8FC;
		z-index: 9999;
	}
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
</style>
