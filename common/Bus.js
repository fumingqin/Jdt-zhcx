//接口域名
const Url = 'http://36.250.234.10:60040';

const methodGET = 'GET';
const methodPOST = 'POST';


//接口对象
const BusInterface = {
	//编码
	publicCode:{
		encryption : 'XMJDTzzbusxmjdt'
	},
	
	getBusStationInfoByLonLat:{
		Url: Url + '/api/Bus/getBusStationInfoByLonLat',
		name: '获取站点信息根据经纬度',
		method: methodGET,
	},
	getBusLineInfoByStationName:{
		Url: Url + '/api/Bus/getBusLineInfoByStationName',
		name: '获取线路信息根据站点名称',
		method: methodGET,
	},
	getBusLineInfo:{
		Url: Url + '/api/Bus/getBusLineInfo',
		name: '获取线路信息无条件',
		method: methodGET,
	},
	getBusLineInfoByLineName:{
		Url: Url + '/api/Bus/getBusLineInfoByLineName',
		name: '获取线路信息根据线路名称',
		method: methodGET,
	},
	getBusLineArriveLeaveStationInfoByLineIdDirectionStationName:{
		Url: Url + '/api/Bus/getBusLineArriveLeaveStationInfoByLineIdDirectionStationName',
		name: '获取某条线路 距离某个站点即将到站车辆信息 根据站点名称',
		method: methodGET,
	},
	getBusStationInfoByStationName:{
		Url: Url + '/api/Bus/getBusStationInfoByStationName',
		name: '获取站点信息 根据站点名称',
		method: methodGET,
	},
	getBusLineStationInfoByLineIdDirection:{
		Url: Url + '/api/Bus/getBusLineStationInfoByLineIdDirection',
		name: '获取线路站点信息 根据线路编号和运行方向',
		method: methodGET,
	},
    getBusArriveLeaveStationInfoByLineIdDirection:{
		Url: Url + '/api/Bus/getBusArriveLeaveStationInfoByLineIdDirection',
		name: '获取线路实时到站信息 根据线路编号和运行方向',
		method: methodGET,
	},
	getBusLineScheduleInfoByLineIdDirection: {
		Url: Url + '/api/Bus/getBusLineScheduleInfoByLineIdDirection',
		name: '获取线路班次信息 最近10个班次 根据线路编号和运行方向',
		method: methodGET,
	},
	getBusLineTrajectoryByLineIdDirection: {
		Url: Url + '/api/Bus/getBusLineTrajectoryByLineIdDirection',
		name: '获取线路轨迹信息 根据线路编号和运行方向',
		method: methodGET,
	},
	getServerTime: {
		Url: Url + '/api/Bus/getServerTime',
		name: '获取服务器时间',
		method: methodGET,
	},
	getBusChange: {
		Url: Url + '/api/Bus/getBusChange',
		name: '换乘',
		method: methodGET,
	},
	getBusLineArriveLeaveStationInfoByLineIdDirection:{
		Url: Url + '/api/Bus/getBusLineArriveLeaveStationInfoByLineIdDirection',
		name: '获取站点信息跟到站车辆信息',
		method: methodGET,
	},
	getBusPosition:{
		Url: Url + '/api/Bus/getBusPosition',
		name: '查询公交轨迹',
		method: methodGET,
	},
	getFirstLastShift:{
		Url: Url + '/api/Bus/getFirstLastShift',
		name: '查询首末班',
		method: methodGET,
	},
	Add_BusLog:{
		Url: Url + '/api/Bus/Add_BusLog',
		name: '记录用户查询记录',
		method: methodPOST,
	},
}

// 接口声明区
export default {
	BusInterface
}