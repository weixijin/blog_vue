<template>
    <div class="demo">
        <pc v-if="isPc()" />
        <mobile v-if="!isPc()" />
    </div>
</template>

<script>
import pc from '@/views/user/login/pc/index.vue'
import mobile from '@/views/user/login/mobile/index.vue'
export default {
    components: {
        pc,
        mobile,
    },
    data() {
        return {}
    },
    methods: {},
}
</script>

<style lang="scss" scoped></style>
