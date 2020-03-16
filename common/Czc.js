/* 接口参数区 */
// 示例

const GaoDeApi = {
	/* getDirectionDriving: function  (startLonLat,endLonLat) {
		//调用高德api取得路径规划并绘制线路
		var that = this;
		uni.request({
			url: 'http://localhost:port/api/zhcx/getPlanningLineByLonLat',
			data: {
				startLonLa: startLonLat,
				endLonLat: endLonLat,
			},
			method: "GET",
			success: function(res) {
				console.log(res);
				//日后会加入定时，此处需清空
				that.points = [];
				that.polyline = [];
				
				var stepsArr = res.data.route.paths[0].steps;
				var polylineArr = [];
				var points = [];
				//取出分步骤的经纬度
				for (var i = 0; i < stepsArr.length; i++) {
					polylineArr.push(stepsArr[i].polyline);
				}
				//取出所有点的经纬度
				points.push(startLonLat);
				for (var i = 0; i < polylineArr.length; i++) {
					var arr = polylineArr[i].split(';');
					for (var j = 0; j < arr.length; j++) {
						points.push(arr[j]);
					}
				}
				points.push(endLonLat);
				//根据文件建设对象经纬度数组
				for (var i = 0; i < points.length; i++) {
					var arr = points[i].split(',');
					var obj = {
						longitude: arr[0],
						latitude: arr[1]
					}
					that.points.push(obj);
				}
				var obj = {
					points: that.points,
					color: "#0000AA",
					arrowLine: true,
					width: 6
				};
				that.polyline.push(obj);
			}
		}); */
}

const GaoDeWebKey = [
	"2348ba1d476b5e44917533b65583f969", 
	"1df2cef2c0e71acc0ed1e90d5bf6431a"
]
const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	'http://111.231.109.113:8002/api/zhcx/getPlanningLineByLonLat' ,
	//获取所有车辆定位数据
	'http://111.231.109.113:8002/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	'http://111.231.109.113:8002/api/zhcx/getLonLatRangeVehiclePosition',
]

// 接口声明区
export default {
	GaoDeWebKey,
	InterfaceAddress
}