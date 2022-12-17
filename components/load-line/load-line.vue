<template>
	<view>
		<w-loading ref="wLoading"></w-loading>
	</view>
</template>

<script>
	import wLoading from '@/components/w-loading/w-loading.vue'
	export default{
		components:{
			wLoading
		},
		props:{
			isLoading:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				timeOutID:0,
				
			}
		},
		watch:{
			isLoading(n,o){
				console.log(n)
				if(n){
					this.$nextTick(()=>{
						this.timeOutID = setTimeout(()=>{
							this.$refs.wLoading.open()
						},100)
					})
				}else{
					clearTimeout(this.timeOutID)
					this.$nextTick(()=>{
						this.$refs.wLoading.close()
					})
				}
			}
		}
	}
</script>

<style scoped>
	
</style>