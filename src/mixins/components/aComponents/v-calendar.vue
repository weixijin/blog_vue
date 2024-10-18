<template>
    <div class="demo">
        <van-calendar
        ref="calendarRef"
            v-model="value"
            :allow-same-day="allowSameDay"
            :min-date="minDate"
            :show-confirm="showConfirm"
            :color="color"
            :defaultDate="defaultDate"
            :type="type"
            :first-day-of-week="firstDayOfWeek"
            @confirm="confirm"
        />
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'range',
        },
        defaultDate: {
            // 默认选中的日期
            type: Array,
            default: () => {
                return []
            },
        },
        color: {
            // 主题颜色
            type: String,
            default: '#1989fa',
        },
        'show-confirm': {
            // 是否显示确认按钮
            type: Boolean,
            default: true,
        },
        'min-date': {
            type: Date,
            default: new Date(2022, 1, 1),
        },
        'max-date': {
            type: Date,
            default: new Date(2050, 1, 1),
        },
        'allow-same-day': {
            // 是否允许选择同一天
            type: Boolean,
            default: true,
        },
        'first-day-of-week': {
            // 一周的第一天
            type: Number,
            default: 1,
        },
    },
    data() {
        return {}
    },
    watch: {
        value(val) {
            this.$emit('input', val)
        },
    },
    methods: {
        confirm(val) {
            if (!Array.isArray) {
                val = []
            }
            // 将时间转为时间戳
            val = val.map((item) => Date.parse(item))
            this.$emit('confirm', val)
        },
    },
}
</script>

<style lang="scss" scoped></style>
