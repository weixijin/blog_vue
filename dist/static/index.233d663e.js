import{n as o,_ as t}from"./index.25833e42.js";var r=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"others"},[a("kl-tab",{attrs:{options:e.tabOptions},on:{change:e.changeCom},model:{value:e.activeName,callback:function(i){e.activeName=i},expression:"activeName"}}),a("div",{staticClass:"main"},[a("keep-alive",[a("transition",{attrs:{mode:"out-in",appear:"","enter-active-class":"animate__animated animate__fadeInLeft","leave-active-class":"animate__animated animate__fadeOutRight"}},[a(e.activeName,{tag:"component",staticStyle:{"animation-duration":"500ms"}})],1)],1)],1)],1)},l=[];const s={components:{Form:()=>t(()=>import("./form.4d23a7ce.js"),["static/form.4d23a7ce.js","static/form.40ada9e1.css","static/index.25833e42.js","static/index.8776284e.css"]),Bar:()=>t(()=>import("./bar.cc2c144d.js"),["static/bar.cc2c144d.js","static/index.25833e42.js","static/index.8776284e.css"]),Nav:()=>t(()=>import("./nav.b022cb24.js"),["static/nav.b022cb24.js","static/index.25833e42.js","static/index.8776284e.css"]),Menu:()=>t(()=>import("./menu.ba7f5f6d.js"),["static/menu.ba7f5f6d.js","static/menu.7be85d5e.css","static/index.25833e42.js","static/index.8776284e.css"]),Table:()=>t(()=>import("./table.8efe8a5d.js"),["static/table.8efe8a5d.js","static/index.25833e42.js","static/index.8776284e.css"])},data(){return{activeName:"Table",tabOptions:[{value:"Table",label:"\u7FA4\u53D1\u4F18\u5316\u9879"},{value:"Menu",label:"menu\u6A2A\u5411nav"},{value:"Nav",label:"\u6A2A\u5411\u6EDA\u52A8"},{value:"Bar",label:"\u6EDA\u52A8\u6761"},{value:"Form",label:"\u8868\u5355\u76F8\u5173"}]}},methods:{changeCom(e){this.activeName=e}}},_={};var v=o(s,r,l,!1,m,"78999822",null,null);function m(e){for(let n in _)this[n]=_[n]}var u=function(){return v.exports}();export{u as default};
