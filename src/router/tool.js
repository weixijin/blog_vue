// ceshi 学习相关的路由
export const toolRouters = [
    
    {
        path: '/tool/excel',
        name: 'tool-excel',
        meta: {
            title: '在线excel定制页',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/tool/excel/index.vue'),
    },
    {
        path: '/tool/jsmind',
        name: 'jsmind',
        meta: {
            title: '在线脑图',
            isToken: true,
            isKeepLive: false,
            isShowIm:false,
            isShowGamePc:false,
            isShowCalendarPc:false,
            isNeedRightMenu:false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/jsmind/list.vue'),
    },
    {
        path: '/tool/jsmind_details',
        name: 'jsmind',
        meta: {
            title: '在线脑图详情',
            isToken: true,
            isKeepLive: false,
            isShowIm:false,
            isShowGamePc:false,
            isShowCalendarPc:false,
            isNeedRightMenu:false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import('@/views/jsmind/details.vue'),
    },
]