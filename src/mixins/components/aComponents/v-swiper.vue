<template>
    <van-swipe
        ref="swipe"
        class="my-swipe"
        :autoplay="autoplay"
        :duration="duration"
        :initial-swipe="initialSwipe"
        :show-indicators="showIndicators"
        :lazy-render="lazyRender"
        :loop="loop"
        @change="onChange"
    >
        <slot></slot>
    </van-swipe>
</template>

<script>
export default {
    props: {
        autoplay: {
            type: Number,
            default: 0,
        },
        duration: { // 动画时长，单位为 ms
            type: Number,
            default: 300,
        },
        'initial-swipe': { // 初始显示的索引
            type: Number,
            default: 0,
        },
        'show-indicators': { // 是否显示指示器
            type: Boolean,
            default: false,
        },
        'lazy-render': { // 是否开启懒渲染
            type: Boolean,
            default: true,
        },
        loop: { // 是否开启循环播放
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {}
    },
    methods: {
        swipeTo(val){
            this.$refs.swipe.swipeTo(val)
        },
        onChange(val) {
            this.$emit('change', val)
        },
    },
}
</script>

<style>
.van-swipe-item {
    height: 300px;
}
</style>
