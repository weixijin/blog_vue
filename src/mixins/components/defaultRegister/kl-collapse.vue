<template>
    <div :class="['kl-collapse', klCollapseClass]">
        <slot> kl-collapse </slot>
    </div>
</template>

<script>
export default {
    name: 'klCollapse',
    props: {
        value: {
            type: Boolean,
            default: true,
        },
        animate: {
            // 动画时间
            type: Number,
            default: 300,
        },
    },
    data() {
        return {
            klCollapseClass: this.createId(),
        }
    },
    watch: {
        value(val) {
            this.init()
        },
    },
    mounted() {
        this.init(true)
    },
    methods: {
        // 初始化
        async init(isInit) {
            let { animate, value, klCollapseClass } = this
            if (value && isInit) return
            await this.$nextTick()
            let el = document.querySelector(`.${klCollapseClass}`)

            if (!el) return
            // 每次初始化都需要先移除原来设置的高度
            el.removeAttribute('style')
            await this.$nextTick()
            // 重新获取高度
            let initHeight = el.offsetHeight
            if (value) {
                // 展开
                el.style.height = 0 + 'px'
                if (!isInit) {
                    el.style.transition = `height ${animate}ms ease-in-out`
                }
                await this.sleep(10)
                el.style.height = initHeight + 'px'
                await this.sleep(animate)
                el.style.height = 'auto'
                return
            }
            // 关闭
            el.style.height = initHeight + 'px'
            if (!isInit) {
                el.style.transition = `height ${animate}ms ease-in-out`
            }
            // 这儿必须使用延时
            await this.sleep(10)
            el.style.height = 0
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-collapse {
    overflow: hidden;
}
</style>
