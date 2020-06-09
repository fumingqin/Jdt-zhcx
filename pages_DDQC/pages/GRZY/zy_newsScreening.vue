<template>
	<view>
		<view>
			
		</view>
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //引用路径
	export default {
		data() {
			return {
				
			}
		},
		
		onLoad() {
			this.loadData();
		},
		
		methods: {
			loadData: function() {
				//请求新闻资讯
				uni.request({
					url:$lyfw.Interface.currency_zhly.value,
					method:$lyfw.Interface.currency_zhly.method,
					success: (e) => {
						console.log(e)
						this.goodsList = e.data.data;
						
					}
				})
				
				uni.stopPullDownRefresh();
			},
		}
	}
</script>

<style>

</style>
