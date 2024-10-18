<template>
    <div class="p-20 bg-F7F8FA h-100vh">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_net_dists"
            customize
        >
        </TrainPage>
        <!-- 分享弹窗 -->
        <ShareQrCode ref="ShareQrCodeRef" :ac_id="ac_id" />

        <!-- 新增编辑广告弹窗 -->
        <EditAcDialog ref="EditAcDialogRef" @init="init" />
    </div>
</template>

<script>
import httpApi from '@/api/blog/admin.js'
import { baseURL } from '@/plugins/config.js'
import ShareQrCode from '@/views/admin/netdist/list/components/shareQrCode'
import EditAcDialog from '@/views/admin/netdist/list/components/EditAcDialog'
export default {
    name: 'netdistList',
    components: {
        ShareQrCode,
        EditAcDialog,
    },
    data() {
        return {
            ac_id: '',
            searchConfig: [
                {
                    label: '文件状态',
                    type: 'select',
                    modelName: 'netdisk_status',
                    options: [
                        {
                            value: '0',
                            label: '使用',
                        },
                        {
                            value: '1',
                            label: '禁用',
                        },
                        {
                            value: '2',
                            label: '删除',
                        },
                    ],
                },
                {
                    label: '名称',
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
                        let { netdisk_create_time, netdisk_size } = item
                        return {
                            ...item,
                            _netdisk_create_time: this.klDateFormat(netdisk_create_time),
                            _netdisk_size: this.getSize(netdisk_size),
                        }
                    })
                },
                btns: {
                    children: [
                        {
                            label: '新增',
                            type: 'success',
                            clickFn: () => {
                                this.DialogEvent({
                                    type: 'add',
                                    ac_id: '',
                                })
                            },
                        },
                        {
                            label: '上传',
                            type: 'primary',
                            clickFn: () => {
                                this.DialogEvent({
                                    type: 'add',
                                    ac_id: '',
                                })
                            },
                        },
                        {
                            label: '在线文件压缩',
                            type: 'info',
                            clickFn: () => {
                                this.goTo('https://www.wetools.com/js-compress', {
                                    target: '_blank',
                                })
                            },
                        },
                    ],
                },
                columnObj: [
                    {
                        label: '文件名称',
                        props: 'netdisk_name',
                        clickFn: (row) => {
                            this.goTo(baseURL + row.netdisk_url, {
                                target: '_blank',
                            })
                        },
                    },
                    { label: '文件大小', props: '_netdisk_size' },
                    { label: '创建时间', props: '_netdisk_create_time' },
                    {
                        label: '操作',
                        slot: 'projectDetail',

                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children: [
                            {
                                label: '复制链接',
                                type: 'primary',
                                clickFn: (row) => {
                                    this.copyLink(row)
                                },
                            },
                            {
                                label: '下载',
                                type: 'primary',
                                clickFn: (row) => {
                                    this.download1(row)
                                },
                            },

                            {
                                label: '禁用',
                                type: 'warning',
                                clickFn: (row) => {
                                    this.putNetdist(row, 1)
                                },
                            },
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.putNetdist(row, 2)
                                },
                            },
                        ],
                    },
                ],
            },
        }
    },
    methods: {
        init() {
            this.initTable()
        },
        getSize(size) {
            if (!+size) {
                return '未知'
            }
            if (size < 1024) {
                return size + 'B'
            }

            if (size < 1024 * 1024) {
                return (size / 1024).toFixed(2) + 'KB'
            }

            return (size / 1024 / 1024).toFixed(2) + 'MB'
        },
        async DialogEvent({ type, ac_id }) {
            if (!this.$refs.EditAcDialogRef) return
            if (type === 'add') {
                // 新增
                this.ac_id = ''
                this.$refs.EditAcDialogRef.title = '资源上传'
                this.$refs.EditAcDialogRef.dialogVisible = true
            }
        },
        download1({ netdisk_url } = {}) {
            this.download(baseURL + netdisk_url)
        },
        copyLink(row) {
            let { netdisk_url } = row
            this.copy({
                data: baseURL + netdisk_url,
                success: () => {
                    this.$message.success('复制成功')
                },
                fail: () => {
                    this.$message.error('复制失败')
                },
            })
        },
        async putNetdist({ _id }, netdisk_status = '1') {
            if (!_id) return

            const res = await this.$confirm(
                +netdisk_status === 1 ? '确定禁用吗？' : '确定删除吗?',
            ).catch(() => false)
            if (!res) return
            httpApi
                .putNetdist({ _id, netdisk_status })
                .then(() => {
                    this.$message.success('操作成功')
                    this.init()
                })
                .catch((err) => {
                    this.Toast(err)
                })
        },
    },
}
</script>
