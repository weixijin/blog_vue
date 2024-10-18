<template>
    <!-- 使用西瓜视频改造 -->
    <div :id="videoClass" class="kl-video"></div>
</template>

<script>
export default {
    components: {},
    props: {
        video_url: {
            type: String,
            default: 'https://image.zlketang.com/public/news/others/video/2023_1_30.mp4',
        },
        poster: {
            type: String,
            default:
                '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
        },
        width: {
            type: Number,
            default: 800,
        },
        height: {
            type: Number,
            default: 500,
        },
    },
    data() {
        return {
            videoClass: '',
        }
    },
    created() {
        this.videoClass = this.createId()
    },
    mounted() {
        const plugins = [
            {
                js: '//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js',
            },
        ]
        this.getIndexDBJS(plugins).finally((res) => {
            this.init()
        })
    },
    methods: {
        createId() {
            return 'zl' + Math.random().toString(36).substr(2)
        },
        init() {
            let { videoClass, video_url, poster, width, height } = this
            if (!video_url) return

            // 配置
            const config = {
                id: videoClass,
                autoplay: false,
                volume: 0.3,
                url: video_url,
                poster,
                playsinline: true,
                thumbnail: {
                    // 缩略图配置
                    pic_num: 44,
                    width: 160,
                    height: 90,
                    col: 10,
                    row: 10,
                    urls: ['https://image.zlketang.com/public/news/others/video/2023_1_30.mp4'],
                },
                danmu: {
                    comments: [], // 初始弹幕列表
                    area: {
                        start: 0,
                        end: 1,
                    },
                },
                height: window.innerHeight,
                width: window.innerWidth,
                whitelist: [''],
            }

            if (!width || !height) {
                let el = document.getElementById(videoClass)
                if (!el) return
                config.height = el.offsetHeight
                config.width = el.offsetWidth
            }

            // 创建播放器
            let player = new Player(config)

            // 播放器事件
            player.emit('resourceReady', [
                {
                    name: '超清',
                    url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
                },
                {
                    name: '高清',
                    url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-480p.mp4',
                },
                {
                    name: '标清',
                    url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                },
            ])

            player.on('loadedmetadata', () => {
                console.log('loadedmetadata')
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-video {
    width: 800px;
    height: 500px;
}
</style>
