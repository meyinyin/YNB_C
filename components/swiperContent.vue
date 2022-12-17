<template>
	<view style="width: 100%;">
		<swiper style="width: 100%;" class="tab-content" :current="currentIndex" duration="300" @change="switchTab" :style="{'height':winHeight+'px'}">
			<swiper-item v-for="(item,index) in swiperNum" :key="index">
				<scroll-view scroll-y class="scoll-y">
					<loading-componet :bgc="bgc" :showLoading="showLoading"></loading-componet>
					<slot></slot>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		props:{
			currentIndex:{
				type:Number,
				default:0
			},
			swiperNum:{
				type:Number,
				default:3
			},
			showLoading:{
				type:Boolean,
				default:true
			},
			bgc:{
				type:String,
				default:'#FFFFFF'
			}
		},
		data(){
			return {
				winHeight:0
			}
		},
		async mounted(){
			console.log(this.swiperNum)
			let [err,res] = await uni.getSystemInfo()
			if(res!=null){
				let calc = res.windowHeight;
				this.winHeight = calc  - this.CustomBar
				console.log(this.winHeight)
				return true
			}
		},
		methods:{
			switchTab(e){
				let currenIndex = e.detail.current
				this.$emit('switchTab',currenIndex)
				setTimeout(()=>{
					uni.pageScrollTo({
						scrollTop:0
					})
				})
			}
		},
	}
</script>

<style scoped>
	.scoll-y {
		height: 100%;
	}
</style>
