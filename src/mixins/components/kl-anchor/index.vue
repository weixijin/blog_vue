<template>
    <div class="kl-anchor" :style="{ height: scrollHeight + 'px' }" ref="anchorRef">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        // 当前选中的id
        activeId: {
            type: String,
            default: '',
        },
        scrollHeight: {
            // 可滚动区域的高度
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            childrenArr: [], // 子节点的高度
            ids: [], // 子组件的id集合
        }
    },

    beforeUpdate() {
        if (this.childrenArr.length > 0 && this.ids.length > 0) {
            return
        }
        setTimeout(() => {
            this.init()
        }, 1000)

        // 给容器绑定滚动
    },
    beforeDestroy() {
        this.$refs.anchorRef.removeEventListener('scroll', this.eventScroll)
    },
    watch: {
        activeId(val) {
            let index = this.ids.findIndex((item) => item === val)
            this.$refs.anchorRef.scrollTop = this.childrenArr[index - 1] || 0
        },
    },
    methods: {
        // 初始化
        init() {
            // 获取子节点的高度集合
            let els = Array.from(this.$refs.anchorRef.querySelectorAll('.kl-anchor-item'))
            // 子组件id
            this.ids = els.map((el) => el.id)

            // 子组件高度
            this.childrenArr = els.reduce((pre, cur, index) => {
                if (index === 0) {
                    pre.push(cur.offsetHeight)
                } else {
                    pre.push(pre[index - 1] + cur.offsetHeight)
                }
                return pre
            }, [])

            // console.log(this.childrenArr);

            // 开启滚动  --- 需要先清除滚动
            this.$refs.anchorRef.addEventListener('scroll', this.eventScroll)
        },
        eventScroll() {
            let scrollTop = this.$refs.anchorRef.scrollTop
            // 当滚动了一定高度，触发对应的子组件的返回
            // 对第一个需要额外判断
            for (let i = 0; i < this.childrenArr.length; i++) {
                if (this.activeId !== this.ids[0] && scrollTop < this.childrenArr[0]) {
                    // console.log('kkk1');
                    this.$children[0].changeCom(this.ids[0])
                }
                if (
                    this.activeId !== this.ids[i + 1] &&
                    scrollTop >= this.childrenArr[i] &&
                    scrollTop < this.childrenArr[i + 1]
                ) {
                    this.$children[i].changeCom(this.ids[i + 1])
                }
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.kl-anchor {
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
