<template>
	<view style="position: relative;z-index: 5000;">
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action text-bold" :class="[backColor]" @tap="BackPage" v-if="isBack">
					<text class="ygIcon-fanhui" :class="[backColor]"></text>
					<slot name="backText"></slot>
				</view>
				<view class="action text-bold" :class="[backColor]" v-if="leftAction">
					<slot name="left"></slot>
				</view>
				<view class="content text-bold" :class="[backColor]" :style="[{top:StatusBar + 'px'}]" >
					<slot name="content" ></slot>
				</view>
				<slot name="right" :class="backColor" class="text-bold"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		created(){
			// console.log( this.StatusBar,this.CustomBar)
		},
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				if(this.bgc!=''){
					style = `${style};background:${this.bgc}`
				}
				return style
			}
		},
		props: {
			backColor:{
				type:String,
				default:'text-white'
			},
			bgColor: {
				type: String,
				default: 'bg-white'
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			leftAction: {
				type: [Boolean, String],
				default: false
			},
			bgc:{
				type:String,
				default:''
			},
			customBack:{
				type: [Boolean, String],
				default: false
			}
		},
		methods: {
			BackPage() {
				if(this.customBack){
					this.$emit('BackPage')
					return 
				}
				this.$emit('BackPage')
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style >

</style>
