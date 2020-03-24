<template>
	<!-- 顶部滑动 -->
	<view>
		<view class="box">
			<QSTabs :current="current_1" :tabs="QStabs" minWidth="375" animationLineWidth="100" height="92"  hasItemBackground animationMode="line2"  @change="change($event, '1')"/>
		</view>
		
		<!-- 文章内容 -->
		<view v-if="current_1 ==0">
			<view class="content" v-for="(item,index) in collectionContent" :key="index" @click="godetail(item.title)">
				<view class="contentView">
					<image class="scenicspotImage" :src="item.image" mode="aspectFill"/>
					<view class="contentClass">
						<text class="scenicspotTitle">{{item.title}}</text>
						<text class="scenicspotCost">人均费用&nbsp;&nbsp;&nbsp;{{item.cost}}元</text>
						<text class="scenicspotDay">出行天数&nbsp;&nbsp;&nbsp;{{item.day}}天</text>
						<view class="end">
							<text class="scenicspotEnd">目的地</text>
							<text class="scenicspotEnd2">{{item.scenicName}}</text>
						</view>
					</view>
				</view>
					<view class="timeClss">
						<text>发布于{{item.date}}</text>
						<text class="jdticon icon-shoucang"></text>
						<text class="right">{{item.like}}</text>
						<text class="jdticon icon-pinglun-copy"></text>	
						<text class="right">{{item.comment}}</text>
					</view>
			</view>
		</view>
		
		<!-- 商品内容 -->
		<view v-if="current_1 ==1">
			<view class="commodity" v-for="(item,index) in collectionCommodity" :key="index">
				<view class="commodityView">
					<image class="commodityImage" :src="item.image" mode="aspectFill"/>
					<view class="commodityClass">
						<text class="commodityTitle">{{item.title}}</text>
						<view class="exampleBody">
							<uni-rate class="rateClass" color="#FF6600" active-color="#FF6600" :is-fill="false" :size="15" :disabled="true" :value="item.score" />
							<text class="rateScore">{{item.score}}分</text>
							<text class="commentText">{{item.comment}}条评论</text>
						</view>
						<text class="labelText">{{item.label}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {
			QSTabs,
			uniRate,
		},
		data() {
			return {
				current_1:0,//第几个导航栏
				//导航栏名字
				QStabs:[
					{name:'文章', backgroundColor: 'rgba(245,245,245,1)', itemBackgroundColor: 'rgba(255,255,255,1)'},
					{name:'商品', backgroundColor: 'rgba(245,245,245,1)', itemBackgroundColor: 'rgba(255,255,255,1)'}
				],
				collectionContent : [], //景点内容
				collectionCommodity : [],//商品内容
			}
		},
		
		//返回接口数据调用
		onLoad() {
			this.ContentInit();
		},
		
		methods: {
			// 顶部tab切换点击事件
			change(index, i) {
				this['current_' + i] = index;
			},
			
			//读取静态页面json.js
			async ContentInit(){
				let collection_content = await this.$api.lyfwcwd('collectionContent');
				this.collectionContent = collection_content.data;
				let collection_commodity = await this.$api.lyfwcwd('collectionCommodity');
				this.collectionCommodity = collection_commodity.data;
			},
			
			//景点内容点击
			godetail : function (e){
				uni.showToast({
					title:'你点击了'+e,
					icon:'none'
				})
				setTimeout(function(){
					uni.navigateTo({
						url:''
					})
				},500);
			},
		}
	}
</script>

<style lang="scss">
	// 内容样式
	.content{
		margin: 32upx 32upx;
		padding-bottom: 32upx;
		border-bottom: 1px #F5F5F5 dotted;
		.contentView{
			display: flex;
			.scenicspotImage{
				width: 264upx;
				height: 200upx;
				text-align: left;
				border-radius:5px;
			}
			.contentClass{
				margin-left: 24upx;
				margin-top: -11upx;
				.scenicspotTitle{
					font-weight:bold;
					font-size:32upx;
					color:rgba(51,51,51,1);
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.scenicspotCost{
					display: block;
					font-size: 26upx;
					color: #333333;
					padding-top: 14upx;
				}
				.scenicspotDay{
					display: block;
					font-size: 26upx;
					color: #333333;
					padding-top: 22upx;
				}
				.end{
					display: flex;
					.scenicspotEnd{
						width: 28%;
						font-size: 26upx;
						color: #333333;
						padding-top: 22upx;
					}
					.scenicspotEnd2{
						font-size: 26upx;
						color: #0CA1DF;
						padding-top: 22upx;
						padding-left: 58upx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}
		.timeClss{
			display: flex;
			width: 100%;
			font-size: 26upx;
			color: #AAAAAA;
			padding-top: 30upx;
			// padding-right: 32upx;
			.jdticon{
				position: relative;
				font-size: 28upx;
				margin-left: 12upx; 
				left: 296upx;
			}
			.right{
				position: relative;
				margin-left: 12upx;
				left: 295upx;
				bottom: 6upx;
			}
		}
	}
	
	// 商品内容
	.commodity{
		margin: 32upx 32upx;
		padding-bottom: 32upx;
		border-bottom: 1px #F5F5F5 dotted;
		.commodityView{
			display: flex;
			.commodityImage{
				width: 264upx;
				height: 200upx;
				text-align: left;
				border-radius:5px;
			}
			.commodityClass{
				margin-left: 24upx;
				margin-top: -11upx;
				.commodityTitle{
					font-weight:bold;
					font-size:32upx;
					color:rgba(51,51,51,1);
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.exampleBody{
					display: flex;
					margin-top: 13upx;
					.rateClass{
						padding-top: 29upx;
					}
					.rateScore{
						padding-top: 15upx;
						padding-left: 10upx;
						font-size: 24upx;
						color: #888888;
					}
					.commentText{
						padding-top: 15upx;
						padding-left: 22upx;
						font-size: 24upx;
						color: #888888;
					}
				}
				.labelText{
					border:1px solid #fff1e8;
				}
			}
		}
	}
</style>
