// 列数据可选类型
let types = ['string', 'time', 'img']

// 配置项
let configs = [
    {
        title: '表格标题',
        create_time: '2001254154', // 建立表格的时间
        updata_time: '2001254154', // 修改表格的时间
        user_id: '', // 创建表格的人的id
        // 配置项
        config: [
            {
                id: '', // id
                key: '', //  表头标题
                type: '', //  列数据类型
            },
        ],
        // 数据项 用于记录表格数据和回显
        data: [
            {
                id: '',
                value: '',
            },
        ],
    },
]

export { configs }
