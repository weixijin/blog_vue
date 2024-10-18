<template>
    <div :class="['zl-popup', filter ? 'zl-popup-bg' : '']" :id="zlPopup">
        <div
            :class="[
                'zl-popup-container',
                bottom ? '' : 'zl-dialog-container-center',
                filter ? 'zl-popup-container-filter' : '',
            ]"
            :id="zlPopupContainer"
            @click="zlPopupStop($event)"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        filter: {
            // 是否开启背景滤镜
            type: Boolean,
            default: false,
        },
        visible: {
            type: Boolean,
            default: false,
        },
        height: {
            type: String,
            default: '50%',
        },
        bottom: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            zlPopup: '',
            zlPopupContainer: '',
            transitionTime: 300,
        }
    },
    watch: {
        height(val) {
            $(`#${this.zlPopupContainer}`).css({
                height: val,
            })
        },
        visible() {
            this.init()
        },
    },
    mounted() {
        this.zlPopup = this.createId()
        this.zlPopupContainer = this.createId()
        this.init()
    },

    methods: {
        async init() {
            await this.$nextTick()
            if (this.visible) {
                this.openDialog()
                return
            }
            this.closeDialog()
        },
        // 关闭
        close() {
            this.$emit('close')
        },
        // 阻止冒泡
        zlPopupStop(e) {
            e.stopPropagation()
        },
        // 打开弹窗
        openDialog() {
            let { height, zlPopup, zlPopupContainer, bottom } = this
            $(`#${zlPopup}`).show(0, function () {
                $(`#${zlPopup}`).css({
                    opacity: 1,
                })

                if (!bottom) {
                    $(`#${zlPopupContainer}`).show()
                    return
                }

                $(`#${zlPopupContainer}`).show(0, function () {
                    $(`#${zlPopupContainer}`).css({
                        height,
                    })
                })
            })
        },
        // 关闭弹窗
        async closeDialog() {
            let { zlPopup, zlPopupContainer, bottom } = this
            $(`#${zlPopup}`).css({
                opacity: 0,
            })

            if (!bottom) {
                await this.sleep(this.transitionTime)
                $(`#${zlPopupContainer}`).hide()
                $(`#${zlPopup}`).hide()
                return
            }

            $(`#${zlPopupContainer}`).css({
                height: 0,
            })
            await this.sleep(this.transitionTime)

            $(`#${zlPopupContainer}`).hide(0)
            $(`#${zlPopup}`).hide(0)
        },
    },
}
</script>

<style lang="scss" scoped>
.zl-popup {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    display: none;
    z-index: 990;
    opacity: 0;
    transform: translateZ(0);
    transition: all 0.5s;
}
.zl-popup-bg {
    background-color: transparent;
}

.zl-popup-container {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 0;
    background: #f1f1f1;
    border-radius: 8px 8px 0 0;
    background-color: #fff;
    transition: all 0.5s;
}
.zl-popup-container-filter {
    border-radius: 0;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    // 背景添加滤镜
    backdrop-filter: blur(1px);
}

.zl-dialog-container-center {
    left: 50%;
    top: 50%;
    bottom: auto;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
}
</style>
