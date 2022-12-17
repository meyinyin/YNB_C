<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom style="z-index: 10;" backColor="text-zhuti" bgColor="bg-zhuti1" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">{{$t('交易记录')}}</block>
			<!-- #endif -->
		</cu-custom>	
		<!-- #endif -->
		
		
		<view class="padding-bottom-xl">
			<view>
				<u-subsection
					class="subsection"
					:list="titleChooseList" 
					:current="chooseInde" 
					 @change="sectionChange"
					height="100"
					button-color="#EBC384"
					active-color="red"
					inactive-color="#FFFFFF"
					bg-color="#36373F">
				</u-subsection>
			</view>
			<view>
				<view v-if="infoList.length===0" class="padding-bottom-xl">
					<no-content></no-content>
				</view>
				
				<view v-else>
					<view v-if="infoList.length!=0">
						<view v-for="(item,index) of infoList" :key="index" class="lists shadow-zhuti1">
							<view class="align-center flex justify-between">
								<text class="text-zhuti ">
									{{item.title}}
								</text>
								<view class="u-image-right" v-if="chooseInde<=1" @tap="showDetail(item,index)">
									<u-image  width="50rpx" height="50rpx" src="/static/index/down.png" ></u-image>
								</view>
							</view>
							<view class="margin-top-sm flex align-center justify-between">
								<view class="itemInfoItem" v-for="(it,jndex) of item.argslList" :key="jndex">
									<text class="text-white">
										{{$t(it.label)}}
									</text>
									<view class="margin-top-sm">
										<text class=" text-bold margin-right-xs" v-if="jndex===0" :class="it.symbol==='-'?'text-red':'text-green'">
											{{it.symbol}}
										</text>
										<text class="text-zhuti text-bold ">
											{{it.value}}
										</text>
									</view>
								</view>
							</view>
							<view v-if="chooseInde<1" class="margin-top flex justify-between">
								<view >
									<button class="bg-zhuti2 round cu-btn sm" v-if="item.showTs" @tap="QrMaiChu(item,index,type=2)">
										{{$t('投诉')}}
									</button>
								</view>
								<view>
									<button class="bg-red round margin-right cu-btn sm" v-if="item.isDelete" @tap="QuXiaoBtn(item,index,1)">
										{{$t('取消')}}
									</button>
									
									<button class="bg-zhuti2 cu-btn sm text-zhuti2" v-if="item.isOver" @tap="QrMaiChu(item,index)">
										{{chooseInde===1?$t('确认卖出'):$t('确认付款')}}
									</button>
								</view>
								
							</view>
							<view v-if="chooseInde===1" class="margin-top flex justify-end">
								<view>
									<button class="bg-red round  cu-btn sm" v-if="item.isDelete" @tap="QuXiaoBtn(item,index,2)">
										{{$t('取消')}}
									</button>
								</view>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<load-line :isLoading="loadingInfo.isLoading"></load-line>
		
		<order-series :backOrClose="false" @orderSeriesEve="orderSeriesEve" :orderComponent="orderComponent"></order-series>
		
		<tousu-component :isShow="isShowTousu" :ismj="ismj" :scorelistid="scorelistid"   @touSuSumBit="touSuSumBit"></tousu-component>
		
		<uni-popup ref="isSurePopPurchase" type="top" :maskClick="false" >
			<view style="width: 100vw;padding: 60rpx;border-radius: 10rpx;" class="cardBg_">
				<view class="flex align-center justify-start">
					<u-icon name="arrow-left" size="40" color="#ffffff" @click="purchaseSure(1)"></u-icon>
					<text class="text-bold text-white text-xl  margin-left-sm">
						{{quXiaoInfo.title}}
					</text>
				</view>
				<view class="padding-tb-sm margin-top-xl" >
					<scroll-view scroll-y="true" style="max-height:60vh;">
						<view>
							<rich-text class="text-white text-zhuti" style="line-height: 1.5em;" :nodes="quXiaoInfo.content"></rich-text>
						</view>
					</scroll-view>
					
				</view>
				<view class="flex align-center justify-between margin-top-xl padding-top">
					<view class="tixianNew" @tap="purchaseSure(2)">
						{{$t('确定')}}
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup'
	import orderSeries from '@/components/orderSeries.vue'
	import tousuComponent from '@/components/tousuComponent.vue'
	export default {
		onLoad() {
			this.refshList()
			this.getQuXiaoInfo()
		},
		onShow() {
			this.$Route.routeBefore(this)
			this.refshLogin()
		},
		components: {
			uniPopup,
			orderSeries,
			tousuComponent
		},
		watch: {
			chooseInde(n, o) {
				this.refshList()
			}
		},
		computed: {
			sendUrl() {
				let urlName = this.titleChooseList[this.chooseInde].url
				return this.$allUrl[urlName]
			},
		},
		data() {
			return {
				isShowTousu:false,
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				chooseInde: 0,
				titleChooseList: [{
						name: '买入',
						id: 0,
						url: 'userbuylist'
					},
					{
						name: '卖出',
						id: 1,
						url: 'usersaleslist'
					}, {
						name: '转出',
						id: 2,
						url: 'useroutlist'
					},
					{
						name: '转入',
						id: 3,
						url: 'userinlist'
					},
					{
						name: '锁定',
						id: 4,
						url: 'userlocklist'
					},
					{
						name:'释放',
						id:5,
						url:'usersflist'
					}
				],
				infoList: [],
				focusIndex: 4,

				addFuJianList: [],
				detailInfo: {},
				detailIndex: 0,
				orderComponent: {
					isShowSurePopPurchase: false, //确认付款的弹窗显示控制，
					isShowSurePopSellOut: false, //确认卖出的弹窗显示控制
					orderDetail: false, //订单详情的弹窗显示控制
					isFirstPurchaseSure: true, //确认卖出是否为第一次
					showPurchaseFuJianList: [], //订单详情的附件信息，在确认卖出时也会被使用（买入用户的附件）
					showSellOutFuJianList: [], //订单详情的附件信息（卖出详情的附件）
					orderDetailInfo: { //订单的详情数组信息
						AllNum: '92.000000',
						detailList: [{
							label: '类型',
							value: '普通买入',
							needTr: true
						}, {
							label: '状态',
							value: '已完成',
							needTr: true
						}, {
							label: '区块链交易ID',
							value: 'djsospapxmcv1v52b3sfb48etn1b5s23b48eyt9/8tts4b1f52v3b8etr4rr1sbz2v3x84g8wrega1vs2c8e4f1csfd48ea1vc2d8ew41vd8w41v5a8fw4eg4a1v28e4a123q8e4af1s6t48erh41fv5w6rr8e4',
							needTr: false
						}, {
							label: '时间',
							value: '2021/2/21 0:30',
							needTr: true
						}]
					},
					orderDetailBtn: { //订单详情是否显示按钮，以及按钮的控制能力
						isShowBtn: true, //是否显示底部按钮，当订单未完成的时候才会显示
						isSurePopPurchase: false, //确认付款？
					}
				},
				isSend: true,
				getData: {
					userid: 0,
					page: 1,
					pagesize: 10
				},
				clickInfo: {
					infoObj: {},
					index: 0
				},
				ismj:true,
				scorelistid:0 ,
				deleteText:[],
				quXiaoInfo:{
					title:'',
					content:'',
					btnInfo:{
						info:{},
						index:0
					}
				},
				isBuyerOrSeller:'buyer'
			}
		},
		methods: {
			sectionChange(index) {
				this.chooseInde = index;
				console.log(index);
			},
			async getQuXiaoInfo(){
				let ids = [{
					id:2011,
					type:1
				},{
					id:2012,
					type:2
				}]
				for(let item of ids){
					let infoObj = await this.getWenZhangDetail(item.id)
					if(infoObj.isOk){
						let obj = {
							title:infoObj.data.Title,
							content:infoObj.content,
							type:item.type
						}
						this.$store.commit('setQuXiaoInfo',obj)
					}
				}
			},
			async QuXiaoBtn(item,index,type){
				this.quXiaoInfo.btnInfo.info = item
				this.quXiaoInfo.btnInfo.index = index
				if(type===1){
					this.quXiaoInfo.title = this.$store.state.buyerQuXiaoInfo.title
					this.quXiaoInfo.content = this.$store.state.buyerQuXiaoInfo.content
					this.isByOrSell = 'buyer'
					this.$nextTick(async()=>{
						this.$refs.isSurePopPurchase.open()
					})
				}
				if(type===2){
					this.quXiaoInfo.title = this.$store.state.sellerQuXiaoInfo.title
					this.quXiaoInfo.content = this.$store.state.sellerQuXiaoInfo.content
					this.isByOrSell = 'seller'
					this.$nextTick(async()=>{
						this.$refs.isSurePopPurchase.open()
					})
				}
				if(type===3){
					let infoObj = this.quXiaoInfo.btnInfo.info
					let index = this.quXiaoInfo.btnInfo.index
					let getData = {
						userid:this.userInfo_.ID,
						scorelistid:infoObj.originalInfo.ID,
						lan:this.lan_
					}
					let [err,res] = await this.$Request_.get(this.$allUrl.tkscore,getData)
					if(res!=null){
						if(res.IsSuccess){
							this.$api.msg(res.Msg,1500,true,'success')
						}else{
							this.$api.msg(res.Msg,1500)
						}
					}
				}
			},
			purchaseSure(type){
				this.$nextTick(async()=>{
					let url = ''
					this.$refs.isSurePopPurchase.close()
					if(type===1){
						return 
					}
					if(type===2){
						let getData = {
							userid:this.userInfo_.ID,
							lan:this.lan_
						}
						let infoObj = this.quXiaoInfo.btnInfo.info
						let index = this.quXiaoInfo.btnInfo.index
						if(this.isByOrSell==='buyer'){
							url = this.$allUrl.qxgmscore
							getData.scorelistid = infoObj.originalInfo.ID
						}
						if(this.isByOrSell==='seller'){
							url = this.$allUrl.qxscore
							getData.scoreid = infoObj.originalInfo.ID
						}
						this.loadingInfo.isLoading = true
						let [err,res] = await this.$Request_.get(url,getData)
						this.loadingInfo.isLoading = false
						if(res!=null){
							if(res.IsSuccess){
								if(this.isByOrSell==='buyer'){
									this.infoList.splice(index,1)
								}
								if(this.isByOrSell==='seller'){
									let obj = infoObj.originalInfo
									obj.IsOver = true
									this.$set(this.infoList,index,this.isItem(obj))
								}
							}else{
								this.$api.msg(res.Msg)
							}
						}
						
					}
				})
			},
			async touSuSumBit(obj){
				let isClose = obj.isClose
				this.isShowTousu = false
				if(!isClose){
					let {info,picurl,isOk} = obj
					if(isOk){
						let obj = this.infoList[this.clickInfo.index].originalInfo
						obj.IsTS = true
						obj.TSDate = `/Date(${new Date().getTime()})`
						this.$set(this.infoList,this.clickInfo.index,this.isItem(obj))
					}
				}
			},
			focus(index) {
				this.focusIndex = index
			},
			showDetail(item, index) {
				this.detailInfo = item
				this.detailIndex = index
				this.orderComponent.orderDetailBtn.isSurePopPurchase = false
				console.log(item)
				
				
				if (this.chooseInde === 1) {
					this.$Route.navigateTo('/pages/account/sellingDetails', {
						id:item.originalInfo.ID
					})
					return
				} else {
					this.$Route.navigateTo('/pages/account/orderDetails', {
						id:item.originalInfo.ScoresID,
						num:item.originalInfo.Num,
						scorelistid:item.originalInfo.ID
					}, true)
				}
			},
			openOrClose(type,ref='showPop'){
				this.$nextTick(()=>{
					this.$refs[ref][type]()
				})
			},
			QrMaiChu(item, index,type=1) {
				this.clickInfo.index = index
				this.clickInfo.infoObj = item
				console.log(item,index,type)
				if(type===1){
					console.log(this.chooseInde)
					if (this.chooseInde === 1) {
						this.orderComponent.isShowSurePopSellOut = true
						// this.openOrClose('open','isSurePopSellOut')
					} else {
						this.addFuJianList = []
						this.orderComponent.isShowSurePopPurchase = true
						// this.openOrClose('open','isSurePopPurchase')
					}
				}
				if(type===2){
					if(this.chooseInde===0){
						this.ismj = true
						this.scorelistid = this.clickInfo.infoObj.originalInfo.ID
					}
					this.isShowTousu = true
				}
				
			},
			async orderSeriesEve(infoObj) {
				let isSumBit = infoObj.isSumBit
				let thing = infoObj.thing
				this.orderComponent.orderDetail = false
				this.orderComponent.isShowSurePopPurchase = false
				this.orderComponent.isShowSurePopSellOut = false
				if (isSumBit) { //提交类型
					if (thing === 'orderDetailOver') { //详情的按钮
						let isSurePopPurchase = infoObj.isSurePopPurchase
						if (isSurePopPurchase) { //是不是确认付款
							this.orderComponent.isShowSurePopPurchase = true
						} else { //是确认卖出
							this.orderComponent.isShowSurePopSellOut = true
						}
					}
					if (thing === 'purchaseSureOver') { //确认付款
						this.addFuJianList = infoObj.addFuJianList.map(it => {
							return it
						})
						// console.log(this.clickInfo.infoObj.originalInfo)
						let getData = {
							userid: this.userInfo_.ID,
							scorelistid: this.clickInfo.infoObj.originalInfo.ID,
							picurl: '',
							info: '',
							lan: this.lan_
						}
						console.log(getData)
						this.loadingInfo.isLoading = true
						let resData = await this.qrfkscoreRequest(getData)
						this.loadingInfo.isLoading = false
						if (resData.isOk) {
							let obj = this.infoList[this.clickInfo.index].originalInfo
							obj.IsFK = true
							obj.FKDate = `/Date(${new Date().getTime()})`
							this.$set(this.infoList,this.clickInfo.index,this.isItem(obj))
						}
					}
					if (thing === 'sellOutSureOver') { //确认售出
						console.log('sureSell')
					}
				} else { //非提交关闭即可 

				}
			},
			async getListInfo() {
				if (this.isSend) {
					this.getData.userid = this.userInfo_.ID
					let [err, res] = await this.$Request_.get(this.sendUrl, this.getData)
					if (res != null) {
						if (res.IsSuccess) {
							let list = res.Data.map(it => {
								return this.isItem(it)
							})
							if (list.length < 10) {
								this.isSend = false
							}
							if (this.getData.page === 1) {
								this.infoList = list
							} else {
								this.infoList = [...this.infoList, ...list]
							}
						}
					}
				}
			},
			isItem(it) {
				let map = {
					title: it.Info,
					isOver: false
				}
				let argslList = []
				if (this.chooseInde === 0) {
					map.title = `${this.$t('订单编号')}:${it.Info}`
					
					
					
					let stateInfo = this.orderSatate(it)
					// console.log(stateInfo)
					map.isOver = stateInfo.isShowFuKuan
					map.showTs = stateInfo.isShowTs
					map.isDelete = stateInfo.isDelete
					let obj1 = {
						label: '数量',
						value: it.Num,
						symbol: '+'
					}
					argslList.push(obj1);
					let obj2 = {
						label: '状态',
						value: stateInfo.text,
					}
					argslList.push(obj2);
					let obj3 = {
						label: stateInfo.timeLabel,
						value: stateInfo.time
					}
					argslList.push(obj3);
				}
				if (this.chooseInde === 1) {
					map.isOver = it.IsOver
					let obj1 = {
						label: '数量',
						value: it.Num,
						symbol: '-'
					}
					argslList.push(obj1);

					let obj2 = {
						label: '状态',
						value: it.IsOver ? this.$t('已完成') : this.$t('未完成')
					}
					argslList.push(obj2);

					if(it.IsOver){
						map.isDelete = false
					}else{
						if(it.Num===it.LockScores){
							map.isDelete = false
						}else{
							map.isDelete = true
						}
					}
					

					let obj3 = {
						label: '时间',
						value: this.beTime(it.AddDate)
					}

					argslList.push(obj3);
				}
				if (this.chooseInde === 2) {
					let obj1 = {
						label:'数量',
						value:it.Score,
						symbol:'-'
					}
					argslList.push(obj1);
					
				    let obj2 = {
						label:'目标人',
						value:it.TargetName
					}
					argslList.push(obj2);
					

					let obj3 = {
						label:'时间',
						value:this.beTime(it.AddDate)
					}

					argslList.push(obj3);
				}
				if (this.chooseInde === 3) {
					let obj1 = {
						label:'数量',
						value:it.Score,
						symbol:'+'
					}
					argslList.push(obj1);
					
					let obj2 = {
						label:'转入人',
						value:it.Name
					}
					argslList.push(obj2);
					
					
					let obj3 = {
						label:'时间',
						value:this.beTime(it.AddDate)
					}
					
					argslList.push(obj3);
				}
				if(this.chooseInde===4){
					map.title = `${this.$t('锁定资金')} ${it.PID} YNB`
					let obj1 = {
						label: '数量',
						value: it.KDNum,
						symbol: '+'
					}
					argslList.push(obj1);
					
					let obj3 = {
						label: '时间',
						value: this.beTime(it.AddDate)
					}
					
					argslList.push(obj3);
				}
				if(this.chooseInde===5){
					map.title = this.$t('释放资金')
					let obj1 = {
						label: '数量',
						value: it.KDNum,
						symbol: '+'
					}
					argslList.push(obj1);
					
					let obj3 = {
						label: '时间',
						value: this.beTime(it.QDDate)
					}
					
					argslList.push(obj3);
				}
				map.argslList = argslList
				map.originalInfo = it
				return map
			},
			async refshList(type = 'top') {
				if (type === 'top') {
					this.isSend = true
					this.loadingInfo.isLoading = true
					this.getData.page = 1
					this.getListInfo()
					setTimeout(() => {
						this.loadingInfo.isLoading = false
					}, 50)
				}
				if (type === 'bottom') {
					if (this.isSend) {
						this.getData.page += 1
						this.getListInfo()
					}
				}
			}
		},
		async onPullDownRefresh() {
			this.refshLogin()
			this.refshList('top')
			uni.stopPullDownRefresh();
		},
		async onReachBottom() {
			this.refshList('bottom')
		}
	}
</script>

<style scped>
	.titleCard {
		margin: 20rpx 10rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		justify-content: space-between;
		background: rgb(255, 178, 0);
		border-radius: 10rpx;
		position: relative;

	}

	.contentCard {
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		background: white;
		border-radius: 10rpx;
		border: 2rpx solid gray;
	}

	.chooseTitle {
		position: relative;
		font-size: 30rpx;
		color: #000000;
		font-weight: 1000;

	}

	.chooseTitle::after {
		content: '';
		position: absolute;
		height: 6rpx;
		left: 0rpx;
		right: 0rpx;
		bottom: -15rpx;
		background: #000000;
		border-radius: 50rpx;
	}

	.an1 {
		animation: fadeIn 1s;
	}

	.listItem {
		/* margin-top:10rpx; */
		margin-bottom: 20rpx;
		padding: 30rpx;
		border-bottom: 2rpx solid rgba(180, 180, 180, 0.5);
	}

	.itemInfoItem {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}

	.bottomBorder {
		border-bottom: 2rpx solid rgba(180, 180, 180, 0.5);
	}

	.inputBorder {
		height: 89rpx;
		border: 2rpx solid black;
		border-radius: 10rpx;
		position: relative;
		/* z-index:2; */
	}

	.inputBorderFoucs {
		border: 6rpx solid rgb(38, 153, 251);
		position: relative;
		z-index: 1
	}

	.addBtn {
		width: 120rpx;
		height: 120rpx;
		border: 2rpx solid rgba(180, 180, 180, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.delBtn {
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		font-size: 40rpx;
		z-index: 1
	}

	.addBtnCamer {
		font-size: 50rpx;
	}
	
	
	/* .subsection{
		margin: 100rpx 50rpx 40rpx 40rpx;
		border-radius: 20rpx;
	} */
	.lists{
		color: #FFFFFF;
		margin: 40rpx 30rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background: linear-gradient(275deg, rgba(45, 45, 53, 0.1) 0%, #505058 100%);
	}
	.upturn{
		color: red;
		font-weight: bold;
	}
</style>
