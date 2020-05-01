

//接口域名
const Url = 'http://111.231.109.113:8004';

//接口对象
const Interface = {
	spt_GetcouponByuserId:{
		value: Url + '/api/bc/GetcouponByuserId',
		name:'包车订单-优惠券列表',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	},
	
	spt_scenicSpotSetOrder:{
		value: Url + '/api/app/scenicSpotSetOrder',
		name:'包车订单-H5提交订单',
		method:'POST',
		pages:["BCFW//bf_information.vue"]
	},
	
	spt_AddtouristOrder:{
		value: Url + '/api/bc/AddtouristOrder',
		name:'包车订单-APP提交订单',
		method:'POST',
		pages:["BCFW/bf_information.vue"]
	},
	
	spt_RequestTicketsList:{
		value: Url + '/api/bc/RequestTicketsList',
		name:'订单列表',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	spt_RequestTickets:{
		value: Url + '/api/Chartered/QuerySpecialLineOrder_Passenger',
		name:'订单-去支付',
		method:'POST',
		pages:["BCFW/charteredBusPayment.vue"]
	},
	
	spt_CancelTickets:{
		value: Url + '/api/bc/CancelTickets',
		name:'订单-取消',
		method:'POST',
		pages:["BCFW/charteredBusPayment.vue","order/OrderList.vue"]
	},
	
	spt_DeleteTickets:{
		value: Url + '/api/bc/DeleteTickets',
		name:'订单-删除',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	spt_Pay:{
		value: Url + '/api/bc/Pay',
		name:'订单-请求支付参数',
		method:'POST',
		pages:["BCFW/charteredBusPayment.vue"]
	},
	
	fw_selectSpecialLine:{
		value: Url + '/api/Chartered/GetCharteredAllLine_Passenger',
		name:'包车-选择专线',
		method:'POST',
		pages:["BCFW/bf_choice.vue"]
	},
	
	fw_privateLineSearch:{
		value: Url + '/api/Chartered/GetCharteredLineByLineName_Passenger',
		name:'包车-选择专线搜索',
		method:'POST',
		pages:["BCFW/bf_choice.vue"]
	},
	
	fw_selectVehicle:{
		value: Url + '/api/Chartered/GetVehicleType_Passenger',
		name:'包车-选择车辆',
		method:'POST',
		pages:["BCFW/bf_choiceVehicleType.vue"]
	}
	
}


// 接口声明区
export default {
	Interface,
}
