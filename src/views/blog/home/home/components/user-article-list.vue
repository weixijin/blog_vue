<template>
    <klScroll
        :list="list"
        :scrollHeight="scrollHeight"
        :pageOption="pageOption"
        @bottom="bottom"
        @scroll="scroll"
    >
        <div class="flex-wrap flex-justify-between flex-item-wrap p-l-10 p-r-10">
            <userArticle
                v-for="(item, index) in list"
                :key="index"
                :type="type"
                :articleInfo="item"
                :isHandle="isHandle"
                @goPage="goPage"
                @delete="deleteFun"
                @openPrevew="openPrevew"
            ></userArticle>

            <div class="w-200" v-for="item in 10" :key="item"></div>
        </div>
    </klScroll>
</template>

<script>
import userArticle from '@/views/blog/home/home/components/user-article.vue'
export default {
    components: {
        userArticle,
    },
    props: {
        type:{
            type:String,
            default:'common'
        },
        list: {
            type: Array,
            default: () => [],
        },
        pageOption: {
            type: Object,
            default: () => {},
        },
        scrollHeight: {
            type: Number,
            default: 0,
        },
        isHandle: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {}
    },
    watch:{
        list:{
            handler(val){
                
            },
            deep:true,
            immediate:true
        }
    },
    methods: {
        openPrevew(row) {
            this.$emit('openPrevew', row)
        },
        deleteFun(row) {
            this.$emit('delete', row)
        },
        bottom() {
            this.$emit('bottom')
        },
        goPage(row) {
            this.$emit('goPage', row)
        },
        scroll(scrollTop) {
            this.$emit('scroll', scrollTop)
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
