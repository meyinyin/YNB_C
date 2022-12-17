<template>
	<view class="allLoding flex align-center justify-center" :class="[showLoading?'allLoding':'allLoadingHidden']" :style="[{'margin-top':marginTop+'rpx'},{background:bgc}]">
		 <view class="xiantiao ygOthIcon-jiazai" :class="loadingColor==='orange'?'zhuanquanOrange':loadingColor==='white'?'zhuanquanWhite':''">
		 </view>
	</view>
</template>

<script>
	export default{
		created(){
		},
		data(){
			return {
				
			}
		},
		props:{ 
			showLoading:{
				type:Boolean,
				default:true
			},
			bgc:{
				type:String,
				default:'#FFFFFF'
			},
			marginTop:{
				type:Number,
				default:0
			},
			loadingColor:{
				type:String,
				default:'orange'
			}
		}
	}
</script>

<style scoped>
	.xiantiao{
	    font-size: 40px;
	    /* height: 2px;
	    background: white;
	    width: 20%; */
		animation-delay:0.2s
	    
	}
	.allLoding{
		width: 100vw;
		height:200upx;
	}
	.allLoadingHidden{
		width: 0rpx;
		height:0rpx;
		margin-top: 0rpx;
		overflow: hidden;
		transition:  height 0.5s;
	}
	
	.zhuanquanOrange{
		animation: zhuanquanOrange 0.7s ease infinite;
	}
	 @keyframes zhuanquanOrange {
	    0%{
	        color: rgba(228,60,22,0);
	        transform: rotate(0deg);
	    }
		10%{
		    color: rgba(228,60,22,0.2);
		    transform: rotate(36deg);
		}
		20%{
		    color: rgba(228,60,22,0.4);
		    transform: rotate(72deg);
		}
		30%{
		    color: rgba(228,60,22,0.6);
		    transform: rotate(108deg);
		}
		40%{
		    color: rgba(228,60,22,0.8);
		    transform: rotate(144deg);
		}
		50%{
		    color: rgba(228,60,22,1);
		    transform: rotate(180deg);
		}
		60%{
		    color: rgba(228,60,22,0.8);
		    transform: rotate(216deg);
		}
		70%{
		    color: rgba(228,60,22,0.6);
		    transform: rotate(252deg);
		}
		80%{
		    color: rgba(228,60,22,0.4);
		    transform: rotate(288deg);
		}
		90%{
		    color:rgba(228,60,22,0.2);
		    transform: rotate(324deg);
		}
	    100%{
	        color:rgba(228,60,22,0);
	        transform: rotate(360deg);
	    }
	}
	
	
	
	
	.zhuanquanWhite{
		animation: zhuanquanWhite 0.7s ease infinite;
	}
	 @keyframes zhuanquanWhite {
	    0%{
	        color: rgba(255, 255, 255, 0);
	        transform: rotate(0deg);
	    }
		10%{
		    color: rgba(255, 255, 255,0.2);
		    transform: rotate(36deg);
		}
		20%{
		    color: rgba(255, 255, 255,0.4);
		    transform: rotate(72deg);
		}
		30%{
		    color: rgba(255, 255, 255,0.6);
		    transform: rotate(108deg);
		}
		40%{
		    color: rgba(255, 255, 255,0.8);
		    transform: rotate(144deg);
		}
		50%{
		    color: rgba(255, 255, 255,1);
		    transform: rotate(180deg);
		}
		60%{
		    color: rgba(255, 255, 255,0.8);
		    transform: rotate(216deg);
		}
		70%{
		    color: rgba(255, 255, 255,0.6);
		    transform: rotate(252deg);
		}
		80%{
		    color: rgba(255, 255, 255,0.4);
		    transform: rotate(288deg);
		}
		90%{
		    color:rgba(255, 255, 255,0.2);
		    transform: rotate(324deg);
		}
	    100%{
	        color:rgba(255, 255, 255,0);
	        transform: rotate(360deg);
	    }
	}
</style>
