<template>
	<view class="login-form">

		<u-form>
			<view class="form-header">
				<view class="flex justify-center" style="margin-top: 20rpx;">
					<text class="text-bold text-df">
						{{$t('重要！请写下恢复词汇')}}
					</text>
				</view>
				<view class="margin-top-sm padding-lr-xl">
					<text class="FuturaPTLight text-df text-zhuti" style="text-align: center;font-weight: 100;">
						{{$t('这是恢复密码的唯一方法。恢复词汇注册后不会再显示。请用笔与纸把密码恢复词汇抄写下，或者使用密码管理器储存。')}}

					</text>
				</view>
			</view>
			<view class="margin-top-xl">
				<view class="padding-left">
					<text class="text-bold text-white">
						{{$t('恢复钥匙')}}
					</text>
				</view>
				<view class="padding-lr margin-top-xs">
					<view class="cardContent">
						<view class="cardContentZZ" v-show="showCopy" :class="zzClass">
							<text class="text-white FuturaPTLight">
								{{$t('复制成功')}}
							</text>
						</view>
						<view class="cardContentItem bg-zhuti2" v-for="(item,index) of cardList" :key="index">
							<text class="cardContentItemJB">
								{{index+1}}
							</text>
							<text class="text-sm FuturaPTLight text-zhuti1" >
								{{item}}
							</text>
						</view>
					</view>
					<view class="margin-top-sm flex justify-center">
						<view class="copyBtn" @tap="copy">
							<text class="cuIcon-copy" style="font-size:40rpx;"></text>
							<text class="FuturaPTLight text-sm ">
								{{$t('复制恢复词汇')}}
							</text>
						</view>
					</view>
					<view class="margin-top-sm text-white">
						<p class="FuturaPTLight " style="text-align: center;">
							{{$t('请勿把隐币恢复钥匙提供给任何人或任何网站。')}}
						</p>
						<p class="FuturaPTLight " style="text-align: center;">
							{{$t('拥有恢复钥匙人可完全控制您的钱包和所有的隐币！')}}
						</p>
					</view>
					<!-- <view class="margin-top flex justify-center">
						<view class="authentication__continue-btn flex align-center justify-center" @tap="netx">
							<text class="FuturaPTLight">
								{{$t('下一步')}}
							</text>
						</view>
					</view> -->
					<view class="form-btn  margin-top-xl" @tap="netx">
						{{$t('下一步')}}
					</view>
				</view>
			</view>



		</u-form>

	</view>
</template>

<script>
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default {
		onShow() {
			this.$Route.routeBefore(this)
			this.cardList = this.routeOption.cardList
		},
		data() {
			return {
				cardList: [],
				showCopy: false,
				zzClass: ''
			}
		},
		methods: {
			copy() {
				if (!this.showCopy) {
					this.zzClass = 'an1'
					this.showCopy = true
					let str = ''
					this.cardList.forEach((it, index) => {
						if (index != 0) {
							str = `${str}  ${index+1}. ${it}`
						} else {
							str = `${index+1}. ${it}`
						}

					})
					uniCopy({
						content: str,
						success: (res) => {
							this.zzClass = 'an2'
							setTimeout(() => {
								this.showCopy = false
							}, 500)
						},
						error: (e) => {
							
						}
					})
				}
			},
			netx() {
				this.$Route.navigateTo('/pages/reg/regThree')
			}
		}
	}
</script>


<style lang="scss">
	.login-form {
		.u-form {
			padding: 30upx;

			.form-header {
				color: #FFFFFF;
				font-size: 50upx;
				font-weight: bold;
				margin-bottom: 50upx;

				text {
					padding: 10upx 30upx;
				}
			}

			.u-form-item {
				background-color: #FFFFFF;
				padding: 10upx 50upx;
				border-radius: 50upx;
				border-width: 0;
				margin-bottom: 40upx;

			}

			.u-border-bottom::after {
				border-width: 0;
			}

			.u-form-item--left__content__label {
				color: #060518;
			}

			.send-code {
				background: linear-gradient(90deg, #F0D8A6 0%, #EBC181 100%);
				color: #060518;
				border-radius: 30upx;
				padding: 10upx 30upx;
			}

			.form-btn {
				background: linear-gradient(90deg, #F0D8A6 0%, #EBC181 100%);
				text-align: center;
				padding: 25upx 30upx;
				border-radius: 50upx;
			}
		}
	}
</style>

<style scoped>
	.cardContent {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		position: relative;
	}

	.cardContentZZ {
		position: absolute;
		left: 0rpx;
		right: 0rpx;
		bottom: 0rpx;
		top: 0rpx;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
	}

	.cardContentItem {
		height: 70rpx;
		width: 23%;
		/* background: white; */
		color: red;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10rpx;
		position: relative;
	}

	.cardContentItemJB {
		position: absolute;
		top: 2rpx;
		left: 2rpx;
		color: #000000;
		font-size: 20rpx;
	}

	.copyBtn {
		width: 256rpx;
		height: 66rpx;
		border-radius: 8rpx;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		color: white;
	}

	.authentication__continue-btn {
		background-color: #d80000;
		border-radius: 4px;
		color: #fff;
		font-size: 20px;
		font-weight: bold;
		height: 48px;
		text-transform: uppercase;
		width: 312px;
	}

	.an1 {
		animation: fadeIn 0.5s;
	}

	.an2 {
		animation: fadeOut 0.5s;
	}
</style>
