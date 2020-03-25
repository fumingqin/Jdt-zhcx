<template >
	<view>
		<!-- 搜索条 -->
		<view class="searchTopBox">
			<view class="searchBoxRadius" >
				<image class="s_icon" src="../../static/Home/navigation/sousuo.png" style="position: relative;"></image>
				<input class="searchBoxIpt" type="search" v-model="ipt" @confirm="searchNow"  placeholder="关键字" style="position: relative;" focus></input>
				<text class="text_Sousuo" style="position: relative;">搜索</text>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="searchBotBox">
			<view class="ov">
				<view class="fl" style="position: relative;">历史</view>
				<image class="fr" src="../../static/Home/navigation/shanchu.png" @tap="clearKey" style="position: relative;"></image>
			</view>
			<view class="searchHistoryBox">
				<view class="searchHistoryBoxItem" v-for="(item,index) in searchKey" :key='index' @click="replaceKey(item)"  >
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				searchKey: [],
				ipt: '',	
				searchClose: true,
			}
		}, 
		onLoad:function(){
			const that=this;
			uni.getStorage({
			    key: 'searchLocal',
			    success: function (res) {
					that.searchKey=res.data;
			    }
			});
		},
		methods: {
			clearKey: function() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '点击确定将删除所有历史信息，确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							that.searchKey = [];      
							uni.setStorage({
								key: 'searchLocal',
								data: that.searchKey
							});
							
						} else if (res.cancel) {

						}
					}
				});
			
			},
			searchNow: function(e) {
				if (this.ipt == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					// return false;
				}
				uni.hideKeyboard()
				var that = this;
				that.searchKey.push(this.ipt);
				uni.setStorage({
				    key: 'searchLocal',
				    data: that.searchKey,
				    success: function () {
				    }
				});
				that.ipt = ''
			},
			replaceKey : function(e){
				this.ipt = e;
			}
		}
	}
</script>
<style>
	page {
		background: #FFF;
	}
	.s_icon{
		width: 40upx;
		height: 40upx;
		float: left;
		left: 24upx;
		top: 20upx;
		
	}
	.ov {
		overflow: hidden;
	}

	.fl {
		float: left;
		left: 20upx;
	}

	.fr {
		float: right;
		width: 48upx;
		height: 48upx;
		margin-right: 20upx;
	}

	.searchTopBox {
		width: 100%;
		background-color: #149bf0;
		height: 120upx;
		box-sizing: border-box;
		padding-top: 15upx;
	}

	.searchBoxRadius {
		width: 90%;
		height: 80upx;
		background-color: #fff;
		margin-left: 5%;
		overflow: hidden;
		border-radius: 46upx;
		margin-top: 8upx;
	}

	.searchBoxIcon {
		font-size: 40upx;
		margin-top: 20upx;
		margin-left: 20upx;
		float: left;
	}

	.searchBoxIpt {
		height: 70upx;
		line-height: 70upx;
		margin-left: 24upx;
		left: 16upx;
		float: left;
		margin-top : 8upx;
	}
	
	.text_Sousuo{
		float: right;
		color: #4399FC;
		margin-right: 40upx;
		margin-top: 18upx;
	}
	
	.searchBotBox {
		width: 100%;
		margin-top: 30upx;
		padding: 15upx 3%;
		box-sizing: border-box;
	}

	.searchHistoryBox {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 40upx;
	}

	.searchHistoryBoxItem {
		float: left;
		font-size: 26upx;
		color: #666;
		line-height: 46upx;
		height: 46upx;
		padding: 0 20upx;
		border-radius: 23upx;
		margin-left: 15upx;
		margin-bottom: 20upx;
		border: 1px solid #ccc;
	}
	
</style>
