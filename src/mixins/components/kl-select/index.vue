<template>
    <div class="kl-select">
        <div class="kl-select-input-cover">
            <input
                ref="inputRef"
                class="kl-select-input"
                type="text"
                :placeholder="placeholder"
                v-model="inputVal"
                @focus="inputFocus"
                @blur="inputBlur"
            />
            <svg
                t="1638588522484"
                :class="['icon', isFocus ? 'top' : '']"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3335"
                width="12"
                height="12"
            >
                <path
                    d="M533.931 739.588c-12.692 12.692-33.187 12.774-45.778 0.185L74.383 326c-12.592-12.591-12.509-33.087 0.183-45.779s33.188-12.774 45.779-0.184L534.117 693.81c12.588 12.59 12.507 33.086-0.186 45.778z m413.92-458.325c12.693 12.692 12.775 33.188 0.185 45.778L534.264 740.812c-12.59 12.591-33.086 12.508-45.779-0.184-12.692-12.692-12.773-33.188-0.184-45.779l413.771-413.77c12.592-12.59 33.088-12.508 45.78 0.184z"
                    p-id="3336"
                    fill="#666666"
                ></path>
            </svg>
        </div>

        <div class="kl-ul-cover" v-show="isFocus">
            <i class="kl-sj"> </i>
            <div class="kl-ul-maxheight">
                <!-- 滚动条 -->
                <div
                    class="kl-bar"
                    v-show="isBarShow && bar"
                    @mouseup="mouseupBar"
                    @mousedown="mousedownBar($event)"
                    ref="barCoverRef"
                >
                    <div
                        class="kl-scroll-bar-cover"
                        @mouseup.stop="mouseupBarScroll"
                        @mousedown.stop="mousedownBarScroll($event)"
                        @mouseleave="mouseleaveBar"
                        ref="barRef"
                    >
                        <div class="kl-scroll-bar" :style="{ height: barHeight + 'px' }"></div>
                    </div>
                </div>

                <!-- options选项 -->
                <div :class="['kl-scroll-cover', bar ? 'bar' : '']" ref="scrollCoverRef">
                    <ul ref="ulRef">
                        <li
                            v-for="(option, index) in filtersOptions"
                            :key="index"
                            @mousedown="handlelabel(option)"
                            :class="[
                                inputVal === option.label ? 'active' : '',
                                currentIndex === index ? 'active1' : '',
                            ]"
                            :style="{ height: liOption.height + 'px' }"
                        >
                            {{ option.label }}
                        </li>
                        <li class="no-data" v-if="filtersOptions.length === 0">暂无匹配数据</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: '请选择',
        },
        value: {
            // 父组件默认传递过来的value
            type: String,
        },
        options: {
            // 传入的配置项
            type: Array,
            default: [],
            required: true,
        },
        liOption: {
            // 显示的li每项的配置信息,传递参数一旦有修改，一定要传递两
            type: Object,

            default: {
                number: 7, // 最多显示几条
                height: 34, // 每项高度
            },
        },
        bar: {
            // true使用自定义的滚动条 false使用默认的滚动条
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            coverHeight: 0,
            disy: 0,
            disx: 0,
            barCoverTop: 0,
            isBarMouseDown: false,
            isFocus: false,
            currentIndex: 0,
            inputVal: '',
            inputVal_: '',
            filtersOptions: this.options,
            barHeight: 0,
            scrollRotate: 1,
            inputBlurTimer: null,
            isBarShow: true,
            value_: '',
            maxIndex: 0,
        }
    },
    mounted() {
        let that = this
        // 开始监听键盘的输入
        document.querySelector('body').addEventListener('keydown', function (e) {
            switch (Number(e.keyCode)) {
                case 13: // 回车选中当前值
                    that.isFocus = false
                    let option = that.filtersOptions[that.currentIndex]
                    that.inputVal = option.label
                    that.inputVal_ = that.inputVal
                    that.$emit('input', option.value)
                    that.currentIndex = 0
                    that.$refs.inputRef.blur()

                    break
                case 38: // 上键
                    that.scrollBarEvent('pre')

                    break
                case 40: // 下键
                    that.scrollBarEvent('next')
                    break
            }
        })
    },
    beforeDestroy() {
        clearTimeout(this.inputBlurTimer)
        this.inputBlurTimer = null
    },
    watch: {
        value(val) {
            let option = this.options.find((item) => {
                return item.value === val
            })

            if (option) {
                this.inputVal = option.label
                this.value_ = option.label
            }
        },
        options: {
            handler() {
                if (this.options.length === 0) {
                    return
                }

                let option = this.options.find((item) => {
                    return item.value === this.value
                })

                if (option) {
                    this.inputVal = option.label
                    this.value_ = option.label
                }
            },
        },
        inputVal: {
            handler(val) {
                if (!this.isFocus) {
                    return
                }

                if (!val) this.filtersOptions = this.options

                this.currentIndex = 0

                // 具体的筛选展示
                this.filterOptions(val)
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        barMoveEvent(el) {
            let pageY = el.pageY
            // 获取鼠标的距离顶部的距离
            let mouseTop = pageY - this.barCoverTop
            // 获取当前滚动条距离相对定位目标顶部的距离
            let barTop = this.$refs.barRef.style.top
                ? this.$refs.barRef.style.top
                : this.$refs.barCoverRef.getBoundingClientRect().top -
                  this.$refs.barRef.getBoundingClientRect().top
            if (typeof barTop === 'string') {
                barTop = barTop.replace('px', '') - 0
            }

            this.$refs.barRef.style.top = mouseTop - this.disy + 'px'
            let top = mouseTop - this.disy
            if (top > this.coverHeight - this.barHeight) {
                this.$refs.barRef.style.top = this.coverHeight - this.barHeight + 'px'
            }

            if (top < 0) {
                this.$refs.barRef.style.top = 0 + 'px'
            }

            // 开启左侧同步
            this.$refs.scrollCoverRef.scrollTop = Math.floor(
                top * (this.coverHeight / this.barHeight),
            )
        },

        // 滚动条变化同步左侧
        syncHeight() {},
        // 内测bar down
        mousedownBarScroll(el) {
            this.isBarMouseDown = true
            // 获取相对定位元素距离页面顶部的布局
            this.barCoverTop = this.$refs.barCoverRef.getBoundingClientRect().top
            // 获取鼠标相对el的位置
            this.disy = el.pageY - el.target.getBoundingClientRect().top

            // console.log(this.disx, this.disy)
            // 开启移动监听
            document.addEventListener('mousemove', this.barMoveEvent)

            // 移除
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', this.barMoveEvent)
            })
        },

        // 内测bar up
        mouseupBarScroll() {
            this.isBarMouseDown = false
            this.$refs.inputRef.focus()

            // 移除
            document.removeEventListener('mousemove', this.barMoveEvent)
        },
        // 外侧bar down
        mousedownBar(el) {
            this.isBarMouseDown = true
            // 查看当前的点击目标
            let pageY = el.pageY
            let barTop = this.$refs.barRef.getBoundingClientRect().top
            let styleTop = this.$refs.barRef.style.top.replace('px', '') - 0

            if (pageY > barTop) {
                // 向下
                if (styleTop + 2 * this.barHeight > this.coverHeight) {
                    this.$refs.barRef.style.top = this.coverHeight - this.barHeight + 'px'
                    // 同步
                    this.asycHeight()
                    return
                }
                this.$refs.barRef.style.top = styleTop + this.barHeight + 'px'
                // 同步
                this.asycHeight()
            }

            if (pageY < barTop) {
                // 向上
                if (styleTop - this.barHeight < 0) {
                    this.$refs.barRef.style.top = 0 + 'px'
                    // 同步
                    this.asycHeight()
                    return
                }
                this.$refs.barRef.style.top = styleTop - this.barHeight + 'px'
                // 同步
                this.asycHeight()
            }
        },
        asycHeight() {
            let top = this.$refs.barRef.style.top.replace('px', '') - 0
            this.$refs.scrollCoverRef.scrollTop = Math.floor(
                top * (this.coverHeight / this.barHeight),
            )
        },
        // 外侧bar up
        mouseupBar() {
            this.isBarMouseDown = false
            this.$refs.inputRef.focus()
        },

        // 鼠标离开内侧滚动条
        mouseleaveBar() {
            this.isBarMouseDown = false
            this.$refs.inputRef.focus()

            // // 清除内测监听的鼠标移动事件
            // this.$refs.barRef.removeEventListener('mousemove', this.barMoveEvent)
        },

        // 按上下键切换选项，相关
        scrollBarEvent(direction) {
            if (direction === 'next') {
                if (this.currentIndex === this.filtersOptions.length - 1) {
                    this.$refs.scrollCoverRef.scrollTop = 0
                    return (this.currentIndex = 0)
                }
                this.currentIndex += 1

                if (this.currentIndex > this.liOption.number - 1) {
                    this.$refs.scrollCoverRef.scrollTop =
                        (this.currentIndex - (this.liOption.number - 1)) * this.liOption.height
                }

                return
            }
            // pre
            if (this.currentIndex === 0) {
                this.$refs.scrollCoverRef.scrollTop =
                    (this.filtersOptions.length - 1 - (this.liOption.number - 1)) *
                    this.liOption.height
                return (this.currentIndex = this.filtersOptions.length - 1)
            }
            if (this.currentIndex > 0) {
                this.currentIndex += -1
                // 需要再确定精度 --- 这儿还缺少对 0~6
                this.$refs.scrollCoverRef.scrollTop =
                    (this.currentIndex - (this.liOption.number - 1)) * this.liOption.height
            }
        },

        // 模糊收缩列表的展示
        filterOptions(val) {
            // 只展示匹配项
            this.filtersOptions = this.options.filter((option) => {
                if (option.label.includes(val)) {
                    return option
                }
            })

            this.inputFocus()
        },
        // ul在上下键时的滚动事件
        scrollEvent(e) {
            let scrollTop = e.target.scrollTop
            let top = Math.floor(scrollTop / this.scrollRotate) + 'px'
            this.$refs.barRef.style.top = top
        },

        // focus事件
        inputFocus() {
            let that = this
            this.filtersOptions = this.options.filter((item) => {
                if (item.label.includes(this.inputVal)) {
                    return item
                }
            })
            this.isFocus = true
            this.$forceUpdate()
            // 监听ul的滚动
            this.$nextTick(() => {
                this.$refs.scrollCoverRef.style.maxHeight =
                    this.liOption.number * this.liOption.height + 'px'
                const style = window.getComputedStyle(this.$refs.scrollCoverRef)
                const style1 = window.getComputedStyle(this.$refs.ulRef)
                // 可见区高度
                let coverHeight = style.height.replace('px', '') - 0
                this.coverHeight = coverHeight
                // 可滚动区的总高度
                let scrollHeight = style1.height.replace('px', '') - 0
                if (scrollHeight <= coverHeight) {
                    this.isBarShow = false
                    return
                }

                this.isBarShow = true

                // 滚动条高度
                this.barHeight = Math.floor((coverHeight * coverHeight) / scrollHeight)

                this.scrollRotate = scrollHeight / coverHeight
            })
            this.$refs.scrollCoverRef.addEventListener('scroll', this.scrollEvent)
            this.$refs.barRef.addEventListener('mousedown', function () {
                clearTimeout(that.inputBlurTimer)
                that.inputBlurTimer = null
            })
        },

        // 失去焦点
        inputBlur() {
            if (this.isBarMouseDown) {
                return
            }
            this.isFocus = false
            if (this.inputVal_ !== this.inputVal) {
                this.inputVal = this.inputVal_ ? this.inputVal_ : this.value_
            }
        },

        // 将value值返回
        handlelabel(option) {
            this.isFocus = false
            this.inputVal = option.label
            this.inputVal_ = option.label
            this.$emit('input', option.value)
        },
    },
}
</script>

<style lang="scss" scoped>
$primary: #409eff;
$primary_: #f5f7fa;
.kl-select {
    width: 220px;
    .kl-select-input-cover {
        position: relative;
        svg {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translate(0, -50%);
            transition: all 0.5s;
        }
    }
    .kl-select-input {
        width: 220px;
        padding-right: 30px;
        padding-left: 10px;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        color: #666;
        &:focus {
            border-color: $primary;
        }
    }

    .kl-ul-cover {
        margin-top: 13px;
        position: relative;
        .kl-sj {
            position: absolute;
            top: -5px;
            left: 30px;
            display: block;
            width: 7px;
            height: 7px;
            border: 1px solid #ddd;
            border-left: none;
            border-top: none;
            background-color: #fff;
            transform: rotate(-135deg);
            z-index: 999;
        }
    }

    .kl-ul-maxheight {
        padding: 5px 0;
        box-shadow: 0 0 5px #cdcdcd;
        position: relative;

        .kl-scroll-cover {
            border-radius: 4px;
            overflow-y: auto;
        }
    }

    ul {
        cursor: pointer;
        background-color: #fff;

        li {
            vertical-align: baseline;
            padding-left: 10px;
            display: flex;
            align-items: center;
            color: #666;
            font-size: 14px;
            &:hover {
                background-color: $primary_;
            }
        }
        .no-data {
            color: #aaa;
            padding: 5px 0;
            justify-content: center;
        }
    }
}

::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #ccc;
}
::-moz-placeholder {
    /* Firefox 19+ */
    color: #ccc;
}
:-ms-input-placeholder {
    /* IE 10+ */
    color: #ccc;
}
:-moz-placeholder {
    /* Firefox 18- */
    color: #ccc;
}

.active {
    color: $primary !important;
    font-weight: 600 !important;
}
.active1 {
    background-color: $primary_ !important;
}
.top {
    transform: translate(0, -50%) rotate(-180deg) !important;
}
.kl-bar {
    height: 238px;
    position: absolute;
    top: 5px;
    right: 0px;
    width: 12px;
    cursor: pointer;
    .kl-scroll-bar-cover {
        padding-right: 2px;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        width: 12px;
        .kl-scroll-bar {
            width: 6px;
            border-radius: 3px;
            background-color: #dfdfdf;
            z-index: 9999;
        }
    }
}

.bar {
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
