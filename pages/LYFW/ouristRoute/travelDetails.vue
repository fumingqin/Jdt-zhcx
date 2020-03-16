<template>
	<view>
		<!-- 顶部轮播图（可点击进入相册并放大） -->
		<swiper class="swi" circular autoplay>
			<swiper-item class="swiItem" v-for="(item,index) in picList" :key="index" @click="goImgList">
				<image :src="item.src" />
				<!-- <view class="view">{{imgnumber}}</view> -->
			</swiper-item>
		</swiper>

		<!-- 白色背景内容 -->
		<view class="whiteBg">
		</view>

		<!-- 标题、发布时间、点击量、分享 -->
		<view class="content">
			<text class="title">{{titleClick.title}}</text>
			<text class="timeHits">{{titleClick.time}}&nbsp;&nbsp;{{titleClick.clicks}}次游览</text>
		</view>

		<!-- 头像、名称、签名、地址 -->
		<view class="portrait">
			<image class="headImage" :src="titleClick.headImage" />
			<view class="nickName">{{titleClick.nickName}}</view>
			<view class="autograph">{{titleClick.autograph}}</view>
			<view class="address">|&nbsp;&nbsp;&nbsp;{{titleClick.address}}</view>

		</view>
		<!-- 第一天 -->
		<view class="userRoute" v-if="day1.length == 2">
			<text class="days">第&nbsp;一&nbsp;天</text>
			<text class="routeAddress">----&nbsp;{{day1[0].address}}&nbsp;----</text>
			<!-- 用户旅游路线 -->
			<view class="routeDetails" v-for="(item,index) in day1" :key="index" @click="godetail(item.scenicName)">
				<view class="routeItem">
					<image class="routeImage" :src="item.image" />
					<image class="icon" :src="item.icon" />
					<text class="routeName">{{item.scenicName}}</text>
					<text class="playTime">{{item.playtime}}</text>
					<text class="start">{{item.start}}</text>
					<text class="scenicContent">{{item.scenicContent}}</text>
				</view>
			</view>
			<!-- 灰线 -->
			<text class="grayLine" style="height: 149px;width: 2px;background-color: #DDDDDD;" />
		</view>

		<!-- 第二天 -->
		<view class="userRoute2" v-if="day2.length == 2">
			<text class="days2">第&nbsp;二&nbsp;天</text>
			<text class="routeAddress2">----&nbsp;{{day2[0].address}}&nbsp;----</text>
			<!-- 用户旅游路线 -->
			<view class="routeDetails2" v-for="(item,index) in day2" :key="index" @click="godetail(item.scenicName)">
				<view class="routeItem2">
					<image class="routeImage2" :src="item.image" />
					<image class="icon2" :src="item.icon" />
					<text class="routeName2">{{item.scenicName}}</text>
					<text class="playTime2">{{item.playtime}}</text>
					<text class="start2">{{item.start}}</text>
					<text class="scenicContent2">{{item.scenicContent}}</text>
				</view>
			</view>
			<!-- 灰线 -->
			<text class="grayLine2" style="height: 149px;width: 2px;background-color: #DDDDDD;" />
		</view>

		<!-- 第三天 -->
		<view class="userRoute3" v-if="day3.length == 2">
			<text class="days3">第&nbsp;三&nbsp;天</text>
			<text class="routeAddress3">----&nbsp;{{day3[0].address}}&nbsp;----</text>
			<!-- 用户旅游路线 -->
			<view class="routeDetails3" v-for="(item,index) in day3" :key="index" @click="godetail(item.scenicName)">
				<view class="routeItem3">
					<image class="routeImage3" :src="item.image" />
					<image class="icon3" :src="item.icon" />
					<text class="routeName3">{{item.scenicName}}</text>
					<text class="playTime3">{{item.playtime}}</text>
					<text class="start3">{{item.start}}</text>
					<text class="scenicContent3">{{item.scenicContent}}</text>
				</view>
			</view>
			<!-- 灰线 -->
			<text class="grayLine3" style="height: 149px;width: 2px;background-color: #DDDDDD;" />
		</view>

		<!-- 文章内容 -->
		<view class="articleAontent">
			<view class="routeTitle">介绍</view>
			<text class="routeContent" style="text-indent:2em;">{{titleClick.scenicContent}}</text>
		</view>

		<!-- 回复 -->
		<view class="replyComment">
			<view class="replyTitle">回复</view>
			<view class="replyBox">
				<image class="replyImage" :src="'../../../static/LYFW/peripheralTourism/user/missing-face.png'" mode="aspectFill"></image>
				<input class="reply_input" type="text" placeholder="回复点什么吧" v-model="replyInput.content" @confirm="publish" />
			</view>
			<!-- 评论区 -->
			<view class="replyClass" v-for="(item,index) in replyContent" v-if="index<3" :key="index">
				<image class="replyPortrait" :src="item.portrait" mode="aspectFill"></image>
				<view class="replyRight">
					<text class="replyName">{{item.scennicName}}</text>
					<text class="replyDate">{{item.date}}</text>
					<view class="replyBtn" :class="{active: item.fabulousState}" @click="tofabulous(index)">
						<text class="jdticon icon-dianzan-ash"></text>
						<text style="color: #aaa;">{{item.fabulous}}</text>
					</view>
					<text class="replyCon">{{item.content}}</text>
				</view>
			</view>
			<view class="replyViewreply" @click="navTo('/pages/LYFW/ouristRoute/toreply')">
				<text> 查看{{replyContent.length}}条回复 ></text>
			</view>

			<!-- 底部操作菜单 -->
			<view class="pageBottom">
				<!-- 收藏 -->
				<view class="CollectionBtn" :class="{active: titleClick.collectionState}" @click="toFavorite1">
					<text class="jdticon icon-shoucang2"></text>
					<text>{{titleClick.collection}}</text>
				</view>
				<!-- 喜欢 -->
				<view class="CollectionBtn" :class="{active: titleClick.likeState}" @click="toFavorite2">
					<text class="jdticon icon-shoucang"></text>
					<text>{{titleClick.like}}</text>
				</view>
				<!-- 评论 -->
				<view class="CollectionBtn" :class="{active: titleClick.commentState}" @click="navTo('/pages/LYFW/ouristRoute/toreply')">
					<text class="jdticon icon-pinglun-copy"></text>
					<text>{{replyContent.length}}</text>
				</view>

				<view class="action-btn-group">
					<button type="primary" class="actionBtn" @click="open">查看景点</button>
					<!-- 嵌套弹框组件popup -->
					<uni-popup ref="popup" type="bottom">
						<view>
							<scroll-view class="popupScrollview" scroll-y="ture">
								<view class="routeTitle2">文中提及的地点</view>
								<view class="tkItem" v-for="(item,index) in touristRoute2" :key="index" @click="godetail(item.scennicName)">
									<image class="tkImage" :src="item.image" mode="" />
									<view class="tkBacg">
										<text class="tkText1">{{item.scennicName}}</text>
										<text class="tkText2">{{item.related}}篇点评</text>
										<text class="tkText3">位于{{item.attribute}}</text>
									</view>
								</view>
								<view class="routeTitle2">周边景点</view>
								<view class="tkItem" v-for="(item,index) in touristRoute3" :key="index" @click="godetail(item.scennicName)">
									<image class="tkImage" :src="item.image" mode="" />
									<view class="tkBacg">
										<text class="tkText1">{{item.scennicName}}</text>
										<text class="tkText2">{{item.related}}篇点评</text>
										<text class="tkText3">位于{{item.attribute}}</text>
									</view>
								</view>
							</scroll-view>
						</view>
					</uni-popup>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		data() {
			return {
				index: '',
				comment_index: '',
				is_reply: false, //回复还是评论
				showInput: false, //评论输入框
				touristRoute: [],
				touristRoute2: [],
				touristRoute3: [],
				picList: [], //相册图片数组
				titleClick: '', //标题,点击量
				headImage: '', //用户头像
				nickName: '', //用户名称
				autograph: '', //用户签名
				address: '', //用户地址
				userRoute: [], //用户路线
				day1: [], //第一天
				day2: [], //第二天
				day3: [], //第三天
				replyContent: [], //回复内容
				//评论内容
				replyInput: {
					unid: '', //用户id号
					nickname: '', //用户姓名
					portrait: '', //用户头像
					content: '', //回复内容
					date: '', //回复日期
					fabulous: 0, //点赞数
					fabulouState: false, //点赞状态
				}
			}
		},
		onLoad() {
			this.routeInit();
			this.dayInit();
		},
		onNavigationBarButtonTap : function() {
					 this.share();
		},
		// onShareAppMessage(res){
		// 	  if (res.from === 'menu') {// 来自页面内分享按钮
		// 	     return{
		// 	     	title : '来自'+this.touristRoute.nickName+'的分享',
		// 			imageUrl : this.touristRoute.image[0].src,
		// 			success: function () {
		// 			    uni.showToast({
		// 			    	title:'分享成功',
		// 					duration : 3000
		// 			    })
		// 			},
		// 			fail: function () {
		// 			    uni.showToast({
		// 			    	title:'分享失败',
		// 					duration : 3000
		// 			    })
		// 			}
		// 	     }
		// 	    }
				
		// },
		methods: {
			//读取静态数据json.js
			async routeInit() {
				let routeComment2 = await this.$api.lyfwcwd('routeComment2');
				this.picList = routeComment2.data.image;
				let routeComment = await this.$api.lyfwcwd('routeComment');
				this.titleClick = routeComment.data;
				let userRoute = await this.$api.lyfwcwd('userRoute');
				this.userRoute = userRoute.data;
				let userInfo = await this.$api.lyfwcwd('userInfo');
				this.userInfo = userInfo.data;
				this.replyInput.portrait = userInfo.data.portrait;
				let replyContent = await this.$api.lyfwcwd('reply');
				this.replyContent = replyContent.data;
				let tourist_route = await this.$api.lyfwcwd('touristRoute');
				this.touristRoute = tourist_route.data;
				let tourist_route2 = await this.$api.lyfwcwd('touristRoute2');
				this.touristRoute2 = tourist_route2.data;
				let tourist_route3 = await this.$api.lyfwcwd('touristRoute3');
				this.touristRoute3 = tourist_route3.data;
				// console.log(this.replyInput.portrait)
			},

			//过滤循环
			async dayInit() {
				let userRoute = await this.$api.lyfwcwd('userRoute');
				var routeDay = userRoute.data;
				//第一天
				let dayIndex1 = routeDay.filter(item => {
					return item.day == 1;
				})
				this.day1 = dayIndex1;
				// console.log(dayIndex1)
				//第二天
				let dayIndex2 = routeDay.filter(item => {
					return item.day == 2;
				})
				this.day2 = dayIndex2;
				//第三天
				let dayIndex3 = routeDay.filter(item => {
					return item.day == 3;
				})
				this.day3 = dayIndex3;
			},


			//保存图片至本地并打开新页面
			goImgList() {
				uni.setStorageSync('imagePiclist', this.picList);
				uni.navigateTo({
					url: '/pages/LYFW/currency/imglist'
				})
			},
			
			// sendSomment: function(index){
			// 	if(this.replyContent[index].unidState == false){
			// 		this.replyContent[index].unidState = true;
			// 		var num = this.replyContent[index].unid;
			// 		this.replyContent[index].unid = num + 1;
			// 	}else{
			// 		this.replyContent[index].unidState = false;
			// 		var num = this.replyContent[index].unid;
			// 		this.replyContent[index].unid = num - 1;
			// 	}
			// 	this.replyContent[this.index].replyContent.data.push({
			// 		"unid":this.unid,
			// 		"nickname":this.scennicName,
			// 		"content":replyContent
					
			// 	})
			// },
			
			
			// 点赞事件
			tofabulous: function(index) {
				if (this.replyContent[index].fabulousState == false) {
					this.replyContent[index].fabulousState = true;
					var num = this.replyContent[index].fabulous;
					this.replyContent[index].fabulous = num + 1;
				} else {
					this.replyContent[index].fabulousState = false;
					var num = this.replyContent[index].fabulous;
					this.replyContent[index].fabulous = num - 1;
				};
			},
			// 底部图标收藏/喜欢/评论事件
			toFavorite1: function() {
				if (this.titleClick.collectionState == false) {
					this.titleClick.collectionState = true;
					var num = this.titleClick.collection;
					this.titleClick.collection = num + 1;
				} else {
					this.titleClick.collectionState = false;
					var num = this.titleClick.collection;
					this.titleClick.collection = num - 1;
				};
			},
			toFavorite2: function() {
				if (this.titleClick.likeState == false) {
					this.titleClick.likeState = true;
					var num = this.titleClick.like;
					this.titleClick.like = num + 1;
				} else {
					this.titleClick.likeState = false;
					var num = this.titleClick.like;
					this.titleClick.like = num - 1;
				};
			},
			// 查看景点按钮弹框事件
			open() {
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open()
			},

			//分享
			// share(){
			// 	uni.share({
			// 	    provider: "weixin",
			// 	    scene: "WXSceneSession",
			// 	    type: 0,
			// 	    href: "http://www.baidu.com",
			// 	    title: "来自"+this.tweets.nickname+"的分享",
			// 	    summary: this.tweets.title,
			// 	    imageUrl: this.tweets.image[0].src,
			// 	    success: function () {
			// 	        uni.showToast({
			// 	        	title:'分享成功',
			// 				duration : 3000
			// 	        })
			// 	    },
			// 	    fail: function () {
			// 	        uni.showToast({
			// 	        	title:'分享失败',
			// 				duration : 3000
			// 	        })
			// 	    }
			// 	}); 
			// },
			
			//回复时间，判断是否登录后才能进行回复
			publish:function(){
				// if(!this.hasLogin){
				// 	uni.showToast({
				// 		title : '请先登录再回复',
				// 		icon : 'none',
				// 	})
				// 	setTimeout(function(){
				// 		uni.navigateTo({
				// 			url  : ''
				// 		})  
				// 	},1500);
				// }else{
					if(this.titleClick.commentState==false){
						this.titleClick.commentState = true;
						uni.showToast({
							title:'回复成功',
						})
						this.replyInput.content = ''; 
					}else{
						uni.showToast({
							title:'回复成功'
						})
						this.replyInput.content = '';
					}
				// }
			},
			
			
			//景点内容点击
			godetail: function(value) {
				// uni.showToast({
				// 	title: '你点击了' + value,
				// 	icon: 'none'
				// })
				setTimeout(function() {
					uni.navigateTo({
						url: 'touristroute'
					})
				}, 500);
			},

			// 统一跳转接口
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss">
	//轮播图样式
	.swi {
		width: 100%;
		height: 440upx;

		.swiItem {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 白色背景模块
	.whiteBg {
		position: relative;
		z-index: 1;
		padding: 80upx 0;
		width: 100%;
		left: 0upx;
		top: -72upx;
		background: #FFFFFF;
		border-radius: 44upx;
	}

	//时间，点击量，标题
	.content {
		display: flex;
		position: relative;
		width: 100%;
		top: -234upx;

		//标题
		.title {
			z-index: 2;
			font-size: 44upx;
			font-weight: bold;
			color: #333333;
			padding: 32upx 32upx;
		}

		.timeHits {
			position: absolute;
			z-index: 3;
			top: 108upx;
			font-size: 28upx;
			color: #333333;
			padding-left: 32upx;
		}
	}

	// 头像、名称、签名、地址
	.portrait {
		display: flex;
		position: relative;
		top: -153upx;
		padding-left: 26upx;

		//头像
		.headImage {
			// position: absolute;
			z-index: 3;
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
		}

		//名字
		.nickName {
			position: absolute;
			z-index: 4;
			font-size: 32upx;
			color: #333333;
			left: 120upx;
			// bottom : 41upx;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 160px;
			top: 6upx;
		}

		//签名
		.autograph {
			position: absolute;
			z-index: 5;
			font-size: 26upx;
			color: #aaa;
			left: 120upx;
			// bottom : 3upx;
			top: 42upx;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 160px;
		}

		.address {
			position: absolute;
			z-index: 6;
			font-size: 34upx;
			color: #333;
			right: 32upx;
			bottom: 21upx;
		}
	}

	//第一天
	.userRoute {
		position: relative;
		top: -105upx;

		.days {
			display: block;
			text-align: center;
			color: #333333;
			font-size: 32upx;
			margin: 20upx 0upx;
		}

		.routeAddress {
			display: block;
			text-align: center;
			color: #AAAAAA;
			font-size: 28upx;
			margin: 20upx 0upx;
		}

		.routeItem {
			display: flex;
			margin: 60upx 0upx;

			.routeImage {
				position: relative;
				z-index: 7;
				width: 280upx;
				height: 264upx;
				left: 441upx;
			}

			.icon {
				position: relative;
				z-index: 9;
				width: 35upx;
				height: 35upx;
				left: -252upx;
			}

			.routeName {
				position: relative;
				z-index: 8;
				font-size: 32upx;
				color: #333333;
				left: -224upx;
				top: -5upx;
				// font-weight: bold;
			}

			.playTime {
				position: absolute;
				z-index: 10;
				font-size: 28upx;
				color: #FF6600;
				left: 89upx;
				padding-top: 59upx;
			}

			.start {
				position: absolute;
				z-index: 11;
				font-size: 24upx;
				color: #FEAD2E;
				left: 89upx;
				padding-top: 120upx;
			}

			.scenicContent {
				position: absolute;
				z-index: 12;
				font-size: 28upx;
				color: #333333;
				width: 335upx;
				left: 89upx;
				padding-top: 176upx;
				line-height: 47upx;
			}
		}

		.grayLine {
			display: block;
			position: absolute;
			top: 163upx;
			left: 40rpx;
		}
	}

	//第二天
	.userRoute2 {
		position: relative;
		top: -78upx;

		.days2 {
			display: block;
			text-align: center;
			color: #333333;
			font-size: 32upx;
			margin: 20upx 0upx;
		}

		.routeAddress2 {
			display: block;
			text-align: center;
			color: #AAAAAA;
			font-size: 28upx;
			margin: 20upx 0upx;
		}

		.routeItem2 {
			display: flex;
			margin: 60upx 0upx;

			.routeImage2 {
				position: relative;
				z-index: 7;
				width: 280upx;
				height: 264upx;
				left: 441upx;
			}

			.icon2 {
				position: relative;
				z-index: 9;
				width: 35upx;
				height: 35upx;
				left: -252upx;
			}

			.routeName2 {
				position: relative;
				z-index: 8;
				font-size: 32upx;
				color: #333333;
				left: -224upx;
				top: -5upx;
				// font-weight: bold;
			}

			.playTime2 {
				position: absolute;
				z-index: 10;
				font-size: 28upx;
				color: #FF6600;
				left: 89upx;
				padding-top: 59upx;
			}

			.start2 {
				position: absolute;
				z-index: 11;
				font-size: 24upx;
				color: #FEAD2E;
				left: 89upx;
				padding-top: 120upx;
			}

			.scenicContent2 {
				position: absolute;
				z-index: 12;
				font-size: 28upx;
				color: #333333;
				width: 335upx;
				left: 89upx;
				padding-top: 176upx;
				line-height: 47upx;
			}
		}

		.grayLine2 {
			display: block;
			position: absolute;
			top: 163upx;
			left: 40rpx;
		}
	}

	//第三天
	.userRoute3 {
		position: relative;
		top: -51upx;

		.days3 {
			display: block;
			text-align: center;
			color: #333333;
			font-size: 32upx;
			margin: 20upx 0upx;
		}

		.routeAddress3 {
			display: block;
			text-align: center;
			color: #AAAAAA;
			font-size: 28upx;
			margin: 20upx 0upx;
		}

		.routeItem3 {
			display: flex;
			margin: 60upx 0upx;

			.routeImage3 {
				position: relative;
				z-index: 7;
				width: 280upx;
				height: 264upx;
				left: 441upx;
			}

			.icon3 {
				position: relative;
				z-index: 9;
				width: 35upx;
				height: 35upx;
				left: -252upx;
			}

			.routeName3 {
				position: relative;
				z-index: 8;
				font-size: 32upx;
				color: #333333;
				left: -224upx;
				top: -5upx;
				// font-weight: bold;
			}

			.playTime3 {
				position: absolute;
				z-index: 10;
				font-size: 28upx;
				color: #FF6600;
				left: 89upx;
				padding-top: 59upx;
			}

			.start3 {
				position: absolute;
				z-index: 11;
				font-size: 24upx;
				color: #FEAD2E;
				left: 89upx;
				padding-top: 120upx;
			}

			.scenicContent3 {
				position: absolute;
				z-index: 12;
				font-size: 28upx;
				color: #333333;
				width: 335upx;
				left: 89upx;
				padding-top: 176upx;
				line-height: 47upx;
			}
		}

		.grayLine3 {
			display: block;
			position: absolute;
			top: 163upx;
			left: 40rpx;
		}
	}

	//推文样式
	.articleAontent {
		display: flex;
		position: relative;
		top: 32upx;

		//推文标题
		.routeTitle {
			position: absolute;
			// flex-direction: column;
			font-size: 38upx;
			font-weight: bold;
			color: #333333;
			// text-overflow:ellipsis;
			// white-space:nowrap;
			// overflow:hidden;
			top: -55upx;
			left: 29upx;
		}

		//推文内容
		.routeContent {
			flex-direction: column;
			// text-indent:2em;
			line-height:25px;
			font-size: 34upx;
			letter-spacing: 2upx;
			color: #333333;
			// bottom : 72upx;
			padding: 32upx 32upx;
		}
	}

	//回复样式
	.replyComment {
		position: relative;

		//标题
		.replyTitle {
			position: absolute;
			font-size: 38upx;
			font-weight: bold;
			color: #333333;
			top: 76upx;
			left: 29upx;
		}

		.replyBox {
			display: flex;

			.replyImage {
				position: absolute;
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				border-radius: 100px;
				left: 30upx;
				top: 149upx;
			}

			.reply_input {
				position: absolute;
				font-size: 32upx;
				color: #333;
				padding-left: 46upx;
				background: #f5f5f5;
				left: 134upx;
				width: 72%;
				height: 80upx;
				border-radius: 56rpx;
				top: 148upx;
			}
		}

		// 评论区
		.replyClass {
			display: flex;
			position: relative;
			top: 284upx;

			.replyPortrait {
				position: absolute;
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				border-radius: 100upx;
				left: 30upx;
			}

			.replyRight {
				position: relative;
				padding-left: 128rpx;

				.replyName {
					display: block;
					font-size: 30upx;
					color: #aaa;
				}

				.replyDate {
					display: block;
					font-size: 30upx;
					color: #aaa;
				}

				.replyBtn {
					display: flex;
					align-items: base-line;
					position: absolute;
					top: 18upx;
					font-size: 32upx;
					padding-left: 506upx;

					.jdticon {
						font-size: 38upx;
						margin-left: 8upx;
						color: #aaa;
					}

					&.active,
					&.active .jdticon {
						color: #28a4ff;
					}
				}

				.replyCon {
					display: flex;
					line-height:20px;
					font-size: 30upx;
					color: #333;
					padding-top: 39upx;
					padding-right: 36upx;
					padding-bottom: 52upx;

				}
			}
		}

		// 更多回复消息
		.replyViewreply {
			position: relative;
			height: 56upx;
			font-size: 30upx;
			text-align: center;
			margin-bottom: 200upx;
			background: #FFFFFF;
			top: 301upx;
		}

		// 底部点击操作样式
		.pageBottom {
			position: absolute;
			position: fixed;
			left: 30upx;
			bottom: 30upx;
			z-index: 95;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 690upx;
			height: 112upx;
			background: rgba(255, 255, 255, .9);
			box-shadow: 0 0 12upx 0 rgba(0, 0, 0, 0.3);
			border-radius: 16upx;

			.CollectionBtn {
				display: flex;
				position: relative;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: $font-sm;
				color: $font-color-base;
				width: 96upx;
				height: 80upx;
				margin: 16upx 16upx;

				.jdticon {
					font-size: 40upx;
					line-height: 48upx;
					color: #333333;
				}

				&.active,
				&.active .jdticon {
					color: #ff4443;
				}

				.icon-fenxiang2 {
					font-size: 42upx;
					transform: translateY(-2upx);
				}

				.icon-shoucang {
					font-size: 46upx;
				}
			}

			// 查看景点
			.action-btn-group {
				display: flex;
				height: 76upx;
				border-radius: 100px;
				overflow: hidden;
				box-shadow: 1px 2px 5px #65bbf9;
				background: linear-gradient(to right, #65bbf9, #28a4ff);
				margin: 20upx 20upx;
				position: relative;

				.actionBtn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 224upx;
					height: 100%;
					font-size: $font-base;
					padding: 0;
					border-radius: 0;
					background: transparent;
				}

				.popupScrollview {
					position: relative;
					width: 100%;
					padding-left: 32upx;
					margin: 0 auto;
					background: #fff;
					height: 876upx;
					.routeTitle2 {
						z-index: 13;
						font-size: 38upx;
						font-weight: bold;
						color: #333333;
						padding-top: 32upx;
					}
					.tkItem{
						display: flex;
						.tkImage{
							width: 182upx;
							height: 152upx;
							border-radius: 12upx;
							margin: 24rpx 0rpx;
						}
						.tkBacg{
							margin-top: 20upx;
							margin-left: 24upx;
							.tkText1{
								display: flex;
								text-overflow:ellipsis; //文章超出宽度隐藏并用...表示
								white-space:nowrap;
								overflow:hidden;
								width:480upx;//内容宽度
							}
							.tkText2{
								display: flex;
								text-overflow:ellipsis; //文章超出宽度隐藏并用...表示
								font-size: 26upx;
								margin-top: 20upx;
								display: block; // 让字体换行
							}
							.tkText3{
								display: flex;
								text-overflow:ellipsis; //文章超出宽度隐藏并用...表示
								font-size: 24upx;
								margin-top: 28upx;
								color: #AAAAAA;
								display: block; // 让字体换行
							}
						}
					}
				}
			}
		}
	}
</style>
