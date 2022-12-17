import * as user from './user'
import * as common from './common'
import * as store from './store'
import * as advert from './advert.js'
import * as person from './person.js'
import * as msg from './msg.js'
import * as game from './game.js'

import Vue from 'vue'

export const STATUS_OK = '0000'

const api = {
    STATUS_OK: STATUS_OK,
    ...user,
    ...common,
	...store,
	...person,
	...advert,
	...msg,
	...game
}

Vue.prototype.$ajax = api

export default api