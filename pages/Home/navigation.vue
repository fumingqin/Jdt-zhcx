<template>
	<view>
		<!-- 搜索条 -->
		<view class="searchTopBox">
			<view class="searchBoxRadius">
				<image class="s_icon" src="../../static/Home/navigation/sousuo.png" style="position: relative;"></image>
				<input class="searchBoxIpt" type="search" v-model="ipt" @confirm="searchNow(ipt)" placeholder="关键字" style="position: relative;"
				 focus></input>
				<text class="text_Sousuo" style="position: relative;" @click="searchNow(ipt)">搜索</text>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="searchBotBox">
			<view class="ov">
				<view class="fl" style="position: relative;">历史</view>
				<image class="fr" src="../../static/Home/navigation/shanchu.png" @tap="clearKey" style="position: relative;"></image>
			</view>
			<view class="searchHistoryBox">
				<view class="searchHistoryBoxItem" v-for="(item,index) in searchKey" :key='index' @click="replaceKey(item)">
					{{item}}
				</view>
			</view>
		</view>

		<!-- 搜索内容 -->
		<view v-for="(item,index) in searchData" :key="index">
			<view class="Tk_scrollview" @click="godetail(item.ticketId)">
				<view class="Tk_item">
					<image class="Tk_image" :src="item.ticketImage" />
					<view class="Tk_bacg">
						<text class="Tk_text1">{{item.ticketTitle}}</text>
						<text class="Tk_text2">{{item.ticketComment_s1}}&nbsp;|&nbsp;{{item.ticketComment_s2}}&nbsp;|&nbsp;{{item.ticketComment_s3}}</text>
						<text class="Tk_text3">¥{{priceConversion(item.ticketAdultPrice)}}元起</text>
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
				searchKey: [],
				ipt: '',
				searchClose: true,
				searchData: '', //搜索后的值
			}
		},
		onLoad: function() {
			const that = this;
			uni.getStorage({
				key: 'searchLocal',
				success: function(res) {
					that.searchKey = res.data;
				}
			});
		},
		methods: {
			clearKey: function() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '点击确定将删除所有历史信息，确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							that.searchKey = [];
							uni.setStorage({
								key: 'searchLocal',
								data: that.searchKey
							});

						} else if (res.cancel) {

						}
					}
				});

			},
			searchNow: function(e) {
				uni.showLoading({
					title: '正在搜索' + e,
				})
				if (this.ipt == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					// return false;
				}
				uni.hideKeyboard()
				var that = this;
				that.searchKey.push(this.ipt);
				uni.setStorage({
					key: 'searchLocal',
					data: that.searchKey,
					success: function() {}
				});
				uni.request({
					url: 'http://218.67.107.93:9210/api/app/searchScenicspotList?searchValue=' + e,
					method: 'POST',
					success: (res) => {
						console.log(res)
						if (res.data.msg == '搜索景区信息成功！') {
							that.ipt = ''
							this.searchData = res.data.data;
							uni.hideLoading()

						} else if (res.data.msg == '查不到相关景区，请确认景区名！') {
							uni.hideLoading()
							uni.showToast({
								title: '查不到相关景区！如:武夷/武夷山',
								icon: 'none',
								duration: 2000
							});
							that.ipt = ''

						}
					}
				})
			},
			//路由整合
			godetail: function(e) {
				uni.navigateTo({
					url: '/pages/LYFW/scenicSpotTickets/ticketsDetails?ticketId=' + JSON.stringify(e)
				})
			},
			
			replaceKey: function(e) {
				this.ipt = e;
				this.searchNow(e);
			},
			
			//价格转换
			priceConversion:function(data){
				if(data =='暂无门票价格信息！'){
					return 0
				}else{
					return data
				}
			},
		}
	}
</script>
<style lang="scss">
	page {
		background: #FFF;
	}

	.s_icon {
		width: 40upx;
		height: 40upx;
		float: left;
		left: 24upx;
		top: 20upx;

	}

	.ov {
		overflow: hidden;
	}

	.fl {
		float: left;
		left: 20upx;
	}

	.fr {
		float: right;
		width: 48upx;
		height: 48upx;
		margin-right: 20upx;
	}

	.searchTopBox {
		width: 100%;
		background-color: #149bf0;
		height: 120upx;
		box-sizing: border-box;
		padding-top: 15upx;
	}

	.searchBoxRadius {
		width: 90%;
		height: 80upx;
		background-color: #fff;
		margin-left: 5%;
		overflow: hidden;
		border-radius: 46upx;
		margin-top: 8upx;
	}

	.searchBoxIcon {
		font-size: 40upx;
		margin-top: 20upx;
		margin-left: 20upx;
		float: left;
	}

	.searchBoxIpt {
		height: 70upx;
		line-height: 70upx;
		margin-left: 24upx;
		left: 16upx;
		float: left;
		margin-top: 8upx;
	}

	.text_Sousuo {
		float: right;
		color: #4399FC;
		margin-right: 40upx;
		margin-top: 18upx;
	}

	.searchBotBox {
		width: 100%;
		margin-top: 30upx;
		padding: 15upx 3%;
		box-sizing: border-box;
	}

	.searchHistoryBox {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 40upx;
	}

	.searchHistoryBoxItem {
		float: left;
		font-size: 26upx;
		color: #666;
		line-height: 46upx;
		height: 46upx;
		padding: 0 20upx;
		border-radius: 23upx;
		margin-left: 15upx;
		margin-bottom: 20upx;
		border: 1px solid #ccc;
	}

	//Y轴滚动视图
	.Tk_scrollview {
		padding: 0upx 32upx;
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
</style>
