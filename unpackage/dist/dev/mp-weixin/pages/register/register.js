"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "register",
  setup(__props) {
    const formData = common_vendor.ref(new UTSJSONObject({
      phone: "",
      code: "",
      password: "",
      confirmPassword: ""
    }));
    const countdown = common_vendor.ref(0);
    const isAgree = common_vendor.ref(false);
    const goBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        delta: 1,
        fail: () => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }
      }));
    };
    const sendCode = () => {
      if (countdown.value > 0)
        return null;
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
      common_vendor.index.request({
        url: "/api/send-code",
        method: "POST",
        data: new UTSJSONObject({
          phone: formData.value.phone
        }),
        success: (res) => {
          common_vendor.index.showToast({
            title: "验证码已发送",
            icon: "success"
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/register/register.uvue:133", "发送验证码失败：", err);
          common_vendor.index.showToast({
            title: "发送失败",
            icon: "none"
          });
        }
      });
    };
    const handleAgreementChange = (e = null) => {
      isAgree.value = e.detail.value.length > 0;
    };
    const goToAgreement = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/protocal"
      });
    };
    const validateForm = () => {
      if (!formData.value.phone.trim()) {
        common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none"
        });
        return false;
      }
      if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return false;
      }
      if (!formData.value.code.trim()) {
        common_vendor.index.showToast({
          title: "请输入验证码",
          icon: "none"
        });
        return false;
      }
      if (!formData.value.password.trim()) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return false;
      }
      if (formData.value.password.length < 6) {
        common_vendor.index.showToast({
          title: "密码长度不能小于6位",
          icon: "none"
        });
        return false;
      }
      if (formData.value.password !== formData.value.confirmPassword) {
        common_vendor.index.showToast({
          title: "两次输入的密码不一致",
          icon: "none"
        });
        return false;
      }
      if (!isAgree.value) {
        common_vendor.index.showToast({
          title: "请阅读并同意用户协议",
          icon: "none"
        });
        return false;
      }
      return true;
    };
    const handleRegister = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!validateForm())
          return Promise.resolve(null);
        try {
          const res = yield common_vendor.index.request({
            url: "/api/register",
            method: "POST",
            data: formData.value
          });
          common_vendor.index.showToast({
            title: "注册成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } catch (err) {
          common_vendor.index.__f__("error", "at pages/register/register.uvue:235", "注册失败：", err);
          common_vendor.index.showToast({
            title: "注册失败",
            icon: "none"
          });
        }
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(goBack),
        b: formData.value.phone,
        c: common_vendor.o(($event = null) => {
          return formData.value.phone = $event.detail.value;
        }),
        d: formData.value.code,
        e: common_vendor.o(($event = null) => {
          return formData.value.code = $event.detail.value;
        }),
        f: common_vendor.t(countdown.value > 0 ? `${countdown.value}s` : "获取验证码"),
        g: countdown.value > 0,
        h: common_vendor.o(sendCode),
        i: formData.value.password,
        j: common_vendor.o(($event = null) => {
          return formData.value.password = $event.detail.value;
        }),
        k: formData.value.confirmPassword,
        l: common_vendor.o(($event = null) => {
          return formData.value.confirmPassword = $event.detail.value;
        }),
        m: common_vendor.o(handleRegister),
        n: isAgree.value,
        o: common_vendor.o(goToAgreement),
        p: common_vendor.o(handleAgreementChange),
        q: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map
