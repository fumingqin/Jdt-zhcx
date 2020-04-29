<template>
	<view>
		<swiper class="swiper" :style="{'height':imageHeight}">
			<swiper-item class="swiperItem" v-for="(item,index) in imageIndex" :key="index">
				<text style="position: absolute; top: 116upx; right: 40upx; color: #ddd; font-size: 30upx;z-index: 99;" @click="natTo">跳过</text>
				<image class="image" :src="item.src" mode="aspectFill"></image>
				<view style="position: absolute; bottom: 200upx; left: 192upx;" :hidden="index !== 2">
					<image style="width: 367upx; height: 96upx;" src="../../static/Home/guidePage/y4.png" mode="aspectFill" @click="natTo"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageHeight: '', //手机屏幕高度
				imageIndex: [{
					src: '../../static/Home/guidePage/y1.png'
				}, {
					src: '../../static/Home/guidePage/y2.png'
				}, {
					src: '../../static/Home/guidePage/y3.png'
				}],
			}
		},
		onLoad: function() {
			// uni.getSystemInfo({//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
			uni.getSystemInfo({
				success: (res) => {
					this.imageHeight = res.windowHeight + 'px'
					// console.log(this.imageHeight)
				}
			})
		},
		onBackPress:function(){
			uni.switchTab({
				url:'Index'
			})
		},
		methods: {
			//跳转路由
			natTo: function() {
				uni.switchTab({
					url: 'Index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		.swiperItem {
			width: 100%;
			height: 100%;

			.image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
