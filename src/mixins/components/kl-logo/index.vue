<template>
    <div class="kl-log p-l-10" @click="clickEvent">
        <canvas :id="logo" width="160" :height="height"> logo </canvas>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        height:{
            type:Number,
            default:80
        
        },
        fontSize: {
            type: Number,
            default: 35,
        },
        text: {
            type: String,
            default: 'B L O G',
        },
    },
    data() {
        return {
            logo: 'B L O G',
        }
    },
    created() {
        this.logo = this.createId()
    },
    mounted() {
        let canvas = document.getElementById(this.logo)
        if(!canvas){
            return this.$message.warning('请重试')
        }
        let ctx = canvas.getContext('2d')
        // 依次为字体大小 字体名称

        ctx.font = `${this.fontSize}px Verdana`
        // 定义文字位置
        ctx.textAlign = 'center'
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        // 描绘渐变颜色
        gradient.addColorStop('0', this.getColor())
        gradient.addColorStop('0.5', this.getColor())
        gradient.addColorStop('1.0', this.getColor())
        // Fill with gradient
        ctx.strokeStyle = gradient
        // 文字居中
        ctx.strokeText(this.text, canvas.width / 2, this.height/2+10)
    },
    methods: {
        clickEvent() {
            this.$emit('click')
        },
        getColor() {
            let allType = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e'.split(',')
            let str = '#'
            for (let i = 0; i < 6; i++) {
                let char = Math.floor(Math.random() * allType.length)
                str += allType[char]
            }
            return str
        },
    },
}
</script>

<style lang="scss" scoped></style>
