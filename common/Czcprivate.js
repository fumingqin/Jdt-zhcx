/* 专线出租车 */
/* 接口参数区 */
// 示例

//接口域名
const Url = 'http://111.231.109.113:8004';

//接口对象
const Interface = {
	//GET-POST
	GetCityLine:{
		value: Url + '/api/SpecailLine/GetCityLine',
		name:'旅客端-出租车下单',
		method:'POST',
		pages:["Home/ChooseSite.nvue"]
	}
}


// 接口声明区
export default {
	Interface,
}