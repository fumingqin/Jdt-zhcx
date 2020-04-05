<template>
	<view>
		<!-- 搜索栏 -->
		<view class="searchTopBox">
			<text class="locationTxt" @click="oncity">{{region}}<text class="icon jdticon icon-xia"></text></text>
			<view class="searchBoxRadius">
				<input class="inputIocale" type="search" v-model="searchValue" @confirm="searchNow" placeholder="搜索景区名称" />
				<image class="searchImage" src="../../../static/LYFW/currency/search.png" />
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

		<!-- tabs点击切换栏 -->
		<view class="tabsBox">
			<QSTabs :current="current" :tabs="tabs" minWidth="80" @change="change($event)" />
		</view>

		<view :hidden="current==1">
			<!-- 六宫格列表栏 -->
			<view class="listBarViewSpace">
				<view class="listBarView" v-for="(item,index) in itText" :key="index" @click="natTo">
					<image class="listBarImage" mode="aspectFill" :src="item.src"></image>
					<text class="listBarText1">{{item.title}}</text>
					<text class="listBarText2">{{item.conut_1}}|{{item.conut_2}}</text>
				</view>
			</view>

			<!-- 新发现 -->
			<view class="newDiscoveryView">
				<view class="newDiscoveryTitleView">
					<text class="newDiscoveryTitle">新发现</text>
				</view>
				<view class="newDiscoveryConentView" v-for="(item,index) in itText" :key="index" @click="natTo">
					<image class="newDiscoveryConentImage" mode="aspectFill" :src="item.src"></image>
					<text class="newDiscoveryConentText1">{{item.title}}</text>
					<text class="newDiscoveryConentText2">点击量：{{item.conut_1}}</text>
				</view>
			</view>
		</view>
		
		<view :hidden="current==0">
			<!-- 左边导航栏 -->
			<view style="width: 100%;display: flex;flex-direction: row;">
				<scroll-view scroll-y="true" style="width: 200upx; flex: 0 0 200upx; background: #f5f5f5;" >
					<view>
						<view  v-for="(item,index) in region" :key="index" style="width: 100%; height: 100upx; display: flex; justify-content: center; align-items: center; font-size: 25upx; border-bottom: 1px solid #dedede; cursor: pointer;"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import citySelect from '@/components/HOME/uni-location/linzq-citySelect/linzq-citySelect.vue'
	import popupLayer from '@/components/HOME/uni-location/popup-layer/popup-layer.vue'
	import QSTabs from '../../../components/LYFW/independentTravel/QS-tabs/QS-tabs.vue'
	export default {
		data() {
			return {
				searchIndex: 0, //搜索框是否启用状态值
				searchValue: '', //搜索框值
				searchData: '', //搜索后的值
				region: '请选择', //地区数值

				current: 0, //标题下标
				tabs: ['推荐', '全部'], //选项标题

				itText: '',
				
				regin : [{
					id:'0',
					name:'南平',
					image : '../../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
					label : '',
				},], //地区
			}
		},
		components: {
			citySelect,
			popupLayer,
			QSTabs
		},
		onLoad() {
			this.Getpostion();
			this.textData();
		},
		methods: {
			async textData() {
				let itText = await this.$api.lyfwfmq('itText');
				this.itText = itText.data;
			},


			//获取定位数据
			Getpostion: function() {
				try {
					this.region = uni.getStorageSync('Key_position');
					if (value) {
						// console.log(value);
					}
				} catch (e) {
					// error
				}
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
			
			//跳转
			natTo(){
				uni.navigateTo({
					url:'/pages/LYFW/ouristRoute/travelArrange'
				})
			}
		}
	}
</script>

<style lang="scss">
	//搜索框
	.searchTopBox {
		display: flex;
		text-overflow: ellipsis; //文本溢出：省略号
		margin: 32upx 32upx;

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

	//tabs点击
	.tabsBox {
		z-index: 999; //最外层
		position: sticky;
		background: #fff;
	}

	//列表栏
	.listBarViewSpace {
		padding: 32upx 8upx;
		height: 880upx;

		.listBarView {
			margin-left: 24upx;
			margin-bottom: 32upx;
			float: left;

			.listBarImage {
				width: 216upx;
				height: 314upx;
				border-radius: 12upx;
			}

			.listBarText1 {
				display: block;
				margin-top: 12upx;
				font-size: 30upx;
			}

			.listBarText2 {
				display: block;
				font-size: 26upx;
				color: #999;
				margin-top: 8upx;
			}

		}
	}

	//新发现
	.newDiscoveryView {
		padding: 8upx;

		.newDiscoveryTitleView {
			margin: 0upx 0upx 32upx 24upx;

			.newDiscoveryTitle {
				font-weight: bold;
				font-size: 34upx;
			}
		}

		.newDiscoveryConentView {
			margin-left: 24upx;
			margin-bottom: 32upx;
			float: left;

			.newDiscoveryConentImage {
				width: 332upx;
				height: 254upx;
				border-radius: 12upx;
			}

			.newDiscoveryConentText1 {
				display: block;
				margin-top: 12upx;
				font-size: 30upx;
			}

			.newDiscoveryConentText2 {
				display: block;
				font-size: 26upx;
				color: #999;
				margin-top: 8upx;
			}
		}
	}
</style>
