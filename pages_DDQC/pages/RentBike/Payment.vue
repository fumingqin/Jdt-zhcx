<template>
	<view>
		<view style="margin: 0 40rpx;">
			<view style="display: flex;justify-content: center;padding-top: 40rpx;">
				<text style="font-size: 60rpx;font-weight: bold;">￥0.5元</text>
			</view>
			<view style="padding-top: 20rpx;">
				<text style="font-size: 32rpx;">骑行时间:8分钟</text>
			</view>
			<view style="padding-top: 40rpx;display: flex;justify-content: center;">
				<button style="background:linear-gradient(270deg,rgba(83,175,59,1),rgba(40,204,40,1));width: 670rpx;">
					<text style="color: #FFF;">立即支付</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			walletPayment: function() { //钱包支付
				let that = this;
				uni.request({
					url: "http://111.231.109.113:8004/api/Purse/GetTransaction",
					method: "POST",
					header: {
						'content-type': 'application/json'
					},
					data: {
						phoneNumber: 15106066029,
						orderId: "12552",
						transTime: "20200615113500",
						amount: 10,
						transType: 1,
						extra: '',
						userID: 122,

					},
					success(res) {
						that.jilu(1)
						console.log(res);
					},
					fail(res) {
						that.jilu(0)
						console.log(res)
					}

				})
			},
		}
	}
</script>

<style>

</style>
