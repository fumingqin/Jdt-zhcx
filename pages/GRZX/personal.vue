<template>
	<view class="Cr_background">
		<form @submit="formSubmit" >
			<image class="bg" :src=" userInfo.bg || '../../static/index/banner3.jpg'" mode="aspectFill"></image>
			<image class="tx" :src="src" @click="getPhoto"></image>
			<button class="xgbg"  plain="">修改背景</button>
			<view class="Cr_slk1">
				<text class="bz">姓&nbsp;名：</text>
				<input class="slk"  name="xm"  placeholder="请输入" v-model="tjfrom.xm" adjust-position="" />
			</view>
			<view class="Cr_slk2">
				<text class="bz">性&nbsp;别：</text>
				<picker class="slk1" name="xb"  mode="selector" @change="genderChange"  v-model="tjfrom.xb"   :range="genderSex" placeholder="请选择" >
					{{genderSex[tjfrom.xb]}}
				</picker>
			</view>
			<view class="Cr_slk2"> 
				<text class="bz">生&nbsp;日：</text>
				<picker class="slk1" name="sr"  mode="date" @change="dateChange" v-model="tjfrom.sr"  :start="startDate" :end="endDate" placeholder="请选择"  >
					{{tjfrom.sr}}
				</picker>
			</view>
			<view class="Cr_slk2">
				<text class="bz">地&nbsp;址：</text>
				<input class="slk" name="dz"  disabled="disabled" @tap="toggleTab"  placeholder="你的常住地" v-model="tjfrom.dz" />
				<w-picker
					mode="region"
					:areaCode="['35', '3507', '350782']"
					:hideArea="false"
					@confirm="onConfirm" 
					ref="region"
					:timeout="true"
				></w-picker>
			</view>
			<view class="Cr_slk2">
				<text class="bz">签&nbsp;名：</text>
				<input class="slk" name="qm"   placeholder="你想要说的话"  v-model="tjfrom.qm" />
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button class="an" type="primary" form-type="submit">保存</button>
			<!-- #endif -->
		</form>
	</view>
	 
</template>
<script>
	import { pathToBase64, base64ToPath } from '../../components/js_sdk/gsq-image-tools/image-tools/index.js'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
	    mapState,  
	    mapMutations  
	} from 'vuex';  
	export default {
		data() {
			return {
				src : '/static/user/missing-face.png',
				mode:"region",
				genderSex:['男','女'], 
				tjfrom : { 
					xm : '',
					xb : '0',
					sr : '请选择',
					dz : '',
					qm : '',
				}
			};
		},
		onLoad:function(){
			var that = this;
			this.tjfrom.xb = that.userInfo.gender;
			this.tjfrom.sr = that.userInfo.birthday;
			this.tjfrom.dz = that.userInfo.permanent;
			this.tjfrom.xm = that.userInfo.nickname;
			this.tjfrom.qm = that.userInfo.autograph;
			this.src = that.userInfo.portrait;
		},
		onNavigationBarButtonTap : function() {
					 uni.showModal({
					     content: '表单数据内容：' + JSON.stringify(this.tjfrom),
					     showCancel: false
					 });
					// uni.navigateBack({
					// })
		},
		computed:{
			...mapState(['userInfo']),
			startDate() {
			            return this.getDate('start');
			        }, 
			endDate() {
			            return this.getDate('end');
			        }
		},
		components:{
		     wPicker
		},
		methods:{
			genderChange : function(e){
				this.tjfrom.dz = e.detail.value;
			},
			dateChange : function(e){
				this.tjfrom.sr = e.detail.value;
			},
			getDate(type) {
						const date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let day = date.getDate();

						if (type === 'start') {
							year = year - 60;
						} else if (type === 'end') {
							year = year + 2;
						}
						month = month > 9 ? month : '0' + month;;
						day = day > 9 ? day : '0' + day;
						return `${year}-${month}-${day}`;
					},
			toggleTab(e){
				this.$refs[this.mode].show(); 
			},
			onConfirm(e){
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
				this.tjfrom.dz=e.result;
			},
			formSubmit: function(e) {
			                uni.showModal({
			                    content: '表单数据内容：' + JSON.stringify(this.tjfrom),
			                    showCancel: false
			                });
							// uni.navigateBack({
							// })
			},
			// getPhoto: function () {
			//         let id = uni.getStorageSync('user').id
			//         uni.chooseImage({
			//         	count: 1,
			//           sourceType: ['album'],
			//           success:(res) => {
			// 			  console.log(res)
			//             pathToBase64(res.tempFilePaths[0])
			//             .then(base64 => {
			//               console.log(base64)
			//               uni.request({
			//                 url: 'http://hn216.api.yesapi.cn/?s=App.User.UpdateExtInfo&uuid=27376041451FD0136649177E901B3ADC&ext_info={"location":"广州"}&app_key={你的app_key}&sign={动态签名}',
			//                 method: 'POST',
			//                 name: 'file',
			//                 data: {
			//                   uid: id,jPHL6SiKbiZTi6OiKtFKCCuC5JmmObOt4EwjgSZUGJ9zYUYUUECRSEkUkbjn0AGIrBAMQC7iKoRQqEx0ACFQwAkBiAQDABCGAEgMQAAABrp3WRF6uOyaMYOpJ/J06lXBMI4AG0IKQDYgATGACAAAQDEAgAKAQhgAgAQAIYioAAABgFgAmIbABUIYgAEAAXE0jyZxNFsQd+PfCvwczyPG3TaOjTu8dHLqFuzpz+pWOTV5L+n/cxllnP7pNhJUZtndzZ5eB6V/1kKbtCwvpnZy+T8dOXsxyfStyoz+uL+TjWX6UjTB1Sls067Hm4n269X6fR4vqxpjojTf6SRq0dXNApcFCCsOJWbJmM1UjSL2CNUMhMdhVDsmxgOwsQAVYWSAFWFiABiFY1uA6GojSGQeSAAQAAACGIAAAABiAYAAAAAAAAqGACABgIQwAQDEAC6VLZ8MYcMDxtdo3gz9cVtIWOqruezr8Sy6ZuuDw4/SzNdOa2ExXsDZlomJoYmFODpmpgVGdEHRB0aqSOVTKUwrsUkHUcqyD6wmupSKOaEmdENyyM2rQwSGbc6QDAqEIYAITGDQEiGAEgNiAQDFQCAbEAgGIBAAAAhiAaOuX1YLOQ6sT6sNBHFLmhFZFUmSFIQwAQAAAxDEAgGIAEMQAI
			//                   image: base64
			//                 },
			//                 success: (res) => {
			//                   console.log('上传头像', res)
			//                   if (res.statusCode === 200) {
			//                     this.$store.dispatch('userInfo', res.data.user)
			//                     uni.setStorageSync('user', res.data)
			//                   } else {
			//                     uni.showToast({
			//                       title: res.data.error,
			//                       icon: 'none'
			//                     })
			//                   }
			//                 }
			//               })
			//             })
			//           }
			//         })
			//       },
	},
}
</script>
<style lang="scss">	
	.Cr_background{
		widows: 100%;
		height: 100%;
		.bg{
			width: 100%;
			height: 464upx;
			filter: blur(0.5px);
			opacity: .7;
		}
		.tx{
			position: absolute;
			width: 200upx;
			height: 200upx; 
			left: 250upx;
			top: 52upx;
			border-radius: 50%;
			margin: 20upx;
		}
		.xgbg{
			position: absolute;
			width:220upx;
			font-size:32upx;
			left: 242upx;
			top: 294upx;
			margin: 20upx;
			border-radius: 40upx;
			line-height: 74upx;
			border-color: #FFFFFF;
			color: #FFFFFF;
		}
		.Cr_slk1{
			margin-top: -20upx;
		}
		.Cr_slk2{
			margin-top: -8upx;
		}
		.bz{
			position: relative;
			left: 36upx;
			top: 74upx;
			color: #AAAAAA;
		}
		.slk{
			position: relative;
			width: 90%;
			height: 104upx;
			left: 36upx;
			text-align: right;
			border-bottom:#F5F5F5 1px solid;
			border-left-width:0px;
			border-right-width:0px;
			border-top-width:0px;
		}
		.slk1{
			position: relative;
			width: 90%;
			height: 72upx;
			left: 36upx;
			text-align: right;
			padding-top: 24upx;
			padding-bottom: 4upx;
			border-bottom:#F5F5F5 1px solid;
			border-left-width:0px;
			border-right-width:0px;
			border-top-width:0px;
		}
		.an{
			width: 90%;
			height: 104upx;
			padding-top: 12upx;
			font-size: 40upx;
			margin-top: 48upx; 
			margin-bottom: 48upx;
		}
	}

</style>