<template>
	<!-- 优惠券组件 -->
	<view>
		
		<!-- 商家版 -->
		<view class="tui-coupon-item tui-top20" :class="[showOverClass.isOver?showOverClass.type==='guoqi'?'guoqi':showOverClass.type==='weikaishi'?'':'':'']" v-if="type==='shop'">
			
			<image src="https://www.thorui.cn/wx/static/images/mall/coupon/bg_coupon_3x.png" class="tui-coupon-bg" mode="widthFix"></image>
			 
			
			<view class="tui-coupon-item-left">
				<view class="tui-coupon-price-box" :class="{'tui-color-grey':showOverClass.isOver}">				
					<view class="tui-coupon-price-sign">￥</view>	
					<view class="tui-coupon-price">{{infoObj.Num2}}</view>
				</view>
				<view class="tui-coupon-intro">满{{infoObj.Num1}}元可用</view>
			</view>
			
			
			<view class="tui-coupon-item-right">
				<view class="tui-coupon-content">
					<view class="tui-coupon-title-box">
					
						<view class="tui-coupon-btn" :class="{'tui-bg-grey':showOverClass.isOver}">{{couponType}}</view>
						
						<view class="tui-coupon-title">
							该店可用
							<text v-if="infoObj.Sort===1 || infoObj.Sort===2" class="margin-left-sm text-sm">
								{{infoObj.Sort===1?'奖品券':'指定券'}}
							</text>
						</view>
					</view>
					<view class="tui-coupon-rule">
						<view class="tui-rule-box tui-padding-btm">
							<view class="tui-coupon-circle"></view>
							<view class="tui-coupon-text">不可叠加使用</view>
						</view>
						<view class="tui-rule-box">
							<view class="tui-coupon-circle"></view>
							<view class="tui-coupon-text">{{startTime}}至{{endTime}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="tui-btn-box" v-if="showBtn">
				<!-- <view class="btn" v-if="showLingqu" @tap="couponBtn('lingqu')">
					<text class="text-sm">
						立即领取
					</text>
				</view> -->
				
				<view class="margin-top" v-if="showLingqu">
					<tui-button type="danger" width="130rpx" height="52rpx" :size="24" shape="circle" @click="couponBtn('lingqu')">
						立即领取
					</tui-button>
				</view>
				
				
				<view class="margin-top" v-if="showSeeDetail">
					<tui-button type="danger" width="130rpx" height="52rpx" :size="24" shape="circle" @click="couponBtn('seeDetail')">
						查看详情
					</tui-button>
				</view>
				
				<!-- <view class="btn margin-top-sm" v-if="showTuiGuang" @tap="couponBtn('tuiguang')">
					<text class="text-sm">
						推广海报
					</text>
				</view> -->
				
			</view>
		</view>
		
		
		
		<!-- 个人版 -->
		<view class="tui-coupon-item tui-top20" :class="[showOverClass.isOver?showOverClass.type:'']" v-if="type==='person'">
			
			<image src="https://www.thorui.cn/wx/static/images/mall/coupon/bg_coupon_3x.png" class="tui-coupon-bg" mode="widthFix"></image>
			
			
			<view class="tui-coupon-item-left">
				<view class="tui-coupon-price-box" :class="{'tui-color-grey':showOverClass.isOver}">				
					<view class="tui-coupon-price-sign">￥</view>	
					<view class="tui-coupon-price">{{infoObj.Num2}}</view>
				</view>
				<view class="tui-coupon-intro">满{{infoObj.Num1}}元可用</view>
			</view>
			
			
			<view class="tui-coupon-item-right">
				<view class="tui-coupon-content">
					<view class="tui-coupon-title-box">
					
						<view class="tui-coupon-btn" :class="{'tui-bg-grey':showOverClass.isOver}">{{couponType}}</view>
						
						<view class="tui-coupon-title">{{infoObj.StoreName}}</view>
					</view>
					<view class="tui-coupon-rule">
						<view class="tui-rule-box tui-padding-btm">
							<view class="tui-coupon-circle"></view>
							<view class="tui-coupon-text">不可叠加使用</view>
						</view>
						<view class="tui-rule-box">
							<view class="tui-coupon-circle"></view>
							<view class="tui-coupon-text">{{startTime}}至{{endTime}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="tui-btn-box" v-if="showBtn">
				<view v-if="showLingqu">
					<tui-button type="danger" width="130rpx" height="52rpx" :size="24" shape="circle" @click="couponBtn('lingqu')">
						立即领取
					</tui-button>
				</view>
				
				<view class="margin-top-sm" v-if="showTuiGuang">
					<tui-button type="danger" width="130rpx" height="52rpx" :size="24" shape="circle" @click="couponBtn('usered')">
						去使用
					</tui-button>
				</view>
			</view>
			<view class="tui-btn-box" v-if="isall===4">
				<view>
					<text class="text-sm text-orange">{{startTime}}</text>
				</view>
				<view class="margin-top-xs">
					<text class="text-sm text-orange">零点后使用</text>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		created(){
			// console.log(this.isall)
		},
		props:{
			infoObj:{
				type:Object,
				default:()=>{}
			},
			showLingqu:{
				type:Boolean,
				default:true
			},
			showTuiGuang:{
				type:Boolean,
				default:true
			},
			type:{
				type:String,
				default:'shop'
			},
			isall:{
				type:Number,
				default:1
			},
			showSeeDetail:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			couponBtn(type){
				if(type==='usered'){
					console.log(this.infoObj)
					let CouponsSort = this.infoObj.CouponsSort
					
					if(CouponsSort===1){//单品
						let isRoute = this.infoObj.IsRoute
						let id = this.infoObj.StoreID
						if(isRoute){
							let RouteUrl = this.infoObj.RouteUrl
							if(RouteUrl.length!=0){
								this.$Route.navigateTo(RouteUrl,{
									id
								})
							}else{
								this.$Route.navigateTo('/pages/ShopDetail/newShopDetail/shopDetail2',{
									id
								})
							}
						}else{
							this.$Route.navigateTo('/pages/ShopDetail/newShopDetail/sort_list',{
								id
							})
						}
					}else{
						this.$emit('couPonUserTap',{
							CouponsSort,
							infoObj:this.infoObj
						})
					}
				}else{
					this.$emit('couponBtn',{
						type,
						infoObj:this.infoObj
					})
				}
				
			},
			// isTime(time){
			// 	return this.beTime_(time)
			// },
		},
		computed:{
			couponType(){
				let CouponsSort = this.infoObj.CouponsSort
				let text = ''
				if(CouponsSort===0){
					text = '通用券'
				}
				if(CouponsSort===1){
					text = '单品券'
				}
				if(CouponsSort===2){
					text = '到店付'
				}
				if(CouponsSort===3){
					text = '商城券'
				}
				if(CouponsSort===4){
					text = '外卖券'
				}
				return text
			},
			startTime(){
				// let type = this.type
				
				return this.beTime_(this.infoObj.BDate)
				
				// if(type==='shop'){
				// 	return this.beTime_(this.infoObj.BDate)
				// }
				// if(type==='person'){
				// 	return this.beTime_(this.infoObj.AddDate)
				// }
			},
			endTime(){
				return this.beTime_(this.infoObj.EDate)
				
				// let type = this.type
				// if(type==='shop'){
				// 	return this.beTime_(this.infoObj.EDate)
				// }
				// if(type==='person'){
				// 	return this.beTime_(this.infoObj.DQDate)
				// }
			},
			showBtn(){
				let type = this.type
				if(type==='shop'){
					console.log(this.isall)
					// if(this.isall === 2){//未生效
					// 	return false
					// }
				}
				if(type==='person'){
					if(this.isall === 3){//已使用
						return false
					}
					
					if(this.isall === 2){//过期
						return false
					}
					
					if(this.isall === 4){//失效
						return false
					}
				}
				return true
			},
			showOverClass(){
				let type = this.type
				if(type==='shop'){
					if(this.isall === 2){//未生效
						return {
							isOver:true,
							type:'weikaishi'
						}
					}
				}
				if(type==='person'){
					
					console.log(this.isall)
					
					if(this.isall === 3){//已使用
						return {
							isOver:true,
							type:'shiyong'
						}
					}
					
					if(this.isall === 2){//过期
						return {
							isOver:true,
							type:'guoqi'
						}
					}
					
					// if(this.isall === 4){
					// 	return {
					// 		isOver:true,
					// 		type:'weikaishi'
					// 	}
					// }
				}
				return {
					isOver:false
				}
			}
		}
	}
</script>

<style scoped>
	.guoqi{
		position: relative;
	}
	.guoqi::after{
		content:'';
		position: absolute;
		width:110rpx;
		height: 110rpx;
		background-image: url('https://img.91goodluck.com/ySx.png');
		background-size:100% 100%;
		background-repeat: no-repeat;
		z-index:100;
		right:25rpx;
		top:-20rpx
	}
	.shiyong{
		position: relative;
	}
	.shiyong::after{
		content:'';
		position: absolute;
		width:110rpx;
		height: 110rpx;
		background-image: url('https://img.91goodluck.com/ySy.png');
		background-size:100% 100%;
		background-repeat: no-repeat;
		z-index:100;
		right:25rpx;
		top:-20rpx
		
	}
	
	.weikaishi{
		position: relative;
	}
	.weikaishi::after{
		content:'未生效';
		position: absolute;
		color: gray;
		/* width:50rpx;
		height: 50rpx; */
		/* background-image: url('https://img.91goodluck.com/ySx.png'); */
		/* background-size:100% 100%;
		background-repeat: no-repeat; */
		padding: 10rpx 30rpx;
		text-align: center;
		z-index:100;
		right:-10rpx;
		top:15rpx;
		border:2rpx solid gray;
		border-radius: 10rpx;
		transform: rotate(-45deg);
	}
	
	.yLingQu{
		position: relative;
	}
	.yLingQu::after{
		content:'';
		position: absolute;
		width:110rpx;
		height: 110rpx;
		background-image: url('https://img.91goodluck.com/yLq.png');
		background-size:100% 100%;
		background-repeat: no-repeat;
		z-index:100;
		right:25rpx;
		top:-20rpx
	}
	
	
	
	/* .guoqiTitle{
		position: absolute;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		border:4upx solid white
	}
	.guoqiTitle view{
		font-size: 110rpx;
		color: white;
		font-weight: 1000;
	} */
	
	
	
	.btn{
		width: 130upx;
		height:50upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius:10upx;
		border: 2upx solid #ff5b2e;
		color: #ff5b2e;
	}
	.btn:active{
		background: #ff5b2e;
		color: white;
	}
</style>
<style>

	.tui-coupon-item {
		width: 100%;
		height: 210rpx;
		position: relative;
		display: flex;
		align-items: center;
		padding-right: 30rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-coupon-bg {
		width: 100%;
		height: 210rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.tui-coupon-sign {
		height: 110rpx;
		width: 110rpx;
		position: absolute;
		z-index: 9;
		top: -30rpx;
		right: 40rpx;
	}

	.tui-coupon-item-left {
		width: 218rpx;
		height: 210rpx;
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-shrink: 0;
	}

	.tui-coupon-price-box {
		display: flex;
		color: #e41f19;
		align-items: flex-end;
	}

	.tui-coupon-price-sign {
		font-size: 30rpx;
	}

	.tui-coupon-price {
		font-size: 70rpx;
		line-height: 68rpx;
		font-weight: bold;
	}

	.tui-price-small {
		font-size: 58rpx !important;
		line-height: 56rpx !important;
	}


	.tui-coupon-intro {
		background: #F7F7F7;
		padding: 8rpx 10rpx;
		font-size: 26rpx;
		line-height: 26rpx;
		font-weight: 400;
		color: #666;
		margin-top: 18rpx;
	}

	.tui-coupon-item-right {
		flex: 1;
		height: 210rpx;
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 24rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-coupon-content {
		width: 82%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tui-coupon-title-box {
		display: flex;
		align-items: center;
	}

	.tui-coupon-btn {
		padding: 6rpx;
		background: #FFEBEB;
		color: #e41f19;
		font-size: 25rpx;
		line-height: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: scale(0.9);
		transform-origin: 0 center;
		border-radius: 4rpx;
		flex-shrink: 0;
	}

	.tui-color-grey {
		color: #888 !important;
	}

	.tui-bg-grey {
		background: #F0F0F0 !important;
		color: #888 !important;
	}

	.tui-coupon-title {
		width: 100%;
		font-size: 26rpx;
		color: #333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-coupon-rule {
		padding-top: 52rpx;
	}

	.tui-rule-box {
		display: flex;
		align-items: center;
		transform: scale(0.8);
		transform-origin: 0 100%;
	}

	.tui-padding-btm {
		padding-bottom: 6rpx;
	}

	.tui-coupon-circle {
		width: 8rpx;
		height: 8rpx;
		background: rgb(160, 160, 160);
		border-radius: 50%;
	}

	.tui-coupon-text {
		font-size: 28rpx;
		line-height: 28rpx;
		font-weight: 400;
		color: #666;
		padding-left: 8rpx;
		white-space: nowrap;
	}

	/* .tui-top20 {
		margin-top: 20rpx;
	} */

	.tui-coupon-title {
		font-size: 28rpx;
		line-height: 28rpx;
	}


	.tui-coupon-radio {
		transform: scale(0.7);
		transform-origin: 100% center;
	}

	.tui-btn-box {
		position: absolute;
		width: 146rpx;
		height:110upx;
		right:8rpx;
		bottom: 40rpx;
		z-index: 10;
	}

	/* #ifdef APP-PLUS || MP */
	.wx-radio-input {
		margin-right: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-radio .uni-radio-input {
		margin-right: 0 !important;
	}

	/* #endif */
</style>
