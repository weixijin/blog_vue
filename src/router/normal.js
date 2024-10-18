// 可能会同时兼容pc与移动端的路由
export const normalRouters = [
    {
        path: '/normal/experience_record',
        name: 'experience_record',
        meta: {
            title: '日记',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
            isShowCalendarMobile: true,
        },
        component: () => import('@/views/normal/experience_record/index.vue'),
    },
    {
        path: '/normal/user_weight',
        name: 'user_weight',
        meta: {
            title: '体重记录',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
            isShowCalendarMobile: true,
        },
        component: () => import('@/views/normal/user_weight/index.vue'),
    },
    {
        path: '/normal/push_task',
        name: 'push_task',
        meta: {
            title: '每日推送',
            isToken: false,
            isKeepLive: true,
            roles: ['admin', 'tourist', 'normal'],
            isShowCalendarMobile: true,
        },
        component: () => import('@/views/normal/push_task/index.vue'),
    },
    {
        path: '/normal/electric_charge',
        name: 'normal_electric_charge',
        meta: {
            title: '租房电费',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
            isShowCalendarMobile: false,
            isShowCalendarPc:false,
            isShowIm:false,
            isShowGamePc:false,
            isShowCalendarMobile:false,
        },
        component: () => import('@/views/normal/electric_charge/index.vue'),
    },
]
