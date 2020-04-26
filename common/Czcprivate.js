/* 专线出租车 */
/* 接口参数区 */
// 示例

//接口域名
const Url = 'http://111.231.109.113:8004';

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
		value: 'http://111.231.109.113:8002/api/ly/Pay',
		name:'旅客端-获取支付信息',
		method:'POST', 
		pages:["CZC/PrivateTaxi.nvue"]
	},
}


// 接口声明区
export default {
	Interface,
}