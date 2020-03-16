<template>
	<view>
		<view  class="bgColor"></view>
		<view :style="{height:statusBarHeight+'px'}" style="width: 100%;"></view>
		<!-- 顶部搜索栏 -->
		<view class="searchTopBox">
			<text  class="locationTxt" @click="oncity">{{region}}<text class="icon jdticon icon-xia"></text></text>
			<view class="searchBoxRadius">
				<input class="inputIocale" type="search" v-model="ipt" @confirm="searchNow" placeholder="搜索景区名称" />
				<image class="searchImage" src='../../static/LYFW/peripheralTourism/peripheralTourism/search.png' />
			</view>
		</view>
		<popup-layer ref="popupRef" :direction="'right'">
			<view style="width:750upx;height: 100%;">
				<citySelect @back_city="back_city"></citySelect>
			</view>
		</popup-layer><!-- jiewei -->
		<!-- 导航栏 -->
		<view class="tabar">
           <QSTabs :current="current_2" :tabs="tabs_2" minWidth="100" style="font-size: 60rpx;" @change="change"/>
	</view>
	<!-- 公交查询 -->
	<view v-if="current_2===0">
		<view  class="box">
			<view class="searchBoxRadius2">
				<input class="inputIocale2" type="search" v-model="ipt" placeholder="我的位置" />
				<image class="searchImage2" src="../../static/GCJX/busIndex/green.png" />
				</view>
				<!-- 虚线 -->
				<view class="xuxian"></view>
				<!-- 转换 -->
				<view>
					<image class="rotate"  src="../../static/GCJX/busIndex/rotate%20.png"></image>
				</view>
			<view class="searchBoxRadius2">
				<input class="inputIocale2" type="search" v-model="ipt" placeholder="输入终点" />
				<image class="searchImage2" src="../../static/GCJX/busIndex/red.png" />
			</view>
			</view>
			<!-- 附近 -->
		<view class="currencyTitle">附近</view>
		<view  class="box2">
			<view class="area1">
				<image class="image1" src="../../static/GCJX/busIndex/icon.png"></image>
				<text class="text1">{{nearstaion.data.stationName}}</text>
				<text class="text2">{{nearstaion.data.distance}}></text>
			</view>
			<view class="xuxian"></view>
			<view class="area1">
				<image class="image1" src="../../static/GCJX/busIndex/icon.png"></image>
				<text class="text1">{{nearstaion.data.stationName}}</text>
				<text class="text2">{{nearstaion.data.distance}}></text>
			</view>
		</view>
	</view>
	<view v-if="current_2===1">
				   didi
	</view>
	</view><!-- jiewei -->
</template>

<script>
	import citySelect from '../../components/uni-location/linzq-citySelect/linzq-citySelect.vue';
	import popupLayer from '../../components/uni-location/popup-layer/popup-layer.vue';
	import QSTabs from '../../components/QS-tabs2/QS-tabs.vue'
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
				region: '请选择...', //地区 
				tabs_2: ['去哪', '历史'],  //选项标题
				current_2: 0,	//标题下标
				filterIndex : 0,	//tabs默认值
				nearstaion :[],//附近站点
				stationdata :[]  //站点数据
			}
		},
		created() {},  
		mounted() {  
			this.$refs.popupRef.close();
		},
		onLoad() {
			this.Getpostion()
			this.busInit()
		},
		methods: {
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
			async busInit(){
				let nearStation = await this.$api.gjcx('nearBy');
				this.nearstaion = nearStation;
				console.log(this.nearstaion);
				let stationData = await this.$api.gjcx('station');
				this.stationdata = stationData;
				},
			//获取定位数据
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
				//tabbar筛选点击
				change(){
					var that=this;
					if(that.current_2==0){
						that.current_2 =1;
					}
					else{
						that.current_2 =0;
					}
					uni.pageScrollTo({
						duration: 300,
						scrollTop: 0
					})
					
				},
		}
	};
</script>

<style lang="scss" scoped>
	//全局
	page{
		background-color: #F5F5F5;
	}
	.bgColor{
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: #F3F3F3;
	    z-index: -1;
	  }
	.height {
		height: var(--status-bar-height);
	}
	//向下小图标
	.icon{
		font-size: 20upx;
		color: #AAAAAA;
		margin-left: 15upx;

	}
	.searchTopBox {
		display: flex;
		text-overflow:ellipsis;//文本溢出：省略号
		background-color: #FFFFFF;
		padding-bottom: 20upx;
		.locationTxt{
			color: #333333; 
			padding-left: 32upx;
			font-size: 36upx;
			font-weight: bold;
			text-overflow: ellipsis;
			margin-top: 10upx;
			width: 24%;
			text-overflow:ellipsis;//文本溢出：省略号
		}
		.searchBoxRadius {
			position: relative;
			// right: -157upx;
			width: 70%;
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
	//导航栏
	.tabar{
		padding-top: 20upx;
		padding-bottom: 30upx;
	}
	.bluering {
		width: 20rpx;
		height: 20rpx;
		border-width: 4rpx;
		border-color: #309FF7;
		border-style: solid;
		background-color: #fff;
		border-radius: 100px;
		margin-top: 6upx;
	}
	
	.redring {
		width: 20rpx;
		height: 20rpx;
		border-width: 4rpx;
		border-color: #E3424B;
		border-style: solid;
		background-color: #fff;
		border-radius: 100px;
	}
	//地址栏
	.box{
		width: 670rpx;
		background-color: #ffffff;
		padding-left: 20upx;
		margin-left: 32upx;
		border-radius: 11rpx;
		.searchBoxRadius2 {
			position: relative;
			// right: -157upx;
			width: 83%;
			height: 74upx;
			background-color: #fff;
			overflow: hidden;
			background: #ffffff;
			
			.searchImage2 {
				position: absolute;
				padding-left: 16upx;
				padding-top: 20upx;
				width: 48upx;
				height: 48upx;
				transform: scale(0.5);
			}
			.inputIocale2 {
				position: absolute;
				padding-top : 8upx;
				padding-left: 70upx;
				font-size: 30upx;
			}
			
		}
		// 虚线
		.xuxian{
			border-bottom-width: 2rpx;
			border-color: #F5F5F5;
			border-style: solid;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
			margin-right: 117upx;
			margin-left: 20upx;
		}
		// 旋转
		.rotate{
			position: absolute;
			left: 84%;
			top: 23%;
			width: 55upx;
			height: 60upx;
		}
	}
	.currencyTitle{
		font-size: 36upx;
		font-weight: bold;
		color: #333333; 
		padding-left: 32upx;
		margin-top: 40upx;
		margin-bottom: 40upx;
	}
	// 附近站点
	.box2{
		width: 670rpx;
		background-color: #ffffff;
		padding-left: 20upx;
		margin-left: 32upx;
		border-radius: 11rpx;
		.area1{
			position: relative;
			// right: -157upx;
			width: 83%;
			height: 74upx;
			background-color: #fff;
			overflow: hidden;
			background: #ffffff;
			padding-top: 20upx;
		}
		.image1{
			position: absolute;
			padding-left: 16upx;
			padding-top: 20upx;
			width: 25upx;
			height: 32upx;
		}
		.text1{
			padding-left: 70upx;
			font-size: 36upx;
			font-weight: 500;
			padding-right: 20upx;
		}
		.text2{
			font-size: 24upx;
			font-weight: lighter;
		}
	}
</style>
