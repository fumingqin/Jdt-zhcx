<template>
	<view>
		<view v-for="(item, index) in tweetArticle" :key="index" class="boxClass"> <!-- @click="selete(item)" -->
			<view class="timeClass">{{item.reportTime}}</view>
			<view class="boxClass1" @click="selete(item)">
				<view class="titleClass generalStyle">{{item.title}}</view>
				<view class="imgClass generalStyle">
					<image :src="item.imageUrl" style="width: 100%;" mode="widthFix" role="img" lazy-load="true"></image>
				</view>
				<view class="textClass generalStyle">{{item.newsContent}}</view>
				<view class="detailClass generalStyle">
					<text class="detailText">查看详情</text>
					<text class="more-icon jdticon icon-you"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tweetArticle:[
				// 	{
				// 	tweetID:0,
				// 	time:'2020-03-24 12:01',
				// 	title:'重要通知一',
				// 	src:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3761064275,227090144&fm=26&gp=0.jpg',
				// 	text:'虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。',
				// },
				// {
				// 	tweetID:1,
				// 	time:'2020-03-24 12:33',
				// 	title:'新品上市，全场满199减50',
				// 	src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556465765776&di=57bb5ff70dc4f67dcdb856e5d123c9e7&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fd015aa4d95fa801206d96069229.jpg%401280w_1l_2o_100sh.jpg',
				// 	text:'虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。',
				// },
				// {
				// 	tweetID:2,
				// 	time:'2020-03-24 12:22',
				// 	title:'重要通知三',
				// 	src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556465765776&di=57bb5ff70dc4f67dcdb856e5d123c9e7&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fd015aa4d95fa801206d96069229.jpg%401280w_1l_2o_100sh.jpg',
				// 	text:'虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。',
				// },
				// {
				// 	tweetID:3,
				// 	time:'2020-03-24 10:01',
				// 	title:'重要通知四',
				// 	src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556465765776&di=57bb5ff70dc4f67dcdb856e5d123c9e7&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fd015aa4d95fa801206d96069229.jpg%401280w_1l_2o_100sh.jpg',
				// 	text:'虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。虽然做了一件好事，但很有可能因此招来他人的无端猜测，例如被质疑是否藏有其他利己动机等，乃至谴责。即便如此，还是要做好事。',
				// },
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.loadData();
		},
		methods:{
			//------------------加载通知----------------
			loadData(){
				var that=this;
				that.tweetArticle=[];
					uni.request({
					url:that.$GrzxInter.Interface.getNews.value,
					method:that.$GrzxInter.Interface.getNews.method,
					success(res) {
						console.log(res)
						for(var i=0;i<res.data.data.length;i++){
							res.data.data[i].newsContent=res.data.data[i].newsContent.slice(6,30);
							that.tweetArticle.push(res.data.data[i]);
						}
					}
				})
			},
			//------------------选择通知----------------
			selete(e){
				uni.setStorage({
					key:'detailTweet',
					data:e
				})
				uni.navigateTo({
					//url:'/pages/GRZX/detailTweet'
					url:this.$GrzxInter.Route.detailTweet.url,
				})
			},
		}
		
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F9FA;
	}
	.boxClass{
		display: flex;
		flex-direction: column;
		margin-top: 24upx;
		margin-bottom: 30upx;
	}
	.boxClass1{
		width: 92%;
		background-color: #FFFFFF;
		margin-top: 20upx;
		margin-left: 4%;
		//margin-bottom: 20upx;
		border-radius: 10upx;
	}
	.generalStyle{
		width: 92%;
		margin-left: 4%;
	}
	.titleClass{	//标题
		font-size: 32upx;
		color: #333333;
		line-height: 90upx;
		height: 90upx;
	}
	.textClass{		//正文
		font-size: 28upx;
		color: #333333;
		line-height: 50upx;
		height: 54upx;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		
	}
	.imgClass{		//图片
	
	}
	.more-icon{
		font-size: 32upx;
		padding-left: 79%;
	}
	.detailClass{
		height: 80upx;
		line-height: 77upx;
		// border-top: 1rpx solid #DDDDDD;
	}
	.detailText{
		font-size: 24upx;
		color: #707070;
	}
	.timeClass{		//时间
		color: #707070;
		font-size: 28upx;
		height: 40upx;
		line-height: 40upx;
		width: 100%;
		text-align: center;
	}
</style>
