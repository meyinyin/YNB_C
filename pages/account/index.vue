<template>
	<view>
		<view class="titleCard">
			<image @tap="backHome" src="../../static/images/newYNBlog.png"
				style="width:135rpx;height:84rpx;margin-left: 30rpx;" mode=""></image>
			<view class="flex align-center">
				<text class="text-bold " style="color:rgb(38,153,251) ;">
					{{userInfo_.No}}
				</text>
				<view class="margin-left-sm text-red">
					<text class="cuIcon-vip margin-left-xs text-bold" style="font-size: 30rpx;">

					</text>
					<text class=" text-sm">
						Lv{{userInfo_.ManagerType===null?0:userInfo_.ManagerType}}
					</text>
				</view>
				<text class="text-red margin-lr-sm">

				</text>
				<text class="cuIcon-sort" @tap="showTitleCardMun = !showTitleCardMun"
					style="font-size:20px; color: black; font-weight: 1000;">

				</text>
			</view>
			<view class="titleCardMun an2" v-if="showTitleCardMun">
				<view class="titleCardMunItem " v-for="(item,index) of munList" :key="`munlist_${index}`"
					@tap="munTap(item,index)">
					<text>
						{{$t(item.label)}}
					</text>
				</view>
			</view>
		</view>
		<view class="padding-lr ">
			<text class="text-black  text-bold FuturaPTLight" style="font-size:60rpx;">
				{{$t('YNB欢迎你！')}}
			</text>
		</view>
		<view class="contentCard">
			<view class=" padding-lr ">
				<view>
					<text class="text-xl FuturaPTLight" style="color: #f1f1f1;">
						{{$t('锁仓')}}:
					</text>
				</view>
				<view @tap="showMoneyDetail" class=" margin-top-sm FuturaPTLight flex align-center "
					style="font-size:50rpx;font-weight: 1000;color: #ffffff;">
					<text>
						{{userInfo_.XiaoFeiScore}}
					</text>
					<text class="margin-left-sm">
						YNB
					</text>
					<text class="margin-left text-white text-df  text-bold">
						({{(userInfo_.FanLiScore*100).toFixed(2)}}%)
					</text>
				</view>
			</view>
			<view></view>
			<view class=" margin-top padding-lr">
				<view>
					<text class="text-xl FuturaPTLight" style="color: #f1f1f1;">
						{{$t('可活动余额')}}:
					</text>
				</view>

				<view @tap="showMoneyDetail" class="margin-top-xs  FuturaPTLight flex "
					style="font-size:50rpx;font-weight: 1000;color: #ffffff;">
					<text>
						{{userInfo_.Score}}
					</text>
					<text class="margin-left-sm">
						YNB
					</text>
				</view>
			</view>

			<view
				style="position: absolute;width:180rpx;height:70rpx;border-radius: 30rpx;background: white;right: 30rpx;top: 50%;"
				class="flex align-center justify-center" @tap="munTap_(munList[4],4)">
				<text class="text-pink">
					{{IsFGS?$t('立即转账'):$t('前去激活')}}
				</text>
			</view>
		</view>
		<view class="margin-top flex align-center justify-between padding-lr">
			<view v-for="(it,jndex) of munList" :key="`mmmuuunnn_${jndex}`" v-if="jndex<=4"
				class="flex flex-direction align-center" @tap="munTap(it,jndex)">
				<view class="flex align-center justify-center">
					<text style="font-size:60rpx;" :class="[`cuIcon-${it.icon}`,`text-${it.color}`]">

					</text>
				</view>
				<view class="margin-top-xs text-sm">
					<text :class="[`text-${it.color}`]">
						{{$t(it.label)}}
					</text>
				</view>
			</view>

		</view>
		<view class="margin-top" v-if="swiperList.length!=0">
			<swiper class="screen-swiper" style="margin: 0rpx 20rpx;height:200rpx "
				:class="true?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" :autoplay="true"
				interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index" style="border-radius: 15rpx;">
					<image :src="item.PicURL" style="border-radius: 15rpx;height:200rpx;" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>


		<view class="margin-tb">
			<view class="margin-bottom ">
				<view class="flex  align-center "
					:style="{'background':item.ManagerType===userInfo_.ManagerType?'rgba(180,180,180,0.3)':'white'}"
					style="border-radius: 15rpx;margin: 30rpx 20rpx;" v-for="(item,index) of infoList"
					:key="`infoList_${index}`">
					<view class="flex align-center justify-center" style="width:20%;height:280rpx;">
						<view class="flex align-center justify-center "
							style="width: 120rpx;height: 120rpx;border-radius: 50%;border: 4rpx dashed "
							:style="{'border-color':item.ManagerType===userInfo_.ManagerType?'red':'rgba(255, 223, 39, 0.9);'}"
							:class="item.ManagerType===userInfo_.ManagerType?'text-red':'text-yellow'">
							<text class="cuIcon-vip margin-right-xs text-bold" style="font-size: 30rpx;">

							</text>
							<text>
								{{item.Name}}
							</text>
						</view>

					</view>

					<view style="width:80%;padding:20rpx">
						<view>
							<text class="text-black text-bold">
								{{item.Info}}
							</text>
						</view>
						<view class="margin-top-sm flex align-center">
							<view>
								<text>
									{{$t('最低锁仓要求')}}:
								</text>
								<text class="margin-left-sm text-green text-xl FuturaPTLight">
									≥ {{item.LockMinNum}}
								</text>
							</view>
						</view>
						<view class="margin-top-sm flex align-center justify-between">
							<view class="flex align-center">
								<text class="text-sm text-black">
									{{$t('放大比例')}}
								</text>
								<text class="text-red text-xl margin-left-xs">
									{{(item.LockBL*100).toFixed(2)}}%
								</text>
							</view>
							<view class="flex align-center">
								<text class="text-sm text-black">
									{{$t('每日返还比列')}}
								</text>
								<text class="text-orange text-xl margin-left-xs">
									{{(item.ReturnBL*100).toFixed(2)}}%
								</text>
							</view>
						</view>
					</view>
				</view>
				<view class="padding-bottom-xl" v-if="infoList.length===0">
					<no-content></no-content>
				</view>
			</view>
		</view>
		<uni-popup ref="moneyDetail" type="bottom" :maskClick="false">
			<view class="padding bg-white" style="border-radius: 20rpx 20rpx 0rpx 0rpx; position: relative;">
				<view class=" flex align-center justify-between text-black text-bold">
					<text>
						{{$t('余额详情')}}
					</text>
					<text class="cuIcon-roundclose" style="font-size:40rpx;" @tap="openOrClose('close','moneyDetail')">

					</text>
				</view>
				<view class="padding-tb flex align-center">
					<view v-for="(item,index) of seeDetailList" class="margin-right" :key="`seeDetail_${index}`"
						:class="seeDetailIndex===item.id?'byChoose text-bold text-xl':' text-grey'"
						@tap="seeDetailIndex=item.id">
						<text>
							{{$t(item.label)}}
						</text>
					</view>
				</view>
				<view class="margin-tb flex align-center">
					<text class=" text-black">
						{{seeDetailIndex===0?$t('可活动余额'):$t('已锁定余额')}}:
					</text>
					<text class="margin-left text-red text-bold">
						{{seeDetailIndex===0?userInfo_.Score:userInfo_.XiaoFeiScore}}
					</text>
				</view>
				<view class="margin-top" v-if="seeDetailIndex===1">
					<view class=" flex align-center">
						<text class=" text-black">
							{{$t('单日释放比例')}}:
						</text>
						<text class="margin-left text-red text-bold">
							{{(userInfo_.FanLiScore*100).toFixed(2)}}%
						</text>
						<text class=" text-black margin-left" style="border-bottom: 2rpx solid black;" @tap="goToEassa">
							({{releaseTitle}})
						</text>
					</view>
					<view class="margin-top-sm flex justify-end">
						<button class="cu-btn bg-red" @tap="openOrClose('close','moneyDetail')">
							<text class="margin-lr">
								{{$t('确定')}}
							</text>
						</button>
					</view>
				</view>
				<view class="margin-top-sm" v-if="seeDetailIndex===0">
					<view>
						<text class="text-bold text-black text-black">
							{{$t('锁定余额')}}
						</text>
					</view>
					<view class="margin-top-sm flex align-center padding-lr-sm"
						style="border: 2rpx solid #000000;height:80rpx;border-radius: 10rpx;">
						<input type="number" v-model="suoDingMoney" style="height:90%;width: 100%;" />
						<text class="text-bold text-grey text-sm">
							YNB
						</text>
					</view>
					<view class="margin-top-sm flex justify-end">
						<button class="cu-btn bg-red" @tap="suoDingSumbit">
							<text class="margin-lr">
								{{$t('确定')}}
							</text>
						</button>
					</view>
					<view class="margin-top flex justify-between">
						<button class="cu-btn bg-blue" @tap="suoDingSumbit">
							<text class="margin-lr">
								{{$t('购买')}}YNB
							</text>
						</button>

						<button class="cu-btn bg-yellow " @tap="goToSell">
							<text class="margin-lr">
								{{$t('出售')}}YNB
							</text>
						</button>
					</view>

				</view>
			</view>
		</uni-popup>
		<load-line v-if="loadingInfo.isLoading" :circleColor="loadingInfo.circleColor"
			:isLoading="loadingInfo.isLoading"></load-line>
	</view>
</template>

<script>
	const MUNLIST = [{
			label: '交易大厅',
			path: '/pages/account/account',
			isTapShell: false,
			icon: 'punch',
			color: 'purple',
		},
		{
			label: '交易记录',
			path: '/pages/account/transactionRecords',
			isTapShell: false,
			icon: 'edit',
			color: 'cyan',
		},
		{
			label: '我的团队',
			path: '/pages/myTeam/index',
			isTapShell: false,
			icon: 'friend',
			color: 'blue',
		},
		{
			label: '我的收益',
			path: '/pages/account/myProfit',
			isTapShell: false,
			icon: 'recharge',
			color: 'orange',
		},
		{
			label: '我的钱包',
			path: '/pages/account/myWallet',
			isTapShell: false,
			icon: 'pay',
			color: 'olive',
		},
		{
			label: '收款方式',
			path: '/pages/account/paymentMethods',
			isTapShell: false,
			icon: 'vipcard',
			color: 'pink',
		}, {
			label: '邀请码',
			path: '/pages/account/invitationCode',
			isTapShell: false,
		},
		{
			label: '资讯列表',
			path: '/pages/account/findList',
			isTapShell: false,
		},
		{
			label: '修改密码',
			path: '/pages/account/setPwd',
			isTapShell: false,
		}, {
			label: '投诉反馈',
			path: '/pages/account/complaintList',
			isTapShell: false,
		},
		{
			label: '退出登录',
			path: '',
			isTapShell: true,
			tapEven: 'loginOut'
		}
	]
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default {
		onHide() {
			this.showTitleCardMun = false
		},
		computed: {
			IsFGS() {
				if (this.hasLogin) {
					return this.userInfo_.IsFGS
				} else {
					return false
				}
			}
		},
		async onShow() {
			this.$Route.routeBefore(this)
			await this.refshLogin()
			let info = await this.getWenZhangDetail(1002)
			if (info.isOk) {
				this.releaseInfo = info.data
				this.releaseTitle = this.releaseInfo.Title
			}
			this.createdMunLis()
		},
		comments: {
			uniPopup
		},
		data() {
			return {
				msg: '',
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				swiperList: [],
				releaseTitle: '',
				releaseInfo: '',
				isLoading: false,
				isSend: true,
				showTitleCardMun: false,
				munList: [],
				byInputVal: '',
				infoList: [],
				btnClickInfo: {},
				listClickIndex: 0,
				seeDetailIndex: 0,
				seeDetailList: [{
					label: '可活动余额',
					id: 0
				}, {
					label: '已锁定余额',
					id: 1
				}],
				suoDingMoney: ''
			}
		},
		mounted() {
			let divs = document.querySelectorAll('.uni-picker-action')
			divs.forEach((it) => {
				it.innerText = this.$t(it.innerText.replace(/\s+/g, ""))
			})
		},
		async onLoad() {
			this.loadingInfo.isLoading = true
			await this.getList();
			await this.getSwiper()
			this.loadingInfo.isLoading = false
		},
		methods: {
			async createdMunLis() {
				this.munList = MUNLIST.map(it=>{
					return it
				})
				
				if (this.userInfo_.IsVIP) {
					this.munList.push({
						label: '管理纠纷',
						path: '/pages/account/manageDisputes',
						isTapShell: false,
					})
				}
					

				let ManagerType = this.userInfo_.ManagerType
				if (ManagerType < 1) {
					let targIndex = 0
					for (let index = 0; index < this.munList.length; index++) {
						let item = this.munList[index]
						if (item.label === '邀请码') {
							targIndex = index
							break
						}
					}
					this.munList.splice(targIndex, 1)
				}


				if (!this.IsFGS) {
					// this.munList.splice(4,1)
					let [err, res] = await this.$Request_.get(this.$allUrl.jhinfo, {
						lan: this.lan_
					})
					if (res != null) {
						if (res.IsSuccess) {
							this.msg = res.Data
						}
					}
				}
			},
			async getSwiper() {
				let [err, res] = await this.$Request_.get(this.$allUrl.alllist, {
					sortid: 2013,
					lan: this.lan_
				})
				if (res != null) {
					if (res.IsSuccess) {
						this.swiperList = res.Data
						return
					}
				}
				this.swiperList = []
			},
			goToEassa() {
				this.$Route.navigateTo('/pages/index/eassayDetail', {
					id: 1002,
					detailTitle: this.releaseTitle
				}, true)
			},
			async getList() {
				if (this.isSend) {
					let [err, res] = await this.$Request_.get(this.$allUrl.viplist, {
						lan: this.lan_
					})
					if (res != null) {
						if (res.IsSuccess) {
							this.infoList = res.Data
							// console.log(this.infoList,291)
						}
					} else {
						this.$api.msg(res.Msg)
					}
				}
			},
			goToSell() {
				this.openOrClose('close', 'moneyDetail')
				this.$Route.navigateTo('/pages/account/goToSell')
			},
			async suoDingSumbit() {
				let num = this.suoDingMoney * 1
				this.openOrClose('close', 'moneyDetail')
				if (num === 0) {
					this.$api.msg(this.$t('请输入正确的内容'), 1500)
					return
				} else {
					let [err, res] = await this.$Request_.get(this.$allUrl.sdscore, {
						num,
						userid: this.userInfo_.ID,
						lan: this.lan_
					})
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
			showMoneyDetail() {
				this.suoDingMoney = ''
				this.openOrClose('open', 'moneyDetail')
			},
			backHome() {
				this.$Route.reLaunch('/pages/index/index')
			},
			async munTap_(item, index) {
				if (this.IsFGS) {
					this.munTap(item, index)
				} else {
					let data = {
						title: this.$t('系统提示'),
						content: this.msg,
						showCancel: false,
						confirmText: this.$t('我知道了')
					}
					let res = await this.$api.showModal(data)
				}
			},
			munTap(item, index) {
				this.showTitleCardMun = false
				if (item.isTapShell) {
					let tapEven = item.tapEven
					if (tapEven === 'loginOut') { //先退出再返回首页
						this.$store.commit('logout')
						this.$Route.reLaunch('/pages/index/index')
					}
				} else {
					let path = item.path
					if (path === '/pages/account/setPwd') {
						this.$Route.navigateTo(path, {
							isForget: false
						}, true)
					} else {
						this.$Route.navigateTo(path)
					}
				}
			},
			openOrClose(type, ref = 'showPop') {
				this.$nextTick(() => {
					this.$refs[ref][type]()
				})
			},
			sumBit(item, index) {
				this.showTitleCardMun = false
				this.listClickIndex = index
				this.btnClickInfo = item
				this.byInputVal = ''
				if (this.chooseTitleIndex === 0) {
					this.openOrClose('open')
				} else {
					this.$Route.navigateTo('/pages/account/goToSell')
				}
			},
			allByOrSell() {
				this.byInputVal = this.btnClickInfo.Num - this.btnClickInfo.LockScores
			}
		},
		async onPullDownRefresh() {
			this.loadingInfo.isLoading = true
			uni.stopPullDownRefresh();
			this.refshLogin()
			this.isSend = true
			await this.getList();
			await this.getSwiper()
			this.loadingInfo.isLoading = false
			this.createdMunLis()
			// uni.stopPullDownRefresh();
		},
		async onReachBottom() {
			// console.log('到底了')
			// await this.getList();
		},
	}
</script>

<style>
	page {
		background: rgb(242, 242, 242);
	}
</style>
<style scoped>
	.titleCard {
		margin: 20rpx 10rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		justify-content: space-between;
		background: rgb(255, 178, 0);
		border-radius: 10rpx;
		position: relative;

	}

	.titleCardMun {
		position: absolute;
		width: 300rpx;
		top: 100rpx;
		right: 0rpx;
		z-index: 1;
		background-color: white;
		box-shadow: 2rpx 2rpx 6rpx rgba(180, 180, 180, 1);
	}

	.titleCardMunItem {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: red;
	}

	.contentCard {
		position: relative;
		height: 350upx;
		background: url('../../static/images/ygye_03.png') no-repeat;
		border-radius: 15upx;
		background-size: cover;
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
	}

	.bottomCard {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;
		width: 100vw;
		min-height: 50px;
		background: rgb(216, 0, 0);
		padding: 8px 13px;
		color: #ffffff;
		display: flex;
		font-size: 14px;
		justify-content: center;
		align-items: center;
	}

	.contentCardTip {
		background: rgb(38, 153, 251);
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.icon {
		width: 40px;
		height: 20px;
	}

	/* .listItem{
		padding:30rpx;
		border-top: 2rpx solid rgba(180,180,180,0.5);
		border-bottom: 2rpx solid rgba(180,180,180,0.5);
	} */
	.touxiang {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70rpx;
		height: 70rpx;
		background: rgb(255, 170, 0);
		color: rgb(216, 0, 0);
		border-radius: 50%;
	}

	.an1 {
		animation: fadeIn 1s;
	}

	.an2 {
		animation: fadeInDown 0.8s
	}

	.byChoose {
		position: relative;
		color: red;
	}

	.byChoose::after {
		content: '';
		position: absolute;
		bottom: -10rpx;
		height: 4rpx;
		left: 0%;
		right: 0%;
		background: red;
		border-radius: red;
	}

	.inputBorder {
		height: 89rpx;
		border: 2rpx solid black;
		border-radius: 10rpx;
		position: relative;
		/* z-index:2; */
	}

	.inputBorderFoucs {
		border: 6rpx solid rgb(38, 153, 251);
		position: relative;
		z-index: 1
	}
</style>
