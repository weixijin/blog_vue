// 代码高亮
import hljs from 'highlight.js'

const color = {
    inserted: function (el, binding, vnode) {
        // console.log(binding.value)
        el.style.color = binding.expression
    },
}

export const style = {
    inserted: function (el, binding, vnode) {
        let obj = binding.value
        if (Object.prototype.toString.call(obj) !== '[object Object]') {
            return
        }

        for (const type in obj) {
            el.style[type] = obj[type]
        }
    },
}

// 直接鉴权
let permission = {
    inserted(el, binding) {
        let value = binding.value || 'normal' // 获取到 v-permission的值
        if (value) {
            let hasPermission = checkArray(value)
            if (!hasPermission) {
                // 没有权限 移除Dom元素
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    },
}

function checkArray(key = 'normal') {
    let arr = ['normal', 'teacher', 'admin'] // 标识 这是一个
    if (arr.includes(key) && key !== 'normal') {
        return true // 有权限
    } else {
        return false // 无权限
    }
}

// 和store集合的鉴权
let permissionstore = {
    inserted(el, binding, vnode) {
        // console.log(el)
        // console.log(binding)
        // console.log(vnode)
        if (vnode.context.$store.getters.isHas) {
            // 没有权限 移除Dom元素
            el.parentNode && el.parentNode.removeChild(el)
        }
    },
}

// 目前存在问题,灵敏度太低
// 拖拽
// 特殊拖拽,不修改left height要改变
let drag1 = {
    inserted: function (el, bind) {
        let initHeight = 0
        if (!bind.value) {
            initHeight = window.innerHeight - 200
        } else {
            initHeight = window.innerHeight - bind.value
        }

        // 获取元素的宽高
        let height = el.clientHeight
        let offsetTopInit = el.offsetTop
        el.onmousedown = function (e) {
            el.addEventListener('mouseup', () => {
                el.removeEventListener('mousemove', mousemoveEvent)
            })

            // 获取鼠标与当前元素的相对位置
            let offsetY = e.offsetY

            function throttle(fn, delay = 0) {
                let time1 = 0
                return function () {
                    let time2 = Date.now()
                    if (time2 - time1 >= delay) {
                        fn.apply(this, arguments)
                        time1 = time2
                    }
                }
            }

            const mousemoveEvent = throttle(function (e) {
                // 当前元素距离顶部的距离
                let offsetTop = el.offsetTop

                // 这儿需要添加范围限制,防止出圈
                let top = offsetTop + e.offsetY - offsetY
                if (top < 0 || top > initHeight) {
                    return
                }

                el.style.top = top + 'px'
                el.style.height = height + offsetTopInit - top + 'px'
            })

            el.addEventListener('mousemove', mousemoveEvent)
        }
    },
}

export const dragDialog = {
    inserted: function (el, { value, minWidth = 400, minHeight = 200 }) {
        // 让弹窗居中
        let dialogHeight = el.clientHeight ?? 0
        let dialogWidth = el.clientWidth ?? 0

        // 获取可视区域的宽高
        let windowWidth = document.documentElement.clientWidth ?? 0
        let windowHeight = document.documentElement.clientHeight ?? 0

        // 弹窗的可移动范围
        let leftMax = windowWidth - dialogWidth
        let topMax = windowHeight - dialogHeight

        //还需要判断是否传入了top,left值
        let { top, center } = value

        let left = (windowWidth - dialogWidth) / 2

        if (!center) {
            // 没有设置center
            if (top.includes('%') || top.includes('px')) {
                el.style.top = top
            } else {
                el.style.top = top + 'px'
            }

            el.style.left = left + 'px'
        } else {
            el.style.top = (windowHeight - dialogHeight) / 2 + 'px'
            el.style.left = (windowWidth - dialogWidth) / 2 + 'px'
        }

        const el_header = el.querySelector('.kl-dailog-header')
        // 只有点击头部才能拖拽
        if (!el_header) return
        let headerHeight = el_header.clientHeight - 0
        // 缩放相关
        el.onmousemove = function (e) {
            if(!e) return
            // 判断当前鼠标是否处于可以拖拽的边缘，不包含头部
            if (e.clientX > el.offsetLeft + el.clientWidth - 10 || el.offsetLeft + 10 > e.clientX) {
                el.style.cursor = 'w-resize'
            } else if (
                el.scrollTop + e.clientY >
                el.offsetTop + el.clientHeight - 10 - headerHeight
            ) {
                el.style.cursor = 's-resize'
            } else {
                el.style.cursor = 'default'
            }

            el.onmousedown = (e) => {
                if(!e) return
                // 获取头部的宽高以及到可视区域的距离
                const el_header_rect = el_header.getBoundingClientRect()

                if (!el_header_rect) return
                let offsetTopHeader = el_header_rect.top - 0

                // 判断当前元素是否是可拖拽的头部元素
                if (headerHeight > e.pageY - offsetTopHeader) {
                    // 是头部，拖拽相关
                    // 获取到鼠标与被拖拽节点的相对位置
                    let disx = e.pageX - el.offsetLeft
                    let disy = e.pageY - el.offsetTop

                    // 获取弹窗的宽高
                    let width = el.clientWidth ?? 0
                    let height = el.clientHeight ?? 0

                    // 设置其他弹窗的z-index 100
                    let maxZIndex = 100
                    document.querySelectorAll('.kl-dialog-container').forEach((item) => {
                        let zIndex = item.style.zIndex
                        zIndex = zIndex ? zIndex - 0 : 100
                        if (zIndex > maxZIndex) {
                            maxZIndex = zIndex
                        }
                    })
                    el.style.zIndex = maxZIndex + 1

                    document.onmousemove = function (e) {
                        const el_rect = el.getBoundingClientRect()

                        if (!el_rect) return

                        // 获取弹窗到可视区域的距离
                        let offsetTopEl = el_rect.top - 0
                        let offsetLeftEl = el_rect.left - 0

                        let left = e.pageX - disx
                        let top = e.pageY - disy

                        // 对弹窗的位置进行限制
                        if (offsetTopEl < 0 || top < 0) {
                            top = 0
                        }

                        if (offsetLeftEl < 0 || left < 0) {
                            left = 0
                        }

                        if (offsetTopEl + height > windowHeight || top > topMax) {
                            top = windowHeight - height
                        }

                        if (offsetLeftEl + width > windowWidth || left > leftMax) {
                            left = windowWidth - width
                        }

                        // 重新设置被拖拽节点的位置
                        el.style.left = left + 'px'
                        el.style.top = top + 'px'
                    }
                    document.onmouseup = function () {
                        document.onmousemove = document.onmouseup = null
                    }
                } else {
                    const clientX = e.clientX // 鼠标点击时的X坐标
                    const clientY = e.clientY // 鼠标点击时的Y坐标
                    let elW = el.clientWidth // 当前元素的宽度
                    let elH = el.clientHeight // 当前元素的高度
                    let EloffsetLeft = el.offsetLeft // 元素距离左边的距离
                    let EloffsetTop = el.offsetTop // 元素距离顶部的距离
                    el.style.userSelect = 'none'
                    let ELscrollTop = el.scrollTop // 元素滚动条距离顶部的距离
                    // 不是头部，缩放相关
                    document.onmousemove = function (e) {
                        e.preventDefault() // 移动时禁用默认事件
                        //左侧鼠标拖拽位置
                        if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
                            //往左拖拽
                            if (clientX > e.clientX) {
                                el.style.width = elW + (clientX - e.clientX) * 2 + 'px'
                                el.style.left = EloffsetLeft - (clientX - e.clientX) + 'px'
                            }
                            //往右拖拽
                            if (clientX < e.clientX) {
                                if (el.clientWidth < minWidth) {
                                } else {
                                    el.style.width = elW - (e.clientX - clientX) * 2 + 'px'
                                    el.style.left = EloffsetLeft + (e.clientX - clientX) + 'px'
                                }
                            }
                        }

                        //右侧鼠标拖拽位置
                        if (clientX > EloffsetLeft + elW - 10 && clientX < EloffsetLeft + elW) {
                            //往左拖拽
                            if (clientX > e.clientX) {
                                if (el.clientWidth < minWidth) {
                                } else {
                                    el.style.width = elW - (clientX - e.clientX) * 2 + 'px'
                                    el.style.left = EloffsetLeft + (clientX - e.clientX) + 'px'
                                }
                            }

                            //往右拖拽
                            if (clientX < e.clientX) {
                                el.style.width = elW + (e.clientX - clientX) * 2 + 'px'
                                el.style.left = EloffsetLeft + (clientX - e.clientX) + 'px'
                            }
                        }
                        //底部鼠标拖拽位置
                        if (
                            ELscrollTop + clientY > EloffsetTop + elH - 20 &&
                            ELscrollTop + clientY < EloffsetTop + elH
                        ) {
                            //往上拖拽
                            if (clientY > e.clientY) {
                                if (el.clientHeight < minHeight) {
                                } else {
                                    el.style.height = elH - (clientY - e.clientY) * 2 + 'px'
                                    el.style.top = EloffsetTop + (clientY - e.clientY) + 'px'
                                }
                            }
                            //往下拖拽
                            if (clientY < e.clientY) {
                                el.style.height = elH + (e.clientY - clientY) * 2 + 'px'
                                el.style.top = EloffsetTop + (clientY - e.clientY) + 'px'
                            }
                        }
                    }
                    //拉伸结束
                    document.onmouseup = function (e) {
                        document.onmousemove = null
                        document.onmouseup = null
                    }
                }
            }
        }
    },
    // 指令销毁
    unbind(el) {},
}

let timer = null
let index = 0

// 自定义指令 v-highlight
const highlight = {
    // 被绑定元素插入父节点时调用
    inserted: function (el) {
        timer = setInterval(() => {
            let blocks = el.querySelectorAll('.blog-html-page pre code')
            for (let i = 0; i < blocks.length; i++) {
                hljs.highlightBlock(blocks[i])
            }
            index += 1
            if (blocks.length || index > 5) {
                clearInterval(timer)
                timer = null
                return
            }
        }, 300)
    },
}

// 自定义指令，用于处理点击外部区域的事件
const clickoutside = {
    bind(el, binding) {
        // 在元素上绑定一个点击事件监听器
        el.clickOutsideEvent = function (event) {
            // 检查点击事件是否发生在元素的内部
            if (!(el === event.target || el.contains(event.target))) {
                // 如果点击事件发生在元素的外部，则触发指令绑定的方法,将点击的event数据传过去
                binding.value(event)
            }
        }

        // 接受参数默认body
        let app = document.getElementById('app')
        // 在文档上添加点击事件监听器
        app.addEventListener('click', el.clickOutsideEvent)
    },
    unbind(el) {
        // 在元素上解除点击事件监听器
        app.removeEventListener('click', el.clickOutsideEvent)
    },
}

// 防止按钮重复点击
const throttle = {
    bind: (el, binding) => {
        let throttleTime = binding.value || 500
        let cbFun = null
        el.addEventListener(
            'click',
            (event) => {
                if (cbFun) {
                    return event && event.stopImmediatePropagation()
                }
                cbFun = setTimeout(() => {
                    cbFun = null
                }, throttleTime)
            },
            true
        )
    },
}

export { permissionstore, permission, color, highlight, clickoutside,throttle }
