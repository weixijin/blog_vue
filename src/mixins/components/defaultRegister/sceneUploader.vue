<template>
    <div
        class="uploadSch-formItem"
        v-loading.fullscreen.lock="ossUploadLoading"
        :element-loading-text="loadingText"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.4)"
    >
        <slot name="head" :maxCount="maxCount"></slot>

        <el-upload
            class="scene-uploader"
            :class="readonly && 'disabled'"
            action=""
            multiple
            :accept="fileTypes"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :limit="maxCount"
            :disabled="readonly || ossUploadLoading"
            :auto-upload="false"
            :on-progress="handleProgress"
            :on-change="handleChange"
        >
            <el-button slot="trigger" size="small" type="primary" :loading="ossUploadLoading">
                上传文件
            </el-button>
            <div slot="tip" class="el-upload__tip">
                只能上传{{ supportSuffixList.join('/') }}格式文件，且大小不超过{{ maxSize }}M
            </div>
        </el-upload>
        <el-progress
            v-if="progress && ossUploadLoading"
            :percentage="progressObj.percent || 0"
            :format="progressFormat"
        ></el-progress>
    </div>
</template>

<script>
const FullSupportSuffixList = [
    'pdf',
    'doc',
    'docx',
    'csv',
    'xls',
    'xlsx',
    'jpg',
    'jpeg',
    'png',
    'wav',
    'aiff',
    'mp3',
    'wma',
    'm4a',
    'mp4',
    'mov',
    'ogg',
]

const PreviewSuffixList = ['pdf', 'doc', 'docx', 'csv', 'xls', 'xlsx']
const ImageSuffixList = ['jpg', 'jpeg', 'png']
const VoiceSuffixList = ['wav', 'aiff', 'mp3', 'wma', 'm4a']
const VideoSuffixList = ['mp4', 'mov', 'ogg']

export default {
    name: 'SceneUploader',
    props: {
        readonly: {
            type: Boolean,
            default: false,
        },
        maxSize: {
            type: Number,
            default: 50,
        },
        value: {
            type: Array,
            default: () => [],
        },
        progress: {
            type: Boolean,
            default: () => false,
        },
        maxCount: {
            type: Number,
            default: 10,
        },
        nameLengthLimit: {
            type: Number,
            default: 50,
        },
        // 仅图片格式
        isImageOnly: {
            type: Boolean,
            default: false,
        },
        // 仅视频格式
        isVideoOnly: {
            type: Boolean,
            default: false,
        },
        isVoiceVideoOnly: {
            type: Boolean,
            default: false,
        },
        viewAll: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            timer: null,
            progressObj: {}, // 进度条对象
            previewImgVisible: false,
            previewVideoVisible: false,
            previewVoiceVisible: false,
            viewList: [],
            viewIndex: 0,
        }
    },
    computed: {
        ...Vuex.mapState('globalMod', ['ossUploadLoading', 'ossUploadPercentage']),
        supportSuffixList() {
            if (this.isImageOnly) return ImageSuffixList
            if (this.isVideoOnly) return VideoSuffixList
            if (this.isVoiceVideoOnly) return [...VoiceSuffixList, ...VideoSuffixList]
            return FullSupportSuffixList
        },
        fileTypes() {
            return this.supportSuffixList.map((s) => '.' + s).join(',')
        },
        fileList: {
            get() {
                return this.$props.value
            },
            set(val) {
                this.$emit('update:value', val)
                this.$emit('change', val)
            },
        },
        loadingText() {
            let { percent, name = '' } = this.ossUploadPercentage
            let str = name
            if (name.length > 10) str = `${name.substr(0, 10)}...`
            return `${str || '--'} 正在上传，进度：${percent || '--'}%，请稍后，请勿关闭此页面...`
        },
    },
    methods: {
        ...Vuex.mapMutations({
            SET_OSS_UPLOAD_LOADING: 'globalMod/SET_OSS_UPLOAD_LOADING',
        }),
        getSuffix(name) {
            return (name?.match(/\.([^.]*)$/)?.[1] || '').toLowerCase()
        },
        handleExceed() {
            this.$message.warning(`最多上传 ${this.maxCount} 份附件资料`)
        },
        // 进度条对象
        handleProgress(event, file) {
            this.progressObj = event
        },
        // 进度条格式
        progressFormat(percent = 0) {
            let { name = '' } = this.progressObj
            let str = `${name}${name ? ' ' : ''}${percent}%`
            if (name.length > 20) str = `${name.substr(0, 20)}... ${percent}%`
            return str
        },
        // 选择file
        handleChange(file, fileList) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                if (!this.timer) return
                this.httpRequest(fileList)
            }, 200)
        },
        hanldeCheckFileError(fileList, message) {
            this.$message.warning(message)
            // 将未上传成功的文件过滤掉
            let newArr = fileList.filter((v) => v.status === 'success')
            this.fileList = [...newArr]
        },
        // 检查文件大小和格式是否符合要求
        checkFiles(fileList) {
            const { maxSize } = this.$props
            for (let i = 0; i < fileList.length; i++) {
                if (this.nameLengthLimit > 0 && fileList[i].name.length > this.nameLengthLimit) {
                    this.hanldeCheckFileError(fileList, '文件名称超过50个字符，请修改后重新上传')
                    return false
                }

                if (maxSize) {
                    const { size } = fileList[i]
                    if (size > maxSize * 1024 * 1024) {
                        this.hanldeCheckFileError(
                            fileList,
                            `不能上传大于${maxSize}M的文件，请重新选择！`,
                        )
                        return false
                    }
                }

                const suffix = this.getSuffix(fileList[i].name)
                const isSupport = this.supportSuffixList.includes(suffix)
                if (!isSupport) {
                    this.hanldeCheckFileError(
                        fileList,
                        `包含不支持上传的文件，现只支持 ${this.supportSuffixList.join(
                            ',',
                        )} 等格式!`,
                    )
                    return false
                }
            }
            return true
        },
        ossUploadFn() {},
        // 上传文件
        async httpRequest(fileList) {
            if (this.checkFiles(fileList)) {
                try {
                    this.SET_OSS_UPLOAD_LOADING(true)
                    for await (let item of fileList) {
                        const { name, raw, status } = item
                        if (status === 'ready') {
                            // 由于数组的push操作不重新触发计算属性的setter，因此现在修改为按以下方式进行回调操作
                            const { url } = await ossUploadFn(raw, this.$refs.uploadRef)
                            this.fileList = this.fileList.concat({ name, url })
                            this.$nextTick(() => {
                                this.$emit('getFileList', this.fileList)
                            })
                        }
                    }
                } finally {
                    this.SET_OSS_UPLOAD_LOADING(false)
                }
            }
        },
        handlePreview(item) {
            const suffix = this.getSuffix(item.name)

            if (ImageSuffixList.includes(suffix)) {
                if (this.viewAll) {
                    this.viewList = this.fileList
                        .filter((_item) => {
                            const _suffix = this.getSuffix(_item.name)
                            return ImageSuffixList.includes(_suffix)
                        })
                        .map((_item) => _item.url)
                    this.viewIndex = this.viewList.findIndex((_item) => {
                        return item.url === _item
                    })
                } else {
                    this.viewList = [item.url]
                }
                this.previewImgVisible = true
            } else if (VideoSuffixList.includes(suffix)) {
                if (this.viewAll) {
                    this.viewList = this.fileList.filter((_item) => {
                        const _suffix = this.getSuffix(_item.name)
                        return VideoSuffixList.includes(_suffix)
                    })
                    this.viewIndex = this.viewList.findIndex((_item) => {
                        return item.url === _item.url
                    })
                } else {
                    this.viewList = [item]
                }
                this.previewVideoVisible = true
            } else if (VoiceSuffixList.includes(suffix)) {
                if (this.viewAll) {
                    this.viewList = this.fileList.filter((_item) => {
                        const _suffix = this.getSuffix(_item.name)
                        return VoiceSuffixList.includes(_suffix)
                    })
                    this.viewIndex = this.viewList.findIndex((_item) => {
                        return item.url === _item.url
                    })
                } else {
                    this.viewList = [item]
                }
                this.previewVoiceVisible = true
            } else if (PreviewSuffixList.includes(suffix)) {
                window.open(
                    `${
                        process.env.VUE_APP_SERVER_ADDRESS_FILE_PREVIEW
                    }/common/file/previewByUrl?src=${encodeURIComponent(item.url)}`,
                )
            } else {
                this.downFile(item.url, item.name)
            }
            console.log(this.viewIndex)
        },
        handleRemove(file, fileList) {
            this.fileList = fileList
            this.$emit('getFileList', fileList)
        },
        downFile(fileUrl, fileName) {
            let fileType = fileUrl.split('.').pop().toLocaleLowerCase()
            fileName = `${fileName || '附件'}.${fileType}`
            if (this.getFileName) {
                fileName = `${this.getFileName()}-${fileName}`
            }

            const x = new window.XMLHttpRequest()
            x.open('GET', fileUrl, true)
            x.responseType = 'blob'
            x.onload = () => {
                const url = window.URL.createObjectURL(x.response)
                const a = document.createElement('a')
                a.href = url
                a.download = fileName
                a.click()
            }
            x.send()
        },
        closeImgViewer() {
            this.previewImgVisible = false
        },
        closeVideoViewer() {
            this.previewVideoVisible = false
        },
        closeVoiceViewer() {
            this.previewVoiceVisible = false
        },
    },
}
</script>

<style lang="scss" scoped>
.element-loading {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: saturate(180%) blur(20px);
}
.img {
    display: block;
    width: 100%;
    height: auto;
}

::v-deep {
    .scene-uploader {
        width: max-content;
        max-width: 100%;

        .el-upload-list__item-name {
            max-width: 100%;
        }

        &.disabled {
            .el-upload {
                display: none;

                + .el-upload__tip {
                    display: none;
                }
            }
        }

        > .el-upload__tip {
            text-transform: uppercase;
        }
    }
}
</style>
