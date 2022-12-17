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

/**
 * 获取抽奖信息
 * @param {Object} id 
 */
export function getCJ(data) {
	return fly.get({
		url: 'cj/getcj',
		params:data
	})
}



export function getToCJ(userid,kjxxid) {
	console.log(55555555555555555555555555)
	return fly.get({
		url: 'cj/cj',
		params: {
			userid: userid,
			kjxxid:kjxxid
		}
	})
}

export function getMyPrize(userid,sort,page = 1,pagesize = 10) {
	return fly.get({
		url: 'cj/getmyprize',
		params: {
			userid: userid,
			sort:sort,
			page:page,
			pagesize:pagesize
		}
	})
}
/*中奖的列表
*/
export function getPriceList() {
	return fly.get({
		url: 'cj/getpricelist',
	})
}

/*
读取中奖的奖品
*/
export function getAward(jid) {
	return fly.get({
		url: 'cj/getaward',
		params: {
			jid: jid
		}
	})
}

// 申领奖品
export function toSl(userid,kjjlid,addressid) {
	return fly.get({
		url: 'cj/sl',
		params: {
			userid: userid,
			kjjlid:kjjlid,
			addressid:addressid
		}
	})
}

