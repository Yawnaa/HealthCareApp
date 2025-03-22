"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "exercise",
  setup(__props) {
    const todaySteps = common_vendor.ref(12345);
    const todayCalories = common_vendor.ref(280);
    const todayDistance = common_vendor.ref("8.5");
    const exerciseRecords = common_vendor.ref([
      new UTSJSONObject({
        name: "步行",
        time: "08:30",
        duration: "30分钟",
        calories: 120,
        icon: "/static/icons/walking.png"
      }),
      new UTSJSONObject({
        name: "跑步",
        time: "18:00",
        duration: "45分钟",
        calories: 360,
        icon: "/static/icons/running.png"
      })
    ]);
    const goBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        delta: 1,
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/exercise/exercise.uvue:78", "返回失败：", err);
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }
      }));
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/exercise/exercise.uvue:88", "运动记录页面加载完成");
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(goBack),
        b: common_vendor.t(todaySteps.value),
        c: common_vendor.t(todayCalories.value),
        d: common_vendor.t(todayDistance.value),
        e: common_vendor.f(exerciseRecords.value, (item = null, index = null, i0 = null) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.time),
            d: common_vendor.t(item.duration),
            e: common_vendor.t(item.calories),
            f: index
          };
        }),
        f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exercise/exercise.js.map
