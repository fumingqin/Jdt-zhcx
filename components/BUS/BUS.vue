<template>
	<view>
		<!-- 公交车图片 -->
		<!-- <view class="imageClass" :style="{flexDirection : direction}">
			<block v-for="(item,index) in list" :key="index">
				<image class="carLocation" :class="['carLocation' + direction]" src="../../pages_DDQC/static/Bus/busLocation.png" lazy-load="true"></image>
			</block>
		</view> -->
		<!-- 第一步：创建容器view -->
		<view class="bus-steps" :style="{flexDirection : direction}">
			<!-- 第二步：创建子部件 -->
			<view class="bus-steps_item" :class="['bus-steps_item--' + direction]" v-for="(item, index) in list" :key="index">
				<!-- 车辆进站图标 -->
				<view class="carImage" :class="['carImage--' + direction]" 
				v-if="item.mVehicleArriveLeaveInfo.length > 0 && item.mVehicleArriveLeaveInfo[0].stationType == 0" @tap="busClick(item.mVehicleArriveLeaveInfo)">
				    <!-- 会存在多辆车同时到站的情况，显示第一辆车的车牌 -->
				    <view style="font-size: 20rpx;width: 140rpx;">{{item.mVehicleArriveLeaveInfo[0].registcode}}</view>
					<view style="display: flex;align-items: center;justify-content: center;">
						<image  class="carLocation" src="../../pages_DDQC/static/Bus/busLocation.png"></image>
						<text class="busNum" :class="['busNum--' + 'in']" v-if="item.mVehicleArriveLeaveInfo.length >= 2">
						x{{item.mVehicleArriveLeaveInfo.length}}
						</text>
					</view>
				    
				</view>
				<!-- 车辆出站图标 -->
				<view class="carOutImage" :class="['carOutImage--' + direction]" 
				v-if="item.mVehicleArriveLeaveInfo.length > 0 && item.mVehicleArriveLeaveInfo[0].stationType == 1"  @tap="busClick(item.mVehicleArriveLeaveInfo)">
				    <!-- 会存在多辆车同时到站的情况，显示第一辆车的车牌 -->
				    <view style="font-size: 20rpx;width: 140rpx;">{{item.mVehicleArriveLeaveInfo[0].registcode}}</view>
					<view style="display: flex;align-items: center;justify-content: center;">
						<image  class="carLocation" src="../../pages_DDQC/static/Bus/nextBus.png"></image>
						<text class="busNum" :class="['busNum--' + 'out']" v-if="item.mVehicleArriveLeaveInfo.length >= 2">
						x{{item.mVehicleArriveLeaveInfo.length}}
						</text>
					</view>
				    
				</view>
				<!-- 圆点 -->
				<view class="circle" :class="['circle--' + direction]" :style="{
					backgroundColor: current == item.stationName ? activeColor : (item.mVehicleArriveLeaveInfo.length > 0 && item.mVehicleArriveLeaveInfo[0].stationType == 0 ? activeColor : unActiveColor),
					borderColor: current == item.stationName ? activeColor : (item.mVehicleArriveLeaveInfo.length > 0 && item.mVehicleArriveLeaveInfo[0].stationType == 0 ? activeColor : unActiveColor),
				}" ></view>
				
				<!-- 起点/终点样式 -->
				<view class="startEnd" :class="['startEnd--' + direction]" v-if="index == 0">起</view>
				<view class="startEnd" :class="['startEnd--' + direction]" style="background-color: #FF3904;" v-if="index == list.length - 1">终</view>
				<!-- 下标 -->
				<text :class="['bus-steps_item__index--' + direction]" :style="{
					color: current == item.stationName ? activeColor : (item.mVehicleArriveLeaveInfo.length > 0 && item.mVehicleArriveLeaveInfo[0].stationType == 0 ? activeColor : unActiveColor),
				}">{{index + 1}}</text>
				<!-- 站点名称 -->
				<text class="stationName" :class="['bus-steps_item__stationName--' + direction]"  :style="{
					color: current == item.stationName ? activeColor : (item.mVehicleArriveLeaveInfo.length > 0 && item.mVehicleArriveLeaveInfo[0].stationType == 0 ? activeColor : unActiveColor),
				}">{{item.stationName}}</text>
				<!-- 连接线 -->
				<view class="u-steps__item__line" :class="['u-steps__item__line--' + mode]" v-if="index < list.length - 1">
					<u-line :direction="direction" length="100%" :hair-line="false" :color="unActiveColor"></u-line>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			//公交位置条的类型
			mode:{
				type: String,
				default: 'dot'
			},
			//设置位置条的数据
			list:{
				type: Array,
				default(){
					return [];
				}
			},
			// 当前哪一步是激活的
			current: {
				type: [Number, String],
				default: 0
			},
			// 自定义图标
			icon: {
				type: String,
				default: 'checkmark'
			},
			//设置方向row：横向
			direction:{
				type: String,
				default: 'row'
			},
			// 激活步骤的颜色
			activeColor: {
				type: String,
				default: '#35C762'
			},
			// 未激活的颜色
			unActiveColor: {
				type: String,
				default: '#909399'
			},
			// 未激活的颜色
			carColor: {
				type: String,
				default: '#FFFFFF'
			},
			// 到站车辆数组
			carLocationArray: {
				type: Array,
				default(){
					return [];
				}
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			busClick(option){
				var registcode = '';
				if(option.length > 1){
					for (var i = 0; i < option.length; i++){
						registcode = option[i].registcode + ',' + registcode;
					}
					registcode = registcode.substring(0,registcode.length - 1);
					uni.showModal({
						content:registcode,
						showCancel:false
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
$u-steps-item-width: 24rpx;
$BusInOutOffset: 30rpx;//公交进站出站图标与右边的距离

.bus-steps{
	display: flex;
	//子部件容器
	.bus-steps_item{
		// flex: 1;//等分
		text-align: center;//文字对齐方式
		position: relative;
		min-width: 100rpx;
		font-size: 36rpx;//原来设置的是26，对方要求大字体
		font-weight: 700;//原来没有设置这个，对方要求字体加粗
		// color: #35C762;
		flex-direction: column;
		align-items: center;
		//横向----在这里改圆点跟站点名称的相对位置
		&--row {
			margin-top: 100rpx;//改动这个可以改变圆点与顶部的距离
			display: flex;
			flex-direction: column;
			//横向站点连接线样式
			.u-steps__item__line {
				justify-content: center;
				position: absolute;
				margin-left: 50rpx;
				width: 100rpx;
				top: calc(#{$u-steps-item-width} / 2);
			}
		}
		//竖向----在这里改圆点跟站点名称的相对位置
		&--column {
			margin-left: 40rpx;//竖向时整体与左边的距离
			margin-top: 60rpx;//竖向时整体与顶部的距离
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			height: 80rpx;//修改这里可以设置竖向时两个圆点间的距离
			//竖向站点连接线样式
			.u-steps__item__line {
				position: absolute;
				z-index: 0;
				height: 140%;
				top: 10%;//修改这里可以设置竖向线条与圆点的距离，数值越大线条越向下移动
				// margin-top: 70rpx;
				// height: 150rpx;
				left: calc(#{$u-steps-item-width} / 2 );
			}
		}
		//横向站点名称样式
		&__stationName--row{
			width: 60rpx;
		}
		//竖向站点名称样式
		&__stationName--column{
			width: 70%;
			text-align: left;
			margin-left: 20rpx;
			margin-top: -1rpx;
		}
		//下标横向样式
		&__index--row{
			margin-top: 20rpx;
		}
		//下标竖向样式
		&__index--column{
			text-align: left;
			margin-left: 20rpx;
			margin-top: -90rpx;
		}
	}
}
//公交位置图片
.carLocation{
	// min-width: 60rpx;
	width: 56rpx;
	height: 34rpx;
}
//公交车牌
.busNum{
	font-size: 35rpx;
	
	margin-left: 10rpx;
	&--in {
		color: #007AFF;
	}
	&--out {
		color: #35C762;
	}
}
//圆圈的样式
.circle{
	display: flex;
	align-items: center;
	justify-content: center;
	width: $u-steps-item-width;
	height: $u-steps-item-width;
	border: 2rpx solid #35C762;
	border-radius: 50%;
	overflow: hidden;
	z-index: 998;
	&--row{
	}
	&--column{
		margin-bottom: 90rpx;//竖向时圆点与圆点的距;
	}
	&--car{
		margin-top: -44rpx;
	}
}
//公交车图片的样式
.carImage{
	position: relative;
	//竖向样式
	&--column{
		position: absolute;//这里不设置绝对定位的话，公交图片会跑到左边并且圆点和站点名会收到影响向右移
		margin-top: -40rpx;
		right: $BusInOutOffset;//公交车图标距离右边的偏移量
	}
	//横向样式
	&--row{
		position: absolute;//这里不设置绝对定位的话，圆点会往上移动
		margin-top: -90rpx;//数值越大越往下移
	}
}
//公交车出站图片的样式
.carOutImage{
	position: relative;
	//竖向样式
	&--column{
		position: absolute;//这里不设置绝对定位的话，公交图片会跑到左边并且圆点和站点名会收到影响向右移
		margin-top: 30rpx;
		right: $BusInOutOffset;
	}
	//横向样式
	&--row{
		position: absolute;//这里不设置绝对定位的话，圆点会往上移动
		margin-top: -90rpx;//数值越大越往下移
		margin-left: 50rpx;
	}
}

.imageClass{
	display: flex;
	align-items: center;
}
//站点样式
.stationName{
	width: 20rpx;//横向样式站点的宽度
	margin-top: 10rpx;//横向时站点名称与圆点的距离
	margin-bottom: 90rpx;//站点与底部的距离
}
//起点终点样式
.startEnd{
	width: 50rpx;
	height: 50rpx; 
	background-color: #06C918;
	border-radius: 30rpx;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FFFFFF;
	font-size: 26rpx;
	&--row{
		position: absolute;
		margin-top: -13rpx;
	}
	&--column{
		
		margin-left: -35rpx;
		margin-top: -80rpx;
	}
}
</style>
