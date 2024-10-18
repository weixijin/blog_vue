<template>
    <div :class="['e-input pr', type === 'number' ? 'e-input-number' : '']">
        <el-input :min="min" :placeholder="placeholder" :type="type" v-model.number="eValue" @input="change"></el-input>
        <div class="e-input-number-right-icons">
            <div class="e-input-number-right-icon flex-center" @click="valueChange(1)">
                <i class="el-icon-caret-top"></i>
            </div>
            <div class="e-input-number-right-icon flex-center" @click="valueChange(-1)">
                <i class="el-icon-caret-bottom"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: '',
        },
        value: {
            type: [Number, String],
            default: 0,
        },
        type: {
            type: String,
            default: 'number',
        },
        max: {
            type: [Number, String],
            default: 'no',
        },
        min: {
            type: [Number, String],
            default: 'no',
        },
    },
    data() {
        return {
            eValue: this.value,
        }
    },
    watch:{
        value(val){
            this.eValue = val
        }
    },
    methods: {
        change(){
             this.$emit('input', this.eValue)
        },
        valueChange(type) {
            let {value,max,min} = this
            let newVal = value + type
            if(typeof max === 'number' && newVal > max){
                newVal = max
            }

            if(typeof min === 'number' && newVal < min){
                newVal = min
            }
            this.$emit('input', newVal)
        },
    },
}
</script>

<style lang="scss">
.e-input-number {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    .el-input__inner {
        padding-right: 52px;
    }

    .e-input-number-right-icons {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 36px;
        display: flex;
        flex-direction: column;
    }
    .e-input-number-right-icon {
        cursor: pointer;
        flex: 1;
        border-left: 1px solid #d8dce6;
        i {
            color: #909399;
        }

        &:hover {
            i {
                color: #409eff;
            }
        }
    }
    .e-input-number-right-icon:nth-of-type(1) {
        border-radius: 0 2px 0 0;

        border-bottom: 1px solid #d8dce6;
    }
    .e-input-number-right-icon:nth-of-type(2) {
        border-radius: 0 0 2px 0;
        border-top: 0;
    }
}
</style>
