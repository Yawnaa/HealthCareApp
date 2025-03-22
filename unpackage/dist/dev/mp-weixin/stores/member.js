"use strict";
const common_vendor = require("../common/vendor.js");
const useMemberStore = common_vendor.defineStore("member", {
  state: () => {
    return {
      profile: null
    };
  },
  actions: {
    setProfile(profile) {
      this.profile = profile;
    }
  }
});
exports.useMemberStore = useMemberStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/member.js.map
