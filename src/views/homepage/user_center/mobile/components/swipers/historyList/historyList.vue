<template>
    <kl-scroll
        :list="historyList"
        :scrollHeight="scrollHeight"
        @bottom="bottomEvent"
        class="p-l-10 p-r-10"
    >
        history
    </kl-scroll>
</template>

<script>
export default {
    props: {
        scrollHeight: {
            type: Number,
            default: 500,
        },
    },
    data() {
        return {
            historyList: [],
        }
    },
    methods: {
        init() {
            
        },
        bottomEvent() {},
    },
}
</script>

<style lang="scss" scoped></style>
