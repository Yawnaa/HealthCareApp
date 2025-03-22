<script setup lang="ts">
import { ref } from 'vue'
import { useMemberStore } from '@/stores/member'
import type { UserInfo } from '@/stores/member'

const memberStore = useMemberStore()

// 表单数据
const formData = ref({
  name: memberStore.userInfo.name,
  doctorName: memberStore.userInfo.doctorName,
  healthInfo: {
    height: memberStore.userInfo.healthInfo.height,
    weight: memberStore.userInfo.healthInfo.weight,
    bloodType: memberStore.userInfo.healthInfo.bloodType,
    allergies: memberStore.userInfo.healthInfo.allergies.join('、'),
  },
})

// 血型选项
const bloodTypes = [
  { text: 'A型', value: 'A型' },
  { text: 'B型', value: 'B型' },
  { text: 'O型', value: 'O型' },
  { text: 'AB型', value: 'AB型' },
]

// 保存个人信息
const handleSave = () => {
  // 处理过敏史
  const allergies = formData.value.healthInfo.allergies
    .split('、')
    .map((item) => item.trim())
    .filter(Boolean)

  // 更新用户信息
  memberStore.updateUserInfo({
    name: formData.value.name,
    doctorName: formData.value.doctorName,
    healthInfo: {
      height: Number(formData.value.healthInfo.height),
      weight: Number(formData.value.healthInfo.weight),
      bloodType: formData.value.healthInfo.bloodType,
      allergies,
    },
  })

  uni.showToast({
    title: '保存成功',
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
    <view class="form-section">
      <uni-forms>
        <uni-forms-item label="姓名">
          <uni-easyinput v-model="formData.name" placeholder="请输入姓名" :clearable="true" />
        </uni-forms-item>

        <uni-forms-item label="主治医生">
          <uni-easyinput
            v-model="formData.doctorName"
            placeholder="请输入主治医生姓名"
            :clearable="true"
          />
        </uni-forms-item>

        <uni-forms-item label="身高(cm)">
          <uni-easyinput
            v-model="formData.healthInfo.height"
            type="number"
            placeholder="请输入身高"
            :clearable="true"
          />
        </uni-forms-item>

        <uni-forms-item label="体重(kg)">
          <uni-easyinput
            v-model="formData.healthInfo.weight"
            type="number"
            placeholder="请输入体重"
            :clearable="true"
          />
        </uni-forms-item>

        <uni-forms-item label="血型">
          <uni-data-select
            v-model="formData.healthInfo.bloodType"
            :localdata="bloodTypes"
            placeholder="请选择血型"
          />
        </uni-forms-item>

        <uni-forms-item label="过敏史">
          <uni-easyinput
            v-model="formData.healthInfo.allergies"
            type="textarea"
            placeholder="请输入过敏史，多个过敏原用顿号(、)分隔"
            :clearable="true"
          />
        </uni-forms-item>
      </uni-forms>
    </view>

    <view class="button-section">
      <button class="save-btn" @tap="handleSave">保存</button>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.form-section {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 40rpx;
}

.button-section {
  padding: 0 20rpx;
}

.save-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: #fff;
  font-size: 32rpx;
  border-radius: 44rpx;
  border: none;

  &:active {
    opacity: 0.8;
  }
}
</style>
