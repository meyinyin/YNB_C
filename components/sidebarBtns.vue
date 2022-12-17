<template>
	<view class="fixeSidebardBtn" :class="[Sidebar]">
		<view  v-for="(item,i) of sideBtns" :key="i" class="zaiui-add margin-bottom"  @tap="sellTapEven(i)" :class="i%2===0?'animate1':'animate2'">
			<button class="cu-btn  bg-red" :class="item.iconClass" :open-type="item.openType?item.openType:''"></button>
			<view class="flex justify-center margin-top-xs">
				<view class="text-black text-xs" :style="{'color':item.labelColor?item.labelColor:''}">
					{{item.label}}
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default{
		props:{
			isLeft:{
				type:Boolean,
				default:false
			},
			sideBtns:{
				type:Array,
				default(){
					return []
				}
			}
		},
		computed:{
			Sidebar(){
				if(this.isLeft){
					return 'fixedLeft'
				}else{
					return 'fixedRight'
				}
			}
		},
		methods:{
			sellTapEven(index){
				this.$emit('sellTapEven',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fixedLeft{
		left:30rpx
	}
	.fixeSidebardBtn{
		right: 30rpx;
	}
	.fixeSidebardBtn{
		display: flex;
		position: fixed;
		flex-direction: column;
		z-index: 100000;
		bottom: 100rpx;
	}
	.zaiui-add {
		text-align: center;
		.cu-btn {
			margin: auto;
			width: 81.81rpx;
			height: 81.81rpx;
			font-weight: 800;
			border-radius: 50%;
			font-size: 49.09rpx;
			border: 9.09rpx solid #fff;
			box-shadow: 0 0 14.54rpx 7.27rpx #d0d0d0;
		}
	}
	// .fixed{
	// 	position: fixed;
	// 	right: 30rpx;
	// 	z-index: 100000;
	// }
	
	
	.animate1{animation:bounceInRight        1s 1;}
	.animate2{animation:bounceInLeft       1s 1;}
</style>
