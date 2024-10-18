// 前进后退控件
import fast_forward from './components/fast_forward.vue'

// 系统控制控件
import sys from './components/sys.vue'

export function createControl(that) {
    // 处理前进后退的播放控件
    const Ctor = Vue.extend(fast_forward)
    // create 可以传入props值
    const comp = new Ctor({
        propsData: {
            preImg: '//image.zlketang.com/public/news/others/imgs/web_pc/0283cad753b8be5df7a764d78f66dd31.png',
            nextImg:
                '//image.zlketang.com/public/news/others/imgs/web_pc/5510ac8bad62f39b6675a12574347598.png',
        },
    })
    comp.$mount()
    let controlBox = document.querySelector('.vjs-custom-control-spacer')
    if (!controlBox) return
    // 清空controlBox下的数据
    controlBox.innerHTML = ''

    controlBox.appendChild(comp.$el)
    // 监听组件的emit事件
    comp.$on('pre-fun', (data) => {
        console.log('pre-fun', that.player)
        
    })
    comp.$on('next-fun', (data) => {
        console.log('next-fun', that.player)
    })


    // 处理设置控件
    const sysCtor = Vue.extend(sys)
    // create 可以传入props值
    const sysComp = new sysCtor({
        propsData: {},
    })

    sysComp.$mount()
    controlBox.appendChild(sysComp.$el)
}
