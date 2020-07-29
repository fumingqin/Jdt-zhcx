<template>
	<view>
		<!-- 输入框 -->
		<view class="inputBox">
			<input class="input" @input="input" :value="inputValue" placeholder="输入车辆编号(必填)" />
		</view>
		<!-- 故障类型 -->
		<view class="breakTypeBox">
			<text class="title">故障类型</text>
			
			<view class="breakBox">
				<block v-for="(item,index) in pictureArr" :key="index">
					<view class="item">
						<image class="image" :src="item.url"></image>
						<text class="subTitle">{{item.title}}</text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	import robbyImageUpload from '@/pages_GRZX/components/GRZX/robby-image-upload/robby-image-upload.vue'
	import {
		pathToBase64,
		base64ToPath
	} from '@/pages_GRZX/components/GRZX/imageTool/index.js'
	import $DDTInterface from '@/common/DDT.js'
	export default {
		components: {
			robbyImageUpload,
		},
		data() {
			return {
				bicycleNum:'',//车辆编号
				inputValue:'',//输入框内容
				pictureArr:[{
					url:'../../static/breakDown/count.png',
					title:'已还车仍计费'
				},
				{
					url:'../../static/breakDown/rent.png',
					title:'还不了车'
				},
				{
					url:'../../static/breakDown/return.png',
					title:'租不了车'
				},
				{
					url:'../../static/breakDown/break.png',
					title:'网络故障'
				},
				{
					url:'../../static/breakDown/broke.png',
					title:'车辆损坏'
				},
				{
					url:'../../static/breakDown/other.png',
					title:'其他问题'
				}],
				
			}
		},
		created() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#FFFFFF',
				animation: {
				    duration: 400,
				    timingFunc: 'easeIn'
				}
			})
		},
		onLoad() {
			_self = this;
			//获取系统信息
			uni.getSystemInfo({
				success: function(res) {
					//地图高度
					if (res.platform == 'ios') {
						//当前是iOS系统
						_self.system = 'iOS'
					} else {
						//当前是Android系统
						_self.system = 'Android'
					}
				}
			});
		},
		onShow() {
			
		},
		methods: {
			//-------------------------------------监听输入框-------------------------------------
			input:function(res){
				console.log(res)
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8FA;
	}
	.inputBox{
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		border-radius: 10px;
		border: #666666 1rpx solid;
	}
	.input{
		padding-left: 20rpx;
		height: 100rpx;
		border-radius: 10rpx;
	}
	.breakTypeBox{
		margin-top: 80rpx;
		background-color: #FFFFFF;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-radius: 10px;
	}
	.title{
		font-size: 34rpx;
		color: #333333;
		margin-left: 20rpx;
		font-weight: bolder;
		margin-top: 30rpx;
	}
	.breakBox{
		flex-direction: row;
		flex-wrap: wrap;
		display: flex;
		margin-top: 30rpx;
		margin-left: 0;
		margin-right: 0;
	}
	.item{
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 200rpx;
		height: 200rpx;
		margin-top: 20rpx;
		margin-right: 15rpx;
		margin-left: 15rpx;
	}
	.image{
		width: 60rpx;
		height: 60rpx;
	}
	.subTitle{
		margin-top: 30rpx;
		color: #333333;
		font-size: 28rpx;
		font-weight: 300;
	}
	
</style>
