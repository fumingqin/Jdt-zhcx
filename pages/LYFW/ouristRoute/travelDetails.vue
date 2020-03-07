<template>
	<view>
		<!-- 顶部轮播图（可点击进入相册并放大） -->
		<swiper class="swi" circular autoplay>
			<swiper-item class="swiItem" v-for="(item,index) in picList" :key="index" @click="goImgList">
				<image :src="item.src"/>
				<!-- <view class="view">{{imgnumber}}</view> -->
			</swiper-item>
		</swiper>
		
		<!-- 白色背景内容 -->
		<view class="whiteBg">
		</view>
		
		<!-- 顶部内容 -->
		<view>
			<!-- 标题、发布时间、点击量、分享 -->
			<view class="content">
				<text class="title">{{titleClick.title}}</text>
				<text class="timeHits">{{titleClick.time}}&nbsp;&nbsp;{{titleClick.clicks}}次游览</text>
			</view>
			
			<!-- 头像、名称、签名、地址 -->
			<view class="portrait">
				<image class="headImage" :src="titleClick.headImage"/>
				<view class="nickName">{{titleClick.nickName}}</view>
				<view class="autograph">{{titleClick.autograph}}</view>
				<view class="address">|&nbsp;&nbsp;&nbsp;{{titleClick.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picList :[],    //相册图片数组
				titleClick:'', //标题,点击量
				headImage:'', //用户头像
				nickName:'', //用户名称
				autograph:'', //用户签名
				address:'', //用户地址
			}
		},
		onLoad() {
			this.routeInit();
		},
		
		methods: {
			//读取静态数据json.js
			async routeInit(){
				let routeComment = await this.$api.lyfwcwd('routeComment');
				this.picList = routeComment.data.image;
				this.titleClick = routeComment.data;
				// console.log(this.picList)
			},
			//保存图片至本地并打开新页面
			goImgList(){
				uni.setStorageSync('imagePiclist',this.picList);
				uni.navigateTo({
					url:'/pages/LYFW/currency/imglist'
				})
			},
		}
	}
</script>

<style lang="scss">
		//轮播图样式
		.swi{
			width: 100%;
			height: 440upx;
			.swiItem{
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		// 白色背景模块
		.whiteBg{
			position: relative;
			z-index: 1;
			padding: 80upx 0;
			width: 100%;
			left: 0upx;
			top: -72upx;
			background: #FFFFFF;
			border-radius: 44upx;
		}
		
		//时间，点击量，标题
		.content{
			display: flex;
			position: relative;
			//标题
			.title{
				position: absolute;
				z-index: 2;
				font-size: 44upx;
				font-weight: bold;
				color: #333333;
				padding: 32upx 32upx;
				top: -227upx;
			}
			.timeHits{
				position: absolute;
				z-index: 3;
				top: -126upx;
				font-size: 28upx;
				color: #333333;
				padding-left: 32upx;
			}
		}
		
		// 头像、名称、签名、地址
		.portrait{
			display: flex;
			position: relative;
			top: 36upx;
			//头像
			.headImage{
				position: absolute;
				z-index: 3;
				width: 80upx;
				height: 80upx;
				left: 30upx;
				top: -74upx;
				border-radius: 50%;
			}
			//名字
			.nickName{
				position: absolute;
				z-index: 4;
				font-size: 32upx;
				color: #333333;
				left: 128upx;
				bottom : 31upx;
				text-overflow:ellipsis;
				white-space:nowrap;
				overflow:hidden;
				width:160px;
			}
			//签名
			.autograph{
				position: absolute;
				z-index: 5;
				font-size: 26upx;
				color: #aaa;
				left: 128upx;
				bottom : -1upx;
				text-overflow:ellipsis;
				white-space:nowrap;
				overflow:hidden;
				width:160px;
			}
			.address{
				position: absolute;
				z-index: 6;
				text-align: right;
				display: flex;
				flex-direction: column;
				font-size: 34upx;
				color: #333;
				right: 32upx;
				bottom : 18upx;
			}
		}
	
</style>
