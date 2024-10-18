<template>
    <div class="demo">
        <keep-alive>
            <component
                ref="comRef"
                :is="page"
                @change="changePage"
                @reloadArticle="reloadArticle"
                @back="back"
            ></component>
        </keep-alive>
    </div>
</template>

<script>
export default {
    components: {
        page: () => import('@/views/blog/home/page/mobile/page.vue'),
        mobileSearchPage: () => import('@/components/mobileSearchPage/index.vue'),
    },
    data() {
        return {
            page: 'page',
        }
    },
    methods: {
        back(){
            this.page = 'page'
        },
        async reloadArticle({ name, _id }) {
            switch (name) {
                case 'page':
                    this.page = name
                    await this.$nextTick()
                    let comRef = this.$refs.comRef
                    if (!comRef) return
                    comRef.init(_id)
                    break
            }
        },
        // 切换组件
        changePage({ name, row }) {
            this.page = name
        },
    },
}
</script>

<style lang="scss" scoped></style>
