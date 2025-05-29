import {
  require_chart,
  require_components,
  require_interopRequireDefault,
  require_src
} from "./chunk-EI2HVKJS.js";
import {
  es_exports,
  init_es
} from "./chunk-6MO5ERXV.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-6MT7EBHR.js";

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/index.js
var require_lib = __commonJS({
  "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/index.js"(exports) {
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _exportNames = {
      Chart: true,
      Scale: true
    };
    Object.defineProperty(exports, "Chart", {
      enumerable: true,
      get: function get() {
        return _chart.default;
      }
    });
    Object.defineProperty(exports, "Scale", {
      enumerable: true,
      get: function get() {
        return _src.Scale;
      }
    });
    exports.default = void 0;
    var _fEngine = (init_es(), __toCommonJS(es_exports));
    Object.keys(_fEngine).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _fEngine[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _fEngine[key];
        }
      });
    });
    var _chart = _interopRequireDefault(require_chart());
    var _src = require_src();
    var _components = require_components();
    Object.keys(_components).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _components[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _components[key];
        }
      });
    });
    var _default = exports.default = {
      version: "5.8.0"
    };
  }
});

export {
  require_lib
};
//# sourceMappingURL=chunk-RL65UB6W.js.map
