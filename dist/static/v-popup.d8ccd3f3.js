import{n as l}from"./index.25833e42.js";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("van-popup",{style:{height:`${e.height}`,width:`${e.width}`},attrs:{position:e.position,"get-container":e.getContainer,overlay:e.overlay,"close-on-click-overlay":e.closeOnClickOverlay,duration:e.duration},model:{value:e.value,callback:function(a){e.value=a},expression:"value"}},[e._t("default")],2)},i=[];const u={props:{value:{type:Boolean,default:!1},height:{type:String,default:"50%"},width:{type:String,default:"100%"},position:{type:String,default:"bottom"},"get-container":{type:String,default:"body"},overlay:{type:Boolean,default:!0},"close-on-click-overlay":{type:Boolean,default:!0},duration:{type:Number,default:.4}},data(){return{}},watch:{value(e){e||this.$emit("close"),this.$emit("input",e)}},methods:{}},o={};var s=l(u,r,i,!1,c,null,null,null);function c(e){for(let t in o)this[t]=o[t]}var v=function(){return s.exports}();export{v as default};
