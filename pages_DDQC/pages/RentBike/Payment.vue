<template>
	<view>
		<view style="margin: 0 40rpx;">
			<view style="display: flex;justify-content: center;padding-top: 40rpx;">
				<text style="font-size: 60rpx;font-weight: bold;">￥{{money}}元</text>
			</view>
			<view style="padding-top: 20rpx;">
				<text style="font-size: 32rpx;">骑行时间:{{Time}}</text>
			</view>
			<view style="padding-top: 40rpx;display: flex;justify-content: center;">
				<button style="background:linear-gradient(270deg,rgba(83,175,59,1),rgba(40,204,40,1));width: 670rpx;" @click="payNow">
					<text style="color: #FFF;">{{buttonName}}</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				money: 0,
				beginTime: '',
				endTime: '',
				Time: '',
				orderId: '',
				buttonName:'立即支付',
				payTime:'',
			}
		},
		onLoad() {
			this.getOrderInfo();
		},
		methods: {
			payNow: function() { //立即支付
				if (this.money > 0) {
					this.walletPayment();
				} else {
					this.walletPayment();
					console.log(this.getNowTiem());
					console.log(this.payTime);
					// uni.redirectTo({
					// 	url: "../GRZY/zy_homepage"
					// })
				}
			},
			walletPayment: function() { //钱包支付
				let that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetTransaction.Url,
					method: $DDTInterface.DDTInterface.GetTransaction.method,
					header: {
						'content-type': 'application/json'
					},
					data: {
						phoneNumber: 15106066029,
						orderId: that.orderId,
						amount: (that.money) * 100,
						// amount: 10,
						transTime: that.getNowTiem(), //交易时间
						transType: 1,//1自行车消费，2公交车消费
						extra: '',
						userID: 122,
					},
					success(res) {
						if(res.data.msg==''){
							// that.consumeRecord(1)
						}else if(res.data.msg==''){
							// that.consumeRecord(0)
						}
						console.log(res);
					},
					fail(res) {
						that.consumeRecord(0)
						console.log(res)
					}
				})
			},
			consumeRecord:function(State){//消费记录
				uni.request({
					url: $DDTInterface.DDTInterface.WriteTransactionLog.Url,
					method: $DDTInterface.DDTInterface.WriteTransactionLog.method,
					header: {
						'content-type': 'application/json'
					},
					data:{
						phoneNumber: 15106066029,
						orderId: that.orderId,
						amount: (that.money) * 100,
						transTime: that.payTime, //交易时间
						transType: 1,//1自行车消费，2公交车消费
						extra: '',
						userID: 122,//用户ID
						State:State,
					},
					success() {
						
					},
					fail() {
						
					}
				})
			},
			GetBizStatus: function() { 
				uni.request({
					url: $DDTInterface.DDTInterface.GetBizStatus.Url,
					method: $DDTInterface.DDTInterface.GetBizStatus.method,
					header: {
						'content-type': 'application/json'
					},
					data: {
						loginname: 15106066029,
						userID: 122
					},
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			getNowTiem: function() { //获取当前时间,消费时要用
				var date = new Date();
				var year = date.getFullYear();
				var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				this.payTime=year+month+day+hours+minutes+seconds;
				return year+month+day+hours+minutes+seconds;
			},
			getOrderInfo: function() { //查询最后一条行程信息
				var that = this;
				uni.request({
					url: $DDTInterface.DDTInterface.GetOrder.Url,
					method: $DDTInterface.DDTInterface.GetOrder.method,
					header: {
						'content-type': 'application/json'
					},
					data: {
						phoneNo: 13906963039,
						startIndex: 1,
						retcount: 1,
						userID: 122
					},
					success(res) {
						if (res.data.status) {
							that.beginTime = res.data.data[0].HireAction.Time;
							that.endTime = res.data.data[0].RestoreAction.Time;
							that.money = (res.data.data[0].Money) / 100;
							if(that.money==0){
								that.buttonName='立即完成';
							}
							that.orderId = res.data.data[0].OrderId;
							that.timeConcer(that.beginTime, that.endTime);
						}
						console.log(res)
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			timeConcer: function(value, value2) { //时间转换
				var that = this;
				var value = value.replace(" ", "T")
				var value2 = value2.replace(" ", "T")
				var begindate = new Date(value + "+08:00").getTime();
				var enddate = new Date(value2 + "+08:00").getTime();
				var date = parseInt((enddate - begindate) / 1000);
				if (date > 60) {
					that.Time = that.Timechange(date);
				} else {
					that.Time = date + "秒"
				}
			},
			Timechange: function(time) { //时间转换
				var that = this;
				var date = parseInt(time / 3600 / 24);
				var hours = 0;
				var minutes = 0;
				var seconds = 0;
				if (date >= 1) {
					hours = parseInt((time - date * 24 * 3600) / 3600);
					if (hours >= 1) {
						minutes = Math.ceil((time - date * 24 * 3600 - hours * 3600) / 60);
						if (minutes >= 1) {
							// seconds = time -date*24*3600-  hours * 3600 - minutes * 60
							return date + "天" + hours + "小时" + minutes + "分钟";
						} else {
							return date + "天" + hours + "小时";
							// seconds = time -date*24*3600-  hours * 3600;
						}
					} else {
						minutes = Math.ceil(time / 60);
						if (minutes >= 1) {
							return date + "天" + minutes + "分钟";
							// seconds = time -date*24*3600-minutes * 60
						} else {
							return date + "天";
							// seconds = time-date*24*3600;
						}
					}
				} else {
					hours = parseInt(time / 3600)
					if (hours >= 1) {
						minutes = Math.ceil((time - hours * 3600) / 60);
						if (minutes >= 1) {
							// seconds = time - hours * 3600 - minutes * 60
							return hours + "小时" + minutes + "分钟";
						} else {
							return hours + "小时";
							// seconds = time - hours * 3600;
						}
					} else {
						minutes = Math.ceil(time / 60);
						if (minutes >= 1) {
							return minutes + "分钟";
							// seconds = time - minutes * 60
						} else {
							// seconds = time;
						}
					}
				}
			},
		}
	}
</script>

<style>

</style>
