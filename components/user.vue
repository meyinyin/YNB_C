<template>
	<view style="padding-bottom: 150rpx;">
		<view style="position: fixed;right:30rpx;top:35rpx;" class="flex flex-direction align-end titleCardMunContent">
			<view>
				<text class="cuIcon-sort" style="font-size: 49rpx;color: white;font-weight: 1000;" @tap="showTitleCardMun = !showTitleCardMun">
					
				</text>
			</view>
			<view class="text-sm text-zhuti">
				<text>
					{{curryLan}}
				</text>
			</view>
			
			<view class="titleCardMun cardBg_ an2"  v-if="showTitleCardMun">
				<view class="titleCardMunItem " v-for="(item,index) of munListLang" :key="index" @tap="munTapLang(item,index)">
					<text>
						{{$t(item.label)}}
					</text>
				</view>
			</view>
		</view>
		
		<view class="tops">
			
			
			<text>{{$t('可活动余额')}} </text>
			<view>
				<text style="font-weight: 1000;color: #ffffff;">
					{{userInfo_.Score}}
				</text>
				<text class="margin-left-sm">
					YNB
				</text>
			</view>
			<!-- 菜单 -->
			<u-row class="tool-quick">
				<u-col :span="6" :offset="0">
					<view style="position: relative;"@tap="munTap({label: '交易记录',path: '/pages/account/transactionRecords',isTapShell: false,icon: 'edit',color: 'cyan'})">
						<image  src="/static/index/cz.png" mode="widthFix" class="btn" >
							
						</image>
						<text class="munCard-text">
							{{$t('交易记录')}}
						</text>
					</view>
				</u-col>
				<u-col :span="6" >
					<view style="position: relative;"@tap="munTap({label: '我的团队',path: '/pages/myTeam/index',isTapShell: false,icon: 'friend',color: 'blue'})">
						<image  src="/static/index/cz.png" mode="widthFix" class="btn" >
							
						</image>
						<text class="munCard-text">
							{{$t('我的团队')}}
						</text>
					</view>
				</u-col>
			</u-row>
		</view>
		
		<view class="lists" v-for="(item,index) in munList" :key="index" @tap="munTap(item,index)">
			<u-row gutter="16" >
				<u-col span="2">
					<view style="width:70rpx;height: 70rpx;border-radius: 50%;" class="bg-zhuti3 flex align-center justify-center ">
						<text class="text-bold  text-zhuti1" style="font-size: 35rpx;" :class="[`cuIcon-${item.icon}`]">
							
						</text>
					</view>
				</u-col>
				<u-col span="9">
					<text >{{$t(item.label)}}</text>
				</u-col>
				<u-col span="1" >
					>
				</u-col>
			</u-row>
		</view>
		<load-line :isLoading="isLoading"></load-line>
	</view>
</template>

<script>
	const MUNLIST = [
		// {
		// 	label: '交易大厅',
		// 	path: '/pages/account/account',
		// 	isTapShell: false,
		// 	icon: 'punch',
		// 	color: 'purple',
		// },
		// {
		// 	label: '交易记录',
		// 	path: '/pages/account/transactionRecords',
		// 	isTapShell: false,
		// 	icon: 'edit',
		// 	color: 'cyan',
		// },
		// {
		// 	label: '我的团队',
		// 	path: '/pages/myTeam/index',
		// 	isTapShell: false,
		// 	icon: 'friend',
		// 	color: 'blue',
		// },
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
			icon: 'qr_code',
		},
		// {
		// 	label: '资讯列表',
		// 	path: '/pages/account/findList',
		// 	isTapShell: false,
		// },
		{
			label: '修改密码',
			path: '/pages/account/setPwd',
			isTapShell: false,
			icon: 'edit',
		}, 
		{
			label: '投诉反馈',
			path: '/pages/account/complaintList',
			isTapShell: false,
			icon: 'comment',
		},
		{
			label: '退出登录',
			path: '',
			isTapShell: true,
			tapEven: 'loginOut',
			icon: 'delete',
		}
	]
	export default {
		name:"user",
		props:{
			isOnPullDownRefresh:{
				type:Boolean,
				default:false
			}
		},
		async created() {
			this.$nextTick(async ()=>{
				this.isLoading = true
				await this.refshLogin()
				this.createdMunLis()
				this.isLoading = false
			})
		},
		watch:{
			async isOnPullDownRefresh(n,o){
				if(n){
					this.$nextTick(async ()=>{
						this.isLoading = true
						await this.refshLogin()
						this.createdMunLis()
						this.isLoading = false
						this.$emit('isOverDownRefresh',4)
					})
				}
			}
		},
		computed: {
			IsFGS() {
				if (this.hasLogin) {
					return this.userInfo_.IsFGS
				} else {
					return false
				}
			},
			curryLan(){
				let localeList = ['en','zh','ja','ko']
				let locale = this.$store.state.locale
				if(locale==='en'){
					return this.$t('英文')
				}
				if(locale==='zh'){
					return this.$t('简体中文')
				}
				if(locale==='ja'){
					return this.$t('日文')
				}
				if(locale==='ko'){
					return this.$t('韩文')
				}
			}
		},
		data() {
			return {
				munList:[],
				isLoading:false,
				showTitleCardMun:false,
				munListLang:[
					{
						label:'英文',
						key:'en'
					},
					{
						label:'简体中文',
						key:'zh'
					},{
						label:'日文',
						key:'ja'
					},{
						label:'韩文',
						key:'ko'
					},
				],
			};
		},
		methods:{
			munTapLang(item,index){
				this.showTitleCardMun = false
				this.changLocale(item.key)
			},
			changLocale(locale){
				this.$store.commit('changLocale',locale)
				this.$i18n.locale = this.locale
			},
			click(){
				console.log('22')
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
				if (item.isTapShell) {
					let tapEven = item.tapEven
					if (tapEven === 'loginOut') { //先退出再返回首页
						console.log(2)
						this.$store.commit('logout')
						this.$Route.reLaunch('/pages/login/login');
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
			//退出登录
			logout(){
				uni.removeStorageSync('tokens');
				uni.reLaunch({
				    url: '/pages/login/login'
				});
			},
			//提现页面
			withdraw(){
				uni.navigateTo({
				    url: '/pages/money/withdraw'
				});
			},
			//充值页面
			recharge(){
				uni.navigateTo({
				    url: '/pages/money/recharge'
				});
			},
			actions(page){
				console.log(page);
				if(page == "logout"){
					this.logout();
				}
			}
		}
	}
</script>

<style lang="scss">
	.tops{
		background-color: #3A3A3E;
		height: 420rpx;
		text-align: center;
		color: #FFFFFF;
		padding-top: 100rpx;
		font-weight: bold;
		border-bottom: 5rpx solid #979797;
	}
	.tops view{
		margin-top: 20rpx;
		font-size: 50rpx;
	}
	.tool-quick{
		.btn{
			width: 90%;
			height: 60upx;
		}
		margin: 50upx 50upx;
	}
	.lists{
		// background-color: #434655;
		background: linear-gradient(275deg, rgba(45, 45, 53, 0.1) 0%, #505058 100%);
		color: #FFFFFF;
		margin: 30rpx 50rpx;
		padding: 20rpx 40rpx;
		border-radius: 40rpx;
	}
</style>

<style scoped>
	.munCard{
		width: 100%;
		height: 110rpx;
		background-color: red;
		border-radius: 10rpx;
		background-image: linear-gradient(45deg,rgba(114, 113, 126, 1.0),rgba(85, 84, 94, 1.0),rgba(71, 70, 79, 1.0),rgba(64, 64, 71, 1.0),rgba(80, 79, 88, 1.0),rgba(72, 72, 80, 1.0),rgba(131, 129, 144, 1.0));
		display: flex;
		align-items: center;
		justify-content: center;
		padding:30rpx;
	}
	.titleCardMunContent{
		font-size: 20rpx !important;
		z-index: 1;
	}
	.titleCardMun{
		position: absolute;
		width: 180rpx;
		top:50rpx;
		right:-30rpx;
		z-index:1;
		/* background-color:rgba(107, 112, 130, 1.0); */
		/* box-shadow: 2rpx 2rpx 6rpx rgba(232, 232, 232, 0.8); */
	}
	.titleCardMunItem{
		width: 100%;
		height:60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 24rpx;
		font-weight: 100;
	}
	.an2{animation:fadeInDown  0.5s}
</style>
