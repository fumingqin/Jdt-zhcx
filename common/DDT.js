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
}

// 接口声明区
export default {
	DDTInterface
}



