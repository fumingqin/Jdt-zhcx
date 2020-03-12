<template>
	<view>
		<view>
			<!-- 顶部搜索栏 -->
			<view class="searchTopBox">
				<view class="searchBoxRadius">
					<input class="inputIocale" type="search" v-model="ipt" @confirm="searchNow" placeholder="搜索景区名称" />
					<image class="searchImage" src="../../../static/LYFW/peripheralTourism/peripheralTourism/search.png" />
				</view>
			</view>
			<!-- 选择地址 -->
			<view class="selectAddress">
				<text  class="locationTxt" @click="oncity">{{region}}</text>
				<text class="jdticon icon-xia" @click="oncity"></text>
				<popup-layer ref="popupRef" :direction="'right'">
				<view style="width:750upx;height: 100%;">
					<citySelect  @back_city="back_city"></citySelect>
				</view>
				</popup-layer>
			</view>
		</view>
		
		<!-- 顶部轮播图（可点击进入相册并放大） -->
		<view class="recommendTitle">推荐</view>
		<!-- 滑块视图容器 -->
		<swiper class="swiClass" circular autoplay >
			<swiper-item class="swiItem" v-for="(item,index) in piclist" :key="index" @click="godetail(item.title)">
			<view class="swiTitle">{{item.title}}</view>
			<image :src="item.src"/>
			</swiper-item>
		</swiper>
		
		<!-- 下标+选择标题 -->
		<view class="box">
			<QStabs :current="currentText" :tabs="tabsChoice" minWidth="250" @change="change($event)"/>
		</view>
		
		<!-- 旅游路线-景点内容 -->
		<view>
			<view class="tkScrollview" v-for="(item,index) in touristRoute" :key="index" @click="godetail(item.scennicName)">
				<view class="tkItem" >
					<view class="register"></view>
					<image class="tkImage" :src="item.image" mode="aspectFill"/>
					<text class="tkText">{{item.scennicName}}</text>
					<text class="date">发布时间:{{item.date}}</text>
					<!-- 喜欢和评论数量 -->
					<view class="tkBtn" style="display: flex;">
						<text class="jdticon icon-shoucang"></text>
						<text class="right">{{item.like}}</text>
						<text class="jdticon icon-pinglun-copy"></text>	
						<text class="right">{{item.comment}}</text>
					</view>
					<!-- 头像和名字 -->
					<view class="imageView">
						<image class="headImage" :src="item.headImage"></image>
						<text class="nikeName">{{item.nickName}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QStabs from '../../../components/QS-tabs/QS-tabs.vue'
	import citySelect from '../../../components/uni-location/linzq-citySelect/linzq-citySelect.vue'
	import popupLayer from '../../../components/uni-location/popup-layer/popup-layer.vue'
	export default {
		components:{
			QStabs,
			citySelect,
			popupLayer,
		},
		
		mounted() {  
			this.$refs.popupRef.close();
		},
		
		data() {
			return {
				statusBarHeight: this.statusBarHeight, //状态栏高度，在main.js里
				region: '请选择', //地区 
				ipt: '',	//搜索默认值
				// autograph:'', //用户签名
				nickName : '', //用户姓名
				headImage: '',  //用户头像
				piclist:[], //相册图片数组
				tabsChoice:['热门路线','精选路线','最新发布'],//选择标题
				currentText:0,//标题下标
				touristRoute : [], //景点内容
				filterIndex : 0,//tabs默认值
				loadingType: 'more', //加载更多状态
			}
		},
		
		//返回接口数据调用
		onLoad() {
			this.lunBoInit();
			this.loadData();
		},
		
		methods: {
			//地址点击事件
			oncity() {
			    var that = this
			    this.$refs.popupRef.show();
			   },
			   back_city(e) { 
			    if (e !== 'no') {
			     this.region = e.cityName
			     this.$refs.popupRef.close();
			    } else {
			     this.$refs.popupRef.close();
			    }
			   },
			
			//读取静态页面json.js
			async lunBoInit(){
				let lunBo = await this.$api.lyfwcwd('lunBo');
				this.piclist = lunBo.data.image;
				let tourist_route = await this.$api.lyfwcwd('touristRoute');
				this.touristRoute = tourist_route.data;
			},
			
			//搜索事件
			searchNow: function(e) {
				if (this.ipt == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					// return false;
				}
				uni.showToast({
					title:'你搜索了'+this.ipt,
					icon:'none',
				})
				this.ipt = ''
			}, 
			
			change(index){
				this.currentText = index;
				this.filterIndex = index;
					uni.pageScrollTo({
						duration: 300,
						scrollTop: 0
					})
					this.loadData('refesh',1);
			},
			
			//加载信息，带下拉刷新和上滑刷新加载
			async loadData(type='add',loading){
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more';
				}
				
				let touristRoute = await this.$api.lyfwcwd('touristRoute');
				if(type === 'refresh'){
					this.touristRoute = [];
				}
				
				//筛选，测试数据直接前端筛选了
					if(this.filterIndex === 0){
						touristRoute.data.sort((a,b)=>b.like - a.like)
					}
					if(this.filterIndex === 1){
						touristRoute.data.sort((a,b)=>a.routeId - b.routeId)
					}
					if(this.filterIndex === 2){
						touristRoute.data.sort((a,b)=>a.date < b.date ? 1:-1)
					} 
					// this.scenicSpot = this.scenicSpot.concat(scenicSpot);
					
					// 判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType = this.touristRoute.length > 20 ? 'nomore' : 'more';
					if(type === 'refresh'){
						if(loading == 1){
							uni.hideLoading()
						}else{
							uni.stopPullDownRefresh();
						}
					}
				},
				
				//景点内容点击
				godetail : function (e){
					uni.showToast({
						title:'你点击了'+e,
						icon:'none'
					})
					setTimeout(function(){
						uni.navigateTo({
							url:'travelDetails'
						})
					},500);
				},
		}
	}
</script>

<style lang="scss">
	//搜索栏区域样式
	.searchTopBox {
		display: flex;
		margin-top: 28upx;
		.searchBoxRadius {
			position: relative;
			right: -157upx;
			width: 76%;
			height: 74upx;
			background-color: #fff;
			overflow: hidden;
			border-radius: 46upx;
			background: #f5f5f5;
			.searchImage {
				position: absolute;
				padding-left: 16upx;
				padding-top: 15upx;
				width: 48upx;
				height: 48upx;
			}
			.inputIocale {
				position: absolute;
				height: 70upx;
				padding-top : 4upx;
				padding-left: 64upx;
				font-size: 30upx;
			}
			
		}
	}
	//选择地址
	.selectAddress{
		display: flex;
		position: relative;
		margin-top: -56upx;
		.locationTxt{
				position: absolute;
		 		color: #808080; 
		 		padding-left: 11px;
		 		width: 44px;
		 		font-size: 29upx;
				padding-top: 0upx;
				overflow: hidden;    
				text-overflow:ellipsis;    
				white-space: nowrap;   
		 }
		 .jdticon{
			 position: relative;
			 padding-top: 11upx;
			 padding-left: 111upx;
		 }
		//定位
		.height {
		        height: var(--status-bar-height);
		}
		 
	}
	
	
	
		 // /* 左上角所在城市文本 */
		 // .locationTxt{
		 // 		color: #808080; 
		 // 		padding-top: 7px;
		 // 		padding-left: 8px;
		 // 		width: 55px;
		 // 		font-size: 31upx;
			// 	padding-top: 40upx;
			// 	text-overflow:ellipsis;//文本溢出：省略号
		 // }
		 
		 //  //定位
		 //  .height {
		 //  		height: var(--status-bar-height);
		 //  	}
	
	// /* 景点搜索框 */
	//  .inputIocale{
	//   text-align: left;
	//   background-color: #F5F5F5;
	//   width: 192px;
	//   background-image: url(../../../static/LYFW/peripheralTourism/peripheralTourism/search.png);
	//   background-size: 48upx 50upx;
	//   background-position: 16upx 12upx;/*小图标在input的位置*/
	//   background-repeat: no-repeat;
	//   padding: 2px 14px 6px 40px;/*设置input内边距*/
	//   padding-left: 70upx;
	//   padding-top: 11upx;
	//   margin-left: 5px;
	//   margin-top: 24upx;
	//   border-radius:46upx;
	//   font-size: 29rpx;
	//  },
	//  //定位
	//  .height {
	//  		height: var(--status-bar-height);
	//  	}
	//  /* 搜索栏区域样式 */
	//  .searchArea{
	//  		display: flex;
	//  		padding-left: 10upx;
	//  		text-align: center;	
	//  }
	//  /* 左上角所在城市文本 */
	//  .locationTxt{
	//  		color: #808080; 
	//  		padding-top: 7px;
	//  		padding-left: 8px;
	//  		width: 55px;
	//  		font-size: 31upx;
	// 		padding-top: 40upx;
	// 		text-overflow:ellipsis;//文本溢出：省略号
	//  }
		
	
	//标题样式
	.recommendTitle{
		font-size: 36upx;
		font-weight: bold;
		color: #333333; 
		padding-left: 32upx;
		margin-top: 29upx;
	}
	
	//顶部轮播图样式
	.swiClass{
		width: 100%;
		height: 362upx;
			.swiItem {
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			image {
				margin-top:-26upx;
				width: 92%;
				height: 82%;
				margin-left: 32upx;
				margin-right: 32upx;
				border-radius: 12upx;
				margin-bottom: 1upx;
			}
			.swiTitle{
				z-index: 999;//最外层
				display: flex;
				position: relative;
				color: #fff;
				padding-left: 49upx;
				top : 257upx;
			}
			
	},
	
	.box{
		z-index: 999;//最外层
		position: absolute;//绝对位置
		margin-top: -11upx;
		position: sticky;
		top: 0;
		background: #fff;
	},
	
	//Y轴滚动视图
	.tkScrollview{
		width: 689upx;
		padding: 16upx 32upx;
		// margin: 0 auto;
		
	}
		.tkItem{
			display: flex;
			//背景图片样式
			.tkImage{
				position: relative;
				z-index: 0;
				width: 100%;
				height: 229upx;
				border-radius: 12upx;
				margin: 7upx 0upx;
				margin-top: 20upx;
			}
			//黑幕样式
			.register{
				position: absolute;
				z-index: 1;
				width: 689upx;
				height: 229upx;
				border-radius: 12upx;
				background:rgba(7,17,27,0.3);
				// margin-left: -2upx;
				margin-top: 20upx;
			}
			//标题名字样式
			.tkText{
				position: absolute;
				z-index:2;
				font-weight: bold;//字体加粗
				color: #FFFFFF;
				font-size: 39upx;
				left: 48upx;
				margin-top: 40upx;
			}
			//发布时间样式
			.date{
				position: absolute;
				z-index: 3;
				font-size: 25upx;
				color: #FFFFFF;
				left: 48upx;
				margin-top: 96upx;
			}
			//喜欢和评论数量
			.tkBtn{
				position: absolute;
				margin-top:142upx;
				left: 32upx;
				z-index: 4;
				.right{
					color: #FFFFFF;
					font-size: 22upx;
					margin-left: 12upx;
				}
				.jdticon{
					color: #FFFFFF;
					font-size: 26upx;
					left: 5upx;
					margin-left: 16upx;
				}
			}
			// 头像和名字样式
			.imageView{
				display: flex;
				z-index: 5;
				.headImage{
					position: absolute;
					width: 38upx;
					height: 38upx;
					left: 48upx;
					border:0upx solid #fff;
					border-radius: 50%;
					margin-top: 195upx;
				}
				.nikeName{
					position: absolute;
					font-size: 29upx;
					color: #FFFFFF;
					left: 96upx;
					margin-top: 195upx;
					// text-overflow:ellipsis;//文本溢出：省略号
					// white-space:nowrap;//空白
					// overflow:hidden;//溢出隐藏
					// width:160px;
					// bottom: 40upx;
				}
				.icon{
				}
			}
			

				
				
				
		
			
	}
</style>
