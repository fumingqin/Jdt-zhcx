<template>
	<view class="content">
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<block v-for="(item,index) in tabBars" :key="item.id">
				<view class="nav-item" :class="{current: index === tabCurrentIndex}" :id="'tab'+index" @tap="changeTab(index)">{{item.name}}</view>
			</block>
		</scroll-view>

		<!-- 内容部分 -->
		<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
			<swiper-item v-for="(item,index) in orderList" :key="index">
				<scroll-view class="panelScrollBox" :scroll-y="enableScroll">
					<!-- 订单列表 -->
					<block v-for="(items,index1) in item.list" :key="index1">
						<view class="orderContent" @tap="navToOrderDetail(items)">
							<!-- 检取票/状态 -->
							<view class="headClass">
								<view>{{items.ticketNumber}}</view>
								<view>{{items.state}}</view>
							</view>
							<!-- 时间/价格 -->
							<view class="timePrice">
								<view>{{items.Time}}</view>
								<view>{{items.price}}</view>
							</view>
							<!-- 上车点 -->
							<view class="Station">
								<view>上车点：{{items.startStation}}</view>
								<view>下车点：{{items.endStation}}</view>
							</view>
							<!-- 底部按钮 -->
							<view class="bottomView">
								<button class="zhifuBtn">去支付</button>
								<button class="quxiaoBtn">取消</button>
								<button class="tuipiaoBtn">退票</button>
							</view>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		data() {
			return {
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				tabBars: [{
						name: '待付款',
						id: 'daifukuan'
					},
					{
						name: '已完成',
						id: 'yiwancheng'
					},
					{
						name: '全部',
						id: 'quanbu'
					}
				],
				orderList: [{
						list: [{
							ticketNumber: '检取票号 97329945689',
							state: '已取消',
							Time: '2020-03-03  11:20出发',
							price: '¥28',
							startStation: '南平',
							endStation: '武夷山',
						},{
							ticketNumber: '检取票号 97329945689',
							state: '已取消',
							Time: '2020-03-03  11:20出发',
							price: '¥28',
							startStation: '南平',
							endStation: '武夷山',
						},{
							ticketNumber: '检取票号 97329945689',
							state: '已取消',
							Time: '2020-03-03  11:20出发',
							price: '¥28',
							startStation: '南平',
							endStation: '武夷山',
						},{
							ticketNumber: '检取票号 97329945689',
							state: '已取消',
							Time: '2020-03-03  11:20出发',
							price: '¥28',
							startStation: '南平',
							endStation: '武夷山',
						} ]
					},
					{
						list: [{
							ticketNumber: '检取票号 97329945689',
							state: '已取消',
							Time: '2020-03-03  11:20出发',
							price: '¥28',
							startStation: '南平',
							endStation: '武夷山',
						}, ]
					},
					{
						list: [{
							ticketNumber: '检取票号 97329945689',
							state: '已取消',
							Time: '2020-03-03  11:20出发',
							price: '¥28',
							startStation: '南平',
							endStation: '武夷山',
						}, ]
					},
				]
			}
		},
		async onLoad() {
			//获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
		},
		methods: {
			//tab切换,这里传过来的e是id
			async changeTab(e) {
				if (scrollTimer) {
					//多次切换只执行最后一次
					//clearTimeout：取消由 setTimeout 设置的定时器。
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if (typeof e === 'object') {
					index = e.detail.current
				}
				if (typeof tabBar !== 'object') {
					//tabBar是上面定义的参数，getElSize是获取元素的size，nav-bar是选项卡
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i)
					//result.width:每个选项框的宽度
					width += result.width;
					if (i === index) {
						nowWidth = result.width;
					}
				}
				if (typeof e === 'number') {
					//点击切换时先切换再滚动tabBar，避免同时切换视觉错位
					this.tabCurrentIndex = index;
				}
				//延迟300ms，等待swiper动画结束再修改tabBar
				//setTimeout(callback, delay, rest)：设定一个定时器。在定时到期以后执行注册的回调函数
				/*
				callback：回调函数 
				delay：延迟的时间，函数的调用会在该延迟之后发生，单位 ms（设置时间的长短会影响动画的快慢）
				rest：param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数
				*/
				scrollTimer = setTimeout(() => {
					//width:每个选项卡叠加之后的宽度 nowWidth：每个选项卡的宽度
					if (width - nowWidth / 2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
					} else {
						this.scrollLeft = 0;
					}
					if (typeof e === 'object') {
						this.tabCurrentIndex = index;
					}
					this.tabCurrentIndex = index;
					//第一次切换tab，动画结束后需要加载数据
					let tabItem = this.tabBars[this.tabCurrentIndex];
					if (this.tabCurrentIndex != 0 && tabItem.loaded !== true) {
						// this.loadNewsList('add');
						tabItem.loaded = true;
					}
				}, 300)
			},
			//获得元素的size
			getElSize(id) {
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			//跳转到订单详情
			navToOrderDetail(items) {
				let data = {
					
				}
				uni.navigateTo({
					url:'orderDetail'
				})
			}
		}
	}
</script>

<style lang='scss'>
	page, .content {
		height: 100%;
		background: #EDF1F4;
		/* overflow: hidden; */
	}
	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		width: 100%;
		white-space: nowrap;
		line-height: 90upx;
		height: 90upx;
		background-color: #FFFFFF;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
	}
	.nav-item {
		font-size: 30upx;
		width: 33%;
		height: 90upx;
		line-height: 90upx;
		display: inline-block;
		text-align: center;
		color: #2C2D2D;
		position: relative;

		//下面的是加底下的横线
		&:after {
			content: '';
			width: 0;
			height: 0;
			border-bottom: 4upx solid #FC4646;
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			transition: .3s;
		}
	}
	.current {
		color: #FC4646;

		&:after {
			width: 50%;
		}
	}

	/* 内容 */
	.swiper-box {
		height: 100%;
		padding: 20upx;
	}

	/* 可滚动区域 */
	.panelScrollBox {
		height: 100%;
	}
	/* 订单信息 */
	.orderContent {
		background: #FFFFFF;
		/* 设置圆角 */
		border-radius: 12upx;
		/* 设置外边距 */
		margin-bottom: 20upx;
	}
	/* 检取票/状态 */
	.headClass {
		/* 设置当前内容全部水平布局 */
		display: flex;
		/* 设置左右两边靠边布局 */
		justify-content: space-between;
		/* 设置内容中心点对齐 */
		align-items: center;
		/* 字体大小 */
		font-size: 26upx;
		/* 字体颜色 */
		color: #333333;
		padding-bottom: 10upx;
		padding-top: 10upx;
		border-bottom: 1upx solid #ECECEC;
	}
	.headClass>view:first-child {
		padding-left: 20upx;
	}
	.headClass>view:last-child {
		padding-right: 20upx;
	}
	/* 时间/价格 */
	.timePrice {
		padding-top: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26upx;
	}
	/* 时间 */
	.timePrice>view:first-child {
		padding-left: 20upx;
		color: #999999;
	}
	/* 价格 */
	.timePrice>view:last-child {
		padding-right: 20upx;
		color: #FC4646;
	}
	/* 上下车点 */
	.Station {
		display: block;
		padding-left: 20upx;
		font-size: 30upx;
		color: #2C2D2D;
		padding-bottom: 10upx;
	}
	.bottomView {
		width: 100%;
		display: flex;
		align-items: center;
		padding-bottom: 20rpx;
	}
	/* 退票按钮 */
	.bottomView button {
		width: 140upx;
		height: 54upx;
		border-radius: 27rpx;
		font-size: 26upx;
		line-height: 54rpx;
		border: .5rpx solid #666666;
		color: #666666;
		background: #FFFFFF;
		
	}
	.tuipiaoBtn {
		margin-right: 10rpx;
		margin-left: 0rpx;
	}
	.quxiaoBtn {
		margin-right: 10rpx;
		margin-left: 0rpx;
	}
	.zhifuBtn {
		margin-right: 10rpx;
	}
</style>
