import $http from '../api/index.js'

// #ifdef MP-WEIXIN || H5
/**
 * @description 微信小程序获取 openid ，同时获取的还有 session_key , 如果 unionid 存在的话，还拿到了 unionid
 */
export function getWxAppletsOpenid() {
    return new Promise((resovle, reject) => {
        uni.login({
            provider: 'weixin',
            success: (res) => {
				console.log(res)
                $http.getWxOpenid(res.code).
                then(res => {
                        try {
                            let d = JSON.parse(res.Data)
                            resovle({
                                status: true,
                                data: d,
                                Msg: '获取 openid 成功'
                            })
                        } catch (e) {
                            console.log('解析 openid 失败', e)
                            reject({
                                status: false,
                                Msg: '解析 openid 失败',
                                err: e
                            })
                        }
                    })
                    .catch(err => {
                        console.log('获取 openid 失败', err)
                        reject({
                            status: false,
                            Msg: '获取 openid 失败',
                            err: err
                        })
                    })
            },
            fail: (err) => {
                console.log('获取 openid 时，获取 js_code 失败', err)
                reject({
                    status: false,
                    Msg: '获取 openid 时，获取 js_code 失败',
                    err: err
                })
            }
        })
    })
}

/**
 * @description 微信小程序付款
 * 
 * @param {number} total_amount 订单金额
 * @param {string} description  订单描述
 * @param {string} out_trade_no 订单号，不传则使用当前时间戳
 * 
 * @return {Promise} 支付结果
 */
export function wxAppletsPay(payData) {
    // 处理订单编号，未传参时使用当前时间戳
    // if (!out_trade_no) {
    //     out_trade_no = (new Date()).getTime()
    // }
    // 获取 openid
    return new Promise( (resovle, reject) => {
        getWxAppletsOpenid()
        .then( res => {
			payData.openid = res.data.openid
            $http.getWxAppletOrderInfo(payData)
            .then( res => {
                let data
                try{
                    data = JSON.parse(res.OrderInfo)
                    data.timeStamp = String(data.timeStamp)
					console.log(data)
                }catch(e){
                    console.log('解析订单失败：', e);
                    reject({
                        status: false,
                        msg: '解析订单失败',
                        err: e
                    })
                }
                uni.requestPayment({
                    provider: 'wxpay',
                    orderInfo: res.OrderInfo,
                    ...data,
                    success: async (res) => {
                        resovle({
                            status: true,
                            msg: '支付成功',
                            data: res
                        })
                    },
                    fail: async (err) => {
                        if (err.errMsg.includes('cancel')) {
                            uni.showModal({
                                title: '支付失败',
                                content: '用户取消支付',
                                showCancel:false
                            })
                        } else {
                            reject({
                                status: false,
                                msg: '支付失败',
                                err: err
                            })
                        }
                    }
                })
            })
            .catch( err => {
                reject({
                    status: false,
                    msg: '创建订单失败',
                    err: err
                })
            })
        })
        .catch( err => {
            reject({
                status: false,
                msg: '获取 openid 失败 支付接口',
                err: err
            })
        })
    })
}
// #endif

// #ifdef MP-ALIPAY || H5
/**
 * @description 支付宝小程序获取用户的 userid，该参数支付的时候需要用到
 */
export function getAlipayAppletsUserid(){
    return new Promise( (resolve, reject) => {
        my.getAuthCode({
            scopes: 'auth_user',
            success: res => {
                $http.getAlipayUserID(res.authCode)
                .then( res => {
                    resolve({
                        status: true,
                        data: JSON.parse(res.Data).alipay_system_oauth_token_response,
                        msg: '获取用户 userid 成功'
                    })
                })
                .catch( err => {
                    reject({
                        status: false,
                        err: err,
                        msg: '获取用户 userid 失败'
                    })
                })
            },
            fail: err => {
                reject({
                    status: false,
                    err: err,
                    msg: '获取用户授权信息失败'
                })
            }
        })
    })
}

/**
 * @description 支付宝小程序支付
 * 
 * @param {number} total_amount     订单金额
 * @param {string} description      订单描述
 * @param {string} userid           发起支付的商户内部用户编号
 * @param {string} out_trade_no     订单编号，不传则默认为当前时间戳
 * 
 * @return {Promise} 支付结果
 */
export function alipayAppletsPay(payData){
    uni.showLoading({
        title: '加载中',
        mask: true
    })
    // 处理订单编号，未传参时使用当前时间戳
    
    return new Promise( (resolve, reject) => {
        getAlipayAppletsUserid()
        .then( res => {
			payData.buyerid = res.data.user_id
            $http.getAlipayAppletOrderInfo(payData)
            .then( res => {
                uni.hideLoading()
                uni.requestPayment({
                    provider: 'alipay',
                    orderInfo: res.TradeNo,
                    success: res => {
                        if(res.resultCode.includes('6001')) {
                            uni.showModal({
                                title: '支付失败',
                                content: '用户取消支付',
                                showCancel:false
                            })
                        } else {
                            resolve({
                                status: true,
                                msg: '支付成功',
                                data: res
                            })
                        }
                    },
                    fail: err => {
                        reject({
                            status: false,
                            msg: '支付失败',
                            err: err
                        })
                    }
                })
            })
            .catch( err => {
                reject({
                    status: false,
                    msg: '获取订单信息出错',
                    err: err
                })
            })
        })
        .catch( err => {
            reject({
                status: false,
                err: err,
                msg: '获取 userid 出错'
            })
        })
    })
    
}
// #endif

// #ifdef APP-PLUS || H5
/**
 * @description 微信和支付宝的 APP 支付
 * 
 * @param {number} total_amount     订单金额
 * @param {string}  body            订单描述信息，支付宝独有的订单简介信息和此信息相同
 * @param {string}  userid          支付商户内部的用户编号
 * @param {string}  paymentWay      支付方式，可选值为 微信 和 支付宝，默认为 微信
 * @param {string}  out_trade_no    订单编号，不传参数则默认为当前时间戳
 * 
  * @return {Promise} 支付结果
 */
export function appPayment(data,paymentWay){
    uni.showLoading({
        title: '加载中',
        mask: true
    })
    
    // if(!out_trade_no) {
    //     out_trade_no = (new Date()).getTime()
    // }
    return new Promise( (resolve, reject) => {
        $http.getAppOrderInfo(data,paymentWay)
        .then( res => {
			console.log(res)
			
            uni.hideLoading()
            let provider
            if (paymentWay === '微信') {
                provider = 'wxpay'
            } else {
                provider = 'alipay'
            }
            
            uni.requestPayment({
                provider: provider,
                orderInfo: res.OrderInfo,
                success: res => {
                    resolve({
                        status: true,
                        data: res,
                        msg: '支付成功'
                    })
                },
                fail: err => {
                    if(err.errMsg.includes('canceled') || err.errMsg.includes('取消')) {
                        uni.showModal({
                            title: '支付失败',
                            content: '用户取消支付',
                            showCancel: false
                        })
                    } else {
                        reject({
                            status: false,
                            err: err,
                            msg: '支付失败'
                        })
                    }
                }
            })
            
        })
        .catch( err => {
			console.log(err)
            reject({
                status: false,
                err: err,
                msg: '获取订单信息失败'
            })
        })
    })
}
// #endif



/**
 * @description 解码微信的加密信息，获取用户 unionid 和电话号码
 * 
 * @param {object} encrypted 加密数据
 * 
 * @return {Promise} 解密结果
 */
// #ifdef MP-WEIXIN
let WXBizDataCrypt = require('./WXBizDataCrypt.js')
const appletsAppid = 'wx3f9dd445a05f389c'
export function decrypt(encrypted) {
	if (encrypted.hasOwnProperty('detail')) {
		encrypted = encrypted.detail
	}
	let {
		encryptedData,
		iv,
		errMsg
	} = encrypted
	if (errMsg.includes('deny')) {
		uni.showModal({
			title: '获取权限失败',
			content: '用户拒绝授权',
			showCancel: false
		})
		return Promise.reject({
			status: false,
			msg: '用户拒绝授权',
			err: errMsg
		})
	}
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中',
			// #ifndef MP-ALIPAY
			mask: true
			// #endif
		})
		getWxAppletsOpenid()
			.then(res => {
				console.log(iv)
				let handle = new WXBizDataCrypt(appletsAppid, res.data.session_key)
				let data = handle.decryptData(encryptedData, iv)
				uni.hideLoading()
				resolve({
					status: true,
					msg: '解码成功',
					data: data
				})
			})
			.catch(err => {
				uni.hideLoading()
				reject({
					status: false,
					msg: '解码失败',
					err: err
				})
			})
	})
}
// #endif