<template>
	<view class="ho_view">
		<!-- 照片背景图 -->
		<view>
			<image class="ho_imageTop" src="../../../static/BCFW/home/guanggao.png" mode="aspectFill"></image>
		</view>
		
		<!-- 专线/定制 -->
		<view class="ho_queryTickets">
			<view class="qt_typePickerView">
				<view class="qt_typePicker" :class="{'qt_typePickerClick':normalPickerNum == 1}"
				 style="border-top-right-radius: 0;" @tap="typeSelect('normal')">专线</view>
				<view class="qt_typePicker" :class="{'qt_typePickerClick':specialPickerNum == 1}" 
				style="border-top-left-radius: 0;" @tap="typeSelect('special')">定制</view>
			</view>
			
			<view class="ho_ticketView">
				
				<!-- 选择专线 -->
				<view class="tv_dedicatedLine">
					<view class="dl_choice">专线选择</view>
					<view class="dl_choiceAddress">
						<text class="ca_text1" @tap="startStationTap">{{privateSite}}</text>
						<!-- 嵌套弹框 -->
						<text class="ca_text2" @click="open">专线须知 ></text>
						<uni-popup ref="popup" type="bottom">
							<view class="te_boxVlew">
								<view class="bv_titleView">
									<text class="tv_text1">专线须知</text>
									<text class="tv_text2 jdticon icon-fork " @click="close(1)"></text>
								</view>
								<scroll-view class="bv_content" scroll-y="ture">
									<view class="ct_noticeText">
										<rich-text :nodes="noticeContent.way"></rich-text>
									</view>
								</scroll-view>
							</view>
						</uni-popup>
					</view>
					
					<!-- 出发时间 -->
					<view class="dl_selectionTime">选择时间</view>
					<view class="dl_time">
						<text style="letter-spacing:1px" @click="onShowDatePicker('datetime')">{{datestring}}    {{Week}}</text>
					</view>
					<mx-date-picker :show="showPicker" :showSeconds="false" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" 
					:show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
					
					<!-- 上车点 -->
					<view class="dl_selectionTime">上车点</view>
					<view class="dl_boardingPoint">
						<text class="bp_text" @click="boardingPointTap" v-model="initialPoint">{{initialPoint}}</text>
						<text class="bp_text2">仅限专线发车点市内</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "../../../components/LYFW/scenicSpotTickets/uni-popup/uni-popup.vue"
	import MxDatePicker from "../../../components/BCFW/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
			MxDatePicker,
		},
		data() {
			return {
				normalPickerNum:1,
				specialPickerNum:0,
				index:0,//指数
				privateSite:'',//专线
				noticeContent:'',//须知内容
				datestring:'',//当前日期和时间字符串
				showPicker: false,
				type: 'rangetime',
				value:'',
				Week: '',//周期
				initialPoint:'',//上车点
				initialPoint: '',//起始点
				endLonLat: "", //目的地经度
				startlongitude: "", //出发点纬度
				startlatitude: "", //出发点纬度
			}
		},
		onLoad() {
			var that = this;
			if(that.privateSite == '') {
				that.privateSite = '请选择专线'
			}
			if(that.initialPoint == ''){
				that.initialPoint = '请选择上车点'
			}
			that.routeInit();
			that.getTodayDate();
		},
		methods: {
			//---------------------------------模拟接口数据---------------------------------
			async routeInit() {
				let noticeContent = await this.$api.lyfwcwd('noticeContent');
				this.noticeContent = noticeContent.data;
			},
			
			//---------------------------------点击起点站---------------------------------
			startStationTap(){
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
				    // data即为传过来的值，给上车点赋值
					that.privateSite = data.data;
				    //清除监听，不清除会消耗资源
				    uni.$off('startstaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是专线点
					url:'./ho_choice?&station=' + 'dedicatedLine'
				})
			},
			
			//---------------------------------点击上车点---------------------------------
			boardingPointTap(){
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
				
				
				// var that = this;
				// //监听事件,监听下个页面返回的值
				// uni.$on('startstaionChange', function(data) {
				//     // data即为传过来的值，给上车点赋值
				// 	that.boardingPoint = data.data;
				//     //清除监听，不清除会消耗资源
				//     uni.$off('startstaionChange');
				// });
				// uni.navigateTo({
				// 	//跳转到下个页面的时候加个字段，判断当前点击的是上车点
				// 	url:"./MapIndex?name=" + name
				// })
			},
			
			//------------------------------查看景点按钮弹框事件-----------------------------
			
			open() {
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open()
			},
			
			close(e) {
				if (e == 1) {
					this.$refs.popup.close()
				}
			},
			
			//---------------------------------获取当前日期---------------------------------
			getTodayDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours();
				var minutes = date.getMinutes();
			    var timer = year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + minutes;
				this.datestring = timer;
			},
			
			//---------------------------------时间日期---------------------------------
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value;
					this.datestring = this[this.type];
					this.queryWeek(e.date.toString().substring(0,3));
					//选择的值
					console.log('value => '+ e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
					this.date = e.value;
				}
			},
			//周期
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
			//---------------------------------点击选择类型---------------------------------
			typeSelect(type) {
				if (type == 'normal') {//点击了普通购票
					this.normalPickerNum = 1;
					this.specialPickerNum = 0;
					this.isNormal = 0;//当前是普通购票
				}else if (type == 'special') {//点击了定制班车
					this.normalPickerNum = 0;
					this.specialPickerNum = 1;
					this.isNormal = 1;//当前是定制班车
				}
			},
		}
	}
</script>

<style lang="scss">
	page,
	.ho_view {
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}
	
	// 背景图片
	.ho_imageTop {
		width: 100%;
		height: 390upx;
	}
	
	//查询车票整块
	.ho_queryTickets {
		// background: #FFFFFF;
		// height: 466upx;
		width: 706upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		margin: 0 auto; //左右边距自适应
		position: relative;
		top: -90upx;
		border-radius: 20upx;
	}
	
	//选择车票类型 专线/定制
	.qt_typePickerView {
		width: 100%;
		height: 80rpx;
		display: flex;
	}
	
	//专线/定制
	.qt_typePicker {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		width: 353rpx;
		font-size: 30rpx;
		background-color: #393939;
		color: #FFFFFF;
		opacity: 0.8;
	}
	
	//专线/定制 点击
	.qt_typePickerClick {
		opacity: 1;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		width: 353rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
		color: #000000;
	}
	
	.ho_ticketView{
		background-color: #FFFFFF;
		border-radius: 20rpx;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	
	//选择专线
	.tv_dedicatedLine{
		padding: 0 40upx;
		
		.dl_choice{
			display: flex;
			font-size: 32upx;
			color: #5E5E60;
			padding-top: 41upx;
		}
		.dl_choiceAddress{
			display: block;
			padding-top: 39upx;
			padding-bottom: 41upx;
			border-bottom: 1px #F5F5F5 dotted;//虚线
			
			.ca_text1{
				font-size: 38upx;
			}
			.ca_text2{
				z-index: 999;
				float: right;
				font-size: 28upx;
				color:rgba(25,160,255,1);
				padding-top: 7upx;
			}
			
			//弹框样式
			.te_boxVlew{
				width: 90%;
				padding: 16upx 40upx;
				padding-bottom: 92upx;
				background: #FFFFFF;
				
				.bv_titleView{
					margin: 24upx 0;
					
					//弹框标题
					.tv_text1{
						position: relative;
						font-size: 38upx;
						font-weight: bold;
						top: 8upx;
						margin-bottom: 16upx;
					}
					
					.tv_text2{
						margin-top: 8upx;
						float: right;
						color: #333;
						font-size: 32upx;
					}
				}
				
				.bv_content{
					height: 800upx;
					line-height: 32upx;
					
					.ct_noticeText{
						color: #5E5E60;
						text-align: justify;
						line-height: 64upx;
						margin: 32upx 0;
						font-size: 30upx;
					}
				}
			}
		}
		
		//选择时间样式
		.dl_selectionTime{
			font-size: 32upx;
			color: #5E5E60;
			padding-top: 41upx;
		}
		.dl_time{
			font-size:32upx;
			border-bottom: 1px #F5F5F5 dotted;//虚线
			padding: 39upx 0 40upx 0;
		}
		
		.dl_boardingPoint{
			padding: 33upx 0 42upx 0;
			.bp_text{
				font-size:38upx;
			}
			.bp_text2{
				float: right;
				font-size: 28upx;
				color:rgba(25,160,255,1);
				padding-top: 7upx;
			}
		}
	}
</style>
