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
            klCollapseClass: '',
            initHeight: 0,
        }
    },
    watch: {
        value(val) {
            this.handleHeight(val)
        },
    },
    created() {
        this.klCollapseClass = this.createId()
    },
    mounted() {
        this.init()
    },
    methods: {
        // 初始化
        async init() {
            await this.$nextTick()
            let el = document.querySelector(`.${this.klCollapseClass}`)

            if (!el) return
            // 每次初始化都需要先移除原来设置的高度
            el.removeAttribute('style')
            el.style.transition = `height ${this.animate}ms ease-in-out`
            this.initHeight = 0
            await this.$nextTick()
            // 重新获取高度
            this.initHeight = el.offsetHeight
            this.handleHeight(this.value, el)
        },
        async handleHeight(val, el) {
            if (!el) {
                el = document.querySelector(`.${this.klCollapseClass}`)
            }

            if (!el) return

            if (val) {
                el.style.height = this.initHeight + 'px'
                setTimeout(() => {
                    el.style.height = 'auto'
                }, this.animate)
            } else {
                el.removeAttribute('style')
                this.initHeight = el.offsetHeight
                el.style.height = this.initHeight + 'px'
                el.style.transition = `height ${this.animate}ms ease-in-out`
                // 这儿必须使用延时
                await this.sleep(10)
                el.style.height = 0
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-collapse {
    overflow: hidden;
}
</style>
