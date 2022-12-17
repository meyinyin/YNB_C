import {allApi} from '../../common/handle.js'
import {HttpRequest_} from '../../common/httpRequest.js'
import Vue from 'vue';
export const allUrl={ //所有请求接口
	getwxacodestore:'getewm/getwxacodestore',//获取邀请的二维码
	prestoreUrl:`zz/list`,//预存大厅的请求接口
	findListUrl:`news/listnosort` ,//发现页面的 
	searchUrl:`store/getlistbykeyword`,//搜索结果请求接口
	shopDetailUrl:`store/detail`,//店铺详情接口
	getstoresortListUlr:`store/getstoresortlist`,//获取分类信息
	listbysortUrl:`store/listbysort`,//依据类别获得商铺列表       
	loginWXuRL:`menber/newregisterwx`,//微信登陆的接口   
	getopenidUrl:`GetOpenid/getopenid`,//获取微信的openid
	isbindUrl:`menber/isbind`, //判断微信的openID是否绑定    
	shopListUrl:`store/shoplist`,//获取所有的商铺信息
	storesortlistUrl:`store/getstoresortlist`,//店铺分类的接口
	sqDpUrl:`membertoshop/sqdp`,//申请店铺的接口 
	findDetailUrl:`news/detail`,//发现详情的接口    
	wyzzUrl:`zz/wyzz`,//我要赞助获得信息页面逻辑    
	zzUrl:`zz/zz`,//赞助接口
	isGetscUrl:`store/getsc`,//当前用户是否收藏了该店铺
	getHbUrl:'hb/newscstore',//获取海报的地址
	scUrl:`store/sc`, //收藏当前店铺              
	qxScUrl:`store/qxsc`,//取消当前收藏
	rateAndReserveUrl:`zz/rateAndReserve`,//获取收益率与预存额（收益率:rate,预存额:reserve）
	isSqdpUrl:`membertoshop/sqdppre`,//判断是否申请店铺
	myStoreListUrl:`mystore/MyStoreList`,//一人多店铺列表    
	mystoreUrl:`mystore/mystore`,//我的店铺的管理信息			
	firstrunscoresUrl:`store/firstrunscores`,//申请预存的第一个接口        
	secondrunscoresUrl:`store/secondrunscores` ,//申请预存的第二个接口
	jionrunscoresUrl:`store/jionrunscores`,//申请预存的第三个接口            
	zzxqUrl:`zz/storezzxq`,//店铺的赞助详情									
	storeskewmUrl:`scores/storeskewm2`,//商家收款二维码					
	storexxjlUrl:`mystore/xstorexxjl`,//消费记录列表	（日）	
	storexxjeUrl:`mystore/xxstorexxje`,//消费记录列表(月份)		
	mymemberUrl:`mystore/mynewmember`,//我的会员		
	
	
	
	myMsgListUrl:`mystore/StoreMessageLook`,//短信群发的信息列表
	msgSendUrl:`mystore/StoreMessageSend`,//短信群发			
	
	StoreMessageSort:`mystore/StoreMessageSort`,//获取短信的分类
	StoreListBySort:`mystore/StoreListBySort`,//根据分类读取短信模板
	
	
	
	storexfxqUrl:`mystore/storexfxq`,//账单详情										
	getsyylistUrl:`mystore/getsyyxlist`,//获取营业员列表           
	bdsyyUrl:`mystore/bdsyy`,//绑定营业员              
	deletesyyUrl:`mystore/deletesyy`,//删除营业员               
	editsyyUrl:`mystore/editsyy`,//编辑营业员权限		
	yyyskewmUrl:`scores/yyyskewm`,//营业员收款二维码										
	AddCouponsUrl:`mystore/AddCoupons`,//添加优惠券					
	couponsListUrl:`mystore/CouponsList`,//优惠券列表		
	clipCouponsListUrl:`mymember/ClipCouponsList`,//个人的优惠券列表                  	
	zzUrl:`zz/zz`,//对店铺预存的接口										
	rebackUrl:`mystore/reback`,//账单明细退款				
	zzlistUrl:`zz/zzlist`,//店铺申请赞助的列表			
	editstorepicUrl:`mymember/editstorepic`,//店铺店铺的主图或者幻灯图片         
	editlogoUrl:`mymember/editlogo`,//编辑店铺图片logo					
	editUrl:`mymember/edit`,//编辑店铺内容	
	myzzUrl:`mymember/myzzx`,//我的赞助								
	cashOutUrl:`mystore/CashOut`,//消费提现				
	resetsmsUrl:`menber/resetsms`,//开启短信提醒			
	myinfoUrl:`menber/myinfo`,//刷新用户信息         
	getyzmUrl:`sms/getyzm`,//获取验证码									
	yzmislostUrl:`menber/yzmislost`,//验证验证码			
								
	isAgenttypeUrl:`agent/isagenttype`,//判断代理类型	
	//			
	getStore:`mystore/getstore`,//根据扫码获取店铺信息			
	getSys:'scores/sys',
				
				
				
				
				
	agentPersonUrl:`agent/newagentperson`,//个人代理详情                
	agentPoutUrl:`agent/newagentpout`,//个人代理提现               
	agentPoutDetail:`agent/agentpoutdetail`,//个人代理提现明细				
	agentPoutMember:`agent/agentpoutmember`,//个人代理团队	
	agentpmemberdetail:`agent/agentpmemberdetail`,//个人代理的商家详情							
								
	agenTareaesUrl:`agent/newagentareaes`,//区域代理详情					
	agenTareaOutUrl:`agent/newagentareaout`,//区域代理提现			
	agentareaOutDetailUrl:`agent/newagentareaoutdetail`,//区域代理提现明细					
	getagenTareamemberUrl:`agent/newgetagentareamember`,//区域代理商家队伍	
	getAgentareashopdetailUrl:`agent/newagentareashopdetail`,//区域代理商家营业详情							
	js:`scores/js`,//支付 
				
	storeagreeUrl:`news/storeagree`,//转商家协议			
	huaxucommonproblemUrl:`news/huaxucommonproblem`,//常见问题
	huaxumustseeUrl:`news/huaxumustsee`,//新手必看
	huaxudetailUrl:`news/huaxudetail`,//新手必看的详情			
	getshoptxlistUrl:`mystore/getshoptxlist`,//店铺体现的明细						
	getYccashout:`mystore/yccashout`,//预存提现			
	getewm:`getewm/getwxacode`,//获取二维码
	getCard:`card/ck`,//充值卡		
	getGm:`gm/ck`,//店铺主扫收款码			
	getShopBankList:'storebank/getbanklist',//获取店铺的银行卡列表
	addShopBank:`storebank/addbank`,//绑定商铺银行卡
	setShopBankDefault:`storebank/issetdefaultbank`,//设置店铺提现默认银行卡
	deletShopBank:`storebank/deletebank`,//删除店铺银行卡
	mynewmemberdetail:`mystore/mynewmemberdetail`,//会员在店铺的消费详情
	myxfdaydetail:'mystore/myxfdaydetail',//店铺可视化，日，周，月详情	
	
	getmyorderlistbystoreid:'myprofile/getmyorderlistbystoreid',//获取商家外卖订单的接口

	storejd:'order/storejd',//商家接单
	storech:'order/storech',//商家确认出货
	storejj:'order/storejj',//商家拒绝订单
	
	
	getStoreshopUrl:`storeshop/list`,//通过店铺ID读取店铺单品列表
	
	
	getListbyuser:'storeshopdd/listbyuser', //读取指定用户的单品购买列表                   
	
	getListbystore:'storeshopdd/listbystore',//读取指定商铺的单品购买列表
	
	
	
	byDanping:'storeshop/gmsp',    //购买单品
	// storeshop/gmspnew
	
	
	getCommodityUrlDetail:'storeshop/detail',//
	
	
	
	getStoreListback:'storeshop/listback',//商家管理获取店铺的单品
	getPreaddUrl:'storeshop/preadd',//添加单品前置查询是否有未审核单品信息
	addCommodityUrl:'storeshop/addnew',//添加商铺单品
	


	getYhqDetailUrl:`yhq/detail`,//获取优惠券详情	
	
	
	
	hxShop:'storeshopdd/hx',//核销商品
	
	getPhone:'ShanYan/getPhone',
	
	isVerify:'ShanYan/isVerify',
	
	updateApp:'update/isnewwgt',//检测APP更新

	loginbyphonenum:'member/loginbyphonenum',
	
	newGetSort:'storesort/getdata',//新版本获取分类
	
	adverttoplist:'advert/adverttoplist',//获取banner

	listttlist:'news/listttlist',//获取头条信息
	
	mslist:'storeshop/mslist',
	
	tjlist:'storeshop/tjlist',//获取推荐商品列表
	hotlist:'storeshop/hotlist',//获取热门商品列表
	getScList:'sc/shoplist',//获取收藏单品列表
	
	scShop:'sc/sc',//收藏该单品
	qxScShop:'sc/qxsc',//取消收藏该单品
	
	getToplist:'storeshop/Toplist',//获取店铺首页的推荐商品

	storeadvertlist:'advert/storeadvertlist',//获取广告的

	advertdetail:'advert/advertdetail',//广告详情

	listtttop:'news/listtttop',//更多头条
	
	shopAbout:'news/about',//关于本店
	
	helpList:'news/help',//帮助列表
	
	updatezf:'runscores/updatezf',//修改支付信息

	qrzz:'zz/qrzz',//商户确认申请
	
	myzz:'zz/myzz',//我的认领列表
	tjfk:'zz/tjfk',//提交打款记录
	xy:'news/xy',//获取合同
	qyInfo:'zz/qyinfo',//获取签约双峰的info
	fkqr:'zz/fkqr',//商家确认会员的打款信息并完成整体签约
	grfhinfo:'zz/grfhinfo',//用户的分红详情
	searchresultforshop:'store/searchresultforshop',//获取搜索的商品列表
	searchresultforstore:'store/searchresultforstore',//获取搜索的店铺列表
	getstoresortlist:'store/getstoresortlist',//获取首页的菜单

	sclist:'store/sclist',//收藏店铺的列表
	
	storMsList:'storeshop/mslist',//通过店铺ID促销秒杀的产品
	
	storeshopTjlist:'storeshop/tjlist',//通过店铺ID促销推荐的产品
	
	storeshopHotlist:'storeshop/hotlist',//通过店铺ID热卖的产品
	
	storeshopToplist:'storeshop/Toplist',//通过店铺ID置顶的产品

	advertlist:'advert/advertlist',//广告分类2:首页顶部广告 5:商家首页顶部 6:商家首页中部 7:我的页面中部 8:首页中部广告
	
	unionList:'union/list',// 读取联盟列表

	getstoresortlistall:'store/getstoresortlistall',
	
	userisZzstore:'zz/useriszzstore',//判断对该店是否进行的预存 
	
	getkeyword:'shopkeyword/getkeyword',//获取分类
	
	myteam:'menber/myteam',//我的团队

	uniStoretjlist:'union/storetjlist',//读取联盟商家的推荐列表

	myxiaofei:'scores/myxiaofei',//获取我的商家积分以及联盟积分

	getuserscoreslist:'scores/getuserscoreslist',
	
	getscoreslist:'scores/getscoreslist',
	
	CashOutNum:'mystore/CashOutNum',//店铺的提现账目查询

	unionStorelist:'union/storelist',
	
	isGetHongBao:'hongbao/gethb',//用户是否出现了红包

	lqhb:'hongbao/lqhb',//领取红包的接口

	MyClipCoupons:'mymember/MyClipCoupons',//优惠券消费

	storeCouponsList:'mystore/CouponsList',
	
	loginbyunionid:'member/loginbyunionid',
	
	sendwxmsg:'sms/sendwxmsg',
	
	msglist:'message/msglist',
	
	gmspisxz:'storeshop/gmspisxz',//查询用户限制购买
	
	
	msglistnew:'message/msglistnew',//首页的信息列表接口
	
	useradress:'useradress/getuseradressbyid',//根据id查找用户的地址
	
	
	
	gettjlist:'store/gettjlist',//获得首页推荐的前几个置顶的店铺
	gettoplist:'store/gettoplist',// 获得站点附近前几个置顶的店铺

	CouponsDetail:'mystore/CouponsDetail',//查看优惠券详情

	getcj:'cj/getcj',//查询是否抽奖
	cj:'cj/cj',//参与抽奖
	getcjcs:'cj/getcjcs',//获取用户抽奖次数
	
	StoreCouponsList:'mystore/StoreCouponsList',//店铺管理的优惠券列表

	saleslist:'storeshop/saleslist',
	qrfh:'storeshop/qrfh',//商家确认发货
	
	qrsh:'storeshop/qrsh',//用户确认收货
	
	pglist:'storeshop/pglist',//拼购列表
	
	pgdetail:'storeshop/pgdetail',//获取拼购的详情
	
	pgIng:'storeshop/pg',//拼购的接口
	
	menberBvipp:'menber/vipp',
	
	viplist:'news/viplist',
	
	pgddlist:'storeshop/pgddlist',//拼购记录
	
	shoppgUserList:'storeshop/shoppglist',
	
	getonebysortid:'news/getonebysortid',// 读取指定栏目的第一篇文章

	setpgbuyshopid:'storeshop/setpgbuyshopid',
	
	UpLoadFile:'UpLoad/UpLoadFile',
	
	
	
	//********************************************//
	adduser:'user/adduser',//注册新用户第一步
	adduserfinal:'user/adduserfinal',//注册用户第二步
	isregister:'user/isregister',//判断账号是否被注册过
	YNBlogin:'user/loginnew',// 会员登录S
	changerpwd:'user/changerpwd',// 修改密码
	banklist:'user/banklist',
	addYNBbank:'user/addbank',
	addpic:'common/addpic',//图片入库
	salesYnb:'ynbscore/sales',//出售隐币
	saleslist:'ynbscore/saleslist',// 读取售卖列表
	gmscore:'ynbscore/gmscore',// 购买YNB
	
	salesinfo:'ynbscore/salesinfo',// 售卖订单的详情
	sdscore:'ynbscore/wyscnew',//把活动积分加入锁定
	getSalesprice:'ynbscore/salesprice',//// 每一USDT能购买多少个YNB
	
	zhuangzhang:'ynbscore/zhuangzhang2',// 转帐给其他用户
	qbdz:'user/qbdz',// 获取用户的钱包地址
	qrgmscore:'ynbscore/qrgmscore',// 确认别人购买YNB
	qrfkscore:'ynbscore/qrfkscore',// 买家已经付款
	
	userbuylist:'ynbscore/userbuylist',// 用户购买列表
	usersaleslist:'ynbscore/usersaleslist',// 用户卖出列表
	useroutlist:'ynbscore/useroutlist',// 用户转出YNB列表
	userinlist:'ynbscore/userinlist',// 用户收到YNB转入列表
	usersflist:'ynbscore/usersflist',// 用户每天释放的YNB列表
	tsscore:'ynbscore/tsscore',//投诉
	
	
	
	userlocklist:"ynbscore/userlocklist",// 用户锁仓收益列表
	tjsylist:'ynbscore/tjsylist',// 推荐收益列表
	tdsylist:'ynbscore/tdsylist',// 团队收益列表
	
	
	userteamlist:'ynbscore/userteamlist',// 用户社区(团队)列表
	alllist:'list/alllist',// 读取文章列表,推广模式：1 付款备注：2 释放说明：1002
	forgetpwd:'user/forgetpwd',//忘记密码
	getfkfs:'ynbscore/getfkfs',// 获取支付方式列表
	getfkminnum:'ynbscore/getfkminnum',// 获取最低购买列表
	viplist:'list/viplist',// 首页vip等级列表
	qxscore:"ynbscore/qxscore",// 卖家取消售卖订单
	qxgmscore:'ynbscore/qxgmscore',// 买家取消购买订单
	tkscore:'ynbscore/tkscore',/// 取消付款,或者是争议后返还给卖家 userid scorelistid lan
	/// <param name="userid">买家的userid</param>
	/// <param name="scorelistid">买单列表ID</param>
	/// <param name="islockmj">是否锁定买家</param>
	/// <param name="lan"></param>
	/// <returns></returns>
	isnewmsg:'ynbscore/isnewmsg',//// 卖出订单有新的状态变化
	
	tk2score:'ynbscore/tk2score',
	/// 卖家违规强制把币转给买家
	/// </summary>
	/// <param name="scorelistid"></param>
	/// <param name="islocksaler"></param>
	/// <param name="lan"></param>
	/// <returns></returns>
	
	scorejflist:'ynbscore/scorejflist',/// 有纠纷的购买列表
	
	
	msgcomment:'message/msgcomment',
	///  帮助和反馈
	/// </summary>
	/// <param name="userid">当前用户id</param>
	/// <param name="no">订单编号</param>中
	/// <param name="content">评论</param>
	/// <param name="picurl">附件地址</param>
	/// <param name="targetid">默认为0表示是首发帮助,如果是回复填写回复的帮助ID</param>
	/// <param name="lan"></param>
	
	msglistnew:'message/msglistnew',
	/// 读取某个用户的帮助与反馈列表
	/// </summary>
	/// <param name="userid"></param>
	/// <param name="page"></param>
	/// <param name="pagesize"></param>
	
	
	msgcommentorreply:'message/msgcommentorreply',
	///  读取帮助与反馈详情
	/// </summary>
	/// <param name="userid">用户ID</param>
	/// <param name="msgid">特定某条帮助和反馈的ID(可为0)</param>
	
	
	
	jhinfo:'ynb/jhinfo',/// 激活账户提示信息
	
	needscore:'ynb/needscore',//手续费
	/// <param name="userid">当前会员的ID</param>
	/// <param name="accountid">当前会员的公钥</param>
	
	getaccountbalance:'ynb/getaccountbalance',
	
	
	addqb:'ynb/addqb',
	
	rxlm:'ynb/rxlm'
}

export const qymState = {
	tags:[],
	nick:'',//昵称
	zhiye:'',//职业
    userInfo: {},
    hasLogin: false,
	isZZ:false,//记录是否预存
	YyyState:2,//店铺的营业员状态 1是收银员 2是店长
	Profile:{},
	zhiye:'',
	miaoshu:'',
	infoImags:[],
	personType:'fk',
	addTaskData:{
		titleValue:'',//任务标题
		contentValue:'',//任务描述
		imgList:[],//图片列表
		taskMoneyIndex:0,//酬劳的计时单位
		xingBieIndex:2,//性别
		timeValue:'',//时间段
		taskClassIndex:0,//任务类别
		address:'',//地址
		
		taskMoney:'',//酬劳
		taskNums:'',//参与人数
		taskYj:'',//平台押金
		taskPeopleYj:0,//参与人违约金
	},
	guanzhuList:[],
	site:{},
	zanGzFs:{//赞/粉丝/关注
		Zan:0,
		FenSi:0,
		GuanZhu:0
	},
	dianZanList:[],
	seePicFlag:false,
	pingLunRefsFlag:false,
	taskStateList:[],
	latitude:'33.086128',//纬度
	longitude:'107.034979',//经度
	option:{},
	tjrid:0,
	timer:'',
	isNowRegister:false,
	xrMoney:0,
	lastcjDate:null,
	showHDdate:0, //最后弹窗的时间
	// #ifdef MP-ALIPAY
	qrQuery: '',
	// #endif
	muBanIndex:0,//短信模板Index索引
	muBanMsgList:[],
	shopLog:'',
	StoreDesc:'',
	shopPhone:'',
	QsJJDDList:[],
	kfuPhone:'',
	pushInfo:{//推送相关的信息
		
	},
	smssort:'',
	ManagerType:{
		isManager:false,
		Type:4,
		ManagerShopList:[]
	},
	singleProductObj:{//添加商品需要的一些参数
		
	},
	upLoadText:'正常版本更新',
	isUpData:false,
	isUpDateApk:false,
	wgtUrl:'',
	apkUrl:'',
	loginTimeFlag:'',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	gouwuche:{},

	// #ifdef MP-WEIXIN
	zhanweiPic:'https://api.91goodluck.com/content/logo.png',
	// #endif
	
	// #ifndef MP-WEIXIN
	zhanweiPic:'/static/otherImage/zhanweiPic.jpg',
	// #endif

	//0店铺所有者 1：收营 2：店长
	// changeShopLog:false
	jiaFangPic:'',
	yiFangPic:'',
	$goEasy:{},
	storeInfo:{},
	scShopDanPingList:[],
	isBackToHome:false,
	isBackToHomeID:0,
	shopCurrentInfoData:{}, 
	isLv:false,
	myZzInfoObj:{},
	yiFangQianZiFlag:false,
	jiaFangQianZiFlag:false,
	qianZiNeedInfo:{},
	paySuccessInfo:{},
	searchParamObj:{},
	userStatusCode:0, //状态码
	userStatusCodeInfo:{},
	msgUserInfo:{},//聊天需要的信息
	usTalkerMsgList:[],
	usTalkerMsgListLength:0,
	hasNewMsg:false,
	UnionID:0,
	hasUnionID:false,
	BoughtDetailInfo:{},
	StoreUnionID:0,
	isFirstToLv:true,
	notLoginShowHb:false,
	getHbStoreList:[],
	GoEasyStatus:false,
	isGoEasyConnect:false,
	isChangeUseAddr:false,
	orderDetail:{
		
	},
	editInfo:{},
	submitInfo:{},
	IsdisconnectGoEasy:true,
	pgUserDetai:{},
	routeOption:{},
	locale:'en',
	salesprice:0,
	quRenFuKuanInfo:{
		title:'',
		content:''
	},
	buyerQuXiaoInfo:{
		title:'',
		content:''
	},
	sellerQuXiaoInfo:{
		title:'',
		content:''
	},
	zhuangzhangInfo:{
		
	}
}


let channel

export const qymMutations ={
	setzhuangzhangInfo(state,zhuangzhangInfo){
		state.zhuangzhangInfo = zhuangzhangInfo
	},
	setQuXiaoInfo(state,info){
		if(info.type===1){
			state.buyerQuXiaoInfo.title = info.title
			state.buyerQuXiaoInfo.content = info.content
		}
		if(info.type===2){
			state.sellerQuXiaoInfo.title = info.title
			state.sellerQuXiaoInfo.content = info.content
		}
	},
	setquRenFuKuanInfo(state,quRenFuKuanInfo){
		state.quRenFuKuanInfo = quRenFuKuanInfo
	},
	setSalesprice(state,salesprice){
		state.salesprice = salesprice
	},
	changLocale(state,locale){
		let localeList = ['en','zh','ja','ko']
		let hasLocale  = false
		for(let item of localeList){
			if(locale===item){
				hasLocale = true
				break
			}
		}
		if(hasLocale){
			state.locale = locale
			uni.setStorage({
			    key: 'YNBLocale',
			    data: locale
			})
		}
	},
	setRouteOption(state,routeOption){
		state.routeOption = routeOption
	},
	setPgUserDetai(state,pgUserDetai){
		state.pgUserDetai = pgUserDetai
	},
	setSubmitInfo(state,submitInfo){
		state.submitInfo = submitInfo
	},
	setEditInfo(state,editInfo){
		state.editInfo = editInfo
	},
	setOrderDetail(state,orderDetail){
		state.orderDetail = orderDetail
	},
	setIsChangeUseAddr(state,isChangeUseAddr){
		state.isChangeUseAddr = isChangeUseAddr
	},
	setIsGoEasyConnect(state,isGoEasyConnect){
		state.isGoEasyConnect = isGoEasyConnect
	},
	setGetHbStoreList(state,getHbStoreList){
		state.getHbStoreList = getHbStoreList
	},
	setNotLoginShowHb(state,notLoginShowHb){
		state.notLoginShowHb = notLoginShowHb
	},
	setIsFirstToLv(state,isFirstToLv){
		state.isFirstToLv = isFirstToLv
	},
	setStoreUnionID(state,UnionID){
		state.StoreUnionID = UnionID
	},
	setBoughtDetailInfo(state,BoughtDetailInfo){
		state.BoughtDetailInfo = BoughtDetailInfo
	},
	setHasUnionID(state,infoObj){
		let {hasUnionID , UnionID} = infoObj
		state.hasUnionID = hasUnionID
		state.UnionID = UnionID
		uni.setStorage({
		    key: 'hasUnionID',
		    data: hasUnionID
		})
		uni.setStorage({
		    key: 'UnionID',
		    data: UnionID
		})
	},
	setIsLv(state,isLv){
		state.isLv = false
		// state.isLv = isLv  因为业务需要 现在汉友通不再独立出来
	},
	setHasNewMsg(state,hasNewMsg){
		state.hasNewMsg = hasNewMsg
	},
	setUsTalkerMsgListLength(state,usTalkerMsgListLength){
		state.usTalkerMsgListLength = usTalkerMsgListLength
	},
	setUsTalkerMsgList(state,usTalkerMsgList){
		state.usTalkerMsgList = usTalkerMsgList
	},
	setMsgUserInfo(state,msgUserInfo){
		state.msgUserInfo = msgUserInfo
	},
	userStatusCodeChange(state,userStatusCode){
		console.log(userStatusCode)
		state.userStatusCode = userStatusCode
	},
	userStatusCodeChangeInfo(state,userStatusCodeInfo){
		console.log(userStatusCodeInfo)
		state.userStatusCodeInfo = userStatusCodeInfo
	},
	setSearchParamObj(state,searchParamObj){
		state.searchParamObj = searchParamObj
	},
	setPaySuccessInfo(state,paySuccessInfo){
		state.paySuccessInfo = paySuccessInfo
	},
	setJiaFangQianZiFlag(state,jiaFangQianZiFlag){
		state.jiaFangQianZiFlag = jiaFangQianZiFlag
	},
	setQianZiNeedInfo(state,qianZiNeedInfo){
		state.qianZiNeedInfo = qianZiNeedInfo
	},
	setYiFangQianZiFlag(state,yiFangQianZiFlag){
		state.yiFangQianZiFlag = yiFangQianZiFlag
	},
	setMyZzInfoObj(state,myZzInfoObj){
		state.myZzInfoObj = myZzInfoObj
	},
	setIsBackToHome(state,isBackToHome){
		state.isBackToHome = isBackToHome
	},
	setIsBackToHomeID(state,isBackToHomeID){
		state.isBackToHomeID = isBackToHomeID
	},
	
	pushTags(state,ary){
		state.tags = ary
	},
	changeNick(state,nick){
		state.nick = nick
	},
	changeZhiye(state,zhiye){
		state.zhiye = zhiye
	},
	setGoEasyStatus(state,GoEasyStatus){
		state.GoEasyStatus = GoEasyStatus
	},
	setIsdisconnectGoEasy(state,IsdisconnectGoEasy){
		state.IsdisconnectGoEasy = IsdisconnectGoEasy
	},
    async login(state, userInfo) {
		// console.log(this.$goEasy)
		// console.log('登录')
		if(userInfo.BankAddress.length===0){
			let lan
			if(state.locale==='en'){
				lan =  0
			}
			if(state.locale==='zh'){
				lan =  1
			}
			if(state.locale==='ja'){
				lan =  2
			}
			if(state.locale==='ko'){
				lan =  3
			}
			let [err,res] =  await HttpRequest_.get(allUrl.qbdz,{
				userid:userInfo.ID,
				lan
			})
			if(res.IsSuccess){
				userInfo.BankAddress = res.Data
			}
		}
		state.userInfo = userInfo	
		state.hasLogin = true
		uni.setStorage({
		    key: 'YNBuserInfo_new',
		    data: userInfo
		})
       
		// //创建goeasy实例
		// let userId = userInfo.ID;
		// allApi.createdGoEasy(this,userId,userInfo).then(res=>{
		// 	console.log(res,2222222222226666666666666688888888888)
		// 	if(state.IsdisconnectGoEasy){
		// 		allApi.disconnectGoEasy()
		// 	}else{
		// 		console.log('无需断开')
		// 	}
		// 	state.IsdisconnectGoEasy = true
		// })
		
		// //订阅指令状态码
		// allApi.receiveStatusCode(this)
		
		// //订阅接收信息
		// allApi.receiveImMsg(userId,this)
		
		//释放链接
		
		
		
		
		
		
		//单点登录需要的方法
		// let timeFlag  =  this.state.loginTimeFlag;
		// channel = `loginByUserID_${userId}`;
		// allApi.watchLogin(userId,channel,timeFlag,this,userInfo)
		
		
    },
    refresh(state, userInfo) {
        state.userInfo = userInfo
		state.hasLogin = true
        // uni.setStorage({
        //     key: 'userInfo',
        //     data: userInfo
        // })
    },
    logout(state) {
        for (let key in state.userInfo) {
            delete state.userInfo[key]
        }
        state.hasLogin = false
        uni.removeStorage({
            key: 'YNBuserInfo_new',
			success:()=>{
				console.log('55')
				state.userInfo = {}
			}
        })
		
		// if(state.GoEasyStatus){
		// 	allApi.disconnectGoEasy()
		// }
		
		// let $goEasy = Vue.prototype.$goEasy;
		// $goEasy.unsubscribe({
		//     channel,
		//     onSuccess: function () {
		//         console.log("订阅用户登录取消成功。");
		//     },
		//     onFailed: function (error) {
		//         console.log("取消订阅失败，错误编码：" + error.code + " 错误信息：" + error.content)
		//     }  
		// });
		
		// let userStatusCodeChannel = `${userId}StatusCode`;
		
		// $goEasy.unsubscribe({
		//     channel:userStatusCodeChannel,
		//     onSuccess: function () {
		//         console.log("订阅用户状态码取消成功。");
		//     },
		//     onFailed: function (error) {
		//         console.log("取消订阅失败，错误编码：" + error.code + " 错误信息：" + error.content)
		//     }  
		// });
    },
	recordIsZZ(state,isZZ){
		state.isZZ=isZZ
	},
	changeProfile(state,Profile){
		if( Profile === null ){
			state.Profile = {}
		}else{
			state.Profile = Profile
		}
	},
	changeNick(state,nick){
		state.nick = nick
	},
	changeZhiye(state,zhiye){
		state.zhiye = zhiye
	},
	changeMiaoShu(state,miaoshu){
		state.miaoshu = miaoshu
	},
	changeInfoImages(state,infoImags){
		state.infoImags = infoImags
	},
	changePersonType(state,personType){
		state.personType = personType
	},
	changeAddTaskData(state,addTaskData){
		state.addTaskData = addTaskData
	},
	refreshGuanZhuList(state,guanzhuList){
		state.guanzhuList = guanzhuList
		uni.setStorage({
		    key: 'guanzhuList',
		    data: guanzhuList
		})
	},
	setSite(state,site){
		state.site = site
		uni.setStorage({
		    key: 'site',
		    data: site
		})
	},
	changeZanGzFs(state,zanGzFs){
		state.zanGzFs = zanGzFs
	},
	changeDianZanList(state,dianZanList){
		let ary = Array.from(new Set(dianZanList))
		state.dianZanList = ary
		uni.setStorage({
		    key: 'dianZanList',
		    data: dianZanList
		})
	},
	changeSeePicFlag(state,seePicFlag){
		state.seePicFlag = seePicFlag
	},
	changePingLunRefsFlag(state,pingLunRefsFlag){
		state.pingLunRefsFlag = pingLunRefsFlag
	},
	changeTaskStateList(state,taskStateList){
		state.taskStateList = taskStateList
	},
	setLatitudeAndLongitude(sate,mapObj){//设置地理位置
		sate.latitude=mapObj.latitude
		sate.longitude=mapObj.longitude
	},
	changeOption(sate,option){
		sate.option  = option
	},
	setTjrid(state,tjrid){
		state.tjrid = tjrid
		uni.setStorage({
		    key: 'tjrid',
		    data: tjrid
		})
	},
	setTimer(state, timer) {
		state.timer = timer
	},
	setIsNowRegister(state,isNowRegister){
		state.isNowRegister = isNowRegister
	},
	setXrMoney(state,xrMoney){
		state.xrMoney = xrMoney
	},
	setShowHDdate(state,showHDdate){
		state.showHDdate = showHDdate
	},
	setLastcjDate(state,lastcjDate){
		state.lastcjDate = lastcjDate
	},
	// #ifdef MP-ALIPAY
	setQrQuery(state, qrQuery) {
	    state.qrQuery = qrQuery
	},
	// #endif
	setMsgMuBanIndex(state,muBanIndex){
		state.muBanIndex = muBanIndex
	},
	setMuBanMsgList(state,muBanMsgList){
		state.muBanMsgList = muBanMsgList
	},
	setShopLog(state,shopLogObj){//数组类型
		state.shopLog = shopLogObj.shopLog
		// state.changeShopLog = shopLogObj.changeShopLog
	},
	setStoreDesc(state,StoreDesc){
		state.StoreDesc = StoreDesc
	},
	setShopPhone(state,shopPhone){
		state.shopPhone = shopPhone
	},
	setQsJJDDList(state,QsJJDDList){
		state.QsJJDDList = QsJJDDList
		uni.setStorage({
		    key: 'QsJJDDList',
		    data: QsJJDDList
		})
		
	},
	setKfuPhone(state,phone){
		state.kefuPhone = phone
	},
	setPushInfo(state,pushInfo){
		state.pushInfo = pushInfo
	},
	setSmsSort(state,smssort){
		state.smssort = smssort
	},
	setManagerType(state,ManagerType){
		state.ManagerType.isManager = ManagerType.isManager
		state.ManagerType.Type = ManagerType.Type
		state.ManagerType.ManagerShopList = ManagerType.ManagerShopList
		console.log(ManagerType)
	},
	setSingleProductObj(state,singleProductObj){
		state.singleProductObj = singleProductObj
	},
	
	
	
	
	setGouwuche(state,gouwuche){
		state.gouwuche = gouwuche
	},
	setjiaFangPic(state,jiaFangPic){
		state.jiaFangPic = jiaFangPic
	},
	setyiFangPic(state,yiFangPic){
		state.yiFangPic = yiFangPic
	},
	
	setuUpLoadText(state,upLoadText){
		state.upLoadText = upLoadText
	},
	setIsUpData(state,isUpData){
		state.isUpData = isUpData
	},
	setIsUpDateApk(state,isUpDateApk){
		state.isUpDateApk = isUpDateApk
	},
	setWgtUrl(state,wgtUrl){
		state.wgtUrl = wgtUrl
	},
	setApkUrl(state,apkUrl){
		state.apkUrl = apkUrl
	},
	setGoEasy(state,$goEasy){
		state.$goEasy = $goEasy
	},
	setLoginTimeFlag(state,loginTimeFlag){
		state.loginTimeFlag = loginTimeFlag
	},
	setStoreInfo(state,storeInfo){
		state.storeInfo = storeInfo
	},
	setScShopDanPingList(state,scShopDanPingList){
		state.scShopDanPingList = scShopDanPingList
		uni.setStorage({
		    key: 'scShopDanPingList',
		    data: scShopDanPingList
		})
	},
	setShopCurrentInfoData(state,shopCurrentInfoData){
		state.shopCurrentInfoData = shopCurrentInfoData
	}
}











