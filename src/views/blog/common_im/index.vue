<template>
    <div class="demo">
        <Im imOutPath="/"></Im>
    </div>
</template>

<script>
import Im from '@/views/blog/im/index.vue'
export default {
    components: {
        Im,
    },
}
</script>

<style lang="scss" scoped>
.demo {
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
}
</style>
