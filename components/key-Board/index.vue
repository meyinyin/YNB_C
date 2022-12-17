<template>
	<view>
		<tui-keyboard :show="show" @close="closeKeyboard" @click="keyboardClick">
			<view class="tui-digital-box">
				<view class="flex justify-between padding align-center">
					<view style="width:33%" class="flex justify-center padding-tb">
						<text class="text-sm text-gray" v-if="showTip">(初始密码666666)</text>
					</view>
					
					<view style="width:33%" class="flex justify-center padding-tb">
						<view>请输入密码</view>
					</view>
					
					<view style="width:33%" class="flex justify-end padding-tb" @tap="goToDetail">
						<view class="margin-left text-xs" style="color: #ff5b2e;">修改交易密码</view>
					</view>
				</view>
				
				<view class="flex justify-end padding-right" style="margin-top:-65upx" >
					
				</view>
				
				<view class="margin-bottom-xl">
					<tui-keyboard-input :inputvalue="pwdArr"></tui-keyboard-input>
				</view>
			</view>
		</tui-keyboard>
	</view>
</template>

<script>
	import tuiKeyboard from "@/components/keyboard/keyboard"
	import tuiKeyboardInput from "@/components/keyboard-input/keyboard-input"
	export default{
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		components:{
			tuiKeyboard,
			tuiKeyboardInput
		},
		computed:{
			showTip(){
				let PwdAnswer = this.userInfo_.PwdAnswer*1
				console.log(this.userInfo_.PwdAnswer)
				if(PwdAnswer===666666){
					return true
				}else{
					return false
				}
			}
		},
		data(){
			return {
				numberArr: [],
				pwdArr: ["", "", "", "", "", ""],
				temp: ["", "", "", "", "", ""]
			}
		},
		methods:{
			keyboardClick(e) {
				let numberArr = this.numberArr;
				let pwdArr = this.pwdArr;
				let index = e.index;
				if (numberArr.length === pwdArr.length || index == undefined) {
					return;
				}
				if (index == 9) { //取消键
					this.closeKeyboard();
					return;
				} else if (index == 11) {
					//退格键
					let len = numberArr.length;
					if (len) {
						pwdArr.splice(len - 1, 1, "");
					} else {
						pwdArr = this.temp;
					}
					numberArr.pop()
				} else if (index == 10) {
					numberArr.push(0);
					pwdArr.splice(numberArr.length - 1, 1, "●");
				} else {
					numberArr.push(index + 1);
					pwdArr.splice(numberArr.length - 1, 1, "●");
				}
				this.numberArr = numberArr;
				this.pwdArr = pwdArr;
				this.getPwd();
			},
			getPwd() {
				//判断并取出密码
				if (this.numberArr.length === this.pwdArr.length) {
					let pwd = this.numberArr.join('')
					this.$emit('overInput',pwd)
					this.numberArr = [],
					this.pwdArr = ["", "", "", "", "", ""]
					this.temp = ["", "", "", "", "", ""]
				}
			},
			closeKeyboard() {
				this.numberArr = [],
				this.pwdArr = ["", "", "", "", "", ""]
				this.temp = ["", "", "", "", "", ""]
				this.$emit('closeKeyboard')
			},
			goToDetail(){
				uni.navigateTo({
					url:'/pages/Person/setting/pass'
				})
			}
		}
	}
</script>

<style>
</style>
