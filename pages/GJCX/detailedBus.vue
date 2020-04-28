<template>
	<view>
		<!-- 顶部基本信息 -->
		<view class="box1">
			<view class="text1">方向:   {{nList.lineDirection}}</view>
			<view class="butter">首末时间</view>
			<view class="text2">{{nList.firstLastTime}}</view>
			<view class="butter2">票价</view>
			<view class="text3">{{price}}  ></view>
		</view>
		<!-- 地图 -->
		<view style="position: relative;z-index: -999;">
		<map id='map' ref="map" class="map" :style="{height:mapHeight,width:mapWidth}" :scale="scale" :longitude="longitude" :latitude="latitude" 
		 :show-location="true" :controls="controls" @controltap="controltap">
		</map>
		</view>
		<view>
		<!-- 嵌套弹窗 -->
		<uni-popup ref="popup" type="bottom">
			<!-- 线路信息 -->
			<view class="box2">
				<!-- 时间信息左 -->
				<view class="area1">
					<view class="text4">
			            <text >预计到达</text>
						</view>
					<view class="text4">
						<text>下一站/{{arriveTime}}分  {{distance}}{{unit}}</text>
					</view>
			    </view> 
				
				<!-- 时间信息右 -->
				<view class="area2">
					<view class="text4">
				        <text >预计起点发车</text>
						</view>
					<view class="text4">
						<text>{{departureTime}}</text>
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
			
			</uni-popup>
			
			
			
			</view>
			<!-- 底部操作 -->
			<view class="box4">
				<view class="areaLeft" @click="exchange">
					<image class="exchange" src="../../static/GCJX/detailedBus/exchange.png"></image>
					<text class="huanxiang">换向</text>
				</view>
				<view class="areaRight" @click="controlPopup">
					<image class="map" src="../../static/GCJX/detailedBus/loction.png"></image>
					<text class="ditu">地图</text>
				</view>
			</view>
	</view>
</template>

<script>
	import uniPopup from '../../components/GJCX/uni-popup/uni-popup3.vue'
	import taxi from '../../common/Czc.js'
	export default {
		data() {
			return {
				Encryption: "XMJDTzzbusxmjdt", //接口校验码
				detailLine:'',
				nearStastion:'',
				arriveTime:'',
				realtimeDynamic:[],
				realtimeDynamicback:[],
				direction:0,
				list:'',      //线路接口
				list1:[],
				list2:[],
				longitude: "", //精度
				latitude: "", //纬度
				key: [],
				scale: 16,
				mapHeight: '',
				mapWidth:'319px',
				popupStatu:0, //弹窗状态
				controls: [{
						id: 'back',
						position: {
							left: 10,
							top: 200,
							width: 55,
							height: 55
						},
						iconPath: '../../static/Home/Position.png',
						clickable: true,
					},
					/* 			{
									id: 'CallPollice',
									position: {
										left: 300,
										top: 290,
										width: 55,
										height: 55
									},
									iconPath: '../../static/Home/CallPollice.png',
									clickable: true,
								}, */
					// {
					// 	id: 'Service',
					// 	position: {
					// 		left: 300,
					// 		top: 345,
					// 		width: 55,
					// 		height: 55
					// 	},
					// 	iconPath: '../../static/Home/Service.png',
					// 	clickable: true,
					// },
					{
						id: 'Big',
						position: {
							left: 300,
							top: 405,
							width: 55,
							height: 55
						},
						iconPath: '../../static/Home/Big.png',
						clickable: true,
					},
					{
						id: 'Small',
						position: {
							left: 300,
							top: 440,
							width: 55,
							height: 55
						},
						iconPath: '../../static/Home/Small.png',
						clickable: true,
					}
				],
				endStation:'',
				starTime:'',
				endTime:'',
				price:'',
				distance:'',
				unit:'',
				departureTime:'',
				nList:[],
			}
		},
		onLoad(options) {
			
			var that = this;
			  console.log("接收到的参数是list="+options.nList);//此处打印出来的是字符串，解析如下   
			console.log(options)
			  that.nList = JSON.parse(options.nList);//解析得到集合
			that.busIndex();
			that.lineDetaile();
			that.getGaoDeKey();
			that.getMyLocation();
			that.$refs.popup.open();
			uni.getSystemInfo({
				success: function(res) {
					if (res.screenWidth < 350) {
						//回到我的位置
						that.controls[0].position.top = 250;
						//-
						that.controls[1].position.left = 250;
						that.controls[1].position.top = 280;
						//+
						that.controls[2].position.left = 250;
						that.controls[2].position.top = 315;
						// //客服
						// that.controls[3].position.left = 250;
						// that.controls[3].position.top = 350;
					
					}
				}
			})

		},
		onReady() {
			var that = this;
			that.mapContext = uni.createMapContext("map", this);
			uni.getSystemInfo({
				//设置地图高度为可使用的高度
				success: function(res) {
					that.mapHeight = (res.windowHeight - 50) + 'px';
				}
			});
		},
		components: {
			//加载多方弹框组件
			uniPopup
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
				this.endStation =this.detailLine.data.endStation;
				this.starTime =this.detailLine.data.starTime;
				this.endTime =this.detailLine.data.endTime;
				this.price =this.detailLine.data.price;
				this.unit =this.detailLine.data.unit;
				this.departureTime =this.detailLine.data.departureTime;
			},
			getGaoDeKey: function() {
				//获取高德key
				var that = this;
				that.key = taxi.GaoDeWebKey;
			},
			getMyLocation: function() {
				//获取我的位置，将地图中心点移动至此
				var that = this;
				var ojb = {
					type: 'gcj02',
					geocode: true,
					success: function(res) {
						that.longitude = res.longitude;
						that.latitude = res.latitude;
					},
					fail: function() {
			
					},
				}
				uni.getLocation(ojb);
			},
			//地图控件调用方法
			controltap: function(e) {
				var that = this;
				var controlId = ''
				// #ifdef APP-PLUS
				controlId = e.detail.controlId;
				// #endif
				// #ifdef MP-WEIXIN
				controlId = e.controlId;
				// #endif
			
				if (controlId === 'back') {
					//回到我的位置
					that.mapContext.moveToLocation();
				}   else if (controlId === 'Big') {
					//放大
					if (this.scale < 18) {
						this.scale = this.scale + 1;
					}
				} else if (controlId === 'Small') {
					//缩小
					if (this.scale > 5) {
						this.scale = this.scale - 1;
					}
				}
			},
			//换向 点击后更换接口
			exchange(){
				this.$refs.popup.open();
				if(this.direction==0){
				this.direction =1;
				this.list=this.realtimeDynamicback
				}
				else{
					this.direction =0;
					this.list=this.realtimeDynamic
				}
			},
			//弹框
			controlPopup(){
				if(this.popupStatu==0){
					this.$refs.popup.close();
					this.popupStatu=1;

				}
				else{
					this.$refs.popup.open();
					this.popupStatu=0;

				}
			},
			lineDetaile:function(){
				var that=this;
				uni.request({
					url:gjcx.InterfaceAddress[2],
					data:{
						lineID:nList.lineID,
						direction:0,
						Encryption:that.Encryption,
					},
					success:function(res){
						that.list1=res.data;
					}
				});
				uni.request({
					url:gjcx.InterfaceAddress[2],
					data:{
						lineID:nList.lineID,
						direction:1,
						Encryption:that.Encryption,
					},
					success:function(res){
						that.list2=res.data;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	// .bgColor{
	//     position: fixed;
	//     top: 0;
	//     left: 0;
	//     right: 0;
	//     bottom: 0;
	//     background: #F3F3F3;
	//     z-index: -1;
	//   }
  .box1{
	  background-color: #FFFFFF;
	  height: 160upx;
	  position: relative;
	  z-index: 9999;
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
  	border-radius: 11rpx;
    display: flex;
	margin-left: 32upx;
	// position: absolute;
	// right: 30upx;
 //    top: 188upx;
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
       		   text-align: center;
       		   padding-top: 20upx;
       		   margin-left: 71upx;
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
		margin-left: 32upx;
		margin-bottom: 187upx;
		// position: fixed;
		// top: 300upx;
		// z-index: 998;
		.scroll-X{
			white-space: nowrap;
			height: 600upx;
			width: 690rpx;
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
		position: absolute;
		width: 690rpx;
		height: 96upx;
		background-color: #ffffff;
		margin-left: 32upx;
		border-radius: 11rpx;
		bottom: 63upx;
		
		// margin-top: 32upx;
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
