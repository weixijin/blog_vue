import httpApi from '@/api/blog/admin.js'
import { getClasss } from '@/api/blog'
import { isPc, Toast, getStore, setStore } from '@/mixins/tool/tool.js'
export default {
    GET_COLLECTIONS_LIST: ({ state: { collectionList }, commit }, isInit = false) => {
        return new Promise((resolve, reject) => {
            let length = collectionList.length
            let params = {
                length,
                cache: true,
            }
            if (!isInit) {
                params.expire_time = -1
            }
            httpApi
                .get_collection_articles(params)
                .then((res) => {
                    if (res.data && Array.isArray(res?.data?.data)) {
                        let list = res.data.data.filter((item) => item.article_info)
                        list = list.map((item, index) => {
                            item.article_info.article_name =
                                index + 1 + '. ' + item.article_info.article_name
                            return item
                        })
                        commit('SET_COLLECTIONS_LIST_COMIT', list)
                    }
                    resolve()
                })
                .catch((err) => {
                    resolve()
                })
        })
    },

    // 获取配置信息
    GET_OPTIONS: ({ state: { options }, commit }) => {
        return new Promise((resolve, reject) => {
            httpApi
                .get_options()
                .then((res) => {
                    commit('SET_OPTIONS', res.data)
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    GET_NAV_LIST: ({ state: { navlist }, commit }, { isReload = false, ...other } = {}) => {
        return new Promise((resolve, reject) => {
            let params = {
                cache: true,
                ...other,
            }
            if (isReload) {
                params.expire_time = -1
            }
            getClasss(params)
                .then((res) => {
                    if (res && res.data && Array.isArray(res?.data?.list)) {
                        commit('SET_NAV_LIST', res.data.list)
                        resolve()
                    }
                    reject()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    // 同步用户信息，上传用户设备信息到服务器
    async POST_USER_SYNC({ state, commit }, reload = false) {
        let { email, password } = state.userdata
        if (!email || !password) return

        let params = {
            email,
            password,
            sync: 'sync',
        }

        if (!reload) {
            // 同步用户信息到服务器
            const POST_USER_SYNC_lastTime = await getStore('POST_USER_SYNC_lastTime', 0, {
                expire_time: 1000 * 30,
            })

            if (POST_USER_SYNC_lastTime !== 0) return
        }

        // 同步用户设备信息
        const userSTime = await getStore('userSTime', 0, {
            expire_time: 1000 * 60 * 60 * 24,
        })
        const currentTime = Date.now()

        setStore('POST_USER_SYNC_lastTime', currentTime)
        let data = {
            load_time: [],
            netInfo: {},
        }

        // 每一段时间才会上传一次用户信息到服务器
        if (userSTime === 0) {
            const performance_begin_time = sessionStorage.getItem('performance_begin_time') || 0
            const performance_created_time = sessionStorage.getItem('performance_created_time') || 0
            const performance_mounted_time = sessionStorage.getItem('performance_mounted_time') || 0

            if (performance_begin_time && performance_created_time && performance_mounted_time) {
                data.load_time = [
                    {
                        label: '加载到created时间',
                        value: performance_created_time - performance_begin_time,
                    },
                    {
                        label: '加载到mounted时间',
                        value: performance_mounted_time - performance_begin_time,
                    },
                    {
                        label: '页面完全加载时间',
                        value: currentTime - performance_begin_time,
                    },
                    {
                        label: '加载异步文件时间',
                        value: currentTime - performance_mounted_time,
                    },
                ]
            }

            // 网络情况
            let { downlink = '', effectiveType = '', rtt = '' } = navigator?.connection || {}
            const { appVersion = '' } = navigator || {}
            data.netInfo = [
                {
                    label: '网络速度',
                    value: downlink,
                },
                {
                    label: '网络类型',
                    value: effectiveType,
                },
                {
                    label: '网络延迟',
                    value: rtt,
                },
                {
                    label: '浏览器版本',
                    value: appVersion,
                },
                {
                    label: '终端',
                    value: isPc() ? 'PC端' : '移动端',
                },
            ]

            setStore('userSTime', currentTime)
        }

        params = {
            ...params,
            ...data,
        }
        httpApi
            .post_user_sync(params)
            .then((res) => {
                let { iolationsNumber, data } = res.data
                commit('setUserData', {
                    user: {
                        ...data,
                        iolationsNumber,
                    },
                })

                return true
            })
            .catch((e) => {
                Toast(e)
            })
    },
}
