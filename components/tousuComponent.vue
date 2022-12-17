<template>
	<view>
		<uni-popup type="top" ref="popComponent" :maskClick="false">
			<view class="allContent bg-zhuti1">
				<view class="flex align-center ">
					<u-icon name="arrow-left" size="40" color="#ffffff" @tap="sumBit(true)">
						 
					 </u-icon>
					<view>
						<text class="text-bold text-white text-xxl margin-left-sm">
							{{$t('提交申诉')}}
						</text>
					</view>
				</view>
				<view class="margin-top-xl">
					<view>
						<text class="text-zhuti text-bold">
							{{$t('留言')}}:
						</text>
					</view>
					<view class="padding-sm margin-top-xs lists_" style="height: 200rpx;">
						<textarea v-model="info" style="width: 100%;height: 100%;" placeholder="" />
					</view>
				</view>
				<view class="margin-top-xl">
					<view>
						<text class="text-zhuti text-bold">
							{{$t('上传附件(非必填)')}}:
						</text>
					</view>
					<view class="flex align-center margin-top" style="flex-wrap: wrap;">
						<view class="addBtn" @tap="addImage(picurl)">
							<text class="cuIcon-cameraadd text-zhuti addBtnCamer">

							</text>
						</view>
						<view class="addBtn margin-left-sm" v-for="(item,index) of picurl" :key="index">
							<text class="delBtn cuIcon-roundclosefill" @tap="DelImg(picurl,index)">

							</text>
							<image @tap="ViewImage(picurl,item)" :src="item" mode="aspectFill" style="width: 100%;height: 100%;">

							</image>
						</view>
					</view>
				</view>
				<view class="margin-top-xl padding-top flex justify-center">
					<view class="tixianNew" @tap="sumBit(false)">
						<text >
							{{$t('确定')}}
						</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<load-line v-if="loadingInfo.isLoading" :circleColor="loadingInfo.circleColor" :isLoading="loadingInfo.isLoading"></load-line>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default {
		components: {
			uniPopup
		},
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			ismj:{
				type: Boolean,
				default: true
			},
			scorelistid:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				info: '',
				picurl:[],
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
			}
		},
		watch: {
			isShow(n, o) {
				if (n) {
					this.info = ''
					this.picurl = []
					this.closeOpen('open')
				}
			}
		},
		methods: {
			async sumBit(isClose=true){
				if(isClose){
					this.closeOpen('close')
					this.$emit('touSuSumBit',{
						isClose:true
					})
				}else{
					if(this.info.length===0){
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					this.closeOpen('close')
					let picurls = []
					if(this.picurl.length!=0){
						for(let item of this.picurl){
							let [upLoadErr,upLoadRes] = await uni.uploadFile({
								url:'https://api.ynbs.xyz/api/news/upload',
								filePath:item,
								name: 'file',
								formData:{
									thumb_mode: 1,
								}
							})
							if(upLoadRes!=null){
								let  newUpLoadRes = JSON.parse(upLoadRes.data)
								if(newUpLoadRes.IsSuccess){
									let url = `${newUpLoadRes.Path}/${newUpLoadRes.Data}`
									picurls.push(url)
								}
							}
						}
					}
					picurls = picurls.join(',')
					let getData = {
						userid:this.userInfo_.ID,
						info:this.info,
						ismj:this.ismj,
						scorelistid: this.scorelistid,
						picurl:picurls,
						lan:this.lan_
					}
					this.loadingInfo.isLoading = true
					let [err,res] = await this.$Request_.get(this.$allUrl.tsscore,getData)
					this.loadingInfo.isLoading = false
					if(res!=null){
						if (res.IsSuccess) {
							this.$emit('touSuSumBit',{
								isClose:false,
								info:this.info,
								picurl:this.picurl,
								isOk:true
							})
							this.$api.msg('OK',1500,true,'success')
							return 
						}else{
							this.$api.msg(res.Msg)
						}
					}
					this.$emit('touSuSumBit',{
						isClose:false,
						info:this.info,
						picurl:this.picurl,
						isOk:false
					})
				}
			},
			closeOpen(type) {
				// #ifdef H5
				this.$nextTick(() => {
					this.$refs.popComponent[type]()
				})
				// #endif
				
				// #ifdef APP-PLUS
				this.$refs.popComponent[type]()
				// #endif
			},
			async addImage(list,num = 3,notCanPlay){
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
			async DelImg(list,index) {//删除选择的照片
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
		}
	}
</script>

<style scoped>
	.allContent {
		padding: 60rpx;
		width: 100vw;
		height: 100vh;
	}
	.addBtn{
		width: 120rpx;
		height: 120rpx;
		border: 2rpx solid rgba(204, 178, 26, 0.9);
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
</style>
