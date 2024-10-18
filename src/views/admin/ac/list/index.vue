<template>
    <div class="p-20">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_ac_list"
            customize
        >
            <template slot="author_name" slot-scope="{ record }">
                {{ record?.author_id?.username || '---' }}
            </template>
        </TrainPage>

        <!-- 新增编辑广告弹窗 -->
        <EditAcDialog ref="EditAcDialogRef" :ac_id="ac_id" @updataList="updataList" />

        <!-- 分享弹窗 -->
        <ShareQrCode ref="ShareQrCodeRef" :ac_id="ac_id" />
    </div>
</template>

<script>
import httpApi from '@/api/blog/admin.js'
import { baseURL } from '@/plugins/config.js'
import ShareQrCode from '@/views/admin/ac/list/components/shareQrCode'
import EditAcDialog from '@/views/admin/ac/list/components/EditAcDialog'
export default {
    components: {
        ShareQrCode,
        EditAcDialog,
    },
    data() {
        return {
            searchConfig: [
                {
                    label: '页面名称',
                    type: 'input',
                    modelName: 'content',
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { ac_create_time, ac_updata_time } = item
                        return {
                            ...item,
                            _ac_create_time: this.klDateFormat(ac_create_time),
                            _ac_updata_time: this.klDateFormat(ac_updata_time),
                        }
                    })
                },
                btns: {
                    children: [
                        {
                            label: '新增',
                            type: 'primary',
                            clickFn: (row) => {
                                this.DialogEvent({
                                    type: 'add',
                                })
                            },
                        },
                    ],
                },
                columnObj: [
                    {
                        label: '页面名称',
                        props: 'ac_name',
                        clickFn: (row) => {
                            this.goTo(baseURL + 'ac/' + row.ac_url, {
                                target: '_blank',
                            })
                        },
                    },
                    { label: '更新日期', props: '_ac_updata_time' },
                    { label: '创建日期', props: '_ac_create_time' },
                    {
                        label: '操作',
                        slot: 'projectDetail',
                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children: [
                            {
                                label: '生成二维码',
                                type: 'primary',
                                clickFn: (row) => {
                                    this.showCode(row)
                                },
                            },
                            {
                                label: '编辑',
                                type: 'success',
                                clickFn: (row) => {
                                    this.DialogEvent({
                                        type: 'edit',
                                        ac_id: row._id,
                                    })
                                },
                            },
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.delAcPage(row)
                                },
                            },
                            {
                                label: '复制链接',
                                type: 'info',
                                clickFn: (row) => {
                                    this.copyLink(row)
                                },
                            },
                        ],
                    },
                ],
            },

            ac_id: '',
            list: [],
        }
    },
    methods: {
        getFullPath(url) {
            return baseURL + 'ac/' + url
        },
        showCode({ _id }) {
            this.ac_id = _id
            if (!this.$refs.ShareQrCodeRef) return
            this.$refs.ShareQrCodeRef.dialogVisible = true
            this.$refs.ShareQrCodeRef.init()
        },
        copyLink(row) {
            let that = this
            let { ac_url } = row

            this.copy({
                data: this.getFullPath(ac_url),
                success: () => {
                    that.$message.success('复制成功')
                },
                fail: () => {
                    that.$message.error('复制失败')
                },
            })
        },
        delAcPage({ _id }) {
            if (!_id) return

            this.$confirm('确定删除吗?')
                .then(() => {
                    httpApi
                        .del_ac_page({ ac_id: _id })
                        .then(() => {
                            this.$message.success('删除成功')
                            this.$parent.init()
                        })
                        .catch()
                })
                .catch(() => {
                    this.$message.info('取消成功')
                })
        },
        updataList() {
            this.$refs.TrainPageRef.getAddData()
        },
        async DialogEvent({ type, ac_id }) {
            if (!this.$refs.EditAcDialogRef) return
            if (type === 'add') {
                // 新增
                this.ac_id = ''
                this.$refs.EditAcDialogRef.title = '新增页面'
                this.$refs.EditAcDialogRef.dialogVisible = true
            }

            if (type == 'edit') {
                // 编辑
                this.ac_id = ac_id
                this.$refs.EditAcDialogRef.title = '编辑页面'
                this.$refs.EditAcDialogRef.dialogVisible = true
                await this.$nextTick()
                this.$refs.EditAcDialogRef.init()
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
