export default {
    // 设置组件缓存的状态
    SET_RP(state,data){
        state.RP = data
    },
    // isShowCalendar 设置日历的展示
    SET_IS_SHOW_CALENDAR(state, data) {
        state.isShowCalendar = data
    },
    // isShowGame 设置游戏的入口展示
    SET_IS_SHOW_GAME(state, data) {
        state.isShowGame = data
    },
    setclass_id(state, data) {
        state.class_id = data
    },
    setUserData(state, { user, token, options }) {
        if (user) {
            state.userdata = user
        }

        if (token) {
            state.token = token === 'loginout'?'':token
        }
        if (options) {
            state.options = options
        }
    },
    settoken(state, data) {
        state.token = data
    },
    setactiveIndex(state, data) {
        state.activeIndex = data
    },
    SET_IS_PC(state, data) {
        state.isPc = data
    },
    SET_URL_PATH(state, { title, path }) {
        state.url_path = path
        state.url_title = title
    },
    SET_PLAN_INFOS(state, data) {
        state.plan_infos = data
    },
    // 设置配置信息
    SET_OPTIONS(state, {data,article_total,blog_class_option,tags}) {
        if(data){
            state.options = data
        }
        if(article_total){
            state.article_total = article_total
        }
        if(blog_class_option){
            state.blog_class_option = blog_class_option
        }
        if(Array.isArray(tags)){
            state.userTags = tags
        }
        
    },
    SET_COLLECTIONS_LIST_COMIT(state, data) {
        state.collectionList = data
    },
    SET_LOCALFORAGEJS(state,data){
        state.localforageJS = data
    },
    SET_LOCALFORAGEIMG(state,data){
        state.localforageIMG = data
    },
    SET_LOCALFORAGEAPI(state,data){
        state.localforageAPI = data
    },
    SET_NAV_LIST(state,data){
        state.navlist = data
    },
    SET_SOCKET(state,data){
        state.socket = data
    },
    set_keyboardEventKay(state,data){
        state.keyboardEventKay = data
        setTimeout(() => {
            state.keyboardEventKay = ''
        }, 50)
    }
    
}
