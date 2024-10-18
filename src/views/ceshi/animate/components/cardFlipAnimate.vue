<template>
    <div class="demo">
        <div class="flex-content">
            <div
                :class="['item', (index + 1) % 4 ? 'm-r-50' : '', item.id]"
                v-for="(item, index) in list"
                :key="item.id"
            >
                <div class="flex-justify-between">
                    <div>
                        {{ item.title }}
                    </div>
                    <el-button class="m-t-10" size="small" @click="del(item.id)">删除</el-button>
                </div>
            </div>
        </div>

        <el-button @click="inset">任意位置插入一个</el-button>
        <el-button @click="init">重置</el-button>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            list: [],
            config: {
                width: 235, // 卡片宽度
                height: 100, // 卡片高度
                marginRight: 20, // 卡片右边距
                marginBottom: 20, // 卡片下边距
                flexContentWidth: 1000, // 卡片容器宽度
                lineNumber: 4, // 卡片容器一行放几个
            },
        }
    },
    created() {
        this.init()
    },
    methods: {
        /**
         * 处理出新的卡片的位置，可能是插入，可能是删除，或者乱序，或者重置
         * @param {Array} newList 新的数组
         * @param {number} TYPE  类型 1：删除 2：插入
         * @param {string} currentIndex  位置序号
         * @param {Boolean} animate - 插入的节点是否需要动画
         * **/
        async setAnimate(newList, type, currentIndex,animate=true) {
            if (![1, 2].includes(type) || typeof currentIndex !== 'number') {
                return
            }
            // 如果只有一个，或者变化的是最后一个，那么不需要动画
            if (
                (type === 1 && currentIndex === newList.length) ||
                (type === 2 && currentIndex === newList.length - 1)
            ) {
                this.list = newList
                return
            }
            let oldList = this.deepClone(this.list)
            this.list = newList
            // 有了这行代码，新加入的节点就会被渲染，这样就会默认的过渡动画
            if(animate){
                await this.$nextTick()
            }
     

            let { width, height, marginRight, marginBottom, lineNumber } = this.config
            // 找出卡片的新旧index
            const newListCopy = newList
                .map((item, newIndex) => {
                    let oldIndex = oldList.findIndex((itey) => itey.id === item.id)
                    return {
                        ...item,
                        oldIndex,
                        newIndex,
                    }
                })
                .filter((item) => item.oldIndex !== item.newIndex)

            // 设置动画
            newListCopy.forEach((item, index) => {
                let { oldIndex, newIndex, id } = item
                let el = document.querySelector(`.${id}`)
                if (!el) return
                // 起点的水平位置
                let sX = (oldIndex % lineNumber) * (width + marginRight)
                // 起点的垂直位置
                let sY = Math.floor(oldIndex / lineNumber) * (height + marginBottom)
                // 终点的水平位置
                let tX = (newIndex % lineNumber) * (width + marginRight)
                // 终点的垂直位置
                let tY = Math.floor(newIndex / lineNumber) * (height + marginBottom)

                let x = sX - tX
                let y = sY - tY

                let obj = {
                    x,
                    y,
                }
                if (oldIndex === -1 && animate) {
                    // 新增节点
                    Object.assign(obj, {
                        x: -100,
                        y: -100,
                        // 透明度
                        opacity: 0,
                    })
                }

                let that = this
                // 使用gsap完成动画 动画间加0.1s的延迟
                const animateTime = 0.5
                const delay = 0.05
                // 开始执行动画
                gsap.from(el, {
                    x,
                    y,
                    // 先快后慢
                    ease: 'power2.out',
                    duration: animateTime + index * delay,
                    immediateRender: true,
                    ...obj,
                    onComplete: async function () {
                        if (index === newListCopy.length - 1) {
                            that.list = newList
                        }
                    },
                })
            })
        },
        inset() {
            // 向任意位置插入一个
            let { list } = this
            let { length } = this.list
            let number = Math.floor(Math.random() * length)
            number = 0
            let id = this.createId()
            let obj = {
                title: '中文' + this.createId(),
                id,
            }
            let newList = [...list]
            newList.splice(number, 0, obj)
            this.setAnimate(newList, 2, number)
        },
        del(id) {
            let index = this.list.findIndex((item) => item.id === id)

            const newList = this.list.filter((item) => item.id !== id)
            this.setAnimate(newList, 1, index)
        },
        init() {
            this.list = []
            for (var i = 0; i < 10; i++) {
                let obj = {
                    title: '中文' + i,
                    id: this.createId(),
                }

                this.list.push(obj)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.flex-content {
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    background-color: #f5f5f5;
}
.item {
    width: 235px;
    height: 100px;
    background-color: rgb(188, 220, 207);
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 20px;
}
.m-r-50 {
    margin-right: 20px;
}
</style>
