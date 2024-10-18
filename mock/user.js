const Mock = require('mockjs')

// Mock.mock('/api/user/login', 'post', (req) => {
//     let { name, password } = JSON.parse(req.body)
//     return {
//         code: 200,
//         msg: '获取用户信息成功',
//         data: {
//             body: {
//                 name,
//                 password,
//             },
//             // 注意这儿必须使用Mock.mock包裹
//             userdata: Mock.mock({
//                 id: '@increment',
//                 name: '@cname',
//                 password: '@password',
//                 'sex|0-1': 0,
//                 number: '@integer(1,100)',
//                 url: '@url',
//                 date: '@date',
//                 datetime: '@datetime',
//                 time: '@datetime(hh:mm:ss)',
//                 address: '@province @city @county',
//                 phone: '13520073575',
//             }),
//         },
//     }
// })

export default [
    // 模拟修改用户信息 模糊匹配
    {
        url: '/api/user/login.*',
        type: 'post',
        fun: (req) => {
            // let { name, password } = JSON.parse(req.body)
            return {
                code: 200,
                msg: '修改用户信息成功',
                data: {
                    // 注意这儿必须使用Mock.mock包裹
                    userdata: Mock.mock({
                        id: '@increment',
                        name: '@cname',
                        password: '@password',
                        'sex|0-1': 0,
                        number: '@integer(1,100)',
                        url: '@url',
                        date: '@date',
                        datetime: '@datetime',
                        time: '@datetime(hh:mm:ss)',
                        address: '@province @city @county',
                        phone: '13520073575',
                    }),
                },
            }
        },
    },
    // 模拟登录 精准匹配
    {
        url: '/api/user/login',
        type: 'post',
        fun: (req) => {
            let { name, password } = JSON.parse(req.body)
            return {
                code: 200,
                msg: '获取用户信息成功',
                data: {
                    body: {
                        name,
                        password,
                    },
                    // 注意这儿必须使用Mock.mock包裹
                    userdata: Mock.mock({
                        id: '@increment',
                        name: '@cname',
                        password: '@password',
                        'sex|0-1': 0,
                        number: '@integer(1,100)',
                        url: '@url',
                        date: '@date',
                        datetime: '@datetime',
                        time: '@datetime(hh:mm:ss)',
                        address: '@province @city @county',
                        phone: '13520073575',
                    }),
                },
            }
        },
    },
]
