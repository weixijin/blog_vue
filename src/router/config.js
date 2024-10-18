 export const navList = [
    {
        navTitle: '首页',
        href: '/home',
    },
    {
        navTitle: '文章',
        href: '/blog/home',
    },
    // {
    //     navTitle: '收藏',
    //     href: '/blog/collections',
    //     roles:['admin']
    // },
    // {
 
    //     navTitle: '心得记录',
    //     href: '/blog/experience_record',
    //     roles:['admin']
    // },
    {
      
        navTitle: '面试',
        href: '/blog/interview_test',
        // isNewPage: true,
    },
    {
        navTitle: '在线脑图',
        href: '/tool/jsmind',
        // isNewPage: true,
    },
    {
        navTitle: '留言板',
        href: '/blog/message-board',
    },
    // {
    //     navTitle: '聊天室',
    //     href: '/blog/common_im'
    // },
    {
        navTitle: '关于我',
        href: '/blog/about_me',
    },
].map((item,index)=>{
    item.id = index
    return item
})

