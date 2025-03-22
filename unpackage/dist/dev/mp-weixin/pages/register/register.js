"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "register",
  setup(__props) {
    const formData = common_vendor.ref(new UTSJSONObject({
      username: "",
      phone: "",
      code: "",
      password: "",
      confirmPassword: ""
    }));
    const countdown = common_vendor.ref(0);
    const sendCode = () => {
      if (!formData.value.phone) {
        common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none"
        });
        return null;
      }
      if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return null;
      }
      countdown.value = 60;
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
        }
      }, 1e3);
      common_vendor.index.showToast({
        title: "验证码已发送",
        icon: "success"
      });
    };
    const handleRegister = () => {
      if (!formData.value.username || !formData.value.phone || !formData.value.code || !formData.value.password || !formData.value.confirmPassword) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
        return null;
      }
      if (formData.value.password !== formData.value.confirmPassword) {
        common_vendor.index.showToast({
          title: "两次输入的密码不一致",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.showLoading({
        title: "注册中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "注册成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }, 1500);
    };
    const navigateToLogin = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: formData.value.username,
        b: common_vendor.o(($event = null) => {
          return formData.value.username = $event.detail.value;
        }),
        c: formData.value.phone,
        d: common_vendor.o(($event = null) => {
          return formData.value.phone = $event.detail.value;
        }),
        e: formData.value.code,
        f: common_vendor.o(($event = null) => {
          return formData.value.code = $event.detail.value;
        }),
        g: common_vendor.t(countdown.value > 0 ? `${countdown.value}s` : "获取验证码"),
        h: countdown.value > 0,
        i: common_vendor.o(sendCode),
        j: formData.value.password,
        k: common_vendor.o(($event = null) => {
          return formData.value.password = $event.detail.value;
        }),
        l: formData.value.confirmPassword,
        m: common_vendor.o(($event = null) => {
          return formData.value.confirmPassword = $event.detail.value;
        }),
        n: common_vendor.o(handleRegister),
        o: common_vendor.o(navigateToLogin),
        p: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map
