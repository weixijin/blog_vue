<template>
    <div class="kl-upload">
        <input
            @change="fileChange"
            ref="inputRef"
            class="kl-upload-file"
            type="file"
            multiple="multiple"
        />
        <el-button size="mini" type="primary" @click="handleUploadFile">选择文件上传</el-button>
        <ul>
            <transition-group name="list">
                <li v-for="item in fileOptions" :key="item.fileName" class="flex-center-wrap">
                    <img
                        v-if="preview"
                        :src="item.preview"
                        :title="item.fileName"
                        :alt="item.fileName"
                    />
                    <p v-if="!item.preview">
                        {{ item.fileName }}
                    </p>
                    <i class="el-icon-delete-solid" @click="deleteFile(item.id)"> </i>
                </li>
            </transition-group>
        </ul>

        <div class="upload-footer" v-show="fileOptions.length > 0 && !hideFooter">
            <el-button size="mini" type="success" @click="beginUpload">确定</el-button>
            <el-button size="mini" type="info" @click="cancel">清空</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'kl-upload',
    components: {},
    props: {
        hideFooter: {
            // 隐藏底部的提交操作
            type: Boolean,
            default: false,
        },
        preview: {
            // 是否开启预览
            type: Boolean,
            default: false,
        },
        fileName: {
            // 文件的上传名
            type: String,
            default: 'file',
        },
        limit: {
            // 限制上传文件的个数  ---这儿做简化处理，无论是单选还是多选，都使用多选上传的方式
            type: Number,
            default: 1,
        },
        allowTypes: {
            // 允许提交的文件类型
            type: Array,
            default: ['JPG', 'PNG'],
        },
    },
    data() {
        return {
            multiple: null,
            fileOptions: [],
            allowTypesCopy: [],
        }
    },

    methods: {
        // 清空上传信息
        clear() {
            this.fileOptions = []
            // 需要重新创建，清除默认的历史记录功能 --- 删除一个文件后，再上传，会无法触发input的change
            this.$refs['inputRef'].value = null
        },
        // 取消上传
        cancel() {
            this.fileOptions = []
            // 需要重新创建，清除默认的历史记录功能 --- 删除一个文件后，再上传，会无法触发input的change
            this.$refs['inputRef'].value = null
        },
        // 开始上传
        async beginUpload() {
            // 生成上传信息
            if (this.fileOptions.length === 0) {
                return this.$message.warning('请先选择上传文件')
            }
            // 点击底部确定直接返回数据
            this.$emit('getFiles', this.fileOptions)
        },
        // 删除file列表中的数据
        deleteFile(id) { 
            this.fileOptions = this.fileOptions.filter((item) => {
                // console.log(this.param)
                return item.id !== id
            })

            // 需要重新创建，清除默认的历史记录功能 --- 删除一个文件后，再上传，会无法触发input的change
            this.$refs['inputRef'].value = null
            // 当上传文件有变化直接返回数据
            this.$emit('fileChange', this.fileOptions)
        },
        // 触发 文件上传
        handleUploadFile() {
            // 需要先将传递进来的文件类型先都转为小写
            if (this.allowTypes.length === 0) {
                return this.$message.error('请先传递文件类型')
            }
            this.allowTypesCopy = this.allowTypes.map((item) => {
                item = item.toLowerCase()
                return item
            })
            this.$refs['inputRef'].click()
        },

        // 监听是否选中文件  --- 批量上传
        fileChange(e) {
            if (e.target.files && e.target.files.length > 0) {
                // 这儿的files拿到的都是每次新选中的
                let files = Array.from(e.target.files)
                // console.log("files", files);
                // 判断文件个数
                if (this.fileOptions.length + files.length > this.limit) {
                    return this.$message.warning(`限制上传的最大个数为${this.limit}个,请重新选择`)
                }

                // 判断所有上传文件的文件类型是否都满足
                let isType = files.every((item) => {
                    let fileNameArr = item.name.split('.')
                    return this.allowTypesCopy.includes(fileNameArr[fileNameArr.length - 1])
                })

                if (!isType) {
                    let strs = this.allowTypesCopy.join(',')
                    return this.$message.error(`只能上传${strs}文件，注意检查你的文件`)
                }

                // console.log("开始判断 --- 上传同名文件");

                // // 不能上传同名文件
                let isName = true
                let someFileName = []
                if (this.fileOptions.length > 0) {
                    for (let i = 0; i < this.fileOptions.length; i++) {
                        for (let j = 0; j < files.length; j++) {
                            if (this.fileOptions[i].fileName === files[j].name) {
                                someFileName.push(files[j].name)
                                isName = false
                            }
                        }
                    }

                    // console.log("isName", isName);

                    if (!isName) {
                        let strs = someFileName.join(',')
                        return this.$message.error(`${strs},已经存在，请重新上传`)
                    }
                }

                // 保存上传文件信息
                if (files && files.length > 0) {
                    files.forEach(async (file) => {
                        let preview = ''
                        if (file.name) {
                            // console.log(this.preview);
                            if (this.preview) {
                                try {
                                    preview = await this.createPreviewImg(file)
                                } catch (err) {
                                    this.$message.error(err)
                                }
                            }

                            // 生成最终的配置信息
                            let fileOption = {
                                id: Date.now() + '---' + this.createNumber(),
                                isAllow: true,
                                fileName: file.name,
                                file,
                                preview,
                            }

                            // console.log(fileOption);

                            this.fileOptions.push(fileOption)
                        }
                    })
                }
                // 当上传文件有变化直接返回数据
                this.$emit('fileChange', this.fileOptions)
            }
        },

        // 创建预览图片
        createPreviewImg(file) {
            return new Promise((res, rej) => {
                let fd = new FileReader() // 本地预览
                fd.readAsDataURL(file) // 将图片信息解析成base64
                // console.log("将图片信息解析成base64");
                fd.onload = () => {
                    if (fd.result.startsWith('data:image')) {
                        // 选中的是一张图片
                        // preview = fd.result; // 预览
                        // console.log("preview", preview);
                        res(fd.result)
                    } else {
                        rej('不是图片请关闭预览')
                    }
                }
            })
        },

        // 生成随机数
        createNumber(num = 10000) {
            return Math.floor(Math.random() * num)
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-upload-file {
    position: absolute;
    top: -9999px;
    left: -9999px;
}
ul {
    margin: 10px 0;
}

li {
    width: 400px;
    justify-content: space-between;
    padding: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-top: 10px;
    &:nth-of-type(1) {
        margin-top: 0px;
    }
    img {
        height: 80px;
        width: 80px;
    }
    &:hover {
        background-color: #f5f5f5;
    }
}

.list-enter-active,
.list-leave-active {
    transition: all 1s;
}
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translatex(80px);
}
</style>
