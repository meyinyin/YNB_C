<template>
	<view>
		<view>
			<view>
				<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
				<cu-custom  backColor="text-zhuti" bgColor="bg-zhuti1" :isBack="true">
					<!-- #ifdef APP-PLUS || H5-->
						<block slot="content">{{detailTitle}}</block>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
						<block slot="backText">{{detailTitle}}</block>
					<!-- #endif -->
				</cu-custom>	
				<!-- #endif -->
			</view>
		</view>
		
		<view >
			<view class="flex padding-top padding-lr justify-center">
				<view class="text-bold text-xl">
					{{Title}}
				</view>
			</view>
			<view style="overflow: hidden;width: 100%;" class="flex justify-center padding animate">
				<view  style="word-break: break-word;color: white;">
					<rich-text style="line-height: 1.5em;" :nodes="Content"></rich-text>
				</view>
			</view>
		</view>
		
		<load-line v-if="loadingInfo.isLoading" :circleColor="loadingInfo.circleColor" :isLoading="loadingInfo.isLoading"></load-line>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				Content: '',
				pageID: 0,
				showLoading:true,//控制加载中的flag
				isGG:false,
				isTt:false,
				Title:'',
				isHelp:false,
				detailTitle:''
			}
		},
		onLoad(option) {
			this.getDetail()
		},
		methods: {
			async getDetail(option) {
				this.pageID = this.routeOption.id
				this.detailTitle = this.routeOption.detailTitle
				if(this.pageID!=null){
					this.loadingInfo.isLoading = true
					let info = await this.getWenZhangDetail(this.pageID)
					this.loadingInfo.isLoading = false
					if(info.isOk){
						this.Content = info.content
					}
				}else{
					this.Content = this.routeOption.newContent
				}
				
				
			}
		}
	}
</script>

<style scoped>
	.animate{animation:fadeIn 1s 1;}
</style>
