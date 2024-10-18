const Mock = require('mockjs')

export default [
    // admin post模拟
    {
        url: '/api/admin/login.*',
        fun: (req) => {
            // let { name, password } = JSON.parse(req.body)
            return {
                code: 200,
                msg: 'post-admin',
                data: {
                    // 注意这儿必须使用Mock.mock包裹
                    list: [
                        {
                            id: 0,
                            name: '123',
                        },
                    ],
                },
            }
        },
    },
]
