import{n as l}from"./index.25833e42.js";var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{class:["e-input pr",e.type==="number"?"e-input-number":""]},[t("el-input",{attrs:{min:e.min,placeholder:e.placeholder,type:e.type},on:{input:e.change},model:{value:e.eValue,callback:function(n){e.eValue=e._n(n)},expression:"eValue"}}),t("div",{staticClass:"e-input-number-right-icons"},[t("div",{staticClass:"e-input-number-right-icon flex-center",on:{click:function(n){return e.valueChange(1)}}},[t("i",{staticClass:"el-icon-caret-top"})]),t("div",{staticClass:"e-input-number-right-icon flex-center",on:{click:function(n){return e.valueChange(-1)}}},[t("i",{staticClass:"el-icon-caret-bottom"})])])],1)},s=[];const c={props:{placeholder:{type:String,default:""},value:{type:[Number,String],default:0},type:{type:String,default:"number"},max:{type:[Number,String],default:"no"},min:{type:[Number,String],default:"no"}},data(){return{eValue:this.value}},watch:{value(e){this.eValue=e}},methods:{change(){this.$emit("input",this.eValue)},valueChange(e){let{value:a,max:t,min:n}=this,i=a+e;typeof t=="number"&&i>t&&(i=t),typeof n=="number"&&i<n&&(i=n),this.$emit("input",i)}}},u={};var o=l(c,r,s,!1,p,null,null,null);function p(e){for(let a in u)this[a]=u[a]}var v=function(){return o.exports}();export{v as default};
