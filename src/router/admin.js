// admin 相关的路由
const adminRouters = [
    {
        path: '/admin/notes',
        name: 'admin-notes',
        meta: {
            icon: 'el-icon-edit-outline',
            title: '纪要管理',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/notes/err_info_c',
        children: [
            {
                path: 'err_info_c',
                name: 'err_info_c',
                meta: {
                    icon: 'el-icon-edit-outline',
                    title: '禅道mini',
                    isToken: true,
                    isKeepLive: false,
                    // isNeedRightMenu:false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/common/c_bug/index.vue'),
            },
            {
                path: 'list',
                name: 'list',
                meta: {
                    icon: 'el-icon-edit-outline',
                    title: '纪要列表',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/notes/list/index.vue'),
            },

            {
                path: 'bug_list',
                name: 'bug_list',
                meta: {
                    icon: 'el-icon-edit-outline',
                    title: 'bug列表',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/notes/bug_list/index.vue'),
            },

            {
                path: 'err_info',
                name: 'err_info',
                meta: {
                    icon: 'el-icon-edit-outline',
                    title: '上报错误',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/common/err_info/index.vue'),
            },

            {
                path: 'push_tasks',
                name: 'push_tasks',
                meta: {
                    icon: 'el-icon-edit-outline',
                    title: '推送配置',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/notes/push_task/index.vue'),
            },
            {
                path: 'electric_charge',
                name: 'electric_charge',
                meta: {
                    icon: 'el-icon-edit-outline',
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
        ],
    },

    {
        path: '/admin/common',
        name: 'admin-home',
        meta: {
            icon: 'el-icon-location',
            title: '项目管理',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/common/author',
        children: [
            {
                path: 'author',
                name: 'author',
                meta: {
                    icon: 'el-icon-location',
                    title: '用户管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/common/author'),
            },
            {
                path: 'code',
                name: 'code',
                meta: {
                    icon: 'el-icon-location',
                    title: '验证码管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/common/code'),
            },
            {
                path: 'emoji',
                name: 'emoji',
                meta: {
                    icon: 'el-icon-location',
                    title: 'emoji管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/common/emoji'),
            },

            {
                path: 'tags',
                name: 'tags',
                meta: {
                    icon: 'el-icon-location',
                    title: '标签管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/common/tags'),
            },
            {
                path: 'monitors',
                name: 'monitors',
                meta: {
                    icon: 'el-icon-location',
                    title: '项目上报',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/common/monitors/index.vue'),
            },
            
        ],
    },
    {
        path: '/admin/echarts',
        name: 'admin-echarts',
        meta: {
            icon: 'el-icon-picture-outline',
            title: '可视化',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/common/list',
        children: [
            {
                path: 'notes',
                name: 'notes',
                meta: {
                    icon: 'el-icon-picture-outline',
                    title: '待办纪要可视化',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/echarts/notes/index.vue'),
            },
            {
                path: 'weight',
                name: 'weight',
                meta: {
                    icon: 'el-icon-picture-outline',
                    title: '体重管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/echarts/weight/index.vue'),
            },
            {
                path: 'monitor_echarts',
                name: 'monitor_echarts',
                meta: {
                    icon: 'el-icon-picture-outline',
                    title: '项目性能可视化',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/echarts/monitor_echarts/index.vue'),
            },
        ],
    },
    {
        path: '/admin/comment',
        name: 'admin-comment',
        meta: {
            icon: 'el-icon-chat-dot-square',
            title: 'im与游戏配置',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/common/list',
        children: [
            {
                path: 'comments',
                name: 'comments',
                meta: {
                    icon: 'el-icon-chat-dot-square',
                    title: '评论列表',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/comment/list/index.vue'),
            },
            {
                path: 'im_room_sys',
                name: 'im_room_sys',
                meta: {
                    icon: 'el-icon-chat-dot-square',
                    title: '聊天内容管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/im_room_sys/index.vue'),
            },
            {
                path: 'im_room',
                name: 'im_room',
                meta: {
                    icon: 'el-icon-chat-dot-square',
                    title: '聊天室管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/im_room/index.vue'),
            },
            {
                path: 'send_msg',
                name: 'send_msg',
                meta: {
                    icon: 'el-icon-chat-dot-square',
                    title: '寄语管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/send_msg/index.vue'),
            },
        ],
    },
    {
        path: '/admin/articles',
        name: 'admin-articles',
        meta: {
            icon: 'el-icon-document-copy',
            title: '文章管理',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/articles/class',
        children: [
            {
                path: 'class',
                name: 'article_class',
                meta: {
                    icon: 'el-icon-document-copy',
                    title: '分类管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/articles/class/index.vue'),
            },
            {
                path: 'article_admin_tag',
                name: 'article_admin_tag',
                meta: {
                    icon: 'el-icon-document-copy',
                    title: '文章标签管理',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/articles/article_admin_tag/index.vue'),
            },
        ],
    },
    {
        path: '/admin/ac',
        name: 'admin-ac',
        meta: {
            icon: 'el-icon-connection',
            title: '单页面管理',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/articles/class',
        children: [
            {
                path: 'ac_list',
                name: 'ac_list',
                meta: {
                    icon: 'el-icon-connection',
                    title: 'ac列表',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/ac/list/index.vue'),
            },
        ],
    },
    {
        path: '/admin/netdist',
        name: 'admin-netdist',
        meta: {
            icon: 'el-icon-sunset',
            title: '知崖网盘',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/articles/class',
        children: [
            {
                path: 'netdist_list',
                name: 'netdist_list',
                meta: {
                    icon: 'el-icon-sunset',
                    title: '资源列表',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/netdist/list/index.vue'),
            },
        ],
    },
    {
        path: '/admin/tool',
        name: 'admin-tool',
        meta: {
            icon: 'el-icon-s-tools',
            title: '工具管理',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/common/list',
        children: [
            {
                path: 'list',
                name: 'admin_list',
                meta: {
                    icon: 'el-icon-s-tools',
                    title: '资源列表',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/tool/list/index.vue'),
            }
        ],
    },
    {
        path: '/admin/sys_page',
        name: 'sys_page',
        meta: {
            icon: 'el-icon-setting',
            title: '控制台',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/sys_page/sys',
        children: [
            {
                path: 'sys',
                name: 'sys',
                meta: {
                    icon: 'el-icon-setting',
                    title: '控制台主页',
                    isToken: true,
                    isKeepLive: false,
                    roles: ['admin'],
                },
                component: () => import('@/views/admin/sys/index.vue'),
            },
        ],
    },
 
]

export { adminRouters }
