<template>
	<view>
		<view class="box1">
			<view class="text1">{{nearStastion.stationName}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailline:'',
				nearStastion:'',
			}
		},
		methods: {
			async busIndex(){
				let detailline = await this.$api.gjcx('detailLine');
				this.detailline = detailline;
				let nearstastion =await this.$api.gjcx('nearBy');
				this.nearStastion =nearstastion;
				
			}
		}
	}
</script>

<style lang="scss">
  .box1{
	  background-color: #FFFFFF;
	  height: 160upx;
	.text1{
		  font-size: 32upx;
		  margin-left: 33upx;
	  }
  }
</style>
