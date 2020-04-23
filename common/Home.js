//司机端全局参数定义

//接口域名
const Url = 'http://111.231.109.113:8002';

//接口对象
const Interface = {
	
	addPassengerPosition : {
		value: Url + '/api/zhcx/addPassengerPosition',
		name:'旅客端定时实时上报位置',
		method:'GET',//GET-POST
		pages:["Jdt-zhcx/App.vue"]
	},
}

const dateFormat = {
	dateformat : 'Y-m-d H:i:s'
}

// 接口声明区
export default {
	Interface,
	dateFormat
}