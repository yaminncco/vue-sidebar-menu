(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['vue-sidebar-menu'] = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var isCollapsed = vue.ref(false);
  var sidebarMenuRef = vue.ref(null);
  var mobileItem = vue.ref(null);
  var mobileItemRect = vue.reactive({
    top: 0,
    height: 0,
    padding: '',
    maxHeight: 0,
    maxWidth: 0
  });
  var mobileItemTimeout = vue.ref(null);
  var currentRoute = vue.ref(window.location.pathname + window.location.search + window.location.hash);
  function useMenu(props, context) {
    var id = 0;

    function transformItems(items) {
      return items.map(function (item) {
        if (item.child) {
          return _objectSpread2(_objectSpread2({}, item), {}, {
            id: id++,
            child: transformItems(item.child)
          });
        }

        return _objectSpread2(_objectSpread2({}, item), {}, {
          id: id++
        });
      });
    }

    var computedMenu = vue.computed(function () {
      return transformItems(props.menu);
    });
    var sidebarWidth = vue.computed(function () {
      return isCollapsed.value ? props.widthCollapsed : props.width;
    });
    var sidebarClass = vue.computed(function () {
      return [!isCollapsed.value ? 'vsm_expanded' : 'vsm_collapsed', props.theme ? "vsm_".concat(props.theme) : '', props.rtl ? 'vsm_rtl' : '', props.relative ? 'vsm_relative' : ''];
    });
    var mobileItemDropdownStyle = vue.computed(function () {
      return [{
        position: 'absolute'
      }, {
        top: "".concat(mobileItemRect.top + mobileItemRect.height, "px")
      }, !props.rtl ? {
        left: props.widthCollapsed
      } : {
        right: props.widthCollapsed
      }, {
        width: "".concat(mobileItemRect.maxWidth, "px")
      }, {
        'max-height': "".concat(mobileItemRect.maxHeight, "px")
      }, {
        'overflow-y': 'auto'
      }];
    });
    var mobileItemStyle = vue.computed(function () {
      return [{
        position: 'absolute'
      }, {
        top: "".concat(mobileItemRect.top, "px")
      }, !props.rtl ? {
        left: props.widthCollapsed
      } : {
        right: props.widthCollapsed
      }, {
        width: "".concat(mobileItemRect.maxWidth, "px")
      }, {
        height: "".concat(mobileItemRect.height, "px")
      }, {
        'padding-right': "".concat(mobileItemRect.padding)
      }, {
        'padding-left': "".concat(mobileItemRect.padding)
      }, {
        'z-index': '20'
      }];
    });
    var mobileItemBackgroundStyle = vue.computed(function () {
      return [{
        position: 'absolute'
      }, {
        top: "".concat(mobileItemRect.top, "px")
      }, !props.rtl ? {
        left: '0px'
      } : {
        right: '0px'
      }, {
        width: "".concat(mobileItemRect.maxWidth + parseInt(props.widthCollapsed), "px")
      }, {
        height: "".concat(mobileItemRect.height, "px")
      }, {
        'z-index': '10'
      }];
    });

    var onToggleClick = function onToggleClick() {
      unsetMobileItem();
      isCollapsed.value = !isCollapsed.value;
      context.emit('update:collapsed', isCollapsed.value);
    };

    var onItemClick = function onItemClick(event, item) {
      context.emit('item-click', event, item);
    };

    var onRouteChange = function onRouteChange() {
      currentRoute.value = window.location.pathname + window.location.search + window.location.hash;
    };

    var setMobileItem = function setMobileItem(_ref) {
      var item = _ref.item,
          itemEl = _ref.itemEl;
      if (mobileItemTimeout.value) clearTimeout(mobileItemTimeout.value);
      var itemLinkEl = itemEl.children[0];

      var _itemLinkEl$getBoundi = itemLinkEl.getBoundingClientRect(),
          top = _itemLinkEl$getBoundi.top,
          bottom = _itemLinkEl$getBoundi.bottom,
          height = _itemLinkEl$getBoundi.height;

      var _sidebarMenuRef$value = sidebarMenuRef.value.getBoundingClientRect(),
          sidebarLeft = _sidebarMenuRef$value.left,
          sidebarRight = _sidebarMenuRef$value.right;

      var offsetTop = itemLinkEl.offsetParent.getBoundingClientRect().top;
      var parentHeight;
      var parentWidth;
      var parentTop = 0;
      var width = 0;
      var maxWidth = parseInt(props.width) - parseInt(props.widthCollapsed);

      if (props.relative) {
        var parent = sidebarMenuRef.value.parentElement;
        parentHeight = parent.clientHeight;
        parentWidth = parent.clientWidth;
        parentTop = parent.getBoundingClientRect().top;
        width = props.rtl ? parentWidth - (parent.getBoundingClientRect().right - sidebarLeft) : parent.getBoundingClientRect().right - sidebarRight;
      } else {
        parentHeight = window.innerHeight;
        parentWidth = window.innerWidth;
        width = props.rtl ? parentWidth - (parentWidth - sidebarLeft) : parentWidth - sidebarRight;
      }

      mobileItem.value = item;
      mobileItemRect.top = top - offsetTop;
      mobileItemRect.height = height;
      mobileItemRect.padding = window.getComputedStyle(itemLinkEl).paddingRight;
      mobileItemRect.maxWidth = width <= maxWidth ? width : maxWidth;
      mobileItemRect.maxHeight = parentHeight - (bottom - parentTop);
    };

    var unsetMobileItem = function unsetMobileItem() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
      if (!mobileItem.value) return;
      if (mobileItemTimeout.value) clearTimeout(mobileItemTimeout.value);

      if (immediate) {
        mobileItem.value = null;
        return;
      }

      mobileItemTimeout.value = setTimeout(function () {
        mobileItem.value = null;
      }, delay);
    };

    return {
      sidebarMenuRef: sidebarMenuRef,
      isCollapsed: isCollapsed,
      computedMenu: computedMenu,
      sidebarWidth: sidebarWidth,
      sidebarClass: sidebarClass,
      currentRoute: currentRoute,
      onToggleClick: onToggleClick,
      onItemClick: onItemClick,
      onRouteChange: onRouteChange,
      mobileItem: mobileItem,
      mobileItemStyle: mobileItemStyle,
      mobileItemDropdownStyle: mobileItemDropdownStyle,
      mobileItemBackgroundStyle: mobileItemBackgroundStyle,
      setMobileItem: setMobileItem,
      unsetMobileItem: unsetMobileItem,
      mobileItemTimeout: mobileItemTimeout
    };
  }

  // Adapted from vue-router-next
  // See: https://github.com/vuejs/vue-router-next/blob/master/src/RouterLink.ts
  function activeRecordIndex(route, currentRoute) {
    var matched = route.matched;
    var length = matched.length;
    var routeMatched = matched[length - 1];
    var currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    var index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    var parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length) return false;

    for (var key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
    }

    return true;
  }
  function includesParams(outer, inner) {
    var _loop = function _loop(key) {
      var innerValue = inner[key];
      var outerValue = outer[key];

      if (typeof innerValue === 'string') {
        if (innerValue !== outerValue) return {
          v: false
        };
      } else {
        if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some(function (value, i) {
          return value !== outerValue[i];
        })) {
          return {
            v: false
          };
        }
      }
    };

    for (var key in inner) {
      var _ret = _loop(key);

      if (_typeof(_ret) === "object") return _ret.v;
    }

    return true;
  }

  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : '';
  }

  function isSameRouteRecord(a, b) {
    return (a.aliasOf || a) === (b.aliasOf || b);
  }

  function isSameRouteLocationParamsValue(a, b) {
    return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : a === b;
  }

  function isEquivalentArray(a, b) {
    return Array.isArray(b) ? a.length === b.length && a.every(function (value, i) {
      return value === b[i];
    }) : a.length === 1 && a[0] === b;
  }

  var activeShow = vue.ref(null);
  function useItem(props) {
    var router = vue.getCurrentInstance().appContext.config.globalProperties.$router;
    var sidebarProps = vue.inject('vsm-props');
    var emitItemClick = vue.inject('emitItemClick');
    var emitScrollUpdate = vue.inject('emitScrollUpdate');

    var _useMenu = useMenu(sidebarProps),
        isCollapsed = _useMenu.isCollapsed,
        currentRoute = _useMenu.currentRoute,
        mobileItem = _useMenu.mobileItem,
        setMobileItem = _useMenu.setMobileItem,
        unsetMobileItem = _useMenu.unsetMobileItem,
        mobileItemTimeout = _useMenu.mobileItemTimeout;

    var itemShow = vue.ref(false);
    var itemHover = vue.ref(false);
    var active = vue.computed(function () {
      return isLinkActive(props.item) || isChildActive(props.item.child);
    });
    var exactActive = vue.computed(function () {
      return isLinkActive(props.item, true);
    });

    var isLinkActive = function isLinkActive(item, exact) {
      if (!item.href || item.external) return false;

      if (router) {
        var route = router.resolve(item.href);
        var routerCurrentRoute = router.currentRoute.value;
        var activeIndex = activeRecordIndex(route, routerCurrentRoute);

        if (exact || item.exact) {
          return activeIndex > -1 && activeIndex === routerCurrentRoute.matched.length - 1 && isSameRouteLocationParams(routerCurrentRoute.params, route.params);
        }

        return activeIndex > -1 && includesParams(routerCurrentRoute.params, route.params);
      } else {
        return item.href === currentRoute.value;
      }
    };

    var isChildActive = function isChildActive(child) {
      if (!child) return false;
      return child.some(function (item) {
        return isLinkActive(item) || isChildActive(item.child);
      });
    };

    var onLinkClick = function onLinkClick(event) {
      if (!props.item.href || props.item.disabled) {
        event.preventDefault();
        if (props.item.disabled) return;
      }

      emitMobileItem(event, event.currentTarget.parentElement);

      if (hasChild.value) {
        if (!props.item.href || active.value) {
          show.value = !show.value;
        }
      }

      emitItemClick(event, props.item);
    };

    var onMouseOver = function onMouseOver(event) {
      if (props.item.disabled) return;
      event.stopPropagation();
      itemHover.value = true;
    };

    var onMouseOut = function onMouseOut(event) {
      event.stopPropagation();
      itemHover.value = false;
    };

    var onMouseEnter = function onMouseEnter(event) {
      if (props.item.disabled) return;

      if (isMobileItem.value && (sidebarProps.disableHover && hasChild.value || !sidebarProps.disableHover)) {
        if (mobileItemTimeout.value) clearTimeout(mobileItemTimeout.value);
      }

      if (!sidebarProps.disableHover) {
        emitMobileItem(event, event.currentTarget);
      }
    };

    var onMouseLeave = function onMouseLeave() {
      if (sidebarProps.disableHover && !hasChild.value) return;
      var delay;

      if (!sidebarProps.disableHover) {
        delay = 300;
      }

      unsetMobileItem(false, delay);
    };

    var emitMobileItem = function emitMobileItem(event, itemEl) {
      if (hover.value) return;

      if (isCollapsed.value && isFirstLevel.value) {
        setTimeout(function () {
          var _mobileItem$value;

          if (((_mobileItem$value = mobileItem.value) === null || _mobileItem$value === void 0 ? void 0 : _mobileItem$value.id) !== props.item.id) {
            setMobileItem({
              item: props.item,
              itemEl: itemEl
            });
            show.value = true;
          }

          if (event.type === 'click' && !hasChild.value) {
            unsetMobileItem(false);
          }
        }, 0);
      }
    };

    var onExpandEnter = function onExpandEnter(el) {
      el.style.height = el.scrollHeight + 'px';
    };

    var onExpandAfterEnter = function onExpandAfterEnter(el) {
      el.style.height = 'auto';

      if (!isCollapsed.value) {
        emitScrollUpdate();
      }
    };

    var onExpandBeforeLeave = function onExpandBeforeLeave(el) {
      if (isCollapsed.value && isFirstLevel.value) {
        el.style.display = 'none';
        return;
      }

      el.style.height = el.scrollHeight + 'px';
    };

    var onExpandAfterLeave = function onExpandAfterLeave() {
      if (!isCollapsed.value) {
        emitScrollUpdate();
      }
    };

    var show = vue.computed({
      get: function get() {
        var _activeShow$value;

        if (!hasChild.value) return false;
        if (isCollapsed.value && isFirstLevel.value) return hover.value;
        if (sidebarProps.showChild) return true;
        return sidebarProps.showOneChild && isFirstLevel.value ? props.item.id === ((_activeShow$value = activeShow.value) === null || _activeShow$value === void 0 ? void 0 : _activeShow$value.id) : itemShow.value;
      },
      set: function set(show) {
        if (sidebarProps.showOneChild && isFirstLevel.value) {
          show ? activeShow.value = props.item : activeShow.value = null;
        }

        itemShow.value = show;
      }
    });
    var hover = vue.computed(function () {
      var _mobileItem$value2;

      return isCollapsed.value && isFirstLevel.value ? props.item.id === ((_mobileItem$value2 = mobileItem.value) === null || _mobileItem$value2 === void 0 ? void 0 : _mobileItem$value2.id) : itemHover.value;
    });
    var isFirstLevel = vue.computed(function () {
      return props.level === 1;
    });
    var isHidden = vue.computed(function () {
      if (isCollapsed.value) {
        if (props.item.hidden && props.item.hiddenOnCollapse === undefined) {
          return true;
        } else {
          return props.item.hiddenOnCollapse === true;
        }
      } else {
        return props.item.hidden === true;
      }
    });
    var hasChild = vue.computed(function () {
      return !!(props.item.child && props.item.child.length > 0);
    });
    var linkClass = vue.computed(function () {
      return ['vsm--link', "vsm--link_level-".concat(props.level), {
        'vsm--link_mobile': isMobileItem.value
      }, {
        'vsm--link_hover': hover.value
      }, {
        'vsm--link_active': active.value
      }, {
        'vsm--link_disabled': props.item.disabled
      }, {
        'vsm--link_open': show.value
      }, props.item.class];
    });
    var linkAttrs = vue.computed(function () {
      var href = props.item.href ? props.item.href : '#';
      var target = props.item.external ? '_blank' : '_self';
      var tabindex = props.item.disabled ? -1 : null;
      var ariaCurrent = exactActive.value ? 'page' : null;
      var ariaHaspopup = hasChild.value ? true : null;
      var ariaExpanded = show.value ? true : null;
      return _objectSpread2({
        href: href,
        target: target,
        tabindex: tabindex,
        'aria-current': ariaCurrent,
        'aria-haspopup': ariaHaspopup,
        'aria-expanded': ariaExpanded
      }, props.item.attributes);
    });
    var itemClass = vue.computed(function () {
      return ['vsm--item', {
        'vsm--item_mobile': isMobileItem.value
      }];
    });
    var isMobileItem = vue.computed(function () {
      return isCollapsed.value && isFirstLevel.value && hover.value;
    });
    return {
      active: active,
      exactActive: exactActive,
      activeShow: activeShow,
      show: show,
      hover: hover,
      isFirstLevel: isFirstLevel,
      isHidden: isHidden,
      hasChild: hasChild,
      linkClass: linkClass,
      linkAttrs: linkAttrs,
      itemClass: itemClass,
      isMobileItem: isMobileItem,
      onLinkClick: onLinkClick,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onExpandEnter: onExpandEnter,
      onExpandAfterEnter: onExpandAfterEnter,
      onExpandBeforeLeave: onExpandBeforeLeave,
      onExpandAfterLeave: onExpandAfterLeave
    };
  }

  var script$5 = {
    name: 'SidebarMenuLink',
    inheritAttrs: false,
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        router: false
      }
    },
    computed: {
      isHyperLink () {
        return !!(!this.item.href || this.item.external || !this.router)
      }
    },
    mounted () {
      this.router = !!this.$router;
    }
  };

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_router_link = vue.resolveComponent("router-link");

    return ($options.isHyperLink)
      ? (vue.openBlock(), vue.createBlock("a", vue.mergeProps({ key: 0 }, _ctx.$attrs), [
          vue.renderSlot(_ctx.$slots, "default")
        ], 16 /* FULL_PROPS */))
      : (vue.openBlock(), vue.createBlock(_component_router_link, {
          key: 1,
          custom: "",
          to: _ctx.$attrs.href
        }, {
          default: vue.withCtx(({ href, navigate }) => [
            vue.createVNode("a", vue.mergeProps(_ctx.$attrs, {
              href: href,
              onClick: navigate
            }), [
              vue.renderSlot(_ctx.$slots, "default")
            ], 16 /* FULL_PROPS */, ["href", "onClick"])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["to"]))
  }

  script$5.render = render$5;
  script$5.__file = "src/components/SidebarMenuLink.vue";

  var script$4 = {
    name: 'SidebarMenuIcon',
    props: {
      icon: {
        type: [String, Object],
        default: ''
      }
    }
  };

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.icon.element ? $props.icon.element : 'i'), vue.mergeProps({
      class: ["vsm--icon", typeof $props.icon === 'string' || ($props.icon instanceof String) ? $props.icon : $props.icon.class],
      "aria-hidden": "true"
    }, $props.icon.attributes), {
      default: vue.withCtx(() => [
        vue.createTextVNode(vue.toDisplayString($props.icon.text), 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }, 16 /* FULL_PROPS */, ["class"]))
  }

  script$4.render = render$4;
  script$4.__file = "src/components/SidebarMenuIcon.vue";

  var script$3 = {
    name: 'SidebarMenuBadge',
    props: {
      badge: {
        type: Object,
        default: () => {}
      }
    }
  };

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.badge.element ? $props.badge.element : 'span'), vue.mergeProps({
      class: ["vsm--badge", $props.badge.class]
    }, $props.badge.attributes), {
      default: vue.withCtx(() => [
        vue.createTextVNode(vue.toDisplayString($props.badge.text), 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }, 16 /* FULL_PROPS */, ["class"]))
  }

  script$3.render = render$3;
  script$3.__file = "src/components/SidebarMenuBadge.vue";

  var script$2 = {
    name: 'SidebarMenuItem',
    components: {
      SidebarMenuLink: script$5,
      SidebarMenuIcon: script$4,
      SidebarMenuBadge: script$3
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      level: {
        type: Number,
        default: 1
      }
    },
    setup (props) {
      const sidebarProps = vue.inject('vsm-props');
      const { isCollapsed, mobileItemStyle, mobileItemDropdownStyle, mobileItemBackgroundStyle } = useMenu(sidebarProps);
      const { linkComponentName } = vue.toRefs(sidebarProps);
      const {
        active,
        exactActive,
        show,
        hover,
        isFirstLevel,
        isHidden,
        hasChild,
        linkClass,
        linkAttrs,
        itemClass,
        isMobileItem,
        onLinkClick,
        onMouseOver,
        onMouseOut,
        onMouseEnter,
        onMouseLeave,
        onExpandEnter,
        onExpandAfterEnter,
        onExpandBeforeLeave,
        onExpandAfterLeave
      } = useItem(props);

      vue.watch(() => active.value, () => {
        if (active.value) {
          show.value = true;
        }
      }, {
        immediate: true
      });

      return {
        isCollapsed,
        linkComponentName,
        active,
        exactActive,
        isMobileItem,
        mobileItemStyle,
        mobileItemDropdownStyle,
        mobileItemBackgroundStyle,
        show,
        hover,
        isFirstLevel,
        isHidden,
        hasChild,
        linkClass,
        linkAttrs,
        itemClass,
        onLinkClick,
        onMouseOver,
        onMouseOut,
        onMouseEnter,
        onMouseLeave,
        onExpandEnter,
        onExpandAfterEnter,
        onExpandBeforeLeave,
        onExpandAfterLeave
      }
    }
  };

  const _hoisted_1$2 = { key: 0 };
  const _hoisted_2$2 = { class: "vsm--dropdown" };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_sidebar_menu_icon = vue.resolveComponent("sidebar-menu-icon");
    const _component_sidebar_menu_badge = vue.resolveComponent("sidebar-menu-badge");
    const _component_sidebar_menu_item = vue.resolveComponent("sidebar-menu-item", true);

    return ($props.item.component && !$setup.isHidden)
      ? (vue.openBlock(), vue.createBlock("li", _hoisted_1$2, [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.item.component), $props.item.props, null, 16 /* FULL_PROPS */))
        ]))
      : ($props.item.header && !$setup.isHidden)
        ? (vue.openBlock(), vue.createBlock("li", vue.mergeProps({
            key: 1,
            class: ["vsm--header", $props.item.class]
          }, $props.item.attributes), vue.toDisplayString($props.item.header), 17 /* TEXT, FULL_PROPS */))
        : (!$setup.isHidden)
          ? (vue.openBlock(), vue.createBlock("li", vue.mergeProps({
              key: 2,
              class: $setup.itemClass,
              onMouseover: _cache[1] || (_cache[1] = (...args) => ($setup.onMouseOver && $setup.onMouseOver(...args))),
              onMouseout: _cache[2] || (_cache[2] = (...args) => ($setup.onMouseOut && $setup.onMouseOut(...args)))
            }, vue.toHandlers(($setup.isCollapsed && $setup.isFirstLevel) ? { mouseenter: $setup.onMouseEnter, mouseleave: $setup.onMouseLeave} : {})), [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.linkComponentName ? $setup.linkComponentName : 'SidebarMenuLink'), vue.mergeProps({
                item: $props.item,
                class: $setup.linkClass
              }, $setup.linkAttrs, { onClick: $setup.onLinkClick }), {
                default: vue.withCtx(() => [
                  ($setup.isCollapsed && $setup.isFirstLevel)
                    ? (vue.openBlock(), vue.createBlock(vue.Transition, {
                        key: 0,
                        name: "slide-animation"
                      }, {
                        default: vue.withCtx(() => [
                          ($setup.hover)
                            ? (vue.openBlock(), vue.createBlock("div", {
                                key: 0,
                                class: "vsm--mobile-bg",
                                style: $setup.mobileItemBackgroundStyle
                              }, null, 4 /* STYLE */))
                            : vue.createCommentVNode("v-if", true)
                        ]),
                        _: 1 /* STABLE */
                      }))
                    : vue.createCommentVNode("v-if", true),
                  ($props.item.icon)
                    ? (vue.openBlock(), vue.createBlock(_component_sidebar_menu_icon, {
                        key: 1,
                        icon: $props.item.icon
                      }, null, 8 /* PROPS */, ["icon"]))
                    : vue.createCommentVNode("v-if", true),
                  vue.createVNode("div", {
                    class: ["vsm--title", ($setup.isCollapsed && $setup.isFirstLevel) && !$setup.isMobileItem && 'vsm--title_hidden'],
                    style: $setup.isMobileItem && $setup.mobileItemStyle
                  }, [
                    vue.createVNode("span", null, vue.toDisplayString($props.item.title), 1 /* TEXT */),
                    ($props.item.badge)
                      ? (vue.openBlock(), vue.createBlock(_component_sidebar_menu_badge, {
                          key: 0,
                          badge: $props.item.badge
                        }, null, 8 /* PROPS */, ["badge"]))
                      : vue.createCommentVNode("v-if", true),
                    ($setup.hasChild)
                      ? (vue.openBlock(), vue.createBlock("div", {
                          key: 1,
                          class: ["vsm--arrow", {'vsm--arrow_open' : $setup.show}]
                        }, [
                          vue.renderSlot(_ctx.$slots, "dropdown-icon", { isOpen: $setup.show })
                        ], 2 /* CLASS */))
                      : vue.createCommentVNode("v-if", true)
                  ], 6 /* CLASS, STYLE */)
                ]),
                _: 3 /* FORWARDED */
              }, 16 /* FULL_PROPS */, ["item", "class", "onClick"])),
              ($setup.hasChild)
                ? (vue.openBlock(), vue.createBlock(vue.Transition, {
                    key: 0,
                    appear: $setup.isMobileItem,
                    name: "expand",
                    onEnter: $setup.onExpandEnter,
                    onAfterEnter: $setup.onExpandAfterEnter,
                    onBeforeLeave: $setup.onExpandBeforeLeave,
                    onAfterLeave: $setup.onExpandAfterLeave
                  }, {
                    default: vue.withCtx(() => [
                      ($setup.show)
                        ? (vue.openBlock(), vue.createBlock("div", {
                            key: 0,
                            class: ["vsm--child", $setup.isMobileItem && 'vsm--child_mobile'],
                            style: $setup.isMobileItem && $setup.mobileItemDropdownStyle
                          }, [
                            vue.createVNode("ul", _hoisted_2$2, [
                              (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.item.child, (subItem) => {
                                return (vue.openBlock(), vue.createBlock(_component_sidebar_menu_item, {
                                  key: subItem.id,
                                  item: subItem,
                                  level: $props.level+1
                                }, {
                                  "dropdown-icon": vue.withCtx(({ isOpen }) => [
                                    vue.renderSlot(_ctx.$slots, "dropdown-icon", { isOpen })
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["item", "level"]))
                              }), 128 /* KEYED_FRAGMENT */))
                            ])
                          ], 6 /* CLASS, STYLE */))
                        : vue.createCommentVNode("v-if", true)
                    ]),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["appear", "onEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]))
                : vue.createCommentVNode("v-if", true)
            ], 16 /* FULL_PROPS */))
          : vue.createCommentVNode("v-if", true)
  }

  script$2.render = render$2;
  script$2.__file = "src/components/SidebarMenuItem.vue";

  var script$1 = {
    name: 'SidebarMenuScroll',
    setup () {
      const sidebarProps = vue.inject('vsm-props');
      const { isCollapsed } = useMenu(sidebarProps);

      const scrollRef = vue.ref(null);
      const scrollBarRef = vue.ref(null);
      const scrollThumbRef = vue.ref(null);

      const thumbYPerc = vue.ref(0);
      const thumbHeightPerc = vue.ref(0);

      let cursorY = 0;
      let cursorDown = false;

      const thumbStyle = vue.computed(() => {
        return {
          height: `${thumbHeightPerc.value}%`,
          transform: `translateY(${thumbYPerc.value}%)`
        }
      });

      const onScrollUpdate = () => {
        if (!scrollRef.value) return
        vue.nextTick(() => {
          updateThumb();
        });
      };

      vue.provide('emitScrollUpdate', onScrollUpdate);

      vue.onMounted(() => {
        onScrollUpdate();
        window.addEventListener('resize', onScrollUpdate);
      });
      vue.onUnmounted(() => {
        window.removeEventListener('resize', onScrollUpdate);
      });

      vue.watch(() => isCollapsed.value, () => {
        onScrollUpdate();
      });

      const onScroll = () => {
        requestAnimationFrame(onScrollUpdate);
      };

      const onClick = (e) => {
        const offset = Math.abs(scrollBarRef.value.getBoundingClientRect().y - e.clientY);
        const thumbHalf = scrollThumbRef.value.offsetHeight / 2;
        updateScrollTop(offset - thumbHalf);
      };

      const onMouseDown = (e) => {
        e.stopImmediatePropagation();
        cursorDown = true;
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        cursorY = scrollThumbRef.value.offsetHeight - (e.clientY - scrollThumbRef.value.getBoundingClientRect().y);
      };

      const onMouseMove = (e) => {
        if (!cursorDown) return
        const offset = e.clientY - scrollBarRef.value.getBoundingClientRect().y;
        const thumbClickPosition = scrollThumbRef.value.offsetHeight - cursorY;
        updateScrollTop(offset - thumbClickPosition);
      };

      const onMouseUp = (e) => {
        cursorDown = false;
        cursorY = 0;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      const updateThumb = () => {
        const heightPerc = scrollRef.value.clientHeight * 100 / scrollRef.value.scrollHeight;
        thumbHeightPerc.value = heightPerc < 100 ? heightPerc : 0;
        thumbYPerc.value = scrollRef.value.scrollTop * 100 / scrollRef.value.clientHeight;
      };

      const updateScrollTop = (y) => {
        const scrollPerc = y * 100 / scrollBarRef.value.offsetHeight;
        scrollRef.value.scrollTop = scrollPerc * scrollRef.value.scrollHeight / 100;
      };

      return {
        scrollRef,
        scrollBarRef,
        scrollThumbRef,
        thumbStyle,
        onScroll,
        onClick,
        onMouseDown
      }
    }
  };

  const _hoisted_1$1 = { class: "vsm--scroll-wrapper" };
  const _hoisted_2$1 = { class: "vsm--scroll-overflow" };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
      vue.createVNode("div", _hoisted_2$1, [
        vue.createVNode("div", {
          ref: "scrollRef",
          class: "vsm--scroll",
          onScroll: _cache[1] || (_cache[1] = (...args) => ($setup.onScroll && $setup.onScroll(...args)))
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */),
        vue.createVNode("div", {
          ref: "scrollBarRef",
          class: "vsm--scroll-bar",
          onMousedown: _cache[3] || (_cache[3] = (...args) => ($setup.onClick && $setup.onClick(...args)))
        }, [
          vue.createVNode("div", {
            ref: "scrollThumbRef",
            class: "vsm--scroll-thumb",
            style: $setup.thumbStyle,
            onMousedown: _cache[2] || (_cache[2] = (...args) => ($setup.onMouseDown && $setup.onMouseDown(...args)))
          }, null, 36 /* STYLE, HYDRATE_EVENTS */)
        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */)
      ])
    ]))
  }

  script$1.render = render$1;
  script$1.__file = "src/components/SidebarMenuScroll.vue";

  var script = {
    name: 'SidebarMenu',
    components: {
      SidebarMenuItem: script$2,
      SidebarMenuScroll: script$1
    },
    props: {
      menu: {
        type: Array,
        required: true
      },
      collapsed: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '290px'
      },
      widthCollapsed: {
        type: String,
        default: '65px'
      },
      showChild: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: ''
      },
      showOneChild: {
        type: Boolean,
        default: false
      },
      rtl: {
        type: Boolean,
        default: false
      },
      relative: {
        type: Boolean,
        default: false
      },
      hideToggle: {
        type: Boolean,
        default: false
      },
      disableHover: {
        type: Boolean,
        default: false
      },
      linkComponentName: {
        type: String,
        default: undefined
      }
    },
    emits: {
      'item-click' (event, item) {
        return !!(event && item)
      },
      'update:collapsed' (collapsed) {
        return !!(typeof collapsed === 'boolean')
      }
    },
    setup (props, context) {
      vue.provide('vsm-props', props);

      const {
        sidebarMenuRef,
        isCollapsed,
        computedMenu,
        sidebarWidth,
        sidebarClass,
        onToggleClick,
        onItemClick,
        onRouteChange,
        unsetMobileItem
      } = useMenu(props, context);

      vue.provide('emitItemClick', onItemClick);
      vue.provide('emitScrollUpdate');
      vue.provide('onRouteChange', onRouteChange);

      const { collapsed } = vue.toRefs(props);
      isCollapsed.value = collapsed.value;

      vue.watch(() => props.collapsed, (currentCollapsed) => {
        unsetMobileItem();
        isCollapsed.value = currentCollapsed;
      });

      const router = vue.getCurrentInstance().appContext.config.globalProperties.$router;
      if (!router) {
        vue.onMounted(() => {
          window.addEventListener('hashchange', onRouteChange);
        });
        vue.onUnmounted(() => {
          window.removeEventListener('hashchange', onRouteChange);
        });
      }

      return {
        sidebarMenuRef,
        isCollapsed,
        computedMenu,
        sidebarWidth,
        sidebarClass,
        onToggleClick,
        onItemClick,
        onRouteChange
      }
    }
  };

  const _hoisted_1 = /*#__PURE__*/vue.createVNode("span", { class: "vsm--arrow_default" }, null, -1 /* HOISTED */);
  const _hoisted_2 = /*#__PURE__*/vue.createVNode("span", { class: "vsm--toggle-btn_default" }, null, -1 /* HOISTED */);

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_sidebar_menu_item = vue.resolveComponent("sidebar-menu-item");
    const _component_sidebar_menu_scroll = vue.resolveComponent("sidebar-menu-scroll");

    return (vue.openBlock(), vue.createBlock("div", {
      ref: "sidebarMenuRef",
      class: ["v-sidebar-menu", $setup.sidebarClass],
      style: {'max-width': $setup.sidebarWidth}
    }, [
      vue.renderSlot(_ctx.$slots, "header"),
      vue.createVNode(_component_sidebar_menu_scroll, null, {
        default: vue.withCtx(() => [
          vue.createVNode("ul", {
            class: "vsm--menu",
            style: {'width': $setup.sidebarWidth, 'position': 'static !important'}
          }, [
            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($setup.computedMenu, (item) => {
              return (vue.openBlock(), vue.createBlock(_component_sidebar_menu_item, {
                key: item.id,
                item: item
              }, {
                "dropdown-icon": vue.withCtx(({ isOpen }) => [
                  vue.renderSlot(_ctx.$slots, "dropdown-icon", { isOpen }, () => [
                    _hoisted_1
                  ])
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["item"]))
            }), 128 /* KEYED_FRAGMENT */))
          ], 4 /* STYLE */)
        ]),
        _: 1 /* STABLE */
      }),
      vue.renderSlot(_ctx.$slots, "footer"),
      (!$props.hideToggle)
        ? (vue.openBlock(), vue.createBlock("button", {
            key: 0,
            class: "vsm--toggle-btn",
            onClick: _cache[1] || (_cache[1] = (...args) => ($setup.onToggleClick && $setup.onToggleClick(...args)))
          }, [
            vue.renderSlot(_ctx.$slots, "toggle-icon", {}, () => [
              _hoisted_2
            ])
          ]))
        : vue.createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */))
  }

  script.render = render;
  script.__file = "src/components/SidebarMenu.vue";

  var index = {
    install: function install(Vue) {
      Vue.component('SidebarMenu', script);
    }
  };

  exports.SidebarMenu = script;
  exports['default'] = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue-sidebar-menu.js.map
