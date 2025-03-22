"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "index",
  setup(__props) {
    const totalDays = common_vendor.ref(128);
    const continuousDays = common_vendor.ref(7);
    const monthDays = common_vendor.ref(15);
    common_vendor.ref(85);
    const exerciseScore = common_vendor.ref(90);
    const currentDate = common_vendor.ref(/* @__PURE__ */ new Date());
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    const checkedDates = common_vendor.ref(/* @__PURE__ */ new Set());
    const calendarDays = common_vendor.computed(() => {
      const year = currentDate.value.getFullYear();
      const month = currentDate.value.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const firstDayWeek = firstDay.getDay();
      const days = [];
      const today = /* @__PURE__ */ new Date();
      for (let i = 0; i < firstDayWeek; i++) {
        const prevDate = new Date(firstDay);
        prevDate.setDate(prevDate.getDate() - (firstDayWeek - i));
        const dateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}-${String(prevDate.getDate()).padStart(2, "0")}`;
        days.push({
          date: dateStr,
          day: prevDate.getDate(),
          isOtherMonth: true,
          isWeekend: prevDate.getDay() === 0 || prevDate.getDay() === 6,
          isToday: false,
          checked: checkedDates.value.has(dateStr)
        });
      }
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        days.push({
          date: dateStr,
          day: i,
          isOtherMonth: false,
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          isToday: dateStr === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
          checked: checkedDates.value.has(dateStr)
        });
      }
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(year, month + 1, i);
        const dateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;
        days.push({
          date: dateStr,
          day: nextDate.getDate(),
          isOtherMonth: true,
          isWeekend: nextDate.getDay() === 0 || nextDate.getDay() === 6,
          isToday: false,
          checked: checkedDates.value.has(dateStr)
        });
      }
      return days;
    });
    const prevMonth = () => {
      const newDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1);
      currentDate.value = newDate;
    };
    const nextMonth = () => {
      const newDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1);
      currentDate.value = newDate;
    };
    const toggleCheck = (date) => {
      if (checkedDates.value.has(date)) {
        checkedDates.value.delete(date);
      } else {
        checkedDates.value.add(date);
      }
    };
    const checkItems = common_vendor.ref([
      new UTSJSONObject({ label: "早餐", icon: "/static/icons/breakfast.png", checked: true }),
      new UTSJSONObject({ label: "运动", icon: "/static/icons/exercise.png", checked: false }),
      new UTSJSONObject({ label: "午餐", icon: "/static/icons/lunch.png", checked: true }),
      new UTSJSONObject({ label: "晚餐", icon: "/static/icons/dinner.png", checked: false })
    ]);
    const toggleCheckItem = (index) => {
      checkItems.value[index].checked = !checkItems.value[index].checked;
    };
    const navigateToExercise = () => {
      common_vendor.index.navigateTo({
        url: "/pages/exercise/exercise",
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:199", "跳转失败：", err);
          common_vendor.index.showToast({
            title: "页面跳转失败",
            icon: "none"
          });
        }
      });
    };
    const navigateToAIDoctor = () => {
      common_vendor.index.navigateTo({
        url: "/pages/ai-doctor/ai-doctor",
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:212", "跳转失败：", err);
          common_vendor.index.showToast({
            title: "页面跳转失败",
            icon: "none"
          });
        }
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.t(totalDays.value),
        b: common_vendor.t(continuousDays.value),
        c: common_vendor.t(monthDays.value),
        d: common_vendor.t(exerciseScore.value),
        e: common_vendor.o(navigateToExercise),
        f: common_assets._imports_0,
        g: common_vendor.o(navigateToAIDoctor),
        h: common_vendor.o(prevMonth),
        i: common_vendor.o(nextMonth),
        j: common_vendor.f(weekdays, (day = null, k0 = null, i0 = null) => {
          return {
            a: common_vendor.t(day),
            b: day
          };
        }),
        k: common_vendor.f(calendarDays.value, (day = null, k0 = null, i0 = null) => {
          return {
            a: common_vendor.t(day.day),
            b: day.date,
            c: day.isWeekend ? 1 : "",
            d: day.isOtherMonth ? 1 : "",
            e: day.isToday ? 1 : "",
            f: day.checked ? 1 : "",
            g: common_vendor.o(($event = null) => {
              return toggleCheck(day.date);
            }, day.date)
          };
        }),
        l: common_vendor.f(checkItems.value, (item = null, index = null, i0 = null) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.label),
            c: common_vendor.t(item.checked ? "已完成" : "未完成"),
            d: common_vendor.n(item.checked ? "checked" : ""),
            e: index,
            f: common_vendor.o(($event = null) => {
              return toggleCheckItem(index);
            }, index)
          };
        }),
        m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
