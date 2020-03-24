<template>
<view class="myView">
		<view>
			<image src="../../static/CTKY/background.png" class="imageTop" mode="aspectFill"></image>
			<!-- <image src="../../static/index/左-箭头.png" class="imageReturn"></image> -->
		</view>
		<view class="queryTickets">
			<view class="lineClass">
				<input class="start" v-model="departure" />
				<image src="../../static/CTKY/change.png" mode="aspectFill" class="changeImage" @click="changeClick"></image>
				<input class="end" v-model="destination" />
			</view>
			<view class="lineClass">
				<view style="border-bottom: 1upx solid #dadada;width: 100%;">
					<text @click="onShowDatePicker('date')" class="dateClass">{{datestring}}    {{Week}}</text>
				</view>
			</view>
			<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
			 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
			<view class="queryView">
				<button class="queryButton" @click="queryClick">查 询</button>
			</view>
			<view class="historyView">
				<label class="historyText" v-for="(i,index) in historyLines" :key=index v-if="index<3">{{i}}</label>
				<label class="clearHistory" @click="clickHistory">清除历史</label>
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
				title: 'Hello',
				departure: '泉州',
				destination: '厦门',
				changeText: '',
				type: 'rangetime',
				value: '',
				showPicker: false,
				date: '2019/01/01',
				historyLines: ['泉州-厦门', '泰宁-石家庄', '福州-婺源', '上海-绍兴'],
				datestring: '',
				Week: '',
			}
		},
		onLoad() {
			this.datestring = this.date.split('/')[1] + "月" + this.date.split('/')[2] + "日";
		},
		methods: {
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];

			},
			//互换起止地址
			changeClick: function() {;
				this.changeText = this.departure;
				this.departure = this.destination;
				this.destination = this.changeText;
			},
			//清除历史
			clickHistory: function() {
				this.historyLines = [];
			},
			//查询
			queryClick: function() {
				this.historyLines.unshift(this.departure + "-" + this.destination);
				//页面传参通过地址后面添加参数
				var params='./selectTickets?lineName='+this.departure + "-" + this.destination;
				uni.navigateTo({ 
					url:params
				})
				
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					//this[this.type] = e.value;

					this[this.type] = e.value.split('/')[1] + "月" + e.value.split('/')[2] + "日";
					this.datestring = this[this.type];
					this.queryWeek(e.date.toString().substring(0,3));
					console.log(this[this.type]);
					console.log(e.date.toString().substring(0,3));
					console.log(this.Week);
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);

				}
			},
			queryWeek(e) {
				console.log(e);
				switch (e) {
					case "Mon":
						this.Week='周一';
						break;
					case "Tue":
						this.Week="周二";
						break;
					case "Wed":
						this.Week="周三";
						break;
					case "Thu":
						this.Week="周四";
						break;
					case "Fri":
						this.Week="周五";
						break;
					case "Sat":
						this.Week="周六";
						break;
					case "Sun":
						this.Week="周日";
						break;
					default:
						break;
				}
			},
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

	.imageTop {
		width: 100%;
		height: 390upx;
	}

	.imageReturn {
		width: 56upx;
		height: 56upx;
		position: absolute;
		top: 58upx;
		left: 32upx;
	}

	//查询车票整块
	.queryTickets {
		background: #FFFFFF;
		height: 466upx;
		width: 706upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		margin: 0 auto; //左右边距自适应
		position: relative;
		top: -38upx;
		border-radius: 20upx;
	}

	//选择起始点
	.lineClass {
		display: flex;
		height: 125upx;
		padding-left: 50upx;
		padding-right: 50upx;

	}

	//转换图片
	.changeImage {

		width: 57upx;
		height: 59upx;
		padding-top: 44upx;
		margin: 0 auto;

	}

	//出发点
	.start {
		font-size: 36upx;
		font-family: MicrosoftYaHei;
		font-weight: bold;
		color: #2C2D2D;
		width: 234upx;
		height: 125upx;
		left: 0;
		text-align: left;
		border-bottom: 1upx solid #dadada;
	}

	//目的点
	.end {
		font-size: 36upx;
		font-family: MicrosoftYaHei;
		font-weight: bold;
		color: #2C2D2D;
		width: 234upx;
		height: 125upx;
		text-align: right;
		right: 0;
		border-bottom: 1upx solid #dadada;
	}

	//选择日期
	.dateClass {
		font-size: 32upx;
		font-family: MicrosoftYaHei;
		font-weight: bold;
		width: 213upx;
		height: 32upx;
		line-height: 125upx;

	}

	//查询视图
	.queryView {
		margin-top: 43upx;
		margin-left: 29upx;
		margin-right: 29upx;
	}

	//查询
	.queryButton {
		width: 100%;
		height: 96upx;
		background: #FC4646;
		color: #FFFFFF;
		font-size: 38upx;
		border-radius: 10upx;

	}

	.historyView {
		padding-top: 29upx;
		padding-bottom: 29upx;
		padding-left: 36upx;
		padding-right: 36upx;
		font-size: 24upx;
		color: #999999;
		font-family: MicrosoftYaHei;
	}

	.historyText {
		margin-right: 50upx;
	}

	.clearHistory {
		float: right;
	}

	//通用view上下外边距10upx
	.commonView {
		display: flex;
		margin-top: 20upx;
		padding: 30upx 32upx;
		position: relative;
		top: -38upx;
		background: #FFFFFF;
	}

	.ticketGuideImage {
		width: 113upx;
		height: 100upx;
	}

	.ticketGuideTextView {
		padding-left: 30upx;
	}

	.ticketGuideButton {
		font-size: 24upx;
		color: #999999;
		margin-top: 22upx;
		margin-bottom: 22upx;
		margin-right: 0;
		border-radius: 40upx;
		border: 1upx solid #999999;
	}

	//随机立减、拼团、客服、投诉整块的view
	.specialView {
		margin-top: 20upx;
		padding: 20upx 32upx;
		position: relative;
		top: -38upx;
		background: #FFFFFF;
		display: block;
	}

	//底下四块内容的每块的view
	.blockView {
		width: 343upx;
		//height: 103upx;
		display: flex;
		padding-top: 20upx;
		padding-bottom: 20upx;
		position: relative;
	}

	//块内的图片
	.blockViewImage {
		margin: 0 auto;
		margin-top: 10upx;
		position: absolute;
		right: 18upx;
	}
</style>
