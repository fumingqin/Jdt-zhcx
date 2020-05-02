/* 接口参数区 */
// 示例

const Url='http://zntc.145u.net';
const Url1='http://111.231.109.113:8002';
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
	SearchVersion:{
		value:Url+'/api/person/SearchVersion',
		name:'获取版本号',
		method:'POST',
		pages: [],
	}, 
}


// 接口声明区
export default {
	Interface
}