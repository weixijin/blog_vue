// import Vue from 'vue'
import * as arr from '@/mixins/tool/tool.js'

// 给原型绑定方法
Object.keys(arr).forEach((key) => {
    Vue.prototype[key] = arr[key]
})

// 创建一个绑定方法
const createMessage = (component, props) => {
    // 组件构造函数
    const Ctor = Vue.extend(component)
    // 创建组件实例
    const comp = new Ctor({ propsData: props })
    // console.log('comp', comp);
    // console.log(comp.$el);      // undefined
    // 如果不挂载，就不会转化为转化为真实dom
    // comp.$mount("#app") 就会直接挂载
    comp.$mount()
    // console.log(comp.$el); // 拿到了真实dom
    // 挂载到body上，插入到最前面
    document.body.insertBefore(comp.$el, document.body.firstChild)

    comp.close = () => {
        if(!comp.$el) return
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }

    return comp
}

export {
    createMessage
}
