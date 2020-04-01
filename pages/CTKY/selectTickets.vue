<template>
	<view class="myView">
		<!-- 顶部时间选项卡 -->
		<view class="headerClass">
			<scroll-view class="scrollClass" scroll-x>
				<view class="blockClass" :class="selectIndex == index ? 'viewPress': '' " v-for="(item,index) in dateArray" :key="index"
				 @click="viewClick(index,item)" v-model="selectIndex">
					<view class="textCLass">
						<view class="weekClass">{{item.week}}</view>
						<view class="dateClass">{{item.date}}</view>
					</view>
				</view>
			</scroll-view>
			<view style="width: 14%;height: 100%; align-items: center; justify-content: center;display: flex;">
				<image src="../../static/CTKY/calendar.png" class="calendarImage" @click="onShowDatePicker('date')"></image>
			</view>
			<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
			 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		</view>
		
		<!-- 车票内容部分 -->
		<view class="ctky_View" v-for="(item,index) in departureData" :key="index" @click="ticketDetail(item)">
			<view class="ctky_View_Left">
				<view style="display: flex;align-items: center;margin:20upx 25upx;">
					<view class="markType" style="border:#1EA2FF solid 1px;color:#1EA2FF;" v-if="item.DepartureType=='传统客运'">传统</view>
					<view class="markType" style="border:#FF5A00 solid 1px;color:#FF5A00;" v-if="item.DepartureType=='定制班车'">定制</view>
					<view style="margin-left:19upx ;font-family: SourceHanSansSC-Bold;font-weight: bold;">{{item.SetTime}}</view>
				</view>
				<!-- <view style="margin:28upx 25upx;font-style: SourceHanSansSC-Regular; font-size:36upx ;color: #2C2D2D;padding: 0;">传统班车</view> -->
				<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
					<image src="../../static/CTKY/startDot.png" style="width: 10upx ;height: 10upx;"></image>
					<view style="margin-left: 16upx; font-size: 30upx;font-style:SourceHanSansSC-Regular ;
					color: #333333;">{{item.StartStaion}}</view>
				</view>
				<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
					<image src="../../static/CTKY/endDot.png" style="width: 10upx ;height: 10upx;"></image>
					<view style="margin-left: 16upx;font-size: 30upx;font-style:SourceHanSansSC-Regular ;
					color: #333333;">{{item.EndStation}}</view>
				</view>
				<view style="margin-left: 25upx;margin-bottom: 20upx;font-style: SourceHanSansSC-Light;font-weight: lighter;
				font-size: 28upx;color: #666666;" v-if="item.DepartureType=='传统客运'">{{item.CarType}}/约{{item.Duration}}分钟/儿童半票</view>
				<view style="margin-left: 25upx;margin-bottom: 20upx;font-style: SourceHanSansSC-Light;font-weight: lighter;
				font-size: 28upx;color: #666666;" v-if="item.DepartureType=='定制班车'">{{item.CarType}}/约{{item.Duration}}分钟/儿童半票/站外上车</view>
			</view>
			<view class="ctky_View_Right">
				<view>
					<view style="margin-right: 28upx;font-size: 36upx;font-style:
		           SourceHanSansSC-Regular; color: #FC4646;">￥{{item.Price}}</view>
					<view style="margin-right: 28upx;margin-top: 20upx;font-size: 24upx;font-style:
		           SourceHanSansSC-Light; color: #666666;">余{{item.Seat}}张</view>
				</view>
			</view>
		</view>
<!-- 		<view class="ctky_View" v-for="(item,index) in 2" :key="index" @click="ticketDetail">
			<view class="ctky_View_Left">
				<view style="display: flex;align-items: center;margin:20upx 25upx;">
					<view style="width:65upx ;height: 37upx;border-radius: 14upx; border:#FF5A00  solid 1px;text-align: center;align-items: center;color:#FF5A00 
					;font-size: 24upx;font-family: SourceHanSansSC-Light;">定制</view>
					<view style="margin-left:19upx ;font-family: SourceHanSansSC-Bold;font-weight: bold;">15:05</view>
				</view>
				<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
					<image src="../../static/CTKY/startDot.png" style="width: 10upx ;height: 10upx;"></image>
					<view style="margin-left: 16upx; font-size: 30upx;font-style:SourceHanSansSC-Regular ;
					color: #333333;">泉州客运中心站</view>
				</view>
				<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
					<image src="../../static/CTKY/endDot.png" style="width: 10upx ;height: 10upx;"></image>
					<view style="margin-left: 16upx;font-size: 30upx;font-style:SourceHanSansSC-Regular ;
					color: #333333;">安溪</view>
				</view>
				<view style="margin-left: 25upx;margin-bottom: 20upx;font-style: SourceHanSansSC-Light;font-weight: lighter;
				font-size: 28upx;color: #666666;">大型高一/约1-2小时/儿童半票/站外上车</view>
			</view>
			<view class="ctky_View_Right">
				<view>
					<view style="margin-right: 28upx;font-size: 36upx;font-style:
		           SourceHanSansSC-Regular; color: #FC4646;">￥28</view>
					<view style="margin-right: 28upx;margin-top: 20upx;font-size: 24upx;font-style:
		           SourceHanSansSC-Light; color: #666666;">余18张</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import MxDatePicker from "../../components/CTKY/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			MxDatePicker
		},
		data() {
			return {
				isNormal:'',
				dateArray: [], //时间轴的数量的数组
				selectIndex: '', //选中的下标
				date: '', //时间轴上选中的日期
				showPicker: false,
				type: 'rangetime',
				value: '',
				//测试数据传输
				ticketInfo: [{
					ticketDate: '12月1日',
					ticketSettime: '14:30',
					ticketPrice: '37',
					ticketCount: '25',
					ticketStart: '厦门',
					ticketEnd: '拉萨',
					carType: '大型高一',
					ticketType: '儿童半票'
				}],
				startStation:'',//出发站
				endStartion:'',//终点站
				departureData:[],//班次数据
			}
		},
		onLoad(param) {
			//当前车票类型：0表示普通购票 1表示定制班车
			this.isNormal = 0;
			this.date = param.date;
			this.startStation=param.startStation;
			this.endStartion=param.endStation;
			
			
			// this.date = this.getTime(0, new Date());
			// this.startStation=param.StartStation;
			// this.endStartion=param.EndStation;
			console.log(this.date,this.startStation,this.endStartion)
			this.loadDate();
            this.getDeparture();
			
			// uni.request({
			// 		url: "http://111.231.109.113:8000/api/MyTest/GetDeparture",
			// 		data: {
			// 			departureDate:param.date,
			// 			startStation:param.startStation,
			// 			endStation:param.endStation
			// 		},
			// 		method:"Get",
			// 		header : {'content-type':'application/json'},
			// 		success: (res) => {
			// 			console.log(res.data);
			// 			this.departureData=res.data;
			// 		}
			// 	});	
		},
		onReady() {

		},
		methods: {
			viewClick: function(e, item) {
				this.selectIndex = e;
				this.date = item.longDate;
				// console.log(this.date);
				this.getDeparture();
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					// this[this.type] = e.value.split('/')[1] + "月" + e.value.split('/')[2] + "日";
					// this.datestring = this[this.type];
					// this.queryWeek(e.date.toString().substring(0,3));
					console.log(this[this.type]);
					console.log(e.date.toString().substring(0, 3));
					//console.log(this.Week);
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
					this.date = e.value;
					var IsExist = false;
					for (var i = 0; i < this.dateArray.length; i++) {
						if ((new Date(this.dateArray[i].longDate)).getTime() == (new Date(this.date)).getTime()) {
							IsExist = true;
							this.selectIndex = i;
						}
					}
					//判断时间轴上是否存在改日期，不存在则重新绘制
					if (!IsExist) {
						this.dateArray = [];
						var dateToday = new Date(); //获取今天日期
						var date = new Date(this.date); //选中的日期
						this.selectIndex = 0;
						for (var i = 0; i < 8; i++) {
							var mydate = new Date(date.getTime() + 24 * i * 60 * 60 * 1000); //日期一天加一次
							var nowdate = this.getTime(3, mydate); //获取该日期的缩写  月/日
							var week = this.getTime(2, mydate); //获取该日期为周几
							var longdate = this.getTime(0, mydate); //获取 年/月/日
							if (this.getTime(0, mydate) == this.getTime(0, dateToday)) {
								week = '今天';
							}
							this.dateArray.push({
								week: week,
								date: nowdate,
								longDate: longdate,
							});
						}
					}
				}
			},
			//点击班次进行缓存，并打开页面
			ticketDetail(item) {
				var that = this;
				console.log('当前选择',item);
				
				if(item.DepartureType == '传统客运') {
					this.isNormal = 0
				}else if (item.DepartureType == '定制班车'){
					this.isNormal = 1
				}
				uni.setStorage({
					key: 'shiftDate',
					data:this.getTime(4,new Date(this.date)) , //缓存所选的班次日期
					success() {},
					fail() {

					}
				});
				//将点击的班次存入缓存
				uni.setStorage({
					key: 'selectedTicket',
					data: item, //缓存所选的班次日期
					success() {},
					fail() {
					}
				});
				uni.navigateTo({
					url: '/pages/CTKY/scheduleDetails?isNormal=' + this.isNormal
				})
			},
			//日期时间转换函数   type 0 年月日 ，1 时分秒 ， 2 星期 ，3 月/日  4几月几日
			getTime: function(type, date1) {
				let date = new Date(date1.getTime()),
					currentDate,
					currentTime,
					sortDate,
					monthAndDay,
					seperator = "/", // 如果想要其他格式 只需 修改这里 
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					weex = date.getDay(),
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// month >= 1 && month <= 9 ? (month = "0" + month) : "";
				// day >= 0 && day <= 9 ? (day = "0" + day) : "";
				//当前 日期
				currentDate = year + seperator + month + seperator + day;
				//当前 时间
				currentTime = hour + ":" + minute + ":" + second;
				sortDate = month + "/" + day;
				monthAndDay= month + "月" + day+"日";
				// 输出格式 为 2018-8-27 14:45:33
				// console.log(currentDate +" "+ currentTime);
				if (type == 0) {
					return currentDate
				} else if (type == 1) {
					return currentTime;
				} else if (type == 2) {
					if (weex == 1) {
						return '周一'
					}
					if (weex == 2) {
						return '周二'
					}
					if (weex == 3) {
						return '周三'
					}
					if (weex == 4) {
						return '周四'
					}
					if (weex == 5) {
						return '周五'
					}
					if (weex == 6) {
						return '周六'
					}
					if (weex == 0) {
						return '周日'
					}
				} else if (type == 3) {
					return sortDate;
				}else if(type==4)
				{
					return monthAndDay;
				}
				 else {
					return currentDate + " " + currentTime;
				}
			},
			//初始化时间轴
			loadDate() {
				var date = new Date();
				console.log(date);
				this.selectIndex = 0;
				for (var i = 0; i < 8; i++) {
					var mydate = new Date(date.getTime() + 24 * i * 60 * 60 * 1000);
					var nowdate = this.getTime(3, mydate);
					var week = this.getTime(2, mydate);
					var longdate = this.getTime(0, mydate);
					if (mydate.getTime() == date.getTime()) {
						week = '今天';
					}
					this.dateArray.push({
						week: week,
						date: nowdate,
						longDate: longdate,
					});
				}
			},

			//调用接口根据起点站、终点站、日期获取 班次数据
			getDeparture(){

				uni.request({
						url: "http://111.231.109.113:8000/api/MyTest/GetDeparture",
						data: {
							departureDate:this.date,
							startStation:this.startStation,
							endStation:this.endStartion
						},
						method:"Get",
						header : {'content-type':'application/json'},
						success: (res) => {
							// console.log('类型',res.data);
							this.departureData=res.data;
						}
					});	

			}
			
		}
	}
</script>

<style lang="scss">
	page,
	.myView {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}

	.headerClass {
		width: 100%;
		background: #FFFFFF;
		height: 109upx;
		//padding-left: 10upx;
		margin-bottom: 10upx;
		display: flex;
	}

	.scrollClass {
		height: 109upx;
		width: 86%;
		white-space: nowrap; //外层写这俩
		flex-wrap: nowrap;
	}

	.blockClass {
		margin: 12upx 14upx;
		//background: #FFFFFF;
		width: 87upx;
		height: 84upx;
		border-radius: 8upx;
		display: inline-block; //里层写这个
	}
	.markType {
		width:65upx;
		height: 37upx;
		line-height: 37rpx;
		border-radius: 14upx;
		text-align: center;
		align-items: center;
		font-size: 24upx;
		font-family: SourceHanSansSC-Light;
	}
	.textCLass {
		margin: 9upx 17upx;
	}

	.weekClass {
		//display: block;
		font-size: 26upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #333333;
		text-align: center;
	}

	.dateClass {
		//display: block;
		font-size: 24upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #333333;
		text-align: center;
	}

	.viewPress {
		background: #DD524D;

		.weekClass {
			color: #FFFFFF;
		}

		.dateClass {
			color: #FFFFFF;
		}
	}

	.calendarImage {
		width: 35upx;
		height: 37upx;
	}

	.ctky_View {
		width: 94%;
		background: #FFFFFF;
		margin: 16upx 3%;
		border-radius: 20upx;
		display: flex;
		justify-content: space-between;
	}

	.ctky_View_Left {
		text-align: left;
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	.ctky_View_Right {
		display: flex;
		text-align: right;
		align-items: center;
		padding: 0;
	}
</style>
