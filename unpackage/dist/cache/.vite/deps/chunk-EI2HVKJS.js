import {
  es_exports,
  es_exports2,
  esm_exports,
  esm_exports2,
  fecha_exports,
  init_es,
  init_es2,
  init_esm,
  init_esm2,
  init_fecha,
  init_tslib_es6,
  require_regenerator,
  require_typeof,
  tslib_es6_exports
} from "./chunk-6MO5ERXV.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-6MT7EBHR.js";

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/interopRequireDefault.js"(exports, module) {
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : {
        "default": e
      };
    }
    module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/register.js
var require_register = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/register.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getTickMethod = getTickMethod;
    exports.registerTickMethod = registerTickMethod;
    var methodCache = {};
    function getTickMethod(key) {
      return methodCache[key];
    }
    function registerTickMethod(key, method) {
      methodCache[key] = method;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/base.js
var require_base = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/base.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _register = require_register();
    var Scale = (
      /** @class */
      function() {
        function Scale2(cfg) {
          this.type = "base";
          this.isCategory = false;
          this.isLinear = false;
          this.isContinuous = false;
          this.isIdentity = false;
          this.values = [];
          this.range = [0, 1];
          this.ticks = [];
          this.__cfg__ = cfg;
          this.initCfg();
          this.init();
        }
        Scale2.prototype.translate = function(v) {
          return v;
        };
        Scale2.prototype.change = function(cfg) {
          (0, _util.assign)(this.__cfg__, cfg);
          this.init();
        };
        Scale2.prototype.clone = function() {
          return this.constructor(this.__cfg__);
        };
        Scale2.prototype.getTicks = function() {
          var _this = this;
          return (0, _util.map)(this.ticks, function(tick, idx) {
            if ((0, _util.isObject)(tick)) {
              return tick;
            }
            return {
              text: _this.getText(tick, idx),
              tickValue: tick,
              value: _this.scale(tick)
              // scaled
            };
          });
        };
        Scale2.prototype.getText = function(value, key) {
          var formatter = this.formatter;
          var res = formatter ? formatter(value, key) : value;
          if ((0, _util.isNil)(res) || !(0, _util.isFunction)(res.toString)) {
            return "";
          }
          return res.toString();
        };
        Scale2.prototype.getConfig = function(key) {
          return this.__cfg__[key];
        };
        Scale2.prototype.init = function() {
          (0, _util.assign)(this, this.__cfg__);
          this.setDomain();
          if ((0, _util.isEmpty)(this.getConfig("ticks"))) {
            this.ticks = this.calculateTicks();
          }
        };
        Scale2.prototype.initCfg = function() {
        };
        Scale2.prototype.setDomain = function() {
        };
        Scale2.prototype.calculateTicks = function() {
          var tickMethod = this.tickMethod;
          var ticks = [];
          if ((0, _util.isString)(tickMethod)) {
            var method = (0, _register.getTickMethod)(tickMethod);
            if (!method) {
              throw new Error("There is no method to to calculate ticks!");
            }
            ticks = method(this);
          } else if ((0, _util.isFunction)(tickMethod)) {
            ticks = tickMethod(this);
          }
          return ticks;
        };
        Scale2.prototype.rangeMin = function() {
          return this.range[0];
        };
        Scale2.prototype.rangeMax = function() {
          return this.range[1];
        };
        Scale2.prototype.calcPercent = function(value, min, max) {
          if ((0, _util.isNumber)(value)) {
            return (value - min) / (max - min);
          }
          return NaN;
        };
        Scale2.prototype.calcValue = function(percent, min, max) {
          return min + percent * (max - min);
        };
        return Scale2;
      }()
    );
    var _default = exports.default = Scale;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/category/base.js
var require_base2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/category/base.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _base = _interopRequireDefault(require_base());
    var Category = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Category2, _super);
        function Category2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "cat";
          _this.isCategory = true;
          return _this;
        }
        Category2.prototype.buildIndexMap = function() {
          if (!this.translateIndexMap) {
            this.translateIndexMap = /* @__PURE__ */ new Map();
            for (var i = 0; i < this.values.length; i++) {
              this.translateIndexMap.set(this.values[i], i);
            }
          }
        };
        Category2.prototype.translate = function(value) {
          this.buildIndexMap();
          var idx = this.translateIndexMap.get(value);
          if (idx === void 0) {
            idx = (0, _util.isNumber)(value) ? value : NaN;
          }
          return idx;
        };
        Category2.prototype.scale = function(value) {
          var order = this.translate(value);
          var percent = this.calcPercent(order, this.min, this.max);
          return this.calcValue(percent, this.rangeMin(), this.rangeMax());
        };
        Category2.prototype.invert = function(scaledValue) {
          var domainRange = this.max - this.min;
          var percent = this.calcPercent(scaledValue, this.rangeMin(), this.rangeMax());
          var idx = Math.round(domainRange * percent) + this.min;
          if (idx < this.min || idx > this.max) {
            return NaN;
          }
          return this.values[idx];
        };
        Category2.prototype.getText = function(value) {
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
          }
          var v = value;
          if ((0, _util.isNumber)(value) && !this.values.includes(value)) {
            v = this.values[v];
          }
          return _super.prototype.getText.apply(this, (0, _tslib.__spreadArray)([v], args, false));
        };
        Category2.prototype.initCfg = function() {
          this.tickMethod = "cat";
        };
        Category2.prototype.setDomain = function() {
          if ((0, _util.isNil)(this.getConfig("min"))) {
            this.min = 0;
          }
          if ((0, _util.isNil)(this.getConfig("max"))) {
            var size = this.values.length;
            this.max = size > 1 ? size - 1 : size;
          }
          if (this.translateIndexMap) {
            this.translateIndexMap = void 0;
          }
        };
        return Category2;
      }(_base.default)
    );
    var _default = exports.default = Category;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/bisector.js
var require_bisector = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/bisector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function _default(getter) {
      return function(a, x, _lo, _hi) {
        var lo = (0, _util.isNil)(_lo) ? 0 : _lo;
        var hi = (0, _util.isNil)(_hi) ? a.length : _hi;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (getter(a[mid]) > x) {
            hi = mid;
          } else {
            lo = mid + 1;
          }
        }
        return lo;
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/time.js
var require_time = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/time.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.YEAR = exports.SECOND = exports.MONTH = exports.MINUTE = exports.HOUR = exports.DAY = void 0;
    exports.getTickInterval = getTickInterval;
    exports.timeFormat = timeFormat;
    exports.toTimeStamp = toTimeStamp;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _fecha = (init_fecha(), __toCommonJS(fecha_exports));
    var _bisector = _interopRequireDefault(require_bisector());
    function timeFormat(time, mask) {
      return (0, _fecha.format)(time, mask);
    }
    function toTimeStamp(value) {
      if ((0, _util.isString)(value)) {
        if (value.indexOf("T") > 0) {
          value = new Date(value).getTime();
        } else {
          value = new Date(value.replace(/-/gi, "/")).getTime();
        }
      }
      if ((0, _util.isDate)(value)) {
        value = value.getTime();
      }
      return value;
    }
    var SECOND = exports.SECOND = 1e3;
    var MINUTE = exports.MINUTE = 60 * SECOND;
    var HOUR = exports.HOUR = 60 * MINUTE;
    var DAY = exports.DAY = 24 * HOUR;
    var MONTH = exports.MONTH = DAY * 31;
    var YEAR = exports.YEAR = DAY * 365;
    var intervals = [
      ["HH:mm:ss", SECOND],
      ["HH:mm:ss", SECOND * 10],
      ["HH:mm:ss", SECOND * 30],
      ["HH:mm", MINUTE],
      ["HH:mm", MINUTE * 10],
      ["HH:mm", MINUTE * 30],
      ["HH", HOUR],
      ["HH", HOUR * 6],
      ["HH", HOUR * 12],
      ["YYYY-MM-DD", DAY],
      ["YYYY-MM-DD", DAY * 4],
      ["YYYY-WW", DAY * 7],
      ["YYYY-MM", MONTH],
      ["YYYY-MM", MONTH * 4],
      ["YYYY-MM", MONTH * 6],
      ["YYYY", DAY * 380]
      // 借鉴echarts，保证每个周期累加时不会碰到恰巧不够的问题
    ];
    function getTickInterval(min, max, tickCount) {
      var target = (max - min) / tickCount;
      var idx = (0, _bisector.default)(function(o) {
        return o[1];
      })(intervals, target) - 1;
      var interval = intervals[idx];
      if (idx < 0) {
        interval = intervals[0];
      } else if (idx >= intervals.length) {
        interval = (0, _util.last)(intervals);
      }
      return interval;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/category/time.js
var require_time2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/category/time.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _time = require_time();
    var _base = _interopRequireDefault(require_base2());
    var TimeCat = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(TimeCat2, _super);
        function TimeCat2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "timeCat";
          return _this;
        }
        TimeCat2.prototype.translate = function(value) {
          value = (0, _time.toTimeStamp)(value);
          var index = this.values.indexOf(value);
          if (index === -1) {
            if ((0, _util.isNumber)(value) && value < this.values.length) {
              index = value;
            } else {
              index = NaN;
            }
          }
          return index;
        };
        TimeCat2.prototype.getText = function(value, tickIndex) {
          var index = this.translate(value);
          if (index > -1) {
            var result = this.values[index];
            var formatter = this.formatter;
            result = formatter ? formatter(result, tickIndex) : (0, _time.timeFormat)(result, this.mask);
            return result;
          }
          return value;
        };
        TimeCat2.prototype.initCfg = function() {
          this.tickMethod = "time-cat";
          this.mask = "YYYY-MM-DD";
          this.tickCount = 7;
        };
        TimeCat2.prototype.setDomain = function() {
          var values = this.values;
          (0, _util.each)(values, function(v, i) {
            values[i] = (0, _time.toTimeStamp)(v);
          });
          values.sort(function(v1, v2) {
            return v1 - v2;
          });
          _super.prototype.setDomain.call(this);
        };
        return TimeCat2;
      }(_base.default)
    );
    var _default = exports.default = TimeCat;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/base.js
var require_base3 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/base.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _base = _interopRequireDefault(require_base());
    var Continuous = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Continuous2, _super);
        function Continuous2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.isContinuous = true;
          return _this;
        }
        Continuous2.prototype.scale = function(value) {
          if ((0, _util.isNil)(value)) {
            return NaN;
          }
          var rangeMin = this.rangeMin();
          var rangeMax = this.rangeMax();
          var max = this.max;
          var min = this.min;
          if (max === min) {
            return rangeMin;
          }
          var percent = this.getScalePercent(value);
          return rangeMin + percent * (rangeMax - rangeMin);
        };
        Continuous2.prototype.init = function() {
          _super.prototype.init.call(this);
          var ticks = this.ticks;
          var firstTick = (0, _util.head)(ticks);
          var lastTick = (0, _util.last)(ticks);
          if (firstTick < this.min) {
            this.min = firstTick;
          }
          if (lastTick > this.max) {
            this.max = lastTick;
          }
          if (!(0, _util.isNil)(this.minLimit)) {
            this.min = firstTick;
          }
          if (!(0, _util.isNil)(this.maxLimit)) {
            this.max = lastTick;
          }
        };
        Continuous2.prototype.setDomain = function() {
          var _a = (0, _util.getRange)(this.values), min = _a.min, max = _a.max;
          if ((0, _util.isNil)(this.min)) {
            this.min = min;
          }
          if ((0, _util.isNil)(this.max)) {
            this.max = max;
          }
          if (this.min > this.max) {
            this.min = min;
            this.max = max;
          }
        };
        Continuous2.prototype.calculateTicks = function() {
          var _this = this;
          var ticks = _super.prototype.calculateTicks.call(this);
          if (!this.nice) {
            ticks = (0, _util.filter)(ticks, function(tick) {
              return tick >= _this.min && tick <= _this.max;
            });
          }
          return ticks;
        };
        Continuous2.prototype.getScalePercent = function(value) {
          var max = this.max;
          var min = this.min;
          return (value - min) / (max - min);
        };
        Continuous2.prototype.getInvertPercent = function(value) {
          return (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
        };
        return Continuous2;
      }(_base.default)
    );
    var _default = exports.default = Continuous;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/linear.js
var require_linear = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/linear.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _base = _interopRequireDefault(require_base3());
    var Linear = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Linear2, _super);
        function Linear2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "linear";
          _this.isLinear = true;
          return _this;
        }
        Linear2.prototype.invert = function(value) {
          var percent = this.getInvertPercent(value);
          return this.min + percent * (this.max - this.min);
        };
        Linear2.prototype.initCfg = function() {
          this.tickMethod = "wilkinson-extended";
          this.nice = false;
        };
        return Linear2;
      }(_base.default)
    );
    var _default = exports.default = Linear;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/math.js
var require_math = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/math.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calBase = calBase;
    exports.getLogPositiveMin = getLogPositiveMin;
    exports.log = log;
    exports.precisionAdd = precisionAdd;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function calBase(a, b) {
      var e = Math.E;
      var value;
      if (b >= 0) {
        value = Math.pow(e, Math.log(b) / a);
      } else {
        value = Math.pow(e, Math.log(-b) / a) * -1;
      }
      return value;
    }
    function log(a, b) {
      if (a === 1) {
        return 1;
      }
      return Math.log(b) / Math.log(a);
    }
    function getLogPositiveMin(values, base, max) {
      if ((0, _util.isNil)(max)) {
        max = Math.max.apply(null, values);
      }
      var positiveMin = max;
      (0, _util.each)(values, function(value) {
        if (value > 0 && value < positiveMin) {
          positiveMin = value;
        }
      });
      if (positiveMin === max) {
        positiveMin = max / base;
      }
      if (positiveMin > 1) {
        positiveMin = 1;
      }
      return positiveMin;
    }
    function digitLength(num) {
      var eSplit = num.toString().split(/[eE]/);
      var len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
      return len > 0 ? len : 0;
    }
    function precisionAdd(num1, num2) {
      var num1Digits = digitLength(num1);
      var num2Digits = digitLength(num2);
      var baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
      return (num1 * baseNum + num2 * baseNum) / baseNum;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/log.js
var require_log = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/log.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _math = require_math();
    var _base = _interopRequireDefault(require_base3());
    var Log = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Log2, _super);
        function Log2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "log";
          return _this;
        }
        Log2.prototype.invert = function(value) {
          var base = this.base;
          var max = (0, _math.log)(base, this.max);
          var rangeMin = this.rangeMin();
          var range = this.rangeMax() - rangeMin;
          var min;
          var positiveMin = this.positiveMin;
          if (positiveMin) {
            if (value === 0) {
              return 0;
            }
            min = (0, _math.log)(base, positiveMin / base);
            var appendPercent = 1 / (max - min) * range;
            if (value < appendPercent) {
              return value / appendPercent * positiveMin;
            }
          } else {
            min = (0, _math.log)(base, this.min);
          }
          var percent = (value - rangeMin) / range;
          var tmp = percent * (max - min) + min;
          return Math.pow(base, tmp);
        };
        Log2.prototype.initCfg = function() {
          this.tickMethod = "log";
          this.base = 10;
          this.tickCount = 6;
          this.nice = true;
        };
        Log2.prototype.setDomain = function() {
          _super.prototype.setDomain.call(this);
          var min = this.min;
          if (min < 0) {
            throw new Error("When you use log scale, the minimum value must be greater than zero!");
          }
          if (min === 0) {
            this.positiveMin = (0, _math.getLogPositiveMin)(this.values, this.base, this.max);
          }
        };
        Log2.prototype.getScalePercent = function(value) {
          var max = this.max;
          var min = this.min;
          if (max === min) {
            return 0;
          }
          if (value <= 0) {
            return 0;
          }
          var base = this.base;
          var positiveMin = this.positiveMin;
          if (positiveMin) {
            min = positiveMin * 1 / base;
          }
          var percent;
          if (value < positiveMin) {
            percent = value / positiveMin / ((0, _math.log)(base, max) - (0, _math.log)(base, min));
          } else {
            percent = ((0, _math.log)(base, value) - (0, _math.log)(base, min)) / ((0, _math.log)(base, max) - (0, _math.log)(base, min));
          }
          return percent;
        };
        return Log2;
      }(_base.default)
    );
    var _default = exports.default = Log;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/pow.js
var require_pow = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/pow.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _math = require_math();
    var _base = _interopRequireDefault(require_base3());
    var Pow = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Pow2, _super);
        function Pow2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "pow";
          return _this;
        }
        Pow2.prototype.invert = function(value) {
          var percent = this.getInvertPercent(value);
          var exponent = this.exponent;
          var max = (0, _math.calBase)(exponent, this.max);
          var min = (0, _math.calBase)(exponent, this.min);
          var tmp = percent * (max - min) + min;
          var factor = tmp >= 0 ? 1 : -1;
          return Math.pow(tmp, exponent) * factor;
        };
        Pow2.prototype.initCfg = function() {
          this.tickMethod = "pow";
          this.exponent = 2;
          this.tickCount = 5;
          this.nice = true;
        };
        Pow2.prototype.getScalePercent = function(value) {
          var max = this.max;
          var min = this.min;
          if (max === min) {
            return 0;
          }
          var exponent = this.exponent;
          var percent = ((0, _math.calBase)(exponent, value) - (0, _math.calBase)(exponent, min)) / ((0, _math.calBase)(exponent, max) - (0, _math.calBase)(exponent, min));
          return percent;
        };
        return Pow2;
      }(_base.default)
    );
    var _default = exports.default = Pow;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/time.js
var require_time3 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/time.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _time = require_time();
    var _linear = _interopRequireDefault(require_linear());
    var Time = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Time2, _super);
        function Time2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "time";
          return _this;
        }
        Time2.prototype.getText = function(value, index) {
          var numberValue = this.translate(value);
          var formatter = this.formatter;
          return formatter ? formatter(numberValue, index) : (0, _time.timeFormat)(numberValue, this.mask);
        };
        Time2.prototype.scale = function(value) {
          var v = value;
          if ((0, _util.isString)(v) || (0, _util.isDate)(v)) {
            v = this.translate(v);
          }
          return _super.prototype.scale.call(this, v);
        };
        Time2.prototype.translate = function(v) {
          return (0, _time.toTimeStamp)(v);
        };
        Time2.prototype.initCfg = function() {
          this.tickMethod = "time-pretty";
          this.mask = "YYYY-MM-DD";
          this.tickCount = 7;
          this.nice = false;
        };
        Time2.prototype.setDomain = function() {
          var values = this.values;
          var minConfig = this.getConfig("min");
          var maxConfig = this.getConfig("max");
          if (!(0, _util.isNil)(minConfig) || !(0, _util.isNumber)(minConfig)) {
            this.min = this.translate(this.min);
          }
          if (!(0, _util.isNil)(maxConfig) || !(0, _util.isNumber)(maxConfig)) {
            this.max = this.translate(this.max);
          }
          if (values && values.length) {
            var timeStamps_1 = [];
            var min_1 = Infinity;
            var secondMin_1 = min_1;
            var max_1 = 0;
            (0, _util.each)(values, function(v) {
              var timeStamp = (0, _time.toTimeStamp)(v);
              if (isNaN(timeStamp)) {
                throw new TypeError("Invalid Time: ".concat(v, " in time scale!"));
              }
              if (min_1 > timeStamp) {
                secondMin_1 = min_1;
                min_1 = timeStamp;
              } else if (secondMin_1 > timeStamp) {
                secondMin_1 = timeStamp;
              }
              if (max_1 < timeStamp) {
                max_1 = timeStamp;
              }
              timeStamps_1.push(timeStamp);
            });
            if (values.length > 1) {
              this.minTickInterval = secondMin_1 - min_1;
            }
            if ((0, _util.isNil)(minConfig)) {
              this.min = min_1;
            }
            if ((0, _util.isNil)(maxConfig)) {
              this.max = max_1;
            }
          }
        };
        return Time2;
      }(_linear.default)
    );
    var _default = exports.default = Time;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/quantize.js
var require_quantize = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/quantize.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _base = _interopRequireDefault(require_base3());
    var Quantize = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Quantize2, _super);
        function Quantize2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "quantize";
          return _this;
        }
        Quantize2.prototype.invert = function(value) {
          var ticks = this.ticks;
          var length = ticks.length;
          var percent = this.getInvertPercent(value);
          var minIndex = Math.floor(percent * (length - 1));
          if (minIndex >= length - 1) {
            return (0, _util.last)(ticks);
          }
          if (minIndex < 0) {
            return (0, _util.head)(ticks);
          }
          var minTick = ticks[minIndex];
          var nextTick = ticks[minIndex + 1];
          var minIndexPercent = minIndex / (length - 1);
          var maxIndexPercent = (minIndex + 1) / (length - 1);
          return minTick + (percent - minIndexPercent) / (maxIndexPercent - minIndexPercent) * (nextTick - minTick);
        };
        Quantize2.prototype.initCfg = function() {
          this.tickMethod = "r-pretty";
          this.tickCount = 5;
          this.nice = true;
        };
        Quantize2.prototype.calculateTicks = function() {
          var ticks = _super.prototype.calculateTicks.call(this);
          if (!this.nice) {
            if ((0, _util.last)(ticks) !== this.max) {
              ticks.push(this.max);
            }
            if ((0, _util.head)(ticks) !== this.min) {
              ticks.unshift(this.min);
            }
          }
          return ticks;
        };
        Quantize2.prototype.getScalePercent = function(value) {
          var ticks = this.ticks;
          if (value < (0, _util.head)(ticks)) {
            return 0;
          }
          if (value > (0, _util.last)(ticks)) {
            return 1;
          }
          var minIndex = 0;
          (0, _util.each)(ticks, function(tick, index) {
            if (value >= tick) {
              minIndex = index;
            } else {
              return false;
            }
          });
          return minIndex / (ticks.length - 1);
        };
        return Quantize2;
      }(_base.default)
    );
    var _default = exports.default = Quantize;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/quantile.js
var require_quantile = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/continuous/quantile.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _quantize = _interopRequireDefault(require_quantize());
    var Quantile = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Quantile2, _super);
        function Quantile2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "quantile";
          return _this;
        }
        Quantile2.prototype.initCfg = function() {
          this.tickMethod = "quantile";
          this.tickCount = 5;
          this.nice = true;
        };
        return Quantile2;
      }(_quantize.default)
    );
    var _default = exports.default = Quantile;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/factory.js
var require_factory = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/factory.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Scale", {
      enumerable: true,
      get: function get() {
        return _base.default;
      }
    });
    exports.getScale = getClass;
    exports.registerScale = registerClass;
    var _base = _interopRequireDefault(require_base());
    var map = {};
    function getClass(key) {
      return map[key];
    }
    function registerClass(key, cls) {
      if (getClass(key)) {
        throw new Error("type '".concat(key, "' existed."));
      }
      map[key] = cls;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/identity/index.js
var require_identity = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/identity/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _base = _interopRequireDefault(require_base());
    var Identity = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Identity2, _super);
        function Identity2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "identity";
          _this.isIdentity = true;
          return _this;
        }
        Identity2.prototype.calculateTicks = function() {
          return this.values;
        };
        Identity2.prototype.scale = function(value) {
          if (this.values[0] !== value && (0, _util.isNumber)(value)) {
            return value;
          }
          return this.range[0];
        };
        Identity2.prototype.invert = function(value) {
          var range = this.range;
          if (value < range[0] || value > range[1]) {
            return NaN;
          }
          return this.values[0];
        };
        return Identity2;
      }(_base.default)
    );
    var _default = exports.default = Identity;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/cat.js
var require_cat = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/cat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = calculateCatTicks;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function calculateCatTicks(cfg) {
      var values = cfg.values, tickInterval = cfg.tickInterval, tickCount = cfg.tickCount, showLast = cfg.showLast;
      if ((0, _util.isNumber)(tickInterval)) {
        var ticks_1 = (0, _util.filter)(values, function(__, i2) {
          return i2 % tickInterval === 0;
        });
        var lastValue = (0, _util.last)(values);
        if (showLast && (0, _util.last)(ticks_1) !== lastValue) {
          ticks_1.push(lastValue);
        }
        return ticks_1;
      }
      var len = values.length;
      var min = cfg.min, max = cfg.max;
      if ((0, _util.isNil)(min)) {
        min = 0;
      }
      if ((0, _util.isNil)(max)) {
        max = values.length - 1;
      }
      if (!(0, _util.isNumber)(tickCount) || tickCount >= len)
        return values.slice(min, max + 1);
      if (tickCount <= 0 || max <= 0)
        return [];
      var interval = tickCount === 1 ? len : Math.floor(len / (tickCount - 1));
      var ticks = [];
      var idx = min;
      for (var i = 0; i < tickCount; i++) {
        if (idx >= max)
          break;
        idx = Math.min(min + i * interval, max);
        if (i === tickCount - 1 && showLast)
          ticks.push(values[max]);
        else
          ticks.push(values[idx]);
      }
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/d3-linear.js
var require_d3_linear = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/d3-linear.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.D3Linear = void 0;
    exports.default = d3Linear;
    function d3Linear(cfg) {
      var min = cfg.min, max = cfg.max, nice = cfg.nice, tickCount = cfg.tickCount;
      var linear = new D3Linear();
      linear.domain([min, max]);
      if (nice) {
        linear.nice(tickCount);
      }
      return linear.ticks(tickCount);
    }
    var DEFAULT_COUNT = 5;
    var e10 = Math.sqrt(50);
    var e5 = Math.sqrt(10);
    var e2 = Math.sqrt(2);
    var D3Linear = exports.D3Linear = /** @class */
    function() {
      function D3Linear2() {
        this._domain = [0, 1];
      }
      D3Linear2.prototype.domain = function(domain) {
        if (domain) {
          this._domain = Array.from(domain, Number);
          return this;
        }
        return this._domain.slice();
      };
      D3Linear2.prototype.nice = function(count) {
        var _a, _b;
        if (count === void 0) {
          count = DEFAULT_COUNT;
        }
        var d = this._domain.slice();
        var i0 = 0;
        var i1 = this._domain.length - 1;
        var start = this._domain[i0];
        var stop = this._domain[i1];
        var step;
        if (stop < start) {
          _a = [stop, start], start = _a[0], stop = _a[1];
          _b = [i1, i0], i0 = _b[0], i1 = _b[1];
        }
        step = tickIncrement(start, stop, count);
        if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
          step = tickIncrement(start, stop, count);
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
          step = tickIncrement(start, stop, count);
        }
        if (step > 0) {
          d[i0] = Math.floor(start / step) * step;
          d[i1] = Math.ceil(stop / step) * step;
          this.domain(d);
        } else if (step < 0) {
          d[i0] = Math.ceil(start * step) / step;
          d[i1] = Math.floor(stop * step) / step;
          this.domain(d);
        }
        return this;
      };
      D3Linear2.prototype.ticks = function(count) {
        if (count === void 0) {
          count = DEFAULT_COUNT;
        }
        return d3ArrayTicks(this._domain[0], this._domain[this._domain.length - 1], count || DEFAULT_COUNT);
      };
      return D3Linear2;
    }();
    function d3ArrayTicks(start, stop, count) {
      var reverse;
      var i = -1;
      var n;
      var ticks;
      var step;
      stop = +stop, start = +start, count = +count;
      if (start === stop && count > 0) {
        return [start];
      }
      if (reverse = stop < start) {
        n = start, start = stop, stop = n;
      }
      if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) {
        return [];
      }
      if (step > 0) {
        start = Math.ceil(start / step);
        stop = Math.floor(stop / step);
        ticks = new Array(n = Math.ceil(stop - start + 1));
        while (++i < n) {
          ticks[i] = (start + i) * step;
        }
      } else {
        start = Math.floor(start * step);
        stop = Math.ceil(stop * step);
        ticks = new Array(n = Math.ceil(start - stop + 1));
        while (++i < n) {
          ticks[i] = (start - i) / step;
        }
      }
      if (reverse) {
        ticks.reverse();
      }
      return ticks;
    }
    function tickIncrement(start, stop, count) {
      var step = (stop - start) / Math.max(0, count);
      var power = Math.floor(Math.log(step) / Math.LN10);
      var error = step / Math.pow(10, power);
      return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/interval.js
var require_interval = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/interval.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = intervalTicks;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function snapMultiple(v, base, snapType) {
      var div;
      if (snapType === "ceil") {
        div = Math.ceil(v / base);
      } else if (snapType === "floor") {
        div = Math.floor(v / base);
      } else {
        div = Math.round(v / base);
      }
      return div * base;
    }
    function intervalTicks(min, max, interval) {
      var minTick = snapMultiple(min, interval, "floor");
      var maxTick = snapMultiple(max, interval, "ceil");
      minTick = (0, _util.fixedBase)(minTick, interval);
      maxTick = (0, _util.fixedBase)(maxTick, interval);
      var ticks = [];
      var availableInterval = Math.max((maxTick - minTick) / (Math.pow(2, 12) - 1), interval);
      for (var i = minTick; i <= maxTick; i = i + availableInterval) {
        var tickValue = (0, _util.fixedBase)(i, availableInterval);
        ticks.push(tickValue);
      }
      return {
        min: minTick,
        max: maxTick,
        ticks
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/strict-limit.js
var require_strict_limit = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/strict-limit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = strictLimit;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function strictLimit(cfg, defaultMin, defaultMax) {
      var _a;
      var minLimit = cfg.minLimit, maxLimit = cfg.maxLimit, min = cfg.min, max = cfg.max, _b = cfg.tickCount, tickCount = _b === void 0 ? 5 : _b;
      var tickMin = (0, _util.isNil)(minLimit) ? (0, _util.isNil)(defaultMin) ? min : defaultMin : minLimit;
      var tickMax = (0, _util.isNil)(maxLimit) ? (0, _util.isNil)(defaultMax) ? max : defaultMax : maxLimit;
      if (tickMin > tickMax) {
        _a = [tickMin, tickMax], tickMax = _a[0], tickMin = _a[1];
      }
      if (tickCount <= 2) {
        return [tickMin, tickMax];
      }
      var step = (tickMax - tickMin) / (tickCount - 1);
      var ticks = [];
      for (var i = 0; i < tickCount; i++) {
        ticks.push(tickMin + step * i);
      }
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/d3-linear.js
var require_d3_linear2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/d3-linear.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = d3LinearTickMethod;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _d3Linear = _interopRequireDefault(require_d3_linear());
    var _interval = _interopRequireDefault(require_interval());
    var _strictLimit = _interopRequireDefault(require_strict_limit());
    function d3LinearTickMethod(cfg) {
      var min = cfg.min, max = cfg.max, tickInterval = cfg.tickInterval, minLimit = cfg.minLimit, maxLimit = cfg.maxLimit;
      var ticks = (0, _d3Linear.default)(cfg);
      if (!(0, _util.isNil)(minLimit) || !(0, _util.isNil)(maxLimit)) {
        return (0, _strictLimit.default)(cfg, (0, _util.head)(ticks), (0, _util.last)(ticks));
      }
      if (tickInterval) {
        return (0, _interval.default)(min, max, tickInterval).ticks;
      }
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/pretty-number.js
var require_pretty_number = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/pretty-number.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.prettyNumber = prettyNumber;
    function prettyNumber(n) {
      return Math.abs(n) < 1e-15 ? n : parseFloat(n.toFixed(15));
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/extended.js
var require_extended = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/extended.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DEFAULT_Q = exports.ALL_Q = void 0;
    exports.default = extended;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _prettyNumber = require_pretty_number();
    var DEFAULT_Q = exports.DEFAULT_Q = [1, 5, 2, 2.5, 4, 3];
    var ALL_Q = exports.ALL_Q = [1, 5, 2, 2.5, 4, 3, 1.5, 7, 6, 8, 9];
    var eps = Number.EPSILON * 100;
    function mod(n, m) {
      return (n % m + m) % m;
    }
    function round(n) {
      return Math.round(n * 1e12) / 1e12;
    }
    function simplicity(q, Q, j, lmin, lmax, lstep) {
      var n = (0, _util.size)(Q);
      var i = (0, _util.indexOf)(Q, q);
      var v = 0;
      var m = mod(lmin, lstep);
      if ((m < eps || lstep - m < eps) && lmin <= 0 && lmax >= 0) {
        v = 1;
      }
      return 1 - i / (n - 1) - j + v;
    }
    function simplicityMax(q, Q, j) {
      var n = (0, _util.size)(Q);
      var i = (0, _util.indexOf)(Q, q);
      var v = 1;
      return 1 - i / (n - 1) - j + v;
    }
    function density(k, m, dMin, dMax, lMin, lMax) {
      var r = (k - 1) / (lMax - lMin);
      var rt = (m - 1) / (Math.max(lMax, dMax) - Math.min(dMin, lMin));
      return 2 - Math.max(r / rt, rt / r);
    }
    function densityMax(k, m) {
      if (k >= m) {
        return 2 - (k - 1) / (m - 1);
      }
      return 1;
    }
    function coverage(dMin, dMax, lMin, lMax) {
      var range = dMax - dMin;
      return 1 - 0.5 * (Math.pow(dMax - lMax, 2) + Math.pow(dMin - lMin, 2)) / Math.pow(0.1 * range, 2);
    }
    function coverageMax(dMin, dMax, span) {
      var range = dMax - dMin;
      if (span > range) {
        var half = (span - range) / 2;
        return 1 - Math.pow(half, 2) / Math.pow(0.1 * range, 2);
      }
      return 1;
    }
    function legibility() {
      return 1;
    }
    function extended(dMin, dMax, n, onlyLoose, Q, w) {
      if (n === void 0) {
        n = 5;
      }
      if (onlyLoose === void 0) {
        onlyLoose = true;
      }
      if (Q === void 0) {
        Q = DEFAULT_Q;
      }
      if (w === void 0) {
        w = [0.25, 0.2, 0.5, 0.05];
      }
      var m = n < 0 ? 0 : Math.round(n);
      if (Number.isNaN(dMin) || Number.isNaN(dMax) || typeof dMin !== "number" || typeof dMax !== "number" || !m) {
        return {
          min: 0,
          max: 0,
          ticks: []
        };
      }
      if (dMax - dMin < 1e-15 || m === 1) {
        return {
          min: dMin,
          max: dMax,
          ticks: [dMin]
        };
      }
      if (dMax - dMin > 1e148) {
        var count = n || 5;
        var step_1 = (dMax - dMin) / count;
        return {
          min: dMin,
          max: dMax,
          ticks: Array(count).fill(null).map(function(_, idx) {
            return (0, _prettyNumber.prettyNumber)(dMin + step_1 * idx);
          })
        };
      }
      var best = {
        score: -2,
        lmin: 0,
        lmax: 0,
        lstep: 0
      };
      var j = 1;
      while (j < Infinity) {
        for (var i = 0; i < Q.length; i += 1) {
          var q = Q[i];
          var sm = simplicityMax(q, Q, j);
          if (w[0] * sm + w[1] + w[2] + w[3] < best.score) {
            j = Infinity;
            break;
          }
          var k = 2;
          while (k < Infinity) {
            var dm = densityMax(k, m);
            if (w[0] * sm + w[1] + w[2] * dm + w[3] < best.score) {
              break;
            }
            var delta = (dMax - dMin) / (k + 1) / j / q;
            var z = Math.ceil(Math.log10(delta));
            while (z < Infinity) {
              var step = j * q * Math.pow(10, z);
              var cm = coverageMax(dMin, dMax, step * (k - 1));
              if (w[0] * sm + w[1] * cm + w[2] * dm + w[3] < best.score) {
                break;
              }
              var minStart = Math.floor(dMax / step) * j - (k - 1) * j;
              var maxStart = Math.ceil(dMin / step) * j;
              if (minStart <= maxStart) {
                var count = maxStart - minStart;
                for (var i_1 = 0; i_1 <= count; i_1 += 1) {
                  var start = minStart + i_1;
                  var lMin = start * (step / j);
                  var lMax = lMin + step * (k - 1);
                  var lStep = step;
                  var s = simplicity(q, Q, j, lMin, lMax, lStep);
                  var c = coverage(dMin, dMax, lMin, lMax);
                  var g = density(k, m, dMin, dMax, lMin, lMax);
                  var l = legibility();
                  var score = w[0] * s + w[1] * c + w[2] * g + w[3] * l;
                  if (score > best.score && (!onlyLoose || lMin <= dMin && lMax >= dMax)) {
                    best.lmin = lMin;
                    best.lmax = lMax;
                    best.lstep = lStep;
                    best.score = score;
                  }
                }
              }
              z += 1;
            }
            k += 1;
          }
        }
        j += 1;
      }
      var lmax = (0, _prettyNumber.prettyNumber)(best.lmax);
      var lmin = (0, _prettyNumber.prettyNumber)(best.lmin);
      var lstep = (0, _prettyNumber.prettyNumber)(best.lstep);
      var tickCount = Math.floor(round((lmax - lmin) / lstep)) + 1;
      var ticks = new Array(tickCount);
      ticks[0] = (0, _prettyNumber.prettyNumber)(lmin);
      for (var i = 1; i < tickCount; i++) {
        ticks[i] = (0, _prettyNumber.prettyNumber)(ticks[i - 1] + lstep);
      }
      return {
        min: Math.min(dMin, (0, _util.head)(ticks)),
        max: Math.max(dMax, (0, _util.last)(ticks)),
        ticks
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/linear.js
var require_linear2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/linear.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = linear;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _extended = _interopRequireDefault(require_extended());
    var _interval = _interopRequireDefault(require_interval());
    var _strictLimit = _interopRequireDefault(require_strict_limit());
    function linear(cfg) {
      var min = cfg.min, max = cfg.max, tickCount = cfg.tickCount, nice = cfg.nice, tickInterval = cfg.tickInterval, minLimit = cfg.minLimit, maxLimit = cfg.maxLimit;
      var ticks = (0, _extended.default)(min, max, tickCount, nice).ticks;
      if (!(0, _util.isNil)(minLimit) || !(0, _util.isNil)(maxLimit)) {
        return (0, _strictLimit.default)(cfg, (0, _util.head)(ticks), (0, _util.last)(ticks));
      }
      if (tickInterval) {
        return (0, _interval.default)(min, max, tickInterval).ticks;
      }
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/log.js
var require_log2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/log.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = calculateLogTicks;
    var _math = require_math();
    function calculateLogTicks(cfg) {
      var base = cfg.base, tickCount = cfg.tickCount, min = cfg.min, max = cfg.max, values = cfg.values;
      var minTick;
      var maxTick = (0, _math.log)(base, max);
      if (min > 0) {
        minTick = Math.floor((0, _math.log)(base, min));
      } else {
        var positiveMin = (0, _math.getLogPositiveMin)(values, base, max);
        minTick = Math.floor((0, _math.log)(base, positiveMin));
      }
      var count = maxTick - minTick;
      var avg = Math.ceil(count / tickCount);
      var ticks = [];
      for (var i = minTick; i < maxTick + avg; i = i + avg) {
        ticks.push(Math.pow(base, i));
      }
      if (min <= 0) {
        ticks.unshift(0);
      }
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/pretty.js
var require_pretty = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/util/pretty.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = pretty;
    var _prettyNumber = require_pretty_number();
    function pretty(min, max, m) {
      if (m === void 0) {
        m = 5;
      }
      if (min === max) {
        return {
          max,
          min,
          ticks: [min]
        };
      }
      var n = m < 0 ? 0 : Math.round(m);
      if (n === 0)
        return {
          max,
          min,
          ticks: []
        };
      var h = 1.5;
      var h5 = 0.5 + 1.5 * h;
      var d = max - min;
      var c = d / n;
      var base = Math.pow(10, Math.floor(Math.log10(c)));
      var unit = base;
      if (2 * base - c < h * (c - unit)) {
        unit = 2 * base;
        if (5 * base - c < h5 * (c - unit)) {
          unit = 5 * base;
          if (10 * base - c < h * (c - unit)) {
            unit = 10 * base;
          }
        }
      }
      var nu = Math.ceil(max / unit);
      var ns = Math.floor(min / unit);
      var hi = Math.max(nu * unit, max);
      var lo = Math.min(ns * unit, min);
      var size = Math.floor((hi - lo) / unit) + 1;
      var ticks = new Array(size);
      for (var i = 0; i < size; i++) {
        ticks[i] = (0, _prettyNumber.prettyNumber)(lo + i * unit);
      }
      return {
        min: lo,
        max: hi,
        ticks
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/pow.js
var require_pow2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/pow.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = calculatePowTicks;
    var _math = require_math();
    var _pretty = _interopRequireDefault(require_pretty());
    function calculatePowTicks(cfg) {
      var exponent = cfg.exponent, tickCount = cfg.tickCount;
      var max = Math.ceil((0, _math.calBase)(exponent, cfg.max));
      var min = Math.floor((0, _math.calBase)(exponent, cfg.min));
      var ticks = (0, _pretty.default)(min, max, tickCount).ticks;
      return ticks.map(function(tick) {
        var factor = tick >= 0 ? 1 : -1;
        return Math.pow(tick, exponent) * factor;
      });
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/quantile.js
var require_quantile2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/quantile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = calculateTicks;
    function quantileSorted(x, p) {
      var idx = x.length * p;
      if (p === 1) {
        return x[x.length - 1];
      } else if (p === 0) {
        return x[0];
      } else if (idx % 1 !== 0) {
        return x[Math.ceil(idx) - 1];
      } else if (x.length % 2 === 0) {
        return (x[idx - 1] + x[idx]) / 2;
      } else {
        return x[idx];
      }
    }
    function calculateTicks(cfg) {
      var tickCount = cfg.tickCount, values = cfg.values;
      if (!values || !values.length) {
        return [];
      }
      var sorted = values.slice().sort(function(a, b) {
        return a - b;
      });
      var ticks = [];
      for (var i = 0; i < tickCount; i++) {
        var p = i / (tickCount - 1);
        ticks.push(quantileSorted(sorted, p));
      }
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/r-prettry.js
var require_r_prettry = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/r-prettry.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = linearPretty;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _interval = _interopRequireDefault(require_interval());
    var _pretty = _interopRequireDefault(require_pretty());
    var _strictLimit = _interopRequireDefault(require_strict_limit());
    function linearPretty(cfg) {
      var min = cfg.min, max = cfg.max, tickCount = cfg.tickCount, tickInterval = cfg.tickInterval, minLimit = cfg.minLimit, maxLimit = cfg.maxLimit;
      var ticks = (0, _pretty.default)(min, max, tickCount).ticks;
      if (!(0, _util.isNil)(minLimit) || !(0, _util.isNil)(maxLimit)) {
        return (0, _strictLimit.default)(cfg, (0, _util.head)(ticks), (0, _util.last)(ticks));
      }
      if (tickInterval) {
        return (0, _interval.default)(min, max, tickInterval).ticks;
      }
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/time.js
var require_time4 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = calculateTimeTicks;
    var _time = require_time();
    function calculateTimeTicks(cfg) {
      var min = cfg.min, max = cfg.max, minTickInterval = cfg.minTickInterval;
      var tickInterval = cfg.tickInterval;
      var tickCount = cfg.tickCount;
      if (tickInterval) {
        tickCount = Math.ceil((max - min) / tickInterval);
      } else {
        tickInterval = (0, _time.getTickInterval)(min, max, tickCount)[1];
        var count = (max - min) / tickInterval;
        var ratio = count / tickCount;
        if (ratio > 1) {
          tickInterval = tickInterval * Math.ceil(ratio);
        }
        if (minTickInterval && tickInterval < minTickInterval) {
          tickInterval = minTickInterval;
        }
      }
      tickInterval = Math.max(Math.floor((max - min) / (Math.pow(2, 12) - 1)), tickInterval);
      var ticks = [];
      for (var i = min; i < max + tickInterval; i += tickInterval) {
        ticks.push(i);
      }
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/time-cat.js
var require_time_cat = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/time-cat.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = timeCat;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _cat = _interopRequireDefault(require_cat());
    function timeCat(cfg) {
      var ticks = (0, _cat.default)((0, _tslib.__assign)({
        showLast: true
      }, cfg));
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/time-pretty.js
var require_time_pretty = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/time-pretty.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = timePretty;
    var _time = require_time();
    function getYear(date) {
      return new Date(date).getFullYear();
    }
    function createYear(year) {
      return new Date(year, 0, 1).getTime();
    }
    function getMonth(date) {
      return new Date(date).getMonth();
    }
    function diffMonth(min, max) {
      var minYear = getYear(min);
      var maxYear = getYear(max);
      var minMonth = getMonth(min);
      var maxMonth = getMonth(max);
      return (maxYear - minYear) * 12 + (maxMonth - minMonth) % 12;
    }
    function creatMonth(year, month) {
      return new Date(year, month, 1).getTime();
    }
    function diffDay(min, max) {
      return Math.ceil((max - min) / _time.DAY);
    }
    function diffHour(min, max) {
      return Math.ceil((max - min) / _time.HOUR);
    }
    function diffMinus(min, max) {
      return Math.ceil((max - min) / (60 * 1e3));
    }
    function timePretty(cfg) {
      var min = cfg.min, max = cfg.max, minTickInterval = cfg.minTickInterval, tickCount = cfg.tickCount;
      var tickInterval = cfg.tickInterval;
      var ticks = [];
      if (!tickInterval) {
        tickInterval = (max - min) / tickCount;
        if (minTickInterval && tickInterval < minTickInterval) {
          tickInterval = minTickInterval;
        }
      }
      tickInterval = Math.max(Math.floor((max - min) / (Math.pow(2, 12) - 1)), tickInterval);
      var minYear = getYear(min);
      if (tickInterval > _time.YEAR) {
        var maxYear = getYear(max);
        var yearInterval = Math.ceil(tickInterval / _time.YEAR);
        for (var i = minYear; i <= maxYear + yearInterval; i = i + yearInterval) {
          ticks.push(createYear(i));
        }
      } else if (tickInterval > _time.MONTH) {
        var monthInterval = Math.ceil(tickInterval / _time.MONTH);
        var mmMoth = getMonth(min);
        var dMonths = diffMonth(min, max);
        for (var i = 0; i <= dMonths + monthInterval; i = i + monthInterval) {
          ticks.push(creatMonth(minYear, i + mmMoth));
        }
      } else if (tickInterval > _time.DAY) {
        var date = new Date(min);
        var year = date.getFullYear();
        var month = date.getMonth();
        var mday = date.getDate();
        var day = Math.ceil(tickInterval / _time.DAY);
        var ddays = diffDay(min, max);
        for (var i = 0; i < ddays + day; i = i + day) {
          ticks.push(new Date(year, month, mday + i).getTime());
        }
      } else if (tickInterval > _time.HOUR) {
        var date = new Date(min);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hour = date.getHours();
        var hours = Math.ceil(tickInterval / _time.HOUR);
        var dHours = diffHour(min, max);
        for (var i = 0; i <= dHours + hours; i = i + hours) {
          ticks.push(new Date(year, month, day, hour + i).getTime());
        }
      } else if (tickInterval > _time.MINUTE) {
        var dMinus = diffMinus(min, max);
        var minutes = Math.ceil(tickInterval / _time.MINUTE);
        for (var i = 0; i <= dMinus + minutes; i = i + minutes) {
          ticks.push(min + i * _time.MINUTE);
        }
      } else {
        var interval = tickInterval;
        if (interval < _time.SECOND) {
          interval = _time.SECOND;
        }
        var minSecond = Math.floor(min / _time.SECOND) * _time.SECOND;
        var dSeconds = Math.ceil((max - min) / _time.SECOND);
        var seconds = Math.ceil(interval / _time.SECOND);
        for (var i = 0; i < dSeconds + seconds; i = i + seconds) {
          ticks.push(minSecond + i * _time.SECOND);
        }
      }
      if (ticks.length >= 512) {
        console.warn("Notice: current ticks length(".concat(ticks.length, ') >= 512, may cause performance issues, even out of memory. Because of the configure "tickInterval"(in milliseconds, current is ').concat(tickInterval, ") is too small, increase the value to solve the problem!"));
      }
      return ticks;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/index.js
var require_tick_method = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/tick-method/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "getTickMethod", {
      enumerable: true,
      get: function get() {
        return _register.getTickMethod;
      }
    });
    Object.defineProperty(exports, "registerTickMethod", {
      enumerable: true,
      get: function get() {
        return _register.registerTickMethod;
      }
    });
    var _cat = _interopRequireDefault(require_cat());
    var _d3Linear = _interopRequireDefault(require_d3_linear2());
    var _linear = _interopRequireDefault(require_linear2());
    var _log = _interopRequireDefault(require_log2());
    var _pow = _interopRequireDefault(require_pow2());
    var _quantile = _interopRequireDefault(require_quantile2());
    var _rPrettry = _interopRequireDefault(require_r_prettry());
    var _register = require_register();
    var _time = _interopRequireDefault(require_time4());
    var _timeCat = _interopRequireDefault(require_time_cat());
    var _timePretty = _interopRequireDefault(require_time_pretty());
    (0, _register.registerTickMethod)("cat", _cat.default);
    (0, _register.registerTickMethod)("time-cat", _timeCat.default);
    (0, _register.registerTickMethod)("wilkinson-extended", _linear.default);
    (0, _register.registerTickMethod)("r-pretty", _rPrettry.default);
    (0, _register.registerTickMethod)("time", _time.default);
    (0, _register.registerTickMethod)("time-pretty", _timePretty.default);
    (0, _register.registerTickMethod)("log", _log.default);
    (0, _register.registerTickMethod)("pow", _pow.default);
    (0, _register.registerTickMethod)("quantile", _quantile.default);
    (0, _register.registerTickMethod)("d3-linear", _d3Linear.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/index.js
var require_src = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-scale/src/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Category", {
      enumerable: true,
      get: function get() {
        return _base2.default;
      }
    });
    Object.defineProperty(exports, "Identity", {
      enumerable: true,
      get: function get() {
        return _index.default;
      }
    });
    Object.defineProperty(exports, "Linear", {
      enumerable: true,
      get: function get() {
        return _linear.default;
      }
    });
    Object.defineProperty(exports, "Log", {
      enumerable: true,
      get: function get() {
        return _log.default;
      }
    });
    Object.defineProperty(exports, "Pow", {
      enumerable: true,
      get: function get() {
        return _pow.default;
      }
    });
    Object.defineProperty(exports, "Quantile", {
      enumerable: true,
      get: function get() {
        return _quantile.default;
      }
    });
    Object.defineProperty(exports, "Quantize", {
      enumerable: true,
      get: function get() {
        return _quantize.default;
      }
    });
    Object.defineProperty(exports, "Scale", {
      enumerable: true,
      get: function get() {
        return _base.default;
      }
    });
    Object.defineProperty(exports, "Time", {
      enumerable: true,
      get: function get() {
        return _time2.default;
      }
    });
    Object.defineProperty(exports, "TimeCat", {
      enumerable: true,
      get: function get() {
        return _time.default;
      }
    });
    Object.defineProperty(exports, "getScale", {
      enumerable: true,
      get: function get() {
        return _factory.getScale;
      }
    });
    Object.defineProperty(exports, "getTickMethod", {
      enumerable: true,
      get: function get() {
        return _index2.getTickMethod;
      }
    });
    Object.defineProperty(exports, "registerScale", {
      enumerable: true,
      get: function get() {
        return _factory.registerScale;
      }
    });
    Object.defineProperty(exports, "registerTickMethod", {
      enumerable: true,
      get: function get() {
        return _index2.registerTickMethod;
      }
    });
    var _base = _interopRequireDefault(require_base());
    var _base2 = _interopRequireDefault(require_base2());
    var _time = _interopRequireDefault(require_time2());
    var _linear = _interopRequireDefault(require_linear());
    var _log = _interopRequireDefault(require_log());
    var _pow = _interopRequireDefault(require_pow());
    var _time2 = _interopRequireDefault(require_time3());
    var _quantize = _interopRequireDefault(require_quantize());
    var _quantile = _interopRequireDefault(require_quantile());
    var _factory = require_factory();
    var _index = _interopRequireDefault(require_identity());
    var _index2 = require_tick_method();
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/coord/base.js
var require_base4 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/coord/base.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function transposedRect(_a) {
      var xMin = _a.xMin, xMax = _a.xMax, yMin = _a.yMin, yMax = _a.yMax;
      return {
        xMin: yMin,
        xMax: yMax,
        yMin: xMin,
        yMax: xMax
      };
    }
    function convertRect(_a) {
      var x = _a.x, y = _a.y, size = _a.size, y0 = _a.y0;
      var xMin;
      var xMax;
      if ((0, _util.isArray)(x)) {
        xMin = x[0];
        xMax = x[1];
      } else {
        xMin = x - size / 2;
        xMax = x + size / 2;
      }
      var yMin;
      var yMax;
      if ((0, _util.isArray)(y)) {
        if (y[0] === y[1]) {
          yMin = y[0];
          yMax = y[1];
        } else {
          yMin = Math.min(y[0], y[1]);
          yMax = Math.max(y[0], y[1]);
        }
      } else {
        yMin = Math.min(y0, y);
        yMax = Math.max(y0, y);
      }
      return {
        xMin,
        xMax,
        yMin,
        yMax
      };
    }
    var Base = (
      /** @class */
      function() {
        function Base2(option) {
          this.left = 0;
          this.top = 0;
          this.width = 0;
          this.height = 0;
          this.transposed = false;
          this.x = [0, 1];
          this.y = [0, 1];
          this.update(option);
        }
        Base2.prototype.update = function(option) {
          (0, _util.mix)(this, option);
          var _a = this, left = _a.left, top = _a.top, width = _a.width, height = _a.height;
          this.right = left + width;
          this.bottom = top + height;
          this.center = {
            x: left + width / 2,
            y: top + height / 2
          };
          return this;
        };
        Base2.prototype.isCyclic = function() {
          return false;
        };
        Base2.prototype._zoomVal = function(val, func) {
          return (0, _util.isArray)(val) ? val.map(function(v) {
            return func(v);
          }) : func(val);
        };
        Base2.prototype.convert = function(point) {
          var _a = this, transposed = _a.transposed, x = _a.x, y = _a.y;
          var xDim = transposed ? "y" : "x";
          var yDim = transposed ? "x" : "y";
          var pointX = point[xDim];
          var pointY = point[yDim];
          if (pointX < 0 || pointX > 1 || pointY < 0 || pointY > 1) {
            return {
              x: NaN,
              y: NaN
            };
          }
          return {
            x: this._zoomVal(point[xDim], function(v) {
              return x[0] + (x[1] - x[0]) * v;
            }),
            y: this._zoomVal(point[yDim], function(v) {
              return y[0] + (y[1] - y[0]) * v;
            })
          };
        };
        Base2.prototype.invert = function(point) {
          var _a;
          var _b = this, transposed = _b.transposed, x = _b.x, y = _b.y;
          var xDim = transposed ? "y" : "x";
          var yDim = transposed ? "x" : "y";
          return _a = {}, _a[xDim] = this._zoomVal(point.x, function(v) {
            return (v - x[0]) / (x[1] - x[0]);
          }), _a[yDim] = this._zoomVal(point.y, function(v) {
            return (v - y[0]) / (y[1] - y[0]);
          }), _a;
        };
        Base2.prototype.convertPoint = function(point) {
          return this.convert(point);
        };
        Base2.prototype.invertPoint = function(point) {
          return this.invert(point);
        };
        Base2.prototype.convertRect = function(rectPoint) {
          var _a = this, xRange = _a.x, yRange = _a.y, transposed = _a.transposed;
          var xStart = xRange[0], xEnd = xRange[1];
          var yStart = yRange[0], yEnd = yRange[1];
          var rect = convertRect(rectPoint);
          var _b = transposed ? transposedRect(rect) : rect, xMin = _b.xMin, xMax = _b.xMax, yMin = _b.yMin, yMax = _b.yMax;
          var x0 = xStart + (xEnd - xStart) * xMin;
          var x1 = xStart + (xEnd - xStart) * xMax;
          var y0 = yStart + (yEnd - yStart) * yMin;
          var y1 = yStart + (yEnd - yStart) * yMax;
          return {
            xMin: Math.min(x0, x1),
            xMax: Math.max(x0, x1),
            yMin: Math.min(y0, y1),
            yMax: Math.max(y0, y1)
          };
        };
        Base2.prototype.transformToRect = function(rectPoint) {
          var x = rectPoint.x, y = rectPoint.y, y0 = rectPoint.y0, size = rectPoint.size;
          var coordOrigin = this.convertPoint({
            x: 0,
            y: y0
          });
          var transposed = this.transposed;
          var _rectPoint = {
            size,
            x: transposed ? y : x,
            y: transposed ? x : y,
            y0: transposed ? coordOrigin.x : coordOrigin.y
          };
          var rect = convertRect(_rectPoint);
          var _a = transposed ? transposedRect(rect) : rect, xMin = _a.xMin, xMax = _a.xMax, yMin = _a.yMin, yMax = _a.yMax;
          return {
            xMin,
            xMax,
            yMin,
            yMax
          };
        };
        return Base2;
      }()
    );
    var _default = exports.default = Base;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/coord/rect.js
var require_rect = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/coord/rect.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _base = _interopRequireDefault(require_base4());
    var Rect = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Rect2, _super);
        function Rect2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "rect";
          return _this;
        }
        Rect2.prototype.update = function(option) {
          _super.prototype.update.call(this, option);
          var _a = this, left = _a.left, top = _a.top, width = _a.width, height = _a.height;
          var x = [left, left + width];
          var y = [top + height, top];
          this.x = x;
          this.y = y;
          return this;
        };
        return Rect2;
      }(_base.default)
    );
    var _default = exports.default = Rect;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/util/vector.js
var require_vector = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/util/vector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.vec2Zero = exports.vec2AngleTo = void 0;
    var _glMatrix = (init_esm(), __toCommonJS(esm_exports));
    var vec2Direction = function vec2Direction2(v1, v2) {
      return v1[0] * v2[1] - v2[0] * v1[1];
    };
    var vec2Zero = exports.vec2Zero = function vec2Zero2(v) {
      return v[0] === 0 && v[1] === 0;
    };
    var vec2AngleTo = exports.vec2AngleTo = function vec2AngleTo2(v1, v2, direction) {
      var angle = _glMatrix.vec2.angle(v1, v2);
      var angleLargeThanPI = vec2Direction(v1, v2) >= 0;
      if (direction) {
        if (angleLargeThanPI) {
          return Math.PI * 2 - angle;
        }
        return angle;
      }
      if (angleLargeThanPI) {
        return angle;
      }
      return Math.PI * 2 - angle;
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/coord/polar.js
var require_polar = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/coord/polar.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _base = _interopRequireDefault(require_base4());
    var _glMatrix = (init_esm(), __toCommonJS(esm_exports));
    var _vector = require_vector();
    var Polar = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Polar2, _super);
        function Polar2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = "polar";
          _this.isPolar = true;
          return _this;
        }
        Polar2.prototype.update = function(option) {
          _super.prototype.update.call(this, option);
          if (!this.option) {
            this.option = option;
          }
          var _a = this.option, _b = _a.radius, radiusRatio = _b === void 0 ? 1 : _b, _c = _a.innerRadius, innerRadiusRatio = _c === void 0 ? 0 : _c;
          var _d = this, width = _d.width, height = _d.height, _e = _d.startAngle, startAngle = _e === void 0 ? -Math.PI / 2 : _e, _f = _d.endAngle, endAngle = _f === void 0 ? Math.PI * 3 / 2 : _f;
          var radius = radiusRatio * (Math.min(width, height) / 2);
          var x = [startAngle, endAngle];
          var y = [innerRadiusRatio * radius, radius];
          this.x = x;
          this.y = y;
          this.startAngle = startAngle;
          this.endAngle = endAngle;
          this.radius = radius;
          this.innnerRadius = innerRadiusRatio * radius;
          return this;
        };
        Polar2.prototype.isCyclic = function() {
          var _a = this, startAngle = _a.startAngle, endAngle = _a.endAngle;
          if (endAngle - startAngle < Math.PI * 2) {
            return false;
          }
          return true;
        };
        Polar2.prototype.convertPoint = function(point) {
          var _a = this, center = _a.center, transposed = _a.transposed, x = _a.x, y = _a.y;
          var xDim = transposed ? "y" : "x";
          var yDim = transposed ? "x" : "y";
          var xStart = x[0], xEnd = x[1];
          var yStart = y[0], yEnd = y[1];
          var angle = xStart + (xEnd - xStart) * point[xDim];
          var radius = yStart + (yEnd - yStart) * point[yDim];
          return {
            x: center.x + Math.cos(angle) * radius,
            y: center.y + Math.sin(angle) * radius
          };
        };
        Polar2.prototype.invertPoint = function(point) {
          var _a = this, center = _a.center, transposed = _a.transposed, x = _a.x, y = _a.y;
          var xDim = transposed ? "y" : "x";
          var yDim = transposed ? "x" : "y";
          var xStart = x[0], xEnd = x[1];
          var yStart = y[0], yEnd = y[1];
          var m = [1, 0, 0, 1, 0, 0];
          _glMatrix.mat2d.rotate(m, m, xStart);
          var startV = [1, 0];
          _glMatrix.vec2.transformMat2d(startV, startV, m);
          startV = [startV[0], startV[1]];
          var pointV = [point.x - center.x, point.y - center.y];
          if ((0, _vector.vec2Zero)(pointV)) {
            return {
              x: 0,
              y: 0
            };
          }
          var theta = (0, _vector.vec2AngleTo)(startV, pointV, xEnd < xStart);
          if (Math.abs(theta - Math.PI * 2) < 1e-3) {
            theta = 0;
          }
          var l = _glMatrix.vec2.length(pointV);
          var percentX = theta / (xEnd - xStart);
          percentX = xEnd - xStart > 0 ? percentX : -percentX;
          var percentY = (l - yStart) / (yEnd - yStart);
          var rst = {};
          rst[xDim] = percentX;
          rst[yDim] = percentY;
          return rst;
        };
        return Polar2;
      }(_base.default)
    );
    var _default = exports.default = Polar;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/coord/index.js
var require_coord = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/coord/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Polar", {
      enumerable: true,
      get: function get() {
        return _polar.default;
      }
    });
    Object.defineProperty(exports, "Rect", {
      enumerable: true,
      get: function get() {
        return _rect.default;
      }
    });
    exports.default = void 0;
    var _base = _interopRequireDefault(require_base4());
    var _rect = _interopRequireDefault(require_rect());
    var _polar = _interopRequireDefault(require_polar());
    var _default = exports.default = _base.default;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/coord.js
var require_coord2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/coord.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Coord", {
      enumerable: true,
      get: function get() {
        return _coord.default;
      }
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _coord = _interopRequireWildcard(require_coord());
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    var coordMap = {
      rect: _coord.Rect,
      polar: _coord.Polar
    };
    var coordController = (
      /** @class */
      function() {
        function coordController2() {
        }
        coordController2.prototype.getOption = function(cfg) {
          if ((0, _util.isString)(cfg)) {
            return {
              type: coordMap[cfg] || _coord.Rect
            };
          }
          if ((0, _util.isFunction)(cfg)) {
            return {
              type: cfg
            };
          }
          var type = (cfg || {}).type;
          return (0, _tslib.__assign)((0, _tslib.__assign)({}, cfg), {
            // 默认直角坐标系
            type: (0, _util.isFunction)(type) ? type : coordMap[type] || _coord.Rect
          });
        };
        coordController2.prototype.create = function(cfg) {
          var layout = this.layout;
          var option = this.getOption(cfg);
          var type = option.type;
          var coord = new type((0, _tslib.__assign)((0, _tslib.__assign)({}, option), layout));
          this.coord = coord;
          return coord;
        };
        coordController2.prototype.updateLayout = function(style) {
          var coord = this.coord;
          var left = style.left, top = style.top, width = style.width, height = style.height, padding = style.padding;
          var _a = padding || [0, 0, 0, 0], paddingTop = _a[0], paddingRight = _a[1], paddingBottom = _a[2], paddingLeft = _a[3];
          this.layout = {
            left: left + paddingLeft,
            top: top + paddingTop,
            width: width - paddingLeft - paddingRight,
            height: height - paddingTop - paddingBottom
          };
          if (coord) {
            coord.update(this.layout);
          }
        };
        coordController2.prototype.useLayout = function(positionLayout) {
          var coord = this.coord;
          var position = positionLayout.position, boxWidth = positionLayout.width, boxHeight = positionLayout.height;
          var left = coord.left, top = coord.top, width = coord.width, height = coord.height;
          switch (position) {
            case "left":
              left += boxWidth;
              width = Math.max(0, width - boxWidth);
              break;
            case "right":
              width = Math.max(0, width - boxWidth);
              break;
            case "top":
              top += boxHeight;
              height = Math.max(0, height - boxHeight);
              break;
            case "bottom":
              height = Math.max(0, height - boxHeight);
              break;
          }
          coord.update({
            left,
            top,
            width,
            height
          });
        };
        coordController2.prototype.update = function() {
        };
        coordController2.prototype.getCoord = function() {
          return this.coord;
        };
        return coordController2;
      }()
    );
    var _default = exports.default = coordController;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/tick/cat-tick.js
var require_cat_tick = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/tick/cat-tick.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = exports.default = function _default2(cfg) {
      var values = cfg.values, tickCount = cfg.tickCount;
      if (!tickCount) {
        return values;
      }
      if (values.length <= 1) {
        return values;
      }
      var step = Math.floor(values.length / (tickCount - 1)) || 1;
      var ticks = [];
      for (var index = 0; index < values.length; index = index + step) {
        ticks.push(values[index]);
      }
      var last = values[values.length - 1];
      if (ticks[ticks.length - 1] !== last) {
        if (ticks.length >= tickCount) {
          ticks[ticks.length - 1] = last;
        } else {
          ticks.push(last);
        }
      }
      return ticks;
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/tick/linear-tick.js
var require_linear_tick = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/tick/linear-tick.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var SNAP_COUNT_ARRAY = [1, 1.2, 1.5, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10];
    var DEFAULT_COUNT = 5;
    var _default = exports.default = function _default2(cfg) {
      var _a = cfg || {}, tickCount = _a.tickCount, tickInterval = _a.tickInterval;
      var _b = cfg || {}, min = _b.min, max = _b.max;
      min = isNaN(min) ? 0 : min;
      max = isNaN(max) ? 0 : max;
      var count = tickCount && tickCount >= 2 ? tickCount : DEFAULT_COUNT;
      var interval = tickInterval || getBestInterval({
        tickCount: count,
        max,
        min
      });
      var minTick = Math.floor(min / interval) * interval;
      if (tickInterval) {
        var intervalCount = Math.abs(Math.ceil((max - minTick) / tickInterval)) + 1;
        count = Math.max(count, intervalCount);
      }
      var tickLength = 0;
      var fixedLength = getFixedLength(interval);
      if (min < 0 && max > 0 && count === 2) {
        return [toFixed(minTick, fixedLength), toFixed(Math.ceil(max / interval) * interval, fixedLength)];
      }
      var ticks = [];
      while (tickLength < count) {
        ticks.push(toFixed(minTick + tickLength * interval, fixedLength));
        tickLength++;
      }
      return ticks;
    };
    var DECIMAL_LENGTH = 12;
    function getFactor(number) {
      number = Math.abs(number);
      var factor = 1;
      if (number === 0) {
        return factor;
      }
      if (number < 1) {
        var count = 0;
        while (number < 1) {
          factor = factor / 10;
          number = number * 10;
          count++;
        }
        if (factor.toString().length > DECIMAL_LENGTH) {
          factor = parseFloat(factor.toFixed(count));
        }
        return factor;
      }
      while (number > 10) {
        factor = factor * 10;
        number = number / 10;
      }
      return factor;
    }
    function getBestInterval(_a) {
      var tickCount = _a.tickCount, min = _a.min, max = _a.max;
      if (min === max) {
        return 1 * getFactor(max);
      }
      var avgInterval = (max - min) / (tickCount - 1);
      var factor = getFactor(avgInterval);
      var calInterval = avgInterval / factor;
      var calMax = max / factor;
      var calMin = min / factor;
      var similarityIndex = 0;
      for (var index = 0; index < SNAP_COUNT_ARRAY.length; index++) {
        var item = SNAP_COUNT_ARRAY[index];
        if (calInterval <= item) {
          similarityIndex = index;
          break;
        }
      }
      var similarityInterval = min < 0 && max > 0 && tickCount === 2 ? SNAP_COUNT_ARRAY[similarityIndex] : getInterval(similarityIndex, tickCount, calMin, calMax);
      var fixedLength = getFixedLength(similarityInterval) + getFixedLength(factor);
      return toFixed(similarityInterval * factor, fixedLength);
    }
    function getInterval(startIndex, tickCount, min, max) {
      var verify = false;
      var interval = SNAP_COUNT_ARRAY[startIndex];
      for (var i = startIndex; i < SNAP_COUNT_ARRAY.length; i++) {
        if (intervalIsVerify({
          interval: SNAP_COUNT_ARRAY[i],
          tickCount,
          max,
          min
        })) {
          interval = SNAP_COUNT_ARRAY[i];
          verify = true;
          break;
        }
      }
      if (!verify) {
        return 10 * getInterval(0, tickCount, min / 10, max / 10);
      }
      return interval;
    }
    function intervalIsVerify(_a) {
      var interval = _a.interval, tickCount = _a.tickCount, max = _a.max, min = _a.min;
      var minTick = Math.floor(min / interval) * interval;
      if (minTick + (tickCount - 1) * interval >= max) {
        return true;
      }
      return false;
    }
    function getFixedLength(num) {
      var str = num.toString();
      var index = str.indexOf(".");
      var indexOfExp = str.indexOf("e-");
      var length = indexOfExp >= 0 ? parseInt(str.substr(indexOfExp + 2), 10) : str.substr(index + 1).length;
      if (length > 20) {
        length = 20;
      }
      return length;
    }
    function toFixed(v, length) {
      return parseFloat(v.toFixed(length));
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/scale.js
var require_scale = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/scale.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _src = require_src();
    var _catTick = _interopRequireDefault(require_cat_tick());
    var _linearTick = _interopRequireDefault(require_linear_tick());
    (0, _src.registerScale)("cat", _src.Category);
    (0, _src.registerScale)("category", _src.Category);
    (0, _src.registerScale)("identity", _src.Identity);
    (0, _src.registerScale)("linear", _src.Linear);
    (0, _src.registerScale)("log", _src.Log);
    (0, _src.registerScale)("pow", _src.Pow);
    (0, _src.registerScale)("time", _src.Time);
    (0, _src.registerScale)("timeCat", _src.TimeCat);
    (0, _src.registerScale)("quantize", _src.Quantize);
    (0, _src.registerScale)("quantile", _src.Quantile);
    (0, _src.registerTickMethod)("cat", _catTick.default);
    (0, _src.registerTickMethod)("time-cat", _catTick.default);
    (0, _src.registerTickMethod)("wilkinson-extended", _linearTick.default);
    var ScaleController = (
      /** @class */
      function() {
        function ScaleController2(data) {
          this.data = data;
          this.options = {};
          this.scales = {};
        }
        ScaleController2.prototype._getType = function(option) {
          var type = option.type, values = option.values, field = option.field;
          if (type) {
            return type;
          }
          if ((0, _util.isNumber)(field) || (0, _util.isNil)(values[0]) && field) {
            return "identity";
          }
          if (typeof values[0] === "number") {
            return "linear";
          }
          return "cat";
        };
        ScaleController2.prototype._getOption = function(option) {
          var values = option.values, field = option.field, justifyContent = option.justifyContent;
          var type = this._getType(option);
          option.type = type;
          if (type === "identity") {
            option.field = field.toString();
            option.values = [field];
            return option;
          }
          if (type === "linear") {
            if (typeof option.nice !== "boolean") {
              option.nice = true;
            }
            var _a = (0, _util.getRange)(values), min = _a.min, max = _a.max;
            if ((0, _util.isNil)(option.min)) {
              option.min = min;
            }
            if ((0, _util.isNil)(option.max)) {
              option.max = max;
            }
            option.values = values.sort(function(a, b) {
              return a - b;
            });
            return option;
          }
          if (type === "cat" || type === "timeCat") {
            if (option.range) {
              return option;
            }
            var count = values.length;
            var range = [0, 1];
            if (count === 1) {
              range = [0.5, 1];
            } else if (justifyContent) {
              var offset = 1 / count * 0.5;
              range = [offset, 1 - offset];
            } else {
              var offset = 1 / count;
              range = [0, 1 - offset];
            }
            option.range = range;
          }
          return option;
        };
        ScaleController2.prototype.createScale = function(option) {
          var type = option.type;
          if ((0, _util.isFunction)(type)) {
            return new type(option);
          }
          var ScaleClass = (0, _src.getScale)(type);
          return new ScaleClass(option);
        };
        ScaleController2.prototype.setScale = function(field, option) {
          var _a = this, options = _a.options, scales = _a.scales;
          options[field] = (0, _util.mix)({}, options[field], option);
          if (scales[field]) {
            scales[field].change(options[field]);
          }
        };
        ScaleController2.prototype.create = function(options) {
          this.update(options);
        };
        ScaleController2.prototype.update = function(options) {
          var _this = this;
          if (!options)
            return;
          (0, _util.each)(options, function(option, field) {
            _this.setScale(field, option);
          });
        };
        ScaleController2.prototype.changeData = function(data) {
          this.data = data;
          this.scales = {};
        };
        ScaleController2.prototype.getData = function() {
          return this.data;
        };
        ScaleController2.prototype.getScale = function(field) {
          var _a = this, scales = _a.scales, options = _a.options, data = _a.data;
          var scale = scales[field];
          if (scale) {
            var option_1 = this._getOption((0, _tslib.__assign)((0, _tslib.__assign)({}, options[field]), {
              values: scale.values
            }));
            if (option_1.range) {
              scale.range = option_1.range;
            }
            return scale;
          }
          var option = options[field];
          if (!option) {
            return null;
          }
          var values = option.values ? option.values : data ? (0, _util.valuesOfKey)(data, field) : [];
          var scaleOption = this._getOption((0, _tslib.__assign)((0, _tslib.__assign)({}, option), {
            field,
            values
          }));
          var newScale = this.createScale(scaleOption);
          scales[field] = newScale;
          return newScale;
        };
        ScaleController2.prototype.getScales = function() {
          var _this = this;
          var _a = this, options = _a.options, scales = _a.scales;
          (0, _util.each)(options, function(option, field) {
            _this.getScale(field);
          });
          return scales;
        };
        ScaleController2.prototype.getOptions = function() {
          var scales = this.scales;
          var options = {};
          (0, _util.each)(scales, function(scale, field) {
            options[field] = (0, _tslib.__assign)({}, scale.__cfg__);
          });
          return options;
        };
        ScaleController2.prototype.adjustStartZero = function(scale) {
          var options = this.options;
          var field = scale.field, min = scale.min, max = scale.max;
          var option = options[field];
          if (option && option.min) {
            return;
          }
          if (min > 0) {
            scale.change({
              min: 0
            });
          } else if (max < 0) {
            scale.change({
              max: 0
            });
          }
        };
        ScaleController2.prototype.adjustPieScale = function(scale) {
          var options = this.options;
          var field = scale.field;
          var option = options[field];
          if (option && !(0, _util.isNil)(option.nice)) {
            return null;
          }
          scale.change({
            nice: false
          });
        };
        ScaleController2.prototype._updateStackRange = function(scale, flattenArray) {
          var options = this.options;
          var field = scale.field;
          var option = options[field];
          var dataMin = Infinity;
          var dataMax = -Infinity;
          for (var i = 0, len = flattenArray.length; i < len; i++) {
            var obj = flattenArray[i];
            var tmpMin = Math.min.apply(null, obj[field]);
            var tmpMax = Math.max.apply(null, obj[field]);
            if (tmpMin < dataMin) {
              dataMin = tmpMin;
            }
            if (tmpMax > dataMax) {
              dataMax = tmpMax;
            }
          }
          var min = (option === null || option === void 0 ? void 0 : option.min) || dataMin;
          var max = (option === null || option === void 0 ? void 0 : option.max) || dataMax;
          if (min !== scale.min || max !== scale.max) {
            scale.change({
              min,
              max
            });
          }
        };
        ScaleController2.prototype.getZeroValue = function(scale) {
          var min = scale.min, max = scale.max;
          var value;
          if (min >= 0) {
            value = min;
          } else if (max <= 0) {
            value = max;
          } else {
            value = 0;
          }
          return scale.scale(value);
        };
        return ScaleController2;
      }()
    );
    var _default = exports.default = ScaleController;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/theme.js
var require_theme = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/theme.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var axis = {
      labelOffset: "15px",
      line: {
        stroke: "#E8E8E8",
        lineWidth: "1px"
      },
      symbol: {
        fill: "#E8E8E8",
        radius: "10px"
      },
      tickLine: {
        stroke: "#E8E8E8"
      },
      label: {
        fill: "#808080",
        fontSize: "20px"
      },
      grid: {
        stroke: "#E8E8E8",
        lineWidth: "1px",
        lineDash: ["4px"]
      }
    };
    var guide = {
      line: {
        style: {
          stroke: "#a3a3a3",
          lineWidth: 1
        },
        offsetX: 0,
        offsetY: 0
      },
      text: {
        style: {
          fill: "#787878",
          // textAlign: 'center',
          textBaseline: "middle"
        },
        offsetX: 0,
        offsetY: 0
      },
      rect: {
        style: {
          fill: "#fafafa"
        }
      },
      arc: {
        style: {
          stroke: "#a3a3a3"
        }
      },
      html: {
        offsetX: 0,
        offsetY: 0,
        alignX: "center",
        alignY: "middle"
      },
      tag: {
        offsetX: 0,
        offsetY: 0,
        side: 4,
        background: {
          padding: 5,
          radius: 2,
          fill: "#1890FF"
        },
        textStyle: {
          fontSize: 12,
          fill: "#fff",
          textAlign: "center",
          textBaseline: "middle"
        }
      },
      point: {
        offsetX: 0,
        offsetY: 0,
        style: {
          fill: "#fff",
          r: 3,
          lineWidth: 2,
          stroke: "#1890ff"
        }
      },
      polyline: {
        style: {
          lineWidth: "4px",
          lineJoin: "round",
          lineCap: "round"
        },
        offsetX: 0,
        offsetY: 0
      }
    };
    var chart = {
      padding: ["30px", "30px", "30px", "30px"]
    };
    var _default = exports.default = {
      chart,
      colors: ["#1890FF", "#2FC25B", "#FACC14", "#223273", "#8543E0", "#13C2C2", "#3436C7", "#F04864"],
      shapes: {
        line: ["line", "dash", "smooth"],
        point: ["circle", "hollowCircle", "rect"],
        area: ["area", "smooth"],
        interval: ["rect", "pyramid", "funnel"]
      },
      sizes: ["4px", "6px", "8px", "10px", "12px"],
      shape: {
        line: {
          default: {
            lineWidth: "4px",
            lineJoin: "round",
            lineCap: "round"
          },
          smooth: {
            smooth: true
          },
          "step-start": {
            step: "start"
          },
          "step-middle": {
            step: "middle"
          },
          "step-end": {
            step: "end"
          },
          dash: {
            lineDash: ["8px", "8px"]
          }
        },
        point: {
          default: {
            size: "6px"
          },
          hollowCircle: {
            lineWidth: "2px"
          }
        },
        area: {
          default: {
            fillOpacity: 0.1
          }
        },
        interval: {
          default: {}
        }
      },
      axis,
      guide
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/chart/index.js
var require_chart = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/chart/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _coord = _interopRequireDefault(require_coord2());
    var _scale = _interopRequireDefault(require_scale());
    var _theme = _interopRequireDefault(require_theme());
    var Chart = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Chart2, _super);
        function Chart2(props, context) {
          var _this = _super.call(this, props) || this;
          _this.componentsPosition = [];
          var theme = context.theme, px2hd = context.px2hd;
          context.theme = (0, _util.deepMix)(px2hd(_theme.default), theme);
          var data = props.data;
          _this.scale = new _scale.default(data);
          _this.coord = new _coord.default();
          _this.coordRef = (0, _fEngine.createRef)();
          _this.state = {
            filters: {}
          };
          return _this;
        }
        Chart2.prototype.getStyle = function(props) {
          var _a = this, context = _a.context, layout = _a.layout;
          var theme = context.theme, px2hd = context.px2hd;
          var left = layout.left, top = layout.top, width = layout.width, height = layout.height;
          var customStyle = props.style;
          return px2hd((0, _tslib.__assign)((0, _tslib.__assign)({
            left,
            top,
            width,
            height
          }, theme.chart), customStyle));
        };
        Chart2.prototype.willMount = function() {
          var _a = this, props = _a.props, coord = _a.coord, scale = _a.scale;
          var scaleOptions = props.scale, coordOption = props.coord;
          this.resetCoordLayout();
          scale.create(scaleOptions);
          coord.create(coordOption);
        };
        Chart2.prototype.willReceiveProps = function(nextProps, context) {
          var _a = this, scale = _a.scale, coord = _a.coord, lastProps = _a.props;
          var nextStyle = nextProps.style, nextData = nextProps.data, nextScale = nextProps.scale;
          var lastStyle = lastProps.style, lastData = lastProps.data, lastScale = lastProps.scale;
          if (!(0, _fEngine.isEqual)(nextStyle, lastStyle) || context !== this.context) {
            var style = this.getStyle(nextProps);
            coord.updateLayout(style);
          }
          if (nextData !== lastData) {
            scale.changeData(nextData);
          }
          if (!(0, _fEngine.isEqual)(nextScale, lastScale)) {
            scale.update(nextScale);
          }
        };
        Chart2.prototype.willUpdate = function() {
          this.coord.create(this.props.coord);
        };
        Chart2.prototype.on = function(eventName, listener) {
          var roolEl = this.coordRef.current;
          if (!roolEl || !roolEl.gesture)
            return;
          var gesture = roolEl.gesture;
          gesture.on(eventName, listener);
        };
        Chart2.prototype.off = function(eventName, listener) {
          var roolEl = this.coordRef.current;
          if (!roolEl || !roolEl.gesture)
            return;
          var gesture = roolEl.gesture;
          gesture.off(eventName, listener);
        };
        Chart2.prototype.layoutCoord = function(layout) {
          this.coord.useLayout(layout);
        };
        Chart2.prototype.resetCoordLayout = function() {
          var _a = this, coord = _a.coord, props = _a.props;
          var style = this.getStyle(props);
          coord.updateLayout(style);
        };
        Chart2.prototype.updateAdjust = function(adjust) {
          this.adjust = adjust;
        };
        Chart2.prototype.updateCoordLayout = function(layout) {
          var _this = this;
          if ((0, _util.isArray)(layout)) {
            layout.forEach(function(item) {
              _this.layoutCoord(item);
            });
            return;
          }
          this.layoutCoord(layout);
        };
        Chart2.prototype.updateCoordFor = function(component, layout) {
          var _this = this;
          if (!layout)
            return;
          var componentsPosition = this.componentsPosition;
          var componentPosition = {
            component,
            layout
          };
          var existIndex = (0, _util.findIndex)(componentsPosition, function(item) {
            return item.component === component;
          });
          if (existIndex > -1) {
            componentsPosition.splice(existIndex, 1, componentPosition);
            this.resetCoordLayout();
            this.removeComponentsPositionCache();
            componentsPosition.forEach(function(componentPosition2) {
              var layout2 = componentPosition2.layout;
              _this.updateCoordLayout(layout2);
            });
            return;
          }
          componentsPosition.push(componentPosition);
          this.updateCoordLayout(layout);
        };
        Chart2.prototype.removeComponentsPositionCache = function() {
          var _a;
          if (!((_a = this.componentsPosition) === null || _a === void 0 ? void 0 : _a.length))
            return;
          for (var i = this.componentsPosition.length; i > -1; i--) {
            var item = this.componentsPosition[i];
            if (item && item.component && item.component.destroyed) {
              this.componentsPosition.splice(i, 1);
            }
          }
        };
        Chart2.prototype.getGeometrys = function() {
          var children = this.children.children;
          var geometrys = [];
          _fEngine.Children.toArray(children).forEach(function(element) {
            if (!element)
              return false;
            var component = element.component;
            if (component && component.isGeometry) {
              geometrys.push(component);
            }
          });
          return geometrys;
        };
        Chart2.prototype.getPosition = function(record) {
          var coord = this.getCoord();
          var xScale = this.getXScales()[0];
          var xField = xScale.field;
          var yScales = this.getYScales();
          var yScale = yScales[0];
          var yField = yScale.field;
          for (var i = 0, len = yScales.length; i < len; i++) {
            var scale = yScales[i];
            var field = scale.field;
            if (record[field]) {
              yScale = scale;
              yField = field;
              break;
            }
          }
          var x = xScale.scale(record[xField]);
          var y = yScale.scale(record[yField]);
          return coord.convertPoint({
            x,
            y
          });
        };
        Chart2.prototype.getSnapRecords = function(point, inCoordRange) {
          var geometrys = this.getGeometrys();
          if (!geometrys.length)
            return;
          return geometrys[0].getSnapRecords(point, inCoordRange);
        };
        Chart2.prototype.getRecords = function(data, field) {
          var geometrys = this.getGeometrys();
          if (!geometrys.length)
            return;
          return geometrys[0].getRecords(data, field);
        };
        Chart2.prototype.getLegendItems = function(point) {
          var geometrys = this.getGeometrys();
          if (!geometrys.length)
            return;
          return geometrys[0].getLegendItems(point);
        };
        Chart2.prototype.setScale = function(field, option) {
          this.scale.setScale(field, option);
        };
        Chart2.prototype.getScale = function(field) {
          return this.scale.getScale(field);
        };
        Chart2.prototype.getScales = function() {
          return this.scale.getScales();
        };
        Chart2.prototype.getXScales = function() {
          var geometrys = this.getGeometrys();
          return geometrys.map(function(component) {
            return component.getXScale();
          });
        };
        Chart2.prototype.getYScales = function() {
          var geometrys = this.getGeometrys();
          return geometrys.map(function(component) {
            return component.getYScale();
          });
        };
        Chart2.prototype.getColorScales = function() {
          var geometrys = this.getGeometrys();
          return geometrys.map(function(component) {
            return component.getColorScale();
          });
        };
        Chart2.prototype.getLayout = function() {
          return this.coord.layout;
        };
        Chart2.prototype.getCoord = function() {
          return this.coord.coord;
        };
        Chart2.prototype.filter = function(field, condition) {
          var _a;
          var filters = this.state.filters;
          this.setState({
            filters: (0, _tslib.__assign)((0, _tslib.__assign)({}, filters), (_a = {}, _a[field] = condition, _a))
          });
        };
        Chart2.prototype._getRenderData = function() {
          var _a = this, props = _a.props, state = _a.state;
          var data = props.data;
          var filters = state.filters;
          if (!filters || !Object.keys(filters).length) {
            return data;
          }
          var filteredData = data;
          (0, _util.each)(filters, function(condition, field) {
            if (!condition)
              return;
            filteredData = filteredData.filter(function(record) {
              return condition(record[field], record);
            });
          });
          return filteredData;
        };
        Chart2.prototype.render = function() {
          var _this = this;
          var _a = this, props = _a.props, scale = _a.scale, chartLayout = _a.layout;
          var children = props.children, originData = props.data;
          if (!originData)
            return null;
          var data = this._getRenderData();
          var layout = this.getLayout();
          var coord = this.getCoord();
          var scaleOptions = scale.getOptions();
          var width = chartLayout.width, height = chartLayout.height;
          return (0, _fEngine.jsx)("group", {
            ref: this.coordRef,
            style: {
              width,
              height,
              fill: "transparent"
            }
          }, _fEngine.Children.map(children, function(child) {
            return _fEngine.Children.cloneElement(child, {
              data,
              chart: _this,
              layout,
              coord,
              // 传 scaleOptions 是为了让 child 感知到 props 的的变化，合理的做法的应该是传递 scale，但是现在无法感知到 scale 的变化, 所以暂时只能先这么处理，scaleOptions 子组件目前是使用不到的。
              scaleOptions
            });
          }));
        };
        return Chart2;
      }(_fEngine.Component)
    );
    var _default = exports.default = Chart;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/geometry/selection.js
var require_selection = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/geometry/selection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    function isEqual(origin1, origin2, fields) {
      if (origin1 === origin2) {
        return true;
      }
      for (var i = 0, len = fields.length; i < len; i++) {
        var field = fields[i];
        if (origin1[field] !== origin2[field]) {
          return false;
        }
      }
      return true;
    }
    var Selection = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Selection2, _super);
        function Selection2(props, context) {
          var _this = _super.call(this, props, context) || this;
          var selection = props.selection;
          if (!selection)
            return _this;
          var defaultSelected = selection.defaultSelected;
          _this.state.selected = defaultSelected;
          return _this;
        }
        Selection2.prototype.didMount = function() {
          var _this = this;
          var _a = this, props = _a.props, state = _a.state;
          var selection = props.selection, chart = props.chart;
          if (!selection)
            return;
          var _b = selection.triggerOn, triggerOn = _b === void 0 ? "click" : _b, onChange = selection.onChange;
          chart.on(triggerOn, function(ev) {
            var points = ev.points, x = ev.canvasX, y = ev.canvasY;
            var point = triggerOn === "click" ? {
              x,
              y
            } : points[0];
            var records = _this.getSnapRecords(point);
            var _a2 = selection.type, type = _a2 === void 0 ? "single" : _a2, _b2 = selection.cancelable, cancelable = _b2 === void 0 ? true : _b2;
            if (!records || !records.length) {
              if (cancelable) {
                onChange && onChange({
                  selected: null
                });
                _this.setState({
                  selected: null
                });
              }
              return;
            }
            var selected = state.selected;
            var origins = records.map(function(record) {
              return record.origin;
            });
            if (!selected || !selected.length) {
              onChange && onChange({
                selected: origins
              });
              _this.setState({
                selected: origins
              });
            }
            if (type === "single") {
              if (!cancelable) {
                onChange && onChange({
                  selected: origins
                });
                _this.setState({
                  selected: origins
                });
                return;
              }
              var newSelected_1 = [];
              records.forEach(function(record) {
                if (!_this.isSelected(record)) {
                  newSelected_1.push(record.origin);
                }
              });
              onChange && onChange({
                selected: newSelected_1
              });
              _this.setState({
                selected: newSelected_1
              });
              return;
            }
            var scales = chart.getScales();
            var fields = Object.keys(scales);
            var selectedMap = {};
            selected.forEach(function(item) {
              var key = fields.map(function(field) {
                return item[field];
              }).join("-");
              selectedMap[key] = item;
            });
            records.forEach(function(record) {
              var origin = record.origin;
              var key = fields.map(function(field) {
                return origin[field];
              }).join("-");
              selectedMap[key] = selectedMap[key] ? null : origin;
            });
            var newSelected = Object.keys(selectedMap).map(function(key) {
              return selectedMap[key];
            }).filter(Boolean);
            onChange && onChange({
              selected: newSelected
            });
            _this.setState({
              selected: newSelected
            });
          });
        };
        Selection2.prototype.willReceiveProps = function(nextProps) {
          var nextSelection = nextProps.selection;
          var lastSelection = this.props.selection;
          if (!nextSelection || !lastSelection) {
            return;
          }
          var nextDefaultSelected = nextSelection.defaultSelected;
          var lastDefaultSelected = lastSelection.defaultSelected;
          if (!(0, _fEngine.isEqual)(nextDefaultSelected, lastDefaultSelected)) {
            this.state.selected = nextDefaultSelected;
          }
        };
        Selection2.prototype.getSnapRecords = function(_point) {
          return null;
        };
        Selection2.prototype.isSelected = function(record) {
          var _a = this, state = _a.state, props = _a.props;
          var selected = state.selected;
          if (!selected || !selected.length) {
            return false;
          }
          var chart = props.chart;
          var scales = chart.getScales();
          var fields = Object.keys(scales);
          for (var i = 0, len = selected.length; i < len; i++) {
            var item = selected[i];
            if (isEqual(record.origin, item, fields)) {
              return true;
            }
          }
          return false;
        };
        Selection2.prototype.getSelectionStyle = function(record) {
          var _a = this, state = _a.state, props = _a.props;
          var selected = state.selected;
          if (!selected || !selected.length) {
            return null;
          }
          var selection = props.selection;
          var selectedStyle = selection.selectedStyle, unSelectedStyle = selection.unSelectedStyle;
          var isSelected = this.isSelected(record);
          if (isSelected) {
            return (0, _util.isFunction)(selectedStyle) ? selectedStyle(record) : selectedStyle;
          }
          return (0, _util.isFunction)(unSelectedStyle) ? unSelectedStyle(record) : unSelectedStyle;
        };
        return Selection2;
      }(_fEngine.Component)
    );
    var _default = exports.default = Selection;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/constant.js
var require_constant = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/constant.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MARGIN_RATIO = exports.GAP = exports.DODGE_RATIO = exports.DEFAULT_Y = void 0;
    var DEFAULT_Y = exports.DEFAULT_Y = 0;
    var MARGIN_RATIO = exports.MARGIN_RATIO = 1 / 2;
    var DODGE_RATIO = exports.DODGE_RATIO = 1 / 2;
    var GAP = exports.GAP = 0.05;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/adjust.js
var require_adjust = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/adjust.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _constant = require_constant();
    var Adjust = (
      /** @class */
      function() {
        function Adjust2(cfg) {
          this.indexMap = {};
          var xField = cfg.xField, yField = cfg.yField, _a = cfg.adjustNames, adjustNames = _a === void 0 ? ["x", "y"] : _a, dimValuesMap = cfg.dimValuesMap;
          this.adjustNames = adjustNames;
          this.xField = xField;
          this.yField = yField;
          this.dimValuesMap = dimValuesMap;
        }
        Adjust2.prototype.isAdjust = function(dim) {
          return this.adjustNames.indexOf(dim) >= 0;
        };
        Adjust2.prototype.setIndexMap = function(_a) {
          var key = _a.key, index = _a.index;
          this.indexMap[key] = index;
        };
        Adjust2.prototype.getAdjustRange = function(dim, dimValue, values) {
          var yField = this.yField;
          var index = values.indexOf(dimValue);
          var length = values.length;
          var pre;
          var next;
          if (!yField && this.isAdjust("y")) {
            pre = 0;
            next = 1;
          } else if (length > 1) {
            pre = values[index === 0 ? 0 : index - 1];
            next = values[index === length - 1 ? length - 1 : index + 1];
            if (index !== 0) {
              pre += (dimValue - pre) / 2;
            } else {
              pre -= (next - dimValue) / 2;
            }
            if (index !== length - 1) {
              next -= (next - dimValue) / 2;
            } else {
              next += (dimValue - values[length - 2]) / 2;
            }
          } else {
            pre = dimValue === 0 ? 0 : dimValue - 0.5;
            next = dimValue === 0 ? 1 : dimValue + 0.5;
          }
          return {
            pre,
            next
          };
        };
        Adjust2.prototype.adjustData = function(groupedDataArray, mergedData) {
          var _this = this;
          var dimValuesMap = this.getDimValues(mergedData);
          (0, _util.each)(groupedDataArray, function(dataArray, index) {
            (0, _util.each)(dimValuesMap, function(values, dim) {
              _this.adjustDim(dim, values, dataArray, index);
            });
          });
        };
        Adjust2.prototype.groupData = function(data, dim) {
          (0, _util.each)(data, function(record) {
            if (record[dim] === void 0) {
              record[dim] = _constant.DEFAULT_Y;
            }
          });
          return (0, _util.groupBy)(data, dim);
        };
        Adjust2.prototype.adjustDim = function(_dim, _values, _data, _index) {
        };
        Adjust2.prototype.getDimValues = function(mergedData) {
          var _a = this, xField = _a.xField, yField = _a.yField;
          var dimValuesMap = (0, _util.assign)({}, this.dimValuesMap);
          var dims = [];
          if (xField && this.isAdjust("x")) {
            dims.push(xField);
          }
          if (yField && this.isAdjust("y")) {
            dims.push(yField);
          }
          dims.forEach(function(dim2) {
            if (dimValuesMap && dimValuesMap[dim2]) {
              return;
            }
            dimValuesMap[dim2] = (0, _util.valuesOfKey)(mergedData, dim2).sort(function(v1, v2) {
              return v1 - v2;
            }).filter(function(v) {
              return !isNaN(v);
            });
          });
          if (!yField && this.isAdjust("y")) {
            var dim = "y";
            dimValuesMap[dim] = [_constant.DEFAULT_Y, 1];
          }
          return dimValuesMap;
        };
        return Adjust2;
      }()
    );
    var _default = exports.default = Adjust;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/dodge.js
var require_dodge = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/dodge.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _constant = require_constant();
    var _adjust = _interopRequireDefault(require_adjust());
    var Dodge = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Dodge2, _super);
        function Dodge2(cfg) {
          var _this = _super.call(this, cfg) || this;
          _this.cacheMap = {};
          _this.adjustDataArray = [];
          _this.mergeData = [];
          _this.rangeMap = {};
          var _a = cfg.marginRatio, marginRatio = _a === void 0 ? _constant.MARGIN_RATIO : _a, _b = cfg.dodgeRatio, dodgeRatio = _b === void 0 ? _constant.DODGE_RATIO : _b, dodgeBy = cfg.dodgeBy, intervalPadding = cfg.intervalPadding, dodgePadding = cfg.dodgePadding, xDimensionLength = cfg.xDimensionLength, groupNum = cfg.groupNum, defaultSize = cfg.defaultSize, maxColumnWidth = cfg.maxColumnWidth, minColumnWidth = cfg.minColumnWidth, columnWidthRatio = cfg.columnWidthRatio, customOffset = cfg.customOffset;
          _this.marginRatio = marginRatio;
          _this.dodgeRatio = dodgeRatio;
          _this.dodgeBy = dodgeBy;
          _this.intervalPadding = intervalPadding;
          _this.dodgePadding = dodgePadding;
          _this.xDimensionLegenth = xDimensionLength;
          _this.groupNum = groupNum;
          _this.defaultSize = defaultSize;
          _this.maxColumnWidth = maxColumnWidth;
          _this.minColumnWidth = minColumnWidth;
          _this.columnWidthRatio = columnWidthRatio;
          _this.customOffset = customOffset;
          return _this;
        }
        Dodge2.prototype.process = function(groupDataArray) {
          var groupedDataArray = (0, _util.clone)(groupDataArray);
          var mergeData = (0, _util.flatten)(groupedDataArray);
          var dodgeBy = this.dodgeBy;
          var adjustDataArray = dodgeBy ? (0, _util.group)(mergeData, dodgeBy) : groupedDataArray;
          this.cacheMap = {};
          this.adjustDataArray = adjustDataArray;
          this.mergeData = mergeData;
          this.adjustData(adjustDataArray, mergeData);
          this.adjustDataArray = [];
          this.mergeData = [];
          return groupedDataArray;
        };
        Dodge2.prototype.getPositionInfo = function(record, dim, frameIndexKey) {
          var customOffset = this.customOffset;
          var value = record[dim];
          var map = this.cacheMap[dim];
          var valueArr = map[value];
          var frameIndex = this.indexMap[frameIndexKey];
          var valIndex = valueArr.indexOf(frameIndex);
          var range = this.rangeMap[value];
          if (!(0, _util.isNil)(customOffset)) {
            var pre = range.pre, next = range.next;
            record[dim] = (0, _util.isFunction)(customOffset) ? customOffset(record, range) : (pre + next) / 2 + customOffset;
          } else {
            record[dim] = this.getDodgeOffset(range, valIndex, valueArr.length);
          }
          return record;
        };
        Dodge2.prototype.adjustDim = function(dim, values, data, frameIndex) {
          var _this = this;
          var customOffset = this.customOffset;
          var map = this.getDistribution(dim);
          var groupData = this.groupData(data, dim);
          (0, _util.each)(groupData, function(group, key) {
            var range;
            if (values.length === 1) {
              range = {
                pre: values[0] - 1,
                next: values[0] + 1
              };
            } else {
              range = _this.getAdjustRange(dim, parseFloat(key), values);
            }
            _this.rangeMap[key] = range;
            (0, _util.each)(group, function(d) {
              var value = d[dim];
              var valueArr = map[value];
              var valIndex = valueArr.indexOf(frameIndex);
              if (!(0, _util.isNil)(customOffset)) {
                var pre = range.pre, next = range.next;
                d[dim] = (0, _util.isFunction)(customOffset) ? customOffset(d, range) : (pre + next) / 2 + customOffset;
              } else {
                d[dim] = _this.getDodgeOffset(range, valIndex, valueArr.length);
              }
            });
          });
          return [];
        };
        Dodge2.prototype.getDodgeOffset = function(range, idx, len) {
          var _a = this, dodgeRatio = _a.dodgeRatio, marginRatio = _a.marginRatio, intervalPadding = _a.intervalPadding, dodgePadding = _a.dodgePadding;
          var pre = range.pre, next = range.next;
          var tickLength = next - pre;
          var position;
          if (!(0, _util.isNil)(intervalPadding) && (0, _util.isNil)(dodgePadding) && intervalPadding >= 0) {
            var offset = this.getIntervalOnlyOffset(len, idx);
            position = pre + offset;
          } else if (!(0, _util.isNil)(dodgePadding) && (0, _util.isNil)(intervalPadding) && dodgePadding >= 0) {
            var offset = this.getDodgeOnlyOffset(len, idx);
            position = pre + offset;
          } else if (!(0, _util.isNil)(intervalPadding) && !(0, _util.isNil)(dodgePadding) && intervalPadding >= 0 && dodgePadding >= 0) {
            var offset = this.getIntervalAndDodgeOffset(len, idx);
            position = pre + offset;
          } else {
            var width = tickLength * dodgeRatio / len;
            var margin = marginRatio * width;
            var offset = 1 / 2 * (tickLength - len * width - (len - 1) * margin) + ((idx + 1) * width + idx * margin) - 1 / 2 * width - 1 / 2 * tickLength;
            position = (pre + next) / 2 + offset;
          }
          return position;
        };
        Dodge2.prototype.getIntervalOnlyOffset = function(len, idx) {
          var _a = this, defaultSize = _a.defaultSize, intervalPadding = _a.intervalPadding, xDimensionLegenth = _a.xDimensionLegenth, groupNum = _a.groupNum, dodgeRatio = _a.dodgeRatio, maxColumnWidth = _a.maxColumnWidth, minColumnWidth = _a.minColumnWidth, columnWidthRatio = _a.columnWidthRatio;
          var normalizedIntervalPadding = intervalPadding / xDimensionLegenth;
          var normalizedDodgePadding = (1 - (groupNum - 1) * normalizedIntervalPadding) / groupNum * dodgeRatio / (len - 1);
          var geomWidth = ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum - normalizedDodgePadding * (len - 1)) / len;
          geomWidth = !(0, _util.isNil)(columnWidthRatio) ? 1 / groupNum / len * columnWidthRatio : geomWidth;
          if (!(0, _util.isNil)(maxColumnWidth)) {
            var normalizedMaxWidht = maxColumnWidth / xDimensionLegenth;
            geomWidth = Math.min(geomWidth, normalizedMaxWidht);
          }
          if (!(0, _util.isNil)(minColumnWidth)) {
            var normalizedMinWidht = minColumnWidth / xDimensionLegenth;
            geomWidth = Math.max(geomWidth, normalizedMinWidht);
          }
          geomWidth = defaultSize ? defaultSize / xDimensionLegenth : geomWidth;
          normalizedDodgePadding = ((1 - (groupNum - 1) * normalizedIntervalPadding) / groupNum - len * geomWidth) / (len - 1);
          var offset = ((1 / 2 + idx) * geomWidth + idx * normalizedDodgePadding + 1 / 2 * normalizedIntervalPadding) * groupNum - normalizedIntervalPadding / 2;
          return offset;
        };
        Dodge2.prototype.getDodgeOnlyOffset = function(len, idx) {
          var _a = this, defaultSize = _a.defaultSize, dodgePadding = _a.dodgePadding, xDimensionLegenth = _a.xDimensionLegenth, groupNum = _a.groupNum, marginRatio = _a.marginRatio, maxColumnWidth = _a.maxColumnWidth, minColumnWidth = _a.minColumnWidth, columnWidthRatio = _a.columnWidthRatio;
          var normalizedDodgePadding = dodgePadding / xDimensionLegenth;
          var normalizedIntervalPadding = 1 * marginRatio / (groupNum - 1);
          var geomWidth = ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum - normalizedDodgePadding * (len - 1)) / len;
          geomWidth = columnWidthRatio ? 1 / groupNum / len * columnWidthRatio : geomWidth;
          if (!(0, _util.isNil)(maxColumnWidth)) {
            var normalizedMaxWidht = maxColumnWidth / xDimensionLegenth;
            geomWidth = Math.min(geomWidth, normalizedMaxWidht);
          }
          if (!(0, _util.isNil)(minColumnWidth)) {
            var normalizedMinWidht = minColumnWidth / xDimensionLegenth;
            geomWidth = Math.max(geomWidth, normalizedMinWidht);
          }
          geomWidth = defaultSize ? defaultSize / xDimensionLegenth : geomWidth;
          normalizedIntervalPadding = (1 - (geomWidth * len + normalizedDodgePadding * (len - 1)) * groupNum) / (groupNum - 1);
          var offset = ((1 / 2 + idx) * geomWidth + idx * normalizedDodgePadding + 1 / 2 * normalizedIntervalPadding) * groupNum - normalizedIntervalPadding / 2;
          return offset;
        };
        Dodge2.prototype.getIntervalAndDodgeOffset = function(len, idx) {
          var _a = this, intervalPadding = _a.intervalPadding, dodgePadding = _a.dodgePadding, xDimensionLegenth = _a.xDimensionLegenth, groupNum = _a.groupNum;
          var normalizedIntervalPadding = intervalPadding / xDimensionLegenth;
          var normalizedDodgePadding = dodgePadding / xDimensionLegenth;
          var geomWidth = ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum - normalizedDodgePadding * (len - 1)) / len;
          var offset = ((1 / 2 + idx) * geomWidth + idx * normalizedDodgePadding + 1 / 2 * normalizedIntervalPadding) * groupNum - normalizedIntervalPadding / 2;
          return offset;
        };
        Dodge2.prototype.getDistribution = function(dim) {
          var groupedDataArray = this.adjustDataArray;
          var cacheMap = this.cacheMap;
          var map = cacheMap[dim];
          if (!map) {
            map = {};
            (0, _util.each)(groupedDataArray, function(data, index) {
              var values = (0, _util.valuesOfKey)(data, dim);
              if (!values.length) {
                values.push(0);
              }
              (0, _util.each)(values, function(val) {
                if (!map[val]) {
                  map[val] = [];
                }
                map[val].push(index);
              });
            });
            cacheMap[dim] = map;
          }
          return map;
        };
        return Dodge2;
      }(_adjust.default)
    );
    var _default = exports.default = Dodge;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/jitter.js
var require_jitter = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/jitter.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _constant = require_constant();
    var _adjust = _interopRequireDefault(require_adjust());
    function randomNumber(min, max) {
      return (max - min) * Math.random() + min;
    }
    var Jitter = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Jitter2, _super);
        function Jitter2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Jitter2.prototype.process = function(groupDataArray) {
          var groupedDataArray = (0, _util.clone)(groupDataArray);
          var mergeData = (0, _util.flatten)(groupedDataArray);
          this.adjustData(groupedDataArray, mergeData);
          return groupedDataArray;
        };
        Jitter2.prototype.adjustDim = function(dim, values, dataArray) {
          var _this = this;
          var groupDataArray = this.groupData(dataArray, dim);
          return (0, _util.each)(groupDataArray, function(data, dimValue) {
            return _this.adjustGroup(data, dim, parseFloat(dimValue), values);
          });
        };
        Jitter2.prototype.getAdjustOffset = function(range) {
          var pre = range.pre, next = range.next;
          var margin = (next - pre) * _constant.GAP;
          return randomNumber(pre + margin, next - margin);
        };
        Jitter2.prototype.adjustGroup = function(group, dim, dimValue, values) {
          var _this = this;
          var range = this.getAdjustRange(dim, dimValue, values);
          (0, _util.each)(group, function(data) {
            data[dim] = _this.getAdjustOffset(range);
          });
          return group;
        };
        return Jitter2;
      }(_adjust.default)
    );
    var _default = exports.default = Jitter;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/stack.js
var require_stack = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/stack.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _adjust = _interopRequireDefault(require_adjust());
    var Stack = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Stack2, _super);
        function Stack2(cfg) {
          var _this = _super.call(this, cfg) || this;
          var _a = cfg.adjustNames, adjustNames = _a === void 0 ? ["y"] : _a, _b = cfg.height, height = _b === void 0 ? NaN : _b, _c = cfg.size, size = _c === void 0 ? 10 : _c, _d = cfg.reverseOrder, reverseOrder = _d === void 0 ? false : _d;
          _this.adjustNames = adjustNames;
          _this.height = height;
          _this.size = size;
          _this.reverseOrder = reverseOrder;
          return _this;
        }
        Stack2.prototype.process = function(groupDataArray) {
          var _a = this, yField = _a.yField, reverseOrder = _a.reverseOrder;
          var d = yField ? this.processStack(groupDataArray) : this.processOneDimStack(groupDataArray);
          return reverseOrder ? this.reverse(d) : d;
        };
        Stack2.prototype.reverse = function(groupedDataArray) {
          return groupedDataArray.slice(0).reverse();
        };
        Stack2.prototype.processStack = function(groupDataArray) {
          var _a = this, xField = _a.xField, yField = _a.yField, reverseOrder = _a.reverseOrder;
          var groupedDataArray = reverseOrder ? this.reverse(groupDataArray) : groupDataArray;
          var positive = new _util.Cache();
          var negative = new _util.Cache();
          return groupedDataArray.map(function(dataArray) {
            return dataArray.map(function(data) {
              var _a2;
              var x = (0, _util.get)(data, xField, 0);
              var y = (0, _util.get)(data, [yField]);
              var xKey = x.toString();
              y = (0, _util.isArray)(y) ? y[1] : y;
              if (!(0, _util.isNil)(y)) {
                var cache = y >= 0 ? positive : negative;
                if (!cache.has(xKey)) {
                  cache.set(xKey, 0);
                }
                var xValue = cache.get(xKey);
                var newXValue = y + xValue;
                cache.set(xKey, newXValue);
                return (0, _tslib.__assign)((0, _tslib.__assign)({}, data), (_a2 = {}, _a2[yField] = [xValue, newXValue], _a2));
              }
              return data;
            });
          });
        };
        Stack2.prototype.processOneDimStack = function(groupDataArray) {
          var _this = this;
          var _a = this, xField = _a.xField, height = _a.height, reverseOrder = _a.reverseOrder;
          var yField = "y";
          var groupedDataArray = reverseOrder ? this.reverse(groupDataArray) : groupDataArray;
          var cache = new _util.Cache();
          return groupedDataArray.map(function(dataArray) {
            return dataArray.map(function(data) {
              var _a2;
              var size = _this.size;
              var xValue = data[xField];
              var stackHeight = size * 2 / height;
              if (!cache.has(xValue)) {
                cache.set(xValue, stackHeight / 2);
              }
              var stackValue = cache.get(xValue);
              cache.set(xValue, stackValue + stackHeight);
              return (0, _tslib.__assign)((0, _tslib.__assign)({}, data), (_a2 = {}, _a2[yField] = stackValue, _a2));
            });
          });
        };
        return Stack2;
      }(_adjust.default)
    );
    var _default = exports.default = Stack;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/symmetric.js
var require_symmetric = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/adjusts/symmetric.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _adjust = _interopRequireDefault(require_adjust());
    var Symmetric = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Symmetric2, _super);
        function Symmetric2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Symmetric2.prototype.process = function(groupDataArray) {
          var mergeData = (0, _util.flatten)(groupDataArray);
          var _a = this, xField = _a.xField, yField = _a.yField;
          var cache = this.getXValuesMaxMap(mergeData);
          var max = Math.max.apply(Math, Object.keys(cache).map(function(key) {
            return cache[key];
          }));
          return (0, _util.map)(groupDataArray, function(dataArray) {
            return (0, _util.map)(dataArray, function(data) {
              var _a2, _b;
              var yValue = data[yField];
              var xValue = data[xField];
              if ((0, _util.isArray)(yValue)) {
                var off_1 = (max - cache[xValue]) / 2;
                return (0, _tslib.__assign)((0, _tslib.__assign)({}, data), (_a2 = {}, _a2[yField] = (0, _util.map)(yValue, function(y) {
                  return off_1 + y;
                }), _a2));
              }
              var offset = (max - yValue) / 2;
              return (0, _tslib.__assign)((0, _tslib.__assign)({}, data), (_b = {}, _b[yField] = [offset, yValue + offset], _b));
            });
          });
        };
        Symmetric2.prototype.getXValuesMaxMap = function(mergeData) {
          var _this = this;
          var _a = this, xField = _a.xField, yField = _a.yField;
          var groupDataArray = (0, _util.groupBy)(mergeData, function(data) {
            return data[xField];
          });
          return (0, _util.mapValues)(groupDataArray, function(dataArray) {
            return _this.getDimMaxValue(dataArray, yField);
          });
        };
        Symmetric2.prototype.getDimMaxValue = function(mergeData, dim) {
          var dimValues = (0, _util.map)(mergeData, function(data) {
            return (0, _util.get)(data, dim, []);
          });
          var flattenValues = (0, _util.flatten)(dimValues);
          return Math.max.apply(Math, flattenValues);
        };
        return Symmetric2;
      }(_adjust.default)
    );
    var _default = exports.default = Symmetric;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/interface.js
var require_interface = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/index.js
var require_src2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/f2-adjust/src/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _exportNames = {
      Adjust: true,
      Dodge: true,
      Jitter: true,
      Stack: true,
      Symmetric: true
    };
    Object.defineProperty(exports, "Adjust", {
      enumerable: true,
      get: function get() {
        return _adjust.default;
      }
    });
    Object.defineProperty(exports, "Dodge", {
      enumerable: true,
      get: function get() {
        return _dodge.default;
      }
    });
    Object.defineProperty(exports, "Jitter", {
      enumerable: true,
      get: function get() {
        return _jitter.default;
      }
    });
    Object.defineProperty(exports, "Stack", {
      enumerable: true,
      get: function get() {
        return _stack.default;
      }
    });
    Object.defineProperty(exports, "Symmetric", {
      enumerable: true,
      get: function get() {
        return _symmetric.default;
      }
    });
    var _adjust = _interopRequireDefault(require_adjust());
    var _dodge = _interopRequireDefault(require_dodge());
    var _jitter = _interopRequireDefault(require_jitter());
    var _stack = _interopRequireDefault(require_stack());
    var _symmetric = _interopRequireDefault(require_symmetric());
    var _interface = require_interface();
    Object.keys(_interface).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _interface[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _interface[key];
        }
      });
    });
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/util/index.js
var require_util = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/util/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isInBBox = isInBBox;
    exports.toTimeStamp = toTimeStamp;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function toTimeStamp(value) {
      if ((0, _util.isString)(value)) {
        if (value.indexOf("T") > 0) {
          value = new Date(value).getTime();
        } else {
          value = new Date(value.replace(/-/gi, "/")).getTime();
        }
      }
      if ((0, _util.isDate)(value)) {
        value = value.getTime();
      }
      return value;
    }
    function isInBBox(bbox, point) {
      var left = bbox.left, top = bbox.top, width = bbox.width, height = bbox.height;
      var minX = left;
      var maxX = left + width;
      var minY = top;
      var maxY = top + height;
      var x = point.x, y = point.y;
      return minX <= x && maxX >= x && minY <= y && maxY >= y;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/base.js
var require_base5 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/base.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var Base = (
      /** @class */
      function() {
        function Base2(options) {
          (0, _util.mix)(this, options);
          var _a = this, scale = _a.scale, field = _a.field, data = _a.data;
          if (!scale && data) {
            var values = (0, _util.valuesOfKey)(data, field);
            this.scale = this.createScale({
              values,
              field
            });
          }
        }
        Base2.prototype.createScale = function(_scaleConfig) {
          return null;
        };
        Base2.prototype._mapping = function(value) {
          return value;
        };
        Base2.prototype.update = function(options) {
          (0, _util.mix)(this, options);
        };
        Base2.prototype.setRange = function(range) {
          this.range = range;
        };
        Base2.prototype.normalize = function(value) {
          var scale = this.scale;
          if ((0, _util.isArray)(value)) {
            return value.map(function(v) {
              return scale.scale(v);
            });
          }
          return scale.scale(value);
        };
        Base2.prototype.convert = function(value) {
          return value;
        };
        Base2.prototype.mapping = function(value, child) {
          if (child === void 0) {
            child = null;
          }
          var rst = (0, _util.isFunction)(this.callback) ? this.callback(value, child) : null;
          if (!(0, _util.isNil)(rst)) {
            return rst;
          }
          return this._mapping(value);
        };
        return Base2;
      }()
    );
    var _default = exports.default = Base;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/define.js
var require_define = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/define.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.extend = extend;
    function _default(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }
    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition)
        prototype[key] = definition[key];
      return prototype;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/color.js
var require_color = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/color.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Color = Color;
    exports.Rgb = Rgb;
    exports.darker = exports.brighter = void 0;
    exports.default = color;
    exports.hsl = hsl;
    exports.hslConvert = hslConvert;
    exports.rgb = rgb;
    exports.rgbConvert = rgbConvert;
    var _define = _interopRequireWildcard(require_define());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    function Color() {
    }
    var _darker = exports.darker = 0.7;
    var _brighter = exports.brighter = 1 / _darker;
    var reI = "\\s*([+-]?\\d+)\\s*";
    var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
    var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
    var reHex = /^#([0-9a-f]{3,8})$/;
    var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
    var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
    var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
    var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
    var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
    var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
    var named = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    };
    (0, _define.default)(Color, color, {
      copy: function copy(channels) {
        return Object.assign(new this.constructor(), this, channels);
      },
      displayable: function displayable() {
        return this.rgb().displayable();
      },
      hex: color_formatHex,
      // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });
    function color_formatHex() {
      return this.rgb().formatHex();
    }
    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }
    function color_formatRgb() {
      return this.rgb().formatRgb();
    }
    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
    }
    function rgbn(n) {
      return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
    }
    function rgba(r, g, b, a) {
      if (a <= 0)
        r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }
    function rgbConvert(o) {
      if (!(o instanceof Color))
        o = color(o);
      if (!o)
        return new Rgb();
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }
    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }
    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }
    (0, _define.default)(Rgb, rgb, (0, _define.extend)(Color, {
      brighter: function brighter(k) {
        k = k == null ? _brighter : Math.pow(_brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function darker(k) {
        k = k == null ? _darker : Math.pow(_darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function rgb2() {
        return this;
      },
      displayable: function displayable() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
      },
      hex: rgb_formatHex,
      // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));
    function rgb_formatHex() {
      return "#" + hex(this.r) + hex(this.g) + hex(this.b);
    }
    function rgb_formatRgb() {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
    }
    function hex(value) {
      value = Math.max(0, Math.min(255, Math.round(value) || 0));
      return (value < 16 ? "0" : "") + value.toString(16);
    }
    function hsla(h, s, l, a) {
      if (a <= 0)
        h = s = l = NaN;
      else if (l <= 0 || l >= 1)
        h = s = NaN;
      else if (s <= 0)
        h = NaN;
      return new Hsl(h, s, l, a);
    }
    function hslConvert(o) {
      if (o instanceof Hsl)
        return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color))
        o = color(o);
      if (!o)
        return new Hsl();
      if (o instanceof Hsl)
        return o;
      o = o.rgb();
      var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
      if (s) {
        if (r === max)
          h = (g - b) / s + (g < b) * 6;
        else if (g === max)
          h = (b - r) / s + 2;
        else
          h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }
    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }
    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }
    (0, _define.default)(Hsl, hsl, (0, _define.extend)(Color, {
      brighter: function brighter(k) {
        k = k == null ? _brighter : Math.pow(_brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function darker(k) {
        k = k == null ? _darker : Math.pow(_darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function rgb2() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
      },
      displayable: function displayable() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
      },
      formatHsl: function formatHsl() {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
      }
    }));
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/math.js
var require_math2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/math.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.radians = exports.degrees = void 0;
    var radians = exports.radians = Math.PI / 180;
    var degrees = exports.degrees = 180 / Math.PI;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/lab.js
var require_lab = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/lab.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Hcl = Hcl;
    exports.Lab = Lab;
    exports.default = lab;
    exports.gray = gray;
    exports.hcl = hcl;
    exports.lch = lch;
    var _define = _interopRequireWildcard(require_define());
    var _color = require_color();
    var _math = require_math2();
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    var K = 18;
    var Xn = 0.96422;
    var Yn = 1;
    var Zn = 0.82521;
    var t0 = 4 / 29;
    var t1 = 6 / 29;
    var t2 = 3 * t1 * t1;
    var t3 = t1 * t1 * t1;
    function labConvert(o) {
      if (o instanceof Lab)
        return new Lab(o.l, o.a, o.b, o.opacity);
      if (o instanceof Hcl)
        return hcl2lab(o);
      if (!(o instanceof _color.Rgb))
        o = (0, _color.rgbConvert)(o);
      var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
      if (r === g && g === b)
        x = z = y;
      else {
        x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
        z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
      }
      return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
    }
    function gray(l, opacity) {
      return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
    }
    function lab(l, a, b, opacity) {
      return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
    }
    function Lab(l, a, b, opacity) {
      this.l = +l;
      this.a = +a;
      this.b = +b;
      this.opacity = +opacity;
    }
    (0, _define.default)(Lab, lab, (0, _define.extend)(_color.Color, {
      brighter: function brighter(k) {
        return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      darker: function darker(k) {
        return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
      },
      rgb: function rgb() {
        var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
        x = Xn * lab2xyz(x);
        y = Yn * lab2xyz(y);
        z = Zn * lab2xyz(z);
        return new _color.Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
      }
    }));
    function xyz2lab(t) {
      return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
    }
    function lab2xyz(t) {
      return t > t1 ? t * t * t : t2 * (t - t0);
    }
    function lrgb2rgb(x) {
      return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
    }
    function rgb2lrgb(x) {
      return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }
    function hclConvert(o) {
      if (o instanceof Hcl)
        return new Hcl(o.h, o.c, o.l, o.opacity);
      if (!(o instanceof Lab))
        o = labConvert(o);
      if (o.a === 0 && o.b === 0)
        return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
      var h = Math.atan2(o.b, o.a) * _math.degrees;
      return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
    }
    function lch(l, c, h, opacity) {
      return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
    }
    function hcl(h, c, l, opacity) {
      return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
    }
    function Hcl(h, c, l, opacity) {
      this.h = +h;
      this.c = +c;
      this.l = +l;
      this.opacity = +opacity;
    }
    function hcl2lab(o) {
      if (isNaN(o.h))
        return new Lab(o.l, 0, 0, o.opacity);
      var h = o.h * _math.radians;
      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
    }
    (0, _define.default)(Hcl, hcl, (0, _define.extend)(_color.Color, {
      brighter: function brighter(k) {
        return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
      },
      darker: function darker(k) {
        return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
      },
      rgb: function rgb() {
        return hcl2lab(this).rgb();
      }
    }));
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/cubehelix.js
var require_cubehelix = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/cubehelix.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Cubehelix = Cubehelix;
    exports.default = cubehelix;
    var _define = _interopRequireWildcard(require_define());
    var _color = require_color();
    var _math = require_math2();
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    var A = -0.14861;
    var B = 1.78277;
    var C = -0.29227;
    var D = -0.90649;
    var E = 1.97294;
    var ED = E * D;
    var EB = E * B;
    var BC_DA = B * C - D * A;
    function cubehelixConvert(o) {
      if (o instanceof Cubehelix)
        return new Cubehelix(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof _color.Rgb))
        o = (0, _color.rgbConvert)(o);
      var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * _math.degrees - 120 : NaN;
      return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
    }
    function cubehelix(h, s, l, opacity) {
      return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
    }
    function Cubehelix(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }
    (0, _define.default)(Cubehelix, cubehelix, (0, _define.extend)(_color.Color, {
      brighter: function brighter(k) {
        k = k == null ? _color.brighter : Math.pow(_color.brighter, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function darker(k) {
        k = k == null ? _color.darker : Math.pow(_color.darker, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function rgb() {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * _math.radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
        return new _color.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
      }
    }));
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/index.js
var require_src3 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-color/src/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "color", {
      enumerable: true,
      get: function get() {
        return _color.default;
      }
    });
    Object.defineProperty(exports, "cubehelix", {
      enumerable: true,
      get: function get() {
        return _cubehelix.default;
      }
    });
    Object.defineProperty(exports, "gray", {
      enumerable: true,
      get: function get() {
        return _lab.gray;
      }
    });
    Object.defineProperty(exports, "hcl", {
      enumerable: true,
      get: function get() {
        return _lab.hcl;
      }
    });
    Object.defineProperty(exports, "hsl", {
      enumerable: true,
      get: function get() {
        return _color.hsl;
      }
    });
    Object.defineProperty(exports, "lab", {
      enumerable: true,
      get: function get() {
        return _lab.default;
      }
    });
    Object.defineProperty(exports, "lch", {
      enumerable: true,
      get: function get() {
        return _lab.lch;
      }
    });
    Object.defineProperty(exports, "rgb", {
      enumerable: true,
      get: function get() {
        return _color.rgb;
      }
    });
    var _color = _interopRequireWildcard(require_color());
    var _lab = _interopRequireWildcard(require_lab());
    var _cubehelix = _interopRequireDefault(require_cubehelix());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/basis.js
var require_basis = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/basis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.basis = basis;
    exports.default = _default;
    function basis(t1, v0, v1, v2, v3) {
      var t2 = t1 * t1, t3 = t2 * t1;
      return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
    }
    function _default(values) {
      var n = values.length - 1;
      return function(t) {
        var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
        return basis((t - i / n) * n, v0, v1, v2, v3);
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/basisClosed.js
var require_basisClosed = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/basisClosed.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _basis = require_basis();
    function _default(values) {
      var n = values.length;
      return function(t) {
        var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
        return (0, _basis.basis)((t - i / n) * n, v0, v1, v2, v3);
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/constant.js
var require_constant2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/constant.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = exports.default = function _default2(x) {
      return function() {
        return x;
      };
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/color.js
var require_color2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/color.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = nogamma;
    exports.gamma = gamma;
    exports.hue = hue;
    var _constant = _interopRequireDefault(require_constant2());
    function linear(a, d) {
      return function(t) {
        return a + t * d;
      };
    }
    function exponential(a, b, y) {
      return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
      };
    }
    function hue(a, b) {
      var d = b - a;
      return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0, _constant.default)(isNaN(a) ? b : a);
    }
    function gamma(y) {
      return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : (0, _constant.default)(isNaN(a) ? b : a);
      };
    }
    function nogamma(a, b) {
      var d = b - a;
      return d ? linear(a, d) : (0, _constant.default)(isNaN(a) ? b : a);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/rgb.js
var require_rgb = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/rgb.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.rgbBasisClosed = exports.rgbBasis = exports.default = void 0;
    var _src = require_src3();
    var _basis = _interopRequireDefault(require_basis());
    var _basisClosed = _interopRequireDefault(require_basisClosed());
    var _color = _interopRequireWildcard(require_color2());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    var _default = exports.default = function rgbGamma(y) {
      var color = (0, _color.gamma)(y);
      function rgb(start, end) {
        var r = color((start = (0, _src.rgb)(start)).r, (end = (0, _src.rgb)(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = (0, _color.default)(start.opacity, end.opacity);
        return function(t) {
          start.r = r(t);
          start.g = g(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }
      rgb.gamma = rgbGamma;
      return rgb;
    }(1);
    function rgbSpline(spline) {
      return function(colors) {
        var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
        for (i = 0; i < n; ++i) {
          color = (0, _src.rgb)(colors[i]);
          r[i] = color.r || 0;
          g[i] = color.g || 0;
          b[i] = color.b || 0;
        }
        r = spline(r);
        g = spline(g);
        b = spline(b);
        color.opacity = 1;
        return function(t) {
          color.r = r(t);
          color.g = g(t);
          color.b = b(t);
          return color + "";
        };
      };
    }
    var rgbBasis = exports.rgbBasis = rgbSpline(_basis.default);
    var rgbBasisClosed = exports.rgbBasisClosed = rgbSpline(_basisClosed.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/numberArray.js
var require_numberArray = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/numberArray.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.isNumberArray = isNumberArray;
    function _default(a, b) {
      if (!b)
        b = [];
      var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
      return function(t) {
        for (i = 0; i < n; ++i)
          c[i] = a[i] * (1 - t) + b[i] * t;
        return c;
      };
    }
    function isNumberArray(x) {
      return ArrayBuffer.isView(x) && !(x instanceof DataView);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/array.js
var require_array = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/array.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.genericArray = genericArray;
    var _value = _interopRequireDefault(require_value());
    var _numberArray = _interopRequireWildcard(require_numberArray());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    function _default(a, b) {
      return ((0, _numberArray.isNumberArray)(b) ? _numberArray.default : genericArray)(a, b);
    }
    function genericArray(a, b) {
      var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
      for (i = 0; i < na; ++i)
        x[i] = (0, _value.default)(a[i], b[i]);
      for (; i < nb; ++i)
        c[i] = b[i];
      return function(t) {
        for (i = 0; i < na; ++i)
          c[i] = x[i](t);
        return c;
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/date.js
var require_date = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/date.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(a, b) {
      var d = /* @__PURE__ */ new Date();
      return a = +a, b = +b, function(t) {
        return d.setTime(a * (1 - t) + b * t), d;
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/number.js
var require_number = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/number.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(a, b) {
      return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/object.js
var require_object = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/object.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _typeof2 = _interopRequireDefault(require_typeof());
    var _value = _interopRequireDefault(require_value());
    function _default(a, b) {
      var i = {}, c = {}, k;
      if (a === null || (0, _typeof2.default)(a) !== "object")
        a = {};
      if (b === null || (0, _typeof2.default)(b) !== "object")
        b = {};
      for (k in b) {
        if (k in a) {
          i[k] = (0, _value.default)(a[k], b[k]);
        } else {
          c[k] = b[k];
        }
      }
      return function(t) {
        for (k in i)
          c[k] = i[k](t);
        return c;
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/string.js
var require_string = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/string.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _number = _interopRequireDefault(require_number());
    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    var reB = new RegExp(reA.source, "g");
    function zero(b) {
      return function() {
        return b;
      };
    }
    function one(b) {
      return function(t) {
        return b(t) + "";
      };
    }
    function _default(a, b) {
      var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
      a = a + "", b = b + "";
      while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
        if ((bs = bm.index) > bi) {
          bs = b.slice(bi, bs);
          if (s[i])
            s[i] += bs;
          else
            s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) {
          if (s[i])
            s[i] += bm;
          else
            s[++i] = bm;
        } else {
          s[++i] = null;
          q.push({
            i,
            x: (0, _number.default)(am, bm)
          });
        }
        bi = reB.lastIndex;
      }
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i])
          s[i] += bs;
        else
          s[++i] = bs;
      }
      return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
        for (var i2 = 0, o; i2 < b; ++i2)
          s[(o = q[i2]).i] = o.x(t);
        return s.join("");
      });
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/value.js
var require_value = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/value.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof3 = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _typeof2 = _interopRequireDefault(require_typeof());
    var _src = require_src3();
    var _rgb = _interopRequireDefault(require_rgb());
    var _array = require_array();
    var _date = _interopRequireDefault(require_date());
    var _number = _interopRequireDefault(require_number());
    var _object = _interopRequireDefault(require_object());
    var _string = _interopRequireDefault(require_string());
    var _constant = _interopRequireDefault(require_constant2());
    var _numberArray = _interopRequireWildcard(require_numberArray());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof3(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    function _default(a, b) {
      var t = (0, _typeof2.default)(b), c;
      return b == null || t === "boolean" ? (0, _constant.default)(b) : (t === "number" ? _number.default : t === "string" ? (c = (0, _src.color)(b)) ? (b = c, _rgb.default) : _string.default : b instanceof _src.color ? _rgb.default : b instanceof Date ? _date.default : (0, _numberArray.isNumberArray)(b) ? _numberArray.default : Array.isArray(b) ? _array.genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object.default : _number.default)(a, b);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/discrete.js
var require_discrete = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/discrete.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(range) {
      var n = range.length;
      return function(t) {
        return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/hue.js
var require_hue = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/hue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _color = require_color2();
    function _default(a, b) {
      var i = (0, _color.hue)(+a, +b);
      return function(t) {
        var x = i(t);
        return x - 360 * Math.floor(x / 360);
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/round.js
var require_round = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/round.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(a, b) {
      return a = +a, b = +b, function(t) {
        return Math.round(a * (1 - t) + b * t);
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/transform/decompose.js
var require_decompose = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/transform/decompose.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.identity = void 0;
    var degrees = 180 / Math.PI;
    var identity = exports.identity = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };
    function _default(a, b, c, d, e, f) {
      var scaleX, scaleY, skewX;
      if (scaleX = Math.sqrt(a * a + b * b))
        a /= scaleX, b /= scaleX;
      if (skewX = a * c + b * d)
        c -= a * skewX, d -= b * skewX;
      if (scaleY = Math.sqrt(c * c + d * d))
        c /= scaleY, d /= scaleY, skewX /= scaleY;
      if (a * d < b * c)
        a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
      return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * degrees,
        skewX: Math.atan(skewX) * degrees,
        scaleX,
        scaleY
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/transform/parse.js
var require_parse = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/transform/parse.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseCss = parseCss;
    exports.parseSvg = parseSvg;
    var _decompose = _interopRequireWildcard(require_decompose());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    var svgNode;
    function parseCss(value) {
      var m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
      return m.isIdentity ? _decompose.identity : (0, _decompose.default)(m.a, m.b, m.c, m.d, m.e, m.f);
    }
    function parseSvg(value) {
      if (value == null)
        return _decompose.identity;
      if (!svgNode)
        svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgNode.setAttribute("transform", value);
      if (!(value = svgNode.transform.baseVal.consolidate()))
        return _decompose.identity;
      value = value.matrix;
      return (0, _decompose.default)(value.a, value.b, value.c, value.d, value.e, value.f);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/transform/index.js
var require_transform = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/transform/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.interpolateTransformSvg = exports.interpolateTransformCss = void 0;
    var _number = _interopRequireDefault(require_number());
    var _parse = require_parse();
    function interpolateTransform(parse, pxComma, pxParen, degParen) {
      function pop(s) {
        return s.length ? s.pop() + " " : "";
      }
      function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push("translate(", null, pxComma, null, pxParen);
          q.push({
            i: i - 4,
            x: (0, _number.default)(xa, xb)
          }, {
            i: i - 2,
            x: (0, _number.default)(ya, yb)
          });
        } else if (xb || yb) {
          s.push("translate(" + xb + pxComma + yb + pxParen);
        }
      }
      function rotate(a, b, s, q) {
        if (a !== b) {
          if (a - b > 180)
            b += 360;
          else if (b - a > 180)
            a += 360;
          q.push({
            i: s.push(pop(s) + "rotate(", null, degParen) - 2,
            x: (0, _number.default)(a, b)
          });
        } else if (b) {
          s.push(pop(s) + "rotate(" + b + degParen);
        }
      }
      function skewX(a, b, s, q) {
        if (a !== b) {
          q.push({
            i: s.push(pop(s) + "skewX(", null, degParen) - 2,
            x: (0, _number.default)(a, b)
          });
        } else if (b) {
          s.push(pop(s) + "skewX(" + b + degParen);
        }
      }
      function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push(pop(s) + "scale(", null, ",", null, ")");
          q.push({
            i: i - 4,
            x: (0, _number.default)(xa, xb)
          }, {
            i: i - 2,
            x: (0, _number.default)(ya, yb)
          });
        } else if (xb !== 1 || yb !== 1) {
          s.push(pop(s) + "scale(" + xb + "," + yb + ")");
        }
      }
      return function(a, b) {
        var s = [], q = [];
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null;
        return function(t) {
          var i = -1, n = q.length, o;
          while (++i < n)
            s[(o = q[i]).i] = o.x(t);
          return s.join("");
        };
      };
    }
    var interpolateTransformCss = exports.interpolateTransformCss = interpolateTransform(_parse.parseCss, "px, ", "px)", "deg)");
    var interpolateTransformSvg = exports.interpolateTransformSvg = interpolateTransform(_parse.parseSvg, ", ", ")", ")");
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/zoom.js
var require_zoom = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/zoom.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var epsilon2 = 1e-12;
    function cosh(x) {
      return ((x = Math.exp(x)) + 1 / x) / 2;
    }
    function sinh(x) {
      return ((x = Math.exp(x)) - 1 / x) / 2;
    }
    function tanh(x) {
      return ((x = Math.exp(2 * x)) - 1) / (x + 1);
    }
    var _default = exports.default = function zoomRho(rho, rho2, rho4) {
      function zoom(p0, p1) {
        var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
        if (d2 < epsilon2) {
          S = Math.log(w1 / w0) / rho;
          i = function i2(t) {
            return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
          };
        } else {
          var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
          S = (r1 - r0) / rho;
          i = function i2(t) {
            var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
            return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
          };
        }
        i.duration = S * 1e3 * rho / Math.SQRT2;
        return i;
      }
      zoom.rho = function(_) {
        var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
        return zoomRho(_1, _2, _4);
      };
      return zoom;
    }(Math.SQRT2, 2, 4);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/hsl.js
var require_hsl = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/hsl.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.hslLong = exports.default = void 0;
    var _src = require_src3();
    var _color = _interopRequireWildcard(require_color2());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    function hsl(hue) {
      return function(start, end) {
        var h = hue((start = (0, _src.hsl)(start)).h, (end = (0, _src.hsl)(end)).h), s = (0, _color.default)(start.s, end.s), l = (0, _color.default)(start.l, end.l), opacity = (0, _color.default)(start.opacity, end.opacity);
        return function(t) {
          start.h = h(t);
          start.s = s(t);
          start.l = l(t);
          start.opacity = opacity(t);
          return start + "";
        };
      };
    }
    var _default = exports.default = hsl(_color.hue);
    var hslLong = exports.hslLong = hsl(_color.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/lab.js
var require_lab2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/lab.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = lab;
    var _src = require_src3();
    var _color = _interopRequireDefault(require_color2());
    function lab(start, end) {
      var l = (0, _color.default)((start = (0, _src.lab)(start)).l, (end = (0, _src.lab)(end)).l), a = (0, _color.default)(start.a, end.a), b = (0, _color.default)(start.b, end.b), opacity = (0, _color.default)(start.opacity, end.opacity);
      return function(t) {
        start.l = l(t);
        start.a = a(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/hcl.js
var require_hcl = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/hcl.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.hclLong = exports.default = void 0;
    var _src = require_src3();
    var _color = _interopRequireWildcard(require_color2());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    function hcl(hue) {
      return function(start, end) {
        var h = hue((start = (0, _src.hcl)(start)).h, (end = (0, _src.hcl)(end)).h), c = (0, _color.default)(start.c, end.c), l = (0, _color.default)(start.l, end.l), opacity = (0, _color.default)(start.opacity, end.opacity);
        return function(t) {
          start.h = h(t);
          start.c = c(t);
          start.l = l(t);
          start.opacity = opacity(t);
          return start + "";
        };
      };
    }
    var _default = exports.default = hcl(_color.hue);
    var hclLong = exports.hclLong = hcl(_color.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/cubehelix.js
var require_cubehelix2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/cubehelix.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = exports.cubehelixLong = void 0;
    var _src = require_src3();
    var _color = _interopRequireWildcard(require_color2());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    function cubehelix(hue) {
      return function cubehelixGamma(y) {
        y = +y;
        function cubehelix2(start, end) {
          var h = hue((start = (0, _src.cubehelix)(start)).h, (end = (0, _src.cubehelix)(end)).h), s = (0, _color.default)(start.s, end.s), l = (0, _color.default)(start.l, end.l), opacity = (0, _color.default)(start.opacity, end.opacity);
          return function(t) {
            start.h = h(t);
            start.s = s(t);
            start.l = l(Math.pow(t, y));
            start.opacity = opacity(t);
            return start + "";
          };
        }
        cubehelix2.gamma = cubehelixGamma;
        return cubehelix2;
      }(1);
    }
    var _default = exports.default = cubehelix(_color.hue);
    var cubehelixLong = exports.cubehelixLong = cubehelix(_color.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/piecewise.js
var require_piecewise = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/piecewise.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = piecewise;
    var _value = _interopRequireDefault(require_value());
    function piecewise(interpolate, values) {
      if (values === void 0)
        values = interpolate, interpolate = _value.default;
      var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
      while (i < n)
        I[i] = interpolate(v, v = values[++i]);
      return function(t) {
        var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
        return I[i2](t - i2);
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/quantize.js
var require_quantize2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/quantize.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(interpolator, n) {
      var samples = new Array(n);
      for (var i = 0; i < n; ++i)
        samples[i] = interpolator(i / (n - 1));
      return samples;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/index.js
var require_src4 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-interpolate/src/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "interpolate", {
      enumerable: true,
      get: function get() {
        return _value.default;
      }
    });
    Object.defineProperty(exports, "interpolateArray", {
      enumerable: true,
      get: function get() {
        return _array.default;
      }
    });
    Object.defineProperty(exports, "interpolateBasis", {
      enumerable: true,
      get: function get() {
        return _basis.default;
      }
    });
    Object.defineProperty(exports, "interpolateBasisClosed", {
      enumerable: true,
      get: function get() {
        return _basisClosed.default;
      }
    });
    Object.defineProperty(exports, "interpolateCubehelix", {
      enumerable: true,
      get: function get() {
        return _cubehelix.default;
      }
    });
    Object.defineProperty(exports, "interpolateCubehelixLong", {
      enumerable: true,
      get: function get() {
        return _cubehelix.cubehelixLong;
      }
    });
    Object.defineProperty(exports, "interpolateDate", {
      enumerable: true,
      get: function get() {
        return _date.default;
      }
    });
    Object.defineProperty(exports, "interpolateDiscrete", {
      enumerable: true,
      get: function get() {
        return _discrete.default;
      }
    });
    Object.defineProperty(exports, "interpolateHcl", {
      enumerable: true,
      get: function get() {
        return _hcl.default;
      }
    });
    Object.defineProperty(exports, "interpolateHclLong", {
      enumerable: true,
      get: function get() {
        return _hcl.hclLong;
      }
    });
    Object.defineProperty(exports, "interpolateHsl", {
      enumerable: true,
      get: function get() {
        return _hsl.default;
      }
    });
    Object.defineProperty(exports, "interpolateHslLong", {
      enumerable: true,
      get: function get() {
        return _hsl.hslLong;
      }
    });
    Object.defineProperty(exports, "interpolateHue", {
      enumerable: true,
      get: function get() {
        return _hue.default;
      }
    });
    Object.defineProperty(exports, "interpolateLab", {
      enumerable: true,
      get: function get() {
        return _lab.default;
      }
    });
    Object.defineProperty(exports, "interpolateNumber", {
      enumerable: true,
      get: function get() {
        return _number.default;
      }
    });
    Object.defineProperty(exports, "interpolateNumberArray", {
      enumerable: true,
      get: function get() {
        return _numberArray.default;
      }
    });
    Object.defineProperty(exports, "interpolateObject", {
      enumerable: true,
      get: function get() {
        return _object.default;
      }
    });
    Object.defineProperty(exports, "interpolateRgb", {
      enumerable: true,
      get: function get() {
        return _rgb.default;
      }
    });
    Object.defineProperty(exports, "interpolateRgbBasis", {
      enumerable: true,
      get: function get() {
        return _rgb.rgbBasis;
      }
    });
    Object.defineProperty(exports, "interpolateRgbBasisClosed", {
      enumerable: true,
      get: function get() {
        return _rgb.rgbBasisClosed;
      }
    });
    Object.defineProperty(exports, "interpolateRound", {
      enumerable: true,
      get: function get() {
        return _round.default;
      }
    });
    Object.defineProperty(exports, "interpolateString", {
      enumerable: true,
      get: function get() {
        return _string.default;
      }
    });
    Object.defineProperty(exports, "interpolateTransformCss", {
      enumerable: true,
      get: function get() {
        return _index.interpolateTransformCss;
      }
    });
    Object.defineProperty(exports, "interpolateTransformSvg", {
      enumerable: true,
      get: function get() {
        return _index.interpolateTransformSvg;
      }
    });
    Object.defineProperty(exports, "interpolateZoom", {
      enumerable: true,
      get: function get() {
        return _zoom.default;
      }
    });
    Object.defineProperty(exports, "piecewise", {
      enumerable: true,
      get: function get() {
        return _piecewise.default;
      }
    });
    Object.defineProperty(exports, "quantize", {
      enumerable: true,
      get: function get() {
        return _quantize.default;
      }
    });
    var _value = _interopRequireDefault(require_value());
    var _array = _interopRequireDefault(require_array());
    var _basis = _interopRequireDefault(require_basis());
    var _basisClosed = _interopRequireDefault(require_basisClosed());
    var _date = _interopRequireDefault(require_date());
    var _discrete = _interopRequireDefault(require_discrete());
    var _hue = _interopRequireDefault(require_hue());
    var _number = _interopRequireDefault(require_number());
    var _numberArray = _interopRequireDefault(require_numberArray());
    var _object = _interopRequireDefault(require_object());
    var _round = _interopRequireDefault(require_round());
    var _string = _interopRequireDefault(require_string());
    var _index = require_transform();
    var _zoom = _interopRequireDefault(require_zoom());
    var _rgb = _interopRequireWildcard(require_rgb());
    var _hsl = _interopRequireWildcard(require_hsl());
    var _lab = _interopRequireDefault(require_lab2());
    var _hcl = _interopRequireWildcard(require_hcl());
    var _cubehelix = _interopRequireWildcard(require_cubehelix2());
    var _piecewise = _interopRequireDefault(require_piecewise());
    var _quantize = _interopRequireDefault(require_quantize2());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/linear.js
var require_linear3 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/linear.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _src = require_src();
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _src2 = require_src4();
    var _base = _interopRequireDefault(require_base5());
    var interpolate = function interpolate2(a, b) {
      if ((0, _util.isNumber)(b)) {
        return (0, _src2.interpolateNumber)(a, b);
      }
      return (0, _src2.interpolateRgb)(a, b);
    };
    var Linear = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Linear2, _super);
        function Linear2(options) {
          var _this = _super.call(this, options) || this;
          _this._updateInterpolate();
          return _this;
        }
        Linear2.prototype.createScale = function(scaleConfig) {
          return new _src.Linear(scaleConfig);
        };
        Linear2.prototype._updateInterpolate = function() {
          var _a = this.range, min = _a[0], max = _a[1];
          this.interpolate = interpolate(min, max);
        };
        Linear2.prototype.update = function(options) {
          _super.prototype.update.call(this, options);
          this._updateInterpolate();
        };
        Linear2.prototype._mapping = function(value) {
          var _a = this, scale = _a.scale, interpolate2 = _a.interpolate;
          if ((0, _util.isArray)(value)) {
            return value.map(function(v) {
              return interpolate2(scale.scale(v));
            });
          }
          return interpolate2(scale.scale(value));
        };
        Linear2.prototype.normalize = function(value) {
          var scale = this.scale;
          if ((0, _util.isArray)(value)) {
            return value.map(function(v) {
              return scale.scale(v);
            });
          }
          return scale.scale(value);
        };
        Linear2.prototype.convert = function(value) {
          var range = this.range;
          var min = range[0], max = range[1];
          if ((0, _util.isArray)(value)) {
            return value.map(function(v) {
              return min + (max - min) * v;
            });
          }
          return min + (max - min) * value;
        };
        return Linear2;
      }(_base.default)
    );
    var _default = exports.default = Linear;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/category.js
var require_category = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/category.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _src = require_src();
    var _base = _interopRequireDefault(require_base5());
    var Category = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Category2, _super);
        function Category2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Category2.prototype.createScale = function(scaleConfig) {
          return new _src.Category(scaleConfig);
        };
        Category2.prototype._mapping = function(value) {
          var _a = this, scale = _a.scale, range = _a.range;
          if (scale.type === "cat") {
            var index_1 = scale.translate(value);
            return range[index_1 % range.length];
          }
          var normalizeValue = scale.scale(value);
          var index = Math.round(normalizeValue * (range.length - 1));
          return range[index];
        };
        return Category2;
      }(_base.default)
    );
    var _default = exports.default = Category;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/identity.js
var require_identity2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/identity.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _src = require_src();
    var _base = _interopRequireDefault(require_base5());
    var Identity = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Identity2, _super);
        function Identity2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Identity2.prototype.createScale = function(scaleConfig) {
          return new _src.Identity(scaleConfig);
        };
        Identity2.prototype._mapping = function() {
          var _a = this, field = _a.field, range = _a.range;
          return field || range && range[0];
        };
        return Identity2;
      }(_base.default)
    );
    var _default = exports.default = Identity;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/index.js
var require_attr = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/attr/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Attr", {
      enumerable: true,
      get: function get() {
        return _base.default;
      }
    });
    Object.defineProperty(exports, "Category", {
      enumerable: true,
      get: function get() {
        return _category.default;
      }
    });
    Object.defineProperty(exports, "Identity", {
      enumerable: true,
      get: function get() {
        return _identity.default;
      }
    });
    Object.defineProperty(exports, "Linear", {
      enumerable: true,
      get: function get() {
        return _linear.default;
      }
    });
    var _base = _interopRequireDefault(require_base5());
    var _linear = _interopRequireDefault(require_linear3());
    var _category = _interopRequireDefault(require_category());
    var _identity = _interopRequireDefault(require_identity2());
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/attr.js
var require_attr2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/controller/attr.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = exports.ATTRS = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var Attrs = _interopRequireWildcard(require_attr());
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    var Identity = Attrs.Identity;
    var Linear = Attrs.Linear;
    var Category = Attrs.Category;
    var ATTRS = exports.ATTRS = ["x", "y", "color", "size", "shape"];
    var GROUP_ATTRS = ["color", "size", "shape"];
    function cloneScale(scale, scaleConfig) {
      return new scale.constructor((0, _tslib.__assign)((0, _tslib.__assign)({}, scale.__cfg__), scaleConfig));
    }
    var AttrController = (
      /** @class */
      function() {
        function AttrController2(scaleController, attrsRange) {
          this.scaleController = scaleController;
          this.attrsRange = attrsRange;
          this.options = {};
          this.attrs = {};
        }
        AttrController2.prototype.parseOption = function(option, attrName) {
          if (!option) {
            return {
              type: "identity"
            };
          }
          if ((0, _util.isString)(option)) {
            return {
              field: option,
              type: "category"
            };
          }
          if ((0, _util.isNumber)(option)) {
            if (attrName === "size") {
              return {
                type: "identity",
                field: option
              };
            }
          }
          if ((0, _util.isArray)(option)) {
            return {
              field: option[0],
              range: option[1]
            };
          }
          return option;
        };
        AttrController2.prototype.getAttrOptions = function(props, justifyContentCenter) {
          var _this = this;
          if (!props.x || !props.y) {
            throw new Error("x, y are required !");
          }
          var options = {};
          var ranges = this.attrsRange;
          ATTRS.forEach(function(attrName) {
            if (!props[attrName])
              return;
            var option = _this.parseOption(props[attrName], attrName);
            if (!option.range) {
              option.range = ranges[attrName];
            }
            options[attrName] = option;
          });
          var x = options.x, y = options.y;
          x.justifyContent = justifyContentCenter;
          x.type = Linear;
          y.type = Linear;
          return options;
        };
        AttrController2.prototype.getDefaultAttrValues = function() {
          var _a = this.attrsRange, color = _a.color, shape = _a.shape;
          return {
            color: color[0],
            shape: shape && shape[0]
          };
        };
        AttrController2.prototype.getGroupScales = function() {
          var attrs = this.attrs;
          var scales = [];
          (0, _util.each)(GROUP_ATTRS, function(attrName) {
            var attr = attrs[attrName];
            if (!attr) {
              return;
            }
            var scale = attr.scale;
            if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
              scales.push(scale);
            }
          });
          return scales;
        };
        AttrController2.prototype.createAttr = function(option) {
          var type = option.type, field = option.field, scaleConfig = option.scale;
          if ((0, _util.isNil)(field) || type === Identity) {
            return new Identity(option);
          }
          var scale = this.scaleController.getScale(field);
          var attrOption = (0, _tslib.__assign)((0, _tslib.__assign)({}, option), {
            data: this.scaleController.getData(),
            // scaleConfig 只在属性映射中生效
            scale: scaleConfig ? cloneScale(scale, scaleConfig) : scale
          });
          if (scale && scale.type === "identity") {
            return new Identity(attrOption);
          }
          var AttrConstructor = scale.isLinear ? Linear : Category;
          if ((0, _util.isFunction)(type)) {
            AttrConstructor = type;
          }
          if ((0, _util.isString)(type) && Attrs[(0, _util.upperFirst)(type)]) {
            AttrConstructor = Attrs[(0, _util.upperFirst)(type)];
          }
          return new AttrConstructor(attrOption);
        };
        AttrController2.prototype.create = function(options) {
          this.update(options);
        };
        AttrController2.prototype.update = function(nextOptions) {
          var _a = this, scaleController = _a.scaleController, lastOptions = _a.options, lastAttrs = _a.attrs;
          var nextAttrs = {};
          (0, _util.each)(nextOptions, function(nextOption, attrName) {
            var lastOption = lastOptions[attrName];
            if ((0, _fEngine.isEqual)(nextOption, lastOption)) {
              nextAttrs[attrName] = lastAttrs[attrName];
            }
            var field = nextOption.field, justifyContent = nextOption.justifyContent;
            if (field) {
              scaleController.setScale(field, {
                justifyContent
              });
            }
          });
          this.options = nextOptions;
          this.attrs = nextAttrs;
        };
        AttrController2.prototype.getAttr = function(attrName) {
          var _a = this, attrs = _a.attrs, options = _a.options;
          var attr = attrs[attrName];
          if (attr) {
            return attr;
          }
          var option = options[attrName];
          if (!option) {
            return null;
          }
          var newAttr = this.createAttr(option);
          attrs[attrName] = newAttr;
          return newAttr;
        };
        AttrController2.prototype.getAttrs = function() {
          var _this = this;
          var _a = this, options = _a.options, attrs = _a.attrs;
          (0, _util.each)(options, function(option, attrName) {
            _this.getAttr(attrName);
          });
          return attrs;
        };
        AttrController2.prototype.isGroupAttr = function(attrName) {
          return GROUP_ATTRS.indexOf(attrName) !== -1;
        };
        AttrController2.prototype.getAttrsByLinear = function() {
          var attrs = this.attrs;
          var attrNames = Object.keys(attrs);
          var linearAttrs = [];
          var nonlinearAttrs = [];
          attrNames.forEach(function(attrName) {
            if (attrName === "x" || attrName === "y") {
              linearAttrs.push(attrName);
              return;
            }
            var scale = attrs[attrName].scale;
            if (scale && scale.type === "linear") {
              linearAttrs.push(attrName);
            } else {
              nonlinearAttrs.push(attrName);
            }
          });
          return {
            linearAttrs,
            nonlinearAttrs
          };
        };
        return AttrController2;
      }()
    );
    var _default = exports.default = AttrController;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/geometry/index.js
var require_geometry = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/geometry/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _selection = _interopRequireDefault(require_selection());
    var _src = require_src2();
    var _index = require_util();
    var _attr = _interopRequireWildcard(require_attr2());
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    var AdjustMap = {
      Stack: _src.Stack,
      Dodge: _src.Dodge,
      Jitter: _src.Jitter,
      Symmetric: _src.Symmetric
    };
    var FIELD_ORIGIN = "origin";
    var Geometry = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Geometry2, _super);
        function Geometry2(props, context) {
          var _this = _super.call(this, props, context) || this;
          _this.isGeometry = true;
          _this.justifyContent = false;
          _this.startOnZero = false;
          _this.connectNulls = false;
          _this.sortable = false;
          (0, _util.mix)(_this, _this.getDefaultCfg());
          var chart = props.chart;
          var attrsRange = _this._getThemeAttrsRange();
          _this.attrController = new _attr.default(chart.scale, attrsRange);
          var attrController = _this.attrController;
          var attrOptions = _this.getAttrOptions(props);
          attrController.create(attrOptions);
          return _this;
        }
        Geometry2.prototype.getDefaultCfg = function() {
          return {};
        };
        Geometry2.prototype.getAttrOptions = function(props) {
          var coord = props.coord;
          var _a = this, attrController = _a.attrController, justifyContent = _a.justifyContent;
          var justifyContentCenter = !coord.isCyclic() || justifyContent;
          var args = {};
          _attr.ATTRS.forEach(function(d) {
            return args[d] = props[d];
          });
          var attrOptions = attrController.getAttrOptions(this.context.px2hd(args), justifyContentCenter);
          return attrOptions;
        };
        Geometry2.prototype.willReceiveProps = function(nextProps) {
          var _a = this, lastProps = _a.props, attrController = _a.attrController;
          var nextData = nextProps.data, nextAdjust = nextProps.adjust, selection = nextProps.selection;
          var lastData = lastProps.data, lastAdjust = lastProps.adjust, lastSelection = lastProps.selection;
          var lastAttrOptions = this.getAttrOptions(lastProps);
          attrController.attrsRange = this._getThemeAttrsRange();
          var nextAttrOptions = this.getAttrOptions(nextProps);
          if (!(0, _fEngine.isEqual)(nextAttrOptions, lastAttrOptions)) {
            attrController.update(nextAttrOptions);
            this.dataRecords = null;
          }
          if (nextData !== lastData) {
            this.dataRecords = null;
          }
          if (nextAdjust !== lastAdjust) {
            this.dataRecords = null;
          }
          if (!(0, _fEngine.isEqual)(selection, lastSelection)) {
            _super.prototype.willReceiveProps.call(this, nextProps);
          }
        };
        Geometry2.prototype.willMount = function() {
          this._createAttrs();
          if (!this.dataRecords) {
            this._processData();
          }
        };
        Geometry2.prototype.willUpdate = function() {
          this._createAttrs();
          if (!this.dataRecords) {
            this._processData();
          } else {
            this._readjustData(this.dataRecords);
          }
        };
        Geometry2.prototype.didMount = function() {
          this._initEvent();
          _super.prototype.didMount.call(this);
          this.attrController.attrsRange = this._getThemeAttrsRange();
        };
        Geometry2.prototype._initEvent = function() {
          var _this = this;
          var props = this.props;
          var chart = props.chart;
          ["onPressStart", "onPress", "onPressEnd", "onPan", "onPanStart", "onPanEnd"].forEach(function(eventName) {
            if (props[eventName]) {
              chart.on(eventName.substr(2).toLowerCase(), function(ev) {
                ev.geometry = _this;
                props[eventName](ev);
              });
            }
          });
        };
        Geometry2.prototype._createAttrs = function() {
          var attrController = this.attrController;
          attrController.attrs = {};
          this.attrs = attrController.getAttrs();
        };
        Geometry2.prototype._getThemeAttrsRange = function() {
          var _a = this, context = _a.context, props = _a.props, geomType = _a.geomType;
          var coord = props.coord;
          var theme = context.theme;
          var colors = theme.colors, sizes = theme.sizes, shapes = theme.shapes;
          return {
            x: coord.x,
            y: coord.y,
            color: colors,
            size: sizes,
            shape: shapes[geomType]
          };
        };
        Geometry2.prototype._createAdjust = function() {
          var _a = this, attrs = _a.attrs, props = _a.props;
          var adjust = props.adjust, chart = props.chart;
          if (!adjust) {
            return null;
          }
          var adjustCfg = typeof adjust === "string" ? {
            type: adjust
          } : adjust;
          var adjustType = (0, _util.upperFirst)(adjustCfg.type);
          var AdjustConstructor = AdjustMap[adjustType];
          if (!AdjustConstructor) {
            throw new Error("not support such adjust : " + adjust);
          }
          if (adjustType === "Dodge") {
            adjustCfg.adjustNames = ["x"];
          }
          var x = attrs.x, y = attrs.y;
          adjustCfg.xField = x.field;
          adjustCfg.yField = y.field;
          var adjustInstance = new AdjustConstructor(adjustCfg);
          this.adjust = {
            type: adjustCfg.type,
            adjust: adjustInstance
          };
          chart.updateAdjust(this.adjust);
          return this.adjust;
        };
        Geometry2.prototype._adjustScales = function() {
          var _a = this, attrs = _a.attrs, props = _a.props, defaultStartOnZero = _a.startOnZero;
          var chart = props.chart, _b = props.startOnZero, startOnZero = _b === void 0 ? defaultStartOnZero : _b, coord = props.coord, adjust = props.adjust;
          var isPolar = coord.isPolar, transposed = coord.transposed;
          var y = attrs.y;
          if (startOnZero) {
            chart.scale.adjustStartZero(y.scale);
          }
          if (isPolar && transposed && (adjust === "stack" || (adjust === null || adjust === void 0 ? void 0 : adjust.type) === "stack")) {
            chart.scale.adjustPieScale(y.scale);
          }
          if (adjust === "stack" || (adjust === null || adjust === void 0 ? void 0 : adjust.type) === "stack") {
            chart.scale._updateStackRange(y.scale, (0, _util.flatten)(this.dataArray));
          }
        };
        Geometry2.prototype._groupData = function(data) {
          var attrController = this.attrController;
          var groupScales = attrController.getGroupScales();
          if (!groupScales.length) {
            return [{
              children: data
            }];
          }
          var names = [];
          groupScales.forEach(function(scale) {
            var field = scale.field;
            names.push(field);
          });
          var groups = (0, _util.groupToMap)(data, names);
          var records = [];
          for (var key in groups) {
            records.push({
              key: key.replace(/^_/, ""),
              children: groups[key]
            });
          }
          return records;
        };
        Geometry2.prototype._saveOrigin = function(originData) {
          var _a;
          var len = originData.length;
          var data = new Array(len);
          for (var i = 0; i < len; i++) {
            var record = originData[i];
            data[i] = (0, _tslib.__assign)((0, _tslib.__assign)({}, record), (_a = {}, _a[FIELD_ORIGIN] = record, _a));
          }
          return data;
        };
        Geometry2.prototype._numberic = function(data) {
          var attrs = this.attrs;
          var scales = [attrs.x.scale, attrs.y.scale];
          for (var j = 0, len = data.length; j < len; j++) {
            var obj = data[j];
            var count = scales.length;
            for (var i = 0; i < count; i++) {
              var scale = scales[i];
              if (scale.isCategory) {
                var field = scale.field;
                var value = scale.translate(obj.origin[field]);
                obj[field] = value;
              }
            }
          }
        };
        Geometry2.prototype._adjustData = function(records) {
          var adjust = this.adjust;
          var groupedArray = records.map(function(record2) {
            return record2.children;
          });
          if (!adjust) {
            return groupedArray;
          }
          var attrs = this.attrs;
          var scales = [attrs.x.scale, attrs.y.scale];
          for (var i = 0, len = groupedArray.length; i < len; i++) {
            var records_1 = groupedArray[i];
            for (var j = 0, len_1 = records_1.length; j < len_1; j++) {
              var record = records_1[j];
              var count = scales.length;
              for (var i_1 = 0; i_1 < count; i_1++) {
                var scale = scales[i_1];
                var field = scale.field;
                record[field] = record.origin[field];
              }
            }
          }
          if (adjust.type === "dodge") {
            for (var i = 0, len = groupedArray.length; i < len; i++) {
              this._numberic(groupedArray[i]);
            }
          }
          var adjustData = adjust.adjust.process(groupedArray);
          records.forEach(function(record2, index) {
            record2.children = adjustData[index];
            adjust.adjust.setIndexMap({
              index,
              key: record2.key
            });
          });
          return adjustData;
        };
        Geometry2.prototype._processData = function() {
          var props = this.props;
          var originData = props.data;
          var data = this._saveOrigin(originData);
          var records = this._groupData(data);
          this._createAdjust();
          var dataArray = this._adjustData(records);
          this.dataArray = dataArray;
          this._adjustScales();
          if (this.sortable) {
            this._sortData(records);
          }
          this.dataRecords = records;
        };
        Geometry2.prototype._readjustData = function(records) {
          var adjust = this.adjust;
          if (!adjust)
            return;
          var dataArray = this._adjustData(records);
          this.dataArray = dataArray;
        };
        Geometry2.prototype._sortData = function(records) {
          var xScale = this.getXScale();
          var field = xScale.field, type = xScale.type;
          if (type !== "identity" && xScale.values.length > 1) {
            (0, _util.each)(records, function(_a) {
              var children = _a.children;
              children.sort(function(record1, record2) {
                if (type === "timeCat") {
                  return (0, _index.toTimeStamp)(record1[FIELD_ORIGIN][field]) - (0, _index.toTimeStamp)(record2[FIELD_ORIGIN][field]);
                }
                var normalized1 = xScale.translate(record1[FIELD_ORIGIN][field]);
                var normalized2 = xScale.translate(record2[FIELD_ORIGIN][field]);
                if (isNaN(normalized1)) {
                  return 1;
                }
                if (isNaN(normalized2)) {
                  return -1;
                }
                return normalized1 - normalized2;
              });
            });
          }
        };
        Geometry2.prototype.getY0Value = function() {
          var _a = this, attrs = _a.attrs, props = _a.props;
          var chart = props.chart;
          var field = attrs.y.field;
          var scale = chart.getScale(field);
          return chart.scale.getZeroValue(scale);
        };
        Geometry2.prototype._getShapeStyle = function(shape, origin) {
          var _a = this, context = _a.context, props = _a.props, geomType = _a.geomType;
          var theme = context.theme;
          var shapeTheme = theme.shape[geomType] || {};
          var defaultShapeStyle = shapeTheme.default;
          var shapeThemeStyle = shapeTheme[shape];
          var style = props.style;
          var shapeStyle = (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultShapeStyle), shapeThemeStyle);
          if (!style || !(0, _util.isObject)(style)) {
            return shapeStyle;
          }
          var field = style.field, styles = (0, _tslib.__rest)(style, ["field"]);
          var value = field ? origin[field] : origin;
          (0, _util.each)(styles, function(attr, key) {
            if ((0, _util.isFunction)(attr)) {
              var attrValue = attr(value);
              if (!attrValue) {
                return;
              }
              shapeStyle[key] = attrValue;
              return;
            }
            shapeStyle[key] = attr;
          });
          return shapeStyle;
        };
        Geometry2.prototype._mapping = function(records) {
          var _a = this, attrs = _a.attrs, props = _a.props, attrController = _a.attrController;
          var coord = props.coord;
          var _b = attrController.getAttrsByLinear(), linearAttrs = _b.linearAttrs, nonlinearAttrs = _b.nonlinearAttrs;
          var defaultAttrValues = attrController.getDefaultAttrValues();
          var mappedRecords = [];
          for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            var children = record.children;
            var attrValues = (0, _tslib.__assign)({}, defaultAttrValues);
            var firstChild = children[0];
            if (children.length === 0) {
              mappedRecords.push((0, _tslib.__assign)({}, record));
              continue;
            }
            for (var k = 0, len_2 = nonlinearAttrs.length; k < len_2; k++) {
              var attrName = nonlinearAttrs[k];
              var attr = attrs[attrName];
              attrValues[attrName] = attr.mapping(firstChild[attr.field], firstChild.origin);
            }
            var mappedChildren = [];
            for (var j = 0, childrenLen = children.length; j < childrenLen; j++) {
              var child = children[j];
              var normalized = {};
              for (var k = 0; k < linearAttrs.length; k++) {
                var attrName = linearAttrs[k];
                var attr = attrs[attrName];
                var value = child[attr.field];
                if (attrController.isGroupAttr(attrName)) {
                  attrValues[attrName] = attr.mapping(value, child);
                } else {
                  normalized[attrName] = attr.normalize(value);
                }
              }
              var _c = coord.convertPoint({
                x: normalized.x,
                y: normalized.y
              }), x = _c.x, y = _c.y;
              var origin_1 = child.origin;
              var shapeName = attrValues.shape;
              var shape = this._getShapeStyle(shapeName, origin_1);
              var selected = this.isSelected(child);
              mappedChildren.push((0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, child), attrValues), {
                normalized,
                x,
                y,
                shapeName,
                shape,
                selected
              }));
            }
            mappedRecords.push((0, _tslib.__assign)((0, _tslib.__assign)({}, record), {
              children: mappedChildren
            }));
          }
          return mappedRecords;
        };
        Geometry2.prototype.mapping = function() {
          var dataRecords = this.dataRecords;
          this.records = this._mapping(dataRecords);
          return this.records;
        };
        Geometry2.prototype.getClip = function() {
          var _a = this.props, coord = _a.coord, viewClip = _a.viewClip;
          var contentWidth = coord.width, contentHeight = coord.height, left = coord.left, top = coord.top;
          if (viewClip) {
            return {
              type: "rect",
              style: {
                x: left,
                y: top,
                width: contentWidth,
                height: contentHeight
              }
            };
          }
          return null;
        };
        Geometry2.prototype.getAttr = function(attrName) {
          return this.attrController.getAttr(attrName);
        };
        Geometry2.prototype.getXScale = function() {
          return this.getAttr("x").scale;
        };
        Geometry2.prototype.getYScale = function() {
          return this.getAttr("y").scale;
        };
        Geometry2.prototype.getColorScale = function() {
          return this.getAttr("color").scale;
        };
        Geometry2.prototype._getXSnap = function(invertPointX) {
          var xScale = this.getXScale();
          if (xScale.isCategory) {
            return xScale.invert(invertPointX);
          }
          var invertValue = xScale.invert(invertPointX);
          var values = xScale.values;
          var len = values.length;
          if (len === 1) {
            return values[0];
          }
          if ((values[0] + values[1]) / 2 > invertValue) {
            return values[0];
          }
          if ((values[len - 2] + values[len - 1]) / 2 <= invertValue) {
            return values[len - 1];
          }
          for (var i = 1; i < len; i++) {
            if ((values[i - 1] + values[i]) / 2 <= invertValue && (values[i + 1] + values[i]) / 2 > invertValue) {
              return values[i];
            }
          }
          return null;
        };
        Geometry2.prototype._getYSnapRecords = function(invertPointY, records) {
          var yScale = this.getYScale();
          var yField = yScale.field;
          var yValue = yScale.invert(invertPointY);
          if (yScale.isCategory) {
            return records.filter(function(record) {
              return record[FIELD_ORIGIN][yField] === yValue;
            });
          }
          return records.filter(function(record) {
            var rangeY = record[yField];
            if (rangeY[0] <= yValue && rangeY[1] >= yValue) {
              return true;
            }
            return false;
          });
        };
        Geometry2.prototype._getXSnapRecords = function(invertPointX, records) {
          var xScale = this.getXScale();
          var xField = xScale.field;
          var xValue = xScale.invert(invertPointX);
          if (xScale.isCategory) {
            return records.filter(function(record) {
              return record[FIELD_ORIGIN][xField] === xValue;
            });
          }
          return records.filter(function(record) {
            var rangeX = record[xField];
            if (rangeX[0] <= xValue && rangeX[1] >= xValue) {
              return true;
            }
            return false;
          });
        };
        Geometry2.prototype.flatRecords = function() {
          var records = this.records;
          return records.reduce(function(prevRecords, record) {
            return prevRecords.concat(record.children);
          }, []);
        };
        Geometry2.prototype.getSnapRecords = function(point, inCoordRange) {
          var props = this.props;
          var coord = props.coord, adjust = props.adjust;
          var invertPoint = coord.invertPoint(point);
          var xScale = this.getXScale();
          var yScale = this.getYScale();
          if (inCoordRange) {
            var xRange = xScale.range;
            var yRange = yScale.range;
            invertPoint.x = Math.min(Math.max(invertPoint.x, xRange[0]), xRange[1]);
            invertPoint.y = Math.min(Math.max(invertPoint.y, yRange[0]), yRange[1]);
          }
          var records = this.flatRecords();
          var xValue = xScale.invert(invertPoint.x);
          var yValue = yScale.invert(invertPoint.y);
          var coordPoint = coord.convertPoint(invertPoint);
          var coordRecord = {
            // 坐标点
            x: coordPoint.x,
            y: coordPoint.y,
            xValue,
            yValue,
            xText: xScale.getText(xValue),
            yText: yScale.getText(yValue)
          };
          if (adjust === "stack" && coord.isPolar) {
            if (coord.transposed) {
              if (invertPoint.x >= 0 && invertPoint.x <= 1) {
                var snapRecords = this._getYSnapRecords(invertPoint.y, records);
                return snapRecords;
              }
            } else {
              if (invertPoint.y >= 0 && invertPoint.y <= 1) {
                var snapRecords = this._getXSnapRecords(invertPoint.x, records);
                return snapRecords;
              }
            }
          }
          var rst = [];
          var value = this._getXSnap(invertPoint.x);
          if ((0, _util.isNull)(value)) {
            return rst;
          }
          var xField = xScale.field;
          var yField = yScale.field;
          for (var i = 0, len = records.length; i < len; i++) {
            var record = (0, _tslib.__assign)((0, _tslib.__assign)({}, records[i]), {
              xField,
              yField,
              coord: coordRecord
            });
            var originValue = record[FIELD_ORIGIN][xField];
            if (xScale.type === "timeCat" && (0, _index.toTimeStamp)(originValue) === value) {
              rst.push(record);
            } else if (originValue === value) {
              rst.push(record);
            }
          }
          return rst;
        };
        Geometry2.prototype.getRecords = function(data, field) {
          if (field === void 0) {
            field = "xfield";
          }
          var records = this.flatRecords();
          var xScale = this.getXScale();
          var yScale = this.getYScale();
          var xField = xScale.field;
          var yField = yScale.field;
          var value = data[xField];
          var rst = [];
          for (var i = 0, len = records.length; i < len; i++) {
            var record = (0, _tslib.__assign)((0, _tslib.__assign)({}, records[i]), {
              xField,
              yField
            });
            var originValue = record[FIELD_ORIGIN][field === "xfield" ? xField : yField];
            if (originValue === value) {
              rst.push(record);
            }
          }
          return rst;
        };
        Geometry2.prototype.getLegendItems = function() {
          var _a = this, attrController = _a.attrController, records = _a.records;
          var colorAttr = attrController.getAttr("color");
          if (!colorAttr)
            return null;
          var scale = colorAttr.scale;
          var isCategory = scale.isCategory, field = scale.field;
          if (!isCategory)
            return null;
          var flatRecords = records ? this.flatRecords() : [];
          var ticks = scale.getTicks();
          var items = ticks.map(function(tick) {
            var text = tick.text, tickValue = tick.tickValue;
            var record = (0, _util.find)(flatRecords, function(item) {
              if (!item)
                return false;
              var origin = item.origin;
              return origin[field] === tickValue;
            });
            var color = record ? record.color : colorAttr.mapping(tickValue);
            return {
              field: scale.field,
              color,
              name: text,
              tickValue
            };
          });
          return items;
        };
        return Geometry2;
      }(_selection.default)
    );
    var _default = exports.default = Geometry;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/line/withLine.js
var require_withLine = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/line/withLine.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _geometry = _interopRequireDefault(require_geometry());
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Line, _super);
          function Line() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          Line.prototype.getDefaultCfg = function() {
            return {
              geomType: "line",
              sortable: true
            };
          };
          Line.prototype.splitPoints = function(points) {
            var topPoints = [];
            var bottomPoints = [];
            for (var i = 0, len = points.length; i < len; i++) {
              var point = points[i];
              var x = point.x, y = point.y;
              topPoints.push((0, _tslib.__assign)((0, _tslib.__assign)({}, point), {
                x,
                y: y[1]
              }));
              bottomPoints.push((0, _tslib.__assign)((0, _tslib.__assign)({}, point), {
                x,
                y: y[0]
              }));
            }
            return [topPoints, bottomPoints];
          };
          Line.prototype.splitNulls = function(points, connectNulls) {
            if (connectNulls) {
              var tmpPoints_1 = [];
              for (var i = 0, len = points.length; i < len; i++) {
                var point = points[i];
                var x = point.x, y = point.y;
                if (isNaN(x)) {
                  continue;
                }
                if ((0, _util.isArray)(y)) {
                  if (isNaN(y[0])) {
                    continue;
                  }
                  tmpPoints_1.push(point);
                  continue;
                }
                if (isNaN(y)) {
                  continue;
                }
                tmpPoints_1.push(point);
              }
              if (tmpPoints_1.length) {
                return [tmpPoints_1];
              }
              return [];
            }
            var result = [];
            var tmpPoints = [];
            for (var i = 0, len = points.length; i < len; i++) {
              var point = points[i];
              var x = point.x, y = point.y;
              if (isNaN(x)) {
                continue;
              }
              if ((0, _util.isArray)(y)) {
                if (isNaN(y[0])) {
                  if (tmpPoints.length) {
                    result.push(tmpPoints);
                    tmpPoints = [];
                  }
                  continue;
                }
                tmpPoints.push(point);
                continue;
              }
              if (isNaN(y)) {
                if (tmpPoints.length) {
                  result.push(tmpPoints);
                  tmpPoints = [];
                }
                continue;
              }
              tmpPoints.push(point);
            }
            if (tmpPoints.length) {
              result.push(tmpPoints);
            }
            return result;
          };
          Line.prototype.mapping = function() {
            var _this = this;
            var records = _super.prototype.mapping.call(this);
            var _a = this, props = _a.props, defaultConnectNulls = _a.connectNulls, context = _a.context;
            var coord = props.coord, _b = props.connectNulls, connectNulls = _b === void 0 ? defaultConnectNulls : _b, sizeZoom = props.sizeZoom;
            return records.map(function(record) {
              var _a2;
              var children = record.children;
              var _b2 = children[0] || {}, size = _b2.size, color = _b2.color, shape = _b2.shape, y = _b2.y, origin = _b2.origin;
              var points = coord.isPolar ? (0, _tslib.__spreadArray)((0, _tslib.__spreadArray)([], children, true), [children[0]], false) : children;
              var sizeZoomRatio = (_a2 = (0, _util.isFunction)(sizeZoom) ? sizeZoom(origin) : sizeZoom) !== null && _a2 !== void 0 ? _a2 : 1;
              var splitPoints = _this.splitNulls(points, connectNulls);
              var newChildren = splitPoints.map(function(points2) {
                var _a3 = (0, _util.isArray)(y) ? _this.splitPoints(points2) : [points2, void 0], topPoints = _a3[0], bottomPoints = _a3[1];
                return {
                  size: context.px2hd(size || shape.lineWidth) * sizeZoomRatio,
                  color,
                  shape,
                  points: [].concat(topPoints),
                  topPoints,
                  bottomPoints
                };
              });
              return (0, _tslib.__assign)((0, _tslib.__assign)({}, record), {
                children: newChildren
              });
            });
          };
          Line.prototype.concatPoints = function(topPoints, bottomPoints) {
            if (!bottomPoints || !bottomPoints.length) {
              return topPoints;
            }
            var adjust = this.adjust;
            if (adjust && adjust.type === "stack") {
              return topPoints;
            }
            var points = topPoints.concat(bottomPoints.reverse());
            points.push(topPoints[0]);
            return points;
          };
          Line.prototype.render = function() {
            var props = this.props;
            var coord = props.coord;
            var records = this.mapping();
            var clip = this.getClip();
            for (var i = 0, len = records.length; i < len; i++) {
              var record = records[i];
              var children = record.children;
              for (var j = 0, len_1 = children.length; j < len_1; j++) {
                var child = children[j];
                var points = child.points, bottomPoints = child.bottomPoints;
                child.points = this.concatPoints(points, bottomPoints);
              }
            }
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, props, {
              coord,
              records,
              clip
            }));
          };
          return Line;
        }(_geometry.default)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/line/lineView.js
var require_lineView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/line/lineView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function concatPoints(children) {
      var result = [];
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        result = result.concat(child.points);
      }
      return result;
    }
    function formatPoint(point) {
      var y = point.y;
      return {
        x: point.x,
        y: (0, _util.isArray)(y) ? y[1] : y
      };
    }
    function getPoint(points, t) {
      var formatedPoints = points.map(function(p) {
        return formatPoint(p);
      });
      var firstPoint = formatedPoints[0];
      var lastPoint = formatedPoints[formatedPoints.length - 1];
      var xOffset = lastPoint.x - firstPoint.x;
      var x = firstPoint.x + xOffset * t;
      for (var i = 1; i < formatedPoints.length; i++) {
        var point = formatedPoints[i];
        var prevPoint = formatedPoints[i - 1];
        if (x >= prevPoint.x && x <= point.x) {
          var ratio = (x - prevPoint.x) / (point.x - prevPoint.x);
          return {
            x,
            y: prevPoint.y + (point.y - prevPoint.y) * ratio
          };
        }
      }
    }
    var _default = exports.default = function _default2(props) {
      var records = props.records, coord = props.coord, animation = props.animation, EndView = props.endView, clip = props.clip;
      var _a = coord, left = _a.left, top = _a.top, width = _a.width, height = _a.height, center = _a.center, startAngle = _a.startAngle, endAngle = _a.endAngle, radius = _a.radius;
      var appear = coord.isPolar ? {
        easing: "quadraticOut",
        duration: 450,
        clip: {
          type: "sector",
          property: ["endAngle"],
          style: {
            cx: center.x,
            cy: center.y,
            startAngle: "".concat(startAngle, "rad"),
            r: radius
          },
          start: {
            endAngle: "".concat(startAngle, "rad")
          },
          end: {
            endAngle: "".concat(endAngle, "rad")
          }
        }
      } : {
        easing: "quadraticOut",
        duration: 450,
        clip: {
          type: "rect",
          property: ["width"],
          style: {
            x: left,
            y: top,
            height
          },
          start: {
            width: 0
          },
          end: {
            width
          }
        }
      };
      return (0, _fEngine.jsx)("group", {
        style: {
          clip
        }
      }, records.map(function(record) {
        var _a2;
        var key = record.key, children = record.children;
        var points = concatPoints(children);
        var ref = (0, _fEngine.createRef)();
        return (0, _fEngine.jsx)("group", {
          key
        }, children.map(function(child) {
          var points2 = child.points, color = child.color, size = child.size, shape = child.shape;
          var fliterPoints = points2.filter(function(point) {
            return !isNaN(point.x) && !isNaN(point.y);
          });
          if (fliterPoints.length === 0)
            return;
          return (0, _fEngine.jsx)("polyline", {
            key,
            // ref={ref}
            style: (0, _tslib.__assign)((0, _tslib.__assign)({
              points: fliterPoints.map(function(point) {
                return [point.x, point.y];
              }),
              stroke: color
            }, shape), {
              lineWidth: size || shape.lineWidth
            }),
            animation: (0, _util.deepMix)({
              update: {
                easing: "linear",
                duration: 450,
                property: ["points"]
              },
              appear
            }, animation)
          });
        }), EndView ? (0, _fEngine.jsx)("group", {
          ref,
          // style={{
          //   offset: ref,
          // }}
          animation: (0, _util.deepMix)({
            appear: {
              easing: "quadraticOut",
              duration: 450,
              onFrame: function onFrame(t) {
                var children2 = ref.current.getChildren();
                var point = getPoint(points, t);
                children2.forEach(function(child) {
                  child.moveTo(point.x, point.y);
                });
              }
              // property: ['offsetDistance'],
              // start: {
              //   offsetDistance: 0,
              // },
              // end: {
              //   offsetDistance: 1,
              // },
            }
          }, animation)
        }, (0, _fEngine.jsx)(EndView, {
          origin: (_a2 = points[0]) === null || _a2 === void 0 ? void 0 : _a2.origin
        })) : null);
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/line/index.js
var require_line = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/line/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "LineView", {
      enumerable: true,
      get: function get() {
        return _lineView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withLine", {
      enumerable: true,
      get: function get() {
        return _withLine.default;
      }
    });
    var _withLine = _interopRequireDefault(require_withLine());
    var _lineView = _interopRequireDefault(require_lineView());
    var _default = exports.default = (0, _withLine.default)(_lineView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/area/withArea.js
var require_withArea = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/area/withArea.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _withLine = _interopRequireDefault(require_withLine());
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Area, _super);
          function Area() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          Area.prototype.getDefaultCfg = function() {
            return {
              geomType: "area",
              // 面积图默认设为从0开始
              startOnZero: true,
              // 点需要排序
              sortable: true
            };
          };
          Area.prototype.getBaseY = function() {
            var y0 = this.getY0Value();
            var _a = this, props = _a.props, defaultStartOnZero = _a.startOnZero;
            var coord = props.coord, _b = props.startOnZero, startOnZero = _b === void 0 ? defaultStartOnZero : _b;
            if (startOnZero) {
              var originCoord = coord.convertPoint({
                x: 0,
                y: y0
              });
              return originCoord.y;
            }
            return coord.y[0];
          };
          Area.prototype.mapping = function() {
            var records = _super.prototype.mapping.call(this);
            var baseY = this.getBaseY();
            for (var i = 0, len = records.length; i < len; i++) {
              var record = records[i];
              var children = record.children;
              for (var j = 0, len_1 = children.length; j < len_1; j++) {
                var child = children[j];
                var points = child.points, bottomPoints = child.bottomPoints;
                if (bottomPoints && bottomPoints.length) {
                  bottomPoints.reverse();
                  child.points = points.concat(bottomPoints);
                } else {
                  points.unshift({
                    x: points[0].x,
                    y: baseY
                  });
                  points.unshift({
                    x: points[points.length - 1].x,
                    y: baseY
                  });
                }
              }
            }
            return records;
          };
          Area.prototype.render = function() {
            var props = this.props;
            var coord = props.coord;
            var records = this.mapping();
            var clip = this.getClip();
            var baseY = this.getBaseY();
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, props, {
              baseY,
              coord,
              records,
              clip
            }));
          };
          return Area;
        }((0, _withLine.default)(View))
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/area/areaView.js
var require_areaView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/area/areaView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props) {
      var coord = props.coord, records = props.records, baseY = props.baseY, shape = props.shape, animation = props.animation;
      var isSmooth = shape === "smooth";
      var _a = coord, left = _a.left, top = _a.top, width = _a.width, height = _a.height, center = _a.center, startAngle = _a.startAngle, endAngle = _a.endAngle, radius = _a.radius;
      var appear = coord.isPolar ? {
        easing: "quadraticOut",
        duration: 450,
        clip: {
          type: "sector",
          property: ["endAngle"],
          style: {
            cx: center.x,
            cy: center.y,
            startAngle: "".concat(startAngle, "rad"),
            r: radius
          },
          start: {
            endAngle: "".concat(startAngle, "rad")
          },
          end: {
            endAngle: "".concat(endAngle, "rad")
          }
        }
      } : {
        easing: "quadraticOut",
        duration: 450,
        clip: {
          type: "rect",
          property: ["width"],
          style: {
            x: left,
            y: top,
            height
          },
          start: {
            width: 0
          },
          end: {
            width
          }
        }
      };
      return (0, _fEngine.jsx)("group", null, records.map(function(record) {
        var key = record.key, children = record.children;
        return (0, _fEngine.jsx)("group", {
          key
        }, children.map(function(child) {
          var points = child.points, topPoints = child.topPoints, bottomPoints = child.bottomPoints, color = child.color, shape2 = child.shape;
          if (isSmooth) {
            var generatePath = function generatePath2() {
              var d = [];
              var constaint = [[0, 0], [1, 1]];
              var topSps = _fEngine.Smooth.smooth(topPoints, false, constaint);
              d.push(["M", topPoints[0].x, topPoints[0].y]);
              for (var i = 0, n = topSps.length; i < n; i++) {
                var sp = topSps[i];
                d.push(["C", sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
              }
              if (bottomPoints && bottomPoints.length) {
                var bottomSps = _fEngine.Smooth.smooth(bottomPoints, false, constaint);
                d.push(["L", bottomPoints[0].x, bottomPoints[0].y]);
                for (var i = 0, n = bottomSps.length; i < n; i++) {
                  var sp = bottomSps[i];
                  d.push(["C", sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
                }
              } else {
                d.push(["L", topPoints[topPoints.length - 1].x, baseY]);
                d.push(["L", topPoints[0].x, baseY]);
              }
              return d;
            };
            return (0, _fEngine.jsx)("path", {
              style: (0, _tslib.__assign)({
                path: generatePath(),
                lineWidth: "2px",
                fill: color
              }, shape2)
            });
          }
          return (0, _fEngine.jsx)("polygon", {
            style: (0, _tslib.__assign)({
              points: points.map(function(point) {
                return [point.x, point.y];
              }),
              lineWidth: "2px",
              fill: color
            }, shape2),
            animation: (0, _util.deepMix)({
              appear,
              update: {
                easing: "linear",
                duration: 450,
                property: ["points"]
              }
            }, animation)
          });
        }));
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/area/index.js
var require_area = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/area/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "AreaView", {
      enumerable: true,
      get: function get() {
        return _areaView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withArea", {
      enumerable: true,
      get: function get() {
        return _withArea.default;
      }
    });
    var _withArea = _interopRequireDefault(require_withArea());
    var _areaView = _interopRequireDefault(require_areaView());
    var _default = exports.default = (0, _withArea.default)(_areaView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/util/coord.js
var require_coord3 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/util/coord.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getMiddlePoint = getMiddlePoint;
    function getMiddlePoint(start, end) {
      var x = (end.x - start.x) / 2 + start.x;
      var y = (end.y - start.y) / 2 + start.y;
      return {
        x,
        y
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/label/polygonLabel.js
var require_polygonLabel = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/label/polygonLabel.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = LabelView;
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _coord = require_coord3();
    var DEFAULT_LABEL_CFG = {
      textBaseline: "middle",
      fill: "#808080"
    };
    function LabelView(props) {
      var _a;
      var record = props.record, offsetX = props.offsetX, offsetY = props.offsetY, points = props.points, label = props.label, guide = props.guide;
      var origin = record.origin, color = record.color;
      var labelAttrs, guideAttrs;
      if ((0, _util.isFunction)(label)) {
        var point = points.length === 4 ? (0, _coord.getMiddlePoint)(points[1], points[2]) : (0, _coord.getMiddlePoint)(points[0], points[1]);
        labelAttrs = (0, _util.mix)({
          x: point.x + offsetX,
          y: point.y + offsetY
        }, DEFAULT_LABEL_CFG, label(origin, color));
      }
      if ((0, _util.isFunction)(guide)) {
        var point = (0, _coord.getMiddlePoint)(points.length === 4 ? (0, _coord.getMiddlePoint)(points[0], points[1]) : points[0], (0, _coord.getMiddlePoint)(points[2], (_a = points[3]) !== null && _a !== void 0 ? _a : points[1]));
        guideAttrs = (0, _util.mix)({
          x: point.x,
          y: point.y,
          textBaseline: "middle",
          textAlign: "center"
        }, DEFAULT_LABEL_CFG, guide(origin, color));
      }
      return (0, _fEngine.jsx)("group", null, labelAttrs && (0, _fEngine.jsx)("text", {
        attrs: labelAttrs
      }), guideAttrs && (0, _fEngine.jsx)("text", {
        attrs: guideAttrs
      }));
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/label/index.js
var require_label = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/label/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "funnel", {
      enumerable: true,
      get: function get() {
        return _polygonLabel.default;
      }
    });
    Object.defineProperty(exports, "pyramid", {
      enumerable: true,
      get: function get() {
        return _polygonLabel.default;
      }
    });
    var _polygonLabel = _interopRequireDefault(require_polygonLabel());
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/withInterval.js
var require_withInterval = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/withInterval.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _geometry = _interopRequireDefault(require_geometry());
    var LabelViews = _interopRequireWildcard(require_label());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    var _default = exports.default = function _default2(Views) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Interval, _super);
          function Interval() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          Interval.prototype.getDefaultCfg = function() {
            return {
              geomType: "interval",
              justifyContent: true,
              startOnZero: true
            };
          };
          Interval.prototype.getDefaultSize = function() {
            var _a = this, attrs = _a.attrs, props = _a.props, adjust = _a.adjust, records = _a.records;
            var coord = props.coord, sizeRatio = props.sizeRatio;
            var x = attrs.x;
            var scale = x.scale;
            var values = scale.values;
            if (sizeRatio) {
              return 1 / values.length * sizeRatio;
            }
            var defaultWithRatio = {
              column: 1 / 2,
              rose: 0.999999,
              multiplePie: 3 / 4
              // 多饼图
            };
            var count = values.length;
            var ratio;
            if (coord.isPolar) {
              if (coord.transposed && count > 1) {
                ratio = defaultWithRatio.multiplePie;
              } else {
                ratio = defaultWithRatio.rose;
              }
            } else {
              ratio = defaultWithRatio.column;
            }
            var size = 1 / values.length * ratio;
            if (adjust && adjust.type === "dodge") {
              return size / records.length;
            }
            return size;
          };
          Interval.prototype.mapping = function() {
            var _a;
            var records = _super.prototype.mapping.call(this);
            var props = this.props;
            var coord = props.coord, sizeZoom = props.sizeZoom;
            var y0 = this.getY0Value();
            var defaultSize = this.getDefaultSize();
            for (var i = 0, len = records.length; i < len; i++) {
              var record = records[i];
              var children = record.children;
              for (var j = 0, len_1 = children.length; j < len_1; j++) {
                var child = children[j];
                var normalized = child.normalized, mappedSize = child.size, origin_1 = child.origin;
                if ((0, _util.isNil)(mappedSize)) {
                  var x = normalized.x, y = normalized.y, _b = normalized.size, size = _b === void 0 ? defaultSize : _b;
                  var zoomRatio = (_a = (0, _util.isFunction)(sizeZoom) ? sizeZoom(origin_1) : sizeZoom) !== null && _a !== void 0 ? _a : 1;
                  (0, _util.mix)(child, coord.convertRect({
                    x,
                    y,
                    y0,
                    size: size * zoomRatio
                  }));
                } else {
                  var x = child.x, y = child.y;
                  var rect = {
                    size: mappedSize,
                    x,
                    y,
                    y0
                  };
                  (0, _util.mix)(child, coord.transformToRect(rect));
                }
                (0, _util.mix)(child.shape, this.getSelectionStyle(child));
              }
            }
            return records;
          };
          Interval.prototype.getPointY0 = function() {
            var props = this.props;
            var coord = props.coord;
            var y0 = this.getY0Value();
            var y0Point = coord.convertPoint({
              y: y0,
              x: 0
            });
            return y0Point === null || y0Point === void 0 ? void 0 : y0Point.y;
          };
          Interval.prototype.render = function() {
            var _a = this, props = _a.props, state = _a.state;
            var coord = props.coord, _b = props.shape, shape = _b === void 0 ? "rect" : _b, animation = props.animation, showLabel = props.showLabel, customLabelCfg = props.labelCfg;
            var View = (0, _util.isFunction)(Views) ? Views : Views[shape];
            var LabelView = LabelViews[shape];
            var labelCfg = (0, _util.deepMix)({
              label: null,
              offsetX: 0,
              offsetY: 0
            }, customLabelCfg);
            if (!View)
              return null;
            var selected = state.selected;
            var records = this.mapping();
            var pointY0 = this.getPointY0();
            var clip = this.getClip();
            return (0, _fEngine.jsx)(View, {
              coord,
              records,
              selected,
              shape,
              animation,
              showLabel,
              labelCfg,
              LabelView,
              y0: pointY0,
              clip
            });
          };
          return Interval;
        }(_geometry.default)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/rect.js
var require_rect2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/rect.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props) {
      var records = props.records, animation = props.animation, y0 = props.y0, clip = props.clip, onClick = props.onClick;
      return (0, _fEngine.jsx)("group", {
        attrs: {
          clip
        }
      }, records.map(function(record) {
        var key = record.key, children = record.children;
        return (0, _fEngine.jsx)("group", {
          key
        }, children.map(function(item) {
          var key2 = item.key, xMin = item.xMin, xMax = item.xMax, yMin = item.yMin, yMax = item.yMax, color = item.color, shape = item.shape;
          if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
            return null;
          }
          return (0, _fEngine.jsx)("rect", {
            key: key2,
            attrs: (0, _tslib.__assign)({
              x: xMin,
              y: yMin,
              width: xMax - xMin,
              height: yMax - yMin,
              fill: color
            }, shape),
            onClick,
            animation: (0, _util.deepMix)({
              appear: {
                easing: "linear",
                duration: 450,
                property: ["y", "height"],
                start: {
                  y: y0,
                  height: 0
                }
              },
              update: {
                easing: "linear",
                duration: 450,
                property: ["x", "y", "width", "height"]
              }
            }, animation)
          });
        }));
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/polar.js
var require_polar2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/polar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props) {
      var coord = props.coord, records = props.records, animation = props.animation, onClick = props.onClick;
      var center = coord.center, startAngle = coord.startAngle, endAngle = coord.endAngle, radius = coord.radius;
      return (0, _fEngine.jsx)("group", {
        animation: {
          appear: (0, _tslib.__assign)({
            easing: "quadraticOut",
            duration: 450,
            clip: {
              type: "sector",
              property: ["endAngle"],
              style: {
                cx: center.x,
                cy: center.y,
                startAngle: "".concat(startAngle, "rad"),
                r: radius
              },
              start: {
                endAngle: "".concat(startAngle, "rad")
              },
              end: {
                endAngle: "".concat(endAngle, "rad")
              }
            }
          }, animation && animation.appear)
        }
      }, records.map(function(record) {
        var key = record.key, children = record.children;
        return (0, _fEngine.jsx)("group", {
          key
        }, children.map(function(item) {
          var key2 = item.key, xMin = item.xMin, xMax = item.xMax, yMin = item.yMin, yMax = item.yMax, color = item.color, shape = item.shape;
          return (0, _fEngine.jsx)("sector", {
            key: key2,
            attrs: (0, _tslib.__assign)({
              cx: center.x,
              cy: center.y,
              fill: color,
              lineWidth: 1,
              startAngle: "".concat(xMin, "rad"),
              endAngle: "".concat(xMax, "rad"),
              r0: yMin,
              r: yMax
            }, shape),
            onClick,
            animation: (0, _util.deepMix)({
              update: {
                easing: "linear",
                duration: 450,
                property: ["x", "y", "startAngle", "endAngle", "r0", "r"]
              }
            }, animation)
          });
        }));
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/intervalView.js
var require_intervalView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/intervalView.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _rect = _interopRequireDefault(require_rect2());
    var _polar = _interopRequireDefault(require_polar2());
    var _default = exports.default = function _default2(props) {
      var coord = props.coord;
      var coordType = coord.type;
      if (coordType === "rect") {
        return (0, _fEngine.jsx)(_rect.default, (0, _tslib.__assign)({}, props));
      }
      return (0, _fEngine.jsx)(_polar.default, (0, _tslib.__assign)({}, props));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/util.js
var require_util2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.convertToPoints = convertToPoints;
    function convertToPoints(_a) {
      var xMin = _a.xMin, xMax = _a.xMax, yMin = _a.yMin, yMax = _a.yMax;
      return [
        {
          x: xMin,
          y: yMin
        },
        {
          x: xMax,
          y: yMin
        },
        {
          x: xMax,
          y: yMax
        },
        {
          x: xMin,
          y: yMax
        }
        // bl
      ];
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/polygonView.js
var require_polygonView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/polygonView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _coord = require_coord3();
    var _util = require_util2();
    var _default = exports.default = function _default2(props) {
      var records = props.records, shape = props.shape, showLabel = props.showLabel, labelCfg = props.labelCfg, LabelView = props.LabelView;
      var overturn = false;
      return (0, _fEngine.jsx)("group", null, records.map(function(record, index) {
        var key = record.key, children = record.children;
        var isLastRecord = index === records.length - 1;
        var nextRecord = isLastRecord ? record : records[index + 1];
        var nextChildren = nextRecord.children;
        var nextFirstPoint = (0, _util.convertToPoints)(nextChildren[0]);
        var nextLastPoints = (0, _util.convertToPoints)(nextChildren[nextChildren.length - 1]);
        if (!overturn) {
          overturn = nextChildren[0].yMax > children[0].yMax;
        }
        if (overturn) {
          nextFirstPoint.reverse();
          nextLastPoints.reverse();
        }
        var polygonPoints = children.map(function(child, childIndex) {
          var points = (0, _util.convertToPoints)(child);
          if (overturn) {
            points.reverse();
          }
          if (isLastRecord) {
            if (shape === "pyramid") {
              points = [(0, _coord.getMiddlePoint)(points[0], points[1]), points[2], points[3]];
            }
          } else {
            if (childIndex === 0) {
              points[0] = nextFirstPoint[3];
            }
            if (childIndex === children.length - 1) {
              points[1] = nextLastPoints[2];
            }
          }
          return (0, _tslib.__assign)((0, _tslib.__assign)({}, child), {
            points
          });
        });
        return (0, _fEngine.jsx)("group", {
          key
        }, polygonPoints.map(function(child) {
          var points = child.points, color = child.color, shape2 = child.shape;
          return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("polygon", {
            attrs: (0, _tslib.__assign)({
              points: points.map(function(d) {
                return [d.x, d.y];
              }),
              fill: color
            }, shape2)
          }), showLabel && LabelView ? (0, _fEngine.jsx)(LabelView, (0, _tslib.__assign)({
            record: child,
            points
          }, labelCfg)) : null);
        }));
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/index.js
var require_view = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/view/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "funnel", {
      enumerable: true,
      get: function get() {
        return _polygonView.default;
      }
    });
    Object.defineProperty(exports, "pyramid", {
      enumerable: true,
      get: function get() {
        return _polygonView.default;
      }
    });
    Object.defineProperty(exports, "rect", {
      enumerable: true,
      get: function get() {
        return _intervalView.default;
      }
    });
    var _intervalView = _interopRequireDefault(require_intervalView());
    var _polygonView = _interopRequireDefault(require_polygonView());
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/index.js
var require_interval2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/interval/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "IntervalView", {
      enumerable: true,
      get: function get() {
        return _intervalView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withInterval", {
      enumerable: true,
      get: function get() {
        return _withInterval.default;
      }
    });
    var _withInterval = _interopRequireDefault(require_withInterval());
    var Views = _interopRequireWildcard(require_view());
    var _intervalView = _interopRequireDefault(require_intervalView());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    var _default = exports.default = (0, _withInterval.default)(Views);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/point/withPoint.js
var require_withPoint = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/point/withPoint.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _geometry = _interopRequireDefault(require_geometry());
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Point, _super);
          function Point() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          Point.prototype.getDefaultCfg = function() {
            return {
              geomType: "point"
            };
          };
          Point.prototype.render = function() {
            var props = this.props;
            var coord = props.coord;
            var records = this.mapping();
            var clip = this.getClip();
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, props, {
              coord,
              records,
              clip
            }));
          };
          return Point;
        }(_geometry.default)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/point/pointView.js
var require_pointView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/point/pointView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props) {
      var records = props.records, animation = props.animation, clip = props.clip;
      return (0, _fEngine.jsx)("group", {
        attrs: {
          clip
        }
      }, records.map(function(record) {
        var key = record.key, children = record.children;
        return (0, _fEngine.jsx)("group", {
          key
        }, children.map(function(item) {
          var x = item.x, y = item.y, size = item.size, color = item.color, shapeName = item.shapeName, shape = item.shape;
          if (isNaN(x) || isNaN(y)) {
            return null;
          }
          if (shapeName === "rect") {
            var rectSize = (0, _util.isNil)(size) ? shape.size : size;
            return (0, _fEngine.jsx)("rect", {
              key,
              attrs: (0, _tslib.__assign)((0, _tslib.__assign)({
                x: x - rectSize,
                y: y - rectSize,
                fill: color,
                stroke: color
              }, shape), {
                width: rectSize * 2,
                height: rectSize * 2
              }),
              animation: (0, _util.deepMix)({
                appear: {
                  easing: "linear",
                  duration: 450
                },
                update: {
                  easing: "linear",
                  duration: 450,
                  property: ["x", "y", "width", "height", "fill"]
                }
              }, animation)
            });
          }
          return (0, _fEngine.jsx)("circle", {
            key,
            style: (0, _tslib.__assign)((0, _tslib.__assign)({
              cx: x,
              cy: y,
              fill: shapeName === "circle" ? color : null,
              stroke: shapeName === "hollowCircle" ? color : null
            }, shape), {
              r: (0, _util.isNil)(size) ? shape.size : size
            }),
            animation: (0, _util.deepMix)({
              appear: {
                easing: "linear",
                duration: 450
              },
              update: {
                easing: "linear",
                duration: 450,
                property: ["cx", "cy", "r", "fill"]
              }
            }, animation)
          });
        }));
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/point/index.js
var require_point = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/point/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "PointView", {
      enumerable: true,
      get: function get() {
        return _pointView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withPoint", {
      enumerable: true,
      get: function get() {
        return _withPoint.default;
      }
    });
    var _withPoint = _interopRequireDefault(require_withPoint());
    var _pointView = _interopRequireDefault(require_pointView());
    var _default = exports.default = (0, _withPoint.default)(_pointView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/withAxis.js
var require_withAxis = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/withAxis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Axis, _super);
          function Axis(props) {
            var _this = _super.call(this, props) || this;
            _this.axisStyle = {};
            var chart = props.chart, field = props.field;
            var scaleOption = _this.getScaleOption(props);
            chart.setScale(field, scaleOption);
            return _this;
          }
          Axis.prototype.willReceiveProps = function(nextProps) {
            var lastProps = this.props;
            var chart = nextProps.chart, field = nextProps.field;
            var nextScaleOption = this.getScaleOption(nextProps);
            var lastScaleOption = this.getScaleOption(lastProps);
            if (!(0, _fEngine.isEqual)(nextScaleOption, lastScaleOption)) {
              chart.setScale(field, nextScaleOption);
            }
          };
          Axis.prototype.willMount = function() {
            this.updateCoord();
          };
          Axis.prototype.willUpdate = function() {
            this.updateCoord();
          };
          Axis.prototype.getScaleOption = function(props) {
            var type = props.type, tickCount = props.tickCount, range = props.range, mask = props.mask, formatter = props.formatter, ticks = props.ticks, min = props.min, max = props.max, nice = props.nice;
            return {
              type,
              tickCount,
              range,
              mask,
              formatter,
              min,
              max,
              nice,
              ticks
            };
          };
          Axis.prototype._getDimType = function() {
            var props = this.props;
            var field = props.field, chart = props.chart;
            var xScales = chart.getXScales();
            var scales = xScales.filter(function(scale) {
              return scale.field === field;
            });
            return scales.length > 0 ? "x" : "y";
          };
          Axis.prototype.getMaxBBox = function(ticks, style) {
            var context = this.context;
            var measureText = context.measureText;
            var label = style.label, labelOffset = style.labelOffset;
            var width = 0;
            var height = 0;
            ticks.forEach(function(tick) {
              if (!label)
                return;
              var _a = tick.labelStyle, labelStyle = _a === void 0 ? {} : _a, text = tick.text;
              var bbox2 = measureText(labelStyle.text || text, (0, _tslib.__assign)((0, _tslib.__assign)({}, label), labelStyle));
              width = Math.max(width, bbox2.width);
              height = Math.max(height, bbox2.height);
            });
            if (!width && !height) {
              return {
                width,
                height
              };
            }
            var bbox = {
              width: width + labelOffset,
              height: height + labelOffset
            };
            return bbox;
          };
          Axis.prototype._getPosition = function() {
            var props = this.props;
            var position = props.position, coord = props.coord;
            if (position) {
              return position;
            }
            var dimType = this._getDimType();
            if (coord.transposed) {
              return dimType === "x" ? "left" : "bottom";
            }
            return dimType === "x" ? "bottom" : "left";
          };
          Axis.prototype.getTicks = function() {
            var props = this.props;
            var field = props.field, chart = props.chart;
            var scale = chart.getScale(field);
            var ticks = scale.getTicks();
            ticks = this._setTicksStyle(ticks);
            ticks = this._generateGridPoints(ticks);
            return ticks;
          };
          Axis.prototype._generateGridPoints = function(ticks) {
            var props = this.props;
            var chart = props.chart, coord = props.coord;
            if (!coord.isPolar) {
              return ticks;
            }
            var dimType = this._getDimType();
            if (dimType !== "y") {
              return ticks;
            }
            var xScale = chart.getXScales()[0];
            var xTicks = xScale.getTicks();
            ticks.forEach(function(tick) {
              var gridPoints = xTicks.map(function(xTick) {
                return coord.convertPoint({
                  x: xTick.value,
                  y: tick.value
                });
              });
              gridPoints.push(gridPoints[0]);
              tick.gridPoints = gridPoints;
            });
            return ticks;
          };
          Axis.prototype._setTicksStyle = function(ticks) {
            var _this = this;
            var _a = this, props = _a.props, context = _a.context;
            var theme = context.theme, px2hd = context.px2hd;
            var _b = props.style, style = _b === void 0 ? {} : _b;
            var themeAxis = theme.axis;
            (0, _util.each)(themeAxis, function(value, key) {
              if (style[key] === null) {
                return;
              }
              var styleValue = (0, _util.isFunction)(style[key]) ? void 0 : style[key];
              if ((0, _util.isString)(value) || (0, _util.isNumber)(value)) {
                _this.axisStyle[key] = px2hd(styleValue) || value;
              } else if ((0, _util.isArray)(styleValue)) {
                _this.axisStyle[key] = styleValue.map(function(d) {
                  return px2hd((0, _util.deepMix)((0, _util.clone)(value), d));
                });
              } else {
                _this.axisStyle[key] = px2hd((0, _util.deepMix)((0, _util.clone)(value), styleValue));
              }
            });
            return ticks.map(function(tick, index) {
              var label = style.label, grid = style.grid;
              var defaultLabelStyle = themeAxis.label, defaultGridStyle = themeAxis.grid;
              if ((0, _util.isFunction)(label)) {
                tick.labelStyle = px2hd((0, _util.mix)({}, defaultLabelStyle, label(tick.text, index, ticks)));
              }
              if ((0, _util.isFunction)(grid)) {
                tick.gridStyle = px2hd((0, _util.mix)({}, defaultGridStyle, grid(tick.text, index, ticks.length)));
              }
              return tick;
            });
          };
          Axis.prototype.convertTicks = function(ticks) {
            var props = this.props;
            var coord = props.coord;
            var dimType = this._getDimType();
            var otherDim = dimType === "x" ? "y" : "x";
            return ticks.map(function(tick) {
              var _a, _b;
              var start = coord.convertPoint((_a = {}, _a[dimType] = tick.value, _a[otherDim] = 0, _a));
              var end = coord.convertPoint((_b = {}, _b[dimType] = tick.value, _b[otherDim] = 1, _b));
              return (0, _tslib.__assign)((0, _tslib.__assign)({}, tick), {
                points: [start, end]
              });
            });
          };
          Axis.prototype.measureLayout = function() {
            var _a = this, props = _a.props, context = _a.context;
            var visible = props.visible, coord = props.coord, style = props.style;
            if (visible === false) {
              return null;
            }
            var _b = style || {}, customWidth = _b.width, customHeight = _b.height;
            var ticks = this.getTicks();
            var bbox = this.getMaxBBox(ticks, this.axisStyle);
            var isPolar = coord.isPolar;
            var dimType = this._getDimType();
            var width = (0, _util.isNil)(customWidth) ? bbox.width : context.px2hd(customWidth);
            var height = (0, _util.isNil)(customHeight) ? bbox.height : context.px2hd(customHeight);
            if (isPolar) {
              if (dimType === "y") {
                return null;
              }
              return ["top", "right", "bottom", "left"].map(function(position2) {
                return {
                  position: position2,
                  width,
                  height
                };
              });
            }
            var position = this._getPosition();
            return {
              position,
              width,
              height
            };
          };
          Axis.prototype.updateCoord = function() {
            var props = this.props;
            var chart = props.chart;
            var layout = this.measureLayout();
            chart.updateCoordFor(this, layout);
          };
          Axis.prototype.render = function() {
            var _a = this, props = _a.props, axisStyle = _a.axisStyle;
            var visible = props.visible, coord = props.coord;
            if (visible === false) {
              return null;
            }
            var ticks = this.getTicks();
            var position = this._getPosition();
            var dimType = this._getDimType();
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, props, {
              style: axisStyle,
              ticks: this.convertTicks(ticks),
              coord,
              position,
              dimType
            }));
          };
          return Axis;
        }(_fEngine.Component)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/polar/polar-x.js
var require_polar_x = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/polar/polar-x.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _glMatrix = (init_esm(), __toCommonJS(esm_exports));
    function getOffsetPoint(center, point, offset) {
      var vectorX = point.x - center.x;
      var vectorY = point.y - center.y;
      var vectorLength = _glMatrix.vec2.length([vectorX, vectorY]);
      var offsetLength = vectorLength + offset;
      var x = vectorX / vectorLength * offsetLength;
      var y = vectorY / vectorLength * offsetLength;
      return {
        x: center.x + x,
        y: center.y + y
      };
    }
    function getTextAlignInfo(center, point) {
      var vector = [point.x - center.x, point.y - center.y];
      var align;
      var baseLine;
      if (vector[0] > 0) {
        align = "left";
      } else if (vector[0] < 0) {
        align = "right";
      } else {
        align = "center";
      }
      if (vector[1] > 0) {
        baseLine = "top";
      } else if (vector[1] < 0) {
        baseLine = "bottom";
      } else {
        baseLine = "middle";
      }
      return {
        textAlign: align,
        textBaseline: baseLine
      };
    }
    var Line = function Line2(props) {
      var line = props.line, gridType = props.gridType, center = props.center, radius = props.radius, ticks = props.ticks;
      if (!line)
        return null;
      if (gridType !== "line") {
        return (0, _fEngine.jsx)("arc", {
          attrs: (0, _tslib.__assign)({
            cx: center.x,
            cy: center.y,
            r: radius,
            startAngle: 0,
            endAngle: 360
          }, line)
        });
      }
      var points = ticks.map(function(tick) {
        var points2 = tick.points;
        return points2[points2.length - 1];
      });
      points.push(points[0]);
      return (0, _fEngine.jsx)("polyline", {
        attrs: (0, _tslib.__assign)({
          points: points.map(function(d) {
            return [d.x, d.y];
          })
        }, line)
      });
    };
    var _default = exports.default = function _default2(props) {
      var originTicks = props.ticks, coord = props.coord, style = props.style, gridType = props.grid;
      var center = coord.center;
      var grid = style.grid, tickLine = style.tickLine, line = style.line, labelOffset = style.labelOffset, label = style.label;
      var ticks = originTicks.filter(function(d) {
        return !isNaN(d.value);
      });
      var firstTicks = ticks[0];
      var points = firstTicks.points;
      var end = points[points.length - 1];
      var radius = _glMatrix.vec2.length([end.x - center.x, end.y - center.y]);
      return (0, _fEngine.jsx)("group", null, grid ? ticks.map(function(tick) {
        var points2 = tick.points, gridStyle = tick.gridStyle;
        var end2 = points2[points2.length - 1];
        return (0, _fEngine.jsx)("line", {
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({
            x1: center.x,
            y1: center.y,
            x2: end2.x,
            y2: end2.y
          }, grid), gridStyle)
        });
      }) : null, tickLine && tickLine.length ? ticks.map(function(tick) {
        var points2 = tick.points;
        var end2 = points2[points2.length - 1];
        var offsetPoint = getOffsetPoint(center, end2, tickLine.length);
        return (0, _fEngine.jsx)("line", {
          attrs: (0, _tslib.__assign)({
            x1: end2.x,
            y1: end2.y,
            x2: offsetPoint.x,
            y2: offsetPoint.y
          }, tickLine)
        });
      }) : null, (0, _fEngine.jsx)(Line, {
        line,
        gridType,
        center,
        radius,
        ticks
      }), label ? ticks.map(function(tick) {
        var points2 = tick.points, text = tick.text, labelStyle = tick.labelStyle;
        var end2 = points2[points2.length - 1];
        var offsetPoint = getOffsetPoint(center, end2, labelOffset);
        return (0, _fEngine.jsx)("text", {
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({
            x: offsetPoint.x,
            y: offsetPoint.y,
            text
          }, getTextAlignInfo(center, end2)), label), labelStyle)
        });
      }) : null);
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/polar/polar-y.js
var require_polar_y = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/polar/polar-y.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _glMatrix = (init_esm(), __toCommonJS(esm_exports));
    var _default = exports.default = function _default2(props) {
      var originTicks = props.ticks, coord = props.coord, style = props.style, gridType = props.grid;
      var center = coord.center;
      var grid = style.grid, tickLine = style.tickLine, line = style.line, labelOffset = style.labelOffset, label = style.label;
      var ticks = originTicks.filter(function(d) {
        return !isNaN(d.value);
      });
      return (0, _fEngine.jsx)("group", null, grid ? ticks.map(function(tick) {
        var points = tick.points, gridStyle = tick.gridStyle, gridPoints = tick.gridPoints;
        var end = points[points.length - 1];
        if (gridType !== "line") {
          return (0, _fEngine.jsx)("arc", {
            style: (0, _tslib.__assign)((0, _tslib.__assign)({
              cx: center.x,
              cy: center.y,
              startAngle: 0,
              endAngle: 360,
              r: _glMatrix.vec2.length([end.x - center.x, end.y - center.y])
            }, grid), gridStyle)
          });
        }
        return (0, _fEngine.jsx)("polyline", {
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({
            points: gridPoints.map(function(d) {
              return [d.x, d.y];
            })
          }, grid), gridStyle)
        });
      }) : null, tickLine && tickLine.length ? ticks.map(function(tick) {
        var points = tick.points;
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("line", {
          attrs: (0, _tslib.__assign)({
            x1: end.x,
            y1: end.y,
            x2: end.x - tickLine.length,
            y2: end.y
          }, tickLine)
        });
      }) : null, line ? (0, _fEngine.jsx)("line", {
        attrs: (0, _tslib.__assign)({
          x1: ticks[0].points[0].x,
          y1: ticks[0].points[0].y,
          x2: ticks[ticks.length - 1].points[0].x,
          y2: ticks[ticks.length - 1].points[0].y
        }, line)
      }) : null, label ? ticks.map(function(tick) {
        var points = tick.points, text = tick.text, labelStyle = tick.labelStyle;
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("text", {
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({
            x: end.x - labelOffset,
            y: end.y,
            text,
            textAlign: "right",
            textBaseline: "middle"
          }, label), labelStyle)
        });
      }) : null);
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/rect/top.js
var require_top = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/rect/top.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props, context) {
      var originTicks = props.ticks, coord = props.coord, style = props.style;
      var px2hd = context.px2hd;
      var left = coord.left, top = coord.top, right = coord.right;
      var grid = style.grid, tickLine = style.tickLine, line = style.line, labelOffset = style.labelOffset, label = style.label, symbol = style.symbol;
      var ticks = originTicks.filter(function(d) {
        return !isNaN(d.value);
      });
      var symbols = (0, _util.isArray)(symbol) ? symbol : [symbol];
      var _a = tickLine || {}, tickLineLength = _a.length, tickLineStyle = (0, _tslib.__rest)(_a, ["length"]);
      return (0, _fEngine.jsx)("group", null, grid ? ticks.map(function(tick) {
        var points = tick.points, tickValue = tick.tickValue, gridStyle = tick.gridStyle;
        var start = points[0];
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("line", {
          key: "grid-".concat(tickValue),
          style: (0, _tslib.__assign)((0, _tslib.__assign)({
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y
          }, grid), gridStyle)
        });
      }) : null, tickLine && tickLine.length ? ticks.map(function(tick) {
        var points = tick.points, tickValue = tick.tickValue;
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("line", {
          key: "tickLine-".concat(tickValue),
          style: (0, _tslib.__assign)({
            x1: end.x,
            y1: end.y,
            x2: end.x,
            y2: end.y - px2hd(tickLineLength)
          }, tickLineStyle)
        });
      }) : null, symbols[0] ? (0, _fEngine.jsx)("marker", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({
          x: right,
          y: top,
          transform: "rotate(90deg)",
          transformOrigin: "50% 50%"
        }, symbols[0]), {
          symbol: symbols[0].type
        })
      }) : null, line ? (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          x1: left,
          y1: top,
          x2: right,
          y2: top
        }, line)
      }) : null, symbols[1] ? (0, _fEngine.jsx)("marker", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({
          x: left,
          y: top,
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%"
        }, symbols[0]), {
          symbol: symbols[1].type
        })
      }) : null, label ? ticks.map(function(tick, _index) {
        var tickValue = tick.tickValue, points = tick.points, text = tick.text, labelStyle = tick.labelStyle;
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("text", {
          key: "text-".concat(tickValue),
          style: (0, _tslib.__assign)((0, _tslib.__assign)({
            x: end.x,
            y: end.y - labelOffset,
            textAlign: "center",
            textBaseline: "bottom",
            text
          }, label), labelStyle)
        });
      }) : null);
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/rect/bottom.js
var require_bottom = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/rect/bottom.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props, context) {
      var ticks = props.ticks, coord = props.coord, style = props.style, animation = props.animation;
      var px2hd = context.px2hd, measureText = context.measureText;
      var left = coord.left, right = coord.right, bottom = coord.bottom;
      var grid = style.grid, tickLine = style.tickLine, line = style.line, labelOffset = style.labelOffset, label = style.label, symbol = style.symbol;
      var filterTicks = ticks.filter(function(d) {
        return !isNaN(d.value);
      });
      var symbols = (0, _util.isArray)(symbol) ? symbol : [symbol];
      var _a = tickLine || {}, tickLineLength = _a.length, tickLineStyle = (0, _tslib.__rest)(_a, ["length"]);
      return (0, _fEngine.jsx)("group", null, grid ? filterTicks.map(function(tick) {
        var points = tick.points, tickValue = tick.tickValue, gridStyle = tick.gridStyle;
        var start = points[0];
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("line", {
          key: "grid-".concat(tickValue),
          style: (0, _tslib.__assign)((0, _tslib.__assign)({
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y
          }, grid), gridStyle)
        });
      }) : null, tickLineLength ? filterTicks.map(function(tick) {
        var points = tick.points, tickValue = tick.tickValue;
        var start = points[0];
        return (0, _fEngine.jsx)("line", {
          key: "tickLine-".concat(tickValue),
          style: (0, _tslib.__assign)({
            x1: start.x,
            y1: start.y,
            x2: start.x,
            y2: start.y + px2hd(tickLineLength)
          }, tickLineStyle)
        });
      }) : null, symbols[0] ? (0, _fEngine.jsx)("marker", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({
          x: right,
          y: bottom,
          transform: "rotate(90deg)",
          transformOrigin: "50% 50%"
        }, symbols[0]), {
          symbol: symbols[0].type
        })
      }) : null, line ? (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          x1: left,
          y1: bottom,
          x2: right,
          y2: bottom
        }, line)
      }) : null, symbols[1] ? (0, _fEngine.jsx)("marker", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({
          x: left,
          y: bottom,
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%"
        }, symbols[0]), {
          symbol: symbols[1].type
        })
      }) : null, label ? filterTicks.map(function(tick, index) {
        var points = tick.points, text = tick.text, tickValue = tick.tickValue, labelStyle = tick.labelStyle;
        var _a2 = points[0], x = _a2.x, y = _a2.y;
        var _b = (labelStyle || label || {}).align, align = _b === void 0 ? "center" : _b;
        var textAttrs = (0, _tslib.__assign)((0, _tslib.__assign)({
          x,
          y: y + labelOffset,
          textBaseline: "top",
          text
        }, label), labelStyle);
        if (align === "between") {
          if (index === 0) {
            textAttrs.textAlign = "start";
          } else if (index === ticks.length - 1) {
            textAttrs.textAlign = "end";
          } else {
            textAttrs.textAlign = "center";
          }
        } else if (align === "auto") {
          textAttrs.textAlign = "center";
          var width = measureText(text, textAttrs).width;
          var halfWidth = width / 2;
          if (x - halfWidth < left) {
            textAttrs.x = left + width / 2;
          } else if (x + halfWidth > right) {
            textAttrs.x = right - width / 2;
          }
        } else {
          textAttrs.textAlign = align;
        }
        return (0, _fEngine.jsx)("text", {
          key: "text-".concat(tickValue),
          style: textAttrs,
          animation: animation || {
            appear: {
              easing: "linear",
              duration: 300,
              delay: 0,
              property: ["fillOpacity"],
              start: {
                fillOpacity: 0
              },
              end: {
                fillOpacity: 1
              }
            },
            update: {
              easing: "linear",
              duration: 450,
              delay: 0,
              property: ["x", "y"]
            },
            leave: {
              easing: "linear",
              duration: 450,
              delay: 0,
              property: ["fillOpacity"],
              start: {
                fillOpacity: 1
              },
              end: {
                fillOpacity: 0
              }
            }
          }
        });
      }) : null);
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/rect/right.js
var require_right = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/rect/right.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props, context) {
      var originTicks = props.ticks, coord = props.coord, style = props.style;
      var px2hd = context.px2hd;
      var top = coord.top, right = coord.right, bottom = coord.bottom;
      var grid = style.grid, tickLine = style.tickLine, line = style.line, labelOffset = style.labelOffset, label = style.label, symbol = style.symbol;
      var ticks = originTicks.filter(function(d) {
        return !isNaN(d.value);
      });
      var symbols = (0, _util.isArray)(symbol) ? symbol : [symbol];
      var _a = tickLine || {}, tickLineLength = _a.length, tickLineStyle = (0, _tslib.__rest)(_a, ["length"]);
      return (0, _fEngine.jsx)("group", null, grid ? ticks.map(function(tick) {
        var points = tick.points, tickValue = tick.tickValue, gridStyle = tick.gridStyle;
        var start = points[0];
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("line", {
          key: "grid-".concat(tickValue),
          style: (0, _tslib.__assign)((0, _tslib.__assign)({
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y
          }, grid), gridStyle)
        });
      }) : null, tickLineLength ? ticks.map(function(tick) {
        var points = tick.points, tickValue = tick.tickValue;
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("line", {
          key: "tickLine-".concat(tickValue),
          style: (0, _tslib.__assign)({
            x1: end.x,
            y1: end.y,
            x2: end.x + px2hd(tickLineLength),
            y2: end.y
          }, tickLineStyle)
        });
      }) : null, symbols[0] ? (0, _fEngine.jsx)("marker", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({
          x: right,
          y: top
        }, symbols[0]), {
          symbol: symbols[0].type
        })
      }) : null, line ? (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          x1: right,
          y1: top,
          x2: right,
          y2: bottom
        }, line)
      }) : null, symbols[1] ? (0, _fEngine.jsx)("marker", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({
          x: right,
          y: bottom,
          transform: "rotate(180deg)",
          transformOrigin: "50% 50%"
        }, symbols[1]), {
          symbol: symbols[1].type
        })
      }) : null, label ? ticks.map(function(tick, _index) {
        var tickValue = tick.tickValue, points = tick.points, text = tick.text, labelStyle = tick.labelStyle;
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("text", {
          key: "text-".concat(tickValue),
          style: (0, _tslib.__assign)((0, _tslib.__assign)({
            x: end.x + labelOffset,
            y: end.y,
            textAlign: "left",
            textBaseline: "middle",
            text
          }, label), labelStyle)
        });
      }) : null);
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/rect/left.js
var require_left = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/rect/left.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props, context) {
      var originTicks = props.ticks, coord = props.coord, style = props.style, animation = props.animation;
      var px2hd = context.px2hd;
      var left = coord.left, top = coord.top, bottom = coord.bottom;
      var grid = style.grid, tickLine = style.tickLine, line = style.line, labelOffset = style.labelOffset, label = style.label, symbol = style.symbol;
      var ticks = originTicks.filter(function(d) {
        return !isNaN(d.value);
      });
      var symbols = (0, _util.isArray)(symbol) ? symbol : [symbol];
      var _a = tickLine || {}, tickLineLength = _a.length, tickLineStyle = (0, _tslib.__rest)(_a, ["length"]);
      return (0, _fEngine.jsx)("group", null, grid ? ticks.map(function(tick) {
        var points = tick.points, tickValue = tick.tickValue, gridStyle = tick.gridStyle;
        var start = points[0];
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("line", {
          key: "grid-".concat(tickValue),
          style: (0, _tslib.__assign)((0, _tslib.__assign)({
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y
          }, grid), gridStyle)
        });
      }) : null, tickLineLength ? ticks.map(function(tick) {
        var points = tick.points, tickValue = tick.tickValue;
        var start = points[0];
        return (0, _fEngine.jsx)("line", {
          key: "tickLine-".concat(tickValue),
          style: (0, _tslib.__assign)({
            x1: start.x,
            y1: start.y,
            x2: start.x - px2hd(tickLineLength),
            y2: start.y
          }, tickLineStyle)
        });
      }) : null, symbols[0] ? (0, _fEngine.jsx)("marker", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({
          x: left,
          y: top
        }, symbols[0]), {
          symbol: symbols[0].type
        })
      }) : null, line ? (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          x1: left,
          y1: top,
          x2: left,
          y2: bottom
        }, line)
      }) : null, symbols[1] ? (0, _fEngine.jsx)("marker", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({
          x: left,
          y: bottom,
          transform: "rotate(180deg)",
          transformOrigin: "50% 50%"
        }, symbols[1]), {
          symbol: symbols[1].type
        })
      }) : null, label ? ticks.map(function(tick, _index) {
        var tickValue = tick.tickValue, points = tick.points, text = tick.text, labelStyle = tick.labelStyle;
        var start = points[0];
        return (0, _fEngine.jsx)("text", {
          key: "text-".concat(tickValue),
          style: (0, _tslib.__assign)((0, _tslib.__assign)({
            x: start.x - labelOffset,
            y: start.y,
            textAlign: "right",
            textBaseline: "middle",
            text
          }, label), labelStyle),
          animation: animation || {
            appear: {
              easing: "linear",
              duration: 300,
              delay: 0,
              property: ["fillOpacity"],
              start: {
                fillOpacity: 0
              },
              end: {
                fillOpacity: 1
              }
            },
            update: {
              easing: "linear",
              duration: 450,
              delay: 0,
              property: ["x", "y"]
            },
            leave: {
              easing: "linear",
              duration: 450,
              delay: 0,
              property: ["fillOpacity"],
              start: {
                fillOpacity: 1
              },
              end: {
                fillOpacity: 0
              }
            }
          }
        });
      }) : null);
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/axisView.js
var require_axisView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/axisView.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _polarX = _interopRequireDefault(require_polar_x());
    var _polarY = _interopRequireDefault(require_polar_y());
    var _top = _interopRequireDefault(require_top());
    var _bottom = _interopRequireDefault(require_bottom());
    var _right = _interopRequireDefault(require_right());
    var _left = _interopRequireDefault(require_left());
    function isPolar(props) {
      return props.coord.isPolar;
    }
    var _default = exports.default = function _default2(props) {
      if (isPolar(props)) {
        var dimType = props.dimType;
        if (dimType === "x") {
          return (0, _fEngine.jsx)(_polarX.default, (0, _tslib.__assign)({}, props));
        }
        return (0, _fEngine.jsx)(_polarY.default, (0, _tslib.__assign)({}, props));
      }
      var position = props.position;
      if (position === "right") {
        return (0, _fEngine.jsx)(_right.default, (0, _tslib.__assign)({}, props));
      }
      if (position === "left") {
        return (0, _fEngine.jsx)(_left.default, (0, _tslib.__assign)({}, props));
      }
      if (position === "top") {
        return (0, _fEngine.jsx)(_top.default, (0, _tslib.__assign)({}, props));
      }
      return (0, _fEngine.jsx)(_bottom.default, (0, _tslib.__assign)({}, props));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/index.js
var require_axis = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/axis/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "AxisView", {
      enumerable: true,
      get: function get() {
        return _axisView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withAxis", {
      enumerable: true,
      get: function get() {
        return _withAxis.default;
      }
    });
    var _withAxis = _interopRequireDefault(require_withAxis());
    var _axisView = _interopRequireDefault(require_axisView());
    var _default = exports.default = (0, _withAxis.default)(_axisView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/legend/withLegend.js
var require_withLegend = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/legend/withLegend.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Legend, _super);
          function Legend(props) {
            var _this = _super.call(this, props) || this;
            _this._onclick = function(item) {
              var _a;
              var props2 = _this.props;
              var chart = props2.chart, _b = props2.clickable, clickable = _b === void 0 ? true : _b, onClick = props2.onClick;
              if (!clickable)
                return;
              var clickItem = item.currentTarget;
              if (!clickItem) {
                return;
              }
              var dataItem = clickItem.config["data-item"];
              if (!dataItem) {
                return;
              }
              if ((0, _util.isFunction)(onClick)) {
                onClick(dataItem);
              }
              var field = dataItem.field, tickValue = dataItem.tickValue;
              var prevFiltered = _this.state.filtered;
              var filtered = (0, _tslib.__assign)((0, _tslib.__assign)({}, prevFiltered), (_a = {}, _a[tickValue] = !prevFiltered[tickValue], _a));
              _this.setState({
                filtered
              });
              chart.filter(field, function(value) {
                return !filtered[value];
              });
            };
            _this.state = {
              filtered: {},
              items: []
            };
            return _this;
          }
          Legend.prototype.getOriginItems = function() {
            var chart = this.props.chart;
            return chart.getLegendItems();
          };
          Legend.prototype.getItems = function() {
            var _a;
            var _b = this, props = _b.props, state = _b.state;
            var filtered = state.filtered;
            var renderItems = ((_a = props.items) === null || _a === void 0 ? void 0 : _a.length) ? props.items : this.getOriginItems();
            if (!renderItems)
              return null;
            return renderItems.map(function(item) {
              var tickValue = item.tickValue;
              return (0, _tslib.__assign)((0, _tslib.__assign)({}, item), {
                filtered: filtered[tickValue]
              });
            });
          };
          Legend.prototype.setItems = function(items) {
            this.setState({
              items
            });
          };
          Legend.prototype.getMaxItemBox = function(node) {
            var maxItemWidth = 0;
            var maxItemHeight = 0;
            (node.children || []).forEach(function(child) {
              var layout = child.layout;
              var width = layout.width, height = layout.height;
              maxItemWidth = Math.max(maxItemWidth, width);
              maxItemHeight = Math.max(maxItemHeight, height);
            });
            return {
              width: maxItemWidth,
              height: maxItemHeight
            };
          };
          Legend.prototype._init = function() {
            var _a = this, props = _a.props, context = _a.context;
            var parentLayout = props.layout, customWidth = props.width, customHeight = props.height, _b = props.position, position = _b === void 0 ? "top" : _b;
            var items = this.getItems();
            if (!items || !items.length)
              return;
            var left = parentLayout.left, top = parentLayout.top, layoutWidth = parentLayout.width, layoutHeight = parentLayout.height;
            var width = context.px2hd(customWidth) || layoutWidth;
            var node = (0, _fEngine.computeLayout)(this, this.render());
            var _c = this.getMaxItemBox(node), itemMaxWidth = _c.width, itemMaxHeight = _c.height;
            var lineMaxCount = Math.max(1, Math.floor(width / itemMaxWidth));
            var itemCount = items.length;
            var lineCount = Math.ceil(itemCount / lineMaxCount);
            var itemWidth = width / lineMaxCount;
            var autoHeight = itemMaxHeight * lineCount;
            var style = {
              left,
              top,
              width,
              // height 默认自适应
              height: void 0,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-start"
            };
            if (lineCount === 1) {
              style.justifyContent = "space-between";
            }
            if (position === "top") {
              style.height = customHeight ? customHeight : autoHeight;
            }
            if (position === "left") {
              style.flexDirection = "column";
              style.justifyContent = "center";
              style.width = itemMaxWidth;
              style.height = customHeight ? customHeight : layoutHeight;
            }
            if (position === "right") {
              style.flexDirection = "column";
              style.alignItems = "flex-start";
              style.justifyContent = "center";
              style.width = itemMaxWidth;
              style.height = customHeight ? customHeight : layoutHeight;
              style.left = left + (width - itemMaxWidth);
            }
            if (position === "bottom") {
              style.top = top + (layoutHeight - autoHeight);
              style.height = customHeight ? customHeight : autoHeight;
            }
            this.itemWidth = itemWidth;
            this.legendStyle = style;
          };
          Legend.prototype.updateCoord = function() {
            var _a = this, context = _a.context, props = _a.props, legendStyle = _a.legendStyle;
            var _b = props.position, position = _b === void 0 ? "top" : _b, _c = props.margin, margin = _c === void 0 ? "30px" : _c, chart = props.chart;
            var width = legendStyle.width, height = legendStyle.height;
            var marginNumber = context.px2hd(margin);
            chart.updateCoordFor(this, {
              position,
              width: width + marginNumber,
              height: height + marginNumber
            });
          };
          Legend.prototype.willMount = function() {
            var items = this.getItems();
            if (!items || !items.length)
              return;
            this._init();
            this.updateCoord();
          };
          Legend.prototype.didMount = function() {
          };
          Legend.prototype.willUpdate = function() {
            var items = this.getItems();
            if (!items || !items.length)
              return;
            this._init();
            this.updateCoord();
          };
          Legend.prototype.render = function() {
            var _a = this, props = _a.props, itemWidth = _a.itemWidth, legendStyle = _a.legendStyle;
            var items = this.getItems();
            if (!items || !items.length) {
              return null;
            }
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, props, {
              items,
              itemWidth,
              style: (0, _tslib.__assign)((0, _tslib.__assign)({}, legendStyle), props.style),
              onClick: this._onclick
            }));
          };
          return Legend;
        }(_fEngine.Component)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/legend/legendView.js
var require_legendView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/legend/legendView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var Marker = function Marker2(_a) {
      var type = _a.type, color = _a.color;
      if (type === "square") {
        return (0, _fEngine.jsx)("rect", {
          style: {
            width: "12px",
            height: "12px",
            marginRight: "10px"
          },
          attrs: {
            fill: color
          }
        });
      }
      if (type === "line") {
        return (0, _fEngine.jsx)("line", {
          style: {
            width: "19px",
            marginRight: "10px"
          },
          attrs: {
            stroke: color,
            lineCap: "round",
            lineWidth: "4px"
          }
        });
      }
      return (0, _fEngine.jsx)("circle", {
        style: {
          width: "12px",
          height: "12px",
          marginRight: "10px",
          fill: color
        }
      });
    };
    var _default = exports.default = function _default2(props) {
      var items = props.items, itemWidth = props.itemWidth, itemFormatter = props.itemFormatter, style = props.style, _a = props.marker, marker = _a === void 0 ? "circle" : _a, itemStyle = props.itemStyle, nameStyle = props.nameStyle, valueStyle = props.valueStyle, valuePrefix = props.valuePrefix, onClick = props.onClick;
      var formatValue = function formatValue2(value, valuePrefix2) {
        if (valuePrefix2 === void 0) {
          valuePrefix2 = ": ";
        }
        return "".concat(valuePrefix2).concat(value);
      };
      return (0, _fEngine.jsx)("group", {
        style: (0, _tslib.__assign)({
          display: "flex"
        }, style)
      }, items.map(function(item) {
        var color = item.color, name = item.name, value = item.value, filtered = item.filtered, tickValue = item.tickValue;
        var valueText = (0, _util.isFunction)(itemFormatter) ? itemFormatter(value, tickValue) : value;
        return (0, _fEngine.jsx)("group", {
          className: "legend-item",
          style: (0, _tslib.__assign)({
            width: itemWidth,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            //TODO: padding改为’12px‘ 就和原来一致了
            padding: ["6px", "6px", "6px", 0]
          }, itemStyle),
          "data-item": item,
          onClick
        }, Marker({
          color: filtered ? "#bfbfbf" : color,
          type: (item === null || item === void 0 ? void 0 : item.marker) || marker
        }), (0, _fEngine.jsx)("text", {
          attrs: (0, _tslib.__assign)({
            fill: filtered ? "#bfbfbf" : "#808080",
            text: name
          }, nameStyle)
        }), valueText ? (0, _fEngine.jsx)("text", {
          attrs: (0, _tslib.__assign)({
            fill: "#808080",
            text: formatValue(valueText, valuePrefix)
          }, valueStyle)
        }) : null);
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/legend/index.js
var require_legend = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/legend/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "LegendView", {
      enumerable: true,
      get: function get() {
        return _legendView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withLegend", {
      enumerable: true,
      get: function get() {
        return _withLegend.default;
      }
    });
    var _withLegend = _interopRequireDefault(require_withLegend());
    var _legendView = _interopRequireDefault(require_legendView());
    var _default = exports.default = (0, _withLegend.default)(_legendView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/withGuide.js
var require_withGuide = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/withGuide.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    function _default(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Guide, _super);
          function Guide(props) {
            return _super.call(this, props) || this;
          }
          Guide.prototype.getGuideBBox = function() {
            var node = (0, _fEngine.computeLayout)(this, this.render());
            var layout = node.layout;
            if (!layout)
              return;
            return layout;
          };
          Guide.prototype.parseReplaceStr = function(value, scale) {
            var replaceMap = {
              min: 0,
              max: 1,
              median: 0.5
            };
            if (!(0, _util.isNil)(replaceMap[value])) {
              return replaceMap[value];
            }
            if ((0, _util.isString)(value) && value.indexOf("%") != -1 && !isNaN(Number(value.slice(0, -1)))) {
              var rateValue = Number(value.slice(0, -1));
              var percent = rateValue / 100;
              return percent;
            }
            return scale.scale(value);
          };
          Guide.prototype._numberic = function(data) {
            var chart = this.props.chart;
            var scales = [chart.getXScales()[0], chart.getYScales()[0]];
            var count = scales.length;
            for (var i = 0; i < count; i++) {
              var scale = scales[i];
              if (scale.isCategory) {
                var field = scale.field;
                var value = scale.translate(data[field]);
                data[field] = value;
              }
            }
          };
          Guide.prototype.parsePoint = function(record) {
            var props = this.props;
            var chart = props.chart, coord = props.coord, precise = props.precise;
            var adjust = chart.adjust;
            if (precise && (adjust === null || adjust === void 0 ? void 0 : adjust.type) === "dodge") {
              var xScale_1 = chart.getXScales()[0];
              var typeScale = chart.getColorScales()[0];
              this._numberic(record);
              adjust.adjust.getPositionInfo(record, xScale_1.field, record[typeScale.field]);
            }
            var xScale = chart.getXScales()[0];
            var yScale = chart.getYScales()[0];
            var x = this.parseReplaceStr(record[xScale.field], xScale);
            var y = this.parseReplaceStr(record[yScale.field], yScale);
            return coord.convertPoint({
              x,
              y
            });
          };
          Guide.prototype.convertPoints = function(records) {
            var _this = this;
            return records.map(function(record) {
              return _this.parsePoint(record);
            });
          };
          Guide.prototype.getGuideTheme = function() {
            var context = this.context;
            var theme = context.theme;
            return theme.guide;
          };
          Guide.prototype.render = function() {
            var _a = this, props = _a.props, context = _a.context;
            var coord = props.coord, _b = props.records, records = _b === void 0 ? [] : _b, animation = props.animation, chart = props.chart, style = props.style, _onClick = props.onClick, _c = props.visible, visible = _c === void 0 ? true : _c;
            if (!visible)
              return;
            var width = context.width, height = context.height;
            var points = this.convertPoints(records);
            var theme = this.getGuideTheme();
            return (0, _fEngine.jsx)("group", {
              onClick: function onClick(ev) {
                _onClick && _onClick(ev);
              }
            }, (0, _fEngine.jsx)(View, (0, _tslib.__assign)({
              points,
              theme,
              coord
            }, props, {
              canvasWidth: width,
              canvasHeight: height,
              style: (0, _util.isFunction)(style) ? style(points, chart) : style,
              animation: (0, _util.isFunction)(animation) ? animation(points, chart) : animation
            })));
          };
          return Guide;
        }(_fEngine.Component)
      );
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Text.js
var require_Text = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Text.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props, context) {
      var _a = props.theme, theme = _a === void 0 ? {} : _a;
      var _b = (0, _util.deepMix)((0, _tslib.__assign)({}, theme.text), props), points = _b.points, style = _b.style, offsetX = _b.offsetX, offsetY = _b.offsetY, content = _b.content, animation = _b.animation;
      var _c = points[0] || {}, x = _c.x, y = _c.y;
      if (isNaN(x) || isNaN(y))
        return null;
      var offsetXNum = context.px2hd(offsetX);
      var offsetYNum = context.px2hd(offsetY);
      var posX = x + (offsetXNum || 0);
      var posY = y + (offsetYNum || 0);
      return (0, _fEngine.jsx)("text", {
        attrs: (0, _tslib.__assign)({
          text: "".concat(content),
          x: posX,
          y: posY
        }, style),
        animation: (0, _util.deepMix)({
          update: {
            easing: "linear",
            duration: 450,
            property: ["x", "y"]
          }
        }, animation)
      });
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Point.js
var require_Point = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Point.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props, context) {
      var theme = props.theme;
      var _a = (0, _util.deepMix)((0, _tslib.__assign)({}, theme.point), props), points = _a.points, style = _a.style, offsetX = _a.offsetX, offsetY = _a.offsetY, animation = _a.animation;
      var _b = points[0] || {}, x = _b.x, y = _b.y;
      if (isNaN(x) || isNaN(y))
        return null;
      var offsetXNum = context.px2hd(offsetX);
      var offsetYNum = context.px2hd(offsetY);
      var posX = x + (offsetXNum || 0);
      var posY = y + (offsetYNum || 0);
      return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("circle", {
        style: (0, _tslib.__assign)({
          cx: posX,
          cy: posY
        }, style),
        animation
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Line.js
var require_Line = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Line.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props, context) {
      var _a = props.theme, theme = _a === void 0 ? {} : _a;
      var _b = (0, _util.deepMix)((0, _tslib.__assign)({}, theme.line), props), points = _b.points, style = _b.style, offsetX = _b.offsetX, offsetY = _b.offsetY, animation = _b.animation;
      var checkNaN = points.some(function(d) {
        return isNaN(d.x) || isNaN(d.y);
      });
      if (checkNaN)
        return;
      var _c = points[0] || {}, x1 = _c.x, y1 = _c.y;
      var _d = points[1] || {}, x2 = _d.x, y2 = _d.y;
      var offsetXNum = context.px2hd(offsetX);
      var offsetYNum = context.px2hd(offsetY);
      var posX1 = x1 + ((0, _util.isArray)(offsetXNum) ? offsetXNum[0] || 0 : offsetXNum || 0);
      var posY1 = y1 + ((0, _util.isArray)(offsetYNum) ? offsetYNum[0] || 0 : offsetYNum || 0);
      var posX2 = x2 + ((0, _util.isArray)(offsetXNum) ? offsetXNum[1] || 0 : offsetXNum || 0);
      var posY2 = y2 + ((0, _util.isArray)(offsetYNum) ? offsetYNum[1] || 0 : offsetYNum || 0);
      return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          x1: posX1,
          y1: posY1,
          x2: posX2,
          y2: posY2
        }, style),
        animation
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Arc.js
var require_Arc = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Arc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props) {
      var _a = props.theme, theme = _a === void 0 ? {} : _a;
      var _b = (0, _util.deepMix)((0, _tslib.__assign)({}, theme.line), props), coord = _b.coord, points = _b.points, style = _b.style, animation = _b.animation;
      var checkNaN = points.some(function(d) {
        return isNaN(d.x) || isNaN(d.y);
      });
      if (checkNaN)
        return null;
      var start = points[0] || {};
      var end = points[1] || {};
      var coordCenter = coord.center;
      var radius = Math.sqrt((start.x - coordCenter.x) * (start.x - coordCenter.x) + (start.y - coordCenter.y) * (start.y - coordCenter.y));
      var startAngle = Math.atan2(start.y - coordCenter.y, start.x - coordCenter.x);
      var endAngle = Math.atan2(end.y - coordCenter.y, end.x - coordCenter.x);
      return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("arc", {
        style: (0, _tslib.__assign)({
          cx: coordCenter.x,
          cy: coordCenter.y,
          r: radius,
          startAngle: "".concat(startAngle, "rad"),
          endAngle: "".concat(endAngle, "rad")
        }, style),
        animation
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Rect.js
var require_Rect = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Rect.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props, context) {
      var _a = props.theme, theme = _a === void 0 ? {} : _a;
      var _b = (0, _util.deepMix)((0, _tslib.__assign)({}, theme.rect), props), points = _b.points, style = _b.style, animation = _b.animation, offsetX = _b.offsetX, offsetY = _b.offsetY;
      var checkNaN = points.some(function(d) {
        return isNaN(d.x) || isNaN(d.y);
      });
      if (checkNaN)
        return null;
      var start = points[0] || {};
      var end = points[1] || {};
      var offsetXNum = context.px2hd(offsetX);
      var offsetYNum = context.px2hd(offsetY);
      var posX = Math.min(start.x, end.x) + (offsetXNum || 0);
      var posY = Math.min(start.y, end.y) + (offsetYNum || 0);
      return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("rect", {
        style: (0, _tslib.__assign)({
          x: posX,
          y: posY,
          width: Math.abs(end.x - start.x),
          height: Math.abs(start.y - end.y)
        }, style),
        animation
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Image.js
var require_Image = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Image.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var defaultProps = {
      offsetX: 0,
      offsetY: 0,
      points: [],
      src: ""
    };
    var _default = exports.default = function _default2(props, context) {
      var cfg = (0, _util.deepMix)({}, defaultProps, props);
      var points = cfg.points, style = cfg.style, attrs = cfg.attrs, offsetX = cfg.offsetX, offsetY = cfg.offsetY, src = cfg.src, animation = cfg.animation;
      var _a = points[0] || {}, x = _a.x, y = _a.y;
      if (isNaN(x) || isNaN(y))
        return null;
      var _b = (0, _tslib.__assign)((0, _tslib.__assign)({}, attrs), style), _c = _b.height, height = _c === void 0 ? 0 : _c, _d = _b.width, width = _d === void 0 ? 0 : _d;
      var heightNum = (0, _util.isNumber)(height) ? context.px2hd(height + "px") : context.px2hd(height);
      var widthNum = (0, _util.isNumber)(width) ? context.px2hd(width + "px") : context.px2hd(width);
      var offsetXNum = context.px2hd(offsetX);
      var offsetYNum = context.px2hd(offsetY);
      var posX = x + (offsetXNum || 0) - widthNum / 2;
      var posY = y + (offsetYNum || 0) - heightNum / 2;
      return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("image", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, attrs), style), {
          height: heightNum,
          width: widthNum,
          x: posX,
          y: posY,
          src
        }),
        animation: (0, _util.deepMix)({
          update: {
            easing: "linear",
            duration: 450,
            property: ["x", "y"]
          }
        }, animation)
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Tag.js
var require_Tag = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Tag.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var defaultProps = {
      offsetX: 0,
      offsetY: 0,
      points: [],
      direct: "tl",
      side: "8px",
      autoAdjust: true
    };
    var defaultStyle = {
      container: {
        fill: "#1677FF",
        radius: "4px",
        padding: ["4px", "8px"]
      },
      text: {
        fontSize: "22px",
        fill: "#fff"
      },
      arrow: {
        fill: "#1677FF"
      }
    };
    var Label = function Label2(_a) {
      var content = _a.content, background = _a.background, textStyle = _a.textStyle, _b = _a.animation, animation = _b === void 0 ? {} : _b;
      return (0, _fEngine.jsx)("rect", {
        style: (0, _tslib.__assign)({
          display: "flex",
          fill: defaultStyle.container.fill,
          padding: defaultStyle.container.padding,
          radius: defaultStyle.container.radius
        }, background),
        animation
      }, (0, _fEngine.jsx)("text", {
        style: (0, _tslib.__assign)({
          text: content,
          fontSize: defaultStyle.text.fontSize,
          fill: defaultStyle.text.fill
        }, textStyle),
        animation
      }));
    };
    var Tag = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Tag2, _super);
        function Tag2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Tag2.prototype.render = function() {
          var _a = this, props = _a.props, context = _a.context;
          var px2hd = context.px2hd;
          var cfg = (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultProps), props);
          var _b = px2hd(cfg), points = _b.points, content = _b.content, offsetX = _b.offsetX, offsetY = _b.offsetY, direct = _b.direct, side = _b.side, autoAdjust = _b.autoAdjust, canvasWidth = _b.canvasWidth, canvasHeight = _b.canvasHeight, background = _b.background, textStyle = _b.textStyle, animation = _b.animation;
          var _c = points[0] || {}, x = _c.x, y = _c.y;
          if (isNaN(x) || isNaN(y))
            return null;
          var offsetXNum = context.px2hd(offsetX);
          var offsetYNum = context.px2hd(offsetY);
          var posX = x + (offsetXNum || 0);
          var posY = y + (offsetYNum || 0);
          var layout = (0, _fEngine.computeLayout)(this, (0, _fEngine.jsx)(Label, {
            content,
            background,
            textStyle
          })).layout;
          var guideWidth = layout.width, guideHeight = layout.height;
          var _getDirect = function _getDirect2(point) {
            var newDirect = direct;
            var x2 = point.x, y2 = point.y;
            var vertical = newDirect[0];
            var horizontal = newDirect[1];
            if (vertical === "t" && y2 - side - guideHeight < 0) {
              vertical = "b";
            } else if (vertical === "b" && y2 + side + guideHeight > canvasHeight) {
              vertical = "t";
            }
            var diff = vertical === "c" ? side : 0;
            if (horizontal === "l" && x2 - diff - guideWidth < 0) {
              horizontal = "r";
            } else if (horizontal === "r" && x2 + diff + guideWidth > canvasWidth) {
              horizontal = "l";
            } else if (horizontal === "c") {
              if (guideWidth / 2 + x2 + diff > canvasWidth) {
                horizontal = "l";
              } else if (x2 - guideWidth / 2 - diff < 0) {
                horizontal = "r";
              }
            }
            newDirect = vertical + horizontal;
            return newDirect;
          };
          var _getArrowPoints = function _getArrowPoints2(direct2) {
            var arrowPoints2 = [];
            if (direct2 === "tl") {
              arrowPoints2 = [{
                x: guideWidth,
                y: guideHeight - 1
              }, {
                x: guideWidth,
                y: guideHeight + side
              }, {
                x: guideWidth - side,
                y: guideHeight - 1
              }];
              posX -= guideWidth || 0;
              posY = posY - (guideHeight || 0) - side;
            } else if (direct2 === "cl") {
              arrowPoints2 = [{
                x: guideWidth,
                y: guideHeight / 2 - side
              }, {
                x: guideWidth,
                y: guideHeight / 2 + side
              }, {
                x: guideWidth + side,
                y: guideHeight / 2
              }];
              posX = posX - (guideWidth || 0) - side;
              posY -= guideHeight / 2 || 0;
            } else if (direct2 === "bl") {
              arrowPoints2 = [{
                x: guideWidth,
                y: -side
              }, {
                x: guideWidth,
                y: 1
              }, {
                x: guideWidth - side,
                y: 1
              }];
              posX = posX - (guideWidth || 0);
              posY += side;
            } else if (direct2 === "bc") {
              arrowPoints2 = [{
                x: guideWidth / 2,
                y: -side
              }, {
                x: guideWidth / 2 - side,
                y: 1
              }, {
                x: guideWidth / 2 + side,
                y: 1
              }];
              posX = posX - (guideWidth / 2 || 0);
              posY = posY + side;
            } else if (direct2 === "br") {
              arrowPoints2 = [{
                x: 0,
                y: -side
              }, {
                x: 0,
                y: 1
              }, {
                x: +side,
                y: 1
              }];
              posY += side;
            } else if (direct2 === "cr") {
              arrowPoints2 = [{
                x: -side,
                y: guideHeight / 2
              }, {
                x: 0,
                y: guideHeight / 2 - side
              }, {
                x: 0,
                y: guideHeight / 2 + side
              }];
              posX += side;
              posY -= guideHeight / 2 || 0;
            } else if (direct2 === "tr") {
              arrowPoints2 = [{
                x: 0,
                y: guideHeight + side
              }, {
                x: 0,
                y: guideHeight - 1
              }, {
                x: side,
                y: guideHeight - 1
              }];
              posY = posY - (guideHeight || 0) - side;
            } else if (direct2 === "tc") {
              arrowPoints2 = [{
                x: guideWidth / 2,
                y: guideHeight + side
              }, {
                x: guideWidth / 2 - side,
                y: guideHeight - 1
              }, {
                x: guideWidth / 2 + side,
                y: guideHeight - 1
              }];
              posX -= guideWidth / 2 || 0;
              posY = posY - guideHeight - side;
            }
            return arrowPoints2;
          };
          var dr = autoAdjust ? _getDirect(points[0]) : direct;
          var arrowPoints = _getArrowPoints(dr);
          return (0, _fEngine.jsx)("group", {
            style: {
              x: posX,
              y: posY
            }
          }, (0, _fEngine.jsx)(Label, {
            content,
            background,
            textStyle,
            animation
          }), (0, _fEngine.jsx)("polygon", {
            style: {
              points: arrowPoints.map(function(d) {
                return [d.x, d.y];
              }),
              fill: (background === null || background === void 0 ? void 0 : background.fill) || defaultStyle.arrow.fill
            },
            animation
          }));
        };
        return Tag2;
      }(_fEngine.Component)
    );
    var _default = exports.default = Tag;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Lottie.js
var require_Lottie = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Lottie.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _fLottie = _interopRequireDefault((init_es2(), __toCommonJS(es_exports2)));
    var defaultProps = {
      offsetX: 0,
      offsetY: 0,
      points: [],
      data: "",
      animation: null,
      options: {
        loop: true,
        autoplay: true
      }
    };
    var _default = exports.default = function _default2(props, context) {
      var cfg = (0, _util.deepMix)({}, defaultProps, props);
      var points = cfg.points, style = cfg.style, offsetX = cfg.offsetX, offsetY = cfg.offsetY, lottieJson = cfg.lottieJson, animation = cfg.animation, options = cfg.options;
      var _a = points[0] || {}, x = _a.x, y = _a.y;
      if (isNaN(x) || isNaN(y))
        return null;
      var _b = style.height, height = _b === void 0 ? 0 : _b, _c = style.width, width = _c === void 0 ? 0 : _c;
      var offsetXNum = context.px2hd(offsetX);
      var offsetYNum = context.px2hd(offsetY);
      var posX = x + (offsetXNum || 0) - width / 2;
      var posY = y + (offsetYNum || 0) - height / 2;
      return (0, _fEngine.jsx)(_fLottie.default, {
        data: lottieJson,
        options,
        style: {
          x: posX,
          y: posY,
          width,
          height
        },
        animation: (0, _util.deepMix)({
          update: {
            easing: "linear",
            duration: 450,
            property: ["x", "y"]
          }
        }, animation)
      });
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Polyline.js
var require_Polyline = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/views/Polyline.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props, context) {
      var _a = props.theme, theme = _a === void 0 ? {} : _a;
      var _b = (0, _util.deepMix)((0, _tslib.__assign)({}, theme.polyline), props), points = _b.points, style = _b.style, offsetX = _b.offsetX, offsetY = _b.offsetY, animation = _b.animation;
      var checkNaN = points.some(function(d) {
        return isNaN(d.x) || isNaN(d.y);
      });
      if (checkNaN)
        return;
      var offsetXNum = context.px2hd(offsetX);
      var offsetYNum = context.px2hd(offsetY);
      return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("polyline", {
        style: (0, _tslib.__assign)({
          points: points.map(function(point) {
            return [point.x + offsetXNum, point.y + offsetYNum];
          })
        }, style),
        animation
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/index.js
var require_guide = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/guide/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = exports.TextGuide = exports.TagGuide = exports.RectGuide = exports.PolylineGuide = exports.PointGuide = exports.LottieGuide = exports.LineGuide = exports.ImageGuide = exports.ArcGuide = void 0;
    Object.defineProperty(exports, "withGuide", {
      enumerable: true,
      get: function get() {
        return _withGuide.default;
      }
    });
    var _withGuide = _interopRequireDefault(require_withGuide());
    var _Text = _interopRequireDefault(require_Text());
    var _Point = _interopRequireDefault(require_Point());
    var _Line = _interopRequireDefault(require_Line());
    var _Arc = _interopRequireDefault(require_Arc());
    var _Rect = _interopRequireDefault(require_Rect());
    var _Image = _interopRequireDefault(require_Image());
    var _Tag = _interopRequireDefault(require_Tag());
    var _Lottie = _interopRequireDefault(require_Lottie());
    var _Polyline = _interopRequireDefault(require_Polyline());
    var DefaultGuideView = function DefaultGuideView2() {
      return null;
    };
    var TextGuide = exports.TextGuide = (0, _withGuide.default)(_Text.default);
    var PointGuide = exports.PointGuide = (0, _withGuide.default)(_Point.default);
    var LineGuide = exports.LineGuide = (0, _withGuide.default)(_Line.default);
    var ArcGuide = exports.ArcGuide = (0, _withGuide.default)(_Arc.default);
    var RectGuide = exports.RectGuide = (0, _withGuide.default)(_Rect.default);
    var ImageGuide = exports.ImageGuide = (0, _withGuide.default)(_Image.default);
    var TagGuide = exports.TagGuide = (0, _withGuide.default)(_Tag.default);
    var LottieGuide = exports.LottieGuide = (0, _withGuide.default)(_Lottie.default);
    var PolylineGuide = exports.PolylineGuide = (0, _withGuide.default)(_Polyline.default);
    var _default = exports.default = (0, _withGuide.default)(DefaultGuideView);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/tooltip/withTooltip.js
var require_withTooltip = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/tooltip/withTooltip.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Tooltip, _super);
          function Tooltip(props) {
            var _this = _super.call(this, props) || this;
            _this._triggerOn = function(ev) {
              var x = ev.x, y = ev.y;
              _this.show({
                x,
                y
              }, ev);
            };
            _this._triggerOff = function() {
              var _a = _this.props.alwaysShow, alwaysShow = _a === void 0 ? false : _a;
              if (!alwaysShow) {
                _this.hide();
              }
            };
            _this.state = {
              records: null
            };
            return _this;
          }
          Tooltip.prototype.updateCoord = function() {
            var _a = this, props = _a.props, context = _a.context;
            var _b = props.padding, padding = _b === void 0 ? "10px" : _b, chart = props.chart;
            chart.updateCoordFor(this, {
              position: "top",
              width: 0,
              height: context.px2hd(padding)
            });
          };
          Tooltip.prototype.willMount = function() {
            this.updateCoord();
          };
          Tooltip.prototype.didMount = function() {
            this._initShow();
            this._initEvent();
          };
          Tooltip.prototype._initEvent = function() {
            var _a = this.props, chart = _a.chart, _b = _a.triggerOn, triggerOn = _b === void 0 ? "press" : _b, _c = _a.triggerOff, triggerOff = _c === void 0 ? "pressend" : _c;
            chart.on(triggerOn, this._triggerOn);
            chart.on(triggerOff, this._triggerOff);
          };
          Tooltip.prototype.willReceiveProps = function(nextProps) {
            var nextDefaultItem = nextProps.defaultItem, nextCoord = nextProps.coord;
            var _a = this.props, lastDefaultItem = _a.defaultItem, lastCoord = _a.coord;
            if (!(0, _fEngine.isEqual)(nextDefaultItem, lastDefaultItem) || !(0, _fEngine.isEqual)(nextCoord, lastCoord)) {
              this._showByData(nextDefaultItem);
            }
          };
          Tooltip.prototype._initShow = function() {
            var props = this.props;
            var defaultItem = props.defaultItem;
            this._showByData(defaultItem);
          };
          Tooltip.prototype._showByData = function(dataItem) {
            var _this = this;
            if (!dataItem)
              return;
            var props = this.props;
            var chart = props.chart;
            setTimeout(function() {
              var snapRecords = chart.getRecords(dataItem, "xfield");
              _this.showSnapRecords(snapRecords);
            }, 0);
          };
          Tooltip.prototype.show = function(point, _ev) {
            var props = this.props;
            var chart = props.chart;
            var snapRecords = chart.getSnapRecords(point, true);
            if (!snapRecords || !snapRecords.length)
              return;
            this.showSnapRecords(snapRecords);
          };
          Tooltip.prototype.showSnapRecords = function(snapRecords) {
            var _a = this.props, chart = _a.chart, onChange = _a.onChange, onShow = _a.onShow;
            var legendItems = chart.getLegendItems();
            var _b = snapRecords[0], xField = _b.xField, yField = _b.yField;
            var xScale = chart.getScale(xField);
            var yScale = chart.getScale(yField);
            var isInitShow = !this.state.records;
            var records = snapRecords.map(function(record) {
              var origin = record.origin, xField2 = record.xField, yField2 = record.yField;
              var value = (0, _util.isArray)(origin[yField2]) ? origin[yField2].map(function(v) {
                return yScale.getText(v);
              }) : yScale.getText(origin[yField2]);
              var name = yScale.alias;
              if (!name) {
                name = xScale.getText(origin[xField2]);
                if (legendItems && legendItems.length) {
                  var item = (0, _util.find)(legendItems, function(item2) {
                    var field = item2.field, tickValue = item2.tickValue;
                    return origin[field] === tickValue;
                  });
                  if (item && item.name) {
                    name = item.name;
                  }
                }
              }
              return (0, _tslib.__assign)((0, _tslib.__assign)({}, record), {
                name,
                value: "".concat(value)
              });
            });
            if (!(0, _util.isArray)(records) || !records.length) {
              return;
            }
            this.setState({
              records
            });
            if (isInitShow && (0, _util.isFunction)(onShow)) {
              onShow();
            }
            if ((0, _util.isFunction)(onChange)) {
              onChange(records);
            }
          };
          Tooltip.prototype.hide = function() {
            var onHide = this.props.onHide;
            this.setState({
              records: null
            });
            if ((0, _util.isFunction)(onHide)) {
              onHide();
            }
          };
          Tooltip.prototype.render = function() {
            var _a = this, props = _a.props, state = _a.state;
            var visible = props.visible;
            if (visible === false) {
              return null;
            }
            var records = state.records;
            return records && records.length && (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, props, {
              records
            }));
          };
          return Tooltip;
        }(_fEngine.Component)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/tooltip/tooltipView.js
var require_tooltipView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/tooltip/tooltipView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var defaultStyle = {
      showTitle: false,
      showCrosshairs: false,
      crosshairsType: "y",
      crosshairsStyle: {
        stroke: "rgba(0, 0, 0, 0.25)",
        lineWidth: "2px"
      },
      showTooltipMarker: false,
      markerBackgroundStyle: {
        fill: "#CCD6EC",
        opacity: 0.3,
        padding: "6px"
      },
      tooltipMarkerStyle: {
        fill: "#fff",
        lineWidth: "3px"
      },
      background: {
        radius: "4px",
        fill: "rgba(0, 0, 0, 0.65)",
        padding: ["6px", "10px"]
      },
      titleStyle: {
        fontSize: "24px",
        fill: "#fff",
        textAlign: "start",
        textBaseline: "top"
      },
      nameStyle: {
        fontSize: "24px",
        fill: "rgba(255, 255, 255, 0.65)",
        textAlign: "start",
        textBaseline: "middle"
      },
      valueStyle: {
        fontSize: "24px",
        fill: "#fff",
        textAlign: "start",
        textBaseline: "middle"
      },
      joinString: ": ",
      showItemMarker: true,
      itemMarkerStyle: {
        width: "12px",
        radius: "6px",
        symbol: "circle",
        lineWidth: "2px",
        stroke: "#fff"
      },
      layout: "horizontal",
      snap: false,
      xTipTextStyle: {
        fontSize: "24px",
        fill: "#fff"
      },
      yTipTextStyle: {
        fontSize: "24px",
        fill: "#fff"
      },
      xTipBackground: {
        radius: "4px",
        fill: "rgba(0, 0, 0, 0.65)",
        padding: ["6px", "10px"],
        marginLeft: "-50%",
        marginTop: "6px"
      },
      yTipBackground: {
        radius: "4px",
        fill: "rgba(0, 0, 0, 0.65)",
        padding: ["6px", "10px"],
        marginLeft: "-100%",
        marginTop: "-50%"
      }
    };
    function directionEnabled(mode, dir) {
      if (mode === void 0) {
        return true;
      } else if (typeof mode === "string") {
        return mode.indexOf(dir) !== -1;
      }
      return false;
    }
    var RenderItemMarker = function RenderItemMarker2(props) {
      var records = props.records, coord = props.coord, context = props.context, markerBackgroundStyle = props.markerBackgroundStyle;
      var point = coord.convertPoint({
        x: 1,
        y: 1
      });
      var padding = context.px2hd(markerBackgroundStyle.padding || "6px");
      var xPoints = (0, _tslib.__spreadArray)((0, _tslib.__spreadArray)([], records.map(function(record) {
        return record.xMin;
      }), true), records.map(function(record) {
        return record.xMax;
      }), true);
      var yPoints = (0, _tslib.__spreadArray)((0, _tslib.__spreadArray)([], records.map(function(record) {
        return record.yMin;
      }), true), records.map(function(record) {
        return record.yMax;
      }), true);
      if (coord.transposed) {
        xPoints.push(point.x);
      } else {
        yPoints.push(point.y);
      }
      var xMin = Math.min.apply(null, xPoints);
      var xMax = Math.max.apply(null, xPoints);
      var yMin = Math.min.apply(null, yPoints);
      var yMax = Math.max.apply(null, yPoints);
      var x = coord.transposed ? xMin : xMin - padding;
      var y = coord.transposed ? yMin - padding : yMin;
      var width = coord.transposed ? xMax - xMin : xMax - xMin + 2 * padding;
      var height = coord.transposed ? yMax - yMin + 2 * padding : yMax - yMin;
      return (0, _fEngine.jsx)("rect", {
        style: (0, _tslib.__assign)({
          x,
          y,
          width,
          height
        }, markerBackgroundStyle)
      });
    };
    var RenderCrosshairs = function RenderCrosshairs2(props) {
      var records = props.records, coord = props.coord, chart = props.chart, crosshairsType = props.crosshairsType, crosshairsStyle = props.crosshairsStyle, xPositionType = props.xPositionType, yPositionType = props.yPositionType;
      var coordLeft = coord.left, coordTop = coord.top, coordRight = coord.right, coordBottom = coord.bottom, center = coord.center;
      var firstRecord = records[0];
      var x = firstRecord.x, y = firstRecord.y, origin = firstRecord.origin, xField = firstRecord.xField, coordData = firstRecord.coord;
      if (coord.isPolar) {
        var xScale = chart.getScale(xField);
        var ticks = xScale.getTicks();
        var tick = (0, _util.find)(ticks, function(tick2) {
          return origin[xField] === tick2.tickValue;
        });
        var end = coord.convertPoint({
          x: tick.value,
          y: 1
        });
        return (0, _fEngine.jsx)("line", {
          style: (0, _tslib.__assign)({
            x1: center.x,
            y1: center.y,
            x2: end.x,
            y2: end.y
          }, crosshairsStyle)
        });
      }
      return (0, _fEngine.jsx)("group", null, directionEnabled(crosshairsType, "x") ? (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          x1: coordLeft,
          y1: yPositionType === "coord" ? coordData.y : y,
          x2: coordRight,
          y2: yPositionType === "coord" ? coordData.y : y
        }, crosshairsStyle)
      }) : null, directionEnabled(crosshairsType, "y") ? (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          x1: xPositionType === "coord" ? coordData.x : x,
          y1: coordTop,
          x2: xPositionType === "coord" ? coordData.x : x,
          y2: coordBottom
        }, crosshairsStyle)
      }) : null);
    };
    var RenderXTip = function RenderXTip2(props) {
      var records = props.records, coord = props.coord, xTip = props.xTip, xPositionType = props.xPositionType, xTipTextStyle = props.xTipTextStyle, xTipBackground = props.xTipBackground;
      var coordBottom = coord.bottom;
      var firstRecord = records[0];
      var x = firstRecord.x, coordData = firstRecord.coord;
      var xFirstText = firstRecord.name;
      return (0, _fEngine.jsx)("rect", {
        style: (0, _tslib.__assign)({
          display: "flex",
          left: xPositionType === "coord" ? coordData.x : x,
          top: coordBottom
        }, xTipBackground)
      }, (0, _fEngine.jsx)("text", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({}, xTipTextStyle), {
          text: xPositionType === "coord" ? coordData.xText : (0, _util.isFunction)(xTip) ? xTip(xFirstText, firstRecord) : xFirstText
        })
      }));
    };
    var RenderYTip = function RenderYTip2(props) {
      var records = props.records, coord = props.coord, yTip = props.yTip, yPositionType = props.yPositionType, yTipTextStyle = props.yTipTextStyle, yTipBackground = props.yTipBackground;
      var coordLeft = coord.left;
      var firstRecord = records[0];
      var y = firstRecord.y, coordData = firstRecord.coord;
      var yFirstText = firstRecord.value;
      return (0, _fEngine.jsx)("rect", {
        style: (0, _tslib.__assign)({
          display: "flex",
          left: coordLeft,
          top: yPositionType === "coord" ? coordData.y : y
        }, yTipBackground)
      }, (0, _fEngine.jsx)("text", {
        style: (0, _tslib.__assign)((0, _tslib.__assign)({}, yTipTextStyle), {
          text: yPositionType === "coord" ? coordData.yText : (0, _util.isFunction)(yTip) ? yTip(yFirstText, firstRecord) : yFirstText
        })
      }));
    };
    var RenderLabel = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(RenderLabel2, _super);
        function RenderLabel2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.style = {};
          return _this;
        }
        RenderLabel2.prototype.getMaxItemBox = function(node) {
          var maxItemWidth = 0;
          var maxItemHeight = 0;
          (node.children || []).forEach(function(child) {
            var layout = child.layout;
            var width = layout.width, height = layout.height;
            maxItemWidth = Math.max(maxItemWidth, width);
            maxItemHeight = Math.max(maxItemHeight, height);
          });
          return {
            width: maxItemWidth,
            height: maxItemHeight
          };
        };
        RenderLabel2.prototype._getContainerLayout = function() {
          var _a = this.props, records = _a.records, coord = _a.coord;
          if (!records || !records.length)
            return;
          var width = coord.width;
          var node = (0, _fEngine.computeLayout)(this, this.render());
          var itemMaxWidth = this.getMaxItemBox(node === null || node === void 0 ? void 0 : node.children[0]).width;
          var lineMaxCount = Math.max(1, Math.floor(width / itemMaxWidth));
          var itemCount = records.length;
          if (itemCount > lineMaxCount) {
            this.style = {
              width
            };
          }
        };
        RenderLabel2.prototype.willMount = function() {
          this._getContainerLayout();
        };
        RenderLabel2.prototype.render = function() {
          var _this = this;
          var _a = this.props, records = _a.records, background = _a.background, showItemMarker = _a.showItemMarker, itemMarkerStyle = _a.itemMarkerStyle, customText = _a.customText, nameStyle = _a.nameStyle, valueStyle = _a.valueStyle, joinString = _a.joinString, arrowWidth = _a.arrowWidth, x = _a.x, coord = _a.coord, itemWidth = _a.itemWidth;
          var labelView = function labelView2(left2, top2) {
            return (0, _fEngine.jsx)("group", {
              style: {
                display: "flex"
              }
            }, (0, _fEngine.jsx)("group", {
              style: (0, _tslib.__assign)((0, _tslib.__assign)({
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: [0, 0, 0, "6px"],
                left: left2,
                top: top2
              }, _this.style), background)
            }, records.map(function(record) {
              var name = record.name, value = record.value;
              return (0, _fEngine.jsx)("group", {
                style: {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: [0, "6px", 0, 0],
                  width: itemWidth
                }
              }, showItemMarker ? (0, _fEngine.jsx)("marker", {
                style: (0, _tslib.__assign)((0, _tslib.__assign)({
                  width: itemMarkerStyle.width,
                  marginRight: "6px"
                }, itemMarkerStyle), {
                  fill: record.color
                })
              }) : null, customText && (0, _util.isFunction)(customText) ? customText(record) : (0, _fEngine.jsx)("group", {
                style: {
                  display: "flex",
                  flexDirection: "row"
                }
              }, (0, _fEngine.jsx)("text", {
                style: (0, _tslib.__assign)((0, _tslib.__assign)({}, nameStyle), {
                  text: value ? "".concat(name).concat(joinString) : name
                })
              }), (0, _fEngine.jsx)("text", {
                style: (0, _tslib.__assign)((0, _tslib.__assign)({}, valueStyle), {
                  text: value
                })
              })));
            })), (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("polygon", {
              style: {
                points: [[x - arrowWidth, top2], [x + arrowWidth, top2], [x, top2 + arrowWidth]],
                fill: background.fill
              }
            })));
          };
          var layout = (0, _fEngine.computeLayout)(this, labelView(0, 0)).layout;
          var coordLeft = coord.left, coordTop = coord.top, coordRight = coord.right;
          var width = layout.width, height = layout.height;
          var halfWidth = width / 2;
          var advanceLeft = x - halfWidth;
          var advanceTop = coordTop - height;
          var left = advanceLeft < coordLeft ? coordLeft : advanceLeft > coordRight - width ? coordRight - width : advanceLeft;
          var top = advanceTop < 0 ? 0 : advanceTop;
          return labelView(left, top);
        };
        return RenderLabel2;
      }(_fEngine.Component)
    );
    var TooltipView = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(TooltipView2, _super);
        function TooltipView2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        TooltipView2.prototype.render = function() {
          var _a = this, props = _a.props, context = _a.context;
          var records = props.records, coord = props.coord;
          var firstRecord = records[0];
          var x = firstRecord.x, coordData = firstRecord.coord;
          var chart = props.chart, customBackground = props.background, _b = props.showTooltipMarker, showTooltipMarker = _b === void 0 ? defaultStyle.showTooltipMarker : _b, _c = props.markerBackgroundStyle, markerBackgroundStyle = _c === void 0 ? defaultStyle.markerBackgroundStyle : _c, _d = props.showItemMarker, showItemMarker = _d === void 0 ? defaultStyle.showItemMarker : _d, customItemMarkerStyle = props.itemMarkerStyle, nameStyle = props.nameStyle, valueStyle = props.valueStyle, _e = props.joinString, joinString = _e === void 0 ? defaultStyle.joinString : _e, _f = props.showCrosshairs, showCrosshairs = _f === void 0 ? defaultStyle.showCrosshairs : _f, crosshairsStyle = props.crosshairsStyle, _g = props.crosshairsType, crosshairsType = _g === void 0 ? defaultStyle.crosshairsType : _g, _h = props.snap, snap = _h === void 0 ? defaultStyle.snap : _h, _j = props.tooltipMarkerStyle, tooltipMarkerStyle = _j === void 0 ? defaultStyle.tooltipMarkerStyle : _j, showXTip = props.showXTip, xPositionType = props.xPositionType, showYTip = props.showYTip, yPositionType = props.yPositionType, xTip = props.xTip, yTip = props.yTip, _k = props.xTipTextStyle, xTipTextStyle = _k === void 0 ? defaultStyle.xTipTextStyle : _k, _l = props.yTipTextStyle, yTipTextStyle = _l === void 0 ? defaultStyle.yTipTextStyle : _l, _m = props.xTipBackground, xTipBackground = _m === void 0 ? defaultStyle.xTipBackground : _m, _o = props.yTipBackground, yTipBackground = _o === void 0 ? defaultStyle.yTipBackground : _o, _p = props.custom, custom = _p === void 0 ? false : _p, customText = props.customText, itemWidth = props.itemWidth;
          var itemMarkerStyle = (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle.itemMarkerStyle), customItemMarkerStyle);
          var background = (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle.background), customBackground);
          var arrowWidth = context.px2hd("6px");
          return (0, _fEngine.jsx)("group", null, showTooltipMarker ? (0, _fEngine.jsx)(RenderItemMarker, {
            coord,
            context,
            records,
            markerBackgroundStyle
          }) : null, showCrosshairs ? (0, _fEngine.jsx)(RenderCrosshairs, {
            chart,
            coord,
            records,
            xPositionType,
            yPositionType,
            crosshairsType,
            crosshairsStyle: (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle.crosshairsStyle), crosshairsStyle)
          }) : null, snap ? records.map(function(item) {
            var x2 = item.x, y = item.y, color = item.color, shape = item.shape;
            return (0, _fEngine.jsx)("circle", {
              style: (0, _tslib.__assign)((0, _tslib.__assign)({
                cx: xPositionType === "coord" ? coordData.x : x2,
                cy: yPositionType === "coord" ? coordData.y : y,
                r: "6px",
                stroke: color,
                fill: color
              }, shape), tooltipMarkerStyle)
            });
          }) : null, showXTip && (0, _fEngine.jsx)(RenderXTip, {
            records,
            coord,
            xTip,
            xPositionType,
            xTipTextStyle: (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle.xTipTextStyle), xTipTextStyle),
            xTipBackground: (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle.xTipBackground), xTipBackground)
          }), showYTip && (0, _fEngine.jsx)(RenderYTip, {
            records,
            coord,
            yTip,
            yPositionType,
            yTipTextStyle: (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle.yTipTextStyle), yTipTextStyle),
            yTipBackground: (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle.yTipBackground), yTipBackground)
          }), !custom && (0, _fEngine.jsx)(RenderLabel, {
            records,
            coord,
            itemMarkerStyle,
            customText,
            showItemMarker,
            x,
            arrowWidth,
            background,
            nameStyle: (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle.nameStyle), nameStyle),
            valueStyle: (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle.valueStyle), valueStyle),
            joinString,
            itemWidth
          }));
        };
        return TooltipView2;
      }(_fEngine.Component)
    );
    var _default = exports.default = TooltipView;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/tooltip/index.js
var require_tooltip = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/tooltip/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "TooltipView", {
      enumerable: true,
      get: function get() {
        return _tooltipView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withTooltip", {
      enumerable: true,
      get: function get() {
        return _withTooltip.default;
      }
    });
    var _withTooltip = _interopRequireDefault(require_withTooltip());
    var _tooltipView = _interopRequireDefault(require_tooltipView());
    var _default = exports.default = (0, _withTooltip.default)(_tooltipView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/cluster.js
var require_cluster = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/cluster.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function defaultSeparation(a, b) {
      return a.parent === b.parent ? 1 : 2;
    }
    function meanX(children) {
      return children.reduce(meanXReduce, 0) / children.length;
    }
    function meanXReduce(x, c) {
      return x + c.x;
    }
    function maxY(children) {
      return 1 + children.reduce(maxYReduce, 0);
    }
    function maxYReduce(y, c) {
      return Math.max(y, c.y);
    }
    function leafLeft(node) {
      var children;
      while (children = node.children)
        node = children[0];
      return node;
    }
    function leafRight(node) {
      var children;
      while (children = node.children)
        node = children[children.length - 1];
      return node;
    }
    function _default() {
      var separation = defaultSeparation, dx = 1, dy = 1, nodeSize = false;
      function cluster(root) {
        var previousNode, x = 0;
        root.eachAfter(function(node) {
          var children = node.children;
          if (children) {
            node.x = meanX(children);
            node.y = maxY(children);
          } else {
            node.x = previousNode ? x += separation(node, previousNode) : 0;
            node.y = 0;
            previousNode = node;
          }
        });
        var left = leafLeft(root), right = leafRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
        return root.eachAfter(nodeSize ? function(node) {
          node.x = (node.x - root.x) * dx;
          node.y = (root.y - node.y) * dy;
        } : function(node) {
          node.x = (node.x - x0) / (x1 - x0) * dx;
          node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
        });
      }
      cluster.separation = function(x) {
        return arguments.length ? (separation = x, cluster) : separation;
      };
      cluster.size = function(x) {
        return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster) : nodeSize ? null : [dx, dy];
      };
      cluster.nodeSize = function(x) {
        return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster) : nodeSize ? [dx, dy] : null;
      };
      return cluster;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/toPrimitive.js
var require_toPrimitive = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/toPrimitive.js"(exports, module) {
    var _typeof = require_typeof()["default"];
    function toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/toPropertyKey.js
var require_toPropertyKey = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/toPropertyKey.js"(exports, module) {
    var _typeof = require_typeof()["default"];
    var toPrimitive = require_toPrimitive();
    function toPropertyKey(t) {
      var i = toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/defineProperty.js
var require_defineProperty = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/defineProperty.js"(exports, module) {
    var toPropertyKey = require_toPropertyKey();
    function _defineProperty(e, r, t) {
      return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e[r] = t, e;
    }
    module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/count.js
var require_count = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/count.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function count(node) {
      var sum = 0, children = node.children, i = children && children.length;
      if (!i)
        sum = 1;
      else
        while (--i >= 0)
          sum += children[i].value;
      node.value = sum;
    }
    function _default() {
      return this.eachAfter(count);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/arrayLikeToArray.js
var require_arrayLikeToArray = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/arrayLikeToArray.js"(exports, module) {
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++)
        n[e] = r[e];
      return n;
    }
    module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js
var require_unsupportedIterableToArray = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js"(exports, module) {
    var arrayLikeToArray = require_arrayLikeToArray();
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r)
          return arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
      }
    }
    module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/createForOfIteratorHelper.js
var require_createForOfIteratorHelper = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@babel/runtime/helpers/createForOfIteratorHelper.js"(exports, module) {
    var unsupportedIterableToArray = require_unsupportedIterableToArray();
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return {
            s: F,
            n: function n() {
              return _n >= r.length ? {
                done: true
              } : {
                done: false,
                value: r[_n++]
              };
            },
            e: function e2(r2) {
              throw r2;
            },
            f: F
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return {
        s: function s() {
          t = t.call(r);
        },
        n: function n() {
          var r2 = t.next();
          return a = r2.done, r2;
        },
        e: function e2(r2) {
          u = true, o = r2;
        },
        f: function f() {
          try {
            a || null == t["return"] || t["return"]();
          } finally {
            if (u)
              throw o;
          }
        }
      };
    }
    module.exports = _createForOfIteratorHelper, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/each.js
var require_each = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/each.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _createForOfIteratorHelper2 = _interopRequireDefault(require_createForOfIteratorHelper());
    function _default(callback, that) {
      var index = -1;
      var _iterator = (0, _createForOfIteratorHelper2.default)(this), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var node = _step.value;
          callback.call(that, node, ++index, this);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return this;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/eachBefore.js
var require_eachBefore = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/eachBefore.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(callback, that) {
      var node = this, nodes = [node], children, i, index = -1;
      while (node = nodes.pop()) {
        callback.call(that, node, ++index, this);
        if (children = node.children) {
          for (i = children.length - 1; i >= 0; --i) {
            nodes.push(children[i]);
          }
        }
      }
      return this;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/eachAfter.js
var require_eachAfter = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/eachAfter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(callback, that) {
      var node = this, nodes = [node], next = [], children, i, n, index = -1;
      while (node = nodes.pop()) {
        next.push(node);
        if (children = node.children) {
          for (i = 0, n = children.length; i < n; ++i) {
            nodes.push(children[i]);
          }
        }
      }
      while (node = next.pop()) {
        callback.call(that, node, ++index, this);
      }
      return this;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/find.js
var require_find = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/find.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _createForOfIteratorHelper2 = _interopRequireDefault(require_createForOfIteratorHelper());
    function _default(callback, that) {
      var index = -1;
      var _iterator = (0, _createForOfIteratorHelper2.default)(this), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var node = _step.value;
          if (callback.call(that, node, ++index, this)) {
            return node;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/sum.js
var require_sum = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/sum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(value) {
      return this.eachAfter(function(node) {
        var sum = +value(node.data) || 0, children = node.children, i = children && children.length;
        while (--i >= 0)
          sum += children[i].value;
        node.value = sum;
      });
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/sort.js
var require_sort = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/sort.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(compare) {
      return this.eachBefore(function(node) {
        if (node.children) {
          node.children.sort(compare);
        }
      });
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/path.js
var require_path = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/path.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(end) {
      var start = this, ancestor = leastCommonAncestor(start, end), nodes = [start];
      while (start !== ancestor) {
        start = start.parent;
        nodes.push(start);
      }
      var k = nodes.length;
      while (end !== ancestor) {
        nodes.splice(k, 0, end);
        end = end.parent;
      }
      return nodes;
    }
    function leastCommonAncestor(a, b) {
      if (a === b)
        return a;
      var aNodes = a.ancestors(), bNodes = b.ancestors(), c = null;
      a = aNodes.pop();
      b = bNodes.pop();
      while (a === b) {
        c = a;
        a = aNodes.pop();
        b = bNodes.pop();
      }
      return c;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/ancestors.js
var require_ancestors = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/ancestors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default() {
      var node = this, nodes = [node];
      while (node = node.parent) {
        nodes.push(node);
      }
      return nodes;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/descendants.js
var require_descendants = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/descendants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default() {
      return Array.from(this);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/leaves.js
var require_leaves = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/leaves.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default() {
      var leaves = [];
      this.eachBefore(function(node) {
        if (!node.children) {
          leaves.push(node);
        }
      });
      return leaves;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/links.js
var require_links = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/links.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default() {
      var root = this, links = [];
      root.each(function(node) {
        if (node !== root) {
          links.push({
            source: node.parent,
            target: node
          });
        }
      });
      return links;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/iterator.js
var require_iterator = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/iterator.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _callee;
    var _regenerator = _interopRequireDefault(require_regenerator());
    var _marked = _regenerator.default.mark(_callee);
    function _callee() {
      var node, current, next, children, i, n;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1)
          switch (_context.prev = _context.next) {
            case 0:
              node = this, next = [node];
            case 1:
              current = next.reverse(), next = [];
            case 2:
              if (!(node = current.pop())) {
                _context.next = 8;
                break;
              }
              _context.next = 5;
              return node;
            case 5:
              if (children = node.children) {
                for (i = 0, n = children.length; i < n; ++i) {
                  next.push(children[i]);
                }
              }
              _context.next = 2;
              break;
            case 8:
              if (next.length) {
                _context.next = 1;
                break;
              }
            case 9:
            case "end":
              return _context.stop();
          }
      }, _marked, this);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/index.js
var require_hierarchy = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/hierarchy/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Node = Node;
    exports.computeHeight = computeHeight;
    exports.default = hierarchy;
    var _defineProperty2 = _interopRequireDefault(require_defineProperty());
    var _count = _interopRequireDefault(require_count());
    var _each = _interopRequireDefault(require_each());
    var _eachBefore = _interopRequireDefault(require_eachBefore());
    var _eachAfter = _interopRequireDefault(require_eachAfter());
    var _find = _interopRequireDefault(require_find());
    var _sum = _interopRequireDefault(require_sum());
    var _sort = _interopRequireDefault(require_sort());
    var _path = _interopRequireDefault(require_path());
    var _ancestors = _interopRequireDefault(require_ancestors());
    var _descendants = _interopRequireDefault(require_descendants());
    var _leaves = _interopRequireDefault(require_leaves());
    var _links = _interopRequireDefault(require_links());
    var _iterator = _interopRequireDefault(require_iterator());
    function hierarchy(data, children) {
      if (data instanceof Map) {
        data = [void 0, data];
        if (children === void 0)
          children = mapChildren;
      } else if (children === void 0) {
        children = objectChildren;
      }
      var root = new Node(data), node, nodes = [root], child, childs, i, n;
      while (node = nodes.pop()) {
        if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
          node.children = childs;
          for (i = n - 1; i >= 0; --i) {
            nodes.push(child = childs[i] = new Node(childs[i]));
            child.parent = node;
            child.depth = node.depth + 1;
          }
        }
      }
      return root.eachBefore(computeHeight);
    }
    function node_copy() {
      return hierarchy(this).eachBefore(copyData);
    }
    function objectChildren(d) {
      return d.children;
    }
    function mapChildren(d) {
      return Array.isArray(d) ? d[1] : null;
    }
    function copyData(node) {
      if (node.data.value !== void 0)
        node.value = node.data.value;
      node.data = node.data.data;
    }
    function computeHeight(node) {
      var height = 0;
      do
        node.height = height;
      while ((node = node.parent) && node.height < ++height);
    }
    function Node(data) {
      this.data = data;
      this.depth = this.height = 0;
      this.parent = null;
    }
    Node.prototype = hierarchy.prototype = (0, _defineProperty2.default)({
      constructor: Node,
      count: _count.default,
      each: _each.default,
      eachAfter: _eachAfter.default,
      eachBefore: _eachBefore.default,
      find: _find.default,
      sum: _sum.default,
      sort: _sort.default,
      path: _path.default,
      ancestors: _ancestors.default,
      descendants: _descendants.default,
      leaves: _leaves.default,
      links: _links.default,
      copy: node_copy
    }, Symbol.iterator, _iterator.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/array.js
var require_array2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/array.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.shuffle = shuffle;
    var _typeof2 = _interopRequireDefault(require_typeof());
    function _default(x) {
      return (0, _typeof2.default)(x) === "object" && "length" in x ? x : Array.from(x);
    }
    function shuffle(array) {
      var m = array.length, t, i;
      while (m) {
        i = Math.random() * m-- | 0;
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/pack/enclose.js
var require_enclose = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/pack/enclose.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _array = require_array2();
    function _default(circles) {
      var i = 0, n = (circles = (0, _array.shuffle)(Array.from(circles))).length, B = [], p, e;
      while (i < n) {
        p = circles[i];
        if (e && enclosesWeak(e, p))
          ++i;
        else
          e = encloseBasis(B = extendBasis(B, p)), i = 0;
      }
      return e;
    }
    function extendBasis(B, p) {
      var i, j;
      if (enclosesWeakAll(p, B))
        return [p];
      for (i = 0; i < B.length; ++i) {
        if (enclosesNot(p, B[i]) && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
          return [B[i], p];
        }
      }
      for (i = 0; i < B.length - 1; ++i) {
        for (j = i + 1; j < B.length; ++j) {
          if (enclosesNot(encloseBasis2(B[i], B[j]), p) && enclosesNot(encloseBasis2(B[i], p), B[j]) && enclosesNot(encloseBasis2(B[j], p), B[i]) && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
            return [B[i], B[j], p];
          }
        }
      }
      throw new Error();
    }
    function enclosesNot(a, b) {
      var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
      return dr < 0 || dr * dr < dx * dx + dy * dy;
    }
    function enclosesWeak(a, b) {
      var dr = a.r - b.r + Math.max(a.r, b.r, 1) * 1e-9, dx = b.x - a.x, dy = b.y - a.y;
      return dr > 0 && dr * dr > dx * dx + dy * dy;
    }
    function enclosesWeakAll(a, B) {
      for (var i = 0; i < B.length; ++i) {
        if (!enclosesWeak(a, B[i])) {
          return false;
        }
      }
      return true;
    }
    function encloseBasis(B) {
      switch (B.length) {
        case 1:
          return encloseBasis1(B[0]);
        case 2:
          return encloseBasis2(B[0], B[1]);
        case 3:
          return encloseBasis3(B[0], B[1], B[2]);
      }
    }
    function encloseBasis1(a) {
      return {
        x: a.x,
        y: a.y,
        r: a.r
      };
    }
    function encloseBasis2(a, b) {
      var x1 = a.x, y1 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1, l = Math.sqrt(x21 * x21 + y21 * y21);
      return {
        x: (x1 + x2 + x21 / l * r21) / 2,
        y: (y1 + y2 + y21 / l * r21) / 2,
        r: (l + r1 + r2) / 2
      };
    }
    function encloseBasis3(a, b, c) {
      var x1 = a.x, y1 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x3 = c.x, y3 = c.y, r3 = c.r, a2 = x1 - x2, a3 = x1 - x3, b2 = y1 - y2, b3 = y1 - y3, c2 = r2 - r1, c3 = r3 - r1, d1 = x1 * x1 + y1 * y1 - r1 * r1, d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2, d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3, ab = a3 * b2 - a2 * b3, xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1, xb = (b3 * c2 - b2 * c3) / ab, ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1, yb = (a2 * c3 - a3 * c2) / ab, A = xb * xb + yb * yb - 1, B = 2 * (r1 + xa * xb + ya * yb), C = xa * xa + ya * ya - r1 * r1, r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
      return {
        x: x1 + xa + xb * r,
        y: y1 + ya + yb * r,
        r
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/pack/siblings.js
var require_siblings = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/pack/siblings.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.packEnclose = packEnclose;
    var _array = _interopRequireDefault(require_array2());
    var _enclose = _interopRequireDefault(require_enclose());
    function place(b, a, c) {
      var dx = b.x - a.x, x, a2, dy = b.y - a.y, y, b2, d2 = dx * dx + dy * dy;
      if (d2) {
        a2 = a.r + c.r, a2 *= a2;
        b2 = b.r + c.r, b2 *= b2;
        if (a2 > b2) {
          x = (d2 + b2 - a2) / (2 * d2);
          y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
          c.x = b.x - x * dx - y * dy;
          c.y = b.y - x * dy + y * dx;
        } else {
          x = (d2 + a2 - b2) / (2 * d2);
          y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
          c.x = a.x + x * dx - y * dy;
          c.y = a.y + x * dy + y * dx;
        }
      } else {
        c.x = a.x + c.r;
        c.y = a.y;
      }
    }
    function intersects(a, b) {
      var dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
      return dr > 0 && dr * dr > dx * dx + dy * dy;
    }
    function score(node) {
      var a = node._, b = node.next._, ab = a.r + b.r, dx = (a.x * b.r + b.x * a.r) / ab, dy = (a.y * b.r + b.y * a.r) / ab;
      return dx * dx + dy * dy;
    }
    function Node(circle) {
      this._ = circle;
      this.next = null;
      this.previous = null;
    }
    function packEnclose(circles) {
      if (!(n = (circles = (0, _array.default)(circles)).length))
        return 0;
      var a, b, c, n, aa, ca, i, j, k, sj, sk;
      a = circles[0], a.x = 0, a.y = 0;
      if (!(n > 1))
        return a.r;
      b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
      if (!(n > 2))
        return a.r + b.r;
      place(b, a, c = circles[2]);
      a = new Node(a), b = new Node(b), c = new Node(c);
      a.next = c.previous = b;
      b.next = a.previous = c;
      c.next = b.previous = a;
      pack:
        for (i = 3; i < n; ++i) {
          place(a._, b._, c = circles[i]), c = new Node(c);
          j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
          do {
            if (sj <= sk) {
              if (intersects(j._, c._)) {
                b = j, a.next = b, b.previous = a, --i;
                continue pack;
              }
              sj += j._.r, j = j.next;
            } else {
              if (intersects(k._, c._)) {
                a = k, a.next = b, b.previous = a, --i;
                continue pack;
              }
              sk += k._.r, k = k.previous;
            }
          } while (j !== k.next);
          c.previous = a, c.next = b, a.next = b.previous = b = c;
          aa = score(a);
          while ((c = c.next) !== b) {
            if ((ca = score(c)) < aa) {
              a = c, aa = ca;
            }
          }
          b = a.next;
        }
      a = [b._], c = b;
      while ((c = c.next) !== b)
        a.push(c._);
      c = (0, _enclose.default)(a);
      for (i = 0; i < n; ++i)
        a = circles[i], a.x -= c.x, a.y -= c.y;
      return c.r;
    }
    function _default(circles) {
      packEnclose(circles);
      return circles;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/accessors.js
var require_accessors = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/accessors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.optional = optional;
    exports.required = required;
    function optional(f) {
      return f == null ? null : required(f);
    }
    function required(f) {
      if (typeof f !== "function")
        throw new Error();
      return f;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/constant.js
var require_constant3 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/constant.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.constantZero = constantZero;
    exports.default = _default;
    function constantZero() {
      return 0;
    }
    function _default(x) {
      return function() {
        return x;
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/pack/index.js
var require_pack = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/pack/index.js"(exports) {
    "use strict";
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _siblings = require_siblings();
    var _accessors = require_accessors();
    var _constant = _interopRequireWildcard(require_constant3());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    function defaultRadius(d) {
      return Math.sqrt(d.value);
    }
    function _default() {
      var radius = null, dx = 1, dy = 1, padding = _constant.constantZero;
      function pack(root) {
        root.x = dx / 2, root.y = dy / 2;
        if (radius) {
          root.eachBefore(radiusLeaf(radius)).eachAfter(packChildren(padding, 0.5)).eachBefore(translateChild(1));
        } else {
          root.eachBefore(radiusLeaf(defaultRadius)).eachAfter(packChildren(_constant.constantZero, 1)).eachAfter(packChildren(padding, root.r / Math.min(dx, dy))).eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
        }
        return root;
      }
      pack.radius = function(x) {
        return arguments.length ? (radius = (0, _accessors.optional)(x), pack) : radius;
      };
      pack.size = function(x) {
        return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
      };
      pack.padding = function(x) {
        return arguments.length ? (padding = typeof x === "function" ? x : (0, _constant.default)(+x), pack) : padding;
      };
      return pack;
    }
    function radiusLeaf(radius) {
      return function(node) {
        if (!node.children) {
          node.r = Math.max(0, +radius(node) || 0);
        }
      };
    }
    function packChildren(padding, k) {
      return function(node) {
        if (children = node.children) {
          var children, i, n = children.length, r = padding(node) * k || 0, e;
          if (r)
            for (i = 0; i < n; ++i)
              children[i].r += r;
          e = (0, _siblings.packEnclose)(children);
          if (r)
            for (i = 0; i < n; ++i)
              children[i].r -= r;
          node.r = e + r;
        }
      };
    }
    function translateChild(k) {
      return function(node) {
        var parent = node.parent;
        node.r *= k;
        if (parent) {
          node.x = parent.x + k * node.x;
          node.y = parent.y + k * node.y;
        }
      };
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/round.js
var require_round2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/round.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(node) {
      node.x0 = Math.round(node.x0);
      node.y0 = Math.round(node.y0);
      node.x1 = Math.round(node.x1);
      node.y1 = Math.round(node.y1);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/dice.js
var require_dice = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/dice.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(parent, x0, y0, x1, y1) {
      var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (x1 - x0) / parent.value;
      while (++i < n) {
        node = nodes[i], node.y0 = y0, node.y1 = y1;
        node.x0 = x0, node.x1 = x0 += node.value * k;
      }
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/partition.js
var require_partition = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/partition.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _round = _interopRequireDefault(require_round2());
    var _dice = _interopRequireDefault(require_dice());
    function _default() {
      var dx = 1, dy = 1, padding = 0, round = false;
      function partition(root) {
        var n = root.height + 1;
        root.x0 = root.y0 = padding;
        root.x1 = dx;
        root.y1 = dy / n;
        root.eachBefore(positionNode(dy, n));
        if (round)
          root.eachBefore(_round.default);
        return root;
      }
      function positionNode(dy2, n) {
        return function(node) {
          if (node.children) {
            (0, _dice.default)(node, node.x0, dy2 * (node.depth + 1) / n, node.x1, dy2 * (node.depth + 2) / n);
          }
          var x0 = node.x0, y0 = node.y0, x1 = node.x1 - padding, y1 = node.y1 - padding;
          if (x1 < x0)
            x0 = x1 = (x0 + x1) / 2;
          if (y1 < y0)
            y0 = y1 = (y0 + y1) / 2;
          node.x0 = x0;
          node.y0 = y0;
          node.x1 = x1;
          node.y1 = y1;
        };
      }
      partition.round = function(x) {
        return arguments.length ? (round = !!x, partition) : round;
      };
      partition.size = function(x) {
        return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
      };
      partition.padding = function(x) {
        return arguments.length ? (padding = +x, partition) : padding;
      };
      return partition;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/stratify.js
var require_stratify = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/stratify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _accessors = require_accessors();
    var _index = require_hierarchy();
    var preroot = {
      depth: -1
    };
    var ambiguous = {};
    function defaultId(d) {
      return d.id;
    }
    function defaultParentId(d) {
      return d.parentId;
    }
    function _default() {
      var id = defaultId, parentId = defaultParentId;
      function stratify(data) {
        var nodes = Array.from(data), n = nodes.length, d, i, root, parent, node, nodeId, nodeKey, nodeByKey = /* @__PURE__ */ new Map();
        for (i = 0; i < n; ++i) {
          d = nodes[i], node = nodes[i] = new _index.Node(d);
          if ((nodeId = id(d, i, data)) != null && (nodeId += "")) {
            nodeKey = node.id = nodeId;
            nodeByKey.set(nodeKey, nodeByKey.has(nodeKey) ? ambiguous : node);
          }
          if ((nodeId = parentId(d, i, data)) != null && (nodeId += "")) {
            node.parent = nodeId;
          }
        }
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          if (nodeId = node.parent) {
            parent = nodeByKey.get(nodeId);
            if (!parent)
              throw new Error("missing: " + nodeId);
            if (parent === ambiguous)
              throw new Error("ambiguous: " + nodeId);
            if (parent.children)
              parent.children.push(node);
            else
              parent.children = [node];
            node.parent = parent;
          } else {
            if (root)
              throw new Error("multiple roots");
            root = node;
          }
        }
        if (!root)
          throw new Error("no root");
        root.parent = preroot;
        root.eachBefore(function(node2) {
          node2.depth = node2.parent.depth + 1;
          --n;
        }).eachBefore(_index.computeHeight);
        root.parent = null;
        if (n > 0)
          throw new Error("cycle");
        return root;
      }
      stratify.id = function(x) {
        return arguments.length ? (id = (0, _accessors.required)(x), stratify) : id;
      };
      stratify.parentId = function(x) {
        return arguments.length ? (parentId = (0, _accessors.required)(x), stratify) : parentId;
      };
      return stratify;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/tree.js
var require_tree = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/tree.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _index = require_hierarchy();
    function defaultSeparation(a, b) {
      return a.parent === b.parent ? 1 : 2;
    }
    function nextLeft(v) {
      var children = v.children;
      return children ? children[0] : v.t;
    }
    function nextRight(v) {
      var children = v.children;
      return children ? children[children.length - 1] : v.t;
    }
    function moveSubtree(wm, wp, shift) {
      var change = shift / (wp.i - wm.i);
      wp.c -= change;
      wp.s += shift;
      wm.c += change;
      wp.z += shift;
      wp.m += shift;
    }
    function executeShifts(v) {
      var shift = 0, change = 0, children = v.children, i = children.length, w;
      while (--i >= 0) {
        w = children[i];
        w.z += shift;
        w.m += shift;
        shift += w.s + (change += w.c);
      }
    }
    function nextAncestor(vim, v, ancestor) {
      return vim.a.parent === v.parent ? vim.a : ancestor;
    }
    function TreeNode(node, i) {
      this._ = node;
      this.parent = null;
      this.children = null;
      this.A = null;
      this.a = this;
      this.z = 0;
      this.m = 0;
      this.c = 0;
      this.s = 0;
      this.t = null;
      this.i = i;
    }
    TreeNode.prototype = Object.create(_index.Node.prototype);
    function treeRoot(root) {
      var tree = new TreeNode(root, 0), node, nodes = [tree], child, children, i, n;
      while (node = nodes.pop()) {
        if (children = node._.children) {
          node.children = new Array(n = children.length);
          for (i = n - 1; i >= 0; --i) {
            nodes.push(child = node.children[i] = new TreeNode(children[i], i));
            child.parent = node;
          }
        }
      }
      (tree.parent = new TreeNode(null, 0)).children = [tree];
      return tree;
    }
    function _default() {
      var separation = defaultSeparation, dx = 1, dy = 1, nodeSize = null;
      function tree(root) {
        var t = treeRoot(root);
        t.eachAfter(firstWalk), t.parent.m = -t.z;
        t.eachBefore(secondWalk);
        if (nodeSize)
          root.eachBefore(sizeNode);
        else {
          var left = root, right = root, bottom = root;
          root.eachBefore(function(node) {
            if (node.x < left.x)
              left = node;
            if (node.x > right.x)
              right = node;
            if (node.depth > bottom.depth)
              bottom = node;
          });
          var s = left === right ? 1 : separation(left, right) / 2, tx = s - left.x, kx = dx / (right.x + s + tx), ky = dy / (bottom.depth || 1);
          root.eachBefore(function(node) {
            node.x = (node.x + tx) * kx;
            node.y = node.depth * ky;
          });
        }
        return root;
      }
      function firstWalk(v) {
        var children = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
        if (children) {
          executeShifts(v);
          var midpoint = (children[0].z + children[children.length - 1].z) / 2;
          if (w) {
            v.z = w.z + separation(v._, w._);
            v.m = v.z - midpoint;
          } else {
            v.z = midpoint;
          }
        } else if (w) {
          v.z = w.z + separation(v._, w._);
        }
        v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
      }
      function secondWalk(v) {
        v._.x = v.z + v.parent.m;
        v.m += v.parent.m;
      }
      function apportion(v, w, ancestor) {
        if (w) {
          var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
          while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
            vom = nextLeft(vom);
            vop = nextRight(vop);
            vop.a = v;
            shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
            if (shift > 0) {
              moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
              sip += shift;
              sop += shift;
            }
            sim += vim.m;
            sip += vip.m;
            som += vom.m;
            sop += vop.m;
          }
          if (vim && !nextRight(vop)) {
            vop.t = vim;
            vop.m += sim - sop;
          }
          if (vip && !nextLeft(vom)) {
            vom.t = vip;
            vom.m += sip - som;
            ancestor = v;
          }
        }
        return ancestor;
      }
      function sizeNode(node) {
        node.x *= dx;
        node.y = node.depth * dy;
      }
      tree.separation = function(x) {
        return arguments.length ? (separation = x, tree) : separation;
      };
      tree.size = function(x) {
        return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : nodeSize ? null : [dx, dy];
      };
      tree.nodeSize = function(x) {
        return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : nodeSize ? [dx, dy] : null;
      };
      return tree;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/slice.js
var require_slice = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/slice.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(parent, x0, y0, x1, y1) {
      var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (y1 - y0) / parent.value;
      while (++i < n) {
        node = nodes[i], node.x0 = x0, node.x1 = x1;
        node.y0 = y0, node.y1 = y0 += node.value * k;
      }
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/squarify.js
var require_squarify = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/squarify.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.phi = exports.default = void 0;
    exports.squarifyRatio = squarifyRatio;
    var _dice = _interopRequireDefault(require_dice());
    var _slice = _interopRequireDefault(require_slice());
    var phi = exports.phi = (1 + Math.sqrt(5)) / 2;
    function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
      var rows = [], nodes = parent.children, row, nodeValue, i0 = 0, i1 = 0, n = nodes.length, dx, dy, value = parent.value, sumValue, minValue, maxValue, newRatio, minRatio, alpha, beta;
      while (i0 < n) {
        dx = x1 - x0, dy = y1 - y0;
        do
          sumValue = nodes[i1++].value;
        while (!sumValue && i1 < n);
        minValue = maxValue = sumValue;
        alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
        beta = sumValue * sumValue * alpha;
        minRatio = Math.max(maxValue / beta, beta / minValue);
        for (; i1 < n; ++i1) {
          sumValue += nodeValue = nodes[i1].value;
          if (nodeValue < minValue)
            minValue = nodeValue;
          if (nodeValue > maxValue)
            maxValue = nodeValue;
          beta = sumValue * sumValue * alpha;
          newRatio = Math.max(maxValue / beta, beta / minValue);
          if (newRatio > minRatio) {
            sumValue -= nodeValue;
            break;
          }
          minRatio = newRatio;
        }
        rows.push(row = {
          value: sumValue,
          dice: dx < dy,
          children: nodes.slice(i0, i1)
        });
        if (row.dice)
          (0, _dice.default)(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
        else
          (0, _slice.default)(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
        value -= sumValue, i0 = i1;
      }
      return rows;
    }
    var _default = exports.default = function custom(ratio) {
      function squarify(parent, x0, y0, x1, y1) {
        squarifyRatio(ratio, parent, x0, y0, x1, y1);
      }
      squarify.ratio = function(x) {
        return custom((x = +x) > 1 ? x : 1);
      };
      return squarify;
    }(phi);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/index.js
var require_treemap = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _round = _interopRequireDefault(require_round2());
    var _squarify = _interopRequireDefault(require_squarify());
    var _accessors = require_accessors();
    var _constant = _interopRequireWildcard(require_constant3());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    function _default() {
      var tile = _squarify.default, round = false, dx = 1, dy = 1, paddingStack = [0], paddingInner = _constant.constantZero, paddingTop = _constant.constantZero, paddingRight = _constant.constantZero, paddingBottom = _constant.constantZero, paddingLeft = _constant.constantZero;
      function treemap(root) {
        root.x0 = root.y0 = 0;
        root.x1 = dx;
        root.y1 = dy;
        root.eachBefore(positionNode);
        paddingStack = [0];
        if (round)
          root.eachBefore(_round.default);
        return root;
      }
      function positionNode(node) {
        var p = paddingStack[node.depth], x0 = node.x0 + p, y0 = node.y0 + p, x1 = node.x1 - p, y1 = node.y1 - p;
        if (x1 < x0)
          x0 = x1 = (x0 + x1) / 2;
        if (y1 < y0)
          y0 = y1 = (y0 + y1) / 2;
        node.x0 = x0;
        node.y0 = y0;
        node.x1 = x1;
        node.y1 = y1;
        if (node.children) {
          p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
          x0 += paddingLeft(node) - p;
          y0 += paddingTop(node) - p;
          x1 -= paddingRight(node) - p;
          y1 -= paddingBottom(node) - p;
          if (x1 < x0)
            x0 = x1 = (x0 + x1) / 2;
          if (y1 < y0)
            y0 = y1 = (y0 + y1) / 2;
          tile(node, x0, y0, x1, y1);
        }
      }
      treemap.round = function(x) {
        return arguments.length ? (round = !!x, treemap) : round;
      };
      treemap.size = function(x) {
        return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
      };
      treemap.tile = function(x) {
        return arguments.length ? (tile = (0, _accessors.required)(x), treemap) : tile;
      };
      treemap.padding = function(x) {
        return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
      };
      treemap.paddingInner = function(x) {
        return arguments.length ? (paddingInner = typeof x === "function" ? x : (0, _constant.default)(+x), treemap) : paddingInner;
      };
      treemap.paddingOuter = function(x) {
        return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
      };
      treemap.paddingTop = function(x) {
        return arguments.length ? (paddingTop = typeof x === "function" ? x : (0, _constant.default)(+x), treemap) : paddingTop;
      };
      treemap.paddingRight = function(x) {
        return arguments.length ? (paddingRight = typeof x === "function" ? x : (0, _constant.default)(+x), treemap) : paddingRight;
      };
      treemap.paddingBottom = function(x) {
        return arguments.length ? (paddingBottom = typeof x === "function" ? x : (0, _constant.default)(+x), treemap) : paddingBottom;
      };
      treemap.paddingLeft = function(x) {
        return arguments.length ? (paddingLeft = typeof x === "function" ? x : (0, _constant.default)(+x), treemap) : paddingLeft;
      };
      return treemap;
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/binary.js
var require_binary = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/binary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    function _default(parent, x0, y0, x1, y1) {
      var nodes = parent.children, i, n = nodes.length, sum, sums = new Array(n + 1);
      for (sums[0] = sum = i = 0; i < n; ++i) {
        sums[i + 1] = sum += nodes[i].value;
      }
      partition(0, n, parent.value, x0, y0, x1, y1);
      function partition(i2, j, value, x02, y02, x12, y12) {
        if (i2 >= j - 1) {
          var node = nodes[i2];
          node.x0 = x02, node.y0 = y02;
          node.x1 = x12, node.y1 = y12;
          return;
        }
        var valueOffset = sums[i2], valueTarget = value / 2 + valueOffset, k = i2 + 1, hi = j - 1;
        while (k < hi) {
          var mid = k + hi >>> 1;
          if (sums[mid] < valueTarget)
            k = mid + 1;
          else
            hi = mid;
        }
        if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i2 + 1 < k)
          --k;
        var valueLeft = sums[k] - valueOffset, valueRight = value - valueLeft;
        if (x12 - x02 > y12 - y02) {
          var xk = value ? (x02 * valueRight + x12 * valueLeft) / value : x12;
          partition(i2, k, valueLeft, x02, y02, xk, y12);
          partition(k, j, valueRight, xk, y02, x12, y12);
        } else {
          var yk = value ? (y02 * valueRight + y12 * valueLeft) / value : y12;
          partition(i2, k, valueLeft, x02, y02, x12, yk);
          partition(k, j, valueRight, x02, yk, x12, y12);
        }
      }
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/sliceDice.js
var require_sliceDice = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/sliceDice.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    var _dice = _interopRequireDefault(require_dice());
    var _slice = _interopRequireDefault(require_slice());
    function _default(parent, x0, y0, x1, y1) {
      (parent.depth & 1 ? _slice.default : _dice.default)(parent, x0, y0, x1, y1);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/resquarify.js
var require_resquarify = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/treemap/resquarify.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _dice = _interopRequireDefault(require_dice());
    var _slice = _interopRequireDefault(require_slice());
    var _squarify = require_squarify();
    var _default = exports.default = function custom(ratio) {
      function resquarify(parent, x0, y0, x1, y1) {
        if ((rows = parent._squarify) && rows.ratio === ratio) {
          var rows, row, nodes, i, j = -1, n, m = rows.length, value = parent.value;
          while (++j < m) {
            row = rows[j], nodes = row.children;
            for (i = row.value = 0, n = nodes.length; i < n; ++i)
              row.value += nodes[i].value;
            if (row.dice)
              (0, _dice.default)(row, x0, y0, x1, value ? y0 += (y1 - y0) * row.value / value : y1);
            else
              (0, _slice.default)(row, x0, y0, value ? x0 += (x1 - x0) * row.value / value : x1, y1);
            value -= row.value;
          }
        } else {
          parent._squarify = rows = (0, _squarify.squarifyRatio)(ratio, parent, x0, y0, x1, y1);
          rows.ratio = ratio;
        }
      }
      resquarify.ratio = function(x) {
        return custom((x = +x) > 1 ? x : 1);
      };
      return resquarify;
    }(_squarify.phi);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/index.js
var require_src5 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/deps/d3-hierarchy/src/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "cluster", {
      enumerable: true,
      get: function get() {
        return _cluster.default;
      }
    });
    Object.defineProperty(exports, "hierarchy", {
      enumerable: true,
      get: function get() {
        return _index.default;
      }
    });
    Object.defineProperty(exports, "pack", {
      enumerable: true,
      get: function get() {
        return _index2.default;
      }
    });
    Object.defineProperty(exports, "packEnclose", {
      enumerable: true,
      get: function get() {
        return _enclose.default;
      }
    });
    Object.defineProperty(exports, "packSiblings", {
      enumerable: true,
      get: function get() {
        return _siblings.default;
      }
    });
    Object.defineProperty(exports, "partition", {
      enumerable: true,
      get: function get() {
        return _partition.default;
      }
    });
    Object.defineProperty(exports, "stratify", {
      enumerable: true,
      get: function get() {
        return _stratify.default;
      }
    });
    Object.defineProperty(exports, "tree", {
      enumerable: true,
      get: function get() {
        return _tree.default;
      }
    });
    Object.defineProperty(exports, "treemap", {
      enumerable: true,
      get: function get() {
        return _index3.default;
      }
    });
    Object.defineProperty(exports, "treemapBinary", {
      enumerable: true,
      get: function get() {
        return _binary.default;
      }
    });
    Object.defineProperty(exports, "treemapDice", {
      enumerable: true,
      get: function get() {
        return _dice.default;
      }
    });
    Object.defineProperty(exports, "treemapResquarify", {
      enumerable: true,
      get: function get() {
        return _resquarify.default;
      }
    });
    Object.defineProperty(exports, "treemapSlice", {
      enumerable: true,
      get: function get() {
        return _slice.default;
      }
    });
    Object.defineProperty(exports, "treemapSliceDice", {
      enumerable: true,
      get: function get() {
        return _sliceDice.default;
      }
    });
    Object.defineProperty(exports, "treemapSquarify", {
      enumerable: true,
      get: function get() {
        return _squarify.default;
      }
    });
    var _cluster = _interopRequireDefault(require_cluster());
    var _index = _interopRequireDefault(require_hierarchy());
    var _index2 = _interopRequireDefault(require_pack());
    var _siblings = _interopRequireDefault(require_siblings());
    var _enclose = _interopRequireDefault(require_enclose());
    var _partition = _interopRequireDefault(require_partition());
    var _stratify = _interopRequireDefault(require_stratify());
    var _tree = _interopRequireDefault(require_tree());
    var _index3 = _interopRequireDefault(require_treemap());
    var _binary = _interopRequireDefault(require_binary());
    var _dice = _interopRequireDefault(require_dice());
    var _slice = _interopRequireDefault(require_slice());
    var _sliceDice = _interopRequireDefault(require_sliceDice());
    var _squarify = _interopRequireDefault(require_squarify());
    var _resquarify = _interopRequireDefault(require_resquarify());
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/treemap/withTreemap.js
var require_withTreemap = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/treemap/withTreemap.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _attr = require_attr();
    var _coord = _interopRequireDefault(require_coord2());
    var _src = require_src5();
    var _theme = _interopRequireDefault(require_theme());
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var withTreemap = function withTreemap2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Treemap, _super);
          function Treemap(props, context) {
            var _this = _super.call(this, props, context) || this;
            var color = props.color, data = props.data, theme = props.theme, _a = props.selection, selection = _a === void 0 ? {} : _a;
            var px2hd = context.px2hd;
            context.theme = (0, _util.deepMix)(px2hd(_theme.default), theme);
            _this.coord = new _coord.default();
            _this.color = new _attr.Category((0, _tslib.__assign)((0, _tslib.__assign)({
              range: context.theme.colors
            }, color), {
              data
            }));
            var _b = selection.defaultSelected, defaultSelected = _b === void 0 ? null : _b;
            _this.state.selected = defaultSelected;
            _this.coordRef = (0, _fEngine.createRef)();
            _this.records = [];
            return _this;
          }
          Treemap.prototype.isSelected = function(record) {
            var state = this.state;
            var selected = state.selected;
            if (!selected || !selected.length) {
              return false;
            }
            for (var i = 0, len = selected.length; i < len; i++) {
              var item = selected[i];
              if ((0, _fEngine.isEqual)(record, item)) {
                return true;
              }
            }
            return false;
          };
          Treemap.prototype.getSelectionStyle = function(record) {
            var _a = this, state = _a.state, props = _a.props;
            var selected = state.selected;
            if (!selected || !selected.length) {
              return null;
            }
            var selection = props.selection;
            var selectedStyle = selection.selectedStyle, unSelectedStyle = selection.unSelectedStyle;
            var isSelected = this.isSelected(record);
            if (isSelected) {
              return (0, _util.isFunction)(selectedStyle) ? selectedStyle(record) : selectedStyle;
            }
            return (0, _util.isFunction)(unSelectedStyle) ? unSelectedStyle(record) : unSelectedStyle;
          };
          Treemap.prototype.willMount = function() {
            var _a = this, props = _a.props, coord = _a.coord, layout = _a.layout;
            var coordOption = props.coord;
            coord.updateLayout(layout);
            coord.create(coordOption);
          };
          Treemap.prototype.willReceiveProps = function(nextProps) {
            var nextSelection = nextProps.selection;
            var lastSelection = this.props.selection;
            if (!nextSelection || !lastSelection) {
              return;
            }
            var nextDefaultSelected = nextSelection.defaultSelected;
            var lastDefaultSelected = lastSelection.defaultSelected;
            if (!(0, _fEngine.isEqual)(nextDefaultSelected, lastDefaultSelected)) {
              this.state.selected = nextDefaultSelected;
            }
          };
          Treemap.prototype.treemapLayout = function() {
            var _this = this;
            var _a = this, props = _a.props, coord = _a.coord, colorAttr = _a.color;
            var _b = coord.getCoord(), width = _b.width, height = _b.height;
            var data = props.data, value = props.value, _c = props.space, space = _c === void 0 ? 0 : _c;
            var root = (0, _src.hierarchy)({
              children: data
            }).sum(function(d) {
              return d[value];
            }).sort(function(a, b) {
              return b[value] - a[value];
            });
            var treemapLayout = (0, _src.treemap)().tile(_src.treemapBinary).round(false).size([width, height]).paddingInner(space);
            var nodes = treemapLayout(root);
            return nodes.children.map(function(item) {
              var data2 = item.data, x0 = item.x0, y0 = item.y0, x1 = item.x1, y1 = item.y1;
              var color = colorAttr.mapping(data2[colorAttr.field]);
              var rect = {
                xMin: x0,
                xMax: x1,
                yMin: y0,
                yMax: y1
              };
              var style = _this.getSelectionStyle(data2);
              return (0, _tslib.__assign)((0, _tslib.__assign)({
                key: data2.key,
                origin: data2,
                color
              }, rect), {
                style
              });
            });
          };
          Treemap.prototype.select = function(ev, trigger) {
            var _this = this;
            var points = ev.points, x = ev.canvasX, y = ev.canvasY;
            var _a = this.props.selection, selection = _a === void 0 ? {} : _a;
            var triggerOn = selection.triggerOn, _b = selection.type, type = _b === void 0 ? "single" : _b, _c = selection.cancelable, cancelable = _c === void 0 ? true : _c;
            if (!triggerOn || trigger !== triggerOn)
              return;
            var point = triggerOn === "click" ? {
              x,
              y
            } : points[0];
            var selected = this.state.selected;
            var origin = [];
            (0, _util.each)(this.records, function(record) {
              if (point.x >= record.xMin && point.x <= record.xMax && point.y >= record.yMin && point.y <= record.yMax) {
                origin.push(record === null || record === void 0 ? void 0 : record.origin);
              }
            });
            if (!origin) {
              this.setState({
                selected: null
              });
              return;
            }
            if (!selected) {
              this.setState({
                selected: origin
              });
              return;
            }
            var newSelected = [];
            origin.forEach(function(record) {
              if (!_this.isSelected(record)) {
                newSelected.push(record);
              }
            });
            if (type === "single") {
              this.setState({
                selected: cancelable ? newSelected : origin
              });
              return;
            }
            this.setState({
              selected: (0, _tslib.__spreadArray)((0, _tslib.__spreadArray)([], newSelected, true), selected, true)
            });
          };
          Treemap.prototype.render = function() {
            var _this = this;
            var nodes = this.treemapLayout();
            this.records = nodes;
            var _a = this, props = _a.props, coord = _a.coord;
            var _b = coord.getCoord(), width = _b.width, height = _b.height;
            return (0, _fEngine.jsx)("group", {
              style: {
                width,
                height,
                fill: "transparent"
              },
              onClick: function onClick(ev) {
                return _this.select(ev, "click");
              },
              onPress: function onPress(ev) {
                return _this.select(ev, "press");
              }
            }, (0, _fEngine.jsx)(View, (0, _tslib.__assign)({
              nodes
            }, props, {
              coord: coord.getCoord()
            })));
          };
          return Treemap;
        }(_fEngine.Component)
      );
    };
    var _default = exports.default = withTreemap;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/treemap/treemapView.js
var require_treemapView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/treemap/treemapView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props) {
      var nodes = props.nodes, coord = props.coord, onClick = props.onClick, _a = props.label, label = _a === void 0 ? false : _a;
      if (coord.isPolar) {
        var center = coord.center;
        var x_1 = center.x, y_1 = center.y;
        return (0, _fEngine.jsx)("group", null, nodes.map(function(node) {
          var xMin = node.xMin, xMax = node.xMax, yMin = node.yMin, yMax = node.yMax, color = node.color, style = node.style;
          return (0, _fEngine.jsx)("sector", {
            style: (0, _tslib.__assign)({
              cx: x_1,
              cy: y_1,
              lineWidth: "1px",
              stroke: "#fff",
              startAngle: xMin,
              endAngle: xMax,
              r0: yMin,
              r: yMax,
              fill: color
            }, style),
            onClick: onClick ? function() {
              return onClick(node);
            } : null
          });
        }));
      }
      return (0, _fEngine.jsx)("group", null, nodes.map(function(node) {
        var key = node.key, xMin = node.xMin, xMax = node.xMax, yMin = node.yMin, yMax = node.yMax, color = node.color, style = node.style;
        return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("rect", {
          key,
          style: (0, _tslib.__assign)({
            x: xMin,
            y: yMin,
            width: xMax - xMin,
            height: yMax - yMin,
            fill: color,
            lineWidth: "4px",
            stroke: "#fff",
            radius: "8px"
          }, style),
          animation: {
            appear: {
              easing: "linear",
              duration: 450,
              property: ["fillOpacity", "strokeOpacity"],
              start: {
                fillOpacity: 0,
                strokeOpacity: 0
              }
            },
            update: {
              easing: "linear",
              duration: 450,
              property: ["x", "y", "width", "height", "radius", "lineWidth", "fillOpacity", "strokeOpacity"]
            }
          },
          onClick: onClick ? function() {
            return onClick(node);
          } : null
        }), label && (0, _fEngine.jsx)("text", {
          style: (0, _tslib.__assign)({
            x: (xMin + xMax) / 2,
            y: (yMin + yMax) / 2,
            text: node.origin.name,
            fill: "white",
            textAlign: "center",
            textBaseline: "middle"
          }, label)
        }));
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/treemap/index.js
var require_treemap2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/treemap/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "TreemapView", {
      enumerable: true,
      get: function get() {
        return _treemapView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withTreemap", {
      enumerable: true,
      get: function get() {
        return _withTreemap.default;
      }
    });
    var _withTreemap = _interopRequireDefault(require_withTreemap());
    var _treemapView = _interopRequireDefault(require_treemapView());
    var _default = exports.default = (0, _withTreemap.default)(_treemapView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/withSunburst.js
var require_withSunburst = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/withSunburst.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _src = require_src5();
    var _attr = require_attr();
    var _coord = _interopRequireDefault(require_coord2());
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _theme = _interopRequireDefault(require_theme());
    function rootParent(data) {
      var d = data;
      while (d.depth > 1) {
        d = d.parent;
      }
      return d;
    }
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Sunburst, _super);
          function Sunburst(props, context) {
            var _this = _super.call(this, props, context) || this;
            var color = props.color, data = props.data;
            _this.coord = new _coord.default();
            _this.color = new _attr.Category((0, _tslib.__assign)((0, _tslib.__assign)({
              range: _theme.default.colors
            }, color), {
              data
            }));
            return _this;
          }
          Sunburst.prototype.willMount = function() {
            var _a = this, props = _a.props, coord = _a.coord, layout = _a.layout;
            var coordOption = props.coord;
            coord.updateLayout(layout);
            coord.create(coordOption);
          };
          Sunburst.prototype.didMount = function() {
          };
          Sunburst.prototype._mapping = function(children) {
            var _a = this, colorAttr = _a.color, coord = _a.coord;
            for (var i = 0, len = children.length; i < len; i++) {
              var node = children[i];
              var root = rootParent(node);
              var color = colorAttr.mapping(root.data[colorAttr.field]);
              node.color = color;
              var x0 = node.x0, x1 = node.x1, y0 = node.y0, y1 = node.y1;
              var rect = coord.getCoord().convertRect({
                x: [x0, x1],
                y: [y0, y1]
              });
              (0, _util.mix)(node, rect);
              if (node.children && node.children.length) {
                this._mapping(node.children);
              }
            }
          };
          Sunburst.prototype.sunburst = function() {
            var props = this.props;
            var data = props.data, value = props.value, _a = props.sort, sort = _a === void 0 ? true : _a;
            var root = (0, _src.hierarchy)({
              children: data
            }).sum(function(d) {
              return d[value];
            });
            if (sort === true || (0, _util.isFunction)(sort)) {
              var sortFn = (0, _util.isFunction)(sort) ? sort : function(a, b) {
                return b[value] - a[value];
              };
              root.sort(sortFn);
            }
            var nodes = (0, _src.partition)()(root);
            var children = nodes.children;
            this._mapping(children);
            return nodes;
          };
          Sunburst.prototype.render = function() {
            var node = this.sunburst();
            var _a = this, coord = _a.coord, props = _a.props;
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, props, {
              coord: coord.getCoord(),
              node,
              triggerRef: this.triggerRef
            }));
          };
          return Sunburst;
        }(_fEngine.Component)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/sunburstView.js
var require_sunburstView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/sunburstView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props) {
      var coord = props.coord, node = props.node, onClick = props.onClick;
      var children = node.children;
      var _a = coord.center, x = _a.x, y = _a.y;
      var _renderNodes = function renderNodes(nodes) {
        return (0, _fEngine.jsx)("group", null, nodes.map(function(node2) {
          var xMin = node2.xMin, xMax = node2.xMax, yMin = node2.yMin, yMax = node2.yMax, color = node2.color, children2 = node2.children;
          return (0, _fEngine.jsx)("group", {
            onClick
          }, (0, _fEngine.jsx)("sector", {
            attrs: {
              cx: x,
              cy: y,
              lineWidth: "1px",
              stroke: "#fff",
              startAngle: "".concat(xMin, " rad"),
              endAngle: "".concat(xMax, " rad"),
              r0: yMin,
              r: yMax,
              fill: color
            }
          }), children2 && children2.length ? _renderNodes(children2) : null);
        }));
      };
      return _renderNodes(children);
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/icicleView.js
var require_icicleView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/icicleView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props) {
      var node = props.node, onClick = props.onClick;
      var children = node.children;
      var _renderNodes = function renderNodes(nodes) {
        return (0, _fEngine.jsx)("group", null, nodes.map(function(node2) {
          var xMin = node2.xMin, xMax = node2.xMax, yMin = node2.yMin, yMax = node2.yMax, color = node2.color, children2 = node2.children;
          return (0, _fEngine.jsx)("group", {
            onClick
          }, (0, _fEngine.jsx)("rect", {
            attrs: {
              x: xMin,
              y: yMin,
              width: xMax - xMin,
              height: yMax - yMin,
              lineWidth: "1px",
              stroke: "#fff",
              fill: color
            }
          }), children2 && children2.length ? _renderNodes(children2) : null);
        }));
      };
      return _renderNodes(children);
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/view.js
var require_view2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/view.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _sunburstView = _interopRequireDefault(require_sunburstView());
    var _icicleView = _interopRequireDefault(require_icicleView());
    var _default = exports.default = function _default2(props) {
      var coord = props.coord;
      if (coord.type === "polar") {
        return (0, _fEngine.jsx)(_sunburstView.default, (0, _tslib.__assign)({}, props));
      }
      return (0, _fEngine.jsx)(_icicleView.default, (0, _tslib.__assign)({}, props));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/index.js
var require_sunburst = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/sunburst/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "IcicleView", {
      enumerable: true,
      get: function get() {
        return _icicleView.default;
      }
    });
    Object.defineProperty(exports, "SunburstView", {
      enumerable: true,
      get: function get() {
        return _sunburstView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withSunburst", {
      enumerable: true,
      get: function get() {
        return _withSunburst.default;
      }
    });
    var _withSunburst = _interopRequireDefault(require_withSunburst());
    var _view = _interopRequireDefault(require_view2());
    var _sunburstView = _interopRequireDefault(require_sunburstView());
    var _icicleView = _interopRequireDefault(require_icicleView());
    var _default = exports.default = (0, _withSunburst.default)(_view.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pieLabel/withPieLabel.js
var require_withPieLabel = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pieLabel/withPieLabel.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var DEFAULT_CONFIG = {
      anchorOffset: "10px",
      inflectionOffset: "30px",
      sidePadding: "15px",
      height: "64px",
      adjustOffset: "30",
      triggerOn: "click",
      // activeShape: false, // 当有图形被选中的时候，是否激活图形
      // activeStyle: {
      //   offset: '1px',
      //   appendRadius: '8px',
      //   fillOpacity: 0.5,
      // },
      label1OffsetY: "-4px",
      label2OffsetY: "4px"
    };
    function getEndPoint(center, angle, r) {
      return {
        x: center.x + r * Math.cos(angle),
        y: center.y + r * Math.sin(angle)
      };
    }
    function getMiddleAngle(startAngle, endAngle) {
      if (endAngle < startAngle) {
        endAngle += Math.PI * 2;
      }
      return (endAngle + startAngle) / 2;
    }
    function move(from, to, count, center) {
      var x = center.x;
      var sort = from.sort(function(a, b) {
        var aDistance = Math.abs(a.x - x);
        var bDistance = Math.abs(b.x - x);
        return bDistance - aDistance;
      });
      return [sort.slice(0, sort.length - count), sort.slice(sort.length - count).concat(to)];
    }
    function isFirstQuadrant(angle) {
      return angle >= -Math.PI / 2 && angle < 0;
    }
    function isSecondQuadrant(angle) {
      return angle >= 0 && angle < Math.PI / 2;
    }
    function isThirdQuadrant(angle) {
      return angle >= Math.PI / 2 && angle < Math.PI;
    }
    function isFourthQuadrant(angle) {
      return angle >= Math.PI && angle < Math.PI * 3 / 2;
    }
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(PieLabel, _super);
          function PieLabel(props) {
            return _super.call(this, props) || this;
          }
          PieLabel.prototype.willMount = function() {
          };
          PieLabel.prototype.didMount = function() {
          };
          PieLabel.prototype.getLabels = function(props) {
            var chart = props.chart, coord = props.coord, anchorOffset = props.anchorOffset, inflectionOffset = props.inflectionOffset, label1 = props.label1, label2 = props.label2, itemHeight = props.height, sidePadding = props.sidePadding;
            var center = coord.center, radius = coord.radius, coordWidth = coord.width, coordHeight = coord.height, coordLeft = coord.left, coordRight = coord.right, coordTop = coord.top;
            var maxCountForOneSide = Math.floor(coordHeight / itemHeight);
            var maxCount = maxCountForOneSide * 2;
            var geometry = chart.getGeometrys()[0];
            var records = geometry.flatRecords().sort(function(a, b) {
              var angle1 = a.xMax - a.xMin;
              var angle2 = b.xMax - b.xMin;
              return angle2 - angle1;
            }).slice(0, maxCount);
            var halves = [
              [],
              []
              // right
            ];
            records.forEach(function(record) {
              var xMin = record.xMin, xMax = record.xMax, color = record.color, origin = record.origin;
              var anchorAngle = getMiddleAngle(xMin, xMax);
              var anchorPoint = getEndPoint(center, anchorAngle, radius + anchorOffset);
              var inflectionPoint = getEndPoint(center, anchorAngle, radius + inflectionOffset);
              var side = anchorPoint.x < center.x ? "left" : "right";
              var label = {
                origin,
                angle: anchorAngle,
                anchor: anchorPoint,
                inflection: inflectionPoint,
                side,
                x: inflectionPoint.x,
                y: inflectionPoint.y,
                r: radius + inflectionOffset,
                color,
                label1: (0, _util.isFunction)(label1) ? label1(origin, record) : label1,
                label2: (0, _util.isFunction)(label2) ? label2(origin, record) : label2
              };
              if (side === "left") {
                halves[0].push(label);
              } else {
                halves[1].push(label);
              }
            });
            if (halves[0].length > maxCountForOneSide) {
              halves = move(halves[0], halves[1], halves[0].length - maxCountForOneSide, center);
            } else if (halves[1].length > maxCountForOneSide) {
              var _a = move(halves[1], halves[0], halves[1].length - maxCountForOneSide, center), right = _a[0], left = _a[1];
              halves = [left, right];
            }
            var labelWidth = coordWidth / 2 - radius - anchorOffset - inflectionOffset - 2 * sidePadding;
            var labels = [];
            halves.forEach(function(half, index) {
              var showSide = index === 0 ? "left" : "right";
              half.sort(function(a, b) {
                var aAngle = a.angle;
                var bAngle = b.angle;
                if (showSide === "left") {
                  aAngle = isFirstQuadrant(aAngle) ? aAngle + Math.PI * 2 : aAngle;
                  bAngle = isFirstQuadrant(bAngle) ? bAngle + Math.PI * 2 : bAngle;
                  return bAngle - aAngle;
                } else {
                  aAngle = isFourthQuadrant(aAngle) ? aAngle - Math.PI * 2 : aAngle;
                  bAngle = isFourthQuadrant(bAngle) ? bAngle - Math.PI * 2 : bAngle;
                  return aAngle - bAngle;
                }
              });
              var pointsY = half.map(function(label) {
                return label.y;
              });
              var maxY = Math.max.apply(null, pointsY);
              var minY = Math.min.apply(null, pointsY);
              var labelCount = half.length;
              var labelHeight = coordHeight / labelCount;
              var halfLabelHeight = labelHeight / 2;
              var lineInterval = 2;
              if (showSide === "left") {
                half.forEach(function(label, index2) {
                  var anchor = label.anchor, inflection = label.inflection, angle = label.angle, x = label.x, y = label.y;
                  var points = [anchor, inflection];
                  var endX = coordLeft + sidePadding;
                  var endY = coordTop + halfLabelHeight + labelHeight * index2;
                  var labelStart = {
                    x: endX + labelWidth + lineInterval * index2,
                    y: endY
                  };
                  var labelEnd = {
                    x: endX,
                    y: endY
                  };
                  if (isFirstQuadrant(angle)) {
                    var pointY = minY - lineInterval * (labelCount - index2);
                    points.push({
                      x,
                      y: pointY
                    });
                    points.push({
                      x: labelStart.x,
                      y: pointY
                    });
                  } else if (isThirdQuadrant(angle) || isFourthQuadrant(angle)) {
                    points.push({
                      x: labelStart.x,
                      y
                    });
                  } else if (isSecondQuadrant(angle)) {
                    var pointY = maxY + lineInterval * index2;
                    points.push({
                      x,
                      y: pointY
                    });
                    points.push({
                      x: labelStart.x,
                      y: pointY
                    });
                  }
                  points.push(labelStart);
                  points.push(labelEnd);
                  label.points = points;
                  label.side = showSide;
                  labels.push(label);
                });
              } else {
                half.forEach(function(label, index2) {
                  var anchor = label.anchor, inflection = label.inflection, angle = label.angle, x = label.x, y = label.y;
                  var points = [anchor, inflection];
                  var endX = coordRight - sidePadding;
                  var endY = coordTop + halfLabelHeight + labelHeight * index2;
                  var labelStart = {
                    x: endX - labelWidth - lineInterval * index2,
                    y: endY
                  };
                  var labelEnd = {
                    x: endX,
                    y: endY
                  };
                  if (isFourthQuadrant(angle)) {
                    var pointY = minY - lineInterval * (labelCount - index2);
                    points.push({
                      x,
                      y: pointY
                    });
                    points.push({
                      x: labelStart.x,
                      y: pointY
                    });
                  } else if (isFirstQuadrant(angle) || isSecondQuadrant(angle)) {
                    points.push({
                      x: labelStart.x,
                      y
                    });
                  } else if (isThirdQuadrant(angle)) {
                    var pointY = maxY + lineInterval * index2;
                    points.push({
                      x,
                      y: pointY
                    });
                    points.push({
                      x: labelStart.x,
                      y: pointY
                    });
                  }
                  points.push(labelStart);
                  points.push(labelEnd);
                  label.points = points;
                  label.side = showSide;
                  labels.push(label);
                });
              }
            });
            return labels;
          };
          PieLabel.prototype.render = function() {
            var context = this.context;
            var props = context.px2hd((0, _util.deepMix)({}, DEFAULT_CONFIG, this.props));
            var labels = this.getLabels(props);
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({
              labels
            }, props));
          };
          return PieLabel;
        }(_fEngine.Component)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pieLabel/pieLabeView.js
var require_pieLabeView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pieLabel/pieLabeView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props) {
      var lineStyle = props.lineStyle, anchorStyle = props.anchorStyle, labels = props.labels, label1OffsetY = props.label1OffsetY, label2OffsetY = props.label2OffsetY, triggerRef = props.triggerRef, onClick = props.onClick;
      return (0, _fEngine.jsx)("group", {
        ref: triggerRef
      }, labels.map(function(label) {
        var origin = label.origin, anchor = label.anchor, side = label.side, color = label.color, label1 = label.label1, label2 = label.label2, points = label.points;
        var end = points[points.length - 1];
        return (0, _fEngine.jsx)("group", {
          onClick: onClick ? function() {
            onClick(label);
          } : null
        }, (0, _fEngine.jsx)("circle", {
          attrs: (0, _tslib.__assign)({
            r: "4px",
            cx: anchor.x,
            cy: anchor.y,
            fill: color
          }, anchorStyle)
        }), (0, _fEngine.jsx)("polyline", {
          attrs: (0, _tslib.__assign)({
            points: points.map(function(d) {
              return [d.x, d.y];
            }),
            lineWidth: "2px",
            stroke: color
          }, lineStyle)
        }), (0, _fEngine.jsx)("text", {
          className: "click",
          attrs: (0, _tslib.__assign)({
            x: end.x,
            y: end.y + label1OffsetY,
            fontSize: "24px",
            lineHeight: "24px",
            fill: color,
            textBaseline: "bottom",
            textAlign: side === "left" ? "left" : "right"
          }, label1),
          data: origin
        }), (0, _fEngine.jsx)("text", {
          className: "click",
          attrs: (0, _tslib.__assign)({
            x: end.x,
            y: end.y + label2OffsetY,
            fontSize: "24px",
            lineHeight: "24px",
            fill: "#808080",
            textBaseline: "top",
            textAlign: side === "left" ? "left" : "right"
          }, label2),
          data: origin
        }));
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pieLabel/index.js
var require_pieLabel = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pieLabel/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "PieLabelView", {
      enumerable: true,
      get: function get() {
        return _pieLabeView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withPieLabel", {
      enumerable: true,
      get: function get() {
        return _withPieLabel.default;
      }
    });
    var _withPieLabel = _interopRequireDefault(require_withPieLabel());
    var _pieLabeView = _interopRequireDefault(require_pieLabeView());
    var _default = exports.default = (0, _withPieLabel.default)(_pieLabeView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/gauge/withGauge.js
var require_withGauge = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/gauge/withGauge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var getPoint = function getPoint2(cener, angle, r) {
      var x = cener.x + Math.cos(angle) * r;
      var y = cener.y + Math.sin(angle) * r;
      return {
        x,
        y
      };
    };
    var getTicks = function getTicks2(start, end, tickCount, center, r, tickOffset, tickLength) {
      var ticks = [];
      var diff = end - start;
      for (var i = 0; i <= tickCount; i++) {
        var tickValue = start + diff * i / tickCount;
        var startPoint = getPoint(center, tickValue, r + tickOffset - tickLength);
        var endPoint = getPoint(center, tickValue, r + tickOffset);
        ticks.push({
          tickValue,
          start: startPoint,
          end: endPoint
        });
      }
      return ticks;
    };
    var withGauge = function withGauge2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Gauge, _super);
          function Gauge() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          Gauge.prototype.render = function() {
            var _a = this, props = _a.props, context = _a.context;
            var startAngle = props.startAngle, endAngle = props.endAngle, tickCount = props.tickCount, center = props.center, r = props.r, tickOffset = props.tickOffset, tickLength = props.tickLength;
            var ticks = getTicks(startAngle, endAngle, tickCount, center, context.px2hd(r), context.px2hd(tickOffset), context.px2hd(tickLength));
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, props, {
              ticks
            }));
          };
          return Gauge;
        }(_fEngine.Component)
      );
    };
    var _default = exports.default = withGauge;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/gauge/gaugeView.js
var require_gaugeView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/gauge/gaugeView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props) {
      var center = props.center, startAngle = props.startAngle, endAngle = props.endAngle, r = props.r, percent = props.percent, ticks = props.ticks;
      var x = center.x, y = center.y;
      var diff = endAngle - startAngle;
      return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("arc", {
        attrs: {
          cx: x,
          cy: y,
          r,
          startAngle: "".concat(startAngle, " rad"),
          endAngle: "".concat(endAngle, " rad"),
          lineWidth: "20px",
          lineCap: "round",
          stroke: "#e7e7e7"
        }
      }), (0, _fEngine.jsx)("arc", {
        attrs: {
          cx: x,
          cy: y,
          r,
          startAngle: "".concat(startAngle, " rad"),
          endAngle: "".concat(startAngle, " rad"),
          lineWidth: "40px",
          lineCap: "round",
          stroke: "#0075ff"
        },
        animation: {
          appear: {
            easing: "linear",
            duration: 500,
            property: ["endAngle"],
            start: {
              endAngle: "".concat(startAngle, " rad")
            },
            end: {
              endAngle: "".concat(startAngle + diff * percent, " rad")
            }
          }
        }
      }), ticks.map(function(tick) {
        var start = tick.start, end = tick.end;
        return (0, _fEngine.jsx)("line", {
          attrs: {
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
            lineWidth: "6px",
            lineCap: "round",
            stroke: "#e7e7e7"
          }
        });
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/gauge/index.js
var require_gauge = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/gauge/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "GaugeView", {
      enumerable: true,
      get: function get() {
        return _gaugeView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withGauge", {
      enumerable: true,
      get: function get() {
        return _withGauge.default;
      }
    });
    var _withGauge = _interopRequireDefault(require_withGauge());
    var _gaugeView = _interopRequireDefault(require_gaugeView());
    var _default = exports.default = (0, _withGauge.default)(_gaugeView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/zoom/zoomUtil.js
var require_zoomUtil = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/zoom/zoomUtil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.updateFollow = updateFollow;
    exports.updateRange = updateRange;
    var _src = require_src();
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _util2 = require_util();
    function isValuesEqual(values, newValues) {
      if (values.length !== newValues.length) {
        return false;
      }
      var lastIndex = values.length - 1;
      return values[0] === newValues[0] && values[lastIndex] === newValues[lastIndex];
    }
    function updateCategoryRange(scale, originScale, range) {
      var currentValues = scale.values, currentTicks = scale.ticks, tickMethod = scale.tickMethod, tickCount = scale.tickCount;
      var originValues = originScale.values;
      var start = range[0], end = range[1];
      var len = originValues.length;
      var valueStart = start * len;
      var valueEnd = end * len;
      var diff = valueEnd - valueStart;
      var precision = parseFloat(diff.toFixed(3));
      var count = Math.round(precision);
      var sliceSatrt = Math.min(Math.round(valueStart), len - count);
      var newValues = originValues.slice(sliceSatrt, sliceSatrt + count);
      var newTickCount = Math.round(tickCount * originValues.length / newValues.length);
      var catTicks = (0, _src.getTickMethod)(tickMethod);
      var newTicks = catTicks({
        tickCount: newTickCount,
        values: originValues
      });
      if (isValuesEqual(currentValues, newValues) && isValuesEqual(currentTicks, newTicks)) {
        return;
      }
      scale.change({
        values: newValues,
        ticks: newTicks
      });
      return scale;
    }
    function updateLinearRange(scale, originScale, range) {
      var min = originScale.min, max = originScale.max;
      var start = range[0], end = range[1];
      var newMin = min + (max - min) * start;
      var newMax = min + (max - min) * end;
      scale.change({
        min: newMin,
        max: newMax,
        nice: false
      });
    }
    function updateScale(scale, values) {
      var isLinear = scale.isLinear;
      if (isLinear) {
        var _a = (0, _util.getRange)(values), min = _a.min, max = _a.max;
        return scale.change({
          min,
          max,
          nice: true
        });
      }
    }
    function updateRange(scale, originScale, range) {
      var isCategory = scale.isCategory, isLinear = scale.isLinear;
      if (isCategory) {
        return updateCategoryRange(scale, originScale, range);
      }
      if (isLinear) {
        return updateLinearRange(scale, originScale, range);
      }
    }
    function updateFollow(scales, mainScale, data) {
      var mainField = mainScale.field, mainType = mainScale.type, mainValues = mainScale.values;
      var mainValuesMap = {};
      mainValues.forEach(function(item) {
        mainValuesMap[item] = true;
      });
      return scales.map(function(scale) {
        var followField = scale.field;
        var values = [];
        data.forEach(function(item) {
          var value = mainType === "timeCat" ? (0, _util2.toTimeStamp)(item[mainField]) : item[mainField];
          if (mainValuesMap[value]) {
            var followItemValue = item[followField];
            if ((0, _util.isArray)(followItemValue)) {
              values.push.apply(values, followItemValue);
            } else {
              values.push(followItemValue);
            }
          }
        });
        return updateScale(scale, values);
      });
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/zoom/easing.js
var require_easing = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/zoom/easing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.quadraticOut = quadraticOut;
    function quadraticOut(k) {
      return k * (2 - k);
    }
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/zoom/index.js
var require_zoom2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/zoom/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _zoomUtil = require_zoomUtil();
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _easing = require_easing();
    function lerp(min, max, fraction) {
      return (max - min) * fraction + min;
    }
    function isNumberEqualRange(aRange, bRange) {
      if (!bRange)
        return false;
      for (var i = 0, len = aRange.length; i < len; i++) {
        if (!(0, _util.isNumberEqual)(aRange[i], bRange[i]))
          return false;
      }
      return true;
    }
    function isEqualRange(aRange, bRange) {
      if (!bRange)
        return false;
      if ((0, _util.isArray)(aRange)) {
        return isNumberEqualRange(aRange, bRange);
      }
      for (var i in aRange) {
        if (!isNumberEqualRange(aRange[i], bRange[i]))
          return false;
      }
      return true;
    }
    function cloneScale(scale, scaleConfig) {
      return new scale.constructor((0, _tslib.__assign)((0, _tslib.__assign)({}, scale.__cfg__), scaleConfig));
    }
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Zoom, _super);
          function Zoom(props) {
            var _this = this;
            var defaultProps = {
              onPanStart: function onPanStart() {
              },
              onPinchStart: function onPinchStart() {
              },
              onPan: function onPan() {
              },
              onPinch: function onPinch() {
              },
              onInit: function onInit() {
              },
              onPanEnd: function onPanEnd() {
              },
              onPinchEnd: function onPinchEnd() {
              },
              minCount: 10
            };
            _this = _super.call(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultProps), props)) || this;
            _this.scale = {};
            _this.originScale = {};
            _this.swipeEnd = {
              startX: 0,
              startY: 0,
              endX: 0,
              endY: 0
            };
            _this.onPanStart = function() {
              var scale = _this.scale;
              var onPanStart = _this.props.onPanStart;
              _this.onStart();
              onPanStart === null || onPanStart === void 0 ? void 0 : onPanStart({
                scale
              });
            };
            _this.onPan = function(ev) {
              var onPan = _this.props.onPan;
              var dims = _this.dims;
              var range = {};
              (0, _util.each)(dims, function(dim) {
                if (dim === "x") {
                  range["x"] = _this._doXPan(ev);
                  return;
                }
                if (dim === "y") {
                  range["y"] = _this._doYPan(ev);
                  return;
                }
              });
              _this.renderRange(range);
              onPan === null || onPan === void 0 ? void 0 : onPan(ev);
            };
            _this.onPanEnd = function() {
              var scale = _this.scale;
              var onPanEnd = _this.props.onPanEnd;
              _this.onEnd();
              onPanEnd === null || onPanEnd === void 0 ? void 0 : onPanEnd({
                scale
              });
            };
            _this.onPinchStart = function() {
              var onPinchStart = _this.props.onPinchStart;
              _this.onStart();
              onPinchStart === null || onPinchStart === void 0 ? void 0 : onPinchStart();
            };
            _this.onPinch = function(ev) {
              var onPinch = _this.props.onPinch;
              var dims = _this.dims;
              var range = {};
              (0, _util.each)(dims, function(dim) {
                if (dim === "x") {
                  range["x"] = _this._doXPinch(ev);
                  return;
                }
                if (dim === "y") {
                  range["y"] = _this._doYPinch(ev);
                  return;
                }
              });
              _this.renderRange(range);
              onPinch === null || onPinch === void 0 ? void 0 : onPinch(ev);
            };
            _this.onPinchEnd = function() {
              var scale = _this.scale;
              var onPinchEnd = _this.props.onPinchEnd;
              _this.onEnd();
              onPinchEnd === null || onPinchEnd === void 0 ? void 0 : onPinchEnd({
                scale
              });
            };
            _this.onStart = function() {
              var state = _this.state;
              var range = state.range;
              _this.startRange = range;
              _this._cancelAnimationFrame();
            };
            _this.onSwipe = function(ev) {
              var _a = _this, props2 = _a.props, state = _a.state;
              var velocity = ev.velocity, direction = ev.direction, _b = ev.velocityX, velocityX = _b === void 0 ? 0 : _b, _c = ev.velocityY, velocityY = _c === void 0 ? 0 : _c, points = ev.points;
              var mode2 = props2.mode, swipe = props2.swipe;
              var range = state.range;
              if (!swipe || !mode2) {
                return;
              }
              if (mode2.length === 1) {
                _this.animateSwipe(mode2, range[mode2], direction === "right" || direction === "down" ? -velocity : velocity);
                return;
              }
              var _d = points[0], x = _d.x, y = _d.y;
              if (Math.abs((range === null || range === void 0 ? void 0 : range.x[0]) - 0) < 5e-4 && velocityX > 0)
                return;
              if (Math.abs((range === null || range === void 0 ? void 0 : range.x[1]) - 1) < 5e-4 && velocityX < 0)
                return;
              if (Math.abs((range === null || range === void 0 ? void 0 : range.y[0]) - 0) < 5e-4 && velocityY < 0)
                return;
              if (Math.abs((range === null || range === void 0 ? void 0 : range.x[1]) - 1) < 5e-4 && velocityY > 0)
                return;
              _this.swipeEnd = {
                startX: x,
                startY: y,
                endX: x + velocityX * 50,
                endY: y - velocityY * 50
              };
              _this.onStart();
              _this.update();
            };
            _this.onEnd = function() {
              _this.startRange = null;
            };
            var mode = props.mode;
            _this.dims = (0, _util.isArray)(mode) ? mode : [mode];
            return _this;
          }
          Zoom.prototype.didMount = function() {
            var scale = this.scale;
            var onInit = this.props.onInit;
            onInit({
              scale
            });
            this._bindEvents();
          };
          Zoom.prototype.willReceiveProps = function(nextProps) {
            var nextRange = nextProps.range, nextData = nextProps.data;
            var _a = this.props, lastRange = _a.range, lastData = _a.data;
            if (nextData !== lastData) {
              this._cancelAnimationFrame();
            }
            if (!(0, _fEngine.isEqual)(nextRange, lastRange)) {
              var cacheRange_1 = {};
              (0, _util.each)(this.dims, function(dim) {
                cacheRange_1[dim] = nextRange;
              });
              this.state = {
                range: cacheRange_1
              };
            }
          };
          Zoom.prototype.willMount = function() {
            var _this = this;
            var _a = this, props = _a.props, dims = _a.dims;
            var minCount = props.minCount, range = props.range;
            var valueLength = Number.MIN_VALUE;
            var cacheRange = {};
            (0, _util.each)(dims, function(dim) {
              var scale = _this._getScale(dim);
              var values = scale.values;
              valueLength = values.length > valueLength ? values.length : valueLength;
              _this.scale[dim] = scale;
              _this.originScale[dim] = cloneScale(scale);
              _this.updateRange(range, dim);
              cacheRange[dim] = range;
            });
            this.minScale = minCount / valueLength;
            this.renderRange(cacheRange);
          };
          Zoom.prototype.willUpdate = function() {
            var _this = this;
            var _a = this, props = _a.props, state = _a.state, dims = _a.dims;
            var minCount = props.minCount, range = props.range;
            var valueLength = Number.MIN_VALUE;
            var cacheRange = {};
            (0, _util.each)(dims, function(dim) {
              var scale = _this._getScale(dim);
              if (scale === _this.scale[dim]) {
                return;
              }
              var values = scale.values;
              valueLength = values.length > valueLength ? values.length : valueLength;
              _this.scale[dim] = scale;
              _this.originScale[dim] = cloneScale(scale);
              _this.state.range[dim] = [0, 1];
              _this.updateRange(range, dim);
              cacheRange[dim] = range;
            });
            if (Object.keys(cacheRange).length > 0) {
              this.minScale = minCount / valueLength;
              var newRange = (0, _tslib.__assign)((0, _tslib.__assign)({}, state.range), cacheRange);
              this.renderRange(newRange);
            }
          };
          Zoom.prototype.didUnmount = function() {
            this._cancelAnimationFrame();
            this._unBindEvents();
          };
          Zoom.prototype._requestAnimationFrame = function(calllback) {
            var context = this.context;
            var requestAnimationFrame = context.canvas.requestAnimationFrame;
            this.loop = requestAnimationFrame(calllback);
            return this.loop;
          };
          Zoom.prototype._cancelAnimationFrame = function() {
            var _a = this, loop = _a.loop, context = _a.context;
            if (loop) {
              context.canvas.cancelAnimationFrame(loop);
            }
          };
          Zoom.prototype._bindEvents = function() {
            var _a = this.props, chart = _a.chart, pan = _a.pan, pinch = _a.pinch, swipe = _a.swipe;
            if (pan !== false) {
              chart.on("panstart", this.onPanStart);
              chart.on("pan", this.onPan);
              chart.on("panend", this.onPanEnd);
            }
            if (pinch !== false) {
              chart.on("pinch", this.onPinch);
              chart.on("pinchstart", this.onPinchStart);
              chart.on("pinchend", this.onPinchEnd);
            }
            if (swipe !== false) {
              chart.on("swipe", this.onSwipe);
            }
          };
          Zoom.prototype._unBindEvents = function() {
            var _a = this.props, chart = _a.chart, pan = _a.pan, pinch = _a.pinch, swipe = _a.swipe;
            if (pan !== false) {
              chart.off("panstart", this.onPanStart);
              chart.off("pan", this.onPan);
              chart.off("panend", this.onPanEnd);
            }
            if (pinch !== false) {
              chart.off("pinch", this.onPinch);
              chart.off("pinchstart", this.onPinchStart);
              chart.off("pinchend", this.onPinchEnd);
            }
            if (swipe !== false) {
              chart.off("swipe", this.onSwipe);
            }
          };
          Zoom.prototype.update = function() {
            var _this = this;
            var _a = this.swipeEnd, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
            var x = lerp(startX, endX, 0.05);
            var y = lerp(startY, endY, 0.05);
            this.swipeEnd = {
              startX: x,
              startY: y,
              endX,
              endY
            };
            var props = this.props;
            var coord = props.coord;
            var coordWidth = coord.width, coordHeight = coord.height;
            var range = {};
            range["x"] = this._doPan((x - startX) / coordWidth, "x");
            range["y"] = this._doPan((y - startY) / coordHeight, "y");
            this.renderRange(range);
            this.startRange = range;
            this._requestAnimationFrame(function() {
              return _this.update();
            });
            if (Math.abs(x - endX) < 5e-4 && Math.abs(y - endY) < 5e-4) {
              this.onEnd();
              this._cancelAnimationFrame();
            }
          };
          Zoom.prototype.animateSwipe = function(dim, dimRange, velocity) {
            var _this = this;
            var props = this.props;
            var _a = props.swipeDuration, swipeDuration = _a === void 0 ? 1e3 : _a;
            var diff = (dimRange[1] - dimRange[0]) * velocity;
            var startTime = Date.now();
            var updateRange = function updateRange2(t) {
              var newDimRange = [dimRange[0] + diff * t, dimRange[1] + diff * t];
              var newRange = _this.updateRange(newDimRange, dim);
              _this.renderRange({
                x: newRange
              });
            };
            var _update = function update() {
              var currentTime = Date.now() - startTime;
              if (currentTime >= swipeDuration) {
                updateRange(1);
                return;
              }
              var progress = currentTime / swipeDuration;
              var easedProgress = (0, _easing.quadraticOut)(progress);
              updateRange(easedProgress);
              _this._requestAnimationFrame(function() {
                _update();
              });
            };
            _update();
          };
          Zoom.prototype._doXPan = function(ev) {
            var direction = ev.direction, deltaX = ev.deltaX;
            if (this.props.mode.length === 1 && (direction === "up" || direction === "down")) {
              return this.state.range["x"];
            }
            ev.preventDefault && ev.preventDefault();
            var props = this.props;
            var coord = props.coord, _a = props.panSensitive, panSensitive = _a === void 0 ? 1 : _a;
            var coordWidth = coord.width;
            var ratio = deltaX / coordWidth * panSensitive;
            var newRange = this._doPan(ratio, "x");
            return newRange;
          };
          Zoom.prototype._doYPan = function(ev) {
            var direction = ev.direction, deltaY = ev.deltaY;
            if (this.props.mode.length === 1 && (direction === "left" || direction === "right")) {
              return this.state.range["y"];
            }
            ev.preventDefault && ev.preventDefault();
            var props = this.props;
            var coord = props.coord, _a = props.panSensitive, panSensitive = _a === void 0 ? 1 : _a;
            var coordHeight = coord.height;
            var ratio = -deltaY / coordHeight * panSensitive;
            var newRange = this._doPan(ratio, "y");
            return newRange;
          };
          Zoom.prototype._doPan = function(ratio, dim) {
            var startRange = this.startRange;
            var _a = startRange[dim], start = _a[0], end = _a[1];
            var rangeLen = end - start;
            var rangeOffset = rangeLen * ratio;
            var newStart = start - rangeOffset;
            var newEnd = end - rangeOffset;
            var newRange = this.updateRange([newStart, newEnd], dim);
            return newRange;
          };
          Zoom.prototype._doXPinch = function(ev) {
            ev.preventDefault && ev.preventDefault();
            var zoom = ev.zoom, center = ev.center;
            var props = this.props;
            var coord = props.coord;
            var coordWidth = coord.width, left = coord.left, right = coord.right;
            var leftLen = Math.abs(center.x - left);
            var rightLen = Math.abs(right - center.x);
            var leftZoom = leftLen / coordWidth;
            var rightZoom = rightLen / coordWidth;
            var newRange = this._doPinch(leftZoom, rightZoom, zoom, "x");
            return newRange;
          };
          Zoom.prototype._doYPinch = function(ev) {
            ev.preventDefault && ev.preventDefault();
            var zoom = ev.zoom, center = ev.center;
            var props = this.props;
            var coord = props.coord;
            var coordHeight = coord.height, top = coord.top, bottom = coord.bottom;
            var topLen = Math.abs(center.y - top);
            var bottomLen = Math.abs(bottom - center.y);
            var topZoom = topLen / coordHeight;
            var bottomZoom = bottomLen / coordHeight;
            var newRange = this._doPinch(topZoom, bottomZoom, zoom, "y");
            return newRange;
          };
          Zoom.prototype._doPinch = function(startRatio, endRatio, zoom, dim) {
            var _a = this, startRange = _a.startRange, minScale = _a.minScale, props = _a.props;
            var _b = props.pinchSensitive, pinchSensitive = _b === void 0 ? 1 : _b;
            var _c = startRange[dim], start = _c[0], end = _c[1];
            var zoomOffset = zoom < 1 ? (1 / zoom - 1) * pinchSensitive : (1 - zoom) * pinchSensitive;
            var rangeLen = end - start;
            var rangeOffset = rangeLen * zoomOffset;
            var startOffset = rangeOffset * startRatio;
            var endOffset = rangeOffset * endRatio;
            var newStart = Math.max(0, start - startOffset);
            var newEnd = Math.min(1, end + endOffset);
            var newRange = [newStart, newEnd];
            if (newEnd - newStart < minScale) {
              return this.state.range[dim];
            }
            return this.updateRange(newRange, dim);
          };
          Zoom.prototype.updateRange = function(originalRange, dim) {
            if (!originalRange)
              return;
            var start = originalRange[0], end = originalRange[1];
            var rangeLength = end - start;
            var newRange;
            if (start < 0) {
              newRange = [0, rangeLength];
            } else if (end > 1) {
              newRange = [1 - rangeLength, 1];
            } else {
              newRange = originalRange;
            }
            var _a = this, props = _a.props, scale = _a.scale, originScale = _a.originScale, state = _a.state;
            var data = props.data, autoFit = props.autoFit;
            var range = state.range;
            if (range && isEqualRange(newRange, range[dim]))
              return newRange;
            (0, _zoomUtil.updateRange)(scale[dim], originScale[dim], newRange);
            if (autoFit) {
              var followScale = this._getFollowScales(dim);
              this.updateFollow(followScale, scale[dim], data);
            }
            return newRange;
          };
          Zoom.prototype.updateFollow = function(scales, mainScale, data) {
            (0, _zoomUtil.updateFollow)(scales, mainScale, data);
          };
          Zoom.prototype._getScale = function(dim) {
            var _a = this.props, coord = _a.coord, chart = _a.chart;
            if (dim === "x") {
              return coord.transposed ? chart.getYScales()[0] : chart.getXScales()[0];
            } else {
              return coord.transposed ? chart.getXScales()[0] : chart.getYScales()[0];
            }
          };
          Zoom.prototype._getFollowScales = function(dim) {
            var _a = this.props, coord = _a.coord, chart = _a.chart;
            if (dim === "x") {
              return coord.transposed ? chart.getXScales() : chart.getYScales();
            }
            if (dim === "y") {
              return coord.transposed ? chart.getYScales() : chart.getXScales();
            }
          };
          Zoom.prototype.renderRange = function(range) {
            var _a = this, state = _a.state, props = _a.props;
            if (isEqualRange(range, state.range))
              return;
            var chart = props.chart, onChange = props.onChange;
            onChange && onChange({
              range
            });
            var animate = chart.animate;
            chart.setAnimate(false);
            state.range = range;
            chart.forceUpdate(function() {
              chart.setAnimate(animate);
            });
          };
          Zoom.prototype.render = function() {
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, this.props, this.state));
          };
          return Zoom;
        }(_fEngine.Component)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/withScrollBar.js
var require_withScrollBar = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/withScrollBar.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _zoom = _interopRequireDefault(require_zoom2());
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(ScrollBar, _super);
          function ScrollBar() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          ScrollBar.prototype.willMount = function() {
            _super.prototype.willMount.call(this);
            var _a = this, context = _a.context, props = _a.props;
            var visible = props.visible, _b = props.position, position = _b === void 0 ? "bottom" : _b, _c = props.margin, margin = _c === void 0 ? "16px" : _c, chart = props.chart;
            var marginNumber = context.px2hd(margin);
            if (visible === false) {
              return null;
            }
            chart.updateCoordFor(this, {
              position,
              width: position === "left" || position === "right" ? marginNumber : 0,
              height: position === "bottom" || position === "top" ? marginNumber : 0
            });
          };
          ScrollBar.prototype.render = function() {
            var _a = this, props = _a.props, state = _a.state;
            var visible = props.visible;
            if (visible === false) {
              return null;
            }
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({
              position: "bottom"
            }, props, state));
          };
          return ScrollBar;
        }((0, _zoom.default)(View))
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/horizontal.js
var require_horizontal = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/horizontal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props, context) {
      var coord = props.coord, range = props.range, position = props.position, layout = props.layout, style = props.style, background = props.background, barStyle = props.barStyle;
      var left = coord.left, width = coord.width;
      var top = layout.top, height = layout.height;
      var _a = (range === null || range === void 0 ? void 0 : range.x) || (range === null || range === void 0 ? void 0 : range.y), start = _a[0], end = _a[1];
      var barLeft = width * start;
      var barWidth = width * (end - start);
      if (isNaN(barWidth))
        return;
      return (0, _fEngine.jsx)("group", {
        style: (0, _tslib.__assign)({
          display: "flex",
          left,
          top: position === "top" ? top - context.px2hd("8px") : top + height
        }, style)
      }, (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          display: "flex",
          position: "absolute",
          left: 0,
          width,
          height: 0,
          stroke: "rgba(202, 215, 239, .2)",
          lineCap: "round",
          lineWidth: "8px"
        }, background)
      }), (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          display: "flex",
          position: "absolute",
          left: barLeft,
          width: barWidth,
          height: 0,
          stroke: "rgba(202, 215, 239, .5)",
          lineCap: "round",
          lineWidth: "8px"
        }, barStyle)
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/vertical.js
var require_vertical = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/vertical.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _default = exports.default = function _default2(props, context) {
      var coord = props.coord, range = props.range, position = props.position, layout = props.layout, style = props.style, background = props.background, barStyle = props.barStyle;
      var top = coord.top, height = coord.height;
      var left = layout.left, width = layout.width;
      var _a = (range === null || range === void 0 ? void 0 : range.y) || (range === null || range === void 0 ? void 0 : range.x), start = _a[0], end = _a[1];
      var barTop = height * start;
      var barHeight = height * (end - start);
      return (0, _fEngine.jsx)("group", {
        style: (0, _tslib.__assign)({
          display: "flex",
          top,
          left: position === "left" ? left - context.px2hd("8px") : left + width
        }, style)
      }, (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          position: "absolute",
          top: 0,
          left: 0,
          width: 0,
          height,
          stroke: "rgba(202, 215, 239, .2)",
          lineCap: "round",
          lineWidth: "8px"
        }, background)
      }), (0, _fEngine.jsx)("line", {
        style: (0, _tslib.__assign)({
          position: "absolute",
          top: barTop,
          width: 0,
          height: barHeight,
          stroke: "rgba(202, 215, 239, .5)",
          lineCap: "round",
          lineWidth: "8px"
        }, barStyle)
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/scrollBarView.js
var require_scrollBarView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/scrollBarView.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _horizontal = _interopRequireDefault(require_horizontal());
    var _vertical = _interopRequireDefault(require_vertical());
    var _default = exports.default = function _default2(props) {
      var position = props.position, mode = props.mode;
      if (mode.length > 1) {
        return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)(_vertical.default, (0, _tslib.__assign)({}, props)), (0, _fEngine.jsx)(_horizontal.default, (0, _tslib.__assign)({}, props)));
      }
      if (position === "left" || position === "right") {
        return (0, _fEngine.jsx)(_vertical.default, (0, _tslib.__assign)({}, props));
      }
      return (0, _fEngine.jsx)(_horizontal.default, (0, _tslib.__assign)({}, props));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/index.js
var require_scrollBar = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/scrollBar/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "ScrollBarView", {
      enumerable: true,
      get: function get() {
        return _scrollBarView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withScrollBar", {
      enumerable: true,
      get: function get() {
        return _withScrollBar.default;
      }
    });
    var _withScrollBar = _interopRequireDefault(require_withScrollBar());
    var _scrollBarView = _interopRequireDefault(require_scrollBarView());
    var _default = exports.default = (0, _withScrollBar.default)(_scrollBarView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/candlestick/withCandlestick.js
var require_withCandlestick = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/candlestick/withCandlestick.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _geometry = _interopRequireDefault(require_geometry());
    var COLORS = [
      "#E62C3B",
      "#0E9976",
      "#999999"
      // 平盘
    ];
    var _default = exports.default = function _default2(View) {
      return (
        /** @class */
        function(_super) {
          (0, _tslib.__extends)(Candlestick, _super);
          function Candlestick() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          Candlestick.prototype.getDefaultCfg = function() {
            return {
              geomType: "candlestick"
            };
          };
          Candlestick.prototype.getSize = function() {
            var _a = this, attrs = _a.attrs, props = _a.props;
            var _b = props.sizeRatio, sizeRatio = _b === void 0 ? 0.5 : _b;
            var x = attrs.x;
            var scale = x.scale;
            var values = scale.values;
            return 1 / values.length * sizeRatio;
          };
          Candlestick.prototype._getColor = function(colors, child, prevChild) {
            var normalized = child.normalized;
            var y = normalized.y;
            var open = y[0], close = y[1];
            if (close > open) {
              return colors[0];
            }
            if (close < open) {
              return colors[1];
            }
            if (!prevChild) {
              return colors[0];
            }
            var prevNormalized = prevChild.normalized;
            var prevY = prevNormalized.y;
            var prevClose = prevY[1];
            if (close > prevClose) {
              return colors[0];
            }
            if (close < prevClose) {
              return colors[1];
            }
            return colors[2];
          };
          Candlestick.prototype.mapping = function() {
            var records = _super.prototype.mapping.call(this);
            var props = this.props;
            var coord = props.coord;
            var y0 = this.getY0Value();
            var defaultSize = this.getSize();
            var colorAttr = this.getAttr("color");
            var colors = colorAttr ? colorAttr.range : COLORS;
            for (var i = 0, len = records.length; i < len; i++) {
              var record = records[i];
              var children = record.children;
              for (var j = 0, len_1 = children.length; j < len_1; j++) {
                var child = children[j];
                var normalized = child.normalized, mappedSize = child.size;
                if ((0, _util.isNil)(mappedSize)) {
                  var x = normalized.x, y = normalized.y, _a = normalized.size, size = _a === void 0 ? defaultSize : _a;
                  (0, _util.mix)(child, coord.convertRect({
                    x,
                    y,
                    y0,
                    size
                  }));
                } else {
                  var x = child.x, y = child.y;
                  var rect = {
                    x,
                    y,
                    y0,
                    size: mappedSize
                  };
                  (0, _util.mix)(child, coord.transformToRect(rect));
                }
                child.color = this._getColor(colors, child, children[j - 1]);
                (0, _util.mix)(child.shape, this.getSelectionStyle(child));
              }
            }
            return records;
          };
          Candlestick.prototype.render = function() {
            var props = this.props;
            var records = this.mapping();
            return (0, _fEngine.jsx)(View, (0, _tslib.__assign)({}, props, {
              records
            }));
          };
          return Candlestick;
        }(_geometry.default)
      );
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/candlestick/candlestickView.js
var require_candlestickView = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/candlestick/candlestickView.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _util = (init_esm2(), __toCommonJS(esm_exports2));
    var _default = exports.default = function _default2(props) {
      var records = props.records, animation = props.animation, y0 = props.y0, onClick = props.onClick;
      return (0, _fEngine.jsx)("group", null, records.map(function(record) {
        var key = record.key, children = record.children;
        return (0, _fEngine.jsx)("group", {
          key
        }, children.map(function(item) {
          var key2 = item.key, xMin = item.xMin, xMax = item.xMax, yMin = item.yMin, yMax = item.yMax, x = item.x, y = item.y, color = item.color, shape = item.shape;
          if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
            return null;
          }
          return (0, _fEngine.jsx)("group", null, (0, _fEngine.jsx)("line", {
            key: "".concat(key2, "-line"),
            style: {
              x1: x,
              y1: y[2],
              x2: x,
              y2: y[3],
              stroke: color,
              lineWidth: "2px",
              lineCap: "round"
            },
            animation: {
              appear: {
                easing: "linear",
                duration: 300,
                property: ["y1", "y2"],
                // @ts-ignore
                start: {
                  y1: 0,
                  y2: 0
                }
              },
              update: {
                easing: "linear",
                duration: 300,
                property: ["x1", "y1", "x2", "y2"]
              }
            }
          }), (0, _fEngine.jsx)("rect", {
            key: "".concat(key2, "-rect"),
            style: (0, _tslib.__assign)({
              x: xMin,
              y: yMin,
              // 当 min === max 时，设置 1，否则会出现 0 的情况
              width: Math.max(xMax - xMin, 1),
              height: Math.max(yMax - yMin, 1),
              fill: color,
              radius: "2px"
            }, shape),
            onClick,
            animation: (0, _util.deepMix)({
              appear: {
                easing: "linear",
                duration: 300,
                property: ["y", "height"],
                start: {
                  y: y0,
                  height: 0
                }
              },
              update: {
                easing: "linear",
                duration: 300,
                property: ["x", "y", "width", "height"]
              }
            }, animation)
          }));
        }));
      }));
    };
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/candlestick/index.js
var require_candlestick = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/candlestick/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "CandlestickView", {
      enumerable: true,
      get: function get() {
        return _candlestickView.default;
      }
    });
    exports.default = void 0;
    Object.defineProperty(exports, "withCandlestick", {
      enumerable: true,
      get: function get() {
        return _withCandlestick.default;
      }
    });
    var _withCandlestick = _interopRequireDefault(require_withCandlestick());
    var _candlestickView = _interopRequireDefault(require_candlestickView());
    var _default = exports.default = (0, _withCandlestick.default)(_candlestickView.default);
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pictorial/pictorial.js
var require_pictorial = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pictorial/pictorial.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    var _interval = require_interval2();
    var Pictorial = (
      /** @class */
      function(_super) {
        (0, _tslib.__extends)(Pictorial2, _super);
        function Pictorial2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Pictorial2.prototype.render = function() {
          var _a = this, props = _a.props, context = _a.context;
          var px2hd = context.px2hd;
          var _Symbol = px2hd(props).symbol;
          var records = this.mapping();
          return (0, _fEngine.jsx)("group", null, records.map(function(record) {
            var key = record.key, children = record.children;
            return (0, _fEngine.jsx)("group", {
              key
            }, children.map(function(item) {
              var xMax = item.xMax, xMin = item.xMin, yMax = item.yMax, yMin = item.yMin;
              return (0, _fEngine.jsx)(_Symbol, (0, _tslib.__assign)({}, item, {
                width: xMax - xMin,
                height: yMax - yMin,
                px2hd
              }));
            }));
          }));
        };
        return Pictorial2;
      }((0, _interval.withInterval)({}))
    );
    var _default = exports.default = Pictorial;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pictorial/index.js
var require_pictorial2 = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/pictorial/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Pictorial", {
      enumerable: true,
      get: function get() {
        return _pictorial.default;
      }
    });
    exports.default = void 0;
    var _pictorial = _interopRequireDefault(require_pictorial());
    var _default = exports.default = _pictorial.default;
  }
});

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/index.js
var require_components = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/components/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    var _typeof = require_typeof();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "ArcGuide", {
      enumerable: true,
      get: function get() {
        return _guide.ArcGuide;
      }
    });
    Object.defineProperty(exports, "Area", {
      enumerable: true,
      get: function get() {
        return _area.default;
      }
    });
    Object.defineProperty(exports, "AreaView", {
      enumerable: true,
      get: function get() {
        return _area.AreaView;
      }
    });
    Object.defineProperty(exports, "Axis", {
      enumerable: true,
      get: function get() {
        return _axis.default;
      }
    });
    Object.defineProperty(exports, "AxisView", {
      enumerable: true,
      get: function get() {
        return _axis.AxisView;
      }
    });
    Object.defineProperty(exports, "Candlestick", {
      enumerable: true,
      get: function get() {
        return _candlestick.default;
      }
    });
    Object.defineProperty(exports, "CandlestickView", {
      enumerable: true,
      get: function get() {
        return _candlestick.CandlestickView;
      }
    });
    Object.defineProperty(exports, "Gauge", {
      enumerable: true,
      get: function get() {
        return _gauge.default;
      }
    });
    Object.defineProperty(exports, "GaugeView", {
      enumerable: true,
      get: function get() {
        return _gauge.GaugeView;
      }
    });
    Object.defineProperty(exports, "Geometry", {
      enumerable: true,
      get: function get() {
        return _geometry.default;
      }
    });
    Object.defineProperty(exports, "Guide", {
      enumerable: true,
      get: function get() {
        return _guide.default;
      }
    });
    Object.defineProperty(exports, "ImageGuide", {
      enumerable: true,
      get: function get() {
        return _guide.ImageGuide;
      }
    });
    Object.defineProperty(exports, "Interval", {
      enumerable: true,
      get: function get() {
        return _interval.default;
      }
    });
    Object.defineProperty(exports, "IntervalView", {
      enumerable: true,
      get: function get() {
        return _interval.IntervalView;
      }
    });
    Object.defineProperty(exports, "Legend", {
      enumerable: true,
      get: function get() {
        return _legend.default;
      }
    });
    Object.defineProperty(exports, "LegendView", {
      enumerable: true,
      get: function get() {
        return _legend.LegendView;
      }
    });
    Object.defineProperty(exports, "Line", {
      enumerable: true,
      get: function get() {
        return _line.default;
      }
    });
    Object.defineProperty(exports, "LineGuide", {
      enumerable: true,
      get: function get() {
        return _guide.LineGuide;
      }
    });
    Object.defineProperty(exports, "LineView", {
      enumerable: true,
      get: function get() {
        return _line.LineView;
      }
    });
    Object.defineProperty(exports, "LottieGuide", {
      enumerable: true,
      get: function get() {
        return _guide.LottieGuide;
      }
    });
    Object.defineProperty(exports, "Pictorial", {
      enumerable: true,
      get: function get() {
        return _pictorial.default;
      }
    });
    Object.defineProperty(exports, "PieLabel", {
      enumerable: true,
      get: function get() {
        return _pieLabel.default;
      }
    });
    Object.defineProperty(exports, "PieLabelView", {
      enumerable: true,
      get: function get() {
        return _pieLabel.PieLabelView;
      }
    });
    Object.defineProperty(exports, "Point", {
      enumerable: true,
      get: function get() {
        return _point.default;
      }
    });
    Object.defineProperty(exports, "PointGuide", {
      enumerable: true,
      get: function get() {
        return _guide.PointGuide;
      }
    });
    Object.defineProperty(exports, "PointView", {
      enumerable: true,
      get: function get() {
        return _point.PointView;
      }
    });
    Object.defineProperty(exports, "PolylineGuide", {
      enumerable: true,
      get: function get() {
        return _guide.PolylineGuide;
      }
    });
    Object.defineProperty(exports, "RectGuide", {
      enumerable: true,
      get: function get() {
        return _guide.RectGuide;
      }
    });
    Object.defineProperty(exports, "ScrollBar", {
      enumerable: true,
      get: function get() {
        return _scrollBar.default;
      }
    });
    Object.defineProperty(exports, "ScrollBarView", {
      enumerable: true,
      get: function get() {
        return _scrollBar.ScrollBarView;
      }
    });
    Object.defineProperty(exports, "Sunburst", {
      enumerable: true,
      get: function get() {
        return _sunburst.default;
      }
    });
    Object.defineProperty(exports, "SunburstView", {
      enumerable: true,
      get: function get() {
        return _sunburst.SunburstView;
      }
    });
    Object.defineProperty(exports, "TagGuide", {
      enumerable: true,
      get: function get() {
        return _guide.TagGuide;
      }
    });
    Object.defineProperty(exports, "TextGuide", {
      enumerable: true,
      get: function get() {
        return _guide.TextGuide;
      }
    });
    Object.defineProperty(exports, "Tooltip", {
      enumerable: true,
      get: function get() {
        return _tooltip.default;
      }
    });
    Object.defineProperty(exports, "TooltipView", {
      enumerable: true,
      get: function get() {
        return _tooltip.TooltipView;
      }
    });
    Object.defineProperty(exports, "Treemap", {
      enumerable: true,
      get: function get() {
        return _treemap.default;
      }
    });
    Object.defineProperty(exports, "TreemapView", {
      enumerable: true,
      get: function get() {
        return _treemap.TreemapView;
      }
    });
    Object.defineProperty(exports, "Zoom", {
      enumerable: true,
      get: function get() {
        return _zoom.default;
      }
    });
    Object.defineProperty(exports, "withArea", {
      enumerable: true,
      get: function get() {
        return _area.withArea;
      }
    });
    Object.defineProperty(exports, "withAxis", {
      enumerable: true,
      get: function get() {
        return _axis.withAxis;
      }
    });
    Object.defineProperty(exports, "withCandlestick", {
      enumerable: true,
      get: function get() {
        return _candlestick.withCandlestick;
      }
    });
    Object.defineProperty(exports, "withGauge", {
      enumerable: true,
      get: function get() {
        return _gauge.withGauge;
      }
    });
    Object.defineProperty(exports, "withGuide", {
      enumerable: true,
      get: function get() {
        return _guide.withGuide;
      }
    });
    Object.defineProperty(exports, "withInterval", {
      enumerable: true,
      get: function get() {
        return _interval.withInterval;
      }
    });
    Object.defineProperty(exports, "withLegend", {
      enumerable: true,
      get: function get() {
        return _legend.withLegend;
      }
    });
    Object.defineProperty(exports, "withLine", {
      enumerable: true,
      get: function get() {
        return _line.withLine;
      }
    });
    Object.defineProperty(exports, "withPieLabel", {
      enumerable: true,
      get: function get() {
        return _pieLabel.withPieLabel;
      }
    });
    Object.defineProperty(exports, "withPoint", {
      enumerable: true,
      get: function get() {
        return _point.withPoint;
      }
    });
    Object.defineProperty(exports, "withScrollBar", {
      enumerable: true,
      get: function get() {
        return _scrollBar.withScrollBar;
      }
    });
    Object.defineProperty(exports, "withSunburst", {
      enumerable: true,
      get: function get() {
        return _sunburst.withSunburst;
      }
    });
    Object.defineProperty(exports, "withTooltip", {
      enumerable: true,
      get: function get() {
        return _tooltip.withTooltip;
      }
    });
    Object.defineProperty(exports, "withTreemap", {
      enumerable: true,
      get: function get() {
        return _treemap.withTreemap;
      }
    });
    var _geometry = _interopRequireDefault(require_geometry());
    var _line = _interopRequireWildcard(require_line());
    var _area = _interopRequireWildcard(require_area());
    var _interval = _interopRequireWildcard(require_interval2());
    var _point = _interopRequireWildcard(require_point());
    var _axis = _interopRequireWildcard(require_axis());
    var _legend = _interopRequireWildcard(require_legend());
    var _guide = _interopRequireWildcard(require_guide());
    var _tooltip = _interopRequireWildcard(require_tooltip());
    var _treemap = _interopRequireWildcard(require_treemap2());
    var _sunburst = _interopRequireWildcard(require_sunburst());
    var _pieLabel = _interopRequireWildcard(require_pieLabel());
    var _gauge = _interopRequireWildcard(require_gauge());
    var _zoom = _interopRequireDefault(require_zoom2());
    var _scrollBar = _interopRequireWildcard(require_scrollBar());
    var _candlestick = _interopRequireWildcard(require_candlestick());
    var _pictorial = _interopRequireDefault(require_pictorial2());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != _typeof(e) && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
  }
});

export {
  require_interopRequireDefault,
  require_src,
  require_chart,
  require_components
};
//# sourceMappingURL=chunk-EI2HVKJS.js.map
