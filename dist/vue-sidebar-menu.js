(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['vue-sidebar-menu'] = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

  var initSidebar = function initSidebar(props, context) {
    var _toRefs = vue.toRefs(props),
        collapsed = _toRefs.collapsed,
        relative = _toRefs.relative,
        width = _toRefs.width,
        widthCollapsed = _toRefs.widthCollapsed,
        rtl = _toRefs.rtl;

    var sidebarRef = vue.ref(null);
    var isCollapsed = vue.ref(collapsed.value);
    var activeShow = vue.ref(null);
    var mobileItem = vue.reactive({
      item: null,
      rect: {
        top: 0,
        height: 0,
        padding: '',
        maxHeight: 0,
        maxWidth: 0
      },
      timeout: null
    });
    var getMobileItem = vue.computed(function () {
      return mobileItem.item;
    });
    var getMobileItemRect = vue.computed(function () {
      return mobileItem.rect;
    });
    var currentRoute = vue.ref(window.location.pathname + window.location.search + window.location.hash);

    var updateIsCollapsed = function updateIsCollapsed(val) {
      isCollapsed.value = val;
    };

    var updateActiveShow = function updateActiveShow(id) {
      activeShow.value = id;
    };

    var setMobileItem = function setMobileItem(_ref) {
      var item = _ref.item,
          itemEl = _ref.itemEl;
      clearMobileItemTimeout();
      var linkEl = itemEl.children[0];

      var _linkEl$getBoundingCl = linkEl.getBoundingClientRect(),
          linkTop = _linkEl$getBoundingCl.top,
          linkBottom = _linkEl$getBoundingCl.bottom,
          linkHeight = _linkEl$getBoundingCl.height;

      var _sidebarRef$value$get = sidebarRef.value.getBoundingClientRect(),
          sidebarLeft = _sidebarRef$value$get.left,
          sidebarRight = _sidebarRef$value$get.right;

      var offsetParentTop = linkEl.offsetParent.getBoundingClientRect().top;
      var parentHeight = window.innerHeight;
      var parentWidth = window.innerWidth;
      var parentTop = 0;
      var parentRight = parentWidth;
      var maxWidth = parseInt(width.value) - parseInt(widthCollapsed.value);

      if (relative.value) {
        var parent = sidebarRef.value.parentElement;
        parentHeight = parent.clientHeight;
        parentWidth = parent.clientWidth;
        parentTop = parent.getBoundingClientRect().top;
        parentRight = parent.getBoundingClientRect().right;
      }

      var rectWidth = rtl.value ? parentWidth - (parentRight - sidebarLeft) : parentRight - sidebarRight;
      updateMobileItem(item);
      updateMobileItemRect({
        top: linkTop - offsetParentTop,
        height: linkHeight,
        padding: window.getComputedStyle(linkEl).paddingRight,
        maxWidth: rectWidth <= maxWidth ? rectWidth : maxWidth,
        maxHeight: parentHeight - (linkBottom - parentTop)
      });
    };

    var unsetMobileItem = function unsetMobileItem() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
      if (!getMobileItem.value) return;
      clearMobileItemTimeout();

      if (immediate) {
        updateMobileItem(null);
        return;
      }

      mobileItem.timeout = setTimeout(function () {
        updateMobileItem(null);
      }, delay);
    };

    var clearMobileItemTimeout = function clearMobileItemTimeout() {
      if (mobileItem.timeout) clearTimeout(mobileItem.timeout);
    };

    var updateMobileItem = function updateMobileItem(item) {
      mobileItem.item = item;
    };

    var updateMobileItemRect = function updateMobileItemRect(_ref2) {
      var top = _ref2.top,
          height = _ref2.height,
          padding = _ref2.padding,
          maxWidth = _ref2.maxWidth,
          maxHeight = _ref2.maxHeight;
      mobileItem.rect.top = top;
      mobileItem.rect.height = height;
      mobileItem.rect.padding = padding;
      mobileItem.rect.maxWidth = maxWidth;
      mobileItem.rect.maxHeight = maxHeight;
    };

    var updateCurrentRoute = function updateCurrentRoute() {
      var route = window.location.pathname + window.location.search + window.location.hash;
      currentRoute.value = route;
    };

    var onItemClick = function onItemClick(event, item) {
      context.emit('item-click', event, item);
    };

    vue.provide('vsmProps', props);
    vue.provide('getSidebarRef', sidebarRef);
    vue.provide('getIsCollapsed', isCollapsed);
    vue.provide('getActiveShow', activeShow);
    vue.provide('getMobileItem', getMobileItem);
    vue.provide('getMobileItemRect', getMobileItemRect);
    vue.provide('getCurrentRoute', currentRoute);
    vue.provide('updateIsCollapsed', updateIsCollapsed);
    vue.provide('updateActiveShow', updateActiveShow);
    vue.provide('setMobileItem', setMobileItem);
    vue.provide('unsetMobileItem', unsetMobileItem);
    vue.provide('clearMobileItemTimeout', clearMobileItemTimeout);
    vue.provide('onRouteChange', updateCurrentRoute);
    vue.provide('emitItemClick', onItemClick);
    return {
      getSidebarRef: sidebarRef,
      getIsCollapsed: isCollapsed,
      getActiveShow: activeShow,
      getMobileItem: getMobileItem,
      getMobileItemRect: getMobileItemRect,
      getCurrentRoute: currentRoute,
      updateIsCollapsed: updateIsCollapsed,
      updateActiveShow: updateActiveShow,
      setMobileItem: setMobileItem,
      unsetMobileItem: unsetMobileItem,
      clearMobileItemTimeout: clearMobileItemTimeout,
      updateCurrentRoute: updateCurrentRoute,
      onItemClick: onItemClick
    };
  };
  var useSidebar = function useSidebar() {
    return {
      getSidebarProps: vue.inject('vsmProps'),
      getSidebarRef: vue.inject('getSidebarRef'),
      getIsCollapsed: vue.inject('getIsCollapsed'),
      getActiveShow: vue.inject('getActiveShow'),
      getMobileItem: vue.inject('getMobileItem'),
      getMobileItemRect: vue.inject('getMobileItemRect'),
      getCurrentRoute: vue.inject('getCurrentRoute'),
      updateIsCollapsed: vue.inject('updateIsCollapsed'),
      updateActiveShow: vue.inject('updateActiveShow'),
      setMobileItem: vue.inject('setMobileItem'),
      unsetMobileItem: vue.inject('unsetMobileItem'),
      clearMobileItemTimeout: vue.inject('clearMobileItemTimeout'),
      onRouteChange: vue.inject('onRouteChange'),
      emitItemClick: vue.inject('emitItemClick')
    };
  };

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

  function useItem(props) {
    var router = vue.getCurrentInstance().appContext.config.globalProperties.$router;

    var _useSidebar = useSidebar(),
        sidebarProps = _useSidebar.getSidebarProps,
        isCollapsed = _useSidebar.getIsCollapsed,
        activeShow = _useSidebar.getActiveShow,
        mobileItem = _useSidebar.getMobileItem,
        mobileItemRect = _useSidebar.getMobileItemRect,
        currentRoute = _useSidebar.getCurrentRoute,
        updateActiveShow = _useSidebar.updateActiveShow,
        setMobileItem = _useSidebar.setMobileItem,
        unsetMobileItem = _useSidebar.unsetMobileItem,
        clearMobileItemTimeout = _useSidebar.clearMobileItemTimeout,
        emitItemClick = _useSidebar.emitItemClick;

    var emitScrollUpdate = vue.inject('emitScrollUpdate');
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

      if (sidebarProps.disableHover) {
        if (isMobileItem.value && hasChild.value) {
          clearMobileItemTimeout();
        }
      } else {
        clearMobileItemTimeout();
        emitMobileItem(event, event.currentTarget);
      }
    };

    var onMouseLeave = function onMouseLeave() {
      if (sidebarProps.disableHover && !hasChild.value) return;

      if (isMobileItem.value) {
        unsetMobileItem(false, !sidebarProps.disableHover ? 300 : undefined);
      }
    };

    var emitMobileItem = function emitMobileItem(event, itemEl) {
      if (isMobileItem.value) return;

      if (isCollapsed.value) {
        setTimeout(function () {
          if (isFirstLevel.value) {
            if (!isMobileItem.value) {
              setMobileItem({
                item: props.item,
                itemEl: itemEl
              });
            }
          }

          if (event.type === 'click' && !hasChild.value) {
            unsetMobileItem(false, !isFirstLevel.value ? 300 : undefined);
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
        if (!hasChild.value) return false;
        if (isCollapsed.value && isFirstLevel.value) return hover.value;
        if (sidebarProps.showChild) return true;
        return sidebarProps.showOneChild && isFirstLevel.value ? props.item.id === activeShow.value : itemShow.value;
      },
      set: function set(show) {
        if (sidebarProps.showOneChild && isFirstLevel.value) {
          show ? updateActiveShow(props.item.id) : updateActiveShow(null);
        }

        itemShow.value = show;
      }
    });
    var hover = vue.computed(function () {
      return isCollapsed.value && isFirstLevel.value ? isMobileItem.value : itemHover.value;
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
      var ariaExpanded = hasChild.value ? show.value : null;
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
      var _mobileItem$value;

      return props.item.id === ((_mobileItem$value = mobileItem.value) === null || _mobileItem$value === void 0 ? void 0 : _mobileItem$value.id);
    });
    var mobileItemDropdownStyle = vue.computed(function () {
      return [{
        position: 'absolute'
      }, {
        top: "".concat(mobileItemRect.value.top + mobileItemRect.value.height, "px")
      }, !sidebarProps.rtl ? {
        left: sidebarProps.widthCollapsed
      } : {
        right: sidebarProps.widthCollapsed
      }, {
        width: "".concat(mobileItemRect.value.maxWidth, "px")
      }, {
        'max-height': "".concat(mobileItemRect.value.maxHeight, "px")
      }, {
        'overflow-y': 'auto'
      }];
    });
    var mobileItemStyle = vue.computed(function () {
      return [{
        position: 'absolute'
      }, {
        top: "".concat(mobileItemRect.value.top, "px")
      }, !sidebarProps.rtl ? {
        left: sidebarProps.widthCollapsed
      } : {
        right: sidebarProps.widthCollapsed
      }, {
        width: "".concat(mobileItemRect.value.maxWidth, "px")
      }, {
        height: "".concat(mobileItemRect.value.height, "px")
      }, {
        'padding-right': "".concat(mobileItemRect.value.padding)
      }, {
        'padding-left': "".concat(mobileItemRect.value.padding)
      }, {
        'z-index': '20'
      }];
    });
    var mobileItemBackgroundStyle = vue.computed(function () {
      return [{
        position: 'absolute'
      }, {
        top: "".concat(mobileItemRect.value.top, "px")
      }, !sidebarProps.rtl ? {
        left: '0px'
      } : {
        right: '0px'
      }, {
        width: "".concat(mobileItemRect.value.maxWidth + parseInt(sidebarProps.widthCollapsed), "px")
      }, {
        height: "".concat(mobileItemRect.value.height, "px")
      }, {
        'z-index': '10'
      }];
    });
    vue.watch(function () {
      return active.value;
    }, function () {
      if (active.value) {
        show.value = true;
      }
    }, {
      immediate: true
    });
    return {
      active: active,
      exactActive: exactActive,
      show: show,
      hover: hover,
      isFirstLevel: isFirstLevel,
      isHidden: isHidden,
      hasChild: hasChild,
      linkClass: linkClass,
      linkAttrs: linkAttrs,
      itemClass: itemClass,
      isMobileItem: isMobileItem,
      mobileItemDropdownStyle: mobileItemDropdownStyle,
      mobileItemStyle: mobileItemStyle,
      mobileItemBackgroundStyle: mobileItemBackgroundStyle,
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
      const {
        getSidebarProps,
        getIsCollapsed: isCollapsed
      } = useSidebar();
      const { linkComponentName } = vue.toRefs(getSidebarProps);

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
        mobileItemStyle,
        mobileItemDropdownStyle,
        mobileItemBackgroundStyle,
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
      const { getIsCollapsed: isCollapsed } = useSidebar();

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

      vue.watch(() => isCollapsed.value, () => {
        onScrollUpdate();
      });

      vue.onMounted(() => {
        onScrollUpdate();
        window.addEventListener('resize', onScrollUpdate);
      });
      vue.onUnmounted(() => {
        window.removeEventListener('resize', onScrollUpdate);
      });

      vue.provide('emitScrollUpdate', onScrollUpdate);

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
      const {
        getSidebarRef: sidebarMenuRef,
        getIsCollapsed: isCollapsed,
        updateIsCollapsed,
        unsetMobileItem,
        updateCurrentRoute
      } = initSidebar(props, context);

      const computedMenu = vue.computed(() => {
        let id = 0;
        function transformItems (items) {
          function randomId () {
            return `${Date.now() + '' + id++}`
          }
          return items.map(item => {
            return { id: randomId(), ...item, ...(item.child && { child: transformItems(item.child) }) }
          })
        }
        return transformItems(props.menu)
      });

      const sidebarWidth = vue.computed(() => {
        return isCollapsed.value ? props.widthCollapsed : props.width
      });

      const sidebarClass = vue.computed(() => {
        return [
          !isCollapsed.value ? 'vsm_expanded' : 'vsm_collapsed',
          props.theme ? `vsm_${props.theme}` : '',
          props.rtl ? 'vsm_rtl' : '',
          props.relative ? 'vsm_relative' : ''
        ]
      });

      const onToggleClick = () => {
        unsetMobileItem();
        updateIsCollapsed(!isCollapsed.value);
        context.emit('update:collapsed', isCollapsed.value);
      };

      vue.watch(() => props.collapsed, (currentCollapsed) => {
        unsetMobileItem();
        updateIsCollapsed(currentCollapsed);
      });

      const router = vue.getCurrentInstance().appContext.config.globalProperties.$router;
      if (!router) {
        vue.onMounted(() => {
          window.addEventListener('hashchange', updateCurrentRoute);
        });
        vue.onUnmounted(() => {
          window.removeEventListener('hashchange', updateCurrentRoute);
        });
      }

      return {
        sidebarMenuRef,
        isCollapsed,
        computedMenu,
        sidebarWidth,
        sidebarClass,
        onToggleClick,
        onRouteChange: updateCurrentRoute
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
            style: {'width': $setup.sidebarWidth}
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
