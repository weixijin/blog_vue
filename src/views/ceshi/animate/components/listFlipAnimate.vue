<template>
    <div class="demo m-t-10 m-b-20">
        <el-button @click="px"> 排序 </el-button>

        <div class="list m-t-10">
            <transition-group name="list">
                <div
                    :class="[
                        'item flex-wrap flex-justify-between flex-center-wrap cu flip-item',
                        'flip' + index,
                    ]"
                    v-for="(item, index) in list"
                    :key="item.value"
                >
                    <span>
                        {{ item.label }}
                    </span>

                    <el-button size="small" type="danger" @click="del(item)"> 删除 </el-button>
                </div>
            </transition-group>
            <el-input class="m-t-20" v-model="value" @keyup.enter.native="submit"></el-input>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            value: '',
            list: [],
        }
    },
    created() {
        for (var i = 0; i < 7; i++) {
            let obj = {
                label: '中文' + i,
                value: this.createId(),
            }

            this.list.push(obj)
        }
    },
    mounted() {
        // this.loadScript('https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/Flip.min.js').then(
        //     () => {
        //         this.init()
        //     },
        // )
    },
    methods: {
        init() {
            const state = Flip.getState('.flip-item', {
                props: 'color,backgroundColor',
                simple: true,
            })
            Flip.from(state, {
                duration: 1,
            })
        },
        del({ value }) {
            this.list = this.list.filter((item) => item.value !== value)
        },
        getStyle(el) {
            return el.getBoundingClientRect()
        },
        removeStyle(el){
            $(el).removeAttr('style')
        },

        // 批量设置样式
        setStyle(el, style) {
            for (let key in style) {
                el.style[key] = style[key]
            }
        },
        /**
         * 对列表任意两个乱序
         * **/
        async px() {
            let { length } = this.list
            let number = Math.floor(Math.random() * length)
            let number1 = length - number - 1
            let arr = this.deepClone(this.list)
            this.list.forEach((item, index) => {
                if (number === index) {
                    arr[number1] = this.list[index]
                }
                if (number1 === index) {
                    arr[number] = this.list[index]
                }
            })

            // 找出这两个交换的节点的位置
            let el = document.querySelector(`.flip${number}`)
            let el1 = document.querySelector(`.flip${number1}`)

            this.setStyle(el, {
                transition: 'transform 0.5s',
                transform: `translateY(${0}px)`,
            })
            this.setStyle(el1, {
                transition: 'transform 0.5s',
                transform: `translateY(${0}px)`,
            })
            let style = this.getStyle(el)
            let style1 = this.getStyle(el1)
            let tY = style.top - style1.top

            await this.$nextTick()

            this.setStyle(el, {
                transform: `translateY(${-tY}px)`,
            })
            this.setStyle(el1, {
                transform: `translateY(${tY}px)`,
            })

            setTimeout(() => {
                // 移除设置的style
                this.removeStyle(el)
                this.removeStyle(el1)
                this.list = arr
            }, 500)
        },
        submit() {
            let { value } = this
            if (!value) {
                return
            }
            let obj = {
                label: value,
                value: this.createId(),
            }

            this.list.push(obj)
            this.value = ''
        },
    },
}
</script>

<style lang="scss" scoped>
.list {
    max-width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 5px #aaa;
}
.item {
    background-color: rgb(82, 190, 190);
    border-radius: 20px;
    color: #fff;
    padding: 10px 20px;
    margin-bottom: 10px;
    &:nth-last-of-type(1) {
        margin-bottom: 0px;
    }
}

.list-enter-active,
.list-leave-active {
    transition: all 0.8s;
}
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translatex(-60px);
}
.list-leave-to {
    opacity: 0;
    transform: translatex(60px);
}
</style>
