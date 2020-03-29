<template>
	<view>
		<!-- 顶部轮播图（可点击进入相册并放大） -->
		<swiper class="swi" circular autoplay>
			<swiper-item class="swiItem" v-for="(item,index) in picList" :key="index" @click="goImgList">
				<image :src="item.src" />
				<!-- <view class="view">{{imgnumber}}</view> -->
			</swiper-item>
		</swiper>

		<!-- 标题、发布时间-->
		<view class="titleClass">
			<text class="title">{{titleClick.scenicName}}</text>
			<text class="date">{{titleClick.date}}&nbsp;&nbsp;{{titleClick.time}}</text>
			<view class="cost1">￥<text class="cost2">{{titleClick.cost}}</text>元</view>
			<view class="grClass">
				<image class="txImage" :src="titleClick.image" mode="aspectFill"></image>
				<view class="grView">
					<view class="name">{{titleClick.name}}<text class="ladelView" style="background-color: #0CA1DF;">官方</text></view>
					<text class="number">电话：{{titleClick.number}}</text>
				</view>
				<text class="address">|&nbsp;&nbsp;&nbsp;{{titleClick.address}}</text>
			</view>
		</view>

		<!-- 顶部滑动 -->
		<view class="screen">
			<view class="screenView">
				<view class="screenText" :class="{current:type===0}" @click="tabClick(0)">
					景区安排
				</view>
				<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
					行程安排
				</view>
				<view class="screenText" :class="{current:type===2}" @click="tabClick(2)">
					费用说明
				</view>
				<view class="screenText" :class="{current:type===3}" @click="tabClick(3)">
					预订须知
				</view>
			</view>
		</view>

		<!-- 行程安排 -->
		<view v-if="type==0">
			<view class="content" v-for="(item,index) in arrangeText" :key="index">
				<view class="circle" style="background-color: #D8F3FF;">
					<text class="circleDay">D{{item.day}}</text>
					<text class="title">{{item.title}}</text>
				</view>
				<view class="contentView">
					<view class="hotel">
						<image class="iconHotel" src="../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/酒店.png"></image>
						<text class="hotelText">酒店:&nbsp;{{item.hotel}}</text>
					</view>
					<view class="hotel">
						<image class="iconHotel" src="../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/用餐.png"></image>
						<text class="hotelText">用餐:&nbsp;{{item.dinnerTime}}</text>
					</view>
				</view>
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
				type: 0,
				arrangeText: [], //行程安排标题内容数组
				arrangeContent: [], //行程安排内容数组
			}
		},

		onLoad() {
			this.routeInit();
			// this.dayInit();
		},

		methods: {
			//读取静态数据json.js
			async routeInit() {
				let routeComment2 = await this.$api.lyfwcwd('routeComment2');
				this.picList = routeComment2.data.image;
				let travel = await this.$api.lyfwcwd('travel');
				this.titleClick = travel.data;
				let arrange = await this.$api.lyfwcwd('arrange');
				this.arrangeText = arrange.data;
			},

			//保存图片至本地并打开新页面
			goImgList() {
				uni.setStorageSync('imagePiclist', this.picList);
				uni.navigateTo({
					url: '/pages/LYFW/currency/imglist'
				})
			},

			tabClick(e) {
				if (e == 0) {
					this.type = 0;
				} else if (e == 1) {
					this.type = 1;
				} else if (e == 2) {
					this.type = 2;
				} else if (e == 3) {
					this.type = 3;
				}

			},

			//过滤循环
			// async dayInit() {
			// 	let arrange = await this.$api.lyfwcwd('arrange');
			// 	var routeDay = arrange.data;
			// 	//第一天
			// 	let dayIndex1 = routeDay.filter(item => {
			// 		return item.day == 1;
			// 	})
			// 	this.day1 = dayIndex1;
			// 	// console.log(dayIndex1)
			// 	//第二天
			// 	let dayIndex2 = routeDay.filter(item => {
			// 		return item.day == 2;
			// 	})
			// 	this.day2 = dayIndex2;
			// },


		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}

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


	//标题
	.titleClass {
		position: relative;
		padding-top: 29upx;
		border-radius:27upx 27upx 0 0;
		width: 100%;
		background-color: #FFFFFF;
		margin-top: -25upx;
		
		.title {
			display: flex;
			color: #333333;
			font-size: 44upx;
			font-weight: bold;
			margin-right: 40upx;
			padding-left: 40upx;
		}

		.date {
			display: flex;
			font-size: 28upx;
			padding-top: 29upx;
			padding-left: 40upx;
			color: #aba9aa;
		}

		.cost1 {
			position: absolute;
			padding-top: 29upx;
			font-size: 30upx;
			color: #FC4646;
			top: 99upx;
			left: 558upx;

			.cost2 {
				font-size: 40upx;
				color: #FC4646;
			}
		}

		.grClass {
			display: flex;
			margin-top: 19upx;

			// padding-right: 40upx;
			.txImage {
				border-radius: 50%;
				width: 88upx;
				height: 88upx;
				padding-left: 40upx;
				padding-top: 50upx;
				padding-bottom: 32upx;
			}

			.grView {
				padding-left: 25upx;
				padding-top: 49upx;

				.name {
					display: flex;
					font-size: 32upx;
					color: #333333;

					.ladelView {
						border-radius: 4px;
						padding: 9upx 20upx;
						margin-left: 11upx;
						font-size: 20upx;
						color: #FFFFFF;
						text-align: center;
					}
				}

				.number {
					display: block;
					font-size: 28upx;
					color: #aba9aa;
					padding-top: 10upx;
				}
			}

			.address {
				// position: relative;
				font-size: 32upx;
				color: #333333;
				padding-left: 195upx;
				padding-top: 60upx;
			}
		}

		.ladel {
			display: flex;
			border-radius: 2px;
			font-size: 20upx;
			color: #FFFFFF;
		}
	}

	//筛选样式
	.screen {
		background: #FFFFFF;


		.screenView {
			left: 0;
			display: flex;
			width: 100%;
			height: 97upx;
			background: #fff;
			z-index: 10;
			position: sticky;
			top: 0;
			// background-color: #F5F5F5;
			margin-top: 20upx;

			.screenText {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30upx;
				color: #888;
				position: relative;



				&.current {
					color: #06B4FD;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 104upx;
						height: 0;
						border-bottom: 4upx solid #06B4FD;
					}
				}
			}
		}
	}

	// 行程安排样式
	.content {
		background: #FFFFFF;
		padding-left: 40upx;
		padding-top: 56upx;

		.circle {
			// position: relative;
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			border: 2px #06B4FD solid;

			.circleDay {
				font-size: 28upx;
				color: #06B4FD;
				padding: 19upx 14upx;
			}

			.title {
				// display: flex;
				position: absolute;
				font-size: 40upx;
				color: #333333;
				font-weight: bold;
				padding-left: 31upx;
			}
		}

		.contentView {
			margin-top: 50upx;
			margin-left: 32upx;
			border-left: 2upx dashed rgba(200, 200, 200, 1);
			.hotel {
				padding-left: 71upx;
				padding-bottom: 30upx;
				.iconHotel {
					width: 39upx;
					height: 33upx;
				}
				.hotelText {
					font-size: 30upx;
					color: #aba9aa;
					margin-left: 18upx;
				}
			}
		}
	}
</style>
