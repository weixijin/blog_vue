<template>
    <van-dialog
        v-model="value"
        :transition="transition"
        :width="width"
        :overlay="overlay"
        :getContainer="getContainer"
        :showCancelButton="showCancelButton"
        :showConfirmButton="showConfirmButton"
        :lockScroll="lockScroll"
        :closeOnClickOverlay="closeOnClickOverlayInit"
        :class="['p-r',circle?'v-kl-dialog-circle':'']"
    >
        <div v-if="closeIcon && value" class="p-a v-dialog-close-cover" @click="close">
            <van-circle
                class="p-a-c"
                size="35px"
                :stroke-width="70"
                v-model="currentRate"
                :rate="100"
                :speed="speed"
                color="#ffffff"
                :layer-color="getLayerStyle()"
            />
            <van-icon class="p-a-c f-600" name="cross" size="20" color="#fff" />
        </div>

        <slot></slot>
    </van-dialog>
</template>

<script>
export default {
    props: {
        transition:{
            // 过渡动画
            type: String,
            default: 'v-dialog-fade',
        },
        circle:{
            // 五遮罩模式下的特殊圆形进度条
            type: Boolean,
            default: false,
        },
        'close-time': {
            // 关闭时间
            type: Number,
            default: 5,
        },
        closeIcon: {
            // 是否显示关闭按钮
            type: Boolean,
            default: true,
        },
        value: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: '320px',
        },
        overlay: {
            // 是否显示遮罩层
            type: Boolean,
            default: true,
        },
        getContainer: {
            // 指定挂载的节点，可以传递一个返回 HTMLElement 的函数，或传递一个 CSS 选择器字符串
            type: String,
            default: 'body',
        },
        lockScroll: {
            // 锁定滚动
            type: Boolean,
            default: true,
        },
        showConfirmButton: {
            // 显示确认按钮
            type: Boolean,
            default: false,
        },
        showCancelButton: {
            // 显示取消按钮
            type: Boolean,
            default: false,
        },
        closeOnClickOverlay: {
            // 点击遮罩层关闭
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            closeOnClickOverlayInit: this.closeOnClickOverlay,
            currentRate: 0,
            timer: null,
            speed: 20,
        }
    },
    created() {
        this.init()
    },
    watch: {
        closeTime(val) {
            this.speed = Math.floor(100 / val)
        },
        value(val) {
            if (val) {
                if (this.closeIcon) {
                    this.currentRate = 0
                    this.timer = setInterval(() => {
                        this.currentRate += 100 / this.closeTime
                        if (this.currentRate >= 100) {
                            this.currentRate = 100
                            clearInterval(this.timer)
                        }
                    }, 500)
                }
            } else {
                this.currentRate = 0
            }
            this.$emit('input', val)
        },
    },
    methods: {
        getLayerStyle() {
            if(this.circle){
                return 'rgba(0, 0, 0, 0)'
            }
            return 'rgba(0, 0, 0, 0.2)'
        },
        init() {
            let {closeTime,closeIcon,closeOnClickOverlay} = this
            this.speed = Math.floor(100 /closeTime)
            if (closeIcon && !closeOnClickOverlay) {
                this.closeOnClickOverlayInit = false
            } else {
                this.closeOnClickOverlayInit = closeOnClickOverlay
            }
        },
        close() {
            if (this.currentRate != 100) return
            this.$emit('input', false)
        },
    },
}
</script>

<style>
.van-overlay {
    background-color: rgba(0, 0, 0, 0.3);
}
.van-dialog {
    overflow: visible;
    border-radius: 8px;
    top: 50%;
    transform: translate3d(-50%, calc(-50% - 25px), 0);
}

.v-dialog-close-cover {
    width: 20px;
    height: 20px;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
}
.v-kl-dialog-circle{
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}
.v-kl-dialog-circle .v-dialog-close-cover {
    width: 39px;
    height: 39px;
    bottom: -54px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
}
</style>
