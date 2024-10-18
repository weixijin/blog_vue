// 前台相关api
import http from '@/api/http'

// 增加新分类
export const addClass = (data) => {
    return http({
        url: 'blog/addclass',
        method: 'post',
        data: data,
    })
}

// 删除分类
export const delClass = (params) => {
    return http({
        url: 'blog/delclass',
        method: 'delete',
        params,
    })
}

// 修改分类名
export const putClass = (data) => {
    return http({
        url: 'blog/putclass',
        method: 'put',
        data: data,
    })
}

// 提交新的文章
export const addarticle = (data) => {
    return http({
        url: 'blog/addarticle',
        method: 'post',
        data: data,
    })
}

// 删除一篇文章
export const delArticle = (params) => {
    return http({
        url: 'blog/delarticle',
        method: 'delete',
        params,
    })
}

// 修改一篇文章
export const putArticle = (data) => {
    return http({
        url: 'blog/putarticle',
        method: 'put',
        data,
    })
}

// 获取所有分类
export const getClasss = (data) => {
    return http({
        url: 'blog/classs',
        method: 'get',
        params: data,
    })
}

// 获取分类下的文章列表
export const getArticles = (data) => {
    return http({
        url: 'blog/articles',
        method: 'get',
        params: data,
    })
}

// 获取具体的文章信息
export const getArticle = (data) => {
    return http({
        url: 'blog/article',
        method: 'get',
        params: data,
    })
}

// 通过输入article 模糊查询
export const searchArticles = (data) => {
    return http({
        url: 'blog/searchArticles',
        method: 'get',
        params: data,
    })
}

// 获取最近的修改(20)
export const updataArticles = (data) => {
    return http({
        url: 'blog/updataarticles',
        method: 'get',
        params: data,
    })
}

// 切换文章是否需要权限

export const putArticleNeedToken = ({ id, params }) => {
    return http({
        url: 'blog/put_article_need_token/' + id,
        method: 'put',
        data: params,
    })
}
// 上传img
export const uploadImg = ({ id, params,query={} }) => {
    return http({
        url: 'blog/uploadImg/' + id,
        method: 'post',
        data: params,
        params:query
    })
}

// 上传img
export const post_upload_imgs_common = ({ data={},params={} }) => {
    return http({
        url: 'common/post_upload_imgs_common',
        method: 'post',
        data,
        params
    })
}

// 上传img
export const uploadImgBugC = (params) => {
    return http({
        url: 'common/upload_imgs_bug_c',
        method: 'post',
        data: params,
    })
}

// 上传img
export const upload_imgs_im = (data,params={}) => {
    return http({
        url: 'common/upload_imgs_im',
        method: 'post',
        data,
        params
    })
}



// 删除img
export const deleteImg = ({ id, params }) => {
    return http({
        url: 'blog/deleteImg/' + data.id,
        method: 'delete',
        data: params,
    })
}

// 首页的api
// 点击排名
export const getClickRanking = (params) => {
    return http({
        url: 'blog/click_ranking',
        method: 'GET',
        params: {
            ...params,
        },
    })
}

// 近期更新
export const getRecentUpdates = (params) => {
    return http({
        url: 'blog/recent_updates',
        method: 'GET',
        params: {
            ...params,
        },
    })
}

// 各个分类的前n名阅读量
export const getRankingClasss = (params) => {
    return http({
        url: 'blog/ranking_classs',
        method: 'GET',
        params: {
            ...params,
        },
    })
}

// 上传图片
export const postUploadImgs = (data) => {
    return http({
        url: 'common/upload_imgs',
        method: 'post',
        data,
        headers: {
            // 这个也是必须要有的
            'Content-Type': 'multipart/form-data',
        },
    })
}

// 修改用户信息
export const putAuthor = (data) => {
    return http({
        url: 'author/put_author',
        method: 'put',
        data,
    })
}

// 获取图片链接列表
export const getCommonImgs = (params) => {
    return http({
        url: 'common/get_imgs',
        method: 'get',
        params,
    })
}

// notes相关
// 获取详细信息
export const getNote = (params) => {
    return http({
        url: 'blog/get_note',
        method: 'get',
        params,
    })
}

// 获取列表
export const getNotes = (params) => {
    return http({
        url: 'blog/get_notes',
        method: 'get',
        params,
    })
}

// 提交note
export const postNote = (data) => {
    return http({
        url: 'blog/post_note',
        method: 'POST',
        data,
    })
}

// 修改note
export const putNote = (data) => {
    return http({
        url: 'blog/put_note',
        method: 'PUT',
        data,
    })
}

// 删除note
export const deleteNote = (data) => {
    return http({
        url: 'blog/delete_note',
        method: 'DELETE',
        data,
    })
}

// 用户的配置项修改
export const putAuthorConfig = (data) => {
    return http({
        url: 'author/put_author_config',
        method: 'PUT',
        data,
    })
}

// 获取导出数据
export const getExportNotes = (params) => {
    return http({
        url: 'blog/get_export_notes',
        method: 'get',
        params,
    })
}

export const post_collection_class = (params) => {
    return http({
        url: 'blog/post_collection_class',
        method: 'post',
        data: params,
    })
}

export const delete_collection_class = (params) => {
    return http({
        url: 'blog/delete_collection_class',
        method: 'delete',
        data: params,
    })
}

export const get_collection_class = (params) => {
    return http({
        url: 'blog/get_collection_class',
        method: 'get',
        params,
    })
}

export const get_day_push_tasks = (params) => {
    return http({
        url: 'author/get_day_push_tasks',
        method: 'get',
        params,
    })
}
