(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ccd47ed6"],{"159b":function(t,a,s){var i=s("da84"),e=s("fdbc"),o=s("17c2"),n=s("9112");for(var r in e){var c=i[r],l=c&&c.prototype;if(l&&l.forEach!==o)try{n(l,"forEach",o)}catch(f){l.forEach=o}}},"17c2":function(t,a,s){"use strict";var i=s("b727").forEach,e=s("a640"),o=s("ae40"),n=e("forEach"),r=o("forEach");t.exports=n&&r?[].forEach:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,a,s){"use strict";var i=s("23e7"),e=s("17c2");i({target:"Array",proto:!0,forced:[].forEach!=e},{forEach:e})},"65f0":function(t,a,s){var i=s("861d"),e=s("e8b5"),o=s("b622"),n=o("species");t.exports=function(t,a){var s;return e(t)&&(s=t.constructor,"function"!=typeof s||s!==Array&&!e(s.prototype)?i(s)&&(s=s[n],null===s&&(s=void 0)):s=void 0),new(void 0===s?Array:s)(0===a?0:a)}},a6b6:function(t,a,s){},b727:function(t,a,s){var i=s("0366"),e=s("44ad"),o=s("7b0b"),n=s("50c4"),r=s("65f0"),c=[].push,l=function(t){var a=1==t,s=2==t,l=3==t,f=4==t,u=6==t,b=5==t||u;return function(h,d,v,m){for(var p,C,g=o(h),y=e(g),k=i(d,v,3),L=n(y.length),S=0,x=m||r,_=a?x(h,L):s?x(h,0):void 0;L>S;S++)if((b||S in y)&&(p=y[S],C=k(p,S,g),t))if(a)_[S]=C;else if(C)switch(t){case 3:return!0;case 5:return p;case 6:return S;case 2:c.call(_,p)}else if(f)return!1;return u?-1:l||f?f:_}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},c84b:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"detail"},[s("div",{staticClass:"nav"},[s("van-nav-bar",{staticClass:"nav-item",attrs:{fixed:"",title:t.major,"left-text":"返回","left-arrow":""},on:{"click-left":t.back}})],1),s("div",{staticClass:"tabs-box"},[t.isShow?s("div",{staticClass:"tabs-list"},[s("ul",t._l(t.bookData,(function(a,i){return s("li",{key:i,staticClass:"tabs-li",on:{click:function(s){return t.goBookDetail(a._id)}}},[s("div",{staticClass:"tabs-list-box clearfix"},[s("div",{staticClass:"fl tabs-box-img"},[s("img",{staticClass:"auto-img",attrs:{src:t.bookImg[i],alt:""}})]),s("div",{staticClass:"fl tabs-box-content"},[s("div",{staticClass:"tabs-content-top"},[s("div",{staticClass:"tabs-content-title"},[t._v(t._s(a.title))]),s("div",{staticClass:"tabs-content-item"},[s("span",{staticClass:"tabs-content-list author fl"},[t._v(t._s(a.author))]),s("span",{staticClass:"tabs-content-list line fl"}),s("span",{staticClass:"tabs-content-list fl"},[t._v(t._s(a.majorCate))])]),s("div",{staticClass:"tabs-content-desc"},[t._v(t._s(a.shortIntro))])]),s("div",{staticClass:"tabs-content-btm clearfix"},[s("span",{staticClass:"tabs-btm-item hot fl"},[s("span",{staticClass:"tabs-col hot-count"},[t._v(t._s(t.changeNum(a.latelyFollower)))]),t._v(" 人气 ")]),s("span",{staticClass:"tabs-btm-item tabs-content-line fl"}),s("span",{staticClass:"tabs-btm-item advice fl"},[s("span",{staticClass:"tabs-col advice-count"},[t._v(t._s(a.retentionRatio)+"%")]),t._v("读者留存 ")])])])])])})),0)]):s("div",[s("van-empty",{attrs:{description:"暂时没有书籍看看其它的吧"}})],1)])])},e=[],o=(s("4160"),s("fb6a"),s("159b"),{data:function(){return{active:0,major:"",type:"",classifyData:[],minor:"",bookData:[],bookImg:[],isShow:!0}},created:function(){this.major=this.$route.query.major,this.type=this.$route.query.type,this.getClassify()},methods:{changeNum:function(t){if(t<1e4)return t;var a=t/1e4;return a<1?a:a>=1&&a<1e4?Math.floor(10*a)/10+"万":Math.floor(a/1e3)/10+"亿"},getClassify:function(){var t=this;this.$toast.loading({message:"加载中",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"http://novel.kele8.cn/sub-categories"}).then((function(a){t.$toast.clear();for(var s=0;s<a.data[t.type].length;s++)if(a.data[t.type][s].major==t.major){t.classifyData=a.data[t.type][s].mins;break}t.getDetail()})).catch((function(a){t.$toast.clear()}))},getDetail:function(){var t=this;this.$toast.loading({message:"加载中",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"http://novel.kele8.cn/category-info",params:{gender:this.type,major:this.major,start:0,limit:20}}).then((function(a){t.$toast.clear(),200==a.status&&(t.bookData=a.data.books,0==t.bookData.length&&(t.isShow=!1),a.data.books.forEach((function(a){t.bookImg.push(decodeURIComponent(a.cover).slice(7))})))})).catch((function(a){t.$toast.clear()}))},back:function(){this.$router.go(-1)},goBookDetail:function(t){this.$router.push({name:"BookDetail",query:{id:t}})}}}),n=o,r=(s("c8e1"),s("2877")),c=Object(r["a"])(n,i,e,!1,null,"0a882bb2",null);a["default"]=c.exports},c8e1:function(t,a,s){"use strict";var i=s("a6b6"),e=s.n(i);e.a},fdbc:function(t,a){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-ccd47ed6.be41003b.js.map