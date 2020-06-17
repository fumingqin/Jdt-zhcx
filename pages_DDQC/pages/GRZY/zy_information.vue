<template>
	<view>
		<!-- 顶部文本 -->
		<view>
			<text class="if_topText">因微信满一年订单保护机制，押金无法原路退回，需提供姓名及身份证，进行人工手动退款；注：请确保以下信息真实有效，如因提供的信息错误而导致退押纠纷等情况，达达通不承担任何责任及退款义务</text>
		</view>

		<!-- 持卡人 -->
		<view class="if_cardholder">
			<text class="ch_text">持卡人</text>
			<input name="nickName" class="ch_cardholder" placeholder-style="#AAAAAA" placeholder="请输入持卡人姓名" maxlength="19" />
		</view>

		<!-- 输入银行卡号 -->
		<view class="if_cardNumber">
			<text class="cn_text">卡号</text>
			<input class="cn_card" placeholder="请输入卡号" placeholder-style="#AAAAAA" type="number" maxlength="23" v-model="textNumber" @input="onInput(textNumber)" ></input>
		</view>

		<!-- 选择银行 -->
		<view class="if_selectBank">
			<text class="sb_text">银行</text>
			<input name="nickNumber" style="font-size:32upx;padding-left: 60upx;" placeholder-style="#AAAAAA" type="number" placeholder="请输入银行"/>
			<!-- <picker @change="godetail" :value="index" :range="selectBank" range-key="txt">
				<text v-if="selectBank[index].txt=='请选择'" class="tsnrText">{{selectBank[index].txt}}<text class="jdticon icon-xia"></text></text>
				<text v-if="selectBank[index].txt!=='请选择'" class="tsnrText2">{{selectBank[index].txt}}<text class="jdticon icon-xia"></text></text>
			</picker> -->
		</view>
		<view class="if_text2">
			<text>注意：开户行需详细到相关支行信息，如：中国建设银行南靖支行、中国银行南靖山城支行</text>
		</view>

		<!-- 须知 -->
		<view class="if_notice">
			<radio class="nt_radio" value="1" :color="'#70c778'" :checked="selectedValue===1 ? true : false" @click="Selection"></radio>
			<text class="nt_text">我已阅读并同意</text>
			<text class="nt_text2" @click="open">《信用卡还款服务协议》</text>

			<!-- 押金支付弹框 -->
			<uni-popup ref="popup" type="bottom">
				<view class="po_boxVlew">
					<view class="bv_topText">
						<text class="tt_text">押金充值</text>
						<text class="tt_icon jdticon icon-fork " @click="close(1)"></text>
					</view>
					<view class="tt_view">
						<rich-text class="tt_tear" :nodes="expenseDetail.way"></rich-text>
					</view>
					<view class="vi_bottom"></view>
				</view>
			</uni-popup>
		</view>

		<view class="if_btn">
			<view class="bt_text">提交</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/pages_DDQC/components/GRZY/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup,
		},
		data() {
			return {
				textNumber:'',
				expenseDetail: '',
				selectedValue: 0,
				index: 0,
				selectBank: '',
				detailInfo: {
					bankObject: '', //银行
				},
			}
		},
		onLoad() {
			this.routeInit();
		},
		methods: {
			//-----------------读取静态数据json.js-------------------------------
			async routeInit() {
				let selectBank = await this.$api.lyfwcwd('selectBank');
				this.selectBank = selectBank.data;
				let expenseDetail = await this.$api.lyfwcwd('expenseDetail');
				this.expenseDetail = expenseDetail.data;
				console.log(this.selectBank)
			},

			//------------------------------弹框事件-----------------------------------------

			open() {
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open()
			},
			//关闭
			close(e) {
				if (e == 1) {
					this.$refs.popup.close()
				}
			},

			//----------------------投诉对象内容点击--------------------------------------
			godetail: function(e) {
				console.log(e)
				this.index = e.detail.value;
				this.detailInfo.bankObject = this.selectBank[e.detail.value];
			},

			//------------------------------同意-点击事件--------------------------------
			Selection: function() {
				if (this.selectedValue == 0) {
					this.selectedValue = 1;
				} else {
					this.selectedValue = 0;
				}
			},
			
			onInput:function(e){
				this.textNumber = e.replace(/\D+/g, '').replace(/(\d{4})/g, '$1 ').replace(/ $/, '')
			},
			
			// yhkchange: function(e) {
			// 	var yhkd = e.detail.value;
			// 	var len = yhkd.length
			// 	if((len+1) % 5 == 0){
			// 		yhkd=yhkd+' '
			// 	}
			// 	this.setData({
			// 		yhkhdata: yhkd
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	.if_topText {
		display: flex;
		margin: 30upx;
		font-size: 28upx;
		font-weight: bold;
		// text-align: justify;
	}

	//输入银行卡号
	.if_cardNumber {
		display: flex;
		margin-top: 30upx;
		margin-left: 30upx;
		margin-right: 30upx;
		padding-bottom: 30upx;
		border-bottom: 1px #F5F5F5 dotted;

		.cn_text {
			font-size: 32upx;
			font-weight: bold;
		}

		.cn_card {
			width: 430upx;
			font-size: 32upx;
			padding-left: 60upx;
		}
	}

	//选择银行
	.if_selectBank {
		display: flex;
		margin-top: 30upx;
		margin-left: 30upx;
		margin-right: 30upx;
		padding-bottom: 30upx;
		border-bottom: 1px #F5F5F5 dotted;

		.sb_text {
			font-size: 32upx;
			font-weight: bold;
		}

		.tsnrText {
			display: flex;
			font-size: 32upx;
			padding-left: 60upx;
			color: #AAAAAA;

			.jdticon {
				position: relative;
				top: 9upx;
				left: 20upx;
			}
		}

		.tsnrText2 {
			display: flex;
			font-size: 32upx;
			padding-left: 60upx;

			.jdticon {
				position: relative;
				top: 9upx;
				left: 20upx;
			}
		}
	}

	//持卡人
	.if_cardholder {
		display: flex;
		margin-top: 95upx;
		margin-left: 30upx;
		margin-right: 30upx;
		padding-bottom: 30upx;
		border-bottom: 1px #F5F5F5 dotted;

		.ch_text {
			font-size: 32upx;
			font-weight: bold;
		}

		.ch_cardholder {
			font-size: 32upx;
			padding-left: 26upx;
		}
	}

	.if_notice {
		display: flex;
		padding-top: 35upx;

		.nt_radio {
			padding-left: 25upx;
			transform: scale(0.7);
		}

		.nt_text {
			font-size: 28upx;
			padding-top: 8upx;
		}

		.nt_text2 {
			font-size: 28upx;
			color: #4281FF;
			padding-top: 8upx;
			padding-left: 15upx;
		}
	}

	//顶部
	.po_boxVlew {
		z-index: 999;
		background-color: #FFFFFF;
		border-radius: 28upx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.bv_topText {
		display: flex;
		position: relative;
		padding-top: 48upx;
		padding-left: 51upx;
		padding-right: 51upx;

		.tt_text {
			font-size: 38upx;
			margin: 0 auto;
			color: #333333;
		}

		.tt_icon {
			position: absolute;
			font-size: 32upx;
			right: 0;
			padding-right: 42upx;
		}
	}

	.tt_view {
		padding-left: 42upx;
		padding-right: 42upx;
		padding-top: 20upx;

		.tt_tear {
			font-size: 30upx;
			text-align: justify;
			line-height: 47upx;
			color: #333333;
		}
	}

	.if_btn {
		width: 689upx;
		height: 106upx;
		margin-top: 73upx;
		border-radius: 15upx;
		background: #65C36D;
		color: #FFFFFF;
		margin-left: 30upx;
		margin-right: 30upx;

		.bt_text {
			padding-top: 30upx;
			text-align: center;
		}
	}

	.if_text2 {
		padding: 30upx;
		font-size: 24upx;
		color: #E3424B;
	}
</style>
