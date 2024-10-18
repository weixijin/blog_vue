<template>
    <div id="app">
        <template v-if="!isLoading">
            <div class="bck-cover common_bck">
                <transition :name="transitionName" mode="out-in">
                    <keep-alive>
                        <router-view v-if="$route.meta.isKeepLive"></router-view>
                    </keep-alive>
                </transition>
                <transition :name="transitionName" mode="out-in">
                    <router-view v-if="!$route.meta.isKeepLive"></router-view>
                </transition>
            </div>

            <div class="dialog-color" v-if="dialog.isShow">
                <!-- 颜色弹窗 -->
                <div class="dialog-main">
                    <div class="flex-center">
                        请选择主题色: <input type="color" v-model="dialog.primaryColor" />
                    </div>
                    <br />
                    <el-button class="m-t-15" type="primary" @click="dialogColorHandle('close')"
                        >关闭</el-button
                    >
                </div>
            </div>

            <!-- 日历弹窗 -->
            <kl-calendar ref="calendarRef" v-if="isShowCalendar" />

            <!-- 游戏入口 -->
            <img
                v-if="isShowGame"
                class="game-img"
                @click="goGame"
                src="//image.zlketang.com/public/news/others/imgs/blog/49c0b2b7494e181df61c5eba0de91831.png"
            />

            <!-- 移动端顶部推荐组件 -->
            <recommendMobile v-model="showRecommend" />
            <!-- pc端右键菜单 -->
            <rightMenu v-if="isShowRightMenu"></rightMenu>
            <!-- 全局聊天室 -->
            <imApp v-if="isShowIm"></imApp>
        </template>
    </div>
</template>
<script>
import { LightDarkenColor } from '@/tool'
import { indexDBVersion } from '@/plugins/config.js'
import fileLoadingWorker from '@/workers/fileLoading.js?worker'
export default {
    components: {
        recommendMobile: () => import('@/components/recommendMobile/index.vue'),
        rightMenu: () => import('@/components/rightMenu/index.vue'),
        imApp: () => import('@/components/imApp/index.vue'),
    },
    name: 'app',
    data() {
        return {
            routeName: '',
            isLoading: true,
            showRecommend: false,
            isShowGame: false,
            isShowCalendar: false,
            dialog: {
                isShow: false,
                primaryColor: '#3399FF',
            },
            transitionName: '',
        }
    },
    computed: {
        ...Vuex.mapState(['userdata', 'userTags']),
        ...Vuex.mapGetters(['isLogin']),
        isShowRightMenu() {
            // pc，且是管理员,并且这个页面没有配置不需要
            return (
                this.isPc() &&
                this.isLogin &&
                this.userdata.role === 'admin' &&
                this.$route.meta.isNeedRightMenu !== false
            )
        },
        isShowIm() {
            return this.isPc() && this.isLogin && this.$route.meta.isShowIm !== false
        },
        isTourist() {
            return this.userdata?.role === 'tourist'
        },
    },
    watch: {
        $route: {
            handler(val, oldVal) {
                let { path, meta, name } = val || {}
                let { name: old_name } = oldVal || {}
                this.transitionName = ''
                let IS_PC = this.isPc()
                this.routeName = name
                if (!IS_PC) {
                    if (old_name === 'blog-page' && name === 'home') {
                        this.transitionName = 'slide-right'
                    }

                    if (name === 'blog-page' && old_name === 'home') {
                        this.transitionName = 'slide-left'
                    }
                }

                let { isShowCalendarPc, isShowGamePc, isShowCalendarMobile, isShowGameMobile } =
                    meta
                if (this.isPc()) {
                    // pc端默认不设置都显示
                    this.isShowCalendar = isShowCalendarPc === false ? false : true
                    this.isShowGame = isShowGamePc === false ? false : true
                } else {
                    // 移动端 必须设置才会显示
                    this.isShowCalendar = isShowCalendarMobile === true ? true : false
                    this.isShowGame = isShowGameMobile === true ? true : false
                }

                // 线上环境不显示游戏入口
                // if (!this.isDev()) {
                //     this.isShowGame = false
                // }
                this.SET_URL_PATH({ path, title: meta.title })
                this.SET_RP(false)
            },
            immediate: true,
        },
        'userdata.primary_color': {
            handler() {
                this.setPrimaryColor()
            },
            immediate: true,
        },
    },

    created() {
        sessionStorage.setItem('performance_created_time', Date.now())
    },
    async mounted() {
        sessionStorage.setItem('performance_mounted_time', Date.now())
        // 连接indexdb
        if (localforage) {
            // 获取当前数据库的版本
            const indexDBJS = localforage.createInstance({
                // 数据库名
                name: 'kl-db',
                // 表名
                storeName: 'js-table',
            })
            const indexDBIMG = localforage.createInstance({
                // 数据库名
                name: 'kl-db',
                // 表名
                storeName: 'img-table',
            })
            const indexDBAPI = localforage.createInstance({
                // 数据库名
                name: 'kl-db',
                // 表名
                storeName: 'api-table',
            })

            try {
                let version = await localforage.getItem('version')
                if (version !== indexDBVersion) {
                    console.log('indexdb版本修改，清空数据库')
                    localforage.clear()
                    indexDBJS.clear()
                    indexDBIMG.clear()
                    indexDBAPI.clear()
                    localforage.setItem('version', indexDBVersion)
                }
            } catch (e) {
                console.log('清空数据库失败', e)
            }

            // 向store下注入相关表对象
            // js缓存表
            this.SET_LOCALFORAGEJS(indexDBJS)
            // 图片缓存表
            this.SET_LOCALFORAGEIMG(indexDBIMG)
            // 接口缓存表
            this.SET_LOCALFORAGEAPI(indexDBAPI)
        }

        this.init()

        const defaultArr = [
            {
                js: 'https://image.zlketang.com/public/news/others/imgs/blog/js/element-ui.js',
                remove: false,
            },
            {
                js: 'https://image.zlketang.com/public/news/others/js/jquery-1.11.3.min.js',
                remove: false,
            },
        ]

        this.getIndexDBJS(defaultArr).finally(async () => {
            this.set_keyboardEventKay('')
            window.addEventListener('keydown', this.handleKeyboardEvent)
            if (!this.isLogin && this.$route.meta.isToken === true) {
                this.$confirm('你还没有登录，请先登录')
                    .then(() => {
                        this.$router.push('/login')
                    })
                    .catch((_) => {})
            } else {
                // 重新拉取登录信息
                this.POST_USER_SYNC()
                    .then(async (res) => {
                        await this.sleep(1000)
                        // 用户邮件推送提示
                        const { tipGoEmailDayStatus, tipGoEmailDayType } = this.userdata || {}
                        if (tipGoEmailDayStatus == 2 && tipGoEmailDayType == 2) {
                            const data = await this.$confirm('前往邮件中心...').catch(() => false)
                            if (data) {
                                // 更新用户信息
                                this.$apis
                                    .put_author({
                                        tipGoEmailDayType: 1,
                                    })
                                    .then((res) => {
                                        if (this.isObject(res.data)) {
                                            this.setUserData({
                                                user: res.data,
                                            })
                                        }
                                    })
                                    .catch((err) => {
                                        this.Toast(err)
                                    })
                                this.goTo('/normal/push_task')
                            }

                            // if (!this.isAdmin) {
                            //     const data = await this.$confirm('服务即将到期，请到新地址访问').catch(
                            //         () => false,
                            //     )
                            //     if(data){
                            //         this.goTo('aaa')
                            //     }
                        }
                    })
                    .catch((err) => {
                        this.Toast(err)
                    })
            }

            this.isLoading = false
            const arr = [
                {
                    isAppendHead: true,
                    css: '//image.zlketang.com/public/news/others/fonts/Courgette/Courgette.css',
                    remove: false,
                },
                {
                    js: '//at.alicdn.com/t/font_3007478_e0leb7nau17.js',
                    remove: false,
                },
                {
                    js: 'https://at.alicdn.com/t/font_3007478_ujgs0gnothg.js?spm=a313x.7781069.1998910419.59&file=font_3007478_ujgs0gnothg.js',
                    remove: false,
                },
            ]

            const pcArr = []
            const mobileArr = [
                {
                    isAppendHead: true,
                    css: 'https://image.zlketang.com/public/news/css/vant_index_2_12_25.min.css',
                    remove: false,
                },
                {
                    isAppendHead: true,
                    css: 'https://cdn.bootcdn.net/ajax/libs/Swiper/8.4.5/swiper-bundle.min.css',
                    remove: false,
                },
                {
                    js: '//image.zlketang.com/public/zl_wxpub/js/touch-emulator.js',
                    remove: false,
                },
                {
                    js: 'https://cdn.bootcdn.net/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js',
                    remove: false,
                },
                {
                    js: 'https://image.zlketang.com/public/news/js/vant_2_12_25.min.js',
                    remove: false,
                },
            ]
            let plugins = this.isPc() ? [...arr, ...pcArr] : [...arr, ...mobileArr]
            this.getIndexDBJS(plugins)

            // 注册线程
            // const THREAD_COUNT = navigator.hardwareConcurrency || 1
            // try {
            //     for (let i = 0; i < THREAD_COUNT; i++) {
            //         const work = new fileLoadingWorker()
            //         work.postMessage(i)
            //         work.onmessage = (e) => {
            //             // console.log('work-msg', e)
            //             // 销毁
            //             work.terminate()
            //         }
            //         work.onerror = (e) => {
            //             console.log('work-err', e)
            //             work.terminate()
            //         }
            //     }
            // } catch (err) {
            //     this.Toast(err)
            // }

            // 游客每次进入都需要提示去绑定邮箱
            if (this.isTourist) {
                this.$confirm(
                    '游客登录可能导致部分功能无法使用，请谨慎使用，是否前往个人中心完善信息，使用网站完整功能？',
                )
                    .then(() => {
                        this.goTo('/blog/user_center')
                    })
                    .catch(() => {})
            }
        })
    },

    methods: {
        ...Vuex.mapMutations([
            'SET_LOCALFORAGEAPI',
            'SET_LOCALFORAGEIMG',
            'SET_LOCALFORAGEJS',
            'SET_URL_PATH',
            'SET_IS_PC',
            'SET_OPTIONS',
            'setUserData',
            'SET_RP',
            'set_keyboardEventKay',
        ]),
        ...Vuex.mapActions(['GET_OPTIONS', 'POST_USER_SYNC']),

        // 全局键盘事件监听
        async handleKeyboardEvent(event) {
            if (event.key === 'Tab') {
                this.set_keyboardEventKay('tab')
                return
            }

            switch (event.keyCode) {
                case 83:
                    if (event.ctrlKey && event.code === 'KeyS') {
                        // 阻止直接保存网页,相当于现在全局的保存已经被禁用了
                        event.returnValue = false
                        this.set_keyboardEventKay('ctrl_s')
                    }
            }
        },

        // 前往游戏主页
        goGame() {
            if (!this.isLogin) {
                this.$confirm('您还没有登录，前往登录')
                    .then(() => {
                        this.$router.push('/login')
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '您取消了登录',
                        })
                    })

                return
            }
            this.goTo('/gameList')
        },
        // 关闭弹窗
        closeCandar() {
            this.$refs.calendarRef.close()
        },

        getParams() {},
        async setTags() {
            await this.$nextTick()
            let { userTags } = this
            if (!Array.isArray(userTags) || userTags.length === 0) return
            let tags = userTags.map((item) => item.tag_content)
        },
        watermark() {},
        init() {
            // 拿取推荐列表
            this.getRecommendList()

            if (!this.getNeedApi('get_options', this.routeName)) return
            this.GET_OPTIONS()
                .then((res) => {
                    this.postNeedApi('get_options')
                    this.setTags()
                })
                .catch((e) => {
                    console.log('获取配置失败', e)
                })
        },
        getRecommendList() {
            setTimeout(() => {
                if (!this.showRecommend && !this.isPc() && this.$route.meta.isToken === true) {
                    this.showRecommend = true
                }
            }, 5 * 60 * 1000)
        },
        // 设置默认的主题色
        setPrimaryColor() {
            let { primary_color } = this.userdata
            if (!primary_color) return
            document.getElementsByTagName('body')[0].style.setProperty('--primary', primary_color)
            let primary_0 = LightDarkenColor(primary_color)
            let primary_1 = LightDarkenColor(primary_color, 200)
            if (primary_0 && primary_1) {
                // 生成的淡色
                document.getElementsByTagName('body')[0].style.setProperty('--primary_0', primary_0)
                document.getElementsByTagName('body')[0].style.setProperty('--primary_1', primary_1)
            }
        },
        // 关闭颜色弹窗
        dialogColorHandle(type) {
            let obj = {
                close: () => {
                    this.dialog.isShow = false
                    localStorage.setItem(
                        'colorOption',
                        JSON.stringify({
                            primaryColor: this.dialog.primaryColor,
                        }),
                    )
                    document
                        .getElementsByTagName('body')[0]
                        .style.setProperty('--primary', this.dialog.primaryColor)
                },
            }

            if (Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },
    },
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html {
    min-width: 100vw;
}
body {
    max-width: 100vw;
    overflow: hidden;
    overflow-y: auto;
}
ul {
    list-style: none;
}
#app {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
.bck-cover {
    min-height: 100vh;
    max-height: 100vh;
    width: 100vw;
}

.snow-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100001;
}

.login-wrap .form {
    background: none !important;
}
.el-input {
    background: none !important;
}

$Color: #00a1d6;

.nav_title {
    height: 60px;
    line-height: 60px;
    color: #444;
    text-align: center;
    margin-bottom: 20px;
}

.el-cascader-menu {
    height: 200px !important;
}

.show-words {
    position: absolute;
    user-select: none;
    font-size: 20px;
}

.dialog-color {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    .dialog-main {
        width: 300px;
        height: 200px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
.common-footer {
    width: 100vw;
    height: 40px;
    background-color: #4a4c51;
    color: #fff;
    overflow: hidden;
}
.game-img {
    position: fixed;
    bottom: 120px;
    right: 30px;
    width: 66px;
    height: 66px;
    z-index: 10;
    cursor: pointer;
}
</style>
