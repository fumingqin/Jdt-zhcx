<template>
	<view>
		<view style="width: 100%;height: 32rpx; display: flex">
			<image style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;" src="../../static/Order/fanhui.png"></image>
			<view style="width: 152rpx; height: 48rpx; margin: 92rpx 232rpx;color: #333333; font-size: 38rpx;font-weight:bold;">我的订单</view>
		</view>

		<view class="tab" style="margin-top: 160rpx;">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#FC4646"></uni-segmented-control>
		</view>

		<view v-if="current === 0" style="margin-top: 20rpx;">
			<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
				<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center; margin-left: 28rpx;">预定时间:03-05</text>
			</view>

			<view class="whiteBg" v-for="(item,index) in info" :key="index">
				<view style="display: flex; margin-top: -40rpx;">
					<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
					<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">出租车</view>
					<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
				</view>

				<view style="display: flex; margin-top: -72rpx;">
					<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
					<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">2020-03-06 8:00</view>
					<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">¥32.6元</view>
				</view>

				<view style="display: flex; margin-top: -16rpx;">
					<view class="bluering"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
				</view>

				<view style="display: flex; margin-top: 36rpx;">
					<view class="redring"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
				</view>

				<view v-if="item.orderType=='已完成'" style="display: flex;">
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: -344rpx; align-items: center;"
					 form-type="submit">详情</button>
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: 48rpx; align-items: center;"
					 form-type="submit">投诉</button>
				</view>
				<view v-if="item.orderType=='进行中'" style="display: flex;">
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: 48rpx; align-items: center;"
					 form-type="submit">详情</button>
				</view>
				<view v-if="item.orderType=='未完成'" style="display: flex;">
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: -344rpx; align-items: center;"
					 form-type="submit">详情</button>
					<button style="width:146rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #FC4646; border: 1px solid #FC4646; color: #fff; margin-right: 48rpx; align-items: center;"
					 form-type="submit">去支付</button>
				</view>
				<view v-if="item.orderType=='已取消'" style="display: flex;">
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: -344rpx; align-items: center;"
					 form-type="submit">详情</button>
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: 48rpx; align-items: center;"
					 form-type="submit">删除</button>
				</view>
			</view>

			<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
				<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center; margin-left: 28rpx;">预定时间:03-08</text>
			</view>

			<!-- 客车 -->
			<view class="whiteBg">
				<view style="display: flex; margin-top: -40rpx;">
					<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
					<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">客车</view>
					<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">已完成</view>
				</view>

				<view style="display: flex; margin-top: -72rpx;">
					<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
					<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">2020-03-08 20:00
						发车</view>
					<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">¥32.5元</view>
				</view>

				<view style="display: flex; margin-top: -16rpx;">
					<view class="bluering"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">泉州客运中心</view>
				</view>

				<view style="display: flex; margin-top: 36rpx;">
					<view class="redring"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">安溪客运</view>
				</view>

				<view style="display: flex;">
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: -344rpx; align-items: center;"
					 form-type="submit">详情</button>
					<button style="width:146rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #FC4646; border: 1px solid #FC4646; color: #fff; margin-right: 48rpx; align-items: center;"
					 form-type="submit">去支付</button>
				</view>
			</view>
		</view>

		<view v-if="current === 1" style="margin-top: 20rpx;">
			<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
				<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center;margin-left: 28rpx;">预定时间:03-05</text>
			</view>

			<view class="whiteBg" v-for="(item,index) in finishArr" :key="index" v-if="item.orderType =='已完成'">
				<view style="display: flex; margin-top: -40rpx;">
					<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
					<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">出租车</view>
					<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
				</view>

				<view style="display: flex; margin-top: -72rpx;">
					<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
					<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">2020-03-06 8:00</view>
					<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">¥32.6元</view>
				</view>

				<view style="display: flex; margin-top: -16rpx;">
					<view class="bluering"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
				</view>

				<view style="display: flex; margin-top: 36rpx;">
					<view class="redring"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
				</view>

				<view style="display: flex;">
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: -344rpx; align-items: center;"
					 form-type="submit">详情</button>
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: 48rpx; align-items: center;"
					 form-type="submit">投诉</button>
				</view>
			</view>
		</view>

		<view v-if="current === 2" style="margin-top: 20rpx;">
			<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
				<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center;margin-left: 28rpx;">预定时间:03-05</text>
			</view>

			<view class="whiteBg" v-for="(item,index) in goingArr" :key="index" v-if="item.orderType =='进行中'">
				<view style="display: flex; margin-top: -40rpx;">
					<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
					<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">出租车</view>
					<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
				</view>

				<view style="display: flex; margin-top: -72rpx;">
					<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
					<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">2020-03-06 8:00</view>
					<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">¥32.6元</view>
				</view>

				<view style="display: flex; margin-top: -16rpx;">
					<view class="bluering"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
				</view>

				<view style="display: flex; margin-top: 36rpx;">
					<view class="redring"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
				</view>

				<view style="display: flex;">
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: 48rpx; align-items: center;"
					 form-type="submit">详情</button>
				</view>
			</view>
		</view>

		<view v-if="current === 3" style="margin-top: 20rpx;">
			<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
				<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center;margin-left: 28rpx;">预定时间:03-05</text>
			</view>

			<view class="whiteBg" v-for="(item,index) in unfinishArr" :key="index" v-if="item.orderType =='未完成'">
				<view style="display: flex; margin-top: -40rpx;">
					<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
					<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">出租车</view>
					<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
				</view>

				<view style="display: flex; margin-top: -72rpx;">
					<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
					<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">2020-03-06 8:00</view>
					<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">¥32.6元</view>
				</view>

				<view style="display: flex; margin-top: -16rpx;">
					<view class="bluering"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
				</view>

				<view style="display: flex; margin-top: 36rpx;">
					<view class="redring"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
				</view>

				<view style="display: flex;">
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: -344rpx; align-items: center;"
					 form-type="submit">详情</button>
					<button style="width:146rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #FC4646; border: 1px solid #FC4646; color: #fff; margin-right: 48rpx; align-items: center;"
					 form-type="submit">去支付</button>
				</view>
			</view>
		</view>

		<view v-if="current === 4" style="margin-top: 20rpx;">
			<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
				<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center;margin-left: 28rpx;">预定时间:03-05</text>
			</view>

			<view class="whiteBg" v-for="(item,index) in cancelArr" :key="index" v-if="item.orderType =='已取消'">
				<view style="display: flex; margin-top: -40rpx;">
					<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
					<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">出租车</view>
					<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
				</view>

				<view style="display: flex; margin-top: -72rpx;">
					<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
					<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">2020-03-06 8:00</view>
					<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">¥32.6元</view>
				</view>

				<view style="display: flex; margin-top: -16rpx;">
					<view class="bluering"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
				</view>

				<view style="display: flex; margin-top: 36rpx;">
					<view class="redring"></view>
					<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
				</view>

				<view style="display: flex;">
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: -344rpx; align-items: center;"
					 form-type="submit">详情</button>
					<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; margin-right: 48rpx; align-items: center;"
					 form-type="submit">删除</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
	export default {
		components: {
			uniSegmentedControl,
		},
		data() {
			return {
				items: ['全部', '已完成', '进行中', '未完成', '已取消'],
				current: 0,
				index: 1,
				info: [{
						starAddress: "茶叶大厦",
						endAddress: "泉州市-丰泽区-泉秀路777号",
						orderType: "已完成",
					},
					{
						starAddress: "现代美居广场",
						endAddress: "泉州市-丰泽区-温秀路/雅园路(路口)",
						orderType: "进行中",
					},
					{
						starAddress: "丰泽区人民法院",
						endAddress: "泉州市-丰泽区-泉秀路765号",
						orderType: "未完成",
					},
					{
						starAddress: "泉州汽车站",
						endAddress: "泉州市-丰泽区-泉秀路222号",
						orderType: "已取消",
					},
					
				],
				finishArr:[],
				goingArr:[],
				unfinishArr:[],
				cancelArr:[],
			}
		},
		onLoad() {
			var that = this;
			that.toFinished();
		},
		methods: {
			onClickItem(e) { //tab点击事件
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			
			toFinished:function(){
				var that = this;
				for(var i = 0 ; i < that.info.length ; i++){
					if(that.info[i].orderType == '已完成'){
						that.finishArr.push(that.info[i]);
					}else if(that.info[i].orderType == '进行中'){
						that.goingArr.push(that.info[i]);
					}else if(that.info[i].orderType == '未完成'){
						that.unfinishArr.push(that.info[i]);
					}else if(that.info[i].orderType == '已取消'){
						that.cancelArr.push(that.info[i]);
					}
				}
				
				
			}
			
			
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: #EFF2F7;
	}

	//白底1
	.whiteBg {
		position: relative;
		z-index: 99999;
		margin: 52rpx 26rpx;
		margin-top: -20rpx;
		padding: 20rpx 0;
		width: 698rpx;
		height: 340rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		box-shadow: 0 0 5rpx 0rpx #aaa;
	}

	.bluering {
		width: 8rpx;
		height: 8rpx;
		border: 4rpx solid #06B4FD;
		background: #06B4FD;
		border-radius: 100%;
		margin: 0rpx 96rpx;
	}

	.redring {
		width: 8rpx;
		height: 8rpx;
		border: 4rpx solid #FC4646;
		background: #FC4646;
		border-radius: 100%;
		margin: 0rpx 96rpx;
	}


	.tabs {
		flex: 1;
		flex-direction: column;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 670upx;
		height: 80upx;
		margin: 0 40rpx 0 20rpx;
		white-space: nowrap;
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
			border-bottom-style: solid;
			border-bottom-width: 1px; */
	}

	.line-h {
		height: 1upx;
		background-color: #cccccc;
	}

	.uni-tab-item {

		display: inline-block;
		flex-wrap: nowrap;
		padding-left: 38upx;
		padding-right: 28upx;
	}

	.uni-tab-item-title {
		color: #2C2D2D;
		font-size: 30upx;
		height: 80upx;
		line-height: 42upx;
		font-weight: 400;
		flex-wrap: nowrap;
		/* #ifndef APP-VUE */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #007AFF;
		border-bottom: 1rpx solid #007AFF;
	}
</style>
