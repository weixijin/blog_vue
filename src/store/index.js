import createPersistedState from 'vuex-persistedstate'

import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

import user from './modules/user'
import video from './modules/video'

export default new Vuex.Store({
    plugins: [
        createPersistedState({ storage: window.localStorage }), //配置为sessionStorage，如果不传入对象就是默认
    ],
    state,
    mutations,
    actions,
    getters,
    modules: {
        user,
        videoStore:video,
    },
})
