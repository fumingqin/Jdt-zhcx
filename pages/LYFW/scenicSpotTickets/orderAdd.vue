<template>
	<view> 

		<!-- 顶部背景 -->
		<view class="ob_background">
			<image src="../../../static/LYFW/scenicSpotTickets/addOrder/orderBackground.png" mode="aspectFit"></image>
		</view>


		<text class="jdticon icon-s"></text>
		<!-- 门票信息/数量 -->
		<!-- 命名：MP -->
		<view class="cover-container">
			<view class="MP_information"> 
				<view class="MP_text1">{{scSpotDetails.title}}</view>
				<text class="MP_text2" @click="open2(1)">{{scSpotDetails.comment}} &nbsp; > </text>
				<!-- 嵌套弹框组件popup -->
				<uni-popup ref="popup1" type="bottom">
					<scroll-view class="noticeBox" scroll-y="ture">
						<text class="Nb_text1">预订须知</text>
						<text class="Nb_text4 jdticon icon-fork " @click="close(1)"></text>
						<text class="Nb_text2">预订说明</text>
						<text class="Nb_text3">
							预订时间：最晚需在出行当天18:00前购票
							有效时间：指定购买日期起，1日有效
						</text>
						<text class="Nb_text2">使用方法</text>
						<text class="Nb_text3">
							1、本产品每个账号每天限购一张，购买 后持智慧旅游APP订单中的二维码检票入园即可
							2、费用包含：成人票一张、竹筏票一张
							3、本产品不支持代购或转售，仅限购票人本人使用。因代购或转售无法入园申请 退改，不退不改。
						</text>
						<text class="Nb_text2">使用时间</text>
						<text class="Nb_text3">
							周一至周日 09:00~18:00
						</text>
						<text class="Nb_text2">免票政策</text>
						<text class="Nb_text3">
							1、70岁以上老年人凭老年证免费；
							2、身高80厘米以下免票；身高80-120厘米儿童票价160元；身高120以上儿童全票
						</text>
						<text class="Nb_text2">退改规则</text>
						<text class="Nb_text3">
							该产品未使用且在有效期内支持随时退， 过期不退不改，敬请谅解！如需取消，请 登录智慧旅游APP账号申请取消，经核实 未使用且在有效期内，可免费取消。如需 改期，请申请取消后重新预订。
						</text>
					</scroll-view>
				</uni-popup>


				<view class="MP_selector">
					<text>使用日期</text>
					<text class="MP_text3" @click="open">{{date}}&nbsp;> </text>
					<text class="MP_text4">{{dateReminder}}</text>
				</view>
			</view>

			<view class="MP_information">
				<text class="MP_text1">购票人信息</text>
				<text class="MP_text2" style="color: #aaa;">请选择预订人，票价会根据人数自动变更</text>

				<view class="MP_selector3">
					<text>{{addressData.name}}</text>
					<text class="Mp_text5">女</text>
					<text class="Mp_icon">成人</text>
					<text class="Mp_icon2  yticon icon-fork"></text>
					<text class="Mp_text6">{{addressData.idCard}}</text>
				</view>

				<view class="MP_selector3">
					<button class="Mp_button1" type="default" plain="true">删除</button>
					<button class="Mp_button2" type="primary" plain="true">添加</button>
				</view>

			</view>

			<!-- 优惠券 -->
			<view class="MP_information" @click="toggleMask('show')">
				<view class="MP_selector4">
					<text class="Mp_text7">优惠券</text>
					<text class="Mp_text11"> > </text>
					<text class="Mp_text8">{{couponIndex}}</text>
				</view>
			</view>
			
			<!-- 呼出优惠券面板 -->
			<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
				<view class="mask-content" >
					<!-- 优惠券页面，仿mt -->
					<view class="couponTitle">
						<text class="Co_text1">文中提及的地点</text>
						<text class="Co_text2" @click="couponReset">不使用优惠券</text>
					</view>
					
					<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @click="couponEvent(index)">
						<view class="con">
							<view class="left">
								<text class="title">{{item.title}}</text>
								<text class="time">有效期至2019-06-30</text>
							</view> 
							
							<view class="right">
								<text class="price">{{item.price}}</text>
								<text>满{{couponList[index].condition}}可用</text>
							</view>
							
							<view class="circle l"></view>
							<view class="circle r"></view>
						</view>
						<text class="tips">限新用户使用</text>
					</view>
				</view>
			</view>
			
			<view class="MP_information" >
					<view class="MP_selector4">
						<text class="Mp_text7">同意游客须知</text>
						<text class="Mp_text9" @click="open2(2)" >(点击查看须知)</text>
						<radio class="Mp_text10" value="1" :checked="selectedValue===1 ? true : false" @click="Selection" ></radio>
					</view>
					<!-- 嵌套弹框组件popup -->
					<uni-popup  ref="popup2" type="bottom">
							<scroll-view class="noticeBox" scroll-y="ture" >
							<text class="Nb_text1">游客须知</text>
							<text class="Nb_text4 jdticon icon-fork " @click="close(2)"></text>
							<text class="Nb_text3">
								1.本票仅为乘坐使用，不作为报销凭证
								2.本票仅供一人使用、当趟有效，逾期作废
								3.请勿携带贵重物品乘坐竹筏
								4.在行筏过程中严禁站立或行走拍照
								5.在雷雨、大风、能见度差等条件下停筏
								6.竹筏在行驶中或未停稳时，严禁强行登、下筏
								7.严禁下河游泳，戏水
								8.严禁携带戏水工具（水枪、水瓢等）乘坐竹筏
								9.严禁未穿救生衣承筏，乘筏过程中严禁解脱救生衣
								10.严禁携带易燃、易爆、腐蚀、毒害、放射性等危险品和管制刀具及国家禁止运输的其它危险化学品乘坐竹筏
								11.严禁超载（原则上正常水位每张拼排乘坐体重75公斤以下游客10人），如遇超标准体重者，由现场管理人员统一调整
								12.咨询电话：0599-8030999     投诉电话：0599-8030995
							</text>
						</scroll-view>
					</uni-popup>
				</view>
			
				<!-- 底部 -->
				<view class="footer"   >
					<view class="price-content" >
						<text>实付款</text>
						<text class="price-tip">￥</text>
						<text class="price">{{actualPayment}}</text>
					</view>
					<view class="submitChange" :class="{submitColor: selectedValue===1}">
						<text class="submit"  @click="submit">立即预订</text>
					</view>
				</view>

		</view>
		<uni-calendar ref="calendar" :insert="false" :lunar="true" @confirm="confirm"></uni-calendar>
	</view>
</template>

<script>
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	import uniCalendar from '../../../components/uni-calendar/uni-calendar.vue'
	export default {
		data() {
			const currentDate = this.getDate({ 
				format: true
			})
			return {
				index: 0, //门票信息的数组值
				number: 1, //门票数量的值
				actualPayment: '', //实际付款
				selectedValue: 0, //同意须知的选中值
				dateReminder: '明天', //日期提醒
				date: currentDate, //默认时间
				maskState: 0, //优惠券面板显示状态
				payType: 1, //1微信 2支付宝
				scSpotDetails: [], //景区内容
				couponIndex: '请选择优惠券', //优惠券默认内容
				couponColor: '', //优惠券couponID，大于等于0触发价格判断事件
				couponCondition: '',//优惠券的满足条件值
				couponList: [{
						couponID: '0',
						title: '新用户专享优惠券',
						price: 5,
						condition: 10,
					},
					{
						couponID: '1',
						title: '春节限时限量优惠券',
						price: 50,
						condition: 400,
					}, 
					{
						couponID: '2',
						title: '大型团购优惠券-今点通限量版',
						price: 300,
						condition: 1000,
					}
				],
				addressData: {
					name: '许小星',
					idCard: '35058199503692367',
					mobile: '13853989563',
					addressName: '金九大道',
					address: '山东省济南市历城区',
					area: '149号',
					default: false,
				},
			}
		},

		onLoad(option) {
			this.lyfwData();
		},

		components: {
			//加载多方弹框组件
			uniPopup,
			//加载日期组件 
			uniCalendar,
		},
		methods: { 
			//读取静态数据
			async lyfwData() {
				let scSpotDetails = await this.$api.lyfwfmq('scSpotDetails');
				this.scSpotDetails = scSpotDetails.ticket;
				console.log(this.scSpotDetails)
			},

			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},

			//优惠券赋值
			couponEvent: function(index) {
				if (this.actualPayment >= this.couponList[index].condition) {
					this.couponIndex = '-' + this.couponList[index].price;
					this.couponColor = this.couponList[index].couponID;
					this.couponCondition = this.couponList[index].condition;
					this.calcTotal();
					this.toggleMask();
				} else {
					uni.showToast({
						title: '您的实付款未达到条件，请重新选择',
						icon: 'none'
					})
				}

			},

			//取消优惠券
			couponReset: function(index) {
				this.couponIndex = '请选择优惠券';
				this.couponColor = '';
				this.calcTotal();
				this.toggleMask();
			},

			changePayType(type) {
				this.payType = type;
			},



			//提交表单
			submit: function() {
				if (this.selectedValue == 1) {
					uni.redirectTo({
						url
					})
				} else {
					uni.showToast({
						title: '请同意购买须知',
						icon: 'none'
					})
				}
			},

			//打开选择器
			open() {
				this.$refs.calendar.open();
			},

			//打开popup下弹框
			open2(e) {
				if (e == 1) {
					this.$refs.popup1.open()
				} else {
					this.$refs.popup2.open()
				}
			},

			close(e) {
				if (e == 1) {
					this.$refs.popup1.close()
				} else {
					this.$refs.popup2.close()
				}
			},



			//获取当前时间并格式化
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate() + 1;
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},


			//时间选择器，确认选择
			confirm(e) {
				this.getTime(e);
			},

			//时间效验，已提示
			getTime: function(e) {
				let date = new Date(),
					day = date.getDate(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var index = e.date - day;
				if (index < 0) {
					uni.showToast({
						title: '请勿选择以往日期',
						icon: 'none'
					})
				} else if (index == 0) {
					this.dateReminder = '今天'
					this.date = e.fulldate;
				} else if (index == 1) {
					this.dateReminder = '明天'
					this.date = e.fulldate;
				} else if (index == 2) {
					this.dateReminder = '后天'
					this.date = e.fulldate;
				} else {
					this.dateReminder = e.lunar.ncWeek;
					this.date = e.fulldate;
				}
			},
			
			//同意购买-点击事件
			Selection : function(){
				if(this.selectedValue==0){
					this.selectedValue=1;
				}else{
					this.selectedValue=0;
				}
			},
				
				
			// 数量
			numberChange(data){
				var that = this;
				const a = that.scSpotDetails.ticket[that.index].price * data;
				if(this.couponColor ==''){
					this.number = data;
					this.calcTotal();
				}else if(a >= this.couponCondition){
					this.number = data;
					this.calcTotal();
				}else if(a < this.couponCondition){
					uni.showToast({
						title:'您的金额不满足优惠券条件，已取消优惠券',
						icon:'none',
						duration:2000
					})
					this.couponIndex = '请选择优惠券';
					this.couponColor = '';
					this.couponCondition = 0;
					this.number = data;
					this.calcTotal();
				}
			},
			
			// 计算总价
			async calcTotal(e){ 
				var total;
				const a = this.scSpotDetails.ticket[this.index].price * this.number;
				if(this.couponColor ==''){
					this.actualPayment = a;
				}else if(a >= this.couponCondition){
					total = a - this.couponList[this.couponColor].price;
					this.actualPayment = total;
				}
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		padding-bottom: 100upx;
	}

	//背景图样式
	.ob_background {
		position: absolute;
		width: 100%;
		height: 320upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	//整体容器样式
	.cover-container {
		padding: 64upx 30upx;
		position: relative;
		padding-bottom: 32upx;
	}

	//公共样式
	.MP_information {
		border-radius: 16upx;
		background: #FFFFFF;
		padding: 32upx 32upx;
		font-size: 32upx;
		box-shadow: 0px 0.2px 0px #aaa;
		margin-top: 24upx;

		.MP_text1 {
			font-size: 34upx;
			display: flex;
			font-weight: bold;
		}

		.MP_text2 {
			font-size: 26upx;
			margin-top: 20upx;
			display: block; // 让字体换行
		}
	}

	//须知弹框
	.noticeBox {
		width: 90%;
		// overflow:hidden;
		height: 880upx;
		padding: 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;

		.Nb_text1 {
			font-size: 38upx;
			font-weight: bold;
		}

		.Nb_text2 {
			display: block;
			margin-top: 32upx;
			font-size: 34upx;
			font-weight: bold;
		}

		.Nb_text3 {
			display: block;
			line-height: 64upx;
			margin: 32upx 0;
			font-size: 30upx;
		}

		.Nb_text4 {
			margin-top: 8upx;
			float: right;
			color: #333;
			font-size: 32upx;
		}
	}



	//使用日期
	.MP_selector {
		width: 100%;
		line-height: 120upx;
		margin-top: 46upx;
		border-top: 1px #F5F5F5 dashed;

		.MP_text3 {
			float: right;
		}

		.MP_text4 {
			font-size: 26upx;
			color: #aaa;
			float: right;
			margin-right: 24upx;
		}
	}


	//门票数量
	.MP_selector2 {
		width: 100%;
		line-height: 120upx;
		border-top: 1px #F5F5F5 dashed;
		display: flex;

		.MP_text3 {
			float: right;
		}

		.step {
			position: relative;
			left: 330upx;
			top: 40upx;
		}
	}

	// 购票人信息
	.MP_selector3 {
		width: 100%;
		margin-top: 32upx;
		border-top: 1px #F5F5F5 dashed;
		padding-top: 32upx;

		.Mp_text5 {
			margin-left: 24upx;
		}

		.Mp_text6 {
			font-size: 30upx;
			display: block;
			color: #aaa;
			margin-top: 24upx;
		}

		.Mp_icon {
			margin-left: 24upx;
			padding: 2upx 20upx;
			background: #3DABFC;
			font-size: 26upx;
			color: #fff;
			text-align: center;
			border-radius: 8upx;
		}

		.Mp_icon2 {
			float: right;
			color: #f85e52;
			font-size: 34upx;

		}

		.Mp_button1 {
			float: left;
			margin-left: 32upx;
			width: 240upx;
		}

		.Mp_button2 {
			margin-right: 32upx;
			width: 240upx;
		}
	}

	//优惠券
	.MP_selector4 {
		.Mp_text7 {
			font-size: 32upx;
		}

		.Mp_text8 {
			margin-top: 6upx;
			float: right;
			font-size: 28upx;
			color: #f85e52;
		}

		.Mp_text9 {
			margin-left: 16upx;
			font-size: 26upx;
			color: #3EABFC;
		}

		.Mp_text10 {
			float: right;
			position: relative;
			bottom: 6upx;
		}

		.Mp_text11 {
			margin-top: 6upx;
			margin-left: 24upx;
			float: right;
			font-size: 28upx;
			color: #aaa;
		}
	}
	
	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}
	
	
	/* 优惠券列表 */
	
	//下弹框标题
	.couponTitle{
		padding: 40upx;
		padding-bottom: 16upx;
		.Co_text1{
			font-size: 38upx;
			font-weight: bold;
		}
		.Co_text2{
			margin-top: 8upx;
			float: right;
			color: #f85e52;
			font-size: 28upx;
		}
	}
	
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: #f85e52;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: #999999;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999999;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: #f85e52;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: #999999;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}
	
	//底部
	.footer{
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
		background: #fff;
		z-index: 998;
		color: #f85e52;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
		}
		.price-tip{
			color: #f85e52;
			margin-left: 8upx;
		}
		.price{
			font-size: 36upx;
			color: #f85e52;
		}
		.submitChange{
			display:flex;
			align-items:center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			background: #aaa;
			.submit{
				color: #fff;
				font-size: 32upx;
			}
			&.submitColor{
				background: #06B4FD;
			}
		}
	}
	
	
</style>
