// 后台相关api
import http from '@/api/http'

// 增加新分类
export default {
    // 获取一张随机图片地址
    get_img(params) {
        return http({
            url: 'common/get_img',
            method: 'get',
            params
        })
    },
    // 批量移动文章分类
    //   let { article_ids, class_id } = req.body;
    put_article_class(data) {
        return http({
            url: 'blog/put_article_class',
            method: 'put',
            data,
        })
    },
    // 删除blog的未使用图片资源
    del_blog_imgs(data) {
        return http({
            url: 'admin/del_blog_imgs',
            method: 'delete',
            data,
        })
    },
    // 删除c_bug下的数据，及图片
    del_c_bug() {
        return http({
            url: 'admin/del_c_bug',
            method: 'delete',
        })
    },
    // 重新执行每日任务
    day_init(params) {
        return http({
            url: 'common/day_init',
            method: 'get',
            params,
        })
    },
    // 个人中心--用户信息接口
    get_mobile_user_info(params) {
        return http({
            url: 'blog/get_mobile_user_info',
            method: 'get',
            params,
        })
    },
    // 新增阅读记录
    post_author_read_history: (data) => {
        return http({
            url: 'author/post_author_read_history',
            method: 'POST',
            data,
        })
    },
    // 通过id获取用户的信息 -- 通用接口
    get_user_info_common: (params) => {
        return http({
            url: 'common/get_user_info_common',
            method: 'get',
            params,
        })
    },
    // 获取errs
    get_errs: (params) => {
        return http({
            url: 'common/get_errs',
            method: 'get',
            params,
        })
    },
    // 获取errs
    del_errs: (params) => {
        return http({
            url: 'common/del_errs',
            method: 'delete',
            data: params,
        })
    },
    // 移动端首页列表数据
    get_mobile_home_list: (params) => {
        return http({
            url: 'blog/get_mobile_home_list',
            method: 'get',
            params,
        })
    },
    // 网盘文件上传
    postNetdist: (params) => {
        return http({
            url: 'common/postNetdist',
            method: 'post',
            data: params,
        })
    },
    // 网盘文件删除状态修改
    putNetdist: (params) => {
        return http({
            url: 'common/putNetdist',
            method: 'put',
            data: params,
        })
    },
    // 网盘文件列表
    getNetdists: (params) => {
        return http({
            url: 'common/getNetdists',
            method: 'get',
            params,
        })
    },
    // 需改文章分类排序
    put_options: (params) => {
        return http({ 
            url: 'common/put_options',
            method: 'put',
            data: params,
        })
    },
    // 获取文章分类列表
    getArticleClasss: (params) => {
        return http({
            url: 'blog/classs',
            method: 'get',
            params,
        })
    },
    getAdminComments: (params) => {
        return http({
            url: 'admin/get_comments',
            method: 'get',
            params,
        })
    },
    delAdminComment: (data) => {
        return http({
            url: 'admin/del_comment',
            method: 'DELETE',
            data,
        })
    },
    getCodes: (params) => {
        return http({
            url: 'admin/get_codes',
            method: 'get',
            params,
        })
    },
    deleteCode: (data) => {
        return http({
            url: 'admin/delete_code',
            method: 'delete',
            data,
        })
    },
    getAuthors: (params) => {
        return http({
            url: 'admin/get_authors',
            method: 'get',
            params,
        })
    },

    // 工具相关
    getTools: (params) => {
        return http({
            url: 'admin/get_tools',
            method: 'get',
            params,
        })
    },

    deleteTool: (data) => {
        return http({
            url: 'admin/delete_tool',
            method: 'delete',
            data,
        })
    },
    postTool: (data) => {
        return http({
            url: 'admin/post_tool',
            method: 'POST',
            data,
        })
    },
    putTool: (data) => {
        return http({
            url: 'admin/put_tool',
            method: 'PUT',
            data,
        })
    },

    getEmojis: (params) => {
        return http({
            url: 'common/get_emojis',
            method: 'get',
            params: {
                ...params,
            },
        })
    },

    putEmoji: (data) => {
        return http({
            url: 'common/put_emoji',
            method: 'PUT',
            data,
        })
    },

    delEmoji: (data) => {
        return http({
            url: 'common/del_emoji',
            method: 'DELETE',
            data,
        })
    },
    getEmojiClass: (params) => {
        return http({
            url: 'common/get_emoji_class',
            method: 'get',
            params,
        })
    },
    // 评论部分
    postComment: (data) => {
        return http({
            url: 'blog/post_comment',
            method: 'POST',
            data,
        })
    },
    delComment: (data) => {
        return http({
            url: 'blog/del_comment',
            method: 'DELETE',
            data,
        })
    },
    putComment: (data) => {
        return http({
            url: 'blog/put_comment',
            method: 'PUT',
            data,
        })
    },
    replayComment: (data) => {
        return http({
            url: 'blog/replay_comment',
            method: 'POST',
            data,
        })
    },
    getComments: (params) => {
        return http({
            url: 'blog/get_comments',
            method: 'get',
            params,
        })
    },
    // 获取历史记录
    get_author_read_history: (params) => {
        return http({
            url: 'author/get_author_read_history',
            method: 'get',
            params: {
                ...params,
            },
        })
    },

    // bug记录相关
    post_note_bug_api: (data) => {
        return http({
            url: 'admin/post_note_bug_api',
            method: 'post',
            data,
        })
    },

    delete_note_bug_api: (data) => {
        return http({
            url: 'admin/delete_note_bug_api',
            method: 'delete',
            data,
        })
    },

    put_note_bug_api: (data) => {
        return http({
            url: 'admin/put_note_bug_api',
            method: 'put',
            data,
        })
    },

    get_note_bug_apis: (params) => {
        return http({
            url: 'admin/get_note_bug_apis',
            method: 'get',
            params,
        })
    },

    // 插件相关
    post_plugin: (data) => {
        return http({
            url: 'admin/post_plugin',
            method: 'post',
            data,
        })
    },

    delete_plugin: (data) => {
        return http({
            url: 'admin/delete_plugin',
            method: 'delete',
            data,
        })
    },

    put_plugin: (data) => {
        return http({
            url: 'admin/put_plugin',
            method: 'put',
            data,
        })
    },

    get_plugins: (params) => {
        return http({
            url: 'admin/get_plugins',
            method: 'get',
            params,
        })
    },
    // 一些公共的api
    // 图片列表
    getImgs: (params) => {
        return http({
            url: 'common/get_imgs',
            method: 'get',
            params,
        })
    },

    // 获取通用配置
    get_options: (params) => {
        return http({
            url: 'common/get_options',
            method: 'get',
            params: {
                ...params,
            },
        })
    },

    // 收藏相关
    post_collection_articles: (data) => {
        return http({
            url: 'blog/post_collection_articles',
            method: 'post',
            data,
        })
    },
    delete_collection_article: (data) => {
        return http({
            url: 'blog/delete_collection_article',
            method: 'delete',
            data,
        })
    },
    get_collection_articles: (params) => {
        return http({
            url: 'blog/get_collection_articles',
            method: 'get',
            params,
        })
    },

    // 同步用户信息
    post_user_sync: (data) => {
        return http({
            url: 'author/post_user_sync',
            method: 'post',
            data,
        })
    },

    // 不需要code的修改用户信息的接口
    put_userinfo: (data) => {
        return http({
            url: 'author/put_userinfo',
            method: 'put',
            data,
        })
    },

    // 获取活动页面列表
    get_ac_page: (params) => {
        return http({
            url: 'ac_admin/ac_page',
            method: 'get',
            params,
        })
    },

    // 获取活动页面列表
    get_ac_list: (params) => {
        return http({
            url: 'ac_admin/ac_list',
            method: 'get',
            params,
        })
    },

    // 新增、编辑活动页面
    post_ac_page: (params) => {
        return http({
            url: 'ac_admin/ac_page',
            method: 'POST',
            data: params,
        })
    },
    // 新增、编辑活动页面
    del_ac_page: (params) => {
        return http({
            url: 'ac_admin/ac_page',
            method: 'DELETE',
            data: params,
        })
    },
    // 新增/修改tag
    post_tag: (params) => {
        return http({
            url: 'common/post_tag',
            method: 'POST',
            data: params,
        })
    },
    // 删除tag
    del_tag: (params) => {
        return http({
            url: 'common/del_tag',
            method: 'DELETE',
            data: params,
        })
    },
    // 获取页面加载监控列表信息
    get_monitor_list_echarts: (params) => {
        return http({
            url: 'admin/get_monitor_list_echarts',
            method: 'get',
            params,
        })
    },
    // 拉取纪要可视化信息
    get_notes_list_echarts: (params) => {
        return http({
            url: 'admin/get_notes_list_echarts',
            method: 'get',
            params,
        })
    },

    // 列表
    get_c_bugs: (params) => {
        return http({
            url: 'admin/get_c_bugs',
            method: 'get',
            params,
        })
    },

    // 详情
    get_c_bug: (params) => {
        return http({
            url: 'admin/get_c_bug',
            method: 'get',
            params,
        })
    },

    // 新增与编辑
    post_c_bug: (params) => {
        return http({
            url: 'admin/post_c_bug',
            method: 'post',
            data: params,
        })
    },

    // 删除
    delete_c_bug: (params) => {
        return http({
            url: 'admin/delete_c_bug',
            method: 'delete',
            data: params,
        })
    },

    // 列表
    get_push_tasks: (params) => {
        return http({
            url: 'admin/get_push_tasks',
            method: 'get',
            params,
        })
    },

    // 新增与编辑
    post_push_task: (params) => {
        return http({
            url: 'admin/post_push_task',
            method: 'post',
            data: params,
        })
    },

    // 删除
    delete_push_task: (params) => {
        return http({
            url: 'admin/delete_push_task',
            method: 'delete',
            data: params,
        })
    },

    // 获取体重数据
    get_weights: (params) => {
        return http({
            url: 'author/get_weights',
            method: 'get',
            params,
        })
    },

    // 新增与修改体重数据
    post_weight: (params) => {
        return http({
            url: 'author/post_weight',
            method: 'post',
            data: params,
        })
    },

    // 删除体重数据
    delete_weight: (params) => {
        return http({
            url: 'author/delete_weight',
            method: 'delete',
            data: params,
        })
    },

    // 新增与编辑tag
    post_blog_tag: (params) => {
        return http({
            url: 'blog/post_blog_tag',
            method: 'post',
            data: params,
        })
    },

    // 删除tag
    delete_blog_tag: (params) => {
        return http({
            url: 'blog/delete_blog_tag',
            method: 'delete',
            data: params,
        })
    },

    // 获取tag列表
    get_blog_tag_list: (params) => {
        return http({
            url: 'blog/get_blog_tag_list',
            method: 'get',
            params,
        })
    },
    post_author_fly: (params) => {
        return http({
            url: 'author/post_author_fly',
            method: 'post',
            data: params,
        })
    },
    // 获取tag列表
    get_article_by_tagids: (params) => {
        return http({
            url: 'blog/get_article_by_tagids',
            method: 'get',
            params,
        })
    },
}
