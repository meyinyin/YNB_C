<template>
	<view>
		<view style="padding: 60rpx;">
			<view class="form-header_ flex align-center justify-between">
				<view class="flex">
					<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
					<text class="margin-left-sm">{{$t('出售YNB')}}</text>
				</view>
			</view>
			
			<view class="margin-top">
				<view  class="margin-top" >
					<view class="text-bold text-zhuti margin-bottom-sm">
						{{$t('出售YNB个数')}}
					</view>
					<view  class="lists_ padding-lr-sm inputBorder" >
						<input   type="number" v-model="addInfo.num" style="width:100%;height: 100%;" />
					</view>
				</view>
				<view  class="margin-top" >
					<view class="text-bold text-zhuti margin-bottom-sm">
						{{$t('用户最少购买个数')}}
					</view>
					<view  class="lists_ padding-lr-sm inputBorder" >
						<input   type="number" v-model="addInfo.minnum" style="width:100%;height: 100%;" />
					</view>
				</view>
				<view  class="margin-top" >
					<view class="text-bold text-zhuti margin-bottom-sm">
						{{$t('矿工费')}}
					</view>
					<view  class="lists_ padding-lr-sm inputBorder" >
						<input   type="text" :value="`${SCORE}XLM`" style="width:100%;height: 100%;" :disabled="true" />
					</view>
				</view>
				
				<view class="margin-top" v-if="Content.length!=0">
					<rich-text style="line-height: 1.5em;color: white;font-size: 24rpx;" :nodes="Content"></rich-text>
				</view>
				<view  class="margin-top" >
					<view class="text-bold text-zhuti margin-bottom-sm">
						{{$t('备注')}}
					</view>
					<view  class="lists_ padding-lr-sm inputBorder" style="height: 200rpx;">
						<textarea   type="text" v-model="addInfo.info" style="width:100%;height: 100%;" >
							
						</textarea>
					</view>
				</view>
				
				<view  class="margin-top flex align-center" >
					<view class="text-bold text-zhuti">
						<text>
							{{$t('支付方式')}} :
						</text>
					</view>
					<view class="margin-left">
						<text class="text-white" @tap="openPicker">
							{{payWayIndex>-1?payWays[payWayIndex].BankInfo:$t('请选择')}}
						</text>
					</view>
				</view>
				
				<view style="margin-top:50rpx;" class="flex align-center justify-center">
					<view class="tixianNew"@tap="sumBit">
						<text>
							{{$t('确定')}}
						</text>
					</view>
				</view>
			</view>
		</view>
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
					<view class="flex align-center  padding" v-for="(item,index) of payWays">
						<view style="width: 50%;" class="flex justify-end text-zhuti" @tap="setChoosePicker(index)">
							<text class="cuIcon-roundcheckfill margin-right-sm" style="font-size:40rpx"  v-if="payWayIndex===index">
							</text>
							
							<text class="cuIcon-round margin-right-sm"  style="font-size:40rpx" v-else>
							</text>
						</view>
						
						<view style="width: 50%;" class="flex justify-start">
							<text class="margin-left-sm text-white" >
								{{item.BankInfo}}
							</text>
						</view>
						
					</view>
					
				</scroll-view>
			</view>
		</uni-popup>
		<load-line :isLoading="isLoading" ></load-line>
	</view>
</template>

<script>
	export default{
		onShow() {
			this.getBankList()
			this.firstgetWenZhangDetail()  
			this.getneedscore()
		},
		onLoad() {
			
		},
		computed:{
			payWays(){
				if(this.pays.length===0){
					return []
				}else{
					return this.pays.map(it=>{
						let obj = it.Bank
						obj.BankInfo = `${obj.BankName}`
						return obj
					})
				}
			},
			addInfoNum(n,o){
				return this.addInfo.num
			},
		},
		data(){
			return {
				isLoading:false,
				pays:[],
				addInfo:{
					num:'',
					minnum:'',
					info:''
				},
				zfsortID:'',
				payWayIndex:-1,
				Content:[]
			}
		},
		watch:{
			addInfoNum(n,o){
				let num = n*1
				if(num>0){
					if(num*1<100000){
						this.$set(this.addInfo,'minnum',num)
					}else{
						this.$set(this.addInfo,'minnum',100000)
					} 
				}else{
					this.$set(this.addInfo,'minnum',0)
				}
			}
		},
		methods:{
			setChoosePicker(index){
				this.payWayIndex = index
			},
			openPicker(){
				this.$nextTick(async ()=>{
					this.$refs.picker.open()
				})
			},
			pickerSumbit(flag){
				this.$nextTick(async ()=>{
					this.$refs.picker.close()
					if(!flag){
						this.payWayIndex = -1
					}else{
						this.$refs.picker.close()
					}
				})
			},
			async firstgetWenZhangDetail(){
				let info = await this.getWenZhangDetail(2014)
				if(info.isOk){
					this.Content = info.content
				}
			},
			async getBankList(){
				this.$nextTick(async ()=>{
					this.isLoading = true
					let [err,res] = await this.$Request_.get(this.$allUrl.banklist,{
						userid:this.userInfo_.ID,
						lan:this.lan_
					}) 
					 this.isLoading = false
					if(res!=null){
						if(res.IsSuccess){
							this.pays = res.Data
						}
					}	
				})
						
			},
			async sumBit(){
				this.$nextTick(async ()=>{
					if(this.pays.length!=0){
						if(this.addInfo.num.length===0){
							this.$api.msg(this.$t('请输入正确的内容'),1500)
							return
						}
						if(this.addInfo.minnum.length===0){
							this.$api.msg(this.$t('请输入正确的内容'),1500)
							return
						}
						if(this.payWayIndex<0){
							this.$api.msg(`${this.$t('请选择')}${this.$t('买家付款方式')}`,1500)
							return
						}
						if(this.addInfo.num*1<100000){
							this.addInfo.minnum = this.addInfo.num
						}else{
							if(this.addInfo.minnum<100000){
								this.addInfo.minnum = 100000
							}
						}
						
						
						this.isLoading = true
						let getData = {
							userid:this.userInfo_.ID,
							num:this.addInfo.num*1,
							minnum:this.addInfo.minnum*1,
							info:this.addInfo.info,
							zfsortID:this.payWays[this.payWayIndex].StoreBankID,
							lan:this.lan_
						}
						console.log(getData)
						let [err,res] = await this.$Request_.get(this.$allUrl.salesYnb,getData)
						this.isLoading = false
						if(res!=null){
							if(res.IsSuccess){
								this.$api.msg('OK',1500,true,'success')
							}else{
								this.$api.msg(res.Msg,1500)
							}
						}
					}else{
						let data={
							title:this.$t('尊敬的用户'),
							content:this.$t('您暂未设置收款方式，是否前去设置?'),
							cancelText: this.$t('取消'),
							confirmText: this.$t('确定')
						}
						let res=  await this.$api.showModal(data)
						if(res){
							this.$Route.navigateTo('/pages/account/paymentMethods')
						}
					}
				})
			},
			PickerChange(e){
				this.payWayIndex = e.detail.value
			}
		}
	}
</script>

<style scoped>
	.inputBorder{
		/* height:89rpx;border: 2rpx solid black; border-radius: 10rpx; */
		position:relative;
	}
</style>
