<template>
	<view class="all">
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<view class='header'>
				<image src='../../static/GRZX/wxLogo.png'></image>
			</view>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
			<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
				授权登录
			</button>
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
		}
	},
	onLoad(){
		var isCanUse=uni.getStorageSync('isCanUse');
		if(isCanUse){
			this.wxGetUserInfo();
		}
	},
	methods:{
		// btn(){
		// 	uni.setStorageSync('isCanUse', true);
		// },
		wxGetUserInfo() {
			let that = this;
			uni.login({
				success(res){
					console.log(res,'res')
					var appid='';
					var secret='';
					var logUrl='https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+res.code+'&grant_type=authorization_code';
					uni.request({
						url:logUrl,
						success(logRes){
							console.log(logRes,'logRes')
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
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
