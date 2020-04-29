/* 专线出租车 */
/* 接口参数区 */
// 示例

//接口域名
const Url = 'http://111.231.109.113:8004';
const Url1="http://111.231.109.113:8002";
//接口对象
const Interface = {
	//GET-POST
	GetSpecialLine:{
		value: Url + '/api/SpecialLine/GetSpecialLine_Passenger',
		name:'旅客端-获取专线车线路信息',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	},
	GetSpecialLineByLineID:{
		value: Url + '/api/SpecialLine/GetSpecialLineByLineID_Passenger',
		name:'旅客端-根据线路ID获取线路信息',
		method:'POST',
		pages:[""]
	},
	AddSpecialLineOrder_Passenger:{
		value: Url + '/api/SpecialLine/AddSpecialLineOrder_Passenger',
		name:'旅客端-添加订单',
		method:'POST',
		pages:["CZC/PrivateTaxi.nvue"]
	},
	CancelSpecialLineOrder_Passenger:{
		value: Url + '/api/SpecialLine/CancelSpecialLineOrder_Passenger',
		name:'旅客端-取消订单',
		method:'POST',
		pages:["CZC/PrivateTaxi.nvue"]
	},
	Pay:{ 
		value: Url1+'/api/ly/getCommonPayparameter',
		name:'旅客端-获取支付信息',
		method:'POST', 
		pages:["CZC/PrivateTaxi.nvue"]
	},
	Pay1:{
		value: Url1+'/api/ly/getCommonPayparameter1',
		name:'旅客端-获取支付信息',
		method:'POST', 
		pages:["CZC/PrivateTaxi.nvue"]
	},
	QuerySpecialLineOrderByUserID_Passenger:{
		value: Url + '/api/SpecialLine/QuerySpecialLineOrderByUserID_Passenger',
		name:'旅客端-根据用户ID查询订单',
		method:'POST',
		pages:["CZC/PrivateTaxi.nvue"]
	},
	QuerySpecialLineOrder_Passenger:{
		value: Url + '/api/SpecialLine/QuerySpecialLineOrder_Passenger',
		name:'旅客端-根据订单ID查询订单',
		method:'POST',
		pages:["CZC/WaitTakeOrder.nvue","CZC/SpecialLineDetail.nvue"]
	},
	SpecialLineOrderPay_Passenger:{
		value: Url + '/api/SpecialLine/SpecialLineOrderPay_Passenger',
		name:'旅客端-支付完成',
		method:'POST',
		pages:["CZC/PrivateTaxi.nvue"]
	},
	DeleteSpecialLineOrder_Passenger:{
		value: Url + '/api/SpecialLine/DeleteSpecialLineOrder_Passenger',
		name:'旅客端-支付完成',
		method:'POST',
		pages:["CZC/PrivateTaxi.nvue"]
	},
}


// 接口声明区
export default {
	Interface,
}