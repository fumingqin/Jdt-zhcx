<template>
	<view>
		<view class="tweetsTitle">回复</view> 
		<view class="Hf_box" v-for="(item,index) in replyContent" :key="index">
			<image class="Hf_portrait" :src="item.portrait" mode="aspectFill"></image>
			<view class="Hf_right">
				<text class="Hf_name">{{item.scennicName}}</text>
				<text class="Hf_date">{{item.date}}</text>
				<view class=".Hf_btn" :class="{active: item.fabulous_state}" @click="tofabulous(index)" >
					<text class="jdticon icon-dianzan-ash"></text>
					<text style="color: #aaa;">{{item.fabulous}}</text>
				</view>
				<text class="Hf_con">{{item.content}}</text>
				</view>
		</view>
			<view class="tianbai"></view>
			<view class="Hf_reply" >
				<image :src="userInfo.portrait || '../../../static/LYFW/peripheralTourism/user/missing-face.png'" mode="aspectFill" ></image>
				<input type="text" placeholder="回复点什么吧"  v-model="replyInput.content"  @confirm="publish" />
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
				routeComment:{},
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
				if (this.replyContent[index].fabulous_state == false) {
					this.replyContent[index].fabulous_state = true;
					var num = this.replyContent[index].fabulous;
					this.replyContent[index].fabulous = num + 1;
				} else {
					this.replyContent[index].fabulous_state = false;
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
					if (this.tweets.comment_state == false) {
						this.tweets.comment_state = true;
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
	//推文标题
	.tweetsTitle{
		display: flex;
		position : relative;
		flex-direction: column;
		font-size: 38upx;
		font-weight: bold;
		color: #333333; 
		padding: 32upx 32upx;
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
	}
	.Hf_reply{
		display: flex;
		left: 0;
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 112upx;
		image{
			position: relative;
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
			left: 30upx;
			margin-top: 16upx;
		}
		input{
			position: relative;
			font-size: 32upx;
			color: #333;
			padding: 12upx 32upx;
			padding-left: 32upx;
			background: #f5f5f5;
			left: 50upx;
			width: 77%;
			height: 80upx;
			border-radius: 56rpx;
			margin-top: 16upx;
		}
	}
	//回复区
	.Hf_box{
		display: flex;
		.Hf_portrait{
			position: relative;
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
			left: 30upx;
		}
		.Hf_right{
			flex: 1;
			display: flex;
			flex-direction: column;
			position: relative;
			font-size: 30upx;
			color: #aaa;
			padding-top: 8upx;
			padding-left: 50upx;
			padding-right: 32upx;
			margin-bottom: 56upx;
			.Hf_btn{
				display:flex;
				align-items:base-line;
				position:absolute;
				top: 18upx;
				right: 48upx;
				font-size: 32upx;
				.yticon{
					font-size: 38upx;
					margin-left: 8upx; 
					color: #aaa;
				}
				&.active, &.active .yticon{
					color: #28a4ff;
				}
			}
			.Hf_con{
				font-size: 30upx;
				color: #333;
				padding-top:32upx;
				padding-right:14upx;
			}
		}
	}
	.tianbai{
		width: 100%;
		height: 112upx;
		background: #fff;
	}
</style>
