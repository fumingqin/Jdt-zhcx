<template>
	<view class="content">
		<block v-for="(item,index) in breakdownList" :key="index">
			<view style="margin-top: 20rpx;margin-left: 20rpx;margin-right: 20rpx;">
				<view class="time">{{getTime(item.ReportTime)}}</view>
				<view class="historyContent">
					<view class="imageView">
						<image class="image" src="../../static/breakDown/breakList.png" lazy-load="true"></image>
					</view>
					<view>
						<view style="font-size: 30rpx;font-weight: 300;margin-top: 10rpx;">{{item.ReportContent}}</view>
						<view>
							<view style="font-size: 30rpx;font-weight: 300;margin-top: 10rpx;height: 100rpx;line-height: 100rpx;" v-if="!item.ReportPicture">故障图片：未上传图片</view>
							<block v-for="(item,index) in imageToArray(item.ReportPicture)" :key="index">
								<image style="width: 150rpx;height: 150rpx;border-radius: 10rpx;margin-right: 5rpx;" :src="item" lazy-load="true"></image>
							</block>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	var _self;
	import $DDTInterface from "@/common/DDT.js"
	export default {
		data() {
			return {
				breakdownList:[],//故障列表
				imageArray:[],//照片数组
			}
		},
		onLoad() {
			_self = this;
			_self.GetMyFailureReportList()
			
		},
		methods: {
			//------------------------------故障历史列表------------------------------
			GetMyFailureReportList:function(){
				uni.getStorage({
					key: 'userInfo',
					success: function(userinfo) {
						uni.request({
							url:$DDTInterface.DDTInterface.GetMyFailureReportList.Url,
							method:$DDTInterface.DDTInterface.GetMyFailureReportList.method,
							data:{
								userID:userinfo.data.userId
							},
							success(res) {
								console.log(res)
								if(res.data.status == true){
									_self.breakdownList = res.data.data
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
			//
			imageToArray:function(item){
				if(item){
					return item.split(',')
				}
			},
			//--------------------------时间转换--------------------------
			getTime:function(time){
				if(time){
					var timeDate = time.replace('T',' ')
					return timeDate.substring(0,timeDate.lastIndexOf("."))
				}
			},
		}
	}
</script>

<style>
	page,.content{
		background-color: #EEEEEE;
	}
	.time{
		font-size: 30rpx;
		font-weight: 300;
		color: #333333;
	}
	.historyContent{
		background-color: #FFFFFF;
		display: flex;
		border-radius: 10rpx;
	}
	.imageView{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100rpx;
	}
	.image{
		
		height: 60rpx;
		width: 60rpx;
	}
</style>
