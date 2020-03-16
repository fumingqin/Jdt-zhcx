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
const station ={
	status: 1,  //成功/失败提示返回值
	data: [{
		lineID:'1',
		lineName:'X2',
		direction:'新塘·尚好家园',
		distance:'120米',
		stationNumber:'即将到站',
		arriveTime:''
	},{
		lineID:'2',
		lineName:'17路',
		direction:'福厦高铁泉州站',
		distance:'400米',
		stationNumber:'1站',
		arriveTime:'2分'
	},
	{
		lineID:'3',
		lineName:'19路',
		direction:'航空旅游首末站',
		distance:'1.1公里',
		stationNumber:'2站',
		arriveTime:'5分'
	}],
	msg: '提示'	
}

// 接口声明区
export default {
	userInfo,  
	station,
	nearBy
}