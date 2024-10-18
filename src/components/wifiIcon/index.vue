<template>
    <div class="container">
        <div class="line" style="--i: 0"></div>
        <div class="line" style="--i: 1"></div>
        <div class="line" style="--i: 2"></div>
        <div class="dot"></div>
    </div>
</template>

<style scoped>
    /* 设置水平垂直居中 */
    input {
        background: none;
        border: none;
        outline: none;
        vertical-align: middle;
    }

    /* 防止未加载完成显示undefined */
    [v-cloak] {
        display: none;
    }

    /* 去掉button默认样式 */
    button {
        border: none;
        background: transparent;
        outline: none;
    }

    /* flex布局相关样式 */
    .flex-column {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .j_c {
        justify-content: center;
    }

    .j_b {
        justify-content: space-between;
    }

    /**滚动条的宽度*/
    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    /* 滚动条的滑块 */
    ::-webkit-scrollbar-thumb {
        background-color: #eaecf1;
        border-radius: 3px;
    }


    :root {
        --bg: #fff;
        --dot: 20px;
        --w: 300px;
        --gap: 45px;
    }

    .container {
        width: var(--w);
        height: calc(var(--gap) * 3 + var(--dot));
        position: relative;
    }

    .line {
        position: absolute;
        --width: calc(var(--w) - var(--gap) * 2 * var(--i));
        width: var(--width);
        height: var(--width);
        /* 水平居中 */
        left: calc(50% - var(--width) / 2);
        /* 距离顶部的距离，根据gap来定 */
        top: calc(var(--gap) * var(--i));
        border-radius: 50%;
        background: conic-gradient(var(--bg) 35%, transparent 35%);
        -webkit-mask: radial-gradient(transparent calc(var(--width) / 2 - var(--dot) - 1px),
                #000 calc(var(--width) / 2 - var(--dot)));
        transform: rotate(-60deg);
    }

    .line::before,
    .line::after {
        content: "";
        position: absolute;
        width: var(--dot);
        height: var(--dot);
        border-radius: 50%;
        left: calc(var(--width) / 2 - var(--dot) / 2);
        top: calc(var(--width) / 2 - var(--dot) / 2);
        background: var(--bg);
    }

    .line::before {
        transform: translate(0, calc(var(--dot) / 2 - var(--width) / 2));
    }

    .line::after {
        transform: rotate(calc(360deg * 0.35)) translate(0, calc(var(--dot) / 2 - var(--width) / 2));
    }

    .dot {
        position: absolute;
        width: var(--dot);
        height: var(--dot);
        border-radius: 50%;
        top: calc(var(--gap) * 3);
        background: var(--bg);
        left: calc(50% - var(--dot) / 2);
    }
</style>
