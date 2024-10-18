<template>
    <div class="demo">
        <pc v-if="isPC" />
        <mobile v-if="!isPC" />
    </div>
</template>

<script>
export default {
    components: {
        pc:() => import('@/views/homepage/home/pc/index.vue'),
        mobile:() => import('@/views/homepage/home/mobile/index.vue'),
    },
    data() {
        return {
            isPC: false
        }
    },
    created() {
        this.isPC = this.isPc()
        // 开启屏幕可视区监听
        window.onresize = () => {
        this.isPC = this.isPc() 
        }
    },
    methods: {},
}
</script>

<style lang="scss" scoped></style>
