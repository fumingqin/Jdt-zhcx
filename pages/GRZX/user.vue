<template>
	<view class="content">
		<view class="backImg">
			<image src="../../static/GRZX/backImg.png" class="imgClass"></image>
			<!-- #ifdef MP-WEIXIN -->
			<image src="../../static/GRZX/set.png" class="setClass" @click="navTo('/pages/GRZX/set')"></image>
			<image src="../../static/GRZX/info.png" class="infoClass" @click="navTo('/pages/GRZX/myNews')"></image>
			<!-- #endif -->
			<!-- <image src="../../static/GRZX/scan.png" class="scanClass" @click="scanClick"></image>
			 -->
			<view class="userInfoClass" @click="checkLogin">
				<image class="portraitClass" :src=" userInfo.avatarUrl || '/static/GRZX/missing-face.png'"></image>
				<text class="usernameClass">{{userInfo.nickName || '游客'}}</text>
				<!-- <image src="../../static/GRZX/edit.png" class="editClass"></image> -->
			</view>
			
			<view class="typeBox">
				<image src="../../static/GRZX/huangguan.png" class="imgTubiao"></image>
				<text class="fontClass">普通用户</text>
			</view>
			
			<view class="grzyClass" @click="checkLogin">
				<text>个人主页</text>
				<image src="../../static/GRZX/btnRight_Home.png" class="rightClass"></image>
			</view>
			
			<view class="myBox">
				<view class="collection" @click="collectionClick">
					<image src="../../static/GRZX/tubiao_shoucan.png" class="imgStyle1" mode="aspectFill"></image>
					<text class="myFont">我的收藏</text>
				</view>
				<view class="order" @click="orderClick">
					<image src="../../static/GRZX/tubiao_dingdan.png" class="imgStyle2" mode="aspectFill"></image>
					<text class="myFont">我的订单</text>
				</view>
				<view class="history" @click="historyClick">
					<image src="../../static/GRZX/tubiao_lishi.png" class="imgStyle3" mode="aspectFill"></image>
					<text class="myFont">我的历史</text>
				</view>
			</view>
		</view>
		
		<image src="../../static/GRZX/advert.png" class="advertClass"></image>
	
		<view class="serviceBox">
			<text class="moreClass">更多服务</text>
			<!-- <view class="boxClass marginTop" @click="navTo('电子发票')">
				<image src="../../static/GRZX/tubiao_fapiao.png" class="iconClass1"></image>
				<text class="fontStyle">电子发票</text>
				<image src="../../static/GRZX/tubiao_Right.png" class="btnClass"></image>
			</view> -->
			<view class="boxClass" @click="QQClick">
				<image src="../../static/GRZX/tubiao_kefu.png" class="iconClass2"></image>
				<text class="fontStyle">QQ客服</text>
				<image src="../../static/GRZX/tubiao_Right.png" class="btnClass"></image>
			</view>
			<view class="boxClass borderTop" @click="infoClick">
				<image src="../../static/GRZX/tubiao_zhengzhao.png" class="iconClass3"></image>
				<text class="fontStyle">信息管理</text>
				<image src="../../static/GRZX/tubiao_Right.png" class="btnClass"></image>
			</view>
			<view class="boxClass borderTop" @click="complaintClick">
				<image src="../../static/GRZX/tubiao_tousu.png" class="iconClass4"></image>
				<text class="fontStyle">我要投诉</text>
				<image src="../../static/GRZX/tubiao_Right.png" class="btnClass"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/GRZX/mix-list-cell';
	import {  
	    mapState 
	} from 'vuex'; 
	export default{
		components: {
			listCell
		},
		data(){
			return{
				QQ:'2482549389',
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onLoad(){
		},
		onShow(){
			//this.loadData();
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if(index === 0){
				uni.navigateTo({
					url:'/pages/GRZX/set'
				})
			}
			if(index === 1){
				uni.navigateTo({
					url:'/pages/GRZX/myNews'
				})
			}
			if(index === 2){
				uni.scanCode({
					onlyFromCamera:true,
					success:function(res){
						void plus.runtime.openWeb(res.result,function(){
							//识别失败
						});
					}
				})
			}
			
		},
		methods:{
			// async loadData(){
			// 	var that=this;
			// 	uni.getStorage({
			// 		key:'userInfo',
			// 		success:function(res){
			// 			if(that.hasLogin){
			// 				that.userInfo.nickName=res.data.nickName;
			// 				that.userInfo.avatarUrl=res.data.avatarUrl;	
			// 			}else{
			// 				that.userInfo.nickName='游客';
			// 				that.userInfo.avatarUrl='../../static/GRZX/missing-face.png';	
			// 			}
						
			// 			console.log(res,"00000002")
			// 		}
			// 	})
			// },
			orderClick(){
				uni.switchTab({
					url:'/pages/order/OrderList'
				})
			},
			navTo(url){
				uni.navigateTo({
					url
				})
				console.log(url)
			},
			//信息管理
			infoClick(){
				uni.navigateTo({
					url:'/pages/GRZX/infoList'
				})
			},
			// 投诉
			complaintClick(){
				uni.navigateTo({
					url:'/pages/GRZX/complaint'
				})  
			},
			checkLogin(){
				// console.log(this.hasLogin,"6666")
				if(!this.hasLogin){
					uni.showToast({
						title : '请先登录',
						icon : 'none',
					})
					setTimeout(function(){
						uni.navigateTo({	
							//loginType=1,泉运登录界面
							//loginType=2,今点通登录界面
							//loginType=3,武夷股份登录界面
							url  : '/pages/GRZX/userLogin?loginType=1'
						}) 
					},1500);
				}else{
					uni.navigateTo({
						url :'/pages/GRZX/personal'
					})  
				}
			},
			collectionClick(){
				uni.navigateTo({
					url:'/pages/LYFW/ouristRoute/collection'
				}) 
			},
			historyClick(){
				uni.navigateTo({
					url:'/pages/LYFW/ouristRoute/history'
				}) 
				
			},
			scanClick(){
				uni.showToast({
					title : '扫一扫',
					icon : 'none',
				})
			},
			QQClick(){
				plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + this.QQ + '&version=1&src_type=web ');
			}
		}
		
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F9FA;
	}
	.content{
		
	}
	.backImg{ 
		width: 100%;
		height: 490upx;
	}
	.imgClass{ //背景图片
		width: 100%;
		height: 490upx;
	}
	.setClass{ //设置按钮
		width: 47upx;
		height: 45upx;
		position: absolute;
		left: 4.67%;
		top: 74upx;
	}
	.scanClass{ //扫一扫按钮
		width: 44upx;
		height: 41upx;
		position: absolute;
		left: 14.8%;
		top: 74upx;
	}
	.infoClass{ 	//消息按钮
		width: 47upx;
		height: 42upx;
		position: absolute;
		//left: 87.73%;
		left: 20%;
		top: 74upx;
	}
	.userInfoClass{ 	//包括头像昵称
		position: absolute;
		left: 4.53%;
		top:161upx;
		height: 127upx;
		width: 68.4%;
		// background-color: #06B4FD;
		display: flex;
		flex-direction: row;
	}
	.portraitClass{ 	//头像
		border-radius: 50%;
		width: 127upx;
		height: 127upx;
	}
	.usernameClass{		//昵称
		height: 44upx;
		line-height: 44upx;
		font-size: 48upx;
		color: #FFFFFF;
		margin-top: 20upx;
		margin-left: 3%;
		width: 350upx;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		// border: 1upx solid #007AFF;
	}
	.grzyClass{  		//个人主页
		width: 20%;
		height: 34upx;
		position: absolute;
		left:75.47%;
		top: 200upx;
		color: #FFFFFF;
		font-size: 28upx;
		line-height: 27upx;
	}
	.rightClass{
		width: 10%;
		height: 29upx;
		position: absolute;
		left:82%;
		top:-1upx;
	}
	.typeBox{  //普通用户
		width: 126upx;
		height: 42upx;
		background-color: #C25E4E;
		position: absolute;
		top: 245upx;
		left: 24%;
		border-radius: 8upx;
	}
	.imgTubiao{
		width: 15%;
		height: 21upx;
		position: absolute;
		left: 9upx;
		top: 10upx;
	}
	.fontClass{
		font-size: 20upx;
		color: #FFFFFF;
		line-height: 42upx;
		height: 42upx;
		position: absolute;
		left: 34upx;
		top: 1upx;
	}
	.editClass{		//修改按钮
		width: 40upx;
		height: 40upx;
		margin-left: 17upx;
		margin-top: 25upx;
	}
	.myBox{			//包括我的收藏，我的订单，我的历史
		width: 91.47%;
		height: 170upx;
		position: absolute;
		left: 4.27%;
		top:341upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		border-radius: 12upx;
	}
	.collection{		//我的收藏
		width: 33.33%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imgStyle1{
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}
	.order{				//我的订单
		width: 33.33%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imgStyle2{
		width: 55upx;
		height: 56upx;
		margin-top: 32upx;
		margin-left: 36.68%;
	}
	.history{			//我的历史
		width: 33.34%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imgStyle3{
		width: 58upx;
		height: 57upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}
	.myFont{		//文字的样式
		color: #2C2D2D;
		height: 27upx;
		line-height: 27upx;
		font-size:28upx;
		font-family: SourceHanSansSC-Regular;
		margin-top: 22upx;
		text-align: center;
	}
	.advertClass{		//广告
		width: 91.47%;
		height: 142upx;
		margin-top: 42upx;
		margin-left: 4.27%;
	}
	.serviceBox{		//更多服务
		width:91.47%;
		//height: 510upx;
		height: 390upx;
		background-color: #FFFFFF;
		border-radius: 12upx;
		margin-top: 10upx;
		margin-left: 4.27%;
		display: flex;
		flex-direction: column;
	}
	.moreClass{		
		font-size:32upx ;
		font-weight: bold;
		color: #000000;
		margin-top: 34upx;
		margin-left: 3.55%;
	}
	.boxClass{
		width: 620upx;
		height: 104upx;
		margin-top: 0upx;
		margin-left: 4.27%;
		position: relative;
	}
	.marginTop{
		margin-top: 18upx;
	}
	.iconClass1{  //电子发票图标
		width: 38upx;
		height: 37upx;
		position: absolute;
		left: 11upx;
		top:34upx;
		/* margin-top: 34upx;
		margin-left: 11upx; */
	}
	.iconClass2{  //在线客服图标
		width: 40upx;
		height: 38upx;
		margin-top: 34upx;
		margin-left: 9upx;
	}
	.iconClass3{  //证照信息图标
		width: 42upx;
		height: 34upx;
		margin-top: 34upx;
		margin-left: 8upx;
	}
	.iconClass4{  //我的投诉图标
		width: 36upx;
		height: 39upx;
		margin-top: 29upx;
		margin-left: 13upx;
	}
	.btnClass{
		width: 11upx;
		height: 22upx;
		position: absolute;
		left: 610upx;
		top:43upx;
	}
	.fontStyle{
		font-size: 28upx;
		color: #2C2D2D;
		position: absolute;
		left: 80upx;
		top:33upx;
	}
	.borderTop{
		border-top: 1upx solid #EAEAEA;
	}
</style>
