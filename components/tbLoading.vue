<template>
	<view>
		<loading-componet :bgc="bgc" :showLoading="showLoading" :marginTop="marginTop"></loading-componet>
		<slot></slot>
		<bottom-loading :showBottomLoading="showBottomLoading" :marginTop="bottomMarginTop" :bottomBgc="bottomBgc" :showNothing="showNothing" :bottomTextColor="bottomTextColor"></bottom-loading>
	</view>
</template>

<script>
	export default{
		props:{
			bottomTextColor:{
				type:String,
				default:'gray'
			},
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
			
			/*上边是上半部分的刷新，下边是下半部分的刷新*/
			
			
			showBottomLoading:{
				type:Boolean,
				default:false
			},
			bottomBgc:{
				type:String,
				default:'#d9d9d9'
			},
			bottomMarginTop:{
				type:Number,
				default:30
			},
			showNothing:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style>
</style>
