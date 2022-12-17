<template>
	<view class="backBtn" :style="{top:`${top}rpx`,left:`${left}rpx`,'z-index':zIndex}" @tap="back">
		<text class="text-white" style="font-size:50rpx;position: relative;bottom:6rpx;">
			‹
		</text>
	</view>
</template>

<script>
	export default{
		props:{
			top:{
				type:Number,
				default:30
			},
			left:{
				type:Number,
				default:30
			},
			custom:{
				type:Boolean,
				default:false
			},
			zIndex:{
				type:Number,
				default:0
			}
		},
		methods:{
			back(){
				if(this.custom){
					this.$emit('backBtnTap')
				}else{
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style scoped>
	.backBtn{
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		left:30rpx;
		background:rgba(0,0,0,0.8);
		top:30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
