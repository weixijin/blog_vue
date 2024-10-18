import { navList } from '@/router/config'
import { isObject } from '@/mixins/tool/tool.js'

export default {
    isAdmin({ userdata }) {
        return isObject(userdata) && userdata.role === 'admin'
    },

    getterNavId({ url_path }) {
        let nav = navList.find((item) => item.href === url_path)
        if (nav) {
            return nav.id
        }
    },

    isLogin({ userdata }) {
        if (Object.keys(userdata).length && userdata._id) {
            return true
        }

        // 如果已经在登录页放弃校验
        let arr = ['login', 'register', 'findPassword']
        let url = location.search
        let index = arr.findIndex((item) => {
            if (url.includes(item)) {
                return true
            }
        })
        if (index !== -1) {
            return true
        }
        return false
    },

    // 工作任务的项目类型
    noteWprkTypesOptions({ options }) {
        return options?.noteWprkTypesOptions || []
    },

    // bug分类
    bugTypeOptions({ options }) {
        return options?.bugTypeOptions || []
    },
    errsTypeOptions({ options }) {
        return options?.errsTypeOptions || []
    },
    houUserList({ options }) {
        return options?.houUserList || []
    },
    ceUserList({ options }) {
        return options?.ceUserList || []
    },
    uiUserList({ options }) {
        return options?.uiUserList || []
    },

    jsmindTypes({ options }) {
        return options?.jsmindTypes || []
    },

    jsmindTypes1({ options }) {
        return options?.jsmindTypes1 || []
    },
    allTenants({ options }) {
        return options?.allTenants || []
    },
}
