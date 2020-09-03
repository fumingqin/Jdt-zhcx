//接口域名
const Url = 'http://36.250.234.10:60040';

const method = 'GET';


//接口对象
const BusInterface = {
	//编码
	publicCode:{
		encryption : 'XMJDTzzbusxmjdt'
	},
	
	getBusStationInfoByLonLat:{
		Url: Url + '/api/Bus/getBusStationInfoByLonLat',
		name: '获取站点信息根据经纬度',
		method: method,
	},
	getBusLineInfoByStationName:{
		Url: Url + '/api/Bus/getBusLineInfoByStationName',
		name: '获取线路信息根据站点名称',
		method: method,
	},
	getBusLineInfo:{
		Url: Url + '/api/Bus/getBusLineInfo',
		name: '获取线路信息无条件',
		method: method,
	},
	getBusLineInfoByLineName:{
		Url: Url + '/api/Bus/getBusLineInfoByLineName',
		name: '获取线路信息根据线路名称',
		method: method,
	},
	getBusLineArriveLeaveStationInfoByLineIdDirectionStationName:{
		Url: Url + '/api/Bus/getBusLineArriveLeaveStationInfoByLineIdDirectionStationName',
		name: '获取某条线路 距离某个站点即将到站车辆信息 根据站点名称',
		method: method,
	},
	getBusStationInfoByStationName:{
		Url: Url + '/api/Bus/getBusStationInfoByStationName',
		name: '获取站点信息 根据站点名称',
		method: method,
	},
	getBusLineStationInfoByLineIdDirection:{
		Url: Url + '/api/Bus/getBusLineStationInfoByLineIdDirection',
		name: '获取线路站点信息 根据线路编号和运行方向',
		method: method,
	},
    getBusArriveLeaveStationInfoByLineIdDirection:{
		Url: Url + '/api/Bus/getBusLineStationInfoByLineIdDirection',
		name: '获取线路实时到站信息 根据线路编号和运行方向',
		method: method,
	},
	getBusLineScheduleInfoByLineIdDirection: {
		Url: Url + '/api/Bus/getBusLineScheduleInfoByLineIdDirection',
		name: '获取线路班次信息 最近10个班次 根据线路编号和运行方向',
		method: method,
	},
	getBusLineTrajectoryByLineIdDirection: {
		Url: Url + '/api/Bus/getBusLineTrajectoryByLineIdDirection',
		name: '获取线路轨迹信息 根据线路编号和运行方向',
		method: method,
	},
	getServerTime: {
		Url: Url + '/api/Bus/getServerTime',
		name: '获取服务器时间',
		method: method,
	},
	getBusChange: {
		Url: Url + '/api/Bus/getBusChange',
		name: '换乘',
		method: method,
	},
}

// 接口声明区
export default {
	BusInterface
}