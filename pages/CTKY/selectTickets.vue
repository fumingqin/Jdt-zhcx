<template>
	<view class="myView">
		<view class="headerClass">
			<scroll-view class="scrollClass" scroll-x>
				<view class="blockClass" :class="selectIndex == index ? 'viewPress': '' " v-for="(item,index) in dateArray" :key="index"  @click="viewClick(index)">
					<view class="textCLass">
						<view class="weekClass">{{item.week}}</view>
						<view class="dateClass">{{item.date}}</view>
					</view>
				</view>
				<!-- <view style="width: 50%;height: 100%; background: #007AFF; display: inline-block;"></view>
				<view style="width: 50%;height: 100%; background: #4CD964;display: inline-block;"></view>
				<view style="width: 50%;height: 100%; background: #999999;display: inline-block;"></view> -->
			</scroll-view>
			<view>
				<image src="../../static/index/calendar.png" class="calendarImage" @click="onShowDatePicker('date')"></image>
			</view>
			<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
			 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		</view>
		<view class="ticketClass" v-for="(index,i) in 7" :key="index"  @click="ticketDetail">
			<image src="../../static/index/ordinaryShuttle.png" class="ticketSortImage"></image>
			<view class="ticketTimeCLass">  
				<text class="timeClass">15:05</text>
				<text class="estimatedTimeClass">约1-2小时</text>
			</view>
			<view class="ticketStationClass">
				<text class="startClass">泉州客运中心站</text>
				<text class="endClass">安溪</text>
				<text class="carTypeClass">大型高一</text>
			</view>
			<view class="priceBlockClass">
				<text class="priceClass">￥28</text>
				<text class="ticketCountClass">10张</text>
			</view>
		</view>
	</view>
</template>

<script>
	import MxDatePicker from "../../components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			MxDatePicker
		},
		data() {
			return {
				dateArray: [{
						week: '今日',
						date: '2/28'
					},
					{
						week: '明日',
						date: '2/29'
					},
					{
						week: '后天',
						date: '3/1'
					},
					{
						week: '今日',
						date: '3/2'
					},
					{
						week: '今日',
						date: '3/3'
					},
					{
						week: '今日',
						date: '3/4'
					},
					{
						week: '今日',
						date: '3/5'
					}
				],
                selectIndex:0,
				date: '2019/01/01',
				showPicker:false,
				type: 'rangetime',
				value: '',
			}
		},
		onLoad(params) {
			//加载时获取上个页面传过来的参数
			uni.setNavigationBarTitle({
				title: params.lineName,

			});
		},
		methods: {
			viewClick:function(e){
			this.selectIndex = e;
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
					console.log(e.date.toString().substring(0,3));
					//console.log(this.Week);
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
			
				}
			},
			ticketDetail(){
				uni.navigateTo({
					url:"scheduleDetails"
				})
			},
		}
	}
</script>

<style lang="scss">
	.myView {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}

	.headerClass {
		width: 100%;
		background: #F8F8F8;
		height: 109upx;
		padding-left: 10upx;
		margin-bottom: 10upx;
		display: flex;
	}

	.scrollClass {
		height: 109upx;
		width: 640upx;
		white-space: nowrap;//外层写这俩
		flex-wrap:nowrap ;
	}

	.blockClass {
		margin: 12upx 14upx;
		//background: #FFFFFF;
		width: 87upx;
		height: 84upx;
		border-radius: 8upx;
		display: inline-block;//里层写这个
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
	.viewPress{
		background: #DD524D;
		.weekClass{ color: #FFFFFF;}
		.dateClass { color: #FFFFFF; }
	}
	.calendarImage{
		width: 35upx;
		height: 37upx;
		margin-left: 34upx;
		margin-right: 34upx;
		margin-top: 33upx;
		margin-bottom: 33upx;
	}
	//车票块
	.ticketClass{
		width: 100%;
		height: 176upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		background: #FFFFFF;
		display: flex;
	}
	//车票类型
	.ticketSortImage{
		margin-top: 0;
		margin-left: 0;
		width: 95upx;
		height: 94upx;
		position: absolute;
	}
	//时间块
	.ticketTimeCLass{
		text-align: center;
		width: 269upx;
	}
	.timeClass{
		display: block;
		margin-top: 27upx;
		font-size: 34upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #333333;
		text-align: center;
	}
	.estimatedTimeClass{
		display: block;
		margin-top: 11upx;
		font-size: 24upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #999999;
		text-align: center;
	}
	.ticketStationClass{
		margin-left: 32upx;
		height: 100%;
		text-align: left;
	}
	.startClass{
		margin-top: 24upx;
		display: block;
		font-size: 30upx;
		font-family: MicrosoftYaHei;
		font-weight: 500;
		color: #333333;
		//text-align: left;
	}
	.endClass{
		margin-top: 12upx;
		display: block;
		font-size: 30upx;
		font-family: MicrosoftYaHei;
		font-weight: 500;
		color: #333333;
		//text-align: left;
	}
	.carTypeClass{
		display: block;
		margin-top: 8upx;
		font-size: 24upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #999999;
		//text-align: left;
	}
	.priceBlockClass{
		width: 122upx;
		text-align: center;
		position: absolute;
		right: 0;
	}
	.priceClass{
		display: block;
		margin-top: 26upx;
		font-size: 34upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #FC4646;
		
	}
	.ticketCountClass{
		display: block;
		margin-top:10upx ;
		font-size: 24upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #999999;
	}
</style>
