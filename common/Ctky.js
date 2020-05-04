/* 接口参数区 */
// 示例


//传统客运接口配置

//接口域名
const Url = 'http://zntc.145u.net';
const scheduleUrl = 'http://27.148.155.9:9056';//班次列表

//接口对象
const KyInterface = {
	//GET-POST
	
	Ky_AddPicture:{
		Url: Url + '/api/zhcx/getImage',
		name:'客运-添加图片',
		method:'POST',
		pages:["CTKY/TraditionSpecoal/Home/ctkyIndex.vue"],
		header:{'content-type': 'application/json'}
	},
	Ky_ScheduleUrl:{
		Url: scheduleUrl + '/CTKY/getListSchedulesInfo',
		name:'客运-班次列表',
		method:'POST',
		pages:["CTKY/TraditionSpecoal/Order/selectTickets.vue"],
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_PaymentUrl:{
		Url: Url + '/api/ky/SellTicket_NoBill_Booking',
		name:'客运-下单',
		method:'GET',
		pages:["CTKY/TraditionSpecoal/PayMent/orderPayment.vue"],
		header:{'content-type': 'application/json'},
	},
	Ky_getTicketPaymentInfo:{
		Url: Url + '/api/ky/SellTicket_Flow',
		name:'客运-获取支付参数',
		method:'GET',
		pages:["CTKY/TraditionSpecoal/PayMent/orderPayment.vue"],
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_getKeYunOrderInfo:{
		Url: Url + '/api/ky/searchOrder',
		name:'客运-获取订单列表',
		method:'GET',
		pages:["pages/order/OrderList.vue"],
		header:{'content-type': 'application/json'},
	},
	Ky_RefundTicket:{
		Url: Url + '/api/ky/RefundTicket_Flow',
		name:'客运-退票',
		method:'GET',
		pages:["pages/order/OrderList.vue"],
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Ky_CancelTicket:{
		Url: Url + '/api/ky/CancelTicket_Flow',
		name:'客运-取消',
		method:'GET',
		pages:["pages/order/OrderList.vue"],
		header:{'content-type':'application/x-www-form-urlencoded'},
	}
	
	
}
// 接口声明区
export default {
	KyInterface
}