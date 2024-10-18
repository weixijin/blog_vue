import{j as c,m as o,n}from"./index.25833e42.js";var d=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{class:["w-200 m-t-15 user-article-item",e.isMaxScreen?"w-300":""],on:{click:e.goArticle}},[t("div",{class:["pr user-article-img-cover h-120",e.isMaxScreen?"h-180":""]},[t("e-image",{class:["user-article-img-cover-img b-r-4 w-200 h-120",e.isMaxScreen?"w-300 h-180":""],attrs:{src:e.articleInfo.article_bck_url},on:{click:function(a){return a.preventDefault(),function(){}.apply(null,arguments)}}}),t("div",{class:["pa article-type f-12",e.articleInfo.article_need_token==2?"c-warning":"c-fff"]},[e._v(" "+e._s(e.articleInfo.article_need_token==2?"\u79C1\u6709":"\u516C\u5F00")+" ")]),t("div",{staticClass:"pa article-checkbox"},[t("div",{staticClass:"article-checkbox-mask",on:{click:function(a){return a.stopPropagation(),e.goArticle.apply(null,arguments)}}}),t("el-checkbox",{directives:[{name:"show",rawName:"v-show",value:e.isHandle,expression:"isHandle"}],attrs:{size:"medium"},model:{value:e.articleInfo.isHandle,callback:function(a){e.$set(e.articleInfo,"isHandle",a)},expression:"articleInfo.isHandle"}})],1),t("div",{staticClass:"mask-article-info pa c-fff f-14"},[t("div",{staticClass:"ell f-500 f-12"},[e._v("\u6D4F\u89C8\u91CF\uFF1A"+e._s(e.articleInfo.article_watch_numbers))]),t("div",{staticClass:"m-t-10 ell f-12"},[e._v(" \u4F5C\u8005\uFF1A"+e._s(e.articleInfo.author_id&&e.articleInfo.author_id.username)+" ")])])],1),t("div",{class:[e.articleInfo.isRead?"op-50":""]},[t("h2",{staticClass:"ell f-500 m-t-10 f-14"},[e._v(" "+e._s(e.articleInfo.article_name)+" ")]),t("div",{staticClass:"flex-wrap flex-justify-between flex-center-wrap f-12 m-t-6"},[t("div",{staticClass:"c-666"},[e._v(" \u8FD1\u671F\u4FEE\u6539\uFF1A"),t("span",{staticClass:"c-666 f-12"},[e._v(e._s(e.formateTime(e.articleInfo.article_updata_time)))])]),e.isAdmin?t("el-dropdown",{on:{command:e.commandFun}},[t("div",{staticClass:"flex-wrap flex-column-wrap flex-justify-between h-16 dors"},e._l(3,function(a){return t("div",{key:a,staticClass:"dor"})}),0),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e.type==="ac"?t("el-dropdown-item",{attrs:{command:"prevew",icon:"el-icon-full-screen"}},[e._v("\u9884\u89C8")]):e._e(),t("el-dropdown-item",{attrs:{command:"delete",icon:"el-icon-delete"}},[e._v("\u5220\u9664")])],1)],1):e._e()],1)])])},u=[];const f={props:{type:{type:String,default:"common"},articleInfo:{type:Object,default:()=>({isHandle:!1})},isHandle:{type:Boolean,default:!1}},data(){return{isMaxScreen:!1}},computed:{...Vuex.mapGetters(["isAdmin"])},watch:{articleInfo:{handler(e){this.articleInfo=e},deep:!0}},mounted(){const{width:e}=this.getViewportSize();e>1920&&(this.isMaxScreen=!0)},methods:{commandFun(e){switch(e){case"prevew":this.$emit("openPrevew",this.articleInfo);break;case"delete":this.$confirm("\u6B64\u64CD\u4F5C\u5C06\u6C38\u4E45\u5220\u9664\u8BE5\u6587\u4EF6, \u662F\u5426\u7EE7\u7EED?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{c({_id:this.articleInfo._id}).then(()=>{this.$message({type:"success",message:"\u5220\u9664\u6210\u529F!"}),this.$emit(e,this.articleInfo)}).catch(()=>{})}).catch(()=>{});break}},formateTime(e){return o(e)},goArticle(){let{isHandle:e,articleInfo:i}=this;if(e){this.articleInfo.isHandle=!this.articleInfo.isHandle;return}this.$emit("goPage",{row:i})}}},s={};var m=n(f,d,u,!1,p,"0d555b5a",null,null);function p(e){for(let i in s)this[i]=s[i]}var _=function(){return m.exports}(),v=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("klScroll",{attrs:{list:e.list,scrollHeight:e.scrollHeight,pageOption:e.pageOption},on:{bottom:e.bottom,scroll:e.scroll}},[t("div",{staticClass:"flex-wrap flex-justify-between flex-item-wrap p-l-10 p-r-10"},[e._l(e.list,function(a,l){return t("userArticle",{key:l,attrs:{type:e.type,articleInfo:a,isHandle:e.isHandle},on:{goPage:e.goPage,delete:e.deleteFun,openPrevew:e.openPrevew}})}),e._l(10,function(a){return t("div",{key:a,staticClass:"w-200"})})],2)])},h=[];const w={components:{userArticle:_},props:{type:{type:String,default:"common"},list:{type:Array,default:()=>[]},pageOption:{type:Object,default:()=>{}},scrollHeight:{type:Number,default:0},isHandle:{type:Boolean,default:!1}},data(){return{}},watch:{list:{handler(e){},deep:!0,immediate:!0}},methods:{openPrevew(e){this.$emit("openPrevew",e)},deleteFun(e){this.$emit("delete",e)},bottom(){this.$emit("bottom")},goPage(e){this.$emit("goPage",e)},scroll(e){this.$emit("scroll",e)}}},r={};var g=n(w,v,h,!1,y,null,null,null);function y(e){for(let i in r)this[i]=r[i]}var I=function(){return g.exports}();export{I as u};
