// #ifdef H5
	const Url = 'http://zntc.145u.net'; //http请求
// #endif
// #ifndef H5
	const Url = 'http://36.250.234.10:60039'; //https请求
// #endif

// #ifdef APP-PLUS
// #endif
// const ddtUrl='http://111.231.109.113:8004' //达达通接口地址
const ddtUrl='http://36.250.234.10:60040' //达达通接口地址

//获取图片的路径
async function GetImage(systemName) {
	var model=-1;
	if(systemName=="南平综合出行"){
		model=5;
	}else if(systemName=="漳州达达通"){
		model=11;
	}
	
	if(model==-1){
		console.log('项目名暂未添加图片')
	}else{
		var res = await request(model,systemName)
		return res;
	}
}

//request请求
function request (model,systemName) {
  return new Promise(function (resolve, reject) {
    uni.request({
    	url:Url+'/api/zhcx/GetImage',
    	data:{
    		model:model,
    	},
    	method:'POST',
    	success(res){
    		// console.log(res,"res")
    		if(systemName=="南平综合出行"){ //南平综合出行
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
			else if(systemName=="漳州达达通"){//漳州达达通
				var image1=res.data.data.filter(item => {
					return item.type=='背景图';
				})
				var image2=res.data.data.filter(item => {
					return item.type=='Logo';
				})
				var imageList={
					background:image1[0].imageUrl, //背景图
					logo:image2[0].imageUrl,  //logo
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