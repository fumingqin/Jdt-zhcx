<template>
	<view>
		<!-- 输入框 -->
		<view class="inputBox">
			<input class="input" @input="input" :value="inputValue" type="number" placeholder="输入车辆编号(必填)" />
		</view>
		<!-- 故障类型 -->
		<view class="contentBox">
			<text class="title">故障类型</text>
			
			<view class="breakBox">
				<block v-for="(item,index) in pictureArr" :key="index">
					<view class="item" :class="{'itemSelect' : selectIndex == index}" @click="breakItemClick(item,index)">
						<image class="breadItemImage" :src="item.url"></image>
						<text class="subTitle" :class="{'subTitleSelect' : selectIndex == index}">{{item.title}}</text>
					</view>
				</block>
			</view>
		</view>
		
		<!-- 问题补充 -->
		<view class="contentBox" style="margin-top: 20rpx;">
			<textarea class="textarea" placeholder-style="#999999" placeholder="问题补充(选填)" maxlength="100" v-model="questionContent" @input="questionInput" />
			<view style="justify-content: space-between;display: flex;">
				<!-- 布局需要，不要删 -->
				<view></view>
				<view class="totleWord">{{totleWord}}/100字</view>
			</view>
		</view>
		
		<!-- 上传图片 -->
		<view class="contentBox" style="margin-top: 20rpx;">
			<view style="font-size: 34rpx;font-weight: bolder; color: #333333;margin-left: 20rpx;">上传图片(选填)</view>
			<view class="imageBox">
				<view class="imgItem" v-for="(item, index) in imgList" :key="index">
					<image class="showImage" @click="imgInfo(index)" :src="item.path" mode="aspectFill"></image>
					<image class="imgDel" @click="delImg(index)" src="../../static/breakDown/delete.png"></image>
				</view>
				<view v-if="imgList.length < 3 " class="imgItem" @click="openCamera">
					<image class="uploadImage" src="../../static/breakDown/takePhoto.png"></image>
				</view>
			</view>
		</view>
		
		<!-- 提交 -->
		<view class="contentBox" style="margin-top: 20rpx;">
			<view class="submit" @click="submit">提交</view>
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
				questionContent:'',//补充内容
				totleWord:0,//字数限制
				imgList:[],//照片数组
				imgCount: 3, //最多支持9张上传，可以修改
				base64Array:[],//图片的base64数组
				userinfo:'',//用户信息
				breakItemText:'',//选中故障类型时的文字
				selectIndex:-1,//记录点击的下标
				isClickOther:false,//是否点击了'其他'选项
				pictureArr:[{
					url:'../../static/breakDown/count.png',
					title:'已还车仍计费'
				},
				{
					url:'../../static/breakDown/return.png',
					title:'还不了车'
				},
				{
					url:'../../static/breakDown/rent.png',
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
						_self.system = 1
					} else {
						//当前是Android系统
						_self.system = 0
					}
				}
			});
		},
		onShow() {
			_self.getUserInfo()
		},
		methods: {
			getUserInfo:function(){
				uni.getStorage({
					key: 'userInfo',
					success(res) {
						_self.userInfo = res.data
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '未登录无法进行反馈,请先登录',
							complete() {
								//#ifdef APP-PLUS
								setTimeout(function() {
									uni.navigateTo({
										//loginType=1,泉运登录界面
										//loginType=2,今点通登录界面
										//loginType=3,武夷股份登录界面
										url: '../../../pages/GRZX/userLogin?loginType=1'
									})
								}, 500);
								// #endif
								//#ifdef MP-WEIXIN
								uni.navigateTo({
									url:'/pages/Home/wxAuthorize',
								})
								// #endif
							}
						})
					},
				})
			},
			//-------------------------------------点击故障选项-------------------------------------
			breakItemClick:function(item,index){
				_self.breakItemText = item.title
				_self.selectIndex = index
				if(item.title == '其他问题'){
					_self.isClickOther = true
				}
			},
			//-------------------------------------监听输入框-------------------------------------
			input:function(event){
				_self.inputValue = event.detail ? event.detail.value : event;
			},
			//-------------------------------------监听问题补充输入框-------------------------------------
			questionInput:function(res){
				_self.totleWord = res.detail.cursor;
			    _self.questionContent = res.detail.value;
			},
			//----------------------------------------开启相册/相机----------------------------------------
			openCamera() {
				//选择照片
				uni.chooseImage({
					count: _self.imgCount,
					sizeType: ['compressed'],
					success: e => {
						_self.imgList = [..._self.imgList, ...e.tempFiles]
						for(var i = 0;i < _self.imgList.length;i++){
							_self.imgCount--;
							var imagePath = _self.imgList[i].path
							pathToBase64(imagePath)
							  .then(base64 => {
								_self.base64Array.push(base64)
							  })
							  .catch(error => {
							    console.error('错误',error)
							  })
						}
					}
				});
			},
			//显示照片
			imgInfo(i) {
				let tempList = [];
				_self.imgList.forEach(img => {
					tempList.push(img.path);
				});
				//显示图片
				uni.previewImage({
					current: i,
					loop: false,
					urls: tempList,
					indicator: 'default'
				});
			},
			//删除照片
			delImg(index) {
				uni.showModal({
					content: '确定删除这张吗',
					success: res => {
						if (res.confirm) {
							console.log(index)
							console.log('删除照片前',_self.imgList)
							_self.imgList.splice(index, 1);
							_self.imgCount++;
							for(var i = 0;i < _self.imgList.length;i++){
								var imagePath = _self.imgList[i].path
								pathToBase64(imagePath)
								  .then(base64 => {
									_self.base64Array.push(base64)
								  })
								  .catch(error => {
								    console.error('错误',error)
								  })
							}
							console.log('删除照片',_self.imgList)
						} else if (res.cancel) {
			
						}
					}
				});
			},
			//----------------------------------------提交----------------------------------------
			submit:function(){
				uni.showLoading({
					title:'正在提交...'
				})
				//
				if(_self.isClickOther == true && !_self.questionContent){
					uni.showToast({
						title:'请描述故障情况',
						icon:'none'
					})
					return;
				}else {
					//如果点击了故障类型
					var ReportContent = '';
					if(_self.breakItemText && !_self.questionContent){
						ReportContent = '故障类型:' + _self.breakItemText + '\n' + '内容描述:' + '无'
					}else if(_self.breakItemText && _self.questionContent){
						ReportContent = '故障类型:' + _self.breakItemText + '\n' + '内容描述:' +  _self.questionContent
					}else if(!_self.breakItemText && !_self.questionContent){
						ReportContent = '故障类型:' + '未选' + '\n' + '内容描述:' + '无'
					}else{
						ReportContent = '故障类型:' + '未选' + '\n' + '内容描述:' + _self.questionContent
					}
				}
				
				var AppType = '';
				// #ifdef APP-PLUS
				AppType = 'APP';
				// #endif
				if(!_self.inputValue){
					uni.showToast({
						title:'请输入车辆编号',
						icon:'none'
					})
				}else {
					uni.request({
						url:$DDTInterface.DDTInterface.Add_FailureReport.Url,
						method:$DDTInterface.DDTInterface.Add_FailureReport.method,
						data:{
							userID:_self.userInfo.userId,
							BikeCode:_self.inputValue,
							ProjectCode:'漳州达达通',
							AppType:AppType,
							SystemType:_self.system,
							Phone:_self.userInfo.phoneNumber,
							ReportContent:ReportContent,//故障内容
							ReportPicture:_self.base64Array,
						},
						success(res) {
							uni.hideLoading()
							console.log(res)
							if(res.data.status == true){
								uni.showToast({
									title:res.data.msg,
									complete() {
										setTimeout(function(){
											uni.navigateBack()
										},1500)
									}
								})
							}else{
								uni.showToast({
									title:'提交失败',
									icon:'none'
								})
							}
						},
						fail(res) {
							uni.hideLoading()
							console.log(res)
						}
					})
				}
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
	.contentBox{
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
		margin-top: 20rpx;
	}
	.breakBox{
		flex-direction: row;
		flex-wrap: wrap;
		display: flex;
		margin-top: 30rpx;
		margin-left: 0;
		margin-right: 0;
	}
	// 故障类型样式
	.item{
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
		width: 200rpx;
		height: 200rpx;
		margin-top: 20rpx;
		margin-right: 15rpx;
		margin-left: 15rpx;
	}
	// 故障类型选中样式
	.itemSelect{
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 200rpx;
		height: 200rpx;
		margin-top: 20rpx;
		margin-right: 15rpx;
		margin-left: 15rpx;
		background-color: #3BB985;
	}
	//故障类型图片
	.breadItemImage{
		width: 60rpx;
		height: 60rpx;
	}
	//故障类型标题
	.subTitle{
		margin-top: 30rpx;
		color: #333333;
		font-size: 28rpx;
		font-weight: 300;
	}
	//故障类型选中样式
	.subTitleSelect{
		margin-top: 30rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		font-weight: 300;
	}
	//问题内容框
	.textarea{
		font-size: 30rpx;
		font-weight: 300;
		padding-left: 20rpx;
		padding-top: 20rpx;
	}
	//计数样式
	.totleWord{
		font-size: 28rpx;
		font-weight: 300;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
		color: #999999;
	}
	//上传照片
	.imageBox {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.imgItem {
		position: relative;
		border: 1rpx solid #E2E2E2;
		width: 140rpx;
		height: 140rpx;
		border-radius: 10rpx;
		margin: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uploadImage {
		width: 70rpx;
		height: 60rpx;
	}
	.showImage{
		width: 140rpx;
		height: 140rpx;
		border-radius: 10rpx;
	}
	.imgDel{
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: -10rpx;
		right: -10rpx;
	}
	//提交
	.submit{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 38rpx;
		color: #999999;
	}
</style>
