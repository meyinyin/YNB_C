<template>
	<view class="padding-bottom-xl" >
		<view class="form-header" style="padding: 50rpx;padding-bottom: 20rpx;">
			<u-icon name="arrow-left" size="40" color="#ffffff" @click="back()"></u-icon>
			<text style="padding: 10upx 30upx;">{{$t('卖出详单')}}</text>
		</view>
		<view class="padding-lr">
			<view>
				<view v-for="(item,index) of infoList" :key="index" class="infoItem">
					<text class="text-zhuti">
						{{$t(item.label)}} ：
					</text>
					<text class="text-bold text-white">
						{{item.needTr?$t(item.value):item.value}}
					</text>
				</view>
			</view>
			
			<view class="margin-top">
				<view class="lists">
					<text class="padding-left text-bold text-xl">
						{{$t('收款方式')}}
					</text>
				</view>
				<view class="padding" style="margin-top: -20rpx;">
					<view class="bottomBorder padding-tb " v-for="(it,index_) of bankList" :key="`${index_}payWay`">
						<view>
							<text class="text-bold  text-xl text-zhuti">
								{{it.title}}
							</text>
						</view>
						<view class="margin-top-sm" v-for="(jtem,dex) of it.infoList" :key="dex">
							<view  class="text-zhuti flex  " v-if="jtem.label.length!=0">
								<text>
									{{jtem.needTrLbel?$t(jtem.label):jtem.label}}
								</text>
							</view>
							<view  class=" text-white    margin-top-xs ">
								<p style="word-break: break-all;" >
									{{jtem.needTrValue?$t(jtem.value):jtem.value}}
								</p>
							</view>
						</view>
						<view class="flex align-center margin-top-xs justify-between" style="flex-wrap: wrap;" v-if="it.pics.length!=0">
							<view style="margin:0rpx;border: 0rpx;" class="addBtn " v-for="(imgurl,urlIndex) of it.pics" :key="`image_${urlIndex}`">
								<image mode="aspectFill"  @tap="ViewImage(it.pics,imgurl)" :src="imgurl"  style="width: 100%;height: 100%;">
									
								</image>
							</view>
						</view>
					</view>
				</view>
				<view>
					<view class="lists">
						<text class="padding-left text-bold text-xl">
							{{$t('购买明细')}}
						</text>
					</view>
					<view v-if="selesList.length!=0">
						<view class="SelesListItemAll" v-for="(seleItem,seleIndex) of selesList" :key="seleIndex">
							<view class="SelesListItem">
								<view class="showItem">
									<view class="text-sm text-zhuti">
										{{$t('用户名')}}
									</view>
									<view class="margin-top-sm">
										{{seleItem.ScoresList.UserNick.length===0?'someOne':seleItem.ScoresList.UserNick}}
									</view>
								</view>
								<view class="showItem">
									<view class="text-sm text-zhuti">
										{{$t('购买数量')}}
									</view>
									<view class="margin-top-sm text-green">
										{{seleItem.ScoresList.Num}}
									</view>
								</view>
								<view class="showItem">
									<view class="text-sm text-zhuti">{{orderSatate(seleItem.ScoresList).timeLabel}}</view>
									<view class="margin-top-sm text-gray text-sm">
										{{orderSatate(seleItem.ScoresList).time}}
									</view>
								</view>
								<view class="showItem">
									<view class="text-sm text-zhuti">{{$t('订单状态')}}</view>
									<view class="margin-top-sm text-bold">
										{{orderSatate(seleItem.ScoresList).text}}
										<!-- {{.InOrOut?$t('已完成'):$t('未完成')}} -->
									</view>
								</view>
							</view>
							<view class="margin-top-sm" v-if="orderSatate(seleItem.ScoresList).no.length!=0">
								<text class="text-bold text-zhuti">
									{{$t('订单编号')}} ：
									<text class="text-white">
										{{orderSatate(seleItem.ScoresList).no}}
									</text>
								</text>
							</view>
							<view class="margin-top-sm" v-if="orderSatate_(seleItem.ScoresList).isShow">
								<text class="text-bold text-zhuti">
									{{$t('交易状态')}} ：
									<text class="text-white">
										{{orderSatate_(seleItem.ScoresList).info}}
									</text>
								</text>
							</view>
							<view v-if="orderSatate(seleItem.ScoresList).isTsIng" class="margin-top">
								<view class="text-white">
									<text class="text-bold text-zhuti">
										{{$t('纠纷信息')}}:
									</text>
									<text class="margin-left-sm" style="line-height:1.6em;" v-if="seleItem.ScoresList.TSInfo.length!=0">
										{{isInfo(seleItem.ScoresList.TSInfo)}}
									</text>
									<text v-else>
										{{$t('暂无数据')}}
									</text>
								</view>
								
								<view class="margin-top-sm" v-if="orderSatate(seleItem.ScoresList).TSPicUrls.length!=0">
									<view>
										<text class="text-bold text-zhuti">
											{{$t('附件展示')}}:
										</text>
									</view>
									<view class="flex align-center margin-top " style="flex-wrap: wrap;">
										<view style="margin:0rpx;border: 0rpx;" class="addBtn " v-for="(item,index) of orderSatate(seleItem.ScoresList).TSPicUrls" :key="index"  v-if="item.length!=0">
											<image mode="aspectFill"  @tap="ViewImage(orderSatate(seleItem.ScoresList).TSPicUrls,item)" :src="item"  style="width: 100%;height: 100%;margin-left: 10rpx;">
												
											</image>
										</view>
									</view>
								</view>
							</view>
							
							
							<view class="margin-top-sm flex justify-between">
								<view>
									<button class="bg-red round cu-btn sm" v-if="orderSatate(seleItem.ScoresList).isShowTs" @tap="showPop(seleItem,seleIndex,2)">
										{{$t('投诉')}}
									</button>
								</view>
								<view >
									<button   v-if="orderSatate(seleItem.ScoresList).isShowSure" class="cu-btn sm round bg-zhuti2" :disabled="seleItem.ScoresList.InOrOut" @tap="showPop(seleItem,seleIndex)">
										{{$t('确认卖出')}}
									</button>
								</view>
							</view>
						</view>
					</view>
					<view v-else>
						<no-content></no-content>
					</view>
				</view>
			</view>	
		</view>
		
	
		
		<order-series :backOrClose="true"  @orderSeriesEve="orderSeriesEve" :orderComponent="orderComponent"></order-series>
		<load-line  :isLoading="loadingInfo.isLoading"></load-line>
		
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
		onLoad(option) {
			if('id' in option){
				this.pageID = option.id*1
			}
			this.getDetail()
		},
		data(){
			return {
				ismj:false,
				isShowTousu:false,
				scorelistid:0,
				orderComponent:{
					isShowSurePopSellOut:false,
					showPurchaseFuJianList:[]
				},
				pageID:0,
				loadingInfo:{
					circleColor:'rgb(255,255,255)',
					isLoading:false
				},
				pageInfo:{},
				infoList:[
					{
						label:'卖出总数',
						key:'Num',
						value:'',
						needTr:false
					},{
						label:'已售总数',
						key:'LockScores',
						value:'',
						needTr:false
					},{
						label:'交易状态',
						key:'IsOver',
						value:'',
						needTr:false
					}
				],
				bankList:[],
				selesList:[],
				clickItemInfo:{
					info:{},
					index:0
				},
			}
		},
		async onPullDownRefresh() {
			await this.getDetail();
			uni.stopPullDownRefresh();
		},
		methods:{
			back(){
				this.$Route.navigateBack()
			},
			orderSatate_(itemInfo){
				if('StateNum' in itemInfo){
					let StateNum = itemInfo.StateNum
					if(StateNum===null){
						return {
							isShow:false
						}
					}
					
					
					if(StateNum===0){
						return {
							isShow:false
						}
					}else{
						let map = {
							isShow:true
						}
						let info = ''
						if(StateNum===1){
							info = this.$t('订单有争议,争议处理中')
						}
						if(StateNum===888){
							info = this.$t('订单争议处理后，返还售卖金额给卖家')
						}
						if(StateNum===999){
							info = this.$t('订单争议处理后，返还售卖金额给卖家,并锁定买家账号')
						}
						if(StateNum===666){
							info = this.$t('订单争议处理后，售卖金额转给买家')
						}
						if(StateNum===777){
							info = this.$t('订单争议处理后，售卖金额转给买家,并锁定卖家账号')
						}
						map.info = info
						return map
					}
				}else{
					return {
						isShow:false
					}
				}
				
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
			ViewImage(urls,url) {//浏览图片
				uni.previewImage({
					urls,
					current:url
				})
			},
			async orderSeriesEve(thing){
				this.orderComponent.isShowSurePopSellOut = false
				if(thing.isSumBit){
					let {isTrue} = thing
					console.log(this.clickItemInfo.info)
					let getData = {
						userid:this.userInfo_.ID,
						scoreid:this.pageID,
						scorelistid:this.clickItemInfo.info.ScoresList.ID,
						lan:this.lan_
					}
					this.$api.showLoading_()
					let [err,res] = await this.$Request_.get(this.$allUrl.qrgmscore,getData)
					this.$api.hidLoading_()
					if(res.IsSuccess){
						this.getDetail()
					}else{
						this.$api.msg(res.Msg)
					}
				}
			},
			showPop(item,index,type=1){
				this.clickItemInfo.index = index
				this.clickItemInfo.info = item
				if(type===1){
					this.orderComponent.showPurchaseFuJianList = this.clickItemInfo.info.Pics
					// console.log( this.clickItemInfo.info)
					this.orderComponent.isShowSurePopSellOut = true
				}
				if(type===2){
					this.ismj = false
					this.scorelistid = this.clickItemInfo.info.ScoresList.ID
					this.isShowTousu = true
				}
			},
			async getDetail(id){
				this.$nextTick(async ()=>{
					this.loadingInfo.isLoading = true
					let [err,res] = await this.$Request_.get(this.$allUrl.salesinfo,{
						scoresid:this.pageID
					});
					this.loadingInfo.isLoading = false
					if(res!=null){
						if(res.IsSuccess){
							this.pageInfo = res
							
							let data = this.pageInfo.Data
							this.infoList.forEach((it,index)=>{
								let key = it.key
								let value = data[key]
								if(key === 'IsOver'){
									this.infoList[index].value = value?'已完成':'未完成'
									this.infoList[index].needTr = true
								}else{
									this.infoList[index].value = value
								}
							})
							
							
							let bankList = []
							this.pageInfo.BankList.forEach(item=>{
								let it = item.Bank
								
								let obj = {}
								obj.title = it.BankName
								let infoList = []
								infoList.push({
									label:'',
									value:it.BankAddress
								})
								infoList.push({
									label:this.$t('备注'),
									value:it.BankNo
								})
								obj.infoList = infoList
								
								
								let pics = item.Pics.map(it=>{return it.PicUrl})
								
								obj.infoList = infoList
								obj.pics = pics
								bankList.push(obj)
								
								
							})
							this.bankList = bankList
							
							
							
							this.selesList = this.pageInfo.SelesList
							
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	.bottomBorder{
		/* border-bottom: 2rpx solid rgba(180,180,180,0.5); */
	}
	.infoItem{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding:10rpx 20rpx;
		/* justify-content: space-between; */
		/* border-bottom: 2rpx solid rgba(180,180,180,0.5); */
	}
	.SelesListItemAll{
		padding: 30rpx 0rpx;
		border-bottom: 2rpx solid rgba(225, 225, 225, 0.5);
	}
	.SelesListItem{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.showItem{
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
	}
	.addBtn{
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top:10rpx;
		margin-left:10rpx
	}
</style>

<style scoped>
	.form-header{
		color: #FFFFFF;
		font-size: 50upx;
		font-weight: bold;
		margin-bottom: 30upx;
		display: flex;
		align-items: center;
	}
	.lists{
		background: linear-gradient(275deg, rgba(45, 45, 53, 0.1) 0%, #505058 100%);
		color: #FFFFFF;
		margin: 20rpx 0rpx 0rpx 0rpx ;
		padding: 25rpx 40rpx;
		border-radius: 20rpx;
	}
</style>