/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		unid : 183252546,
		mobile: 18888888888,
		nickname: '茜茜爱玩',
		gender:1,
		birthday:'1994-01-19',
		permanent:'福建省南平市武夷山市',
		autograph:'喜欢可以点关注哦~',
		portrait: '/static/user/touxiang2.jpg',
		bg:'/static/index/banner2.jpg'
	},
	msg: '提示'
}
/* 旅游路线-景区推文 */
const tweets = {
		id: 1,
		unid : 185272186,
		date : '2019-11-05',
		clicks : '2.1',
		portrait: '/static/user/touxiang.png',
		nickname: '李茜茜',
		autograph:'步步寻往迹,有处特依依~',
		address : '南平市',
		image: [{
			title : '武夷山 | 全方位详尽三日',
			src:'../../static/index/banner1.jpg'
		},{
			title : '巴厘岛一日游',
			src:'../../static/index/banner2.jpg'
		},{
			title : '浪漫巴厘岛',
			src:'../../static/index/banner3.jpg'
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
				image : '../../static/scenicSpot/wuyishan.jpg',
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
				image : '../../static/scenicSpot/xiyuanxiagu.jpg',
				date : '2019-11-05',
				like : 195,
				comment : 78,
			}]
			}
	
/* 旅游路线-景点内容/热门路线 */
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
			image : '../../static/scenicSpot/wuyishan.jpg',
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
			image : '../../static/scenicSpot/xiyuanxiagu.jpg',
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
			image : '../../static/scenicSpot/mangdangshan.jpg',
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
			image : '../../static/scenicSpot/hepingguzhen.jpg',
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
			image : '../../static/scenicSpot/tianchengqixia.jpg',
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
			image : '../../static/scenicSpot/qinglongdapubu.jpg',
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
			image : '../../static/scenicSpot/chaboyuan.jpg',
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
			image : '../../static/scenicSpot/huahuashijie.jpg',
			date : '2019-11-12',
			like : 1205,
			comment : 24,
		}]


/* 旅游路线-回复内容 */
const reply = [{
		unid : 185677868,
		scennicName : '李大刚',
		portrait: '/static/userhead/t1.jpg',
		content : '小姐姐的笔记写的很好啊！照片也拍的很美，给你点个赞，想来武夷山游玩的朋友们可以加我微信15359031110为您提供游玩攻略、民宿、帐篷预订及门票船票预订等旅游服务。我们整合了山上所有的旅游资源，花2分钟咨询，换一次完美旅行。赶紧动动手指联系我们把！',
		date : '2019-12-16',
		fabulous : 18,
		fabulous_state : false,
	},{
		unid : 185271851,
		scennicName : 'NDNPSOSWANGT',
		portrait: '/static/userhead/t2.jpg',
		content : '不错,很赞的小姐姐,感谢分享',
		date : '2019-12-16',
		fabulous : 15,
		fabulous_state : true,
	},{
		unid : 153218884,
		scennicName : '小郑哥',
		portrait: '/static/userhead/t3.jpg',
		content : '专门说武夷山的笔记在哪里？',
		date : '2019-12-16',
		fabulous : 12,
		fabulous_state : false,
	},{
		unid : 415546455,
		scennicName : 'Mickin',
		portrait: '/static/userhead/t1.jpg',
		content : '小姐姐的笔记写的很好啊',
		date : '2019-12-16',
		fabulous : 8,
		fabulous_state : true,
	},{
		unid : 653235635,
		scennicName : '王老五',
		portrait: '/static/userhead/t2.jpg',
		content : '不错,很赞的小姐姐,感谢分享',
		date : '2019-12-16',
		fabulous : 5,
		fabulous_state : false,
	},{
		unid : 215851875,
		scennicName : '富士康代工007',
		portrait: '/static/userhead/t3.jpg',
		content : '小姐姐真好看？Emm?',
		date : '2019-12-16',
		fabulous : 0,
		fabulous_state : false,
	}]
	
/* 景区门票-景区推文 */
const tweetsTickets = [{
		id: 1,
		scName : '武夷山',
		scEnglish : 'Wuyi Mount',
		openup : '09:00 - 18:00',
		image: [{
			src:'../../static/index/banner1.jpg'
		},{
			src:'../../static/index/banner2.jpg'
		},{
			src:'../../static/index/banner3.jpg'
		}],
		imageNumber:3,
		title: '南平武夷山',
		titlecontent : '武夷山，武夷山位于江西与福建西北部两省交界处，武夷山脉北段东南麓总面积999.75平方公里，是中国著名的风景旅游区和避暑胜地。属典型的丹霞地貌，是首批国家级重点风景名胜区之一。武夷山是三教名山。自秦汉以来，武夷山就为羽流禅家栖息之地，留下了不少宫观、道院和庵堂故址。武夷山还曾是儒家学者倡道讲学之地。武夷山自然保护区，是地球同纬度地区保护最好、物种最丰富的生态系统，拥有2527种植物物种，近5000种野生动物。在中生代晚期，武夷山发生了强烈的火山喷发活动，继之为大规模的花岗岩侵入，已发现本区有丰富的火山机构，为典型的亚洲东部环太平洋带的构造特征。白垩纪晚期的红色砂砾岩是形成丹霞地貌的主体。中生代的地壳运动奠定了武夷山地貌的基本骨架。告性对武夷山地貌发育也很明显，西部海拔1500m以上的山峰，基本上由坚硬的凝灰熔岩和流纹岩等构成，东部红色砂页岩地区则往往发育有较宽的谷地和盆地。所以武夷山丰富的地貌类型是地质构造、流水侵蚀、风化剥蚀、重力崩塌等综合作用的结果。',
		comment : '一码通 | 可订明日票 | 非即时退',
		priceState : true, //false为免费 true为收费
		price : 320,
		sales : 110871,
		ticket : [{
			state : true,  //false为免费 true为收费
			quantityStatus : false, //false为数量无限 true为数量有限
			quantity :50, //门票数量
			title : '【成人】南平武夷山三日游路线 （观光车+成人门票+竹筏票）',
			comment : '一码通 | 可订明日票 | 非即时退',
			price : 320,
			
		},{
			state : true,  //false为免费 true为收费
			quantityStatus : false, //false为数量无限 true为数量有限
			quantity :50, //门票数量
			title : '【儿童】南平武夷山三日游路线 （观光车+儿童门票+竹筏票）',
			comment : '一码通 | 可订明日票 | 非即时退',
			price : 160
			}]
		},
		{
			id: 2,
			scName : '溪源峡谷',
			scEnglish : 'Creek Gorge',
			openup : '09:00 - 18:00',
			image: [{
				src:'../../static/scenicSpot/xiyuanxiagu.jpg'
			},{
				src:'../../static/index/banner2.jpg'
			},{
				src:'../../static/index/banner3.jpg'
			}],
			imageNumber:3,
			title: '南平溪源峡谷',
			titlecontent : '南平溪源峡谷素有“溪山第一”、瀑布大观园、“桃源仙境”、“十里峡谷、十里画廊”的美誉，是茫荡山自然保护区的核心景区。峡谷内风光漪丽、景色秀美，集清、幽、灵、秀、神、奇、险、野于一体，荟萃山川精华于峡谷之中，两岸石壁对立，怪石嶙峋；峰回路转，山曲水迂；千屏万嶂，绵延起伏；树木森郁，古藤缠绕，是国内休闲度假、生态旅游、探险揽胜、科学考察的好去处。',
			comment : '一码通 | 可订明日票 | 非即时退',
			priceState : true, //false为免费 true为收费
			price : 60,
			sales : 18687,
			ticket : [{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】南平溪源峡谷',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 60
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【儿童】南平溪源峡谷',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 30
			}]
		},
		{
			id: 3,
			scName : '芒荡山',
			scEnglish : 'Mount Mandang',
			openup : '07:30 - 17:00',
			image: [{
				src:'../../static/scenicSpot/mangdangshan.jpg'
			},{
				src:'../../static/index/banner2.jpg'
			},{
				src:'../../static/index/banner3.jpg'
			}],
			imageNumber:3,
			title: '南平芒荡山',
			titlecontent : '茫荡山被称为“福建的庐山”，是避暑旅游、森林疗养的绝好处所。位于南平市延平区城西北10多公里，面积117平方公里，最高峰海拔1363米，属武夷山脉的支脉。茫荡山以山幽林深、泉清雾重称著，素有“十里清溪、百仞壁立、千层台阶、万木深蔚”之称。茫荡山东部有一条用石块铺砌的闽赣古道，俗称“三千八百坎”。古道全长约5公里，沿途奇石峥嵘，花木繁盛，风卷松涛，触目皆景，是开展森林浴旅游的好去处。',
			comment : '一码通 | 可订明日票 | 非即时退',
			priceState : true, //false为免费 true为收费
			price : 10,
			sales : 29245,
			ticket : [{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】南平芒荡山(三千八百坎)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 10
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【儿童】南平芒荡山(三千八百坎)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 5
			}]
		},
		{
			id: 4,
			scName : '和平古镇',
			scEnglish : 'Peace Towns',
			openup : '全天',
			image: [{
				src:'../../static/scenicSpot/hepingguzhen.jpg'
			},{
				src:'../../static/index/banner2.jpg'
			},{
				src:'../../static/index/banner3.jpg'
			}],
			imageNumber:3,
			title: '邵武和平古镇',
			titlecontent : '福建邵武和平古镇是一处全国罕见的城堡式大村镇，其众多古建筑是中国迄今保留最具特色的古民居建筑群之一，而镇内的古街更是堪称“福建第一街”。这里有近200间青砖琉瓦、雕梁画栋、气派非凡的明清时代豪华民宅，这里有长达半公里的青石板土街和数10条卵石铺砌的古巷道，这里有20余处人类生活遗址。人才辈出的书院更是培育出100多位进士，令整个古镇享“进士之乡”的美誉。和平古镇的奇特民俗文化，也吸引着游客到访探寻。',
			comment : '一码通 | 可订明日票 | 非即时退',
			priceState : false, //false为免费 true为收费
			price : 0,
			sales : 12815,
			ticket : [{
				state : false,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
			},
			{
				state : false,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
			}]
		},
		{
			id: 5,
			scName : '天成奇侠',
			scEnglish : 'Natural Gorge',
			openup : '08:00 - 17:30',
			image: [{
				src:'../../static/scenicSpot/tianchengqixia.jpg'
			},{
				src:'../../static/index/banner2.jpg'
			},{
				src:'../../static/index/banner3.jpg'
			}],
			imageNumber:3,
			title: '邵武天成奇峡',
			titlecontent : '邵武天成奇峡景区与武夷山、大金湖一脉相承，由距今1亿年前至7000年前的剧烈地壳运动造就而成。景区内古树参天，奇峰林立，山藏丹霞灵宗，水融天地灵气，既有气势磅礴的峡谷山峦，又有小巧玲珑，犹如秀致盆景的景点，隐隐透着诱人的韵致。',
			comment : '一码通 | 可订明日票 | 非即时退',
			priceState : true, //false为免费 true为收费
			price : 130,
			sales : 21048,
			ticket : [{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】邵武天成奇峡(陆地游/锦溪漂流)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 130
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】邵武天成奇峡(水陆联票)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 210
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【儿童】邵武天成奇峡(陆地游/锦溪漂流)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 65
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【儿童】邵武天成奇峡(水陆联票)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 105
			}]
		},
		{
			id: 6,
			scName : '青龙大瀑布',
			scEnglish : 'Qinglong Waterfa',
			openup : '07:30 - 17:00',
			image: [{
				src:'../../static/scenicSpot/qinglongdapubu.jpg'
			},{
				src:'../../static/index/banner2.jpg'
			},{
				src:'../../static/index/banner3.jpg'
			}],
			imageNumber:3,
			title: '武夷山青龙大瀑布',
			titlecontent : '青龙大瀑布是目前福建省发现的最大瀑布，景区游览道全长2300米，峡谷内地势险峻，森林群落近乎原始，空气中富含负氧离子含量，是名副其实的天然氧吧，也是唯一的“人与自然”欧洲人体艺术摄影创作基地。',
			comment : '一码通 | 可订明日票 | 非即时退',
			priceState : true, //false为免费 true为收费
			price : 60,
			sales : 23074,
			ticket : [{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】武夷山青龙大瀑布(大瀑布景区)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 60
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】武夷山青龙大瀑布(桐木溪生态漂流)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 100
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【儿童】武夷山青龙大瀑布(大瀑布景区)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 30
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【儿童】武夷山青龙大瀑布(桐木溪生态漂流)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 50
			}]
		},
		{
			id: 8,
			scName : '茶博园',
			scEnglish : 'Tea Expo',
			openup : '全天',
			image: [{
				src:'../../static/scenicSpot/chaboyuan.jpg'
			},{
				src:'../../static/index/banner2.jpg'
			},{
				src:'../../static/index/banner3.jpg'
			}],
			imageNumber:3,
			title: '中华武夷茶博园',
			titlecontent : '中华武夷茶博园是一座融于山水之中的茶文化大观园，位于武夷山大王峰对面，总体分为景观园区、地下广场、山水实景演出观赏区、茶博馆和游人服务中心五个部分。茶博园面积约为7.8万平方米，以“浓缩武夷茶史，展示岩韵风姿”为设计主题，通过历代名人的记叙、历史画面的再现、茶艺的互动表演，集中展示了武夷茶悠久的历史、神奇的传说、精深的工艺。',
			comment : '一码通 | 可订明日票 | 非即时退',
			priceState : true, //false为免费 true为收费
			price : 218,
			sales : 23078,
			ticket : [{
				state : true,  //false为免费 true为收费
				quantityStatus : true, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】中华武夷茶博园(印象.大红袍-普通席区)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 218
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : true, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】中华武夷茶博园(印象.大红袍-贵宾席区)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 298
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : true, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】中华武夷茶博园(印象.大红袍-尊宾席区)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 688
			}]
		},
		{
			id: 8,
			scName : '花花世界',
			scEnglish : 'Tearful World',
			openup : '8:00-17:30',
			image: [{
				src:'../../static/scenicSpot/huahuashijie.jpg'
			},{
				src:'../../static/index/banner2.jpg'
			},{
				src:'../../static/index/banner3.jpg'
			}],
			imageNumber:3,
			title: '建阳卧龙湾花花世界',
			titlecontent : '建阳卧龙湾武夷花花世界以“花”为主题，是一处集花卉景观观赏、农事休闲体验、科普、养生、购物为一体的综合性旅游景区，也是福建首家以花卉主题为核心，以童话故事情景体验为卖点的旅游景区。景区将花元素与建阳悠久文化有机融合，形成一个优美的意境，带给人们大自然的无穷乐趣。',
			comment : '一码通 | 可订明日票 | 非即时退',
			priceState : true, //false为免费 true为收费
			price : 10,
			sales : 31221,
			ticket : [{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【成人】建阳卧龙湾花花世界(鑫开心农场)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 10
			},
			{
				state : true,  //false为免费 true为收费
				quantityStatus : false, //false为数量无限 true为数量有限
				quantity :50, //门票数量
				title : '【儿童】建阳卧龙湾花花世界(鑫开心农场)',
				comment : '一码通 | 可订明日票 | 非即时退',
				price : 5
			}]
		}
	]
	

	
/* 首页-轮播图 */
const carouselList = [{
		src: "../../static/index/banner3.jpg",
		background: "#149bf0",
	},
	{
		src: "../../static/index/banner2.jpg",
		background: "#4877c9",
	},
	{
		src: "../../static/index/banner1.jpg",
		background: "#69b4e6",
	}
]


/* 购票须知 */
const  ticketNotice = {
	title:'预订',
	content:"",
}



/* 商品列表 */
const goodsList = [{
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
		image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 61,
	},
	{
		image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "潘歌针织连衣裙",
		price: 78,
		sales: 16,
	},
	{
		image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg",
		image2: "http://m.360buyimg.com/n12/jfs/t247/42/1078640382/162559/3628a0b/53f5ad09N0dd79894.jpg%21q70.jpg",
		image3: "http://ikids.61kids.com.cn/upload/2018-12-29/1546070626796114.jpg",
		title: "巧谷2019春夏季新品新款女装",
		price: 108.8,
		sales: 5,
	}, {
		image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=756705744,3505936868&fm=11&gp=0.jpg",
		image2: "http://images.jaadee.com/images/201702/goods_img/30150_d85aed83521.jpg",
		image3: "http://img13.360buyimg.com/popWaterMark/jfs/t865/120/206320620/138889/dcc94caa/550acedcN613e2a9d.jpg",
		title: "私萱连衣裙",
		price: 265,
		sales: 88,
	}, {
		image: "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
		image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
		title: "娇诗茹 ulzzang原宿风学生潮韩版春夏短",
		price: 422,
		sales: 137,
	}, {
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
		image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 95,
	},
]

/* 购物车 */
const cartList = [{
		id: 1,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
		attr_val: '春装款 L',
		stock: 15,
		title: 'OVBE 长袖风衣',
		price: 278.00,
		number: 1
	},
	{
		id: 3,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 3,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 5
	},
	{
		id: 4,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 5,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 6,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 7,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 8,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 15,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 1
	},
	{
		id: 9,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 10,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 11,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 12,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 13,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552405266625&di=a703f2b2cdb0fe7f3f05f62dd91307ab&imgtype=0&src=http%3A%2F%2Fwww.78.cn%2Fzixun%2Fnews%2Fupload%2F20190214%2F1550114706486250.jpg',
		attr_val: '春装款/m',
		stock: 15,
		title: '女装2019春秋新款',
		price: 420.00,
		number: 1
	}
];
//详情展示页面
const detailData = {
	title: '纯种金毛幼犬活体有血统证书',
	title2: '拆家小能手 你值得拥有',
	favorite: true,
	imgList: [{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
		},
		{
			src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
		},
	],
	episodeList: [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	],
	guessList: [{
			src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
			title: '猫眼指甲油',
			title2: '独树一帜的免照灯猫眼指甲'
		},
		{
			src: 'http://m.china-7.net/uploads/14778449362891.jpg',
			title: '创意屋',
			title2: '创意屋形上下双层高低床'
		},
		{
			src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
			title: 'MissCandy 指甲油',
			title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
			title: 'RMK 2017星空海蓝唇釉',
			title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。'
		}
	],
	evaList: [{
			src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '楼上说的好有道理。'
		}
	]
}
const shareList = [{
		type: 1,
		icon: '/static/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]

const orderList = [{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			}
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		goodsList: [{
			title: '古黛妃 短袖t恤女 春夏装2019新款韩版宽松',
			price: 179.5,
			image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
			number: 1,
			attr: '珊瑚粉 M'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2120460599/O1CN01LBPS4C1GINkwsOTXS_!!2120460599.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i2/1069876356/TB2ocTQG4WYBuNjy1zkXXXGGpXa_!!1069876356.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
			price: 69,
			image: 'https://img.alicdn.com/imgextra/i3/2128794607/TB2gzzoc41YBuNjy1zcXXbNcXXa_!!2128794607.jpg_430x430q90.jpg',
			number: 1,
			attr: '白色-高帮 39'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/3358098495/O1CN01dhYyid2Ccl5MWLDok_!!3358098495.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/3358098495/O1CN01AWsnFA2Ccl5OzvqsL_!!3358098495.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg',
			},
			{
				image: 'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg',
			},
		]
	}

]
const cateList = [{
		id: 1,
		name: '手机数码'
	},
	{
		id: 2,
		name: '礼品鲜花'
	},
	{
		id: 3,
		name: '男装女装'
	},
	{
		id: 4,
		name: '母婴用品'
	},
	{
		id: 5,
		pid: 1,
		name: '手机通讯'
	},
	{
		id: 6,
		pid: 1,
		name: '运营商'
	},
	{
		id: 8,
		pid: 5,
		name: '全面屏手机',
		picture: '/static/temp/cate2.jpg'
	},
	{
		id: 9,
		pid: 5,
		name: '游戏手机',
		picture: '/static/temp/cate3.jpg'
	},
	{
		id: 10,
		pid: 5,
		name: '老人机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 11,
		pid: 5,
		name: '拍照手机',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 12,
		pid: 5,
		name: '女性手机',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 14,
		pid: 6,
		name: '合约机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 15,
		pid: 6,
		name: '选好卡',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 16,
		pid: 6,
		name: '办套餐',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 17,
		pid: 2,
		name: '礼品',
	},
	{
		id: 18,
		pid: 2,
		name: '鲜花',
	},
	{
		id: 19,
		pid: 17,
		name: '公益摆件',
		picture: '/static/temp/cate7.jpg'
	},
	{
		id: 20,
		pid: 17,
		name: '创意礼品',
		picture: '/static/temp/cate8.jpg'
	},
	{
		id: 21,
		pid: 18,
		name: '鲜花',
		picture: '/static/temp/cate9.jpg'
	},
	{
		id: 22,
		pid: 18,
		name: '每周一花',
		picture: '/static/temp/cate10.jpg'
	},
	{
		id: 23,
		pid: 18,
		name: '卡通花束',
		picture: '/static/temp/cate11.jpg'
	},
	{
		id: 24,
		pid: 18,
		name: '永生花',
		picture: '/static/temp/cate12.jpg'
	},
	{
		id: 25,
		pid: 3,
		name: '男装'
	},
	{
		id: 26,
		pid: 3,
		name: '女装'
	},
	{
		id: 27,
		pid: 25,
		name: '男士T恤',
		picture: '/static/temp/cate13.jpg'
	},
	{
		id: 28,
		pid: 25,
		name: '男士外套',
		picture: '/static/temp/cate14.jpg'
	},
	{
		id: 29,
		pid: 26,
		name: '裙装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 30,
		pid: 26,
		name: 'T恤',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 31,
		pid: 26,
		name: '上装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 32,
		pid: 26,
		name: '下装',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 33,
		pid: 4,
		name: '奶粉',
	},
	{
		id: 34,
		pid: 4,
		name: '营养辅食',
	},
	{
		id: 35,
		pid: 4,
		name: '童装',
	},
	{
		id: 39,
		pid: 4,
		name: '喂养用品',
	},
	{
		id: 36,
		pid: 33,
		name: '有机奶粉',
		picture: '/static/temp/cate17.jpg'
	},
	{
		id: 37,
		pid: 34,
		name: '果泥/果汁',
		picture: '/static/temp/cate18.jpg'
	},
	{
		id: 39,
		pid: 34,
		name: '面条/粥',
		picture: '/static/temp/cate20.jpg'
	},
	{
		id: 42,
		pid: 35,
		name: '婴童衣橱',
		picture: '/static/temp/cate19.jpg'
	},
	{
		id: 43,
		pid: 39,
		name: '吸奶器',
		picture: '/static/temp/cate21.jpg'
	},
	{
		id: 44,
		pid: 39,
		name: '儿童餐具',
		picture: '/static/temp/cate22.jpg'
	},
	{
		id: 45,
		pid: 39,
		name: '牙胶安抚',
		picture: '/static/temp/cate23.jpg'
	},
	{
		id: 46,
		pid: 39,
		name: '围兜',
		picture: '/static/temp/cate24.jpg'
	},
]
//景区分类
const cateList2 = [
	//一级分类
	{
		id: 1,
		name: '武夷山市'
	},
	{
		id: 2,
		name: '延平区'
	},
	{
		id: 3,
		name: '顺昌县'
	},
	{
		id: 4,
		name: '浦城县'
	},
	{
		id: 5,
		name: '光泽县'
	},
	{
		id: 6,
		name: '松溪县'
	},
	{
		id: 7,
		name: '政和县'
	},
	{
		id: 8,
		name: '邵武市'
	},
	{
		id: 9,
		name: '建瓯市'
	},
	{
		id: 10,
		name: '建阳区'
	},
	//二级分类
		//武夷山市
	{
		id: 5,
		pid: 1,
		name: '武夷山'
	},
	{
		id: 6,
		pid: 1,
		name: '大安源'
	},
	{
		id: 8,
		pid: 1,
		name: '茶博园',
	},
	{
		id: 9,
		pid: 1,
		name: '自遊小镇',
	},
	{
		id: 10,
		pid: 1,
		name: '香江茗苑',
	},
	{
		id: 11,
		pid: 1,
		name: '青龙大瀑布',
	},
	{
		id: 12,
		pid: 1,
		name: '天上宫',
	},
	{
		id: 14,
		pid: 1,
		name: '武夷精舍',
	},
	{
		id: 15,
		pid: 1,
		name: '武夷源',
	},
	{
		id: 16,
		pid: 1,
		name: '五夫古镇',
	},
	{
		id: 17,
		pid: 1,
		name: '柳永纪念馆',
	},
	{
		id: 18,
		pid: 1,
		name: '列宁公园',
	},
	{
		id: 19,
		pid: 1,
		name: '龙川大峡谷',
	},
	{
		id: 20,
		pid: 1,
		name: '慧苑禅寺',
	},
	{
		id: 21,
		pid: 1,
		name: '山下梅村',
	},
		//延平区
	{
		id: 22,
		pid: 2,
		name: '溪源峡谷',
	},
	{
		id: 23,
		pid: 2,
		name: '三千八百坎',
	},
	{
		id: 24,
		pid: 2,
		name: '杉湖岛度假区',
	},
	{
		id: 25,
		pid: 2,
		name: '九峰山公园',
	},
	{
		id: 26,
		pid: 2,
		name: '峡阳古镇',
	},
	{
		id: 27,
		pid: 2,
		name: '茫荡山',
	},
	{
		id: 28,
		pid: 2,
		name: '明翠阁',
	},
		//顺昌县
	{
		id: 29,
		pid: 3,
		name: '华阳山',
	},
	{
		id: 30,
		pid: 3,
		name: '宝山',
	},
	{
		id: 31,
		pid: 3,
		name: '张墩乡村',
	},
	{
		id: 32,
		pid: 3,
		name: '高老庄摄影基地',
	},
	{
		id: 33,
		pid: 3,
		name: '元坑古镇',
	},
		//浦城县
	{
		id: 34,
		pid: 4,
		name: '中国包酒文化博览园',
	},
		//光泽县
	{
		id: 35,
		pid: 5,
		name: '乌君山',
	},
		//松溪县
	{
		id: 39,
		pid: 6,
		name: '湛卢山',
	},
		//政和县
	{
		id: 36,
		pid: 7,
		name: '佛子山',
	},
	{
		id: 37,
		pid: 7,
		name: '凤头楠木林',
	},
	{
		id: 39,
		pid: 7,
		name: '石圳村',
	},
	{
		id: 42,
		pid: 7,
		name: '洋后厝桥',
	},
	{
		id: 43,
		pid: 7,
		name: '后山廊桥',
	},
	{
		id: 44,
		pid: 7,
		name: '云根书院',
	},
	{
		id: 45,
		pid: 7,
		name: '洞宫山',
	},
		//邵武市 
	{
		id: 46,
		pid: 8,
		name: '和平古镇',
	},
	{
		id: 47,
		pid: 8,
		name: '天成奇峡',
	},
	{
		id: 48,
		pid: 8,
		name: '瀑布林生态',
	},{
		id: 49,
		pid: 8,
		name: '云灵山',
	},
	{
		id: 50,
		pid: 8,
		name: '温泉度假区',
	},
	{
		id: 51,
		pid: 8,
		name: '熙春园',
	},
	{
		id: 52,
		pid: 8,
		name: '小隐竹源',
	},
	{
		id: 53,
		pid: 8,
		name: '中央苏区纪念馆',
	},
	{
		id: 54,
		pid: 8,
		name: '李忠定公祠',
	},
	{
		id: 55,
		pid: 8,
		name: '宝严寺',
	},
	{
		id: 56,
		pid: 8,
		name: '民俗馆',
	},
	{
		id: 57,
		pid: 8,
		name: '华严寺',
	},
	{
		id: 58,
		pid: 8,
		name: '清真寺',
	},
		//建瓯市
	{
		id: 59,
		pid: 9,
		name: '鼓楼',
	},
	{
		id: 60,
		pid: 9,
		name: '归宗岩',
	},
	{
		id: 61,
		pid: 9,
		name: '东岳庙',
	},
		//建阳区
	{
		id: 62,
		pid: 10,
		name: '花花世界',
	},
	{
		id: 63,
		pid: 10,
		name: '黄坑',
	},
	{
		id: 64,
		pid: 10,
		name: '考亭书院',
	},
]

export default {
	carouselList,  
	cartList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	orderList,
	cateList,
	cateList2,
	tweets,
	scenicSpot,
	reply,
	tweetsTickets,
	ticketNotice,
	
}
