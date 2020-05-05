<template>
	<view>
		<!-- <view style="width: 100%;height: 32rpx; display: flex">
			<image @click="back" src="../../static/Order/fanhui.png" style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;"></image>
			<view style="width: 152rpx; height: 48rpx; margin: 92rpx 232rpx;color: #333333; font-size: 38rpx;font-weight:bold;">我的订单</view>
		</view> -->

		<view class="tab">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#3DABFC"></uni-segmented-control>
		</view>

		<view v-if="current === 0" style="margin-top: 20rpx;">
			<view v-for="(item,index) in info" :key="index">
				<!-- <view  v-if="item.title=='出租车-专线'"> -->
				<view v-if="item.title=='出租车-专线'">
					<view style="margin:30rpx;">
						<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
							<view style="display: flex;justify-content: space-between;">
								<view style="display: flex;">
									<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
									<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
								</view>
								<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 20rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
								<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
							</view>
							<view style="display: flex;justify-content: flex-end;">
								<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
								<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">评价</button> -->
								<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
								<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
								<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
							</view>
						</view>
					</view>
				</view>
				<!-- 出租车 -->
				<view v-if="item.vehicleType=='出租车'">
					<view v-if="item.appointment" style="width: 222rpx; height: 62rpx;line-height: ; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
						<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center; margin-left: 28rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
					</view>
					<view class="whiteBg">
						<view style="display: flex; margin-top: -40rpx;">
							<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
							<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
							<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
						</view>

						<view style="display: flex; margin-top: -72rpx;">
							<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
							<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
							<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
						</view>

						<view style="display: flex; margin-top: -16rpx;">
							<view class="bluering"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
						</view>

						<view style="display: flex; margin-top: 36rpx;">
							<view class="redring"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
						</view>

						<view class="CTKYBtnView">
							<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成' || taxiOrderState(item.state)=='未支付'">详情</button>
							<!-- <button class="allBtn" @click="detail(item.titleIndex)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button> -->
							<button class="allBtn payBtn" @click="openBottomPopup" v-if="taxiOrderState(item.state)=='未支付'">去支付</button>
							<button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button>
							<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
						</view>
					</view>
				</view>
				
				
				<!-- 景区门票 -->
				<!-- 标签class命名：pd;全称：Purchase Date -->
				<!-- 内容class命名：at;全称：Admission ticket -->
				<view v-if="item.title=='景区门票' && item.isDel !== '是'">
					<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
					<view class="at_view">
						<view class="at_titleView">
							<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
							<text class="at_title">{{item.ticketTitle}}</text>
							<text class="at_status">{{item.orderType}}</text>
						</view>
						<view class="at_contentView" style="display: flex;">
							<view v-for="(item2,index2) in item.ticketComment" :key="index2">
								<view class="at_contentFrame">{{item2}}</view>
							</view>
							<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
						</view>

						<view class="at_contentView">
							<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
							<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
						</view>

						<!-- 已使用 -->
						<view class="at_buttonView" v-if="item.orderType=='已使用'">
							<view class="at_button at_btDetails" @click="details(item.orderNumber)" style="margin-right: 0upx;">详情</view>
						</view>

						<!-- 待使用 -->
						<view class="at_buttonView" v-if="item.orderType=='待使用'">
							<view class="at_button at_btDelete" @click="open2(item.orderNumber,'3')">退票</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="open5(item)">二维码</view>
						</view>

						<!-- 待支付 -->
						<view class="at_buttonView" v-if="item.orderType=='待支付'">
							<view class="at_button at_btDelete" @click="open3(item.orderNumber,'3')">取消</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btToPay" @click="topay(item.orderNumber)">去支付</view>
						</view>

						<!-- 已退票 -->
						<view class="at_buttonView" v-if="item.orderType=='已退票'">
							<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="repurchase(item.ticketId)">再次预订</view>
						</view>

						<!-- 已取消 -->
						<view class="at_buttonView" v-if="item.orderType=='已取消'">
							<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="repurchase(item.ticketId)">再次预订</view>
						</view>

						<!-- 支付超时 -->
						<view class="at_buttonView" v-if="item.orderType=='支付超时'">
							<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="repurchase(item.ticketId)">再次预订</view>
						</view>
						
						<!-- 已失效 -->
						<view class="at_buttonView" v-if="item.orderType=='已失效'">
							<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="repurchase(item.ticketId)">再次预订</view>
						</view>
						
					</view>
				</view>

				<!-- 包车订单 -->
				<!-- 标签class命名：;全称：Purchase Date -->
				<!-- 内容class命名：cm;全称：custom made -->
				<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
					<view class="pd_view">{{item.or_date}}</view>
					<view class="cm_view">
						<view class="cm_titleView">
							<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
							<text class="cm_title">{{item.or_class}}</text>
							<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
						</view>
						<view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view>
						<view class="cm_contentView">
							<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
							<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
							<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
							<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
						</view>


						<!-- 已完成 -->
						<view class="cm_buttonView" v-if="item.or_Type=='6'">
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)" style="margin-right: 0upx;">详情</view>
						</view>

						<!-- 待发车 -->
						<view class="cm_buttonView" v-if="item.or_Type=='1'">
							<view class="cm_button cm_contact" @click="tel(item.or_driverTelephone)">联系司机</view>
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
						</view>
						<!-- 进行中 -->
						<view class="cm_buttonView" v-if="item.or_Type=='4'">
							<view class="cm_button cm_contact" @click="tel(item.or_driverTelephone)">联系司机</view>
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
						</view>

						<!-- 待支付 -->
						<view class="cm_buttonView" v-if="item.or_Type=='5'">
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
							<view class="cm_button cm_btToPay" @click="topay(item.or_number)">去支付</view>
						</view>

						<!-- 已取消 -->
						<view class="cm_buttonView" v-if="item.or_Type=='8'||item.or_Type=='9'">
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							<view class="cm_button cm_btDelete" @click="open4(item.or_number,'4')">删除</view>
						</view>
					</view>
				</view>


				<!-- （全部）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
				<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">

					<!-- 预定日期 -->
					<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;">
						<view class="reserveDate">预定日期：{{item.bookTime}}</view>
					</view>

					<view class="kywhiteBg">
						<!-- 站点-状态 -->
						<view class="u-f-ac">
							<image style="width: 48rpx; height: 45rpx; margin-left: 20rpx;" src="../../static/Order/keche.png"></image>
							<view class="u-f-jsb" style="margin-left: 20rpx; width: 100%;">
								<view class="stationTitle">{{item.startSiteName}}-{{item.endSiteName}}</view>
								<view style="color: #666666; font-size: 28rpx;margin-right: 20rpx;">{{getCtkyOrderStatus(item.state)}}</view>
							</view>
						</view>
						<!-- 时间-价格 -->
						<view class="u-f-ac" style="margin-left: 96rpx; margin-top: 20rpx;color: #AAAAAA; font-size: 28rpx;">
							<image style="width: 22rpx; height: 22rpx;" src="../../static/Order/time.png"></image>
							<view class="u-f-jsb" style="margin-left: 15rpx; width: 100%;">
								<view>{{item.setOutTime}}</view>
								<view style="margin-right: 20rpx;">¥{{item.totalPrice}}</view>
							</view>
						</view>
						<!-- 上车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="bluering"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.startSiteName}}</view>
						</view>
						<!-- 下车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="redring"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.endSiteName}}</view>
						</view>

						<view class="CTKYBtnView">
							<button class="allBtn" v-if="item.state=='7'" @tap="open3(item.orderNumber,'2')">取消</button>
							<button class="allBtn" @click="keYunDetail(item)">详情</button>
							<button class="allBtn payBtn" v-if="item.state=='7'" @tap="keYunPay(item.orderNumber)">去支付</button>
							<button class="allBtn" v-if="item.state=='4'" @tap="open2(item.orderNumber,'2')">退票</button>
							<!-- <button class="allBtn" v-if="item.state=='订单未支付'" @tap="cancelTap(item.orderId)">取消</button> -->
							<!-- <button class="allBtn" v-if="item.state=='已完成'">投诉</button> -->
							<!-- <button class="allBtn" @tap="keYunDel(item.orderId)" v-if="item.state=='已取消'">删除</button> -->
							<!-- <button class="allBtn" v-if="item.state=='待使用'" @tap="QRCodeTap">二维码</button> -->
							<!-- <button class="allBtn" v-if="item.state=='待使用'"@tap="">选座</button> -->
						</view>
					</view>
				</view>
			</view>
			<empty-data :isShow="info.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
		</view>


		<!-- 已完成 -->
		<view v-if="current === 1" style="margin-top: 20rpx; ">
			<view v-for="(item,index) in finishArr" :key="index">
				<!-- <view  v-if="item.title=='出租车-专线'"> -->
				<view v-if="item.title=='出租车-专线'">
					<view style="margin:30rpx;">
						<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
							<view style="display: flex;justify-content: space-between;">
								<view style="display: flex;">
									<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
									<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
								</view>
								<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 20rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
								<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
							</view>
							<view style="display: flex;justify-content: flex-end;">
								<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成' ">详情</button>
								<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">评价</button> -->
								<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
								<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
								<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
							</view>
						</view>
					</view>
				</view>

				<!-- 出租车 -->
				<view v-if="item.vehicleType=='出租车'">
					<view v-if="item.appointment" style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
						<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center; margin-left: 28rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
					</view>
					<view class="whiteBg">
						<view style="display: flex; margin-top: -40rpx;">
							<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
							<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
							<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
						</view>

						<view style="display: flex; margin-top: -72rpx;">
							<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
							<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
							<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
						</view>

						<view style="display: flex; margin-top: -16rpx;">
							<view class="bluering"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
						</view>

						<view style="display: flex; margin-top: 36rpx;">
							<view class="redring"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
						</view>

						<view class="CTKYBtnView">
							<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成' || taxiOrderState(item.state)=='未支付'">详情</button>
							<button class="allBtn" @click="detail(item.titleIndex)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button>
							<button class="allBtn payBtn" @click="openBottomPopup" v-if="taxiOrderState(item.state)=='未支付'">去支付</button>
							<button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button>
							<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
						</view>
					</view>
				</view>

				<!-- 景区门票 -->
				<!-- 标签class命名：pd;全称：Purchase Date -->
				<!-- 内容class命名：at;全称：Admission ticket -->
				<view v-if="item.title=='景区门票' && item.isDel !== '是'">
					<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
					<view class="at_view">
						<view class="at_titleView">
							<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
							<text class="at_title">{{item.ticketTitle}}</text>
							<text class="at_status">{{item.orderType}}</text>
						</view>
						<view class="at_contentView" style="display: flex;">
							<view v-for="(item2,index2) in item.ticketComment" :key="index2">
								<view class="at_contentFrame">{{item2}}</view>
							</view>
							<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
						</view>
				
						<view class="at_contentView">
							<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
							<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
						</view>
				
						<!-- 已使用 -->
						<view class="at_buttonView" v-if="item.orderType=='已使用'">
							<view class="at_button at_btDetails" @click="details(item.orderNumber)" style="margin-right: 0upx;">详情</view>
						</view>
						
					</view>
				</view>

				<!-- 包车订单 -->
				<!-- 标签class命名：;全称：Purchase Date -->
				<!-- 内容class命名：cm;全称：custom made -->
				<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
					<view class="pd_view">{{item.or_date}}</view>
					<view class="cm_view">
						<view class="cm_titleView">
							<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
							<text class="cm_title">{{item.or_class}}</text>
							<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
						</view>
						<view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view>
						<view class="cm_contentView">
							<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
							<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
							<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
							<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
						</view>
						<!-- 已完成 -->
						<view class="cm_buttonView" v-if="item.or_Type=='6'">
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)" style="margin-right: 0upx;">详情</view>
						</view>
					</view>
				</view>


				<!-- （已完成）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
				<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">
					<!-- 预定日期 -->
					<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;">
						<view class="reserveDate">预定日期：{{item.bookTime}}</view>
					</view>
					<view class="kywhiteBg">
						<!-- 站点-状态 -->
						<view class="u-f-ac">
							<image style="width: 48rpx; height: 45rpx; margin-left: 20rpx;" src="../../static/Order/keche.png"></image>
							<view class="u-f-jsb" style="margin-left: 20rpx; width: 100%;">
								<view class="stationTitle">{{item.startSiteName}}-{{item.endSiteName}}</view>
								<view style="color: #666666; font-size: 28rpx;margin-right: 20rpx;">{{getCtkyOrderStatus(item.state)}}</view>
							</view>
						</view>
						<!-- 时间-价格 -->
						<view class="u-f-ac" style="margin-left: 96rpx; margin-top: 20rpx;color: #AAAAAA; font-size: 28rpx;">
							<image style="width: 22rpx; height: 22rpx;" src="../../static/Order/time.png"></image>
							<view class="u-f-jsb" style="margin-left: 15rpx; width: 100%;">
								<view>{{item.setOutTime}}</view>
								<view style="margin-right: 20rpx;">¥{{item.totalPrice}}</view>
							</view>
						</view>
						<!-- 上车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="bluering"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.startSiteName}}</view>
						</view>
						<!-- 下车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="redring"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.endSiteName}}</view>
						</view>

						<view class="CTKYBtnView">
							<!-- <button class="allBtn">车辆位置</button> -->
							<button class="allBtn" @click="keYunDetail(item)">详情</button>
							<!-- <button class="allBtn QRCode">二维码</button>
							<button class="allBtn">选座</button>
							<button class="allBtn" @tap="keYunRefundTicket()">退票</button>
							<button class="allBtn">联系司机</button> -->
						</view>
					</view>
				</view>
			</view>
			<empty-data :isShow="finishArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
		</view>

		<!-- 进行中 -->
		<view v-if="current === 2" style="margin-top: 20rpx;">
			<view v-for="(item,index) in goingArr" :key="index">

				<!-- <view  v-if="item.title=='出租车-专线'"> -->
				<view v-if="item.title=='出租车-专线'">
					<view style="margin:30rpx;">
						<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
							<view style="display: flex;justify-content: space-between;">
								<view style="display: flex;">
									<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
									<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
								</view>
								<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 20rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
								<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
							</view>
							<view style="display: flex;justify-content: flex-end;">
								<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成' ">详情</button>
								<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">投诉</button> -->
								<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
								<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
								<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
							</view>
						</view>
					</view>
				</view>

				<!-- 出租车 -->
				<view v-if="item.vehicleType=='出租车'">
					<view v-if="item.appointment" style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
						<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center; margin-left: 28rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
					</view>
					<view class="whiteBg">
						<view style="display: flex; margin-top: -40rpx;">
							<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
							<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
							<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
						</view>

						<view style="display: flex; margin-top: -72rpx;">
							<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
							<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
							<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
						</view>

						<view style="display: flex; margin-top: -16rpx;">
							<view class="bluering"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
						</view>

						<view style="display: flex; margin-top: 36rpx;">
							<view class="redring"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
						</view>

						<view class="CTKYBtnView">
							<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成' || taxiOrderState(item.state)=='未支付'">详情</button>
							<button class="allBtn" @click="detail(item.titleIndex)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button>
							<button class="allBtn payBtn" @click="openBottomPopup" v-if="taxiOrderState(item.state)=='未支付'">去支付</button>
							<button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button>
							<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
						</view>
					</view>
				</view>


				<!-- 景区门票 -->
				<!-- 标签class命名：pd;全称：Purchase Date -->
				<!-- 内容class命名：at;全称：Admission ticket -->
				<view v-if="item.title=='景区门票' && item.isDel !== '是'">
					<view class="pd_view">下单时间：{{item.orderDate}}</view>
					<view class="at_view">
						<view class="at_titleView">
							<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
							<text class="at_title">{{item.ticketTitle}}</text>
							<text class="at_status">{{item.orderType}}</text>
						</view>
						<view class="at_contentView" style="display: flex;">
							<view v-for="(item2,index2) in item.ticketComment" :key="index2">
								<view class="at_contentFrame">{{item2}}</view>
							</view>
							<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
						</view>

						<view class="at_contentView">
							<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
							<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
						</view>


						<!-- 待使用 -->
						<view class="at_buttonView" v-if="item.orderType=='待使用'">
							<view class="at_button at_btDelete" @click="open2(item.orderNumber,'3')">退票</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="open5(item)">二维码</view>
						</view>

					</view>
				</view>

				<!-- 包车订单 -->
				<!-- 标签class命名：;全称：Purchase Date -->
				<!-- 内容class命名：cm;全称：custom made -->
				<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
					<view class="pd_view">{{item.or_date}}</view>
					<view class="cm_view">
						<view class="cm_titleView">
							<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
							<text class="cm_title">{{item.or_class}}</text>
							<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
						</view>
						<view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view>
						<view class="cm_contentView">
							<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
							<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
							<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
							<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
						</view>


						<!-- 待发车 -->
						<view class="cm_buttonView" v-if="item.or_Type=='1'">
							<view class="cm_button cm_contact" @click="tel(item.or_driverTelephone)">联系司机</view>
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
						</view>
						<!-- 进行中 -->
						<view class="cm_buttonView" v-if="item.or_Type=='4'">
							<view class="cm_button cm_contact" @click="tel(item.or_driverTelephone)">联系司机</view>
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
						</view>

					</view>
				</view>

				<!-- (进行中)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
				<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">
					<!-- 预定日期 -->
					<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;">
						<view class="reserveDate">预定日期：{{item.bookTime}}</view>
					</view>
					<view class="kywhiteBg">
						<!-- 站点-状态 -->
						<view class="u-f-ac">
							<image style="width: 48rpx; height: 45rpx; margin-left: 20rpx;" src="../../static/Order/keche.png"></image>
							<view class="u-f-jsb" style="margin-left: 20rpx; width: 100%;">
								<view class="stationTitle">{{item.startSiteName}}-{{item.endSiteName}}</view>
								<view style="color: #666666; font-size: 28rpx;margin-right: 20rpx;">{{getCtkyOrderStatus(item.state)}}</view>
							</view>
						</view>
						<!-- 时间-价格 -->
						<view class="u-f-ac" style="margin-left: 96rpx; margin-top: 20rpx;color: #AAAAAA; font-size: 28rpx;">
							<image style="width: 22rpx; height: 22rpx;" src="../../static/Order/time.png"></image>
							<view class="u-f-jsb" style="margin-left: 15rpx; width: 100%;">
								<view>{{item.setOutTime}}</view>
								<view style="margin-right: 20rpx;">¥{{item.totalPrice}}</view>
							</view>
						</view>
						<!-- 上车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="bluering"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.startSiteName}}</view>
						</view>
						<!-- 下车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="redring"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.endSiteName}}</view>
						</view>

						<view class="CTKYBtnView">
							<!-- <button class="allBtn">车辆位置</button> -->
							<button class="allBtn" @click="keYunDetail(item)">详情</button>
							<!-- <button class="allBtn QRCode">二维码</button> -->
							<!-- <button class="allBtn">选座</button> -->
							<button class="allBtn" @tap="open2(item.orderNumber,'2')">退票</button>
							<!-- <button class="allBtn" @tap="keYunRefundTicket(item.orderNumber)">退票</button> -->
							<!-- <button class="allBtn">联系司机</button> -->
						</view>
					</view>
				</view>
			</view>
			<empty-data :isShow="goingArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
		</view>


		<!-- 未支付 -->
		<view v-if="current === 3" style="margin-top: 20rpx;">
			<view v-for="(item,index) in unfinishArr" :key="index">

				<!-- <view  v-if="item.title=='出租车-专线'"> -->
				<view v-if="item.title=='出租车-专线'">
					<view style="margin:30rpx;">
						<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
							<view style="display: flex;justify-content: space-between;">
								<view style="display: flex;">
									<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
									<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
								</view>
								<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 20rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
								<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
							</view>
							<view style="display: flex;justify-content: flex-end;">
								<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
								<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">投诉</button> -->
								<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
								<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
								<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
							</view>
						</view>
					</view>
				</view>

				<!-- 出租车 -->
				<view v-if="item.vehicleType=='出租车'">
					<view v-if="item.appointment" style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
						<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center; margin-left: 28rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
					</view>
					<view class="whiteBg">
						<view style="display: flex; margin-top: -40rpx;">
							<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
							<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
							<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
						</view>

						<view style="display: flex; margin-top: -72rpx;">
							<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
							<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
							<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
						</view>

						<view style="display: flex; margin-top: -16rpx;">
							<view class="bluering"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
						</view>

						<view style="display: flex; margin-top: 36rpx;">
							<view class="redring"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
						</view>

						<view class="CTKYBtnView">
							<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成' || taxiOrderState(item.state)=='未支付'">详情</button>
							<button class="allBtn" @click="detail(item.titleIndex)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button>
							<button class="allBtn payBtn" @click="openBottomPopup" v-if="taxiOrderState(item.state)=='未支付'">去支付</button>
							<button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button>
							<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
						</view>
					</view>
				</view>


				<!-- 景区门票 -->
				<!-- 标签class命名：pd;全称：Purchase Date -->
				<!-- 内容class命名：at;全称：Admission ticket -->
				<view v-if="item.title=='景区门票' && item.isDel !== '是'">
					<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
					<view class="at_view">
						<view class="at_titleView">
							<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
							<text class="at_title">{{item.ticketTitle}}</text>
							<text class="at_status">{{item.orderType}}</text>
						</view>
						<view class="at_contentView" style="display: flex;">
							<view v-for="(item2,index2) in item.ticketComment" :key="index2">
								<view class="at_contentFrame">{{item2}}</view>
							</view>
							<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
						</view>

						<view class="at_contentView">
							<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
							<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
						</view>

						<!-- 待支付 -->
						<view class="at_buttonView" v-if="item.orderType=='待支付'">
							<view class="at_button at_btDelete" @click="open3(item.orderNumber,'3')">取消</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btToPay" @click="topay(item.orderNumber)">去支付</view>
						</view>


					</view>
				</view>

				<!-- 包车订单 -->
				<!-- 标签class命名：;全称：Purchase Date -->
				<!-- 内容class命名：cm;全称：custom made -->
				<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
					<view class="pd_view">{{item.or_date}}</view>
					<view class="cm_view">
						<view class="cm_titleView">
							<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
							<text class="cm_title">{{item.or_class}}</text>
							<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
						</view>
						<view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view>
						<view class="cm_contentView">
							<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
							<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
							<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
							<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
						</view>


						<!-- 待支付 -->
						<view class="cm_buttonView" v-if="item.or_Type=='5'">
							<view class="cm_button cm_btDelete" @click="open3(item.or_number,'4')">取消</view>
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>
							<view class="cm_button cm_btToPay" @click="topay(item.or_number)">去支付</view>
						</view>


					</view>
				</view>

				<!-- (未支付)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
				<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">
					<!-- 预定日期 -->
					<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;">
						<view class="reserveDate">预定日期：{{item.bookTime}}</view>
					</view>
					<view class="kywhiteBg">
						<!-- 站点-状态 -->
						<view class="u-f-ac">
							<image style="width: 48rpx; height: 45rpx; margin-left: 20rpx;" src="../../static/Order/keche.png"></image>
							<view class="u-f-jsb" style="margin-left: 20rpx; width: 100%;">
								<view class="stationTitle">{{item.startSiteName}}-{{item.endSiteName}}</view>
								<view style="color: #666666; font-size: 28rpx;margin-right: 20rpx;">{{getCtkyOrderStatus(item.state)}}</view>
							</view>
						</view>
						<!-- 时间-价格 -->
						<view class="u-f-ac" style="margin-left: 96rpx; margin-top: 20rpx;color: #AAAAAA; font-size: 28rpx;">
							<image style="width: 22rpx; height: 22rpx;" src="../../static/Order/time.png"></image>
							<view class="u-f-jsb" style="margin-left: 15rpx; width: 100%;">
								<view>{{item.setOutTime}}</view>
								<view style="margin-right: 20rpx;">¥{{item.totalPrice}}</view>
							</view>
						</view>
						<!-- 上车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="bluering"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.startSiteName}}</view>
						</view>
						<!-- 下车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="redring"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.endSiteName}}</view>
						</view>
						<view class="CTKYBtnView">
							<button class="allBtn" @tap="open3(item.orderNumber,'2')">取消</button>
							<button class="allBtn" @click="keYunDetail(item)">详情</button>
							<button class="allBtn payBtn" @tap="keYunPay(item.orderNumber)">去支付</button>
						</view>
					</view>
				</view>
			</view>
			<empty-data :isShow="unfinishArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
		</view>

		<!-- 已取消 -->
		<view v-if="current === 4" style="margin-top: 20rpx;">
			<view v-for="(item,index) in cancelArr" :key="index">
				<!-- <view  v-if="item.title=='出租车-专线'"> -->
				<view v-if="item.title=='出租车-专线'">
					<view style="margin:30rpx;">
						<view v-if="item.appointment" style="width: 375rpx; height: 62rpx; border-radius: 32rpx;background-color: #06B4FD;display: flex;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;line-height: 62rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
						</view>
						<view style="background-color: #FFF;border-radius: 12rpx;margin:20rpx 0;padding: 20rpx 42rpx;box-shadow: 0 0 5rpx 0rpx #aaa;">
							<view style="display: flex;justify-content: space-between;">
								<view style="display: flex;">
									<image v-if='item.titleIndex == 1' style="width: 40rpx; height: 45rpx; " src="../../static/Order/Car1.png"></image>
									<view style="color: #2C2D2D; font-size: 34rpx;font-weight: bold;padding-left: 20rpx;">{{item.title}}</view>
								</view>
								<view style="color: #666666; font-size: 28rpx;">{{item.orderType}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 20rpx 0 15rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #06B4FD;background: #06B4FD;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.startAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 20rpx 0rpx ;">
								<view style="width: 8rpx;height: 8rpx;border: 4rpx solid #FC4646;background: #FC4646;border-radius: 100%;margin-left: 60rpx;"></view>
								<view style="color: #AAAAAA; font-size: 28rpx;padding-left: 20rpx;">{{item.endAddress}}</view>
							</view>
							<view style="display: flex;align-items: center;padding: 15rpx 0 15rpx 0rpx ;">
								<view style="color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;margin-left: 40rpx;">金额：</view>
								<view style=" color: #AAAAAA; font-size: 28rpx; padding-left: 20rpx;">{{item.money}}元</view>
							</view>
							<view style="display: flex;justify-content: flex-end;">
								<button class="Btn" @click="SpecialLineOrderDetail(item)" v-if="item.orderType=='进行中'|| item.orderType=='已完成'">详情</button>
								<!-- <button class="Btn" @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'">投诉</button> -->
								<button class="Btn payBtn" @click="GotoPay(item.orderNumber)" v-if="item.orderType=='未支付'">去支付</button>
								<button class="Btn" @click="DeleteSpecialLineOrder(item.orderNumber)" v-if="item.orderType=='已取消' || item.orderType=='已完成'">删除</button>
								<button class="Btn" @click="ConfirmCancel(item)" v-if="item.SpecialorderState==0|| item.SpecialorderState==1|| item.SpecialorderState==2||item.orderType=='未支付'">取消</button>
							</view>
						</view>
					</view>
				</view>

				<!-- 出租车 -->
				<view v-if="item.vehicleType=='出租车'">
					<view v-if="item.appointment" style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
						<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center; margin-left: 28rpx;">预定时间:{{changeTime(item.appointmentTime)}}</text>
					</view>
					<view class="whiteBg">
						<view style="display: flex; margin-top: -40rpx;">
							<image style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
							<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.vehicleType}}</view>
							<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{taxiOrderState(item.state)}}</view>
						</view>

						<view style="display: flex; margin-top: -72rpx;">
							<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
							<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{changeTime(item.orderTime)}}</view>
							<!-- <view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view> -->
						</view>

						<view style="display: flex; margin-top: -16rpx;">
							<view class="bluering"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.startAddress}}</view>
						</view>

						<view style="display: flex; margin-top: 36rpx;">
							<view class="redring"></view>
							<view style=" height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin-top: -12rpx;margin-left: 16rpx;">{{item.endAddress}}</view>
						</view>

						<view class="CTKYBtnView">
							<button class="allBtn" @click="going(item)" v-if="taxiOrderState(item.state)=='进行中'|| taxiOrderState(item.state)=='已完成' || taxiOrderState(item.state)=='未支付'">详情</button>
							<button class="allBtn" @click="detail(item.titleIndex)" v-if="taxiOrderState(item.state)=='已完成'">投诉</button>
							<button class="allBtn payBtn" @click="openBottomPopup" v-if="taxiOrderState(item.state)=='未支付'">去支付</button>
							<button class="allBtn" @tap="del(index)" v-if="taxiOrderState(item.state)=='已取消' || taxiOrderState(item.state)=='已完成'">删除</button>
							<button class="allBtn" @click="cancleOrder(item)" v-if="taxiOrderState(item.state)=='进行中'">取消</button>
						</view>
					</view>
				</view>


				<!-- 景区门票 -->
				<!-- 标签class命名：pd;全称：Purchase Date -->
				<!-- 内容class命名：at;全称：Admission ticket -->
				<view v-if="item.title=='景区门票' && item.isDel !== '是'">
					<view class="pd_view">下单时间：{{item.setOrderTime}}</view>
					<view class="at_view">
						<view class="at_titleView">
							<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
							<text class="at_title">{{item.ticketTitle}}</text>
							<text class="at_status">{{item.orderType}}</text>
						</view>
						<view class="at_contentView" style="display: flex;">
							<view v-for="(item2,index2) in item.ticketComment" :key="index2">
								<view class="at_contentFrame">{{item2}}</view>
							</view>
							<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
						</view>

						<view class="at_contentView">
							<text class="at_contentText">使用时间：&nbsp;{{item.orderDate}}</text>
							<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
						</view>

						<!-- 已退票 -->
						<view class="at_buttonView" v-if="item.orderType=='已退票'">
							<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="repurchase(item.ticketId)">再次预订</view>
						</view>

						<!-- 已取消 -->
						<view class="at_buttonView" v-if="item.orderType=='已取消'">
							<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="repurchase(item.ticketId)">再次预订</view>
						</view>

						<!-- 支付超时 -->
						<view class="at_buttonView" v-if="item.orderType=='支付超时'">
							<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="repurchase(item.ticketId)">再次预订</view>
						</view>
						
						<!-- 支付超时 -->
						<view class="at_buttonView" v-if="item.orderType=='已失效'">
							<view class="at_button at_btDelete" @click="open4(item.orderNumber,'3')">删除</view>
							<view class="at_button at_btDetails" @click="details(item.orderNumber)">详情</view>
							<view class="at_button at_btQrCode" @click="repurchase(item.ticketId)">再次预订</view>
						</view>
					</view>
				</view>

				<!-- 包车定制 -->
				<!-- 标签class命名：;全称：Purchase Date -->
				<!-- 内容class命名：cm;全称：custom made -->
				<view v-if="item.or_class=='包车-定制' || item.or_class=='包车-专线'">
					<view class="pd_view">{{item.or_date}}</view>
					<view class="cm_view">
						<view class="cm_titleView">
							<image class="cm_icon" src="../../static/Order/baoche.png" mode="aspectFill"></image>
							<text class="cm_title">{{item.or_class}}</text>
							<text class="cm_status">{{getBCstate(item.or_Type)}}</text>
						</view>
						<view class="cm_contentView" style="display: flex;">
							<text class="cm_contentPrice">¥{{item.cm_money}}</text>
						</view>
						<view class="cm_contentView">
							<text class="cm_contentText">发车时间：&nbsp;{{item.or_dateString}}</text>
							<text class="cm_contentText">上车点：&nbsp;{{item.or_boardingPoint}}</text>
							<text class="cm_contentText">目的地：&nbsp;{{item.or_destination}}</text>
							<view v-if="item.or_class=='包车-定制'"><text class="cm_contentText">包车天数：&nbsp;{{item.cm_day}}天</text></view>
						</view>


						<!-- 已取消 -->
						<view class="cm_buttonView" v-if="item.or_Type=='8'||item.or_Type=='9'">
							<view class="cm_button cm_btDelete" @click="open4(item.or_number,'4')">删除</view>
							<view class="cm_button cm_btDetails" @click="details2(item.or_number)">详情</view>

						</view>
					</view>
				</view>

				<!-- (已取消)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
				<view v-if="item.carType=='普通班车' || item.carType=='定制班车'">
					<!-- 预定日期 -->
					<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;">
						<view class="reserveDate">预定日期：{{item.bookTime}}</view>
					</view>
					<view class="kywhiteBg">
						<!-- 站点-状态 -->
						<view class="u-f-ac">
							<image style="width: 48rpx; height: 45rpx; margin-left: 20rpx;" src="../../static/Order/keche.png"></image>
							<view class="u-f-jsb" style="margin-left: 20rpx; width: 100%;">
								<view class="stationTitle">{{item.startSiteName}}-{{item.endSiteName}}</view>
								<view style="color: #666666; font-size: 28rpx;margin-right: 20rpx;">{{getCtkyOrderStatus(item.state)}}</view>
							</view>
						</view>
						<!-- 时间-价格 -->
						<view class="u-f-ac" style="margin-left: 96rpx; margin-top: 20rpx;color: #AAAAAA; font-size: 28rpx;">
							<image style="width: 22rpx; height: 22rpx;" src="../../static/Order/time.png"></image>
							<view class="u-f-jsb" style="margin-left: 15rpx; width: 100%;">
								<view>{{item.setOutTime}}</view>
								<view style="margin-right: 20rpx;">¥{{item.totalPrice}}</view>
							</view>
						</view>
						<!-- 上车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="bluering"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.startSiteName}}</view>
						</view>
						<!-- 下车点 -->
						<view class="u-f-ac" style="margin-top: 20rpx;">
							<view class="redring"></view>
							<view style="color: #AAAAAA; font-size: 28rpx;margin-left: 20rpx;">{{item.endSiteName}}</view>
						</view>

						<view class="CTKYBtnView">
							<button class="allBtn" @tap="keYunDetail(item)">详情</button>
							<!-- <button class="allBtn" @tap="del(index)">删除</button> -->
						</view>
					</view>
				</view>
			</view>
			<empty-data :isShow="cancelArr.length == 0" text="暂无数据" :image="noDataImage" textColor="#999999"></empty-data>
		</view>

		<!-- 二维码弹框 -->
		<uni-popup2 ref="popup5" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_title">扫码入园</text>
					<text class="box_icon jdticon icon-fork " @click="close5"></text>
				</view>
				<view class="box_qrCodeView">
					<canvas canvas-id="qrcode2" style="width: 160px; height: 160px; left: 174upx; margin-top: 24upx;" />
					<view class="box_qrCodeTextView">
						<text class="box_qrCodeText" style="font-size: 26upx; color: #AAAAAA;">若无出现二维码，请点击详情查看二维码</text>
						<text class="box_qrCodeText">取票码：{{orderIndexData.orderTicketNumber}}</text>
						<text class="box_qrCodeText">预订人数：{{orderIndexData.orderUserIndex}}人</text>
					</view>
				</view>
			</view>
		</uni-popup2>

		<!-- 客运二维码弹框代码 -->
		<uni-popup2 type="bottom" ref="popup">
			<swiper style="width: 100%;height: 500rpx;">
				<swiper-item v-for="(item,index) in QRCodeArray" :key="index">
					<view class="u-f-ac" style="border-top-right-radius: 20rpx;border-top-left-radius: 20rpx; width: 100%; background: #FFFFFF;display: block; text-align: center;">
						<!-- 显示二维码 -->
						<!-- <image src="../../static/Order/erweima.png" mode="aspectFill" lazy-load style="width: 250rpx; height: 250rpx;padding-top: 70rpx;"></image> -->

						<!-- 检票口/座位号 -->
						<view style="display: flex; align-items: center;justify-content: space-between; font-size: 32rpx;color: #2C2D2D; padding: 20rpx 80rpx;font-weight: 300;">
							<view>检票口：{{item.checkPlace}}</view>
							<view>座位号：{{item.seatNum}}</view>
						</view>

						<!-- 发车时间/车牌号 -->
						<view style="display: flex; align-items: center;justify-content: space-between;font-size: 32rpx;color: #2C2D2D; padding: 0 80rpx;padding-bottom: 60rpx;">
							<view>发车时间：{{item.lunchTime}}</view>
							<view>车牌号：{{item.carNum}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</uni-popup2>

		<!-- 退票弹框 -->
		<uni-popup2 ref="popup2" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_title">退订规则</text>
					<text class="box_icon jdticon icon-fork " @click="close2"></text>
				</view>
				<view class="box_refundView">
					<!-- <text class="box_refundText">您可以在2019年11月04日18:00前免费取消或变更订单 ；在2019年11月04日18:00之后变更或取消，将收取全 额费用作为罚金。</text> -->
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您还确定退票吗?</text>
						<text class="box_refundContentText">如若需退票，请点击确认</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="refund">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>

		<!-- 取消弹框 -->
		<uni-popup2 ref="popup3" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_icon jdticon icon-fork " @click="close3"></text>
				</view>
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您确认取消订单吗?</text>
						<text class="box_refundContentText">若确认取消，请点击确认</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="cancel">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>

		<!-- 删除弹框 -->
		<uni-popup2 ref="popup4" type="bottom">
			<view class="box_Vlew">
				<view class="box_titleView">
					<text class="box_icon jdticon icon-fork " @click="close4"></text>
				</view>
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您确认删除订单吗?</text>
						<text class="box_refundContentText">删除订单后，订单内将不再展示该订单</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="del">确认</text>
					</view>
				</view>
			</view>
		</uni-popup2>

		<!-- 出租车订单支付弹框 -->
		<uni-popup ref="bottomPopup" :maskClick='false' type="bottom">
			<form @submit="payment">
				<view style="background-color: #FFFFFF;padding: 20px;box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);border-top-left-radius: 9px;border-top-right-radius: 9px;">
					<!--<view style="flex-direction: row;justify-content: flex-end;	">
							</view> -->
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view>
							<!-- 勿删 -->
						</view>
						<view>
							<text style="font-size:38rpx;font-family:Source Han Sans SC;font-weight:400;color:#2C2D2D;">支付{{driverName}}车费</text>
						</view>
						<view>
							<uni-icons @click="closePayment" type="closeempty" size="19"></uni-icons>
						</view>
					</view>
					<view style="margin-top: 30px;display: flex;flex-direction: row;justify-content: center;align-items: center;">
						<text style="font-size:60rpx;font-family:Source Han Sans SC;font-weight:bold;color:#2C2D2D;">{{totalPrice}}</text><text
						 style="font-size:34rpx;font-family:Source Han Sans SC;font-weight:Light;color:#2C2D2D;">元</text>
					</view>
					<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
						<text @click="payDetail" style="font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:#727272;">费用明细</text>
						<uni-icons @click="payDetail" type="arrowright" size="15" color="#727272"></uni-icons>
					</view>
					<view style="border-top-width: 1px;border-color: #EAEAEA;margin-top: 20px;padding-top: 20px;">
						<radio-group name='chooseType'>
							<view v-for='item in payType' :key='item.typeName' style="display: flex;flex-direction: row;justify-content: space-between;padding-bottom: 20px;">
								<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
									<image :src='item.iconPath' style="height: 42rpx;width: 42rpx;"></image>
									<text style="margin-left: 5rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:#000000;">{{item.typeName}}</text>
								</view>
								<view>
									<radio :value="item.value" :checked="item.checked" :color="item.typeColor" />
								</view>
							</view>
						</radio-group>
					</view>
					<view>
						<button form-type="submit" style="width: 100%;height: 100rpx;background-color: #FE4644;color: #FFFFFF;">
							<text style="font-size:34rpx;font-family:Source Han Sans SC;font-weight:400;color:#FFFFFF;">确定支付{{totalPrice}}元</text>
						</button>
					</view>
				</view>
			</form>
		</uni-popup>
	</view>
</template>

<script>
	/**
	 * 注意事项：1.请求订单数据要把自己请求的数据加到info数组 2.其他事项看注释
	 * */
	import uniSegmentedControl from "@/components/Order/uni-segmented-control/uni-segmented-control.vue";
	import uniPopup from "@/components/Order/uni-popup/uni-popup.vue";
	import uniIcons from "@/components/Order/uni-icons/uni-icons.vue";
	import uniPopup2 from "@/components/Order/uni-popup/uni-popup2.vue";
	import emptyData from "@/components/Order/emptyData/emptyData.vue"; //无数据时显示内容
	import $taxi from '../../common/Czc.js';
	import $privateTaxi from "../../common/Czcprivate.js"; //出租车专线
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	import uQRCode from "@/common/uqrcode.js"
	import $bcfw from '@/common/BCFW/bcfw.js'
	import $KyInterface from "@/common/Ctky.js"
	export default {
		components: {
			uniSegmentedControl,
			uniPopup,
			//加载多方弹框组件
			uniPopup2,
			uniIcons,
			emptyData
		},
		data() {
			return {
				TaxiCost: 0, //价格
				countdown: 0,
				items: ['全部', '已完成', '进行中', '未支付', '已取消'],
				current: 0,
				index: 1,
				exitindex: 0, //订单判断值
				ticketOrderNumber: '', //门票订单编号
				orderIndex: 0, //订单调用数值
				orderIndexData: '', //二维码订单数据
				QRCodeArray: [{
					checkPlace: 'A5',
					seatNum: 'E1',
					lunchTime: '18:00',
					carNum: '闽C12345'
				}],
				info: [], //请求服务器订单列表
				userInfo: '', //个人信息
				finishArr: [],
				goingArr: [],
				unfinishArr: [],
				cancelArr: [],
				keYunTicketArray: [], //客运订单
				keYunTicket: [], //客运订单
				keYunPaymentData: '', //客运支付
				driverName: '张师傅', //司机姓名
				totalPrice: 32.5,
				orderType1: '',
				ctkyOrderNum: '', //传统客运订单号（退票需要）
				payType: [{
						typeName: '微信',
						typeColor: '#00C805',
						iconPath: '../../static/CZC/Wechatpay.png',
						value: 'wxpay',
						checked: true,
					},
					{
						typeName: '支付宝',
						typeColor: '#0EBDFF',
						iconPath: '../../static/CZC/Alipay.png',
						value: 'alipay',
						checked: false
					}
				],
				specialLineInfo: '',
				noDataImage:'',//客运弹框背景图
			}
		},
		onLoad: function() {
			var that = this;
			//获取客运弹框图片
			that.getPicture();
			//读取用户ID
			uni.getStorage({
				key: 'userInfo',
				success: function(data) {
					that.userInfo = data.data;
				}
			})
		},
		onShow: function() {
			//请求景区门票数据
			this.toFinished();
			//客运刷新状态
			if(this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
		},
		onPullDownRefresh: function() {
			this.toFinished();
			//客运刷新状态
			if(this.ctkyOrderNum) {
				this.getTicketPaymentInfo_ticketIssue(this.ctkyOrderNum);
			}
		},
		methods: {
			changeTime: function(value) { //时间格式转换
				var date = new Date(value + "+08:00");
				var year = date.getFullYear();
				var mounth = date.getMonth() + 1;
				if (mounth < 10) {
					mounth = "0" + mounth;
				}
				var day = date.getDate();
				if (day < 10) {
					day = "0" + day;
				}
				var hours = date.getHours();
				if (hours < 10) {
					hours = "0" + hours;
				}
				var minutes = date.getMinutes();
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				return year + '-' + mounth + '-' + day + " " + hours + ':' + minutes;
			},
			//-------------------------支付页面-------------------------
			payDetail: function() {
				//支付详情
				uni.navigateTo({
					url: '../CZC/PriceDetail'
				});
			},
			closePayment: function() {
				//关闭
				let that = this;
				that.closeBottomPopup();
			},
			payment: function(e) {
				//支付
				let that = this;
				var timeStamp = new Date().getTime();
				uni.requestPayment({
					provider: e.detail.value.chooseType,
					orderInfo: '111',
					timeStamp: timeStamp,
					nonceStr: '',
					package: '',
					paySign: '',
					success: function(res) {
						// console.log(res);
						uni.navigateTo({
							url: '../CZC/PaymentSuccess'
						});
					},
					fail: function(res) {
						// console.log(res);
						uni.navigateTo({
							url: '../CZC/PaymentFail'
						});
					}
				});
			},
			openBottomPopup: function() {
				this.$nextTick(function() {
					this.$refs['bottomPopup'].open();
				});
			},
			closeBottomPopup: function() {
				this.$nextTick(function() {
					this.$refs['bottomPopup'].close();
				});
			},
			back: function() {
				var that = this;
				uni.switchTab({
					url: '/pages/Home/Index',
				});
			},
			//------------------------------------------------客运开始------------------------------------------------
			//-------------------------客运用户详情-------------------------
			getPicture() {
				var that = this;
				uni.request({
					url:$KyInterface.KyInterface.Ky_AddPicture.Url,
					method:$KyInterface.KyInterface.Ky_AddPicture.method,
					header:$KyInterface.KyInterface.Ky_AddPicture.header,
					data:{
						model:0,
					},
					success(res) {
						if(res.data.status == true) {
							that.noDataImage = res.data.data[2].imageUrl
						}else {
							console.log(res.data.status)
						}
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			getUserInfo() {
				var that = this;
				//读取用户ID
				uni.getStorage({
					key: 'userInfo',
					success: function(data) {
						that.userInfo = data.data;
						console.log('用户信息', that.userInfo);
						that.getKeYunOrderInfo();
						that.getArrayInfo();
					},
					fail(res) {
						// console.log('错误', res);
					}
				})
			},

			//-------------------------请求客运订单数据-------------------------
			getKeYunOrderInfo: function() {
				var that = this;
				uni.request({
					url:$KyInterface.KyInterface.Ky_getKeYunOrderInfo.Url,
					method:$KyInterface.KyInterface.Ky_getKeYunOrderInfo.method,
					header:$KyInterface.KyInterface.Ky_getKeYunOrderInfo.header,
					data: {
						clientID: that.userInfo.userId
					},
					success: (res) => {
						uni.stopPullDownRefresh();
						console.log('11111', res.data);
						that.ctkyOrderNum = res.data.orderNumber;
						if (res.data.status == true) {
							for (var i = 0; i < res.data.data.length; i++) {
								that.info.push(res.data.data[i]);
							}
							for (var i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].state == '5') {
									that.finishArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '4') {
									that.goingArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '7') {
									that.unfinishArr.push(res.data.data[i]);
								} else if (res.data.data[i].state == '6' || res.data.data[i].state == '9') {
									that.cancelArr.push(res.data.data[i]);
								}
							}
							//出租车请求数据
							that.loadczcData();
						} else if (res.data.status == false) {
							// console.log('无客运车票数据');
							//出租车请求数据
							that.loadczcData();
						}
					},
					fail(res) {
						//请求数据失败，停止刷新
						uni.stopPullDownRefresh();
						// console.log('错误', res);
					}
				})
			},
			//-------------------------判断订单状态-------------------------
			getCtkyOrderStatus(param) {
				if (param == 4) {
					return '进行中'
				} else if (param == 5) {
					return '已完成'
				} else if (param == 6) {
					return '已退票'
				} else if (param == 7) {
					return '未支付'
				} else if (param == 9) {
					return '已撤销'
				} else if (param == 22) {
					return '已改签'
				}
			},
			//-------------------------跳转到详情页-------------------------
			keYunDetail: function(res) {
				console.log(res)
				uni.navigateTo({
					url: '../../pages_CTKY/pages/CTKY/TraditionSpecial/Order/orderDetail?orderInfo=' + JSON.stringify(res)
				})
			},
			// -------------------------客运退票-------------------------
			keYunRefundTicket: function(orderNumber) {
				console.log(orderNumber)
				var that = this;
				uni.request({
					url:$KyInterface.KyInterface.Ky_RefundTicket.Url,
					method:$KyInterface.KyInterface.Ky_RefundTicket.method,
					header:$KyInterface.KyInterface.Ky_RefundTicket.header,
					data: {
						orderNumber: orderNumber,
					},
					success: (respones) => {
						console.log('删除结果', respones)
						if (respones.data.status == true) {
							uni.hideLoading()
							uni.showToast({
								title: '退票成功'
							})
							this.$refs.popup2.close()
							uni.startPullDownRefresh();
						} else {
							uni.hideLoading()
							uni.showToast({
								title: '退票失败',
								icon: 'none'
							})
							uni.startPullDownRefresh();
						}
					},
					fail: (respones) => {
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
					}
				})
			},
			// -------------------------客运取消-------------------------
			keYunCancelTicket: function(orderNumber) {
				console.log(orderNumber)
				var that = this;
				uni.request({
					url:$KyInterface.KyInterface.Ky_CancelTicket.Url,
					method:$KyInterface.KyInterface.Ky_CancelTicket.method,
					header:$KyInterface.KyInterface.Ky_CancelTicket.header,
					data: {
						orderNumber: orderNumber,
					},
					success: (respones) => {
						// alert(respones.data)
						console.log('取消结果', respones)
						if (respones.data.status == true) {
							uni.hideLoading()
							uni.showToast({
								title: '取消成功'
							})
							this.$refs.popup3.close()
							uni.startPullDownRefresh();
						} else {
							uni.hideLoading()
							uni.showToast({
								title: '取消失败',
								icon: 'none'
							})
							this.$refs.popup3.close()
							uni.startPullDownRefresh();
						}
					},
					fail: (respones) => {
						// alert(respones.data.msg)
						uni.hideLoading()
						console.log(respones)
						uni.showToast({
							title: '服务器异常，请联系客服'
						})
						this.$refs.popup3.close()
					}
				})
			},
			// -------------------------客运支付-------------------------
			keYunPay: function(orderNumber) {
				// var orderInfo = this.info[index];
				console.log(orderNumber);
				this.getTicketPaymentInfo(orderNumber);
			},
			//--------------------------获取车票支付参数--------------------------
			getTicketPaymentInfo: function(orderNumber) {
				// console.log('支付参数', orderNumber);
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading();
				timer = setInterval(function() {
					uni.request({
						url:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.Url,
						method:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.method,
						header:$KyInterface.KyInterface.Ky_getTicketPaymentInfo.header,
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log('支付参数返回数据', res);
							if (res.data.status == true) {
								uni.hideLoading();
								var info = JSON.parse(res.data.msg);
								if (info.oldState == '结束') {
									uni.showToast({
										title: '订单已支付',
										icon: 'none'
									})
									clearInterval(timer);
								} else {
									clearInterval(timer);
									that.keYunPaymentData = JSON.parse(res.data.msg);
									// console.log('支付参数返回数据', that.keYunPaymentData);
									that.keYunPayment();
								}
							} else if (res.data.status == false) {
								uni.hideLoading();
								var info = JSON.parse(res.data.msg);
								if (info.oldState == '结束') {
									uni.showToast({
										title: '订单已超时',
										icon: 'none'
									})
									clearInterval(timer);
								} else {
									uni.showModal({
										content: info.oldState,
										showCancel: false
									})
								}
							}
						},
						fail(res) {
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//--------------------------调起支付--------------------------
			keYunPayment: function() {
				// console.log('点击了支付');
				var that = this;
				if (that.isPayEnable == 0) {
					uni.showToast({
						title: '正在获取支付,请稍等...',
						icon: 'none'
					})
				} else {
					// #ifdef H5
					WeixinJSBridge.invoke('getBrandWCPayRequest', {
						"appId": that.keYunPaymentData.jsapi.AppId, //公众号名称，由商户传入
						"timeStamp": that.keYunPaymentData.jsapi.TimeStamp, //时间戳
						"nonceStr": that.keYunPaymentData.jsapi.NonceStr, //随机串
						"package": that.keYunPaymentData.jsapi.Package, //扩展包
						"signType": that.keYunPaymentData.jsapi.SignType, //微信签名方式:MD5
						"paySign": that.keYunPaymentData.jsapi.PaySign //微信签名
					}, function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							//支付成功再进计时器查询状态
							// location.href = "/Order/BaseCallback/" + flowID;
							uni.showToast({
								title: '支付成功',
								icon: 'none',
							})
							uni.startPullDownRefresh();
						} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
							uni.showToast({
								title: '您取消了支付，请重新支付',
								icon: 'none',
							})
						} else if (res.err_msg == "get_brand_wcpay_request:faile") {
							uni.showToast({
								title: '支付失败，请重新支付',
								icon: 'none',
							})
						} else {
							// location.href = "/Coach/GetCoach";
						}
					});
					// #endif


					// #ifdef APP-PLUS
					// console.log('进入app支付', that.paymentData);
					uni.hideLoading()
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: {
							appid: that.keYunPaymentData.jsapi.AppId,
							timestamp: that.keYunPaymentData.jsapi.TimeStamp,
							noncestr: that.keYunPaymentData.jsapi.NonceStr,
							package: 'Sign=WXPay',
							sign: that.keYunPaymentData.jsapi.PaySign,
							partnerid: that.keYunPaymentData.jsapi.PartnerId,
							prepayid: that.keYunPaymentData.jsapi.PrepayId,
						},
						success: function(res) {
							if (res.errMsg == 'requestPayment:ok') { //成功
								uni.showToast({
									title: '支付成功',
									icon: 'none',
									success: function() {
										uni.startPullDownRefresh();
									}
								})
							} else if (res.errMsg == 'requestPayment:fail') { //错误
								uni.showToast({
									title: '支付失败，请重新支付',
									icon: 'none',
								})
							}
						},

						fail: function(ee) {
							console.log(ee)
							if (ee.errMsg == 'requestPayment:fail canceled') { //用户取消
								uni.showToast({
									title: '您取消了支付',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: ee.errMsg,
									icon: 'none',
									duration: 3000
								})
							}
						}
					})
					// #endif
				}
			},
			//--------------------------成功之后重新获取车票支付参数--------------------------
			getTicketPaymentInfo_ticketIssue: function(orderNumber) {
				var that = this;
				var timer = null;
				that.timer = timer;
				uni.showLoading({
					title: '加载中...'
				});
				timer = setInterval(function() {
					uni.request({
						url: 'http://zntc.145u.net/api/ky/SellTicket_Flow',
						method: 'GET',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							orderNumber: orderNumber,
						},
						success: (res) => {
							console.log('支付参数返回数据', res);
							if (res.data.status == true) {
								uni.hideLoading();
								clearInterval(timer);
							} else if (res.data.status == false) {
								clearInterval(timer);
							}
						},
						fail(res) {
							uni.hideLoading();
							//回调失败，取消定时器
							clearInterval(timer);
						}
					})
				}, 3000)
			},
			//-------------------------客运二维码弹框-------------------------
			QRCodeTap: function() {
				this.$refs.popup.open()
			},
			//------------------------------------------------客运结束------------------------------------------------
			onClickItem(e) { //tab点击事件
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},

			//-------------------------出租车开始-------------------------
			loadczcData: function() {

				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: (res1) => {
						this.userInfo = res1.data;
						uni.request({
							url: 'http://zntc.145u.net/api/taxi/GetAllExpressOrder_Passenger',
							data: {
								userId: that.userInfo.userId,
							},
							method: 'POST',
							success: (res) => {
								uni.stopPullDownRefresh();
								if (res.data.status) {
									for (var i = 0; i < res.data.data.length; i++) {
										that.info.push(res.data.data[i]);
										if (res.data.data[i].state == "0" || res.data.data[i].state == "1" || res.data.data[i].state == "2" ||
											res.data.data[i].state == "3" || res.data.data[i].state == "4") {
											that.goingArr.push(res.data.data[i]);
										} else if (res.data.data[i].state == "5" || res.data.data[i].state == "9") {
											that.unfinishArr.push(res.data.data[i]);
										} else if (res.data.data[i].state == "7" || res.data.data[i].state == "8") {
											that.cancelArr.push(res.data.data[i]);
										} else if (res.data.data[i].state == 6) {
											that.finishArr.push(res.data.data[i]);
										}
									}
									//包车请求数据
									this.getOrderList();
								} else {
									//包车请求数据
									this.getOrderList();
								}
							}
						})
					},
					fail() {
						//请求数据失败，停止刷新
						uni.stopPullDownRefresh();
						uni.showToast({
							title: '暂无订单数据，请先登录后查看订单',
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
			taxiOrderState(param) {
				if (param == 0 || param == 1 || param == 2 || param == 3 || param == 4) {
					return '进行中';
				} else if (param == 5 || param == 9) {
					return '未支付';
				} else if (param == 7 || param == 8) {
					return '已取消';
				} else if (param == 6) {
					return '已完成';
				}
			},
			//-------------------------出租车订单取消-------------------------
			cancleOrder: function(item) {
				//取消订单
				let that = this;
				//关闭所有的定时器
				uni.showModal({
					title: "取消订单",
					content: "您是否取消订单",
					success(res) {
						if (res.confirm) {
							getApp().globalData.closeUpload();
							uni.request({
								url: $taxi.Interface.CancelExpressOrderByOrderNum_Passenger.value,
								method: $taxi.Interface.CancelExpressOrderByOrderNum_Passenger.method,
								data: {
									OrderNumber: item.orderNumber,
									userId: that.userInfo.userId,
								},
								success: function(res) {
									let data = res.data.data;
									if (res.data.status) {
										uni.showToast({
											title: '取消成功',
											icon: 'none',
											success: function() {}
										});
										setTimeout(function() {
											uni.startPullDownRefresh();
										}, 1500)
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										})
									}
								},
								fail: function(res) {
									uni.showToast({
										title: '网络连接失败',
										icon: 'none'
									})
									// console.log(res);
								}
							});
						}

					}
				})
			},
			//-------------------------出租车专线代码开始-------------------------
			getOrderList: function() { //获取出租车专线订单
				var that = this;
				uni.request({
					url: $privateTaxi.Interface.QuerySpecialLineOrderByUserID_Passenger.value,
					method: $privateTaxi.Interface.QuerySpecialLineOrderByUserID_Passenger.method,
					data: {
						UserID: that.userInfo.userId,
					},
					success: function(res) {
						uni.stopPullDownRefresh();
						if (res.data.status) {
							for (var i = 0; i < res.data.data.length; i++) {
								var data = res.data.data[i];
								var orderType = '';
								if (data.State == 0 || data.State == 1 || data.State == 2 || data.State == 3 || data.State == 4) {
									orderType = '进行中';
								} else if (data.State == 5 || data.State == 9) {
									orderType = '未支付';
								} else if (data.State == 7 || data.State == 8) {
									orderType = '已取消';
								} else if (data.State == 6) {
									orderType = '已完成';
								}
								var obj = {
									title: '出租车-专线',
									titleIndex: '1',
									SpecialorderState: data.State,
									time: data.OrderTime,
									orderType: orderType,
									appointmentTime: data.AppointmentTime,
									money: data.EstimatePrice,
									startAddress: data.StartAddress,
									endAddress: data.EndAddress,
									orderNumber: data.OrderNumber,
									appointment: true,
								}
								that.info.push(obj);
								if (orderType == '已完成') {
									that.finishArr.push(obj);
								} else if (orderType == '等待司机接单' || orderType == '进行中' || orderType == '待上车') {
									that.goingArr.push(obj);
								} else if (orderType == '未支付') {
									that.unfinishArr.push(obj);
								} else if (orderType == '已取消') {
									that.cancelArr.push(obj);
								}
							}
						}
					},
					fail() {
						uni.stopPullDownRefresh();
					}
				})
			},
			CancelSpecialLineOrder: function(OrderNumber) { //取消出租车专线订单
				let that = this;
				uni.showModal({
					content: "您确定要取消订单吗",
					success(res) {
						if (res.confirm) {
							uni.request({
								url: $privateTaxi.Interface.CancelSpecialLineOrder_Passenger.value,
								method: $privateTaxi.Interface.CancelSpecialLineOrder_Passenger.method,
								data: {
									OrderNumber: OrderNumber,
									UserID: that.userInfo.userId,
								},
								success(res) {
									if (res.data.status) {
										uni.showToast({
											title: res.data.msg,
											icon: "none"
										})
										uni.startPullDownRefresh();
									}
								},
								fail() {
									uni.showToast({
										title: "网络连接失败",
										icon: "none"
									})
								}
							})
						}
					}
				})
			},
			SpecialLineOrderDetail: function(item) { //专线车详情
				if (item.orderType == '进行中') {
					uni.navigateTo({
						url: '../../pages_CZC/pages/CZC/WaitTakeOrder?orderNumber=' + item.orderNumber,
					})
				} else {
					uni.navigateTo({
						url: '/pages/order/SpecialLineDetail?orderNumber=' + item.orderNumber,
					})
				}
			},
			DeleteSpecialLineOrder: function(OrderNumber) { //专线车删除订单
				let that = this;
				uni.showModal({
					content: "您确定要删除订单吗",
					success(res) {
						if (res.confirm) {
							uni.request({
								url: $privateTaxi.Interface.DeleteSpecialLineOrder_Passenger.value,
								method: $privateTaxi.Interface.DeleteSpecialLineOrder_Passenger.method,
								data: {
									OrderNumber: OrderNumber,
									UserID: that.userInfo.userId,
								},
								success(res) {
									// console.log(res)
									if (res.data.status) {

										uni.showToast({
											title: res.data.msg,
											icon: "none"
										})
										uni.startPullDownRefresh();
									}
								}
							})
						}
					}
				})
			},
			GotoPay: function(value) {
				uni.navigateTo({
					url: "../../pages_CZC/pages/CZC/PrivateTaxiPayment?orderNumber=" + value
				})
			},
			CheckPayState: function(orderNumber) { //检测支付状态
				let that = this;
				uni.request({
					url: $privateTaxi.Interface.CheckPayState.value,
					method: $privateTaxi.Interface.CheckPayState.method,
					data: {
						orderNumber: orderNumber
					},
					success(res) {
						console.log(res);
						if (res.data.status) {
							that.CancelSpecialLineOrder1(orderNumber);
						} else {
							uni.showToast({
								title: '取消失败',
								icon: 'none',
							});
						}
					},
					fail() {
						uni.showToast({
							title: '网络连接失败',
							icon: 'none',
						});
					}
				})
			},
			BouncePay: function(orderNumber) {
				let that = this;
				uni.request({
					url: $privateTaxi.Interface.BouncePay.value,
					method: $privateTaxi.Interface.BouncePay.method,
					data: {
						orderNumber: orderNumber,
						// price:that.FactPayPrice
						price: 0.01
					},
					success(res) {
						if (res.data.status) {
							that.CheckPayState(orderNumber)
						} else {
							uni.showToast({
								title: '取消失败',
								icon: 'none',
							});
						}
					},
					fail(res) {
						uni.showToast({
							title: '网络连接失败',
							icon: 'none',
						});
					}
				})
			},
			CancelSpecialLineOrder1: function(orderNumber) {
				//取消订单
				let that = this;
				uni.request({
					url: $privateTaxi.Interface.CancelSpecialLineOrder_Passenger.value,
					method: $privateTaxi.Interface.CancelSpecialLineOrder_Passenger.method,
					data: {
						OrderNumber: orderNumber,
						UserId: that.userInfo.userId,
					},
					success: function(res) {
						let data = res.data.data;
						if (res.data.status) {
							uni.showToast({
								title: '取消成功',
								icon: 'none',
							});
							uni.startPullDownRefresh();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: function(res) {
						uni.showToast({
							title: '网络连接失败',
							icon: 'none'
						})
					}
				});

			},
			ConfirmCancel: function(value) {
				let that = this;
				uni.showModal({
					title: "取消订单",
					content: "您是否取消订单",
					success(res) {
						if (res.confirm) {
							if(value.SpecialorderState==0||value.SpecialorderState==1||value.SpecialorderState==2){
								that.BouncePay(value.orderNumber);
							}else{
								that.CancelSpecialLineOrder1(value.orderNumber);
							}
						}
					},
					fail: function(res) { 
						uni.showToast({
							title: '网络连接失败',
							icon: 'none'
						})
					}
				})
			},

			//-------------------------出租车专线代码结束-------------------------


			//-------------------------景区门票代码开始-------------------------
			//-------------------------请求订单列表-------------------------
			toFinished: function() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						uni.request({
							url: $lyfw.Interface.spt_RequestTicketsList.value,
							method: $lyfw.Interface.spt_RequestTicketsList.method,
							data: {
								userId: this.userInfo.userId
							},
							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								uni.stopPullDownRefresh();
								if (res.data.msg == '订单获取成功') {
									that.info = res.data.data;
									that.finishArr = [];
									that.goingArr = [];
									that.unfinishArr = [];
									that.cancelArr = [];
									if (that.info) {
										for (var i = 0; i < that.info.length; i++) {
											if (that.info[i].orderType == '已完成' || that.info[i].orderType == '已使用') {
												that.finishArr.push(that.info[i]);
											} else if (that.info[i].orderType == '进行中' || that.info[i].orderType == '待使用') {
												that.goingArr.push(that.info[i]);
											} else if (that.info[i].orderType == '未支付' || that.info[i].orderType == '待支付') {
												that.unfinishArr.push(that.info[i]);
											} else if (that.info[i].orderType == '已取消' || that.info[i].orderType == '已退票' || that.info[i].orderType == '支付超时' || that.info[i].orderType == '已失效') {
												that.cancelArr.push(that.info[i]);
											}
										}
									}
									//客运
									//获取用户信息
									that.getUserInfo();
								} else {
									that.info = [];
									that.finishArr = [];
									that.goingArr = [];
									that.unfinishArr = [];
									that.cancelArr = [];
									that.getUserInfo();
								}
							}
						})
					},
					fail() {
						//请求数据失败，停止刷新
						uni.stopPullDownRefresh();
						uni.showToast({
							title: '暂无订单数据，请先登录后查看订单',
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
			//-------------------------景区门票-打开二维码弹框-------------------------
			open5: function(e) {
				uni.showLoading({
					title: '生成中...'
				})
				this.orderIndexData = e;
				this.make(e);
			},
			//-------------------------景区门票-关闭二维码弹框-------------------------
			close5() {
				this.$refs.popup5.close()
			},
			//-------------------------景区门票-打开退票弹框-------------------------
			open2: function(e, exitindex) {
				this.ticketOrderNumber = e;
				this.exitindex = exitindex;
				this.$refs.popup2.open()
			},
			//-------------------------景区门票-关闭退票弹框-------------------------
			close2() {
				this.$refs.popup2.close()
			},
			//-------------------------景区门票-打开取消弹框-------------------------
			open3(e, exitindex) {
				this.ticketOrderNumber = e;
				this.exitindex = exitindex;
				this.$refs.popup3.open()
			},
			//-------------------------景区门票-关闭取消弹框-------------------------
			close3() {
				this.$refs.popup3.close()
			},
			//-------------------------景区门票-打开删除弹框-------------------------
			open4(e, exitindex) {
				this.ticketOrderNumber = e;
				this.exitindex = exitindex;
				this.$refs.popup4.open()
			},
			//-------------------------景区门票-关闭删除弹框-------------------------
			close4() {
				this.$refs.popup4.close()
			},


			//-------------------------景区门票-详情跳转-------------------------
			details(e) {
				uni.navigateTo({
					url: '../../pages_LYFW/pages/LYFW/scenicSpotTickets/orderDetails?orderNumber=' + e,
				})
			},
			//-------------------------景区门票-去支付跳转-------------------------
			topay(e) {
				uni.navigateTo({
					url: '../../pages_LYFW/pages/LYFW/scenicSpotTickets/selectivePayment?orderNumber=' + e
				})
			},
			//-------------------------景区门票-再次购买-------------------------
			repurchase(e) {
				uni.navigateTo({
					url: '../../pages_LYFW/pages/LYFW/scenicSpotTickets/ticketsDetails?ticketId=' + JSON.stringify(e)
				})
			},
			//-------------------------景区门票-退票-------------------------
			refund: function() {
				uni.showLoading({
					title: '请求退票中...'
				})
				var that = this
				if (this.exitindex == '2') {
					this.keYunRefundTicket(that.ticketOrderNumber)
				} else if (this.exitindex == '3') {
					uni.request({
						url: $lyfw.Interface.spt_BounceTickets.value,
						method: $lyfw.Interface.spt_BounceTickets.method,
						data: {
							orderNumber: this.ticketOrderNumber,
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							uni.hideLoading()
							uni.showToast({
								title: '退票成功',
								icon: 'success',
							})
							this.close2()
							this.toFinished();
						},
						fail:function(){
							uni.showToast({
								title: '退票失败',
								icon: 'none',
							})
							uni.hideLoading()
						}
					})
				}


			},

			//-------------------------景区门票-取消-------------------------
			cancel: function() {
				if (this.exitindex == '3') {
					uni.request({
						url: $lyfw.Interface.spt_CancelTickets.value,
						method: $lyfw.Interface.spt_CancelTickets.method,
						data: {
							orderNumber: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							if (e.data.msg == '订单取消成功') {
								uni.showToast({
									title: '订单取消成功',
									icon: 'none'
								})
								this.close3();
								this.toFinished();
							} else if (e.data.msg == '订单取消失败') {
								uni.showToast({
									title: '订单取消失败',
									icon: 'none'
								})
								this.close3();
								this.toFinished();
							}
						},
						fail() {
							uni.showToast({
								title: '取消失败！请检查网络状态',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				} else if (this.exitindex == '4') {
					console.log(this.ticketOrderNumber);
					uni.request({
						url: $bcfw.Interface.spt_CancelTickets.value,
						method: $bcfw.Interface.spt_CancelTickets.method,
						data: {
							or_number: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							console.log(e)
							if (e.data.status == true) {
								uni.showToast({
									title: '订单取消成功',
									icon: 'none'
								})
								this.close3();
								this.toFinished();
							} else if (e.data.status == false) {
								uni.showToast({
									title: '订单取消失败',
									icon: 'none'
								})
								this.close3();
								this.toFinished();
							}
						},
						fail() {
							uni.showToast({
								title: '取消失败！请检查网络状态',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				} else if (this.exitindex == '2') {
					this.keYunCancelTicket(this.ticketOrderNumber);
				}
			},

			//-------------------------景区门票-删除-------------------------
			del: function() {
				if (this.exitindex == '3') {
					uni.request({
						url: $lyfw.Interface.spt_DeleteTickets.value,
						method: $lyfw.Interface.spt_DeleteTickets.method,
						data: {
							orderNumber: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 1500,
							})
							this.close4();
							this.toFinished();
						},
						fail() {
							uni.showToast({
								title: '删除失败！订单已删除',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				} else if (this.exitindex == '4') {
					uni.request({
						url: $bcfw.Interface.spt_DeleteTickets.value,
						method: $bcfw.Interface.spt_DeleteTickets.method,
						data: {
							or_number: this.ticketOrderNumber
						},
						header: {
							'content-type': 'application/json'
						},
						success: (e) => {
							// console.log(e)
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 1500,
							})
							this.close4();
							this.toFinished();
						},
						fail() {
							uni.showToast({
								title: '删除失败！订单已删除',
								icon: 'none',
								duration: 1500,
							})
						}
					})
				}

			},

			//-------------------------生成二维码-------------------------
			make: function(e) {
				console.log(e)
				uQRCode.make({
					canvasId: 'qrcode2',
					componentInstance: this,
					text: e.orderTicketNumber,
					size: 160,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					correctLevel: uQRCode.defaults.correctLevel,
				})
				uni.hideLoading()
				this.$refs.popup5.open()
			},
			//-------------------------景区门票代码结束-------------------------

			detail: function(item) {
				if (item == 1) {
					uni.navigateTo({
						url: '/pages/order/OrderDetail',
					})
				}
			},

			going: function(item) {
				// console.log(item)
				var state = this.taxiOrderState(item.state)
				// console.log(state)
				if (item.vehicleType == '出租车') {
					if (item.state == '0' || item.state == '1' || item.state == '2' || item.state == '3' || item.state == '4') {
						uni.navigateTo({
							url: '/pages/CZC/CallAndDrive?orderNumber=' + item.orderNumber,
						})
					} else {
						uni.navigateTo({
							url: '/pages/order/OrderDetail?orderNumber=' + item.orderNumber,
						})
					}
				}
			},

			//-------------------包车订单添加-------------------------
			getArrayInfo: function() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						uni.request({
							url: $bcfw.Interface.spt_RequestTicketsList.value,
							method: $bcfw.Interface.spt_RequestTicketsList.method,
							data: {
								userId: this.userInfo.userId
							},

							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								console.log(this.userInfo.userId);
								console.log(res);
								if (res.data.msg == '订单查询完成') {
									for (var i = 0; i < res.data.data.length; i++) {
										that.info.push(res.data.data[i]);
									}
									if (res.data.data !== '') {
										for (var i = 0; i < res.data.data.length; i++) {
											if (res.data.data[i].or_Type == '6') {
												that.finishArr.push(res.data.data[i]);
											} else if (res.data.data[i].or_Type == '4' || res.data.data[i].or_type == '2' || res.data.data[i].or_type ==
												'11') {
												that.goingArr.push(res.data.data[i]);
											} else if (res.data.data[i].or_Type == '5') {
												that.unfinishArr.push(res.data.data[i]);
											} else if (res.data.data[i].or_Type == '8' || res.data.data[i].or_Type == '9') {
												that.cancelArr.push(res.data.data[i]);
											}
										}
									}
								}

							}
						})
					},
					fail() {
						//请求数据失败，停止刷新
						uni.stopPullDownRefresh();
						uni.showToast({
							title: '暂无订单数据，请先登录后查看订单',
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
			//-------------------------拨打电话-------------------------
			tel: function(e) {
				uni.makePhoneCall({
					phoneNumber: e
				})
			},
			//-------------------------包车-详情跳转-------------------------
			details2(e) {
				uni.navigateTo({
					url: '../../pages_BCFW/pages/BCFW/bf_charterMap?or_number=' + JSON.stringify(e)
				})
			},
			//-------------------------判断订单状态-------------------------
			getBCstate(param) {
				if (param == '4') {
					return '进行中'
				} else if (param == '6') {
					return '已完成'
				} else if (param == '5') {
					return '待支付'
				} else if (param == '1') {
					return '待发车'
				} else if (param == '8' || param == '9') {
					return '已取消'
				} else if (param == '11') {
					return '待补款'
				}
			}
		}
	}
</script>

<style lang="scss">
	/* flex布局 */
	.u-f,
	.u-f-ac,
	.u-f-jsb,
	.u-f-jc {
		display: flex;
		/* 设置当前内容全部水平布局 */
	}

	.u-f-ac,
	.u-f-jsb,
	.u-f-jc {
		align-items: center;
		/* 设置内容中心点对齐 */
	}

	.u-f-jc {
		justify-content: center;
	}

	.u-f-jsb {
		justify-content: space-between;
		/* 设置左右两边靠边布局 */
	}

	page {
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
		padding-bottom: 48upx;
	}

	.Btn {
		// padding-top: 32upx; 
		margin: 0 0 0 20rpx;
		font-size: 26rpx;
		border-radius: 8upx;
		border: 0.1 solid #06B4FD;
		background-color: #fff;
		color: #666666;
	}

	//白底1
	.whiteBg {
		position: relative;
		margin: 52rpx 26rpx;
		// margin-top: -20rpx;
		padding: 48rpx 0;
		padding-bottom: 148rpx;
		width: 698rpx;
		height: 340rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		// box-shadow: 0 0 5rpx 0rpx #aaa;
	}

	.bluering {
		width: 8rpx;
		height: 8rpx;
		border: 4rpx solid #06B4FD;
		background: #06B4FD;
		border-radius: 100%;
		margin-left: 96rpx;
	}

	.redring {
		width: 8rpx;
		height: 8rpx;
		border: 4rpx solid #FC4646;
		background: #FC4646;
		border-radius: 100%;
		margin-left: 96rpx;
	}


	.tabs {
		flex: 1;
		flex-direction: column;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.tab {
		position: sticky;
		top: 0upx;
		background: #f5f5f5;
		height: 90upx;
		z-index: 99999;

	}

	.scroll-h {
		width: 670upx;
		height: 80upx;
		margin: 0 40rpx 0 20rpx;
		white-space: nowrap;
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
			border-bottom-style: solid;
			border-bottom-width: 1px; */
	}

	.line-h {
		height: 1upx;
		background-color: #cccccc;
	}

	.uni-tab-item {

		display: inline-block;
		flex-wrap: nowrap;
		padding-left: 38upx;
		padding-right: 28upx;
	}

	.uni-tab-item-title {
		color: #2C2D2D;
		font-size: 30upx;
		height: 80upx;
		line-height: 42upx;
		font-weight: 400;
		flex-wrap: nowrap;
		/* #ifndef APP-VUE */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #007AFF;
		border-bottom: 1rpx solid #007AFF;
	}

	// 购买时间
	.pd_view {
		width: 400upx;
		margin: 40rpx 28rpx;
		margin-bottom: 0upx;
		border-radius: 32rpx;
		background: #06B4FD;
		text-align: center;
		padding: 16upx 0;
		font-size: 25upx;
		color: #FFFFFF;
	}

	//门票列表内容
	.at_view {
		margin: 0rpx 28rpx;
		margin: 24upx;
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 40rpx 32upx;
		padding-bottom: 132upx;

		.at_titleView {
			position: relative;

			.at_icon {
				position: relative;
				top: 4upx;
				width: 34upx;
				height: 31upx;
			}

			.at_title {
				margin-left: 24upx;
			}

			.at_status {
				position: absolute;
				right: 0;
				font-size: 30upx;
				top: 6upx;
			}
		}

		//内容区
		.at_contentView {
			position: relative;
			margin: 24upx 0;
			margin-left: 60upx;

			.at_contentFrame {
				padding: 8upx 20upx;
				margin-right: 16upx;
				text-align: center;
				font-size: 20upx;
				color: #3AC596;
				border-radius: 8upx;
				border: 1upx solid #3AC596;
			}

			.at_contentPrice {
				position: absolute;
				right: 0;
				font-size: 30upx;
				color: #f85e52;
			}

			.at_contentText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #888;
			}
		}

		//按钮区
		.at_buttonView {
			margin-top: 16upx;
			display: flex;
			float: right;

			// 按钮
			.at_button {
				padding: 18upx 48upx;
				padding-top: 22upx;
				font-size: 30upx;
				border-radius: 40upx;
			}

			// 详情 - 实心蓝
			.at_btDetails {
				background: #3EABFC;
				border: 1upx solid #3EABFC;
				color: #FFFFFF;
				margin-right: 24upx;
			}

			//二维码/再次购买 - 实心橙
			.at_btQrCode {
				background: #FF6600;
				border: 1upx solid #FF6600;
				color: #FFFFFF;
			}

			//删除/退票 - 空心灰
			.at_btDelete {
				border: 1upx solid #888;
				color: #888;
				margin-right: 24upx;
			}

			//去支付 - 实心绿
			.at_btToPay {
				background: #02c501;
				border: 1upx solid #02c501;
				color: #FFFFFF;
			}
		}
	}

	.kywhiteBg {
		position: relative;
		margin: 40rpx 26rpx;
		padding: 48rpx 0;
		padding-bottom: 120rpx;
		width: 698rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
	}

	//客运按钮区
	.CTKYBtnView {
		margin-top: 30upx;
		display: flex;
		float: right;
		margin-bottom: 20rpx;

		.allBtn {
			padding: 0 20upx;
			// padding-top: 32upx;
			font-size: 26upx;
			border-radius: 8upx;
			border: 0.1 solid #06B4FD;
			margin-right: 30upx;
			background-color: #fff;
			color: #666666;
		}

		//支付
		.payBtn {
			background-color: #FC4646;
			color: #ffffff;
		}

		//二维码
		.QRCode {
			background-color: #06B4FD;
			color: #06B4FD;
		}
	}

	//站点标题
	.stationTitle {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		color: #2C2D2D;
		font-size: 34rpx;
		font-weight: bold;
		width: 80%;
	}

	//预定日期---LJH
	.reserveDate {
		padding: 12rpx 25rpx;
		background-color: #06B4FD;
		color: #FFFFFF;
		border-radius: 32rpx;
		font-size: 24rpx;
	}

	//须知弹框
	.box_Vlew {
		padding: 16upx 40upx;
		padding-bottom: 24upx;
		background: #FFFFFF;

		.box_titleView {
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

		// 二维码弹框
		.box_qrCodeView {
			margin: 24upx 0upx;
			text-align: center;

			.box_qrCodeImage {
				margin-top: 24upx;
				width: 320upx;
				height: 320upx;
			}

			.box_qrCodeTextView {
				text-align: center;

				.box_qrCodeText {
					margin-top: 16upx;
					display: block;
					font-size: 30upx;
				}
			}
		}

		// 退款弹框
		.box_refundView {
			margin: 24upx 0upx;

			.box_refundText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #333;
			}

			//确认退票
			.box_refundContentView {
				margin-top: 64upx;
				text-align: center;

				.box_refundContentTitle {
					font-weight: bold;
				}

				.box_refundContentText {
					margin-top: 24upx;
					display: block;
					font-size: 28upx;
					color: #888;
				}
			}

			.box_refundButtonView {
				text-align: center;
				margin: 56upx 0;

				//确认按钮
				.box_refundButton {
					color: #FFFFFF;
					border-radius: 56upx;
					background: #FF6600;
					padding: 24upx 160upx;
				}
			}
		}
	}

	//包车定制内容
	.cm_view {
		margin: 0rpx 28rpx;
		margin: 24upx;
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 40rpx 32upx;
		padding-bottom: 132upx;

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
			margin: 24upx 0;
			margin-left: 60upx;

			.cm_contentFrame {
				padding: 8upx 20upx;
				margin-right: 16upx;
				text-align: center;
				font-size: 20upx;
				color: #3AC596;
				border-radius: 8upx;
				border: 1upx solid #3AC596;
			}

			.cm_contentPrice {
				position: absolute;
				right: 0;
				font-size: 30upx;
				color: #f85e52;
				position: absolute;
				top: 25upx;
			}

			.cm_contentText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #888;
			}
		}

		//按钮区
		.cm_buttonView {
			margin-top: 16upx;
			display: flex;
			float: right;

			.cm_omit {
				display: flex;
				position: relative;
				top: 10upx;
				width: 50upx;
				height: 50upx;
				margin-right: 16upx;
			}

			// 按钮
			.cm_button {
				padding: 18upx 48upx;
				padding-top: 22upx;
				font-size: 22upx;
				border-radius: 80upx;
			}

			// 详情 - 空心灰
			.cm_btDetails {
				border: 1upx solid #888;
				color: #888;
				margin-right: 16upx;
			}

			// 联系司机 - 实心橙
			.cm_contact {
				background: #FF6600;
				border: 1upx solid #FF6600;
				color: #FFFFFF;
				margin-right: 16upx;
			}


			//取消- 空心灰
			.cm_btDelete {
				border: 1upx solid #888;
				color: #888;
				margin-right: 16upx;
			}

			//去支付 - 实心橙
			.cm_btToPay {
				background: #FF6600;
				border: 1upx solid #FF6600;
				color: #FFFFFF;
				margin-right: 16upx;
			}
		}
	}
</style>
