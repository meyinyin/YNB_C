<template>
	<view>
		<!--  -->
		<view class="tipInfo flex align-center " v-if="showTipInfo.isShow"  :class="showTipInfo.an===true?'an3':'an4'">
			<view class="flex justify-between padding-lr align-center">
				<text class="text-white text-xl">
					{{$t('您有订单成交,请立即完成订单交易!')}}
				</text>
				<button class="cu-btn margin-left sm bg-red" @tap="seeDingDan">
					<text>
						{{$t('查看')}}
					</text>
				</button>
			</view>
		</view>
		<back-btn :zIndex="1" :left="20" :top="10"></back-btn>
		<view class="titleCard">
			<!-- @tap="backHome" -->
			<image  src="../../static/images/newYNBlog.png" style="width:135rpx;height:84rpx;margin-left: 80rpx;" mode=""></image>
			<view class="flex align-center">
				<text class="text-bold " style="color:rgb(38,153,251) ;">
					{{userInfo_.No}}
				</text>
				<view class="margin-left-sm text-red">
					<text class="cuIcon-vip margin-left-xs text-bold" style="font-size: 30rpx;">
						
					</text>
					<text class=" text-sm">
						Lv{{userInfo_.ManagerType}}
					</text>
				</view>
				<text class="text-red margin-lr-sm">
					
				</text>
				<text class="cuIcon-sort" @tap="showTitleCardMun = !showTitleCardMun" style="font-size:20px; color: black; font-weight: 1000;">
					
				</text>
			</view>
			<view class="titleCardMun an2" v-if="showTitleCardMun" >
				<view class="titleCardMunItem " v-for="(item,index) of munList" :key="`munlist_${index}`" @tap="munTap(item,index)">
					<text>
						{{$t(item.label)}}
					</text>
				</view>
			</view>
		</view>
		<view class="contentCard">
			<view class="flex justify-center">
				<text class="text-xxl FuturaPTLight" style="color: #b0b0b0;">
					{{$t('可活动余额')}}
				</text>
			</view>
			<!-- @tap="showMoneyDetail" -->
			<view   class="margin-top-xs FuturaPTLight flex justify-center" style="font-size:78rpx;font-weight: 1000;color: #000000;">
				<text>
					{{userInfo_.Score}}
				</text>
				<text class="margin-left-sm">
					YNB
				</text>
			</view>
		</view>
		<view class="margin-top bg-white ">
			<view class=" padding flex align-end justify-between">
				<view class="flex align-end">
					<view v-for="(item,index) of titleChooseS" :key="`choose_${index}`" class="margin-right" @tap="chooseTitle(item,index)">
						<text :class="chooseTitleIndex===item.id?'text-xxl an1':''" class="text-bold text-black">
							{{$t(item.label)}}
						</text>
					</view>
				</view>
				
			</view>
			<view class="padding-lr flex align-center bg-white">
				<view v-for="(item,Jndex) of sortList" :key="`sort_${Jndex}`" class="flex align-center margin-right " style="padding:2rpx 10rpx;">
					<!-- border-left: 2rpx solid rgba(180,180,180,0.6);border-right: 2rpx solid rgba(180,180,180,0.6); border-top: 2rpx solid rgba(180,180,180,0.6);border-radius: 5rpx; -->
					<picker @change="sortListPickerChange" :id="`sortChoose${Jndex}`" :value="item.index" :range="item.list" range-key="label">
						<view class="text-bold text-black">
							<text class="FuturaPTLight">
								{{item.index>-1?item.list[item.index].label:$t(item.labelText)}}
							</text>
						</view>
					</picker>
					
					<view>
						<text class="cuIcon-triangledownfill margin-left-xs text-black" style="font-size: 40rpx;">
							
						</text>
					</view>
				</view>
			</view>
			
			
			<view class="margin-top">
				<view class="listItem" v-for="(item,index) of infoList" :key="`infoList_${index}`">
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<view class="touxiang">
								<text class="text-bold">
									{{item.UserNick[0].toUpperCase()}}
								</text>
							</view>
							<view class="margin-left-sm flex align-center">
								<view style="max-width:240rpx;" class="text-cut">
									<text class="text-bold text-black">
										{{item.UserNick}}
									</text>
								</view>
								<text class="cuIcon-vip margin-left-xs text-bold" style="color: rgb(246,176,52);font-size: 30rpx;">
									
								</text>
								<text class="margin-left-xs" style="color: rgb(246,176,52);font-size:20rpx;">
									Lv{{item.UserFaceUrl.length===0?'0':item.UserFaceUrl}}
								</text>
							</view>
						</view>
						<view class="flex align-center text-sm text-grey">
							<text>{{$t('剩余')}}</text>
							<text class="margin-lr-sm">|</text>
							<text>{{item.Num - item.LockScores}}</text>
						</view>
					</view>
					<view class="margin-top-sm flex align-center justify-between text-grey text-sm">
						<view>
							<view>
								{{$t('数量')}}<text class="margin-left-xs">{{item.Num}}YNB</text>
							</view>
							<view class="margin-top-xs">
								{{$t('限额')}} 
								<text class="margin-left-xs"> ≥ {{item.GeRenFHID}}</text> 
							</view>
						</view>
						<view class="flex flex-direction align-end">
							<view>
								<text>
									{{$t('单价')}} 
								</text>
							</view>
							<view class="">
								<text class="text-xl text-red FuturaPTLight" style="font-weight:500;">
									{{ynbByUsdt}} USDT
								</text>
							</view>
						</view>
					</view>
					<view class="margin-top-sm flex align-center justify-between">
						<view class="flex align-center">
							<text class="cuIcon-warnfill" style="font-size:40rpx;color: rgb(239,162,64);">
								
							</text>
							<text class="text-sm">
								{{$t(orderState(item))}}
							</text>
						</view>
						<button class="cu-btn" :class="showBtnInfo.class" @tap="sumBit(item,index)" :disabled="item.Num===item.LockScores">
							<text class="margin-lr">
								{{$t(showBtnInfo.text)}}
							</text>
						</button>
					</view>
				</view>
				<view class="padding-bottom-xl" v-if="infoList.length===0">
					<no-content></no-content>
				</view>
			</view>
		</view>
		<uni-popup ref="showPop" type="bottom" :maskClick="true" @change="popChange">
			<view class="padding bg-white" style="border-radius: 20rpx 20rpx 0rpx 0rpx; position: relative;">
				<image src="../../static/images/newYNBlog.png" style="width:135rpx;height:84rpx;position: absolute;top: 30rpx;right: 30rpx;" mode=""></image>
				
				
				<view>
					<text class="text-xxl text-black  FuturaPTLight text-bold">
						{{chooseTitleIndex===0?$t('购买隐币'):$t('出售隐币')}}
					</text>
				</view>
				<view class="margin-top">
					<text class="text-black text-bold">
						{{$t('单价')}}
					</text>
					<text class="margin-left-xs text-red">
						{{ynbByUsdt}} USDT
					</text>
				</view>
				<view class="margin-top flex align-end">
					<view v-for="(item,index) of byTitleList" class="margin-right" :key="`byTitle_${index}`" :class="byChooseIndex===item.id?'byChoose text-bold text-xl':' text-grey'" @tap="byChooseIndex=item.id">
						<text>
							{{$t(item.label)}}
						</text>
					</view>
				</view>
				<view class="margin-top">
					<view  class="bg-white padding-lr-sm inputBorder flex justify-between align-center" :class="showInputBorder?'inputBorderFoucs':''">
						<input  @blur="showInputBorder=false" @focus="showInputBorder=true" type="number" v-model="byInputVal" style="width:60%;height: 100%;"  placeholder-style="font-size:24rpx;color:gray"  :placeholder="byChooseIndex===0?$t('请输入购买金额'):$t('请输入购买数量')"  />
						<view>
							<text class="text-black">
								YNB
							</text>
							<text class="margin-lr-sm">
								|
							</text>
							<text class="text-red" @tap="allByOrSell">
								{{$t('全部买入')}}
							</text>
						</view>
					</view>
				</view>
				<view class="margin-top text-black" v-if="chooseTitleIndex===0">
					<text class="text-grey">
						{{$t('限额')}}
					</text>
					<text class="margin-left-sm">
						≥
					</text>
					<text class="">
						{{btnClickInfo.GeRenFHID}}
					</text>
					<text>
						YNB
					</text>
				</view>
				
				<view class="margin-top text-grey" v-if="chooseTitleIndex===1">
					<text>
						{{$t('限额')}}
					</text>
					<text class="margin-left-xs">
						￥{{btnClickInfo.min}}
					</text>
					<text class="margin-lr-sm">
						-
					</text>
					<text >
						￥{{btnClickInfo.max}}
					</text>
				</view>
				
				<view class="margin-top flex align-center justify-between" v-if="chooseTitleIndex===1">
					<view>
						<text>
							{{$t('买家付款方式')}}：
						</text>
					</view>
					<view>
						<picker @change="PickerChange" :value="payWayIndex" :range="payWays" range-key="label">
							<view class="text-bold text-black">
								{{payWayIndex>-1?payWays[payWayIndex].label:$t('请选择')}}
							</view>
						</picker>
					</view>
				</view>
				<view class="margin-top flex align-center justify-between">
					<text class="text-grey">
						{{$t('系统自动合算成USDT')}}
					</text>
					<view class="text-black" style="font-weight:700;">
						<text>
							{{byInputVal.length===0?'0.00000000':byInputVal*ynbByUsdt>=1?Math.round(byInputVal*ynbByUsdt):byInputVal*ynbByUsdt}}
						</text>
						<!-- <text class="margin-left-xs">
							{{btnClickInfo.company}}
						</text> -->
					</view>
				</view>
				<!-- <view class="margin-top flex align-center justify-between">
					<text class="text-grey">
						{{$t('实付金额')}}
					</text>
					<view class="flex align-end text-red" style="font-weight:700;">
						<text>
							￥
						</text>
						<text class="text-xl">
							0.00
						</text>
					</view>
				</view> -->
				<view class="margin-top flex align-center justify-between">
					<button class="cu-btn bg-white" style="border: 2rpx solid gray;">
						<text class="margin-lr margin-tb text-black">
							{{$t('自动取消')}}:{{time}}s
						</text>
					</button>
					<button class="cu-btn bg-red" @tap="xiaDan">
						<text class="margin-lr-xl margin-tb">
							{{$t('下单')}}
						</text>
					</button>
				</view>
			</view>
		</uni-popup>
		
		<!-- <view class="bottomCard">
			<text class="cuIcon-infofill text-white" style="font-size:45rpx;transform:rotate(180deg);">
				
			</text>
			<p class="text-white text-bold margin-left" style="text-align: center;">
				请大家不要把隐币恢复词汇提供给任何人或任何网站。拥有恢复词汇即可永久控制您的钱包和您现有和以后获得隐币。目前官方没有授权任何交易所上线隐币。
			</p>
		</view> -->
		<uni-popup ref="moneyDetail" type="bottom" :maskClick="false" >
			<view class="padding bg-white" style="border-radius: 20rpx 20rpx 0rpx 0rpx; position: relative;">
				<view class=" flex align-center justify-between text-black text-bold">
					<text >
						{{$t('余额详情')}}
					</text>
					<text class="cuIcon-roundclose" style="font-size:40rpx;" @tap="openOrClose('close','moneyDetail')">
						
					</text>
				</view>
				<view class="padding-tb flex align-center">
					<view v-for="(item,index) of seeDetailList" class="margin-right" :key="`seeDetail_${index}`" :class="seeDetailIndex===item.id?'byChoose text-bold text-xl':' text-grey'" @tap="seeDetailIndex=item.id">
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
					<view class=" flex align-center" >
						<text class=" text-black">
							{{$t('单日释放比例')}}:
						</text>
						<text class="margin-left text-red text-bold">
							{{(userInfo_.FanLiScore*100)}}%
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
					<view class="margin-top-sm flex align-center padding-lr-sm" style="border: 2rpx solid #000000;height:80rpx;border-radius: 10rpx;">
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
		<load-line :isLoading="isLoading" v-if="isLoading" circleColor="rgb(255,255,255)"></load-line>
		
		
		
		<uni-popup ref="dingDanInfo" type="bottom" :maskClick="false" >
			<view class="padding bg-white" style="height:90vh;border-radius: 20rpx 20rpx 0rpx 0rpx; position: relative;width: 100%;">
				<view class="flex align-center justify-end">
					<text class="cuIcon-roundclosefill text-black" style="font-size:60rpx;" @tap="detailSumBit(0)">
						
					</text>
				</view>
				<scroll-view  :scroll-y="true" style="max-height:85vh;border-radius: 20rpx 20rpx 0rpx 0rpx; position: relative;width: 100%;">
					
					<view class="bottomBorder padding-tb">
						<text class="text-xxl text-red text-bold">
							+{{dingDanInfo.num}} YNB
						</text>
						
						<text class="text-sm text-red text-bold margin-left">
							（{{(dingDanInfo.num*ynbByUsdt).toFixed(5)}} USDT）
						</text>
					</view>
					<view class="bottomBorder padding-tb" v-if="dingDanInfo.info!=0">
						<text class="text-black">
							{{dingDanInfo.info}}
						</text>
					</view>
					<view class="bottomBorder padding-tb flex align-center" v-for="(item,index) of dingDanInfo.detailList" :key="index">
						<view style="width:40%" class="text-grey flex justify-start align-center">
							<text>
								{{item.needTrLbel?$t(item.label):item.label}}
							</text>
						</view>
						<view style="width:60%" class="text-bold text-black flex justify-end  align-center">
							<p style="word-break: break-all;" >
								{{item.needTrValue?$t(item.value):item.value}}
							</p>
						</view>
					</view>
					<view class="flex align-center justify-between  margin-top">
						<button class="cu-btn bg-white" style="border: 2rpx solid gray;">
							<text class="margin-lr margin-tb text-black">
								{{$t('自动取消')}}:{{dingDanInfoTime}}s
							</text>
						</button>
						<button class="cu-btn bg-red" @tap="detailSumBit(1)">
							<text class="margin-lr">
								{{$t('确认订单')}}
							</text>
						</button>
					</view>
				</scroll-view>
			</view>
			
			
			
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default{
		onHide(){
			this.showTitleCardMun = false
		},
		async onShow() {
			this.$Route.routeBefore(this)
			this.refshLogin()
			let info = await this.getWenZhangDetail(1002)
			if(info.isOk){
				this.releaseInfo = info.data
				this.releaseTitle = this.releaseInfo.Title
			}
			await this.isnewmsg()
		},
		comments:{
			uniPopup
		},
		data(){
			return {
				byGetData:{
					
				},
				showTipInfo:{
					isShow:false,
					an:false
				},
				releaseTitle:'',
				releaseInfo:'',
				isLoading:false,
				isSend:true,
				getData:{
					num:0,
					sort:0,
					zfsort:'USDT',
					page:1,
					pagesize:10
				},
				showTitleCardMun:false,
				munList:[
					{
						label:'交易记录',
						path:'/pages/account/transactionRecords',
						isTapShell:false,
					},
					{
						label:'我的团队',
						path:'/pages/myTeam/index',
						isTapShell:false,
					},
					{
						label:'我的收益',
						path:'/pages/account/myProfit',
						isTapShell:false,
					},
					{
						label:'我的钱包',
						path:'/pages/account/myWallet',
						isTapShell:false,
					},
					{
						label:'收款方式',
						path:'/pages/account/paymentMethods',
						isTapShell:false,
					},{
						label:'邀请码',
						path:'/pages/account/invitationCode',
						isTapShell:false,
					},
					{
						label:'资讯列表',
						path:'/pages/account/findList',
						isTapShell:false,
					},
					{
						label:'修改密码',
						path:'/pages/account/setPwd',
						isTapShell:false,
					},
					{
						label:'退出登录',
						path:'',
						isTapShell:true,
						tapEven:'loginOut'
					}
				],
				time:0,
				byInputVal:'',
				showInputBorder:false,
				byChooseIndex:1,
				byTitleList:[
					// {
					// 	label:'按金额购买',
					// 	id:0
					// },
					{
						label:'按数量购买',
						id:1
					}
				],
				titleChooseS:[
					{
						label:'我要买',
						id:0
					},{
						label:'我要卖',
						id:1
					}
				],
				chooseTitleIndex:0,
				infoList:[],
				btnClickInfo:{},
				listClickIndex:0,
				setInrervalIDs:[],
				payWayIndex:0,
				payWays:[
					{
						key:'usdt',
						value:'123456',
						label:'usdt - 123456'
					},
					{
						key:'支付宝',
						value:'456789',
						label:'支付宝 - 456789'
					},
					{
						key:'微信',
						value:'654321',
						label:'微信 - 654321'
					},
				],
				seeDetailIndex:0,
				seeDetailList:[
					{
						label:'可活动余额',
						id:0
					},{
						label:'已锁定余额',
						id:1
					}
				],
				suoDingMoney:'',
				sortList:[
					{
						list:[],
						index:-1,
						labelText:'支付方式',
						getUrl:'getfkfs'
					},
					// {
					// 	list:[
					// 		{label:'普通交易1'},
					// 		{label:'普通交易2'},
					// 		{label:'普通交易3'}
					// 	],
					// 	index:-1,
					// 	labelText:'普通交易'
					// },
					{
						list:[],
						index:-1,
						labelText:'交易金额',
						getUrl:'getfkminnum'
					}
				],
				dingDanInfoTime:0,
				dingDanInfo:{}
			}
		},
		watch:{
			dingDanInfoTime(n,o){
				if(n>0){
					setTimeout(()=>{
						this.dingDanInfoTime = this.dingDanInfoTime - 1
					},1000)
				}else{
					this.openCloseDingDanInfo('close')
				}
			},
			time(n,o){
				if(n<=0){
					this.time = 0
					this.clearIntervals()
					this.openOrClose('close')
				}
			},
		},
		mounted() {
			let divs = document.querySelectorAll('.uni-picker-action')
			divs.forEach((it)=>{
				it.innerText = this.$t(it.innerText.replace(/\s+/g,""))
			})
		},
		onLoad() {
			this.getList();
			this.getPickerSort()
		},
		methods:{
			detailSumBit(type){
				this.openCloseDingDanInfo('close')
				if(type===1){
					this.lastSumBit()
				}
			},
			async isnewmsg(){
				let [err,res] = await this.$Request_.get(this.$allUrl.isnewmsg,{
					userid:this.userInfo_.ID,
					lan:this.lan_
				})
				if(res!=null){
					if(res.IsSuccess){
						this.setshowTipInfo(true,3000)
					}
				}
			},
			seeDingDan(){
				this.setshowTipInfo(false)
				this.munTap(this.munList[0],0)
			},
			setshowTipInfo(flag,timeOut = 5000){
				if(flag){
					this.showTipInfo.isShow = true
					this.showTipInfo.an = true
					setTimeout(()=>{
						this.showTipInfo.an = false
						setTimeout(()=>{
							this.showTipInfo.isShow = false
						},750)
					},timeOut)
				}else{
					this.showTipInfo.an = false
					setTimeout(()=>{
						this.showTipInfo.isShow = false
					},750)
				}
			},
			goToEassa(){
				this.$Route.navigateTo('/pages/index/eassayDetail',{
					id:1002,
					detailTitle:this.releaseTitle
				},true)
			},
			async getPickerSort(){
				for(let index = 0 ; index < this.sortList.length ; index++){
					let item = this.sortList[index]
					let getUrl = this.$allUrl[item.getUrl]
					let [err,res] = await this.$Request_.get(getUrl)
					if(res!=null){
						if(res.IsSuccess){
							if(index===0){
								let list = res.Data.map(it=>{
									return {
										label:it
									}
								})
								list.unshift({
									label:this.$t('全部')
								})
								this.sortList[index].list =  list
							}else{
								let list = res.Data.map(it=>{
									return {
										label:it
									}
								})
								list.unshift({
									label:this.$t('不限')
								})
								this.sortList[index].list =  list
							}
						}
					}else{
						
					}
				}
			},
			
			orderState(item){
				if(item.IsOver){
					return '已完成'
				}else{
					return '未完成'
				}
			},
			async getList(){
				if(this.isSend){
					let [err,res] = await this.$Request_.get(this.$allUrl.saleslist,this.getData)
					if(res!=null){
						if(res.IsSuccess){
							let list = res.Data
							if(list.length<10){
								this.isSend = false
							}
							if(this.getData.page===1){
								this.infoList = list
							}else{
								this.infoList  = [...this.infoList,...list]
							}
						}
						console.log(res)
					}else{
						this.$api.msg(res.Msg)
					}
				}
			},
			goToSell(){
				this.openOrClose('close','moneyDetail')
				this.$Route.navigateTo('/pages/account/goToSell')
			},
			async suoDingSumbit(){
				let num = this.suoDingMoney*1
				this.openOrClose('close','moneyDetail')
				if(num===0){
					this.$api.msg(this.$t('请输入正确的内容'),1500)
					return
				}else{
					let [err,res] = await this.$Request_.get(this.$allUrl.sdscore,{
						num,
						userid:this.userInfo_.ID,
						lan:this.lan_
					})
					if(res!=null){
						if(res.IsSuccess){
							this.$api.msg('OK',1500,false,'success')
							this.refshLogin()
						}else{
							this.$api.msg(res.Msg)
						}
					}
				}
			},
			showMoneyDetail(){
				this.suoDingMoney = ''
				this.openOrClose('open','moneyDetail')
			},
			async sortListPickerChange(e){
				let target = e.target
				let chooseWhatIndex = target.id.split('sortChoose')[1]*1
				this.sortList[chooseWhatIndex].index = e.detail.value
				
				let chooseValue = this.sortList[chooseWhatIndex]
				let value = chooseValue.list[chooseValue.index]
				if(chooseWhatIndex===0){
					let zfsort = value.label
					if(zfsort==='全部'){
						zfsort = 'USDT'
						this.sortList[chooseWhatIndex].index = -1
					}
					this.getData.zfsort = zfsort
				}
				if(chooseWhatIndex===1){
					let num =  value.label
					if(num==='不限'){
						num = 0
						this.sortList[chooseWhatIndex].index = -1
					}
					this.getData.num = num
				}
				this.getData.page = 1
				this.isSend = true
				this.isLoading = true
				await this.getList();
				this.isLoading = false
			},
			PickerChange(e) {
				this.payWayIndex = e.detail.value
			},
			backHome(){
				this.$Route.reLaunch('/pages/index/index')
			},
			async xiaDan(){
				if(this.byInputVal.length===0){
					this.$api.msg(this.$t('请输入正确的内容'),1500)
					return 
				}
				let num = this.byInputVal*1
				let shengyu = this.btnClickInfo.Num - this.btnClickInfo.LockScores
				if(shengyu>=this.btnClickInfo.GeRenFHID){
					if(num<this.btnClickInfo.GeRenFHID){
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}else if(num>shengyu){
						console.log(shengyu,num)
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
				}else{
					if(num<shengyu){
						let data={
							title: this.$t('尊敬的用户'),
							content: this.$t('余下数量小于最低购买值,若要购买,请将余下数量全部买完？') ,
							cancelText: this.$t('取消'),
							confirmText:this.$t('确定')
						}
						let res=  await this.$api.showModal(data)
						if(res){
							this.byInputVal = shengyu*1
							this.$api.msg(this.$t(''),1500)
							num = shengyu*1
						}else{
							return 
						}
					}else if(num>shengyu){
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
				}
				let getData = {
					userid:this.userInfo_.ID,
					num,
					scoreid:this.btnClickInfo.ID,
					lan:this.lan_
				}
				this.openOrClose('close')
				let no = `${new Date().getTime()}${this.userInfo_.ID}${this.btnClickInfo.UserID}`
				getData.no = no
				this.byGetData = getData
				
				function isPayWays(info){
					let list = ['USDT']
					let UserPhone = info.UserPhone
					if(UserPhone!='USDT'){
						list.push(UserPhone)
					}
					return list.join(',')
				}
				let dingDanInfo = {
					num,
					info:this.btnClickInfo.Info,
					no:`订单编号|${no}`,
					time:`下单时间|${this.beTime(`/Date(${new Date().getTime()})`)}`,
					userNick:`售出人|${this.btnClickInfo.UserNick}`,
					payWays:`收款方式|${isPayWays(this.btnClickInfo)}`,
					state:`订单状态|${this.$t('待确认订单信息')}`,
				};
				this.openCloseDingDanInfo('open',dingDanInfo)
			},
			openCloseDingDanInfo(type,dingDanInfo){
				if(type==='open'){
					let detailList = []
					for(let key of Object.keys(dingDanInfo)){
						if(key!='num' && key!='info'){
							let item = dingDanInfo[key]
							let label = item.split('|')[0]
							let value = item.split('|')[1]
							detailList.push({
								needTrLbel:true,
								label,
								value
							})
						}
					}
					this.dingDanInfo.num = dingDanInfo.num
					this.dingDanInfo.info = dingDanInfo.info
					this.dingDanInfo.detailList = detailList
					this.$nextTick(()=>{
						this.$refs.dingDanInfo.open()
						this.dingDanInfoTime = 30
					})
				}else if(type==='close'){
					this.$nextTick(()=>{
						this.$refs.dingDanInfo.close()
						this.dingDanInfoTime = 0
					})
				}
			},
			async lastSumBit(){
				console.log(this.byGetData)
				this.isLoading = true
				let [byErr,byRes] = await this.$Request_.get(this.$allUrl.gmscore,this.byGetData)
				this.isLoading = false
				if(byRes!=null){
					if(byRes.IsSuccess){
						let isSurePopPurchase //是否是确认付款的
						if(this.chooseTitleIndex===0){//是买入 是确认付款
							isSurePopPurchase = 1
						}else{//是卖出 是确认卖出
							isSurePopPurchase = 0
						}
						this.$Route.navigateTo('/pages/account/orderDetails',{
							isSurePopPurchase,
							id:this.btnClickInfo.ID,
							num:this.byGetData.num,
							scorelistid:byRes.ScoresListID
						},true)
						// let data={
						// 	title: this.$t('尊敬的用户'),
						// 	content: this.$t('下单成功，是否前去订单页面完善信息？') ,
						// 	cancelText: this.$t('取消'),
						// 	confirmText:this.$t('确定')
						// }
						// let res=  await this.$api.showModal(data)
						// if(res){
						// 	let isSurePopPurchase //是否是确认付款的
						// 	if(this.chooseTitleIndex===0){//是买入 是确认付款
						// 		isSurePopPurchase = 1
						// 	}else{//是卖出 是确认卖出
						// 		isSurePopPurchase = 0
						// 	}
						// 	this.$Route.navigateTo('/pages/account/orderDetails',{
						// 		isSurePopPurchase,
						// 		id:this.btnClickInfo.ID,
						// 		num:this.byGetData.num,
						// 		scorelistid:byRes.ScoresListID
						// 	},true)
						// }
					}else{
						this.$api.msg(byRes.Msg)
					}
				}
			},
			munTap(item,index){
				this.showTitleCardMun = false
				if(item.isTapShell){
					let tapEven = item.tapEven
					if(tapEven==='loginOut'){//先退出再返回首页
						this.$store.commit('logout')
						this.$Route.reLaunch('/pages/index/index')
					}
				}else{
					let path = item.path
					if(path==='/pages/account/setPwd'){
						this.$Route.navigateTo(path,{isForget:false},true)
					}else{
						this.$Route.navigateTo(path)
					}
				}
			},
			popChange(e){
				let {show} = e
				if(!show){
					this.clearIntervals()
					this.time = 0
				}else{
					this.time = 200
					this.setTime()
				}
			},
			clearIntervals(){
				if(this.setInrervalIDs.length!=0){
					for(let id of this.setInrervalIDs){
						if(id!=0){
							clearInterval(id)
						}
					}
					this.setInrervalIDs = []
				}
			},
			setTime(){
				let setInrervalID =  setInterval(()=>{
					if(this.time<=0){
						this.time = 0
					}else{
						this.time = this.time-1
					}
				},1000)
				this.setInrervalIDs.push(setInrervalID)
			},
			openOrClose(type,ref='showPop'){
				this.$nextTick(()=>{
					this.$refs[ref][type]()
				})
			},
			chooseTitle(item,index){
				this.chooseTitleIndex = item.id
			},
			sumBit(item,index){
				this.showTitleCardMun = false
				this.listClickIndex = index
				this.btnClickInfo = item
				this.byInputVal = ''
				if(this.chooseTitleIndex===0){
					this.openOrClose('open')
				}else{
					this.$Route.navigateTo('/pages/account/goToSell')
				}
			},
			allByOrSell(){
				this.byInputVal = this.btnClickInfo.Num - this.btnClickInfo.LockScores 
			}
		},
		computed:{
			showBtnInfo(){
				if(this.chooseTitleIndex===0){
					return {
						text:'购买',
						class:'bg-red'
					}
				}
				if(this.chooseTitleIndex===1){
					return {
						text:'出售',
						class:'bg-black'
					}
				}
			}
		},
		async onPullDownRefresh() {
			this.getData.page = 1
			this.refshLogin()
			this.isSend = true
			await this.getList();
			this.isnewmsg()
			uni.stopPullDownRefresh();
		},
		async onReachBottom() {
			this.getData.page = this.getData.page+1
			await this.getList();
			// if(this.loadingType==0)
			// {
			// 	this.loadingType=1;
			// 	this.page += 1;
			// }
			// await this.remind();
		},
	}
</script>

<style>
	page{
		background: rgb(242,242,242);
	}
</style>
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
	.titleCardMun{
		position: absolute;
		width: 300rpx;
		top:100rpx;
		right:0rpx;
		z-index:1;
		background-color: white;
		box-shadow: 2rpx 2rpx 6rpx rgba(180,180,180,1);
	}
	.titleCardMunItem{
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: red;
	}
	.contentCard{
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		background: white;
		border-radius: 10rpx;
		border: 2rpx solid gray;
	}
	.bottomCard{
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;
		width: 100vw;
		min-height: 50px;
		background:rgb(216,0,0);
		padding: 8px 13px;
		color: #ffffff;
		display: flex;
		font-size: 14px;
		justify-content: center;
		align-items: center;
	}
	.contentCardTip{
		background: rgb(38,153,251);
		padding:20rpx;
		display: flex;
		justify-content: space-between;
	}
	.icon{
		width:40px;
		height:20px;
	}
	.listItem{
		padding:30rpx;
		border-top: 2rpx solid rgba(180,180,180,0.5);
		border-bottom: 2rpx solid rgba(180,180,180,0.5);
	}
	.touxiang{
		display: flex;
		align-items: center;
		justify-content: center;
		width:70rpx;
		height:70rpx;
		background: rgb(255,170,0);
		color: rgb(216,0,0);
		border-radius: 50%;
	}
	.an1{animation:fadeIn  1s ;}
	.an2{animation:fadeInDown  0.8s}
	.byChoose{
		position: relative;
		color: red;
	}
	.byChoose::after{
		content: '';
		position: absolute;
		bottom: -10rpx;
		height: 4rpx;
		left:0%;
		right: 0%;
		background: red;
		border-radius: red;
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
	.tipInfo{
		position: fixed;
		top: 0rpx;
		width: 100vw;
		height:150rpx;
		background:rgb(255,178,0);
		z-index: 2;
		border-radius: 0rpx 0rpx 15rpx 15rpx;
	}
	.an3{animation:fadeInDown   0.8s 1; }
	.an4{animation:fadeOutUpBig	   0.8s 1; }
</style>
