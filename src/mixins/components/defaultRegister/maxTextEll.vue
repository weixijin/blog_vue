<template>
    <div :class="['max-text-ell pr', pageClass]">
        <div v-html="currentVal"></div>

        <div class="max-text-ell-pos-status" v-show="isPosShow" @click="changeStatus">
            {{ isEllStatus ? '展开吧' : '收起吧' }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        maxHeight: {
            type: Number,
            default: 72,
        },
        minLength: {
            type: Number,
            default: 68,
        },
        maxLength: {
            type: Number,
            default: 200,
        },
    },
    data() {
        return {
            pageClass: this.createId(),
            isPosShow: true,
            currentLength: 68,
            currentVal: '',
            isEllStatus: false,
            
        }
    },
    mounted() {
        this.setTextEll()
    },
    computed:{
        valLength(){
            return this.value.length
        }
    },
    watch: {
        value() {
            this.setTextEll()
        },
    },
    methods: {
        async setOpen() {
            if (this.currentVal.length < this.valLength) {
                this.isPosShow = false
                // 每次新增一个字符
                this.currentVal = this.value.substring(0, this.currentVal.length + 1)
                await this.sleep(15)
                this.setOpen()
            } else {
                this.currentVal = this.value + `<span class="max-text-ell-space"></span>`
                this.isEllStatus = !this.isEllStatus
                this.isPosShow = true
            }
        },
        async changeStatus(status) {
            if (status === true) {
                this.isEllStatus = status
            }
            if (this.isEllStatus) {
                // 去除末尾的...
                this.currentVal = this.currentVal.substring(0, this.currentVal.length - 3)
                // 展开
                this.setOpen()
            } else {
                this.currentVal = this.value.substring(0, this.currentLength - 5) + '...'
                this.isEllStatus = !this.isEllStatus
            }
        },

        // 设置文本长度
        async setTextEll() {
            let length = this.value.length
            if (length < this.minLength) {
                this.isPosShow = false
                this.currentVal = this.value
                return
            }

            if (this.currentLength >= this.maxLength) {
                this.currentVal = this.value
                this.isPosShow = false
                return
            }
            this.currentLength += 1

            this.currentVal = this.value.substring(0, this.currentLength)
            await this.$nextTick()
            let el = document.querySelector(`.${this.pageClass}`)
            // 获取高度
            let height = el.offsetHeight
            if (height <= this.maxHeight) {
                this.setTextEll()
            } else {
                this.isEllStatus = true
                // 可以检测倒数几个的非中文字符个数
                this.currentVal = this.value.substring(0, this.currentLength - 5) + '...'
                this.isPosShow = true
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.max-text-ell-space {
    display: inline-block;
}
.max-text-ell-pos-status {
    position: absolute;
    right: 0;
    bottom: 4px;
    height: 16px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3480ff;
    line-height: 16px;
}
</style>
