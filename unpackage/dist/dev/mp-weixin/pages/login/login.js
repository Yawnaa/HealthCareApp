"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "login",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const handleImageError = (e = null) => {
      common_vendor.index.__f__("error", "at pages/login/login.uvue:75", "图片加载失败：", e);
      common_vendor.index.showToast({
        title: "图片加载失败",
        icon: "none"
      });
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/login/login.uvue:84", "登录页面加载完成");
    });
    const handleLogin = () => {
      if (!username.value || !password.value) {
        common_vendor.index.showToast({
          title: "请输入用户名和密码",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.__f__("log", "at pages/login/login.uvue:97", "开始登录...");
      common_vendor.index.showLoading({
        title: "登录中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("log", "at pages/login/login.uvue:104", "登录成功，跳转到首页");
        common_vendor.index.switchTab({
          url: "/pages/index/index",
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/login/login.uvue:108", "跳转失败：", err);
            common_vendor.index.showToast({
              title: "页面跳转失败，请重试",
              icon: "none",
              duration: 2e3
            });
          },
          success: () => {
            common_vendor.index.__f__("log", "at pages/login/login.uvue:116", "跳转成功");
          }
        });
      }, 1500);
    };
    const handleWechatLogin = () => {
      common_vendor.index.__f__("log", "at pages/login/login.uvue:124", "开始微信登录...");
      common_vendor.index.showLoading({
        title: "微信登录中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("log", "at pages/login/login.uvue:131", "微信登录成功");
        common_vendor.index.switchTab({
          url: "/pages/index/index",
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/login/login.uvue:135", "跳转失败：", err);
            common_vendor.index.showToast({
              title: "页面跳转失败，请重试",
              icon: "none",
              duration: 2e3
            });
          },
          success: () => {
            common_vendor.index.__f__("log", "at pages/login/login.uvue:143", "跳转成功");
          }
        });
      }, 1500);
    };
    const handleQQLogin = () => {
      common_vendor.index.__f__("log", "at pages/login/login.uvue:151", "开始QQ登录...");
      common_vendor.index.showLoading({
        title: "QQ登录中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("log", "at pages/login/login.uvue:158", "QQ登录成功");
        common_vendor.index.switchTab({
          url: "/pages/index/index",
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/login/login.uvue:162", "跳转失败：", err);
            common_vendor.index.showToast({
              title: "页面跳转失败，请重试",
              icon: "none",
              duration: 2e3
            });
          },
          success: () => {
            common_vendor.index.__f__("log", "at pages/login/login.uvue:170", "跳转成功");
          }
        });
      }, 1500);
    };
    const handlePhoneLogin = () => {
      common_vendor.index.__f__("log", "at pages/login/login.uvue:178", "开始手机号登录...");
      common_vendor.index.showLoading({
        title: "手机号登录中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("log", "at pages/login/login.uvue:185", "手机号登录成功");
        common_vendor.index.switchTab({
          url: "/pages/index/index",
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/login/login.uvue:189", "跳转失败：", err);
            common_vendor.index.showToast({
              title: "页面跳转失败，请重试",
              icon: "none",
              duration: 2e3
            });
          },
          success: () => {
            common_vendor.index.__f__("log", "at pages/login/login.uvue:197", "跳转成功");
          }
        });
      }, 1500);
    };
    const navigateToRegister = () => {
      common_vendor.index.__f__("log", "at pages/login/login.uvue:205", "跳转到注册页面");
      common_vendor.index.navigateTo({
        url: "/pages/register/register",
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/login/login.uvue:209", "跳转失败：", err);
          common_vendor.index.showToast({
            title: "页面跳转失败",
            icon: "none"
          });
        }
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_assets._imports_0,
        b: common_vendor.o(handleImageError),
        c: username.value,
        d: common_vendor.o(($event = null) => {
          return username.value = $event.detail.value;
        }),
        e: password.value,
        f: common_vendor.o(($event = null) => {
          return password.value = $event.detail.value;
        }),
        g: common_vendor.o(handleLogin),
        h: common_assets._imports_1,
        i: common_vendor.o(handleImageError),
        j: common_vendor.o(handleWechatLogin),
        k: common_assets._imports_2,
        l: common_vendor.o(handleImageError),
        m: common_vendor.o(handleQQLogin),
        n: common_assets._imports_3,
        o: common_vendor.o(handleImageError),
        p: common_vendor.o(handlePhoneLogin),
        q: common_vendor.o(navigateToRegister),
        r: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
