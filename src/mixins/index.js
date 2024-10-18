import { createMessage } from './tool/index.js'
import { getType } from './tool/tool'
import {baseURL} from "@/plugins/config.js"

// 自定义插件
import * as filters from './filters'
import * as directives from './directives'
import klImgs from './components/kl-imgs/index.vue'
import klUpload from './components/kl-upload/index.vue'
import klTab from './components/kl-tab/index.vue'
import klAnchor from './components/kl-anchor/index.vue'
import klAnchorItem from './components/kl-anchor/kl-anchor-item.vue'
import klSelect from './components/kl-select/index.vue'
import klBar from './components/kl-bar/index.vue'
import klNav from './components/kl-nav/index.vue'
import klNavItem from './components/kl-nav/kl-nav-item.vue'
import klProgress from './components/kl-progress/index.vue'
import klSvg from './components/kl-svg/index.vue'
import klMenu from './components/kl-menu/index.vue'
import klSteps from './components/kl-steps/index.vue'
import klStep from './components/kl-steps/kl-step.vue'
import klSwitch from './components/kl-switch/index.vue'
import klScroll from './components/kl-scroll/index.vue'

import klSwiper from './components/kl-swiper/index.vue'
import klSwiperItem from './components/kl-swiper/kl-swiper-item.vue'
import klEmoji from './components/kl-emoji/index.vue'
import klTable from './components/kl-table/index.vue'
import klCalendar from './components/kl-calendar/index.vue'
import klPreviewsVideo from './components/kl-previews-video/index.vue'

import klMessage from './components/kl-message/index.vue'

import klCtrlF from './components/kl_ctrl_f/index.vue'

// 单纯的博客项目全局组件
import comHeader from '@/components/comHeader'
import adminNav from '@/components/adminNav'
import klLogo from './components/kl-logo/index.vue'

// 雪花和文字效果
import klWordsFlake from './components/kl-snowflake'

// 评论列表
import commentList from '@/components/commentList'

// page的封装
import myPage from '@/components/myPage'

// 全局loading组件
import klLoading from '@/mixins/components/kl-loading/index.vue'

// 播放器
// import klVideo from '@/mixins/components/kl_video/index.vue'

// 弹窗
import klDialog from '@/mixins/components/kl_dialog/index.vue'

import APIS from '@/api/common.js'

let components = {
    // klVideo,
    klDialog,
    // 博客项目全局组件
    comHeader,
    adminNav,
    klWordsFlake,
    commentList,
    myPage,
    klLogo,

    // 公共组件
    klCtrlF,
    klPreviewsVideo,
    klCalendar,
    klTable,
    klEmoji,
    klSwiper,
    klSwiperItem,
    klSwitch,
    klStep,
    klSteps,
    klMenu,
    klSvg,
    klProgress,
    klNavItem,
    klNav,
    klBar,
    klSelect,
    klAnchorItem,
    klAnchor,
    klImgs,
    klUpload,
    klTab,
    klScroll,
}

// 创建方式
// 也可以传递参数，给props
const klmessage = (params) => {
    let type = getType(params)
    let message = ''
    let sleep = 3000
    if (type === 'string') {
        message = params
    } else if (type === 'object') {
        message = params.message || ''
        sleep = params.sleep || 3000
    }

    return createMessage(klMessage, { message, sleep })
}

const loading = () => {
    // 这儿一定要注意返回这个实例
    return createMessage(klLoading)
}

// 批量注册
let componentsRegister = import.meta.glob('./components/defaultRegister/*.vue')

// vComponents 对vant二次封装的组件库
let vComponents = import.meta.glob('./components/aComponents/*.vue')

componentsRegister = { ...componentsRegister, ...vComponents }

export default {
    install(Vue) {
        // 注册全局过滤器
        Object.keys(filters).forEach((key) => {
            Vue.filter(key, filters[key])
        })

        // 注册全局指令
        Object.keys(directives).forEach((k) => Vue.directive(k, directives[k]))

        // 批量注册一个文件夹下的组件
        for (const [key, value] of Object.entries(componentsRegister)) {
            // 这儿的name是文件名
            const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
            Vue.component(name, value)
        }

        // 注册全局组件
        Object.keys(components).forEach((k) => Vue.component(k, components[k]))

        // 向全局上挂载一个方法
        Vue.prototype.$klMessage = klmessage
        Vue.prototype.$klLoading = loading

        // 全局挂载变量
        Vue.prototype.isProd = process.env.NODE_ENV !== 'development'
        Vue.prototype.emojiBasePath =
            'https://image.zlketang.com/public/news/others/micro_group/emoji/'

        Vue.prototype.$apis = APIS
        Vue.prototype.baseURL = baseURL

        // Vue.use(vant.Lazyload)

        // 混入一个function 专门用来处理每页的 headers信息
        Vue.mixin({
            methods: {
                $seo(title, content, payload = []) {
                    return {
                        title,
                        meta: [
                            {
                                hid: 'descrition',
                                name: 'keywords',
                                content,
                            },
                            ...payload,
                        ],
                    }
                },
            },
        })

        // 重写elementUi的message方法 由于elementUi使用了缓存导入，所以需要使用延时
        // let timer = setInterval(() => {
        //     if (ELEMENT) {
        //         clearInterval(timer)
        //         timer = null
        //         let messageInstance = null
        //         const overrideMessage = (options) => {
        //             if (messageInstance) {
        //                 messageInstance.close()
        //             }
        //             messageInstance = ELEMENT.Message(options)
        //         }

        //         ['error', 'success', 'info', 'warning'].forEach((type) => {
        //             ELEMENT.Message[type] = (options) => {
        //                 if (typeof options === 'string') {
        //                     options = {
        //                         message: options,
        //                     }
        //                 }
        //                 options.type = type
        //                 return overrideMessage(options)
        //             }
        //         })

        //         Vue.prototype.$message = overrideMessage
        //     }
        // }, 100)
    },
}

export { loading }
