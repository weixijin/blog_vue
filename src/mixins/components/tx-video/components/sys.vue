<template>
    <div class="vjs-sys">
        设置
        <div class="vjs-sys-hover-box">
            <div class="flex-center-wrap">
                <div class="vjs-sys-label">播放方式</div>
                <div class="flex-center-wrap">
                    <div class="vjs-sys-span m-r-20" id="play-stop-span">播完暂停</div>
                    <div class="vjs-sys-span" id="play-auto-span">自动连播</div>
                </div>
            </div>

            <div class="flex-center-wrap m-t-20">
                <div class="vjs-sys-label">自动播放</div>
                <div class="vjs-switch" id="switch-box">
                    <div class="vjs-switch-dor"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tx-video-control-sys',
    props:{},
    data() {
        return {}
    },
    computed() {

    },
    methods: {},
}
</script>

<style scoped>
.vjs-sys {
    height: 40px;
    line-height: 40px;
    padding-right: 20px;
    margin-left: 10px;
    position: relative;
    cursor: pointer;
}
.vjs-sys:hover .vjs-sys-hover-box {
    display: block;
}
.vjs-sys-hover-box {
    display: none;
    position: absolute;
    width: 268px;
    height: 106px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    top: -106px;
    left: -27px;
    border-radius: 16px;
    padding: 20px;
    z-index: 100;
}
.vjs-sys-hover-box::after {
    position: absolute;
    bottom: -5px;
    left: 34px;
    transform: rotate(45deg);
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
    /* 直角三角形 */
    border-width: 0px 0px 10px 10px;
    border-bottom-color: rgba(0, 0, 0, 0.5);
}
.vjs-sys-label {
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #e6e6e6;
    line-height: 20px;
    margin-right: 20px;
}
.vjs-sys-span {
    cursor: pointer;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #e6e6e6;
    line-height: 20px;
    transition: all 0.3s ease;
}
.vjs-switch {
    cursor: pointer;
    width: 38px;
    height: 20px;
    background: #8c8c8c;
    border-radius: 11px;
    padding: 1px;
    transition: all 0.3s ease;
}
.vjs-switch-dor {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    transition: all 0.3s ease;
}
.vjs-sys-span-active {
    color: #5c9dff;
}
.vjs-switch-active {
    background-color: #3480ff;
}
.vjs-switch-active .vjs-switch-dor {
    transform: translateX(18px);
}
</style>
