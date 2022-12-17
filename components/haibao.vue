<template>
	
	<view :class="showAnm ? 'animate' : ''">
		
		<!--  -->
		<view class="cu-modal padding-lr-xl " :class="showModal?'show':''" @touchmove.stop.prevent="moveHandle">
			
			<view class="cu-dialog" style="background:transparent; margin-top:0upx;">
				 
				
				<view class="flex justify-center" >
					<image :src="imgUrl" mode="aspectFit"  class="haiBaoBgi radius"   @tap="seePhoto">
						
					</image>
					
				</view>	
				
				<!-- <view class="padding-sm margin-top-sm bg-gray radius" style="text-align: left;" v-if="shareText.length!=0">
					<scroll-view scroll-y="true" style="height: 100rpx;">
						<view>
							{{shareText}}
						</view>
					</scroll-view>
					
					
					<view class="text-bold margin-top-xs text-green">
						点击下方 分享/下载按钮 即可复制上方文案
					</view>
				</view>
			 -->
				
				<view class="padding-tb-sm flex justify-between align-center">
					
					
					<button @tap="downLoadImage" style="color:white" class=" flex ygIcon-download  haibao_btn  align-center justify-center" >
					</button >
						
					<button class="flex ygIcon-weixin haibao_btn  align-center justify-center" style="color:rgb(85, 231, 146)" @tap="shareWx('friend')" open-type="share">
						
					</button>

					<!-- #ifdef APP-PLUS || H5 -->
					<button class="flex ygOthIcon-pyq   haibao_btn  align-center justify-center" style="color:rgb(2, 253, 86)"  @tap="shareWx('pyq')"></button>
					<!-- #endif -->
					

					<button class="flex ygIcon-guanbi haibao_btn  align-center justify-center" style="color:white" @tap="hideModal(-1)">
						
					</button>
					
				</view>
				
				
				
			</view>
		</view>
	</view>
</template>

<script>

	export default{
		watch:{
			showModal(n,o){
				console.log(n,o)
			}
		},
		props:{
			showModal:{//控制显示
				type:Boolean,
				default:false
			},
			imgUrl:{
				type:String,
				default:''
			},
			isshowAnm:{
				type:Boolean,
				default:false
			},
			shareText:{
				type:String,
				default:''
			}
		},
		created(){
			console.log('海报')
			// this.getEwm()
		},
		data(){
			return {
				showCanvas:false,
				showAnm:false
			}
		},
		methods: {
			fuzhiZhanTie(){
				uni.setClipboardData({
					data:this.shareText,
					complete:(e)=>{
						console.log(e)
					}
				})
			},
			shareWx_(type) {
				this.fuzhiZhanTie()
				this.shareBtnType = type
				if(this.shareBtnType==='friend'){
					console.log('分享到聊天界面')
					
					// #ifdef APP-PLUS
					this.$api.share({
						scene:'WXSceneSession',
						title:'店铺海报',
						imageUrl:this.imgUrl,
						href:'',
						type:2
					})
					// #endif
				}else if(this.shareBtnType==='pyq'){
					console.log('分享到朋友圈')
					
					this.$api.share({
						scene:'WXSenceTimeline',
						title:'店铺海报',
						imageUrl:this.imgUrl,
						href:'',
						type:2
					}).then(res=>{
						this.$api.msg('分享成功',1500,false,'success')
					})
				}
				this.$api.isRequestSubscribeMessage(this,['zJnQo8-2y37mfdn9XLKVEJZMRFYZ10sx9_MJ8E1Ds20'],false)
			},
			seePhoto(){
				uni.previewImage({
					current:0,
					urls:[this.imgUrl],
					indicator:'none',
					longPressActions:{
						itemList:[
							'保存至相册'
						],
						success:(e)=>{
							console.log(e)
							this.downLoadImage_()
						}
					}
				})
			},
			downLoadImage(){
				this.fuzhiZhanTie()
				this.downLoadImage_()
				this.$api.isRequestSubscribeMessage(this,['zJnQo8-2y37mfdn9XLKVEJZMRFYZ10sx9_MJ8E1Ds20'],false)
				// this.$emit('downLoadImage')
			},
			shareWx(type){
				this.shareWx_(type)
				// this.$emit('shareWx',type)
			},
			moveHandle(){
				
			},
			hideModal(i) {
				if (i > 0) {
					this.$emit('hidden',true)//同意
				} else {
					this.$emit('hidden',false)//取消或者点X
				}
			},
			async downLoadImage_() {
				if(this.isshowAnm){
					this.showAnm = true
				}
				this.$api.showLoading_({
					title: '正在下载中'
				})
				let [err,res] = await uni.downloadFile({
					url:this.imgUrl,
				})
				if(err){
					this.$api.hidLoading_()
					this.$api.msg('下载失败，请稍后再试',2000)
				}else{
					console.log(res)
					let filePath = res.tempFilePath
					console.log(filePath)
					try{
						let [rej,res] = await uni.saveImageToPhotosAlbum({filePath})
						console.log(rej,res)
						this.$api.hidLoading_()
						this.$api.msg('保存成功',1500,false,'success')
						setTimeout(() => {
							// #ifdef APP-PLUS
								console.log('app显示存储位置')
								this.$api.msgText(`用过:图片保存在:${filePath}`,1500,false,'bottom')
							// #endif
							this.showAnm = false
						}, 1500)
					}catch(e){
						//TODO handle the exception
						setTimeout(() => {
							this.showAnm = false
						}, 1500)
					}
					setTimeout(() => {
						this.showAnm = false
					}, 1500)
				}
			},
		},
		onShareAppMessage(e){
			console.log(e)
		}
	}
</script>

<style scoped lang="scss">
	.haiBaoBgi{
		width:1000upx;
		height:1100upx;
		// background-image: url('https://img.91goodluck.com/kangg.jpg');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	
	
	.cu-modal.show {
		opacity: 1;
		transition-duration: 0.2s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
		z-index: 10000;
	}
	

	

	.haibao_btn{
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		border:2upx solid transparent;
		font-size:60upx;
		background:rgba(39,34,40,0.5)
	}
	
	
	.animate {
		animation: fadeIn 0.5s 1;
	}
</style>
