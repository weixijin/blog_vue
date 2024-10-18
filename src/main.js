
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// 编辑器插件
import { baseURL } from '@/plugins/config.js'

import {
    saveError
} from '@/mixins/tool/tool.js'
import kingUiPro from 'king-ui-pro'
import {klFun} from 'king-ui-pro'
// console.log('kingUiPro,',kingUiPro)
// 全局注入king-ui-pro组件
Vue.use(kingUiPro)

// 全局注入king-ui-pro方法
Object.keys(klFun).forEach((key) => {
    Vue.prototype[key] = klFun[key]; 
});

// 导入自己的插件
import myPlugins from '@/mixins'

// 全局样式
import '@/assets/css/index.scss'

Vue.config.productionTip = false

// create
Vue.use(myPlugins)

// Devtools工具，在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV == 'development') {
    Vue.config.devtools = true
} else {
    Vue.config.devtools = false
}

saveError()

// 注册全局变量
Vue.prototype.$baseURL = baseURL

new Vue({
    router,
    store,
    render: (h) => h(App),
    beforeCreate(){
        Vue.prototype.$bus=this // 绑定全局事件总线
      }
}).$mount('#app')
