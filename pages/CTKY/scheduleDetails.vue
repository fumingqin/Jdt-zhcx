<template>
	<view class="myView">
		<view class="headerClass">
			<view style="background: #FFFFFF;border-radius: 20upx;">
				<view class="ticketInfoClass">
					<view>
						<view class="textCLass" style="font-size: 28upx;color: #333333;display: block;padding: 0;">08月31日 12:30出发</view>
						<view class="textCLass" style="font-size: 32upx;color: #333333;margin-top:21upx ;display: block;padding: 0;">泉州客运中心
							→ 安溪</view>
						<view class="textCLass" style="font-size: 24upx;color: #999999; margin-top:18upx ;display: block;padding: 0;">销售供应商：泉州车联网络科技有限公司</view>

					</view>
					<view style="position:absolute;right:52upx;">
						<view class="textCLass" style="font-size: 34upx;color: #FC4646;">￥28</view>
					</view>
				</view>
				<view class="ticketNotice">
					<view class="textCLass" style="width:163upx ;height: 46; margin-left: 21upx;border-radius: 45upx;background: #FFFFFF;
					text-align: center;color:#FC4646 ;font-size: 25upx;">购票须知</view>
					<view class="textCLass" style="width:223upx ;height: 46; margin-left: 21upx;border-radius: 45upx;background: #FFFFFF;
					text-align: center;color:#FC4646 ;font-size: 25upx;">支持纸质票检票</view>
					<view class="textCLass" style="width:253upx ;height: 46; margin-left: 21upx;border-radius: 45upx;background: #FFFFFF;
					text-align: center;color:#FC4646 ;font-size: 25upx;">发车前120分钟可</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" style="margin-bottom: 120upx;">
			<view class="passengerClass">
				<view style="display: flex; height: 88upx; width: 100%;align-items: center;background: #FFFFFF;">
					<text style="font-size:28upx ;color: #333333;margin-left:32upx ;">乘客</text>
					<text style="font-size:24upx ;color: #999999;margin-left: 18upx;">单笔订单限5张</text>
				</view>
				<view style="display: flex;padding-left: 16upx ; padding-right: 16upx;background: #FFFFFF;text-align: center;">
					<view v-for="(items,index) in info" :key=index>
						<view class="addPassengerClass" style="background-image: url(../../static/index/selectPassenger.png);">
							{{items.name}}
						</view>
					</view>
					<view class="addPassengerClass" style="background-image: url(../../static/index/addPassenger.png);" @click="Add">
						+新增
					</view>
				</view>
				<view style="flex-direction: column;background: #FFFFFF; " v-for="(items,index) in info" :key=index v-model="info">
					<view class="passengerInfoDetail">
						<view style="display: flex;text-align: center;align-items: center;">
							<view style="width: 73upx;">
								<image src="../../static/index/delete.png" style="width: 34upx;height: 34upx;" @click="deleteInfo(index)"></image>
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
							<image src="../../static/index/right.png" style="width:12upx ;height: 21upx;"></image>
						</view>
					</view>

				</view>
				<view style="height: 80upx;line-height:80upx;background: #FFFFFF;">
					<text style="font-size:24upx ;color: #999999;text-align: left;margin-left: 34upx;margin-right: 34upx;">暂不支持儿童票、携童票在线购买</text>
				</view>
			</view>
			<view class="commonClass">
				<text style="width: 184upx;padding: 0;font-size:28upx ;color: #333333;">取票电话</text>
				<view style="display: flex;justify-content: space-between;width: 494upx;align-items: center;">
					<input value="13655044126" style="font-size:28upx ;padding: 0;color: #333333;" />
					<image src="../../static/index/dddressBook.png" style="width: 38upx;height: 41upx;"></image>
				</view>
			</view>
			<view class="commonClass">
				<text style="width: 184upx;padding: 0;font-size:28upx ;color: #333333;">优惠券</text>
				<view style="display: flex;justify-content: space-between;width: 494upx;align-items: center;">
					<text style="font-size:28upx ;color: #999999;padding: 0;">无可用优惠券</text>
					<image src="../../static/index/right.png" style="width: 12upx;height: 21upx;"></image>
				</view>
			</view>
			<view class="commonClass">
				<text style="width: 184upx;padding: 0;font-size:28upx ;color: #333333;">购买乘车险</text>
				<view style="display: flex;justify-content: space-between;width: 494upx;align-items: center;">
					<text value="" style="font-size:28upx ;color: #FC4646;padding: 0;">￥2</text>
					<image src="../../static/index/check.png" style="width: 31upx;height: 31upx;"></image>
				</view>
			</view>
		</scroll-view>
		<view class="toPayClass">
			<view style="width: 419upx;padding-left: 33upx;padding-right: 37upx;display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<text style="font-size: 24upx;color: #333333;padding: 0;">合计</text>
					<text style="font-size: 38upx;color: #FC4646;padding: 0;margin-left: 9upx;">￥30</text>
				</view>
				<view style="display: flex;align-items: center;">
					<text style="font-size: 28upx;color: #999999;padding: 0;">明细</text>
					<image src="../../static/index/top.png" style="width: 22upx;height: 13upx;margin-left: 13upx;"></image>
				</view>
			</view>
			<button style="width: 220upx; height: 78upx;color: #FFFFFF;background:#FC4646 ;font-size: 32upx;
			text-align: center;padding: 0;border-radius: 40upx;">去支付</button>
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
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '泉州→安溪'
			});
		},
		methods: {
			Add() {
 
 
			},
			deleteInfo(e) {
				console.log(e)
				this.info.splice(e, 1)
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
		padding: 21upx 23upx;
		width: 705upx;
		height: 313upx;
		background: #F1F1F1;
		border-radius: 10upx;
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
		padding-top: 10upx;
		padding-bottom: 10upx;
	}

	.ticketNotice {
		background: #FFC6C6;
		width: 705upx;
		height: 110upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #FC4646;
		display: flex;
		align-items: center;
	}

	//乘客信息整块
	.passengerClass {
		width: 100%;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		flex-direction: column;
		margin-bottom: 10upx;
	}

	//添加的乘客名字样式
	.addPassengerClass {
		margin: 0 16upx 18upx;
		background-size: 100% 100%;
		width: 130upx;
		height: 56upx;
		font-size: 26upx;
		color: #FC4646;
		line-height: 56upx;
	}

	.passengerInfoDetail {
		width: 685upx;
		height: 150upx;
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
		height: 120upx;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		z-index: 1010;
		background: #FFFFFF;

	}
</style>
