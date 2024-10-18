<template>
    <div class="demo">
        <keep-alive>
            <component :is="page" @change="changePage" @back="back"></component>
        </keep-alive>
    </div>
</template>

<script>

export default {
    components: {
        page:()=>import('@/views/homepage/home/mobile/page.vue'),
        mobileSearchPage:()=>import('@/components/mobileSearchPage/index.vue'),
    },
    data() {
        return {
            page: 'page',
        }
    },
    methods: {
        back() {
            this.page = 'page'
        },
        changePage({ name, row }) {
            this.page = name
        },
    },
}
</script>

<style lang="scss" scoped></style>
