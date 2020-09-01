<template>
	<view>
		<web-view :src="URL"></web-view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				URL:''
			}
		},
		onShow() {
		},
		onLoad() {
			this.GetWebViewUrl();
		},
		methods: {
			GetWebViewUrl:function(){
				let that=this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetWebViewUrl.Url,
					method: $DDTInterface.DDTInterface.GetWebViewUrl.method,
					data: {
						ParamKey: "bus", 
					},
					success(res) {
						that.URL=res.data.data.ParamValue;
					}
				})
			}
		} 
	}
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box; 
	}

	#search {
		height: 40px;
	}
</style>
