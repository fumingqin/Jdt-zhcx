<template>
	<view>
		<!-- 搜索栏 -->
		<view class="searchTopBox">
			<view class="searchBoxRadius">
				<input class="searchBoxIpt" type="text" v-model="searchValue" @confirm="searchNow" placeholder="搜索景区/地区名称"/>
			</view>
		</view>
		
		<!-- 六宫格景区 -->
		<!-- 命名：six -->
		<view class="currencyTitle">热门景点</view>
		<view class="sixBackground">
			<view v-for="(item,index) in sixPalaceList" v-if="index < 6" :key="index" @click="godetail(item.scName)">
				<view class="darkCurtain"></view>
				<image :src="item.image"></image>
				<view class="sixView">
					<text class="sixText1">{{item.name}}</text>
					<text class="sixText2">{{item.englishName}}</text>
				</view>
			</view>
		</view>
		
		<!-- 筛选列表 -->
		<view class="screenView" :style="{position:headerPosition,top:headerTop}">
			<view class="screenText" :class="{current: screenIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="screenText" :class="{current: screenIndex === 1}" @click="tabClick(1)">
				销量优先
			</view>
			<view class="screenText" :class="{current: screenIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="priceView">
					<text :class="{active: priceOrder === 1 && screenIndex === 2}" class="jdticon icon-shang" ></text>
					<text :class="{active: priceOrder === 2 && screenIndex === 2}"  class="jdticon icon-shang xia" ></text>
				</view>
			</view>
			<text class="cate-item jdticon icon-fenlei1" @click="toggleCateMask('show')"></text>
		</view>
		
		<!-- 筛选的景区列表 -->
		<view>
			<view class="Tk_scrollview" v-for="(item,index) in scenicList" :key="index" @click="godetail(item.scenicName)">
			<view class="Tk_item" >
				<image class="Tk_image" :src="item.image"/>
				<view class="Tk_bacg">
					<text class="Tk_text1">{{item.scenicName}}</text>
					<text class="Tk_text2">{{item.comment}}</text>
					<text class="Tk_text3">¥{{item.adultPrice}}元起</text>
				</view>
			</view>
			</view>
		</view>
		
		<!-- 分类面板 -->
		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content">
				<scroll-view scroll-y class="cate-list">
					<view v-for="item in cateList" :key="item.id">
						<view class="cate-item b-b two">{{item.name}}</view>
						<view 
							v-for="tItem in item.child" :key="tItem.id" 
							class="cate-item b-b" 
							:class="{active: tItem.id==cateId}"
							@click="changeCate(tItem)">
							{{tItem.name}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>


<script>
	export default {
		data() {
			return {
				searchValue : '', //搜索框值
				sixPalaceList : [], //六宫格列表
				screenIndex : 0, //筛选框默认值
				priceOrder : 0, //1 价格从低到高  2价格从高到低
				cateMaskState: 0, //分类面板展开状态
				scenicList : [], //景区列表
				loadingType: 'more', //加载更多状态 
				cateId: 0, //已选三级分类id
				cateList: [],//分类数组
			}
		},
		onLoad(options) {
			this.cateId = options.tid;
			this.loadCateList(options.fid,options.sid);
			this.lyfwData();
			this.loadData();
		}, 
		
		methods: {
			//请求模拟接口数据
			async lyfwData(){
				let sixPalaceList = await this.$api.lyfwfmq('sixPalaceList');
				this.sixPalaceList = sixPalaceList;
				// console.log(this.sixPalaceList)
			},
			
			//加载分类
			async loadCateList(fid, sid){
				let list = await this.$api.sceniclist('cateList');
				let cateList = list.filter(item=>item.pid == fid);
				cateList.forEach(item=>{
					let tempList = list.filter(val=>val.pid == item.id);
					item.child = tempList;
				})
				this.cateList = cateList;
			},
			
			//搜索框-搜索
			searchNow : function(){
				if(this.searchValue ==''){
					uni.showToast({
						title:'未输入搜索关键字',
						icon:'none',
						duration:1000
					});
					// retuan false;
				}
				uni.showToast({
					title:'你搜索了'+this.searchValue,
					icon:'none',
				})
				this.searchValue = ''
			},
			
			//路由整合
			godetail : function (value){
				uni.showToast({
					title: '点击了'+value,
					icon: 'none',
				});
				setTimeout(function(){
					uni.navigateTo({
						url : '/pages/LYFW/scenicSpotTickets/ticketsDetails'
					})
				},500);
			},
			
			//筛选点击
			tabClick(index){
				if(this.screenIndex === index && index !== 2){
					return;
				}
				this.screenIndex = index;
				if(index === 2){
					this.priceOrder = this.priceOrder === 1 ? 2: 1;
				}else{
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
			},
			
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			
			//分类点击
			changeCate : function(item){
				// console.log(item)
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在搜索'+item.name,
				})
			},
			
			
			//加载信息 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				let scenicList = await this.$api.lyfwfmq('scenicList');
				if(type === 'refresh'){
					this.scenicList = [];
				}
				
				//筛选，测试数据直接前端筛选了
				if(this.screenIndex === 0){
					scenicList.sort((a,b)=>a.scenicId - b.scenicId)
				}
				if(this.screenIndex === 1){
					scenicList.sort((a,b)=>b.sales - a.sales)
				}
				if(this.screenIndex === 2){
					scenicList.sort((a,b)=>{
						if(this.priceOrder == 1){
							return a.adultPrice - b.adultPrice;
						}
						return b.adultPrice - a.adultPrice;
					})
				}
				
				this.scenicList = this.scenicList.concat(scenicList); 
				
				// 判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				// this.loadingType  = this.scenicList.length > 20 ? 'nomore' : 'more';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			}
			
			
			
		}
	}
</script>

<style lang="scss">
	//搜索框
	.searchTopBox{
		width: 100%;
		height: 120upx;
		padding-top: 15upx;
		.searchBoxRadius{
			width: 92%;
			height: 80upx;
			background-color: #fff;
			margin-left: 4%;
			overflow: hidden;
			border-radius: 46upx;
			margin-top: 8upx;
			background: #f5f5f5;
			.searchBoxIpt{
				height: 70upx;
				text-align: center;
				margin-top : 4upx;
				font-size: 30upx;
			}
		}
	}
	
	//标题
	.currencyTitle{
		font-size: 36upx;
		font-weight: bold;
		color: #333333; 
		padding-left: 32upx;
		margin-top: 24upx;
		margin-bottom: 8upx;
	}
	
	//六宫格样式
	.sixBackground{
		display: flex;
		justify-content: space-between;  //换行留白
		flex-direction: row;   //换行对齐
		flex-wrap: wrap;  //循环换行
		padding: 20upx;
		//黑色暗幕，在图片上方覆盖一层渐变黑
		.darkCurtain{
			position: absolute;
			overflow: hidden;
			width: 212upx;
			height: 144upx;
			border-radius: 12upx;
			margin: 12upx 12upx;
			background:rgba(7,17,27,0.2);      
		}
		image{
			width: 212upx;
			height: 144upx;
			border-radius: 12upx;
			opacity: 1.5;
			margin: 12upx 12upx;
		}
		.sixView{
			position: absolute;
			text-overflow:ellipsis; //文章超出宽度隐藏并用...表示
			white-space:nowrap;
			overflow:hidden;
			color: #fff;
			max-width: 192upx;
			margin-left: 24upx;
			margin-top: -106upx;
			.sixText1{
				font-weight: bold;
				font-size: 30upx;
			}
			.sixText2{
				display: block;
				font-size: 24upx;
			}
		}
	}
	
	//筛选样式
	.screenView{
		left: 0;
		display: flex;
		width: 97%;
		height: 80upx;
		background: #fff;
		z-index: 10;
		position: sticky;
		top: 0;
		.screenText{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #888;
			position: relative;
			&.current{
				color: #06B4FD;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid #06B4FD;
				}
			}
		}
		.priceView{
			display: flex;
			flex-direction: column;
			.jdticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: #06B4FD;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}
	
	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
		.active{
			color: #06B4FD;	
		}
	}
	
	//Y轴滚动视图
	.Tk_scrollview{
		width: 100%;
		padding: 16upx 32upx;
		margin: 0 auto;
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
				 margin-top: 16upx;
				 color: #AAAAAA;
				 display: block; // 让字体换行
			}
			.Tk_text3{
				 font-size: 24upx;
				 margin-top: 24upx;
				 text-align: right;
				 color: #FF6600;
				 display: block; // 让字体换行
			}
		}
	}
	
</style>
