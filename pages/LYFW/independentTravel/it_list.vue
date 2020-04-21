<template>
	<view>
		<!-- 搜索栏 -->
		<view class="searchTopBox">
			<!-- #ifdef MP -->
			<text  class="locationTxt" @click="oncity">{{regionWeixin}}<text class="icon jdticon icon-xia"></text></text>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<text  class="locationTxt" @click="oncity">{{regionApp}}<text class="icon jdticon icon-xia"></text></text>
			<!-- #endif -->
			<view class="searchBoxRadius">
				<input class="inputIocale" type="search" v-model="searchValue" @confirm="searchNow" placeholder="搜索景区名称" />
				<image class="searchImage" src="../../../static/LYFW/currency/search.png" />
			</view>
		</view>
		
		<!-- 选择地址 -->
		<popup-layer ref="popupRef" :direction="'right'">
			<view style="width:750upx;height: 100%;">
				<citySelect @back_city="backCity"></citySelect>
			</view>
		</popup-layer>

		<!-- 搜索内容 -->
		<view :hidden="searchIndex==0" v-for="(item,index) in searchData" :key="index">
			<view class="Tk_scrollview" @click="godetail(item.ticketId)">
				<view class="Tk_item">
					<image class="Tk_image" :src="item.ticketImage" />
					<view class="Tk_bacg">
						<text class="Tk_text1">{{item.ticketTitle}}</text>
						<text class="Tk_text2">{{item.ticketComment_s1}}&nbsp;|&nbsp;{{item.ticketComment_s2}}&nbsp;|&nbsp;{{item.ticketComment_s3}}</text>
						<text class="Tk_text3">¥{{item.ticketAdultPrice}}元起</text>
					</view>
				</view>
			</view>
		</view>

		<!-- tabs点击切换栏 -->
		<view class="tabsBox">
			<QSTabs :current="current" :tabs="tabs" minWidth="80" @change="change($event)" />
		</view>

		<view :hidden="current==1">
			<!-- 六宫格列表栏 -->
			<view class="listBarViewSpace">
				<view class="listBarView" v-for="(item,index) in itText" :key="index" @click="natTo">
					<image class="listBarImage" mode="aspectFill" :src="item.src"></image>
					<text class="listBarText1">{{item.title}}</text>
					<text class="listBarText2">{{item.conut_1}}|{{item.conut_2}}</text>
				</view>
			</view>

			<!-- 新发现 -->
			<view class="newDiscoveryView">
				<view class="newDiscoveryTitleView">
					<text class="newDiscoveryTitle">新发现</text>
				</view>
				<view class="newDiscoveryConentView" v-for="(item,index) in newDiscovery" :key="index" @click="natTo">
					<image class="newDiscoveryConentImage" mode="aspectFill" :src="item.src"></image>
					<text class="newDiscoveryConentText1">{{item.title}}</text>
					<text class="newDiscoveryConentText2">销售量：{{item.salesVolume}}</text>
				</view>
			</view>
		</view>
		
		<view :hidden="current==0">
			<!-- 联动列表 -->
			<view class="list_box">
				<!-- 左边的列表 -->
				<view class="left">
					<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
						<view class="item" v-for="(item,index) in stationArray" :key="index" :class="{ 'active':index==leftIndex }" :data-index="index" @click="leftTap(item,index)">
							<view class="itemView" :style="{background:index==leftIndex? '#4EB3F7' : ''}"></view>
							<text class="itemText">{{item}}</text>
						</view>
			        </scroll-view>
				</view>
				<!-- 右边的列表 -->
				<view class="main">
					<scroll-view class="mainScView" scroll-y="true">
							<!-- 大图样式，命名：big -->
							<view @click="natTo">
								<image class="big_image" :src="ifyFirst.src"></image>
								<view style="margin: 0upx 32upx;">
									<text class="big_title" >{{ifyFirst.title}}</text>
									<text class="big_text" >京城上下五千年 历史沉淀</text>
								</view>
							</view>
							
							<!-- 小图样式，命名:sma -->
							<view class="sma_view" >
								<view style="float: left;" v-for="(item,index) in ifyList" :key="index" @click="natTo">
									<image class="sma_image" :src="item.src" ></image>
									<text class="sma_title">{{item.title}}</text>
									<text class="sma_text" >销售量：{{item.salesVolume}}</text>
								</view>
							</view>
							
					</scroll-view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import citySelect from '@/components/HOME/uni-location/linzq-citySelect/linzq-citySelect.vue'
	import popupLayer from '@/components/HOME/uni-location/popup-layer/popup-layer.vue'
	import QSTabs from '../../../components/LYFW/independentTravel/QS-tabs/QS-tabs.vue'
	export default {
		data() {
			return {
				searchIndex: 0, //搜索框是否启用状态值
				searchValue: '', //搜索框值
				searchData: '', //搜索后的值
				regionWeixin: '请选择', //微信地区数值
				regionApp : '请选择',//APP地区数值
				
				current: 0, //标题下标
				tabs: ['推荐', '全部'], //选项标题

				itText: '',//六宫格
				newDiscovery : '',//新发现
				
				ifyFirst: '',//分类产品首个
				ifyList:'',//分类产品列表
				
				region : [{
					id:'0',
					name:'南平',
					image : '../../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
					label : '',
				}], //地区
				
				scrollHeight:'500px',
				leftIndex:0, //左边列表值
				stationArray:['南平','泉州','石狮','顺昌'], //左边数据内容
			}
		},
		components: {
			citySelect,
			popupLayer,
			QSTabs
		},
		onLoad() {
			this.Getpostion();
			this.textData();
			this.classifyList();
		},
		methods: {
			textData:function() {
				uni.request({
					url:'http://218.67.107.93:9210/api/app/getFreeWalkerTourList',
					method:'POST',
					success: (res) => {
						// console.log(res)
						this.itText = res.data.data;
					}
				})
				uni.request({
					url:'http://218.67.107.93:9210/api/app/getFreeWalkerTourList',
					method:'POST',
					success: (res) => {
						var sc = res.data.data;;
						sc.sort((a, b) => a.id - b.id)
						this.newDiscovery = sc;
					}
				})
			},
			classifyList:function(){
				uni.request({
					url:'http://218.67.107.93:9210/api/app/getFreeWalkerTourList',
					method:'POST',
					success: (res) => {
						this.ifyFirst =res.data.data[0];
						var sc = res.data.data;
						sc.shift();
						this.ifyList = sc;
						uni.hideLoading();
					}
				})
			},
			


			//获取定位数据
			Getpostion: function() {
				setTimeout(()=>{
					uni.getStorage({
						key:'wx_position',
						success:(res)=>{
							// console.log(res)
							this.regionWeixin = res.data;
						}
					}),
					
					uni.getStorage({
						key:'app_position',
						success: (res) => {
							// console.log(res)
							if(res.data !== undefined){
								this.regionApp = res.data.city;
							}
						}
					})
					
					
				},500)
			},

			//打开地区选择器
			oncity() {
				this.$refs.popupRef.show();
			},

			//地区获取
			backCity(e) {
				if (e !== 'no' && e !== 'yes') {
					// console.log(e)
					this.regionWeixin = e.cityName
					this.regionApp = e.cityName
					this.$refs.popupRef.close();
					// this.lyfwData();
					this.screenIndex = 0;
					this.searchIndex = 0;
				} else if(e == 'yes'){
					uni.getStorage({
						key:'wx_position',
						success:(res)=>{
							// console.log(res)
							this.regionWeixin = res.data;
						}
					}),
					
					uni.getStorage({
						key:'app_position',
						success: (res) => {
							// console.log(res)
							if(res.data !== undefined){
								this.regionApp = res.data.city;
							}
						}
					})
					
					
					this.$refs.popupRef.close();
				}else{
					this.$refs.popupRef.close();
				}
			},

			//搜索框-搜索
			searchNow: function() {
				if (this.searchValue == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					// retuan false;
				}
				//搜索请求
				uni.hideKeyboard()
				uni.showLoading({
					title: '正在搜索',
				})
				uni.request({
					url: 'http://218.67.107.93:9210/api/app/searchScenicspotList?searchValue=' + this.searchValue,
					method: 'POST',
					success: (res) => {
						if (res.data.msg == '搜索景区信息成功！') {
							this.searchData = res.data.data;
							this.searchValue = ''
							this.searchIndex = 1;
							uni.hideLoading()
						} else if (res.data.msg == '查不到相关景区，请确认景区名！') {
							uni.hideLoading()
							uni.showToast({
								title: '查不到相关景区！如:武夷/武夷山',
								icon: 'none',
								duration: 1500
							});
							this.searchValue = ''

						}
					}
				})
			},

			//tabbar筛选点击
			change(index) {
				this.current = index;
			},
			
			//跳转
			natTo(){
				uni.navigateTo({
					url:'../currency/travelDetails'
				})
			},
			
			/* 左侧导航点击 */
			leftTap:function(item,index){
				this.leftIndex=index;
				this.classifyList(item);
				uni.showLoading({
					title:'正在搜索'+item
				});
			},
		}
	}
</script>

<style lang="scss">
	//搜索框
	.searchTopBox {
		display: flex;
		text-overflow: ellipsis; //文本溢出：省略号
		margin: 32upx 32upx;

		.locationTxt {
			color: #333333;
			font-size: 36upx;
			font-weight: bold;
			text-overflow: ellipsis;
			margin-top: 16upx;
			width: 25%;
			text-overflow: ellipsis; //文本溢出：省略号
		}

		/* 向下小图标 */
		.icon {
			font-size: 20upx;
			color: #AAAAAA;
			margin-left: 15upx;
		}

		.searchBoxRadius {
			width: 76%;
			height: 78upx;
			background-color: #fff;
			border-radius: 46upx;
			background: #f5f5f5;

			.searchImage {
				padding-left: 24upx;
				padding-top: 18upx;
				width: 48upx;
				height: 48upx;
			}

			.inputIocale {
				position: absolute;
				height: 72upx;
				padding-top: 4upx;
				padding-left: 88upx;
				font-size: 30upx;
			}

		}
	}

	//Y轴滚动视图
	.Tk_scrollview {
		padding: 16upx 32upx;
		margin: 0 auto;

		.Tk_item {
			display: flex;

			.Tk_image {
				width: 182upx;
				height: 152upx;
				border-radius: 12upx;
				margin: 24rpx 0rpx;
			}

			.Tk_bacg {
				margin-top: 20upx;
				margin-left: 24upx;
			}

			.Tk_text1 {
				display: flex;
				text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
				white-space: nowrap;
				overflow: hidden;
				width: 480upx; //内容宽度
			}

			.Tk_text2 {
				font-size: 26upx;
				margin-top: 16upx;
				color: #AAAAAA;
				display: block; // 让字体换行
			}

			.Tk_text3 {
				font-size: 24upx;
				margin-top: 24upx;
				text-align: right;
				color: #FF6600;
				display: block; // 让字体换行
			}
		}
	}

	//tabs点击
	.tabsBox {
		z-index: 999; //最外层
		position: sticky;
		background: #fff;
	}

	//列表栏
	.listBarViewSpace {
		padding: 32upx 8upx;
		height: 880upx;

		.listBarView {
			margin-left: 24upx;
			margin-bottom: 32upx;
			float: left;

			.listBarImage {
				width: 216upx;
				height: 314upx;
				border-radius: 12upx;
			}

			.listBarText1 {
				display: block;
				margin-top: 12upx;
				font-size: 30upx;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 216upx;
			}

			.listBarText2 {
				display: block;
				font-size: 26upx;
				color: #999;
				margin-top: 8upx;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 216upx;
			}

		}
	}

	//新发现
	.newDiscoveryView {
		padding: 8upx;

		.newDiscoveryTitleView {
			margin: 0upx 0upx 32upx 24upx;

			.newDiscoveryTitle {
				font-weight: bold;
				font-size: 34upx;
			}
		}

		.newDiscoveryConentView {
			margin-left: 24upx;
			margin-bottom: 32upx;
			float: left;

			.newDiscoveryConentImage {
				width: 332upx;
				height: 254upx;
				border-radius: 12upx;
			}

			.newDiscoveryConentText1 {
				display: block;
				margin-top: 12upx;
				font-size: 30upx;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 332upx;
			}

			.newDiscoveryConentText2 {
				display: block;
				font-size: 26upx;
				color: #999;
				margin-top: 8upx;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 332upx;
			}
		}
	}
	
	//联动列表
	.list_box{
		display: flex;
	    flex-direction: row;
	    flex-wrap: nowrap;
	    justify-content: flex-start;
	    align-items: flex-start;
	    align-content: flex-start;
		font-size: 28rpx;
		margin-top: 32upx;
		//左边
		.left{
			width: 200rpx;
			line-height: 80rpx;
			// box-sizing: border-box;
			font-size: 32rpx;
			border: 1upx #F5F5F5 double;
			.item{
				display: flex;
				position: relative;
				.itemView{
					width: 8upx;
					height: 56upx;
					margin-top: 16upx;
				}
				.itemText{
					padding-left: 56rpx;
				}
				&:not(:first-child) {
				margin-top: 4px;
					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #ddd solid 1px;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform:scaleY(0.5);	/* 1px像素 */
					}
				}
				&.active,&:active{
					color: #4EB3F7;
				}
			}
		}
		//右边
		.main{
			width: 556upx;
			border: 1upx #F5F5F5 double;
			flex-grow: 1;
			box-sizing: border-box;
			.mainScView{
				padding: 20upx 0 32upx 0;
				.big_image{
					margin: 12upx 32upx; 
					width: 492upx; 
					height: 240upx; 
					border-radius:8upx;
				}
				.big_title{
					font-weight: 500;
				}
				.big_text{
					font-size: 26upx; 
					color: #888;
					display: block; 
					margin-top: 16upx;
				}
				.sma_view{
					padding:8upx 20upx;
					.sma_image{
						margin: 24upx 12upx 12upx 12upx; 
						width: 232upx; 
						height: 190upx; 
						border-radius:8upx;
					}
					.sma_title{
						margin-left: 12upx; 
						font-weight: 500;
						display: block;
					}
					.sma_text{
						margin-left: 12upx; 
						margin-top: 16upx; 
						font-size: 26upx; 
						color: #888;
						display: block;
					}
				}
			}
		}
	}
</style>
