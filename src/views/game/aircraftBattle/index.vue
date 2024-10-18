<template>
    <div>
         <div class="box"></div>
        <div class="aircraftBattle" id="aircraftBattle"></div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            step: 1,
            imgs: {
                // 开始游戏按钮
                beginBtn:
                    'https://s1.chu0.com/src/img/png/d3/d3999d2571cd4e64a88c8b5823d14b3c.png?e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:XyvBDZFo3TrbEqKSZaK-Etd5YLc=',
                // 开始游戏页面背景
                stepOneBg:
                    'https://s1.chu0.com/src/img/jpg/ed/ed05981935f34ed9945038155f2e9217.jpg?imageMogr2/auto-orient/thumbnail/!240x320r/crop/!240x320a0a0/quality/85/&e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:vKUQPG9X75xeyZym47cuglnjW2M=',
                // 游戏时的背景
                gameBg: 'https://s1.chu0.com/pvimg/img/png/e7/e7fb749c77ab425cb57fb2228f178ebe.png?imageMogr2/auto-orient/thumbnail/!240x320r/crop/!240x320a0a0/quality/85/&e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:ByvTVB8r2ImXN--Nbzkh31UGcQU=',
                // 战机
                plane: {
                    width: 50,
                    height: 42,
                    img: 'https://s1.chu0.com/src/img/png/86/862ed62f179b47c6aaf9ebb32c7977ab.png?e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:75PTGCPW2Cmk6-S3lgPSzNlBrPY=',
                },
                // 子弹
                planeCartridge: {
                    width: 34,
                    height: 34,
                    img: 'https://s1.chu0.com/pvimg/img/png/ec/ec6f3ccf3e8b4af8a06b0514848b97a2.png?e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:oyqwMdKvkw5omB66aM15C_nRZmg=',
                },

                // 敌机1
                enemyPlane1: {
                    width: 40,
                    height: 34,
                    img: 'https://s1.chu0.com/src/img/png/97/9785fe1f3141451ea61fced10d502720.png?e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:KoRxw9iRb1V1Q0v2n_1bZ1fzhFQ=',
                },
            },
            stage: {}, // 舞台
            beginLayer: {}, // 开始游戏页面
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        // 创建舞台
        createStage() {
            let el = document.getElementById('aircraftBattle')
            let width = el.offsetWidth
            let height = el.offsetHeight

            this.stage = new Konva.Stage({
                container: 'aircraftBattle',
                width: width,
                height: height,
            })
        },

        beginDraw() {
            let {
                stage,
                imgs: { beginBtn, stepOneBg },
            } = this

            this.beginLayer = new Konva.Layer()
            this.stage.add(this.beginLayer)
            let beginImgs = {
                beginBtn,
                stepOneBg,
            }

            this.loadImages(beginImgs, this.beginDrawPage)
        },
        // 加载图片
        loadImages(sources, callback) {
            var images = {}
            var loadedImages = 0
            var numImages = 0
            for (var src in sources) {
                numImages++
            }
            for (var src in sources) {
                images[src] = new Image()
                images[src].onload = function () {
                    if (++loadedImages >= numImages) {
                        callback(images)
                    }
                }
                images[src].src = sources[src]
            }
        },
        // 开始游戏页面绘制
        beginDrawPage(images) {
            let { stage } = this
            let beginBtn = new Konva.Image({
                image: images.beginBtn,
                // 居中
                x: stage.width() / 2 - 178 / 2,
                y: stage.height() / 2 - 70 / 2,
                width: 178,
                height: 70,
            })

            // 移动端点击事件
            beginBtn.on('tap', () => {
                this.beginLayer.destroy()
                this.beginLayer = {}
                this.loadImages(
                    {
                        gameBg: this.imgs.gameBg,
                        plane: this.imgs.plane.img,
                        enemyPlane1: this.imgs.enemyPlane1.img,
                        planeCartridge: this.imgs.planeCartridge.img,
                    },
                    this.gameDraw,
                )
            })

            // 鼠标移入事件 改变鼠标样式
            beginBtn.on('mouseover', () => {
                document.body.style.cursor = 'pointer'
            })

            // 鼠标移出事件 改变鼠标样式
            beginBtn.on('mouseout', () => {
                document.body.style.cursor = 'default'
            })

            var beginPage = new Konva.Image({
                image: images.stepOneBg,
                x: 0,
                y: 0,
                width: stage.width(),
                height: stage.height(),
            })

            this.beginLayer.add(beginPage)
            this.beginLayer.add(beginBtn)

            this.beginLayer.draw()
        },

        // 游戏页面绘制
        gameDraw(images) {
            let { stage, imgs } = this
            let gameLayer = new Konva.Layer()
            let plane = new Konva.Image({
                image: images.plane,
                x: stage.width() / 2 - imgs.plane.width / 2,
                y: stage.height() - imgs.plane.height,
                width: imgs.plane.width,
                height: imgs.plane.height,
            })

            let gameBgImg = new Konva.Image({
                image: images.gameBg,
                x: 0,
                y: 0,
                width: stage.width(),
                height: stage.height(),
            })

            gameLayer.add(gameBgImg)
            gameLayer.add(plane)
            stage.add(gameLayer)

            let timer = 0
            function drowPlan(x, y) {
                if (timer) return
                timer = setTimeout(() => {
                    let tween = new Konva.Tween({
                        node: plane,
                        duration: 0.1,
                        x,
                        y,
                    })
                    tween.play()
                    timer = 0
                    clearTimeout(timer)
                }, 80)
            }

            function fireBullet() {
                let bullet = new Konva.Image({
                    image: images.planeCartridge,
                    x: plane.x() + imgs.plane.width / 2 - imgs.planeCartridge.width / 2,
                    y: plane.y() - imgs.planeCartridge.height,
                    width: imgs.planeCartridge.width,
                    height: imgs.planeCartridge.height,
                })
                gameLayer.add(bullet)
                let tween = new Konva.Tween({
                    node: bullet,
                    duration: (2 * plane.y()) / stage.height(),
                    y: 0,
                    onFinish: () => {
                        bullet.destroy()
                    },
                })
                tween.play()
            }

            // 监听键盘
            document.onkeydown = function (e) {
                let key = e.keyCode
                let x = plane.x()
                let y = plane.y()
                let step = 40
                switch (key) {
                    // 空格 发射子弹
                    case 32:
                        fireBullet()
                        break
                    case 37:
                        drowPlan(x - step, y)
                        break
                    case 38:
                        drowPlan(x, y - step)
                        break
                    case 39:
                        drowPlan(x + step, y)
                        break
                    case 40:
                        drowPlan(x, y + step)
                        break
                }
            }

            let timer1 = setTimeout(() => {
                createEnemyPlane()
            }, 1000)

            // 随机生成敌机
            function createEnemyPlane() {
                let enemyPlane1 = new Konva.Image({
                    image: images.enemyPlane1,
                    x: Math.random() * (stage.width() - imgs.enemyPlane1.width),
                    y: 0,
                    width: imgs.enemyPlane1.width,
                    height: imgs.enemyPlane1.height,
                })
                gameLayer.add(enemyPlane1)

                let tweenEnemyPlane1 = new Konva.Tween({
                    node: enemyPlane1,
                    duration: 10,
                    y: stage.height(),
                    onFinish: () => {
                        enemyPlane1.destroy()
                    },
                })
                tweenEnemyPlane1.play()

                timer1 = setTimeout(() => {
                    createEnemyPlane()
                }, Math.floor(Math.random() * 1000 + 1000))
            }

            // 战机子弹碰撞检测
            function bulletCollisionDetection() {
                let bullets = gameLayer.find('Image')
                let enemyPlanes = gameLayer.find('Image')
                bullets.forEach((bullet) => {
                    enemyPlanes.forEach((enemyPlane) => {
                        if (
                            bullet.x() > enemyPlane.x() &&
                            bullet.x() < enemyPlane.x() + imgs.enemyPlane1.width &&
                            bullet.y() > enemyPlane.y() &&
                            bullet.y() < enemyPlane.y() + imgs.enemyPlane1.height
                        ) {
                            bullet.destroy()
                            enemyPlane.destroy()
                        }
                    })
                })
            }

            // 战机碰撞检测
            function planeCollisionDetection() {
                let enemyPlanes = gameLayer.find('Image')
                enemyPlanes.forEach((enemyPlane) => {
                    if (
                        plane.x() > enemyPlane.x() &&
                        plane.x() < enemyPlane.x() + imgs.enemyPlane1.width &&
                        plane.y() > enemyPlane.y() &&
                        plane.y() < enemyPlane.y() + imgs.enemyPlane1.height
                    ) {
                        enemyPlane.destroy()
                        plane.destroy()
                        clearTimeout(timer1)
                        clearTimeout(timer)
                        document.onkeydown = null
                        alert('游戏结束')
                    }
                })
            }

            // 战机子弹碰撞检测
            setInterval(() => {
                bulletCollisionDetection()
            }, 100)

            // 战机碰撞检测
            setInterval(() => {
                planeCollisionDetection()
            }, 100)

            stage.add(gameLayer)
        },
        // 初始化
        async init() {
            await this.$nextTick()
            // 创建舞台
            this.createStage()
            // 开始游戏页面绘制
            this.beginDraw()
        },
    },
}
</script>

<style lang="scss" scoped>
.aircraftBattle {
    margin: 100px auto;
    width: 375px;
    height: 667px;
}
.box{
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    top: 200px;
    left: 500px;
    z-index: 1;
}
</style>
