"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const app = getApp();
const _sfc_main = common_vendor.defineComponent(new UTSJSONObject({
  data() {
    return {
      userInfo: new UTSJSONObject({
        nickname: "",
        phone: "",
        avatar: "",
        isVip: false,
        isVerified: false
      }),
      healthData: new UTSJSONObject({
        consultCount: 0,
        score: 0,
        medicineCount: 0
      }),
      loading: true,
      apiVersion: "",
      logoutTimer: null
    };
  },
  onLoad() {
    common_vendor.index.__f__("log", "at pages/profile/profile.uvue:123", "个人信息页面加载完成");
    this.checkApiVersion();
    this.getUserInfo();
    this.getHealthData();
  },
  // 检查API版本
  checkApiVersion() {
    var _a;
    (_a = app.vm) === null || _a === void 0 ? void 0 : _a.request(new UTSJSONObject({
      url: "/api/version"
    })).then((res = null) => {
      if (res.version !== this.apiVersion) {
        common_vendor.index.showModal(new UTSJSONObject({
          title: "版本更新",
          content: "发现新版本，是否立即更新？",
          success: (res2) => {
            if (res2.confirm) {
              this.updateApp();
            }
          }
        }));
      }
    }).catch((err = null) => {
      common_vendor.index.__f__("error", "at pages/profile/profile.uvue:146", "检查版本失败：", err);
    });
  },
  // 更新应用
  updateApp() {
  },
  // 获取用户信息
  getUserInfo() {
    var _a;
    (_a = app.vm) === null || _a === void 0 ? void 0 : _a.request(new UTSJSONObject({
      url: "/user/info"
    })).then((res = null) => {
      this.userInfo = res;
      this.loading = false;
    }).catch((err = null) => {
      common_vendor.index.__f__("error", "at pages/profile/profile.uvue:175", "获取用户信息失败：", err);
      common_vendor.index.showToast({
        title: "获取用户信息失败",
        icon: "none"
      });
      this.loading = false;
    });
  },
  // 获取健康数据
  getHealthData() {
    var _a;
    (_a = app.vm) === null || _a === void 0 ? void 0 : _a.request(new UTSJSONObject({
      url: "/user/health-data"
    })).then((res = null) => {
      this.healthData = res;
    }).catch((err = null) => {
      common_vendor.index.__f__("error", "at pages/profile/profile.uvue:191", "获取健康数据失败：", err);
    });
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
            this.userInfo.avatar = data.url;
            common_vendor.index.showToast({
              title: "头像更新成功",
              icon: "success"
            });
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/profile/profile.uvue:214", "上传头像失败：", err);
            common_vendor.index.showToast({
              title: "上传失败",
              icon: "none"
            });
          }
        });
      }
    }));
  },
  // 编辑个人资料
  handleEditProfile() {
    common_vendor.index.navigateTo({
      url: "./edit-profile",
      fail: (err) => {
        common_vendor.index.__f__("error", "at pages/profile/profile.uvue:230", "跳转失败：", err);
        common_vendor.index.showToast({
          title: "页面跳转失败",
          icon: "none"
        });
      }
    });
  },
  // 健康档案
  handleHealthData() {
    common_vendor.index.navigateTo({
      url: "/pages/health-data/health-data",
      fail: (err) => {
        common_vendor.index.__f__("error", "at pages/profile/profile.uvue:244", "跳转失败：", err);
        common_vendor.index.showToast({
          title: "页面跳转失败",
          icon: "none"
        });
      }
    });
  },
  // 就医记录
  handleMedicalRecords() {
    common_vendor.index.navigateTo({
      url: "/pages/medical-records/medical-records",
      fail: (err) => {
        common_vendor.index.__f__("error", "at pages/profile/profile.uvue:258", "跳转失败：", err);
        common_vendor.index.showToast({
          title: "页面跳转失败",
          icon: "none"
        });
      }
    });
  },
  // 处方管理
  handlePrescriptions() {
    common_vendor.index.navigateTo({
      url: "/pages/prescriptions/prescriptions",
      fail: (err) => {
        common_vendor.index.__f__("error", "at pages/profile/profile.uvue:272", "跳转失败：", err);
        common_vendor.index.showToast({
          title: "页面跳转失败",
          icon: "none"
        });
      }
    });
  },
  // 设置
  handleSettings() {
    common_vendor.index.navigateTo({
      url: "/pages/settings/settings",
      fail: (err) => {
        common_vendor.index.__f__("error", "at pages/profile/profile.uvue:286", "跳转失败：", err);
        common_vendor.index.showToast({
          title: "页面跳转失败",
          icon: "none"
        });
      }
    });
  },
  // 关于我们
  handleAbout() {
    common_vendor.index.navigateTo({
      url: "/pages/about/about",
      fail: (err) => {
        common_vendor.index.__f__("error", "at pages/profile/profile.uvue:300", "跳转失败：", err);
        common_vendor.index.showToast({
          title: "页面跳转失败",
          icon: "none"
        });
      }
    });
  },
  // 意见反馈
  handleFeedback() {
    common_vendor.index.navigateTo({
      url: "/pages/feedback/feedback",
      fail: (err) => {
        common_vendor.index.__f__("error", "at pages/profile/profile.uvue:314", "跳转失败：", err);
        common_vendor.index.showToast({
          title: "页面跳转失败",
          icon: "none"
        });
      }
    });
  },
  // 退出登录（带防抖）
  handleLogout() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = setTimeout(() => {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/profile/profile.uvue:335", "用户点击确定");
            common_vendor.index.reLaunch({
              url: "/pages/login/login",
              fail: (err) => {
                common_vendor.index.__f__("error", "at pages/profile/profile.uvue:339", "跳转失败：", err);
                common_vendor.index.showToast({
                  title: "退出失败",
                  icon: "none"
                });
              }
            });
          }
        }
      }));
    }, 300);
  }
}));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.loading
  }, $data.loading ? {} : common_vendor.e({
    b: $data.userInfo.avatar || "/static/icons/default-avatar.png",
    c: common_vendor.o((...args) => _ctx.handleEditAvatar && _ctx.handleEditAvatar(...args)),
    d: common_vendor.t($data.userInfo.nickname || "未设置昵称"),
    e: common_vendor.o((...args) => _ctx.handleEditProfile && _ctx.handleEditProfile(...args)),
    f: common_vendor.t($data.userInfo.phone || "未绑定手机"),
    g: $data.userInfo.isVip
  }, $data.userInfo.isVip ? {} : {}, {
    h: $data.userInfo.isVerified
  }, $data.userInfo.isVerified ? {} : {}), {
    i: common_vendor.t($data.healthData.consultCount || 0),
    j: common_vendor.t($data.healthData.score || 0),
    k: common_vendor.t($data.healthData.medicineCount || 0),
    l: $data.loading
  }, $data.loading ? {
    m: common_vendor.f(5, (i, k0, i0) => {
      return {
        a: i
      };
    })
  } : {
    n: common_assets._imports_0,
    o: common_vendor.o((...args) => _ctx.handleHealthData && _ctx.handleHealthData(...args)),
    p: common_assets._imports_1$1,
    q: common_vendor.o((...args) => _ctx.handleMedicalRecords && _ctx.handleMedicalRecords(...args)),
    r: common_assets._imports_2$1,
    s: common_vendor.o((...args) => _ctx.handlePrescriptions && _ctx.handlePrescriptions(...args)),
    t: common_assets._imports_3$1,
    v: common_vendor.o((...args) => _ctx.handleSettings && _ctx.handleSettings(...args)),
    w: common_assets._imports_4,
    x: common_vendor.o((...args) => _ctx.handleAbout && _ctx.handleAbout(...args)),
    y: common_assets._imports_5,
    z: common_vendor.o((...args) => _ctx.handleFeedback && _ctx.handleFeedback(...args))
  }, {
    A: common_vendor.o((...args) => _ctx.handleLogout && _ctx.handleLogout(...args)),
    B: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
