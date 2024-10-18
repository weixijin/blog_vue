<template>
    <mavon-editor
        ref="md"
        class="bug-c-movon-editor"
        v-model="value"
        :ishljs="true"
        :toolbars="toolbarsComPuted"
        @imgAdd="imgAdd"
        @save="editorChange"
        @change="changeFn"
    ></mavon-editor>
</template>

<script>
// 编辑器插件
// 局部页面引入会导致奇怪的问题： 1、值会被莫名清空
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
Vue.use(mavonEditor)

import { baseURL } from '@/plugins/config'
import { post_upload_imgs_common } from '@/api/blog/index.js'


export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        upload_file_url: {
            type: String,
            require: true,
        },
        // 编辑器配置
        toolbars: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {}
    },
    computed: {
        // 富文本工具栏
        toolbarsComPuted() {
            return Object.assign(
                {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
                this.toolbars,
            )
        },
    },
    methods: {
        changeFn(str, html) {
            this.$emit('change', {
                str,
                html,
            })
        },
        async editorChange(charge_string, charge_html) {
            this.$emit('save', {
                str: charge_string,
                html: charge_html,
            })

            this.$emit('input', charge_string)
        },
        // 添加图片触发
        async imgAdd(pos, file) {
            try {
                const { upload_file_url } = this
                if (!upload_file_url) {
                    return this.$message.error('请配置上传图片地址upload_file_url')
                }
                // 处理图片过大
                let devicePixelRatioa = window.devicePixelRatio || 1
                // 创建一个图片
                let img = new Image()

                // 生成一个内存地址
                img.src = window.URL.createObjectURL(file)
                // 获取宽高
                img.onload = async () => {
                    let { width, height } = img
                    // 创建一个canvans来绘制图片
                    let canvas = document.createElement('canvas')
                    let ctx = canvas.getContext('2d')
                    // 设置宽高，这儿是为了不上传过大的图片
                    canvas.width = width / devicePixelRatioa
                    canvas.height = height / devicePixelRatioa
                    // 绘制图片
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    // 将图片转为base64
                    let base64 = canvas.toDataURL(file.type, 0.8)
                    // base64转为file
                    let newFile = this.base64ToFile(base64, file.name)
                    let obj = {
                        1: 1,
                        2: 0.92,
                        3: 0.85,
                    }
                    let {
                        file: miniFile,
                        newWidth,
                        newHeight,
                    } = await this.compressImg(newFile, obj[devicePixelRatioa])
                    if (!miniFile) {
                        this.$message.error('图片压缩失败')
                        return
                    }
                    const formData = new FormData()
                    formData.append('file', miniFile)

                    const params = {
                        type: upload_file_url,
                        devicePixelRatioa,
                        width: Math.floor(newWidth / devicePixelRatioa),
                        height: Math.floor(newHeight / devicePixelRatioa),
                    }
                    const res = await post_upload_imgs_common({
                        data: formData,
                        params,
                    })

                    let { netdisk_url } = res?.data || {}
                    if (!netdisk_url) {
                        this.$message.warning('上传图片失败')
                        return
                    }
                    // 将请求返回的图片的url返回，且回显到当前编辑器中
                    this.$refs.md.$img2Url(pos, `${baseURL}${netdisk_url}`)
                }
            } catch (err) {
                this.Toast(err)
            }
        },
    },
}
</script>

<style lang="scss" scoped>

    .bug-c-movon-editor {
        width: 100%;
    }
    .el-table img {
        max-width: 100%;
    }

</style>
