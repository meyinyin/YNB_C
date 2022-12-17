<template>
	<view>
		<!-- 首页 -->
		<view class="u-page" v-if="pages == 1">
			<index :isOnPullDownRefresh="isOnPullDownRefresh[1]" @isOverDownRefresh="isOverDownRefresh"></index>
		</view>
		<!-- 客服 -->
		<view class="u-page" v-else-if="pages == 2">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom  backColor="text-zhuti" bgColor="bg-zhuti1" :isBack="false">
				<!-- #ifdef APP-PLUS || H5-->
					<block slot="content">{{$t('资讯列表')}}</block>
				<!-- #endif -->
			</cu-custom>	
			<!-- #endif -->
			<view v-if="infoList.length!=0">
				<view  v-for="(item,index) of infoList" :key="index" @tap="goToDeatil(item)" class="cardBg">
					<!-- v-if="item.PicURL.length===0" -->
					<view class="padding" style="border-bottom: 30rpx solid #424554;" >
						<view class="flex align-center justify-between">
							<view class="cu-tag bg-zhuti2 " style="border-radius: 10rpx;">
								<text class="margin-lr-xs " style="font-size: 24rpx;">
									{{$t('快讯')}}
								</text>
							</view>
							<view class="text-gray">
								<text class="text-sm">
									{{beTime(item.AddDateTime)}}
								</text>
							</view>
						</view>
						<view class="margin-top text-cut">
							<text class="text-xxl text-white FuturaPTLight " style="font-weight:600;">
								{{item.Title}}
							</text>
						</view>
						<view class="margin-top-sm text-zhuti text-cut_" >
							<text >
								{{item.Description}}
							</text>
						</view>
						<view class="margin-top flex justify-end">
							<text class="text-white text-sm border-bottom-zhuti" >
								{{$t('查看详情')}} >>
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="padding-bottom-xl" v-else>
				<no-content></no-content>
			</view>
			
			<view style="height: 160rpx;">
				
			</view>
		</view>
		<!-- 持仓 -->
		<view class="u-page" v-else-if="pages == 3">
			<position  :isOnReachBottom="isOnReachBottom[3]" :isOnPullDownRefresh="isOnPullDownRefresh[3]" @isOverDownRefresh="isOverDownRefresh" @isOverOnReachBottom = "isOverOnReachBottom "></position>
		</view>
		<!-- 我的 -->
		<view class="u-page" v-else="pages == 4">
			<user  :isOnPullDownRefresh="isOnPullDownRefresh[4]" @isOverDownRefresh="isOverDownRefresh"  ></user>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<tabbars :list="list" @showIndex="getShowId" ></tabbars>
		<load-line :isLoading="loadingInfo.isLoading"></load-line>
		
		
		<!-- <view style="height: 500px;width: 100%;" class="bg-red flex align-center justify-center">
			<view style="height: 400rpx;width: 400rpx;border-radius:10rpx;" class="cardBg_ flex align-center justify-center">
				<image  src="@/static/images/newYNBlog.png" style="width:301rpx;height:240rpx;" mode="scaleToFill" ></image>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	import tabbars from "@/components/tabbar.vue"
	import index from "@/components/index.vue"
	import user from "@/components/user.vue"
	import position from "@/components/position.vue"
	export default {
		components:{
			tabbars,
			index,
			user,
			position
		},
		data() {
			return {
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				infoList:[],
				list: [{
						iconPath: "/static/index_.png",
						selectedIconPath: "/static/index.png",
						text: '主页',
						id: '1'
					},
					{
						iconPath: "/static/message.png",
						selectedIconPath: "/static/message_.png",
						text: '资讯',
						id: '2'
					},
					{
						iconPath: "/static/chicang.png",
						selectedIconPath: "/static/chicang_.png",
						text: '交易',
						id: '3'
					},
					{
						iconPath: "/static/my.png",
						selectedIconPath: "/static/my_.png",
						text: '我的',
						id: '4'
					},
				],
				pages:1,
				isOnPullDownRefresh:[
					'',
					false,
					false,
					false,
					false
				],
				isOnReachBottom:[
					'',
					false,
					false,
					false,
					false
				]
			}
		},
		async onLoad() {
			await this.refshLogin()
			if(!this.hasLogin){
				this.$Route.reLaunch('/pages/login/login');
			}
		},
		methods: {
			isOverDownRefresh(overPage){
				this.$set(this.isOnPullDownRefresh,overPage,false)
				uni.stopPullDownRefresh();
			},
			isOverOnReachBottom(overPage){
				this.$set(this.isOnReachBottom,overPage,false)
			},
			getShowId(id){
				this.SwitchPages(id);
			},
			//切换页面
			SwitchPages(index){
				this.pages = index;
			},
			goToDeatil(item){
				this.$Route.navigateTo('/pages/index/eassayDetail',{
					id:null,
					detailTitle:item.Title,
					newContent:item.newContent
				},true)
			},
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
		},
		watch:{
			async pages(n){
				if(n==='2'){
					this.loadingInfo.isLoading = true
					await this.getWenZhangDetail()
					this.loadingInfo.isLoading = false
				}
			}
		},
		async onPullDownRefresh() {
			if(this.pages==='2'){
				this.loadingInfo.isLoading = true
				await this.getWenZhangDetail()
				this.loadingInfo.isLoading = false
				uni.stopPullDownRefresh();
			}else{
				let pages = this.pages*1
				this.$set(this.isOnPullDownRefresh,pages,true)
			}
		},
		async onReachBottom(){
			if(this.pages==='2'){
				
			}else{
				let pages = this.pages*1
				this.$set(this.isOnReachBottom,pages,true)
			}
		}
	}
</script>

<style lang="scss" scoped>
.text-cut_{
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
.cardBg{
	background-image: linear-gradient(45deg,rgba(114, 113, 126, 1.0),rgba(85, 84, 94, 1.0),rgba(71, 70, 79, 1.0),rgba(64, 64, 71, 1.0),rgba(80, 79, 88, 1.0),rgba(72, 72, 80, 1.0),rgba(131, 129, 144, 1.0));
}
</style>
