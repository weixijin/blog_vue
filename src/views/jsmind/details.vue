<template>
    <!-- 普通菜单 -->
    <div class="jsmind_layout">
        <!-- 左侧浮窗信息 -->
        <div class="pf pf-left f-14 c-777 flex-ceneter-wrap">
            <div>节点数：{{ mindLength }}</div>
        </div>
        <!-- 右侧菜单 -->
        <i
            v-if="isCanEdit"
            slot="reference"
            class="el-icon-s-fold f-24 pos-menu pf cu"
            @click="openMenu"
        ></i>
        <div class="jsmind_toolbar h-0 op-0" v-if="showBar">
            <el-button @click="screen_shot" size="medium">下载导图</el-button>
            <el-button @click="get_nodearray_data" size="medium">获取数据</el-button>
            <el-button @click="addNode" size="medium">新增节点</el-button>
            <el-button @click="addBrotherNode" size="medium">新增兄弟节点</el-button>
            <el-button @click="editNode" size="medium">编辑节点</el-button>
            <el-button @click="removeNode" size="medium">删除节点</el-button>
            <el-button @click="zoomIn" size="medium" :disabled="isZoomIn">放大</el-button>
            <el-button @click="zoomOut" size="medium" :disabled="isZoomOut" class="pad"
                >缩小</el-button
            >
        </div>

        <!-- 思维导图容器 -->
        <div id="jsmind_container" class="no-bar-box" ref="container"></div>

        <!-- 编辑弹窗 -->
        <editDialog
            ref="editDialogRef"
            v-model="dialogVisible"
            :_id="_id"
            :formdata.sync="formdata"
            :isAuthor="isAuthor"
            @rowDataChange="rowDataChange"
            @putMind="putMind"
        ></editDialog>
    </div>
</template>

<script>
import editDialog from './compponents/editDialog.vue'

const plugins = [
    {
        isAppendHead: true,
        css: 'http://139.9.210.43:5000/netdist/jsmind-1720311296404~1~.css',
    },
    {
        js: 'http://139.9.210.43:5000/netdist/jsmind-1720311306048~1~.js',
    },
    {
        js: 'http://139.9.210.43:5000/netdist/jsminddraggable-node-1720311302235~1~.js',
    },
]

const defaultTitle = '在线脑图'
export default {
    components: {
        editDialog,
    },
    data() {
        return {
            _id: '',
            mind: {},
            jm: null,
            isZoomIn: false,
            isZoomOut: false,
            level: 0,
            dialogVisible: false,
            nodeOption: {
                content: '',
                bgColor: '',
                fontColor: '',
                fontSize: '',
                fontWeight: '',
                fontStyle: '',
            },

            formdata: {
                _id: '',
                author_id: '',
                mind_title: defaultTitle,
                mind_str: '',
                // 分类
                jsmind_type: '2',
                watch_users: [],
                edit_users: [],
            },
            rules: {
                mind_title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                jsmind_type: [{ required: true, message: '请选择分类', trigger: 'change' }],
            },

            // 基本信息
            mind: {
                /* 元数据，定义思维导图的名称、作者、版本等信息 */
                meta: {
                    name: defaultTitle,
                    author: '',
                    version: '0.1',
                },
                /* 数据格式声明 */
                format: 'node_tree',
                /* 数据内容 */
                data: {
                    id: 'root',
                    topic: defaultTitle,
                },
                mode: 'side', // 显示模式，子节点只分布在根节点右侧
            },
        }
    },
    computed: {
        ...Vuex.mapState(['userdata', 'keyboardEventKay']),
        ...Vuex.mapGetters(['jsmindTypes', 'jsmindTypes1']),
        isAuthor() {
            return this.formdata.author_id === this.userdata._id
        },
        isEdit() {
            return this.formdata.edit_users.includes(this.userdata._id)
        },
        isWatch() {
            return this.formdata.watch_users.includes(this.userdata._id)
        },
        isCanEdit() {
            return !this.formdata._id || this.isAuthor || this.isEdit
        },
        // 节点数量
        mindLength() {
            if (this.jm && this.jm.get_data) {
                const mindData = this.jm.get_data('node_array')
                return mindData?.data?.length || 0
            }
            return 0
        },
        query() {
            return this.$route.query || {}
        },
        shareId() {
            return this.query.shareId || ''
        },
    },
    watch: {
        keyboardEventKay(val) {
            switch (val) {
                case 'ctrl_z':
                    break
                case 'ctrl_s':
                    this.save()
                    break
                case 'tab':
                    this.addNode()
                    break
            }
        },
    },
    async mounted() {
        this._id = this.query?._id || ''
        const { shareId } = this
        if (shareId) {
            // 激活权限
            await this.$apis.put_mind_limit({
                _id: shareId,
            })
            this.updateUrl('shareId', null)
        }

        this.getIndexDBJS([
            {
                isAppendHead: true,
                css: 'http://139.9.210.43:5000/netdist/jsmind-1720311296404~1~.css',
            },
            {
                js: 'http://139.9.210.43:5000/netdist/jsmind-1720311306048~1~.js',
            },
        ])
            .then(() => {
                // 同步基本的信息
                let { username } = this.userdata
                this.mind.meta.author = username
                // 获取详情
                this.getDetails()

                this.winSleep(() => {
                    this.getIndexDBJS([
                        {
                            js: 'http://139.9.210.43:5000/netdist/jsminddraggable-node-1720311302235~1~.js',
                        },
                    ])
                        .then(() => {
                            this.mouseWheel()
                        })
                        .catch((err) => {
                            this.Toast(err)
                        })
                })
            })
            .catch((err) => {
               this.Toast(err)
            })
    },
    beforeDestroy() {
        document.removeEventListener('domMouseScroll', this.scrollFunc, false)
    },
    methods: {
        putMind(row) {
            this.mind.data.children.push(row.childInfo)
            this.initChat()
            // 关闭弹窗
            this.dialogVisible = false
        },
        rowDataChange(row) {
            console.log(Object.assign(this.formdata, row))
        },
        delUsers(row) {
            console.log(row)
        },

        openMenu() {
            this.dialogVisible = true
        },
        // 保存
        save() {
            const { mindLength, isCanEdit } = this
            if (!isCanEdit) return
            if (!this.formdata.mind_title) {
                this.$message.error('请输入mind名称')
                return
            }
            const mindData = this.jm.get_data('node_tree')
            const mindStr = jsMind.util.json.json2string(mindData)

            const params = {
                ...this.formdata,
                mindLength,
            }
            // 获取参数
            params.mind_str = mindStr

            // 处理参数
            const { watch_users, edit_users } = params
            if (this.isArrayLength(watch_users)) {
                params.watch_users = watch_users.map((item) => item._id)
            }
            if (this.isArrayLength(edit_users)) {
                params.edit_users = edit_users.map((item) => item._id)
            }

            if (!params._id) {
                delete params._id
            }

            this.$apis
                .post_mind(params)
                .then((res) => {
                    this.$message.success(res?.msg || '保存成功')
                    let { _id } = res?.data?.data || {}
                    if (!this._id && _id) {
                        this.updateUrl('_id', _id)
                        this.formdata._id = _id
                        this._id = _id
                    }
                })
                .catch(() => {})
        },
        // 新增节点
        addNode() {
            let selectedNode = this.jm.get_selected_node()
            if (!selectedNode) {
                this.$message({ type: 'warning', message: '请先选择节点!' })
                return
            }
            let nodeid = jsMind.util.uuid.newid()
            let topic = 'new node'
            let newNode = this.jm.add_node(selectedNode, nodeid, topic)
            if (newNode) {
                this.jm.select_node(nodeid)
                this.jm.begin_edit(nodeid)
            }
        },
        getDetails() {
            let { _id } = this
            if (!_id) {
                this.initChat()
                return
            }
            this.$apis
                .get_mind({
                    _id,
                })
                .then((res) => {
                    if (res.data && res.data.data) {
                        let { mind_str, jsmind_type } = res.data.data
                        Object.assign(this.mind, mind_str)
                        Object.assign(this.formdata, res.data.data)

                        if (!jsmind_type) {
                            this.formdata.jsmind_type = '2'
                        }
                    }
                    this.initChat()
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        beforeUpload(file) {
            // 上传文件之前钩子
            if (file) {
                jsMind.util.file.read(file, (jsmindData) => {
                    const mind = jsMind.util.json.string2json(jsmindData)
                    if (mind) {
                        this.jm.show(mind)
                        this.$message({ type: 'success', message: '打开成功' })
                    } else {
                        this.prompt_info('不能打开mindmap文件')
                    }
                })
            } else {
                this.prompt_info('请先选择文件')
                return false
            }
        },
        async initChat() {
            if (this.jm) {
                this.jm.show(this.mind)
                return
            }
            const options = {
                container: 'jsmind_container', // 必选，容器ID
                editable: true, // 可选，是否启用编辑
                theme: 'clouds', // 可选，主题
                view: {
                    line_width: 1, // 思维导图线条的粗细
                    line_color: '#999', // 思维导图线条的颜色
                },
                shortcut: {
                    enable: true, // 禁用快捷键
                },
                layout: {
                    hspace: 40, // 节点之间的水平间距
                    vspace: 20, // 节点之间的垂直间距
                    pspace: 10, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
                },
                mode: 'side', // 显示模式，子节点只分布在根节点右侧
            }
            this.jm = new jsMind(options)

            this.jm.show(this.mind)

            // 改变窗口大小重置画布
            window.onresize = () => {
                this.jm.resize()
            }
            await this.sleep()
            // 当节点被选中时触发
            this.jm.add_event_listener(async (type, node) => {
                // console.log(type,node)
                if (+type === 3) {
                    // const mindData = this.jm.get_data('node_tree')
                    // const mindStr = jsMind.util.json.json2string(mindData)
                    // let old = await localforage.getItem(`jsmind_${this._id}`)|| []
                }

                if (type == 4) {
                    // 修改背景色
                    this.jm.set_node_color(node.node, '#f0f0f0', '#000000')
                }
            })
        },

        screen_shot() {
            this.jm.screenshot.shootDownload()
        },
        expand_all() {
            this.jm.expand_all()
        },
        collapse_all() {
            this.jm.collapse_all()
        },
        expand_to_level(num) {
            switch (num) {
                case -1:
                    this.collapse_all()
                    break
                case 0:
                    this.expand_all()
                    break
                default:
                    this.jm.expand_to_depth(num)
                    break
            }
        },
        zoomIn() {
            if (this.jm.view.zoomIn()) {
                this.isZoomOut = false
            } else {
                this.isZoomIn = true
            }
        },
        zoomOut() {
            if (this.jm.view.zoomOut()) {
                this.isZoomIn = false
            } else {
                this.isZoomOut = true
            }
        },
        prompt_info(msg) {
            this.$message({ type: 'warning', message: msg })
        },
        get_nodearray_data() {
            const mindData = this.jm.get_data('node_array')
            const mindString = jsMind.util.json.json2string(mindData)
            this.$message({ type: 'info', message: mindString })
        },
        set_theme(themeName) {
            this.jm.set_theme(themeName)
        },
        scrollFunc(e) {
            return
            e = e || window.event
            if (e.wheelDelta) {
                if (e.wheelDelta > 0) {
                    this.zoomIn()
                } else {
                    this.zoomOut()
                }
            } else if (e.detail) {
                if (e.detail > 0) {
                    this.zoomIn()
                } else {
                    this.zoomOut()
                }
            }
            this.jm.resize()
        },
        // 鼠标滚轮放大缩小
        mouseWheel() {
            if (document.addEventListener) {
                document.addEventListener('domMouseScroll', this.scrollFunc, false)
            }
            this.$refs.container.onmousewheel = this.scrollFunc
        },

        // 新增兄弟节点
        addBrotherNode() {
            let selectedNode = this.jm.get_selected_node()
            if (!selectedNode) {
                this.$message({ type: 'warning', message: '请先选择一个节点!' })
                return
            } else if (selectedNode.isroot) {
                this.$message({ type: 'warning', message: '不能在根节点添加，请重新选择节点!' })
                return
            }
            let nodeid = jsMind.util.uuid.newid()
            let topic = 'new Node'
            let newNode = this.jm.insert_node_after(selectedNode, nodeid, topic)
            if (newNode) {
                this.jm.select_node(nodeid)
                this.jm.begin_edit(nodeid)
            }
        },
        // 获取选中标签的 ID
        get_selected_nodeid() {
            let selectedNode = this.jm.get_selected_node()
            if (selectedNode) {
                return selectedNode.id
            } else {
                return null
            }
        },
        // 删除节点
        removeNode() {
            let selectedId = this.get_selected_nodeid()
            if (!selectedId) {
                this.$message({
                    type: 'warning',
                    message: '请先选择一个节点!',
                })
                return
            }
            this.jm.remove_node(selectedId)
        },
        // 编辑节点
        editNode() {
            let selectedId = this.get_selected_nodeid()
            if (!selectedId) {
                this.$message({ type: 'warning', message: '请先选择一个节点!' })
                return
            }
            let nodeObj = this.jm.get_node(selectedId)
            this.nodeOption.content = nodeObj.topic
            this.nodeOption.bgColor = '#999'
            this.nodeOption.fontColor = nodeObj.data['foreground-color']
            this.nodeOption.fontSize = nodeObj.data['font-size']
            this.nodeOption.fontWeight = nodeObj.data['font-weight']
            this.nodeOption.fontStyle = nodeObj.data['font-style']
            this.dialogVisible = true
        },
        sureEditNode() {
            let selectedId = this.get_selected_nodeid()
            this.jm.update_node(selectedId, this.nodeOption.content)
            this.jm.set_node_font_style(
                selectedId,
                this.nodeOption.fontSize,
                this.nodeOption.fontWeight,
                this.nodeOption.fontStyle,
            )
            this.jm.set_node_color(selectedId, this.nodeOption.bgColor, this.nodeOption.fontColor)
            this.nodeOption = {
                content: '',
                bgColor: '',
                fontColor: '',
                fontSize: '',
                fontWeight: '',
                fontStyle: '',
            }
            this.dialogVisible = false
        },
    },
}
</script>

<style lang="scss" scoped>
.jsmind_layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    #jsmind_container {
        width: 100vw;
        height: 100vh;
    }

    /* 隐藏滚动条 */
    .jsmind-inner::-webkit-scrollbar {
        display: none;
    }
    .pad {
        margin-right: 10px;
    }
    .pad-left {
        margin-left: 10px;
    }

    .form-con {
        padding-top: 20px;
    }
    .ele-width {
        width: 96%;
    }
}

::v-deep .no-bar-box .jsmind-inner {
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
}

.pos-menu {
    right: 20px;
    top: 20px;
    z-index: 999;
}

.pf-left {
    left: 20px;
    top: 20px;
    z-index: 999;
}
</style>
