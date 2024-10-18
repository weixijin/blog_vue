<template>
    <div
        class="animate-list"
        :style="{ height: containerHight + 'px' }"
        @mouseout="mouseoutEvent"
        @mouseover="mouseoverEvent"
    >
        <div :class="['animate-list-a', isPus ? 'box1' : '']" :id="aID">
            <div class="animate-item" v-for="(item, index) in allList" :key="index">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        containerHight: {
            type: Number,
            default: 200,
        },
        // 速度
        speed: {
            type: Number,
            default: 50,
        },
    },
    data() {
        return {
            isPus: false,

            allList: [],
            aID: this.createId(),
        }
    },
    watch: {
        list: {
            handler() {
                this.init()
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        // 鼠标移入
        mouseoverEvent() {
            this.isPus = true
        },
        // 鼠标移出
        mouseoutEvent() {
            this.isPus = false
        },

        // 初始化
        async init() {
            this.allList = this.deepClone(this.list)
            let { containerHight, speed } = this
            await this.$nextTick()
            let el_c = document.querySelector(`#${this.aID}`)
            let els = document.querySelectorAll('.animate-item')
            if (!el_c || els.length == 0) return
            // 获取el_c的高度
            let el_c_height = el_c.offsetHeight
            let el_height = els[0].offsetHeight
            if (containerHight > el_c_height) return
            // 取出前面的元素追加到后面
            let n = Math.ceil(containerHight / el_height)
            this.allList = this.allList.concat(this.allList.slice(0, n))
            await this.$nextTick()
            el_c_height = el_c.offsetHeight
            // 计算出需要滚动的距离
            let distance = el_c_height - containerHight
            // 计算出需要滚动的时间
            let time = distance / speed
            // 利用css变量来实现控制
            let bodyClass = document.getElementsByTagName('body')[0]
            if (bodyClass) {
                // 设置css变量
                bodyClass.style.setProperty('--list-a-y', `translateY(-${distance}px)`)
                // 设置动画时长
                el_c.style.animationDuration = `${time}s`
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.animate-list {
    overflow: hidden;
}
.animate-item {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
}

.animate-list-a {
    animation: a1 1s linear infinite;
}

:root {
    --list-a-y: translateY(-240px)
  }

@keyframes a1 {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: var(--list-a-y)
    }
}
.box1 {
    animation-play-state: paused;
}
</style>
