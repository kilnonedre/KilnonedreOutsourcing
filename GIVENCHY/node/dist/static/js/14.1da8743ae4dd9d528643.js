webpackJsonp([14],{X7sC:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("mtWM"),a={data:function(){return{swiperList:[]}},beforeMount:function(){var t=this;Object(n.a)({method:"get",url:"http://localhost:3001/home/FieldExample"}).then(function(e){e.data.map(function(t){t.content="http://localhost:3001/"+t.url}),t.swiperList=e.data})}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{attrs:{id:"root"}},t._l(t.swiperList,function(e){return s("div",{key:e._id,staticClass:"item"},[s("img",{staticClass:"itemImg",attrs:{src:e.content}}),t._v(" "),t._m(0,!0)])}),0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"userInfo"},[e("span",{staticClass:"username"},[this._v("现场实拍")])])}]};var r=s("VU/8")(a,i,!1,function(t){s("ZDsI")},"data-v-12c16aca",null);e.default=r.exports},ZDsI:function(t,e){}});