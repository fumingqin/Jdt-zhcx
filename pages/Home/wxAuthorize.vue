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
			<button class='bottom' type='warn' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
				授权微信
			</button>
			<view v-if="bindState">
				<button open-type="getPhoneNumber" class='bottom' @getphonenumber="getPhoneNumber">getPhoneNumber</button> 
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
			let that = this;
			uni.login({
				success(res){
					console.log(res,'res')
					var appid='wxf64bf945b37a9939';
					var secret='0c3b6807a0d0f48def706373ef9eea11';
					var logUrl='https://api.weixin.qq.com/sns/jscode2session?appid='+appid
					+'&secret='+secret+'&js_code='+res.code+'&grant_type=authorization_code';
					console.log(logUrl,'logUrl')
					uni.request({
						url:logUrl,
						method: 'GET',
						success(logRes){
							console.log(logRes,'logRes')
							uni.setStorageSync('scenicSpotOpenId',logRes.data.openid)
						}
					})
				}
			})
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					console.log(infoRes,'49')
					uni.setStorageSync('wxUserInfo',infoRes.userInfo)
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
			console.log(e.detail.errMsg);  
			console.log(e.detail.iv);  
			console.log(e.detail.encryptedData);
		    console.log(e); 
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
