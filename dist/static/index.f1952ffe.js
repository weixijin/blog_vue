import{n as r}from"./index.25833e42.js";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"move-to"},[e._t("default")],2)},l=[];const i={name:"move-to",props:{to:{type:String,default:"body"}},async mounted(){console.log(88888),await this.$nextTick(),console.log(123,this.$el),document.querySelector(this.to).appendChild(this.$el)},beforeDestroy(){this.$el.parentNode.removeChild(this.$el)}},o={};var a=r(i,s,l,!1,c,null,null,null);function c(e){for(let t in o)this[t]=o[t]}var u=function(){return a.exports}();export{u as m};
