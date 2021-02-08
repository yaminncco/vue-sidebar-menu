(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['vue-sidebar-menu'] = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
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
      return isLinkActive(props.item);
    });

    var isLinkActive = function isLinkActive(item) {
      if (!item.href || item.external) return false;

      if (router) {
        var route = router.resolve(item.href);
        var routerCurrentRoute = router.currentRoute.value;
        return activeRecordIndex(route, routerCurrentRoute) > -1 && activeRecordIndex(route, routerCurrentRoute) === routerCurrentRoute.matched.length - 1 && isSameRouteLocationParams(routerCurrentRoute.params, route.params);
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

    var onRouteChange = function onRouteChange() {
      if (sidebarProps.showChild) return;

      if (active.value) {
        show.value = true;
      }
    };

    var onLinkClick = function onLinkClick(event) {
      if (!props.item.href || props.item.disabled) {
        event.preventDefault();
        if (props.item.disabled) return;
      }

      emitMobileItem(event, event.currentTarget.parentElement);

      if (hasChild.value || !sidebarProps.showChild) {
        if (isCollapsed.value && isFirstLevel.value) return;

        if (!props.item.href || exactActive.value) {
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
      if (props.item.disabled || sidebarProps.disableHover) return;
      if (mobileItemTimeout.value) clearTimeout(mobileItemTimeout.value);
      emitMobileItem(event, event.currentTarget);
    };

    var onMouseLeave = function onMouseLeave() {
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
          if (mobileItem.value !== props.item) {
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
        if (!hasChild.value) return false;
        if (sidebarProps.showChild) return true;
        if (isCollapsed.value && isFirstLevel.value) return hover.value;
        return sidebarProps.showOneChild && isFirstLevel.value ? props.item === activeShow.value : itemShow.value;
      },
      set: function set(show) {
        if (sidebarProps.showOneChild && isFirstLevel.value) {
          show ? activeShow.value = props.item : activeShow.value = null;
        }

        itemShow.value = show;
      }
    });
    var hover = vue.computed(function () {
      return isCollapsed.value && isFirstLevel.value ? props.item === mobileItem.value : itemHover.value;
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
      onRouteChange: onRouteChange,
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

  var script = {
    name: 'SidebarMenuLink',
    inheritAttrs: false,
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      isHyperLink: function isHyperLink() {
        return !!(!this.item.href || this.item.external);
      }
    }
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_router_link = vue.resolveComponent("router-link");

    return $options.isHyperLink ? (vue.openBlock(), vue.createBlock("a", vue.mergeProps({
      key: 0
    }, _ctx.$attrs), [vue.renderSlot(_ctx.$slots, "default")], 16
    /* FULL_PROPS */
    )) : (vue.openBlock(), vue.createBlock(_component_router_link, {
      key: 1,
      custom: "",
      to: $props.item.href
    }, {
      default: vue.withCtx(function (_ref) {
        var href = _ref.href,
            navigate = _ref.navigate;
        return [vue.createVNode("a", vue.mergeProps(_ctx.$attrs, {
          href: href,
          onClick: navigate
        }), [vue.renderSlot(_ctx.$slots, "default")], 16
        /* FULL_PROPS */
        , ["href", "onClick"])];
      }),
      _: 3
    }, 8
    /* PROPS */
    , ["to"]));
  }

  script.render = render;
  script.__file = "src/components/SidebarMenuLink.vue";

  var script$1 = {
    name: 'SidebarMenuIcon',
    props: {
      icon: {
        type: [String, Object],
        default: ''
      }
    }
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.icon.element ? $props.icon.element : 'i'), vue.mergeProps({
      class: ["vsm--icon", typeof $props.icon === 'string' || $props.icon instanceof String ? $props.icon : $props.icon.class],
      "aria-hidden": "true"
    }, $props.icon.attributes), {
      default: vue.withCtx(function () {
        return [vue.createTextVNode(vue.toDisplayString($props.icon.text), 1
        /* TEXT */
        )];
      }),
      _: 1
    }, 16
    /* FULL_PROPS */
    , ["class"]);
  }

  script$1.render = render$1;
  script$1.__file = "src/components/SidebarMenuIcon.vue";

  var script$2 = {
    name: 'SidebarMenuBadge',
    props: {
      badge: {
        type: Object,
        default: function _default() {}
      }
    }
  };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.badge.element ? $props.badge.element : 'span'), vue.mergeProps({
      class: ["vsm--badge", $props.badge.class]
    }, $props.badge.attributes), {
      default: vue.withCtx(function () {
        return [vue.createTextVNode(vue.toDisplayString($props.badge.text), 1
        /* TEXT */
        )];
      }),
      _: 1
    }, 16
    /* FULL_PROPS */
    , ["class"]);
  }

  script$2.render = render$2;
  script$2.__file = "src/components/SidebarMenuBadge.vue";

  var script$3 = {
    name: 'SidebarMenuItem',
    components: {
      SidebarMenuLink: script,
      SidebarMenuIcon: script$1,
      SidebarMenuBadge: script$2
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
    setup: function setup(props) {
      var sidebarProps = vue.inject('vsm-props');

      var _useMenu = useMenu(sidebarProps),
          isCollapsed = _useMenu.isCollapsed,
          currentRoute = _useMenu.currentRoute,
          mobileItemStyle = _useMenu.mobileItemStyle,
          mobileItemDropdownStyle = _useMenu.mobileItemDropdownStyle,
          mobileItemBackgroundStyle = _useMenu.mobileItemBackgroundStyle;

      var _toRefs = vue.toRefs(sidebarProps),
          disableHover = _toRefs.disableHover,
          linkComponentName = _toRefs.linkComponentName;

      var _useItem = useItem(props),
          active = _useItem.active,
          exactActive = _useItem.exactActive,
          show = _useItem.show,
          hover = _useItem.hover,
          isFirstLevel = _useItem.isFirstLevel,
          isHidden = _useItem.isHidden,
          hasChild = _useItem.hasChild,
          linkClass = _useItem.linkClass,
          linkAttrs = _useItem.linkAttrs,
          itemClass = _useItem.itemClass,
          isMobileItem = _useItem.isMobileItem,
          onRouteChange = _useItem.onRouteChange,
          onLinkClick = _useItem.onLinkClick,
          onMouseOver = _useItem.onMouseOver,
          onMouseOut = _useItem.onMouseOut,
          onMouseEnter = _useItem.onMouseEnter,
          onMouseLeave = _useItem.onMouseLeave,
          onExpandEnter = _useItem.onExpandEnter,
          onExpandAfterEnter = _useItem.onExpandAfterEnter,
          onExpandBeforeLeave = _useItem.onExpandBeforeLeave,
          onExpandAfterLeave = _useItem.onExpandAfterLeave;

      var router = vue.getCurrentInstance().appContext.config.globalProperties.$router;

      if (router) {
        vue.watch(function () {
          return router.currentRoute.value;
        }, function () {
          onRouteChange();
        }, {
          immediate: true
        });
      } else {
        vue.watch(function () {
          return currentRoute.value;
        }, function () {
          onRouteChange();
        }, {
          immediate: true
        });
        window.addEventListener('hashchange', onRouteChange);
        vue.onUnmounted(function () {
          window.removeEventListener('hashchange', onRouteChange);
        });
      }

      return {
        isCollapsed: isCollapsed,
        disableHover: disableHover,
        linkComponentName: linkComponentName,
        active: active,
        exactActive: exactActive,
        isMobileItem: isMobileItem,
        mobileItemStyle: mobileItemStyle,
        mobileItemDropdownStyle: mobileItemDropdownStyle,
        mobileItemBackgroundStyle: mobileItemBackgroundStyle,
        show: show,
        hover: hover,
        isFirstLevel: isFirstLevel,
        isHidden: isHidden,
        hasChild: hasChild,
        linkClass: linkClass,
        linkAttrs: linkAttrs,
        itemClass: itemClass,
        onRouteChange: onRouteChange,
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
  };

  var _hoisted_1 = {
    key: 0
  };
  var _hoisted_2 = {
    class: "vsm--dropdown"
  };
  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_sidebar_menu_icon = vue.resolveComponent("sidebar-menu-icon");

    var _component_sidebar_menu_badge = vue.resolveComponent("sidebar-menu-badge");

    var _component_sidebar_menu_item = vue.resolveComponent("sidebar-menu-item");

    return $props.item.component && !$setup.isHidden ? (vue.openBlock(), vue.createBlock("li", _hoisted_1, [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.item.component), $props.item.props, null, 16
    /* FULL_PROPS */
    ))])) : $props.item.header && !$setup.isHidden ? (vue.openBlock(), vue.createBlock("li", vue.mergeProps({
      key: 1,
      class: ["vsm--header", $props.item.class]
    }, $props.item.attributes), vue.toDisplayString($props.item.header), 17
    /* TEXT, FULL_PROPS */
    )) : !$setup.isHidden ? (vue.openBlock(), vue.createBlock("li", vue.mergeProps({
      key: 2,
      class: $setup.itemClass,
      onMouseover: _cache[1] || (_cache[1] = function () {
        return $setup.onMouseOver.apply($setup, arguments);
      }),
      onMouseout: _cache[2] || (_cache[2] = function () {
        return $setup.onMouseOut.apply($setup, arguments);
      })
    }, vue.toHandlers($setup.isCollapsed && $setup.isFirstLevel ? {
      mouseenter: $setup.onMouseEnter,
      mouseleave: $setup.onMouseLeave
    } : {})), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.linkComponentName ? $setup.linkComponentName : 'SidebarMenuLink'), vue.mergeProps({
      item: $props.item,
      class: $setup.linkClass
    }, $setup.linkAttrs, {
      onClick: $setup.onLinkClick
    }), {
      default: vue.withCtx(function () {
        return [$setup.isCollapsed && $setup.isFirstLevel ? (vue.openBlock(), vue.createBlock(vue.Transition, {
          key: 0,
          name: "slide-animation"
        }, {
          default: vue.withCtx(function () {
            return [$setup.hover ? (vue.openBlock(), vue.createBlock("div", {
              key: 0,
              class: "vsm--mobile-bg",
              style: $setup.mobileItemBackgroundStyle
            }, null, 4
            /* STYLE */
            )) : vue.createCommentVNode("v-if", true)];
          }),
          _: 1
        })) : vue.createCommentVNode("v-if", true), $props.item.icon ? (vue.openBlock(), vue.createBlock(_component_sidebar_menu_icon, {
          key: 1,
          icon: $props.item.icon
        }, null, 8
        /* PROPS */
        , ["icon"])) : vue.createCommentVNode("v-if", true), vue.createVNode("div", {
          class: ["vsm--title", $setup.isCollapsed && $setup.isFirstLevel && !$setup.isMobileItem && 'vsm--title_hidden'],
          style: $setup.isMobileItem && $setup.mobileItemStyle
        }, [vue.createVNode("span", null, vue.toDisplayString($props.item.title), 1
        /* TEXT */
        ), $props.item.badge ? (vue.openBlock(), vue.createBlock(_component_sidebar_menu_badge, {
          key: 0,
          badge: $props.item.badge
        }, null, 8
        /* PROPS */
        , ["badge"])) : vue.createCommentVNode("v-if", true), $setup.hasChild ? (vue.openBlock(), vue.createBlock("div", {
          key: 1,
          class: ["vsm--arrow", {
            'vsm--arrow_open': $setup.show
          }]
        }, [vue.renderSlot(_ctx.$slots, "dropdown-icon", {
          isOpen: $setup.show
        })], 2
        /* CLASS */
        )) : vue.createCommentVNode("v-if", true)], 6
        /* CLASS, STYLE */
        )];
      }),
      _: 1
    }, 16
    /* FULL_PROPS */
    , ["item", "class", "onClick"])), $setup.hasChild ? (vue.openBlock(), vue.createBlock(vue.Transition, {
      key: 0,
      appear: $setup.isMobileItem,
      name: "expand",
      onEnter: $setup.onExpandEnter,
      onAfterEnter: $setup.onExpandAfterEnter,
      onBeforeLeave: $setup.onExpandBeforeLeave,
      onAfterLeave: $setup.onExpandAfterLeave
    }, {
      default: vue.withCtx(function () {
        return [$setup.show ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          class: ["vsm--child", $setup.isMobileItem && 'vsm--child_mobile'],
          style: $setup.isMobileItem && $setup.mobileItemDropdownStyle
        }, [vue.createVNode("ul", _hoisted_2, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.item.child, function (subItem, index) {
          return vue.openBlock(), vue.createBlock(_component_sidebar_menu_item, {
            key: index,
            item: subItem,
            level: $props.level + 1
          }, {
            "dropdown-icon": vue.withCtx(function (_ref) {
              var isOpen = _ref.isOpen;
              return [vue.renderSlot(_ctx.$slots, "dropdown-icon", {
                isOpen: isOpen
              })];
            }),
            _: 2
          }, 1032
          /* PROPS, DYNAMIC_SLOTS */
          , ["item", "level"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))])], 6
        /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)];
      }),
      _: 1
    }, 8
    /* PROPS */
    , ["appear", "onEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"])) : vue.createCommentVNode("v-if", true)], 16
    /* FULL_PROPS */
    )) : vue.createCommentVNode("v-if", true);
  }

  script$3.render = render$3;
  script$3.__file = "src/components/SidebarMenuItem.vue";

  var script$4 = {
    name: 'SidebarMenuScroll',
    setup: function setup() {
      var sidebarProps = vue.inject('vsm-props');

      var _useMenu = useMenu(sidebarProps),
          isCollapsed = _useMenu.isCollapsed;

      var scrollRef = vue.ref(null);
      var scrollBarRef = vue.ref(null);
      var scrollThumbRef = vue.ref(null);
      var thumbYPerc = vue.ref(0);
      var thumbHeightPerc = vue.ref(0);
      var cursorY = 0;
      var cursorDown = false;
      var thumbStyle = vue.computed(function () {
        return {
          height: "".concat(thumbHeightPerc.value, "%"),
          transform: "translateY(".concat(thumbYPerc.value, "%)")
        };
      });

      var onScrollUpdate = function onScrollUpdate() {
        vue.nextTick(function () {
          updateThumb();
        });
      };

      vue.provide('emitScrollUpdate', onScrollUpdate);
      vue.onMounted(function () {
        onScrollUpdate();
        window.addEventListener('resize', onScrollUpdate);
      });
      vue.onUnmounted(function () {
        window.removeEventListener('resize', onScrollUpdate);
      });
      vue.watch(function () {
        return isCollapsed.value;
      }, function () {
        onScrollUpdate();
      });

      var onScroll = function onScroll() {
        requestAnimationFrame(onScrollUpdate);
      };

      var onClick = function onClick(e) {
        var offset = Math.abs(scrollBarRef.value.getBoundingClientRect().y - e.clientY);
        var thumbHalf = scrollThumbRef.value.offsetHeight / 2;
        updateScrollTop(offset - thumbHalf);
      };

      var onMouseDown = function onMouseDown(e) {
        e.stopImmediatePropagation();
        cursorDown = true;
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        cursorY = scrollThumbRef.value.offsetHeight - (e.clientY - scrollThumbRef.value.getBoundingClientRect().y);
      };

      var onMouseMove = function onMouseMove(e) {
        if (!cursorDown) return;
        var offset = e.clientY - scrollBarRef.value.getBoundingClientRect().y;
        var thumbClickPosition = scrollThumbRef.value.offsetHeight - cursorY;
        updateScrollTop(offset - thumbClickPosition);
      };

      var onMouseUp = function onMouseUp(e) {
        cursorDown = false;
        cursorY = 0;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      var updateThumb = function updateThumb() {
        var heightPerc = scrollRef.value.clientHeight * 100 / scrollRef.value.scrollHeight;
        thumbHeightPerc.value = heightPerc < 100 ? heightPerc : 0;
        thumbYPerc.value = scrollRef.value.scrollTop * 100 / scrollRef.value.clientHeight;
      };

      var updateScrollTop = function updateScrollTop(y) {
        var scrollPerc = y * 100 / scrollBarRef.value.offsetHeight;
        scrollRef.value.scrollTop = scrollPerc * scrollRef.value.scrollHeight / 100;
      };

      return {
        scrollRef: scrollRef,
        scrollBarRef: scrollBarRef,
        scrollThumbRef: scrollThumbRef,
        thumbStyle: thumbStyle,
        onScroll: onScroll,
        onClick: onClick,
        onMouseDown: onMouseDown
      };
    }
  };

  var _hoisted_1$1 = {
    class: "vsm--scroll-wrapper"
  };
  var _hoisted_2$1 = {
    class: "vsm--scroll-overflow"
  };
  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [vue.createVNode("div", _hoisted_2$1, [vue.createVNode("div", {
      ref: "scrollRef",
      class: "vsm--scroll",
      onScroll: _cache[1] || (_cache[1] = function () {
        return $setup.onScroll.apply($setup, arguments);
      })
    }, [vue.renderSlot(_ctx.$slots, "default")], 544
    /* HYDRATE_EVENTS, NEED_PATCH */
    ), vue.createVNode("div", {
      ref: "scrollBarRef",
      class: "vsm--scroll-bar",
      onMousedown: _cache[3] || (_cache[3] = function () {
        return $setup.onClick.apply($setup, arguments);
      })
    }, [vue.createVNode("div", {
      ref: "scrollThumbRef",
      class: "vsm--scroll-thumb",
      style: $setup.thumbStyle,
      onMousedown: _cache[2] || (_cache[2] = function () {
        return $setup.onMouseDown.apply($setup, arguments);
      })
    }, null, 36
    /* STYLE, HYDRATE_EVENTS */
    )], 544
    /* HYDRATE_EVENTS, NEED_PATCH */
    )])]);
  }

  script$4.render = render$4;
  script$4.__file = "src/components/SidebarMenuScroll.vue";

  var script$5 = {
    name: 'SidebarMenu',
    components: {
      SidebarMenuItem: script$3,
      SidebarMenuScroll: script$4
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
      'item-click': function itemClick(event, item) {
        return !!(event && item);
      },
      'update:collapsed': function updateCollapsed(collapsed) {
        return !!(typeof collapsed === 'boolean');
      }
    },
    setup: function setup(props, context) {
      vue.provide('vsm-props', props);

      var _useMenu = useMenu(props, context),
          sidebarMenuRef = _useMenu.sidebarMenuRef,
          isCollapsed = _useMenu.isCollapsed,
          sidebarWidth = _useMenu.sidebarWidth,
          sidebarClass = _useMenu.sidebarClass,
          onToggleClick = _useMenu.onToggleClick,
          onItemClick = _useMenu.onItemClick,
          onRouteChange = _useMenu.onRouteChange,
          unsetMobileItem = _useMenu.unsetMobileItem;

      vue.provide('emitItemClick', onItemClick);
      vue.provide('emitScrollUpdate');
      vue.provide('onRouteChange', onRouteChange);

      var _toRefs = vue.toRefs(props),
          collapsed = _toRefs.collapsed;

      isCollapsed.value = collapsed.value;
      vue.watch(function () {
        return props.collapsed;
      }, function (currentCollapsed) {
        unsetMobileItem();
        isCollapsed.value = currentCollapsed;
      });
      return {
        sidebarMenuRef: sidebarMenuRef,
        isCollapsed: isCollapsed,
        sidebarWidth: sidebarWidth,
        sidebarClass: sidebarClass,
        onToggleClick: onToggleClick,
        onItemClick: onItemClick,
        onRouteChange: onRouteChange
      };
    }
  };

  var _hoisted_1$2 = /*#__PURE__*/vue.createVNode("span", {
    class: "vsm--arrow_default"
  }, null, -1
  /* HOISTED */
  );

  var _hoisted_2$2 = /*#__PURE__*/vue.createVNode("span", {
    class: "vsm--toggle-btn_default"
  }, null, -1
  /* HOISTED */
  );

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_sidebar_menu_item = vue.resolveComponent("sidebar-menu-item");

    var _component_sidebar_menu_scroll = vue.resolveComponent("sidebar-menu-scroll");

    return vue.openBlock(), vue.createBlock("div", {
      ref: "sidebarMenuRef",
      class: ["v-sidebar-menu", $setup.sidebarClass],
      style: {
        'max-width': $setup.sidebarWidth
      }
    }, [vue.renderSlot(_ctx.$slots, "header"), vue.createVNode(_component_sidebar_menu_scroll, null, {
      default: vue.withCtx(function () {
        return [vue.createVNode("ul", {
          class: "vsm--menu",
          style: {
            'width': $setup.sidebarWidth,
            'position': 'static !important'
          }
        }, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.menu, function (item, index) {
          return vue.openBlock(), vue.createBlock(_component_sidebar_menu_item, {
            key: index,
            item: item
          }, {
            "dropdown-icon": vue.withCtx(function (_ref) {
              var isOpen = _ref.isOpen;
              return [vue.renderSlot(_ctx.$slots, "dropdown-icon", {
                isOpen: isOpen
              }, function () {
                return [_hoisted_1$2];
              })];
            }),
            _: 2
          }, 1032
          /* PROPS, DYNAMIC_SLOTS */
          , ["item"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))], 4
        /* STYLE */
        )];
      }),
      _: 1
    }), vue.renderSlot(_ctx.$slots, "footer"), !$props.hideToggle ? (vue.openBlock(), vue.createBlock("button", {
      key: 0,
      class: "vsm--toggle-btn",
      onClick: _cache[1] || (_cache[1] = function () {
        return $setup.onToggleClick.apply($setup, arguments);
      })
    }, [vue.renderSlot(_ctx.$slots, "toggle-icon", {}, function () {
      return [_hoisted_2$2];
    })])) : vue.createCommentVNode("v-if", true)], 6
    /* CLASS, STYLE */
    );
  }

  script$5.render = render$5;
  script$5.__file = "src/components/SidebarMenu.vue";

  var index = {
    install: function install(Vue) {
      Vue.component('SidebarMenu', script$5);
    }
  };

  exports.SidebarMenu = script$5;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue-sidebar-menu.js.map
