// ceshi 学习相关的路由
const ceshiRouters = [
    {
        path: '/ceshi',
        name: 'ceshi-home',
        meta: {
            title: 'ceshi主页',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/ceshi/index.vue'),
        children: [
            {
                path: 'canvas',
                name: 'canvas',
                meta: {
                    title: 'canvas',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/canvas/index.vue'),
            },
            {
                path: 'animate',
                name: 'animate',
                meta: {
                    title: 'animate',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/animate/index.vue'),
            },
            {
                path: 'three',
                name: 'three',
                meta: {
                    title: 'three',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/three/index.vue'),
            },
            
            {
                path: 'kl-ui-page',
                name: 'kl-ui-page',
                meta: {
                    title: 'kl-ui-page配置',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/kl-ui-page/index.vue'),
            },
            {
                path: 'table',
                name: 'table',
                meta: {
                    title: 'table配置',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/configure-table/index.vue'),
            },
            {
                path: 'others',
                name: 'others',
                meta: {
                    title: '乱七八招的',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/others/index.vue'),
            },
            {
                path: 'form',
                name: 'form',
                meta: {
                    title: '复杂的表单相关',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/table/index.vue'),
            },
            {
                path: 'anchor',
                name: 'anchor',
                meta: {
                    title: 'vue锚点组件',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/anchor/index.vue'),
            },
            {
                path: 'files-upload',
                name: 'files-upload',
                meta: {
                    title: '多文件上传与预览',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/files-upload/index.vue'),
            },
            {
                path: 'excel-put',
                name: 'excel-put',
                meta: {
                    title: 'excel上传与预览',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/excel-put/index.vue'),
            },
            {
                path: 'drag',
                name: 'drag',
                meta: {
                    title: '拖拽指令',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/drag/index.vue'),
            },
            {
                path: 'nine',
                name: 'nine',
                meta: {
                    title: '九宫格抽奖',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/luckDraw/nine.vue'),
            },
            {
                path: 'roulette',
                name: 'roulette',
                meta: {
                    title: '轮盘抽奖',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/luckDraw/roulette.vue'),
            },
        ],
    },
    {
        path: '/phone',
        name: 'phone-index',
        meta: {
            title: '移动端测试主页',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/ceshi/phone/index.vue'),
        redirect:'/phone/vantCom',
        children: [
            
            {
                path: 'vantCom',
                name: 'phone-vantCom',
                meta: {
                    title: 'vant组件二次封装',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/phone/vantCom.vue'),
            },
            {
                path: 'home',
                name: 'phone-video',
                meta: {
                    title: '移动端主页',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/phone/home.vue'),
            },
            {
                path: 'video',
                name: 'phone-video',
                meta: {
                    title: '视频播放',
                    isToken: false,
                    isKeepLive: false,
                    roles: ['admin', 'tourist', 'normal'],
                },
                component: () => import('@/views/ceshi/phone/video.vue'),
            },
        ],
    },
]

export { ceshiRouters }
