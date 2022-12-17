<template>
	<view>
		<view style="padding: 60rpx;">
			<view>
				<view class="flex align-center form-header_">
					<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
					<text class="margin-left-sm ">{{$t('投诉反馈详情')}}</text>
				</view>
			</view>
			<view>
				<view v-if="hasContent">
					<view class="padding-lr margin-top-sm flex align-center">
						<text class="text-zhuti">
							{{$t('反馈人')}} ：
						</text>
						<text class="margin-left-sm text-white  text-bold text-xl">
							{{pageInfo.Name}}
						</text>
					</view>
					<view class="padding-lr flex align-center margin-top-sm">
						<text class="text-zhuti">
							{{$t('时间')}} ：
						</text>
						<text class="margin-left text-bold text-white">
							{{beTime(pageInfo.AddDate)}}
						</text>
					</view>
					<view class="padding-lr flex align-center margin-top-sm">
						<text class="text-zhuti">
							{{$t('订单编号')}}  ：
						</text>
						<text class="margin-left text-bold text-white">
							{{pageInfo.Title.length===0?$t('暂无数据'):pageInfo.Title}}
						</text>
						<text v-if="pageInfo.Title.length!=0"  @tap="copy(pageInfo.Title)" class="text-white margin-left-sm cuIcon-copy" style="font-weight:1;font-size: 30rpx;">
							
						</text>
					</view>
					<view class="padding-lr margin-top-xl padding-top">
						<view class="text-bold text-xl text-zhuti">
							{{$t('内容')}} ：
						</view>
						<view class="padding-tb-sm">
							<text class="text-white">
								{{pageInfo.Content}}
							</text>
						</view>
					</view>
					<view class="padding-lr margin-top-xl padding-top" v-if="fjPicList.length!=0">
						<view class="text-bold text-zhuti text-xl">
							{{$t('附件')}} ：
						</view>
						<view class="flex align-center margin-top-sm  justify-between" style="flex-wrap: wrap;">
							<view style="margin:0rpx;border: 0rpx;" class="addBtn " v-for="(item,index) of fjPicList" :key="index">
								<image mode="aspectFill"  @tap="ViewImage(fjPicList,item)" :src="item"  style="width: 100%;height: 100%;">
									
								</image>
							</view>
						</view>
					</view>
					<view class="margin-top padding-lr" v-if="Child.length!=0">
						<view class="text-xl text-bold">
							{{$t('回复信息')}}
						</view>
						<view class="margin-top-sm" v-for="(it,i) of Child" :key="i">
							<view>
								<text class="text-bold">
									{{it.Name}} :
								</text>
							</view>
							<view class="padding-tb-sm">
								<text>
									{{it.Content}}
								</text>
							</view>
							<view class="flex align-center margin-top-sm  " style="flex-wrap: wrap;" v-if="it.fjPicList.length!=0">
								<view style="margin:0rpx;border: 0rpx;margin-right:20rpx;" class="addBtn " v-for="(jtem,index) of it.fjPicList" :key="`fujianpic_${index}`">
									<image mode="aspectFill"  @tap="ViewImage(fjPicList,jtem)" :src="jtem"  style="width: 100%;height: 100%;">
										
									</image>
								</view>
							</view>
							<view class="margin-top-sm flex align-center justify-end">
								<text class="text-sm text-gray">
									{{beTime(it.AddDate)}}
								</text>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="padding-bottom-xl">
					<no-content></no-content>
				</view>
				<view class="padding margin-top-xl flex padding-lr-xl align-center justify-center">
					<view class="tixianNew" @tap="isShowTousu = true">
						<text style="position: relative;bottom:6rpx;">
							{{$t('回复')}}
						</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<load-line :isLoading="loadingInfo.isLoading"></load-line>
		<add-fnkui v-if="hasContent" :showNo="false" :No="`${pageInfo.Title}`" :targetid="pageID" :isShow="isShowTousu" @touSuSumBit="touSuSumBit"></add-fnKui>
	</view>
</template>

<script>
	import addFnkui from '@/components/addFnKui.vue'
	// import { setClipboardData, getClipboardData } from 'uni-clipboard'
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default{
		components:{
			addFnkui
		},
		onLoad() {
			this.pageID = this.routeOption.ID
			this.getCurryInfo()
		},
		data(){
			return {
				isShowTousu:false,
				pageID:0,
				pageInfo:{},
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				hasContent:false,
				fjPicList:[],
				Child:[]
			}
		},
		methods:{
			copy(str,index){
				uniCopy({
					content: str,
					success: (res) => {
						this.$api.msg('OK',1000,true,'success')
					},
					error: (e) => {
						
					}
				})
			},
			async touSuSumBit(obj){
				let isClose = obj.isClose
				this.isShowTousu = false
				if(!isClose){
					if(obj.isOk){
						this.getCurryInfo()
					}
				}
			},
			async getCurryInfo(){
				this.$nextTick(async ()=>{
					this.loadingInfo.isLoading = true
					let [err,res] = await this.$Request_.get(this.$allUrl.msgcommentorreply,{
						userid:this.userInfo_.ID,
						msgid:this.pageID
					})
					this.loadingInfo.isLoading = false
					if(res!=null){
						if(res.IsSuccess){
							this.hasContent = true
							this.pageInfo = res.Data[0]
							if(this.pageInfo.FaceURL.length!=0){
								this.fjPicList = this.pageInfo.FaceURL.split(',')
							}
							this.Child = this.pageInfo.Child.map(it=>{
								let obj = {
									...it
								}
								let fjPicList = []
								if(it.FaceURL.length!=0){
									fjPicList = it.FaceURL.split(',')
								}
								obj.fjPicList = fjPicList
								return obj
							})
						}
					}
				})
			},
			ViewImage(urls,url) {//
				uni.previewImage({
					urls,
					current:url
				})
			},
		},
		async onPullDownRefresh() {
			this.getCurryInfo('top')
			uni.stopPullDownRefresh();
		},
	}
</script>

<style scoped>
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
</style>
