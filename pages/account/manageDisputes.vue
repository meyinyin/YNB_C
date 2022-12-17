<template>
	<view>
		<view>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom backColor="text-yellow" bgColor="bg-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">{{$t('管理纠纷')}}</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">{{$t('管理纠纷')}}</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		<view class="margin-top">
			<view v-if="selesList.length!=0">
				<view class="SelesListItemAll" v-for="(seleItem,seleIndex) of selesList" :key="seleIndex">
					<view class="SelesListItem">
						<view class="showItem">
							<view class="text-sm">
								{{$t('买家')}}
							</view>
							<view class="margin-top-sm text-green">
								{{seleItem.UserNick.length===0?'someOne':seleItem.UserNick}}
							</view>
						</view>
						<view class="showItem">
							<view class="text-sm">
								购买数量
							</view>
							<view class="margin-top-sm text-red">
								{{seleItem.Num}}
							</view>
						</view>
						<view class="showItem">
							<view class="text-sm">{{orderSatate_(seleItem).timeLabel}}</view>
							<view class="margin-top-sm text-gray text-sm">
								{{orderSatate_(seleItem).time}}
							</view>
						</view>
						<view class="showItem">
							<view class="text-sm">订单状态</view>
							<view class="margin-top-sm text-bold">
								{{orderSatate_(seleItem).text}}
								<!-- {{.InOrOut?$t('已完成'):$t('未完成')}} -->
							</view>
						</view>
					</view>
					<view class="SelesListItem margin-top">
						<view class="showItem">
							<view class="text-sm text-bold">
								{{$t('卖家')}}
							</view>
							<view class="margin-top-xs text-red">
								{{seleItem.SalerUserNick.length===0?'someOne':seleItem.SalerUserNick}}
							</view>
						</view>
					</view>
					<view class="margin-top-sm" v-if="orderSatate_(seleItem).no.length!=0">
						<text class="text-bold">
							{{$t('订单编号')}}:{{orderSatate_(seleItem).no}}
						</text>
					</view>
					<view  class="margin-top">
						<view>
							<text class="text-bold">
								{{$t('纠纷信息')}}:
							</text>
							<text class="margin-left-sm" style="line-height:1.6em;"
								v-if="seleItem.TSInfo.length!=0">
								{{isInfo(seleItem.TSInfo)}}
							</text>
							<text v-else>
								{{$t('暂无数据')}}
							</text>
						</view>

						<view class="margin-top-sm" v-if="orderSatate_(seleItem).TSPicUrls.length!=0">
							<view>
								<text class="text-bold">
									{{$t('附件展示')}}:
								</text>
							</view>
							<view class="flex align-center margin-top " style="flex-wrap: wrap;">
								<view style="margin:0rpx;border: 0rpx;" class="addBtn "
									v-for="(item,index) of orderSatate_(seleItem).TSPicUrls" :key="index"
									v-if="item.length!=0">
									<image mode="aspectFill"
										@tap="ViewImage(orderSatate_(seleItem).TSPicUrls,item)" :src="item"
										style="width: 100%;height: 100%;margin-left: 10rpx;">

									</image>
								</view>
							</view>
						</view>
					</view>
					<view class="margin-top-sm flex justify-between">
						<button class="cu-btn bg-red " @tap="backSeller(0,seleItem)"><text
								class="text-sm">{{$t('返回金额给卖家并锁定买家')}}</text></button>

						<button class="cu-btn bg-red " @tap="backSeller(1,seleItem)"><text
								class="text-sm">{{$t('返回金额给卖家不锁定买家')}}</text></button>

					</view>

					<view class="margin-top-sm flex justify-between">
						<button class="cu-btn bg-blue " @tap="backBuyer(0,seleItem)"><text
								class="text-sm">{{$t('返还金额给买家并锁定卖家')}}</text></button>
						<button class="cu-btn bg-blue " @tap="backBuyer(1,seleItem)"><text
								class="text-sm">{{$t('返还金额给买家不锁定卖家')}}</text></button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.refshList('top')
		},
		data() {
			return {
				selesList: [],
				isSend: true,
				getData: {
					page: 1,
					pagesize: 10
				}
			}
		},
		methods: {
			orderSatate_(info){
				let obj = {
					text:'',
					isShowFuKuan:false,
					isShowSure:false,
					timeLabel:'',
					time:'',
					isShowTs:false,
					isTsIng:false,
					TSInfo:'',
					tsPicUrl:'',
					isDelete:false,
					no:''
				}
				obj.TSInfo = info.TSInfo
				if(info.TSPicUrls.length!=0){
					obj.TSPicUrls = info.TSPicUrls.split(',')
				}else{
					obj.TSPicUrls = []
				}
				if(info.Info.length!=0){
					obj.no = info.Info
				}
				if(info.InOrOut){
					obj.timeLabel = this.$t('结束时间')
					if(info.EndDate!=null){
						obj.time = this.beTime(info.EndDate)
					}else{
						obj.time = this.beTime(info.QRDate)
					}
					obj.text = this.$t('已完成')
					return obj
				}else{
					if(info.IsFK){
						if(info.IsTK){
							obj.timeLabel = this.$t('退款时间')
							obj.time = this.beTime(info.TKDate)
							obj.text = this.$t('已退款')
							return obj
						}else{
							if(info.IsTS){
								obj.isShowTs = true
								obj.timeLabel = this.$t('纠纷时间')
								obj.time = this.beTime(info.TSDate)
								obj.text = this.$t('纠纷中')
								obj.TSInfo = info.TSInfo
								if(info.TSPicUrls.length!=0){
									obj.TSPicUrls = info.TSPicUrls.split(',')
								}else{
									obj.TSPicUrls = []
								}
								obj.isShowSure = true
								obj.isTsIng = true
								return obj
							}else{
								if(info.IsQR){
									obj.timeLabel = this.$t('确认时间')
									obj.time = this.beTime(info.QRDate)
									obj.text = this.$t('卖家已确认')
									return obj
								}else{
									obj.isShowTs = true
									obj.timeLabel = this.$t('付款时间')
									obj.time = this.beTime(info.FKDate)
									
									obj.isShowSure = true
									obj.isShowFuKuan = false
									obj.text = this.$t('卖家未确认')
									return obj
								}
							}
						}
					}else{
						obj.timeLabel = this.$t('下单时间')
						obj.time = this.beTime(info.AddDate)
						obj.isShowFuKuan = true
						obj.isDelete = true
						obj.text= this.$t('待买家确认')
						return obj
					}	
				}
			},
			async backSeller(type,info) {//返还给卖家
				let getData = {
					userid:info.UserID,
					scorelistid:info.ID,
					islockmj:false,
					lan:this.lan_
				}
				if (type == 0) {
					let data = {
						title: this.$t('系统提示'),
						content: `${this.$t('确定')}${this.$t('返回金额给卖家并锁定买家')}`,
						cancelText: this.$t('取消'),
						confirmText: this.$t('确定')
					}
					let res = await this.$api.showModal(data)
					if (!res) {
						return
					} else {
						getData.islockmj = true
					}
				}
				if(type===1){
					let data = {
						title: this.$t('系统提示'),
						content: `${this.$t('确定')}${this.$t('返回金额给卖家不锁定买家')}`,
						cancelText: this.$t('取消'),
						confirmText: this.$t('确定')
					}
					let res = await this.$api.showModal(data)
					if (!res) {
						return
					}
				}
				this.$api.showLoading_()
				let [err,res] = await this.$Request_.get(this.$allUrl.tkscore,getData)
				this.$api.hidLoading_()
				if(res!=null){
					if(res.IsSuccess){
						this.$api.msg(res.Msg,1500,false,'success')
					}else{
						this.$api.msg(res.Msg,1500,false)
					}
				}
			},
			async backBuyer(type,info) {//返还给买家
				let getData = {
					scorelistid:info.ID,
					islocksaler:false,
					lan:this.lan_
				}
				if (type === 0) {
					let data = {
						title: this.$t('系统提示'),
						content:`${this.$t('确定')}${this.$t('返还金额给买家并锁定卖家')}`,
						cancelText: this.$t('取消'),
						confirmText: this.$t('确定')
					}
					let res = await this.$api.showModal(data)
					if (!res) {
						return
					} else {
						getData.islocksaler = true
					}
				}
				if (type === 1) {
					let data = {
						title: this.$t('系统提示'),
						content:`${this.$t('确定')}${this.$t('返还金额给买家不锁定卖家')}`,
						cancelText: this.$t('取消'),
						confirmText: this.$t('确定')
					}
					let res = await this.$api.showModal(data)
					if (!res) {
						return
					}
				}
				this.$api.showLoading_()
				let [err,res] = await this.$Request_.get(this.$allUrl.tk2score,getData)
				this.$api.hidLoading_()
				if(res!=null){
					if(res.IsSuccess){
						this.$api.msg(res.Msg,1500,false,'success')
					}else{
						this.$api.msg(res.Msg,1500,false)
					}
				}
			},
			ViewImage(urls, url) { //浏览图片
				uni.previewImage({
					urls,
					current: url
				})
			},
			async getCurryInfo() {
				if (this.isSend) {
					let [err, res] = await this.$Request_.get(this.$allUrl.scorejflist, this.getData)
					if (res != null) {
						if (res.IsSuccess) {
							let list = res.Data.map(it => {
								return it
							})
							if (list.length < 10) {
								this.isSend = false
							}

							if (this.getData.page === 1) {
								this.selesList = list
							} else {
								this.selesList = [...this.selesList, ...list]
							}
						}
					}
				}
			},
			async refshList(type) {
				this.$api.showLoading_()
				if (type === 'top') {
					this.isSend = true
					this.getData.page = 1
					await this.getCurryInfo()
				}
				if (type === 'bottom') {
					if (this.isSend) {
						this.getData.page = this.getData.page + 1
						await this.getCurryInfo()
					}
				}
				this.$api.hidLoading_()
			}
		},
		async onPullDownRefresh() {
			this.refshList('top')
			uni.stopPullDownRefresh();
		},
		async onReachBottom() {
			this.refshList('bottom')
		}
	}
</script>

<style scoped>
	.SelesListItemAll {
		padding: 30rpx 20rpx;
		border-bottom: 2rpx solid rgba(180, 180, 180, 0.5);
	}

	.SelesListItemAll {
		padding: 30rpx 20rpx;
		border-bottom: 2rpx solid rgba(180, 180, 180, 0.5);
	}

	.SelesListItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.showItem {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.addBtn {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top: 10rpx;
		margin-left: 10rpx
	}
</style>
