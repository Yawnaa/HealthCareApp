<script setup lang="ts">
import { ref } from 'vue'
import { useMemberStore } from '@/stores/member'
import type { UserInfo } from '@/stores/member'

// 使用 Pinia store
const memberStore = useMemberStore()

// 处理头像上传
const handleAvatarUpload = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      memberStore.updateAvatar(res.tempFilePaths[0])
      // 这里可以添加上传到服务器的逻辑
    },
  })
}

// 编辑个人信息
const handleEditProfile = () => {
  uni.navigateTo({
    url: '/pages/my/profile-edit',
  })
}
</script>

<template>
  <view class="container">
    <!-- 个人信息卡片 -->
    <view class="profile-card">
      <view class="card-header">
        <view class="avatar-section" @tap="handleAvatarUpload">
          <image :src="memberStore.userInfo.avatar" class="avatar" mode="aspectFill"></image>
          <view class="avatar-mask">
            <text class="iconfont icon-camera"></text>
          </view>
        </view>
        <view class="user-info">
          <view class="name-section">
            <text class="name">{{ memberStore.userInfo.name }}</text>
            <text class="edit-btn" @tap="handleEditProfile">编辑</text>
          </view>
          <view class="doctor-info">
            <text class="label">主治医生：</text>
            <text class="value">{{ memberStore.userInfo.doctorName }}</text>
          </view>
        </view>
      </view>

      <view class="health-info">
        <view class="info-item">
          <text class="label">身高</text>
          <text class="value">{{ memberStore.userInfo.healthInfo.height }}cm</text>
        </view>
        <view class="info-item">
          <text class="label">体重</text>
          <text class="value">{{ memberStore.userInfo.healthInfo.weight }}kg</text>
        </view>
        <view class="info-item">
          <text class="label">血型</text>
          <text class="value">{{ memberStore.userInfo.healthInfo.bloodType }}</text>
        </view>
        <view class="info-item allergies">
          <text class="label">过敏史</text>
          <view class="allergy-tags">
            <text
              v-for="(allergy, index) in memberStore.userInfo.healthInfo.allergies"
              :key="index"
              class="tag"
            >
              {{ allergy }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="function-list">
      <view class="function-item" @tap="() => uni.navigateTo({ url: '/pages/my/appointments' })">
        <image class="function-icon" src="/static/images/appointment.png" mode="aspectFit"></image>
        <text class="function-title">我的预约</text>
        <text class="iconfont icon-arrow-right"></text>
      </view>
      <view class="function-item" @tap="() => uni.navigateTo({ url: '/pages/my/health-record' })">
        <image
          class="function-icon"
          src="/static/images/health-record.png"
          mode="aspectFit"
        ></image>
        <text class="function-title">健康档案</text>
        <text class="iconfont icon-arrow-right"></text>
      </view>
      <view
        class="function-item"
        @tap="() => uni.navigateTo({ url: '/pages/my/medicine-reminder' })"
      >
        <image class="function-icon" src="/static/images/medicine.png" mode="aspectFit"></image>
        <text class="function-title">用药提醒</text>
        <text class="iconfont icon-arrow-right"></text>
      </view>
      <view class="function-item" @tap="() => uni.navigateTo({ url: '/pages/my/settings' })">
        <image class="function-icon" src="/static/images/settings.png" mode="aspectFit"></image>
        <text class="function-title">设置</text>
        <text class="iconfont icon-arrow-right"></text>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.profile-card {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.avatar-section {
  position: relative;
  margin-right: 30rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  border: 4rpx solid #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.avatar-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 60rpx;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;

  .icon-camera {
    color: #fff;
    font-size: 40rpx;
  }
}

.avatar-section:active .avatar-mask {
  opacity: 1;
}

.user-info {
  flex: 1;
}

.name-section {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-right: 20rpx;
}

.edit-btn {
  font-size: 24rpx;
  color: #4caf50;
  padding: 4rpx 16rpx;
  border: 2rpx solid #4caf50;
  border-radius: 20rpx;
}

.doctor-info {
  font-size: 28rpx;
  color: #666;

  .label {
    color: #999;
  }
}

.health-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding-top: 20rpx;
  border-top: 2rpx solid #f0f0f0;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  .label {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 8rpx;
  }

  .value {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
  }

  &.allergies {
    grid-column: 1 / -1;
    align-items: flex-start;

    .allergy-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 12rpx;
      margin-top: 8rpx;
    }

    .tag {
      font-size: 24rpx;
      color: #4caf50;
      background: rgba(76, 175, 80, 0.1);
      padding: 4rpx 16rpx;
      border-radius: 16rpx;
    }
  }
}

.function-list {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.function-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 2rpx solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f8f8f8;
  }
}

.function-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

.function-title {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.icon-arrow-right {
  font-size: 24rpx;
  color: #999;
}
</style>
