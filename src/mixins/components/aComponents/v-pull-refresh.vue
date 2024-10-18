<template>
    <van-pull-refresh v-model="value" success-text="刷新成功" @refresh="onRefresh">
        <slot></slot>
    </van-pull-refresh>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        }
    },
    watch: {
        value(val) {
            this.$emit('input', val)
        },
    },
    methods: {
        onRefresh() {
            this.$emit('refresh')
        },
    },
}
</script>

<style lang="scss" scoped></style>
