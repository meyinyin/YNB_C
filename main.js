import Vue from 'vue'
import App from './App'
import './api' 
import { mapState } from 'vuex' 
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)




// 引入 api 文件


/**
 * 全局引入 ColorUI cuCustom 组件
 */
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)   
/**
 * ============================ 引入 ColorUI 组件完成 ==========================================》
 */



/**
 * 全局引入 键盘 组件
 */
import keyBoard from '@/components/key-Board/index.vue'
Vue.component('key-board',keyBoard)
/**
 * ============================ 引入 全局键盘 组件完成 ==========================================》
 */

/*列表无内容组件*/
import noContent from '@/components/noContent.vue'
Vue.component('no-content',noContent)
/*===========================================列表无内容组件 引入完成==================================================================*/


/*锤子ui的button按钮*/
import tuiButton from '@/components/button/button.vue'
Vue.component('tui-button',tuiButton)
/*===========================================锤子ui的button按钮*引入完成==================================================================*/  


/**
 * 全局引入 vuex 文件
 */
import store from'./store/store.js'
Vue.prototype.$store=store
/**
 * ============================ 引入 vuex 完成 ================================================》
 */

import {allUrl} from 'store/qym/store.js'
Vue.prototype.$allUrl=allUrl




/**
 * 全局引各种公共方法
 */

import {allApi} from './common/handle.js'
import {beTime,beTime1} from './common/handle.js'
import {HtmlParser,timeago,formatAmountFun} from './common/handle.js'
Vue.use(beTime)
Vue.use(beTime1)
Vue.use(HtmlParser)
Vue.use(timeago)
Vue.use(formatAmountFun)
// Vue.use(OpenVoice)
Vue.prototype.$api = allApi


// import api from './common/api.js'
// Vue.prototype.$request = api

/*发送请求*/
import {HttpRequest , HttpRequest_ } from './common/httpRequest'
Vue.prototype.$Request = HttpRequest//发送请求
Vue.prototype.$Request_ = HttpRequest_
/**
 * ============================ 引入 全局引各种公共方法 完成 ================================================**/

/*等待页面*/
import loadIng from '@/components/loadIng.vue'
Vue.component('load-ing',loadIng)
/**
 * ============================ 引入 等待页面 完成 ================================================》
 */

/*加载中 组件*/
import loadingComponet from '@/components/loadingComponent.vue'
Vue.component('loading-componet',loadingComponet)
/*==================================引入 正在加载中组件 完成=========================================================*/


/*swiper 内容组件*/
import swiperContent from '@/components/swiperContent.vue'
Vue.component('swiper-content',swiperContent)
/*====================================引入 swiper内容组件 完成======================================================================*/


/*底部加载中*/
import bottomLoading from '@/components/bottomLoading.vue'
Vue.component('bottom-loading',bottomLoading)
/*========================================引入 底部加载中组件 完成================================================================*/



/*顶部+底部 加载中*/
import tbLoading from '@/components/tbLoading.vue'
Vue.component('tb-loading',tbLoading)
/*=====================================引入顶部+底部加载中组件 完成==================================================================*/



/*引入modal组件*/
import showModal from './components/modal/modal.vue'
Vue.component('show-modal',showModal)
/*=====================modal组件=======================*/


/*引入询问是否登陆组件*/
import isLoginMoadl from './components/loginMoadl/loginMoadl.vue'
Vue.component('is-loginMoadl',isLoginMoadl)

/*===========================引入询问是否登陆组件===========================*/


/*引入返回组件*/
import backBtn from './components/backBtn.vue'
Vue.component('back-btn',backBtn)

/*===========================引入返回组件===========================*/


/*引入环形loading*/
import yinLoading from './components/yinLoading.vue'
Vue.component('yin-loading',yinLoading)

/*===========================引入环形loading===========================*/


/***************引入 router 对象 封装了各类路由跳转的方法**************/

import {$Route} from './common/router.js'
Vue.prototype.$Route = $Route

/*********************************************************************/


import sidebarBtns from './components/sidebarBtns.vue'
Vue.component('sidebar-btns',sidebarBtns)

import LoadLine from './components/load-line/load-line.vue'
Vue.component('load-line',LoadLine)



import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
Vue.component('tki-qrcode',tkiQrcode)

import htmlParser from '@/common/html-parser'
Vue.mixin({
	computed:{
		...mapState({
			userInfo_: state => state.userInfo,
			hasLogin: state => state.hasLogin,
			yyyState: state => state.YyyState,
			personType:state => state.personType,
			site_:state => state.site,
			guanzhuList_:state => state.guanzhuList,
			tjrid_:state => state.tjrid,
			ManagerType:state => state.ManagerType,
			singleProductObj:state=> state.singleProductObj,
			zhanweiPic:state=>state.zhanweiPic,
			jiaFangPic: state => state.jiaFangPic,
			yiFangPic: state => state.yiFangPic,
			upDateWgtUrl:state => state.wgtUrl,
			upDateApkUrl:state=> state.apkUrl,
			upLoadText:state => state.upLoadText,
			shopStoreInfo:state => state.storeInfo,
			scShopDanPingList:state => state.scShopDanPingList,
			isBackToHome:state=>state.isBackToHome,
			isBackToHomeID:state=>state.isBackToHomeID,
			isLv:state => state.isLv,
			USERSTATUSCODE:state => state.userStatusCode,
			USERSTATUSCODEINfo:state => state.userStatusCodeInfo,
			usTalkerMsgList_:state => state.usTalkerMsgList,
			usTalkerMsgListLength_:state => state.usTalkerMsgListLength,
			routeOption:state=>state.routeOption,
			locale:state=>{
				return state.locale
			},
			lan_:state=>{
				if(state.locale==='en'){
					return 0
				}
				if(state.locale==='zh'){
					return 1
				}
				if(state.locale==='ja'){
					return 2
				}
				if(state.locale==='ko'){
					return 3
				}
			},
			allScore:state=>{
				if(state.hasLogin){
					return state.userInfo.Score + state.userInfo.XiaoFeiScore 
				}else{
					return 0
				}
			},
			salesprice:state=>state.salesprice,
			usdtByYnb:state=>{
				return state.salesprice
			},
			ynbByUsdt:state=>{
				// console.log(state.salesprice,231)
				return (1/state.salesprice).toFixed(5)
			}
		})
	},
	data(){
		return {
			toYongLogo:'https://api.91goodluck.com/uploadshop/7b75ff6f_661b_4740_92c2_8e1bfa6fba87.png',
			SCORE:0,
		}
	},
	methods:{
		async getneedscore(){
			let [err,res] = await this.$Request_.get(this.$allUrl.needscore,{
				userid:this.userInfo_.ID,
				accountid:this.userInfo_.CheckDesc
			})
			if(res!=null){
				if(res.IsSuccess){
					this.SCORE = res.Data
				}
			}
		},
		
		isInfo(text){
			let textList = text.split('|')
			let info = ''
			textList.forEach((it,index)=>{
				if(index===0){
					info = `${it}\n`
				}else{
					info = `${info}\n${it}`
				}
				
			})
			return info
		},
		orderSatate(info){
			let obj = {
				text:'',
				isShowFuKuan:false,
				isShowSure:false,
				timeLabel:'',
				time:'',
				isShowTs:false,
				isTsIng:false,
				TSInfo:'',
				tsPicUrl:'',
				isDelete:false,
				no:''
			}
			if(info.Info.length!=0){
				obj.no = info.Info
			}
			if(info.InOrOut){
				obj.timeLabel = this.$t('结束时间')
				if(info.EndDate!=null){
					obj.time = this.beTime(info.EndDate)
				}else{
					obj.time = this.beTime(info.QRDate)
				}
				obj.text = this.$t('已完成')
				return obj
			}else{
				if(info.IsFK){
					if(info.IsTK){
						obj.timeLabel = this.$t('退款时间')
						obj.time = this.beTime(info.TKDate)
						obj.text = this.$t('已退款')
						return obj
					}else{
						if(info.IsTS){
							obj.isShowTs = true
							obj.timeLabel = this.$t('纠纷时间')
							obj.time = this.beTime(info.TSDate)
							obj.text = this.$t('纠纷中')
							obj.TSInfo = info.TSInfo
							if(info.TSPicUrls.length!=0){
								obj.TSPicUrls = info.TSPicUrls.split(',')
							}else{
								obj.TSPicUrls = []
							}
							obj.isShowSure = true
							obj.isTsIng = true
							return obj
						}else{
							if(info.IsQR){
								obj.timeLabel = this.$t('确认时间')
								obj.time = this.beTime(info.QRDate)
								obj.text = this.$t('卖家已确认')
								return obj
							}else{
								obj.isShowTs = true
								obj.timeLabel = this.$t('付款时间')
								obj.time = this.beTime(info.FKDate)
								
								obj.isShowSure = true
								obj.isShowFuKuan = false
								obj.text = this.$t('卖家未确认')
								return obj
							}
						}
					}
				}else{
					obj.timeLabel = this.$t('下单时间')
					obj.time = this.beTime(info.AddDate)
					obj.isShowFuKuan = true
					obj.isDelete = true
					obj.text= this.$t('待买家确认')
					return obj
				}	
			}
		},
		generateRandomWordIndex(length = 2){
			let ary = []
			for(let index = 0 ;index <length ;index++){
				ary.push(Math.floor(Math.random()*24)+1)
			}
			return ary
		},
		async refshLogin(){
			let userInfo = uni.getStorageSync('YNBuserInfo_new')
			console.log(userInfo)
			if(Object.keys(userInfo).length!=0){
				let [err,res] = await this.$Request_.get(this.$allUrl.YNBlogin,{
					email:userInfo.No,
					pwd:userInfo.Pwd,
					lan:this.lan_
				})
				if(res!=null){
					if(res.IsSuccess){
						this.$store.commit('login',res.Data)
					}else{
						this.$api.msg(res.Msg)
					}
				}
			}else{
				this.$store.commit('logout')
			}
		},
		async qrfkscoreRequest(data,showMsg = true){
			let [err,res] = await this.$Request_.get(this.$allUrl.qrfkscore,data)
			if(res!=null){
				if(res.IsSuccess){
					if(showMsg){
						this.$api.msg('OK',1500,false,'success')
					}
					return {
						isOk:true,
						data:res
					}
				}else{
					this.$api.msg(res.Msg,1500)
					return {
						isOk:false,
						data:res
					}
				}
			}
		},
		async getWenZhangDetail(sortid){
			let [err,res] = await this.$Request_.get(this.$allUrl.alllist,{
				sortid,
				lan:this.lan_
			})
			if(res!=null){
				if(res.IsSuccess){
					let list = res.Data
					if(list.length!=0){
						let wenZhangData = list[0].Content
						
						let Content = wenZhangData
						var richtext = Content //取出富文本字符串
						const regex = new RegExp('<img', 'gi'); //找到找对img标签
						richtext = richtext.replace(regex, `<img style="max-width:100%;height:auto;display:block;margin-left:auto;margin-right:auto"`) //正则替换
						return {
							isOk:true,
							content:htmlParser(richtext),
							data:list[0]
						}
					}
				}
			}
			return {
				isOk:false
			}
		},
		backLastPage(){
			this.$Route.navigateBack()
		}
	}
})

Vue.config.productionTip = false

App.mpType = 'app'


let locale = uni.getStorageSync('YNBLocale')
if(locale.length===0){
	locale = store.state.locale
}else{
	let localeList = ['en','zh','ja','ko']
	let hasLocale  = false 
	for(let item of localeList){
		if(locale===item){
			hasLocale = true
			break
		}
	}
	if(!hasLocale){
		locale = store.state.locale
	}
	
}
const i18n = new VueI18n({
    locale,    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh': require('./common/i18n/lang/zh'),   // 中文语言包
      'en': require('./common/i18n/lang/en'),   // 英文语言包
	  'ja': require('./common/i18n/lang/ja'),   // 日文语言包
	  'ko': require('./common/i18n/lang/ko')	
	},
	 // silentTranslationWarn: true
})
//












// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);
//封装登录检查
Vue.prototype.checkLogin = function(){    
	return true;
}

const app = new Vue({
    ...App,
	i18n
})
app.$mount()
