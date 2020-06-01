<template>
	<view>
		<view>
			<button class="tjButton" @click="jump">单车/助力车</button>
			<button class="tjButton" @click="jump2">个人主页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
				
			jump:function(){
				uni.showToast({
					title:'正在开发中...',
					icon:'none'
				})
			},
			jump2:function(){
				uni.navigateTo({
					url:'zy_homepage'
				})
			}
		}
	}
</script>

<style>
	.tjButton{
		border-radius: 64upx;
		margin: 20upx 40upx;
		background: #1EA2FF;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}
</style>
