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


export function setPersonInfo(data) {
   //  return fly.post(
			// 'myprofile/editpromember', 
			// data
			// )
		return fly.get({
		    url: 'myprofile/editpromember',
		    params:data
		}) 
}

export function setFaceURLandNick(data){//设置头像和昵称
	return fly.get({
	    url: 'myprofile/edituser',
	    params:data
	})
}


export function setMyXinQing(data){
	return fly.get({
	    url: 'myprofile/editmytitle',
	    params:data
	})
}



export function setMyPhoto(data){
	return fly.get({
	    url: 'myprofile/editmyphoto',
	    params:data
	})
}


export function beforeShiMingRenZheng(data){//实名认证前置查询
	return fly.get({
	    url: 'member/smrzpre',
	    params:data
	})
}



export function shiMingRenZheng(data){//实名认证
	return fly.get({
	    url: 'member/smrz',
	    params:data
	})
}

export function myTask(data){//我领取的任务
	return fly.get({
	    url: 'bbtask/mytasklist',
	    params:data
	})
}


export function mySendTask(data){//我发布的任务
	return fly.get({
	    url: 'bbtask/mypublishtask',
	    params:data
	})
}

export function refreshUser(data){//刷新用户信息
	return fly.get({
	    url: 'member/myinfo',
	    params:data
	})
}


/**
 * 是否可以签到
 * @param {Object} data 
 */
export function isqd(userid){
	return fly.get({
	    url: 'menber/isqd',
	    params:{
			userid:userid
		}
	})
}


/**
 * 签到
 * @param {Object} data 
 */
export function qd(userid){
	return fly.get({
	    url: 'menber/qd',
	    params:{
			userid:userid
		}
	})
}

//获取超赞、关注、粉丝 列表
export function getMyCallTogether(data){
	return fly.get({
	    url: 'myprofile/mycalltogether',
	    params:data
	})
}




export function getMsgfeedbacklist(data){//获取客服聊天信息
	return fly.get({
	    url: 'message/msgfeedbacklist',
	    params:data
	})
}



export function sendMsgfeedback(data){//发送反馈意见
	return fly.get({
	    url: 'message/msgfeedback',
	    params:data
	})
}

export function getShouCangShop(data){//收藏店铺列表
	return fly.get({
	    url: 'store/collectionlist',
	    params:data
	})
}



export function getMeiricommonproblem(data){//帮助与反馈
	return fly.get({
	    url: 'news/meiricommonproblem',
	    params:data
	})
}

export function getMeiriDetail(data){//帮助与反馈
	return fly.get({
	    url: 'news/meiridetail',
	    params:data
	})
}


export function getAboutUs(data){//关于我们
	return fly.get({
	    url: 'news/about',
	    params:data
	})
}


//
export function getMycontribution(data){//我的贡献榜
	return fly.get({
	    url: 'myprofile/mycontribution',
	    params:data
	})
}

export function getLookactivitylist(data){//获取活动列表接口
	return fly.get({
	    url: 'bbtask/lookactivitylist',
	    params:data
	})
}


export function getPhoneNick(data){//根据电话号码找昵称
	return fly.get({
	    url: 'member/getnamebyphone',
	    params:data
	})
}


export function sendMoney(data){//转账
	return fly.get({
	    url: 'scores/zhuangscores',
	    params:data
	})
}

export function tiXian(data){//提现
	return fly.get({
	    url: 'scores/tx',
	    params:data
	})
}


export function getMyprofit(data){//我的收益
	return fly.get({
	    url: 'scores/myprofit',
	    params:data
	})
}


export function getJflist(data){//积分详情
	return fly.get({
	    url: 'jl/jflist',
	    params:data
	})
}


export function getYelist(data){//余额详情
	return fly.get({
	    url: 'jl/yelist',
	    params:data
	})
}

export function getKdlist(data){//看点详情
	return fly.get({
	    url: 'jl/kdlist',
	    params:data
	})
}

export function getMyNoreadNum(data){//获取个人中心的信息
	return fly.get({
	    url: 'myprofile/mynoreadnum',
	    params:data
	})
}

export function getmyorderlistbyriderid(data){//获取骑手的外卖订单
	return fly.get({
	    url: 'myprofile/getmyorderlistbyriderid',
	    params:data
	})
}

export function riderjd(data){//骑手接单
	return fly.get({
	    url: 'order/riderjd',
	    params:data
	})
}

export function ridersd(data){//骑手确认送达
	return fly.get({
	    url: 'order/ridersd',
	    params:data
	})
}

export function riderjj(data){//骑手拒绝接单
	return fly.get({
	    url: 'order/riderjj',
	    params:data
	})
}


export function userjj(data){//用户取消外卖订单
	return fly.get({
	    url: 'order/userjj',
	    params:data
	})
}

export function userpj(data){//用户评价外卖订单
	return fly.get({
	    url: 'order/userpj',
	    params:data
	})
}

export function userts(data){//用户投诉外卖订单
	return fly.get({
	    url: 'order/userts',
	    params:data
	})
}


export function setCidUserId(data){
	return fly.get({
		url:'push/info',
		params:data
	})
}

export function isSqdpUrl(data){
	return fly.get({
		url:'membertoshop/sqdppre',
		params:data
	})
}

export function getListbyuser(data){
	return fly.get({
		url:'storeshopdd/listbyuser',
		params:data
	})
}
export function lingQuCoupon(data){
	return fly.get({
		url:'yhq/lqyhq',
		params:data
	})
}