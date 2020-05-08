<template>
	<view>
		<!-- 班车信息 -->
		<view class="ctky_View" :class="{ctky_ViewBorder : index==statusIndex}"  v-for="(item,index) in departureData" :key="index" @click="selection(index)" >
			<view class="ctky_View_Left">
				<view style="display: flex;align-items: center;margin:20upx 25upx;">
					<view class="markType" style="border:#1EA2FF solid 1px;color:#1EA2FF;" >景区</view>
					<view style="margin-left:19upx ;font-family: SourceHanSansSC-Bold;font-weight: bold;">2020-05-09 09:00</view>
				</view>
				<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
					<image src="../../../../static/CTKY/startDot.png" style="width: 10upx ;height: 10upx;"></image>
					<view style="margin-left: 16upx; font-size: 30upx;font-style:SourceHanSansSC-Regular ;color: #333333;">泉州客运中心站</view>
				</view>
				<view style="margin-left: 25upx;display: flex;align-items: center;margin-bottom: 16upx;">
					<image src="../../../../static/CTKY/endDot.png" style="width: 10upx ;height: 10upx;"></image>
					<view style="margin-left: 16upx;font-size: 30upx;font-style:SourceHanSansSC-Regular ;color: #333333;">安溪清水岩</view>
				</view>
				<view style="margin-left: 25upx;margin-bottom: 20upx;font-style: SourceHanSansSC-Light;font-weight: lighter;font-size: 28upx;color: #666666;">{{item.carType}}/约{{item.duration}}分钟/儿童半票</view>
			</view>
			<view class="ctky_View_Right">
				<view>
					<view style="margin-right: 28upx;margin-top: 20upx;font-size: 24upx;font-style:SourceHanSansSC-Light; color: #666666;">余20座</view>
				</view>
			</view>
		</view>
		
		<view class="MP_information3" @click="paymentSatas">
			支付{{orderInfo.orderActualPayment}}元
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusIndex : '', //选中状态值
				departureData :['','']
			}
		},
		methods: {
			selection:function(e){
				this.statusIndex = e;
			}
		}
	}
</script>

<style lang="scss">
	.ctky_View {
		width: 94%;
		background: #FFFFFF;
		margin: 16upx 3%;
		border-radius: 20upx;
		display: flex;
		justify-content: space-between;
		&.ctky_ViewBorder{
			border: 4upx solid #06B4FD;
		}
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
	
	.MP_information3 {
		padding: 24upx 0;
		border-radius: 64upx;
		background: #FF6600;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 80upx;
	}
</style>
