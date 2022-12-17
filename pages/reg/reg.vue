<template>
	<view class="login-form">
		
		<u-form>
			
			<view class="form-header">
				
				<u-icon name="arrow-left" size="40" color="#ffffff" @click="back()">
					
				</u-icon>
				<text>{{$t('注册')}}</text>
			</view>

			<u-form-item :label-position="labelPosition" :label="$t('用户名')"  label-width="150" >
				<u-input @blur="blur" @focus="curryFocus(0)" :border="true" :borderColor="borderColor[0]" :password-icon="true" v-model="username"  type="text" :placeholder="$t('用户名必须在长度在4-14之间，并只包含数字，字母，下划线_和减号-')"></u-input>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" :label="$t('密码')" label-width="150" >
				<u-input :border="border" v-model="upwd" type="password" :placeholder="$t('您的密码必须至少10个字符，大写和小写字母和至少一个数字。并且您不能使用其他网站已经被泄露的密码。')" :borderColor="borderColor[1]" @focus="curryFocus(1)"></u-input>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" :label="$t('确认密码')" label-width="150" >
				<u-input :border="border" v-model="upwd2" type="password"></u-input :borderColor="borderColor[2]" @focus="curryFocus(2)">
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" right-icon="scan" :label="$t('邀请码(非必填)')" label-width="200">
				<u-input placeholder=""  :border="border" v-model="oid" type="text" ></u-input>
			</u-form-item>
			
			<view class="form-btn" @click="reg()">
				{{$t('注册')}}
			</view>
		</u-form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelPosition: 'left',
				border: true,
				
				username:'',
				upwd:'',
				upwd2:'',
				oid:'',
				
				isregister:false,
				errIndex:0,
				borderColor:[
					'#dcdfe6',
					'#dcdfe6',
					'#dcdfe6'
				]
			};
		},
		methods:{
			changeborder(index){
				this.$set(this.borderColor,index ,'#ff5715')
				console.log(this.borderColor)
			},
			curryFocus(index){
				this.$set(this.borderColor,index ,'#dcdfe6')
			},
			tipMsg(){
				this.$api.hidLoading_()
				this.$api.msg(this.$t('请输入正确的内容'),1500)
			},
			async blur(email){
				if(email.length===0){
					return
				}
				let [err,res] = await this.$Request_.get(this.$allUrl.isregister,{
					email,
					lan:this.lan_
				})
				if(res!=null){
					if(!res.IsSuccess){
						this.$api.msg(res.Msg,1500)
						this.isregister = true
						this.changeborder(0)
					}else{
						this.isregister = false
					}
				}
			},
			
			
			//注册账户
			async reg(){
				function isChina(str){
				    if (escape(str).indexOf( "%u" )<0){
				       return true
				    } else {
				       return false
				    }
				}
				this.$api.showLoading_()
				if(!this.isregister){
					let email = this.username
					let pwd = this.upwd
					let SurePwd = this.upwd2
					let pid = this.oid
					
					if(email.length===0){
						this.changeborder(0)
						this.tipMsg()
						return
					}else{
						if(!isChina(email)){
							this.changeborder(0)
							this.tipMsg()
							return
						}
					}
					if(pwd.length===0){
						this.changeborder(1)
						this.tipMsg()
						return
					}
					if(pwd!=SurePwd){
						this.changeborder(2)
						this.tipMsg()
						return
					}
					if(pid.length===0){
						pid = 0
					}
					
					let getData = {
						email,
						pwd,
						pid,
						lan:this.lan_
					}
					
					let [err,res] = await this.$Request_.get(this.$allUrl.adduser,getData)
					this.$api.hidLoading_()
					if(res!=null){
						if(res.IsSuccess){
							console.log(res)
							let cardList = res.Data
							this.$Route.navigateTo('/pages/reg/regTwo',{
								cardList,
								UserID:res.UserID,
								hasUserID:true
							},true)
						}
					}
				}else{
					this.$api.hidLoading_()
				}
			},
			//返回登录页面
			back(){
				uni.reLaunch({
				    url: '/pages/login/login'
				});
			}
		}
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
