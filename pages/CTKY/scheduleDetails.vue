<template>
	<view class="myView">
		<scroll-view scroll-y="true" style="margin-bottom: 112upx;">
			<view class="headerClass">
			</view>
			<view class="orderCommonClass" style="margin-top: -110upx;">
				<view class="ticketInfoClass">
					<view>
						<view class="textCLass" style="font-size: 28upx;color: #333333;display: block;padding: 0;">{{ticketDate}}
							{{ticketDetail.SetTime}}出发</view>
						<view class="textCLass" style="font-size: 32upx;color: #333333;margin-top:21upx ;display: block;padding: 0;">{{ticketDetail.StartStaion}}
							→ {{ticketDetail.EndStation}}</view>
						<view class="textCLass" style="font-size: 24upx;color: #999999; margin-top:18upx ;display: block;padding: 0;">{{ticketDetail.CarType}}
							 儿童半票</view>

					</view>
					<view style="display: flex; flex-direction: column;">
						<view class="textCLass" style="font-size: 34upx;color: #FC4646;">￥{{ticketDetail.Price}}</view>
						<view style="margin-right: 28upx;margin-top: 20upx;font-size: 24upx;font-style:
		       SourceHanSansSC-Light; color: #666666;">余{{ticketDetail.Seat}}张</view>
					</view>
				</view>
			</view>
			<view class="orderCommonClass">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">地图标点</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view @tap="checkLocation" style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">查看班次信息</view>
					<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view>
			</view>
			<view style="flex-direction: column;background: #FFFFFF;margin: 0 26upx; 
		margin-bottom: 20upx;border-radius: 14upx;">
				<view class="boarding" style="border-bottom:#EAEAEA solid 1px ;">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">上车点</view>
					<view style="display: flex;align-items: center;">
						<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">请选择上车点</view>
						<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
				<view class="boarding">
					<view style="margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">下车点</view>
					<view style="display: flex;align-items: center;">
						<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">请选择下车点</view>
						<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
					</view>
				</view>
			</view>
			<view class="orderCommonClass" style="flex-direction: column;padding-bottom: 25upx;">
				<view style="margin-top: 35upx;margin-bottom: 35upx;margin-left: 41upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">乘车人信息</view>
				<view style="display: flex;margin-left: 165upx;margin-right: 165upx;margin-bottom: 35upx;">
					<button style="width: 150upx;height: 66upx;align-items: center;font-size: 28upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">添加</button>
					<button @tap="pickPassenger" style="width: 150upx;height: 66upx;align-items: center;font-size: 28upx; color:#2C2D2D ;text-align: center;background: #FFFFFF;">选择</button>
				</view>
				<view style="flex-direction: column;background: #FFFFFF; " v-for="(items,index) in info" :key=index v-model="info">
					<view class="passengerInfoDetail">
						<view style="display: flex;text-align: center;align-items: center;">
							<view style="width: 73upx;">
								<image src="../../static/CTKY/delete.png" style="width: 34upx;height: 34upx;" @click="deleteInfo(index)"></image>
							</view>
							<view style="height: 100%;">
								<view style="display: flex;margin-top: 18upx;margin-bottom: 18upx;">
									<text style="font-size:32upx ;color: #333333;padding:0;padding-right: 24upx;">{{items.name}}</text>
									<view style="background:#EBEBEB ; font-size:18upx ;border-radius: 24upx;width: 100upx;height: 37upx;line-height:37upx ;text-align: center;">成人票</view>
								</view>
								<view style="display: flex;font-size: 28upx;color:#999999 ;margin-top: 18upx;margin-bottom: 18upx;">
									<text style="margin-right: 20upx;">身份证</text><text>{{items.id}}</text>
								</view>
							</view>
						</view>
						<view>
							<image src="../../static/CTKY/right.png" style="width:12upx ;height: 21upx;"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="orderCommonClass">
				<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">优惠券</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<view style="font-size: 28upx;font-family: SourceHanSansSC-Light;color: #999999;">无可用</view>
					<image src="../../static/CTKY/right.png" style="width: 11upx;height: 21upx;margin-left: 10upx;"></image>
				</view>
			</view>
			<view class="orderCommonClass">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">购买乘车险</view>
					<view style="margin-left: 16upx;color:#FC4B4B ; font-size:30upx ;">2元</view>
				</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<image src="../../static/CTKY/check.png" style="width: 33upx;height: 33upx;margin-left: 10upx;"></image>
				</view>
			</view>
			<view class="orderCommonClass">
				<view style="display: flex; align-items: center;">
					<view style="margin-left: 41upx;margin-top: 35upx;margin-bottom: 35upx;font-size:SourceHanSansSC-Regular ;color: #2C2D2D;font-size: 30upx;">同意购票须知</view>
					<view style="margin-left: 16upx;color:#19A0FF ; font-size:30upx ;">点击查看须知</view>
				</view>
				<view style="display: flex;margin-right: 41upx;align-items: center;">
					<image src="../../static/CTKY/check.png" style="width: 33upx;height: 33upx;margin-left: 10upx;"></image>
				</view>
			</view>
		</scroll-view>
		<view class="toPayClass">
			<view style="display: flex;align-items: center;margin-left: 32upx;">
				<text style="font-size: 38upx;color: #FC4646;padding: 0;">￥30</text>
				<text style="font-size: 28upx;margin-left: 9upx;font-family:SourceHanSansSC-Light ; font-weight: lighter;color: #666666;padding: 0;">共2人</text>
			</view>
			<view style="width: 45%; height: 112upx;color: #FFFFFF;background:#FC4646 ;font-size: 32upx;line-height: 112upx;
			text-align: center;">立即预定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				count: 1,
				info: [{
						name: '小花',
						id: '22555555555555555555'
					},
					{
						name: '小明',
						id: '22555555555555555555'
					},
					{
						name: '小红',
						id: '22555555555555555555'
					}
				],
				 ticketDate:'',
				// ticketSettime:'',
				// ticketPrice:'',
				// ticketCount:'',
				// ticketStart:'',
				// ticketEnd:'',
				// carType:'',
				// ticketType:'',
				ticketDetail: []
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: '填写订单'
			});
			var that = this;
			uni.getStorage({
				key: 'selectedTicket',
				success: function(res) {
					// that.ticketSettime=res.data[0].ticketSettime;
					// that.ticketPrice=res.data[0].ticketPrice;
					// that.ticketCount=res.data[0].ticketCount;
					// that.ticketStart=res.data[0].ticketStart;
					// that.ticketEnd=res.data[0].ticketEnd;
					// that.carType=res.data[0].carType;
					// that.ticketType=res.data[0].ticketType
					that.ticketDetail = res.data;
				}
			});
			uni.getStorage({
				key: 'shiftDate',
				success: function(res) {
                     that.ticketDate=res.data;
				}
			});

		},
		onReady() {

		},
		methods: {
			Add() {

			},
			deleteInfo(e) {
				console.log(e)
				this.info.splice(e, 1)
			},
			//跳转到地图标点
			checkLocation() {
				uni.navigateTo({
					url:'/pages/CTKY/specialMark'
				})
			},
			//选中乘客
			pickPassenger() {
				uni.navigateTo({
					url:'/pages/CTKY/seatSelection'
				})
			}
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
		height: 140upx;
		background: #FC4646;
	}

	.ticketInfoClass {
		height: 181upx;
		width: 652upx;
		text-align: left;
		padding-left: 29upx;
		padding-right: 29upx;
		padding-top: 28upx;
		display: flex;
		justify-content: space-between;
	}

	.textCLass {
		font-family: MicrosoftYaHei;
		font-weight: 400;
		// padding-top: 10upx;
		// padding-bottom: 10upx;
	}


	.passengerInfoDetail {
		border-bottom: 1upx solid #DADADA;
		margin-left: 33upx;
		margin-right: 33upx;
		//position: absolute;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	//取票电话、优惠券、购买乘车险通用块
	.commonClass {
		margin-top: 10upx;
		margin-bottom: 10upx;
		width: 100%;
		height: 110upx;
		padding-left: 31upx;
		padding-right: 31upx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}

	.toPayClass {
		width: 100%;
		height: 112upx;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		z-index: 1010;
		background: #FFFFFF;
		justify-content: space-between;
	}

	//订单提交通用块
	.orderCommonClass {
		background: #FFFFFF;
		border-radius: 14upx;
		margin: 0 26upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: space-between;
	}

	//上下车点
	.boarding {
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 41upx;
		margin-right: 41upx;
	}
</style>
