"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "CustomNavbar",
  props: {
    title: new UTSJSONObject({
      type: String,
      default: "标题"
    })
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/CustomNavbar/CustomNavbar.js.map
