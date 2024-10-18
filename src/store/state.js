export default () => ({
    class_id: '', // 当前选中的class_id
    userdata: {header_img:''},
    token: '',
    activeIndex: 0, // 默认选中第一个
    isPc: true,
    url_path: '/home',  // 当前的路由path
    url_title:'admin',  // 路由名
    plan_infos:{},
    options:{},  // 后端返回的配置项
    article_total:0, // 当前用户的文章总数
    collectionList:[], // 总收藏列表 
    blog_class_option:'', // 文章分类排序
    isShowCalendar:true, // 是否显示日历
    isShowGame:true, // 是否显示游戏入口
    userTags:[], // 用户的标签
    RP:false, // 组件是否缓存
    localforageJS:null, // 
    localforageIMG:null, //
    localforageAPI:null, //
    navlist:[], // 文章分类列表
    socket:null, // socket对象
    keyboardEventKay:'', // 键盘事件监听
})
