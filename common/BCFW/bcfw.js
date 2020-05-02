

//接口域名
const Url = 'http://111.231.109.113:8004';

//接口对象
const Interface = {
	//GET-POST
	// spt_GetticketSearchByrequestArea_Six:{
	// 	value: Url + '/api/ly/GetticketSearchByrequestArea_Six',
	// 	name:'景区列表-六宫格',
	// 	method:'POST',
	// 	pages:["LYFW/scenicSpotTickets/ticketsList.vue"]
	// },
	
	// spt_GetticketSearchByrequestArea:{
	// 	value: Url + '/api/ly/GetticketSearchByrequestArea',
	// 	name:'景区列表-景区列表',
	// 	method:'POST',
	// 	pages:["LYFW/scenicSpotTickets/ticketsList.vue"]
	// },
	
	// spt_GetticketSearchBysearchValue:{
	// 	value: Url + '/api/ly/GetticketSearchBysearchValue',
	// 	name:'景区列表-搜索',
	// 	method:'POST',
	// 	pages:["LYFW/scenicSpotTickets/ticketsList.vue"]
	// },
	
	// spt_GetticketDetailByticketId:{
	// 	value: Url + '/api/ly/GetticketDetailByticketId',
	// 	name:'景区门票-详情',
	// 	method:'POST',
	// 	pages:["LYFW/scenicSpotTickets/ticketsDetails.vue"]
	// },
	
	// spt_GetticketSecurityByticketIde:{
	// 	value: Url + '/api/ly/GetticketSecurityByticketId',
	// 	name:'景区门票-门票须知',
	// 	method:'POST',
	// 	pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	// },
	
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
		value: Url + '/api/Chartered/AddCharteredOrder_Passenger',
		name:'包车订单-APP提交订单',
		method:'POST',
		pages:["BCFW/bf_information.vue"]
	},
	
	spt_RequestTicketsList:{
		value: Url + '/api/Chartered/QueryCharteredOrderByUserID_Passenger',
		name:'订单列表',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	// spt_RequestTicketsListDetail:{
	// 	value: Url + '/api/ly/RequestTicketsListDetail',
	// 	name:'订单详情',
	// 	method:'POST',
	// 	pages:["LYFW/scenicSpotTickets/orderDetails.vue","LYFW/scenicSpotTickets/selectivePayment.vue","order/OrderList.vue"]
	// },
	
	// spt_getIsPaySuccess:{
	// 	value: Url + '/api/ly/getIsPaySuccess',
	// 	name:'订单-去支付-查询是否出票',
	// 	method:'POST',
	// 	pages:["LYFW/scenicSpotTickets/selectivePayment.vue"]
	// },
	
	spt_RequestTickets:{
		value: Url + '/api/Chartered/QuerySpecialLineOrder_Passenger',
		name:'订单-去支付',
		method:'POST',
		pages:["BCFW/charteredBusPayment.vue"]
	},
	
	spt_CancelTickets:{
		value: Url + '/api/Chartered/CancelCharteredOrder_Passenger',
		name:'订单-取消',
		method:'POST',
		pages:["BCFW/charteredBusPayment.vue","order/OrderList.vue"]
	},
	
	spt_DeleteTickets:{
		value: Url + '/api/Chartered/DeleteCharteredOrder_Passenger',
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
	
}


// 接口声明区
export default {
	Interface,
}
