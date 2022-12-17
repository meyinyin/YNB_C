<template>
	<view>
		<view style="padding: 60rpx;">
			<view class="form-header_">
				<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
				<text class="margin-left-sm">{{$t('收款方式')}}</text>
			</view>
			<view class="margin-top">
				<view v-if="pays.length!=0">
					<view class="addContent bg-zhuti3" v-for="(it,jndex) of pays" :key="jndex">
						<view class="flex align-center justify-between">
							<view class="flex align-center">
								<text class="text-zhuti2 text-bold">{{$t('收款方式')}}:</text>
								<view class="margin-left padding-xs"   style="width:70%;">
									<input class=" text-white" :disabled="true" type="text" style="width: 100%;" v-model="it.Bank.BankName">
								</view>
							</view>
						</view>
						<view class="margin-top">
							<view>
								<text class=" text-zhuti2 text-bold">
									{{$t('钱包地址/账户')}}:
								</text>
							</view>
							<view class="flex align-center margin-top-sm">
								<view style="width: 100%;border-radius: 10rpx;" class="padding-lr-sm" >
									<text style="width:100%;word-wrap: break-word;" class="text-white">
										{{it.Bank.BankAddress}}
									</text>
								</view>
							</view>
							
							<view class="margin-top">
								<text class=" text-zhuti2 text-bold">
									{{$t('收款备注')}}:
								</text>
							</view>
							<view class="flex align-center margin-top-sm">
								<view style="width: 100%;border-radius: 10rpx;"  class="padding-lr-sm">
									<text style="width:100%;word-wrap: break-word;" class="text-white">
										{{it.Bank.BankNo}}
									</text>
								</view>
							</view>
							
							
							<view class="margin-top-sm" v-if="it.Pics.length!=0">
								<view class="flex align-center margin-top-sm" style="flex-wrap: wrap;">
									
									<view class="addBtn margin-left-sm" v-for="(item,index) of it.Pics" :key="index">
										
										<image  @tap="ViewImage(it.Pics,item)" :src="item" mode="" style="width: 100%;height: 100%;">
											
										</image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<no-content></no-content>
				</view>
				<view class="flex align-center margin-top-xl justify-center padding-lr-xl">
					<view class="tixianNew" @tap="addPay">
						<text style="position: relative;bottom:4rpx;font-size: 50rpx;">
							+
						</text>
					</view>
				</view>
			</view>
		</view>
		
		
		
		
		<uni-popup ref="inputSumbit" type="top" :maskClick="false" >
			<view class="addContent " style="width:100vw;height: 100vh;background: #424554;">
				<view class=" flex margin-bottom">
					<u-icon name="arrow-left" size="40" color="#ffffff" @tap="closePop"></u-icon>
				</view>
				<view class="flex align-center justify-between margin-top-xl padding-top">
					<view >
						<view>
							<text class="text-zhuti text-bold">{{$t('收款方式')}}:</text>
						</view>
						<view class="flex align-center margin-top-sm">
							<view style="width: 100%;height: 90rpx;"  class="padding-lr-sm lists_">
								<input :disabled="isFirst" type="text" style="width: 100%;color:white;" v-model="addInfo.BankName">
							</view>
						</view>
					</view>
				</view>
				<view class="margin-top-xl padding-top">
					<view>
						<text class="text-zhuti text-bold">
							{{$t('钱包地址/账户')}}:
						</text>
					</view>
					<view class="flex align-center margin-top-sm">
						<view style="width: 100%;height: 90rpx;"  class="padding-lr-sm lists_">
							<input  type="text" style="width:100%;height: 100%;color: white;" v-model="addInfo.BankAddress" >
						</view>
					</view>
					<view class="margin-top-xl padding-top">
						<text class="text-zhuti text-bold">
							{{$t('收款备注')}}:
						</text>
					</view>
					<view class="flex align-center margin-top-sm">
						<view style="width: 100%;height: 90rpx;" class="padding-lr-sm lists_" >
							<input type="text" style="width:100%;height: 100%;color: white;" v-model="addInfo.BankNo" >
						</view>
					</view>
					<view class="margin-top-xl padding-top">
						<view>
							<text class="text-zhuti text-bold" >
								{{$t('上传附件(非必填)')}}:
							</text>
						</view>
						<view class="flex align-center margin-top" style="flex-wrap: wrap;">
							<view class="addBtn" @tap="addImage(usdeFuJianList)">
								<text class="cuIcon-cameraadd text-zhuti addBtnCamer">
									
								</text>
							</view>
							
						</view>
						<view class="addBtn margin-top-sm" v-for="(item,index) of usdeFuJianList" :key="index">
							<text class="delBtn cuIcon-roundclosefill" @tap="DelImg(usdeFuJianList,index,usdtDisAble)">
								
							</text>
							<image  @tap="ViewImage(usdeFuJianList,item)" :src="item" mode="" style="width: 100%;height: 100%;">
								
							</image>
						</view>
					</view>
					<view class="margin-top-xl padding  flex ">
						<view class="tixianNew" @tap="sumBit">
							<text>
									{{$t('确定')}}
							</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<load-line :isLoading="isLoading" ></load-line>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default{
		components:{
			uniPopup
		},
		onShow() {
			this.$Route.routeBefore(this);
			this.getBankList()
		},
		computed:{
			isFirst(){
				if(this.pays.length===0){
					return true
				}else{
					for(let item of this.pays){
						let BankName = item.Bank.BankName
						if(BankName==='USDT'){
							return false
						}
					}
					return true
				}
			}
		},
		data(){
			return {
				isLoading:false,
				pays:[
					
				],
				usdtDisAble:false,
				addInfo:{
					BankName:'',
					BankAddress:'',
					BankNo:'',
					PicID:''
				},
				usdeFuJianList:[],
				
			}
		},
		methods:{
			async sumBit(){
				if(this.addInfo.BankName.length===0){
					this.$api.msg(this.$t('请输入正确的内容'),1500)
					return 
				}
				if(this.addInfo.BankAddress.length===0){
					this.$api.msg(this.$t('请输入正确的内容'),1500)
					return 
				}
				this.closePop()
				this.isLoading = true
				
				if(this.usdeFuJianList.length===0){
					let getData = {
						...this.addInfo,
						userid:this.userInfo_.ID,
						lan:this.lan_,
						PicID:0
					}
					
					let [err,res] = await this.$Request_.get(this.$allUrl.addYNBbank,getData)
					this.isLoading = false
					if(res!=null){
						if(res.IsSuccess){
							this.getBankList()
						}else{
							this.$api.msg(res.Msg)
						}
					}
				}else{
					let [upLoadErr,upLoadRes] = await uni.uploadFile({
						url:'https://api.ynbs.xyz/api/news/upload',
						filePath:this.usdeFuJianList[0],
						name: 'file',
						formData:{
							thumb_mode: 1,
						}
					})
					if(upLoadRes!=null){
						let  newUpLoadRes = JSON.parse(upLoadRes.data)
						if(newUpLoadRes.IsSuccess){
							let picurl = `${newUpLoadRes.Path}/${newUpLoadRes.Data}`
							console.log(picurl)
							let upLoadData = {
								picurl,
								picsort:2,
								spicurl:'',
								userid:this.userInfo_.ID,
								pictitle:`${this.userInfo_.ID}—${this.addInfo.BankName}-pic`,
								picdesc:`${this.userInfo_.ID}—${this.addInfo.BankName}-pic`,
								piccontent:`${this.userInfo_.ID}—${this.addInfo.BankName}-pic`,
								lan:this.lan_
							}
							let [addErr,addRes] = await this.$Request_.get(this.$allUrl.addpic,upLoadData)
							if(addRes!=null){
								if(addRes.IsSuccess){
									let getData = {
										...this.addInfo,
										userid:this.userInfo_.ID,
										lan:this.lan_,
										PicID:addRes.Data
									}
									
									let [err,res] = await this.$Request_.get(this.$allUrl.addYNBbank,getData)
									this.isLoading = false
									if(res!=null){
										if(res.IsSuccess){
											this.getBankList()
										}else{
											this.$api.msg(res.Msg)
										}
									}
								}
							}
							
						}
					}
				}
				
				
				
			},
			closePop(){
				this.$nextTick(()=>{
					this.$refs.inputSumbit.close()
				})
			},
		     async	getBankList(){
				 this.$nextTick(async () => {
				 	this.isLoading = true
				 	let [err,res] = await this.$Request_.get(this.$allUrl.banklist,{
				 		userid:this.userInfo_.ID,
				 		lan:this.lan_
				 	}) 
				 	 this.isLoading = false
				 	if(res!=null){
				 		if(res.IsSuccess){
				 			this.pays = res.Data.map(it=>{
				 				it.PicsOther = it.Pics
				 				let PicsOtherList = it.PicsOther.map(it=>{
				 					return it.PicUrl
				 				})   
				 				
				 				it.Pics = PicsOtherList
				 				return it
				 			})
				 		}
				 	}
				 })
			 },
			async DelImg(list,index,notCanPlay) {//删除选择的照片
				if(notCanPlay){
					this.$api.msg('请点击修改按钮')
					return
				}
				let data={
					title:this.$t('尊敬的用户'),
					content:this.$t('确定要删除上传附件吗？'),
					cancelText: this.$t('取消'),
					confirmText: this.$t('确定')
				}
				let res=  await this.$api.showModal(data)
				if(res){
					list.splice(index, 1)
				}
			},
			ViewImage(urls,url) {//
				uni.previewImage({
					urls,
					current:url
				})
			},
			async addImage(list,num = 1,notCanPlay){
				if(list.length<num){
					if(notCanPlay){
						this.$api.msg('请点击修改按钮')
						return
					}
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['compressed','original'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera'], //从相册选择
						success:async (res) => {
							// #ifdef APP-PLUS || H5 || MP-WEIXIN
							for(let it of res.tempFiles){
								let localPath =it.path	
								list.push(localPath)	
							}
							// #endif
						}
					});
				}
			},
			addPay(){
				this.$nextTick(()=>{
					// console.log('?')
					this.addInfo = {
						BankName:'',
						BankAddress:'',
						BankNo:'',
						PicID:''
					}
					this.usdeFuJianList = []
					if(this.isFirst){
						this.addInfo.BankName = 'USDT'
					}
					this.$refs.inputSumbit.open()
				})
			},
		}
	}
</script>
<style>
	
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
	.addBtn{
		width: 120rpx;
		height: 120rpx;
		border: 2rpx solid rgba(227, 202, 73, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
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
	.addContent{
		margin-bottom: 30rpx;
		border-radius: 10rpx;
		padding:60rpx;
	}
</style>
