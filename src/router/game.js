// game 游戏相关路由
const gameRouters = [
    {
        path: '/game',
        name: 'game',
        component: () => import('@/views/game/home/index.vue'),
        redirect: '/game/goband',
        children: [
            {
                path: 'gobandList',
                name: 'gobandList',
                meta: {
                    type: 'game',
                    title: '五子棋棋局中心',
                    isToken: false,
                    isKeepLive: false,
                    isShowIm:false,
                    isShowGamePc:false,
                    isShowCalendarPc:false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/game/goband/list.vue'),
            },
            {
                path: 'goband',
                name: 'goband',
                meta: {
                    type: 'game',
                    title: '五子棋对战中心',
                    isToken: false,
                    isKeepLive: false,
                    isShowIm:false,
                    isShowGamePc:false,
                    isShowCalendarPc:false,
                    roles: ['admin', 'tourist', 'normal'],
                    bg: '//image.zlketang.com/public/news/others/imgs/blog/9425531de96ceacd8ea88a6f1ce04317.png',
                },
                component: () => import('@/views/game/goband/index.vue'),
            },

            {
                path: 'aircraftBattle',
                name: 'aircraftBattle',
                meta: {
                    type: 'game',
                    title: '精灵宝可梦',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/game/aircraftBattle/index.vue'),
            },
            {
                path: 'myWorld',
                name: 'myWorld', 
                meta: {
                    type: 'game',
                    title: '我的世界',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/game/myWorld/index.vue'),
            },
        ],
    },
    {
        path: '/gameList',
        name: 'game',
        meta: {
            type: 'game',
            title: '游戏中心',
            isToken: true,
            isKeepLive: true,
            isShowGamePc:false,
            roles: ['admin', 'tourist', 'normal'], 
        },
        component: () => import('@/views/admin/game/gamelist/index.vue'),
    },
]

export { gameRouters }
