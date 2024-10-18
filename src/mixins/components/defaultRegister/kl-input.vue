<template>
    <input
        v-model="inputVal"
        :style="{ width: width + 'px' }"
        class="kl-input"
        @input="inputEvent"
    />
</template>

<script>
export default {
    name: 'kl-input',
    props: {
        min: {
            type: String,
            default: '',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个 空字符或者数字 
                return value === '' || !isNaN(value)
            },
        },
        max: {
            type: String,
            default: '',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个 空字符或者数字
                return value === '' || !isNaN(value)
            },
        },
        type: {
            type: String,
            default: 'number',
            validator(value) {
                return ['number'].includes(value)
            },
        },
        width: {
            type: Number,
            default: 300,
        },
        value: {
            // 父组件默认传递过来的value
            type: Number || String,
        },
        interval: {
            // 是否需要间隔
            type: Boolean,
            default: false,
        },
        // 整数
        integer: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            inputVal: '',
        }
    },
    created(){
        this.inputVal = this.value
    },
    methods: {
        inputEvent(e) {
            let { integer, interval, min, max } = this
            let value = e.target.value
            // 去除连续输入的0
            value = value.replace(/^0+/, '0')

            // 只能是整数
            if (integer) {
                // 如果大于两位，第一位不能为0
                if (value.length > 1) {
                    value = value.replace(/^0/, '')
                }
                // 只能是0~9
                value = value.replace(/[^\d]/g, '')
            } else {
                // 第一位不能是小数点
                value = value.replace(/^\./g, '')
                // 允许是小数
                value = value.replace(/[^\d.]/g, '')
                // 只能输入一个小数点
                value = value.replace(/\.{2,}/g, '.')
                value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
                // 第二位是数字，第一位不能是0
                if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
                    value = value.replace(/^0/, '')
                }
            }

            if (interval) {
                // 添加千位分隔符
                value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }

            // 范围限制
            if (min !== '') {
                // 小于最小值，去除最后一位
                if (value - 0 < min-0) {
                    value = value.slice(0, value.length - 1)
                }
            }
            if (max !== '') {
                // 大于最大值，去除最后一位
                if (value - 0 > max-0) {
                    value = value.slice(0, value.length - 1)
                }
            }

            this.inputVal = value
            this.$emit('input', value)
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
}
.kl-input:focus {
    border-color: $primary;
}

// 修改placeholder的颜色
.kl-input::-webkit-input-placeholder {
    color: #c0c4cc;
    font-size: 14px;
}
</style>
