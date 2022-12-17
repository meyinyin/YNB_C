<template>
	<view class="semp-notice-bar">
		<view class="show-box flex-row" :class="round?'round':''" v-show="showNotice"  style="background: transparent;" >
			<view style="width: 300upx;" :class="icon==''?'no-icon':''" v-if="showType=='slider'">
				<view class="text-box" :class="rows && !scrollable?'text-rows':''" :style="{'margin-left':sw+'px','color':color}" @click="onItemClick">{{strText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../uni-icon/uni-icon.vue'
	export default {
		name: 'semp-notice-bar',
		components: {
			uniIcon
		},
		data() {
			return {								
				boxWidth:'300',
				textwidth:'300',
				sw:'0',
				timer:null,				
				showNotice:true
			}
		},
		props:{
			strText:{
				type: String,
				default: '',
			},
			//多条信息滚动模式
			arrayText:{
				type: Array,
				default () {
					return [
						'',
					]
				}
			},
			//slider 滑动 scrollTop 上下滚动 scrollLeft横向滚动
			showType:{
				type: String,
				default: 'slider',
			},
			showTime: {
				type: [Number, String],
				default: ''
			},
			icon: {
			  type: String,
			  default: 'sound',
			},
			setIconColor: {
			  type: String,
			  default: '#2F86F6',
			},
			bgColor: {
			  type: String,
			  default: 'rgba(89, 158, 248, .08)',
			},
			color: {
			  type: String,
			  default: '#ffffff',
			},
			 scrollable: {
			  type: [Boolean, String],
			  default: false,
			},
			//圆角
			round: {
			  type: [Boolean, String],
			  default: false,
			},
			//是否多行
			rows: {
			  type: [Boolean, String],
			  default: false,
			},
		},
		 mounted() {			
			if(this.scrollable && !this.rows && this.showType=="slider"){				
				this.sinit();			
				this.move();
			}			
			this.close()			
		},
		methods: {
			sinit(){
				let query=uni.createSelectorQuery();
				let view = query.select(".text-box");
				view.fields({
						size: true,
						scrollOffset: true
					}, data => {
						
				}).exec();
				let box=query.select(".show-box");
				box.fields({
						size: true,
						scrollOffset: true
					}, data => {
				}).exec();
			},
			move(){				
				this.sw=this.boxWidth;											
				//console.error('运行长度:'+this.textwidth)
				this.timer=setInterval(() =>{
					this.sw=this.sw-1;
					if(-this.sw-this.textwidth>0){
						//clearInterval(this.timer);
						this.sw=this.boxWidth
					}					
				},25)
			},
			show(){
				this.showNotice=true;
			},
			close(){
				if((this.timer || this.showType!='slider') && this.showTime!=''){
					setInterval(()=>{
						if(this.timer){
							clearInterval(this.timer);
						}	
						this.showNotice=false;
					},this.showTime)					
				}	
				this.$emit("close");
			},
			onItemClick(){
				this.$emit('click')
			}
		},		
	}
</script>

<style>
	.show-box{
		width:96%;
		overflow: hidden;
		padding:0 2%;
	}
	.text-box{
		white-space:nowrap;		
		line-height: 36upx;
	}
	.icon{
		padding-right:12upx;		
		padding-top:28upx;
	}
	.no-icon{
		flex: 1;
	}
	.show-info{
		overflow: hidden;
	}
	.scroll-box{
		overflow: hidden;
		height:76upx;
		line-height: 76upx;
	}
	.round{
		border-radius: 50upx;
	}
	.text-box.text-rows{
		white-space:normal;
	}
</style>
