import{n as r,h as s}from"./index.25833e42.js";var g=function(){var e=this,i=e.$createElement,a=e._self._c||i;return a("div",[a("TrainPage",{ref:"TrainPageRef",attrs:{searchConfig:e.searchConfig,tableConfig:e.tableConfig,sendUrl:"get_blog_tag_list",customize:""}}),a("e-dialog",{attrs:{title:e.rowCopy._id?"\u7F16\u8F91":"\u65B0\u589E",width:"400px"},on:{closed:e.handleClose,confirm:e.submitDialogVisible},model:{value:e.dialogVisible,callback:function(t){e.dialogVisible=t},expression:"dialogVisible"}},[a("div",{staticClass:"zl-dialog-main p-r-20"},[a("el-input",{model:{value:e.rowCopy.tag_name,callback:function(t){e.$set(e.rowCopy,"tag_name",t)},expression:"rowCopy.tag_name"}})],1)])],1)},c=[];const d={name:"adminCommentList",data(){return{searchConfig:[{label:"\u6807\u7B7E\u540D",type:"input",modelName:"tag_name"}],tableConfig:{isSelection:!1,maxHeightFlag:!1,stripe:!0,btns:{children:[{label:"\u65B0\u589E",type:"primary",clickFn:e=>{this.openAdd()}}]},columnObj:[{label:"\u6807\u7B7E\u540D",props:"tag_name"},{label:"\u64CD\u4F5C",slot:"projectDetail",props:"action",lock:!0,fixed:"right",children:[{label:"\u7F16\u8F91",type:"success",clickFn:e=>{this.edit(e)}},{label:"\u5220\u9664",type:"danger",clickFn:e=>{this.del(e)}}]}]},dialogVisible:!1,rowCopy:{_id:"",tag_name:""}}},methods:{get_blog_tag_list(){let{page:e,limit:i}=this.pageOption,a={page:e,limit:i};this.isLoading=!0,s.get_blog_tag_list(a).then(t=>{if(this.getType(t.data)==="object"){let{data:o,total:n}=t.data;this.tableData=o||[],this.pageOption.total=n-0||0}}).catch(t=>{console.error(t)}).finally(()=>{this.isLoading=!1})},del(e){this.$confirm("\u6B64\u64CD\u4F5C\u5C06\u6C38\u4E45\u5220\u9664\u8BE5\u6587\u4EF6, \u662F\u5426\u7EE7\u7EED?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{s.delete_blog_tag({_id:e._id}).then(i=>{this.$message({type:"success",message:"\u5220\u9664\u6210\u529F!"}),this.get_blog_tag_list()}).catch(()=>{})}).catch(()=>{this.$message({type:"info",message:"\u5DF2\u53D6\u6D88\u5220\u9664"})})},handleClose(){this.dialogVisible=!1,Object.assign(this.rowCopy,{_id:"",tag_name:""})},submitDialogVisible(){s.post_blog_tag(this.rowCopy).then(e=>{this.$message({type:"success",message:"\u64CD\u4F5C\u6210\u529F!"}),this.handleClose(),this.get_blog_tag_list()}).catch(()=>{})},openAdd(){this.dialogVisible=!0},edit(e){this.rowCopy=this.deepCopy(e),this.dialogVisible=!0}}},l={};var p=r(d,g,c,!1,h,null,null,null);function h(e){for(let i in l)this[i]=l[i]}var m=function(){return p.exports}();export{m as default};
