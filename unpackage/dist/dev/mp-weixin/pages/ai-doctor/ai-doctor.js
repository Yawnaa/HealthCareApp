"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "ai-doctor",
  setup(__props) {
    const chatList = common_vendor.ref([
      new UTSJSONObject({
        type: "ai",
        content: "您好！我是您的AI健康顾问，很高兴为您服务。请问有什么我可以帮您的吗？"
      })
    ]);
    const quickQuestions = common_vendor.ref([
      "最近总是失眠怎么办？",
      "感冒发烧吃什么药好？",
      "如何预防高血压？",
      "运动后肌肉酸痛怎么缓解？"
    ]);
    const inputMessage = common_vendor.ref("");
    const scrollTop = common_vendor.ref(0);
    const showQuickQuestions = common_vendor.ref(true);
    const goBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        delta: 1,
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/ai-doctor/ai-doctor.uvue:69", "返回失败：", err);
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }
      }));
    };
    const sendMessage = () => {
      if (!inputMessage.value.trim())
        return null;
      chatList.value.push({
        type: "user",
        content: inputMessage.value
      });
      showQuickQuestions.value = false;
      inputMessage.value = "";
      common_vendor.nextTick$1(() => {
        scrollToBottom();
      });
      setTimeout(() => {
        chatList.value.push({
          type: "ai",
          content: "感谢您的咨询。我正在分析您的问题，请稍等..."
        });
        scrollToBottom();
      }, 500);
    };
    const sendQuestion = (question) => {
      inputMessage.value = question;
      sendMessage();
    };
    const loadMoreHistory = () => {
    };
    const scrollToBottom = () => {
      common_vendor.nextTick$1(() => {
        const query = common_vendor.index.createSelectorQuery();
        query.select(".chat-list").boundingClientRect();
        query.exec((res) => {
          scrollTop.value = res[0].height;
        });
      });
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/ai-doctor/ai-doctor.uvue:132", "AI医生问答页面加载完成");
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.o(goBack),
        b: common_vendor.f(chatList.value, (item = null, index = null, i0 = null) => {
          return new UTSJSONObject({
            a: item.type === "ai" ? "/static/icons/ai-doctor.png" : "/static/icons/user.png",
            b: common_vendor.t(item.content),
            c: index,
            d: item.type === "ai" ? 1 : ""
          });
        }),
        c: scrollTop.value,
        d: common_vendor.o(loadMoreHistory),
        e: showQuickQuestions.value
      }), showQuickQuestions.value ? new UTSJSONObject({
        f: common_vendor.f(quickQuestions.value, (question = null, index = null, i0 = null) => {
          return new UTSJSONObject({
            a: common_vendor.t(question),
            b: index,
            c: common_vendor.o(($event = null) => {
              return sendQuestion(question);
            }, index)
          });
        })
      }) : new UTSJSONObject({}), new UTSJSONObject({
        g: common_vendor.o(sendMessage),
        h: inputMessage.value,
        i: common_vendor.o(($event = null) => {
          return inputMessage.value = $event.detail.value;
        }),
        j: common_vendor.o(sendMessage),
        k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ai-doctor/ai-doctor.js.map
