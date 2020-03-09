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

// 接口声明区
export default {
	userInfo,addressInfo, user, 
}