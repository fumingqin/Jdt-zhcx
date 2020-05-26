<template>
	<view>

		<!-- tabs点击切换栏 -->
		<view class="tabsBox">
			<QSTabs :current="current" :tabs="tabs" minWidth="80" @change="change($event)" />
		</view>
		<view v-if="current === 0" style="margin-top: 20rpx;">
		<view v-for="(item,index) in info" :key="index">
			<view v-if="item.print_type=='已提交'||item.print_type=='审核中'">
				<view class="cm_view" @click="details(item.Print_number)">
					<view class="cm_contentView">
						<view style="display: flex;">
							<view>
								<image class="cm_print" :src="item.oneImg"></image>
							</view>
							<view style="margin-left:10upx; width: 360upx;height: 100upx;">
							<view class="cm_contentText2">{{item.printRoute}}</view>		
									<view class="cm_contentText">{{item.printSite}}</view>									
							</view>
							<view class="cm_contentText3">
								<view >{{item.print_type}}</view>	
							</view>		
						</view>					
					</view>			
				</view>
			</view>
		</view>
		</view>
		<view v-if="current === 1" style="margin-top: 20rpx; ">
			<view v-for="(item,index) in info" :key="index">
	<view v-if="item.print_type=='已通过'">
		<view class="cm_view" @click="details(item.Print_number)">
			<view class="cm_contentView">
				<view style="display: flex;">
					<view>
						<image class="cm_print" :src="item.oneImg"></image>
					</view>
					<view style="margin-left:10upx; width: 360upx;height: 100upx;">
					<view class="cm_contentText2">{{item.printRoute}}</view>		
							<view class="cm_contentText">{{item.printSite}}</view>									
					</view>
					<view class="cm_contentText3">
						<view >{{item.print_type}}</view>	
					</view>		
				</view>
				
									
			</view>			
		</view>
	</view>
			</view>
		</view>
		<view v-if="current === 2" style="margin-top: 20rpx;">
		<view v-for="(item,index) in info" :key="index">
			<view v-if="item.print_type=='未通过'" >
				<view class="cm_view" @click="details(item.Print_number)">
					<view class="cm_contentView">
						<view style="display: flex;">
							<view>
								<image class="cm_print" :src="item.oneImg"></image>
							</view>
							<view style="margin-left:10upx; width: 360upx;height: 100upx;">
							<view class="cm_contentText2">{{item.printRoute}}</view>		
									<view class="cm_contentText">{{item.printSite}}</view>									
							</view>
							<view class="cm_contentText3">
								<view >{{item.print_type}}</view>	
							</view>		
						</view>								
					</view>			
				</view>
			</view>
			</view>
		</view>	
		<view class="ci_affirmView">
			<view class="av_atOnceView" @click="submitState">
				<view class="aov_atOnce">去提交</view>
			</view>
		</view>		
		</view>
</template>

<script>
	import QSTabs from '@/pages_GRZX/components/GRZX/independentTravel/QS-tabs/QS-tabs.vue';
	import $print from "@/common/print.js"
	export default {
		components: {
			QSTabs
		},
		data() {
			return {
				current:0,
				tabs: ['当前提交', '已通过','未通过'], //选项标题
				info: [],
				finishArr: [],
				goingArr: [],
			}
		},

		onLoad() {
			this.getArrayInfo();
		},


		methods: {
			// async getlist(){
			//      let array = await this.$api.PL('ArrayInfo');
			//      this.info = array.data;
			// 	 console.log(this.info);
			//     },
			// 	change(e) {
			// 			this.current = e;	
			// 	},
			getArrayInfo: function() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						uni.request({
							url:$print.Interface.spt_RequestTicketsList.value,
							method:$print.Interface.spt_RequestTicketsList.method,
							data: {
								userId: this.userInfo.userId
							},
			
							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								console.log(res);
								if (res.data.msg == '获取成功') {
									for (var i = 0; i < res.data.data.length; i++) {
											that.info.push(res.data.data[i]);		
									}
								}
							}
						})
					},
					fail() {
						//请求数据失败，停止刷新
						uni.stopPullDownRefresh();
						uni.showToast({
							title: '暂无数据，请先登录后查看',
							icon: 'none',
							success: function() {
								uni.redirectTo({
									url: '../GRZX/userLogin?loginType=1&&urlData=2'
								})
							}
						})
					}
				})
			},
			details(e){
				console.log(e);
				uni.navigateTo({
					url: 'printDetails?print_number='+e
				})
				},
				submitState(){
				uni.navigateTo({
					url: 'printSubmit'
				})	
				}
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}


	//tabs点击
	.tabsBox {
		position: sticky;
		top: 0;
	}
	.pd_view {
		width: 400upx;
		margin: 40rpx 28rpx;
		margin-bottom: 0upx;
		border-radius: 32rpx;
		background: #06B4FD;
		text-align: center;
		// padding: 16upx 0;
		font-size: 25upx;
		color: #FFFFFF;
	}
	.cm_view {
		margin: 0rpx 28rpx;
		margin: 24upx;
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 20rpx 16upx;
		padding-bottom:12upx;
		
	
		.cm_titleView {
			position: relative;
	
			.cm_icon {
				position: relative;
				top: 4upx;
				width: 34upx;
				height: 38upx;
			}
	
			.cm_title {
				margin-left: 24upx;
			}
	
			.cm_status {
				position: absolute;
				right: 0;
				font-size: 30upx;
				top: 6upx;
			}
		}
	
		//内容区
		.cm_contentView {
			position: relative;
			margin: 14upx 0;
			// display: flex;
			
			.cm_print{
				width:200upx;
				height:200upx;
				border-radius: 24upx;
			}
	
	
			.cm_contentText {
				display: block;
				margin-left: 24upx;
				margin-top: 20upx;
				font-size: 28upx;
				color: #2C2D2D;
			}
			.cm_contentText2 {
				display: block;
				margin-left: 24upx;
				font-weight: 400;
				font-size: 32upx;
				color: #2C2D2D;
			}
			.cm_contentText3 {
				margin-top: 160upx;
				margin-left: 20upx;
				font-size: 24upx;
				color: #2C2D2D;
			}
		}
	}
	.ci_affirmView {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
	
	
		.av_atOnceView {
			width: 310upx;
			height: 80upx;
			background: #FC4B4B;
			border-radius: 20upx;
			margin-left: 200upx;
		}
	
		.aov_atOnce {
			font-size: 34upx;
			color: #FFFFFF;
			font-weight: 400;
			padding-top: 20upx;
			padding-left: 110upx;
		}
	}
</style>
