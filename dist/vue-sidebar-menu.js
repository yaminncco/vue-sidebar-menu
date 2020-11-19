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
    height: 0
  });
  var parentRect = vue.reactive({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  });
  var mobileItemTimeout = vue.ref(null);
  function useMenu(props, context) {
    isCollapsed.value = props.collapsed;
    var sidebarWidth = vue.computed(function () {
      return isCollapsed.value ? props.widthCollapsed : props.width;
    });
    var sidebarClass = vue.computed(function () {
      return [!isCollapsed.value ? 'vsm_expanded' : 'vsm_collapsed', props.theme ? "vsm_".concat(props.theme) : '', props.rtl ? 'vsm_rtl' : '', props.relative ? 'vsm_relative' : ''];
    });
    var mobileItemStyle = vue.computed(function () {
      return [{
        'position': 'absolute'
      }, {
        'top': "".concat(mobileItemRect.top, "px")
      }, props.rtl ? {
        'right': '0px'
      } : {
        'left': '0px'
      }, props.rtl ? {
        'padding-right': sidebarWidth.value
      } : {
        'padding-left': sidebarWidth.value
      }, props.rtl && {
        'direction': 'rtl'
      }, {
        'z-index': 0
      }, {
        'width': "".concat(parentRect.width - parentRect.left, "px")
      }, {
        'max-width': props.width
      }];
    });
    var mobileItemDropdownStyle = vue.computed(function () {
      return [{
        'position': 'absolute'
      }, {
        'top': "".concat(mobileItemRect.height, "px")
      }, {
        'width': '100%'
      }, {
        'max-height': "".concat(parentRect.height - (mobileItemRect.top + mobileItemRect.height) - parentRect.top, "px")
      }, {
        'overflow-y': 'auto'
      }];
    });
    var mobileItemBackgroundStyle = vue.computed(function () {
      return [{
        'position': 'absolute'
      }, {
        'top': '0px'
      }, {
        'left': '0px'
      }, {
        'right': '0px'
      }, {
        'width': '100%'
      }, {
        'height': "".concat(mobileItemRect.height, "px")
      }, {
        'z-index': -1
      }];
    });

    var onMouseLeave = function onMouseLeave() {
      unsetMobileItem(false, 300);
    };

    var onToggleClick = function onToggleClick() {
      unsetMobileItem();
      isCollapsed.value = !isCollapsed.value;
      context.emit('update:collapsed', isCollapsed.value);
    };

    var onItemClick = function onItemClick(event, item, node) {
      context.emit('item-click', event, item, node);
    };

    var setMobileItem = function setMobileItem(_ref) {
      var item = _ref.item,
          itemEl = _ref.itemEl;
      if (mobileItem.value === item) return;
      var sidebarEl = sidebarMenuRef.value;
      var sidebarTop = sidebarEl.getBoundingClientRect().top;
      var itemLinkEl = itemEl.children[0];

      var _itemLinkEl$getBoundi = itemLinkEl.getBoundingClientRect(),
          top = _itemLinkEl$getBoundi.top,
          height = _itemLinkEl$getBoundi.height;

      updateParentRect();
      mobileItem.value = item;
      mobileItemRect.top = top - sidebarTop;
      mobileItemRect.height = height;
    };

    var unsetMobileItem = function unsetMobileItem() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;
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

    var updateParentRect = function updateParentRect() {
      var sidebarEl = sidebarMenuRef.value;

      var _sidebarEl$getBoundin = sidebarEl.getBoundingClientRect(),
          sidebarTop = _sidebarEl$getBoundin.top,
          sidebarLeft = _sidebarEl$getBoundin.left,
          sidebarRight = _sidebarEl$getBoundin.right;

      var parent = props.relative ? sidebarEl.parentElement : document.documentElement;
      parentRect.height = parent.clientHeight;
      parentRect.width = parent.clientWidth;

      if (props.relative) {
        var _parent$getBoundingCl = parent.getBoundingClientRect(),
            parentTop = _parent$getBoundingCl.top,
            parentLeft = _parent$getBoundingCl.left;

        parentRect.top = sidebarTop - (parentTop + parent.clientTop);
        parentRect.left = props.rtl ? parentRect.width - sidebarRight + (parentLeft + parent.clientLeft) : sidebarLeft - (parentLeft + parent.clientLeft);
      } else {
        parentRect.top = sidebarTop;
        parentRect.left = props.rtl ? parentRect.width - sidebarRight : sidebarLeft;
      }
    };

    return {
      sidebarMenuRef: sidebarMenuRef,
      isCollapsed: isCollapsed,
      sidebarWidth: sidebarWidth,
      sidebarClass: sidebarClass,
      onMouseLeave: onMouseLeave,
      onToggleClick: onToggleClick,
      onItemClick: onItemClick,
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
    var currentLocation = vue.ref('');
    var sidebarProps = vue.inject('vsm-props');
    var emitItemClick = vue.inject('emitItemClick');

    var _useMenu = useMenu(sidebarProps),
        isCollapsed = _useMenu.isCollapsed,
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
        var currentRoute = router.currentRoute.value;
        return activeRecordIndex(route, currentRoute) > -1 && activeRecordIndex(route, currentRoute) === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.params);
      } else {
        return item.href === currentLocation.value;
      }
    };

    var isChildActive = function isChildActive(child) {
      if (!child) return false;
      return child.some(function (item) {
        return isLinkActive(item) || isChildActive(item.child);
      });
    };

    var onRouteChange = function onRouteChange() {
      currentLocation.value = window.location.pathname + window.location.search + window.location.hash;
      if (sidebarProps.showChild || props.isMobileItem) return;

      if (active.value) {
        show.value = true;
      }
    };

    var onLinkClick = function onLinkClick(event) {
      if (props.item.disabled) return;

      if (!props.item.href) {
        event.preventDefault();
      }

      emitMobileItem(event, event.currentTarget.offsetParent);

      if (hasChild.value || !sidebarProps.showChild || !props.isMobileItem) {
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
      if (mobileItemTimeout.value) clearTimeout(mobileItemTimeout.value);

      if (!sidebarProps.disableHover) {
        emitMobileItem(event, event.currentTarget);
      }
    };

    var onMouseOut = function onMouseOut(event) {
      event.stopPropagation();
      itemHover.value = false;
    };

    var emitMobileItem = function emitMobileItem(event, itemEl) {
      if (hover.value) return;
      if (!isCollapsed.value || !isFirstLevel.value || props.isMobileItem) return;

      if (event.type === 'mouseover' || sidebarProps.disableHover) {
        if (mobileItem.value) {
          unsetMobileItem();
        }
      }

      setTimeout(function () {
        if (mobileItem.value !== props.item) {
          setMobileItem({
            item: props.item,
            itemEl: itemEl
          });
        }

        if (event.type === 'click' && !hasChild.value) {
          unsetMobileItem(false);
        }
      }, 0);
    };

    var onExpandEnter = function onExpandEnter(el) {
      el.style.height = el.scrollHeight + 'px';
    };

    var onExpandAfterEnter = function onExpandAfterEnter(el) {
      el.style.height = 'auto';
    };

    var onExpandBeforeLeave = function onExpandBeforeLeave(el) {
      if (isCollapsed.value && isFirstLevel.value) {
        el.style.display = 'none';
        return;
      }

      el.style.height = el.scrollHeight + 'px';
    };

    var show = vue.computed({
      get: function get() {
        if (!hasChild.value) return false;
        if (sidebarProps.showChild || props.isMobileItem) return true;
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
      if (isCollapsed.value && isFirstLevel.value) {
        return props.item === mobileItem.value;
      } else {
        return itemHover.value;
      }
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
      return ['vsm--link', !props.isMobileItem ? "vsm--link_level-".concat(props.level) : '', {
        'vsm--link_mobile': props.isMobileItem
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
    var itemClass = vue.computed(function () {
      return ['vsm--item', {
        'vsm--item_mobile': props.isMobileItem
      }];
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
      itemClass: itemClass,
      onRouteChange: onRouteChange,
      onLinkClick: onLinkClick,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut,
      onExpandEnter: onExpandEnter,
      onExpandAfterEnter: onExpandAfterEnter,
      onExpandBeforeLeave: onExpandBeforeLeave
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

  var script = {
    name: 'SidebarMenuLink',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      attrs: function attrs() {
        var target = this.item.external ? '_blank' : '_self';
        var tabindex = this.item.disabled ? -1 : null;
        return _objectSpread2(_objectSpread2({
          target: target,
          tabindex: tabindex
        }, this.item.attributes), this.$attrs);
      },
      isHyperLink: function isHyperLink() {
        return !!(!this.item.href || this.item.external);
      }
    }
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_router_link = vue.resolveComponent("router-link");

    return $options.isHyperLink ? (vue.openBlock(), vue.createBlock("a", vue.mergeProps({
      key: 0
    }, $options.attrs, {
      href: $props.item.href ? $props.item.href : '#'
    }), [vue.renderSlot(_ctx.$slots, "default")], 16
    /* FULL_PROPS */
    , ["href"])) : (vue.openBlock(), vue.createBlock(_component_router_link, {
      key: 1,
      custom: "",
      to: $props.item.href
    }, {
      default: vue.withCtx(function (_ref) {
        var href = _ref.href,
            isExactActive = _ref.isExactActive;
        return [vue.createVNode("a", vue.mergeProps($options.attrs, {
          href: href,
          "aria-current": isExactActive ? 'page' : null
        }), [vue.renderSlot(_ctx.$slots, "default")], 16
        /* FULL_PROPS */
        , ["href", "aria-current"])];
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
      class: ["vsm--icon", typeof $props.icon === 'string' || $props.icon instanceof String ? $props.icon : $props.icon.class]
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
      },
      isMobileItem: {
        type: Boolean,
        default: false
      }
    },
    setup: function setup(props) {
      var sidebarProps = vue.inject('vsm-props');

      var _useMenu = useMenu(sidebarProps),
          isCollapsed = _useMenu.isCollapsed,
          mobileItemDropdownStyle = _useMenu.mobileItemDropdownStyle;

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
          itemClass = _useItem.itemClass,
          onRouteChange = _useItem.onRouteChange,
          onLinkClick = _useItem.onLinkClick,
          onMouseOver = _useItem.onMouseOver,
          onMouseOut = _useItem.onMouseOut,
          onExpandEnter = _useItem.onExpandEnter,
          onExpandAfterEnter = _useItem.onExpandAfterEnter,
          onExpandBeforeLeave = _useItem.onExpandBeforeLeave;

      var router = vue.getCurrentInstance().appContext.config.globalProperties.$router;
      vue.watchEffect(function () {
        onRouteChange();
      });
      vue.onMounted(function () {
        if (!router) {
          window.addEventListener('hashchange', onRouteChange);
        }
      });
      vue.onUnmounted(function () {
        if (!router) {
          window.removeEventListener('hashchange', onRouteChange);
        }
      });
      return {
        isCollapsed: isCollapsed,
        disableHover: disableHover,
        linkComponentName: linkComponentName,
        active: active,
        exactActive: exactActive,
        mobileItemDropdownStyle: mobileItemDropdownStyle,
        show: show,
        hover: hover,
        isFirstLevel: isFirstLevel,
        isHidden: isHidden,
        hasChild: hasChild,
        linkClass: linkClass,
        itemClass: itemClass,
        onRouteChange: onRouteChange,
        onLinkClick: onLinkClick,
        onMouseOver: onMouseOver,
        onMouseOut: onMouseOut,
        onExpandEnter: onExpandEnter,
        onExpandAfterEnter: onExpandAfterEnter,
        onExpandBeforeLeave: onExpandBeforeLeave
      };
    }
  };

  var _hoisted_1 = {
    key: 0,
    class: "vsm--title"
  };
  var _hoisted_2 = {
    class: "vsm--dropdown"
  };
  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_sidebar_menu_icon = vue.resolveComponent("sidebar-menu-icon");

    var _component_sidebar_menu_badge = vue.resolveComponent("sidebar-menu-badge");

    var _component_sidebar_menu_item = vue.resolveComponent("sidebar-menu-item");

    return $props.item.component && !$setup.isHidden ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.item.component), vue.mergeProps({
      key: 0
    }, $props.item.props), null, 16
    /* FULL_PROPS */
    )) : $props.item.header && !$setup.isHidden ? (vue.openBlock(), vue.createBlock("div", vue.mergeProps({
      key: 1,
      class: ["vsm--header", $props.item.class]
    }, $props.item.attributes), vue.toDisplayString($props.item.title), 17
    /* TEXT, FULL_PROPS */
    )) : !$setup.isHidden ? (vue.openBlock(), vue.createBlock("div", {
      key: 2,
      class: $setup.itemClass,
      onMouseover: _cache[1] || (_cache[1] = function () {
        return $setup.onMouseOver.apply($setup, arguments);
      }),
      onMouseout: _cache[2] || (_cache[2] = function () {
        return $setup.onMouseOut.apply($setup, arguments);
      })
    }, [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.linkComponentName), {
      item: $props.item,
      class: $setup.linkClass,
      onClick: $setup.onLinkClick
    }, {
      default: vue.withCtx(function () {
        return [$props.item.icon && !$props.isMobileItem ? (vue.openBlock(), vue.createBlock(_component_sidebar_menu_icon, {
          key: 0,
          icon: $props.item.icon
        }, null, 8
        /* PROPS */
        , ["icon"])) : vue.createCommentVNode("v-if", true), vue.createVNode(vue.Transition, {
          name: "fade-animation",
          appear: $props.isMobileItem
        }, {
          default: vue.withCtx(function () {
            return [$setup.isCollapsed && !$setup.isFirstLevel || !$setup.isCollapsed || $props.isMobileItem ? (vue.openBlock(), vue.createBlock("span", _hoisted_1, vue.toDisplayString($props.item.title), 1
            /* TEXT */
            )) : vue.createCommentVNode("v-if", true)];
          }),
          _: 1
        }, 8
        /* PROPS */
        , ["appear"]), $setup.isCollapsed && !$setup.isFirstLevel || !$setup.isCollapsed || $props.isMobileItem ? (vue.openBlock(), vue.createBlock(vue.Fragment, {
          key: 1
        }, [$props.item.badge ? (vue.openBlock(), vue.createBlock(_component_sidebar_menu_badge, {
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
        )) : vue.createCommentVNode("v-if", true)], 64
        /* STABLE_FRAGMENT */
        )) : vue.createCommentVNode("v-if", true)];
      }),
      _: 1
    }, 8
    /* PROPS */
    , ["item", "class", "onClick"])), $setup.hasChild ? (vue.openBlock(), vue.createBlock(vue.Fragment, {
      key: 0
    }, [$setup.isCollapsed && !$setup.isFirstLevel || !$setup.isCollapsed || $props.isMobileItem ? (vue.openBlock(), vue.createBlock(vue.Transition, {
      key: 0,
      appear: $props.isMobileItem,
      name: "expand",
      onEnter: $setup.onExpandEnter,
      onAfterEnter: $setup.onExpandAfterEnter,
      onBeforeLeave: $setup.onExpandBeforeLeave
    }, {
      default: vue.withCtx(function () {
        return [$setup.show ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          class: ["vsm--child", $props.isMobileItem && 'vsm--child_mobile'],
          style: $props.isMobileItem && $setup.mobileItemDropdownStyle
        }, [vue.createVNode("div", _hoisted_2, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.item.child, function (subItem, index) {
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
    , ["appear", "onEnter", "onAfterEnter", "onBeforeLeave"])) : vue.createCommentVNode("v-if", true)], 64
    /* STABLE_FRAGMENT */
    )) : vue.createCommentVNode("v-if", true)], 34
    /* CLASS, HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }

  script$3.render = render$3;
  script$3.__file = "src/components/SidebarMenuItem.vue";

  var script$4 = {
    name: 'SidebarMenu',
    components: {
      SidebarMenuItem: script$3
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
        default: 'SidebarMenuLink'
      }
    },
    setup: function setup(props, context) {
      vue.provide('vsm-props', props);

      var _useMenu = useMenu(props, context),
          sidebarMenuRef = _useMenu.sidebarMenuRef,
          isCollapsed = _useMenu.isCollapsed,
          sidebarWidth = _useMenu.sidebarWidth,
          sidebarClass = _useMenu.sidebarClass,
          onMouseLeave = _useMenu.onMouseLeave,
          onToggleClick = _useMenu.onToggleClick,
          onItemClick = _useMenu.onItemClick,
          mobileItem = _useMenu.mobileItem,
          mobileItemStyle = _useMenu.mobileItemStyle,
          mobileItemBackgroundStyle = _useMenu.mobileItemBackgroundStyle,
          unsetMobileItem = _useMenu.unsetMobileItem;

      vue.provide('emitItemClick', onItemClick);
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
        onMouseLeave: onMouseLeave,
        onToggleClick: onToggleClick,
        onItemClick: onItemClick,
        mobileItem: mobileItem,
        mobileItemStyle: mobileItemStyle,
        mobileItemBackgroundStyle: mobileItemBackgroundStyle
      };
    },
    emits: {
      'item-click': function itemClick(event, item) {
        return !!(event && item);
      },
      'update:collapsed': function updateCollapsed(collapsed) {
        return !!(typeof collapsed === 'boolean');
      }
    }
  };

  var _hoisted_1$1 = /*#__PURE__*/vue.createVNode("span", {
    class: "vsm--arrow_default"
  }, null, -1
  /* HOISTED */
  );

  var _hoisted_2$1 = /*#__PURE__*/vue.createVNode("span", {
    class: "vsm--arrow_default"
  }, null, -1
  /* HOISTED */
  );

  var _hoisted_3 = /*#__PURE__*/vue.createVNode("span", {
    class: "vsm--toggle-btn_default"
  }, null, -1
  /* HOISTED */
  );

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_sidebar_menu_item = vue.resolveComponent("sidebar-menu-item");

    return vue.openBlock(), vue.createBlock("div", {
      ref: "sidebarMenuRef",
      class: ["v-sidebar-menu", $setup.sidebarClass],
      style: {
        'max-width': $setup.sidebarWidth
      },
      onMouseleave: _cache[2] || (_cache[2] = function () {
        return $setup.onMouseLeave.apply($setup, arguments);
      })
    }, [vue.renderSlot(_ctx.$slots, "header"), vue.createVNode("div", {
      class: "vsm--scroll-wrapper",
      style: $setup.isCollapsed && [$props.rtl ? {
        'margin-left': '-17px'
      } : {
        'margin-right': '-17px'
      }]
    }, [vue.createVNode("div", {
      class: "vsm--menu",
      style: $setup.isCollapsed && {
        'width': $props.widthCollapsed
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
            return [_hoisted_1$1];
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
    ), $setup.isCollapsed ? (vue.openBlock(), vue.createBlock("div", {
      key: 0,
      style: $setup.mobileItemStyle
    }, [$setup.mobileItem ? (vue.openBlock(), vue.createBlock(_component_sidebar_menu_item, {
      key: 0,
      item: $setup.mobileItem,
      "is-mobile-item": true
    }, {
      "dropdown-icon": vue.withCtx(function (_ref2) {
        var isOpen = _ref2.isOpen;
        return [vue.renderSlot(_ctx.$slots, "dropdown-icon", {
          isOpen: isOpen
        }, function () {
          return [_hoisted_2$1];
        })];
      }),
      _: 1
    }, 8
    /* PROPS */
    , ["item"])) : vue.createCommentVNode("v-if", true), vue.createVNode(vue.Transition, {
      name: "slide-animation"
    }, {
      default: vue.withCtx(function () {
        return [$setup.mobileItem ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          class: "vsm--mobile-bg",
          style: $setup.mobileItemBackgroundStyle
        }, null, 4
        /* STYLE */
        )) : vue.createCommentVNode("v-if", true)];
      }),
      _: 1
    })], 4
    /* STYLE */
    )) : vue.createCommentVNode("v-if", true)], 4
    /* STYLE */
    ), vue.renderSlot(_ctx.$slots, "footer"), !$props.hideToggle ? (vue.openBlock(), vue.createBlock("button", {
      key: 0,
      class: "vsm--toggle-btn",
      onClick: _cache[1] || (_cache[1] = function () {
        return $setup.onToggleClick.apply($setup, arguments);
      })
    }, [vue.renderSlot(_ctx.$slots, "toggle-icon", {}, function () {
      return [_hoisted_3];
    })])) : vue.createCommentVNode("v-if", true)], 38
    /* CLASS, STYLE, HYDRATE_EVENTS */
    );
  }

  script$4.render = render$4;
  script$4.__file = "src/components/SidebarMenu.vue";

  var index = {
    install: function install(Vue) {
      Vue.component('sidebar-menu', script$4);
    }
  };

  exports.SidebarMenu = script$4;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue-sidebar-menu.js.map
