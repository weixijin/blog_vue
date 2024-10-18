<template>
    <div class="demo m-l-10 p-10-15 f-14 b-r-4 w-b-100 w-230 h-160">
        <p class="c-warning tuijian">推荐列表</p>
        <template v-if="recommendArticle.pre && recommendArticle.pre.article_name">
            <p class="text-p">上一篇：</p>
            <div
                class="pre cu ell-1 m-b-10 l-h-28 c-primary"
                @click="goNextPage(recommendArticle.pre._id)"
            >
                {{ recommendArticle.pre.article_name }}
            </div>
        </template>

        <template v-if="recommendArticle.next && recommendArticle.next.article_name">
            <p class="text-p">下一篇：</p>
            <div
                class="next cu ell-1 l-h-28 c-primary"
                @click="goNextPage(recommendArticle.next._id)"
            >
                {{ recommendArticle.next.article_name }}
            </div>
        </template>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        recommendArticle: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {}
    },
    methods: {
        goNextPage(id) {
            this.$emit('goNextPage', id)
        },
    },
}
</script>

<style lang="scss" scoped>
.demo {
    border: 1px solid #ccc;
    .tuijian {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
    }
}
.h-160{
    height: 160px;
}
</style>
