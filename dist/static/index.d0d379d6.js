import{n as s}from"./index.25833e42.js";var _=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"headers_from"},[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.orgTableData,"header-cell-style":{background:"#f5f7fa",color:"#666"},stripe:"",border:""}},[t("el-table-column",{attrs:{prop:"number",label:"\u5E8F\u53F7",width:"80",type:"index",align:"center"}}),t("el-table-column",{attrs:{label:"\u8BBF\u95EE\uFF08\u4EBA\uFF09",prop:"visitPersonCnt","show-overflow-tooltip":"",align:"center"}}),t("el-table-column",{attrs:{label:"\u8BBF\u95EE\uFF08\u6B21\uFF09",prop:"visitCnt","show-overflow-tooltip":"",align:"center"}}),t("el-table-column",{attrs:{label:"\u6848\u4EF6\u641C\u7D22\uFF08\u6B21\uFF09",prop:"caseSearchCnt","show-overflow-tooltip":"",align:"center"}}),t("el-table-column",{attrs:{label:"\u81EA\u5B9A\u4E49\u6807\u7B7E",align:"center"}},[t("el-table-column",{attrs:{label:"\u8BBF\u95EE\uFF08\u6B21\uFF09",prop:"diyRemarkCnt",align:"center"}}),t("el-table-column",{attrs:{label:"\u901A\u8FC7\uFF08\u7EC4\uFF09",prop:"diyRemarkPassCnt",align:"center"}}),t("el-table-column",{attrs:{label:"\u4E0D\u901A\u8FC7\uFF08\u7EC4\uFF09",prop:"diyRemarkNotPassCnt",align:"center"}})],1),t("el-table-column",{attrs:{label:"\u91CF\u5211\u53C2\u8003\u8BBF\u95EE\uFF08\u6B21\uFF09",prop:"allEvidenceCheckCnt","show-overflow-tooltip":"",align:"center"}})],1)],1)},u=[];const d={name:"headers_from",components:{},data(){return{orgTableData:[{visitPersonCnt:100,visitCnt:110,caseSearchCnt:120,diyRemarkCnt:130,diyRemarkPassCnt:140,diyRemarkNotPassCnt:150,allEvidenceCheckCnt:160}],tableColumns:[{key:"visitPersonCnt",name:"\u8BBF\u95EE\uFF08\u4EBA\uFF09",minWidth:90},{key:"visitCnt",name:"\u8BBF\u95EE\uFF08\u6B21\uFF09",minWidth:90},{key:"caseSearchCnt",name:"\u6848\u4EF6\u641C\u7D22\uFF08\u6B21\uFF09",minWidth:90},{name:"\u81EA\u5B9A\u4E49\u6807\u7B7E",children:[{key:"diyRemarkCnt",name:"\u8BBF\u95EE\uFF08\u6B21\uFF09",minWidth:90},{key:"diyRemarkPassCnt",name:"\u901A\u8FC7\uFF08\u7EC4\uFF09",minWidth:90},{key:"diyRemarkNotPassCnt",name:"\u4E0D\u901A\u8FC7\uFF08\u7EC4\uFF09",minWidth:95}]},{key:"allEvidenceCheckCnt",name:"\u91CF\u5211\u53C2\u8003\u8BBF\u95EE\uFF08\u6B21\uFF09",minWidth:90}]}},methods:{}},i={};var v=s(d,_,u,!1,h,null,null,null);function h(e){for(let a in i)this[a]=i[a]}var f=function(){return v.exports}(),y=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"demo"},[e._v("form_synthesis")])},b=[];const C={name:"demo",components:{},data(){return{}},methods:{}},o={};var k=s(C,y,b,!1,g,null,null,null);function g(e){for(let a in o)this[a]=o[a]}var $=function(){return k.exports}(),w=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"defaultFormCom"},[t("kl-input",{attrs:{min:"1",max:"10",type:"number"},model:{value:e.val,callback:function(n){e.val=n},expression:"val"}}),t("br"),e._v(" "+e._s(e.val)+" ")],1)},x=[];const R={components:{},data(){return{val:""}},methods:{}},c={};var S=s(R,w,x,!1,j,null,null,null);function j(e){for(let a in c)this[a]=c[a]}var D=function(){return S.exports}(),M=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{},[t("el-table",{staticClass:"tableArea",staticStyle:{width:"100%"},attrs:{border:"",data:e.listData,"span-method":e.objectSpanMethod}},[t("el-table-column",{attrs:{align:"center","header-align":"center",prop:"type",label:"\u5E8F\u53F7",width:"50"}}),t("el-table-column",{attrs:{align:"center","header-align":"center",prop:"sheetType",label:"\u5DE5\u5355\u7C7B\u578B"}}),t("el-table-column",{attrs:{align:"center","header-align":"center",prop:"taskKey",label:"taskKey"}}),t("el-table-column",{attrs:{align:"center","header-align":"center",prop:"templateUrl",label:"templateUrl"}}),t("el-table-column",{attrs:{width:"150px",align:"center","header-align":"center",label:"\u64CD\u4F5C"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"\u4FEE\u6539",placement:"top-start"}},[t("i",{staticClass:"el-icon-edit-outline",on:{click:function(l){return e.modify(n)}}})]),t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"\u5220\u9664",placement:"top-start"}},[t("i",{staticClass:"el-icon-delete",on:{click:function(l){return e.deleteData(n)}}})])]}}])})],1)],1)},F=[];const N={name:"myNeedDeal",data(){return{rowList:[],spanArr:[],position:0,listData:[]}},methods:{modify(e){},deleteData(e){},queryData(){this.listData=[{id:1,type:1,sheetType:"\u4E8B\u4EF6\u5355",taskKey:"shijian_01",templateUrl:"/shijian_01"},{id:2,type:1,sheetType:"\u4E8B\u4EF6\u5355",taskKey:"shijian_02",templateUrl:"/shijian_02"},{id:3,type:1,sheetType:"\u4E8B\u4EF6\u5355",taskKey:"shijian_03",templateUrl:"/shijian_04"},{id:4,type:2,sheetType:"\u95EE\u9898\u5355",taskKey:"wenti_01",templateUrl:"/wenti_01"},{id:5,type:2,sheetType:"\u95EE\u9898\u5355",taskKey:"wenti_02",templateUrl:"/wenti_02"},{id:6,type:2,sheetType:"\u95EE\u9898\u5355",taskKey:"wenti_03",templateUrl:"/wenti_03"}],this.rowspan()},rowspan(){this.listData.forEach((e,a)=>{a===0?(this.spanArr.push(1),this.position=0):this.listData[a].type===this.listData[a-1].type?(this.spanArr[this.position]+=1,this.spanArr.push(0)):(this.spanArr.push(1),this.position=a)})},objectSpanMethod({row:e,column:a,rowIndex:t,columnIndex:n}){if(n===0){const l=this.spanArr[t],r=l>0?1:0;return{rowspan:l,colspan:r}}if(n===1){const l=this.spanArr[t],r=l>0?1:0;return{rowspan:l,colspan:r}}}},mounted(){this.queryData()}},m={};var K=s(N,M,F,!1,E,null,null,null);function E(e){for(let a in m)this[a]=m[a]}var P=function(){return K.exports}(),T=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"demo"},[t("el-button",{on:{click:e.openKlMessage}},[e._v(" openMessage ")]),t("kl-tab",{attrs:{options:e.tabOptions},on:{change:e.changeCom},model:{value:e.activeName,callback:function(n){e.activeName=n},expression:"activeName"}}),t("div",{staticClass:"main"},[t(e.activeName,{tag:"component"})],1)],1)},A=[];const U={name:"demo",components:{headersFrom:f,formSynthesis:$,rowMerge:P,defaultFormCom:D},data(){return{activeName:"defaultFormCom",tabOptions:[{value:"defaultFormCom",label:"\u57FA\u7840\u63A7\u4EF6"},{value:"headersFrom",label:"\u591A\u7EA7\u8868\u5934"},{value:"rowMerge",label:"\u884C\u5408\u5E76"},{value:"formSynthesis",label:"\u7EFC\u5408"}]}},methods:{changeCom(e){this.activeName=e},openKlMessage(){this$klMessage("444")}}},p={};var W=s(U,T,A,!1,q,"da7861c2",null,null);function q(e){for(let a in p)this[a]=p[a]}var z=function(){return W.exports}();export{z as default};
