<template>
	<view class="content">
		<image src="../../static/GRZX/logo_wuyi.png" class="logoClass"></image>
		<text class="titleClass">{{title}}</text>
		<text class="versionClass">{{versionNum}}</text>
		<view class="boxClass1">
			<view class="functionClass">
				<text class="fontClass">{{functionIntroduction}}</text>
			</view>
			<view class="checkClass">
				<text class="fontClass">{{checkVersion}}</text>
			</view>
		</view>
		<view class="boxClass2">
			<text class="agreementClass">{{agreement}}</text>
			<text class="privacyClass">{{privacy}}</text>
			<text class="copyrightClass">{{copyright1}}</text>
			<text class="copyrightClass">{{copyright2}}</text>
			<text class="copyrightClass">{{copyright3}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:'大武夷智慧游',
				versionNum:'Version 1.0.0',
				functionIntroduction:'功能介绍',
				checkVersion:'检查新版本',
				agreement:'《软件许可及服务协议》',
				privacy:'《隐私保护指引》',
				copyright1:'**公司版权所有',
				copyright2:'Copyright©2019-2020',
				copyright3:'All Rights Reserved',
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.content{
		
	}
	.logoClass{		//LOGO样式
		position: absolute;
		top:100upx;
		left: 39%;
		width: 160upx;
		height: 160upx;
	}
	.titleClass{	//大武夷智慧游
		position: absolute;
		top:300upx;
		width: 100%;
		font-size: 50upx;
		font-weight: bold;
		text-align: center;
	}
	.versionClass{	//版本号
		position: absolute;
		top:360upx;
		width: 100%;
		font-size: 36upx;
		text-align: center;
	}
	.boxClass1{
		position: absolute;
		top:520upx;
		left: 5%;
		width: 90%;
		font-size: 34upx;
		display: flex;
		flex-direction: column;
	}
	.boxClass2{
		position: absolute;
		bottom:40upx;
		width: 100%;
		display: flex;
		text-align: center;
		flex-direction: column;
	}
	.functionClass{		//功能介绍
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		border-top: 1upx solid #EAEAEA;
	}
	.checkClass{		//检查新版本
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		border-top: 1upx solid #EAEAEA;
		border-bottom: 1upx solid #EAEAEA;
	}
	.fontClass{
		margin-left: 3%;
	}
	.agreementClass{
		color: #01B5FD;
		font-size: 30upx;
	}
	.privacyClass{
		color: #0000ff;
		font-size: 30upx;
	} 
	.copyrightClass{
		color: #EAEAEA;
		font-size: 26upx;
	}
</style>
