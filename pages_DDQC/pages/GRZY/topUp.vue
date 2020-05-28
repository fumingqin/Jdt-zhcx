<template>
	<view>
		<view>
			<view class="tu_title">充值金额</view>
		</view>
		<view style="display: flex;">
			<view class="tu_symbol">￥{{cost}}</view>
			<view class="tu_balance">当前余额￥{{balance.toFixed(2)}}</view>
		</view>
		<view style=" width:670upx;margin-left: 40upx; margin-top:40upx;border: 1px solid #E2E2E2;"></view>
		<view class="tu_view">
			<view v-for="(item,index) in info" :key="index">
				<view class="tu_square" :class="{current2: value===index}" @click="affirm(index,item.money)">
					<view class="tu_money">￥{{item.money.toFixed(2)}}</view>
					<view class="tu_award">赠送 ￥{{item.award.toFixed(2)}}</view>
				</view>
			</view>
		</view>
		<view class="tu_check">
			<checkbox-group>
				<label>
					<checkbox value="cb" checked="true" />同意资金存管协议
				</label>
			</checkbox-group>
			<view class="tu_notice"@click="open()">说明></view>
		</view>
		<uni-popup ref="popup2" type="bottom">
			<view class="boxVlew">
				<view class="titleView">
					<text class="Nb_text1">说明</text>
					<view class="Nb_text2 jdticon icon-fork " @click="close()"></view>
				</view>
				<scroll-view class="noticeBox" scroll-y="ture">
					<text class="Nb_text4">
						{{security}}
					</text>
				</scroll-view>
			</view>
		</uni-popup>
		<view class="tu_view2">
			<view class="tv_text">应付金额</view>
			<view class="tv_money">￥{{cost}}</view>
			<view class="tv_atOnceView">
				<view style="text-align: center;margin-top: 20upx;">立即支付</view>
			</view>
		</view>
	</view>

</template>

<script>
	import uniPopup from "../../components/GRZY/uni-popup/uni-popup.vue"
	export default {
		components: {
			//加载多方弹框组件
			uniPopup,
		},
		data() {
			return {
				value: 0,
				info: {
					money: 0,
					award: 0,
				},
				security:'',
				cost: 10,
				balance: 0,
			}
		},
		onLoad() {
			this.getlist();
		},
		methods: {
			affirm(index, e) {
				this.value = index;
				this.cost = e;
			},
			async getlist() {
				let array = await this.$api.zyxinfo('topupInfo');
				this.info = array.data;
				this.security=array.security;
				console.log(this.info)
			},

			//打开弹窗
			open() {
				this.$refs.popup2.open()
			},
			close() {
				this.$refs.popup2.close()
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}


	.tu_title {
		margin-top: 40upx;
		margin-left: 38upx;
		font-size: 38upx;
		font-weight: 600;
	}

	.tu_symbol {
		margin-top: 71upx;
		margin-left: 38upx;
		font-size: 38upx;
		font-weight: 600;
	}

	.tu_balance {
		margin-top: 71upx;
		margin-left: 321upx;
		font-size: 32upx;
		font-weight: 300;
	}

	.tu_view {
		display: flex;
		margin-left: 12upx;
		margin-top: 44upx;
		flex-wrap: wrap;

		.tu_square {
			width: 325upx;
			height: 199upx;
			margin-left: 26upx;
			margin-top: 26upx;
			z-index: 28;
			background: #FFFFFF;
			border: 1px solid #E2E2E2;
			border-radius: 12upx;

			&.current2 {
				z-index: 30;
				background-color: #E0FFE3;
				border: 1px solid #65C36D;
				border-radius: 12rpx;
			}
		}

		.tu_money {
			text-align: center;
			margin-top: 47upx;
			font-size: 36upx;
			font-weight: 800;
		}

		.tu_award {
			text-align: center;
			margin-top: 31upx;
			font-size: 28upx;
			font-weight: 300;
		}
	}
	.tu_check{
		margin-top: 44upx;
		margin-left: 37upx;
		display: flex;
		.tu_notice {
			margin-left: 296upx;
			font-size: 26upx;
			color: #4281FF;
		}
	}

	//底部信息
	.tu_view2 {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 120upx;
		justify-content: space-between;
		font-size: 30upx;
		background: #fff;

		.tv_text {
			font-size: 26upx;
			font-weight: 400;
			margin-left: 20upx;
		}

		.tv_money {
			font-size: 38upx;
			color: #FC4646;
			font-weight: 400;
		}

		.tv_atOnceView {
			width: 308upx;
			height: 90upx;
			background: #65C36D;
			margin-left: 160upx;
			margin-right: 28upx;
			border-radius: 69upx;
			font-size: 34upx;
			color: #FFFFFF;
			font-weight: 400;
			text-align: center;
		}
	}
	.boxVlew {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 92upx;
		background: #FFFFFF;
		z-index: 999;
	
		.titleView {
			margin: 24upx 0;
			text-align: center;
	
			//弹框标题
			.Nb_text1 {
				position: relative;
				font-size: 38upx;
				font-weight: 300;
				top: 8upx;
				margin-bottom: 16upx;
			}
	
			//弹框关闭按钮
			.Nb_text2 {
				width: 20upx;
				height: 20upx;
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}
	
		.noticeBox {
			height: 800upx;
			line-height: 32upx;
	
			.Nb_text4 {
				display: block;
				line-height: 64upx;
				margin: 32upx 0;
				font-size: 30upx;
			}
		}
	}
</style>
