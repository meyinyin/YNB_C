<template>
	<view>
		<view>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom  backColor="text-yellow" bgColor="bg-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
					<block slot="content">{{$t('资讯列表')}}</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
					<block slot="backText">{{$t('资讯列表')}}</block>
				<!-- #endif -->
			</cu-custom>	
			<!-- #endif -->
		</view>
		<view v-if="infoList.length!=0">
			<view  v-for="(item,index) of infoList" :key="index" @tap="goToDeatil(item)">
				<!-- v-if="item.PicURL.length===0" -->
				<view class="padding" style="border-bottom: 20rpx solid rgba(180,180,180,0.4);" >
					<view class="flex align-center justify-between">
						<view class="cu-tag bg-orange round">
							<text class="margin-lr-xs" style="font-size: 24rpx;">
								{{$t('快讯')}}
							</text>
						</view>
						<view class="text-gray">
							<text class="text-sm">
								{{beTime_(item.AddDateTime)}}
							</text>
						</view>
					</view>
					<view class="margin-top text-cut">
						<text class="text-xxl text-grey  FuturaPTLight " style="font-weight:600;">
							{{item.Title}}
						</text>
					</view>
					<view class="margin-top-sm text-cut_" >
						<text >
							{{item.Description}}
						</text>
					</view>
					<view class="margin-top">
						<text class="text-blue text-sm">
							{{$t('查看详情')}} >
						</text>
					</view>
				</view>
				<!-- <view v-else class="flex padding flex" style="border-bottom: 2rpx solid rgba(180,180,180,0.5);" >
					<view class="pic" :style="{'background-image':`${url(item.PicURL)}`}">
						
					</view>
					<view class="margin-left-sm" style="width: 90%;">
						<view class="text-cut" >
							<text class="text-bold">
								{{item.Title}}
							</text>
						</view>
						<view class="margin-top-xs text-cut" style="width:90%;">
							<text >
								{{item.Description}}
							</text>
						</view>
						<view class="margin-top-xs">
							<text class="text-gray text-sm">
								{{beTime_(item.AddDateTime)}}
							</text>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<view class="padding-bottom-xl" v-else>
			<no-content></no-content>
		</view>
		<load-line v-if="loadingInfo.isLoading" :circleColor="loadingInfo.circleColor" :isLoading="loadingInfo.isLoading"></load-line>
	</view>
</template>

<script>
	export default{
		async onLoad() {
			this.loadingInfo.isLoading = true
			await this.getWenZhangDetail()
			this.loadingInfo.isLoading = false
		},
		data(){
			return {
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				infoList:[]
			}
		},
		methods:{
			async getWenZhangDetail(sortid){
				let [err,res] = await this.$Request_.get(this.$allUrl.alllist,{
					sortid:2009,
					lan:this.lan_
				})
				if(res!=null){
					if(res.IsSuccess){
						let list = res.Data
						if(list.length!=0){
							this.infoList = list.map(it=>{
								let Content = it.Content
								let  richtext = Content //取出富文本字符串
								const regex = new RegExp('<img', 'gi'); //找到找对img标签
								richtext = richtext.replace(regex, `<img style="max-width:100%;height:auto;display:block;margin-left:auto;margin-right:auto"`) //正则替换
								it.newContent = richtext
								return it
							})
						}else{
							this.infoList = []
						}
					}
				}
			},
			goToDeatil(item){
				console.log(item)
				this.$Route.navigateTo('/pages/index/eassayDetail',{
					id:null,
					detailTitle:item.Title,
					newContent:item.newContent
				},true)
			}
		},
		async onPullDownRefresh() {
			this.loadingInfo.isLoading = true
			await this.getWenZhangDetail()
			this.loadingInfo.isLoading = false
			uni.stopPullDownRefresh();
		},
	}
</script>

<style scoped>
	.pic{
		flex-shrink: 0;
		width: 120rpx;
		height: 120rpx;
		background: red;
		border-radius: 10rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.text-cut_{
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
