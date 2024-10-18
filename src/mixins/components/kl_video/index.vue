<template>
    <div class="kl-video">
        <div
            class="video-container"
            id="video-container"
            @touchstart="handlerTouchstart"
            @touchmove="handlerTouchmove"
            @touchend="handlerTouchend"
        >
            <!-- 控件相关 -->
            <div v-show="isControlsShow">
                <!-- 头部控件 -->
                <div class="controls-header-pos">
                    <div class="controls-header-left">课程下载</div>
                    <div class="controls-header-right">
                        <img
                            src="https://image.zlketang.com/public/news/others/imgs/icon／24／画中画@2x.png"
                            alt=""
                        />
                        <img
                            src="https://image.zlketang.com/public/news/others/imgs/icon／24／音频@2x.png"
                        />
                        <img
                            src="https://image.zlketang.com/public/news/others/imgs/icon／24／投屏@2x.png"
                            alt=""
                        />
                        <div class="menu-fun" v-show="isLargeScreen">
                            <div class="dors">
                                <i class="dor" v-for="item in 3" :key="item"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 底部控件 -->
                <div class="controls-footer-pos">
                    <!-- 左侧开始和暂停 -->
                    <div class="left-play">
                        <img
                            v-show="!isPlay"
                            @click="switchPlay"
                            src="https://image.zlketang.com/public/news/others/imgs/icon／24／播放@2x.png"
                            alt=""
                        />
                        <img
                            v-show="isPlay"
                            @click="switchPlay"
                            src="https://image.zlketang.com/public/news/others/imgs/icon／24／暂停@2x.png"
                        />
                    </div>

                    <!-- 中间进度条及时间 -->
                    <div class="center-progress">
                        <span class="current-time">{{ currentTime | filterTime }}</span>
                        <div class="progress-bar" ref="progressRef" @click="clickProgress">
                            <!-- 可以拉动的光点 -->
                            <div class="touch-cover">
                                <div class="touch-progress-1">
                                    <div class="touch-progress-2"></div>
                                </div>
                            </div>

                            <!-- 进度 -->
                            <div class="progress-bar-inner">
                                <div class="progress-bar-inner-inner"></div>
                            </div>
                        </div>
                        <span class="duration-time">{{ duration | filterTime }}</span>
                    </div>

                    <!-- 右侧功能区 倍速与放大 -->
                    <div class="right-function">
                        <div class="double-speed-container">
                            <span v-show="isLargeScreen"> 字幕 </span>

                            <span @click.stop="switchSpeed"> 倍速 </span>
                            <ul :class="['double-speed-pos']">
                                <li v-for="item in rateArr" :key="item" @click="setRate(item)">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                        <img
                            class="enlarge-icon"
                            @click="switchScreeen"
                            src="https://image.zlketang.com/public/news/others/imgs/icon／24／全屏@2x.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <!-- 视频加载中 -->
            <div class="video-loading" v-if="isLoading">全力加载中...</div>

            <!-- 播放器 -->
            <video
                controls
                controlsList="nofullscreen nodownload noremote footbar"
                @click="switchPlay"
                ref="videoRef"
                id="kl-video"
                src="//image.zlketang.com/public/news/others/imgs/shicao/1.mp4"
            ></video>
        </div>
    </div>
</template>

<script>
function addZero(num) {
    return num < 10 ? '0' + num : num
}
export default {
    name: 'klVideo',
    components: {},
    data() {
        return {
            isLargeScreen: false,
            isLoading: true,
            scalRate: 1,
            rateArr: [0.8, 1, 1.25, 1.5, 2],
            rate: 1,
            videoRef: null,
            isSpeedOpen: false,
            currentTime: 0,
            duration: 0,
            isControlsShow: true,
            isPlay: false,
            timer: null,
        }
    },
    mounted() {
        this.init()
    },
    filters: {
        filterTime(time) {
            let h = Math.floor(time / 3600)
            let min = Math.floor(time / 60)
            let sec = Math.floor(time % 60)
            return `${addZero(h)}:${addZero(min)}:${addZero(sec)}`
        },
    },
    methods: {
        switchScreeen() {
            if (this.isLargeScreen) {
                this.exitFullscreen()
                return
            }
            this.FullScreen()
        },
        // 点击进度条
        clickProgress(e) {
            // 点击距离左侧的距离
            let left = e.offsetX
            // 进度条的宽度
            let style = window.getComputedStyle(this.$refs.progressRef)
            let width = style.width ? style.width.replace('px', '') - 0 : 0

            let { duration } = this
            let currentTime = Math.floor(duration * (left / width))
            this.videoRef.currentTime = currentTime
            this.currentTime = currentTime

            // 开启播放
            this.videoPlay()
        },

        // 开始播放
        videoPlay(time = 500) {
            setTimeout(() => {
                this.videoRef.play()
                this.isPlay = true
            }, time)
        },
        // 选择倍速播放
        setRate(rate) {
            this.rate = rate
            this.videoRef.playbackRate = this.rate
            this.isSpeedOpen = false

            this.setSpeedHieght()

            // 修改倍速后开始播放视频
            if (!this.isPlay) {
                this.videoPlay(0)
                this.isPlay = true
            }
        },

        // 切换倍速
        switchSpeed() {
            this.isSpeedOpen = !this.isSpeedOpen
            this.setSpeedHieght()
        },

        //  设置倍速的高度
        setSpeedHieght() {
            let el = document.querySelector('.double-speed-pos')
            let { rateArr, isSpeedOpen } = this

            if (isSpeedOpen) {
                el.style.height = 26 * rateArr.length + 'px'
            } else {
                el.style.height = '0px'
            }
        },
        // 切换播放与暂停
        switchPlay() {
            this.isPlay = !this.isPlay
            if (this.isPlay) {
                this.$refs.videoRef.play()
            } else {
                this.$refs.videoRef.pause()
            }
        },

        handlerTouchstart() {
            this.clearTimer()
            // console.log('handlerTouchstart');
            this.isControlsShow = true
        },
        handlerTouchmove() {
            // console.log('handlerTouchmove');
        },

        handlerTouchend() {
            // console.log('handlerTouchend');
            this.clearTimer()
            this.timer = setTimeout(() => {
                this.isControlsShow = false
            }, 5000)
        },
        clearTimer() {
            clearTimeout(this.timer)
            this.timer = null
        },

        // 设置进度条进度
        setProgressFun() {
            let { currentTime, duration } = this
            let el_progress_cover = document.querySelector('.progress-bar-inner')
            let el_progress = document.querySelector('.progress-bar-inner-inner')
            let width_all = el_progress_cover?.offsetWidth
            let width = Math.floor(width_all * (currentTime / duration))
            if (el_progress) {
                el_progress.style.width = width + 'px'
            }
        },

        // 设位置拖动块的进度
        setTouchProgress() {
            let { currentTime, duration, scalRate } = this
            let el_touch = document.querySelector('.touch-cover')
            let el_progress_cover = document.querySelector('.progress-bar-inner')
            if(!el_progress_cover) return
            let width_all = el_progress_cover.offsetWidth

            // 距离左侧的距离
            let initLeft = -10
            let left = Math.floor(width_all * (currentTime / duration)) + initLeft * scalRate
            el_touch.style.left = left + 'px'
        },

        //进入全屏
        FullScreen() {
            let full = document.querySelector('#video-container')
            if (full.RequestFullScreen) {
                full.RequestFullScreen()
                //兼容Firefox
            } else if (full.mozRequestFullScreen) {
                full.mozRequestFullScreen()
                //兼容Chrome, Safari and Opera等
            } else if (full.webkitRequestFullScreen) {
                full.webkitRequestFullScreen()
                //兼容IE/Edge
            } else if (full.msRequestFullscreen) {
                full.msRequestFullscreen()
            }

            this.isLargeScreen = true
        },
        //退出全屏
        exitFullscreen() {
            var de = document
            if (de.exitFullscreen) {
                de.exitFullscreen()
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen()
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen()
            }

            this.isLargeScreen = false
        },

        async init() {
            let that = this
            await this.$nextTick()
            this.scalRate = document.documentElement.clientWidth / 375
            let videoRef = this.$refs.videoRef
            this.handlerTouchend()
            // 视频加载完毕
            videoRef.addEventListener('canplay', function () {
                that.videoRef = this

                that.duration = Math.ceil(this.duration)
                setTimeout(() => {
                    that.isControlsShow = true
                    that.isLoading = false
                    that.videoPlay()
                }, 500)
            })

            // 进度变化时实时监控时长与进度
            videoRef.addEventListener('timeupdate', function () {
                that.currentTime = Math.ceil(this.currentTime)
                that.setProgressFun()
                that.setTouchProgress()
            })

            // 双击退出全屏
            $('body').on('doubleTap', function () {
                that.exitFullscreen()
            })

            // 监听屏幕旋转
            window.addEventListener('resize', function () {
                // 获取屏幕宽度高度
                let width = document.documentElement.clientWidth
                let height = document.documentElement.clientHeight
                if (width > height) {
                    // 全屏
                    that.$refs.videoRef.height = height
                } else {
                    // 小屏播放
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 414px) {
    html {
        font-size: 13.3333vw !important;
        color: #666;
    }

    body {
        font-size: 16px;
    }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.video-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.video-loading {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    z-index: 11;
}

#kl-video {
    width: 100%;
    height: 100%;
}

.controls-footer-pos {
    width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    height: 0.88rem;
    z-index: 10;
    background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.5));
    box-shadow: 0 -0.4rem 0.1rem rgba(0, 0, 0, 0.05);
}

.left-play {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0.32rem;
}

.left-play img {
    width: 0.48rem;
    height: 0.48rem;
}

.right-function {
    padding-right: 0.32rem;
    display: flex;
    align-items: center;
}

.enlarge-icon {
    width: 0.48rem;
    height: 0.48rem;
    margin-left: 0.24rem;
}

.double-speed-container {
    position: relative;
    min-width: 24px;
    font-size: 0.24rem;
    font-weight: 400;
    color: #ffffff;
}

.double-speed-pos {
    transition: all 0.5s;
    position: absolute;
    top: 0.68rem;
    right: -0.8rem;
    color: #555;
    height: 0;
    width: 2rem;
    overflow: hidden;
    background-color: #f1f1f1;
}

.h-120 {
    height: 2.4rem;
}

.double-speed-pos li {
    height: 0.52rem;
    line-height: 0.52rem;
    padding: 0 0.4rem;
    color: #333;
}

.center-progress {
    margin-right: 0.24rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.current-time,
.duration-time {
    font-size: 0.2rem;
    font-weight: 400;
    color: #ffffff;
}

.progress-bar {
    position: relative;
    flex: 1;
    height: 0.32rem;
    /* background: rgba(255, 255, 255, 0.3000); */
    margin: 0 0.16rem;
    display: flex;
    align-items: center;
}

.touch-cover {
    position: absolute;
    top: 50%;
    left: -0.2rem;
    transform: translateY(-50%);
    width: 0.4rem;
    height: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: left 0.5s;
}

.touch-progress-1 {
    width: 0.24rem;
    height: 0.24rem;
    background: rgba(250, 75, 62, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: relative;
}

.touch-progress-2 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0.16rem;
    height: 0.16rem;
    background: rgba(250, 75, 62);
    border-radius: 50%;
}

.progress-bar-inner {
    height: 0.04rem;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0.02rem;
    width: 100%;
}

.progress-bar-inner-inner {
    transition: all 0.5s;
    height: 0.04rem;
    background: #fa4b3e;
    border-radius: 0.02rem;
    width: 0;
}

.controls-header-pos {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 0.88rem;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05));
    box-shadow: 0 0.4rem 0.1rem rgba(0, 0, 0, 0.05);
}

.controls-header-left {
    padding-left: 0.32rem;
    font-size: 0.3rem;
    font-weight: 500;
    color: #ffffff;
}

.controls-header-right {
    display: flex;
    align-items: center;
}

.controls-header-right img {
    width: 0.48rem;
    height: 0.48rem;
    margin-right: 0.32rem;
}

/*video默认全屏按钮*/
video::-webkit-media-controls-fullscreen-button {
    display: none !important;
}

/*video默认aduio音量按钮*/
video::-webkit-media-controls-mute-button {
    display: none !important;
}

/*video默认setting按钮*/
video::-internal-media-controls-overflow-button {
    display: none !important;
}

/*腾讯云点播禁用firefox全屏、设置按钮*/
.trump-button[sub-component='fullscreen_btn'],
.trump-button[now='fullscreen'] {
    display: none !important;
}

.trump-button[sub-component='setting'] {
    display: none !important;
}

/*禁用video的controls（要慎重！不要轻易隐藏掉，会导致点击视频不能播放）*/
video::-webkit-media-controls {
    display: none !important;
}
.menu-fun {
    margin-right: 24px;
}

.dors {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
}
.dor {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 50%;
    margin-right: 3px;
}
.dor:nth-last-of-type(1) {
    margin-right: 0;
}
</style>
