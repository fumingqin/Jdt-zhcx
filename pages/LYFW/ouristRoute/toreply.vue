<template>
	<view>
		<view class="tweetsTitle">回复</view>
		<!-- 评论区 -->
		<view class="replyClass" v-for="(item,index) in replyContent" :key="index">
			<image class="replyPortrait" :src="item.portrait" mode="aspectFill"></image>
			<view class="replyRight">
				<text class="replyName">{{item.scennicName}}</text>
				<text class="replyDate">{{item.date}}</text>
				<view class="replyBtn" :class="{active: item.fabulousState}" @click="tofabulous(index)">
					<text class="jdticon icon-dianzan-ash"></text>
					<text style="color: #aaa;">{{item.fabulous}}</text>
				</view>
				<text class="replyCon">{{item.content}}</text>
			</view>
		</view>
		<view class="blank"></view>
		<view class="replyBox">
			<image class="replyImage" :src="'../../../static/LYFW/peripheralTourism/user/missing-face.png'" mode="aspectFill"></image>
			<input class="reply_input" type="text" placeholder="回复点什么吧" v-model="replyInput.content" />
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				replyContent: [], //回复内容
				routeComment: {},
				//评论内容
				replyInput: {
					unid: '', //用户id号
					nickname: '', //用户姓名
					portrait: '', //用户头像
					content: '', //回复内容
					date: '', //回复日期
					fabulous: 0, //点赞数
					fabulouState: false, //点赞状态
				},
			}
		},
		onLoad() {
			this.routeInit();
		},
		methods: {
			//读取静态数据json.js
			async routeInit() {
				let routeComment = await this.$api.lyfwcwd('routeComment');
				this.picList = routeComment.data.image;
				this.titleClick = routeComment.data;
				let userInfo = await this.$api.lyfwcwd('userInfo');
				this.userInfo = userInfo.data;
				this.replyInput.portrait = userInfo.data.portrait;
				let replyContent = await this.$api.lyfwcwd('reply');
				this.replyContent = replyContent.data;
				// console.log(this.replyInput.portrait)
			},
			// 点赞事件
			tofabulous: function(index) {
				if (this.replyContent[index].fabulousState == false) {
					this.replyContent[index].fabulousState = true;
					var num = this.replyContent[index].fabulous;
					this.replyContent[index].fabulous = num + 1;
				} else {
					this.replyContent[index].fabulousState = false;
					var num = this.replyContent[index].fabulous;
					this.replyContent[index].fabulous = num - 1;
				};
			},
			//回复时间，判断是否登录后才能进行回复
			publish() {
				if (!this.hasLogin) {
					uni.showToast({
						title: '请先登录再回复',
						icon: 'none',
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/public/login'
						})
					}, 1500);
				} else {
					if (this.tweets.commentState == false) {
						this.tweets.commentState = true;
						uni.showToast({
							title: '回复成功',
						})
						this.replyInput.content = '';
					} else {
						uni.showToast({
							title: '回复成功'
						})
						this.replyInput.content = '';
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	// 回复
	.tweetsTitle {
		display: flex;
		position: relative;
		font-size: 38upx;
		font-weight: bold;
		color: #333333;
		padding: 32upx 32upx;
	}

	// 评论区
	.replyClass {
		display: flex;
		position: relative;

		.replyPortrait {
			position: relative;
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100upx;
			left: 30upx;
		}

		.replyRight {
			position: relative;
			padding-left: 51rpx;

			.replyName {
				display: block;
				font-size: 30upx;
				color: #aaa;
			}

			.replyDate {
				display: block;
				font-size: 30upx;
				color: #aaa;
			}

			.replyBtn {
				display: flex;
				align-items: base-line;
				position: absolute;
				top: 18upx;
				font-size: 32upx;
				padding-left: 506upx;

				.jdticon {
					font-size: 38upx;
					margin-left: 8upx;
					color: #aaa;
				}

				&.active,
				&.active .jdticon {
					color: #28a4ff;
				}
			}

			.replyCon {
				display: flex;
				line-height: 20px;
				font-size: 30upx;
				color: #333;
				padding-top: 39upx;
				padding-right: 36upx;
				padding-bottom: 52upx;

			}
		}

	}
	.blank{
		width: 100%;
		height: 112upx;
		background: #fff;
	}
	.replyBox{
		display: flex;
		left: 0;
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 112upx;
		.replyImage{
			position: relative;
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
			left: 30upx;
			margin-top: 16upx;
		}
		.reply_input{
			position: relative;
			font-size: 32upx;
			color: #333;
			padding: 0upx 32upx;
			padding-left: 32upx;
			background: #f5f5f5;
			left: 50upx;
			width: 70%;
			height: 80upx;
			border-radius: 56rpx;
			margin-top: 16upx;
		}
	}
</style>
