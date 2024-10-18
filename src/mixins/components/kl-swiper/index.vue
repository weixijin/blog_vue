<template>
    <div :class="['kl-swiper', klSwiperClass]" :style="{ height: height }">
        <div class="kl-swiper-cover">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        height: {
            type: String,
            default: '100%',
        },
        index: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            maxIndex: 0,
            currentIndex: 0,
            klSwiperClass: '',
        }
    },
    created() {
        this.klSwiperClass = this.createId()
    },
    mounted() {
        this.init()
    },

    methods: {
        // 初始化
        init() {
            let { klSwiperClass } = this
            this.currentIndex = this.index
            this.maxIndex = this.$slots.default.length - 1
            // 监听手势
            let el = document.querySelector(`.${klSwiperClass}`)
            if (!el) return
            el.addEventListener('touchstart', this.touchStart(el))
        },
        touchStart(el) {
        //    console.log('touchStart');
            el.addEventListener('touchmove', this.touchMove)
            el.addEventListener('touchend', this.touchEnd(el))
        },
        touchMove(el) {
        //    console.log('touchMove');
            el.preventDefault()
        },
        touchEnd(el) {
        //    console.log('touchEnd');
            let dir = this.judgeDir(el)
            this.changeCurrentIndex(dir)
            this.change(this.currentIndex)
        },
        // 判断手势方向
        judgeDir(e) {
            let { clientX, clientY } = e.changedTouches[0]
            let { startX, startY } = this
            let dir = ''
            let x = clientX - startX
            let y = clientY - startY
            if (Math.abs(x) > Math.abs(y) && x > 0) {
                dir = 'right'
            } else if (Math.abs(x) > Math.abs(y) && x < 0) {
                dir = 'left'
            } else if (Math.abs(y) > Math.abs(x) && y > 0) {
                dir = 'bottom'
            } else if (Math.abs(y) > Math.abs(x) && y < 0) {
                dir = 'top'
            }
            return dir
        },

        // 根据手势方向 切换index
        changeCurrentIndex(dir = 'left') {
            let obj = {
                // 下一页
                left: () => {
                    this.currentIndex += 1
                },
                // 上一页
                right: () => {
                    this.currentIndex -= 1
                },
            }

            obj[dir]()
        },

        // 每次页面切换 向上传递当前的 index
        change(index) {
            this.$emits('change', index)
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-swiper {
    position: relative;
    max-width: 100vw;
    overflow: hidden;
}

.kl-swiper-cover {
    display: flex;
    position: absolute;
}

.kl-swiper::after {
    content: '';
    height: 0;
    clear: both;
    overflow: hidden;
    display: block;
    visibility: hidden;
}
</style>
