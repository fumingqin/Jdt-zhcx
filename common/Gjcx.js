/* 接口参数区 */
// 示例
const userInfo = {
	status: 1,  //成功/失败提示返回值
	data: {
		unid : 183252546,        //唯一ID标示
		mobile: 18888888888,     //手机号码
		nickname: '茜茜爱玩',    //姓名
		gender:1,				//性别
		birthday:'1994-01-19',  //生日
		permanent:'福建省南平市武夷山市',  //地址
		autograph:'喜欢可以点关注哦~',	  //签名
		portrait: '/static/user/touxiang2.jpg',  //头像
		bg:'/static/index/banner2.jpg'			//背景图
	},
	msg: '提示'		
}
const nearBy ={
	status: 1,  //成功/失败提示返回值
	data: {
		stationID:'123',
		stationName:'信和站',
		distance:'170米',
	},
	msg: '提示'	
}
const line ={
	status: 1,  //成功/失败提示返回值
	data: [{
		lineID:'1',
		lineName:'X2路',
		direction:'新塘·尚好家园',
		distance:'120',
		stationNumber:'即将到站',
		arriveTime:'1分钟',
		unit:'千米',                 //距离单位
	},{
		lineID:'2',
		lineName:'17路',
		direction:'福厦高铁泉州站',
		distance:'400',
		stationNumber:'1站',
		arriveTime:'1分钟',
		unit:'千米',                 //距离单位
	},
	{
		lineID:'3',
		lineName:'19路',
		direction:'航空旅游首末站',
		distance:'1.1',
		stationNumber:'2站',
		arriveTime:'3分钟',
		unit:'千米',                 //距离单位
	},
	{
		lineID:'4',
		lineName:'K508路',
		direction:'市中医院首末站',
		distance:'5',
		stationNumber:'5站',
		arriveTime:'13分钟',
		unit:'千米',                 //距离单位
	}],
	msg: '提示'	
}
const detailLine ={
	status: 1,  //成功/失败提示返回值
	data:{
		lineID:'3',
		starStation:'武夷花园',
		endStation:'五金机电产业园',
		starTime:'06:00',
		endTime:'18:00',
		price:'4元',
		departureInterval:'15',
		departureTime:'10:00',
		distance:'600',
		unit:'米',
	}
}
// 实时动态
const realtimeDynamic ={
	status: 1,  //成功/失败提示返回值
	direction:0, //判断方向 有0,1
	data: [{
		stationID:'1',
		stationName:'武夷花园',
		stationStatu:'0', //道路状态：0通畅，1一般，2拥堵
		isArrive:'0',     //是否到站：0未到站，1到站
	},
	{
		stationID:'2',
		stationName:'玉屏公园 长富花园',
		stationStatu:'1', //道路状态：0通畅，1一般，2拥堵
		isArrive:'0',     //是否到站：0未到站，1到站
	},
	{
		stationID:'3',
		stationName:'交通运输局 住建局',
		stationStatu:'1', //道路状态：0通畅，1一般，2拥堵
		isArrive:'1',     //是否到站：0未到站，1到站
	},
	{
		stationID:'4',
		stationName:'商业城 小方舞蹈中心',
		stationStatu:'2', //道路状态：0通畅，1一般，2拥堵
		isArrive:'0',     //是否到站：0未到站，1到站
	},
	{
		stationID:'5',
		stationName:'爱尚生活城 文化广场',
		stationStatu:'2', //道路状态：0通畅，1一般，2拥堵
		isArrive:'0',     //是否到站：0未到站，1到站
	},
	{
		stationID:'6',
		stationName:'人民路',
		stationStatu:'0', //道路状态：0通畅，1一般，2堵
		isArrive:'0',     //是否到站：0未到站，1到站
	},
	{
		stationID:'7',
		stationName:'西湖公园',
		stationStatu:'0', //道路状态：0通畅，1一般，2堵
		isArrive:'0',     //是否到站：0未到站，1到站
	}],
	msg: '提示'	
}
//反向
const realtimeDynamicback ={
	status: 1,  //成功/失败提示返回值
	direction:1, //判断方向 有0,1
	data: [
		{
			stationID:'7',
			stationName:'西湖公园',
			stationStatu:'0', //道路状态：0通畅，1一般，2堵
			isArrive:'0',     //是否到站：0未到站，1到站
		},
		{
			stationID:'6',
			stationName:'人民路',
			stationStatu:'0', //道路状态：0通畅，1一般，2堵
			isArrive:'0',     //是否到站：0未到站，1到站
		},
		{
			stationID:'5',
			stationName:'爱尚生活城   文化广场',
			stationStatu:'2', //道路状态：0通畅，1一般，2拥堵
			isArrive:'0',     //是否到站：0未到站，1到站
		},
		{
			stationID:'4',
			stationName:'商业城   小方舞蹈中心',
			stationStatu:'2', //道路状态：0通畅，1一般，2拥堵
			isArrive:'0',     //是否到站：0未到站，1到站
		},
		{
			stationID:'3',
			stationName:'交通运输局   住建局',
			stationStatu:'1', //道路状态：0通畅，1一般，2拥堵
			isArrive:'1',     //是否到站：0未到站，1到站
		},
		{
			stationID:'2',
			stationName:'玉屏公园   长富花园',
			stationStatu:'1', //道路状态：0通畅，1一般，2拥堵
			isArrive:'0',     //是否到站：0未到站，1到站
		},
		{
		stationID:'1',
		stationName:'武夷花园',
		stationStatu:'0', //道路状态：0通畅，1一般，2拥堵
		isArrive:'0',     //是否到站：0未到站，1到站
	}],
	msg: '提示'	
}
const InterfaceAddress = [
	//获取线路信息，根据站点名称
	'http://111.231.109.113:8002/api/bus/getBusLineInfoByStationName',
	//获取离某个经纬度最近的一个站点信息，根据经纬度信息
	'http://111.231.109.113:8002/api/bus/getBusStationInfoByLonLat',
	//获取线路站点信息，根据线路编号，线路方向
	'http://111.231.109.113:8002/api/bus/getBusLineStationInfoByLineIdDirection',
	//获取车辆实时到站信息，根据线路编号，线路方向
	'http://111.231.109.113:8002/api/bus/getBusArriveLeaveStationInfoByLineIdDirection',
	//获取距离某站最近车辆信息 根据线路编号，方向，站点名称 
	'http://111.231.109.113:8002/api/bus/getBusLineArriveLeaveStationInfoByLineIdDirectionStationName',
	//根据起始点经纬度获取距离
	'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat'
]
// 接口声明区
export default {
	userInfo,  
	line,
	nearBy,
	detailLine,
	realtimeDynamic,
	realtimeDynamicback,
	InterfaceAddress
}