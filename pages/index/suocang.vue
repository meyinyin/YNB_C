<template>
	<view class="login-form">
		<view class="form-header flex align-center justify-between">
			<view class="flex">
				<u-icon name="arrow-left" size="40" color="#ffffff" @click="back()"></u-icon>
				<text>{{$t('余额详情')}}</text>
			</view>
			<view>
				<button class="cu-btn bg-zhuti2 sm round" @tap="toSeller">
					<text class="text-zhuti2">
						{{$t('出售')}}YNB
					</text>
				</button>
			</view>
		</view>
		<view class="bank_card flex justify-center align-center flex-direction">
			<text class="list_word">
				{{$t('可活动余额')}} 
			</text>
			<text class="margin-top text-bold text-xxl">
				{{userInfo_.Score}}
			</text>
		</view>
		<view class="desc margin-top">
			<view>
				<text class="list_word">
					{{$t('已锁定余额')}} ：
				</text>
				<text class="margin-left-sm">
					{{userInfo_.XiaoFeiScore}}
				</text>
			</view>
			<view class="list_word">
				<text>
					{{$t('单日释放比例')}} ：
				</text>
				
				<text style="color: #18B566;margin-right: 20rpx;">
					{{(userInfo_.FanLiScore*100).toFixed(2)}}%
				</text>
				<text class="mergin-left-sm text-sm" style="border-bottom: 2rpx solid white;" @tap="goToEassa">
					({{releaseTitle}})
				</text>
			</view>
		</view>
		<view class="margin-top-xl">
			<view class="lists flex align-center">
				<text class="text-df">{{$t('锁定余额')}} ：</text>
				<!-- <input type="number" v-model="suoDingMoney" style="height:90%;width: 100%;" /> -->
				<u-input :height="'50'"  :customStyle="customStyle" v-model="suoDingMoney"  :border="false" type="number" style="color: white;"></u-input>
				
				<text class="margin-left-sm">
					YNB
				</text>
			</view>
			<view class="tixian" @tap="suoDingSumbit">
				<text>
					{{$t('确定')}}
				</text>
			</view>
		</view>
		<load-line    :isLoading="isLoading" ></load-line>
	</view>
</template>

<script>
	export default {
		onLoad(o) {
			this.releaseTitle = o.releaseTitle
		},
		data() {
			return {
				customStyle:{
					color:'white'
				},
				releaseTitle:'',
				suoDingMoney: '',
				seeDetailIndex: 0,
				seeDetailList: [{
					label: '可活动余额',
					id: 0
				}, {
					label: '已锁定余额',
					id: 1
				}],
				isLoading:false
			};
		},
		methods:{
			toSeller(){
				this.$Route.navigateTo('/pages/account/goToSell')
			},
			back(){
				uni.navigateBack();
			},
			goToEassa() {
				this.$Route.navigateTo('/pages/index/eassayDetail', {
					id: 1002,
					detailTitle: this.releaseTitle
				}, true)
			},
			async suoDingSumbit() {
				let num = this.suoDingMoney * 1
				if (num === 0) {
					this.$api.msg(this.$t('请输入正确的内容'), 1500)
					return
				} else {
					this.isLoading = true
					let [err, res] = await this.$Request_.get(this.$allUrl.sdscore, {
						num,
						userid: this.userInfo_.ID,
						lan: this.lan_
					})
					this.isLoading = false
					if (res != null) {
						if (res.IsSuccess) {
							this.$api.msg('OK', 1500, false, 'success')
							this.refshLogin()
						} else {
							this.$api.msg(res.Msg)
						}
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.login-form{
		padding: 60rpx;
	}
	.form-header{
		color: #FFFFFF;
		font-size: 50upx;
		font-weight: bold;
		margin-bottom: 50upx;
		text{
			padding: 10upx 30upx;
		}
	}
	.lists{
		// background-color: #434655;
		background: linear-gradient(275deg, rgba(45, 45, 53, 0.1) 0%, #505058 100%);
		color: #FFFFFF;
		margin: 20rpx 0rpx;
		padding: 25rpx 40rpx;
		border-radius: 20rpx;
	}
	.bank_card{
		background-color: #D8543E;
		border-radius: 20rpx;
		height: 250rpx;
		color: #FFFFFF;
		// opacity: 0.8;
		padding: 20rpx;
	}
	.desc{
		color: #FFFFFF;
		.list_word{
			margin: 8rpx 2rpx;
		}
	}
	.tixian{
		margin-top: 60rpx;
		background-image: url(../../static/index/tixian_bg.png);
		background-size:contain;
		background-repeat:no-repeat;
		text-align: center;
		color: #77562B;
		line-height: 120rpx;
		font-weight: bold;
		height: 200rpx;
	}
</style>

<style scoped>
</style>
