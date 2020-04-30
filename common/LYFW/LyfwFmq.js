//弹框须知文本
const notice = {
	status: 1, //1成功/0失败提示返回值
	data: {
		explain: '预订时间：最晚需在出行当天18:00前购票 \n 有效时间：指定购买日期起，1日有效',
		way: '1、本产品每个账号每天限购一张，购买APP订单中的二维码检票入园即可 \n 2、费用包含：成人票一张、竹筏票一张 \n 3、本产品不支持代购或转售，仅限购票人本人使用。因代购或转售无法入园申请退改，不退不改。',
		date: '周一至周日 09:00~18:00',
		policy: '1、70岁以上老年人凭老年证免费 \n 2、身高80厘米以下免票 \n 3、身高80-120厘米儿童票价半折 \n 4、身高120以上儿童全票',
		rule: '该产品未使用且在有效期内支持随时退，过期不退不改，敬请谅解！如需取消，请登录APP账号申请取消，经核实 未使用且在有效期内，可免费取消。如需 改期，请申请取消后重新预订。',
		security: '1.本票仅为乘坐使用，不作为报销凭证 \n 2.本票仅供一人使用、当趟有效，逾期作废 \n 3.请勿携带贵重物品乘坐竹筏 \n 4.在行筏过程中严禁站立或行走拍照 \n 5.在雷雨、大风、能见度差等条件下停筏 \n 6.竹筏在行驶中或未停稳时，严禁强行登、下筏 \n 7.严禁下河游泳，戏水 \n 8.严禁携带戏水工具（水枪、水瓢等）乘坐竹筏 \n 9.严禁未穿救生衣承筏，乘筏过程中严禁解脱救生衣 \n 10.严禁携带易燃、易爆、腐蚀、毒害、放射性等危险品和管制刀具及国家禁止运输的其它危险化学品乘坐竹筏 \n 11.严禁超载（原则上正常水位每张拼排乘坐体重75公斤以下游客10人），如遇超标准体重者，由现场管理人员统一调整 \n 12.咨询电话：0599-8030999 投诉电话：0599-8030995',
	},
	msg: '提示' 
}


//接口域名
const Url = 'http://111.231.109.113:8006';

//引入模板
	// url:$lyfw.Interface.spt_tl_six.value,
	// method:$lyfw.Interface.spt_tl_six.method,
	// import $lyfw from '../../../common/LYFW/LyfwFmq.js' //引用路径

//接口对象
const Interface = {
	//GET-POST
	spt_GetticketSearchByrequestArea_Six:{
		value: Url + '/api/ly/GetticketSearchByrequestArea_Six',
		name:'景区列表-六宫格',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/ticketsList.vue"]
	},
	
	spt_GetticketSearchByrequestArea:{
		value: Url + '/api/ly/GetticketSearchByrequestArea',
		name:'景区列表-景区列表',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/ticketsList.vue"]
	},
	
	spt_GetticketSearchBysearchValue:{
		value: Url + '/api/ly/GetticketSearchBysearchValue',
		name:'景区列表-搜索',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/ticketsList.vue"]
	},
	
	spt_GetticketDetailByticketId:{
		value: Url + '/api/ly/GetticketDetailByticketId',
		name:'景区门票-详情',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/ticketsDetails.vue"]
	},
	
	spt_GetticketSecurityByticketIde:{
		value: Url + '/api/ly/GetticketSecurityByticketId',
		name:'景区门票-门票须知',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	},
	
	spt_GetcouponByuserId:{
		value: Url + '/api/ly/GetcouponByuserId',
		name:'景区门票-优惠券列表',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	},
	
	spt_scenicSpotSetOrder:{
		value: Url + '/api/app/scenicSpotSetOrder',
		name:'景区门票-H5提交订单',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	},
	
	spt_AddtouristOrder:{
		value: Url + '/api/ly/AddtouristOrder',
		name:'景区门票-APP提交订单',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderAdd.vue"]
	},
	
	spt_RequestTicketsList:{
		value: Url + '/api/ly/RequestTicketsList',
		name:'订单列表',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	spt_RequestTicketsListDetail:{
		value: Url + '/api/ly/RequestTicketsListDetail',
		name:'订单详情',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/orderDetails.vue","LYFW/scenicSpotTickets/selectivePayment.vue","order/OrderList.vue"]
	},
	
	spt_getIsPaySuccess:{
		value: Url + '/api/ly/getIsPaySuccess',
		name:'订单-去支付-查询是否出票',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue"]
	},
	
	spt_RequestTickets:{
		value: Url + '/api/ly/RequestTickets',
		name:'订单-去支付-出票',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue"]
	},
	
	spt_CancelTickets:{
		value: Url + '/api/ly/CancelTickets',
		name:'订单-取消',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue","order/OrderList.vue"]
	},
	
	spt_BounceTickets:{
		value: Url + '/api/ly/BounceTickets',
		name:'订单-退票',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue","order/OrderList.vue"]
	},
	
	spt_DeleteTickets:{
		value: Url + '/api/ly/DeleteTickets',
		name:'订单-删除',
		method:'POST',
		pages:["order/OrderList.vue"]
	},
	
	spt_Pay:{
		value: Url + '/api/ly/Pay',
		name:'订单-请求支付参数',
		method:'POST',
		pages:["LYFW/scenicSpotTickets/selectivePayment.vue"]
	},
	
}


// 接口声明区
export default {
	notice,
	Interface
}
