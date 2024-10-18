<template>
    <div class="demo">
        <video
            id="player-container-id"
            preload="auto"
            playsinline
            webkit-playsinline
            class="tx-video"
            :style="getStyle"
        ></video>
    </div>
</template>

<script>
import { createControl } from './index.js'
const plugins = [
    {
        isAppendHead: true,
        css: 'https://web.sdk.qcloud.com/player/tcplayer/release/v5.0.1/tcplayer.min.css',
    },
    {
        js: 'https://web.sdk.qcloud.com/player/tcplayer/release/v5.0.1/tcplayer.v5.0.1.min.js',
    },
]
export default {
    props: {
        videoUrl: {
            type: String,
            default: '',
        },
        width:{
            type: String,
            default: '600px',
        },
        height:{
            type: String,
            default:'400px',
        }
    },
    data() {
        return {
            list: [1111],
        }
    },
    computed: {
        player() {
            let { videoStore } = this.$store.state
            return videoStore.player || {}
        },
        getStyle(){
            return {
                width:this.width,
                height:this.height,
            }
        }
    },
    mounted() {
        this.getIndexDBJS(plugins).finally(() => {
            this.init()
        })
    },
    beforeDestroy() {
        this.player.dispose()
    },
    methods: {
        async init() {
            this.$store.commit('videoStore/SET_PLAYER', null)
            let { player } = this
            if (player && this.getType(player.dispose) === 'function') {
                // 先销毁
                this.player.dispose()
                await this.$nextTick()
            }
            player = TCPlayer('player-container-id', {
                sources: [
                    {
                        src: this.videoUrl,
                    },
                ],
                licenseUrl: this.videoUrl,
            })
            player.src(this.videoUrl)
            player.on('loadedmetadata', () => {
                // 视频加载完成-设置控件
                createControl(this)
            })

            this.$store.commit('videoStore/SET_PLAYER', player)
        },
    },
}
</script>

<style scoped>
/deep/ .tcp-skin .vjs-custom-control-spacer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
