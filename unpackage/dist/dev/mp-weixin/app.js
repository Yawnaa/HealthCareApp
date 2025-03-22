"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/register/register.js";
  "./pages/index/index.js";
  "./pages/profile/profile.js";
  "./pages/profile/edit-profile.js";
  "./pages/exercise/exercise.js";
  "./pages/ai-doctor/ai-doctor.js";
  "./pages/health-test/health-test.js";
}
const _sfc_main = common_vendor.defineComponent(new UTSJSONObject({
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.uvue:5", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.uvue:8", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.uvue:11", "App Hide");
  },
  onExit: function() {
    common_vendor.index.__f__("log", "at App.uvue:32", "App Exit");
  }
}));
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
