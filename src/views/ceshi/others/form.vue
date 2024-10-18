<template>
    <div>
        <h2>
            {{ currentVal }}
        </h2>
        <div class="demo">
            <el-select v-model="currentVal" filterable placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>

            <kl-select bar v-model="currentVal" :options="options" />
        </div>
        <div class="m-t-50">
            {{ isOk }}
            <kl-switch :default="switchRule" v-model="isOk" @change="change"></kl-switch>
            <el-button @click="changeSwitch"> 修改isOK </el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOk: '1',
            switchRule: ['1', '2'],
            currentVal: '',
            options: [],
        }
    },
    methods: {
        change(val) {
            // console.log(val)
        },
        changeSwitch() {
            switch (this.isOk) {
                case '1':
                    this.isOk = '2'
                    break

                case '2':
                    this.isOk = '1'
                    break
            }
        },
    },
    created() {
        // 创建假数据
        setTimeout(() => {
            for (let i = 0; i < 20; i++) {
                this.options.push({
                    label: `小明${i}`,
                    value: i,
                })
            }
        }, 100)
    },
}
</script>

<style lang="scss" scoped>
.demo {
    display: flex;
}
.m-t-50 {
    margin-top: 50px;
}
</style>
