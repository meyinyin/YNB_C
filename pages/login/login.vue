<template>
	<view class="login-form">
		
		<u-form>
			
			<view class="form-header">
				<image src="@/static/images/newYNBlog.png" style="width:135rpx;height: 84rpx;" mode=""></image>
				<view class="margin-top-xl">
					<text>{{$t('YNB欢迎你！')}}</text>
				</view>
				<view style="position: absolute;right: 0rpx;top: 0rpx;" class="flex flex-direction align-end">
					<view>
						<text class="cuIcon-sort" style="font-size: 49rpx;color: white;font-weight: 1000;" @tap="showTitleCardMun = !showTitleCardMun">
							
						</text>
					</view>
					<view class="text-sm text-zhuti">
						<text>
							{{$t('语言')}}:
						</text>
						<text>
							{{curryLan}}
						</text>
					</view>
					
					<view class="titleCardMun an2"  v-if="showTitleCardMun">
						<view class="titleCardMunItem " v-for="(item,index) of munList" :key="index" @tap="munTap(item,index)">
							<text>
								{{$t(item.label)}}
							</text>
						</view>
					</view>
				</view>
			</view>

			<u-form-item :label-position="labelPosition" :label="$t('用户名')" label-width="150" >
				<u-input :password-icon="true" v-model="username" :border="border" type="text" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :label="$t('密码')" label-width="150" >
				<u-input :border="border" v-model="upwd" type="password" ></u-input>
			</u-form-item>
			
			<view class="forget">
				<text class="forget-text">{{$t('忘记密码')}}？</text>
				<text class="reg-text" @click="reg()">{{$t('注册')}}</text>
			</view>
			
			
			<view class="form-btn" @click="login()">
				{{$t('登录')}}
			</view>
			
			<!-- <view class="agreement">
				<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
				<view class="agreement-text">
					勾选代表同意uView的版权协议
				</view>
			</view> -->
		
		</u-form>
		<load-line    :isLoading="isLoading" ></load-line>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelPosition: 'left',
				border: false,
				showTitleCardMun:false,
				codeTips: '',
				username:'',
				upwd:'',
				isLoading:false,
				
				munList:[
					{
						label:'英文',
						key:'en'
					},
					{
						label:'简体中文',
						key:'zh'
					},{
						label:'日文',
						key:'ja'
					},{
						label:'韩文',
						key:'ko'
					},
				],
			};
		},
		computed:{
			curryLan(){
				let localeList = ['en','zh','ja','ko']
				let locale = this.$store.state.locale
				if(locale==='en'){
					return this.$t('英文')
				}
				if(locale==='zh'){
					return this.$t('简体中文')
				}
				if(locale==='ja'){
					return this.$t('日文')
				}
				if(locale==='ko'){
					return this.$t('韩文')
				}
			}
		},
		methods:{
			//跳转到注册页面
			reg(){
				uni.navigateTo({
					url: '/pages/reg/reg'
				});
			},
			//发送登录请求
			async login(){
				let email = this.username
				let pwd = this.upwd
				if(email.length===0){
					this.$api.msg(this.$t('请输入正确的内容'),1500)
					return
				}
				if(pwd.length===0){
					this.$api.msg(this.$t('请输入正确的内容'),1500)
					return
				}
				this.isLoading = true
				let [err,res] = await this.$Request_.get(this.$allUrl.YNBlogin,{
					email,
					pwd,
					lan:this.lan_
				})
				this.isLoading = false
				if(res!=null){
					if(res.IsSuccess){
						this.$store.commit('login',res.Data)
						this.$Route.reLaunch('/pages/index/index')
					}else{
						this.$api.msg(res.Msg)
					}
				}
				
			},
			munTap(item,index){
				this.showTitleCardMun = false
				this.changLocale(item.key)
			},
			changLocale(locale){
				this.$store.commit('changLocale',locale)
				this.$i18n.locale = this.locale
				// this.getTitle()
			},
		}
	}
</script>

<style lang="scss">
	.login-form{
		.u-form{
			padding:50upx;
			.form-header{
				color: #FFFFFF;
				font-size: 50upx;
				font-weight: bold;
				margin-bottom: 150upx;
				position: relative;
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
			.forget{
				color: #979797;
				.forget-text{
					float: left;
				}
				.reg-text{
					float: right;
				}
				height: 60upx;
			}
			
			.agreement {
				display: flex;
				align-items: center;
				margin: 40rpx 0;

				.agreement-text {
					padding-left: 8rpx;
					color: $u-tips-color;
				}
			}
			.u-checkbox__icon-wrap--checked{
				background-color: #EECF98;
				border-color: #EECF98;
			}
		}
	}
</style>


<style scoped>
	.titleCardMun{
		position: absolute;
		width: 200rpx;
		top:50rpx;
		right:-30rpx;
		z-index:1;
		background-color:rgba(107, 112, 130, 1.0);
		/* box-shadow: 2rpx 2rpx 6rpx rgba(232, 232, 232, 0.8); */
	}
	.titleCardMunItem{
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 30rpx;
		font-weight: 100;
	}
	.an2{animation:fadeInDown  0.5s}
</style>
