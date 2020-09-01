<template>
	<view>
	    <form @submit="formSubmit" >
			<text class="fb_Text">意见反馈</text>
			<view class="fb_view">
				<textarea class="fb_Textarea" placeholder-style="#AAAAAA" placeholder="您的宝贵意见将会让我们提供更好的服务质量" maxlength="500" v-model="ideaContent" @input="descInput" />
				<view class="fb_words">{{remnant}}/500字</view>
			</view>
			<view class="upLoadView">
				<text class="uploadText">上传图片</text>
				
				<view class="imagView">
					<view class="imgItem" v-for="(item, index) in imgList" :key="index">
						<image class="image" @click="imgInfo(index)" :src="item.path" mode="aspectFill"></image>
						<image class="imgDel" @click="delImg(index)" src="../../static/GRZX/delete.png"></image>
					</view>
					<view v-if="imgList.length < 3 " class="imgItem" @click="openCamera">
						<image class="image" src="../../static/GRZX/add.png"></image>
					</view>
				</view>
				
				<!-- <view class="scClass">
					<robby-image-upload v-model="detailInfo.imageData" :server-url-delete-image="serverUrlDeleteImage" :showUploadProgress="show" :form-data="formData" @delete="deleteImage" @add="addImage" :enable-del="enableDel" :enable-add="enableAdd"></robby-image-upload>
				</view> -->
			</view>
			<view class="fb_view3">
				<button class="fb_btn" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	var _self;
	import robbyImageUpload from '@/pages_GRZX/components/GRZX/robby-image-upload/robby-image-upload.vue'
	import { pathToBase64, base64ToPath } from '@/pages_GRZX/components/GRZX/imageTool/index.js'
	import $DDTInterface from '@/common/DDT.js'
	export default {
		components: {
			robbyImageUpload,
		},
		data() {
			return {
			remnant:0,
			nickid:'',
			ideaContent:'',
			enableDel : true,//是否启动del
			enableAdd : true,//是否启动删除
			enableDrag : false,//是否启动拖动
			show: true,//是否显示
			system:'',//系统类型
			
			imgList: [],//照片数组
			
			imgCount: 3, //最多支持9张上传，可以修改
			totalImgCount: 3, //注意：imgCount改什么多少，这么就要跟着改
			
			base64Array:[],//图片的base64数组
			serverUrl: 'http://localhost:2000/work/uploadWorkPicture',//模拟服务器地址
			serverUrlDeleteImage: 'http://localhost:2000/work/deleteWorkPicture',//模拟服务器删除
			formData: {//表格数据
					userId: 2
				},
			imagelist:[],//图像列表框
			detailInfo : {//详细信息
				imageData : [],//图像日期	
			}
			}
		},
		onLoad() {
			_self = this;
			//获取系统信息
			uni.getSystemInfo({
				success: function(res) {
					//地图高度
					if(res.platform == 'ios'){
						//当前是iOS系统
						_self.system = 1
					}else {
						//当前是Android系统
						_self.system = 0
					}
				}
			});
		},
		onShow() {
			this.getLogin();
		},
		methods: {
			getLogin:function(){
					uni.getStorage({
						key: 'userInfo',
						fail() {
							uni.showToast({
								icon: 'none',
								title: '未登录无法进行反馈,请先登录'
							})
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
						},
					})
				
			},
			//------------------------------------------字数------------------------------------------
			descInput: function(e) {
			// console.log(e)
			this.remnant = e.detail.cursor;	
			},
			//------------------------------------------删除照片------------------------------------------
			deleteImage: function(e){
				// console.log(e)
			},
			//------------------------------------------添加照片------------------------------------------
			addImage: function(e){
				// console.log(e)
			},
			//------------------------------------------提交------------------------------------------
			formSubmit: function(e) {
				var AppType = '';
				// #ifdef APP-PLUS
				AppType = 'APP';
				// #endif
				uni.showLoading({
					title:'提交意见反馈中...'
				})
				if(_self.remnant==0 || _self.imgList==""){
					uni.hideLoading()
					uni.showModal({
						content:'内容或图片不能为空',
						showCancel:false
					})
				}else{
					var that=this;
					uni.getStorage({
						key:'userInfo',
						success: (res) => {
							uni.request({
								url:$DDTInterface.DDTInterface.Add_Suggestion.Url,
								method:$DDTInterface.DDTInterface.Add_Suggestion.method,
								data:{
									SuggestionPicture:_self.base64Array,//照片数组base64
									Suggestion:_self.ideaContent,//反馈内容
									userID:res.data.userId,//用户ID
									Phone:res.data.phoneNumber,//手机号
									SystemType:_self.system,//系统类型
									AppType:AppType,//应用类型APP WECHAT H5
									ProjectCode:'漳州达达通',
								},
								success: (res) => {
									console.log('反馈结果',res)
									uni.hideLoading()
									if(res.data.status == true){
										uni.showToast({
											title:'反馈成功',
											complete() {
												setTimeout(function(){
													uni.navigateBack();
												},500);
											}
										})
									}else {
										uni.showToast({
											title:'反馈失败',
											icon:'none'
										})
									}
								},
								fail: (res) => {
									console.log(res)
									uni.hideLoading()
									uni.showToast({
										title:'反馈失败'
									})
								}
							})
						},
						fail() {
							uni.showToast({
								icon:'none',
								title:'暂未登录,请登录后查看'
							})
							uni.stopPullDownRefresh();
							//#ifdef APP-PLUS
							setTimeout(function(){
								uni.navigateTo({	
									//loginType=1,泉运登录界面
									//loginType=2,今点通登录界面
									//loginType=3,武夷股份登录界面
									url  : '/pages/GRZX/userLogin?loginType=1'
								}) 
							},500);
							//#endif
							//#ifdef MP-WEIXIN
							setTimeout(function(){
								uni.navigateTo({
									url:'/pages/Home/wxAuthorize',
								})
							},1500);
							// #endif
						}
					})
					
				}			   
			},
			//-----------上传图片----------------------------------------
			openCamera() {
				//选择照片
				uni.chooseImage({
					count: _self.imgCount,
					sizeType: ['compressed'],
					success: e => {
						_self.imgList = [..._self.imgList, ...e.tempFiles]
						_self.imgCount = _self.totalImgCount - _self.imgList.length;
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
					}
				});
			},
			//显示照片
			imgInfo(i) {
				let tempList = [];
				_self.imgList.forEach(img => {
					tempList.push(img.path);
				});
				console.log(tempList);
				console.log('添加照片',_self.imgList)
				//显示图片
				uni.previewImage({
					current: i,
					loop: false,
					urls: tempList,
					indicator: 'default'
				});
			},
			//删除照片
			delImg(i) {
				console.log('删除照片',_self.imgList)
				uni.showModal({
					content: '确定删除这张吗',
					success: res => {
						if (res.confirm) {
							_self.imgList.splice(i, 1);
							_self.imgCount++;
							console.log("删除后",_self.imgCount)
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
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}	

	// 投诉内容
		.fb_view {
			width:750upx;
			height:396upx;
			background: #FFFFFF;
			border-bottom: 1px #F5F5F5 dotted;
			margin-top: 30rpx;
			

			.fb_Textarea {
				font-size: 30upx;
				height: 100px; 
				position: absolute;
				left: 33upx;
				top: 125upx;
			}

			.fb_words {
				font-size: 24upx;
				color: #AAAAAA;
				position: absolute;
				left: 620upx;
				top: 346upx;
			}
		}
		.fb_view3{
			width:94%;
			// margin-top: 30upx;
			// margin-left: 50upx;
			position: fixed;
			bottom: 40upx;
			left: 3%;
			.fb_btn{
				border-radius:30px;
				background: #FC4646;
				color: #FFFFFF;
			}
		}
		
	.fb_Text {
		font-weight: bold;
		font-size: 30upx;
		position: absolute;
		left: 34upx;
		top: 56upx;
	}
	.upLoadView{
		margin-top: 20rpx;
		width: 100%;
		background-color: #FFFFFF;
	}
	.uploadText{
		font-size: 30upx;
		font-weight: bold;
		margin-left: 30rpx;
	}
	.imagView {
		display: flex;
		width: 750rpx;
		padding-left: 10rpx;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.imgItem {
		width: 200rpx;
		height: 200rpx;
		border-radius: 24rpx;
		position: relative;
		padding: 9rpx 0;
		margin-left: 20rpx;
	}
	.image {
		width: 200rpx;
		height: 200rpx;
		margin-left: 20upx;
		border-radius: 24rpx;
		margin-bottom: 20rpx;
	}
	.imgDel {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		right: -23rpx;
		top: 23rpx;
		border-radius: 20rpx;
	}
</style>
