// import Vue from "vue"

const createMessage = (component, props) => {
    // 组件构造函数
    const Ctor = Vue.extend(component)
    // 创建组件实例
    const comp = new Ctor({ propsData: props })
    // console.log(comp.$el);      // undefined
    // 如果不挂载，就不会转化为转化为真实dom
    // comp.$mount("#app") 就会直接挂载
    comp.$mount()
    // console.log(comp.$el);      // 拿到了真实dom
    document.body.appendChild(comp.$el)

    comp.remove = () => {
        if(!comp.$el) return
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }

    return comp
}

export default createMessage
