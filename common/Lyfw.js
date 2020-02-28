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
// 接口声明区
export default {
	userInfo,
	sixPalaceList,
	scenicList,
}