<template>
	<view class="container">
		<view class="title">
			<rich-text :nodes="information.title"></rich-text>
		</view>
		<view class="time">
			<text>{{information.createdTime}}</text>
			<text style="margin-left:24upx;" :v-if="information.author !==''">{{information.author}}</text>
		</view>
		<view class="content">
			<rich-text :nodes="imageText"></rich-text>
		</view>
		<view class="count">
		   <text>游览量：{{information.count}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information: {
					title: '', //标题
					createdTime: '', //时间
					author: '', //作者
					count: '', //游览量
				},
				id : '',
				imageText : '', //图文
			}
		},
		onLoad(options) {
			this.id = options.id 
			this.getArticleInfo() 
		},
		methods: {
			getArticleInfo :function(){
				uni.request({
					url : 'http://218.67.107.93:9210/api/app/getInformationDetail?id='+this.id,
					method:"POST",
					success :(res) =>{
						this.information = res.data.data;
						this.imageText = res.data.data.content.replace(/\<img/g, '<img style="max-width:100%;height:auto;margin: 2px 0px;" ');
						// console.log(res)
						}
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		.title{
			font-size: 40upx;  
			padding: 32upx 32upx;
		}
		
		.time {
			display: flex; 
			font-size: 30upx; 
			margin-left: 32upx;
			color: #888;
		}
		
		.content {
			display: flex; 
			padding: 32upx 32upx; 
			// margin-top: 24upx; 
			font-size: 33upx; 
			letter-spacing: 4upx; 
			line-height: 48upx; 
			color: #444;
			text-align: justify;
		}
		
		.count {
			margin: 32upx; 
			font-size: 30upx;
		}
	}

	
</style>
