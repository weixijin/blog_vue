<template>
    <div class="kl-ctrl_f">
        <div class="inputleft">
            <input
                v-model="inputVal"
                @input="inputChange"
                @keyup.enter="searchVal"
                id="keyword"
                type="text"
            />
            <div class="search_numbers">{{ preNum }}/{{ allNum }}</div>
        </div>
        <div class="icons">
            <kl-svg name="yooxi" @click="handlePage('pre')"></kl-svg>
            <kl-svg name="yooxi" class="kl-svg-next" @click="handlePage('next')"></kl-svg>
            <!-- <kl-svg name="close"></kl-svg> -->
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        defaultClass: {
            type: String,
            default: '.pos-page-main',
        },
    },
    data() {
        return {
            preNum: 0,
            allNum: 0,
            doing: false,
            allDomTop: [],
            // new
            inputVal: '',
            initDom: ['strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            // initDom: [
            //     'div',
            //     'code',
            //     'a',
            //     'span',
            //     'p',
            //     'strong',
            //     'h1',
            //     'h2',
            //     'h3',
            //     'h4',
            //     'h5',
            //     'h6',
            // ],
        }
    },
    mounted() {
        let that = this
        this.$nextTick(() => {
            //键盘监听回车
            document.onkeydown = function (event_e) {
                if (window.event) {
                    event_e = window.event
                }
                var int_keycode = event_e.charCode || event_e.keyCode
                var myInput = document.getElementById('keyword')

                if (that.inputVal && int_keycode == '13' && myInput !== document.activeElement) {
                    //回车键：13
                    that.searchVal()
                }
            }
        })
    },
    methods: {
        handlePage(type) {
            let obj = {
                next: () => {
                    this.nextActiveClass()
                },
                pre: () => {
                    if (this.allNum > 0) {
                        if (this.preNum > 1 && this.preNum <= this.allNum) {
                            this.removeActiveClass('#' + this.allDomTop[this.preNum - 1].id)
                            let { id } = this.allDomTop[this.preNum - 2]
                            this.addActiveClass('#' + id)
                            this.preNum -= 1
                        } else {
                            this.removeActiveClass('#' + this.allDomTop[0].id)
                            let { id } = this.allDomTop[this.allNum - 1]
                            this.addActiveClass('#' + id)
                            this.preNum = this.allNum
                        }

                        // 跳转到对应的位置
                        this.goToAnimation()
                    }
                },
            }

            if (type && Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },
        inputChange() {
            // 清空原来的高亮类
            this.clearOldActiveClass()
            // 绑定新的高亮
            this.FindAllDom()
        },
        FindAllDom() {
            let that = this
            let { inputVal, initDom, defaultClass } = this

            if (inputVal.length > 0) {
                inputVal = inputVal.toLowerCase()
                for (let i = 0; i < initDom.length; i++) {
                    let domStr = initDom[i]
                    let regExp = new RegExp(inputVal, 'g')
                    $(defaultClass + ' ' + domStr).each(function () {
                        let html = $(this).html().toLowerCase()
                        let content = $(this).text()

                        //不包含隐藏的HTML
                        if (content.indexOf(inputVal) >= 0 && html.indexOf(inputVal) >= 0) {
                            if (
                                !content.includes('search-height-light-class') ||
                                $(this)[0].children.length == 0
                            ) {
                                let id = 'wxj-' + that.createId()
                                if ($(this) && $(this).offset() && $(this).offset().top) {
                                    let obj = {
                                        // el: $(this),
                                        id,
                                        top: $(this).offset().top || 0,
                                    }

                                    that.allDomTop.push(obj)

                                    // 替换为高亮节点
                                    var newHtml = html.replace(
                                        regExp,
                                        `<font id='${id}' class="active-ctrl-mo-bg">` +
                                            inputVal +
                                            '</font>',
                                    )
                                    $(this).html(newHtml)
                                }
                            }
                        }
                    })
                }

                // 排序
                this.allDomTop = this.allDomTop.sort((a, b) => {
                    return a.top - b.top
                })
                this.allNum = this.allDomTop.length
                this.preNum = 0
                if (this.allNum > 0) {
                    this.preNum = 1
                    // 默认第一个高亮
                    let { id } = this.allDomTop[0]
                    this.addActiveClass('#' + id)
                    // 跳转到对应的位置
                    this.goToAnimation()
                }
            }
        },
        addActiveClass(id) {
            let { allDomTop } = this
            if (allDomTop.length > 0) {
                $(id).addClass('search-height-light-class')
            }
        },
        removeActiveClass(id) {
            // let content = $(id).html()
            // // replaceWith() 方法用指定的 HTML 内容或元素替换被选元素
            // $(id).replaceWith(content)
            $(id).removeClass('search-height-light-class')
        },

        resetDom(id) {
            let content = $(id).html()
            // replaceWith() 方法用指定的 HTML 内容或元素替换被选元素
            $(id).replaceWith(content)
        },
        clearOldActiveClass() {
            for (let i = 0; i < this.allDomTop.length; i++) {
                this.resetDom('#' + this.allDomTop[i].id)
            }

            this.allDomTop = []
            //清除数字标记
            this.preNum = 0
            this.allNum = 0
        },
        nextActiveClass() {
            if (this.allNum > 0) {
                if (this.preNum < this.allNum) {
                    this.removeActiveClass('#' + this.allDomTop[this.preNum - 1].id)
                    let { id } = this.allDomTop[this.preNum]
                    this.addActiveClass('#' + id)
                    this.preNum += 1
                } else {
                    // 清除最后一个高亮
                    this.removeActiveClass('#' + this.allDomTop[this.allNum - 1].id)
                    // 默认第一个高亮
                    let { id } = this.allDomTop[0]
                    this.addActiveClass('#' + id)
                    this.preNum = 1
                }

                // 跳转到对应的位置
                this.goToAnimation()
            }
        },

        searchVal() {
            // 如果原来没有 就是新的搜索
            if (!this.inputVal) {
                // 绑定新的高亮class
                return this.$message.error('请输入搜索内容')
            } else {
                // next
                this.nextActiveClass()
            }

            //
        },

        goToAnimation() {
            let { top, id } = this.allDomTop[this.preNum - 1]
            $('.pos-page-main').animate({ scrollTop: top - 90 }, 200)
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-ctrl_f {
    display: flex;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 5px 5px #aaa;
    border: 1px solid #ccc;
    background-color: #fff;
    .inputleft {
        display: flex;
        align-items: center;
        position: relative;

        input {
            height: 30px;
            width: 150px;
            font-size: 16px;
            color: #555;
            padding-right: 70px;
        }

        .search_numbers {
            padding-right: 15px;
            position: absolute;
            top: 50%;
            right: 5px;
            transform: translateY(-50%);
            font-size: 14px;
            color: #555;
        }
    }

    .icons {
        padding: 0 15px;
        border-left: 1px solid #ccc;
        display: flex;
        align-items: center;
        .kl-svg {
            margin-right: 10px;
            cursor: pointer;
            &:nth-last-of-type(1) {
                margin-right: 0;
            }
        }

        .kl-svg-next {
            transform: rotate(180deg);
        }
    }
}
</style>
