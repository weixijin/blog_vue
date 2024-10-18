<template>
    <div class="kl-nine">
        <div
            :class="['kl-nine-item', activeIndex === index ? 'active-w' : '']"
            v-for="(item, index) in 9"
            :key="index"
        >
            <div class="bg-top" @click="start(index)"></div>
            <div :class="[activeIndex === index ? 'kl-pos-active-bg' : '']"></div>
            <img class="kl-nine-item-img" :src="imgurl" alt="" />
            <p class="kl-nine-item-content">{{ item }}文字</p>
        </div>
    </div>
</template>

<script>
import { sleep } from '../../../mixins/tool/tool'
export default {
    components: {},
    props: {
        itemWidth: {
            type: Number,
            default: 90,
        },
    },
    data() {
        return {
            imgurl: 'https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg',
            activeIndex: -1,
            initArr: [0, 1, 2, 5, 8, 7, 6, 3], // 依次高亮列表
            endActive: 3, // 最终中奖高亮
            timer: null,
            lastNumbers: 0,
            steps: 0,
            step: 0,
            endStpes: 0,
            endStep: 0,
            time_mini: 50,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.setStyle()
        })
    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.timer = null
    },
    methods: {
        async start(index) {
            let that = this
            if (index === 4 && !this.timer) {
                let index0 = this.initArr.findIndex((item) => +item === +this.endActive) + 1
                let lastNumbers = 12 // 慢速圈
                let baseNumber = 4 * 8 + index0 + (8 - (lastNumbers % 8)) // 快速圈
                this.activeIndex = 0
                let steps = 0
                let step = 0
                this.timer = setInterval(() => {
                    if (step < 7) {
                        step += 1
                    } else {
                        step = 0
                    }
                    steps += 1
                    if (baseNumber === steps) {
                        clearInterval(this.timer)
                        this.timer = null
                        return
                    }

                    this.activeIndex = this.initArr[step]
                }, that.time_mini)

                await sleep(that.time_mini * baseNumber)
                // 找到当前的激活项
                this.endStep = this.initArr.findIndex((item) => +item === +this.activeIndex)

                that.endStpes = this.endStep
                that.scrollFun(lastNumbers)
            }
        },
        scrollFun(lastNumbers) {
            let that = this
            this.timer = setTimeout(() => {
                clearTimeout(that.timer)
                that.timer = null
                that.endStpes += 1

                that.activeIndex = this.initArr[that.endStpes % 8]
                if (that.endStpes === lastNumbers + that.endStep) {
                    // console.log('中奖')
                    return
                }

                that.scrollFun(lastNumbers)
            }, Math.floor(that.time_mini + that.endStpes * (4 * (that.endStpes - that.endStep))))
        },
        sleep(time) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('')
                }, time)
            })
        },

        setStyle() {
            let nineItems = $('.kl-nine-item')
            for (let i = 0; i < nineItems.length; i++) {
                let klNineHeight = $('.kl-nine').height()
                let marginBottom = (klNineHeight - 3 * this.itemWidth) / 2
                if (i < 6) {
                    nineItems.eq(i).css({
                        marginBottom: marginBottom + 'px',
                        width: this.itemWidth + 'px',
                        height: this.itemWidth + 'px',
                    })
                } else {
                    nineItems.eq(i).css({
                        marginBottom: 0 + 'px',
                        width: this.itemWidth + 'px',
                        height: this.itemWidth + 'px',
                    })
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-nine {
    padding: 5px;
    height: 300px;
    line-height: 300px;
    width: 300px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid black;

    .kl-nine-item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        margin: 0;

        .bg-top {
            z-index: 999;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .kl-pos-active-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: aqua;
            z-index: 99;
        }

        .kl-nine-item-img {
            width: 90%;
            height: 50px;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
        }
        .kl-nine-item-content {
            width: 80px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 50px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
        }
    }
    .active-w {
        transform: scale(1.05);
    }
}
</style>
