<template>
	<view>
		<!-- 选择地址 -->
		<view class="selectAddress">
			<!-- 选择市区 -->
			<view class="choiceSQ">
				<text class="sfdText">事发地</text>
				<pickerAddress class="regionSelector" @change="change">{{txt}}<text class="jdticon icon-xia"></text></pickerAddress>
			</view>
			<!-- 投诉对象 -->
			<view class="complaintDX">
				<text class="tsdxText">投诉对象</text>
				<picker @change="godetail" :value="index" :range="complaint">
					<text class="tsnrText">{{complaint[index]}}<text class="jdticon icon-xia"></text></text>
				</picker>
			</view>
		</view>

		<!-- 内容 -->
		<view class="content">
			<!-- 投诉原因 -->
			<view class="ComplaintYY">
				<text class="yyText">投诉原因</text>
				<textarea class="yyTitle"  placeholder-style="#AAAAAA" placeholder="描述详尽助于提升处理速度" maxlength="500" @input="descInput"
				 v-model='a' style="width: 295px;height: 100px;" />
				<view class="num">{{remnant}}/500字</view>
			</view>
			<!-- 原因范本 -->
			<view class="reasonFB">
				<text class="fbText">原因范本</text>
				<text class="tiemBtn" @click="paste">复制</text>
				<text class="fbTitle" placeholder-style="#AAAAAA" v-model="b" style="width: 295px;height: 71px;"></text>
			</view>
		</view>


	</view>
</template>

<script>
	import pickerAddress from '../../components/GRZX/wangding-pickerAddress/wangding-pickerAddress.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			pickerAddress,
			//加载多方弹框组件
			uniPopup
		},

		data() {
			return {
				txt: '选择地址',
				txt2: '请选择内容',
				complaint: [], //投诉对象
				index: 0,
				remnant: 0,
				textarea:'',
				a:'',
				b:'本人于 #填写时间  在#填写事发地详细地址# 发生 了 #描述投诉原因# ， 本人希望 #填写您的述求， 如退票#',
				
			}
		},
		onLoad() {
			this.routeInit();
		},
		methods: {
			//读取静态数据json.js
			async routeInit() {
				let complaint = await this.$api.lyfwcwd('complaint');
				this.complaint = complaint.data;
				// console.log(this.complaint)
			},

			//投诉对象内容点击
			godetail: function(value) {
				this.index = value.target.value;
				console.log('picker发送选择改变，携带值为', value.target.value)
			},


			//加载事件组件
			change: function(data) {
				var a = data.data[0];
				var b = data.data[1];
				var c = data.data[2];
				var d = `${a} ${b} ${c}`;
				this.txt = d;
				console.log(d)
				// console.log(data)
			},

			//字数
			descInput: function(e) {
				this.remnant = e.detail.value.length
			},

			//复制
			paste:function(){
				var that=this;
				that.b = this.a;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}

	// 选择地址样式
	.selectAddress {
		padding-top: 56upx;
		padding-left: 32upx;
		padding-right: 32upx;
		background-color: #FFFFFF;

		.choiceSQ {
			border-bottom: 1px #F5F5F5 dotted;

			.sfdText {
				font-weight: bold;
				font-size: 32upx;
			}

			.regionSelector {
				display: flex;
				padding-top: 40upx;
				font-size: 30upx;
				color: #333333;
				padding-bottom: 32upx;

				.jdticon {
					position: relative;
					top: 9upx;
					left: 20upx;
				}
			}

		}

		// 投诉对象样式
		.complaintDX {
			padding-top: 28upx;

			.tsdxText {
				font-weight: bold;
				font-size: 32upx;
			}

			.tsnrText {
				display: flex;
				padding-top: 40upx;
				font-size: 30upx;
				color: #333333;
				padding-bottom: 32upx;

				.jdticon {
					position: relative;
					top: 9upx;
					left: 20upx;
				}
			}
		}
	}

	// 内容
	.content {
		margin: 24upx 0;
		padding-top: 56upx;
		padding-left: 32upx;
		padding-right: 32upx;
		background-color: #FFFFFF;

		// 投诉内容
		.ComplaintYY {
			border-bottom: 1px #F5F5F5 dotted;

			.yyText {
				font-weight: bold;
				font-size: 32upx;
			}

			.yyTitle {
				padding-top: 40upx;
				font-size: 30upx;
			}

			.num {
				text-align: right;
				font-size: 30upx;
				color: #AAAAAA;
				padding-bottom: 23upx;
			}
		}

		// 原因范本
		.reasonFB {
			padding-top: 28upx;

			.fbText {
				font-weight: bold;
				font-size: 32upx;
			}

			.fbTitle {
				padding-top: 40upx;
				font-size: 30upx;
			}
		}
	}
</style>
