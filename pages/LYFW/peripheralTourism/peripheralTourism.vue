<template>
	<view>
		<view :style="{height:statusBarHeight+'px'}" style="width: 100%;"></view>
		<!-- 顶部搜索栏 -->
		<view class="searchArea"  >
			 <text  class="locationTxt" @click="oncity">{{region}}<text class="icon jdticon icon-xia"></text></text>
			 <input class="inputIocale" v-model="ipt" @confirm="searchNow" placeholder="搜索景区名称" />
		</view>
		<popup-layer ref="popupRef" :direction="'right'">
			<view style="width:750upx;height: 100%;">
				<citySelect @back_city="back_city"></citySelect>
			</view>
		</popup-layer>
		<!-- 六宫格景区 -->
		<!-- 命名：six -->
		<view class="currencyTitle">推荐</view>
		<view class="sixBackground">
			<view v-for="(item,index) in sixPeripheral" v-if="index < 6" :key="index" @click="godetail(item.name)">
				<view class="darkCurtain"></view>
				<image :src="item.image"></image>
				<view class="sixView">
					<text class="sixText1">{{item.name}}</text>
					<text class="sixText2">{{item.englishName}}</text>
				</view>
			</view>
		</view>
		<!-- tabbar导航栏 -->
		<view class="box">
				<QSTabs :current="current_2" :tabs="tabs_2" minWidth="250" @change="change($event)"/>
			</view>
			<view>
				<view class="Tk_scrollview" v-for="(item,index) in scenicSpot" :key="index">
				<view class="Tk_item" @click="godetail(item.scennicName)">
					<image class="Tk_image" :src="item.image"/>
					<view class="Tk_bacg">
						<text class="Tk_text1">{{item.scennicName}}</text>
						<text class="Tk_text2">人均费用&nbsp;&nbsp;&nbsp;{{item.cost}}元</text>
						<text class="Tk_text2">出行天数&nbsp;&nbsp;&nbsp;{{item.days}}天</text>
					</view>
				</view>
				<!-- 喜欢评论区 -->
				<view class="Tk_btn">
						<text>{{item.date}}</text>
						<text class="yticon jdticon icon-shoucang"></text>
						<text class="right">{{item.like}}</text>
						<text class="yticon jdticon icon icon-pinglun-copy"></text>
						<view></view>
						<text class="right">{{item.comment}}</text>
					</view>
					</view>
				</view>
				</view>
		</view>
	</view>
</template>

<script>
	import citySelect from '../../../components/uni-location/linzq-citySelect/linzq-citySelect.vue'
	import popupLayer from '../../../components/uni-location/popup-layer/popup-layer.vue'
	import QSTabs from '../../../components/uni-location/QS-tabs/QS-tabs.vue'

	export default {
		components: {
			citySelect,
			popupLayer,
			QSTabs
		},
		computed: {},
		data() {
			return {
				statusBarHeight: this.statusBarHeight, //状态栏高度，在main.js里
				region: '请选择', //地区 
				sixPeripheral : [], //六宫格列表
				ipt: '',		//搜索默认值
				piclist :[],    //相册图片数组
				tabs_2: ['推荐景点', '推荐路线', '最新路线'],  //选项标题
				current_2: 0,	//标题下标
				scenicSpot : [], //景点内容
				filterIndex : 0,	//tabs默认值
				loadingType: 'more', //加载更多状态
				
			}
		},
		created() {},  
		mounted() {  
			this.$refs.popupRef.close();
		},
		onLoad() {
			this.tweetsInit();
			this.loadData();
			this.Getpostion();
			this.isGetLocation();
		}, 
		methods: {
			getAuthorizeInfo(a="scope.userLocation"){  //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
					var _this=this;
					uni.authorize({
						scope: a,
						success() { //1.1 允许授权
							_this.getLocationInfo();
						},
						fail(){    //1.2 拒绝授权
							console.log("你拒绝了授权，无法获得周边信息")
						}
					})
				},
				isGetLocation(a="scope.userLocation"){ // 3. 检查当前是否已经授权访问scope属性，参考下截图
						var _this=this;
						uni.getSetting({
						    success(res) {					
								if (!res.authSetting[a]) {  //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
									_this.getAuthorizeInfo()
								}else{
									_this.getLocationInfo()
								}
							}
						});
						},
			
			//读取静态数据lyfw.js
			async tweetsInit(){
				let six_peripheral = await this.$api.lyfwlql('sixPeripheral');
				this.sixPeripheral = six_peripheral;
				let scenic_Spot = await this.$api.lyfwlql('scenicSpot');
				this.scenicSpot = scenic_Spot;
				},
			Getpostion(){
				try {
				    this.region = uni.getStorageSync('Key_position');
				    if (value) {
				        console.log(value);
				    }
				} catch (e) {
				    // error
				}
			},
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
				//根据搜索的城市请求不同的接口,url待填充
				
				// uni.request({
				// 	url:'',
				// 	dataType::'jason',
				// 	data:{
				// 		cityName:this.ipt,     
				// 	},
				// 	success:(res) => {
				// 		console.log(res)
				// 	},
				// 	fail: (error) => {
				// 		console.log(error)
				// 	}
				// })
				uni.showToast({
					title:'你搜索了'+this.ipt,
					icon:'none',
				})
				this.ipt = ''
			}, 
			// 景点点击链接地址
			godetail : function (value){
				uni.showToast({
					title:'你点击了'+value,
					icon : 'none'
				})
				setTimeout(function(){
					uni.navigateTo({
						url:'./travelArticles'
					})
				},500);
				
			},
			//tabbar筛选点击
			change(index){
				this.current_2 = index;
				this.filterIndex = index;
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
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
				
				let scenicSpot = await this.$api.lyfwlql('scenicSpot');
				if(type === 'refresh'){
					this.scenicSpot = [];
				}
				
				//筛选，测试数据直接前端筛选了
				if(this.filterIndex === 0){
					scenicSpot.sort((a,b)=>b.like - a.like)
				}
				if(this.filterIndex === 1){
					scenicSpot.sort((a,b)=>a.id - b.id)
				}
				if(this.filterIndex === 2){
					scenicSpot.sort((a,b)=>a.date < b.date ? 1:-1)
				}
				this.scenicSpot = this.scenicSpot.concat(scenicSpot);
				
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType  = this.scenicSpot.length > 20 ? 'nomore' : 'more';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			},
		}
	};
</script>

<style lang="scss">
	.height {
		height: var(--status-bar-height);
	}
	/* 搜索栏区域样式 */
	.searchArea{
		display: flex;
		padding-left: 10upx;
		text-align: center;	
	}
	/* 左上角所在城市文本 */
	.locationTxt{
		color: #333333; 
		padding-top: 8px;
		padding-left: 8px;
		width: 70px;
		font-size: 36upx;
		font-weight: bold;
	}
	/* 景点搜索框 */
	.inputIocale{
		text-align: left;
		background-color: #F5F5F5;
		width: 166px;
		background-image: url(../../../static/LYFW/peripheralTourism/peripheralTourism/search.png);
		background-size: 48upx 50upx;
		background-position: 28upx 23upx;/*小图标在input的位置*/
		background-repeat: no-repeat;
		padding: 6px 6px 6px 40px;/*设置input内边距*/
		margin-left: 5px;
		border-radius:46upx;
		font-size: 29rpx;
	}
	/* 向下小图标 */
	.icon{
		font-size: 20upx;
		color: #AAAAAA;
		margin-left: 15upx;
	}
	.box{
			position: sticky;
			top: 0;
			background: #fff;
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
						 margin-top: 20upx;
						 display: block; // 让字体换行
					}
					.Tk_text3{
						 font-size: 24upx;
						 margin-top: 10upx;
						 color: #AAAAAA;
						 display: block; // 让字体换行
					}
				}
				.Tk_btn{
					display: flex;
					width: 100%;
					font-size: 28upx;
					color: #AAAAAA;
					padding-right: 32upx;
					.right{
						position: relative;
						margin-left: 12upx;
						left: 368upx;
						bottom: 6upx;
					}
					.yticon{
						position: relative;
						font-size: 28upx;
						margin-left: 12upx; 
						left: 368upx;
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
				font-weight: 150;
			}
		}
	}
</style>
