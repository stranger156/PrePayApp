import { openBlock, createElementBlock, createElementVNode, toDisplayString, createCommentVNode } from "vue";
const _style_0 = { "info-window": { "": { "backgroundColor": "#FFFFFF", "borderRadius": "12rpx", "paddingTop": "25rpx", "paddingRight": "25rpx", "paddingBottom": "25rpx", "paddingLeft": "25rpx", "boxShadow": "0 8rpx 24rpx rgba(0, 0, 0, 0.1)" } } };
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
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
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    $data.visible ? (openBlock(), createElementBlock("view", {
      key: 0,
      class: "info-window"
    }, [
      createElementVNode("view", { class: "info-header" }, [
        createElementVNode(
          "u-text",
          { class: "title" },
          toDisplayString($data.station.stationName),
          1
          /* TEXT */
        )
      ]),
      createElementVNode("view", { class: "info-content" }, [
        createElementVNode("view", { class: "info-item" }, [
          createElementVNode("u-text", { class: "label" }, "地址："),
          createElementVNode(
            "u-text",
            { class: "value" },
            toDisplayString($data.station.address),
            1
            /* TEXT */
          )
        ]),
        createCommentVNode(" 其他信息 ")
      ])
    ])) : createCommentVNode("v-if", true)
  ]);
}
const stationInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "C:/Users/86158/Documents/HBuilderProjects/PrePayApp/pages/station-info/station-info.nvue"]]);
export {
  stationInfo as default
};
