<script>
	import Vue from 'vue'
	import fly from 'api/http.js'
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			this.getSystemInfo();
			this.setLocale()
			this.setSalesprice()
			this.getquRenFuKuanText()
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			async setSalesprice(){
				let [err,res] = await this.$Request_.get(this.$allUrl.getSalesprice)
				if(res!=null){
					if(res.IsSuccess){
						this.$store.commit('setSalesprice',res.Data)
						// 每一USDT能购买多少个YNB
					}
				}
			},
			getSystemInfo(){
				uni.getSystemInfo({
				       success: function(e) {
				           // #ifndef MP
				           Vue.prototype.StatusBar = e.statusBarHeight;
				           if (e.platform == 'android') {
				               Vue.prototype.CustomBar = e.statusBarHeight + 50;
				           } else {
				               Vue.prototype.CustomBar = e.statusBarHeight + 45;
				           };
				           // #endif
				           // #ifdef MP-WEIXIN
				           Vue.prototype.StatusBar = e.statusBarHeight;
				           let custom = wx.getMenuButtonBoundingClientRect();
				           Vue.prototype.Custom = custom;
				           Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				           // #endif       
				           // #ifdef MP-ALIPAY
				           Vue.prototype.StatusBar = e.statusBarHeight;
				           Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				           // #endif
				       }
				   })
			},
			setLocale(){
				let locale = uni.getStorageSync('YNBLocale')
				if(locale.length!=0){
					let localeList = ['en','zh','ja','ko']
					let hasLocale  = false 
					for(let item of localeList){
						if(locale===item){
							hasLocale = true
							break
						}
					}
					if(hasLocale){
						this.$store.commit('changLocale',locale)
					}
				}
			},
			async getquRenFuKuanText(){
				let infoObj = await this.getWenZhangDetail(2010)
				if(infoObj.isOk){
					let obj = {
						title:infoObj.data.Title,
						content:infoObj.content
					}
					this.$store.commit('setquRenFuKuanInfo',obj)
				}
			},
		}
	}
</script>


<style lang="scss">
	
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	page{
		background-color: #424554;
		position: relative;
	}
	
	
	.text-zhuti{
		color:rgba(237,204,147,1)
	}
	.text-zhuti1{
		color: #424554;
	}
	.text-zhuti2{
		color: #77562B;
	}
	.bg-zhuti1{
		background-color: #424554;
	}
	.bg-zhuti2{
		background-color: rgba(237,204,147,1);
	}
	.shadow-zhuti1{
		box-shadow: 2rpx 2rpx 8rpx 4rpx rgba(237,204,147,1);
	}
	.shadow-zhuti2{
		box-shadow: 4rpx 4rpx 4rpx 4rpx #424554;
	}
	.border-bottom-zhuti{
		position: relative;
	}
	.border-bottom-zhuti::after{
		content: '';
		position:absolute;
		bottom: -8rpx;
		left: 0%;
		right: 0%;
		height: 4rpx;
		background: rgba(237,204,147,1);
		border-radius: 20rpx;
	}
	.bg-zhuti3 {
		background:linear-gradient(25deg , rgba(150, 126, 93, 1.0), rgba(173, 146, 108, 1.0)  , rgba(186, 157, 116, 1.0) , rgba(184, 155, 115, 1.0) , rgba(198, 167, 123, 1.0) ,  rgba(209, 176, 130, 1.0)  , rgba(216, 182, 135, 1.0) , rgba(221, 187, 138, 1.0) ,  rgba(254, 214, 158, 0.9)  , rgba(254, 214, 158, 1) );
	}
	.bg-black_{
		background: rgb(53, 56, 68);
	}
	.u-image-right{
		transform: rotate(-90deg);
	}
	.munCard-text{
		position: absolute;
		font-size: 24rpx;
		position: absolute;
		right: 50rpx;
		color: white;
		height: 120rpx;
		line-height:120rpx;
	}
	.tixianNew{
		background-image: url(@/static/index/tixian_bg.png);
		background-size:contain;
		background-repeat:no-repeat;
		text-align: center;
		color: #77562B;
		line-height: 120rpx;
		font-weight: bold;
		height: 200rpx;
		width:100%
	}
	.form-header_{
		color: #FFFFFF;
		font-size: 50upx;
		font-weight: bold;
		margin-bottom: 50upx;
		display: flex;
		align-items: center;
		// position: relative;z-index: 5000;
		// margin-bottom:120rpx;
	}
	// .form-header_ .form-header_content{
	// 	position: fixed;
	// 	top:65rpx;
	// 	width:calc(100% - 120rpx);
	// 	z-index: 1024;
	// 	background-color: #424554;
	// 	z-index: 1024;
	// }
	// .form-header_::after{
	// 	content: '';
	// 	position: fixed;
	// 	top: 0rpx;
	// 	left: 0rpx;
	// 	right: 0rpx;
	// 	height:150rpx;
	// 	background: red;
	// 	background-color: #424554;
	// 	z-index: 1023
	// }
	.lists_{
		// background-color: #434655;
		background: linear-gradient(275deg, rgba(45, 45, 53, 0.1) 0%, #505058 100%);
		color: #FFFFFF;
		padding: 25rpx 40rpx;
		border-radius: 20rpx;
	}
	.cardBg_{
	background-image: linear-gradient(45deg,rgba(114, 113, 126, 1.0),rgba(85, 84, 94, 1.0),rgba(71, 70, 79, 1.0),rgba(64, 64, 71, 1.0),rgba(80, 79, 88, 1.0),rgba(72, 72, 80, 1.0),rgba(131, 129, 144, 1.0));
}
	/*每个页面公共css */
	@import url("./common/iconfont.css");
	@import url("colorui/icon.css");
	@import url("colorui/main.css");
	@import url("./graceUI/animate.css");
	@import url("./common/yg.css");
	@import url("./common/fontFace.css");
	@import url("common/hx.css");
	@import url("./common/style/icon");
	@import url("./common/ygOtherIcon.css");
	@import url("./graceUI/graceUI.css");
	@import url("./graceUI/animate.css");
	.authentication__continue-btn{
		background-color: #d80000;
		border-radius: 4px;
		color: #fff;
		font-size: 20px;
		font-weight: bold;
		height: 48px;
		text-transform: uppercase;
		width: 312px;	
	}
	
	
</style>