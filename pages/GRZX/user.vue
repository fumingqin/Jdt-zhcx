<template>
	<view class="content">
		<view class="backImg">
			<!-- <image src="../../static/GRZX/backImg.png" class="imgClass"></image> -->
			<!-- #ifdef APP-PLUS -->
			<image src="../../static/GRZX/set.png" class="setClass" @click="navTo('set')"></image>
			<!-- <image src="../../static/GRZX/info.png" class="infoClass" @click="navTo('myNews')"></image> -->
			<image src="../../static/GRZX/scan.png" class="scanClass" @click="navTo('scan')"></image>
			<!-- #endif -->
			<view class="userInfoClass" @click="checkLogin">
				<image class="portraitClass" :src="port || '/static/GRZX/missing-face.png'"></image>
				<view class="usernameClass" style="display: flex;flex-direction: column;">
					<view><text>{{nickname}}</text></view>
					<view style="display: flex;align-items: center;" v-if="nickname != '游客'">
					<!-- <view style="height: 42upx;background-color: #2A954B;display: flex;justify-content:center;align-items: center;" v-if="nickname != '游客'"> -->
						<image src="../../static/GRZX/huangguan.png" style="width: 10px;height: 10px;background-color: #2A954B;padding: 5px;border-top-left-radius: 8upx;border-bottom-left-radius: 8upx;"></image>
						<text style="font-size: 20upx;color: #FFFFFF;line-height: 20px;background-color: #2A954B;padding-right:10upx ;border-top-right-radius: 8upx;border-bottom-right-radius: 8upx;">{{RealNameStatus}}</text>
						<!-- <image src="../../static/GRZX/huangguan.png" class="imgTubiao"></image>
						<text class="fontClass">{{RealNameStatus}}</text> -->
					</view>
				</view>
				<!-- <image src="../../static/GRZX/edit.png" class="editClass"></image> -->
			</view>
						
		

			<view class="grzyClass" @click="checkLogin">
				<text>个人主页</text>
				<image src="../../static/GRZX/btnRight_Home.png" class="rightClass"></image>
			</view>

			<view class="myBox">
				<view class="collection" @click="orderClick('../../pages_DDQC/pages/GRZY/zy_homepage')">
					<image src="../../static/Home/wallet.png" class="imgStyle1" mode="aspectFill"></image>
					<text class="myFont">我的钱包</text>
				</view>
				<view class="collection" @click="orderClick('../../pages_DDQC/pages/GRZY/zy_topUpRecord')"> 
					<image src="../../static/Home/bill.png" class="imgStyle1" mode="aspectFill"></image>
					<text class="myFont">消费明细</text>
				</view> 
				<view class="collection" @click="orderClick('../../pages_DDQC/pages/GRZY/zy_homepage?type=1')">
					<image src="../../static/Home/rideOrder.png" class="imgStyle1" mode="aspectFill"></image> 
					<text class="myFont">骑行记录</text>
				</view>
			</view> 
		</view>
		<!-- <image :src="advert" class="advertClass" lazy-load="true"></image> -->
		<image style="border-radius: 10rpx;" :src="imageIndex[0].imageUrl" class="advertClass" lazy-load="true"></image>
		<view class="serviceBox">
			<text class="moreClass">更多服务</text>
			<!-- 分割线 -->
			<view class="lineClass"></view>

			<!-- 第一排 -->
			<!-- <view class="boxClass">
				<view class="itemClass" @click="infoClick">
					<image src="../../static/GRZX/ServiceIcon/tb_XXGL.png" class="XXGLicon"></image>
					<text class="fontStyle">信息管理</text>
				</view>
				<view class="itemClass" @click="pictureClick">
					<image src="../../static/GRZX/ServiceIcon/tb_ZDPZ.png" class="ZDPZicon"></image>
					<text class="fontStyle">站点拍照</text>
				</view>
				<view class="itemClass" @click="complaintClick">
					<image src="../../static/GRZX/ServiceIcon/tb_WDTS.png" class="WDTSicon"></image>
					<text class="fontStyle">我的投诉</text>
				</view>
				<view class="itemClass" @click="addContact">
					<image src="../../static/GRZX/ServiceIcon/tb_JJLXR.png" class="JJLXRicon"></image>
					<text class="fontStyle">紧急联系人</text>
				</view>
			</view> -->
			<!-- 第二排 -->
			<view class="boxClass">
				<view class="itemClass" @click="realName">
					<image src="../../static/GRZX/ServiceIcon/tb_SMRZ.png" class="SMRZicon"></image>
					<text class="fontStyle">实名认证</text>
				</view>
				<!-- <view class="itemClass" @click="replacePhoneNum">
					<image src="../../static/GRZX/ServiceIcon/tb_GHSJH.png" class="GHSJHicon"></image>
					<text class="fontStyle">更换手机号</text>
				</view> -->
				<view class="itemClass" @click="phoneClick">
					<image src="../../static/GRZX/ServiceIcon/tb_DHKF.png" class="DHKFicon"></image>
					<text class="fontStyle">电话客服</text>
				</view>
				<view class="itemClass" @click="feedbackClick">
					<image src="../../static/GRZX/ServiceIcon/tb_YJFK.png" class="YJFKicon"></image>
					<text class="fontStyle">意见反馈</text>
				</view>
			</view>
			<!-- 第三排 -->
			<view class="boxClass mb">
				<!-- #ifdef MP-WEIXIN -->
				<!-- <view class="itemClass" style="position: relative;">
					<image src="../../static/GRZX/ServiceIcon/tb_ZXKF.png" class="ZXKFicon"></image>
					<button open-type="contact" class="contactClass"></button>
					<text class="fontStyle">在线客服</text>
				</view> -->
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<!-- <view class="itemClass" @click="QQClick">
					<image src="../../static/GRZX/ServiceIcon/tb_QQKF.png" class="QQKFicon"></image>
					<text class="fontStyle">QQ客服</text>
				</view> -->
				<!-- #endif -->
			</view>
		</view>

		<!-- 添加紧急联系人弹窗 -->
		<view :hidden="userFeedbackHidden" class="popup_content">
			<view class="popup_title">添加</view>
			<view class="popup_textarea_item">
				<input class="inputClass" v-model="contantPhone" placeholder="输入紧急联系人的手机号码" type="number" maxlength="11" :focus='focusType' />
				<view>
					<button class="popup_button" @click="submit">确定</button>
				</view>
			</view>
		</view>
		<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv"></view>
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	import $DDTInterface from '@/common/DDT.js'
	import {
		pathToBase64,
		base64ToPath
	} from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	export default {
		data() {
			return {
				imageIndex: [{
					imageUrl: '',
				}],
				QQ: '',
				nickname: '',
				port: '',
				advert: '',
				userFeedbackHidden: true,
				focusType: false,
				//加载信息
				userInfo: "",
				contantPhone: '',
				userId: '',
				phoneNumber: '', //客服电话
				RealNameStatus: '', //是否实名--已实名、未实名、认证中
			}
		},
		onLoad() {
			this.loadImg();
			uni.request({
				url: $DDTInterface.DDTInterface.getImage.Url,
				method: $DDTInterface.DDTInterface.getImage.method,
				data: {
					model: 12,
				},
				success: (res) => {
					// console.log(res)
					this.imageIndex = res.data.data
			
				},
			})
		},
		onShow() {
			var that = this;
			this.loadData();
			//读取客服热线
			uni.getStorage({
				key: 'ConsumerHotline',
				success(res) {
					that.phoneNumber = res.data.Phone2
				}
			})
		},
		methods: {
			// ---------------------------加载图片----------------------------
			loadImg() {
				var that = this;
				that.$ChangeImage.GetImage("南平综合出行").then(function(data) {
					that.advert = data.advert;
				});
			},
			// ---------------------------加载数据----------------------------
			loadData() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success(user) {
						// console.log(user,"user")
						var phone = user.data.phoneNumber;
						if (phone != "" && phone != null && user.data != "") {
							uni.request({
								url: that.$GrzxInter.Interface.login.value,
								data: {
									phoneNumber: phone,
								},
								method: that.$GrzxInter.Interface.login.method,
								success(res) {
									that.checkIDRealName(res.data.data.userId);
									uni.setStorageSync('userInfo', res.data.data);
									that.userInfo = res.data.data;

									if (res.data.data.nickname == "" || res.data.data.nickname == null) {
										// that.nickname="请输入昵称";
										that.nickname = res.data.data.phoneNumber;
									} else {
										that.nickname = res.data.data.nickname;
									}
									var base64 = res.data.data.portrait;
									if (that.isBase64(base64)) {
										base64ToPath(base64)
											.then(path => {
												that.port = path;
											})
											.catch(error => {
												// console.error(error)
											})
									} else {
										that.port = base64;
									}
									that.userId = res.data.data.userId;
								}
							})
						} else {
							//未绑定手机号
							//#ifdef H5
							uni.showToast({
								title: "请绑定手机号，请返回至首页",
								icon: 'none'
							})
							// setTimeout(function(){
							// 	uni.navigateTo({
							// 		// url:'/pages/GRZX/wxLogin',
							// 		url:that.$GrzxInter.Route.wxLogin.url,
							// 	})
							// },1000);
							//#endif
						}
					},
					fail() {
						that.nickname = "游客";
						that.port = "";
					}
				})
			},
			//-------------------------------------根据id获取实名信息----------------------------------
			checkIDRealName(id) {
				// console.log(id,'checkRealName')
				var that = this;
				uni.request({
					url: that.$GrzxInter.Interface.GetUserByUserID.value,
					data: {
						userID: id,
					},
					method: that.$GrzxInter.Interface.GetUserByUserID.method,
					success(res) {
						// console.log('获取实名信息成功',res)
						if (res.data.status == true) {
							if (res.data.data.RealNameStatus == 0) {
								that.RealNameStatus = '未实名';
							} else if (res.data.data.RealNameStatus == 1) {
								that.RealNameStatus = '已实名';
							} else if (res.data.data.RealNameStatus == 2) {
								that.RealNameStatus = '未通过';
							} else if (res.data.data.RealNameStatus == 3) {
								that.RealNameStatus = '认证中';
							} else if (res.data.data.RealNameStatus == 4) {
								that.RealNameStatus = '资料待完善';
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
						uni.setStorageSync('RealNameInfo', res.data.data)
					}
				})
			},
			// ---------------------------跳转订单的点击-----------------------
			orderClick(url) {
				if (this.userInfo.length!='') {
					uni.navigateTo({
						url:url
					})
				} else{
					uni.navigateTo({
						url: '../GRZX/userLogin',
					})
				}
			},
			// --------------------------设置，通知，扫一扫--------------------
			navTo(e) {
				if (e == 'set') {
					uni.navigateTo({
						url: this.$GrzxInter.Route.set.url,
					})
				}
				if (e == 'myNews') {
					uni.navigateTo({
						url: this.$GrzxInter.Route.myNews.url,
					})
				}
				if (e == 'scan') {
					uni.scanCode({
						scanType:['qrCode'],
						onlyFromCamera: true,
						success: function(res) {
							console.log(res);
							//void plus.runtime.openWeb(res.result, function() {
								//识别失败
							//});
						}
					})
				}
				// console.log(e)
			},
			// ---------------------------信息管理----------------------------
			infoClick() {
				uni.navigateTo({
					//url:'/pages/GRZX/infoList',
					url: this.$GrzxInter.Route.infoList.url,
				})
			},
			//--------------------添加紧急联系人的电话号码--------------------
			addContact() {
				var that = this;
				that.contantPhone = "";
				uni.getStorage({
					key: 'userInfo',
					success(res) {
						that.userFeedbackHidden = false;
						that.focusType = true;
						that.contantPhone = res.data.autograph;
					},
					fail() {
						uni.showToast({
							title: '请您先登录',
							icon: 'none',
						})
					}
				})
			},
			submit() {
				var that = this;
				console.log(that.contantPhone, "contantPhone")
				var reg = (/^1(3|4|5|6|7|8|9)\d{9}$/);
				if (that.contantPhone == "") {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
					})
				} else if (!that.judgeNum(that.contantPhone) || that.contantPhone.length != 11 || !reg.test(that.contantPhone)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none',
					})
					// #ifdef H5
					that.userFeedbackHidden = true;
					// #endif
				} else {
					uni.request({
						url: that.$GrzxInter.Interface.AddEmergencyContact.value,
						data: {
							UserId: that.userId,
							Autograph: that.contantPhone,
						},
						method: that.$GrzxInter.Interface.AddEmergencyContact.method,
						success(res) {
							if (res.data.data != "") {
								console.log(res.data.data, '296')
								uni.setStorageSync('userInfo', res.data.data)
							}
							uni.showToast({
								title: '保存成功',
								icon: 'success'
							})
							that.focusType = false;
							that.userFeedbackHidden = true;
						}
					})
				}
			},
			hideDiv() {
				this.focusType = false;
				this.userFeedbackHidden = true;
			},
			//------------------------------投诉---------------------------
			complaintClick() {
				uni.navigateTo({
					// url:'/pages/GRZX/gz_complaintList'
					url: this.$GrzxInter.Route.complaint.url,
				})
			},
			//------------------------------意见反馈-----------------------
			feedbackClick() {
				uni.navigateTo({
					// url:'/pages/GRZX/feedback'
					// url: this.$GrzxInter.Route.feedback.url,
					url:'../../pages_DDQC/pages/GRZY/feedbackList'
				})
			},
			//-----------------------------拍照返现------------------------
			pictureClick() {
				console.log('123')
				uni.navigateTo({
					// url:'/pages/GRZX/feedback'
					url: '../../pages_GRZX/pages/GRZX/pictureList',
				})
			},
			// ---------------------------是否登录--------------------------
			checkLogin() {
				var that = this;
				// ---------------APP,WX--------------
				//#ifndef H5
				var user = uni.getStorageSync('userInfo');
				if (user.userId == "" || user.userId == null) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
					})
					// #ifdef APP-PLUS
					setTimeout(function() {
						uni.navigateTo({
							url: that.$GrzxInter.Route.userLogin.url,
						})
					}, 500);
					// #endif
					//#ifdef MP-WEIXIN
					uni.navigateTo({
						url: '/pages/Home/wxAuthorize',
					})
					// #endif
				} else {
					uni.navigateTo({
						url: that.$GrzxInter.Route.personal.url,
					})
				}
				//#endif
				// ---------------H5--------------
				//#ifdef H5
				var user1 = uni.getStorageSync('userInfo');
				console.log(user1, "1111")
				if (user1 == "" || user1 == null || user1.openId_wx == null || user1.openId_wx == "") {
					console.log(user1, "2222")
					uni.showToast({
						title: "请允许公众号授权登录，即将为你跳转至首页",
						icon: 'none'
					})
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/Home/zy_zhcx',
						})
					}, 500);
				} else {
					console.log(user1, "3333")
					uni.navigateTo({
						// url :'/pages/GRZX/personal'
						url: that.$GrzxInter.Route.personal.url,
					})
				}
				//#endif
			},
			// ---------------------------收藏--------------------------
			collectionClick() {
				// uni.navigateTo({
				// 	url:'/pages/GRZX/collection'
				// }) 
				uni.showToast({
					title:'暂未开放，敬请期待...',
					icon:'none'
				})
			},
			// ---------------------------历史--------------------------
			historyClick() {
				// uni.navigateTo({
				// 	url:'/pages/GRZX/history'
				// }) 
				uni.showToast({
					title:'暂未开放，敬请期待...',
					icon:'none'
				})
			},
			// ---------------------------电话客服--------------------------
			phoneClick() {
				var that = this;
				uni.makePhoneCall({
					phoneNumber: that.phoneNumber, //仅为示例
				});
				// uni.request({
				// 	url:that.$GrzxInter.Interface.SearchCustomerService.value,
				// 	data:{
				// 		region:'泉州',
				// 	},
				// 	method:that.$GrzxInter.Interface.SearchCustomerService.method,
				// 	success(res){
				// 		console.log(res)
				// 		uni.makePhoneCall({
				// 		    phoneNumber: res.data.data.phone, //仅为示例
				// 		});
				// 	}
				// })
			},
			// ---------------------------QQ客服--------------------------
			QQClick() {
				// #ifdef APP-PLUS
				var that = this;
				uni.request({
					url: that.$GrzxInter.Interface.SearchCustomerService.value,
					data: {
						region: '泉州',
					},
					method: that.$GrzxInter.Interface.SearchCustomerService.method,
					success(res) {
						plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + res.data.data.qq + '&version=1&src_type=web ');
					}
				})
				//#endif
			},
			// ---------------------------实名认证--------------------------
			realName() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success(res) {
						that.checkRealName();
					},
					fail() {
						uni.showToast({
							title: '请您先登录',
							icon: 'none',
						})
					}
				})
			},
			//-------------------------------------检查是否实名----------------------------------
			checkRealName() {
				var that = this;
				uni.showLoading({
					title:'正在检测验证信息...'
				})
				uni.request({
					url: that.$GrzxInter.Interface.GetUserByUserID.value,
					data: {
						userID: that.userId,
					},
					method: that.$GrzxInter.Interface.GetUserByUserID.method,
					success(res) {
						console.log(res)
						uni.hideLoading()
						if (res.data.data == "" || res.data.data.UserName == "" || res.data.data.UserIDNumber == "") {
							//实名认证
							uni.navigateTo({
								url: that.$GrzxInter.Route.realName.url,
							})
						} else if (res.data.data.RealNameStatus !== 1||res.data.data.RealNameStatus != 3) {
							//上传图片
							uni.navigateTo({
								url: that.$GrzxInter.Route.uploadPhoto.url,
							})
						} else {
							uni.showToast({
								title: '您已实名或实名审核中',
								icon: 'none',
							})
						}
					},
					fail() {
						uni.hideLoading()
					}
				})
			},
			// ---------------------------更换手机号--------------------------
			replacePhoneNum() {
				uni.showToast({
					title: '暂未开通，敬请期待',
					icon: 'none'
				})
				// uni.navigateTo({
				// 	url:this.$GrzxInter.Route.replacePhoneNum.url,
				// })
			},
			//----------------------判断是否为base64格式-------------------
			isBase64: function(str) {
				if (str === '' || str.trim() === '') {
					return false;
				}
				try {
					return btoa(atob(str)) == str;
				} catch (err) {
					return false;
				}
			},
			// login:function(){
			// 	uni.navigateTo({
			// 		url:this.$GrzxInter.Route.verificateName.url+'?type=login',
			// 	})
			// },
			//----------------------判断是否为数字-----------------------
			judgeNum: function(val) {
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				if (regPos.test(val) || regNeg.test(val)) {
					return true;
				} else {
					return false;
				}
			},
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #F5F9FA;
	}

	.content {}

	// .backImg {
	// 	width: 100%;
	// 	 height: 490upx;
	// }
	.backImg {
		width: 100%;
		height: 510upx;
		position: relative;  
		z-index: 1;  
		overflow: hidden;
	}
	
	.backImg::after{
		/* 以下不允许修改 */
		width: 120%;
		height: 490upx;
		background: linear-gradient(0deg,rgba(47,194,92,1),rgba(27,187,76,1));
		border-radius: 0 0 50% 50%;
		position: absolute;
		left:-10%;
		z-index: -1;  
		content: '';
	}

	.imgClass {
		//背景图片
		width: 100%;
		height: 300upx;
	}

	.setClass {
		//设置按钮
		width: 47upx;
		height: 45upx;
		position: absolute;
		left: 4.67%;
		top: 80upx;
	}

	.scanClass {
		//扫一扫按钮
		width: 44upx;
		height: 41upx;
		position: absolute;
		left: 86.8%;
		top: 80upx;
	}

	.infoClass {
		//消息按钮
		width: 47upx;
		height: 42upx;
		position: absolute;
		//left: 87.73%;
		left: 20%;
		top: 80upx;
	}

	.userInfoClass {
		//包括头像昵称
		position: absolute;
		left: 4.53%;
		top: 161upx;
		height: 127upx;
		width: 68.4%;
		// background-color: #06B4FD;
		display: flex;
		flex-direction: row;
	}

	.portraitClass {
		//头像
		border-radius: 50%;
		width: 127upx;
		height: 127upx;
	}

	.usernameClass {
		//昵称
		// height: 60upx;
		// line-height: 44upx;
		font-size: 42upx;
		color: #FFFFFF;
		margin-top: 20upx;
		margin-left: 3%;
		width: 350upx;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		// border: 1upx solid #007AFF;
	}

	.grzyClass {
		//个人主页
		width: 20%;
		height: 34upx;
		position: absolute;
		left: 75.47%;
		top: 200upx;
		color: #FFFFFF;
		font-size: 28upx;
		line-height: 27upx;
	}

	.rightClass {
		width: 10%;
		height: 29upx;
		position: absolute;
		left: 82%;
		/* #ifdef APP-PLUS */
		top: -3upx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: -1upx;
		/* #endif */
	}

	.typeBox {
		//普通用户
		width: 170upx;
		height: 42upx;
		// background-color: #C25E4E;
		background-color: #2A954B;
		position: absolute;
		top: 245upx;
		left: 23%;
		border-radius: 8upx;
	}

	.imgTubiao {
		width: 15%;
		height: 21upx;
		position: absolute;
		left: 9upx;
		top: 10upx;
	}

	.fontClass {
		font-size: 20upx;
		color: #FFFFFF;
		line-height: 42upx;
		height: 42upx;
		position: absolute;
		left: 34upx;
		top: 1upx;
		/* #ifdef H5 */
		top: -3upx;
		/* #endif */
		/* #ifndef H5 */
		top: 1upx;
		/* #endif */
	}

	.editClass {
		//修改按钮
		width: 40upx;
		height: 40upx;
		margin-left: 17upx;
		margin-top: 25upx;
	}

	.myBox {
		//包括我的收藏，我的订单，我的历史
		width: 91.47%;
		height: 170upx;
		position: absolute;
		left: 4.27%;
		top: 341upx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		border-radius: 12upx;
	}

	.collection {
		//我的收藏
		width: 33.33%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.imgStyle1 {
		width: 70upx;
		height: 70upx;
		margin-top: 31upx;
	}

	.order {
		//我的订单
		width: 33.33%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.imgStyle2 {
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
	}

	.history {
		//我的历史
		width: 33.34%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.imgStyle3 {
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
	}

	.myFont {
		//文字的样式
		color: #2C2D2D;
		height: 27upx;
		line-height: 27upx;
		font-size: 28upx;
		font-family: SourceHanSansSC-Regular;
		margin-top: 22upx;
		text-align: center;
	}

	.advertClass {
		//广告
		width: 91.47%;
		height: 160upx;
		margin-top: 42upx;
		margin-left: 4.27%;
	}

	.serviceBox {
		//更多服务
		width: 91.47%;
		padding-bottom: 10upx;
		//height: 510upx;
		//height: 390upx;
		background-color: #FFFFFF;
		border-radius: 12upx;
		margin-top: 10upx;
		margin-left: 4.27%;
		display: flex;
		flex-direction: column; //column:纵向排列，row横向排列
		margin-bottom: 30upx;
	}

	.lineClass {
		//更多服务下面的分隔线
		border-top: 2upx solid #EAEAEA;
		width: 90%;
		margin: 30upx 5% 20upx 5%;
	}

	.moreClass {
		font-size: 32upx;
		font-weight: bold;
		color: #000000;
		margin-top: 34upx;
		margin-left: 3.55%;
	}

	.boxClass {
		width: 100%;
		// border: 1upx solid red;
		display: flex;
		flex-direction: row; //column:纵向排列，row横向排列
	}

	.itemClass {
		width: 25%;
		// border: 1upx solid black;
		display: flex;
		flex-direction: column; //column:纵向排列，row横向排列
		margin-bottom: 30upx;
	}

	//图标样式开始
	//第一排
	.XXGLicon {
		width: 50upx;
		height: 54upx;
		margin: 30upx 60upx 16upx 60upx;
	}

	.ZDPZicon {
		width: 48upx;
		height: 50upx;
		margin: 30upx 60upx 20upx 60upx;
	}

	.WDTSicon {
		width: 42upx;
		height: 50upx;
		margin: 30upx 60upx 20upx 60upx;
	}

	.JJLXRicon {
		width: 45upx;
		height: 50upx;
		margin: 30upx 60upx 20upx 60upx;
	}

	//第二排
	.SMRZicon {
		width: 44upx;
		height: 50upx;
		margin: 30upx 60upx 20upx 60upx;
	}

	.GHSJHicon {
		width: 38upx;
		height: 50upx;
		margin: 30upx 60upx 20upx 60upx;
	}

	.DHKFicon {
		width: 41upx;
		height: 50upx;
		margin: 30upx 60upx 20upx 60upx;
	}

	.YJFKicon {
		width: 41upx;
		height: 50upx;
		margin: 30upx 60upx 20upx 60upx;
	}

	//第三排
	.QQKFicon {
		width: 43upx;
		height: 50upx;
		margin: 30upx 60upx 20upx 60upx;
	}

	.ZXKFicon {
		width: 45upx;
		height: 50upx;
		margin: 30upx 60upx 20upx 60upx;
	}

	//图标样式结束	
	.btnClass {
		width: 11upx;
		height: 22upx;
		position: absolute;
		left: 610upx;
		top: 43upx;
	}

	.fontStyle {
		font-size: 28upx;
		color: #2C2D2D;
		width: 100%;
		text-align: center;
	}

	.borderTop {
		border-top: 1upx solid #EAEAEA;
	}

	.mb {
		margin-bottom: 10upx;
	}

	//弹窗
	.popup_overlay {
		position: fixed;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 1001;
		-moz-opacity: 0.8;
		opacity: .80;
		filter: alpha(opacity=88);
	}

	.popup_content {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 520upx;
		height: 400upx;
		margin-left: -270upx;
		margin-top: -270upx;
		border: 10px solid white;
		background-color: white;
		z-index: 1002;
		overflow: auto;
		border-radius: 20upx;
	}

	.popup_title {
		padding-top: 20upx;
		width: 480upx;
		text-align: center;
		font-size: 32upx;
	}

	.popup_textarea_item {
		padding-top: 5upx;
		height: 240upx;
		width: 440upx;
		// background-color: #F1F1F1;
		margin-top: 30upx;
		margin-left: 20upx;
	}

	.popup_textarea {
		width: 410upx;
		font-size: 26upx;
		margin-left: 20upx;
	}

	.popup_button {
		color: white;
		background-color: #4399FC;
		border-radius: 20upx;
		margin-top: 83upx;
		margin-left: 5%;
	}

	.inputClass {
		height: 40upx;
		line-height: 40upx;
		font-size: 32upx;
		margin-top: 50upx;
		margin-left: 8%;
	}

	.contactClass {
		position: absolute;
		width: 100%;
		height: 140upx;
		opacity: 0;
	}

	// .contactClass::after{
	// 	border: none; 
	// }
</style>
