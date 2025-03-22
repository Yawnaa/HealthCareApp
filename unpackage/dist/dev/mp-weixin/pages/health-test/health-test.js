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
      }),
      new UTSJSONObject({
        text: "您每天的饮水量是多少？",
        options: ["少于1L", "1-2L", "2-3L", "超过3L"],
        answer: -1
      }),
      new UTSJSONObject({
        text: "您是否有吸烟或饮酒习惯？",
        options: ["经常", "偶尔", "很少", "从不"],
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
      }),
      new UTSJSONObject({
        text: "您对生活充满希望吗？",
        options: ["很少", "一般", "比较乐观", "非常乐观"],
        answer: -1
      }),
      new UTSJSONObject({
        text: "您是否经常感到疲惫？",
        options: ["经常", "偶尔", "很少", "从不"],
        answer: -1
      })
    ]);
    const currentStep = common_vendor.ref(1);
    const resetAllData = () => {
      basicInfo.value = {
        age: "",
        gender: "",
        height: "",
        weight: ""
      };
      lifestyleQuestions.value.forEach((q) => {
        return q.answer = -1;
      });
      mentalHealthQuestions.value.forEach((q) => {
        return q.answer = -1;
      });
      currentStep.value = 1;
    };
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
        suggestions.push("您的体重偏轻，建议：\n1. 适当增加优质蛋白的摄入，如瘦肉、鱼类、蛋类\n2. 注意营养均衡，多吃新鲜蔬菜水果\n3. 进行力量训练，增加肌肉量\n4. 保持规律作息，确保充足睡眠");
      } else if (bmi > 24) {
        suggestions.push("您的体重偏重，建议：\n1. 控制每日热量摄入，建议减少300-500卡路里\n2. 增加运动量，每周进行3-5次有氧运动\n3. 避免高糖、高脂食物，选择低热量、高纤维的食物\n4. 保持规律作息，避免熬夜");
      }
      if (lifestyleScore < 60) {
        suggestions.push("您的生活习惯需要改善，建议：\n1. 保持规律作息，每天保证7-8小时睡眠\n2. 每周进行3-4次中等强度运动，每次30-60分钟\n3. 保持均衡饮食，每天摄入充足的水分\n4. 避免久坐，每隔1小时起身活动5-10分钟\n5. 戒烟限酒，保持健康的生活方式");
      } else if (lifestyleScore >= 80) {
        suggestions.push("您的生活习惯良好，建议：\n1. 继续保持当前的作息规律\n2. 可以尝试增加一些新的运动项目，保持运动兴趣\n3. 定期进行健康体检，预防疾病\n4. 与家人朋友分享健康经验，带动他人");
      }
      if (mentalHealthScore < 60) {
        suggestions.push("您的心理状态需要关注，建议：\n1. 每天进行15-20分钟的冥想或深呼吸练习\n2. 保持社交活动，与家人朋友多交流\n3. 培养兴趣爱好，转移注意力\n4. 适当运动，释放压力\n5. 如果压力持续，建议寻求专业心理咨询");
      } else if (mentalHealthScore >= 80) {
        suggestions.push("您的心理状态良好，建议：\n1. 继续保持积极乐观的心态\n2. 可以尝试帮助他人，传递正能量\n3. 定期进行自我反思和总结\n4. 保持工作与生活的平衡");
      }
      if (suggestions.length === 0) {
        suggestions.push("您的健康状况良好，建议：\n1. 继续保持当前的生活方式\n2. 定期进行健康检查\n3. 保持运动习惯，增强体质\n4. 关注营养均衡，预防疾病\n5. 保持积极乐观的心态");
      }
      suggestions.push("\n温馨提示：\n1. 建议每年进行一次全面体检\n2. 保持规律的作息时间\n3. 注意饮食卫生，避免暴饮暴食\n4. 保持适度运动，避免过度运动\n5. 如有不适及时就医");
      return suggestions.join("\n\n");
    };
    const submitTest = () => {
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "评估完成",
          icon: "success",
          duration: 2e3
        });
        setTimeout(() => {
          resetAllData();
        }, 2e3);
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
