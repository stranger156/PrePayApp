import {
  require_chart,
  require_components,
  require_src
} from "./chunk-EI2HVKJS.js";
import {
  Renderer,
  canvas_default,
  children_default,
  component_default,
  computeLayout,
  createContext,
  createRef,
  equal_default,
  fragment_default,
  gesture_default,
  init_es,
  jsx,
  parseColor,
  player_default,
  registerTag,
  smooth_exports,
  timeline_default
} from "./chunk-6MO5ERXV.js";
import {
  __export,
  __reExport,
  __toESM
} from "./chunk-6MT7EBHR.js";

// C:/Users/86158/Documents/HBuilderProjects/PrePayApp/node_modules/@antv/f2/lib/index.d.ts
var index_d_exports = {};
__export(index_d_exports, {
  Canvas: () => canvas_default,
  CanvasRenderer: () => Renderer,
  Chart: () => import_chart.default,
  ChartProps: () => import_chart.ChartProps,
  Children: () => children_default,
  Component: () => component_default,
  Fragment: () => fragment_default,
  Gesture: () => gesture_default,
  Player: () => player_default,
  Scale: () => import_src.Scale,
  ScaleConfig: () => import_src.ScaleConfig,
  Smooth: () => smooth_exports,
  Timeline: () => timeline_default,
  computeLayout: () => computeLayout,
  createContext: () => createContext,
  createElement: () => jsx,
  createRef: () => createRef,
  default: () => index_d_default,
  isEqual: () => equal_default,
  jsx: () => jsx,
  parseColor: () => parseColor,
  registerTag: () => registerTag
});
init_es();
var import_chart = __toESM(require_chart());
var import_src = __toESM(require_src());
__reExport(index_d_exports, __toESM(require_components()));
var index_d_default = _default;
var export_Chart = import_chart.default;
var export_ChartProps = import_chart.ChartProps;
var export_Scale = import_src.Scale;
var export_ScaleConfig = import_src.ScaleConfig;
export {
  canvas_default as Canvas,
  Renderer as CanvasRenderer,
  export_Chart as Chart,
  export_ChartProps as ChartProps,
  children_default as Children,
  component_default as Component,
  fragment_default as Fragment,
  gesture_default as Gesture,
  player_default as Player,
  export_Scale as Scale,
  export_ScaleConfig as ScaleConfig,
  smooth_exports as Smooth,
  timeline_default as Timeline,
  computeLayout,
  createContext,
  jsx as createElement,
  createRef,
  index_d_default as default,
  equal_default as isEqual,
  jsx,
  parseColor,
  registerTag
};
//# sourceMappingURL=@antv_f2_lib_index__d__ts.js.map
