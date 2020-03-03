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

/* 六宫格-景区列表 */
const sixPalaceList = [
		{
			scenicId: 0,
			name : '武夷山',
			englishName : 'Wuyi Mount',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
		},
		{
			scenicId: 1,
			name : '溪源峡谷',
			englishName : 'Creek Gorge',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/xiyuanxiagu.jpg',
		},
		{
			scenicId: 2,
			name : '芒荡山',
			englishName : 'Mount Mandang',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/mangdangshan.jpg',
		},
		{
			scenicId: 3,
			name : '和平古镇',
			englishName : 'Peace Towns',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/hepingguzhen.jpg',
		},
		{
			scenicId: 4,
			name : '天成奇侠',
			englishName : 'Natural Gorge',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/tianchengqixia.jpg',
		},
		{
			scenicId: 5,
			name : '青龙大瀑布',
			englishName : 'Qinglong Waterfa',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/qinglongdapubu.jpg',
		},
		{
			scenicId: 6,
			name : '茶博园',
			englishName : 'Tea Expo',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/chaboyuan.jpg',
		}
] 

/* 景区列表 */ 
const scenicList = [
		{
			scenicId: 0,
			scenicName: '南平武夷山',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/wuyishan.jpg',
			price : 320,
			sales : 20188,
		},
		{
			scenicId: 1,
			scenicName: '南平溪源峡谷',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/xiyuanxiagu.jpg',
			price : 60,
			sales : 18687,
		},
		{
			scenicId: 2,
			scenicName: '南平芒荡山',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/mangdangshan.jpg',
			price : 10,
			sales : 19245,
		},
		{
			scenicId: 3,
			scenicName: '邵武和平古镇',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/hepingguzhen.jpg',
			price : 0,
			sales : 12815,
		},
		{
			scenicId: 4,
			scenicName: '邵武天成奇峡',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/tianchengqixia.jpg',
			price : 130,
			sales : 21048,
		},
		{
			scenicId: 5,
			scenicName: '武夷山青龙大瀑布',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/qinglongdapubu.jpg',
			price : 60,
			sales : 23074,
			
		},
		{
			scenicId: 6,
			scenicName: '中华武夷茶博园',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/chaboyuan.jpg',
			price : 218,
			sales : 23078,
			
		},
		{
			scenicId: 7,
			scenicName: '建阳卧龙湾花花世界',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/scenicSpotTickets/ticketsList/huahuashijie.jpg',
			price : 10,
			sales : 110871,
		}
] 

//景区详情 - 武夷山
const scSpotDetails = {
	scenicId: 0,
	image :[{
		src : '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner1.jpg'
	},{
		src : '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner2.jpg'
	},{
		src : '../../../static/LYFW/scenicSpotTickets/ticketsDetails/banner3.jpg'
	}],
	imageNumber : 3,
	scenicName : '南平武夷山',
	openup : '09:00 - 18:00',
	scenicContent : '武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。武夷山是三教名山。自秦汉以来，武夷山就为羽流禅家栖息之地，留下了不少宫观、道院和庵堂故址。武夷山还曾是儒家学者倡道讲学之地。武夷山自然保护区，是地球同纬度地区保护最好、物种最丰富的生态系统，拥有2527种植物物种，近5000种野生动物。在中生代晚期，武夷山发生了强烈的火山喷发活动，继之为大规模的花岗岩侵入，已发现本区有丰富的火山机构，为典型的亚洲东部环太平洋带的构造特征。白垩纪晚期的红色砂砾岩是形成丹霞地貌的主体。中生代的地壳运动奠定了武夷山地貌的基本骨架。告性对武夷山地貌发育也很明显，西部海拔1500m以上的山峰，基本上由坚硬的凝灰熔岩和流纹岩等构成，东部红色砂页岩地区则往往发育有较宽的谷地和盆地。所以武夷山丰富的地貌类型是地质构造、流水侵蚀、风化剥蚀、重力崩塌等综合作用的结果。',
	comment : '一码通 | 可订明日票 | 非即时退',
	state : true,  //false为免费 true为收费
	ticket : [{
		quantityStatus : true, //false为数量无限 true为数量有限
		quantity :50, //门票数量
		title : '【成人】南平武夷山三日游路线 （观光车+成人门票+竹筏票）',
		comment : '一码通 | 可订明日票 | 非即时退',
		price : 320,
		
	},{
		quantityStatus : false, //false为数量无限 true为数量有限
		quantity :50, //门票数量
		title : '【儿童】南平武夷山三日游路线 （观光车+儿童门票+竹筏票）',
		comment : '一码通 | 可订明日票 | 非即时退',
		price : 160
		}]
}



// 接口声明区
export default {
	userInfo,
	sixPalaceList,
	scenicList,
	scSpotDetails,
}