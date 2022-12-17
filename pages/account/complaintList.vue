<template>
	<view>
		<view style="padding: 60rpx;">
			<view class="form-header_ justify-between align-center">
				<view class="flex align-center">
					<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
					<text class="margin-left-sm">{{$t('投诉反馈')}}</text>
				</view>
				<view>
					<button class="cu-btn sm bg-grey round " @tap="showFk">
						<text class="text-white margin-lr-sm">
							{{$t('添加反馈')}}
						</text>
					</button>
				</view>
			</view>
			
			<view>
				<view v-if="infoList.length!=0">
					<view class="fanKuiItem cardBg_"  style="margin-bottom:50rpx;border-radius: 10rpx;" v-for="(item,index) of infoList" :key="index" @tap="goToDetail(item)">
						<view class="padding" >
							<view class="flex align-center justify-between">
								<view class="cu-tag bg-zhuti3 text-zhuti2">
									<text class="margin-lr-xs" style="font-size: 24rpx;">
										{{$t('帮助信息')}}
									</text>
								</view>
								<view class="text-grey">
									<text class="text-sm">
										{{beTime(item.AddDate)}}
									</text>
								</view>
							</view>
							<view class="margin-top text-cut">
								<text class="text-xxl text-white  FuturaPTLight " style="font-weight:600;">
									{{item.Name}}
								</text>
							</view>
							<view class="margin-top-sm text-cut_ text-zhuti" >
								<text >
									{{item.Content}}
								</text>
							</view>
							<view class="margin-top-sm flex align-end" v-if="item.Title.length!=0">
								<text class="text-sm text-gray">
									{{$t('订单编号')}}:
								</text>
								<text class="text-bold text-sm margin-left-xs">
									{{item.Title}}
								</text>
							</view>
							<view class="margin-top-xl flex justify-end">
								<text class="text-white text-sm">
									{{$t('查看详情')}} >>
								</text>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="padding-bottom-xl">
					<no-content></no-content>
				</view>
			</view>
		</view>
		<add-fnkui :targetid="0" :isShow="isShowTousu" @touSuSumBit="touSuSumBit"></add-fnKui>
		<load-line  :isLoading="loadingInfo.isLoading"></load-line>
	</view>
</template>

<script>
	import addFnkui from '@/components/addFnKui.vue'
	export default{
		data(){
			return {
				isShowTousu:false,
				infoList:[],
				getData:{
					userid:0,
					page:1,
					pagesize:10
				},
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
			}
		},
		onLoad() {
			this.refshList('top')
		},
		components:{
			addFnkui
		},
		methods:{
			goToDetail(item){
				this.$Route.navigateTo('/pages/account/complainDetail',{
					ID:item.ID
				},true)
			},
			async refshList(type) {
				this.$nextTick(async ()=>{
					if (type === 'top') {
						this.loadingInfo.isLoading = true
						this.isSend = true
						this.getData.page = 1
						await this.getCurryInfo()
						this.loadingInfo.isLoading = false
					}
					if (type === 'bottom') {
						if (this.isSend) {
							this.getData.page = this.getData.page + 1
							await this.getCurryInfo()
						}
					}
				})
				
			},
			async getCurryInfo(){
				this.getData.userid = this.userInfo_.ID
				if(this.isSend){
					let [err,res] = await this.$Request_.get(this.$allUrl.msglistnew,this.getData)
					if(res!=null){
						let list = res.Data
						if(list.length<10){
							this.isSend = false
						}
						if(this.getData.page===1){
							this.infoList = list
						}else{
							this.infoList = [...this.infoList,...list]
						}
						console.log(this.infoList)
					}
				}
			},
			async touSuSumBit(obj){
				let isClose = obj.isClose
				this.isShowTousu = false
				if(!isClose){
					if(obj.isOk){
						this.refshList('top')
					}
				}
			},
			showFk(){
				console.log(this.isShowTousu)
				if(this.isShowTousu === false){
					this.isShowTousu = true
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
	.addBtn{
		width:150rpx;
		height: 150rpx;
		position: fixed;
		bottom: 50rpx;
		right:0rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.addbtn_{
		width:100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: rgb(255,178,0);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.text-cut_{
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
