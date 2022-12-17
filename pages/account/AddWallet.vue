<template>
	<view>
		<view style="padding: 60rpx;">
			<view>
				<view class="form-header_">
					<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
					<text>{{$t('余额详情')}}</text>
				</view>
			</view>
			
			<view class="margin-top-xl">
				<view>
					<view class="padding-left">
						<text class="text-zhuti">
							{{$t('钱包发行账户地址')}} ：
						</text>
					</view>
					<view>
						<view class="margin padding-sm bg-white lists_ flex align-center" style="border-radius: 10rpx;height:90rpx;">
							<input type="text" style="width:100%;height: 100%;font-size:24rpx;color: white;"  v-model="walletAddress">
						</view>
						<view class="margin  padding-sm bg-zhuti2 " v-if="walletAddress.length!=0">
							<text class="text-black padding-lr" style="word-wrap:break-word;text-align: center;">
								{{walletAddress}}
							</text>
						</view>
					</view>
				</view>
				
				<view>
					<view class="padding-left">
						<text class="text-zhuti">
							{{$t('钱包代码')}} ：
						</text>
					</view>
					<view>
						<view class="margin padding-sm lists_ bg-white flex align-center" style="border-radius: 10rpx;height:90rpx;">
							<input type="text" style="width:100%;height: 100%;color:white;font-size:24rpx;"  v-model="walletAddreCode">
						</view>
						<view class="margin  padding-sm bg-zhuti2 " v-if="walletAddreCode.length!=0">
							<text class="text-black padding-lr" style="word-wrap:break-word;text-align: center;">
								{{walletAddreCode}}
							</text>
						</view>
					</view>
				</view>
				<view class="margin-top padding text-white flex align-center">
					<text>
						*
					</text>
					<text class="margin-left-sm">
						
						{{$t('每添加一个新钱包,至少需给本账号转入0.5XLM,仅限添加 Stellar 代币')}}
					</text>
				</view>
				<!-- <view class="flex padding align-center justify-between bg-white margin" style="border-radius: 10rpx;">
					<text class="text-bold">
						{{$t('矿工费')}}
					</text>
					
					<text class="text-sm text-gray">
						{{SCORE}} XLM
					</text>
				</view> -->
				<!-- <view class="margin-top-xl">
					<view class="padding-lr flex align-center justify-between">
						<text>
							{{$t('金额')}}
						</text>
						<text class="text-grey">
							{{num*1}} YNB
						</text>
					</view>
					<view>
						<view class="margin padding-tb-sm bg-white " style="border-radius: 10rpx;">
							<view class="margin-top padding-lr">
								<input type="number" v-model="num" style="height:100rpx;font-size:80rpx;color: #000000;font-weight:500;" class="FuturaPTLight">
							</view>
							
							<view class="margin-top padding-lr text-sm text-gray">
								<text>
									USDT：
								</text>
								<text>
									{{num*ynbByUsdt*1}}
								</text>
							</view>
							<view class="padding-lr margin-top">
								<view style="height:2rpx;background: rgba(180,180,180,0.5);">
									
								</view>
							</view>
							<view class="padding margin-top-sm flex align-center" style="height: 100rpx;">
								<text class="text-gray text-xl" style="width: 15%;">
									{{$t('备注')}}
								</text>
								<input type="text" v-model="info" style="height: 100%;width: 85%;" />
							</view>
							
						</view>
						
						
						
						
					</view>
				</view> -->
			</view>
			<view class="bottomBtn">
				<view class="tixianNew" @tap="next(0)">
					<text>
						{{$t('确定')}}
					</text>
				</view>
			</view>
		</view>
		
		<load-line  :isLoading="loadingInfo.isLoading"></load-line>
		
		<uni-popup ref="inputSumbit" type="center" :maskClick="false" >
			<view class="bg-white padding" style="width:90vw;border-radius: 10rpx;">
				<view class="margin-bottom flex align-center justify-between">
					<text>
						
					</text>
					<text class="cuIcon-roundclose" style="font-size: 40rpx;" @tap="closePop">
						
					</text>
				</view>
				<view>
					<view v-for="(item,index) of form" :key="index"   class="margin-top" >
						<view class="text-bold margin-bottom-sm">
							{{$t('词语')}}{{item.label}}
						</view>
						<view  class="bg-white padding-lr-sm inputBorder" :class="index===focusIndex?'inputBorderFoucs':''">
							<input @blur="focusIndex=4" @focus="focus(index)"   type="text" v-model="formInput[index]" style="width:100%;height: 100%;" />
						</view>
					</view>
				</view>
				<view class="padding margin-top flex justify-center align-center">
					<button class="cu-btn bg-red" @tap="sumbit">
						<text class="margin">
							{{$t('确定')}}
						</text>
					</button>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="bottomPop" type="bottom" :maskClick="true" >
			<view class="padding bg-white" style="border-radius: 10rpx 10rpx 0rpx 0rpx;">
				<view class="margin-bottom flex align-center justify-center">
					<text class="text-xl" style="font-weight: 500;">
						{{$t('风险说明')}}
					</text>
				</view>
				<view class="margin-top">
					<view class="text-grey">
						<rich-text style="line-height: 1.5em;" :nodes="Content"></rich-text>
					</view>
				</view>
				<view class="margin-top flex align-center justify-center">
					<button class="cu-btn bg-red" @tap="next(1)">
						<text class="margin">
							{{$t('我知道了')}}
						</text>
					</button>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default{
		async onShow() {
			this.$Route.routeBefore(this)
			let info = await this.getWenZhangDetail(2)
			if(info.isOk){
				this.Content = info.content
			}
			this.getneedscore()
		},
		components:{
			uniPopup
		},
		data(){
			return {
				Content:'',
				walletAddress:'',
				walletAddreCode:'',
				num:'',
				info:'',
				form:[
					{
						label:'#6',
						value:''
					},
					{
						label:'#10',
						value:''
					}
				],
				formInput:[
					'',
					''
				],
				focusIndex:4,
				loadingInfo:{
					circleColor:'rgb(255,255,255)',
					isLoading:false
				},
			}
		},
		methods:{
			async next(type){
				this.$nextTick(async ()=>{
					if(this.walletAddress.length===0){
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					if(this.walletAddreCode.length===0){
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
									
					this.loadingInfo.isLoading = true
					let data = {
						userid:this.userInfo_.ID,
						code:this.walletAddreCode,
						issuingPublicKeys:this.walletAddress,
						lan:this.lan_
					}
					let [err,res] = await this.$Request_.get(this.$allUrl.addqb,data)
					this.loadingInfo.isLoading = false
					if(res!=null){
						if(res.IsSuccess){
							this.$api.msg('OK',1500,true,'success')
						}else{
							this.$api.msg(res.Msg)
						}
					}
				})
			},
			closePop(){
				this.$nextTick(()=>{
					this.$refs.inputSumbit.close()
				})
			},
			sumbit(){
				this.closePop()
			},
			focus(index){
				this.focusIndex = index
			},
		},
	}
</script>

<style>
</style>
<style scoped>
	.bottomBtn{
		left: 0rpx;
		right: 0rpx;
		position: fixed;
		bottom: 0rpx;
		padding: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.inputBorder{
		height:89rpx;border: 2rpx solid black; border-radius: 10rpx;
		position:relative;
		/* z-index:2; */
	}
	.inputBorderFoucs{
		border:6rpx solid rgb(38,153,251);
		position:relative;
		z-index:1
	}
</style>
