<template>
    <div class="e-radio">
        <div
            @click="select(item)"
            class="e-radio-item flex-wrap flex-center-wrap"
            v-for="item in option"
            :key="item.value"
        >
            <div :class="['e-radio-b flex-center', value === item.value ? 'e-radio-select' : '']">
                <div v-show="value === item.value" class="e-radio-n"></div>
            </div>
            <span class="e-radio-label">
                {{ item.label }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'e-radio',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        option: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {}
    },
    methods: {
        select({ value }) {
            this.$emit('input', value)
        },
    },
}
</script>

<style lang="scss" scoped>
.e-radio {
    display: flex;
    flex-wrap: wrap;
}
.e-radio-item {
    transition: all 0.5s;
    cursor: pointer;
}
.e-radio-item:nth-of-type(-n + 1) {
    margin-right: 24px;
}

.e-radio-b {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    border: 1px solid #c0c5cc;
    border-radius: 50%;
}
.e-radio-n {
    width: 10px;
    height: 10px;
    background: #3480ff;
    border-radius: 50%;
}
.e-radio-select {
    border-color: #3480ff;
}
.e-radio-label {
    font-size: 14px;
    font-weight: 400;
    color: #606266;
}
</style>
