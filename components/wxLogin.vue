<template>
	<view class="login-panel" :style="{transform: loginPanle ? 'scale(1)' : 'scale(0)',  background: loginPanle ? 'rgba(0, 0, 0, .3)' : 'transparent'}">
			<view class="login">
				<view class="login-notice">
					<text>登录</text>
					<view style="float: right;">
						<text class="cuIcon-close" @tap="changeLoginPanle(false)" style="font-size: 40upx;"></text>
					</view>
				</view>
		
				<view class="flex flex-direction" style="overflow: hidden;">
					<view style="margin-top: 70upx;transition: all 0.3s ease-in-out;" v-if="!loginbyPhone" :style="{ transform : !loginbyPhone? 'translateX(0)': 'translateX(-100%)'}">
						<view class="">
							<text class="text-gray text-sm">
								使用微信支付必须进行微信授权登录
							</text>
						</view>
		
						<view style="margin-top: 30upx;" v-if="showGetUserInfo">
							<text>
								<text class="sign">1</text>
								授权获取您的用户信息
							</text>
							<button ref="getUserInfoBtn" class="phone-login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo" style="margin-top: 10upx;"
							 :disabled="getWxUserInfo">
							    微信登录
								<text class="cuIcon-check margin-left" v-if="getWxUserInfo"></text>
							</button>
						</view>
		
						
						<view style="margin-bottom: -20upx; margin-top: 30upx;"   v-if="showGetUserPhone">
							<text>
								<text class="sign">2</text>
								授权获取您的手机号码
							</text>
						</view>
						<button class="phone-login-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" :disabled="!getWxUserInfo"   v-if="showGetUserPhone">
							我要注册
						</button>
						
						
						
						
						<view style="margin-bottom: -20upx; margin-top: 30upx;"   v-if="showGetUserPhone_Other">
							<text>
								<text class="sign">2</text>
								授权获取您的手机号码
							</text>
						</view>
						<button class="phone-login-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" :disabled="false"   v-if="showGetUserPhone_Other">
							我要注册
						</button>
						
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import {decrypt} from '@/common/pay.js'
	export default{
		watch:{
			loginPanle(n,o){
				if(!n){
					console.log('over')
					this.loginbyPhone = false;
					this.getWxUserInfo = false;
					this.wxInfo = {
					    js_code: '',
					    session_key: '',
					    openid: '',
					    unionid: '',
					    phone: '',
					    userInfoEncryptedData: '',
					    userInfoIv: '',
					    phoneEncryptedData: '',
					    phoneIv: '',
					    nickName: ''
					};
					this.showGetUserPhone = false
				}
			}
		},
		computed:{
			tjrid(){
				return this.$store.state.tjrid
			}
		},
		created() {
			// #ifndef H5
			uni.login({
			  provider: 'weixin',
			  success:(loginRes)=>{
			    console.log(loginRes);
			  },
			  complete:(e)=>{
				  console.log(e)
			  }
			});
			// #endif
		},
		props:{
			loginPanle:{
				type:Boolean,
				default:false
			},
			showGetUserPhone_Other:{
				type:Boolean,
				default:false
			},
			showGetUserInfo:{
				type:Boolean,
				default:true
			},
			wxInfo_other:{
				type:Object,
				default(){
					return{}
				}
			},
			needDisconnectGoEasy:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return {
				loginbyPhone:false,
				getWxUserInfo: false,
				wxInfo: {
				    js_code: '',
				    session_key: '',
				    openid: '',
				    unionid: '',
				    phone: '',
				    userInfoEncryptedData: '',
				    userInfoIv: '',
				    phoneEncryptedData: '',
				    phoneIv: '',
				    nickName: ''
				},
				showGetUserPhone:false
			}
		},
		methods:{
			changeLoginPanle(flag){
				this.$emit('changeLoginPanle',flag)
			},
			getUserInfo(userInfo) {
				console.log(this.tjrid,'微信登录组件的推荐人id')
				
				
				decrypt(userInfo)
					.then(async res => {
						Object.assign(this.wxInfo, this.wxInfo, res.data)
						this.getWxUserInfo = true
						console.log(this.wxInfo,res.data)
						this.$api.showLoading_({
							title: '效验微信号',
							mask:true
						})
						let [err,resolve] = await this.$Request_.get(this.$allUrl.loginbyunionid,{
							unionid:res.data.unionId,
							openid:res.data.openId,
							nickname:res.data.nickName,
							headimgurl:res.data.avatarUrl
						})
						uni.hideLoading()
						if(resolve!=null){
							if(resolve.IsSuccess){
								let userid = resolve.Data.ID
								this.$store.commit('setIsdisconnectGoEasy',this.needDisconnectGoEasy)
								this.$store.commit('login',resolve.Data)
								this.$store.commit('refreshGuanZhuList',resolve.GZList)
								this.$store.commit('changeZanGzFs',{
									GuanZhu:resolve.GuanZhu,
									Zan:resolve.Zan,
									FenSi:resolve.FenSi
								})
								this.$emit('changeLoginPanle',false)
								this.$emit('loginOk')
								this.$api.refresManagerType(userid,this)
							}else{
								this.showGetUserPhone = true
							}
						}
					})
					.catch(err => {
						console.log(this.$refs.getUserInfoBtn)
						console.log('获取用户信息失败', err);
						this.$api.msg('获取用户信息失败，请稍后重试')
					})
			},
			getPhoneNumber(phoneNumber) {//微信获取电话注册
				decrypt(phoneNumber).then(res => {
						if(this.showGetUserPhone_Other){
							this.wxInfo = this.wxInfo_other
						}
						Object.assign(this.wxInfo, this.wxInfo, res.data)
						this.$ajax.loginWithWx(this.wxInfo.purePhoneNumber, this.wxInfo.nickName,
								this.wxInfo.avatarUrl, this.wxInfo.openId, this.wxInfo.unionId,
								this.tjrid, this.tjrid*1 || 0, this.SiteID,0,true)
							.then(async res => {
								if (res.IsSuccess) {
									this.$store.commit('login', res.Data)
									this.$store.commit('refreshGuanZhuList',res.GZList)
									this.$store.commit('changeZanGzFs',{
										GuanZhu:res.GuanZhu,
										Zan:res.Zan,
										FenSi:res.FenSi
									})
									this.$emit('changeLoginPanle',false)
									this.$emit('loginOk')
								} else {
									this.$api.msg('登录出错，请稍后再试')
									console.log('登录出错', res);
								}
							})
							.catch(err => {
								decrypt(phoneNumber).then(res => {
										Object.assign(this.wxInfo, this.wxInfo, res.data)
										
										console.log(this.wxInfo.purePhoneNumber, this.wxInfo.nickName,
												this.wxInfo.avatarUrl, this.wxInfo.openId, this.wxInfo.unionId,
												this.tjrid, this.tjrid*1 || 0, this.SiteID)
												
										this.$ajax.loginWithWx(this.wxInfo.purePhoneNumber, this.wxInfo.nickName,
												this.wxInfo.avatarUrl, this.wxInfo.openId, this.wxInfo.unionId,
												this.tjrid, this.tjrid*1 || 0, this.SiteID,0,true)
											.then(async res => {
												if (res.IsSuccess) {
													this.$store.commit('login', res.Data)
													this.$store.commit('refreshGuanZhuList',res.GZList)
													this.$store.commit('changeZanGzFs',{
														GuanZhu:res.GuanZhu,
														Zan:res.Zan,
														FenSi:res.FenSi
													})
													this.$emit('changeLoginPanle',false)
													this.$emit('loginOk')
												} else {
													this.$api.msg('登录出错，请稍后再试')
													console.log('登录出错', res);
												}
											})
											.catch(err => {
												
											})
									})
									.catch(err => {
										console.log('获取电话号码失败', err);
										this.$api.msg('获取电话号码失败，请稍后重试')
									})
							})
					})
					.catch(err => {
						console.log('获取电话号码失败', err);
						this.$api.msg('获取电话号码失败，请稍后重试')
					})
			},
		}
	}
</script>

<style scoped lang="scss">
	.login-panel {
	
		z-index: 101;
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: scale(1);
		transition: transform .3s ease-in-out;
		background: rgba($color: #000000, $alpha: .3);
	
		.liner {
			position: relative;
			height: 1px;
			background: rgba($color: #000000, $alpha: .1);
			display: flex;
			justify-content: center;
			align-items: center;
	
			.info {
				background: #fff;
				position: absolute;
				padding: 10upx 30upx;
				font-size: 20upx;
				color: #ccc;
			}
		}
	
		.sign {
			display: inline-flex;
			width: 40upx;
			align-items: center;
			justify-content: center;
			height: 40upx;
			background: linear-gradient(to right, lighten(#eb5245, 10), #eb5245);
			border-radius: 100upx;
			margin-right: 10upx;
			color: #fff;
		}
	
		.login {
			background: #fff;
			width: 80%;
			padding: 30upx;
			border-radius: 10upx;
		}
	
		.login-notice {
			font-size: 36upx;
			font-weight: bold;
		}
	
		.phone-login-btn {
			margin: 30upx 0;
			background: #39B54A;
			border-radius: 10upx;
			text-align: center;
			color: #fff;
		}
	}
	
	.an1{animation:fade   0.5s 1; }
</style>
