<template>
	<view class="container">
		<!-- <view class="title">{{detailTweet.title}}</view>
		<view class="time">{{detailTweet.time}}</view>
		<view class="src">
			<image :src="detailTweet.src"></image>
		</view>
		<view class="text">{{detailTweet.text}}</view> -->


		<view style="background: #FFFFFF; font-weight: bold;">
			<rich-text :nodes="information.title"></rich-text>
		</view>
		<view style="background: #FFFFFF; display: flex; font-size: 30upx;">
			<rich-text :nodes="information.createdTime"></rich-text>
			<rich-text :nodes="information.author"></rich-text>
		</view>
		<view style="background: #FFFFFF;">
			<rich-text :nodes="information.content"></rich-text>
		</view>
		<!-- <view style="background-color:#FFF; width:96%;margin-left:2%;">
		    <rich-text :nodes="strings"></rich-text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information: {
					id : '', //资讯id
					title: '', //标题
					createdTime: '', //时间
					author: '', //作者
					content: '', //内容
					count: '', //游览量
				},
				a : '',
			}
		},
		onLoad(options) {
			// this.loadData();
			this.a = options.id
			this.getArticleInfo()
		},
		methods: {
			// async loadData() {
			// 	var that = this;
			// 	uni.getStorage({
			// 		key: 'detailTweet',
			// 		success(res) {
			// 			that.strings = '<div style="width:100%;text-align:left;font-size:25px">' + res.data.title + '</div>';
			// 			that.strings += '<div style="width:100%;text-align:left">' + res.data.time + '</div>';
			// 			that.strings += '<div style="text-align:center;width:100%"><img src="' + res.data.src +
			// 				'" style="width:100%;"/></div>';
			// 			that.strings += '<div style="text-align:left;text-indent:2em;">' + res.data.text + '</div>';
			// 		}
			// 	})
			// },
			getArticleInfo :function(){
				uni.request({
					url : 'http://218.67.107.93:9210/api/app/getInformationList',
					method:"POST",
					success :(res) =>{
						this.information = res.data.data[this.a];
						// console.log(res)
						}
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 32upx 32upx;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		.title {
			width: 100%;
			text-align: center;
			font-size: 28upx;
		}
		
		.time {}
		
		.src {}
		
		.text {}
	}

	
</style>
