<template>
    <div class="demo">
        <p class="upload-tip">支持上传{{ allTypes.join('、') }}的资料，100M以内</p>
        <div class="">
            <el-upload
                class="upload-demo"
                drag
                :multiple="isMultiple"
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :on-change="UploadNetdist"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                </div>
            </el-upload>
        </div>
        <!-- 上传文件列表 -->
        <div class="kl-bar filelist-cover">
            <transition-group name="filelist" v-if="isShowPreFile">
                <div class="file-item-11" v-for="(item, index) in fileOptions" :key="item.id">
                    <div class="file-item-1">
                        <p class="ell-1">
                            {{ index + 1 }}. &nbsp;

                            {{ item.file_name }}
                        </p>
                        <i class="el-icon-error" @click="delFile(item)"></i>
                    </div>
                    <kl-progress v-model="item.progress" />
                </div>
            </transition-group>
        </div>

        <!-- 图片预览列表 -->
        <transition-group name="filelist" class="flex-imgs" v-if="isShowPreImg">
            <div class="file-item" v-for="item in fileOptions" :key="item.id">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="item.preUrl"
                    :preview-src-list="[item.preUrl]"
                ></el-image>
                <i class="el-icon-error" @click="delFile(item)"></i>
            </div>
        </transition-group>
    </div>
</template>

<script>
import klProgress from '@/mixins/components/kl-progress/upload-progress.vue'
import httpApi from '@/api/blog/admin.js'

export default {
    components: {
        klProgress,
    },
    props: {
        isShowPreFile: {
            type: Boolean,
            default: false,
        },
        isShowPreImg: {
            type: Boolean,
            default: false,
        },
        isMultiple: {
            type: Boolean,
            default: true,
        },
        allTypes: {
            type: Array,
            default: () => [
                'jpg',
                'png',
                'jpeg',
                'webp',
                'html',
                'js',
                'zip',
                'rar',
                'css',
                'docx',
                'pdf',
                'xlsx',
                'pptx',
                'txt',
                'doc',
                'xls',
                'ppt',
            ],
        },
    },
    data() {
        return {
            fileOptions: [],
            aliyunOssToken: null,
            uploadPercent: 0,
            showProgress: false,
            showProgress: false,
            uploadPercent: 0,
        }
    },

    methods: {
        init() {
            this.fileOptions = []
        },
        delFile({ id }) {
            this.$confirm('确定删除吗?')
                .then(() => {
                    this.fileOptions = this.fileOptions.filter((item) => item.id !== id)
                })
                .catch()
        },
        async UploadNetdist(file) {
            // 判断文件大小是否满足
            let msg = this.isFileSize(file.raw, 50)
            if (msg) {
                this.$message.error(msg)
                return
            }

            // 判断文件类型是否满足要求
            msg = this.isFileType(file.raw, this.allTypes)
            if (msg) {
                this.$message.error(msg)
                return
            }

            const file_name = file.raw.name
            // 这个文件是否已经存在
            let index = this.fileOptions.findIndex((item) => item.file_name === file_name)

            if (index > -1) {
                this.$message.error(`${file_name}文件已存在，请重新选择`)
                return
            }

            let formData = new FormData()
            formData.append('file', file.raw)
            formData.append('file_size', file.raw.size)
            let loading = this.$klLoading()
            httpApi
                .postNetdist(formData)
                .then((res) => {
                    this.$message.success(`${file_name}上传成功`)
                    this.fileOptions.push({
                        id: this.createId(),
                        file_name: file_name,
                        file_url: '',
                        progress: 100,
                    })
                    this.$emit('success', {
                        row: this.fileOptions,
                    })
                })
                .catch()
                .finally(() => {
                    loading.close()
                })
        },

        handleUpload() {
            this.$refs.putRef.$children[0].handleClick()
        },
    },
}
</script>

<style lang="scss" scoped>
.upload-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.kl-upload-file {
    opacity: 0;
    position: absolute;
}
.upload-tip {
    font-size: 14px;
    font-weight: 400;
    color: #909399;
    line-height: 24px;
    margin-bottom: 8px;
    color: #ff7875;
}
.filelist-enter-active,
.filelist-leave-active {
    transition: all 0.5s;
    opacity: 1;
}
.filelist-enter,
.filelist-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
.flex-imgs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.file-item {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    margin-top: 15px;
    margin-right: 20px;
    &:nth-of-type(4n) {
        margin-right: 0;
    }
    &:hover {
        i {
            display: block;
        }
    }
    i {
        // display: none;
        font-size: 18px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
        color: #fff;
        &:hover {
            transform: scale(1.2);
        }
    }
}
.filelist-cover {
    max-height: 300px;
    overflow-y: auto;
}
.file-item-11 {
    padding: 10px;

    &:hover {
        background-color: #f1f1f1;
        color: #409eff;
    }
}
.file-item-1 {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:nth-last-of-type(1) {
        margin-bottom: 0;
    }
    i {
        &:hover {
            color: #ff7875;
            transform: scale(1.2);
        }
    }
    span {
        flex: 1;
    }
}
::v-deep {
    .el-dialog__wrapper {
        text-align: center;
        white-space: nowrap;
        overflow: auto;
        &:after {
            content: '';
            display: inline-block;
            vertical-align: middle;
            height: 100%;
        }
        .el-dialog {
            margin: 30px auto !important;
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            white-space: normal;
        }
    }
}
</style>
