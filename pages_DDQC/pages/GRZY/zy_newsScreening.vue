<template>
	<view>
		<view class="ns_view"  v-for="(item, index) in goodsList" :key="index">
			<image class="ns_img" :src="item.imageUrl" mode="aspectFill"></image>
			<view>
				<text class="ns_title">{{item.title}}</text>
				<text class="ns_time">{{item.reportTime.substr(0,9)}}</text>
			</view>
		</view>
		
		<view style="width: 100%; float: left; text-align: center; font-size: 24upx; margin: 16upx 0; color: #aaa;">
			<text v-if="current==0" :hidden="disStatus== 1">{{loadingType== 0 ? loadingText.down : (loadingType === 1 ? loadingText.refresh : loadingText.nomore)}}</text>
			<text v-if="current==0" :hidden="disStatus== 0">暂无历史数据</text>
		</view>
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //引用路径
	export default {
		data() {
			return {
				goodsList:'',
				zy_dataIndex: 4, //列表默认数量
				disStatus:0,
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
			loadData: function() {
				//请求新闻资讯
				uni.request({
					url:$lyfw.Interface.currency_zhly.value,
					method:$lyfw.Interface.currency_zhly.method,
					success: (e) => {
						console.log(e)
						if(e.data.msg=='获取成功'){
							if(e.data.data.length==0){
								this.disStatus = 1;
							}else{
								this.goodsList = e.data.data;
								this.disStatus = 0;
							}
						}else{
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
				
				uni.stopPullDownRefresh();
			},
			
			//---------------------页面触底加载信息-----------------------------
			
			getMore(){
				this.loadingType = 1;
				if(this.current == 0){
					if (this.zy_dataIndex < this.goodsList.length) {
						var a = this.zy_dataIndex + 4;
						this.zy_dataIndex = a;
						this.loadingType = 0;
						uni.hideLoading()
					}else if (this.zy_dataIndex >= this.goodsList.length) {
						this.loadingType = 2;
						uni.hideLoading()
					}
				}
			},
			
			//---------------------资讯详情页-----------------------------------
			
			informationTo: function(e) {
				uni.navigateTo({
					url:'../../../pages/Home/InformationDetails?aid=' + e
				})
			},
		}
	}
</script>

<style lang="scss">
	.ns_view{
		display: flex;
		margin-top: 38upx;
		margin-left: 32upx;
		margin-right: 32upx;
		padding-bottom: 42upx;
		border-bottom: 1px #F5F5F5 dotted;
	}
	
	.ns_img{
		width:210upx;
		height:144upx;
		border-radius:12upx;
	}
	
	.ns_title {
		padding-left: 16upx;
		font-size: 30upx;
		color: #333;
		font-weight: bold;
		line-height: 46upx;
		display: block;
		// text-overflow: ellipsis;
		// white-space: nowrap;
		// overflow: hidden;
		width: 464upx;
	}
	
	.ns_time{
		display: block;
		padding-left: 16upx;
		padding-top: 20upx;
		bottom: 0;
		font-size:26upx;
		color: #999999;
	}
</style>
