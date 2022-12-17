<template>
	<view>
		<!-- {background:bottomBgc} -->
		<view class="allLoding flex align-center justify-center" :class="[showBottomLoading_?'allLoding':'allLoadingHidden']" :style="[{'margin-top':marginTop+'rpx'}]" v-if="!showNothing">
			 <view class="xiantiao ygOthIcon-jiazailittle-copy"  :style="{color:bottomTextColor==='gray'?'':bottomTextColor}"  style="font-size:50rpx;">
			 </view>
			 <view class="margin-left-xs text-df text-gary" :style="{color:bottomTextColor}">
				 正在加载中...
			 </view>
		</view>
		<view class="flex align-center justify-center padding-sm" :style="[{'margin-top':marginTop+'rpx'}]"  v-if="showNothing && showBottomLoading_">
			<view class=" text-df text-gary" :style="{color:bottomTextColor}">
				--  没有更多内容了 --
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		created(){
			
		},
		data(){
			return {
				showBottomLoading_:false,
				clearTimeoutID:0
			}
		},
		props:{
			bottomTextColor:{
				type:String,
				default:'gray'
			},
			showBottomLoading:{
				type:Boolean,
				default:false
			},
			bottomBgc:{
				type:String,
				default:'#c5c5c5'
			},
			marginTop:{
				type:Number,
				default:30
			},
			showNothing:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			showBottomLoading(n,o){
				console.log(n,o)
				if(n){
					if(this.clearTimeoutID!=0){
						clearTimeout(this.clearTimeoutID)
					}
					this.showBottomLoading_ = true
				}else{
					this.clearTimeoutID = setTimeout(()=>{
						this.showBottomLoading_ = false
					},100)
				}
			}
		}
	}
</script>

<style scoped>
	.allLoding{
		/* padding-bottom: 20rpx; */
		position: sticky;
		bottom: 0rpx;
		height: 80rpx;
		width: 100%;
		z-index: 10000;
	}
	.allLoadingHidden{
		margin-top: 0rpx;
		padding-bottom: 0rpx;
		width: 0rpx;
		height:0rpx;
		margin-top: 0rpx;
		overflow: hidden;
		transition:  height 0.5s;
	}
	.xiantiao{
	    color:rgb(0, 0, 0);
	    /* height: 2px;
	    background: white;
	    width: 20%; */
	    animation: zhuanquan 0.7s ease infinite;
	    animation-delay:0.2s;
	}
	
	
	
	@keyframes zhuanquan {
	    0%{
	        color: rgba(0,0,0,0);
	        transform: rotate(0deg);
	    }
		10%{
		    color: rgba(0,0,0,0.3);
		    transform: rotate(36deg);
		}
		20%{
		    color: rgba(0,0,0,0.6);
		    transform: rotate(72deg);
		}
		30%{
		    color: rgba(0,0,0,0.7);
		    transform: rotate(108deg);
		}
		40%{
		    color: rgba(0,0,0,0.8);
		    transform: rotate(144deg);
		}
		50%{
		    color: rgba(0,0,0,1);
		    transform: rotate(180deg);
		}
		60%{
		    color: rgba(0,0,0,0.8);
		    transform: rotate(216deg);
		}
		70%{
		    color: rgba(0,0,0,0.7);
		    transform: rotate(252deg);
		}
		80%{
		    color: rgba(0,0,0,0.6);
		    transform: rotate(288deg);
		}
		90%{
		    color:rgba(0,0,0,0.3);
		    transform: rotate(324deg);
		}
	    100%{
	        color:rgba(0,0,0,0);
	        transform: rotate(360deg);
	    }
	}
	
	
	
</style>
