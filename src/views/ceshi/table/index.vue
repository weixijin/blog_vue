<template>
    <div class="demo">
        <el-button @click="openKlMessage"> openMessage </el-button>
        <kl-tab v-model="activeName" :options="tabOptions" @change="changeCom" />
        <div class="main">
            <component :is="activeName"></component>
        </div>
    </div>
</template>

<script>
import headersFrom from './headers_from.vue'
import formSynthesis from './form_synthesis.vue'
import defaultFormCom from './defaultFormCom.vue'

import rowMerge from './row_merge.vue'
export default {
    name: 'demo',
    components: { headersFrom, formSynthesis, rowMerge, defaultFormCom },
    data() {
        return {
            activeName: 'defaultFormCom',
            tabOptions: [
                {
                    value: 'defaultFormCom',
                    label: '基础控件',
                },
                {
                    value: 'headersFrom',
                    label: '多级表头',
                },
                {
                    value: 'rowMerge',
                    label: '行合并',
                },
                {
                    value: 'formSynthesis',
                    label: '综合',
                },
            ],
        }
    },
    methods: {
        changeCom(name) {
            this.activeName = name
            // console.log(name);
        },
        openKlMessage() {
            this$klMessage('444')
        },
    },
}
</script>

<style lang="scss" scoped>
.main {
    padding: 20px 0;
}

::v-deep .el-button {
    color: red;
}
</style>
