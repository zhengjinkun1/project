(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d221fb8"],{cd56:function(a,t,i){"use strict";i.r(t);var e=function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"main"},[i("van-tabbar",{attrs:{"active-color":"#b83320"},on:{change:a.toggleBar},model:{value:a.active,callback:function(t){a.active=t},expression:"active"}},a._l(a.tabbarData,(function(t,e){return i("van-tabbar-item",{key:e,attrs:{icon:t.icon}},[a._v(a._s(t.title))])})),1),i("router-view")],1)},n=[],r=(i("fb6a"),{data:function(){return{active:0,tabbarData:[{title:"首页",icon:"home-o",url:"Home",skip:"/main/home"},{title:"分类",icon:"apps-o",url:"Classify",skip:"/main/classify"},{title:"排行",icon:"bar-chart-o",url:"Ranking",skip:"/main/ranking"},{title:"搜索",icon:"search",url:"Search",skip:"/main/search"}]}},created:function(){for(var a=location.hash.slice(1),t=0;t<this.tabbarData.length;t++)if(this.tabbarData[t].skip==a){this.active=t;break}},methods:{toggleBar:function(a){this.$router.push({name:this.tabbarData[a].url})}}}),c=r,o=i("2877"),s=Object(o["a"])(c,e,n,!1,null,"3b70cc28",null);t["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d221fb8.374e80f8.js.map