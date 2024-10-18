<template>
    <div class="kl-tab">
        <div class="kl-table-line" :style="{ width: lineWidth + 'px' }"></div>
        <div
            v-for="(item, index) in options"
            :key="item.value"
            :class="[value == item.value ? 'tab-active' : '', 'kl-tab-pane']"
            @click="changeTable(index)"
            :style="{ marginRight: rightNum + 'px' }"
        >
            {{ item.label }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            // 顶部配置
            type: Array,
            default: [],
        },
        value: {
            // 当前选中项
            type: String,
            default: '',
        },
        rightNum: {
            // 项之间的距离
            type: Number,
            default: 30,
        },
        lineWidth: {
            type: Number,
            default: 30,
        },
    },
    data() {
        return {
            isFirst: true,
            tablePaneArr: [], // table-plan的宽
            currentTabIndex: 0,
        }
    },
    watch: {
        value() {
            this.setLinePos()
        },
    },
    mounted() {
        this.setLinePos()
    },

    methods: {
        // 切换tab
        changeTable(index) {
            const value = this.options[index].value
            this.$emit('input', value)
            // 底部下划线
            this.$emit('change', value)
        },
        // 设置下面标签的位置
        async setLinePos() {
            await this.$nextTick()
            let els = document.querySelectorAll('.kl-tab > .kl-tab-pane')
            if (!els || els.length === 0) {
                await this.sleep(50)
                this.setLinePos()
                return
            }

            els.forEach((item) => {
                this.tablePaneArr.push(item.offsetWidth)
            })
            let el = document.querySelector('.kl-table-line')
            if (this.isFirst) {
                if (el) {
                    el.style.transition = ''
                }
            } else {
                if (el) {
                    el.style.transition = 'all 0.5s ease'
                }
            }

            this.isFirst = false
            // 拿到当前激活的table的宽
            this.currentTabIndex =
                this.options.findIndex((item) => {
                    return item.value == this.value
                }) || 0

            if (!this.value && this.currentTabIndex === -1) {
                this.currentTabIndex = 0
            }
            const currentTabWidth = this.tablePaneArr[this.currentTabIndex]

            if (el) {
                let leftWidth = 0
                this.tablePaneArr.forEach((item, index) => {
                    if (index < this.currentTabIndex) {
                        leftWidth = item + leftWidth
                    }
                })
                let str =
                    leftWidth +
                    this.rightNum * this.currentTabIndex +
                    (currentTabWidth - this.lineWidth) / 2 +
                    'px'
                el.style.transform = `translateX(${str})`
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-tab {
    display: flex;
    cursor: pointer;
    position: relative;
    height: 38px;
    .kl-table-line {
        position: absolute;
        bottom: 2px;
        left: 0;
        height: 4px;
        background: $primary;
        border-radius: 2px;
    }
    .kl-tab-pane {
        white-space: nowrap;
        display: flex;
        font-size: 18px;
        color: #606266;
        &:nth-last-of-type(1) {
            margin-right: 0px;
        }
    }
}

.tab-active {
    color: #303133 !important;
    font-weight: bold;
}
</style>
