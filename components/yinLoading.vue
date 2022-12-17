<template>
	<view>
		<view class="zz" v-if="isLoading">
			
		</view>
		<load-line loadType="circle"  :circleColor="circleColor"  :isLoading="isLoading" v-if="isLoading"></load-line>
	</view>
</template>

<script>
	import LoadLine from '@/components/load-line/load-line.vue'
	export default{
		components:{
			LoadLine
		},
		props:{
			isLoading:{
				type:Boolean,
				default:false
			},
			circleColor:{//中间的颜色
				type:String,
				default:'rgb(255,178,0)'
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped>
	.zz{
		position:fixed;
		top: 0rpx;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;
		background-color: rgba(0,0,0,0.5);
	}
</style>
