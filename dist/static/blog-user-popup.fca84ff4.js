import{n as o}from"./index.25833e42.js";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-popup",{staticClass:"user-popup",style:{height:t.height+"px"},attrs:{duration:.3,"get-container":"body","overlay-style":{background:"transparent"},position:"bottom"},on:{closed:t.closed},model:{value:t.value,callback:function(i){t.value=i},expression:"value"}},[n("div",{staticClass:"flex-wrap flex-justify-center",style:{height:t.height+"px"},on:{click:t.closed}},[n("div",{staticClass:"main",on:{click:function(i){return i.stopPropagation(),function(){}.apply(null,arguments)}}})])])},l=[];const r={props:{id:{type:String,default:""},value:{type:Boolean,default:!1}},data(){return{height:400}},watch:{value(t){this.id&&t&&this.init()}},methods:{closed(){this.$emit("input",!1)},init(){this.setHeight()},async setHeight(){await this.$nextTick();let t=document.documentElement.clientHeight||document.body.clientHeight;this.height=(t-438)/2+438}}},s={};var c=o(r,a,l,!1,u,"7f9e27fa",null,null);function u(t){for(let e in s)this[e]=s[e]}var h=function(){return c.exports}();export{h as default};
