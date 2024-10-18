<template>
    <div class="watermark-container" ref="parentRef">
        <slot></slot>
        <!-- 我们要做的就是在这里添加一个 div，填充满整个区域，设置水印背景并且重复 -->
    </div>
</template>

<script>
export default {
    props: {
        text: {
            // 传入水印的文本
            type: String,
            required: true,
            default: 'blog',
        },
        fontSize: {
            // 字体的大小
            type: Number,
            default: 40,
        },
        gap: {
            // 水印重复的间隔
            type: Number,
            default: 80,
        },
    },
    data() {
        return {
            number: 0,
            ob: null,
        }
    },
    watch: {
        number: {
            handler() {
                this.init()
            },
            immediate: true,
            div:null
        },
    },
    mounted() {
        let { parentRef } = this.$refs
        this.ob = new MutationObserver((records) => {
            // 循环节点的动作
            for (const record of records) {
                // 如果有节点被删除，循环一下判断是否有水印的节点
                for (const dom of record.removedNodes) {
                    if (dom === this.div) {
                        this.number++
                        return
                    }
                }
                // 如果有节点被修改，判断一下是否是水印的节点
                if (record.target === this.div) {
                    this.number++
                    return
                }
            }
        })
        this.ob.observe(parentRef, {
            childList: true,
            attributes: true,
            subtree: true,
        })
    },
    beforeDestroy() {
        this.ob.disconnect()
    },
    methods: {
        async init() {
            await this.$nextTick()
            let { parentRef } = this.$refs
            const { base64, styleSize } = this.useWatermarkBg({
                text: this.text,
                fontSize: this.fontSize,
                gap: this.gap,
            })
            const div = document.createElement('div')
            div.style.backgroundImage = `url(${base64})`
            div.style.backgroundSize = `${styleSize}px ${styleSize}px`
            div.style.backgroundRepeat = 'repeat'
            div.style.inset = '0'
            div.style.zIndex = 100
            // 设置绝对定位
            div.style.position = 'absolute'
            // 设置点击穿漏，防止底部元素失去鼠标事件的交互
            div.style.pointerEvents = 'none'
            parentRef.appendChild(div)
            this.div = div
        }
    },
}
</script>
