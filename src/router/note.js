// note 学习相关的路由
const noteRouters = [
    {
        path: '/note',
        name: 'note-home',
        meta: {
            title: 'note主页',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/note/index.vue'),
        redirect: '/note/home',
        children: [
            {
                path: 'home',
                name: 'note-home1',
                meta: {
                    title: '乱七八招的',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/note/home/index.vue'),
            },
        ],
    },
]

export { noteRouters }
