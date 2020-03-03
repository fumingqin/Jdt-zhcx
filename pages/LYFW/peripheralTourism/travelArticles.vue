<template>
	<view>
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
		<text class="title">{{tweets.title}}</text>
		<text class="time">{{tweets.date}}&nbsp;&nbsp;{{tweets.clicks}}万次游览</text>
		</view>
		
		<!-- 头像、名称、签名、地址 -->
		<image class="portrait" :src="tweets.portrait"/>
		<view class="nickname">{{tweets.nickname}}</view>
		<view class="autograph">{{tweets.autograph}}</view>
		<view class="address">|&nbsp;&nbsp;&nbsp;{{tweets.address}}</view> 
	</view>
	<!-- 景点视图滑块 -->
	<!-- 模块命名：Hk -->
	<view>
		<scroll-view class="Hk_scrollview" scroll-x="ture" >
			<block v-for="(item,index) in tweets.scenicSpot" :key="index"> 
				<view class="Hk_item" @click="godetail(item.scennicName)">
					<image class="Hk_image" :src="item.image" mode=""/>
					<view class="Hk_text1">{{item.scennicName}}</view>
					<text class="Hk_text2">{{item.related}}篇点评</text>
					<text class="Hk_text3">位于{{item.attribute}}</text>
				</view>
			</block>	
		</scroll-view>
	</view>
	<!-- 文章正文 -->
	<view>
	     <rich-text :nodes="nodes" bindtap="tap"></rich-text>
	</view>
	</view>
</template>

<script>
	export default{
	data(){
		return{
			replyInput : {
				unid : '',     //用户id号
				nickname : '', //用户姓名
				portrait: '',  //用户头像
				content : '',  //回复内容
				date : '2019-12-21',  //回复日期
				fabulous : 0, 		  //点赞数
				fabulous_state : false,	 //点赞状态
			}, //评论内容
			piclist :[],    //相册图片数组
			imgnumber : '', //图片张数
			tweets : {},    //用户内容
			scenicSpot : [], //景点内容
			replyContent : [],//回复内容
			scrollTop: 0,	//相册图片
			// 富文本文章
			nodes: [
			                {
			                    name: 'div',
			                    attrs: {
			                        class: 'div_class',
			                        style: 'line-height: 60px; color: red;'
			                    },
			                    children: [
			                        {
			                            type: 'text',
			                            text: 'Hello&nbsp;World!'
			                        },
			                        {
			                            name:"img",
			                            attrs: {
			                                style: 'width: 100px;',
			                                src:'http://photocdn.sohu.com/20120910/Img352705474.jpg'
			                            },
			                        }
			                    ]
			                },
			            ]
		}
	},
	onLoad() {
		this.tweetsInit();
	},
	methods:{
		async tweetsInit(){
			let ts = await this.$api.lyfwlql('tweets');
			this.tweets = ts;
			this.piclist = ts.image;
			this.imgnumber = ts.imageNumber;
			console.log(this.piclist)
			
		// 	let scenicSpot = await this.$api.json('scenicSpot');
		// 	this.scenicSpot = scenicSpot;
		
		
		// 	let replycontent = await this.$api.json('reply');
		// 	this.replyContent = replycontent;
			
		// 	//个人信息
		// 	this.replyInput.unid = this.userInfo.unid;
		// 	this.replyInput.nickname = this.userInfo.nickname;
		// 	this.replyInput.portrait = this.userInfo.portrait;
		// 	// console.log(this.favorite)
		},
	},
	//保存图片至本地并打开新页面
	goImgList(){
		uni.setStorageSync('imagePiclist',this.piclist);
		uni.navigateTo({
			url:'/pages/sy_touristroute/imglist'
		})
	},
	//路由整合
	godetail : function (value){
		// console.log(id)
		uni.showToast({
			title:'你点击了'+value,
		})
		// uni.navigateTo({
		// 	url'',
		// })
	},

	}
</script>

<style lang="scss">
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
			font-size: 28upx;
			color: #333333;
			padding-left: 32upx;
		}
	}
	//头像
	.portrait{
		display:flex;
		position: relative;
		width: 104upx;
		height: 104upx;
		left: 30upx;
		top: 48upx;
		border:5upx solid #fff;
		border-radius: 50%;
	}
	//名称
	.nickname{
		position: relative;
		font-size: 32upx;
		color: #333333;
		margin-left: 156upx;
		bottom : 44upx;
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
		width:160px;
	}
	//签名
	.autograph{
		position: relative;
		font-size: 26upx;
		color: #aaa;
		margin-left: 156upx;
		bottom : 38upx;
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
		width:160px;
	}
	//地址
	.address{
		position: relative;
		text-align: right;
		display: flex;
		flex-direction: column;
		font-size: 34upx;
		color: #333;
		right: 32upx;
		bottom : 104upx;
	}
	//X轴滚动视图
	.Hk_scrollview{
		white-space: nowrap; // 滚动必须加的属性
		width: 100%;
		height: 240upx;
		padding: 20upx;
		margin: 0 auto;
		.Hk_item{
			 margin-right: 20upx;
			 display: inline-block;
			 vertical-align: top;
		}
		.Hk_image{
				position: relative ;
				top: 8upx;
				width: 152upx;
				height: 152upx;
				border-radius: 12upx;
				margin: 16rpx 16rpx;
			}
		.Hk_text1{
			 position: relative ;
			 text-overflow:ellipsis; //文章超出宽度隐藏并用...表示
			 white-space:nowrap;
			 overflow:hidden;
			 width:240px;			//内容宽度
			 padding-right: 20upx;
			 bottom: 172upx;
			 margin-left: 200upx;
		}
		.Hk_text2{
			 position: relative ;
			 padding-right: 20upx;
			 bottom: 172upx;
			 margin-left: 200upx;
			 font-size: 26upx;
			 margin-top: 20upx;
			 display: block; // 让字体换行
		}
		.Hk_text3{
			 position: relative ;
			 padding-right: 20upx;
			 bottom: 172upx;
			 margin-left: 200upx;
			 font-size: 24upx;
			 margin-top: 28upx;
			 color: #AAAAAA;
			 display: block; // 让字体换行
		}
	}
</style>
