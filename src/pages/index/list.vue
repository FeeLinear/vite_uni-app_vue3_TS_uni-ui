<template>
  <view class="content">
    <view class="text-area">
      <text class="title">list</text>
      <button @click="next">跳details</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import router from '@/router'
import { getRouteParams } from '@/router'
console.log("getRouteParams", getRouteParams())
function next() {
  router
    .navigate('details', { id: 2 })
    .then((data) => {
      console.log('上个页面返回的数据')
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
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
