<template>
	<view class="Ly_background">
			<!-- 顶部轮播图（可点击进入相册并放大） -->
			<swiper class="swi" circular autoplay >
				<swiper-item class="swi-item" v-for="(item,index) in piclist" :key="index">
				<image :src="item.src" @click="goImgList" />
				<view class="view">{{imgnumber}}张图片</view>
				</swiper-item>
			</swiper>
			<view>
				<!-- 标题、发布时间、点击量、分享 -->
				<view class="clicks">
				<text class="title">{{scSpotContent.scenicName}}</text>
				
				<text class="time">开放时间：{{scSpotContent.openup}} </text>
				</view>
			</view>
			<!-- 门票滑块 -->
			<!-- 模块命名：Tk -->
			<scroll-view class="Tk_scrollview">
			<view class="tweetsTitle2">门票</view>
			<view class="Tk_item" v-for="(item,index) in scSpotContent.ticket" v-if="index<3" :key="index" @click="godetail('/pages/order/ticketOrder')">
				<view class="Tk_bacg">
					<text class="Tk_text1">{{item.title}}</text>
					<text class="Tk_text3">¥{{item.price}}元</text>
					<text class="Tk_text2">{{item.comment}}</text>
					<view class="Tk_butter">立即预订</view>
				</view>
			</view> 
			</scroll-view>
			<!-- 文章内容 -->
			<view class="Zj_background">
				<view class="tweetsTitle">介绍</view>
				<view class="tweetscontent">{{scSpotContent.scenicContent}}</view>
			</view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				piclist :[],    //相册图片数组
				imgnumber : '', //图片张数
				scSpotContent : {}, //景区内容
				scrollTop: 0,	//相册图片
			}
		},
		onLoad(){
			// let id = options.id;
			// if(id){
			// 	this.$api.msg(`点击了${id}`);
			// }
			this.tweetsInit();
			
		},
		onNavigationBarButtonTap : function() {
					 this.share();
		},
		onShareAppMessage(res){
			  if (res.from === 'menu') {// 来自页面内分享按钮
			     return{
			     	title : '来自'+this.userInfo.nickname+'的分享',
					imageUrl : this.scSpotContent.image[0].src,
					success: function () {
					    uni.showToast({
					    	title:'分享成功',
							duration : 3000
					    })
					},
					fail: function () {
					    uni.showToast({
					    	title:'分享失败',
							duration : 3000
					    })
					}
			     }
			    }
				
		},
		methods: {
			//读取静态数据json.js 
			async tweetsInit(){
				let scSpotDetails = await this.$api.lyfw('scSpotDetails');
				this.scSpotContent = scSpotDetails;
				this.piclist = scSpotDetails.image;
				this.imgnumber = scSpotDetails.imageNumber;
				// console.log(this.scSpotContent)
			},
			//保存图片至本地并打开新页面
			goImgList(){
				uni.setStorageSync('imagePiclist',this.piclist);
				uni.navigateTo({
					url:'/pages/sy_touristroute/imglist'
				})
			},
			//路由整合
			godetail : function (url){
				// console.log(id)
				// uni.showToast({
				// 	title:'你点击了'+value,
				// 	icon: 'none'
				// })
				uni.navigateTo({
					url
				})
			},
			
			//分享
			share(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: "http://www.baidu.com",
				    title: "来自"+this.userInfo.nickname+"的分享",
				    summary: this.scSpotContent.title,
				    imageUrl: this.scSpotContent.image[0].src,
				    success: function () {
				        uni.showToast({
				        	title:'分享成功',
							duration : 3000
				        })
				    },
				    fail: function () {
				        uni.showToast({
				        	title:'分享失败',
							duration : 3000
				        })
				    }
				}); 
			},
			// 统一跳转接口
			navTo(url){
				uni.navigateTo({
					url
				})  
			},
			
		} 
	}
</script>

<style lang="scss">
	//页面背景
	.Ly_background{
		width: 100%;
		height: 100%;
		background: #fff;
		//顶部轮播区样式
		.swi {
			width: 100%;
			height: 440upx;
			.swi-item {
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			image {
				width: 100%;
				height: 100%;
			}
		}
		//相册下标
		.view {
			background-color: rgba(0, 0, 0, 0.7);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 32upx;
			height: 48upx;
			position: absolute;
			bottom: 24upx;
			right: 24upx;
			font-size: 30upx;
			border-radius: 24upx;
		}
		
		//时间、点击量、标题
		.clicks{
			display: flex;
			flex-direction: column;
			//标题
			.title{
				font-size: 44upx;
				font-weight: bold;
				color: #333333;
				padding-top: 32upx;
				padding: 32upx 32upx;
			}
			//时间
			.time{
				font-size: 32upx;
				color: #333333;
				padding-left: 32upx;
				margin: 24upx 0;
			}
		}
		
		//Y轴滚动视图
		.Tk_scrollview{
			width: 100%;
			margin: 0 auto;
			background: #fff;
			.Tk_item{
				 background: #f5f5f5;
				 margin: 32upx 32upx;
				 border-radius: 16upx;
				 display: flex;
				.Tk_bacg{
					position: relative;
					margin: 32upx 32upx;
					.Tk_text1{
						 font-size: 32upx;
						 display: flex;
						 // text-overflow:ellipsis; //文章超出宽度隐藏并用...表示
						 // white-space:nowrap;
						 // overflow:hidden;
						 width:480upx;			//内容宽度
					}
					.Tk_text2{
						 font-size: 26upx;
						 margin-top: 20upx;
						 display: block; // 让字体换行
					}
					.Tk_text3{
						 position: absolute;
						 float: right;
						 right: -156upx;
						 top: 0upx;
						 font-size: 28upx;
						 // margin-top: 28upx;
						 color: #FF6600;
					}
					.Tk_butter{
						position: absolute;
						width: 164upx;
						height: 64upx;
						background: linear-gradient(to right, #65bbf9,#28a4ff);
						border-radius: 32upx; 
						margin-top: 24upx;
						right: -156upx;
						top: 55upx;
						color: #FFFFFF;
						font-size: 28upx;
						text-align: center;
						line-height: 64upx;
					}
				}
				
			}
		}
		
		//推文标题
		.tweetsTitle{
			font-size: 38upx;
			font-weight: bold;
			color: #333333; 
			padding: 24upx 32upx;
			padding-top: 40upx;
		}
		.tweetsTitle2{
			font-size: 38upx;
			font-weight: bold;
			color: #333333; 
			padding: 24upx 32upx;
			padding-top: 40upx;
		}
		//推文内容
		.tweetscontent{
			display: flex;
			position : relative;
			flex-direction: column;
			font-size: 34upx;
			letter-spacing : 2upx;
			color: #333333; 
			// bottom : 72upx;
			padding: 32upx 32upx;
		}
	}
</style>
