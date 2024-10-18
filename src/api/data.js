import http from '@/api/http'

// 找回密码
export const handlePassword = (data) => {
    return http({
        url: 'author',
        method: 'put',
        data: data,
    })
}

// register
export const register = (data) => {
    return http({
        url: 'author/register',
        method: 'post',
        data,
    })
}

// 登陆
export const getLogin = (data) => {
    return http({
        url: 'author/login',
        method: 'post',
        data,
    })
}

// 获取yzm
export const getMail = (data) => {
    return http({
        url: `common/get_code`,
        method: 'get',
        params: data,
    })
}

// 获取yzm
export const getUserLogin = (params) => {
    return http({
        url: `author/user_login_code`,
        method: 'get',
        params,
    })
}

export const get_games = (params) => {
    return http({
        url: `game/get_games`,
        method: 'get',
        params,
    })
}

export const post_game = (params) => {
    return http({
        url: `game/post_game`,
        method: 'post',
        data: params,
    })
}

export const del_game = (params) => {
    return http({
        url: `game/del_game`,
        method: 'delete',
        data: params,
    })
}

export const post_game_sort = (params) => {
    return http({
        url: `game/post_game_sort`,
        method: 'post',
        data: params,
    })
}

export const get_room = (params) => {
    return http({
        url: `game/get_room`,
        method: 'get',
        params,
    })
}

export const get_im_rooms = (params) => {
    return http({
        url: `game/get_im_rooms`,
        method: 'get',
        params,
    })
}

export const get_im_room_remmbers = (params) => {
    return http({
        url: `game/get_im_room_remmbers`,
        method: 'get',
        params,
    })
}

export const del_im_sys = (params) => {
    return http({
        url: `game/del_im_sys`,
        method: 'delete',
        data:params,
    })
}

export const post_im_room = (params) => {
    return http({
        url: `game/post_im_room`,
        method: 'post',
        data:params,
    })
}

export const del_im_room = (params) => {
    return http({
        url: `game/del_im_room`,
        method: 'delete',
        data:params,
    })
}

export const get_im_room_member = (params) => {
    return http({
        url: `game/get_im_room_member`,
        method: 'get',
        params,
    })
}

export const post_im_room_member = (params) => {
    return http({
        url: `game/post_im_room_member`,
        method: 'post',
        data:params,
    })
}

export const im_heart = (params) => {
    return http({
        url: `game/im_heart`,
        method: 'get',
        params,
    })
}

export const get_gobang_list = (params) => {
    return http({
        url: `game/get_gobang_list`,
        method: 'get',
        params,
    })
}

export const post_gobang = (params) => {
    return http({
        url: `game/post_gobang`,
        method: 'post',
        data:params,
    })
}
export const get_gobang = (params) => {
    return http({
        url: `game/get_gobang`,
        method: 'get',
        params,
    })
}
export const del_gobang = (params) => {
    return http({
        url: `game/del_gobang`,
        method: 'delete',
        data:params,
    })
}










