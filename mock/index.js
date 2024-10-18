import Mock from 'mockjs'
import user from './user.js'
import admin from './admin.js'

const allMockApi = [...user, ...admin]
// 配置请求延时 单位：毫秒
Mock.setup({
    timeout: 200,
})

allMockApi.forEach((item) => {
    Mock.mock(new RegExp(item.url), item.type ? item.type : 'get', item.fun)
})
