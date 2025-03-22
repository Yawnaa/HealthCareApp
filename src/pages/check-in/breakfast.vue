<script setup lang="ts">
import { ref } from 'vue'

const breakfastImage = ref('') // 早餐图片路径
const description = ref('') // 描述文本

const handleChooseImage = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      breakfastImage.value = res.tempFilePaths[0]
    },
  })
}

const handleSubmit = () => {
  if (!breakfastImage.value) {
    uni.showToast({
      title: '请上传早餐图片',
      icon: 'none',
    })
    return
  }

  // 这里可以添加提交逻辑
  uni.showToast({
    title: '打卡成功',
    icon: 'success',
  })

  // 返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<template>
  <view class="container">
    <view class="header">
      <text class="title">早餐打卡</text>
      <text class="date">{{ new Date().toLocaleDateString() }}</text>
    </view>

    <view class="content">
      <view class="upload-section">
        <view class="upload-box" @tap="handleChooseImage">
          <image
            v-if="breakfastImage"
            :src="breakfastImage"
            mode="aspectFill"
            class="preview-image"
          ></image>
          <view v-else class="upload-placeholder">
            <text class="iconfont icon-camera"></text>
            <text class="upload-text">上传早餐图片</text>
          </view>
        </view>
      </view>

      <view class="form-section">
        <textarea
          v-model="description"
          class="description-input"
          placeholder="记录一下今天的早餐吧..."
          :maxlength="200"
        ></textarea>
      </view>

      <button class="submit-btn" @tap="handleSubmit">提交打卡</button>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.header {
  background: #ffffff;
  padding: 30rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  background: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
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
