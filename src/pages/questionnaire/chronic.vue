<script setup lang="ts">
import { ref, computed } from 'vue'

interface Question {
  id: number
  title: string
  options: Array<{
    value: number
    label: string
  }>
  selected: number | null
}

// 问卷问题列表
const questions = ref<Question[]>([
  {
    id: 1,
    title: '您的年龄是？',
    options: [
      { value: 1, label: '30岁以下' },
      { value: 2, label: '30-45岁' },
      { value: 3, label: '45-60岁' },
      { value: 4, label: '60岁以上' },
    ],
    selected: null,
  },
  {
    id: 2,
    title: '您的血压情况如何？',
    options: [
      { value: 1, label: '正常（90-140/60-90mmHg）' },
      { value: 2, label: '偏高（140-160/90-100mmHg）' },
      { value: 3, label: '高血压（>160/100mmHg）' },
      { value: 4, label: '不确定' },
    ],
    selected: null,
  },
  {
    id: 3,
    title: '您是否有以下症状？',
    options: [
      { value: 1, label: '经常头晕' },
      { value: 2, label: '胸闷气短' },
      { value: 3, label: '心慌' },
      { value: 4, label: '以上都没有' },
    ],
    selected: null,
  },
  {
    id: 4,
    title: '您的饮食习惯如何？',
    options: [
      { value: 1, label: '清淡饮食，规律作息' },
      { value: 2, label: '偶尔重口味' },
      { value: 3, label: '经常高盐高脂' },
      { value: 4, label: '不规律' },
    ],
    selected: null,
  },
  {
    id: 5,
    title: '您的运动情况如何？',
    options: [
      { value: 1, label: '每天运动30分钟以上' },
      { value: 2, label: '每周运动3-4次' },
      { value: 3, label: '偶尔运动' },
      { value: 4, label: '很少运动' },
    ],
    selected: null,
  },
])

// 当前问题索引
const currentIndex = ref(0)

// 计算进度
const progress = computed(() => {
  return Math.round((currentIndex.value / questions.value.length) * 100)
})

// 处理选项选择
const handleSelect = (questionId: number, value: number) => {
  const question = questions.value.find((q) => q.id === questionId)
  if (question) {
    question.selected = value
    // 延迟后进入下一题
    setTimeout(() => {
      if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++
      } else {
        // 完成问卷
        handleSubmit()
      }
    }, 300)
  }
}

// 提交问卷
const handleSubmit = () => {
  // 计算得分
  const totalScore = questions.value.reduce((sum, q) => sum + (q.selected || 0), 0)

  // 根据得分给出建议
  let result = ''
  if (totalScore <= 8) {
    result = '您的健康状况良好，建议继续保持健康的生活方式。'
  } else if (totalScore <= 12) {
    result = '您可能存在一些健康风险，建议改善生活方式，定期体检。'
  } else if (totalScore <= 16) {
    result = '您存在较高的健康风险，建议及时就医检查，遵医嘱治疗。'
  } else {
    result = '您存在严重的健康风险，建议立即就医，进行专业检查和治疗。'
  }

  uni.showModal({
    title: '评估结果',
    content: result,
    showCancel: false,
    success: () => {
      // 返回上一页
      uni.navigateBack()
    },
  })
}
</script>

<template>
  <view class="container">
    <view class="progress-bar">
      <view class="progress-inner" :style="{ width: `${progress}%` }"></view>
    </view>

    <view class="question-container">
      <view class="question-header">
        <text class="question-number">问题 {{ currentIndex + 1 }}/{{ questions.length }}</text>
        <text class="question-title">{{ questions[currentIndex].title }}</text>
      </view>

      <view class="options-list">
        <view
          v-for="option in questions[currentIndex].options"
          :key="option.value"
          class="option-item"
          :class="{ selected: questions[currentIndex].selected === option.value }"
          @tap="handleSelect(questions[currentIndex].id, option.value)"
        >
          <text class="option-text">{{ option.label }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 30rpx;
}

.progress-bar {
  height: 8rpx;
  background: #e0e0e0;
  border-radius: 4rpx;
  margin-bottom: 40rpx;
  overflow: hidden;

  .progress-inner {
    height: 100%;
    background: #4caf50;
    border-radius: 4rpx;
    transition: width 0.3s ease;
  }
}

.question-container {
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

  .question-header {
    margin-bottom: 40rpx;

    .question-number {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 16rpx;
      display: block;
    }

    .question-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      line-height: 1.5;
    }
  }

  .options-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .option-item {
      padding: 30rpx;
      background: #f8f8f8;
      border-radius: 12rpx;
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.98);
      }

      &.selected {
        background: #4caf50;
        .option-text {
          color: #fff;
        }
      }

      .option-text {
        font-size: 32rpx;
        color: #333;
        line-height: 1.5;
      }
    }
  }
}
</style>
