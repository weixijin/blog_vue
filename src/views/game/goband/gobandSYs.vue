<template>
    <e-dialog
        customClass="gobandSYs"
        v-model="visable"
        title="对局确认"
        width="500px"
        :clickModal="false"
        @confirm="confirm"
    >
        <div class="p-20">
            <div v-if="step_content" class="c-primary">
                您已选中{{getQi}},对局开始前依然可以更改
            </div>
            
            <div class="flex-center-wrap m-t-10">
                <div class="w-80">思考间隔：</div>
                <el-input
                    class="w-120"
                    v-model="max_move_time1"
                    type="number"
                    min="10"
                    max="3600"
                ></el-input>
                &nbsp; 秒
            </div>
            <div class="flex-center-wrap m-t-20">
                <div class="w-80">我方：</div>
                <el-radio :disabled="heiDisabled" v-model="step_content1" label="2">黑棋</el-radio>
                <el-radio :disabled="baiDisabled" v-model="step_content1" label="1">白棋</el-radio>
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
        step_content: {
            type: Number,
            default: 0,
        },
        max_move_time: {
            type: Number,
            default: 0,
        },
        gameBase: {
            type: Object,
            default: () => {
                return {}
            },
        },
        getQi:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            max_move_time1: 0,
            step_content1: this.step_content,
        }
    },
    computed: {
        ...Vuex.mapState(['userdata']),
        visable: {
            get() {
                return this.value
            },
            set() {
                return this.$emit('input', false)
            },
        },
        heiDisabled() {
            return !!this.gameBase.hei_user_id
        },
        baiDisabled() {
            return !!this.gameBase.bai_user_id
        },
    },
    watch: {
        step_content(val) {
            this.step_content1 = val
        },
        max_move_time(val) {
            this.max_move_time1 = val
        },
        gameBase: {
            handler(val) {},
            deep: true,
        },
    },
    methods: {
        confirm() {
            let { max_move_time1, step_content1 } = this
            if (max_move_time1 < 10 || max_move_time1 > 3600) {
                this.$message.error('思考间隔必须在10-3600秒之间')
                return
            }

            if(!step_content1){
                this.$message.error('请选择棋子颜色，黑棋先行~')
                return
            }

            let params = {
                max_move_time: max_move_time1,
            }
            let { _id } = this.userdata

            if (step_content1 == 1) {
                params.bai_user_id = _id
            }

            if (step_content1 == 2) {
                params.hei_user_id = _id
            }

            this.$emit('confirm', params)
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    .gobandSYs {
        .el-icon-close,
        .cancel-el-btn {
            display: none;
        }
    }
}
</style>
