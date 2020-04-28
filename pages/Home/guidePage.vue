<template>
	<view>
		<swiper class="swiper">
			<swiper-item class="swiperItem" v-for="(item,index) in imageIndex" :key="index">
				<image class="image" :src="item.src" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageIndex:[{
					src:'../../static/Home/guidePage/y1.png'
				},{
					src:'../../static/Home/guidePage/y2.png'
				},{
					src:'../../static/Home/guidePage/y3.png'
				}],
			}
		},
		methods: { 
			
		}
	}
</script>

<style lang="scss">
	.swiper{
		width: 750upx;
		.swiperItem{
			width: 100%;
			height: 100%;
			.image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
