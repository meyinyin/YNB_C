<template>
	<view class="login-form">
		
		<u-form>
			
			<view class="form-header">
				
				<u-icon  labelColor="#ffffff" :label="$t('重要！请写下恢复词汇')" name="arrow-left" size="40" color="#ffffff" @click="back()">
			
				</u-icon>
				<view class="form-header">
					<view class="margin-top-sm padding-lr-xl">
						<text class="FuturaPTLight text-df text-zhuti" style="text-align: center;font-weight: 100;">
							{{$t('这是恢复密码的唯一方法。恢复词汇注册后不会再显示。请用笔与纸把密码恢复词汇抄写下，或者使用密码管理器储存。')}}
				
						</text>
					</view>
				</view>
			</view>

			<u-form-item  v-for="(item,index) of form" :key="index"    :label-position="labelPosition" :label="`${$t('词语')}${item.label}`"  label-width="150" >
				<u-input :border="border"  :password-icon="true" v-model="fromInput[index]"  type="text" placeholder=""  :borderColor="borderColor[index]" @focus="curryFocus(index)"></u-input>
			</u-form-item>
			
			
			
			
			<view class="form-btn" @tap="netx">
				{{$t('完成注册')}}
			</view>
		</u-form>
		<load-line :isLoading="isLoading" ></load-line>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.$Route.routeBefore(this)
			this.generateRandomWordIndexs = this.generateRandomWordIndex(2)
			console.log()
			this.form.forEach((it,index)=>{
				this.form[index].label = `#${this.generateRandomWordIndexs[index]}`
			})
		},
		data(){
			return {
				labelPosition: 'left',
				border: true,
				
				
				generateRandomWordIndexs:[6,10],
				fromInput:['',''],
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
				isLoading:false,
				setInrervalIDs:[],
				errIndex:4,
				
				
				borderColor:[
					'#dcdfe6',
					'#dcdfe6',
					'#dcdfe6'
				]
			}
		},
		methods:{
			changeborder(index){
				this.$set(this.borderColor,this.errIndex ,'#ff5715')
				console.log(this.borderColor)
			},
			curryFocus(index){
				this.$set(this.borderColor,index ,'#dcdfe6')
			},
			
			tipMsg(){
				this.$api.msg(this.$t('请输入正确的内容'),1500)
			},
			async netx(){
				if(this.fromInput[0].length===0){
					this.errIndex = 0
					this.changeborder()
					this.tipMsg()
					return 
				}
				if(this.fromInput[1].length===0){
					this.errIndex = 1
					this.changeborder()
					this.tipMsg()
					return 
				}
				console.log(this.routeOption)
				if('hasUserID' in this.routeOption){
					if(this.routeOption.hasUserID){
						let getData = {
							userid:this.routeOption.UserID,
							word1num:this.generateRandomWordIndexs[0],
							word1:this.fromInput[0],
							word2num:this.generateRandomWordIndexs[1],
							word2:this.fromInput[1],
							lan:this.lan_
						}
						console.log(getData)
						this.isLoading = true
						let [err,res] = await this.$Request_.get(this.$allUrl.adduserfinal,getData)
						this.isLoading = false
						if(res!=null){
							console.log(res)
							if(res.IsSuccess){
								this.$store.commit('login',res.Data)
								this.$Route.reLaunch('/pages/index/index')
							}else{
								this.$api.msg(res.Msg)
							}
						}
					}
				}
			},
			back(){
			 this.$Route.navigateBack()
			}
		},
	}
</script>

<style lang="scss">
	.login-form{
		.u-form{
			padding: 50upx;
			.form-header{
				color: #FFFFFF;
				font-size: 50upx;
				font-weight: bold;
				margin-bottom: 50upx;
				text{
					padding: 10upx 30upx;
				}
			}
			.u-form-item{
				background-color: #FFFFFF;
				padding: 10upx 50upx;
				border-radius: 50upx;
				border-width: 0;
				margin-bottom: 40upx;
				
			}
			.u-border-bottom::after{
				border-width: 0;
			}
			.u-form-item--left__content__label{
				color: #060518;
			}
			.send-code{
				background: linear-gradient(90deg, #F0D8A6 0%, #EBC181 100%);
				color: #060518;
				border-radius: 30upx;
				padding: 10upx 30upx;
			}
			.form-btn{
				background: linear-gradient(90deg, #F0D8A6 0%, #EBC181 100%);
				text-align: center;
				padding: 25upx 30upx;
				border-radius: 50upx;
			}
		}
	}
</style>
