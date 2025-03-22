<script setup lang="ts">
import { ref } from 'vue'

// 问卷项目接口定义
interface QuestionnaireItem {
  id: number
  title: string
  description: string
  icon: string
  path: string
  questionCount: number
  color: string
}

// 问卷列表数据
const questionnaireList = ref<QuestionnaireItem[]>([
  {
    id: 1,
    title: '慢性病风险评估',
    description: '评估您患慢性病的风险程度',
    icon: 'heart-filled',
    path: '/pages/questionnaire/chronic',
    questionCount: 5,
    color: '#9C27B0',
  },
  {
    id: 2,
    title: '抑郁自测',
    description: '评估您的抑郁症状程度',
    icon: 'mood-filled',
    path: '/pages/questionnaire/depression',
    questionCount: 5,
    color: '#2196F3',
  },
  {
    id: 3,
    title: '焦虑自测',
    description: '评估您的焦虑症状程度',
    icon: 'alert-filled',
    path: '/pages/questionnaire/anxiety',
    questionCount: 5,
    color: '#4CAF50',
  },
  {
    id: 4,
    title: '糖尿病风险评估',
    description: '评估您患糖尿病的风险程度',
    icon: 'info-filled',
    path: '/pages/questionnaire/diabetes',
    questionCount: 5,
    color: '#FF9800',
  },
])

// 处理问卷点击
const handleQuestionnaireClick = (path: string) => {
  uni.navigateTo({
    url: path,
    fail: (err) => {
      console.error('导航失败:', err)
      uni.showToast({
        title: '页面跳转失败',
        icon: 'none',
      })
    },
  })
}
</script>

<template>
  <view class="container">
    <view class="header">
      <text class="title">健康自测</text>
      <text class="subtitle">专业的健康风险评估工具</text>
    </view>

    <view class="questionnaire-list">
      <view
        v-for="item in questionnaireList"
        :key="item.id"
        class="questionnaire-item"
        :style="{ borderColor: item.color }"
        @tap="handleQuestionnaireClick(item.path)"
      >
        <view class="item-header">
          <view class="icon-wrapper" :style="{ backgroundColor: item.color }">
            <uni-icons :type="item.icon" size="24" color="#ffffff"></uni-icons>
          </view>
          <view class="info">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-description">{{ item.description }}</text>
          </view>
        </view>
        <view class="item-footer">
          <text class="question-count">{{ item.questionCount }}个问题</text>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
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

.header {
  margin-bottom: 40rpx;

  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 16rpx;
  }

  .subtitle {
    font-size: 28rpx;
    color: #666;
  }
}

.questionnaire-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;

  .questionnaire-item {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    border-left: 8rpx solid;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.98);
    }

    .item-header {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;

      .icon-wrapper {
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;
      }

      .info {
        flex: 1;

        .item-title {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
          display: block;
          margin-bottom: 8rpx;
        }

        .item-description {
          font-size: 24rpx;
          color: #666;
        }
      }
    }

    .item-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .question-count {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}
</style>
