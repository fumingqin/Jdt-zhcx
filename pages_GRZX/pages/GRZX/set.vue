<template>
	<view class="container">

		<!-- <view class="list-cell m-t b-b">
			<text class="cell-tit">推送设置</text>
			<switch :checked="statu.check1" color="#fa436a" @change="switchChange" />
		</view>
		<view class="list-cell b-b b-l">
			<text class="cell-tit">视频自动播放</text>
			<switch :checked="statu.check2"  color="#fa436a" @change="playChange" />
		</view> -->
		<view class="list-cell m-t b-b" @click="goAggrement('用户协议')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">隐私政策</text>
			<text class="cell-more jdticon icon-you"></text>
		</view>
		<view class="list-cell m-t b-b" @click="goAggrement('充值协议')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">充值协议</text>
			<text class="cell-more jdticon icon-you"></text>
		</view>
		<view class="list-cell m-t b-b" @click="goAggrement('公共自行车服务说明')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">公共自行车服务说明</text>
			<text class="cell-more jdticon icon-you"></text>
		</view>
		<view class="list-cell m-t b-b" @click="updateAPP" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">版本信息</text>
			<text style="font-size: 28upx;">{{version}}</text>
			<text class="cell-more jdticon icon-you"></text>
		</view>
		<view class="list-cell m-t b-b" @click="clearStorage" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text style="font-size: 28upx;">{{currentSize}}</text>
			<text class="cell-more jdticon icon-you"></text>
		</view>
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="list-cell b-b b-l" @click="navTo('aboutApp')">
			<text class="cell-tit">关于APP</text>
			<text class="cell-more jdticon icon-you"></text>
		</view> -->
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				statu: {
					check1: true,
					check2: true,
				},
				currentSize: '',
				version: '',
				platform: '',
			};
		},
		onLoad() {},
		onShow() {
			this.load();
			this.getEquipmentInfo();
		},
		methods: {
			goAggrement: function(type) {
				uni.navigateTo({
					url: "../../../pages_DDQC/pages/GRZY/agreement?type=" + type
				})
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			async load() {
				var that = this;
				uni.getStorage({
					key: 'switch',
					success: function(res1) {
						that.statu.check1 = res1.data;
					}
				})
				uni.getStorage({
					key: 'play',
					success: function(res2) {
						that.statu.check2 = res2.data;
					}
				})
				const res = uni.getStorageInfoSync();
				console.log(res, "res3");
				console.log(res.currentSize, "currentSize");
				var size = res.currentSize;
				if (size >= 1024) {
					var size = (size / 1024).toFixed(2);
					that.currentSize = size + " M";
				} else {
					that.currentSize = size + " KB";
				}
			},
			//退出登录
			toLogout() {
				// var user=uni.getStorageSync('userInfo');
				// console.log(user,"00000")
				// if(user!=null||user!=""){
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success() {
						uni.showModal({
							content: '确定要退出登录么',
							success: (e) => {
								if (e.confirm) {
									uni.removeStorageSync('userInfo');
									uni.removeStorageSync('RealNameInfo');
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/GRZX/user'
											// url:that.$GrzxInter.Route.user.url,
										})
									}, 200)
								}
							}
						});
					},
					fail() {
						uni.showToast({
							title: '请先登录',
							icon: 'none',
						})
						//#ifdef APP-PLUS
						setTimeout(function() {
							uni.navigateTo({
								// url  : '/pages/GRZX/userLogin',
								url: that.$GrzxInter.Route.userLogin.url + '?loginType=1&&urlData=1'
							})
						}, 1000);
						// #endif
						//#ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/Home/wxAuthorize',
						})
						// #endif
					}
				})
			},
			//清除缓存
			clearStorage() {
				var user = uni.getStorageSync('userInfo');
				var RealNameInfo = uni.getStorageSync('RealNameInfo');
				uni.showModal({
					content: '是否清除数据',
					success: (e) => {
						if (e.confirm) {
							uni.clearStorageSync();
							uni.setStorageSync('userInfo', user);
							uni.setStorageSync('RealNameInfo', RealNameInfo);
							uni.redirectTo({
								// url:'/pages/GRZX/set'
								url: this.$GrzxInter.Route.set.url,
							})
						}
					}
				});
			},
			//switch
			switchChange(e) {
				let statusTip = e.detail.value ? true : false;
				uni.setStorage({
					key: 'switch',
					data: statusTip
				})
				//console.log(statusTip)
				//this.$api.msg(`${statusTip}消息推送`);
			},
			playChange(e) {
				let statusTip = e.detail.value ? true : false;
				uni.setStorage({
					key: 'play',
					data: statusTip
				})
				//console.log(statusTip)
				//this.$api.msg(`${statusTip}消息推送`);
			},

			//--------------获取设备系统信息----------------------------------
			getEquipmentInfo: function() {
				var that = this;
				//获取系统信息
				uni.getSystemInfo({
					success(res) {
						// console.log('获取系统信息', res)
						//获取系统平台 iOS Android
						that.platform = res.platform;
						// 获取本地应用资源版本号  
						plus.runtime.getProperty(plus.runtime.appid, function(inf) {
							that.version = inf.version; //获取当前版本号
						});
					}
				})
			},
			updateAPP: function() {
				var that = this;
				let systemType = 0;
				if (that.platform == 'ios') {
					systemType = 1;
				} else {
					systemType = 0;
				}
				uni.request({
					url: $DDTInterface.DDTInterface.GetAppVersion.Url,
					method: $DDTInterface.DDTInterface.GetAppVersion.method,
					data: {
						systemType: systemType
					},
					success(res) {
						if (res.data.status == true) {
							if (that.platform == 'ios') {
								if (that.version < res.data.data.VersionID) {
									uni.showModal({
										title: '温馨提示',
										content: '当前版本' + that.version + '\n' + '发现新版本，是否前往更新',
										complete(res) {
											if (res.confirm) {
												let appleId = 1522869291 //应用的appId
												plus.runtime.launchApplication({
													action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
												}, function(e) {
													console.log('Open system default browser failed: ' + e.message);
												});
											}
										}
									})
								} else {
									uni.showToast({
										title: "当前已经是最新版本，无需更新",
										icon:"none"
									})
								}
							} else {
								if (that.version < res.data.data.VersionID) {
									uni.showModal({
										title: '温馨提示',
										content: '当前版本' + that.version + '\n' + '发现新版本，是否前往更新',
										complete(res1) {
											if (res1.confirm) {
												let url = res.data.data.UpdateUrl;
												plus.runtime.openURL(url, function(res) {
													console.log(res);
												});
											}
										}
									})
								}else{
									uni.showToast({
										title: "当前已经是最新版本，无需更新",
										icon:"none"
									})
								}
							}
						} else {
							// uni.showToast({
							// 	title:res.data.msg,
							// 	icon:'none'
							// })
						}
					},
					fail(res) {
						console.log('获取版本信息失败', res)
					}
				})
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		&.b-l {
			border-top: 1upx solid #EAEAEA;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
