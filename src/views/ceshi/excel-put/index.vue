<template>
    <div class="demo">
        <el-link :href="fileUrl"> 下载模板 </el-link>
        <el-button @click="downLoadFile">动态创建a标签下载</el-button>

        <div class="flex-wrap m-t-20">
            <span class="m-r-20"> 选择班/休 </span>
            <e-radio v-model="radio" :option="option"> </e-radio>
        </div>

        <div class="flex-wrap m-t-20">
            <span class="m-r-20"> 接通时效（分钟） </span>
            <e-input :min="0" :max="10" class="e-input" v-model="radio"></e-input>
        </div>
    </div>
</template>

<script>
export default {
    name: 'demo',
    components: {},
    data() {
        return {
            radio: 1,
            option: [
                {
                    label: '班',
                    value: 1,
                },
                {
                    label: '休',
                    value: 2,
                },
            ],
            fileUrl: 'http://139.9.210.43:5000/ceshi/load/学员信息模板.xlsx',
            options: [
                {
                    name: 'id',
                    prop: 'id',
                },
                {
                    name: '姓名',
                    prop: 'username',
                },
                {
                    name: '年龄',
                    prop: 'age',
                },
                {
                    name: '性别',
                    prop: 'sex',
                },
            ],
        }
    },
    methods: {
        uploadJson(jsonData) {
            // console.log('最终的上传数据--', jsonData)
        },
        downLoadFile() {
            let el = document.createElement('a')
            el.href = this.fileUrl
            el.click()
            el.remove()
        },
    },
}
</script>

<style lang="scss">

</style>
