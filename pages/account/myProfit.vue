<template>
	<view>
		<view style="padding: 60rpx;">
			<view class="form-header_">
				<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
				<text class="margin-left-sm">{{$t('我的收益')}}</text>
			</view>
			<view class="margin-top">
				<u-row gutter="16">
					<u-col span="6" v-for="(item,index) in munList" :key="index" @click="goToDetail(item)">
						<view class="lists">
							<u-image width="100rpx" height="100rpx" src="/static/user/jinbi.png" style="margin: 0 auto;margin-bottom: 15rpx;"></u-image>
							<text class="words">{{$t(item.title)}}</text>
							<view class="words">
								<text class="margin-left text-bold">
									{{item.num}}
								</text>
								<text class="text-yellow margin-xs text-zhuti">
									{{item.danwei}}
								</text>
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		
		<load-line  :isLoading="loadingInfo.isLoading"></load-line>
	</view>
</template>

<script>
	export default{
		onShow() {
			this.$Route.routeBefore(this)
			this.getCurryInfo()
		},
		data(){
			return {
				loadingInfo: {
					circleColor: 'rgb(255,255,255)',
					isLoading: false
				},
				munList:[
					{
						title:'锁仓收益',
						url:this.$allUrl.userlocklist,
						num:'0',
						danwei:'YNB',
						sortType:1
					},
					{
						title:'推荐收益',
						url:this.$allUrl.tjsylist,
						num:'0',
						danwei:'YNB',
						sortType:0
					},
					{
						title:'团队收益',
						url:this.$allUrl.tdsylist,
						num:'0',
						danwei:'YNB',
						sortType:0
					},
				]
			}
		},
		methods:{
			async getCurryInfo(){
				this.$nextTick(async ()=>{
					this.loadingInfo.isLoading = true
					let getData = {
						userid:this.userInfo_.ID,
						page:1,
						pagesize:10
					}
					for(let index = 0 ; index < this.munList.length ; index++){
						let item = this.munList[index]
						let [err,res] = await this.$Request_.get(item.url,getData)
						if(res!=null){
							if(res.IsSuccess){
								this.munList[index].num = res.Total
							}
						}
					}
					this.loadingInfo.isLoading = false
				})
			},
			goToDetail(item){
				// console.log(item.sortType)
				this.$Route.navigateTo('/pages/account/profitDetail',{
					url:item.url,
					title:item.title,
					sortType:item.sortType
				},true)
			}
		}
	}
</script>

<style >
	
</style>

<style scoped>
	.munItem{
		margin: 50rpx 30rpx;
		background:rgba(39, 39, 39, 1.0);
		border-radius: 20rpx;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
	}
	.lists{
		background: linear-gradient(275deg, rgba(45, 45, 53, 0.1) 0%, #505058 100%);
		margin: 30rpx 20rpx;
		padding: 20rpx;
		border-radius: 30rpx;
		height: 300rpx;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.words{
		margin: 10rpx 0rpx;
	}
	.recharge{
		margin-top: 50rpx;
		background-image: url(../../static/index/tixian_bg.png);
		background-size:contain;
		background-repeat:no-repeat;
		text-align: center;
		color: #77562B;
		line-height: 100rpx;
		font-weight: bold;
		height: 200rpx;
	}
</style>
