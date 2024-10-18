<template>
    <div class="kl-nav" :id="navId">
        <div class="kl-nav-main">
            <div class="kl-nav-line" :style="{ width: width + 'px' }">
                <div
                    class="pos-dio"
                    :style="`${direction === 'left' ? 'right' : 'left'}:${-item * 6}px`"
                    v-for="item in 3"
                    :key="item"
                ></div>
            </div>
            <div
                v-for="(item, index) in list"
                :key="item.value"
                :class="[currentTabIndex === index ? 'tab-active' : '', 'kl-nav-pane']"
                @click="changeTable(index)"
                :style="{ marginRight: rightNum + 'px' }"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            // 顶部配置
            type: Array,
            default: [],
        },
        active: {
            // 当前选中项
            type: String,
            default: '',
        },
        rightNum: {
            // 项之间的距离
            type: Number,
            default: 20,
        },
        width: {
            // 滑动块宽度
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            currentTabWidth: 0,
            tablePaneArr: [], // table-plan的宽
            currentTabIndex: 0,
            navId: '',
            direction: 'right',
        }
    },

    created() {
        this.navId = 'wxj' + this.createId()
    },
    mounted() {
        this.$nextTick(() => {
            this.setLinePos('init')
        })
    },

    watch: {
        active() {
            this.setLinePos()
        },
        currentTabIndex(newVal, oldVal) {
            if (newVal > oldVal) {
                this.direction = 'right'
            } else {
                this.direction = 'left'
            }
        },
    },

    methods: {
        // 获取导航栏每项的宽度
        getNavTabWidth() {
            // 获取 所有tab-plan 的宽
            this.tablePaneArr = []
            let els = document.querySelectorAll(`#${this.navId} .kl-nav-pane`)
            if (els && els.length > 0) {
                els.forEach((item, index) => {
                    // 使用这个可以获取更加准确的信息
                    if (item) {
                        this.tablePaneArr.push(item.getBoundingClientRect().width)
                    }
                })
            }
        },
        // 切换tab
        changeTable(index) {
            // 底部下划线
            this.$emit('change', this.list[index].value)
        },
        // 设置下面标签的位置
        setLinePos(isInit) {
            this.currentTabIndex = this.list.findIndex((item) => {
                return item.value === this.active
            })

            if (!this.active || this.currentTabIndex === -1) {
                this.currentTabIndex = 0
            }
            this.$nextTick(() => {
                this.getNavTabWidth()

                // 拿到当前激活的tab的宽
                this.currentTabWidth = this.tablePaneArr[this.currentTabIndex]
                let el = document.querySelector('.kl-nav-line')
                // 设置当前滑动块的位置
                let { width } = this
                let leftWidth = 0
                this.tablePaneArr.forEach((item, index) => {
                    if (index < this.currentTabIndex) {
                        leftWidth = item + leftWidth
                    }
                })

                leftWidth = Math.floor(leftWidth)

                let left =
                    leftWidth +
                    this.currentTabIndex * this.rightNum +
                    (this.tablePaneArr[this.currentTabIndex] - width) / 2

                if (!el) return
                let oldLeft = el.style.left.replace('px', '') - 0
                let maxWidth = Math.abs(oldLeft - left)

                let dor_els = document.querySelectorAll('.pos-dio')
                let coverWidth = $(`#${this.navId}`).width()
                if (isInit) {
                    el.style.width = width + 'px'
                    el.style.left = left + 'px'
                    // 让当前选中项可视区居中

                    $(`#${this.navId}`).animate(
                        {
                            scrollLeft: left - coverWidth / 2 + 'px',
                        },
                        0,
                    )
                    return
                }

                if (this.direction === 'left') {
                    el.style.left = left + 'px'
                    el.style.width = maxWidth + 'px'
                    setTimeout(() => {
                        el.style.width = width + 'px'
                        dor_els.forEach((item, index) => {
                            item.style.right = -6 * index + 'px'
                            item.style.display = 'block'
                        })
                    }, 250)
                    setTimeout(() => {
                        dor_els.forEach((item) => {
                            item.style.right = 0 + 'px'
                        })
                    }, 350)

                    setTimeout(() => {
                        dor_els.forEach((item) => {
                            item.style.display = 'none'
                        })
                    }, 550)
                } else {
                    el.style.width = maxWidth + 'px'

                    setTimeout(() => {
                        el.style.left = left + 'px'
                        el.style.width = width + 'px'
                        dor_els.forEach((item, index) => {
                            item.style.left = -6 * index + 'px'
                            item.style.display = 'block'
                        })
                    }, 250)
                    setTimeout(() => {
                        dor_els.forEach((item) => {
                            item.style.left = 0 + 'px'
                        })
                    }, 350)
                    setTimeout(() => {
                        dor_els.forEach((item) => {
                            item.style.display = 'none'
                        })
                    }, 500)
                }

                // 让当前选中项可视区居中
                $(`#${this.navId}`).animate(
                    {
                        scrollLeft: left - coverWidth / 2 + 'px',
                    },
                    250,
                )
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-nav {
    width: 100vw;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        display: none;
    }
    .kl-nav-main {
        height: 40px;
        display: flex;
        cursor: pointer;
        position: relative;
        .kl-nav-line {
            position: absolute;
            bottom: 2px;
            height: 4px;
            background: linear-gradient(to right, $primary, $primary_0);
            transition: all 0.25s;
            border-radius: 2px;
            vertical-align: bottom;
            .pos-dio {
                position: absolute;
                width: 4px;
                height: 4px;
                background-color: $primary_0;
                border-radius: 50%;
                top: 0px;
                display: none;
                transition: all 0.2s;
            }
        }
        .kl-nav-pane {
            height: 40px;
            font-size: 15px;
            color: #555;
            white-space: nowrap;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: 12px;
        }

        .tab-active {
            color: $primary;
        }
    }
}
</style>
