// import fly from './http'

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

export function getShopList(data) {
	return fly.get({
		url: 'store/gettjlist',
		params: data
	})
}

export function getStoreByID(id) {
	return fly.get({
		url: 'mystore/getstore',
		params: {
			storeid: id
		}
	})
}

export function getStoreBySortID(params) {
	return fly.get({
		url: 'store/listbysort', 
		params
	})
}

export function getStoreSort() {
	return fly.get({
		url: 'store/getstoresortlist',
		params: {
			num: 0,
			siteid: 0
		}
	})
}

export function getWmSortList() {
    return fly.get({
        url: 'wm/wmsortlist'
    })
}

export function getStoreSortList(siteid = 0, num = 0) {
	return fly.get({
		url: 'store/getstoresortlist',
		params: {
			siteid: siteid,
			num: num
		}
	})
}

export function getWmList(storeid) {
    return fly.get({
        url: 'wm/wmlist',
        params: {
            storeid: storeid
        }
    })
}

/** 外卖推荐list
 * @param {Object} storeid 店铺id
 */
export function getWmTJlist(storeid) {
	return fly.get({
		url: 'wm/wmtjlist',
		params: {
			storeid: storeid,
		}
	})
}

/**
 * @description 通过公码 ID 获取对应的店铺信息
 * 
 * @param {stirng} ewmid    二维码 ID
 */
export function getStoreByEWM(ewmid) {
    return fly.get({
			url:'newlogin/getstore',
			params:{
				ewmid: ewmid
			}
		})
}

/**
 * @description 创建订单
 * 
 * @param {Object} orderInfo	订单信息
 */
export function createDD(orderInfo) {
	return fly.post(
		'order/createdd',
		orderInfo
	)
}




export function payOrder(orderID, userID) {
	return fly.get ({
		url: 'order/payorder',
		params: {
			oid: orderID,
			userid: userID
		}
	})
}

export function getAllStore(siteid = 0, pagesize = 10, page = 1) {
	return fly.get ({
		url: 'store/getstorelistbysite',
		params: {
			siteid: siteid,
			pagesize: pagesize,
			page: page
		}
	})
}

/**
 * @description 					获取用户的所有订单
 * 
 * @param {String} userID 			用户 ID
 * @param {Number} page 			页码
 * @param {Number} pagesize 		每页的数量
 */
export function getMyOrder(userID, page = 1, pagesize = 5) {
	return fly.get ({
		url: 'myprofile/getmyorderlist',
		params: {
			userid: userID,
			page: page,
			pagesize: pagesize
		}
	})
}

/**
 * @description 				根据订单编号获取订单
 * 
 * @param {Object} orderID		订单编号
 */
export function getOrderById (orderID) {
	return fly.get({
		url: 'order/getorderinfobyid',
		params: {
			ddid: orderID
		}
	})
}


export function getHaiBaoUrl(data){
	return fly.get({
		url: 'hb/newscstore',
		params:data
	})
}