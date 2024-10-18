import{n as o}from"./index.25833e42.js";var c=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("el-dialog",{attrs:{visible:e.value,width:"1200px"},on:{"update:visible":function(t){e.value=t}}},[a("div",{staticClass:"dialog-main"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"\u5DE5\u4F5C\u8868\u683C",name:"1"}}),a("el-tab-pane",{attrs:{label:"\u901A\u7528\u8868\u683C",name:"2"}})],1),a("div",{staticClass:"flex-wrap m-b-20 m-t-10"},[a("el-input",{nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.oldTableDataCreate.apply(null,arguments)}},model:{value:e.oldTableData,callback:function(t){e.oldTableData=t},expression:"oldTableData"}})],1),+e.activeName==1?[a("el-table",{attrs:{"max-height":"550",height:"550",border:"",data:e.tableData}},[e._l(e.tableLineOption,function(t,l){return a("el-table-column",{key:t.value,attrs:{prop:t.value,label:t.title,width:l==1?"200":""},scopedSlots:e._u([{key:"default",fn:function(n){var i=n.row;return[l==0?a("el-input",{attrs:{type:t.type||"text",placeholder:"\u8BF7\u8F93\u5165"},model:{value:i[t.value],callback:function(r){e.$set(i,t.value,r)},expression:"row[item.value]"}}):e._e(),l==1?a("el-input-number",{attrs:{"controls-position":"right",min:0,max:100,placeholder:"\u8BF7\u8F93\u5165"},model:{value:i[t.value],callback:function(r){e.$set(i,t.value,r)},expression:"row[item.value]"}}):e._e()]}}],null,!0)})}),a("el-table-column",{attrs:{prop:"address",label:"\u64CD\u4F5C",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){return e.addTableLine(l)}}},[e._v(" \u65B0\u589E ")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){return e.delTableLine(l)}}},[e._v(" \u5220\u9664 ")])]}}],null,!1,949203139)})],2)]:e._e(),+e.activeName==2?[a("div",{staticClass:"flex-center-wrap"},[a("div",{staticClass:"m-r-10 flex-0"},[e._v("\u8868\u5934\u914D\u7F6E")]),e._l(e.dynamicTags,function(t){return a("el-tag",{key:t,staticClass:"m-r-10",attrs:{closable:"","disable-transitions":!1},on:{close:function(l){return e.delTag(t)}}},[e._v(" "+e._s(t)+" ")])}),e.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag w-200",attrs:{size:"small"},on:{blur:e.handleInputConfirm},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleInputConfirm.apply(null,arguments)}},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:e.showInput}},[e._v("+ New Tag")])],2),a("el-table",{staticClass:"m-t-10",attrs:{"max-height":"508",height:"508",border:"",data:e.tableData}},[e._l(e.tableLineOption,function(t,l){return a("el-table-column",{key:t.value,attrs:{prop:t.value,label:t.title,width:l==1?"200":""},scopedSlots:e._u([{key:"default",fn:function(n){var i=n.row;return[l==0?a("el-input",{attrs:{type:t.type||"text",placeholder:"\u8BF7\u8F93\u5165"},model:{value:i[t.value],callback:function(r){e.$set(i,t.value,r)},expression:"row[item.value]"}}):e._e(),l==1?a("el-input-number",{attrs:{"controls-position":"right",min:0,max:100,placeholder:"\u8BF7\u8F93\u5165"},model:{value:i[t.value],callback:function(r){e.$set(i,t.value,r)},expression:"row[item.value]"}}):e._e()]}}],null,!0)})}),a("el-table-column",{attrs:{prop:"address",label:"\u64CD\u4F5C",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){return e.addTableLine(l)}}},[e._v(" \u65B0\u589E ")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){return e.delTableLine(l)}}},[e._v(" \u5220\u9664 ")])]}}],null,!1,949203139)})],2)]:e._e()],2),a("div",{staticClass:"dialog-footer p-r-20 flex-wrap flex-center-wrap flex-justify-between p-l-20",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"c-danger f-14"},[e._v("\u6CE8\u610F\u91CD\u65B0\u8D4B\u503C\u65F6\uFF0C\u53EA\u8981\u8868\u4F53\u7684\u6570\u636E")]),+e.activeName==1?a("div",{staticClass:"c-danger f-14 m-l-20"},[e._v(" \u603B\u65F6\u957F"+e._s(e.getNumbers)+" ")]):e._e(),a("div",[a("el-button",{staticClass:"m-t-10",attrs:{type:"success"},on:{click:e.createLineData}},[e._v(" \u751F\u6210\u8868\u683C ")]),a("el-button",{attrs:{type:"danger"},on:{click:e.clear}},[e._v("\u6E05\u7A7A")])],1)])])},p=[];const d={props:{value:{type:Boolean,default:!1}},data(){return{dynamicTags:[],inputVisible:!1,inputValue:"",activeName:"1",oldTableData:"",tableData:[{kl_0:"",kl_1:"",id:0}],tableLineOption:[{title:"\u4EFB\u52A1\u5B89\u6392",value:"kl_0"},{title:"\u65F6\u95F4\u5B89\u6392(day)",value:"kl_1",type:"number"}]}},watch:{value(e){e||this.$emit("input",!1)}},computed:{getNumbers(){return this.tableData.reduce((e,s)=>e+Number(s.kl_1),0)}},methods:{delTag(e){this.dynamicTags.splice(this.dynamicTags.indexOf(e),1)},showInput(){this.inputVisible=!0,this.$nextTick(e=>{this.$refs.saveTagInput.$refs.input.focus()})},handleInputConfirm(){let e=this.inputValue;e&&this.dynamicTags.push(e),this.inputVisible=!1,this.inputValue=""},handleClick(){},delTableLine({id:e}){this.tableData=this.tableData.filter(s=>s.id!==e)},addTableLine(e){let{id:s}=e,a=this.tableData.findIndex(l=>l.id==s),t={id:this.createId(),kl_0:"",kl_1:""};this.tableData.splice(a+1,0,t)},clear(){this.tableData=[{kl_0:"",kl_1:"",id:0}]},oldTableDataCreate(){this.tableData=[];let{oldTableData:e}=this;e=e.slice(1,e.length-1),e.split("| |").forEach(a=>{let t=a.split("|");this.tableData.push({kl_0:t[0],kl_1:t[1],id:this.createId()})})},async createLineData(){let e="|",s="|-|-|",a=0,{tableLineOption:t,tableData:l}=this;t.forEach(n=>{e+=n.title+"|"}),e+=`
`,e+=s,l.forEach(n=>{e+=`
`,e+="|",t.forEach(i=>{e+=n[i.value]+"|",i.value==="kl_1"&&(a+=Number(n[i.value]))})}),e+=`
`,e+=`|\u5408\u8BA1|${a}\u5929|`,this.copyText(e).then(n=>{this.$message.success("\u590D\u5236\u6210\u529F")}).catch(n=>{this.$message.error("\u590D\u5236\u5931\u8D25")})}}},u={};var b=o(d,c,p,!1,v,"43f88bcc",null,null);function v(e){for(let s in u)this[s]=u[s]}var _=function(){return b.exports}();export{_ as default};
