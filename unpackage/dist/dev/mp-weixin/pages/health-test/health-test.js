"use strict";
const common_vendor = require("../../common/vendor.js");
const totalSteps = 4;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "health-test",
  setup(__props) {
    const basicInfo = common_vendor.ref(new UTSJSONObject({
      age: "",
      gender: "",
      height: "",
      weight: ""
    }));
    const lifestyleQuestions = common_vendor.ref([
      new UTSJSONObject({
        text: "您每天的睡眠时间是多少？",
        options: ["少于6小时", "6-8小时", "8-10小时", "超过10小时"],
        answer: -1
      }),
      new UTSJSONObject({
        text: "您每周运动频率如何？",
        options: ["从不运动", "1-2次", "3-4次", "5次以上"],
        answer: -1
      }),
      new UTSJSONObject({
        text: "您的饮食习惯如何？",
        options: ["不规律", "基本规律", "非常规律", "严格规律"],
        answer: -1
      })
    ]);
    const mentalHealthQuestions = common_vendor.ref([
      new UTSJSONObject({
        text: "您最近的情绪状态如何？",
        options: ["经常焦虑", "偶尔焦虑", "基本稳定", "非常愉悦"],
        answer: -1
      }),
      new UTSJSONObject({
        text: "您的工作压力如何？",
        options: ["压力很大", "压力较大", "压力适中", "压力较小"],
        answer: -1
      }),
      new UTSJSONObject({
        text: "您的人际关系如何？",
        options: ["关系紧张", "关系一般", "关系良好", "关系融洽"],
        answer: -1
      })
    ]);
    const currentStep = common_vendor.ref(1);
    const onGenderChange = (e = null) => {
      basicInfo.value.gender = e.detail.value;
    };
    const onLifestyleChange = (index, e = null) => {
      lifestyleQuestions.value[index].answer = Number(e.detail.value);
    };
    const onMentalHealthChange = (index, e = null) => {
      mentalHealthQuestions.value[index].answer = Number(e.detail.value);
    };
    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };
    const nextStep = () => {
      if (currentStep.value < totalSteps) {
        currentStep.value++;
      }
    };
    const calculateBMI = () => {
      if (!basicInfo.value.height || !basicInfo.value.weight)
        return "--";
      const height = Number(basicInfo.value.height) / 100;
      const weight = Number(basicInfo.value.weight);
      const bmi = weight / (height * height);
      return bmi.toFixed(1);
    };
    const calculateLifestyleScore = () => {
      const total = lifestyleQuestions.value.reduce((sum, q) => {
        return sum + (q.answer >= 0 ? q.answer : 0);
      }, 0);
      return Math.round(total / (lifestyleQuestions.value.length * 3) * 100);
    };
    const calculateMentalHealthScore = () => {
      const total = mentalHealthQuestions.value.reduce((sum, q) => {
        return sum + (q.answer >= 0 ? q.answer : 0);
      }, 0);
      return Math.round(total / (mentalHealthQuestions.value.length * 3) * 100);
    };
    const generateSuggestion = () => {
      const bmi = Number(calculateBMI());
      const lifestyleScore = calculateLifestyleScore();
      const mentalHealthScore = calculateMentalHealthScore();
      let suggestions = [];
      if (bmi < 18.5) {
        suggestions.push("您的体重偏轻，建议适当增加营养摄入，保持均衡饮食。");
      } else if (bmi > 24) {
        suggestions.push("您的体重偏重，建议控制饮食，增加运动量。");
      }
      if (lifestyleScore < 60) {
        suggestions.push("您的生活习惯需要改善，建议保持规律作息，适量运动。");
      }
      if (mentalHealthScore < 60) {
        suggestions.push("您的心理状态需要关注，建议适当放松，保持积极心态。");
      }
      return suggestions.length > 0 ? suggestions.join("\n") : "您的健康状况良好，请继续保持！";
    };
    const submitTest = () => {
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "评估完成",
          icon: "success"
        });
      }, 1500);
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: `${currentStep.value / totalSteps * 100}%`,
        b: common_vendor.t(currentStep.value),
        c: common_vendor.t(totalSteps),
        d: currentStep.value === 1
      }), currentStep.value === 1 ? new UTSJSONObject({
        e: basicInfo.value.age,
        f: common_vendor.o(($event = null) => {
          return basicInfo.value.age = $event.detail.value;
        }),
        g: basicInfo.value.gender === "male",
        h: basicInfo.value.gender === "female",
        i: common_vendor.o(onGenderChange),
        j: basicInfo.value.height,
        k: common_vendor.o(($event = null) => {
          return basicInfo.value.height = $event.detail.value;
        }),
        l: basicInfo.value.weight,
        m: common_vendor.o(($event = null) => {
          return basicInfo.value.weight = $event.detail.value;
        })
      }) : new UTSJSONObject({}), new UTSJSONObject({
        n: currentStep.value === 2
      }), currentStep.value === 2 ? new UTSJSONObject({
        o: common_vendor.f(lifestyleQuestions.value, (question = null, index = null, i0 = null) => {
          return new UTSJSONObject({
            a: common_vendor.t(question.text),
            b: common_vendor.f(question.options, (option = null, optIndex = null, i1 = null) => {
              return new UTSJSONObject({
                a: String(optIndex),
                b: question.answer === optIndex,
                c: common_vendor.t(option),
                d: optIndex
              });
            }),
            c: common_vendor.o((e = null) => {
              return onLifestyleChange(index, e);
            }, index),
            d: index
          });
        })
      }) : new UTSJSONObject({}), new UTSJSONObject({
        p: currentStep.value === 3
      }), currentStep.value === 3 ? new UTSJSONObject({
        q: common_vendor.f(mentalHealthQuestions.value, (question = null, index = null, i0 = null) => {
          return new UTSJSONObject({
            a: common_vendor.t(question.text),
            b: common_vendor.f(question.options, (option = null, optIndex = null, i1 = null) => {
              return new UTSJSONObject({
                a: String(optIndex),
                b: question.answer === optIndex,
                c: common_vendor.t(option),
                d: optIndex
              });
            }),
            c: common_vendor.o((e = null) => {
              return onMentalHealthChange(index, e);
            }, index),
            d: index
          });
        })
      }) : new UTSJSONObject({}), new UTSJSONObject({
        r: currentStep.value === 4
      }), currentStep.value === 4 ? new UTSJSONObject({
        s: common_vendor.t(calculateBMI()),
        t: common_vendor.t(calculateLifestyleScore()),
        v: common_vendor.t(calculateMentalHealthScore()),
        w: common_vendor.t(generateSuggestion())
      }) : new UTSJSONObject({}), new UTSJSONObject({
        x: currentStep.value > 1
      }), currentStep.value > 1 ? new UTSJSONObject({
        y: common_vendor.o(prevStep)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        z: currentStep.value < totalSteps
      }), currentStep.value < totalSteps ? new UTSJSONObject({
        A: common_vendor.o(nextStep)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        B: currentStep.value === totalSteps
      }), currentStep.value === totalSteps ? new UTSJSONObject({
        C: common_vendor.o(submitTest)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        D: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health-test/health-test.js.map
