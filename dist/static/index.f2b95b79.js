import{n as r,C as n}from"./index.25833e42.js";var _=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"code notes-list-page o-h"},[t("TrainPage",{ref:"TrainPageRef",attrs:{searchConfig:e.searchConfig,tableConfig:e.tableConfig,sendUrl:"get_authors",customize:!1}}),t("e-dialog",{staticClass:"zl-dialog",attrs:{title:"\u7F16\u8F91\u7528\u6237\u4FE1\u606F",width:"600px"},on:{closed:e.handleClose,confirm:e.submitDialogVisible},model:{value:e.dialogVisible,callback:function(i){e.dialogVisible=i},expression:"dialogVisible"}},[t("div",{staticClass:"zl-dialog-main"},[t("div",{staticClass:"flex-item flex-center-wrap"},[t("div",{staticClass:"flex-item-label"},[e._v("\u662F\u5426\u5F00\u542F\u90AE\u4EF6\u63D0\u9192\uFF1A")]),t("e-radio",{attrs:{option:e.option},model:{value:e.userInfoCopy.user_receive_day_email,callback:function(i){e.$set(e.userInfoCopy,"user_receive_day_email",i)},expression:"userInfoCopy.user_receive_day_email"}})],1)])])],1)},p=[];const d={components:{},data(){return{option:[{label:"\u4E0D\u5F00\u542F",value:"1"},{label:"\u5F00\u542F",value:"2"}],searchConfig:[{label:"\u7528\u6237ID",type:"input",modelName:"_id"},{label:"\u90AE\u7BB1",type:"input",modelName:"email"},{label:"\u5462\u79F0",type:"input",modelName:"username"}],tableConfig:{isSelection:!1,maxHeightFlag:!1,stripe:!0,filterData:e=>e.map(a=>{let{create_time:t,updata_time:i,last_login_time:l,register_time:s}=a;return{...a,create_time_:this.klDateFormat(t),updata_time_:this.klDateFormat(i),last_login_time:this.klDateFormat(l),register_time:this.klDateFormat(new Date(s).getTime())}}),columnObj:[{label:"\u5462\u79F0",props:"username",width:300},{label:"\u7528\u6237ID",props:"_id"},{label:"\u6CE8\u518C\u65F6\u95F4",props:"register_time"},{label:"\u4E0A\u6B21\u767B\u5F55\u65F6\u95F4",props:"last_login_time"},{label:"\u90AE\u7BB1",props:"email"},{label:"\u89D2\u8272",props:"role"},{label:"\u6027\u522B",props:"sex"},{label:"\u5E74\u9F84",props:"age"},{label:"\u64CD\u4F5C",slot:"projectDetail",props:"action",lock:!0,fixed:"right",children:[{label:"\u7F16\u8F91",clickFn:e=>{this.editUserInfo(e)}}]}]},userInfoCopy:{},dialogVisible:!1}},methods:{handleClose(){this.dialogVisible=!1,this.userInfoCopy={}},editUserInfo(e){this.userInfoCopy=this.deepClone(e),this.dialogVisible=!0},submitDialogVisible(){let{user_receive_day_email:e,_id:a}=this.userInfoCopy;n({user_receive_day_email:e,_id:a}).then(i=>{var l,s;this.$message.success(i.msg),(s=(l=this.$refs)==null?void 0:l.TrainPageRef)==null||s.getAddData(),this.handleClose()}).catch(i=>{})}}},o={};var c=r(d,_,p,!1,m,"213db1ea",null,null);function m(e){for(let a in o)this[a]=o[a]}var f=function(){return c.exports}();export{f as default};
