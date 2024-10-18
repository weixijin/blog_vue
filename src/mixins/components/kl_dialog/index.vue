<template>
    <!-- 添加弹窗的动画 -->
    <!-- <transition name="kl-dialog"> -->
        <div class="kl-dialog" v-if="dialogVisible">
            <!-- 遮罩 -->
            <div class="kl-mask" :id="klMaskId" v-if="modal" @click.stop="close"></div>
            <!-- 弹窗 -->
            <!-- 这儿需要mousedown来控制顺序 -->
            <div
                :id="klDialogId"
                :class="[
                    'kl-dialog-container',
                    'resize-container',
                    nobg ? 'kl-dialog-container-bg-no' : '',
                ]"
                v-dragDialog="{ top: top, center: center }"
                :style="{ width: width, top: top }"
                @mousedown.stop="setZIndex"
            >
                <!-- 弹窗头部 -->
                <slot name="header">
                    <!-- 必须要有这个kl-dailog-header类才能拖拽 -->
                    <div class="kl-dailog-header cc" v-if="header">
                        <div class="kl-dailog-header-title">
                            {{ title }}
                        </div>
                        <div class="kl-dailog-header-close" @click.stop="close">
                            <i class="el-icon-close kl-dailog-header-close-icon"></i>
                        </div>
                    </div>
                </slot>

                <!-- 弹窗中间内容 -->
                <slot> default </slot>

                <!-- 弹窗底部 -->
                <slot name="footer">
                    <div class="kl-dailog-footer" v-if="footer">
                        <el-button @click="close">取消</el-button>
                        <el-button type="primary" @click="determine">确定</el-button>
                    </div>
                </slot>
            </div>
        </div>
    <!-- </transition> -->
</template>

<script>
export default {
    name: 'klDialog',
    props: {
        // 去除主题背景色
        nobg: {
            type: Boolean,
            default: false,
        },
        // 控制显示隐藏
        dialogVisible: {
            type: Boolean,
            default: false,
        },
        // 是否显示遮罩
        modal: {
            type: Boolean,
            default: true,
        },
        // 头部标题
        title: {
            type: String,
            default: '',
        },
        // 弹窗宽
        width: {
            type: String,
            default: '30%',
        },
        // 距离顶部的距离
        top: {
            type: String,
            default: '20%',
        },
        center: {
            type: Boolean,
            default: false,
        },
        footer:{
            type: Boolean,
            default: true,
        },
        header:{
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            klMaskId: '',
            klDialogId: '',
        }
    },
    created() {
        this.init()
    },
    beforeDestroy() {
        // console.log('beforeDestroy');
    },

    watch: {
        dialogVisible(val) {
            if (val) {
                this.setZIndex()
            }
        },
    },

    methods: {
        // 确定
        determine() {
            this.$emit('determine')
        },
        // 关闭弹窗
        close() {
            this.$emit('close')
        },

        // 给每个弹窗添加一个id
        initId() {
            this.klMaskId = this.createId()
            this.klDialogId = this.createId()
        },

        // 将当前弹窗的z-index设置为最高
        async setZIndex() {
            let { klDialogId } = this
            await this.$nextTick()
            let els = document.querySelectorAll('.kl-dialog-container')

            let maxZIndex = 100
            els.forEach((item) => {
                let zIndex = item.style.zIndex
                zIndex = zIndex ? zIndex - 0 : 100
                if (zIndex > maxZIndex) {
                    maxZIndex = zIndex
                }
            })

            let el = document.querySelector('#' + klDialogId)
            if (el) {
                el.style.zIndex = maxZIndex + 1
            }
        },

        // 初始化
        init() {
            this.initId()
            // 设置当前的弹窗层级最高
            this.setZIndex()
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}
.kl-dialog-container {
    position: fixed;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    box-sizing: border-box;
    background-color: #fff;
    z-index: 100;
}
.kl-dialog-container-bg-no {
    box-shadow: none;
    background: none;
}
.kl-dialog-container-center {
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
}

.kl-dailog-header {
    padding: 0 20px;
    height: 54px;
    line-height: 54px;
    position: relative;
    font-size: 18px;
    font-weight: 500;
    user-select: none;
}
.kl-dailog-header-close {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
}
.kl-dailog-header-close-icon {
    color: #aaa;
}
.kl-dailog-footer {
    padding: 0 20px;
    height: 70px;
    line-height: 70px;
    text-align: right;
}

.cc {
    cursor: move;
}

// 弹窗动画
.kl-dialog-enter-active,
.kl-dialog-leave-active {
    transition: all 0.3s;
}

.kl-dialog-enter,
.kl-dialog-leave-to {
    opacity: 0;
    transform: translate(300px,300px);
}
</style>
