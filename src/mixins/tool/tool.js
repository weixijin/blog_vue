import { baseURL } from '@/plugins/config'
import router from '@/router/index.js'
import { upload_imgs_im } from '@/api/blog/index.js'

import store from '@/store'
export function throttle(fn, delay = 100) {
    let time1 = 0
    return function () {
        let time2 = Date.now()
        if (time2 - time1 >= delay) {
            fn()
            time1 = time2
        }
    }
}

// 自动补全图片路径
export function parseResourceUrl(url) {
    if (!url || typeof url !== 'string') {
        return 'https://image.zlketang.com/public/news/others/imgs/book.jpg'
    }

    if (url.includes('https://') || url.includes('http://') || url.includes('127.0.0.1')) {
        return url
    }

    url = url.replace(/\\/g, '/')
    if (url.slice(0, 1) === '/') {
        return baseURL + url.slice(1)
    }
    return baseURL + url
}

// 图片压缩
export function compressImg(file, qualitys) {
    // 文件大小kb
    let fileSize = parseInt((file.size / 1024).toFixed(2))
    if (!qualitys) {
        qualitys = 1
        if (fileSize > 200) {
            qualitys = 0.95
        }
        if (fileSize > 500) {
            qualitys = 0.9
        }
        if (fileSize > 1024) {
            qualitys = 0.85
        }
        if (fileSize > 2 * 1024) {
            qualitys = 0.8
        }
        if (fileSize > 5 * 1024) {
            qualitys = 0.7
        }
    }

    if (file[0]) {
        return Promise.all(Array.from(file).map((e) => this.compressImg(e, qualitys))) // 如果是 file 数组返回 Promise 数组
    } else {
        return new Promise((resolve) => {
            if ((file.size / 1024).toFixed(2) < 300) {
                // 获取图片宽高
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (e) => {
                    const img = new Image()
                    img.src = e.target.result
                    img.onload = () => {
                        resolve({
                            file: file,
                            newWidth: img.width,
                            newHeight: img.height,
                        })
                    }
                }
            } else {
                const reader = new FileReader() // 创建 FileReader
                reader.onload = ({ target: { result: src } }) => {
                    const image = new Image() // 创建 img 元素
                    image.onload = async () => {
                        const canvas = document.createElement('canvas') // 创建 canvas 元素
                        const context = canvas.getContext('2d')
                        var targetWidth = image.width
                        var targetHeight = image.height
                        var originWidth = image.width
                        var originHeight = image.height
                        if (
                            1 * 1024 <= parseInt((file.size / 1024).toFixed(2)) &&
                            parseInt((file.size / 1024).toFixed(2)) <= 10 * 1024
                        ) {
                            var maxWidth = 1600
                            var maxHeight = 1600
                            targetWidth = originWidth
                            targetHeight = originHeight
                            // 图片尺寸超过的限制
                            if (originWidth > maxWidth || originHeight > maxHeight) {
                                if (originWidth / originHeight > maxWidth / maxHeight) {
                                    // 更宽，按照宽度限定尺寸
                                    targetWidth = maxWidth
                                    targetHeight = Math.round(
                                        maxWidth * (originHeight / originWidth),
                                    )
                                } else {
                                    targetHeight = maxHeight
                                    targetWidth = Math.round(
                                        maxHeight * (originWidth / originHeight),
                                    )
                                }
                            }
                        }
                        if (
                            10 * 1024 <= parseInt((file.size / 1024).toFixed(2)) &&
                            parseInt((file.size / 1024).toFixed(2)) <= 20 * 1024
                        ) {
                            maxWidth = 1400
                            maxHeight = 1400
                            targetWidth = originWidth
                            targetHeight = originHeight
                            // 图片尺寸超过的限制
                            if (originWidth > maxWidth || originHeight > maxHeight) {
                                if (originWidth / originHeight > maxWidth / maxHeight) {
                                    // 更宽，按照宽度限定尺寸
                                    targetWidth = maxWidth
                                    targetHeight = Math.round(
                                        maxWidth * (originHeight / originWidth),
                                    )
                                } else {
                                    targetHeight = maxHeight
                                    targetWidth = Math.round(
                                        maxHeight * (originWidth / originHeight),
                                    )
                                }
                            }
                        }
                        canvas.width = targetWidth
                        canvas.height = targetHeight
                        context.clearRect(0, 0, targetWidth, targetHeight)
                        context.drawImage(image, 0, 0, targetWidth, targetHeight) // 绘制 canvas
                        const canvasURL = canvas.toDataURL('image/jpeg', qualitys)
                        const buffer = atob(canvasURL.split(',')[1])
                        let length = buffer.length
                        const bufferArray = new Uint8Array(new ArrayBuffer(length))
                        while (length--) {
                            bufferArray[length] = buffer.charCodeAt(length)
                        }
                        const miniFile = new File([bufferArray], file.name, {
                            type: 'image/jpeg',
                        })
                        resolve({
                            file: miniFile,
                            origin: file,
                            beforeSrc: src,
                            afterSrc: canvasURL,
                            newWidth: targetWidth,
                            newHeight: targetHeight,
                            beforeKB: Number((file.size / 1024).toFixed(2)),
                            afterKB: Number((miniFile.size / 1024).toFixed(2)),
                        })
                    }
                    image.src = src
                }
                reader.readAsDataURL(file)
            }
        })
    }
}

// 64 => imgfile
function dataURLtoFile(base64Url, filename) {
    return new Promise((res) => {
        if (typeof base64Url !== 'string' || !base64Url) {
            return
        }
        let arr = base64Url.split(',')
        if (!isArrayLength(arr)) {
            return ''
        }
        try {
            let mime = arr[0]?.match(/:(.*?);/)[1] || ''
            let bstr = window.atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            res({
                file_: new File([u8arr], filename, { type: mime }),
            })
        } catch (err) {
            Toast(err)
            saveError(err)
        }
    })
}

// base64 => file
export function base64ToFile(base64Url, filename) {
    if (typeof base64Url !== 'string' || !base64Url) {
        return
    }
    let arr = base64Url.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = window.atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

// base64 => blob
export function base64ToBlob(base64, fileName) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

// blob => file
export function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date()
    theBlob.name = fileName
    return theBlob
}

// 创建id
function createId() {
    return 'kl_' + Math.random().toString(36).substr(2)
}

// sleep
export function sleep(time = 300) {
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, time)
    })
}

// 深拷贝
export function deepClone(data) {
    if (!['object', 'array'].includes(getType(data))) {
        return data
    }
    return JSON.parse(JSON.stringify(data))
}

// 深拷贝
export function deepCopy(data) {
    if (!['object', 'array'].includes(getType(data))) {
        return data
    }
    return JSON.parse(JSON.stringify(data))
}

// 定义一个处理时间的函数
// 参数说明
// 当传入参数是时间戳  记得转化类型 time-0
// datetime = new Date()
// datetime.setTime(time)  // 主要利用这个方法
export function moment(time, length) {
    // 当传入参数是 2021-11-23T06:29:11.699Z 或 时间戳
    let datetime = null
    if (time !== -1) {
        datetime = new Date(time)
    } else {
        datetime = new Date()
    }
    let year = datetime.getFullYear()
    let month = datetime.getMonth() + 1
    let date = datetime.getDate()
    let hour = datetime.getHours()
    if (hour <= 9) {
        hour = '0' + hour
    }
    let minute = datetime.getMinutes()
    if (minute <= 9) {
        minute = '0' + minute
    }
    let second = datetime.getSeconds()
    if (second <= 9) {
        second = '0' + second
    }

    if (length === 'year') {
        return year + '年' + month + '月' + date + '日'
    }

    if (length == 3) {
        return year + '-' + month + '-' + date
    }
    if (length === 'array') {
        return [year, month, date, hour, minute, second]
    }
    // let mseconds = datetime.getMilliseconds();
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second //+"."+mseconds;
}

/**
 * 取出Local方法
 * name 传入的名字
 * defaultType 默认类型
 * expire_time 过期时间 默认-1不过期
 * **/
export function getLocalStorage(name, defaultType = null, expire_time = -1) {
    if (getType(expire_time) !== 'number') {
        typeof ELEMENT !== 'undefined' && ELEMENT.Message.warning('过期时间必须是数字类型')
        return
    }
    if (getType(name) !== 'string' || !name) {
        typeof ELEMENT !== 'undefined' && ELEMENT.Message.warning('请传入获取的对象名')
        return
    }

    if (defaultType === null) {
        typeof ELEMENT !== 'undefined' &&
            ELEMENT.Message.warning('请传入默认获取类型，防止类型错误')
        return
    }
    let res = localStorage.getItem(name)
    if (!res) {
        return defaultType
    }
    let current_time = Date.now()
    let result = {}
    try {
        result = JSON.parse(res)
    } catch (e) {}
    let { save_time = 0, data } = result
    if (expire_time >= 0 && save_time && current_time - save_time > expire_time) {
        localStorage.removeItem(name)
        return defaultType
    }
    return getType(data) === getType(defaultType) ? data : defaultType
}

// 判断是否存在
export function isExist(data) {
    return ![null, undefined].includes(data)
}

// 存储
export function setLocalStorage(name, data) {
    if (!isExist(name) || !isExist(data)) {
        typeof ELEMENT !== 'undefined' && ELEMENT.Message.warning('请传入保存的对象名或数据')
        return
    }
    let result = JSON.stringify({
        save_time: Date.now(),
        data,
    })
    try {
        localStorage.setItem(name, result)
    } catch (e) {
        // 通常来说这里是因为存储空间满了，需要清除一些数据
        // 包含下面数组的key，将会被清除掉
        let keysKeyword = ['question']
        //如果出问题了，清除掉所有缓存的试题数据，并重新写入
        let examStorages = Object.keys(localStorage).filter((ckey) =>
            keysKeyword.some((item) => ckey.includes(item)),
        )

        examStorages.forEach((ckey) => {
            localStorage.removeItem(ckey)
        })
        localStorage.setItem(name, result)
    }
}

//  清除的
export function removeLocalStorage(name) {
    if (!name || getType(name) !== 'string') {
        typeof ELEMENT !== 'undefined' && ELEMENT.Message.warning('请传入删除的对象名')
        return
    }
    localStorage.removeItem(name)
}

// 存储 和 取出 清除的Session方法
export function getSessionStorage(name) {
    if (getType(name) !== 'string' || !name) return null
    let res = sessionStorage.getItem(name)
    if (!res) return null
    return JSON.parse(res)
}

export function setSessionStorage(name, data) {
    if (!name || !isExist(data)) return new Error('请传入保存的对象名或数据')
    sessionStorage.setItem(name, JSON.stringify(data))
}

// 获取变量类型
export function getType(val) {
    return Object.prototype.toString
        .call(val)
        .match(/\s.+/g)[0]
        .replace(/\]/g, '')
        .replace(/\[/g, '')
        .replace(/\s+/g, '')
        .toLowerCase()
}

// 处理参数
// obj 需要处理的对象
// limit_arr 只允许返回的字段数组
// obj 的属性必须是 字符串类型 不允许是number类型
export function filterQuery(obj = {}, limit_arr = [], deep = false) {
    if (!limit_arr.length) {
        limit_arr = Object.keys(obj)
    }
    let result = {}
    if (getType(obj) !== 'object' || getType(limit_arr) !== 'array') return {}
    for (const key in obj) {
        if (key && obj.hasOwnProperty(key) && limit_arr.includes(key)) {
            let keyVal = obj[key]
            let type = getType(keyVal)

            if (type === 'boolean') {
                result[key] = keyVal
            }
            if (type === 'string' && keyVal) {
                result[key] = keyVal
            }

            if (type === 'number') {
                result[key] = keyVal
            }

            if (type === 'array' && keyVal.length) {
                result[key] = keyVal
            }

            if (type === 'object' && Object.keys(keyVal).length) {
                if (deep) {
                    result[key] = filterQuery(keyVal, limit_arr)
                    if (!Object.keys(result[key]).length) {
                        delete result[key]
                    }
                } else {
                    result[key] = keyVal
                }
            }
        }
    }

    return result
}

// 判断是否登录
export function isLogin() {
    let { userdata, token } = store.state

    if (token && getType(userdata) === 'object' && userdata._id) {
        return true
    }

    return false
}

// ctrl-f效果
export function handleCtrlF(content = '', f_dom = 'body', c_dom = ['strong', 'h1', 'h2', 'h3']) {
    if (content.length > 0 && Array.isArray(c_dom) && c_dom.length > 0) {
        content = content.toLowerCase()
        // 先要清除原来的
        let els = $('.active-ctrl-mo-bg')
        if (els.length > 0) {
            for (let i = 0; i < els.length; i++) {
                let content = els.eq(i).html()
                // replaceWith() 方法用指定的 HTML 内容或元素替换被选元素
                els.eq(i).replaceWith(content)
            }
        }

        // 绑定新的
        for (let i = 0; i < c_dom.length; i++) {
            let allDomTop = []
            let domStr = c_dom[i]
            let regExp = new RegExp(content, 'g')

            $(f_dom + ' ' + domStr).each(function () {
                let html = $(this).html().toLowerCase()
                //不包含隐藏的HTML
                if (content.indexOf(content) >= 0 && html.indexOf(content) >= 0) {
                    if (
                        !content.includes('search-height-light-class') ||
                        $(this)[0].children.length == 0
                    ) {
                        let id = 'wxj-' + createId()
                        if ($(this) && $(this).offset()) {
                            let obj = {
                                id,
                            }

                            allDomTop.push(obj)

                            // 替换为高亮节点
                            let newHtml = html.replace(
                                regExp,
                                `<font id='${id}' class="active-ctrl-mo-bg">` + content + '</font>',
                            )
                            $(this).html(newHtml)
                        }
                    }
                }
            })
        }
    }
}

// 复制字符串 - 兼容复制\n
export function copyText(text) {
    return new Promise((res, rej) => {
        let isSuccess = false
        let el_div = document.createElement('div')
        let className = 'zl' + Math.random().toString(36).substr(2)
        el_div.className = className
        el_div.innerText = text
        el_div.style.opacity = '0'
        document.body.appendChild(el_div)
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            /*ios复制*/
            window.getSelection().removeAllRanges() //将页面所有的文本区域都从选区中移除
            let range = document.createRange() //创建一个文本区域
            range.selectNode(el_div) //将我们的所选节点添加到文本区域中
            /*上面经过测试不可以range.selectNode(node)*/
            window.getSelection().addRange(range) //将文本区域添加至选区中
            isSuccess = document.execCommand('Copy') //执行浏览器的复制命令
            window.getSelection().removeAllRanges() //最后再移除选区中的所有文本区域
        } else {
            /*下面是其他浏览器的复制*/
            let range = document.createRange() //创建一个文本区域
            range.selectNodeContents(el_div) //将我们的所选节点添加到文本区域中
            /*上面经过测试不可以range.selectNode(node)*/
            window.getSelection().removeAllRanges() //将页面所有的文本区域都从选区中移除
            window.getSelection().addRange(range) //将文本区域添加至选区中
            isSuccess = document.execCommand('Copy') //执行浏览器的复制命令
            window.getSelection().removeAllRanges() //最后再移除选区中的所有文本区域
        }
        // 移除节点
        document.body.removeChild(el_div)
        isSuccess ? res('复制成功') : rej('复制失败')
    })
}

// 判断是否是开发环境
export function isDev() {
    return process.env.NODE_ENV == 'development'
}

// 判断是否是谷歌内核
export function isWebkit() {
    return navigator.userAgent.indexOf('WebKit') > -1
}

// loading模块
export const klLoading = {
    open: (content = '加载中...', icon = '') => {
        let str = ` <div class="kl-loading-bg">
        <div class="kl-loading-main">
               ${content} 
        </div>
    </div>`
        if ($('.kl-loading-bg').length === 0) {
            $('body').append(str)
        }
    },
    close: () => {
        $('.kl-loading-bg').remove()
    },
}

// 是否是pc
export function isPc() {
    if (isDev()) {
        // 可视区宽度
        let clientWidth = document.documentElement.clientWidth
        if (clientWidth < 500) {
            return false
        }
    }
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return false
    }
    return true
}

// 判断是否导入过一个script,没有就导入
export function loadScript(url, isAppendHead = false) {
    if (!url) {
        return Promise.reject('failed')
    }
    // 防止重复加载
    if (document.querySelector(`script[src="${url}"]`)) {
        return Promise.resolve('successful')
    }

    return new Promise((resolve, reject) => {
        const scriptDom = document.createElement('script')
        scriptDom.setAttribute('src', url)
        scriptDom.setAttribute('type', 'text/javascript')
        document[isAppendHead ? 'head' : 'body'].appendChild(scriptDom)
        scriptDom.onload = () => {
            resolve('successful')
        }
        scriptDom.onerror = () => {
            resolve('failed')
        }
    })
}

// 添加o
export function addZero(value) {
    value = value - 0
    if (value < 10) {
        return '0' + value
    }
    return value
}

export function copy(obj) {
    if (!obj || (typeof obj === 'object' && Array.isArray(obj) === 'array')) {
        obj = {}
    }
    // randomId第一个字符必须为字母，才符合HTML标签id命令规范
    let randomId = 'a' + Math.random().toString(36).slice(-6)
    let textBox = document.createElement('textarea')
    textBox.style.opacity = 0
    textBox.id = randomId
    document.body.appendChild(textBox)
    let selectTextBox = document.getElementById(randomId)
    if (!selectTextBox) return
    selectTextBox.value = obj.data || ''
    selectTextBox.select()
    let isCopySuccess = document.execCommand('copy')
    if (isCopySuccess) {
        typeof obj.success === 'function' && obj.success()
    } else {
        typeof obj.fail === 'function' && obj.fail()
    }
    document.body.removeChild(selectTextBox)
}

// 判断文件类型
export function isFileType(file, arr) {
    let name = file.name?.toLowerCase() || ''
    let type = name.substring(name.lastIndexOf('.') + 1)

    if (!type) {
        return '文件类型不存在'
    }
    if (!arr.includes(type)) {
        return `文件类型不正确,请上传${arr.join('、')}类型的文件`
    }
}

// 判断文件大小
export function isFileSize(file, size = 10) {
    if (!file || !file.size) {
        return '文件不存在'
    }

    let fileSize = file.size / 1024 / 1024
    if (fileSize > size) {
        return `文件大小不能超过${size}M`
    }
}

/**
 * 懒加载方法
 * el img类名
 * scroll_el 滚动区域类名
 * number预先加载距离 值越大，越早加载
 * **/
export function lazyLoad({ el = 'lazy-img', scroll_el, number = 100 }) {
    if (!scroll_el) {
        scroll_el = window
    } else {
        scroll_el = document.querySelector(scroll_el)
    }
    let els = document.querySelectorAll(el)
    // scroll_el 距离顶部的距离
    let length = els.length

    if (length > 0) {
        // 定义一个节流函数
        let time1 = 0
        let n = 0 // 优化滚动时的次数
        const trolttle = (func, time = 200) => {
            let time2 = Date.now()
            if (time2 - time1 > time) {
                time1 = time2
                func()
            }
        }
        // 懒加载核心
        const scrollLazy = () => {
            // 获取scroll_el 距离顶部的距离
            let scroll_el_top = scroll_el.getBoundingClientRect().top
            // 滚动区域高度
            let viewH = scroll_el.clientHeight
            for (let i = n; i < length; i++) {
                let el_img = els[i]
                let el_img_top = el_img.getBoundingClientRect().top
                if (el_img_top - scroll_el_top - number < viewH) {
                    // 获取data-src的值
                    let data_src = el_img.getAttribute('data-src')
                    if (data_src) {
                        el_img.src = data_src
                        n++
                    }
                }
            }
        }

        scrollLazy()
        // 监听滚动事件
        scroll_el.addEventListener('scroll', () => {
            trolttle(scrollLazy, 300)
        })
    }
}

// 时间处理函数 klDateFormat()
export function klDateFormat(date, type = 'yyyy/MM/dd hh:mm:ss') {
    // 传入的格式为string: yyyy/MM/dd hh:mm:ss  array: '[yyyy,MM,dd,hh,mm,ss]'
    // date 必须是标准时间戳 type为返回类型 string 或者 array
    if (!date) {
        return date
    }
    if (isNaN(Number(date))) {
        return date
    }

    date = Number(date)
    const addZero = (num) => {
        return num < 10 ? '0' + num : num
    }
    let dateObj = new Date(date)
    let year = dateObj.getFullYear()
    let month = dateObj.getMonth() + 1
    let day = dateObj.getDate()
    let hour = dateObj.getHours()
    let minute = dateObj.getMinutes()
    let second = dateObj.getSeconds()

    let yyyy = year
    let MM = addZero(month)
    let M = month
    let dd = addZero(day)
    let d = day
    let hh = addZero(hour)
    let h = hour
    let mm = addZero(minute)
    let m = minute
    let ss = addZero(second)
    let s = second

    let all = {
        yyyy,
        MM,
        M,
        dd,
        d,
        hh,
        h,
        mm,
        m,
        ss,
        s,
    }

    if (type.includes('[') && type.includes(']')) {
        let arr = type.replace('[', '').replace(']', '').split(',')
        let result = []
        arr.forEach((item) => {
            result.push(eval(item))
        })
        return result
    }
    // 将传入的参数分开
    let join_str = ''
    let arr = []
    if (type.includes(' ')) {
        arr = type.split(' ')
        join_str = ' '
    } else {
        arr.push(type)
    }
    let result = ''
    arr.forEach((item) => {
        if (item.includes('/')) {
            let arr2 = item.split('/')
            arr2.forEach((item2, index) => {
                if (index == arr2.length - 1) {
                    result += all[item2]
                } else {
                    result += all[item2] + '/'
                }
            })
            result += join_str
        }
        if (item.includes('-')) {
            let arr2 = item.split('-')
            arr2.forEach((item2, index) => {
                if (index == arr2.length - 1) {
                    result += all[item2]
                } else {
                    result += all[item2] + '-'
                }
            })
            result += join_str
        }

        if (item.includes(':')) {
            let arr2 = item.split(':')
            arr2.forEach((item2, index) => {
                if (index == arr2.length - 1) {
                    result += all[item2]
                } else {
                    result += all[item2] + ':'
                }
            })
        }
    })
    return result
}

export function imgUrl() {
    return baseURL + 'ceshi/1.png'
}

// 加密
export function encodeParams(str) {
    try {
        str = encodeURIComponent(str)
        window.btoa(str)
        return str
    } catch (e) {
        return null
    }
}

// 解密
export function decodeParams(str) {
    if (typeof str !== 'string') {
        return null
    }
    try {
        str = window.atob(str)
        str = decodeURIComponent(str)
        return str
    } catch (e) {
        return null
    }
}

// 绘制矩形
export function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) {
        r = w / 2
    }
    if (h < 2 * r) {
        r = h / 2
    }
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#fff'
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
    ctx.beginPath()
}

// 单击事件模拟双击事件
export function dbClick(minTime = 500) {
    return new Promise((res) => {
        let number = 0
        let timer = null
        let getDbClickObj = sessionStorage.getItem('getDbClickObj_zl_2020')

        function saveDbClickObj() {
            sessionStorage.setItem(
                'getDbClickObj_zl_2020',
                JSON.stringify({
                    number,
                    timer,
                }),
            )
        }
        if (getDbClickObj) {
            getDbClickObj = JSON.parse(getDbClickObj)
            number = getDbClickObj.number
            timer = getDbClickObj.timer
        }
        number++

        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        timer = setTimeout(() => {
            // minTime ms内没有再次点击，清空number
            number = 0
            saveDbClickObj()
        }, minTime)

        if (number == 2) {
            // 是双击
            res()
            number = 0
            clearTimeout(timer)
            timer = null
        }

        saveDbClickObj()
    })
}

// 参数拼接
export function paramsJoin(params) {
    let str = ''
    for (let key in params) {
        str += key + '=' + params[key] + '&'
    }
    return str
}

// 拼接参数
export function joinParams(url, params) {
    let str = ''
    for (let key in params) {
        str += key + '=' + params[key] + '&'
    }
    // 判断url是否有参数
    if (url.includes('?')) {
        url += '&' + str
    } else {
        url += '?' + str
    }

    // 判断最后一个字符是否是&
    if (url[url.length - 1] == '&') {
        url = url.substring(0, url.length - 1)
    }
    return url
}

// klWow
export function klWow() {
    const getType = (val) => {
        return Object.prototype.toString
            .call(val)
            .match(/\s.+/g)[0]
            .replace(/\]/g, '')
            .replace(/\[/g, '')
            .replace(/\s+/g, '')
            .toLowerCase()
    }
    let params = arguments[0]
    // 判断类型是否是对象
    let type = getType(params)
    if (!['object'].includes(type)) {
        return new Error('参数必须是对象')
    }
    let {
        el, // 被监听的节点
        scrollContainer, // 滚动容器
        defaultAnimate, // 默认是否有动画
        infinite, // 是否每次滚动都执行
    } = params

    el = params.el || '.kl-wow'
    scrollContainer = scrollContainer || 'body'
    defaultAnimate = defaultAnimate === false ? false : true
    infinite = infinite === false ? false : true

    const scrollEvent = () => {
        let els = document.querySelectorAll(el)
        let scrollContainerEl = document.querySelector(scrollContainer)
        if (els.length === 0 || !scrollContainerEl) {
            return
        }

        for (let i = 0; i < els.length; i++) {
            let el = els[i]
            let el_top = el.getBoundingClientRect().top
            let scrollContainerEl_top = scrollContainerEl.getBoundingClientRect().top
            let scrollContainerEl_height = scrollContainerEl.clientHeight
            if (el_top > 0 && el_top - scrollContainerEl_top < scrollContainerEl_height) {
                // 进入可视区域
                let animate = el.getAttribute('data-animate') || 'fadeInUp'
                el.classList.add(animate)
            } else {
                if (infinite) {
                    let animate = el.getAttribute('data-animate') || 'fadeInUp'
                    el.classList.remove(animate)
                }
            }
        }
    }
    // 初始化
    if (defaultAnimate) {
        scrollEvent()
    }

    // 滚动事件
    let scrollContainerEl = document.querySelector(scrollContainer)
    if (!scrollContainerEl) {
        return
    }
    scrollContainerEl.addEventListener('scroll', scrollEvent)
}

// 是否是对象
export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

// 是否是数组
export function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}

// 图片预览
export function prevewImg(
    el,
    { transitionTime = 0.5, flyImgClass = '', zIndex = 1000 } = {},
    callback,
) {
    // 批量设置样式
    function setStyle(el, style) {
        for (let key in style) {
            el.style[key] = style[key]
        }
    }

    if (typeof el === 'string') {
        el = document.querySelector(el)
    }
    // 获取
    if (!el) return
    // 获取图片链接
    let imgUrl = el.getAttribute('src')
    if (!imgUrl) return
    // 保留原来的样式
    let { visibility } = el.style
    el.style.visibility = 'hidden'
    // 获取el的宽高
    let { width: width_old, height: height_old } = window.getComputedStyle(el)
    // 获取el在可视区的位置
    let { top, left } = el.getBoundingClientRect()
    // 获取可视区宽高
    let { clientHeight, clientWidth } = document.documentElement
    // 创建一个新的img
    let newImg = document.createElement('img')
    newImg.src = imgUrl
    let defaultClass = 'kl-prevew-img'
    newImg.className = flyImgClass ? defaultClass + '' + flyImgClass : defaultClass

    // 给预览图片设置初始的位置及大小（原来的图片大小与位置）
    setStyle(newImg, {
        width: width_old,
        height: height_old,
        position: 'fixed',
        top: 0 + 'px',
        left: 0 + 'px',
        transform: `translate(${left}px, ${top}px)`,
        zIndex,
        transition: `all ${transitionTime}s`,
        borderRadius: '5px',
        boxShadow: '0 0 5px #999',
        cursor: 'zoom-out',
        objectFit: 'cover',
    })

    // append到body
    document.body.appendChild(newImg)
    // 获取图片的真实宽高
    let img = new Image()
    img.src = imgUrl
    img.onload = () => {
        // 创建蒙层
        let mask = document.createElement('div')
        setStyle(mask, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: zIndex - 1,
            background: 'rgba(0,0,0,0.5)',
            cursor: 'zoom-out',
            transition: `all ${transitionTime}s`,
        })
        document.body.appendChild(mask)
        let { width, height } = img
        // 限制宽高不能超出可视区的95%，且图片不能变形，需要完整展示
        let maxWidth = clientWidth * 0.95
        let maxHeight = clientHeight * 0.95
        let ratio = width / height
        if (width > maxWidth) {
            width = maxWidth
            height = width / ratio
        }
        if (height > maxHeight) {
            height = maxHeight
            width = height * ratio
        }
        // 计算新的位置
        let newTop = (clientHeight - parseInt(height)) / 2
        let newLeft = (clientWidth - parseInt(width)) / 2

        // 给预览图片设置新的居中位置
        setStyle(newImg, {
            // top: newTop + 'px',
            // left: newLeft + 'px',
            transform: `translate(${newLeft}px, ${newTop}px)`,
            width: width + 'px',
            height: height + 'px',
        })

        // 防止重复触发
        let isFlag = false
        // 关闭预览相关方法
        let timer = setTimeout(() => {
            mask.addEventListener('click', closePrevew)
            newImg.addEventListener('click', closePrevew)
            // 鼠标滚轮事件触发也需要关闭
            document.addEventListener('mousewheel', closePrevew)
            document.addEventListener('DOMMouseScroll', closePrevew)
        }, transitionTime * 1000)

        function closePrevew() {
            if (isFlag) return
            isFlag = true
            // 使用动画移除蒙层及图片
            mask.style.opacity = 0
            // 图片要移动到原来的位置
            setStyle(newImg, {
                // top: top + 'px',
                // left: left + 'px',
                transform: `translate(${left}px, ${top}px)`,
                width: width_old,
                height: height_old,
                borderRadius: '5px',
                boxShadow: '0 0 5px #f0f0f0',
            })

            timer = setTimeout(() => {
                // 移除蒙层
                document.body.removeChild(mask)
                document.body.removeChild(newImg)
                // 图片显示
                el.style.visibility = visibility
                clearTimeout(timer)
                timer = null
                callback && callback('finished')
            }, transitionTime * 1000)
        }
    }
    img.onerror = () => {
        // 直接关闭
        document.body.removeChild(newImg)
    }
}

// 获取具体星期几
export function getWeek(year, month, day) {
    let week = new Date(`${year}/${month}/${day} 00:00:00`).getDay()
    return week == 0 ? 7 : week
}

/**
 * 通过年月获取当月的天数
 * y 年
 * m 月
 * **/
export function getMonthDays(y, m) {
    let d = new Date(y, m, 0)
    return d.getDate()
}

/**
 * 封装一个删除页面indexDB中的文件的方法
 * arr 需要动态加载的文件数组 示例 [{js:'aaa.js',isAppendHead:true},{css:'aaa.css'}]
 */

// 被销毁的加载
let delArr = []
export async function delPageScript(arr) {
    if (!isArray(arr)) return
    delArr = arr
    // 这儿设置1s是为了不用去重，而且只是保证连续的两个页面使用到相同的插件不需要重复的删除与加载
    // await sleep(1000)
    delArr.forEach((item) => {
        // 找出data-url的节点
        let url = item.js ? item.js : item.css
        if (!url) return
        if (item.js) {
            let el = document.querySelector(`script[data-url="${url}"]`)
            // 删除
            if (el) {
                el.remove()
            }
            return
        }

        if (item.css) {
            let el = document.querySelector(`link[data-url="${url}"]`)
            // 删除
            if (el) {
                el.remove()
            }
            return
        }
    })
}

/**
 * 封装一个动态加载js，并会将请求回来的文件保存到indexDB中的方法
 * arr 需要动态加载的文件数组 示例 [{js:'aaa.js',isAppendHead:true},{css:'aaa.css'}]
 */
export function getIndexDBJS(arr, localforage, saveIndexdb = true) {
    if(!Array.isArray(arr)){
        Toast('getIndexDBJS第一个参数必须为数组')
        return
    }
    if (!localforage) {
        localforage = store.state.localforageJS
    }
    if (!localforage || !localforage.getItem) {
        return Promise.reject('localforage 不存在')
    }
    // 将blob对象转换为base64
    function blobToBase64(blobFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(blobFile)
            reader.onload = (e) => {
                const res = e.target.result
                resolve(res)
            }

            reader.onerror = (e) => {
                reject(e)
            }
        })
    }

    // 将文件注入到页面 type: js/css
    function loadScript(url, row, ceate_time, remove = true, size = 0) {
        let { isAppendHead = false, js, css } = row
        let type = css ? 'css' : 'js'
        if (!url) {
            return Promise.reject('failed')
        }
        // 防止重复加载
        if (
            (type === 'js' && document.querySelector(`script[data-url="${js}"]`)) ||
            (type === 'css' && document.querySelector(`link[data-url="${css}"]`))
        ) {
            return Promise.resolve('successful')
        }

        // 找出所有 load_indexdb="true" 的元素
        let load_indexdb_list1 = document.querySelectorAll('[load_indexdb="false"]') || []
        let load_indexdb_list2 = document.querySelectorAll('[load_indexdb="true"]') || []
        let load_indexdb_list = [...load_indexdb_list1, ...load_indexdb_list2]
        // 获取所有的size
        let totalSize = 0
        load_indexdb_list.forEach((item) => {
            totalSize += Number(item.getAttribute('size'))
        })
        const oneM = 1024 * 1024
        // 设置页面最大缓存的base64，css与js 大小不能超过4M
        if (totalSize + size > 4 * oneM) {
            // 自动删除最近的load_indexdb="true"的
            if (load_indexdb_list2.length) {
                load_indexdb_list2 = Array.from(load_indexdb_list2)
                const arr2 = load_indexdb_list2
                    .map((item) => {
                        return {
                            ceate_time: item.getAttribute('ceate_time'),
                            url: item.getAttribute('data-url'),
                        }
                    })
                    .sort((a, b) => {
                        return a.ceate_time - b.ceate_time
                    })
                const url = arr2[0].url
                delPageScript([
                    {
                        [type]: url,
                    },
                ])
            }
        }

        return new Promise((resolve, reject) => {
            let scriptDom = ''
            if (type === 'js') {
                scriptDom = document.createElement('script')
                scriptDom.setAttribute('src', url)
                scriptDom.setAttribute('data-url', js)
                scriptDom.setAttribute('type', 'text/javascript')
                scriptDom.setAttribute('ceate_time', ceate_time)
                scriptDom.setAttribute('load_indexdb', remove)
                scriptDom.setAttribute('size', size)
            }

            if (type === 'css') {
                scriptDom = document.createElement('link')
                scriptDom.setAttribute('href', url)
                scriptDom.setAttribute('data-url', css)
                scriptDom.setAttribute('rel', 'stylesheet')
                scriptDom.setAttribute('ceate_time', ceate_time)
                scriptDom.setAttribute('load_indexdb', remove)
                scriptDom.setAttribute('size', size)
            }
            document[isAppendHead ? 'head' : 'body'].appendChild(scriptDom)
            scriptDom.onload = () => {
                resolve('successful')
            }
            scriptDom.onerror = () => {
                console.log('加载失败', row)
                resolve('failed')
            }
        })
    }
    let arr1 = []
    arr.forEach((element) => {
        let url = element.js ? element.js : element.css
        // 先判断即将移除是否是新增的
        if (delArr.some((item) => item.css === url || item.js === url)) {
            // delArr 移除这个
            delArr = delArr.filter((item) => item.css !== url && item.js !== url)
            return arr1.push(Promise.resolve(true))
        }
        arr1.push(
            localforage
                .getItem(url)
                .then(async (res) => {
                    if (res) {
                        await loadScript(
                            res.file,
                            element,
                            res.ceate_time,
                            element.remove,
                            res.size,
                        )
                        return true
                    }
                    await loadScript(url, element, Date.now(), element.remove)

                    if (saveIndexdb === false) return true
                    fetch(url)
                        .then((response) => response.blob())
                        .then(async (res) => {
                            const { size = 0 } = res || {}
                            try {
                                let file = await blobToBase64(res)
                                // 保存
                                localforage.setItem(url, {
                                    ceate_time: Date.now(),
                                    size,
                                    file,
                                    remove: element.remove || false,
                                })

                                // 获取对应的节点设置size
                                const dom = document.querySelector(`[data-url="${url}"]`)
                                dom.setAttribute('size', size)
                            } catch (err) {
                                return false
                            }
                        })
                        .catch((err) => {
                            return false
                        })
                })
                .catch((err) => {
                    console.log('getData-err', err)
                }),
        )
    })

    // 将所有的注入返回
    return Promise.all(arr1)
}

/**
 * 封装一个动态加载图片，并会将请求回来的文件保存到indexDB中的方法
 * imgs 参数格式 1、字符串 2、对象
 * ***/
export async function getIndexDBIMJ(imgs, localforage) {
    if (!localforage) {
        localforage = store.state.localforageIMG
    }
    let type = typeof imgs

    // 将blob对象转换为base64
    function blobToBase64(blobFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(blobFile)
            reader.onload = (e) => {
                const res = e.target.result
                resolve(res)
            }

            reader.onerror = (e) => {
                reject(e)
            }
        })
    }

    if (type === 'string') {
        let res = await localforage.getItem(imgs)

        if (res) {
            return res
        }
        fetch(imgs)
            .then((response) => response.blob())
            .then(async (res) => {
                try {
                    let file = await blobToBase64(res)
                    localforage.setItem(imgs, file)
                } catch (e) {}
            })
        return imgs
    }

    let imgsArr = Object.keys(imgs)
    imgsArr.forEach(async (item) => {
        const url = imgs[item]
        let res = await localforage.getItem(url)
        if (res) {
            this[item] = res
            return
        }
        this[item] = url
        fetch(url)
            .then((response) => response.blob())
            .then(async (res) => {
                try {
                    let file = await blobToBase64(res)
                    localforage.setItem(url, file)
                } catch (e) {}
            })
    })
}

export function updateQueryStringParameter(key, value) {
    let uri = window.location.href
    // 先去除末尾的&
    if (uri[uri.length - 1] === '&') {
        uri = uri.slice(0, uri.length - 1)
    }
    if (value === null) {
        let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
        uri = uri.replace(re, '$1')
        if (uri[uri.length - 1] === '?') {
            uri = uri.slice(0, uri.length - 1)
        }
        return uri
    }
    if (!value) {
        return uri
    }
    let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
    let separator = uri.indexOf('?') !== -1 ? '&' : '?'
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + '=' + value + '$2')
    } else {
        return uri + separator + key + '=' + value
    }
}
export function updateUrl(key, value) {
    let newurl = this.updateQueryStringParameter(key, value)
    window.history.replaceState(
        {
            path: newurl,
        },
        '',
        newurl,
    )
}

export function getQuery(url) {
    if (!url) {
        url = window?.location?.href || ''
    }
    let query = {}

    if (url && typeof url === 'string') {
        let q_str = url.split('?')[1]
        if (q_str) {
            let arr = q_str.split('&')
            if (Array.isArray(arr) && arr.length > 0) {
                arr.forEach((item) => {
                    let arr1 = item.split('=')
                    query[arr1[0]] = arr1[1]
                })
            }
        }
    }
    return query
}

/**
 * description 判断一个数组是否长度大于0
 * @param {Array} arr 需要判断的数组
 * @param {Boolean,String} message 是否提示信息
 */
export function isArrayLength(arr, message = false) {
    let arrType = getType(arr)
    let messageType = getType(message)
    let isFlag = arrType === 'array' && arr.length > 0
    if (!isFlag) {
        if (message === true) {
            typeof ELEMENT !== 'undefined' && ELEMENT.Message.warning('请传入数组并且长度大于0')
        } else if (messageType === 'string' && message) {
            typeof ELEMENT !== 'undefined' && ELEMENT.Message.warning(message)
        }
    }
    return isFlag
}

/**
 * 判断是否应该调用接口 白名单下的直接调用
 * @param {String} api_name 接口名字
 * @param {String} router_name 当前路由名字
 * @param {Array} routers_name 白名单路由名字
 * @param {Number} time 过期时间
 *
 * **/
export function getNeedApi(api_name = '', router_name, routers_name = [], time = 5 * 60 * 1000) {
    if (routers_name.includes(router_name)) {
        return true
    }
    let isFlag = false
    let now = Date.now()
    let needApi = sessionStorage.getItem(`needApi_${api_name}`)
    if (needApi) {
        needApi = JSON.parse(needApi)
        if (needApi.time && now - needApi.time > time) {
            isFlag = true
        }
    } else {
        isFlag = true
    }
    return isFlag
}

/**
 * 新增api访问记录
 * @param {String} api_name 接口名字
 * **/
export function postNeedApi(api_name = '') {
    let now = Date.now()
    sessionStorage.setItem(`needApi_${api_name}`, JSON.stringify({ time: now }))
}

/**
 * 找出链接中的参数
 * @author wxj
 * @datetime 2022-03-10 16:15:00
 * @param {string} queryString - 一个查询字符串.
 * @returns {object} - 返回一个对象.
 */
export function qsParse(queryString) {
    if (typeof queryString !== 'string') {
        return {}
    }
    let arr = queryString.match(/[^&=#?]+=[^&=#?]+/g)
    if (arr === null) {
        return {}
    }
    arr = arr.map((item) => {
        return { key: item.split('=')[0], value: item.split('=')[1] }
    })
    // 重新组装数据
    let result = {}
    arr.forEach((item) => {
        let { key, value } = item
        let allKeys = key.match(/[^\[\]]+/g)
        // 连续创建对象
        if (allKeys.length === 1) {
            // 存在一个key
            result[key] = decodeURIComponent(value)
        } else {
            // 递归创建对象或数组
            let lastValue = result // 存取上次递归得到的对象或数组
            let len = allKeys.length
            for (let i = 0; i < len - 1; i++) {
                let current = allKeys[i]
                let next = allKeys[i + 1]
                if (lastValue[current] === undefined) {
                    lastValue[current] = isNaN(next) ? {} : []
                    lastValue = lastValue[current]
                }
                if (lastValue[current]) {
                    lastValue = lastValue[current]
                }
            }
            let lastKey = allKeys[len - 1]
            lastValue[lastKey] = decodeURIComponent(value)
        }
    })
    return result
}

/**
 * 将对象生成查询字符串.
 * @author wxj
 * @datetime 2022-03-10 16:15:00
 * @param {object} obj - 一个对象.
 * @returns {string} - 返回一个查询字符串.
 */
export function qsStringify(obj) {
    let result = [] //用于存放所有键值对字符串
    if (!isObject(obj)) {
        return ''
    }
    // 遍历数组或对象
    let traverse = function (o, lastKey = '') {
        if (getType(o) === 'object') {
            Object.keys(o).forEach((key) => {
                let item = o[key]
                let subType = getType(item)
                if (['object', 'array'].includes(subType)) {
                    let keyValue = lastKey ? `${lastKey}[${key}]` : `${key}`
                    traverse(item, keyValue)
                } else {
                    if (['undefined', 'null', 'function'].includes(subType)) {
                        item = ''
                    }
                    let keyValue = lastKey
                        ? `${lastKey}[${key}]=${encodeURIComponent(item)}`
                        : `${key}=${encodeURIComponent(item)}`
                    result.push(keyValue)
                }
            })
        }
        if (getType(o) === 'array') {
            o.forEach((item, index) => {
                let subType = getType(item)
                if (['object', 'array'].includes(subType)) {
                    let keyValue = `${lastKey}[${index}]`
                    traverse(item, keyValue)
                } else {
                    if (['undefined', 'null', 'function'].includes(subType)) {
                        item = ''
                    }
                    let keyValue = `${lastKey}[${index}]=${encodeURIComponent(item)}`
                    result.push(keyValue)
                }
            })
        }
    }
    traverse(obj)
    return result.join('&')
}

/**
 * 页面跳转函数goTo()
 * @author wxj
 * @datetime 2022年3月14日11:30:07
 * @param {string} url - 跳转地址.
 * @param {object} options - 配置项：{query: {}, delay: 1000,replace: true|false, target: _blank|_self,openNew:false}.
 * @returns {object} - 返回一个对象.
 */
export function goTo(url, options = {}) {
    if (!url || typeof url !== 'string') {
        Toast('url参数错误')
        return
    }
    if (!isObject(options)) {
        Toast('options参数错误')
        return
    }
    let { query = {}, replace = false, target = '_self' } = options

    // 链接中的参数
    let urlIncludeParams = qsParse(url)
    // 组装query中的参数及去掉参数中值为undefined
    query = qsParse(qsStringify(query))
    // 合并参数
    let combineParams = { ...urlIncludeParams, ...query }
    let queryString = qsStringify(combineParams)
    // 重新拼接链接
    let jumpUrl = url.split('?')[0] + (queryString ? '?' + queryString : '')

    let arr = ['http', 'https']
    // 判断是否是完整的链接
    let isFlag = arr.some((item) => jumpUrl.startsWith(item))

    if (target === '_blank') {
        if (isFlag) {
            window.open(jumpUrl, '_blank')
            return
        }
        let routeUrl = router.resolve({
            path: jumpUrl,
        })
        window.open(routeUrl.href, '_blank')
        return
    }

    if (replace) {
        isFlag ? location.replace(jumpUrl) : router.replace(jumpUrl)
        return
    }
    isFlag ? (location.href = jumpUrl) : router.push(jumpUrl)
}

/**
 * 生成水印背景图片函数useWatermarkBg()
 * deg: 旋转角度
 * text: 文字
 * fontSize: 字体大小
 * gap: 间距
 */
export function useWatermarkBg(props = {}) {
    let {
        deg = 45,
        text = 'blog',
        fontSize = 24,
        gap = 80,
        fillStyle = 'rgba(0, 0, 0, 0.3)',
    } = props
    // 创建一个 canvas
    const canvas = document.createElement('canvas')
    const devicePixelRatio = window.devicePixelRatio || 1
    // 设置字体大小
    fontSize = fontSize * devicePixelRatio
    const font = fontSize + 'px serif'
    const ctx = canvas.getContext('2d')
    // 获取文字宽度
    ctx.font = font
    const { width } = ctx.measureText(text)
    const canvasSize = Math.max(100, width) + gap * devicePixelRatio
    canvas.width = canvasSize
    canvas.height = canvasSize
    ctx.translate(canvas.width / 2, canvas.height / 2)
    // 旋转 45 度让文字变倾斜
    ctx.rotate((Math.PI / 180) * -deg)
    ctx.fillStyle = fillStyle
    ctx.font = font
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // 将文字画出来
    ctx.fillText(text, 0, 0)
    return {
        base64: canvas.toDataURL(),
        size: canvasSize,
        styleSize: canvasSize / devicePixelRatio,
    }
}

/**
 * indexdb存储函数getStore()
 * name 存储名称
 * defaultType 获取不到数据时的默认值
 * local 存储类型，normal为正常存储，localforageAPI为使用localforageAPI存储
 * expire_time 缓存时长 ms
 * **/
export async function getStore(
    name,
    defaultValue = {},
    { local = 'normal', expire_time = -1 } = {},
) {
    let result = null
    try {
        if (getType(expire_time) !== 'number') {
            typeof ELEMENT !== 'undefined' && ELEMENT.Message.warning('过期时间必须是数字类型')
            return
        }

        if (local === 'localforageAPI') {
            if (!store.state.localforageAPI || !store.state.localforageAPI.getItem) {
                return Promise.reject('localforageAPI is not defined')
            }
            result = (await store.state.localforageAPI.getItem(name)) || {}
        }

        if (local === 'normal') {
            result = (await localforage.getItem(name)) || {}
        }

        const defaultType = getType(defaultValue)
        const { save_time = 0, data } = result
        if (getType(data) !== defaultType) {
            // 与预期数据类型不同
            return defaultValue
        }
        if (expire_time >= 0 && save_time && Date.now() - save_time > expire_time) {
            // 过期了
            return defaultValue
        }

        return data
    } catch (e) {
        Toast(e)
        return Promise.reject(e)
    }
}

/**
 * indexdb存储函数setStore()
 * name 存储名称
 * data 存储数据
 * local 存储类型，normal为正常存储，localforageAPI为使用localforageAPI存储
 * **/
export async function setStore(name, data, { local = 'normal' } = {}) {
    try {
        const saveData = {
            save_time: Date.now(),
            data,
        }
        if (local === 'localforageAPI') {
            if (!store.state.localforageAPI || !store.state.localforageAPI.setItem) {
                return Promise.reject('localforageAPI is not defined')
            }
            await store.state.localforageAPI.setItem(name, saveData)
        }

        if (local === 'normal') {
            await localforage.setItem(name, saveData)
        }
    } catch (e) {
        return Promise.reject(e)
    }
}

export async function removeStore(name, { local = 'normal' } = {}) {
    if (local === 'localforageAPI') {
        if (!store.state.localforageAPI || !store.state.localforageAPI.removeItem) {
            return Promise.reject('localforageAPI is not defined')
        }
    }
    try {
        if (local === 'localforageAPI') {
            await store.state.localforageAPI.removeItem(name)
        }
        if (local === 'normal') {
            await localforage.removeItem(name)
        }
    } catch (e) {
        return Promise.reject(e)
    }
}

// isios()
export const isIOS = () => {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
}

/**
 * 公共上传图片方法（相比下面的上传文件方法，多了压缩与获取图片宽高）
 * @param {*} oldFile  文件信息
 * @param {*} type     服务器的存储位置
 * @param {*} minSize  最小产生loading的文件大小
 * @returns
 */
export function commonUploadImg(oldFile, type, minSize = 500) {
    return new Promise(async (resolve, reject) => {
        let { size } = oldFile
        // 对于大于200k的图片添加一个loading
        const currentSize = size / 1024
        let loading = null
        if (currentSize > minSize) {
            loading = this.$klLoading()
        }
        try {
            let { file: miniFile, newWidth, newHeight } = await compressImg(oldFile)
            const formData = new FormData()
            formData.append('file', miniFile)
            const devicePixelRatioa = window.devicePixelRatio || 1

            // 上传图片，同时需要上传图片的宽高
            upload_imgs_im(formData, {
                type,
                devicePixelRatioa,
                width: Math.floor(newWidth / devicePixelRatioa),
                height: Math.floor(newHeight / devicePixelRatioa),
            }).then((res) => {
                const { filename } = res.data.files[0] || {}
                resolve({ url: `/${type}/` + filename })
            })
        } catch (err) {
            this.Toast(err)
            reject()
        }
        loading && loading.close()
    })
}

/**
 * 公共上传通用文件的方法
 * @param {*} oldFile  文件信息
 * @param {*} type     服务器的存储位置
 * @param {*} minSize  最小产生loading的文件大小
 * @param {*} needPoster   对于视频需要上传封面图，这个用于获取封面图
 * @returns
 * */
export function commonUploadFile(oldFile, type, minSize = 500, needPoster = false) {
    return new Promise(async (resolve, reject) => {
        let { size = 0 } = oldFile
        // 对于大于minSize的图片添加一个loading
        let loading = null
        if (size / 1024 > minSize) {
            loading = this.$klLoading()
        }
        const formData = new FormData()
        formData.append('file', oldFile)

        // 封面图对象
        let preImg = {}
        if (needPoster) {
            try {
                // 获取文件的缓存地址
                const file_path = getObjectURL(oldFile)
                // 获取视频首帧的图片宽高及babs64图片
                const { width, height, pre_img, duration } = await getVideoCover(file_path)
                // 封面图toFile
                let file = this.base64ToFile(pre_img, createId())
                // 上传封面图
                let res = await commonUploadImg(file, 'im', 5000).catch(() => {
                    return {}
                })

                const poster = res.url || ''
                Object.assign(preImg, {
                    video_width: width,
                    video_height: height,
                    poster,
                    time: duration,
                })
            } catch (err) {
                console.log('err', err)
                this.$message.error('获取封面失败，请重试~')
                reject(err)
                loading && loading.close()
                return
            }
        }

        let res = await upload_imgs_im(formData, {
            type,
        }).catch((err) => {
            console.log('err', err)
            return {}
        })

        try {
            const { filename } = res.data.files[0] || {}
            resolve({ url: `/${type}/` + filename, ...preImg })
            loading && loading.close()
        } catch (err) {
            this.Toast(err)
        }
    })
}

// 富文本给图片补充完整路径
export function parseHtmlUrl(htmlString) {
    function removeTrailingSlash(str) {
        if (str.endsWith('/')) {
            return str.slice(0, -1) // 使用slice方法从字符串的开头到倒数第二个字符（不包括结尾的/）
        }
        return str // 如果字符串不以/结尾，则直接返回原字符串
    }
    const { origin } = location
    const baseurl = removeTrailingSlash(baseURL)
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')
    const imgs = doc.body.querySelectorAll('img')
    for (let index = 0; index < imgs.length; index++) {
        const element = imgs[index]
        const { src } = element
        if (src && src.startsWith('/') && !src.startsWith('//')) {
            element.src = baseurl + element.src
        }
    }

    const serializer = new XMLSerializer()
    const modifiedHtml = serializer.serializeToString(doc.body)
    // 移除外层的body
    let div = document.createElement('div')
    div.innerHTML = modifiedHtml
    return div.innerHTML
}

// 截取视频的封面图
export function getVideoCover(url) {
    if (!url) return
    return new Promise((resolve, reject) => {
        let dataURL = ''
        let video = document.createElement('video')
        video.setAttribute('crossOrigin', 'anonymous') //处理跨域
        video.setAttribute('src', url)
        video.setAttribute('autoplay', 'true')
        video.setAttribute('muted', 'true')
        video.setAttribute('playsinline', 'true')
        video.setAttribute('webkit-playsinline', 'true')
        video.setAttribute('x5-video-player-type', 'h5')
        // 设置时间为第一秒
        video.currentTime = 1
        // 播放错误监听
        video.addEventListener('error', (err) => {
            video.remove()
            reject(err)
        })

        // 兼容ios的上传，改成了延时获取
        let timer = setTimeout(() => {
            // 获取宽高
            let { videoWidth, videoHeight } = video
            // 创建canvas 取视频的第一帧作为封面图
            let canvas = document.createElement('canvas')
            canvas.width = videoWidth
            canvas.height = videoHeight
            let ctx = canvas.getContext('2d')
            ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
            dataURL = canvas.toDataURL('image/jpeg')
            // 获取成功后清除节点
            video.remove()
            timer = null
            clearTimeout(timer)
            resolve({
                width: videoWidth || 0,
                height: videoHeight || 0,
                pre_img: dataURL,
                duration: video.duration || 0,
            })
        }, 1000)
    })
}

// 获取视频的本地地址
export function getObjectURL(file) {
    var url = null
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file)
    } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}

// 文件限制
export function fileLimit(file, options = {}) {
    let { maxSize } = options
    let size = file.size / 1024

    // 判断大小
    if (maxSize) {
        if (size > maxSize) {
            return Promise.resolve(`文件大小不能超过${maxSize}KB`)
        }
    }

    return Promise.resolve('')
}

/**
 * 生成一张canvas图片
 * isBase64 直接生成file的本地地址
 * bgImg 背景图片地址
 */
// http://139.9.210.43:5000/netdist/d0c628394d74c37b8bc61dfb714b3144-1718940105199~1~.jpg
export function createCanvasImg(
    {
        width = 0,
        height = 0,
        fontSize = 30,
        fontContent = '',
        fontColor = '',
        bgImg = '',
        isBase64 = false,
    } = (options = {}),
) {
    return new Promise(async (resolve, reject) => {
        if (!width || !height) reject('请传入宽高')
        if (!fontContent) {
            fontContent = new Date().toLocaleDateString() // 默认今天的日期
        }
        if (!fontColor) {
            fontColor = createColor() // 随机生成一个颜色
        }

        // 对于不同分辨率的屏幕，设置画布的大小
        const devicePixelRatioa = window.devicePixelRatio || 1
        // const devicePixelRatioa = 1
        width = width * devicePixelRatioa
        height = height * devicePixelRatioa
        fontSize = fontSize * devicePixelRatioa
        let canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')

        function createText() {
            ctx.font = `${fontSize}px Arial`
            ctx.fillStyle = fontColor
            ctx.textBaseline = 'top'
            ctx.textAlign = 'left'
            let y = height / 2
            let textHeight = fontSize * devicePixelRatioa
            let textY = y - textHeight / 2
            ctx.shadowColor = 'black'
            ctx.shadowBlur = 2 * devicePixelRatioa // 阴影的模糊度
            ctx.shadowOffsetY = 1 * devicePixelRatioa // 阴影在垂直方向上的偏移
            ctx.fillText(fontContent, 10 * devicePixelRatioa, textY)
        }

        async function createImg() {
            let dataURL = canvas.toDataURL('image/jpeg')
            if (!isBase64) {
                let file = await dataURLtoFile(dataURL, createId())
                let url = getObjectURL(file.file_)
                resolve(url)
            } else {
                resolve(dataURL)
            }
        }

        function createColor() {
            return '#' + Math.floor(Math.random() * 16777215).toString(16)
        }

        // 背景图片
        if (bgImg) {
            let bgImgObj = new Image()
            bgImgObj.crossOrigin = 'Anonymous'
            bgImgObj.src = bgImg
            bgImgObj.onload = async () => {
                ctx.drawImage(bgImgObj, 0, 0, width, height)
                createText()
                createImg()
            }

            // 加载失败
            bgImgObj.onerror = () => {
                reject('加载背景图片失败')
            }

            return
        }

        // 无背景图片,随机生成背景颜色
        let bgColor = createColor()
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height)
        createText()
        createImg()
    })
}

/**
 * 数组按照下面的顺序排序返回
 * oldArr 原数组
 * sortArr 排序数组
 * key  排序key
 * ***/
export function sortArray(oldArr, sortArr, key) {
    if (!Array.isArray(oldArr) || !Array.isArray(sortArr) || !key) {
        console.warn('sortArray传入参数错误')
        return oldArr
    }
    let obj = {}
    // 创建基本数组
    sortArr.forEach((item) => {
        obj[item] = []
    })

    oldArr.forEach((item) => {
        obj[item[key]].push(item)
    })
    let newArr = []
    sortArr.forEach((item) => {
        newArr = [...newArr, ...obj[item]]
    })

    return newArr
}

/**
 * 对比两个对象的key和value是否一致
 * ***/
export function isObjectKeys(oldObj, newObj) {
    return true
}

export function getLabel(arr, value) {
    return arr.find((item) => item.value == value)?.label || '--'
}

// 移除对象中的方法
export function removeMethodsFromObjectDeep(obj) {
    if (Array.isArray(obj)) {
        // 如果是数组，遍历每个元素
        return obj.map((item) => removeMethodsFromObjectDeep(item))
    } else if (typeof obj === 'object' && obj !== null) {
        // 如果是对象，遍历每个属性
        Object.keys(obj).forEach((key) => {
            const value = obj[key]
            if (typeof value === 'function') {
                // 如果值是函数，则删除该属性
                delete obj[key]
            } else if (typeof value === 'object' && value !== null) {
                // 如果值是对象或数组（数组也是对象的一种），则递归处理
                obj[key] = removeMethodsFromObjectDeep(value)
            }
        })
    }
    // 返回（或修改）对象，对于数组而言，map函数已经返回了新数组
    return obj
}

// 比较两个对象是否相等，只要键和值一致即可，不要求顺序也一样
export function areObjectsEqual(obj1, obj2) {
    // 检查是否为相同的引用
    if (obj1 === obj2) {
        return true
    }

    // 检查是否为null或undefined，且必须相同
    if (obj1 == null || obj2 == null) {
        return obj1 === obj2 // 使用严格等于来确保null和undefined也被正确处理
    }

    // 检查类型是否相同
    const type1 = typeof obj1
    const type2 = typeof obj2
    if (type1 !== type2 || (type1 !== 'object' && type1 !== 'function')) {
        // 注意：这里排除了function类型，因为通常我们不希望函数被视为可比较的值
        // 但如果你想要包含函数比较（比如比较函数的引用），可以移除'function'的排除
        return false
    }

    // 处理数组
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!areObjectsEqual(obj1[i], obj2[i])) {
                return false
            }
        }
        return true
    }

    // 处理普通对象
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) {
        return false
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !areObjectsEqual(obj1[key], obj2[key])) {
            return false
        }
    }

    // 所有检查和递归都通过了，对象相等
    return true
}

// 获取一个月多少天
export function getDaysInMonth(year, month) {
    // 注意：JavaScript中月份是从0开始的，但此函数接受从1开始的月份
    // 因此，我们需要将月份减1以匹配Date对象的预期
    var date = new Date(year, month - 1 + 1, 0) // 下一个月的第一天，但日设置为0会自动回退到本月的最后一天
    // getDate() 方法返回 Date 对象中月的“日”字段（1-31）
    return date.getDate()
}

// 错误提示
export async function Toast(msg) {
    const type = getType(msg)
    console.warn('Toast-msg-----', type, msg)
    if (type === 'error') {
        saveError(msg)
    }

    if (['error', 'string'].includes(type)) {
        if (typeof ELEMENT === 'undefined') {
            await getIndexDBJS([
                {
                    js: 'https://image.zlketang.com/public/news/others/imgs/blog/js/element-ui.js',
                    remove: false,
                },
            ])
        }
        ELEMENT.Message.error(msg)
    }
}

// 获取可视区宽高
export function getViewportSize() {
    const width =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

    const height =
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

    return { width, height }
}

// 专门用于e-form使用配置数据生成formData
export function createFormData(arr) {
    const obj = {}
    arr.forEach((item) => {
        obj[item.modelName] = item.value
    })
    return obj
}

// 错误上报 saveError()
export function saveError(message) {
    if (isDev()) return
    if (message) {
        // 手动触发的错误上报
        captureError({
            message,
            des: 'user_handler',
        })
        return
    }
    Vue.config.errorHandler = (err) => {
        // vue错误上报
        captureError({
            message: err.message,
            des: 'errorHandler',
        })
    }

    window.addEventListener('error', function (event) {
        // js执行错误
        captureError({
            message: event.message,
            des: 'error',
        })
    })

    window.addEventListener('unhandledrejection', function (event) {
        let type = getType(event.reason)
        let message = event.reason
        if (['array', 'object'].includes(type)) {
            message = JSON.stringify(event.reason)
        }

        if (event.reason.message?.indexOf('dynamically imported module') > -1) {
            if (window.confirm('检测到新版本，是否立即更新？')) {
                window.location.reload()
            } else {
                window.location.reload()
            }
        }
        // promise错误
        captureError({
            message,
            des: 'promise错误 - unhandledrejection',
        })
    })

    function captureError({ message, des }) {
        let message_type = getType(message)
        switch (message_type) {
            case 'array':
                message = JSON.stringify(message)
                break
            case 'object':
                message = JSON.stringify(message)
                break
            case 'error':
                message = message.toString()
                break
            case 'promiserejectionevent':
                message = message.reason.toString()
                break
            default:
                break
        }

        const type = 3

        const name = `博客项目错误上报(${isPc() ? 'PC端' : '移动端'})`

        if (!message) return
        let errStore = getSessionStorage('errStore') || []
        let index = errStore.findIndex((item) => item.message === message)
        // 防止重复上报
        if (index > -1) return
        setSessionStorage('errStore', [...errStore, { message }])
        // 上报错误信息 img上报
        let img = new Image()
        let url = (window.location.hash || '未知链接').replace('#', '')
        let { _id } = store?.state?.userdata || {}
        let params = {
            type,
            name,
            content: message,
            url,
            des,
        }

        if (_id) {
            params.user_id = _id
        }
        img.src = `${baseURL}page_point?${paramsJoin(params)}`
    }
}

// 判断是否为数字
export function isNumber(data) {
    return typeof data === 'number' && !isNaN(data)
}

export function getPickerOptions(arr = [1, 2, 3, 4, 5, 6, 7, 8]) {
    const that = this

    const obj = {
        1: {
            text: '今日',
            onClick(picker) {
                const [yyyy, MM, dd] = that.klDateFormat(new Date(), '[yyyy,MM,dd]')
                const end = new Date(`${yyyy}-${MM}-${dd} 23:59:59`)
                const start = new Date(`${yyyy}-${MM}-${dd} 00:00:00`)
                start.setTime(start.getTime())
                picker.$emit('pick', [start, end])
            },
        },
        2: {
            text: '本周',
            onClick(picker) {
                const [yyyy, MM, dd] = that.klDateFormat(new Date(), '[yyyy,MM,dd]')
                let week = that.getWeek(yyyy, MM, dd)
                const currentTime = new Date(`${yyyy}-${MM}-${dd} 23:59:59`).getTime()
                const start = new Date()
                const end = new Date(that.klDateFormat(currentTime + (7 - week) * 3600 * 24 * 1000))
                start.setTime(currentTime + 1000 - 3600 * 1000 * 24 * week)
                picker.$emit('pick', [start, end])
            },
        },
        3: {
            text: '本月',
            onClick: (picker) => {
                let [yyyy, MM] = this.klDateFormat(Date.now(), '[yyyy,MM]')
                const str2 = `${yyyy}/${MM}/01 00:00:00`
                const start = new Date(str2)
                const end = new Date(
                    this.klDateFormat(
                        new Date(str2).getTime() +
                            3600 * 1000 * 24 * this.getDaysInMonth(yyyy, MM) -
                            1,
                    ),
                )
                picker.$emit('pick', [start, end])
            },
        },
        4: {
            text: '最近半年',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
                picker.$emit('pick', [start, end])
            },
        },
        5: {
            text: '上月',
            onClick: (picker) => {
                let [yyyy, MM] = this.klDateFormat(Date.now(), '[yyyy,MM]')
                if (+MM === 1) {
                    yyyy = yyyy - 1
                    MM = 12
                } else {
                    MM = MM - 1
                }

                const str2 = `${yyyy}/${MM}/01 00:00:00`
                const start = new Date(str2)
                const end = new Date(
                    this.klDateFormat(
                        new Date(str2).getTime() +
                            3600 * 1000 * 24 * this.getDaysInMonth(yyyy, MM) -
                            1,
                    ),
                )
                picker.$emit('pick', [start, end])
            },
        },
        6: {
            text: '今明两月',
            onClick: (picker) => {
                let [yyyy, MM] = this.klDateFormat(Date.now(), '[yyyy,MM]')
                const str1 = `${yyyy}/${MM}/01 00:00:00`
                const next_yyyy = MM === 12 ? yyyy + 1 : yyyy
                const next_MM = MM === 12 ? 1 : MM + 1
                const str2 = `${next_yyyy}/${next_MM}/01 00:00:00`
                const start = new Date(str1)
                const end = new Date(
                    this.klDateFormat(
                        new Date(str2).getTime() +
                            3600 * 1000 * 24 * this.getDaysInMonth(next_yyyy, next_MM) -
                            1,
                    ),
                )
                picker.$emit('pick', [start, end])
            },
        },
        7: {
            text: '往前半年',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
                picker.$emit('pick', [start, end])
            },
        },
        8: {
            text: '过去两月', // 上个月和这个月
            onClick: (picker) => {
                let [yyyy, MM] = this.klDateFormat(Date.now(), '[yyyy,MM]')
                const str1 = `${yyyy}/${MM}/01 00:00:00`
                const str2 = `${MM === 1 ? yyyy - 1 : yyyy}/${MM === 1 ? 12 : MM - 1}/01 00:00:00`
                const start = new Date(str2)
                const end = new Date(
                    this.klDateFormat(
                        new Date(str1).getTime() +
                            3600 * 1000 * 24 * this.getDaysInMonth(yyyy, MM) -
                            1,
                    ),
                )

                picker.$emit('pick', [start, end])
            },
        },
    }
    return {
        shortcuts: arr.map((item) => obj[item]),
    }
}

export function isToNumber(number) {
    return ['number', 'string'].includes(getType(number)) && !isNaN(number)
}

export function debounce(fn, time = 200) {
    let timeout = null // 创建一个标记用来存放定时器的返回值
    return function () {
        clearTimeout(timeout) // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => {
            // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            fn.apply(this, arguments)
        }, time)
    }
}

export async function download(url, name) {
    try {
        getIndexDBJS([
            {
                js: 'http://139.9.210.43:5000/netdist/StreamSaver-1728968748124~1~.js',
            },
        ])
            .then(() => {
                const fileName = name || url.split('/').pop()
                const fileStream = streamSaver.createWriteStream(fileName)
                fetch(url).then((res) => {
                    const readableStream = res.body
                    if (window.WritableStream && readableStream.pipeTo) {
                        return readableStream.pipeTo(fileStream)
                    }
                    window.writer = fileStream.getWriter()
                    const reader = res.body.getReader()
                    const pump = () =>
                        reader
                            .read()
                            .then((res) =>
                                res.done ? writer.close() : writer.write(res.value).then(pump),
                            )
                    pump()
                })
            })
            .catch((err) => {
                Toast(err)
            })
    } catch (error) {
        Toast(error)
    }
}


// 系统延迟函数
export function winSleep(fn){
    if(window?.requestIdleCallback){
        window.requestIdleCallback(fn)
    }else if(window?.requestAnimationFrame){
        window.requestAnimationFrame(fn)
    }else{
        Toast(new Error('浏览器不支持requestIdleCallback与requestAnimationFrame'))
    }
}
