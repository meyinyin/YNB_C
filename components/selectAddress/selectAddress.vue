<template>
	<view>
		<uni-popup ref="showPop" type="bottom" :maskClick="false">
			<view class="bg-white padding ">
				<view class="flex align-center justify-end">
					<text class="cuIcon-roundclose" style="font-size: 40rpx;" @tap="closeSelect('close')">
						
					</text>
				</view>
				<view class="flex align-center justify-between" @tap="chooseAddr">
					<view style="width: 95%;" class="text-black" v-if="hasAdders">
						<view class="flex align-center">
							<text>
								{{addersInfo.UserName}}
							</text>
							<text class="margin-left-sm">
								{{addersInfo.UserPhone}}
							</text>
						</view>
						<view class="margin-top-sm">
							<text>{{addersInfo.allAdders}}</text>
						</view>
					</view>
					<view class="flex align-center padding" v-else>
						<text>
							请前往选择地址
						</text>
					</view>
					<view class="cuIcon-right" style="font-size:40rpx;">
						
					</view>
				</view>
				<view class="tui-bg-img"></view>
				<view class="flex align-center justify-center">
					<button class="cu-btn bg-green round " @tap="closeSelect('sumbit')">
						确 定 选 择
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default{
		data(){
			return {
				addersInfo:{
					allAdders:'',
					UserName:'',
					UserPhone:''
				},
				hasAdders:false,
				addersList:[]
			}
		},
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			isChangeUseAddr(){
				return this.$store.state.isChangeUseAddr
			},
		},
		watch:{
			async show(n,o){
				if(n){
					let addrList = this.$store.state.addrList
					if(addrList.length===0){
						await this.getAdders()
					}else{
						this.isHasAdders(addrList)
					}
					this.openOrClose('open')
				}else{
					this.openOrClose('close')
				}
			},
			isChangeUseAddr(n,o){
				let adderInfo = this.$store.state.addr
				let length = Object.keys(adderInfo).length
				console.log(adderInfo,length)
				if(length!=0){
					this.hasAdders = true
					adderInfo.allAdders =  `${adderInfo.Sheng}${adderInfo.Shi}${adderInfo.Xian}${adderInfo.Address}`
					this.addersInfo = adderInfo
					this.addersInfo.UserAddressID = adderInfo.UserAddressID
				}else{
					this.getAdders()
				}
			}
		},
		methods:{
			chooseAddr() {
				// this.onSuccess()
				this.$Route.navigateTo('/pages/IndexPage/indexTable/song/selectAddr')
			},
			openOrClose(type){
				this.$nextTick(()=>{
					this.$refs.showPop[type]()
				})
			},
			async getAdders(){
				this.$api.showLoading_({
					title:'正在查找地址'
				})
				let res = await this.$ajax.getAddrList(this.userInfo_.ID)
				this.$api.hidLoading_()
				let addersList = res.Data
				this.$store.commit('setAddrList', addersList)
				this.addersList = addersList
				this.isHasAdders(addersList)
				return 
			},
			isHasAdders(addersList){
				for(let val of addersList){
					let IsDefault = val.IsDefault
					if(IsDefault){
						this.hasAdders = true
						this.addersInfo = val
						this.addersInfo.allAdders =  `${val.Sheng}${val.Shi}${val.Xian}${val.Address}`
						this.addersInfo.UserAddressID = val.UserAddressID
						return
					}
				}
				this.hasAdders = false
			},
			closeSelect(type){
				let map = {
					type,
					adderInfo:this.addersInfo
				}
				if(type === 'sumbit'){
					if(this.hasAdders){
						this.$emit('closeSelect',map)
					}else{
						map.type = 'close'
						this.$emit('closeSelect',map)
					}
				}else if(type === 'close'){
					this.$emit('closeSelect',map)
				}
			}
		}
	}
</script>

<style scoped>
	.tui-bg-img {
		width: 100%;
		height: 8rpx;
		margin:30rpx 0rpx;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAECAMAAADszM6/AAAAOVBMVEUAAAAVqfH/fp//vWH/vWEVqfH/fp8VqfH/fp//vWEVqfH/fp8VqfH/fp//vWH/vWEVqfH/fp//vWHpE7b6AAAAEHRSTlMA6urqqlVVFRUVq6upqVZUDT4vVAAAAEZJREFUKM/t0CcOACAQRFF6r3v/w6IQJGwyDsPT882IQzQE0E3chToByjG5LwMgLZN3TQATmdypCciBya0cgOT3/h//9PgF49kd+6lTSIIAAAAASUVORK5CYII=") repeat;
	}
</style>
