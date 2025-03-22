"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent(new UTSJSONObject({
  data() {
    return {
      userInfo: new UTSJSONObject({
        avatar: "",
        name: "张三",
        phone: "138****8888",
        doctor: "李医生",
        score: "11"
      })
    };
  },
  methods: new UTSJSONObject({
    // 上传头像
    handleUploadAvatar() {
      common_vendor.index.chooseImage(new UTSJSONObject({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          common_vendor.index.showLoading({
            title: "上传中..."
          });
          common_vendor.index.uploadFile({
            url: "YOUR_UPLOAD_API",
            filePath: tempFilePath,
            name: "avatar",
            success: (uploadRes) => {
              const data = UTS.JSON.parse(uploadRes.data);
              this.userInfo.avatar = data.url;
              common_vendor.index.showToast({
                title: "头像更新成功",
                icon: "success"
              });
            },
            fail: (err) => {
              common_vendor.index.__f__("error", "at pages/profile/profile.uvue:86", "上传失败：", err);
              common_vendor.index.showToast({
                title: "上传失败",
                icon: "none"
              });
            },
            complete: () => {
              common_vendor.index.hideLoading();
            }
          });
        }
      }));
    },
    // 更新个人信息
    handleUpdateProfile() {
      common_vendor.index.navigateTo({
        url: "/pages/profile/update-profile"
      });
    },
    // 更新体质信息
    handleUpdateHealth() {
      common_vendor.index.navigateTo({
        url: "/pages/profile/update-health"
      });
    },
    // 修改密码
    handleChangePassword() {
      common_vendor.index.navigateTo({
        url: "/pages/profile/change-password"
      });
    },
    // 检查更新
    handleCheckUpdate() {
      common_vendor.index.showLoading({
        title: "检查更新中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "已是最新版本",
          icon: "none"
        });
      }, 1500);
    },
    // 退出登录
    handleLogout() {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
          }
        }
      }));
    }
  })
}));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.userInfo.name || "未设置姓名"),
    b: common_vendor.t($data.userInfo.phone || "未绑定手机"),
    c: common_vendor.t($data.userInfo.doctor || "未分配"),
    d: common_vendor.t($data.userInfo.score || "0"),
    e: $data.userInfo.avatar || "/static/icons/default-avatar.png",
    f: common_vendor.o((...args) => $options.handleUploadAvatar && $options.handleUploadAvatar(...args)),
    g: common_vendor.o((...args) => $options.handleUpdateProfile && $options.handleUpdateProfile(...args)),
    h: common_vendor.o((...args) => $options.handleUpdateHealth && $options.handleUpdateHealth(...args)),
    i: common_vendor.o((...args) => $options.handleChangePassword && $options.handleChangePassword(...args)),
    j: common_vendor.o((...args) => $options.handleCheckUpdate && $options.handleCheckUpdate(...args)),
    k: common_vendor.o((...args) => $options.handleLogout && $options.handleLogout(...args)),
    l: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
