// #ifdef APP-PLUS
	// const shanYanSDKModule = uni.requireNativePlugin('CLSDK-ShanYanSDKModule')
// #endif



export const getPageAllInfo={//获取数组类型的方法
	methods:{//isRefres 如果有下拉刷新 就不显示加载了
		getPageInfo(url,getData,heade=false,isObj=false,isRefres=false){//获取信息
			//this.$api.showLoading_().then(resShowLoading=>{
				//console.log({resShowLoading})
				/*if(!isRefres){
					this.$api.showLoading_()
				}*/
					let loadingFlag = true
					if(isObj){
						loadingFlag = false
					}
					return this.$Request.get(url,getData,heade,loadingFlag).then((res)=>{
					//	this.$api.hidLoading_()
							if(!res.IsSuccess){
								setTimeout(()=>{
									this.$api.msg(res.Msg,2000)
								},300)
								if(res.Msg === "店铺已经被锁定！"){
									uni.navigateBack({
										delta:1
									})
								}
							}
							if(isObj){//是对象
								var keyAry=Object.keys(res)//判断返回值的个数
								if(keyAry.length===0){
									this.$api.msg('暂无数据',1500,false)
								}
								this.infoObject=res
								console.log(this.infoObject)
								return this.infoObject//方便链式调用
								//uni.hideLoading()
							}else{	//不是对象
								if(getData.page===1){//是否是第一页
									if(res.length===0){//没数据
									this.$api.msg('暂无数据',1500,false)
									}
									this.infoList=res						
								}else{//不是第一页
									if(res.length===0){//没数据
										this.$api.msg('已经到最底啦',1000,false,'none')
									}else{//追加数据
										this.infoList=[...this.infoList,...res]
									}
								}
								console.log(this.infoList)
								return this.infoList//方便链式调用
							}
						
						
						/*if(!isRefres){
							this.$api.hidLoading_()
						}*/
					})
				
			//})
		},
		refresGetInfo(heade=false,isObj=false){//下拉刷新
			if(!isObj){//不是对象
				this.getData.page=1
			}
			
			return this.getCurrentPageInfo(heade,isObj,true).then(res=>{
				//this.$api.msg('刷新成功',800,false,'loading')
				uni.stopPullDownRefresh()
				return res
			})
		},
		getCurrentPageInfo(heade=false,isObj=false,isRefres=false){//获取当前页面信息
			return this.getPageInfo(this.infoUrl,this.getData,heade,isObj,isRefres)
		},
		setStorage(sqZzobj,type){
			if(type===1){
				uni.setStorageSync('sqZzobjOne',sqZzobj)
			}else if(type===2){
				uni.setStorageSync('sqZzobjTwo',sqZzobj)
			}else if(type===3){
				uni.setStorageSync('sqZzobjThree',sqZzobj)
			}
			
		},
		getStorage(type){
			var sqZzobj = {}
			if(type===1){
				sqZzobj = uni.getStorageSync('sqZzobjOne')
			}else if(type===2){
				sqZzobj = uni.getStorageSync('sqZzobjTwo')
			}else if(type===3){
				sqZzobj = uni.getStorageSync('sqZzobjThree')
			}
			return sqZzobj
		},
		getCurryStorage(type){
			var sqZzobj=this.getStorage(type)
			console.log(sqZzobj)
			if(sqZzobj===''){
				return 
			}else{
				for(let item of this.inputAry){
					var key = item.key
					if(key in sqZzobj){
						item.value = sqZzobj[key]
					}
				}
			}
			if(type===2){
				console.log(sqZzobj.SFZPic2)
				this.oneImgUrl=sqZzobj.SFZPic1
				this.twoImgUrl=sqZzobj.SFZPic2
				var date = new Date((sqZzobj.SFZYXQ.split('(')[1].split(")")[0])*1)
				this.getData.SFZYXQ=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
				return 2
			}
		},
		// shanYunSDKgetPhoneNum(){
		// 	// #ifdef APP-PLUS
		// 	shanYanSDKModule.init({
		// 	     appid: "qkeIBBjV",
		// 	}, result_0 => {//初始化回调
				
		// 		let code0 = result_0.code;
		// 	    let result0 = result_0.result
		// 		if(code0 ===1022){
		// 			shanYanSDKModule.getPhoneInfo((result_1) => {
		// 			    let code1 = result_1.code;
		// 			    let result1 = result_1.result
		// 				if(code1===1022){//预取号回调
		// 					console.log('预取号回调成功')
							
							
							
		// 				//配置授权页面	
		// 				shanYanSDKModule.setAuthThemeConfig({
		// 					//授权页已有元素配置
		// 					uiConfig: {
								
								
		// 						/*授权页背景配置三选一，支持图片，gif图，视频*/
		// 						setAuthBGImgPath:"",//普通图片
								
		// 						/*授权页导航栏*/
		// 						setFullScreen:false,//是否全屏
		// 						setNavColor: '#ff0000',//设置导航栏背景颜色
		// 						// setNavReturnImgPath: "",//设置导航栏返回按钮图标
		// 						setNavReturnBtnOffsetX: "15",//设置导航栏返回按钮距离屏幕右侧X偏移
								
		// 						/*授权页logo*/
		// 						setLogoImgPath: 'static/eb9a0dae18491990a43fe02832d3cafa.jpg',//设置logo图片
		// 						setLogoOffsetY: "15",//设置logo相对于标题栏下边缘y偏移
		// 						setLogoWidth: "120",//设置logo宽度
		// 						setLogoHeight: "70",//设置logo高度
		// 						setLogBtnImgPath:'static/btnBgi.jpg',
								
								
		// 						// setLogoHidden:'true',
		// 						/*授权页号码栏*/
		// 						setNumFieldOffsetY: "120",//设置号码栏相对于标题栏下边缘y偏移
		// 						setNumberSize: "18",//设置号码栏字体大小
								
		// 						/*授权页登录按钮*/
		// 						setLogBtnText: "本机号码免验证码闪电登录",//设置登录按钮文字
		// 						setLogBtnOffsetY: "180",//设置登录按钮相对于标题栏下边缘Y偏移
								
								
		// 						/*授权页隐私栏*/
		// 						setPrivacyState: "true",//设置隐私条款的CheckBox是否选中（true：选中；false：未选中）
								
		// 						setAppPrivacyOne: {//设置开发者隐私条款1，包含两个参数：1.title：名称2.URL:链接
		// 							title: '闪验用户协议',
		// 							url: "https://api.253.com/api_doc/yin-si-zheng-ce/wei-hu-wang-luo-an-quan-sheng-ming.html"
		// 						},
		// 						setAppPrivacyTwo: {//设置开发者隐私条款2，包含两个参数：1.title：名称2.URL:链接
		// 							title: '闪验隐私政策',
		// 							url: "https://api.253.com/api_doc/yin-si-zheng-ce/ge-ren-xin-xi-bao-hu-sheng-ming.html"
		// 						},
		// 						setAppPrivacyThree: {//设置开发者隐私条款3，包含两个参数：1.title：名称2.URL:链接
		// 							title: '服务协议',
		// 							url: "https://api.253.com/api_doc/yin-si-zheng-ce/ge-ren-xin-xi-bao-hu-sheng-ming.html"
		// 						},
								
		// 						setPrivacyText: {//设置隐私条款名称外的文字,包含五个参数(privacyTextOne,privacyTextTwo,privacyTextThree,privacyTextFour,privacyTextFive)
		// 							privacyTextOne: '登录即同意',
		// 							privacyTextTwo: "、",
		// 							privacyTextThree: '、',
		// 							privacyTextFour: '和',
		// 							privacyTextFive: '并授权登录'
		// 						},
		// 						setSloganHidden: "false"
		// 					}, 
		// 					//授权页添加自定义控件元素
		// 					widgets: {
		// 						widget1: {
		// 							widgetId: "loginByOtherPhone",
		// 							type: "TextView",
		// 							left: "",
		// 							top: "250",
		// 							right: "",
		// 							bottom: "",
		// 							width: "",
		// 							height: "30",
		// 							textContent: "其他电话号码登录（点击切换）",
		// 							textFont: "14",
		// 							textColor: "#000000",
		// 							backgroundColor: "#ffffff",
		// 							isFinish: "true"
		// 						},
		// 						widget2: {
		// 							widgetId: "loginByWx",
		// 							type: "ImageView",
		// 							left: "",
		// 							top: "300",
		// 							right: "",
		// 							bottom: "",
		// 							width: "60",
		// 							height: "60",
		// 							backgroundImgPath: "static/qq.png",
		// 							isFinish: "true"
		// 						}
		// 					},
		// 				}, 
		// 				//授权页添加自定义控件元素点击事件监听                    
		// 				result => {
		// 					let id =  result.result
		// 					if(id === 'loginByOtherPhone'){//用其他电话号码登录
		// 						// console.log('用其他电话号码登录')
		// 						this.$Route.navigateTo(
		// 							'/pages/Login/login'
		// 						)
		// 					}
		// 					if(id === 'loginByWx'){//用微信登录
		// 						console.log('用微信登录')
		// 						this.appLoginByWx(false)
		// 					}
					
		// 				});								
		// 					uni.hideLoading()
		// 	                //拉起授权页回调核心！！！！！
		// 					shanYanSDKModule.openLoginAuth(true,
		// 					    result_2 => {
							           
		// 					        this.shanyan_code = JSON.stringify(result_2.code);
		// 					        this.shanyan_result = JSON.stringify(result_2.result);
		// 							console.log(JSON.stringify(result_2),'result_2result_2')
		// 					    },
		// 					    async result_3 => {
		// 					            //点击登录按钮及返回键回调
		// 					        let shanyan_code = JSON.stringify(result_3.code);
		// 					        let shanyan_result = JSON.parse(result_3.result);
		// 							// console.log(shanyan_result,'result_3result_3')
									
		// 							uni.showLoading({
		// 								title:"验证手机号",
		// 								mask:true
		// 							})
		// 							let token = shanyan_result.token
		// 							let requestRes = await this.$Request.get(this.$store.state.getPhone,{
		// 								token,
		// 								outId:'',
		// 								clientIp:''
		// 							})
		// 							let phone = requestRes.Data
		// 							let mobile = `${phone}`
									
		// 							console.log(token,mobile)
		// 							let   requestRes_ = await this.$Request.get(this.$store.state.loginbyphonenum,{
		// 								phone:mobile,
		// 								yzm:token
		// 							})
		// 							this.$store.commit('login', requestRes_.Data)
		// 							this.$store.commit('refreshGuanZhuList',requestRes_.GZList)
		// 							this.$store.commit('changeZanGzFs',{
		// 								GuanZhu:requestRes_.GuanZhu,
		// 								Zan:requestRes_.Zan,
		// 								FenSi:requestRes_.FenSi
		// 							})
		// 							uni.hideLoading()
									
									
		// 							// #ifdef APP-PLUS
		// 								console.log('***************开始存储cid***********')
		// 								let getData = {
		// 									userid : this.userInfo_.ID,
		// 									ClientID : this.$store.state.pushInfo.clientid
		// 								}
		// 								console.log(getData)
		// 								try{
		// 									let resovle = await this.$ajax.setCidUserId(getData)
		// 									console.log(resovle)
		// 								}catch(e){
		// 									try{
		// 										let resovle = await this.$ajax.setCidUserId(getData)
		// 										console.log(resovle)
		// 									}catch(e){
		// 										//TODO handle the exception
		// 									}
		// 								}
		// 								console.log('***************结束存储cid***********')
		// 							// #endif
									
		// 							console.log(requestRes_)
		// 						}
		// 					);
		// 				}
		// 			});
		// 		}
		// 	});
		// 	// #endif
		// },
		appUpdate(isAkp = false){
			let url = ''
			console.log(isAkp)
			if(isAkp){
				url = this.upDateApkUrl
			}else{
				url = this.upDateWgtUrl
			}
			console.log(url)
			if(this.upDataAppBtnLabel!="安装新版本"){
				return 
			}else{
				if(this.progress===0){
					const downloadTask = uni.downloadFile({
						url,
						success : (res) => {
						console.log(res)
							if (res.statusCode === 200) {
								this.progress = 100;
								this.upDataAppBtnLabel = '正在安装';
								console.log(res)
								plus.runtime.install(res.tempFilePath, {
								    force: true  
								}, function() {  
								    console.log('install success...');  
								    plus.runtime.restart();  
								}, (e)=> {  
								    console.error('install fail...');  
								});
							}else{
								console.log(this.$store.state.upDateApkUrl)
							}
						},
						fail:(e)=>{
							console.log(e)
						}	
					});
					downloadTask.onProgressUpdate((res) => {
						this.progress = res.progress;
						this.upDataAppBtnLabel = `下载进度${this.progress}%`
					});
				}
			}
		},
		// async appLoginByWx(needBack=true){
		// 	let authResult = ''
		// 	let [err,logRes] = await uni.login({//登陆接口
		// 		provider:'weixin',
		// 		scopes:'auth_base',
		// 		timeout:20000,
		// 	})
			
		// 	this.$api.showLoading_({
		// 		title: '效验微信号',
		// 		mask:true
		// 	})
		// 	console.log('效验微信号')
		// 	if(logRes!=null){
				
				
		// 		console.log(logRes)
		// 		if(logRes.code){
		// 			console.log(logRes.code)
		// 		}else{							
		// 			if(logRes.errMsg==="login:ok"){
		// 				authResult=logRes.authResult
		// 			}
		// 		}
		// 		let [err,userRes] = await uni.getUserInfo({
		// 			provider:'weixin',
		// 			timeout:20000,
		// 			withCredentials:true
		// 		})
		// 		if(userRes!=null){
		// 			console.log(userRes)
		// 			if('unionId' in userRes.userInfo){
		// 				//判断电话是否和微信绑定的请求参数
		// 				//如果没有绑定微信的话，可能会再次发送请求，所以提前绑定
		// 				this.getDataWX.nickname=userRes.userInfo.nickName
		// 				this.getDataWX.headimgurl=userRes.userInfo.avatarUrl
					
		// 				this.openId  =  userRes.userInfo.openId
		// 				this.unionid = userRes.userInfo.unionId
						
		// 			}else{
		// 				//判断电话是否和微信绑定的请求参数
		// 				self.getIsBindData.openid=userRes.userInfo.openId
		// 				//如果没有绑定微信的话，可能会再次发送请求，所以提前绑定
		// 				this.getDataWX.nickname=userRes.userInfo.nickName
		// 				this.getDataWX.headimgurl=userRes.userInfo.avatarUrl
						
		// 				this.openId  =  userRes.userInfo.openId
		// 				this.unionid =  userRes.userInfo.openId
		// 			}
					
		// 			let [errmsg,loginWxInfo] = await this.loginWithWx('',this.getDataWX.nickname,this.getDataWX.headimgurl,this.openId,this.unionid,0,0,0,0,false)
		// 			this.$api.hidLoading_()
		// 			if(loginWxInfo!=null){
		// 				console.log(loginWxInfo,310310310310)
		// 				if(loginWxInfo.IsSuccess){
		// 					let userId = loginWxInfo.Data.ID
		// 					console.log(loginWxInfo.Data)
		// 					this.$store.commit('login', loginWxInfo.Data)
		// 					this.$api.msg('登陆成功',2000,false,'success')
		// 					this.$store.commit('refreshGuanZhuList',loginWxInfo.GZList)
		// 					this.$store.commit('changeZanGzFs',{
		// 						GuanZhu:loginWxInfo.GuanZhu,
		// 						Zan:loginWxInfo.Zan,
		// 						FenSi:loginWxInfo.FenSi
		// 					})
		// 					// #ifdef APP-PLUS
		// 						console.log('***************开始存储cid***********')
		// 						let getData = {
		// 							userid : this.userInfo_.ID,
		// 							ClientID : this.$store.state.pushInfo.clientid
		// 						}
		// 						console.log(getData)
		// 						try{
		// 							let resovle = await this.$ajax.setCidUserId(getData)
		// 							console.log(resovle)
		// 						}catch(e){
		// 							try{
		// 								let resovle = await this.$ajax.setCidUserId(getData)
		// 								console.log(resovle)
		// 							}catch(e){
		// 								//TODO handle the exception
		// 							}
		// 						}
		// 						console.log('***************结束存储cid***********')
		// 					// #endif
		// 					console.log('返回')
		// 					if(needBack){
		// 						uni.navigateBack()
		// 					}
		// 				}else{
		// 					if('code' in loginWxInfo){
		// 						if(loginWxInfo.code === 201){
		// 							this.$api.msg('请绑定手机号',2000)
									
		// 							shanYanSDKModule.init({
		// 							     appid: "qkeIBBjV",
		// 							}, result_0 => {//初始化回调
		// 								let code0 = result_0.code;
		// 							    let result0 = result_0.result
		// 								if(code0 ===1022){
		// 									shanYanSDKModule.getPhoneInfo((result_1) => {
		// 									    let code1 = result_1.code;
		// 									    let result1 = result_1.result
		// 										if(code1===1022){//预取号回调
		// 											console.log('预取号回调成功')
		// 										//配置授权页面	
		// 										shanYanSDKModule.setAuthThemeConfig({
		// 											//授权页已有元素配置
		// 											uiConfig: {
		// 												/*授权页背景配置三选一，支持图片，gif图，视频*/
		// 												setAuthBGImgPath:"",//普通图片
		// 												/*授权页导航栏*/
		// 												setFullScreen:false,//是否全屏
		// 												setNavColor: '#ff0000',//设置导航栏背景颜色
		// 												// setNavReturnImgPath: "",//设置导航栏返回按钮图标
		// 												setNavReturnBtnOffsetX: "15",//设置导航栏返回按钮距离屏幕右侧X偏移
		// 												/*授权页logo*/
		// 												setLogoImgPath: 'static/eb9a0dae18491990a43fe02832d3cafa.jpg',//设置logo图片
		// 												setLogoOffsetY: "15",//设置logo相对于标题栏下边缘y偏移
		// 												setLogoWidth: "120",//设置logo宽度
		// 												setLogoHeight: "70",//设置logo高度
		// 												setLogBtnImgPath:'static/btnBgi.jpg',
		// 												// setLogoHidden:'true',
		// 												/*授权页号码栏*/
		// 												setNumFieldOffsetY: "120",//设置号码栏相对于标题栏下边缘y偏移
		// 												setNumberSize: "18",//设置号码栏字体大小
		// 												/*授权页登录按钮*/
		// 												setLogBtnText: "绑定手机号注册",//设置登录按钮文字
		// 												setLogBtnOffsetY: "180",//设置登录按钮相对于标题栏下边缘Y偏移
														
		// 												/*授权页隐私栏*/
		// 												setPrivacyState: "true",//设置隐私条款的CheckBox是否选中（true：选中；false：未选中）
														
		// 												setAppPrivacyOne: {//设置开发者隐私条款1，包含两个参数：1.title：名称2.URL:链接
		// 													title: '闪验用户协议',
		// 													url: "https://api.253.com/api_doc/yin-si-zheng-ce/wei-hu-wang-luo-an-quan-sheng-ming.html"
		// 												},
		// 												setAppPrivacyTwo: {//设置开发者隐私条款2，包含两个参数：1.title：名称2.URL:链接
		// 													title: '闪验隐私政策',
		// 													url: "https://api.253.com/api_doc/yin-si-zheng-ce/ge-ren-xin-xi-bao-hu-sheng-ming.html"
		// 												},
		// 												setAppPrivacyThree: {//设置开发者隐私条款3，包含两个参数：1.title：名称2.URL:链接
		// 													title: '服务协议',
		// 													url: "https://api.253.com/api_doc/yin-si-zheng-ce/ge-ren-xin-xi-bao-hu-sheng-ming.html"
		// 												},
														
		// 												setPrivacyText: {//设置隐私条款名称外的文字,包含五个参数(privacyTextOne,privacyTextTwo,privacyTextThree,privacyTextFour,privacyTextFive)
		// 													privacyTextOne: '登录即同意',
		// 													privacyTextTwo: "、",
		// 													privacyTextThree: '、',
		// 													privacyTextFour: '和',
		// 													privacyTextFive: '并授权登录'
		// 												},
		// 												setSloganHidden: "false"
		// 											}
		// 										});           					
		// 											uni.hideLoading()
		// 							                //拉起授权页回调核心！！！！！
		// 											shanYanSDKModule.openLoginAuth(true,
		// 											    result_2 => {
		// 											        this.shanyan_code = JSON.stringify(result_2.code);
		// 											        this.shanyan_result = JSON.stringify(result_2.result);
		// 													console.log(JSON.stringify(result_2),'result_2result_2')
		// 											    },
		// 											    async result_3 => {
		// 											            //点击登录按钮及返回键回调
		// 											        let shanyan_code = JSON.stringify(result_3.code);
		// 											        let shanyan_result = JSON.parse(result_3.result);
		// 													// console.log(shanyan_result,'result_3result_3')
		// 													uni.showLoading({
		// 														title:"验证手机号",
		// 														mask:true
		// 													})
		// 													let token = shanyan_result.token
															
		// 													console.log(token)
															
		// 													let requestRes = await this.$Request.get(this.$store.state.getPhone,{
		// 														token,
		// 														outId:'',
		// 														clientIp:''
		// 													})
		// 													let phone = requestRes.Data
		// 													let mobile = `${phone}`
		// 													let [errmsg,loginWxInfo] = await this.loginWithWx(mobile,this.getDataWX.nickname,this.getDataWX.headimgurl,this.openId,this.unionid,0,0,0,token,false)
															
		// 													if(loginWxInfo!=null){
		// 														if(loginWxInfo.IsSuccess){
		// 															let userId = loginWxInfo.Data.ID
		// 															console.log(loginWxInfo.Data)
		// 															this.$store.commit('login', loginWxInfo.Data)
		// 															this.$api.msg('登陆成功',2000,false,'success')
		// 															this.$store.commit('refreshGuanZhuList',loginWxInfo.GZList)
		// 															this.$store.commit('changeZanGzFs',{
		// 																GuanZhu:loginWxInfo.GuanZhu,
		// 																Zan:loginWxInfo.Zan,
		// 																FenSi:loginWxInfo.FenSi
		// 															})
		// 															// #ifdef APP-PLUS
		// 																console.log('***************开始存储cid***********')
		// 																let getData = {
		// 																	userid : this.userInfo_.ID,
		// 																	ClientID : this.$store.state.pushInfo.clientid
		// 																}
		// 																console.log(getData)
		// 																try{
		// 																	let resovle = await this.$ajax.setCidUserId(getData)
		// 																	console.log(resovle)
		// 																}catch(e){
		// 																	try{
		// 																		let resovle = await this.$ajax.setCidUserId(getData)
		// 																		console.log(resovle)
		// 																	}catch(e){
		// 																		//TODO handle the exception
		// 																	}
		// 																}
		// 																console.log('***************结束存储cid***********')
		// 															// #endif
		// 															console.log('返回')
		// 															if(needBack){
		// 																uni.navigateBack()
		// 															}
		// 														}
		// 													}
		// 												}
		// 											);
		// 										}
		// 									});
		// 								}
		// 							});
									
		// 						}
		// 					}else{
		// 						this.$api.msg(loginWxInfo.msg)
		// 					}
		// 				}
		// 			}else{
		// 				console.log(err,'isband')
		// 				this.$api.msg('微信登录出错，请稍后再试')
		// 			}
		// 		}else{
		// 			console.log(err,'uni.getUserInfo')
		// 			this.$api.msg('微信登录出错，请稍后再试')
		// 		}
		// 	}else{
		// 		console.log(err,'uni.login')
		// 		this.$api.msg('微信登录出错，请稍后再试')
		// 	}
		// },
		loginWithWx(phone, nickname, headimgurl, openid, unionid, pid = 0, yyyid = 0, siteid = 0 ,  yzm = 0,iswx = true){
			console.log(phone, nickname, headimgurl, openid, unionid, pid , yyyid , siteid)
						// phone, nickname, headimgurl, openid, unionid, pid = 0, yyyid = 0, siteid = 0
			return new Promise((success,error)=>{
				this.$ajax.loginWithWx(phone, nickname, headimgurl, openid, unionid, pid , yyyid , siteid ,  yzm , iswx).then((res)=>{
					console.log(res)
					success([null,res])
				},(err)=>{
					console.log(err)
					error([err,null])
				})
			})
		},	
		async getScShopDanPingList(userid,storeid,ShopID,needReadStore = true){
			if(this.hasLogin){
				let scShopDanPingList = uni.getStorageSync('scShopDanPingList')
				if(Object.prototype.toString.call(scShopDanPingList)==="[object Array]"){
					console.log('获取的收藏单品缓存列表')
					this.$store.commit('setScShopDanPingList',scShopDanPingList)
					if(scShopDanPingList.length===0){
						let [err,res] = await this.$Request_.get(this.$allUrl.getScList,{
							userid,
							storeid:0,
							ShopID
						})
						if(res!=null){
							if(res.IsSuccess){
								if(res.Data===null){
									this.$store.commit('setScShopDanPingList',[])
								}else{
									this.$store.commit('setScShopDanPingList',res.Data)
								}
							}else{
								if(res.Data===null){
									this.$store.commit('setScShopDanPingList',[])
								}
							}
						}
					}else{
						let flag = false
						for(let val of scShopDanPingList){
							let ShopID_ = val.ID
							if(ShopID === ShopID_){
								flag = true
								return true
							}
						}
						if(!flag){
							let [err,res] = await this.$Request_.get(this.$allUrl.getScList,{
								userid,
								storeid:0,
								ShopID
							})
							if(res!=null){
								if(res.IsSuccess){
									if(res.Data===null){
										this.$store.commit('setScShopDanPingList',[])
									}else{
										this.$store.commit('setScShopDanPingList',res.Data)
									}
								}else{
									if(res.Data===null){
										this.$store.commit('setScShopDanPingList',[])
									}
								}
							}
						}
					}
					if(this.scShopDanPingList.length===0){
						console.log(this.scShopDanPingList,640)
						return false
					}else{
						for(let val of this.scShopDanPingList){
							let ShopID_ = val.ID
							if(ShopID === ShopID_){
								return true
							}
						}
						return false
					}
				}else{
					let [err,res] = await this.$Request_.get(this.$allUrl.getScList,{
						userid,
						storeid:0,
						ShopID
					})
					if(res!=null){
						if(res.IsSuccess){
							if(res.Data===null){
								this.$store.commit('setScShopDanPingList',[])
							}else{
								this.$store.commit('setScShopDanPingList',res.Data)
							}
						}else{
							if(res.Data===null){
								this.$store.commit('setScShopDanPingList',[])
							}
						}
					}
				}
				
				if(this.scShopDanPingList.length===0){
					console.log(this.scShopDanPingList,640)
					return false
				}else{
					for(let val of this.scShopDanPingList){
						let ShopID_ = val.ID
						if(ShopID === ShopID_){
							return true
						}
					}
					return false
				}
			}else{
				return false
			}
			
		},
		async wantIt(userid,storeid,ShopID){
			let url = this.$allUrl.qxScShop
			if(!this.showWant){
				url = this.$allUrl.scShop
			}
			
			let [err,res] = await this.$Request_.get(url,{
				userid,ShopID
			})
			if(res!=null){
				if(url === this.$allUrl.qxScShop){
					console.log('????')
					this.showWant = false
					let scShopDanPingList = uni.getStorageSync('scShopDanPingList')
					let index = 0
					for(let i = 0 ; i < scShopDanPingList.length ; i++){
						let val = scShopDanPingList[i].ID
						if(ShopID === val){
							index = i 
							break
						}
					}
					scShopDanPingList.splice(index,1)
					this.$store.commit('setScShopDanPingList',scShopDanPingList)
				}
				this.showWant = await this.getScShopDanPingList(userid,storeid,ShopID,false)
			}
		},
		async getUserIntegral(userid,storeid,unionid){
			let [err,res] = await this.$Request_.get(this.$allUrl.myxiaofei,{
				userid,
				storeid,
				unionid
			})
			if(res!=null){
				if(res.IsSuccess){
					return res.Data
				}
			}
		},
		changeHongbao(e){
			let show = e.show
			if(!show){
				this.showHongBao = true
			}
		},
		async isShowHongBao(storeShopInfo,pageID){
			if(storeShopInfo.IsSongSet){
				if(this.hasLogin){
					let getHbStoreList = this.$store.state.getHbStoreList
					console.log(696969696969696969)
					let flag = getHbStoreList.indexOf(pageID)
					
					if(flag===-1){
						let [err,res] = await this.$Request_.get(this.$allUrl.isGetHongBao,{
							userid:this.userInfo_.ID,
							storeid:pageID
						})
						if(res!=null){
							getHbStoreList.push(pageID)
							this.$store.commit('setGetHbStoreList',getHbStoreList)
							
							if(res.IsSuccess){
								this.getHbInfoObj = res.Data
								this.$nextTick(()=>{
									this.showContent = `${this.getHbInfoObj.Num}元红包大奖`
									this.isOpenHb = true
									this.$refs.showHongbao.open()
								})
								return true
							}else{
								return false
							}
							
						}
					}
				}else{
					this.$nextTick(()=>{
						this.showContent = `最高可得${storeShopInfo.SongLevel2}元`
						
						this.isOpenHb = true
						this.$refs.showHongbao.open()
					})
				}
			}
		},
		async getHongBao(){
			if(this.hasLogin){
				let getData = {
					userid:this.userInfo_.ID,
					storeid:this.pageID,
					num:this.getHbInfoObj.Num,
					key:this.getHbInfoObj.Key
				}
				let [err,res] = await this.$Request_.get(this.$allUrl.lqhb,getData)
				if(res!=null){
					if(res.IsSuccess){
						this.$refs.showHongbao.showHBaoSuccess()
					}
				}
			}else{
				this.$nextTick(()=>{
					this.isOpenHb = false
					this.$refs.showHongbao.close()
					
					this.$store.commit('setNotLoginShowHb',true)
					
					
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: "/pages/Person/my/login"
					});
					// #endif
					
					// #ifdef H5
					this.$Route.navigateTo(
						'/pages/Login/login'
					)
					// #endif
					
					// #ifdef APP-PLUS
					uni.showLoading({
						title: '正在加载',
						mask: true
					})
					this.shanYunSDKgetPhoneNum()
					// #endif
					
				})
			}
		},
		getHongBaoSuccess(){
			this.$nextTick(()=>{
				this.isOpenHb = false
				this.$refs.showHongbao.close()
				uni.navigateTo({
					url:'/pages/Person/pay/wallet'
				})
			})
		}
	},
	data(){
		return {
			flagTitle:false,
			upDataAppBtnLabel:'安装新版本',
			progress:0,
			getIsBindData:{
				
			},
			getDataWX:{
				
			},
			openId:'',
			unionid:'',
			isOpenHb:false,
			getHbInfoObj:{},
			showContent:'100元现金大奖'
		}
	},
	onPageScroll(e){
			if(e.scrollTop>=30){
				this.flagTitle=true
			}else{
				this.flagTitle=false
			}
	},
}

export function geoDistance(lat1, lng1, lat2, lng2) {//根据经纬度计算地理位置
	function rad(d) {
		return d * Math.PI / 180.0;
	}
	  let radLat1 = rad(lat1);
	  let radLat2 = rad(lat2);
	  let a = radLat1 - radLat2;
	  let b = rad(lng1) - rad(lng2);
	  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	  s = s * 6378.137;// EARTH_RADIUS;
	  s = Math.round(s * 10000) / 10000; //输出为公里
	  return s;
}

