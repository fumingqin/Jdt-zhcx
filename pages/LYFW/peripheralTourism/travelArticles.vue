<template>
	<view>
			<!-- 顶部轮播图（可点击进入相册并放大） -->
			<swiper class="swi" circular autoplay >
				<swiper-item class="swi-item" v-for="(item,index) in piclist" :key="index">
				<image :src="item.src"  @click="goImgList"/>
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
			</view> <!-- jiewei1 -->
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
			</view> <!-- jiewei2 -->
			<!-- 文章内容 -->
			<view class="Zj_background">
				<view class="tweetsTitle">介绍</view>
				<!-- <view class="tweetscontent">{{tweets.titlecontent}}</view> -->
			</view> <!-- jiewei3 -->
			<!-- 富文本 -->
			<view class="content">
				<jyf-parser :html="articleTitle" style="text-align: center;font-size: 38upx;font-weight: bold;" ref="article"></jyf-parser>
				<jyf-parser :html="html" style="font-size: 32upx;" ref="article"></jyf-parser><!-- transform: scale(0.9); 字体大小可以缩放-->
			</view>
			<!-- 回复区 -->
			<!-- 模块命名：Hf -->
			<view>
				<view class="tweetsTitle">回复</view> 
				<view class="Hf_box" style="margin-bottom: 72upx;" >
					<image class="Hf_image" :src="replyInput.portrait || '/static/LYFW/peripheralTourism/user/missing-face.png'" mode="aspectFill" ></image>
					<input class="Hf_input" type="text" placeholder="回复点什么吧" v-model="replyInput.content"  />
			</view>
			
			<view class="Hf_box" v-for="(item,index) in replyContent" v-if="index<3" :key="index">
				<image class="Hf_portrait" :src="item.portrait" mode="aspectFill"></image>
				<view class="Hf_right">
					<text class="Hf_name">{{item.scennicName}}</text>
					<text class="Hf_date">{{item.date}}</text>
					<view class=".Hf_btn" :class="{active: item.fabulous_state}" @click="tofabulous(index)" >
						<text class="yticon jdticon icon-shoucang"></text>
						<text>{{item.fabulous}}</text>
					</view>
					<text class="Hf_con">{{item.content}}</text>
	                </view>
                </view>
            </view>
			<view class="Hf_viewreply" @click="navTo('/pages/peripheralTourism/toreply')">
				<text> 查看{{replyContent.length}}条回复 ></text>
			</view><!-- jiewei4 -->
			
			<view class="page-bottom">
				<!-- 收藏 -->
				<view class="p-b-btn" :class="{active: tweets.collection_state}"  @click="toFavorite1">
					<text class="yticon jdticon icon-shoucang2"></text>
					<text>{{tweets.collection}}</text>
				</view>
				<!-- 喜欢 -->
				<view class="p-b-btn" :class="{active: tweets.like_state}" @click="toFavorite2">
					<text class="yticon jdticon icon-shoucang"></text>
					<text>{{tweets.like}}</text>
				</view>
				<!-- 评论 -->
				<view  class="p-b-btn" :class="{active: tweets.comment_state}" @click="navTo('/pages/peripheralTourism/toreply')">
					<text class="yticon jdticon icon-pinglun-copy"></text>
					<text>{{replyContent.length}}</text>
				</view>
				<view class="action-btn-group">
							<button type="primary" class=" action-btn" @click="open">查看景点</button>
							<!-- 嵌套弹框组件popup -->
							<uni-popup  ref="popup" type="bottom">
							<view>
								<scroll-view class="Tk_scrollview" scroll-y="ture" >
									<view class="tweetsTitle2">文中提及的地点</view> 
									<view class="Tk_item" v-for="(item,index) in tweets.scenicSpot" :key="index" @click="godetail(item.scennicName)">
										<image class="Tk_image" :src="item.image" mode=""/>
										<view class="Tk_bacg">
											<text class="Tk_text1">{{item.scennicName}}</text>
											<text class="Tk_text2">{{item.related}}篇点评</text>
											<text class="Tk_text3">位于{{item.attribute}}</text>
										</view>
										</view>
										<view class="tweetsTitle2">周边景点</view>
										<view class="Tk_item" v-for="(item,index) in scenicSpot" :key="index" @click="godetail(item.scennicName)">
											<image class="Tk_image" :src="item.image" mode=""/>
											<view class="Tk_bacg">
												<text class="Tk_text1">{{item.scennicName}}</text>
												<text class="Tk_text2">{{item.related}}篇点评</text>
												<text class="Tk_text3">位于{{item.attribute}}</text>
										</view>
									</view> 
								</scroll-view>
							</view>	
							</uni-popup>
						</view>
					</view>
				</view><!-- jiewei6 -->
			</view><!-- jiewei5 -->
			
</view>
</template>

<script> 
    var _self;
    import uniPopup from '../../../components/uni-popup/uni-popup.vue'
	import parser from '../../../components/uni-parser/jyf-parser.vue'
	export default{
		components : {
			//加载多方弹框组件
			uniPopup,
			"jyf-parser":parser,
		},
	data(){
		return{
			articleId:'2020-03-09 12:56' ,//文章虚拟ID，测试用
			html:'<em>abc123</em>',//文章内容
			articleTitle:'',//文章标题
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
			
		}
	},
	onLoad() {
		_self=this;
		this.tweetsInit();
		this.getArticleInfo();
	},
	methods:{
		async tweetsInit(){
			let ts = await this.$api.lyfwlql('tweets');
			this.tweets = ts;
			this.piclist = ts.image;
			this.imgnumber = ts.imageNumber;
			console.log(this.piclist)
			
			let scenicSpot = await this.$api.lyfwlql('scenicSpot');
			this.scenicSpot = scenicSpot;
		
		
			let replycontent = await this.$api.lyfwlql('reply');
			this.replyContent = replycontent;
			
			//个人信息
			// this.replyInput.unid = this.userInfo.unid;
			// this.replyInput.nickname = this.userInfo.nickname;
			// this.replyInput.portrait = this.userInfo.portrait;
			// console.log(this.favorite)
		},
		//保存图片至本地并打开新页面
		goImgList(){
			uni.setStorageSync('imagePiclist',this.piclist);
			uni.navigateTo({
				url:'/pages/LYFW/peripheralTourism/imgListlql'
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
		// 根据文章ID,网络请求文章内容
		getArticleInfo :function(){
			uni.request({
				url : 'https://api.gugudata.com/news/wxarticle/demo',
				success : function(res){
					
					console.log(res)
					_self.html=res.data.Data[uni.getStorageSync('_detailId')].ArticleContentWithTags;
					_self.articleTitle=res.data.Data[1].ArticleTitle;
					}
			})
		},
		// 统一跳转接口
		navTo(url){
			uni.navigateTo({
				url :'/pages/LYFW/peripheralTourism/toreply'
			})  
		},
		// 点赞事件
		tofabulous :function(index){
			if(this.replyContent[index].fabulous_state ==false){
				this.replyContent[index].fabulous_state =true;
				var num = this.replyContent[index].fabulous;
				this.replyContent[index].fabulous = num+1;
			}
			else{
				this.replyContent[index].fabulous_state =false;
				var num =this.replyContent[index].fabulous;
				this.replyContent[index].fabulous = num-1;
			}
		},
	    toFavorite1 : function(){
	    		if(this.tweets.collection_state==false){
	    			this.tweets.collection_state = true;
	    			var num = this.tweets.collection;
	    			this.tweets.collection = num+1;
	    		}else {
	    			this.tweets.collection_state = false;
	    			var num = this.tweets.collection;
	    			this.tweets.collection = num-1;
	    		};
	    	},
	    	toFavorite2 : function(){
	    			if(this.tweets.like_state==false){
	    				this.tweets.like_state = true;
	    				var num = this.tweets.like;
	    				this.tweets.like = num+1;
	    			}else {
	    				this.tweets.like_state = false;
	    				var num = this.tweets.like;
	    				this.tweets.like = num-1;
	    			};
	    		},
		open(){
							// 需要在 popup 组件，指定 ref 为 popup
							 this.$refs.popup.open()
						  },
	}  //methed
} //ex
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
	//推文标题
	.tweetsTitle{
		display: flex;
		position : relative;
		flex-direction: column;
		font-size: 38upx;
		font-weight: bold;
		color: #333333; 
		padding: 32upx 32upx;
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
	}
	//下弹框标题
	.tweetsTitle2{
		position : relative;
		font-size: 38upx;
		font-weight: bold;
		color: #333333; 
		padding-top: 32upx;
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
	//推文内容
	.content{
		font-size: 34upx;
		display: flex;
		position : relative;
		flex-direction: column;
		padding: 32upx 32upx;
		.articleTxt{
			text-align: center;
			font-weight: bold;
		}
	}
//回复区
		.Hf_box{
			display: flex;
			.Hf_portrait{
				position: relative;
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				border-radius: 100px;
				left: 30upx;
			}
			.Hf_image{
				position: relative;
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				border-radius: 100px;
				left: 30upx;
			}
			.Hf_input{
				position: relative;
				font-size: 32upx;
				color: #333;
				padding: 12upx 32upx;
				padding-left: 32upx;
				background: #f5f5f5;
				left: 50upx;
				width: 77%;
				height: 80upx;
				border-radius: 56rpx;
			}
			.Hf_right{
				flex: 1;
				display: flex;
				flex-direction: column;
				position: relative;
				font-size: 30upx;
				color: #aaa;
				padding-top: 8upx;
				padding-left: 50upx;
				padding-right: 32upx;
				margin-bottom: 56upx;
				.Hf_btn{
					display:flex;
					align-items:base-line;
					position:absolute;
					top: 18upx;
					right: 48upx;
					font-size: 32upx;
					.yticon{
						font-size: 38upx;
						margin-left: 8upx; 
						color: #aaa;
					}
					&.active, &.active .yticon{
						color: #28a4ff;
					}
				}
				.Hf_con{
					font-size: 30upx;
					color: #333;
					padding-top:32upx;
					padding-right:14upx;
				}
			}
			}
			// 更多回复消息
			.Hf_viewreply{
				height: 56upx;
				font-size: 30upx;
				text-align: center;
				margin-bottom: 200upx;
				background: #FFFFFF;
			}
			// 底部操作菜单
			.page-bottom{
				position:fixed;
				left: 30upx;
				bottom:30upx;
				z-index: 95;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 690upx;
				height: 112upx;
				background: rgba(255,255,255,.9);
				box-shadow: 0 0 12upx 0 rgba(0,0,0,.5);
				border-radius: 16upx;
				
				.p-b-btn{
					display:flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					 font-size: 30upx;
					
					width: 96upx;
					height: 80upx;
					margin: 16upx 16upx;
					.yticon{
						font-size: 40upx;
						line-height: 48upx;
						color: #333333;
					}
					&.active, &.active .yticon{
						color: #ff4443;
					}
					.icon-fenxiang2{
						font-size: 42upx;
						transform: translateY(-2upx);
					}
					.icon-shoucang{
						font-size: 46upx;
					}
				}
				.action-btn-group{
					display: flex;
					height: 76upx;
					border-radius: 100px;
					overflow: hidden;
					box-shadow: 1px 2px 5px #65bbf9;
					background: linear-gradient(to right, #65bbf9,#28a4ff);
					margin: 20upx 20upx;
					position:relative;
					.action-btn{
						display:flex;
						align-items: center;
						justify-content: center;
						width: 224upx;
						height: 100%;
					    font-size: 29upx;
						padding: 0;
						border-radius: 0;
						background: transparent;
					}
				}
			}
			//Y轴滚动视图
			.Tk_scrollview{
				width: 100%;
				padding-left: 32upx;
				margin: 0 auto;
				background: #fff;
				max-height: 800upx;
				.Tk_item{
					 display: flex;
					 .Tk_image{
					 		width: 182upx;
					 		height: 152upx;
					 		border-radius: 12upx;
					 		margin: 24rpx 0rpx;
					 	}
					.Tk_bacg{
						margin-top: 20upx;
						margin-left: 24upx;
					}
					.Tk_text1{
						 display: flex;
						 text-overflow:ellipsis; //文章超出宽度隐藏并用...表示
						 white-space:nowrap;
						 overflow:hidden;
						 width:480upx;			//内容宽度
					}
					.Tk_text2{
						 font-size: 26upx;
						 margin-top: 20upx;
						 display: block; // 让字体换行
					}
					.Tk_text3{
						 font-size: 24upx;
						 margin-top: 28upx;
						 color: #AAAAAA;
						 display: block; // 让字体换行
					}
				}
			}
</style>
