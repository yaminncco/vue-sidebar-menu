!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["vue-sidebar-menu"]=e():t["vue-sidebar-menu"]=e()}(window,function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/dist/",i(i.s=4)}([function(t,e,i){},function(t,e,i){var n=i(2);t.exports=u,t.exports.parse=o,t.exports.compile=function(t,e){return r(o(t,e))},t.exports.tokensToFunction=r,t.exports.tokensToRegExp=d;var s=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function o(t,e){for(var i,n=[],o=0,l=0,r="",m=e&&e.delimiter||"/";null!=(i=s.exec(t));){var c=i[0],d=i[1],u=i.index;if(r+=t.slice(l,u),l=u+c.length,d)r+=d[1];else{var p=t[l],f=i[2],v=i[3],b=i[4],g=i[5],w=i[6],_=i[7];r&&(n.push(r),r="");var x=null!=f&&null!=p&&p!==f,C="+"===w||"*"===w,y="?"===w||"*"===w,I=i[2]||m,S=b||g;n.push({name:v||o++,prefix:f||"",delimiter:I,optional:y,repeat:C,partial:x,asterisk:!!_,pattern:S?h(S):_?".*":"[^"+a(I)+"]+?"})}}return l<t.length&&(r+=t.substr(l)),r&&n.push(r),n}function l(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function r(t){for(var e=new Array(t.length),i=0;i<t.length;i++)"object"==typeof t[i]&&(e[i]=new RegExp("^(?:"+t[i].pattern+")$"));return function(i,s){for(var o="",r=i||{},a=(s||{}).pretty?l:encodeURIComponent,h=0;h<t.length;h++){var m=t[h];if("string"!=typeof m){var c,d=r[m.name];if(null==d){if(m.optional){m.partial&&(o+=m.prefix);continue}throw new TypeError('Expected "'+m.name+'" to be defined')}if(n(d)){if(!m.repeat)throw new TypeError('Expected "'+m.name+'" to not repeat, but received `'+JSON.stringify(d)+"`");if(0===d.length){if(m.optional)continue;throw new TypeError('Expected "'+m.name+'" to not be empty')}for(var u=0;u<d.length;u++){if(c=a(d[u]),!e[h].test(c))throw new TypeError('Expected all "'+m.name+'" to match "'+m.pattern+'", but received `'+JSON.stringify(c)+"`");o+=(0===u?m.prefix:m.delimiter)+c}}else{if(c=m.asterisk?encodeURI(d).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}):a(d),!e[h].test(c))throw new TypeError('Expected "'+m.name+'" to match "'+m.pattern+'", but received "'+c+'"');o+=m.prefix+c}}else o+=m}return o}}function a(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function h(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function m(t,e){return t.keys=e,t}function c(t){return t.sensitive?"":"i"}function d(t,e,i){n(e)||(i=e||i,e=[]);for(var s=(i=i||{}).strict,o=!1!==i.end,l="",r=0;r<t.length;r++){var h=t[r];if("string"==typeof h)l+=a(h);else{var d=a(h.prefix),u="(?:"+h.pattern+")";e.push(h),h.repeat&&(u+="(?:"+d+u+")*"),l+=u=h.optional?h.partial?d+"("+u+")?":"(?:"+d+"("+u+"))?":d+"("+u+")"}}var p=a(i.delimiter||"/"),f=l.slice(-p.length)===p;return s||(l=(f?l.slice(0,-p.length):l)+"(?:"+p+"(?=$))?"),l+=o?"$":s&&f?"":"(?="+p+"|$)",m(new RegExp("^"+l,c(i)),e)}function u(t,e,i){return n(e)||(i=e||i,e=[]),i=i||{},t instanceof RegExp?function(t,e){var i=t.source.match(/\((?!\?)/g);if(i)for(var n=0;n<i.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return m(t,e)}(t,e):n(t)?function(t,e,i){for(var n=[],s=0;s<t.length;s++)n.push(u(t[s],e,i).source);return m(new RegExp("(?:"+n.join("|")+")",c(i)),e)}(t,e,i):function(t,e,i){return d(o(t,i),e,i)}(t,e,i)}},function(t,e){t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}},function(t,e,i){"use strict";var n=i(0);i.n(n).a},function(t,e,i){"use strict";i.r(e);var n=i(1),s=i.n(n),o={methods:{expandEnter:function(t){t.style.height=t.scrollHeight+"px"},expandAfterEnter:function(t){t.style.height="auto"},expandBeforeLeave:function(t){!this.isCollapsed||!this.isFirstLevel&&void 0!==this.level?t.style.height=t.scrollHeight+"px":t.style.display="none"}}};function l(t,e,i,n,s,o,l,r){var a,h="function"==typeof t?t.options:t;if(e&&(h.render=e,h.staticRenderFns=i,h._compiled=!0),n&&(h.functional=!0),o&&(h._scopeId="data-v-"+o),l?(a=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(l)},h._ssrRegister=a):s&&(a=r?function(){s.call(this,this.$root.$options.shadowRoot)}:s),a)if(h.functional){h._injectStyles=a;var m=h.render;h.render=function(t,e){return a.call(e),m(t,e)}}else{var c=h.beforeCreate;h.beforeCreate=c?[].concat(c,a):[a]}return{exports:t,options:h}}var r=l({name:"SidebarMenuItem",mixins:[{data:function(){return{active:!1,exactActive:!1,itemShow:!1,itemHover:!1}},created:function(){this.item.header||this.item.component||(this.initState(),this.$router||window.addEventListener("hashchange",this.initState))},destroyed:function(){this.$router||window.removeEventListener("hashchange",this.initState)},methods:{isLinkActive:function(t){return this.matchRoute(t)||this.isChildActive(t.child)||this.isAliasActive(t)},isLinkExactActive:function(t){return this.matchExactRoute(t.href)},isChildActive:function(t){var e=this;return!!t&&t.some(function(t){return e.isLinkActive(t)})},isAliasActive:function(t){if(t.alias){var e=this.$router?this.$route.fullPath:window.location.pathname+window.location.search+window.location.hash;return Array.isArray(t.alias)?t.alias.some(function(t){return s()(t).test(e)}):s()(t.alias).test(e)}return!1},matchRoute:function(t){var e=t.href,i=t.exactPath;if(!e)return!1;if(this.$router){var n=this.$router.resolve(e).route;return i?n.path===this.$route.path:this.matchExactRoute(e)}return i?e===window.location.pathname:this.matchExactRoute(e)},matchExactRoute:function(t){return!!t&&(this.$router?this.$router.resolve(t).route.fullPath===this.$route.fullPath:t===window.location.pathname+window.location.search+window.location.hash)},clickEvent:function(t){if(!this.item.disabled){if(this.mobileItem&&this.mobileItem===this.item||this.isCollapsed&&this.isFirstLevel&&!this.isMobileItem&&!this.item.disabled&&this.$emit("set-mobile-item",{item:this.item,itemEl:t.currentTarget.offsetParent}),this.emitItemClick(t,this.item),this.isCollapsed&&this.isFirstLevel&&!this.isMobileItem){if(this.hover)return;this.$emit("unset-mobile-item",!0,void 0!==this.item.child)}if(!this.showChild)if(this.showOneChild)if(!this.item.child&&this.activeShow)this.emitActiveShow(null);else{if(this.isMobileItem)return;this.item.href&&!this.exactActive||(this.activeShow===this.item?this.emitActiveShow(null):this.emitActiveShow(this.item))}else this.item.child&&(this.item.href&&!this.exactActive||(this.itemShow=!this.itemShow))}},initState:function(){this.initActiveState(),this.initShowState()},initActiveState:function(){this.active=this.isLinkActive(this.item),this.exactActive=this.isLinkExactActive(this.item)},initShowState:function(){if(this.item.child&&this.active&&!this.show){if(this.showChild)return;this.showOneChild?this.emitActiveShow(this.item):this.itemShow=!0}},mouseEnterEvent:function(t){t.stopPropagation(),this.item.disabled||(this.itemHover=!0,this.isMobileItem||this.hover||this.isCollapsed&&this.isFirstLevel&&!this.isMobileItem&&!this.item.disabled&&this.$emit("set-mobile-item",{item:this.item,itemEl:t.currentTarget}))},mouseLeaveEvent:function(t){t.stopPropagation(),this.itemHover=!1}},computed:{isRouterLink:function(){return!0===(this.$router&&this.item&&void 0!==this.item.href&&!this.item.external)},isFirstLevel:function(){return 1===this.level},show:function(){return!!this.item.child&&(!(!this.showChild&&!this.isMobileItem)||(this.isFirstLevel&&this.showOneChild?this.item===this.activeShow:this.itemShow))},itemLinkClass:function(){return["vsm--link",this.isMobileItem?"":"vsm--link_level-"+this.level,{"vsm--link_mobile-item":this.isMobileItem},{"vsm--link_hover":this.hover},{"vsm--link_active":this.active},{"vsm--link_exact-active":this.exactActive},{"vsm--link_disabled":this.item.disabled},this.item.class]},isItemHidden:function(){return this.isCollapsed?!(!this.item.hidden||void 0!==this.item.hiddenOnCollapse)||!0===this.item.hiddenOnCollapse:!0===this.item.hidden},itemLinkHref:function(){return(this.$router||this.item.href&&"string"==typeof this.item.href)&&this.item.href?this.item.href:""},hover:function(){return this.isCollapsed&&this.isFirstLevel?this.item===this.mobileItem:this.itemHover}},watch:{$route:function(){var t=this;setTimeout(function(){t.item.header||t.item.component||t.initState()},1)},item:function(t,e){this.emitItemUpdate(t,e)}},inject:["emitActiveShow","emitItemClick","emitItemUpdate"]},o],props:{item:{type:Object,required:!0},level:{type:Number,default:1},isCollapsed:{type:Boolean},isMobileItem:{type:Boolean,default:!1},mobileItem:{type:Object,default:null},activeShow:{type:Object,default:null},showChild:{type:Boolean,default:!1},showOneChild:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},disableHover:{type:Boolean,default:!1}}},function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.item.component&&!t.isItemHidden?i(t.item.component,t._b({tag:"component"},"component",t.item.props,!1)):t.item.header&&!t.isItemHidden?i("div",t._b({staticClass:"vsm--header",class:t.item.class},"div",t.item.attributes,!1),[t._v("\n  "+t._s(t.item.title)+"\n")]):t.isItemHidden?t._e():i("div",t._g({staticClass:"vsm--item",class:[{"vsm--item_open":t.show}],on:{mouseout:t.mouseLeaveEvent}},t.disableHover&&t.isCollapsed?{click:t.mouseEnterEvent}:{mouseover:t.mouseEnterEvent}),[t.isRouterLink&&!t.item.disabled?[i("router-link",t._b({class:t.itemLinkClass,attrs:{to:t.itemLinkHref},nativeOn:{click:function(e){return t.clickEvent(e)}}},"router-link",t.item.attributes,!1),[i("div",[t.item.icon&&!t.isMobileItem?["string"==typeof t.item.icon||t.item.icon instanceof String?i("i",{staticClass:"vsm--icon",class:t.item.icon}):i(t.item.icon.element?t.item.icon.element:"i",t._b({tag:"component",staticClass:"vsm--icon",class:t.item.icon.class},"component",t.item.icon.attributes,!1),[t._v("\n            "+t._s(t.item.icon.text)+"\n          ")])]:t._e(),t._v(" "),t.isCollapsed&&!t.isFirstLevel||!t.isCollapsed||t.isMobileItem?[t.item.badge?i(t.item.badge.element?t.item.badge.element:"span",t._b({tag:"component",staticClass:"vsm--badge",class:t.item.badge.class,style:[t.rtl?t.item.child?{"margin-left":"30px"}:"":t.item.child?{"margin-right":"30px"}:""]},"component",t.item.badge.attributes,!1),[t._v("\n            "+t._s(t.item.badge.text)+"\n          ")]):t._e(),t._v(" "),i("span",{staticClass:"vsm--title"},[t._v(t._s(t.item.title))]),t._v(" "),t.item.child?i("div",{staticClass:"vsm--arrow",class:[{"vsm--arrow_open":t.show},{"vsm--arrow_slot":t.$slots["dropdown-icon"]}]},[t._t("dropdown-icon")],2):t._e()]:t._e()],2)])]:[i(t.itemLinkHref&&!t.item.disabled?"a":"span",t._b({tag:"component",class:t.itemLinkClass,attrs:{href:t.itemLinkHref&&!t.item.disabled?t.itemLinkHref:void 0,tabindex:t.item.disabled?-1:0,role:"link"},on:{click:t.clickEvent,keydown:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.clickEvent(e):null}}},"component",t.item.attributes,!1),[t.item.icon&&!t.isMobileItem?["string"==typeof t.item.icon||t.item.icon instanceof String?i("i",{staticClass:"vsm--icon",class:t.item.icon}):i(t.item.icon.element?t.item.icon.element:"i",t._b({tag:"component",staticClass:"vsm--icon",class:t.item.icon.class},"component",t.item.icon.attributes,!1),[t._v("\n          "+t._s(t.item.icon.text)+"\n        ")])]:t._e(),t._v(" "),t.isCollapsed&&!t.isFirstLevel||!t.isCollapsed||t.isMobileItem?[t.item.badge?i(t.item.badge.element?t.item.badge.element:"span",t._b({tag:"component",staticClass:"vsm--badge",class:t.item.badge.class,style:[t.rtl?t.item.child?{"margin-left":"30px"}:"":t.item.child?{"margin-right":"30px"}:""]},"component",t.item.badge.attributes,!1),[t._v("\n          "+t._s(t.item.badge.text)+"\n        ")]):t._e(),t._v(" "),i("span",{staticClass:"vsm--title"},[t._v(t._s(t.item.title))]),t._v(" "),t.item.child?i("div",{staticClass:"vsm--arrow",class:[{"vsm--arrow_open":t.show},{"vsm--arrow_slot":t.$slots["dropdown-icon"]}]},[t._t("dropdown-icon")],2):t._e()]:t._e()],2)],t._v(" "),t.item.child?[t.isCollapsed&&!t.isFirstLevel||!t.isCollapsed?[i("transition",{attrs:{name:"expand"},on:{enter:t.expandEnter,afterEnter:t.expandAfterEnter,beforeLeave:t.expandBeforeLeave}},[t.show?i("div",{staticClass:"vsm--dropdown"},[i("div",{staticClass:"vsm--list"},t._l(t.item.child,function(e,n){return i("sidebar-menu-item",{key:n,attrs:{item:e,level:t.level+1,"show-child":t.showChild,rtl:t.rtl,"is-collapsed":t.isCollapsed}},[t._t("dropdown-icon",null,{slot:"dropdown-icon"})],2)}),1)]):t._e()])]:t._e()]:t._e()],2)},[],!1,null,null,null);r.options.__file="SidebarMenuItem.vue";var a={name:"SidebarMenu",components:{SidebarMenuItem:r.exports},mixins:[o],props:{menu:{type:Array,required:!0},collapsed:{type:Boolean,default:!1},width:{type:String,default:"350px"},widthCollapsed:{type:String,default:"50px"},showChild:{type:Boolean,default:!1},theme:{type:String,default:""},showOneChild:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},relative:{type:Boolean,default:!1},hideToggle:{type:Boolean,default:!1},disableHover:{type:Boolean,default:!1}},data:function(){return{isCollapsed:this.collapsed,mobileItem:null,mobileItemPos:0,mobileItemHeight:0,mobileItemTimeout:null,activeShow:null,parentHeight:"100vh",parentWidth:"100vw",parentOffsetTop:"0px",parentOffsetLeft:"0px",scrollable:!1}},computed:{sidebarWidth:function(){return this.isCollapsed?this.widthCollapsed:this.width},mobileItemStyle:function(){return{item:[{position:"absolute"},{top:this.mobileItemPos+"px"},this.rtl?{right:"0px"}:{left:"0px"},this.rtl?{"padding-right":this.sidebarWidth}:{"padding-left":this.sidebarWidth},{"z-index":0},{width:"calc("+this.parentWidth+" - "+this.parentOffsetLeft+")"},{"max-width":this.width}],dropdown:[{position:"absolute"},{top:this.mobileItemHeight+"px"},{left:this.rtl?"0px":this.sidebarWidth},{right:this.rtl?this.sidebarWidth:"0px"},{"max-height":"calc("+this.parentHeight+" - "+(this.mobileItemPos+this.mobileItemHeight)+"px - "+this.parentOffsetTop+")"},{"overflow-y":"auto"}]}}},watch:{collapsed:function(t){var e=this;this.isCollapsed!==this.collapsed&&(this.isCollapsed=t,this.unsetMobileItem(),this.isCollapsed&&this.$nextTick(function(){e.initScrollable(),e.initParentOffsets()}))}},mounted:function(){this.isCollapsed&&(this.initScrollable(),this.initParentOffsets())},methods:{onMouseLeave:function(){this.unsetMobileItem()},onToggleClick:function(){var t=this;this.isCollapsed=!this.isCollapsed,this.unsetMobileItem(),this.isCollapsed&&this.$nextTick(function(){t.initScrollable(),t.initParentOffsets()}),this.$emit("toggle-collapse",this.isCollapsed)},onActiveShow:function(t){this.activeShow=t},onItemClick:function(t,e){this.$emit("item-click",t,e)},setMobileItem:function(t){var e=this,i=t.item,n=t.itemEl;if(this.mobileItem!==i){var s=this.$el.getBoundingClientRect().top,o=window.getComputedStyle(n),l=parseFloat(o.paddingTop),r=parseFloat(o.paddingBottom),a=n.offsetHeight-(l+r),h=n.getBoundingClientRect().top-s+l;this.unsetMobileItem(),this.$nextTick(function(){e.mobileItem=i,e.mobileItemPos=h,e.mobileItemHeight=a})}},unsetMobileItem:function(t,e){var i=this;t?(this.mobileItemTimeout&&clearTimeout(this.mobileItemTimeout),e||(this.mobileItemTimeout=setTimeout(function(){i.mobileItem=null},600))):this.mobileItem=null},initScrollable:function(){var t=this.$el.querySelector(".vsm--list");this.scrollable=t.clientHeight<t.scrollHeight},initParentOffsets:function(){var t=this.$el.getBoundingClientRect().top,e=this.$el.getBoundingClientRect().left,i=this.$el.getBoundingClientRect().right;if(this.relative){var n=this.$el.parentElement,s=n.getBoundingClientRect().top,o=n.getBoundingClientRect().left;this.parentHeight=n.offsetHeight+"px",this.parentWidth=n.offsetWidth+"px",this.parentOffsetTop=t-s+"px",this.rtl?this.parentOffsetLeft=n.offsetWidth-i+o+"px":this.parentOffsetLeft=e-o+"px"}else this.parentOffsetTop=t+"px",this.rtl?this.parentOffsetLeft="calc("+this.parentWidth+" - "+i+"px)":this.parentOffsetLeft=e+"px"},onItemUpdate:function(t,e){e===this.mobileItem&&(this.mobileItem=t),e===this.activeShow&&(this.activeShow=t)}},provide:function(){return{emitActiveShow:this.onActiveShow,emitItemClick:this.onItemClick,emitItemUpdate:this.onItemUpdate}}},h=(i(3),l(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-sidebar-menu",class:[t.isCollapsed?"vsm_collapsed":"vsm_expanded",t.theme?"vsm_"+t.theme:"",t.rtl?"vsm_rtl":""],style:[t.relative?{position:"relative",height:"100%"}:"",{"max-width":t.sidebarWidth}],on:{mouseleave:t.onMouseLeave}},[t._t("header"),t._v(" "),i("div",{staticClass:"vsm--list",style:t.scrollable&&t.isCollapsed?[{width:"calc(100% + 17px)"},t.rtl?{"margin-left":"-17px"}:{}]:""},t._l(t.menu,function(e,n){return i("sidebar-menu-item",{key:n,attrs:{item:e,"is-collapsed":t.isCollapsed,"active-show":t.activeShow,"show-one-child":t.showOneChild,"show-child":t.showChild,rtl:t.rtl,"mobile-item":t.mobileItem,"disable-hover":t.disableHover},on:{"set-mobile-item":t.setMobileItem,"unset-mobile-item":t.unsetMobileItem}},[t._t("dropdown-icon",null,{slot:"dropdown-icon"})],2)}),1),t._v(" "),t.isCollapsed?i("div",{staticClass:"vsm--mobile-item",style:t.mobileItemStyle.item},[t.mobileItem?i("sidebar-menu-item",{attrs:{item:t.mobileItem,"is-mobile-item":!0,"is-collapsed":t.isCollapsed,"show-child":t.showChild,rtl:t.rtl}},[t._t("dropdown-icon",null,{slot:"dropdown-icon"})],2):t._e(),t._v(" "),i("transition",{attrs:{name:"slide-animation"}},[t.mobileItem?i("div",{staticClass:"vsm--mobile-bg",style:[{position:"absolute"},{left:"0px"},{right:"0px"},{top:"0px"},{height:t.mobileItemHeight+"px"},{"z-index":-1}]}):t._e()]),t._v(" "),i("div",{staticClass:"vsm--dropdown",style:t.mobileItemStyle.dropdown},[i("transition",{attrs:{name:"expand"},on:{enter:t.expandEnter,afterEnter:t.expandAfterEnter,beforeLeave:t.expandBeforeLeave}},[t.mobileItem&&t.mobileItem.child?i("div",{staticClass:"vsm--list"},t._l(t.mobileItem.child,function(e,n){return i("sidebar-menu-item",{key:n,attrs:{item:e,level:2,"show-child":t.showChild,rtl:t.rtl,"is-collapsed":t.isCollapsed}},[t._t("dropdown-icon",null,{slot:"dropdown-icon"})],2)}),1):t._e()])],1)],1):t._e(),t._v(" "),t._t("footer"),t._v(" "),t.hideToggle?t._e():i("button",{staticClass:"vsm--toggle-btn",class:{"vsm--toggle-btn_slot":t.$slots["toggle-icon"]},on:{click:t.onToggleClick}},[t._t("toggle-icon")],2)],2)},[],!1,null,null,null));h.options.__file="SidebarMenu.vue";var m=h.exports;i.d(e,"SidebarMenu",function(){return m});e.default={install:function(t){t.component("sidebar-menu",m)}}}])});
//# sourceMappingURL=vue-sidebar-menu.js.map