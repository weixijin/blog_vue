// 提供工具函数

// 定义一个处理时间的函数
// 参数说明
//     // 当传入参数是时间戳
//     datetime = new Date()
//     datetime.setTime(time)  // 主要利用这个方法
export function moment(time, length) {
    // console.log(time);
    // 当传入参数是 2021-11-23T06:29:11.699Z 或 时间戳
    let datetime = null
    if (time !== -1) {
        datetime = new Date(time)
        // console.log(datetime);
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

    if (length == 3) {
        return year + '-' + month + '-' + date
    }
    // let mseconds = datetime.getMilliseconds();
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second //+"."+mseconds;
}

// 定义一个根据当前路由信息来处理面包削显示参数的函数
export function handleTitle(val) {
    // val 当前路由
    for (let i = 0; i < menulist.length; i++) {
        for (let j = 0; j < menulist[i].children.length; j++) {
            if (menulist[i].children[j].path == val) {
                return {
                    title1: menulist[i].label,
                    title2: menulist[i].children[j].label,
                }
            }
        }
    }
}

// 差值排除
// arr2大数组 arr1小数组
export function filterArray(arr2, arr1) {
    return arr2.filter((item) => !arr1.some((itey) => itey.id === item.id))
}

// 比教两个数组前n项是否相同
export function isSomeArr(arr1, arr2, index) {
    let result = true
    for (let i = 0; i < index; i++) {
        if (arr1[i] !== arr2[i]) {
            result = false
            break
        }
    }
    return result
}

export function addZelo(val) {
    return val > 9 ? val : '0' + val
}

// 处理时间
// 返回示例 4个月前 (11/12) 21:41
// 传入time示例  2022-03-11T16:23:12.764Z
export function myTime(time, type = 0) {
    if (!time) {
        return '---'
    }
    let date = ''
    if (type === 0 || type === 2) {
        date = new Date(time)
    }
    // 获取当前时间戳
    let now = new Date().getTime()
    // 获取传入时间戳
    let old = new Date(time).getTime()
    // 获取时间差
    let diff = now - old
    // 返回 **前
    let oneYear = 60 * 60 * 24 * 365 * 1000
    let arr = [
        60 * 1000,
        60 * 60 * 1000,
        60 * 60 * 24 * 1000,
        60 * 60 * 24 * 7 * 1000,
        60 * 60 * 24 * 30 * 1000,
        oneYear,
    ]
    let str_obj = ['分钟', '小时', '天', '周', '月', '年']
    let str = ''

    if (diff >= oneYear) {
        return Math.floor(diff / oneYear) + '年前'
    }
    for (let i = 0; i < arr.length; i++) {
        if (diff < arr[i]) {
            // 向上取整
            if (i == 0) {
                return '1分钟前'
            }
            str = Math.ceil(diff / arr[i - 1]) + str_obj[i - 1] + '前'
            break
        }
    }

    return str
}

export function LightDarkenColor(color, num = 50) {
    color = color.replace('#', '')
    // 分组
    let arr1 = color.split('')
    let arr2 = []
    arr1.forEach((_, index) => {
        if (index % 2 === 0) {
            arr2.push(color.slice(index, index + 2))
        }
    })

    let sColorChange = []

    for (let i = 0; i < arr2.length; i++) {
        let current_number = parseInt(arr2[i], 16) // 16 => 10
        let val = current_number + num
        if (val < 0) {
            val = 0
        }
        if (val > 255) {
            val = 255
        }
        sColorChange.push(eval(val).toString(16)) // 10 => 16
    }
    return '#' + sColorChange.join('')
}

// 平滑滚动方式
export function betterScroll(el, to) {
    let oldscrollTop = el.scrollTop
    let timer = setInterval(() => {
        let scrollTop = el.scrollTop
        if (oldscrollTop <= to) {
            let sleep = Math.ceil((to - scrollTop) / 20)
            if (scrollTop < to) {
                if (scrollTop + sleep >= to) {
                    el.scrollTop = to
                    return
                }
                el.scrollTop = scrollTop + sleep
            } else {
                clearInterval(timer)
                timer = null
            }
        } else {
            let sleep = Math.floor((to - scrollTop) / 5)
            if (scrollTop > to) {
                if (scrollTop + sleep <= to) {
                    el.scrollTop = to
                    return
                }
                el.scrollTop = scrollTop + sleep
            } else {
                clearInterval(timer)
                timer = null
            }
        }
    }, 20)
}
