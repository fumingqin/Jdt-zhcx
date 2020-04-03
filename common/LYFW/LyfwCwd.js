/* 接口参数区 */
// 示例
const userInfo = {
	status: 1, //成功/失败提示返回值
	data: {
		unid: 183252546, //唯一ID标示
		mobile: 18888888888, //手机号码
		nickname: '茜茜爱玩', //姓名
		gender: 1, //性别
		birthday: '1994-01-19', //生日
		permanent: '福建省南平市武夷山市', //地址
		autograph: '喜欢可以点关注哦~', //签名
		portrait: '../../../static/LYFW/peripheralTourism/user/touxiang2.jpg', //头像
		bg: '/static/index/banner2.jpg', //背景图
		date: '2019-12-21', //回复日期
	},
	msg: '提示'
}

/* 六宫格-景区列表 */
const sixPalaceList = [{
		scenicId: 0,
		name: '武夷山',
		englishName: 'Wuyi Mount',
		image: '../../../static/LYFW/Tickets/ticketsList/wuyishan.jpg',
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
]

/* 景区列表 */
const scenicList = [{
		scenicId: 0,
		scenicName: '南平武夷山',
		comment: '一码通 | 可订明日票 | 非即时退',
		image: '../../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
		price: 320,
		sales: 20188,
	},
	{
		scenicId: 1,
		scenicName: '南平溪源峡谷',
		comment: '一码通 | 可订明日票 | 非即时退',
		image: '../../../static/LYFW/scenicSpotTickets/ticketsList/xiyuanxiagu.jpg',
		price: 60,
		sales: 18687,
	},
	{
		scenicId: 2,
		scenicName: '南平芒荡山',
		comment: '一码通 | 可订明日票 | 非即时退',
		image: '../../../static/LYFW/scenicSpotTickets/ticketsList/mangdangshan.jpg',
		price: 10,
		sales: 19245,
	},
	{
		scenicId: 3,
		scenicName: '邵武和平古镇',
		comment: '一码通 | 可订明日票 | 非即时退',
		image: '../../../static/LYFW/scenicSpotTickets/ticketsList/hepingguzhen.jpg',
		price: 0,
		sales: 12815,
	},
	{
		scenicId: 4,
		scenicName: '邵武天成奇峡',
		comment: '一码通 | 可订明日票 | 非即时退',
		image: '../../../static/LYFW/scenicSpotTickets/ticketsList/tianchengqixia.jpg',
		price: 130,
		sales: 21048,
	},
	{
		scenicId: 5,
		scenicName: '武夷山青龙大瀑布',
		comment: '一码通 | 可订明日票 | 非即时退',
		image: '../../../static/LYFW/scenicSpotTickets/ticketsList/qinglongdapubu.jpg',
		price: 60,
		sales: 23074,

	},
	{
		scenicId: 6,
		scenicName: '中华武夷茶博园',
		comment: '一码通 | 可订明日票 | 非即时退',
		image: '../../../static/LYFW/scenicSpotTickets/ticketsList/chaboyuan.jpg',
		price: 218,
		sales: 23078,

	},
	{
		scenicId: 7,
		scenicName: '建阳卧龙湾花花世界',
		comment: '一码通 | 可订明日票 | 非即时退',
		image: '../../../static/LYFW/scenicSpotTickets/ticketsList/huahuashijie.jpg',
		price: 10,
		sales: 110871,
	}
]

//景区详情 - 武夷山
const scSpotDetails = {
	scenicId: 0,
	image: [{
		src: '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner1.jpg'
	}, {
		src: '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner2.jpg'
	}, {
		src: '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner3.jpg'
	}],
	imageNumber: 3,
	scenicName: '南平武夷山',
	openup: '09:00 - 18:00',
	scenicContent: '武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。武夷山是三教名山。自秦汉以来，武夷山就为羽流禅家栖息之地，留下了不少宫观、道院和庵堂故址。武夷山还曾是儒家学者倡道讲学之地。武夷山自然保护区，是地球同纬度地区保护最好、物种最丰富的生态系统，拥有2527种植物物种，近5000种野生动物。在中生代晚期，武夷山发生了强烈的火山喷发活动，继之为大规模的花岗岩侵入，已发现本区有丰富的火山机构，为典型的亚洲东部环太平洋带的构造特征。白垩纪晚期的红色砂砾岩是形成丹霞地貌的主体。中生代的地壳运动奠定了武夷山地貌的基本骨架。告性对武夷山地貌发育也很明显，西部海拔1500m以上的山峰，基本上由坚硬的凝灰熔岩和流纹岩等构成，东部红色砂页岩地区则往往发育有较宽的谷地和盆地。所以武夷山丰富的地貌类型是地质构造、流水侵蚀、风化剥蚀、重力崩塌等综合作用的结果。',
	comment: '一码通 | 可订明日票 | 非即时退',
	state: true, //false为免费 true为收费
	ticket: [{
		quantityStatus: true, //false为数量无限 true为数量有限
		quantity: 50, //门票数量
		title: '【成人】南平武夷山三日游路线 （观光车+成人门票+竹筏票）',
		comment: '一码通 | 可订明日票 | 非即时退',
		price: 320,

	}, {
		quantityStatus: false, //false为数量无限 true为数量有限
		quantity: 50, //门票数量
		title: '【儿童】南平,三日游路线 （观光车+儿童门票+竹筏票）',
		comment: '一码通 | 可订明日票 | 非即时退',
		price: 160
	}]
}

//蔡伟达-旅游路线-景区推文
const lunBo = {
	status: 1, //1成功,0失败提示返回值
	data: {
		image: [{
			title: '武夷山|全方位详尽三日',
			src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
		}, {
			title: '巴厘岛一日游',
			src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner2.jpg',
		}, {
			title: '浪漫巴厘岛',
			src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner3.jpg',
		}]
	},
	msg: '提示'
}

//蔡伟达-旅游路线-景点内容/热门路线
const touristRoute = {
	status: 1, //1成功,0失败提示返回值
	data: [{
		routeId: 1,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '武夷山风景名胜区三日游',
		scName: '武夷山',
		scEnglish: 'THREE DAY TOUR OF WUYISHAN SCENIC SPOOT',
		jungle: '自然风光',
		cost: 1200,
		days: 3,
		related: 108,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/wuyishan.jpg',
		date: '2019-11-05',
		like: 1088,
		comment: 92,
	}, {
		routeId: 2,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '溪源峡谷风景名胜区',
		scName: '溪源峡谷',
		scEnglish: 'XIYAN CANYON SCENIC SPOT',
		jungle: '自然风光',
		cost: 600,
		days: 2,
		related: 89,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/xiyuanxiagu.jpg',
		date: '2019-11-06',
		like: 682,
		comment: 78,
	}, {
		routeId: 3,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '芒荡山风景名胜区',
		scName: '芒荡山',
		scEnglish: 'MANGDANG MOUNTAIN SCENIC SPOT',
		jungle: '自然风光',
		cost: 200,
		days: 1,
		related: 68,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/mangdangshan.jpg',
		date: '2019-11-07',
		like: 308,
		comment: 66,
	}, {
		routeId: 4,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '和平古镇一日游',
		scName: '和平古镇',
		scEnglish: 'ONE DAY TOUR OF HEPING ANCIENT TOWN',
		jungle: '自然风光',
		cost: 180,
		days: 1,
		related: 64,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/hepingguzhen.jpg',
		date: '2019-11-08',
		like: 873,
		comment: 91,
	}, {
		routeId: 5,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '天成奇侠一日游',
		scName: '天成奇侠',
		scEnglish: 'ONE DAY TOUR OF TIANCHENG WONDER',
		jungle: '自然风光',
		cost: 150,
		days: 1,
		related: 82,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/tianchengqixia.jpg',
		date: '2019-11-09',
		like: 546,
		comment: 83,
	}, {
		routeId: 6,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '青龙大瀑布一日游',
		scName: '青龙大瀑布',
		scEnglish: 'ONE DAY TOUR OF QINGLONG WATERFALL',
		jungle: '自然风光',
		cost: 120,
		days: 1,
		related: 63,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/qinglongdapubu.jpg',
		date: '2019-11-10',
		like: 1251,
		comment: 35,
	}, {
		routeId: 7,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '中华武夷山茶博园一日游',
		scName: '茶博园',
		scEnglish: 'ONE DAY TOUR OF WUYISHAN TEA GARDEN IN CHINA',
		jungle: '自然风光',
		cost: 125,
		days: 1,
		related: 57,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/chaboyuan.jpg',
		date: '2019-11-11',
		like: 1098,
		comment: 51,
	}, {
		routeId: 8,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '建阳卧龙湾花花世界一日游',
		scName: '花花世界',
		scEnglish: 'ONE DAY TOUR OF FLOWER WORLD IN WOLONG BAY JIANYANG',
		jungle: '动植物园',
		cost: 200,
		days: 1,
		related: 35,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/huahuashijie.jpg',
		date: '2019-11-12',
		like: 1205,
		comment: 24,
	}],
	msg: '提示'
}

// 蔡伟达-旅游服务-路线评论区2
const routeComment2 = {
	status: 1, //1成功/0失败提示返回值
	data: {
		image: [{
			ticketImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
		}, {
			ticketImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner2.jpg',
		}, {
			ticketImage: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner3.jpg',
		}],
	},
	msg: '提示'
}


// 蔡伟达-旅游服务-路线评论区
const routeComment = {
	status: 1, //1成功/0失败提示返回值
	data: {
		scenicId: 0,
		image: [{
			src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
		}, {
			src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner2.jpg',
		}, {
			src: '../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner3.jpg',
		}],
		title: '武夷山 | 全方位详尽三日',
		time: '2019-11-05',
		clicks: '2000',
		scenicName: '南平武夷山',
		openup: '09:00 - 18:00',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scenicContent: '武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。武夷山是三教名山。自秦汉以来，武夷山就为羽流禅家栖息之地，留下了不少宫观、道院和庵堂故址。武夷山还曾是儒家学者倡道讲学之地。武夷山自然保护区，是地球同纬度地区保护最好、物种最丰富的生态系统，拥有2527种植物物种，近5000种野生动物。在中生代晚期，武夷山发生了强烈的火山喷发活动，继之为大规模的花岗岩侵入，已发现本区有丰富的火山机构，为典型的亚洲东部环太平洋带的构造特征。白垩纪晚期的红色砂砾岩是形成丹霞地貌的主体。中生代的地壳运动奠定了武夷山地貌的基本骨架。告性对武夷山地貌发育也很明显，西部海拔1500m以上的山峰，基本上由坚硬的凝灰熔岩和流纹岩等构成，东部红色砂页岩地区则往往发育有较宽的谷地和盆地。所以武夷山丰富的地貌类型是地质构造、流水侵蚀、风化剥蚀、重力崩塌等综合作用的结果。',
		comment: '一码通 | 可订明日票 | 儿童半票',
		state: true, //false为免费 true为收费
		collection : 389,
		collectionState : false,
		like : 207,
		likeState : false,
		commentState : false,
	},
	msg: '提示'
}

// 蔡伟达-旅游服务-用户路线
const userRoute = {
	status: 1, //1成功/0失败提示返回值
	data: [{
			scenicId: 0,
			day: 1,
			address: '南平',
			scenicName: '武夷山风景名胜区',
			playtime: '游玩建议6小时',
			start: '国内原生森林',
			scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
			icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon1.png',
			image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan1.png',
		},
		{
			scenicId: 1,
			day: 1,
			address: '南平',
			scenicName: '武夷山市 - 建阳区',
			playtime: '1小时',
			start: '武夷山汽车站',
			scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
			icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon2.png',
			image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan2.png',
		},
		{
			scenicId: 2,
			day: 2,
			address: '南平',
			scenicName: '武夷山风景名胜区',
			playtime: '游玩建议6小时',
			start: '国内原生森林',
			scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
			icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon1.png',
			image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan1.png',
		},
		{
			scenicId: 3,
			day: 2,
			address: '南平',
			scenicName: '武夷山市 - 建阳区',
			playtime: '1小时',
			start: '武夷山汽车站',
			scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
			icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon2.png',
			image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan2.png',
		},
		{
			scenicId: 4,
			day: 3,
			address: '南平',
			scenicName: '武夷山风景名胜区',
			playtime: '游玩建议6小时',
			start: '国内原生森林',
			scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
			icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon1.png',
			image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan1.png',
		},
		{
			scenicId: 5,
			day: 3,
			address: '南平',
			scenicName: '武夷山市 - 建阳区',
			playtime: '1小时',
			start: '武夷山汽车站',
			scenicContent: ' 武夷山西部是全球生物多样性保护的关键地区，是中...',
			icon: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/icon2.png',
			image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/routewuyishan2.png',
		}
	],
	msg: '提示'
}

/*蔡伟达-旅游路线-回复内容 */
const reply = {
	status: 1, //1成功/0失败提示返回值
	data: [{
		unid: 185677868,
		scennicName: '李大刚',
		portrait: '../../../static/LYFW/peripheralTourism/user/t1.jpg',
		content: '小姐姐的笔记写的很好啊！照片也拍的很美，给你点个赞，想来武夷山游玩的朋友们可以加我微信15359031110为您提供游玩攻略、民宿、帐篷预订及门票船票预订等旅游服务。我们整合了山上所有的旅游资源，花2分钟咨询，换一次完美旅行。赶紧动动手指联系我们把！',
		date: '2019-12-16',
		fabulous: 18,
		fabulousState: false,
	}, {
		unid: 185271851,
		scennicName: 'NDNPSOSWANGT',
		portrait: '../../../static/LYFW/peripheralTourism/user/t2.jpg',
		content: '不错,很赞的小姐姐,感谢分享',
		date: '2019-12-16',
		fabulous: 15,
		fabulousState: true,
	}, {
		unid: 153218884,
		scennicName: '小郑哥',
		portrait: '../../../static/LYFW/peripheralTourism/user/t3.jpg',
		content: '专门说武夷山的笔记在哪里？',
		date: '2019-12-16',
		fabulous: 12,
		fabulousState: false,
	}, {
		unid: 415546455,
		scennicName: 'Mickin',
		portrait: '../../../static/LYFW/peripheralTourism/user/t1.jpg',
		content: '小姐姐的笔记写的很好啊',
		date: '2019-12-16',
		fabulous: 8,
		fabulousState: true,
	}, {
		unid: 653235635,
		scennicName: '王老五',
		portrait: '../../../static/LYFW/peripheralTourism/user/t2.jpg',
		content: '不错,很赞的小姐姐,感谢分享',
		date: '2019-12-16',
		fabulous: 5,
		fabulousState: false,
	}, {
		unid: 215851875,
		scennicName: '富士康代工007',
		portrait: '../../../static/LYFW/peripheralTourism/user/t3.jpg',
		content: '小姐姐真好看？Emm?',
		date: '2019-12-16',
		fabulous: 0,
		fabulousState: false,
	}],
	msg: '提示'
}

//蔡伟达-旅游路线-景点内容/热门路线
const touristRoute2 = {
	status: 1, //1成功,0失败提示返回值
	data: [{
		routeId: 1,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '武夷山风景名胜区三日游',
		scName: '武夷山',
		scEnglish: 'THREE DAY TOUR OF WUYISHAN SCENIC SPOOT',
		jungle: '自然风光',
		cost: 1200,
		days: 3,
		related: 108,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/wuyishan.jpg',
		date: '2019-11-05',
		like: 1088,
		comment: 92,
	}, {
		routeId: 2,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '溪源峡谷风景名胜区',
		scName: '溪源峡谷',
		scEnglish: 'XIYAN CANYON SCENIC SPOT',
		jungle: '自然风光',
		cost: 600,
		days: 2,
		related: 89,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/xiyuanxiagu.jpg',
		date: '2019-11-06',
		like: 682,
		comment: 78,
	}],
	msg: '提示'
}

//蔡伟达-旅游路线-景点内容/热门路线
const touristRoute3 = {
	status: 1, //1成功,0失败提示返回值
	data: [{
		routeId: 1,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '芒荡山风景名胜区',
		scName: '芒荡山',
		scEnglish: 'MANGDANG MOUNTAIN SCENIC SPOT',
		jungle: '自然风光',
		cost: 200,
		days: 1,
		related: 68,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/mangdangshan.jpg',
		date: '2019-11-07',
		like: 308,
		comment: 66,
	}, {
		routeId: 2,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '和平古镇一日游',
		scName: '和平古镇',
		scEnglish: 'ONE DAY TOUR OF HEPING ANCIENT TOWN',
		jungle: '自然风光',
		cost: 180,
		days: 1,
		related: 64,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/hepingguzhen.jpg',
		date: '2019-11-08',
		like: 873,
		comment: 91,
	}, {
		routeId: 3,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '天成奇侠一日游',
		scName: '天成奇侠',
		scEnglish: 'ONE DAY TOUR OF TIANCHENG WONDER',
		jungle: '自然风光',
		cost: 150,
		days: 1,
		related: 82,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/tianchengqixia.jpg',
		date: '2019-11-09',
		like: 546,
		comment: 83,
	}, {
		routeId: 4,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '青龙大瀑布一日游',
		scName: '青龙大瀑布',
		scEnglish: 'ONE DAY TOUR OF QINGLONG WATERFALL',
		jungle: '自然风光',
		cost: 120,
		days: 1,
		related: 63,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/qinglongdapubu.jpg',
		date: '2019-11-10',
		like: 1251,
		comment: 35,
	}, {
		routeId: 5,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '中华武夷山茶博园一日游',
		scName: '茶博园',
		scEnglish: 'ONE DAY TOUR OF WUYISHAN TEA GARDEN IN CHINA',
		jungle: '自然风光',
		cost: 125,
		days: 1,
		related: 57,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/chaboyuan.jpg',
		date: '2019-11-11',
		like: 1098,
		comment: 51,
	}, {
		routeId: 6,
		routeClicks: '2.1',
		headImage: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/touxiang.png',
		nickName: '李茜茜',
		autograph: '步步寻往迹,有处特依依~',
		address: '南平市',
		scennicName: '建阳卧龙湾花花世界一日游',
		scName: '花花世界',
		scEnglish: 'ONE DAY TOUR OF FLOWER WORLD IN WOLONG BAY JIANYANG',
		jungle: '动植物园',
		cost: 200,
		days: 1,
		related: 35,
		attribute: '旅游度假区',
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/huahuashijie.jpg',
		date: '2019-11-12',
		like: 1205,
		comment: 24,
	}],
	msg: '提示'
}

const complaint ={
	status: 1, //1成功,0失败提示返回值
	data:[
		'请选择内容',
		'bilibili公司',
		'日升企业',
		'腾讯企业',
		'鹅厂',
		'777电子竞技俱乐部',
		'枣子哥电子企业',
		'666大公司',
		'无敌风火轮电子商务有限公司',
		'国科电子培训有限公司',
		'养猪场',
		'4396电子有限公司',
	],
	msg: '提示'
}

const collectionContent ={
	status: 1, //1成功,0失败提示返回值
	data:[{
		routeId: 1,
		scenicName: '武夷山 | 全方位详尽三日',
		title: '南平市武夷山风景名胜区',
		cost: 320,
		day:3,
		date: '2019-11-12',
		like: 119,
		comment: 15,
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/wuyishan.jpg',
	},
	{
		routeId: 2,
		scenicName: '武夷山 | 全方位详尽三日',
		title: '南平市武夷山风景名胜区',
		cost: 320,
		day:3,
		date: '2019-11-13',
		like: 119,
		comment: 15,
		image: '../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/wuyishan.jpg',
	}],
	msg: '提示'
}

const collectionCommodity ={
	status: 1, //1成功,0失败提示返回值
	data:[{
		routeId: 1,
		scenicName: '南平正宗熏鹅（武夷山店)',
		label:['老字号','南平特色','物美价廉'],
		score:4.5,
		cost:140,
		comment: 15,
		image: '../../../static/LYFW/ouristRoute/SceneryTable/collection/shangping.png',
	},
	{
		routeId: 2,
		scenicName: '南平正宗熏鹅（武夷山店)',
		label:['老字号','南平特色','物美价廉'],
		score:3.5,
		cost:140,
		comment: 15,
		image: '../../../static/LYFW/ouristRoute/SceneryTable/collection/shangping.png',
	}],
	msg: '提示'
}

const record ={
	status: 1, //1成功,0失败提示返回值
	data:[{
		routeId: 1,
		day:1,
		date:'2020-11-16',
		scenicName: '南平正宗熏鹅（武夷山店)',
		address:'南平 · 武夷山',
		icon:'../../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png',
	},
	{
		routeId: 2,
		day:2,
		date:'2020-11-17',
		scenicName: '武夷山 | 全方位详尽三日路攻略',
		address:'南平 · 武夷山',
		icon:'../../../static/LYFW/ouristRoute/SceneryTable/history/ICON2.png',
	},
	{
		routeId: 3,
		day:2,
		date:'2020-11-17',
		scenicName: '南平正宗熏鹅（武夷山店)',
		address:'南平 · 武夷山',
		icon:'../../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png',
	},
	{
		routeId: 4,
		day:3,
		date:'2020-11-18',
		scenicName: '南平正宗熏鹅（武夷山店)',
		address:'南平 · 武夷山',
		icon:'../../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png',
	},
	{
		routeId: 5,
		day:3,
		date:'2020-11-18',
		scenicName: '南平正宗熏鹅（武夷山店)',
		address:'南平 · 武夷山',
		icon:'../../../static/LYFW/ouristRoute/SceneryTable/history/ICON1.png',
	}],
	msg: '提示'
}

const travel={
	status: 1, //1成功,0失败提示返回值
	data:{
		scenicName: '武夷山|全方位详尽三日路线全方位详尽三日路线',
		date:'2019-11-05',
		time:'13:20',
		name:'南平中宝旅游',
		number:'15625566555',
		address: '南平',
		cost:2500,
		image:'../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/touxiang1.png',
		ladel:'官方',
		
	},
	msg: '提示'
}

const arrange={
	status: 1, //1成功,0失败提示返回值
	data:[{
		day:1,
		title:'泉州 — 南平 — 武夷山二日游',
		hotel:'南平武夷山香格里拉酒店',
		dinnerTime:'晚',
		content:[{
			contentTitle:'集合：泉州湖美大酒店  不在二环的自发前往，不接送，不迟到 ',
			contentTIme:'08:00 — 09:00',
			contentText:'泉州市区二环内酒店接，不在二环的自行前往集合。 集合时间：8：00 集合地点： 泉州火车站旁边昆明汽车客运站1号门（湖美酒店对面）集合泉州二环内可免费接，正常接送时间为6：00——7：40之间。如您入住稍远，可能接送安排会提前。具体时间以工作人员提前一天联系通知为准。</div>',
		},
		{
			contentTitle:'交通工具：大型高一大巴前往武夷山风景区',
			contentTIme:'09:00 — 12:00',
			contentText:'泉州市区二环内酒店接，不在二环的自行前往集合。 集合时间：8：00 集合地点： 泉州火车站旁边昆明汽车客运站1号门（三元宾馆对面）集合泉州二环内可免费接，正常接送时间为6：00——7：40之间。如您入住稍远，可能接送安排会提前。  <p></p><image src="../../../static/LYFW/ouristRoute/SceneryTable/TouristRoute/mangdangshan.jpg"/>',
		}]
	}],
	msg: '提示'
}

const description={
	status: 1, //1成功,0失败提示返回值
	data:[{
		title:'费用包含',
		way:'1、住宿：全程包含2晚住宿（两人入住标准间一间）。 <p></p> 2、用餐：全程包含9早餐13正餐，正餐包含特色餐：南平特色菜、藏族风味餐+风情表演、瑞丽勐卯宴。 <p></p> 3、门票：和顺古镇，其它行程内景点根据时间及个人身体状态、宗教信仰等因素选择自费项目。 <p></p> 4、领队及领航车服务：领队及领航车服务。 <p></p> 5、保险：旅行社组合险、旅游意外险。',
	},
	{
		title:'费用不含',
		way:'1、各地抵达泉州往返大交通费用。 <p></p> 2、单房差费用。 <p></p> 3、用车：车辆建议选择为科迪亚克或四驱越野车（如需其它车型选择，请另行补足车型差额）。 <p></p> 4、行程使用车辆的租车费、油费、过路费、停车费等车辆相关费用。 <p></p> 5、费用包含中未提及的其他个人消费。 <p></p> 6、因交通延阻、罢工、天气、飞机、机器故障、航班取消或更改时间等不可抗力原因所导致的额外费用。 <p></p> 7、酒店内洗衣、理发、电话、饮品等个人消费。',
	}],
	msg: '提示'
}

const reserve={
	status: 1, //1成功,0失败提示返回值
	data:[{
		id:1,
		title:'退款规则:按规则退',
		way:'<img src="../../../static/LYFW/ouristRoute/SceneryTable/travelArrange/fuwenben.png" style="width:100%;height:auto;" /image> <p></p> 补充说明：实际退款金额，请以旅行社客服确认为准。',
	},
	{
		id:2,
		title:'温馨提示',
		way:'1、机票：本产品不含大交通费用，如需大交通费用请联系我们的客服。 <p></p> 2、儿童门票预算为全票，门票减免根据各景点儿童票政策执行，具体减免费用在行程结束时进行退款。',
	},
	{
		id:3,
		title:'重要提醒',
		way:'1、尊重并保护用户隐私，用户信息只会用于协助用户预订旅游商品； <p></p> 2、预订旅游产品，需要在下单后支付时限内支付全款，超出时限订单将会取消；再次购买需重新下单，购买成功会收到确认邮件及短信； <p></p> 3、报名旅游线路时，请确保身体状况良好适合参加线路行程；如身体不适，请务必将自身健康状况如实告知； <p></p> 4、请尊重地方民风民俗、行程中文明旅游，关注景区相关说明，遵守当地法律法规； <p></p> 5、因旅行社营业时间限制18:00后付款的订单无法在二次确认时间内回复，我们会在次日及时为您处理。如有急需处理的订单，请您通过电话咨询旅行社； <p></p> 6、您所预订的商品如果包含高危项目（如漂流、攀岩、潜水等），请在报名前根据自身条件进行选择，并充分阅读产品页面中相关重要提示事项； <p></p> 7、酒店内洗衣、理发、电话、饮品等个人消费。',
	}],
	msg: '提示'
}


const groupTour={
	status: 1, //1成功,0失败提示返回值
	data:[{
		groupId:1,
		groupTItle:'北京+天津+河北',
		content:[{
			contentId:1,
			contentImage:'../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
			contentTitle:'【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
			contentLabel:'5A风景 | 周边游 | 历史古城 ',
			cost:1800,
			sell:55,
			comment:8,
		},
		{
			contentId:2,
			contentImage:'../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
			contentTitle:'【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
			contentLabel:'5A风景 | 周边游 | 历史古城 ',
			cost:1800,
			sell:55,
			comment:8,
		},
		{
			contentId:3,
			contentImage:'../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
			contentTitle:'【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
			contentLabel:'5A风景 | 周边游 | 历史古城 ',
			cost:1800,
			sell:55,
			comment:8,
		},
		{
			contentId:4,
			contentImage:'../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
			contentTitle:'【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
			contentLabel:'5A风景 | 周边游 | 历史古城 ',
			cost:1800,
			sell:55,
			comment:8,
		}]
	},
	{
		groupId:2,
		groupTItle:'北京+天津+河北',
		content:[{
			contentId:1,
			contentImage:'../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
			contentTitle:'【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
			contentLabel:'5A风景 | 周边游 | 历史古城 ',
			cost:1800,
			sell:55,
			comment:8,
		},
		{
			contentId:2,
			contentImage:'../../../static/LYFW/ouristRoute/SceneryTable/lunBo/banner1.jpg',
			contentTitle:'【立即下单立减300】北京天津河北五日游北京天津河北五日游北京天津河北五日游北京天津河北五日游',
			contentLabel:'5A风景 | 周边游 | 历史古城 ',
			cost:1800,
			sell:55,
			comment:8,
		}]
	}],
	msg: '提示'
}

// 接口声明区
export default {
	routeComment2,
	userInfo,
	sixPalaceList,
	scenicList,
	scSpotDetails,
	lunBo,
	touristRoute,
	routeComment,
	userRoute,
	reply,
	touristRoute2,
	touristRoute3,
	complaint,
	collectionContent,
	collectionCommodity,
	record,
	travel,
	arrange,
	description,
	reserve,
	groupTour,
}
