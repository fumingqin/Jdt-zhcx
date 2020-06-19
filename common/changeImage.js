// #ifdef H5
	const Url = 'http://zntc.145u.net'; //http请求
// #endif
// #ifndef H5
	const Url = 'https://zntc.145u.net:9099'; //https请求
// #endif

// #ifdef APP-PLUS
// #endif
const ddtUrl='http://111.231.109.113:8004' //达达通接口地址

//获取图片的路径
async function GetImage(systemName) {
	var model=-1;
	if(systemName=="南平综合出行"){
		model=5;
	}
	
	if(model==-1){
		console.log('项目名暂未添加图片')
	}else{
		var res = await request(model)
		return res;
	}
}

//request请求
function request (model) {
  return new Promise(function (resolve, reject) {
    uni.request({
    	url:Url+'/api/zhcx/GetImage',
    	data:{
    		model:model,
    	},
    	method:'POST',
    	success(res){
    		console.log(res,"res")
    		if(model==5){ //南平综合出行
    			var image1=res.data.data.filter(item => {
    				return item.type=='南平背景图';
    			})
    			var image2=res.data.data.filter(item => {
    				return item.type=='nanpinglogo';
    			})
    			var image3=res.data.data.filter(item => {
    				return item.type=='广告';
    			})
    			var imageList={
    				background:image1[0].imageUrl, //背景图
    				logo:image2[0].imageUrl,  //logo
    				advert:image3[0].imageUrl, //广告
    			}
				resolve(imageList)
    		}
    	},
    	fail(err){
    		console.log(err,"err")
			reject('-1');
    	}
    })
  })
}

//弹窗提示
function showToast(title,icon){
	console.log(icon,'icon')
	var sign=icon==undefined?'none':icon;
	uni.showToast({
		title:title,
		icon:sign,
	})
}

// 接口声明区
export default {
	GetImage,showToast
}