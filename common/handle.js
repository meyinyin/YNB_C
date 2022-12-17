import {refreshUser,isSqdpUrl,lingQuCoupon} from '@/api/person.js' 
import {getHaiBaoUrl} from '@/api/store.js' 
// import GoEasy from '../js_sdk/goEasy/goeasy-1.0.7.js'
import vueX from '../store/store.js'



import Vue from 'vue';
const GoEasy = {}
export const allApi = {
	createdGoEasy(self,userId,userInfo){//创造goeasy实例
		let userId_ = `ueserId_${userId}`
		let userData = JSON.stringify(userInfo)
		console.log('创建实例')
		return new Promise((res,rej)=>{
			let $GoEasy =  new GoEasy({
			    host:'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io | singapore.goeasy.io】
			    appkey:'BC-a05f30a375d846e3960effe00d14dff1', //替换为您的应用appkey
			    userId:userId_,
				userData,
				onConnected: () => {
					console.log('连接成功！')
					// console.log($GoEasy)
					Vue.prototype.$goEasy = $GoEasy
					
					// #ifdef APP-PLUS
					getApp().globalData.$goEasy = $GoEasy
					// #endif
					
					//订阅指令状态码
					allApi.receiveStatusCode(self)
					
					//订阅接收信息
					allApi.receiveImMsg(userId,self)
					
					self.commit('setGoEasyStatus',true)//设置全局goeasy 断开或链接状态
					self.commit('setIsGoEasyConnect',true)
					res('ok')
				},
			    onDisconnected: () => {
					self.commit('setGoEasyStatus',false)//设置全局goeasy 断开或链接状态
			        self.commit('setIsGoEasyConnect',false)
					res('err')
					console.log('连接断开！')
			    },
			    onConnectFailed: (error) => {
					self.commit('setGoEasyStatus',false)//设置全局goeasy 断开或链接状态
			        self.commit('setIsGoEasyConnect',false)
					res('err')
					console.log('连接失败或错误！',error)
			    }
			});
		})
		
	},
	disconnectGoEasy(){//断开链接
		console.log(Vue.prototype.$store.state.isGoEasyConnect)
		let $goEasy = Vue.prototype.$goEasy;
		Vue.prototype.$store.commit('setIsGoEasyConnect',false)
		$goEasy.disconnect();
	},
	reconnectGoEasy(){//重新链接
		let $goEasy = Vue.prototype.$goEasy;
		if($goEasy){
			console.log('重连成功')
			Vue.prototype.$store.commit('setIsGoEasyConnect',true)
			$goEasy.reconnect();
			return 
		}else{
			console.log('重连im 创建实例')
			allApi.createdGoEasy(vueX,0,{})
		}
	},
	receiveStatusCode(self){//接收指令状态码
		let $goEasy = Vue.prototype.$goEasy;
		let channel = `UserStatusCode`
		console.log('订阅状态指令')
		$goEasy.subscribe({//接收指令
		    channel, //替换为您自己的channel
		    onMessage:(message)=>{
				console.log(message)
				let messageData = JSON.parse(message.content)
				let userStatusCode  = messageData.userStatusCode
				let userStatusCodeInfo = messageData.userStatusCodeInfo
				self.commit('userStatusCodeChange',userStatusCode)
				self.commit('userStatusCodeChangeInfo',userStatusCodeInfo)
			}
		})
	},
	receiveImMsg(userId,self){//接收别人给我发的信息
		let userTalkChannel = `userTalkChannel_${userId}`
		let $goEasy = Vue.prototype.$goEasy;
		console.log('订阅信息信道')
		$goEasy.subscribe({
			channel:userTalkChannel,
			onMessage:(message)=>{
				
				let content = JSON.parse(message.content)
				
				let usTalkerMsgList = self.state.usTalkerMsgList
				
				usTalkerMsgList.push(content)
				
				console.log(content)
				
				
				let usTalkerMsgListLength = usTalkerMsgList.length
				
				self.commit('setUsTalkerMsgListLength',usTalkerMsgListLength)
				self.commit('setUsTalkerMsgList',usTalkerMsgList)
				self.commit('setHasNewMsg',true)
				
				console.log(self.state.usTalkerMsgList)
				// this.screenMsg(content)
				// console.log("Channel:" + message.channel + " content:" + message.content);
			}			   
		});	
	},
	unsubscribe(channel){//取消订阅
		let $goEasy = Vue.prototype.$goEasy;
		$goEasy.unsubscribe({
		    channel,
		    onSuccess: function () {
		        console.log("订阅用户登录取消成功。");
		    },
		    onFailed: function (error) {
		        console.log("取消订阅失败，错误编码：" + error.code + " 错误信息：" + error.content)
		    }  
		});
	},
	
	
	
	watchLogin(userId,channel,timeFlag,self,userInfo){//单点登陆
		// this.createdGoEasy(self,userId,userInfo)
		let $goEasy = Vue.prototype.$goEasy;
		if(process.env.NODE_ENV != 'development'){
			let setIntervalId = setInterval(()=>{
				if(void(0)!=$goEasy){
					clearInterval(setIntervalId)
					console.log($goEasy)
					let messageData = {
						userId,
						timeFlag
					};
					let message = JSON.stringify(messageData);
					$goEasy.publish({//发送指令
					    channel,
					    message
					});
					$goEasy.subscribe({//接收指令
					    channel, //替换为您自己的channel
					    onMessage:(message)=>{
							let messageData = JSON.parse(message.content)
							let messageDataTimeFlag = messageData.timeFlag
							if(messageDataTimeFlag===timeFlag){
								console.log('是自己登录')
							}else{
								uni.showToast({
									duration:2000,
									title:'当前账号已在其他设备登录',
									icon:'none',
									mask:true
								})
								self.commit('logout')
								console.log('不是自己登录')
								uni.reLaunch({
									url:'/pages/Index/index'
								})
							}
					    }
					});
				}
			},300)
		}else{
			console.log('开发环境 不进行单点登录')
		}
	},
	
	//开地图
	openMap(infoObject){
				var Location=infoObject.Location.split(',').reverse().join()
				var lat =infoObject.Location.split(',')[1]
				var lon =infoObject.Location.split(',')[0]
				// console.log(lat,lon)
				
				// #ifdef APP-PLUS
				var url = "";  
	            if (plus.os.name=="Android") {  
	                var hasBaiduMap = plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'});  
	                var hasAmap = plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'androidamap://'}); 
					 
	                var urlBaiduMap = `baidumap://map/marker?location=${Location}&title=${infoObject.StoreName}`;  
					
	                var urlAmap = `androidamap://viewMap?poiname=${infoObject.StoreName}&lat=${lat}&lon=${lon}&dev=0`  
					
	                if (hasAmap && hasBaiduMap) {  
						console.log(11111)
	                    plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"高德地图"}]}, function(e){  
	                        switch (e.index){  
	                            case 1:  
	                                plus.runtime.openURL(urlBaiduMap);  
	                                break;  
	                            case 2:  
	                                plus.runtime.openURL(urlAmap);  
	                                break;  
	                        }  
	                    })  
	                }  
	                else if (hasAmap) {  
						//打开高德地图
	                    plus.runtime.openURL(urlAmap);  
	                }  
	                else if (hasBaiduMap) { 
						//打开百度地图
	                    plus.runtime.openURL(urlBaiduMap);  
	                }else{
						//打开高德地图的网页
						plus.runtime.openURL(`https://m.amap.com/search/mapview/keywords=${encodeURIComponent(infoObject.StoreAddress)}&city=610702&poiid=${encodeURIComponent(infoObject.StoreName)}`,(res=>{
						}))
						// uni.showToast({
						// 	duration:2000,
						// 	title:'请安装高德地图或百度地图'
						// })
					}
	            } else{   
	                // iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）  
	                plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"高德地图"}]}, function(e){  
	                    console.log("e.index: " + e.index);  
	                    console.log(Location,infoObject.StoreName,infoObject.StoreAddress,lat,lon)
	                    switch (e.index){  
	                        // case 1:  
	                        //     url = `http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=${Location}&spn=0.008766,0.019441`;  
	                        //     break;  
	                        // case 2:  
	                        //     url = `baidumap://map/marker?location=${Location}&title=${encodeURIComponent(infoObject.StoreAddress)}`;  
	                        //     break;  
	                        case 1:  
	                            url = `iosamap://viewMap?sourceApplication=${encodeURIComponent(infoObject.StoreAddress)}&lat=${lat}&lon=${lon}&dev=0`;  
	                            break;  
	                        default:  
	                            break;  
	                    } 
	                    if (url!="") {  
	                        plus.runtime.openURL( url, function( e ) {  
	                            console.log(e)
	                            plus.nativeUI.alert("本机未安装指定的地图应用");  
	                        });  
	                    }  
	                })  
	            }  
				// #endif 
				
				// #ifdef MP-WEIXIN || H5 || MP-ALIPAY
				//latitude 维度
				//longitude 精度
				console.log(lon,lat)
				uni.openLocation({
					latitude:lat*1,
					longitude:lon*1,
					address:infoObject.StoreAddress,
					name:infoObject.StoreName,
					success:(res)=>{
						console.log(res)
					},
					fail:(err)=>{
						
					}
				})
				
				// #endif
	        },
/*
//压缩图片（app/微信小程序端）
src：图片路径
*/
   zipImage(src){
	   return Promise.resolve(src)
   	// // #ifdef APP-PLUS
   	// let index = src.lastIndexOf(".")
   	// let img_yuanshi = src.substring(0, index)
   	// let d2 = new Date().getTime();
   	// let img_type = src.substring(index + 1, src.length);
   	// return new Promise((resolve, rej) => {
   	// 	plus.zip.compressImage({
   	// 		src,
   	// 		dst: img_yuanshi + d2 + '.' + img_type,
   	// 		quality: 30,
   	// 	}, res => {
   	// 		resolve(res.target)
   	// 	}, err => {
   	// 		console.log(err);
   	// 		rej(err)
   	// 	});
   	// })
   	// // #endif
   	// // #ifdef MP-WEIXIN
   	// return new Promise((resolve, rej) => {
   	// 	uni.compressImage({
   	// 		src,
   	// 		success: (res) => {
   	// 			console.log(res, 1)
   	// 			let path = res.tempFilePath
   	// 			resolve(path)
   	// 			// this.imgList.push(path)
   	// 			// this.imgList.push
   	// 		},
   	// 		fail: (e) => {
   	// 			uni.showToast({
   	// 				title: '上传失败，请重新上传',
   	// 				duration: 2000
   	// 			})
   	// 		},
   	// 		complete: (val) => {
   	// 			console.log(val, 3)
   	// 		}
   	// 	})
   	// })
   	// #endif
   // // #ifdef H5
   // return Promise.resolve(src)
   // // #endif
   
   },
 /*****************************/  
 /*
 //统一提示全局方法
 
 title 提示稳重
 duration 时间
 mask 穿透
 icon 图标
 */
	msg(title, duration=1500, mask=false, icon='none'){
		if(Boolean(title) === false){
			return;
		}
		return uni.showToast({
			title,
			duration,
			mask,
			icon
		}).then(res=>{
			let [err,val] = res
			return val
		})
	 },
	 
	 msgText(title, duration=1500, mask=false,position='center'){
	 		if(Boolean(title) === false){
	 			return;
	 		}
	 		return uni.showToast({
	 			title,
	 			duration,
	 			mask,
	 			position,
				icon:'none'
	 		}).then(res=>{
	 			let [err,val] = res
	 			return val
	 		}) 
	 },
 /*****************************/  
 /*
 获取当前的日期
 eg: '2017-02-30'
 */
	getNowTime(){
		let day = (new Date()).Format("yyyy-M-d")
		return day
	},
/*****************************/
/*************模态窗确定与否*******************/
	showModal(obj) {
		obj = obj || {
			title: '您确定要离开嘛？',
			content: '退出当前页面内容不会被保存'
		}
		return uni.showModal(obj).then(data => {
			console.log({
				data
			})
			var [err, res] = data
			if (res.errMsg === 'showModal:ok') {
				if (res.confirm) {
					return true
				} else if (res.cancel) {
					return false
				}
			} else {
				// rej(err)
			}
		})
	},
/*************************************/
/*************手机号码加密*************/
	changePhone(phone){
		return phone.substr(0, 3) + '****' + phone.substr(phone.length - 4);
	},
/*************************************/	

/**************验证身份证*****************/
	isShenFenZheng(value, self) {
	    var idcardReg =
	        /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	    var flag = idcardReg.test(value)
	    if (!flag) {
	        self.$api.msg('您输入的身份证有误，请重新输入', 2000)
	        return flag
	    } else {
	        return flag
	    }
	},
/****************************************/
/* * @desciption 验证手机号码是否有效* @params string phone 电话号码* @params object obj vue实例对象* @params Boolean status[false] 电话号码不足11位时，验证失败是否需要提示* @return Boolean 是否有效 * */
	validatePhone(phone, obj) {
		if (phone.length === 11) {
			if ((/^1[3456789]\d{9}$/.test(phone))) {
				return true
			} else {
				if(obj){
					obj.$api.msg('您输入的电话号码无效')
					return false
				}else{
					this.msg('您输入的电话号码无效')
					return false
				}
				
			}
		}
	},
/****************************************/	
/***************格式化金额**********************/
	formatAmount(num,distNum = 2) {
		
	    let numStrAry = (num + '').split('')
	    let flag = numStrAry.includes('.')
	    if (flag) {
	        let index = numStrAry.indexOf('.')
			let nums = ''
			
			for (let it of numStrAry) {
			    if (it != '.') {
			        nums = nums + it
			    } else {
			        break
			    }
			}
			console.log(nums)
			for(let i = 1 ; i <= distNum ; i++){
				let distItem = numStrAry[index + i]
				if(distItem === void(0)){
					distItem = '0'
				}
				if(i===1){
					nums = `${nums}.${distItem}`
				}else{
					nums = `${nums}${distItem}`
				}
			}
	        return nums
	    }
	    return num + '' + '.00'
	},
	
	
/*******************************************/	

/*******************模态窗********************/

	showModal(obj) {
	    obj = obj || {
	        title: '您确定要离开嘛？',
	        content: '退出当前页面内容不会被保存'
	    }
	    return uni.showModal(obj).then(data => {
	        console.log({
	            data
	        })
	        var [err, res] = data
	        if (res.errMsg === 'showModal:ok') {
	            if (res.confirm) {
	                return true
	            } else if (res.cancel) {
	                return false
	            }
	        } else {
	            // rej(err)
	        }
	    })
	},
/****************************************/
	/*
	加载遮罩
	*/
	showLoading_(obj) {
	    // #ifdef MP-ALIPAY
	    obj = obj || {
	        title: 'loading...'
	    }
	    // #endif
	    // #ifdef APP-PLUS 
	    obj = obj || {
	        title: 'loading...',
	        mask: false
	    }
	    // #endif
	    // #ifdef MP-WEIXIN
	    obj = obj || {
	        title: 'loading...',
	        mask: false
	    }
	    // #endif
	    // #ifdef H5
	    obj = obj || {
	        title: 'loading...',
	        mask: false
	    }
	    // #endif
	    return new Promise((resolve, rej) => {
	        uni.showLoading(obj).then(data => {
	            var [err, res] = data
	            if (res.errMsg === 'showLoading:ok') {
	                resolve(true)
	            } else {
	                rej(new Error(err))
	            }
	        })
	    })
	},
	/***************************************************/
	
	/*
	路由跳转
	*/
	routeGoTo(url){
		console.log(url)
		uni.navigateTo({
			url
		})
	},
	
	/***************************************************/
	
	/*
	关闭遮罩
	*/
	hidLoading_() {
	    uni.hideLoading()
	},
	/***************************************************/
	/**********************分享朋友圈或者好友**************************/
	share(shareData) {
		this.showLoading_(
			{
			    title: '正在分享中',
			    mask: false
			}
		)
	    uni.getProvider({ //取出用户信息
	        service: 'share'
	    }).then(data => {
	        var [err, res] = data
	        var shareWhat
	        if (res.errMsg === 'getProvider:ok') {
	            res.provider.forEach(it => { //判断是否支持微信分享
	                if (it === 'weixin') {
	                    shareWhat = 'weixin'
	                }
	            })
	        }
	        return shareWhat //
	    }).then(res => {
	        return new Promise((resolve, rej) => { //便于链式调用
	            uni.share({
	                type: shareData.type,
	                provider: res,
	                scene: shareData.scene,
	                //分享的类型 WXSceneSession 分享到聊天界面 WXSenceTimeline  分享到朋友圈 WXSceneFavorite 分享到微信收藏
	                title: shareData.title, //标题
	                imageUrl: shareData.imageUrl, //图片链接
	                href: shareData.href,
	                success: function(res) {
	                    resolve.call(self, res)
	                },
	                fail: function(err) {
	                    rej.call(self, err)
	                }
	            })
	        }).then(res => {
				uni.hideLoading()
	        }, err => {
				console.log(err)
				uni.hideLoading()
	            uni.showToast({
	                title: '分享失败，请检查是否安装微信',
	                duration: 2000,
	                icon: 'none'
	            })
	        })
	
	    })
	},
/********************************************************/	

/********************刷新用户信息*******************************/
	async refreshUserInfo(userid, self,needDisconnectGoEasy = true){
		let res = await refreshUser({
			userid
		})
		if(res.IsSuccess){
			self.$store.commit('setIsdisconnectGoEasy',needDisconnectGoEasy)
			self.$store.commit('login',res.User)
			self.$store.commit('refreshGuanZhuList',res.GuanZhuList)
			self.$store.commit('changeZanGzFs',
				{
					GuanZhu:res.GuanZhu,
					Zan:res.ZanList.length,
					FenSi:res.FenSi
				}
			)
			let dianZanList = res.ZanList.map(it=>it.TargetID)
			self.$store.commit('changeDianZanList',dianZanList)
			this.refresManagerType(userid,self)
			
			return res
		}
	},
	/**************************************************************/
	
	
	
	
	
	/*
		生成海报的url
	*/
	async beHaiBaoUrl(data,self){
		this.showLoading_({
			title: '正在生成中',
			mask: false
		})
		try{
			let res = await getHaiBaoUrl(data)
			this.hidLoading_()
			if(res.status===500){
				this.msg('生成二维码失败，请稍后再试')
				return 
			}else{
				if(res.IsSuccess){
					setTimeout(()=>{
						self.imgUrl = res.Data
						self.showModal = true
					})
				}else{
					this.msg(res.Msg)
				}
			}
		}catch(e){
			console.log(e)
			this.hidLoading_()
		}
	},
	
	/**************************************************************/
	
	
	
	
	/*领取优惠券*/
	async lingQuCoupon(data,showText = true){
		this.showLoading_({
			title: '正在领取中',
			mask: false
		})
		let res = await lingQuCoupon(data)
		this.hidLoading_()
		if(res.IsSuccess){
			if(showText){
				this.msg('领券成功!',2000,false,'success')
			}
			return res
		}else{
			this.msg(res.Msg)
			return res
		}
	},
	
	/********/
	
	
	
	
	
	
	
	/*
		刷新营业员状态
	*/
	async refresManagerType(userid,self){
		let  resolve = await isSqdpUrl({userid})
		console.log(resolve,625)
		let ManagerType = {}
		if(resolve.IsSuccess){
			console.log(resolve.Data,628)
			ManagerType = {
				isManager:true,
				Type:resolve.ManagerType,
				ManagerShopList:resolve.Data
			}
		}else{
			ManagerType = {
				isManager:false,
				Type:4,
				ManagerShopList:[]
			}
		}
		console.log(ManagerType,641)
		self.$store.commit('setManagerType',ManagerType)
	},
	
	/**************************************************************/
	
	
		/*
获取二维码图片连接
https://cli.im/api?text=1&mhid=5BPFCFu/z5khMHcoItxRP6g
text:二维码内容
mhid:样式ID(常规样式：sUPPDArtzMohMHcoItxRP6M；分享样式：skfECQjvms0hMHcoItxQMaw)
 */
getEwm(text, mhid) {
	var self = this;
	return new Promise((resolve, rej) => {
		var getData
		uni.request({
			url: "https://cli.im/api/qrcode/code",
			method: "GET",
			data: {
				text: text,
				mhid: mhid
			},
			success: (res) => {
				getData = res.data;
				getData = getData.substring(getData.indexOf('img src="') + 'img src="'.length,
					getData.indexOf(
						'" id="qrcode_plugins_img"'));
				resolve.call(self, getData);
			}
		});
	})
},
/**************************************************************/
/************判断输入的内容是否为空*******************************/
	/*
		true 说明为空
		false 说明不为空
	*/
	isNullStr(content){
		return content.replace(/^ +| +$/g,'')==''
	},
/************************************************************/	
	CtoH(str){ //全角转半角
	　var result="";
	　for (var i = 0; i < str.length; i++){
	　　if (str.charCodeAt(i)==12288){
	　　　result+= String.fromCharCode(str.charCodeAt(i)-12256);
	　　　continue;
	　　}
	　　if (str.charCodeAt(i)>65280 && str.charCodeAt(i)<65375) result+= String.fromCharCode(str.charCodeAt(i)-65248);
	　　else result+= String.fromCharCode(str.charCodeAt(i));
	　}
	　return result;
	},
	
	/*************收藏店铺***************/
	scStore_(data,self){
		let flag = 10
		if(self.hasLogin){
			async function scStore(data,self){
				let [err,res] = await self.$Request_.get(self.$allUrl.scUrl,data)
				if(flag===0){
					return 
				}else{
					if(err!=null){
						flag--
						return scStore(data,self)
					}
					if(res!=null){
						return 
					}
				}
			};
			return scStore(data,self)
		}else{
			return 
		}
	},
	/*******************************/
	
	/***************修改导航栏文字**********/
	async setNavigationBarTitle(title){
		let [err,res] = await uni.setNavigationBarTitle({
			title
		})
		return [err,res]
	},
	/*************************************/
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
		return url
	},
	async getWithSubscriptions(tmplId){
		// #ifdef MP-WEIXIN
		let [err,res] =  await uni.getSetting({withSubscriptions:true})
		console.log(err,res)
		if(res!=null){
			let subscriptionsSetting = res.subscriptionsSetting
			if(subscriptionsSetting.mainSwitch){
				let itemSettings = subscriptionsSetting.itemSettings	
				if(itemSettings && itemSettings[tmplId]){
					console.log(itemSettings,itemSettings[tmplId])
					return true
				}
			}
		}
		return false
		// if(res!=null){
			
		// }
		// #endif
		return false
	},
	async isRequestSubscribeMessage(self,tmplIds,showText=true,testContent='订阅信息成功'){//授权发送订阅信息
		if(self.hasLogin){
			function showRequestSubscribeMessage(tmplIds,showText,testContent){
				return new Promise((res,rej)=>{
					wx.requestSubscribeMessage({
						tmplIds,
						success:(e)=>{ 
							// console.log(e)
							let flag = true
							let rejectList = []
							for(let key of tmplIds){
								if(e[key]==="reject"){
									flag = false
									rejectList.push(key)
								}
							}
							if(flag){
								if(showText){
									// allApi.msg(testContent,2000,true,'success')
								}
							}else{
								// console.log(rejectList)
							}
							console.log(e)
							
							res([null,{
								flag,
								rejectList:e
							}])
						},
						fail:(e)=>{
							res([e,null])
						}
					})
				})
				
			}	
			// #ifdef MP-WEIXIN
			if(wx.requestSubscribeMessage){
				let [rej,resolve] = await showRequestSubscribeMessage(tmplIds,showText,testContent)
				
				if(rej!=null){
					return [false,{}]
					console.log(rej)
				}
				if(resolve!=null){
					let {flag,rejectList} = resolve
					console.log(flag)
					if(!flag){
						let [err,res] = await uni.getSetting({withSubscriptions:true})
						if(res!=null){
							let isOk = await this.showModal({
								title: '未订阅',
								content: '您有部分订阅信息未选择订阅，是否前去设置订阅？'
							})
							if(isOk){
								console.log('开始订阅')
								let [error,success] = await uni.openSetting()
								if(success!=null){
									console.log(success)
								}
							}
						}
					}
					return  [flag,rejectList]
				}
			}else{
				wx.showModal({
					title:'提示',
					content:'您当前的微信版本过低，无法使用该功能，请升级到最新版微信后重试',
					confirmText:'知道了',
					showCancel: false,
				})
				return [false,{}]
			}
			// #endif 
		}else{
			let res = await allApi.showModal({
				title: '提示',
				content: '未登录无法订阅信息，是否登陆？'
			})
			console.log(res)
			
			if(res){
				console.log('tiaozhuan')
				uni.navigateTo({
					url:'/pages/Person/my/login'
				})
			}
			return false
		}
	}
}


export const formatAmountFun = {
	install: function(Vue) {
		Vue.prototype.formatAmount_ = function(money) {
			return allApi.formatAmount(money)
		}
	}
}






/*
写在原型上的方法
*/
Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
}


/***************转换时间戳的方法***********************************************************************************************************/


//时间转换成年月日时
function beTime_(time) {
	if(time===null){
		return null
	}
	let date = (time.split('(')[1].split(")")[0]) * 1
	return dateTimeFormatter(date)
}

export const beTime = {
	install: function(Vue) {
		Vue.prototype.beTime = function(time) {
			return beTime_(time)
		}
	}
}







//时间转换成年月日
function beTime_1(time) {
	let date = (time.split('(')[1].split(")")[0]) * 1
	return dateFormatter(date)
}

export const beTime1 = {
	install: function(Vue) {
		Vue.prototype.beTime_ = function(time) {
			return beTime_1(time)
		}
	}
}

 /*********辅助函数***************/
 const dateFormatter = (t) => {
   if (!t) return ''
   t = new Date(t).getTime()
   t = new Date(t)
   var year = t.getFullYear()
   var month = (t.getMonth() + 1)
   month = checkAddZone(month)
     
   var date = t.getDate()
   date = checkAddZone(date)
     
   return year + '-' + month + '-' + date 
 }
  
 function checkAddZone (num) {
   return num<10 ? '0' + num.toString() : num
 }
  
 function dateTimeFormatter (t) {
   if (!t) return ''
   t = new Date(t).getTime()
   t = new Date(t)
   var year = t.getFullYear()
   var month = (t.getMonth() + 1)
   month = checkAddZone(month)
  
   var date = t.getDate()
   date = checkAddZone(date)
  
   var hour = t.getHours()
   hour = checkAddZone(hour)
  
   var min = t.getMinutes()
   min = checkAddZone(min)
  
   var se = t.getSeconds()
   se = checkAddZone(se)
  
   return year + '-' + month + '-' + date + '  ' + hour + ':' + min + ':' + se
 }
 /******************/
/******************************************************************************************************/



/***************富文本节点转换成数组*********/

import htmlParser from '@/common/html-parser'

function htmlParser_(content){
	return htmlParser(content)
}
export const HtmlParser = {
	install: function(Vue) {
		Vue.prototype.HtmlParser = function(content) {
			return htmlParser_(content)
		}
	}
}

/**************************************/




/****************语音播报公共方法****************/
// import Voice from '@/QS-baiduyy/QS-baiduyy.js';
// function openVoice_(value) {
// 		return Voice(value);
// }
// export const OpenVoice = {
// 	install: function(Vue) {
// 		Vue.prototype.openVoice = function(content) {
// 			return openVoice_(content)
// 		}
// 	}
// }


/**********************************************/

















/******************转换时间差值******************/
function timeago_(dateTimeStamp){   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  
	dateTimeStamp = (dateTimeStamp.split('(')[1].split(")")[0]) * 1
	
	var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();   //获取当前时间毫秒
    
    var diffValue = now - dateTimeStamp;//时间差
	

    if(diffValue < 0){
        return;
    }
    var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
    var hourC = diffValue/hour;
    var dayC = diffValue/day;
    var weekC = diffValue/week;
    var monthC = diffValue/month;
	
	let result
    if(monthC >= 1 && monthC <= 3){
        result = " " + parseInt(monthC) + "月前"
    }else if(weekC >= 1 && weekC <= 3){
        result = " " + parseInt(weekC) + "周前"
    }else if(dayC >= 1 && dayC <= 6){
        result = " " + parseInt(dayC) + "天前"
    }else if(hourC >= 1 && hourC <= 23){
        result = " " + parseInt(hourC) + "小时前"
    }else if(minC >= 1 && minC <= 59){
        result =" " + parseInt(minC) + "分钟前"
    }else if(diffValue >= 0 && diffValue <= minute){
        result = "刚刚"
    }else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
}

export const timeago = {
	install: function(Vue) {
		Vue.prototype.timeago = function(dateTimeStamp) {
			return timeago_(dateTimeStamp)
		}
	}
}
/*****************************************/


/**
 * @description 					减法
 * 
 * @param {Object} arg1				被减数
 * @param {Object} arg2				减数
 */

export function accSub(arg1, arg2) {
	let r1, r2, ml, nl
	try {
		r1 = arg1.toString().split('.')[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split('.')[1].length
	} catch (e) {
		r2 = 0
	}
	ml = Math.pow(10, Math.max(r1, r2))
	nl = (r1 >= r2) ? r1 : r2
	return (((arg1 * ml - arg2 * ml) / ml).toFixed(nl)) * 1
}




