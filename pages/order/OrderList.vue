<template>
	<view>
		<!-- <view style="width: 100%;height: 32rpx; display: flex">
			<image @click="back" src="../../static/Order/fanhui.png" style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;"></image>
			<view style="width: 152rpx; height: 48rpx; margin: 92rpx 232rpx;color: #333333; font-size: 38rpx;font-weight:bold;">我的订单</view>
		</view> -->

		<view class="tab">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#FC4646"></uni-segmented-control>
		</view>

		<view v-if="current === 0" style="margin-top: 20rpx;">
			<view v-for="(item,index) in info" :key="index">
				<!-- 出租车 -->
				<view v-if="item.title=='出租车'">
					<view v-if="item.appointment" style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
						<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center; margin-left: 28rpx;">预定时间:{{item.appointmentTime}}</text>
					</view>
					<view class="whiteBg">
						<view style="display: flex; margin-top: -40rpx;">
							<image v-if='item.titleIndex == 1' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
							<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
							<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
							<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
						</view>

						<view style="display: flex; margin-top: -72rpx;">
							<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
							<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
							<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
						</view>

						<view style="display: flex; margin-top: -16rpx;">
							<view class="bluering"></view>
							<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
						</view>

						<view style="display: flex; margin-top: 36rpx;">
							<view class="redring"></view>
							<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
						</view>

						<view style="display: flex;">
							<button @click="detail(item.titleIndex)" style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; right: 48rpx; align-items: center; position: absolute;">详情</button>
							<button @click="detail(item.titleIndex)" v-if="item.orderType=='已完成'" style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; align-items: center; left: 80rpx;">投诉</button>
							<button @click="openBottomPopup" v-if="item.orderType=='未支付'" style="width:146rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #FC4646; border: 1px solid #FC4646; color: #ffffff; align-items: center; left: 80rpx;">去支付</button>
							<button v-if="item.orderType=='已取消'" style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; align-items: center; left: 80rpx;">删除</button>
						</view>
					</view>
				</view>

				<!-- 景区门票 -->
				<!-- 标签class命名：pd;全称：Purchase Date -->
				<!-- 内容class命名：at;全称：Admission ticket -->
				<view v-if="item.title=='景区门票'">
					<view class="pd_view">{{item.orderDateReminder}}</view>
					<view class="at_view">
						<view class="at_titleView">
							<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
							<text class="at_title">{{item.ticketTitle}}</text>
							<text class="at_status">{{item.orderType}}</text>
						</view>
						<view class="at_contentView" style="display: flex;">
							<view class="at_contentFrame">一码通</view>
							<view class="at_contentFrame">儿童半票</view>
							<view class="at_contentFrame">当日有效</view>
							<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
						</view>

						<view class="at_contentView">
							<text class="at_contentText">预订时间：&nbsp;{{item.orderDateReminder}}&nbsp;{{item.orderDate}}</text>
							<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
						</view>

						<!-- 已使用 -->
						<view class="at_buttonView" v-if="item.orderType=='已使用'">
							<view class="at_button at_btDetails" @click="details(index)" style="margin-right: 0upx;">详情</view>
						</view>

						<!-- 待使用 -->
						<view class="at_buttonView" v-if="item.orderType=='待使用'">
							<view class="at_button at_btDelete" @click="open2(index)">退票</view>
							<view class="at_button at_btDetails" @click="details(index)">详情</view>
							<view class="at_button at_btQrCode" @click="open(index)">二维码</view>
						</view>

						<!-- 待支付 -->
						<view class="at_buttonView" v-if="item.orderType=='待支付'">
							<view class="at_button at_btDelete" @click="open3(index)">取消</view>
							<view class="at_button at_btDetails" @click="details(index)">详情</view>
							<view class="at_button at_btToPay" @click="topay(index)">去支付</view>
						</view>

						<!-- 已退票 -->
						<view class="at_buttonView" v-if="item.orderType=='已退票'">
							<view class="at_button at_btDelete" @click="del(index)">删除</view>
							<view class="at_button at_btDetails" @click="details(index)">详情</view>
							<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
						</view>

						<!-- 已取消 -->
						<view class="at_buttonView" v-if="item.orderType=='已取消'">
							<view class="at_button at_btDelete" @click="del(index)">删除</view>
							<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
						</view>
					</view>
				</view>
				
				<!-- （全部）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
				<view v-if="item.title=='客车-传统'">
					
					<!-- 预定日期 -->
					<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;" v-if="item.appointment">
						<view class="reserveDate">预定日期：03-05</view>
					</view>
					
					<view class="whiteBg">
						<view style="display: flex; margin-top: -40rpx;">
							<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
							<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
							<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
						</view>
				
						<view style="display: flex; margin-top: -72rpx;">
							<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
							<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
							<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
						</view>
				
						<view style="display: flex; margin-top: -16rpx;">
							<view class="bluering"></view>
							<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
						</view>
				
						<view style="display: flex; margin-top: 36rpx;">
							<view class="redring"></view>
							<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
						</view>
				
						<view style="display: flex;">
							<button class="allBtn" @click="detail(item.titleIndex)" style="position: absolute;">详情</button>
							<button class="allBtn" v-if="item.orderType=='已完成'" style="left: 100rpx;">投诉</button>
							<button class="allBtn" v-if="item.orderType=='未支付'" style="left: 100rpx;background-color: #FC4646; color: #ffffff;">去支付</button>
							<button class="allBtn" v-if="item.orderType=='已取消'" style="left: 100rpx;">删除</button>
							<button class="allBtn" @tap="QRCodeTap" v-if="item.orderType=='进行中'" style="left: 100rpx;">二维码</button>
						</view>
					</view>
				</view>
				
			</view>
		</view>


			<!-- 已完成 -->
			<view v-if="current === 1" style="margin-top: 20rpx;">
				<view v-for="(item,index) in finishArr" :key="index">
					<!-- 出租车 -->
					<view v-if="item.title=='出租车'">
						<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center;margin-left: 28rpx;">预定时间:03-05</text>
						</view>
						<view class="whiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image v-if='item.titleIndex == 1' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
								<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
							</view>

							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
							</view>

							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
							</view>

							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
							</view>

							<view style="display: flex;">
								<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; align-items: center; left: 80rpx;">投诉</button>
								<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; right: 48rpx; align-items: center; position: absolute;">详情</button>
							</view>
						</view>
					</view>


					<!-- 景区门票 -->
					<!-- 标签class命名：pd;全称：Purchase Date -->
					<!-- 内容class命名：at;全称：Admission ticket -->
					<view v-if="item.title=='景区门票'">
						<view class="pd_view">{{item.orderDateReminder}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view class="at_contentFrame">一码通</view>
								<view class="at_contentFrame">儿童半票</view>
								<view class="at_contentFrame">当日有效</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>

							<view class="at_contentView">
								<text class="at_contentText">预订时间：&nbsp;{{item.orderDateReminder}}&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>

							<!-- 已使用 -->
							<view class="at_buttonView" v-if="item.orderType=='已使用'">
								<view class="at_button at_btDetails" @click="details(index)" style="margin-right: 0upx;">详情</view>
							</view>

							<!-- 待使用 -->
							<view class="at_buttonView" v-if="item.orderType=='待使用'">
								<view class="at_button at_btDelete" @click="open2(index)">退票</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btQrCode" @click="open(index)">二维码</view>
							</view>

							<!-- 待支付 -->
							<view class="at_buttonView" v-if="item.orderType=='待支付'">
								<view class="at_button at_btDelete" @click="open3(index)">取消</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btToPay" @click="topay(index)">去支付</view>
							</view>

							<!-- 已退票 -->
							<view class="at_buttonView" v-if="item.orderType=='已退票'">
								<view class="at_button at_btDelete" @click="del(index)">删除</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
							</view>

							<!-- 已取消 -->
							<view class="at_buttonView" v-if="item.orderType=='已取消'">
								<view class="at_button at_btDelete" @click="del(index)">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
							</view>
						</view>
					</view>
					
					<!-- （已完成）客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.title=='客车-传统'">
						<!-- 预定日期 -->
						<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;" v-if="item.appointment">
							<view class="reserveDate">预定日期：03-05</view>
						</view>
						<view class="whiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
							</view>
					
							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
							</view>
					
							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
							</view>
					
							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
							</view>
					
							<view style="display: flex;">
								<button class="allBtn" @click="detail(item.titleIndex)" style="position: absolute;">详情</button>
								<button class="allBtn" v-if="item.orderType=='已完成'" style="left: 100rpx;">投诉</button>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 进行中 -->
			<view v-if="current === 2" style="margin-top: 20rpx;">
				<view v-for="(item,index) in goingArr" :key="index">
					<!-- 出租车 -->
					<view v-if="item.title=='出租车'">
						<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center;margin-left: 28rpx;">预定时间:03-05</text>
						</view>
						<view class="whiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image v-if='item.titleIndex == 1' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
								<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
							</view>
			
							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
							</view>
			
							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
							</view>
			
							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
							</view>
			
							<view style="display: flex;">
								<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; right: 48rpx; align-items: center; position: absolute;">详情</button>
							</view>
						</view>
					</view>
			
			
					<!-- 景区门票 -->
					<!-- 标签class命名：pd;全称：Purchase Date -->
					<!-- 内容class命名：at;全称：Admission ticket -->
					<view v-if="item.title=='景区门票'">
						<view class="pd_view">{{item.orderDateReminder}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view class="at_contentFrame">一码通</view>
								<view class="at_contentFrame">儿童半票</view>
								<view class="at_contentFrame">当日有效</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>
			
							<view class="at_contentView">
								<text class="at_contentText">预订时间：&nbsp;{{item.orderDateReminder}}&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>
			
							<!-- 已使用 -->
							<view class="at_buttonView" v-if="item.orderType=='已使用'">
								<view class="at_button at_btDetails" @click="details(index)" style="margin-right: 0upx;">详情</view>
							</view>
			
							<!-- 待使用 -->
							<view class="at_buttonView" v-if="item.orderType=='待使用'">
								<view class="at_button at_btDelete" @click="open2(index)">退票</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btQrCode" @click="open(index)">二维码</view>
							</view>
			
							<!-- 待支付 -->
							<view class="at_buttonView" v-if="item.orderType=='待支付'">
								<view class="at_button at_btDelete" @click="open3(index)">取消</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btToPay" @click="topay(index)">去支付</view>
							</view>
			
							<!-- 已退票 -->
							<view class="at_buttonView" v-if="item.orderType=='已退票'">
								<view class="at_button at_btDelete" @click="del(index)">删除</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
							</view>
			
							<!-- 已取消 -->
							<view class="at_buttonView" v-if="item.orderType=='已取消'">
								<view class="at_button at_btDelete" @click="del(index)">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
							</view>
						</view>
					</view>
					
					<!-- 客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.title=='客车-传统'">
						<!-- 预定日期 -->
						<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;" v-if="item.appointment">
							<view class="reserveDate">预定日期：03-05</view>
						</view>
						<view class="whiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
							</view>
								
							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
							</view>
								
							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
							</view>
								
							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
							</view>
								
							<view style="display: flex;">
								<button class="allBtn" @click="detail(item.titleIndex)" style="position: absolute;">详情</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			

			<!-- 未支付 -->
			<view v-if="current === 3" style="margin-top: 20rpx;">
				<view v-for="(item,index) in unfinishArr" :key="index">
					<!-- 出租车 -->
					<view v-if="item.title=='出租车'">
						<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center;margin-left: 28rpx;">预定时间:03-05</text>
						</view>
						<view class="whiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image v-if='item.titleIndex == 1' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
								<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
							</view>
			
							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
							</view>
			
							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
							</view>
			
							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
							</view>
			
							<view style="display: flex;">
								<button class="allBtn" @click="detail(item.titleIndex)" style="position: absolute;">详情</button>
								<button class="allBtn" style="background-color: #FC4646; border: 1px solid #FC4646; color: #ffffff; left: 100rpx;">去支付</button>
							</view>
						</view>
					</view>
			
			
					<!-- 景区门票 -->
					<!-- 标签class命名：pd;全称：Purchase Date -->
					<!-- 内容class命名：at;全称：Admission ticket -->
					<view v-if="item.title=='景区门票'">
						<view class="pd_view">{{item.orderDateReminder}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view class="at_contentFrame">一码通</view>
								<view class="at_contentFrame">儿童半票</view>
								<view class="at_contentFrame">当日有效</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>
			
							<view class="at_contentView">
								<text class="at_contentText">预订时间：&nbsp;{{item.orderDateReminder}}&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>
			
							<!-- 已使用 -->
							<view class="at_buttonView" v-if="item.orderType=='已使用'">
								<view class="at_button at_btDetails" @click="details(index)" style="margin-right: 0upx;">详情</view>
							</view>
			
							<!-- 待使用 -->
							<view class="at_buttonView" v-if="item.orderType=='待使用'">
								<view class="at_button at_btDelete" @click="open2(index)">退票</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btQrCode" @click="open(index)">二维码</view>
							</view>
			
							<!-- 待支付 -->
							<view class="at_buttonView" v-if="item.orderType=='待支付'">
								<view class="at_button at_btDelete" @click="open3(index)">取消</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btToPay" @click="topay(index)">去支付</view>
							</view>
			
							<!-- 已退票 -->
							<view class="at_buttonView" v-if="item.orderType=='已退票'">
								<view class="at_button at_btDelete" @click="del(index)">删除</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
							</view>
			
							<!-- 已取消 -->
							<view class="at_buttonView" v-if="item.orderType=='已取消'">
								<view class="at_button at_btDelete" @click="del(index)">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
							</view>
						</view>
					</view>
					
					<!-- 客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.title=='客车-传统'">
						<!-- 预定日期 -->
						<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;" v-if="item.appointment">
							<view class="reserveDate">预定日期：03-05</view>
						</view>
						<view class="whiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
							</view>
								
							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
							</view>
								
							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
							</view>
								
							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
							</view>
								
							<view style="display: flex;">
								<button class="allBtn" @click="detail(item.titleIndex)" style="position: absolute;">详情</button>
								<button class="allBtn" style="background-color: #FC4646; color: #ffffff; left: 100rpx;">去支付</button>
								
							</view>
						</view>
					</view>
				</view>
			</view>
			
			


			<!-- 已取消 -->
			<view v-if="current === 4" style="margin-top: 20rpx;">
				<view v-for="(item,index) in cancelArr" :key="index">
					<!-- 出租车 -->
					<view v-if="item.title=='出租车'">
						<view style="width: 222rpx; height: 62rpx; border-radius: 32rpx; border: 1px solid #06B4FD; background-color: #06B4FD;margin: 50rpx 28rpx;">
							<text style="font-size: 24rpx; color: #FFFFFF;font-weight: 400;text-align: center;margin-left: 28rpx;">预定时间:03-05</text>
						</view>
						<view class="whiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image v-if='item.titleIndex == 1' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/Car1.png"></image>
								<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
							</view>
			
							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
							</view>
			
							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
							</view>
			
							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
							</view>
			
							<view style="display: flex;">
								<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; align-items: center; left: 80rpx;">删除</button>
								<button style="width:132rpx;height:72rpx;border-radius:18rpx; margin-top: 32rpx; font-size: 28rpx;text-align: center;background-color: #fff; border: 1px solid #999999; color: #999999; right: 48rpx; align-items: center; position: absolute;">详情</button>
							</view>
						</view>
					</view>
			
			
					<!-- 景区门票 -->
					<!-- 标签class命名：pd;全称：Purchase Date -->
					<!-- 内容class命名：at;全称：Admission ticket -->
					<view v-if="item.title=='景区门票'">
						<view class="pd_view">{{item.orderDateReminder}}</view>
						<view class="at_view">
							<view class="at_titleView">
								<image class="at_icon" src="../../static/Order/menpiao.png" mode="aspectFill"></image>
								<text class="at_title">{{item.ticketTitle}}</text>
								<text class="at_status">{{item.orderType}}</text>
							</view>
							<view class="at_contentView" style="display: flex;">
								<view class="at_contentFrame">一码通</view>
								<view class="at_contentFrame">儿童半票</view>
								<view class="at_contentFrame">当日有效</view>
								<text class="at_contentPrice">¥{{item.orderActualPayment}}</text>
							</view>
			
							<view class="at_contentView">
								<text class="at_contentText">预订时间：&nbsp;{{item.orderDateReminder}}&nbsp;{{item.orderDate}}</text>
								<text class="at_contentText">预订人数：&nbsp;{{item.orderUserIndex}}人</text>
							</view>
			
							<!-- 已使用 -->
							<view class="at_buttonView" v-if="item.orderType=='已使用'">
								<view class="at_button at_btDetails" @click="details(index)" style="margin-right: 0upx;">详情</view>
							</view>
			
							<!-- 待使用 -->
							<view class="at_buttonView" v-if="item.orderType=='待使用'">
								<view class="at_button at_btDelete" @click="open2(index)">退票</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btQrCode" @click="open(index)">二维码</view>
							</view>
			
							<!-- 待支付 -->
							<view class="at_buttonView" v-if="item.orderType=='待支付'">
								<view class="at_button at_btDelete" @click="open3(index)">取消</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btToPay" @click="topay(index)">去支付</view>
							</view>
			
							<!-- 已退票 -->
							<view class="at_buttonView" v-if="item.orderType=='已退票'">
								<view class="at_button at_btDelete" @click="del(index)">删除</view>
								<view class="at_button at_btDetails" @click="details(index)">详情</view>
								<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
							</view>
			
							<!-- 已取消 -->
							<view class="at_buttonView" v-if="item.orderType=='已取消'">
								<view class="at_button at_btDelete" @click="del(index)">删除</view>
								<view class="at_button at_btQrCode" @click="repurchase(index)">再次预订</view>
							</view>
						</view>
					</view>
					
					<!-- (已取消)客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车客车 -->
					<view v-if="item.title=='客车-传统'">
						<!-- 预定日期 -->
						<view style="display: flex; margin-bottom: 40rpx; margin-left: 28rpx;" v-if="item.appointment">
							<view class="reserveDate">预定日期：03-05</view>
						</view>
						<view class="whiteBg">
							<view style="display: flex; margin-top: -40rpx;">
								<image v-if='item.titleIndex == 2' style="width: 48rpx; height: 45rpx; margin:48rpx 45rpx;" src="../../static/Order/keche.png"></image>
								<view style="width: 600rpx; height: 44rpx;color: #2C2D2D; font-size: 34rpx;margin: 48rpx -28rpx;font-weight: bold;">{{item.title}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #666666; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.orderType}}</view>
							</view>
								
							<view style="display: flex; margin-top: -72rpx;">
								<image style="width: 22rpx; height: 22rpx; margin:58rpx 92rpx;" src="../../static/Order/time.png"></image>
								<view style="width: 540rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx -76rpx;">{{item.time}}</view>
								<view style="width: 160rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: 48rpx 0rpx;">{{item.money}}</view>
							</view>
								
							<view style="display: flex; margin-top: -16rpx;">
								<view class="bluering"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.starAddress}}</view>
							</view>
								
							<view style="display: flex; margin-top: 36rpx;">
								<view class="redring"></view>
								<view style="width: 480rpx; height: 44rpx;color: #AAAAAA; font-size: 28rpx;margin: -14rpx -80rpx;">{{item.endAddress}}</view>
							</view>
								
							<view style="display: flex;">
								<button class="allBtn" @click="detail(item.titleIndex)" style="position: absolute;">详情</button>
								<button class="allBtn" style="background-color: #FC4646; color: #ffffff; left: 100rpx;">去支付</button>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 二维码弹框 -->
			<uni-popup2 ref="popup" type="bottom">
				<view class="box_Vlew">
					<view class="box_titleView">
						<text class="box_title">扫码入园</text>
						<text class="box_icon jdticon icon-fork " @click="close"></text>
					</view>
					<view class="box_qrCodeView">
						<image class="box_qrCodeImage" :src="info[orderIndex].orderQrCode" mode="aspectFill"></image>
						<view class="box_qrCodeTextView">
							<text class="box_qrCodeText">取票码：{{info[orderIndex].orderTicketNumber}}</text>
							<text class="box_qrCodeText">预订人数：{{info[orderIndex].orderUserIndex}}人</text>
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
							<image src="../../static/LYFW/scenicSpotTickets/orderDetails/erweima.png" 
								mode="aspectFill" lazy-load style="width: 250rpx; height: 250rpx;padding-top: 70rpx;"></image>
								
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
						<text class="box_refundText">您可以在2019年11月04日18:00前免费取消或变更订单 ；在2019年11月04日18:00之后变更或取消，将收取全 额费用作为罚金。</text>
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
	import uniSegmentedControl from "@/components/Order/uni-segmented-control/uni-segmented-control.vue";
	import uniPopup from "@/components/Order/uni-popup/uni-popup.vue";
	import uniIcons from "@/components/Order/uni-icons/uni-icons.vue";
	import uniPopup2 from "@/components/Order/uni-popup/uni-popup2.vue";
	export default {
		components: {
			uniSegmentedControl,
			uniPopup,
			//加载多方弹框组件
			uniPopup2,
			uniIcons,
		},
		data() {
			return {
				items: ['全部', '已完成', '进行中', '未支付', '已取消'],
				current: 0,
				index: 1,
				orderIndex: 0, //订单调用数值
				orderIndexData: '', //二维码订单数据
				QRCodeArray:[
					{
						checkPlace:'A5',
						seatNum:'E1',
						lunchTime:'18:00',
						carNum:'闽C12345'
					}
				],
				info: [{
						title: '客车-传统',
						titleIndex: 2,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "现代美居广场",
						endAddress: "泉州市-丰泽区-温秀路/雅园路(路口)",
						orderType: "进行中",
						appointment: true,
					},{
						title: '客车-传统',
						titleIndex: 2,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "茶叶大厦",
						endAddress: "泉州市-丰泽区-泉秀路777号",
						orderType: "已完成",
						appointment: true,
					},
					{
						title: '客车-传统',
						titleIndex: 2,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "现代美居广场",
						endAddress: "泉州市-丰泽区-温秀路/雅园路(路口)",
						orderType: "进行中",
						appointment: true,
					},
					{
						title: '客车-传统',
						titleIndex: 2,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "丰泽区人民法院",
						endAddress: "泉州市-丰泽区-泉秀路765号",
						orderType: "未支付",
						appointment: true,
					},{
						title: '客车-传统',
						titleIndex: 2,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "泉州汽车站",
						endAddress: "泉州市-丰泽区-泉秀路222号",
						orderType: "已取消",
						appointment: true,
					},
					{
						title: '出租车',
						titleIndex: 1,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "泉州汽车站",
						endAddress: "泉州市-丰泽区-泉秀路222号",
						orderType: "已取消",
						appointment: true,
					},{
						title: '景区门票',
						orderNumber: '11126778833',
						orderType: '待使用',
						orderActualPayment: 434,
						orderDateReminder: '2020-03-20',
						orderDate: '今天',
						orderTicketNumber: 'T8718283713',
						orderQrCode: '../../static/LYFW/scenicSpotTickets/orderDetails/erweima.png',
						orderUserIndex: 1,

						ticketId: 0,
						ticketTitle: '南平武夷山',
					}, {
						title: '景区门票',
						orderNumber: '11126778833',
						orderType: '已使用',
						orderActualPayment: 434,
						orderDateReminder: '2020-03-20',
						orderDate: '今天',
						orderTicketNumber: 'T8718283713',
						orderQrCode: '../../static/LYFW/scenicSpotTickets/orderDetails/erweima.png',
						orderUserIndex: 1,

						ticketId: 0,
						ticketTitle: '南平武夷山',
					}, {
						title: '景区门票',
						orderNumber: '11126778833',
						orderType: '待支付',
						orderActualPayment: 434,
						orderDateReminder: '2020-03-20',
						orderDate: '今天',
						orderTicketNumber: 'T8718283713',
						orderQrCode: '../../static/LYFW/scenicSpotTickets/orderDetails/erweima.png',
						orderUserIndex: 1,

						ticketId: 0,
						ticketTitle: '南平武夷山',
					}, {
						title: '景区门票',
						orderNumber: '11126778833',
						orderType: '已退票',
						orderActualPayment: 434,
						orderDateReminder: '2020-03-20',
						orderDate: '今天',
						orderTicketNumber: 'T8718283713',
						orderQrCode: '../../static/LYFW/scenicSpotTickets/orderDetails/erweima.png',
						orderUserIndex: 1,

						ticketId: 0,
						ticketTitle: '南平武夷山',
					}, {
						title: '景区门票',
						orderNumber: '11126778833',
						orderType: '已取消',
						orderActualPayment: 434,
						orderDateReminder: '2020-03-20',
						orderDate: '今天',
						orderTicketNumber: 'T8718283713',
						orderQrCode: '../../static/LYFW/scenicSpotTickets/orderDetails/erweima.png',
						orderUserIndex: 1,

						ticketId: 0,
						ticketTitle: '南平武夷山',
					}, {
						title: '出租车',
						titleIndex: 1,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "茶叶大厦",
						endAddress: "泉州市-丰泽区-泉秀路777号",
						orderType: "已完成",
						appointmentTime:"03-05",
						appointment: true,
					},
					{
						title: '出租车',
						titleIndex: 1,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "现代美居广场",
						endAddress: "泉州市-丰泽区-温秀路/雅园路(路口)",
						orderType: "进行中",
						appointmentTime:"03-05",
						appointment: false,
					},
					{
						title: '出租车',
						titleIndex: 1,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "丰泽区人民法院",
						endAddress: "泉州市-丰泽区-泉秀路765号",
						orderType: "未支付",
						appointmentTime:"03-05",
						appointment: false,
					},
					{
						title: '出租车',
						titleIndex: 1,
						time: '2020-03-06 8:00',
						money: '¥32.6元',
						starAddress: "泉州汽车站",
						endAddress: "泉州市-丰泽区-泉秀路222号",
						orderType: "已取消",
						appointmentTime:"03-05",
						appointment: true,
					}
				],
				finishArr: [],
				goingArr: [],
				unfinishArr: [],
				cancelArr: [],
				driverName:'张师傅',//司机姓名
				totalPrice: 32.5,
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
				]
			}
		},
		onLoad() {
			var that = this;
			that.toFinished();
		},
		methods: {
			//------支付页面
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
						console.log(res); 
						uni.navigateTo({
							url:'../CZC/PaymentSuccess'
						});
					},
					fail: function(res) {
						console.log(res);
						uni.navigateTo({
							url:'../CZC/PaymentFail'
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

			detail: function(item) {
				if (item == 1) {
					uni.navigateTo({
						url: '/pages/order/OrderDetail',
					})
				}else if (item == 2) {
					uni.navigateTo({
						url: '/pages/CTKY/orderDetail',
					})
				}
			},
			// 客运二维码弹框
			QRCodeTap: function(){
				this.$refs.popup.open()
			},

			onClickItem(e) { //tab点击事件
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},

			toFinished: function() {
				var that = this;
				for (var i = 0; i < that.info.length; i++) {
					if (that.info[i].orderType == '已完成' || that.info[i].orderType == '已使用') {
						that.finishArr.push(that.info[i]);
					} else if (that.info[i].orderType == '进行中' || that.info[i].orderType == '待使用') {
						that.goingArr.push(that.info[i]);
					} else if (that.info[i].orderType == '未支付' || that.info[i].orderType == '待支付') {
						that.unfinishArr.push(that.info[i]);
					} else if (that.info[i].orderType == '已取消' || that.info[i].orderType == '已退票') {
						that.cancelArr.push(that.info[i]);
					}
				}
			},

			//景区门票-打开二维码弹框
			open(e) {
				if (this.current == 0) {
					this.orderIndexData = this.info[e]
					this.$refs.popup.open()
				} else if (this.current == 1) {
					this.orderIndexData = this.finishArr[e]
					this.$refs.popup.open()
				} else if (this.current == 2) {
					this.orderIndexData = this.goingArr[e]
					this.$refs.popup.open()
				} else if (this.current == 3) {
					this.orderIndexData = this.unfinishArr[e]
					this.$refs.popup.open()
				} else if (this.current == 4) {
					this.orderIndexData = this.cancelArr[e]
					this.$refs.popup.open()
				}
			},
			//景区门票-关闭二维码弹框
			close() {
				this.$refs.popup.close()
			},
			//景区门票-打开退票弹框
			open2(e) {
				this.orderIndex = e;
				this.$refs.popup2.open()
			},
			//景区门票-关闭退票弹框
			close2() {
				this.$refs.popup2.close()
			},
			//景区门票-打开取消弹框
			open3(e) {
				this.orderIndex = e;
				this.$refs.popup3.open()
			},
			//景区门票-关闭取消弹框
			close3() {
				this.$refs.popup3.close()
			},

			//景区门票-详情跳转
			details(e) {
				if (this.current == 0) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/orderDetails?orderNumber=' + JSON.stringify(this.info[e].orderNumber)
					})
				} else if (this.current == 1) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/orderDetails?orderNumber=' + JSON.stringify(this.finishArr[e].orderNumber)
					})
				} else if (this.current == 2) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/orderDetails?orderNumber=' + JSON.stringify(this.goingArr[e].orderNumber)
					})
				} else if (this.current == 3) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/orderDetails?orderNumber=' + JSON.stringify(this.unfinishArr[e].orderNumber)
					})
				} else if (this.current == 4) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/orderDetails?orderNumber=' + JSON.stringify(this.cancelArr[e].orderNumber)
					})
				}
			},
			//景区门票-去支付跳转
			topay(e) {
				if (this.current == 0) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/selectivePayment?orderNumber=' + JSON.stringify(this.info[e].orderNumber)
					})
				} else if (this.current == 1) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/selectivePayment?orderNumber=' + JSON.stringify(this.finishArr[e].orderNumber)
					})
				} else if (this.current == 2) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/selectivePayment?orderNumber=' + JSON.stringify(this.goingArr[e].orderNumber)
					})
				} else if (this.current == 3) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/selectivePayment?orderNumber=' + JSON.stringify(this.unfinishArr[e].orderNumber)
					})
				} else if (this.current == 4) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/selectivePayment?orderNumber=' + JSON.stringify(this.cancelArr[e].orderNumber)
					})
				}

			},
			//景区门票-再次购买
			repurchase(e) {
				if (this.current == 0) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/ticketsDetails?ticketId=' + JSON.stringify(this.info[e].ticketId)
					})
				} else if (this.current == 1) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/ticketsDetails?ticketId=' + JSON.stringify(this.finishArr[e].ticketId)
					})
				} else if (this.current == 2) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/ticketsDetails?ticketId=' + JSON.stringify(this.goingArr[e].ticketId)
					})
				} else if (this.current == 3) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/ticketsDetails?ticketId=' + JSON.stringify(this.unfinishArr[e].ticketId)
					})
				} else if (this.current == 4) {
					uni.navigateTo({
						url: '../LYFW/scenicSpotTickets/ticketsDetails?ticketId=' + JSON.stringify(this.cancelArr[e].ticketId)
					})
				}

			},
			//景区门票-退票
			refund(e) {
				if (this.current == 0) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.info[e].orderNumber,
					// 		content: 'refund',
					// 	}
					// })
					uni.showToast({
						title:'退票成功',
						icon:'success',
						duration:1500,
					})
					this.close2();
				} else if (this.current == 1) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.finishArr[e].orderNumber,
					// 		content: 'refund',
					// 	}
					// })
					uni.showToast({
						title:'退票成功',
						icon:'success',
						duration:1500,
					})
					this.close2();
				} else if (this.current == 2) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.goingArr[e].orderNumber,
					// 		content: 'refund',
					// 	}
					// })
					uni.showToast({
						title:'退票成功',
						icon:'success',
						duration:1500,
					})
					this.close2();
				} else if (this.current == 3) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.unfinishArr[e].orderNumber,
					// 		content: 'refund',
					// 	}
					// })
					uni.showToast({
						title:'退票成功',
						icon:'success',
						duration:1500,
					})
					this.close2();
				} else if (this.current == 4) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.cancelArr[e].orderNumber,
					// 		content: 'refund',
					// 	}
					// })
					uni.showToast({
						title:'退票成功',
						icon:'success',
						duration:1500,
					})
					this.close2();
				}
			},

			//景区门票-取消
			cancel(e) {
				if (this.current == 0) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.info[e].orderNumber,
					// 		content: 'cancel',
					// 	}
					// })
					uni.showToast({
						title:'取消成功',
						icon:'success',
						duration:1500,
					})
					this.close3();
				} else if (this.current == 1) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.finishArr[e].orderNumber,
					// 		content: 'cancel',
					// 	}
					// })
					uni.showToast({
						title:'取消成功',
						icon:'success',
						duration:1500,
					})
					this.close3();
				} else if (this.current == 2) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.goingArr[e].orderNumber,
					// 		content: 'cancel',
					// 	}
					// })
					uni.showToast({
						title:'取消成功',
						icon:'success',
						duration:1500,
					})
					this.close3();
				} else if (this.current == 3) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.unfinishArr[e].orderNumber,
					// 		content: 'cancel',
					// 	}
					// })
					uni.showToast({
						title:'取消成功',
						icon:'success',
						duration:1500,
					})
					this.close3();
				} else if (this.current == 4) {
					// uni.request({
					// 	url,
					// 	data: {
					// 		orderNumber: this.cancelArr[e].orderNumber,
					// 		content: 'cancel',
					// 	}
					// })
					uni.showToast({
						title:'取消成功',
						icon:'success',
						duration:1500,
					})
					this.close3();
				}
			},

			//景区门票-删除
			del(e) {
				if (this.current == 0) {
					this.info.splice(e, 1);
				} else if (this.current == 1) {
					this.finishArr.splice(e, 1);
				} else if (this.current == 2) {
					this.goingArr.splice(e, 1);
				} else if (this.current == 3) {
					this.unfinishArr.splice(e, 1);
				} else if (this.current == 4) {
					this.cancelArr.splice(e, 1);
				}
			}


		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
	}

	//白底1
	.whiteBg {
		position: relative;
		margin: 52rpx 26rpx;
		margin-top: -20rpx;
		padding: 20rpx 0;
		width: 698rpx;
		height: 340rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		box-shadow: 0 0 5rpx 0rpx #aaa;
	}

	.bluering {
		width: 8rpx;
		height: 8rpx;
		border: 4rpx solid #06B4FD;
		background: #06B4FD;
		border-radius: 100%;
		margin: 0rpx 96rpx;
	}

	.redring {
		width: 8rpx;
		height: 8rpx;
		border: 4rpx solid #FC4646;
		background: #FC4646;
		border-radius: 100%;
		margin: 0rpx 96rpx;
	}


	.tabs {
		flex: 1;
		flex-direction: column;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}
	.tab{
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
		width: 200rpx;
		margin: 40rpx 28rpx;
		margin-bottom: 0upx;
		border-radius: 32rpx;
		background: #06B4FD;
		text-align: center;
		padding: 16upx 0;
		font-size: 26upx;
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
				width: 108upx;
				padding: 8upx 0;
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
	//所有按钮--LJH
	.allBtn {
		height:54rpx;
		line-height: 54rpx;
		border-radius:8rpx;
		margin-top: 32rpx;
		font-size: 26rpx;
		text-align: center;
		background-color: #fff;
		border: 0.1 solid #06B4FD;
		color: #666666;
		right: 20rpx;
		align-items: center;
	}
	//预定日期---LJH
	.reserveDate {
		padding: 5rpx 25rpx;
		background-color: #06B4FD;
		color: #FFFFFF;
		border-radius: 24rpx;
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
</style>
