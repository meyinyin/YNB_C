import Vue from 'vue'
import fly from '@/api/http.js'
import {allApi} from './handle.js'

export function outPut(ary){
	if(ary[1]!=null){
		return ary[1]
	}
	return ary[0]
}

export const HttpRequest_ = {
	get:async function(url,data,showLoading = false,showLoadingObj = {},restartNum = 1,err = null){
		if(restartNum<0){
			uni.showToast({
				icon: 'none',
				title: 'Layer network is abnormal, please try again later'
			})
			return [err,null]
		}
		let timeID = 0
		let showLoading_ = false
		if(showLoading){
			timeID = setTimeout(()=>{
				showLoading_ = true
				allApi.showLoading_(showLoadingObj)
			},500)
		}
		try{
			let res = await fly.get({url,params:data})
			if(timeID!=0){
				if(showLoading_){
					uni.hideLoading()
				}
				clearTimeout(timeID)
			}
			// console.log(res)
			return [null,res]
		}catch(e){
			if(timeID!=0){
				if(showLoading_){
					uni.hideLoading()
				}
				clearTimeout(timeID)
			}
			// console.log(e)
			restartNum = restartNum-1
			return HttpRequest_.get(url,data,showLoading,showLoadingObj,restartNum,e)
		}
	},
	post:async function(url,data,baseURL = '',isZf = false,restartNum = 1,err = null){
		let payBaseURL = 'https://api.ynbs.xyz/api/'
		if(restartNum<=0){
			uni.showToast({
				icon: 'none',
				title: 'Layer network is abnormal, please try again later'
			})
			return [err,null]
		}
		if(baseURL.length===0){
			if(isZf){
				uni.showLoading({
				    title: '加载中',
				    mask: true
				})
				baseURL = payBaseURL
				// console.log(data,'起初开始发请求')
			}else{
				baseURL = Vue.prototype.$BASEURL
			}
		}
		// console.log(url,data,baseURL)
		try{
			let res = await fly.post(url,data,{baseURL})
			uni.hideLoading()
			console.log([null,res],767676)
			return [null,res]
		}catch(e){
			uni.hideLoading()
			if(isZf){
				data.out_trade_no = (new Date()).getTime()
			}
			if(baseURL==='https://api.ynbs.xyz/api/'){
				baseURL = 'https://api.ynbs.xyz/api/'
			}
			//https://api.ynbs.xyz/api/
			if(baseURL === 'https://api.ynbs.xyz/api/'){
				baseURL = 'https://api.ynbs.xyz/api/'
			}
			restartNum = restartNum-1
			// console.log(data)
			return HttpRequest_.post(url,data,baseURL,isZf,restartNum,e)
		}
	}
}

export const HttpRequest = {
	get:async function(url,data){
		return outPut(await HttpRequest_.get(url,data))
	},
	post:async function(url,data){
		return outPut(await HttpRequest_.post(url,data))
	}
}



