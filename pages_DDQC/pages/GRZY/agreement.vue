<template>
	<view>
		<view class="content">
			<!-- <view style="font-size:40rpx;margin: 30rpx 0;font-weight: bold;width: 700rpx;text-align: center;">{{Title}}</view> -->
			<view style="width: 700rpx;font-size: 32rpx;" v-html="contentHTML"></view>
		</view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js' 
	export default {
		data() {
			return {
				Title:'',
				contentHTML: '',
				mold:'',
				Url:'',
			}
		},
		onLoad(e) {
			this.getNews(e.type);
		},
		onShow() {
			
		},
		methods: {
			getNews: function(type) {
				uni.showLoading({
					title:'加载中...'
				})
				var that=this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetNews.Url,
					method: $DDTInterface.DDTInterface.GetNews.method,
					data:{
					},
					success(res) {
						uni.hideLoading()
						for(var i=0;i<res.data.data.length;i++){
							if(res.data.data[i].Type==type){
								that.contentHTML=res.data.data[i].Body;
							}
						}
					},
					fail() {
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style>
.content {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 100%;
	}
</style>
