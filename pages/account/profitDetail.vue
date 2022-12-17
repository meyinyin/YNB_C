<template>
	<view>
		<view style="padding: 60rpx;">
			<view class="form-header_">
				<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
				<text class="margin-left-sm">{{$t(routeOption.title)}}</text>
			</view>
			
			<view class="padding-tb" v-if="infoList.length!=0">
				<view class="listItem shadow-zhuti1 lists_" v-for="(item,index) of infoList" :key="index">
					<view style="width:82%">
						<view class="" style="width: 100%;">
							{{item.info}}
						</view>
						<view class="margin-top-sm text-gray">
							<text>
								{{item.time}}
							</text>
						</view>
					</view>
					<view style="width:18%" class="flex justify-end text-zhuti text-bold">
						<text>
							+
						</text>
						<text>
							 {{item.addNum}}
						</text>
					</view>
				</view>
			</view>
			<view v-else class="padding-xl">
				<no-content></no-content>
			</view>
		</view>
		
		<load-line :isLoading="loadingInfo.isLoading"></load-line>
	</view>
</template>

<script>
	export default{
		onShow() {
			this.$Route.routeBefore(this)
		},
		onLoad() {
			this.sortId = this.routeOption.sortId
			this.title = this.routeOption.title
			this.apiUrl = this.routeOption.url
			this.getData.userid = this.userInfo_.ID
			this.sortType = this.routeOption.sortType
			this.refshList('top')
		},
		data(){
			return {
				sortType:0,
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				apiUrl:'',
				sortId:0,
				title:'',
				infoList:[
					// {
					// 	info:`加成得到收益`,
					// 	time:'2021-3-1  08:30',
					// 	addNum:1000000
					// }
				],
				getData:{
					page:1,
					pagesize:10,
					userid:0
				},
				isSend:true
			}
		},
		methods:{
			async refshList(type = 'top') {
				this.$nextTick(async () => {
					if (type === 'top') {
						this.isSend = true
						this.loadingInfo.isLoading = true
						this.getData.page = 1
						this.getListInfo()
						setTimeout(() => {
							this.loadingInfo.isLoading = false
						},50)
					}
					if (type === 'bottom') {
						if (this.isSend) {
							this.getData.page += 1
							this.getListInfo()
						}
					}
				})
			},
			async getListInfo(){
				if(this.isSend){
					let [err,res] = await this.$Request_.get(this.apiUrl,this.getData)
					if(res!=null){
						if(res.IsSuccess){
							let list = res.Data.map(it=>{
								let obj = {}
								if(this.sortType===0){
									let info1 = `${it.Info}+${this.$t('锁仓')}${it.NID}+${this.$t('可用')}${it.MID}`
									let info2 = ''
									// if(it.PID===0){
									// 	info2 = `${this.$t('直推会员')}`
									// }else{
									// 	info2 = `${this.$t('第')}${it.PID}${this.$t('层')}`
									// }
									// obj.info = `${info1},${info2}`
									obj.info = `${info1}`
									obj.addNum = it.Num
									obj.time = this.beTime(it.AddDate)
								}
								if(this.sortType===1){
									obj.info = `${this.$t('锁仓')}${it.PID}YNB`
									obj.addNum = it.KDNum
									obj.time = this.beTime(it.AddDate)
								}
								obj.otherInfo = it
								return obj
							})
							if(list.length<10){
								this.isSend = false
							}
							if(this.getData.page===1){
								this.infoList = list
							}else{
								this.infoList = [...this.infoList,...list]
							}
						}
					}
				}
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
	.listItem{
		padding: 30rpx;
		display: flex;
		margin-bottom: 30rpx;
		align-items: center;
	}
</style>
