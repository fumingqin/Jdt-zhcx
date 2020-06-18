<template>
	<view>
		<view class="qc_top">
			<text class="to_text">公交二维码</text>
		</view>
		<view class="qc_bottom">
			<view style=" width: 400rpx;margin: 0 auto;padding-top: 55rpx;">
				<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
			</view>
			<view class="bt_view">
				<text class="vi_text">乘车码自动</text>
				<text class="vi_text2" @click="manuRefresh">刷新</text>
			</view>
		</view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	import uQRCode from '@/pages_DDQC/components/GRZY/uni-qrcode/uqrcode.js';
	export default {
		data() {
			return {
				userInfo: [], //用户信息
				qrcodeText: 'uQRCode',
				qrcodeSize: 200,
				qrcodeSrc: '',
				setTime:'',
				qr:'',
			}
		},
		
		onLoad() {
			var that = this;
			that.autoRefresh();
		},
		
		onShow() {
			var that = this;
			that.getUserInfo();
		},
		
		methods: {
			//--------------------------读取用户信息--------------------------
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						console.log('用户数据', data)
						that.userInfo = data.data;
						that.QRCodeData();
					},
					fail(data) {}
				})
			},
			
			QRCodeData:function(){
				var that = this;
				uni.request({
					url:$DDTInterface.DDTInterface.GetBusCodeGen.Url,
					method:$DDTInterface.DDTInterface.GetBusCodeGen.method,
					data:{
						phoneNumber:13906963039,
						userID:that.userInfo.userId,
					},
					success(res) {
						// uni.hideLoading()
						console.log('二维码',res)
						if(res.data.status == true){
							that.qr=res.data.data.qr;
							that.QRCodeClick(res.data.data.qr);
						}
					},
					fail(res) {
						console.log('获取二维码失败',res)
					}
				})
			},
			
			//---------------------------自动刷新---------------------------
			autoRefresh:function(){
				var that = this;
				uni.showLoading()
				// setTimeout(function(){
				// 	console.log('自动刷新')
				// 	that.QRCodeData();
				// },15000)
			},
			
			QRCodeClick:function(param){
				var that = this;
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})
				
				uQRCode.make({
					canvasId: 'qrcode',
					text: param,
					size: that.qrcodeSize,
					margin: 10,
					success: res => {
						that.qrcodeSrc = res
						// that.setTime = setTimeout(function(){
						// 	that.qrcodeSrc = res
						// },10000)
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			
			//--------------------点击刷新-----------------------
			manuRefresh: function() {
			   let that = this
			   console.log('手动刷新')
			   clearInterval(that.qr)
			   that.QRCodeData()
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background: -webkit-linear-gradient(top,#9cffbb,#35c762);
	}
	
	.qc_top{
		background:#35c762;
		border-top-left-radius: 15upx;
		border-top-right-radius: 15upx;
		width: 684upx;
		height: 100%;
		margin-top: 182upx;
		margin-left: 30upx;
		text-align: center;
		padding: 19upx 0;
		box-shadow: 0px 6px 20px 0px rgba(53, 199, 98, 0.53);
		// margin: 0 auto;
		
		.to_text{
			font-size: 36upx;
			color: #FFFFFF;
			// margin: 0 auto;
		}
	}
	
	.qc_bottom{
		width: 684upx;
		height: 626upx;
		background-color: #FFFFFF;
		margin-left: 30upx;
		box-shadow: 0px 6px 20px 0px rgba(53, 199, 98, 0.53);
		border-bottom-left-radius: 15upx;
		border-bottom-right-radius: 15upx;
		
		.bt_view{
			padding-top: 20upx;
			text-align: center;
			
			.vi_text{
				color: #666666;
				font-size: 28upx;
			}
			
			.vi_text2{
				color: #1ea2ff;
				font-size: 28upx;
			}
		}
	}
</style>
