<template>
    <canvas :class="canvasClass"></canvas>
</template>

<script>
const PieChart = function () {
    this.el = ''
    this.ctx = ''
    this.w = 0
    this.h = 0
    this.x0 = 0
    this.y0 = 0
    this.radius = 100
    this.outLine = 20
    this.rectW = 30
    this.rectH = 16
    this.space = 20
}
PieChart.prototype.init = function (data) {
    let el = document.querySelector(this.el)
    if (!el) {
        new Error('el is not found')
        return
    }
    this.ctx = el.getContext('2d')
    if (!this.ctx) {
        new Error('canvas is not support')
        return
    }

    let w = 2 * this.radius
    let h = 2 * this.radius
    this.ctx.canvas.width = w
    this.ctx.canvas.height = h
    this.w = w
    this.h = h
    this.x0 = this.w / 2
    this.y0 = this.h / 2

    // 如果第一个360,就删除第二个
    if (data[0].num === 360) {
        data.splice(1, 1)
    }
    this.drawPie(data)
}
PieChart.prototype.drawPie = function (data) {
    var that = this
    var angleList = this.transformAngle(data)
    var startAngle = 0
    angleList.forEach(function (item, i) {
        var endAngle = startAngle + item.angle
        that.ctx.beginPath()
        that.ctx.moveTo(that.x0, that.y0)
        that.ctx.arc(that.x0, that.y0, that.radius, startAngle, endAngle)
        let color = (that.ctx.fillStyle = item.color)
        that.ctx.fill()
        if (item.title) {
            that.drawTitle(startAngle, item.angle, color, item.title)
        }
        startAngle = endAngle
    })
}
PieChart.prototype.drawTitle = function (startAngle, angle, color, title) {
    var edge = this.radius + this.outLine
    var edgeX = Math.cos(startAngle + angle / 2) * edge
    var edgeY = Math.sin(startAngle + angle / 2) * edge
    var outX = this.x0 + edgeX
    var outY = this.y0 + edgeY
    this.ctx.beginPath()
    this.ctx.moveTo(this.x0, this.y0)
    this.ctx.lineTo(outX, outY)
    this.ctx.strokeStyle = color
    this.ctx.font = '14px Microsoft YaHei'
    var textWidth = this.ctx.measureText(title).width
    if (outX > this.x0) {
        /*右*/
        this.ctx.lineTo(outX + textWidth, outY)
        this.ctx.textAlign = 'left'
    } else {
        /*左*/
        this.ctx.lineTo(outX - textWidth, outY)
        this.ctx.textAlign = 'right'
    }
    this.ctx.stroke()
    this.ctx.textBaseline = 'bottom'
    this.ctx.fillText(title, outX, outY)
}
PieChart.prototype.drawDesc = function (index, title) {
    this.ctx.fillRect(this.space, this.space + index * (this.rectH + 10), this.rectW, this.rectH)
    /*绘制文字*/
    this.ctx.beginPath()
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'top'
    this.ctx.font = '12px Microsoft YaHei'
    this.ctx.fillText(title, this.space + this.rectW + 10, this.space + index * (this.rectH + 10))
}
PieChart.prototype.transformAngle = function (data) {
    var total = 0
    data.forEach(function (item, i) {
        total += item.num
    })
    data.forEach(function (item, i) {
        var angle = (item.num / total) * Math.PI * 2
        item.angle = angle
    })
    return data
}

// 获取两个颜色之间的颜色数组
function getColors(start, end, steps, gamma) {
    var i,
        j,
        ms,
        me,
        output = [],
        so = []
    gamma = gamma || 1
    var normalize = function (channel) {
        return Math.pow(channel / 255, gamma)
    }
    start = parseColor(start).map(normalize)
    end = parseColor(end).map(normalize)
    for (i = 0; i < steps; i++) {
        ms = i / (steps - 1)
        me = 1 - ms
        for (j = 0; j < 3; j++) {
            so[j] = pad(
                Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16),
            )
        }
        output.push('#' + so.join(''))
    }
    return output
}

// 此方法把两个色值分成100份,可以取颜色值对应数据值,设置颜色
function parseColor(hexStr) {
    return hexStr.length === 4
        ? hexStr
              .substr(1)
              .split('')
              .map(function (s) {
                  return 0x11 * parseInt(s, 16)
              })
        : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
              return parseInt(s, 16)
          })
}

// zero-pad 1 digit to 2
function pad(s) {
    return s.length === 1 ? '0' + s : s
}

export default {
    name: 'klSector',
    props: {
        deg: {
            type: Number,
            default: 0,
        },
        radius: {
            type: Number,
            default: 100,
        },
        color: {
            type: String,
            default: '',
        },
        bg: {
            type: String,
            default: '#f5f5f5',
        },
        animation: {
            type: Boolean,
            default: false,
        },
        startColor: {
            type: String,
            default: '#67c23a',
        },
        endColor: {
            type: String,
            default: '#F56C6C',
        },
    },
    data() {
        return {
            canvasClass: '',
        }
    },
    created() {
        this.canvasClass = this.createId()
    },
    mounted() {
        this.init()
    },
    watch:{
        deg(){
            this.init()
        }
    },
    methods: {
        init() {
            let { deg, color, bg, radius, animation, startColor, endColor } = this
            this.drawSector({
                el: `.${this.canvasClass}`,
                deg,
                color,
                bg,
                radius,
                animation,
                startColor,
                endColor,
            })
        },

        drawSector({
            el,
            deg,
            color,
            bg,
            radius = 30,
            content,
            animation = 0,
            startColor,
            endColor,
        }) {
            let data = [
                {
                    title: '',
                    num: 0,
                    color: 'red',
                },
                {
                    title: '',
                    num: 360,
                    color: '#fff',
                },
            ]
            let pieChart = new PieChart()
            pieChart.el = el
            pieChart.radius = radius

            data[0].color = color

            data[1].title = content
            data[1].color = bg
            if (!animation || !deg) {
                data[0].num = deg
                data[1].num = 360 - deg
                pieChart.init(data)
            } else {
                // 计算间隔时间
                let num = 1.5
                let i = 0
                let colorArr = []
                if (startColor && endColor && !color) {
                    colorArr = getColors(startColor, endColor, Math.floor(360 / num))
                    // console.log(colorArr);
                }

                let timer = setInterval(() => {
                    if (startColor && endColor && !color) {
                        data[0].color = colorArr[i]
                        i += 1
                    }
                    data[0].num += num
                    data[1].num -= num
                    pieChart.init(data)
                    if (data[0].num >= deg) {
                        data[0].num = deg
                        pieChart.init(data)
                        clearInterval(timer)
                        timer = null
                    }
                }, 0)
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
