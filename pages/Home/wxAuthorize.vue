<template>
	<view class="all">
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<!-- <view class='header'>
				<image src='../../static/GRZX/1.png'></image>
			</view> -->
		<!-- 	<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view> -->
			<view class="box">
				<view class="boxClass1">
					<image src='../../static/GRZX/wxAuthorize1.png' class="imgClass"></image>
					<text class="fontClass">授权微信</text>
				</view>
				<view class="bt"></view>
				<view class="boxClass2">
					<image src='../../static/GRZX/wxAuthorize2.png' class="imgClass" style="margin-left: 9px;"></image>
					<text class="fontClass">授权手机号</text>
				</view>
				<view class="bt"></view>
				<view class="boxClass3">
					<image src='../../static/GRZX/wxAuthorize3.png' class="imgClass"></image>
					<text class="fontClass">登录成功</text>
				</view>
			</view>
			<view v-if="!bindState">
				<button class='bottom' type='warn' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权微信
				</button>
			</view>	
			<view v-if="bindState">
				<button open-type="getPhoneNumber" type='warn' class='bottom' @getphonenumber="getPhoneNumber">绑定手机号</button> 
			</view>
			<!-- <button @click="btn">
				还原
			</button> -->
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
export default{
	data(){
		return{
			SessionKey: '',
			OpenId: '',
			nickName: null,
			avatarUrl: null,
			bindState:false,
			sessionKey:'',
			openId_xcx:'',
			userInfo:[],
		}
	},
	onLoad(){
		var isCanUse=uni.getStorageSync('isCanUse');
		if(isCanUse){
			this.wxGetUserInfo();
		}
	},
	methods:{
		wxGetUserInfo() {
			uni.showLoading({
				title:'登录中...'
			})
			let that = this;
			uni.login({
				success(res){
					console.log(res,'res')
					var appid='wx8dcbb62a76885221';
					var secret='11d8e65170b67f58cccd655051ca8303';
					var logUrl='https://api.weixin.qq.com/sns/jscode2session?appid='+appid
					+'&secret='+secret+'&js_code='+res.code+'&grant_type=authorization_code';
					console.log(logUrl,'logUrl')
					uni.request({
						url:logUrl,
						method: 'GET',
						success(logRes){
							console.log(logRes,'logRes')
							uni.setStorageSync('scenicSpotOpenId',logRes.data.openid)
							var openid=logRes.data.openid;
							that.sessionKey=logRes.data.session_key;
							that.openId_xcx=logRes.data.openid;
							uni.request({
								url:that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.value,
								data:{
									openId_xcx:openid,
								},
								method:that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.method,
								success(res){
									console.log(res,'res')
									setTimeout(function(){
										uni.hideLoading();
									},1000);
									if(!res.data.status || res.data.data.phoneNumber=="" || res.data.data.phoneNumber==null){
										that.bindState=true;
									}else{
										uni.showToast({
											title:'登录成功！',
											icon:'success',
										})
										uni.setStorageSync('userInfo',res.data.data)
										setTimeout(function(){
											uni.switchTab({
												url:'/pages/Home/Index',
											})
										},500);
									}	
								}
							})
						}
					})
				}
			})
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					console.log(infoRes,'49')
					that.userInfo=infoRes.userInfo;
					// uni.setStorageSync('wxUserInfo',infoRes.userInfo)
					uni.setStorageSync('isCanUse', true);//记录是否第一次授权  false:表示不是第一次授权
				},
				fail(res) {
					uni.showToast({
						title:'登录授权失败',
						icon:'none',
					})
				}
			});
		},
		getPhoneNumber(e) {  
			var WXBizDataCrypt = require('@/common/WXBizDataCrypt')
			var appId = 'wx8dcbb62a76885221';
			var encryptedData =e.detail.encryptedData;
			var iv = e.detail.iv;
			var pc = new WXBizDataCrypt(appId, this.sessionKey)
			var data = pc.decryptData(encryptedData , iv)
			console.log('解密后 data: ', data)
			var that=this;
			console.log('that.userInfo: ', that.userInfo)
			uni.request({
				url:that.$GrzxInter.Interface.login.value,
				data:{
					phoneNumber:data.purePhoneNumber,
				},
				method:that.$GrzxInter.Interface.login.method,
				success(res1){
					uni.request({
						url:that.$GrzxInter.Interface.changeInfo.value,
						data:{
							userId:res1.data.data.userId,
							phoneNumber:data.purePhoneNumber,
							nickname:that.userInfo.nickName,
							address:that.userInfo.province+that.userInfo.city,
							openId_wx:res1.data.data.openId_wx,
							gender:that.userInfo.gender,
							openId_qq:res1.data.data.openId_qq,
							openId_xcx:that.openId_xcx,
							birthday:res1.data.data.birthday,
							autograph:res1.data.data.autograph,
						},
						method:that.$GrzxInter.Interface.changeInfo.method,
						success(res2){
							uni.request({
								url:that.$GrzxInter.Interface.changeInfoPortrait.value,
								data:{
									userId:res2.data.data.userId,
									portrait:that.userInfo.avatarUrl,
								},
								method:that.$GrzxInter.Interface.changeInfoPortrait.method,
								success(res3) {
									console.log(res3);
									uni.showToast({
										title:'绑定成功！',
										icon:'success',
									})
									uni.setStorageSync('userInfo',res3.data.data)
									setTimeout(function(){
										uni.switchTab({
											url:'/pages/Home/Index',
										})
									},500);
								}
							})
						}
					})
				}
			})

		} 
	}	
}
</script>

<style lang="scss">
	.all{
		width: 100%;
	}	
	.header{
		margin: 200rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}
	
	.header image {
		width: 150rpx;
		height: 130rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 230rpx 50rpx;
		font-size: 35rpx;
	}
	.box{
		width: 100%;
		// height: 100upx;
		// border: 1upx solid red;
		display: flex;
		flex-direction: row;
		margin-top: 350upx;
	}
	.boxClass1{
		width: 120upx;
		margin-left: 10%;
		margin-right: 2%;
		display: flex;
		flex-direction: column;
	}
	.boxClass2{
		width: 150upx;
		// margin-left: 2%;
		display: flex;
		flex-direction: column;
	}
	.boxClass3{
		width: 120upx;
		margin-left: 2%;
		display: flex;
		flex-direction: column;
	}
	.imgClass{
		width: 115upx;
		height: 110upx;
	}
	.fontClass{
		font-size: 28upx;
		text-align: center;
		width: 100%;
		margin-top: 10upx;
	}
	.bt{
		margin-top: 60upx;
		border-top: 4upx solid #E5E5E5;
		width: 14%;
	}
</style>
