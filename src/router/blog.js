// blog 相关的路由
const blogRouters = [
    {
        path: '/blog/common_im',
        name: 'common_im',
        meta: {
            title: '聊天室',
            isToken: true,
            isKeepLive: false,
            isShowCalendarPc:false,
            isShowGamePc:false,
            isShowIm:false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/blog/common_im/index.vue'),
    },
    {
        path: '/blog/message-board',
        name: 'message_board',
        meta: {
            title: '留言板',
            isToken: false,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/homepage/messageBoard'),
    },
    {
        path: '/blog/user_center',
        name: 'user_center',
        meta: {
            title: '个人中心',
            isToken: true,
            isKeepLive: true,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/homepage/user_center'),
    },
    {
        path: '/blog/about_me',
        name: 'blog-home',
        meta: {
            title: '个人页',
            isToken: false,
            isKeepLive: true,
            roles: ['admin'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/homepage/about_me'),
    },
    {
        path: '/blog/home',
        name: 'blog-home1',
        meta: {
            top: 0,
            title: 'blog主页',
            isToken: true,
            isKeepLive: true,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/blog/home/home/index.vue'),
    },

    {
        path: '/blog/page/:id',
        name: 'blog-page',
        meta: {
            title: 'blog浏览页',
            isToken: false,
            isKeepLive: false,
            isShowCalendarMobile: true,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/blog/home/page/index.vue'),
    },
    {
        path: '/blog/admin',
        name: 'blog-admin',
        meta: {
            title: 'blog后台文章分类',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/blog/admin/index.vue'),
    },
    {
        path: '/blog/admin_articles',
        name: 'blog-admin_articles',
        meta: {
            title: 'blog后台文章管理',
            isToken: true,
            isKeepLive: false,

            roles: ['admin'],
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '@/views/blog/admin/articles/index.vue'),
    },
    {
        path: '/blog/admin_article',
        name: 'blog-admin_article',
        meta: {
            title: 'blog文章具体修改',
            isToken: true,
            isKeepLive: false,
            // isNeedRightMenu:false,
            roles: ['admin'],
        },
        component: () => import('@/views/blog/admin/article/index.vue'),
    },
    {
        path: '/blog/im',
        name: 'blog_im',
        meta: {
            title: 'im主页',
            isToken: true,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/blog/im/index.vue'),
    },
    {
        path: '/blog/ac',
        name: 'blog_ac',
        meta: {
            title: 'ac主页',
            isToken: true,
            isKeepLive: false,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/ac/index.vue'),
    },
    {
        path: '/blog/collections',
        name: 'blog_collections',
        meta: {
            title: '收藏中心',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '@/views/blogCollections/index.vue'),
    },
    {
        path: '/blog/experience_record',
        name: 'experience_record',
        meta: {
            title: '心得记录',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '@/views/experience_record/index.vue'),
    },
    {
        path: '/blog/codeRun',
        name: 'codeRun',
        meta: {
            title: '代码执行',
            isToken: true,
            isKeepLive: false,
            roles: ['admin'],
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '@/views/blog/codeRun/index.vue'),
    },

    {
        path: '/blog/interview_test',
        name: 'interview_test',
        meta: {
            title: '面试',
            isToken: true,
            isKeepLive: true,
            isShowCalendarMobile: true,
            roles: ['admin', 'tourist', 'normal'],
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '@/views/blog/interview_test/index.vue'),
    },
    {
        path: '/blog/year_plan',
        name: 'year_plan',
        meta: {
            title: '年计划',
            isToken: true,
            isKeepLive: true,
            roles: ['admin'],
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '@/views/year_plan/index.vue'),
    },
]

export { blogRouters }
