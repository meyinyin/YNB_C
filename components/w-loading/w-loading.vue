<template>
  <view class="mask" :class= "mask == 'true' || mask == true ? 'mask-show' : ''" @click="Mclose" v-if="show" @touchmove.stop.prevent="preventTouchMove">
	<view class="loader">
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	  <view></view>
	</view>
  </view>
  <!-- 遮罩层-->
</template>

<script scoped="true">
export default {
  name: "w-loading",
	props:{
		text: {
			type:String,
			default:''
		},
		mask: {
			type:Boolean,
			default:true,
		},
		click: Boolean | String,
		loadingType:{
			type:Number,
			default:4
		}
	},
  data() {
    return {
			show: false
		};
  },
	methods:{
		preventTouchMove(){
			// console.log('stop user scroll it!');
			return;
		},
		Mclose(){
			if(this.click == 'false' || this.click == false){
				this.show = false
			}
		},
		open(){
			this.show = true
    },
    close(){
      this.show = false
    }
	}
};
</script>

<style scoped>
.mask {
  /* pointer-events: none; */
  position: fixed;
  z-index: 99999999999999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
	flex-direction:column;
  justify-content: center;
  align-items: center;
	flex-wrap: wrap;
}
.mask.mask-show{
	background: rgba(7, 17, 27, .3);
}
.title{
	color: #fff;
	font-size: 28upx;
	margin-top: 60rpx;
}

</style>

<style scoped="true">
.loader {
  position: absolute;
  top: 0upx;
  bottom: 0upx;
  left: 0upx;
  right: 0upx;
  margin: auto;
  width: 175upx;
  height: 100upx;
}
.loader view {
  display: block;
  background: #ccc;
  width: 7upx;
  height: 10%;
  border-radius: 14upx;
  margin-right: 5upx;
  float: left;
  margin-top: 25%;
}
.loader view:last-child {
  margin-right: 0upx;
}
.loader view:nth-child(1) {
  animation: load 2.5s 1.4s infinite linear;
}
.loader view:nth-child(2) {
  animation: load 2.5s 1.2s infinite linear;
}
.loader view:nth-child(3) {
  animation: load 2.5s 1s infinite linear;
}
.loader view:nth-child(4) {
  animation: load 2.5s 0.8s infinite linear;
}
.loader view:nth-child(5) {
  animation: load 2.5s 0.6s infinite linear;
}
.loader view:nth-child(6) {
  animation: load 2.5s 0.4s infinite linear;
}
.loader view:nth-child(7) {
  animation: load 2.5s 0.2s infinite linear;
}
.loader view:nth-child(8) {
  animation: load 2.5s 0s infinite linear;
}
.loader view:nth-child(9) {
  animation: load 2.5s 0.2s infinite linear;
}
.loader view:nth-child(10) {
  animation: load 2.5s 0.4s infinite linear;
}
.loader view:nth-child(11) {
  animation: load 2.5s 0.6s infinite linear;
}
.loader view:nth-child(12) {
  animation: load 2.5s 0.8s infinite linear;
}
.loader view:nth-child(13) {
  animation: load 2.5s 1s infinite linear;
}
.loader view:nth-child(14) {
  animation: load 2.5s 1.2s infinite linear;
}
.loader view:nth-child(15) {
  animation: load 2.5s 1.4s infinite linear;
}

@keyframes load {
  0% {
    background: #ccc;
    margin-top: 25%;
    height: 10%;
  }
  50% {
    background: #444;
    height: 100%;
    margin-top: 0%;
  }
  100% {
    background: #ccc;
    height: 10%;
    margin-top: 25%;
  }
}
</style>