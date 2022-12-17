<template>
	<view  :style="[{'margin-top':`${marginTop}rpx`}]">
		<view  class="flex justify-center align-center  flex-direction" v-if="icon_Type==='img'">
			<view style="width: 350upx; height: 350upx; background: url('https://img.91goodluck.com/kongbaiyhq_03.png') no-repeat; background-size:100% 100%;"></view>
			<view class="margin-tb dfTextColor" :style="{color:text_Color}">{{contentText}}</view>
		</view>
		<view class="flex justify-center align-center  flex-direction"  v-else>
			<view style="width:240upx; height:240upx;" class="flex justify-center">
				<!-- :style="{color:text_Color}"  -->
				<text class="ygOthIcon-zanwucanyujilu item-icon" style="font-size:200rpx;">
					
				</text>
			</view>
			<view class="dfTextColor"  :style="{color:text_Color}">{{contentText}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			marginTop:{
				type:Number,
				default:100
			},
			bgc:{
				type:String,
				default:'#F7F7F7'
			},
			contentText:{
				type:String,
				default:'-- No data available --'
			},
			icon_Type:{
				type:String,
				default:'text'
			},
			text_Color:{
				type:String,
				default:'gray'
			}
		}
	}
</script>

<style>
	.dfTextColor{
		color: #999999
	}
	 .item-icon{
	     /* // color: #e54746; */
	     font-size: 52rpx;
	     background-image: linear-gradient(135deg, rgb(226, 224, 163) 0%, rgb(194, 166, 121) 67%,rgb(255, 227, 161) 100%);
	     -webkit-background-clip: text;
	     color:transparent;       
	  }
</style>
