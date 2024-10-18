import{b as r,L as v,r as f,n,h as b,u as C}from"./index.25833e42.js";import{a as y,b as k}from"./index.4ae476b7.js";var w=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"mobile-home-header"},[e("div",{staticClass:"mobile-home-header-container"},[e("div",{staticClass:"mobile-home-header-search-left pr"},[e("i",{staticClass:"el-icon-search"}),e("i",{directives:[{name:"show",rawName:"v-show",value:t.isSearch,expression:"isSearch"}],staticClass:"el-icon-circle-close mobile-home-header-search-left-close-icon",on:{click:function(i){i.stopPropagation(),t.content=""}}}),t.isSearch?t._e():e("span",{staticClass:"mobile-home-header-search-left-tip"},[t._v(" \u641C\u7D22 ")]),e("input",{class:["mobile-home-header-search-left-input f-14",t.isSearch?"bg-f2":""],attrs:{type:"text"},on:{focus:t.inputFocus}})]),e("div",{staticClass:"mobile-home-header-search-right"},[e("i",{directives:[{name:"show",rawName:"v-show",value:!t.isSearch,expression:"!isSearch"}],staticClass:"el-icon-circle-plus",on:{click:t.openUserToolPopup}}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isSearch,expression:"isSearch"}],staticClass:"mobile-home-header-search-right-tip",on:{click:t.getArticles}},[t._v(" \u641C\u7D22 ")])])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isSearch,expression:"isSearch"}],staticClass:"mobile-pos-history-recommend",on:{click:function(i){t.isSearch=!1}}},[t._m(0),e("div",{staticClass:"mobile-history-content"},t._l(t.historyList,function(i){return e("div",{key:i.id,staticClass:"mobile-history-content-item",on:{click:function(a){return t.getArticles(i)}}},[e("span",[t._v(" "+t._s(i.content)+" ")]),e("i",{staticClass:"el-icon-close",on:{click:function(a){return a.stopPropagation(),t.delHistoryContent(i.id)}}})])}),0),e("div",{staticClass:"mobile-recommend-title"},[t._v("\u731C\u4F60\u60F3\u641C")]),e("div",{staticClass:"mobile-recommend-content"},t._l(t.recommendList,function(i){return e("div",{key:i._id,staticClass:"mobile-recommend-content-item",on:{click:function(a){return t.getArticles(i)}}},[t._v(" "+t._s(i.article_name)+" ")])}),0)]),e("v-popup",{attrs:{height:"520px"},model:{value:t.visibleUserTool,callback:function(i){t.visibleUserTool=i},expression:"visibleUserTool"}},[e("div",{staticClass:"kl-user-tool-popup"},[e("img",{staticClass:"close-mobile-user-tool-popup",attrs:{src:"//image.zlketang.com/public/news/others/imgs/blog_imgs/231312635_03.png"},on:{click:function(i){t.visibleUserTool=!1}}}),e("div",{staticClass:"user-header"},[e("div",{staticClass:"left"},[e("img",{staticClass:"user-avtor",attrs:{src:t.userHeader()},on:{click:t.goUserCenter}}),t._v(" \u4ECA\u5929\u662F\u4F60\u52A0\u5165\u77E5\u5D16\u7684\u7B2C\xA0"+t._s(t.userCreateDate)+"\xA0\u5929 ")]),e("div",{staticClass:"right"},[e("img",{staticClass:"right-caogao-icon",attrs:{src:"//image.zlketang.com/public/news/others/imgs/blog_imgs/4116e844ffaab97cc0702f48a7638015.png"}}),t._v(" \u8349\u7A3F\u7BB1 ")])]),e("div",{staticClass:"tool-ru"},t._l(t.entranceList,function(i){return e("div",{key:i.title,staticClass:"item",on:{click:function(a){return t.goToPage(i)}}},[e("div",{staticClass:"left"},[e("div",{staticClass:"item-title flex-wrap flex-center-wrap"},[t._v(" "+t._s(i.title)),e("i",{staticClass:"el-icon-arrow-right"})]),e("div",{staticClass:"item-desc"},[t._v(" "+t._s(i.desc)+" ")])]),e("img",{attrs:{src:i.url,alt:""}})])}),0),e("div",{staticClass:"flex-wrap flex-justify-between user-tool-2"},t._l(t.userToolList,function(i){return e("div",{key:i.title,staticClass:"flex-column-wrap flex-center item",on:{click:function(a){return t.toolGoPage(i)}}},[e("div",{staticClass:"flex-center m-b-10 img-cover"},[e("img",{attrs:{src:i.url}})]),e("span",{staticClass:"f-12"},[t._v(" "+t._s(i.title)+" ")])])}),0),e("div",{staticClass:"m-t-20 user-tool-3"},[e("div",{staticClass:"flex-wrap flex-justify-between flex-wrap-center f-14 archor-title m-b-10"},[e("span",[t._v(" \u951A\u70B9\u6587\u7AE0 ")]),this.articleInfo._id&&t.userdata&&t.userdata.article_anchor_point_time?e("time",{staticClass:"f-13"},[t._v(" "+t._s(t.klDateFormat(t.userdata.article_anchor_point_time-0)))]):t._e()]),e("div",{on:{click:t.goPage}},[this.articleInfo._id?e("articleItem",{attrs:{articleInfo:t.articleInfo}}):e("div",{staticClass:"p-20 p-l-0 c-aaa"},[t._v("\u6682\u65E0\u6587\u7AE0")])],1)])])])],1)},L=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"mobile-history-title"},[t._v(" \u5386\u53F2\u641C\u7D22 "),e("i",{staticClass:"el-icon-delete"})])}];const x={components:{articleItem:y},data(){return{img1:r+"ceshi/1.png",content:"",isSearch:!1,historyList:[],recommendList:[],visibleUserTool:!1,entranceList:[{title:"\u804A\u5929\u5BA4",desc:"\u6709\u4EC0\u4E48\u65B0\u89C2\u70B9\u4E00\u8D77\u8BF4\u8BF4\u770B",url:"//image.zlketang.com/public/news/others/imgs/blog_imgs/c9ab10dcda021c337cd9860ff7e9e68a.png",path:"/blog/common_im"},{title:"\u79DF\u623F\u7EDF\u8BA1",desc:"\u79DF\u623F\u7684\u5217\u8868\u4E0E\u7EDF\u8BA1",url:"//image.zlketang.com/public/news/others/imgs/blog_imgs/ab0ebda2361131564db9ff43808c5b29.png",path:"/normal/electric_charge"}],userToolList:[{title:"\u9762\u8BD5",url:"//image.zlketang.com/public/news/others/imgs/blog_imgs/39712721f381f4c8f62a974309b8bc96.png",path:"/blog/interview_test"},{title:"\u6BCF\u65E5\u63A8\u9001",url:"//image.zlketang.com/public/news/others/imgs/blog_imgs/cdaf70d3b85b7ea59d39efb7c2992cea.png",path:"/normal/push_task"},{title:"\u65E5\u8BB0",url:"//image.zlketang.com/public/news/others/imgs/blog_imgs/ecef9d98534287d1ff914bf1799f7420.png",path:"/normal/experience_record"},{title:"\u4F53\u91CD\u8BB0\u5F55",url:"//image.zlketang.com/public/news/others/imgs/blog_imgs/a9b10f5458ac079fef6d0afc4c6880c1.png",path:"/normal/user_weight"}],articleInfo:{}}},created(){this.init()},computed:{...Vuex.mapState(["userdata"]),userCreateDate(){if(this.userdata){let{register_time:t}=this.userdata;return Math.ceil((Date.now()-new Date(t).getTime())/1e3/60/60/24)}}},methods:{goToPage({path:t}){!t||this.goTo(t)},toolGoPage({path:t}){if(!t){this.$message.error("\u6682\u672A\u5F00\u653E");return}this.goTo(t)},goUserCenter(t){this.$router.push({path:"/blog/user_center"})},goPage(){this.$router.push("/blog/page/"+this.articleInfo._id)},delHistoryContent(t){this.historyList=this.historyList.filter(s=>s.id!==t),this.setStore("historyList",this.historyList)},getArticles(t){let{content:s,article_name:e}=t;(e||s)&&(this.content=e||s),this.isSearch=!1,this.$emit("getArticles",this.content)},userHeader(){let{userdata:t}=this;return this.getType(t)=="object"?r+t.header_img:""},openUserToolPopup(){this.visibleUserTool=!0,this.getArticleInfo()},async getHistoryList(){this.historyList=await this.getStore("historyList",[]).sort((t,s)=>s.time-t.time).slice(0,10)},getRecommendList(){let t=Math.floor(Math.random()*5)+5;v({limit:t,cache:!0}).then(s=>{this.recommendList=(s==null?void 0:s.data)||[]})},getArticleInfo(){if(this.getType(this.userdata)!=="object")return;let{article_anchor_point:t}=this.userdata;!t||f({_id:t,type:1}).then(s=>{if(this.isObject(s.data.article)){this.articleInfo=s.data.article;return}this.saveError("\u8FD4\u56DE\u7684\u6587\u7AE0\u4FE1\u606F\u4E0D\u662F\u5BF9\u8C61")}).catch(s=>{})},init(){this.getRecommendList()},inputFocus(){this.$emit("change",{name:"mobileSearchPage"})}}},o={};var S=n(x,w,L,!1,T,"c4e34162",null,null);function T(t){for(let s in o)this[s]=o[s]}var H=function(){return S.exports}(),O=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"mobile-home-page"},[e("mobileHomeHeader",{on:{change:function(i){t.$emit("change",i)},getArticles:t.getArticles}}),e("div",{staticClass:"flex-center-wrap nav-container"},[e("kl-nav",{attrs:{rightNum:10,active:t.active,list:t.navList},on:{change:t.navChange}}),e("i",{staticClass:"el-icon-s-operation nav-right-icon"})],1),e("div",{staticClass:"list-container"},[e("kl-scroll",{attrs:{pageOption:t.pageOption,list:t.list,scrollHeight:t.scrollHeight},on:{bottom:t.bottomEvent,scroll:t.klScrollEvent}},[t.list.length>0?e("div",{staticClass:"h-10 bg-fff"}):t._e(),e("articleList",{attrs:{list:t.list},on:{page:t.goPage}}),t.list.length==0&&!t.isLoading?e("kl-no-data"):t._e()],1)],1),e("kl-back-top",{ref:"myScrolLeftRef",attrs:{el:".zl-scroll"}})],1)},A=[];const P={components:{mobileHomeHeader:H,articleList:k},data(){return{isRefreshLoading:!1,isLoading:!0,navList:[{value:"1",label:"\u5168\u90E8"},{value:"2",label:"\u70B9\u51FB\u6392\u884C"},{value:"3",label:"\u9605\u8BFB\u8BB0\u5F55"},{value:"4",label:"\u6700\u8FD1\u66F4\u65B0"}],active:"3",scrollHeight:0,visable:!1,list:[],searchOption:{total:0,isSearch:!1,content:"",content_old:""},pageOption:{page:1,limit:10,total:0}}},created(){this.init()},activated(){let t=$(".zl-scroll");!t||t.scrollTop(this.$route.meta.top)},methods:{klScrollEvent(t){this.$route.meta.top=t},async onRefresh(){await this.sleep(),this.init()},goPage(t){this.$router.push(`/blog/page/${t}`)},navChange(t){t!==this.active&&(this.list=[],this.pageOption=Object.assign(this.pageOption,{page:1,limit:10,total:0})),this.active=t,this.getList()},getList(){this.isLoading=!0;let{active:t}=this,s={type:t,page:this.pageOption.page,limit:this.pageOption.limit};b.get_mobile_home_list(s).then(e=>{if(e.data){let{list:i,total:a}=e.data;this.active==3&&(i=i.filter(l=>{if(this.getType(l.article_id)=="object"){let{_id:h,article_need_token:g,class_id:m,article_bck_url:u,article_name:p,article_keywords:d,article_watch_numbers:_}=l.article_id;return l=Object.assign(l,{_id:h,class_id:m,article_keywords:d,article_name:p,article_bck_url:u,article_watch_numbers:_,article_need_token:g}),l.article_updata_time=this.klDateFormat(l.updata_time-0),l}})),this.list=[...this.list,...i],this.pageOption.total=a}}).catch(()=>{}).finally(()=>{this.isRefreshLoading=!1,this.isLoading=!1})},bottomEvent(){this.pageOption.page++,this.navChange(this.active)},init(){this.reset(),this.setScrollHeight(),this.navChange(this.active)},reset(){this.list=[],this.pageOption=Object.assign(this.pageOption,{page:1,limit:10,total:0})},async setScrollHeight(){await this.$nextTick(),this.scrollHeight=document.documentElement.clientHeight-90},getArticles(t){if(!t)return this.$klMessage("\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9");this.saveHistory(t),this.list=[],this.isLoading=!0,C({content:t}).then(s=>{this.list=s.data}).catch().finally(()=>{this.isLoading=!1})},async saveHistory(t){let s=await this.getStore("historyList",s),e={id:this.createId(),content:t,number:1,time:Date.now()};s.every(i=>i.content!==t)?s.push(e):s=s.map(i=>(i.content===t&&(i.number++,i.time=Date.now()),i)),this.setSore("historyList",s)}}},c={};var j=n(P,O,A,!1,I,"57f22908",null,null);function I(t){for(let s in c)this[s]=c[s]}var R=function(){return j.exports}();export{R as default};
