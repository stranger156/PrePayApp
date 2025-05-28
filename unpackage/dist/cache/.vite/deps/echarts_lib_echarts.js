import {
  extendChartView,
  extendComponentModel,
  extendComponentView,
  extendSeriesModel,
  format_exports,
  graphic_exports,
  helper_exports,
  install,
  install2,
  installLabelLayout,
  number_exports,
  parseGeoJSON,
  time_exports,
  util_exports as util_exports2
} from "./chunk-NIBOORWE.js";
import {
  SeriesData_default
} from "./chunk-4HA7ZEVR.js";
import {
  Axis_default
} from "./chunk-YKDACUSK.js";
import "./chunk-O3EFILQC.js";
import "./chunk-SQ3A7GEI.js";
import "./chunk-7URDEZC3.js";
import {
  Chart_default,
  Component_default,
  Component_default2,
  Model_default,
  PRIORITY,
  Series_default,
  brushSingle,
  color_exports,
  connect,
  dataTool,
  dependencies,
  disConnect,
  disconnect,
  dispose,
  env_default,
  getCoordinateSystemDimensions,
  getInstanceByDom,
  getInstanceById,
  getMap,
  init,
  matrix_exports,
  registerAction,
  registerCoordinateSystem,
  registerLayout,
  registerLoading,
  registerLocale,
  registerMap,
  registerPostInit,
  registerPostUpdate,
  registerPreprocessor,
  registerProcessor,
  registerTheme,
  registerTransform,
  registerUpdateLifecycle,
  registerVisual,
  setCanvasCreator,
  setPlatformAPI,
  throttle,
  use,
  util_exports,
  vector_exports,
  version,
  zrender_exports
} from "./chunk-EJX2B5IF.js";

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/echarts/lib/echarts.js
use([install, install2]);
var echarts_default = {
  init: function() {
    if (true) {
      console.error(`"import echarts from 'echarts/lib/echarts.js'" is not supported anymore. Use "import * as echarts from 'echarts/lib/echarts.js'" instead;`);
    }
    return init.apply(null, arguments);
  }
};
use(installLabelLayout);
export {
  Axis_default as Axis,
  Chart_default as ChartView,
  Component_default as ComponentModel,
  Component_default2 as ComponentView,
  SeriesData_default as List,
  Model_default as Model,
  PRIORITY,
  Series_default as SeriesModel,
  color_exports as color,
  connect,
  dataTool,
  echarts_default as default,
  dependencies,
  disConnect,
  disconnect,
  dispose,
  env_default as env,
  extendChartView,
  extendComponentModel,
  extendComponentView,
  extendSeriesModel,
  format_exports as format,
  getCoordinateSystemDimensions,
  getInstanceByDom,
  getInstanceById,
  getMap,
  graphic_exports as graphic,
  helper_exports as helper,
  init,
  brushSingle as innerDrawElementOnCanvas,
  matrix_exports as matrix,
  number_exports as number,
  parseGeoJSON,
  parseGeoJSON as parseGeoJson,
  registerAction,
  registerCoordinateSystem,
  registerLayout,
  registerLoading,
  registerLocale,
  registerMap,
  registerPostInit,
  registerPostUpdate,
  registerPreprocessor,
  registerProcessor,
  registerTheme,
  registerTransform,
  registerUpdateLifecycle,
  registerVisual,
  setCanvasCreator,
  setPlatformAPI,
  throttle,
  time_exports as time,
  use,
  util_exports2 as util,
  vector_exports as vector,
  version,
  util_exports as zrUtil,
  zrender_exports as zrender
};
//# sourceMappingURL=echarts_lib_echarts.js.map
