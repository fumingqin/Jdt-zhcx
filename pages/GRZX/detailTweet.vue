<template>
	<view class="container">
		<!-- <view class="title">{{detailTweet.title}}</view>
		<view class="time">{{detailTweet.time}}</view>
		<view class="src">
			<image :src="detailTweet.src"></image>
		</view>
		<view class="text">{{detailTweet.text}}</view> -->
		<view style="background-color:#FFF; width:96%;margin-left:2%;">
		    <rich-text :nodes="strings"></rich-text>
		</view>
	</view>
</template>

<script> 
export default{
	data(){
		return{
			detailTweet:{
				title:'',
				time:'',
				src:'',
				text:'',
			},
			strings: ''
		}
	},
	onLoad(){
		this.loadData();
	},
	methods:{
		async loadData(){
			var that=this;
			uni.getStorage({
				key:'detailTweet',
				success(res) {
					that.strings='<div style="width:100%;text-align:left;font-size:25px">'+res.data.title+'</div>';
					that.strings+='<div style="width:100%;text-align:left">'+res.data.time+'</div>';
					that.strings+='<div style="text-align:center;width:100%"><img src="'+res.data.src+'" style="width:100%;"/></div>';
					that.strings+='<div style="text-align:left;text-indent:2em;">'+res.data.text+'</div>';
				}
			})
		},
		}
}
</script>

<style lang="scss">
	.container{
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.title{
		width: 100%;
		text-align: center;
		font-size: 28upx;
	}
	.time{
		
	}
	.src{
		
	}
	.text{
		
	}
</style>
