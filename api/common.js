// import fly from './http'
import BigNumber from 'bignumber.js'
const payBaseURL = ''

import {HttpRequest_,outPut} from '../common/httpRequest.js'

const fly = {
	async get(...args){
		let infoObj ={}
		if(args.length===1){
			infoObj = args[0]
		}else if(args.length===2){
			infoObj = {
				url:args[0],
				params:args[1]
			}
		}
		console.log(args)
		
		let {url,params} = infoObj
		console.log(url,params)
		return outPut(await HttpRequest_.get(url,params))
	},
	async post(url,data,{baseURL}){
		console.log(url,data,baseURL,141414)
		return outPut(await HttpRequest_.post(url,data,baseURL,true))
	}
}







// #ifdef MP-WEIXIN
/**
 * 
 * @param {string} js_code 微信临时授权码
 * 
 * @return {Promise} 请求的结果
 */
//GetOpenid/getopenid
//


export function getWxOpenid(js_code) {
	return fly.get({
		url: 'GetOpenid/storegetopenid',
		params: {
			js_code: js_code
		}
	})
}

/**
 * @description 获取微信小程序的支付订单号
 * 
 * @param {number} total_amount
 * @param {stirng} description
 * @param {stirng} openid
 * @param {stirng} out_trade_no
 * 
 * @return {Promise} 请求的结果
 */



/**
 * @description 获取微信小程序的支付订单号
 * 
 * 
 * @param {number} total_amount 订单金额
 * @param {stirng} description 订单描述
 * @param {stirng} openid
 * @param {stirng} out_trade_no 订单号，不传则使用当前时间戳
 * @param {Number} userid 用户id 默认为0
 * @param {number} zfsort 支付需求:  1:纯粹的充值操作 2：商户收款, 3:订单收款 
 * @param {string} buyerid : ''  
 * @param {number} CCouponsID 优惠券id  
 * @param {number} ddid 订单id
 * @param {number} storeid 店铺id   
 * @param {strName} subject 店铺名称  
 * @param {number} yyyid 营业员id
 * @param {number} real_amount 订单金额 
 * @param {string} jsos 当前支付的来源平台,默认：用过商家 
 * @param {number} tjrid 推荐人id
 * @param {string} nick 推荐人id
 * @return {Promise} 请求的结果
 * 
 */


export function getWxAppletOrderInfo(payData) {
	let x = new BigNumber(payData.total_amount)
	let y = x.multipliedBy(100);
	
	let total_amount = y.c[0]
	
	console.log(total_amount,66666)
	payData.total_amount = total_amount
    return fly.post(
        'Wechatpay/StoreAppletPay',payData,{
            baseURL: payBaseURL
        }
    )
}
// #endif

// #ifdef MP-ALIPAY

/**
 * @description 获取支付宝小程序用户的 openid
 * 
 * @param {string} code     支付宝小程序临时授权码
 * 
 * @return {Promise} 请求的结果
 */
export function getAlipayUserID(code) {
	return fly.get({
		url: 'getopenid/getstoreuserid',
		params: {
			code: code
		}
	})
}

/**
 * @description 获取支付宝小程序支付订单号
 * 
 * @param {Object} out_trade_no
 * @param {Object} total_amount
 * @param {Object} description
 * @param {Object} userid
 * @param {Object} buyerid
 * 
 * @return {Promise} 请求的结果
 */
export function getAlipayAppletOrderInfo(payData) {
    return fly.post(
        'Alipay/StoreAppletPay', payData, {
            baseURL: payBaseURL
        }
    )
}
// #endif

// #ifdef APP-PLUS
export function getAppOrderInfo(data,paymentWay) {
    let url = 'Wechatpay/StoreAppPay'     
	
	if(paymentWay==='微信'){
		data.total_amount = data.total_amount*100
	}
    if(paymentWay === '支付宝') {
        url = 'Alipay/StoreAppPay'
        // data.total_amount = total_amount
        // data.subject = body
    }
    
    return fly.post(
        url, 
        data, 
        {
            baseURL: payBaseURL
        }
    )
}
// #endif

export function getCode(phone) {
	return fly.get({
		url: 'sms/getyzm',
		params: {
			mobile: phone
		}
	})
}

/**
 * @description 结算
 * 
 * @param {Object} userid					用户 ID
 * @param {Object} yyyid					营业员 ID
 * @param {Object} storeid					店铺 ID
 * @param {Object} num						付款金额
 * @param {Object} CCouponsID				优惠券 ID
 * @param {Object} orderInfo				订单号
 */
export function js(data) {
	return fly.get({
		url: 'scores/js',
		params:data
	})
}





export function loginWithWx( phone, nickname, headimgurl, openid, unionid, pid = 0, yyyid = 0, siteid = 0 , yzm = 0,iswx = true) { 	
	return fly.get({
			url:'member/registerwx',
			params:{
				phone: phone,
				nickname : nickname,
				headimgurl: headimgurl,
				openid:openid,
				unionid:unionid,
				pid: pid,
				yyyid: yyyid,
				siteid: siteid,
				yzm:yzm,
				iswx
			}
		}
	)
}



export function getSite(phone) {
	return fly.get({
		url: 'site/list'
	})
}



export function getTTList(siteid) {
	return fly.get({
		url: 'news/listttlist',
		params: {
			siteid: siteid
		}
	})
}

export function getAdvertTopList(siteid) {
	return fly.get({
		url: 'advert/adverttoplist',
		params: {
			siteid: siteid
		}
	})
}


export function getAdvertwmlist(siteid) {
	return fly.get({
		url: 'advert/advertwmlist',
		params: {
			siteid: siteid
		}
	})
}


export function getVerifyCode(phone) {
    return fly.get({
        url: 'sms/getyzm',
        params: {
            mobile: phone
        }
    })
}

/*
首页读取是否有当前站点置顶的活动
*/
export function getHd(siteid) {
    return fly.get({
        url: 'hd/ishd',
      params: {
      	siteid: siteid
      }
    })
}

/*

*/
export function selectHB(userid) {
    return fly.get({
        url: 'scores/chbbt',
      params: {
      	userid: userid
      }
    })
}

export function getAlipayPhone(encryData) {
	return fly.get({
		url: 'getopenid/getphone',
		params: {
			str: encryData
		}
	})
}

export function getConfig() {
	return fly.get({
		url: 'common/config'
	})
}

export function inspectCode(phone,yzm,dt) {
	return fly.get({
		url: 'member/yzmislost',
		params: {
			phone: phone,
			yzm:yzm,
			dt: dt
		}
	})
}