"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "edit-profile",
  setup(__props) {
    const formData = common_vendor.ref(new UTSJSONObject({
      avatar: "",
      nickname: "",
      phone: "",
      wechatId: "",
      gender: 1,
      birthday: "",
      location: [],
      bio: ""
    }));
    const loading = common_vendor.ref(false);
    const getUserInfo = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const res = yield common_vendor.index.request({
            url: "/user/info"
          });
          formData.value = Object.assign(Object.assign({}, formData.value), res.data);
        } catch (err) {
          common_vendor.index.__f__("error", "at pages/profile/edit-profile.uvue:124", "获取用户信息失败：", err);
          common_vendor.index.showToast({
            title: "获取用户信息失败",
            icon: "none"
          });
        }
      });
    };
    const handleBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        fail: () => {
          common_vendor.index.switchTab({
            url: "/pages/profile/profile"
          });
        }
      }));
    };
    const validateForm = () => {
      if (!formData.value.nickname.trim()) {
        common_vendor.index.showToast({
          title: "请输入昵称",
          icon: "none"
        });
        return false;
      }
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
      return true;
    };
    const handleSave = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (loading.value)
          return Promise.resolve(null);
        if (!validateForm())
          return Promise.resolve(null);
        loading.value = true;
        try {
          yield common_vendor.index.request({
            url: "/user/update",
            method: "POST",
            data: formData.value
          });
          common_vendor.index.showToast({
            title: "保存成功",
            icon: "success"
          });
          setTimeout(() => {
            handleBack();
          }, 1500);
        } catch (err) {
          common_vendor.index.__f__("error", "at pages/profile/edit-profile.uvue:195", "保存失败：", err);
          common_vendor.index.showToast({
            title: "保存失败",
            icon: "none"
          });
        } finally {
          loading.value = false;
        }
      });
    };
    const handleEditAvatar = () => {
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
              formData.value.avatar = data.url;
              common_vendor.index.showToast({
                title: "头像更新成功",
                icon: "success"
              });
            },
            fail: (err) => {
              common_vendor.index.__f__("error", "at pages/profile/edit-profile.uvue:224", "上传头像失败：", err);
              common_vendor.index.showToast({
                title: "上传失败",
                icon: "none"
              });
            }
          });
        }
      }));
    };
    const handleBirthdayChange = (e = null) => {
      formData.value.birthday = e.detail.value;
    };
    const handleLocationChange = (e = null) => {
      formData.value.location = e.detail.value;
    };
    common_vendor.onMounted(() => {
      getUserInfo();
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(handleBack),
        b: common_vendor.o(handleSave),
        c: formData.value.avatar || "/static/icons/default-avatar.png",
        d: common_vendor.o(handleEditAvatar),
        e: formData.value.nickname,
        f: common_vendor.o(($event = null) => {
          return formData.value.nickname = $event.detail.value;
        }),
        g: formData.value.phone,
        h: common_vendor.o(($event = null) => {
          return formData.value.phone = $event.detail.value;
        }),
        i: formData.value.wechatId,
        j: common_vendor.o(($event = null) => {
          return formData.value.wechatId = $event.detail.value;
        }),
        k: formData.value.gender === 1 ? 1 : "",
        l: common_vendor.o(($event = null) => {
          return formData.value.gender = 1;
        }),
        m: formData.value.gender === 2 ? 1 : "",
        n: common_vendor.o(($event = null) => {
          return formData.value.gender = 2;
        }),
        o: common_vendor.t(formData.value.birthday || "请选择生日"),
        p: formData.value.birthday,
        q: common_vendor.o(handleBirthdayChange),
        r: common_vendor.t(formData.value.location.join(" ") || "请选择所在地"),
        s: formData.value.location,
        t: common_vendor.o(handleLocationChange),
        v: formData.value.bio,
        w: common_vendor.o(($event = null) => {
          return formData.value.bio = $event.detail.value;
        }),
        x: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/edit-profile.js.map
