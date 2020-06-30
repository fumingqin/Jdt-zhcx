<template>
	<view>
		<view class="tr_view">
			<view class="tr_view2" v-for="(item,index) in info" :key="index">
			<image class="tr_image" src="../../static/GRZY/qianbao.png"></image>
			<view>
				<view class="tr_text">达达通助力车充值</view>
				<view class="tr_date">{{fixed(item.CreateTime)}}</view>
			</view>
			<view class="tr_money">￥{{item.Price}}元</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				userId:'',
				info:[],
			}
		},
		onShow() {
			this.getRecord();
		},
		methods: {
			getRecord: function() {
				var that = this;
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						uni.request({
							url: $DDTInterface.DDTInterface.GetRecordByUserID.Url,
							method: $DDTInterface.DDTInterface.GetRecordByUserID.method,
							data: {
								userID:res.data.userId,
							},
							success: (res) => {
								console.log(res)
								if (res.data.msg == '完成') {
									that.info=[];
									let array=res.data.data;
									for(var i=0;i<array.length;i++){			
										if(array[i].Type=='充值'&& array[i].State=='充值成功'){
											that.info.push(array[i])
											}		
									}
										console.log(that.info)
								}
							},
							fail(res) {
								console.log(res)
							}
						})
					}
				})
					
			},
			fixed(e){
				let a=e.split('T');
				let b=a[1].split('.');
				var c=a[0]+' '+b[0];
				return c;
			}
		}
	}
</script>

<style lang="scss">
page {
		background-color: #f6f6f6;
	}
	.tr_view{
		margin-top:30upx;
		margin-bottom: 80upx;
		.tr_view2{
			width: 694upx;
			height: 148upx;
			margin-left: 28upx;
			margin-bottom:30upx;
			background: #FFFFFF;
			display: flex;
		.tr_image{
			width: 84upx;
			height: 84upx;
			padding-top:35upx;
			padding-left: 30upx;
		}
		.tr_text{
			font-size: 30upx;
			font-weight: 400;
			padding-top: 40upx;
			padding-left: 20upx;
		}	
		.tr_money{
			font-size: 32upx;
			font-weight: 400;
			padding-top: 38upx;
			padding-left: 190upx;
			color: #F35A46;
		}	
		.tr_date{
			font-size: 28upx;
			font-weight:300;
			padding-top: 23upx;
			padding-left: 20upx;
		}	
		}
		}

</style>
