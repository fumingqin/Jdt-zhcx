/* 接口参数区 */
// 示例

const GaoDeWebKey = [
	"2348ba1d476b5e44917533b65583f969", 
	"1df2cef2c0e71acc0ed1e90d5bf6431a"
]

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat' ,
	//获取所有车辆定位数据
	'http://111.231.109.113:8002/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	'http://111.231.109.113:8002/api/zhcx/getLonLatRangeVehiclePosition',
]

//旅客端出租车接口配置

//接口域名
const Url = 'http://111.231.109.113:8002';

//接口对象
const Interface = {
	//GET-POST
	addPassengerPosition : {
		value: Url + '/api/zhcx/addPassengerPosition',
		name:'旅客端-定时实时上报位置',
		method:'GET',
		pages:[]
	},
	AddExpressOrder_Passenger:{
		value: Url + '/api/taxi/AddExpressOrder_Passenger',
		name:'旅客端-出租车下单',
		method:'POST',
		pages:[]
	},
	SearchExpressOrderByOrderNum_Passenger:{
		value:Url + '/api/taxi/SearchExpressOrderByOrderNum_Passenger',
		name:'旅客端-等车时候根据订单号查询出租车快车订单',
		method:'POST',
		page:[]
	},
	CancelExpressOrderByOrderNum_Passenger:{
		value:Url + '/api/taxi/CancelExpressOrderByOrderNum_Passenger',
		name:'旅客端-根据订单号取消订单',
		method:'POST',
		page:[]
	}
	
}

const dateFormat = {
	dateformat : 'Y-m-d H:i:s'
}

// 接口声明区
export default {
	GaoDeWebKey,
	InterfaceAddress,
	Interface,
	dateFormat
}