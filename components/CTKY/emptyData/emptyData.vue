<template>
	<view class="nodata" v-if="isShow">
		<image :src="image" mode="widthFix" class="empty_image"></image>
		<text :style="{color:textColor}">{{ text }}</text>
	</view>
</template>

<script>
export default {
	name: 'emptyData',
	props: {
		//参数声明
		text: {
			type: String,
			default: '暂无数据'
		},
		image: {
			type: String,
			default: '/static/CTKY/empty.png'
		},
		textColor:{
			type: String,
			default: '#999999'
		},
		isShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			
		};
	},
	methods: {}
};
</script>

<style lang="scss">
.nodata {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 400rpx;
	width: 100%;
	margin-top: 200rpx;
	align-items: center;
	color: #555555;
	font-size: 24rpx;
	
}
.empty_image {
		width: 200rpx !important;
		margin-bottom: 50rpx;
	}
</style>
