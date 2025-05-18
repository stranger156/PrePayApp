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
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_LOAD = "onLoad";
  const ON_READY = "onReady";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onReady = /* @__PURE__ */ createHook(ON_READY);
  const saveTokenToLocalStorage = (token) => {
    uni.setStorage({
      key: "token",
      data: token,
      success: () => {
        formatAppLog("log", "at store/user.js:6", "Token 存储成功");
      },
      fail: (err) => {
        formatAppLog("error", "at store/user.js:9", "Token 存储失败:", err);
      }
    });
  };
  const getTokenFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: "token",
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          formatAppLog("error", "at store/user.js:22", "Token 获取失败:", err);
          reject(err);
        }
      });
    });
  };
  const saveUser = (user) => {
    uni.setStorage({
      key: "user",
      data: user,
      success: () => {
        formatAppLog("log", "at store/user.js:34", "user存储成功");
      },
      fail: (err) => {
        formatAppLog("error", "at store/user.js:37", "user存储失败:", err);
      }
    });
  };
  const getUser = () => {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: "user",
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          formatAppLog("error", "at store/user.js:50", "user获取失败:", err);
          reject(err);
        }
      });
    });
  };
  const baseUrl = "http://47.95.208.71:80";
  const request = (options) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseUrl + options.url,
        method: options.method || "GET",
        data: options.data || {},
        // 改为 data 而不是 params
        header: {
          "Content-Type": "application/json",
          ...options.headers
          // 合并自定义 headers
        },
        success: (res) => {
          var _a;
          if ([200, 201].includes(res.statusCode)) {
            resolve(res.data);
          } else {
            const errorMessage = ((_a = res.data) == null ? void 0 : _a.message) || `请求失败,状态码: ${res.statusCode}`;
            uni.showToast({
              title: errorMessage,
              icon: "none"
            });
            reject(new Error(errorMessage));
          }
        },
        fail: (err) => {
          uni.showToast({
            title: "网络请求失败",
            icon: "none"
          });
          reject(err);
        }
      });
    });
  };
  const login = (params) => {
    return request({
      url: "/web/user/login",
      method: "POST",
      data: params
    });
  };
  const fetchCompanyList = async () => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/company/page",
      method: "GET",
      headers: {
        "token": token
      },
      data: {
        page: 1,
        size: 1e4
      }
    });
  };
  const fetchUserList = async () => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/user/page",
      method: "GET",
      headers: {
        "token": token
      },
      data: {
        page: 1,
        size: 1e4
      }
    });
  };
  const fetchLoginList = async () => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/login/errors",
      method: "GET",
      headers: {
        "token": token
      }
    });
  };
  const fetchRechargeList = async () => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/recharge/page",
      method: "GET",
      headers: {
        "token": token
      },
      data: {
        "page": 1,
        "size": 1e4
      }
    });
  };
  const revisePwd = async (params) => {
    const token = await getTokenFromLocalStorage();
    const user = await getUser();
    return request({
      url: "/web/user/changePassword",
      method: "POST",
      headers: {
        "token": token
      },
      data: {
        "userName": user,
        "oldPassword": params.oldpassword,
        "newPassword": params.newpassword
      }
    });
  };
  const getStationList = async () => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/stations/page",
      method: "GET",
      headers: {
        "token": token
      },
      data: {
        page: 1,
        size: 1e4
      }
    });
  };
  const _imports_0$7 = "/static/passwords_icon.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const userIcon = "/static/username_icon.png";
  const _sfc_main$n = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const user = vue.reactive({
        username: "",
        password: ""
      });
      const rememberPasswords = vue.ref(false);
      const loginAuto = vue.ref(false);
      const { proxy } = vue.getCurrentInstance();
      const loginButton = () => {
        if (user.username === "" || user.password === "") {
          uni.showToast({
            title: "用户名和密码不能为空!",
            icon: "none"
          });
        }
        login(user).then((res) => {
          if (res.code === 200) {
            saveTokenToLocalStorage(res.data.token);
            saveUser(user.username);
            uni.switchTab({
              url: "/pages/map/map"
              // 假设这是一个 tabBar 页面
            });
          }
        });
      };
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
      const __returned__ = { userIcon, user, rememberPasswords, loginAuto, proxy, loginButton, callPhone, goToDetail, ref: vue.ref, onMounted: vue.onMounted, getCurrentInstance: vue.getCurrentInstance, reactive: vue.reactive, get login() {
        return login;
      }, get saveTokenToLocalStorage() {
        return saveTokenToLocalStorage;
      }, get saveUser() {
        return saveUser;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 标题和输入框区域 "),
      vue.createElementVNode("view", { class: "input-container" }, [
        vue.createElementVNode("view", { class: "input-item" }, [
          vue.createElementVNode("image", {
            style: { "margin-left": "20rpx", "width": "70rpx", "height": "70rpx" },
            src: $setup.userIcon
          }),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.user.username = $event),
              placeholder: "请输入用户名"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.user.username]
          ])
        ]),
        vue.createElementVNode("view", { class: "input-item" }, [
          vue.createElementVNode("image", {
            style: { "margin-left": "20rpx", "width": "70rpx", "height": "70rpx" },
            src: _imports_0$7
          }),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.user.password = $event),
              type: "password",
              placeholder: "请输入密码"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.user.password]
          ])
        ])
      ]),
      vue.createCommentVNode(" 记住密码和自动登录复选框 "),
      vue.createCommentVNode('  <view class="checkbox-container">\n      <view class="checkbox-item">\n        <checkbox v-model="rememberPasswords">记住密码</checkbox>\n      </view>\n      <view class="checkbox-item">\n        <checkbox v-model="loginAuto">自动登录</checkbox>\n      </view>\n    </view> '),
      vue.createCommentVNode(" 登录按钮 "),
      vue.createElementVNode("button", {
        class: "login-button",
        onClick: $setup.loginButton
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
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/login/login.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$m = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-946bce22"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"]]);
  const _sfc_main$l = {
    __name: "map",
    setup(__props, { expose: __expose }) {
      __expose();
      const selectedStation = vue.ref(null);
      const totalStations = vue.ref(0);
      const input = vue.ref(null);
      const mapCenter = vue.ref({
        latitude: 39.9042,
        longitude: 116.4074
      });
      const markers = vue.reactive([]);
      const stations = vue.reactive([]);
      const handleMarkerTap = (e) => {
        const markerId = e.detail.markerId;
        selectedStation.value = stations.find((item) => item.id === markerId);
      };
      const handleMapTap = () => {
        selectedStation.value = null;
      };
      const handleEnter = () => {
        selectedStation.value = stations.find((item) => item.address.includes(input.value.toLowerCase())) || null;
      };
      {
        getStationList().then((res) => {
          let num = 0;
          totalStations.value = res.data.records.length;
          res.data.records.forEach((item) => {
            num++;
            markers.push({
              id: num,
              latitude: item.latitude,
              longitude: item.longitude,
              iconPath: "../../static/mapLogo.png",
              width: 30,
              height: 30
            });
            stations.push({
              phone: item.phone,
              company: item.company,
              id: num,
              address: item.address,
              detail: item.detail,
              stationName: item.stationName,
              userName: item.userName
            });
          });
        });
      }
      const __returned__ = { selectedStation, totalStations, input, mapCenter, markers, stations, handleMarkerTap, handleMapTap, handleEnter, onMounted: vue.onMounted, reactive: vue.reactive, ref: vue.ref, uniIcons: __easycom_0$2, get getStationList() {
        return getStationList;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部统计信息 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "stats" }, [
          vue.createElementVNode("view", { class: "search-container" }, [
            vue.createVNode($setup["uniIcons"], {
              type: "search",
              size: "18",
              color: "#999",
              class: "search-icon"
            }),
            vue.withDirectives(vue.createElementVNode("input", {
              class: "stats-info",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.input = $event),
              placeholder: `共计${$setup.totalStations}个换热站`
            }, null, 8, ["placeholder"]), [
              [vue.vModelText, $setup.input]
            ]),
            vue.createTextVNode(),
            vue.createElementVNode("button", {
              class: "search-btn",
              onClick: $setup.handleEnter
            }, " 搜索 ")
          ])
        ])
      ]),
      vue.createCommentVNode(" 地图容器 "),
      vue.createElementVNode("view", { class: "map-container" }, [
        vue.createElementVNode("map", {
          id: "stationMap",
          style: { "width": "100%", "height": "100%" },
          latitude: $setup.mapCenter.latitude,
          longitude: $setup.mapCenter.longitude,
          markers: $setup.markers,
          "show-location": "",
          onMarkertap: $setup.handleMarkerTap,
          onTap: $setup.handleMapTap
        }, null, 40, ["latitude", "longitude", "markers"]),
        vue.createCommentVNode(" 信息弹窗 "),
        $setup.selectedStation ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "info-window"
        }, [
          vue.createElementVNode("view", { class: "info-header" }, [
            vue.createElementVNode(
              "text",
              { class: "title" },
              vue.toDisplayString($setup.selectedStation.stationName),
              1
              /* TEXT */
            ),
            vue.createVNode($setup["uniIcons"], {
              type: "close",
              size: "20",
              color: "#999",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.selectedStation = null)
            })
          ]),
          vue.createElementVNode("view", { class: "info-content" }, [
            vue.createElementVNode("view", { class: "info-item" }, [
              vue.createElementVNode("text", { class: "label" }, "所属公司："),
              vue.createElementVNode(
                "text",
                { class: "value" },
                vue.toDisplayString($setup.selectedStation.company),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "info-item" }, [
              vue.createElementVNode("text", { class: "label" }, "负责人："),
              vue.createElementVNode(
                "text",
                { class: "value" },
                vue.toDisplayString($setup.selectedStation.username),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "info-item" }, [
              vue.createElementVNode("text", { class: "label" }, "联系电话："),
              vue.createElementVNode(
                "text",
                { class: "value" },
                vue.toDisplayString($setup.selectedStation.phone),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "info-item" }, [
              vue.createElementVNode("text", { class: "label" }, "详细地址："),
              vue.createElementVNode(
                "text",
                { class: "value" },
                vue.toDisplayString($setup.selectedStation.address),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "info-item" }, [
              vue.createElementVNode("text", { class: "label" }, "站点简介："),
              vue.createElementVNode(
                "text",
                { class: "value" },
                vue.toDisplayString($setup.selectedStation.detail),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "info-item" }, [
              vue.createElementVNode("text", { class: "label" }, "设备状态："),
              vue.createElementVNode("text", { class: "value status-active" }, "正常运行")
            ]),
            vue.createElementVNode("view", { class: "info-item" }, [
              vue.createElementVNode("text", { class: "label" }, "最后上报："),
              vue.createElementVNode("text", { class: "value" }, "2023-08-20 14:30")
            ])
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesMapMap = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-e06b858f"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/map/map.vue"]]);
  const _imports_0$6 = "/static/background.png";
  const _sfc_main$k = {
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
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
      vue.createElementVNode("img", {
        src: _imports_0$6,
        alt: "",
        class: "img"
      })
    ]);
  }
  const PagesPreLoginPreLogin = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-6f7f9871"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/PreLogin/PreLogin.vue"]]);
  const _imports_0$5 = "/static/logo.png";
  const _sfc_main$j = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("image", {
        class: "logo",
        src: _imports_0$5
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/index/index.vue"]]);
  const _imports_0$4 = "/static/more.png";
  const _sfc_main$i = {};
  function _sfc_render$h(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
      vue.createElementVNode("img", {
        src: _imports_0$4,
        alt: "",
        class: "img"
      })
    ]);
  }
  const PagesMoreMore = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-ac368486"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/more/more.vue"]]);
  const _imports_0$3 = "/static/search.png";
  const _imports_1 = "/static/station_icon.png";
  const _sfc_main$h = {
    data() {
      return {
        searchText: "",
        deviceList: [
          { id: 1, name: "换热站1", address: "北京市海淀区学院路1号", letter: "H" },
          { id: 2, name: "换热站2", address: "北京市朝阳区朝阳门2号", letter: "H" },
          { id: 3, name: "阳光换热站", address: "北京市西城区西单3号", letter: "Y" }
        ],
        indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        showLetterHint: false,
        currentLetter: "",
        showPopup: false,
        currentDevice: {}
      };
    },
    computed: {
      filteredDeviceList() {
        return this.searchDevices();
      }
    },
    methods: {
      // 显示设备弹窗
      showDevicePopup(item) {
        this.currentDevice = item;
        this.showPopup = true;
      },
      // 关闭弹窗
      closePopup() {
        this.showPopup = false;
      },
      // 查看设备详情
      viewDeviceDetail() {
        uni.navigateTo({
          url: `/pages/device-detail/device-detail?id=${this.currentDevice.id}`
        });
        this.closePopup();
      },
      // 控制设备
      controlDevice() {
        uni.navigateTo({
          url: `/pages/device-control/device-control?id=${this.currentDevice.id}`
        });
        this.closePopup();
      },
      // 触摸字母索引
      onLetterTouch(letter) {
        this.currentLetter = letter;
        this.showLetterHint = true;
        this.deviceList.find((item) => item.letter === letter);
        setTimeout(() => {
          this.showLetterHint = false;
        }, 1e3);
      },
      // 搜索设备
      searchDevices() {
        if (!this.searchText) {
          return this.deviceList;
        }
        return this.deviceList.filter(
          (item) => item.name.toLowerCase().includes(this.searchText.toLowerCase()) || item.address.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
    },
    onLoad() {
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 设备列表视图 "),
      vue.createElementVNode("view", { class: "device-list-layout" }, [
        vue.createCommentVNode(" 搜索框 "),
        vue.createElementVNode("view", { class: "search-box" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "search-input",
              placeholder: "搜索",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchText = $event),
              "confirm-type": "search"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.searchText]
          ]),
          vue.createElementVNode("image", {
            class: "search-icon",
            src: _imports_0$3
          })
        ]),
        vue.createCommentVNode(" 列表内容 "),
        vue.createElementVNode("view", { class: "list-container" }, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "device-list"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($options.filteredDeviceList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "device-item",
                  key: index,
                  onClick: ($event) => $options.showDevicePopup(item)
                }, [
                  vue.createElementVNode("view", { class: "device-content" }, [
                    vue.createElementVNode("image", {
                      class: "device-icon",
                      src: _imports_1
                    }),
                    vue.createElementVNode("view", { class: "device-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "device-name" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "device-address" },
                        vue.toDisplayString(item.address),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" 侧边索引条 "),
          vue.createElementVNode("view", { class: "side-bar" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.indexList, (letter, index) => {
                return vue.openBlock(), vue.createElementBlock("text", {
                  key: index,
                  class: "side-bar-item",
                  onTouchstart: ($event) => $options.onLetterTouch(letter)
                }, vue.toDisplayString(letter), 41, ["onTouchstart"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" 当前选中字母提示 "),
          $data.showLetterHint ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "letter-hint"
          }, [
            vue.createElementVNode(
              "text",
              { class: "hint-text" },
              vue.toDisplayString($data.currentLetter),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      vue.createCommentVNode(" 换热站详情弹窗 "),
      $data.showPopup ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "popup-mask",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.closePopup && $options.closePopup(...args))
      })) : vue.createCommentVNode("v-if", true),
      $data.showPopup ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "popup-content"
      }, [
        vue.createElementVNode("view", { class: "popup-header" }, [
          vue.createElementVNode("text", { class: "popup-title" }, "换热站详情"),
          vue.createElementVNode("text", {
            class: "popup-close",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.closePopup && $options.closePopup(...args))
          }, "×")
        ]),
        vue.createElementVNode("view", { class: "popup-body" }, [
          vue.createElementVNode("view", { class: "popup-item" }, [
            vue.createElementVNode("text", { class: "popup-label" }, "名称:"),
            vue.createElementVNode(
              "text",
              { class: "popup-value" },
              vue.toDisplayString($data.currentDevice.name),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "popup-item" }, [
            vue.createElementVNode("text", { class: "popup-label" }, "地址:"),
            vue.createElementVNode(
              "text",
              { class: "popup-value" },
              vue.toDisplayString($data.currentDevice.address),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "popup-item" }, [
            vue.createElementVNode("text", { class: "popup-label" }, "状态:"),
            vue.createElementVNode("text", { class: "popup-value" }, "正常运行")
          ]),
          vue.createElementVNode("view", { class: "popup-buttons" }, [
            vue.createElementVNode("button", {
              class: "popup-button",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.viewDeviceDetail && $options.viewDeviceDetail(...args))
            }, "导航到换热站"),
            vue.createElementVNode("button", {
              class: "popup-button primary",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.controlDevice && $options.controlDevice(...args))
            }, "查看实时数据")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesListList = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/list/list.vue"]]);
  const _imports_0$2 = "/static/enter_icon.png";
  const _sfc_main$g = {
    __name: "settings",
    setup(__props, { expose: __expose }) {
      __expose();
      const menuList = vue.ref([
        {
          title: "企业管理",
          icon: "/static/user_icon.png",
          url: "/pages/user/user"
        },
        {
          title: "账号管理",
          icon: "/static/account_icon.png",
          url: "/pages/account/account"
        },
        {
          title: "异常信息",
          icon: "/static/alarm_icon.png",
          url: "/pages/error/error"
        },
        {
          title: "充值记录",
          icon: "/static/charge_icon.png",
          url: "/pages/recharge-record/recharge-record"
        },
        {
          title: "修改密码",
          icon: "/static/setting_icon.png",
          url: "/pages/change-password/change-password"
        }
      ]);
      function navigate(url) {
        uni.navigateTo({ url });
      }
      function logout() {
        uni.showModal({
          title: "提示",
          content: "确定要退出登录吗？",
          success(res) {
            if (res.confirm) {
              uni.redirectTo({
                url: "/pages/login/login"
                // 退出后跳转到登录页
              });
            }
          }
        });
      }
      const __returned__ = { menuList, navigate, logout, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "setting-page" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.menuList, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            key: item.title,
            class: "menu-item",
            onClick: ($event) => $setup.navigate(item.url)
          }, [
            vue.createElementVNode("image", {
              class: "icon",
              src: item.icon,
              mode: "aspectFit"
            }, null, 8, ["src"]),
            vue.createElementVNode(
              "text",
              { class: "title" },
              vue.toDisplayString(item.title),
              1
              /* TEXT */
            ),
            vue.createElementVNode("image", {
              class: "arrow",
              src: _imports_0$2,
              mode: "aspectFit"
            })
          ], 8, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      vue.createElementVNode("view", { class: "logout-wrapper" }, [
        vue.createElementVNode("button", {
          class: "logout-button",
          onClick: $setup.logout
        }, "退出登录")
      ])
    ]);
  }
  const PagesSettingsSettings = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/settings/settings.vue"]]);
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater: formater2 }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater2 || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      const options = [
        messages2,
        locale
      ];
      locale = options[0];
      messages2 = options[1];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en = {
    "uni-search-bar.cancel": "cancel",
    "uni-search-bar.placeholder": "Search enter content"
  };
  const zhHans = {
    "uni-search-bar.cancel": "取消",
    "uni-search-bar.placeholder": "请输入搜索内容"
  };
  const zhHant = {
    "uni-search-bar.cancel": "取消",
    "uni-search-bar.placeholder": "請輸入搜索內容"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const {
    t
  } = initVueI18n(messages);
  const _sfc_main$f = {
    name: "UniSearchBar",
    emits: ["input", "update:modelValue", "clear", "cancel", "confirm", "blur", "focus"],
    props: {
      placeholder: {
        type: String,
        default: ""
      },
      radius: {
        type: [Number, String],
        default: 5
      },
      clearButton: {
        type: String,
        default: "auto"
      },
      cancelButton: {
        type: String,
        default: "auto"
      },
      cancelText: {
        type: String,
        default: ""
      },
      bgColor: {
        type: String,
        default: "#F8F8F8"
      },
      textColor: {
        type: String,
        default: "#000000"
      },
      maxlength: {
        type: [Number, String],
        default: 100
      },
      value: {
        type: [Number, String],
        default: ""
      },
      modelValue: {
        type: [Number, String],
        default: ""
      },
      focus: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        show: false,
        showSync: false,
        searchVal: ""
      };
    },
    computed: {
      cancelTextI18n() {
        return this.cancelText || t("uni-search-bar.cancel");
      },
      placeholderText() {
        return this.placeholder || t("uni-search-bar.placeholder");
      }
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal) {
          this.searchVal = newVal;
          if (newVal) {
            this.show = true;
          }
        }
      },
      focus: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            if (this.readonly)
              return;
            this.show = true;
            this.$nextTick(() => {
              this.showSync = true;
            });
          }
        }
      },
      searchVal(newVal, oldVal) {
        this.$emit("input", newVal);
        this.$emit("update:modelValue", newVal);
      }
    },
    methods: {
      searchClick() {
        if (this.readonly)
          return;
        if (this.show) {
          return;
        }
        this.show = true;
        this.$nextTick(() => {
          this.showSync = true;
        });
      },
      clear() {
        this.searchVal = "";
        this.$nextTick(() => {
          this.$emit("clear", { value: "" });
        });
      },
      cancel() {
        if (this.readonly)
          return;
        this.$emit("cancel", {
          value: this.searchVal
        });
        this.searchVal = "";
        this.show = false;
        this.showSync = false;
        plus.key.hideSoftKeybord();
      },
      confirm() {
        plus.key.hideSoftKeybord();
        this.$emit("confirm", {
          value: this.searchVal
        });
      },
      blur() {
        plus.key.hideSoftKeybord();
        this.$emit("blur", {
          value: this.searchVal
        });
      },
      emitFocus(e) {
        this.$emit("focus", e.detail);
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-searchbar" }, [
      vue.createElementVNode(
        "view",
        {
          style: vue.normalizeStyle({ borderRadius: $props.radius + "px", backgroundColor: $props.bgColor }),
          class: "uni-searchbar__box",
          onClick: _cache[5] || (_cache[5] = (...args) => $options.searchClick && $options.searchClick(...args))
        },
        [
          vue.createElementVNode("view", { class: "uni-searchbar__box-icon-search" }, [
            vue.renderSlot(_ctx.$slots, "searchIcon", {}, () => [
              vue.createVNode(_component_uni_icons, {
                color: "#c0c4cc",
                size: "18",
                type: "search"
              })
            ], true)
          ]),
          $data.show || $data.searchVal ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
            key: 0,
            focus: $data.showSync,
            disabled: $props.readonly,
            placeholder: $options.placeholderText,
            maxlength: $props.maxlength,
            class: "uni-searchbar__box-search-input",
            "confirm-type": "search",
            type: "text",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchVal = $event),
            style: vue.normalizeStyle({ color: $props.textColor }),
            onConfirm: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
            onBlur: _cache[2] || (_cache[2] = (...args) => $options.blur && $options.blur(...args)),
            onFocus: _cache[3] || (_cache[3] = (...args) => $options.emitFocus && $options.emitFocus(...args))
          }, null, 44, ["focus", "disabled", "placeholder", "maxlength"])), [
            [vue.vModelText, $data.searchVal]
          ]) : (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 1,
              class: "uni-searchbar__text-placeholder"
            },
            vue.toDisplayString($props.placeholder),
            1
            /* TEXT */
          )),
          $data.show && ($props.clearButton === "always" || $props.clearButton === "auto" && $data.searchVal !== "") && !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "uni-searchbar__box-icon-clear",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
          }, [
            vue.renderSlot(_ctx.$slots, "clearIcon", {}, () => [
              vue.createVNode(_component_uni_icons, {
                color: "#c0c4cc",
                size: "20",
                type: "clear"
              })
            ], true)
          ])) : vue.createCommentVNode("v-if", true)
        ],
        4
        /* STYLE */
      ),
      $props.cancelButton === "always" || $data.show && $props.cancelButton === "auto" ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          onClick: _cache[6] || (_cache[6] = (...args) => $options.cancel && $options.cancel(...args)),
          class: "uni-searchbar__cancel"
        },
        vue.toDisplayString($options.cancelTextI18n),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const UniSearchBar = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-a149a6be"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$e = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at node_modules/@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue:148", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 0 : 1,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue"]]);
  const _sfc_main$d = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at node_modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue:310", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          this.showPoptrans();
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      showPoptrans() {
        this.$nextTick(() => {
          this.showPopup = true;
          this.showTrans = true;
        });
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const UniPopup = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-7db519c7"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue"]]);
  const _sfc_main$c = {
    __name: "user",
    setup(__props, { expose: __expose }) {
      __expose();
      const users = vue.ref([]);
      const currentUser = vue.ref(null);
      const searchKeyword = vue.ref("");
      const detailPopup = vue.ref(null);
      vue.onMounted(async () => {
        var _a, _b;
        try {
          const res = await fetchCompanyList();
          users.value = ((_b = (_a = res.data) == null ? void 0 : _a.records) == null ? void 0 : _b.map((item, index) => ({
            id: String(index),
            name: item.companyName || "未知企业",
            phone: item.phone,
            userName: item.userName,
            admin: item.admin,
            user: item.user,
            sale: item.sale
          }))) || [];
        } catch (error) {
          formatAppLog("error", "at pages/user/user.vue:98", "获取企业列表失败:", error);
          uni.showToast({
            title: "数据加载失败",
            icon: "none"
          });
        }
      });
      const filteredUsers = vue.computed(() => {
        if (!searchKeyword.value)
          return users.value;
        return users.value.filter(
          (user) => user.name.includes(searchKeyword.value)
        );
      });
      const handleSearch = (e) => {
        searchKeyword.value = e.value;
      };
      const showDetailModal = (user) => {
        currentUser.value = user;
        detailPopup.value.open();
      };
      const closeDetailModal = () => {
        currentUser.value = null;
        detailPopup.value.close();
      };
      const __returned__ = { users, currentUser, searchKeyword, detailPopup, filteredUsers, handleSearch, showDetailModal, closeDetailModal, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, UniSearchBar, UniIcons: __easycom_0$2, UniPopup, get fetchCompanyList() {
        return fetchCompanyList;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 标题 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "title" }, "企业管理")
      ]),
      vue.createCommentVNode(" 搜索框 "),
      vue.createElementVNode("view", { class: "search-box" }, [
        vue.createVNode($setup["UniSearchBar"], {
          placeholder: "请输入企业名称关键字",
          radius: "100",
          onConfirm: $setup.handleSearch
        })
      ]),
      vue.createCommentVNode(" 用户列表 "),
      vue.createElementVNode("view", {
        class: "user-list",
        "scroll-y": ""
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.filteredUsers, (user, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "user-item",
              onClick: ($event) => $setup.showDetailModal(user)
            }, [
              vue.createElementVNode("view", { class: "user-info" }, [
                vue.createElementVNode(
                  "text",
                  { class: "user-name" },
                  vue.toDisplayString(user.name),
                  1
                  /* TEXT */
                )
              ]),
              vue.createVNode($setup["UniIcons"], {
                type: "arrowright",
                size: "16",
                color: "#999"
              })
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 详情弹窗 "),
      vue.createVNode(
        $setup["UniPopup"],
        {
          ref: "detailPopup",
          type: "center"
        },
        {
          default: vue.withCtx(() => {
            var _a, _b, _c, _d, _e;
            return [
              vue.createElementVNode("view", { class: "modal-content" }, [
                vue.createElementVNode("view", { class: "modal-header" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "modal-title" },
                    vue.toDisplayString((_a = $setup.currentUser) == null ? void 0 : _a.name),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode($setup["UniIcons"], {
                    type: "closeempty",
                    size: "20",
                    color: "#666",
                    onClick: $setup.closeDetailModal
                  })
                ]),
                vue.createElementVNode("view", { class: "modal-body" }, [
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "联系电话："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_b = $setup.currentUser) == null ? void 0 : _b.phone) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "负责人："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_c = $setup.currentUser) == null ? void 0 : _c.userName) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "管理员："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_d = $setup.currentUser) == null ? void 0 : _d.admin) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "销售代表："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_e = $setup.currentUser) == null ? void 0 : _e.sale) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ];
          }),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-0f7520f0"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/user/user.vue"]]);
  const _imports_0$1 = "/static/error_icon.png";
  const _sfc_main$b = {
    data() {
      return {
        errorList: []
        // 初始化空数组
      };
    },
    methods: {
      // 获取错误日志列表
      async getErrorList() {
        try {
          const res = await fetchLoginList();
          if (res.code === 200 && res.data) {
            this.processLoginData(res.data);
          }
        } catch (error) {
          formatAppLog("error", "at pages/error/error.vue:42", "获取日志失败:", error);
        }
      },
      // 数据处理逻辑
      processLoginData(logs) {
        const errorMap = {};
        logs.forEach((log) => {
          formatAppLog("log", "at pages/error/error.vue:51", log.createTime);
          if (log.detail.includes("成功"))
            return;
          const username = log.userName;
          if (!errorMap[username]) {
            errorMap[username] = {
              username,
              count: 0,
              lastTime: "",
              logs: []
            };
          }
          errorMap[username].count++;
          errorMap[username].logs.push({
            time: log.createTime,
            detail: log.detail
          });
          if (!errorMap[username].lastTime || new Date(log.createTime) > new Date(errorMap[username].lastTime)) {
            errorMap[username].lastTime = log.createTime;
          }
        });
        this.errorList = Object.values(errorMap).map((user, index) => ({
          id: index + 1,
          ...user
        }));
      },
      // 显示错误详情
      showErrorDetail(username) {
        const user = this.errorList.find((u) => u.username === username);
        if (!user)
          return;
        const detailContent = user.logs.map(
          (log, index) => `${index + 1}. 时间：${log.time}
   详情：${log.detail}`
        ).join("\n\n");
        uni.showModal({
          title: `${username} 的错误记录（共${user.count}次）`,
          content: detailContent,
          showCancel: false,
          confirmText: "关闭"
        });
      }
    },
    onLoad() {
      this.getErrorList();
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 错误记录列表 "),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "",
        class: "error-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.errorList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "error-item",
              key: item.id,
              onClick: ($event) => $options.showErrorDetail(item.username)
            }, [
              vue.createElementVNode("image", {
                class: "error-icon",
                src: _imports_0$1
              }),
              vue.createElementVNode("view", { class: "error-info" }, [
                vue.createElementVNode("view", { class: "error-title" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "error-username" },
                    vue.toDisplayString(item.username),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "error-count" },
                    "登录错误次数: " + vue.toDisplayString(item.count),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "error-time" },
                  "最后错误登录时间: " + vue.toDisplayString(item.lastTime),
                  1
                  /* TEXT */
                )
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesErrorError = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/error/error.vue"]]);
  const _sfc_main$a = {
    __name: "account",
    setup(__props, { expose: __expose }) {
      __expose();
      const accounts = vue.ref([]);
      const currentUser = vue.ref(null);
      const searchKeyword = vue.ref("");
      const detailPopup = vue.ref(null);
      vue.onMounted(async () => {
        var _a, _b;
        try {
          const res = await fetchUserList();
          accounts.value = ((_b = (_a = res.data) == null ? void 0 : _a.records) == null ? void 0 : _b.map((item) => ({
            userNumber: item.userNumber,
            userName: item.userName,
            mobile: item.mobile,
            email: item.email,
            authority_id: item.authority_id,
            address: item.address,
            admin: item.admin,
            errorLogin: item.errorLogin
          }))) || [];
        } catch (error) {
          formatAppLog("error", "at pages/account/account.vue:109", "获取用户列表失败:", error);
          uni.showToast({
            title: "数据加载失败",
            icon: "none"
          });
        }
      });
      const filteredAccounts = vue.computed(() => {
        if (!searchKeyword.value)
          return accounts.value;
        const keyword = searchKeyword.value.toLowerCase();
        return accounts.value.filter(
          (account) => [account.userName, account.mobile, account.email].some(
            (field) => String(field).toLowerCase().includes(keyword)
          )
        );
      });
      const handleSearch = (e) => {
        searchKeyword.value = e.value;
      };
      const handleClear = () => {
        searchKeyword.value = "";
      };
      const showDetailModal = (user) => {
        currentUser.value = user;
        detailPopup.value.open("center");
      };
      const closeDetailModal = () => {
        currentUser.value = null;
        detailPopup.value.close();
      };
      const __returned__ = { accounts, currentUser, searchKeyword, detailPopup, filteredAccounts, handleSearch, handleClear, showDetailModal, closeDetailModal, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, UniSearchBar, UniIcons: __easycom_0$2, UniPopup, get fetchUserList() {
        return fetchUserList;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 标题 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "title" }, "账户列表")
      ]),
      vue.createCommentVNode(" 搜索框 "),
      vue.createElementVNode("view", { class: "search-box" }, [
        vue.createVNode($setup["UniSearchBar"], {
          placeholder: "请输入账号名/电话/邮箱",
          radius: "100",
          modelValue: $setup.searchKeyword,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.searchKeyword = $event),
          onConfirm: $setup.handleSearch,
          onClear: $setup.handleClear
        }, null, 8, ["modelValue"])
      ]),
      vue.createCommentVNode(" 账户列表 "),
      vue.createElementVNode("scroll-view", {
        class: "account-list",
        "scroll-y": ""
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.filteredAccounts, (account, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "account-item",
              onClick: ($event) => $setup.showDetailModal(account)
            }, [
              vue.createElementVNode(
                "text",
                { class: "account-name" },
                vue.toDisplayString(account.userName),
                1
                /* TEXT */
              ),
              vue.createVNode($setup["UniIcons"], {
                type: "arrowright",
                size: "16",
                color: "#999"
              })
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 详情弹窗 "),
      vue.createVNode(
        $setup["UniPopup"],
        {
          ref: "detailPopup",
          type: "center"
        },
        {
          default: vue.withCtx(() => {
            var _a, _b, _c, _d, _e, _f, _g;
            return [
              vue.createElementVNode("view", { class: "modal-content" }, [
                vue.createElementVNode("view", { class: "modal-header" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "modal-title" },
                    vue.toDisplayString(((_a = $setup.currentUser) == null ? void 0 : _a.userName) || "用户详情"),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode($setup["UniIcons"], {
                    type: "closeempty",
                    size: "20",
                    color: "#666",
                    onClick: $setup.closeDetailModal
                  })
                ]),
                vue.createElementVNode("view", { class: "modal-body" }, [
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "账号编号："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_b = $setup.currentUser) == null ? void 0 : _b.userNumber) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "账号名称："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_c = $setup.currentUser) == null ? void 0 : _c.userName) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "联系电话："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_d = $setup.currentUser) == null ? void 0 : _d.mobile) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "电子邮箱："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_e = $setup.currentUser) == null ? void 0 : _e.email) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "权限等级："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_f = $setup.currentUser) == null ? void 0 : _f.authority_id) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "所属账号："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_g = $setup.currentUser) == null ? void 0 : _g.admin) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ];
          }),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesAccountAccount = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-8cce343a"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/account/account.vue"]]);
  const _imports_0 = "/static/card.png";
  const _sfc_main$9 = {
    data() {
      return {
        deviceList: []
      };
    },
    methods: {
      // 获取充值记录列表
      async getDeviceList() {
        var _a;
        try {
          const res = await fetchRechargeList();
          if (res.code === 200 && ((_a = res.data) == null ? void 0 : _a.records)) {
            this.deviceList = res.data.records.map((record) => ({
              id: record.id,
              deviceNumber: record.deviceNumber,
              rechargeAmount: record.rechargeAmount,
              date: record.date,
              operator: record.operator,
              currentFee: record.currentFee
            }));
          }
        } catch (error) {
          formatAppLog("error", "at pages/recharge-record/recharge-record.vue:52", "获取充值记录失败:", error);
          uni.showToast({
            title: "数据加载失败",
            icon: "none"
          });
        }
      },
      // 查看详情
      viewDeviceDetail(item) {
        const content = `
        设备号：${item.deviceNumber}
        充值金额：${item.rechargeAmount}元
        操作员：${item.operator}
        充值时间：${item.date}
        当前余额：${item.currentFee}元
      `;
        uni.showModal({
          title: "充值详情",
          content: content.trim(),
          showCancel: false,
          confirmText: "关闭"
        });
      }
    },
    onLoad() {
      this.getDeviceList();
    },
    onPullDownRefresh() {
      this.getDeviceList().then(() => {
        uni.stopPullDownRefresh();
      });
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 记录列表 "),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "",
        class: "charge-record-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.deviceList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "record-item",
              key: item.id,
              onClick: ($event) => $options.viewDeviceDetail(item)
            }, [
              vue.createElementVNode("image", {
                class: "device-icon",
                src: _imports_0
              }),
              vue.createElementVNode("view", { class: "device-info" }, [
                vue.createElementVNode(
                  "text",
                  { class: "device-id" },
                  "设备号：" + vue.toDisplayString(item.deviceNumber),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "device-days" },
                  "充值时间：" + vue.toDisplayString(item.date),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "text",
                { class: "amount" },
                "+" + vue.toDisplayString(item.rechargeAmount) + "元",
                1
                /* TEXT */
              )
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createCommentVNode(" 无数据提示 "),
        $data.deviceList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "no-data"
        }, [
          vue.createElementVNode("text", { class: "no-data-text" }, "暂无充值记录")
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesRechargeRecordRechargeRecord = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/recharge-record/recharge-record.vue"]]);
  const _sfc_main$8 = {
    __name: "setting",
    setup(__props, { expose: __expose }) {
      __expose();
      const isAlertOn = vue.ref(false);
      function toggleAlert(e) {
        isAlertOn.value = e.detail.value;
      }
      function goToChangePassword() {
        uni.navigateTo({
          url: "/pages/change-password/change-password"
        });
      }
      function logout() {
        uni.showModal({
          title: "提示",
          content: "确定要退出登录吗？",
          success(res) {
            if (res.confirm) {
              uni.redirectTo({
                url: "/pages/login/login"
                // 退出后跳转到登录页
              });
            }
          }
        });
      }
      const __returned__ = { isAlertOn, toggleAlert, goToChangePassword, logout, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "setting-page" }, [
      vue.createElementVNode("view", {
        class: "setting-item",
        onClick: $setup.goToChangePassword
      }, [
        vue.createElementVNode("text", null, "修改密码")
      ]),
      vue.createElementVNode("view", { class: "setting-item" }, [
        vue.createElementVNode("text", null, "异常提醒"),
        vue.createElementVNode("switch", {
          checked: $setup.isAlertOn,
          onChange: $setup.toggleAlert
        }, null, 40, ["checked"])
      ]),
      vue.createElementVNode("view", { class: "logout-wrapper" }, [
        vue.createElementVNode("button", {
          class: "logout-button",
          onClick: $setup.logout
        }, "退出登录")
      ])
    ]);
  }
  const PagesSettingSetting = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/setting/setting.vue"]]);
  const _sfc_main$7 = {
    __name: "remote-charge",
    setup(__props, { expose: __expose }) {
      __expose();
      const formData = vue.ref({
        deviceId: "",
        deviceName: "",
        amount: "",
        operator: "root",
        balance: "0.00",
        createTime: (/* @__PURE__ */ new Date()).toLocaleString()
      });
      const showDeviceIdPicker = vue.ref(false);
      const deviceIdKeyword = vue.ref("");
      const deviceIds = vue.ref([
        "11111",
        "111112",
        "12000443",
        "12000456",
        "12000458",
        "12000463",
        "12000474",
        "12000475",
        "12000479",
        "12000481",
        "12000489",
        "12000491"
      ]);
      const showDeviceNamePicker = vue.ref(false);
      const deviceNameKeyword = vue.ref("");
      const deviceNames = vue.ref([
        "二次回水",
        "二次回水",
        "二次回水",
        "二次回水",
        "高区二次回",
        "二次回水",
        "二次回水",
        "高区二次回",
        "二次回水",
        "低区二次回水"
      ]);
      const filteredDeviceIds = vue.computed(() => {
        return deviceIds.value.filter((item) => item.includes(deviceIdKeyword.value));
      });
      const filteredDeviceNames = vue.computed(() => {
        return deviceNames.value.filter((item) => item.includes(deviceNameKeyword.value));
      });
      const selectDeviceId = (id) => {
        formData.value.deviceId = id;
        showDeviceIdPicker.value = false;
        deviceIdKeyword.value = "";
      };
      const selectDeviceName = (name) => {
        formData.value.deviceName = name;
        showDeviceNamePicker.value = false;
        deviceNameKeyword.value = "";
      };
      const formValid = vue.computed(() => {
        return formData.value.deviceId && formData.value.deviceName && Number(formData.value.amount) > 0;
      });
      const handleSubmit = () => {
        uni.showLoading({ title: "提交中..." });
        setTimeout(() => {
          uni.hideLoading();
          uni.showToast({
            title: "充值成功",
            icon: "success"
          });
        }, 1500);
      };
      const __returned__ = { formData, showDeviceIdPicker, deviceIdKeyword, deviceIds, showDeviceNamePicker, deviceNameKeyword, deviceNames, filteredDeviceIds, filteredDeviceNames, selectDeviceId, selectDeviceName, formValid, handleSubmit, ref: vue.ref, computed: vue.computed };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode(
        "form",
        { onSubmit: $setup.handleSubmit },
        [
          vue.createCommentVNode(" 设备编号选择 "),
          vue.createElementVNode("view", {
            class: "form-item",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.showDeviceIdPicker = true)
          }, [
            vue.createElementVNode("text", { class: "label" }, "设备编号"),
            vue.createElementVNode(
              "view",
              { class: "value" },
              vue.toDisplayString($setup.formData.deviceId || "选择设备编号"),
              1
              /* TEXT */
            )
          ]),
          vue.createCommentVNode(" 设备名称选择 "),
          vue.createElementVNode("view", {
            class: "form-item",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.showDeviceNamePicker = true)
          }, [
            vue.createElementVNode("text", { class: "label" }, "设备名称"),
            vue.createElementVNode(
              "view",
              { class: "value" },
              vue.toDisplayString($setup.formData.deviceName || "选择设备名称"),
              1
              /* TEXT */
            )
          ]),
          vue.createCommentVNode(" 充值信息 "),
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.createElementVNode("text", { class: "label" }, "充值金额"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                type: "number",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.formData.amount = $event),
                placeholder: "请输入充值金额"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.formData.amount]
            ])
          ]),
          vue.createCommentVNode(" 系统信息 "),
          vue.createElementVNode("view", { class: "form-item readonly" }, [
            vue.createElementVNode("text", { class: "label" }, "操作人员"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($setup.formData.operator),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "form-item readonly" }, [
            vue.createElementVNode("text", { class: "label" }, "当前余额"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($setup.formData.balance),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "form-item readonly" }, [
            vue.createElementVNode("text", { class: "label" }, "创建时间"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($setup.formData.createTime),
              1
              /* TEXT */
            )
          ]),
          vue.createCommentVNode(" 设备编号选择弹窗 "),
          $setup.showDeviceIdPicker ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "picker-modal"
          }, [
            vue.createElementVNode("view", {
              class: "picker-mask",
              onClick: _cache[3] || (_cache[3] = ($event) => $setup.showDeviceIdPicker = false)
            }),
            vue.createElementVNode("view", { class: "picker-content" }, [
              vue.createElementVNode("view", { class: "search-box" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.deviceIdKeyword = $event),
                    placeholder: "请输入搜索内容",
                    class: "search-input"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.deviceIdKeyword]
                ])
              ]),
              vue.createElementVNode("scroll-view", {
                "scroll-y": "",
                class: "list-container"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.filteredDeviceIds, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "list-item",
                      onClick: ($event) => $setup.selectDeviceId(item)
                    }, vue.toDisplayString(item), 9, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 设备名称选择弹窗 "),
          $setup.showDeviceNamePicker ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "picker-modal"
          }, [
            vue.createElementVNode("view", {
              class: "picker-mask",
              onClick: _cache[5] || (_cache[5] = ($event) => $setup.showDeviceNamePicker = false)
            }),
            vue.createElementVNode("view", { class: "picker-content" }, [
              vue.createElementVNode("view", { class: "search-box" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.deviceNameKeyword = $event),
                    placeholder: "请输入搜索内容",
                    class: "search-input"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.deviceNameKeyword]
                ])
              ]),
              vue.createElementVNode("scroll-view", {
                "scroll-y": "",
                class: "list-container"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.filteredDeviceNames, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "list-item",
                      onClick: ($event) => $setup.selectDeviceName(item)
                    }, vue.toDisplayString(item), 9, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 提交按钮 "),
          vue.createElementVNode("button", {
            class: "submit-btn",
            "form-type": "submit",
            disabled: !$setup.formValid
          }, " 提交充值信息 ", 8, ["disabled"])
        ],
        32
        /* NEED_HYDRATION */
      )
    ]);
  }
  const PagesRemoteChargeRemoteCharge = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/remote-charge/remote-charge.vue"]]);
  const _sfc_main$6 = {
    __name: "change-password",
    setup(__props, { expose: __expose }) {
      __expose();
      const oldPassword = vue.ref("");
      const newPassword = vue.ref("");
      const confirmPassword = vue.ref("");
      const isSubmitting = vue.ref(false);
      function submit() {
        if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
          uni.showToast({ title: "请填写完整信息", icon: "none" });
          return;
        }
        if (newPassword.value !== confirmPassword.value) {
          uni.showToast({ title: "两次输入的密码不一致", icon: "none" });
          return;
        }
        try {
          isSubmitting.value = true;
          revisePwd({
            oldpassword: oldPassword.value,
            newpassword: newPassword.value
          }).then((res) => {
            formatAppLog("log", "at pages/change-password/change-password.vue:53", res);
            if (res.code === 200) {
              uni.showToast({ title: "修改成功", icon: "success" });
              setTimeout(() => {
                uni.navigateBack();
              }, 1500);
            } else {
              uni.showToast({
                title: res.msg || "密码修改失败",
                icon: "none"
              });
            }
          });
        } catch (error) {
          formatAppLog("error", "at pages/change-password/change-password.vue:69", "修改密码失败:", error);
          uni.showToast({
            title: (error == null ? void 0 : error.message) || "网络异常，请稍后重试",
            icon: "none"
          });
        } finally {
          isSubmitting.value = false;
        }
      }
      const __returned__ = { oldPassword, newPassword, confirmPassword, isSubmitting, submit, ref: vue.ref, get revisePwd() {
        return revisePwd;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "change-password-page" }, [
      vue.createElementVNode("view", { class: "input-group" }, [
        vue.createElementVNode("text", null, "旧密码"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.oldPassword = $event),
            type: "password",
            placeholder: "请输入旧密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.oldPassword]
        ])
      ]),
      vue.createElementVNode("view", { class: "input-group" }, [
        vue.createElementVNode("text", null, "新密码"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.newPassword = $event),
            type: "password",
            placeholder: "请输入新密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.newPassword]
        ])
      ]),
      vue.createElementVNode("view", { class: "input-group" }, [
        vue.createElementVNode("text", null, "确认密码"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.confirmPassword = $event),
            type: "password",
            placeholder: "请再次输入新密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.confirmPassword]
        ])
      ]),
      vue.createElementVNode("view", { class: "submit-wrapper" }, [
        vue.createElementVNode("button", {
          class: "submit-button",
          onClick: $setup.submit
        }, "提交密码修改")
      ])
    ]);
  }
  const PagesChangePasswordChangePassword = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/change-password/change-password.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$5 = {
    name: "uni-easyinput",
    emits: [
      "click",
      "iconClick",
      "update:modelValue",
      "input",
      "focus",
      "blur",
      "confirm",
      "clear",
      "eyes",
      "change",
      "keyboardheightchange"
    ],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      modelValue(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = "";
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("blur", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "adjust-position"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-f7a14e66"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$4 = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      // 表单校验规则
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      // 表单域的属性名，在使用校验规则时必填
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      // label的宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: ""
      },
      // 强制显示错误信息
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      // 1.4.0 弃用，统一使用 form 的校验时机
      // validateTrigger: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 弃用，统一使用 form 的label 位置
      // labelPosition: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 以下属性已经废弃，请使用  #label 插槽代替
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "70px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      // 处理错误信息
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      // 规则发生变化通知子组件更新
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(
          () => {
            const val = this.form._getDataValue(this.name, this.form.localData);
            return val;
          },
          (value, oldVal) => {
            const isEqual2 = this.form._isEqual(value, oldVal);
            if (!isEqual2) {
              const val = this.itemSetValue(value);
              this.onFieldChange(val, false);
            }
          },
          {
            immediate: false
          }
        );
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules = null) {
        this.userRules = rules;
        this.init(false);
      },
      // 兼容老版本表单组件
      setValue() {
      },
      /**
       * 外部调用方法
       * 校验数据
       * @param {any} value 需要校验的数据
       * @param {boolean} 是否立即校验
       * @return {Array|null} 校验内容
       */
      async onFieldChange(value, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value) {
          value = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate(
            {
              [name]: value
            },
            formData
          );
          if (!isRequiredField2 && (value === void 0 || value === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "校验错误",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "提示",
                content: result.errorMessage || "校验错误"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      /**
       * 初始组件数据
       */
      init(type = false) {
        const {
          validator,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.form && type && childrens.push(this);
        if (!validator || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator;
        this.itemSetValue(_getDataValue(this.name, localData));
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index) => {
            if (item === this) {
              this.form.childrens.splice(index, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      // 设置item 的值
      itemSetValue(value) {
        const name = this.form._realName(this.name);
        const rules = this.itemRules.rules || [];
        const val = this.form._getValue(name, value, rules);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      /**
       * 移除该表单项的校验结果
       */
      clearValidate() {
        this.errMsg = "";
      },
      // 是否显示星号
      _isRequired() {
        return this.required;
      },
      // 处理对齐方式
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      // 处理 label宽度单位 ,继承父元素的值
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 70 : "auto"));
      },
      // 处理 label 位置
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      /**
       * 触发时机
       * @param {Object} rule 当前规则内时机
       * @param {Object} itemRlue 当前组件时机
       * @param {Object} parentRule 父组件时机
       */
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
      },
      [
        vue.renderSlot(_ctx.$slots, "label", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$props.required }]),
              style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
            },
            [
              $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "is-required"
              }, "*")) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.label),
                1
                /* TEXT */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ], true),
        vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
            },
            [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($options.msg),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-3515f8e1"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
    // "fileurls": 'array'
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value, type) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (typeof value === "string" && !value) {
      return true;
    }
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === "object" && !Object.keys(value).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    string(value) {
      return typeof value === "string";
    },
    number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    "boolean": function(value) {
      return typeof value === "boolean";
    },
    "float": function(value) {
      return types.number(value) && !types.integer(value);
    },
    array(value) {
      return Array.isArray(value);
    },
    object(value) {
      return typeof value === "object" && !types.array(value);
    },
    date(value) {
      return value instanceof Date;
    },
    timestamp(value) {
      if (!this.integer(value) || Math.abs(value).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value) {
      return typeof value.url === "string";
    },
    email(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    pattern(reg, value) {
      try {
        return new RegExp(reg).test(value);
      } catch (e) {
        return false;
      }
    },
    method(value) {
      return typeof value === "function";
    },
    idcard(value) {
      return typeof value === "string" && !!value.match(pattern.idcard);
    },
    "url-https"(value) {
      return this.url(value) && value.startsWith("https://");
    },
    "url-scheme"(value) {
      return value.startsWith("://");
    },
    "url-web"(value) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value, data, allData) {
      var result = null;
      let rules = fieldValue.rules;
      let hasRequired = rules.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value === null || value === void 0) {
          return result;
        }
        if (typeof value === "string" && !value.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules === void 0) {
        return message["default"];
      }
      for (var i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let vt = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt]) {
          result = RuleValidatorHelper[vt](rule, value, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now = Date.now();
          let resultExpr = rule.validateExpr(value, allData, now);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value, data, allData, vt);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value, data, allData, vt) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt);
      }
      return result;
    }
    _getMessage(rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value, message) {
      if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value, message) {
      const {
        range,
        errorMessage
      } = rule;
      let list = new Array(range.length);
      for (let i = 0; i < range.length; i++) {
        const item = range[i];
        if (types.object(item) && item.value !== void 0) {
          list[i] = item.value;
        } else {
          list[i] = item;
        }
      }
      let result = false;
      if (Array.isArray(value)) {
        result = new Set(value.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value, message) {
      if (!types.number(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value <= minimum : value < minimum;
      let max = exclusiveMaximum ? value >= maximum : value > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value, message) {
      if (!types.string(value) && !types.array(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value, message) {
      if (!types["pattern"](rule.pattern, value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value, message) {
      var customTypes = Object.keys(types);
      var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format) > -1) {
        if (!types[format](value)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value, message) {
      if (!Array.isArray(value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i = 0; i < value.length; i++) {
        const element = value[i];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "验证错误",
      defaultInvalid: "提交的字段{field}在数据库中并不存在",
      validateFunction: "验证无效",
      required: "{label}必填",
      "enum": "{label}超出范围",
      timestamp: "{label}格式无效",
      whitespace: "{label}不能为空",
      typeError: "{label}类型无效",
      date: {
        format: "{label}日期{value}格式无效",
        parse: "{label}日期无法解析,{value}无效",
        invalid: "{label}日期{value}无效"
      },
      length: {
        minLength: "{label}长度不能少于{minLength}",
        maxLength: "{label}长度不能超过{maxLength}",
        range: "{label}必须介于{minLength}和{maxLength}之间"
      },
      number: {
        minimum: "{label}不能小于{minimum}",
        maximum: "{label}不能大于{maximum}",
        exclusiveMinimum: "{label}不能小于等于{minimum}",
        exclusiveMaximum: "{label}不能大于等于{maximum}",
        range: "{label}必须介于{minimum}and{maximum}之间"
      },
      pattern: {
        mismatch: "{label}格式不匹配"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format) => {
    return format === "int" || format === "double" || format === "number" || format === "timestamp";
  };
  const getValue = (key, value, rules) => {
    const isRuleNumType = rules.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value && value !== 0) {
        value = null;
      } else {
        value = isNumber(Number(value)) ? Number(value) : value;
      }
    }
    if (!!isRuleBoolType) {
      value = isBoolean(value) ? value : false;
    }
    return value;
  };
  const setDataValue = (field, formdata, value) => {
    formdata[field] = value;
    return value || "";
  };
  const getDataValue = (field, data) => {
    return objGet(data, field);
  };
  const realName = (name, data = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a, b) => a += `#${b}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object));
    let formData = {};
    for (let i in newData) {
      let path = name2arr(i);
      objSet(formData, path, newData[i]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v) => isNumber(v) ? Number(v) : v);
    return field;
  };
  const objSet = (object, path, value) => {
    if (typeof object !== "object")
      return object;
    _basePath(path).reduce((o, k, i, _) => {
      if (i === _.length - 1) {
        o[k] = value;
        return null;
      } else if (k in o) {
        return o[k];
      } else {
        o[k] = /^[0-9]{1,}$/.test(_[i + 1]) ? [] : {};
        return o[k];
      }
    }, object);
    return object;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o, k) => {
      return (o || {})[k];
    }, object);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules) => {
    let isNoField = false;
    for (let i = 0; i < rules.length; i++) {
      const ruleData = rules[i];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a, b) => {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    }
    if (a == null || b == null) {
      return a === b;
    }
    var classNameA = toString.call(a), classNameB = toString.call(b);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a) {
          return +b !== +b;
        }
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a), propsB = Object.getOwnPropertyNames(b);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i = 0; i < propsA.length; i++) {
        var propName = propsA[i];
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a.toString() == b.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$3 = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      // 即将弃用
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      // vue3 替换 value 属性
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      // 1.4.0 开始将不支持 v-model ，且废弃 value 和 modelValue
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      // 表单校验规则
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      //校验错误信息提示方式 默认 undertext 取值 [undertext|toast|modal]
      errShowType: {
        type: String,
        default: "undertext"
      },
      // 校验触发器方式 默认 bind 取值 [bind|submit]
      validateTrigger: {
        type: String,
        default: "submit"
      },
      // label 位置，默认 left 取值  top/left
      labelPosition: {
        type: String,
        default: "left"
      },
      // label 宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        // 表单本地值的记录，不应该与传如的值进行关联
        formData: {},
        formRules: {}
      };
    },
    computed: {
      // 计算数据源变化的
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      // 监听数据变化 ,暂时不使用，需要单独赋值
      // localData: {},
      // 监听规则变化
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value);
          } else {
            let formVm;
            for (let i in this.$refs) {
              const vm = this.$refs[i];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at node_modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue:187", "当前 uni-froms 组件缺少 ref 属性");
            if (formVm.model)
              formVm.model[name] = value;
            if (formVm.modelValue)
              formVm.modelValue[name] = value;
            if (formVm.value)
              formVm.value[name] = value;
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules) {
        this.formRules = Object.assign({}, this.formRules, rules);
        this.validator = new SchemaValidator(rules);
      },
      /**
       * 外部调用方法
       * 设置数据，用于设置表单数据，公开给用户使用 ， 不支持在动态表单中使用
       * @param {Object} key
       * @param {Object} value
       */
      setValue(key, value) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      /**
       * 外部调用方法
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      /**
       * 外部调用方法
       * 部分表单校验
       * @param {Array|String} props 需要校验的字段
       * @param {Function} 回调函数
       */
      validateField(props = [], callback) {
        props = [].concat(props);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      /**
       * 外部调用方法
       * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
       * @param {Array|String} props 需要移除校验的字段 ，不填为所有
       */
      clearValidate(props = []) {
        props = [].concat(props);
        this.childrens.forEach((item) => {
          if (props.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      /**
       * 外部调用方法 ，即将废弃
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      submit(keepitem, callback, type) {
        for (let i in this.dataValue) {
          const itemData = this.childrens.find((v) => v.name === i);
          if (itemData) {
            if (this.formData[i] === void 0) {
              this.formData[i] = this._getValue(i, this.dataValue[i]);
            }
          }
        }
        if (!type) {
          formatAppLog("warn", "at node_modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue:296", "submit 方法即将废弃，请使用validate方法代替！");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      // 校验所有
      async checkAll(invalidFields, keepitem, callback, type) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i in invalidFields) {
          const item = this.childrens.find((v) => realName(v.name) === i);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise;
        if (!callback && typeof callback !== "function" && Promise) {
          promise = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i in childrens) {
          const child = childrens[i];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v) => {
            let vName = realName(v);
            let value = getDataValue(v, this.localData);
            if (value !== void 0) {
              tempFormData[vName] = value;
            }
          });
        }
        if (type === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise && callback) {
          return promise;
        } else {
          return null;
        }
      },
      /**
       * 返回validate事件
       * @param {Object} result
       */
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-13523fe0"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue"]]);
  const _sfc_main$2 = {
    __name: "add-station",
    setup(__props, { expose: __expose }) {
      __expose();
      const formData = vue.ref({
        stationName: "",
        company: "02test",
        userName: "",
        phone: "",
        longitude: "",
        latitude: "",
        address: "",
        detail: ""
      });
      const companies = vue.ref([
        { value: "01company", text: "第一供热公司" },
        { value: "02test", text: "测试公司" },
        { value: "03demo", text: "演示公司" }
      ]);
      const rules = vue.ref({
        stationName: {
          rules: [{ required: true, errorMessage: "请输入换热站名称" }]
        },
        company: {
          rules: [{ required: true, errorMessage: "请选择所属公司" }]
        },
        coordinates: {
          rules: [{
            validateFunction: (rule, value, data, callback) => {
              if (!data.longitude || !data.latitude) {
                callback("请输入经纬度信息");
              }
              return true;
            }
          }]
        }
      });
      const getLocation = () => {
        uni.getLocation({
          type: "wgs84",
          success: (res) => {
            formData.value.longitude = res.longitude.toFixed(6);
            formData.value.latitude = res.latitude.toFixed(6);
            uni.showToast({
              title: "获取位置成功",
              icon: "success"
            });
          },
          fail: (err) => {
            uni.showToast({
              title: "获取位置失败",
              icon: "none"
            });
            formatAppLog("error", "at pages/add-station/add-station.vue:140", "获取位置失败:", err);
          }
        });
      };
      const submitForm = () => {
        const form = vue.ref(null);
        form.value.validate().then(() => {
          uni.showLoading({
            title: "提交中..."
          });
          formatAppLog("log", "at pages/add-station/add-station.vue:154", "提交数据:", formData.value);
          setTimeout(() => {
            uni.hideLoading();
            uni.showToast({
              title: "提交成功",
              icon: "success"
            });
            uni.navigateBack();
          }, 1500);
        }).catch((err) => {
          formatAppLog("log", "at pages/add-station/add-station.vue:165", "表单验证失败:", err);
        });
      };
      const __returned__ = { formData, companies, rules, getLocation, submitForm, ref: vue.ref, get onLoad() {
        return onLoad;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "form-container" }, [
        vue.createVNode(_component_uni_forms, {
          ref: "form",
          model: $setup.formData,
          rules: $setup.rules
        }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode(" 换热站名称 "),
            vue.createVNode(_component_uni_forms_item, {
              label: "换热站名称",
              required: "",
              name: "stationName"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_easyinput, {
                  modelValue: $setup.formData.stationName,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.formData.stationName = $event),
                  placeholder: "请输入换热站名称"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 所属公司 "),
            vue.createVNode(_component_uni_forms_item, {
              label: "所属公司",
              required: "",
              name: "company"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_easyinput, {
                  modelValue: $setup.formData.company,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.formData.company = $event),
                  placeholder: "请选择所属公司"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 站内负责人 "),
            vue.createVNode(_component_uni_forms_item, {
              label: "站内负责人",
              required: "",
              name: "manager"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_easyinput, {
                  modelValue: $setup.formData.userName,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.formData.userName = $event),
                  placeholder: "请输入站内负责人"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 联系方式 "),
            vue.createVNode(_component_uni_forms_item, {
              label: "联系方式",
              required: "",
              name: "contact"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_easyinput, {
                  modelValue: $setup.formData.phone,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.formData.phone = $event),
                  placeholder: "请输入联系方式",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 经纬度信息 "),
            vue.createVNode(_component_uni_forms_item, {
              label: "经纬度信息",
              required: "",
              name: "coordinates"
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "coordinate-input" }, [
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.formData.longitude,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.formData.longitude = $event),
                    placeholder: "经度",
                    class: "coordinate-item",
                    type: "number"
                  }, null, 8, ["modelValue"]),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.formData.latitude,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.formData.latitude = $event),
                    placeholder: "纬度",
                    class: "coordinate-item",
                    type: "number"
                  }, null, 8, ["modelValue"]),
                  vue.createElementVNode("button", {
                    class: "location-btn",
                    onClick: $setup.getLocation
                  }, "选择位置")
                ])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 换热站地址 "),
            vue.createVNode(_component_uni_forms_item, {
              label: "换热站地址",
              required: "",
              name: "address"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_easyinput, {
                  modelValue: $setup.formData.address,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.formData.address = $event),
                  placeholder: "请输入换热站地址"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 换热站简介 "),
            vue.createVNode(_component_uni_forms_item, {
              label: "换热站简介",
              required: "",
              name: "description"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_easyinput, {
                  modelValue: $setup.formData.detail,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.formData.detail = $event),
                  placeholder: "请输入换热站简介",
                  type: "textarea"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model", "rules"]),
        vue.createElementVNode("button", {
          class: "submit-btn",
          onClick: $setup.submitForm
        }, "提交换热站信息")
      ])
    ]);
  }
  const PagesAddStationAddStation = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/add-station/add-station.vue"]]);
  const _sfc_main$1 = {
    __name: "select-location",
    setup(__props, { expose: __expose }) {
      __expose();
      const latitude = vue.ref(39.90923);
      const longitude = vue.ref(116.397428);
      const markers = vue.ref([]);
      const clickPosition = vue.ref(null);
      let mapContext = null;
      onReady(() => {
        mapContext = uni.createMapContext("myMap", this);
      });
      const handleMapTap = (e) => {
        clickPosition.value = e.detail;
        markers.value = [{
          id: Date.now(),
          latitude: e.detail.latitude,
          longitude: e.detail.longitude,
          iconPath: "/static/marker.png",
          width: 30,
          height: 30
        }];
        reverseGeocode(e.detail.longitude, e.detail.latitude);
      };
      const reverseGeocode = (lng, lat) => {
        uni.request({
          url: "https://your-api-domain.com/reverse-geocode",
          data: { lng, lat },
          success: (res) => {
            formatAppLog("log", "at pages/select-location/select-location.vue:57", "逆地理编码结果:", res.data);
          }
        });
      };
      const __returned__ = { latitude, longitude, markers, clickPosition, get mapContext() {
        return mapContext;
      }, set mapContext(v) {
        mapContext = v;
      }, handleMapTap, reverseGeocode, ref: vue.ref, get onReady() {
        return onReady;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "map-container" }, [
      vue.createElementVNode("map", {
        id: "myMap",
        style: { "width": "100%", "height": "80vh" },
        latitude: $setup.latitude,
        longitude: $setup.longitude,
        markers: $setup.markers,
        onTap: $setup.handleMapTap,
        "show-location": ""
      }, null, 40, ["latitude", "longitude", "markers"]),
      $setup.clickPosition ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "coordinate-info"
        },
        " 经度: " + vue.toDisplayString($setup.clickPosition.longitude.toFixed(6)) + " 纬度: " + vue.toDisplayString($setup.clickPosition.latitude.toFixed(6)),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesSelectLocationSelectLocation = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/select-location/select-location.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/map/map", PagesMapMap);
  __definePage("pages/PreLogin/PreLogin", PagesPreLoginPreLogin);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/more/more", PagesMoreMore);
  __definePage("pages/list/list", PagesListList);
  __definePage("pages/settings/settings", PagesSettingsSettings);
  __definePage("pages/user/user", PagesUserUser);
  __definePage("pages/error/error", PagesErrorError);
  __definePage("pages/account/account", PagesAccountAccount);
  __definePage("pages/recharge-record/recharge-record", PagesRechargeRecordRechargeRecord);
  __definePage("pages/setting/setting", PagesSettingSetting);
  __definePage("pages/remote-charge/remote-charge", PagesRemoteChargeRemoteCharge);
  __definePage("pages/change-password/change-password", PagesChangePasswordChangePassword);
  __definePage("pages/add-station/add-station", PagesAddStationAddStation);
  __definePage("pages/select-location/select-location", PagesSelectLocationSelectLocation);
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
