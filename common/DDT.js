//接口域名
const Url = 'http://36.250.234.10:60040';
const Url39 = 'http://36.250.234.10:60039';



//接口对象
const DDTInterface = {
	//-----------------------------------------自行车接口------------------------------------------------
	GetWebViewUrl:{
		Url: Url + '/api/WebViewUrl/GetWebViewUrl',
		name: '获取公交查询路径',
		method: 'GET',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
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
	GetOrderByUserID: {
		Url: Url + '/api/SmartBike/GetOrderByUserID',
		name: '查询自行车订单',
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
	//-----------------------------------------其他接口------------------------------------------------
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
	GetNewsByAID: {
		Url: Url + '/api/SmartBikePerson/GetNewsByAID',
		name: '根据ID获取新闻资讯',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetNews: {
		Url: Url + '/api/SmartBikePerson/GetNews',
		name: '新闻资讯',
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
	GetAppVersion: {
		Url: Url + '/api/SmartBikePerson/GetAppVersion',
		name: '自动更新接口',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	ConsumerHotline: {
		Url: Url + '/api/SmartBikePerson/ConsumerHotline',
		name: '客服热线',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	ConsumerHotlineNew: {
		Url: Url + '/api/SmartBikePerson/ConsumerHotlineNew',
		name: '新客服热线',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetHomeStyle: {
		Url: Url + '/api/SmartBikePerson/GetHomeStyle',
		name: '首页长运风采图片',
		method: 'POST',
	},
	GetHomeStyleByAID: {
		Url: Url + '/api/SmartBikePerson/GetHomeStyleByAID',
		name: '根据ID获取长运风采文章',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	//-----------------------------------------钱包接口------------------------------------------------
	GetPurseDetail: {
		Url: Url + '/api/Purse/GetPurseDetail',
		name: '获取钱包数据',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	rechargeCheck: {
		Url: Url + '/api/Purse/rechargeCheck',
		name: '充值检测',
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
	WriteTransactionLog: {
		Url: Url + '/api/Purse/WriteTransactionLog',
		name: '钱包消费记录',
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
	WirteRechargeLog: {
		Url: Url + '/api/Purse/WirteRechargeLog',
		name: '钱包充值记录',
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
	GetRecharge: {
		Url: Url + '/api/Purse/GetRecharge',
		name: '钱包充值',
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
	ManualRefund: {
		Url: Url + '/api/Purse/ManualRefund',
		name: '押金充值超一年，提交人工退押金，后台审核',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	ReManualRefund: {
		Url: Url + '/api/Purse/ReManualRefund',
		name: '人工退押金失败，重新提交退押金信息',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	GetManualRefundByUserID: {
		Url: Url + '/api/Purse/GetManualRefundByUserID',
		name: '获取用户最近一次，提交人工退押金记录',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	Deposit: {
		Url: Url + '/api/Purse/Deposit',
		name: '获取需要充值的押金',
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
	},
	getImage:{
		Url: Url39 + '/api/zhcx/getImage',
		name:'获取图片',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
	//-----------------------------------------公交站点接口------------------------------------------------
	getBusStationInfoByLonLat:{
		Url: Url39 + '/api/Bus/getBusStationInfoByLonLat',
		name:'根据经纬度获取周围站点',
		method:'GET',
		header:{'content-type': 'application/json'},
	},
	GetStationByKeys:{
		Url: Url + '/api/SmartBike/GetStationByKeys',
		name:'桩站点查询根据关键字查询',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
	GetBHTStation:{
		Url: Url + '/api/SmartBike/GetBHTStation',
		name:'无桩站点查询根据关键字查询',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
	getPlanningWalkLineByLonLat:{
		Url: Url39 + '/api/zhcx/getPlanningWalkLineByLonLat',
		name:'步行线路规划',
		method:'GET',
		header:{'content-type': 'application/json'},
	},
	Add_Suggestion:{
		Url: Url + '/api/Suggestion/Add_Suggestion',
		name:'意见反馈',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
	GetMySuggestionList:{
		Url: Url + '/api/Suggestion/GetMySuggestionList',
		name:'意见反馈列表',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
	Add_FailureReport:{
		Url: 'http://36.250.234.10:60035' + '/api/FailureReport/Add_FailureReport',
		name:'添加故障上报',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
	GetMyFailureReportList:{
		Url: Url + '/api/FailureReport/GetMyFailureReportList',
		name:'获取用户故障上报列表',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
	GetThisFailureReport:{
		Url: Url + '/api/FailureReport/GetThisFailureReport',
		name:'根据故障ID获取故障上报',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
	TemporaryLock:{
		Url: Url + '/api/SmartBike/TemporaryLock',
		name:'临时锁车、继续骑行',
		method:'POST',
		header:{'content-type': 'application/json'},
	},
}
// 接口声明区
export default {
	DDTInterface
}
