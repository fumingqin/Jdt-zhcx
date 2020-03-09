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

		<view class="userRoute" v-if="day1.length == 2">
			<text class="day">第&nbsp;一&nbsp;天</text>
			<text class="routeAddress">----&nbsp;{{day1[0].address}}&nbsp;----</text>
			<!-- 用户旅游路线 -->
			<view class="routeDetails" v-for="(item,index) in userRoute" :key="index">
				<view class="routeItem">
					<image class="routeImage" :src="item.image" />
					<!-- <image class="icon" :src="item.icon" /> -->
					<text class="routeName">{{item.scenicName}}</text>
				</view>
			</view>
		</view>


		<!-- <view v-if="day1.length == 2">
			第一天 
			{{day1[0].address}}
			<text v-for="(item,index) in day1" :key="index">
			</text>
		</view>
		<view v-if="day2.length == 2">
			第二天 
			<text v-for="(item,index) in day2" :key="index">
				天数：{{item.day}}
				地址：{{item.address}}
			</text>
		</view> -->

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


				// console.log(test)
			},

			//过滤循环
			async dayInit() {
				let userRoute = await this.$api.lyfwcwd('userRoute');
				var routeDay = userRoute.data;
				let dayIndex1 = routeDay.filter(item => {
					return item.day == 1;
				})
				this.day1 = dayIndex1;
				// console.log(dayIndex1)
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
	
	
	.userRoute{
		position: relative;
		top: -105upx;
		.day{
			display: block;
			text-align:center;
			color: #333333;
			font-size: 32upx;
			margin: 20upx 0upx;
		}
		.routeAddress{
			display: block;
			text-align:center;
			color: #333333;
			font-size: 28upx;
			margin: 20upx 0upx;
		}
		.routeItem {
			display: flex;
			margin: 35upx 0upx;
		
			.routeImage {
				position: relative;
				z-index: 7;
				width: 280upx;
				height: 264upx;
				left: 441upx;
			}
		
			.icon {
				
			}
			.routeName {
				position: relative;
				z-index: 8;
				font-size: 32upx;
				color: #333333;
				left: -182upx;
				top: -1upx;
				// font-weight: bold;
			}
		}
	}
</style>
