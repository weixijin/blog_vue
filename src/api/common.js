// 这个页面api都会绑定到全局变量$api上
import http from '@/api/http'
import { getType,Toast } from '@/mixins/tool/tool.js'

// 直接写在这就可以了，全局调用 this.$apis.get_minds,必须使用下划线连接get_name
// 这儿目前存在问题，无法支持 params参数的传入
const arr = [
    'jsmind/get_minds',
    'jsmind/get_mind',
    'jsmind/post_mind',
    'jsmind/del_mind',
    'jsmind/put_mind_limit',
    'admin/del_im_file',
    'admin/get_authors',
    'admin/get_note_bug_apis',
    'common/get_errs',
    'blog/get_notes',
    'admin/get_plugins',
    'ac_admin/get_ac_list',
    'admin/get_c_bugs',
    'common/post_temporary',
    'common/put_options',
    'others/post_electric_charge',
    'others/get_electric_charges',
    'others/del_ctric_charges',
    'author/get_monitors',
    'author/get_monitor_echarts',
    'game/get_im_rooms',
    'game/get_chat_list',
    'game/get_im_room_remmbers',
    'game/del_im_sys',
    'common/get_emoji_class',
    'common/get_emojis',
    'admin/get_codes',
    'admin/get_comments',
    'blog/get_blog_tag_list',
    'admin/get_push_tasks',
    'author/get_weights',
    'author/put_author',
    'admin/get_send_msgs',
    'admin/post_send_msg',
    'admin/del_send_msg',
    'blog/get_month_notes',
    {
        // 支持对象配置，取第一个为methods
        get_notes_list_echarts: 'admin/get_notes_list_echarts',
        get_classs:'blog/classs',
        // 统一的图片上传，只要设置了type就会上传到对应的静态资源目录
        post_upload_imgs:'common/upload_imgs_bug_c',
        get_net_dists:'common/getNetdists'
    },
]

const APIS = {}
const obj1 = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    del: 'DELETE',
}

arr.forEach((item) => {
    if (getType(item) === 'object') {
        Object.keys(item).forEach((key) => {
            if(APIS[key]){
                Toast(`${key}已存在，请检查`)
                return
            }
            APIS[key] = (data) => {
                const method = obj1[key.split('_')[0].toLowerCase()]
                let obj2 = {
                    url: item[key],
                    method,
                }

                if (method == 'GET') {
                    obj2.params = data
                } else {
                    obj2.data = data
                }

                return http(obj2)
            }
        })

        return
    }
    // 按/截取
    let arr1 = item.split('/') || []
    const apiName = arr1[1] || ''
    if(APIS[apiName]){
        Toast(`${apiName}已存在，请检查`)
        return
    }
    // 按_截取
    let arr2 = apiName.split('_')

    const method = obj1[arr2[0].toLowerCase()]

    APIS[apiName] = (data) => {
        let obj2 = {
            url: item,
            method,
        }

        if (method == 'GET') {
            obj2.params = data
        } else {
            obj2.data = data
        }

        return http(obj2)
    }
})

export default APIS
