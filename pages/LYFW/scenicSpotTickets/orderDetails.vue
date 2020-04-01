<template>
	<view>
		<!-- 顶部背景 -->
		<view class="ob_background">
			<image src="../../../static/LYFW/scenicSpotTickets/addOrder/orderBackground.png" mode="aspectFill"></image>
		
		<!-- 顶部信息
		命名：Dx -->
		<view class="Dx_View">
			<text class="Dx_title">预约成功</text>
			<text class="Dx_text">旅途愉快！</text>
			<text class="Dx_priceIcon" @click="open">¥</text>
			<text class="Dx_price" @click="open" >{{orderInfo[0].orderActualPayment}}</text>
			<image class="Dx_image" src="../../../static/LYFW/scenicSpotTickets/orderDetails/gantan.png" @click="open"></image>
			<text class="Dx_remarks">订单编号：{{orderInfo[0].orderNumber}}</text>
		</view>
		</view> 
		
		<!-- 嵌套弹框组件popup -->
		<uni-popup ref="popup" type="bottom">
			<view class="box_Vlew">
			<view class="box_titleView">
				<text class="box_title">费用明细</text>
				<text class="box_icon jdticon icon-fork " @click="close"></text>
			</view>
				<view class="MP_selectionDate">
					<view class="MP_cost" v-if="adultIndex>=1">
						<text>成人票</text>
						<text class="MP_number">×{{adultIndex}}</text>
						<text class="MP_userCost">¥{{adultTotalPrice}}</text>
					</view>
					<view class="MP_cost" v-if="childrenIndex>=1">
						<text>儿童票</text>
						<text class="MP_number">×{{childrenIndex}}</text>
						<text class="MP_userCost">¥{{childrenTotalPrice}}</text>
					</view>
				
					<!-- 保险 -->
					<view class="MP_cost" v-if="orderInfo[0].orderInsure==true">
						<text>太平洋门票意外险 经济款</text>
						<text class="MP_number">×{{orderInfo.length}}</text>
						<text class="MP_total">¥{{orderInfo[0].orderInsurePrice}}</text>
					</view>
				
					<!-- 优惠券 -->
					<view class="MP_cost" v-if="orderInfo[0].couponPrice>0">
						<text>{{orderInfo[0].couponTitle}}</text>
						<text class="MP_number">×1</text>
						<text class="MP_total">-&nbsp;¥{{orderInfo[0].couponPrice}}</text>
					</view>
					
					
					
					<view class="MP_cost">
						<text class="MP_total">共计&nbsp;¥{{orderInfo[0].orderActualPayment}}</text>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 信息详情 -->
		<!-- 命名：Xx -->
		<view class="Xx_view" >
			<view class="Xx_titleView" @click="route">
				<text class="Xx_title">{{orderInfo[0].ticketTitle}}</text>
				<text class="Xx_titleIcon"> > </text>
			</view>
			<view class="Xx_contentView"> 
					<text class="Xx_contentTitle" >门票状态</text>
					<text class="Xx_contentTitle2">{{orderInfo[0].orderType}}</text>
				<view class="Xx_contentBlock">	
					<text class="Xx_contentTitle" >使用日期</text>
					<text class="Xx_contentTitle2">{{orderInfo[0].orderDateReminder}}&nbsp;{{orderInfo[0].orderDate}}&nbsp;当天可用</text>
				</view>
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >入园时间</text>
					<text class="Xx_contentTitle2">{{orderInfo[0].ticketOpenUp}}</text>
				</view>
				<view class="Xx_contentBlock">
					<text class="Xx_contentTitle" >使用方法</text>
					<text class="Xx_contentTitle2">凭身份证或订单二维码扫码入园</text>
				</view>
			
				<!-- 二维码 -->
				<view class="Xx_QRcodeView">
					<view class="Xx_QRcodeBlock1">
						<text class="Xx_QRcodeContentTitle">入园辅助码</text>
					</view>
					<view class="Xx_QRcodeBlock2">
						<text class="Xx_QRcodeContent">{{orderInfo[0].orderTicketNumber}}</text>
					</view>
					<view class="Xx_QRcodeBlock2">
						<image class="Xx_QRcodeImage" :src="orderInfo[0].orderQrCode" mode="aspectFill"></image>
					</view>
					<view class="Xx_QRcodeBlock2">
						<text class="Xx_QRcodeTips">出示二维码，检票入园</text>
					</view> 
				</view>
				
				<!-- 出行人+退改+保险 -->
				<view style="margin-top: 20upx;" v-for="(item,index) in orderInfo" :key="index">
					<text class="Xx_contentTitle" >出行人</text>
					<text class="Xx_contentTitle2">{{item.userName}}&nbsp;{{item.userType}}</text>
					<view></view>
					<view class="Xx_contentBlock">
						<text class="Xx_contentTitle" >身份证</text>
						<text class="Xx_contentTitle2">{{item.userCodeNum}}</text>
					</view>
					<view class="Xx_contentBlock">
						<text class="Xx_contentTitle" >手机号</text>
						<text class="Xx_contentTitle2">{{item.userPhoneNum}}</text>
					</view>
				</view>
				<view class="Xx_contentBlock" v-if="orderInfo[0].orderInsure == true">
					<text class="Xx_contentTitle" >附加保险</text>
					<text class="Xx_contentTitle2">太平洋门票意外险 经济款×{{orderInfo.length}}份</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>	 

<script>
	import uniPopup from "../../../components/LYFW/scenicSpotTickets/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				orderInfo : [{
						orderNumber:'', //订单编号
						orderStatus:'',  //门票状态
						orderActualPayment: '', //实际付款金额
						orderDateReminder: '', //时间表达（今天，明天，星期X）
						orderDate: '', //数字时间
						orderTicketNumber: '',  //取票号
						orderQrCode : '', //二维码
						orderInsure : '', //是否买保险
						
						ticketId: '', 
						ticketName: '',
						ticketOpenUp: '',
						ticketTitle: '', 
						ticketContain: '',
						ticketAdultPrice: '',
						ticketChildPrice: '',
						
						couponID: '',
						couponTitle: '',
						couponPrice: '',
						couponCondition: '',
						userID: '',
						userType: '',
						userName: '',
						userSex: '',
						userCodeNum: '',
						userPhoneNum: '',
						userDefault: '',
						userEmergencyContact:'',
					}],
				childrenIndex : '', //儿童数量
				adultIndex : '', //成人数量
				childrenTotalPrice : '', //儿童总价
				adultTotalPrice : '', //成人总价
			}
		},
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		onLoad(options) {
			// console.log(JSON.parse(options.orderNumber));
			this.lyfwData();
		},
		methods: {
			//访问模拟数据
			async lyfwData() {
				let orderInfo = await this.$api.lyfwfmq('orderInfo');
				this.orderInfo = orderInfo.data;
				this.screenUser();
				// console.log(this.orderInfo[0])
			},
			//打开弹框
			open() {
				this.$refs.popup.open()
			},
			//关闭弹框
			close() {
				this.$refs.popup.close()
			},
			//数组提取
			screenUser: function() {
				let adult = this.orderInfo.filter(item => {
					return item.userType == '成人';
				})
				let children = this.orderInfo.filter(item => {
					return item.userType == '儿童';
				})
				
				this.adultIndex = adult.length;
				this.childrenIndex = children.length;
				this.adultTotalPrice = adult.length * this.orderInfo[0].ticketAdultPrice;
				this.childrenTotalPrice = children.length * this.orderInfo[0].ticketChildPrice;
			},
			//跳转至景区详情
			route(){
				uni.navigateTo({
					url: '../../LYFW/scenicSpotTickets/ticketsDetails?ticketId=' + JSON.stringify(this.orderInfo[0].ticketId)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		padding-bottom: 40upx;
	}
	
	//背景图样式
	.ob_background {
		width: 100%;
		height: 320upx;
		image {
			width: 100%;
			height: 100%;
		}
		.Dx_View{
			position: absolute;
			width: 100%;
			top: 180upx;
			color: #FFFFFF;
			right: 0;
			.Dx_title{
				margin-left: 32upx;
				font-size: 48upx;
				font-weight: 300;
			}
			.Dx_text{
				margin-left: 32upx;
				font-size: 30upx;
			}
			.Dx_image{
				position: relative;
				width: 28upx;
				height: 28upx;
				left: 184upx;
				top: 6upx;
			}
			.Dx_price{
				position: relative;
				font-size: 52upx;
				margin-right: 6upx;
				text-align: right;
				left: 184upx;
				top: 4upx;
			}
			.Dx_priceIcon{
				font-size: 30upx;
				position: relative;
				margin-right: 2upx;
				left: 184upx;
				top: 4upx;
			}
			.Dx_remarks{
				display: block;
				margin: 20upx 32upx;
				font-size: 28upx;
			}
		}
		/* #ifdef MP-WEIXIN */
		//整体容器样式 -微信版
		.Dx_View {
			top: 64upx;
		}
		/* #endif */
	}
	
	
	//须知弹框
	.box_Vlew {
		// width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;
		.box_titleView{
			margin: 24upx 0;
			//弹框标题
			.box_title {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}
			//弹框关闭按钮
			.box_icon {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}
		//使用时间/费用详情
		.MP_selectionDate {
			margin-top: 24upx;
			margin-bottom: 24upx;
			border-top: 1px #F5F5F5 dashed;
			.MP_text {
				color: #888;
				font-size: 28upx;
				display: block; // 让字体换行
			}
		
			.MP_cost {
				display: block; // 让字体换行
				margin: 20upx 0;
				font-size: 28upx;
				color: #888;
		
				.MP_number {
					margin-left: 16upx;
				}
		
				.MP_userCost {
					float: right;
				}
		
				.MP_total {
					color: #f85e52;
					float: right;
				}
			}
		}
	}
	
	//信息详情
	.Xx_view{
		position: relative;
		margin: 0upx 32upx;
		margin-top: 32upx;
		border-radius: 16upx;
		background: #FFFFFF;
		.Xx_titleView{
			padding: 32upx;
			border-bottom: 1px #F5F5F5 dashed;
			.Xx_title{
				font-size: 34upx;
				font-weight: bold;
			}
			.Xx_titleIcon{
				position: absolute;
				right: 32upx;
			}
		}
		.Xx_contentView{
			margin-top: 2upx;
			padding: 32upx;
			font-size: 30upx;
			.Xx_contentTitle{
				color: #888;
			}
			.Xx_contentTitle2{
				margin-left: 24upx;
				color: #333;
			}
			.Xx_contentBlock{
				margin-top: 20upx;
			}
		}
		
		.Xx_QRcodeView{
			margin: 56upx 0;
			text-align: center;
			.Xx_QRcodeBlock1{
				margin-top: 40upx;
			}
			.Xx_QRcodeBlock2{
				margin-top: 12upx;
			}
			.Xx_QRcodeTitle{
				color: #888;
				font-weight: 300;
			}
			.Xx_QRcodeContentTitle{
				color: #888;
				font-size: 28upx;
			}
			.Xx_QRcodeContent{
				color: #333;
				font-size: 34upx;
				font-weight: bold;
			}
			.Xx_QRcodeImage{
				width: 320upx;
				height: 320upx;
			}
			.Xx_QRcodeTips{
				color: #0BA7E8;
				font-size: 28upx;
			}
		}
	}
	/* #ifdef MP-WEIXIN */
	//整体容器样式 -微信版
	.Xx_view {
		margin-top: -80upx;
	}
	/* #endif */
	
	
</style>
