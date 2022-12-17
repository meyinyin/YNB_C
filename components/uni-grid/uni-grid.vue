/*
支付键盘
*/
<template>
	<view>
		<view style="display: flex; height: 100upx; justify-content: center; align-items: center;border-bottom: 1px solid #CCCCCC;">
			<text class="ygIcon-cha" style="position: absolute; left: 20upx; font-size: 40upx;" @tap="close"></text>
			<text class="text-xl margin-tb" style="font-weight: bold;">请输入支付密码</text>
		</view>
		<view style="display: flex; justify-content: center; align-items: center;  flex-direction:column; margin-top: 30upx;">
			<view style="width: 85%; height: 80upx ; border: 1px solid #CCCCCC; border-radius: 10upx; display: flex;">
				<view v-for="(item,index) in 6" :key='index' :style="index==0?'':'border-left: 1px solid #CCCCCC; height:99%'"
				 style="height: 80upx;width: 17%;display: flex; justify-content: center;align-items: center;">
					{{pwdShow[index]==undefined?'':pwdShow[index]}}
				</view>
			</view>
		<navigator url="/pages/person/setting/payPass" hover-class="none">
			<view style="margin-top:20upx;color: #007AFF;"><text style="color:  #AAAAAA;">(初始密码666666)</text>去修改支付密码</view>
		</navigator>
		
		</view>
		<view style="margin-top: 30upx;" :class="{'uni-grid-no-border':!showBorder,'uni-grid-no-out-border':showBorder && !showOutBorder}"
		 class="uni-grid">
			<view v-for="(items,i) in gridGroup" :key="i" class="uni-grid__flex">
				<view v-for="(item,index) in items" :hover-start-time="20" :hover-stay-time="70" :key="index" :class="[index == columnNum ? 'uni-grid-item-last' : '','uni-grid-item-' + type]"
				 :style="{visibility:item.seize ? 'hidden' : 'inherit'}" class="uni-grid-item" hover-class="uni-grid-item-hover"
				 @click="onClick(i,index)">
					<view v-if="!item.seize" class="uni-grid-item__content">
						<image v-if="item.image!=null" :src="item.image" class="uni-grid-item-image" style="width: 55upx; height: 50upx; margin-top: 20upx;" />
						<text class="uni-grid-item-text" style="font-size: 55upx;font-weight: 400;">{{ item.text }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		name: 'UniGrid',
		props: {
			options: {
				type: Array,
				default () {
					return [{
							text: '1',
							value: 1
						},
						{
							text: '2',
							value: 2
						},
						{
							text: '3',
							value: 3
						},
						{
							text: '4',
							value: 4
						},
						{
							text: '5',
							value: 5
						},
						{
							text: '6',
							value: 6
						},
						{
							text: '7',
							value: 7
						},
						{
							text: '8',
							value: 8
						},
						{
							text: '9',
							value: 9
						},
						{
							text: "",
							value: -2
						},
						{
							text: '0',
							value: 0
						},
						{
							image: 'https://img.huaxuapp.com/shanchu.png',
							value: -1
						}
					]
				}

			},
			type: { // 布局格式，长方形oblong，正方形square
				type: String,
				default: 'square'
			},
			columnNum: { // 每一行有多少个
				type: [Number, String],
				default: 3
			},
			showOutBorder: { // 显示外边框
				type: Boolean,
				default: true
			},
			showBorder: { // 是否显示border，如果为false，showOutBorder无效
				type: Boolean,
				default: true
			},
			modalNameShow: { 
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				pwd: '',
				pwdShow: []
			}
		},
		computed: {
			gridGroup() {
				let group = []
				let groupItem = []
				this.options && this.options.forEach((item, index) => {
					groupItem.push(item)
					if (index % this.columnNum === this.columnNum - 1) {
						group.push(groupItem)
						groupItem = []
					}
				})
				if (groupItem.length > 0) {
					if (this.columnNum > groupItem.length) {
						for (let i = 0, length = groupItem.length; i < this.columnNum - length; i++) {
							groupItem.push({
								seize: true
							})
						}
					}
					group.push(groupItem)
				}
				groupItem = null
				return group
			}
		},
		created() {
			this.columnNumber = this.gridGroup[0].length
		},
		methods: {
			close() {
				this.pwd='';
				this.pwdShow=[];
				this.$emit('close', {
					modalNameShow: false
				})
			},
			onClick(index, num) {
				var index = parseInt(index * this.columnNumber + num);
				var value = this.options[index].value;
				if (this.pwd.length > 0 && value == -1) {
					//加入密码
					this.pwd = this.pwd.substring(0, this.pwd.length - 1);
					//密码显示
					this.pwdShow.pop('●');
				}
				if (this.pwd.length < 6 && value >= 0) {
					//加入密码
					this.pwd = this.pwd + value;
					//密码显示
					this.pwdShow.push('●');
				}
				//增加完密码后判断是否输入够6位
				if (this.pwd.length == 6) {
					this.$emit('fullclose', {
						modalNameShow: false,
						pwd:this.pwd
					})
					this.pwd='';
					this.pwdShow=[];
				}
			}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.b {
		border: 1px solid #007AFF;
	}

	.uni-grid {
		position: relative;
		display: flex;
		flex-direction: column
	}

	.uni-grid__flex {
		display: flex;
		flex-direction: row
	}

	.uni-grid-item {
		display: flex;
		position: relative;
		flex-direction: column;
		flex: 1
	}

	.uni-grid-item:before {
		display: block;
		content: " ";
		padding-bottom: 47%
			/*高度*/
	}

	.uni-grid-item:after {
		content: '';
		position: absolute;
		z-index: 1;
		transform-origin: center;
		box-sizing: border-box;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border-color: #c8c7cc;
		border-style: solid;
		border-width: 1px;
		-webkit-transform: scale(.5);
		transform: scale(.5);
		border-top-width: 0;
		border-left-width: 0
	}

	.uni-grid-item__content {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center
	}

	.uni-grid-item-text {
		font-size: 32upx;
		color: #333;
		margin-top: 12upx
	}

	.uni-grid-item-hover {
		background-color: #f1f1f1
	}

	.uni-grid-item-image {
		width: 80upx;
		height: 80upx
	}

	.uni-grid .uni-grid__flex:first-child .uni-grid-item:after {
		border-top-width: 1px
	}

	.uni-grid .uni-grid__flex .uni-grid-item:first-child:after {
		border-left-width: 1px
	}

	.uni-grid.uni-grid-no-out-border .uni-grid__flex:first-child .uni-grid-item:after {
		border-top-width: 0
	}

	.uni-grid.uni-grid-no-out-border .uni-grid__flex:last-child .uni-grid-item:after {
		border-bottom-width: 0
	}

	.uni-grid.uni-grid-no-out-border .uni-grid__flex .uni-grid-item:first-child:after {
		border-left-width: 0
	}

	.uni-grid.uni-grid-no-out-border .uni-grid__flex .uni-grid-item:last-child:after {
		border-right-width: 0
	}

	.uni-grid.uni-grid-no-border .uni-grid-item:after {
		border-width: 0
	}

	.uni-grid.uni-grid-no-border .uni-grid__flex:first-child .uni-grid-item:after {
		border-top-width: 0
	}

	.uni-grid.uni-grid-no-border .uni-grid__flex .uni-grid-item:first-child:after {
		border-left-width: 0
	}

	.uni-grid-item-oblong.uni-grid-item:before {
		padding-bottom: 60%
	}

	.uni-grid-item-oblong .uni-grid-item__content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row
	}

	.uni-grid-item-oblong .uni-grid-item-image {
		width: 52upx;
		height: 42upx
	}

	.uni-grid-item-oblong .uni-grid-item-text {
		margin-top: 0;
		margin-left: 12upx
	}
</style>
