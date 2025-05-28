"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // vue-ns:vue
  var require_vue = __commonJS({
    "vue-ns:vue"(exports, module) {
      module.exports = Vue;
    }
  });

  // C:/Users/86158/Documents/HBuilderProjects/PrePayApp/unpackage/dist/dev/.nvue/pages/station-info/station-info.js
  var import_vue = __toESM(require_vue());
  var _style_0 = { "info-window": { "": { "backgroundColor": "#FFFFFF", "borderRadius": "12rpx", "paddingTop": "25rpx", "paddingRight": "25rpx", "paddingBottom": "25rpx", "paddingLeft": "25rpx", "boxShadow": "0 8rpx 24rpx rgba(0, 0, 0, 0.1)" } } };
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  var _sfc_main = {
    data() {
      return {
        station: {},
        visible: false
      };
    },
    mounted() {
      uni.$on("subNVueMessage", (message) => {
        if (message.type === "show") {
          this.station = message.data;
          this.visible = true;
        } else if (message.type === "hide") {
          this.visible = false;
        }
      });
    },
    beforeDestroy() {
      uni.$off("subNVueMessage");
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("scroll-view", {
      scrollY: true,
      showScrollbar: true,
      enableBackToTop: true,
      bubble: "true",
      style: { flexDirection: "column" }
    }, [
      $data.visible ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
        key: 0,
        class: "info-window"
      }, [
        (0, import_vue.createElementVNode)("view", { class: "info-header" }, [
          (0, import_vue.createElementVNode)(
            "u-text",
            { class: "title" },
            (0, import_vue.toDisplayString)($data.station.stationName),
            1
            /* TEXT */
          )
        ]),
        (0, import_vue.createElementVNode)("view", { class: "info-content" }, [
          (0, import_vue.createElementVNode)("view", { class: "info-item" }, [
            (0, import_vue.createElementVNode)("u-text", { class: "label" }, "\u5730\u5740\uFF1A"),
            (0, import_vue.createElementVNode)(
              "u-text",
              { class: "value" },
              (0, import_vue.toDisplayString)($data.station.address),
              1
              /* TEXT */
            )
          ]),
          (0, import_vue.createCommentVNode)(" \u5176\u4ED6\u4FE1\u606F ")
        ])
      ])) : (0, import_vue.createCommentVNode)("v-if", true)
    ]);
  }
  var stationInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/station-info/station-info.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/station-info/station-info";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    stationInfo.mpType = "page";
    const app = Vue.createPageApp(stationInfo, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...stationInfo.styles || []]));
    app.mount("#root");
  }
})();
