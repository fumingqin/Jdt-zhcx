//接口域名
const Url = 'http://111.231.109.113:8004';



//接口对象
const DDTInterface = {
	GetStationByRange: {
		Url: Url + '/api/SmartBike/GetStationByRange',
		name: '有桩站点接口',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetBHTStationByRange: {
		Url: Url + '/api/SmartBike/GetBHTStationByRange',
		name: '无桩站点接口',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetBizStatus: {
		Url: Url + '/api/SmartBike/GetBizStatus',
		name: '查询业户信息',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	Rent: {
		Url: Url + '/api/SmartBike/Rent',
		name: '有桩租车请求',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	Rent_hire: {
		Url: Url + '/api/SmartBike/Rent_hire',
		name: '无桩租车请求',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	OpenRentRequest: {
		Url: Url + '/api/SmartBike/OpenRentRequest',
		name: '开通租车业务',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	CloseRentRequest: {
		Url: Url + '/api/SmartBike/CloseRentRequest',
		name: '关闭租车业务',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetOrder: {
		Url: Url + '/api/SmartBike/GetOrder',
		name: '查询金通行程信息',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	CheckOrderStatus: {
		Url: Url + '/api/SmartBike/CheckOrderStatus',
		name: '检测订单状态',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	TransferHire: {
		Url: Url + '/api/SmartBike/TransferHire',
		name: '助力车还车',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetPurseDetail: {
		Url: Url + '/api/Purse/GetPurseDetail',
		name: '获取钱包数据',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetRefund: {
		Url: Url + '/api/Purse/GetRefund',
		name: '钱包退押金',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetRecharge: {
		Url: Url + '/api/Purse/GetRecharge',
		name: '钱包充值',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetTransaction: {
		Url: Url + '/api/Purse/GetTransaction',
		name: '钱包消费',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	WirteRechargeLog: {
		Url: Url + '/api/Purse/WirteRechargeLog',
		name: '钱包充值记录',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetOrderByUserID: {
		Url: Url + '/api/SmartBike/GetOrderByUserID',
		name: '查询自行车订单',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	WriteRefundLog: {
		Url: Url + '/api/Purse/WriteRefundLog',
		name: '押金退款记录',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	WriteTransactionLog: {
		Url: Url + '/api/Purse/WriteTransactionLog',
		name: '钱包消费记录',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetUserByUserID: {
		Url: Url + '/api/SmartBikePerson/GetUserByUserID',
		name: '自行车用户查询根据用户ID',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	UpdateOrder: {
		Url: Url + '/api/SmartBike/UpdateOrder',
		name: '还车时更新订单状态',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetBusCodeGen: {
		Url: Url + '/api/Purse/GetBusCodeGen',
		name: '公交二维码',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetRecordByUserID: {
		Url: Url + '/api/Purse/GetRecordByUserID',
		name: '消费记录查询',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetRotationChart: {
		Url: Url + '/api/SmartBikePerson/GetRotationChart',
		name: '首页轮播图',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	BikeLog: {
		Url: Url + '/api/SmartBikePerson/BikeLog',
		name: '用户登录记录',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
}
// 接口声明区
export default {
	DDTInterface
}
