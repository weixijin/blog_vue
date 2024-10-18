<template>
    <div class="demo">
        {{ value1 }}
        <el-select v-model="value1">
            <el-option label="选项1" value="aaa"></el-option>
            <el-option label="选项2" value="bbb"></el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {}
    },
    computed: {
        value1: {
            get() {
                const obj = {
                    true: 'aaa',
                    false: 'bbb',
                }
                return obj[this.value] !== undefined ? obj[this.value] : this.value
            },
            set(val) {
                const obj = {
                    aaa: true,
                    bbb: false,
                }
                this.$emit('input', obj[val] !== undefined ? obj[val] : val)
            },
        },
    },
    methods: {},
}
</script>

<style lang="scss" scoped></style>
