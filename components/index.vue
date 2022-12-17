<template>
	<view class="index">
		<view class="titleCard">
			<image  src="@/static/images/newYNBlog.png"
				style="width:135rpx;height:84rpx;margin-left: 30rpx;" mode=""></image>
			<view class=" flex align-center">
				<text class="text-bold text-xl" style="color:rgb(255, 255, 255) ;">
					{{userInfo_.No}}
				</text>
				<view class="margin-left-sm text-zhuti">
					<text class="cuIcon-vip margin-left-xs text-bold" style="font-size: 30rpx;">
		
					</text>
					<text class=" text-sm margin-left-xs" >
						Lv{{userInfo_.ManagerType===null?0:userInfo_.ManagerType}}
					</text>
				</view>
				<text class="text-red margin-lr-sm">
		
				</text>
			</view>
		</view>
		
		<view class="u-u-swiper">
			<u-swiper  :height="250" :list="swiperList" :title="false"    :interval="3000"></u-swiper>
		</view>
		
		<!-- 菜单 -->
		<u-row class="tool-quick"  >
			<u-col :span="6" :offset="0">
				<view style="position: relative;" @click="goToPage('qianbao')">
					<image  src="/static/index/cz.png" mode="widthFix" class="btn" >
						
					</image>
					<text class="munCard-text">
						{{$t('我的钱包')}}
					</text>
				</view>
				
			</u-col>
			<u-col :span="6" :offset="0">
				
				<view style="position: relative;" @click="goToPage('shouyi')">
					<image  src="/static/index/tx.png" mode="widthFix" class="btn" >
						
					</image>
					<text class="munCard-text">
						{{$t('我的收益')}}
					</text>
				</view>
				
			</u-col>
		</u-row>	
		
		<!-- 余额 -->
		<view class="balance" @tap="showMoneyDetail">
			<view class="flex align-center">
				<text class="title">{{$t('锁仓')}} ：</text>
				<view class="money FuturaPTLight margin-left">
					<!-- {{888888888888}} -->
					<text style="font-weight: 1000;color: #ffffff;">
						{{userInfo_.XiaoFeiScore}}
					</text>
					<text class="margin-left-sm">YNB</text>
					<text class="margin-left text-white text-df  text-bold">
						({{(userInfo_.FanLiScore*100).toFixed(2)}}%)
					</text>
				</view>
			</view>
			<view class="flex align-center">
				<text class="title margin-top">
					{{$t('可活动余额')}} ：
				</text>
				<view class="money FuturaPTLight">
					<text style="font-weight: 1000;color: #ffffff;">
						{{userInfo_.Score}}
					</text>
					<text class="margin-left-sm">
						YNB
					</text>
				</view>
			</view>
			
		</view>
		
		<!-- 商品列表 -->
		<view class="product-list">
			<!-- <text>商品列表</text> -->
			
			<view class="list-body">
				
				<u-row class="item down " v-for="(item,index) of infoList" :key="`infoList_${index}`"  :class="item.ManagerType===userInfo_.ManagerType?'shadow-zhuti1':''">
					<u-col :span="2" :offset="0" class="icon-line">
						<image src="/static/index/icon.png" mode="widthFix" class="icon"></image>
					</u-col>
					
					<u-col :span="2" :offset="0" class="diff-icon">
						<image src="/static/index/down.png" mode="widthFix" class="icon"></image>
						<text  :style="{'font-size':item.ManagerType===userInfo_.ManagerType?'35rpx':'30rpx'}" style="font-size:35rpx;" :class="item.ManagerType===userInfo_.ManagerType?'text-zhuti':'text-white'">{{item.Name}}</text>
					</u-col>
					
					<u-col :span="4" class="item-name">
						<view class="text-sm">{{item.Info}}</view>
						
					</u-col>
					
					
					<u-col :span="4" class="item-price">
						<text class="text-zhuti">{{$t('最低锁仓要求')}}</text>
						<view class="text-bold">≥ {{item.LockMinNum}}</view>
					</u-col>
				</u-row>
				
				
			</view>
		</view>
		<load-line :isLoading="loadingInfo.isLoading"></load-line>
		
		<uni-popup ref="moneyDetail" type="bottom" :maskClick="false">
			<view class="padding bg-zhuti1" style="position: relative;">
				<view class="text-white flex align-center justify-between text-black text-bold">
					<text>
						{{$t('余额详情')}}
					</text>
					<text class="cuIcon-close" style="font-size:40rpx;" @tap="openOrClose('close','moneyDetail')">
		
					</text>
				</view>
				<view class="padding-tb flex align-center">
					<view v-for="(item,index) of seeDetailList" class="margin-right" :key="`seeDetail_${index}`"
						:class="seeDetailIndex===item.id?'byChoose text-bold text-xl':'text-gray'"
						@tap="seeDetailIndex=item.id">
						<text>
							{{$t(item.label)}}
						</text>
					</view>
				</view>
				<view class="margin-tb flex align-center">
					<text class="text-zhuti">
						{{seeDetailIndex===0?$t('可活动余额'):$t('已锁定余额')}} ：
					</text>
					<text class="margin-left text-zhuti text-bold">
						{{seeDetailIndex===0?userInfo_.Score:userInfo_.XiaoFeiScore}}
					</text>
				</view>
				<view class="margin-top" v-if="seeDetailIndex===1">
					<view class=" flex align-center">
						<text class="text-zhuti">
							{{$t('单日释放比例')}}:
						</text>
						<text class="margin-left text-red text-bold">
							{{(userInfo_.FanLiScore*100).toFixed(2)}}%
						</text>
						<text class=" text-white margin-left" style="border-bottom: 2rpx solid black;" @tap="goToEassa">
							({{releaseTitle}})
						</text>
					</view>
					<view class="margin-top-sm flex justify-end">
						<button class="cu-btn bg-zhuti2 round shadow-zhuti2" @tap="openOrClose('close','moneyDetail')">
							<text class="margin-lr">
								{{$t('确定')}}
							</text>
						</button>
					</view>
				</view>
				<view class="margin-top-sm" v-if="seeDetailIndex===0">
					<view>
						<text class="text-bold text-white text-black">
							{{$t('锁定余额')}}
						</text>
					</view>
					<view class="margin-top-sm flex align-center padding-lr-sm"
						style="border: 2rpx solid #efefef;height:80rpx;border-radius: 10rpx;">
						<input type="number" v-model="suoDingMoney" style="height:90%;width: 100%;" class="text-zhuti"  />
						<text class="text-bold text-gray text-sm">
							YNB
						</text>
					</view>
					
					
					<view class="margin-top flex justify-end">
						<button class="cu-btn shadow-zhuti1 round bg-zhuti2" @tap="suoDingSumbit">
							<text class="margin-lr">
								{{$t('确定')}}
							</text>
						</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	/* 
	 * 自定义底部导航栏
	 */
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default {
		props:{
			isOnPullDownRefresh:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			async isOnPullDownRefresh(n,o){
				if(n){
					await this.getCurryInfo()
					this.$emit('isOverDownRefresh',1)
				}
			}
		},
		components:{
			uniPopup
		},
		data() {
			return {
				loadingInfo: {
					isLoading: false
				},
				releaseInfo:{},
				releaseTitle:'',
				infoList:[],
				swiperList:[],
				
				suoDingMoney: '',
				seeDetailIndex: 0,
				seeDetailList: [{
					label: '可活动余额',
					id: 0
				}, {
					label: '已锁定余额',
					id: 1
				}],
			};
		},
		async created() {
			this.getCurryInfo()
		},
		methods:{
			goToPage(type){
				if(type === 'qianbao'){
					this.$Route.navigateTo('/pages/account/myWallet')
				}
				if(type === 'shouyi'){
					this.$Route.navigateTo('/pages/account/myProfit')
				}
			},
			async getCurryInfo(){
				this.$nextTick(async ()=>{
					this.loadingInfo.isLoading = true
					await this.getCurryInfoOnLoad()
					this.loadingInfo.isLoading = false
					await this.getCurryInfoOnshow()
				})
			},
			async getCurryInfoOnshow(){
				await this.refshLogin()
				let info = await this.getWenZhangDetail(1002)
				if (info.isOk) {
					this.releaseInfo = info.data
					this.releaseTitle = this.releaseInfo.Title
				}
			},
			async getCurryInfoOnLoad(){
				await this.getSwiper()
				await this.getList();
			},
			async getList() {
				let [err, res] = await this.$Request_.get(this.$allUrl.viplist, {
					lan: this.lan_
				})
				if (res != null) {
					if (res.IsSuccess) {
						this.infoList = res.Data
					}
				} else {
					this.$api.msg(res.Msg)
				}
			},
			async getSwiper() {
				let [err, res] = await this.$Request_.get(this.$allUrl.alllist, {
					sortid: 2013,
					lan: this.lan_
				})
				if (res != null) {
					if (res.IsSuccess) {
						this.swiperList = res.Data.map(it=>{
							it.image = it.PicURL
							return it
						})
						return
					}
				}
				this.swiperList = []
			},
			//工具操作类方法：
			showMoneyDetail() {
				this.$Route.navigateTo('/pages/index/suocang',{
					releaseTitle:this.releaseTitle
				})
				// console.log('??s')
				// this.suoDingMoney = ''
				// this.openOrClose('open', 'moneyDetail')
			},
			openOrClose(type, ref = 'showPop') {
				this.$nextTick(() => {
					this.$refs[ref][type]()
				})
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
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		padding: 50upx;
		padding-top:60upx;
		.tool-quick{
			.btn{
				width: 90%;
				height: 60upx;
				position: relative;
			}
			margin: 50upx 0;
		}
		.balance{
			background: linear-gradient(275deg, rgba(45, 45, 53, 0.1) 0%, #505058 100%);
			border: 4upx solid #979797;
			border-radius: 30upx;
		
			padding: 15upx;
			color: #FFFFFF;
			.title{
				color: #FFFFFF;
				margin: 20upx 0 ;
				font-size:26rpx;
			}
			.money{
				padding: 20upx 0 ;
				text{
					font-size: 34upx;
				}
				font-size: 34upx;
			}
		}
		.product-list{
			padding: 30upx 0;
			color: #FFFFFF;
			margin-bottom: 120upx;
			
			.item{
				margin: 30upx 0;
				border-radius: 30upx;
				padding: 20upx;
				background: linear-gradient(275deg, rgba(45, 45, 53, 0.1) 0%, #505058 100%);
				.icon-line{
					border-right: 2upx dashed #979797;
					overflow: hidden;
				}
				.icon{
					width: 60upx;
				}
				.item-name{
					padding: 20upx !important;
					text-align: center !important; 
				}
				.diff-icon{
					display: flex;
					flex-direction: column;
					align-items: center;
					.icon{
						width: 50upx;
					}
				}
				.item-price{
					text-align: center !important; 
					color: #FB736B;
					.btn{
						background-color: #FB736B;
						color: #FFFFFF;
						border-radius: 10upx;
						padding: 4upx 20upx;
					}
					view{
						margin: 10upx 0;
					}
				}
			}
			
			.down{
				
			}
		}
		
		
		
	}
</style>


<style scoped>
	.titleCard {
		margin-bottom: 30rpx ;
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		justify-content: space-between;
		background: rgb(96, 102, 126);
		border-radius: 10rpx;
		position: relative;
	}
	
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
	
	.byChoose {
		position: relative;
		color: white;
	}
	
	.byChoose::after {
		content: '';
		position: absolute;
		bottom: -10rpx;
		height: 4rpx;
		left: 0%;
		right: 0%;
		background: white;
	}
</style>
