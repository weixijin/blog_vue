// import VueRouter from 'vue-router' //引入vue-router
import { joinParams,encodeParams,isObject } from '@/mixins/tool/tool.js'
import store from '@/store'
import { initRouters, endRouters } from '@/router/init.js'
import { blogRouters } from '@/router/blog.js'
import { adminRouters } from '@/router/admin.js'
import { ceshiRouters } from '@/router/ceshi.js'
import { noteRouters } from '@/router/note.js'
import { toolRouters } from '@/router/tool.js'
import { pluginsRouters } from '@/router/plugins.js'
import { normalRouters } from '@/router/normal.js'

// 游戏
import { gameRouters } from '@/router/game.js'

// Vue.use(VueRouter)

// 拼接路由
const routes = [
    ...initRouters,
    ...noteRouters,
    ...ceshiRouters,
    ...blogRouters,
    ...adminRouters,
    ...endRouters,
    ...toolRouters,
    ...pluginsRouters,
    ...gameRouters,
    ...normalRouters
]

const router = new VueRouter({
    routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title

    // 对于测试的单独处理
    if (to.path === '/ceshi') {
        // 保持每次打开ceshi都是打开第一个
        return next('/ceshi/' + ceshiRouters[0].children[0].path)
    }

    // 当前路由是否需要登录
    if (!to.meta.isToken) {
        return next()
    }

    // 需要权限
    let { userdata } = store.state
    if (!isObject(userdata) || !userdata._id) {
        typeof ELEMENT !== 'undefined' && ELEMENT.Message({
            type:'error',
            message:'请先登录~',
            duration:1000
        })
        let { fullPath } = to
        let path = `${window.location.origin}/#${fullPath}`
        return next(`/login?path=${encodeURIComponent(path)}`)
    }

    if (!to.meta.roles.includes(userdata.role)) {
        typeof ELEMENT !== 'undefined' && ELEMENT.Message({
            type:'error',
            message:'没有权限访问~',
            duration:1000
        })
        return next('/')
    }
    next()
})

export default router
