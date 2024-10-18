/***
 * 具体参数说明
 * cache:true 开启缓存,缓存时间默认5*60*1000毫秒
 * expire_time:必须先设置cache为true才会生效.如果传入负数就会清空缓存，重新拉取最新的数据
 * **/
import router from '@/router'
import { baseURL } from '@/plugins/config.js'
import { joinParams, isObject, getStore, setStore, removeStore,isNumber,getType,Toast } from '@/mixins/tool/tool.js'
import store from '@/store'

const EXPIRE_TIME = 5 * 60 * 1000 // 默认接口缓存时间
// 利用axios的cancelToken来取消请求
const CancelToken = axios.CancelToken

// 给所有get添加防抖 MINI_MUM_TIME内只能请求一次
const allGet = {}
// get请求缓存的key前缀
const PREFIX_KEY = 'all_get_'
// get最小请求间隔时间
const MINI_MUM_TIME = 1 * 1000

// 删除params中的cache和expire_time
const delParams = (params) => {
    if (!params) return params
    let { cache, expire_time, ...rest } = params
    return rest
}

const http = axios.create({
    baseURL: baseURL,
    timeout: 20 * 1000, // 请求超时时间
})

// 添加请求拦截器
http.interceptors.request.use(async function (config = {}) {
    if (!isObject(config)) {
        typeof ELEMENT !== 'undefined' &&
            ELEMENT.Message({
                type: 'error',
                message: 'config必须是对象',
                duration: 1000,
            })
        return
    }
    let { userdata = {}, token = '' } = store.state || {}
    if (token) {
        config.headers.Authorization = token
    }

    if (isObject(userdata) && userdata._id && !(isObject(config.params) && config.params.user_id)) {
        // 需要先判断原来没有
        config.url = config.url + `?user_id=${userdata._id}`
    }
    // 如果需要缓存--考虑到并不是所有接口都需要缓存的情况
    let { method = '', params = {}, url = '' } = config

    if (method === 'get' && isObject(params)) {
        let source = CancelToken.source()
        config.cancelToken = source.token

        let { expire_time = EXPIRE_TIME } = params
        let pullPath = joinParams(url, delParams(params))
        let currentTime = Date.now()
        let allGetPath = PREFIX_KEY + pullPath
        let { apiLastTime = 0, data = {} } = allGet[allGetPath] || {}
        // 读取allGet中
        if (currentTime - apiLastTime < MINI_MUM_TIME) {
            source.cancel({
                code: 400,
                msg: 'Do not operate frequently~',
                data: data,
            })
            return config
        }

        if (params.cache || isNumber(expire_time)) {
            // 去缓存池获取缓存数据
            let cacheDate = await getStore(
                pullPath,
                {},
                {
                    local: 'localforageAPI',
                },
            ).catch((e) => {
                return null
            })
            if (expire_time < 0) {
                // 如果传入负数就会清空缓存，重新拉取最新的数据
                try {
                    await removeStore(pullPath,{
                        local: 'localforageAPI',
                    })
                } catch (e) {}

                return config
            }
            // 获取当前时间戳
            let current_time = Date.now()
            // 判断缓存池中是否存在已有数据 存在的话 再判断是否过期
            // 未过期 source.cancel会取消当前的请求 并将内容返回到拦截器的err中
            if (cacheDate && current_time - cacheDate.expire < expire_time) {
                source.cancel(cacheDate)
            }
        }
    }

    // 在发送请求之前做些什么
    return config
})

// 添加响应拦截器
http.interceptors.response.use(
    async (response) => {
        // 只缓存get请求
        if (response.config.method === 'get' && response.config.params) {
            // 缓存数据 并将当前时间存入 方便之后判断是否过期
            let currrntTime = Date.now()
            let data = {
                expire: currrntTime,
                data: response.data,
            }
            let { url, params } = response.config
            let fullPath = joinParams(url, delParams(params))
            if (response.config.params.cache || isNumber(response.config.params.expire_time)) {
                await setStore(fullPath, data, {
                    local: 'localforageAPI',
                }).catch((e) => {})
            }

            let allGetPath = PREFIX_KEY + fullPath
            allGet[allGetPath] = {
                apiLastTime: currrntTime,
                data,
            }
        }

        // 对响应数据做点什么
        let { code } = response.data
        if ([401, 403].includes(+code)) {
            typeof ELEMENT !== 'undefined' &&
                ELEMENT.Message({
                    type: 'error',
                    message: (response.data && response.data.msg) || '请重新登录~',
                    duration: 1000,
                })
            // 清空缓存
            store.commit('setUserData', { user: {} })
            // 重定向到登录
            if (window.location.href.includes('/login')) return
            router.replace(`/login?path=${encodeURIComponent(window.location.href)}`)
            return
        }
        if (+code === 200) {
            return response.data
        }
        let arr = ['author/user_login_code']
        let { url } = response.config
        for (let i = 0; i < arr.length; i++) {
            if (url.includes(arr[i])) {
                return Promise.reject(response.data)
            }
        }

        if (typeof ELEMENT !== 'undefined') {
            let duration = 1000
            let message = '未设置错误提示信息~'
            if (
                response.data &&
                isObject(response.data.data) &&
                typeof response.data.data.message === 'string'
            ) {
                // model自动抛出的错误
                duration = 3000
                message = response.data.data.message
                    .replace('Mind validation failed:', '')
                    .replace('Validation failed: ', '')
            } else if (response.data) {
                // 接口设置的错误信息
                duration = 2000
                message = response.data?.msg
            }
            ELEMENT.Message({
                type: 'error',
                message,
                duration,
            })
        }

        return Promise.reject(response.data)
    },
    function (error) {
        if(getType(error) === 'error'){
            return Toast(error)
        }
        
        if (!error || !error.message) {
            // 对请求错误做些什么
            return Promise.reject(error)
        }
        let { code, msg, data } = error?.message || {}
        if (+code === 400) {
            ELEMENT.Message({
                type: 'warning',
                message: msg || '请求过于频繁，请稍后再试~',
                duration: 1000,
            })
            return Promise.resolve(data.data)
        }
        // 获取本地缓存的接口数据
        if (error && error.message && axios.isCancel(error)) {
            return Promise.resolve(error.message.data)
        }
    },
)

export default http
