<template>
	<view class="notice-item" >
		<!-- <text class="time margin-bottom-sm"  @tap="clickBtn(2)" v-if="itemObj.AddDateTime ===null"></text> -->
		<text class="time margin-bottom-sm"  @tap="clickBtn(2)" v-if="itemObj.AddDateTime!=null">{{beTime(itemObj.AddDateTime)}}</text>
		<view class="content">
			<view class=" flex align-center justify-between">
				<view style="width: 80%;" class="text-cut">
					<text class="title " @tap="clickBtn(2)">{{itemObj.Title}}</text>
				</view>
				
				<view class="flex align-end">
					<view class="text-df text-red">
						￥
					</view>
					<view class="text-lg text-red text-bold">
						{{itemObj.SalePrice}}
					</view>
				</view>
			</view>
			
			
			<view class="img-wrapper" @tap="clickBtn(2)">
				<image class="pic  zhanweiBgPic " :class="[showNotHaveKuCun?'notHaveKuCun':'',itemObj.IsPG?'IsPGIcon':'']"  mode="aspectFill" :src="itemObj.PicURL" ></image>
				
				<!-- <image class="pic" mode="aspectFill" :src="item.PicUrl.split(',')[0]===''?'https://img.91goodluck.com/zhanweiPic.jpg':item.PicUrl.split(',')[0]"></image> -->
				
				<!-- <view class="cover" v-if="showMolde(item.RWEndDate)">
					活动结束
				</view> -->
			</view>
			<text class="introduce" @tap="clickBtn(2)">
			 {{itemObj.Title2}}
			</text>
			
			
			<view class="padding-tb-sm" style="border-top:2rpx solid rgba(220, 220, 220, 0.8);">
				<view class="padding-tb-xs align-center flex justify-between">
					<view class="flex">
						<view>
							<text class="text-gray">查看详情</text>
						</view>
						
					</view>
					
					
					
					<view class="flex align-center ">
						<!-- <text class="cuIcon-roundright" style="color: gray;font-size:40rpx;"></text> -->
						<view  class="ReturnScores    margin-left-sm" :style="{'border-color':itemObj.IsPG?'red':'#F37B1D'}"  v-if="itemObj.ReturnScores!=null && itemObj.ReturnScores*1!=0">
							<view class="ReturnScores_left" :style="{'background':itemObj.IsPG?'red':'#F37B1D'}">
								<text  style="line-height:40rpx" class="text-sm text-white">{{itemObj.IsPG?'围观赚':'分享赚'}}</text>
							</view>
							<view class="ReturnScores_right" :style="{'color':itemObj.IsPG?'red':'#F37B1D'}">
								<text style="line-height:40rpx" class="text-sm">￥{{itemObj.ReturnScores===null?0:itemObj.ReturnScores}}</text>
							</view>
						</view>
						<view class="margin-left-sm" v-if="isHop" >
							<button @tap="setPG" class="cu-btn  sm"  :class="itemObj.IsPG?'bg-red':'bg-green'">{{itemObj.IsPG?'设置围观参数':'设为围观产品'}}</button>
						</view>
					</view>
					
				</view>
				<!-- <view class="bottom_btn leftBtn" @tap="clickBtn(0)">
					<text>售卖详情</text>
				</view>
				
				<view class="bottom_btn margin-left rigBtn" @tap="clickBtn(1)">
					<text>生成海报</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		computed:{
			showNotHaveKuCun(){
				let RestNum = this.itemObj.RestNum
				if(RestNum===0){
					return true
				}
				return false
			}
		},
		props:{
			itemObj:{
				type:Object,
				default:()=>{}
			},
			isHop:{
				type:Boolean,
				default:false
			},
			index:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			clickBtn(index){
				//0售卖详情 1生成海报 2商品详情
				this.$emit('clickBtn',[this.itemObj,index])
			},
			setPG(){
				this.$emit('setPG',[this.itemObj,this.index])
			}
		}
	}
</script>

<style lang='scss' scoped>
	.bottom_btn{
		width:150upx;
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius:100upx;
	}
	.bottom_btn:active{
		color: white;
		transition: all 0.3s;
		border-color: white;
	}
	
	.bottom_btn_sm{
		width:120upx;
		height:50upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius:10upx;
		font-size:20upx;
		border: 2upx solid #dc7354;
		color:#dc7354
	}
	.bottom_btn_sm:active{
		color: white;
		transition: all 0.3s;
		border-color: white;
	}
	
	
	
	
	
	.leftBtn{
		border:2rpx solid #ff5b2e;
	}
	.rigBtn{
		border:2rpx solid #e14aff;
	}
	
	
	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height:40upx;
		padding-top: 10upx;
		font-size: 24upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		font-weight: bold;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}
	.notHaveKuCun{
		position: relative;
	}
	.notHaveKuCun::after{
		content: '';
		width: 355rpx;
		height: 355rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.91goodluck.com/notHaveKuCun3.png');
		position: absolute;
		bottom:-100rpx;
		right: -50rpx;
		z-index: 100;
	}
	
	
	

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 24upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		font-weight: bold;
		color: #333333;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
	
	.ReturnScores{
		display:flex;
		width:180rpx;
		height:40rpx;
		border-radius:8rpx;
		border: 2rpx solid #F37B1D;
	}
	.ReturnScores_left{
		width: 90rpx;
		height: 100%;
		background: #F37B1D;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ReturnScores_right{
		width: 90rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color:#F37B1D;
	}
	.zhanweiBgPic{
		background-image: url('https://img.91goodluck.com/lazyLoadSP750_new.jpg');
		background-repeat: no-repeat;
		background-size:100% 150%;
		background-position: 0% 35%;
	}
	.IsPGIcon{
		position: relative;
	}
	.IsPGIcon::after{
		content: '';
		position: absolute;
		width: 200rpx;
		height:93rpx;
		top: 0rpx;
		right: 0rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.91goodluck.com/weiguanIcon1.png');
	}
</style>

