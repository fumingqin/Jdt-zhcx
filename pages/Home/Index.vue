<template>
	<view>
		<map id='map' ref="map" class="map" :style="{height:mapHeight}" :scale="scale" :longitude="longitude" :latitude="latitude"
		 :show-location="true" :controls="controls" @controltap="controltap">

		</map>

		<!-- <view class="SearchBarBlock">
			<view class="SearchBar" elevation='5px' style="">
				<image class="topContent-image" src="../../static/Home/Search.png"></image>
				<text @click="chooseSite" style="width: 500rpx;line-height: 45rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:400; color:rgba(153,153,153,1);">{{Address}}</text>
				<image @click="camera" class="topContent-image" src="../../static/Home/QRcode.png"></image>
			</view>
		</view> -->

		<view class="bottomContent" elevation='5px' style="width: 100%;">
			<!-- <view style="width: 60rpx;height: 10rpx;border-radius:5px;background-color: #D6D6D6;margin-top: 40rpx;">
			</view> -->
			<view class="tabBlock">
				<view class="tabItem" @click="godetail('/pages/CTKY/TraditionSpecial/Home/ctkyIndex')">
					<image class="tabItem-image" src="../../static/Home/CPDG.png"></image>
					<view class="tabItem-font"><text >车票订购</text></view>
				</view>
				<view class="tabItem" @click="godetail3('/pages/Home/ChooseSite?current=2')">
					<image class="tabItem-image" src="../../static/Home/WLYC.png"></image>
					<view class="tabItem-font"><text >网络约车</text></view>
				</view>
				<view class="tabItem" @click="godetail('/pages/GJCX/busH5')">
					<image class="tabItem-image" src="../../static/Home/GJCX.png"></image>
					<view class="tabItem-font"><text >公交查询</text></view>
				</view>
				<view class="tabItem" @click="godetail3('/pages/BCFW/bf_chartered')">
					<image class="tabItem-image" src="../../static/Home/BCFW.png"></image>
					<view class="tabItem-font"><text >包车服务</text></view>
				</view>
				<view class="tabItem" @click="godetail2('/pages/Home/ho_zhly')">
					<image class="tabItem-image" src="../../static/Home/LVFW.png"></image>
					<view class="tabItem-font"><text >旅游服务</text></view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import taxi from '../../common/Czc.js'
    // import wx from 'http://res.wx.qq.com/open/js/jweixin-1.6.0.js'
	import {
		mapState,
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				longitude: "118.611339", //精度
				latitude: "24.885683", //纬度
				// longitude: "", //精度
				// latitude: "", //纬度
				Address: '搜索您要去的地方',
				mapContext: '',
				key: [],
				scale: 16,
				mapHeight: '',
				QQ: '450906905',
				controls: [{
						id: 'back',
						position: {
							left: 10,
							top: 445,
							width: 55,
							height: 55
						},
						iconPath: '../../static/Home/Position.png',
						clickable: true,
					},
					/* 			{
									id: 'CallPollice',
									position: {
										left: 300,
										top: 290,
										width: 55,
										height: 55
									},
									iconPath: '../../static/Home/CallPollice.png',
									clickable: true,
								}, */
					{
						id: 'Service',
						position: {
							left: 300,
							top: 345,
							width: 55,
							height: 55
						},
						iconPath: '../../static/Home/Service.png',
						clickable: true,
					},
					{
						id: 'Big',
						position: {
							left: 300,
							top: 405,
							width: 55,
							height: 55
						},
						iconPath: '../../static/Home/Big.png',
						clickable: true,
					},
					{
						id: 'Small',
						position: {
							left: 300,
							top: 440,
							width: 55,
							height: 55
						},
						iconPath: '../../static/Home/Small.png',
						clickable: true,
					}
				],
			}
		},
		onLoad:function() {
			var that = this;
			// wx.config({
			//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			//   appId: '', // 必填，公众号的唯一标识
			//   timestamp: new Date().getTime(), // 必填，生成签名的时间戳
			//   nonceStr: '', // 必填，生成签名的随机串
			//   signature: '',// 必填，签名
			//   jsApiList: [] // 必填，需要使用的JS接口列表
			// });
			// wx.ready(function(){
			//   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			//  wx.getLocation({
			//    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			//    success: function (res) {
			//      var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
			//      var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			//      var speed = res.speed; // 速度，以米/每秒计
			//      var accuracy = res.accuracy; // 位置精度
			//    }
			//  });
			// });
			
			
			that.getGaoDeKey();
			that.getMyLocation();
			uni.getSystemInfo({
				success: function(res) {
					// that.controls[0].position.top = 845 * res.windowWidth / 750;
					//-
					that.controls[1].position.left = 640 * res.windowWidth / 750;
					// that.controls[1].position.top = 655 * res.windowWidth / 750;
					//+
					that.controls[2].position.left = 640 * res.windowWidth / 750;
					// that.controls[2].position.top = 770 * res.windowWidth / 750;
					//客服
					that.controls[3].position.left = 640 * res.windowWidth / 750;
					// that.controls[3].position.top = 835 * res.windowWidth / 750;
					

				}
			})
			// #ifdef  H5
			// this.getCode();
			//#endif
		},
		onReady() {
			var that = this;
			/* getApp().globalData.orderNumber=1;
			getApp().globalData.constantly(); */
			that.mapContext = uni.createMapContext("map", this);
			uni.getSystemInfo({
				//设置地图高度为可使用的高度
				success: function(res) {
					that.mapHeight = (res.windowHeight - 50) + 'px';
				}
			});
		},
		methods: {
			...mapMutations(['login']),
			getGaoDeKey: function() {
				//获取高德key
				var that = this;
				that.key = taxi.GaoDeWebKey;
			},
			getMyLocation: function() {
				//获取我的位置，将地图中心点移动至此
				var that = this;
				var ojb = {
					type: 'gcj02',
					geocode: true,
					success: function(res) {
						alert(0)
						that.longitude = res.longitude;
						that.latitude = res.latitude;
						console.log(that.longitude);
					},
					fail: function() {
						alert(0)
					console.log(0)
					},
				}
				// uni.getLocation(ojb);
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						alert(10)
						that.longitude = res.longitude;
						that.latitude = res.latitude;
						console.log(res);
					},
					fail: () => {
						console.log(0)
					}
				})
			},
			//地图控件调用方法
			controltap: function(e) {
				var that = this;
				var controlId = ''
				// #ifdef APP-PLUS
				controlId = e.detail.controlId;
				// #endif
				// #ifdef MP-WEIXIN
				controlId = e.controlId;
				// #endif
				// #ifdef H5
				controlId = e.detail.controlId;
				// #endif
				if (controlId === 'back') {
					//回到我的位置
					that.mapContext.moveToLocation();
				} else if (controlId === 'Service') {
					//客服

					plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + that.QQ + '&version=1&src_type=web ');

				} else if (controlId === 'CallPollice') {
					//一键报警
					uni.showToast({
						title: '报警',
						icon: 'none',
					});
				} else if (controlId === 'Big') {
					//放大
					if (this.scale < 18) {
						this.scale = this.scale + 1;
					}
				} else if (controlId === 'Small') {
					//缩小
					if (this.scale > 5) {
						this.scale = this.scale - 1;
					}
				}
			},

			chooseSite: function() {
				/* uni.chooseLocation({
					success: function(res) {
						uni.setStorage({
							key: 'Address',
							data: res
						});
					},
				}); */
				uni.navigateTo({
					url: '../Home/ChooseSite'
				});
			},
			message: function() {
				uni.navigateTo({
					url: '../GRZX/notice'

				})
			},
			camera: function(e) {
				/* uni.showToast({
					title: "暂未开放",
					mask: true,
					icon: 'none',
				});
				uni.chooseImage({
					success: function(res) {
						console.log(res);
					}
				}) */
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log(res);
						uni.navigateTo({
							url: res
						});
					}
				})
			},

			//路由统一事件
			godetail: function(url) {
				uni.navigateTo({
					url: url
				});
			},
			
			//路由统一事件
			godetail3: function(url) {
				uni.showToast({
					title:'正在测试中，敬请期待...',
					icon:'none'
				});
			},
			
			//旅游服务专属路由
			godetail2: function(url) {
				uni.showToast({
					title:'正在测试中，敬请期待...',
					icon:'none'
				});
				return;
				// #ifdef MP-WEIXIN
				uni.redirectTo({
					url: url
				});
				// #endif
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: url
				});
				// #endif

			},
			// #ifdef  H5
			//获取openid
			getCode() {
				let that=this;
			    let Appid = "wx14af28006f937f6e";//appid
				let code = this.getUrlParam('code'); //是否存在code
				console.log(code);
				let local = "http://zntc.145u.net/h5/#/";
				if (code == null || code === "") {
				  //不存在就打开上面的地址进行授权
					window.location.href =
						"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
						Appid +
						"&redirect_uri=" +
						encodeURIComponent(local) +
						"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"; 
				} else {
				  // 存在则通过code传向后台调用接口返回微信的个人信息
					uni.request({
						url:'http://27.148.155.9:9056/CTKY/getWxUserinfo?code='+code+'&Appid='+Appid+'&Appsecret=9cda28b050341aca1f674d2043b01358',
						header: {'content-type': 'application/x-www-form-urlencoded'},
						method:'POST',
						success(res) {
							// uni.showToast({
							// 	title:res.data.openid,
							// 	icon:'none',
							// 	duration:100000
							// })
							console.log(res,"res")
							uni.setStorageSync('scenicSpotOpenId',res.data.openid)
							uni.setStorageSync('wxuserInfo',res.data)
							let user=res.data;
							uni.request({
								//url:'http://zntc.145u.net/api/person/changeInfo',
								url:that.$GrzxInter.Interface.GetUserInfoByOpenId_wx.value,
								data:{
									openId_wx:user.openid,
								},
								method:that.$GrzxInter.Interface.GetUserInfoByOpenId_wx.method,
								success(res1) {
									console.log(res1,'res1')
									//判断是否有绑定手机号
									if(res1.data.msg=="获取用户信息失败,不存在该openID用户信息"){
										uni.navigateTo({
											url:'/pages/GRZX/wxLogin'
										})
									}else{
										uni.setStorageSync('userInfo',res1.data.data)
										that.logining=true;
										that.login(res1.data.data)
									}	
								}
							})
						},
						fail(err){
							console.log(err)
							uni.showToast({
								title:"err是"+err.errMsg,
								icon:'none'
							})
						}
					})
				}
			},
			//判断code信息是否存在
			getUrlParam(name) {
				  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')  
				  let url = window.location.href.split('#')[0]   
				  let search = url.split('?')[1]  
				  if (search) {  
				    var r = search.substr(0).match(reg)  
				    if (r !== null) return unescape(r[2])  
				    return null  
				  } else {  
				    return null  
				  }  
			},
			 //#endif  
		}
	}
</script>

<style>
	.topContent-image {
		width: 35rpx;
		height: 35rpx;
	}

	.topContent-image2 {
		width: 40rpx;
		height: 35rpx;
	}

	.bottomContent {
		position: fixed;
		/* #ifndef MP-WEIXIN */
		bottom: 50px;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		bottom: 0px;
		/* #endif */
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		align-items: center;
		box-shadow: 0px 6px 20px 0px rgba(189, 189, 189, 0.53);
		border-top-left-radius: 28rpx;
		border-top-right-radius: 28rpx;
	}

	.SearchBarBlock {
		width: 750rpx;
		position: fixed;
		top: 60px;
		left: 0px;
		right: 0px;
		align-items: center;
	}

	.SearchBar {
		background-color: #FFFFFF;
		width: 700rpx;
		box-shadow: 0px 4px 9px 1px rgba(204, 204, 204, 1);
		display: flex;
		border-radius: 9px;
		padding: 20rpx;
		align-items: center;
		justify-content: space-between;
	}

	.map {
		width: 750rpx;
	}

	.tabBlock {
		display: flex;
		width: 750rpx;
		/* #ifndef APP-PLUS */
		margin: 40rpx 0;
		/* #endif */
		/* #ifdef APP-PLUS */
		margin: 10rpx 0;
		/* #endif */
		
		
		text-align: center;
		align-items: center;
		/* margin-top: 50rpx;
		margin-bottom: 50rpx; */
	}

	.tabItem {
		width: 150rpx;
		text-align: center;
		/* align-items: center; */
	}

	.tabItem-image {
		width: 60rpx;
		height: 60rpx;
	}

	.tabItem-font {
		margin-top: -10rpx;
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #333333;
	}
</style>
