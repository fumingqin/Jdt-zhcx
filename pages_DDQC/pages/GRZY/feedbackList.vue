<template>
	<view class="content">
		<block v-for="(item,index) in feedbackList" :key="index">
			<view class="list">
				<view>
					<view class="listItem" style="font-weight: bolder;" >用户反馈：{{item.Suggestion}}</view>
					<view class="listItem" v-if="item.IsReply">客服回复：{{item.ReplyContent}}</view>
					<view class="listItem">{{getTime(item.SuggestionTime)}}</view>
				</view>
				<!-- <view class="detail">详情</view> -->
			</view>
		</block>
	</view>
</template>

<script>
	var _self;
	import $DDTInterface from '@/common/DDT.js'
	export default {
		data() {
			return {
				feedbackList:[],//反馈列表数组
			}
		},
		onLoad() {
			_self = this;
			
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				uni.navigateTo({
					url:'../../../pages_GRZX/pages/GRZX/feedback'
				})
			}
		},
		onShow() {
			_self.GetMySuggestionList();
		},
		methods: {
			//--------------------------反馈列表数据--------------------------
			GetMySuggestionList:function(){
				uni.getStorage({
					key: 'userInfo',
					success: function(userinfo) {
						uni.request({ 
							url:$DDTInterface.DDTInterface.GetMySuggestionList.Url,
							method:$DDTInterface.DDTInterface.GetMySuggestionList.method,
							data:{
								userID:userinfo.data.userId
							},
							success(res) {
								if(res.data.status == true){
									_self.feedbackList = res.data.data
								}
							},
							fail(res) {
								console.log(res)
							}
						})
					},
					fail(data) {}
				})
			},
			//--------------------------反馈--------------------------
			feedData:function(item){
				if(item.IsReply){
					return item.ReplyContent
				}else{
					return '暂无反馈结果'
				}
			},
			//--------------------------时间转换--------------------------
			getTime:function(time){
				if(time){
					var timeDate = time.replace('T',' ')
					return timeDate.substring(0,timeDate.lastIndexOf("."))
				}
			}
		}
	}
</script>

<style>
	page,
	.content{
		height: 100%;
		width: 100%;
		background-color: #EEEEEE;
	}
	
.list{
	align-items: center;
	margin-top: 20rpx;
	display: flex;
    justify-content: space-between;
	border-radius: 15rpx;
	margin-left: 10rpx;
	margin-right: 10rpx;
	background-color: #FFFFFF;
}
.listItem{
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 95%;
	padding-top: 10rpx;
	padding-bottom: 10rpx;
	margin-left: 20rpx;
	font-size: 30rpx;
	color: #333333;
}
.detail{
	margin-right: 20rpx;
	font-size: 30rpx;
	color: #108040;
}
</style>
