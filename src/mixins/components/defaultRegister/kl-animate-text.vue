<template>
    <div :class="['kl-animate-text', className]">
        <slot> kl-animate-text</slot>
    </div>
</template>

<script>
export default {
    name: 'kl-animate-text',
    props: {
        scrollTagret: {  // 滚动的节点
            type: String,
            default: 'body',
        },
        isone:{  // 是否只执行一次
            type:Boolean,
            default:false
        },
        aClass:{  // 动画的class
            type:String,
            default:'kl-animate-text-active'
        },
        defaultA:{  // 默认是否执行动画
            type:Boolean,
            default:true
        },
    },
    data() {
        return {
            className: '',
            el: null,
            el_current: null,
        }
    },
    mounted() {
        this.className = this.createId()
        this.$nextTick(() => {
            this.init()
        })
    },
    beforeDestroy() {
        if (this.el && this.el_current) {
            this.el.removeEventListener('scroll', this.scroll)
        }
    },
    methods: {
        init() {
            let {defaultA} = this
            this.el = document.querySelector(this.scrollTagret)
            this.el_current = document.querySelector(`.${this.className}`)
            if (!this.el || !this.el_current) return
            if(defaultA){
              this.scrollEvent()  
            }
            // 监听滚动
            this.el.addEventListener('scroll', () => {
                this.scroll()
            })
        },
        // 滚动事件
        scroll() {
            this.scrollEvent()
        },

        // 滚动核心处理方法
        scrollEvent() {
            let { el, el_current } = this
            let el_current_top = el_current.getBoundingClientRect().top
            let el_top = el.getBoundingClientRect().top
            if ( el_current_top > 0 && el_current_top - el_top>0 && el_current_top - el_top < el.clientHeight) {
                el_current.classList.add(this.aClass)
            } else {
                if(!this.isone){
                    el_current.classList.remove(this.aClass)
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-animate-text-active {
    animation: a_text 0.8s;
}
@keyframes a_text {
    0% {
        opacity: 0.5;
        transform: translateX(50px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
