<template>
	<view>
		<view v-if="isShowSurePopPurchase">
			<uni-popup ref="isSurePopPurchase" type="top" :maskClick="false" >
				<view style="width: 100vw;padding: 60rpx;border-radius: 10rpx;height: 100vh" class="cardBg_">
					<view class="flex align-center justify-start">
						<u-icon name="arrow-left" size="40" color="#ffffff" @tap="detailSumBit(0)">
							 
						 </u-icon>
						 
						<text class="text-bold text-xl text-white margin-left-sm">
							{{quRenFuKuanInfo.title}}
						</text>
					</view>
					<view class="padding-tb margin-top-xl" v-if="isFirstPurchaseSure">
						<scroll-view scroll-y="true" style="max-height:60vh;">
							<view>
								<rich-text class="text-zhuti" style="line-height: 1.5em;" :nodes="quRenFuKuanInfo.content"></rich-text>
							</view>
						</scroll-view>
						
					</view>
					<view class="padding-tb-sm margin-top-xl" v-else>
						<view>
							<text class="text-black" style="line-height: 1.5em;">
								{{$t('上传截图附件以供对方核实，在24小时内容，您还有多次提交机会，若卖出用户继续拒绝，或24小时以后此笔交易未完成，您以及卖出用户的账户将暂时被锁定，我们会介入调查此笔交易，在判定某一方出现问题后，用久锁定此账户并且解锁另一方账户。')}}
							</text>
						</view>
						<view class="flex align-center margin-top-sm" style="flex-wrap: wrap;">
							<view class="addBtn" @tap="addImage()">
								<text class="cuIcon-cameraaddfill text-zhuti addBtnCamer">
									
								</text>
							</view>
							<view class="addBtn margin-left-sm" v-for="(item,index) of addFuJianList" :key="index">
								<text class="delBtn cuIcon-roundclosefill" @tap="DelImg(index)">
									
								</text>
								<image  @tap="ViewImage(addFuJianList,item)" :src="item" mode="" style="width: 100%;height: 100%;">
									
								</image>
							</view>
						</view>
					</view>
					<view class="flex align-center justify-between margin-top-xl">
						<button class="cu-btn  round  bg-gray" @tap="purchaseSure(0)">
							{{$t('取消')}}
						</button>
						<button class="cu-btn   round bg-zhuti2" @tap="purchaseSure(1)">
							<text class="text-zhuti2">
								{{$t('确定')}}
							</text>
						</button>
					</view>
				</view>
			</uni-popup>
		</view>
		
		
		<view v-if="isShowSurePopSellOut">
			<uni-popup ref="isSurePopSellOut" type="top" :maskClick="false" >
				<view style="width:100vw;height: 100vh; padding:60rpx;" class="cardBg_">
					<view class="flex align-center  ">
						<u-icon name="arrow-left" size="40" color="#ffffff" @click="sellOutSure(false,false)"></u-icon>
						<text class="text-white text-bold text-xl margin-left-sm">
							{{$t('确认卖出')}} 
						</text>
					</view>
					<view class="margin-top" v-if="showPurchaseFuJianList.length!=0">
						<view>
							<text class="text-bold">
								{{$t('附件展示')}}：
							</text>
						</view>
						<scroll-view scroll-y="true" style="max-height:800rpx;margin-top: 60rpx;">
							<view class="flex align-center margin-top-sm justify-between" style="flex-wrap: wrap;">
								<view class="addBtn margin-left-sm" v-for="(item,index) of showPurchaseFuJianList" :key="index">
									<image mode="aspectFill"  @tap="ViewImage(showPurchaseFuJianList,item)" :src="item"  style="width: 100%;height: 100%;">
										
									</image>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="margin-top-xl padding-top flex align-center justify-between">
						<button class="cu-btn bg-red round" @tap="sellOutSure(false)">
							<text class="margin-lr">
								{{$t('拒绝')}}
							</text>
						</button>
						<button class="cu-btn bg-zhuti2 round" @tap="sellOutSure(true)">
							<text class="margin-lr">
								{{$t('确定')}}
							</text>
						</button>
					</view>
				</view>
			</uni-popup>
		</view>
		
		<view v-if="orderDetail">
			<uni-popup ref="orderDetail" type="center" :maskClick="false" >
				<view class="padding bg-zhuti1" style="height:100vh;position: relative;width:100vw;padding:60rpx 60rpx 30rpx 60rpx;">
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<u-icon name="arrow-left" size="40" color="#ffffff" @click="detailSumBit(0)"></u-icon>
							<text style="color: #FFFFFF;font-size: 50upx;font-weight: bold;" class="margin-left-sm">{{$t('查看详情')}}</text>
						</view>
						
						
						
						<button class="cu-btn bg-gray sm round" style="border: 2rpx solid gray;" v-if="isNotFk">
							<view class="padding-lr flex align-center margin-tb">
								<text class="cuIcon-remind">
									
								</text>
								<text class="margin-left-sm  text-black">
									{{$t('付款剩余')}}:{{showfkAddTime<=0?0:showfkAddTime}}s
								</text>
							</view>
						</button>
					</view>
					<scroll-view  :scroll-y="true" style="max-height:90vh;position: relative;width: 100%;">
						<view class="bank_card flex justify-center align-center flex-direction">
							<text class="list_word text-xxl text-bold">
								+{{orderDetailInfo.AllNum}} YNB
							</text>
							<text class="margin-top  text-sm">
								（{{(orderDetailInfo.AllNum*ynbByUsdt).toFixed(5)}} USDT）
							</text>
						</view>
						<view style="height:40rpx;">
							
						</view>
						<view class="bottomBorder padding-tb" v-if="orderDetailInfo.Info.length!=0">
							<text class="text-white">
								{{orderDetailInfo.Info}} 
							</text>
						</view>
						<view class="bottomBorder padding-tb flex align-center" v-for="(item,index) of orderDetailInfo.detailList" :key="index">
							<view style="width:20%" class="text-zhuti flex justify-start align-center">
								<text>
									{{item.needTrLbel?$t(item.label):item.label}} 
								</text>
							</view>
							<view style="width:80%" class=" text-white flex justify-start  align-center">
								<p style="word-break: break-all;" class="text-bold" >
									：{{item.needTrValue?$t(item.value):item.value}}
									<text   @tap="copy(item)" class="margin-left-sm cuIcon-copy" style="font-weight:1;font-size: 30rpx;" v-if="item.needCopy">
										
									</text>
								</p>
							</view>
						</view>
						
						<view class="bottomBorder padding-tb " v-for="(it,index_) of orderDetailInfo.bankList" :key="`${index_}payWay`">
							<view class="flex align-center justify-between">
								<text class="text-bold text-zhuti text-xl">
									{{it.title}}
								</text>
							</view>
							<view class="margin-top-sm" v-for="(jtem,dex) of it.infoList" :key="dex">
								
								<view  class="text-zhuti flex  " v-if="jtem.value.length!=0">
									<text>
										{{jtem.needTrLbel?$t(jtem.label):jtem.label}} 
									</text>
								</view>
								
								<view  class=" text-white    margin-top-xs " v-if="jtem.value.length!=0">
									<p style="word-break: break-all;" >
										{{jtem.needTrValue?$t(jtem.value):jtem.value}}
									</p>
									<view class="margin-top-xs flex justify-end">
										<text   @tap="copy(jtem)" class="margin-left-sm cuIcon-copy" style="font-weight:1;font-size: 30rpx;">
											
										</text>
									</view>
								</view>
							</view>
							<view class="flex align-center margin-top-xs justify-between" style="flex-wrap: wrap;" v-if="it.pics.length!=0">
								<view style="margin:0rpx;border: 0rpx;" class="addBtn " v-for="(imgurl,urlIndex) of it.pics" :key="`image_${urlIndex}`">
									<image mode="aspectFill"  @tap="ViewImage(it.pics,imgurl)" :src="imgurl"  style="width: 100%;height: 100%;">
										
									</image>
								</view>
							</view>
						</view>
						
						
						
						
						<view class="flex align-center justify-end margin-top" v-if="orderDetailBtn.isShowBtn">
							<button class="cu-btn bg-zhuti2" @tap="detailSumBit(1)">
								<text class="margin-lr">
									{{orderDetailBtn.isSurePopPurchase?$t('确认付款'):$t('确认卖出')}}
								</text>
							</button>
						</view>
						
						<view class="flex align-center justify-end margin-top" v-if="isTSBtn">
							<button class="cu-btn bg-zhuti2 round" @tap="ts">
								<text class="margin-lr text-zhuti2">
									{{$t('投诉')}}
								</text>
							</button>
						</view>
						
						
						
						<view  style="margin-top:40rpx;margin-bottom: 100rpx;" v-if="isShowTs">
							<view>
								<text class="text-bold text-zhuti text-xxl">
									{{$t('纠纷信息')}}:
								</text>
							</view>
							<view class="padding-tb text-white">
								<text v-if="TSInfo.length!=0">
									{{isInfo(TSInfo)}}
								</text>
								<text v-else>
									{{$t('暂无数据')}}
								</text>
							</view>
							<view class="margin-top" v-if="TSPicUrls.length!=0">
								<view>
									<text class="text-zhuti">
										{{$t('附件展示')}}:
									</text>
								</view>
								<view class="flex align-center margin-top justify-between" style="flex-wrap: wrap;">
									<view style="margin:0rpx;border: 0rpx;" class="addBtn " v-for="(item,index) of TSPicUrls" :key="index">
										<image mode="aspectFill"  @tap="ViewImage(TSPicUrls,item)" :src="item"  style="width: 100%;height: 100%;">
											
										</image>
									</view>
								</view>
							</view>
						</view>
						
					</scroll-view>
				</view>
				
				
				
			</uni-popup>
		</view>
	</view>
</template>

<script>
	// import { setClipboardData, getClipboardData } from 'uni-clipboard'
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default{
		components:{
			uniPopup
		},
		computed:{
			quRenFuKuanInfo(){
				return this.$store.state.quRenFuKuanInfo 
			},
			isShowSurePopPurchase(){
				return this.orderComponent.isShowSurePopPurchase
			},
			isShowSurePopSellOut(){
				return this.orderComponent.isShowSurePopSellOut
			},
			orderDetail(){
				return this.orderComponent.orderDetail
			},
			isFirstPurchaseSure(){
				return this.orderComponent.isFirstPurchaseSure
			},
			showPurchaseFuJianList(){
				return this.orderComponent.showPurchaseFuJianList.map(it=>{
					return it.PicUrl
				})
			},
			showSellOutFuJianList(){
				return this.orderComponent.showSellOutFuJianList
			},
			orderDetailInfo(){
				return this.orderComponent.orderDetailInfo
			},
			orderDetailBtn(){
				return this.orderComponent.orderDetailBtn
			},
			isShowTs(){
				return this.isShowTsInfo.isShow
			},
			TSInfo(){
				return this.isShowTsInfo.TSInfo
			},
			TSPicUrls(){
				return this.isShowTsInfo.TSPicUrls
			}
		},
		props:{
			isNotFk:{
				type:Boolean,
				default:false
			},
			showfkAddTime:{
				type:Number,
				default:0
			},
			isShowTsInfo:{
				isShow:true,
				TSInfo:'',
				TSPicUrls:[],
			},
			isTSBtn:{
				type:Boolean,
				default:true
			},
			orderComponent:{
				type:Object,
				default:()=>{
					return {
						isShowSurePopPurchase:false,//确认付款的弹窗显示控制，
						isShowSurePopSellOut:false,//确认卖出的弹窗显示控制
						orderDetail:false,//订单详情的弹窗显示控制
						isFirstPurchaseSure:true,//确认卖出是否为第一次
						showPurchaseFuJianList:[],//订单详情的附件信息，在确认卖出时也会被使用（买入用户的附件）
						showSellOutFuJianList:[],//订单详情的附件信息（卖出详情的附件）
						orderDetailInfo:{//订单的详情数组信息
							Info:'',
							AllNum:'92.000000',
							detailList:[
								{
									label:'类型',
									value:'普通买入',
									needTr:true
								},{
									label:'状态',
									value:'已完成',
									needTr:true
								},{
									label:'区块链交易ID',
									value:'djsospapxmcv1v52b3sfb48etn1b5s23b48eyt9/8tts4b1f52v3b8etr4rr1sbz2v3x84g8wrega1vs2c8e4f1csfd48ea1vc2d8ew41vd8w41v5a8fw4eg4a1v28e4a123q8e4af1s6t48erh41fv5w6rr8e4',
									needTr:false
								},{
									label:'时间',
									value:'2021/2/21 0:30',
									needTr:true
								}
							]
						},
						orderDetailBtn:{//订单详情是否显示按钮，以及按钮的控制能力
							isShowBtn:true,//是否显示底部按钮，当订单未完成的时候才会显示
							isSurePopPurchase:false,//确认付款？
						}
					}
				}
			},
			backOrClose:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				addFuJianList:[],//上传附件的附件列表
			}
		},
		methods:{
			copy(it,index){
				let str = it.value
				uniCopy({
					content: str,
					success: (res) => {
						this.$api.msg('OK',1000,true,'success')
					},
					error: (e) => {
						
					}
				})
			},
			ts(){
				this.$emit('ts')
			},
			openOrClose(type,popName = 'orderDetail'){//打开或关闭弹窗
				return new Promise((res,rej)=>{
					this.$nextTick(()=>{
						this.$refs[popName][type]()
						res(true)
					})
				})
			},
			ViewImage(urls,url) {//浏览图片
				uni.previewImage({
					urls,
					current:url
				})
			},
			async addImage(list){//上传图片用的
				uni.chooseImage({
					count: 5, //默认9
					sizeType: ['compressed','original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success:async (res) => {
						// #ifdef APP-PLUS || H5 || MP-WEIXIN
						for(let it of res.tempFiles){
							let localPath =it.path	
							this.addFuJianList.push(localPath)	
						}
						// #endif
					}
				});
			},
			async DelImg(index) {//删除选择的照片
				let data={
					title: '尊敬的用户',
					content: '确定要删除上传附件吗？',
					cancelText: '不删除',
					confirmText: '删除'
				}
				let res=  await this.$api.showModal(data)
				if(res){
					this.addFuJianList.splice(index, 1)
				}
			},
			purchaseSure(type){//确认付款的确定弹窗
				this.openOrClose('close','isSurePopPurchase')
				let flag = false
				let data = {}
				if(type===1){
					flag = true
					let addFuJianList = []
					if(!this.isFirstPurchaseSure){
						addFuJianList = this.addFuJianList
					}
					data.addFuJianList = addFuJianList
				}
				this.sumBitOver('purchaseSureOver',flag,data)
			},
			
			sellOutSure(flag,isSumbit = true){//确认卖出的确定弹窗
				this.openOrClose('close','isSurePopSellOut')
				this.sumBitOver('sellOutSureOver',isSumbit,{
					isTrue:flag
				})
			},
			
			detailSumBit(type){
				console.log(type,22222222)
				if(type===0){
					if(this.backOrClose){
						uni.navigateBack()
					}else{
						this.openOrClose('close','orderDetail')
					}
					this.sumBitOver('orderDetailOver',false,{})
				}
				if(type===1){
					let isSurePopPurchase = true
					if(!this.orderDetailBtn.isSurePopPurchase){//确认付款
						isSurePopPurchase = false
					}
					this.openOrClose('close','orderDetail')
					this.sumBitOver('orderDetailOver',true,{
						isSurePopPurchase
					})
				}
			},
			
			sumBitOver(thing,isSumBit,argObj={}){
				argObj.isSumBit = isSumBit
				argObj.thing = thing
				this.$emit('orderSeriesEve',argObj)
			}
		},
		watch:{
			isShowSurePopPurchase(n,o){
				if(n){
					this.addFuJianList = []
					this.openOrClose('open','isSurePopPurchase')
				}
			},
			isShowSurePopSellOut(n,o){
				if(n){
					this.openOrClose('open','isSurePopSellOut')
				}
			},
			orderDetail(n,o){
				if(n){
					this.openOrClose('open','orderDetail')
				}
			}
		}
	}
</script>

<style scoped>
	.padding-tb{
		padding: 10rpx 0rpx;
	}
	.bottomBorder{
		/* border-bottom: 2rpx solid rgba(180,180,180,0.5); */
	}
	.addBtn{
		width: 120rpx;
		height: 120rpx;
		border: 2rpx solid rgba(180,180,180,0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top:15rpx;
	}
	.delBtn{
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		font-size:40rpx;
		z-index:1
	}
	.addBtnCamer{
		font-size: 50rpx;
	}
</style>


<style scoped>
	.bank_card{
		background-color: #D8543E;
		border-radius: 20rpx;
		height: 250rpx;
		color: #FFFFFF;
		/* // opacity: 0.8; */
		padding: 20rpx;
		margin-top: 50rpx;
	}
	.list_word{
		margin: 8rpx 2rpx;
	}
</style>