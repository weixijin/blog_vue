<template>
    <div class="flex-center loading-page-container">
        <div class="zl-loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
/* zl-loading样式 start */
.loading-page-container {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 999;
}

.zl-loading {
    height: 40px;
}

.zl-loading span {
    margin: 0 2px;
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: #f0f0f0;
    -webkit-animation: load 1s ease infinite;
}

@-webkit-keyframes load {
    0%,
    100% {
        height: 40px;
        background: #f0f0f0;
    }

    50% {
        height: 70px;
        margin: -15px 2px;

        background: rgb(153, 190, 226);
    }
}

.zl-loading span:nth-child(2) {
    -webkit-animation-delay: 0.2s;
}

.zl-loading span:nth-child(3) {
    -webkit-animation-delay: 0.4s;
}

.zl-loading span:nth-child(4) {
    -webkit-animation-delay: 0.6s;
}

.zl-loading span:nth-child(5) {
    -webkit-animation-delay: 0.8s;
}

/* zl-loading样式 end */
</style>
