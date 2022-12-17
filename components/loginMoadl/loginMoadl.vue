<template>
	<view v-if="isShowLoginModal">
		<show-modal :show="isShowLoginModal" @click="loginMoadlTap"  content="是否前去登录？" title="暂未登录" color="#333" :size="32" :button="loginButtons"></show-modal>
	</view>
</template>

<script>
	import {getPageAllInfo as mixins} from '../../mixins/qymMixins.js'
	export default{
		mixins:[mixins],
		props:{
			needFalse:{
				type:Boolean,
				default:true
			}
		},
		computed:{
			loginButtons(){
				if(this.needFalse){
					return [{
						text: "确定",
						type: 'green'
					}, {
						text: "取消",
						type: 'red',
						plain: true
					}]
				}else{
					return [{
						text: "确定",
						type: 'green'
					}]
				}
			}
		},
		data(){
			return {
				isShowLoginModal:false,
				
			}
		},
		methods:{
			
			open(){
				setTimeout(()=>{
					this.isShowLoginModal = true
					this.$emit('change',true)
				})
			},
			loginMoadlTap(e){
				let {index} = e
				this.isShowLoginModal = false
				this.$emit('change',false)
				if(index===1){
				}else{
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: "/pages/Person/my/login"
					});
					// #endif
					
					// #ifdef H5
					this.$Route.navigateTo(
						'/pages/Login/login'
					)
					// #endif
					
					// #ifdef APP-PLUS
					uni.showLoading({
						title: '正在加载',
						mask: true
					})
					this.shanYunSDKgetPhoneNum()
					// #endif
				}
			},
		}
	}
</script>

<style>
</style>
