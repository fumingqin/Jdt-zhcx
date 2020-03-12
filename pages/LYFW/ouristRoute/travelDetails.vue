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
				<input class="reply_input" type="text" placeholder="回复点什么吧" v-model="replyInput.content" />
			</view>
			<!-- 评论区 -->
			<view class="replyClass" v-for="(item,index) in replyContent" v-if="index<3" :key="index">
				<image class="replyPortrait" :src="item.portrait" mode="aspectFill"></image>
				<view class="replyRight">
					<text class="replyName">{{item.scennicName}}</text>
					<text class="replyDate">{{item.date}}</text>
					<view class="replyBtn" :class="{active: item.fabulous_state}">
						<text class="jdticon icon-dianzan-ash"></text>
						<text style="color: #aaa;">{{item.fabulous}}</text>
					</view>
					<text class="replyCon">{{item.content}}</text>
				</view>
			</view>
			<view class="replyViewreply" @click="navTo('/pages/LYFW/ouristRoute/toreply')">
				<text> 查看{{replyContent.length}}条回复 ></text>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
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

		methods: {
			//读取静态数据json.js
			async routeInit() {
				let routeComment = await this.$api.lyfwcwd('routeComment');
				this.picList = routeComment.data.image;
				this.titleClick = routeComment.data;
				let userRoute = await this.$api.lyfwcwd('userRoute');
				this.userRoute = userRoute.data;
				let userInfo = await this.$api.lyfwcwd('userInfo');
				this.userInfo = userInfo.data;
				this.replyInput.portrait = userInfo.data.portrait;
				let replyContent = await this.$api.lyfwcwd('reply');
				this.replyContent = replyContent.data;
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

			// async weida (){
			// 	let test =await this.$api.lyfwcwd('test');
			// 	var xiaocai = test.data;
			// 	let a = xiaocai.filter(item => {
			// 	     return item.day == 1;
			// 	    })
			// 	this.day1 = a;
			// 	let b = xiaocai.filter(item => {
			// 	     return item.day == 2;
			// 	    })
			// 	this.day2 = b;

			// },
			//保存图片至本地并打开新页面
			goImgList() {
				uni.setStorageSync('imagePiclist', this.picList);
				uni.navigateTo({
					url: '/pages/LYFW/currency/imglist'
				})
			},

			//景点内容点击
			godetail: function(value) {
				uni.showToast({
					title: '你点击了' + value,
					icon: 'none'
				})
				setTimeout(function() {
					uni.navigateTo({
						url: 'touristroute'
					})
				}, 500);

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
			color: #333333;
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
			color: #333333;
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
			color: #333333;
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
			font-size: 34upx;
			letter-spacing: 2upx;
			color: #333333;
			// bottom : 72upx;
			padding: 32upx 32upx;
		}
	}

	//回复样式
	.replyComment{
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
				left: 126upx;
				width: 72%;
				height: 80upx;
				border-radius: 56rpx;
				top: 151upx;
			}
		}
		// 评论区
		.replyClass{
			display: flex;
			position: relative;
			top: 284upx;
			.replyPortrait{
				position: absolute;
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				border-radius: 100upx;
				left: 30upx;
			}
			.replyRight{
				position: relative;
				left: 128upx;
				.replyName{
					display: block;
					font-size: 30upx;
					color: #aaa;
				}
				.replyDate{
					display: block;
					font-size: 30upx;
					color: #aaa;
				}
				.replyBtn{
					display: flex;
					align-items:base-line;
					position: absolute;
					top: 18upx;
					font-size: 32upx;
					padding-left: 506upx;
					.jdticon{
						font-size: 38upx;
						margin-left: 8upx; 
						color: #aaa;
					}
				}
				.replyCon{
					display: flex;
					font-size: 30upx;
					color: #333;
					padding-top:32upx;
					padding-right:171upx;
					padding-bottom: 43upx;
				}
			}
		}
		// 更多回复消息
		.replyViewreply{
			position: relative;
			height: 56upx;
			font-size: 30upx;
			text-align: center;
			margin-bottom: 200upx;
			background: #FFFFFF;
			top: 301upx;
		}
	}
	
	

	
</style>
