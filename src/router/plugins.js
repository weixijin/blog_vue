// 基本的默认路由

const pluginsRouters = [
    {
        path: '/plugins/kl_edit',
        name: 'kl_edit',
        meta: {
            title: 'kl_edit',
            isToken: false,
            isKeepLive: true,
            roles: ['admin'],
        },
        component: () => import(/* webpackChunkName: "plugins" */ '@/views/plugins/kl_edit/index.vue'),
    },
    {
        path: '/plugins/picture_compression',
        name: 'picture_compression',
        meta: {
            title: 'picture_compression',
            isToken: false,
            isKeepLive: true,
            roles: ['admin'],
        },
        component: () => import(/* webpackChunkName: "plugins" */ '@/views/plugins/picture_compression/index.vue'),
    },
]



export { pluginsRouters }
