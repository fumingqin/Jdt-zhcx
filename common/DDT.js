//接口域名
const Url = 'http://111.231.109.113:8004';

//接口对象
const DDTInterface = {
	GetStationByRange:{
		Url:Url + '/api/SmartBike/GetStationByRange',
		name:'有桩站点接口',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	GetBHTStationByRange:{
		Url:Url + '/api/SmartBike/GetBHTStationByRange',
		name:'无桩站点接口',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	GetBizStatus:{
		Url:Url + '/api/SmartBike/GetBizStatus',
		name:'查询业户信息',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Rent:{
		Url:Url + '/api/SmartBike/Rent',
		name:'有桩租车请求',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	Rent_hire:{
		Url:Url + '/api/SmartBike/Rent_hire',
		name:'无桩租车请求',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	OpenRentRequest:{
		Url:Url + '/api/SmartBike/OpenRentRequest',
		name:'开通租车业务',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	CloseRentRequest:{
		Url:Url + '/api/SmartBike/CloseRentRequest',
		name:'关闭租车业务',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
}

// 接口声明区
export default {
	DDTInterface
}



