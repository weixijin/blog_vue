<!-- 翻页效果 倒计时组件 -->
<template>
    <div :class="['vue-countdown-component', { theme2: theme !== 1 }, { ie: isIE }]">
        <template v-for="(item, index) in timeArray">
            <div :class="['time-box']" :key="index">
                <!-- 底层基础div -->
                <div class="base">
                    {{ item }}
                    <div class="base-b">{{ timeArrayT[index] }}</div>
                </div>
                <!-- 翻页动画div -->
                <div
                    :class="['face', isAnimate[index] ? 'anime' : '']"
                    @animationend="onAnimateEnd(index)"
                >
                    {{ timeArrayT[index] }}
                </div>
                <div :class="['back', isAnimate[index] ? 'anime' : '']">{{ item }}</div>
            </div>
            <!-- 文字 -->
            <div class="time-unit" :key="`unit-${index}`" v-if="isTimeUnitShow(index)">
                {{ setTimeUnit(index) }}
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        // 截止时间的时间戳
        endTime: {
            type: Number,
            default: 0,
            validator(value) {
                return value >= 0
            },
        },
        // 展示的长度，最大4位
        type: {
            type: Number,
            default: 4,
            validator(value) {
                return [1, 2, 3, 4].includes(value)
            },
        },
        // 1：不分开 2：分开
        theme: {
            type: Number,
            default: 2,
            validator(value) {
                return [1, 2].includes(value)
            },
        },
    },
    data() {
        return {
            // 是否是ie
            isIE: false,
            //
            timeArray:
                this.theme === 2
                    ? new Array(this.type * 2).fill('0')
                    : new Array(this.type).fill('00'),
            timeArrayT:
                this.theme === 2
                    ? new Array(this.type * 2).fill('0')
                    : new Array(this.type).fill('00'),
            isAnimate:
                this.theme === 2
                    ? new Array(this.type * 2).fill(false)
                    : new Array(this.type).fill(false),
        }
    },
    computed: {
        timeUnit() {
            let arr = ['天', '时', '分', '秒']
            return arr.slice(0, this.type)
        },
        step() {
            return this.theme === 1 ? 1 : 2
        },
        arr() {
            const length = this.timeArray.length
            const step = this.step
            const temp = [
                length - 1,
                length - step - 1,
                length - step * 2 - 1,
                length - step * 3 - 1,
            ]
            temp.length = this.type > 1 ? this.type : 1
            return temp
        },
    },
    watch: {
        // 监听timeArray的变化，如果有变化，则开始动画
        timeArray(newV, oldV) {
            const diff = []
            newV.forEach((value, index) => {
                if (value !== oldV[index]) {
                    diff.push({ value, index })
                    // 如果有变化，设置为true，开始动画
                    this.$set(this.isAnimate, index, true)
                }
            })
            setTimeout(() => {
                diff.forEach((item) => {
                    this.$set(this.timeArrayT, item.index, item.value)
                })
            }, 350)
        },
        // 监听截止时间的变化，如果大于0，则开始倒计时
        endTime: {
            handler(newV) {
                if (newV > 0) {
                    this.start()
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.isIE =
            window.ActiveXObject ||
            'ActiveXObject' in window ||
            window.navigator.userAgent.indexOf('Edge') > -1
    },
    beforeDestroy() {
        this.clearTimer()
    },
    methods: {
        // 清空定时器
        clearTimer() {
            clearTimeout(this.timer)
            this.timer = null
        },
        // 开始倒计时
        start() {
            let { theme, type, addZero } = this
            this.clearTimer()
            this.timer = setTimeout(() => {
                let t = this.endTime - Date.now() // 剩余的毫秒数
                t = t < 0 ? 0 : t
                let day = 0 // 剩余的天
                let hour = 0 // 剩余的小时
                let min = 0 // 剩余的分钟
                let second = 0 // 剩余的秒
                // 计算出不同位数下的时间
                if (type >= 4) {
                    day = Math.floor(t / 86400000) // 剩余的天
                    hour = Math.floor(t / 3600000 - day * 24) // 剩余的小时 已排除天
                    min = Math.floor(t / 60000 - day * 1440 - hour * 60) // 剩余的分钟 已排除天和小时
                    second = Math.floor(t / 1000 - day * 86400 - hour * 3600 - min * 60) // 剩余的秒
                } else if (type >= 3) {
                    hour = Math.floor(t / 3600000) // 剩余的小时
                    min = Math.floor(t / 60000 - hour * 60) // 剩余的分钟 已排小时
                    second = Math.floor(t / 1000 - hour * 3600 - min * 60) // 剩余的秒
                } else if (type >= 2) {
                    min = Math.floor(t / 60000) // 剩余的分钟
                    second = Math.floor(t / 1000 - min * 60) // 剩余的秒
                } else {
                    second = Math.floor(t / 1000) // 剩余的秒
                }
                let arr = []
                if (theme === 1) {
                    // 不分开
                    type >= 4 && arr.push(String(day).padStart(2, '0'))
                    type >= 3 && arr.push(String(hour).padStart(2, '0'))
                    type >= 2 && arr.push(String(min).padStart(2, '0'))
                    arr.push(String(second).padStart(2, '0'))
                } else {
                    // 分开
                    type >= 4 && arr.push(...String(day).padStart(2, '0').split(''))
                    type >= 3 && arr.push(...String(hour).padStart(2, '0').split(''))
                    type >= 2 && arr.push(...String(min).padStart(2, '0').split(''))
                    arr.push(...String(second).padStart(2, '0').split(''))
                }
                this.timeArray = arr
                t > 0 ? this.start() : this.$emit('timeUp')
            }, 1000)
        },
        // 动画完毕后，去掉对应的class, 为下次动画做准备
        onAnimateEnd(index) {
            this.$set(this.isAnimate, index, false)
        },
        isTimeUnitShow(index) {
            if (this.arr.includes(index)) {
                if (index === this.timeArray.length - 1 && !this.timeUnit[3]) {
                    return false
                }
                return true
            }
            return false
        },
        setTimeUnit(index) {
            switch (index) {
                case this.timeArray.length - 1:
                    return this.timeUnit[3] || '' // 秒
                case this.timeArray.length - this.step - 1:
                    return this.timeUnit[2] || '' // 分
                case this.timeArray.length - this.step * 2 - 1:
                    return this.timeUnit[1] || '' // 时
                default:
                    return this.timeUnit[0] || '' // 天
            }
        },
    },
}
</script>

<style scoped lang="scss">
$bgColor: #6c96e8;
$boxHeight: 60px;
$boxWidth: 40px;
$fontSize: 20px;
$fontWeight: 500;

.vue-countdown-component {
    display: flex;
    @keyframes animate-filp-face {
        0% {
            transform: rotateX(-0.01deg);
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        51% {
            opacity: 0;
        }
        100% {
            transform: rotateX(-180deg);
            opacity: 0;
        }
    }
    @keyframes animate-filp-back {
        0% {
            transform: rotateX(180deg);
        }
        100% {
            transform: rotateX(-0.01deg);
        }
    }
    &.ie {
        // 为了ie和老版edge（不支持clip-path）
        .base {
            .base-b {
                clip: rect($boxHeight/2, auto, auto, auto);
            }
        }
        .face {
            clip: rect(auto, auto, $boxHeight/2, auto);
        }
        .back {
            clip: rect($boxHeight/2, auto, auto, auto);
        }
    }
    &.theme2 {
        .time-box {
            min-width: $boxWidth;
            & + .time-box {
                margin-left: 1px;
            }
        }
    }
    .time-unit {
        padding: 0 4px;
        color: #222;
        font-size: $fontSize;
        line-height: $boxHeight;
        white-space: nowrap;
    }
    .time-box {
        position: relative;
        box-sizing: border-box;
        height: $boxHeight;
        min-width: 28px;
        font-size: $fontSize;
        text-align: center;
        background-color: $bgColor;
        perspective: 60px;
        border-radius: 3px;
        padding: 0 2px;
        color: #fff;
        line-height: $boxHeight;
        font-weight: $fontWeight;
        &:before {
            content: '';
            position: absolute;
            background: #a7c7ff;
            width: 1px;
            height: 6px;
            top: 50%;
            left: -1px;
            margin-top: -3px;
            z-index: -1;
        }
        &:after {
            content: '';
            position: absolute;
            background: #a7c7ff;
            width: 1px;
            height: 6px;
            top: 50%;
            right: -1px;
            margin-top: -3px;
            z-index: -1;
        }
        & + .time-box {
            margin-left: 8px;
        }
        & > div {
            overflow: hidden;
            animation-timing-function: linear;
            animation-duration: 400ms;
            // 为了chrome，需要一个小的角度，否则字体渲染错位
            transform: rotateX(-0.01deg);
            border-radius: 3px;
            &.base {
                position: relative;
                .base-b {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    border-radius: 0 0 3px 3px;
                    width: 100%;
                    height: 100%;
                    background-color: $bgColor; // a1比base浅一点点，为了模拟翻页的阴影效果
                    clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
                }
            }
            &.face {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: $bgColor;
                backface-visibility: visible;
                clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
                z-index: 2;
                &.anime {
                    animation-name: animate-filp-face;
                }
            }
            &.back {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: $bgColor; // b0和a1一致
                transform: rotateX(-180deg);
                backface-visibility: visible;
                clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
                &.anime {
                    animation-name: animate-filp-back;
                }
            }
        }
    }
}
</style>
