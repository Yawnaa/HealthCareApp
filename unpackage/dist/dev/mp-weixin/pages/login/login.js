"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_member = require("../../stores/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "login",
  setup(__props) {
    common_vendor.onLoad(() => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield common_vendor.wx$1.login();
        res.code;
      });
    });
    const form = common_vendor.ref(new UTSJSONObject({
      account: "",
      password: ""
    }));
    const onSubmit = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          if (!form.value.account || !form.value.password) {
            common_vendor.index.showToast({
              icon: "none",
              title: "请输入账号和密码"
            });
            return Promise.resolve(null);
          }
          common_vendor.index.__f__("log", "at pages/login/login.uvue:75", "开始登录...");
          const profile = new UTSJSONObject({
            id: "1",
            account: form.value.account,
            avatar: "/static/images/avatar.png",
            nickname: "测试用户",
            gender: 1,
            birthday: "1990-01-01",
            cityCode: "110100",
            provinceCode: "110000",
            profession: "工程师"
          });
          common_vendor.index.__f__("log", "at pages/login/login.uvue:90", "创建用户信息成功:", profile);
          const memberStore = stores_member.useMemberStore();
          memberStore.setProfile(profile);
          common_vendor.index.__f__("log", "at pages/login/login.uvue:96", "保存用户信息成功");
          common_vendor.index.showToast({ icon: "success", title: "登录成功" });
          common_vendor.index.__f__("log", "at pages/login/login.uvue:101", "准备跳转到首页...");
          common_vendor.index.switchTab({
            url: "/pages/index/index",
            success: () => {
              common_vendor.index.__f__("log", "at pages/login/login.uvue:107", "跳转成功");
            },
            fail: (err) => {
              common_vendor.index.__f__("error", "at pages/login/login.uvue:110", "跳转失败:", err);
            }
          });
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/login/login.uvue:114", "登录过程出错:", error);
          common_vendor.index.showToast({
            icon: "none",
            title: "登录失败，请重试"
          });
        }
      });
    };
    const onGetphonenumberSimple = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const profile = new UTSJSONObject(
          {
            id: "1",
            account: "13123456789",
            avatar: "/static/images/avatar.png",
            nickname: "测试用户",
            gender: 1,
            birthday: "1990-01-01",
            cityCode: "110100",
            provinceCode: "110000",
            profession: "工程师"
          }
          // 保存会员信息
        );
        const memberStore = stores_member.useMemberStore();
        memberStore.setProfile(profile);
        common_vendor.index.showToast({ icon: "success", title: "登录成功" });
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      });
    };
    common_vendor.ref(false);
    common_vendor.ref(false);
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_assets._imports_0,
        b: form.value.account,
        c: common_vendor.o(($event = null) => {
          return form.value.account = $event.detail.value;
        }),
        d: form.value.password,
        e: common_vendor.o(($event = null) => {
          return form.value.password = $event.detail.value;
        }),
        f: common_vendor.o(onSubmit),
        g: common_vendor.o(onGetphonenumberSimple),
        h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
