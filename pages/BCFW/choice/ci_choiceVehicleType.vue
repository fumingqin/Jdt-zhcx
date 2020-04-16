<template>
	<view>
		<!-- 红色背底 -->
		<view class="cvt_background"></view>
		<!-- 出发内容 -->
		<view class="cvt_content">
			<view class="ct_departureContents1">
				<view class="ct_content1">出发地 &nbsp;<text class="ct_content2">{{addressContent.address}}</text></view>
				<view class="ct_content3">目的地 &nbsp;<text class="ct_content4">{{addressContent.destination}}</text></view>
			</view>
			<view class="ct_departureContents2">
				<view class="ct_content5">出发时间 &nbsp;<text class="ct_content6">{{addressContent.time}}</text></view>
				<view class="ct_content7">包车天数 &nbsp;<text class="ct_content8">{{addressContent.day}}</text></view>
			</view>
		</view>
		<!-- 车型选择 -->
		<view class="cvt_vehicleSelection">
			<view class="vs_topContent">
				<text class="tc_text1">车型选择</text>
				<view class="tc_text2">
					<image class="tc_image" src="../../../static/BCFW/choice/zhuyi.png" style="wbackground-color: rgba(231,231,231,0.53);width: 40upx;height: 40upx;"></image>
					<text class="tc_text3" @click="open">价格说明</text>
					<uni-popup ref="popup" type="bottom">
						<view class="te_boxVlew">
							<view class="bv_titleView">
								<text class="tv_text1">专线须知</text>
								<text class="tv_text2 jdticon icon-fork " @click="close(1)"></text>
							</view>
							<scroll-view class="bv_content" scroll-y="ture">
								<view v-for="(item,index) in priceExplain" :key="index">
									<text class="ct_text">{{item.title}}</text>
									<view class="ct_noticeText">
										<rich-text :nodes="item.way"></rich-text>
									</view>
								</view>
							</scroll-view>
						</view>
					</uni-popup>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "../../../components/LYFW/scenicSpotTickets/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup,//加载多方弹框组件
		},
		data() {
			return {
				addressContent:[],//地址内容
				priceExplain:[],//价格须知
			}
		},
		onLoad() {
			this.routeInit();
		},
		methods: {
			//---------------------------------模拟接口数据---------------------------------
			async routeInit() {
				let choiceVehicle = await this.$api.lyfwcwd('choiceVehicle');
				this.addressContent = choiceVehicle.data;
				let priceExplain = await this.$api.lyfwcwd('priceExplain');
				this.priceExplain = priceExplain.data;
			},
			
			//------------------------------弹框事件-----------------------------------------
			
			open() {
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open()
			},
			
			close(e) {
				if (e == 1) {
					this.$refs.popup.close()
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
	
	//红色背景
	.cvt_background{
		text-align: center;
		width:100%;
		height:253upx;
		background:rgba(252,70,70,1);
		padding-top: 34upx;
	}
	
	//出发内容
	.cvt_content{
		position: absolute;
		top: 197upx;
		width: 698upx;
		margin:0 26upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);
		border-radius:13px;
		
		//内容样式
		.ct_departureContents1{
			display: flex;
			padding-top: 40upx;
			padding-left: 40upx;
			.ct_content1{
				color:rgba(102,102,102,1);
				font-size: 30upx;
				width: 320upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				.ct_content2{
					width: 200upx;
					font-size: 30upx;
					color:rgba(44,45,45,1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
			.ct_content3{
				color:rgba(102,102,102,1);
				font-size: 30upx;
				width: 240upx;
				padding-left: 68upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				.ct_content4{
					width: 200upx;
					font-size: 30upx;
					color:rgba(44,45,45,1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
		}
		//内容样式
		.ct_departureContents2{
			display: flex;
			padding-top: 40upx;
			padding-left: 40upx;
			padding-bottom: 40upx;
			.ct_content5{
				color:rgba(102,102,102,1);
				font-size: 30upx;
				width: 320upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				.ct_content6{
					width: 200upx;
					font-size: 30upx;
					color:rgba(44,45,45,1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
			.ct_content7{
				color:rgba(102,102,102,1);
				font-size: 30upx;
				width: 225upx;
				padding-left: 68upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				.ct_content8{
					width: 200upx;
					font-size: 30upx;
					color:rgba(44,45,45,1);
					margin-left: 15upx;
					font-weight: bold;
				}
			}
		}
	}
	
	//车型选择样式
	.cvt_vehicleSelection{
		width: 698upx;
		margin:135upx 26upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);
		border-radius:13px;
		
		.vs_topContent{
			position: relative;
			display: flex;
			padding: 31upx 41upx 0 41upx;
			.tc_text1{
				font-size: 32upx;
				font-weight: bold;
			}
		}
		
		.tc_text2{
			position: absolute;
			display: flex;
			right: 41upx;
			.tc_text3{
				font-size: 28upx;
				color: rgba(153,153,153,1);
			}
			//弹框样式
			.te_boxVlew {
				width: 87%;
				padding: 16upx 51upx;
				padding-bottom: 92upx;
				background: #FFFFFF;
				border-radius: 30rpx;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			
				.bv_titleView {
					margin: 24upx 0;
			
					//弹框标题
					.tv_text1 {
						position: relative;
						font-size: 38upx;
						font-weight: bold;
						top: 8upx;
						margin-bottom: 16upx;
					}
			
					.tv_text2 {
						margin-top: 8upx;
						float: right;
						color: #333;
						font-size: 32upx;
					}
				}
			
				.bv_content {
					height: 800upx;
					line-height: 32upx;
					
					.ct_text{
						display: flex;
						margin-top: 26upx;
						font-size:32upx;
						font-weight: bold;
					}
					
					.ct_noticeText {
						color: #5E5E60;
						text-align: justify;
						line-height: 64upx;
						margin-top: 28upx;
						font-size: 28upx;
					}
				}
			}
		}
	}
</style>
