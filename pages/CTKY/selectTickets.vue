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
			</scroll-view>
			<view>
				<image src="../../static/CTKY/calendar.png" class="calendarImage" @click="onShowDatePicker('date')"></image>
			</view>
			<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
			 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		</view>
		<view class="ctky_View" v-for="(item,index) in 2" :key="index" @click="ticketDetail">
			<view class="ctky_View_Left">
				<view style="display: flex;align-items: center;margin:20upx 25upx;">
					<view style="width:65upx ;height: 37upx;border-radius: 14upx; border:#1EA2FF  solid 1px;text-align: center;align-items: center;color:#1EA2FF 
					;font-size: 24upx;font-family: SourceHanSansSC-Light;">传统</view>
				    <view style="margin-left:19upx ;font-family: SourceHanSansSC-Bold;font-weight: bold;">15:05</view>
				</view>
				<!-- <view style="margin:28upx 25upx;font-style: SourceHanSansSC-Regular; font-size:36upx ;color: #2C2D2D;padding: 0;">传统班车</view> -->
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
				font-size: 28upx;color: #666666;">大型高一/约1-2小时/儿童半票</view>
			</view>
			<view class="ctky_View_Right">
				<view>
					<view style="margin-right: 28upx;font-size: 36upx;font-style:
		           SourceHanSansSC-Regular; color: #FC4646;">￥28</view>
					<view style="margin-right: 28upx;margin-top: 20upx;font-size: 24upx;font-style:
		           SourceHanSansSC-Light; color: #666666;">余18张</view>
				</view>
			</view>
		</view>
		<view class="ctky_View" v-for="(item,index) in 2" :key="index" @click="ticketDetail">
			<view class="ctky_View_Left">
				<view style="display: flex;align-items: center;margin:20upx 25upx;">
					<view style="width:65upx ;height: 37upx;border-radius: 14upx; border:#FF5A00  solid 1px;text-align: center;align-items: center;color:#FF5A00 
					;font-size: 24upx;font-family: SourceHanSansSC-Light;">定制</view>
				    <view style="margin-left:19upx ;font-family: SourceHanSansSC-Bold;font-weight: bold;">15:05</view>
				</view>
				<!-- <view style="margin:28upx 25upx;font-style: SourceHanSansSC-Regular; font-size:36upx ;color: #2C2D2D;padding: 0;">传统班车</view> -->
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
		background: #FFFFFF;
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
	
	.ctky_View {
		width: 706upx;
		background: #FFFFFF;
		margin: 16upx 22upx;
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
