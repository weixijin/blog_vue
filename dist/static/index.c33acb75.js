import{n as r}from"./index.25833e42.js";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"echartsRef",staticClass:"page-echarts",style:t.getStyle})},a=[];const o={components:{},props:{options:{type:Object,default:()=>({})},width:{type:Number,default:0},height:{type:Number,default:0},isAuto:{type:Boolean,default:!0},isAutoWidth:{type:Boolean,default:!1}},data(){return{echartInfo:{}}},watch:{options:{handler(){!this.isAuto||this.init()},deep:!0,immediate:!0}},computed:{getStyle(){const t={height:this.height+"px"};return this.isAutoWidth||(t.width=this.width+"px"),t}},methods:{async init(){await this.sleep(50);let{echartsRef:t}=this.$refs;!t||!echarts||Object.keys(this.options).length===0||(this.echartInfo=echarts.init(t),this.echartInfo.setOption(this.options))}}},s={};var h=r(o,n,a,!1,u,"31201b5e",null,null);function u(t){for(let e in s)this[e]=s[e]}var l=function(){return h.exports}();export{l as default};
