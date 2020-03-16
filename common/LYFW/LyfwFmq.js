/* 接口参数区 */
// 示例
const userInfo = {
	status: 1, //1成功/0失败提示返回值
	data: {
		unid: 183252546, //唯一ID标示
		mobile: 18888888888, //手机号码
		nickname: '茜茜爱玩', //姓名
		gender: 1, //性别
		birthday: '1994-01-19', //生日
		permanent: '福建省南平市武夷山市', //地址
		autograph: '喜欢可以点关注哦~', //签名
		portrait: '/static/user/touxiang2.jpg', //头像
		bg: '/static/index/banner2.jpg' //背景图
	},
	msg: '提示'
}

/* 六宫格-景区列表 */
const sixPalaceList = {
	status: 1, //1成功/0失败提示返回值
	data: [{
			scenicId: 0,
			name: '武夷山',
			englishName: 'Wuyi Mount',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
		},
		{
			scenicId: 1,
			name: '溪源峡谷',
			englishName: 'Creek Gorge',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/xiyuanxiagu.jpg',
		},
		{
			scenicId: 2,
			name: '芒荡山',
			englishName: 'Mount Mandang',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/mangdangshan.jpg',
		},
		{
			scenicId: 3,
			name: '和平古镇',
			englishName: 'Peace Towns',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/hepingguzhen.jpg',
		},
		{
			scenicId: 4,
			name: '天成奇侠',
			englishName: 'Natural Gorge',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/tianchengqixia.jpg',
		},
		{
			scenicId: 5,
			name: '青龙大瀑布',
			englishName: 'Qinglong Waterfa',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/qinglongdapubu.jpg',
		},
		{
			scenicId: 6,
			name: '茶博园',
			englishName: 'Tea Expo',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/chaboyuan.jpg',
		}
	],
	msg: '提示'
}



/* 景区列表 */
const scenicList = {
	status: 1, //1成功/0失败提示返回值
	data: [{
			scenicId: 0,
			scenicName: '南平武夷山',
			comment: '一码通 | 可订明日票 | 儿童半票',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
			adultPrice: 320,
			sales: 20188,
		},
		{
			scenicId: 1,
			scenicName: '南平溪源峡谷',
			comment: '一码通 | 可订明日票 | 儿童半票',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/xiyuanxiagu.jpg',
			adultPrice: 60,
			sales: 18687,
		},
		{
			scenicId: 2,
			scenicName: '南平芒荡山',
			comment: '一码通 | 可订明日票 | 儿童半票',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/mangdangshan.jpg',
			adultPrice: 10,
			sales: 19245,
		},
		{
			scenicId: 3,
			scenicName: '邵武和平古镇',
			comment: '一码通 | 可订明日票 | 儿童半票',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/hepingguzhen.jpg',
			adultPrice: 0,
			sales: 12815,
		},
		{
			scenicId: 4,
			scenicName: '邵武天成奇峡',
			comment: '一码通 | 可订明日票 | 儿童半票',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/tianchengqixia.jpg',
			adultPrice: 130,
			sales: 21048,
		},
		{
			scenicId: 5,
			scenicName: '武夷山青龙大瀑布',
			comment: '一码通 | 可订明日票 | 儿童半票',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/qinglongdapubu.jpg',
			adultPrice: 60,
			sales: 23074,

		},
		{
			scenicId: 6,
			scenicName: '中华武夷茶博园',
			comment: '一码通 | 可订明日票 | 儿童半票',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/chaboyuan.jpg',
			adultPrice: 218,
			sales: 23078,

		},
		{
			scenicId: 7,
			scenicName: '建阳卧龙湾花花世界',
			comment: '一码通 | 可订明日票 | 儿童半票',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/huahuashijie.jpg',
			adultPrice: 10,
			sales: 110871,
		}
	],
	msg: '提示'
}

//景区详情 - 武夷山
const scSpotDetails = {
	status: 1, //1成功/0失败提示返回值
	data: {
		scenicId: 0,
		image: [{
			src: '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner1.jpg'
		}, {
			src: '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner2.jpg'
		}, {
			src: '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner3.jpg'
		}],
		scenicName: '南平武夷山',
		openup: '09:00 - 18:00',
		scenicContent: '武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。武夷山是三教名山。自秦汉以来，武夷山就为羽流禅家栖息之地，留下了不少宫观、道院和庵堂故址。武夷山还曾是儒家学者倡道讲学之地。武夷山自然保护区，是地球同纬度地区保护最好、物种最丰富的生态系统，拥有2527种植物物种，近5000种野生动物。在中生代晚期，武夷山发生了强烈的火山喷发活动，继之为大规模的花岗岩侵入，已发现本区有丰富的火山机构，为典型的亚洲东部环太平洋带的构造特征。白垩纪晚期的红色砂砾岩是形成丹霞地貌的主体。中生代的地壳运动奠定了武夷山地貌的基本骨架。告性对武夷山地貌发育也很明显，西部海拔1500m以上的山峰，基本上由坚硬的凝灰熔岩和流纹岩等构成，东部红色砂页岩地区则往往发育有较宽的谷地和盆地。所以武夷山丰富的地貌类型是地质构造、流水侵蚀、风化剥蚀、重力崩塌等综合作用的结果。',
		comment: '一码通 | 可订明日票 | 儿童半票',
		state: true, //false为免费 true为收费
		ticket: [{
			ticketId: 0,
			quantityStatus: true, //false为数量无限 true为数量有限
			quantity: 50, //门票数量
			title: '南平武夷山三日游路线',
			contain: '观光车+成票+竹筏票',
			comment: '一码通 | 可订明日票 | 儿童半票',
			adultPrice: 320,
			childPrice: 160,
		}]
	},
	msg: '提示'
}

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

const orderInfo = {
	status: 1, //1成功/0失败提示返回值
	data: {
		ticket: {
			ticketId: 0,
			title: '南平武夷山三日游路线',
			contain: '观光车+成票+竹筏票',
			adultPrice: 320,
			childPrice: 160,
		}, //门票信息
		addressData: [{
			userID: 0,
			ticketType: '成人',
			name: '许小星',
			sex: '女',
			codeNum: '35058199503692367',
			phoneNum: '13853989563',
			default: true,
			emergencyContact:false,
		}, {
			userID: 1,
			ticketType: '儿童',
			name: '张晓雪',
			sex: '女',
			codeNum: '35058200803692367',
			phoneNum: '13853989563',
			default: false,
			emergencyContact:true,
		}],
		coupon: {
			couponID: '1',
			title: '春节限时限量优惠券',
			price: 50,
			condition: 400,
		}, //优惠券信息
		dateReminder: '2020-03-11', //时间表达（今天，明天，星期X）
		date: '明天', //数字时间
		actualPayment: '430', //实际付款金额
	},
	msg: '提示'
}


const orderInfo2 = {
	status: 1, //1成功/0失败提示返回值
	data: {
		orderStatus:'待使用',
		dateReminder: '2020-03-11', //时间表达（今天，明天，星期X）
		date: '明天', //数字时间
		actualPayment: '430', //实际付款金额
		ticketId: 0,
		title: '南平武夷山三日游路线',
		contain: '观光车+成票+竹筏票',
		adultPrice: 320,
		childPrice: 160,
		couponID: '1',
		title: '春节限时限量优惠券',
		price: 50,
		condition: 400,
	},
	msg: '提示'
}

const orderInfo3 = {
	status: 1, //1成功/0失败提示返回值
	data: [{
			userID: 0,
			ticketType: '成人',
			name: '许小星',
			sex: '女',
			codeNum: '35058199503692367',
			phoneNum: '13853989563',
			default: true,
			emergencyContact:false,
		},{
			userID: 1,
			ticketType: '儿童',
			name: '张晓雪',
			sex: '女',
			codeNum: '35058200803692367',
			phoneNum: '13853989563',
			default: false,
			emergencyContact:true,
		}],
	msg: '提示'
}


// 接口声明区
export default {
	userInfo,
	sixPalaceList,
	scenicList,
	scSpotDetails,
	notice,
	orderInfo,
	orderInfo2,
	orderInfo3
}
