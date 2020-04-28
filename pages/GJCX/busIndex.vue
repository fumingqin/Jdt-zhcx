<template>
	<view>
		<view class="bgColor"></view>
		<view :style="{height:statusBarHeight+'px'}" style="width: 100%;"></view>
		<view class="searchTopBox">
			<!-- #ifdef MP -->
			<text  class="locationTxt" @click="oncity">{{regionWeixin}}<text class="icon jdticon icon-xia"></text></text>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<text  class="locationTxt" @click="oncity">{{regionApp}}<text class="icon jdticon icon-xia"></text></text>
			<!-- #endif -->
			<view class="searchBoxRadius">
				<!-- <input class="inputIocale" type="search" v-model="ipt" @confirm="searchNow" placeholder="查线路/站点/地点" /> -->
				<inputSearch :dataSource="dataSource" @select="handleChange" placeholder="查线路" />
				<image class="searchImage" src="../../static/LYFW/currency/search.png" />
			</view>
			
		</view>
		<popup-layer ref="popupRef" :direction="'right'">
			<view style="width:750upx;height: 100%;">
				<citySelect @back_city="back_city"></citySelect>
			</view>
		</popup-layer>

		<view class="tabar">
			<QSTabs :current="current_2" :tabs="tabs_2" minWidth="100" style="font-size: 36rpx;" @change="change" />
		</view>
		<!-- 公交查询 -->
		<view v-if="current_2===0">
			<view class="box">
				<view class="searchBoxRadius2">
					<image class="searchImage2" src="../../static/GCJX/busIndex/green.png" />
					<input class="inputIocale2" placeholder="我的位置" @click="selectInitial" v-model="initialPoint" />
				</view>
				<!-- 虚线 -->
				<view class="xuxian"></view>
				<!-- 转换 -->
				<view @click="exchange">
					<image class="rotate" src="../../static/GCJX/busIndex/rotate.png"></image>
				</view>
				<view class="searchBoxRadius2">
					<image class="searchImage2" src="../../static/GCJX/busIndex/red.png" />
					<input class="inputIocale2" placeholder="输入终点" @click="selectDestination" v-model="destination" />
				</view>
			</view>

			<!-- 附近 -->
			<view class="currencyTitle">附近</view>
			<view class="box2">
				<view class="area1">
					<image class="image1" src="../../static/GCJX/busIndex/icon.png"></image>
					<text class="text1">{{nearstaion1}}</text>
					<text class="text2">{{distance}}千米></text>
				</view>

				<view class="xuxian2"></view>
				<view v-for="(item,index) in showdetailList" :key="index">
					<view v-if="item.lineDirection==0" class="area2" @click="goDetail(item.lineName,item.endName,index)">
						<view style="display: flex; position: relative;">
							<text class="text3">{{item.lineName}}</text>
							<text class="text4">{{item.carSta}}<text v-if="item.carSta!=='等待发车'" style="font-size: 36upx;font-weight: lighter;">站</text></text>
						</view>
						<view class="area3">
							<text class="text5">方向 {{item.endName}}</text>
							
							<text class="text6" v-if="item.carSta!=='等待发车'" >{{item.distance}}
							<text v-if="item.carSta!=='等待发车'">米 /</text>
							<text v-if="item.carSta!=='等待发车'">{{item.arriveTime}}分</text>
							</text>
							
							
						</view>
					</view>
				</view>
				<view class="more" v-if="linedata1.length>3" @click="more">{{btustatu?"展开":"收起"}}</view>
			</view>
		</view>
		<view v-if="current_2===1">
			
			<view  class="box3">
				<view v-if="historyList.length==0" class="area5" >
				<text class="text8">暂时没有历史记录哦</text>
				</view>
						   <view v-for="(item,index) in historyList" :key="index">
							   <view  class="area4" @click="historyLine(index)">
							   <image class="image2" src="../../static/GCJX/busIndex/bus.png"></image>
							   <text class="text7">{{item.lineName}}     方向     {{item.endName}}</text>
							   </view>
						   </view >
							   <view v-if="historyList.length>0" class="area5" @click="clearHistory">
						   <text class="text8">清除历史记录</text>
						   </view>
						   
					   </view>
		</view>
	</view>
</template>

<script>
	import citySelect from '../../components/HOME/uni-location/linzq-citySelect/linzq-citySelect.vue';
	import popupLayer from '../../components/HOME/uni-location/popup-layer/popup-layer.vue';
	import QSTabs from '../../components/GJCX/QS-tabs2/QS-tabs.vue'
	import gjcx from "../../common/Gjcx.js";
	import inputSearch from "../../components/GJCX/p-inputSearch/inputSearch.vue";
	export default {
		components: {
			citySelect,
			popupLayer,
			QSTabs,
			inputSearch
		},
		computed: {},
		data() {
			return {
				dataSource: [],
				disNum:'',
				btustatu: true, //展开收起状态
				statusBarHeight: this.statusBarHeight, //状态栏高度，在main.js里
				regionWeixin: '请选择', //微信地区数值
				regionApp : '请选择',//APP地区数值
				ipt: '', //搜索默认值
				tabs_2: ['去哪', '历史'], //选项标题
				current_2: 0, //标题下标
				filterIndex: 0, //tabs默认值
				nearstaion1: '', //附近站点
				nearstaion: [],
				linedata: [], //站点数据
				linedata1: [],
				startlocation: {}, //
				endlocation: {},
				initialPoint: '',
				destination: '',
				endlongitude: "",
				endtlatitude: "",
				arriveTime:[], //附近车辆到达时间
				distance: "", //附近站点距离
				startLonLat: "", //出发点经度
				endLonLat: "", //目的地经度
				startlongitude: "", //出发点纬度
				startlatitude: "", //出发点纬度
				Encryption: "XMJDTzzbusxmjdt", //接口校验码
				longitudeNow: "", //当前位置经度
				latitudeNow: "", //当前位置纬度
				myLonLat: '', //当前经纬度位置
				nearLonLat: '', //附近站点的经纬度
				arriveNum: '', //车辆距离站点站数
				lineInfo: [], //站点信息
				stationIndex: [], //站点所在站序
				carList: [], //线路车辆列表
				distanceBus: '', //公交距离到当前位置距离
				item2: [],
				nowStatus: [],
				busDistance: '', //线路距离
				carSta1:'',
				successNum: 0,
				successNum1:0,
				historyList:[],
				timer:'',
			}
		},
		created() {},
		mounted() {
			this.$refs.popupRef.close();
			uni.getStorage({
			    key: 'history',
			    success:(res)=>{
			        this.historyList = res.data;
			    }
			});
			
		},
		computed: {
			
			showdetailList: {
				get: function() {
					if (this.btustatu) {
						if (this.carList.length < 3) {
							return this.carList
						}
						let newArr = []
						for (var i = 0; i < 3; i++) {
							let item = this.carList[i]
							newArr.push(item);
						}
						return newArr
						// console.log(this.newArr)
					}
					return this.carList
				},
				set: function(val) {
					this.showdetailList = val
				},

			}
		},
		onLoad() {
			this.Getpostion();
			this.getAllLine();
			// this.Encryption();
			this.getNearbysites();
			// if(this.timer){
			// 	clearInterval(this.timer);
			// }
			// else{
			// 	this.timer =setInterval(()=>{
			// 		this.getNearbysites();
			// 		console.log('ok!!!!')
			// 	},10000);
			// }
		},
		
		methods: {
			oncity() {
				var that = this
				this.$refs.popupRef.show();
			},
			back_city(e) {
				if (e !== 'no' && e !== 'yes') {
					// console.log(e);
					this.regionWeixin = e.cityName;
					this.regionApp = e.cityName;
					// console.log(this.regionApp);
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
							// this.lyfwData(); //请求接口数据
						}
					}),
					uni.getStorage({
						key:'app_position',
						success: (res) => {
							console.log(res);
							this.regionApp = res.data.city;
						}
					})
					this.$refs.popupRef.close();
				}else{
					this.$refs.popupRef.close();
				}
			},
			historyLine(i){
				var that=this;
				that.nList=that.historyList[i];
				// console.log(that.nList);
				uni.navigateTo({url:'detailed?nList='+JSON.stringify(that.nList)+'&nearstaion1='+that.nearstaion1});
			},
			handleChange(data) {
			                // console.log(data.endName);
							var that=this;
							var Isrepeat=true;
							// that.nList=that.dataSource[i];
							// console.log(data);
							var list={
								lineName:data.name,
								endName:data.endName,
								lineID:data.lineID
							}; 
							// console.log(that.historyList.includes(list.lineName));
							// if (!that.historyList.includes(list,0)) {
							//      that.historyList.unshift(list);
								 
							// 	 uni.setStorage({
							// 	 	key:'history',
							// 		data:that.historyList
							// 	 })
							//      // localStorage.setItem("that.historyList", JSON.stringify(that.historyList));
							//      }else{
							//           //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
							//           let i =that.historyList.indexOf(list);
							// 		  console.log(i);
							//           that.historyList.splice(i,1)
							//           that.historyList.unshift(list);
							//           uni.setStorage({
							// 	 	key:'history',
							// 		data:that.historyList
							// 	 })
							//                 };
							      for (var i = 0; i < that.historyList.length; i++) {
							      	if (list.lineName == that.historyList[i].lineName) {
							      		Isrepeat = false;
							      	}
							      }
							      if (Isrepeat) {
							      	that.historyList.unshift(list);
							      	uni.setStorage({
							      		key: "history",
							      		data: that.historyList,
							      	})
							      }
							uni.navigateTo({url:'detailed?nList='+JSON.stringify(data)+'&nearstaion1='+that.nearstaion1})
			            },
			getAllLine(){
				var that=this;
				uni.request({
					url: gjcx.InterfaceAddress[7],      //获取所有线路
					data: {
						Encryption: that.Encryption,
					},
					success:function(res){
						// console.log(res.data);
						for(var i=0;i<res.data.length;i++){
							var obj={
								lineID:res.data[i].lineID,
								name:res.data[i].lineName,
								lineDirection:res.data[i].lineDirection,
								endName:res.data[i].endName,
								startName:res.data[i].startName,
								firstLastTime:res.data[i].firstLastTime,
							};
							that.dataSource.push(obj)
						}
						that.dataSource= that.unique(that.dataSource);
					},
					fail:function(info){
						console.log(info)
					}
				})
			},
			// 获取定位
			Getpostion() {
				setTimeout(()=>{
					uni.getStorage({
						key:'wx_position',
						success:(res)=>{
							// console.log(res)
							this.regionWeixin = res.data.city;
						},
						complete: () => {
							// this.lyfwData(); //请求接口数据
						}
					}),
					
					uni.getStorage({
						key:'app_position',
						success: (res) => {
							// console.log(res)
							this.regionApp = res.data.city;
						},
					})
				},500)
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
				//根据搜索的内容请求不同的接口,url待填充
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
					title: '你搜索了' + this.ipt,
					icon: 'none',
				})
				this.ipt = ''
			},
			//tabbar筛选点击
			change() {
				var that = this;
				if (that.current_2 == 0) {
					that.current_2 = 1;
				} else {
					that.current_2 = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})

			},
			more() {
				this.btustatu = !this.btustatu;
			},
			selectInitial: function() { //选择起点
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						uni.setStorage({
							key: 'startlocation',
							data: res,
							success: function() {
								that.initialPoint = res.name;
								that.startLonLat = res.longitude + "," + res.latitude;
								that.startlongitude = res.longitude;
								that.startlatitude = res.latitude;
								that.startlocation = res;
							}
						});
					}
				});
			},
			selectDestination: function() { //选择终点
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						uni.setStorage({
							key: 'endlocation',
							data: res,
							success: function() {
								that.destination = res.name;
								that.endLonLat = res.longitude + "," + res.latitude;
								that.endlongitude = res.longitude;
								that.endtlatitude = res.latitude;
								that.endlocation = res;
							}
						});
					}
				});
			},
			exchange: function() { //始末位置交换
				var that = this;
				var newinitialPoint = that.initialPoint;
				var newstartlocation = that.startlocation;
				var newstartlatitude = that.startlatitude;
				var newstartlongitude = that.startlongitude;
				uni.setStorage({
					key: 'startlocation',
					data: that.endlocation,
					success: function() {
						that.initialPoint = that.destination;
						that.startlocation = that.endlocation;
						that.startlatitude = that.endtlatitude;
						that.startlongitude = that.endlongitude;
					}
				});
				uni.setStorage({
					key: 'endlocation',
					data: newstartlocation,
					success: function() {
						that.destination = newinitialPoint;
						that.endlocation = newstartlocation;
						that.endtlatitude = newstartlatitude;
						that.endlongitude = newstartlongitude;
					}
				});
			},
			//进入详情页
			goDetail:function(lineName,endName,i) {
				
				var that=this;
				that.nList=that.carList[i];
				
				var list=that.nList;
				if (!that.historyList.includes(list)) {
				     that.historyList.unshift(list);
					 uni.setStorage({ 
					 	key:'history',
						data:that.historyList
					 })
				     // localStorage.setItem("that.historyList", JSON.stringify(that.historyList));
				     }else{
				          //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
				          let i =that.historyList.indexOf(list);
				          that.historyList.splice(i,1)
				          that.historyList.unshift(list);
				          uni.setStorage({
					 	key:'history',
						data:that.historyList
					 })
				                };

				uni.navigateTo({url:'detailed?nList='+JSON.stringify(that.nList)+'&nearstaion1='+that.nearstaion1})
				
			},
			//清除缓存
			clearHistory:function(){
				var that=this;
				uni.clearStorage();
				that.historyList=[];
			},
			//获取附近站点信息并计算我的位置到附近站点的距离
			getNearbysites: function() {
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						uni.request({
							url: gjcx.InterfaceAddress[1], //调用最近站点方法
							data: {
								lon: res.longitude,
								lat: res.latitude,
								Encryption: that.Encryption,
							},
							success: function(sta) {
								that.nearLonLat = sta.data[0].lon + ',' + sta.data[0].lat;
								that.nearstaion1 = sta.data[0].stationName;
								that.distance = parseInt(sta.data[0].distance);
								that.getLinedata(that.nearstaion1)
							}
						})
					}
				})
			}, 
			//获得经过附近的站点线路数据
			getLinedata: function(nearstaion1) {
				var that = this;
				uni.request({
					url: gjcx.InterfaceAddress[0], //用站点调用站点线路方法
					data: {
						stationName: nearstaion1,
						Encryption: that.Encryption,
					},
					success: function(dis) {
						// that.carList=[];
						that.linedata1=dis.data;
						// console.log(that.linedata1);
						const res = new Map();
						for (var i = 0; i < dis.data.length; i++){          //循环加入车辆状态和到达时间元素
							var obj={
								companyid:that.linedata1[i].companyid,
								endName:that.linedata1[i].endName,
								firstLastTime:that.linedata1[i].firstLastTime,
								lineDirection:that.linedata1[i].lineDirection,
								lineID:that.linedata1[i].lineID,
								lineName:that.linedata1[i].lineName,
								startName:that.linedata1[i].startName,
								carSta:"等待发车",
								distance:'/',
								firstLastTime:that.linedata1[i].firstLastTime,
								arriveTime:'/',
								
							};
							that.carList.push(obj)
						}
						that.carList= that.unique(that.carList);        //过滤重复线路
						
						for (let i in that.carList) { //循环线路信息
							uni.request({
								url: gjcx.InterfaceAddress[4], //根据线路请求距离当前车站最近的车辆
								data: {
									lineID: that.carList[i].lineID,
									direction: 0,
									stationName: that.nearstaion1,
									Encryption: that.Encryption,
								},
							success:function(res){
								that.lineInfo=res.data;
								  // console.log(i);
								  if(Array.isArray(res.data)){
								  // console.log(res.data);
								  that.getDistance(res.data[0].lon + ',' + res.data[0].lat,that.successNum);
								    if(res.data[0].needCount==1){                        //判断是否少于一站
										that.carSta1='即将到站';
										
										that.pushsta(that.carSta1,that.successNum);
										
									}
									else{
										that.carSta1=res.data[0].needCount;
									  that.pushsta(that.carSta1,that.successNum);
									  }
								  }
								  else{
									   that.carSta1='等待发车';
										that.pushsta(that.carSta1,that.successNum);									
																			//判断是否在运营时间
								  }
								  if(that.successNum<that.carList.length-1){
								  that.successNum++;
								  }
								  else{
									  that.successNum=0;
								  }
								},
								fail: function(info) {
									console.log(info)
								}
							});
							
						}
					}
				})
			},
			// pushIndex:function(index,i){
			// 	var that=this;
			// 	console.log(index,i);
			// 	that.carList[i].stationIndex=index;
			// },
			pushsta:function(carSta1,i){
				var that=this;
				console.log('站点序号'+i); 
				// console.log(JSON.stringify(that.carList)); 
				that.carList[i].carSta=carSta1;
				
			},
			unique(arr){
				const res = new Map();  //定义常量 res,值为一个Map对象实例
				　　//返回arr数组过滤后的结果，结果为一个数组   过滤条件是，如果res中没有某个键，就设置这个键的值为1
				　　return arr.filter((arr) => !res.has(arr.lineID) && res.set(arr.lineID, 1)) 
			},
			//获取公交到站点的距离
			getDistance: function(dis,i) {
				var that=this;
				// that.carList[i].distance=dis;
				uni.request({
					url: gjcx.InterfaceAddress[5],           //根据经纬度获取距离
							data: {
								startLonLat: that.nearLonLat,
								endLonLat: dis
							},
							success: function(long) {
								// console.log(long);
								that.getDistance1(long.data.Distance,i);
							},
							fail:function(info){
								console.log(info)
							} 
				});
			},
			getDistance1: function(dis,i){
				var that=this;
				
				// console.log('距离序号'+i); 
				
				that.carList[i].distance=dis;
				that.carList[i].arriveTime=Math.ceil(dis/400);
				// console.log(that.carList[i].arriveTime);
			}
		},
	};
</script>

<style lang="scss" scoped>
	.height {
		height: var(--status-bar-height);
	}

	.bgColor {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F3F3F3;
		z-index: -1;
	}

	.searchTopBox {
		display: flex;
		text-overflow: ellipsis; //文本溢出：省略号
		background-color: #FFFFFF;
		padding-bottom: 20upx;

		.locationTxt {
			color: #333333;
			padding-left: 32upx;
			font-size: 36upx;
			font-weight: bold;
			text-overflow: ellipsis;
			margin-top: 10upx;
			width: 24%;
			text-overflow: ellipsis; //文本溢出：省略号
		}

		.searchBoxRadius {
			// position: relative;
			// right: -157upx;
			width: 70%;
			// height: 74upx;
			// background-color: #fff;
			
			border-radius: 46upx;
			background: #f5f5f5;

			.searchImage {
				position: absolute;
				padding-left: 16upx;
				top: 15upx;
				width: 48upx;
				height: 48upx;
			}

			.inputIocale {
				position: absolute;
				height: 70upx;
				padding-top: 4upx;
				padding-left: 64upx;
				font-size: 30upx;
			}

		}
	}

	//导航栏
	.tabar {
		padding-top: 20upx;
		padding-bottom: 30upx;
	}

	// 虚线
	.xuxian {
		border-bottom-width: 2rpx;
		border-color: #F5F5F5;
		border-style: solid;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 117upx;
		margin-left: 20upx;
	}

	// 虚线2
	.xuxian2 {
		border-bottom-width: 2rpx;
		border-color: #F5F5F5;
		border-style: solid;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 29upx;
		margin-left: 20upx;
	}

	// 虚线3
	.xuxian3 {
		border-bottom-width: 2rpx;
		border-color: #F5F5F5;
		border-style: solid;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 117upx;
		margin-left: 20upx;
	}

	//地址栏
	.box {
		width: 670rpx;
		background-color: #ffffff;
		padding-left: 20upx;
		margin-left: 32upx;
		border-radius: 11rpx;

		.searchBoxRadius2 {
			// right: -157upx;
			width: 83%;
			height: 74upx;
			background-color: #fff;
			display: flex;
			position: relative;
			background: #ffffff;

			.searchImage2 {
				padding-left: 16upx;
				padding-top: 20upx;
				width: 50upx;
				height: 48upx;
				transform: scale(0.5);
			}

			.inputIocale2 {
				position: absolute;
				font-size: 30upx;
				margin-left: 77upx;
				margin-top: 15upx;
				width: 85%;
			}

		}

		// 旋转
		.rotate {
			position: absolute;
			left: 84%;
			top: 19%;
			width: 55upx;
			height: 60upx;
		}
	}

	.currencyTitle {
		font-size: 36upx;
		font-weight: bold;
		color: #333333;
		padding-left: 32upx;
		margin-top: 40upx;
		margin-bottom: 40upx;
	}

	// 附近站点
	.box2 {
		width: 670rpx;
		background-color: #ffffff;
		padding-left: 20upx;
		margin-left: 32upx;
		border-radius: 11rpx;
		margin-bottom: 45upx;

		.area1 {
			position: relative;
			// right: -157upx;
			width: 83%;
			height: 74upx;
			background-color: #fff;
			overflow: hidden;
			background: #ffffff;
			padding-top: 20upx;
		}

		.image1 {
			position: absolute;
			padding-left: 16upx;
			padding-top: 14upx;
			width: 25upx;
			height: 32upx;
		}

		.text1 {
			padding-left: 70upx;
			font-size: 36upx;
			font-weight: 500;
			padding-right: 20upx;
		}

		.text2 {
			font-size: 24upx;
			font-weight: lighter;
		}

		.area2 {
			// right: -157upx;
			height: 157upx;
			background-color: #fff;
			background: #ffffff;
			padding-top: 20upx;

			.text3 {
				padding-left: 70upx;
				font-size: 36upx;
				font-weight: 500;

			}

			.text4 {
				position: absolute;
				font-size: 36upx;
				font-weight: 500;
				color: #FF6600;
				left: 70%;
			}

			.area3 {
				padding-top: 20upx;
				padding-bottom: 20upx;
				position: relative;
				.text5 {
					padding-left: 70upx;
					font-size: 26upx;
					font-weight: lighter;
					padding-top: 25upx;
				}

				.text6 {
					font-size: 26upx;
					font-weight: lighter;
					position: absolute;
					left: 70%;
					padding-top: 15upx;
				}

			}
		}

		.more {
			text-align: center;
			font-size: 28upx;
			color: #888888;
			padding-top: 32upx;
			padding-bottom: 32upx;
		}
	}

	//历史
	.box3 {
		width: 670rpx;
		background-color: #ffffff;
		padding-left: 20upx;
		margin-left: 32upx;
		border-radius: 11rpx;
		margin-bottom: 45upx;

		.area4 {
			padding-top: 20upx;
			padding-bottom: 20upx;

			.text7 {

				font-size: 28upx;
				color: #333333;
			}

			.image2 {
				padding-left: 16upx;
				padding-top: 14upx;
				width: 32upx;
				height: 32upx;
				padding-right: 20upx;
			}
		}
		.area5{
			padding-top: 20upx;
			padding-bottom: 20upx;
			text-align: center;
			.text8{
				font-size: 28upx;
				color: #333333;
				text-align: center;
				font-weight: lighter;
			}
		}
	}
</style>
