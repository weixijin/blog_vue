<template>
    <div class="demo">
        <h2 class="kl-wow">kl-max-ell-pro扩展版</h2>

        <div class="w-400">
            <kl-max-ell-pro :text="maxEllStrC">
                <div class="f-14">
                    {{ maxEllStrC }}
                </div>
            </kl-max-ell-pro>
        </div>

        <kl-sector :radius="50" :deg="deg" color="#396" animation> </kl-sector>

        <h1>并发上传</h1>
    </div>
</template>

<script>
import { configs } from './index.js'
export default {
    components: {
    },
    data() {
        return {
            maxEllStr:
                '塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估塞萨预估',
            textarea: '',
            configs,
            deg: 0,
        }
    },
    computed: {
        maxEllStrC() {
            return this.maxEllStr.slice(0, 85)
        },
    },
    async created() {
        setTimeout(() => {
            this.deg = 180
        }, 0)

        // 生成20个异步任务
        let tasks = []

        for (let i = 0; i < 20; i++) {
            tasks.push(() => {
                return new Promise((res,rej) => {
                    setTimeout(() => {
                        // console.log('task-', i) // 1~20
                        Math.random()>0.5?rej(i):res(i)
                    }, Math.random() * 1000)
                })
            })
        }

        try {
            let res = await this.sendAsyncAll(tasks, 5)
            console.log('all-result-', res)
        } catch (e) {}
    },
    methods: {
        // 最大并发数max的异步任务处理器，任务必须是promise函数
        sendAsyncAll(tasks, max = 5) {
            return new Promise(async (resove) => {
                let len = tasks.length
                let result = new Array(len) // 任务结果
                let executeNumber = 0 // 已执行的任务数，任务一开始就会加1
                let finishNumber = 0 // 已完成的任务数，任务完成后才会加1
                let currentCount = 0 // 当前分组正在执行的任务数
                while (finishNumber < len) {
                    if (currentCount < max && executeNumber < len) {
                        // 当前执行的任务的下标
                        const count = executeNumber
                        // 有空闲，执行任务
                        currentCount++
                        executeNumber++
                        tasks[count]()
                            .then((res) => {
                                // 获取当前执行的任务的下标
                                result[count] = {
                                    code: 200,
                                    data: res,
                                }
                            })
                            .catch((err) => {
                                result[count] = {
                                    code: 500,
                                    data: err,
                                }
                            })
                            .finally(() => {
                                finishNumber++
                                currentCount--
                                if (finishNumber === len) {
                                    resove(result)
                                }
                            })
                    } else {
                        // 添加延时，等待空闲
                        await this.sleep(1)
                    }
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.w-400 {
    width: 400px;
}
</style>
