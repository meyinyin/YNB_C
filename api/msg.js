
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

export function getMsg(userid){//获取我的消息列表
	return fly.get({
	    url: 'message/msgbyuser',
	    params:{userid:userid}
	})
}

export function getMsglist(userid,msgsortid,page){//获取我的消息列表
	return fly.get({
	    url: 'message/msglist',
	    params:{
			userid:userid,
			msgsortid:msgsortid,
			page:page
		}
	})
}