const prodUrl = 'http://139.9.210.43:5000/'
let baseURL = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:5000/' : prodUrl

baseURL = 'http://139.9.210.43:5000/'

// indexdb数据库版本，一旦修改，所有的数据都会被清空
const indexDBVersion = '1.3'

// 默认图片地址
const defaultSrc = 'https://image.zlketang.com/public/news/others/imgs/book.jpg'

// 违规色库
const colorsFly = [
    {
        min: 0.5,
        label: 'rgba(255, 0, 0, 0.3)', // 红
    },
    {
        min: 0.3,
        label: 'rgba(255, 255, 0, 0.5)', // 黄
    },
    {
        min: 0,
        label: 'rgba(0, 0, 0, 0.3)', // 黑
    },
]

function getFlyColor(frequency) {
    let result = ''
    colorsFly.find(({ min, label }) => {
        if (frequency >= min) {
            result = label
            return true
        }
    })

    return result
}

const colorsMap = {
    primary: '0063ff',
    danger: '#F56C6C',
    warning: '#E6A23C',
    success: '#67C23A',
    info:'#909399',
}

export { baseURL, indexDBVersion, defaultSrc, colorsFly, getFlyColor,colorsMap }
