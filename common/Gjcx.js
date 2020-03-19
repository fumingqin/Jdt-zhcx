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
	data:[{
		lineID:'3',
		starStation:'武夷花园',
		endStation:'五金机电产业园',
		starTime:'06:00',
		endTime:'18:00',
		price:'4元',
		departureInterval:'15'
		
	}]
}

// 接口声明区
export default {
	userInfo,  
	line,
	nearBy,
	detailLine
}