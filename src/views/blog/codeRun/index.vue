<template>
    <div class="demo">
        <el-input v-model="code"></el-input>
        <el-button @click="runCode">执行代码</el-button>
        <div v-html="result"></div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            code: '',
            result: '',
        }
    },
    methods: {
        runCode() {
            this.result = eval(this.code)
        },
    },
}
</script>

<style lang="scss" scoped></style>
