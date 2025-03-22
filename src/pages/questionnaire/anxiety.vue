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

// 问卷问题列表（基于GAD-7量表）
const questions = ref<Question[]>([
  {
    id: 1,
    title: '您是否感到紧张、焦虑或烦躁？',
    options: [
      { value: 0, label: '完全没有' },
      { value: 1, label: '有几天' },
      { value: 2, label: '一半以上的时间' },
      { value: 3, label: '几乎每天' },
    ],
    selected: null,
  },
  {
    id: 2,
    title: '您是否无法停止或控制担忧？',
    options: [
      { value: 0, label: '完全没有' },
      { value: 1, label: '有几天' },
      { value: 2, label: '一半以上的时间' },
      { value: 3, label: '几乎每天' },
    ],
    selected: null,
  },
  {
    id: 3,
    title: '您是否对各种各样的事情过度担忧？',
    options: [
      { value: 0, label: '完全没有' },
      { value: 1, label: '有几天' },
      { value: 2, label: '一半以上的时间' },
      { value: 3, label: '几乎每天' },
    ],
    selected: null,
  },
  {
    id: 4,
    title: '您是否难以放松？',
    options: [
      { value: 0, label: '完全没有' },
      { value: 1, label: '有几天' },
      { value: 2, label: '一半以上的时间' },
      { value: 3, label: '几乎每天' },
    ],
    selected: null,
  },
  {
    id: 5,
    title: '您是否容易心烦意乱？',
    options: [
      { value: 0, label: '完全没有' },
      { value: 1, label: '有几天' },
      { value: 2, label: '一半以上的时间' },
      { value: 3, label: '几乎每天' },
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
  if (totalScore <= 4) {
    result = '您的焦虑水平在正常范围内，建议继续保持良好的心态。'
  } else if (totalScore <= 9) {
    result = '您可能存在轻度焦虑，建议通过深呼吸、冥想等方式进行放松。'
  } else if (totalScore <= 14) {
    result = '您可能存在中度焦虑，建议寻求心理咨询师的帮助，学习焦虑管理技巧。'
  } else {
    result = '您可能存在重度焦虑，建议及时就医，在专业医生指导下进行治疗。'
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
