<template>
	<view>
	<form @submit="formSubmit" >
		<view class="fb_view">
			<text class="fb_Text">意见反馈</text>
			<textarea class="fb_Textarea" placeholder-style="#AAAAAA" placeholder="您的宝贵意见将会让我们提供更好的服务质量" maxlength="500" @input="descInput" />
			<view class="fb_words">{{remnant}}/500字</view>
		</view>
		<view class="fb_view2">
			<text class="fb_Text2">上传图片</text>
			<view class="scClass">
				<robby-image-upload v-model="detailInfo.imageData" :server-url-delete-image="serverUrlDeleteImage" :showUploadProgress="show" :form-data="formData" @delete="deleteImage" @add="addImage" :enable-del="enableDel" :enable-add="enableAdd"></robby-image-upload>
			</view>
		</view>
		<view class="fb_view3">
			<button class="fb_btn" form-type="submit">提交</button>
		</view>
		</form>
	</view>
</template>

<script>
	import robbyImageUpload from '@/pages_GRZX/components/GRZX/robby-image-upload/robby-image-upload.vue'
	export default {
		components: {
			robbyImageUpload,
		},
		data() {
			return {
			remnant:0,
			enableDel : true,//是否启动del
			enableAdd : true,//是否启动删除
			enableDrag : false,//是否启动拖动
			show: true,//是否显示
				
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
		methods: {
			//字数
			descInput: function(e) {
			// console.log(e)
			this.remnant = e.detail.cursor;	
			},
			deleteImage: function(e){
				// console.log(e)
			},
			addImage: function(e){
				// console.log(e)
			},
			formSubmit: function(e) {
				if(this.remnant==0){
					uni.showModal({
						content:'请填写具体内容',
						showCancel:false
					})
				}else{
					uni.request({
						url:'https://zntc.145u.net:9099/api/person/addSuggestion',
						method:'POST',
					
					})
					
					uni.showModal({
					    content: '提交成功',
					    showCancel: false
					})
				}			   
			}
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

			.fb_Text {
				font-weight: bold;
				font-size: 30upx;
				position: absolute;
				left: 34upx;
				top: 56upx;
			}

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
		.fb_view2{
			width:750upx;
			height:328upx;
			background: #FFFFFF;
			margin-top: 20upx;
			.fb_Text2 {
				font-weight: bold;
				font-size: 30upx;
				position: absolute;
				left: 34upx;
				top: 476upx;
			}
			.scClass{
				position: absolute;
				left: 31upx;
				top: 545upx;
			}
		}
		.fb_view3{
			width:650upx;
			margin-top: 30upx;
			margin-left: 50upx;
			.fb_btn{
				border-radius:30px;
				background: #FC4646;
				color: #FFFFFF;
			}
		}
</style>
