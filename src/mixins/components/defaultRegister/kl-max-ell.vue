<template>
    <el-tooltip effect="dark" :disabled="disabledTip" :placement="placement">
        <template slot="content">
            <p class="tip-class" :style="{ 'max-width': tooltipMaxWidth + 'px' }">{{ value }}</p>
        </template>
        <div :class="['max-ell', ellClass, pageClass]" @click="clickFun" :style="{lineHeight:lineHeight+'px'}">
            {{ value }}
        </div>
    </el-tooltip>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        lineHeight: {
            // 每行高度 line-height 如果行高改变一定要记得改这个值
            type: Number,
            default: 23,
        },
        ell: {
            // 最大行数
            type: Number,
            default: 2,
        },
        placement: {
            // 提示方向
            type: String,
            default: 'top',
        },
        tooltipMaxWidth: {
            type: Number,
            default: 300,
        },
        isShowTip:{
            // 多行，超出是否需要提示
            type:Boolean,
            default: true,
        }
    },
    data() {
        return {
            pageClass: this.createId(),
            ellClass: '',
            disabledTip: true,  // 默认不显示
        }
    },
    watch: {
        value() {
            this.init()
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        clickFun() {
            this.$emit('click')
        },
        async init() {
            let { ell, lineHeight,isShowTip } = this
            this.ellClass = ''
            await this.$nextTick()
            if (lineHeight <= 0) return
            let el = $(`.${this.pageClass}`)
            if (!el) return
            // 1.获取当前高度
            let h = el.height()
            // 2.获取当前行数
            let line = Math.floor(h / lineHeight)
            if (line > ell) { 
                this.ellClass = `ell-${ell}`
                if(isShowTip){
                    this.disabledTip = false
                }
            }
        },
        createId() {
            return 'kl' + Date.now() + Math.random().toString(36).substr(2)
        },
    },
}
</script>

<style lang="scss" scoped>
.max-ell {
    font-size: 14px;
    font-weight: 400;
    color: #606266;
}
.tip-class {
    line-height: 20px;
    font-size: 14px;
}

/*//单行省略                                                                                              */
.ell-1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/*//几行省略                                                                                              */

.ell-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.ell-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.ell-4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}
</style>
