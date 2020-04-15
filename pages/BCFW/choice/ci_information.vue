<template>
	<view class="content">
		<view class="m_view">
			<text class="mv_title">用车信息</text>
		</view>
		<view class="m_view2">
			<text class="mv_depart">出发地</text>
			<text class="mv_departName">厦门国际机场</text>
			<text class="mv_borun">目的地</text>
			<text class="mv_borunName">晋江</text>
			<text class="mv_go">出发时间</text>
			<text class="mv_date">2020-03-20</text>
			<text class="mv_days">包车天数</text>
			<text class="mv_number">1天</text>
		</view>
		<view class="m_view3">
			<text class="mv_selected">已选车型</text>
			<image class="mv_car" src="../../../static/BCFW/choice/che.png"></image>
			<text class="mv_carName">比亚迪</text>
			<text class="mv_carType">轿车(5座)</text>
			<text class="mv_carMoney">110元</text>
		</view>
		<view class="m_view4">
			<text class="mv_charteredBusMessage">包车人信息</text>
			<text class="mv_explain">仅需填写一人信息，填写后自动保存至通讯录</text>
			<text class="mv_tripMan">出行人</text>
			<text class="mv_name">张三丰</text>
			<text class="mv_idCord">身份证</text>
			<text class="mv_id">350583*********2645</text>
			<text class="mv_mobile">联系电话</text>
			<text class="mv_phone">17522044126</text>
		</view>
		<view class="m_view5">
			<text class="mv_coupon">优惠券</text>
			<text class="mv_noUsable">无可用</text>
		</view>
		<view class="m_view6">
			<text class="mv_charteredBusNotice">包车须知</text>
			<text class="mv_all">点击查看全部</text>
		</view>
		<view class="m_view7">
			<text class="mv_money">￥110</text>
			<view class="mv_view">
				<text class="mvv_atOnce">立即包车</text>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.m_view2{
		.mv_depart{
			
		}
		.mv_depart{
			
		}
		
	}
	
	page{
		background-color: #f6f6f6;
	}
	.content {
			width:100%;
			height:1620upx;
	}
	.m_view{
		width:100%;
		height: 253upx;
		background: #FC4646;
		.mv_title{
			width: 400upx;
			height: 30upx;
			font-size: 40upx;
			font-weight:800;
			color:#FFFFFF;
			position: relative;
			margin:0,auto;
		}
	}
	
	.m_view2{
		width: 700upx;
		height: 180upx;
		position: absolute;
		background: #FFFFFF;
		left: 25upx;
		top: 180upx;
		border-radius: 20upx;
		.mv_depart{
			width: 200upx;
			height: 29upx;
			font-size: 35upx;
			font-weight:100;
			color:#808080;
			position: absolute;
			left: 40upx;
			top:40upx
		}
		.mv_departName{
			width: 300upx;
			height:29upx;
			font-size:35upx;
			color:#333333;
			position: absolute;
			left: 160upx;
			top:40upx
		}
		.mv_borun{
			width: 200upx;
			height: 29upx;
			font-size: 35upx;
			color: #808080;
			position: absolute;
			left: 440upx;
			top:40upx
		}
		.mv_borunName{
			width: 150upx;
			height: 29upx;
			font-size: 35upx;
			color: #333333;
			position: absolute;
			left: 560upx;
			top: 40upx;
		}
		.mv_go{
			width: 200upx;
			height: 29upx;
			font-size: 35upx;
			font-weight:100;
			color:#808080;
			position: absolute;
			left: 40upx;
			top:110upx
		}
		.mv_date{
			width: 300upx;
			height:29upx;
			font-size:35upx;
			color:#333333;
			position: absolute;
			left: 200upx;
			top:110upx
		}
		.mv_days{
			width: 200upx;
			height: 29upx;
			font-size: 35upx;
			color: #808080;
			position: absolute;
			left: 440upx;
			top:110upx
		}
		.mv_number{
			width: 100upx;
			height: 29upx;
			font-size: 35upx;
			color: #333333;
			position: absolute;
			left: 590upx;
			top: 110upx;
		}
	}
	
	
	.m_view3{
		width: 700upx;
		height: 440upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 380upx;
		.mv_selected{
			width: 300upx;
			height: 50upx;
			font-size: 36upx;
			color: #333333;
			font-weight: 800;
			position: absolute;
			left: 70upx;
			top: 30upx;
		}
		.mv_car{
			width: 340upx;
			height: 185upx;
			position: absolute;
			left: 180upx;
			top: 100upx;
		}
		.mv_carName{
			width: 300upx;
			height: 50upx;
			font-size: 36upx;
			color: #333333;
			font-weight: 500;
			position: absolute;
			left: 300upx;
			top: 290upx;
		}
		.mv_carType{
			width: 400upx;
			height: 50upx;
			font-size: 36upx;
			color: #333333;
			font-weight: 500;
			position: absolute;
			left: 180upx;
			top: 350upx;
		}
		.mv_carMoney{
			width: 300upx;
			height: 50upx;
			font-size: 36upx;
			color: #333333;
			font-weight: 700;
			position: absolute;
			left: 400upx;
			top: 350upx;
		}
	}
	
	.m_view4{
		width: 700upx;
		height: 430upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 840upx;
		.mv_charteredBusMessage{
			width: 400upx;
			height: 50upx;
			font-size: 36upx;
			color: #333333;
			font-weight: 800;
			position: absolute;
			left: 33upx;
			top: 20upx;
		}
		.mv_explain{
			width: 600upx;
			height: 30upx;
			font-size: 28upx;
			color: #808080;
			font-weight:500;
			position: absolute;
			left: 33upx;
			top:80upx;
		}
		.mv_tripMan{
			width: 400upx;
			height: 30upx;
			font-size: 32upx;
			color: #333333;
			font-weight: 700;
			position: absolute;
			left: 33upx;
			top: 170upx;
		}
		.mv_name{
			width: 300upx;
			height: 30upx;
			font-size: 32upx;
			color: #333333;
			font-weight: 700;
			position: absolute;
			left: 200upx;
			top: 170upx;
		}
		.mv_idCord{
			width: 400upx;
			height: 30upx;
			font-size: 32upx;
			color: #333333;
			font-weight: 700;
			position: absolute;
			left: 33upx;
			top: 270upx;
		}
		.mv_id{
			width: 500upx;
			height: 30upx;
			font-size: 32upx;
			color: #333333;
			font-weight: 700;
			position: absolute;
			left: 200upx;
			top: 270upx;
		}
		.mv_mobile{
			width: 400upx;
			height: 30upx;
			font-size: 32upx;
			color: #333333;
			font-weight: 700;
			position: absolute;
			left:33upx;
			top: 370upx;
		}
		.mv_phone{
			width: 400upx;
			height: 30upx;
			font-size: 32upx;
			color: #333333;
			font-weight: 700;
			position: absolute;
			left:200upx;
			top:370upx;
		}
		
	}
	
	.m_view5{
		width: 700upx;
		height: 100upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 1290upx;
		.mv_coupon{
			width: 200upx;
			height: 50upx;
			font-size:36upx;
			color: #333333;
			font-weight: 500;
			position: absolute;
			left: 33upx;
			top: 28upx;
		}
		.mv_noUsable{
			width: 130upx;
			height: 50upx;
			font-size: 36upx;
			color:#C0C0C0;
			font-weight: 300;
			position: absolute;
			left: 540upx;
			top: 28upx;
		}
	}
	
	.m_view6{
		width: 700upx;
		height: 100upx;
		background: #FFFFFF;
		position: absolute;
		border-radius: 15upx;
		left: 25upx;
		top: 1410upx;
		.mv_charteredBusNotice{
			width: 300upx;
			height:30upx;
			font-size: 36upx;
			color: #333333;
			font-weight: 500;
			position: absolute;
			left: 33upx;
			top: 28upx;
		}
		.mv_all{
			width: 400upx;
			height: 30upx;
			font-size: 36upx;
			color: #19A0FF;
			font-weight: 300;
			position: absolute;
			left:200upx;
			top: 30upx;
		}
	}
	
	.m_view7{
		width: 750upx;
		height: 100upx;
		background: #FFFFFF;
		position: absolute;
		top: 1520upx;
		.mv_money{
			width: 400upx;
			height: 30upx;
			font-size: 40upx;
			color: #FC4646;
			font-weight: 500;
			position: absolute;
			left:17upx;
			top: 30upx;
		}
		.mv_view{
			width: 310upx;
			height: 100upx;
			background: #FC4B4B;
			position: absolute;
			right: 0upx;
		}
		.mvv_atOnce{
			width: 170upx;
			height: 30upx;
			font-size:40upx;
			color: #FFFFFF;
			font-weight: 500;
			position: absolute;
			left:70upx;
			top: 25upx;
		}
	}
	
</style>
