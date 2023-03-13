<template>
  <view class="content">
    <view class="text-area">
      <text class="title">details</text>
      <button @click="pageBack">返回</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import router from '@/router'

function pageBack() {
   router.back({
    data: {
      msg: '这是返回携带的数据',
    },
  })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
