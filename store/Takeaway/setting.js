export const setting = {
	// 收货地址列表
	addrList: uni.getStorageSync('addrList'),
	// 使用中的收货地址
	addr: uni.getStorageSync('addr')
}

export const settingMutations = {
	/**
	 * @description 设置 / 刷新收货地址列表
	 * 
	 * @param {Object} state
	 * @param {Array} addrList 收货地址列表
	 */
	setAddrList(state, addrList) {
		state.addrList = addrList
		uni.setStorage({
			key: 'addrList',
			data: state.addrList
		})
	},
	/**
	 * @description 新增收货地址
	 * 
	 * @param {Object} state
	 * @param {Object} addrItem	收货地址对象
	 */
	addAddrList(state, addrItem) {
		state.addrList.push(addrItem)
		uni.setStorage({
			key: 'addrList',
			data: state.addrList
		})
	},
	/**
	 * @description 删除指定的收货地址
	 * 
	 * @param {Object} state
	 * @param {Number} addrIndex 要删除收货地址的下标
	 */
	delAddrList(state, addrIndex) {
		state.addrList.splice(addrIndex, 1)
		if(state.addrList.length === 0) {
			uni.removeStorage({
				key: 'addrList'
			})
		} else {
			uni.setStorage({
				key: 'addrList',
				data: state.addrList
			})
		}
	},
	/**
	 * @description 设置收货地址
	 * 
	 * @param {Object} state
	 * @param {Object} addr		使用中的收货地址
	 */
	setAddr(state, addr) {
		state.addr = addr
		uni.setStorage({
			key: 'addr',
			data: addr
		})
	},
	/**
	 * @description		删除使用中的地址
	 * 
	 * @param {Object} state
	 */
	delAddr(state) {
		state.addr = ''
		uni.removeStorage({
			key: 'addr'
		})
	}
}