<script setup lang="ts">
import { ref } from 'vue'

// 定义响应式变量
const exerciseImage = ref('') // 运动图片路径
const description = ref('') // 描述文本
const duration = ref('') // 运动时长
const calories = ref('') // 消耗卡路里
const type = ref('') // 运动类型
const intensity = ref('') // 运动强度

// 运动类型选项
const typeOptions = [
  { value: 'running', label: '跑步', icon: '🏃' },
  { value: 'cycling', label: '骑行', icon: '🚴' },
  { value: 'swimming', label: '游泳', icon: '🏊' },
  { value: 'gym', label: '健身', icon: '💪' },
  { value: 'yoga', label: '瑜伽', icon: '🧘' },
]

// 运动强度选项
const intensityOptions = [
  { value: 'low', label: '低强度', icon: '⚡' },
  { value: 'medium', label: '中等强度', icon: '⚡⚡' },
  { value: 'high', label: '高强度', icon: '⚡⚡⚡' },
]

// 处理选择图片
const handleChooseImage = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      exerciseImage.value = res.tempFilePaths[0]
    },
  })
}

// 处理提交打卡
const handleSubmit = () => {
  if (!exerciseImage.value) {
    uni.showToast({
      title: '请上传运动照片',
      icon: 'none',
    })
    return
  }

  if (!duration.value) {
    uni.showToast({
      title: '请输入运动时长',
      icon: 'none',
    })
    return
  }

  if (!calories.value) {
    uni.showToast({
      title: '请输入消耗卡路里',
      icon: 'none',
    })
    return
  }

  if (!type.value) {
    uni.showToast({
      title: '请选择运动类型',
      icon: 'none',
    })
    return
  }

  if (!intensity.value) {
    uni.showToast({
      title: '请选择运动强度',
      icon: 'none',
    })
    return
  }

  uni.showToast({
    title: '打卡成功',
    icon: 'success',
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<template>
  <view class="container">
    <!-- 页面头部 -->
    <view class="header">
      <text class="title">运动打卡</text>
      <text class="date">{{ new Date().toLocaleDateString() }}</text>
    </view>

    <view class="content">
      <!-- 图片上传区域 -->
      <view class="upload-section">
        <view class="upload-box" @tap="handleChooseImage">
          <image
            v-if="exerciseImage"
            :src="exerciseImage"
            mode="aspectFill"
            class="preview-image"
          ></image>
          <view v-else class="upload-placeholder">
            <text class="iconfont icon-camera"></text>
            <text class="upload-text">上传运动照片</text>
          </view>
        </view>
      </view>

      <!-- 运动时长输入 -->
      <view class="form-section">
        <view class="form-item">
          <text class="label">运动时长（分钟）</text>
          <input v-model="duration" type="number" class="input" placeholder="请输入运动时长" />
        </view>
      </view>

      <!-- 消耗卡路里输入 -->
      <view class="form-section">
        <view class="form-item">
          <text class="label">消耗卡路里</text>
          <input v-model="calories" type="number" class="input" placeholder="请输入消耗卡路里" />
        </view>
      </view>

      <!-- 运动类型选择 -->
      <view class="mood-section">
        <text class="label">运动类型</text>
        <view class="mood-list">
          <view
            v-for="option in typeOptions"
            :key="option.value"
            class="mood-item"
            :class="{ active: type === option.value }"
            @tap="type = option.value"
          >
            <text class="mood-icon">{{ option.icon }}</text>
            <text class="mood-label">{{ option.label }}</text>
          </view>
        </view>
      </view>

      <!-- 运动强度选择 -->
      <view class="mood-section">
        <text class="label">运动强度</text>
        <view class="mood-list">
          <view
            v-for="option in intensityOptions"
            :key="option.value"
            class="mood-item"
            :class="{ active: intensity === option.value }"
            @tap="intensity = option.value"
          >
            <text class="mood-icon">{{ option.icon }}</text>
            <text class="mood-label">{{ option.label }}</text>
          </view>
        </view>
      </view>

      <!-- 描述输入区域 -->
      <view class="form-section">
        <textarea
          v-model="description"
          class="description-input"
          placeholder="记录一下今天的运动吧..."
          :maxlength="200"
        ></textarea>
      </view>

      <!-- 提交按钮 -->
      <button class="submit-btn" @tap="handleSubmit">提交打卡</button>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f2f7 0%, #f5f9fa 100%);
  padding: 20rpx;
}

.header {
  background: rgba(255, 255, 255, 0.9);
  padding: 30rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);

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

.content {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
}

.upload-section {
  margin-bottom: 30rpx;

  .upload-box {
    width: 100%;
    height: 400rpx;
    background: #f8f8f8;
    border-radius: 12rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .preview-image {
      width: 100%;
      height: 100%;
    }

    .upload-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999;

      .icon-camera {
        font-size: 48rpx;
        margin-bottom: 16rpx;
      }

      .upload-text {
        font-size: 28rpx;
      }
    }
  }
}

.form-section {
  margin-bottom: 30rpx;

  .form-item {
    margin-bottom: 20rpx;

    .label {
      font-size: 28rpx;
      color: #333;
      margin-bottom: 12rpx;
      display: block;
    }

    .input {
      width: 100%;
      height: 80rpx;
      background: #f8f8f8;
      border-radius: 12rpx;
      padding: 0 20rpx;
      font-size: 28rpx;
      color: #333;
    }
  }

  .description-input {
    width: 100%;
    height: 200rpx;
    background: #f8f8f8;
    border-radius: 12rpx;
    padding: 20rpx;
    font-size: 28rpx;
    color: #333;
  }
}

.mood-section {
  margin-bottom: 30rpx;

  .label {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 20rpx;
    display: block;
  }

  .mood-list {
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;

    .mood-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx;
      border-radius: 12rpx;
      background: #f8f8f8;
      transition: all 0.3s;

      &.active {
        background: #e8f5e9;
        transform: scale(1.05);
      }

      .mood-icon {
        font-size: 48rpx;
        margin-bottom: 12rpx;
      }

      .mood-label {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: #27ba9b;
  color: #fff;
  font-size: 28rpx;
  border-radius: 40rpx;
  border: none;

  &::after {
    border: none;
  }
}
</style>
