<template>
	<view class="container">
		<view class="title">
			<rich-text :nodes="information.title"></rich-text>
		</view>
		<view class="time">
			<text>{{information.createdTime}}</text>
			<text style="margin-left:24upx;" :v-if="information.author !==''">{{information.author}}</text>
		</view>
		<!-- <view class="imageView">
			<image :src="information.src" mode="widthFix"></image>
		</view> -->
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
					src : '', //图片路径
					count: '', //游览量
				},
				aid : '',
				imageText : '', //图文
			}
		},
		onLoad() {
			this.getArticleInfo(); 
		},
		methods: {
			getArticleInfo :function(){
				// 请求资讯
				// uni.request({
				// 	url : 'http://218.67.107.93:9210/api/app/getInformationDetail?id='+this.id,
				// 	method:"POST",
				// 	success :(res) =>{
				// 		this.information = res.data.data;
				// 		this.imageText = res.data.data.content.replace(/\<img/g, '<img style="max-width:100%;height:auto;margin: 2px 0px;" ');
				// 		// console.log(res)
				// 		}
				// })
				var that=this;
				uni.getStorage({
					key:'detailTweet',
					success:(e) =>{
						that.aid=e.data.aid;
						uni.request({
							url:that.$GrzxInter.Interface.getNews.value,
							method:that.$GrzxInter.Interface.getNews.method,
							success(logRes) {
								console.log(logRes,'logRes')
								var detailTweet=logRes.data.data.filter(item => {
									return item.aid == that.aid;
								})
								console.log(detailTweet)
								that.information.title = detailTweet[0].title;
								that.information.author=detailTweet[0].author;
								that.information.createdTime = detailTweet[0].reportTime;
								that.information.count = detailTweet[0].viewsCount;
								that.imageText=detailTweet[0].newsContent.slice(2);
							}
						})
						// this.information.title = e.data.title;
						// this.information.createdTime = e.data.reportTime;
						// this.information.src = e.data.src;
						// this.imageText = e.data.text;
						// this.count=e.data.viewsCount;
						console.log(e)
					},
					fail() {
						uni.showToast({
							title:'获取资讯详情失败',
							icon:'none',
						})
					}
				})
				uni.getStorage({
					key:'userInfo',
					success:(res) =>{
						//tianjiayoulangliang
					},
					fail() {
						uni.showToast({
							title:'您暂未登录，请登录！',
							icon:'none',
						})
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
		.imageView{
			padding: 0upx 32upx;
			margin-top: 24upx;
			image{
				width: 686upx;
			}
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
