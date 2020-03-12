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
		portrait: '/static/user/touxiang.jpg',  //头像
		bg:'../../../static/LYFW/peripheralTourism/user/touxiang.jpg'			//背景图
	},
	msg: '提示'		
}

/* 六宫格-景区列表 */
const sixPalaceList = [
		{
			scenicId: 0,
			name : '武夷山',
			englishName : 'Wuyi Mount',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/wuyishan.jpg',
		},
		{
			scenicId: 1,
			name : '溪源峡谷',
			englishName : 'Creek Gorge',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/xiyuanxiagu.jpg',
		},
		{
			scenicId: 2,
			name : '芒荡山',
			englishName : 'Mount Mandang',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/mangdangshan.jpg',
		},
		{
			scenicId: 3,
			name : '和平古镇',
			englishName : 'Peace Towns',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/hepingguzhen.jpg',
		},
		{
			scenicId: 4,
			name : '天成奇侠',
			englishName : 'Natural Gorge',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/tianchengqixia.jpg',
		},
		{
			scenicId: 5,
			name : '青龙大瀑布',
			englishName : 'Qinglong Waterfa',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/qinglongdapubu.jpg',
		},
		{
			scenicId: 6,
			name : '茶博园',
			englishName : 'Tea Expo',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/chaboyuan.jpg',
		}
] 

/* 景区列表 */ 
const scenicList = [
		{
			scenicId: 0,
			scenicName: '南平武夷山',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/wuyishan.jpg',
			price : 320,
			sales : 20188,
		},
		{
			scenicId: 1,
			scenicName: '南平溪源峡谷',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/xiyuanxiagu.jpg',
			price : 60,
			sales : 18687,
		},
		{
			scenicId: 2,
			scenicName: '南平芒荡山',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/mangdangshan.jpg',
			price : 10,
			sales : 19245,
		},
		{
			scenicId: 3,
			scenicName: '邵武和平古镇',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/hepingguzhen.jpg',
			price : 0,
			sales : 12815,
		},
		{
			scenicId: 4,
			scenicName: '邵武天成奇峡',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/tianchengqixia.jpg',
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
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/chaboyuan.jpg',
			price : 218,
			sales : 23078,
			
		},
		{
			scenicId: 7,
			scenicName: '建阳卧龙湾花花世界',
			comment : '一码通 | 可订明日票 | 非即时退',
			image: '../../../static/LYFW/peripheralTourism/peripheralTourism/peripheralTourism/huahuashijie.jpg',
			price : 10,
			sales : 110871,
		}
] 
// 周边旅游模块_林奇隆
// 六宫格—周边旅游
const sixPeripheral =[
	    {
	       peripheralId: 0,
		   name : '武夷山',
		   englishName : 'Wuyi Mount',
		   image: '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc1.png',
        },
		{
		   peripheralId: 0,
		   name : '溪源峡谷',
		   englishName : 'Creek Gorge',
		   image: '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc2.png',
		},
		{
		   peripheralId: 0,
		   name : '和平古镇',
		   englishName : 'Peace Towns',
		   image: '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc3.png',
		},
		{
		   peripheralId: 0,
		   name : '天成奇峡',
		   englishName : 'Natural Gorge',
		   image: '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc4.png',
		},
		{
		   peripheralId: 0,
		   name : '青龙大瀑布',
		   englishName : 'Qinglong Waterfa',
		   image: '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc5.png',
		},
		{
		   peripheralId: 0,
		   name : '自游小镇',
		   englishName : 'Self Travel Town',
		   image: '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc6.png',
		},
]


/* 推荐景点-推荐路线-路线 */
const scenicSpot = [{
			id: 1,
			scennicName : '武夷山风景名胜区三日游',
			scName : '武夷山',
			scEnglish : 'Wuyi Mount',
			jungle : '自然风光',
			cost : 1200,
			days : 3,
			related : 108,
			attribute : '旅游度假区',
			image : '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc1.png',
			date : '2019-11-05',
			like : 1088,
			comment : 92,
		},{
			id: 2,
			scennicName : '溪源峡谷风景名胜区',
			scName : '溪源峡谷',
			scEnglish : 'Creek Gorge',
			jungle : '自然风光',
			cost : 600,
			days : 2,
			related : 89,
			attribute : '旅游度假区',
			image : '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc2.png',
			date : '2019-11-06',
			like : 682,
			comment : 78,
		},{
			id: 3,
			scennicName : '芒荡山风景名胜区',
			scName : '芒荡山',
			scEnglish : 'Mount Mandang',
			jungle : '自然风光',
			cost : 200,
			days : 1,
			related : 68,
			attribute : '旅游度假区',
			image : '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc3.png',
			date : '2019-11-07',
			like : 308,
			comment : 66,
		},
		{
			id: 4,
			scennicName : '和平古镇一日游',
			scName : '和平古镇',
			scEnglish : 'Peace Towns',
			jungle : '自然风光',
			cost : 180,
			days : 1,
			related : 64,
			attribute : '旅游度假区',
			image : '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc3.png',
			date : '2019-11-08',
			like : 873,
			comment : 91,
		},{
			id: 5,
			scennicName : '天成奇侠一日游',
			scName : '天成奇侠',
			scEnglish : 'Natural Gorge',
			jungle : '自然风光',
			cost : 150,
			days : 1,
			related : 82,
			attribute : '旅游度假区',
			image : '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc4.png',
			date : '2019-11-09',
			like : 546,
			comment : 83,
		},{
			id: 6,
			scennicName : '青龙大瀑布一日游',
			scName : '青龙大瀑布',
			scEnglish : 'Qinglong Waterfa',
			jungle : '自然风光',
			cost : 120,
			days : 1,
			related : 63,
			attribute : '旅游度假区',
			image : '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc5.png',
			date : '2019-11-10',
			like : 1251,
			comment : 35,
		},{
			id: 7,
			scennicName : '中华武夷山茶博园一日游',
			scName : '茶博园',
			scEnglish : 'Tea Expo',
			jungle : '自然风光',
			cost : 125,
			days : 1,
			related : 57,
			attribute : '旅游度假区',
			image : '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc6.png',
			date : '2019-11-11',
			like : 1098,
			comment : 51,
		},{
			id: 8,
			scennicName : '建阳卧龙湾花花世界一日游',
			scName : '花花世界',
			scEnglish : 'Tearful World',
			jungle : '动植物园',
			cost : 200,
			days : 1,
			related : 35,
			attribute : '旅游度假区',
			image : '../../../static/LYFW/peripheralTourism/peripheralTourism/npjc6.png',
			date : '2019-11-12',
			like : 1205,
			comment : 24,
		}]
		
		const tweets = {
				id: 1,
				unid : 185272186,
				date : '2019-11-05',
				clicks : '2.1',
				portrait: '../../../static/LYFW/peripheralTourism/user/touxiang.png',
				nickname: '李茜茜',
				autograph:'步步寻往迹,有处特依依~',
				address : '南平市',
				image: [{
					title : '武夷山 | 全方位详尽三日',
					src:'../../../static/LYFW/peripheralTourism/travelArticles/banner1.jpg'
				},{
					title : '巴厘岛一日游',
					src:'../../../static/LYFW/peripheralTourism/travelArticles/banner2.jpg'
				},{
					title : '浪漫巴厘岛',
					src:'../../../static/LYFW/peripheralTourism/travelArticles/banner3.jpg'
				}],
				imageNumber:3,
				title: '武夷山 | 全方位详尽三日',
				titlecontent : '武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。武夷山是三教名山。自秦汉以来，武夷山就为羽流禅家栖息之地，留下了不少宫观、道院和庵堂故址。武夷山还曾是儒家学者倡道讲学之地。武夷山自然保护区，是地球同纬度地区保护最好、物种最丰富的生态系统，拥有2527种植物物种，近5000种野生动物。在中生代晚期，武夷山发生了强烈的火山喷发活动，继之为大规模的花岗岩侵入，已发现本区有丰富的火山机构，为典型的亚洲东部环太平洋带的构造特征。白垩纪晚期的红色砂砾岩是形成丹霞地貌的主体。中生代的地壳运动奠定了武夷山地貌的基本骨架。告性对武夷山地貌发育也很明显，西部海拔1500m以上的山峰，基本上由坚硬的凝灰熔岩和流纹岩等构成，东部红色砂页岩地区则往往发育有较宽的谷地和盆地。所以武夷山丰富的地貌类型是地质构造、流水侵蚀、风化剥蚀、重力崩塌等综合作用的结果。',
				collection : 389,
				collection_state : false,
				like : 207,
				like_state : false,
				comment_state : false,
				scenicSpot : [{
						id: 1,
						scennicName : '武夷山风景名胜区三日游',
						jungle : '自然风光',
						cost : 1200,
						days : 3,
						related : 108,
						attribute : '旅游度假区',
						image : '../../../static/LYFW/peripheralTourism/peripheralTourism/wuyishan.jpg',
						date : '2019-11-05',
						like : 207,
						comment : 92,
					},{
						id: 2,
						scennicName : '溪源峡谷风景名胜区',
						scName : '溪源峡谷',
						scEnglish : 'Creek Gorge',
						jungle : '自然风光',
						cost : 600,
						days : 2,
						related : 89,
						attribute : '旅游度假区',
						image : '../../../static/LYFW/peripheralTourism/peripheralTourism/xiyuanxiagu.jpg',
						date : '2019-11-05',
						like : 195,
						comment : 78,
					}]
					}
					
					/* 旅游路线-回复内容 */
					const reply = [{
							unid : 185677868,
							scennicName : '李大刚',
							portrait: '../../../static/LYFW/peripheralTourism/user/t1.jpg',
							content : '小姐姐的笔记写的很好啊！照片也拍的很美，给你点个赞，想来武夷山游玩的朋友们可以加我微信15359031110为您提供游玩攻略、民宿、帐篷预订及门票船票预订等旅游服务。我们整合了山上所有的旅游资源，花2分钟咨询，换一次完美旅行。赶紧动动手指联系我们把！',
							date : '2019-12-16',
							fabulous : 18,
							fabulous_state : false,
						},{
							unid : 185271851,
							scennicName : 'NDNPSOSWANGT',
							portrait: '../../../static/LYFW/peripheralTourism/user/t2.jpg',
							content : '不错,很赞的小姐姐,感谢分享',
							date : '2019-12-16',
							fabulous : 15,
							fabulous_state : true,
						},{
							unid : 153218884,
							scennicName : '小郑哥',
							portrait: '../../../static/LYFW/peripheralTourism/user/t3.jpg',
							content : '专门说武夷山的笔记在哪里？',
							date : '2019-12-16',
							fabulous : 12,
							fabulous_state : false,
						},{
							unid : 415546455,
							scennicName : 'Mickin',
							portrait: '../../../static/LYFW/peripheralTourism/user/t1.jpg',
							content : '小姐姐的笔记写的很好啊',
							date : '2019-12-16',
							fabulous : 8,
							fabulous_state : true,
						},{
							unid : 653235635,
							scennicName : '王老五',
							portrait: '../../../static/LYFW/peripheralTourism/user/t2.jpg',
							content : '不错,很赞的小姐姐,感谢分享',
							date : '2019-12-16',
							fabulous : 5,
							fabulous_state : false,
						},{
							unid : 215851875,
							scennicName : '富士康代工007',
							portrait: '../../../static/LYFW/peripheralTourism/user/t3.jpg',
							content : '小姐姐真好看？Emm?',
							date : '2019-12-16',
							fabulous : 0,
							fabulous_state : false,
						}]
				
// 接口声明区
export default {
	userInfo,
	sixPalaceList,
	scenicList,
	sixPeripheral,
	scenicSpot,
	tweets,
	reply,
}