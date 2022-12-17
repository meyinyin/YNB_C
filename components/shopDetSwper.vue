<template>
	<view class="swiper_">
		<!--style="min-height:550upx;"  -->
		<swiper class="screen-swiper"  :style="{'min-height':minHight}"   :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="false" :circular="true" :autoplay="true" interval="3000" duration="500" :disable-touch="false" >
			<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="swiperTap(index)">
				<image   class="swiper-bgi" :src="item" mode="aspectFill" :lazy-load="lazyLoad" :class="needMask?'mengcceng':''"></image>					
			</swiper-item>
		</swiper> 
	</view>
</template>

<script>
	export default{
		props:{
			swiperList:{
				type:Array,
				default:()=>[]
			},
			needMask:{
				type:Boolean,
				default:true
			},
			propMinHight:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				dotStyle:true,
				lazyLoad:true
			}
		},
		methods:{
			swiperTap(index){
				this.$emit('swiperTap',index)
			}
		},
		computed:{
			minHight(){
				if(this.propMinHight!=0){
					return `${this.propMinHight}rpx`
				}else{
					return '550rpx'
				}
			}
		}
	}
</script>
<style scoped>
	.mengcceng{
		position: relative;
	}
	.mengcceng::after{
		content: '';
		position: absolute;
		left: 0upx;
		right: 0upx;
		top: 0upx;
		bottom: 0upx;
		background-color:rgba(110,110,110,0.5);
	}
	
	.swiper-bgi{
		background-image: url('https://img.91goodluck.com/lazyLoadSP500_new.jpg');
		background-repeat: no-repeat;
		background-size:100% 120%;
		background-position: 0% 30%;
	}
</style>

