(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4111659d"],{"0d9d":function(t,e,a){},"159b":function(t,e,a){var o=a("da84"),s=a("fdbc"),i=a("17c2"),n=a("9112");for(var c in s){var r=o[c],l=r&&r.prototype;if(l&&l.forEach!==i)try{n(l,"forEach",i)}catch(u){l.forEach=i}}},"17c2":function(t,e,a){"use strict";var o=a("b727").forEach,s=a("a640"),i=a("ae40"),n=s("forEach"),c=i("forEach");t.exports=n&&c?[].forEach:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,e,a){"use strict";var o=a("23e7"),s=a("17c2");o({target:"Array",proto:!0,forced:[].forEach!=s},{forEach:s})},"65f0":function(t,e,a){var o=a("861d"),s=a("e8b5"),i=a("b622"),n=i("species");t.exports=function(t,e){var a;return s(t)&&(a=t.constructor,"function"!=typeof a||a!==Array&&!s(a.prototype)?o(a)&&(a=a[n],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===e?0:e)}},b727:function(t,e,a){var o=a("0366"),s=a("44ad"),i=a("7b0b"),n=a("50c4"),c=a("65f0"),r=[].push,l=function(t){var e=1==t,a=2==t,l=3==t,u=4==t,d=6==t,h=5==t||d;return function(f,m,v,g){for(var p,C,b=i(f),k=s(b),_=o(m,v,3),y=n(k.length),L=0,x=g||c,D=e?x(f,y):a?x(f,0):void 0;y>L;L++)if((h||L in k)&&(p=k[L],C=_(p,L,b),t))if(e)D[L]=C;else if(C)switch(t){case 3:return!0;case 5:return p;case 6:return L;case 2:r.call(D,p)}else if(u)return!1;return d?-1:l||u?u:D}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},d7d5:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("van-nav-bar",{staticClass:"nav",attrs:{title:"首页"}}),a("div",{staticClass:"banner"},[a("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"white"}},t._l(t.bannerData,(function(t,e){return a("van-swipe-item",{key:e},[a("img",{staticClass:"auto-img",attrs:{src:t.url,alt:""}})])})),1)],1),a("div",{staticClass:"home-box"},[a("div",{staticClass:"home-box-item"},[a("div",{staticClass:"line"}),a("h3",[t._v("游戏")]),t._l(t.successBookData,(function(e,o){return a("div",{key:o,staticClass:"home-content-box clearfix",on:{click:function(a){return t.goBookDetail(e._id)}}},[a("div",{staticClass:"home-content-img fl"},[a("img",{staticClass:"auto-img",attrs:{src:t.bookImg[o],alt:""}})]),a("div",{staticClass:"home-content-item fl"},[a("div",{staticClass:"home-content-title"},[t._v(t._s(e.title))]),a("div",{staticClass:"home-content-desc"},[t._v(t._s(e.shortIntro))]),a("div",{staticClass:"home-content-type"},[a("div",{staticClass:"fl clearfix home-type-box"},[a("div",{staticClass:"fl home-content-t"},[t._v(t._s(e.minorCate))]),a("div",{staticClass:"fl home-content-hot"},[a("span",{staticClass:"home-count"},[t._v(t._s(e.latelyFollower))]),t._v(" 人气 ")]),a("div",{staticClass:"home-content-line"})]),a("div",{staticClass:"fr home-ty"},[t._v(t._s(e.majorCate))])])])])}))],2),a("div",{staticClass:"home-btn",on:{click:function(e){return t.goDetail()}}},[t._v("查看更多")])]),a("div",{staticClass:"home-box"},[a("div",{staticClass:"home-box-item"},[a("div",{staticClass:"line"}),a("h3",[t._v("好评榜")]),t._l(t.goodData[0],(function(e,o){return a("div",{key:o,staticClass:"home-content-box clearfix",on:{click:function(a){return t.goBookDetail(e._id)}}},[a("div",{staticClass:"home-content-img fl"},[a("img",{staticClass:"auto-img",attrs:{src:t.goodImg[o],alt:""}})]),a("div",{staticClass:"home-content-item fl"},[a("div",{staticClass:"home-content-title"},[t._v(t._s(e.title))]),a("div",{staticClass:"home-content-desc"},[t._v(t._s(e.shortIntro))]),a("div",{staticClass:"home-content-type"},[a("div",{staticClass:"fl clearfix home-type-box"},[a("div",{staticClass:"fl home-content-t"},[t._v(t._s(e.minorCate))]),a("div",{staticClass:"fl home-content-hot"},[a("span",{staticClass:"home-count"},[t._v(t._s(t.changeNum(e.latelyFollower)))]),t._v(" 人气 ")]),a("div",{staticClass:"home-content-line"})]),a("div",{staticClass:"fr home-ty"},[t._v(t._s(e.majorCate))])])])])}))],2)])],1)},s=[],i=(a("4160"),a("fb6a"),a("159b"),a("1253"),{created:function(){this.getBook(),this.getId()},data:function(){return{bannerData:[{url:"https://plf-new.zhuishushenqi.com/management/images/20200703/3211dec77cad4f0b8a610e49aa4c429b.jpg"},{url:"https://plf-new.zhuishushenqi.com/management/images/20200710/92ded56021924a53a0c3edb73a3e6ea9.jpg"},{url:"https://plf-new.zhuishushenqi.com/management/images/20200710/68002d4b4b334227a4fda1f4cd9990a7.jpg"},{url:"https://plf-new.zhuishushenqi.com/management/images/20200710/19ccd241fee0446a82b328ed13fd8a90.jpg"}],successBookData:[],bookImg:[],id:"",goodData:[],goodImg:[]}},methods:{changeNum:function(t){if(t<1e4)return t;var e=t/1e4;return e<1?e:e>=1&&e<1e4?Math.floor(10*e)/10+"万":Math.floor(e/1e3)/10+"亿"},getBook:function(t){var e=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"http://novel.kele8.cn/category-info",params:{gender:"male",major:"游戏",start:0,limit:4}}).then((function(t){e.$toast.clear(),e.successBookData=t.data.books,t.data.books.forEach((function(t){e.bookImg.push(decodeURIComponent(t.cover).slice(7))}))})).catch((function(t){e.$toast.clear()}))},getId:function(){var t=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"http://novel.kele8.cn/rank-category"}).then((function(e){t.$toast.clear(),t.id=e.data.male[1]._id,t.getGood(t.id)})).catch((function(e){t.$toast.clear()}))},getGood:function(t){var e=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"http://novel.kele8.cn/rank/".concat(t)}).then((function(t){e.$toast.clear(),e.goodData.push(t.data.ranking.books.slice(0,7)),e.goodData[0].forEach((function(t){e.goodImg.push(decodeURIComponent(t.cover).slice(7))}))})).catch((function(t){e.$toast.clear()}))},goBookDetail:function(t){this.$router.push({name:"BookDetail",query:{id:t}})},goDetail:function(){this.$router.push({name:"Detail",query:{major:"游戏",type:"male"}})}}}),n=i,c=(a("ff31"),a("2877")),r=Object(c["a"])(n,o,s,!1,null,"4454c976",null);e["default"]=r.exports},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},ff31:function(t,e,a){"use strict";var o=a("0d9d"),s=a.n(o);s.a}}]);
//# sourceMappingURL=chunk-4111659d.7013f378.js.map