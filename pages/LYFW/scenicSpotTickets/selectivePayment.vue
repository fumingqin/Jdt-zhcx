<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 
			}
		},
		onLoad : function(options) {
			console.log(JSON.parse(decodeURIComponent(options.ticket)))
			console.log(JSON.parse(decodeURIComponent(options.addressData)))
			console.log(JSON.parse(options.actualPayment))
			console.log(JSON.parse(options.dateReminder))
			console.log(JSON.parse(options.date))
			console.log(JSON.parse(decodeURIComponent(options.coupon)))
		},
		
		methods: {
			
		}
	}
</script>

<style>

</style>
