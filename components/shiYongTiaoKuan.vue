<template>
	<view>
		<view class="shiYongTiaoKuan" v-if="show">
			<iframe   src="https://www.recaptcha.net/recaptcha/api2/anchor?ar=1&amp;k=6LfpGOUUAAAAAMh_0WJVt0TLUn_ewhrpj188TTRW&amp;co=aHR0cHM6Ly95aW4uYmk6NDQz&amp;hl=zh-CN&amp;v=2Mfykwl2mlvyQZQ3PEgoH710&amp;size=invisible&amp;cb=fwacph48r46i" width="256" height="60" role="presentation" name="a-w5voqmp1a575" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				show:false
			}
		},
		mounted() {
			var agent = navigator.userAgent.toLowerCase() ;
			if(agent.includes('chrome')){
				this.show= true
			}
		}
	}
</script>

<style scoped>
	.shiYongTiaoKuan{
		position: fixed;
		right: 20rpx;
		bottom: 40rpx;
	}
</style>
