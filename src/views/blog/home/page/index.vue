<template>
    <div class="demo">
        <pc v-if="isPc()" />
        <mobile v-if="!isPc()" />
    </div>
</template>

<script>
// import pc from '@/views/blog/home/page/pc/index.vue'
// import mobile from '@/views/blog/home/page/mobile/index.vue'
export default {
    components: {
        pc:()=>import('@/views/blog/home/page/pc/index.vue'),
        mobile:()=>import('@/views/blog/home/page/mobile/index.vue'),
    },
    data() {
        return {
            isPC: false
        }
    }
}
</script>

<style lang="scss" scoped></style>
