//
export const freezearr = function (arr) {
    arr.forEach((item) => {
        Object.freeze(item)
    })

    return Object.freeze(arr)
}

export const filterTime = (timestamp) => {
    var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    // console.log(Y + M + D + h + m + s)
    return Y + M + D + h + m + s
}

export function throttle(fn, delay = 50) {
    let time1 = 0
    return function () {
        let time2 = Date.now()
        if (time2 - time1 >= delay) {
            fn()
            time1 = time2
        }
    }
}
