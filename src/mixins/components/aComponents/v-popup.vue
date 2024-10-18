<template>
    <van-popup
        v-model="value"
        :position="position"
        :style="{ height: `${height}`, width: `${width}` }"
        :get-container="getContainer"
        :overlay="overlay"
        :close-on-click-overlay="closeOnClickOverlay"
        :duration="duration"
    >
        <slot></slot>
    </van-popup>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        height: {
            type: String,
            default: '50%',
        },
        width: {
            type: String,
            default: '100%',
        },
        position: {
            // 弹出位置，可选值为 top bottom left right
            type: String,
            default: 'bottom',
        },
        'get-container': {
            type: String,
            default: 'body',
        },
        overlay: {
            // 是否显示遮罩层
            type: Boolean,
            default: true,
        },
        'close-on-click-overlay': {
            // 是否在点击遮罩层后关闭
            type: Boolean,
            default: true,
        },
        duration: {
            // 动画时长，单位秒
            type: Number,
            default: 0.4,
        },
    },
    data() {
        return {}
    },
    watch: {
        value(val) {
            if (!val) {
                this.$emit('close')
            }

            this.$emit('input', val)
        },
    },
    methods: {},
}
</script>

<style>
/* .van-popup {
    border-radius: 8px 8px 0 0;
    transition: transform 0.5s;
    transition: -webkit-transform 0.5s;
    -webkit-transition: transform 0.5s;
    -webkit-transition: -webkit-transform 0.5s;
} */
.van-overlay {
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
