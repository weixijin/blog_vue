<template>
    <div class="kl-progress">
        <div class="s-circle-item">
            <svg viewBox="0,0,100,100" :style="{ width, height }">
                <circle
                    cx="50"
                    cy="50"
                    r="50"
                    stroke-width="12"
                    stroke="#E5E9F2"
                    fill="none"
                ></circle>
                <text
                    x="50"
                    y="50"
                    font-size="24"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    :fill="percentage | filter_text_class(that)"
                >
                    {{ percentage | filter_text }}
                </text>
                <circle
                    cx="50"
                    cy="50"
                    r="50"
                    stroke-width="12"
                    :stroke="percentage | filter_level(that)"
                    fill="none"
                    :stroke-dasharray="percentage | filter_dash"
                    transform="rotate(-90,50,50)"
                ></circle>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 100,
        },
        height: {
            type: Number,
            default: 100,
        },
        percentage: {
            type: String,
            default: '10',
        },
        status: {
            type: String,
            // 没有效果
            validator: function (prop) {
                if (!this.statusArr.includes(prop)) {
                    return new Error('status参数有误')
                }
            },
            default: 'info',
        },
    },
    data() {
        return {
            alexa: '10000',
            statusArr: ['info', 'success', 'primary', 'warning', 'danger'],
            statusOption: {
                primary: '#409EFF',
                success: '#67C23A',
                info: '#909399',
                warning: '#E6A23C',
                danger: '#F56C6C',
            },
            that: this,
        }
    },
    filters: {
        filter_dash(seconds) {
            let lineLength = 2 * Math.PI * 50
            let dash = seconds
                ? lineLength * (seconds / 100) + ' ' + lineLength * (1 - seconds / 100)
                : 0
            return dash
        },
        filter_level(val, that) {
            return that.statusOption[that.status]
        },
        filter_text_class(val, that) {
            return '#333'
        },
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.kl-progress {
    display: inline-block;

    padding: 6px;
    background: #fff;
    border-radius: 50%;
}
.s-circle-item {
    position: relative;
}
svg {
    position: relative;
    background: inherit;
    border-radius: 50%;
}
circle {
    -webkit-transition: stroke-dasharray 0.5s;
    transition: stroke-dasharray 0.5s;
}

.title {
    text-align: center;
    font-size: 14px;
    color: #333;
    margin: 5px 0;
}
mark {
    position: absolute;
    right: -20px;
    top: 0;
    width: 15px;
    height: 15px;
    background: #fb4c4c;
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
    text-align: center;
}
</style>
