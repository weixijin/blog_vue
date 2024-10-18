<template>
    <div>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_chat_list"
            :customize="false"
            :othData="{
                type: 2,
            }"
        >
            <template slot="content" slot-scope="{ record }">
                <chatItem :row="record" isAdminPage></chatItem>
            </template>
        </TrainPage>
    </div>
</template>

<script>
import httpApi from '@/api/blog/admin.js'
import { baseURL } from '@/plugins/config.js'
import chatItem from '@/views/blog/im/chatItem.vue'
export default {
    name: 'netdistList',
    components: {
        chatItem,
    },
    data() {
        return {
            roomOptions: [],
            searchConfig: [
                {
                    label: '聊天室',
                    type: 'select',
                    modelName: 'room_id',
                    options: async () => {
                        const res = await this.$apis.get_im_rooms({
                            cache: true,
                        })
                        return res.data.data.map((item) => {
                            return {
                                label: item.im_name,
                                value: item._id,
                            }
                        })
                    },
                },
                {
                    label: '成员',
                    type: 'select',
                    modelName: 'author_id',
                    options: async () => {
                        const res = await this.$apis.get_im_rooms({
                            cache: true,
                        })
                        this.roomOptions = res.data.data.map((item) => {
                            return {
                                label: item.im_name,
                                value: item._id,
                            }
                        })

                        return this.roomOptions
                    },
                },
                {
                    label: '聊天内容',
                    type: 'input',
                    modelName: 'content',
                },
                {
                    label: '时间范围',
                    type: 'datetimerange',
                    modelName: ['start_time', 'end_time'],
                    isArray: true,
                    valueType: 'timestamp',
                    pickerOptions: this.getPickerOptions(),
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { im_room_id, author_id,created_time } = item
                        return {
                            ...item,
                            _username: author_id?.username,
                            _room_name: this.getRoomName(im_room_id),
                            _created_time:this.klDateFormat(created_time)
                        }
                    })
                },
                columnObj: [
                    { label: '发布人', width: 200, props: '_username' },
                    { label: '聊天室', width: 200, props: '_room_name' },
                    { label: '发布时间', props: '_created_time',width:200 },
                    { label: '内容', props: 'content', slot: 'content' },
                
                    {
                        label: '操作',
                        slot: 'projectDetail',
                  
                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children: [
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.delSys(row._id)
                                },
                            },
                        ],
                    },
                ],
            },
        }
    },
    methods: {
        getRoomName(_id) {
            return this.roomOptions.find((item) => item.value == _id)?.label || ''
        },
        async delSys(_id) {
            const res = await this.$confirm('确认删除该记录吗？').catch(() => false)
            if (!res) return
            await this.$apis.del_im_sys({ _id })
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
        download(row) {
            let { netdisk_url } = row
            window.open(baseURL + netdisk_url)
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
                })
                .catch(() => {})
                .finally(() => {
                    this.initTable()
                })
        },
    },
}
</script>
