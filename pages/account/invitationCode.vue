<template>
	<view>
		<view style="padding: 60rpx;">
			<view class="form-header_">
				<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
				<text class="margin-left-sm">{{$t('邀请码')}}</text>
			</view>
			<view class="margin-top-xl " style="margin-top: 60rpx;">
				<view class="cardBg_ padding-top" style="border-radius: 10rpx;">
					<view class="padding flex justify-center align-center">
						<text class="text-bold text-zhuti text-xl FuturaPTLight">
							{{$t('邀请码')}}
						</text>
					</view>
					<view class="flex align-end justify-center">
						<text class="FuturaPTLight text-xxl text-red">
							{{userInfo_.ID}}
						</text>
					</view>
					<view class="flex align-center justify-center margin-top">
						<tki-qrcode ref="qrcode" :val="val"   :size="qrcode.size" :unit="qrcode.unit"  :pdground="qrcode.pdground" />
					</view>
					<view class=" flex justify-center align-center  margin-tb padding-lr copyBtn">
						<view class="tixianNew"  @tap="copy">
							<text>
								{{$t('复制')}}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default{
		onShow() {
			this.$Route.routeBefore(this)
		},
		computed:{
			val(){
				return `http://www.ynbs.xyz/#/pages/register/register?pid=${this.userInfo_.ID}`
			}
		},
		data() {
			return {
				 //二维码的值
				qrcode:{//二维码插件配置
					unit:'upx',
					size:400,
					pdground:'#f9e96b'
				}
			};
		},
		methods:{
			copy(){
				uniCopy({
					content: `${this.userInfo_.ID}`,
					success: (res) => {
						this.$api.msg('OK',1000,true,'success')
					},
					error: (e) => {
						
					}
				})
			}
		}
	}
</script>

<style>
	
</style>
<style scoped>
	.copyBtn{
		color: gray;
	}
	.copyBtn:active{
		color: #000000;
	}
</style>
