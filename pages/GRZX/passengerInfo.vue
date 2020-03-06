<template>
	<view class="content">	
	<view class="returnBox" @click="returnPages">
		<image class="returnClass" src="../../static/GRZX/btnReturn.png"></image>
		<view class="titleClass">乘车人</view>
	</view>
		<view class="passengerList">
			<view class="boxClass">
				<view class="nameClass">{{name}}</view>
				<view class="sexClass">{{sex}}</view>
				<view class="typeClass">{{ticketType}}</view>
				<view class="codeClass fontStyle">身份证</view>
				<view class="codeNumClass fontStyle">{{codeNum}}</view>
				<view class="phoneClass fontStyle">联系电话</view>
				<view class="phoneNumClass fontStyle">{{phoneNum}}</view>
			</view>
			<view class="boxClass">
				<view class="nameClass">黄小新</view>
				<view class="sexClass">{{sex}}</view>
				<view class="typeClass">儿童票</view>
				 <view class="codeClass fontStyle">身份证</view>
				<view class="codeNumClass fontStyle">{{codeNum}}</view>
				<view class="phoneClass fontStyle">联系电话</view>
				<view class="phoneNumClass fontStyle">{{phoneNum}}</view>
			</view>
		</view>
		
		<!--<view class="boxClass">
			<view class="nameClass">黄小新</view>
			<view class="typeClass">儿童票</view>
			 <view class="codeClass fontStyle">身份证</view>
			<view class="codeNumClass fontStyle">{{codeNum}}</view>
			<view class="phoneClass fontStyle">联系电话</view>
			<view class="phoneNumClass fontStyle">{{phoneNum}}</view>
		</view> -->
		<view v-if="1==2" class="btnBox">
			<button type="warn" @click="addPassenger" class="btnAdd1">+添加乘客</button>
			<button type="primary" @click="definite" class="btnDefinite">确定</button>
		</view>
		<view v-if="1==1" class="btnBox">
			<button type="warn" @click="addPassenger" class="btnAdd2">+添加乘客</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				name:'张小娴',
				sex:'女',
				ticketType:'成人票',
				codeNum:'3505***********645',
				phoneNum:'136*****645',
				submitType:''
			}
		},
		onLoad(options){
			var submitType=options.submitType;
			this.getType();
		},
		methods:{
			addPassenger(){
				uni.navigateTo({
					url:'/pages/GRZX/addPassenger'
				})
			},
			getType(){
				this.submitType=submitType;
			},
			returnPages(){
				console.log("666")
				uni.navigateBack();
			}
			/* addAddress(){
				uni.navigateTo({
					url:'/pages/GRZX/addAddress'
				})
			} */
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
	.returnBox{
		width: 25%;
		height: 40upx;
		position: fixed;
		top: 103upx;
		left: 3.47%;
		display: flex;
		flex-direction: row;
	}
	.returnClass{ //返回按钮
		width: 18upx;
		height: 40upx;
	}
	.titleClass{
		margin-left: 20upx;
		font-size: 38upx;
		font-weight: bold;
		line-height: 40upx;
	}
	.passengerList{ //列表样式
		width: 100%;
		height: 1000upx;
		/* border: 1px solid #007AFF; */
		margin-top: 180upx;
	}
	.btnAdd1{
		border-radius: 12upx;
		width: 45%;
	}
	.btnDefinite{
		border-radius: 12upx;
		width: 45%;
	}
	.btnAdd2{ //添加按钮
		width: 92%;
		border-radius: 12upx;
		background-color: #FC4646;
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
	.btnBox{ //按钮位置样式
		position: fixed;
		display: flex;
		flex-direction: row;
		bottom: 50upx;
		width: 100%;
		height: 90upx;
		/* border: 1px solid #4CD964; */
	}

</style>
