<template>
    <kl-dialog center title="视频播放" @close="visableCopy=false" :footer="false" :dialogVisible="visableCopy" :width="width">
        <div class="video-cover">
            <tx-video :videoUrl="video_url" :width="width" :height="height"></tx-video>
        </div>
    </kl-dialog>
</template>

<script>
export default {
    components: {
        txVideo: () => import('@/mixins/components/tx-video/index.vue'),
    },
    props: {
        video_url: {
            type: String,
            default: '',
        },
        visable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
          defaultWidth:1000
        }
    },
    computed: {
      width(){
        return this.defaultWidth +'px'
      },
      height(){
        return this.defaultWidth/16*9 +'px'
      },
        visableCopy: {
            get() {
                return this.visable
            },
            set() {
                this.$emit('update:visable', false)
            },
        },
    },
    methods: {},
}
</script>

<style lang="scss" scoped></style>
