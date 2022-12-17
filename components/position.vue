<template>
	<view style="padding-bottom: 150rpx;">
		<view class="tipInfo bg-zhuti3 flex align-center " v-if="showTipInfo.isShow"  :class="showTipInfo.an===true?'an3':'an4'" >
			<view class="flex justify-between padding-lr align-center" style="width: 100vw;">
				<text class="text-white text-zhuti2">
					{{$t('您有订单成交,请立即完成订单交易!')}}
				</text>
				<button class="cu-btn sm cardBg_" @tap="seeDingDan">
					<text class="text-white">
						{{$t('查看')}}
					</text>
				</button>
				<text class="margin-left cuIcon-roundclose"  style="font-size:40rpx;" @tap="setshowTipInfo(false)">
					
				</text>
			</view>
		</view>
		
		
		<view class="selectPayWays">
			<view class="flex align-center" v-for="(item,index) of sortList" :key="index" @tap="openPicker(item,index)">
				<view class="flex align-center text-sm text-white">
					<text class=" text-sm" style="margin-left: 0rpx;">
						{{$t(item.labelText)}} ：
					</text>
				</view>
				<view class="margin-left-xs text-zhuti">
					<text>
						{{item.index>-1?item.list[item.index].label:$t(item.labelText)}}
					</text>
					<text class="cuIcon-pulldown margin-left-xs text-white">
						
					</text>
				</view>
			</view>
		</view>
		<view style="height: 20rpx;">
			
		</view>
		<u-subsection 
			class="subsection"
			:list="titleChooseS" 
			:current="current" 
			 @change="sectionChange"
			height="100"
			button-color="#EBC384"
			active-color="red"
			inactive-color="#FFFFFF"
			bg-color="#36373F">
		</u-subsection>
			
			<view class="lists shadow-zhuti1" v-for="(item,index) of infoList" :key="`infoList_${index}`">
				<view class=" flex align-center justify-between">
					<view>
						<view class="cu-tag bg-zhuti3 round">
							<text class="text-bold text-zhuti1">
								{{item.UserNick}}
							</text>
							<view class="flex align-center margin-left-xs text-zhuti2">
								<text class="cuIcon-vipcard" style="font-size: 30rpx;">
									
								</text>
								<text>
									Lv{{item.UserFaceUrl.length===0?'0':item.UserFaceUrl}}
								</text>
							</view>
						</view>
					</view>
					<view class="flex align-start">
						<view class="text-sm text-white">
							{{$t('数量')}} :
						</view>
						<view class="upturn margin-left-xs">
							{{item.Num}}YNB
						</view>
					</view>
				</view>
				<view class="margin-top flex align-center justify-between">
					<view class="flex align-center">
						<text class="text-sm text-white">
							{{$t('限额')}} :
						</text>
						<text class="margin-left-xs text-zhuti"> ≥ {{item.GeRenFHID}}</text> 
					</view>
					<view class="flex align-center">
						<text class="text-sm text-white">
							{{$t('单价')}}  :
						</text>
						<text class="margin-left-xs text-zhuti"> {{ynbByUsdt}} USDT</text> 
					</view>
				</view>
				<view  class="margin-top flex align-center justify-between">
					<view class="flex align-center">
						<text class="text-sm text-grey">
							{{$t('剩余')}} :
						</text>
						<text class="margin-left-xs text-zhuti"> {{item.Num - item.LockScores}}</text> 
					</view>
					
					<view class="flex align-center">
						<text class="margin-left-xs text-grey"> {{$t(orderState(item))}}</text> 
					</view>
				</view>
				<view class="margin-top-sm flex align-center justify-end">
					<button class="cu-btn  round sm" :class="showBtnInfo.class" @tap="sumBit(item,index)" :disabled="item.Num===item.LockScores">
						<text class="margin-lr">
							{{$t(showBtnInfo.text)}}
						</text>
					</button>
				</view>
			</view>
			<view class="padding-bottom-xl" v-if="infoList.length===0">
				<no-content></no-content>
			</view>
			<load-line :isLoading="isLoading"></load-line>
			
			<uni-popup ref="picker" type="bottom" :maskClick="true">
				<view style="width: 100vw;height:700rpx" class="cardBg_">
					<view style="height: 100rpx;" class="flex align-center justify-between padding-lr">
						<button class="cu-btn bg-red sm round" @tap="pickerSumbit(false)">
							<text>
								{{$t('取消')}}
							</text>
						</button>
						
						<button class="cu-btn bg-zhuti2 sm round" @tap="pickerSumbit(true)">
							<text>
								{{$t('确定')}}
							</text>
						</button>
					</view>
					<scroll-view scroll-y style="height:600rpx;width: 100vw;">
						<view class="flex align-center  padding" v-for="(item,index) of pickerInfo.list">
							<view style="width: 50%;" class="flex justify-end text-zhuti" @tap="setChoosePicker(index)">
								<text class="cuIcon-roundcheckfill margin-right-sm" style="font-size:40rpx"  v-if="pickerInfo.chooseIndex===index">
								</text>
								
								<text class="cuIcon-round margin-right-sm"  style="font-size:40rpx" v-else>
								</text>
							</view>
							
							<view style="width: 50%;" class="flex justify-start">
								<text class="margin-left-sm text-white" >
									{{item.label}}
								</text>
							</view>
							
						</view>
						
					</scroll-view>
				</view>
			</uni-popup>
			
			<uni-popup ref="showPop" type="top" :maskClick="true" @change="popChange">
				<view class="padding bg-zhuti1" style="padding: 60rpx; position: relative;width: 100vw;height: 100vh;">
					<view class="flex align-center">
						<u-icon name="arrow-left" size="40" color="#ffffff" @click="openOrClose('close')">
							 
						 </u-icon>
						 
						<view class="margin-left-sm">
							<text class="text-xxl text-black  FuturaPTLight text-bold text-white">
								{{chooseTitleIndex===0?$t('购买隐币'):$t('出售隐币')}}
							</text>
						</view>
					</view>
					<view class="margin-top-xl padding-top">
						<text class="text-zhuti text-bold">
							{{$t('单价')}} ：
						</text>
						<text class="margin-left-xs text-red text-bold">
							{{ynbByUsdt}} USDT
						</text>
					</view>
					<view class="margin-top-xl padding-top flex align-end">
						<view v-for="(item,index) of byTitleList" class="margin-right" :key="`byTitle_${index}`" :class="byChooseIndex===item.id?'byChoose text-bold text-xl':' text-grey'" @tap="byChooseIndex=item.id">
							<text class="text-bold text-zhuti">
								{{$t(item.label)}}
							</text>
						</view>
					</view>
					<view class="margin-top">
						<view  class="lists_ padding-lr-sm inputBorder flex justify-between align-center" >
							<input   type="number" v-model="byInputVal" style="width:50%;height: 100%;"  placeholder-style="font-size:24rpx;color:gray"  :placeholder="byChooseIndex===0?$t('请输入购买金额'):$t('请输入购买数量')"  />
							<view>
								<text class="text-zhuti">
									YNB
								</text>
								<text class="margin-lr-sm">
									|
								</text>
								<button class="bg-zhuti2 cu-btn round sm "  @tap="allByOrSell">
									<text class="text-sm text-zhuti2">
										{{$t('全部买入')}}
									</text>
								</button>
							</view>
						</view>
					</view>
					<view class="margin-top-xl padding-top text-black" v-if="chooseTitleIndex===0">
						<text class="text-zhuti">
							{{$t('限额')}}
						</text>
						<text class="margin-left-sm text-white">
							≥
						</text>
						<text class=" text-white">
							{{btnClickInfo.GeRenFHID}}
						</text>
						<text class="margin-left-xs text-zhuti">
							YNB
						</text>
					</view>
					<view class="margin-top flex align-center ">
						<text class="text-zhuti">
							{{$t('系统自动合算成USDT')}} ：
						</text>
						<view class="text-white" style="font-weight:700;">
							<text>
								{{byInputVal.length===0?'0.00000000':byInputVal*ynbByUsdt>=1?Math.round(byInputVal*ynbByUsdt):byInputVal*ynbByUsdt}}
							</text>
						</view>
					</view>
					<view class="margin-top flex align-center">
						<text class="text-zhuti">
							{{$t('自动取消')}} ：
						</text>
						<text class="text-white">
							{{time}}s
						</text>
					</view>
					
					<view class="margin-top-xl padding-top flex align-center justify-center">
						<view class="tixianNew" @tap="xiaDan">
							<text>
								{{$t('下单')}}
							</text>
						</view>
					</view>
				</view>
			</uni-popup>
			
			
			<uni-popup ref="dingDanInfo" type="bottom" :maskClick="false" >
				<view class="bg-zhuti1" style="height:100vh;position:relative;width:100vw;padding: 60rpx;">
					<view class="flex align-center">
						<u-icon name="arrow-left" size="40" color="#ffffff" @tap="detailSumBit(0)">
							 
						 </u-icon>
					</view>
					
					<scroll-view  :scroll-y="true" style="max-height:85vh;position: relative;width: 100%;margin-top:50rpx;">
						
						<view class="bottomBorder padding-tb">
							<text class="text-xxl text-white text-bold">
								+{{dingDanInfo.num}} YNB
							</text>
							
							<text class="text-sm text-zhuti text-bold margin-left">
								（{{(dingDanInfo.num*ynbByUsdt).toFixed(5)}} USDT）
							</text>
						</view>
						
						<view class="bottomBorder padding-tb margin-top" v-if="dingDanInfo.info!=0">
							<text class="text-white" style="word-wrap:break-word;">
								{{dingDanInfo.info}}
							</text>
						</view>
						
						<view class="lists_ padding-tb margin-top flex align-center" v-for="(item,index) of dingDanInfo.detailList" :key="index">
							<view style="width:30%" class="text-zhuti flex justify-start align-center">
								<text>
									{{item.needTrLbel?$t(item.label):item.label}}
								</text>
							</view>
							<view style="width:70%" class="text-bold text-white flex justify-end  align-center">
								<text style="word-break: break-all;" >
									{{item.needTrValue?$t(item.value):item.value}}
								</text>
							</view>
						</view>
						
						<view class="margin-top-xl lists_ padding-top flex align-center justify-between">
							<text class="text-zhuti">
								{{$t('自动取消')}} 
							</text>
							<text class="text-white">
								{{dingDanInfoTime}}s
							</text>
						</view>
						
						<view class="flex align-center justify-between  margin-top-xl padding-top">
							
							<view class="tixianNew" @tap="detailSumBit(1)">
								<text>
									{{$t('确认订单')}}
								</text>
							</view>
						</view>
					</scroll-view>
				</view>
			</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"position",
		props:{
			isOnPullDownRefresh:{
				type:Boolean,
				default:false
			},
			isOnReachBottom:{
				type:Boolean,
				default:false
			}
		},
		async created() {
			this.refshLogin()
			this.getCurryInfo()
			// this.$nextTick(()=>{
			// 	this.$refs.dingDanInfo.open()
			// 	this.dingDanInfoTime = 30
			// })
		},
		watch:{
			async isOnPullDownRefresh(n,o){
				if(n){
					await this.getCurryInfo()
					this.$emit('isOverDownRefresh',3)
				}
			},
			async isOnReachBottom(n,o){
				if(n){
					console.log('开始下滑了')
					this.$emit('isOverOnReachBottom',3)
				}
			},
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
		data() {
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
				time:0,
				byInputVal:'',
				showInputBorder:false,
				byChooseIndex:1,
				byTitleList:[
					{
						label:'按数量购买',
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
						getUrl:'getfkfs',
						icon:'cuIcon-pay'
					},
					{
						list:[],
						index:-1,
						labelText:'交易金额',
						getUrl:'getfkminnum',
						icon:'cuIcon-refund'
					}
				],
				titleChooseS:[
					{
						name:'我要买',
						id:0
					},{
						name:'我要卖',
						id:1
					}
				],
				current: 0,
				isLoading:false,
				dingDanInfoTime:0,
				dingDanInfo:{},
				
				
				pickerInfo:{
					list:[],
					chooseIndex:0,
					id:''
				}
			};
		},
		methods:{
			pickerSumbit(flag){
				if(!flag){
					this.openOrClose('close','picker')
				}else{
					let infoObj = {
						target:{
							id: this.pickerInfo.id
						},
						detail:{
							value:this.pickerInfo.chooseIndex
						}
					}
					this.openOrClose('close','picker')
					this.sortListPickerChange(infoObj)
				}
			},
			setChoosePicker(index){
				this.$set(this.pickerInfo,'chooseIndex',index)
			},
			async openPicker(infoObj,infoIndex){
				this.pickerInfo.list = infoObj.list
				this.pickerInfo.chooseIndex = infoObj.index
				this.pickerInfo.id = `sortChoose${infoIndex}`
				this.$nextTick(()=>{
					this.openOrClose('open','picker')
				})
			},
			async getCurryInfo(){
				this.$nextTick(async ()=>{
					this.isSend = true
					this.getData.page = 1
					this.isLoading = true
					await this.isnewmsg()
					await this.getList()
					await this.getPickerSort()
					this.isLoading = false
					
					
					let info = await this.getWenZhangDetail(1002)
					if(info.isOk){
						this.releaseInfo = info.data
						this.releaseTitle = this.releaseInfo.Title
					}
				})
			},
			sectionChange(index) {
				this.current = index;
				let item = {
					id:this.titleChooseS[index].id
				}
				this.chooseTitle(item)
			},
			
			/*其他操作相关*/
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
				this.$Route.navigateTo('/pages/account/transactionRecords')
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
				this.$nextTick(async () =>{
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
						}else{
							this.$api.msg(byRes.Msg)
						}
					}
				})
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
						class:'bg-zhuti2'
					}
				}
				if(this.chooseTitleIndex===1){
					return {
						text:'出售',
						class:'bg-gray'
					}
				}
			}
		}
	}
</script>

<style lang="scss">

	.subsection{
		margin: 100rpx 50rpx 40rpx 40rpx;
		border-radius: 20rpx;
	}
	.lists{
		color: #FFFFFF;
		margin: 30rpx 40rpx;
		margin-bottom: 40rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		// background-color: #36373F;
		background: linear-gradient(275deg, rgba(45, 45, 53, 0.1) 0%, #505058 100%);
	}
	.custom{
		margin: 10rpx 0rpx;
	}
	.upturn{
		color: red;
		font-weight: bold;
		position: relative;
		top: 4rpx;
	}
</style>

<style scoped>
	.selectPayWays{
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		right: 0rpx;
		background-color: #424554;
		padding: 30rpx 30rpx;
		padding-bottom: 0rpx;
		padding-top: 55rpx;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.tipInfo{
		position: fixed;
		top: 0rpx;
		width: 100vw;
		height:100rpx;
		z-index:11
	}
	.an3{animation:fadeInDown   0.8s 1; }
	.an4{animation:fadeOutUpBig	   0.8s 1; }
</style>