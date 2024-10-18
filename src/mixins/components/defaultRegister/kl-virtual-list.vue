<template>
    <div
        class="kl-virtual-list"
        :style="{ height: max * size + 'px' }"
        @scroll="scrollEvent($event)"
    >
        <!-- 撑起容器 -->
        <div :style="{ height: list.length * size + 'px' }"></div>

        <!-- 虚拟列表容器 -->
        <div
            class="kl-virtual-list-container"
            :style="{ top: offsetTop + 'px' }"
        >
            <div
                v-for="item in itemList"
                :key="item.id"
                class="kl-virtual-list-item"
                :style="{ height: size + 'px' }"
            >
                {{ `当前数据id${item.id}` }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        list: {  // 数据列表
            type: Array,
            default: () => [],
        },
        size: { 
            // 预设的每个元素的高度，为了撑起一个容器
            type: Number,
            default: 40,
        },
        max: { // 最大显示数量，也是滚动容器的最大高度
            type: Number,
            default: 10,
        },
        additionalNUmber: { // 预加载数量
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            offsetTop: 0, // 容器偏移量
            start: 0, // 开始位置
        }
    },
    computed: {
        itemList() {
            return this.list.slice(this.start, this.start + this.max)
        },
    },
    methods: {
        // 滚动时，重新设置容器节点的偏移量，以及列表的开始位置
        scrollEvent(e) {
            if (e.target && e.target.scrollTop) {
                let scrollTop = e.target.scrollTop
                this.offsetTop = scrollTop
                this.start = Math.floor(scrollTop / this.size)
            }
        },
    },
}
</script>

<style scoped>
.kl-virtual-list {
    overflow-y: auto;
    position: relative;
    width: 200px;
}
.kl-virtual-list-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
</style>
