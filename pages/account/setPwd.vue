<template>
	<view>
		<view style="padding: 60rpx 60rpx 0rpx 60rpx;">
			<view class="form-header_">
				<u-icon name="arrow-left" size="40" color="#ffffff" @click="backLastPage()"></u-icon>
				<text class="margin-left-sm">{{$t('修改密码')}}</text>
			</view>
			<view class="padding">
				<view v-for="(item,index) of fromList" :key="index" style="margin-bottom: 60rpx;">
					<view class="margin-bottom-sm">
						<text class="text-bold text-zhuti FuturaPTLight">{{$t(item.label)}} ：</text>
					</view>
					<view>
						<view  class="bg-white padding-lr-sm lists_ inputBorder" >
							<input :password="item.isPwd"  @blur="focusIndex=4" @focus="focus(index)" type="text" v-model="fromListInput[index]" style="width:100%;height: 100%;color: white;" />
							
						</view>
						<view class="tipContent text-grey margin-top-sm" >
							<text class="text-sm FuturaPTLight">
								{{$t(item.tip)}}
							</text>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		
		<view >
			<view class="flex justify-center padding">
				<view class="tixianNew"  @tap="next">
					<text>
						{{$t('确定')}}
					</text>
				</view>
			</view>
		</view>
		
		
		<uni-popup ref="inputSumbit" type="top" :maskClick="false" >
			<view class="bg-white" style="width:100vw;height: 100vh;background: #424554;padding: 60rpx;">
				<view class="margin-bottom flex align-center justify-between">
					<u-icon name="arrow-left" size="40" color="#ffffff" @tap="closePop"></u-icon>
				</view>
				<view class="margin-top-xl padding-top">
					<view v-for="(item,index) of form" :key="index"  style="margin-bottom: 80rpx;">
						<view class="flex align-center text-bold text-zhuti margin-bottom-sm">
							<text class="margin-right-sm">
								{{$t('词语')}}
							</text>
							<text>
								{{item.label}} ：
							</text>
						</view>
						<view  class="bg-white padding-lr-sm inputBorder lists_">
							<input @blur="focusJndex=4" @focus="focus(index,2)"   type="text" v-model="formInput[index]" style="width:100%;height: 100%;color: white;" />
						</view>
					</view>
				</view>
				<view class="padding margin-top flex justify-center align-center">
					<view class="tixianNew" @tap="sumbit">
						<text>
							{{$t('确定')}}
						</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<load-line loadType="circle"    :isLoading="isLoading" v-if="isLoading" circleColor="rgb(255,255,255)"></load-line>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup'
	import LoadLine from '../../components/load-line/load-line.vue'
	export default{
		onShow() {
			this.$Route.routeBefore(this)
		},
		onLoad() {
			if('isForget' in this.routeOption){
				this.isForget = this.routeOption.isForget
			}
			if(this.isForget){
				this.fromListInput.push('')
				this.fromList.unshift(
					{
						label:'用户名',
						value:'',
						tip:'',
						isPwd:false
					}
				)
			}
		},
		components:{
			uniPopup,
			LoadLine
		},
		data(){
			return {
				isForget:true,
				fromListInput:['',''],
				fromList:[
					{
						label:'新密码',
						value:'',
						tip:'您的密码必须至少10个字符，大写和小写字母和至少一个数字。并且您不能使用其他网站已经被泄露的密码。',
						isPwd:true
					},
					{
						label:'确认密码',
						value:'',
						tip:'您的密码必须至少10个字符，大写和小写字母和至少一个数字。并且您不能使用其他网站已经被泄露的密码。',
						isPwd:true
					}
				],
				formInput:['',''],
				form:[
					{
						label:'#6',
						value:''
					},
					{
						label:'#10',
						value:''
					}
				],
				focusIndex:4,
				focusJndex:4,
				generateRandomWordIndexs:[],
				isLoading:false,
				errIndex:4,
				errJndex:4
			}
		},
		methods:{
			focus(index,type = 1){
				
				if(type===1){
					this.focusIndex = index
					this.errIndex = 4
				}
				if(type===2){
					this.focusJndex = index
					this.errJndex = 4
				}
			},
			next(){
				if(!this.isForget){
					let newpwd = this.fromListInput[0]
					if(newpwd.length===0){
						this.errIndex = 0
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					let surePwd = this.fromListInput[1]
					if(surePwd!=newpwd){
						this.errIndex = 1
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return
					}
					
					
					this.formInput = ['','']
					this.generateRandomWordIndexs = this.generateRandomWordIndex(2)
					this.form.forEach((it,index)=>{
						this.form[index].label = `#${this.generateRandomWordIndexs[index]}`
					})
					this.$nextTick(()=>{
						this.$refs.inputSumbit.open()
					})
				}else{
					let userName = this.fromListInput[0]
					if(userName.length===0){
						this.errIndex = 0
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					
					
					
					let newpwd = this.fromListInput[1]
					if(newpwd.length===0){
						this.errIndex = 1
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					let surePwd = this.fromListInput[2]
					if(surePwd!=newpwd){
						this.errIndex = 2
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return
					}
					
					
					this.formInput = ['','']
					this.generateRandomWordIndexs = this.generateRandomWordIndex(2)
					this.form.forEach((it,index)=>{
						this.form[index].label = `#${this.generateRandomWordIndexs[index]}`
					})
					this.$nextTick(()=>{
						this.$refs.inputSumbit.open()
					})
				}
			},
			closePop(){
				this.$nextTick(()=>{
					this.$refs.inputSumbit.close()
				})
			},
			async sumbit(){
				this.closePop()
				if(!this.isForget){
					let word1 = this.formInput[0]
					let word2 = this.formInput[1]
					if(word1.length===0){
						this.errJndex = 0
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					if(word2.length===0){
						this.errJndex = 1
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					this.isLoading = true
					let getData = {
						word1num:this.generateRandomWordIndexs[0],
						word1,
						word2num:this.generateRandomWordIndexs[1],
						word2,
						newpwd:this.fromListInput[0],
						lan:this.lan_,
						emai:this.userInfo_.No,
						userid:this.userInfo_.ID
					}
					let [err,res] = await this.$Request_.get(this.$allUrl.changerpwd,getData)
					this.isLoading = false
					if(res!=null){
						if(res.IsSuccess){
							this.$store.commit('logout')
							this.$Route.reLaunch('/pages/index/index')
						}else{
							this.$api.msg(res.Msg)
						}
					}
				}else{
					let word1 = this.formInput[0]
					let word2 = this.formInput[1]
					if(word1.length===0){
						this.errJndex = 0
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					if(word2.length===0){
						this.errJndex = 1
						this.$api.msg(this.$t('请输入正确的内容'),1500)
						return 
					}
					let getData = {
						word1num:this.generateRandomWordIndexs[0],
						word1,
						word2num:this.generateRandomWordIndexs[1],
						word2,
						newpwd:this.fromListInput[1],
						lan:this.lan_,
						no:this.fromListInput[0]
					}
					console.log(getData)
					this.isLoading = true
					let [err,res] = await this.$Request_.get(this.$allUrl.forgetpwd,getData)
					this.isLoading = false
					if(res!=null){
						if(res.IsSuccess){
							this.$api.msg('OK',1000,true,'success')
							this.$store.commit('logout')
							setTimeout(()=>{
								this.$Route.reLaunch('/pages/index/index')
							},1000)
						}else{
							this.$api.msg(res.Msg)
						}
					}
				}
				
			},
		}
	}
</script>

<style scoped>
	.inputBorder{
		height:89rpx;
	}
	.inputErr{
		border:6rpx solid rgb(251, 6, 6);
		position:relative;
		z-index:1
	}
	.inputBorderFoucs{
		border:6rpx solid rgb(38,153,251);
	}
	.tipContent{
		width: 100%;
		line-height: 1.2em;
		border:5rpx;
		padding: 10rpx;
	}
	.triangleupfill{
		position: absolute;
		top: -18rpx;
		color:rgba(250,250,250);
		display: flex;
		justify-content: center;
		z-index: 2;
		left: 50%;
		right: 50%;
	}
	.authentication__continue-btn{
		background-color: #d80000;
		border-radius: 4px;
		color: #fff;
		font-size: 20px;
		font-weight: bold;
		height: 48px;
		text-transform: uppercase;
		width: 312px;	
	}
</style>
