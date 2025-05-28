import {
  ensureScaleRawExtentInfo,
  unionAxisExtentFromData
} from "./chunk-LYXTV673.js";
import {
  Component_default,
  Component_default2,
  Eventful_default,
  Group_default,
  MULTIPLE_REFERRING,
  Point_default,
  Polygon_default,
  Polyline_default,
  Rect_default,
  SINGLE_REFERRING,
  Text_default,
  __extends,
  applyTransform2 as applyTransform,
  asc,
  assert,
  bind,
  clear,
  clone,
  createHashMap,
  createOrUpdate,
  createSymbol,
  createTextStyle,
  curry,
  defaults,
  deprecateLog,
  each,
  enableHoverEmphasis,
  getLayoutParams,
  getLayoutRect,
  getPixelPrecision,
  getTransform,
  indexOf,
  inheritDefaultOption,
  isFunction,
  isMiddleOrRightButtonOnMouseUpDown,
  isString,
  linearMap,
  makeInner,
  map,
  merge,
  noop,
  parsePercent2 as parsePercent,
  registerAction,
  stop,
  symbolBuildProxies,
  transformDirection,
  use
} from "./chunk-U45QEVI5.js";

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/helper.js
var DATA_ZOOM_AXIS_DIMENSIONS = ["x", "y", "radius", "angle", "single"];
var SERIES_COORDS = ["cartesian2d", "polar", "singleAxis"];
function isCoordSupported(seriesModel) {
  var coordType = seriesModel.get("coordinateSystem");
  return indexOf(SERIES_COORDS, coordType) >= 0;
}
function getAxisMainType(axisDim) {
  if (true) {
    assert(axisDim);
  }
  return axisDim + "Axis";
}
function findEffectedDataZooms(ecModel, payload) {
  var axisRecords = createHashMap();
  var effectedModels = [];
  var effectedModelMap = createHashMap();
  ecModel.eachComponent({
    mainType: "dataZoom",
    query: payload
  }, function(dataZoomModel) {
    if (!effectedModelMap.get(dataZoomModel.uid)) {
      addToEffected(dataZoomModel);
    }
  });
  var foundNewLink;
  do {
    foundNewLink = false;
    ecModel.eachComponent("dataZoom", processSingle);
  } while (foundNewLink);
  function processSingle(dataZoomModel) {
    if (!effectedModelMap.get(dataZoomModel.uid) && isLinked(dataZoomModel)) {
      addToEffected(dataZoomModel);
      foundNewLink = true;
    }
  }
  function addToEffected(dataZoom) {
    effectedModelMap.set(dataZoom.uid, true);
    effectedModels.push(dataZoom);
    markAxisControlled(dataZoom);
  }
  function isLinked(dataZoomModel) {
    var isLink = false;
    dataZoomModel.eachTargetAxis(function(axisDim, axisIndex) {
      var axisIdxArr = axisRecords.get(axisDim);
      if (axisIdxArr && axisIdxArr[axisIndex]) {
        isLink = true;
      }
    });
    return isLink;
  }
  function markAxisControlled(dataZoomModel) {
    dataZoomModel.eachTargetAxis(function(axisDim, axisIndex) {
      (axisRecords.get(axisDim) || axisRecords.set(axisDim, []))[axisIndex] = true;
    });
  }
  return effectedModels;
}
function collectReferCoordSysModelInfo(dataZoomModel) {
  var ecModel = dataZoomModel.ecModel;
  var coordSysInfoWrap = {
    infoList: [],
    infoMap: createHashMap()
  };
  dataZoomModel.eachTargetAxis(function(axisDim, axisIndex) {
    var axisModel = ecModel.getComponent(getAxisMainType(axisDim), axisIndex);
    if (!axisModel) {
      return;
    }
    var coordSysModel = axisModel.getCoordSysModel();
    if (!coordSysModel) {
      return;
    }
    var coordSysUid = coordSysModel.uid;
    var coordSysInfo = coordSysInfoWrap.infoMap.get(coordSysUid);
    if (!coordSysInfo) {
      coordSysInfo = {
        model: coordSysModel,
        axisModels: []
      };
      coordSysInfoWrap.infoList.push(coordSysInfo);
      coordSysInfoWrap.infoMap.set(coordSysUid, coordSysInfo);
    }
    coordSysInfo.axisModels.push(axisModel);
  });
  return coordSysInfoWrap;
}

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/DataZoomModel.js
var DataZoomAxisInfo = (
  /** @class */
  function() {
    function DataZoomAxisInfo2() {
      this.indexList = [];
      this.indexMap = [];
    }
    DataZoomAxisInfo2.prototype.add = function(axisCmptIdx) {
      if (!this.indexMap[axisCmptIdx]) {
        this.indexList.push(axisCmptIdx);
        this.indexMap[axisCmptIdx] = true;
      }
    };
    return DataZoomAxisInfo2;
  }()
);
var DataZoomModel = (
  /** @class */
  function(_super) {
    __extends(DataZoomModel2, _super);
    function DataZoomModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = DataZoomModel2.type;
      _this._autoThrottle = true;
      _this._noTarget = true;
      _this._rangePropMode = ["percent", "percent"];
      return _this;
    }
    DataZoomModel2.prototype.init = function(option, parentModel, ecModel) {
      var inputRawOption = retrieveRawOption(option);
      this.settledOption = inputRawOption;
      this.mergeDefaultAndTheme(option, ecModel);
      this._doInit(inputRawOption);
    };
    DataZoomModel2.prototype.mergeOption = function(newOption) {
      var inputRawOption = retrieveRawOption(newOption);
      merge(this.option, newOption, true);
      merge(this.settledOption, inputRawOption, true);
      this._doInit(inputRawOption);
    };
    DataZoomModel2.prototype._doInit = function(inputRawOption) {
      var thisOption = this.option;
      this._setDefaultThrottle(inputRawOption);
      this._updateRangeUse(inputRawOption);
      var settledOption = this.settledOption;
      each([["start", "startValue"], ["end", "endValue"]], function(names, index) {
        if (this._rangePropMode[index] === "value") {
          thisOption[names[0]] = settledOption[names[0]] = null;
        }
      }, this);
      this._resetTarget();
    };
    DataZoomModel2.prototype._resetTarget = function() {
      var optionOrient = this.get("orient", true);
      var targetAxisIndexMap = this._targetAxisInfoMap = createHashMap();
      var hasAxisSpecified = this._fillSpecifiedTargetAxis(targetAxisIndexMap);
      if (hasAxisSpecified) {
        this._orient = optionOrient || this._makeAutoOrientByTargetAxis();
      } else {
        this._orient = optionOrient || "horizontal";
        this._fillAutoTargetAxisByOrient(targetAxisIndexMap, this._orient);
      }
      this._noTarget = true;
      targetAxisIndexMap.each(function(axisInfo) {
        if (axisInfo.indexList.length) {
          this._noTarget = false;
        }
      }, this);
    };
    DataZoomModel2.prototype._fillSpecifiedTargetAxis = function(targetAxisIndexMap) {
      var hasAxisSpecified = false;
      each(DATA_ZOOM_AXIS_DIMENSIONS, function(axisDim) {
        var refering = this.getReferringComponents(getAxisMainType(axisDim), MULTIPLE_REFERRING);
        if (!refering.specified) {
          return;
        }
        hasAxisSpecified = true;
        var axisInfo = new DataZoomAxisInfo();
        each(refering.models, function(axisModel) {
          axisInfo.add(axisModel.componentIndex);
        });
        targetAxisIndexMap.set(axisDim, axisInfo);
      }, this);
      return hasAxisSpecified;
    };
    DataZoomModel2.prototype._fillAutoTargetAxisByOrient = function(targetAxisIndexMap, orient) {
      var ecModel = this.ecModel;
      var needAuto = true;
      if (needAuto) {
        var axisDim = orient === "vertical" ? "y" : "x";
        var axisModels = ecModel.findComponents({
          mainType: axisDim + "Axis"
        });
        setParallelAxis(axisModels, axisDim);
      }
      if (needAuto) {
        var axisModels = ecModel.findComponents({
          mainType: "singleAxis",
          filter: function(axisModel) {
            return axisModel.get("orient", true) === orient;
          }
        });
        setParallelAxis(axisModels, "single");
      }
      function setParallelAxis(axisModels2, axisDim2) {
        var axisModel = axisModels2[0];
        if (!axisModel) {
          return;
        }
        var axisInfo = new DataZoomAxisInfo();
        axisInfo.add(axisModel.componentIndex);
        targetAxisIndexMap.set(axisDim2, axisInfo);
        needAuto = false;
        if (axisDim2 === "x" || axisDim2 === "y") {
          var gridModel_1 = axisModel.getReferringComponents("grid", SINGLE_REFERRING).models[0];
          gridModel_1 && each(axisModels2, function(axModel) {
            if (axisModel.componentIndex !== axModel.componentIndex && gridModel_1 === axModel.getReferringComponents("grid", SINGLE_REFERRING).models[0]) {
              axisInfo.add(axModel.componentIndex);
            }
          });
        }
      }
      if (needAuto) {
        each(DATA_ZOOM_AXIS_DIMENSIONS, function(axisDim2) {
          if (!needAuto) {
            return;
          }
          var axisModels2 = ecModel.findComponents({
            mainType: getAxisMainType(axisDim2),
            filter: function(axisModel) {
              return axisModel.get("type", true) === "category";
            }
          });
          if (axisModels2[0]) {
            var axisInfo = new DataZoomAxisInfo();
            axisInfo.add(axisModels2[0].componentIndex);
            targetAxisIndexMap.set(axisDim2, axisInfo);
            needAuto = false;
          }
        }, this);
      }
    };
    DataZoomModel2.prototype._makeAutoOrientByTargetAxis = function() {
      var dim;
      this.eachTargetAxis(function(axisDim) {
        !dim && (dim = axisDim);
      }, this);
      return dim === "y" ? "vertical" : "horizontal";
    };
    DataZoomModel2.prototype._setDefaultThrottle = function(inputRawOption) {
      if (inputRawOption.hasOwnProperty("throttle")) {
        this._autoThrottle = false;
      }
      if (this._autoThrottle) {
        var globalOption = this.ecModel.option;
        this.option.throttle = globalOption.animation && globalOption.animationDurationUpdate > 0 ? 100 : 20;
      }
    };
    DataZoomModel2.prototype._updateRangeUse = function(inputRawOption) {
      var rangePropMode = this._rangePropMode;
      var rangeModeInOption = this.get("rangeMode");
      each([["start", "startValue"], ["end", "endValue"]], function(names, index) {
        var percentSpecified = inputRawOption[names[0]] != null;
        var valueSpecified = inputRawOption[names[1]] != null;
        if (percentSpecified && !valueSpecified) {
          rangePropMode[index] = "percent";
        } else if (!percentSpecified && valueSpecified) {
          rangePropMode[index] = "value";
        } else if (rangeModeInOption) {
          rangePropMode[index] = rangeModeInOption[index];
        } else if (percentSpecified) {
          rangePropMode[index] = "percent";
        }
      });
    };
    DataZoomModel2.prototype.noTarget = function() {
      return this._noTarget;
    };
    DataZoomModel2.prototype.getFirstTargetAxisModel = function() {
      var firstAxisModel;
      this.eachTargetAxis(function(axisDim, axisIndex) {
        if (firstAxisModel == null) {
          firstAxisModel = this.ecModel.getComponent(getAxisMainType(axisDim), axisIndex);
        }
      }, this);
      return firstAxisModel;
    };
    DataZoomModel2.prototype.eachTargetAxis = function(callback, context) {
      this._targetAxisInfoMap.each(function(axisInfo, axisDim) {
        each(axisInfo.indexList, function(axisIndex) {
          callback.call(context, axisDim, axisIndex);
        });
      });
    };
    DataZoomModel2.prototype.getAxisProxy = function(axisDim, axisIndex) {
      var axisModel = this.getAxisModel(axisDim, axisIndex);
      if (axisModel) {
        return axisModel.__dzAxisProxy;
      }
    };
    DataZoomModel2.prototype.getAxisModel = function(axisDim, axisIndex) {
      if (true) {
        assert(axisDim && axisIndex != null);
      }
      var axisInfo = this._targetAxisInfoMap.get(axisDim);
      if (axisInfo && axisInfo.indexMap[axisIndex]) {
        return this.ecModel.getComponent(getAxisMainType(axisDim), axisIndex);
      }
    };
    DataZoomModel2.prototype.setRawRange = function(opt) {
      var thisOption = this.option;
      var settledOption = this.settledOption;
      each([["start", "startValue"], ["end", "endValue"]], function(names) {
        if (opt[names[0]] != null || opt[names[1]] != null) {
          thisOption[names[0]] = settledOption[names[0]] = opt[names[0]];
          thisOption[names[1]] = settledOption[names[1]] = opt[names[1]];
        }
      }, this);
      this._updateRangeUse(opt);
    };
    DataZoomModel2.prototype.setCalculatedRange = function(opt) {
      var option = this.option;
      each(["start", "startValue", "end", "endValue"], function(name) {
        option[name] = opt[name];
      });
    };
    DataZoomModel2.prototype.getPercentRange = function() {
      var axisProxy = this.findRepresentativeAxisProxy();
      if (axisProxy) {
        return axisProxy.getDataPercentWindow();
      }
    };
    DataZoomModel2.prototype.getValueRange = function(axisDim, axisIndex) {
      if (axisDim == null && axisIndex == null) {
        var axisProxy = this.findRepresentativeAxisProxy();
        if (axisProxy) {
          return axisProxy.getDataValueWindow();
        }
      } else {
        return this.getAxisProxy(axisDim, axisIndex).getDataValueWindow();
      }
    };
    DataZoomModel2.prototype.findRepresentativeAxisProxy = function(axisModel) {
      if (axisModel) {
        return axisModel.__dzAxisProxy;
      }
      var firstProxy;
      var axisDimList = this._targetAxisInfoMap.keys();
      for (var i = 0; i < axisDimList.length; i++) {
        var axisDim = axisDimList[i];
        var axisInfo = this._targetAxisInfoMap.get(axisDim);
        for (var j = 0; j < axisInfo.indexList.length; j++) {
          var proxy = this.getAxisProxy(axisDim, axisInfo.indexList[j]);
          if (proxy.hostedBy(this)) {
            return proxy;
          }
          if (!firstProxy) {
            firstProxy = proxy;
          }
        }
      }
      return firstProxy;
    };
    DataZoomModel2.prototype.getRangePropMode = function() {
      return this._rangePropMode.slice();
    };
    DataZoomModel2.prototype.getOrient = function() {
      if (true) {
        assert(this._orient);
      }
      return this._orient;
    };
    DataZoomModel2.type = "dataZoom";
    DataZoomModel2.dependencies = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "series", "toolbox"];
    DataZoomModel2.defaultOption = {
      // zlevel: 0,
      z: 4,
      filterMode: "filter",
      start: 0,
      end: 100
    };
    return DataZoomModel2;
  }(Component_default)
);
function retrieveRawOption(option) {
  var ret = {};
  each(["start", "end", "startValue", "endValue", "throttle"], function(name) {
    option.hasOwnProperty(name) && (ret[name] = option[name]);
  });
  return ret;
}
var DataZoomModel_default = DataZoomModel;

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/InsideZoomModel.js
var InsideZoomModel = (
  /** @class */
  function(_super) {
    __extends(InsideZoomModel2, _super);
    function InsideZoomModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = InsideZoomModel2.type;
      return _this;
    }
    InsideZoomModel2.type = "dataZoom.inside";
    InsideZoomModel2.defaultOption = inheritDefaultOption(DataZoomModel_default.defaultOption, {
      disabled: false,
      zoomLock: false,
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: false,
      preventDefaultMouseMove: true
    });
    return InsideZoomModel2;
  }(DataZoomModel_default)
);
var InsideZoomModel_default = InsideZoomModel;

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/DataZoomView.js
var DataZoomView = (
  /** @class */
  function(_super) {
    __extends(DataZoomView2, _super);
    function DataZoomView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = DataZoomView2.type;
      return _this;
    }
    DataZoomView2.prototype.render = function(dataZoomModel, ecModel, api, payload) {
      this.dataZoomModel = dataZoomModel;
      this.ecModel = ecModel;
      this.api = api;
    };
    DataZoomView2.type = "dataZoom";
    return DataZoomView2;
  }(Component_default2)
);
var DataZoomView_default = DataZoomView;

// ../../../PrePayApp/node_modules/echarts/lib/component/helper/sliderMove.js
function sliderMove(delta, handleEnds, extent, handleIndex, minSpan, maxSpan) {
  delta = delta || 0;
  var extentSpan = extent[1] - extent[0];
  if (minSpan != null) {
    minSpan = restrict(minSpan, [0, extentSpan]);
  }
  if (maxSpan != null) {
    maxSpan = Math.max(maxSpan, minSpan != null ? minSpan : 0);
  }
  if (handleIndex === "all") {
    var handleSpan = Math.abs(handleEnds[1] - handleEnds[0]);
    handleSpan = restrict(handleSpan, [0, extentSpan]);
    minSpan = maxSpan = restrict(handleSpan, [minSpan, maxSpan]);
    handleIndex = 0;
  }
  handleEnds[0] = restrict(handleEnds[0], extent);
  handleEnds[1] = restrict(handleEnds[1], extent);
  var originalDistSign = getSpanSign(handleEnds, handleIndex);
  handleEnds[handleIndex] += delta;
  var extentMinSpan = minSpan || 0;
  var realExtent = extent.slice();
  originalDistSign.sign < 0 ? realExtent[0] += extentMinSpan : realExtent[1] -= extentMinSpan;
  handleEnds[handleIndex] = restrict(handleEnds[handleIndex], realExtent);
  var currDistSign;
  currDistSign = getSpanSign(handleEnds, handleIndex);
  if (minSpan != null && (currDistSign.sign !== originalDistSign.sign || currDistSign.span < minSpan)) {
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + originalDistSign.sign * minSpan;
  }
  currDistSign = getSpanSign(handleEnds, handleIndex);
  if (maxSpan != null && currDistSign.span > maxSpan) {
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + currDistSign.sign * maxSpan;
  }
  return handleEnds;
}
function getSpanSign(handleEnds, handleIndex) {
  var dist = handleEnds[handleIndex] - handleEnds[1 - handleIndex];
  return {
    span: Math.abs(dist),
    sign: dist > 0 ? -1 : dist < 0 ? 1 : handleIndex ? -1 : 1
  };
}
function restrict(value, extend) {
  return Math.min(extend[1] != null ? extend[1] : Infinity, Math.max(extend[0] != null ? extend[0] : -Infinity, value));
}

// ../../../PrePayApp/node_modules/echarts/lib/component/helper/interactionMutex.js
var ATTR = "\0_ec_interaction_mutex";
function take(zr, resourceKey, userKey) {
  var store = getStore(zr);
  store[resourceKey] = userKey;
}
function release(zr, resourceKey, userKey) {
  var store = getStore(zr);
  var uKey = store[resourceKey];
  if (uKey === userKey) {
    store[resourceKey] = null;
  }
}
function isTaken(zr, resourceKey) {
  return !!getStore(zr)[resourceKey];
}
function getStore(zr) {
  return zr[ATTR] || (zr[ATTR] = {});
}
registerAction({
  type: "takeGlobalCursor",
  event: "globalCursorTaken",
  update: "update"
}, noop);

// ../../../PrePayApp/node_modules/echarts/lib/component/helper/RoamController.js
var RoamController = (
  /** @class */
  function(_super) {
    __extends(RoamController2, _super);
    function RoamController2(zr) {
      var _this = _super.call(this) || this;
      _this._zr = zr;
      var mousedownHandler = bind(_this._mousedownHandler, _this);
      var mousemoveHandler = bind(_this._mousemoveHandler, _this);
      var mouseupHandler = bind(_this._mouseupHandler, _this);
      var mousewheelHandler = bind(_this._mousewheelHandler, _this);
      var pinchHandler = bind(_this._pinchHandler, _this);
      _this.enable = function(controlType, opt) {
        this.disable();
        this._opt = defaults(clone(opt) || {}, {
          zoomOnMouseWheel: true,
          moveOnMouseMove: true,
          // By default, wheel do not trigger move.
          moveOnMouseWheel: false,
          preventDefaultMouseMove: true
        });
        if (controlType == null) {
          controlType = true;
        }
        if (controlType === true || controlType === "move" || controlType === "pan") {
          zr.on("mousedown", mousedownHandler);
          zr.on("mousemove", mousemoveHandler);
          zr.on("mouseup", mouseupHandler);
        }
        if (controlType === true || controlType === "scale" || controlType === "zoom") {
          zr.on("mousewheel", mousewheelHandler);
          zr.on("pinch", pinchHandler);
        }
      };
      _this.disable = function() {
        zr.off("mousedown", mousedownHandler);
        zr.off("mousemove", mousemoveHandler);
        zr.off("mouseup", mouseupHandler);
        zr.off("mousewheel", mousewheelHandler);
        zr.off("pinch", pinchHandler);
      };
      return _this;
    }
    RoamController2.prototype.isDragging = function() {
      return this._dragging;
    };
    RoamController2.prototype.isPinching = function() {
      return this._pinching;
    };
    RoamController2.prototype.setPointerChecker = function(pointerChecker) {
      this.pointerChecker = pointerChecker;
    };
    RoamController2.prototype.dispose = function() {
      this.disable();
    };
    RoamController2.prototype._mousedownHandler = function(e) {
      if (isMiddleOrRightButtonOnMouseUpDown(e)) {
        return;
      }
      var el = e.target;
      while (el) {
        if (el.draggable) {
          return;
        }
        el = el.__hostTarget || el.parent;
      }
      var x = e.offsetX;
      var y = e.offsetY;
      if (this.pointerChecker && this.pointerChecker(e, x, y)) {
        this._x = x;
        this._y = y;
        this._dragging = true;
      }
    };
    RoamController2.prototype._mousemoveHandler = function(e) {
      if (!this._dragging || !isAvailableBehavior("moveOnMouseMove", e, this._opt) || e.gestureEvent === "pinch" || isTaken(this._zr, "globalPan")) {
        return;
      }
      var x = e.offsetX;
      var y = e.offsetY;
      var oldX = this._x;
      var oldY = this._y;
      var dx = x - oldX;
      var dy = y - oldY;
      this._x = x;
      this._y = y;
      this._opt.preventDefaultMouseMove && stop(e.event);
      trigger(this, "pan", "moveOnMouseMove", e, {
        dx,
        dy,
        oldX,
        oldY,
        newX: x,
        newY: y,
        isAvailableBehavior: null
      });
    };
    RoamController2.prototype._mouseupHandler = function(e) {
      if (!isMiddleOrRightButtonOnMouseUpDown(e)) {
        this._dragging = false;
      }
    };
    RoamController2.prototype._mousewheelHandler = function(e) {
      var shouldZoom = isAvailableBehavior("zoomOnMouseWheel", e, this._opt);
      var shouldMove = isAvailableBehavior("moveOnMouseWheel", e, this._opt);
      var wheelDelta = e.wheelDelta;
      var absWheelDeltaDelta = Math.abs(wheelDelta);
      var originX = e.offsetX;
      var originY = e.offsetY;
      if (wheelDelta === 0 || !shouldZoom && !shouldMove) {
        return;
      }
      if (shouldZoom) {
        var factor = absWheelDeltaDelta > 3 ? 1.4 : absWheelDeltaDelta > 1 ? 1.2 : 1.1;
        var scale = wheelDelta > 0 ? factor : 1 / factor;
        checkPointerAndTrigger(this, "zoom", "zoomOnMouseWheel", e, {
          scale,
          originX,
          originY,
          isAvailableBehavior: null
        });
      }
      if (shouldMove) {
        var absDelta = Math.abs(wheelDelta);
        var scrollDelta = (wheelDelta > 0 ? 1 : -1) * (absDelta > 3 ? 0.4 : absDelta > 1 ? 0.15 : 0.05);
        checkPointerAndTrigger(this, "scrollMove", "moveOnMouseWheel", e, {
          scrollDelta,
          originX,
          originY,
          isAvailableBehavior: null
        });
      }
    };
    RoamController2.prototype._pinchHandler = function(e) {
      if (isTaken(this._zr, "globalPan")) {
        return;
      }
      var scale = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
      checkPointerAndTrigger(this, "zoom", null, e, {
        scale,
        originX: e.pinchX,
        originY: e.pinchY,
        isAvailableBehavior: null
      });
    };
    return RoamController2;
  }(Eventful_default)
);
function checkPointerAndTrigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  if (controller.pointerChecker && controller.pointerChecker(e, contollerEvent.originX, contollerEvent.originY)) {
    stop(e.event);
    trigger(controller, eventName, behaviorToCheck, e, contollerEvent);
  }
}
function trigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  contollerEvent.isAvailableBehavior = bind(isAvailableBehavior, null, behaviorToCheck, e);
  controller.trigger(eventName, contollerEvent);
}
function isAvailableBehavior(behaviorToCheck, e, settings) {
  var setting = settings[behaviorToCheck];
  return !behaviorToCheck || setting && (!isString(setting) || e.event[setting + "Key"]);
}
var RoamController_default = RoamController;

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/roams.js
var inner = makeInner();
function setViewInfoToCoordSysRecord(api, dataZoomModel, getRange) {
  inner(api).coordSysRecordMap.each(function(coordSysRecord) {
    var dzInfo = coordSysRecord.dataZoomInfoMap.get(dataZoomModel.uid);
    if (dzInfo) {
      dzInfo.getRange = getRange;
    }
  });
}
function disposeCoordSysRecordIfNeeded(api, dataZoomModel) {
  var coordSysRecordMap = inner(api).coordSysRecordMap;
  var coordSysKeyArr = coordSysRecordMap.keys();
  for (var i = 0; i < coordSysKeyArr.length; i++) {
    var coordSysKey = coordSysKeyArr[i];
    var coordSysRecord = coordSysRecordMap.get(coordSysKey);
    var dataZoomInfoMap = coordSysRecord.dataZoomInfoMap;
    if (dataZoomInfoMap) {
      var dzUid = dataZoomModel.uid;
      var dzInfo = dataZoomInfoMap.get(dzUid);
      if (dzInfo) {
        dataZoomInfoMap.removeKey(dzUid);
        if (!dataZoomInfoMap.keys().length) {
          disposeCoordSysRecord(coordSysRecordMap, coordSysRecord);
        }
      }
    }
  }
}
function disposeCoordSysRecord(coordSysRecordMap, coordSysRecord) {
  if (coordSysRecord) {
    coordSysRecordMap.removeKey(coordSysRecord.model.uid);
    var controller = coordSysRecord.controller;
    controller && controller.dispose();
  }
}
function createCoordSysRecord(api, coordSysModel) {
  var coordSysRecord = {
    model: coordSysModel,
    containsPoint: curry(containsPoint, coordSysModel),
    dispatchAction: curry(dispatchAction, api),
    dataZoomInfoMap: null,
    controller: null
  };
  var controller = coordSysRecord.controller = new RoamController_default(api.getZr());
  each(["pan", "zoom", "scrollMove"], function(eventName) {
    controller.on(eventName, function(event) {
      var batch = [];
      coordSysRecord.dataZoomInfoMap.each(function(dzInfo) {
        if (!event.isAvailableBehavior(dzInfo.model.option)) {
          return;
        }
        var method = (dzInfo.getRange || {})[eventName];
        var range = method && method(dzInfo.dzReferCoordSysInfo, coordSysRecord.model.mainType, coordSysRecord.controller, event);
        !dzInfo.model.get("disabled", true) && range && batch.push({
          dataZoomId: dzInfo.model.id,
          start: range[0],
          end: range[1]
        });
      });
      batch.length && coordSysRecord.dispatchAction(batch);
    });
  });
  return coordSysRecord;
}
function dispatchAction(api, batch) {
  if (!api.isDisposed()) {
    api.dispatchAction({
      type: "dataZoom",
      animation: {
        easing: "cubicOut",
        duration: 100
      },
      batch
    });
  }
}
function containsPoint(coordSysModel, e, x, y) {
  return coordSysModel.coordinateSystem.containPoint([x, y]);
}
function mergeControllerParams(dataZoomInfoMap) {
  var controlType;
  var prefix = "type_";
  var typePriority = {
    "type_true": 2,
    "type_move": 1,
    "type_false": 0,
    "type_undefined": -1
  };
  var preventDefaultMouseMove = true;
  dataZoomInfoMap.each(function(dataZoomInfo) {
    var dataZoomModel = dataZoomInfo.model;
    var oneType = dataZoomModel.get("disabled", true) ? false : dataZoomModel.get("zoomLock", true) ? "move" : true;
    if (typePriority[prefix + oneType] > typePriority[prefix + controlType]) {
      controlType = oneType;
    }
    preventDefaultMouseMove = preventDefaultMouseMove && dataZoomModel.get("preventDefaultMouseMove", true);
  });
  return {
    controlType,
    opt: {
      // RoamController will enable all of these functionalities,
      // and the final behavior is determined by its event listener
      // provided by each inside zoom.
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
      preventDefaultMouseMove: !!preventDefaultMouseMove
    }
  };
}
function installDataZoomRoamProcessor(registers) {
  registers.registerProcessor(registers.PRIORITY.PROCESSOR.FILTER, function(ecModel, api) {
    var apiInner = inner(api);
    var coordSysRecordMap = apiInner.coordSysRecordMap || (apiInner.coordSysRecordMap = createHashMap());
    coordSysRecordMap.each(function(coordSysRecord) {
      coordSysRecord.dataZoomInfoMap = null;
    });
    ecModel.eachComponent({
      mainType: "dataZoom",
      subType: "inside"
    }, function(dataZoomModel) {
      var dzReferCoordSysWrap = collectReferCoordSysModelInfo(dataZoomModel);
      each(dzReferCoordSysWrap.infoList, function(dzCoordSysInfo) {
        var coordSysUid = dzCoordSysInfo.model.uid;
        var coordSysRecord = coordSysRecordMap.get(coordSysUid) || coordSysRecordMap.set(coordSysUid, createCoordSysRecord(api, dzCoordSysInfo.model));
        var dataZoomInfoMap = coordSysRecord.dataZoomInfoMap || (coordSysRecord.dataZoomInfoMap = createHashMap());
        dataZoomInfoMap.set(dataZoomModel.uid, {
          dzReferCoordSysInfo: dzCoordSysInfo,
          model: dataZoomModel,
          getRange: null
        });
      });
    });
    coordSysRecordMap.each(function(coordSysRecord) {
      var controller = coordSysRecord.controller;
      var firstDzInfo;
      var dataZoomInfoMap = coordSysRecord.dataZoomInfoMap;
      if (dataZoomInfoMap) {
        var firstDzKey = dataZoomInfoMap.keys()[0];
        if (firstDzKey != null) {
          firstDzInfo = dataZoomInfoMap.get(firstDzKey);
        }
      }
      if (!firstDzInfo) {
        disposeCoordSysRecord(coordSysRecordMap, coordSysRecord);
        return;
      }
      var controllerParams = mergeControllerParams(dataZoomInfoMap);
      controller.enable(controllerParams.controlType, controllerParams.opt);
      controller.setPointerChecker(coordSysRecord.containsPoint);
      createOrUpdate(coordSysRecord, "dispatchAction", firstDzInfo.model.get("throttle", true), "fixRate");
    });
  });
}

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/InsideZoomView.js
var InsideZoomView = (
  /** @class */
  function(_super) {
    __extends(InsideZoomView2, _super);
    function InsideZoomView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = "dataZoom.inside";
      return _this;
    }
    InsideZoomView2.prototype.render = function(dataZoomModel, ecModel, api) {
      _super.prototype.render.apply(this, arguments);
      if (dataZoomModel.noTarget()) {
        this._clear();
        return;
      }
      this.range = dataZoomModel.getPercentRange();
      setViewInfoToCoordSysRecord(api, dataZoomModel, {
        pan: bind(getRangeHandlers.pan, this),
        zoom: bind(getRangeHandlers.zoom, this),
        scrollMove: bind(getRangeHandlers.scrollMove, this)
      });
    };
    InsideZoomView2.prototype.dispose = function() {
      this._clear();
      _super.prototype.dispose.apply(this, arguments);
    };
    InsideZoomView2.prototype._clear = function() {
      disposeCoordSysRecordIfNeeded(this.api, this.dataZoomModel);
      this.range = null;
    };
    InsideZoomView2.type = "dataZoom.inside";
    return InsideZoomView2;
  }(DataZoomView_default)
);
var getRangeHandlers = {
  zoom: function(coordSysInfo, coordSysMainType, controller, e) {
    var lastRange = this.range;
    var range = lastRange.slice();
    var axisModel = coordSysInfo.axisModels[0];
    if (!axisModel) {
      return;
    }
    var directionInfo = getDirectionInfo[coordSysMainType](null, [e.originX, e.originY], axisModel, controller, coordSysInfo);
    var percentPoint = (directionInfo.signal > 0 ? directionInfo.pixelStart + directionInfo.pixelLength - directionInfo.pixel : directionInfo.pixel - directionInfo.pixelStart) / directionInfo.pixelLength * (range[1] - range[0]) + range[0];
    var scale = Math.max(1 / e.scale, 0);
    range[0] = (range[0] - percentPoint) * scale + percentPoint;
    range[1] = (range[1] - percentPoint) * scale + percentPoint;
    var minMaxSpan = this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
    sliderMove(0, range, [0, 100], 0, minMaxSpan.minSpan, minMaxSpan.maxSpan);
    this.range = range;
    if (lastRange[0] !== range[0] || lastRange[1] !== range[1]) {
      return range;
    }
  },
  pan: makeMover(function(range, axisModel, coordSysInfo, coordSysMainType, controller, e) {
    var directionInfo = getDirectionInfo[coordSysMainType]([e.oldX, e.oldY], [e.newX, e.newY], axisModel, controller, coordSysInfo);
    return directionInfo.signal * (range[1] - range[0]) * directionInfo.pixel / directionInfo.pixelLength;
  }),
  scrollMove: makeMover(function(range, axisModel, coordSysInfo, coordSysMainType, controller, e) {
    var directionInfo = getDirectionInfo[coordSysMainType]([0, 0], [e.scrollDelta, e.scrollDelta], axisModel, controller, coordSysInfo);
    return directionInfo.signal * (range[1] - range[0]) * e.scrollDelta;
  })
};
function makeMover(getPercentDelta) {
  return function(coordSysInfo, coordSysMainType, controller, e) {
    var lastRange = this.range;
    var range = lastRange.slice();
    var axisModel = coordSysInfo.axisModels[0];
    if (!axisModel) {
      return;
    }
    var percentDelta = getPercentDelta(range, axisModel, coordSysInfo, coordSysMainType, controller, e);
    sliderMove(percentDelta, range, [0, 100], "all");
    this.range = range;
    if (lastRange[0] !== range[0] || lastRange[1] !== range[1]) {
      return range;
    }
  };
}
var getDirectionInfo = {
  grid: function(oldPoint, newPoint, axisModel, controller, coordSysInfo) {
    var axis = axisModel.axis;
    var ret = {};
    var rect = coordSysInfo.model.coordinateSystem.getRect();
    oldPoint = oldPoint || [0, 0];
    if (axis.dim === "x") {
      ret.pixel = newPoint[0] - oldPoint[0];
      ret.pixelLength = rect.width;
      ret.pixelStart = rect.x;
      ret.signal = axis.inverse ? 1 : -1;
    } else {
      ret.pixel = newPoint[1] - oldPoint[1];
      ret.pixelLength = rect.height;
      ret.pixelStart = rect.y;
      ret.signal = axis.inverse ? -1 : 1;
    }
    return ret;
  },
  polar: function(oldPoint, newPoint, axisModel, controller, coordSysInfo) {
    var axis = axisModel.axis;
    var ret = {};
    var polar = coordSysInfo.model.coordinateSystem;
    var radiusExtent = polar.getRadiusAxis().getExtent();
    var angleExtent = polar.getAngleAxis().getExtent();
    oldPoint = oldPoint ? polar.pointToCoord(oldPoint) : [0, 0];
    newPoint = polar.pointToCoord(newPoint);
    if (axisModel.mainType === "radiusAxis") {
      ret.pixel = newPoint[0] - oldPoint[0];
      ret.pixelLength = radiusExtent[1] - radiusExtent[0];
      ret.pixelStart = radiusExtent[0];
      ret.signal = axis.inverse ? 1 : -1;
    } else {
      ret.pixel = newPoint[1] - oldPoint[1];
      ret.pixelLength = angleExtent[1] - angleExtent[0];
      ret.pixelStart = angleExtent[0];
      ret.signal = axis.inverse ? -1 : 1;
    }
    return ret;
  },
  singleAxis: function(oldPoint, newPoint, axisModel, controller, coordSysInfo) {
    var axis = axisModel.axis;
    var rect = coordSysInfo.model.coordinateSystem.getRect();
    var ret = {};
    oldPoint = oldPoint || [0, 0];
    if (axis.orient === "horizontal") {
      ret.pixel = newPoint[0] - oldPoint[0];
      ret.pixelLength = rect.width;
      ret.pixelStart = rect.x;
      ret.signal = axis.inverse ? 1 : -1;
    } else {
      ret.pixel = newPoint[1] - oldPoint[1];
      ret.pixelLength = rect.height;
      ret.pixelStart = rect.y;
      ret.signal = axis.inverse ? -1 : 1;
    }
    return ret;
  }
};
var InsideZoomView_default = InsideZoomView;

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/AxisProxy.js
var each2 = each;
var asc2 = asc;
var AxisProxy = (
  /** @class */
  function() {
    function AxisProxy2(dimName, axisIndex, dataZoomModel, ecModel) {
      this._dimName = dimName;
      this._axisIndex = axisIndex;
      this.ecModel = ecModel;
      this._dataZoomModel = dataZoomModel;
    }
    AxisProxy2.prototype.hostedBy = function(dataZoomModel) {
      return this._dataZoomModel === dataZoomModel;
    };
    AxisProxy2.prototype.getDataValueWindow = function() {
      return this._valueWindow.slice();
    };
    AxisProxy2.prototype.getDataPercentWindow = function() {
      return this._percentWindow.slice();
    };
    AxisProxy2.prototype.getTargetSeriesModels = function() {
      var seriesModels = [];
      this.ecModel.eachSeries(function(seriesModel) {
        if (isCoordSupported(seriesModel)) {
          var axisMainType = getAxisMainType(this._dimName);
          var axisModel = seriesModel.getReferringComponents(axisMainType, SINGLE_REFERRING).models[0];
          if (axisModel && this._axisIndex === axisModel.componentIndex) {
            seriesModels.push(seriesModel);
          }
        }
      }, this);
      return seriesModels;
    };
    AxisProxy2.prototype.getAxisModel = function() {
      return this.ecModel.getComponent(this._dimName + "Axis", this._axisIndex);
    };
    AxisProxy2.prototype.getMinMaxSpan = function() {
      return clone(this._minMaxSpan);
    };
    AxisProxy2.prototype.calculateDataWindow = function(opt) {
      var dataExtent = this._dataExtent;
      var axisModel = this.getAxisModel();
      var scale = axisModel.axis.scale;
      var rangePropMode = this._dataZoomModel.getRangePropMode();
      var percentExtent = [0, 100];
      var percentWindow = [];
      var valueWindow = [];
      var hasPropModeValue;
      each2(["start", "end"], function(prop, idx) {
        var boundPercent = opt[prop];
        var boundValue = opt[prop + "Value"];
        if (rangePropMode[idx] === "percent") {
          boundPercent == null && (boundPercent = percentExtent[idx]);
          boundValue = scale.parse(linearMap(boundPercent, percentExtent, dataExtent));
        } else {
          hasPropModeValue = true;
          boundValue = boundValue == null ? dataExtent[idx] : scale.parse(boundValue);
          boundPercent = linearMap(boundValue, dataExtent, percentExtent);
        }
        valueWindow[idx] = boundValue == null || isNaN(boundValue) ? dataExtent[idx] : boundValue;
        percentWindow[idx] = boundPercent == null || isNaN(boundPercent) ? percentExtent[idx] : boundPercent;
      });
      asc2(valueWindow);
      asc2(percentWindow);
      var spans = this._minMaxSpan;
      hasPropModeValue ? restrictSet(valueWindow, percentWindow, dataExtent, percentExtent, false) : restrictSet(percentWindow, valueWindow, percentExtent, dataExtent, true);
      function restrictSet(fromWindow, toWindow, fromExtent, toExtent, toValue) {
        var suffix = toValue ? "Span" : "ValueSpan";
        sliderMove(0, fromWindow, fromExtent, "all", spans["min" + suffix], spans["max" + suffix]);
        for (var i = 0; i < 2; i++) {
          toWindow[i] = linearMap(fromWindow[i], fromExtent, toExtent, true);
          toValue && (toWindow[i] = scale.parse(toWindow[i]));
        }
      }
      return {
        valueWindow,
        percentWindow
      };
    };
    AxisProxy2.prototype.reset = function(dataZoomModel) {
      if (dataZoomModel !== this._dataZoomModel) {
        return;
      }
      var targetSeries = this.getTargetSeriesModels();
      this._dataExtent = calculateDataExtent(this, this._dimName, targetSeries);
      this._updateMinMaxSpan();
      var dataWindow = this.calculateDataWindow(dataZoomModel.settledOption);
      this._valueWindow = dataWindow.valueWindow;
      this._percentWindow = dataWindow.percentWindow;
      this._setAxisModel();
    };
    AxisProxy2.prototype.filterData = function(dataZoomModel, api) {
      if (dataZoomModel !== this._dataZoomModel) {
        return;
      }
      var axisDim = this._dimName;
      var seriesModels = this.getTargetSeriesModels();
      var filterMode = dataZoomModel.get("filterMode");
      var valueWindow = this._valueWindow;
      if (filterMode === "none") {
        return;
      }
      each2(seriesModels, function(seriesModel) {
        var seriesData = seriesModel.getData();
        var dataDims = seriesData.mapDimensionsAll(axisDim);
        if (!dataDims.length) {
          return;
        }
        if (filterMode === "weakFilter") {
          var store_1 = seriesData.getStore();
          var dataDimIndices_1 = map(dataDims, function(dim) {
            return seriesData.getDimensionIndex(dim);
          }, seriesData);
          seriesData.filterSelf(function(dataIndex) {
            var leftOut;
            var rightOut;
            var hasValue;
            for (var i = 0; i < dataDims.length; i++) {
              var value = store_1.get(dataDimIndices_1[i], dataIndex);
              var thisHasValue = !isNaN(value);
              var thisLeftOut = value < valueWindow[0];
              var thisRightOut = value > valueWindow[1];
              if (thisHasValue && !thisLeftOut && !thisRightOut) {
                return true;
              }
              thisHasValue && (hasValue = true);
              thisLeftOut && (leftOut = true);
              thisRightOut && (rightOut = true);
            }
            return hasValue && leftOut && rightOut;
          });
        } else {
          each2(dataDims, function(dim) {
            if (filterMode === "empty") {
              seriesModel.setData(seriesData = seriesData.map(dim, function(value) {
                return !isInWindow(value) ? NaN : value;
              }));
            } else {
              var range = {};
              range[dim] = valueWindow;
              seriesData.selectRange(range);
            }
          });
        }
        each2(dataDims, function(dim) {
          seriesData.setApproximateExtent(valueWindow, dim);
        });
      });
      function isInWindow(value) {
        return value >= valueWindow[0] && value <= valueWindow[1];
      }
    };
    AxisProxy2.prototype._updateMinMaxSpan = function() {
      var minMaxSpan = this._minMaxSpan = {};
      var dataZoomModel = this._dataZoomModel;
      var dataExtent = this._dataExtent;
      each2(["min", "max"], function(minMax) {
        var percentSpan = dataZoomModel.get(minMax + "Span");
        var valueSpan = dataZoomModel.get(minMax + "ValueSpan");
        valueSpan != null && (valueSpan = this.getAxisModel().axis.scale.parse(valueSpan));
        if (valueSpan != null) {
          percentSpan = linearMap(dataExtent[0] + valueSpan, dataExtent, [0, 100], true);
        } else if (percentSpan != null) {
          valueSpan = linearMap(percentSpan, [0, 100], dataExtent, true) - dataExtent[0];
        }
        minMaxSpan[minMax + "Span"] = percentSpan;
        minMaxSpan[minMax + "ValueSpan"] = valueSpan;
      }, this);
    };
    AxisProxy2.prototype._setAxisModel = function() {
      var axisModel = this.getAxisModel();
      var percentWindow = this._percentWindow;
      var valueWindow = this._valueWindow;
      if (!percentWindow) {
        return;
      }
      var precision = getPixelPrecision(valueWindow, [0, 500]);
      precision = Math.min(precision, 20);
      var rawExtentInfo = axisModel.axis.scale.rawExtentInfo;
      if (percentWindow[0] !== 0) {
        rawExtentInfo.setDeterminedMinMax("min", +valueWindow[0].toFixed(precision));
      }
      if (percentWindow[1] !== 100) {
        rawExtentInfo.setDeterminedMinMax("max", +valueWindow[1].toFixed(precision));
      }
      rawExtentInfo.freeze();
    };
    return AxisProxy2;
  }()
);
function calculateDataExtent(axisProxy, axisDim, seriesModels) {
  var dataExtent = [Infinity, -Infinity];
  each2(seriesModels, function(seriesModel) {
    unionAxisExtentFromData(dataExtent, seriesModel.getData(), axisDim);
  });
  var axisModel = axisProxy.getAxisModel();
  var rawExtentResult = ensureScaleRawExtentInfo(axisModel.axis.scale, axisModel, dataExtent).calculate();
  return [rawExtentResult.min, rawExtentResult.max];
}
var AxisProxy_default = AxisProxy;

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/dataZoomProcessor.js
var dataZoomProcessor = {
  // `dataZoomProcessor` will only be performed in needed series. Consider if
  // there is a line series and a pie series, it is better not to update the
  // line series if only pie series is needed to be updated.
  getTargetSeries: function(ecModel) {
    function eachAxisModel(cb) {
      ecModel.eachComponent("dataZoom", function(dataZoomModel) {
        dataZoomModel.eachTargetAxis(function(axisDim, axisIndex) {
          var axisModel = ecModel.getComponent(getAxisMainType(axisDim), axisIndex);
          cb(axisDim, axisIndex, axisModel, dataZoomModel);
        });
      });
    }
    eachAxisModel(function(axisDim, axisIndex, axisModel, dataZoomModel) {
      axisModel.__dzAxisProxy = null;
    });
    var proxyList = [];
    eachAxisModel(function(axisDim, axisIndex, axisModel, dataZoomModel) {
      if (!axisModel.__dzAxisProxy) {
        axisModel.__dzAxisProxy = new AxisProxy_default(axisDim, axisIndex, dataZoomModel, ecModel);
        proxyList.push(axisModel.__dzAxisProxy);
      }
    });
    var seriesModelMap = createHashMap();
    each(proxyList, function(axisProxy) {
      each(axisProxy.getTargetSeriesModels(), function(seriesModel) {
        seriesModelMap.set(seriesModel.uid, seriesModel);
      });
    });
    return seriesModelMap;
  },
  // Consider appendData, where filter should be performed. Because data process is
  // in block mode currently, it is not need to worry about that the overallProgress
  // execute every frame.
  overallReset: function(ecModel, api) {
    ecModel.eachComponent("dataZoom", function(dataZoomModel) {
      dataZoomModel.eachTargetAxis(function(axisDim, axisIndex) {
        dataZoomModel.getAxisProxy(axisDim, axisIndex).reset(dataZoomModel);
      });
      dataZoomModel.eachTargetAxis(function(axisDim, axisIndex) {
        dataZoomModel.getAxisProxy(axisDim, axisIndex).filterData(dataZoomModel, api);
      });
    });
    ecModel.eachComponent("dataZoom", function(dataZoomModel) {
      var axisProxy = dataZoomModel.findRepresentativeAxisProxy();
      if (axisProxy) {
        var percentRange = axisProxy.getDataPercentWindow();
        var valueRange = axisProxy.getDataValueWindow();
        dataZoomModel.setCalculatedRange({
          start: percentRange[0],
          end: percentRange[1],
          startValue: valueRange[0],
          endValue: valueRange[1]
        });
      }
    });
  }
};
var dataZoomProcessor_default = dataZoomProcessor;

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/dataZoomAction.js
function installDataZoomAction(registers) {
  registers.registerAction("dataZoom", function(payload, ecModel) {
    var effectedModels = findEffectedDataZooms(ecModel, payload);
    each(effectedModels, function(dataZoomModel) {
      dataZoomModel.setRawRange({
        start: payload.start,
        end: payload.end,
        startValue: payload.startValue,
        endValue: payload.endValue
      });
    });
  });
}

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/installCommon.js
var installed = false;
function installCommon(registers) {
  if (installed) {
    return;
  }
  installed = true;
  registers.registerProcessor(registers.PRIORITY.PROCESSOR.FILTER, dataZoomProcessor_default);
  installDataZoomAction(registers);
  registers.registerSubTypeDefaulter("dataZoom", function() {
    return "slider";
  });
}

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/installDataZoomInside.js
function install(registers) {
  installCommon(registers);
  registers.registerComponentModel(InsideZoomModel_default);
  registers.registerComponentView(InsideZoomView_default);
  installDataZoomRoamProcessor(registers);
}

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/SliderZoomModel.js
var SliderZoomModel = (
  /** @class */
  function(_super) {
    __extends(SliderZoomModel2, _super);
    function SliderZoomModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = SliderZoomModel2.type;
      return _this;
    }
    SliderZoomModel2.type = "dataZoom.slider";
    SliderZoomModel2.layoutMode = "box";
    SliderZoomModel2.defaultOption = inheritDefaultOption(DataZoomModel_default.defaultOption, {
      show: true,
      // deault value can only be drived in view stage.
      right: "ph",
      top: "ph",
      width: "ph",
      height: "ph",
      left: null,
      bottom: null,
      borderColor: "#d2dbee",
      borderRadius: 3,
      backgroundColor: "rgba(47,69,84,0)",
      // dataBackgroundColor: '#ddd',
      dataBackground: {
        lineStyle: {
          color: "#d2dbee",
          width: 0.5
        },
        areaStyle: {
          color: "#d2dbee",
          opacity: 0.2
        }
      },
      selectedDataBackground: {
        lineStyle: {
          color: "#8fb0f7",
          width: 0.5
        },
        areaStyle: {
          color: "#8fb0f7",
          opacity: 0.2
        }
      },
      // Color of selected window.
      fillerColor: "rgba(135,175,274,0.2)",
      handleIcon: "path://M-9.35,34.56V42m0-40V9.5m-2,0h4a2,2,0,0,1,2,2v21a2,2,0,0,1-2,2h-4a2,2,0,0,1-2-2v-21A2,2,0,0,1-11.35,9.5Z",
      // Percent of the slider height
      handleSize: "100%",
      handleStyle: {
        color: "#fff",
        borderColor: "#ACB8D1"
      },
      moveHandleSize: 7,
      moveHandleIcon: "path://M-320.9-50L-320.9-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-348-41-339-50-320.9-50z M-212.3-50L-212.3-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-239.4-41-230.4-50-212.3-50z M-103.7-50L-103.7-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-130.9-41-121.8-50-103.7-50z",
      moveHandleStyle: {
        color: "#D2DBEE",
        opacity: 0.7
      },
      showDetail: true,
      showDataShadow: "auto",
      realtime: true,
      zoomLock: false,
      textStyle: {
        color: "#6E7079"
      },
      brushSelect: true,
      brushStyle: {
        color: "rgba(135,175,274,0.15)"
      },
      emphasis: {
        handleLabel: {
          show: true
        },
        handleStyle: {
          borderColor: "#8FB0F7"
        },
        moveHandleStyle: {
          color: "#8FB0F7"
        }
      }
    });
    return SliderZoomModel2;
  }(DataZoomModel_default)
);
var SliderZoomModel_default = SliderZoomModel;

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/SliderZoomView.js
var Rect = Rect_default;
var DEFAULT_LOCATION_EDGE_GAP = 7;
var DEFAULT_FRAME_BORDER_WIDTH = 1;
var DEFAULT_FILLER_SIZE = 30;
var DEFAULT_MOVE_HANDLE_SIZE = 7;
var HORIZONTAL = "horizontal";
var VERTICAL = "vertical";
var LABEL_GAP = 5;
var SHOW_DATA_SHADOW_SERIES_TYPE = ["line", "bar", "candlestick", "scatter"];
var REALTIME_ANIMATION_CONFIG = {
  easing: "cubicOut",
  duration: 100,
  delay: 0
};
var SliderZoomView = (
  /** @class */
  function(_super) {
    __extends(SliderZoomView2, _super);
    function SliderZoomView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = SliderZoomView2.type;
      _this._displayables = {};
      return _this;
    }
    SliderZoomView2.prototype.init = function(ecModel, api) {
      this.api = api;
      this._onBrush = bind(this._onBrush, this);
      this._onBrushEnd = bind(this._onBrushEnd, this);
    };
    SliderZoomView2.prototype.render = function(dataZoomModel, ecModel, api, payload) {
      _super.prototype.render.apply(this, arguments);
      createOrUpdate(this, "_dispatchZoomAction", dataZoomModel.get("throttle"), "fixRate");
      this._orient = dataZoomModel.getOrient();
      if (dataZoomModel.get("show") === false) {
        this.group.removeAll();
        return;
      }
      if (dataZoomModel.noTarget()) {
        this._clear();
        this.group.removeAll();
        return;
      }
      if (!payload || payload.type !== "dataZoom" || payload.from !== this.uid) {
        this._buildView();
      }
      this._updateView();
    };
    SliderZoomView2.prototype.dispose = function() {
      this._clear();
      _super.prototype.dispose.apply(this, arguments);
    };
    SliderZoomView2.prototype._clear = function() {
      clear(this, "_dispatchZoomAction");
      var zr = this.api.getZr();
      zr.off("mousemove", this._onBrush);
      zr.off("mouseup", this._onBrushEnd);
    };
    SliderZoomView2.prototype._buildView = function() {
      var thisGroup = this.group;
      thisGroup.removeAll();
      this._brushing = false;
      this._displayables.brushRect = null;
      this._resetLocation();
      this._resetInterval();
      var barGroup = this._displayables.sliderGroup = new Group_default();
      this._renderBackground();
      this._renderHandle();
      this._renderDataShadow();
      thisGroup.add(barGroup);
      this._positionGroup();
    };
    SliderZoomView2.prototype._resetLocation = function() {
      var dataZoomModel = this.dataZoomModel;
      var api = this.api;
      var showMoveHandle = dataZoomModel.get("brushSelect");
      var moveHandleSize = showMoveHandle ? DEFAULT_MOVE_HANDLE_SIZE : 0;
      var coordRect = this._findCoordRect();
      var ecSize = {
        width: api.getWidth(),
        height: api.getHeight()
      };
      var positionInfo = this._orient === HORIZONTAL ? {
        // Why using 'right', because right should be used in vertical,
        // and it is better to be consistent for dealing with position param merge.
        right: ecSize.width - coordRect.x - coordRect.width,
        top: ecSize.height - DEFAULT_FILLER_SIZE - DEFAULT_LOCATION_EDGE_GAP - moveHandleSize,
        width: coordRect.width,
        height: DEFAULT_FILLER_SIZE
      } : {
        right: DEFAULT_LOCATION_EDGE_GAP,
        top: coordRect.y,
        width: DEFAULT_FILLER_SIZE,
        height: coordRect.height
      };
      var layoutParams = getLayoutParams(dataZoomModel.option);
      each(["right", "top", "width", "height"], function(name) {
        if (layoutParams[name] === "ph") {
          layoutParams[name] = positionInfo[name];
        }
      });
      var layoutRect = getLayoutRect(layoutParams, ecSize);
      this._location = {
        x: layoutRect.x,
        y: layoutRect.y
      };
      this._size = [layoutRect.width, layoutRect.height];
      this._orient === VERTICAL && this._size.reverse();
    };
    SliderZoomView2.prototype._positionGroup = function() {
      var thisGroup = this.group;
      var location = this._location;
      var orient = this._orient;
      var targetAxisModel = this.dataZoomModel.getFirstTargetAxisModel();
      var inverse = targetAxisModel && targetAxisModel.get("inverse");
      var sliderGroup = this._displayables.sliderGroup;
      var otherAxisInverse = (this._dataShadowInfo || {}).otherAxisInverse;
      sliderGroup.attr(orient === HORIZONTAL && !inverse ? {
        scaleY: otherAxisInverse ? 1 : -1,
        scaleX: 1
      } : orient === HORIZONTAL && inverse ? {
        scaleY: otherAxisInverse ? 1 : -1,
        scaleX: -1
      } : orient === VERTICAL && !inverse ? {
        scaleY: otherAxisInverse ? -1 : 1,
        scaleX: 1,
        rotation: Math.PI / 2
      } : {
        scaleY: otherAxisInverse ? -1 : 1,
        scaleX: -1,
        rotation: Math.PI / 2
      });
      var rect = thisGroup.getBoundingRect([sliderGroup]);
      thisGroup.x = location.x - rect.x;
      thisGroup.y = location.y - rect.y;
      thisGroup.markRedraw();
    };
    SliderZoomView2.prototype._getViewExtent = function() {
      return [0, this._size[0]];
    };
    SliderZoomView2.prototype._renderBackground = function() {
      var dataZoomModel = this.dataZoomModel;
      var size = this._size;
      var barGroup = this._displayables.sliderGroup;
      var brushSelect = dataZoomModel.get("brushSelect");
      barGroup.add(new Rect({
        silent: true,
        shape: {
          x: 0,
          y: 0,
          width: size[0],
          height: size[1]
        },
        style: {
          fill: dataZoomModel.get("backgroundColor")
        },
        z2: -40
      }));
      var clickPanel = new Rect({
        shape: {
          x: 0,
          y: 0,
          width: size[0],
          height: size[1]
        },
        style: {
          fill: "transparent"
        },
        z2: 0,
        onclick: bind(this._onClickPanel, this)
      });
      var zr = this.api.getZr();
      if (brushSelect) {
        clickPanel.on("mousedown", this._onBrushStart, this);
        clickPanel.cursor = "crosshair";
        zr.on("mousemove", this._onBrush);
        zr.on("mouseup", this._onBrushEnd);
      } else {
        zr.off("mousemove", this._onBrush);
        zr.off("mouseup", this._onBrushEnd);
      }
      barGroup.add(clickPanel);
    };
    SliderZoomView2.prototype._renderDataShadow = function() {
      var info = this._dataShadowInfo = this._prepareDataShadowInfo();
      this._displayables.dataShadowSegs = [];
      if (!info) {
        return;
      }
      var size = this._size;
      var oldSize = this._shadowSize || [];
      var seriesModel = info.series;
      var data = seriesModel.getRawData();
      var candlestickDim = seriesModel.getShadowDim && seriesModel.getShadowDim();
      var otherDim = candlestickDim && data.getDimensionInfo(candlestickDim) ? seriesModel.getShadowDim() : info.otherDim;
      if (otherDim == null) {
        return;
      }
      var polygonPts = this._shadowPolygonPts;
      var polylinePts = this._shadowPolylinePts;
      if (data !== this._shadowData || otherDim !== this._shadowDim || size[0] !== oldSize[0] || size[1] !== oldSize[1]) {
        var otherDataExtent_1 = data.getDataExtent(otherDim);
        var otherOffset = (otherDataExtent_1[1] - otherDataExtent_1[0]) * 0.3;
        otherDataExtent_1 = [otherDataExtent_1[0] - otherOffset, otherDataExtent_1[1] + otherOffset];
        var otherShadowExtent_1 = [0, size[1]];
        var thisShadowExtent = [0, size[0]];
        var areaPoints_1 = [[size[0], 0], [0, 0]];
        var linePoints_1 = [];
        var step_1 = thisShadowExtent[1] / (data.count() - 1);
        var thisCoord_1 = 0;
        var stride_1 = Math.round(data.count() / size[0]);
        var lastIsEmpty_1;
        data.each([otherDim], function(value, index) {
          if (stride_1 > 0 && index % stride_1) {
            thisCoord_1 += step_1;
            return;
          }
          var isEmpty = value == null || isNaN(value) || value === "";
          var otherCoord = isEmpty ? 0 : linearMap(value, otherDataExtent_1, otherShadowExtent_1, true);
          if (isEmpty && !lastIsEmpty_1 && index) {
            areaPoints_1.push([areaPoints_1[areaPoints_1.length - 1][0], 0]);
            linePoints_1.push([linePoints_1[linePoints_1.length - 1][0], 0]);
          } else if (!isEmpty && lastIsEmpty_1) {
            areaPoints_1.push([thisCoord_1, 0]);
            linePoints_1.push([thisCoord_1, 0]);
          }
          areaPoints_1.push([thisCoord_1, otherCoord]);
          linePoints_1.push([thisCoord_1, otherCoord]);
          thisCoord_1 += step_1;
          lastIsEmpty_1 = isEmpty;
        });
        polygonPts = this._shadowPolygonPts = areaPoints_1;
        polylinePts = this._shadowPolylinePts = linePoints_1;
      }
      this._shadowData = data;
      this._shadowDim = otherDim;
      this._shadowSize = [size[0], size[1]];
      var dataZoomModel = this.dataZoomModel;
      function createDataShadowGroup(isSelectedArea) {
        var model = dataZoomModel.getModel(isSelectedArea ? "selectedDataBackground" : "dataBackground");
        var group2 = new Group_default();
        var polygon = new Polygon_default({
          shape: {
            points: polygonPts
          },
          segmentIgnoreThreshold: 1,
          style: model.getModel("areaStyle").getAreaStyle(),
          silent: true,
          z2: -20
        });
        var polyline = new Polyline_default({
          shape: {
            points: polylinePts
          },
          segmentIgnoreThreshold: 1,
          style: model.getModel("lineStyle").getLineStyle(),
          silent: true,
          z2: -19
        });
        group2.add(polygon);
        group2.add(polyline);
        return group2;
      }
      for (var i = 0; i < 3; i++) {
        var group = createDataShadowGroup(i === 1);
        this._displayables.sliderGroup.add(group);
        this._displayables.dataShadowSegs.push(group);
      }
    };
    SliderZoomView2.prototype._prepareDataShadowInfo = function() {
      var dataZoomModel = this.dataZoomModel;
      var showDataShadow = dataZoomModel.get("showDataShadow");
      if (showDataShadow === false) {
        return;
      }
      var result;
      var ecModel = this.ecModel;
      dataZoomModel.eachTargetAxis(function(axisDim, axisIndex) {
        var seriesModels = dataZoomModel.getAxisProxy(axisDim, axisIndex).getTargetSeriesModels();
        each(seriesModels, function(seriesModel) {
          if (result) {
            return;
          }
          if (showDataShadow !== true && indexOf(SHOW_DATA_SHADOW_SERIES_TYPE, seriesModel.get("type")) < 0) {
            return;
          }
          var thisAxis = ecModel.getComponent(getAxisMainType(axisDim), axisIndex).axis;
          var otherDim = getOtherDim(axisDim);
          var otherAxisInverse;
          var coordSys = seriesModel.coordinateSystem;
          if (otherDim != null && coordSys.getOtherAxis) {
            otherAxisInverse = coordSys.getOtherAxis(thisAxis).inverse;
          }
          otherDim = seriesModel.getData().mapDimension(otherDim);
          result = {
            thisAxis,
            series: seriesModel,
            thisDim: axisDim,
            otherDim,
            otherAxisInverse
          };
        }, this);
      }, this);
      return result;
    };
    SliderZoomView2.prototype._renderHandle = function() {
      var thisGroup = this.group;
      var displayables = this._displayables;
      var handles = displayables.handles = [null, null];
      var handleLabels = displayables.handleLabels = [null, null];
      var sliderGroup = this._displayables.sliderGroup;
      var size = this._size;
      var dataZoomModel = this.dataZoomModel;
      var api = this.api;
      var borderRadius = dataZoomModel.get("borderRadius") || 0;
      var brushSelect = dataZoomModel.get("brushSelect");
      var filler = displayables.filler = new Rect({
        silent: brushSelect,
        style: {
          fill: dataZoomModel.get("fillerColor")
        },
        textConfig: {
          position: "inside"
        }
      });
      sliderGroup.add(filler);
      sliderGroup.add(new Rect({
        silent: true,
        subPixelOptimize: true,
        shape: {
          x: 0,
          y: 0,
          width: size[0],
          height: size[1],
          r: borderRadius
        },
        style: {
          // deprecated option
          stroke: dataZoomModel.get("dataBackgroundColor") || dataZoomModel.get("borderColor"),
          lineWidth: DEFAULT_FRAME_BORDER_WIDTH,
          fill: "rgba(0,0,0,0)"
        }
      }));
      each([0, 1], function(handleIndex) {
        var iconStr = dataZoomModel.get("handleIcon");
        if (!symbolBuildProxies[iconStr] && iconStr.indexOf("path://") < 0 && iconStr.indexOf("image://") < 0) {
          iconStr = "path://" + iconStr;
          if (true) {
            deprecateLog("handleIcon now needs 'path://' prefix when using a path string");
          }
        }
        var path = createSymbol(iconStr, -1, 0, 2, 2, null, true);
        path.attr({
          cursor: getCursor(this._orient),
          draggable: true,
          drift: bind(this._onDragMove, this, handleIndex),
          ondragend: bind(this._onDragEnd, this),
          onmouseover: bind(this._showDataInfo, this, true),
          onmouseout: bind(this._showDataInfo, this, false),
          z2: 5
        });
        var bRect = path.getBoundingRect();
        var handleSize = dataZoomModel.get("handleSize");
        this._handleHeight = parsePercent(handleSize, this._size[1]);
        this._handleWidth = bRect.width / bRect.height * this._handleHeight;
        path.setStyle(dataZoomModel.getModel("handleStyle").getItemStyle());
        path.style.strokeNoScale = true;
        path.rectHover = true;
        path.ensureState("emphasis").style = dataZoomModel.getModel(["emphasis", "handleStyle"]).getItemStyle();
        enableHoverEmphasis(path);
        var handleColor = dataZoomModel.get("handleColor");
        if (handleColor != null) {
          path.style.fill = handleColor;
        }
        sliderGroup.add(handles[handleIndex] = path);
        var textStyleModel = dataZoomModel.getModel("textStyle");
        var handleLabel = dataZoomModel.get("handleLabel") || {};
        var handleLabelShow = handleLabel.show || false;
        thisGroup.add(handleLabels[handleIndex] = new Text_default({
          silent: true,
          invisible: !handleLabelShow,
          style: createTextStyle(textStyleModel, {
            x: 0,
            y: 0,
            text: "",
            verticalAlign: "middle",
            align: "center",
            fill: textStyleModel.getTextColor(),
            font: textStyleModel.getFont()
          }),
          z2: 10
        }));
      }, this);
      var actualMoveZone = filler;
      if (brushSelect) {
        var moveHandleHeight = parsePercent(dataZoomModel.get("moveHandleSize"), size[1]);
        var moveHandle_1 = displayables.moveHandle = new Rect_default({
          style: dataZoomModel.getModel("moveHandleStyle").getItemStyle(),
          silent: true,
          shape: {
            r: [0, 0, 2, 2],
            y: size[1] - 0.5,
            height: moveHandleHeight
          }
        });
        var iconSize = moveHandleHeight * 0.8;
        var moveHandleIcon = displayables.moveHandleIcon = createSymbol(dataZoomModel.get("moveHandleIcon"), -iconSize / 2, -iconSize / 2, iconSize, iconSize, "#fff", true);
        moveHandleIcon.silent = true;
        moveHandleIcon.y = size[1] + moveHandleHeight / 2 - 0.5;
        moveHandle_1.ensureState("emphasis").style = dataZoomModel.getModel(["emphasis", "moveHandleStyle"]).getItemStyle();
        var moveZoneExpandSize = Math.min(size[1] / 2, Math.max(moveHandleHeight, 10));
        actualMoveZone = displayables.moveZone = new Rect_default({
          invisible: true,
          shape: {
            y: size[1] - moveZoneExpandSize,
            height: moveHandleHeight + moveZoneExpandSize
          }
        });
        actualMoveZone.on("mouseover", function() {
          api.enterEmphasis(moveHandle_1);
        }).on("mouseout", function() {
          api.leaveEmphasis(moveHandle_1);
        });
        sliderGroup.add(moveHandle_1);
        sliderGroup.add(moveHandleIcon);
        sliderGroup.add(actualMoveZone);
      }
      actualMoveZone.attr({
        draggable: true,
        cursor: getCursor(this._orient),
        drift: bind(this._onDragMove, this, "all"),
        ondragstart: bind(this._showDataInfo, this, true),
        ondragend: bind(this._onDragEnd, this),
        onmouseover: bind(this._showDataInfo, this, true),
        onmouseout: bind(this._showDataInfo, this, false)
      });
    };
    SliderZoomView2.prototype._resetInterval = function() {
      var range = this._range = this.dataZoomModel.getPercentRange();
      var viewExtent = this._getViewExtent();
      this._handleEnds = [linearMap(range[0], [0, 100], viewExtent, true), linearMap(range[1], [0, 100], viewExtent, true)];
    };
    SliderZoomView2.prototype._updateInterval = function(handleIndex, delta) {
      var dataZoomModel = this.dataZoomModel;
      var handleEnds = this._handleEnds;
      var viewExtend = this._getViewExtent();
      var minMaxSpan = dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
      var percentExtent = [0, 100];
      sliderMove(delta, handleEnds, viewExtend, dataZoomModel.get("zoomLock") ? "all" : handleIndex, minMaxSpan.minSpan != null ? linearMap(minMaxSpan.minSpan, percentExtent, viewExtend, true) : null, minMaxSpan.maxSpan != null ? linearMap(minMaxSpan.maxSpan, percentExtent, viewExtend, true) : null);
      var lastRange = this._range;
      var range = this._range = asc([linearMap(handleEnds[0], viewExtend, percentExtent, true), linearMap(handleEnds[1], viewExtend, percentExtent, true)]);
      return !lastRange || lastRange[0] !== range[0] || lastRange[1] !== range[1];
    };
    SliderZoomView2.prototype._updateView = function(nonRealtime) {
      var displaybles = this._displayables;
      var handleEnds = this._handleEnds;
      var handleInterval = asc(handleEnds.slice());
      var size = this._size;
      each([0, 1], function(handleIndex) {
        var handle = displaybles.handles[handleIndex];
        var handleHeight = this._handleHeight;
        handle.attr({
          scaleX: handleHeight / 2,
          scaleY: handleHeight / 2,
          // This is a trick, by adding an extra tiny offset to let the default handle's end point align to the drag window.
          // NOTE: It may affect some custom shapes a bit. But we prefer to have better result by default.
          x: handleEnds[handleIndex] + (handleIndex ? -1 : 1),
          y: size[1] / 2 - handleHeight / 2
        });
      }, this);
      displaybles.filler.setShape({
        x: handleInterval[0],
        y: 0,
        width: handleInterval[1] - handleInterval[0],
        height: size[1]
      });
      var viewExtent = {
        x: handleInterval[0],
        width: handleInterval[1] - handleInterval[0]
      };
      if (displaybles.moveHandle) {
        displaybles.moveHandle.setShape(viewExtent);
        displaybles.moveZone.setShape(viewExtent);
        displaybles.moveZone.getBoundingRect();
        displaybles.moveHandleIcon && displaybles.moveHandleIcon.attr("x", viewExtent.x + viewExtent.width / 2);
      }
      var dataShadowSegs = displaybles.dataShadowSegs;
      var segIntervals = [0, handleInterval[0], handleInterval[1], size[0]];
      for (var i = 0; i < dataShadowSegs.length; i++) {
        var segGroup = dataShadowSegs[i];
        var clipPath = segGroup.getClipPath();
        if (!clipPath) {
          clipPath = new Rect_default();
          segGroup.setClipPath(clipPath);
        }
        clipPath.setShape({
          x: segIntervals[i],
          y: 0,
          width: segIntervals[i + 1] - segIntervals[i],
          height: size[1]
        });
      }
      this._updateDataInfo(nonRealtime);
    };
    SliderZoomView2.prototype._updateDataInfo = function(nonRealtime) {
      var dataZoomModel = this.dataZoomModel;
      var displaybles = this._displayables;
      var handleLabels = displaybles.handleLabels;
      var orient = this._orient;
      var labelTexts = ["", ""];
      if (dataZoomModel.get("showDetail")) {
        var axisProxy = dataZoomModel.findRepresentativeAxisProxy();
        if (axisProxy) {
          var axis = axisProxy.getAxisModel().axis;
          var range = this._range;
          var dataInterval = nonRealtime ? axisProxy.calculateDataWindow({
            start: range[0],
            end: range[1]
          }).valueWindow : axisProxy.getDataValueWindow();
          labelTexts = [this._formatLabel(dataInterval[0], axis), this._formatLabel(dataInterval[1], axis)];
        }
      }
      var orderedHandleEnds = asc(this._handleEnds.slice());
      setLabel.call(this, 0);
      setLabel.call(this, 1);
      function setLabel(handleIndex) {
        var barTransform = getTransform(displaybles.handles[handleIndex].parent, this.group);
        var direction = transformDirection(handleIndex === 0 ? "right" : "left", barTransform);
        var offset = this._handleWidth / 2 + LABEL_GAP;
        var textPoint = applyTransform([orderedHandleEnds[handleIndex] + (handleIndex === 0 ? -offset : offset), this._size[1] / 2], barTransform);
        handleLabels[handleIndex].setStyle({
          x: textPoint[0],
          y: textPoint[1],
          verticalAlign: orient === HORIZONTAL ? "middle" : direction,
          align: orient === HORIZONTAL ? direction : "center",
          text: labelTexts[handleIndex]
        });
      }
    };
    SliderZoomView2.prototype._formatLabel = function(value, axis) {
      var dataZoomModel = this.dataZoomModel;
      var labelFormatter = dataZoomModel.get("labelFormatter");
      var labelPrecision = dataZoomModel.get("labelPrecision");
      if (labelPrecision == null || labelPrecision === "auto") {
        labelPrecision = axis.getPixelPrecision();
      }
      var valueStr = value == null || isNaN(value) ? "" : axis.type === "category" || axis.type === "time" ? axis.scale.getLabel({
        value: Math.round(value)
      }) : value.toFixed(Math.min(labelPrecision, 20));
      return isFunction(labelFormatter) ? labelFormatter(value, valueStr) : isString(labelFormatter) ? labelFormatter.replace("{value}", valueStr) : valueStr;
    };
    SliderZoomView2.prototype._showDataInfo = function(isEmphasis) {
      var handleLabel = this.dataZoomModel.get("handleLabel") || {};
      var normalShow = handleLabel.show || false;
      var emphasisHandleLabel = this.dataZoomModel.getModel(["emphasis", "handleLabel"]);
      var emphasisShow = emphasisHandleLabel.get("show") || false;
      var toShow = isEmphasis || this._dragging ? emphasisShow : normalShow;
      var displayables = this._displayables;
      var handleLabels = displayables.handleLabels;
      handleLabels[0].attr("invisible", !toShow);
      handleLabels[1].attr("invisible", !toShow);
      displayables.moveHandle && this.api[toShow ? "enterEmphasis" : "leaveEmphasis"](displayables.moveHandle, 1);
    };
    SliderZoomView2.prototype._onDragMove = function(handleIndex, dx, dy, event) {
      this._dragging = true;
      stop(event.event);
      var barTransform = this._displayables.sliderGroup.getLocalTransform();
      var vertex = applyTransform([dx, dy], barTransform, true);
      var changed = this._updateInterval(handleIndex, vertex[0]);
      var realtime = this.dataZoomModel.get("realtime");
      this._updateView(!realtime);
      changed && realtime && this._dispatchZoomAction(true);
    };
    SliderZoomView2.prototype._onDragEnd = function() {
      this._dragging = false;
      this._showDataInfo(false);
      var realtime = this.dataZoomModel.get("realtime");
      !realtime && this._dispatchZoomAction(false);
    };
    SliderZoomView2.prototype._onClickPanel = function(e) {
      var size = this._size;
      var localPoint = this._displayables.sliderGroup.transformCoordToLocal(e.offsetX, e.offsetY);
      if (localPoint[0] < 0 || localPoint[0] > size[0] || localPoint[1] < 0 || localPoint[1] > size[1]) {
        return;
      }
      var handleEnds = this._handleEnds;
      var center = (handleEnds[0] + handleEnds[1]) / 2;
      var changed = this._updateInterval("all", localPoint[0] - center);
      this._updateView();
      changed && this._dispatchZoomAction(false);
    };
    SliderZoomView2.prototype._onBrushStart = function(e) {
      var x = e.offsetX;
      var y = e.offsetY;
      this._brushStart = new Point_default(x, y);
      this._brushing = true;
      this._brushStartTime = +/* @__PURE__ */ new Date();
    };
    SliderZoomView2.prototype._onBrushEnd = function(e) {
      if (!this._brushing) {
        return;
      }
      var brushRect = this._displayables.brushRect;
      this._brushing = false;
      if (!brushRect) {
        return;
      }
      brushRect.attr("ignore", true);
      var brushShape = brushRect.shape;
      var brushEndTime = +/* @__PURE__ */ new Date();
      if (brushEndTime - this._brushStartTime < 200 && Math.abs(brushShape.width) < 5) {
        return;
      }
      var viewExtend = this._getViewExtent();
      var percentExtent = [0, 100];
      this._range = asc([linearMap(brushShape.x, viewExtend, percentExtent, true), linearMap(brushShape.x + brushShape.width, viewExtend, percentExtent, true)]);
      this._handleEnds = [brushShape.x, brushShape.x + brushShape.width];
      this._updateView();
      this._dispatchZoomAction(false);
    };
    SliderZoomView2.prototype._onBrush = function(e) {
      if (this._brushing) {
        stop(e.event);
        this._updateBrushRect(e.offsetX, e.offsetY);
      }
    };
    SliderZoomView2.prototype._updateBrushRect = function(mouseX, mouseY) {
      var displayables = this._displayables;
      var dataZoomModel = this.dataZoomModel;
      var brushRect = displayables.brushRect;
      if (!brushRect) {
        brushRect = displayables.brushRect = new Rect({
          silent: true,
          style: dataZoomModel.getModel("brushStyle").getItemStyle()
        });
        displayables.sliderGroup.add(brushRect);
      }
      brushRect.attr("ignore", false);
      var brushStart = this._brushStart;
      var sliderGroup = this._displayables.sliderGroup;
      var endPoint = sliderGroup.transformCoordToLocal(mouseX, mouseY);
      var startPoint = sliderGroup.transformCoordToLocal(brushStart.x, brushStart.y);
      var size = this._size;
      endPoint[0] = Math.max(Math.min(size[0], endPoint[0]), 0);
      brushRect.setShape({
        x: startPoint[0],
        y: 0,
        width: endPoint[0] - startPoint[0],
        height: size[1]
      });
    };
    SliderZoomView2.prototype._dispatchZoomAction = function(realtime) {
      var range = this._range;
      this.api.dispatchAction({
        type: "dataZoom",
        from: this.uid,
        dataZoomId: this.dataZoomModel.id,
        animation: realtime ? REALTIME_ANIMATION_CONFIG : null,
        start: range[0],
        end: range[1]
      });
    };
    SliderZoomView2.prototype._findCoordRect = function() {
      var rect;
      var coordSysInfoList = collectReferCoordSysModelInfo(this.dataZoomModel).infoList;
      if (!rect && coordSysInfoList.length) {
        var coordSys = coordSysInfoList[0].model.coordinateSystem;
        rect = coordSys.getRect && coordSys.getRect();
      }
      if (!rect) {
        var width = this.api.getWidth();
        var height = this.api.getHeight();
        rect = {
          x: width * 0.2,
          y: height * 0.2,
          width: width * 0.6,
          height: height * 0.6
        };
      }
      return rect;
    };
    SliderZoomView2.type = "dataZoom.slider";
    return SliderZoomView2;
  }(DataZoomView_default)
);
function getOtherDim(thisDim) {
  var map2 = {
    x: "y",
    y: "x",
    radius: "angle",
    angle: "radius"
  };
  return map2[thisDim];
}
function getCursor(orient) {
  return orient === "vertical" ? "ns-resize" : "ew-resize";
}
var SliderZoomView_default = SliderZoomView;

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/installDataZoomSlider.js
function install2(registers) {
  registers.registerComponentModel(SliderZoomModel_default);
  registers.registerComponentView(SliderZoomView_default);
  installCommon(registers);
}

// ../../../PrePayApp/node_modules/echarts/lib/component/dataZoom/install.js
function install3(registers) {
  use(install);
  use(install2);
}

export {
  DataZoomModel_default,
  DataZoomView_default,
  sliderMove,
  take,
  release,
  RoamController_default,
  installCommon,
  install,
  install2,
  install3
};
//# sourceMappingURL=chunk-USLFIWTS.js.map
