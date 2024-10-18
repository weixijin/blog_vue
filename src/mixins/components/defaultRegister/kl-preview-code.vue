<template>
    <!-- 代码预览组件 -->
    <div :class="['kl-preview-code-mask p-f d-n', maskId]">
        <div @click="closepage" class="kl-preview-code-container bg-fff"></div>
    </div>
</template>

<script>
export default {
    name: 'klPreviewImg',
    data() {
        return {
            isOpen: false,
            url: '',
            maskId: '',
            isColumn: true,
        }
    },
    mounted() {
        this.maskId = this.createId()
    },
    methods: {
        async open(el) {
            // 拷贝一份节点
            let mask_el = $(`.${this.maskId} .kl-preview-code-container`)
            if (mask_el) {
                // 复制一份节点
                let clone = $(el).clone()

                // 先清空节点下的内容
                mask_el.empty()
                mask_el.append(clone)

                $(`.${this.maskId}`).show(500)

                // 给.pos-icon-full-screen绑定关闭
                $(`.${this.maskId} .pos-icon-full-screen`).click(() => {
                    this.close()
                })

                // mask_el绑定双击关闭
                mask_el.dblclick(() => {
                    this.close()
                })
            }
        },
        close() {
            let { maskId } = this
            $(`.${maskId}`).hide(500)
        },
        closepage(){
            this.dbClick().then(res=>{
                this.close()
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.pos-icon-full-screen {
    z-index: 2000;
}
.kl-preview-code-mask {
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
    height: 100vh;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    padding-top: 0px;
}
.kl-preview-code-container {
    transform-origin: top left;
    // 横屏，铺满整个屏幕
    transform: rotate(90deg) translateY(calc(-100% - (100vw - 100%)));
    transition: all 0.5s;
    width: 100vh;
    height: 100vw;
    overflow-y: auto;

    pre {
        width: 100vh;
        height: 100vw;
        overflow-y: auto;
    }
}

::v-deep {
    pre {
        margin: 0px !important;
        padding: 0;
        position: relative;
        padding-top: 30px;
        code {
            width: 100%;
            min-width: 100vh;
            min-height: 100vw;
            overflow-x: auto;
            display: block;
            padding: 10px 15px !important;
            border-radius: 5px;
            font-size: 15px;
            position: relative;
            .copy-button {
                position: absolute;
                left: 900px;
                top: 15px;
                padding: 3px 5px;
                background-color: #666;
                color: #fff;
                border-radius: 3px;
                cursor: pointer;
            }

            span {
                line-height: 24px;
            }
        }
    }
}
</style>
