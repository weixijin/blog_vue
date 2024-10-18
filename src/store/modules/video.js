export default {
    namespaced: true,
    state: {
        player:null,
        aaa:111
    },
    mutations: {
        // 设置播放器
        SET_PLAYER(state, data) {
            state.player = data
        }
    },
}
