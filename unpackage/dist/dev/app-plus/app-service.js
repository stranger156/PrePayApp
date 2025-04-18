if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$7 = {
    __name: "map",
    setup(__props, { expose: __expose }) {
      __expose();
      const totalStations = vue.ref(986);
      const totalDevices = vue.ref(1462);
      const mapCenter = vue.ref({
        latitude: 39.9042,
        // 北京纬度
        longitude: 116.4074
        // 北京经度
      });
      const markers = vue.ref([
        {
          id: 1,
          latitude: 39.9042,
          longitude: 116.4074,
          title: "测试标记",
          iconPath: "../../static/marker.png",
          // 确保此路径有图片
          width: 30,
          height: 30
        }
      ]);
      const stations = vue.ref([
        {
          chineseName: "海沃德",
          englishName: "Hayward",
          id: 1
        },
        {
          chineseName: "雷德伍德城",
          englishName: "Redwood City",
          id: 2
        }
      ]);
      const handleMarkerTap = (e) => {
        const markerId = e.markerId;
        const station = stations.value.find((item) => item.id === markerId);
        if (station) {
          navigateToDetail(station);
        }
      };
      const navigateToDetail = (station) => {
        uni.navigateTo({
          url: `/pages/stationDetail/stationDetail?name=${encodeURIComponent(station.chineseName)}`
        });
      };
      const __returned__ = { totalStations, totalDevices, mapCenter, markers, stations, handleMarkerTap, navigateToDetail, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部统计信息 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "stats" }, [
          vue.createElementVNode("text", { class: "stats-title" }, "我的换热站"),
          vue.createElementVNode(
            "text",
            { class: "stats-info" },
            "Q 共计" + vue.toDisplayString($setup.totalStations) + "个换热站，" + vue.toDisplayString($setup.totalDevices) + "台设备...",
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 地图容器 "),
      vue.createElementVNode("view", { class: "map-container" }, [
        vue.createElementVNode("map", {
          id: "stationMap",
          style: { "width": "100%", "height": "300px" },
          latitude: $setup.mapCenter.latitude,
          longitude: $setup.mapCenter.longitude,
          markers: $setup.markers,
          "show-location": "",
          onMarkertap: $setup.handleMarkerTap
        }, null, 40, ["latitude", "longitude", "markers"])
      ]),
      vue.createCommentVNode(" 换热站列表 "),
      vue.createElementVNode("view", { class: "station-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.stations, (station, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "station-item",
              onClick: ($event) => $setup.navigateToDetail(station)
            }, [
              vue.createElementVNode("view", { class: "station-name" }, [
                vue.createElementVNode(
                  "text",
                  { class: "chinese-name" },
                  vue.toDisplayString(station.chineseName),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "english-name" },
                  vue.toDisplayString(station.englishName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode('     <uni-icons type="arrowright" size="16" color="#999"></uni-icons> ')
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesMapMap = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-e06b858f"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/map/map.vue"]]);
  const _imports_0$3 = "/static/background.png";
  const _sfc_main$6 = {
    __name: "PreLogin",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.onMounted(() => {
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/login/login"
          });
        }, 2e3);
      });
      const __returned__ = { onMounted: vue.onMounted, getCurrentInstance: vue.getCurrentInstance };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
      vue.createElementVNode("img", {
        src: _imports_0$3,
        alt: "",
        class: "img"
      })
    ]);
  }
  const PagesPreLoginPreLogin = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-6f7f9871"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/PreLogin/PreLogin.vue"]]);
  const _imports_0$2 = "/static/username_icon.png";
  const _imports_1 = "/static/passwords_icon.png";
  const _sfc_main$5 = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const account = vue.ref("");
      const passwords = vue.ref("");
      const rememberPasswords = vue.ref(false);
      const loginAuto = vue.ref(false);
      const { proxy } = vue.getCurrentInstance();
      const callPhone = () => {
        uni.makePhoneCall({
          phoneNumber: "400 858 1855"
        });
      };
      const goToDetail = () => {
        uni.navigateTo({
          url: "/pages/more/more"
        });
      };
      const __returned__ = { account, passwords, rememberPasswords, loginAuto, proxy, callPhone, goToDetail, ref: vue.ref, onMounted: vue.onMounted, getCurrentInstance: vue.getCurrentInstance };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 标题和输入框区域 "),
      vue.createElementVNode("view", { class: "input-container" }, [
        vue.createElementVNode("view", { class: "input-item" }, [
          vue.createElementVNode("img", {
            style: { "margin-right": "10px" },
            src: _imports_0$2
          }),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.account = $event),
              placeholder: "请输入用户名"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.account]
          ])
        ]),
        vue.createElementVNode("view", { class: "input-item" }, [
          vue.createElementVNode("img", {
            style: { "margin-right": "10px" },
            src: _imports_1
          }),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.passwords = $event),
              type: "password",
              placeholder: "请输入密码"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.passwords]
          ])
        ])
      ]),
      vue.createCommentVNode(" 记住密码和自动登录复选框 "),
      vue.createCommentVNode('   <view class="checkbox-container">\n      <view class="checkbox-item">\n        <checkbox v-model="rememberPasswords">记住密码</checkbox>\n      </view>\n      <view class="checkbox-item">\n        <checkbox v-model="loginAuto">自动登录</checkbox>\n      </view>\n    </view> '),
      vue.createCommentVNode(" 登录按钮 "),
      vue.createElementVNode("button", {
        class: "login-button",
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.login && _ctx.login(...args))
      }, "登录"),
      vue.createCommentVNode(" 详情按钮 "),
      vue.createElementVNode("view", {
        class: "detail-button",
        onClick: $setup.goToDetail
      }, "了解波思环球"),
      vue.createCommentVNode(" 联系电话 "),
      vue.createElementVNode("view", {
        class: "phone-call",
        onClick: $setup.callPhone
      }, "24小时客户服务电话：400 858 1855")
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/login/login.vue"]]);
  const _imports_0$1 = "/static/logo.png";
  const _sfc_main$4 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("image", {
        class: "logo",
        src: _imports_0$1
      }),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode(
          "text",
          { class: "title" },
          vue.toDisplayString($data.title),
          1
          /* TEXT */
        )
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/index/index.vue"]]);
  const _imports_0 = "/static/more.png";
  const _sfc_main$3 = {};
  function _sfc_render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
      vue.createElementVNode("img", {
        src: _imports_0,
        alt: "",
        class: "img"
      })
    ]);
  }
  const PagesMoreMore = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-ac368486"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/more/more.vue"]]);
  const _sfc_main$2 = {};
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", null, " 这是列表页面 ");
  }
  const PagesListList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/list/list.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", null, " 这是设置页面 ");
  }
  const PagesSettingsSettings = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/settings/settings.vue"]]);
  __definePage("pages/map/map", PagesMapMap);
  __definePage("pages/PreLogin/PreLogin", PagesPreLoginPreLogin);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/more/more", PagesMoreMore);
  __definePage("pages/list/list", PagesListList);
  __definePage("pages/settings/settings", PagesSettingsSettings);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
