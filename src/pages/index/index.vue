<script setup lang="ts">
import CustomNavbar from '@/components/CustomNavbar.vue'
import { ref, computed } from 'vue'

// 健康数据接口定义
interface HealthData {
  caloriesIntake: number // 卡路里摄入
  caloriesBurn: number // 卡路里消耗
  checkInDays: number // 连续打卡天数
  rankingList: Array<{
    name: string // 用户名称
    calories: number // 消耗卡路里
    rank: number // 排名
  }>
}

// 打卡项目接口定义
interface CheckInItem {
  id: string // 项目ID
  title: string // 项目标题
  icon: string // 图标路径
  checked: boolean // 是否已打卡
  path: string // 跳转路径
}

// 模拟健康数据
const healthData: HealthData = {
  caloriesIntake: 2000,
  caloriesBurn: 500,
  checkInDays: 7,
  rankingList: [
    { name: '张三', calories: 800, rank: 1 },
    { name: '李四', calories: 600, rank: 2 },
    { name: '王五', calories: 400, rank: 3 },
  ],
}

// 打卡项目列表
const checkInList: CheckInItem[] = [
  {
    id: 'breakfast',
    title: '早餐打卡',
    icon: '/static/images/breakfast.png',
    checked: false,
    path: '/pages/check-in/breakfast',
  },
  {
    id: 'lunch',
    title: '午餐打卡',
    icon: '/static/images/lunch.png',
    checked: false,
    path: '/pages/check-in/lunch',
  },
  {
    id: 'dinner',
    title: '晚餐打卡',
    icon: '/static/images/dinner.png',
    checked: false,
    path: '/pages/check-in/dinner',
  },
  {
    id: 'exercise',
    title: '运动打卡',
    icon: '/static/images/exercise.png',
    checked: false,
    path: '/pages/check-in/exercise',
  },
]

// 处理打卡事件
const handleCheckIn = (item: CheckInItem) => {
  console.log('开始导航到:', item.path)
  uni.navigateTo({
    url: item.path,
    success: () => {
      console.log('导航成功')
    },
    fail: (err) => {
      console.error('导航失败:', err)
      uni.showToast({
        title: '页面跳转失败',
        icon: 'none',
        duration: 2000,
      })
    },
  })
}

console.log('页面加载')

// 日历相关数据
const currentDate = ref(new Date())
const selectedDate = ref(new Date())
const checkInStatus = ref<Record<string, string[]>>({})

// 打卡项目选项
const checkInOptions = [
  { value: 'breakfast', label: '早餐', icon: '🍳' },
  { value: 'lunch', label: '午餐', icon: '🍱' },
  { value: 'dinner', label: '晚餐', icon: '🍽️' },
  { value: 'exercise', label: '运动', icon: '🏃' },
]

// 格式化日期
const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`
}

// 获取当月天数
const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

// 获取当月第一天是星期几
const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

// 生成日历数据
const calendarDays = computed(() => {
  const days = []
  const firstDay = getFirstDayOfMonth(currentDate.value)
  const totalDays = getDaysInMonth(currentDate.value)

  // 填充上个月的日期
  for (let i = 0; i < firstDay; i++) {
    days.push({ date: null, isCurrentMonth: false })
  }

  // 填充当前月的日期
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), i)
    days.push({
      date,
      isCurrentMonth: true,
      isToday: formatDate(date) === formatDate(new Date()),
      isSelected: formatDate(date) === formatDate(selectedDate.value),
      checkIns: checkInStatus.value[formatDate(date)] || [],
    })
  }

  return days
})

// 处理日期选择
const handleDateSelect = (date: Date) => {
  selectedDate.value = date
  showCheckInPopup.value = true
}

// 处理打卡选择
const handleCheckInSelect = (option: { value: string; label: string }) => {
  const dateStr = formatDate(selectedDate.value)
  if (!checkInStatus.value[dateStr]) {
    checkInStatus.value[dateStr] = []
  }

  if (checkInStatus.value[dateStr].includes(option.value)) {
    checkInStatus.value[dateStr] = checkInStatus.value[dateStr].filter(
      (item) => item !== option.value,
    )
  } else {
    checkInStatus.value[dateStr].push(option.value)
  }

  showCheckInPopup.value = false
}

// 获取打卡状态样式
const getCheckInStyle = (checkIns: string[] | undefined) => {
  if (!checkIns || checkIns.length === 0) return ''
  if (checkIns.length === 4) return 'all-checked'
  return 'partial-checked'
}

// 切换月份
const changeMonth = (offset: number) => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + offset)
  currentDate.value = newDate
}

// 显示打卡弹窗
const showCheckInPopup = ref(false)
</script>

<template>
  <view class="container">
    <CustomNavbar />
    <view class="content">
      <text class="debug-text">页面内容区域</text>
      <!-- 健康数据卡片 -->
      <view class="health-card">
        <view class="card-header">
          <text class="title">今日健康数据</text>
          <text class="date">{{ new Date().toLocaleDateString() }}</text>
        </view>

        <view class="data-grid">
          <view class="data-item">
            <text class="value">{{ healthData.caloriesIntake }}</text>
            <text class="label">摄入卡路里</text>
          </view>
          <view class="data-item">
            <text class="value">{{ healthData.caloriesBurn }}</text>
            <text class="label">消耗卡路里</text>
          </view>
          <view class="data-item">
            <text class="value">{{ healthData.checkInDays }}</text>
            <text class="label">连续打卡</text>
          </view>
        </view>

        <view class="ranking-section">
          <text class="section-title">运动排行榜</text>
          <view class="ranking-list">
            <view v-for="item in healthData.rankingList" :key="item.rank" class="ranking-item">
              <view class="rank-number" :class="'rank-' + item.rank">{{ item.rank }}</view>
              <text class="name">{{ item.name }}</text>
              <text class="calories">{{ item.calories }}千卡</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 打卡卡片 -->
      <view class="check-in-card">
        <view class="card-header">
          <text class="title">今日打卡</text>
          <text class="date">{{ new Date().toLocaleDateString() }}</text>
        </view>

        <view class="check-in-grid">
          <view v-for="item in checkInList" :key="item.id" class="check-in-item">
            <image class="item-icon" :src="item.icon" mode="aspectFit"></image>
            <text class="item-title">{{ item.title }}</text>
            <button
              class="check-in-btn"
              :class="{ checked: item.checked }"
              @tap="handleCheckIn(item)"
            >
              {{ item.checked ? '已完成' : '打卡' }}
            </button>
          </view>
        </view>
      </view>

      <!-- 在 content 最后添加日历组件 -->
      <view class="calendar-section">
        <view class="calendar-header">
          <text class="month-title"
            >{{ currentDate.getFullYear() }}年{{ currentDate.getMonth() + 1 }}月</text
          >
          <view class="month-controls">
            <text class="control-btn" @tap="changeMonth(-1)">◀</text>
            <text class="control-btn" @tap="changeMonth(1)">▶</text>
          </view>
        </view>

        <view class="calendar-grid">
          <view class="weekday-header">
            <text v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day">{{
              day
            }}</text>
          </view>
          <view class="days-grid">
            <view
              v-for="(day, index) in calendarDays"
              :key="index"
              class="day-cell"
              :class="{
                'other-month': !day.isCurrentMonth,
                today: day.isToday,
                selected: day.isSelected,
                [getCheckInStyle(day.checkIns)]: day.checkIns,
              }"
              @tap="day.date && handleDateSelect(day.date)"
            >
              <text class="day-number">{{ day.date ? day.date.getDate() : '' }}</text>
              <view v-if="day.checkIns && day.checkIns.length > 0" class="check-in-dots">
                <text v-for="checkIn in day.checkIns" :key="checkIn" class="dot"></text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 打卡选择弹窗 -->
      <uni-popup ref="popup" type="bottom">
        <view class="check-in-popup">
          <view class="popup-header">
            <text class="popup-title">{{ formatDate(selectedDate) }} 打卡</text>
            <text class="close-btn" @tap="showCheckInPopup = false">×</text>
          </view>
          <view class="popup-content">
            <view
              v-for="option in checkInOptions"
              :key="option.value"
              class="check-in-option"
              :class="{ active: checkInStatus[formatDate(selectedDate)]?.includes(option.value) }"
              @tap="handleCheckInSelect(option)"
            >
              <text class="option-icon">{{ option.icon }}</text>
              <text class="option-label">{{ option.label }}</text>
            </view>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f2f7 0%, #f5f9fa 100%);
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.debug-text {
  font-size: 28rpx;
  color: #999;
  margin-bottom: 20rpx;
  display: block;
}

.health-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }

    .date {
      font-size: 24rpx;
      color: #999;
    }
  }

  .data-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    margin-bottom: 30rpx;

    .data-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx;
      background: #f8f8f8;
      border-radius: 12rpx;

      .value {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 8rpx;
      }

      .label {
        font-size: 24rpx;
        color: #666;
      }
    }
  }

  .ranking-section {
    .section-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
      display: block;
    }

    .ranking-list {
      .ranking-item {
        display: flex;
        align-items: center;
        padding: 16rpx 0;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }

        .rank-number {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          margin-right: 20rpx;
          color: #fff;

          &.rank-1 {
            background: #ffd700;
          }

          &.rank-2 {
            background: #c0c0c0;
          }

          &.rank-3 {
            background: #cd7f32;
          }
        }

        .name {
          flex: 1;
          font-size: 28rpx;
          color: #333;
        }

        .calories {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }
}

.check-in-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }

    .date {
      font-size: 24rpx;
      color: #999;
    }
  }

  .check-in-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;

    .check-in-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx;
      background: #f8f8f8;
      border-radius: 12rpx;

      .item-icon {
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 16rpx;
      }

      .item-title {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 16rpx;
      }

      .check-in-btn {
        width: 160rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        border-radius: 30rpx;
        background: #27ba9b;
        color: #fff;
        border: none;
        padding: 0;
        margin: 0;

        &::after {
          border: none;
        }

        &.checked {
          background: #e8f5e9;
          color: #27ba9b;
        }
      }
    }
  }
}

.calendar-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-top: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .month-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      font-family: 'Arial', sans-serif;
    }

    .month-controls {
      display: flex;
      gap: 20rpx;

      .control-btn {
        font-size: 28rpx;
        color: #666;
        padding: 10rpx;
      }
    }
  }

  .calendar-grid {
    .weekday-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      margin-bottom: 20rpx;

      text {
        font-size: 24rpx;
        color: #999;
      }
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10rpx;

      .day-cell {
        aspect-ratio: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 12rpx;
        position: relative;
        transition: all 0.3s;

        &.other-month {
          opacity: 0.3;
        }

        &.today {
          background: #e8f5e9;
        }

        &.selected {
          background: #27ba9b;
          .day-number {
            color: #fff;
          }
        }

        &.all-checked {
          background: #e8f5e9;
          .day-number {
            color: #27ba9b;
            font-weight: bold;
          }
        }

        &.partial-checked {
          background: #fff3e0;
          .day-number {
            color: #ff9800;
          }
        }

        .day-number {
          font-size: 32rpx;
          color: #333;
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          margin-bottom: 8rpx;
        }

        .check-in-dots {
          display: flex;
          gap: 4rpx;
          margin-top: 4rpx;

          .dot {
            width: 8rpx;
            height: 8rpx;
            border-radius: 50%;
            background: #27ba9b;
          }
        }
      }
    }
  }
}

.check-in-popup {
  background: #fff;
  border-radius: 30rpx 30rpx 0 0;
  padding: 30rpx;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .popup-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }

    .close-btn {
      font-size: 40rpx;
      color: #999;
      padding: 10rpx;
    }
  }

  .popup-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;

    .check-in-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30rpx;
      background: #f8f8f8;
      border-radius: 12rpx;
      transition: all 0.3s;

      &.active {
        background: #e8f5e9;
        transform: scale(1.05);
      }

      .option-icon {
        font-size: 48rpx;
        margin-bottom: 12rpx;
      }

      .option-label {
        font-size: 28rpx;
        color: #333;
      }
    }
  }
}
</style>
