/* 接口参数区 */
// 示例
const user = {
	status: 1,  //成功/失败提示返回值
	data: {
		chineseName:'张三',  		//中文姓名
		englishSurname:'zhang', 	//英文姓
		englishName:'san', 			//英文名
		sex:0,						//性别，0代表男，1代表女
		codeNum:'3333333', 			//身份证号
		date:'1998-04-29', 			//有效期
		person:0,					//是否设置为本人，0代表否，1代表是
		phoneNum:'15260769766'		//电话号码
	},
	msg: '乘车人信息'		
}

const addressInfo = {
	status:1,
	data:{
		receiver:'张三',							//收件人
		phoneNum:'15260769766',					//手机号码
		district:'福建省 丰泽区 泉秀路',	//所在地区
		detailAddress:'丰泽区',					//详细地址
		postalCode:'366300',					//邮政编码
		defaultAddress:0						//是否设置为默认地址，0代表否，1代表是
	},
	msg:'地址详情'
}
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
	msg: '用户信息'
}

//const Url='http://111.231.109.113:8002';
const Url='http://zntc.145u.net';
const Interface={
	login:{
		value:Url+'/api/person/login',
		name:'用户登录',
		method:'POST',
		pages: [],
	},
	changeInfo:{
		value:Url+'/api/person/changeInfo',
		name:'修改个人信息（除头像外）',
		method:'POST',
		pages: [],
	},
	userInfoList:{
		value:Url+'/api/person/userInfoList',
		name:'获取乘车人信息',
		method:'POST',
		pages: [],
	},
	changeUserInfo:{
		value:Url+'/api/person/changeUserInfo',
		name:'修改乘车人信息',
		method:'POST',
		pages: [],
	},
	deletuserInfoList:{
		value:Url+'/api/person/deletuserInfoList',
		name:'删除乘车人信息',
		method:'POST',
		pages: [],
	},
	getLoginCode:{
		value:Url+'/api/person/getLoginCode',
		name:'获取手机验证码',
		method:'POST',
		pages: [],
	},
	userInfoListDetail:{
		value:Url+'/api/person/userInfoListDetail',
		name:'获取详细信息',
		method:'POST',
		pages: [],
	},
	BindPersonInfoOpenID_wxAndPhoneNumber:{
		value:Url+'/api/person/BindPersonInfoOpenID_wxAndPhoneNumber',
		name:'微信openid，绑定手机号',
		method:'POST',
		pages: [],
	},
	changeInfoPortrait:{
		value:Url+'/api/person/changeInfoPortrait',
		name:'只修改头像',
		method:'POST',
		pages: [],
	},
	GetUserInfoByOpenId_wx:{
		value:Url+'/api/person/GetUserInfoByOpenId_wx',
		name:'通过微信的openid获取用户信息',
		method:'POST',
		pages: [],
	}, 
	GetUserInfoByOpenId_qq:{
		value:Url+'/api/person/GetUserInfoByOpenId_qq',
		name:'通过qq的openid获取用户信息',
		method:'POST',
		pages: [],
	}, 
}


// 接口声明区
export default {
	userInfo,addressInfo, user, Interface,
}