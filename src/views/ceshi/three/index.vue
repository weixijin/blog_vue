<template>
    <div class="demo" :id="pageId">
        <h1>bus传值</h1>
        <el-button @click="fun1">bus传值</el-button>

        <h1>默认插槽传值</h1>
        <comBox v-slot="{ item }">
            <div>{{ item }}--1111</div>
        </comBox>
        <h1>命名插槽传值</h1>
        <comBox>
            <template v-slot:a="{ item }">
                <div>{{ item }}---222</div></template
            >
        </comBox>

        <h1>虚拟列表</h1>
        <!-- <kl-virtual-list :list="list"> </kl-virtual-list> -->
        <RecycleScroller
            class="scroller"
            :items="list"
            :item-size="32"
            key-field="id"
            v-slot="{ item }"
            style="height: 400px"
        >
            <div class="user">
                {{ `当前数据id${item.id}` }}
            </div>
        </RecycleScroller>

        <h1>腾讯播放器</h1>
        <tx-video></tx-video>
    </div>
</template>

<script>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { RecycleScroller } from 'vue-virtual-scroller'
export default {
    components: {
        txVideo: () => import('@/mixins/components/tx-video/index.vue'),
        RecycleScroller,
        comBox: () => import('@/views/ceshi/three/comBox.vue'),
    },
    data() {
        return {
            pageId: '',
            list: [],
        }
    },
    mounted() {
        for (let i = 1; i < 10000; i++) {
            this.list.push({
                id: i,
            })
        }
    },
    methods: {
        fun1() {
            this.$bus.$emit('test-click', '我是bus传值')
        },
    },
}
</script>

<style lang="scss" scoped>
.user {
    height: 40px;
    padding: 0 12px;
    display: flex;
    align-items: center;
}
</style>
