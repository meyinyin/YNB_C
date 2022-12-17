<template>
	<view>
		<view style="padding: 60rpx;">
			<view>
				<view class="form-header_">
					<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
					<text class="margin-left-sm">{{$t('转账')}}</text>
				</view>
			</view>
			
			<view class="margin-top-xl">
				<view>
					<view class="padding-left">
						<text  class="text-zhuti">
							{{$t('收款地址')}}
						</text>
					</view>
					<view>
						<view class="margin lists_ padding-sm  flex align-center" style="border-radius: 10rpx;height:110rpx;">
							<input type="text" style="width:90%;height: 100%;color:white;font-size:24rpx;"  v-model="walletAddress">
							<view class="flex align-center justify-end" style="width:10%;">
								<text class="cuIcon-peoplelist" style="font-size: 40rpx;">
									
								</text>
							</view>
						</view>
						<view class="margin  padding-sm bg-zhuti2 " v-if="walletAddress.length!=0">
							<text class="text-zhuti2 padding-lr" style="word-wrap:break-word;text-align: center;">
								{{walletAddress}}
							</text>
						</view>
					</view>
				</view>
				
				<view class="margin-top-xl">
					<view class="padding-lr flex align-center justify-between">
						<text  class="text-zhuti">
							{{$t('金额')}}
						</text>
						<text class="text-white">
							{{num*1}} YNB
						</text>
					</view>
					<view>
						<view class="margin padding-tb-sm lists_" style="border-radius: 10rpx;">
							<view class="margin-top padding-lr">
								<input type="number" v-model="num" style="height:100rpx;font-size:80rpx;font-weight:500;color: white;" class="FuturaPTLight">
							</view>
							
							<view class="margin-top padding-lr text-sm text-zhuti">
								<text>
									USDT：
								</text>
								<text>
									{{num*ynbByUsdt*1}}
								</text>
							</view>
							<view class="padding-lr margin-top">
								<view style="height:2rpx;background: rgba(254, 227, 126, 0.9);">
									
								</view>
							</view>
							<view class="padding margin-top-sm flex align-center" style="height: 100rpx;">
								<text class="text-white text-df" style="width: 15%;">
									{{$t('备注')}}:
								</text>
								<input type="text" v-model="info" style="height: 100%;width: 85%;" />
							</view>
							
						</view>
						
						
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="bottomBtn">
			<view class="tixianNew" @tap="next(0)">
				<text>
					{{$t('下一步')}}
				</text>
			</view>
		</view>
		
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
		
		<uni-popup ref="bottomPop" type="top" :maskClick="true" >
			<view class="padding cardBg_" style="padding:60rpx 30rpx ;height: 100vh;">
				<view>
					<view class="form-header_">
						<u-icon name="arrow-left" size="40" color="#ffffff" @click="closeInputPop"></u-icon>
					</view>
				</view>
				
				<view class="margin-bottom flex align-center justify-center">
					<text class="text-xl text-white" style="font-weight: 500;">
						{{$t('风险说明')}}
					</text>
				</view>
				<view class="margin-top">
					<view class="text-zhuti">
						<rich-text style="line-height: 1.5em;" :nodes="Content"></rich-text>
					</view>
				</view>
				<view class="margin-top flex align-center justify-center">
					<view class="tixianNew" @tap="next(1)">
						<text>
							{{$t('我知道了')}}
						</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<load-line v-if="loadingInfo.isLoading" :circleColor="loadingInfo.circleColor" :isLoading="loadingInfo.isLoading"></load-line>
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
				loadingInfo:{
					circleColor:'rgb(255,255,255)',
					isLoading:false
				},
				walletAddress:'',
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
				focusIndex:4
			}
		},
		methods:{
			async next(type){
				if(type===0){
					if(this.walletAddress.length===0){
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					if(this.num*1===0){
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					this.$nextTick(()=>{
						this.$refs.bottomPop.open()
					})
				}
				if(type===1){
					this.$nextTick(async ()=>{
						this.$refs.bottomPop.close()
						this.loadingInfo.isLoading = true
						let data = {
							userid:this.userInfo_.ID,
							qbdz:this.walletAddress,
							num:this.num*1,
							lan:this.lan_
						}
						let [err,res] = await this.$Request_.get(this.$allUrl.zhuangzhang,data)
						this.loadingInfo.isLoading = false
						if(res!=null){
							if(res.IsSuccess){
								this.$api.msg('OK',1500,true,'success')
							}else{
								this.$api.msg(res.Msg)
							}
						}
						
						// this.$nextTick(()=>{
						// 	this.$refs.inputSumbit.open()
						// })
					})
				}
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
			closeInputPop(){
				this.$nextTick(()=>{
					this.$refs.bottomPop.close()
				})
			}
		},
	}
</script>

<style>
</style>
<style scoped>
	.bottomBtn{
		width: 100vw;
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
