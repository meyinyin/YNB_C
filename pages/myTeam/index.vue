<template>
	<view>
		<view style="padding: 60rpx;">
			<view class="flex align-center form-header_">
				<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
				<text class="margin-left-sm ">{{$t('我的团队')}}</text>
			</view>
			<view v-if="infoList.length!=0">
				<view v-for="(item,index) of 10" :key="index" class="shadow-zhuti1 margin-bottom-xl flex align-center cardBg_ padding justify-between" style="border-radius: 10rpx;" >
					<view class="flex flex-direction align-start text-black " style="width: 33%;">
						<text class="text-zhuti">
							{{$t('用户名')}}
						</text>
						<text class="margin-top-sm text-white">
							{{item.No}}
						</text>
					</view>
					<view class="flex flex-direction align-center   text-black " style="width: 33%;">
						<text class="text-zhuti">
							{{$t('注册时间')}}
						</text>
						<text class="margin-top-sm text-white">
							{{beTime_(item.AddDate)}} 
						</text>
					</view>
					<view class="flex flex-direction align-end  text-black " style="width: 33%;">
						<text class="text-zhuti ">
							{{$t('状态')}}
						</text>
						<text class="margin-top-sm text-white">
							Lv {{item.ManagerType}} 
						</text>
					</view>
				</view>
			</view>
			<view v-else class="padding-bottom-xl">
				<no-content></no-content>
			</view>
		</view>
		
		
		<load-line  :isLoading="loadingInfo.isLoading"></load-line>
	</view>
</template>

<script>
	export default{
		onShow() {
			this.$Route.routeBefore(this)
			this.refshList('top')
		},
		data(){
			return {
				infoList:[],
				chooseId:0,
				isSend:true,
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				getData: {
					userid: 0,
					page: 1,
					pagesize: 10
				},
			}
		},
		methods:{
			async getListInfo() {
				if (this.isSend) {
					this.getData.userid = this.userInfo_.ID
					let [err, res] = await this.$Request_.get(this.$allUrl.userteamlist, this.getData)
					if (res != null) {
						if (res.IsSuccess) {
							let list = res.Data
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
			async refshList(type = 'top') {
				this.$nextTick(async () => {
					if (type === 'top') {
						this.isSend = true
						this.loadingInfo.isLoading = true
						this.getData.page = 1
						this.getListInfo()
						setTimeout(() => {
							this.loadingInfo.isLoading = false
						}, 200)
					}
					if (type === 'bottom') {
						if (this.isSend) {
							this.getData.page += 1
							this.getListInfo()
						}
					}
				})
			}
		},
		async onPullDownRefresh() {
			// this.refshLogin()
			this.refshList('top')
			uni.stopPullDownRefresh();
		},
		async onReachBottom() {
			this.refshList('bottom')
		}
	}
</script>

<style >
	/* page{
		background-color: black
	} */
</style>

<style scoped>
	.titleChooseCard{
		padding:40rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgb(51,51,51);
		width: 45%;
		height:100rpx;
	}
</style>
