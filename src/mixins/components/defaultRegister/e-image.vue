<template>
    <el-image
        :class="[viewer ? 'el-image-viewer' : '', ...otherClass]"
        ref="eImageRef"
        :fit="fit"
        :lazy="lazy"
        :src="src"
        :alt="alt"
        :title="title"
        :preview-src-list="previewList"
        :style="getStyle"
        @click="handleClick"
        @error="handleError($event)"
    >
    </el-image>
</template>

<script>
import { defaultSrc } from '@/plugins/config.js'
export default {
    props: {
        viewer: {
            type: Boolean,
            default: false,
        },
        alt: {
            type: String,
            default: 'blog图片',
        },
        title: {
            type: String,
            default: 'blog图片title',
        },
        fit: {
            type: String,
            default: 'cover',
        },
        src: {
            type: String,
            default: defaultSrc,
        },
        lazy: {
            type: Boolean,
            default: true,
        },
        'scroll-container': {
            type: String,
            default: '.el-dialog__body',
        },
        preview: {
            type: Boolean,
            default: false,
        },

        // 特殊预览
        previewA: {
            type: Boolean,
            default: false,
        },
        // 圆形
        radius: {
            type: Boolean,
            default: false,
        },
        zIndex: {
            type: Number,
            default: 1000,
        },
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
        style: {
            type: Object,
            default: function () {
                return {}
            },
        },
        otherClass: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            previewList: [],
        }
    },
    computed: {
        getStyle() {
            let result = {}

            if (this.width) {
                result.width = `${this.width}px`
            }
            if (this.height) {
                result.height = `${this.height}px`
            }

            return {
                ...result,
                ...this.style,
            }
        },
    },
    watch: {
        src(val) {
            if (this.preview) {
                this.previewList = [val]
            }
        },
    },
    methods: {
        async handleError(e) {
            let { width, height } = this
            if (!width || !height) {
                this.$refs.eImageRef.src = defaultSrc
                return
            }
            this.$refs.eImageRef.src = await this.createCanvasImg({
                width,
                height,
            }).catch((err) => {
                this.Toast(err)
                return defaultSrc
            })
        },
        handleClick(val) {
            if (this.previewA) {
                this.prevewImg(this.$refs.eImageRef.$el.querySelector('img'), this.zIndex)
            }
            this.$emit('click')
        },
    },
}
</script>

<style lang="scss" scoped>
.el-image-cover {
    width: 100%;
    height: 100%;
}
</style>
