<template>
	<view>
		<!-- 顶部图片 -->
		<view class="zl_topPicture">
			<image class="zl_image" src="../../static/Home/ho_zhly/kaiyuanshi.png" mode="aspectFill"></image>
		</view>

		<!-- 顶部点击跳转栏 -->
		<view class="zl_click">
			<view class="zl_topClick">
				<!-- 自由行 -->
				<view class="zl_independentTravel" @click="route1">
					<image class="zl_itImage" src="../../static/Home/ho_zhly/ziyouxin.png"></image>
					<text class="zl_itText">自由行</text>
				</view>
				<!-- 跟团游 -->
				<view class="zl_groupTour" @click="route2">
					<image class="zl_gtImage" src="../../static/Home/ho_zhly/gentuanyou.png"></image>
					<text class="zl_gtText">跟团游</text>
				</view>
				<!-- 景区门票 -->
				<view class="zl_admissionTicket" @click="route3">
					<image class="zl_atImage" src="../../static/Home/ho_zhly/jinqugoupiao.png"></image>
					<text class="zl_atText">景区门票</text>
				</view>
				<!-- 景区商品 -->
				<view class="zl_commodity" @click="route4">
					<image class="zl_coImage" src="../../static/Home/ho_zhly/jinqushangpin.png"></image>
					<text class="zl_coText">景区商品</text>
				</view>
			</view>
		</view>

		<!-- 消息通告 -->
		<view class="notice">
			<view class="zl_content">
				<image class="zl_noImage" src="../../static/Home/ho_zhly/xiaoxitonggao.png" mode="aspectFill"></image>
				<view class="zl_noContent">
					<text class="zl_noText">{{Announcement.zl_title}}</text>
					<view class="zl_label">
						<view class="la_label" v-for="(item,index) in Announcement.LabelContent" :key="index" v-if="index<2">
							<text class="la_background" style="background-color: #e2f1fa;border-radius:20px;">{{item.lc_text}}</text>
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
					<text class="zl_reMore">更多></text>
				</view>
			</view>
			<view class="zl_reContent2">
				<view class="zl_contentImage1">
					<!-- 泉州小西埕 -->
					<view class="ct_content1">
						<image class="ct_image1" :src="recommendedContent[0].rc_image" mode="aspectFill"></image>
						<text class="ct_text1" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">{{recommendedContent[0].rc_text}}</text>
					</view>
					<!-- 稻田摸鱼 -->
					<view class="ct_content2">
						<image class="ct_image2" :src="recommendedContent[1].rc_image" mode="aspectFill"></image>
						<text class="ct_text2" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">{{recommendedContent[1].rc_text}}</text>
					</view>
				</view>

				<view class="zl_contentImage2">
					<!-- 泉州钟楼 -->
					<view class="ct_content3">
						<image class="ct_image3" :src="recommendedContent[2].rc_image" mode="aspectFill"></image>
						<text class="ct_text3" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">{{recommendedContent[2].rc_text}}</text>
					</view>
					<!-- 泉州洛阳桥 -->
					<view class="ct_content4">
						<image class="ct_image4" :src="recommendedContent[3].rc_image" mode="aspectFill"></image>
						<text class="ct_text4" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">{{recommendedContent[3].rc_text}}</text>
					</view>
					<!-- 七彩官畲 -->
					<view class="ct_content5">
						<image class="ct_image5" :src="recommendedContent[4].rc_image" mode="aspectFill"></image>
						<text class="ct_text5" style="background:rgba(0,0,0,1);opacity:0.7;border-radius:4px;margin-left: 10upx;margin-bottom: 21upx;">{{recommendedContent[4].rc_text}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 新闻资讯 -->
		<view class="titNp">新闻资讯</view>
		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="informationTo(item.id)">
				<view class="image-wrapper">
					<image :src="item.imgUrl" mode="aspectFill"></image>
				</view>
				<view class="title clamp">{{item.title}}</view>
				<view>
					<image class="Portrait" src="../../static/GRZX/missing-face.png" mode="aspectFill"></image>
					<text class="price">{{item.createdTime}}</text>
					<text class="price-zan">阅读{{item.count+1080}}</text> 
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Announcement: '', //通知内容
				recommendedContent: [{
					rc_image : ''
				},{
					rc_image : ''
				},{
					rc_image : ''
				},{
					rc_image : ''
				},{
					rc_image : ''
				}], //推荐内容
				goodsList: [],
			}
		},
		onLoad() {
			this.routeInit();
			this.loadData();
		},
		methods: {
			//读取静态数据json.js
			async routeInit() {
				let Announcement = await this.$api.lyfwcwd('Announcement');
				this.Announcement = Announcement.data;
				let recommendedContent = await this.$api.lyfwcwd('recommendedContent');
				this.recommendedContent = recommendedContent.data;
			},
			
			routeData : function(){
				uni.request({
					url:'http://218.67.107.93:9210/api/app/getPackageTourList',
					method:'POST',
					success: (e) => {
						console.log(e)
					}
				})
			},
			
			loadData: function() {
				uni.request({
					url: 'http://218.67.107.93:9210/api/app/getInformationList',
					method: 'POST',
					success: (e) => {
						this.goodsList = e.data.data;
						// console.log(e)
					}
				})
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				},1000)
			},
			
			//资讯详情页
			informationTo:function(e) {
				uni.navigateTo({
					url: 'InformationDetails?id=' +e
				})
			},
			
			//金刚区各模块入口
			route1:function() {
				uni.navigateTo({
					url: '/pages/LYFW/independentTravel/it_list'
				})
			},
			route2:function() {
				uni.navigateTo({
					url: '/pages/LYFW/groupTour/groupTourList'
				})
			},
			route3:function() {
				uni.navigateTo({
					url: '/pages/LYFW/scenicSpotTickets/ticketsList'
				})
			},
			route4:function() {
				uni.navigateTo({
					url: '/pages/CTKY/ctkyIndex'
				})
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}

	//顶部图片
	.zl_topPicture {
		width: 750upx;
		height: 406upx;

		.zl_image {
			width: 100%;
			height: 100%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	//顶部点击跳转栏
	.zl_click {
		position: absolute;
		background: rgba(255, 255, 255, 1);
		z-index: 2;
		width: 708upx;
		height: 178upx;
		top: 355upx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius:12px;
		margin: 0 20upx;

		.zl_topClick {
			display: flex;

			// 自由行
			.zl_independentTravel {
				width: 25%;
				height: 178upx;
				text-align: center;
				.zl_itImage {
					width: 44upx;
					height: 44upx;
					margin-top: 47upx;
				}

				.zl_itText {
					font-size: 26upx;
					color: FF333333;
					display: block;
					line-height: 50upx;
				}
			}

			//跟团游
			.zl_groupTour {
				width: 25%;
				height: 178upx;
				text-align: center;

				.zl_gtImage {
					width: 53upx;
					height: 44upx;
					margin-top: 47upx;
				}

				.zl_gtText {
					font-size: 26upx;
					color: FF333333;
					display: block;
					line-height: 50upx;
				}
			}

			//景区门票
			.zl_admissionTicket {
				width: 25%;
				height: 178upx;
				text-align: center;

				.zl_atImage {
					width: 48upx;
					height: 35upx;
					margin-top: 53upx;
				}

				.zl_atText {
					font-size: 26upx;
					color: FF333333;
					display: block;
					line-height: 61upx;
				}
			}

			//景区商品
			.zl_commodity {
				width: 25%;
				height: 178upx;
				text-align: center;

				.zl_coImage {
					width: 42upx;
					height: 41upx;
					margin-top: 50upx;
				}

				.zl_coText {
					font-size: 26upx;
					color: FF333333;
					display: block;
					line-height: 50upx;
				}
			}
		}
	}

	//消息通告
	.notice {
		background: #fff;
		margin-top: 147upx;

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
					}
				}
			}
			
			.zl_contentImage2{
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
