<template>
    <div>
        <el-button @click="init">change</el-button>
        <div :class="['list', isFlag ? 'list-column' : '']">
            <div class="item-a" v-for="item in 3" :key="item">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            isFlag: false,
        }
    },
    mounted() {
        this.getIndexDBJS([
            {
                js: 'https://cdn.bootcdn.net/ajax/libs/gsap/3.12.2/gsap.min.js',
            },
            {
                js: '//image.zlketang.com/public/news/others/js/Flip.min.js',
            },
        ])
            .then((res) => {
                gsap.registerPlugin(Flip)
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    methods: {
        async init() {
            // 获取元素信息
            const state = Flip.getState('.item-a', {
                props: 'color,backgroundColor,flex',
                // simple: true,
            })
            //   await this.$nextTick()
            this.isFlag = !this.isFlag

            Flip.from(state, {
                absolute: true, // 在过渡动画运行的过程中，将元素的position设置为true
                stagger: 0.3, // 错开属性，让一个元素的动画相对于前一个元素有延迟
                duration: 0.7, // 持续时间
                ease: 'power2.inOut', // 运动轨迹
                simple: true, // 设置为true时，就不再监听 缩放、旋转、倾斜属性，一般情况下不建议开启，因为性能差别不大
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.list {
    display: flex;
}
.item-a {
    width: 200px;
    height: 200px;
    background-color: aqua;
    margin: 5px;
}
.list-column {
    flex-direction: column;
}
.list-column .item-a {
    background-color: red;
}
</style>
