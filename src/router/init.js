// 基本的默认路由

const initRouters = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '主页',
            isToken: false,
            isKeepLive: true,
            isShowCalendarMobile:true,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/homepage/home/index.vue'),
    },

    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登陆',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/user/login/index.vue'),
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/user/register.vue'),
    },
    {
        path: '/findPassword',
        name: 'findPassword',
        meta: {
            title: '注册',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/user/find_password.vue'),
    }
]

// 静态路由  处理错误路由
const endRouters = [
    {
        path: '*',
        name: 'err',
        meta: {
            title: '404',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'student'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/common/404.vue'),
    },
]

export { initRouters, endRouters }
