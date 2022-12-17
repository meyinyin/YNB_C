export const shoppingCart = {
	shoppingCart: uni.getStorageSync('shoppingCart'),
	remarks: []
}

export const shoppingCartMutations = {
	/**
	 * @description 设置购物车
	 * 
	 * @param {Object} state
	 * @param {Object} shopping
	 */
	setShopping(state, shopping) {
		state.shoppingCart = shopping
		uni.setStorage({
			key: 'shoppingCart',
			data: shopping
		})
	},
	/**
	 * @description 清空购物车
	 * 
	 * @param {Object} state
	 */
	clearShoppingCart(state) {
		state.shoppingCart = {}
		uni.removeStorageSync('shoppingCart')
	},
	/**
	 * @description 				设置备注信息
	 * 
	 * @param {Object} state		
	 * @param {Object} remarks		备注信息
	 */
	setRemarks(state, remarks) {
		state.remarks = remarks
		uni.setStorage({
			key: 'remarks',
			data: remarks
		})
	},
	/**
	 * @@description 				清除备注信息
	 * 
	 * @param {Object} state
	 */
	clearRemarks(state) {
		state.remarks = []
		uni.removeStorageSync('remarks')
	}
}