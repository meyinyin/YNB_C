import vueX from '@/store/store.js'
import {allApi} from '@/common/handle.js'
import Vue from 'vue';

export const $Route = {
	isUrl(url,obj){//拼接路由字符串
		let keyAry = Object.keys(obj)
		if(keyAry.length!=0){
			url = url+'?'
			keyAry.forEach((key,i)=>{
				let val = obj[key]
				if(i!=keyAry.length-1){
					url = `${url}${key}=${val}&`
				}else{
					url = `${url}${key}=${val}`
				}
			})
		}
		console.log()
		return url
	},
	/*
		url:跳转的路径,
		obj:跳转的路由参数,默认为空
	*/
	async navigateTo(url,obj = {},isStore=false){//正常的路由跳转
		let url_ = url
		if(isStore){
			Vue.prototype.$store.commit('setRouteOption',obj)
		}else{
			url_ = this.isUrl(url,obj)
		}
		uni.navigateTo({
			url:url_
		})
	},
	/*
		url:跳转的路径,
		obj:跳转的路由参数,默认为空
	*/
	async redirectTo(url,obj={},isStore=false){//关闭当前页面，跳转到应用内的某个页面。
		let url_ = url
		if(isStore){
			Vue.prototype.$store.commit('setRouteOption',obj)
		}else{
			url_ = this.isUrl(url,obj)
		}
		uni.redirectTo({
			url:url_
		})
	},
	/*
		url:跳转的路径,
		obj:跳转的路由参数,默认为空
	*/
	async reLaunch(url,obj={},isStore=false){//关闭所有页面，打开到应用内的某个页面
		let url_ = url
		if(isStore){
			Vue.prototype.$store.commit('setRouteOption',obj)
		}else{
			url_ = this.isUrl(url,obj)
		}
		console.log(url_)
		uni.reLaunch({
			url:url_
		})
	},
	/*
		url:跳转的路径
	*/
	async switchTab(url){//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
		uni.switchTab({
			url
		})
	},
	/*
		delta:后退的页面数.默认为1
	*/
	async navigateBack(delta = 1){//关闭当前页面，返回上一页面或多级页面
		uni.navigateBack({
			delta
		})
	},
	routeBefore(self){
		let routes = getCurrentPages()
		let curRoute = routes[routes.length - 1].route
		let state = vueX.state
		let hasLogin = state.hasLogin
		let backHome = (text,needMsg = false,fnName = 'reLaunch',route = '/pages/index/index') => {
			if(needMsg){
				allApi.msg(self.$t(text),1000)
			}
			setTimeout(()=>{
				this[fnName](route)
			},1000)
		}
		if(curRoute.includes('pages/account')){
			if(!state.hasLogin){
				// backHome('登录失效,即将返回首页',true)
			}	
		}
		if(curRoute.includes('pages/myTeam')){
			if(!state.hasLogin){
				// backHome('登录失效,即将返回首页',true)
			}	
		}
		if(curRoute.includes('pages/login')){
			if(state.hasLogin){
				// this.reLaunch('/pages/account/index')
			}
		}
		if(curRoute.includes('pages/register')){
			if(state.hasLogin){
				// this.reLaunch('/pages/account/index')
			}
		}
		
	},
}