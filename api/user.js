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

/**
 * 
 */
export function register(phone, yzm, pwd, userid = 0, siteid = 0) {
    return fly.get({
        url: 'member/loginbyphone',
        params:{
            phone: phone,
            yzm: yzm,
            pwd: pwd,
            userid: userid,
			siteid: siteid
        }
    })
}

/**
 * @description 添加用户收货地址
 * 
 * @param {string} UserID	用户 ID
 * @param {Object} params	添加的收货地址对象
 */
export function addAddr(UserID, params) {
	return fly.get({
		url: 'useradress/adduseradress',
		params: {
			UserID: UserID,
			...params
		}
	})
}

/**
 * @description 获取用户收货地址列表
 * 
 * @param {string} UserID	用户 ID
 */
export function getAddrList(UserID) {
	return fly.get({
		url: 'useradress/useraddresslist',
		params: {
			UserID: UserID
		}
	})
}

/**
 * @description 删除收货地址
 * 
 * @param {stirng} UserAddressID	要删除的收货地址 id
 */
export function delAddr(UserAddressID) {
	return fly.get({
		url: 'useradress/deleteuseradress',
		params: {
			UserAddressID: UserAddressID,
		}
	})
}

/**
 * @description 设置默认收货地址
 * 
 * @param {string} UserAddressID
 */
export function setDefaultAddr(UserAddressID) {
	return fly.get({
		url: 'useradress/isdefaultadress',
		params: {
			UserAddressID: UserAddressID
		}
	})
}

/**
 * @description 		通过收货地址 ID 获取收货地址详情
 * 
 * @param {Object} UserAddressID		收货地址 ID
 */
export function getAddr(UserAddressID) {
	return fly.get({
		url: 'useradress/getuseradressbyid',
		params: {
			UserAddressID: UserAddressID
		}
	})
}

/**
 * @description 获取用户优惠券列表
 * 
 * @param {Object} userid	用户 ID
 */
export function getClipCouponsList(userid) {
	return fly.get({
		url: 'mymember/ClipCouponsList',
		params: {
			userid: userid
		}
	})
}

export function getClipCoupons(userid, storeid) {
	return fly.get({
		url: 'mymember/MyClipCoupons',
		params: {
			userid: userid,
			storeid: storeid
		}
	})
}

/**
 * @description 					修改用户信息
 * 
 * @param {Object} userID			用户 ID
 * @param {Object} faceUrl			头像地址
 * @param {Object} nickName			昵称
 */
export function editUserInfo(userID, faceUrl, nickName) {
	return fly.get({
		url: 'member/ediuser',
		params: {
			userid: userID,
			faceurl: faceUrl,
			nick: nickName
		}
	})
}

/**
 * @description								设置密码
 * 
 * @param {Object} phone					电话号码
 * @param {Object} newPass					新密码
 */
export function setPass(phone, newPass, code) {
	return fly.get({
		url: 'member/findpwd',
		params: {
			no: phone,
			pwd: newPass,
			yzm: code
		}
	})
}

/**
 * @param {Object} userid												用户 ID
 * @param {Object} bankName												开户行
 * @param {Object} bankUserName											银行卡开户人
 * @param {Object} bankNo												银行卡号
 */
export function bindBankCard(userid, bankName, bankUserName, bankNo) {
	return fly.get({
		url: 'scores/bdyhk',
		params: {
			userid: userid,
			BankName: bankName,
			BankUserName: bankUserName,
			BankNo: bankNo
		}
	})
}

/**
 * @description 								绑定支付宝
 * 
 * @param {Object} userid						用户 ID
 * @param {Object} name							支付宝昵称
 * @param {Object} no							支付宝账号
 */
export function bindAlipay(userid, name, no) {
	return fly.get({
		url: 'scores/bdzfb',
		params: {
			userid: userid,
			zfbname: name,
			zfbno: no
		}
	})
}

export function setPayPass(userid, yzm, newpwd) {
	return fly.get({
		url: 'member/resetjypwd',
		params: {
			userid: userid,
			yzm: yzm,
			newpwd: newpwd
		}
	})
}


export function addAgent(userID, name, phone,area) {
	return fly.get({
		url: 'agent/addagent',
		params: {
			userID: userID,
			name: name,
			phone: phone,
			sort: 5,
			area: area
		}
	})
}
