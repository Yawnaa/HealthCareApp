"use strict";
const common_vendor = require("../../common/vendor.js");
const app = getApp();
const _sfc_main = common_vendor.defineComponent(new UTSJSONObject({
  data() {
    return {
      formData: new UTSJSONObject({
        avatar: "",
        nickname: "",
        phone: "",
        wechatId: "",
        gender: 1,
        birthday: "",
        location: [],
        bio: ""
      }),
      loading: false
    };
  },
  onLoad() {
    this.getUserInfo();
  },
  // 获取用户信息
  getUserInfo() {
    var _a;
    (_a = app.vm) === null || _a === void 0 ? void 0 : _a.request(new UTSJSONObject({
      url: "/user/info"
    })).then((res = null) => {
      this.formData = Object.assign(Object.assign({}, this.formData), res);
    }).catch((err = null) => {
      common_vendor.index.__f__("error", "at pages/profile/edit-profile.uvue:129", "获取用户信息失败：", err);
      common_vendor.index.showToast({
        title: "获取用户信息失败",
        icon: "none"
      });
    });
  },
  // 返回上一页
  handleBack() {
    common_vendor.index.navigateBack(new UTSJSONObject({
      fail: () => {
        common_vendor.index.switchTab({
          url: "/pages/profile/profile"
        });
      }
    }));
  },
  // 保存信息
  handleSave() {
    var _a;
    if (this.loading)
      return null;
    if (!this.validateForm())
      return null;
    this.loading = true;
    (_a = app.vm) === null || _a === void 0 ? void 0 : _a.request(new UTSJSONObject({
      url: "/user/update",
      method: "POST",
      data: this.formData
    })).then(() => {
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success"
      });
      setTimeout(() => {
        this.handleBack();
      }, 1500);
    }).catch((err = null) => {
      common_vendor.index.__f__("error", "at pages/profile/edit-profile.uvue:169", "保存失败：", err);
      common_vendor.index.showToast({
        title: "保存失败",
        icon: "none"
      });
    }).finally(() => {
      this.loading = false;
    });
  },
  // 表单验证
  validateForm() {
    if (!this.formData.nickname.trim()) {
      common_vendor.index.showToast({
        title: "请输入昵称",
        icon: "none"
      });
      return false;
    }
    if (!this.formData.phone.trim()) {
      common_vendor.index.showToast({
        title: "请输入手机号",
        icon: "none"
      });
      return false;
    }
    if (!/^1[3-9]\d{9}$/.test(this.formData.phone)) {
      common_vendor.index.showToast({
        title: "请输入正确的手机号",
        icon: "none"
      });
      return false;
    }
    return true;
  },
  // 编辑头像
  handleEditAvatar() {
    common_vendor.index.chooseImage(new UTSJSONObject({
      count: 1,
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        common_vendor.index.uploadFile({
          url: "/api/upload/avatar",
          filePath: tempFilePath,
          name: "avatar",
          success: (uploadRes) => {
            const data = UTS.JSON.parse(uploadRes.data);
            this.formData.avatar = data.url;
            common_vendor.index.showToast({
              title: "头像更新成功",
              icon: "success"
            });
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/profile/edit-profile.uvue:227", "上传头像失败：", err);
            common_vendor.index.showToast({
              title: "上传失败",
              icon: "none"
            });
          }
        });
      }
    }));
  },
  // 生日选择
  handleBirthdayChange(e = null) {
    this.formData.birthday = e.detail.value;
  },
  // 地区选择
  handleLocationChange(e = null) {
    this.formData.location = e.detail.value;
  }
}));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.handleBack && _ctx.handleBack(...args)),
    b: common_vendor.o((...args) => _ctx.handleSave && _ctx.handleSave(...args)),
    c: $data.formData.avatar || "/static/icons/default-avatar.png",
    d: common_vendor.o((...args) => _ctx.handleEditAvatar && _ctx.handleEditAvatar(...args)),
    e: $data.formData.nickname,
    f: common_vendor.o(($event) => $data.formData.nickname = $event.detail.value),
    g: $data.formData.phone,
    h: common_vendor.o(($event) => $data.formData.phone = $event.detail.value),
    i: $data.formData.wechatId,
    j: common_vendor.o(($event) => $data.formData.wechatId = $event.detail.value),
    k: $data.formData.gender === 1 ? 1 : "",
    l: common_vendor.o(($event) => $data.formData.gender = 1),
    m: $data.formData.gender === 2 ? 1 : "",
    n: common_vendor.o(($event) => $data.formData.gender = 2),
    o: common_vendor.t($data.formData.birthday || "请选择生日"),
    p: $data.formData.birthday,
    q: common_vendor.o((...args) => _ctx.handleBirthdayChange && _ctx.handleBirthdayChange(...args)),
    r: common_vendor.t($data.formData.location.join(" ") || "请选择所在地"),
    s: $data.formData.location,
    t: common_vendor.o((...args) => _ctx.handleLocationChange && _ctx.handleLocationChange(...args)),
    v: $data.formData.bio,
    w: common_vendor.o(($event) => $data.formData.bio = $event.detail.value),
    x: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/edit-profile.js.map
