<template>
	<view>
		<view class="topSearch">
			<!-- 搜索栏 -->
			<view class="searchTopBox">
				<text class="locationTxt" @click="oncity">{{region}}<text class="icon jdticon icon-xia"></text></text>
				<view class="searchBoxRadius">
					<input class="inputIocale" type="search" v-model="searchValue" @confirm="searchNow" placeholder="搜索景区名称" />
					<image class="searchImage" src="../../../static/LYFW/peripheralTourism/peripheralTourism/search.png" />
				</view>
			</view>

			<!-- 选择地址 -->
			<popup-layer ref="popupRef" :direction="'right'">
				<view style="width:750upx;height: 100%;">
					<citySelect @back_city="backCity"></citySelect>
				</view>
			</popup-layer>

			<!-- 搜索内容 -->
			<view :hidden="searchIndex==0" v-for="(item,index) in searchData" :key="index">
				<view class="Tk_scrollview" @click="godetail(item.ticketId)">
					<view class="Tk_item">
						<image class="Tk_image" :src="item.ticketImage" />
						<view class="Tk_bacg">
							<text class="Tk_text1">{{item.ticketTitle}}</text>
							<text class="Tk_text2">{{item.ticketComment_s1}}&nbsp;|&nbsp;{{item.ticketComment_s2}}&nbsp;|&nbsp;{{item.ticketComment_s3}}</text>
							<text class="Tk_text3">¥{{item.ticketAdultPrice}}元起</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- tabs点击切换栏 -->
		<view class="tabsBox">
			<QSTabs :current="current" :tabs="tabs" minWidth="80" @change="change($event)" />
		</view>

		<!-- 内容1 -->
		<view :hidden="current==1">
			<view class="content" v-for="(item,index) in groupTitle" :key="index">
				<view class="title">
					<view style="background: #00B5FF;width: 56upx;height: 56upx;border-radius:4px;"><text class="titleId">{{item.groupId}}</text></view>
					<text class="contentTitle">{{item.groupTItle}}</text>
				</view>
				<view class="groupTour" v-for="(item2,index2) in item.content" :key="index2" v-if="index2<3">
					<view class="groupContent">
						<image class="contentImage" :src="item2.contentImage" mode="aspectFill"></image>
					</view>
					<view class="groupText">
						<text class="contentText">{{item2.contentTitle}}</text>
						<text class="contentLabel">{{item2.contentLabel}}</text>
						<view class="groupCost">
							<view class="cost">￥<text class="contentCost">{{item2.cost}}</text>元</view>
							<text class="sellComment">已售{{item2.sell}}&nbsp;&nbsp;{{item2.comment}}评论</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>	
import citySelect from '@/components/HOME/uni-location/linzq-citySelect/linzq-citySelect.vue'
	import popupLayer from '@/components/HOME/uni-location/popup-layer/popup-layer.vue'
	import QSTabs from '../../../components/LYFW/independentTravel/QS-tabs/QS-tabs.vue'
	export default {
		components: {
			citySelect,
			popupLayer,
			QSTabs
		},
		data() {
			return {
				searchValue: '', //搜索框值
				region: '请选择', //地区数值
				searchIndex: 0, //搜索框是否启用状态值
				searchData: '', //搜索后的值
				current: 0, //标题下标
				tabs: ['推荐', '全部'], //选项标题
				groupTitle: [], //内容标题
			}
		},
		
		onLoad() {
			this.routeInit();
		},
		
		methods: {
			//读取静态数据json.js
			async routeInit() {
				let groupTour = await this.$api.lyfwcwd('groupTour');
				this.groupTitle = groupTour.data;
			},

			//打开地区选择器
			oncity() {
				this.$refs.popupRef.show();
			},
			
			//地区获取
			backCity(e) {
				if (e !== 'no') {
					// console.log(e)
					this.region = e.cityName
					this.$refs.popupRef.close();
					this.lyfwData();
					this.screenIndex = 0;
					this.searchIndex = 0;
				} else {
					this.$refs.popupRef.close();
				}
			},

			//搜索框-搜索
			searchNow: function() {
				if (this.searchValue == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					// retuan false;
				}
				//搜索请求
				uni.hideKeyboard()
				uni.showLoading({
					title: '正在搜索',
				})
				uni.request({
					url: 'http://218.67.107.93:9210/api/app/searchScenicspotList?searchValue=' + this.searchValue,
					method: 'POST',
					success: (res) => {
						if (res.data.msg == '搜索景区信息成功！') {
							this.searchData = res.data.data;
							this.searchValue = ''
							this.searchIndex = 1;
							uni.hideLoading()
						} else if (res.data.msg == '查不到相关景区，请确认景区名！') {
							uni.hideLoading()
							uni.showToast({
								title: '查不到相关景区！如:武夷/武夷山',
								icon: 'none',
								duration: 1500
							});
							this.searchValue = ''

						}
					}
				})
			},

			//tabbar筛选点击
			change(index) {
				this.current = index;
			},

		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}

	.topSearch {
		background-color: #FFFFFF;
		margin-bottom: 20upx;

		//搜索框
		.searchTopBox {
			display: flex;
			text-overflow: ellipsis; //文本溢出：省略号
			padding: 32upx 32upx;

			.locationTxt {
				color: #333333;
				font-size: 36upx;
				font-weight: bold;
				text-overflow: ellipsis;
				margin-top: 16upx;
				width: 25%;
				text-overflow: ellipsis; //文本溢出：省略号
			}

			/* 向下小图标 */
			.icon {
				font-size: 20upx;
				color: #AAAAAA;
				margin-left: 15upx;
			}

			.searchBoxRadius {
				width: 76%;
				height: 78upx;
				background-color: #fff;
				border-radius: 46upx;
				background: #f5f5f5;

				.searchImage {
					padding-left: 24upx;
					padding-top: 18upx;
					width: 48upx;
					height: 48upx;
				}

				.inputIocale {
					position: absolute;
					height: 72upx;
					padding-top: 4upx;
					padding-left: 88upx;
					font-size: 30upx;
				}

			}
		}

		//Y轴滚动视图
		.Tk_scrollview {
			padding: 16upx 32upx;
			margin: 0 auto;

			.Tk_item {
				display: flex;

				.Tk_image {
					width: 182upx;
					height: 152upx;
					border-radius: 12upx;
					margin: 24rpx 0rpx;
				}

				.Tk_bacg {
					margin-top: 20upx;
					margin-left: 24upx;
				}

				.Tk_text1 {
					display: flex;
					text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
					white-space: nowrap;
					overflow: hidden;
					width: 480upx; //内容宽度
				}

				.Tk_text2 {
					font-size: 26upx;
					margin-top: 16upx;
					color: #AAAAAA;
					display: block; // 让字体换行
				}

				.Tk_text3 {
					font-size: 24upx;
					margin-top: 24upx;
					text-align: right;
					color: #FF6600;
					display: block; // 让字体换行
				}
			}
		}
	}

	//tabs点击
	.tabsBox {
		z-index: 999;
		position: sticky;
		background: #fff;
	}

	//内容1
	.content {
		background-color: #FFFFFF;
		padding: 39upx 32upx;
		margin-bottom: 20upx;
		.title {
			display: flex;
			.titleId {
				color: #FFFFFF;
				font-size: 34upx;
				margin: 0upx 18upx;
				line-height: 53upx;
			}
			.contentTitle{
				margin-left: 12upx;
				color: #333333;
				font-size: 40upx;
				font-weight: bold;
			}
		}
		.groupTour{
			display: flex;
			padding-top: 40upx;
			padding-bottom: 40upx;
			border-bottom: 1px #F5F5F5 dotted;
			.groupContent{
				// display: flex;
				.contentImage{
					width: 228upx;
					height: 190upx;
					border-radius:8px;
				}
			}
			.groupText{
				margin-left: 25upx;
				.contentText{
					font-size:32upx;
					font-weight: 40;
					font-family:Source Han Sans SC;
					overflow: hidden;//超出溢出
					-webkit-line-clamp: 2;//限制2行
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-align: justify;
				}
				.contentLabel{
					display: block;
					font-size: 28upx;
					color: #aba9aa;
					margin-top: 21upx;
				}
				.groupCost{
					margin-top: 12upx;
					display: flex;
					position: relative;
					.cost{
						font-size: 28upx;
						color: #FF6600;
						.contentCost{
							font-size: 36upx;
							color: #FF6600;
						}
					}
					.sellComment{
						position: absolute;
						font-size: 28upx;
						line-height: 53upx;
						color: #aba9aa;
						right: 0;
					}
				}
			}
		}
	}
</style>
