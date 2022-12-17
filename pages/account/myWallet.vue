<template>
	<view style="padding: 60rpx;padding-bottom: 100rpx;">
		<view>
			<view class="form-header">
				<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
				<text>{{$t('我的钱包')}}</text>
			</view>
			<view class="walletCard contentCard cardBg" style="padding-bottom: 0rpx;margin-top:80rpx;">
				<view class="flex justify-center">
					<text class="text-white">
						{{$t('钱包地址')}}
					</text>
				</view>
				<view class="margin-top-xl " style="line-height: 1.5em;">
					<text class="text-black padding-lr text-zhuti" style="word-wrap:break-word;text-align: center;">
						{{walletAddress}}
					</text>
				</view>
				<view class="margin-top-xl copyContent bg-zhuti3 flex justify-center text-zhuti2 align-center" style="border-radius: 0rpx 0rpx 10rpx 10rpx;padding:40rpx;font-size:30rpx;" @tap="copyWalletAddress">
					<text class="cuIcon-copy">
						
					</text>
					<text class="margin-left-sm">
						{{$t('复制')}}
					</text>
				</view>
			</view>
			<view style="height: 30rpx;">
				
			</view>
			<view class="bank_card  flex justify-center align-center flex-direction" v-for="(item,index) of payWays" :key="index">
				<text class="list_word">
					{{$t('可用资产')}}
				</text>
				<view class="margin-top-sm text-bold text-xxl">
					<text>
						{{item.Balance}}
					</text>
					<text class="margin-left-sm">
						{{item.Code===null?'XLM':item.Code}}
					</text>
				</view>
			</view>	
			<view class="margin-top-xl flex align-center justify-center">
				<!-- <button class="cu-btn bg-zhuti2 round " >
					<text class="padding-lr-xl">
						
					</text>
				</button> -->
				<view class="tixianNew" @tap="transferAccounts_(0)">
					<text>
						{{$t('添加钱包')}}
					</text>
				</view>
			</view>
			
		</view>
		<view class="bottomBtn flex  justify-between">
			<button class="cu-btn bg-grey round" @tap="transferAccounts_(1)">
				<text class="padding-lr-xl">
					XLM{{$t('转账')}}
				</text>
			</button>
			
			
			<button class="cu-btn bg-black round" @tap="transferAccounts">
				<text class="padding-lr-xl">
					YNB{{$t('转账')}}
				</text>
			</button>
		</view>
		
		<load-line  :isLoading="loadingInfo.isLoading"></load-line>
	</view>
</template>

<script>
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default{
		async onShow() {
			// this.$Route.routeBefore(this)
			this.getPayS()
			this.refshLogin()
		},
		data(){
			return {
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				payWays:[]
			}
		},
		methods:{
			copyWalletAddress(){
				uniCopy({
					content: this.walletAddress,
					success: (res) => {
						this.$api.msg('OK',1000,true,'success')
					},
					error: (e) => {
						
					}
				})
			},
			transferAccounts_(type = 0){
				if(type===0){
					this.$Route.navigateTo('/pages/account/AddWallet')
				}
				if(type===1){
					this.$Route.navigateTo('/pages/account/transferAccountsXLM')
				}
			},
			transferAccounts(){
				this.$Route.navigateTo('/pages/account/transferAccounts')
			},
			async getPayS(){
				this.$nextTick(async ()=>{
					this.loadingInfo.isLoading = true
					let [err,res] = await this.$Request_.get(this.$allUrl.getaccountbalance,{
						accountid:this.userInfo_.CheckDesc
					})
					this.loadingInfo.isLoading = false
					if(res!=null){
						if(res.IsSuccess){
							let Data = JSON.parse(res.Data)
							this.payWays = Data
						}
					}
				})
			},
		},
		computed:{
			walletAddress(){
				return this.userInfo_.CheckDesc
			}
		},
		async onPullDownRefresh() {
			this.refshLogin()
			this.getPayS()
			uni.stopPullDownRefresh();
		},
	}
</script>


<style scoped>
	.titleCard{
		margin:20rpx 10rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		justify-content: space-between;
		background: rgb(255,178,0);
		border-radius: 10rpx;
		position: relative;
	}
	.contentCard{
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		/* background: white; */
		border-radius: 10rpx;
		border: 2rpx solid gray;
	}
	.copyContent:active{
		color: #000000;
	}
	.bottomBtn{
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: linear-gradient(275deg, rgba(45, 45, 53,0.9) 0%, #505058 100%);
	}
	.form-header{
			color: #FFFFFF;
			font-size: 50upx;
			font-weight: bold;
			margin-bottom: 50upx;
		}
		
	.bank_card{
		background-color: #D8543E;
		border-radius: 20rpx;
		height: 200rpx;
		color: #FFFFFF;
		/* // opacity: 0.8; */
		padding: 20rpx;
		margin-top: 30rpx;
	}
	.desc{
		color: #FFFFFF;
	}
	
	.list_word{
		margin: 8rpx 2rpx;
	}
	
	.cardBg{
		background-image: linear-gradient(45deg,rgba(114, 113, 126, 1.0),rgba(85, 84, 94, 1.0),rgba(71, 70, 79, 1.0),rgba(64, 64, 71, 1.0),rgba(80, 79, 88, 1.0),rgba(72, 72, 80, 1.0),rgba(131, 129, 144, 1.0));
	}
</style>

