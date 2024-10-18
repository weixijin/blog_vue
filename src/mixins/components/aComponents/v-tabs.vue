<template>
    <van-tabs
        v-model="value"
        sticky
        :offset-top="offsetTop"
        :scrollspy="scrollspy"
        :ellipsis="ellipsis"
        @change="change"
    >
        <slot></slot>
    </van-tabs>
</template>

<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default: 0,
        },
        sticky: {
            type: Boolean,
            default: false,
        },
        'offset-top': {
            
            type: [String, Number],
            default: 0,
        },
        scrollspy: {
            // 滚动spy定位
            type: Boolean,
            default: false,
        },
        ellipsis: {
            // 内容全部显示
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {}
    },
    methods: {
        change(e) {
            this.$emit('change', e)
        },
    },
}
</script>

<style lang="css">
.van-tabs__line {
    background-color: #3399ff;
    width: 20px;
}
.van-tab--active {
    color: #3399ff;
}
.van-tabs__nav--complete {
    padding-left: 0;
    padding-right: 0;
}
.van-tabs__wrap--scrollable .van-tab {
    padding: 0;
}
.van-tabs__wrap--scrollable .van-tab:nth-of-type(n + 2) {
    margin-left: 20px;
}
</style>
