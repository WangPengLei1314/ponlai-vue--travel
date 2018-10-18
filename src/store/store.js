
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state : {
		loading:false
	},

	mutations : {
		loading (state,extra) {
			state.loading = extra

		}

	}

})


export default store