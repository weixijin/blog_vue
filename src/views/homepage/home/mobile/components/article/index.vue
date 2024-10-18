<template>
    <div class="article-list">
       
        <articleItem
            @page="goPage"
            v-for="(item, index) in list"
            :key="index"
            :articleInfo="item"
        />
    
    </div>
</template>

<script>
import articleItem from '@/views/homepage/home/mobile/components/article/article-item.vue'
export default {
    components: {
        articleItem,
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {}
    },
    methods: {
        goPage(id) {
            this.$emit('page', id)
        },
    },
}
</script>

<style lang="scss" scoped>
.article-list{
    background-color: #f1f1f1;
    max-width: 100vw;
    overflow-y: hidden;
}

</style>
