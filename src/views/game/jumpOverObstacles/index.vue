<template>
    <div id="jumpOverObstacles"></div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            pageOption:{
                clientWidth:0,
                clientHeight:0,
            },
            // 场景
            stage: null,

            // 任务配置
            userObj:{  
                width:50,
                height:50,
                src:'https://tse4-mm.cn.bing.net/th/id/OIP-C.JwZIjpyJxZwDU33XQmJSmgHaHl?w=185&h=198&c=7&r=0&o=5&pid=1.7',
                // 水平运行速度
                speed: 10,
                // 跳跃速度
                jumpSpeed: 50,
            },
            // 人物图层
            userLayer: null,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        // 设置默认监听事件
        setEvent(){
            this.setUserEvent()
        },

        // 设置人物监听事件
        setUserEvent(){
            let that = this
            // 监听键盘上键事件
            document.addEventListener('keydown', ({keyCode}) => {
                // 上键
                if(keyCode === 38){
                    this.userJump()
                }

                // 左键
                if(keyCode === 37){
                    that.userGo(-1)
                }

                // 右键
                if(keyCode === 39){
                   that.userGo(1)
                }
            })

        },

        // 人物移动
        userGo(direction){
            let {userLayer,userObj:{
                speed,
                width,
                height
            },pageOption:{
                clientHeight,
                clientWidth
            }} = this

            // 获取人物当前位置
            let userY = userLayer.y()
            let userX = userLayer.x()

            // 获取人物移动后的位置
            let moveX = userX + speed * direction

            // 判断人物是否超出可视区域
            if(moveX < 0 || moveX > clientWidth - width){
                return
            }

            // 设置人物移动后的位置
            userLayer.x(moveX)
        },

        // 人物跳跃
        // 单击上键，人物跳跃 100
        // 双击上键，人物跳跃 200
        userJump(){

            let {userLayer,userObj:{
                jumpSpeed,
                width,
                height
            },pageOption:{
                clientHeight,
                clientWidth
            }} = this

            // 获取人物当前位置
            let userY = userLayer.y()
            let userX = userLayer.x()

            

            
        },
        // 初始化
        init() {
            let {userObj} = this
            // 获取可视区宽度
            const width = document.documentElement.clientWidth || document.body.clientWidth
            this.pageOption.clientWidth = width
            // 获取可视区高度
            const height = document.documentElement.clientHeight || document.body.clientHeight
            this.pageOption.clientHeight = height
            // 创建场景
            this.stage = new Konva.Stage({
                container: '#jumpOverObstacles',
                width,
                height,
            })

            // 创建人物图层
            this.userLayer = new Konva.Layer()

            // 设置图层在场景中的位置
            this.userLayer.position({
                x: 0,
                y: height - userObj.height,
            })

            // 添加一个人物图片
            var imageObj = new Image()
            imageObj.src = userObj.src
            imageObj.onload = () => {
                const image = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: userObj.width,
                    height: userObj.height,
                    image: imageObj,
                })

                 // 将图片添加到图层中
                this.userLayer.add(image)

                // 将图层添加到场景中
                this.stage.add(this.userLayer)  
            }

            // 设置默认监听事件
            this.setEvent()
        },
    },
}
</script>

<style lang="scss" scoped></style>
