<template>
	<view>
		<load-line :isLoading="loadingInfo.isLoading"></load-line>
		<order-series :isNotFk="isNotFk" :showfkAddTime="showfkAddTime" :isShowTsInfo="isShowTsInfo"  :isTSBtn="isTSBtn" @ts="ts"  :backOrClose="true"  @orderSeriesEve="orderSeriesEve" :orderComponent="orderComponent"></order-series>
		<tousu-component :isShow="isShowTousu" :ismj="ismj" :scorelistid="scorelistid"   @touSuSumBit="touSuSumBit"></tousu-component>
	</view>
</template>

<script>
	import orderSeries from '@/components/orderSeries.vue'
	import tousuComponent from '@/components/tousuComponent.vue'
	export default{
		components:{
			orderSeries,
			tousuComponent
		},
		onLoad() {
			if('id' in this.routeOption){
				this.orderId = this.routeOption.id*1
			}
			if('isSurePopPurchase' in this.routeOption){
				let isSurePopPurchase = this.routeOption.isSurePopPurchase*1
				if(isSurePopPurchase===0){//确认卖出
					this.orderComponent.orderDetailBtn.isSurePopPurchase = false
				}else{//确认付款
					this.orderComponent.orderDetailBtn.isSurePopPurchase = true
				}
			}
			if('num' in this.routeOption){
				this.orderComponent.orderDetailInfo.AllNum = this.routeOption.num
			}
			if('scorelistid' in this.routeOption){
				this.scorelistid = this.routeOption.scorelistid
				// console.log(this.scorelistid)
			}
			this.$Route.routeBefore(this)
			this.getDetail()
		},
		data(){
			return{
				isNotFk:false,
				fkAddTime:0,
				showfkAddTime:-1,
				isTSBtn:false,
				loadingInfo:{
					circleColor:'rgb(255,255,255)',
					isLoading:false
				},
				scorelistid:0,
				orderId:0,
				orderAllInfo:{},
				isShowTsInfo:{
					isShow:false,
					TSInfo:'',
					TSPicUrls:[],
				},
				orderComponent:{
					Info:'',
					isShowSurePopPurchase:false,//确认付款的弹窗显示控制，
					isShowSurePopSellOut:false,//确认卖出的弹窗显示控制
					orderDetail:false,//订单详情的弹窗显示控制
					isFirstPurchaseSure:true,//确认卖出是否为第一次
					showPurchaseFuJianList:[],//订单详情的附件信息，在确认卖出时也会被使用（买入用户的附件）
					showSellOutFuJianList:[],//订单详情的附件信息（卖出详情的附件）
					orderDetailInfo:{//订单的详情数组信息
						AllNum:'92.000000',
						detailList:[
							{
								label:'类型',
								value:'普通买入'
							}
						],
						bankList:[
							{
								title:'支付宝',
								infoList:[
									{
										label:'',
										value:3349
									}
								]
							}
						]
					},
					orderDetailBtn:{//订单详情是否显示按钮，以及按钮的控制能力
						isShowBtn:false,//是否显示底部按钮，当订单未完成的时候才会显示
						isSurePopPurchase:true,//确认付款？
					}
				},
				addFuJianList:[],
				ismj:true,
				isShowTousu:false,
				setInrervalIDs:[],
			}
		},
		watch:{
			showfkAddTime(n,o){
				if(this.isNotFk){
					if(n<=0){
						this.clearIntervals()
						let data={
							title: this.$t('尊敬的用户'),
							content: this.$t('付款时间已错过'),
							showCancel:false,
							confirmText:this.$t('确定')
						}
						uni.showModal(data).then(data => {
							var [err, res] = data
							if (res.errMsg === 'showModal:ok') {
								if (res.confirm) {
									uni.navigateBack()
								} else if (res.cancel) {
									uni.navigateBack()
								}
							} else {
								uni.navigateBack()
							}
						})
					}
				}
			},
			async isNotFk(n,o){
				if(n){
					let showfkAddTime = this.overTime(this.fkAddTime)
					if(showfkAddTime<=0){
						this.showfkAddTime = 0
						this.clearIntervals()
					}else{
						this.showfkAddTime = showfkAddTime
					}
					let setInrervalID =  setInterval(()=>{
						let showfkAddTime = this.overTime(this.fkAddTime)
						if(showfkAddTime<=0){
							this.showfkAddTime = 0
							this.clearIntervals()
						}else{
							this.showfkAddTime = showfkAddTime
						}
					},1000)
					this.setInrervalIDs.push(setInrervalID)
				}else{
					this.clearIntervals()
				}
			}
		},
		methods:{
			clearIntervals(){
				if(this.setInrervalIDs.length!=0){
					for(let id of this.setInrervalIDs){
						if(id!=0){
							clearInterval(id)
						}
					}
					this.setInrervalIDs = []
				}
			},
			ts(){
				this.isShowTousu = true
			},
			async touSuSumBit(obj){
				let isClose = obj.isClose
				this.isShowTousu = false
				if(!isClose){
					let {info,picurl,isOk} = obj
					if(isOk){
						this.getDetail()
					}
				}
			},
			overTime(end){
				
				let date = new Date();
				let now = date.getTime();
				now = now*1 
				return Math.ceil((end - now)/1000);
			},
			async getDetail(id){
				this.$nextTick(async ()=>{
					this.loadingInfo.isLoading = true
					this.orderComponent.orderDetail = false
					this.orderComponent.isShowSurePopPurchase = false
					this.orderComponent.isShowSurePopSellOut = false
					let [err,res] = await this.$Request_.get(this.$allUrl.salesinfo,{
						scoresid:this.orderId
					});
					if(res!=null){
						if(res.IsSuccess){
							this.orderAllInfo = res
							this.loadingInfo.isLoading = false
							
							let Data = this.orderAllInfo.Data
							
							this.orderComponent.orderDetailInfo.Info = this.orderAllInfo.Data.Info
							
							
							//*************************************//
							let detailList = []
							let curryOrder = {}
							for(let item of this.orderAllInfo.SelesList){
								// console.log(item.ScoresList.ID,this.scorelistid*1)
								if(item.ScoresList.ID === this.scorelistid*1){
									curryOrder  = item
								}
							}
							
							
							let stateInfo = this.orderSatate(curryOrder.ScoresList)
							this.isTSBtn = stateInfo.isShowTs
							this.isNotFk = !curryOrder.ScoresList.IsFK
							
							// console.log(curryOrder.ScoresList)
							
							
							if(this.isNotFk){
								this.fkAddTime = (curryOrder.ScoresList.AddDate.split('(')[1].split(")")[0]) * 1 + 900000
							}
							
							if(stateInfo.isTsIng){
								this.isShowTsInfo.isShow = true
								this.isShowTsInfo.TSInfo = stateInfo.TSInfo
								this.isShowTsInfo.TSPicUrls = stateInfo.TSPicUrls
							}else{
								this.isShowTsInfo.isShow = false
							}
							
							
							detailList.push({
								label:'订单状态',
								value:stateInfo.text,
								needTrLbel:true,
								needCopy:false
							})
							detailList.push({
								label:stateInfo.timeLabel,
								value:stateInfo.time,
								needTrLbel:true,
								needCopy:false
							})
							detailList.push({
								label:'订单编号',
								value:curryOrder.ScoresList.Info,
								needTrLbel:true,
								needCopy:true
							})
							this.orderComponent.orderDetailInfo.detailList = detailList
							
							this.orderComponent.orderDetailBtn.isShowBtn = stateInfo.isShowFuKuan
							
							
							//*************************************//
							let bankList = []
							this.orderAllInfo.BankList.forEach(item=>{
								let it = item.Bank
								let obj = {}
								obj.title = it.BankName
								let infoList = []
								infoList.push({
									label:'',
									value:it.BankAddress
								})
								infoList.push({
									label:'备注',
									value:it.BankNo
								})
								
								let pics = item.Pics.map(it=>{return it.PicUrl})
								
								obj.infoList = infoList
								obj.pics = pics
								bankList.push(obj)
							})
							console.log(bankList)
							this.orderComponent.orderDetailInfo.bankList = bankList
							this.orderComponent.orderDetail = true
						}
					}
				})
				
			},
			async orderSeriesEve(infoObj){
				let isSumBit = infoObj.isSumBit
				let thing = infoObj.thing
				this.orderComponent.orderDetail = false
				this.orderComponent.isShowSurePopPurchase = false
				this.orderComponent.isShowSurePopSellOut = false
				if(thing==='purchaseSureOver' || thing === 'sellOutSureOver'){
					this.orderComponent.orderDetail = true
				}
				if(isSumBit){//提交类型
					if(thing==='orderDetailOver'){//详情的按钮
						let isSurePopPurchase = infoObj.isSurePopPurchase
						if(isSurePopPurchase){//是不是确认付款
							this.orderComponent.isShowSurePopPurchase = true
						}else{//是确认卖出
							this.orderComponent.isShowSurePopSellOut = true
						}
					}
					if(thing === 'purchaseSureOver'){//确认付款
						this.addFuJianList = infoObj.addFuJianList.map(it=>{
							return it
						})
						// console.log(this.addFuJianList)
						let getData = {
							userid:this.userInfo_.ID,
							scorelistid:this.scorelistid,
							picurl:'',
							info:'',
							lan:this.lan_
						}
						// console.log(getData)
						// console.log('确认付款')
						let resData = await this.qrfkscoreRequest(getData)
						if(resData.isOk){
							this.orderComponent.orderDetailBtn.isShowBtn = false
							this.isNotFk = false
						}
					}
					if(thing==='sellOutSureOver'){//确认售出
						// console.log('确认卖出')
					}
				}else{//非提交关闭即可 
					
				}
			}
		},
		onUnload() {
			this.clearIntervals()
		},
		computed:{
		}
	}
</script>

<style>
	
</style>
<style scoped>
	
</style>
