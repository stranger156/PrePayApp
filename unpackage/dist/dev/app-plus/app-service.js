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
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom2) {
    return typeof component === "string" ? easycom2 : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const easycom = {
    autoscan: true,
    custom: {
      "^qiun-(.*)": "@qiun/ucharts/components/$1/$1.vue"
    }
  };
  const pages = [
    {
      path: "pages/chart/chart",
      style: {
        navigationBarTitleText: "登录"
      }
    },
    {
      path: "pages/login/login",
      style: {
        navigationBarTitleText: "登录"
      }
    },
    {
      path: "pages/map/map",
      style: {
        navigationBarTitleText: "地图",
        navigationBarBackgroundColor: "#1E90FF",
        navigationBarTextStyle: "white"
      }
    },
    {
      path: "pages/PreLogin/PreLogin",
      style: {
        navigationBarTitleText: "预登录界面"
      }
    },
    {
      path: "pages/index/index",
      style: {
        navigationBarTitleText: "uni-app"
      }
    },
    {
      path: "pages/more/more",
      style: {
        navigationBarTitleText: "更多详情"
      }
    },
    {
      path: "pages/list/list",
      style: {
        navigationBarTitleText: "我的换热站",
        navigationBarBackgroundColor: "#1E90FF",
        navigationBarTextStyle: "white",
        "app-plus": {
          titleNView: {
            backgroundColor: "#1E90FF",
            titleText: "我的换热站",
            titleColor: "#FFFFFF",
            type: "default",
            titleSize: "18px"
          }
        }
      }
    },
    {
      path: "pages/settings/settings",
      style: {
        navigationBarTitleText: "设置",
        navigationBarBackgroundColor: "#1E90FF",
        navigationBarTextStyle: "white"
      }
    },
    {
      path: "pages/user/user",
      style: {
        navigationBarTitleText: "企业管理"
      }
    },
    {
      path: "pages/error/error",
      style: {
        navigationBarTitleText: "异常信息"
      }
    },
    {
      path: "pages/account/account",
      style: {
        navigationBarTitleText: "账号管理"
      }
    },
    {
      path: "pages/recharge-record/recharge-record",
      style: {
        navigationBarTitleText: "充值记录"
      }
    },
    {
      path: "pages/setting/setting",
      style: {
        navigationBarTitleText: "设置"
      }
    },
    {
      path: "pages/remote-charge/remote-charge",
      style: {
        navigationBarTitleText: "远程充值"
      }
    },
    {
      path: "pages/change-password/change-password",
      style: {
        navigationBarTitleText: "修改密码"
      }
    },
    {
      path: "pages/add-station/add-station",
      style: {
        navigationBarTitleText: "添加换热站信息"
      }
    },
    {
      path: "pages/select-location/select-location",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/company-stationList/company-stationList",
      style: {
        navigationBarTitleText: "换热站管理"
      }
    }
  ];
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8"
  };
  const tabBar = {
    color: "#7A7E83",
    iconWidth: "100px",
    selectedColor: "#3cc51f",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    fontSize: 0,
    list: [
      {
        pagePath: "pages/map/map",
        iconPath: "static/map_icon_dark.png",
        selectedIconPath: "/static/map_icon_blue.png"
      },
      {
        pagePath: "pages/list/list",
        iconPath: "/static/list_icon_dark.png",
        selectedIconPath: "static/list_icon_blue.png"
      },
      {
        pagePath: "pages/settings/settings",
        iconPath: "static/setting_icon_dark.png",
        selectedIconPath: "static/setting_icon_blue.png"
      }
    ]
  };
  const uniIdRouter = {};
  const usingComponents = {
    map: "/uni_modules/@dcloudio/uni-map/components/uni-map/uni-map"
  };
  const e = {
    easycom,
    pages,
    globalStyle,
    tabBar,
    uniIdRouter,
    usingComponents
  };
  var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
  function t$1(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function n(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = n2 || function(e3, t3) {
      var n3 = Object.create || /* @__PURE__ */ function() {
        function e4() {
        }
        return function(t4) {
          var n4;
          return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
        var t4 = n3(this);
        return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e4 = this.extend();
        return e4.init.apply(e4, arguments), e4;
      }, init: function() {
      }, mixIn: function(e4) {
        for (var t4 in e4)
          e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
        e4.hasOwnProperty("toString") && (this.toString = e4.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
        e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
      }, toString: function(e4) {
        return (e4 || c2).stringify(this);
      }, concat: function(e4) {
        var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4.words = this.words.slice(0), e4;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e3.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, h2 = a2.Utf8 = { stringify: function(e4) {
        try {
          return decodeURIComponent(escape(u2.stringify(e4)));
        } catch (e5) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e4) {
        return u2.parse(unescape(encodeURIComponent(e4)));
      } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e4) {
        "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
        if (c3) {
          for (var h3 = 0; h3 < c3; h3 += i3)
            this._doProcessBlock(s3, h3);
          var l3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(l3, u3);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._data = this._data.clone(), e4;
      }, _minBufferSize: 0 });
      r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
        this.cfg = this.cfg.extend(e4), this.reset();
      }, reset: function() {
        l2.reset.call(this), this._doReset();
      }, update: function(e4) {
        return this._append(e4), this._process(), this;
      }, finalize: function(e4) {
        return e4 && this._append(e4), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e4) {
        return function(t4, n4) {
          return new e4.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e4) {
        return function(t4, n4) {
          return new d2.HMAC.init(e4, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), r = s, i = (n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e4[s3];
          e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], T2 = e4[t4 + 14], A2 = e4[t4 + 15], P2 = i3[0], C2 = i3[1], x2 = i3[2], O2 = i3[3];
        P2 = u2(P2, C2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, P2, C2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, P2, C2, p2, 17, a2[2]), C2 = u2(C2, x2, O2, P2, f2, 22, a2[3]), P2 = u2(P2, C2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, P2, C2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, P2, C2, y2, 17, a2[6]), C2 = u2(C2, x2, O2, P2, _2, 22, a2[7]), P2 = u2(P2, C2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, P2, C2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, P2, C2, I2, 17, a2[10]), C2 = u2(C2, x2, O2, P2, S2, 22, a2[11]), P2 = u2(P2, C2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, P2, C2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, P2, C2, T2, 17, a2[14]), P2 = h2(P2, C2 = u2(C2, x2, O2, P2, A2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = h2(O2, P2, C2, x2, y2, 9, a2[17]), x2 = h2(x2, O2, P2, C2, S2, 14, a2[18]), C2 = h2(C2, x2, O2, P2, o3, 20, a2[19]), P2 = h2(P2, C2, x2, O2, m2, 5, a2[20]), O2 = h2(O2, P2, C2, x2, I2, 9, a2[21]), x2 = h2(x2, O2, P2, C2, A2, 14, a2[22]), C2 = h2(C2, x2, O2, P2, g2, 20, a2[23]), P2 = h2(P2, C2, x2, O2, v2, 5, a2[24]), O2 = h2(O2, P2, C2, x2, T2, 9, a2[25]), x2 = h2(x2, O2, P2, C2, f2, 14, a2[26]), C2 = h2(C2, x2, O2, P2, w2, 20, a2[27]), P2 = h2(P2, C2, x2, O2, k2, 5, a2[28]), O2 = h2(O2, P2, C2, x2, p2, 9, a2[29]), x2 = h2(x2, O2, P2, C2, _2, 14, a2[30]), P2 = l2(P2, C2 = h2(C2, x2, O2, P2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = l2(O2, P2, C2, x2, w2, 11, a2[33]), x2 = l2(x2, O2, P2, C2, S2, 16, a2[34]), C2 = l2(C2, x2, O2, P2, T2, 23, a2[35]), P2 = l2(P2, C2, x2, O2, c3, 4, a2[36]), O2 = l2(O2, P2, C2, x2, g2, 11, a2[37]), x2 = l2(x2, O2, P2, C2, _2, 16, a2[38]), C2 = l2(C2, x2, O2, P2, I2, 23, a2[39]), P2 = l2(P2, C2, x2, O2, k2, 4, a2[40]), O2 = l2(O2, P2, C2, x2, o3, 11, a2[41]), x2 = l2(x2, O2, P2, C2, f2, 16, a2[42]), C2 = l2(C2, x2, O2, P2, y2, 23, a2[43]), P2 = l2(P2, C2, x2, O2, v2, 4, a2[44]), O2 = l2(O2, P2, C2, x2, b2, 11, a2[45]), x2 = l2(x2, O2, P2, C2, A2, 16, a2[46]), P2 = d2(P2, C2 = l2(C2, x2, O2, P2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, P2, C2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, P2, C2, T2, 15, a2[50]), C2 = d2(C2, x2, O2, P2, m2, 21, a2[51]), P2 = d2(P2, C2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, P2, C2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, P2, C2, I2, 15, a2[54]), C2 = d2(C2, x2, O2, P2, c3, 21, a2[55]), P2 = d2(P2, C2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, P2, C2, x2, A2, 10, a2[57]), x2 = d2(x2, O2, P2, C2, y2, 15, a2[58]), C2 = d2(C2, x2, O2, P2, k2, 21, a2[59]), P2 = d2(P2, C2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, P2, C2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, P2, C2, p2, 15, a2[62]), C2 = d2(C2, x2, O2, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e3.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var h3 = c3[u3];
          c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      function u2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, void function() {
      var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
      e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
        e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e4.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e4 = this._hasher;
        e4.reset(), e4.update(this._iKey);
      }, update: function(e4) {
        return this._hasher.update(e4), this;
      }, finalize: function(e4) {
        var t4 = this._hasher, n3 = t4.finalize(e4);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), n(function(e2, t2) {
    e2.exports = r.HmacMD5;
  })), o = n(function(e2, t2) {
    e2.exports = r.enc.Utf8;
  }), a = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function() {
      var e3 = n2, t3 = e3.lib.WordArray;
      function s2(e4, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e3.enc.Base64 = { stringify: function(e4) {
        var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
        e4.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e4) {
        var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e4.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e4, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
  function f(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function g(e2) {
    return "object" === f(e2);
  }
  function m(e2) {
    return "function" == typeof e2;
  }
  function y(e2) {
    return function() {
      try {
        return e2.apply(e2, arguments);
      } catch (e3) {
        console.error(e3);
      }
    };
  }
  const _ = "REJECTED", w = "NOT_PENDING";
  class v {
    constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
      this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case _:
          return this.status === p;
        case w:
          return this.status !== l;
      }
    }
    exec() {
      return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
    }
  }
  function I(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const S = true, b = "app", T = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), A = b, P = I(""), C = I("[]") || [];
  let O = "";
  try {
    O = "__UNI__75F13A5";
  } catch (e2) {
  }
  let E, L = {};
  function R(e2, t2 = {}) {
    var n2, s2;
    return n2 = L, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (L[e2] = t2), L[e2];
  }
  function U() {
    return E || (E = function() {
      if ("undefined" != typeof globalThis)
        return globalThis;
      if ("undefined" != typeof self)
        return self;
      if ("undefined" != typeof window)
        return window;
      function e2() {
        return this;
      }
      return void 0 !== e2() ? e2() : new Function("return this")();
    }(), E);
  }
  L = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const N = ["invoke", "success", "fail", "complete"], D = R("_globalUniCloudInterceptor");
  function M(e2, t2) {
    D[e2] || (D[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
      N.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = D[e3][t3];
        s2 || (s2 = D[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function q(e2, t2) {
    D[e2] || (D[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
      N.indexOf(n2) > -1 && function(e3, t3, n3) {
        const s2 = D[e3][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e2, n2, t2[n2]);
    }) : delete D[e2];
  }
  function K(e2, t2) {
    return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function F(e2, t2) {
    return D[e2] && D[e2][t2] || [];
  }
  function j(e2) {
    M("callObject", e2);
  }
  const $ = R("_globalUniCloudListener"), B = "response", W = "needLogin", H = "refreshToken", J = "clientdb", z = "cloudfunction", V = "cloudobject";
  function G(e2) {
    return $[e2] || ($[e2] = []), $[e2];
  }
  function Y(e2, t2) {
    const n2 = G(e2);
    n2.includes(t2) || n2.push(t2);
  }
  function Q(e2, t2) {
    const n2 = G(e2), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function X(e2, t2) {
    const n2 = G(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      (0, n2[e3])(t2);
    }
  }
  let Z, ee = false;
  function te() {
    return Z || (Z = new Promise((e2) => {
      ee && e2(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (ee = true, e2());
        }
        ee || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), Z);
  }
  function ne(e2) {
    const t2 = {};
    for (const n2 in e2) {
      const s2 = e2[n2];
      m(s2) && (t2[n2] = y(s2));
    }
    return t2;
  }
  class se extends Error {
    constructor(e2) {
      super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
    }
    toJson(e2 = 0) {
      if (!(e2 >= 10))
        return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
    }
  }
  var re = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync(), connectSocket: (e2) => uni.connectSocket(e2) };
  function ie(e2) {
    return e2 && ie(e2.__v_raw) || e2;
  }
  function oe() {
    return { token: re.getStorageSync("uni_id_token") || re.getStorageSync("uniIdToken"), tokenExpired: re.getStorageSync("uni_id_token_expired") };
  }
  function ae({ token: e2, tokenExpired: t2 } = {}) {
    e2 && re.setStorageSync("uni_id_token", e2), t2 && re.setStorageSync("uni_id_token_expired", t2);
  }
  let ce, ue;
  function he() {
    return ce || (ce = uni.getSystemInfoSync()), ce;
  }
  function le() {
    let e2, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e2 = s2, t2 = n2;
      }
    } catch (e3) {
    }
    return { channel: e2, scene: t2 };
  }
  let de = {};
  function pe() {
    const e2 = uni.getLocale && uni.getLocale() || "en";
    if (ue)
      return { ...de, ...ue, locale: e2, LOCALE: e2 };
    const t2 = he(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
    for (const e3 in t2)
      Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
    return ue = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...le(), ...t2 }, { ...de, ...ue, locale: e2, LOCALE: e2 };
  }
  var fe = { sign: function(e2, t2) {
    let n2 = "";
    return Object.keys(e2).sort().forEach(function(t3) {
      e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
    }), n2 = n2.slice(1), i(n2, t2).toString();
  }, wrappedRequest: function(e2, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e2, { complete(e3) {
        e3 || (e3 = {});
        const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
        if (!e3.statusCode || e3.statusCode >= 400) {
          const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
          return s2(new se({ code: n3, message: r3, requestId: t3 }));
        }
        const r2 = e3.data;
        if (r2.error)
          return s2(new se({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e2) {
    return a.stringify(o.parse(e2));
  } };
  var ge = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = re, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
        if (!e3.result || !e3.result.accessToken)
          throw new se({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e3.result.accessToken);
      }), retryRule: w });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e2) {
      this.accessToken = e2;
    }
    requestWrapped(e2) {
      return fe.wrappedRequest(e2, this.adapter.request);
    }
    requestAuth(e2) {
      return this.requestWrapped(e2);
    }
    request(e2, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e2);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e2);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e2) {
      const t2 = Object.assign({}, e2);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = fe.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = fe.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request({ ...this.setupRequest(t2), timeout: e2.timeout });
    }
    getOSSUploadOptionsFromPath(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
      if ("string" !== f(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const o2 = i2 && i2.envType || this.config.envType;
      if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
        throw new se({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
      const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
      if (u2 && (_2["x-oss-security-token"] = u2), y2) {
        const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        _2.callback = fe.toBase64(e3);
      }
      const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
        return { success: true, filePath: e2, fileID: c2 };
      if ((await this.reportOSSUpload({ id: g2 })).success)
        return { success: true, filePath: e2, fileID: c2 };
      throw new se({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e2) && 0 !== e2.length || n2(new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
      });
    }
    async getFileInfo({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var me = { init(e2) {
    const t2 = new ge(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const ye = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var _e;
  !function(e2) {
    e2.local = "local", e2.none = "none", e2.session = "session";
  }(_e || (_e = {}));
  var we = function() {
  }, ve = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
      !function() {
        function t4(t5) {
          for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
            if (!(t5 % s4))
              return false;
          return true;
        }
        function n3(e4) {
          return 4294967296 * (e4 - (0 | e4)) | 0;
        }
        for (var s3 = 2, r3 = 0; r3 < 64; )
          t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
      }();
      var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
        this._hash = new r2.init(a2.slice(0));
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
          if (p2 < 16)
            u2[p2] = 0 | e4[t4 + p2];
          else {
            var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
            u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
          }
          var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
          d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
        }
        n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
    }(Math), n2.SHA256);
  }), Ie = ve, Se = n(function(e2, t2) {
    e2.exports = r.HmacSHA256;
  });
  const be = () => {
    let e2;
    if (!Promise) {
      e2 = () => {
      }, e2.promise = {};
      const t3 = () => {
        throw new se({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
    }
    const t2 = new Promise((t3, n2) => {
      e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
    });
    return e2.promise = t2, e2;
  };
  function ke(e2) {
    return void 0 === e2;
  }
  function Te(e2) {
    return "[object Null]" === Object.prototype.toString.call(e2);
  }
  function Ae(e2 = "") {
    return e2.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1");
  }
  function Pe(e2 = 32) {
    const t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n2 = t2.length;
    let s2 = "";
    for (let r2 = 0; r2 < e2; r2++)
      s2 += t2.charAt(Math.floor(Math.random() * n2));
    return s2;
  }
  var Ce;
  function xe(e2) {
    const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
    var n2;
    for (const e3 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e2) {
    e2.WEB = "web", e2.WX_MP = "wx_mp";
  }(Ce || (Ce = {}));
  const Oe = { adapter: null, runtime: void 0 }, Ee = ["anonymousUuidKey"];
  class Le extends we {
    constructor() {
      super(), Oe.adapter.root.tcbObject || (Oe.adapter.root.tcbObject = {});
    }
    setItem(e2, t2) {
      Oe.adapter.root.tcbObject[e2] = t2;
    }
    getItem(e2) {
      return Oe.adapter.root.tcbObject[e2];
    }
    removeItem(e2) {
      delete Oe.adapter.root.tcbObject[e2];
    }
    clear() {
      delete Oe.adapter.root.tcbObject;
    }
  }
  function Re(e2, t2) {
    switch (e2) {
      case "local":
        return t2.localStorage || new Le();
      case "none":
        return new Le();
      default:
        return t2.sessionStorage || new Le();
    }
  }
  class Ue {
    constructor(e2) {
      if (!this._storage) {
        this._persistence = Oe.adapter.primaryStorage || e2.persistence, this._storage = Re(this._persistence, Oe.adapter);
        const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = "device_id", a2 = `token_type_${e2.env}`, c2 = `user_info_${e2.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: c2, deviceIdKey: o2, tokenTypeKey: a2 };
      }
    }
    updatePersistence(e2) {
      if (e2 === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e2;
      const n2 = Re(e2, Oe.adapter);
      for (const e3 in this.keys) {
        const s2 = this.keys[e3];
        if (t2 && Ee.includes(e3))
          continue;
        const r2 = this._storage.getItem(s2);
        ke(r2) || Te(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e2, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e2, r2);
      } catch (e3) {
        throw e3;
      }
    }
    getStore(e2, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e3) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e2);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e2) {
      this._storage.removeItem(e2);
    }
  }
  const Ne = {}, De = {};
  function Me(e2) {
    return Ne[e2];
  }
  class qe {
    constructor(e2, t2) {
      this.data = t2 || null, this.name = e2;
    }
  }
  class Ke extends qe {
    constructor(e2, t2) {
      super("error", { error: e2, data: t2 }), this.error = e2;
    }
  }
  const Fe = new class {
    constructor() {
      this._listeners = {};
    }
    on(e2, t2) {
      return function(e3, t3, n2) {
        n2[e3] = n2[e3] || [], n2[e3].push(t3);
      }(e2, t2, this._listeners), this;
    }
    off(e2, t2) {
      return function(e3, t3, n2) {
        if (n2 && n2[e3]) {
          const s2 = n2[e3].indexOf(t3);
          -1 !== s2 && n2[e3].splice(s2, 1);
        }
      }(e2, t2, this._listeners), this;
    }
    fire(e2, t2) {
      if (e2 instanceof Ke)
        return console.error(e2.error), this;
      const n2 = "string" == typeof e2 ? new qe(e2, t2 || {}) : e2;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e3)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e2) {
      return this._listeners[e2] && this._listeners[e2].length > 0;
    }
  }();
  function je(e2, t2) {
    Fe.on(e2, t2);
  }
  function $e(e2, t2 = {}) {
    Fe.fire(e2, t2);
  }
  function Be(e2, t2) {
    Fe.off(e2, t2);
  }
  const We = "loginStateChanged", He = "loginStateExpire", Je = "loginTypeChanged", ze = "anonymousConverted", Ve = "refreshAccessToken";
  var Ge;
  !function(e2) {
    e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
  }(Ge || (Ge = {}));
  class Ye {
    constructor() {
      this._fnPromiseMap = /* @__PURE__ */ new Map();
    }
    async run(e2, t2) {
      let n2 = this._fnPromiseMap.get(e2);
      return n2 || (n2 = new Promise(async (n3, s2) => {
        try {
          await this._runIdlePromise();
          const s3 = t2();
          n3(await s3);
        } catch (e3) {
          s2(e3);
        } finally {
          this._fnPromiseMap.delete(e2);
        }
      }), this._fnPromiseMap.set(e2, n2)), n2;
    }
    _runIdlePromise() {
      return Promise.resolve();
    }
  }
  class Qe {
    constructor(e2) {
      this._singlePromise = new Ye(), this._cache = Me(e2.env), this._baseURL = `https://${e2.env}.ap-shanghai.tcb-api.tencentcloudapi.com`, this._reqClass = new Oe.adapter.reqClass({ timeout: e2.timeout, timeoutMsg: `请求在${e2.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] });
    }
    _getDeviceId() {
      if (this._deviceID)
        return this._deviceID;
      const { deviceIdKey: e2 } = this._cache.keys;
      let t2 = this._cache.getStore(e2);
      return "string" == typeof t2 && t2.length >= 16 && t2.length <= 48 || (t2 = Pe(), this._cache.setStore(e2, t2)), this._deviceID = t2, t2;
    }
    async _request(e2, t2, n2 = {}) {
      const s2 = { "x-request-id": Pe(), "x-device-id": this._getDeviceId() };
      if (n2.withAccessToken) {
        const { tokenTypeKey: e3 } = this._cache.keys, t3 = await this.getAccessToken(), n3 = this._cache.getStore(e3);
        s2.authorization = `${n3} ${t3}`;
      }
      return this._reqClass["get" === n2.method ? "get" : "post"]({ url: `${this._baseURL}${e2}`, data: t2, headers: s2 });
    }
    async _fetchAccessToken() {
      const { loginTypeKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2, tokenTypeKey: s2 } = this._cache.keys, r2 = this._cache.getStore(e2);
      if (r2 && r2 !== Ge.ANONYMOUS)
        throw new se({ code: "INVALID_OPERATION", message: "非匿名登录不支持刷新 access token" });
      const i2 = await this._singlePromise.run("fetchAccessToken", async () => (await this._request("/auth/v1/signin/anonymously", {}, { method: "post" })).data), { access_token: o2, expires_in: a2, token_type: c2 } = i2;
      return this._cache.setStore(s2, c2), this._cache.setStore(t2, o2), this._cache.setStore(n2, Date.now() + 1e3 * a2), o2;
    }
    isAccessTokenExpired(e2, t2) {
      let n2 = true;
      return e2 && t2 && (n2 = t2 < Date.now()), n2;
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
      return this.isAccessTokenExpired(n2, s2) ? this._fetchAccessToken() : n2;
    }
    async refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, loginTypeKey: n2 } = this._cache.keys;
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.setStore(n2, Ge.ANONYMOUS), this.getAccessToken();
    }
    async getUserInfo() {
      return this._singlePromise.run("getUserInfo", async () => (await this._request("/auth/v1/user/me", {}, { withAccessToken: true, method: "get" })).data);
    }
  }
  const Xe = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Ze = { "X-SDK-Version": "1.3.5" };
  function et(e2, t2, n2) {
    const s2 = e2[t2];
    e2[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e2, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e3;
        if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
          t3.data = { ...o2, ...r2 };
        else
          for (const e4 in r2)
            o2.append(e4, r2[e4]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
    };
  }
  function tt() {
    const e2 = Math.random().toString(16).slice(2);
    return { data: { seqId: e2 }, headers: { ...Ze, "x-seqid": e2 } };
  }
  class nt {
    constructor(e2 = {}) {
      var t2;
      this.config = e2, this._reqClass = new Oe.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Me(this.config.env), this._localCache = (t2 = this.config.env, De[t2]), this.oauth = new Qe(this.config), et(this._reqClass, "post", [tt]), et(this._reqClass, "upload", [tt]), et(this._reqClass, "download", [tt]);
    }
    async post(e2) {
      return await this._reqClass.post(e2);
    }
    async upload(e2) {
      return await this._reqClass.upload(e2);
    }
    async download(e2) {
      return await this._reqClass.download(e2);
    }
    async refreshAccessToken() {
      let e2, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e2 = await this._refreshAccessTokenPromise;
      } catch (e3) {
        t2 = e3;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e2;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e2), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new se({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e3 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
          if (this._cache.getStore(s2) === Ge.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
            const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          $e(He), this._cache.removeStore(n2);
        }
        throw new se({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return $e(Ve), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new se({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e2, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      let o2;
      if (-1 === Xe.indexOf(e2) && (this._cache.keys, i2.access_token = await this.oauth.getAccessToken()), "storage.uploadFile" === e2) {
        o2 = new FormData();
        for (let e3 in o2)
          o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e3 in i2)
          void 0 !== i2[e3] && (o2[e3] = i2[e3]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.timeout && (a2.timeout = n2.timeout), n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: h2, search: l2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
      let p2 = function(e3, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e4 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
      }(ye, "//tcb-api.tencentcloudapi.com/web", d2);
      l2 && (p2 += l2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new se({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e2, t2 = {}, n2 = {}) {
      const s2 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
      if (("ACCESS_TOKEN_DISABLED" === s2.data.code || "ACCESS_TOKEN_EXPIRED" === s2.data.code) && -1 === Xe.indexOf(e2)) {
        await this.oauth.refreshAccessToken();
        const s3 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
        if (s3.data.code)
          throw new se({ code: s3.data.code, message: Ae(s3.data.message) });
        return s3.data;
      }
      if (s2.data.code)
        throw new se({ code: s2.data.code, message: Ae(s2.data.message) });
      return s2.data;
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
  }
  const st = {};
  function rt(e2) {
    return st[e2];
  }
  class it {
    constructor(e2) {
      this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env);
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
    setAccessToken(e2, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2);
    }
  }
  class ot {
    constructor(e2) {
      if (!e2)
        throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e2, this._cache = Me(this._envId), this._request = rt(this._envId), this.setUserInfo();
    }
    linkWithTicket(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e2 });
    }
    linkWithRedirect(e2) {
      e2.signInWithRedirect();
    }
    updatePassword(e2, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
    }
    updateEmail(e2) {
      return this._request.send("auth.updateEmail", { newEmail: e2 });
    }
    updateUsername(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e2 });
    }
    async getLinkedUidList() {
      const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e2;
      return n2.forEach((e3) => {
        e3.wxOpenId && e3.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e2) {
      return this._request.send("auth.setPrimaryUid", { uid: e2 });
    }
    unlink(e2) {
      return this._request.send("auth.unlink", { platform: e2 });
    }
    async update(e2) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const e2 = await this._request.oauth.getUserInfo();
      return this.setLocalUserInfo(e2), e2;
    }
    setUserInfo() {
      const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
        this[e3] = t2[e3];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2), this.setUserInfo();
    }
  }
  class at {
    constructor(e2) {
      if (!e2)
        throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Me(e2);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new ot(e2);
    }
    get isAnonymousAuth() {
      return this.loginType === Ge.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === Ge.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === Ge.WECHAT || this.loginType === Ge.WECHAT_OPEN || this.loginType === Ge.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class ct extends it {
    async signIn() {
      this._cache.updatePersistence("local"), await this._request.oauth.getAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.ANONYMOUS, persistence: "local" });
      const e2 = new at(this.config.env);
      return await e2.user.refresh(), e2;
    }
    async linkAndRetrieveDataWithTicket(e2) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), $e(ze, { env: this.config.env }), $e(Je, { loginType: Ge.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new se({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e2) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, Ge.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class ut extends it {
    async signIn(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new at(this.config.env);
      throw new se({ message: "自定义登录失败" });
    }
  }
  class ht extends it {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.EMAIL, persistence: this.config.persistence }), new at(this.config.env);
      throw s2.code ? new se({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new se({ message: "邮箱登录失败" });
    }
    async activate(e2) {
      return this._request.send("auth.activateEndUserMail", { token: e2 });
    }
    async resetPasswordWithToken(e2, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
    }
  }
  class lt extends it {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: Ge.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.USERNAME, persistence: this.config.persistence }), new at(this.config.env);
      throw s2.code ? new se({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new se({ message: "用户名密码登录失败" });
    }
  }
  class dt {
    constructor(e2) {
      this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), je(Je, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e2 = this.hasLoginState();
      return e2 && e2.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new ct(this.config);
    }
    customAuthProvider() {
      return new ut(this.config);
    }
    emailAuthProvider() {
      return new ht(this.config);
    }
    usernameAuthProvider() {
      return new lt(this.config);
    }
    async signInAnonymously() {
      return new ct(this.config).signIn();
    }
    async signInWithEmailAndPassword(e2, t2) {
      return new ht(this.config).signIn(e2, t2);
    }
    signInWithUsernameAndPassword(e2, t2) {
      return new lt(this.config).signIn(e2, t2);
    }
    async linkAndRetrieveDataWithTicket(e2) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new ct(this.config)), je(ze, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
    }
    async signOut() {
      if (this.loginType === Ge.ANONYMOUS)
        throw new se({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), $e(We), $e(Je, { env: this.config.env, loginType: Ge.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e2, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
    }
    async sendPasswordResetEmail(e2) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
    }
    onLoginStateChanged(e2) {
      je(We, () => {
        const t3 = this.hasLoginState();
        e2.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    }
    onLoginStateExpired(e2) {
      je(He, e2.bind(this));
    }
    onAccessTokenRefreshed(e2) {
      je(Ve, e2.bind(this));
    }
    onAnonymousConverted(e2) {
      je(ze, e2.bind(this));
    }
    onLoginTypeChanged(e2) {
      je(Je, () => {
        const t2 = this.hasLoginState();
        e2.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
      return this._request.oauth.isAccessTokenExpired(n2, s2) ? null : new at(this.config.env);
    }
    async isUsernameRegistered(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e2) {
      return new ut(this.config).signIn(e2);
    }
    shouldRefreshAccessToken(e2) {
      this._request._shouldRefreshAccessTokenHook = e2.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e2) {
      const { env: t2 } = e2.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e2) {
      const { loginType: t2, persistence: n2, env: s2 } = e2.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const pt = function(e2, t2) {
    t2 = t2 || be();
    const n2 = rt(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
        201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new se({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
      }).catch((e4) => {
        t2(e4);
      });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ft = function(e2, t2) {
    t2 = t2 || be();
    const n2 = rt(this.config.env), { cloudPath: s2 } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      t2(null, e3);
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, gt = function({ fileList: e2 }, t2) {
    if (t2 = t2 || be(), !e2 || !Array.isArray(e2))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e2)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e2 };
    return rt(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, mt = function({ fileList: e2 }, t2) {
    t2 = t2 || be(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e2)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return rt(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, yt = async function({ fileID: e2 }, t2) {
    const n2 = (await mt.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e3) => {
        e3(n2);
      });
    const s2 = rt(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, _t = function({ name: e2, data: t2, query: n2, parse: s2, search: r2, timeout: i2 }, o2) {
    const a2 = o2 || be();
    let c2;
    try {
      c2 = t2 ? JSON.stringify(t2) : "";
    } catch (e3) {
      return Promise.reject(e3);
    }
    if (!e2)
      return Promise.reject(new se({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const u2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: c2 };
    return rt(this.config.env).send("functions.invokeFunction", u2, { timeout: i2 }).then((e3) => {
      if (e3.code)
        a2(null, e3);
      else {
        let t3 = e3.data.response_data;
        if (s2)
          a2(null, { result: t3, requestId: e3.requestId });
        else
          try {
            t3 = JSON.parse(e3.data.response_data), a2(null, { result: t3, requestId: e3.requestId });
          } catch (e4) {
            a2(new se({ message: "response data must be json" }));
          }
      }
      return a2.promise;
    }).catch((e3) => {
      a2(e3);
    }), a2.promise;
  }, wt = { timeout: 15e3, persistence: "session" }, vt = {};
  class It {
    constructor(e2) {
      this.config = e2 || this.config, this.authObj = void 0;
    }
    init(e2) {
      switch (Oe.adapter || (this.requestClient = new Oe.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...wt, ...e2 }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new It(this.config);
    }
    auth({ persistence: e2 } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e2 || Oe.adapter.primaryStorage || wt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
        const { env: t3 } = e3;
        Ne[t3] = new Ue(e3), De[t3] = new Ue({ ...e3, persistence: "local" });
      }(this.config), n2 = this.config, st[n2.env] = new nt(n2), this.authObj = new dt(this.config), this.authObj;
    }
    on(e2, t2) {
      return je.apply(this, [e2, t2]);
    }
    off(e2, t2) {
      return Be.apply(this, [e2, t2]);
    }
    callFunction(e2, t2) {
      return _t.apply(this, [e2, t2]);
    }
    deleteFile(e2, t2) {
      return gt.apply(this, [e2, t2]);
    }
    getTempFileURL(e2, t2) {
      return mt.apply(this, [e2, t2]);
    }
    downloadFile(e2, t2) {
      return yt.apply(this, [e2, t2]);
    }
    uploadFile(e2, t2) {
      return pt.apply(this, [e2, t2]);
    }
    getUploadMetadata(e2, t2) {
      return ft.apply(this, [e2, t2]);
    }
    registerExtension(e2) {
      vt[e2.name] = e2;
    }
    async invokeExtension(e2, t2) {
      const n2 = vt[e2];
      if (!n2)
        throw new se({ message: `扩展${e2} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e2) {
      const { adapter: t2, runtime: n2 } = xe(e2) || {};
      t2 && (Oe.adapter = t2), n2 && (Oe.runtime = n2);
    }
  }
  var St = new It();
  function bt(e2, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
  }
  class kt {
    get(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        re.request({ url: bt("https:", t2), data: n2, method: "GET", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    post(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        re.request({ url: bt("https:", t2), data: n2, method: "POST", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    upload(e2) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = re.uploadFile({ url: bt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
          const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
          200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e3) {
          n2(new Error(e3.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const Tt = { setItem(e2, t2) {
    re.setStorageSync(e2, t2);
  }, getItem: (e2) => re.getStorageSync(e2), removeItem(e2) {
    re.removeStorageSync(e2);
  }, clear() {
    re.clearStorageSync();
  } };
  var At = { genAdapter: function() {
    return { root: {}, reqClass: kt, localStorage: Tt, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  St.useAdapters(At);
  const Pt = St, Ct = Pt.init;
  Pt.init = function(e2) {
    e2.env = e2.spaceId;
    const t2 = Ct.call(this, e2);
    t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e3) {
      const t3 = n2.call(this, e3);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
        var n3;
        t3[e4] = (n3 = t3[e4], function(e5) {
          e5 = e5 || {};
          const { success: t4, fail: s2, complete: r2 } = ne(e5);
          if (!(t4 || s2 || r2))
            return n3.call(this, e5);
          n3.call(this, e5).then((e6) => {
            t4 && t4(e6), r2 && r2(e6);
          }, (e6) => {
            s2 && s2(e6), r2 && r2(e6);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var xt = Pt;
  async function Ot(e2, t2) {
    const n2 = `http://${e2}:${t2}/system/ping`;
    try {
      const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
        re.request({ ...s2, success(t4) {
          e4(t4);
        }, fail(e5) {
          t3(e5);
        } });
      }));
      return !(!e3.data || 0 !== e3.data.code);
    } catch (e3) {
      return false;
    }
    var s2;
  }
  async function Et(e2, t2) {
    let n2;
    for (let s2 = 0; s2 < e2.length; s2++) {
      const r2 = e2[s2];
      if (await Ot(r2, t2)) {
        n2 = r2;
        break;
      }
    }
    return { address: n2, port: t2 };
  }
  const Lt = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
  var Rt = class {
    constructor(e2) {
      if (["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), !e2.endpoint)
        throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
      this.config = Object.assign({}, e2), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = re;
    }
    async request(e2, t2 = true) {
      const n2 = t2;
      return e2 = n2 ? await this.setupLocalRequest(e2) : this.setupRequest(e2), Promise.resolve().then(() => n2 ? this.requestLocal(e2) : fe.wrappedRequest(e2, this.adapter.request));
    }
    requestLocal(e2) {
      return new Promise((t2, n2) => {
        this.adapter.request(Object.assign(e2, { complete(e3) {
          if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
            const t3 = e3.data && e3.data.code || "SYS_ERR", s2 = e3.data && e3.data.message || "request:fail";
            return n2(new se({ code: t3, message: s2 }));
          }
          t2({ success: true, result: e3.data });
        } }));
      });
    }
    setupRequest(e2) {
      const t2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
      n2["x-serverless-sign"] = fe.sign(t2, this.config.clientSecret);
      const s2 = pe();
      n2["x-client-info"] = encodeURIComponent(JSON.stringify(s2));
      const { token: r2 } = oe();
      return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t2, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
    }
    async setupLocalRequest(e2) {
      const t2 = pe(), { token: n2 } = oe(), s2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t2, token: n2 }), { address: r2, servePort: i2 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await Et(r2, i2);
      return { url: `http://${o2}:${i2}/${Lt[e2.method]}`, method: "POST", data: s2, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request(t2, false);
    }
    getUploadFileOptions(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    reportUploadFile(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new se({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getUploadFileOptions({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
          const c2 = this.adapter.uploadFile({ url: i2, formData: o2, name: a2, filePath: e2, fileType: n2, success(e3) {
            e3 && e3.statusCode < 400 ? t4(e3) : r3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
          }, fail(e3) {
            r3(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
          } });
          "function" == typeof s2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
            s2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
          });
        });
      }).then(() => this.reportUploadFile({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e2 }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
      return this.request(t2).then((e3) => {
        if (e3.success)
          return e3.result;
        throw new se({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
      return this.request(n2).then((e3) => {
        if (e3.success)
          return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
        throw new se({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var Ut = { init(e2) {
    const t2 = new Rt(e2), n2 = { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } }, Nt = n(function(e2, t2) {
    e2.exports = r.enc.Hex;
  });
  function Dt() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
      var t2 = 16 * Math.random() | 0;
      return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
    });
  }
  function Mt(e2 = "", t2 = {}) {
    const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = String(Date.now()), u2 = Dt(), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
      const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = Ie(e3.body).toString(Nt), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = Ie(r3).toString(Nt), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = Se(o3, e3.secretKey).toString(Nt);
      return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
    }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
    return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
  }
  function qt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {}, timeout: r2 }) {
    return new Promise((i2, o2) => {
      re.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", timeout: r2, complete: (e3 = {}) => {
        const t3 = s2["x-trace-id"] || "";
        if (!e3.statusCode || e3.statusCode >= 400) {
          const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
          return o2(new se({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
        }
        i2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
      } });
    });
  }
  function Kt(e2, t2) {
    const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Mt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
    return qt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
      const t3 = e3.data || {};
      if (!t3.success)
        throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
      return t3.data || {};
    }).catch((e3) => {
      throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    });
  }
  function Ft(e2 = "") {
    const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
    if (n2 <= 0)
      throw new se({ code: "INVALID_PARAM", message: "fileID不合法" });
    const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
    return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
  }
  function jt(e2 = "") {
    return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
  }
  class $t {
    constructor(e2) {
      this.config = e2;
    }
    signedURL(e2, t2 = {}) {
      const n2 = `/ws/function/${e2}`, s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Dt(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
        return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
      }).filter(Boolean).join("&"), `host:${s2}`].join("\n"), o2 = ["HMAC-SHA256", Ie(i2).toString(Nt)].join("\n"), a2 = Se(o2, this.config.secretKey).toString(Nt), c2 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
      return `${this.config.wsEndpoint}${n2}?${c2}&signature=${a2}`;
    }
  }
  var Bt = class {
    constructor(e2) {
      if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), e2.endpoint) {
        if ("string" != typeof e2.endpoint)
          throw new Error("endpoint must be string");
        if (!/^https:\/\//.test(e2.endpoint))
          throw new Error("endpoint must start with https://");
        e2.endpoint = e2.endpoint.replace(/\/$/, "");
      }
      this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e2.wsEndpoint || `wss://${e2.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new $t(this.config);
    }
    callFunction(e2) {
      return function(e3, t2) {
        const { name: n2, data: s2, async: r2 = false, timeout: i2 } = e3, o2 = "POST", a2 = { "x-to-function-name": n2 };
        r2 && (a2["x-function-invoke-type"] = "async");
        const { url: c2, headers: u2 } = Mt("/functions/invokeFunction", { functionName: n2, data: s2, method: o2, headers: a2, signHeaderKeys: ["x-to-function-name"], config: t2 });
        return qt({ url: c2, data: s2, method: o2, headers: u2, timeout: i2 }).then((e4) => {
          let t3 = 0;
          if (r2) {
            const n3 = e4.data || {};
            t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
          }
          if (0 !== t3)
            throw new se({ code: t3, message: e4.errMsg, requestId: e4.requestId });
          return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
        }).catch((e4) => {
          throw new se({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
        });
      }(e2, this.config);
    }
    uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
      return new Promise((i2, o2) => {
        const a2 = re.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
          e3 && e3.statusCode < 400 ? i2(e3) : o2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          o2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
          r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
      if ("string" !== f(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const r2 = await Kt({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
      return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
    }
    async getTempFileURL({ fileList: e2 }) {
      return new Promise((t2, n2) => {
        (!e2 || e2.length < 0) && t2({ code: "INVALID_PARAM", message: "fileList不能为空数组" }), e2.length > 50 && t2({ code: "INVALID_PARAM", message: "fileList数组长度不能超过50" });
        const s2 = [];
        for (const n3 of e2) {
          let e3;
          "string" !== f(n3) && t2({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
          try {
            e3 = Ft.call(this, n3);
          } catch (t3) {
            console.warn(t3.errCode, t3.errMsg), e3 = n3;
          }
          s2.push({ file_id: e3, expire: 600 });
        }
        Kt({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
          const { file_list: n3 = [] } = e3;
          t2({ fileList: n3.map((e4) => ({ fileID: jt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
        }).catch((e3) => n2(e3));
      });
    }
    async connectWebSocket(e2) {
      const { name: t2, query: n2 } = e2;
      return re.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
      } });
    }
  };
  var Wt = { init: (e2) => {
    e2.provider = "alipay";
    const t2 = new Bt(e2);
    return t2.auth = function() {
      return { signInAnonymously: function() {
        return Promise.resolve();
      }, getLoginState: function() {
        return Promise.resolve(true);
      } };
    }, t2;
  } };
  function Ht({ data: e2 }) {
    let t2;
    t2 = pe();
    const n2 = JSON.parse(JSON.stringify(e2 || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e3 } = oe();
      e3 && (n2.uniIdToken = e3);
    }
    return n2;
  }
  async function Jt(e2 = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: t2, localPort: n2 } = this.__dev__, s2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${t2}:${n2}/system/check-function`, o2 = `http://${t2}:${n2}/cloudfunctions/${e2.name}`;
    return new Promise((t3, n3) => {
      re.request({ method: "POST", url: i2, data: { name: e2.name, platform: A, provider: s2, spaceId: r2 }, timeout: 3e3, success(e3) {
        t3(e3);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e3 } = {}) => {
      const { code: t3, message: n3 } = e3 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: t3, message: n3 }) => {
      if (0 !== t3) {
        switch (t3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e2.name}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e2.name}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(n3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR":
            console.error(n3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
            break;
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e3 = `检测本地调试服务出现错误：${n3}，请检查网络环境或重启客户端再试`;
            throw console.error(e3), new Error(e3);
          }
        }
        return this._callCloudFunction(e2);
      }
      return new Promise((t4, n4) => {
        const r3 = Ht.call(this, { data: e2.data });
        re.request({ method: "POST", url: o2, data: { provider: s2, platform: A, param: r3 }, timeout: e2.timeout, success: ({ statusCode: e3, data: s3 } = {}) => !e3 || e3 >= 400 ? n4(new se({ code: s3.code || "SYS_ERR", message: s3.message || "request:fail" })) : t4({ result: s3 }), fail(e3) {
          n4(new se({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const zt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var Vt = /[\\^$.*+?()[\]{}|]/g, Gt = RegExp(Vt.source);
  function Yt(e2, t2, n2) {
    return e2.replace(new RegExp((s2 = t2) && Gt.test(s2) ? s2.replace(Vt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Xt = "request", Zt = "response", en$1 = "both";
  const Mn = { code: 2e4, message: "System error" }, qn = { code: 20101, message: "Invalid client" };
  function jn(e2) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
    return new se({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || Mn.code, message: r2 || o2, cause: a2 });
  }
  let Bn;
  function Vn({ secretType: e2 } = {}) {
    return e2 === Xt || e2 === Zt || e2 === en$1;
  }
  function Gn({ name: e2, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function Yn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = he();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e3, spaceId: t3 } = {}) {
      const n3 = T;
      if (!n3)
        return {};
      e3 = /* @__PURE__ */ function(e4) {
        return "tencent" === e4 ? "tcb" : e4;
      }(e3);
      const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e2, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const h2 = function(e3, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e3.length; i3++) {
        const o3 = e3[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!h2)
      return false;
    if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), jn(qn);
  }
  function Qn({ functionName: e2, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Xn(e2) {
    const t2 = e2.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Ht.call(e2, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i2 = Vn(n3), o2 = Gn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e5 = 1; e5 < a3.length; e5++)
            c2 = Yt(c2, `{$${e5}}`, a3[e5]);
          for (const e5 in t3)
            c2 = Yt(c2, `{${e5}}`, t3[e5]);
          return "replace" === o3 ? c2 : e4 + c2;
        }
        return e4;
      }({ message: `[${n3.name}]: ${e3.message}`, formatter: zt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
    };
    e2.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && C ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Jt), o2 = Jt) : o2 = n2, o2 = o2.bind(e2), Gn(t3))
        a2 = n2.call(e2, t3);
      else if (Vn(t3)) {
        a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
      } else if (Yn({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && "undefined" != typeof UTS && (e3.result = UTS.JSON.parse(JSON.stringify(e3.result))), e3));
    };
  }
  Bn = class {
    constructor() {
      throw jn({ message: `Platform ${A} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const Zn = Symbol("CLIENT_DB_INTERNAL");
  function es(e2, t2) {
    return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Zn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e3[n2];
      if (n2 in e3 || "string" != typeof n2) {
        const t3 = e3[n2];
        return "function" == typeof t3 ? t3.bind(e3) : t3;
      }
      return t2.get(e3, n2, s2);
    } });
  }
  function ts(e2) {
    return { on: (t2, n2) => {
      e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
    }, off: (t2, n2) => {
      e2[t2] = e2[t2] || [];
      const s2 = e2[t2].indexOf(n2);
      -1 !== s2 && e2[t2].splice(s2, 1);
    } };
  }
  const ns = ["db.Geo", "db.command", "command.aggregate"];
  function ss(e2, t2) {
    return ns.indexOf(`${e2}.${t2}`) > -1;
  }
  function rs(e2) {
    switch (f(e2 = ie(e2))) {
      case "array":
        return e2.map((e3) => rs(e3));
      case "object":
        return e2._internalType === Zn || Object.keys(e2).forEach((t2) => {
          e2[t2] = rs(e2[t2]);
        }), e2;
      case "regexp":
        return { $regexp: { source: e2.source, flags: e2.flags } };
      case "date":
        return { $date: e2.toISOString() };
      default:
        return e2;
    }
  }
  function is(e2) {
    return e2 && e2.content && e2.content.$method;
  }
  class os {
    constructor(e2, t2, n2) {
      this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e2 = this;
      const t2 = [e2.content];
      for (; e2.prevStage; )
        e2 = e2.prevStage, t2.push(e2.content);
      return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: rs(e3.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
      return e2 && e2.$param && e2.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
    }
    get isAggregate() {
      let e2 = this;
      for (; e2; ) {
        const t2 = is(e2), n2 = is(e2.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e2 = this;
      for (; e2; ) {
        if ("command" === is(e2))
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e2 = this;
      for (; e2; ) {
        const t2 = is(e2), n2 = is(e2.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    getNextStageFn(e2) {
      const t2 = this;
      return function() {
        return as({ $method: e2, $param: rs(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e2, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e2, $param: rs(t2) }), S) {
        const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
        t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function as(e2, t2, n2) {
    return es(new os(e2, t2, n2), { get(e3, t3) {
      let s2 = "db";
      return e3 && e3.content && (s2 = e3.content.$method), ss(s2, t3) ? as({ $method: t3 }, e3, n2) : function() {
        return as({ $method: t3, $param: rs(Array.from(arguments)) }, e3, n2);
      };
    } });
  }
  function cs({ path: e2, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  function us(e2, t2 = {}) {
    return es(new e2(t2), { get: (e3, t3) => ss("db", t3) ? as({ $method: t3 }, null, e3) : function() {
      return as({ $method: t3, $param: rs(Array.from(arguments)) }, null, e3);
    } });
  }
  class hs extends class {
    constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = R("_globalUniCloudDatabaseCallback")), t2 || (this.auth = ts(this._authCallBacks)), this._isJQL = t2, Object.assign(this, ts(this._dbCallBacks)), this.env = es({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = es({}, { get: (e3, t3) => cs({ path: ["Geo"], method: t3 }) }), this.serverDate = cs({ path: [], method: "serverDate" }), this.RegExp = cs({ path: [], method: "RegExp" });
    }
    getCloudEnv(e2) {
      if ("string" != typeof e2 || !e2.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e2.replace("$cloudEnv_", "") };
    }
    _callback(e2, t2) {
      const n2 = this._dbCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    _callbackAuth(e2, t2) {
      const n2 = this._authCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    multiSend() {
      const e2 = Array.from(arguments), t2 = e2.map((e3) => {
        const t3 = e3.getAction(), n2 = e3.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
    }
  } {
    _parseResult(e2) {
      return this._isJQL ? e2.result : e2;
    }
    _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e3, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e3) {
        return i2._callback("error", [e3]), K(F(o2, "fail"), e3).then(() => K(F(o2, "complete"), e3)).then(() => (r2(null, e3), X(B, { type: J, content: e3 }), Promise.reject(e3)));
      }
      const c2 = K(F(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
        if (u3)
          for (let e4 = 0; e4 < u3.length; e4++) {
            const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new se({ code: t3, message: n3, requestId: e3.requestId }));
        }
        e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ae({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), X(H, { token: s3, tokenExpired: c3 }));
        const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < h2.length; t4++) {
          const { prop: n4, tips: s4 } = h2[t4];
          if (n4 in e3.result) {
            const t5 = e3.result[n4];
            Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e4) {
          return K(F(o2, "success"), e4).then(() => K(F(o2, "complete"), e4)).then(() => {
            r2(e4, null);
            const t4 = i2._parseResult(e4);
            return X(B, { type: J, content: t4 }), Promise.resolve(t4);
          });
        }(e3);
      }, (e3) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new se({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
      });
    }
  }
  const ls = "token无效，跳转登录页面", ds = "token过期，跳转登录页面", ps = { TOKEN_INVALID_TOKEN_EXPIRED: ds, TOKEN_INVALID_INVALID_CLIENTID: ls, TOKEN_INVALID: ls, TOKEN_INVALID_WRONG_TOKEN: ls, TOKEN_INVALID_ANONYMOUS_USER: ls }, fs = { "uni-id-token-expired": ds, "uni-id-check-token-failed": ls, "uni-id-token-not-exist": ls, "uni-id-check-device-feature-failed": ls };
  function gs(e2, t2) {
    let n2 = "";
    return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function ms(e2 = [], t2 = "") {
    const n2 = [], s2 = [];
    return e2.forEach((e3) => {
      true === e3.needLogin ? n2.push(gs(t2, e3.path)) : false === e3.needLogin && s2.push(gs(t2, e3.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function ys(e2) {
    return e2.split("?")[0].replace(/^\//, "");
  }
  function _s() {
    return function(e2) {
      let t2 = e2 && e2.$page && e2.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e2 = getCurrentPages();
      return e2[e2.length - 1];
    }());
  }
  function ws() {
    return ys(_s());
  }
  function vs(e2 = "", t2 = {}) {
    if (!e2)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = ys(e2);
    return n2.some((e3) => e3.pagePath === s2);
  }
  const Is = !!e.uniIdRouter;
  const { loginPage: Ss, routerNeedLogin: bs, resToLogin: ks, needLoginPage: Ts, notNeedLoginPage: As, loginPageInTabBar: Ps } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = ms(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
      const t3 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = ms(r3, s3);
        t3.push(...i3), n3.push(...o3);
      }), { needLoginPage: t3, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: vs(i2, r2) };
  }();
  if (Ts.indexOf(Ss) > -1)
    throw new Error(`Login page [${Ss}] should not be "needLogin", please check your pages.json`);
  function Cs(e2) {
    const t2 = ws();
    if ("/" === e2.charAt(0))
      return e2;
    const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e3 = 0; e3 < r2.length; e3++) {
      const t3 = r2[e3];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function xs(e2) {
    const t2 = ys(Cs(e2));
    return !(As.indexOf(t2) > -1) && (Ts.indexOf(t2) > -1 || bs.some((t3) => function(e3, t4) {
      return new RegExp(t4).test(e3);
    }(e2, t3)));
  }
  function Os({ redirect: e2 }) {
    const t2 = ys(e2), n2 = ys(Ss);
    return ws() !== n2 && t2 !== n2;
  }
  function Es({ api: e2, redirect: t2 } = {}) {
    if (!t2 || !Os({ redirect: t2 }))
      return;
    const n2 = function(e3, t3) {
      return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
    }(Ss, t2);
    Ps ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e2]({ url: n2 });
    }, 0);
  }
  function Ls({ url: e2 } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e3, tokenExpired: t3 } = oe();
      let n3;
      if (e3) {
        if (t3 < Date.now()) {
          const e4 = "uni-id-token-expired";
          n3 = { errCode: e4, errMsg: fs[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        n3 = { errCode: e4, errMsg: fs[e4] };
      }
      return n3;
    }();
    if (xs(e2) && n2) {
      n2.uniIdRedirectUrl = e2;
      if (G(W).length > 0)
        return setTimeout(() => {
          X(W, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function Rs() {
    !function() {
      const e3 = _s(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = Ls({ url: e3 });
      t2 || n2 && Es({ api: "redirectTo", redirect: e3 });
    }();
    const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e2.length; t2++) {
      const n2 = e2[t2];
      uni.addInterceptor(n2, { invoke(e3) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = Ls({ url: e3.url });
        return t3 ? e3 : s2 ? (Es({ api: n2, redirect: Cs(e3.url) }), false) : e3;
      } });
    }
  }
  function Us() {
    this.onResponse((e2) => {
      const { type: t2, content: n2 } = e2;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in fs;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in ps;
          }(n2);
      }
      s2 && function(e3 = {}) {
        const t3 = G(W);
        te().then(() => {
          const n3 = _s();
          if (n3 && Os({ redirect: n3 }))
            return t3.length > 0 ? X(W, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (Ss && Es({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function Ns(e2) {
    !function(e3) {
      e3.onResponse = function(e4) {
        Y(B, e4);
      }, e3.offResponse = function(e4) {
        Q(B, e4);
      };
    }(e2), function(e3) {
      e3.onNeedLogin = function(e4) {
        Y(W, e4);
      }, e3.offNeedLogin = function(e4) {
        Q(W, e4);
      }, Is && (R("_globalUniCloudStatus").needLoginInit || (R("_globalUniCloudStatus").needLoginInit = true, te().then(() => {
        Rs.call(e3);
      }), ks && Us.call(e3)));
    }(e2), function(e3) {
      e3.onRefreshToken = function(e4) {
        Y(H, e4);
      }, e3.offRefreshToken = function(e4) {
        Q(H, e4);
      };
    }(e2);
  }
  let Ds;
  const Ms = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", qs = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function Ks() {
    const e2 = oe().token || "", t2 = e2.split(".");
    if (!e2 || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Ds(s2).split("").map(function(e3) {
        return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e3) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  Ds = "function" != typeof atob ? function(e2) {
    if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !qs.test(e2))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e2 += "==".slice(2 - (3 & e2.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
      t2 = Ms.indexOf(e2.charAt(i2++)) << 18 | Ms.indexOf(e2.charAt(i2++)) << 12 | (n2 = Ms.indexOf(e2.charAt(i2++))) << 6 | (s2 = Ms.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var Fs = n(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e3, t3) {
      return e3.tempFiles.forEach((e4, n3) => {
        e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
      }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
    }
    function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e4) => {
        if (s3) {
          const t4 = s3(e4);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
        }
        return e4;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
            const u2 = i3[s5];
            e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
              e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
            } }).then((e5) => {
              u2.url = e5.fileID, s5 < o2 && c2();
            }).catch((e5) => {
              u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
            });
          }
        });
      }(e3, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e3) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e3, function(e4) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
          return new Promise((e5, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e5(r2(t5, "image"));
            }, fail(e6) {
              a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
          return new Promise((e5, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e6) {
              c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e3, function(e4) {
          const { count: t4, extension: n3 } = e4;
          return new Promise((e5, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e5(r2(t5));
            }, fail(e6) {
              i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), js = t$1(Fs);
  const $s = "manual";
  function Bs(e2) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e3 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e3.push(this[t2]);
        }), e3;
      }, (e3, t2) => {
        if (this.loadtime === $s)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e3.length; r2++)
          e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
        e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e3, t2) {
    }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e4) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2;
      t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const h2 = t2.orderby || this.orderby;
      h2 && (n2 = n2.orderBy(h2));
      const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function Ws(e2) {
    return function(t2, n2 = {}) {
      n2 = function(e3, t3 = {}) {
        return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get(s3, c2) {
        switch (c2) {
          case "toString":
            return "[object UniCloudObject]";
          case "toJSON":
            return {};
        }
        return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
          return async function(...s4) {
            const r3 = n3 ? n3({ params: s4 }) : {};
            let i3, o3;
            try {
              return await K(F(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await K(F(t3, "success"), { ...r3, result: i3 }), i3;
            } catch (e4) {
              throw o3 = e4, await K(F(t3, "fail"), { ...r3, error: o3 }), o3;
            } finally {
              await K(F(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
            }
          };
        }({ fn: async function s4(...h2) {
          let l2;
          a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
          const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
          "object" == typeof n2.secretMethods && function(e3, t3) {
            const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
            r3 && (t3.secretType = r3);
          }(n2, d2);
          let p2 = false;
          try {
            l2 = await e2.callFunction(d2);
          } catch (e3) {
            p2 = true, l2 = { result: new se(e3) };
          }
          const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
          if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ae(y2), X(H, { ...y2 })), g2) {
            let e3 = m2;
            if (p2 && o2) {
              e3 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
            }
            if (a2)
              if ("toast" === i2.type)
                uni.showToast({ title: e3, icon: "none" });
              else {
                if ("modal" !== i2.type)
                  throw new Error(`Invalid errorOptions.type: ${i2.type}`);
                {
                  const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                    return new Promise((i3, o3) => {
                      uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                        i3(e5);
                      }, fail() {
                        i3({ confirm: false, cancel: true });
                      } });
                    });
                  }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                  if (i2.retry && t3)
                    return s4(...h2);
                }
              }
            const n3 = new se({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
            throw n3.detail = l2.result, X(B, { type: V, content: n3 }), n3;
          }
          return X(B, { type: V, content: l2.result }), l2.result;
        }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
          return { objectName: t2, methodName: c2, params: e3 };
        } });
      } });
    };
  }
  function Hs(e2) {
    return R("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
  }
  async function Js({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
    Hs(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${A}\``);
  }
  async function zs(e2) {
    const t2 = Hs(this);
    return t2.initPromise || (t2.initPromise = Js.call(this, e2).then((e3) => e3).catch((e3) => {
      throw delete t2.initPromise, e3;
    })), t2.initPromise;
  }
  function Vs(e2) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return zs.call(e2, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Gs(e2) {
    !function(e3) {
      de = e3;
    }(e2);
  }
  function Ys(e2) {
    const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(n2) {
      return new Promise((s2, r2) => {
        t2[e2]({ ...n2, success(e3) {
          s2(e3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    };
  }
  class Qs extends class {
    constructor() {
      this._callback = {};
    }
    addListener(e2, t2) {
      this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
    }
    on(e2, t2) {
      return this.addListener(e2, t2);
    }
    removeListener(e2, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e2];
      if (!n2)
        return;
      const s2 = function(e3, t3) {
        for (let n3 = e3.length - 1; n3 >= 0; n3--)
          if (e3[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e2, t2) {
      return this.removeListener(e2, t2);
    }
    removeAllListener(e2) {
      delete this._callback[e2];
    }
    emit(e2, ...t2) {
      const n2 = this._callback[e2];
      if (n2)
        for (let e3 = 0; e3 < n2.length; e3++)
          n2[e3](...t2);
    }
  } {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Ys("getSystemInfo")(), Ys("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
        if (!e2)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e2) => {
        throw this.emit("error", e2), this.close(), e2;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e2) {
      if ("receive" !== e2.type)
        return false;
      const t2 = e2 && e2.data && e2.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e2) {
      if (!this._isUniCloudSSE(e2))
        return;
      const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
        if (!e2)
          break;
        this._currentMessageId++, this._parseMessagePayload(e2);
      }
    }
    _parseMessagePayload(e2) {
      const { action: t2, messageId: n2, message: s2 } = e2;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e2, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e2, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function Xs(e2) {
    {
      const { osName: e3, osVersion: t3 } = he();
      "ios" === e3 && function(e4) {
        if (!e4 || "string" != typeof e4)
          return 0;
        const t4 = e4.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）");
    }
    const t2 = e2.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await Et(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === A.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function Zs(e2) {
    e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e3) => {
        setTimeout(() => {
          e3();
        }, n2);
      });
      const s2 = e2.auth();
      return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const er = { tcb: xt, tencent: xt, aliyun: me, private: Ut, dcloud: Ut, alipay: Wt };
  let tr = new class {
    init(e2) {
      let t2 = {};
      const n2 = er[e2.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e2), function(e3) {
        const t3 = {};
        e3.__dev__ = t3, t3.debugLog = "app" === A;
        const n3 = P;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new v({ createPromise: function() {
          return Xs(e3);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), Zs(t2), Xn(t2), function(e3) {
        const t3 = e3.uploadFile;
        e3.uploadFile = function(e4) {
          return t3.call(this, e4);
        };
      }(t2), function(e3) {
        e3.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = us(hs, { uniClient: e3 });
          return this._database = n3, n3;
        }, e3.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = us(hs, { uniClient: e3, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e3) {
        e3.getCurrentUserInfo = Ks, e3.chooseAndUploadFile = js.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
          return Bs(e3);
        } }), e3.SSEChannel = Qs, e3.initSecureNetworkByWeixin = Vs(e3), e3.setCustomClientInfo = Gs, e3.importObject = Ws(e3);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
        if (!t2[e3])
          return;
        const n3 = t2[e3];
        t2[e3] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e5 = n4 && n4.type || c;
              s2 = e5 !== c;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: u2 } = ne(n4), h2 = i2.then(() => s2 ? Promise.resolve() : K(F(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : K(F(t3, "success"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (r2 && X(B, { type: z, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : K(F(t3, "fail"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (X(B, { type: z, content: e5 }), Promise.reject(e5))));
            if (!(o2 || a2 || u2))
              return h2;
            h2.then((e5) => {
              o2 && o2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
            }, (e5) => {
              a2 && a2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
            });
          };
        }(t2[e3], e3)).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e2 = C;
    let t2 = {};
    if (e2 && 1 === e2.length)
      t2 = e2[0], tr = tr.init(t2), tr._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
        tr[e3] = function() {
          return console.error(n2), Promise.reject(new se({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    if (Object.assign(tr, { get mixinDatacom() {
      return Bs(tr);
    } }), Ns(tr), tr.addInterceptor = M, tr.removeInterceptor = q, tr.interceptObject = j, uni.__uniCloud = tr, "app" === A) {
      const e3 = U();
      e3.uniCloud = tr, e3.UniCloudError = se;
    }
  })();
  var nr = tr;
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$u = {
    name: "loading1",
    data() {
      return {};
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading1" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading1 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-0e645258"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/uni_modules/qiun-data-charts/components/qiun-loading/loading1.vue"]]);
  const _sfc_main$t = {
    name: "loading2",
    data() {
      return {};
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading2" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading2 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-3df48dc2"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/uni_modules/qiun-data-charts/components/qiun-loading/loading2.vue"]]);
  const _sfc_main$s = {
    name: "loading3",
    data() {
      return {};
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading3" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading3 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-27a8293c"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/uni_modules/qiun-data-charts/components/qiun-loading/loading3.vue"]]);
  const _sfc_main$r = {
    name: "loading5",
    data() {
      return {};
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading5" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading4 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-2e7deb83"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/uni_modules/qiun-data-charts/components/qiun-loading/loading4.vue"]]);
  const _sfc_main$q = {
    name: "loading6",
    data() {
      return {};
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container loading6" }, [
      vue.createElementVNode("view", { class: "shape shape1" }),
      vue.createElementVNode("view", { class: "shape shape2" }),
      vue.createElementVNode("view", { class: "shape shape3" }),
      vue.createElementVNode("view", { class: "shape shape4" })
    ]);
  }
  const Loading5 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-ef674bbb"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/uni_modules/qiun-data-charts/components/qiun-loading/loading5.vue"]]);
  const _sfc_main$p = {
    components: { Loading1, Loading2, Loading3, Loading4, Loading5 },
    name: "qiun-loading",
    props: {
      loadingType: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {};
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Loading1 = vue.resolveComponent("Loading1");
    const _component_Loading2 = vue.resolveComponent("Loading2");
    const _component_Loading3 = vue.resolveComponent("Loading3");
    const _component_Loading4 = vue.resolveComponent("Loading4");
    const _component_Loading5 = vue.resolveComponent("Loading5");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      $props.loadingType == 1 ? (vue.openBlock(), vue.createBlock(_component_Loading1, { key: 0 })) : vue.createCommentVNode("v-if", true),
      $props.loadingType == 2 ? (vue.openBlock(), vue.createBlock(_component_Loading2, { key: 1 })) : vue.createCommentVNode("v-if", true),
      $props.loadingType == 3 ? (vue.openBlock(), vue.createBlock(_component_Loading3, { key: 2 })) : vue.createCommentVNode("v-if", true),
      $props.loadingType == 4 ? (vue.openBlock(), vue.createBlock(_component_Loading4, { key: 3 })) : vue.createCommentVNode("v-if", true),
      $props.loadingType == 5 ? (vue.openBlock(), vue.createBlock(_component_Loading5, { key: 4 })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/uni_modules/qiun-data-charts/components/qiun-loading/qiun-loading.vue"]]);
  const _sfc_main$o = {
    name: "qiun-error",
    props: {
      errorMessage: {
        type: String,
        default: null
      }
    },
    data() {
      return {};
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "chartsview" }, [
      vue.createElementVNode("view", { class: "charts-error" }),
      vue.createElementVNode(
        "view",
        { class: "charts-font" },
        vue.toDisplayString($props.errorMessage == null ? "请点击重试" : $props.errorMessage),
        1
        /* TEXT */
      )
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-a99d579b"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/uni_modules/qiun-data-charts/components/qiun-error/qiun-error.vue"]]);
  const color$1 = ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"];
  const formatDateTime = (timeStamp, returnType) => {
    var date = /* @__PURE__ */ new Date();
    date.setTime(timeStamp * 1e3);
    var y2 = date.getFullYear();
    var m2 = date.getMonth() + 1;
    m2 = m2 < 10 ? "0" + m2 : m2;
    var d2 = date.getDate();
    d2 = d2 < 10 ? "0" + d2 : d2;
    var h2 = date.getHours();
    h2 = h2 < 10 ? "0" + h2 : h2;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    if (returnType == "full") {
      return y2 + "-" + m2 + "-" + d2 + " " + h2 + ":" + minute + ":" + second;
    }
    if (returnType == "y-m-d") {
      return y2 + "-" + m2 + "-" + d2;
    }
    if (returnType == "h:m") {
      return h2 + ":" + minute;
    }
    if (returnType == "h:m:s") {
      return h2 + ":" + minute + ":" + second;
    }
    return [y2, m2, d2, h2, minute, second];
  };
  const cfu = {
    //demotype为自定义图表类型，一般不需要自定义图表类型，只需要改根节点上对应的类型即可
    "type": ["pie", "ring", "rose", "word", "funnel", "map", "arcbar", "line", "column", "mount", "bar", "area", "radar", "gauge", "candle", "mix", "tline", "tarea", "scatter", "bubble", "demotype"],
    "range": ["饼状图", "圆环图", "玫瑰图", "词云图", "漏斗图", "地图", "圆弧进度条", "折线图", "柱状图", "山峰图", "条状图", "区域图", "雷达图", "仪表盘", "K线图", "混合图", "时间轴折线", "时间轴区域", "散点图", "气泡图", "自定义类型"],
    //增加自定义图表类型，如果需要categories，请在这里加入您的图表类型，例如最后的"demotype"
    //自定义类型时需要注意"tline","tarea","scatter","bubble"等时间轴（矢量x轴）类图表，没有categories，不需要加入categories
    "categories": ["line", "column", "mount", "bar", "area", "radar", "gauge", "candle", "mix", "demotype"],
    //instance为实例变量承载属性，不要删除
    "instance": {},
    //option为opts及eopts承载属性，不要删除
    "option": {},
    //下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
    "formatter": {
      "yAxisDemo1": function(val, index, opts) {
        return val + "元";
      },
      "yAxisDemo2": function(val, index, opts) {
        return val.toFixed(2);
      },
      "xAxisDemo1": function(val, index, opts) {
        return val + "年";
      },
      "xAxisDemo2": function(val, index, opts) {
        return formatDateTime(val, "h:m");
      },
      "seriesDemo1": function(val, index, series, opts) {
        return val + "元";
      },
      "tooltipDemo1": function(item, category, index, opts) {
        if (index == 0) {
          return "随便用" + item.data + "年";
        } else {
          return "其他我没改" + item.data + "天";
        }
      },
      "pieDemo": function(val, index, series, opts) {
        if (index !== void 0) {
          return series[index].name + "：" + series[index].data + "元";
        }
      }
    },
    //这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在opts参数，会将demotype与opts中option合并后渲染图表。
    "demotype": {
      //我这里把曲线图当做了自定义图表类型，您可以根据需要随意指定类型或配置
      "type": "line",
      "color": color$1,
      "padding": [15, 10, 0, 15],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2
      },
      "legend": {},
      "extra": {
        "line": {
          "type": "curve",
          "width": 2
        }
      }
    },
    //下面是自定义配置，请添加项目所需的通用配置
    "pie": {
      "type": "pie",
      "color": color$1,
      "padding": [5, 5, 5, 5],
      "extra": {
        "pie": {
          "activeOpacity": 0.5,
          "activeRadius": 10,
          "offsetAngle": 0,
          "labelWidth": 15,
          "border": true,
          "borderWidth": 3,
          "borderColor": "#FFFFFF"
        }
      }
    },
    "ring": {
      "type": "ring",
      "color": color$1,
      "padding": [5, 5, 5, 5],
      "rotate": false,
      "dataLabel": true,
      "legend": {
        "show": true,
        "position": "right",
        "lineHeight": 25
      },
      "title": {
        "name": "收益率",
        "fontSize": 15,
        "color": "#666666"
      },
      "subtitle": {
        "name": "70%",
        "fontSize": 25,
        "color": "#7cb5ec"
      },
      "extra": {
        "ring": {
          "ringWidth": 30,
          "activeOpacity": 0.5,
          "activeRadius": 10,
          "offsetAngle": 0,
          "labelWidth": 15,
          "border": true,
          "borderWidth": 3,
          "borderColor": "#FFFFFF"
        }
      }
    },
    "rose": {
      "type": "rose",
      "color": color$1,
      "padding": [5, 5, 5, 5],
      "legend": {
        "show": true,
        "position": "left",
        "lineHeight": 25
      },
      "extra": {
        "rose": {
          "type": "area",
          "minRadius": 50,
          "activeOpacity": 0.5,
          "activeRadius": 10,
          "offsetAngle": 0,
          "labelWidth": 15,
          "border": false,
          "borderWidth": 2,
          "borderColor": "#FFFFFF"
        }
      }
    },
    "word": {
      "type": "word",
      "color": color$1,
      "extra": {
        "word": {
          "type": "normal",
          "autoColors": false
        }
      }
    },
    "funnel": {
      "type": "funnel",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "extra": {
        "funnel": {
          "activeOpacity": 0.3,
          "activeWidth": 10,
          "border": true,
          "borderWidth": 2,
          "borderColor": "#FFFFFF",
          "fillOpacity": 1,
          "labelAlign": "right"
        }
      }
    },
    "map": {
      "type": "map",
      "color": color$1,
      "padding": [0, 0, 0, 0],
      "dataLabel": true,
      "extra": {
        "map": {
          "border": true,
          "borderWidth": 1,
          "borderColor": "#666666",
          "fillOpacity": 0.6,
          "activeBorderColor": "#F04864",
          "activeFillColor": "#FACC14",
          "activeFillOpacity": 1
        }
      }
    },
    "arcbar": {
      "type": "arcbar",
      "color": color$1,
      "title": {
        "name": "百分比",
        "fontSize": 25,
        "color": "#00FF00"
      },
      "subtitle": {
        "name": "默认标题",
        "fontSize": 15,
        "color": "#666666"
      },
      "extra": {
        "arcbar": {
          "type": "default",
          "width": 12,
          "backgroundColor": "#E9E9E9",
          "startAngle": 0.75,
          "endAngle": 0.25,
          "gap": 2
        }
      }
    },
    "line": {
      "type": "line",
      "color": color$1,
      "padding": [15, 10, 0, 15],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2
      },
      "legend": {},
      "extra": {
        "line": {
          "type": "straight",
          "width": 2,
          "activeType": "hollow"
        }
      }
    },
    "tline": {
      "type": "line",
      "color": color$1,
      "padding": [15, 10, 0, 15],
      "xAxis": {
        "disableGrid": false,
        "boundaryGap": "justify"
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2,
        "data": [
          {
            "min": 0,
            "max": 80
          }
        ]
      },
      "legend": {},
      "extra": {
        "line": {
          "type": "curve",
          "width": 2,
          "activeType": "hollow"
        }
      }
    },
    "tarea": {
      "type": "area",
      "color": color$1,
      "padding": [15, 10, 0, 15],
      "xAxis": {
        "disableGrid": true,
        "boundaryGap": "justify"
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2,
        "data": [
          {
            "min": 0,
            "max": 80
          }
        ]
      },
      "legend": {},
      "extra": {
        "area": {
          "type": "curve",
          "opacity": 0.2,
          "addLine": true,
          "width": 2,
          "gradient": true,
          "activeType": "hollow"
        }
      }
    },
    "column": {
      "type": "column",
      "color": color$1,
      "padding": [15, 15, 0, 5],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "data": [{ "min": 0 }]
      },
      "legend": {},
      "extra": {
        "column": {
          "type": "group",
          "width": 30,
          "activeBgColor": "#000000",
          "activeBgOpacity": 0.08
        }
      }
    },
    "mount": {
      "type": "mount",
      "color": color$1,
      "padding": [15, 15, 0, 5],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "data": [{ "min": 0 }]
      },
      "legend": {},
      "extra": {
        "mount": {
          "type": "mount",
          "widthRatio": 1.5
        }
      }
    },
    "bar": {
      "type": "bar",
      "color": color$1,
      "padding": [15, 30, 0, 5],
      "xAxis": {
        "boundaryGap": "justify",
        "disableGrid": false,
        "min": 0,
        "axisLine": false
      },
      "yAxis": {},
      "legend": {},
      "extra": {
        "bar": {
          "type": "group",
          "width": 30,
          "meterBorde": 1,
          "meterFillColor": "#FFFFFF",
          "activeBgColor": "#000000",
          "activeBgOpacity": 0.08
        }
      }
    },
    "area": {
      "type": "area",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "gridType": "dash",
        "dashLength": 2
      },
      "legend": {},
      "extra": {
        "area": {
          "type": "straight",
          "opacity": 0.2,
          "addLine": true,
          "width": 2,
          "gradient": false,
          "activeType": "hollow"
        }
      }
    },
    "radar": {
      "type": "radar",
      "color": color$1,
      "padding": [5, 5, 5, 5],
      "dataLabel": false,
      "legend": {
        "show": true,
        "position": "right",
        "lineHeight": 25
      },
      "extra": {
        "radar": {
          "gridType": "radar",
          "gridColor": "#CCCCCC",
          "gridCount": 3,
          "opacity": 0.2,
          "max": 200,
          "labelShow": true
        }
      }
    },
    "gauge": {
      "type": "gauge",
      "color": color$1,
      "title": {
        "name": "66Km/H",
        "fontSize": 25,
        "color": "#2fc25b",
        "offsetY": 50
      },
      "subtitle": {
        "name": "实时速度",
        "fontSize": 15,
        "color": "#1890ff",
        "offsetY": -50
      },
      "extra": {
        "gauge": {
          "type": "default",
          "width": 30,
          "labelColor": "#666666",
          "startAngle": 0.75,
          "endAngle": 0.25,
          "startNumber": 0,
          "endNumber": 100,
          "labelFormat": "",
          "splitLine": {
            "fixRadius": 0,
            "splitNumber": 10,
            "width": 30,
            "color": "#FFFFFF",
            "childNumber": 5,
            "childWidth": 12
          },
          "pointer": {
            "width": 24,
            "color": "auto"
          }
        }
      }
    },
    "candle": {
      "type": "candle",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "enableScroll": true,
      "enableMarkLine": true,
      "dataLabel": false,
      "xAxis": {
        "labelCount": 4,
        "itemCount": 40,
        "disableGrid": true,
        "gridColor": "#CCCCCC",
        "gridType": "solid",
        "dashLength": 4,
        "scrollShow": true,
        "scrollAlign": "left",
        "scrollColor": "#A6A6A6",
        "scrollBackgroundColor": "#EFEBEF"
      },
      "yAxis": {},
      "legend": {},
      "extra": {
        "candle": {
          "color": {
            "upLine": "#f04864",
            "upFill": "#f04864",
            "downLine": "#2fc25b",
            "downFill": "#2fc25b"
          },
          "average": {
            "show": true,
            "name": ["MA5", "MA10", "MA30"],
            "day": [5, 10, 20],
            "color": ["#1890ff", "#2fc25b", "#facc14"]
          }
        },
        "markLine": {
          "type": "dash",
          "dashLength": 5,
          "data": [
            {
              "value": 2150,
              "lineColor": "#f04864",
              "showLabel": true
            },
            {
              "value": 2350,
              "lineColor": "#f04864",
              "showLabel": true
            }
          ]
        }
      }
    },
    "mix": {
      "type": "mix",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "xAxis": {
        "disableGrid": true
      },
      "yAxis": {
        "disabled": false,
        "disableGrid": false,
        "splitNumber": 5,
        "gridType": "dash",
        "dashLength": 4,
        "gridColor": "#CCCCCC",
        "padding": 10,
        "showTitle": true,
        "data": []
      },
      "legend": {},
      "extra": {
        "mix": {
          "column": {
            "width": 20
          }
        }
      }
    },
    "scatter": {
      "type": "scatter",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "dataLabel": false,
      "xAxis": {
        "disableGrid": false,
        "gridType": "dash",
        "splitNumber": 5,
        "boundaryGap": "justify",
        "min": 0
      },
      "yAxis": {
        "disableGrid": false,
        "gridType": "dash"
      },
      "legend": {},
      "extra": {
        "scatter": {}
      }
    },
    "bubble": {
      "type": "bubble",
      "color": color$1,
      "padding": [15, 15, 0, 15],
      "xAxis": {
        "disableGrid": false,
        "gridType": "dash",
        "splitNumber": 5,
        "boundaryGap": "justify",
        "min": 0,
        "max": 250
      },
      "yAxis": {
        "disableGrid": false,
        "gridType": "dash",
        "data": [{
          "min": 0,
          "max": 150
        }]
      },
      "legend": {},
      "extra": {
        "bubble": {
          "border": 2,
          "opacity": 0.5
        }
      }
    }
  };
  const color = ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"];
  const cfe = {
    //demotype为自定义图表类型
    "type": ["pie", "ring", "rose", "funnel", "line", "column", "area", "radar", "gauge", "candle", "demotype"],
    //增加自定义图表类型，如果需要categories，请在这里加入您的图表类型例如最后的"demotype"
    "categories": ["line", "column", "area", "radar", "gauge", "candle", "demotype"],
    //instance为实例变量承载属性，option为eopts承载属性，不要删除
    "instance": {},
    "option": {},
    //下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
    "formatter": {
      "tooltipDemo1": function(res) {
        let result = "";
        for (let i2 in res) {
          if (i2 == 0) {
            result += res[i2].axisValueLabel + "年销售额";
          }
          let value = "--";
          if (res[i2].data !== null) {
            value = res[i2].data;
          }
          result += "<br/>" + res[i2].marker + res[i2].seriesName + "：" + value + " 万元";
        }
        return result;
      },
      legendFormat: function(name) {
        return "自定义图例+" + name;
      },
      yAxisFormatDemo: function(value, index) {
        return value + "元";
      },
      seriesFormatDemo: function(res) {
        return res.name + "年" + res.value + "元";
      }
    },
    //这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在eopts参数，会将demotype与eopts中option合并后渲染图表。
    "demotype": {
      "color": color
      //在这里填写echarts的option即可
    },
    //下面是自定义配置，请添加项目所需的通用配置
    "column": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "axis"
      },
      "grid": {
        "top": 30,
        "bottom": 50,
        "right": 15,
        "left": 40
      },
      "legend": {
        "bottom": "left"
      },
      "toolbox": {
        "show": false
      },
      "xAxis": {
        "type": "category",
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        },
        "boundaryGap": true,
        "data": []
      },
      "yAxis": {
        "type": "value",
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        }
      },
      "seriesTemplate": {
        "name": "",
        "type": "bar",
        "data": [],
        "barwidth": 20,
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        }
      }
    },
    "line": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "axis"
      },
      "grid": {
        "top": 30,
        "bottom": 50,
        "right": 15,
        "left": 40
      },
      "legend": {
        "bottom": "left"
      },
      "toolbox": {
        "show": false
      },
      "xAxis": {
        "type": "category",
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        },
        "boundaryGap": true,
        "data": []
      },
      "yAxis": {
        "type": "value",
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        }
      },
      "seriesTemplate": {
        "name": "",
        "type": "line",
        "data": [],
        "barwidth": 20,
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        }
      }
    },
    "area": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "axis"
      },
      "grid": {
        "top": 30,
        "bottom": 50,
        "right": 15,
        "left": 40
      },
      "legend": {
        "bottom": "left"
      },
      "toolbox": {
        "show": false
      },
      "xAxis": {
        "type": "category",
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        },
        "boundaryGap": true,
        "data": []
      },
      "yAxis": {
        "type": "value",
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "color": "#666666"
        },
        "axisLine": {
          "lineStyle": {
            "color": "#CCCCCC"
          }
        }
      },
      "seriesTemplate": {
        "name": "",
        "type": "line",
        "data": [],
        "areaStyle": {},
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        }
      }
    },
    "pie": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "item"
      },
      "grid": {
        "top": 40,
        "bottom": 30,
        "right": 15,
        "left": 15
      },
      "legend": {
        "bottom": "left"
      },
      "seriesTemplate": {
        "name": "",
        "type": "pie",
        "data": [],
        "radius": "50%",
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        }
      }
    },
    "ring": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "item"
      },
      "grid": {
        "top": 40,
        "bottom": 30,
        "right": 15,
        "left": 15
      },
      "legend": {
        "bottom": "left"
      },
      "seriesTemplate": {
        "name": "",
        "type": "pie",
        "data": [],
        "radius": ["40%", "70%"],
        "avoidLabelOverlap": false,
        "label": {
          "show": true,
          "color": "#666666",
          "position": "top"
        },
        "labelLine": {
          "show": true
        }
      }
    },
    "rose": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "item"
      },
      "legend": {
        "top": "bottom"
      },
      "seriesTemplate": {
        "name": "",
        "type": "pie",
        "data": [],
        "radius": "55%",
        "center": ["50%", "50%"],
        "roseType": "area"
      }
    },
    "funnel": {
      "color": color,
      "title": {
        "text": ""
      },
      "tooltip": {
        "trigger": "item",
        "formatter": "{b} : {c}%"
      },
      "legend": {
        "top": "bottom"
      },
      "seriesTemplate": {
        "name": "",
        "type": "funnel",
        "left": "10%",
        "top": 60,
        "bottom": 60,
        "width": "80%",
        "min": 0,
        "max": 100,
        "minSize": "0%",
        "maxSize": "100%",
        "sort": "descending",
        "gap": 2,
        "label": {
          "show": true,
          "position": "inside"
        },
        "labelLine": {
          "length": 10,
          "lineStyle": {
            "width": 1,
            "type": "solid"
          }
        },
        "itemStyle": {
          "bordercolor": "#fff",
          "borderwidth": 1
        },
        "emphasis": {
          "label": {
            "fontSize": 20
          }
        },
        "data": []
      }
    },
    "gauge": {
      "color": color,
      "tooltip": {
        "formatter": "{a} <br/>{b} : {c}%"
      },
      "seriesTemplate": {
        "name": "业务指标",
        "type": "gauge",
        "detail": { "formatter": "{value}%" },
        "data": [{ "value": 50, "name": "完成率" }]
      }
    },
    "candle": {
      "xAxis": {
        "data": []
      },
      "yAxis": {},
      "color": color,
      "title": {
        "text": ""
      },
      "dataZoom": [
        {
          "type": "inside",
          "xAxisIndex": [0, 1],
          "start": 10,
          "end": 100
        },
        {
          "show": true,
          "xAxisIndex": [0, 1],
          "type": "slider",
          "bottom": 10,
          "start": 10,
          "end": 100
        }
      ],
      "seriesTemplate": {
        "name": "",
        "type": "k",
        "data": []
      }
    }
  };
  const block0 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("rdcharts");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["rdcharts"] = "f9cb76fc";
  };
  function deepCloneAssign(origin = {}, ...args) {
    for (let i2 in args) {
      for (let key in args[i2]) {
        if (args[i2].hasOwnProperty(key)) {
          origin[key] = args[i2][key] && typeof args[i2][key] === "object" ? deepCloneAssign(Array.isArray(args[i2][key]) ? [] : {}, origin[key], args[i2][key]) : args[i2][key];
        }
      }
    }
    return origin;
  }
  function formatterAssign(args, formatter) {
    for (let key in args) {
      if (args.hasOwnProperty(key) && args[key] !== null && typeof args[key] === "object") {
        formatterAssign(args[key], formatter);
      } else if (key === "format" && typeof args[key] === "string") {
        args["formatter"] = formatter[args[key]] ? formatter[args[key]] : void 0;
      }
    }
    return args;
  }
  function getFormatDate(date) {
    var seperator = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator + month + seperator + strDate;
    return currentdate;
  }
  const _sfc_main$n = {
    name: "qiun-data-charts",
    mixins: [nr.mixinDatacom],
    props: {
      type: {
        type: String,
        default: null
      },
      canvasId: {
        type: String,
        default: "uchartsid"
      },
      canvas2d: {
        type: Boolean,
        default: false
      },
      background: {
        type: String,
        default: "rgba(0,0,0,0)"
      },
      animation: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        default() {
          return {
            categories: [],
            series: []
          };
        }
      },
      opts: {
        type: Object,
        default() {
          return {};
        }
      },
      eopts: {
        type: Object,
        default() {
          return {};
        }
      },
      loadingType: {
        type: Number,
        default: 2
      },
      errorShow: {
        type: Boolean,
        default: true
      },
      errorReload: {
        type: Boolean,
        default: true
      },
      errorMessage: {
        type: String,
        default: null
      },
      inScrollView: {
        type: Boolean,
        default: false
      },
      reshow: {
        type: Boolean,
        default: false
      },
      reload: {
        type: Boolean,
        default: false
      },
      disableScroll: {
        type: Boolean,
        default: false
      },
      optsWatch: {
        type: Boolean,
        default: true
      },
      onzoom: {
        type: Boolean,
        default: false
      },
      ontap: {
        type: Boolean,
        default: true
      },
      ontouch: {
        type: Boolean,
        default: false
      },
      onmouse: {
        type: Boolean,
        default: true
      },
      onmovetip: {
        type: Boolean,
        default: false
      },
      echartsH5: {
        type: Boolean,
        default: false
      },
      echartsApp: {
        type: Boolean,
        default: false
      },
      tooltipShow: {
        type: Boolean,
        default: true
      },
      tooltipFormat: {
        type: String,
        default: void 0
      },
      tooltipCustom: {
        type: Object,
        default: void 0
      },
      startDate: {
        type: String,
        default: void 0
      },
      endDate: {
        type: String,
        default: void 0
      },
      textEnum: {
        type: Array,
        default() {
          return [];
        }
      },
      groupEnum: {
        type: Array,
        default() {
          return [];
        }
      },
      pageScrollTop: {
        type: Number,
        default: 0
      },
      directory: {
        type: String,
        default: "/"
      },
      tapLegend: {
        type: Boolean,
        default: true
      },
      menus: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        cid: "uchartsid",
        inWx: false,
        inAli: false,
        inTt: false,
        inBd: false,
        inH5: false,
        inApp: false,
        inWin: false,
        type2d: true,
        disScroll: false,
        openmouse: false,
        pixel: 1,
        cWidth: 375,
        cHeight: 250,
        showchart: false,
        echarts: false,
        echartsResize: {
          state: false
        },
        uchartsOpts: {},
        echartsOpts: {},
        drawData: {},
        lastDrawTime: null
      };
    },
    created() {
      this.cid = this.canvasId;
      if (this.canvasId == "uchartsid" || this.canvasId == "") {
        let t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let len = t2.length;
        let id = "";
        for (let i2 = 0; i2 < 32; i2++) {
          id += t2.charAt(Math.floor(Math.random() * len));
        }
        this.cid = id;
      }
      const systemInfo = uni.getSystemInfoSync();
      if (systemInfo.platform === "windows" || systemInfo.platform === "mac") {
        this.inWin = true;
      }
      this.type2d = false;
      this.disScroll = this.disableScroll;
    },
    mounted() {
      this.inApp = true;
      if (this.echartsApp === true) {
        this.echarts = true;
        this.openmouse = false;
      }
      this.$nextTick(() => {
        this.beforeInit();
      });
    },
    destroyed() {
      if (this.echarts === true) {
        delete cfe.option[this.cid];
        delete cfe.instance[this.cid];
      } else {
        delete cfu.option[this.cid];
        delete cfu.instance[this.cid];
      }
      uni.offWindowResize(() => {
      });
    },
    watch: {
      chartDataProps: {
        handler(val, oldval) {
          if (typeof val === "object") {
            if (JSON.stringify(val) !== JSON.stringify(oldval)) {
              this._clearChart();
              if (val.series && val.series.length > 0) {
                this.beforeInit();
              } else {
                this.mixinDatacomLoading = true;
                this.showchart = false;
                this.mixinDatacomErrorMessage = null;
              }
            }
          } else {
            this.mixinDatacomLoading = false;
            this._clearChart();
            this.showchart = false;
            this.mixinDatacomErrorMessage = "参数错误：chartData数据类型错误";
          }
        },
        immediate: false,
        deep: true
      },
      localdata: {
        handler(val, oldval) {
          if (JSON.stringify(val) !== JSON.stringify(oldval)) {
            if (val.length > 0) {
              this.beforeInit();
            } else {
              this.mixinDatacomLoading = true;
              this._clearChart();
              this.showchart = false;
              this.mixinDatacomErrorMessage = null;
            }
          }
        },
        immediate: false,
        deep: true
      },
      optsProps: {
        handler(val, oldval) {
          if (typeof val === "object") {
            if (JSON.stringify(val) !== JSON.stringify(oldval) && this.echarts === false && this.optsWatch == true) {
              this.checkData(this.drawData);
            }
          } else {
            this.mixinDatacomLoading = false;
            this._clearChart();
            this.showchart = false;
            this.mixinDatacomErrorMessage = "参数错误：opts数据类型错误";
          }
        },
        immediate: false,
        deep: true
      },
      eoptsProps: {
        handler(val, oldval) {
          if (typeof val === "object") {
            if (JSON.stringify(val) !== JSON.stringify(oldval) && this.echarts === true) {
              this.checkData(this.drawData);
            }
          } else {
            this.mixinDatacomLoading = false;
            this.showchart = false;
            this.mixinDatacomErrorMessage = "参数错误：eopts数据类型错误";
          }
        },
        immediate: false,
        deep: true
      },
      reshow(val, oldval) {
        if (val === true && this.mixinDatacomLoading === false) {
          setTimeout(() => {
            this.mixinDatacomErrorMessage = null;
            this.echartsResize.state = !this.echartsResize.state;
            this.checkData(this.drawData);
          }, 200);
        }
      },
      reload(val, oldval) {
        if (val === true) {
          this.showchart = false;
          this.mixinDatacomErrorMessage = null;
          this.reloading();
        }
      },
      mixinDatacomErrorMessage(val, oldval) {
        if (val) {
          this.emitMsg({ name: "error", params: { type: "error", errorShow: this.errorShow, msg: val, id: this.cid } });
          if (this.errorShow) {
            formatAppLog("log", "at uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue:611", "[秋云图表组件]" + val);
          }
        }
      },
      errorMessage(val, oldval) {
        if (val && this.errorShow && val !== null && val !== "null" && val !== "") {
          this.showchart = false;
          this.mixinDatacomLoading = false;
          this.mixinDatacomErrorMessage = val;
        } else {
          this.showchart = false;
          this.mixinDatacomErrorMessage = null;
          this.reloading();
        }
      }
    },
    computed: {
      optsProps() {
        return JSON.parse(JSON.stringify(this.opts));
      },
      eoptsProps() {
        return JSON.parse(JSON.stringify(this.eopts));
      },
      chartDataProps() {
        return JSON.parse(JSON.stringify(this.chartData));
      }
    },
    methods: {
      beforeInit() {
        this.mixinDatacomErrorMessage = null;
        if (typeof this.chartData === "object" && this.chartData != null && this.chartData.series !== void 0 && this.chartData.series.length > 0) {
          this.drawData = deepCloneAssign({}, this.chartData);
          this.mixinDatacomLoading = false;
          this.showchart = true;
          this.checkData(this.chartData);
        } else if (this.localdata.length > 0) {
          this.mixinDatacomLoading = false;
          this.showchart = true;
          this.localdataInit(this.localdata);
        } else if (this.collection !== "") {
          this.mixinDatacomLoading = false;
          this.getCloudData();
        } else {
          this.mixinDatacomLoading = true;
        }
      },
      localdataInit(resdata) {
        if (this.groupEnum.length > 0) {
          for (let i2 = 0; i2 < resdata.length; i2++) {
            for (let j2 = 0; j2 < this.groupEnum.length; j2++) {
              if (resdata[i2].group === this.groupEnum[j2].value) {
                resdata[i2].group = this.groupEnum[j2].text;
              }
            }
          }
        }
        if (this.textEnum.length > 0) {
          for (let i2 = 0; i2 < resdata.length; i2++) {
            for (let j2 = 0; j2 < this.textEnum.length; j2++) {
              if (resdata[i2].text === this.textEnum[j2].value) {
                resdata[i2].text = this.textEnum[j2].text;
              }
            }
          }
        }
        let needCategories = false;
        let tmpData = { categories: [], series: [] };
        let tmpcategories = [];
        let tmpseries = [];
        if (this.echarts === true) {
          needCategories = cfe.categories.includes(this.type);
        } else {
          needCategories = cfu.categories.includes(this.type);
        }
        if (needCategories === true) {
          if (this.chartData && this.chartData.categories && this.chartData.categories.length > 0) {
            tmpcategories = this.chartData.categories;
          } else {
            if (this.startDate && this.endDate) {
              let idate = new Date(this.startDate);
              let edate = new Date(this.endDate);
              while (idate <= edate) {
                tmpcategories.push(getFormatDate(idate));
                idate = idate.setDate(idate.getDate() + 1);
                idate = new Date(idate);
              }
            } else {
              let tempckey = {};
              resdata.map(function(item, index) {
                if (item.text != void 0 && !tempckey[item.text]) {
                  tmpcategories.push(item.text);
                  tempckey[item.text] = true;
                }
              });
            }
          }
          tmpData.categories = tmpcategories;
        }
        let tempskey = {};
        resdata.map(function(item, index) {
          if (item.group != void 0 && !tempskey[item.group]) {
            tmpseries.push({ name: item.group, data: [] });
            tempskey[item.group] = true;
          }
        });
        if (tmpseries.length == 0) {
          tmpseries = [{ name: "默认分组", data: [] }];
          if (needCategories === true) {
            for (let j2 = 0; j2 < tmpcategories.length; j2++) {
              let seriesdata = 0;
              for (let i2 = 0; i2 < resdata.length; i2++) {
                if (resdata[i2].text == tmpcategories[j2]) {
                  seriesdata = resdata[i2].value;
                }
              }
              tmpseries[0].data.push(seriesdata);
            }
          } else {
            for (let i2 = 0; i2 < resdata.length; i2++) {
              tmpseries[0].data.push({ "name": resdata[i2].text, "value": resdata[i2].value });
            }
          }
        } else {
          for (let k = 0; k < tmpseries.length; k++) {
            if (tmpcategories.length > 0) {
              for (let j2 = 0; j2 < tmpcategories.length; j2++) {
                let seriesdata = 0;
                for (let i2 = 0; i2 < resdata.length; i2++) {
                  if (tmpseries[k].name == resdata[i2].group && resdata[i2].text == tmpcategories[j2]) {
                    seriesdata = resdata[i2].value;
                  }
                }
                tmpseries[k].data.push(seriesdata);
              }
            } else {
              for (let i2 = 0; i2 < resdata.length; i2++) {
                if (tmpseries[k].name == resdata[i2].group) {
                  tmpseries[k].data.push(resdata[i2].value);
                }
              }
            }
          }
        }
        tmpData.series = tmpseries;
        this.drawData = deepCloneAssign({}, tmpData);
        this.checkData(tmpData);
      },
      reloading() {
        if (this.errorReload === false) {
          return;
        }
        this.showchart = false;
        this.mixinDatacomErrorMessage = null;
        if (this.collection !== "") {
          this.mixinDatacomLoading = false;
          this.onMixinDatacomPropsChange(true);
        } else {
          this.beforeInit();
        }
      },
      checkData(anyData) {
        let cid = this.cid;
        if (this.echarts === true) {
          cfe.option[cid] = deepCloneAssign({}, this.eopts);
          cfe.option[cid].id = cid;
          cfe.option[cid].type = this.type;
        } else {
          if (this.type && cfu.type.includes(this.type)) {
            cfu.option[cid] = deepCloneAssign({}, cfu[this.type], this.opts);
            cfu.option[cid].canvasId = cid;
          } else {
            this.mixinDatacomLoading = false;
            this.showchart = false;
            this.mixinDatacomErrorMessage = "参数错误：props参数中type类型不正确";
          }
        }
        let newData = deepCloneAssign({}, anyData);
        if (newData.series !== void 0 && newData.series.length > 0) {
          this.mixinDatacomErrorMessage = null;
          if (this.echarts === true) {
            cfe.option[cid].chartData = newData;
            this.$nextTick(() => {
              this.init();
            });
          } else {
            cfu.option[cid].categories = newData.categories;
            cfu.option[cid].series = newData.series;
            this.$nextTick(() => {
              this.init();
            });
          }
        }
      },
      resizeHandler() {
        let currTime = Date.now();
        let lastDrawTime = this.lastDrawTime ? this.lastDrawTime : currTime - 3e3;
        let duration = currTime - lastDrawTime;
        if (duration < 1e3)
          return;
        uni.createSelectorQuery().in(this).select("#ChartBoxId" + this.cid).boundingClientRect((data) => {
          this.showchart = true;
          if (data.width > 0 && data.height > 0) {
            if (data.width !== this.cWidth || data.height !== this.cHeight) {
              this.checkData(this.drawData);
            }
          }
        }).exec();
      },
      getCloudData() {
        if (this.mixinDatacomLoading == true) {
          return;
        }
        this.mixinDatacomLoading = true;
        this.mixinDatacomGet().then((res) => {
          this.mixinDatacomResData = res.result.data;
          this.localdataInit(this.mixinDatacomResData);
        }).catch((err) => {
          this.mixinDatacomLoading = false;
          this.showchart = false;
          this.mixinDatacomErrorMessage = "请求错误：" + err;
        });
      },
      onMixinDatacomPropsChange(needReset, changed) {
        if (needReset == true && this.collection !== "") {
          this.showchart = false;
          this.mixinDatacomErrorMessage = null;
          this._clearChart();
          this.getCloudData();
        }
      },
      _clearChart() {
        let cid = this.cid;
        if (this.echarts !== true && cfu.option[cid] && cfu.option[cid].context) {
          const ctx = cfu.option[cid].context;
          if (typeof ctx === "object" && !!!cfu.option[cid].update) {
            ctx.clearRect(0, 0, this.cWidth * this.pixel, this.cHeight * this.pixel);
            ctx.draw();
          }
        }
      },
      init() {
        let cid = this.cid;
        uni.createSelectorQuery().in(this).select("#ChartBoxId" + cid).boundingClientRect((data) => {
          if (data.width > 0 && data.height > 0) {
            this.mixinDatacomLoading = false;
            this.showchart = true;
            this.lastDrawTime = Date.now();
            this.cWidth = data.width;
            this.cHeight = data.height;
            if (this.echarts !== true) {
              cfu.option[cid].background = this.background == "rgba(0,0,0,0)" ? "#FFFFFF" : this.background;
              cfu.option[cid].canvas2d = this.type2d;
              cfu.option[cid].pixelRatio = this.pixel;
              cfu.option[cid].animation = this.animation;
              cfu.option[cid].width = data.width * this.pixel;
              cfu.option[cid].height = data.height * this.pixel;
              cfu.option[cid].onzoom = this.onzoom;
              cfu.option[cid].ontap = this.ontap;
              cfu.option[cid].ontouch = this.ontouch;
              cfu.option[cid].onmouse = this.openmouse;
              cfu.option[cid].onmovetip = this.onmovetip;
              cfu.option[cid].tooltipShow = this.tooltipShow;
              cfu.option[cid].tooltipFormat = this.tooltipFormat;
              cfu.option[cid].tooltipCustom = this.tooltipCustom;
              cfu.option[cid].inScrollView = this.inScrollView;
              cfu.option[cid].lastDrawTime = this.lastDrawTime;
              cfu.option[cid].tapLegend = this.tapLegend;
            }
            if (this.inH5 || this.inApp) {
              if (this.echarts == true) {
                cfe.option[cid].ontap = this.ontap;
                cfe.option[cid].onmouse = this.openmouse;
                cfe.option[cid].tooltipShow = this.tooltipShow;
                cfe.option[cid].tooltipFormat = this.tooltipFormat;
                cfe.option[cid].tooltipCustom = this.tooltipCustom;
                cfe.option[cid].lastDrawTime = this.lastDrawTime;
                this.echartsOpts = deepCloneAssign({}, cfe.option[cid]);
              } else {
                cfu.option[cid].rotateLock = cfu.option[cid].rotate;
                this.uchartsOpts = deepCloneAssign({}, cfu.option[cid]);
              }
            } else {
              cfu.option[cid] = formatterAssign(cfu.option[cid], cfu.formatter);
              this.mixinDatacomErrorMessage = null;
              this.mixinDatacomLoading = false;
              this.showchart = true;
              this.$nextTick(() => {
                if (this.type2d === true) {
                  const query = uni.createSelectorQuery().in(this);
                  query.select("#" + cid).fields({ node: true, size: true }).exec((res) => {
                    if (res[0]) {
                      const canvas = res[0].node;
                      const ctx = canvas.getContext("2d");
                      cfu.option[cid].context = ctx;
                      cfu.option[cid].rotateLock = cfu.option[cid].rotate;
                      if (cfu.instance[cid] && cfu.option[cid] && cfu.option[cid].update === true) {
                        this._updataUChart(cid);
                      } else {
                        canvas.width = data.width * this.pixel;
                        canvas.height = data.height * this.pixel;
                        canvas._width = data.width * this.pixel;
                        canvas._height = data.height * this.pixel;
                        setTimeout(() => {
                          cfu.option[cid].context.restore();
                          cfu.option[cid].context.save();
                          this._newChart(cid);
                        }, 100);
                      }
                    } else {
                      this.showchart = false;
                      this.mixinDatacomErrorMessage = "参数错误：开启2d模式后，未获取到dom节点，canvas-id:" + cid;
                    }
                  });
                } else {
                  if (this.inAli) {
                    cfu.option[cid].rotateLock = cfu.option[cid].rotate;
                  }
                  cfu.option[cid].context = uni.createCanvasContext(cid, this);
                  if (cfu.instance[cid] && cfu.option[cid] && cfu.option[cid].update === true) {
                    this._updataUChart(cid);
                  } else {
                    setTimeout(() => {
                      cfu.option[cid].context.restore();
                      cfu.option[cid].context.save();
                      this._newChart(cid);
                    }, 100);
                  }
                }
              });
            }
          } else {
            this.mixinDatacomLoading = false;
            this.showchart = false;
            if (this.reshow == true) {
              this.mixinDatacomErrorMessage = "布局错误：未获取到父元素宽高尺寸！canvas-id:" + cid;
            }
          }
        }).exec();
      },
      saveImage() {
        uni.canvasToTempFilePath({
          canvasId: this.cid,
          success: (res) => {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                uni.showToast({
                  title: "保存成功",
                  duration: 2e3
                });
              }
            });
          }
        }, this);
      },
      getImage() {
        if (this.type2d == false) {
          uni.canvasToTempFilePath({
            canvasId: this.cid,
            success: (res) => {
              this.emitMsg({ name: "getImage", params: { type: "getImage", base64: res.tempFilePath } });
            }
          }, this);
        } else {
          const query = uni.createSelectorQuery().in(this);
          query.select("#" + this.cid).fields({ node: true, size: true }).exec((res) => {
            if (res[0]) {
              const canvas = res[0].node;
              this.emitMsg({ name: "getImage", params: { type: "getImage", base64: canvas.toDataURL("image/png") } });
            }
          });
        }
      },
      _error(e2) {
        this.mixinDatacomErrorMessage = e2.detail.errMsg;
      },
      emitMsg(msg) {
        this.$emit(msg.name, msg.params);
      },
      getRenderType() {
        if (this.echarts === true && this.mixinDatacomLoading === false) {
          this.beforeInit();
        }
      },
      toJSON() {
        return this;
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_qiun_loading = resolveEasycom(vue.resolveDynamicComponent("qiun-loading"), __easycom_0$1);
    const _component_qiun_error = resolveEasycom(vue.resolveDynamicComponent("qiun-error"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "chartsview",
      id: "ChartBoxId" + $data.cid
    }, [
      _ctx.mixinDatacomLoading ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        vue.createCommentVNode(" 自定义加载状态，请改这里 "),
        vue.createVNode(_component_qiun_loading, { loadingType: $props.loadingType }, null, 8, ["loadingType"])
      ])) : vue.createCommentVNode("v-if", true),
      _ctx.mixinDatacomErrorMessage && $props.errorShow ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.reloading && $options.reloading(...args))
      }, [
        vue.createCommentVNode(" 自定义错误提示，请改这里 "),
        vue.createVNode(_component_qiun_error, { errorMessage: $props.errorMessage }, null, 8, ["errorMessage"])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" APP和H5采用renderjs渲染图表 "),
      $data.echarts ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        style: vue.normalizeStyle([{ background: $props.background }, { "width": "100%", "height": "100%" }]),
        "data-directory": $props.directory,
        id: "EC" + $data.cid,
        prop: vue.wp($data.echartsOpts),
        "change:prop": _ctx.rdcharts.ecinit,
        resize: vue.wp($data.echartsResize),
        "change:resize": _ctx.rdcharts.ecresize
      }, null, 12, ["data-directory", "id", "prop", "change:prop", "resize", "change:resize"])), [
        [vue.vShow, $data.showchart]
      ]) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.rdcharts.tap && _ctx.rdcharts.tap(...args)),
        onMousemove: _cache[3] || (_cache[3] = (...args) => _ctx.rdcharts.mouseMove && _ctx.rdcharts.mouseMove(...args)),
        onMousedown: _cache[4] || (_cache[4] = (...args) => _ctx.rdcharts.mouseDown && _ctx.rdcharts.mouseDown(...args)),
        onMouseup: _cache[5] || (_cache[5] = (...args) => _ctx.rdcharts.mouseUp && _ctx.rdcharts.mouseUp(...args)),
        onTouchstart: _cache[6] || (_cache[6] = (...args) => _ctx.rdcharts.touchStart && _ctx.rdcharts.touchStart(...args)),
        onTouchmove: _cache[7] || (_cache[7] = (...args) => _ctx.rdcharts.touchMove && _ctx.rdcharts.touchMove(...args)),
        onTouchend: _cache[8] || (_cache[8] = (...args) => _ctx.rdcharts.touchEnd && _ctx.rdcharts.touchEnd(...args)),
        id: "UC" + $data.cid,
        prop: vue.wp($data.uchartsOpts),
        "change:prop": _ctx.rdcharts.ucinit
      }, [
        vue.withDirectives(vue.createElementVNode("canvas", {
          id: $data.cid,
          canvasId: $data.cid,
          style: vue.normalizeStyle({ width: $data.cWidth + "px", height: $data.cHeight + "px", background: $props.background }),
          "disable-scroll": $props.disableScroll,
          onError: _cache[1] || (_cache[1] = (...args) => $options._error && $options._error(...args))
        }, null, 44, ["id", "canvasId", "disable-scroll"]), [
          [vue.vShow, $data.showchart]
        ])
      ], 40, ["id", "prop", "change:prop"])),
      vue.createCommentVNode(" 支付宝小程序 "),
      vue.createCommentVNode(" 其他小程序通过vue渲染图表 ")
    ], 8, ["id"]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$n);
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-0ca34aee"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue"]]);
  const _sfc_main$m = {
    __name: "chart",
    setup(__props, { expose: __expose }) {
      __expose();
      const chartData = vue.ref({
        categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
        series: [
          {
            name: "销售额",
            data: [35, 20, 25, 37, 4, 20]
          }
        ]
      });
      const chartOptions = vue.ref({
        padding: [15, 15, 0, 15],
        extra: {
          line: {
            type: "curve",
            // 平滑曲线
            width: 4
          }
        },
        legend: {
          show: true,
          position: "top"
        },
        xAxis: {
          disableGrid: false,
          itemCount: 4
        },
        yAxis: {
          gridType: "dash",
          dashLength: 4
        }
      });
      const __returned__ = { chartData, chartOptions, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_qiun_data_charts = resolveEasycom(vue.resolveDynamicComponent("qiun-data-charts"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "charts-box" }, [
      vue.createVNode(_component_qiun_data_charts, {
        type: "line",
        chartData: $setup.chartData,
        opts: $setup.chartOptions,
        canvasId: "lineChart",
        canvas2d: ""
      }, null, 8, ["chartData", "opts"])
    ]);
  }
  const PagesChartChart = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-6801e029"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/chart/chart.vue"]]);
  const saveTokenToLocalStorage = (token) => {
    uni.setStorage({
      key: "token",
      data: token,
      success: () => {
        formatAppLog("log", "at store/user.js:7", "Token 存储成功");
      },
      fail: (err) => {
        formatAppLog("error", "at store/user.js:10", "Token 存储失败:", err);
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
          formatAppLog("error", "at store/user.js:23", "Token 获取失败:", err);
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
        formatAppLog("log", "at store/user.js:35", "user存储成功");
      },
      fail: (err) => {
        formatAppLog("error", "at store/user.js:39", "user存储失败:", err);
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
          formatAppLog("error", "at store/user.js:52", "user获取失败:", err);
          reject(err);
        }
      });
    });
  };
  const saveDevice = (device) => {
    uni.setStorage({
      key: "device",
      data: device,
      success: () => {
        formatAppLog("log", "at store/user.js:63", "device存储成功");
      },
      fail: (err) => {
        formatAppLog("error", "at store/user.js:66", "device存储失败:", err);
      }
    });
  };
  const getDevice = () => {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: "device",
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          formatAppLog("error", "at store/user.js:79", "device获取失败:", err);
          reject(err);
        }
      });
    });
  };
  const saveAuthority = (authority) => {
    uni.setStorage({
      key: "authority",
      data: authority,
      success: () => {
        formatAppLog("log", "at store/user.js:91", "authority存储成功");
      },
      fail: (err) => {
        formatAppLog("error", "at store/user.js:94", "authority存储失败:", err);
      }
    });
  };
  const getAuthority = () => {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: "authority",
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          formatAppLog("error", "at store/user.js:107", "authority获取失败:", err);
          reject(err);
        }
      });
    });
  };
  const saveNumber = (number) => {
    uni.setStorage({
      key: "number",
      data: number,
      success: () => {
        formatAppLog("log", "at store/user.js:119", "number存储成功");
      },
      fail: (err) => {
        formatAppLog("error", "at store/user.js:122", "number存储失败:", err);
      }
    });
  };
  const getNumber = () => {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: "number",
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          formatAppLog("error", "at store/user.js:135", "number获取失败:", err);
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
            formatAppLog("log", "at utils/request.js:17", res);
            const errorMessage = ((_a = res.data) == null ? void 0 : _a.message) || `请求失败,状态码: ${res.statusCode}`;
            uni.showToast({
              title: errorMessage,
              icon: "none"
            });
            reject(new Error(errorMessage));
          }
        },
        fail: (err) => {
          formatAppLog("log", "at utils/request.js:27", 5555);
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
  const addCompany = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/company/add",
      method: "POST",
      headers: {
        "token": token
      },
      data: {
        "companyName": params.name,
        "phone": params.phone,
        "userName": params.userName,
        "admin": params.admin,
        "user": params.user,
        "sale": params.sale
      }
    });
  };
  const addUser = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/user/add",
      method: "POST",
      headers: {
        "token": token
      },
      data: params
    });
  };
  const deleteUser = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: `/web/user/${params}`,
      method: "DELETE",
      headers: {
        "token": token
      }
    });
  };
  const updateUser = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/user/update",
      method: "PUT",
      headers: {
        "token": token
      },
      data: params
    });
  };
  const fetchStationList = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/stations/list",
      method: "GET",
      headers: {
        "token": token
      },
      data: {
        companyName: params
      }
    });
  };
  const addDevice = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/device/add",
      method: "POST",
      headers: {
        "token": token
      },
      data: params
    });
  };
  const updateStation = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/stations/update",
      method: "PUT",
      headers: {
        "token": token
      },
      data: params
    });
  };
  const deleteCompany = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: `/web/company/${params}`,
      method: "DELETE",
      headers: {
        "token": token
      }
    });
  };
  const updateCompany = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/company/update",
      method: "PUT",
      headers: {
        "token": token
      },
      data: {
        "companyName": params.name,
        "phone": params.phone,
        "userName": params.userName,
        "admin": params.admin,
        "user": params.user,
        "sale": params.sale
      }
    });
  };
  const deleteStation = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: `/web/stations/${params}`,
      method: "DELETE",
      headers: {
        "token": token
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
  const addStation = async (params) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: "/web/stations/add",
      method: "POST",
      headers: {
        "token": token
      },
      data: params
    });
  };
  const getStationDevices = async (stationName) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: `/web/stations/${stationName}`,
      method: "GET",
      headers: {
        "token": token
      }
    });
  };
  const getDeviceInstallInfo = async (deviceNumber) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: `/web/device/install/${deviceNumber}`,
      method: "GET",
      headers: {
        "token": token
      }
    });
  };
  const getDetailDevices = async (deviceNumber) => {
    const token = await getTokenFromLocalStorage();
    return request({
      url: `/web/device/${deviceNumber}`,
      method: "GET",
      headers: {
        "token": token
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
  const userIcon = "/static/username_icon.png";
  const _sfc_main$l = {
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
          return;
        }
        login(user).then((res) => {
          if (res.code === 200) {
            formatAppLog("log", "at pages/login/login.vue:100", res);
            saveTokenToLocalStorage(res.data.token);
            saveUser(user.username);
            saveNumber(res.data.userInfo.userNumber);
            saveAuthority(res.data.userInfo.authority);
            uni.switchTab({
              url: "/pages/map/map"
              // 假设这是一个 tabBar 页面
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: "none"
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
      }, get saveAuthority() {
        return saveAuthority;
      }, get saveTokenToLocalStorage() {
        return saveTokenToLocalStorage;
      }, get saveUser() {
        return saveUser;
      }, get saveNumber() {
        return saveNumber;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/login/login.vue"]]);
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
  const _sfc_main$k = {
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
        let code = this.icons.find((v2) => v2.font_class === this.type);
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
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
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
  const UniIcons = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-946bce22"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"]]);
  const _sfc_main$j = {
    __name: "map",
    setup(__props, { expose: __expose }) {
      __expose();
      const selectedStation = vue.ref(null);
      const totalStations = vue.ref(0);
      const input = vue.ref(null);
      const authority = vue.ref("");
      const mapCenter = vue.ref({
        latitude: 0,
        longitude: 0
      });
      const markers = vue.reactive([]);
      const stations = vue.reactive([]);
      const handleMarkerTap = (e2) => {
        if (e2.detail.markerId === 1)
          return;
        const markerId = e2.detail.markerId;
        const station = stations.find((item) => item.id === markerId);
        selectedStation.value = JSON.parse(JSON.stringify(station));
        setTimeout(() => {
          selectedStation.value = { ...selectedStation.value };
        }, 50);
      };
      const handleMapTap = () => {
        selectedStation.value = null;
      };
      const handleEnter = () => {
        selectedStation.value = stations.find((item) => item.address.includes(input.value.toLowerCase())) || null;
      };
      const getLocation = () => {
        uni.getLocation({
          type: "wgs84",
          // 坐标类型（wgs84返回gps坐标，gcj02返回国测局坐标）
          altitude: true,
          // 获取高度信息（需要设备支持）
          success: (res) => {
            mapCenter.value.latitude = res.latitude;
            mapCenter.value.longitude = res.longitude;
            markers.push({
              id: 1,
              latitude: mapCenter.value.latitude,
              longitude: mapCenter.value.longitude,
              iconPath: "../../static/maker.png",
              width: 10,
              height: 10,
              anchor: { x: 0.5, y: 1 }
            });
          },
          fail: (err) => {
            formatAppLog("error", "at pages/map/map.vue:145", "定位失败:", err);
            uni.showToast({
              title: "获取位置失败，请检查定位权限",
              icon: "none"
            });
          }
        });
      };
      function start() {
        getStationList().then((res) => {
          formatAppLog("log", "at pages/map/map.vue:156", res);
          totalStations.value = res.data.records.length;
          res.data.records.forEach((item, index) => {
            markers.push({
              id: index + 2,
              latitude: item.latitude,
              longitude: item.longitude,
              iconPath: "../../static/mapLogo.png",
              width: 10,
              height: 10,
              anchor: { x: 0.5, y: 1 }
            });
            stations.push({
              phone: item.phone,
              company: item.company,
              id: index + 1,
              address: item.address,
              detail: item.detail,
              stationName: item.stationName,
              userName: item.userName
            });
          });
        });
      }
      vue.onMounted(() => {
        getLocation();
        start();
      });
      const __returned__ = { selectedStation, totalStations, input, authority, mapCenter, markers, stations, handleMarkerTap, handleMapTap, handleEnter, getLocation, start, onMounted: vue.onMounted, reactive: vue.reactive, ref: vue.ref, onUnmounted: vue.onUnmounted, onBeforeUpdate: vue.onBeforeUpdate, uniIcons: UniIcons, get fetchCompanyList() {
        return fetchCompanyList;
      }, get getStationList() {
        return getStationList;
      }, get getAuthority() {
        return getAuthority;
      }, get onShow() {
        return onShow;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
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
          style: { "width": "100%", "height": "60%" },
          latitude: $setup.mapCenter.latitude,
          longitude: $setup.mapCenter.longitude,
          markers: $setup.markers,
          "show-location": "",
          onMarkertap: $setup.handleMarkerTap,
          onTap: $setup.handleMapTap
        }, null, 40, ["latitude", "longitude", "markers"]),
        $setup.selectedStation ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "info-window"
        }, [
          vue.createElementVNode("view", { class: "info-header" }, [
            vue.createElementVNode(
              "text",
              { class: "title" },
              vue.toDisplayString(((_a = $setup.selectedStation) == null ? void 0 : _a.stationName) || "加载中..."),
              1
              /* TEXT */
            ),
            vue.createCommentVNode(' <uni-icons \n   		       type="close" \n   		       size="20" \n   		       color="#999" \n   		       @click="selectedStation = null"\n   		     ></uni-icons> ')
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
  const PagesMapMap = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-e06b858f"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/map/map.vue"]]);
  const _imports_0$6 = "/static/background.png";
  const _sfc_main$i = {
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
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
      vue.createElementVNode("img", {
        src: _imports_0$6,
        alt: "",
        class: "img"
      })
    ]);
  }
  const PagesPreLoginPreLogin = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-6f7f9871"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/PreLogin/PreLogin.vue"]]);
  const _imports_0$5 = "/static/logo.png";
  const _sfc_main$h = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/index/index.vue"]]);
  const _imports_0$4 = "/static/more.png";
  const _sfc_main$g = {};
  function _sfc_render$f(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
      vue.createElementVNode("img", {
        src: _imports_0$4,
        alt: "",
        class: "img"
      })
    ]);
  }
  const PagesMoreMore = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-ac368486"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/more/more.vue"]]);
  const _sfc_main$f = {
    data() {
      return {
        showDeleteConfirm: false,
        deviceToDelete: null,
        rechargeForm: {
          deviceCode: "",
          days: 1
          // 默认值
        },
        unitPrice: 10,
        // chartOption: {
        //       tooltip: {
        //         trigger: 'axis',
        //         formatter: '{b}<br/>{a}: {c}°C'
        //       },
        //       xAxis: {
        //         type: 'category',
        //         data: [],
        //         axisLabel: {
        //           formatter: value => value.split(' ')[0] // 只显示日期
        //         }
        //       },
        //       yAxis: {
        //         type: 'value',
        //         axisLabel: {
        //           formatter: '{value} °C'
        //         }
        //       },
        //       series: [{
        //         name: '温差',
        //         type: 'line',
        //         data: [],
        //         itemStyle: {
        //           color: '#1890ff' // 主色
        //         },
        //         areaStyle: {
        //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //             { offset: 0, color: 'rgba(24,144,255,0.6)' },
        //             { offset: 1, color: 'rgba(24,144,255,0.1)' }
        //           ])
        //         }
        //       }]
        //     },
        showRechargeDialog: false,
        showInstallInfoDialog: false,
        searchKey: "",
        jumpPage: null,
        deviceList: [],
        showDetailDialog: false,
        showDeviceDetailDialog: false,
        selectedDevice: null,
        selectedStation: null,
        pagination: {
          current: 1,
          size: 10,
          total: 984,
          loading: false
        },
        allData: [],
        backendPage: 1,
        hasMore: true,
        //、
        // 图表初始化对象
        tempChartInit: {
          lazyLoad: true
          // 延迟加载
        }
        // 图表配置
        // chartOption: {
        //   tooltip: {
        //     trigger: 'axis',
        //     formatter: '{b}<br/>{a}: {c}°C'
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   xAxis: {
        //     type: 'category',
        //     data: [],
        //     axisLabel: {
        //       formatter: value => value.split(' ')[0], // 只显示日期
        //       interval: 0,
        //       rotate: 30
        //     }
        //   },
        //   yAxis: {
        //     type: 'value',
        //     axisLabel: {
        //       formatter: '{value} °C'
        //     }
        //   },
        //   series: [{
        //     name: '温差',
        //     type: 'line',
        //     data: [],
        //     smooth: true,
        //     symbol: 'circle',
        //     symbolSize: 6,
        //     itemStyle: {
        //       color: '#1296db' // 主色
        //     },
        //     lineStyle: {
        //       width: 3
        //     },
        //     areaStyle: {
        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //         { offset: 0, color: 'rgba(18,150,219,0.6)' },
        //         { offset: 1, color: 'rgba(18,150,219,0.1)' }
        //       ])
        //     }
        //   }]
        // }
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.pagination.total / this.pagination.size);
      }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
        }, 300);
      });
    },
    methods: {
      toChart() {
        uni.navigateTo({
          url: "/pages/chart/chart"
        });
      },
      initTempChart() {
        var _a, _b;
        if (!((_b = (_a = this.selectedDevice) == null ? void 0 : _a.history) == null ? void 0 : _b.length))
          return;
        this.$nextTick(() => {
          if (this.$refs.tempChart) {
            const chart = this.$refs.tempChart.init(echarts);
            const xData = this.selectedDevice.history.map((item) => item.time);
            const yData = this.selectedDevice.history.map((item) => item.value);
            const option = {
              tooltip: {
                trigger: "axis",
                formatter: "{b}<br/>温差: {c}°C"
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              xAxis: {
                type: "category",
                data: xData,
                axisLabel: {
                  interval: 0,
                  rotate: 45,
                  fontSize: 10
                }
              },
              yAxis: {
                type: "value",
                name: "温差(°C)",
                axisLabel: {
                  formatter: "{value}°C"
                }
              },
              series: [{
                name: "温差",
                type: "line",
                data: yData,
                smooth: true,
                symbolSize: 6,
                itemStyle: {
                  color: "#1296db"
                },
                markLine: {
                  data: [
                    { type: "average", name: "平均值" }
                  ]
                }
              }]
            };
            chart.setOption(option);
          }
        });
      },
      // 确认删除设备
      // 显示删除确认弹窗
      confirmDeleteDevice(device) {
        this.deviceToDelete = device;
        this.showDeleteConfirm = true;
      },
      // 取消删除
      cancelDelete() {
        this.showDeleteConfirm = false;
        this.deviceToDelete = null;
      },
      // 删除设备
      // 确认删除
      async confirmDelete() {
        if (!this.deviceToDelete)
          return;
        try {
          uni.showLoading({
            title: "正在删除..."
          });
          const res = await deleteDeviceById(this.deviceToDelete.code);
          if ((res == null ? void 0 : res.code) === 200) {
            uni.showToast({
              title: "设备删除成功",
              icon: "success"
            });
            if (this.selectedStation && this.selectedStation.devices) {
              const index = this.selectedStation.devices.findIndex(
                (item) => item.code === this.deviceToDelete.code
              );
              if (index !== -1) {
                this.selectedStation.devices.splice(index, 1);
              }
            }
          } else {
            uni.showToast({
              title: (res == null ? void 0 : res.msg) || "删除失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/list/list.vue:733", "删除设备失败:", error);
          uni.showToast({
            title: "删除设备失败，请稍后重试",
            icon: "none"
          });
        } finally {
          uni.hideLoading();
          this.showDeleteConfirm = false;
          this.deviceToDelete = null;
        }
      },
      increaseDays() {
        this.rechargeForm.days = parseInt(this.rechargeForm.days || 1) + 1;
        this.validateDays();
      },
      // 减少天数
      decreaseDays() {
        if (this.rechargeForm.days > 1) {
          this.rechargeForm.days = parseInt(this.rechargeForm.days) - 1;
        }
        this.validateDays();
      },
      // 验证天数输入
      validateDays() {
        let days = parseInt(this.rechargeForm.days);
        if (isNaN(days) || days < 1) {
          this.rechargeForm.days = 1;
        } else {
          this.rechargeForm.days = days;
        }
      },
      async loadDeviceData() {
        if (this.pagination.loading || !this.hasMore)
          return;
        this.pagination.loading = true;
        try {
          const res = await getStationList(
            this.backendPage,
            20,
            this.searchKey
          );
          if ((res == null ? void 0 : res.code) === 200 && res.data) {
            const data = res.data;
            this.allData = [...this.allData, ...data.records];
            this.pagination.total = data.total;
            this.hasMore = data.records.length >= 20;
            this.backendPage++;
            this.updateCurrentPageData();
          }
        } catch (error) {
          uni.showToast({
            title: "数据加载失败: ${error.message || '未知错误'}",
            icon: "none"
          });
        } finally {
          this.pagination.loading = false;
        }
      },
      updateCurrentPageData() {
        const start = (this.pagination.current - 1) * this.pagination.size;
        const end = start + this.pagination.size;
        if (end > this.allData.length) {
          if (this.hasMore) {
            this.loadDeviceData();
          } else {
            const currentPageData = this.allData.slice(start);
            this.deviceList = this.processStationData(currentPageData);
          }
        } else {
          const currentPageData = this.allData.slice(start, end);
          this.deviceList = this.processStationData(currentPageData);
        }
      },
      processStationData(records) {
        return records.map((station, index) => {
          var _a;
          return {
            uniqueId: `${station.id}_${Date.now()}_${index}`,
            id: station.id || "N/A",
            stationName: station.stationName || "未命名换热站",
            address: station.address || "暂无地址信息",
            company: station.company || "未知公司",
            person: station.userName || "暂无负责人",
            phone: ((_a = station.phone) == null ? void 0 : _a.replace(/\D/g, "")) || "暂无联系方式",
            detail: station.detail || "暂无信息",
            latitude: parseFloat(station.latitude) || 0,
            longitude: parseFloat(station.longitude) || 0
          };
        });
      },
      async showStationDetail(station) {
        formatAppLog("log", "at pages/list/list.vue:838", station);
        this.selectedStation = station;
        this.showDetailDialog = true;
        try {
          const devices = await this.generateDeviceList(station);
          this.selectedStation = {
            ...this.selectedStation,
            devices
          };
        } catch (error) {
          formatAppLog("error", "at pages/list/list.vue:849", "加载设备失败:", error);
          this.selectedStation.devices = [{
            name: "数据加载失败",
            code: "ERROR",
            status: "异常"
          }];
        }
      },
      // 修改后的 generateDeviceList 方法
      async generateDeviceList(station) {
        try {
          const res = await getStationDevices(station.stationName);
          if ((res == null ? void 0 : res.code) === 200 && res.data) {
            formatAppLog("log", "at pages/list/list.vue:868", 666);
            return res.data.map((device) => ({
              name: device.deviceName || "未命名设备",
              // 映射设备名称
              code: device.deviceNumber || "N/A",
              // 映射设备编号
              status: "正常"
              // 根据实际情况可添加状态字段
            }));
          }
          return [];
        } catch (error) {
          formatAppLog("error", "at pages/list/list.vue:880", "获取设备失败:", error);
          return [{
            name: "数据加载失败",
            code: "ERROR",
            status: "异常"
          }];
        }
      },
      async showInstallInfo(device) {
        this.selectedDevice = device;
        this.showInstallInfoDialog = true;
        try {
          formatAppLog("log", "at pages/list/list.vue:894", device);
          const res = await getDeviceInstallInfo(device.code);
          if ((res == null ? void 0 : res.code) === 200 && res.data) {
            this.selectedDevice = {
              ...this.selectedDevice,
              // 设备基础信息
              deviceNumber: res.data.deviceNumber,
              deviceName: res.data.deviceName,
              type: res.data.type,
              companyName: res.data.companyName,
              deviceStation: res.data.deviceStation,
              // 安装信息
              installDate: res.data.installDate,
              uploadTime: res.data.uploadTime,
              // 运行状态
              onlineState: res.data.onlineState,
              switchState: res.data.switchState,
              stopState: res.data.stopState,
              alarm: res.data.alarm,
              // 温度计信息
              temp1In: res.data.temp1In,
              temp2Out: res.data.temp2Out
            };
          }
        } catch (error) {
          formatAppLog("error", "at pages/list/list.vue:925", "加载设备安装信息失败:", error);
          uni.showToast({
            title: "设备安装信息加载失败",
            icon: "none"
          });
        }
      },
      async showPayDetail(device) {
        this.selectedDevice = device;
        this.rechargeForm.deviceCode = device.code;
        this.rechargeForm.days = 1;
        this.showRechargeDialog = true;
      },
      async showDeviceDetail(device) {
        this.selectedDevice = device;
        this.showDeviceDetailDialog = true;
        try {
          formatAppLog("log", "at pages/list/list.vue:944", device);
          const res = await getDetailDevices(device.code);
          if ((res == null ? void 0 : res.code) === 200 && res.data) {
            const { deviceInfo, temperatureInfo, tempDiffHistory } = res.data;
            this.selectedDevice = {
              ...this.selectedDevice,
              // 设备基础信息
              code: deviceInfo.deviceNumber,
              installDate: deviceInfo.addTime,
              updateTime: deviceInfo.dateTime,
              status: deviceInfo.deviceState ? "正常" : "离线",
              remainingTime: `${deviceInfo.day}天${deviceInfo.hour}小时${deviceInfo.minute}分`,
              // 温度信息
              temp1: temperatureInfo.temp1In,
              temp2: temperatureInfo.temp2Out,
              tempDiff: (temperatureInfo.temp2Out - temperatureInfo.temp1In).toFixed(1),
              // 历史记录（取前10条）
              history: tempDiffHistory.slice(0, 10).map((item) => ({
                time: item.addTime,
                value: item.diff
              }))
            };
            this.$nextTick(() => {
              this.initTempChart();
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/list/list.vue:979", "加载设备失败:", error);
          uni.showToast({
            title: "加载设备数据失败",
            icon: "none"
          });
        }
      },
      closeDeviceDialog() {
        this.showDeviceDetailDialog = false;
        this.selectedDevice = null;
      },
      closeInstallInfoDialog() {
        this.showInstallInfoDialog = false;
      },
      closeRechargeDialog() {
        this.showRechargeDialog = false;
      },
      closeDialog() {
        this.showDetailDialog = false;
        this.selectedStation = null;
      },
      handleSearch() {
        this.pagination.current = 1;
        this.backendPage = 1;
        this.allData = [];
        this.hasMore = true;
        this.loadDeviceData();
      },
      changePage(step) {
        const newPage = this.pagination.current + step;
        if (newPage > 0 && newPage <= this.totalPages) {
          this.pagination.current = newPage;
          this.updateCurrentPageData();
        }
      },
      handleJump() {
        if (!this.jumpPage || isNaN(this.jumpPage))
          return;
        const targetPage = Math.max(
          1,
          Math.min(parseInt(this.jumpPage), this.totalPages)
        );
        this.pagination.current = targetPage;
        this.jumpPage = null;
        this.updateCurrentPageData();
      }
    },
    onLoad() {
      this.loadDeviceData();
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c;
    const _component_uni_search_bar = vue.resolveComponent("uni-search-bar");
    const _component_uni_icons = vue.resolveComponent("uni-icons");
    const _component_uni_load_more = vue.resolveComponent("uni-load-more");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 标题区域 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "title" }, "我的换热站"),
        vue.createElementVNode(
          "text",
          { class: "count" },
          "共计" + vue.toDisplayString($data.pagination.total) + "个换热站",
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 搜索区域 "),
      vue.createElementVNode("view", { class: "search-box" }, [
        vue.createVNode(_component_uni_search_bar, {
          placeholder: "输入换热站名称搜索",
          onConfirm: $options.handleSearch,
          modelValue: $data.searchKey,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchKey = $event)
        }, null, 8, ["onConfirm", "modelValue"])
      ]),
      vue.createCommentVNode(" 列表区域 "),
      vue.createElementVNode("scroll-view", {
        class: "scroll-view",
        "scroll-y": ""
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.deviceList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: item.uniqueId,
              class: "station-item",
              onClick: ($event) => $options.showStationDetail(item)
            }, [
              vue.createElementVNode("view", { class: "station-header" }, [
                vue.createElementVNode(
                  "text",
                  { class: "station-name" },
                  vue.toDisplayString(item.stationName),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "station-company" },
                  vue.toDisplayString(item.company),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "station-info" }, [
                vue.createElementVNode("text", { class: "info-label" }, "地址："),
                vue.createElementVNode(
                  "text",
                  { class: "info-value" },
                  vue.toDisplayString(item.address || "暂无地址信息"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "station-info" }, [
                vue.createElementVNode("text", { class: "info-label" }, "负责人："),
                vue.createElementVNode(
                  "text",
                  { class: "info-value" },
                  vue.toDisplayString(item.person || "暂无负责人"),
                  1
                  /* TEXT */
                )
              ]),
              index < $data.deviceList.length - 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "divider"
              })) : vue.createCommentVNode("v-if", true)
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createCommentVNode(" 分页控件 "),
        vue.createElementVNode("view", { class: "pagination" }, [
          vue.createElementVNode("button", {
            class: "page-btn",
            disabled: $data.pagination.current === 1 || $data.pagination.loading,
            onClick: _cache[1] || (_cache[1] = ($event) => $options.changePage(-1))
          }, " 上一页 ", 8, ["disabled"]),
          vue.createElementVNode(
            "text",
            { class: "page-info" },
            " 第 " + vue.toDisplayString($data.pagination.current) + " 页 / 共 " + vue.toDisplayString($options.totalPages) + " 页 ",
            1
            /* TEXT */
          ),
          vue.createElementVNode("button", {
            class: "page-btn",
            disabled: $data.pagination.current >= $options.totalPages || $data.pagination.loading,
            onClick: _cache[2] || (_cache[2] = ($event) => $options.changePage(1))
          }, " 下一页 ", 8, ["disabled"]),
          vue.createCommentVNode(" 新增跳转控件 "),
          vue.createElementVNode("view", { class: "page-jump" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "jump-input",
              type: "number",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.jumpPage = $event),
              placeholder: "页数",
              max: $options.totalPages,
              min: 1
            }, null, 8, ["max"]), [
              [vue.vModelText, $data.jumpPage]
            ]),
            vue.createElementVNode("button", {
              class: "jump-btn",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.handleJump && $options.handleJump(...args)),
              disabled: $data.pagination.loading
            }, " 前 往 ", 8, ["disabled"])
          ])
        ])
      ]),
      vue.createCommentVNode(" 详情弹窗 "),
      $data.showDetailDialog ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "dialog-mask",
        onClick: _cache[7] || (_cache[7] = (...args) => $options.closeDialog && $options.closeDialog(...args))
      }, [
        vue.createElementVNode("view", {
          class: "dialog-content",
          onClick: _cache[6] || (_cache[6] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "dialog-header" }, [
            vue.createElementVNode("text", { class: "dialog-title" }, "换热站详情"),
            vue.createVNode(_component_uni_icons, {
              type: "closeempty",
              size: "24",
              color: "#999",
              onClick: $options.closeDialog
            }, null, 8, ["onClick"])
          ]),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "detail-scroll"
          }, [
            vue.createElementVNode("view", { class: "detail-section" }, [
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "换热站名称："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedStation.stationName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "所属公司："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedStation.company),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "负责人："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedStation.person || "暂无"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "联系电话："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedStation.phone || "暂无"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "地址："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedStation.address || "暂无"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "经度："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedStation.longitude),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "纬度："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedStation.latitude),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "详细信息："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedStation.detail),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "detail-section" }, [
              vue.createElementVNode(
                "text",
                { class: "section-title" },
                "设备列表（" + vue.toDisplayString(((_a = $data.selectedStation.devices) == null ? void 0 : _a.length) || 0) + "台）",
                1
                /* TEXT */
              ),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.selectedStation.devices, (device, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    class: "device-item"
                  }, [
                    vue.createElementVNode(
                      "text",
                      { class: "device-name" },
                      vue.toDisplayString(device.name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "device-info" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        "编号：" + vue.toDisplayString(device.code),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "device-actions" }, [
                        vue.createElementVNode("text", {
                          class: "action-btn",
                          onClick: [
                            vue.withModifiers(($event) => $options.showDeviceDetail(device), ["stop"]),
                            _cache[5] || (_cache[5] = (...args) => $options.toChart && $options.toChart(...args))
                          ]
                        }, "查看详情", 8, ["onClick"]),
                        vue.createElementVNode("text", {
                          class: "action-btn",
                          onClick: vue.withModifiers(($event) => $options.showInstallInfo(device), ["stop"])
                        }, "安装信息", 8, ["onClick"]),
                        vue.createElementVNode("text", {
                          class: "action-btn",
                          onClick: vue.withModifiers(($event) => $options.showPayDetail(device), ["stop"])
                        }, "充值", 8, ["onClick"]),
                        vue.createElementVNode("text", {
                          class: "action-btn delete-btn",
                          onClick: vue.withModifiers(($event) => $options.confirmDeleteDevice(device), ["stop"])
                        }, "删除设备", 8, ["onClick"])
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 设备详情弹窗 "),
      $data.showDeviceDetailDialog ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "dialog-mask",
        onClick: _cache[9] || (_cache[9] = (...args) => $options.closeDeviceDialog && $options.closeDeviceDialog(...args))
      }, [
        vue.createElementVNode("view", {
          class: "dialog-content device-detail-content",
          onClick: _cache[8] || (_cache[8] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "dialog-header" }, [
            vue.createElementVNode("text", { class: "dialog-title" }, "设备详情"),
            vue.createVNode(_component_uni_icons, {
              type: "closeempty",
              size: "24",
              color: "#999",
              onClick: $options.closeDeviceDialog
            }, null, 8, ["onClick"])
          ]),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "detail-scroll"
          }, [
            vue.createCommentVNode(" 基本信息 "),
            vue.createElementVNode("view", { class: "detail-section" }, [
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "设备名称："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedDevice.name),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "设备编号："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedDevice.code),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "剩余时间："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedDevice.remainingTime || "--"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "detail-row" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "更新时间："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedDevice.updateTime || "--"),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createCommentVNode(" 温度数据 "),
            vue.createElementVNode("view", { class: "detail-section" }, [
              vue.createElementVNode("view", { class: "temperature-grid" }, [
                vue.createElementVNode("view", { class: "temp-item" }, [
                  vue.createElementVNode("text", { class: "temp-label" }, "一网回水温度"),
                  vue.createElementVNode(
                    "text",
                    { class: "temp-value" },
                    vue.toDisplayString($data.selectedDevice.temp1) + "°C",
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "temp-item" }, [
                  vue.createElementVNode("text", { class: "temp-label" }, "二网供水温度"),
                  vue.createElementVNode(
                    "text",
                    { class: "temp-value" },
                    vue.toDisplayString($data.selectedDevice.temp2) + "°C",
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "temp-item" }, [
                  vue.createElementVNode("text", { class: "temp-label" }, "当前温差"),
                  vue.createElementVNode(
                    "text",
                    {
                      class: "temp-value",
                      style: vue.normalizeStyle({ color: $data.selectedDevice.tempDiff < 0 ? "#ff4444" : "#4CAF50" })
                    },
                    vue.toDisplayString($data.selectedDevice.tempDiff) + "°C ",
                    5
                    /* TEXT, STYLE */
                  )
                ])
              ])
            ]),
            vue.createCommentVNode(" 历史记录 "),
            vue.createElementVNode("view", { class: "detail-section" }, [
              vue.createElementVNode(
                "text",
                { class: "section-title" },
                "温差历史记录（" + vue.toDisplayString(((_b = $data.selectedDevice.history) == null ? void 0 : _b.length) || 0) + "条）",
                1
                /* TEXT */
              ),
              vue.createCommentVNode(" 历史记录图表 "),
              vue.createCommentVNode(' <view class="chart-container" v-if="selectedDevice.history?.length > 0"> '),
              vue.createCommentVNode(" 使用uni-app中的ec-canvas组件 "),
              vue.createCommentVNode(' <ec-canvas \n           id="tempChart" \n           canvas-id="tempChart"\n           :ec="tempChartInit"\n           style="width: 100%; height: 300px;"\n         ></ec-canvas>\n       </view> '),
              vue.createCommentVNode(' <view>\r\n   <EChart :option="chartOption" chartId="myChart" />\r\n </view> '),
              vue.createCommentVNode(" 无数据提示 "),
              vue.createCommentVNode(' <view v-if="!selectedDevice.history?.length" class="no-data">\n         <text>暂无历史数据</text>\n       </view> ')
            ])
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 充值弹窗 "),
      $data.showRechargeDialog ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "dialog-mask",
        onClick: _cache[17] || (_cache[17] = (...args) => $options.closeRechargeDialog && $options.closeRechargeDialog(...args))
      }, [
        vue.createElementVNode("view", {
          class: "dialog-content recharge-content",
          onClick: _cache[16] || (_cache[16] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "dialog-header" }, [
            vue.createElementVNode("text", { class: "dialog-title" }, "设备充值"),
            vue.createVNode(_component_uni_icons, {
              type: "closeempty",
              size: "24",
              color: "#999",
              onClick: $options.closeRechargeDialog
            }, null, 8, ["onClick"])
          ]),
          vue.createElementVNode(
            "form",
            {
              onSubmit: _cache[15] || (_cache[15] = (...args) => _ctx.handleRecharge && _ctx.handleRecharge(...args))
            },
            [
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("label", { class: "form-label" }, "设备编号"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "form-input",
                    type: "text",
                    placeholder: "设备编号",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.rechargeForm.deviceCode = $event),
                    disabled: ""
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.rechargeForm.deviceCode]
                ])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "设备名称："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedDevice.name),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "detail-label" }, "设备编号："),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value" },
                  vue.toDisplayString($data.selectedDevice.code),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("label", { class: "form-label" }, "充值天数"),
                vue.createElementVNode("view", { class: "number-input-group" }, [
                  vue.createElementVNode("button", {
                    class: "number-btn minus-btn",
                    onClick: _cache[11] || (_cache[11] = vue.withModifiers((...args) => $options.decreaseDays && $options.decreaseDays(...args), ["stop"]))
                  }, "-"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "form-input number-input",
                      type: "number",
                      placeholder: "输入天数",
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.rechargeForm.days = $event),
                      min: "1",
                      onInput: _cache[13] || (_cache[13] = (...args) => $options.validateDays && $options.validateDays(...args))
                    },
                    null,
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ), [
                    [
                      vue.vModelText,
                      $data.rechargeForm.days,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  vue.createElementVNode("button", {
                    class: "number-btn plus-btn",
                    onClick: _cache[14] || (_cache[14] = vue.withModifiers((...args) => $options.increaseDays && $options.increaseDays(...args), ["stop"]))
                  }, "+")
                ]),
                vue.createElementVNode("view", { class: "price-calculation" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    "预计费用: ¥" + vue.toDisplayString(($data.rechargeForm.days * $data.unitPrice).toFixed(2)),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "form-buttons" }, [
                vue.createElementVNode("button", {
                  class: "form-button",
                  formType: "reset"
                }, "取消"),
                vue.createElementVNode("button", {
                  class: "form-button form-button-confirm",
                  formType: "submit"
                }, "确定充值")
              ])
            ],
            32
            /* NEED_HYDRATION */
          )
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 删除确认弹窗 "),
      $data.showDeleteConfirm ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: "confirm-mask",
        onClick: _cache[21] || (_cache[21] = (...args) => $options.cancelDelete && $options.cancelDelete(...args))
      }, [
        vue.createElementVNode("view", {
          class: "confirm-dialog",
          onClick: _cache[20] || (_cache[20] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "confirm-title" }, "确认删除"),
          vue.createElementVNode(
            "view",
            { class: "confirm-content" },
            '确定要删除设备"' + vue.toDisplayString((_c = $data.deviceToDelete) == null ? void 0 : _c.name) + '"吗？此操作不可恢复。',
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "confirm-buttons" }, [
            vue.createElementVNode("button", {
              class: "confirm-btn cancel-btn",
              onClick: _cache[18] || (_cache[18] = (...args) => $options.cancelDelete && $options.cancelDelete(...args))
            }, "取消"),
            vue.createElementVNode("button", {
              class: "confirm-btn delete-btn",
              onClick: _cache[19] || (_cache[19] = (...args) => $options.confirmDelete && $options.confirmDelete(...args))
            }, "确认删除")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 安装信息弹窗 "),
      $data.showInstallInfoDialog ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 4,
        class: "dialog-mask",
        onClick: _cache[23] || (_cache[23] = (...args) => $options.closeInstallInfoDialog && $options.closeInstallInfoDialog(...args))
      }, [
        vue.createElementVNode("view", {
          class: "dialog-content install-info-content",
          onClick: _cache[22] || (_cache[22] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "dialog-header" }, [
            vue.createElementVNode("text", { class: "dialog-title" }, "设备安装信息"),
            vue.createVNode(_component_uni_icons, {
              type: "closeempty",
              size: "24",
              color: "#999",
              onClick: $options.closeInstallInfoDialog
            }, null, 8, ["onClick"])
          ]),
          vue.createElementVNode("view", { class: "install-info-header" }, [
            vue.createElementVNode("text", { class: "info-header-title" }, "安装信息"),
            vue.createElementVNode("button", { class: "modify-btn" }, [
              vue.createVNode(_component_uni_icons, {
                type: "compose",
                size: "14",
                color: "#fff"
              }),
              vue.createTextVNode(" 修改设备信息 ")
            ])
          ]),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "detail-scroll"
          }, [
            vue.createCommentVNode(" 基本信息 "),
            vue.createElementVNode("view", { class: "detail-section" }, [
              vue.createElementVNode("view", { class: "section-header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "info-filled",
                  size: "16",
                  color: "#1296db"
                }),
                vue.createElementVNode("text", { class: "section-title" }, "基本信息")
              ]),
              vue.createElementVNode("view", { class: "info-grid" }, [
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "设备编号："),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString($data.selectedDevice.deviceNumber || "12000638"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "设备名称："),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString($data.selectedDevice.deviceName || "二网进水端头"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "设备类型："),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString($data.selectedDevice.type || "预付费"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "所属公司："),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString($data.selectedDevice.companyName || "甘肃白银靖城热力"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-item wide-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "所属站点："),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString($data.selectedDevice.deviceStation || "0号站"),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            vue.createCommentVNode(" 安装信息 "),
            vue.createElementVNode("view", { class: "detail-section" }, [
              vue.createElementVNode("view", { class: "section-header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "calendar-filled",
                  size: "16",
                  color: "#1296db"
                }),
                vue.createElementVNode("text", { class: "section-title" }, "安装信息")
              ]),
              vue.createElementVNode("view", { class: "info-grid" }, [
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "安装日期："),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString($data.selectedDevice.installDate || "2020-11-02"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "数据上传："),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString($data.selectedDevice.uploadTime || "5") + "分钟/次",
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            vue.createCommentVNode(" 运行状态 "),
            vue.createElementVNode("view", { class: "detail-section" }, [
              vue.createElementVNode("view", { class: "section-header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "gear-filled",
                  size: "16",
                  color: "#1296db"
                }),
                vue.createElementVNode("text", { class: "section-title" }, "运行状态")
              ]),
              vue.createElementVNode("view", { class: "info-grid" }, [
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "联网状态："),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["status-tag", $data.selectedDevice.onlineState ? "online" : "offline"])
                    },
                    vue.toDisplayString($data.selectedDevice.onlineState ? "联网" : "离线"),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "开关状态："),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["status-tag", $data.selectedDevice.switchState ? "on" : "off"])
                    },
                    vue.toDisplayString($data.selectedDevice.switchState ? "开" : "关"),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "停机状态："),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["status-tag", $data.selectedDevice.stopState ? "stopped" : "running"])
                    },
                    vue.toDisplayString($data.selectedDevice.stopState ? "停机" : "非停机"),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "开启提醒："),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["status-tag", $data.selectedDevice.alarm ? "on" : "off"])
                    },
                    vue.toDisplayString($data.selectedDevice.alarm ? "开" : "关"),
                    3
                    /* TEXT, CLASS */
                  )
                ])
              ])
            ]),
            vue.createCommentVNode(" 温度计信息 "),
            vue.createElementVNode("view", { class: "detail-section" }, [
              vue.createElementVNode("view", { class: "section-header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "mic-filled",
                  size: "16",
                  color: "#1296db"
                }),
                vue.createElementVNode("text", { class: "section-title" }, "温度计信息")
              ]),
              vue.createElementVNode("view", { class: "info-grid" }, [
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "一网回水温度计："),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString($data.selectedDevice.temp1In || "31000822"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "info-item" }, [
                  vue.createElementVNode("text", { class: "info-label" }, "二网供水温度计："),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString($data.selectedDevice.temp2Out || "31000819"),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ])
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 加载提示 "),
      $data.pagination.loading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 5,
        class: "loading-mask"
      }, [
        vue.createVNode(_component_uni_load_more, { status: "loading" })
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesListList = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-98a9e0b2"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/list/list.vue"]]);
  const _imports_0$3 = "/static/enter_icon.png";
  const _sfc_main$e = {
    __name: "settings",
    setup(__props, { expose: __expose }) {
      __expose();
      const authority = vue.ref("");
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
      vue.onMounted(() => {
        (async () => {
          authority.value = await getAuthority();
          if (authority.value === "admin") {
            menuList.value = [
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
                title: "修改密码",
                icon: "/static/setting_icon.png",
                url: "/pages/change-password/change-password"
              }
            ];
          } else if (authority.value === "sale" || authority.value === "user") {
            menuList.value = [
              {
                title: "修改密码",
                icon: "/static/setting_icon.png",
                url: "/pages/change-password/change-password"
              }
            ];
          }
        })();
      });
      const __returned__ = { authority, menuList, navigate, logout, ref: vue.ref, onMounted: vue.onMounted, get getAuthority() {
        return getAuthority;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
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
              src: _imports_0$3,
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
  const PagesSettingsSettings = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/settings/settings.vue"]]);
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
  const _sfc_main$d = {
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
      onConfirm(e2) {
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
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = vue.resolveComponent("uni-icons");
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
  const UniEasyinput = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-f7a14e66"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue"]]);
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
  const _sfc_main$c = {
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
      emitFocus(e2) {
        this.$emit("focus", e2.detail);
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = vue.resolveComponent("uni-icons");
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
  const UniSearchBar = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-a149a6be"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue"]]);
  const _sfc_main$b = {
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
      clear(e2) {
        e2.stopPropagation();
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
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = vue.resolveComponent("uni-transition");
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
  const UniPopup = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-7db519c7"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue"]]);
  const _sfc_main$a = {
    __name: "user",
    setup(__props, { expose: __expose }) {
      __expose();
      const users = vue.ref([]);
      const currentUser = vue.ref(null);
      const searchKeyword = vue.ref("");
      const detailPopup = vue.ref(null);
      const authority = vue.ref("");
      const isAdmin = vue.computed(() => authority.value === "admin");
      async function deletecompany() {
        var _a, _b;
        const { confirm } = await uni.showModal({
          title: "删除确认",
          content: `确定要删除企业“${currentUser.value.name}”吗？`,
          confirmText: "确定",
          cancelText: "取消"
        });
        if (!confirm)
          return;
        try {
          const res = await deleteCompany(currentUser.value.name);
          if (res.code === 200) {
            uni.showToast({
              title: "删除成功",
              icon: "success"
            });
            const listRes = await fetchCompanyList();
            users.value = ((_b = (_a = listRes.data) == null ? void 0 : _a.records) == null ? void 0 : _b.map((item, index) => ({
              id: String(index),
              name: item.companyName || "未知企业",
              phone: item.phone,
              userName: item.userName,
              admin: item.admin,
              user: item.user,
              sale: item.sale
            }))) || [];
            closeDetailModal();
          } else {
            uni.showToast({
              title: res.message || "删除失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/user/user.vue:301", "删除企业失败:", error);
          uni.showToast({
            title: "删除失败，请重试",
            icon: "none"
          });
        }
      }
      const viewHeatStations = () => {
        saveDevice(currentUser.value.name);
        uni.navigateTo({
          url: `/pages/company-stationList/company-stationList`
        });
      };
      vue.onMounted(async () => {
        var _a, _b;
        try {
          authority.value = await getAuthority();
          const res = await fetchCompanyList();
          formatAppLog("log", "at pages/user/user.vue:320", res);
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
          formatAppLog("error", "at pages/user/user.vue:331", "获取企业列表失败:", error);
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
      const handleSearch = (e2) => {
        searchKeyword.value = e2.value;
      };
      const handleCancel = () => {
        searchKeyword.value = "";
      };
      const showDetailModal = (user) => {
        currentUser.value = user;
        detailPopup.value.open();
      };
      const closeDetailModal = () => {
        detailPopup.value.close(() => {
          currentUser.value = null;
        });
      };
      const addPopup = vue.ref(null);
      const newCompany = vue.ref({
        name: "",
        phone: "",
        userName: "",
        admin: "",
        user: "",
        sale: ""
      });
      const closeAddModal = () => {
        addPopup.value.close(() => {
          newCompany.value = {
            name: "",
            phone: "",
            userName: "",
            admin: "",
            user: "",
            sale: ""
          };
        });
      };
      const handleSubmit = async () => {
        var _a, _b;
        formatAppLog("log", "at pages/user/user.vue:397", newCompany.value);
        if (!newCompany.value.name || !newCompany.value.phone || !newCompany.value.userName || !newCompany.value.admin || !newCompany.value.user || !newCompany.value.sale) {
          uni.showToast({ title: "企业信息不完整", icon: "none" });
          return;
        }
        try {
          let data = await addCompany(newCompany.value);
          formatAppLog("log", "at pages/user/user.vue:406", data);
          uni.showToast({ title: "添加成功" });
          closeAddModal();
          const res = await fetchCompanyList();
          formatAppLog("log", "at pages/user/user.vue:411", res.data);
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
          uni.showToast({ title: "添加失败", icon: "none" });
          formatAppLog("log", "at pages/user/user.vue:423", error);
          formatAppLog("log", "at pages/user/user.vue:424", 55);
        }
      };
      const allUsers = vue.ref([]);
      const loadUsers = async () => {
        var _a;
        try {
          const res = await fetchUserList();
          allUsers.value = ((_a = res.data) == null ? void 0 : _a.records) || [];
        } catch (error) {
          uni.showToast({ title: "用户数据加载失败", icon: "none" });
        }
      };
      const filteredAdmins = vue.computed(() => {
        return filterUsers("admin");
      });
      const filteredusers = vue.computed(() => {
        return filterUsers("user");
      });
      const filteredSales = vue.computed(() => {
        return filterUsers("sale");
      });
      const filterUsers = (role) => {
        return allUsers.value.filter((user) => user.authority_id === role).map((user) => ({
          value: user.userName,
          // 保留唯一标识
          text: user.userName
          // 直接使用已映射的 userName
        }));
      };
      const showAddModal = async () => {
        if (allUsers.value.length === 0) {
          await loadUsers();
        }
        addPopup.value.open();
      };
      const editPopup = vue.ref(null);
      const editCompanyData = vue.ref({
        id: "",
        // 新增ID字段
        name: "",
        phone: "",
        userName: "",
        admin: "",
        user: "",
        sale: ""
      });
      const editCompany = async () => {
        if (allUsers.value.length === 0) {
          await loadUsers();
        }
        editCompanyData.value = {
          // 假设currentUser中有唯一ID
          name: currentUser.value.name,
          phone: currentUser.value.phone,
          userName: currentUser.value.userName,
          admin: currentUser.value.admin,
          user: currentUser.value.user,
          sale: currentUser.value.sale
        };
        editPopup.value.open();
      };
      const closeEditModal = () => {
        editPopup.value.close(() => {
          editCompanyData.value = {
            id: "",
            name: "",
            phone: "",
            userName: "",
            admin: "",
            user: "",
            sale: ""
          };
        });
      };
      const handleUpdateSubmit = async () => {
        var _a, _b;
        if (!editCompanyData.value.name || !editCompanyData.value.phone || !editCompanyData.value.userName || !editCompanyData.value.admin || !editCompanyData.value.user || !editCompanyData.value.sale) {
          uni.showToast({ title: "企业信息不完整", icon: "none" });
          return;
        }
        const { confirm } = await uni.showModal({
          title: "确认修改",
          content: `确定要修改 ${editCompanyData.value.name} 的企业信息吗？`,
          confirmText: "确定修改",
          cancelText: "取消"
        });
        if (!confirm)
          return;
        try {
          const res = await updateCompany(editCompanyData.value);
          if (res.code === 200) {
            uni.showToast({ title: "修改成功", icon: "success" });
            currentUser.value = {
              name: editCompanyData.value.name,
              phone: editCompanyData.value.phone,
              userName: editCompanyData.value.userName,
              admin: editCompanyData.value.admin,
              user: editCompanyData.value.user,
              sale: editCompanyData.value.sale
            };
            closeEditModal();
            formatAppLog("log", "at pages/user/user.vue:555", currentUser.value.phone);
            const listRes = await fetchCompanyList();
            users.value = ((_b = (_a = listRes.data) == null ? void 0 : _a.records) == null ? void 0 : _b.map((item, index) => ({
              id: String(index),
              name: item.companyName || "未知企业",
              phone: item.phone,
              userName: item.userName,
              admin: item.admin,
              user: item.user,
              sale: item.sale
            }))) || [];
          } else {
            uni.showToast({ title: res.message || "修改失败", icon: "none" });
          }
        } catch (error) {
          formatAppLog("error", "at pages/user/user.vue:571", "修改失败:", error);
          uni.showToast({ title: "修改失败，请重试", icon: "none" });
        }
      };
      const __returned__ = { users, currentUser, searchKeyword, detailPopup, authority, isAdmin, deletecompany, viewHeatStations, filteredUsers, handleSearch, handleCancel, showDetailModal, closeDetailModal, addPopup, newCompany, closeAddModal, handleSubmit, allUsers, loadUsers, filteredAdmins, filteredusers, filteredSales, filterUsers, showAddModal, editPopup, editCompanyData, editCompany, closeEditModal, handleUpdateSubmit, UniEasyinput, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, UniSearchBar, UniIcons, UniPopup, get fetchCompanyList() {
        return fetchCompanyList;
      }, get fetchStationList() {
        return fetchStationList;
      }, get fetchUserList() {
        return fetchUserList;
      }, get addCompany() {
        return addCompany;
      }, get deleteCompany() {
        return deleteCompany;
      }, get updateCompany() {
        return updateCompany;
      }, get saveDevice() {
        return saveDevice;
      }, get getAuthority() {
        return getAuthority;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_data_select = vue.resolveComponent("uni-data-select");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      !$setup.isAdmin ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "float-btn",
        onClick: $setup.showAddModal
      }, [
        vue.createVNode($setup["UniIcons"], {
          type: "plusempty",
          size: "30",
          color: "#fff"
        })
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 标题 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "title" }, "企业列表")
      ]),
      vue.createCommentVNode(" 搜索框 "),
      vue.createElementVNode("view", { class: "search-box" }, [
        vue.createVNode($setup["UniSearchBar"], {
          placeholder: "请输入企业名称关键字",
          radius: "100",
          modelValue: $setup.searchKeyword,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.searchKeyword = $event),
          onConfirm: $setup.handleSearch,
          onCancel: $setup.handleCancel
        }, null, 8, ["modelValue"])
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
            var _a, _b, _c, _d, _e2;
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
                      vue.toDisplayString(((_e2 = $setup.currentUser) == null ? void 0 : _e2.sale) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "action-buttons" }, [
                    vue.createElementVNode("button", {
                      class: "btn heat-station",
                      onClick: $setup.viewHeatStations
                    }, "查看换热站"),
                    !$setup.isAdmin ? (vue.openBlock(), vue.createElementBlock("button", {
                      key: 0,
                      class: "btn edit",
                      onClick: $setup.editCompany
                    }, "修改信息")) : vue.createCommentVNode("v-if", true),
                    !$setup.isAdmin ? (vue.openBlock(), vue.createElementBlock("button", {
                      key: 1,
                      class: "btn delete",
                      onClick: $setup.deletecompany
                    }, "删除公司")) : vue.createCommentVNode("v-if", true)
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
      ),
      vue.createVNode(
        $setup["UniPopup"],
        {
          ref: "addPopup",
          type: "center"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "add-modal" }, [
              vue.createElementVNode("view", { class: "modal-header" }, [
                vue.createElementVNode("text", { class: "title" }, "添加企业"),
                vue.createVNode($setup["UniIcons"], {
                  type: "closeempty",
                  size: "20",
                  color: "#666",
                  onClick: $setup.closeAddModal
                })
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 企业名称"),
                vue.createVNode($setup["UniEasyinput"], {
                  modelValue: $setup.newCompany.name,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.newCompany.name = $event),
                  placeholder: "请输入企业名称"
                }, null, 8, ["modelValue"])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 联系电话"),
                vue.createVNode($setup["UniEasyinput"], {
                  modelValue: $setup.newCompany.phone,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newCompany.phone = $event),
                  placeholder: "请输入联系电话",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 负责人"),
                vue.createVNode($setup["UniEasyinput"], {
                  modelValue: $setup.newCompany.userName,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newCompany.userName = $event),
                  placeholder: "请输入负责人姓名"
                }, null, 8, ["modelValue"])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 管理员"),
                vue.createVNode(_component_uni_data_select, {
                  modelValue: $setup.newCompany.admin,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newCompany.admin = $event),
                  placeholder: "选择管理员",
                  localdata: $setup.filteredAdmins,
                  clear: true
                }, null, 8, ["modelValue", "localdata"])
              ]),
              vue.createCommentVNode(" 用户选择 "),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 用户"),
                vue.createVNode(_component_uni_data_select, {
                  modelValue: $setup.newCompany.user,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.newCompany.user = $event),
                  placeholder: "选择用户",
                  localdata: $setup.filteredusers,
                  clear: true
                }, null, 8, ["modelValue", "localdata"])
              ]),
              vue.createCommentVNode(" 销售选择 "),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 销售"),
                vue.createVNode(_component_uni_data_select, {
                  modelValue: $setup.newCompany.sale,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.newCompany.sale = $event),
                  placeholder: "选择销售",
                  localdata: $setup.filteredSales,
                  clear: true
                }, null, 8, ["modelValue", "localdata"])
              ]),
              vue.createElementVNode("view", { class: "modal-footer" }, [
                vue.createElementVNode("button", {
                  class: "btn cancel",
                  onClick: $setup.closeAddModal
                }, "取消"),
                vue.createElementVNode("button", {
                  class: "btn confirm",
                  onClick: $setup.handleSubmit
                }, "确定")
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createCommentVNode(" 新增：编辑企业弹窗 "),
      vue.createVNode(
        $setup["UniPopup"],
        {
          ref: "editPopup",
          type: "center"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "add-modal" }, [
              vue.createElementVNode("view", { class: "modal-header" }, [
                vue.createElementVNode("text", { class: "title" }, "修改企业信息"),
                vue.createVNode($setup["UniIcons"], {
                  type: "closeempty",
                  size: "20",
                  color: "#666",
                  onClick: $setup.closeEditModal
                })
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 企业名称"),
                vue.createVNode($setup["UniEasyinput"], {
                  modelValue: $setup.editCompanyData.name,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.editCompanyData.name = $event),
                  placeholder: "请输入企业名称",
                  disabled: true
                }, null, 8, ["modelValue"])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 联系电话"),
                vue.createVNode($setup["UniEasyinput"], {
                  modelValue: $setup.editCompanyData.phone,
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.editCompanyData.phone = $event),
                  placeholder: "请输入联系电话",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 负责人"),
                vue.createVNode($setup["UniEasyinput"], {
                  modelValue: $setup.editCompanyData.userName,
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.editCompanyData.userName = $event),
                  placeholder: "请输入负责人姓名"
                }, null, 8, ["modelValue"])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 管理员"),
                vue.createVNode(_component_uni_data_select, {
                  modelValue: $setup.editCompanyData.admin,
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.editCompanyData.admin = $event),
                  placeholder: "选择管理员",
                  localdata: $setup.filteredAdmins,
                  clear: true
                }, null, 8, ["modelValue", "localdata"])
              ]),
              vue.createCommentVNode(" 用户选择 "),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 用户"),
                vue.createVNode(_component_uni_data_select, {
                  modelValue: $setup.editCompanyData.user,
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.editCompanyData.user = $event),
                  placeholder: "选择用户",
                  localdata: $setup.filteredusers,
                  clear: true
                }, null, 8, ["modelValue", "localdata"])
              ]),
              vue.createCommentVNode(" 销售选择 "),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "* 销售"),
                vue.createVNode(_component_uni_data_select, {
                  modelValue: $setup.editCompanyData.sale,
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.editCompanyData.sale = $event),
                  placeholder: "选择销售",
                  localdata: $setup.filteredSales,
                  clear: true
                }, null, 8, ["modelValue", "localdata"])
              ]),
              vue.createElementVNode("view", { class: "modal-footer" }, [
                vue.createElementVNode("button", {
                  class: "btn cancel",
                  onClick: $setup.closeEditModal
                }, "取消"),
                vue.createElementVNode("button", {
                  class: "btn confirm",
                  onClick: $setup.handleUpdateSubmit
                }, "提交修改")
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-0f7520f0"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/user/user.vue"]]);
  const _imports_0$2 = "/static/error_icon.png";
  const _sfc_main$9 = {
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
        const user = this.errorList.find((u2) => u2.username === username);
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
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
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
                src: _imports_0$2
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
  const PagesErrorError = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-b8db5817"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/error/error.vue"]]);
  const _sfc_main$8 = {
    __name: "account",
    setup(__props, { expose: __expose }) {
      __expose();
      const accounts = vue.ref([]);
      const currentUser = vue.ref(null);
      const searchKeyword = vue.ref("");
      const detailPopup = vue.ref(null);
      const authority = vue.ref("");
      const user = vue.ref("");
      const number = vue.ref("");
      vue.onMounted(async () => {
        var _a, _b;
        try {
          const res = await fetchUserList();
          formatAppLog("log", "at pages/account/account.vue:307", res);
          accounts.value = ((_b = (_a = res.data) == null ? void 0 : _a.records) == null ? void 0 : _b.map((item) => ({
            userNumber: item.userNumber,
            userName: item.userName,
            passwords: item.passwords,
            mobile: item.mobile,
            email: item.email,
            authority_id: item.authority_id,
            address: item.address,
            createTime: item.createTime,
            admin: item.admin,
            errorLogin: item.errorLogin
          }))) || [];
        } catch (error) {
          formatAppLog("error", "at pages/account/account.vue:321", "获取用户列表失败:", error);
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
      const handleSearch = (e2) => {
        searchKeyword.value = e2.value;
      };
      const handleClear = () => {
        searchKeyword.value = "";
      };
      const showDetailModal = (user2) => {
        currentUser.value = user2;
        formatAppLog("log", "at pages/account/account.vue:353", user2);
        detailPopup.value.open("center");
      };
      const closeDetailModal = () => {
        detailPopup.value.close(() => {
          currentUser.value = null;
        });
      };
      const addPopup = vue.ref(null);
      const newUser = vue.ref({
        userName: "",
        passwords: "",
        authority_id: "user",
        admin: "",
        mobile: "",
        email: "",
        address: "",
        userNumber: "",
        createTime: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        // 自动生成创建时间
      });
      const userTypes = vue.ref([
        { value: "user", text: "普通用户" },
        { value: "sale", text: "销售" },
        { value: "admin", text: "管理员" }
      ]);
      const admins = vue.ref([]);
      const showAddModal = () => {
        addPopup.value.open();
      };
      const closeAddModal = () => {
        addPopup.value.close(() => {
          newUser.value = {
            userName: "",
            passwords: "",
            authority_id: "",
            admin: "",
            mobile: "",
            email: "",
            address: "",
            userNumber: "",
            createTime: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          };
        });
      };
      const handleAddSubmit = async () => {
        var _a, _b;
        const requiredFields = [
          "userName",
          "passwords",
          "authority_id",
          "admin",
          "mobile"
        ];
        const missingFields = requiredFields.filter((field) => !newUser.value[field]);
        if (missingFields.length > 0) {
          uni.showToast({ title: "请填写所有必填项", icon: "none" });
          return;
        }
        if (!/^1[3-9]\d{9}$/.test(newUser.value.mobile)) {
          uni.showToast({ title: "手机号格式不正确", icon: "none" });
          return;
        }
        const confirm = await uni.showModal({
          title: "确认添加用户",
          content: "确定要添加该用户吗？"
        });
        if (!confirm.confirm) {
          return;
        }
        try {
          formatAppLog("log", "at pages/account/account.vue:442", newUser.value);
          const res = await addUser(newUser.value);
          formatAppLog("log", "at pages/account/account.vue:444", res);
          if (res.code === 200) {
            uni.showToast({ title: "添加成功", icon: "success" });
            closeAddModal();
            const listRes = await fetchUserList();
            accounts.value = ((_b = (_a = listRes.data) == null ? void 0 : _a.records) == null ? void 0 : _b.map((item) => ({
              userNumber: item.userNumber,
              userName: item.userName,
              passwords: item.passwords,
              mobile: item.mobile,
              email: item.email,
              authority_id: item.authority_id,
              address: item.address,
              createTime: item.createTime,
              admin: item.admin,
              errorLogin: item.errorLogin
            }))) || [];
          } else {
            uni.showToast({ title: res.message || "添加失败", icon: "none" });
          }
        } catch (error) {
          formatAppLog("error", "at pages/account/account.vue:467", "添加用户失败:", error);
          uni.showToast({ title: "添加失败，请重试", icon: "none" });
        }
      };
      const isAdminOrSale = vue.computed(() => {
        return ["sale", "admin"].includes(newUser.value.authority_id);
      });
      vue.watch(
        () => newUser.value.authority_id,
        (newVal) => {
          if (["sale", "admin"].includes(newVal)) {
            newUser.value.admin = 1;
            formatAppLog("log", "at pages/account/account.vue:483", newUser.value.admin);
          } else {
            newUser.value.admin = "";
          }
        }
      );
      vue.onMounted(async () => {
        var _a, _b;
        try {
          const res = await fetchUserList();
          accounts.value = ((_b = (_a = res.data) == null ? void 0 : _a.records) == null ? void 0 : _b.map((item) => ({
            userNumber: item.userNumber,
            userName: item.userName,
            passwords: item.passwords,
            mobile: item.mobile,
            email: item.email,
            authority_id: item.authority_id,
            address: item.address,
            createTime: item.createTime,
            admin: item.admin,
            errorLogin: item.errorLogin
          }))) || [];
          admins.value = accounts.value.filter((user2) => user2.authority_id === "admin" || user2.authority_id === "superadmin").map((user2) => ({
            value: user2.userNumber,
            // 使用userName作为value
            text: user2.userName
            // 使用userName作为显示文本
          }));
          authority.value = await getAuthority();
          user.value = await getUser();
          number.value = await getNumber();
          if (authority.value === "admin") {
            admins.value = [{ value: number.value, text: user.value }];
            newUser.value.admin = number.value;
          }
        } catch (error) {
          formatAppLog("error", "at pages/account/account.vue:523", "获取用户列表失败:", error);
          uni.showToast({
            title: "数据加载失败",
            icon: "none"
          });
        }
      });
      vue.onMounted(() => {
        (async () => {
          authority.value = await getAuthority();
          if (authority.value === "admin") {
            userTypes.value = [{ value: "user", text: "普通用户" }];
          }
        })();
      });
      const editPopup = vue.ref(null);
      const editUserData = vue.ref({
        userName: "",
        passwords: "",
        mobile: "",
        email: "",
        address: "",
        userNumber: "",
        authority_id: "",
        admin: ""
      });
      const edituser = () => {
        editUserData.value = JSON.parse(JSON.stringify(currentUser.value));
        editPopup.value.open();
      };
      const closeEditModal = () => {
        editPopup.value.close();
      };
      const handleEditSubmit = async () => {
        const requiredFields = ["userName", "passwords", "mobile"];
        const missingFields = requiredFields.filter((field) => !editUserData.value[field]);
        if (missingFields.length > 0) {
          uni.showToast({ title: "请填写所有必填项", icon: "none" });
          return;
        }
        uni.showModal({
          title: "确认修改",
          content: "确定要提交修改吗？",
          success: async (res) => {
            if (res.confirm) {
              try {
                const res2 = await updateUser(editUserData.value);
                if (res2.code === 200) {
                  uni.showToast({ title: "修改成功", icon: "success" });
                  const index = accounts.value.findIndex(
                    (item) => item.userNumber === editUserData.value.userNumber
                  );
                  if (index !== -1) {
                    currentUser.value = { ...editUserData.value };
                    accounts.value[index] = { ...editUserData.value };
                  }
                  closeEditModal();
                } else {
                  uni.showToast({ title: res2.message || "修改失败", icon: "none" });
                }
              } catch (error) {
                formatAppLog("error", "at pages/account/account.vue:597", "修改用户失败:", error);
                uni.showToast({ title: "修改失败，请重试", icon: "none" });
              }
            }
          }
        });
      };
      const deleteuser = () => {
        uni.showModal({
          title: "确认删除",
          content: `确定要删除用户 ${currentUser.value.userName} 吗？`,
          success: async (res) => {
            var _a;
            if (res.confirm) {
              try {
                const res2 = await deleteUser(currentUser.value.userNumber);
                if (res2.code === 200) {
                  uni.showToast({ title: "删除成功" });
                  const listRes = await fetchUserList();
                  accounts.value = ((_a = listRes.data) == null ? void 0 : _a.records) || [];
                  closeDetailModal();
                }
              } catch (error) {
                uni.showToast({ title: "删除失败", icon: "none" });
              }
            }
          }
        });
      };
      const __returned__ = { accounts, currentUser, searchKeyword, detailPopup, authority, user, number, filteredAccounts, handleSearch, handleClear, showDetailModal, closeDetailModal, addPopup, newUser, userTypes, admins, showAddModal, closeAddModal, handleAddSubmit, isAdminOrSale, editPopup, editUserData, edituser, closeEditModal, handleEditSubmit, deleteuser, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, watch: vue.watch, UniSearchBar, UniIcons, UniPopup, get fetchUserList() {
        return fetchUserList;
      }, get deleteUser() {
        return deleteUser;
      }, get updateUser() {
        return updateUser;
      }, get addUser() {
        return addUser;
      }, get getAuthority() {
        return getAuthority;
      }, get getUser() {
        return getUser;
      }, get getNumber() {
        return getNumber;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = vue.resolveComponent("uni-easyinput");
    const _component_uni_data_select = vue.resolveComponent("uni-data-select");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", {
        class: "float-btn",
        onClick: $setup.showAddModal
      }, [
        vue.createVNode($setup["UniIcons"], {
          type: "plusempty",
          size: "30",
          color: "#fff"
        })
      ]),
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
            var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k;
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
                    vue.createElementVNode("text", { class: "label" }, "密码："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_d = $setup.currentUser) == null ? void 0 : _d.passwords) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "联系电话："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_e2 = $setup.currentUser) == null ? void 0 : _e2.mobile) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "权限："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_f = $setup.currentUser) == null ? void 0 : _f.authority_id) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "地址："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_g = $setup.currentUser) == null ? void 0 : _g.address) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "电子邮箱："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_h = $setup.currentUser) == null ? void 0 : _h.email) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "创建时间："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_i = $setup.currentUser) == null ? void 0 : _i.createTime) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "info-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "所属账号："),
                    vue.createElementVNode(
                      "text",
                      { class: "value" },
                      vue.toDisplayString(((_j = $setup.currentUser) == null ? void 0 : _j.admin) || "暂无信息"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "action-buttons" }, [
                    vue.createElementVNode("button", {
                      class: "btn edit",
                      onClick: $setup.edituser
                    }, "修改信息"),
                    ((_k = $setup.currentUser) == null ? void 0 : _k.userName) !== "root" ? (vue.openBlock(), vue.createElementBlock("button", {
                      key: 0,
                      class: "btn delete",
                      onClick: $setup.deleteuser
                    }, "删除用户")) : vue.createCommentVNode("v-if", true)
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
      ),
      vue.createVNode(
        $setup["UniPopup"],
        {
          ref: "addPopup",
          type: "center"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "add-modal" }, [
              vue.createElementVNode("view", { class: "modal-header" }, [
                vue.createElementVNode("text", { class: "title" }, "添加用户"),
                vue.createVNode($setup["UniIcons"], {
                  type: "closeempty",
                  size: "20",
                  color: "#666",
                  onClick: $setup.closeAddModal
                })
              ]),
              vue.createElementVNode("view", { class: "form-content" }, [
                vue.createCommentVNode(" 用户名 "),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 用户名"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.newUser.userName,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.newUser.userName = $event),
                    placeholder: "请输入用户名"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createCommentVNode(" 密码 "),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 密码"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.newUser.passwords,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newUser.passwords = $event),
                    placeholder: "请输入密码"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createCommentVNode(" 用户类型 "),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 用户类型"),
                  vue.createVNode(_component_uni_data_select, {
                    modelValue: $setup.newUser.authority_id,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newUser.authority_id = $event),
                    placeholder: "请选择用户类型",
                    localdata: $setup.userTypes
                  }, null, 8, ["modelValue", "localdata"])
                ]),
                vue.createCommentVNode(" 所属管理员 "),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 所属管理员"),
                  vue.createVNode(_component_uni_data_select, {
                    modelValue: $setup.newUser.admin,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newUser.admin = $event),
                    placeholder: "请选择所属管理员",
                    localdata: $setup.admins,
                    disabled: $setup.isAdminOrSale,
                    clear: !$setup.isAdminOrSale
                  }, null, 8, ["modelValue", "localdata", "disabled", "clear"])
                ]),
                vue.createCommentVNode(" 其他字段（示例：联系方式） "),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 联系方式"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.newUser.mobile,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.newUser.mobile = $event),
                    placeholder: "请输入手机号",
                    type: "number"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 用户邮箱"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.newUser.email,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.newUser.email = $event),
                    placeholder: "请输入用户邮箱"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 联系地址"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.newUser.address,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.newUser.address = $event),
                    placeholder: "请输入联系地址"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 用户编号"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.newUser.userNumber,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.newUser.userNumber = $event),
                    placeholder: "请输入用户编号",
                    type: "number"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createCommentVNode(" 提交按钮 "),
                vue.createElementVNode("view", { class: "modal-footer" }, [
                  vue.createElementVNode("button", {
                    class: "btn cancel",
                    onClick: $setup.closeAddModal
                  }, "取消"),
                  vue.createElementVNode("button", {
                    class: "btn confirm",
                    onClick: $setup.handleAddSubmit
                  }, "确定添加")
                ])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createCommentVNode(" 编辑弹窗 "),
      vue.createVNode(
        $setup["UniPopup"],
        {
          ref: "editPopup",
          type: "center"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "edit-modal" }, [
              vue.createElementVNode("view", { class: "modal-header" }, [
                vue.createElementVNode("text", { class: "title" }, "编辑用户"),
                vue.createVNode($setup["UniIcons"], {
                  type: "closeempty",
                  size: "20",
                  color: "#666",
                  onClick: $setup.closeEditModal
                })
              ]),
              vue.createElementVNode("view", { class: "form-content" }, [
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 用户编号"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.editUserData.userNumber,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.editUserData.userNumber = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 权限"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.editUserData.authority_id,
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.editUserData.authority_id = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 所属管理员"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.editUserData.admin,
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.editUserData.admin = $event),
                    disabled: true
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 用户名"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.editUserData.userName,
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.editUserData.userName = $event),
                    placeholder: "请输入用户名"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 密码"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.editUserData.passwords,
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.editUserData.passwords = $event),
                    placeholder: "请输入密码"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 手机号"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.editUserData.mobile,
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.editUserData.mobile = $event),
                    placeholder: "请输入密码"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 邮箱"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.editUserData.email,
                    "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.editUserData.email = $event),
                    placeholder: "请输入邮箱"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "form-item" }, [
                  vue.createElementVNode("text", { class: "label" }, "* 地址"),
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.editUserData.address,
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.editUserData.address = $event),
                    placeholder: "请输入地址"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "modal-footer" }, [
                  vue.createElementVNode("button", {
                    class: "btn cancel",
                    onClick: $setup.closeEditModal
                  }, "取消"),
                  vue.createElementVNode("button", {
                    class: "btn confirm",
                    onClick: $setup.handleEditSubmit
                  }, "提交修改")
                ])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesAccountAccount = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-8cce343a"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/account/account.vue"]]);
  const _imports_0$1 = "/static/card.png";
  const _sfc_main$7 = {
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
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
                src: _imports_0$1
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
  const PagesRechargeRecordRechargeRecord = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/recharge-record/recharge-record.vue"]]);
  const _sfc_main$6 = {
    __name: "setting",
    setup(__props, { expose: __expose }) {
      __expose();
      const isAlertOn = vue.ref(false);
      function toggleAlert(e2) {
        isAlertOn.value = e2.detail.value;
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
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesSettingSetting = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/setting/setting.vue"]]);
  const _sfc_main$5 = {
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesRemoteChargeRemoteCharge = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/remote-charge/remote-charge.vue"]]);
  const _sfc_main$4 = {
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesChangePasswordChangePassword = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/change-password/change-password.vue"]]);
  const _sfc_main$3 = {
    __name: "add-station",
    setup(__props, { expose: __expose }) {
      __expose();
      const formData = vue.ref({
        stationName: "",
        company: "",
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
      };
      const selectedLocation = vue.ref(null);
      const goToMap = () => {
        uni.navigateTo({
          url: "/pages/select-location/select-location",
          events: {
            // 接收从地图页面返回的数据
            acceptLocation: (data) => {
              selectedLocation.value = data;
              formData.value.longitude = selectedLocation.value.longitude;
              formData.value.latitude = selectedLocation.value.latitude;
            }
          },
          success: (res) => {
            mapPageEventChannel2 = res.eventChannel;
          }
        });
      };
      let mapPageEventChannel2 = null;
      const submitForm = () => {
        if (!formData.value.stationName) {
          uni.showToast({
            title: "请输入换热站名称",
            icon: "none"
          });
          return;
        }
        if (!formData.value.company) {
          uni.showToast({
            title: "请输入所属公司",
            icon: "none"
          });
          return;
        }
        if (!formData.value.userName) {
          uni.showToast({
            title: "请输入站内负责人",
            icon: "none"
          });
          return;
        }
        if (!formData.value.phone) {
          uni.showToast({
            title: "请输入联系方式",
            icon: "none"
          });
          return;
        }
        if (!formData.value.latitude) {
          uni.showToast({
            title: "请输入完整的经纬度",
            icon: "none"
          });
          return;
        }
        if (!formData.value.longitude) {
          uni.showToast({
            title: "请输入完整的经纬度",
            icon: "none"
          });
          return;
        }
        if (!formData.value.address) {
          uni.showToast({
            title: "请输入换热站地址",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "提交中..."
        });
        addStation(formData.value).then((res) => {
          setTimeout(() => {
            uni.hideLoading();
            uni.showToast({
              title: "提交成功",
              icon: "success"
            });
            uni.navigateTo({
              url: "/pages/company-stationList/company-stationList"
            });
          }, 1500);
        });
      };
      vue.onMounted(() => {
        getDevice().then((res) => {
          formData.value.company = res;
        });
      });
      const __returned__ = { formData, companies, rules, getLocation, selectedLocation, goToMap, get mapPageEventChannel() {
        return mapPageEventChannel2;
      }, set mapPageEventChannel(v2) {
        mapPageEventChannel2 = v2;
      }, submitForm, onMounted: vue.onMounted, ref: vue.ref, get onLoad() {
        return onLoad;
      }, get getDevice() {
        return getDevice;
      }, get addStation() {
        return addStation;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = vue.resolveComponent("uni-easyinput");
    const _component_uni_forms_item = vue.resolveComponent("uni-forms-item");
    const _component_uni_forms = vue.resolveComponent("uni-forms");
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
                    onClick: $setup.goToMap
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
  const PagesAddStationAddStation = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/add-station/add-station.vue"]]);
  const _sfc_main$2 = {
    __name: "select-location",
    setup(__props, { expose: __expose }) {
      __expose();
      const latitude = vue.ref(39.909);
      const longitude = vue.ref(116.404);
      const markers = vue.ref([]);
      const selectedPoint = vue.ref(null);
      const handleMapTap = (e2) => {
        selectedPoint.value = e2.detail;
        markers.value = [{
          id: 1,
          latitude: e2.detail.latitude,
          longitude: e2.detail.longitude,
          iconPath: "../../static/maker.png",
          title: "选择的位置"
        }];
      };
      const confirmLocation = () => {
        if (selectedPoint.value) {
          const pages2 = getCurrentPages();
          const currentPage = pages2[pages2.length - 1];
          const eventChannel = currentPage.getOpenerEventChannel();
          eventChannel.emit("acceptLocation", {
            latitude: selectedPoint.value.latitude,
            longitude: selectedPoint.value.longitude
          });
          uni.navigateBack();
        } else {
          uni.showToast({
            title: "请先点击地图选择位置",
            icon: "none"
          });
        }
      };
      const getLocation = () => {
        uni.getLocation({
          type: "wgs84",
          // 坐标类型（wgs84返回gps坐标，gcj02返回国测局坐标）
          altitude: true,
          // 获取高度信息（需要设备支持）
          success: (res) => {
            latitude.value = res.latitude;
            longitude.value = res.longitude;
            markers.value = [{
              id: 1,
              latitude: latitude.value,
              longitude: longitude.value,
              iconPath: "../../static/maker.png",
              width: 10,
              height: 10,
              anchor: { x: 0.5, y: 1 }
            }];
            selectedPoint.value = {
              latitude,
              longitude
            };
          },
          fail: (err) => {
            formatAppLog("error", "at pages/select-location/select-location.vue:84", "定位失败:", err);
            uni.showToast({
              title: "获取位置失败，请检查定位权限",
              icon: "none"
            });
          }
        });
      };
      vue.onMounted(() => {
        getLocation();
      });
      const __returned__ = { latitude, longitude, markers, selectedPoint, handleMapTap, confirmLocation, getLocation, onMounted: vue.onMounted, ref: vue.ref, get onLoad() {
        return onLoad;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("map", {
        id: "myMap",
        style: { "width": "100%", "height": "80vh" },
        latitude: $setup.latitude,
        longitude: $setup.longitude,
        markers: $setup.markers,
        onTap: $setup.handleMapTap
      }, null, 40, ["latitude", "longitude", "markers"]),
      vue.createElementVNode("br"),
      $setup.selectedPoint ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "coordinate-info"
        },
        " 经度: " + vue.toDisplayString($setup.selectedPoint.longitude.toFixed(6)) + " 纬度: " + vue.toDisplayString($setup.selectedPoint.latitude.toFixed(6)),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("button", { onClick: $setup.confirmLocation }, "确认选择")
    ]);
  }
  const PagesSelectLocationSelectLocation = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/select-location/select-location.vue"]]);
  /*!
    * vue-router v4.3.0
    * (c) 2024 Eduardo San Martin Morote
    * @license MIT
    */
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  var NavigationFailureType;
  (function(NavigationFailureType2) {
    NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
    NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
    NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
  })(NavigationFailureType || (NavigationFailureType = {}));
  const routeLocationKey = Symbol("route location");
  function useRoute() {
    return vue.inject(routeLocationKey);
  }
  const _imports_0 = "/static/station_icon.png";
  const _sfc_main$1 = {
    __name: "company-stationList",
    setup(__props, { expose: __expose }) {
      __expose();
      const list = vue.ref([]);
      const currentDevice = vue.ref(null);
      const detailPopup = vue.ref(null);
      const showDetailModal = (device) => {
        currentDevice.value = {
          ...device,
          location: `经度：${device.longitude}
纬度：${device.latitude}`
        };
        detailPopup.value.open();
      };
      const viewDeviceDetail = () => {
        uni.navigateTo({
          url: "/pages/add-station/add-station"
        });
      };
      const closeDetailModal = () => {
        detailPopup.value.close(() => {
          currentDevice.value = null;
        });
      };
      const query = vue.ref(null);
      {
        getDevice().then((res) => {
          fetchStationList(res).then((res2) => {
            list.value.push(...res2.data);
            formatAppLog("log", "at pages/company-stationList/company-stationList.vue:277", res2.data);
          });
        });
      }
      const deletestation = async () => {
        const modalResult = await uni.showModal({
          title: "确认删除",
          content: `确定要删除换热站【${currentDevice.value.stationName}】吗？`
        }).catch(() => ({ confirm: false }));
        if (!modalResult.confirm)
          return;
        try {
          const res = await deleteStation(currentDevice.value.stationName);
          if (res.code === 200) {
            uni.showToast({ title: "删除成功", icon: "success" });
            closeDetailModal();
            getDevice().then((res2) => {
              fetchStationList(res2).then((res3) => {
                list.value = [];
                list.value.push(...res3.data);
                formatAppLog("log", "at pages/company-stationList/company-stationList.vue:304", res3.data);
              });
            });
          } else {
            uni.showToast({ title: res.message || "删除失败", icon: "none" });
          }
        } catch (error) {
          formatAppLog("error", "at pages/company-stationList/company-stationList.vue:311", "删除失败:", error);
          uni.showToast({ title: "删除失败，请重试", icon: "none" });
        }
      };
      const deviceForm = vue.ref({
        deviceName: "",
        deviceNumber: "",
        type: "预付费",
        uploadTime: 5,
        alarm: true,
        installDate: "",
        companyName: "",
        switchState: true,
        onlineState: true,
        deviceStation: "",
        temp1In: "",
        temp2Out: ""
      });
      const devicePopup = vue.ref(null);
      const showDeviceForm = () => {
        devicePopup.value.open();
        formatAppLog("log", "at pages/company-stationList/company-stationList.vue:336", currentDevice);
        getDevice().then((res) => {
          deviceForm.value.companyName = res;
        });
        formatAppLog("log", "at pages/company-stationList/company-stationList.vue:340", currentDevice.stationName);
        deviceForm.value.deviceStation = currentDevice.value.stationName;
      };
      const closeDeviceForm = () => {
        devicePopup.value.close(() => {
          deviceForm.value = null;
        });
      };
      const submitDeviceForm = async () => {
        const requiredFields = [
          "deviceName",
          "deviceNumber",
          "temp1In",
          "temp2Out"
        ];
        const missingFields = requiredFields.filter((field) => !deviceForm.value[field]);
        if (missingFields.length > 0) {
          uni.showToast({
            title: `请填写${missingFields.map((f2) => `【${f2}】`).join("、")}`,
            icon: "none"
          });
          return;
        }
        const [confirmError] = await uni.showModal({
          title: "确认添加设备",
          content: `确定要添加设备【${deviceForm.value.deviceName}】吗？`
        }).catch(() => ({ confirm: false }));
        if (!(confirmError == null ? void 0 : confirmError.confirm))
          return;
        try {
          const params = {
            deviceName: deviceForm.value.deviceName,
            deviceNumber: deviceForm.value.deviceNumber,
            type: deviceForm.value.type,
            uploadTime: deviceForm.value.uploadTime,
            alarm: deviceForm.value.alarm ? "true" : "false",
            installDate: deviceForm.value.installDate,
            company: deviceForm.value.companyName,
            switchState: deviceForm.value.switchState ? "true" : "false",
            onlineState: deviceForm.value.onlineState ? "true" : "false",
            deviceStation: deviceForm.value.deviceStation,
            temp1In: deviceForm.value.temp1In,
            temp2Out: deviceForm.value.temp2Out
          };
          formatAppLog("log", "at pages/company-stationList/company-stationList.vue:389", "提交参数:", params);
          const res = await addDevice(params);
          if (res.code === 200) {
            uni.showToast({ title: "添加成功", icon: "success" });
            closeDeviceForm();
          } else {
            uni.showToast({
              title: res.message || "添加失败",
              icon: "none",
              duration: 2e3
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/company-stationList/company-stationList.vue:404", "添加设备失败:", error);
          uni.showToast({
            title: "请求失败，请检查网络",
            icon: "none",
            duration: 2e3
          });
        }
      };
      const editForm = vue.ref({
        stationName: "",
        company: "",
        userName: "",
        phone: "",
        longitude: "",
        latitude: "",
        address: "",
        detail: ""
      });
      const editPopup = vue.ref(null);
      const updatestation = () => {
        editForm.value = {
          ...currentDevice.value
        };
        editPopup.value.open();
      };
      const closeEditModal = () => {
        editPopup.value.close(() => {
          editForm.value = null;
        });
      };
      const selectedLocation = vue.ref(null);
      const chooseLocation = async () => {
        uni.navigateTo({
          url: "/pages/select-location/select-location",
          events: {
            // 接收从地图页面返回的数据
            acceptLocation: (data) => {
              selectedLocation.value = data;
              editForm.value.longitude = selectedLocation.value.longitude;
              editForm.value.latitude = selectedLocation.value.latitude;
            }
          },
          success: (res) => {
            mapPageEventChannel = res.eventChannel;
          }
        });
      };
      const submitEdit = async () => {
        var _a, _b;
        const requiredFields = [
          { field: "userName", name: "负责人" },
          { field: "phone", name: "联系方式" },
          { field: "address", name: "地址" },
          { field: "detail", name: "换热站简介" }
        ];
        const missing = requiredFields.filter((f2) => !editForm.value[f2.field]);
        if (missing.length > 0) {
          uni.showToast({
            title: `请填写${missing.map((f2) => f2.name).join("、")}`,
            icon: "none"
          });
          return;
        }
        const confirmRes = await uni.showModal({
          title: "确认修改",
          content: `确认要修改${editForm.value.stationName}换热站的信息吗`,
          confirmText: "确认",
          cancelText: "取消"
        });
        if (!confirmRes.confirm) {
          return;
        }
        try {
          const params = { ...editForm.value };
          formatAppLog("log", "at pages/company-stationList/company-stationList.vue:491", params);
          const res = await updateStation(params);
          if (res.code === 200) {
            uni.showToast({ title: "修改成功", icon: "success" });
            closeEditModal();
            currentDevice.value = params;
            getDevice().then((res2) => {
              fetchStationList(res2).then((res3) => {
                list.value = [];
                list.value.push(...res3.data);
                formatAppLog("log", "at pages/company-stationList/company-stationList.vue:502", res3.data);
              });
            });
          }
        } catch (error) {
          uni.showToast({
            title: "修改失败，" + (((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.msg) || "请检查网络"),
            icon: "none"
          });
        }
      };
      const getReverseGeocoding = async (lng, lat) => {
        try {
          const res = await uni.request({
            url: "https://restapi.amap.com/v3/geocode/regeo",
            data: {
              key: "YOUR_MAP_KEY",
              location: `${lng},${lat}`
            }
          });
          editForm.value.address = res.data.regeocode.formatted_address;
        } catch (error) {
          formatAppLog("error", "at pages/company-stationList/company-stationList.vue:526", "逆地理编码失败:", error);
        }
      };
      const __returned__ = { list, currentDevice, detailPopup, showDetailModal, viewDeviceDetail, closeDetailModal, query, deletestation, deviceForm, devicePopup, showDeviceForm, closeDeviceForm, submitDeviceForm, editForm, editPopup, updatestation, closeEditModal, selectedLocation, chooseLocation, submitEdit, getReverseGeocoding, getCurrentInstance: vue.getCurrentInstance, onMounted: vue.onMounted, ref: vue.ref, get fetchStationList() {
        return fetchStationList;
      }, get deleteStation() {
        return deleteStation;
      }, get addDevice() {
        return addDevice;
      }, get updateStation() {
        return updateStation;
      }, get useRoute() {
        return useRoute;
      }, get getDevice() {
        return getDevice;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = vue.resolveComponent("uni-icons");
    const _component_uni_popup = vue.resolveComponent("uni-popup");
    const _component_uni_easyinput = vue.resolveComponent("uni-easyinput");
    const _component_uni_datetime_picker = vue.resolveComponent("uni-datetime-picker");
    const _component_uni_number_box = vue.resolveComponent("uni-number-box");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("button", {
              class: "add",
              onClick: $setup.viewDeviceDetail
            }, "+添加换热站")
          ]),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "device-list"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.list, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "device-item",
                  key: index,
                  onClick: ($event) => $setup.showDetailModal(item)
                }, [
                  vue.createElementVNode("view", { class: "device-content" }, [
                    vue.createElementVNode("image", {
                      class: "device-icon",
                      src: _imports_0
                    }),
                    vue.createElementVNode("view", { class: "device-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "device-name" },
                        vue.toDisplayString(item.stationName),
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
          ])
        ]),
        vue.createVNode(
          _component_uni_popup,
          {
            ref: "detailPopup",
            type: "center"
          },
          {
            default: vue.withCtx(() => {
              var _a, _b, _c, _d, _e2, _f, _g, _h;
              return [
                vue.createElementVNode("view", { class: "modal-content" }, [
                  vue.createElementVNode("view", { class: "modal-header" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "modal-title" },
                      vue.toDisplayString((_a = $setup.currentDevice) == null ? void 0 : _a.stationName),
                      1
                      /* TEXT */
                    ),
                    vue.createVNode(_component_uni_icons, {
                      type: "closeempty",
                      size: "20",
                      color: "#666",
                      onClick: $setup.closeDetailModal
                    })
                  ]),
                  vue.createElementVNode("view", { class: "modal-body" }, [
                    vue.createElementVNode("view", { class: "info-item" }, [
                      vue.createElementVNode("text", { class: "label" }, "地址："),
                      vue.createElementVNode(
                        "text",
                        { class: "value" },
                        vue.toDisplayString(((_b = $setup.currentDevice) == null ? void 0 : _b.address) || "暂无信息"),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "info-item" }, [
                      vue.createElementVNode("text", { class: "label" }, "所属公司："),
                      vue.createElementVNode(
                        "text",
                        { class: "value" },
                        vue.toDisplayString(((_c = $setup.currentDevice) == null ? void 0 : _c.company) || "暂无信息"),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "info-item" }, [
                      vue.createElementVNode("text", { class: "label" }, "负责人："),
                      vue.createElementVNode(
                        "text",
                        { class: "value" },
                        vue.toDisplayString(((_d = $setup.currentDevice) == null ? void 0 : _d.userName) || "暂无信息"),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "info-item" }, [
                      vue.createElementVNode("text", { class: "label" }, "联系方式："),
                      vue.createElementVNode(
                        "text",
                        { class: "value" },
                        vue.toDisplayString(((_e2 = $setup.currentDevice) == null ? void 0 : _e2.phone) || "暂无信息"),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "info-item" }, [
                      vue.createElementVNode("text", { class: "label" }, "位置信息："),
                      vue.createElementVNode(
                        "text",
                        { class: "value" },
                        vue.toDisplayString(((_f = $setup.currentDevice) == null ? void 0 : _f.location) || "暂无信息"),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "info-item" }, [
                      vue.createElementVNode("text", { class: "label" }, "站点地址："),
                      vue.createElementVNode(
                        "text",
                        { class: "value" },
                        vue.toDisplayString(((_g = $setup.currentDevice) == null ? void 0 : _g.address) || "暂无信息"),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "info-item" }, [
                      vue.createElementVNode("text", { class: "label" }, "站点简介："),
                      vue.createElementVNode(
                        "text",
                        { class: "value" },
                        vue.toDisplayString(((_h = $setup.currentDevice) == null ? void 0 : _h.detail) || "暂无信息"),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "action-buttons" }, [
                      vue.createElementVNode("button", {
                        class: "btn heat-station",
                        onClick: $setup.showDeviceForm
                      }, "添加设备"),
                      vue.createElementVNode("button", {
                        class: "btn edit",
                        onClick: $setup.updatestation
                      }, "修改信息"),
                      vue.createElementVNode("button", {
                        class: "btn delete",
                        onClick: $setup.deletestation
                      }, "删除换热站")
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
        ),
        vue.createCommentVNode(" 添加设备弹窗 "),
        vue.createVNode(
          _component_uni_popup,
          {
            ref: "devicePopup",
            type: "center"
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "device-form" }, [
                vue.createElementVNode("view", { class: "form-header" }, [
                  vue.createElementVNode("text", { class: "title" }, "添加设备"),
                  vue.createVNode(_component_uni_icons, {
                    type: "closeempty",
                    size: "20",
                    onClick: $setup.closeDeviceForm
                  })
                ]),
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "",
                  class: "form-body"
                }, [
                  vue.createCommentVNode(" 设备名称 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 设备名称"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.deviceForm.deviceName,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.deviceForm.deviceName = $event),
                      placeholder: "请输入设备名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 设备序列号 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 设备序列号"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.deviceForm.deviceNumber,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.deviceForm.deviceNumber = $event),
                      placeholder: "请输入设备序列号"
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 设备类型 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 设备类型"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.deviceForm.type,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.deviceForm.type = $event)
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 开启提醒 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "开启提醒"),
                    vue.createElementVNode("view", { class: "switch-wrapper" }, [
                      vue.createElementVNode("switch", {
                        checked: $setup.deviceForm.alarm,
                        onChange: _cache[3] || (_cache[3] = (val) => $setup.deviceForm.alarm = val.detail.value)
                      }, null, 40, ["checked"])
                    ])
                  ]),
                  vue.createCommentVNode(" 安装日期 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 安装日期"),
                    vue.createVNode(_component_uni_datetime_picker, {
                      modelValue: $setup.deviceForm.installDate,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.deviceForm.installDate = $event),
                      type: "date",
                      "show-time": false
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 所属企业 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 所属企业"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.deviceForm.companyName,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.deviceForm.companyName = $event),
                      disabled: true
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 上传间隔 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 上传间隔（分钟）"),
                    vue.createVNode(_component_uni_number_box, {
                      modelValue: $setup.deviceForm.uploadTime,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.deviceForm.uploadTime = $event),
                      min: 1,
                      max: 60
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 开关状态 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "开关状态"),
                    vue.createElementVNode("view", { class: "switch-wrapper" }, [
                      vue.createElementVNode("switch", {
                        checked: $setup.deviceForm.switchState,
                        onChange: _cache[7] || (_cache[7] = (val) => $setup.deviceForm.switchState = val.detail.value)
                      }, null, 40, ["checked"])
                    ])
                  ]),
                  vue.createCommentVNode(" 联网状态 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "联网状态"),
                    vue.createElementVNode("view", { class: "switch-wrapper" }, [
                      vue.createElementVNode("switch", {
                        checked: $setup.deviceForm.onlineState,
                        onChange: _cache[8] || (_cache[8] = (val) => $setup.deviceForm.onlineState = val.detail.value)
                      }, null, 40, ["checked"])
                    ])
                  ]),
                  vue.createCommentVNode(" 所属换热站 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 所属换热站"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.deviceForm.deviceStation,
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.deviceForm.deviceStation = $event),
                      disabled: true
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 温度计信息 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 一网回水温度计"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.deviceForm.temp1In,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.deviceForm.temp1In = $event),
                      placeholder: "请输入一网回水温度计序列号"
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 二网供水温度计"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.deviceForm.temp2Out,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.deviceForm.temp2Out = $event),
                      placeholder: "请输入一网回水温度计序列号"
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 操作按钮 "),
                  vue.createElementVNode("view", { class: "form-footer" }, [
                    vue.createElementVNode("button", {
                      class: "btn cancel",
                      onClick: $setup.closeDeviceForm
                    }, "取消"),
                    vue.createElementVNode("button", {
                      class: "btn confirm",
                      onClick: $setup.submitDeviceForm
                    }, "确定")
                  ])
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createCommentVNode(" 新增修改信息弹窗 "),
        vue.createVNode(
          _component_uni_popup,
          {
            ref: "editPopup",
            type: "center"
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "device-form" }, [
                vue.createElementVNode("view", { class: "form-header" }, [
                  vue.createElementVNode("text", { class: "title" }, "修改换热站信息"),
                  vue.createVNode(_component_uni_icons, {
                    type: "closeempty",
                    size: "20",
                    color: "#666",
                    onClick: $setup.closeEditModal
                  })
                ]),
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "",
                  class: "form-body"
                }, [
                  vue.createCommentVNode(" 换热站名称 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 换热站名称"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.editForm.stationName,
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.editForm.stationName = $event),
                      disabled: true
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 所属公司 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 所属公司"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.editForm.company,
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.editForm.company = $event),
                      disabled: true
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 负责人 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 站内负责人"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.editForm.userName,
                      "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.editForm.userName = $event),
                      placeholder: "请输入负责人"
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 联系方式 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 联系方式"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.editForm.phone,
                      "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.editForm.phone = $event),
                      placeholder: "请输入电话"
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 经纬度 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 经纬度"),
                    vue.createElementVNode("view", { class: "location-picker" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        "经度：" + vue.toDisplayString($setup.editForm.longitude || "未选择"),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        null,
                        "纬度：" + vue.toDisplayString($setup.editForm.latitude || "未选择"),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("button", {
                        class: "mini-btn",
                        onClick: $setup.chooseLocation
                      }, "选择位置")
                    ])
                  ]),
                  vue.createCommentVNode(" 地址 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 换热站地址"),
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.editForm.address,
                      "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.editForm.address = $event),
                      disabled: true
                    }, null, 8, ["modelValue"]),
                    $setup.editForm.longitude ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "tip"
                    }, "地址已通过经纬度自动填充")) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createCommentVNode(" 简介 "),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "* 换热站简介"),
                    vue.createVNode(_component_uni_easyinput, {
                      type: "textarea",
                      modelValue: $setup.editForm.detail,
                      "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.editForm.detail = $event),
                      placeholder: "请输入简介"
                    }, null, 8, ["modelValue"])
                  ]),
                  vue.createCommentVNode(" 操作按钮 "),
                  vue.createElementVNode("view", { class: "action-buttons" }, [
                    vue.createElementVNode("button", {
                      class: "btn cancel",
                      onClick: $setup.closeEditModal
                    }, "取消"),
                    vue.createElementVNode("button", {
                      class: "btn confirm",
                      onClick: $setup.submitEdit
                    }, "确定")
                  ])
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesCompanyStationListCompanyStationList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-de55059f"], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/company-stationList/company-stationList.vue"]]);
  __definePage("pages/chart/chart", PagesChartChart);
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
  __definePage("pages/company-stationList/company-stationList", PagesCompanyStationListCompanyStationList);
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
