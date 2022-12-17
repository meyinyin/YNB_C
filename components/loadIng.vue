<template>	
		<view  class="bg-white flex  align-center flex-direction hiddenPage showPage"  @touchmove.stop="touchmoveTapStop" @tap.stop="touchmoveTapStop">
			
			<w-loading text="加载中.." mask="true" :click="true" ref="loading" :loadingType="1"></w-loading>
			<!-- <view class="flex justify-between" style="margin-top:500rpx;">
				<view v-for="(item,i) of 4" :key="i" class="loadingItem "  :class="['animation'+i]">
					
				</view>
			</view>
			
			
			<view class="margin-bottom-sm " style="margin-top:80rpx;">
				<text class="text-lg">
					正在加载中...
				</text>
				
			</view> -->
			<!-- <view class="cu-progress round  striped " :class="true?'active':''" style="height:30upx;width:30%;"> 
				<view class="bg-ygRed" style="width: 100%;"></view>
			</view> -->
		</view>
</template>

<script>
	export default{
		mounted() {
			this.$refs.loading.open()
			// this.$nextTick(async ()=>{
				
			// })
		},
		props:{
		},
		methods:{
			touchmoveTapStop(){
				
			}
		}
	}
</script>

<style scoped>
	.hiddenPage{
		width: 0px;
		height: 0px;
		transition: all 0.5s;
	}
	.showPage{
		width: 100vw;
		height:100vh;
		/* opacity: 0.9; */
		background: white;
	}
	
	.loadingItem{
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		margin-left: 50upx;
		margin-right: 50upx;
		background:rgba(220,220,220);
		position: relative;
	}
	.animation0{
		animation: move 0.5s infinite;
	}
	
	.animation1{
		animation: move 1s infinite;
	}
	.animation2{
		animation: move 1.5s infinite;
	}
	.animation3{
		animation: move 2s infinite;
	}
	
	.animation4{
		animation: move 2.5s infinite;
	}
	@keyframes move{
		0%{
			bottom: 0rpx;
			transform: scale(1.1);
		}
		10%{
			bottom: 10rpx;
			transform: scale(1.1);
		}
		20%{
			bottom: 20rpx;
			transform: scale(1.2);
		}
		30%{
			bottom: 30rpx;
			transform: scale(1.3);
		}
		40%{
			bottom: 40rpx;
			transform: scale(1.4);
		}
		50%{
			bottom: 50rpx;
			transform: scale(1.5);
		}
		60%{
			bottom: 40rpx;
			transform: scale(1.4);
		}
		70%{
			bottom: 30rpx;
			transform: scale(1.3);
		}
		80%{
			bottom: 20rpx;
			transform: scale(1.2);
		}
		90%{
			bottom: 10rpx;
			transform: scale(1.1);
		}
		100%{
			bottom: 0rpx;
			transform: scale(1);
			background: linear-gradient(to right, #ff8361, #ff9d26);
		}
	}
</style>
