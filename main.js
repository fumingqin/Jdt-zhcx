import Vue from 'vue'
import App from './App'
import Ctky from './Ctky.js' //传统客运-测试用数据
import Czc from './Czc.js'   //出租车-测试用数据
import Dd from './Dd.js' 	 //订单-测试用数据
import Gjcx from './Gjcx.js' //公交查询-测试用数据
import Grzx from './Grzx.js' //个人中心-测试用数据
import Lyfw from './Lyfw.js' //旅游服务-测试用数据


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

//模拟异步请求数据 - 传统客运
const ctky = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Ctky[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 出租车
const czc = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Czc[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 订单
const dd = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Dd[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 公交查询
const gjcx = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Gjcx[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 个人中心
const grzx = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Grzx[type]);
		}, 500)
	})
}

//模拟异步请求数据 - 旅游服务
const lyfw = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Lyfw[type]);
		}, 500)
	})
}

Vue.prototype.$api = {ctky,czc,dd,gjcx,grzx,lyfw};
app.$mount()
