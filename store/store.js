import Vue from 'vue';
import Vuex from 'vuex';
import {qymMutations,qymState,allUrl} from './qym/store.js'
import {setting, settingMutations} from './Takeaway/setting.js'
import {shoppingCart, shoppingCartMutations} from './Takeaway/takeaway.js'

Vue.use(Vuex);
export default new Vuex.Store({
	state:{ 
		...qymState,
		...allUrl,
		...setting,
		...shoppingCart
	},
	mutations: {
		...qymMutations,
		...settingMutations,
		...shoppingCartMutations
	}
})