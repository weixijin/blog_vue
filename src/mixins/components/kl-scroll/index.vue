<template>
    <div :class="['zl-scroll better-scroll kl-scroll',isBar?'':'no-bar']" :style="{ maxHeight: scrollHeight + 'px' }">
        <slot></slot>
        <div class="page-bottom" v-show="pageOption.page">
            <template v-if="pageOption.total">
                <div
                    class="f-14 flex-center h-40 c-999 kl-scroll-page-bottom"
                    v-if="pageOption.page * pageOption.limit >= pageOption.total"
                >
                    没有更多数据了~
                </div>
                <div class="f-14 flex-center h-40 c-999" v-else>
                    <van-loading type="spinner" size="18px" />
                    <span class="m-l-10">
                        加载中...
                    </span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isBar:{
            // 是否显示滚动条
            type: Boolean,
            default: true,
        },
        // 分页数据 必须满足如下格式 {page,limit,total}
        pageOption: {
            type: Object,
            default: () => {
                return {}
            },
        },
        list: {
            // 列表数据，需要监听，当数据变化时，重新计算滚动区域高度
            type: Array,
            default: () => [],
        },
        minHeight: {
            // 距离底部多远开始请求接口
            type: Number,
            default: 100,
        },
        scrollHeight: {
            // 滚动区域高度
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            isEmit: false,
            scroll_el: null,
            scrollTop: 0,
        }
    },
    watch: {
        list: {
            handler(newVal, oldVal) {
      
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal) && newVal.length > 0) {
                    this.init()
                }
            },
            deep: true,
            immediate: true,
        },
    },
    beforeDestroy() {
        // 先取消滚动监听
        if (!this.scroll_el) return
        this.scroll_el.removeEventListener('scroll', this.scrollEvent)
    },
    methods: {
        // 滚动到具体的位置
        go(number){
            if(!this.scroll_el) return
            this.scroll_el.scrollTop = number
        },
        // 滚动事件
        scrollEvent() {
   
            if (!this.scroll_el) return
            let { minHeight } = this
            // 获取滚动区域总高度
            let scroll_height = this.scroll_el.offsetHeight
            // 获取滚动区域内容高度
            let scroll_content_height = this.scroll_el.scrollHeight
            if (scroll_content_height <= scroll_height || this.isEmit) return
            // 获取滚动区域距离顶部的距离
            let scroll_top = this.scroll_el.scrollTop
            this.scrollTop = scroll_top
            this.$emit('scroll', scroll_top)
            // 判断是否滚动到底部
            if (scroll_height + scroll_top + minHeight >= scroll_content_height) {
                this.isEmit = true
                this.$emit('bottom')
            }
        },
        // 触底加载
        async init() {
   
            await this.$nextTick()
            this.isEmit = false
            // 获取滚动区域
            this.scroll_el = document.querySelector('.zl-scroll')
  
            // 先取消滚动监听
            if (!this.scroll_el) return

            this.scroll_el.removeEventListener('scroll', this.scrollEvent)
            //   监听滚动
            this.scroll_el.addEventListener('scroll', this.scrollEvent)
        },
    },
}
</script>
<style scoped>
.zl-scroll {
    overflow-y: auto;
}
</style>
