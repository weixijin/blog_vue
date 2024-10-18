<template>
    <div :class="['kl-back-top z-99 cu pf']" @click="handleClick"></div>
</template>

<script>
export default {
    components: {},
    props: {
        el: {
            // 监听滚动的元素
            type: String,
            default: 'body',
        },
        scrollNumber: {
            // 滚动多少显示返回顶部
            type: Number,
            default: 1000,
        },
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.removeEvent()
    },
    methods: {
        removeEvent() {
            let scroll_el = $(this.el)
            if (!scroll_el) return
            $(this.el).unbind('scroll', function () {})
        },
        async init() {
            await this.$nextTick()
            let scroll_el = $(this.el)
            if (!scroll_el) return
            // 移除绑定的事件
            this.removeEvent()
            scroll_el.on('scroll', () => {
                let scrollTop = scroll_el.scrollTop() || 0
                let el = $('.kl-back-top')
                if (!el) return
                el.css({
                    display: scrollTop > this.scrollNumber ? 'block' : 'none',
                })
            })
        },

        handleClick() {
            let el = document.querySelector('.kl-back-top')
            if (!el) return
            // x轴方向的动画位置
            const nums = [182, 325, 611, 469, 754, 897, 40]
            let i = 0
            let go_top = 0
            let timer = setInterval(() => {
                go_top = -nums[i]
                el.style.backgroundPositionX = go_top + 'px'
                i++
                if (i > 7) {
                    // 竖直方向的动画
                    clearInterval(timer)
                    timer = null
                    // el上添加类fly
                    el.classList.add('fly')
                    // 返回顶部
                    $(this.el).animate({ scrollTop: 0 }, 300)
                    let timer1 = setTimeout(() => {
                        clearInterval(timer1)
                        timer1 = null
                        // 清除fly类
                        el.classList.remove('fly')
                        el.style.display = 'none'
                    }, 300)
                }
            }, 20)
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-back-top {
    display: none;
    bottom: 100px;
    right: 20px;
    transform: translateY(0);
    width: 62px;
    height: 85px;
    margin-left: 602px;
    cursor: pointer;
    background-image: url('//image.zlketang.com/public/news/others/imgs/blog/space-to-top.png');
    background-position: -40px -44px;
}

.fly {
    transform: translateY(-1000px);
    transition: transform 0.3s ease-in;
}
</style>
