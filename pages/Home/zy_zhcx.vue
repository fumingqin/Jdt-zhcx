<template>
	<view>
		<!-- 轮播图-->
		<swiper class="swi" circular autoplay>
			<swiper-item class="swiItem" v-for="(item,index) in homePage" :key="index">
				<image :src="item.hp_img" mode="aspectFill" />
			</swiper-item>
		</swiper>

		<swiper class="zl_swi" :indicator-dots="true" indicator-active-color="#70c778" indicator-color="#f6f6f6">
			<swiper-item class="swiItem">
				<view class="zl_topClick">
					<!-- 车票订购 -->
					<view class="zl_ticketOrdering">
						<image class="zl_toImage" src="../../static/Home/CPDG.png"></image>
						<text class="zl_toText">车票订购</text>
					</view>
					<!-- 新区专线 -->
					<view class="zl_carAppointment">
						<image class="zl_caImage" src="../../static/Home/XQZX.png"></image>
						<text class="zl_caText">新区专线</text>
					</view>
					<!-- 公交查询 -->
					<view class="zl_transit">
						<image class="zl_tsImage" src="../../static/Home/GJCX.png"></image>
						<text class="zl_tsText">公交查询</text>
					</view>
					<!-- 包车服务 -->
					<view class="zl_charterService">
						<image class="zl_csImage" src="../../static/Home/BCFW.png"></image>
						<text class="zl_csText">包车服务</text>
					</view>
					<!-- 景区门票 -->
					<view class="zl_tourismServices">
						<image class="zl_teImage" src="../../static/Home/serve/jqgoupiao.png"></image>
						<text class="zl_teText">景区门票</text>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiItem">
				<view class="zl_topClick">
					<!-- 旅游产品 -->
					<view class="zl_ticketOrdering">
						<image class="zl_toImage" src="../../static/Home/serve/jqgoupiao.png"></image>
						<text class="zl_toText">旅游产品</text>
					</view>
					<!-- 预约检测 -->
					<view class="zl_carAppointment">
						<image class="zl_caImage" src="../../static/Home/serve/jqgoupiao.png"></image>
						<text class="zl_caText">预约检测</text>
					</view>
					<!-- 自由行 -->
					<view class="zl_ticketOrdering">
						<image class="zl_toImage" src="../../static/Home/serve/jqgoupiao.png"></image>
						<text class="zl_toText">自由行</text>
					</view>
					<!-- 跟团游 -->
					<view class="zl_ticketOrdering">
						<image class="zl_toImage" src="../../static/Home/serve/jqgoupiao.png"></image>
						<text class="zl_toText">跟团游</text>
					</view>
					<!-- 村村通 -->
					<view class="zl_ticketOrdering">
						<image class="zl_toImage" src="../../static/Home/serve/jqgoupiao.png"></image>
						<text class="zl_toText">村村通</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
		</swiper>

		<!-- 咨询动态 -->
		<view class="notice">
			<view class="zl_content">
				<image class="zl_noImage" src="../../static/GRZY/zixundongtai.png" mode="aspectFill"></image>
				<view class="zl_noContent">
					<text class="zl_noText">{{Announcement.zl_title}}</text>
					<view class="zl_label">
						<view class="la_label" v-for="(item,index) in Announcement.LabelContent" :key="index" v-if="index<2">
							<text class="la_background" style="background-color: #e2f1fa;border-radius:20px;" @click="Jump">{{item.lc_text}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 旅游推荐 -->
		<view class="zl_recommend">
			<view>
				<view class="zl_reContent">
					<text class="zl_reTitle">旅游推荐</text>
					<!-- <text class="zl_reMore">更多></text> -->
				</view>
			</view>
			<view class="zl_reContent2">
				<view class="zl_contentImage1">
					<!-- 泉州小西埕 -->
					<view class="ct_content1" @click="godetail(sixPalaceList[0].ticketId)">
						<image class="ct_image1" :src="sixPalaceList[0].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text1" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">{{sixPalaceList[0].ticketTitle}}</text>
					</view>
					<!-- 稻田摸鱼 -->
					<view class="ct_content2" @click="godetail(sixPalaceList[1].ticketId)">
						<image class="ct_image2" :src="sixPalaceList[1].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text2" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[1].ticketTitle}}</text>
					</view>
				</view>

				<view class="zl_contentImage2">
					<!-- 泉州钟楼 -->
					<view class="ct_content3" @click="godetail(sixPalaceList[2].ticketId)">
						<image class="ct_image3" :src="sixPalaceList[2].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text3" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[2].ticketTitle}}</text>
					</view>
					<!-- 泉州洛阳桥 -->
					<view class="ct_content4" @click="godetail(sixPalaceList[3].ticketId)">
						<image class="ct_image4" :src="sixPalaceList[3].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text4" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[3].ticketTitle}}</text>
					</view>
					<!-- 七彩官畲 -->
					<view class="ct_content5" @click="godetail(sixPalaceList[4].ticketId)">
						<image class="ct_image5" :src="sixPalaceList[4].ticketImage[0]" mode="aspectFill"></image>
						<text class="ct_text5" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;width: 124upx;">{{sixPalaceList[4].ticketTitle}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 新闻资讯 -->
		<view class="titNp">新闻资讯</view>
		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="informationTo(item.aid)">
				<view class="image-wrapper">
					<image :src="item.imageUrl" mode="aspectFill"></image>
				</view>
				<view class="title clamp">{{item.title}}</view>
				<view>
					<image class="Portrait" src="../../static/GRZY/missing-face.png" mode="aspectFill"></image>
					<text class="price">{{item.reportTime}}</text>
					<text class="price-zan">阅读{{item.viewsCount+1080}}</text>
				</view>
			</view>
		</view>

		<view style="width: 100%; float: left; text-align: center; font-size: 24upx; margin: 16upx 0; color: #aaa;">
			<text v-if="current==0" :hidden="disStatus== 1">{{loadingType== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
			<text v-if="current==0" :hidden="disStatus== 0">暂无历史数据</text>
		</view>

		<!-- tab按钮 -->
		<!-- <view class="zc_TabBackground">
			<view class="tb_tab">
				<view class="tb_button">
					<view class="tb_button2" :class="{current:type===0}" @click="tabClick(0)"></view>
				</view>
				<view class="tb_button3">
					<view class="tb_button4" :class="{current:type===1}" @click="tabClick(1)"></view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //引用路径
	export default {
		data() {
			return {
				homePage: '', //轮播图
				type: 0,
				Announcement: '', //资讯动态
				sixPalaceList: '',
				goodsList: '',
				zy_dataIndex: 6, //列表默认数量
				disStatus: 0,
				loadingText: {
					down: '上拉加载更多',
					refresh: '正在加载...',
					nomore: '没有更多了',
				},
				loadingType: 0, //加载更多状态
				current: 0, //标题下标
			}
		},

		onLoad() {
			this.lunBoInit();
			this.loadData();
		},

		//页面触底
		onReachBottom() {
			uni.showLoading({
				title: '加载更多中...',
				icon: 'loading'
			})
			this.getMore();
		},

		methods: {

			//----------------------读取静态页面json.js-------------------------------

			async lunBoInit() {
				let homePage = await this.$api.lyfwcwd('homePage');
				this.homePage = homePage.data;
				let Announcement = await this.$api.lyfwcwd('Announcement');
				this.Announcement = Announcement.data;
				// console.log(this.homePage)
			},

			//----------------------接口数据-------------------------------

			loadData: function() {
				//请求新闻资讯
				uni.request({
					url: $lyfw.Interface.currency_zhly.value,
					method: $lyfw.Interface.currency_zhly.method,
					success: (e) => {
						console.log(e)
						if (e.data.msg == '获取成功') {
							if (e.data.data.length == 0) {
								this.disStatus = 1;
							} else {
								this.goodsList = e.data.data;
								this.disStatus = 0;
							}
						} else {
							uni.hideLoading()
							uni.stopPullDownRefresh()
							this.goodsList = '';
							uni.showToast({
								title: '获取失败',
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						uni.showToast({
							title: '网络异常，请检查网络后尝试',
							icon: 'none'
						})
					}
				})

				//请求六宫格数据
				uni.request({
					url: $lyfw.Interface.spt_GetticketSearchByrequestArea.value,
					method: $lyfw.Interface.spt_GetticketSearchByrequestArea.method,
					data: {
						// requestArea : this.regionWeixin,
						requestArea: '泉州市'
					},
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						// console.log(res)
						this.sixPalaceList = res.data.data;
					}
				})

				uni.stopPullDownRefresh();
			},


			//---------------------页面触底加载信息-----------------------------

			getMore() {
				this.loadingType = 1;
				if (this.current == 0) {
					if (this.zy_dataIndex < this.goodsList.length) {
						var a = this.zy_dataIndex + 4;
						this.zy_dataIndex = a;
						this.loadingType = 0;
						uni.hideLoading()
					} else if (this.zy_dataIndex >= this.goodsList.length) {
						this.loadingType = 2;
						uni.hideLoading()
					}
				}
			},

			//-----------------tab事件---------------------------------------
			// tabClick(e) {
			// 	if (e == 0) {
			// 		this.type = 0;
			// 	} else if (e == 1) {
			// 		this.type = 1;
			// 	}
			// },

			//---------------------资讯详情页-----------------------------------

			informationTo: function(e) {
				uni.navigateTo({
					url: '../../../pages/Home/InformationDetails?aid=' + e
				})
			},

			Jump() {
				uni.navigateTo({
					url: './zy_newsScreening'
				})
			}
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
		height: 340upx;
		width: 100%;

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

	// 默认指示点的样式
	.swi .wx-swiper-dot {
		width: 15upx;
		height: 15upx;
		border-radius: 15upx;
		opacity: 0.75;
	}

	// .wx-swiper-dots {
	// 	position: relative;
	// 	left: unset !important;
	// 	right: 0;
	// }

	// .wx-swiper-dots.wx-swiper-dots-horizontal {
	// 	margin-bottom: 5rpx;
	// }

	.wx-swiper-dots.wx-swiper-dots-horizontal {
		margin-bottom: -5rpx;
	}

	// 选中指示点的样式
	.zl_swi .wx-swiper-dot.wx-swiper-dot-active {
		width: 40upx;
		height: 15upx;
		border-radius: 15upx;
		// opacity: 0.75;
	}

	.zc_TabBackground {
		background-color: #FFFFFF;
		width: 100%;
		height: 47upx;

		.tb_tab {
			position: relative;
			display: flex;
			width: 100%;
			height: 47upx;

			.tb_button {
				position: relative;
				display: flex;
				width: 50%;
				height: 100%;
				margin-top: 13upx;
				margin-right: 13upx;

				.tb_button2 {
					position: absolute;
					right: 0;
					width: 14upx;
					height: 14upx;
					background: rgba(215, 215, 215, 1);
					border-radius: 50%;

					&.current {
						background: #70c778;
						// background-color: #FFFFFF;
					}
				}
			}

			.tb_button3 {
				position: relative;
				display: flex;
				width: 50%;
				height: 100%;
				margin-left: 13upx;
				margin-top: 13upx;

				.tb_button4 {
					position: absolute;
					left: 0;
					width: 14upx;
					height: 14upx;
					background: rgba(215, 215, 215, 1);
					border-radius: 50%;

					&.current {
						background: #70c778;
						// background-color: #FFFFFF;
					}
				}
			}
		}
	}

	.zl_swi {
		height: 230upx;
		width: 100%;

		.swiItem {
			width: 100%;
			height: 100%;
			overflow: hidden;
			background-color: #FFFFFF;

			.zl_topClick {
				display: flex;
				top: 0;

				// 车票订购
				.zl_ticketOrdering {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_toImage {
						width: 60rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_toText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}

				//网络约车
				.zl_carAppointment {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_caImage {
						width: 60rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_caText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}

				//公交查询
				.zl_transit {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_tsImage {
						width: 60rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_tsText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}

				//包车服务
				.zl_charterService {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_csImage {
						width: 60rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_csText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}

				//旅游服务
				.zl_tourismServices {
					width: 20%;
					height: 178upx;
					text-align: center;
					align-items: center;

					.zl_teImage {
						width: 60rpx;
						height: 60rpx;
						margin-top: 50upx;
					}

					.zl_teText {
						margin-top: 10rpx;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #333333;
						display: block;
					}
				}
			}
		}
	}

	//咨询动态
	.notice {
		background: #fff;
		margin-top: 20upx;

		.zl_content {
			display: flex;

			.zl_noImage {
				width: 146upx;
				height: 83upx;
				margin: 47upx 0upx;
				margin-left: 31upx;
			}

			.zl_noContent {

				.zl_noText {
					display: flex;
					font-size: 26upx;
					color: #333333;
					margin-top: 35upx;
					margin-left: 55upx;
				}

				.zl_label {
					display: flex;
					margin-left: 45upx;
					margin-top: 27upx;

					.la_label {
						margin-right: 10upx;

						.la_background {
							background-color: #e2f1fa;
							border-radius: 20px;
							font-size: 24upx;
							color: #7fbbe1;
							padding: 9upx 20upx;
						}
					}
				}
			}
		}
	}

	// .zl_topClick {
	// 	display: flex;
	// 	background-color: #FFFFFF;

	// 	// 车票订购
	// 	.zl_vajraDistrict {
	// 		width: 190upx;
	// 		height: 178upx;
	// 		text-align: center;

	// 		.zl_vdImage {
	// 			width: 60rpx;
	// 			height: 60rpx;
	// 			margin-top: 50upx;
	// 		}

	// 		.zl_vdText {
	// 			margin-top: 10rpx;
	// 			font-size: 24rpx;
	// 			font-family: Source Han Sans SC;
	// 			font-weight: 400;
	// 			color: #333333;
	// 			display: block;
	// 		}
	// 	}
	// }

	// 旅游推荐
	.zl_recommend {
		background: #fff;
		margin-top: 20upx;
		padding: 0 31upx;

		.zl_reContent {
			position: relative;
			padding-top: 40upx;

			.zl_reTitle {
				font-size: 32upx;
				color: #333333;
				font-weight: bold;
			}

			.zl_reMore {
				position: absolute;
				padding-right: 31upx;
				padding: 4upx 0;
				right: 0;
				font-size: 24upx;
				color: #5E5E60;
			}
		}

		.zl_reContent2 {
			padding-top: 42upx;
			padding-bottom: 40upx;

			.zl_contentImage1 {
				display: flex;

				// 泉州小西埕
				.ct_content1 {
					display: flex;
					position: relative;
					margin-right: 10upx;

					.ct_image1 {
						width: 454upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text1 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
					}
				}

				// 稻田摸鱼
				.ct_content2 {
					display: flex;
					position: relative;

					.ct_image2 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text2 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}

			.zl_contentImage2 {
				display: flex;
				margin-top: 20upx;

				// 泉州钟楼
				.ct_content3 {
					display: flex;
					position: relative;

					.ct_image3 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text3 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				// 泉州洛阳桥
				.ct_content4 {
					display: flex;
					position: relative;
					margin-left: 10upx;

					.ct_image4 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text4 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				// 七彩官畲
				.ct_content5 {
					display: flex;
					position: relative;
					margin-left: 10upx;

					.ct_image5 {
						width: 222upx;
						height: 207upx;
						overflow: hidden;

					}

					.ct_text5 {
						position: absolute;
						font-size: 22upx;
						bottom: 0;
						padding: 11upx 15upx;
						color: #fff;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}
	}

	/* 南平周边-样式*/
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 360upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: 32upx;
			color: #333;
			line-height: 72upx;
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 160px;
		}

		.Portrait {
			width: 40upx;
			height: 40upx;
			opacity: 1;
		}

		.price {
			position: relative;
			font-size: 26upx;
			color: #666;
			left: 54upx;
			top: 32upx;
			max-width: 5;
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 76px;
			margin-top: -80upx;
		}

		.price-zan {
			font-size: 24upx;
			color: #666;
			float: right;
			margin-top: 3upx;
		}
	}

	/*通用字体样式*/
	.titNp {
		margin-top: 20upx;
		padding: 32upx;
		color: #333333;
		font-size: 34upx;
		font-weight: bold;
		background: #fff;

	}
</style>
