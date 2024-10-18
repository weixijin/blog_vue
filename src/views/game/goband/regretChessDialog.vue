<template>
    <e-dialog :width="type==1?'300px':'500px'" title="悔棋确认框" v-model="visable" :footer="false" :showClose="false">
        <div class="p-20 f-550 c-primary">
            <!-- 发起方 -->
            <div v-if="type==1">已发起悔棋，等待对方确认...</div>

            <!-- 接收方 -->
            <div v-if="type==2">
                你的对手发起了悔棋，请确认：
                <el-radio v-model="regret_result" label="1" @change="regret_resultChange">同意</el-radio>
                <el-radio v-model="regret_result" label="2" @change="regret_resultChange">拒绝</el-radio>
            </div>
        </div>
    </e-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        gameBase: {
            type: Object,
            default: () => () => {
                return {}
            },
        },
        type: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
          regret_result:0
        }
    },
    computed: {
        ...Vuex.mapState(['userdata']),
        visable: {
            get() {
                this.regret_result = 0
                return this.value
            },
            set() {
                this.$emit('input', false)
            },
        },
    },
    methods: {
      regret_resultChange(){
        this.$emit('regret_resultChange',{
          regret_result: this.regret_result,
        })
      }
    },
}
</script>

<style lang="scss" scoped></style>
