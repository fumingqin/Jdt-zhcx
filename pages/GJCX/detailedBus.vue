<template>
	<view>
		<!-- 背景颜色 -->
		<view  class="bgColor"></view>
		<!-- 顶部基本信息 -->
		<view class="box1">
			<view class="text1">方向:   {{detailLine.data.endStation}}</view>
			<view class="butter">首末时间</view>
			<view class="text2">{{detailLine.data.starTime}} - {{detailLine.data.endTime}}</view>
			<view class="butter2">票价</view>
			<view class="text3">{{detailLine.data.price}}  ></view>
		</view>
		<!-- 时间信息左 -->
		<view class="box2">
			<view class="area1">
				<view class="text4">
		            <text >预计到达</text>
					</view>
				<view class="text4">
					<text>下一站/{{arriveTime}}分  {{detailLine.data.distance}}{{detailLine.data.unit}}</text>
				</view>
		    </view> 
			<!-- 时间信息右 -->
			<view class="area2">
				<view class="text4">
			        <text >预计起点发车</text>
					</view>
				<view class="text4">
					<text>{{detailLine.data.departureTime}}</text>
				</view>
			</view> 
		</view>
		<!-- 横向动态列表 -->
		<view class="box3">
			<scroll-view scroll-x="true" class="scroll-X" >
				<image class="image1" src="../../static/GCJX/detailedBus/star.png"></image> 
				<view style="position: absolute;top: -4px;left: 33px;height: 600upx;padding-top: 29px;">
					<!-- 循环前判断公交方向 -->
					<block v-for="(item,index) in list" :key="index">
			<!-- 序号	 -->	<text class="num" style="">{{index+1}}</text>
			<!-- 站点	 -->    <text class="stationName" style="">{{item.stationName}}</text>
			<!-- 公交 -->	    <image v-if="item.isArrive==1" class="image2" src="../../static/GCJX/detailedBus/bus.png"></image>
			<!-- 箭头 -->		<image v-if="index!=0&&index!=realtimeDynamic.length-1" class="arrowHead" style="" src="../../static/GCJX/detailedBus/arrowHead.png"></image>
			<!-- 绿条 -->		<image v-if="item.stationStatu==0&&index!=realtimeDynamic.length-1" style="width: 107upx;height: 14upx;" src="../../static/GCJX/detailedBus/green.png"></image>
			<!-- 橙条	 -->	<image v-if="item.stationStatu==1&&index!=realtimeDynamic.length-1" style="width: 107upx;height: 14upx;" src="../../static/GCJX/detailedBus/orange.png"></image>
			<!-- 红条 -->		<image v-if="item.stationStatu==2&&index!=realtimeDynamic.length-1" style="width: 107upx;height: 14upx;" src="../../static/GCJX/detailedBus/red.png"></image>
			<!-- 终点	 -->	<image v-if="index==realtimeDynamic.length-1" class="image3" src="../../static/GCJX/detailedBus/end.png"></image>
				    </block>
					
					</view>
			</scroll-view>
	</view>
			<!-- 底部操作 -->
			<view class="box4">
				<view class="areaLeft" @click="exchange">
					<image class="exchange" src="../../static/GCJX/detailedBus/exchange.png"></image>
					<text class="huanxiang">换向</text>
				</view>
				<view class="areaRight">
					<image class="map" src="../../static/GCJX/detailedBus/loction.png"></image>
					<text class="ditu">地图</text>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailLine:'',
				nearStastion:'',
				arriveTime:'',
				realtimeDynamic:[],
				realtimeDynamicback:[],
				direction:0,
				list:'',      //接口
			}
		},
		onLoad() {
			this.busIndex()

		},
		methods: {
			async busIndex(){
				let detailline = await this.$api.gjcx('detailLine');
				this.detailLine = detailline;
                this.arriveTime =Math.ceil(this.detailLine.data.distance/200)
				let nearstastion =await this.$api.gjcx('nearBy');
				this.nearStastion =nearstastion;
                let realtimedynamic =await this.$api.gjcx('realtimeDynamic');
				this.realtimeDynamic =realtimedynamic.data;
				this.list=this.realtimeDynamic;
				let realtimedynamicback =await this.$api.gjcx('realtimeDynamicback');
				this.realtimeDynamicback =realtimedynamicback.data;
			},
			//换向 点击后更换接口
			exchange(){
				if(this.direction==0){
				this.direction =1;
				this.list=this.realtimeDynamicback
				}
				else{
					this.direction =0;
					this.list=this.realtimeDynamic
				}
			}
		}
	}
</script>

<style lang="scss">
	.bgColor{
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: #F3F3F3;
	    z-index: -1;
	  }
  .box1{
	  background-color: #FFFFFF;
	  height: 160upx;
	  position: relative;
	.text1{
		  font-size: 32upx;
		  margin-left: 33upx;
	  }
	  .butter {
	  	width: 136upx;
	  	height: 48upx;
        margin-left: 32upx;
		margin-top: 32upx;
	  	background-color: #01b5fd;
	  	color: #FFFFFF;
	  	font-size: 26upx;
	  	text-align: center;
	  	line-height: 50upx;
		border-radius: 10upx;
	  }
	  .butter2 {
	  	width: 136upx;
	  	height: 48upx;
        position: absolute;
		top: 73upx;
		right: 216upx;
	  	background-color: #01b5fd;
	  	color: #FFFFFF;
	  	font-size: 26upx;
	  	text-align: center;
	  	line-height: 50upx;
	  		border-radius: 10upx;
	  }
	  .text2{
		  position: absolute;
          top:73upx;
		  font-size: 30upx;
		  left: 188upx;
	  }
	  .text3{
	  	  position: absolute;
		  right: 127upx;
	      top:73upx;
	  	  font-size: 30upx;
	  }
  }
  .box2{
  	width: 690rpx;
  	background-color: #ffffff;
  	margin-left: 32upx;
  	border-radius: 11rpx;
	margin-top: 32upx;
    display: flex;
		// position: relative;

       .area1{
		   text-align: center;
		   padding-top: 20upx;
		   margin-left: 71upx;
		   padding-bottom: 41upx;
		.text4{
			color: #FF7D43;
			font-size: 30upx;
			padding-top: 22upx;
			padding-right: 40upx;
		}
		}
       .area2{
               margin-left: 71upx;
       		   text-align: center;
       		   padding-top: 20upx;
       		   // margin-left: 71upx;
       		   padding-bottom: 41upx;
			   padding-right: 83upx;
       		.text4{
       			color: #FF7D43;
       			font-size: 30upx;
       			padding-top: 22upx;
       		}
       		}

	}
	.box3{
		width: 690rpx;
		height: 600upx;
		background-color: #ffffff;
		margin-left: 32upx;
		border-radius: 11rpx;
		margin-top: 32upx;
		position: relative;

		.scroll-X{
			white-space: nowrap;
			height: 600upx;
			position: absolute;
			.image1{
				position: relative;
				width: 36upx;
				height: 36upx;
				padding-left: 43upx;
				padding-top: 76upx;
				z-index: 999;
			}
			.image3{
				position: absolute;
				width: 36upx;
				height: 36upx;
                left:100%;
				padding-top: 18upx;
			}
			.image2{
				height: 27upx;
				width: 54upx;
				position: absolute;
				top: 60upx;
				transform:translateX(-40%);//水平左移
			}
			.arrowHead{
				height: 16upx;
				width: 14upx;
				position: absolute;
				top: 91upx;
				z-index: 998;
			}
			.stationName{
				width: 20px;
				white-space: pre-wrap;
				word-wrap: break-word;
				font-size: 28upx;
				position: absolute;
				top: 90px;
				transform:translateX(-25%);
			}
			.num{
				height: 16upx;
				width: 14upx;
				position: absolute;
				top: 130upx;
				font-size: 28upx;
				transform:translateX(-40%);
			}
		}
	}
	.box4{
		width: 690rpx;
		height: 96upx;
		background-color: #ffffff;
		margin-left: 32upx;
		border-radius: 11rpx;
		margin-top: 32upx;
		// position: relative;
		display: flex;
		.areaLeft{
			width: 345rpx;
			text-align: center;
			margin-top: 22upx;
			.exchange{
				width: 37upx;
				height: 28upx;
			}
			.huanxiang{
				font-size: 30upx;
			}
		}
		.areaRight{
			width: 344rpx;
			text-align: center;
			margin-top: 22upx;
			.map{
				width: 28upx;
				height: 28upx;
			}
			.ditu{
				font-size: 30upx;
			}
		}
	}
</style>
