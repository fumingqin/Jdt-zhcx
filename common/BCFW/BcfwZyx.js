//示例
const charteredBus = {
	status:1,
	data:{
		departName:'厦门机场厦门机场厦门机场',//出发地
		borunName:'晋江厦门机场厦门机场厦门机场',//到达地
		date:'2020-01-20',//出发时间
		number:'1',//包车天数
		car:'../../../static/BCFW/choice/che.png',
		carName:'比亚迪',
		carType:'轿车（5座）',
		carMoney:'110',
		tripName:'张三丰',
		tripId:'350583*********2645',
		tripPhone:'17522044126',
		security: '1.本票仅为乘坐使用，不作为报销凭证 \n 2.本票仅供一人使用、当趟有效，逾期作废 \n 3.请勿携带贵重物品乘坐竹筏 \n 4.在行筏过程中严禁站立或行走拍照 \n 5.在雷雨、大风、能见度差等条件下停筏 \n 6.竹筏在行驶中或未停稳时，严禁强行登、下筏 \n 7.严禁下河游泳，戏水 \n 8.严禁携带戏水工具（水枪、水瓢等）乘坐竹筏 \n 9.严禁未穿救生衣承筏，乘筏过程中严禁解脱救生衣 \n 10.严禁携带易燃、易爆、腐蚀、毒害、放射性等危险品和管制刀具及国家禁止运输的其它危险化学品乘坐竹筏 \n 11.严禁超载（原则上正常水位每张拼排乘坐体重75公斤以下游客10人），如遇超标准体重者，由现场管理人员统一调整 \n 12.咨询电话：0599-8030999 投诉电话：0599-8030995',
		
	},
	msg:'提示'
}
const ArrayInfo={
	status: 1, //1成功/0失败提示返回值
	data: [{
			title:'包车-定制',
			orderDate:'2020-03-04',
			orderType: '待发车',
			cost: 100,
			datestring:'2020-03-04 20:20',
			boardingPoint:'厦门',
			destination:'晋江',
			day:'3天',
			telephone:'123',
			orderNumber:'0000'
		},
		{
			title:'包车-定制',
			orderDate: '2020-03-04',
			orderType: '进行中',
			cost: 200,
			datestring:'2020-03-04 20:20',
			boardingPoint:'厦门',
			destination:'安溪',
			day:'3天',
			telephone:'123',
			orderNumber:'0000'
		},
		{
			title:'包车-定制',
			orderDate: '2020-03-04',
			orderType: '已完成',
			cost: 50,
			datestring:'2020-03-04 20:20',
			boardingPoint:'厦门',
			destination:'晋江',
			day:'3天',
			telephone:'123',
			orderNumber:'0000'
		},
		{
			title:'包车-定制',
			orderDate:'2020-03-04',
			orderType: '待发车',
			cost: 100,
			datestring:'2020-03-04 20:20',
			boardingPoint:'泉州',
			destination:'晋江',
			day:'3天',
			telephone:'123',
			orderNumber:'0000',
			},
		{
			title:'包车-定制',
			orderDate:'2020-03-04',
			orderType: '待支付',
			cost: 100,
			datestring:'2020-03-04 20:20',
			boardingPoint:'厦门',
			destination:'晋江',
			day:'3天',
			telephone:'123',
			orderNumber:'0000'
		},
		{
			title:'包车-专线',//标题
			orderDate:'2020-03-04',//预定时间
			orderType: '已取消',//状态
			cost: 100,//价格
			datestring:'2020-03-04 20:20',//发车时间
			boardingPoint:'厦门',//出发地
			destination:'晋江',//目的地
			day:'3天',//包车天数
			telephone:'123',//司机电话
			orderNumber:'0000'//订单号
		}
	],
	msg: '提示'
}
const orderInfo={
	status: 1, //1成功/0失败提示返回值
	data: {
			ticketTitle:'包车-定制',
			orderType: '待发车',
			username:'张三丰',
			userId:'350583199909010022',
			userphone:'13235912326',
			timeout:30,
			cm_money:70,
			cost: 100,
			datestring:'2020-03-04 20:20',
			boardingPoint:'厦门',
			destination:'晋江',
			day:3,
			telephone:'123',
			orderNumber:'0000'
		}
}
// 接口声明区
export default {
	ArrayInfo,
	orderInfo,
	charteredBus,
}